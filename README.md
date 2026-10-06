# Lorcana Online TCG

The desktop web game follows the [development blueprint](docs/vision/Development_Blueprint_2026-10-05.md), with touch/tablet development alongside it. BOOT-01 implements the application foundation: a React/Vite client, a synthetic Babylon rendering check, typed Fastify diagnostics, an independent match-service process and an idle worker. This diagnostic page is infrastructure evidence; authored game presentation, gameplay, authentication and economic features are subsequent work.

## Run locally

Keep source in `/home/andre/lorcana-online-tcg` on WSL's Linux filesystem. Open it with Windows VS Code and **Dev Containers: Reopen in Container**. Preserve the existing `.env.local` and PostgreSQL volume. On a new checkout only, run `python3 scripts/init-local-env.py` in Ubuntu before opening the container. See the [setup runbook](docs/runbooks/workspace-setup.md).

Inside the committed Dev Container:

```bash
pnpm run doctor
pnpm install --frozen-lockfile
pnpm verify:foundation
pnpm db:check
pnpm dev
```

Use `pnpm run doctor`: bare `pnpm doctor` selects pnpm's built-in command rather than this repository's doctor script. Keep Node 24.21.0 and pnpm 10.33.0; the pnpm update banner is informational.

Open forwarded **5173** from VS Code's Ports panel. Expect **Application foundation**, **API ready**, **Match service ready**, and a **Start rendering check** control displaying three synthetic card shapes. The local web server proxies `/api` and `/match` to ports **3001** and **3002**. The worker has no HTTP listener. Stop the stack with Ctrl+C. A failed service stops the supervised stack; server source changes restart the three server processes. Vite handles browser changes.

`pnpm dev:smoke` remains the original connectivity diagnostic. Run it separately, after stopping the app on 5173; its plain response is not the game UI.

## Checks

| Command | Evidence |
|---|---|
| `pnpm run doctor` | Toolchain, Linux, local environment and owner-only credential checks |
| `pnpm verify` / `pnpm test:bootstrap` | Preserved configuration/syntax checks, live connectivity and credential tests |
| `pnpm typecheck` | Shared declaration builds followed by strict checks across all apps/packages |
| `pnpm lint` | ESLint and browser/public ownership checks |
| `pnpm build` | Ordered shared-package declarations/ESM, web bundle and three executable server apps |
| `pnpm test` | Builds, bootstrap, schema/service/scene tests, negative boundaries, bundle and real-process lifecycle checks |
| `pnpm test:e2e:smoke` | Linux Chromium, live services, software WebGL, resize/remount, keyboard controls and unavailable-service behavior |
| `pnpm db:check` | Existing bootstrap administrator connection only |

For browser automation, install its pinned browser inside the container once with `pnpm --filter @lorcana/web exec playwright install chromium`. Shared Linux libraries are persisted in the Dockerfile. Browser caches are per container user. Tests own fixed ports 5173/3001/3002; stop `pnpm dev` first.

## Ownership

| Workspace | Implemented responsibility |
|---|---|
| `apps/web` | Semantic React controls, CSS Modules, service status, lazy renderer |
| `apps/api` / `apps/match-service` | Separate Fastify `/healthz` and `/readyz` diagnostic executables |
| `apps/worker` | Local idle process with bounded signal shutdown; no job implementation |
| `packages/contracts` | Public TypeBox health/readiness schema and validated response types |
| `packages/design-system` | React Aria action control; full design system deferred |
| `packages/presentation` | Synthetic Babylon scene and mount/resize/dispose ownership |
| `packages/service-runtime` | Server-only diagnostics and cancellable startup/shutdown |

`domain`, `db`, `engine-adapter`, `rules-data`, `testkit` and `vendor/tcg-engines` remain explicitly reserved. Private state and credentials have no browser exports. The browser guard checks declarations, imports/aliases/reexports, HTML/CSS and asset URLs; Vite enforces it again and restricts served filesystem roots. Development children receive a small environment without the bootstrap database administrator credentials.

Dependencies are exact pins in owning workspaces. The lockfile covers nine workspace projects, not every library in the anticipated [dependency register](docs/vision/dependencies.json). Strict peers and an empty build-script allowance remain enabled; see [ADR 0002](docs/adr/0002-application-foundation.md).

## Evidence and next foundations

See [workspace qualification](docs/WORKSPACE_QUALIFICATION.md) and [BOOT-01 validation](docs/validation/boot-01.md) for executed checks and their limits. The lazy synthetic renderer still triggers Vite's large-chunk warning; this is not performance qualification.

BOOT-02 remains restricted database roles, migrations, isolated test DB and persistence through recreation. BOOT-03 remains CI/artifact checks; BOOT-05 remains protocol/release compatibility. RULE-01/02 and UX-01/02 retain their rules, engine and art-direction gates. No upstream code, official cards or art were activated. The original 548 requirements remain tracked individually; foundation proofs do not complete gameplay, accessibility or device requirements. Archive preparation files retain their original [provenance scope](docs/ARCHIVE_PROVENANCE.md).
