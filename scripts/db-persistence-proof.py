#!/usr/bin/env python3
"""Host-only disposable PostgreSQL recreation proof with canonical execution evidence."""
import datetime
import hashlib
import json
import os
from pathlib import Path
import re
import subprocess
import sys
import signal
import time
import uuid

ROOT = Path(__file__).resolve().parent.parent

def utc():
    return datetime.datetime.now(datetime.timezone.utc).isoformat(timespec='milliseconds').replace('+00:00', 'Z')

def redact(text, secrets):
    count = 0
    for secret in sorted(set(secrets), key=len, reverse=True):
        if secret:
            count += text.count(secret)
            text = text.replace(secret, '[REDACTED]')
    text, pem_count = re.subn(r'-----BEGIN [^-]*PRIVATE KEY-----[\s\S]*?-----END [^-]*PRIVATE KEY-----', '[REDACTED PRIVATE KEY]', text)
    text, uri_count = re.subn(r'(postgres(?:ql)?://[^:\s/]+:)[^@\s]+@', r'\1[REDACTED]@', text)
    return text, count + pem_count + uri_count

def main():
    if len(sys.argv) != 3 or sys.argv[1] != '--id' or not re.fullmatch(r'RUN-\d{8}-\d{3}', sys.argv[2]):
        raise ValueError('Use --id RUN-YYYYMMDD-NNN')
    run_id = sys.argv[2]
    record_path = ROOT / 'docs/validation/runs' / (run_id + '.json')
    log_relative = 'docs/validation/logs/' + run_id + '.txt'
    if record_path.exists() or (ROOT / log_relative).exists():
        raise ValueError('Evidence ID already exists')
    # Capture only selected public metadata; never dump Docker environment or resolved Compose config.
    def capture(args, env=None, timeout=180):
        return subprocess.run(args, cwd=ROOT, env=env, text=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, timeout=timeout, check=False)
    containers = capture(['docker', 'ps', '--filter', 'label=com.docker.compose.service=workspace', '--format', '{{.ID}}']).stdout.split()
    matching = []
    for candidate in containers:
        mounts = capture(['docker', 'inspect', '--format', '{{json .Mounts}}', candidate])
        if mounts.returncode == 0 and any(m.get('Source') == str(ROOT) and m.get('Destination') == '/workspaces/lorcana-online-tcg' for m in json.loads(mounts.stdout)):
            matching.append(candidate)
    if len(matching) != 1:
        raise ValueError('One existing workspace bound to this source must be discovered')
    workspace = matching[0]
    image = capture(['docker', 'inspect', '--format', '{{.Image}}', workspace]).stdout.strip()
    if not re.fullmatch(r'sha256:[0-9a-f]{64}', image):
        raise ValueError('Workspace image not discovered')
    def fingerprint():
        result = capture(['docker', 'exec', '-u', 'node', '-w', '/workspaces/lorcana-online-tcg', workspace, 'node', '--input-type=module', '-e', "import {sourceFingerprint} from './scripts/documentation-lib.mjs'; console.log(sourceFingerprint());"])
        if result.returncode or not re.fullmatch(r'[0-9a-f]{64}\n?', result.stdout):
            raise ValueError('Source identity unavailable')
        return result.stdout.strip()
    before = fingerprint()
    commit = capture(['git', 'rev-parse', 'HEAD']).stdout.strip()
    versions = capture(['docker', 'exec', workspace, 'node', '-e', 'console.log(JSON.stringify({node:process.versions.node,platform:process.platform,architecture:process.arch,user_id:process.getuid()}))'])
    environment = json.loads(versions.stdout)
    environment.update(executor='WSL Docker orchestration with disposable container execution', workspace_image=image)
    environment['pnpm'] = capture(['docker', 'exec', workspace, 'pnpm', '--version']).stdout.strip()
    secrets = [value for key, value in os.environ.items() if value and re.search(r'password|secret|token|credential|private_key', key, re.I)]
    for line in (ROOT / '.env.local').read_text().splitlines():
        key, sep, value = line.partition('=')
        if sep and re.search(r'password|secret|token|credential|private_key', key, re.I):
            secrets.append(value.strip().strip('\"\''))
    passwords = json.loads((ROOT / '.local/database.json').read_text())['passwords']
    secrets.extend(value for target in passwords.values() for value in target.values())
    project = 'lorcana-proof-' + uuid.uuid4().hex[:12]
    environment['compose_project'] = project
    compose = ['docker', 'compose', '-p', project, '-f', 'infra/compose.persistence.yaml']
    env = dict(os.environ, LORCANA_PROOF_WORKSPACE_IMAGE=image)
    started, monotonic = utc(), time.monotonic()
    log, code, reason, observed_signal = [], 0, None, None
    def interrupted(signum, _frame):
        nonlocal observed_signal
        observed_signal = signal.Signals(signum).name
        raise InterruptedError('Disposable proof interrupted')
    previous = {sig: signal.signal(sig, interrupted) for sig in (signal.SIGINT, signal.SIGTERM)}
    def step(args, label):
        try:
            result = capture(compose + args, env)
        except subprocess.TimeoutExpired as error:
            output = error.stdout or ''
            if isinstance(output, bytes):
                output = output.decode(errors='replace')
            log.append(label + '\n' + output + '\n[Step timed out]')
            raise
        log.append(label + '\n' + result.stdout)
        if result.returncode:
            raise RuntimeError('Disposable proof step failed: ' + label)
    def server_logs_private():
        result = capture(compose + ['logs', '--no-color', 'postgres'], env)
        if result.returncode:
            raise RuntimeError('Server logging proof unavailable')
        if any(secret and secret in result.stdout for secret in secrets):
            raise RuntimeError('Known private value detected in disposable server log')
        log.append('PASS duration/sampled/transaction server logging enabled; no known private credentials in server log')
    try:
        step(['config', '--quiet'], 'Validate disposable Compose configuration')
        step(['up', '-d', '--wait', '--wait-timeout', '120', 'postgres'], 'Start isolated pinned PostgreSQL')
        token = str(uuid.uuid4())
        step(['run', '--rm', '--no-deps', 'runner', 'node', 'packages/db/dist/persistence-probe.js', 'seed', token], 'Seed local/test typed markers and journals')
        server_logs_private()
        step(['stop', 'postgres'], 'Stop only the proof PostgreSQL container')
        step(['rm', '-f', 'postgres'], 'Remove proof container; retain proof volume')
        step(['up', '-d', '--wait', '--wait-timeout', '120', 'postgres'], 'Recreate proof PostgreSQL against retained volume')
        step(['run', '--rm', '--no-deps', 'runner', 'node', 'packages/db/dist/persistence-probe.js', 'check', token], 'Verify local/test rows and journals after recreation')
        step(['run', '--rm', '--no-deps', 'runner', 'node', '--test', 'packages/db/tests/integration.test.mjs'], 'Verify actual role restrictions and migration rollback after recreation')
        server_logs_private()
    except InterruptedError:
        code, reason = 1, 'interrupted'
        log.append('Disposable proof interrupted; cleanup retains project ownership')
    except subprocess.TimeoutExpired:
        code, reason = 1, 'timeout'
        log.append('Disposable proof step timed out')
    except Exception as error:
        code = 1
        log.append(str(error))
    finally:
        # Complete owned-resource cleanup even when interrupted; ignore repeated cancellation briefly.
        for sig in previous:
            signal.signal(sig, signal.SIG_IGN)
        try:
            step(['down', '--volumes', '--remove-orphans'], 'Clean only the disposable proof project and volume')
        except Exception:
            code = 1
            log.append('Disposable cleanup failed; project identity is recorded for ownership-aware recovery')
    try:
        remaining = capture(['docker', 'ps', '-a', '--filter', 'label=com.docker.compose.project=' + project, '--format', '{{.ID}}'])
        volumes = capture(['docker', 'volume', 'ls', '--filter', 'label=com.docker.compose.project=' + project, '--format', '{{.Name}}'])
        if remaining.returncode or volumes.returncode or remaining.stdout.strip() or volumes.stdout.strip():
            code = 1
            log.append('Owned disposable resources remain or cleanup identity check failed')
        else:
            log.append('PASS no disposable containers or volumes remain')
        if fingerprint() != before:
            code, reason = 1, 'source_changed'
    except Exception:
        code, reason = 1, 'source_changed'
        log.append('Final source/resource identity unavailable; retain failed receipt')
    finished, elapsed = utc(), round((time.monotonic() - monotonic) * 1000)
    wall = (datetime.datetime.fromisoformat(finished.replace('Z', '+00:00')) - datetime.datetime.fromisoformat(started.replace('Z', '+00:00'))).total_seconds() * 1000
    discontinuity = wall < 0 or abs(wall - elapsed) > 1000
    if discontinuity:
        code, reason = 1, 'clock_changed'
    text, redactions = redact('\n'.join(log) + '\n', secrets)
    record = dict(schema_version=1, id=run_id, category='container', command=['python3', 'scripts/db-persistence-proof.py', '--id', run_id], cwd=str(ROOT), environment=environment, source_commit=commit, source_fingerprint=before, started_at=started, finished_at=finished, recorded_at=finished, time_precision='clock_discontinuous' if discontinuity else 'exact', elapsed_ms=elapsed, clock_discontinuity=discontinuity, expected_exit_code=0, exit_code=code, signal=observed_signal, result='passed' if code == 0 else 'failed', failure_reason=reason, summary='Actual host-orchestrated disposable PostgreSQL recreation: typed rows/journals and role/transaction checks; existing VS Code project/volume untouched', log_path=log_relative, log_sha256=hashlib.sha256(text.encode()).hexdigest(), redactions=redactions)
    with (ROOT / log_relative).open('x') as stream:
        stream.write(text)
    with record_path.open('x') as stream:
        json.dump(record, stream, indent=2)
        stream.write('\n')
    for sig, handler in previous.items():
        signal.signal(sig, handler)
    print(record['result'].upper() + ' ' + run_id + ' disposable project ' + project)
    return code

if __name__ == '__main__':
    try:
        sys.exit(main())
    except Exception:
        print('Persistence proof could not start; inspect workspace access and private configuration without exposing credentials', file=sys.stderr)
        sys.exit(1)
