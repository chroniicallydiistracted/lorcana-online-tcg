# ADR0012 — Reviewed upstream kernel refresh

Recorded at: 2026-10-13T05:53:26.668Z. Status: accepted for the Director-authorized local source refresh before PLAY-01. Affected prerequisites: RULE-01/02/03/04, R01.005, R01.006 and R29.005. No product requirement acceptance or hosting decision changes.

## Decision and comparative evidence

Advance the bounded engine/type/shared closure from `53a79413c58678b1c50dde57e71de5c123132716` to `6de59de1c203827edc1bc6faa1bc6184cd126a5f`, Public sync 2026-W41 (#232), authored/committed 2026-10-09T17:52:00Z. Retain MIT notices, the isomorphic kernel boundary, server-owned randomness, private deterministic replay and the separate noncompetitive Lab. Reconcile every affected local patch against the new original bytes; extend the ledger to59 patches rather than blindly replacing local behavior.

RUN-20261013-024 checks all51,113 current Git blobs and records11,012 changed-path dispositions. The directory called submodules/lorcana is an ordinary Git tree (`3c901f13b89337917121089de891d301832f7a54`), not a gitlink. The raw tree is inert; neither its dependency graph nor any upstream application is installed. The selected closure is361 files,308 runtime source/type/data files and37 unchanged selected test files. The earlier full inventories remain source-specific history. New upstream definitions include207 set014 objects; none are imported or certified for product play.

Remaining on the old pin would omit relevant end-turn/zone, bag-use/lifetime, last-known Support, structured-choice/private-log and ink-drop changes. Importing the whole workspace would inherit unrelated games/UI/tooling, dependencies and uncertified official cards. The bounded reviewed refresh incorporates every changed runtime dependency in our selected closure, adds ten relevant original test files and inventories excluded paths with reasons. Full-tree byte/path inspection does not claim semantic certification of other games or all Lorcana cards.

## Compatibility choices

Use native `inkDrops` for state and root payment input. Preserve the fork's ordered nested `effectInkDropCounters` queue and cards-first default. Reserve mandatory ink-drop costs before ordinary payment; validate claims strictly and record actual consumption. The legacy synthetic `gain-ink-drop-counters` spelling validates strictly and then calls the native resolver, retaining event/metric/cache/replacement/continuation semantics. No public protocol changes or persisted match migration are introduced.

Upstream overlapping code retains provider-only random/clock paths and private replay rollback. Sourced regressions correct permanent static Adventurous loss, cost increases, effective aura/suppression/replacement conditions, effect-driven entry lifetimes, paid-drop predicates and controller-owned restrictions. These are compatibility corrections within the authorized mechanics, not card admission. Original upstream assertions and card definitions are unchanged. The synthetic test bridge adds a private test-only projection probe without widening production exports.

## Gates and evidence

Use [refresh validation](../validation/upstream-engine-review.md), [source review](../rules/2026-10-13-upstream-review.json) and [dated catalog inventory](../rules/2026-10-13-upstream-inventory.json). RUN035 passes120 sourced cases/128 rule checks at final fingerprint4ba45cc4. Full build/clean/browser/replay closure is recorded separately as it executes. Reviewer recheck found no remaining scoped source blockers; it was read-only inspection, not independent execution.

Compiled/replay/release identities change with the source; old archives remain bound to their original retained identity and are not silently verified by this kernel. Retain prior source evidence and implement durable retained loaders in the appropriate PLAY/release work. All ordinary/official/private/reward/card gates remain closed. PLAY-01 must allow only legitimate server moves and refuse manual/debug commands, including the newly upstream manualSetInkDrops; the Lab needs the same restriction. D10 recipient delivery and PLAY-02 wire privacy remain pending. No local clock repair/tolerance change, isolated CI retry, Windows/device/production claim, purchase, deploy, publication or main merge is included.

## Independent audit note — 2026-10-13 UTC

Recorded by the Claude Code audit ([CHG-20261013-003](../changes/CHG-20261013-003.json)). The decision is unchanged and matches the audited source at fingerprint 4ba45cc4. GitHub's API confirms 6de59de1 is upstream main, signature verified, child of 53a79413, and every one of the 363 pinned blob ids matches GitHub's tree. RUN-20261013-047..057 pass with valid timing, including the first timing-valid full foundation receipt for this source and a re-run of the RULE-03 and RULE-04 audit probes; the Adventurous static-loss defect is confirmed fixed. P056's exactly-two-player setup guard matches the current two-player kernel but must be revisited when X01 multiplayer/teams is certified. Isolated CI RUN058 failed on a network timeout downloading the browser, not on code or clock.

## PLAY-01 continuation — 2026-10-13 UTC

PLAY-01 implements the internal two-player synthetic durable command service with participant-scoped idempotent receipts, row-fenced CAS, private deterministic recovery, atomic accepted journal and metadata-only outbox. Both server and Lab refuse every manual/debug move. Fastify remains diagnostics-only; authenticated transport, viewer/structured-log privacy (PLAY-02), publication (PLAY-03), game clocks (PLAY-04), X01 multiplayer and ordinary/official/private/reward/card admission remain gated. See [PLAY-01 operation](../runbooks/match-commands.md) and [validation](../validation/play-01.md); local core/full/browser/database/clean acceptance is verified; isolated CI timing remains pending after RUN113 clock rejection.

## D13 current compatibility — 2026-10-19 UTC

D13 supersedes earlier version assertions: new timed/untimed synthetic matches pin live4, viewer2/endReason and required nullable clock2 with native timeoutCount/limit. Exact legacy live2/viewer1 and live3/clock1 codecs remain; unavailable old executable/policy/checkpoint pins refuse without rewriting. Private replay is transcript3/checkpoint2, preserving native events and one logical saved transition. Append-only0006 admits4;0001..0005 remain unchanged. P060 is the only upstream repair (opening concede validMoves), now60 patches/361 files/37 unchanged tests. Either player's opening concession loses, main expiry loses at the whole-game limit, first opening expiry loses immediately, and D14 native restore remains. Waiting work never owns the timed lease; infrastructure pauses never count or award results. Admission/auth/rewards/cards/device/load/operations stay gated. See [clock ownership](../runbooks/game-clocks.md). Earlier dated evidence remains source-specific.
