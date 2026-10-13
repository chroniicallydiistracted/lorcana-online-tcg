# PLAY-01 durable commands implementation plan

> For agentic workers: implement natively task by task with the executing-plans and test-driven-development skills; request one fresh whole-branch source review before closure. Repository-owned paths and CHG/run ledger supersede personal skill workspace conventions.

Goal: committed synthetic match transitions, journal/outbox and idempotent receipts survive races and process death while rejecting debug authority.

Architecture: follow blueprint §7.1 and ADR0013. The match application orchestrates a server-only engine executor and restricted PostgreSQL repository. A candidate has no external side effects; database CAS plus unique actor/match/command keys commits all durable records together.

Tech stack: existing Node24.21.0, pnpm10.33.0, TypeScript6.0.3, PostgreSQL18/pg8.23.1, current6de59de1 kernel; only required workspace dependency links are added.

Spec: docs/adr/0013-durable-synthetic-match-commands.md and blueprint §7.1. Authority: Director assigns full PLAY-01 including server/Lab debug filtering; no new approval is required for reversible implementation within that established scope. Ask for an actual unresolved Director decision before dependent work if one surfaces.

## Constraints and review focus

- Keep original database/private files/toolchain/lock pins and historical evidence intact. Append migrations0002/0003 only; additive local/test execution after live test evidence.
- Trusted actor is separate from command input; forged actor/state/seed/accessor fields fail. No authenticated network/game admission until its owning tasks.
- Receipts bind match, actor, command ID and canonical semantic request hash. Same binding replays the outcome; altered input/version cannot reuse it. Different actors do not retrieve each other's receipts.
- No state/journal/outbox/accepted receipt can escape a failed CAS/transaction; no acceptance precedes COMMIT. A lost connection/acknowledgement must be resolved by retrying the same identity.
- Corrupt/checkpoint/version/pin/deadline/worker failure never commits a candidate. Every worker is bounded, stopped and owned; no private output is forwarded.
- Terminal races create one accepted ending; stale and invalid intentions have durable stable receipts but no authoritative state mutation.
- X01 revisits two-player guards. PLAY-02 owns structured log/viewer privacy. D10, ordinary Lab/Collection/Sandbox policies and all full-catalog/reward gates remain.

## Task 1 — Player authority policy

Files: packages/contracts/src/player-moves.ts and exports; engine-adapter replay submit; engine-lab submit; owning manifests; tests/play/move-policy.test.mjs.

Interfaces: isPlayerMove(unknown): boolean is browser-safe metadata. Existing qualification/Lab submit signatures stay intact; forbidden names return MOVE_FORBIDDEN without advancing revision, private journal or random stream.

- [x] Write/run red tests submitting all nine manual moves, forfeitGame, sing/singTogether and unknown/prototype names to both actual facades; assert no state/winner change and normal concession works.
- [x] Implement the exact13-name allowlist and both facade guards; add workspace dependencies and frozen graph deliberately.
- [x] Run green guards plus existing adapter/Lab/replay/worker tests; retain actual red/green run IDs.

## Task 2 — Private durable engine transcript

Files: engine-adapter/src/replay.ts, persistence.ts, index.ts; tests/persistence.test.mjs.

Interfaces: createPrivateMatch(setup) and restorePrivateMatch({archive,digest}) return a server-only handle with status/submit/checkpoint/dispose. Public qualification handles still expose no live checkpoint; exportReplay remains completion-only. PERSISTENT_ENGINE_IDENTITY binds compiled current code.

- [x] Red: capture/restore live matches, continue identical commands, detect seed/result/outcome/pin/hash tampering even with a recomputed outer digest, reject malformed/big inputs, dispose safely and keep ordinary live seed/replay private.
- [x] Implement internal capture and bounded replay restoration with seed buffers disposed on every failure; checkpoint is immutable copied canonical bytes under a distinct private digest domain.
- [x] Green: complete persistence and retained RNG/replay/move-policy checks.

## Task 3 — Atomic storage and application command executor

Files: db/migrations/0002-match-commands.sql, db/src/match-store.ts/index.ts, match-service/src/service.ts, engine-executor.ts, transition-worker.ts, validation.ts; manifests; test unit fixtures.

