# PLAY-03 qualification

<!-- PLAY04-CURRENT-START -->
PLAY-04 residual R1/R2 repairs are implemented and tested in CHG-20261016-002 on `codex/play-04-opening-fixes`, based on re-audit33e9a7a; Director re-audit/hosted CI remain pending. No waiting-player command takes a timed reservation: concessions evaluate outside SQL locks/leases and commit only against unchanged healthy state/clock. Native opening refusal is unchanged. The web regression uses its existing Node fixture instead of statically importing unbuilt app output; source-only frozen install/typecheck passes RUN-20261016-008. RUN009/010/011 complete81DB/live,11Chromium+2Lab,350project/406engine/2injection checks with child exit0 (one inherited engine skip), but all three native receipts fail clock_changed. Whole-source feature verification stays conservatively pending; thresholds/environment unchanged. Main stays775994a. Four policy points, real-card chooser, AUTH/device/load/production remain separate; earlier results below are dated history. [Current repair evidence](play-04.md#opening-concession-and-clean-typecheck-repairs--2026-10-16-utc).
<!-- PLAY04-CURRENT-END -->

Scope: Director-assigned handshake, versioned snapshots, reconnect and backpressure. Branch `codex/play-03-live-reconnect` from clean merged PLAY-02 main `6f2659eac632fdec92f7af5296505331782b638d`. Change CHG-20261014-006. Technical synthetic acceptance is verified, independently reviewed and ready for Director audit. [ADR0015](../adr/0015-live-synthetic-transport.md), [live contract](../contracts/live.md), [operation](../runbooks/live-matches.md) and [plan](../plans/2026-10-14-play-03-live-reconnect.md) define scope.

The Director explicitly keeps AUTH-01 separate and authorizes isolated authenticated test sessions. No login, account recovery or production session implementation is claimed. Ordinary startup remains diagnostics-only; optional gateway construction requires an injected trusted session authority and exact origins. All ordinary Lab/Collection, official/card/private-choice/reward/observer/device/load/production gates remain closed. Clock investigation remains ended; no guard, clock, memory, pagefile, service or host restart change is performed.

## Implemented behavior

Closed protocol2 is distinct from retained diagnostic1. New synthetic matches pin2; old1 remains internally readable only with its exact available pins and never becomes live2 through coercion. Additive migration0004 preserves0001..0003 and existing rows/roles. Hashed single-use session/actor/match/origin/release tickets, shared database quotas, per-process socket/IP bounds, session deadlines/rechecks, full participant snapshots, monotonic sequence/state versions, COMMIT-only metadata hints with durable polling, heartbeat and owned drain/shutdown protect the optional gateway.

Only current participant references enter the client command path. Original reference intents have separate durable semantics: identical old-ref pending retry returns the saved receipt before resolving refs again. Private exact-checkpoint projection cache uses bounded serialized entries, participant/version/release/outcome/private-byte keys and coalesced fills, still authorizing every read. Browser-owned match-client handles copied committed views, one actor-bound pending command, bounded jitter/retry/deadlines, transient versus durable outcomes, gap recovery, suspension/resume and disposal. No engine/private/session-secret code enters its dependency graph. Artifact v3 retains13 workspace builds and binds client bytes recursively to the release identity.

## Native checkpoint evidence

Every referenced run JSON/log is immutable and records its own source fingerprint, actual UTC pair/elapsed time and outcome. Earlier scoped passes are checkpoint evidence, not automatic final-source acceptance. RUN072 observes prior public hosted PLAY-02 metadata at6f2659e only; hosted logs/artifacts were not downloaded. No PLAY-03 hosted run or fresh isolated CI timing pass is claimed.

| Runs (2026-10-14 UTC) | Result and purpose |
|---|---|
|071–073|Unchanged container doctor/static/bootstrap/database intake, prior hosted metadata and native intake documentation pass.|
|074–078|Cache/ref tests red then green.074 also exposes a wrong test-zone field;075 fixes the fixture and reproduces actual missing cache/raw-ID acceptance.078 passes prior plus new service/storage tests and48-reader coalescing.|
|079–084|Closed live schemas/tickets/quotas/hints/pins red then green.083 preserves PostgreSQL42P08 parameter inference failure after test-first0004 application;084 explicit varchar casts fix it without rewriting applied SQL.|
|085–087|Exact selected dependency metadata archived under validation/inputs.086 child exits0 after intentional manifest/lock mutation, but receipt correctly fails source_changed.087 independently passes frozen install, local0004 and both role-health sets.|
|088–091|Actual optional WebSocket gateway red/green;090 reproduces five concurrent actor connections bypassing the four-slot cap.091 synchronous reservation corrects it and passes five actual gateway cases.|
|092–095|Client simulations red/green;094 reproduces extra retransmission/hidden ACK deadline, callback reentrancy and replaced waiter issues.095 passes all seven after corrections.|
|096–097|Artifact omission red, then frozen install and all CI tooling pass; rehashed outer metadata cannot hide tampering with compiled client bytes.|
|098–101|Direct Fastify-close red;099 exposes a fixture export typo and PostgreSQL connect/end race;100 isolates that race.101 passes all11 actual gateway/store cases after owned connect/close ordering.|
|102|Two actual client/process cases pass: natural reference-only game on separate gateway processes; lost acknowledgement after COMMIT, SIGKILL of only the owning gateway, then other-host recovery of the same old-ref command exactly once.|
|103–104|Qualification child initially survives controlling parent IPC loss;104 passes after owned disconnect cleanup. No ordinary service is killed.|
|105–106|All TypeScript checks pass;105 lint identifies const/global qualification fixture issues.106 passes owner typechecks and lint/boundaries with no weakened rule.|
|107|All8 Linux headless Chromium cases pass: retained7 plus native HttpOnly-cookie/HTTP/WebSocket two-player flow, reference rotation, cross-process reconnect and completion. Software WebGL; no fresh Windows/device claim.|
|109/112|Documentation gate correctly refuses missing individual schema review and a wildcard review rendered as a broken link; replace it with actual file reviews, retaining both failures.|
|110/111/113/114|Independent review finds two minor callback disposal edges; red probes reproduce orphan retry timers/unsettled connect state, corrected guards pass all9 client simulations.|
|108|Current original bootstrap DB, both four-role health sets, live DB authorization/transactions, storage contracts, durable service/projection/cache, ticket/quota/listener, actual gateway and three process-client cases pass.|

Actual natural game uses synthetic homogeneous TST decks and finishes through legal quest/play/turn flow, not a manual/debug operation. Existing mixed-world privacy tests and prior independent495-comparison audit remain distinct privacy evidence; a natural homogeneous game alone cannot establish hidden-identity noninterference. The lost-ACK probe pauses client reads, waits for actual durable version4, verifies no acknowledgement was decoded, kills only its qualification gateway, reconnects to another process and receives the original accepted command as duplicate atversion4; journal/outbox remain once. Actual Chromium uses native cookies/fetch/WebSocket, separate browser contexts and injected test verifiers; no mock browser transport or real account sign-in is inferred.

## Final-source evidence and remaining gates

Whole-source RUN-20261015-002 passes frozen install and full foundation:324 project checks (300 Node/24 Python),406 upstream passes/1 inherited skip and2 injection tests, with valid native timing (123662ms). Independent [static review](../reviews/2026-10-15-play-03-live.md) has no important remaining findings; both minor fixes have native red/green evidence. Final-source RUN003 passes35 actual DB/storage/match/transport/client checks plus bootstrap/both role-health sets. RUN004 passes8 foundation and2 Lab Chromium cases. All match the RUN002 source fingerprint with valid timing. RUN007 passes the complete clean frozen source-copy foundation (116829ms), without private files/Git/dependencies/prebuilt output. RUN008 passes vendor361/59, private0600/ignored checks, original548/33/20 scope/device preservation, unchanged prior SQL/engine/container, complete-history secret scanning (2729 unique blobs),622 log digests and owned-listener/child cleanup. All final executed runs have valid native paired timing. Tests and full manifests remain retained; no skipped engine or narrowed device scope is introduced.

- AUTH-01 must implement actual sessions/recovery/cookies, trusted proxy/TLS/origin configuration and account-bound pending-intent clearing. No anonymous fallback or hardcoded product identity exists. A validly admitted in-flight command may commit during later revocation; publication rechecks and withholds unauthorized data.
- Per-actor/IP connection caps are per gateway; request quotas are shared. Quota rows reuse expired buckets but abandoned-key retention/pruning and global connection admission remain OPS/load work. Cache and synthetic proofs do not certify50-player capacity.
- Every move still restores its transcript. Measure realistic real-card match length, cold/warm cache, worker deadlines and4096-event projection bound before admission. Closed back references must continue rejecting independently of hidden identity as real cards are certified.
- New code identity refuses unavailable old checkpoints rather than rewriting them. Actual retained private bundles/activation/rollback, observers/delay/privileged replay, clocks, multiplayer (P056), bag/effect prompts and full card/rules certification remain separate.
- Existing clock-rejected receipts stay unchanged. Known long isolated timing failure is not retried merely to reproduce it. GitHub qualification of PLAY-03 remains for publication/audit; prior hosted metadata cannot accept this source.

## Final source and acceptance disposition

Tested executable fingerprint: `64bef2e3b6a8787b2ad388c30106960a635bdd7ba61ad3735d92454f7a8e8286`.

| Final run (2026-10-15 UTC) | Category | Executed result |
|---|---|---|
|002|container|Frozen install, all builds/typechecks/lint/boundaries,324 project checks (300 Node/24 Python),406 upstream passes/1 inherited skip,2 injection tests.|
|003|container|Original bootstrap DB, both four-role health sets,5 actual DB checks,3 storage checks and27 match/transport/process-client checks;35 total.|
|004|headless_browser|8 foundation/live Chromium cases and2 Lab browser cases; native cookies/fetch/WebSocket, software WebGL, disposal and boundaries.|
|005|container|Installed license/frozen integrity/advisory policy passes;222 SBOM components including vendor; generated reports ignored, no promoted artifact.|
|006|static|Current semantic review, source-matched feature evidence and native documentation synchronization/check.|
|007|container|Fresh source-only frozen install and all foundation checks again, temporary copy removed.|
|008|container|Full-history/current secret and log/scope/private-file/provenance checks; owned children/listeners reaped.|

Both qualification hosts run as independent OS processes inside the existing Dev Container. This proves shared-database instance independence, absent sticky memory authority and host-process loss recovery; it is not a remote-machine/network-fault/load qualification. Actual Windows/phone/tablet, ordinary login/admission, game UI, clocks and all-card acceptance remain separate. Memory workloads ran sequentially; a point sample showed workspace2.14GiB and PostgreSQL64.71MiB, not a measured peak or Windows commit guarantee. No memory/clock/settings changes were made.

PLAY-03 backlog technical acceptance is met for the agreed synthetic/test-session scope. No scope was removed: AUTH-01 remains separate by Director decision; full premium game, multiplayer, Sandbox tools, economic integrity, official rules/cards and device requirements retain their original gates. Final docs/Git byte closure follows the native record without reinterpreting earlier scoped receipts. The change is prepared as a local reviewable commit; no push, merge, purchase or deployment is performed.

## Append-only packaging correction

The first local implementation commit is `6f3b45e1c4f094ba83beb385a1f4cc7d26ec198a`. Its final non-native packaging check found CHG006.files had shrunk to four paths after an external helper enumerated only unstaged/untracked files following staging. The shell incorrectly continued to commit despite that assertion failure. This does not invalidate the matched executable source or recorded application results, but the committed file inventory was incomplete. CHG-20261015-001 explicitly supersedes that inventory with the full cumulative branch scope; CHG006 and its execution evidence remain byte-for-byte sealed. The workflow/format now explicitly require cumulative coverage and failure-stopping commit sequences. A whitespace check also reported an extra final blank line in live-fixtures.mjs; the cosmetic warning is retained in the tested bytes and is not represented as a passing whitespace check. No application/test/schema/lock code changes accompany the correction, so the64bef2e3 qualification remains applicable.

Correction-specific RUN-20261015-011 passes native documentation and full cumulative inventory verification at the unchanged64bef2e3 executable fingerprint. Independent read-only inspection confirms193 paths at its checkpoint (190 original plus correction), no missing/extra/duplicate paths and sealed CHG006 unchanged. The finalized correction adds its own captured receipt/log, yielding195 cumulative paths; the original application/engine/database/browser/clean results remain applicable.

## Independent audit — 2026-10-15 UTC

Change CHG-20261015-002 (Claude Code agent, Director request), branch `claude/play-03-audit` from Codex commit 743f0b2. Every run below passed at Codex's final executable fingerprint 64bef2e3 with exact timing, no clock discontinuity and 0 redactions. Codex's records above are unchanged.

- RUN-20261015-012: full `pnpm verify:foundation` (126,855 ms): 324 project checks (300 Node + 24 Python), 406 upstream passes/1 inherited skip/1,362 expectations, 2 injection tests, all builds/types/lint/boundaries.
- RUN013 auditor live gateway probe against the real test database (three fixtures; gateway hosts as separate Fastify instances in one process).
  - Ticket HTTP. Missing or wrong Origin returns 403 without CORS headers; no session 401; a query-string URL 403; an extra field 400; an oversize body 413; a protocol-1-only request 409 with `{2,2}`. An outsider and a missing match return identical 403 bodies. Preflight is answered only for the configured Origin. Success is no-store, exact-origin and credentialed, with the closed field set and at most 30 s expiry within the session. Only the ticket's SHA-256 is stored, and the 13th ticket in a minute returns 429.
  - WebSocket admission. A wrong Origin returns 403. A ticket in the URL returns 403 and stays unconsumed; it then authenticates normally. The following each close 1008 with no frame: replay; use from a second allowed Origin (the ticket is not consumed and still works from its own Origin); an expired ticket; a session revoked between issue and use; a non-authenticate first frame; a malformed ticket; extra fields. The auth deadline closes after 301 ms. Re-authentication and other-match frames close 1008. Admission traffic writes nothing durable.
  - Complete two-host game. 48 versions over 10 turns, using chooseWhoGoesFirst, alterHand, putCardIntoInkwell, playCard, challenge, quest, questWithAll and passTurn. Each move uses only references from the player's own committed view. One player is on a host with NOTIFY hints; the other is on a host that only polls. At 46 synchronized versions, both players' wire snapshots equal the adapter projection of the stored checkpoint byte-for-byte (92 comparisons).
  - Refused intents. Each has a durable receipt and changes no state or journal row. `invalid_intent`: unknown ref, the opponent's hand ref, the opponent's ref to one's own card, a previous-version ref, the opponent's anonymous ink back as challenge defender, and an out-of-turn pass. `stale_state`: an old expected version. A raw engine instance identity, a manual/debug move, an extra input field, an actor override field and a reused command ID with a different payload each close the socket 1008 with no receipt and no write.
  - Recovery.
    - Concurrency: one player sends an identical command at the same time from sockets on two hosts. It commits once (one duplicate receipt, one journal row).
    - Lost acknowledgement: the client stops reading and its command commits. The player then passes on a second socket and the opponent inks (two later commits). Retrying the original old-reference command returns the saved accepted receipt (duplicate, version 10) and adds no journal row.
    - Revocation: auth_expired control, close 4401, no later frames and a 401 ticket; the match is not conceded, and the player is re-admitted after restore.
    - Drain: maintenance control, close 1012 and a 503 ticket; the match is not conceded.
    - Heartbeat: a client that stops reading is closed 1013.
  - Rate limit. Of 14 rapid sequential commands, 8 receive durable stale receipts and 6 receive `rate_limited` (retryAfterMs ≤ 1,000), which write nothing.
  - All 223 delivered frames have closed envelope keys, a consecutive per-socket sequence from 1 and equal outer/inner versions. They never contain opponent hand or deck fronts, and carry no seed, commitment, checkpoint digest, engine identifier, session ID, cookie or ticket. 48 commits produced 48 NOTIFY messages, each carrying only the match ID. Command round trip, including the post-receipt snapshot: p50 258 ms, p90 353 ms, max 409 ms.
- RUN014 auditor cache probe, run at service level with a counting executor.
  - Bursts. A 48-way warm burst runs no projection. A 48-way cold burst after a commit runs exactly one; the PLAY-02 audit measured 34 served and 14 refused without a cache. A mixed burst adds one projection for the second viewer, and payloads never cross between viewers. 80 concurrent cold reads serve 64 and refuse 16 with UNAVAILABLE.
  - Authorization and freshness. Outsiders and malformed requests are refused before the cache. A commit through another service instance is visible immediately.
  - Forgery. Four forged rows fail closed instead of hitting the cached view: a re-digested seed, a forged winner, a truncated transcript and a mismatched digest. Restoring the original bytes is a cache hit.
  - Reference intents. They keep a separate durable namespace: the same command ID through the raw path, or the reverse, is ID_CONFLICT. A retried rejected reference intent is a duplicate, and a changed payload is ID_CONFLICT. A raw engine identity sent through the reference path is rejected.
  - Restart and cost. A restarted service reproduces the view. Over a 19-version game, a cold view takes about 194–238 ms and a submit about 196–238 ms; the engine still replays per move.
- RUN015 auditor boundary/startup/migration probe.
  - Imports. Six browser/public owners, including the new `@lorcana/match-client`, refuse 528 imports across four import forms. Refused targets: adapter, match service and gateway, db, runtime, pg, Fastify and its WebSocket plugin, Node crypto/workers/child processes, and relative paths to the gateway/session/connection/cache/service/transport-store sources and qualification fixtures.
  - Client package. The client depends on and imports only `@lorcana/contracts`, and uses no browser storage or cookies. WebSocket/Fastify packages stay in the match service.
  - Shipped files. 48 web/client/Lab files carry none of 23 server markers; the web app does not yet bundle the client.
  - Ordinary startup. Its source is unchanged. The diagnostics service has no `/play/ticket`, `/play` or `/login` route and still negotiates protocol 1.
  - Unchanged code. Engine, adapter, Lab, vendor and the protocol/viewer/player-move contracts are byte-identical to main; kernel sha256 d5e55106… is unchanged.
  - Migrations. 0001–0003 are byte-identical. 0004 contains only the protocol-check swap, two CREATE TABLE statements and two indexes, and is recorded in both databases. The new tables give all four privileges to the match role only, and none to api, worker or PUBLIC.
- RUN016 Codex database suites: db:check, local/test health (eight identities), db:test 5, storage 3 and match integration 27 (35 total), including the actual gateway and separate-process client recovery.
- RUN017 Linux headless Chromium: 8 foundation/live scenarios (including native-cookie live clients across processes) and 2 isolated Lab workers.
- Packaging correction CHG-20261015-001 checked. The sealed CHG006 `files` list has 4 paths, and the correction lists exactly the 195 paths in `git diff main..HEAD`, with none missing or extra. `git diff --check` reports only the disclosed extra blank line at the end of `apps/match-service/tests/live-fixtures.mjs`. It is cosmetic and left in place, because changing it would alter the tested fingerprint.
- Credential scan. The branch diff and the new audit logs were checked against private configuration values. The only match is the database name inside a role-name pattern, on an unchanged context line already published on main.

Code review covered:
- the closed live schemas and size limits;
- ticket issue/consume SQL: the participant/release/protocol join, hashed storage, atomic single-use DELETE, and origin and expiry binding;
- gateway admission order and the synchronous per-actor reservation;
- the session recheck before and after each projection;
- `submitRefs` hashing intents in their own namespace before reference resolution, and worker-side resolution against the same checkpoint;
- the cache key over the exact committed row (archive bytes included) plus viewer and policy;
- COMMIT-only NOTIFY and polling reconciliation;
- the client's generation/disposal guards and pending-intent export/restore.

PLAY-02 audit follow-ups 1 and 3 are closed for this scope. The only client command path is current references, and repeated views are cached and bounded.

Verdict: **PLAY-03 backlog acceptance is met for the agreed synthetic/test-session scope.** Two real clients complete a game, a client reconnects on a different host, and a duplicate pending command resolves to its saved receipt. No blocking finding.

Follow-ups, none blocking:

1. AUTH-01 sizing. On every reconciliation tick (500 ms by default), the gateway rechecks the session for each connection, plus once per match group for observation. That is about three verifier calls per second per socket, or roughly 380 per second at the 128-socket cap. AUTH-01's verifier must be cheap, or cache briefly within the accepted revocation delay, and this cadence should be sized together with it.
2. PostgreSQL does not access-control LISTEN channels: the api role can subscribe to `lorcana_match_changed` (RUN015). The payload is only a match ID sent after COMMIT, so nothing private leaks. Keep hints metadata-only.
3. Abandoned quota keys are not pruned (already documented). The test database holds 31 expired quota rows (hashed keys only) from development runs on 2026-10-14 between 23:23 and 23:28 UTC. OPS must add retention/pruning before production.
4. Carried from PLAY-02, unchanged:
   - Full-transcript replay on every move: about 0.2–0.26 s per command for synthetic games, which end within about 50 versions because the decks have 12 cards.
   - The 4,096-event projection bound.
   - Outcomes for references to opponent ink backs must stay independent of the hidden identity; they are `invalid_intent` here.
   - Card-certification recheck of the move-list and visibility defaults.
   - The Lab/lock-file `pending_PLAY-02` naming.

Local isolated CI was not rerun. During these runs the container wall clock gained 1.8–2.6 ms per second against the monotonic clock (327 ms over RUN012's 127 s). Over the six-to-seven-minute pipeline that is about 0.7–1.0 s, at or near the unchanged 1 s guard, and the Director keeps the environment unchanged. Hosted Foundation qualification runs on the published audit branch before any main fast-forward. Its run IDs are recorded in a later change.

## Merged PLAY-03 hosted evidence and PLAY-04 intake — 2026-10-15 UTC

Recorded 2026-10-15T05:00:31.268Z. RUN-20261015-020 observes public GitHub job/step metadata at775994a82f5f003c4c4831a20791d5e904ff3d6b: audit38681078184 attempt1 success; main38682066872 attempt1 failure and attempt2 success. All three refer to identical source. Hosted logs/artifacts were not downloaded; the Director supplies the324/406/2,35DB and8+2browser counts and reports all14 stages passing on the successful attempts. The first main failure is Director-attributed to the existing30-second development-supervisor rebuild test; metadata does not independently prove that inner assertion. Retain both outcomes rather than labeling main an uninterrupted first-attempt pass. No PLAY-04, real-device or local isolated timing acceptance is inferred. RUN019 separately passes unchanged local intake checks. PLAY-04 design questions are pending in docs/plans/2026-10-15-play-04-intake.md. No clock/environment repair or startup-test edit is performed.
