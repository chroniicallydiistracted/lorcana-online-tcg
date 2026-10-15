# Authoritative game-clock operation

[ADR0016](../adr/0016-durable-engine-clocks.md), [approved design](../plans/2026-10-15-play-04-design.md), [current validation](../validation/play-04.md) and [independent review](../reviews/2026-10-15-play-04-clocks.md) govern this internal two-player synthetic foundation. Normal startup stays diagnostics-only. AUTH-01 supplies real sign-in later; all ordinary/card/private/reward/device/load/production gates remain closed.

## Policy and engine ownership

Thinking time is separate from ink. Reuse existing native dynamic settlement, action/pass bonuses, cap and exhausted-player replenishment. The outgoing timed-out player receives125000ms under native150000initial/cap,5000action,60000pass and60000reset values. These are qualification defaults; launch durations are unselected. Successful ordinary actions follow native rules; no timeout forfeit, debug move, winner override or invented card/target/opening choice is permitted. Timeout validates an ordinary pass; impossible passing pauses with no_legal_default. A legal pass may naturally complete the game under existing engine rules.

`createPrivateMatch` optionally accepts a bounded qualification clock policy and a positive captured startTimestamp (zero is native's unset sentinel; untimed zero remains valid). `clock()` returns constructed private native data, not a wire object. `controlClock` accepts only settle/pause/resume/reset. It preserves history/log sequence/card refs, excludes paused intervals and refuses completed controls. Invalid speculative commands revert clock mutation/bonuses. Timed private transcript2 reconstructs all controls/hashes; untimed1 remains exact for the current executable identity. Unsupported prior identities fail closed without rewriting saved data. Seeds/private replay remain participants/authorized-auditor only with no delivery endpoint.

## Durable admission and outcomes

Migration0005 adds clock state, short reservations and metadata-only clock events. It is applied to local/test; all five SQL files are immutable. Only match-role storage may access them. Backups contain shuffle secrets and require secret handling.

`createClockRepository` is also the primary MatchRepository. Writers lock match then clock and reread current state after both locks; a pre-wait READ COMMITTED snapshot cannot make decisions. `reservePlayer` checks prior receipt/version/pins/deadline and commits a bounded lease before expensive proof reconstruction or transition work. Exact deadline refuses the active player's admission; a waiting player's concession may still be admitted before the timeout owns the fence; an earlier reservation may complete later within its lease. Final CAS verifies owner, versions, checkpoint and lease, then atomically commits state/clock/receipt/journal/outbox/events. No SQL transaction stays open for engine computation.

Invalid calculations keep the original UTC charge anchor and earn no bonus. `reject` checks authority time under locks: expiry, backward time or missing health commits a safety pause before returning UNAVAILABLE, without applying the calculation or writing an invalid-intent receipt. Wrong owners cannot release another reservation. Timeout identities are disjoint from both participants. Public receipts/hints never contain seeds, checkpoints, reservation capabilities or hidden state.

`activeClockIds(ids)` is a server-only bounded query (at most256IDs) used to reclaim terminal/paused continuity entries. `scan(limit)` rotates fairly through running/processing rows, at most128per query. These bounds are infrastructure controls, not measured50player capacity.

## Health, continuity and recovery

`createClockHealth` serializes DB UTC samples bracketed by process monotonic reads. Defaults: tolerance1000ms, maximum healthy gap15000ms. Failure latches until trusted audited reset/new factory. A locally stalled/unhealthy actor refuses adjudication and emits no idle shared pause: another owner can remain healthy. An owned in-flight reservation that fails remains fenced and safely paused. Healthy actors detect durable shared gaps/dead leases and pause at the last trustworthy charge, excluding the outage. No helper changes host clocks or evidence guards.

Only actual atomic new-row creation immediately enrolls its creator. A new server encountering saved state must observe independent heartbeat/revision progress; it must not manufacture continuity by self-heartbeating after an outage. Known/probe cleanup uses one bounded active-ID query and generation checks, never granting new continuity. `prepareCreation` reserves one of128local enrollment slots before durable create and releases claims in finally; concurrent creation cannot save a row and then fail only because bookkeeping is full. Audited resume also reserves capacity before its final commit. These are process-local operational bounds, not a production concurrency claim.

`createClockRunner` owns one nonoverlapping sweep, default250ms/batch32, bounded backoff to5000ms, and close stops scheduling/drains active work. Root close signals runner and clock service together, drains both, then closes executor/storage. There is no redundant drain alias. Player disconnect/browser suspension grants no time and cannot concede.

Internal `pauseClock`/`resumeClock` require recoveryAuthority approval of auditId, exact engine/clock revisions and independent operation IDs. Retries return original results; changed reuse conflicts. A resume settles only the preserved healthy interval, excludes outage and can explicitly reset a bounded enrolled allowance. No public recovery/login route exists. Unhealthy actor replacement/audited recovery is separate from a client's reconnect.

## Wire/client ownership and checks

Distinct live3 binds ticket/auth/command/snapshot to the saved protocol. Untimed matches remain2; diagnostic1 is unchanged. A live3-only release refuses untimed setup before persistence. Clock-only revision changes publish after COMMIT without changing viewer DTO1/card refs; display ticks never cause server replays. `estimateClock` and client estimate use local monotonic elapsed time only, clamp zero and send no timeout/result. Clock/view/callback state clears on suspend/retry/sign-out/dispose; pending command IDs and original2/3version survive explicitly restored recovery.

Use original Dev Container and native evidence recorder, one heavyweight command at a time. Root foundation checks include all unit/contract/privacy/upstream suites; `test:match-integration` adds actual DB/process/gateway/race/fault proofs; `test:e2e:smoke` includes both chooser-seat Chromium clock cases; `test:engine-browser` retains Lab checks. Preserve failed receipts and cleanup only owned fixtures/processes. Headless Chromium is not a Windows/device observation. Full-length real-card replay cost,4096event limit, general choices, load, production proxy/session authority and host UTC accuracy remain separate gates.

## Audit cautions — 2026-10-15 UTC

From the [independent audit](../validation/play-04.md#independent-audit--2026-10-15-utc) (CHG-20261015-005); these stay in force until a fix change says otherwise:

- Historical findings1/2 are repaired in CHG007, with re-audit pending: waiting non-concession commands write invalid_intent receipts without a timed reservation, clock mutation or proof work. Short match→clock transaction locks remain authoritative; engine computation holds no SQL transaction.
- A waiting concession can be admitted across the active player's deadline before the timeout reservation; all version/lease/health/pause and engine checks remain. The active player's exact-deadline commands remain clock_expired. A competing pass may make a concession stale; rejected/stale receipts remain final for their IDs.
- Re-audit residual R1 (CHG-20261015-008): during the opening the engine refuses every concession, but a waiting player's concession still takes the timed reservation for about 170 ms. Repeated concessions make the active player's opening decision return `BUSY`, and the stock client stops after 8 busy replies (about 2 s) while the opening clock runs. Treat this as an open time-abuse defect until a fix change says otherwise.
- An opening timeout (first-player choice or mulligan) always pauses. Resuming without an explicit reset reopens at zero and pauses again on the next sweep. Use a bounded reset in the audited resume.
- A process whose own health sample fails stops adjudicating and does not pause games. On a single host, restart it and then audit-resume each affected match. A sweep longer than the 15 s healthy gap can cause this, so measure sweep duration under load before raising match counts.

Internal reservePlayer receives the validated move with DurableCommand and may return rejected with its durable receipt without taking a timed lease. BUSY is a transient service error only. The gateway sends the unchanged rate_limited/rate_limit shape with100ms retryAfterMs; the client keeps its view, socket and pending ID. No durable busy receipt is written. Other UNAVAILABLE paths remain maintenance/fail-closed. See the fix section of validation for executed proof and re-audit status.
