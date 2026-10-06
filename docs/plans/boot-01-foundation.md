# BOOT-01 implementation contract (historical plan)

Director assignment: 5 October 2026, America/Phoenix. Baseline: main 335da7e; clean at takeover. Branch: codex/boot-01-foundation.

Implement the approved blueprint package ownership with four executable apps. Contracts expose only typed foundation health/readiness. Presentation owns a synthetic WebGL scene; React owns semantic controls and cleanup. A small server-only service-runtime package owns reusable HTTP diagnostics and bounded signal shutdown. Engine-adapter, rules-data, domain, db and testkit remain explicitly reserved until their dependent tasks.

1. Preserve the existing bootstrap checks; establish container and DB baseline.
2. Add exact scoped manifests, strict TypeScript and ordered package builds.
3. Write failing contract, lifecycle, scene and forbidden-import checks, then implement them.
4. Add React/Vite web with lazy synthetic renderer, semantic controls and same-origin diagnostic proxy; API 3001, match 3002, worker no ingress.
5. Enforce workspace dependency/import ownership, resolved paths and public/browser reachability. Prove rejection using temporary negative fixtures and actual Vite build rejection.
6. Run frozen install in a clean source copy, builds, typecheck/lint/tests, continued bootstrap/DB checks, lifecycle processes and browser automation. Inspect the actual PC desktop browser separately if available.
7. Record ADR, pins/build-script review, qualification evidence and partial original-requirement mapping; commit reviewable work without merging main or deploying.

BOOT-01 acceptance does not imply BOOT-02, BOOT-03, BOOT-05, rules, auth, complete renderer quality, gameplay or device acceptance. Synthetic geometry only; no source/card/art reuse at this milestone. Archive hashes remain original archive provenance.

## Recorded outcome

Technical foundation steps were implemented in reachable commit `8c94b274ebd6ad91223cdb6df085ca0597c107c9`; see [evidence](../validation/boot-01.md). The requested real Windows foundation smoke remains pending by the Director's 2026-10-06 update. This plan records the original assignment; use the current handoff and task register for present execution state.
