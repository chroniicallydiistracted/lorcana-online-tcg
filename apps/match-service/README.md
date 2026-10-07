# apps/match-service

Separate local Fastify executable on 3002: `/healthz`, `/readyz` and strict bounded `POST /protocol/negotiate`. The shared runtime returns correlated acceptance, upgrade-required or maintenance responses; inputs cannot carry arbitrary/private payloads. Default `local-foundation` is an explicit development identity, independent of the generated CI release manifest. No authentication, authoritative command execution, WebSockets or database integration is provided.

See [protocol](../../docs/contracts/protocol.md), [service runtime](../../packages/service-runtime/README.md) and [BOOT-05 evidence](../../docs/validation/boot-05.md).


Follow [the universal workflow](../../docs/DEVELOPMENT_WORKFLOW.md) for scoped dependencies, semantic documentation review and timestamped evidence. Full gameplay/device/production acceptance remains separate.