Interfaces: repository create/load/findReceipt/commit/close; service create/submit/close accepts trusted actor separately; execute candidate returns private checkpoint and bounded status/result. Receipt includes command/match/actor binding, outcome/reason/version; public transport mapping remains separate.

- [x] Red: input/pin/authority/duplicate/worker bounds and missing store schema. Add pure validation/executor tests without production fixtures as exports.
- [x] Implement private match/receipt/journal/outbox constraints, CAS+unique receipt transaction and stable sanitized errors. Compute outside the transaction, never reuse the losing candidate.
- [x] Implement2 active workers,32 queued jobs,5s execution/queue ceilings, explicit resource/environment/output cleanup and idempotent close. Keep diagnostics and ordinary admission unchanged.
- [x] Apply0002/0003 to the test database using its migration login; inspect additive grants and existing role health.

## Task 4 — Real transactional/process evidence

Files: match-service/tests/integration.test.mjs and fault-child.mjs, db/tests as required, root command/CI integration ordering, owning runbook/validation.

- [x] Red then green against real PostgreSQL: independently competing same-version candidates, identical retries, actor-scoped IDs, changed-content collision, terminal race and immutable original receipt.
- [x] Inject real SQL failure after state update for journal/outbox: every record rolls back and the original source checkpoint stays equal.
- [x] Kill an owned child before COMMIT: no receipt/state survives; retry succeeds. Kill after COMMIT before response: all records survive; a fresh child returns the same accepted receipt without a second transition.
- [x] Confirm API/worker/cross-environment roles cannot read private match tables; pending outbox contains no raw engine/seed/card/log data.
- [x] Clean fixture UUID rows only, stop every child/worker/pool/listener, then apply reviewed0002/0003 locally preserving other data. Add actual integration to isolated CI with migrations first; run no browser download workaround or environment maintenance.

## Task 5 — Closure and native documentation

- [x] Record prior hosted38424938398/38426447875 results through fresh public metadata; label them prior source evidence.
- [x] Review fresh full foundation, frozen/live/canonical clean bytes, upstream/replay/source/privacy boundaries, Linux browser/worker and original database results; retain every failure/timing/network limit.
- [x] Fresh whole-branch source review, fix substantive findings with discriminating tests; update owning docs, current map/features/callables/task/requirement evidence and HANDOFF, seal CHG only for completed acceptance.
- [x] Native docs:sync/check and staged/full-history/log/secret/source preservation checks; prepare coherent reviewable local commit without main merge/deploy/publication.

## Execution ledger

Intake: clean main9b9c8ac, existing container/roles discovered. RUN060 passes own unchanged doctor/static/bootstrap/PG baseline. No unresolved Director decision identified: internal synthetic service, exact two-player scope and privacy/network follow-up ownership already follow approved contracts. Record subsequent decisions and red/green evidence here and in the native CHG.

Checkpoint: RUN063/065 establish debug red/green;067 persistence;071 constraints/owned finishing;078 real3+10 CAS/kill checks;079/080 checkpoint bound red/green;081 queue/full matches. Additive0003 preserves executed0002 history. Creation accessors now descriptor-copied. Broad closure checks remain explicit pending.

Closure:102 full286/406/2;103 actual3+10 match cases;104 existing5/eight roles;106 six web/two workers;107 disposable3-migration recreation;112 live-source clean and114 canonical staged clean;115 scope/private/history/log/listener preservation. Supplemental source-only review findings receive098/099 and100/101 red/green; no findings remain.113 completes all14 child stages/artifact validation but receipt failsclock_changed by1,256ms; qualified CI/artifact publication remains pending under the unchanged clock decision.108/110 resource cancellations and prior interrupted attempts are preserved; tests/scope retained. Native documentation/local commit closure follows.

Final116 setup passes. All implementation/review/local acceptance work is complete; final native sealing117 and local commit are the closure operation. CI timing remains an explicit unqualified gate after113 rather than an omitted check.

Independent audit (2026-10-13 UTC): Director-requested audit CHG-20261013-006 confirmed all five tasks against the source at 34b609b with RUN-20261013-118..127 at fingerprint 2c343976. It did not rerun the local isolated pipeline, because of the recorded host memory incident and the clock guard. Instead, hosted Foundation qualification runs on the published audit branch before main is fast-forwarded. Follow-ups are listed in [validation](../validation/play-01.md).
