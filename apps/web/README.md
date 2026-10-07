# apps/web

Semantic React/Vite diagnostic client, service readiness, correlated protocol compatibility status and opt-in synthetic rendering on 5173. Uses CSS Modules and React Aria; same-origin local proxies reach API 3001/match 3002. Renderer controls remain usable on initialization failure.

Current behavior and callable contracts: [F-WEB](../../docs/FEATURES.md). Exact manifests/types and source define the interface; [BOOT-01 evidence](../../docs/validation/boot-01.md) records validation and limits. This is infrastructure foundation. Full game/device/production acceptance remains pending.

Follow [the universal workflow](../../docs/DEVELOPMENT_WORKFLOW.md) for changes, documentation impact review and timestamped test evidence. Runtime/build/test dependencies belong to this workspace; root tasks follow the dependency graph.

`ProtocolStatus` sends a revision-1 hello to the same-origin match proxy, validates the response against its request and HTTP outcome, and displays compatible/update-required/unavailable status. Requests time out after five seconds and are aborted on cleanup. See [protocol](../../docs/contracts/protocol.md); actual Windows/device acceptance remains pending.
