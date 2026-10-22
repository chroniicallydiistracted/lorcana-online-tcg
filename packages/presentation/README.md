# packages/presentation

Browser-only Babylon presentation:
- `mountSanityScene(canvas, options)` returns scene, frame count and idempotent dispose. It owns synthetic Babylon geometry, render loop, resize observation and failure cleanup.
- `mountTableScene(canvas, input, options)` is the UX-01 reference table (decision D27). It returns `update`, `cardRects`, `dispose` and a frame count.
  - **Input:** closed and validated before anything is created. Theme colours, card images and the card back arrive as input, so this package never imports the design system.
  - **Rendering:** on demand only, after materials are ready. The camera is fixed; card art is unlit, so the theme never tints it.
  - **Semantics:** `cardRects()` projects each card for the design system's `SceneOverlay`. The canvas takes no input and no focus.
  - **Failures:** any failure disposes everything and rejects, so the caller can show the Flat tier.

Image URLs come from the caller, which records their provenance.

Current behavior and callable contracts: [F-RENDERER](../../docs/FEATURES.md). Exact manifests/types and source define the interface; [BOOT-01 evidence](../../docs/validation/boot-01.md) records validation and limits. This is infrastructure foundation. Lifecycle across routes and visibility, quality tiers, frame measurement and context restoration belong to WEB-01; full game/device/production acceptance remains pending.

Follow [the universal workflow](../../docs/DEVELOPMENT_WORKFLOW.md) for changes, documentation impact review and timestamped test evidence. Runtime/build/test dependencies belong to this workspace; root tasks follow the dependency graph.
