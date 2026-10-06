# packages/service-runtime

Server-only createHttpService/runHttpService diagnostics and requireLocalEnvironment/serveUntilShutdown. Signal registration precedes startup; initialization receives AbortSignal; cleanup has a 10-second deadline. Callbacks must honor cancellation for resources allocated late.

Current behavior and callable contracts: [F-LIFECYCLE](../../docs/FEATURES.md). Exact manifests/types and source define the interface; [BOOT-01 evidence](../../docs/validation/boot-01.md) records validation and limits. This is infrastructure foundation. Full game/device/production acceptance remains pending.

Follow [the universal workflow](../../docs/DEVELOPMENT_WORKFLOW.md) for changes, documentation impact review and timestamped test evidence. Runtime/build/test dependencies belong to this workspace; root tasks follow the dependency graph.
