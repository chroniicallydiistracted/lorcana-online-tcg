# Workspace setup on Andre's PC

## Existing workspace and evidence

The Director confirmed the initial Dev Container build, post-create pipeline, authenticated bootstrap database check and Windows connectivity diagnostic on 5 October 2026. Git main was published at `335da7e`; the repository was public at that observation. Repository visibility remains the Director's decision. Current application evidence and pending checks are in [workspace qualification](../WORKSPACE_QUALIFICATION.md) and [BOOT-01 validation](../validation/boot-01.md).

Use `/home/andre/lorcana-online-tcg` in Ubuntu WSL2, with Windows VS Code and Docker Desktop's Ubuntu integration. Explorer can reach `\\wsl.localhost\Ubuntu\home\andre\lorcana-online-tcg`. Do not extract the starter over this existing Git checkout, reinitialize Git, move source into `/mnt/c`, regenerate credentials or delete database volumes.

## New checkout only

In Ubuntu, from the intended Linux source directory:

```bash
python3 scripts/init-local-env.py
docker compose -f .devcontainer/compose.yaml config --quiet
code .
```

The generator creates owner-only `.env.local` and preserves existing values. `config --quiet` validates configuration without printing secret-bearing interpolation. Never paste `.env.local`, a full Compose configuration or an environment dump.

## Open or rebuild the container

In Windows VS Code use **Dev Containers: Reopen in Container**. After Dockerfile changes use **Rebuild Container**, preserving the named database volume. The workspace runs as `node`, with source at `/workspaces/lorcana-online-tcg`. It installs Node 24.21.0, pnpm 10.33.0, Git, Python/PyYAML, psql, ripgrep and Chromium test libraries. No extra host Node or undocumented manual tooling install is needed.

The original post-create pipeline remains doctor → frozen install → configuration/syntax checks → bootstrap tests → authenticated database check. Its success proves workspace bootstrap, not full application or game acceptance. Run application checks separately:

```bash
pnpm run doctor
pnpm install --frozen-lockfile
pnpm verify:foundation
pnpm db:check
pnpm --filter @lorcana/web exec playwright install chromium
pnpm test:e2e:smoke
pnpm dev
```

Bare `pnpm doctor` invokes pnpm's built-in doctor; use `pnpm run doctor` to run this repository's checks. The post-create script invokes the repository doctor directly and is unaffected. Playwright's pinned browser download uses the container user's cache; its Linux shared libraries are committed in the image.

## Browser and services

VS Code forwards web **5173**, API **3001** and match **3002**. Open web from the Ports panel; normally the Windows URL is `http://localhost:5173`. Expect Application foundation and both services ready. Start rendering to display three neutral card shapes; stop/start and resize the window to check lifecycle. This is a foundation preview, not final game design or certified GPU performance.

The web server uses same-origin `/api` and `/match` proxies; no cross-origin permission is needed. API/match `/healthz` report process liveness; `/readyz` reports foundation readiness. They do not check a database or engine. Worker has no public ingress or job execution. Root development strips bootstrap database credentials from child environments, reloads server source and stops the stack on service failure. Ctrl+C stops owned processes. A busy port fails startup; do not kill unrelated listeners. Stop the specific old connectivity process if it still uses 5173.

`pnpm dev:smoke` remains the original independent connectivity server. Run it only with 5173 free. Its plain diagnostic does not verify React, Babylon, rules or auth. Browser automation also needs 5173/3001/3002 free; stop interactive development before running it. Linux software WebGL and actual Windows browser evidence are recorded separately.

## Container and database management

The workspace has no Docker CLI/socket. Discover the active Compose project through Docker Desktop, the Dev Containers log or selective host Docker labels. At BOOT-01 inspection it was `lorcana-online-tcg_devcontainer`; do not hardcode its container IDs for future sessions. Manage services from Ubuntu/Windows against that actual project, not an inferred alternate Compose project.

PostgreSQL is reached at `postgres:5432` only on the private Compose network, with its volume at `/var/lib/postgresql` and no published host port. Closing/reopening the editor preserves that named volume; preservation has not yet been demonstrated through container recreation. BOOT-02 must implement restricted migration/application roles, migrations and an isolated test database, then prove persistence. `pnpm db:check` uses the existing bootstrap administrator only.

An initialized volume retains its original password. Do not regenerate it while reusing that volume. Debian's psql utility is not a version-matched PostgreSQL 18 backup client; backup/restore tooling remains future work.

## Diagnosis

| Symptom | Check |
|---|---|
| Container reopen missing | Windows VS Code WSL and Dev Containers extensions; correct WSL source folder |
| Toolchain or environment doctor fails | Dev Container terminal, exact pins, owner-only local file; never print credentials |
| Frozen install or peers fail | Specific registry/peer error, owning manifests and lockfile; preserve strict peers |
| Headless Chromium lacks a library | Rebuild from committed Dockerfile; install the pinned browser cache inside that container |
| Database connection fails | Actual project's postgres health and matching existing credentials |
| Service port occupied | Stop the specific prior foundation/connectivity process; preserve unrelated listeners |
| Windows page unavailable | Running `pnpm dev`, VS Code Ports panel's actual forwarded URL |
| WebGL unavailable | Semantic stop control remains usable; record browser/GPU failure separately |
| Large bundle warning | Known synthetic renderer size; later performance work, not an installation failure |

Keep all validation categories distinct. No CI, deployment, production security/image qualification or game/device acceptance is implied by these local steps.
