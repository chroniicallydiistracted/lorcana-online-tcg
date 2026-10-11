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

Open forwarded **5173** from VS Code's Ports panel. Expect **Application foundation**, **API ready**, **Match service ready**, **Protocol compatible**, and a **Start rendering check** control displaying three synthetic card shapes. The local web server proxies `/api` and `/match` to ports **3001** and **3002**. The worker has no HTTP listener. Stop the stack with Ctrl+C. A failed service stops the supervised stack; server source changes restart the three server processes. Vite handles browser changes.

`pnpm dev:smoke` remains the original connectivity diagnostic. Run it separately, after stopping the app on 5173; its plain response is not the game UI.

## Checks

| Command | Evidence |
|---|---|
| `pnpm run doctor` | Toolchain, Linux, local environment and owner-only credential checks |
| `pnpm verify` / `pnpm test:bootstrap` | Configuration/syntax plus documentation consistency; live connectivity and credential tests |
| `pnpm docs:check` / `pnpm test:documentation` | Documentation/history/source/log consistency and negative proof regressions |
| `pnpm verify:clean` | Source-only fresh frozen install and complete foundation validation without credentials or built artifacts |
| `pnpm typecheck` | Shared declaration builds followed by strict checks across all apps/packages |
| `pnpm lint` | ESLint and browser/public ownership checks |
| `pnpm build` | Ordered shared-package declarations/ESM, web bundle and three executable server apps |
| `pnpm test` | Builds, bootstrap, schema/service/scene tests, negative boundaries, bundle, real-process lifecycle and documentation/evidence regression checks |
| `pnpm test:e2e:smoke` | Linux Chromium, live services, software WebGL, resize/remount, keyboard controls, unavailable services and version/correlation rejection |
| `pnpm ci:config` / `pnpm test:ci` | Static workflow/Compose policy and negative scanner/artifact/launcher safety checks |
| `pnpm ci:artifacts -- PATH` | Verify artifact v2 scope, bytes, secrets and release manifest binding to app builds and SQL migrations |
| `pnpm db:check` | Existing bootstrap administrator connection only |
| `pnpm db:provision` | Explicit managed app local/test databases and eight restricted logins |
| `pnpm db:migrate -- --target local` | Reviewed transactional migration; use test for the isolated test DB |
| `pnpm db:health -- --target test` | Authenticate all four identities; local target also supported |
| `pnpm db:test` | Actual isolated DB authorization/transaction checks |
| `pnpm rules:check` / `pnpm test:rules-inventory` | Offline source/catalog/test denominator and date checks; synthetic corruption/regression proofs |
| `pnpm rules:verify-bytes` / `pnpm rules:reproduce` | Explicit ignored-cache byte proof and exact regeneration against the pinned inert upstream checkout |

For browser automation, install its pinned browser inside the container once with `pnpm --filter @lorcana/web exec playwright install chromium`. Shared Linux libraries are persisted in the Dockerfile. Browser caches are per container user. Tests own fixed ports 5173/3001/3002; stop `pnpm dev` first.

## Ownership

| Workspace | Implemented responsibility |
|---|---|
| `apps/web` | Semantic React controls, CSS Modules, service/readiness and compatibility status, lazy renderer |
| `apps/api` / `apps/match-service` | Separate Fastify health/readiness and bounded `POST /protocol/negotiate` diagnostic executables |
| `apps/worker` | Local idle process with bounded signal shutdown; no job implementation |
| `packages/contracts` | Public TypeBox health/readiness, closed protocol frames and release manifest schemas/parsers |
| `packages/design-system` | React Aria action control; full design system deferred |
| `packages/presentation` | Synthetic Babylon scene and mount/resize/dispose ownership |
| `packages/service-runtime` | Server-only negotiation, cancellable lifecycle and immutable retained-release registry |

`db` now owns BOOT-02 restricted local/test connections, reviewed SQL and typed synthetic Drizzle probes. `domain`, `engine-adapter`, `rules-data`, `testkit` and `vendor/tcg-engines` remain explicitly reserved. Private state and credentials have no browser exports. The browser guard checks declarations, imports/aliases/reexports, HTML/CSS and asset URLs; Vite enforces it again and restricts served filesystem roots. Development children receive a small environment without the bootstrap database administrator credentials.

Dependencies are exact pins in owning workspaces. The lockfile covers the root plus nine app/shared workspaces, not every library in the anticipated [dependency register](docs/vision/dependencies.json). Strict peers and an empty build-script allowance remain enabled; see [ADR 0002](docs/adr/0002-application-foundation.md). PDF.js6.4.299 is root development tooling for RULE-01 document extraction, with no application imports.

