# ADR0013 — Durable synthetic match commands

Historical PLAY-03 checkpoint: optional injected-session protocol2 gateway, current-ref durable commands, exact-version participant cache and browser reconnect client are implemented; [qualification and current limits](../validation/play-03.md) govern acceptance. Director keeps AUTH-01 separate; normal startup stays diagnostics-only. Migration0004 is additive, release/artifact closure includes13 workspaces and distinct protocol1/2 handlers. Historical milestone statements/results below describe their dated sources. No ordinary/official/reward/observer/device/production or clock-repair acceptance is implied.

Status: accepted implementation of the Director-assigned PLAY-01 and blueprint §7.1; recorded2026-10-13 UTC. Requirements: R02.032/.033/.034, R15.009, R29.001/.005 and R30.015 prerequisites only. Initial scope remains synthetic qualification, with all ordinary/official/private/reward admission closed.

## Design and authority

Implement the approved optimistic commit protocol in the match application and server-only database/engine packages. A trusted internal caller supplies actor identity separately from a closed bounded command. The service checks participation and durable actor/match/command receipts, restores only the exact current immutable engine/rules/catalog/format/protocol pins, computes a private candidate in a bounded Node worker, and atomically commits state/checkpoint, accepted journal, receipt and metadata-only outbox with PostgreSQL compare-and-swap. Acceptance follows COMMIT. A lost acknowledgement returns the original receipt on retry. No process-local room/cache decides committed state.

The shared browser-safe player-move policy contains13 supported player moves. All nine manual moves, server-only forfeitGame, unimplemented server-only sing/singTogether and unknown names are refused by server and Lab. The test-only rules bridge retains explicit fixture mutation; no raw debug bypass enters application facades. Future advanced Sandbox tools require their own authorized operations, rather than exposing upstream debug commands.

Match storage lives in the already restricted match schema, owned by the migration role; only the match runtime role has current CRUD access. Additive migrations0002/0003 preserve0001 and all existing rows, roles/default grants, private files and the original volume. Outbox records contain match/version/command references only. They are durable but undelivered in this task; notification/recipient publication belongs to PLAY-03 and economic consumers to later ECON work. Worker/API roles receive no hidden-state or seed access.

## Persistence and replay

A separate server-only persistence interface captures live private deterministic transcripts and restores them by bounded re-execution from the secret seed, checking identity, every recorded result/outcome/checkpoint and final status. It never loads arbitrary caller-supplied state. The ordinary status/completed-replay facade remains restricted: live replay exports fail. Private checkpoint bytes/digests are internal storage inputs, never contracts, client bundles, receipts, public outbox payloads or console output. D10 completed recipient delivery remains an AUTH/REPLAY gate.

Current persisted matches are exactly two-player synthetic qualification, with non-rewarding TST/synthetic pins and a current compiled identity. P056 and the two-seat storage policy must be revisited for X01 after multiplayer certification. Current-only synthetic restore refuses a different engine identity; retained production loaders/admission are not claimed. Time is captured by the server and floored at the last committed capture; game clock/deadline policy remains PLAY-04. The unchanged evidence clock guard and leave-environment instruction remain.

## Alternatives and tradeoffs

In-memory ownership/sticky rooms lose receipts after process death and violate cross-host correctness. Computing while holding a database transaction serializes expensive work and ties locks to engine stalls. The selected outside-transaction bounded candidate plus a short CAS transaction matches the approved architecture. Replaying a bounded private transcript costs more than blindly loading a snapshot but preserves deterministic tamper detection and source identity; actual fixture timing is measured, with whole-card/capacity/production qualification separate.

No game HTTP/WebSocket ingress is added before AUTH and PLAY-02/03; the existing executable diagnostics stay runnable without a database in clean bootstrap checks. The internal application command service is executed against the real restricted test database and independent processes. This task does not claim authenticated networking or viewer/log noninterference. Upstream structured-log certification remains PLAY-02, and raw worker output is discarded rather than forwarded to users.

## Acceptance evidence

