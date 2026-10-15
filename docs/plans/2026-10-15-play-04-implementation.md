# PLAY-04 Engine Clock Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans for native implementation, or superpowers:subagent-driven-development if the Director selects delegation. Steps use checkbox syntax. Written design and implementation plan explicitly approved by the Director; native execution selected. No step below is executed by publishing this plan.

Recorded 2026-10-15T05:25:44.708Z; Director written-design approval event time unknown. Base775994a; approved-design commit2033396.

**Goal:** Connect the existing replenishing engine clock to durable, authoritative, recoverable synthetic matches without changing ink or core turn rules.

**Architecture:** Keep the pinned upstream runtime unchanged; expose its clock helpers through the project-owned pure bridge and server adapter. Extend the existing PostgreSQL commit boundary with short, fenced timed-transition reservations and a separate clock revision. Publish closed live3 clock projections while retaining diagnostic1/live2 behavior and making browser countdowns estimates only.

**Tech Stack:** Existing Node24.21.0, pnpm10.33.0, TypeScript6.0.3, Fastify5.12.5, typebox1.3.35, pg8.23.1, PostgreSQL18, pinned engine6de59de1, Node tests/Bun qualification and Playwright. No added service or dependency is needed.

**Spec:** [Director-approved written design](2026-10-15-play-04-design.md). Policy D12 and [intake](2026-10-15-play-04-intake.md) retain the exact choices and evidence limits.

## Global constraints

- Reuse the engine's existing dynamic replenishing countdown. Ink, ink drops, readying, turn legality, mandatory actions, choices and win conditions remain engine-owned.
- No upstream runtime/rules modification is proposed. A discovered defect needs a focused reproducer and repair review before changing upstream code.
- On expiry, automatically pass the turn when legal; use an already-defined legal default when available, otherwise pause. Repeated timeout never authorizes loss/concession/forfeit.
- Infrastructure/time uncertainty pauses for audited recovery. Ordinary player disconnect/browser suspension grants no time and does not pause.
- AUTH-01 remains separate with injected authenticated qualification sessions. Ordinary Lab/Collection, official cards/private choices, rewards, observers, multiplayer, devices/load and production remain gated.
- Append migration0005; do not edit0001–0004, old manifests or old evidence. Do not rewrite or delete existing matches to make an engine pin appear compatible.
- Retain protocol1 diagnostics and protocol2 live handlers. Timed matches use a distinct protocol3. Viewer DTO revision1 stays closed and unchanged.
- Run every application command inside the existing Dev Container. One heavyweight qualification at a time; Node test-file concurrency1 and browser workers1. Keep all tests and explicit CAS race concurrency.
- No Windows/WSL clock/memory/pagefile/service repair, spending, deployment, upstream refresh, push/main merge or startup-supervisor test edit.
- Native schema1 change/run evidence, exact recorded UTC and monotonic duration, full cumulative file coverage and current docs/map/features/handoff are mandatory. Preserve failed runs.

## Review focus

1. A malformed or ultimately illegal move must not freeze time, receive a bonus or mutate a saved game; test admission, rollback and later deadline settlement in tasks1–3.
2. A timely player action delayed by engine calculation must beat a later timeout without opening a long database transaction; test exact admission ordering and expired-owner recovery in tasks2–3.
3. An internal timeout ID must be impossible for either participant to preclaim; test namespace separation, duplicate sweeps and competing natural completion in tasks2–3.
4. Clock-only changes must reach the correct authenticated player without invalidating card refs or replaying a full game for every display tick; test clock/engine revisions, privacy and reconnect in task4.
5. An outage, bad time sample or restarting one instance must not become a player's forfeit or disrupt another healthy owner; test shared health, pause/resume, tampering and process death in tasks2–4.

## File ownership and interfaces

New files have one responsibility. Add each to `docs/documentation-map.json` when created and review existing source-impact edges before editing. Source paths below are intended new files unless named as modifications.

