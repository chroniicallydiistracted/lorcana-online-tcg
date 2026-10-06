# Lorcana Online TCG — workspace foundation

This repository starts the desktop-first web game described in `docs/vision/Development_Blueprint_2026-10-05.md`. Smartphone and tablet support develop alongside it. The client, server and rules engine are not implemented by this workspace starter.

The starter supplies a pinned Linux development toolchain, local PostgreSQL, owner-only local credentials, workspace checks and a browser connectivity server. The browser response is a plain diagnostic message, not a product design proposal.

## Open this workspace

Use Windows 11, Ubuntu under WSL2, Docker Desktop's Ubuntu integration and VS Code installed on Windows with WSL and Dev Containers extensions. Keep the source in the Linux filesystem, here `/home/andre/lorcana-online-tcg`.

After extracting this archive's contents directly into that folder, run these commands in Ubuntu:

```bash
cd /home/andre/lorcana-online-tcg
python3 scripts/init-local-env.py
docker compose -f .devcontainer/compose.yaml config --quiet
code .
```

In VS Code, use **Ctrl+Shift+P → Dev Containers: Reopen in Container**. Accept the workspace trust prompt for these reviewed project files. The initial build downloads the pinned images and installs the development tools. Wait for the post-create checks to finish; opening the editor alone does not mean setup passed.

Inside the Dev Container terminal:

```bash
pnpm doctor
pnpm verify
pnpm test:bootstrap
pnpm db:check
pnpm dev:smoke
```

Open forwarded port **5173** from VS Code's **Ports** panel. The page should show `Lorcana workspace connection ready.` Stop the connectivity server with **Ctrl+C**. If the local port is free and forwarded as 5173, the Windows browser URL is `http://localhost:5173`; the Ports panel supplies the actual URL if a different local port was chosen.

See `docs/runbooks/workspace-setup.md` for diagnosis, persistence checks and Git initialization. Node and pnpm are installed in the container; the Ubuntu host does not need an additional Node installation for this setup.

## Installed versus planned

| Item | Starter status |
|---|---|
| Node / pnpm | Container pins 24.21.0 / 10.33.0 |
| PostgreSQL | Official version-18 image pinned by digest; private Compose network |
| Application packages | Directories reserved; no application dependencies installed yet |
| TypeScript, React, Vite, Babylon, Fastify | Exact research versions recorded in `docs/vision/dependencies.json`; add in owning workspaces during BOOT-01 |
| Game engine and real cards | Not vendored or activated; qualify through the engine adapter |
| Auth, migrations, restricted app roles | Not implemented; tracked foundation work |
| Tests | Bootstrap-only checks, not game/rules acceptance |
| Cloud services, CI, deployment | Not provisioned or implemented |

The pnpm lockfile covers this starter's dependency-free root only. It is not the 61-package planning fixture's lockfile. Avoid installing every planned library at the root.

## Source layout

- `apps/web`, `apps/api`, `apps/match-service`, `apps/worker`: future deployment applications.
- `packages/contracts`, `engine-adapter`, `rules-data`, `domain`, `db`, `design-system`, `presentation`, `testkit`: planned responsibility boundaries.
- `vendor/tcg-engines`: reserved for a qualified, pinned upstream closure.
- `.devcontainer`: development image, Compose services and editor integration.
- `scripts`, `tests`: executable workspace checks.
- `docs/vision`: blueprint, original checklist, traceability and research baseline.
- `docs/adr`, `docs/runbooks`, `infra`: architecture decisions and operations.

Reserved app/package folders contain README files only; they become actual pnpm workspaces when their package manifests are implemented.

## Next development work

1. Finish BOOT-01: correctly scoped TypeScript packages, minimal real web/API/worker builds, quality tools and enforced import boundaries.
2. Finish BOOT-02: restricted application/migration roles, real migrations, test databases and verified storage persistence.
3. BOOT-03/05: CI, release/protocol contracts and reproducible validation.
4. Run RULE-01/02 and UX-01/02 alongside the foundation: authoritative rules inventory, engine qualification and authored visual direction.

This archive prepares parts of BOOT-01/02; neither backlog item is complete. Record actual results in `docs/WORKSPACE_QUALIFICATION.md` before declaring the local workspace qualified.
