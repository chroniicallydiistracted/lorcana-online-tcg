# ADR 0002: Executable workspace foundation with enforced browser ownership

Date: 2026-10-05 (Director assignment, America/Phoenix). Status: implemented for BOOT-01.

## Context and affected requirements

BOOT-01 requires a clean frozen install, minimal web/API/worker builds, strict type checking and rejected forbidden imports. The Director also requires a separate match-service boundary and synthetic Babylon lifecycle proof. This establishes prerequisites for R25.001/.002/.005/.006/.008 (scalable layouts, accessibility, keyboard and motion), R29.005 (hidden-information security), and R30.009/.017 (servers/status). Their complete product/device acceptance remains pending.

## Decision

Use the selected exact TypeScript 6.0.3, React 19.3.0, Vite 8.3.2/plugin 6.1.2, Babylon core 9.29.0, Fastify 5.12.5 and typebox 1.3.35/provider 6.1.0 pins. Only currently needed dependencies are installed in owning workspaces. Babylon loaders, auth, jobs, state frameworks and engine integration remain deferred until used. ADR0004 subsequently activates the server-only db package. Tooling uses exact ESLint/TypeScript-ESLint, parse5, postcss-value-parser and Playwright pins. Node's built-in test runner covers foundation schemas, real ephemeral HTTP listeners and fetch, Babylon NullEngine and real-process checks; Playwright covers the live UI. Vitest, Testing Library, fast-check and axe remain available targets when their product verification needs appear. No dependency build scripts are authorized; installed manifest inspection found none requiring execution and `allowBuilds` remains empty with strict peer checks.

Keep the planned contracts, presentation and design-system ownership. Add a small **server-only service-runtime** package so API and match-service share diagnostics and lifecycle behavior without depending on each other. The worker uses only its lifecycle export. Domain, engine-adapter, rules-data and testkit remain reserved rather than empty dependency packages; BOOT-02 activates db independently under ADR0004.

Shared packages emit declarations and Node ESM through TypeScript. Ordered root builds follow pnpm's workspace graph. Production/default exports point to built files; the unique `lorcana-source` condition selects local source for Vite/development/tests. A generic `source` condition selected third-party raw TypeScript and caused Node strip-only incompatibility during verification; the unique condition removed that failure while preserving compiled runtime tests. Relative `.ts` imports are rewritten to `.js` in emitted server code.

Declare package scopes (`public`, `browser`, `server`; missing manifests are reserved). Enforce browser/public dependencies and resolved source ownership, including aliases, reexports, dynamic imports, builtins, cross-package relative paths, HTML/CSS and `new URL` asset references. Parse HTML using parse5 and inspect image-set CSS values with postcss-value-parser, disable uncatalogued public-directory copying and restrict Vite filesystem serving. TypeScript's AST supplies module inspection; Vite repeats the guard at build/load/HTML transformation. Negative fixtures and actual rejected Vite builds supply comparative evidence. This is a dependency boundary, not a complete adversarial JavaScript/data-flow proof or engine hidden-state certification.

Web 5173 uses same-origin local diagnostic proxies to API 3001 and match 3002. Worker has no ingress. No permissive CORS or database integration is added. Local-only services require `APP_ENV=local`; the supervisor strips inherited bootstrap database credentials before starting children. Services register signals before startup, pass cancellation to initialization, drain before close and bound shutdown to ten seconds. The supervisor uses direct source processes so a failed listener stops the stack; it owns source reload and process-group cleanup.

React owns explicit renderer activation, async-import cancellation and disposal. Babylon owns its scene, render loop and ResizeObserver, including idempotent cleanup and failed initialization cleanup. Synthetic neutral geometry is the only asset. Rendering is opt-in; accessible semantic controls remain independent of WebGL.

## Alternatives and evidence

- Installing all 61 anticipated libraries at the root would blur ownership and introduce unused runtime/build dependencies. The original BOOT-01 nine workspace projects installed with frozen lockfile and strict peers instead.
- Duplicating Fastify diagnostics and shutdown in each app risks divergent readiness/drain behavior. Shared service-runtime tests exercise one typed implementation; independent built-process tests verify deployment boundaries.
- A static import-name denylist alone missed path aliases and emitted asset bytes. Resolver/ownership checks and negative Vite probes reject module, JS asset, CSS asset and HTML leakage before bundling.
- Node watch wrappers can remain alive after listener failure. The direct-process supervisor's occupied-port regression exits the stack with failure while preserving the pre-existing listener.
- Awaiting initialization before handling shutdown left a pending-startup reproduction alive after SIGTERM. The cancellation regression now calls cleanup and exits successfully without waiting for startup completion.

## Consequences and limits

This adds no match commands, game rules, jobs, auth, migrations, rewards or economic operations. Default local health/readiness describes foundation process lifecycle only. The lazy renderer chunk remains about 1.08 MB minified / 262 KB gzip and produces a Vite warning; device floors and performance budgets require later qualification. NullEngine, Linux software WebGL, Windows desktop checks and real touch devices must be reported separately. The Dockerfile persists browser test libraries; apt packages remain repository-resolved as stated in ADR 0001, not immutable production images.

See [validation evidence](../validation/boot-01.md) for exact runs, review corrections and limitations. BOOT-02/03/05 retain their independent acceptance gates.

## Audited development-process cleanup correction

