# Workspace qualification record

Director handoff: 2026-10-05, America/Phoenix. Agent validation: 2026-10-06 UTC (2026-10-05 local). See [BOOT-01 evidence](validation/boot-01.md) for command results and clean-source identity.

## Historical evidence supplied by the Director

| Observation | Director evidence |
|---|---|
| Host | Windows 11; WSL 2.7.14.0 / Ubuntu WSL2; Git 2.43.0; Docker Desktop 4.93.0 / Engine 29.8.1; Compose 5.5.1 |
| Source and Git | Linux source path; main `335da7e` successfully published; 61 tracked files, clean tree and no tracked `.env.local` |
| Initial Dev Container | Digest-pinned image built and services started; non-root setup pipeline ended “Dev Container setup passed.” |
| Bootstrap checks | Pinned toolchain/env, frozen install, configuration/syntax, one HTTP plus four credential tests, authenticated PostgreSQL 18 connection passed |
| Windows connectivity | Forwarded 5173 displayed the original plain connectivity message; infrastructure access only |

These are historical Director observations, not agent-executed tests. Original archive preparation evidence remains in `VALIDATION_RESULTS.json` under its [provenance scope](ARCHIVE_PROVENANCE.md).

## Fresh agent observations and checks

| Check | Result and scope |
|---|---|
| Repository before editing | Clean main at `335da7edffea40294b8dcf60ae256524432c350b`; correct origin; scoped branch `codex/boot-01-foundation` |
| Existing services | Discovered actual workspace/postgres and Compose project `lorcana-online-tcg_devcontainer`; bind source and database volume preserved |
| Execution | Application checks through Docker exec inside existing committed Dev Container, not host Node |
| Toolchain/environment | Explicit `pnpm run doctor` passed seven project checks; Node 24.21.0, pnpm 10.33.0, Linux; credential values never printed |
| UID/GID | Actual container `node` user UID 1000 / GID 1000 |
| Database | Actual authenticated read-only version query: PostgreSQL 18.6 (Debian 18.6-1.pgdg13+2); `pnpm db:check` passed |
| Original baseline | Preserved verify, bootstrap HTTP/credential tests and DB check passed before implementation |
| Application checks | Ordered actual builds, strict type checks, lint, schema/service/renderer checks, negative ownership checks and compiled-process lifecycle checks; clean snapshot passed the complete suite (19 bootstrap/package/process tests plus four Linux browser tests); detailed final runs in BOOT-01 evidence |
| Image changes | Updated Dockerfile actually built successfully as a disposable local proof image; existing services were not recreated |
| Running test environment | Same committed Chromium-library/ripgrep additions applied to existing workspace; pinned Playwright Chromium downloaded as node. New image build independently verifies persisted installation instructions |
| Browser automation | Linux Chromium with SwiftShader; live web/services and lifecycle controls. NullEngine unit tests are separately simulated |
| Actual Windows client | Director observation requested for the real foundation; pending response. Connected browser reports Linux and refused forwarded localhost; Windows computer-use initialization fails on the tool's Linux workspace URI |

Bare `pnpm doctor` is the package manager's built-in command; its zero exit does not establish the project's checks. Fresh project evidence uses `pnpm run doctor`; post-create invokes the doctor file directly.

## Remaining qualification

BOOT-02 remains incomplete: restricted roles, migrations, isolated test database, persistence through recreation and backup/restore proof. BOOT-03 CI/artifact/security/license scans and BOOT-05 protocol/release versioning remain pending. No gameplay, upstream engine/current-rules, hidden-state engine projection, auth, migration, real touch device, sustained GPU/load/accessibility or production tests were performed. The foundation's local import boundary and semantic keyboard proofs do not complete those product requirements.

The OS apt layer remains repository-resolved, not an immutable qualified production image. New forwarding entries 3001/3002 are configuration evidence until the editor applies them; the web proxies require only the existing 5173 forward.
