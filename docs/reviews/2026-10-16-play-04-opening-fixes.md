# PLAY-04 opening repair source review

Recorded 2026-10-16T04:08:37.973Z. Fresh-context reviewer `/root/review_opening_fix` inspected the dirty runtime/test changes against33e9a7a and the relevant audit/operating contracts. Scope is residual R1/R2 only. The review was read-only; no tests, builds, services, database operations or files were changed by the reviewer.

Verdict: no critical or important findings. Waiting evaluation holds neither SQL locks nor a timed reservation during proof/transition work. Final commit rereads under match→clock locks, checks duplicate identity, snapshot/version/health/age and reservation absence, and records stale on concurrent adjudication state changes. Terminal game/clock writes remain atomic and ordinary bare commits remain refused. The web TypeScript test no longer imports unbuilt application output; existing Node fixture ownership is retained.

Optional coverage suggestion: isolate a heartbeat that advances only `lastHealthyUtcMs` between evaluation and successful terminal commit. This is not a correctness finding or deferred blocker: health progress is deliberately exempt from exact snapshot comparison while all adjudication fields remain fixed. No additional test is added for this optional variant; current race/health/storage/live/browser checks remain required.

This scoped repair review is separate from the earlier full PLAY-04 review and the Director's forthcoming re-audit. Author verification is recorded in [validation](../validation/play-04.md#opening-concession-and-clean-typecheck-repairs--2026-10-16-utc); source review alone establishes no execution, device, hosted or production acceptance.
