# apps/match-service

Separate local Fastify executable on 3002: `/healthz`, `/readyz` and strict bounded `POST /protocol/negotiate`. The shared runtime returns correlated acceptance, upgrade-required or maintenance responses; inputs cannot carry arbitrary/private payloads. Default `local-foundation` is an explicit development identity, independent of the generated CI release manifest. The executable exposes no game ingress. PLAY-01 adds an internal authoritative synthetic command library with restricted database integration; authentication and WebSockets remain deferred.

See [protocol](../../docs/contracts/protocol.md), [service runtime](../../packages/service-runtime/README.md) and [BOOT-05 evidence](../../docs/validation/boot-05.md).


Follow [the universal workflow](../../docs/DEVELOPMENT_WORKFLOW.md) for scoped dependencies, semantic documentation review and timestamped evidence. Full gameplay/device/production acceptance remains separate.

## PLAY-01 continuation — 2026-10-13 UTC

PLAY-01 implements the internal two-player synthetic durable command service with participant-scoped idempotent receipts, row-fenced CAS, private deterministic recovery, atomic accepted journal and metadata-only outbox. Both server and Lab refuse every manual/debug move. Fastify remains diagnostics-only; authenticated transport, viewer/structured-log privacy (PLAY-02), publication (PLAY-03), game clocks (PLAY-04), X01 multiplayer and ordinary/official/private/reward/card admission remain gated. See [PLAY-01 operation](../../docs/runbooks/match-commands.md) and [validation](../../docs/validation/play-01.md); local core/full/browser/database/clean acceptance is verified; isolated CI timing remains pending after RUN113 clock rejection.