| Owner | Files | Responsibility |
|---|---|---|
| Public clock policy/projection | `packages/contracts/src/clocks.ts`, contracts index/tests | Closed bounded data, separate from private runtime state |
| Engine clock integration | bridge `vendor/tcg-engines/src/kernel.ts`/`.d.ts`; `packages/engine-adapter/src/clocks.ts`, replay/persistence/validation/index and adapter tests | Native clock reuse, controls, deterministic private reconstruction |
| Durable timing | `packages/db/migrations/0005-match-clocks.sql`, `packages/db/src/clock-store.ts`, match-store/index and DB tests | Clock revision, fences, reservations, audit, UTC authority and atomic transitions |
| Clock orchestration | `apps/match-service/src/clock-health.ts`, `clock-runner.ts`, `clock-service.ts`; service/executor/transition-worker | Time health, deadlines, legal system commands, audited recovery and lifecycle |
| Public transport | `packages/contracts/src/live-clock.ts`; live/index; transport-store/gateway/live-connection | Separate live3 decoding, protocol pinning, committed public clock data |
| Browser estimate | `packages/match-client/src/clock.ts`, client index/tests; synthetic browser test | Monotonic interpolation, recovery and cleanup; no authority |
| Evidence/operation | ADR0016, clock runbook/validation, package/current docs/registers and change/run records | Exact source-bound behavior, results and remaining gates |

Shared types are defined before their consumers. Use closed discriminated objects, not arbitrary dictionary commands:

```ts
// contracts/clocks.ts; all millisecond fields are safe integers.
export interface ClockPolicy {
  schemaVersion: 1; id: string; profile: 'qualification'; mode: 'dynamic';
  initialReserveMs: number; reserveCapMs: number;
  perActionBonusMs: number; perTurnPassBonusMs: number;
  resetTimeOnSkipMs: number; graceMs: 0;
}
export interface EngineClockState {
  policy: ClockPolicy; running: boolean; activePlayerId: string | null;
  startedAtMs: number | null;
  players: {playerId: string; remainingMs: number; timeoutCount: number}[];
}
// Public DTO; no lease capability, hidden state, raw ctx.time or audit notes.
export interface ClockProjection {
  schemaVersion: 1; policyId: string; stateVersion: number; clockRevision: number;
  status: 'running' | 'processing' | 'paused' | 'ended';
  serverNowMs: number; deadlineMs: number | null; activePlayerId: string | null;
  players: {playerId: string; remainingMs: number}[];
  pauseReason: 'recovery' | 'time_unreliable' | 'no_legal_default' | null;
}
```

Validation limits: identifier rules already used by public contracts; two distinct enrolled players only; initial/reset allowances1..3,600,000ms; cap1..3,600,000ms; each bonus0..600,000ms; initial/reset no greater than cap; grace exactly0 for this selected auto-pass policy. All public amounts are clamped to0..cap. Timestamps/revisions are nonnegative safe integers; deadlines must fit supported date bounds. Clock-only engine inspection can retain bounded negative overage internally; it never permits an overage to award a winner. All unknown fields/accessors/NaN/fractions/oversized values fail closed. Production policy slots remain disabled and unselected; this type admits qualification only.

## Task 1: Native engine clocks and deterministic adapter controls

**Files:** Create contracts/clocks, adapter/clocks and owning tests; modify bridge/types, adapter validation/replay/persistence/index and contracts index. Preserve every upstream file, the patch ledger and all original tests.

**Consumes:** `createSyntheticKernel`, upstream dynamic `settleClocks`/`pauseClock`/`resumeClock`, runtime snapshot/restore APIs, existing secure RNG and canonical replay validation.

**Produces:** `parseClockPolicy(unknown):ClockPolicy`, `parseClockProjection(unknown):ClockProjection`; `PrivateMatch.clock():EngineClockState|null`; `PrivateMatch.controlClock(control):void`; optional clock policy in trusted synthetic setup. Controls are closed `{kind:'settle'|'pause'|'resume', timestamp:number, reason?:'SERVER_RECOVERY'|'JUDGE_PAUSE'}` or `{kind:'reset',timestamp:number,playerId:string,remainingMs:number}`. Reset is legal only while paused, for an enrolled player, at0..cap and through an explicitly audited recovery decision; reuse `resetPlayerTimeAfterSkip` with `incrementTimeoutCount:false`. Only server code can call adapter controls; Lab/player submit never gains them.

