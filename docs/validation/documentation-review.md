# Documentation governance independent review

Recorded: 2026-10-06T19:26:40.879Z; exact change/run timestamps are canonical. Reviewer: separate Codex review agent, read-only, using the existing Dev Container and isolated temporary fixtures; no source edits or fixed-port binding. This is a review report, not a fabricated command-execution record.

## Reproductions and corrections

| Initial finding | Implemented correction and regression |
|---|---|
| Passing run could omit log or claim impossible event/source time | Captured log identity required; execution/recording order and future bounds, source reachability and exact Git event time checked |
| Deleting snapshot reset coverage/review history | Explicit first initialization only; existing snapshot must be restored; committed adoption cannot be reinitialized |
| Commit rewrite before validation bypassed HEAD-only sealing | Compare earliest non-draft history/evidence in HEAD ancestry; corrections append new records |
| New map could remove old impact edges | Snapshot retains map; old/new affected-document edges both require review |
| Misspelled impact source silently disabled future review | Impact source references must resolve |
| Fast-exiting leader left a descendant ignoring SIGTERM | Recorder awaits bounded process-group escalation; real grandchild regression proves stopped execution |
| Known secrets shorter than 8 characters were skipped | All nonempty named inherited secret values redacted; short-value regression |
| Broad --all history check broke unrelated branches | Sealing uses current HEAD ancestry; clean independent-branch regression |

The reviewer independently reproduced the original gaps even though the earlier 12 tests passed. New tests cover the previously missed conditions; retain this fact rather than treating initial green output as acceptance. Development failed/fixed attempt outputs are preserved as labeled imports, including the later fixture assertion mismatch that was corrected without weakening the guard.

## Earlier implementation rechecks

Independent reviewer reran all 20 governance tests successfully and checked documentation consistency, current source fingerprint, original scope preservation and pending device labels. Original 548 requirements, 30 prior backlog rows and 5 prior added-scope rows were unchanged; DOC-01/02 and X06/X07 were appended. Current code/format does not provide signed evidence, protect deliberately rewritten Git history, or automatically prove semantic truth; explicit review and future CI/attestation remain distinct.

Initial implementation closure is recorded in CHG-20261006-003 after the fresh clean-source application/governance, toolchain, database and Linux browser checks. No actual Windows, phone/tablet, GPU, persistence or production acceptance follows from review.

A later concurrent 21-test review run exposed an immediate /proc sampling race after SIGKILL. The failed attempt is retained; the descendant regression now waits a bounded 2 seconds for stopped/Z/ENOENT, still failing and cleaning the fixture if the descendant remains executable. Final source validation and independent isolated repetition recheck this condition; no failure is erased or counted as a pass.

The corrected descendant case passed three concurrent isolated reviewer repetitions. Both manual pending/future-time guards are implemented and covered; pre-clock-correction acceptance used matching-source RUN-012…015 receipts, subsequently superseded. The actual Windows observation remains pending, with no fabricated manual result.

Pre-clock-correction independent review: all 21 governance tests and documentation checks passed, honest manual/pending observations accepted, contradictions rejected, and no remaining important findings in this scope. Original 548 requirements / 20 optional flags, existing task/scope rows and 9 decisions were preserved. That review checkpoint was recorded at 2026-10-06T19:27:18.022Z.

Clock qualification follow-up: raw RUN017 showed a reversed UTC interval and was preserved byte-for-byte in validation/archive, with reported quarantine RUN018 and original log. The cause is unconfirmed. Monotonic duration/discontinuity guards now reject passing timing proof for such samples. Earlier RUN012–015 remain successful pre-correction checkpoints; current verified status requires fresh matching-source receipts in CHG-004. No Windows observation was performed.

Clock follow-up review identified and closed elapsed/sample/flag contradictions and omission of monotonic data for current-source acceptance. Actual RUN020 exposed /proc ESRCH during process reaping; the bounded cleanup regression treats ENOENT/ESRCH and stopped/dead states as non-executable, preserving other errors. Both real failures remain recorded; this is an OS lifetime condition, not evidence of a surviving process.

## Final clock-qualified review

Recorded at 2026-10-06T19:48:44.886Z; exact reviewer command execution times were not captured. The separate read-only reviewer reran all 22 governance tests and documentation consistency successfully, opened no ports and edited no project files. Independent temporary probes accepted consistent exact/monotonic evidence, rejected a false discontinuity flag and missing current-source timing pair, and accepted reversed raw samples only as failed/clock_discontinuous/clock_changed even with exit 0. Bounded monotonic descendant polling and ENOENT/ESRCH/Z/X stopped-state handling were reviewed. No important remaining findings in this scope.

Root-captured RUN-024…027 provide final matching-source clean application/governance, toolchain, read-only DB and Linux browser proof. Earlier checkpoints and actual failures remain preserved; this report does not fabricate reviewer execution times or Windows/device acceptance.

## Audited supervisor cleanup review

A later actual listener check (RUN-033) exposed Vite remaining executable in a deleted canonical-checkout directory after the suite exited0. The separate reviewer confirmed the owned PID/group and two races: canceling escalation on leader exit and deleting ownership before unexpected-exit cleanup. The correction retains groups until Linux /proc reports no executable members, shares overlapping cleanup promises, and handles already-exited leaders.

Independent real helper regressions both passed. A port-free synthetic integration using the actual supervisor/default12s grace also passed: supervisor exit1, all four reported owned processes stopped, empty stderr, monotonic elapsed12402ms. Exact UTC execution times were not captured; durable imported [RUN-920](runs/RUN-20261006-920.json) is historical/reported, never automatic full-source acceptance. Reviewed source SHA-256: dev.mjs0f6a930be0c65429d300a69c7c3ac62924717db9a3ff96363b016191a63fea41; process-groups.mjs5efdfbd68c3523406385fb2d9b47a735af3caae58495adb43fc453d8dee328e7. No important findings remain in this correction; fresh complete root execution is separately captured in CHG-005. Windows remains pending.