The documentation audit exposed Vite surviving its pnpm leader after a clean-checkout busy-port test. Waiting only for the leader and canceling escalation did not prove group cleanup. Keep group ownership until Linux /proc confirms no executable descendants, share overlapping cleanup promises, and use bounded monotonic grace/SIGKILL checks. Real descendant regressions cover both exiting and already-exited leaders. Actual RUN-033 failure and CHG-20261006-005 retain the finding and source-matched correction evidence; this does not change game authority or device acceptance.

## BOOT-05 continuation

The preceding results/decisions are retained as dated task checkpoints. BOOT-05 now implements public protocol/negotiation and release artifact v2 binding/retained pins with final-source local evidence; [ADR0006](../adr/0006-protocol-release-contracts.md) and [BOOT-05 validation](../validation/boot-05.md) describe the current scope. This extension does not implement authenticated gameplay or production activation.

## Current RULE-02 continuation — 2026-10-11 UTC

Earlier reserved-engine/no-upstream-execution and artifact-v2 statements above describe their dated checkpoints. [Engine qualification](../validation/rule-02.md) and [ADR0009](../adr/0009-pinned-engine-qualification.md) now define the minimal pinned synthetic Node/Lab-worker implementation, development-only Bun, current artifact v3 and source-matched results. Rules-data/domain/testkit remain reserved. Secure randomness/replay, official rules/cards and wire privacy remain RULE-03/RULE-04/PLAY-02 gates; rewarded/private/ordinary Lab/Collection play stays blocked. Hosted RULE-01 main1925127 passed run38098551762 (downloaded artifact RUN-20261011-019); current RULE-02 hosted/device/production evidence is not inferred. Full548 scope/20 optional flags and provider/D07 decisions remain unchanged.

## Current RULE-03 continuation — 2026-10-12 UTC

RULE-03 supersedes the linked RULE-02 engine/RNG baseline; prior executed tables and decisions remain dated source checkpoints. [ADR0010](../adr/0010-secure-randomness-replay.md) now governs server crypto randomness/captured clocks and completed private reconstruction:347 selected files,28 reproduced patches, unchanged27 test files; the compiled kernel accepts explicit providers, the server owns Node crypto and browser Lab owns seedrandom. Actual compiled kernel/adapter bytes bind replay identity; release identity binds separate server/Lab roots. [RULE-03 validation](../validation/rule-03.md) records current checks and limits. Director D10 permits completed seeds/full private replay only for participants/authorized auditors; no delivery endpoint is supplied. RULE-04 official behavior, PLAY-01 durability, PLAY-02 privacy and AUTH/REPLAY recipient enforcement remain pending. All ordinary Lab/Collection/reward/private/official play stays blocked. CR2.3 October16/set14 October16/23 never auto-admit. The Director reports RULE-02 audited/merged/passing on GitHub; no fresh RULE-03 hosted, Windows/device, capacity/restore or production result is inferred. Prior executed evidence,548 requirements/20 optional flags, BOOT-04 providers/$25 and D07 remain unchanged.

## Historical RULE-04 checkpoint — 2026-10-12 UTC

[RULE-04](../validation/rule-04.md) now implements the representative sourced scenario/template foundation, including Director-approved Adventurous and ink-drop counters. Current pin53a79413 is unchanged;346 selected files/303 runtime source-type-data files/53 reproduced patches/27 unchanged upstream tests. The new Node fixture bridge is test-only and cannot enter production apps or release exports. The per-card template cannot promote generic fixtures to tested cards. RULE-04 representative acceptance is locally verified:91 sourced scenarios,241 project checks,338 unchanged upstream passes/one inherited skip,2 injection checks, exact reproduction, Chromium and clean/canonical proofs at fingerprint5f405778. Isolated CI089/091 completed all child checks but both receipts failed clock_changed; no new passing CI artifact/timing qualification is claimed. The Director's leave-environment instruction remains; no maintenance or threshold change. Final preservation proof RUN092 passes; native documentation closure is recorded in CHG003. See [operation](../runbooks/rules-certification.md) for commands, chooser/slot/counter contracts and exact limits. All ordinary Lab/Collection/reward/private/official admission stays closed; PLAY-01 durability, PLAY-02 privacy, AUTH/REPLAY delivery and full card/rules certification remain. CR2.3 October16/set14 October16/23 never auto-admit. Earlier source-specific result tables above are preserved. Hosted RULE-03 main82849f4 succeeded in run38276253829 (16:16:36–16:22:18 UTC), with public metadata freshly acquired in RUN-20261012-047; no hosted RULE-04, Windows/device, load/restore or production acceptance is inferred. BOOT-04 providers/$25/D07, D10 recipients and548 requirements/20 optional flags remain.

## Current upstream refresh — 2026-10-13 UTC

Foundation diagnostics and ports remain unchanged. The sole engine owners remain server engine-adapter and browser engine-lab; the new pin changes compiled identity, not app admission or UI scope. See [refresh qualification](../validation/upstream-engine-review.md) for current evidence and limits.

## Occupied-port regression note — 2026-10-16 UTC

The occupied-port regression now also proves which failure it observed. It requires the API's own `api foundation startup failed` message, because a failed build also exits with code 1. It bounds supervisor cleanup to 15 s after that message, and its 120 s budget includes the supervisor's full workspace build (CHG-20261016-005). The decision is unchanged.