- [ ] **Step 1 — Add failing public bounds and real adapter regression tests.** Use Node's existing test runner and built adapter imports. Add the following primary scenario, then malformed setup/controls, inactive clock, cap and replay cases:

```js
const clock = {schemaVersion:1,id:'qualification-dynamic-v1',profile:'qualification',
  mode:'dynamic',initialReserveMs:150000,reserveCapMs:150000,
  perActionBonusMs:5000,perTurnPassBonusMs:60000,resetTimeOnSkipMs:60000,graceMs:0};
const m = createPrivateMatch({matchId:'clock-adapter',players:['p1','p2'],startTimestamp:100,clock});
let revision=0;
for(const [actor,move,input] of [
  [m.status().choosingFirstPlayer,'chooseWhoGoesFirst',{playerId:'p1'}],
  ['p1','alterHand',{cardsToMulligan:[]}],['p2','alterHand',{cardsToMulligan:[]}],
]) assert.equal(m.submit({actor,move,input,expectedRevision:revision++,timestamp:100,commandId:'open-'+move+actor}).accepted,true);
assert.equal(m.submit({actor:'p1',move:'passTurn',input:{},expectedRevision:revision,
  timestamp:150100,commandId:'expired-pass'}).accepted,true);
assert.equal(m.clock().players.find(p=>p.playerId==='p1').remainingMs,125000);
assert.equal(m.status().ended,false);
const restored=restorePrivateMatch(m.checkpoint(),'clock-adapter');
assert.deepEqual(restored.clock(),m.clock());
assert.deepEqual(restored.project({kind:'participant',playerId:'p1'}),m.project({kind:'participant',playerId:'p1'}));
restored.dispose();m.dispose();
```

- [ ] **Step 2 — Record the expected failure.** Inside the container run `node --test --test-concurrency=1 packages/contracts/tests/clocks.test.mjs packages/engine-adapter/tests/clocks.test.mjs` before implementation, capturing the missing-function/configuration refusal. Do not change original expected outcomes to obtain green tests.
- [ ] **Step 3 — Expose existing runtime clock helpers through the bridge.** Pass only validated dynamic config to `MatchRuntime`. Read a defensive constructed clock state. Apply controls with `runtime.restoreState(nextState,runtime.createRuntimeSnapshot(),{preserveHistory:true})`; preserve logs/events/sequences. Validate a player command before `processCommand` to avoid retaining its pre-validation clock settlement; restore complete runtime state/history on execution rejection. Keep existing player-role enforcement and the move allowlist.
- [ ] **Step 4 — Journal controls with explicit versioning.** Keep untimed private-v1 shape behavior. Timed private-v2 setup includes clock policy and distinguishes player entries from typed clock controls. Re-execute both on restore; compare canonical full transcript, clock/state/RNG hashes and statuses. Unknown versions, time reversal, control reordering, altered policy/remaining time/winner or completion edits are rejected. Clock controls cannot unfreeze a completed match.
- [ ] **Step 5 — Run the owning tests and upstream invariants.** Build with `pnpm --filter @lorcana/contracts build`, `pnpm --filter @lorcana/vendor-engine build`, then `pnpm --filter @lorcana/engine-adapter build`; rerun the preceding test command, `pnpm engine:test-upstream`, `pnpm engine:test-injection`, `pnpm engine:check-randomness` and `pnpm boundaries` sequentially. Verify361 selected upstream files/59 patches remain unchanged. Record success/failure and review current engine/replay/package documentation before the next task.

## Task 2: Durable UTC anchors and fenced timed transitions

**Files:** Create migration0005/clock-store and `apps/match-service/tests/clock-storage.test.mjs`; modify DB match-store/index/policy tests and integration wiring. No new dependency.

**Consumes:** Existing `StoredMatch`, `DurableCommand`, `CommitCandidate`, `ReceiptResult`, new clock policy/state, restricted match-role connection and immutable migration history.

**Produces:** Optional `StoredMatch.clock`; `createClockRepository(target,root)` and typed reservation operations. Create the initial clock row atomically with the match. The service must not use a two-transaction create-then-attach pattern.

