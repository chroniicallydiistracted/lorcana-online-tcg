# PLAY-02 viewer privacy implementation plan

The Director assigned implementation inline after ending clock work. Native repository documentation/evidence conventions take precedence over personal plan tooling. Spec: ADR0014 and blueprint §§6.2/6.4/7.5/13. Preserve Node24.21.0, pnpm10.33.0, exact lockfile, all engine patches and database data. No further clock mutation.

## Interfaces and review focus

Contracts produce ViewerProjection/serialization consumed by server projection, worker and committed read API. Kernel inspection is a private adapter friend; no Lab RPC exports it. Projector produces DTO plus internal current-reference resolution. Persistence forwards projection/resolution; workers expose projection-only replies. Match service validates participant and exact retained pins before read. Shared-interface ruling: keep protocol1's counts-only schema unchanged; the new DTO is explicitly independent until PLAY-03.

Review adversarial extra fields/getters, hidden mixed identities/order, face-down inkwell and under-cards, stale/cross-player references, reveal expiry/private recipients and event/log payloads. Repeated reads must not change checkpoints or consume randomness. Unsupported effects must fail closed, not fall back to raw engine views.

## Task 1 — Closed DTO and explicit projector

Files: packages/contracts/src/viewer.ts; packages/engine-adapter/src/viewer.ts; their tests; package export surface. Write mixed synthetic privacy fixtures first and observe the missing projector fail. Implement allowlisted cards/zones/resources/events and bounded public codecs. Expected: opponent hand/deck/front/seed never appears in encoded bytes; own hand and permitted public/revealed fronts do. Test malformed values and representative CR2.2/2.3 visibility policies.

## Task 2 — Private engine and committed read integration

Files: vendor/tcg-engines/src/kernel.ts/.d.ts; adapter replay/persistence; apps/match-service worker/executor/service; adapter/unit/database tests. Write integration failures before implementation. Add private inspection friend and revision-scoped references; reproduce them after exact checkpoint recovery. Add bounded projection-only worker responses and participant-only committed reads. Test authorization, pins, read-only storage and workers. No public match handler is added.

## Task 3 — Noninterference and output-path proof

Files: tests/play/privacy tests and fixtures, CI stage coverage, boundary/bundle checks. Exercise actual serialized bytes with independent HTTP clients in an owned test fixture. Vary hidden card identity/order/private logs/effects while public inputs remain equal, and distinguish legitimate reveal/draw/count consequences. Check reference rotation and failed lookup before authoritative validation. Run fresh scoped and full foundation, existing real DB, engine, browser and artifact checks sequentially. Preserve any clock-rejected receipt and its child result.

## Task 4 — Review and native closure

Obtain an independent critical privacy review, resolve findings with regressions, then update all affected current documents, source-impact mapping, feature/task/requirement status, uniform CHG004 and exact native evidence. Historical/archival evidence remains immutable. Prepare a coherent local reviewable commit; no publication/merge/deployment is assigned.

## Progress

- [x] Intake and unchanged container baseline: RUN-20261014-023 passed.
- [x] Closed DTO/projector regression cycle.
- [x] Committed projection/reference recovery integration.
- [x] Behavioral/bundle/database/browser and source-only clean evidence: final RUN056/057/058/059 pass. Earlier RUN047/048/049 are prior-source checkpoints; isolated RUN051 child stages passed but receipt clock-rejected. Keep timing gate pending.
- [x] Independent review, review-driven regressions and owner documentation corrections; final preservation RUN062 and native closure recorded with CHG004.
