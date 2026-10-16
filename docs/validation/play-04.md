# PLAY-04 validation — authoritative thinking-time clocks

Recorded 2026-10-15T16:07:29.227Z. **Approved two-player synthetic technical scope implemented and locally verified; ready for Director audit.** Branch codex/play-04-game-clocks, base775994a82f5f003c4c4831a20791d5e904ff3d6b, planning commit2033396. Tested executable/config/test/schema fingerprint: `a41c1374759fa3beb265e5944189a638184305b181f21518bdda6ae795620d59`. [Design](../plans/2026-10-15-play-04-design.md), [plan](../plans/2026-10-15-play-04-implementation.md), [ADR0016](../adr/0016-durable-engine-clocks.md), [operation](../runbooks/game-clocks.md) and D12 define authority.

## Behavior and boundary

Reuse the existing native dynamic thinking-time countdown, separate from ink: configurable allowance/cap/action/pass/replenishment values. Expiry attempts only a legally validated ordinary pass; unresolved opening/mandatory choices pause. No timeout forfeit, invented default, debug move or player clock authority. A legal pass may naturally finish under ordinary engine rules. Player disconnect/suspension does not pause or replenish. Infrastructure/time uncertainty requires audited recovery; a locally unhealthy actor cannot pause another healthy owner.

Short fenced DB admission precedes expensive proof/transition work. Early admitted calculation can cross the deadline within its lease; exact cutoff refuses new player admission. State/clock/receipt/journal/outbox/events commit atomically. Expired/backward invalid results durably pause before refusal. Timed private-v2 reconstruction, untimed-v1 support for the current identity, distinct live3/tickets and monotonic browser estimates retain existing authority/privacy boundaries. Clock-only publication preserves card refs; display ticks do not replay games. Creation reserves bounded continuity capacity before persistence; terminal/probe cleanup never invents continuity.

Only project-owned bridge/adapter code changes: all361selected upstream files/59recorded patches/37unchanged tests remain intact. All five applied migrations are immutable;0005 is additive and applied to both local/test. Match-role-only storage, private files and original Docker mount/database volume remain. AUTH-01 is separate; ordinary startup stays diagnostics-only. No ordinary Lab/Collection/official/card/private-choice/reward/observer/multiplayer/device/load/production admission or host-setting repair.

## Final executed proof

All rows below pass at the exact fingerprint above, with valid UTC/monotonic pairs, exit0 and no clock discontinuity. JSON/logs under validation/runs and validation/logs retain exact commands, times, digests and categories.

| Run | Category | Actual result and limits |
|---|---|---|
|084|container|Frozen offline install, doctor, static/docs, types, lint, builds,350project checks (326Node+24Python),406upstream passes/1inherited skip,2injection and original authenticated bootstrap DB. No actual isolated CI inferred.|
|085|container|Both local/test role-health sets;5DB integration+3storage-contract+58match/service/storage/gateway/process checks=66. Includes actual PostgreSQL/process death/six-way races/fault rollback; injected clock scenarios are simulated time, not a host-clock test.|
|086|headless_browser|Cold-cache Linux Chromium153/SwiftShader, one worker:10foundation/live checks including both opening chooser seats;2Lab Web Worker checks. Original cache restored. No Windows/device/GPU floor acceptance.|
|087|container|Source-only clean frozen install and complete foundation; no credentials/Git/dependencies/build output or database copied. Temporary source copy removed.|
|088|container|Canonical Git-staged source export, executable-byte equivalence to084, clean frozen install and identical complete foundation. Final documentation-only revisions use the same executable fingerprint and separate final documentation checks.|
|089|container|Installed dependency lock/license/advisory policy and vendor check:222components,0reported advisories in every severity,12published packages with metadata-only root notice gaps. Ignored local reports retained; redistribution/legal/OS/Bun/Chromium or promoted artifact qualification not inferred.|
|090|container|All preceding final-source runs match; current and full-history known/pattern secret scan over2988unique blobs in bounded batches;703existing log digests;548requirements/33groups/20optional/device-disposition fields, approvedD12, archive/toolchain/container/earlierSQL/upstream/Lab bytes retained. Private0600ignored files match the recorded later checkpoint, not an invented intake hash.|
|091|container|No owned main/clock-child/gateway-child processes or5173/3001/3002listeners. Original private files and ignored preservation metadata0600. No process killed or environment setting changed.|
|092|static|Final documentation/changelog/inventory, current-source/log secret scan, staged whitespace and exact canonical identity of 667 executable/config/test/schema files; complete 243-file branch inventory at that checkpoint, including the receipt pair. CHG004 separately indexes the receipt; no executable change.|

The clean/canonical copies validate the current code and their recorded document checkpoint. Final prose/register/changelog revisions are documentation-only and validated separately before commit; runtime bytes stay identical. No fresh long isolated14-stage run, hosted CI result, promoted archive, required-check settings or absolute UTC qualification is claimed. Earlier clock-rejected receipts remain unchanged.