```ts
export interface StoredClock {
  policy: ClockPolicy; revision: number; stateVersion: number;
  engineTimestamp: number; anchorUtcMs: number; deadlineUtcMs: number | null;
  status: 'running'|'processing'|'paused'|'ended';
  activePlayerId: string | null; remainingMs: Record<string,number>;
  lastHealthyUtcMs: number; pauseReason: ClockProjection['pauseReason'];
  checkpointDigest: string;
}
export interface ClockReservation {
  id: string; matchId: string; kind: 'player'|'timeout'|'pause'|'resume';
  admittedAtMs: number; expiresAtMs: number;
  expectedStateVersion: number; expectedClockRevision: number;
  engineTimestamp: number; // anchor engine time + trustworthy thinking elapsed
}
// Successful reservations include the exact before-match/clock checkpoint.
// Outcomes are discriminated; never treat busy/stale/paused as ownership.
type ReserveResult = {kind:'reserved';reservation:ClockReservation;before:StoredMatch}
  | {kind:'duplicate';result:ReceiptResult}
  | {kind:'busy'|'stale'|'paused'|'expired'};
```

Clock-store methods: `load(matchId,actorId)`, `sample()` returning database UTC; `reservePlayer(command)`, `reserveTimeout(matchId,expectedStateVersion,expectedClockRevision)`; `commitPlayer(reservation,command,candidate,clock)`, `commitTimeout(reservation,candidate,clock)`; `abort(reservation)`; `pause`/`resume` with expected revisions, idempotency and trusted audit metadata; `scan(limit)` for bounded due/health work; `close()`. Inputs and return values are explicitly typed and defensively copied. Store callers are trusted server components, not public request bodies. For boundary regressions only, an optional `sampleForTest(client):Promise<number>` factory dependency is permitted when target is exactly `test`; reject it for local/production use. Label its database executions as actual storage with simulated time, separately from real-time process tests.

- [ ] **Step 1 — Add failing actual database tests.** Assert missing migration/repository before changing SQL. Use the existing test target, random owned fixture IDs and fixture cleanup. Add database fault hooks inside transactions and independent process barriers, retaining all original match tests.

```js
// Against the real repository, with an injected test-only DB time reader:
const early=await a.reservePlayer(command); // authority time deadline-1
assert.equal(early.kind,'reserved');
assert.equal((await b.reserveTimeout(id,v,c)).kind,'busy');
await a.commitPlayer(early.reservation,command,candidate,nextClock);
assert.equal((await b.reserveTimeout(id,v,c)).kind,'stale');
// Repeat in a separate fixture with admission exactly at deadline:
assert.equal((await a.reservePlayer(lateCommand)).kind,'expired');
const results=await Promise.all([a.reserveTimeout(id,v,c),b.reserveTimeout(id,v,c)]);
assert.equal(results.filter(r=>r.kind==='reserved').length,1);
```

- [ ] **Step 2 — Append SQL and decoders.** Create clock/reservation/audit records with bounded types/checks, match foreign keys and CAS uniqueness. Clock events record only metadata and hashes. Extend protocol constraints for3 and v3 clock-expired rejection explicitly; do not loosen existing1/2 parsing. API/worker roles cannot select these tables. Retain old migration digests.
- [ ] **Step 3 — Implement short reservation/commit transactions.** Under match/clock row locks: check prior receipts first, pins, engine/clock versions, healthy time, deadline and unique owner. Commit a positive bounded lease and release the SQL transaction before engine work. At deadline reject ordinary admission and select timeout. Validate the reservation ID, both versions, source checkpoint and lease again at final commit. Accepted writes atomically include checkpoint, clock, receipt, engine journal/outbox and clock event. On CAS loss discard all speculative output.
- [ ] **Step 4 — Enforce system namespace and recovery.** Derive a system actor identity disjoint from both enrolled participant IDs, and use a tagged system intent hash/operation identity. Public receipt lookup remains participant-only. Only `commitTimeout` can consume a system reservation. A stale/dead owner creates a recovery pause; `abort` cannot release a different owner's lease or grant time. Rejected computations retain the original UTC anchor. Never include capability IDs or replay bytes in receipts/notifications.
- [ ] **Step 5 — Run real race/crash/migration/permission tests.** Cover six-way duplicate/timeout races, SQL failure before every durable write, process kill before/after COMMIT, reservation death and wrong-owner commit. Recompute a mutable row checksum after tampering and still require reconstruction rejection. Build with `pnpm --filter @lorcana/db build`; apply using `node packages/db/dist/cli.js migrate --target test` and the same command with `--target local`; run `node --test --test-concurrency=1 apps/match-service/tests/clock-storage.test.mjs` and existing `pnpm db:test` sequentially. Confirm only owned fixtures are removed; preserve all original data/roles.

