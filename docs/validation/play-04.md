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
