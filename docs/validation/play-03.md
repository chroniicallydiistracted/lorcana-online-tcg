# PLAY-03 qualification

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