## Development failures and source checkpoints

These are historical source-specific results, not additional final-source pass counts. No selected test is removed. RUN060 never executed after Director stop; no record/result is fabricated. Director subsequently resumed the approved plan.

| Runs | Recorded result / correction |
|---|---|
|019–026|Merged PLAY-03 baseline, public hosted audit/main failure+retry metadata, policy/design/plan documentation;023passes unchanged406upstream/1skip before integration. No downloaded hosted logs/artifacts or new timing inference.|
|027→028/029|Expected8missing clock cases fail, then targeted8 and broader14contracts/37adapter/406+1skip/2injection/randomness/boundaries pass.|
|030/031→032/033|Missing storage interface RED; frozen install passes then SQL literal compile error; corrected build,0005test/local migrations and scoped role/storage/match proofs pass.|
|034→035/036|Unused initializer lint failure; corrected lint/types/13targeted checks and docs pass.|
|037→038/039→040|Expected missing orchestration/runner failures, then worker/health/service/runner targeted passes.|
|041/042→043/044|Actual process/fault proof;041third title overstates crossing (actually expired lease), corrected and separately tested later. Overlapping health sample RED042→serialized GREEN043;22checks plus docs/lint pass.|
|045/046→047/048/049|Missing live3/estimate RED and TypeScript narrowing error;16contract/10client and2actual gateway passes;049fixture lint failure retained.|
|050→051|050partial duplicate proof, after-COMMIT fixture failure/unbounded wait, owned interruption and clock_changed rejection.051passes13bounded actual process/fault cases after harness correction; no host/guard change.|
|052/053/054|Opening receive failure; test diagnostic module URL type prevents053startup;054passes with extra diagnostic import and is not a repair.|
|055→056|Completed-view/clock status and native-zero sentinel RED→10targeted guards/private clock-world checks pass. Untimed0retained, no upstream edit.|
|057/058/059|Cold-browser failure, diagnostic pass, then both chooser cases expose actual revision rewind. Earlier diagnostic passes did not establish repair.|
|061/062→063/064|Original resumed baseline passes;06211pass/2fail proves actually blocked stale READ COMMITTED sidecar and shutdown-drain bugs;06313pass after fresh reads under both locks/concurrent stop;064cold both chooser seats pass.|
|065/066→067|7storage/3client checks pass including six independent timeout repositories/system-name collision. Standalone clean DB build RED066→GREEN067 after root DB dependency closure selector; no credentials copied/DB accessed.|
|068–071→072|Missing explicit doc-impact review failures preserved; complete synchronization/check passes072.|
|073/074/075→076/077|New test-global lint error, stale generated inventory and old HTTP1..3-invalid expectation retained;0768runtime/12client checks pass after corrections.077passes role/5DB/3contract and52of53match checks; only old built-manifest1..2 expectation fails, corrected to1..3 with untimed2 retained.|
|078/079→080|Independent review:07818pass/7fail for four Important findings;079adds129th-probe failure;08026targeted pass after the one fix pass.|
|081→082/083|Author-found live3-only release allowed unsupported untimed persistence;081RED→08227clock checks/strict lint GREEN.083documentation review gap retained, then final084full proof passes.|

## Independent review

One fresh-context gpt-6-astra read-only review examined complete dirty/untracked branch scope. [Report and dispositions](../reviews/2026-10-15-play-04-clocks.md) records four Important, no Critical/Minor; initial verdict with fixes. The author's one fix pass has discriminating RED→GREEN regressions and fresh whole-source suites above. No second independent approval is implied.

Corrections: local health isolation; cold proof after reservation; late/backward rejected-result fencing; terminal known/probe reclamation and pre-COMMIT capacity claims. Additional early untimed/live3-only pin validation is covered by081→082.

## Engineering rulings and costs if wrong

