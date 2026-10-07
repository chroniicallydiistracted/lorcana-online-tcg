"""Static CI policy check; does not claim GitHub-hosted execution."""
import json
from pathlib import Path
import yaml

ROOT = Path(__file__).resolve().parents[2]


def validate(workflow, compose, toolchain):
    # PyYAML's YAML1.1 parser recognizes the key 'on' as True.
    triggers = workflow.get('on', workflow.get(True))
    assert set(triggers) == {'pull_request', 'push', 'workflow_dispatch'}
    assert triggers['push']['branches'] == ['main']
    assert workflow['permissions'] == {'contents': 'read'}
    assert workflow['concurrency']['cancel-in-progress'] is True
    assert set(workflow['jobs']) == {'foundation'}
    job = workflow['jobs']['foundation']
    assert set(job) == {'runs-on', 'timeout-minutes', 'steps'}
    assert job['runs-on'] == 'ubuntu-24.04' and job['timeout-minutes'] == 30
    checkout, pipeline, upload = job['steps']
    assert set(checkout) == {'name', 'uses', 'with'}
    assert set(pipeline) == {'name', 'env', 'run'}
    assert set(upload) == {'name', 'uses', 'with'}
    assert checkout['uses'] == 'actions/checkout@3d3c42e5aac5ba805825da76410c181273ba90b1'
    assert checkout['with'] == {'fetch-depth': 0, 'persist-credentials': False}
    assert pipeline['run'] == 'python3 scripts/ci-local.py'
    assert pipeline['env'] == {'LORCANA_CI_ARTIFACT_DIR': '.local/ci-upload'}
    assert upload['uses'] == 'actions/upload-artifact@bbbca2ddaa5d8feaa63e36b76fdaad77386f024f'
    assert 'if' not in upload  # Default success(), never always() or failure().
    assert upload['with']['path'] == '.local/ci-upload/artifacts/'
    assert upload['with']['include-hidden-files'] is False
    assert upload['with']['if-no-files-found'] == 'error' and upload['with']['retention-days'] == 14
    assert '${{ secrets.' not in json.dumps(workflow)
    services = compose['services']
    assert set(services) == {'runner', 'postgres'}
    assert services['postgres']['image'] == toolchain['postgresImage']
    assert services['postgres']['volumes'] == ['ci_data:/var/lib/postgresql']
    assert services['runner']['init'] is True
    assert services['runner']['user'] == '${LORCANA_CI_UID:?Non-root host UID}:${LORCANA_CI_GID:?Host GID}'
    assert set(compose['volumes']) == {'ci_data'}
    for service in services.values():
        assert 'ports' not in service and 'privileged' not in service
        assert service['env_file'] == '${LORCANA_CI_SOURCE:?Temporary public checkout required}/.env.local'
    assert 'docker.sock' not in json.dumps(compose)
    assert services['runner']['volumes'][0]['source'] == '${LORCANA_CI_SOURCE:?Temporary public checkout required}'


if __name__ == '__main__':
    validate(yaml.safe_load((ROOT / '.github/workflows/foundation.yml').read_text()),
             yaml.safe_load((ROOT / 'infra/compose.ci.yaml').read_text()),
             json.loads((ROOT / 'toolchain.json').read_text()))
    print('PASS reviewed workflow identities/permissions/triggers and isolated Compose policy (static only)')