## Task 3: Time health, legal timeout service and owned runner

**Files:** Create clock-health/clock-service/clock-runner and tests `clocks.test.mjs`, `clock-process.test.mjs`, `clock-child.mjs`; modify service/executor/transition-worker, owning manifests/test command registration and CI coverage. Ordinary main stays diagnostics-only.

**Consumes:** Task1 adapter controls and task2 reservations. Maintain raw trusted submit/reference-only public submit separation and original-intent idempotency.

**Produces:** `createClockHealth({monotonicNow,toleranceMs,maxGapMs})`, `createClockService({repository,clockRepository,executor,releases,health})`; timed match create and `readClock`, `timeout`, audited `pause`/`resume`; `createClockRunner({clocks,intervalMs,batchSize}).start()/drain()/close()`. Extend engine work with a closed clock-control/timeout job; no arbitrary role/move/winner channel.

- [ ] **Step 1 — Add fake-time tests that fail on missing integration.** The time source is injected only through trusted factories; no public request can supply it. Pin the main adversarial expectations:

```js
// Fresh timed match opened through legal setup; fake samples are shared authority inputs.
clock.advance(10000);
assert.equal((await s.readClock('p1',{matchId:id})).players[0].remainingMs,initial-10000);
const before=await s.view('p1',{matchId:id});
await s.pause({matchId:id,expectedStateVersion:v,expectedClockRevision:c,
  operationId:'audited-pause',auditorId:'qualification-auditor',reason:'recovery'});
clock.advance(600000);
assert.deepEqual(await s.view('p1',{matchId:id}),before);
assert.equal((await s.readClock('p1',{matchId:id})).status,'paused');
// Wrong revisions cannot resume. Correct audited resume preserves remaining allowance.
```

Define the owning fake time fixture with `advance(ms)`, `databaseNow()` and `monotonicNow()` using one integer elapsed counter; allow separate wall/monotonic increments to test disagreement. Actual disconnect checks close the real sockets in tasks3–4; there is no server disconnect API that changes clock state.

- [ ] **Step 2 — Implement bounded time-health sampling.** Bracket each database sample with process-monotonic reads. Compare shared elapsed time against the monotonic uncertainty interval, not a single unadjusted round-trip point. Default sampler tolerance1,000ms and max healthy gap15,000ms; runner interval250ms, batch32, one owned sweep at a time, reservation lease15,000ms. All are validated injectable operational limits. Clock anomalies and missing continuity pause at the last trustworthy charge; never change host clocks or evidence thresholds. A fresh instance joins a healthy shared runner without resetting a match or pausing another valid owner.
- [ ] **Step 3 — Route timed commands through reservations.** Existing untimed paths remain exact. Timed refs are resolved only after durable prior-receipt lookup. Store maps trustworthy UTC admission elapsed into engine time; accepted processing time is excluded by the new commit anchor. Invalid requests earn no action/turn bonus and retain elapsed charge. Use existing bounded workers/queues and discard their stdout. Public raw IDs/debug/system operations remain refused.
- [ ] **Step 4 — Implement legal timeout and audited recovery.** Read clock state and active decision-maker from the restored engine. At expiry validate ordinary `passTurn` as that player. If unavailable and no already-defined safe no-choice default is applicable, record a paused clock with `no_legal_default`; do not pick cards/targets/first player or bypass Reckless/Adventurous/choices. Never call `handleReserveExpiry`, `forfeitGame`, client-controlled drop or judge-role submission. Pause/resume operations use independent IDs and explicit internal audit identity and preserve completion freeze. A resumed exhausted clock needs an explicit audited compensating reset if necessary; reconnect cannot supply one.
- [ ] **Step 5 — Implement runner lifecycle and prove real process behavior.** Runner reconciles admitted timed games even with zero clients. Persist heartbeat/ownership without publishing a state update every tick; use bounded backoff when storage is unavailable. Graceful close stops timers, drains work and releases only owned reservations. Actual child processes test slow engine compute crossing a deadline, one of two runners restarting, loss of all runners, death while owning a reservation and recovery after an audited pause. Competing concession/timeout must retain one terminal event; ordinary timeout alone cannot end a game.
- [ ] **Step 6 — Run unit and real database/process checks.** Build with `pnpm --filter @lorcana/match-service build`; run `node --test --test-concurrency=1 apps/match-service/tests/clocks.test.mjs`, then `node --test --test-concurrency=1 apps/match-service/tests/clock-process.test.mjs` and `pnpm test:match-integration` sequentially. Record targeted failures and passes before broad tests. Verify malformed/forged/stale requests, exact cutoff, hidden-state invariance, denied external recovery and bounded memory/listeners. Do not edit the unrelated30-second development-supervisor test.