## Evidence and next foundations

See [workspace qualification](docs/WORKSPACE_QUALIFICATION.md) and [BOOT-01 validation](docs/validation/boot-01.md) for executed checks and their limits. The lazy synthetic renderer still triggers Vite's large-chunk warning; this is not performance qualification.

BOOT-02 local acceptance is verified; see [database operation](docs/runbooks/database.md) and [evidence](docs/validation/boot-02.md) for scoped roles, migrations, isolated test DB and disposable recreation proof. BOOT-03 local and first hosted CI/artifact qualification are verified at commit612a8c9 (RUN061); required-check/settings qualification remains separate; see [CI operation](docs/runbooks/ci.md) and [evidence](docs/validation/boot-03.md). BOOT-05 protocol/release implementation is verified locally; see [protocol](docs/contracts/protocol.md), [release policy](docs/contracts/release.md) and [acceptance evidence](docs/validation/boot-05.md). RULE-01/02 and UX-01/02 retain their rules, engine and art-direction gates. No upstream code, official cards or art were activated. The original 548 requirements remain tracked individually; foundation proofs do not complete gameplay, accessibility or device requirements. Archive preparation files retain their original [provenance scope](docs/ARCHIVE_PROVENANCE.md).

## Development continuity

RULE-01 adds [dated source, catalog and static upstream test inventories](docs/rules/README.md), with [acceptance evidence and missing-document limits](docs/validation/rule-01.md). CR2.2 is effective at the October10 inventory; CR2.3 is published but takes effect October16. Every identity remains uncertified and the product engine/rules packages remain reserved. Ordinary verification includes offline inventory checks; full raw source bytes live in an ignored research cache. RULE-02 owns vendoring/license/patch review, reproduced upstream suites and precompiled Node24 qualification.

Every developer/agent follows [the universal workflow](docs/DEVELOPMENT_WORKFLOW.md) and [versioned changelog format](docs/CHANGELOG_FORMAT.md). Start at [the documentation index](docs/README.md) and [current handoff](docs/HANDOFF.md). Keep relevant docs and action status current at implementation/test checkpoints; record UTC timestamps, changed files/functions/features, review dispositions, results and limitations.

Use `pnpm evidence:run --id RUN-YYYYMMDD-NNN --category container -- pnpm verify:foundation` to preserve actual output/source identity. Update the draft change record, then run `pnpm docs:sync --change CHG-YYYYMMDD-NNN` and `pnpm docs:check`. The consistency gate is part of `pnpm verify`; `pnpm test:documentation` exercises negative drift/proof cases. [CHANGELOG.md](CHANGELOG.md) and the file/callable snapshot are generated; committed final history is corrected by appending a new record.

The [2026-10-06 audit](docs/audits/2026-10-06-project-audit.md) addresses the original assignment and repository-owned directory contents. Actual Windows foundation observation is still pending; the earlier plain connectivity page and Linux headless rendering do not satisfy that check.

For the same pipeline used by Actions, run `python3 scripts/ci-local.py --evidence-id RUN-YYYYMMDD-NNN` on the WSL/Linux Docker host. It builds/runs a fresh non-root development image and private PostgreSQL project, preserves existing data and records sanitized identified artifacts after cleanup. See the CI runbook for flags, scan limitations and hosted acceptance.

BOOT-04 hosting, stack and spend decisions are final in the [decision worksheet](docs/plans/2026-10-10-boot-04-decision-worksheet.md), with [ADR0007](docs/adr/0007-hosting-provider-baseline.md) and [ADR0008](docs/adr/0008-engine-placement-dependency-baseline.md): one OVHcloud US VPS behind Cloudflare under the Director's $25/month cap. Nothing is purchased or deployed. Earlier Codex single-host research (2026-10-07/08) is preserved as evidence in [BOOT-04 validation](docs/validation/boot-04.md). Current runtimes accept only `APP_ENV=local`; remote runtime support is part of the remaining BOOT-04 configuration work.

## Fan content notice

This project uses trademarks and/or copyrights associated with Disney Lorcana TCG, used under Ravensburger’s Community Code Policy (https://cdn.ravensburger.com/lorcana/community-code-en). We are expressly prohibited from charging you to use or access this content. This project is not published, endorsed, or specifically approved by Disney or Ravensburger. For more information about Disney Lorcana TCG, visit https://www.disneylorcana.com/en-US/.

See the [fan content policy](docs/policies/fan-content.md) for the rules this notice carries.
