# Upstream engine refresh qualification

Recorded at: 2026-10-13T05:53:26.668Z; display timezone America/Phoenix. Actor: Codex architect/developer/source reviewer. Authority: Director requests full upstream review and relevant incorporation before PLAY-01. Intake clean main `a45ac4b3794192d560ab7edca23c4b23a27cc9c2`; branch `codex/upstream-engine-review`. Final executable fingerprint: `4ba45cc4ddaf904fe0d3b433ef7884dba981b0dcc10744bd0327e6a7d28a8b0c`.

## Source identity and scope

The sole new commit after retained53a79413 is `6de59de1c203827edc1bc6faa1bc6184cd126a5f` (Public sync2026-W41, #232, author/committer 2026-10-09T17:52:00Z). A complete inert clone, full history/tree comparison and51,113 raw Git blob checks cover the whole repository, including unrelated game directories. The before-tree has48,272 paths. Git reports10,871 rename-aware changes; the per-path inventory represents11,012 distinct old/new paths with renames as delete/add. These denominators differ intentionally. There is no .gitmodules/gitlink; Lorcana is an ordinary subtree, tree3c901f13b89337917121089de891d301832f7a54.

[Complete review](../rules/2026-10-13-upstream-review.json) records every change disposition; [dated inventory](../rules/2026-10-13-upstream-inventory.json) inventories3,374 literal card-definition objects,3,565 test files,13,393 static declarations,50 explicit skips and524 todos in the scoped Lorcana package blobs. Set014 has207 definitions. Static declarations and source presence are not executions or certification. Zero official cards are admitted/imported. The RUN024 artifacts captured a56-patch checkpoint; current ledger has59. Preserve those historical artifact bytes.

Selected current vendor:361 files/308 runtime source-type-data/37 original test files/59 reproduced patches.128 current-selected paths changed upstream. Relevant changes include end-turn checks/expiry, zone indices, bag limited-use/lifetime semantics, last-known Support, structured choices/private logs, ink-drop events/metrics/costs and shared dependencies. Other games, root upstream tooling/UI and outside-closure engine/card code remain reference inventory. No dependency, toolchain, lockfile or container pin changed. See [ADR0012](../adr/0012-upstream-kernel-refresh.md) for alternatives and compatibility decisions.

## Implementation and regression behavior

Native state/root input is inkDrops; nested effectInkDropCounters remains success-ordered. The planner validates own safe pools/claims, reserves mandatory counters, prevents reuse, preserves cards-first defaults and reports real consumption. Legacy generation enters the same native event/metric/replacement resolver after strict validation. Standard cost increases match execution/validation; predicates see actual paid counters. Source-entry lifetimes, effective aura/suppression/replacement conditions and derived quest/challenge projections agree with transitions. Permanent static Adventurous loss no longer forces a quest before passing. SCN092..120 add29 sourced regressions/positive controls to the retained91; the complete suite has120 scenarios/128 Node rules checks. Fixtures remain synthetic, invariant-checked and test-only.

## Executed evidence and failures

All RUN-20261013-014..035 receipts/logs are preserved under the native schema with actual timestamps and fingerprints.014 passes the unchanged-container baseline;015 acquires the inert clone.016..018 are intentional red regressions.019..021 preserve reconciliation/payment/original-suite failures.022 passes the selected406 upstream checks/one inherited skip at that checkpoint.023 fails the initial source-audit path check;024 passes the corrected full-tree/AST/public metadata audit.025..028 preserve fixture characterization and discriminating native event/payment/lifetime/effective-keyword failures;029 passes108 scenarios.030 exposes projection restrictions while its overflow/reservation controls pass.031 completes114 scenarios and406 upstream checks but its receipt fails clock_changed;032 independently repeats the clock rejection, both child exit0.033 passes the short unchanged upstream stage at its checkpoint.034 captures cost-increase/complete-state/alias replacement failures.035 passes final120 scenarios/128 checks with valid timing and no skips. Source-specific intermediate passes do not qualify later edits.

RUN024 freshly observes GitHub run38329018576: completed/success for maina45ac4b, started2026-10-13T00:48:00Z, updated00:53:41Z. It corroborates the Director's merged RULE-04 result, not hosted execution of this new branch. Raw public-response digests/acquisition times are in the review artifact; no authenticated account mutation occurred.

Independent read-only reviewer inspected the raw source range, reconciled branches and final regressions; all reported source blockers were corrected. Final recheck verifies RUN035's digest/timing/source and reports no remaining bounded source blockers. Reviewer did not execute the final full suite independently. Fresh full/build/browser/clean/canonical/closure evidence will be appended below after execution.

## Limits and next task

The unchanged environment clock can invalidate long receipts; no clock/guard/restart repair or known futile isolated CI retry. Preserve rejection history. Existing restricted databases/private0600 files/data are preserved. Fresh whole-pipeline/image/artifact/persistence/hosted refresh qualification, Windows/touch/GPU/production, whole-rules/per-card certification/D04 catalog, AUTH and replay recipient delivery remain separate. All admission gates stay closed; neither October16 CR2.3 nor October23 set14 dates activate cards. BOOT-04/$25/D07, D10/D11 and548 requirements/33 groups/20 optional flags are unchanged.

PLAY-01 remains pending. Its first requirement is a server move allowlist refusing every upstream manual/debug move (including manualSetLore/manualSetInkDrops), with equivalent Lab refusal, then durable command receipts/journal/outbox and CAS. This refresh fixes the reported Adventurous-loss edge but does not solve debug authority or wire privacy. Follow the [handoff](../HANDOFF.md) and owning engine/rules runbooks.

## Final-source execution checkpoint

All rows below bind fingerprint4ba45cc4; clocks/guard/environment were unchanged. Executed output is preserved, and a clock-rejected childexit0 remains a failed receipt.

| Run | Receipt | Executed scope |
|---|---|---|
| RUN036 | passed, exact | Current59-patch reproduction, AST entropy guard, official source/leaf bytes;406 original upstream passes/one inherited skip/1362 expectations;2 owned injection checks |
| RUN037 | failed, clock_changed; childexit0 | Frozen install, doctor, complete verify/types/lint/build/test and original PG baseline;270 project checks=246 Node+24 Python, plus406 upstream/one skip/2 injection. Wall elapsed96,055ms vs monotonic92,852ms; no valid whole-run timing acceptance |
| RUN038 | failed, clock_changed; childexit0 | Actual Linux Chromium6 web cases and2 built workers pass; raw wall20,489ms vs monotonic19,432ms. Software/headless browser only, no Windows/GPU/device claim |
| RUN039 | failed, clock_changed; childexit0 | Separate frozen install, doctor/type/lint/build complete. No promoted timing acceptance |
| RUN040 | passed, exact |10 actual private replay/Lab/bundle checks. Three requested adapter filenames were absent and Node ignored those operands; this does not execute the separate random-method file. RUN043 explicitly enumerates all actual adapter files |
| RUN041 | passed, exact | Read-only eight managed identities; ignored0600 private files, full-history/current secret scan1894 unique blobs,419 log digests, original548/33/20/Director decisions/lock/toolchain/archive and no owned listeners/services |
| RUN042 | failed, clock_changed; childexit0 |95 complete adapter/Lab/foundation/documentation/CI/inventory/tooling assertions pass. Timing failed; no automatic whole-feature promotion |
| RUN043 | passed, exact | Complete actual identity/node/random/replay/Lab test files, including secure random maths/stream bounds and private deterministic reconstruction |

[Host preservation](upstream-engine-review-host-preservation.json) is a separate read-only WSL Docker observation: discovered existing project, original Linux bind, healthy private PostgreSQL volume and no published DB port. It has an observation timestamp, not fabricated execution timing. No data/credential/container mutation.

Current F-ENGINE and representative F-RULE-CERTIFICATION have bounded passing source-matched receipts. Other implemented feature acceptance retains historical qualification because the full current-source timing receipts failed. All executed assertions above pass, but automatic complete local timing qualification remains pending. Current branch hosted CI/image/artifact/persistence acceptance is unperformed; maina45ac4b success does not cover this source. A canonical staged clean-copy check is the remaining final source proof, recorded separately below. No known futile isolated CI retry is performed.

## Canonical closure

RUN044 executes a canonical staged Git archive (tree e2c090ef5cf11e22cb565fa9acead2636257daa4):1,603 archived files equal the live bytes, final executable fingerprint4ba45cc4, no private credentials/Git/dependencies/build inputs copied. Frozen install and complete foundation assertions pass with270 project checks/406 upstream passes/one inherited skip/2 injection; temporary source cleanup passes. Its receipt is failed clock_changed despite childexit0 (raw wall82,881ms vs monotonic80,710ms). This is actual clean/canonical functional evidence with pending timing qualification, not a passing whole-run receipt. Later documentation/receipt sealing does not change executable bytes; the canonical tree is a dated checkpoint, not a claimed final commit SHA.

RUN045 freshly checks public upstream main still equals6de59de1, then repeats final current/full-history/private/log/scope/listener preservation. Read its receipt for exact outcome. No new source changes or retries of the full/isolated pipeline occurred. The final native documentation gate and staged diff are checked before the local review commit. Code/source-refresh scope is complete and reviewable; full timing-qualified and hosted current-source acceptance remains pending under the unchanged environment. PLAY-01 stays pending until assigned, with the explicit server/Lab debug-move gate first.

## Documentation and local review closure

Recorded at: 2026-10-13T06:19:31.344Z. RUN045 passes with exact timing: upstream main still6de59de1 and final private/current/full-history/log/scope/listener checks pass (423 captured prior log digests). RUN046 passes the final native documentation coverage/fingerprint/callable/link/changelog/evidence gate with exact timing at the same final executable fingerprint. Documentation sealing changes prose/views only; native synchronization checks the finalized status and complete file coverage again before commit. Formatting/staged diff checks exclude captured-log whitespace and preserve raw digests.

Completed scope: reviewed/reconciled bounded source update, permanent Adventurous-loss and native compatibility corrections, synthetic/regression/source/clean functional proofs, explicit timed failure preservation and universal documentation/local review commit preparation. Unperformed/pending scope: current-source hosted CI/artifact, successful long local full/isolated timing, production/device/full-card/ordinary game/authority/durability/privacy/recipient delivery. No implicit PLAY-01 or product acceptance. Branch codex/upstream-engine-review; identify the resulting local commit through Git. No publication/main integration is included.