| Decision | Cost if wrong |
|---|---|
| Existing scoped branch, bind and original containers instead of another checkout | Additional isolation/setup if existing-workspace choice proves unsuitable. |
| Supplementary /tmp ledger; repository CHG/HANDOFF remain authority | Relocate scratch tooling; no reliance on personal memory. |
| Bound shared protocol offers to three adjacent implemented versions, with distinct1/2/3 handlers | Compatibility requalification if retention policy changes. |
| DB adds only the existing contracts workspace dependency | Package closure/build refactoring if that ownership proves unsuitable. |
| Crash pause retains checkpoint and last trustworthy pending charge; audited resume excludes outage | Revisit recovery policy before real play if charge interpretation changes. |
| A legal timeout pass may naturally end a game under existing rules; no timeout forfeit | Revalidate sourced natural-result behavior, without inventing a clock loss. |
| Primary match and clock repository must be the same authority object | Design an explicit cross-storage transaction if split ownership becomes necessary. |
| Only actual atomic new-row creation enrolls immediately; saved state needs independent progress | Conservative unavailable/pause and an audited decision rather than fabricated continuity. |
| Bounded rotating scan and one owned sweep | Tune scheduling/capacity using measured load. |
| Positive start for timed fixtures because native zero is unset; untimed zero retained | Use a positive fixture epoch or separately qualify a native repair. |
| close stops and drains the runner; no redundant drain alias | Add a named alias if a later consumer requires it. |
| Separate live3 codecs consolidated in live.ts; browser helper named clocks.ts | File refactor and fresh fingerprints if ownership needs splitting. |
| Root database commands build @lorcana/db... dependency closure | A small extra contracts compile. |
| Local unhealthy actor is quarantined; shared proven gaps/failed owned reservations still pause | Revisit health corroboration before real play; never award an automatic result. |
| Generation-safe bounded continuity cleanup plus enrollment claims before COMMIT | Capacity/cleanup redesign if measured operational requirements change. |
| AUTH/admin identity remains separate injected qualification | Reopen identity acceptance before exposing normal routes. |
| Official-card choices/defaults/all-card rules remain gated | Add sourced choice/default codecs and certification before that card is admitted. |
| Production durations, throughput, deployment, devices and UTC accuracy remain unqualified | Measurements/repair and Director acceptance before release. |
| Prior executable loaders fail closed and old data is retained | Qualify retained loaders before activation/rollback. |
| Final-source qualification is executed proof, separate from reviewer judgment | Fresh affected checks if source or supporting evidence changes. |

## Remaining gates and workstation limits

Director audit/publication/main merge remain separate actions. Real sign-in/admin identity, official-card choices/certification, delayed/privileged replay, prior private-engine retained loaders, sandbox manipulation tools, multiplayerP056, game UI/device/load and deployment remain open. Full-match reconstruction cost and4096event limit need real-card measurement. AUTH must make repeated session validation cheap; OPS must prune expired quota records, protect seed-bearing backups and expose clock-health recovery operationally. Production clock durations remain Director/playtest decisions.

Local idle unhealthy actors stay quarantined until audited reset/new factory; shared progress is never fabricated. Healthy actors still fence actual outage/lease gaps. The128local enrollment/128probe/256ID cleanup bounds and runner defaults are controls, not production50player capacity proof. Windows/WSL UTC accuracy remains a separate unqualified host issue; no service/clock/memory/pagefile change is made. No repeated long isolated run solely to reproduce drift.

All heavy checks ran sequentially with one test/browser worker; explicit races retained. Read-only Windows counter observations showed about6.8GiBcommit headroom before full work and5.0GiBbefore browser; peak usage is unknown. These are host-tool observations, not Windows game/device acceptance. The later private preservation baseline is retained only in ignored owner-only .local metadata; native proof compares bytes/modes without printing values. Only generated fixture data/processes are cleaned; original source mount and database volume/data remain.

## Closing receipt bookkeeping

After RUN092, a direct documentation refresh against finalized CHG003 exited 1 with `Source changed: create a new change record before refresh`. This was observed console output, not a recorder receipt or an application failure. The attempted CHG003 amendment was restored byte for byte from its staged checkpoint; no guard was bypassed. CHG004 preserves the correction separately and references the completed RUN092. Its cumulative 246-file inventory adds the closing entry and RUN093 recorder pair to the prior 243-file scope. RUN093 records final synchronization, consistency, canonical source equivalence and staging checks; its immutable JSON/log supply the actual outcome rather than this prose predicting success. The executable fingerprint and prior application evidence stay unchanged.

## Independent audit — 2026-10-15 UTC

Change CHG-20261015-005 (Claude Code agent, Director request), branch `claude/play-04-audit` from Codex commit 24d3990. The Director asked for a deeper review of rules parity and exact implementation accuracy. Every run below passed at Codex's final executable fingerprint a41c1374 with exact timing, no clock discontinuity and 0 redactions. Codex's records above are unchanged.

### Runs

