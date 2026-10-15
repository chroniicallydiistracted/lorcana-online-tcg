# packages/service-runtime

Server-only `createHttpService`/`runHttpService` diagnostics, strict bounded negotiation and local signal lifecycle. `requireLocalEnvironment` rejects non-local execution; `serveUntilShutdown` registers signals before startup, supplies AbortSignal and bounds cleanup at ten seconds. Callbacks must honor cancellation for late resources.

The `./release` subpath exposes `createReleaseRegistry` and `assertRetainedPins`: manifests are defensively cloned/frozen; unavailable pins throw without fallback; supplied retained pins must keep exact manifest identity. This in-memory guard neither activates deployments nor persists matches. See [protocol](../../docs/contracts/protocol.md), [release policy](../../docs/contracts/release.md), [feature register](../../docs/FEATURES.md) and [BOOT-05 evidence](../../docs/validation/boot-05.md). Browser imports of either runtime entry are forbidden.


Follow [the universal workflow](../../docs/DEVELOPMENT_WORKFLOW.md) for scoped dependencies, semantic documentation review and timestamped evidence. Full gameplay/device/production acceptance remains separate.

The shared hello offer can cover three adjacent versions (for example1..3), but these diagnostic HTTP handlers still advertise/select only1. A wider1..4 offer is malformed; a2-only offer is incompatible. Separate live2/3 handlers belong to the optional match gateway, not this diagnostic service.
