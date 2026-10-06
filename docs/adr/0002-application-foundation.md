# ADR 0002: Executable workspace foundation with enforced browser ownership

Date: 2026-10-05 (Director assignment, America/Phoenix). Status: implemented for BOOT-01.

## Context and affected requirements

BOOT-01 requires a clean frozen install, minimal web/API/worker builds, strict type checking and rejected forbidden imports. The Director also requires a separate match-service boundary and synthetic Babylon lifecycle proof. This establishes prerequisites for R25.001/.002/.005/.006/.008 (scalable layouts, accessibility, keyboard and motion), R29.005 (hidden-information security), and R30.009/.017 (servers/status). Their complete product/device acceptance remains pending.

## Decision

Use the selected exact TypeScript 6.0.3, React 19.3.0, Vite 8.3.2/plugin 6.1.2, Babylon core 9.29.0, Fastify 5.12.5 and typebox 1.3.35/provider 6.1.0 pins. Only currently needed dependencies are installed in owning workspaces. Babylon loaders, database, auth, jobs, state frameworks and engine integration remain deferred until used. Tooling uses exact ESLint/TypeScript-ESLint, parse5, postcss-value-parser and Playwright pins. Node's built-in test runner covers foundation schemas, real ephemeral HTTP listeners and fetch, Babylon NullEngine and real-process checks; Playwright covers the live UI. Vitest, Testing Library, fast-check and axe remain available targets when their product verification needs appear. No dependency build scripts are authorized; installed manifest inspection found none requiring execution and `allowBuilds` remains empty with strict peer checks.

Keep the planned contracts, presentation and design-system ownership. Add a small **server-only service-runtime** package so API and match-service share diagnostics and lifecycle behavior without depending on each other. The worker uses only its lifecycle export. Domain, db, engine-adapter, rules-data and testkit remain reserved rather than empty dependency packages.

Shared packages emit declarations and Node ESM through TypeScript. Ordered root builds follow pnpm's workspace graph. Production/default exports point to built files; the unique `lorcana-source` condition selects local source for Vite/development/tests. A generic `source` condition selected third-party raw TypeScript and caused Node strip-only incompatibility during verification; the unique condition removed that failure while preserving compiled runtime tests. Relative `.ts` imports are rewritten to `.js` in emitted server code.

Declare package scopes (`public`, `browser`, `server`; missing manifests are reserved). Enforce browser/public dependencies and resolved source ownership, including aliases, reexports, dynamic imports, builtins, cross-package relative paths, HTML/CSS and `new URL` asset references. Parse HTML using parse5 and inspect image-set CSS values with postcss-value-parser, disable uncatalogued public-directory copying and restrict Vite filesystem serving. TypeScript's AST supplies module inspection; Vite repeats the guard at build/load/HTML transformation. Negative fixtures and actual rejected Vite builds supply comparative evidence. This is a dependency boundary, not a complete adversarial JavaScript/data-flow proof or engine hidden-state certification.

Web 5173 uses same-origin local diagnostic proxies to API 3001 and match 3002. Worker has no ingress. No permissive CORS or database integration is added. Local-only services require `APP_ENV=local`; the supervisor strips inherited bootstrap database credentials before starting children. Services register signals before startup, pass cancellation to initialization, drain before close and bound shutdown to ten seconds. The supervisor uses direct source processes so a failed listener stops the stack; it owns source reload and process-group cleanup.

React owns explicit renderer activation, async-import cancellation and disposal. Babylon owns its scene, render loop and ResizeObserver, including idempotent cleanup and failed initialization cleanup. Synthetic neutral geometry is the only asset. Rendering is opt-in; accessible semantic controls remain independent of WebGL.

## Alternatives and evidence

- Installing all 61 anticipated libraries at the root would blur ownership and introduce unused runtime/build dependencies. Nine actual workspace projects install with frozen lockfile and strict peers instead.
- Duplicating Fastify diagnostics and shutdown in each app risks divergent readiness/drain behavior. Shared service-runtime tests exercise one typed implementation; independent built-process tests verify deployment boundaries.
- A static import-name denylist alone missed path aliases and emitted asset bytes. Resolver/ownership checks and negative Vite probes reject module, JS asset, CSS asset and HTML leakage before bundling.
- Node watch wrappers can remain alive after listener failure. The direct-process supervisor's occupied-port regression exits the stack with failure while preserving the pre-existing listener.
- Awaiting initialization before handling shutdown left a pending-startup reproduction alive after SIGTERM. The cancellation regression now calls cleanup and exits successfully without waiting for startup completion.

## Consequences and limits

This adds no match commands, game rules, jobs, auth, migrations, rewards or economic operations. Default local health/readiness describes foundation process lifecycle only. The lazy renderer chunk remains about 1.08 MB minified / 262 KB gzip and produces a Vite warning; device floors and performance budgets require later qualification. NullEngine, Linux software WebGL, Windows desktop checks and real touch devices must be reported separately. The Dockerfile persists browser test libraries; apt packages remain repository-resolved as stated in ADR 0001, not immutable production images.

See [validation evidence](../validation/boot-01.md) for exact runs, review corrections and limitations. BOOT-02/03/05 retain their independent acceptance gates.

## Audited development-process cleanup correction

The documentation audit exposed Vite surviving its pnpm leader after a clean-checkout busy-port test. Waiting only for the leader and canceling escalation did not prove group cleanup. Keep group ownership until Linux /proc confirms no executable descendants, share overlapping cleanup promises, and use bounded monotonic grace/SIGKILL checks. Real descendant regressions cover both exiting and already-exited leaders. Actual RUN-033 failure and CHG-20261006-005 retain the finding and source-matched correction evidence; this does not change game authority or device acceptance.