- RUN-20261015-094: full `pnpm verify:foundation` (138,381 ms): 350 project checks (326 Node + 24 Python), 406 upstream passes/1 inherited skip/1,362 expectations, 2 injection tests.
- RUN095 rules-parity probe (Bun, compiled bridge plus raw upstream sources; synthetic logical time).
  - Bridge versus unchanged upstream. 24 complete games and 5,012 commands (918 accepted, 4,094 deliberately or naturally refused across 12 engine codes) ran through three engines at once: the compiled timed bridge, a raw `MatchRuntime` built exactly as the bridge builds it but called directly, and the compiled untimed bridge. After every accepted command the full timed state, clock included, equals raw upstream byte for byte (918 of 918). After a refused command, rules state, events and legal moves are equal. Only the clock bookkeeping can differ, because raw upstream settles elapsed time before validating while the bridge validates first. That difference is time-neutral: every one of the 587 pending differences converged exactly at the next accepted command.
  - Timed versus untimed. After all 5,012 commands, game state apart from `ctx.time`, published events (5,012 comparisons) and both players' legal moves (10,024 comparisons) are identical. Ink, inkwell, readying, lore, turn order and endings do not depend on the clock. Games ended by deck-out (16) and concession (8).
  - Native arithmetic. 168 passes by an exhausted player each restore exactly 125,000 ms (60 s reset + 5 s action + 60 s pass); every ordinary pass equals remaining + 65,000 ms capped at 150,000 ms. One millisecond before exhaustion a pass gives 65,001 ms with no timeout count; exactly at zero and far past zero both give 125,000 ms. An exhausted player's non-pass action keeps them on the clock at −5,000 ms. The chooser is charged only for their own decision. Passing is flow-disallowed during the first-player choice and mulligans.
  - Controls. A pause excludes the paused interval and leaves rules state, events and the state version unchanged. While paused the bridge refuses moves with `CLOCK_PAUSED`; raw upstream would accept the move and silently restart the clock, so this is a deliberate project rule matching the durable pause. Backward controls are refused. A reset requires a paused clock, does not count as a timeout and clears exhaustion, so the next pass is ordinary.
