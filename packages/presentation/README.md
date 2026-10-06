# packages/presentation

Browser-only mountSanityScene(canvas, options), returning scene, frame count and idempotent dispose. Owns synthetic Babylon geometry, render loop, resize observation and failure cleanup. No official card/art assets.

Current behavior and callable contracts: [F-RENDERER](../../docs/FEATURES.md). Exact manifests/types and source define the interface; [BOOT-01 evidence](../../docs/validation/boot-01.md) records validation and limits. This is infrastructure foundation. Full game/device/production acceptance remains pending.

Follow [the universal workflow](../../docs/DEVELOPMENT_WORKFLOW.md) for changes, documentation impact review and timestamped test evidence. Runtime/build/test dependencies belong to this workspace; root tasks follow the dependency graph.
