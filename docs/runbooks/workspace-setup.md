# Workspace setup on Andre's PC

After a host crash, rediscover containers/project and preserve existing credentials and the PostgreSQL volume before recovery. Run one heavyweight verification at a time; see the [workflow](../DEVELOPMENT_WORKFLOW.md). The Dev Container's Bun1.4.2 build uses a persistent BuildKit cache, checks the exact architecture-specific archive hash before extraction, and permits a bounded30-minute resumable network attempt instead of the former two-minute timeout. A verified retained archive can seed that cache without changing the pin; the cache itself is ignored machine state. A corrupted completed archive is never executed. A partial archive must pass the same checksum before it becomes usable. The build always checks Bun's version. See the [incident record](../validation/play-01-interruption.json) for the observed Windows low-memory event and distinct network failure. Restored application/data health needs fresh actual evidence; surviving files alone do not prove it.

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

In Windows VS Code use **Dev Containers: Reopen in Container**. After Dockerfile changes use **Rebuild Container**, preserving the named database volume. The workspace runs as `node`, with source at `/workspaces/lorcana-online-tcg`. It installs Node 24.21.0, pnpm 10.33.0, Git, Python/PyYAML, psql, ripgrep, hash-pinned development-only Bun1.4.2 and Chromium test libraries. No extra host Node or undocumented manual tooling install is needed.

The original post-create pipeline remains doctor → frozen install → configuration/syntax/documentation checks → bootstrap tests → authenticated database check. Its success proves workspace bootstrap, not full application or game acceptance. Run application checks separately:

```bash
pnpm run doctor
pnpm install --frozen-lockfile
pnpm engine:setup
pnpm verify:foundation
pnpm db:check
pnpm --filter @lorcana/web exec playwright install chromium
pnpm test:e2e:smoke
pnpm dev
```

Bare `pnpm doctor` invokes pnpm's built-in doctor; use `pnpm run doctor` to run this repository's checks. The post-create script invokes the repository doctor directly and is unaffected. Playwright's pinned browser download uses the container user's cache; its Linux shared libraries are committed in the image.

## Browser and services

VS Code forwards web **5173**, API **3001** and match **3002**. Open web from the Ports panel; normally the Windows URL is `http://localhost:5173`. Expect Application foundation, both services ready and Protocol compatible. Start rendering to display three neutral card shapes; stop/start and resize the window to check lifecycle. This is a foundation preview, not final game design or certified GPU performance.

The web server uses same-origin `/api` and `/match` proxies; no cross-origin permission is needed. API/match `/healthz` report process liveness; `/readyz` reports foundation readiness. They do not check a database or engine. Worker has no public ingress or job execution. Root development strips bootstrap database credentials from child environments, reloads server source and stops the stack on service failure. Ctrl+C stops owned processes. A busy port fails startup; do not kill unrelated listeners. Stop the specific old connectivity process if it still uses 5173.

`pnpm dev:smoke` remains the original independent connectivity server. Run it only with 5173 free. Its plain diagnostic does not verify React, Babylon, rules or auth. Browser automation also needs 5173/3001/3002 free; stop interactive development before running it. Linux software WebGL and actual Windows browser evidence are recorded separately.

## Container and database management

The workspace has no Docker CLI/socket. Discover the active Compose project through Docker Desktop, the Dev Containers log or selective host Docker labels. At BOOT-01 inspection it was `lorcana-online-tcg_devcontainer`; do not hardcode its container IDs for future sessions. Manage services from Ubuntu/Windows against that actual project, not an inferred alternate Compose project.

PostgreSQL is reached at `postgres:5432` only on the private Compose network, with its volume at `/var/lib/postgresql` and no published host port. The current VS Code volume remains preserved. BOOT-02 adds managed application local/test databases, per-service credentials and reviewed migrations; [database operation](database.md) describes the separate disposable recreation proof and its exact scope. `pnpm db:check` uses the existing bootstrap administrator only.

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

Keep all validation categories distinct. Hosted CI, deployment, production security/image qualification and game/device acceptance are not implied by these local setup steps. The separate [CI runbook](ci.md) describes the disposable BOOT-03 pipeline.

## Documentation and evidence operation

RULE-01 source tooling is in [rules operation](../rules/README.md). Ordinary `pnpm verify` checks committed inventory metadata offline and `pnpm test` runs the focused regressions. Explicit raw-byte/reproduction checks need the ignored source cache/pinned inert checkout and cannot be inferred from clean installation. No PDF/engine research parser runs in application services or the browser.

Read [the universal workflow](../DEVELOPMENT_WORKFLOW.md) and [record format](../CHANGELOG_FORMAT.md) before editing. Capture checks inside the container with `pnpm evidence:run --id RUN-YYYYMMDD-NNN --category container -- pnpm verify:foundation`. Use `headless_browser` for browser automation; report actual Windows observation separately with device details. These write sanitized durable logs and exact source/timing/outcome records; inspect logs for unknown secret forms before committing.

