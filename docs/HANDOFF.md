# Developer handoff

Observed at: 2026-10-14T20:19:44Z; display timezone America/Phoenix. Actors:
- Codex architect/developer/QA collaborator: PLAY-02 implementation (CHG-20261014-004, commit 780c26e) on top of the unpublished clock-documentation commits e36d223/3983e1c (CHG-20261014-001..003).
- Claude Code agent: independent audit and Director-requested publication/integration (CHG-20261014-005).

Active change: CHG-20261014-005 on branch `claude/play-02-audit`. CHG001..004 are finalized.

- Objective/authority: the Director requested an independent PLAY-02 audit following the same process as PLAY-01 (audit, publish, hosted CI, then main). The Director ended clock work. No clock/threshold/memory/pagefile/service change, spending or deployment is authorized or performed.
- Repository: `/home/andre/lorcana-online-tcg`; audit branch `claude/play-02-audit` from 780c26e; main remains 6e9acf1 until the authorized fast-forward. Codex's final executable fingerprint e3a9578be616125963591d956509c85eb2b2581912648baed88a62ad2c8d4d6b is unchanged by the audit (documentation and evidence only). Unowned provider screenshots and reference PNGs stay ignored; never stage them.
- Execution: workspace container 01ccec184b44, PostgreSQL c7cd58258c19, Compose project lorcana-online-tcg_devcontainer; rediscover IDs before resuming. Node 24.21.0, pnpm 10.33.0, Bun 1.4.2, node UID 1000; pinned Chromium is present. Private credential files, database data and the pg18_data volume are preserved. Heavy checks ran one at a time.
- Implemented by Codex (unchanged): closed synthetic viewer DTO and surface/diagnostic codecs; allowlisted projector with recipient-scoped reveals, anonymous ink backs and front-only metadata; revision-bound HMAC references with a current-reference resolver; private `inspect` bridge; projection-only workers; participant-only read-only committed `view`. No game ingress, auth, observer service, migration or upstream file/patch change. See [ADR0014](adr/0014-viewer-projection-privacy.md), [viewer contract](contracts/viewer.md), [operation](runbooks/viewer-privacy.md) and [validation](validation/play-02.md).
- Independent audit (CHG-20261014-005): every run passed at fingerprint e3a9578b with exact timing.
  - RUN-20261014-064: full foundation; 307 project checks (283 Node + 24 Python), 406 upstream passes with 1 skip, 2 injection tests.
  - RUN065: real-engine paired hidden worlds; 495 byte-identical comparisons, 369 positive controls, and reference-driven play across two complete games.
  - RUN066: live committed views; adapter equality per version, concurrency and race, request validation, FORBIDDEN/PIN_UNAVAILABLE, six forgeries, overflow, restart and terminal privacy.
  - RUN067: boundary, bundle and migration checks; 340 browser and 60 server imports refused, two-line vendor bridge, migrations and privileges unchanged.
  - RUN068: Codex's database suites (5 + 3 + 11, eight identities).
  - RUN069: Chromium, 7 scenarios plus 2 Lab workers.
  - The clock commits are documentation/evidence only; their decoded archives contain no personal or host identifiers or credentials.
  - Verdict: PLAY-02 acceptance is met for the two-player synthetic scope.
- Audit follow-ups (non-blocking):
  1. PLAY-03 accepts client commands only through current references; never expose raw-identity submit.
  2. Keep outcomes for references to the opponent's anonymous backs independent of hidden identity.
  3. Each view re-executes the transcript (about 0.2 s for a 16-version game); add per-version caching and request limits.
  4. Measure the 4,096-raw-event projection bound (about 7.2 events per synthetic move) on real-card matches.
  5. Recheck move-list noninterference and the conservative under-card/inkwell visibility defaults during card certification.
  6. Rename the Lab and lock-file `pending_PLAY-02` labels when that code next changes.
- CI: local isolated CI was not rerun. The clock stepped about 91 ms every 30 s during the audit, and RUN051 already shows the clock-guard rejection. Sequence: push the Codex and audit branches, dispatch hosted Foundation qualification on `claude/play-02-audit`, fast-forward main only after it passes, then observe the main push run. Record those hosted run IDs in the next change.
- Pending gates/next: PLAY-03 authenticated publication/reconnect/current-reference refresh, PLAY-04 clocks, AUTH/REPLAY D10 delivery, delayed/privileged observers, X01 (P056/two-seat schema), Sandbox operations for R04.009–R04.017, OPS-01 backup secrecy, real-card/rules certification, and device/performance/production acceptance. Ordinary/official/private/reward/card admission stays closed. Old branches are retained.
