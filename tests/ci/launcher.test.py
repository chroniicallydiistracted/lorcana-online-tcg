"""Mocked launcher/config safety; actual Docker execution is a separate receipt."""
import copy
import contextlib
import io
import importlib.util
import json
from pathlib import Path
import subprocess
import tempfile
import unittest
from unittest.mock import patch
import yaml

ROOT = Path(__file__).resolve().parents[2]


def load(name, path):
    spec = importlib.util.spec_from_file_location(name, ROOT / path)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


launcher = load('ci_launcher', 'scripts/ci-local.py')
config = load('ci_config', 'scripts/ci/check-config.py')


class Safety(unittest.TestCase):
    def main_fixture(self, failure):
        temporary = tempfile.TemporaryDirectory()
        self.addCleanup(temporary.cleanup)
        root = Path(temporary.name)
        (root / 'scripts').mkdir()
        commands = []
        def copy_source(_root, source):
            source.mkdir()
            (source / '.devcontainer').mkdir()
            (source / '.devcontainer/Dockerfile').write_text('FROM fixture\n')
        def run(command, cwd=None, **_options):
            commands.append(command)
            if command[0] == 'python3':
                if failure == 'setup':
                    raise RuntimeError('fixture setup failure')
                (cwd / '.env.local').write_text('POSTGRES_DB=lorcana_local\n')
            if command[:3] == ['docker', 'image', 'rm'] and failure == 'image_cleanup':
                raise RuntimeError('fixture image cleanup failure')
            return 'sha256:' + 'a' * 64 if command[:3] == ['docker', 'image', 'inspect'] else ''
        def compose(env, *args, **_options):
            if args[0] == 'run':
                artifacts = Path(env['LORCANA_CI_SOURCE']) / '.local/ci-artifacts'
                artifacts.mkdir(exist_ok=True)
                (artifacts / 'manifest.json').write_text('{}')
        output = io.StringIO()
        handlers = {}
        def set_signal(sig, handler):
            prior = handlers.get(sig, launcher.signal.SIG_DFL)
            handlers[sig] = handler
            return prior
        def cleanup(_env):
            if failure == 'cleanup_interrupt':
                handler = handlers[launcher.signal.SIGINT]
                if callable(handler):
                    handler(launcher.signal.SIGINT, None)
        with patch.object(launcher, '__file__', str(root / 'scripts/ci-local.py')), patch.object(launcher, 'copy_source', side_effect=copy_source), patch.object(launcher, 'run', side_effect=run), patch.object(launcher, 'compose', side_effect=compose), patch.object(launcher, 'cleanup', side_effect=cleanup), patch.object(launcher.signal, 'signal', side_effect=set_signal), patch.object(launcher.os, 'getuid', return_value=1000), patch.object(launcher.os, 'getgid', return_value=1000), patch.object(launcher.os, 'environ', {'PATH': '/fixture'}), patch('sys.argv', ['ci-local.py']), contextlib.redirect_stdout(output):
            with self.assertRaises(KeyboardInterrupt if failure == 'cleanup_interrupt' else RuntimeError):
                launcher.main()
        return root, commands, output.getvalue()

    def test_design_system_suite_runs_its_own_pipeline_and_publishes_without_artifacts(self):
        temporary = tempfile.TemporaryDirectory()
        self.addCleanup(temporary.cleanup)
        root = Path(temporary.name)
        (root / 'scripts').mkdir()
        commands, compose_calls = [], []
        def copy_source(_root, source):
            source.mkdir()
            (source / '.devcontainer').mkdir()
            (source / '.devcontainer/Dockerfile').write_text('FROM fixture\n')
        def run(command, cwd=None, **_options):
            commands.append(command)
            if command[0] == 'python3':
                (cwd / '.env.local').write_text('POSTGRES_DB=lorcana_local\n')
            return 'sha256:' + 'a' * 64 if command[:3] == ['docker', 'image', 'inspect'] else ''
        timeouts = {}
        def compose(_env, *args, **options):
            compose_calls.append(list(args))
            timeouts[tuple(args)] = options.get('timeout')
        output = io.StringIO()
        with patch.object(launcher, '__file__', str(root / 'scripts/ci-local.py')), patch.object(launcher, 'copy_source', side_effect=copy_source), patch.object(launcher, 'run', side_effect=run), patch.object(launcher, 'compose', side_effect=compose), patch.object(launcher, 'cleanup'), patch.object(launcher.signal, 'signal', return_value=launcher.signal.SIG_DFL), patch.object(launcher.os, 'getuid', return_value=1000), patch.object(launcher.os, 'getgid', return_value=1000), patch.object(launcher.os, 'environ', {'PATH': '/fixture'}), patch('sys.argv', ['ci-local.py', '--suite', 'design-system']), contextlib.redirect_stdout(output):
            launcher.main()
        self.assertIn(['run', '--rm', 'runner', 'pnpm', 'ci:design-system'], compose_calls)
        self.assertNotIn(['run', '--rm', 'runner', 'pnpm', 'ci:verify'], compose_calls)
        self.assertEqual(timeouts[('run', '--rm', 'runner', 'pnpm', 'ci:design-system')], launcher.PIPELINE_TIMEOUT)
        self.assertEqual(launcher.PIPELINE_TIMEOUT, 1500)
        results = list((root / '.local/ci-results').iterdir())
        self.assertEqual(len(results), 1)
        host = json.loads((results[0] / 'host.json').read_text())
        self.assertEqual(host['suite'], 'design-system')
        self.assertFalse((results[0] / 'artifacts').exists())
        self.assertIn('PASS isolated pipeline', output.getvalue())

    def test_design_system_suite_refuses_the_artifact_upload_directory(self):
        with patch.object(launcher.os, 'environ', {'PATH': '/fixture', 'LORCANA_CI_ARTIFACT_DIR': '.local/ci-upload'}), patch.object(launcher.os, 'getuid', return_value=1000), patch.object(launcher.os, 'getgid', return_value=1000), patch('sys.argv', ['ci-local.py', '--suite', 'design-system']):
            with self.assertRaisesRegex(RuntimeError, 'upload directory'):
                launcher.main()

    def test_image_is_removed_after_post_build_setup_failure(self):
        _root, commands, _output = self.main_fixture('setup')
        self.assertTrue(any(command[:3] == ['docker', 'image', 'rm'] for command in commands))

    def test_image_cleanup_failure_cannot_publish_or_print_pass(self):
        root, _commands, output = self.main_fixture('image_cleanup')
        self.assertFalse((root / '.local/ci-results').exists())
        self.assertNotIn('PASS isolated pipeline', output)

    def test_first_cancel_during_cleanup_cannot_publish(self):
        root, _commands, output = self.main_fixture('cleanup_interrupt')
        self.assertFalse((root / '.local/ci-results').exists())
        self.assertNotIn('PASS isolated pipeline', output)

    def test_known_original_credential_is_rejected_in_removed_history(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory) / 'root'
            root.mkdir()
            def git(*args):
                subprocess.run(['git', *args], cwd=root, check=True, capture_output=True)
            git('init')
            git('config', 'user.email', 'fixture@example.invalid')
            git('config', 'user.name', 'CI fixture')
            secret = 'q' * 64
            (root / '.gitignore').write_text('.env.local\n')
            (root / '.env.local').write_text('POSTGRES_PASSWORD=' + secret + '\n')
            (root / '.env.local').chmod(0o600)
            (root / 'public.txt').write_text(secret)
            git('add', '.')
            git('commit', '-m', 'synthetic history fixture')
            (root / 'public.txt').write_text('public')
            git('add', '.')
            git('commit', '-m', 'remove fixture value')
            with self.assertRaisesRegex(RuntimeError, 'history'):
                launcher.copy_source(root, Path(directory) / 'copy')

    def test_only_uuid_project_can_be_cleaned(self):
        with patch.object(launcher, 'run') as run:
            with self.assertRaises(RuntimeError):
                launcher.cleanup({'LORCANA_CI_PROJECT': 'lorcana-online-tcg_devcontainer'})
            run.assert_not_called()

    def test_cleanup_verifies_remaining_owned_resources(self):
        env = {'LORCANA_CI_PROJECT': 'lorcana-ci-' + 'a' * 32, 'LORCANA_CI_COMPOSE': 'fixture'}
        with patch.object(launcher, 'run', side_effect=[None, 'remaining\n']):
            with self.assertRaises(RuntimeError):
                launcher.cleanup(env)
        with patch.object(launcher, 'run', side_effect=[None, '', '', '']) as run:
            launcher.cleanup(env)
            self.assertEqual(run.call_count, 4)

    def test_cleanup_checks_stopped_owned_containers(self):
        env = {'LORCANA_CI_PROJECT': 'lorcana-ci-' + 'a' * 32, 'LORCANA_CI_COMPOSE': 'fixture'}
        def run(command, **_kwargs):
            return 'stopped-container\n' if command[:3] == ['docker', 'container', 'ls'] and '--all' in command else ''
        with patch.object(launcher, 'run', side_effect=run):
            with self.assertRaises(RuntimeError):
                launcher.cleanup(env)

    def test_source_copy_rejects_private_paths_and_symlinks(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            for path in ('.env.local', '../outside', '.local/database.json'):
                with patch.object(launcher, 'run', return_value=path + '\0'):
                    with self.assertRaises(RuntimeError):
                        launcher.source_paths(root)
            (root / 'link').symlink_to('/etc/hostname')
            with patch.object(launcher, 'run', return_value='link\0'):
                with self.assertRaises(RuntimeError):
                    launcher.source_paths(root)

    def test_command_failure_does_not_print_captured_private_output(self):
        value = subprocess.CompletedProcess(['fixture'], 1, stdout='private', stderr='private')
        with patch.object(launcher.subprocess, 'run', return_value=value):
            with self.assertRaisesRegex(RuntimeError, '^CI host command failed: fixture$'):
                launcher.run(['fixture'], capture=True)

    def test_workflow_guards_shallow_history_permissions_mutable_actions_and_failure_upload(self):
        workflow = yaml.safe_load((ROOT / '.github/workflows/foundation.yml').read_text())
        compose = yaml.safe_load((ROOT / 'infra/compose.ci.yaml').read_text())
        toolchain = json.loads((ROOT / 'toolchain.json').read_text())
        config.validate(workflow, compose, toolchain)
        mutations = [lambda w: w['jobs']['foundation']['steps'][0]['with'].update({'fetch-depth': 1}),
                     lambda w: w.update({'permissions': {'contents': 'write'}}),
                     lambda w: w['jobs']['foundation']['steps'][0].update({'uses': 'actions/checkout@v7'}),
                     lambda w: w['jobs']['foundation'].update({'permissions': {'contents': 'write'}}),
                     lambda w: w['jobs']['foundation']['steps'][2].update({'if': 'always()'}),
                     lambda w: w['jobs']['design-system']['steps'][0]['with'].update({'fetch-depth': 1}),
                     lambda w: w['jobs']['design-system']['steps'][0].update({'uses': 'actions/checkout@v7'}),
                     lambda w: w['jobs']['design-system']['steps'][1].update({'run': 'python3 scripts/ci-local.py'}),
                     lambda w: w['jobs']['design-system'].update({'permissions': {'contents': 'write'}}),
                     lambda w: w['jobs'].pop('design-system')]
        for mutate in mutations:
            bad = copy.deepcopy(workflow)
            mutate(bad)
            with self.assertRaises(AssertionError):
                config.validate(bad, compose, toolchain)


if __name__ == '__main__':
    unittest.main()
