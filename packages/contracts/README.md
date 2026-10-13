# packages/contracts

Public browser-safe TypeBox health/readiness, revision-1 protocol and release schemas with runtime parsers. Unknown keys/private fields, invalid ranges/revisions and oversized client frames are rejected. See [protocol fields/functions](../../docs/contracts/protocol.md), [release schema](../../docs/contracts/release.md), [feature register](../../docs/FEATURES.md) and [BOOT-05 evidence](../../docs/validation/boot-05.md). Schemas do not implement authenticated game commands or certify engine content. No Node/database/private engine exports.


Follow [the universal workflow](../../docs/DEVELOPMENT_WORKFLOW.md) for scoped dependencies, semantic documentation review and timestamped evidence. Full gameplay/device/production acceptance remains separate.

## PLAY-01 continuation — 2026-10-13 UTC

PLAY-01 implements the internal two-player synthetic durable command service with participant-scoped idempotent receipts, row-fenced CAS, private deterministic recovery, atomic accepted journal and metadata-only outbox. Both server and Lab refuse every manual/debug move. Fastify remains diagnostics-only; authenticated transport, viewer/structured-log privacy (PLAY-02), publication (PLAY-03), game clocks (PLAY-04), X01 multiplayer and ordinary/official/private/reward/card admission remain gated. See [PLAY-01 operation](../../docs/runbooks/match-commands.md) and [validation](../../docs/validation/play-01.md); local core/full/browser/database/clean acceptance is verified; isolated CI timing remains pending after RUN113 clock rejection. `./player-moves` exports frozen PLAYER_MOVES and isPlayerMove(unknown) metadata only; no server/private imports are added.