## Task 4: Distinct live3 clock transport and browser estimates

**Files:** Create live-clock schemas, browser clock helper and owning tests; modify live/index, transport-store, gateway/live-connection, match-client index, release-manifest compatibility tests, and add `apps/web/tests/clock-client.spec.ts`. Keep existing diagnostic/live2 assertions.

**Consumes:** Stable clock projection parsers, `readClock`, engine/clock revision observation, existing verified ticket/session/current-ref transport.

**Produces:** Live3 codecs/handlers, built protocol range1..3, match-client clock state/callback and pure `estimateClock(projection,playerId,elapsedMonotonicMs):number`. Normal client supports2..3 and uses the ticket's actual pinned version; a restored2 pending command is never silently relabeled3.

- [ ] **Step 1 — Add failing codec/compatibility tests.** Preserve existing2 frames byte for byte. Construct separate3 authenticate/sync/command and ready/snapshot/receipt/control frames;3 snapshot carries the unchanged viewer payload and a separate validated clock. Reject clock data in2, missing/private/unknown fields in3, participant mismatch, clock stateVersion mismatch and old-client negotiation for a timed match. Extend shared-ticket tests to ensure2/3 cannot be exchanged or downgraded.
- [ ] **Step 2 — Implement explicit version dispatch.** Route by saved-match protocol and request support, not simply the highest global version. Ticket issue/consume verifies the same protocol with the saved match. Connection authentication binds the actual ticket protocol; command frames must match it. Publish only after COMMIT and after session/participant revalidation. Track engine/clock revision separately so a pause publishes without changing card refs. New release identity declares1..3 after handlers exist; artifact schema stays3 because owning built bytes already bind the extension.
- [ ] **Step 3 — Add fake browser-clock tests before the estimate helper.**

```js
const p={schemaVersion:1,policyId:'qualification-dynamic-v1',stateVersion:3,
 clockRevision:7,status:'running',serverNowMs:1000,deadlineMs:6000,
 activePlayerId:'p1',players:[{playerId:'p1',remainingMs:5000},{playerId:'p2',remainingMs:9000}],pauseReason:null};
assert.equal(estimateClock(p,'p1',1500),3500);
assert.equal(estimateClock(p,'p2',1500),9000);
assert.equal(estimateClock(p,'p1',999999),0);
assert.equal(estimateClock({...p,status:'paused',deadlineMs:null,pauseReason:'recovery'},'p1',1500),5000);
// No estimate path submits a move or awards a result when it reaches zero.
```

