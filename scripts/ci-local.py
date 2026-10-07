"""Run the same isolated foundation CI on a Linux/WSL Docker host and GitHub runner."""
import argparse
import json
import os
from pathlib import Path
import re
import shutil
import signal
import stat
import subprocess
import tempfile
import uuid


def run(command, cwd=None, env=None, capture=False, timeout=900):
    result = subprocess.run(command, cwd=cwd, env=env, text=True,
                            stdout=subprocess.PIPE if capture else None,
                            stderr=subprocess.PIPE if capture else None, timeout=timeout)
    if result.returncode:
        # Captured diagnostics may contain private environment; do not print them.
        raise RuntimeError('CI host command failed: ' + command[0])
    return result.stdout if capture else None


def source_paths(root):
    raw = run(['git', 'ls-files', '-z', '-c', '-o', '--exclude-standard'], root, capture=True)
    paths = sorted(set(raw.split('\0')) - {''})
    public = []
    for path in paths:
        parts = Path(path).parts
        if not parts or Path(path).is_absolute() or any(p in ('.', '..', '.git', '.local', 'node_modules', 'dist') for p in parts) or '\\' in path or '\n' in path or '\r' in path:
            raise RuntimeError('Unsafe public source path')
        if re.search(r'(?:^|/)(?:\.env(?:\..*)?|.*\.(?:pem|key))$', path) and path != '.env.example':
            raise RuntimeError('Private file is tracked or unignored')
        file = root / path
        if not file.exists() and not file.is_symlink():
            continue  # An intentional working-tree deletion remains deleted in the copy.
        if file.is_symlink() or not file.is_file() or not file.resolve().is_relative_to(root.resolve()):
            raise RuntimeError('Source must contain regular owned files only')
        public.append(path)
    return public


def known_credentials(root):
    values = []
    env_file = root / '.env.local'
    if env_file.exists():
        if env_file.is_symlink() or stat.S_IMODE(env_file.stat().st_mode) != 0o600:
            raise RuntimeError('Existing private environment mode is unsafe')
        for line in env_file.read_text().splitlines():
            if line.startswith('POSTGRES_PASSWORD='):
                values.append(line.split('=', 1)[1].encode())
    credentials = root / '.local/database.json'
    if credentials.exists():
        if credentials.is_symlink() or stat.S_IMODE(credentials.stat().st_mode) != 0o600:
            raise RuntimeError('Existing database credential mode is unsafe')
        data = json.loads(credentials.read_text())
        values.extend(value.encode() for roles in data['passwords'].values() for value in roles.values())
    return [value for value in values if len(value) >= 16]


def copy_source(root, destination):
    if run(['git', 'rev-parse', '--is-shallow-repository'], root, capture=True).strip() != 'false':
        raise RuntimeError('Full Git history required; shallow source refused')
    paths, secrets = source_paths(root), known_credentials(root)
    for path in paths:
        if any(secret in (root / path).read_bytes() for secret in secrets):
            raise RuntimeError('Known private credential found in public source; value withheld')
    # Inspect historical blobs before copying: new disposable values cannot identify old local secrets.
    if secrets:
        objects = run(['git', 'rev-list', '--objects', '--all', '--no-object-names'], root, capture=True)
        checked = subprocess.run(['git', 'cat-file', '--batch-check=%(objectname) %(objecttype)'], cwd=root, input=objects.encode(), capture_output=True, timeout=120)
        if checked.returncode:
            raise RuntimeError('Unable to inspect credential history')
        blobs = b'\n'.join(line.split()[0] for line in checked.stdout.splitlines() if line.endswith(b' blob')) + b'\n'
        history = subprocess.run(['git', 'cat-file', '--batch'], cwd=root, input=blobs, capture_output=True, timeout=120)
        if history.returncode or any(secret in history.stdout for secret in secrets):
            raise RuntimeError('Known private credential history rejected; value withheld')
    run(['git', 'clone', '--local', '--no-hardlinks', '--no-checkout', str(root), str(destination)], capture=True)
    run(['git', 'reset', '--mixed', 'HEAD'], destination, capture=True)
    for path in paths:
        target = destination / path
        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(root / path, target)


def compose(env, *args, capture=False, timeout=900):
    project = env.get('LORCANA_CI_PROJECT', '')
    if not re.fullmatch(r'lorcana-ci-[a-f0-9]{32}', project):
        raise RuntimeError('Refusing unowned Compose identity')
    return run(['docker', 'compose', '-f', env['LORCANA_CI_COMPOSE'], '-p', project, *args], env=env, capture=capture, timeout=timeout)


