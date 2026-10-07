# Infrastructure ownership

`compose.persistence.yaml` is an executable BOOT-02 disposable database recreation proof, managed only by [the host proof script](../scripts/db-persistence-proof.py) and [database runbook](../docs/runbooks/database.md). It uses the pinned PostgreSQL image, a discovered existing development image, no host ports, non-root read-only source runner and a project-specific volume mounted at `/var/lib/postgresql`. The script owns and cleans only its unique project. Existing VS Code Compose services remain in `.devcontainer/compose.yaml`.

`compose.ci.yaml` is the separate BOOT-03 disposable pipeline project owned by `scripts/ci-local.py`; see [CI operation](../docs/runbooks/ci.md). It uses generated temporary credentials, a Dockerfile-built image and private PostgreSQL, with no published ports or existing volume references.

Production/staging hosting, deployments, budgets, production secrets, backups and monitoring remain reserved. This file does not provision them. Director authorization is required for spending or deployment.
