# PLAY-03 live synthetic transport implementation plan

> For agentic workers: execute inline using superpowers:executing-plans and test-driven-development. Keep the native CHG006/run/handoff ledger. One independent whole-branch privacy/transaction review follows implementation, per blueprint16.3.

Goal: two authenticated qualification clients complete a synthetic game, reconnect to another gateway and resolve the same durable pending command.
Architecture: protocol2 closed live envelopes, reference-only worker transitions, bounded committed projection cache, PostgreSQL ticket/quota/hint/reconciliation and an optional Fastify gateway plus browser-safe client.
Tech stack: Node24.21.0/pnpm10.33.0/TypeScript6.0.3, existing TypeBox1.3.35/Fastify5.12.5/pg8.23.1, planned @fastify/websocket11.3.3; exact compatible ws/types pinned in owning workspaces.
Spec: ADR0015 and the Director decision in play-03-intake; blueprint §§5.3/7/8.3/13/15 and existing protocol/viewer/release contracts.

## Global constraints

- AUTH-01 remains separate. Test-only authenticated sessions never enter ordinary service startup, bundles or public fallback routes.
- All gameplay/card/reward/private/observer/device/production admission remains gated. No new provider, paid service or deployment.
- Retain existing private files/data/container, original361vendor files/59patches and all selected tests. No clock/environment maintenance or guard change.
- Append migrations and retain old protocol1 semantics/pins. All application commands inside the existing container; heavy checks sequential.
- Fresh native red/green/failure receipts, complete documentation/source map, feature/requirement/task/current callable inventory and changelog.

## Review focus

1. Lost acknowledgements: duplicate old references must return their committed receipt, never resolve against a new version or commit twice.
2. Cross-host ticket replay/session expiry: atomic consumption and revalidation before every private publication.
3. Cache poison and concurrency: same-version/different private bytes/recipient/release cannot reuse an authorized view; bursts coalesce and stay bounded.
4. Missed hints/slow consumers: eventual committed full resync, bounded buffers and owned shutdown without conceding.
5. Client reconnect/gaps/account change: validate correlation/pins/actor, retain identical pending semantics, discard stale refs and stop on auth/upgrade rather than infinite retry.

## Task1 — Reference transitions and committed cache

Files: match-service engine-executor/transition-worker/service/validation plus new projection-cache.ts and focused unit/live DB tests. Interfaces: service.submitRefs(actor,request), describe(actor,{matchId}), read(actor,{matchId}) -> projection+release+domainProtocol; existing submit/view retained. Worker resolves reference inputs before submit on the same checkpoint. Cache stores serialized authorized views with bounded coalescing.

- [x] Write and run red tests: references cannot act as raw IDs; duplicate receipt lookup precedes stale ref resolution; repeated views coalesce, mutate safely and reject changed/corrupt checkpoints.
- [x] Implement minimum worker/service/cache changes; keep ordinary trusted submit and current refs distinct.
- [x] Run focused unit/actual DB tests and retain all outcomes.

## Task2 — Closed live protocol and retained pins

Files: contracts live.ts/index/tests; release builder/tests; service pin checks; append-only migration0004. Interfaces: parse/decode live client/server frames, LIVE_PROTOCOL2 and implemented protocol range1..2; new releases/matches pin2, old1 stays explicit.

- [x] Red schema tests cover valid refs, unknown roles/fields/raw IDs/bag choices, UTF8 limits/getters and correlated full viewer snapshots.
- [x] Implement closed intents, ticket/auth, command/sync, snapshot/receipt/control envelopes and exact version policy.
- [x] Red migration/pin compatibility tests; implement additive schema and prove both old1/new2 without changing old SQL.

## Task3 — Shared ticket/quota and durable hints

Files: db transport-store.ts/index/migration0004 and tests; match-store metadata observe and NOTIFY; service describe/read. Interfaces: issue/consume bounded ticket grants, shared fixed-window quota, participant-scoped committed version/event observation, reconnectable metadata-only hint subscription.

- [x] Red live DB tests: cross-connection consume once, wrong origin/replay/expiry, no raw token storage, shared quotas, observer/outsider rejection, actual COMMIT-only hints and missed-notification reconciliation.
- [x] Implement restricted-role operations and owned cleanup; apply reviewed migration test first then local; keep existing data.
- [x] Verify live role/migration/history/rollback and prior match suites.

