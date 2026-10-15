# Developer handoff

Observed at: 2026-10-15T04:17:17.683Z; display timezone America/Phoenix. Actors:
- Codex architect/developer/QA collaborator: PLAY-03 implementation (CHG-20261014-006, commit 6f3b45e) and the append-only packaging correction (CHG-20261015-001, commit 743f0b2).
- Claude Code agent: independent audit and Director-requested publication/integration (CHG-20261015-002).

Active change: CHG-20261015-002 on branch `claude/play-03-audit`. CHG-20261014-006 and CHG-20261015-001 are finalized.

- Objective/authority: the Director requested an independent PLAY-03 audit, publication and merge following the PLAY-01/PLAY-02 process (audit, publish, hosted CI on the audit branch, then fast-forward main). AUTH-01 stays separate by Director decision. No clock/threshold/memory/pagefile/service change, spending or deployment is authorized or performed.
- Repository: `/home/andre/lorcana-online-tcg`; audit branch `claude/play-03-audit` from 743f0b2; main remains 6f2659e until the authorized fast-forward. Codex's final executable fingerprint 64bef2e3b6a8787b2ad388c30106960a635bdd7ba61ad3735d92454f7a8e8286 is unchanged by the audit (documentation and evidence only). Unowned provider screenshots and reference PNGs stay ignored; never stage them.
- Execution: workspace container 01ccec184b44, PostgreSQL c7cd58258c19, Compose project lorcana-online-tcg_devcontainer; rediscover IDs before resuming. Node 24.21.0, pnpm 10.33.0, Bun 1.4.2, node UID 1000; pinned Chromium is present. Private credential files, database data and the pg18_data volume are preserved. Heavy checks ran one at a time. Audit probes created and deleted only their own fixture matches and quota keys; no listeners or child processes remain.
- Implemented by Codex (unchanged): closed protocol 2 live schemas beside diagnostic protocol 1; optional `createMatchGateway` with injected `SessionAuthority`, exact Origins, hashed single-use tickets, shared PostgreSQL quotas, per-process socket bounds, heartbeat/drain; `submitRefs` with a separate durable intent namespace and worker-side reference resolution; exact-row projection cache; COMMIT-only NOTIFY hints with polling reconciliation; browser `@lorcana/match-client`; additive migration 0004. Ordinary startup registers no live route. See [ADR0015](adr/0015-live-synthetic-transport.md), [live contract](contracts/live.md), [operation](runbooks/live-matches.md) and [validation](validation/play-03.md).
- Independent audit (CHG-20261015-002): every run passed at fingerprint 64bef2e3 with exact timing.
  - RUN-20261015-012: full foundation; 324 project checks (300 Node + 24 Python), 406 upstream passes with 1 skip, 2 injection tests.
  - RUN013: live gateway probe; ticket and WebSocket admission refusals, a complete two-host reference-only game with byte-equal wire snapshots (92 comparisons), refused references and schema-closing frames, concurrent duplicate, lost acknowledgement with old references, revocation/drain/heartbeat, rate limits, a 223-frame secret scan and match-ID-only NOTIFY.
  - RUN014: cache probe; one projection per coalesced 48-way burst, viewer isolation, forged checkpoints bypass the cache and fail closed, separate raw/reference namespaces.
  - RUN015: boundary/startup/migration; 528 browser imports refused across six owners, contracts-only client, no live routes in ordinary startup, engine/adapter/Lab/vendor unchanged, additive 0004 with match-only privileges.
  - RUN016: Codex's database suites (5 + 3 + 27, eight identities).
  - RUN017: Chromium, 8 scenarios plus 2 Lab workers.
  - The packaging correction lists exactly the 195 branch paths. No credential value appears in the branch or the audit logs.
  - Verdict: PLAY-03 acceptance is met for the agreed synthetic/test-session scope.
- Audit follow-ups (non-blocking):
  1. AUTH-01: the gateway calls `verify` for every connection on each 500 ms tick (about three calls per second per socket); keep verification cheap or cache it within the accepted revocation delay.
  2. PostgreSQL does not access-control LISTEN; keep NOTIFY payloads metadata-only.
  3. Prune abandoned quota keys before production; the test database holds 31 expired rows from 2026-10-14 development runs.
  4. Carried from PLAY-02: per-move transcript replay, the 4,096-event bound, identity-independent outcomes for opponent ink-back references, card-certification visibility review and the Lab/lock-file `pending_PLAY-02` labels.
- CI: local isolated CI was not rerun. The container wall clock gained 1.8–2.6 ms per second against the monotonic clock during the audit, close to the 1 s guard over the full pipeline. Sequence: push the Codex and audit branches, dispatch hosted Foundation qualification on `claude/play-03-audit`, fast-forward main only after it passes, then observe the main push run. Record those hosted run IDs in the next change.
- Pending gates/next: AUTH-01 actual sessions/recovery/cookies/TLS/proxy/origin and account-bound pending storage; PLAY-04 clocks; user-facing game UI (WEB-02); AUTH/REPLAY D10 delivery; delayed/privileged observers; X01 (P056/two-seat schema); Sandbox operations for R04.009–R04.017; OPS-01 backup secrecy and quota retention; real-card/rules certification; device/load/production acceptance. Ordinary/official/private/reward/card admission stays closed. Old branches are retained.
