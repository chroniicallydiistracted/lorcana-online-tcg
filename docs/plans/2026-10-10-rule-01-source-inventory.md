# RULE-01 source and coverage inventory implementation plan

> For agentic workers: execute this plan natively, task by task. The Director has authorized beginning RULE-01 and autonomous routine implementation; approval is needed only for an actual unresolved Director decision. Follow the repository documentation/evidence contracts.

**Goal:** Acquire and fingerprint current official rules/policy/source bytes; produce a reproducible rules-difference, English identity/printing/release-state and upstream skipped-test inventory with explicit denominators and gaps.

**Architecture:** Research artifacts and metadata live under `docs/rules/`; raw third-party bytes live in ignored `.local/rule-01/`. Node-only inventory tools are development tools, never imported by the apps or public contracts. `rules-data` and `engine-adapter` stay reserved for their product implementations. Original planning registers and sealed evidence are preserved.

**Tech stack:** Existing Node24.21.0/pnpm10.33.0, TypeScript6.0.3 AST parser and Node test runner; exact pinned Mozilla PDF.js6.4.299 as a root development tool for document text extraction. No upstream installation or engine execution in this task.

**Spec:** `docs/vision/initial_backlog.csv` RULE-01; blueprint §6; ADR0008; `docs/policies/fan-content.md`; universal workflow/change format.

## Global constraints

- Preserve 548 original IDs, 33 groups and optional requirements; inventory acceptance accepts no gameplay requirement.
- Source roles determine authority. Keep mechanics, tournament/format policy, errata and scenario rules separate. Listing/retrieval/effective dates are distinct; future rules/content remain scheduled.
- Retain upstream pin53a79413c58678b1c50dde57e71de5c123132716. Incomplete/truncated trees cannot supply completeness denominators.
- Separate physical printings, provisional full-English-name identities, official reveal/release status, upstream definitions/test declarations and project certification. No launch-catalog admission.
- No credentials/private state, bulk art imports, payments, deployment, main integration or upstream code execution. The Director's accepted hosting and asset choices remain.

## Review focus

- Published future documents and revealed cards must not be labeled effective/released merely because retrieved.
- Reprints, enchanted variants, promos and cooperative enemy cards must not inflate identity counts or gain constructed eligibility.
- Skipped parent suites, parameterized/conditional declarations, `.only`, aliases and commented-out text must not turn static counts into executed test claims.
- A truncated GitHub tree or a missing source must fail completeness checks rather than silently shrink a denominator.
- Stale hashes, wrong content types and raw HTML error pages must never qualify as acquired rules PDFs.

## Task 1: Source acquisition and dated rules comparison

Files: `scripts/rules/sources.mjs`, `docs/rules/2026-10-10-sources.json`, `docs/rules/2026-10-10-rules-diff-v2.json`, `docs/rules/README.md`, root manifest/lockfile and the change record.

Consumes explicit HTTPS URLs discovered from official resources, current product pages and the pinned upstream Git tree. Produces bytes/digests/timestamps, PDF page/text digests, source-role/version/effective/listing metadata and gap records. `acquireSources(specs, cacheRoot)` uses bounded public GETs and records failures. `extractPdf(bytes)` returns page texts without executing document scripts. Comparison uses normalized numbered-rule hashes; record added/removed/changed identifiers and interpretation limits rather than copying complete copyrighted text.

- [x] Add failing synthetic tests for wrong PDF bytes, altered digests, future effective dates and missing sources.
- [x] Pin the compatible tool-only PDF extractor with no lifecycle-script allowances; preserve frozen install and inspect its license/optional dependencies.
- [x] Acquire official resources, previous/current CR, tournament policy, Pack Rush, Coconut rules/supplement, current set notes and cooperative-product instructions when discoverable. Discover regional language links; English is the first inventory locale, not the entire localization acceptance.
- [x] Extract/read metadata and relevant changes. Store full raw text/PDFs only in ignored research cache. Commit hashes and concise interpretation/change references; explicitly flag unavailable notes/documents.

## Task 2: Catalog and pinned upstream test inventory

Files: `scripts/rules/inventory.mjs`, `tests/rules/inventory.test.mjs`, `docs/rules/2026-10-10-catalog.json`, `docs/rules/2026-10-10-upstream-tests.json`, `docs/validation/rule-01.md`, runbook, feature/register/index/map/handoff updates.

`catalogInventory(cards, sets, asOf)` produces provisional identity groups, printing records, source-derived set release states and counts. `testDeclarations(file, text)` uses TypeScript AST, inherits suite skip/only/conditional state and reports parameterized declarations separately from expanded runtime cases. `checkInventory(snapshot)` validates uniqueness, denominators, source references, hashes and no certification/admission claims. These interfaces use plain data and never import upstream definitions.

- [x] Write failing synthetic fixtures for reprints/promos/enemy cards, revealed-vs-released dates, inherited skip/todo/only/each and a truncated tree.
- [x] Acquire current LorcanaJSON published data/metadata as community catalog evidence; retain its provenance/limits and official product-date references. Inspect public official gallery availability separately.
- [x] Traverse complete scoped pinned Git trees, then acquire relevant card/test files without importing them. Record file/blob hashes, set and definition totals, modifiers/todo gaps and matched/unmatched identities with clear denominators.
- [x] Verify deterministic offline regeneration and corruption/negative checks. Integrate the inventory check/tests in ordinary root verification without a network dependency.
- [x] Update every affected current document, map, feature/task status, changelog and handoff. Requalify the final whole executable fingerprint with foundation checks; preserve failed runs. Keep missing documents and RULE-02/03/04 prerequisites visible.

## Completion

RULE-01 may close when each acceptance element has inspectable current evidence and explicit source/completeness gaps. Missing material blocks certification/admission of affected content, rather than inventing coverage. D04 launch scope follows this inventory; no launch decision is requested merely to count sources. Capture actual execution inside the existing Dev Container and keep local/headless/Windows/provider categories separate.

Checkpoint: RUN039 passes19 focused regressions, all acquired source/text hashes and exact deterministic regeneration. Missing notes/scenario/localized material is flagged explicitly in validation. Full foundation/clean-source proof, final documentation sync and commit remain pending. Initial empty rules diff and every failed run remain preserved.

Completion evidence: RULE-01 inventory acceptance verified with explicit gaps. RUN040 and RUN20261011-002 pass existing/clean frozen foundation113; RUN001 passes203-component dependency/advisory and full-history supported secret gates; RUN003 proves protected scope/config/private status, no app listeners and same final source/cached bytes/regeneration. New headless/device/upstream/hosting evidence is outside this scope. Final docs/canonical-byte/commit closure is recorded by CHG008.

Canonical closure RUN20261011-004 passes677 staged/live file bytes, current/canonical docs/config/inventory and focused19. Finalize the completed inventory record and use Git to identify its containing local commit; no publish/merge authorization is inferred for this task.