def cleanup(env):
    compose(env, 'down', '--volumes', '--remove-orphans', timeout=120)
    for kind in ('container', 'volume', 'network'):
        args = ['docker', kind, 'ls', '-q', '--filter', 'label=com.docker.compose.project=' + env['LORCANA_CI_PROJECT']]
        if kind == 'container':
            args.append('--all')
        if run(args, env=env, capture=True).strip():
            raise RuntimeError('CI cleanup left owned resources')


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--evidence-id')
    options = parser.parse_args()
    if options.evidence_id and not re.fullmatch(r'RUN-\d{8}-\d{3}', options.evidence_id):
        raise RuntimeError('Invalid evidence ID')
    root = Path(__file__).resolve().parents[1]
    project = 'lorcana-ci-' + uuid.uuid4().hex
    # Do not carry administrator values, auth tokens or arbitrary Compose overrides from the caller.
    env = {key: os.environ[key] for key in ('PATH', 'DOCKER_HOST', 'DOCKER_CONTEXT', 'DOCKER_CONFIG') if key in os.environ}
    env.update(LORCANA_CI_PROJECT=project, LORCANA_CI_IMAGE=project + ':workspace',
               LORCANA_CI_UID=str(os.getuid()), LORCANA_CI_GID=str(os.getgid()),
               LORCANA_CI_COMPOSE=str(root / 'infra/compose.ci.yaml'))
    if os.getuid() == 0:
        raise RuntimeError('Use a non-root Linux/WSL host account')
    result = root / '.local/ci-results' / project
    upload = os.environ.get('LORCANA_CI_ARTIFACT_DIR')
    if upload:
        if upload != '.local/ci-upload':
            raise RuntimeError('Only the reviewed Actions upload directory is supported')
        result = root / upload
    if result.exists() or result.is_symlink():
        raise RuntimeError('Refusing to overwrite an existing CI result')
    image_created = False
    result_created = False
    cleanup_active = False
    cancelled = False
    def interrupted(_signal, _frame):
        nonlocal cancelled
        cancelled = True
        if cleanup_active:
            return  # Finish bounded cleanup, then reject success publication.
        raise KeyboardInterrupt('CI interrupted')
    previous = {sig: signal.signal(sig, interrupted) for sig in (signal.SIGINT, signal.SIGTERM)}
    try:
        with tempfile.TemporaryDirectory(prefix='lorcana-ci-') as temporary:
            source = Path(temporary) / 'source'
            copy_source(root, source)
            local = source / '.local'
            local.mkdir(mode=0o700)
            (local / 'ci-isolation.json').write_text(json.dumps({'project': project}))
            # The image build sees only the Dockerfile, never the checkout/credentials.
            context = Path(temporary) / 'image'
            context.mkdir()
            shutil.copyfile(source / '.devcontainer/Dockerfile', context / 'Dockerfile')
            run(['docker', 'build', '--tag', env['LORCANA_CI_IMAGE'], str(context)], env=env)
            image_created = True
            image_id = run(['docker', 'image', 'inspect', '--format', '{{.Id}}', env['LORCANA_CI_IMAGE']], env=env, capture=True).strip()
            (local / 'ci-isolation.json').write_text(json.dumps({'project': project, 'workspace_image_id': image_id}))
            env['LORCANA_CI_SOURCE'] = str(source)
            # init-local-env preserves existing values; source has no credentials until now.
            run(['python3', str(source / 'scripts/init-local-env.py')], source, env={**env, 'PATH': os.environ['PATH']})
            private = source / '.env.local'
            value = private.read_text().replace('POSTGRES_DB=lorcana_local', 'POSTGRES_DB=lorcana_ci_bootstrap')
            if 'POSTGRES_DB=lorcana_ci_bootstrap' not in value:
                raise RuntimeError('Unexpected disposable bootstrap configuration')
            private.write_text(value)
            success = False
            try:
                compose(env, 'up', '-d', '--wait', '--wait-timeout', '120', 'postgres', timeout=180)
                command = ['pnpm', 'ci:verify']
                if options.evidence_id:
                    command = ['pnpm', 'evidence:run', '--id', options.evidence_id, '--category', 'container', '--summary', 'Actual isolated BOOT-03 pipeline: frozen foundation, live PostgreSQL, Linux browser, dependency/secret scans and artifacts', '--', *command]
                # Initial frozen install makes the recorder/schema tools available in a genuinely fresh copy.
                compose(env, 'run', '--rm', 'runner', 'pnpm', 'install', '--frozen-lockfile')
                compose(env, 'run', '--rm', 'runner', *command)
                success = True
            finally:
                cleanup_active = True
                try:
                    cleanup(env)
                finally:
                    if options.evidence_id:
                        for folder, extension in (('runs', '.json'), ('logs', '.txt')):
                            relative = Path('docs/validation') / folder / (options.evidence_id + extension)
                            receipt = source / relative
                            if receipt.exists() and receipt.stat().st_size:
                                target = root / relative
                                target.parent.mkdir(parents=True, exist_ok=True)
                                with target.open('xb') as stream:
                                    stream.write(receipt.read_bytes())
                run(['docker', 'image', 'rm', env['LORCANA_CI_IMAGE']], env=env, capture=True, timeout=60)
                image_created = False
                if cancelled:
                    raise KeyboardInterrupt('CI cancelled during cleanup; no result published')
                cleanup_active = False
            if success:
                result.parent.mkdir(parents=True, exist_ok=True, mode=0o700)
                result.mkdir(mode=0o700)
                result_created = True
                shutil.copytree(local / 'ci-artifacts', result / 'artifacts')
                (result / 'host.json').write_text(json.dumps({'project': project, 'workspace_image_id': image_id, 'owned_resources_remaining': 0, 'owned_image_removed': True, 'result': 'passed', 'source_copy': 'public working tree plus full Git ancestry'}, indent=2) + '\n')
                print('PASS isolated pipeline and cleanup. Artifacts: ' + str(result / 'artifacts'))
    except BaseException:
        if result_created:
            shutil.rmtree(result)
        raise
    finally:
        cleanup_active = True
        try:
            # Covers failure after a successful build, before Compose startup too.
            if image_created:
                run(['docker', 'image', 'rm', env['LORCANA_CI_IMAGE']], env=env, capture=True, timeout=60)
        finally:
            for sig, handler in previous.items():
                signal.signal(sig, handler)


if __name__ == '__main__':
    try:
        main()
    except (Exception, KeyboardInterrupt) as error:
        print('CI failed: ' + str(error))
        raise SystemExit(1)