- RUN096 service probe (actual PostgreSQL test database and engine worker; injected simulated UTC with matching monotonic time; native default values, unlike Codex's zero-bonus storage fixtures).
  - An independent model of charge, hand-off reset and bonuses matches every committed step. It checks both players' displayed remaining time, the deadline, the server sample, the stored allowances and the stored anchor through creation, the first-player choice, both mulligans, an accepted ink and refusals.
  - The player's own refused move earns nothing, keeps the original anchor and advances the clock revision by two. A move from the waiting opponent is refused and leaves the active player's deadline unchanged. At deadline − 1 ms a move is still admitted and 1 ms is displayed. At the exact deadline the move is refused `clock_expired`, and the retry returns the same receipt. Two concurrent sweeps commit exactly one system pass under a `system-clock` identity, after which the timed-out player holds 125,000 ms.
  - Opening timeout pauses with `no_legal_default` at state version 0 with exactly 150 s charged, and paused moves are refused. A forged auditor is refused, as are a stale resume and a changed reuse of an operation ID; an identical retry returns the original result. Resuming without a reset reopens at zero, and the next sweep pauses again. Resuming with a 30 s reset then a choice after 5 s leaves 30,000 ms.
  - With no runner for 40 s, the only owner quarantines itself and the stored clock stays `running`. A second, healthy process pauses at the last healthy point; audited resume charges the 20 s healthy interval but not the 40 s outage.
- RUN097 boundary probe. Six browser/public owners refuse 480 imports of server clock code, storage, health, fixtures and server packages. 50 browser files contain none of 26 clock, storage, audit or notification markers. The match client still depends only on the contracts, and the Lab source has no clock control. Both notification calls carry only the match ID. Ordinary startup source is unchanged: it has no ticket, play, login or clock route and still negotiates diagnostic protocol 1 for `{1,2}` and `{1,3}` offers. Upstream sources, lock, provenance, patches, selection, Lab, viewer and player-move contracts are unchanged; only the bridge's three files differ (kernel sha256 a3d93ec9…). The public clock contract refuses 13 private engine or storage fields, illegal status combinations and unqualified policies, and clients cannot send clock material. Migrations 0001–0004 are byte-identical. 0005 only widens three checks (protocol 1–3, ticket protocol 2–3, the added `clock_expired` reason) and adds two tables plus an index; both databases record all five migrations, and only the match role can use any match table.
- RUN098: Codex's database suites: role health on both databases, `db:test` 5, storage contract 3, match/clock/gateway/process integration 58 (66 total), `db:check`.
- RUN099: Codex's Chromium suites with one worker: 10 checks, including both chooser seats of the clock client, plus 2 Lab Web Worker checks.

### Findings

1. **Important: the waiting opponent can cost the active player time and connection.** `clock-service.ts:85-93` takes the timed reservation, which sets the stored clock to `processing`, before checking whether the sender is the active player. A refused command from the opponent therefore holds the clock for its reservation, proof check and refusal (about 0.2 s when the proof is cold). An active player's move arriving in that window gets `busy`, which `clock-service.ts:89` turns into `UNAVAILABLE`. `live-connection.ts:58-62` answers that with a maintenance receipt and closes the active player's socket (1012). The client reconnects with growing backoff (250 ms doubling to 5 s) and stops after 8 failed attempts (`match-client/src/index.ts:42`). The anchor is unchanged, so all of this time is charged to the active player. RUN096 reproduces the service part: status `processing` during the opponent's command, the active player's move throws `UNAVAILABLE`, and the anchor and deadline are unchanged afterwards. This is a time and disconnect abuse path against the PLAY-04 backlog acceptance ("no disconnect/time abuse") and R29.007. Suggested fix: refuse a non-active participant's non-concession command inside the reservation transaction without changing clock status, using the stored and verified active player. Answer `busy` with a retryable receipt instead of closing the socket. Add a regression covering both.
2. **Minor: the waiting opponent's concession is refused as `clock_expired`.** Between the active player's deadline and the committed timeout pass (normally under one runner interval), `clock-store.ts:87` gives any command, including the opponent's always-legal concession, a permanent `rejected/clock_expired` receipt, although the opponent's own clock has not expired. RUN096 reproduces it. The player must resend with a new command ID.
3. **Latent, real-card gate: the active-player pre-check does not mirror every engine move.** The engine lets a non-priority player resolve a triggered ability they must choose for (`resolveBag` direct chooser, `resolve-bag.ts:593-599` and its `available` rule), and charges the clock to the priority holder meanwhile. `clock-service.ts:93` refuses such a move before the engine sees it. Synthetic cards have no abilities, so this cannot happen in the qualified scope. It must be reconciled before real cards with bag choices are admitted.

### Director policy points (behaviour matches the approved native design; listed so they are decided knowingly)

- A timeout pass can end the game against the timed-out player. The engine applies CR 3.4.2: ending your turn with an empty deck loses (`pass-turn.ts:630-637`). RUN095 saw 16 such endings from exhausted passes. Codex ruling 6 accepted natural outcomes; this one is in practice a loss caused by running out of time.
- Running out of time can leave a player better off than passing. An exhausted player's pass restores 125 s, while passing with 1 s left gives 66 s. With no loss for repeated timeouts, a player can use about 125–150 s every turn. Launch values are unselected, so this can be tuned (for example a smaller reset).
- Opening timeouts always pause: the first-player choice and every mulligan. Resuming needs an explicit time reset or it pauses again at once, and no operator tool exists yet. "Keep current hand" could qualify as a defined no-choice default if the Director wants one.
- A process whose own health check fails stops adjudicating and does not pause games itself. Causes include any stall over 15 s, or a single sweep that runs over 15 s because health is sampled only at sweep start. On the planned single host, every timed game would then wait for a restart plus an audited resume. Load and operations qualification must cover this.

### Housekeeping

The test database still holds one timed fixture match (`clock-process-…`, created 2026-10-15T06:41:12Z, status `running`) left by the interrupted RUN050. It is test data and was not removed. The 31 expired quota rows noted in the PLAY-03 audit remain.

### Verdict

Rules parity is correct. The clock is an outer layer: the game itself is byte-identical to the unchanged engine, and timed and untimed games follow identical rules. Timing arithmetic, deadlines, timeout, recovery and outage exclusion are exact in every probed case, and all of Codex's reported counts are reproduced. Finding 1, however, leaves the backlog's "no disconnect/time abuse" criterion not fully met. A small fix plus regression is recommended before PLAY-04 is accepted. Whether to integrate into main now, with finding 1 as a must-fix follow-up, or after the fix is the Director's decision. Main was not changed when this audit was recorded.

Local isolated CI was not rerun: receipts show the wall clock gaining 1.3–1.7 ms per second against monotonic, about 0.5–0.7 s over the pipeline, near the unchanged 1 s guard. Hosted Foundation qualification runs on the published audit branch; its run ID is recorded in a later change.

## Director decision and hosted audit-branch run — 2026-10-15 UTC

Recorded 2026-10-15T17:35:31.544Z (CHG-20261015-006). The Director chose to fix finding 1 before integration, rather than merge now with a follow-up; main stays at 775994a. RUN-20261015-101 observes public GitHub metadata for Foundation run [38776275959](https://github.com/chroniicallydiistracted/lorcana-online-tcg/actions/runs/38776275959): attempt 1, workflow_dispatch on `claude/play-04-audit` at 926846d, job `foundation` success 17:18:50–17:31:10Z, every step successful. Logs and artifacts were not downloaded, so this is metadata, not a fresh hosted test count. Next: a fix change for findings 1 and 2 with regressions and fresh affected suites, then re-audit, publication and main integration. The four policy points remain open for the Director.

## Audit fixes — 2026-10-15 UTC

CHG-20261015-007 implements the Director's four requested fix steps on `codex/play-04-audit-fixes`, based on audited3753069. Main remains775994a. The preceding a41c1374 proof, independent findings and hosted38776275959 are preserved historical checkpoints; they do not qualify the repaired source. Re-audit and fresh hosted CI remain Director actions.

Admission now refuses a waiting participant's non-concession command inside the short authoritative transaction, before any timed lease, clock mutation or engine proof/transition. It writes an idempotent invalid_intent receipt only. It rereads current state under the existing match→clock locks, so short SQL locking remains; no lock is held for engine computation. A concurrent active reservation stays intact. The move name is supplied by the trusted service's validated Submission, alongside its canonical durable intent; this is an internal repository interface, not a new client-controlled authority.

A waiting participant may concede before, exactly at, or briefly after the active participant's deadline, before timeout admission. Version, active reservation, unhealthy time, recovery pause, lease and engine checks still apply. The active player's own exact-deadline commands remain clock_expired. A competing automatic pass still serializes under the same fence; expired owners cannot be revived, and a stale concession must be reconsidered against the new state. This adds no grace, clock bonus, timeout choice or forfeit policy.

Only a live reservation conflict becomes internal MatchServiceError BUSY. The gateway reuses the existing closed live2/3 `rate_limited`/`rate_limit` receipt with100ms retryAfterMs: no new wire variant, maintenance control, durable command receipt, socket closure or changed client implementation. The client retries the same pending bytes/ID on its existing socket with the existing bounded retry/quota behavior. Genuine unavailable, unhealthy, corrupt or incompatible state still follows the existing maintenance/fail-closed path. Persistent overload is not qualified by this brief-contention fix.

Tests reproduce: no waiting-command proof work/clock revision/events, even alongside an active reservation; waiting concessions at0/1000/1001ms; exact-deadline reference concession and idempotency; BUSY without a durable receipt; actual PostgreSQL plus WebSocket retry on the same connection and ID with one final receipt/journal/outbox effect; Chromium with native cookies, actual gateway and held database reservation, one socket and same pending ID. Injected UTC cases are simulated time over actual storage, not host-clock qualification.

| Run | Outcome and exact scope |
|---|---|
|103|Pass unchanged intake doctor/static/bootstrap/original DB.|
|104|Expected RED:1pass/6fail. Five failures reproduce actor/deadline defects; busy test initially used an old fixture-engine revision and failed stale before reaching contention. No repair inferred.|
|105|Expected RED actual WebSocket: maintenance instead of same-connection retry.|
|106|Corrected busy fixture RED: UNAVAILABLE instead of BUSY.|
|107|Expected RED actual Chromium: no same-socket retry receipt.|
|108|21pass/5fail: actor/busy repairs work, but moving the shared version check changed timeout busy/dead-lease ordering. Existing and new regressions catch this; no acceptance.|
|109|26clock/database/live checks, web types and scoped strict lint pass after restoring timeout reservation ordering. A subsequent test-only cleanup sequences three queries on one PG client; final-source proof follows below.|

No dependencies, package manifests, public schemas, engine bridge/runtime/rules, Lab, applied SQL, host settings or production choices change. The latent non-priority real-card resolveBag chooser and four audit policy points remain separate and gated; this task does not settle them. Original credentials and database volume/data remain; cleanup targets only fixtures created by these tests. The earlier interrupted fixture and expired quota rows are not removed.

### Final repaired-source proof

Recorded 2026-10-15T19:02:29.111Z. Passing receipts110/111/112/114 share executable/config/test/schema fingerprint `0249c5a5269b879224b4c6125a95147051aea7bdf556fa5da62b00e59808eaff`, valid paired UTC/monotonic samples, exit0 and no redactions. Failed113 is retained separately below. This does not qualify absolute UTC accuracy or a permanent host fix.

| Run | Category | Result and limits |
|---|---|---|
|110|container|Both local/test role-health sets;5DB integration+3storage contract+66match/service/live/process tests=74. Includes actual PostgreSQL and independent process races/deaths; designated UTC scenarios use injected simulated time. Original bootstrap connection passes.|
|111|headless_browser|All11Linux Chromium foundation/live/clock tests, including both chooser seats and new actual-cookie/socket/DB-contention regression;2Lab Web Workers. Software WebGL, not a Windows/device observation.|
|112|container|Frozen offline install, doctor, verify/docs, types, strict lint, builds,350project checks (326Node+24Python),406upstream passes/1inherited skip,2injection and original bootstrap DB. No test removed.|
|113|container|Failed packaging assertion: the broad preservation query counted an intentionally updated engine-adapter README as runtime drift. App tests were not rerun or changed; the failure is retained.|
|114|container|Corrected preservation distinguishes current documentation from runtime: exact four runtime/four test file delta, matching110/111/112source, original ignored0600private bytes, engine/SQL/dependencies/public schemas/client/decisions/requirements/archive/main unchanged,727existing log digests, current source/log secret scan and no owned app/test children or5173/3001/3002listeners.|

CHG007 is finalized for this local repair scope, not Director acceptance. Its cumulative inventory is based on main775994a, while3753069 is the precise fix-only review base. RUN115 is the final documentation/changelog/callable inventory, source-secret, staged-byte and cumulative-coverage packaging record; its immutable JSON/log supply the executed outcome. No self-referencing advance passing claim or amended sealed record is used. No fresh source-only clean checkout, long isolated pipeline, fix-source hosted CI, promoted artifact, Windows/device/load/production or required-check settings qualification is claimed. Earlier clean/audit/hosted proofs remain explicitly source-specific.

The Director will re-check the fix and run hosted CI before merging. All nine requested regression cases pass through their owning suites (eight database/service/live cases and one Chromium case); the original two audit findings are repaired, pending that re-audit. No fresh independent reviewer or final integration approval is implied. The separate real-card chooser finding and four policy points remain open with the existing approved behavior unchanged.

## Independent fix re-audit — 2026-10-15 UTC

Recorded 2026-10-15T22:47:28.281Z (CHG-20261015-008) by the Claude Code agent (architect/QA reviewer role) on Director request. Source: `codex/play-04-audit-fixes` at bcaee09, fingerprint `0249c5a5269b879224b4c6125a95147051aea7bdf556fa5da62b00e59808eaff`. Fix-only base 3753069; main is unchanged at 775994a. All runs below are at that fingerprint with exact timing, no clock discontinuity and no redactions.

### Verdict

Both audit findings are repaired as described. A narrower form of finding 1 remains (R1 below). During the opening, a waiting player's ordinary concession still takes the timed reservation, because the engine refuses every concession until the main game starts. The waiting player can repeat it with the stock client. The active player's opening decision then gets busy replies, and the stock client stops after 8 of them (about 2 s) while the opening clock keeps running. PLAY-04 still does not meet "no disconnect/time abuse" until R1 is fixed or the Director accepts it.

### Confirmed

- **Rules and engine unchanged.** The vendored engine, the three bridge files, kernel sha256 `a3d93ec9…`, migrations 0001–0005, public schemas and the match client are byte-identical to the audited source (RUN120 and `git diff 3753069 bcaee09`). The RUN095 rules-parity results therefore still apply.
- **Finding 1 repaired.** A waiting player's non-concession command gets a durable `invalid_intent` receipt. It causes no engine work, no clock revision and no clock event. Over 8 turns, each with 3 waiting commands sent alongside the active player's pass (24 in total), every pass was accepted. After each turn the clock matched the independent model exactly (RUN117 A).
- **Busy contention.** While a reservation is held, the active player's command gets `BUSY` with no durable receipt, and the identical retry with the same command ID is accepted (RUN117 C). Through the real gateway the socket stays open and no maintenance receipt is sent (RUN118).
- **Finding 2 repaired.** At the exact deadline, the waiting player's non-concession move is refused (`invalid_intent`) and the clock is unchanged. The active player's own concession is still `clock_expired`, as documented. The waiting player's concession is accepted and the active player wins. Two concurrent sweeps then commit no timeout, and the retry returns the same receipt. Three seconds past the deadline, before any sweep, the waiting concession is also accepted with no timeout pass (RUN117 B).
- **Codex's counts reproduce.**
  - RUN116: 350 project checks (326 Node + 24 Python); upstream 406 passed, 1 skipped, 1,362 expectations; 2 injection tests.
  - RUN121: 74 database checks (5 + 3 + 66), with role health on both targets and `db:check`.
  - RUN122: 11 Chromium checks and 2 Lab workers.

### Finding R1 — Important (residual of finding 1)

**Cause.** Every waiting concession is exempt from the early refusal (`packages/db/src/clock-store.ts:82`) and from the deadline check (`clock-store.ts:94-95`). In the opening, the upstream flow allows only `chooseWhoGoesFirst` or `alterHand`, plus `forfeitGame` (`runtime-flow-config.ts:42,61`). So the engine refuses every concession there. Each refused concession still takes the timed reservation, runs the engine and is rolled back.

**Evidence.**
- **Service level (RUN117 C).** 20 opening concessions were all rejected `invalid_intent`. Each one added 2 clock revisions and 2 clock events, and each call took 167–187 ms (median 174). While one was in progress, the active player's genuine choice got `BUSY`. That step used an emulated 300 ms worker delay; natural holds are about 170 ms.
- **Client retry limit (RUN118).** The stock client counts each busy reply against its 8-attempt limit (`packages/match-client/src/index.ts:54`). It retries after 100 ms plus up to 250 ms of jitter. While an opening concession held the reservation, the active client closed itself after 8 busy replies in 1.8 s, without opening a new socket.
- **Realistic use (RUN119).** The waiting player pressed concede repeatedly with the stock client during each opening step: 18 steps across 8 matches, using the real gateway, database and time.
  - 15 of the 18 steps produced busy replies (91 in total).
  - The active client closed itself in 6 of the 8 matches.
  - The longest wait before acceptance or closure was 2.2 s.
  - 150 refused concessions were written.

**Effect.** The active player cannot make the opening decision, and their client stops while their opening clock keeps running. When that clock runs out, the match pauses (`no_legal_default`) and needs an audited resume. No win or loss results. In the main game a concession is always legal and ends the game. So R1 is limited to the three opening decisions (first-player choice and the two mulligans).

**Suggested fix.** A waiting player's command should never hold the timed reservation. For example, evaluate a waiting concession without the lease. If the engine refuses it, write the refusal receipt without touching the clock. If it accepts, commit it in one short fenced transaction that requires an unchanged state version and clock revision, otherwise returning stale. Separately, consider not counting server-busy retries toward the client's 8-attempt limit, or making that limit cover at least the 15 s lease. On its own that would not stop the opening clock from running.

### Observations

- Each refused opening concession writes one receipt and two clock events, so one waiting player can write about 11 clock events per second at the measured speed (up to 16 within the 8-command quota). Fixing R1 removes this.
- Players cannot concede during the opening at all: the live contract offers `concede`, but there the engine accepts only `forfeitGame`. Whether a player may leave during the opening is a product question for the Director.
- Finding 3 (the real-card chooser) now also exists in the store. The early refusal compares against `clock.activePlayerId`, so a waiting player's real-card `resolveBag` choice would be refused there as well as in the service. It is still unreachable with synthetic cards. The four Director policy points remain open.
- Not run: local isolated CI (wall clock still drifts against monotonic), hosted CI on the fix source (follows publication), and Windows, device, load or production checks.

### Runs

| Run | Category | Result |
|---|---|---|
|RUN-20261015-116|container|`verify:foundation` passed, 137,303 ms: counts above.|
|RUN-20261015-117|simulated|Service probe on the real test database and engine with injected UTC: sections A (finding 1), B (finding 2) and C (R1).|
|RUN-20261015-118|container|Real gateway, database and time: held opening concession; the stock client closes after 8 busy replies in 1.8 s.|
|RUN-20261015-119|container|Real gateway: repeated stock-client concessions in the opening across 8 matches; 6 active clients closed.|
|RUN-20261015-120|container|Boundary probe: 480 browser imports refused; NOTIFY carries the match ID only; no play, login or clock route at startup; bridge, kernel, public clock fields and migrations unchanged.|
|RUN-20261015-121|container|Role health on both targets, `db:test`, storage and match integration (74 checks), `db:check`.|
|RUN-20261015-122|headless_browser|11 Linux Chromium checks and 2 Lab workers.|
|RUN-20261015-123|static|`docs:check` over this re-audit.|

## Hosted fix-source run and Director decision — 2026-10-16 UTC

Recorded 2026-10-16T01:30:42.756Z (CHG-20261016-001).

### Hosted run

Foundation run 38820071834 on `claude/play-04-fix-audit` at 6062820 (attempt 1, workflow_dispatch) **failed**. Its job ran from 2026-10-15T22:53:04Z to 22:59:12Z. The step "Run the same isolated local pipeline" failed and the later evidence step was skipped (RUN125, public metadata). To diagnose it, the failed step's output was viewed with `gh run view --log-failed`. That output was not saved to the repository, and no artifacts were downloaded. The web type check reported `tests/clock-client.spec.ts(9,34): error TS2307: Cannot find module '../../match-service/dist/validation.js'`.

### Finding R2 — Important (blocks merge)

**Cause.** Codex's new Chromium regression imports app build output: `apps/web/tests/clock-client.spec.ts:9` imports `../../match-service/dist/validation.js`. The root `typecheck` script builds only `packages/**` and the engine before type-checking every workspace (`package.json:20`). So on a fresh checkout, `apps/match-service/dist` does not exist yet and the web type check fails. The `packages/db/dist` import on line 10 resolves, because packages are built first.

**Why local runs passed.** Local suites, including Codex's RUN112 and this re-audit's RUN116, passed because earlier builds had left `apps/match-service/dist` in place. Codex's record states that no fresh source-only checkout was run.

**Reproduction.** RUN124 sets that folder aside, runs `pnpm typecheck` and gets the same error (exit 2), then restores the folder. It is an expected failure, preserved as recorded.

**Suggested fix.** Remove the web test's dependency on app build output, for example by following the file's existing test-fixture import pattern. Then confirm with a fresh-checkout type check or hosted CI before handing over.

### Director decision

The Director chose to fix both problems in one small Codex round: R2 (the CI import) and R1 (a waiting player's opening concession takes the timed reservation), with an opening-phase regression test. After that, this reviewer re-checks the fix, runs hosted CI, then publishes and fast-forwards main. Main stays at 775994a until then.

| Run | Category | Result |
|---|---|---|
|RUN-20261015-124|container|Expected failure: local reproduction of the hosted web type-check error (exit 2); the build folder was restored.|
|RUN-20261015-125|container|Failed as observed: public metadata for hosted run 38820071834 (conclusion failure).|
|RUN-20261016-001|static|`docs:check` over this record.|