## Task4 — Optional bounded live gateway

Files: match-service gateway/session/socket modules and tests, scoped dependencies. Factory requires trusted verifier/origins/service/store; ordinary main remains diagnostics-only.

- [x] Red actual WS tests for first-frame ticket authentication, origin/deadline/replay/session expiry, invalid/binary/oversized frames and actor spoofing.
- [x] Implement serial per-socket command processing, durable receipt mapping, full committed publication/reconciliation, heartbeats/quotas/backpressure and graceful drain.
- [x] Prove two clients finish synthetic reference-only play; reconnect to another process, replay lost accepted acknowledgement exactly once, all output closed/viewer safe.

## Task5 — Browser-safe reconnect client

Files: new browser-owned packages/match-client manifests/config/source/tests, web browser qualification and release/boundary ownership. Client exposes connect/submit/suspend/resume/close, current projection/status and pending-intent export/restore hook; future WEB02 owns game UX.

- [x] Red tests for correlated hello/ticket, state/sequence gaps, host change, pending duplicate reconciliation, stale finality, jitter ceilings and auth/upgrade stop.
- [x] Implement using WebSocket/fetch/AbortController and portable timers; no server/DB/private import. Bound one pending command and outbound bytes.
- [x] Execute actual browser client instances against qualification gateways; confirm disposal and private-code bundle exclusions.

## Task6 — Review, evidence and closure

- [x] Record precise scoped/core failures/passes and measured synthetic restore/cache/event-bound behavior.
- [x] Obtain independent critical hidden-information/transaction review; reproduce important findings before correction.
- [x] Run frozen install/full foundation, original DB plus live transport DB integration, browser and source-only clean verification sequentially. No known-clock isolated retry solely for timing.
- [x] Update all mapped current docs/ADR/contracts/runbooks/feature/task/requirement/handoff and CHG006; preserve historical logs. Verify native closure/secret/provenance/listener preservation and coherent local commit.

## Execution ledger

- Intake: RUN071baseline, RUN072prior hosted metadata and RUN073native docs pass. Director selects separate AUTH-01/test sessions. No product code yet at plan creation.
- Ruling: use the existing scoped branch/container in place, as directed by the established workspace contract. Additional worktrees would require another bind-mount/container and memory workload; no concurrent implementation is running. Main/source/private data remain preserved.
- Ruling: use full snapshots and PostgreSQL durable reconciliation/hints; no Redis or delta protocol. Cost if wrong is limited measured transport throughput, not loss of authority.

- Task1 scoped red/green: RUN074..078;48actual concurrent reads coalesce, ref-only worker rejects raw IDs and durable retries survive backend recreation.
- Task2/3 scoped red/green: RUN079..084; protocol2, retained1, hashed ticket races/shared quotas and committed hints.0004 applied test then local; RUN087 validates frozen install/identities.
- Task4 initial actual gateway green RUN089; adversarial cap/deadline/binary/buffer cases are running in RUN090. Whole-source/independent/client/browser qualification remains pending.
- RUN086 install receipt failed source_changed after intended manifest/lock updates (child0). It is not a frozen-install or passing unchanged-source receipt; RUN087 separately passes frozen install.

- Current scoped proofs: RUN091gateway cap/bounds, RUN095client7, RUN097CI closure, RUN101private lifecycle, RUN102actual natural/lostACK games, RUN104parent-loss cleanup, RUN106types/lint, RUN107Chromium8, RUN108actualDB35 (5database+3storage+27match/transport/client). Review minor callback fixes RUN110/111/113/114 pass all9 simulations. RUN109/112 document strict documentation review/link rejections, corrected without changing schema/gates. Whole-source foundation/clean/final closure follows.

- Final acceptance: executable64bef2e3, RUN-20261015-002 full324/406/2,003actualDB35,004Chromium8+Lab2,005dependency policy,006native docs,007clean full install and008privacy/provenance/owned cleanup all pass. Static independent review has no important remaining findings; both minor callbacks fixed. No isolated CI retry, environment repair, public admission or production claim.