- [ ] **Step 4 — Implement client ownership and estimates.** Accept only current authenticated clock snapshots; capture local `performance.now` when a projection arrives, derive elapsed locally, clamp display to zero, defensively copy data and clear it with viewer state on suspend/retry/sign-out/dispose. Clock revision can advance with the same engine version; duplicate/backward/mismatched projections are rejected. Do not use `Date.now` as game authority or carry a stale clock through a suspended page. Keep original pending command IDs and receipt recovery semantics.
- [ ] **Step 5 — Prove real transport/browser behavior.** Two isolated authenticated Chromium contexts use actual gateway processes/database, perform legal opening, observe an actual short timed turn pass and replenishment, disconnect one client without stopping time, reconnect to another gateway, and see the committed outcome. Test audited pause/resume, processing state, no legal default, lost hints and old2 clients. Byte-compare clock outputs under hidden-card permutations and scan frames for seeds/private state/tickets/session IDs. Keep the page a synthetic qualification harness, not final art/UI acceptance.
- [ ] **Step 6 — Run existing plus new contract/client/gateway/browser tests.** Use `pnpm --filter @lorcana/contracts test`, `pnpm --filter @lorcana/match-client test`, `pnpm test:match-integration`, then `pnpm test:e2e:smoke` sequentially after rebuilding owning packages. Add the new clock gateway/client files to those owning test commands rather than leaving them as manual-only checks. Keep one browser worker; close every fixture/socket/runner/context/process and remove only owned test records. Confirm exact-checkpoint projection cache coalescing remains effective; display ticking must not cause a full engine replay.

## Task 5: Final source qualification, documentation and reviewable branch

**Files:** ADR0016, `docs/runbooks/game-clocks.md`, `docs/validation/play-04.md`, existing contracts/runbooks/package READMEs, root/current docs/map/features, backlog/requirements and native change/run/log records. Implementation entries continue to cover the entire base-to-HEAD/staged/dirty/untracked scope, including the preceding approved-design commit.

- [ ] **Step 1 — Update docs and feature verification at each source checkpoint.** Mark stale whole-source verified entries pending before new executable edits; retain all historical evidence. Classify all new source-owned docs and update source-impact edges. Record new functions/inputs/outputs/errors/authority/lifecycle and version limits at their owning package. Requirements may cite foundation evidence without claiming full-card, device or production acceptance.
- [ ] **Step 2 — Run the complete ordered container checks.** Record fresh `doctor`, static/docs, bootstrap, original DB, frozen install, build/type/lint, all project/upstream/injection tests, real match DB/process checks and both browser suites. Use the unchanged full command surfaces; do not remove selected suites. Every heavy command runs alone. Inspect memory headroom before browser/clean work; no settings change.
- [ ] **Step 3 — Verify clean/canonical source and preserved data.** Run frozen source-only clean validation and canonical Git-checkout verification sequentially. Confirm private files remain ignored/mode0600 and unchanged, original DB data retained, migrations0001–0004 byte-identical and no owned listeners/children remain. Retain clock-rejected receipts as failures; do not run isolated CI merely to reproduce known host drift.
- [ ] **Step 4 — Obtain one independent critical review of the complete branch.** Review timer authority/deadline races, private reconstruction/seed boundaries, namespace collision, old protocol pins, migration/role isolation, shared outage detection and shutdown. Fix supported findings with focused regressions and fresh affected evidence. No review or success is inferred from the plan.
- [ ] **Step 5 — Finalize only passing scope and prepare the commit.** Update all mapped current docs, exact evidence category/count/limits, task/feature status, changelog and handoff. Synchronize/check docs, review the cumulative staged file set and sanitized logs/secrets, then commit on `codex/play-04-game-clocks`. Report commit, behavior, actual checks, limitations and remaining gates. Do not push/merge/deploy without Director authorization.

## Self-review and next checkpoint

Coverage: engine reuse/reconstruction in task1; durable anchors/races/process recovery in tasks2–3; authenticated publication/reconnect in task4; source-bound proof/current documentation in task5. Five review-focus cases have explicit owning tests. No upstream mechanics rewrite, timeout forfeit, production duration or host repair is planned. Shared type/function names above define the cross-task interfaces; new helpers remain server-owned unless listed as public codecs/estimates. Examples identify test-only fixtures explicitly and do not introduce an application authenticator or disconnect API.

Recommended execution: native implementation by this agent in the current chat, sequential heavy checks and one final independent reviewer. The Director's written-design approval is recorded; **plan approved and native execution selected**, recorded 2026-10-15T05:30:06.781Z (event time unknown). Execute continuously under the executing-plans skill; no per-task approval loop.
