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