Update the active draft's files, documentation dispositions, feature/task IDs and evidence references; run `pnpm docs:sync --change CHG-YYYYMMDD-NNN` followed by `pnpm docs:check`. A drift failure requires a documented change and semantic review, not deletion of the snapshot or evidence. Finalized records are sealed; append corrections. BOOT-03 adds the same gates to its isolated local/Actions pipeline; hosted observation remains a separate acceptance item.

The live preview described during the prior session is no longer running at the 2026-10-06 audit intake. Start `pnpm dev` before the Director's still-pending Windows foundation smoke. Discover actual forwarded URLs and current listeners each session.

`pnpm verify:clean` copies the audited project-owned source to a temporary directory, excluding credentials/Git/dependencies/build output, then performs a frozen install and complete foundation validation. It removes the temporary copy on exit and never connects to or recreates the existing database. Stop fixed-port development first. Capture it as container evidence; this is a source-only clean-checkout proof, not device or image qualification.

BOOT-05 adds `POST /protocol/negotiate` on both diagnostic HTTP services. The web match proxy checks revision/correlation and displays update-required or unavailable responses. Read [protocol](../contracts/protocol.md) and [release policy](../contracts/release.md) before extending transport or runtime identity. CI-generated identities are separate from the local development label; no game/admission/database route is active.

## Engine tooling continuation

RULE-02 runs unchanged selected upstream tests with pinned development-only Bun and builds pure Node/browser JavaScript. New images persist the runner; `pnpm engine:setup` verifies or installs the exact runner in the existing container without recreating its data. See [engine operation](engine.md) for closure/reproduction/worker checks and later play gates. The current web diagnostic has no engine worker control or game ingress.

## RULE-03 engine continuation

The server-only adapter now supplies private crypto randomness and completed synthetic reconstruction; browser Lab alone owns seedrandom. Use [engine operation](engine.md) and [RULE-03 validation](../validation/rule-03.md) for signatures, entropy/injection tests and disclosure policy. No HTTP/game ingress or extra listener is added; existing ports/toolchain/private database operation remain unchanged. Real Windows observation and later gameplay/privacy/certification gates are separate.

## Historical RULE-04 checkpoint — 2026-10-12 UTC

[RULE-04](../validation/rule-04.md) now implements the representative sourced scenario/template foundation, including Director-approved Adventurous and ink-drop counters. Current pin53a79413 is unchanged;346 selected files/303 runtime source-type-data files/53 reproduced patches/27 unchanged upstream tests. The new Node fixture bridge is test-only and cannot enter production apps or release exports. The per-card template cannot promote generic fixtures to tested cards. RULE-04 representative acceptance is locally verified:91 sourced scenarios,241 project checks,338 unchanged upstream passes/one inherited skip,2 injection checks, exact reproduction, Chromium and clean/canonical proofs at fingerprint5f405778. Isolated CI089/091 completed all child checks but both receipts failed clock_changed; no new passing CI artifact/timing qualification is claimed. The Director's leave-environment instruction remains; no maintenance or threshold change. Final preservation proof RUN092 passes; native documentation closure is recorded in CHG003. See [operation](rules-certification.md) for commands, chooser/slot/counter contracts and exact limits. All ordinary Lab/Collection/reward/private/official admission stays closed; PLAY-01 durability, PLAY-02 privacy, AUTH/REPLAY delivery and full card/rules certification remain. CR2.3 October16/set14 October16/23 never auto-admit. Earlier source-specific result tables above are preserved. Hosted RULE-03 main82849f4 succeeded in run38276253829 (16:16:36–16:22:18 UTC), with public metadata freshly acquired in RUN-20261012-047; no hosted RULE-04, Windows/device, load/restore or production acceptance is inferred. BOOT-04 providers/$25/D07, D10 recipients and548 requirements/20 optional flags remain.

## Current upstream refresh — 2026-10-13 UTC

Existing setup/ports/toolchain remain. Engine reproduction now uses the separately retained inert6de59de1 checkout; use the owning engine operation, not the original53a79413 cache, for current vendor verification. See [refresh qualification](../validation/upstream-engine-review.md) for current evidence and limits.

## PLAY-01 continuation — 2026-10-13 UTC

PLAY-01 implements the internal two-player synthetic durable command service with participant-scoped idempotent receipts, row-fenced CAS, private deterministic recovery, atomic accepted journal and metadata-only outbox. Both server and Lab refuse every manual/debug move. Fastify remains diagnostics-only; authenticated transport, viewer/structured-log privacy (PLAY-02), publication (PLAY-03), game clocks (PLAY-04), X01 multiplayer and ordinary/official/private/reward/card admission remain gated. See [PLAY-01 operation](match-commands.md) and [validation](../validation/play-01.md); prior source-specific evidence remains historical, and final broad verification is in progress.

The pinned Bun archive uses a locked persistent BuildKit cache. Every final archive is verified before extraction. Interrupted transfers keep resumable partial bytes; completed checksum or HTTP/range/resume failures discard invalid partials and allow at most two outer download attempts, each with curl’s bounded retry policy. A recovered container may start successfully while post-create refuses stale documentation: synchronize the authorized draft coverage first, inspect a successful sync, then rerun post-create. Preserve failed receipts; do not bypass the documentation guard.
