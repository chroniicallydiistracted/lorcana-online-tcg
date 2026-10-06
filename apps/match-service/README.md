# apps/match-service

Separate local Fastify process on 3002 with foundation health/readiness only. No match commands, game state, admission or matchmaking implemented.

Current behavior and callable contracts: [F-HTTP](../../docs/FEATURES.md). Exact manifests/types and source define the interface; [BOOT-01 evidence](../../docs/validation/boot-01.md) records validation and limits. This is infrastructure foundation. Full game/device/production acceptance remains pending.

Follow [the universal workflow](../../docs/DEVELOPMENT_WORKFLOW.md) for changes, documentation impact review and timestamped test evidence. Runtime/build/test dependencies belong to this workspace; root tasks follow the dependency graph.