Use the native PLAY-01 plan, operation and validation records. Required proofs are allowlist negatives; live private restore/tamper/bounds; immutable matching receipts and changed-content refusal; independent concurrent candidates with one committed version; transaction rollback on journal/outbox failure; process kills before commit and after commit/before acknowledgement with fresh-process retry; restricted-role visibility; bounded worker cancellation/deadlines; source/full/clean/browser/database/CI/documentation regression evidence. No fixture or template alone supplies this evidence.

## Independent audit note — 2026-10-13 UTC

An independent audit (CHG-20261013-006; [validation](../validation/play-01.md)) reviewed this decision against the implemented source at 34b609b and found them consistent. The checks cover the outside-transaction candidate, the row-fenced CAS with the receipt re-checked under the row lock, metadata-only outbox, match-bound private re-execution and the shared 13-move policy. Re-executed and independent evidence at fingerprint 2c343976 includes:
- RUN-20261013-118: full foundation.
- RUN-20261013-120: real storage and service suite.
- RUN-20261013-121: six-way terminal race, duplicate storm, storage-writer forgeries and privacy scan.
- RUN-20261013-122: role privileges.
- RUN-20261013-119/124/126: policy, boundary and browser.

The decision is unchanged. Three follow-ups:
- The Sandbox manipulation requirements R04.009–R04.017 remain in scope and need the dedicated authorized operations this ADR anticipates.
- Restore-by-re-execution must be timed on realistic-length real-card matches before PLAY-03/OPS-01.
- Stored checkpoints include live seeds, so backups are secret material.


## PLAY-02 implementation checkpoint — 2026-10-14 UTC

PLAY-02 adds closed synthetic viewer DTOs/surface codecs, authorized resources/reveal notices, anonymous ink backs and revision-bound refs, deterministic private projection/recovery and read-only participant access. See [viewer contract](../contracts/viewer.md), [operation](../runbooks/viewer-privacy.md), [ADR0014](../adr/0014-viewer-projection-privacy.md) and [current validation](../validation/play-02.md). Prior dated PLAY-01/engine/privacy-pending statements describe their historical sources; current implementation is here, with valid matching full foundation/database/Chromium/clean qualification in RUN056/057/058/059 and independent review after the front-only metadata correction. Upstream361 selected files/59patches and all original tests remain unchanged; only the project-owned pure bridge/adapter changes. New executable identities refuse prior checkpoints rather than rewriting data. Protocol1 counts-only diagnostics remain unchanged; DTO revision1 has no advertised game handler. Public observer projection is adapter qualification only; service reads require a trusted participant. All ordinary/official/private/reward/card admission stays closed pending authenticated recipient/publication and remaining rule/card gates. PLAY-03/04, AUTH/REPLAY, delayed/privileged delivery, general card-choice codecs, device/performance and production acceptance remain separate. No clock/settings/service repair is performed. Current feature evidence distinguishes the earlier scoped RUN033/RUN035 proofs from current final-source RUN056/057/058/059. Earlier RUN047/048/049 are source checkpoints. Isolated RUN051 on the preceding source completed all14 child stages/artifact generation but failed the unchanged clock guard; timing acceptance stays pending. No retry/repair or promoted/hosted artifact acceptance is inferred.

## D13 current compatibility — 2026-10-19 UTC

D13 supersedes earlier version assertions: new timed/untimed synthetic matches pin live4, viewer2/endReason and required nullable clock2 with native timeoutCount/limit. Exact legacy live2/viewer1 and live3/clock1 codecs remain; unavailable old executable/policy/checkpoint pins refuse without rewriting. Private replay is transcript3/checkpoint2, preserving native events and one logical saved transition. Append-only0006 admits4;0001..0005 remain unchanged. P060 is the only upstream repair (opening concede validMoves), now60 patches/361 files/37 unchanged tests. Either player's opening concession loses, main expiry loses at the whole-game limit, first opening expiry loses immediately, and D14 native restore remains. Waiting work never owns the timed lease; infrastructure pauses never count or award results. Admission/auth/rewards/cards/device/load/operations stay gated. See [clock ownership](../runbooks/game-clocks.md). Earlier dated evidence remains source-specific.
