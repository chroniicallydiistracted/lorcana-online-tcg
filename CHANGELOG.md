# Changelog

Generated from versioned records in docs/changes. Use docs/CHANGELOG_FORMAT.md; edit records, then run pnpm docs:sync. UTC is canonical; project display timezone is America/Phoenix. Historical imports do not invent test times.

## CHG-20261012-001 — RULE-03 secure per-match randomness and private deterministic replay

- Status: finalized
- Actor: Codex architect/developer/QA
- Recorded (UTC): 2026-10-12T04:57:35.971Z
- Event: unknown; recorded retrospectively (recorded_only)
- Source: f61aad853e80135827ec45ba815f9da79c9eebb0
- Tasks: RULE-03, DOC-01, DOC-02
- Features: F-ENGINE, F-BOUNDARIES, F-CI, F-RELEASE, F-DOCS
- Requirements: R01.018, R15.009, R28.008, R29.003, R29.004, R29.005, R32.011

### Changes

- **review:** Read RULE-03 architecture/backlog/audit/source contracts; actual main f61aad8 clean at intake, Director reports RULE-02 audited/merged/passing. RULE-03 baseline captured in RUN001.
- **revision:** Director restricts completed-match seed and full private replay access to participants/authorized auditors. No user-facing delivery or public disclosure in this task.
- **edit:** Recorded disclosure decision under D10; initial draft preparation refused existing D08, preserving D08/D09 and all prior Director choices.
- **implementation:** Add server-only256-bit crypto seed/indexed HMAC source, per-match pure kernel injection and captured-clock private replay with trusted digest;28 reproduced fork patches,347 files,27 unchanged suites. Verification in progress.
- **fix:** Retain RUN004 compiled raw-suite-legacy guard failure; compile-time compatibility activation removed from product bytes. RUN005 pure kernel passed but TypeScript6 requires explicit Node types; owning tsconfig corrected. A descriptor newline edit was refused before upstream writes, then corrected/reproduced.
- **function:** Implement createQualificationMatch without caller seed; indexed HMAC provider, private completed export/reconstruction, framed compiled executable identity, bounded validation/attempt/outcome/state journal and rollback/disposal.
- **test:** Preserve all red/failed checkpoints and source-matched corrected tests, including entropy failure, integer bias, immutable completion, journal rollback, semantic tamper, post-shuffle retry, built-kernel mutation and partition identity, crypto/global/module aliases and browser/private RPC rejection.
- **fix:** Independent review corrected compiled-kernel identity omission/unframed concatenation and ambient entropy/server loader bypasses. RUN015/016 retained harmless card/performance guard false positives; RUN017 invalid duplicate-ID fixture corrected. No inherited upstream assertion was changed.
- **documentation:** Update all relevant current package/runbook/ADR/qualification/task/requirement/feature/index documents; append source-specific continuations without rewriting sealed evidence. Preserve548/33/20, original planning/provenance and BOOT-04/D07 choices; record D10 restricted private replay disclosure.
- **review:** Auxiliary process-list inspection failed because ps is absent from the existing image; no manual tool install/change. Actual final process/listener proof uses Linux proc files. Unknown exploratory execution times remain unknown.
- **revision:** Director explicitly chooses to leave the environment unchanged and retain RULE-03 as implemented with isolated CI timing qualification pending. No Windows/WSL/Docker/time/driver/threshold change; no passing CI receipt/artifact inferred from child exit0.
- **review:** Fresh independent read-only reviewer confirms no unresolved Critical/Important source or semantic-doc findings at final fingerprint; ad-hoc independent HMAC70/vector/identity/rollback/guard/pin probes supplement retained receipts. Declines future official/auth/privacy/durable/device/production scope; explicit CI timing deferral honored.
- **test:** Final source2e6c4734: frozen/full141 project checks+338 unchanged upstream passes/1 inherited skip+2 owned Bun; exact pin28patches; six Chromium foundation scenarios/two workers; clean source and canonical1309 live-equal files; private/history/scope/log316/actual cleanup passed. RUN028/029 timing-rejected despite complete child stages; no artifact published; final semantic/static033 passed.
- **revision:** Final documentation update was not executed when automatic approval review hit a usage limit. Director requested continuation; resumed inspection confirms unchanged source/branch/HEAD and preserved containers. No approval check was bypassed, no environment/clock change, and all failed CI evidence is retained.
- **fix:** RUN034 preserves final-gate failure: native reported disposition requires an actual manual-device run. Correct non-recorder independent review/WSL host observations to historical attribution, without inventing device/process timing or changing schema/gates; source remains2e6c4734.

### Verification

- **passed:** RULE-03 intake: actual pinned toolchain/static workspace/bootstrap/authenticated PostgreSQL baseline ([evidence](docs/validation/runs/RUN-20261012-001.json))
- **failed:** RED: indexed secret server stream and completed deterministic replay do not exist yet ([evidence](docs/validation/runs/RUN-20261012-002.json))
- **failed:** RED: whole selected upstream source still has ambient shuffle/identifier/randomness fallbacks ([evidence](docs/validation/runs/RUN-20261012-003.json))
- **failed:** First secure RNG integration: frozen graph, pure kernel/Node adapter builds, actual secret/replay tests and unchanged upstream suites ([evidence](docs/validation/runs/RUN-20261012-004.json))
- **failed:** Corrected production compatibility removal, kernel/Node secure RNG/replay and unchanged upstream regression qualification ([evidence](docs/validation/runs/RUN-20261012-005.json))
- **passed:** Explicit Node types, secure source/replay execution, whole-source entropy guards and unchanged upstream suites ([evidence](docs/validation/runs/RUN-20261012-006.json))
- **failed:** RED: completed private archive must remain fixed after late submissions; semantic tampering must reject ([evidence](docs/validation/runs/RUN-20261012-007.json))
- **passed:** Completed archive freeze, speculative journal rollback, live secrecy and strict semantic replay reconstruction tests ([evidence](docs/validation/runs/RUN-20261012-008.json))
- **failed:** RED: AST entropy/import-alias guard is missing; direct-token scanning is insufficient ([evidence](docs/validation/runs/RUN-20261012-009.json))
- **failed:** RED: server kernel permission must not authorize a browser resolver edge ([evidence](docs/validation/runs/RUN-20261012-010.json))
- **failed:** AST entropy/alias and browser isolation fixes, controlled clock/provider tests, entropy failure and actual Lab build regressions ([evidence](docs/validation/runs/RUN-20261012-011.json))
- **passed:** Correct source-kind parsing: entropy/alias guards, captured clocks, secure replay, browser/server boundaries and Lab regressions ([evidence](docs/validation/runs/RUN-20261012-012.json))
- **failed:** RED review regressions: compiled kernel identity and alternate ambient entropy sources ([evidence](docs/validation/runs/RUN-20261012-013.json))
- **failed:** RED review regression: aliased CommonJS server loaders bypass engine facade ([evidence](docs/validation/runs/RUN-20261012-014.json))
- **failed:** Review corrections: compiled identity, entropy and loader guards, actual post-draw rollback and private replay ([evidence](docs/validation/runs/RUN-20261012-015.json))
- **failed:** Corrected guard preserves card require methods and performance-only global aliases; replay/security regressions ([evidence](docs/validation/runs/RUN-20261012-016.json))
- **failed:** Review correction recheck with static safe telemetry key, actual identity/stream rollback and lint ([evidence](docs/validation/runs/RUN-20261012-017.json))
- **passed:** Correct unique synthetic identifiers for post-draw rollback regression; review corrections and lint ([evidence](docs/validation/runs/RUN-20261012-018.json))
- **failed:** RED follow-up guard regression: assigned and forward-declared global aliases ([evidence](docs/validation/runs/RUN-20261012-019.json))
- **failed:** RED exact executable identity framing regression ([evidence](docs/validation/runs/RUN-20261012-020.json))
- **failed:** RED standard CommonJS module.require member bypass regression ([evidence](docs/validation/runs/RUN-20261012-021.json))
- **passed:** Final review regression checks: framed actual identity, fixed-point global aliases, CommonJS members and post-draw rollback ([evidence](docs/validation/runs/RUN-20261012-022.json))
- **passed:** Independent engine roots: modified server, Lab, kernel and provenance rejected despite outer rehash ([evidence](docs/validation/runs/RUN-20261012-023.json))
- **passed:** Final frozen complete foundation/build/type/lint/Node/upstream/injection/governance and preserved doctor/database ([evidence](docs/validation/runs/RUN-20261012-024.json))
- **passed:** Exact pinned upstream payload, 28 patch originals/descriptors, notices and lock reproduction ([evidence](docs/validation/runs/RUN-20261012-025.json))
- **passed:** Actual Linux Chromium foundation six scenarios plus two synthetic workers; private replay/stream RPC rejected ([evidence](docs/validation/runs/RUN-20261012-026.json))
- **passed:** Final source-only frozen install/full foundation, no private files/Git/build input; verified tooling cache may be reused ([evidence](docs/validation/runs/RUN-20261012-027.json))
- **failed:** Actual isolated BOOT-03 pipeline: frozen foundation, live PostgreSQL, Linux browser, dependency/secret scans and artifacts ([evidence](docs/validation/runs/RUN-20261012-028.json))
- **failed:** Actual isolated BOOT-03 pipeline: frozen foundation, live PostgreSQL, Linux browser, dependency/secret scans and artifacts ([evidence](docs/validation/runs/RUN-20261012-029.json))
- **passed:** Read-only three-clock diagnostic after two isolated timestamp rejections; no time or policy changes ([evidence](docs/validation/runs/RUN-20261012-030.json))
- **passed:** Canonical staged Git archive equals live files; frozen install and full foundation; retained exact verification program ([evidence](docs/validation/runs/RUN-20261012-031.json))
- **passed:** Final actual private/source/history/log/scope/archive/listener preservation; exact checker retained in command arguments ([evidence](docs/validation/runs/RUN-20261012-032.json))
- **passed:** Final semantic-doc/source/negative import/offline engine and rules/JSON/JS gate; CI timing remains explicitly deferred ([evidence](docs/validation/runs/RUN-20261012-033.json))
- **failed:** Resumed sealed static/docs/pinned doctor/read-only PG/history/private and all staged-live bytes; CI timing deferred ([evidence](docs/validation/runs/RUN-20261012-034.json))
- **historical:** Fresh independent read-only assessment: no unresolved Critical/Important source/core/doc finding; no mutation or broader acceptance; CI timing deferred by Director. Attributed non-recorder observation, recorded during this task; detailed exploratory execution times unknown, no passing-run or device verdict. ([evidence](docs/reviews/2026-10-12-rule-03-closure.md))
- **historical:** Read-only attributed WSL Docker inspection: both CI project resources/image tags absent; original healthy PG18 volume/private network and Linux source bind preserved. Attributed non-recorder observation, recorded during this task; detailed exploratory execution times unknown, no passing-run or device verdict. ([evidence](docs/validation/rule-03-host-closure.json))
- **passed:** Corrected sealed final docs/static/pinned doctor/read-only original PostgreSQL, all1318 staged/live bytes and full-history/private scan; source unchanged, CI timing deferred. ([evidence](docs/validation/runs/RUN-20261012-035.json))

### Documentation and files

- **updated:** [AGENTS.md](AGENTS.md) — Compared current engine/RNG/private replay signatures, ownership, scoped prerequisites and actual checkpoint results; updated current text with D10 and explicit later gates, preserving dated executed history.
- **updated:** [README.md](README.md) — Compared current engine/RNG/private replay signatures, ownership, scoped prerequisites and actual checkpoint results; updated current text with D10 and explicit later gates, preserving dated executed history.
- **reviewed_unchanged:** [docs/CHANGELOG_FORMAT.md](docs/CHANGELOG_FORMAT.md) — Schema1 change/run/time/redaction/sealing and manual-device conventions unchanged; new RULE-03 commands are captured through the same native recorder.
- **reviewed_unchanged:** [docs/DEVELOPMENT_WORKFLOW.md](docs/DEVELOPMENT_WORKFLOW.md) — Intake/semantic review, matched evidence, canonical bytes, local gates and authorization remain valid; RULE-03 uses them without a new integration/deployment privilege.
- **updated:** [docs/FEATURES.md](docs/FEATURES.md) — Compared current engine/RNG/private replay signatures, ownership, scoped prerequisites and actual checkpoint results; updated current text with D10 and explicit later gates, preserving dated executed history.
- **updated:** [docs/HANDOFF.md](docs/HANDOFF.md) — Compared current engine/RNG/private replay signatures, ownership, scoped prerequisites and actual checkpoint results; updated current text with D10 and explicit later gates, preserving dated executed history.
- **updated:** [docs/README.md](docs/README.md) — Compared current engine/RNG/private replay signatures, ownership, scoped prerequisites and actual checkpoint results; updated current text with D10 and explicit later gates, preserving dated executed history.
- **updated:** [docs/WORKSPACE_QUALIFICATION.md](docs/WORKSPACE_QUALIFICATION.md) — Compared current engine/RNG/private replay signatures, ownership, scoped prerequisites and actual checkpoint results; updated current text with D10 and explicit later gates, preserving dated executed history.
- **updated:** [docs/adr/0001-local-development-environment.md](docs/adr/0001-local-development-environment.md) — Compared current engine/RNG/private replay signatures, ownership, scoped prerequisites and actual checkpoint results; updated current text with D10 and explicit later gates, preserving dated executed history.
- **updated:** [docs/adr/0002-application-foundation.md](docs/adr/0002-application-foundation.md) — Compared current engine/RNG/private replay signatures, ownership, scoped prerequisites and actual checkpoint results; updated current text with D10 and explicit later gates, preserving dated executed history.
- **reviewed_unchanged:** [docs/adr/0003-documentation-evidence.md](docs/adr/0003-documentation-evidence.md) — No governance schema or recorder implementation change; existing UTC/monotonic/digest/seal rules still govern private RNG work.
- **reviewed_unchanged:** [docs/adr/0004-restricted-local-database.md](docs/adr/0004-restricted-local-database.md) — Private RNG/journal is in-process only; no SQL/role/grant change, DB connection or production recovery claim.
- **updated:** [docs/adr/0005-ci-artifact-qualification.md](docs/adr/0005-ci-artifact-qualification.md) — Compared current engine/RNG/private replay signatures, ownership, scoped prerequisites and actual checkpoint results; updated current text with D10 and explicit later gates, preserving dated executed history.
- **updated:** [docs/adr/0006-protocol-release-contracts.md](docs/adr/0006-protocol-release-contracts.md) — Compared current engine/RNG/private replay signatures, ownership, scoped prerequisites and actual checkpoint results; updated current text with D10 and explicit later gates, preserving dated executed history.
- **reviewed_unchanged:** [docs/adr/0007-hosting-provider-baseline.md](docs/adr/0007-hosting-provider-baseline.md) — OVHcloud/Cloudflare/$25/region/recovery selection unchanged; no infrastructure provision/deploy/purchase follows from RNG qualification.
- **updated:** [docs/adr/0008-engine-placement-dependency-baseline.md](docs/adr/0008-engine-placement-dependency-baseline.md) — Compared current engine/RNG/private replay signatures, ownership, scoped prerequisites and actual checkpoint results; updated current text with D10 and explicit later gates, preserving dated executed history.
- **updated:** [docs/adr/0009-pinned-engine-qualification.md](docs/adr/0009-pinned-engine-qualification.md) — Compared current engine/RNG/private replay signatures, ownership, scoped prerequisites and actual checkpoint results; updated current text with D10 and explicit later gates, preserving dated executed history.
- **updated:** [docs/adr/0010-secure-randomness-replay.md](docs/adr/0010-secure-randomness-replay.md) — Compared current engine/RNG/private replay signatures, ownership, scoped prerequisites and actual checkpoint results; updated current text with D10 and explicit later gates, preserving dated executed history.
- **updated:** [docs/audits/2026-10-06-project-audit.md](docs/audits/2026-10-06-project-audit.md) — Compared current engine/RNG/private replay signatures, ownership, scoped prerequisites and actual checkpoint results; updated current text with D10 and explicit later gates, preserving dated executed history.
- **reviewed_unchanged:** [docs/contracts/protocol.md](docs/contracts/protocol.md) — Public revision1 shapes and bounded transport remain unchanged; private replay/seed types are server-only and not new wire frames.
- **updated:** [docs/contracts/release.md](docs/contracts/release.md) — Compared current engine/RNG/private replay signatures, ownership, scoped prerequisites and actual checkpoint results; updated current text with D10 and explicit later gates, preserving dated executed history.
- **updated:** [docs/documentation-map.json](docs/documentation-map.json) — Compared current engine/RNG/private replay signatures, ownership, scoped prerequisites and actual checkpoint results; updated current text with D10 and explicit later gates, preserving dated executed history.
- **updated:** [docs/features.json](docs/features.json) — Compared current engine/RNG/private replay signatures, ownership, scoped prerequisites and actual checkpoint results; updated current text with D10 and explicit later gates, preserving dated executed history.
- **reviewed_unchanged:** [docs/plans/2026-10-06-boot-02-database.md](docs/plans/2026-10-06-boot-02-database.md) — Completed scoped database plan and its source-specific receipts retained; RULE-03 does not implement durable match persistence.
- **updated:** [docs/plans/2026-10-06-documentation-governance.md](docs/plans/2026-10-06-documentation-governance.md) — Compared current engine/RNG/private replay signatures, ownership, scoped prerequisites and actual checkpoint results; updated current text with D10 and explicit later gates, preserving dated executed history.
- **updated:** [docs/plans/2026-10-07-boot-03-ci.md](docs/plans/2026-10-07-boot-03-ci.md) — Compared current engine/RNG/private replay signatures, ownership, scoped prerequisites and actual checkpoint results; updated current text with D10 and explicit later gates, preserving dated executed history.
- **updated:** [docs/plans/2026-10-07-boot-05-contracts.md](docs/plans/2026-10-07-boot-05-contracts.md) — Compared current engine/RNG/private replay signatures, ownership, scoped prerequisites and actual checkpoint results; updated current text with D10 and explicit later gates, preserving dated executed history.
- **updated:** [docs/plans/2026-10-10-boot-04-decision-worksheet.md](docs/plans/2026-10-10-boot-04-decision-worksheet.md) — Compared current engine/RNG/private replay signatures, ownership, scoped prerequisites and actual checkpoint results; updated current text with D10 and explicit later gates, preserving dated executed history.
- **updated:** [docs/plans/2026-10-12-rule-03-randomness-replay.md](docs/plans/2026-10-12-rule-03-randomness-replay.md) — Compared current engine/RNG/private replay signatures, ownership, scoped prerequisites and actual checkpoint results; updated current text with D10 and explicit later gates, preserving dated executed history.
- **reviewed_unchanged:** [docs/policies/fan-content.md](docs/policies/fan-content.md) — Director D07/no-charge/provenance/notice/takedown obligations preserved; this task uses synthetic fixtures and imports no official assets.
- **updated:** [docs/reviews/2026-10-12-rule-03-closure.md](docs/reviews/2026-10-12-rule-03-closure.md) — Compared current engine/RNG/private replay signatures, ownership, scoped prerequisites and actual checkpoint results; updated current text with D10 and explicit later gates, preserving dated executed history.
- **updated:** [docs/rules/README.md](docs/rules/README.md) — Compared current engine/RNG/private replay signatures, ownership, scoped prerequisites and actual checkpoint results; updated current text with D10 and explicit later gates, preserving dated executed history.
- **reviewed_unchanged:** [docs/rules/source-specs-supplement.json](docs/rules/source-specs-supplement.json) — Supplemented dated source gaps/URLs remain unchanged; CR2.3/set14 admission cannot follow from RNG proofs.
- **reviewed_unchanged:** [docs/rules/source-specs.json](docs/rules/source-specs.json) — Dated acquisition inputs/URLs remain unchanged; source inventories not reacquired or promoted to gameplay certification.
- **updated:** [docs/runbooks/ci.md](docs/runbooks/ci.md) — Compared current engine/RNG/private replay signatures, ownership, scoped prerequisites and actual checkpoint results; updated current text with D10 and explicit later gates, preserving dated executed history.
- **reviewed_unchanged:** [docs/runbooks/database.md](docs/runbooks/database.md) — No provisioning/migration operation added; original restricted targets/data and disposable proof workflow retained.
- **updated:** [docs/runbooks/engine.md](docs/runbooks/engine.md) — Compared current engine/RNG/private replay signatures, ownership, scoped prerequisites and actual checkpoint results; updated current text with D10 and explicit later gates, preserving dated executed history.
- **updated:** [docs/runbooks/workspace-setup.md](docs/runbooks/workspace-setup.md) — Compared current engine/RNG/private replay signatures, ownership, scoped prerequisites and actual checkpoint results; updated current text with D10 and explicit later gates, preserving dated executed history.
- **reviewed_unchanged:** [docs/schemas/change.schema.json](docs/schemas/change.schema.json) — Reviewed schema1 fields against native records; no schema/format/protocol migration and all earlier evidence remains valid.
- **reviewed_unchanged:** [docs/schemas/documentation-map.schema.json](docs/schemas/documentation-map.schema.json) — Reviewed schema1 fields against native records; no schema/format/protocol migration and all earlier evidence remains valid.
- **reviewed_unchanged:** [docs/schemas/features.schema.json](docs/schemas/features.schema.json) — Reviewed schema1 fields against native records; no schema/format/protocol migration and all earlier evidence remains valid.
- **reviewed_unchanged:** [docs/schemas/run.schema.json](docs/schemas/run.schema.json) — Reviewed schema1 fields against native records; no schema/format/protocol migration and all earlier evidence remains valid.
- **reviewed_unchanged:** [docs/schemas/state.schema.json](docs/schemas/state.schema.json) — Reviewed schema1 fields against native records; no schema/format/protocol migration and all earlier evidence remains valid.
- **reviewed_unchanged:** [docs/templates/change.json](docs/templates/change.json) — Schema1 template still records complete scope/file/doc/evidence/time fields; no private seeds or replay payloads belong in records.
- **reviewed_unchanged:** [docs/templates/handoff.md](docs/templates/handoff.md) — Existing nine intake/behavior/docs/evidence/resource/gate/next-action sections remain sufficient; current RULE-03 handoff uses them.
- **updated:** [docs/validation/boot-01.md](docs/validation/boot-01.md) — Compared current engine/RNG/private replay signatures, ownership, scoped prerequisites and actual checkpoint results; updated current text with D10 and explicit later gates, preserving dated executed history.
- **updated:** [docs/validation/boot-02.md](docs/validation/boot-02.md) — Compared current engine/RNG/private replay signatures, ownership, scoped prerequisites and actual checkpoint results; updated current text with D10 and explicit later gates, preserving dated executed history.
- **updated:** [docs/validation/boot-03.md](docs/validation/boot-03.md) — Compared current engine/RNG/private replay signatures, ownership, scoped prerequisites and actual checkpoint results; updated current text with D10 and explicit later gates, preserving dated executed history.
- **updated:** [docs/validation/boot-04.md](docs/validation/boot-04.md) — Compared current engine/RNG/private replay signatures, ownership, scoped prerequisites and actual checkpoint results; updated current text with D10 and explicit later gates, preserving dated executed history.
- **updated:** [docs/validation/boot-05.md](docs/validation/boot-05.md) — Compared current engine/RNG/private replay signatures, ownership, scoped prerequisites and actual checkpoint results; updated current text with D10 and explicit later gates, preserving dated executed history.
- **updated:** [docs/validation/rule-01.md](docs/validation/rule-01.md) — Compared current engine/RNG/private replay signatures, ownership, scoped prerequisites and actual checkpoint results; updated current text with D10 and explicit later gates, preserving dated executed history.
- **updated:** [docs/validation/rule-02.md](docs/validation/rule-02.md) — Compared current engine/RNG/private replay signatures, ownership, scoped prerequisites and actual checkpoint results; updated current text with D10 and explicit later gates, preserving dated executed history.
- **updated:** [docs/validation/rule-03-canonical-check.mjs.txt](docs/validation/rule-03-canonical-check.mjs.txt) — Compared current engine/RNG/private replay signatures, ownership, scoped prerequisites and actual checkpoint results; updated current text with D10 and explicit later gates, preserving dated executed history.
- **updated:** [docs/validation/rule-03-host-closure.json](docs/validation/rule-03-host-closure.json) — Compared current engine/RNG/private replay signatures, ownership, scoped prerequisites and actual checkpoint results; updated current text with D10 and explicit later gates, preserving dated executed history.
- **updated:** [docs/validation/rule-03.md](docs/validation/rule-03.md) — Compared current engine/RNG/private replay signatures, ownership, scoped prerequisites and actual checkpoint results; updated current text with D10 and explicit later gates, preserving dated executed history.
- **updated:** [docs/vision/README.md](docs/vision/README.md) — Compared current engine/RNG/private replay signatures, ownership, scoped prerequisites and actual checkpoint results; updated current text with D10 and explicit later gates, preserving dated executed history.
- **reviewed_unchanged:** [docs/vision/additional_scope.csv](docs/vision/additional_scope.csv) — X01–X07 retained with DOC-01/02 universal obligations; no scope expansion/removal in this task.
- **updated:** [docs/vision/decision_register.csv](docs/vision/decision_register.csv) — Compared current engine/RNG/private replay signatures, ownership, scoped prerequisites and actual checkpoint results; updated current text with D10 and explicit later gates, preserving dated executed history.
- **updated:** [docs/vision/initial_backlog.csv](docs/vision/initial_backlog.csv) — Compared current engine/RNG/private replay signatures, ownership, scoped prerequisites and actual checkpoint results; updated current text with D10 and explicit later gates, preserving dated executed history.
- **updated:** [docs/vision/requirements.csv](docs/vision/requirements.csv) — Compared current engine/RNG/private replay signatures, ownership, scoped prerequisites and actual checkpoint results; updated current text with D10 and explicit later gates, preserving dated executed history.
- **reviewed_unchanged:** [infra/README.md](infra/README.md) — Reviewed existing source-qualified CI/task contracts; no changed implementation claim is promoted without current matched evidence.
- **updated:** [packages/engine-adapter/README.md](packages/engine-adapter/README.md) — Compared current engine/RNG/private replay signatures, ownership, scoped prerequisites and actual checkpoint results; updated current text with D10 and explicit later gates, preserving dated executed history.
- **updated:** [packages/engine-lab/README.md](packages/engine-lab/README.md) — Compared current engine/RNG/private replay signatures, ownership, scoped prerequisites and actual checkpoint results; updated current text with D10 and explicit later gates, preserving dated executed history.
- **updated:** [vendor/tcg-engines/README.md](vendor/tcg-engines/README.md) — Compared current engine/RNG/private replay signatures, ownership, scoped prerequisites and actual checkpoint results; updated current text with D10 and explicit later gates, preserving dated executed history.

Full changed-file inventory: [record](docs/changes/CHG-20261012-001.json).

### Limits and next actions

- RUN028/029 complete every isolated CI child stage but remain failed clock_changed; no result/artifact published. Director explicitly leaves environment unchanged and retains this timing qualification pending.
- Internal synthetic RNG/reconstruction only; RULE-04 official rules/cards, PLAY-01 durability, PLAY-02 viewer/wire privacy and AUTH/REPLAY recipient delivery remain unimplemented gates. Ordinary Lab/Collection/rewards/private/official play stays blocked.
- No NIST DRBG/FIPS/statistical certification, authentic signature, whole-program secrecy, durable restore, full upstream strict-type/catalog or all-card-test claim.
- Windows/GPU/touch/ARM64/load/restore/production and fresh hosted RULE-03/required-check observations not performed; original548/33/20 acceptance/device values unchanged.
- Director audit of the local RULE-03 implementation; current-source isolated CI timing remains pending until a later authorized stable-environment run.
- RULE-04: sourced representative current-rules scenarios and per-card certification, including October16 CR2.3/October23 set14 and retained RULE-01 source gaps.
- Keep PLAY/AUTH/REPLAY/economic/ordinary-play gates and D10 participant/auditor-only disclosure before delivery; preserve private data and all prior evidence.

## CHG-20261011-003 — Independent audit of RULE-02 and Director-authorized integration into main

- Status: finalized
- Actor: Claude Code agent (architect/QA reviewer role) on Director request, local WSL session
- Recorded (UTC): 2026-10-11T22:58:54.735Z
- Event: unknown; recorded retrospectively (recorded_only)
- Source: 481735dabbde016e62d9fb3c7de87bee6ce3af15
- Tasks: RULE-02, DOC-01, DOC-02
- Features: F-DOCS
- Requirements: none

### Changes

- **review:** Audited Codex commit 481735d (RULE-02, CHG-20261011-002) against the backlog acceptance (reproduce relevant upstream tests; compile/run the selected adapter under Node 24; no Bun-only production dependency), ADR0008 and ADR0009. Present: 347 vendored files (304 runtime, 43 test-only) at pin 53a79413 with Git blob/SHA-256 lock, both MIT notices, two reproducible patches (P001 matcher preload, P002 disabled environment tracing) that change no assertion or rule logic; precompiled kernel with only mutative, @logtape/logtape and seedrandom; server adapter and trust-free Lab worker with closed bounded input, explicit player authority and fail-closed admission; Bun 1.4.2 hash-pinned and test-only; artifact v3 engine/provenance binding. Code review covered the importer, closure walker, integrity verifier, Bun installer, boundary checker, artifact/release changes and Dockerfile.
- **test:** Independent local runs RUN-20261011-065..072 all passed at executable fingerprint 831cb35f…: engine:check; importer reproduction from the pinned checkout; a separate git cat-file byte audit (345 identical, 2 patched, licenses, no extra/missing files); a compiled-adapter authority/input/admission probe; upstream 338 pass/1 inherited skip/0 fail across 27 files; two Chromium workers; verify:foundation 124 checks (100 Node + 24 Python); and the host isolated 13-stage CI pipeline with a fresh image and owned cleanup. RUN-20261011-073 docs:check covers this record.
- **documentation:** Append an independent-audit section to docs/validation/rule-02.md with results, cross-checks and the randomness/clock sources RULE-03 must replace; update the handoff with the audit, the Director-authorized integration and next actions.
- **revision:** The Director authorized pushing and merging RULE-02 once the audit confirmed it. Publish codex/rule-02-engine-vendor and claude/rule-02-audit; fast-forward main to the commit containing this record. No history rewrite.

### Verification

- **passed:** pnpm engine:check: offline vendor lock, bytes, patches, licenses and resolver integrity (347 files, 2 patches). Local Dev Container. ([evidence](docs/validation/runs/RUN-20261011-065.json))
- **passed:** Importer --check against the pinned inert checkout reproduced every payload, license, patch original and the lock. Local Dev Container. ([evidence](docs/validation/runs/RUN-20261011-066.json))
- **passed:** Separate git cat-file audit script independent of project tooling: 345 identical + 2 patched files, both licenses, patch originals, no extra/missing files. Local Dev Container. ([evidence](docs/validation/runs/RUN-20261011-067.json))
- **passed:** Compiled server adapter probe: first-player authority, opponent impersonation, out-of-turn/judge moves, malformed input, terminal state and date-boundary admission refusals. Local Dev Container. ([evidence](docs/validation/runs/RUN-20261011-068.json))
- **passed:** pnpm engine:test-upstream: 338 pass, 1 inherited skip, 0 fail, 838 expect calls across 27 unchanged files under Bun 1.4.2. Local Dev Container. ([evidence](docs/validation/runs/RUN-20261011-069.json))
- **passed:** pnpm test:engine-browser: two real Linux Chromium Web Workers. Local Dev Container. ([evidence](docs/validation/runs/RUN-20261011-070.json))
- **passed:** pnpm verify:foundation at fingerprint 831cb35f…: 124 checks (100 Node + 24 Python) plus the upstream 338/1. Local Dev Container. ([evidence](docs/validation/runs/RUN-20261011-071.json))
- **passed:** Host scripts/ci-local.py: fresh x64 image, 13 isolated stages including live PostgreSQL, Chromium, engine workers, scans and artifact v3, with owned cleanup. Local Docker, not hosted. ([evidence](docs/validation/runs/RUN-20261011-072.json))
- **passed:** pnpm docs:check covering this audit record, the rule-02 audit section and handoff. Local Dev Container. ([evidence](docs/validation/runs/RUN-20261011-073.json))

### Documentation and files

- **updated:** [docs/validation/rule-02.md](docs/validation/rule-02.md) — Appended a dated independent-audit section with actual run outcomes, cross-checks and RULE-03/WEB-01 inputs; Codex text unchanged.
- **updated:** [docs/HANDOFF.md](docs/HANDOFF.md) — Header actors, authorized publication/integration replacing 'no publication', audit verification and next actions; other Codex content unchanged.
- **reviewed_unchanged:** [docs/adr/0009-pinned-engine-qualification.md](docs/adr/0009-pinned-engine-qualification.md) — Decision, file counts, dependencies, patches, ownership and gates match the code and RUN-20261011-065..072.
- **reviewed_unchanged:** [docs/adr/0008-engine-placement-dependency-baseline.md](docs/adr/0008-engine-placement-dependency-baseline.md) — The amended consequence and the RULE-02 dependency note match the backlog split and the actual runtime externals; earlier wording is retained in Git history.
- **reviewed_unchanged:** [docs/runbooks/engine.md](docs/runbooks/engine.md) — Commands and callable contracts match the scripts reviewed and executed; input bounds match packages/engine-lab/src/index.ts.
- **reviewed_unchanged:** [docs/plans/2026-10-11-rule-02-engine-vendor.md](docs/plans/2026-10-11-rule-02-engine-vendor.md) — Execution outcome claims match the independently reproduced evidence.
- **reviewed_unchanged:** [docs/reviews/2026-10-11-rule-02-closure.md](docs/reviews/2026-10-11-rule-02-closure.md) — Review conclusions are consistent with this audit; its stated limits are preserved.
- **reviewed_unchanged:** [vendor/tcg-engines/README.md](vendor/tcg-engines/README.md) — Counts, patch descriptions and dependency list match the lock and RUN-20261011-067.
- **reviewed_unchanged:** [packages/engine-adapter/README.md](packages/engine-adapter/README.md) — Server-only qualification entry matches the source and probe RUN-20261011-068.
- **reviewed_unchanged:** [packages/engine-lab/README.md](packages/engine-lab/README.md) — Lab/worker ownership matches the source and RUN-20261011-070.
- **reviewed_unchanged:** [docs/vision/initial_backlog.csv](docs/vision/initial_backlog.csv) — RULE-02 status implemented_verified_minimal_synthetic_runtime_later_play_gates_blocked matches the audited evidence; RULE-03/04 remain pending.
- **reviewed_unchanged:** [docs/vision/requirements.csv](docs/vision/requirements.csv) — R01.005/.006/.018 and R29.005 gain prerequisite-only references; statuses remain pending.
- **reviewed_unchanged:** [AGENTS.md](AGENTS.md) — The RULE-02 boundary instruction matches the boundary checker and the import rules exercised by verify:foundation.
- **reviewed_unchanged:** [README.md](README.md) — New engine commands and the twelve-workspace note match package.json and pnpm-workspace.yaml.
- **reviewed_unchanged:** [docs/contracts/release.md](docs/contracts/release.md) — Artifact v3 and engine component binding match scripts/ci/artifacts.mjs and scripts/release-manifest.mjs.
- **reviewed_unchanged:** [docs/runbooks/ci.md](docs/runbooks/ci.md) — The engine-browser stage and Bun image note match the 13 stages observed in RUN-20261011-072.
- **reviewed_unchanged:** [docs/rules/README.md](docs/rules/README.md) — The RULE-02 pointer is accurate; RULE-01 inventory content unchanged.

Full changed-file inventory: [record](docs/changes/CHG-20261011-003.json).

### Limits and next actions

- Local Dev Container and local Docker evidence only; the hosted foundation workflow for the integrated main commit must be observed separately.
- The audit does not certify rules, cards, randomness, replay, viewer privacy, Windows/GPU/touch behaviour, ARM64 execution or production; those gates remain with RULE-03/04, PLAY-02 and later tasks.
- The Director clarification splitting RULE-02 from RULE-03/04/PLAY-02 is recorded by Codex; it matches the backlog task definitions but the original instruction was not observed by this auditor.
- Observe the hosted foundation run for the integrated main commit.
- RULE-03: replace the listed Math.random/seedrandom/randomUUID/Date.now sources with injected server RNG and clocks and prove replay equality.

## CHG-20261011-002 — RULE-02 pinned engine vendoring and temporal qualification gates

- Status: finalized
- Actor: Codex architect/developer/QA
- Recorded (UTC): 2026-10-11T20:09:16.139Z
- Event: unknown; recorded retrospectively (recorded_only)
- Source: 19251271a635bd94556ce70a6ef0a77e4ccd7b65
- Tasks: RULE-02, DOC-01, DOC-02
- Features: F-ENGINE, F-BOUNDARIES, F-CI, F-RELEASE, F-RULE-INVENTORY, F-DOCS, F-RESERVED
- Requirements: R01.005, R01.006, R01.018, R29.005

### Changes

- **implementation:** Vendor exact minimal347-file closure at53a7941 with original Git/SHA256 identities,304 runtime source-or-types, two reproducible patches and MIT notices.
- **function:** Compile pure synthetic kernel, closed Node adapter and standalone trust-free Lab worker; explicit player authority, actor/revision/terminal/disposal handling and bounded private-free summaries.
- **feature:** Retain Director task sequence: secure RNG RULE-03, official behavior RULE-04 and wire privacy PLAY-02; all eligible/private/official play blocked across October16/23 date transitions.
- **expansion:** Add hash-pinned dev/CI-only Bun1.4.2 and owning exact minimal dependencies; artifact v3 binds twelve builds and engine/provenance, SBOM/notices include vendored component.
- **fix:** Independent review regressions bound sparse/aggregate/accessor inputs and sparse admission sets, block direct/computed/relative server engine bypasses and bind actual test resolver aliases to selection.
- **test:** Retain every red/green checkpoint; final source passes124 project checks and338 unchanged upstream tests/1 existing skip, clean frozen installation,13-stage isolated image/DB/artifact proof and six plus two Chromium scenarios.
- **documentation:** Update current owning docs, architecture/status/map/features/task/requirement evidence and handoff; preserve all original scope and immutable dated/archive evidence.
- **review:** Observe closed RULE-01 hosted main1925127 run38098551762 and verify its downloaded v2 artifact at intake with the historical verifier; no RULE-02 hosted acceptance inferred.
- **review:** Read-only independent reviewer found no unresolved Critical/Important findings after retained corrections; canonical Git1173-file identity/full foundation and actual cleanup/private/log/original-scope proofs pass. Preserve exact canonical helper and separately attributed host inspection, including its corrected read-only missing-health query.

### Verification

- **passed:** RULE-02 intake toolchain baseline ([evidence](docs/validation/runs/RUN-20261011-014.json))
- **passed:** RULE-02 unchanged intake configuration and documentation baseline ([evidence](docs/validation/runs/RUN-20261011-015.json))
- **passed:** RULE-02 intake bootstrap baseline ([evidence](docs/validation/runs/RUN-20261011-016.json))
- **passed:** RULE-02 intake authenticated bootstrap database baseline ([evidence](docs/validation/runs/RUN-20261011-017.json))
- **failed:** Verify completed RULE-01 hosted CI and downloaded artifact against merged source; local verification of remote evidence ([evidence](docs/validation/runs/RUN-20261011-018.json))
- **passed:** Verify merged RULE-01 hosted CI and downloaded artifact using the actual download directory ([evidence](docs/validation/runs/RUN-20261011-019.json))
- **failed:** RED: engine closure traversal and unsafe-import rejection before implementation ([evidence](docs/validation/runs/RUN-20261011-020.json))
- **passed:** GREEN: dependency traversal rejects nonliteral, unresolved, unapproved and escaping imports ([evidence](docs/validation/runs/RUN-20261011-021.json))
- **failed:** RED: reject vendor drift, unlisted patches and source membership changes ([evidence](docs/validation/runs/RUN-20261011-022.json))
- **passed:** GREEN: byte/blob integrity rejects modified, extra/missing source and unlisted patches ([evidence](docs/validation/runs/RUN-20261011-023.json))
- **failed:** RED: real adapter command/lifecycle and rules/set temporal admission behaviors before implementation ([evidence](docs/validation/runs/RUN-20261011-024.json))
- **failed:** RED: browser ownership must allow only the designated Lab-to-compiled-kernel edge (source_changed, unqualified checkpoint) ([evidence](docs/validation/runs/RUN-20261011-025.json))
- **failed:** Engine development build failure capture: bridge import must match actual pinned exports ([evidence](docs/validation/runs/RUN-20261011-026.json))
- **passed:** Precompiled kernel build after correcting the pinned ID export location ([evidence](docs/validation/runs/RUN-20261011-027.json))
- **failed:** Strict Lab adapter and standalone browser worker build ([evidence](docs/validation/runs/RUN-20261011-028.json))
- **failed:** Adapter lifecycle commands and temporal admission guards against real compiled kernel ([evidence](docs/validation/runs/RUN-20261011-029.json))
- **passed:** Unchanged selected pinned upstream tests under checksum-verified Bun1.4.2 ([evidence](docs/validation/runs/RUN-20261011-030.json))
- **passed:** Pure browser/Node kernel compile after replacing environment lookups with explicit strict qualification constants ([evidence](docs/validation/runs/RUN-20261011-031.json))
- **failed:** Browser-safe Lab worker compilation and strict own-interface types ([evidence](docs/validation/runs/RUN-20261011-032.json))
- **failed:** Real synthetic opening/mulligan/concession, explicit player authority, lifecycle and temporal gates ([evidence](docs/validation/runs/RUN-20261011-033.json))
- **passed:** Compile pure kernel with listed trace adaptation and mandatory actor arguments ([evidence](docs/validation/runs/RUN-20261011-034.json))
- **passed:** Compile strict Lab wrapper and environment-free standalone worker ([evidence](docs/validation/runs/RUN-20261011-035.json))
- **passed:** GREEN: actual opening/mulligan/concession, player-only authority, lifecycle, boundaries and October fail-closed qualification gates ([evidence](docs/validation/runs/RUN-20261011-036.json))
- **passed:** Verify documented local patches preserve all selected unchanged upstream test assertions ([evidence](docs/validation/runs/RUN-20261011-037.json))
- **passed:** Actual Linux Chromium execution of two standalone synthetic Lab Web Workers; no Node/Bun or live network state ([evidence](docs/validation/runs/RUN-20261011-038.json))
- **failed:** RED: CI artifact must identify compiled engine/provenance without activating rules/catalog ([evidence](docs/validation/runs/RUN-20261011-039.json))
- **passed:** GREEN: artifactv3 binds engine/kernel/provenance and rejects rehashed modified kernel bytes ([evidence](docs/validation/runs/RUN-20261011-040.json))
- **failed:** RED: server apps must not bypass engine adapter and dependency closure must reject parent symlink escape ([evidence](docs/validation/runs/RUN-20261011-041.json))
- **passed:** GREEN: engine closure symlink isolation and adapter-only server imports ([evidence](docs/validation/runs/RUN-20261011-042.json))
- **passed:** Current workspace strict type checks and all ordered package builds ([evidence](docs/validation/runs/RUN-20261011-043.json))
- **failed:** ESLint and actual browser/server engine import boundaries ([evidence](docs/validation/runs/RUN-20261011-044.json))
- **passed:** Corrected lint and actual browser/server engine boundaries ([evidence](docs/validation/runs/RUN-20261011-045.json))
- **failed:** RED: independent review sparse/aggregate JSON input bounds and server import bypasses ([evidence](docs/validation/runs/RUN-20261011-046.json))
- **passed:** GREEN: independent review bounded data and adapter-only server imports ([evidence](docs/validation/runs/RUN-20261011-047.json))
- **failed:** RED: bind actual upstream test aliases to the byte-verified selection ([evidence](docs/validation/runs/RUN-20261011-048.json))
- **passed:** GREEN: review resolver binding and bounded input/import regressions ([evidence](docs/validation/runs/RUN-20261011-049.json))
- **failed:** RED: relative server Lab route must enter through adapter ([evidence](docs/validation/runs/RUN-20261011-050.json))
- **failed:** RED: sparse admission sets must fail closed ([evidence](docs/validation/runs/RUN-20261011-051.json))
- **passed:** GREEN: all independent review bounds/admission/relative-import/resolver regressions ([evidence](docs/validation/runs/RUN-20261011-052.json))
- **passed:** Full current-source configuration/docs/build/type/lint/bootstrap/project/upstream foundation ([evidence](docs/validation/runs/RUN-20261011-053.json))
- **passed:** Source-only clean frozen install and complete RULE-02 foundation with no private/cache/Git input ([evidence](docs/validation/runs/RUN-20261011-054.json))
- **passed:** Actual isolated BOOT-03 pipeline: frozen foundation, live PostgreSQL, Linux browser, dependency/secret scans and artifacts ([evidence](docs/validation/runs/RUN-20261011-055.json))
- **passed:** Exact pinned upstream closure/license/patch reproduction from retained source bytes ([evidence](docs/validation/runs/RUN-20261011-056.json))
- **passed:** Final-source Linux Chromium foundation6 and two synthetic engine workers with cleanup ([evidence](docs/validation/runs/RUN-20261011-057.json))
- **passed:** Independent current-source artifact v3/release/engine/provenance/SBOM re-verification ([evidence](docs/validation/runs/RUN-20261011-058.json))
- **passed:** Resumed existing-container doctor/bootstrap5/authenticated PostgreSQL baseline ([evidence](docs/validation/runs/RUN-20261011-059.json))
- **passed:** Current documentation/static configuration/import/vendor/rules checks after final semantic review ([evidence](docs/validation/runs/RUN-20261011-060.json))
- **passed:** Canonical staged Git archive: exact live byte identity, frozen install and complete foundation; verified tooling caches may be reused ([evidence](docs/validation/runs/RUN-20261011-061.json))
- **passed:** Actual final listener/private/log/requirement/archive preservation and retained host/canonical evidence identity ([evidence](docs/validation/runs/RUN-20261011-062.json))
- **passed:** Completed-scope documentation/static review and original requirement preservation with fully captured checker input ([evidence](docs/validation/runs/RUN-20261011-063.json))
- **passed:** Finalized documentation seal: staged/live canonical identities, complete file coverage, known-secret scan and append-only Git ancestry checks ([evidence](docs/validation/runs/RUN-20261011-064.json))

### Documentation and files

- **updated:** [AGENTS.md](AGENTS.md) — Updated current behavior/status/ownership/evidence against synthetic engine source; previous execution tables remain source-specific and later play gates stay pending.
- **updated:** [README.md](README.md) — Updated current behavior/status/ownership/evidence against synthetic engine source; previous execution tables remain source-specific and later play gates stay pending.
- **reviewed_unchanged:** [docs/CHANGELOG_FORMAT.md](docs/CHANGELOG_FORMAT.md) — Run/change schema1, UTC/monotonic and append-only contracts remain intact; artifact v3 has a separate namespace and all failed attempts are retained.
- **reviewed_unchanged:** [docs/DEVELOPMENT_WORKFLOW.md](docs/DEVELOPMENT_WORKFLOW.md) — Native intake/review/source-matched evidence/canonical-check closure remains the required workflow; vendoring adds no approval or agent-specific ledger.
- **updated:** [docs/FEATURES.md](docs/FEATURES.md) — Current CI statement identifies RULE-02 local v3 proof separately from historical hosted BOOT-03/RULE-01; synthetic engine and later gates match owned interfaces.
- **updated:** [docs/HANDOFF.md](docs/HANDOFF.md) — Replace interrupted pending-test checkpoint with actual final source-matched results, protected environment, owned cleanup and next RULE-03 task; preserve later admission/device gates.
- **updated:** [docs/README.md](docs/README.md) — Index current engine operation and dated independent review, preserving source, historical and current documentation authority.
- **updated:** [docs/WORKSPACE_QUALIFICATION.md](docs/WORKSPACE_QUALIFICATION.md) — Updated current behavior/status/ownership/evidence against synthetic engine source; previous execution tables remain source-specific and later play gates stay pending.
- **updated:** [docs/adr/0001-local-development-environment.md](docs/adr/0001-local-development-environment.md) — Updated current behavior/status/ownership/evidence against synthetic engine source; previous execution tables remain source-specific and later play gates stay pending.
- **updated:** [docs/adr/0002-application-foundation.md](docs/adr/0002-application-foundation.md) — Updated current behavior/status/ownership/evidence against synthetic engine source; previous execution tables remain source-specific and later play gates stay pending.
- **reviewed_unchanged:** [docs/adr/0003-documentation-evidence.md](docs/adr/0003-documentation-evidence.md) — Schema-version1 governance and clock/sealing rules unchanged; the new build-artifact format is separate.
- **reviewed_unchanged:** [docs/adr/0004-restricted-local-database.md](docs/adr/0004-restricted-local-database.md) — No role/SQL/credential/DB integration changes; the synthetic adapter has no database path and original data is protected.
- **updated:** [docs/adr/0005-ci-artifact-qualification.md](docs/adr/0005-ci-artifact-qualification.md) — Updated current behavior/status/ownership/evidence against synthetic engine source; previous execution tables remain source-specific and later play gates stay pending.
- **updated:** [docs/adr/0006-protocol-release-contracts.md](docs/adr/0006-protocol-release-contracts.md) — Updated current behavior/status/ownership/evidence against synthetic engine source; previous execution tables remain source-specific and later play gates stay pending.
- **reviewed_unchanged:** [docs/adr/0007-hosting-provider-baseline.md](docs/adr/0007-hosting-provider-baseline.md) — OVHcloud/Cloudflare/$25 decision and purchase/deploy gates remain unchanged; synthetic runtime proof does not reproduce capacity measurements.
- **updated:** [docs/adr/0008-engine-placement-dependency-baseline.md](docs/adr/0008-engine-placement-dependency-baseline.md) — Updated current behavior/status/ownership/evidence against synthetic engine source; previous execution tables remain source-specific and later play gates stay pending.
- **updated:** [docs/adr/0009-pinned-engine-qualification.md](docs/adr/0009-pinned-engine-qualification.md) — Updated current behavior/status/ownership/evidence against synthetic engine source; previous execution tables remain source-specific and later play gates stay pending.
- **updated:** [docs/audits/2026-10-06-project-audit.md](docs/audits/2026-10-06-project-audit.md) — Updated current behavior/status/ownership/evidence against synthetic engine source; previous execution tables remain source-specific and later play gates stay pending.
- **reviewed_unchanged:** [docs/contracts/protocol.md](docs/contracts/protocol.md) — Revision1 wire schemas still have no executable game intent or engine state; the synthetic harness is in-process only and no protocol revision changed.
- **updated:** [docs/contracts/release.md](docs/contracts/release.md) — Updated current behavior/status/ownership/evidence against synthetic engine source; previous execution tables remain source-specific and later play gates stay pending.
- **updated:** [docs/documentation-map.json](docs/documentation-map.json) — Classify dated independent review as evidence and retain current engine boundary/release/CI/dependency ownership edges.
- **updated:** [docs/features.json](docs/features.json) — Updated current behavior/status/ownership/evidence against synthetic engine source; previous execution tables remain source-specific and later play gates stay pending.
- **reviewed_unchanged:** [docs/plans/2026-10-06-boot-02-database.md](docs/plans/2026-10-06-boot-02-database.md) — Existing restricted-role/migration/recreation plan and dated completion remain accurate; no new persistence or backup claim.
- **updated:** [docs/plans/2026-10-06-documentation-governance.md](docs/plans/2026-10-06-documentation-governance.md) — Updated current behavior/status/ownership/evidence against synthetic engine source; previous execution tables remain source-specific and later play gates stay pending.
- **updated:** [docs/plans/2026-10-07-boot-03-ci.md](docs/plans/2026-10-07-boot-03-ci.md) — Updated current behavior/status/ownership/evidence against synthetic engine source; previous execution tables remain source-specific and later play gates stay pending.
- **updated:** [docs/plans/2026-10-07-boot-05-contracts.md](docs/plans/2026-10-07-boot-05-contracts.md) — Updated current behavior/status/ownership/evidence against synthetic engine source; previous execution tables remain source-specific and later play gates stay pending.
- **updated:** [docs/plans/2026-10-10-boot-04-decision-worksheet.md](docs/plans/2026-10-10-boot-04-decision-worksheet.md) — Updated current behavior/status/ownership/evidence against synthetic engine source; previous execution tables remain source-specific and later play gates stay pending.
- **updated:** [docs/plans/2026-10-11-rule-02-engine-vendor.md](docs/plans/2026-10-11-rule-02-engine-vendor.md) — Updated current behavior/status/ownership/evidence against synthetic engine source; previous execution tables remain source-specific and later play gates stay pending.
- **reviewed_unchanged:** [docs/policies/fan-content.md](docs/policies/fan-content.md) — D07 notice/provenance/free access/takedown policy unchanged; no official card art/text definition was imported by runtime.
- **updated:** [docs/reviews/2026-10-11-rule-02-closure.md](docs/reviews/2026-10-11-rule-02-closure.md) — Retain read-only final assessment, independently corrected findings and explicit review limits; executed checks remain separate source-bound receipts.
- **updated:** [docs/rules/README.md](docs/rules/README.md) — Updated current behavior/status/ownership/evidence against synthetic engine source; previous execution tables remain source-specific and later play gates stay pending.
- **reviewed_unchanged:** [docs/rules/source-specs-supplement.json](docs/rules/source-specs-supplement.json) — Corrected supplement acquisition/hash evidence unchanged; vendoring cannot close missing source gaps.
- **reviewed_unchanged:** [docs/rules/source-specs.json](docs/rules/source-specs.json) — Dated acquisition specs and official hashes unchanged; no new official rule/source claim.
- **updated:** [docs/runbooks/ci.md](docs/runbooks/ci.md) — Updated current behavior/status/ownership/evidence against synthetic engine source; previous execution tables remain source-specific and later play gates stay pending.
- **reviewed_unchanged:** [docs/runbooks/database.md](docs/runbooks/database.md) — Managed role/migration/live-test ownership and disposable recreation operation unchanged; no engine persistence is wired.
- **updated:** [docs/runbooks/engine.md](docs/runbooks/engine.md) — Updated current behavior/status/ownership/evidence against synthetic engine source; previous execution tables remain source-specific and later play gates stay pending.
- **updated:** [docs/runbooks/workspace-setup.md](docs/runbooks/workspace-setup.md) — Updated current behavior/status/ownership/evidence against synthetic engine source; previous execution tables remain source-specific and later play gates stay pending.
- **reviewed_unchanged:** [docs/schemas/change.schema.json](docs/schemas/change.schema.json) — Schema1 structural fields/enums/identity/time/sealing contract reviewed; no governance schema or wire-format migration required by artifact v3.
- **reviewed_unchanged:** [docs/schemas/documentation-map.schema.json](docs/schemas/documentation-map.schema.json) — Schema1 structural fields/enums/identity/time/sealing contract reviewed; no governance schema or wire-format migration required by artifact v3.
- **reviewed_unchanged:** [docs/schemas/features.schema.json](docs/schemas/features.schema.json) — Schema1 structural fields/enums/identity/time/sealing contract reviewed; no governance schema or wire-format migration required by artifact v3.
- **reviewed_unchanged:** [docs/schemas/run.schema.json](docs/schemas/run.schema.json) — Schema1 structural fields/enums/identity/time/sealing contract reviewed; no governance schema or wire-format migration required by artifact v3.
- **reviewed_unchanged:** [docs/schemas/state.schema.json](docs/schemas/state.schema.json) — Schema1 structural fields/enums/identity/time/sealing contract reviewed; no governance schema or wire-format migration required by artifact v3.
- **reviewed_unchanged:** [docs/templates/change.json](docs/templates/change.json) — Uniform schema1 required fields/explicit verification categories preserved; current change supplies complete file coverage.
- **reviewed_unchanged:** [docs/templates/handoff.md](docs/templates/handoff.md) — Exact intake/source/execution/behavior/docs/evidence/resource/limits/next-action template is followed by updated handoff.
- **updated:** [docs/validation/boot-01.md](docs/validation/boot-01.md) — Updated current behavior/status/ownership/evidence against synthetic engine source; previous execution tables remain source-specific and later play gates stay pending.
- **updated:** [docs/validation/boot-02.md](docs/validation/boot-02.md) — Append current v3/twelve-workspace continuation to dated BOOT-05 v2 checkpoint; restricted SQL/roles unchanged and fresh isolated database checks do not imply engine persistence.
- **updated:** [docs/validation/boot-03.md](docs/validation/boot-03.md) — Updated current behavior/status/ownership/evidence against synthetic engine source; previous execution tables remain source-specific and later play gates stay pending.
- **reviewed_unchanged:** [docs/validation/boot-04.md](docs/validation/boot-04.md) — Director decisions and labeled superseded research remain intact; ADR0009 refines task sequencing without new provider/deploy acceptance.
- **updated:** [docs/validation/boot-05.md](docs/validation/boot-05.md) — Updated current behavior/status/ownership/evidence against synthetic engine source; previous execution tables remain source-specific and later play gates stay pending.
- **updated:** [docs/validation/rule-01.md](docs/validation/rule-01.md) — Updated current behavior/status/ownership/evidence against synthetic engine source; previous execution tables remain source-specific and later play gates stay pending.
- **updated:** [docs/validation/rule-02-canonical-check.mjs.txt](docs/validation/rule-02-canonical-check.mjs.txt) — Retain exact ignored helper bytes executed by canonical RUN061; read-only evidence text, not new runtime tooling; identity compared in RUN062.
- **updated:** [docs/validation/rule-02-host-closure.json](docs/validation/rule-02-host-closure.json) — Retain actual WSL host cleanup/mount inspection separately from container receipt, including corrected read-only missing-health query and unknown earlier execution times.
- **updated:** [docs/validation/rule-02.md](docs/validation/rule-02.md) — Acceptance table maps minimal pin/test/Node/worker criteria to actual receipts, preserves every failure/skip, corrects cache wording and distinguishes canonical/document/host cleanup.
- **updated:** [docs/vision/README.md](docs/vision/README.md) — Updated current behavior/status/ownership/evidence against synthetic engine source; previous execution tables remain source-specific and later play gates stay pending.
- **reviewed_unchanged:** [docs/vision/additional_scope.csv](docs/vision/additional_scope.csv) — X06/X07 exact documentation and timestamped evidence contracts retained; RULE-02 adds implementation within existing scope.
- **reviewed_unchanged:** [docs/vision/decision_register.csv](docs/vision/decision_register.csv) — D04 launch admission and all Director choices retained; calendar phases cannot select a launch catalog.
- **updated:** [docs/vision/initial_backlog.csv](docs/vision/initial_backlog.csv) — Updated current behavior/status/ownership/evidence against synthetic engine source; previous execution tables remain source-specific and later play gates stay pending.
- **updated:** [docs/vision/requirements.csv](docs/vision/requirements.csv) — Updated current behavior/status/ownership/evidence against synthetic engine source; previous execution tables remain source-specific and later play gates stay pending.
- **reviewed_unchanged:** [infra/README.md](infra/README.md) — Two owned disposable Compose projects and production reservations remain accurate; current release-policy link now defines engine v3 binding.
- **updated:** [packages/engine-adapter/README.md](packages/engine-adapter/README.md) — Updated current behavior/status/ownership/evidence against synthetic engine source; previous execution tables remain source-specific and later play gates stay pending.
- **updated:** [packages/engine-lab/README.md](packages/engine-lab/README.md) — Updated current behavior/status/ownership/evidence against synthetic engine source; previous execution tables remain source-specific and later play gates stay pending.
- **updated:** [vendor/tcg-engines/README.md](vendor/tcg-engines/README.md) — Updated current behavior/status/ownership/evidence against synthetic engine source; previous execution tables remain source-specific and later play gates stay pending.

Full changed-file inventory: [record](docs/changes/CHG-20261011-002.json).

### Limits and next actions

- Rules2.3.0 effective2026-10-16 and Hyperia14 general release2026-10-23 require future certification; current pin is not certified.
- Secure injected randomness and viewer projection remain gated by RULE-03/PLAY-02; no rewarded/private production play.
- Upstream strict typing, full original lock/catalog/all-card coverage and complete redistribution qualification are not accepted; scoped upstream tests retain one inherited skip.
- No new hosted RULE-02, real Windows/GPU/touch/loading/load/ARM64 or production evidence; unsigned artifact identity includes twelve explicit npm root notice-file gaps.
- Create the coherent reviewed local RULE-02 commit; no publication/deployment/main integration for this scope.
- Continue RULE-03 secure injected RNG, recorded deterministic outcomes, replay equality and random-stream access tests; retain RULE-04/PLAY-02 and official/reward/private admission gates.

## CHG-20261011-001 — Independent audit of RULE-01 and Director-authorized integration into main

- Status: finalized
- Actor: Claude Code agent (architect/QA reviewer role) on Director request, local WSL session
- Recorded (UTC): 2026-10-11T00:27:47.162Z
- Event: unknown; recorded retrospectively (recorded_only)
- Source: 6f02557465a996b4c76b2d66c201cd8d5a7d53d7
- Tasks: RULE-01, BOOT-04, DOC-01, DOC-02
- Features: F-DOCS
- Requirements: none

### Changes

- **review:** Audited Codex commit 9aa11df (BOOT-04 decision review, CHG-20261010-007): it preserves the Director's hosting, engine-placement and D07 decisions and adds qualification gates (measured memory limits; end-to-end WAL archival within the accepted RPO). No decision changed.
- **review:** Audited Codex commit 6f02557 (RULE-01, CHG-20261010-008) against the backlog acceptance. Present: hashed official source bytes; a nonempty CR 2.2.0→2.3.0 numbered-leaf diff; per-set printing/identity/release-status inventory with denominators; static upstream test inventory including skipped/todo; explicit missing-document, localization and identity-reconciliation gaps. Cross-checked counts against earlier independent measurements of the same pin (3,198 card files; 3,289 test files). The new root dev dependency pdfjs-dist 6.4.299 (Apache-2.0) is exact-pinned with no install scripts, allowBuilds empty and no application import. Script safety reviewed: PDF eval disabled, HTTPS-only bounded fetches, exclusive writes, argument-array git, symlinks not followed, AST parsing without execution.
- **test:** Independent local Dev Container runs RUN-20261011-006..011 all passed: rules:check, test:rules-inventory, rules:verify-bytes, rules:reproduce, verify:foundation (113 checks = 89 Node + 24 Python), and a fresh download of the official CR 2.2.0/2.3.0 PDFs matching the recorded SHA-256. RUN-20261011-012 docs:check covers this record.
- **documentation:** Add an independent-audit section to docs/validation/rule-01.md and update the handoff with the audit results, the Director-authorized integration and the time-sensitive RULE-02/04 inputs (CR 2.3.0 effective 2026-10-16; set 14 Hyperia City prerelease 2026-10-16, release 2026-10-23; upstream covers sets 001–013).
- **revision:** The Director authorized committing, pushing and merging RULE-01 into main. Publish codex/boot-04-decision-review, codex/rule-01-source-inventory and claude/rule-01-audit; fast-forward main to the commit containing this record. No history rewrite.
- **fix:** The first commit attempt was stopped by the staged formatting check (git diff --check): the appended rule-01 audit section left a trailing blank line. Removed it, restored the generated snapshot/changelog from HEAD (nothing had been committed), reopened this record as a draft, re-synchronized, and recorded RUN-20261011-013 docs:check on the corrected content before finalizing.

### Verification

- **passed:** pnpm rules:check: offline committed inventory metadata integrity. Local Dev Container. ([evidence](docs/validation/runs/RUN-20261011-006.json))
- **passed:** pnpm test:rules-inventory: 19 focused synthetic regressions. Local Dev Container. ([evidence](docs/validation/runs/RUN-20261011-007.json))
- **passed:** pnpm rules:verify-bytes: every acquired raw/text hash against the ignored research cache. Local Dev Container. ([evidence](docs/validation/runs/RUN-20261011-008.json))
- **passed:** pnpm rules:reproduce: byte-for-byte regeneration from the cache and pinned inert upstream checkout. Local Dev Container. ([evidence](docs/validation/runs/RUN-20261011-009.json))
- **passed:** pnpm verify:foundation at fingerprint 117c9248…: verify, typecheck, lint and 113 tests (89 Node + 24 Python). Local Dev Container. ([evidence](docs/validation/runs/RUN-20261011-010.json))
- **passed:** Fresh download of official CR 2.2.0/2.3.0 PDFs: byte counts and SHA-256 equal recorded values; the resources page links the October update. Local Dev Container. ([evidence](docs/validation/runs/RUN-20261011-011.json))
- **passed:** docs:check of this audit/integration record on the draft snapshot. Local Dev Container. ([evidence](docs/validation/runs/RUN-20261011-012.json))
- **passed:** docs:check after the trailing-blank-line correction (draft snapshot). Local Dev Container. ([evidence](docs/validation/runs/RUN-20261011-013.json))

### Documentation and files

- **updated:** [docs/validation/rule-01.md](docs/validation/rule-01.md) — Appended a dated independent-audit section with actual run outcomes and cross-checks; Codex text unchanged.
- **updated:** [docs/HANDOFF.md](docs/HANDOFF.md) — Header actors/changes, the integration status replacing 'no publish', audit verification and time-sensitive next actions; other Codex content unchanged.
- **reviewed_unchanged:** [docs/rules/README.md](docs/rules/README.md) — Operation/callable contracts match the scripts reviewed and the commands executed in RUN-20261011-006..009.
- **reviewed_unchanged:** [docs/plans/2026-10-10-rule-01-source-inventory.md](docs/plans/2026-10-10-rule-01-source-inventory.md) — Plan completion claims match the independently reproduced evidence.
- **reviewed_unchanged:** [docs/reviews/2026-10-10-boot-04-final-decisions.md](docs/reviews/2026-10-10-boot-04-final-decisions.md) — Preserves the accepted BOOT-04/D07 decisions; its gates are consistent with the worksheet.
- **reviewed_unchanged:** [docs/plans/2026-10-10-boot-04-decision-worksheet.md](docs/plans/2026-10-10-boot-04-decision-worksheet.md) — The only Codex change notes pdfjs-dist as root tooling outside the product baseline, which is accurate.
- **reviewed_unchanged:** [docs/vision/initial_backlog.csv](docs/vision/initial_backlog.csv) — RULE-01 status implemented_verified_inventory_source_gaps_flagged matches the audited evidence.
- **reviewed_unchanged:** [docs/features.json](docs/features.json) — F-RULE-INVENTORY evidence links resolve to passing runs at the current fingerprint (docs:check enforced).
- **reviewed_unchanged:** [AGENTS.md](AGENTS.md) — The RULE-01 instruction matches the actual tooling and checks.
- **reviewed_unchanged:** [README.md](README.md) — New rules commands and the PDF.js tooling note match package.json.

Full changed-file inventory: [record](docs/changes/CHG-20261011-001.json).

### Limits and next actions

- The audit re-executes the inventory and foundation checks but does not re-acquire every source; only the two CR PDFs and the resources link were re-downloaded.
- No gameplay, engine execution, certification, device, hosted artifact or production evidence; RULE-02/03/04 own those.
- Integration publishes documentation, research metadata and root tooling only; no provisioning or deployment.
- Observe the hosted foundation workflow on the new main commit.
- RULE-02: vendor the pinned closure per ADR0008, planning for CR 2.3.0 (effective 2026-10-16) and set 14 Hyperia City (release 2026-10-23), which the pinned upstream does not cover.

## CHG-20261010-008 — RULE-01 current source and catalog/test inventory

- Status: finalized
- Actor: Codex architect/developer/QA collaborator
- Recorded (UTC): 2026-10-11T00:10:49.911Z
- Event: unknown; recorded retrospectively (recorded_only)
- Source: 9aa11dfd37b87beb2b8a6fc092ea7f8900450220
- Tasks: RULE-01, DOC-01, DOC-02
- Features: F-RESERVED, F-DOCS, F-EVIDENCE, F-RULE-INVENTORY
- Requirements: R29.001, R29.002, R29.003, R29.005, R30.015

### Changes

- **review:** Preserve completed BOOT-04 review in local commit9aa11df and isolate RULE-01 on codex/rule-01-source-inventory. Read current authority, source/certification inputs and accepted engine/asset boundaries; no main/publish/provision action.
- **test:** Fresh container RUN022 passed doctor/verify/bootstrap5/read-only database. Discovery uncovered a newly listed October2026 CR update and future Hyperia City release. Incorrect source-register shape inspection exited1 read-only; obsolete LorcanaJSON URL returned404; preserve discovery gaps and use project-published paths.
- **implementation:** Add tool-only PDF.js6.4.299 acquisition/extraction and inert TypeScript/HTML AST inventories. Acquire 21 primary and5 supplemental source requests with hashes, preserving the initial hunny404. Verify the complete scoped pinned Git tree and all11231 Lorcana blobs, including inert symbolic-link target bytes. No upstream installation/execution or product asset imports.
- **fix:** Retain real failures and test-first regressions: document/PDF/hash/effective-date guards, gallery supplies and unknown promo dates, inherited suite modifiers, glossary/update parsing and symlink blob handling. Initial all-zero rules diff from RUN034 is preserved as superseded; RUN036 verifies nonempty v2 with489 to504 leaves. Probe errors included stale public URLs, truncated root tree, PDF.js document.destroy misuse corrected to loadingTask.destroy, and a host heredoc without docker stdin forwarding that executed no script.
- **test:** RUN023/027/029/033/035 are intentional failing synthetic regressions; RUN024/028/031 and RUN036 pass subsequent fixes. RUN025/026/030 acquire public documents/pinned inert sources. RUN032 retains actual symlink hash-reader failure; RUN034 proves catalog/test hashes but its initial empty rules diff is unqualified. Discovery lint passed for scripts/rules and tests/rules.
- **function:** Implement offline checkSnapshots/readSnapshots and root rules:check/verify-bytes/reproduce/test commands. Ordinary verify/test include integrity/corruption checks without network or ignored-cache inputs; explicit byte/regeneration checks require acquired inputs.
- **test:** Retain RUN037 red corruption fixtures and RUN038 early hash rejection from a misbound future-date fixture; corrected RUN039 passes19 checks plus source/text hashes and exact regeneration. A multi-file documentation patch was rejected on one missing context line before any edits; corrected exact-context patch applied.
- **documentation:** Update operational/index/feature/map/backlog/reservation/handoff/qualification records and distinguish CR2.2 effective, CR2.3 scheduled, incomplete sources and uncertified identities. Preserve initial empty-diff artifact as superseded, original planning registers and all execution evidence. Mark stale whole-fingerprint feature verification pending until fresh proof.
- **fix:** Draft synchronization rejected a Python six-digit fractional timestamp against repository millisecond timestamp format. Correct the recording precision only; no executed times/results altered.
- **test:** Final unchanged executable fingerprint117c9248 verified: RUN040 existing frozen full113/doctor/bootstrap/DB health/integration5; RUN20261011-001 real203-component licenses/advisories and full-history private-value scan,11 notice gaps/zero advisories; RUN002 clean frozen203/full113 without cache/credentials/DB; RUN003 exact source reconstruction/hash/protected scope/config/archive/private-file/listener proof. All logs reviewed.
- **review:** Read-only WSL Docker inspection at final closure observes the same original source bind and healthy PostgreSQL pg18_data mounted at /var/lib/postgresql. No runtime/data recreation or other project touched. F-WEB/F-CI retain historical browser/full hosted/artifact scope rather than infer a new run.
- **documentation:** Close RULE-01 backlog inventory acceptance with flagged source/identity/localization gaps. Record final-source results/limits and next RULE-02/03/04 gates; preserve original548/33/20 and Director-owned launch/provider/asset decisions. Commit locally after canonical/document closure; no push or main change.
- **test:** RUN20261011-004 passes677 canonical staged/live byte comparisons, identical executable fingerprint, current/full-history and canonical docs/config/inventory, focused19, source/document formatting and temporary archive cleanup. Finalize only RULE-01 inventory acceptance; all missing-source/game/engine/device/provider gates remain explicit.

### Verification

- **passed:** RULE-01 fresh existing Dev Container intake: doctor, verify, bootstrap and read-only database; see exact category/timing/log. RUN034 empty diff superseded/unqualified. ([evidence](docs/validation/runs/RUN-20261010-022.json))
- **failed:** Intentional red: inventory rejects false source/catalog/test coverage claims before implementation; see exact category/timing/log. RUN034 empty diff superseded/unqualified. ([evidence](docs/validation/runs/RUN-20261010-023.json))
- **passed:** Eight synthetic source/catalog/AST/rules-diff regressions after implementation; see exact category/timing/log. RUN034 empty diff superseded/unqualified. ([evidence](docs/validation/runs/RUN-20261010-024.json))
- **passed:** RULE-01 public official/community/pinned source acquisition and PDF extraction; failures remain explicit; see exact category/timing/log. RUN034 empty diff superseded/unqualified. ([evidence](docs/validation/runs/RUN-20261010-025.json))
- **passed:** Read-only sparse upstream source acquisition at the accepted pin; no upstream code execution; see exact category/timing/log. RUN034 empty diff superseded/unqualified. ([evidence](docs/validation/runs/RUN-20261010-026.json))
- **failed:** Intentional red: official gallery identity provenance and unresolved promotional release dates; see exact category/timing/log. RUN034 empty diff superseded/unqualified. ([evidence](docs/validation/runs/RUN-20261010-027.json))
- **passed:** Ten synthetic source, rules, static-test, official-gallery and promotional-release safeguards; see exact category/timing/log. RUN034 empty diff superseded/unqualified. ([evidence](docs/validation/runs/RUN-20261010-028.json))
- **failed:** Intentional red: dynamic titles/inherited parameterization and non-rule appendix isolation; see exact category/timing/log. RUN034 empty diff superseded/unqualified. ([evidence](docs/validation/runs/RUN-20261010-029.json))
- **passed:** Additional publisher scenario and official ruling discovery; original404 retained; see exact category/timing/log. RUN034 empty diff superseded/unqualified. ([evidence](docs/validation/runs/RUN-20261010-030.json))
- **passed:** Twelve source/catalog/AST/rule-hash safeguards, including future policies and dynamic declarations; see exact category/timing/log. RUN034 empty diff superseded/unqualified. ([evidence](docs/validation/runs/RUN-20261010-031.json))
- **failed:** Build RULE-01 sourced catalog/rules/static-test inventories; verify every scoped upstream Git blob; see exact category/timing/log. RUN034 empty diff superseded/unqualified. ([evidence](docs/validation/runs/RUN-20261010-032.json))
- **failed:** Intentional red: upstream Git symlinks must be verified as inert blob bytes; see exact category/timing/log. RUN034 empty diff superseded/unqualified. ([evidence](docs/validation/runs/RUN-20261010-033.json))
- **passed:** Thirteen inventory regressions and actual source-bound inventory generation with inert Git symlink verification; see exact category/timing/log. RUN034 empty diff superseded/unqualified. ([evidence](docs/validation/runs/RUN-20261010-034.json))
- **failed:** Intentional red: table-of-contents glossary must not suppress all numbered rules; see exact category/timing/log. RUN034 empty diff superseded/unqualified. ([evidence](docs/validation/runs/RUN-20261010-035.json))
- **passed:** Fourteen regressions and corrected nonempty rules-diff generation; initial empty artifact retained superseded; see exact category/timing/log. RUN034 empty diff superseded/unqualified. ([evidence](docs/validation/runs/RUN-20261010-036.json))
- **failed:** Offline snapshot corruption regressions before checker implementation; see exact category/timing/log. RUN034 empty diff superseded/unqualified. ([evidence](docs/validation/runs/RUN-20261010-037.json))
- **failed:** Offline snapshot checker with corruption regressions and cached source-byte verification; see exact category/timing/log. RUN034 empty diff superseded/unqualified. ([evidence](docs/validation/runs/RUN-20261010-038.json))
- **passed:** Nineteen regressions, cached-byte verification and exact regeneration; corrected future-rule fixture binding; see exact category/timing/log. RUN034 empty diff superseded/unqualified. ([evidence](docs/validation/runs/RUN-20261010-039.json))
- **passed:** Final RULE-01 frozen foundation and continued workspace/bootstrap/live database behavior; exact captured category, source/timing/outcomes in receipt/log. ([evidence](docs/validation/runs/RUN-20261010-040.json))
- **passed:** Installed Linux dependency license/advisory graph and public/full-history secret scan after research-tool pin; exact captured category, source/timing/outcomes in receipt/log. ([evidence](docs/validation/runs/RUN-20261011-001.json))
- **passed:** Clean source-only frozen installation and full offline inventory/application foundation without research cache or private database; exact captured category, source/timing/outcomes in receipt/log. ([evidence](docs/validation/runs/RUN-20261011-002.json))
- **passed:** Final identity/source reproduction, original scope/config/private-file protection and actual listener cleanup; exact captured category, source/timing/outcomes in receipt/log. ([evidence](docs/validation/runs/RUN-20261011-003.json))
- **passed:** Current/full-history docs and exact canonical staged/live bytes677, matching executable fingerprint, canonical configuration/syntax/offline inventory, focused19 and staged formatting; static proof, no new browser/engine/hosting execution. ([evidence](docs/validation/runs/RUN-20261011-004.json))
- **passed:** Finalized documentation coverage/source/callables/map/links/schema/changelog/append-only history and evidence/log identity with consistent paired timing. ([evidence](docs/validation/runs/RUN-20261011-005.json))

### Documentation and files

- **updated:** [AGENTS.md](AGENTS.md) — Compare current RULE-01 source tooling/counts/effective-date/release/certification limits with its owning record; updated pointers/status/ownership without product acceptance.
- **updated:** [README.md](README.md) — Compare current RULE-01 source tooling/counts/effective-date/release/certification limits with its owning record; updated pointers/status/ownership without product acceptance.
- **reviewed_unchanged:** [docs/CHANGELOG_FORMAT.md](docs/CHANGELOG_FORMAT.md) — Same schema-v1/exclusive UTC run/log contract; new task preserves failures and distinguishes acquisition/static/synthetic evidence. No schema change.
- **reviewed_unchanged:** [docs/DEVELOPMENT_WORKFLOW.md](docs/DEVELOPMENT_WORKFLOW.md) — Native task follows intake/semantic review/draft checkpoint/whole-fingerprint pending-and-requalification; ordinary verification remains offline.
- **updated:** [docs/FEATURES.md](docs/FEATURES.md) — Compare current RULE-01 source tooling/counts/effective-date/release/certification limits with its owning record; updated pointers/status/ownership without product acceptance.
- **updated:** [docs/HANDOFF.md](docs/HANDOFF.md) — Compare current RULE-01 source tooling/counts/effective-date/release/certification limits with its owning record; updated pointers/status/ownership without product acceptance.
- **updated:** [docs/README.md](docs/README.md) — Compare current RULE-01 source tooling/counts/effective-date/release/certification limits with its owning record; updated pointers/status/ownership without product acceptance.
- **updated:** [docs/WORKSPACE_QUALIFICATION.md](docs/WORKSPACE_QUALIFICATION.md) — Compare current RULE-01 source tooling/counts/effective-date/release/certification limits with its owning record; updated pointers/status/ownership without product acceptance.
- **reviewed_unchanged:** [docs/adr/0001-local-development-environment.md](docs/adr/0001-local-development-environment.md) — Committed Linux Dev Container/source/private volume/Node/pnpm remain; no OS/manual install or image/runtime change.
- **reviewed_unchanged:** [docs/adr/0002-application-foundation.md](docs/adr/0002-application-foundation.md) — Product package boundaries/synthetic app behavior unchanged; PDF.js is root-only research tooling, existing strict peers and no allowed dependency scripts retained.
- **reviewed_unchanged:** [docs/adr/0003-documentation-evidence.md](docs/adr/0003-documentation-evidence.md) — Inventory uses existing map/file/callable/evidence/changelog schema and failure/time contracts; no new governance architecture.
- **reviewed_unchanged:** [docs/adr/0004-restricted-local-database.md](docs/adr/0004-restricted-local-database.md) — No DB code/roles/SQL/credential changes; source acquisition never imports server data. Prior recreation evidence remains dated.
- **reviewed_unchanged:** [docs/adr/0005-ci-artifact-qualification.md](docs/adr/0005-ci-artifact-qualification.md) — Same launcher/full-history/secret/license/artifact architecture; verify now adds offline inventory so ignored research cache is unnecessary in CI.
- **reviewed_unchanged:** [docs/adr/0007-hosting-provider-baseline.md](docs/adr/0007-hosting-provider-baseline.md) — Preserve accepted OVHcloud/Cloudflare/$25/services/restore gates; research dependency does not provision or amend hosting.
- **reviewed_unchanged:** [docs/adr/0008-engine-placement-dependency-baseline.md](docs/adr/0008-engine-placement-dependency-baseline.md) — Exact pinned engine/trust/RNG/hidden-state/product dependency decisions preserved. Fresh inventory refines counts in its own evidence; cloud benchmark remains attributed, no engine installed.
- **reviewed_unchanged:** [docs/audits/2026-10-06-project-audit.md](docs/audits/2026-10-06-project-audit.md) — Dated original audit/checkpoints preserved; current inventory changes own present feature/backlog/handoff records instead of rewriting executed results.
- **updated:** [docs/changes/CHG-20261010-008.json](docs/changes/CHG-20261010-008.json) — Compare current RULE-01 source tooling/counts/effective-date/release/certification limits with its owning record; updated pointers/status/ownership without product acceptance.
- **updated:** [docs/documentation-map.json](docs/documentation-map.json) — Compare current RULE-01 source tooling/counts/effective-date/release/certification limits with its owning record; updated pointers/status/ownership without product acceptance.
- **updated:** [docs/features.json](docs/features.json) — Compare current RULE-01 source tooling/counts/effective-date/release/certification limits with its owning record; updated pointers/status/ownership without product acceptance.
- **reviewed_unchanged:** [docs/plans/2026-10-06-boot-02-database.md](docs/plans/2026-10-06-boot-02-database.md) — Completed DB scope/independent review/checkpoints unchanged; no database implementation revision.
- **reviewed_unchanged:** [docs/plans/2026-10-06-documentation-governance.md](docs/plans/2026-10-06-documentation-governance.md) — Earlier dated implementation/checkpoints preserved; same universal format applied to new source tooling.
- **reviewed_unchanged:** [docs/plans/2026-10-07-boot-03-ci.md](docs/plans/2026-10-07-boot-03-ci.md) — Completed CI plan and historical checkpoint results preserved; current root validation extends existing offline stage without new hosting/settings claims.
- **updated:** [docs/plans/2026-10-10-boot-04-decision-worksheet.md](docs/plans/2026-10-10-boot-04-decision-worksheet.md) — Compare current RULE-01 source tooling/counts/effective-date/release/certification limits with its owning record; updated pointers/status/ownership without product acceptance.
- **updated:** [docs/plans/2026-10-10-rule-01-source-inventory.md](docs/plans/2026-10-10-rule-01-source-inventory.md) — Compare current RULE-01 source tooling/counts/effective-date/release/certification limits with its owning record; updated pointers/status/ownership without product acceptance.
- **updated:** [docs/rules/2026-10-10-catalog.json](docs/rules/2026-10-10-catalog.json) — Compare current RULE-01 source tooling/counts/effective-date/release/certification limits with its owning record; updated pointers/status/ownership without product acceptance.
- **updated:** [docs/rules/2026-10-10-rules-diff-v2.json](docs/rules/2026-10-10-rules-diff-v2.json) — Compare current RULE-01 source tooling/counts/effective-date/release/certification limits with its owning record; updated pointers/status/ownership without product acceptance.
- **updated:** [docs/rules/2026-10-10-rules-diff.json](docs/rules/2026-10-10-rules-diff.json) — Compare current RULE-01 source tooling/counts/effective-date/release/certification limits with its owning record; updated pointers/status/ownership without product acceptance.
- **updated:** [docs/rules/2026-10-10-sources-supplement.json](docs/rules/2026-10-10-sources-supplement.json) — Compare current RULE-01 source tooling/counts/effective-date/release/certification limits with its owning record; updated pointers/status/ownership without product acceptance.
- **updated:** [docs/rules/2026-10-10-sources.json](docs/rules/2026-10-10-sources.json) — Compare current RULE-01 source tooling/counts/effective-date/release/certification limits with its owning record; updated pointers/status/ownership without product acceptance.
- **updated:** [docs/rules/2026-10-10-upstream-tests.json](docs/rules/2026-10-10-upstream-tests.json) — Compare current RULE-01 source tooling/counts/effective-date/release/certification limits with its owning record; updated pointers/status/ownership without product acceptance.
- **updated:** [docs/rules/README.md](docs/rules/README.md) — Compare current RULE-01 source tooling/counts/effective-date/release/certification limits with its owning record; updated pointers/status/ownership without product acceptance.
- **updated:** [docs/rules/source-specs-supplement.json](docs/rules/source-specs-supplement.json) — Compare current RULE-01 source tooling/counts/effective-date/release/certification limits with its owning record; updated pointers/status/ownership without product acceptance.
- **updated:** [docs/rules/source-specs.json](docs/rules/source-specs.json) — Compare current RULE-01 source tooling/counts/effective-date/release/certification limits with its owning record; updated pointers/status/ownership without product acceptance.
- **reviewed_unchanged:** [docs/runbooks/ci.md](docs/runbooks/ci.md) — Same isolated invocation/result/cleanup/hosted limits; new verify/test subchecks use committed metadata offline and fit existing stages.
- **reviewed_unchanged:** [docs/runbooks/database.md](docs/runbooks/database.md) — Managed identities/migration/health/integration commands unchanged and no ignored credential file rewritten; normal clean check still lacks DB access.
- **updated:** [docs/runbooks/workspace-setup.md](docs/runbooks/workspace-setup.md) — Compare current RULE-01 source tooling/counts/effective-date/release/certification limits with its owning record; updated pointers/status/ownership without product acceptance.
- **reviewed_unchanged:** [docs/templates/change.json](docs/templates/change.json) — Same required keys/enums/time/file/review/evidence format used for CHG008; no format extension.
- **reviewed_unchanged:** [docs/templates/handoff.md](docs/templates/handoff.md) — Same branch/access/owned work/evidence/limits/next-action template followed in RULE-01 handoff.
- **reviewed_unchanged:** [docs/validation/boot-01.md](docs/validation/boot-01.md) — Original dated technical/Windows limits retained; root research addition changes no app ports/rendering/lifecycle. New whole-source checks belong to RULE-01.
- **reviewed_unchanged:** [docs/validation/boot-02.md](docs/validation/boot-02.md) — Dated BOOT-02 units/recreation/recovery evidence retained; ROOT research dependency is not new DB/domain/restore acceptance.
- **reviewed_unchanged:** [docs/validation/boot-03.md](docs/validation/boot-03.md) — First hosted source612a8c9 evidence retained; no new hosted run or artifact qualification inferred from local RULE-01 checks.
- **reviewed_unchanged:** [docs/validation/boot-04.md](docs/validation/boot-04.md) — Final provider/dependency decisions and separate deployment/capacity/restore gates remain; local source inventory needs no paid host.
- **updated:** [docs/validation/logs/RUN-20261010-022.txt](docs/validation/logs/RUN-20261010-022.txt) — Compare current RULE-01 source tooling/counts/effective-date/release/certification limits with its owning record; updated pointers/status/ownership without product acceptance.
- **updated:** [docs/validation/logs/RUN-20261010-023.txt](docs/validation/logs/RUN-20261010-023.txt) — Compare current RULE-01 source tooling/counts/effective-date/release/certification limits with its owning record; updated pointers/status/ownership without product acceptance.
- **updated:** [docs/validation/logs/RUN-20261010-024.txt](docs/validation/logs/RUN-20261010-024.txt) — Compare current RULE-01 source tooling/counts/effective-date/release/certification limits with its owning record; updated pointers/status/ownership without product acceptance.
- **updated:** [docs/validation/logs/RUN-20261010-025.txt](docs/validation/logs/RUN-20261010-025.txt) — Compare current RULE-01 source tooling/counts/effective-date/release/certification limits with its owning record; updated pointers/status/ownership without product acceptance.
- **updated:** [docs/validation/logs/RUN-20261010-026.txt](docs/validation/logs/RUN-20261010-026.txt) — Compare current RULE-01 source tooling/counts/effective-date/release/certification limits with its owning record; updated pointers/status/ownership without product acceptance.
- **updated:** [docs/validation/logs/RUN-20261010-027.txt](docs/validation/logs/RUN-20261010-027.txt) — Compare current RULE-01 source tooling/counts/effective-date/release/certification limits with its owning record; updated pointers/status/ownership without product acceptance.
- **updated:** [docs/validation/logs/RUN-20261010-028.txt](docs/validation/logs/RUN-20261010-028.txt) — Compare current RULE-01 source tooling/counts/effective-date/release/certification limits with its owning record; updated pointers/status/ownership without product acceptance.
- **updated:** [docs/validation/logs/RUN-20261010-029.txt](docs/validation/logs/RUN-20261010-029.txt) — Compare current RULE-01 source tooling/counts/effective-date/release/certification limits with its owning record; updated pointers/status/ownership without product acceptance.
- **updated:** [docs/validation/logs/RUN-20261010-030.txt](docs/validation/logs/RUN-20261010-030.txt) — Compare current RULE-01 source tooling/counts/effective-date/release/certification limits with its owning record; updated pointers/status/ownership without product acceptance.
- **updated:** [docs/validation/logs/RUN-20261010-031.txt](docs/validation/logs/RUN-20261010-031.txt) — Compare current RULE-01 source tooling/counts/effective-date/release/certification limits with its owning record; updated pointers/status/ownership without product acceptance.
- **updated:** [docs/validation/logs/RUN-20261010-032.txt](docs/validation/logs/RUN-20261010-032.txt) — Compare current RULE-01 source tooling/counts/effective-date/release/certification limits with its owning record; updated pointers/status/ownership without product acceptance.
- **updated:** [docs/validation/logs/RUN-20261010-033.txt](docs/validation/logs/RUN-20261010-033.txt) — Compare current RULE-01 source tooling/counts/effective-date/release/certification limits with its owning record; updated pointers/status/ownership without product acceptance.
- **updated:** [docs/validation/logs/RUN-20261010-034.txt](docs/validation/logs/RUN-20261010-034.txt) — Compare current RULE-01 source tooling/counts/effective-date/release/certification limits with its owning record; updated pointers/status/ownership without product acceptance.
- **updated:** [docs/validation/logs/RUN-20261010-035.txt](docs/validation/logs/RUN-20261010-035.txt) — Compare current RULE-01 source tooling/counts/effective-date/release/certification limits with its owning record; updated pointers/status/ownership without product acceptance.
- **updated:** [docs/validation/logs/RUN-20261010-036.txt](docs/validation/logs/RUN-20261010-036.txt) — Compare current RULE-01 source tooling/counts/effective-date/release/certification limits with its owning record; updated pointers/status/ownership without product acceptance.
- **updated:** [docs/validation/logs/RUN-20261010-037.txt](docs/validation/logs/RUN-20261010-037.txt) — Compare current RULE-01 source tooling/counts/effective-date/release/certification limits with its owning record; updated pointers/status/ownership without product acceptance.
- **updated:** [docs/validation/logs/RUN-20261010-038.txt](docs/validation/logs/RUN-20261010-038.txt) — Compare current RULE-01 source tooling/counts/effective-date/release/certification limits with its owning record; updated pointers/status/ownership without product acceptance.
- **updated:** [docs/validation/logs/RUN-20261010-039.txt](docs/validation/logs/RUN-20261010-039.txt) — Compare current RULE-01 source tooling/counts/effective-date/release/certification limits with its owning record; updated pointers/status/ownership without product acceptance.
- **updated:** [docs/validation/rule-01.md](docs/validation/rule-01.md) — Compare current RULE-01 source tooling/counts/effective-date/release/certification limits with its owning record; updated pointers/status/ownership without product acceptance.
- **updated:** [docs/validation/runs/RUN-20261010-022.json](docs/validation/runs/RUN-20261010-022.json) — Compare current RULE-01 source tooling/counts/effective-date/release/certification limits with its owning record; updated pointers/status/ownership without product acceptance.
- **updated:** [docs/validation/runs/RUN-20261010-023.json](docs/validation/runs/RUN-20261010-023.json) — Compare current RULE-01 source tooling/counts/effective-date/release/certification limits with its owning record; updated pointers/status/ownership without product acceptance.
- **updated:** [docs/validation/runs/RUN-20261010-024.json](docs/validation/runs/RUN-20261010-024.json) — Compare current RULE-01 source tooling/counts/effective-date/release/certification limits with its owning record; updated pointers/status/ownership without product acceptance.
- **updated:** [docs/validation/runs/RUN-20261010-025.json](docs/validation/runs/RUN-20261010-025.json) — Compare current RULE-01 source tooling/counts/effective-date/release/certification limits with its owning record; updated pointers/status/ownership without product acceptance.
- **updated:** [docs/validation/runs/RUN-20261010-026.json](docs/validation/runs/RUN-20261010-026.json) — Compare current RULE-01 source tooling/counts/effective-date/release/certification limits with its owning record; updated pointers/status/ownership without product acceptance.
- **updated:** [docs/validation/runs/RUN-20261010-027.json](docs/validation/runs/RUN-20261010-027.json) — Compare current RULE-01 source tooling/counts/effective-date/release/certification limits with its owning record; updated pointers/status/ownership without product acceptance.
- **updated:** [docs/validation/runs/RUN-20261010-028.json](docs/validation/runs/RUN-20261010-028.json) — Compare current RULE-01 source tooling/counts/effective-date/release/certification limits with its owning record; updated pointers/status/ownership without product acceptance.
- **updated:** [docs/validation/runs/RUN-20261010-029.json](docs/validation/runs/RUN-20261010-029.json) — Compare current RULE-01 source tooling/counts/effective-date/release/certification limits with its owning record; updated pointers/status/ownership without product acceptance.
- **updated:** [docs/validation/runs/RUN-20261010-030.json](docs/validation/runs/RUN-20261010-030.json) — Compare current RULE-01 source tooling/counts/effective-date/release/certification limits with its owning record; updated pointers/status/ownership without product acceptance.
- **updated:** [docs/validation/runs/RUN-20261010-031.json](docs/validation/runs/RUN-20261010-031.json) — Compare current RULE-01 source tooling/counts/effective-date/release/certification limits with its owning record; updated pointers/status/ownership without product acceptance.
- **updated:** [docs/validation/runs/RUN-20261010-032.json](docs/validation/runs/RUN-20261010-032.json) — Compare current RULE-01 source tooling/counts/effective-date/release/certification limits with its owning record; updated pointers/status/ownership without product acceptance.
- **updated:** [docs/validation/runs/RUN-20261010-033.json](docs/validation/runs/RUN-20261010-033.json) — Compare current RULE-01 source tooling/counts/effective-date/release/certification limits with its owning record; updated pointers/status/ownership without product acceptance.
- **updated:** [docs/validation/runs/RUN-20261010-034.json](docs/validation/runs/RUN-20261010-034.json) — Compare current RULE-01 source tooling/counts/effective-date/release/certification limits with its owning record; updated pointers/status/ownership without product acceptance.
- **updated:** [docs/validation/runs/RUN-20261010-035.json](docs/validation/runs/RUN-20261010-035.json) — Compare current RULE-01 source tooling/counts/effective-date/release/certification limits with its owning record; updated pointers/status/ownership without product acceptance.
- **updated:** [docs/validation/runs/RUN-20261010-036.json](docs/validation/runs/RUN-20261010-036.json) — Compare current RULE-01 source tooling/counts/effective-date/release/certification limits with its owning record; updated pointers/status/ownership without product acceptance.
- **updated:** [docs/validation/runs/RUN-20261010-037.json](docs/validation/runs/RUN-20261010-037.json) — Compare current RULE-01 source tooling/counts/effective-date/release/certification limits with its owning record; updated pointers/status/ownership without product acceptance.
- **updated:** [docs/validation/runs/RUN-20261010-038.json](docs/validation/runs/RUN-20261010-038.json) — Compare current RULE-01 source tooling/counts/effective-date/release/certification limits with its owning record; updated pointers/status/ownership without product acceptance.
- **updated:** [docs/validation/runs/RUN-20261010-039.json](docs/validation/runs/RUN-20261010-039.json) — Compare current RULE-01 source tooling/counts/effective-date/release/certification limits with its owning record; updated pointers/status/ownership without product acceptance.
- **updated:** [docs/vision/README.md](docs/vision/README.md) — Compare current RULE-01 source tooling/counts/effective-date/release/certification limits with its owning record; updated pointers/status/ownership without product acceptance.
- **reviewed_unchanged:** [docs/vision/additional_scope.csv](docs/vision/additional_scope.csv) — Existing X06/X07 documentation/history obligations followed; no added product scope or loss of optional flags.
- **reviewed_unchanged:** [docs/vision/decision_register.csv](docs/vision/decision_register.csv) — D04 launch catalog deferred until inventory as specified; no new provider/asset/launch decision inferred.
- **updated:** [docs/vision/initial_backlog.csv](docs/vision/initial_backlog.csv) — Compare current RULE-01 source tooling/counts/effective-date/release/certification limits with its owning record; updated pointers/status/ownership without product acceptance.
- **reviewed_unchanged:** [docs/vision/requirements.csv](docs/vision/requirements.csv) — All548 original IDs/text/20 optional flags and wider product acceptance retained; inventory evidence accepts no leaf requirement.
- **updated:** [packages/rules-data/README.md](packages/rules-data/README.md) — Compare current RULE-01 source tooling/counts/effective-date/release/certification limits with its owning record; updated pointers/status/ownership without product acceptance.
- **historical_preserved:** [docs/vision/source_register.json](docs/vision/source_register.json) — Preserve dated planning byte/source/version assumptions. Current exact research evidence lives under docs/rules; no retrospective certification or rewriting.
- **historical_preserved:** [docs/vision/dependencies.json](docs/vision/dependencies.json) — Preserve dated planning byte/source/version assumptions. Current exact research evidence lives under docs/rules; no retrospective certification or rewriting.
- **historical_preserved:** [docs/vision/Development_Blueprint_2026-10-05.md](docs/vision/Development_Blueprint_2026-10-05.md) — Preserve dated planning byte/source/version assumptions. Current exact research evidence lives under docs/rules; no retrospective certification or rewriting.
- **reviewed_unchanged:** [docs/schemas/change.schema.json](docs/schemas/change.schema.json) — Existing schema-v1 change/run/map/state/feature contract remains; source tools use separate metadata integrity checks without governance schema edits.
- **reviewed_unchanged:** [docs/schemas/documentation-map.schema.json](docs/schemas/documentation-map.schema.json) — Existing schema-v1 change/run/map/state/feature contract remains; source tools use separate metadata integrity checks without governance schema edits.
- **reviewed_unchanged:** [docs/schemas/state.schema.json](docs/schemas/state.schema.json) — Existing schema-v1 change/run/map/state/feature contract remains; source tools use separate metadata integrity checks without governance schema edits.
- **reviewed_unchanged:** [docs/schemas/features.schema.json](docs/schemas/features.schema.json) — Existing schema-v1 change/run/map/state/feature contract remains; source tools use separate metadata integrity checks without governance schema edits.
- **reviewed_unchanged:** [docs/schemas/run.schema.json](docs/schemas/run.schema.json) — Existing schema-v1 change/run/map/state/feature contract remains; source tools use separate metadata integrity checks without governance schema edits.

Full changed-file inventory: [record](docs/changes/CHG-20261010-008.json).

### Limits and next actions

- Inventory only; no engine vendor integration, gameplay certification, asset serving, format admission or deployment.
- Original source/dependency/planning registers remain historical; current source gaps and future release states must be explicit.
- Missing notes1–8/14, full cooperative rulesheets and localized coverage; catalog identity reconciliation/promo release proof and game/engine certification remain separate.
- Static upstream modifier totals overlap and are not runtime case/pass counts. PDF extraction can contaminate changed-text candidates.
- RULE-02 pinned minimal vendoring/license/patch closure and reproduced upstream suite/precompiled Node24 execution when assigned.
- Carry missing sources/provisional identity/promo dates and scheduled CR2.3 into RULE-04 certification and D04 launch policy; no premature game admission.

## CHG-20261010-007 — Review signed-off BOOT-04 decisions before RULE-01

- Status: finalized
- Actor: Codex architect/developer/QA reviewer
- Recorded (UTC): 2026-10-10T22:22:02.601Z
- Event: unknown; recorded retrospectively (recorded_only)
- Source: efe166d9557ce501b6fd795133f12201ac7fd756
- Tasks: BOOT-04, DOC-01, DOC-02
- Features: F-STAGING, F-DOCS, F-EVIDENCE
- Requirements: R01.006, R15.015, R20.003, R28.008, R29.005, R30.012

### Changes

- **review:** Read the complete signed-off BOOT-04 package and compare its inventories, precedence, engine trust modes, dependencies, D07 policy and future gates with actual source/registers. No blocker to RULE-01 source inventory; do not reopen decisions or implement RULE-01.
- **documentation:** Record review coverage and carry-forward source, capacity, WAL/restore, replay privacy and asset gates; update current indexes, qualification, BOOT-04 evidence and handoff without rewriting earlier executed evidence.
- **test:** RUN014 preserves exit0 with clock_changed; RUN015 repeats doctor/static-docs/bootstrap5/read-only DB and passes with consistent paired timing. Logs reviewed. No clock/validator alteration or runtime/private-data change.
- **review:** Read-only GitHub metadata reports successful Foundation run38088257250 for intake efe166d; this is a reported remote status, not independently downloaded artifact qualification.
- **test:** Initial orchestration string failed parsing before launching any tool; corrected caller construction only. RUN016 then preserves a real overly broad initial-register byte assertion failure, plus clock discontinuity. All548 original source texts match the checklist; correct the assertion to preserve original identity/text/optional fields and exact current intake bytes, while retaining legitimate earlier evidence metadata.
- **test:** RUN017 preserves a check-caller SyntaxError before assertions; replace-string dollar expansion corrupted embedded Python regex text. Reconstruct from original command and use a replacement callback. Only the caller changes; retain receipt/log and unchanged code/registers.
- **test:** RUN018 completed all corrected assertions, installed-claim checks and full-history secret scan with child exit0, but its recorder failed clock_changed (wall18.597s, monotonic20.915s). RUN019 independently passed short source/register/package/private-file/listener preservation with consistent timing. Preserve all receipts and logs; neither timing validation nor project code changed.
- **test:** RUN020 passed the synchronized documentation gate with consistent timing. The final review/handoff prose carries unchanged decisions and separately pending source, deployment, asset, restore and device gates; final gate outcomes remain in their receipts.
- **documentation:** Finish the full accepted-decision review and final handoff; RUN021 passed final documentation checks with consistent timing. Finalize this review-only change and regenerate current views; all acceptance limits and failed attempts remain visible.

### Verification

- **failed:** All four child baseline commands exited0, but clock discontinuity failed the receipt; no passing acceptance. ([evidence](docs/validation/runs/RUN-20261010-014.json))
- **passed:** Existing-container doctor/static-docs/config/bootstrap5/read-only bootstrap DB with consistent timing and unchanged executable fingerprint. ([evidence](docs/validation/runs/RUN-20261010-015.json))
- **failed:** Docs gate passed; register assertion incorrectly demanded original335 byte identity despite legitimate BOOT-01 ticket/evidence additions. Child exit1, with additional clock_changed qualification failure. No later installed-claim/secret scan pass claimed. ([evidence](docs/validation/runs/RUN-20261010-016.json))
- **failed:** Node syntax failure in the inline checker caller before any assertions ran; JavaScript replacement-string expansion corrupted an embedded regex. Consistent clock; no product or validator change. ([evidence](docs/validation/runs/RUN-20261010-017.json))
- **failed:** Corrected combined assertions, docs and full-history secret scan emitted PASS and exited0; clock discontinuity invalidates passing acceptance. All output retained and reviewed. ([evidence](docs/validation/runs/RUN-20261010-018.json))
- **passed:** Original548 IDs/text/optional scope and exact intake bytes,33 groups/20 optional flags,61 selected dependencies,20 installed claims/30 owning-package references,32 task statuses, dated quote arithmetic, unchanged executable/config/dependency bytes, ignored0600 UID1000 private files, actual TCP rows with no5173/3001/3002 listeners and formatting. Does not qualify prices/capacity, docs or the long full-history scan. ([evidence](docs/validation/runs/RUN-20261010-019.json))
- **passed:** Synchronized documentation coverage, source/function inventory, links, schemas, append-only records/log digests, feature evidence and changelog consistency; consistent paired clock, no application change. ([evidence](docs/validation/runs/RUN-20261010-020.json))
- **passed:** Final reviewed handoff/prose, documentation classifications/coverage, source/callable inventory, schemas, links, log digests, changelog and evidence consistency with exact paired timing. No product/engine/device/provider acceptance. ([evidence](docs/validation/runs/RUN-20261010-021.json))

### Documentation and files

- **reviewed_unchanged:** [AGENTS.md](AGENTS.md) — Accepted provider/budget, engine and D07 instructions agree with final worksheet; no implementation or permission boundary changed.
- **reviewed_unchanged:** [README.md](README.md) — Final OVHcloud baseline and notice agree with signed-off worksheet and policy; no art or game activation claim.
- **reviewed_unchanged:** [docs/FEATURES.md](docs/FEATURES.md) — F-STAGING correctly distinguishes final decisions and pending deployment/capacity/restore.
- **reviewed_unchanged:** [docs/features.json](docs/features.json) — Staging remains planned/pending; executable features retain source-matched evidence.
- **reviewed_unchanged:** [docs/plans/2026-10-10-boot-04-decision-worksheet.md](docs/plans/2026-10-10-boot-04-decision-worksheet.md) — Reviewed all sections, appendices and sources; preserve final Director choices and carry future capacity/restore/source qualification forward.
- **reviewed_unchanged:** [docs/adr/0007-hosting-provider-baseline.md](docs/adr/0007-hosting-provider-baseline.md) — Accepted OVHcloud/Cloudflare hosting decision and staged durability gates preserved.
- **reviewed_unchanged:** [docs/adr/0008-engine-placement-dependency-baseline.md](docs/adr/0008-engine-placement-dependency-baseline.md) — Rewarded and hidden-information games remain authoritative; browser trust-free modes and pinned closure require later qualification.
- **reviewed_unchanged:** [docs/policies/fan-content.md](docs/policies/fan-content.md) — D07 provenance/notice/free-access/fallback requirements and recorded policy verification limit preserved.
- **reviewed_unchanged:** [docs/vision/initial_backlog.csv](docs/vision/initial_backlog.csv) — BOOT-04 final decision/deployment-pending distinction is correct; RULE-01 remains pending with source/hash/count/skipped-test acceptance.
- **reviewed_unchanged:** [docs/vision/decision_register.csv](docs/vision/decision_register.csv) — D02/D03/D07 decisions preserved; domain/public durability/privacy/device choices remain separate.
- **reviewed_unchanged:** [infra/README.md](infra/README.md) — No remote/provider configuration exists; local-only runtime boundary accurately documented.
- **reviewed_unchanged:** [docs/vision/README.md](docs/vision/README.md) — Current decision precedence and preserved source/dependency snapshots agree with signed-off package.
- **reviewed_unchanged:** [docs/DEVELOPMENT_WORKFLOW.md](docs/DEVELOPMENT_WORKFLOW.md) — Review follows intake, scoped evidence, append-only failed receipts and precise handoff convention.
- **reviewed_unchanged:** [docs/CHANGELOG_FORMAT.md](docs/CHANGELOG_FORMAT.md) — Use recorded-only review timestamp; actual tests carry clock-qualified execution receipts.
- **updated:** [docs/HANDOFF.md](docs/HANDOFF.md) — Record dated accepted-decision review and exact evidence categories/results, preserving final choices and separately pending runtime/source/device gates.
- **updated:** [docs/README.md](docs/README.md) — Record dated accepted-decision review and exact evidence categories/results, preserving final choices and separately pending runtime/source/device gates.
- **updated:** [docs/WORKSPACE_QUALIFICATION.md](docs/WORKSPACE_QUALIFICATION.md) — Record dated accepted-decision review and exact evidence categories/results, preserving final choices and separately pending runtime/source/device gates.
- **updated:** [docs/validation/boot-04.md](docs/validation/boot-04.md) — Record dated accepted-decision review and exact evidence categories/results, preserving final choices and separately pending runtime/source/device gates.
- **updated:** [docs/reviews/2026-10-10-boot-04-final-decisions.md](docs/reviews/2026-10-10-boot-04-final-decisions.md) — Record dated accepted-decision review and exact evidence categories/results, preserving final choices and separately pending runtime/source/device gates.
- **updated:** [docs/documentation-map.json](docs/documentation-map.json) — Record dated accepted-decision review and exact evidence categories/results, preserving final choices and separately pending runtime/source/device gates.
- **historical_preserved:** [docs/vision/Development_Blueprint_2026-10-05.md](docs/vision/Development_Blueprint_2026-10-05.md) — Read original scope and contracts; accepted ADRs amend hosting/engine placement while retaining original vision.
- **historical_preserved:** [docs/vision/dependencies.json](docs/vision/dependencies.json) — Read selected61-package baseline and compare current manifests; does not claim future pins installed.
- **historical_preserved:** [docs/vision/source_register.json](docs/vision/source_register.json) — Original40-source snapshot supplies RULE-01 discovery inputs; dates/hashes/current authority require future acquisition.

Full changed-file inventory: [record](docs/changes/CHG-20261010-007.json).

### Limits and next actions

- Review/documentation only; no RULE-01 implementation, engine certification, provisioning, deployment, purchase, device or restore acceptance.
- Dated provider quotes and exploratory cloud benchmark remain attributed planning inputs; actual stock/usage/capacity/RPO require later evidence.
- Reported current hosted success is not independent artifact qualification; prior RUN061 retains its precise scope.
- WSL wall-clock steps invalidated RUN014/018 and additionally RUN016; valid fresh intake RUN015 and scoped static RUN019 have consistent paired clocks. Long full-history scan output in RUN018 is retained under a failed receipt.
- Begin RULE-01 in a separate assigned scope: current official bytes, hashes, effective dates and supersession; rules diff, catalog identities/printings/release mapping and skipped-test counts with denominators. No paid hosting prerequisite.
- Preserve accepted BOOT-04 decisions and explicit later deployment, capacity, restoration, asset-policy and device gates.

## CHG-20261010-006 — Director-authorized publication and main integration of the D07 decision and BOOT-04 sign-off

- Status: finalized
- Actor: Claude Code agent (architect/developer role) on Director request, local WSL session
- Recorded (UTC): 2026-10-10T21:35:55.687Z
- Event: unknown; recorded retrospectively (recorded_only)
- Source: 54a85d45e74db5cc4888931b2b62669c37f5995c
- Tasks: BOOT-04, DOC-01, DOC-02
- Features: F-DOCS
- Requirements: none

### Changes

- **revision:** The Director authorized publishing claude/boot-04-signoff-d07 (finalized CHG-20261010-005 at 54a85d4) and fast-forwarding main to it. Main fast-forwards to the commit containing this record; no history rewrite. The branch is retained.
- **documentation:** Handoff records the authorized integration and that the hosted workflow for the new main commit must be observed rather than inferred.

### Verification

- **passed:** Local Dev Container docs:check of the integration record and updated handoff on the draft snapshot; unchanged executable fingerprint. The hosted workflow on the new main commit is observed separately. ([evidence](docs/validation/runs/RUN-20261010-013.json))

### Documentation and files

- **updated:** [docs/HANDOFF.md](docs/HANDOFF.md) — Repository status changed to Director-authorized main integration; the publication gate is removed from pending gates and next actions.
- **reviewed_unchanged:** [docs/policies/fan-content.md](docs/policies/fan-content.md) — Integration changes no policy content.
- **reviewed_unchanged:** [docs/vision/initial_backlog.csv](docs/vision/initial_backlog.csv) — BOOT-04 status unchanged by integration.

Full changed-file inventory: [record](docs/changes/CHG-20261010-006.json).

### Limits and next actions

- Integration only; no executable, dependency, provisioning, DNS, deployment or setting change.
- The hosted foundation workflow result for the new main commit must be observed separately.
- Observe the foundation workflow on the new main commit.
- RULE-01 source inventory.

## CHG-20261010-005 — Record Director D07 asset decision, fan-content notice and BOOT-04 sign-off

- Status: finalized
- Actor: Claude Code agent (architect/developer role) on Director request, local WSL session
- Recorded (UTC): 2026-10-10T21:31:16.285Z
- Event: unknown; recorded retrospectively (recorded_only)
- Source: a810bfd07eac05a87ccbf0a8b5ea4fa77a8af274
- Tasks: BOOT-04, DOC-01, DOC-02
- Features: F-STAGING, F-DOCS
- Requirements: none

### Changes

- **documentation:** Record the Director's D07 decision (2026-10-10): use all planned Disney Lorcana assets, card art and images in full under Ravensburger fan-content terms, with the required notice and no charges for use or access. New current docs/policies/fan-content.md holds the verbatim notice and its placement (README now; web app before any official asset is shown outside local development; published media), plus the no-payment, no-endorsement, per-asset provenance and takedown-readiness rules.
- **review:** Checked the policy URL in the notice: it resolves to Ravensburger's Community Code PDF (conduct policy, effective 2023-05-10), which does not itself state fan-content permissions or the notice. The brand-portal Fan Content Policy could not be read automatically. This verification gap and the revocation risk (Community Code sole discretion; Pixelborn 2024) are recorded; the decision is the Director's.
- **revision:** Record the BOOT-04 §12 sign-off: all items accepted; purchase-specific items (domain/D01, payment methods, purchase) execute when the first staging deploy is ready. Update the worksheet status/§2/§12, ADR0007 status, BOOT-04 validation, F-STAGING, the backlog status, decision register D02/D03/D07, the AGENTS.md asset boundary, the README notice, the indexes and the handoff.
- **test:** Local Dev Container RUN-20261010-011 pnpm verify and RUN-20261010-012 test:documentation passed on the draft snapshot (clock drift 0 ms; executable fingerprint unchanged).

### Verification

- **passed:** pnpm verify (configuration/syntax/documentation consistency) in the local Dev Container; unchanged executable fingerprint. Validates consistency, not legal sufficiency of the asset policy. ([evidence](docs/validation/runs/RUN-20261010-011.json))
- **passed:** Documentation/evidence regression suite in the local Dev Container. ([evidence](docs/validation/runs/RUN-20261010-012.json))

### Documentation and files

- **updated:** [docs/policies/fan-content.md](docs/policies/fan-content.md) — New current policy with the Director-supplied notice verbatim; placement and rules derived from the decision. Verification limits match the retrieved Community Code PDF and the unreadable brand portal.
- **updated:** [docs/plans/2026-10-10-boot-04-decision-worksheet.md](docs/plans/2026-10-10-boot-04-decision-worksheet.md) — §12 checked off per the Director, with purchase items marked at purchase; status and §2 record the sign-off and D07. Decisions otherwise unchanged.
- **updated:** [docs/vision/decision_register.csv](docs/vision/decision_register.csv) — D02 durability and D03 region accepted; D07 records the Director decision with privacy terms still open. Other rows unchanged.
- **updated:** [docs/vision/initial_backlog.csv](docs/vision/initial_backlog.csv) — BOOT-04 status now records the sign-off; deployment configuration still pending.
- **updated:** [docs/validation/boot-04.md](docs/validation/boot-04.md) — Current status reflects the recorded sign-off and D07; deployment configuration remains open.
- **updated:** [docs/adr/0007-hosting-provider-baseline.md](docs/adr/0007-hosting-provider-baseline.md) — Status line: sign-off recorded; purchase deferred.
- **updated:** [AGENTS.md](AGENTS.md) — The asset boundary now reflects D07: official assets permitted with provenance, notice, no charges and neutral fallback; synthetic fixtures remain for tests.
- **updated:** [README.md](README.md) — Adds the required fan-content notice (subject 'This project') and a link to the policy.
- **updated:** [docs/README.md](docs/README.md) — BOOT-04 row notes the recorded sign-off; new fan content policy row.
- **updated:** [docs/vision/README.md](docs/vision/README.md) — Records the sign-off and the D07 decision.
- **updated:** [docs/FEATURES.md](docs/FEATURES.md) — F-STAGING limits: sign-off recorded; capacity/restore evidence still pending.
- **updated:** [docs/features.json](docs/features.json) — F-STAGING description: sign-off recorded; purchase deferred; still planned/pending.
- **updated:** [docs/HANDOFF.md](docs/HANDOFF.md) — Session handoff for the D07/sign-off change, including the outside branch switch observed in the reflog.
- **reviewed_unchanged:** [docs/adr/0008-engine-placement-dependency-baseline.md](docs/adr/0008-engine-placement-dependency-baseline.md) — Engine/dependency decisions unaffected by asset rights.
- **historical_preserved:** [docs/vision/Development_Blueprint_2026-10-05.md](docs/vision/Development_Blueprint_2026-10-05.md) — The planning snapshot keeps its original D07 recommendation; the decision register and policy record the change.

Full changed-file inventory: [record](docs/changes/CHG-20261010-005.json).

### Limits and next actions

- Documentation only: no executable change; the web-app notice display is a later UX/WEB acceptance gate.
- The Ravensburger Fan Content Policy page itself was not readable automatically; it must be re-read and recorded before public launch. Not legal advice.
- No purchase, account, domain, DNS or deployment; purchase-specific checklist items execute later.
- Director authorizes publishing and merging claude/boot-04-signoff-d07.
- RULE-01 source inventory including asset provenance fields.
- UX/WEB: render the required notice before showing official assets outside local development.

## CHG-20261010-004 — Director-authorized publication and main integration of the BOOT-04 Codex reconciliation

- Status: finalized
- Actor: Claude Code agent (architect/developer role) on Director request, local WSL session
- Recorded (UTC): 2026-10-10T21:04:59.255Z
- Event: unknown; recorded retrospectively (recorded_only)
- Source: fcddc5c86e941db1c2d9fa7441f7353fe9b8f284
- Tasks: BOOT-04, DOC-01, DOC-02
- Features: F-DOCS
- Requirements: none

### Changes

- **revision:** The Director authorized publishing claude/boot-04-codex-reconciliation (finalized CHG-20261010-003 at fcddc5c), fast-forwarding main to it, and dropping the teleport stash. Main fast-forwards to the commit containing this record; no history rewrite. The branch is retained.
- **removal:** Dropped local stash@{0} ('Stashing to teleport the Claude Session', commit 0af9ba102cbdc039051987f54bca2fac56ad2eb5, base 5819142). CHG-20261010-003 restored its non-conflicting edits and hand-merged its conflicting edits. The commit stays recoverable by SHA only until git garbage collection. The empty local branch codex/boot-04-provider-plan is retained.
- **documentation:** Handoff records the authorized integration, the stash drop, and that the hosted workflow for the new main commit must be observed rather than inferred.

### Verification

- **passed:** Local Dev Container docs:check of the integration record and updated handoff on the draft snapshot; unchanged executable fingerprint. The hosted workflow on the new main commit is observed separately. ([evidence](docs/validation/runs/RUN-20261010-010.json))

### Documentation and files

- **updated:** [docs/HANDOFF.md](docs/HANDOFF.md) — Repository status changed: Director-authorized publication and main integration; teleport stash dropped; merge and stash approvals removed from pending gates.
- **reviewed_unchanged:** [docs/validation/boot-04.md](docs/validation/boot-04.md) — Integration changes no BOOT-04 evidence, decision or pending status.
- **reviewed_unchanged:** [docs/vision/initial_backlog.csv](docs/vision/initial_backlog.csv) — BOOT-04 status unchanged by integration.

Full changed-file inventory: [record](docs/changes/CHG-20261010-004.json).

### Limits and next actions

- Integration and stash removal only; no executable, dependency, provisioning, DNS, deployment or setting change.
- The hosted foundation workflow result for the new main commit must be observed separately.
- Observe the foundation workflow on the new main commit.
- Director completes the BOOT-04 worksheet §12 sign-off; then RULE-01.

## CHG-20261010-003 — Reconcile preserved Codex BOOT-04 research with the finalized decision worksheet

- Status: finalized
- Actor: Claude Code agent (architect/developer role) on Director request, local WSL session
- Recorded (UTC): 2026-10-10T21:00:22.897Z
- Event: unknown; recorded retrospectively (recorded_only)
- Source: 3687bedd461ae14ae2b70dac37b140259d407078
- Tasks: BOOT-04, DOC-01, DOC-02
- Features: F-STAGING, F-DOCS, F-EVIDENCE
- Requirements: none

### Changes

- **review:** Local intake found uncommitted Codex BOOT-04 research from 2026-10-07/08: 41 untracked files plus stash@{0} edits to 15 tracked files based on 5819142. Compared it against the finalized BOOT-04 worksheet, ADR0007 and ADR0008 merged at 3687bed. The Director chose to reconcile, keeping the finalized decisions authoritative and the Codex data as evidence.
- **revision:** Restore unchanged as evidence: Codex records CHG-20261007-005 and CHG-20261008-001/002; RUN-20261007-063..067 and RUN-20261008-001..009 with logs (failures preserved); cost/source fixtures; duels.ink observations. Restore the October 7/8 plans and the proposed ADR file 0007-single-host-beta-proposal.md with only a dated supersession note. Classify them historical (observations: evidence).
- **revision:** Restore the non-conflicting stash edits: the corrected hosted-CI sentence in DEVELOPMENT_WORKFLOW, the F-STAGING planned feature, and the FEATURES/WORKSPACE_QUALIFICATION/README entries. Reword them to the final decisions. Hand-merge the conflicting AGENTS, docs/README, vision/README, infra/README, backlog, decision register, documentation map and handoff onto main's versions. Do not carry over the Codex proposal files added as impact sources on current documents.
- **documentation:** Adopt Codex findings into the worksheet: Director inputs (primarily North America; up to 50 concurrent invited-beta players; cost tiers before a ceiling); duels.ink reference facts; the remote-runtime prerequisite (APP_ENV=local enforced in packages/service-runtime/src/lifecycle.ts); the 50-player growth fixture; build/restore separation; and a section listing preserved research. Add matching notes to ADR0007 and D02/D03, make validation/boot-04.md the current BOOT-04 evidence document, and rewrite the handoff.
- **test:** Local Dev Container (Node 24.21.0/pnpm 10.33.0) intake RUN-20261010-004 doctor and RUN-20261010-005 read-only db:check passed. Final verify/test:documentation runs are referenced in verification.
- **test:** Final local Dev Container checks: RUN-20261010-006 pnpm verify passed. RUN-20261010-007 test:documentation failed when the WSL wall clock stepped back about 2.3 s mid-run (wall 3448 ms vs monotonic 5760 ms): one timing test saw clock_changed instead of timeout, and the recorder failed the run. Preserved unchanged; no test or validator was altered. After confirming 0 ms drift, RUN-20261010-008 reran the same suite on unchanged source and passed. RUN-20261010-009 docs:check passed after the handoff/evidence updates.

### Verification

- **passed:** Local Dev Container intake pnpm run doctor at 3687bed (Node 24.21.0/pnpm 10.33.0). ([evidence](docs/validation/runs/RUN-20261010-004.json))
- **passed:** Local Dev Container read-only bootstrap PostgreSQL 18 connectivity (db:check). ([evidence](docs/validation/runs/RUN-20261010-005.json))
- **passed:** pnpm verify (configuration/syntax/documentation consistency) on the reconciled draft snapshot; unchanged executable fingerprint 8e52e134… ([evidence](docs/validation/runs/RUN-20261010-006.json))
- **failed:** test:documentation failed on a WSL wall-clock step (clock_changed), not a source defect; preserved per the wall-clock correction policy. ([evidence](docs/validation/runs/RUN-20261010-007.json))
- **passed:** Rerun of test:documentation after clock stabilization; unchanged source. ([evidence](docs/validation/runs/RUN-20261010-008.json))
- **passed:** Final docs:check after recording the RUN-007/008 outcomes in the handoff and evidence document. ([evidence](docs/validation/runs/RUN-20261010-009.json))

### Documentation and files

- **updated:** [docs/plans/2026-10-10-boot-04-decision-worksheet.md](docs/plans/2026-10-10-boot-04-decision-worksheet.md) — Decisions unchanged and authoritative. Added the Codex-recorded Director inputs, duels.ink facts, remote-runtime prerequisite, growth fixture, build/restore separation and the preserved-research section. The 50-player arithmetic was checked against the measured 25–34 ms/action.
- **updated:** [docs/adr/0007-hosting-provider-baseline.md](docs/adr/0007-hosting-provider-baseline.md) — Reconciliation note: the same-numbered Codex proposal is superseded evidence; NA/50-player inputs support US-EAST-VA and VPS-3.
- **updated:** [docs/validation/boot-04.md](docs/validation/boot-04.md) — Now the current BOOT-04 evidence document, with a status section listing actual run categories/outcomes and the adopted/not-adopted findings. The Codex checkpoint text is retained unchanged below it.
- **historical_preserved:** [docs/adr/0007-single-host-beta-proposal.md](docs/adr/0007-single-host-beta-proposal.md) — Codex proposal restored unchanged except for a dated supersession note; reclassified historical.
- **historical_preserved:** [docs/plans/2026-10-08-single-host-reassessment.md](docs/plans/2026-10-08-single-host-reassessment.md) — Codex research restored unchanged except for a dated supersession note listing adopted and not-adopted items; reclassified historical.
- **historical_preserved:** [docs/plans/2026-10-07-boot-04-provider-research.md](docs/plans/2026-10-07-boot-04-provider-research.md) — Codex research restored unchanged except for a dated supersession note; reclassified historical.
- **historical_preserved:** [docs/plans/boot-04-costs.json](docs/plans/boot-04-costs.json) — Codex quoted-rate fixture restored byte-for-byte; historical.
- **historical_preserved:** [docs/plans/boot-04-sources.json](docs/plans/boot-04-sources.json) — Codex source-retrieval metadata restored byte-for-byte; historical.
- **historical_preserved:** [docs/plans/boot-04-single-host-costs.json](docs/plans/boot-04-single-host-costs.json) — Codex single-host cost fixture restored byte-for-byte; historical.
- **historical_preserved:** [docs/plans/boot-04-single-host-sources.json](docs/plans/boot-04-single-host-sources.json) — Codex single-host source metadata restored byte-for-byte; historical.
- **historical_preserved:** [docs/research/2026-10-08-duels-observations.json](docs/research/2026-10-08-duels-observations.json) — Codex browser observations restored byte-for-byte; classified evidence.
- **updated:** [AGENTS.md](AGENTS.md) — Main's BOOT-04 boundary kept; added that the Codex research is superseded evidence and its proposed ADR file is not accepted.
- **updated:** [README.md](README.md) — The restored Codex paragraph now states the final BOOT-04 decisions, preserved research and the APP_ENV=local limit.
- **updated:** [docs/README.md](docs/README.md) — BOOT-04 index row links the evidence document and notes the preserved research.
- **updated:** [docs/vision/README.md](docs/vision/README.md) — Notes the preserved research and the carried-forward Director inputs.
- **updated:** [docs/vision/decision_register.csv](docs/vision/decision_register.csv) — D02 records the cost-tier request before the $25 cap; D03 records North America and up to 50 concurrent players with the US-EAST-VA selection.
- **updated:** [docs/vision/initial_backlog.csv](docs/vision/initial_backlog.csv) — BOOT-04 status unchanged; validation/boot-04.md added to the evidence links.
- **updated:** [infra/README.md](infra/README.md) — States that services still require APP_ENV=local and that remote runtime support is remaining configuration work.
- **updated:** [docs/FEATURES.md](docs/FEATURES.md) — F-STAGING row restored and reworded to the final decisions; planned only.
- **updated:** [docs/features.json](docs/features.json) — F-STAGING restored (required by the Codex records), with a description/documents/sources matching the final decisions; planned/pending, no evidence claimed.
- **updated:** [docs/WORKSPACE_QUALIFICATION.md](docs/WORKSPACE_QUALIFICATION.md) — Codex dated qualification sections restored; appended a dated reconciliation section with actual local intake results.
- **updated:** [docs/DEVELOPMENT_WORKFLOW.md](docs/DEVELOPMENT_WORKFLOW.md) — Restored the Codex correction: hosted CI was qualified by RUN061 at 612a8c9, replacing the stale 'hosted execution unverified' text.
- **updated:** [docs/HANDOFF.md](docs/HANDOFF.md) — Rewritten for the local session: branch, retained stash/branch, Dev Container execution, verification and next actions.
- **reviewed_unchanged:** [docs/runbooks/ci.md](docs/runbooks/ci.md) — CI operation unchanged; its statements remain accurate.
- **reviewed_unchanged:** [docs/validation/boot-03.md](docs/validation/boot-03.md) — Hosted qualification evidence unchanged.
- **reviewed_unchanged:** [docs/validation/boot-05.md](docs/validation/boot-05.md) — Its statement that BOOT-04 keeps Director prerequisites remains accurate.
- **reviewed_unchanged:** [docs/adr/0008-engine-placement-dependency-baseline.md](docs/adr/0008-engine-placement-dependency-baseline.md) — Engine/dependency decisions unaffected; the Codex research made no engine decision.
- **historical_preserved:** [docs/vision/Development_Blueprint_2026-10-05.md](docs/vision/Development_Blueprint_2026-10-05.md) — Planning snapshot preserved.

Full changed-file inventory: [record](docs/changes/CHG-20261010-003.json).

### Limits and next actions

- Documentation and evidence restoration only: no executable, dependency, private data, provisioning, DNS, deployment or setting change.
- The Codex records/runs/logs are restored as authored; this change does not re-execute or re-qualify their research.
- stash@{0} and the empty local branch codex/boot-04-provider-plan are retained until the Director approves dropping them after merge.
- Director approves merging claude/boot-04-codex-reconciliation into main; observe the hosted workflow.
- After the merge, drop stash@{0} with Director approval.
- RULE-01, then RULE-02 per ADR0008; BOOT-04 configuration including remote runtime support before the first outside tester.

## CHG-20261010-002 — Director-authorized BOOT-04 branch integration into main

- Status: finalized
- Actor: Claude Code agent (architect/research role) on Director request
- Recorded (UTC): 2026-10-10T19:09:21.954Z
- Event: unknown; recorded retrospectively (recorded_only)
- Source: 2fa0ab79619700569014b795d220221c9ab930c5
- Tasks: BOOT-04, DOC-01, DOC-02
- Features: F-DOCS
- Requirements: none

### Changes

- **revision:** The Director authorized pushing and merging claude/lorcana-tcg-stack-research-6vyhh9 (finalized CHG-20261010-001 at 2fa0ab7) into main on 2026-10-10. Main fast-forwards to the commit containing this record; no history rewrite, and the branch is retained.
- **documentation:** Handoff now states main integration and that the triggered foundation workflow result must be observed, not inferred.

### Verification

- **passed:** Static docs:check of the integration record and updated handoff on the draft snapshot; unchanged executable fingerprint; cloud container, not the Dev Container. Hosted workflow on the new main commit is observed separately. ([evidence](docs/validation/runs/RUN-20261010-003.json))

### Documentation and files

- **updated:** [docs/HANDOFF.md](docs/HANDOFF.md) — The repository/branch status changed from branch-only to Director-authorized main integration; the hosted workflow for the new main commit is pending observation.
- **reviewed_unchanged:** [docs/plans/2026-10-10-boot-04-decision-worksheet.md](docs/plans/2026-10-10-boot-04-decision-worksheet.md) — Merging does not change any decision, quote or pending sign-off/provisioning status.
- **reviewed_unchanged:** [docs/vision/initial_backlog.csv](docs/vision/initial_backlog.csv) — BOOT-04 status is unchanged by integration; sign-off and configuration remain pending.

Full changed-file inventory: [record](docs/changes/CHG-20261010-002.json).

### Limits and next actions

- The integration publishes documentation only; no account, purchase, DNS, deployment or setting change.
- Hosted foundation workflow results for the new main commit must be observed separately.
- Observe the foundation workflow on the new main commit.
- Director completes the BOOT-04 worksheet §12 sign-off.

## CHG-20261010-001 — BOOT-04 finalized provider, stack and spend decision worksheet

- Status: finalized
- Actor: Claude Code agent (architect/research role) on Director request
- Recorded (UTC): 2026-10-10T05:28:24.148Z
- Event: unknown; recorded retrospectively (recorded_only)
- Source: 5819142f76a1ea853b804af8b768048a3dccc4dd
- Tasks: BOOT-04, DOC-01, DOC-02
- Features: F-RESERVED, F-DOCS
- Requirements: none

### Changes

- **review:** Review the full vision (548 requirements in 33 groups, X01–X07, blueprint, backlog, decision and dependency registers) against the Director's $25/month hosting cap and the no-scope-reduction instruction. Classify server-authoritative, browser trust-free, content and CI workloads.
- **documentation:** Add the BOOT-04 decision worksheet. It contains: decision register B4-01…B4-15; environments/projects/accounts; host resource budget; DNS and secret inventory; line-item quotes with sources and retrieval UTC; cost controls; re-open triggers; the Director sign-off checklist; remaining configuration scope; the exact dependency baseline (61 register packages, additions, platform pins, later vendor choices); and the exploratory measurement summary with its harness.
- **documentation:** Add ADR0007: OVHcloud US VPS-3 US-EAST-VA, Cloudflare Free/Tunnel/Workers static assets/R2, pgBackRest to R2+B2, Resend/Sentry/UptimeRobot free tiers, pull-based deploys; supersedes the blueprint's Render/Pages/Oregon/allowance rows. Add ADR0008: keep the pinned tcg-engines fork; server-authoritative plus browser trust-free placement; injected node:crypto randomness; Node 24 production with Bun CI-only; dependency keep/defer/add/exclude decisions.
- **revision:** Update the BOOT-04 backlog status/evidence and the D02/D03 working recommendations. Add BOOT-04 pointers to AGENTS.md, docs/README.md, docs/vision/README.md and infra/README.md. Map the three new current documents with source-impact edges. Rewrite the handoff for this session.
- **test:** Static documentation validation with checksum-verified Node 24.21.0/pnpm 10.33.0 in the Claude Code cloud container (no Docker daemon, so no Dev Container): recorded docs:check and test:documentation runs referenced below. Exploratory engine/bundle measurements ran outside the repository and are not recorded evidence.

### Verification

- **passed:** Static docs:check of the complete BOOT-04 document set on the CHG draft snapshot; unchanged executable fingerprint 8e52e134…; Claude Code cloud container with Node 24.21.0/pnpm 10.33.0, not the Dev Container. Validates consistency, not vendor facts or prose truth. ([evidence](docs/validation/runs/RUN-20261010-001.json))
- **passed:** Static documentation/evidence regression suite (test:documentation) on the same source; cloud container, not the Dev Container. ([evidence](docs/validation/runs/RUN-20261010-002.json))

### Documentation and files

- **updated:** [docs/plans/2026-10-10-boot-04-decision-worksheet.md](docs/plans/2026-10-10-boot-04-decision-worksheet.md) — New current BOOT-04 worksheet. Every price/version/limit was compared against its cited source, retrieval time, installed manifests, the register and the upstream lockfile at 53a7941. Requirement IDs were checked against requirements.csv.
- **updated:** [docs/adr/0007-hosting-provider-baseline.md](docs/adr/0007-hosting-provider-baseline.md) — New ADR amending blueprint hosting rows with comparative quotes and affected IDs; no provisioning claimed.
- **updated:** [docs/adr/0008-engine-placement-dependency-baseline.md](docs/adr/0008-engine-placement-dependency-baseline.md) — New ADR for engine placement/runtime/randomness/dependencies. Measurements are labeled exploratory; RULE-02 acceptance is unchanged and still pending.
- **updated:** [AGENTS.md](AGENTS.md) — The current implementation boundary now names the recorded BOOT-04 decisions and that provisioning remains unauthorized.
- **updated:** [docs/README.md](docs/README.md) — Indexes the worksheet and ADR0007/0008 with pending sign-off/purchase/configuration.
- **updated:** [docs/vision/README.md](docs/vision/README.md) — Records that the ADRs amend the preserved blueprint hosting baseline and that no purchase occurred.
- **updated:** [docs/vision/initial_backlog.csv](docs/vision/initial_backlog.csv) — BOOT-04 status is now worksheet finalized, with sign-off and configuration pending; evidence links added. Other rows are unchanged.
- **updated:** [docs/vision/decision_register.csv](docs/vision/decision_register.csv) — D02 reflects the Director's 2026-10-08 $25/month cap, with durability sign-off still open. D03 records the US-EAST-VA hosting selection pending audience evidence. Other decisions are unchanged.
- **updated:** [infra/README.md](infra/README.md) — Points to the recorded hosting decisions while stating that no configuration exists.
- **updated:** [docs/HANDOFF.md](docs/HANDOFF.md) — Session handoff per the template, with the actual cloud execution limits, evidence categories, pending gates and next actions.
- **reviewed_unchanged:** [README.md](README.md) — Describes local foundation operation and checks only; no hosting/provider claim to change.
- **reviewed_unchanged:** [docs/FEATURES.md](docs/FEATURES.md) — No behavior changed; F-RESERVED still accurately reserves production infrastructure/engine scope.
- **reviewed_unchanged:** [docs/features.json](docs/features.json) — No implemented/verified status changes; F-RESERVED already lists BOOT-04.
- **reviewed_unchanged:** [docs/WORKSPACE_QUALIFICATION.md](docs/WORKSPACE_QUALIFICATION.md) — Its BOOT-04-pending statements remain true (sign-off/configuration/purchase pending).
- **reviewed_unchanged:** [docs/runbooks/ci.md](docs/runbooks/ci.md) — CI operation unchanged; its BOOT-04-pending statement remains accurate. The public repository keeps standard runners free.
- **reviewed_unchanged:** [docs/validation/boot-03.md](docs/validation/boot-03.md) — Hosted qualification evidence unchanged; BOOT-04 still pending.
- **reviewed_unchanged:** [docs/validation/boot-05.md](docs/validation/boot-05.md) — Its statement that BOOT-04 keeps Director prerequisites remains accurate.
- **reviewed_unchanged:** [docs/runbooks/database.md](docs/runbooks/database.md) — Local role model is unchanged; the worksheet extends the same role naming to staging/prod without implementing it.
- **reviewed_unchanged:** [docs/audits/2026-10-06-project-audit.md](docs/audits/2026-10-06-project-audit.md) — The reserved infra/vendor/engine rows remain accurate: no hosting or upstream code activated.
- **reviewed_unchanged:** [vendor/tcg-engines/README.md](vendor/tcg-engines/README.md) — Still reserved for RULE-02; its ledger requirements match ADR0008.
- **reviewed_unchanged:** [packages/engine-adapter/README.md](packages/engine-adapter/README.md) — Reserved package description remains accurate; ADR0008 defines the future placement.
- **historical_preserved:** [docs/vision/Development_Blueprint_2026-10-05.md](docs/vision/Development_Blueprint_2026-10-05.md) — Planning snapshot preserved; ADR0007/0008 amend §3.1/§3.3/§5.2–5.3/§14.4 without rewriting it.
- **historical_preserved:** [docs/vision/dependencies.json](docs/vision/dependencies.json) — Researched 61-package planning register preserved; the worksheet records keep/defer/add decisions.
- **historical_preserved:** [docs/vision/source_register.json](docs/vision/source_register.json) — Original Render/R2/Resend source references preserved as research history.

Full changed-file inventory: [record](docs/changes/CHG-20261010-001.json).

### Limits and next actions

- Decisions and documentation only: no account, purchase, DNS, deployment, credential, setting or visibility change.
- Vendor prices/stock/terms can change; quotes are retrieval-dated and must be confirmed at checkout.
- Engine/bundle measurements are exploratory (cloud container, Bun 1.4.2 and Node 22.22.0/tsx, outside the recorder) and do not qualify RULE-02 or any requirement.
- No Dev Container or Docker daemon was available; only static documentation checks were recorded.
- Director completes the worksheet §12 sign-off before any purchase.
- BOOT-04 configuration change: Compose profiles, PostgreSQL+pgBackRest image, cloudflared/wrangler configuration, pull-deploy timer, host hardening, hosting runbook.
- RULE-01 source inventory, then RULE-02 vendor closure per ADR0008, with Dev Container reproduction of the measurement harness.

## CHG-20261008-002 — Post-checkpoint evidence references and hosted-CI documentation correction

- Status: finalized
- Actor: Codex architect/researcher/QA
- Recorded (UTC): 2026-10-08T18:50:26.332Z
- Event: unknown; recorded retrospectively (recorded_only)
- Source: 5819142f76a1ea853b804af8b768048a3dccc4dd
- Tasks: BOOT-04, DOC-01, DOC-02
- Features: F-STAGING, F-DOCS, F-EVIDENCE
- Requirements: R30.009, R30.012, R30.013, R30.014

### Changes

- **documentation:** Add passing finalized research RUN007 reference to current validation/handoff; correct stale hosted-pending universal workflow text against existing BOOT-03 RUN061 at commit612a8c9. No new hosted execution or product acceptance claimed.
- **test:** Post-finalization refresh underCHG001 was rejected by the new-record guard; docs:check then reported stale snapshot. RUN008 durably reproduces/preserves that failure. RestoreCHG001 to its last synchronized finalized content and use this separate correction record; leave validators and raw evidence unchanged.
- **test:** RUN009 passes the separate correction documentation gate with consistent paired timing. Finalize only documentation follow-up; preserve finalized001 content, all failed attempts, unchanged runtime source and pending BOOT-04/provider/device acceptance.

### Verification

- **passed:** Finalized001 research documentation gate before follow-up wording/reference changes. ([evidence](docs/validation/runs/RUN-20261008-007.json))
- **failed:** Actual stale snapshot after post-finalization prose/reference edits; new correction record required. No application failure. ([evidence](docs/validation/runs/RUN-20261008-008.json))
- **passed:** Corrected002 documentation snapshot/inventory/links/history/evidence consistency with consistent paired timing; sanitized log reviewed. Final status/reference refresh checked by synchronization. ([evidence](docs/validation/runs/RUN-20261008-009.json))

### Documentation and files

- **updated:** [docs/DEVELOPMENT_WORKFLOW.md](docs/DEVELOPMENT_WORKFLOW.md) — Existing BOOT-03 RUN061 qualifies first hosted run; settings/cancellation remain pending. Replace stale hosted-pending statement only.
- **updated:** [docs/HANDOFF.md](docs/HANDOFF.md) — Separate finalized research001 and this later evidence-reference/workflow correction; preserve access, timing and deployment limits.
- **updated:** [docs/validation/boot-04.md](docs/validation/boot-04.md) — Retain RUN007 actual passing scope and RUN008 actual failure; overall BOOT-04 remains in progress.

Full changed-file inventory: [record](docs/changes/CHG-20261008-002.json).

### Limits and next actions

- Documentation-only follow-up; no runtime/dependency/private data changes, hosted rerun, provisioning, authenticated reference or device acceptance.
- BOOT-04 remains in progress; research proposal is unapproved.
- Review the single-host proposal and final NA quote, operator/recovery/budget/domain decisions with the Director; no provisioning authorized.

## CHG-20261008-001 — BOOT-04 single-host reassessment using the Duels reference

- Status: finalized
- Actor: Codex architect/researcher/QA
- Recorded (UTC): 2026-10-08T18:45:04.163Z
- Event: unknown; recorded retrospectively (recorded_only)
- Source: 5819142f76a1ea853b804af8b768048a3dccc4dd
- Tasks: BOOT-04, DOC-01, DOC-02
- Features: F-STAGING, F-DOCS, F-EVIDENCE
- Requirements: R30.009, R30.012, R30.013, R30.014

### Changes

- **review:** Reassess October7 managed-service preference against the Director-supplied one-host Duels stack. Inspect accessible public pages, delivered JS, sanitized console/network signals and own guest bot turn/reload/cleanup; authenticated Codex session remains unreachable.
- **revision:** Prefer one Dokploy-managed NA host with local PostgreSQL and bounded processes, optional Redis/pooler, cached assets and off-host backups. Preserve full vision/authority/package boundaries; larger paid/HA footprints become conditional alternatives.
- **documentation:** Record proposed ADR, dated provider semantics/rate retrievals, explicit costs/unknowns, observed source hashes/coverage/access limits and updated current recommendation/handoff.
- **test:** Fresh baseline RUN001 passed existing-container doctor/static/docs/bootstrap5/read-only DB. RUN003 passes source/rate/arithmetic/scope/observation checks; RUN006 passes corrected final docs/history/secret/preservation checks. Failed attempts retained separately.
- **fix:** Documentation edit initially used generic status/evidence names instead of implementation_status/evidence_links and interrupted CSV output. Reconstructed all baseline rows plus the intended BOOT-04 update; correction verification then used an overwritten local variable and failed before comparing the right file. Final explicit-path comparison proves all32 task rows and unrelated values preserved. No application/private data affected.
- **test:** RUN-20261008-002 retains a real static-check KeyError from using optional instead of source_optional. Earlier source/rate/cost assertions ran before the failure; no complete pass claimed. Source retrieval clock audit separately flags four discontinuous raw intervals, preserving wall/monotonic samples and body hashes.
- **test:** RUN004 preserves a caller TypeError in sourceSecretScan after successful docs/static checks; privateRedactionValues returns an object. Correct only the invocation to Object.values, retaining the scanner and failed receipt.
- **test:** RUN005 exited0 after corrected documentation/secret checks, but the recorder failed it for clock_changed. Review also identified over-escaped line/field splitting in its port probe; no listener proof is claimed. Preserve raw receipt/log; rerun proper TCP parsing with consistent clock samples, without changing the recorder or clocks.
- **test:** RUN006 passes corrected final static/documentation/history/private-file/preservation checks with actual TCP parsing and consistent paired timing. Sanitized logs reviewed. Finalize only this research correction, keeping overall BOOT-04/provider/capacity/recovery acceptance pending.

### Verification

- **passed:** Actual existing-container fresh baseline; no application changes or provider/device qualification. ([evidence](docs/validation/runs/RUN-20261008-001.json))
- **failed:** Static research check failed on source_optional CSV field named optional in the check; actual requirements unchanged. Preserve failure; rerun corrected field. ([evidence](docs/validation/runs/RUN-20261008-002.json))
- **passed:** Corrected static assertions:16 source body hashes, expected404, exact NA/EU/USD rate selectors, four sums/unknowns, scope548/33/20 and32 preserved task rows,14 observed surfaces/eight assets and sanitized limits. Source wall intervals separately labeled; no provider/runtime certification. ([evidence](docs/validation/runs/RUN-20261008-003.json))
- **failed:** Docs/static gates passed; combined proof stopped because the caller supplied the secret-helper object instead of its value array. No secret finding or downstream preservation pass is claimed; corrected invocation follows. ([evidence](docs/validation/runs/RUN-20261008-004.json))
- **failed:** Exit0 with clock_discontinuous/failure_reason clock_changed is not passing acceptance. Over-escaped port parsing also required correction; no actual listener proof claimed from this run. ([evidence](docs/validation/runs/RUN-20261008-005.json))
- **passed:** Corrected final static/docs gates, current/full-history known-secret scan, unchanged executable fingerprint, ignored owner-only private files and actual15 kernel TCP rows proving no app listeners. Consistent paired clock; no provider/device qualification. ([evidence](docs/validation/runs/RUN-20261008-006.json))

### Documentation and files

- **updated:** [AGENTS.md](AGENTS.md) — Review the October8 one-host recommendation against unchanged local-only code and the Director's correction; preserve dated evidence, full product/free-feature scope, explicit browser/backend limits and pending approval/capacity/recovery.
- **updated:** [README.md](README.md) — Review the October8 one-host recommendation against unchanged local-only code and the Director's correction; preserve dated evidence, full product/free-feature scope, explicit browser/backend limits and pending approval/capacity/recovery.
- **updated:** [docs/README.md](docs/README.md) — Review the October8 one-host recommendation against unchanged local-only code and the Director's correction; preserve dated evidence, full product/free-feature scope, explicit browser/backend limits and pending approval/capacity/recovery.
- **updated:** [docs/HANDOFF.md](docs/HANDOFF.md) — Review the October8 one-host recommendation against unchanged local-only code and the Director's correction; preserve dated evidence, full product/free-feature scope, explicit browser/backend limits and pending approval/capacity/recovery.
- **updated:** [docs/FEATURES.md](docs/FEATURES.md) — Review the October8 one-host recommendation against unchanged local-only code and the Director's correction; preserve dated evidence, full product/free-feature scope, explicit browser/backend limits and pending approval/capacity/recovery.
- **updated:** [docs/features.json](docs/features.json) — Review the October8 one-host recommendation against unchanged local-only code and the Director's correction; preserve dated evidence, full product/free-feature scope, explicit browser/backend limits and pending approval/capacity/recovery.
- **updated:** [docs/documentation-map.json](docs/documentation-map.json) — Review the October8 one-host recommendation against unchanged local-only code and the Director's correction; preserve dated evidence, full product/free-feature scope, explicit browser/backend limits and pending approval/capacity/recovery.
- **updated:** [docs/WORKSPACE_QUALIFICATION.md](docs/WORKSPACE_QUALIFICATION.md) — Review the October8 one-host recommendation against unchanged local-only code and the Director's correction; preserve dated evidence, full product/free-feature scope, explicit browser/backend limits and pending approval/capacity/recovery.
- **updated:** [docs/vision/README.md](docs/vision/README.md) — Review the October8 one-host recommendation against unchanged local-only code and the Director's correction; preserve dated evidence, full product/free-feature scope, explicit browser/backend limits and pending approval/capacity/recovery.
- **updated:** [docs/vision/decision_register.csv](docs/vision/decision_register.csv) — Review the October8 one-host recommendation against unchanged local-only code and the Director's correction; preserve dated evidence, full product/free-feature scope, explicit browser/backend limits and pending approval/capacity/recovery.
- **updated:** [docs/vision/initial_backlog.csv](docs/vision/initial_backlog.csv) — Review the October8 one-host recommendation against unchanged local-only code and the Director's correction; preserve dated evidence, full product/free-feature scope, explicit browser/backend limits and pending approval/capacity/recovery.
- **updated:** [infra/README.md](infra/README.md) — Review the October8 one-host recommendation against unchanged local-only code and the Director's correction; preserve dated evidence, full product/free-feature scope, explicit browser/backend limits and pending approval/capacity/recovery.
- **updated:** [docs/validation/boot-04.md](docs/validation/boot-04.md) — Review the October8 one-host recommendation against unchanged local-only code and the Director's correction; preserve dated evidence, full product/free-feature scope, explicit browser/backend limits and pending approval/capacity/recovery.
- **updated:** [docs/plans/2026-10-07-boot-04-provider-research.md](docs/plans/2026-10-07-boot-04-provider-research.md) — Review the October8 one-host recommendation against unchanged local-only code and the Director's correction; preserve dated evidence, full product/free-feature scope, explicit browser/backend limits and pending approval/capacity/recovery.
- **updated:** [docs/plans/2026-10-08-single-host-reassessment.md](docs/plans/2026-10-08-single-host-reassessment.md) — Review the October8 one-host recommendation against unchanged local-only code and the Director's correction; preserve dated evidence, full product/free-feature scope, explicit browser/backend limits and pending approval/capacity/recovery.
- **updated:** [docs/plans/boot-04-single-host-sources.json](docs/plans/boot-04-single-host-sources.json) — Review the October8 one-host recommendation against unchanged local-only code and the Director's correction; preserve dated evidence, full product/free-feature scope, explicit browser/backend limits and pending approval/capacity/recovery.
- **updated:** [docs/plans/boot-04-single-host-costs.json](docs/plans/boot-04-single-host-costs.json) — Review the October8 one-host recommendation against unchanged local-only code and the Director's correction; preserve dated evidence, full product/free-feature scope, explicit browser/backend limits and pending approval/capacity/recovery.
- **updated:** [docs/research/2026-10-08-duels-observations.json](docs/research/2026-10-08-duels-observations.json) — Review the October8 one-host recommendation against unchanged local-only code and the Director's correction; preserve dated evidence, full product/free-feature scope, explicit browser/backend limits and pending approval/capacity/recovery.
- **updated:** [docs/adr/0007-single-host-beta-proposal.md](docs/adr/0007-single-host-beta-proposal.md) — Review the October8 one-host recommendation against unchanged local-only code and the Director's correction; preserve dated evidence, full product/free-feature scope, explicit browser/backend limits and pending approval/capacity/recovery.

Full changed-file inventory: [record](docs/changes/CHG-20261008-001.json).

### Limits and next actions

- BOOT-04 remains in progress; no provider/budget/recovery/operations/domain selection or deployment.
- Signed-in Codex session/backend sources/socket frames unreachable; accessible browser research is not whole-site or load certification.
- No application/dependency/data/credentials changes; remote runtime remains rejected.
- Four public-source retrieval intervals and RUN005 have discontinuous wall/monotonic samples; raw timing retained, exact intervals unqualified.
- Review the one-host proposal with the Director; settle one NA quote, budget/operator/recovery/domain decisions and make provider-native definitions plus remote runtime support reviewable before provisioning.
- Inspect authenticated reference surfaces if the pending test-session access becomes available; this does not block the topology opinion.

## CHG-20261007-005 — BOOT-04 full-vision provider research and cost comparison checkpoint

- Status: finalized
- Actor: Codex architect/researcher/QA
- Recorded (UTC): 2026-10-07T16:27:05.527Z
- Event: unknown; recorded retrospectively (recorded_only)
- Source: 5819142f76a1ea853b804af8b768048a3dccc4dd
- Tasks: BOOT-04, DOC-01, DOC-02
- Features: F-STAGING, F-DOCS, F-EVIDENCE
- Requirements: R30.009, R30.012, R30.013, R30.014

### Changes

- **review:** Read the full blueprint/checklist/548-leaf register and researched current official provider prices and recovery limitations before proposing services. Director requests cost-tier comparison, primarily North America and up to 50 concurrent players.
- **test:** Fresh existing-container baseline passed doctor, static/documentation verification, five bootstrap tests and read-only PostgreSQL connectivity in RUN063. Public source retrievals are research observations, not deployed-service qualification.
- **documentation:** Prepare a dated full33-group provider research proposal, six explicit quoted-rate cost fixtures, 35 retrieval records (34 successful plus404), service/DNS/secret inventory, recovery/retention/capacity assumptions and future runtime prerequisites. Current indexes, feature/map, backlog, decisions, qualification and handoff distinguish proposal from implemented code.
- **review:** Render/PG18/Cloudflare/Resend/Sentry versus Railway metered PG18 and AWS synchronous RDS/Fargate alternatives researched from current official sources. No provider selection or purchase/deployment. Unknown domain/age/region/account/tax/usage quotes remain explicit; unsupported zero-loss/50-player claims are rejected.
- **test:** RUN064 passed static full-scope/cost/official source-byte/SKU assertions. Source URL404/missing-file extraction and missing ss utility probe are preserved as failed research/probe attempts, not passing acceptance; corrected preservation uses proc TCP tables. No ad hoc tooling installed.
- **fix:** Documentation gate RUN065 correctly rejects added scope X04/X06/X07 in fields restricted to original leaf requirement IDs. Correct only draft change/feature references to affected R30 leaves; retain X01-X07 scope in cost/proposal/task narratives without altering the validator or548-ID register.
- **test:** RUN066 passes corrected docs/static gates, current/full-history known-secret scans, unchanged executable/config/dependency bytes, owner-only ignored private files, actual proc TCP-table no-listener proof and formatting. Finalized scope is the research checkpoint only; BOOT-04 design acceptance remains in progress.
- **test:** RUN067 passed final research checkpoint docs/config/history/log/format consistency after finalizing only completed research; no deployed/load/recovery/device acceptance inferred.

### Verification

- **passed:** Existing-container intake baseline only; sanitized log reviewed. No external deployment/load/recovery/device proof. ([evidence](docs/validation/runs/RUN-20261007-063.json))
- **passed:** Static arithmetic/source observations: six fixtures, 34 retrieved body digests,548 original leaf IDs/20 optional flags unchanged, selected AWS SKU and Sentry monthly rates; no deployed capacity/recovery/security acceptance. ([evidence](docs/validation/runs/RUN-20261007-064.json))
- **failed:** Actual docs:sync failure (exit1) for mistaken scope-vs-leaf ID references; preserved before correcting only draft metadata. No acceptance bypass or validator change. ([evidence](docs/validation/runs/RUN-20261007-065.json))
- **passed:** Corrected current research/docs/static/source/history/secret and preservation gates in existing container before final checkpoint metadata; actual executable fingerprint unchanged, original private files safe/ignored, no owned ports. No provider load/recovery/deployment/device acceptance. ([evidence](docs/validation/runs/RUN-20261007-066.json))
- **passed:** Finalized research checkpoint current/static documentation/configuration/history/log/source-format gates; exit0, unchanged executable fingerprint. Overall BOOT-04 still awaits Director choices and final quotes. ([evidence](docs/validation/runs/RUN-20261007-067.json))

### Documentation and files

- **updated:** [AGENTS.md](AGENTS.md) — Reflect BOOT-04 research/proposal stage and Director NA/50-player/cost-tier inputs; distinguish explicit quote/capacity/recovery assumptions and pending choices from unchanged local-only implemented code, prior proofs and actual deployment.
- **updated:** [README.md](README.md) — Reflect BOOT-04 research/proposal stage and Director NA/50-player/cost-tier inputs; distinguish explicit quote/capacity/recovery assumptions and pending choices from unchanged local-only implemented code, prior proofs and actual deployment.
- **updated:** [docs/README.md](docs/README.md) — Reflect BOOT-04 research/proposal stage and Director NA/50-player/cost-tier inputs; distinguish explicit quote/capacity/recovery assumptions and pending choices from unchanged local-only implemented code, prior proofs and actual deployment.
- **updated:** [docs/HANDOFF.md](docs/HANDOFF.md) — Reflect BOOT-04 research/proposal stage and Director NA/50-player/cost-tier inputs; distinguish explicit quote/capacity/recovery assumptions and pending choices from unchanged local-only implemented code, prior proofs and actual deployment.
- **updated:** [docs/FEATURES.md](docs/FEATURES.md) — Reflect BOOT-04 research/proposal stage and Director NA/50-player/cost-tier inputs; distinguish explicit quote/capacity/recovery assumptions and pending choices from unchanged local-only implemented code, prior proofs and actual deployment.
- **updated:** [docs/features.json](docs/features.json) — Reflect BOOT-04 research/proposal stage and Director NA/50-player/cost-tier inputs; distinguish explicit quote/capacity/recovery assumptions and pending choices from unchanged local-only implemented code, prior proofs and actual deployment.
- **updated:** [docs/documentation-map.json](docs/documentation-map.json) — Reflect BOOT-04 research/proposal stage and Director NA/50-player/cost-tier inputs; distinguish explicit quote/capacity/recovery assumptions and pending choices from unchanged local-only implemented code, prior proofs and actual deployment.
- **updated:** [docs/WORKSPACE_QUALIFICATION.md](docs/WORKSPACE_QUALIFICATION.md) — Reflect BOOT-04 research/proposal stage and Director NA/50-player/cost-tier inputs; distinguish explicit quote/capacity/recovery assumptions and pending choices from unchanged local-only implemented code, prior proofs and actual deployment.
- **updated:** [docs/vision/README.md](docs/vision/README.md) — Reflect BOOT-04 research/proposal stage and Director NA/50-player/cost-tier inputs; distinguish explicit quote/capacity/recovery assumptions and pending choices from unchanged local-only implemented code, prior proofs and actual deployment.
- **updated:** [docs/vision/initial_backlog.csv](docs/vision/initial_backlog.csv) — Reflect BOOT-04 research/proposal stage and Director NA/50-player/cost-tier inputs; distinguish explicit quote/capacity/recovery assumptions and pending choices from unchanged local-only implemented code, prior proofs and actual deployment.
- **updated:** [docs/vision/decision_register.csv](docs/vision/decision_register.csv) — Reflect BOOT-04 research/proposal stage and Director NA/50-player/cost-tier inputs; distinguish explicit quote/capacity/recovery assumptions and pending choices from unchanged local-only implemented code, prior proofs and actual deployment.
- **updated:** [infra/README.md](infra/README.md) — Reflect BOOT-04 research/proposal stage and Director NA/50-player/cost-tier inputs; distinguish explicit quote/capacity/recovery assumptions and pending choices from unchanged local-only implemented code, prior proofs and actual deployment.
- **updated:** [docs/validation/boot-04.md](docs/validation/boot-04.md) — Reflect BOOT-04 research/proposal stage and Director NA/50-player/cost-tier inputs; distinguish explicit quote/capacity/recovery assumptions and pending choices from unchanged local-only implemented code, prior proofs and actual deployment.
- **updated:** [docs/plans/2026-10-07-boot-04-provider-research.md](docs/plans/2026-10-07-boot-04-provider-research.md) — Reflect BOOT-04 research/proposal stage and Director NA/50-player/cost-tier inputs; distinguish explicit quote/capacity/recovery assumptions and pending choices from unchanged local-only implemented code, prior proofs and actual deployment.
- **updated:** [docs/plans/boot-04-costs.json](docs/plans/boot-04-costs.json) — Reflect BOOT-04 research/proposal stage and Director NA/50-player/cost-tier inputs; distinguish explicit quote/capacity/recovery assumptions and pending choices from unchanged local-only implemented code, prior proofs and actual deployment.
- **updated:** [docs/plans/boot-04-sources.json](docs/plans/boot-04-sources.json) — Reflect BOOT-04 research/proposal stage and Director NA/50-player/cost-tier inputs; distinguish explicit quote/capacity/recovery assumptions and pending choices from unchanged local-only implemented code, prior proofs and actual deployment.
- **reviewed_unchanged:** [docs/runbooks/workspace-setup.md](docs/runbooks/workspace-setup.md) — Research changed no application/configuration/dependency or executable callable; current local operation/foundation and source-specific proof remain accurate. This proposal does not accept deployment, real gameplay, devices or full product gates.
- **reviewed_unchanged:** [docs/runbooks/database.md](docs/runbooks/database.md) — Research changed no application/configuration/dependency or executable callable; current local operation/foundation and source-specific proof remain accurate. This proposal does not accept deployment, real gameplay, devices or full product gates.
- **reviewed_unchanged:** [docs/runbooks/ci.md](docs/runbooks/ci.md) — Research changed no application/configuration/dependency or executable callable; current local operation/foundation and source-specific proof remain accurate. This proposal does not accept deployment, real gameplay, devices or full product gates.
- **reviewed_unchanged:** [docs/contracts/protocol.md](docs/contracts/protocol.md) — Research changed no application/configuration/dependency or executable callable; current local operation/foundation and source-specific proof remain accurate. This proposal does not accept deployment, real gameplay, devices or full product gates.
- **reviewed_unchanged:** [docs/contracts/release.md](docs/contracts/release.md) — Research changed no application/configuration/dependency or executable callable; current local operation/foundation and source-specific proof remain accurate. This proposal does not accept deployment, real gameplay, devices or full product gates.
- **reviewed_unchanged:** [docs/validation/boot-01.md](docs/validation/boot-01.md) — Research changed no application/configuration/dependency or executable callable; current local operation/foundation and source-specific proof remain accurate. This proposal does not accept deployment, real gameplay, devices or full product gates.
- **reviewed_unchanged:** [docs/validation/boot-02.md](docs/validation/boot-02.md) — Research changed no application/configuration/dependency or executable callable; current local operation/foundation and source-specific proof remain accurate. This proposal does not accept deployment, real gameplay, devices or full product gates.
- **reviewed_unchanged:** [docs/validation/boot-03.md](docs/validation/boot-03.md) — Research changed no application/configuration/dependency or executable callable; current local operation/foundation and source-specific proof remain accurate. This proposal does not accept deployment, real gameplay, devices or full product gates.
- **reviewed_unchanged:** [docs/validation/boot-05.md](docs/validation/boot-05.md) — Research changed no application/configuration/dependency or executable callable; current local operation/foundation and source-specific proof remain accurate. This proposal does not accept deployment, real gameplay, devices or full product gates.
- **reviewed_unchanged:** [docs/audits/2026-10-06-project-audit.md](docs/audits/2026-10-06-project-audit.md) — Research changed no application/configuration/dependency or executable callable; current local operation/foundation and source-specific proof remain accurate. This proposal does not accept deployment, real gameplay, devices or full product gates.
- **historical_preserved:** [docs/vision/Development_Blueprint_2026-10-05.md](docs/vision/Development_Blueprint_2026-10-05.md) — Preserve authoritative original548/20-optional and X01-X07 scope, researched historical baseline/certification/archive provenance. Provider planning neither rewrites source bytes nor claims product/rules/runtime acceptance.
- **historical_preserved:** [docs/vision/original_action_items.md](docs/vision/original_action_items.md) — Preserve authoritative original548/20-optional and X01-X07 scope, researched historical baseline/certification/archive provenance. Provider planning neither rewrites source bytes nor claims product/rules/runtime acceptance.
- **reviewed_unchanged:** [docs/vision/requirements.csv](docs/vision/requirements.csv) — Preserve authoritative original548/20-optional and X01-X07 scope, researched historical baseline/certification/archive provenance. Provider planning neither rewrites source bytes nor claims product/rules/runtime acceptance.
- **reviewed_unchanged:** [docs/vision/additional_scope.csv](docs/vision/additional_scope.csv) — Preserve authoritative original548/20-optional and X01-X07 scope, researched historical baseline/certification/archive provenance. Provider planning neither rewrites source bytes nor claims product/rules/runtime acceptance.
- **historical_preserved:** [docs/vision/dependencies.json](docs/vision/dependencies.json) — Preserve authoritative original548/20-optional and X01-X07 scope, researched historical baseline/certification/archive provenance. Provider planning neither rewrites source bytes nor claims product/rules/runtime acceptance.
- **historical_preserved:** [docs/vision/source_register.json](docs/vision/source_register.json) — Preserve authoritative original548/20-optional and X01-X07 scope, researched historical baseline/certification/archive provenance. Provider planning neither rewrites source bytes nor claims product/rules/runtime acceptance.
- **historical_preserved:** [docs/vision/rules_certification_template.csv](docs/vision/rules_certification_template.csv) — Preserve authoritative original548/20-optional and X01-X07 scope, researched historical baseline/certification/archive provenance. Provider planning neither rewrites source bytes nor claims product/rules/runtime acceptance.
- **historical_preserved:** [VALIDATION_RESULTS.json](VALIDATION_RESULTS.json) — Preserve authoritative original548/20-optional and X01-X07 scope, researched historical baseline/certification/archive provenance. Provider planning neither rewrites source bytes nor claims product/rules/runtime acceptance.
- **historical_preserved:** [SHA256SUMS.txt](SHA256SUMS.txt) — Preserve authoritative original548/20-optional and X01-X07 scope, researched historical baseline/certification/archive provenance. Provider planning neither rewrites source bytes nor claims product/rules/runtime acceptance.

Full changed-file inventory: [record](docs/changes/CHG-20261007-005.json).

### Limits and next actions

- BOOT-04 remains in progress: Director ceiling/recovery/provider/domain/age/operations and final exact regional/account/domain/tax quotes are open. No new infrastructure is deployed or purchased.
- 50-player capacity, CPU/memory/WAL/asset/egress/replay quantities and reserve percentage are planning assumptions; no benchmark or operational service guarantee.
- AWS NAT allowance comes from an official Ohio example, not a verified us-east-1 SKU; unpriced meters remain explicit. Railway averages are not fixed reservations; Render standby is asynchronous.
- Public raw research cache is ignored; third-party mutable URLs/digests are research observations, not retained provider content/current rules qualification.404 source and missing ss probe are not accepted evidence.
- Existing executable fingerprint is unchanged; Windows/devices, rules/engine/auth/real jobs/gameplay/economy, privacy/content/notice/required-settings/production gates remain separate.
- Receive pending Director recovery answer and domain/registrar/name input; choose ceiling/provider/region/operations ownership and intended age/audience.
- Refresh selected exact quotes and quantities, approve written design, create ADR/provider-native reviewable definitions, then finish BOOT-04 scoped design acceptance.
- Before authorized deployment, implement validated remote runtime/origin/port/secret/image boundaries and execute restricted PG18/auth/drain/restore/load qualification; never set remote APP_ENV=local.

## CHG-20261007-004 — First successful hosted qualification and final publication handoff

- Status: finalized
- Actor: Codex architect/developer/QA
- Recorded (UTC): 2026-10-07T06:38:33.983Z
- Event: unknown; recorded retrospectively (recorded_only)
- Source: 612a8c98b9376298870dc2a2dd772e897daf7911
- Tasks: BOOT-03, DOC-01, DOC-02
- Features: F-CI, F-DOCS, F-EVIDENCE
- Requirements: none

### Changes

- **revision:** Continue finalized CHG-20261007-003 publication snapshot with newly observed actual hosted source612a8c9 success; preserve the earlier in-progress snapshot and original branch/commit history.
- **test:** RUN061 verifies actual completed GitHub run37581249875 and downloaded artifact98 against published source/image/lock/release/executable fingerprint, all12 stages, foundation94/live DB5/browser6/owned cleanup; reported remote times remain distinct from local verification.
- **documentation:** Update relevant instructions/README/features/BOOT-03 register/CI/qualification/audit/current handoff with source-specific hosted evidence. No code/dependency/config/private data/visibility/settings change. BOOT-04/device/required-check/production remain separate.

### Verification

- **passed:** Actual remote success/job/stage/artifact identity and local downloaded archive verification; API remote execution times are reported, wrapper times measure local verification. ([evidence](docs/validation/runs/RUN-20261007-061.json))
- **passed:** Final current/canonical publication and completed-hosted qualification documentation, history/known-secret/format gates; unchanged executable fingerprint; final hosted-success prose matches current/canonical bytes, unchanged qualified executable fingerprint. ([evidence](docs/validation/runs/RUN-20261007-062.json))

### Documentation and files

- **updated:** [AGENTS.md](AGENTS.md) — Actual hosted source612a8c9 success/downloaded RUN061 supersedes earlier hosted-pending snapshots. Update current source-specific qualification/action status while preserving publication/history and pending required-check/cancellation/BOOT-04/device/production gates.
- **updated:** [README.md](README.md) — Actual hosted source612a8c9 success/downloaded RUN061 supersedes earlier hosted-pending snapshots. Update current source-specific qualification/action status while preserving publication/history and pending required-check/cancellation/BOOT-04/device/production gates.
- **updated:** [docs/FEATURES.md](docs/FEATURES.md) — Actual hosted source612a8c9 success/downloaded RUN061 supersedes earlier hosted-pending snapshots. Update current source-specific qualification/action status while preserving publication/history and pending required-check/cancellation/BOOT-04/device/production gates.
- **updated:** [docs/features.json](docs/features.json) — Actual hosted source612a8c9 success/downloaded RUN061 supersedes earlier hosted-pending snapshots. Update current source-specific qualification/action status while preserving publication/history and pending required-check/cancellation/BOOT-04/device/production gates.
- **updated:** [docs/HANDOFF.md](docs/HANDOFF.md) — Actual hosted source612a8c9 success/downloaded RUN061 supersedes earlier hosted-pending snapshots. Update current source-specific qualification/action status while preserving publication/history and pending required-check/cancellation/BOOT-04/device/production gates.
- **updated:** [docs/runbooks/ci.md](docs/runbooks/ci.md) — Actual hosted source612a8c9 success/downloaded RUN061 supersedes earlier hosted-pending snapshots. Update current source-specific qualification/action status while preserving publication/history and pending required-check/cancellation/BOOT-04/device/production gates.
- **updated:** [docs/WORKSPACE_QUALIFICATION.md](docs/WORKSPACE_QUALIFICATION.md) — Actual hosted source612a8c9 success/downloaded RUN061 supersedes earlier hosted-pending snapshots. Update current source-specific qualification/action status while preserving publication/history and pending required-check/cancellation/BOOT-04/device/production gates.
- **updated:** [docs/vision/README.md](docs/vision/README.md) — Actual hosted source612a8c9 success/downloaded RUN061 supersedes earlier hosted-pending snapshots. Update current source-specific qualification/action status while preserving publication/history and pending required-check/cancellation/BOOT-04/device/production gates.
- **updated:** [docs/vision/initial_backlog.csv](docs/vision/initial_backlog.csv) — Actual hosted source612a8c9 success/downloaded RUN061 supersedes earlier hosted-pending snapshots. Update current source-specific qualification/action status while preserving publication/history and pending required-check/cancellation/BOOT-04/device/production gates.
- **updated:** [docs/validation/boot-03.md](docs/validation/boot-03.md) — Actual hosted source612a8c9 success/downloaded RUN061 supersedes earlier hosted-pending snapshots. Update current source-specific qualification/action status while preserving publication/history and pending required-check/cancellation/BOOT-04/device/production gates.
- **updated:** [docs/audits/2026-10-06-project-audit.md](docs/audits/2026-10-06-project-audit.md) — Actual hosted source612a8c9 success/downloaded RUN061 supersedes earlier hosted-pending snapshots. Update current source-specific qualification/action status while preserving publication/history and pending required-check/cancellation/BOOT-04/device/production gates.

Full changed-file inventory: [record](docs/changes/CHG-20261007-004.json).

### Limits and next actions

- Hosted qualification covers source612a8c9 and matching executable fingerprint; later documentation commits trigger separate workflow observations.
- Required checks/branch-protection/cancellation policy, BOOT-04, Windows/hardware, OS/legal/signature/content/engine and production gates remain pending; no settings/spending/deployment changes.
- RULE-01: acquire official current source bytes/rules diff/set/printing/skipped-test inventory with hashes/denominators/release status.
- Check latest main workflow at next intake; qualified source612a8c9/executable fingerprint remains explicit, later metadata commits have separate runs.
- BOOT-04, required-check/cancellation/settings and Windows/device/product/production retain documented prerequisites.

## CHG-20261007-003 — Publish and integrate completed foundation branches into main

- Status: finalized
- Actor: Codex architect/developer/QA
- Recorded (UTC): 2026-10-07T06:26:47.107Z
- Event: 2026-10-07T06:23:31.858Z (execution)
- Source: bf8659ace9d3ac51dbeb61a0032d69154b3a39c7
- Tasks: BOOT-01, BOOT-02, BOOT-03, BOOT-05, DOC-01, DOC-02
- Features: F-CI, F-DOCS, F-EVIDENCE
- Requirements: none

### Changes

- **revision:** Director authorizes publication of all five committed foundation/governance branches and integration into main. Verify remote ancestry, current container checks/secrets, merged result and exact remote refs; preserve all commits/private data and pending BOOT-04/device/hosted gates.
- **revision:** Published all five completed branches atomically with upstream tracking; local main fast-forwarded from335da7e to612a8c9 and ancestry confirms every branch is included. Remote main publication awaits merged-result verification.
- **revision:** After fresh merged-main validation, published main from335da7e to612a8c9; all five remote branch tips are ancestors, retained without rewriting/deleting commits or changing visibility/settings/data.
- **test:** RUN057 baseline/full foundation94 and history/known-secret passed; RUN058 merged-main94 passed; RUN059 proves exact remote refs/ancestry, private environment/listener preservation and timestamped Git actions. Final documentation/canonical checks in RUN060.
- **documentation:** Current handoff, qualification and CI operation record actual publication authorization/results; BOOT-04/device/product/production remain pending; hosted snapshot is observed progress, not completed acceptance.

### Verification

- **passed:** Fresh prepublication baseline, complete foundation94 and current/full-history known-secret gates inside existing Dev Container; exact source/UTC/log receipt; limits remain explicit. ([evidence](docs/validation/runs/RUN-20261007-057.json))
- **passed:** Fresh merged-main full foundation94: ordered builds/types/lint/import/docs/history and all regressions after preserving every branch ancestor; exact source/UTC/log receipt; limits remain explicit. ([evidence](docs/validation/runs/RUN-20261007-058.json))
- **passed:** Read-only publication verification: five exact remote ancestor branches and merged main, preserved private environment/data/listeners and observed hosted state; prior Git action times remain separate; exact source/UTC/log receipt; limits remain explicit. ([evidence](docs/validation/runs/RUN-20261007-059.json))
- **passed:** Final publication/current and canonical staged prose, history/known-secret/format before successful-hosted continuation CHG-20261007-004. ([evidence](docs/validation/runs/RUN-20261007-060.json))

### Documentation and files

- **updated:** [AGENTS.md](AGENTS.md) — Director authorized publication/merge; compare current remote ancestry/main, unchanged executable fingerprint and RUN057…059 against current operating/handoff/evidence text. Record timestamped hosted progress separately from completed qualification and retain BOOT-04/device/production gates.
- **updated:** [README.md](README.md) — Director authorized publication/merge; compare current remote ancestry/main, unchanged executable fingerprint and RUN057…059 against current operating/handoff/evidence text. Record timestamped hosted progress separately from completed qualification and retain BOOT-04/device/production gates.
- **updated:** [docs/HANDOFF.md](docs/HANDOFF.md) — Director authorized publication/merge; compare current remote ancestry/main, unchanged executable fingerprint and RUN057…059 against current operating/handoff/evidence text. Record timestamped hosted progress separately from completed qualification and retain BOOT-04/device/production gates.
- **updated:** [docs/runbooks/ci.md](docs/runbooks/ci.md) — Director authorized publication/merge; compare current remote ancestry/main, unchanged executable fingerprint and RUN057…059 against current operating/handoff/evidence text. Record timestamped hosted progress separately from completed qualification and retain BOOT-04/device/production gates.
- **updated:** [docs/WORKSPACE_QUALIFICATION.md](docs/WORKSPACE_QUALIFICATION.md) — Director authorized publication/merge; compare current remote ancestry/main, unchanged executable fingerprint and RUN057…059 against current operating/handoff/evidence text. Record timestamped hosted progress separately from completed qualification and retain BOOT-04/device/production gates.

Full changed-file inventory: [record](docs/changes/CHG-20261007-003.json).

### Limits and next actions

- BOOT-04 provider definitions/spend worksheet remains pending; Windows/hardware and product/production gates remain separate.
- First hosted workflow snapshot is in progress; no completed hosted qualification, required-check settings or cancellation acceptance inferred.
- No spending, deployment, visibility or branch-protection/settings change performed; observed main protected=false.
- RULE-01 official source acquisition/diff/catalog/printing/skipped-test inventory with hashes/denominators and release-status mapping.
- Check latest main Actions result/artifact identity before hosted qualification; required checks and Windows observation remain separate.
- BOOT-04/provider/budget and UX/engine work retain documented prerequisites.

## CHG-20261007-002 — BOOT-05 strict protocol, release identity and compatibility foundation

- Status: finalized
- Actor: Codex architect/developer/QA
- Recorded (UTC): 2026-10-07T04:38:41.082Z
- Event: unknown; recorded retrospectively (recorded_only)
- Source: 1c2580cac2dd8bafb66d45b26e79ce97c86cce80
- Tasks: BOOT-05, DOC-01, DOC-02
- Features: F-CONTRACTS, F-HTTP, F-WEB, F-BOUNDARIES, F-PROTOCOL, F-RELEASE, F-CI
- Requirements: R30.015

### Changes

- **implementation:** Implement closed bounded public protocol/release schemas, version negotiation, server-only immutable retained pins and built-artifact release identity; preserve future gameplay/auth/sockets/production gates.
- **fix:** Correct four independent review findings: complete executable/runtime/package/SQL release identity, HTTP409 application conflict, own-data validation/revalidated immutable copies and rejection of unimplemented advertised revisions; preserve red/green receipts.
- **test:** Valid/invalid closed DTOs, bounded/correlated live negotiation, immutable retained pins, recomputed outer-hash tampering, server-only browser import and six actual Linux browser cases; final full-source proof follows.
- **documentation:** Align every relevant current package/feature/contract/CI/workspace/task document; retain original vision/optional/Director decisions and labeled historical checkpoint evidence.
- **fix:** Actual isolated proof caught the reviewed hyphenated SQL filename; retained failed RUN048/049, corrected the narrow allowlist and passed RUN050 plus fresh final-source RUN051. Preserve the clock discontinuity as failed; no evidence guard weakened.

### Verification

- **passed:** BOOT-05 intake pinned toolchain and protected private environment; retain exact checkpoint source/outcome; final acceptance requires matching final source. ([evidence](docs/validation/runs/RUN-20261007-035.json))
- **passed:** BOOT-05 intake preserved static and documentation checks; retain exact checkpoint source/outcome; final acceptance requires matching final source. ([evidence](docs/validation/runs/RUN-20261007-036.json))
- **passed:** BOOT-05 intake continued bootstrap behavior; retain exact checkpoint source/outcome; final acceptance requires matching final source. ([evidence](docs/validation/runs/RUN-20261007-037.json))
- **passed:** BOOT-05 intake authenticated read-only bootstrap database; retain exact checkpoint source/outcome; final acceptance requires matching final source. ([evidence](docs/validation/runs/RUN-20261007-038.json))
- **failed:** BOOT-05 red public protocol/release and actual HTTP/retention fixtures before implementation; retain exact checkpoint source/outcome; final acceptance requires matching final source. ([evidence](docs/validation/runs/RUN-20261007-039.json))
- **failed:** BOOT-05 red built release and SQL artifact semantic binding fixtures; retain exact checkpoint source/outcome; final acceptance requires matching final source. ([evidence](docs/validation/runs/RUN-20261007-040.json))
- **failed:** BOOT-05 red real Linux browser compatibility status before client integration; retain exact checkpoint source/outcome; final acceptance requires matching final source. ([evidence](docs/validation/runs/RUN-20261007-041.json))
- **passed:** BOOT-05 green public protocol/release, actual HTTP/retention and artifact semantic-binding fixtures plus strict package builds; retain exact checkpoint source/outcome; final acceptance requires matching final source. ([evidence](docs/validation/runs/RUN-20261007-042.json))
- **passed:** BOOT-05 green actual local negotiation and compatibility/update/malformed client states with continued renderer/service browser checks; retain exact checkpoint source/outcome; final acceptance requires matching final source. ([evidence](docs/validation/runs/RUN-20261007-043.json))
- **historical:** Independent BOOT-05 review: four reproduced findings; parent retains red RUN045/046 and green RUN047, final-source proof follows ([evidence](docs/validation/runs/RUN-20261007-902.json))
- **passed:** BOOT-05 complete existing-container foundation verification: static/docs, types, lint, builds and all regressions; retain exact checkpoint source/outcome; final acceptance requires matching final source. ([evidence](docs/validation/runs/RUN-20261007-044.json))
- **failed:** Review regression red: transitive runtime and manifest binding, HTTP application conflict and unsupported codec advertisement; retain exact checkpoint source/outcome; final acceptance requires matching final source. ([evidence](docs/validation/runs/RUN-20261007-045.json))
- **failed:** Review regression red: reject prototype-only DTOs and invalid post-clone registry data; retain exact checkpoint source/outcome; final acceptance requires matching final source. ([evidence](docs/validation/runs/RUN-20261007-046.json))
- **passed:** Review corrections green: complete runtime/package/migration release identity, 409 negotiation, qualified codec and own-data validation; retain exact checkpoint source/outcome; final acceptance requires matching final source. ([evidence](docs/validation/runs/RUN-20261007-047.json))
- **failed:** Actual isolated BOOT-03 pipeline: frozen foundation, live PostgreSQL, Linux browser, dependency/secret scans and artifacts; retain exact checkpoint source/outcome; final acceptance requires matching final source. ([evidence](docs/validation/runs/RUN-20261007-048.json))
- **failed:** Real migration filename regression red: artifact scope must accept the reviewed hyphenated SQL file; retain exact checkpoint source/outcome; final acceptance requires matching final source. ([evidence](docs/validation/runs/RUN-20261007-049.json))
- **passed:** Real migration filename correction green: complete CI artifact safety including transitive executable and SQL identities; retain exact checkpoint source/outcome; final acceptance requires matching final source. ([evidence](docs/validation/runs/RUN-20261007-050.json))
- **passed:** Actual isolated BOOT-03 pipeline: frozen foundation, live PostgreSQL, Linux browser, dependency/secret scans and artifacts; final matching source and consistent exact UTC/monotonic evidence, scoped local acceptance only. ([evidence](docs/validation/runs/RUN-20261007-051.json))
- **passed:** Final copied artifact v2: source/image/lock, release executable/runtime/package/SQL binding, reports and secret verification; final matching source and consistent exact UTC/monotonic evidence, scoped local acceptance only. ([evidence](docs/validation/runs/RUN-20261007-052.json))
- **passed:** Actual host-orchestrated disposable PostgreSQL recreation: typed rows/journals and role/transaction checks; existing VS Code project/volume untouched; final matching source and consistent exact UTC/monotonic evidence, scoped local acceptance only. ([evidence](docs/validation/runs/RUN-20261007-053.json))
- **passed:** Final canonical staged Git bytes: fresh frozen installation, complete foundation94 and matching executable fingerprint; final matching source and consistent exact UTC/monotonic evidence, scoped local acceptance only. ([evidence](docs/validation/runs/RUN-20261007-054.json))
- **passed:** Read-only closure: actual owned resource/listener cleanup, private/current/staged secret protection, original scope/archive/lock and workspace/volume preservation, staged formatting; final matching source and consistent exact UTC/monotonic evidence, scoped local acceptance only. ([evidence](docs/validation/runs/RUN-20261007-055.json))
- **passed:** Finalized BOOT-05 current/canonical documentation, full-history known-secret and staged formatting gates; unchanged executable identity; final matching source and consistent exact UTC/monotonic evidence, scoped local acceptance only. ([evidence](docs/validation/runs/RUN-20261007-056.json))

### Documentation and files

- **updated:** [AGENTS.md](AGENTS.md) — Compared this owning document/register against the final public contracts, HTTP409/revision1 behavior, immutable pins, app/shared runtime/package/SQL artifact identity and matching RUN051…055; updated its current interface/evidence/status or source-impact coverage while retaining labeled prior checkpoints and pending independent gates.
- **updated:** [README.md](README.md) — Compared this owning document/register against the final public contracts, HTTP409/revision1 behavior, immutable pins, app/shared runtime/package/SQL artifact identity and matching RUN051…055; updated its current interface/evidence/status or source-impact coverage while retaining labeled prior checkpoints and pending independent gates.
- **updated:** [apps/api/README.md](apps/api/README.md) — Compared this owning document/register against the final public contracts, HTTP409/revision1 behavior, immutable pins, app/shared runtime/package/SQL artifact identity and matching RUN051…055; updated its current interface/evidence/status or source-impact coverage while retaining labeled prior checkpoints and pending independent gates.
- **updated:** [apps/match-service/README.md](apps/match-service/README.md) — Compared this owning document/register against the final public contracts, HTTP409/revision1 behavior, immutable pins, app/shared runtime/package/SQL artifact identity and matching RUN051…055; updated its current interface/evidence/status or source-impact coverage while retaining labeled prior checkpoints and pending independent gates.
- **updated:** [apps/web/README.md](apps/web/README.md) — Compared this owning document/register against the final public contracts, HTTP409/revision1 behavior, immutable pins, app/shared runtime/package/SQL artifact identity and matching RUN051…055; updated its current interface/evidence/status or source-impact coverage while retaining labeled prior checkpoints and pending independent gates.
- **reviewed_unchanged:** [apps/worker/README.md](apps/worker/README.md) — Existing semantic controls, synthetic mount/resize/dispose or idle cancellable worker are unchanged and rerun in RUN051/054. Protocol status lives in web and release metadata in contracts/runtime; no assets/jobs/art/device acceptance added here.
- **reviewed_unchanged:** [docs/CHANGELOG_FORMAT.md](docs/CHANGELOG_FORMAT.md) — Governance schemas remain version1: existing UTC/source/log/sealed-history and documentation/canonical handoff rules cover BOOT-05 without a format change. Public release/artifact versions use their separate owning package and ADR; historical review is imported without inventing execution times.
- **reviewed_unchanged:** [docs/DEVELOPMENT_WORKFLOW.md](docs/DEVELOPMENT_WORKFLOW.md) — Governance schemas remain version1: existing UTC/source/log/sealed-history and documentation/canonical handoff rules cover BOOT-05 without a format change. Public release/artifact versions use their separate owning package and ADR; historical review is imported without inventing execution times.
- **updated:** [docs/FEATURES.md](docs/FEATURES.md) — Compared this owning document/register against the final public contracts, HTTP409/revision1 behavior, immutable pins, app/shared runtime/package/SQL artifact identity and matching RUN051…055; updated its current interface/evidence/status or source-impact coverage while retaining labeled prior checkpoints and pending independent gates.
- **updated:** [docs/HANDOFF.md](docs/HANDOFF.md) — Compared this owning document/register against the final public contracts, HTTP409/revision1 behavior, immutable pins, app/shared runtime/package/SQL artifact identity and matching RUN051…055; updated its current interface/evidence/status or source-impact coverage while retaining labeled prior checkpoints and pending independent gates.
- **updated:** [docs/README.md](docs/README.md) — Compared this owning document/register against the final public contracts, HTTP409/revision1 behavior, immutable pins, app/shared runtime/package/SQL artifact identity and matching RUN051…055; updated its current interface/evidence/status or source-impact coverage while retaining labeled prior checkpoints and pending independent gates.
- **updated:** [docs/WORKSPACE_QUALIFICATION.md](docs/WORKSPACE_QUALIFICATION.md) — Compared this owning document/register against the final public contracts, HTTP409/revision1 behavior, immutable pins, app/shared runtime/package/SQL artifact identity and matching RUN051…055; updated its current interface/evidence/status or source-impact coverage while retaining labeled prior checkpoints and pending independent gates.
- **reviewed_unchanged:** [docs/adr/0001-local-development-environment.md](docs/adr/0001-local-development-environment.md) — Reviewed the document against BOOT-05: its existing local environment, previously recorded plan/architectural or reserved scope remains accurate and is retained with its stated time/authority. New protocol/release behavior and current task results are recorded in the owning contract documents, ADR0006 and validation; independent product/device/hosted gates remain unchanged.
- **updated:** [docs/adr/0002-application-foundation.md](docs/adr/0002-application-foundation.md) — Compared this owning document/register against the final public contracts, HTTP409/revision1 behavior, immutable pins, app/shared runtime/package/SQL artifact identity and matching RUN051…055; updated its current interface/evidence/status or source-impact coverage while retaining labeled prior checkpoints and pending independent gates.
- **reviewed_unchanged:** [docs/adr/0003-documentation-evidence.md](docs/adr/0003-documentation-evidence.md) — Reviewed the document against BOOT-05: its existing local environment, previously recorded plan/architectural or reserved scope remains accurate and is retained with its stated time/authority. New protocol/release behavior and current task results are recorded in the owning contract documents, ADR0006 and validation; independent product/device/hosted gates remain unchanged.
- **reviewed_unchanged:** [docs/adr/0004-restricted-local-database.md](docs/adr/0004-restricted-local-database.md) — Managed roles, synthetic SQL, credentials, grant/migration/lifecycle and DB commands remain unchanged; same-source RUN051/053 requalify them. Release identity newly includes the DB runtime/SQL without adding app/domain database integration or altering data.
- **updated:** [docs/adr/0005-ci-artifact-qualification.md](docs/adr/0005-ci-artifact-qualification.md) — Compared this owning document/register against the final public contracts, HTTP409/revision1 behavior, immutable pins, app/shared runtime/package/SQL artifact identity and matching RUN051…055; updated its current interface/evidence/status or source-impact coverage while retaining labeled prior checkpoints and pending independent gates.
- **updated:** [docs/adr/0006-protocol-release-contracts.md](docs/adr/0006-protocol-release-contracts.md) — Compared this owning document/register against the final public contracts, HTTP409/revision1 behavior, immutable pins, app/shared runtime/package/SQL artifact identity and matching RUN051…055; updated its current interface/evidence/status or source-impact coverage while retaining labeled prior checkpoints and pending independent gates.
- **updated:** [docs/audits/2026-10-06-project-audit.md](docs/audits/2026-10-06-project-audit.md) — Compared this owning document/register against the final public contracts, HTTP409/revision1 behavior, immutable pins, app/shared runtime/package/SQL artifact identity and matching RUN051…055; updated its current interface/evidence/status or source-impact coverage while retaining labeled prior checkpoints and pending independent gates.
- **updated:** [docs/contracts/protocol.md](docs/contracts/protocol.md) — Compared this owning document/register against the final public contracts, HTTP409/revision1 behavior, immutable pins, app/shared runtime/package/SQL artifact identity and matching RUN051…055; updated its current interface/evidence/status or source-impact coverage while retaining labeled prior checkpoints and pending independent gates.
- **updated:** [docs/contracts/release.md](docs/contracts/release.md) — Compared this owning document/register against the final public contracts, HTTP409/revision1 behavior, immutable pins, app/shared runtime/package/SQL artifact identity and matching RUN051…055; updated its current interface/evidence/status or source-impact coverage while retaining labeled prior checkpoints and pending independent gates.
- **updated:** [docs/documentation-map.json](docs/documentation-map.json) — Compared this owning document/register against the final public contracts, HTTP409/revision1 behavior, immutable pins, app/shared runtime/package/SQL artifact identity and matching RUN051…055; updated its current interface/evidence/status or source-impact coverage while retaining labeled prior checkpoints and pending independent gates.
- **updated:** [docs/features.json](docs/features.json) — Compared this owning document/register against the final public contracts, HTTP409/revision1 behavior, immutable pins, app/shared runtime/package/SQL artifact identity and matching RUN051…055; updated its current interface/evidence/status or source-impact coverage while retaining labeled prior checkpoints and pending independent gates.
- **reviewed_unchanged:** [docs/plans/2026-10-06-boot-02-database.md](docs/plans/2026-10-06-boot-02-database.md) — Managed roles, synthetic SQL, credentials, grant/migration/lifecycle and DB commands remain unchanged; same-source RUN051/053 requalify them. Release identity newly includes the DB runtime/SQL without adding app/domain database integration or altering data.
- **reviewed_unchanged:** [docs/plans/2026-10-06-documentation-governance.md](docs/plans/2026-10-06-documentation-governance.md) — Reviewed the document against BOOT-05: its existing local environment, previously recorded plan/architectural or reserved scope remains accurate and is retained with its stated time/authority. New protocol/release behavior and current task results are recorded in the owning contract documents, ADR0006 and validation; independent product/device/hosted gates remain unchanged.
- **updated:** [docs/plans/2026-10-07-boot-03-ci.md](docs/plans/2026-10-07-boot-03-ci.md) — Compared this owning document/register against the final public contracts, HTTP409/revision1 behavior, immutable pins, app/shared runtime/package/SQL artifact identity and matching RUN051…055; updated its current interface/evidence/status or source-impact coverage while retaining labeled prior checkpoints and pending independent gates.
- **updated:** [docs/plans/2026-10-07-boot-05-contracts.md](docs/plans/2026-10-07-boot-05-contracts.md) — Compared this owning document/register against the final public contracts, HTTP409/revision1 behavior, immutable pins, app/shared runtime/package/SQL artifact identity and matching RUN051…055; updated its current interface/evidence/status or source-impact coverage while retaining labeled prior checkpoints and pending independent gates.
- **updated:** [docs/runbooks/ci.md](docs/runbooks/ci.md) — Compared this owning document/register against the final public contracts, HTTP409/revision1 behavior, immutable pins, app/shared runtime/package/SQL artifact identity and matching RUN051…055; updated its current interface/evidence/status or source-impact coverage while retaining labeled prior checkpoints and pending independent gates.
- **reviewed_unchanged:** [docs/runbooks/database.md](docs/runbooks/database.md) — Managed roles, synthetic SQL, credentials, grant/migration/lifecycle and DB commands remain unchanged; same-source RUN051/053 requalify them. Release identity newly includes the DB runtime/SQL without adding app/domain database integration or altering data.
- **updated:** [docs/runbooks/workspace-setup.md](docs/runbooks/workspace-setup.md) — Compared this owning document/register against the final public contracts, HTTP409/revision1 behavior, immutable pins, app/shared runtime/package/SQL artifact identity and matching RUN051…055; updated its current interface/evidence/status or source-impact coverage while retaining labeled prior checkpoints and pending independent gates.
- **reviewed_unchanged:** [docs/schemas/change.schema.json](docs/schemas/change.schema.json) — Governance schemas remain version1: existing UTC/source/log/sealed-history and documentation/canonical handoff rules cover BOOT-05 without a format change. Public release/artifact versions use their separate owning package and ADR; historical review is imported without inventing execution times.
- **reviewed_unchanged:** [docs/schemas/documentation-map.schema.json](docs/schemas/documentation-map.schema.json) — Governance schemas remain version1: existing UTC/source/log/sealed-history and documentation/canonical handoff rules cover BOOT-05 without a format change. Public release/artifact versions use their separate owning package and ADR; historical review is imported without inventing execution times.
- **reviewed_unchanged:** [docs/schemas/features.schema.json](docs/schemas/features.schema.json) — Governance schemas remain version1: existing UTC/source/log/sealed-history and documentation/canonical handoff rules cover BOOT-05 without a format change. Public release/artifact versions use their separate owning package and ADR; historical review is imported without inventing execution times.
- **reviewed_unchanged:** [docs/schemas/run.schema.json](docs/schemas/run.schema.json) — Governance schemas remain version1: existing UTC/source/log/sealed-history and documentation/canonical handoff rules cover BOOT-05 without a format change. Public release/artifact versions use their separate owning package and ADR; historical review is imported without inventing execution times.
- **reviewed_unchanged:** [docs/schemas/state.schema.json](docs/schemas/state.schema.json) — Governance schemas remain version1: existing UTC/source/log/sealed-history and documentation/canonical handoff rules cover BOOT-05 without a format change. Public release/artifact versions use their separate owning package and ADR; historical review is imported without inventing execution times.
- **reviewed_unchanged:** [docs/templates/change.json](docs/templates/change.json) — Governance schemas remain version1: existing UTC/source/log/sealed-history and documentation/canonical handoff rules cover BOOT-05 without a format change. Public release/artifact versions use their separate owning package and ADR; historical review is imported without inventing execution times.
- **reviewed_unchanged:** [docs/templates/handoff.md](docs/templates/handoff.md) — Governance schemas remain version1: existing UTC/source/log/sealed-history and documentation/canonical handoff rules cover BOOT-05 without a format change. Public release/artifact versions use their separate owning package and ADR; historical review is imported without inventing execution times.
- **updated:** [docs/validation/boot-01.md](docs/validation/boot-01.md) — Compared this owning document/register against the final public contracts, HTTP409/revision1 behavior, immutable pins, app/shared runtime/package/SQL artifact identity and matching RUN051…055; updated its current interface/evidence/status or source-impact coverage while retaining labeled prior checkpoints and pending independent gates.
- **updated:** [docs/validation/boot-02.md](docs/validation/boot-02.md) — Compared this owning document/register against the final public contracts, HTTP409/revision1 behavior, immutable pins, app/shared runtime/package/SQL artifact identity and matching RUN051…055; updated its current interface/evidence/status or source-impact coverage while retaining labeled prior checkpoints and pending independent gates.
- **updated:** [docs/validation/boot-03.md](docs/validation/boot-03.md) — Compared this owning document/register against the final public contracts, HTTP409/revision1 behavior, immutable pins, app/shared runtime/package/SQL artifact identity and matching RUN051…055; updated its current interface/evidence/status or source-impact coverage while retaining labeled prior checkpoints and pending independent gates.
- **updated:** [docs/validation/boot-05.md](docs/validation/boot-05.md) — Compared this owning document/register against the final public contracts, HTTP409/revision1 behavior, immutable pins, app/shared runtime/package/SQL artifact identity and matching RUN051…055; updated its current interface/evidence/status or source-impact coverage while retaining labeled prior checkpoints and pending independent gates.
- **updated:** [docs/vision/README.md](docs/vision/README.md) — Compared this owning document/register against the final public contracts, HTTP409/revision1 behavior, immutable pins, app/shared runtime/package/SQL artifact identity and matching RUN051…055; updated its current interface/evidence/status or source-impact coverage while retaining labeled prior checkpoints and pending independent gates.
- **reviewed_unchanged:** [docs/vision/additional_scope.csv](docs/vision/additional_scope.csv) — BOOT-05 is already assigned scope; X06/X07 governance and all Director-owned audience/art/budget/device/market/visibility decisions remain unchanged. Local contracts neither add product acceptance nor resolve these decisions.
- **reviewed_unchanged:** [docs/vision/decision_register.csv](docs/vision/decision_register.csv) — BOOT-05 is already assigned scope; X06/X07 governance and all Director-owned audience/art/budget/device/market/visibility decisions remain unchanged. Local contracts neither add product acceptance nor resolve these decisions.
- **updated:** [docs/vision/initial_backlog.csv](docs/vision/initial_backlog.csv) — Compared this owning document/register against the final public contracts, HTTP409/revision1 behavior, immutable pins, app/shared runtime/package/SQL artifact identity and matching RUN051…055; updated its current interface/evidence/status or source-impact coverage while retaining labeled prior checkpoints and pending independent gates.
- **updated:** [docs/vision/requirements.csv](docs/vision/requirements.csv) — Compared this owning document/register against the final public contracts, HTTP409/revision1 behavior, immutable pins, app/shared runtime/package/SQL artifact identity and matching RUN051…055; updated its current interface/evidence/status or source-impact coverage while retaining labeled prior checkpoints and pending independent gates.
- **updated:** [infra/README.md](infra/README.md) — Compared this owning document/register against the final public contracts, HTTP409/revision1 behavior, immutable pins, app/shared runtime/package/SQL artifact identity and matching RUN051…055; updated its current interface/evidence/status or source-impact coverage while retaining labeled prior checkpoints and pending independent gates.
- **updated:** [packages/contracts/README.md](packages/contracts/README.md) — Compared this owning document/register against the final public contracts, HTTP409/revision1 behavior, immutable pins, app/shared runtime/package/SQL artifact identity and matching RUN051…055; updated its current interface/evidence/status or source-impact coverage while retaining labeled prior checkpoints and pending independent gates.
- **reviewed_unchanged:** [packages/db/README.md](packages/db/README.md) — Managed roles, synthetic SQL, credentials, grant/migration/lifecycle and DB commands remain unchanged; same-source RUN051/053 requalify them. Release identity newly includes the DB runtime/SQL without adding app/domain database integration or altering data.
- **reviewed_unchanged:** [packages/design-system/README.md](packages/design-system/README.md) — Existing semantic controls, synthetic mount/resize/dispose or idle cancellable worker are unchanged and rerun in RUN051/054. Protocol status lives in web and release metadata in contracts/runtime; no assets/jobs/art/device acceptance added here.
- **reviewed_unchanged:** [packages/presentation/README.md](packages/presentation/README.md) — Existing semantic controls, synthetic mount/resize/dispose or idle cancellable worker are unchanged and rerun in RUN051/054. Protocol status lives in web and release metadata in contracts/runtime; no assets/jobs/art/device acceptance added here.
- **updated:** [packages/service-runtime/README.md](packages/service-runtime/README.md) — Compared this owning document/register against the final public contracts, HTTP409/revision1 behavior, immutable pins, app/shared runtime/package/SQL artifact identity and matching RUN051…055; updated its current interface/evidence/status or source-impact coverage while retaining labeled prior checkpoints and pending independent gates.

Full changed-file inventory: [record](docs/changes/CHG-20261007-002.json).

### Limits and next actions

- Windows/hardware and GitHub-hosted/required-check/production acceptance remain pending.
- Public schemas and immutable metadata do not implement authenticated gameplay, durable pin admission, qualified engine/content bundles or deployment.
- Unsigned source/artifact identity is not authenticity/full security/legal distribution certification; ten published notice-file gaps remain explicit.
- RUN048 retained a real filename/clock failure; fresh RUN051 passed unchanged evidence/clock gates. WSL crash/clock-step causes remain unconfirmed.
- RULE-01: acquire official current source bytes, rules diff, printing/catalog and skipped-test inventory with sourced denominators/release mapping.
- RULE-02 and UX-01/02 retain engine/vendor/Director prerequisites; BOOT-04 retains provider/budget gates.
- Observe real Windows foundation separately; hosted execution/publication/merge/deploy/spend require Director authority.

## CHG-20261007-001 — BOOT-03 reproducible CI and build artifact qualification

- Status: finalized
- Actor: Codex architect/developer/QA
- Recorded (UTC): 2026-10-07T02:53:46.575Z
- Event: unknown; recorded retrospectively (recorded_only)
- Source: beae58ea0e7184e41f82e34088a6945270345ff9
- Tasks: BOOT-03, DOC-01, DOC-02
- Features: F-CI, F-EVIDENCE, F-DOCS
- Requirements: none

### Changes

- **implementation:** Implement an isolated local CI pipeline and matching reviewed SHA-pinned Actions definition, frozen graph/license/advisory/secret gates and hashed sanitized build artifacts.
- **fix:** Correct all independently reproduced CI lifecycle/cancellation/stopped-resource/history/manifest/audit/CLI/log-redaction findings; reject shallow sources and nested unreviewed job permissions with failed red and green regressions.
- **documentation:** Maintain CI operation/ADR/qualification/status/handoff, explicit scan/host/device limits and complete source impact map; preserve original requirements and append-only executed evidence.
- **function:** Add guarded source/history scanning, frozen installed-graph reports, source/image/lock artifact identity and UUID resource lifecycle; extend evidence redaction to safely owned credentials before and after execution with fail-closed output withholding.
- **test:** Final RUN028 passed twelve actual isolated pipeline stages,79 foundation regressions, eight restricted identities, five live PostgreSQL checks and four Linux software-WebGL browser checks; RUN029 verified90 artifact payload entries plus manifest,200 installed npm components, ten notice gaps and zero registry advisories.
- **review:** Independent read-only review reproduced nine findings; all were corrected with retained red/green tests and fresh whole-source proof. No important finding is waived; review is reported with unknown historical execution times.
- **revision:** RUN030 requalified disposable database recreation; RUN031 passed canonical Git frozen installation and79 tests. RUN032 retained an incorrect probe-volume expectation; corrected RUN033 proved actual cleanup, protected private/workspace state, original scope/provenance and staged formatting. Clock-discontinuous RUN026 remains failed without weakening timing safeguards.

### Verification

- **passed:** BOOT-03 intake doctor; checkpoint identity and exact outcome retained; final acceptance needs matching source. ([evidence](docs/validation/runs/RUN-20261007-006.json))
- **passed:** BOOT-03 intake preserved workspace checks; checkpoint identity and exact outcome retained; final acceptance needs matching source. ([evidence](docs/validation/runs/RUN-20261007-007.json))
- **passed:** BOOT-03 intake original bootstrap checks; checkpoint identity and exact outcome retained; final acceptance needs matching source. ([evidence](docs/validation/runs/RUN-20261007-008.json))
- **passed:** BOOT-03 intake authenticated bootstrap database; checkpoint identity and exact outcome retained; final acceptance needs matching source. ([evidence](docs/validation/runs/RUN-20261007-009.json))
- **failed:** BOOT-03 red safety fixtures before implementation; checkpoint identity and exact outcome retained; final acceptance needs matching source. ([evidence](docs/validation/runs/RUN-20261007-010.json))
- **passed:** BOOT-03 initial secret/license/artifact/target and mocked launcher workflow regressions; checkpoint identity and exact outcome retained; final acceptance needs matching source. ([evidence](docs/validation/runs/RUN-20261007-011.json))
- **failed:** BOOT-03 static/config/docs lint and safety fixtures checkpoint; checkpoint identity and exact outcome retained; final acceptance needs matching source. ([evidence](docs/validation/runs/RUN-20261007-012.json))
- **passed:** BOOT-03 corrected lint and actual installed dependency/license/advisory/full-history secret adapters; checkpoint identity and exact outcome retained; final acceptance needs matching source. ([evidence](docs/validation/runs/RUN-20261007-013.json))
- **passed:** Actual isolated BOOT-03 pipeline: frozen foundation, live PostgreSQL, Linux browser, dependency/secret scans and artifacts; checkpoint identity and exact outcome retained; final acceptance needs matching source. ([evidence](docs/validation/runs/RUN-20261007-014.json))
- **failed:** BOOT-03 red shallow-history and nested permission bypass regressions; checkpoint identity and exact outcome retained; final acceptance needs matching source. ([evidence](docs/validation/runs/RUN-20261007-015.json))
- **failed:** BOOT-03 red job-level permission escalation regression; checkpoint identity and exact outcome retained; final acceptance needs matching source. ([evidence](docs/validation/runs/RUN-20261007-016.json))
- **failed:** BOOT-03 red image lifecycle publication and setup-cleanup review regressions; checkpoint identity and exact outcome retained; final acceptance needs matching source. ([evidence](docs/validation/runs/RUN-20261007-017.json))
- **failed:** BOOT-03 red artifact identity and metadata-secret review regressions; checkpoint identity and exact outcome retained; final acceptance needs matching source. ([evidence](docs/validation/runs/RUN-20261007-018.json))
- **failed:** BOOT-03 red original-credential history and cleanup cancellation review regressions; checkpoint identity and exact outcome retained; final acceptance needs matching source. ([evidence](docs/validation/runs/RUN-20261007-019.json))
- **failed:** BOOT-03 red stopped-container cleanup coverage and malformed advisory regressions; checkpoint identity and exact outcome retained; final acceptance needs matching source. ([evidence](docs/validation/runs/RUN-20261007-020.json))
- **failed:** BOOT-03 red documented pnpm artifact argument-separator regression; checkpoint identity and exact outcome retained; final acceptance needs matching source. ([evidence](docs/validation/runs/RUN-20261007-021.json))
- **failed:** BOOT-03 red generated managed-password durable-log redaction regression; checkpoint identity and exact outcome retained; final acceptance needs matching source. ([evidence](docs/validation/runs/RUN-20261007-022.json))
- **passed:** BOOT-03 corrected CI and dynamic-log safety review regressions; checkpoint identity and exact outcome retained; final acceptance needs matching source. ([evidence](docs/validation/runs/RUN-20261007-023.json))
- **failed:** BOOT-03 red schema-valid fail-closed generated credential redaction contract; checkpoint identity and exact outcome retained; final acceptance needs matching source. ([evidence](docs/validation/runs/RUN-20261007-024.json))
- **historical:** Independent read-only BOOT-03 checkpoint review: nine reproduced findings and four full-history regressions; parent corrects with red/green and fresh final-source proof; checkpoint identity and exact outcome retained; final acceptance needs matching source. ([evidence](docs/validation/runs/RUN-20261007-901.json))
- **passed:** BOOT-03 corrected docs/static/lint and full CI/evidence safety regression checkpoint; checkpoint identity and exact outcome retained; final acceptance needs matching source. ([evidence](docs/validation/runs/RUN-20261007-025.json))
- **failed:** Actual isolated BOOT-03 pipeline: frozen foundation, live PostgreSQL, Linux browser, dependency/secret scans and artifacts; checkpoint identity and exact outcome retained; final acceptance needs matching source. ([evidence](docs/validation/runs/RUN-20261007-026.json))
- **failed:** Actual isolated BOOT-03 pipeline: frozen foundation, live PostgreSQL, Linux browser, dependency/secret scans and artifacts; checkpoint identity and exact outcome retained; final acceptance needs matching source. ([evidence](docs/validation/runs/RUN-20261007-027.json))
- **passed:** Final matching-source actual isolated twelve-stage frozen build/type/lint/import/docs/history foundation79, eight restricted identities, live DB5 and Linux Chromium4 pipeline; scans/dependency reports/artifacts passed. ([evidence](docs/validation/runs/RUN-20261007-028.json))
- **passed:** Final matching-source90 payload entries plus manifest verified;200 installed npm components, ten published notice gaps and zero registry advisories captured; unsigned source/image/lock identity passed. ([evidence](docs/validation/runs/RUN-20261007-029.json))
- **passed:** Final matching-source actual disposable PostgreSQL recreation/concurrent migration/role/transaction/logging and cleanup passed; existing workspace volume untouched. ([evidence](docs/validation/runs/RUN-20261007-030.json))
- **passed:** Final matching executable bytes from canonical staged Git tree: fresh frozen installation, builds/types/lint and complete79-test foundation suite passed. ([evidence](docs/validation/runs/RUN-20261007-031.json))
- **failed:** Failed read-only closure probe expected an incorrect volume suffix; no original data/environment mutated, original scope and staged known-secret checks passed before assertion. ([evidence](docs/validation/runs/RUN-20261007-032.json))
- **passed:** Corrected actual read-only closure passed owned resources/images/listeners cleanup, current/staged known-secret protection, private files and original scope/archive/lock/Dev Container/source/volume preservation and staged formatting. ([evidence](docs/validation/runs/RUN-20261007-033.json))
- **passed:** Finalized live and canonical Git-byte static/documentation checks, current/full Git-history secret checks and staged formatting passed with unchanged executable fingerprint; reused existing dependencies for canonical static check only. ([evidence](docs/validation/runs/RUN-20261007-034.json))

### Documentation and files

- **updated:** [AGENTS.md](AGENTS.md) — Compared current CI implementation/operation with this document; updated its status, ownership, evidence or pipeline instructions and retained external/device/production gates.
- **updated:** [README.md](README.md) — Compared current CI implementation/operation with this document; updated its status, ownership, evidence or pipeline instructions and retained external/device/production gates.
- **reviewed_unchanged:** [apps/api/README.md](apps/api/README.md) — Compared CI source impact with this document: existing app/DB/protocol or record schema/template/game requirement/Director decision content remains unchanged; CI is documented in its owning runbook/ADR and does not accept those independent gates.
- **reviewed_unchanged:** [apps/match-service/README.md](apps/match-service/README.md) — Compared CI source impact with this document: existing app/DB/protocol or record schema/template/game requirement/Director decision content remains unchanged; CI is documented in its owning runbook/ADR and does not accept those independent gates.
- **reviewed_unchanged:** [apps/web/README.md](apps/web/README.md) — Compared CI source impact with this document: existing app/DB/protocol or record schema/template/game requirement/Director decision content remains unchanged; CI is documented in its owning runbook/ADR and does not accept those independent gates.
- **reviewed_unchanged:** [apps/worker/README.md](apps/worker/README.md) — Compared CI source impact with this document: existing app/DB/protocol or record schema/template/game requirement/Director decision content remains unchanged; CI is documented in its owning runbook/ADR and does not accept those independent gates.
- **updated:** [docs/CHANGELOG_FORMAT.md](docs/CHANGELOG_FORMAT.md) — Compared current CI implementation/operation with this document; updated its status, ownership, evidence or pipeline instructions and retained external/device/production gates.
- **updated:** [docs/DEVELOPMENT_WORKFLOW.md](docs/DEVELOPMENT_WORKFLOW.md) — Compared current CI implementation/operation with this document; updated its status, ownership, evidence or pipeline instructions and retained external/device/production gates.
- **updated:** [docs/FEATURES.md](docs/FEATURES.md) — Compared current CI implementation/operation with this document; updated its status, ownership, evidence or pipeline instructions and retained external/device/production gates.
- **updated:** [docs/HANDOFF.md](docs/HANDOFF.md) — Compared current CI implementation/operation with this document; updated its status, ownership, evidence or pipeline instructions and retained external/device/production gates.
- **updated:** [docs/README.md](docs/README.md) — Compared current CI implementation/operation with this document; updated its status, ownership, evidence or pipeline instructions and retained external/device/production gates.
- **updated:** [docs/WORKSPACE_QUALIFICATION.md](docs/WORKSPACE_QUALIFICATION.md) — Compared current CI implementation/operation with this document; updated its status, ownership, evidence or pipeline instructions and retained external/device/production gates.
- **reviewed_unchanged:** [docs/adr/0001-local-development-environment.md](docs/adr/0001-local-development-environment.md) — Compared CI source impact with this document: existing app/DB/protocol or record schema/template/game requirement/Director decision content remains unchanged; CI is documented in its owning runbook/ADR and does not accept those independent gates.
- **reviewed_unchanged:** [docs/adr/0002-application-foundation.md](docs/adr/0002-application-foundation.md) — Compared CI source impact with this document: existing app/DB/protocol or record schema/template/game requirement/Director decision content remains unchanged; CI is documented in its owning runbook/ADR and does not accept those independent gates.
- **updated:** [docs/adr/0003-documentation-evidence.md](docs/adr/0003-documentation-evidence.md) — Compared current CI implementation/operation with this document; updated its status, ownership, evidence or pipeline instructions and retained external/device/production gates.
- **reviewed_unchanged:** [docs/adr/0004-restricted-local-database.md](docs/adr/0004-restricted-local-database.md) — Compared CI source impact with this document: existing app/DB/protocol or record schema/template/game requirement/Director decision content remains unchanged; CI is documented in its owning runbook/ADR and does not accept those independent gates.
- **updated:** [docs/adr/0005-ci-artifact-qualification.md](docs/adr/0005-ci-artifact-qualification.md) — Compared current CI implementation/operation with this document; updated its status, ownership, evidence or pipeline instructions and retained external/device/production gates.
- **updated:** [docs/audits/2026-10-06-project-audit.md](docs/audits/2026-10-06-project-audit.md) — Compared current CI implementation/operation with this document; updated its status, ownership, evidence or pipeline instructions and retained external/device/production gates.
- **updated:** [docs/documentation-map.json](docs/documentation-map.json) — Compared current CI implementation/operation with this document; updated its status, ownership, evidence or pipeline instructions and retained external/device/production gates.
- **updated:** [docs/features.json](docs/features.json) — Compared current CI implementation/operation with this document; updated its status, ownership, evidence or pipeline instructions and retained external/device/production gates.
- **reviewed_unchanged:** [docs/plans/2026-10-06-boot-02-database.md](docs/plans/2026-10-06-boot-02-database.md) — Compared CI source impact with this document: existing app/DB/protocol or record schema/template/game requirement/Director decision content remains unchanged; CI is documented in its owning runbook/ADR and does not accept those independent gates.
- **updated:** [docs/plans/2026-10-06-documentation-governance.md](docs/plans/2026-10-06-documentation-governance.md) — Compared current CI implementation/operation with this document; updated its status, ownership, evidence or pipeline instructions and retained external/device/production gates.
- **updated:** [docs/plans/2026-10-07-boot-03-ci.md](docs/plans/2026-10-07-boot-03-ci.md) — Compared current CI implementation/operation with this document; updated its status, ownership, evidence or pipeline instructions and retained external/device/production gates.
- **updated:** [docs/runbooks/ci.md](docs/runbooks/ci.md) — Compared current CI implementation/operation with this document; updated its status, ownership, evidence or pipeline instructions and retained external/device/production gates.
- **reviewed_unchanged:** [docs/runbooks/database.md](docs/runbooks/database.md) — Compared CI source impact with this document: existing app/DB/protocol or record schema/template/game requirement/Director decision content remains unchanged; CI is documented in its owning runbook/ADR and does not accept those independent gates.
- **updated:** [docs/runbooks/workspace-setup.md](docs/runbooks/workspace-setup.md) — Compared current CI implementation/operation with this document; updated its status, ownership, evidence or pipeline instructions and retained external/device/production gates.
- **reviewed_unchanged:** [docs/schemas/change.schema.json](docs/schemas/change.schema.json) — Compared CI source impact with this document: existing app/DB/protocol or record schema/template/game requirement/Director decision content remains unchanged; CI is documented in its owning runbook/ADR and does not accept those independent gates.
- **reviewed_unchanged:** [docs/schemas/documentation-map.schema.json](docs/schemas/documentation-map.schema.json) — Compared CI source impact with this document: existing app/DB/protocol or record schema/template/game requirement/Director decision content remains unchanged; CI is documented in its owning runbook/ADR and does not accept those independent gates.
- **reviewed_unchanged:** [docs/schemas/features.schema.json](docs/schemas/features.schema.json) — Compared CI source impact with this document: existing app/DB/protocol or record schema/template/game requirement/Director decision content remains unchanged; CI is documented in its owning runbook/ADR and does not accept those independent gates.
- **updated:** [docs/schemas/run.schema.json](docs/schemas/run.schema.json) — Compared current CI implementation/operation with this document; updated its status, ownership, evidence or pipeline instructions and retained external/device/production gates.
- **reviewed_unchanged:** [docs/schemas/state.schema.json](docs/schemas/state.schema.json) — Compared CI source impact with this document: existing app/DB/protocol or record schema/template/game requirement/Director decision content remains unchanged; CI is documented in its owning runbook/ADR and does not accept those independent gates.
- **reviewed_unchanged:** [docs/templates/change.json](docs/templates/change.json) — Compared CI source impact with this document: existing app/DB/protocol or record schema/template/game requirement/Director decision content remains unchanged; CI is documented in its owning runbook/ADR and does not accept those independent gates.
- **reviewed_unchanged:** [docs/templates/handoff.md](docs/templates/handoff.md) — Compared CI source impact with this document: existing app/DB/protocol or record schema/template/game requirement/Director decision content remains unchanged; CI is documented in its owning runbook/ADR and does not accept those independent gates.
- **updated:** [docs/validation/boot-01.md](docs/validation/boot-01.md) — Compared current CI implementation/operation with this document; updated its status, ownership, evidence or pipeline instructions and retained external/device/production gates.
- **updated:** [docs/validation/boot-02.md](docs/validation/boot-02.md) — Compared current CI implementation/operation with this document; updated its status, ownership, evidence or pipeline instructions and retained external/device/production gates.
- **updated:** [docs/validation/boot-03.md](docs/validation/boot-03.md) — Compared current CI implementation/operation with this document; updated its status, ownership, evidence or pipeline instructions and retained external/device/production gates.
- **updated:** [docs/vision/README.md](docs/vision/README.md) — Compared current CI implementation/operation with this document; updated its status, ownership, evidence or pipeline instructions and retained external/device/production gates.
- **reviewed_unchanged:** [docs/vision/additional_scope.csv](docs/vision/additional_scope.csv) — Compared CI source impact with this document: existing app/DB/protocol or record schema/template/game requirement/Director decision content remains unchanged; CI is documented in its owning runbook/ADR and does not accept those independent gates.
- **reviewed_unchanged:** [docs/vision/decision_register.csv](docs/vision/decision_register.csv) — Compared CI source impact with this document: existing app/DB/protocol or record schema/template/game requirement/Director decision content remains unchanged; CI is documented in its owning runbook/ADR and does not accept those independent gates.
- **updated:** [docs/vision/initial_backlog.csv](docs/vision/initial_backlog.csv) — Compared current CI implementation/operation with this document; updated its status, ownership, evidence or pipeline instructions and retained external/device/production gates.
- **reviewed_unchanged:** [docs/vision/requirements.csv](docs/vision/requirements.csv) — Compared CI source impact with this document: existing app/DB/protocol or record schema/template/game requirement/Director decision content remains unchanged; CI is documented in its owning runbook/ADR and does not accept those independent gates.
- **updated:** [infra/README.md](infra/README.md) — Compared current CI implementation/operation with this document; updated its status, ownership, evidence or pipeline instructions and retained external/device/production gates.
- **reviewed_unchanged:** [packages/contracts/README.md](packages/contracts/README.md) — Compared CI source impact with this document: existing app/DB/protocol or record schema/template/game requirement/Director decision content remains unchanged; CI is documented in its owning runbook/ADR and does not accept those independent gates.
- **reviewed_unchanged:** [packages/db/README.md](packages/db/README.md) — Compared CI source impact with this document: existing app/DB/protocol or record schema/template/game requirement/Director decision content remains unchanged; CI is documented in its owning runbook/ADR and does not accept those independent gates.
- **reviewed_unchanged:** [packages/design-system/README.md](packages/design-system/README.md) — Compared CI source impact with this document: existing app/DB/protocol or record schema/template/game requirement/Director decision content remains unchanged; CI is documented in its owning runbook/ADR and does not accept those independent gates.
- **reviewed_unchanged:** [packages/presentation/README.md](packages/presentation/README.md) — Compared CI source impact with this document: existing app/DB/protocol or record schema/template/game requirement/Director decision content remains unchanged; CI is documented in its owning runbook/ADR and does not accept those independent gates.
- **reviewed_unchanged:** [packages/service-runtime/README.md](packages/service-runtime/README.md) — Compared CI source impact with this document: existing app/DB/protocol or record schema/template/game requirement/Director decision content remains unchanged; CI is documented in its owning runbook/ADR and does not accept those independent gates.

Full changed-file inventory: [record](docs/changes/CHG-20261007-001.json).

### Limits and next actions

- GitHub-hosted workflow execution/cancellation, required-check and branch-protection settings and Director Windows foundation observation remain pending.
- Npm graph qualification excludes OS apt packages, downloaded Chromium and uninstalled optional platforms. Ten published license-file gaps remain explicit for legal redistribution review; hashes are unsigned identity, not authenticity or full security certification.
- Artifacts identify the pre-commit dirty public source as foundation evidence; deployment/release promotion, BOOT-05 compatibility, asset/engine/rules qualification and real hardware GPU/touch/performance remain separate.
- WSL crash and observed clock-step causes remain unconfirmed; failed/interrupted raw evidence is preserved and no missing result is inferred.
- Continue BOOT-05 protocol/release contract schemas, valid/invalid fixtures, version negotiation and browser/server split following intake and the universal documentation/evidence workflow.
- Record actual Director Windows observation separately; publish or run hosted CI and configure required checks only under appropriate Director authority.
- Resolve distribution/image/asset qualification before release; BOOT-04 provider spending requires Director budget.

## CHG-20261006-006 — Implement restricted local database foundation

- Status: finalized
- Actor: Codex architect/developer/QA
- Recorded (UTC): 2026-10-06T23:14:35.755Z
- Event: unknown; recorded retrospectively (recorded_only)
- Source: 82e22733ebe41c01e373d409eac34e09345fbc1b
- Tasks: BOOT-02, DOC-01, DOC-02
- Features: F-DB, F-BOUNDARIES, F-DOCS, F-EVIDENCE
- Requirements: none

### Changes

- **implementation:** Begin BOOT-02 in a scoped branch; preserve the existing bootstrap database, secret file, mount and volume. Implement reviewed migrations and distinct restricted service identities in separate local/test databases.
- **test:** Fresh intake doctor, configuration, five bootstrap tests and authenticated bootstrap database connectivity passed before implementation.
- **fix:** Address independent review: module-relative private config, pre-write directory checks, effective/default/cross-environment ACL audits (including SQL NULL/global grants, MAINTAIN and column grant options), secret-safe SQL logging, host proof cancellation/timeout/final identity capture and pending migration concurrency. Preserve all failed attempts.
- **test:** Actual disposable recreation RUN067/069 passed both local/test typed marker/journal continuity and live authorization/rollback checks; strengthened seed races two pending migration runners and proves exactly one application. No existing volume was recreated.
- **revision:** Director-reported WSL/VS Code crash interrupted final live/browser verification. Post-recovery source fingerprint/private config validity unchanged; original empty RUN072 bytes archived, RUN072/073 labeled inconclusive historical attempts with unknown outcomes/times. Fresh affected checks run sequentially; crash cause unconfirmed.
- **test:** Final-source clean frozen installation/build/types/lint and59 tests passed; actual controlled pending-concurrency/recreation/data/journal/role/secrecy/cleanup proof passed; independent review closed. Post-recovery eight identities/journals, live DB5, browser private-value scan and Linux browser4 passed. Canonical Git and final docs/ownership checks recorded at closure.
- **test:** Canonical staged Git frozen installation/build/type/lint and59 tests passed on final source (RUN20261007-003). Actual listener/private-file/known-secret/original scope and archive checks passed (004). Final docs validation and coherent local commit close the authorized scope.

### Verification

- **passed:** BOOT-02 intake baseline: doctor; checkpoint identity/outcome retained; final source claims require matching final receipts. ([evidence](docs/validation/runs/RUN-20261006-049.json))
- **passed:** BOOT-02 intake baseline: preserved workspace and documentation verification; checkpoint identity/outcome retained; final source claims require matching final receipts. ([evidence](docs/validation/runs/RUN-20261006-050.json))
- **passed:** BOOT-02 intake baseline: five original live HTTP and credential preservation bootstrap tests; checkpoint identity/outcome retained; final source claims require matching final receipts. ([evidence](docs/validation/runs/RUN-20261006-051.json))
- **passed:** BOOT-02 intake baseline: authenticated read-only bootstrap database connection; checkpoint identity/outcome retained; final source claims require matching final receipts. ([evidence](docs/validation/runs/RUN-20261006-052.json))
- **failed:** Red database policy tests before implementation; checkpoint identity/outcome retained; final source claims require matching final receipts. ([evidence](docs/validation/runs/RUN-20261006-053.json))
- **failed:** Install pinned pg and Drizzle into server-only db workspace with strict peers; checkpoint identity/outcome retained; final source claims require matching final receipts. ([evidence](docs/validation/runs/RUN-20261006-054.json))
- **passed:** Database policy unit tests and actual package build; checkpoint identity/outcome retained; final source claims require matching final receipts. ([evidence](docs/validation/runs/RUN-20261006-055.json))
- **passed:** Five database target, history, private configuration and environment unit checks; checkpoint identity/outcome retained; final source claims require matching final receipts. ([evidence](docs/validation/runs/RUN-20261006-056.json))
- **failed:** Provision only managed local/test databases and eight restricted accounts; preserve bootstrap configuration; checkpoint identity/outcome retained; final source claims require matching final receipts. ([evidence](docs/validation/runs/RUN-20261006-057.json))
- **failed:** Migrate explicit local and test targets and run actual authorization/transaction integration checks; checkpoint identity/outcome retained; final source claims require matching final receipts. ([evidence](docs/validation/runs/RUN-20261006-058.json))
- **failed:** Safe provisioning diagnostic: controlled errors or PostgreSQL error code only; no SQL/config values; checkpoint identity/outcome retained; final source claims require matching final receipts. ([evidence](docs/validation/runs/RUN-20261006-059.json))
- **passed:** Provision app-specific local/test DB names after correctly rejecting collision with existing bootstrap DB; checkpoint identity/outcome retained; final source claims require matching final receipts. ([evidence](docs/validation/runs/RUN-20261006-060.json))
- **passed:** Local/test migration, all eight authenticated identities, and actual authorization/rollback tests after cwd correction; checkpoint identity/outcome retained; final source claims require matching final receipts. ([evidence](docs/validation/runs/RUN-20261006-061.json))
- **passed:** Existing role ACL drift rejection, future object defaults and real role/migration checks; checkpoint identity/outcome retained; final source claims require matching final receipts. ([evidence](docs/validation/runs/RUN-20261006-062.json))
- **passed:** Five live DB integration regressions including direct, cross-environment and default ACL drift rejection; checkpoint identity/outcome retained; final source claims require matching final receipts. ([evidence](docs/validation/runs/RUN-20261006-063.json))
- **failed:** Corrected database package build and lint before disposable recreation; checkpoint identity/outcome retained; final source claims require matching final receipts. ([evidence](docs/validation/runs/RUN-20261006-064.json))
- **passed:** Reviewed SQL NULL/default-ACL regression, secret logging settings, build, lint and DB unit/integration checks; checkpoint identity/outcome retained; final source claims require matching final receipts. ([evidence](docs/validation/runs/RUN-20261006-065.json))
- **passed:** Database build, lint and live grant-option/MAINTAIN/default ACL regressions; checkpoint identity/outcome retained; final source claims require matching final receipts. ([evidence](docs/validation/runs/RUN-20261006-066.json))
- **passed:** Actual host-orchestrated disposable PostgreSQL recreation: typed rows/journals and role/transaction checks; existing VS Code project/volume untouched; checkpoint identity/outcome retained; final source claims require matching final receipts. ([evidence](docs/validation/runs/RUN-20261006-067.json))
- **passed:** Build final pending-migration concurrency persistence probe; checkpoint identity/outcome retained; final source claims require matching final receipts. ([evidence](docs/validation/runs/RUN-20261006-068.json))
- **passed:** Actual host-orchestrated disposable PostgreSQL recreation: typed rows/journals and role/transaction checks; existing VS Code project/volume untouched; checkpoint identity/outcome retained; final source claims require matching final receipts. ([evidence](docs/validation/runs/RUN-20261006-069.json))
- **passed:** Final whole-source clean frozen install, ordered builds/typecheck/lint, bootstrap/service/browser-boundary/governance/database-unit/mocked-recorder tests; checkpoint identity/outcome retained; final source claims require matching final receipts. ([evidence](docs/validation/runs/RUN-20261006-070.json))
- **passed:** Actual host-orchestrated disposable PostgreSQL recreation: typed rows/journals and role/transaction checks; existing VS Code project/volume untouched; checkpoint identity/outcome retained; final source claims require matching final receipts. ([evidence](docs/validation/runs/RUN-20261006-071.json))
- **historical:** Inconclusive interrupted live workspace verification; original receipt incomplete, no result inferred; checkpoint identity/outcome retained; final source claims require matching final receipts. ([evidence](docs/validation/runs/RUN-20261006-072.json))
- **historical:** Inconclusive interrupted Linux browser automation; original receipt incomplete, no result inferred; checkpoint identity/outcome retained; final source claims require matching final receipts. ([evidence](docs/validation/runs/RUN-20261006-073.json))
- **historical:** Independent scoped BOOT-02 review; no remaining important findings, read-only effective-role/CTE checks and mocked cancellation/identity/redaction tests; exact execution times unknown; checkpoint identity/outcome retained; final source claims require matching final receipts. ([evidence](docs/validation/runs/RUN-20261006-921.json))
- **historical:** Independent ten fully mocked host recorder regressions; simulated behavior only, no Docker/DB mutations; exact execution times unknown; checkpoint identity/outcome retained; final source claims require matching final receipts. ([evidence](docs/validation/runs/RUN-20261006-922.json))
- **passed:** Post-recovery live frozen install, doctor7, bootstrap connectivity, eight managed identities, persisted migration journals, live DB5 and actual private-credential bundle scan; checkpoint identity/outcome retained; final source claims require matching final receipts. ([evidence](docs/validation/runs/RUN-20261007-001.json))
- **passed:** Post-recovery actual Linux Chromium/SwiftShader foundation four checks; Windows/device observation remains pending; checkpoint identity/outcome retained; final source claims require matching final receipts. ([evidence](docs/validation/runs/RUN-20261007-002.json))
- **passed:** Canonical staged Git checkout frozen install, builds/types/lint and59 tests; executable fingerprint equals final current source; checkpoint identity/outcome retained; final source claims require matching final receipts. ([evidence](docs/validation/runs/RUN-20261007-003.json))
- **passed:** Final actual listener cleanup, private file mode/ignore and staged known-secret scan; original requirement/decision/research/archive data preserved; checkpoint identity/outcome retained; final source claims require matching final receipts. ([evidence](docs/validation/runs/RUN-20261007-004.json))
- **passed:** Finalized documentation consistency, preserved static workspace/JSON/syntax checks and staged source/document formatting; checkpoint identity/outcome retained; final source claims require matching final receipts. ([evidence](docs/validation/runs/RUN-20261007-005.json))

### Documentation and files

- **updated:** [AGENTS.md](AGENTS.md) — Reviewed BOOT-02 ownership/current behavior: private db config/roles/migrations/proof commands belong to db and its runbook; diagnostics/public contracts/rendering/lifecycle stay unchanged. Current status/evidence updated where affected; schema/format and original requirements/optional flags/Director decisions preserved without product/device acceptance.
- **updated:** [CHANGELOG.md](CHANGELOG.md) — Reviewed BOOT-02 ownership/current behavior: private db config/roles/migrations/proof commands belong to db and its runbook; diagnostics/public contracts/rendering/lifecycle stay unchanged. Current status/evidence updated where affected; schema/format and original requirements/optional flags/Director decisions preserved without product/device acceptance.
- **updated:** [README.md](README.md) — Reviewed BOOT-02 ownership/current behavior: private db config/roles/migrations/proof commands belong to db and its runbook; diagnostics/public contracts/rendering/lifecycle stay unchanged. Current status/evidence updated where affected; schema/format and original requirements/optional flags/Director decisions preserved without product/device acceptance.
- **reviewed_unchanged:** [apps/api/README.md](apps/api/README.md) — Reviewed BOOT-02 ownership/current behavior: private db config/roles/migrations/proof commands belong to db and its runbook; diagnostics/public contracts/rendering/lifecycle stay unchanged. Current status/evidence updated where affected; schema/format and original requirements/optional flags/Director decisions preserved without product/device acceptance.
- **reviewed_unchanged:** [apps/match-service/README.md](apps/match-service/README.md) — Reviewed BOOT-02 ownership/current behavior: private db config/roles/migrations/proof commands belong to db and its runbook; diagnostics/public contracts/rendering/lifecycle stay unchanged. Current status/evidence updated where affected; schema/format and original requirements/optional flags/Director decisions preserved without product/device acceptance.
- **reviewed_unchanged:** [apps/web/README.md](apps/web/README.md) — Reviewed BOOT-02 ownership/current behavior: private db config/roles/migrations/proof commands belong to db and its runbook; diagnostics/public contracts/rendering/lifecycle stay unchanged. Current status/evidence updated where affected; schema/format and original requirements/optional flags/Director decisions preserved without product/device acceptance.
- **reviewed_unchanged:** [apps/worker/README.md](apps/worker/README.md) — Reviewed BOOT-02 ownership/current behavior: private db config/roles/migrations/proof commands belong to db and its runbook; diagnostics/public contracts/rendering/lifecycle stay unchanged. Current status/evidence updated where affected; schema/format and original requirements/optional flags/Director decisions preserved without product/device acceptance.
- **updated:** [docs/CHANGELOG_FORMAT.md](docs/CHANGELOG_FORMAT.md) — Reviewed BOOT-02 ownership/current behavior: private db config/roles/migrations/proof commands belong to db and its runbook; diagnostics/public contracts/rendering/lifecycle stay unchanged. Current status/evidence updated where affected; schema/format and original requirements/optional flags/Director decisions preserved without product/device acceptance.
- **updated:** [docs/DEVELOPMENT_WORKFLOW.md](docs/DEVELOPMENT_WORKFLOW.md) — Reviewed BOOT-02 ownership/current behavior: private db config/roles/migrations/proof commands belong to db and its runbook; diagnostics/public contracts/rendering/lifecycle stay unchanged. Current status/evidence updated where affected; schema/format and original requirements/optional flags/Director decisions preserved without product/device acceptance.
- **updated:** [docs/FEATURES.md](docs/FEATURES.md) — Reviewed BOOT-02 ownership/current behavior: private db config/roles/migrations/proof commands belong to db and its runbook; diagnostics/public contracts/rendering/lifecycle stay unchanged. Current status/evidence updated where affected; schema/format and original requirements/optional flags/Director decisions preserved without product/device acceptance.
- **updated:** [docs/HANDOFF.md](docs/HANDOFF.md) — Reviewed BOOT-02 ownership/current behavior: private db config/roles/migrations/proof commands belong to db and its runbook; diagnostics/public contracts/rendering/lifecycle stay unchanged. Current status/evidence updated where affected; schema/format and original requirements/optional flags/Director decisions preserved without product/device acceptance.
- **updated:** [docs/README.md](docs/README.md) — Reviewed BOOT-02 ownership/current behavior: private db config/roles/migrations/proof commands belong to db and its runbook; diagnostics/public contracts/rendering/lifecycle stay unchanged. Current status/evidence updated where affected; schema/format and original requirements/optional flags/Director decisions preserved without product/device acceptance.
- **updated:** [docs/WORKSPACE_QUALIFICATION.md](docs/WORKSPACE_QUALIFICATION.md) — Reviewed BOOT-02 ownership/current behavior: private db config/roles/migrations/proof commands belong to db and its runbook; diagnostics/public contracts/rendering/lifecycle stay unchanged. Current status/evidence updated where affected; schema/format and original requirements/optional flags/Director decisions preserved without product/device acceptance.
- **updated:** [docs/adr/0001-local-development-environment.md](docs/adr/0001-local-development-environment.md) — Reviewed BOOT-02 ownership/current behavior: private db config/roles/migrations/proof commands belong to db and its runbook; diagnostics/public contracts/rendering/lifecycle stay unchanged. Current status/evidence updated where affected; schema/format and original requirements/optional flags/Director decisions preserved without product/device acceptance.
- **updated:** [docs/adr/0002-application-foundation.md](docs/adr/0002-application-foundation.md) — Reviewed BOOT-02 ownership/current behavior: private db config/roles/migrations/proof commands belong to db and its runbook; diagnostics/public contracts/rendering/lifecycle stay unchanged. Current status/evidence updated where affected; schema/format and original requirements/optional flags/Director decisions preserved without product/device acceptance.
- **reviewed_unchanged:** [docs/adr/0003-documentation-evidence.md](docs/adr/0003-documentation-evidence.md) — Reviewed BOOT-02 ownership/current behavior: private db config/roles/migrations/proof commands belong to db and its runbook; diagnostics/public contracts/rendering/lifecycle stay unchanged. Current status/evidence updated where affected; schema/format and original requirements/optional flags/Director decisions preserved without product/device acceptance.
- **updated:** [docs/audits/2026-10-06-project-audit.md](docs/audits/2026-10-06-project-audit.md) — Reviewed BOOT-02 ownership/current behavior: private db config/roles/migrations/proof commands belong to db and its runbook; diagnostics/public contracts/rendering/lifecycle stay unchanged. Current status/evidence updated where affected; schema/format and original requirements/optional flags/Director decisions preserved without product/device acceptance.
- **updated:** [docs/current-state.json](docs/current-state.json) — Reviewed BOOT-02 ownership/current behavior: private db config/roles/migrations/proof commands belong to db and its runbook; diagnostics/public contracts/rendering/lifecycle stay unchanged. Current status/evidence updated where affected; schema/format and original requirements/optional flags/Director decisions preserved without product/device acceptance.
- **updated:** [docs/documentation-map.json](docs/documentation-map.json) — Reviewed BOOT-02 ownership/current behavior: private db config/roles/migrations/proof commands belong to db and its runbook; diagnostics/public contracts/rendering/lifecycle stay unchanged. Current status/evidence updated where affected; schema/format and original requirements/optional flags/Director decisions preserved without product/device acceptance.
- **updated:** [docs/features.json](docs/features.json) — Reviewed BOOT-02 ownership/current behavior: private db config/roles/migrations/proof commands belong to db and its runbook; diagnostics/public contracts/rendering/lifecycle stay unchanged. Current status/evidence updated where affected; schema/format and original requirements/optional flags/Director decisions preserved without product/device acceptance.
- **updated:** [docs/plans/2026-10-06-documentation-governance.md](docs/plans/2026-10-06-documentation-governance.md) — Reviewed BOOT-02 ownership/current behavior: private db config/roles/migrations/proof commands belong to db and its runbook; diagnostics/public contracts/rendering/lifecycle stay unchanged. Current status/evidence updated where affected; schema/format and original requirements/optional flags/Director decisions preserved without product/device acceptance.
- **updated:** [docs/runbooks/workspace-setup.md](docs/runbooks/workspace-setup.md) — Reviewed BOOT-02 ownership/current behavior: private db config/roles/migrations/proof commands belong to db and its runbook; diagnostics/public contracts/rendering/lifecycle stay unchanged. Current status/evidence updated where affected; schema/format and original requirements/optional flags/Director decisions preserved without product/device acceptance.
- **reviewed_unchanged:** [docs/schemas/change.schema.json](docs/schemas/change.schema.json) — Reviewed BOOT-02 ownership/current behavior: private db config/roles/migrations/proof commands belong to db and its runbook; diagnostics/public contracts/rendering/lifecycle stay unchanged. Current status/evidence updated where affected; schema/format and original requirements/optional flags/Director decisions preserved without product/device acceptance.
- **reviewed_unchanged:** [docs/schemas/documentation-map.schema.json](docs/schemas/documentation-map.schema.json) — Reviewed BOOT-02 ownership/current behavior: private db config/roles/migrations/proof commands belong to db and its runbook; diagnostics/public contracts/rendering/lifecycle stay unchanged. Current status/evidence updated where affected; schema/format and original requirements/optional flags/Director decisions preserved without product/device acceptance.
- **reviewed_unchanged:** [docs/schemas/features.schema.json](docs/schemas/features.schema.json) — Reviewed BOOT-02 ownership/current behavior: private db config/roles/migrations/proof commands belong to db and its runbook; diagnostics/public contracts/rendering/lifecycle stay unchanged. Current status/evidence updated where affected; schema/format and original requirements/optional flags/Director decisions preserved without product/device acceptance.
- **reviewed_unchanged:** [docs/schemas/run.schema.json](docs/schemas/run.schema.json) — Reviewed BOOT-02 ownership/current behavior: private db config/roles/migrations/proof commands belong to db and its runbook; diagnostics/public contracts/rendering/lifecycle stay unchanged. Current status/evidence updated where affected; schema/format and original requirements/optional flags/Director decisions preserved without product/device acceptance.
- **reviewed_unchanged:** [docs/schemas/state.schema.json](docs/schemas/state.schema.json) — Reviewed BOOT-02 ownership/current behavior: private db config/roles/migrations/proof commands belong to db and its runbook; diagnostics/public contracts/rendering/lifecycle stay unchanged. Current status/evidence updated where affected; schema/format and original requirements/optional flags/Director decisions preserved without product/device acceptance.
- **reviewed_unchanged:** [docs/templates/change.json](docs/templates/change.json) — Reviewed BOOT-02 ownership/current behavior: private db config/roles/migrations/proof commands belong to db and its runbook; diagnostics/public contracts/rendering/lifecycle stay unchanged. Current status/evidence updated where affected; schema/format and original requirements/optional flags/Director decisions preserved without product/device acceptance.
- **reviewed_unchanged:** [docs/templates/handoff.md](docs/templates/handoff.md) — Reviewed BOOT-02 ownership/current behavior: private db config/roles/migrations/proof commands belong to db and its runbook; diagnostics/public contracts/rendering/lifecycle stay unchanged. Current status/evidence updated where affected; schema/format and original requirements/optional flags/Director decisions preserved without product/device acceptance.
- **updated:** [docs/validation/boot-01.md](docs/validation/boot-01.md) — Reviewed BOOT-02 ownership/current behavior: private db config/roles/migrations/proof commands belong to db and its runbook; diagnostics/public contracts/rendering/lifecycle stay unchanged. Current status/evidence updated where affected; schema/format and original requirements/optional flags/Director decisions preserved without product/device acceptance.
- **updated:** [docs/vision/README.md](docs/vision/README.md) — Reviewed BOOT-02 ownership/current behavior: private db config/roles/migrations/proof commands belong to db and its runbook; diagnostics/public contracts/rendering/lifecycle stay unchanged. Current status/evidence updated where affected; schema/format and original requirements/optional flags/Director decisions preserved without product/device acceptance.
- **reviewed_unchanged:** [docs/vision/additional_scope.csv](docs/vision/additional_scope.csv) — Reviewed BOOT-02 ownership/current behavior: private db config/roles/migrations/proof commands belong to db and its runbook; diagnostics/public contracts/rendering/lifecycle stay unchanged. Current status/evidence updated where affected; schema/format and original requirements/optional flags/Director decisions preserved without product/device acceptance.
- **reviewed_unchanged:** [docs/vision/decision_register.csv](docs/vision/decision_register.csv) — Reviewed BOOT-02 ownership/current behavior: private db config/roles/migrations/proof commands belong to db and its runbook; diagnostics/public contracts/rendering/lifecycle stay unchanged. Current status/evidence updated where affected; schema/format and original requirements/optional flags/Director decisions preserved without product/device acceptance.
- **updated:** [docs/vision/initial_backlog.csv](docs/vision/initial_backlog.csv) — Reviewed BOOT-02 ownership/current behavior: private db config/roles/migrations/proof commands belong to db and its runbook; diagnostics/public contracts/rendering/lifecycle stay unchanged. Current status/evidence updated where affected; schema/format and original requirements/optional flags/Director decisions preserved without product/device acceptance.
- **reviewed_unchanged:** [docs/vision/requirements.csv](docs/vision/requirements.csv) — Reviewed BOOT-02 ownership/current behavior: private db config/roles/migrations/proof commands belong to db and its runbook; diagnostics/public contracts/rendering/lifecycle stay unchanged. Current status/evidence updated where affected; schema/format and original requirements/optional flags/Director decisions preserved without product/device acceptance.
- **updated:** [infra/README.md](infra/README.md) — Reviewed BOOT-02 ownership/current behavior: private db config/roles/migrations/proof commands belong to db and its runbook; diagnostics/public contracts/rendering/lifecycle stay unchanged. Current status/evidence updated where affected; schema/format and original requirements/optional flags/Director decisions preserved without product/device acceptance.
- **reviewed_unchanged:** [packages/contracts/README.md](packages/contracts/README.md) — Reviewed BOOT-02 ownership/current behavior: private db config/roles/migrations/proof commands belong to db and its runbook; diagnostics/public contracts/rendering/lifecycle stay unchanged. Current status/evidence updated where affected; schema/format and original requirements/optional flags/Director decisions preserved without product/device acceptance.
- **updated:** [packages/db/README.md](packages/db/README.md) — Reviewed BOOT-02 ownership/current behavior: private db config/roles/migrations/proof commands belong to db and its runbook; diagnostics/public contracts/rendering/lifecycle stay unchanged. Current status/evidence updated where affected; schema/format and original requirements/optional flags/Director decisions preserved without product/device acceptance.
- **reviewed_unchanged:** [packages/design-system/README.md](packages/design-system/README.md) — Reviewed BOOT-02 ownership/current behavior: private db config/roles/migrations/proof commands belong to db and its runbook; diagnostics/public contracts/rendering/lifecycle stay unchanged. Current status/evidence updated where affected; schema/format and original requirements/optional flags/Director decisions preserved without product/device acceptance.
- **reviewed_unchanged:** [packages/presentation/README.md](packages/presentation/README.md) — Reviewed BOOT-02 ownership/current behavior: private db config/roles/migrations/proof commands belong to db and its runbook; diagnostics/public contracts/rendering/lifecycle stay unchanged. Current status/evidence updated where affected; schema/format and original requirements/optional flags/Director decisions preserved without product/device acceptance.
- **reviewed_unchanged:** [packages/service-runtime/README.md](packages/service-runtime/README.md) — Reviewed BOOT-02 ownership/current behavior: private db config/roles/migrations/proof commands belong to db and its runbook; diagnostics/public contracts/rendering/lifecycle stay unchanged. Current status/evidence updated where affected; schema/format and original requirements/optional flags/Director decisions preserved without product/device acceptance.
- **updated:** [docs/plans/2026-10-06-boot-02-database.md](docs/plans/2026-10-06-boot-02-database.md) — Reviewed BOOT-02 ownership/current behavior: private db config/roles/migrations/proof commands belong to db and its runbook; diagnostics/public contracts/rendering/lifecycle stay unchanged. Current status/evidence updated where affected; schema/format and original requirements/optional flags/Director decisions preserved without product/device acceptance.
- **updated:** [docs/adr/0004-restricted-local-database.md](docs/adr/0004-restricted-local-database.md) — Reviewed BOOT-02 ownership/current behavior: private db config/roles/migrations/proof commands belong to db and its runbook; diagnostics/public contracts/rendering/lifecycle stay unchanged. Current status/evidence updated where affected; schema/format and original requirements/optional flags/Director decisions preserved without product/device acceptance.
- **updated:** [docs/runbooks/database.md](docs/runbooks/database.md) — Reviewed BOOT-02 ownership/current behavior: private db config/roles/migrations/proof commands belong to db and its runbook; diagnostics/public contracts/rendering/lifecycle stay unchanged. Current status/evidence updated where affected; schema/format and original requirements/optional flags/Director decisions preserved without product/device acceptance.
- **updated:** [docs/validation/boot-02.md](docs/validation/boot-02.md) — Reviewed BOOT-02 ownership/current behavior: private db config/roles/migrations/proof commands belong to db and its runbook; diagnostics/public contracts/rendering/lifecycle stay unchanged. Current status/evidence updated where affected; schema/format and original requirements/optional flags/Director decisions preserved without product/device acceptance.

Full changed-file inventory: [record](docs/changes/CHG-20261006-006.json).

### Limits and next actions

- Windows foundation observation remains pending.
- Application DB integration, real domain tables, authentication, CI, production operations and backup/restore qualification remain later tasks.
- Continue BOOT-03 CI/artifact checks and BOOT-05 protocol/release contracts; complementary RULE/UX prerequisites remain.
- Director Windows foundation observation remains pending; start pnpm dev before observation.

## CHG-20261006-005 — Correct audited supervisor descendant cleanup

- Status: finalized
- Actor: Codex developer / QA recorder
- Recorded (UTC): 2026-10-06T20:14:01.130Z
- Event: unknown; recorded retrospectively (recorded_only)
- Source: 8c94b274ebd6ad91223cdb6df085ca0597c107c9
- Tasks: BOOT-01, DOC-01, DOC-02
- Features: F-SUPERVISOR, F-DOCS, F-EVIDENCE
- Requirements: none

### Changes

- **fix:** Actual post-Git-checkout check found owned Vite orphan on5173: supervisor cleared process-group escalation when pnpm leader exited. Correct group cleanup and strengthen regression before final acceptance.
- **test:** Actual original algorithm fails deterministic descendant regression; corrected helper passes both leader-exiting and already-exited cases; ownership released only after stopped-group proof.
- **revision:** Supersede earlier successful suite checkpoints for current source; retain failed listener check and historical proof; demote verification while fresh checks run.
- **test:** Final canonical Git checkout and clean source copy both passed frozen installation/build/type/lint and43 tests; four live Linux browser checks and actual listener cleanup passed; scope/archive/private-file checks passed.

### Verification

- **failed:** Finalized documentation passed but actual5173 listener remained; /proc identified owned Vite orphan in deleted canonical Git-checkout cwd. ([evidence](docs/validation/runs/RUN-20261006-033.json))
- **passed:** Original scope/archive and final known-secret/private-file preservation passed at pre-cleanup source. ([evidence](docs/validation/runs/RUN-20261006-034.json))
- **failed:** Initial regression could not load the not-yet-created helper. ([evidence](docs/validation/runs/RUN-20261006-035.json))
- **failed:** Actual original supervisor algorithm left ignoring-SIGTERM descendant executable after leader exit. ([evidence](docs/validation/runs/RUN-20261006-036.json))
- **passed:** Corrected helper stopped actual descendant; intermediate source checkpoint. ([evidence](docs/validation/runs/RUN-20261006-037.json))
- **passed:** Identity-checked owned orphan group stopped; actual5173/3001/3002 free. ([evidence](docs/validation/runs/RUN-20261006-038.json))
- **passed:** Both actual descendant cases passed before final shared supervisor promise wiring. ([evidence](docs/validation/runs/RUN-20261006-039.json))
- **historical:** Independent helper2-test and real-supervisor port-free synthetic integration passed; unknown UTC execution times, parent commit only, no important findings. ([evidence](docs/validation/runs/RUN-20261006-920.json))
- **passed:** Corrected-source frozen clean install, builds/types/lint and43 tests:21 foundation including two descendants,22 governance. ([evidence](docs/validation/runs/RUN-20261006-040.json))
- **passed:** Corrected-source seven pinned toolchain/Linux/private environment checks. ([evidence](docs/validation/runs/RUN-20261006-041.json))
- **passed:** Corrected-source authenticated read-only PostgreSQL18 bootstrap connectivity; no persistence recreation proof. ([evidence](docs/validation/runs/RUN-20261006-042.json))
- **passed:** Corrected-source four live Linux Chromium/SwiftShader browser checks; actual Windows remains pending. ([evidence](docs/validation/runs/RUN-20261006-043.json))
- **passed:** Actual foundation5173/3001/3002 free after full clean suite and live browser automation. ([evidence](docs/validation/runs/RUN-20261006-044.json))
- **passed:** Final corrected canonical Git checkout frozen install and complete43-test suite; executable fingerprint exactly matches final source. ([evidence](docs/validation/runs/RUN-20261006-045.json))
- **passed:** Final staged source/document formatting passed; raw logs remain original bytes and are digest-validated. ([evidence](docs/validation/runs/RUN-20261006-046.json))
- **passed:** Original requirements/checklist/register/archive preserved, private file ignored/600, final known-secret scan passed without printing values. ([evidence](docs/validation/runs/RUN-20261006-047.json))
- **passed:** Exact former failing check now passes: finalized documentation consistency and actual no5173/3001/3002 listeners after corrected canonical checkout and live browser checks. ([evidence](docs/validation/runs/RUN-20261006-048.json))

### Documentation and files

- **updated:** [docs/HANDOFF.md](docs/HANDOFF.md) — Actual code/cleanup failure reviewed; updated ownership, superseded evidence and pending current-source acceptance where relevant.
- **updated:** [docs/audits/2026-10-06-project-audit.md](docs/audits/2026-10-06-project-audit.md) — Actual code/cleanup failure reviewed; updated ownership, superseded evidence and pending current-source acceptance where relevant.
- **updated:** [docs/vision/initial_backlog.csv](docs/vision/initial_backlog.csv) — Actual code/cleanup failure reviewed; updated ownership, superseded evidence and pending current-source acceptance where relevant.
- **updated:** [docs/validation/documentation-review.md](docs/validation/documentation-review.md) — Actual code/cleanup failure reviewed; updated ownership, superseded evidence and pending current-source acceptance where relevant.
- **reviewed_unchanged:** [CHANGELOG.md](CHANGELOG.md) — Review prior closure against audited supervisor cleanup correction; update current-source claims and lifecycle ownership where affected.
- **reviewed_unchanged:** [AGENTS.md](AGENTS.md) — Review prior closure against audited supervisor cleanup correction; update current-source claims and lifecycle ownership where affected.
- **reviewed_unchanged:** [README.md](README.md) — Review prior closure against audited supervisor cleanup correction; update current-source claims and lifecycle ownership where affected.
- **reviewed_unchanged:** [apps/api/README.md](apps/api/README.md) — Review prior closure against audited supervisor cleanup correction; update current-source claims and lifecycle ownership where affected.
- **reviewed_unchanged:** [apps/match-service/README.md](apps/match-service/README.md) — Review prior closure against audited supervisor cleanup correction; update current-source claims and lifecycle ownership where affected.
- **reviewed_unchanged:** [apps/web/README.md](apps/web/README.md) — Review prior closure against audited supervisor cleanup correction; update current-source claims and lifecycle ownership where affected.
- **reviewed_unchanged:** [apps/worker/README.md](apps/worker/README.md) — Review prior closure against audited supervisor cleanup correction; update current-source claims and lifecycle ownership where affected.
- **reviewed_unchanged:** [docs/CHANGELOG_FORMAT.md](docs/CHANGELOG_FORMAT.md) — Review prior closure against audited supervisor cleanup correction; update current-source claims and lifecycle ownership where affected.
- **updated:** [docs/DEVELOPMENT_WORKFLOW.md](docs/DEVELOPMENT_WORKFLOW.md) — Actual code/cleanup failure reviewed; updated ownership, superseded evidence and pending current-source acceptance where relevant.
- **updated:** [docs/FEATURES.md](docs/FEATURES.md) — Actual code/cleanup failure reviewed; updated ownership, superseded evidence and pending current-source acceptance where relevant.
- **reviewed_unchanged:** [docs/README.md](docs/README.md) — Review prior closure against audited supervisor cleanup correction; update current-source claims and lifecycle ownership where affected.
- **updated:** [docs/WORKSPACE_QUALIFICATION.md](docs/WORKSPACE_QUALIFICATION.md) — Actual code/cleanup failure reviewed; updated ownership, superseded evidence and pending current-source acceptance where relevant.
- **reviewed_unchanged:** [docs/adr/0001-local-development-environment.md](docs/adr/0001-local-development-environment.md) — Review prior closure against audited supervisor cleanup correction; update current-source claims and lifecycle ownership where affected.
- **updated:** [docs/adr/0002-application-foundation.md](docs/adr/0002-application-foundation.md) — Actual code/cleanup failure reviewed; updated ownership, superseded evidence and pending current-source acceptance where relevant.
- **updated:** [docs/adr/0003-documentation-evidence.md](docs/adr/0003-documentation-evidence.md) — Actual code/cleanup failure reviewed; updated ownership, superseded evidence and pending current-source acceptance where relevant.
- **reviewed_unchanged:** [docs/documentation-map.json](docs/documentation-map.json) — Review prior closure against audited supervisor cleanup correction; update current-source claims and lifecycle ownership where affected.
- **updated:** [docs/features.json](docs/features.json) — Actual code/cleanup failure reviewed; updated ownership, superseded evidence and pending current-source acceptance where relevant.
- **updated:** [docs/plans/2026-10-06-documentation-governance.md](docs/plans/2026-10-06-documentation-governance.md) — Actual code/cleanup failure reviewed; updated ownership, superseded evidence and pending current-source acceptance where relevant.
- **reviewed_unchanged:** [docs/runbooks/workspace-setup.md](docs/runbooks/workspace-setup.md) — Review prior closure against audited supervisor cleanup correction; update current-source claims and lifecycle ownership where affected.
- **reviewed_unchanged:** [docs/schemas/change.schema.json](docs/schemas/change.schema.json) — Review prior closure against audited supervisor cleanup correction; update current-source claims and lifecycle ownership where affected.
- **reviewed_unchanged:** [docs/schemas/documentation-map.schema.json](docs/schemas/documentation-map.schema.json) — Review prior closure against audited supervisor cleanup correction; update current-source claims and lifecycle ownership where affected.
- **reviewed_unchanged:** [docs/schemas/state.schema.json](docs/schemas/state.schema.json) — Review prior closure against audited supervisor cleanup correction; update current-source claims and lifecycle ownership where affected.
- **reviewed_unchanged:** [docs/schemas/features.schema.json](docs/schemas/features.schema.json) — Review prior closure against audited supervisor cleanup correction; update current-source claims and lifecycle ownership where affected.
- **reviewed_unchanged:** [docs/schemas/run.schema.json](docs/schemas/run.schema.json) — Review prior closure against audited supervisor cleanup correction; update current-source claims and lifecycle ownership where affected.
- **reviewed_unchanged:** [docs/templates/change.json](docs/templates/change.json) — Review prior closure against audited supervisor cleanup correction; update current-source claims and lifecycle ownership where affected.
- **reviewed_unchanged:** [docs/templates/handoff.md](docs/templates/handoff.md) — Review prior closure against audited supervisor cleanup correction; update current-source claims and lifecycle ownership where affected.
- **reviewed_unchanged:** [docs/validation/boot-01.md](docs/validation/boot-01.md) — Review prior closure against audited supervisor cleanup correction; update current-source claims and lifecycle ownership where affected.
- **reviewed_unchanged:** [docs/vision/README.md](docs/vision/README.md) — Review prior closure against audited supervisor cleanup correction; update current-source claims and lifecycle ownership where affected.
- **reviewed_unchanged:** [docs/vision/additional_scope.csv](docs/vision/additional_scope.csv) — Review prior closure against audited supervisor cleanup correction; update current-source claims and lifecycle ownership where affected.
- **reviewed_unchanged:** [docs/vision/decision_register.csv](docs/vision/decision_register.csv) — Review prior closure against audited supervisor cleanup correction; update current-source claims and lifecycle ownership where affected.
- **reviewed_unchanged:** [docs/vision/requirements.csv](docs/vision/requirements.csv) — Review prior closure against audited supervisor cleanup correction; update current-source claims and lifecycle ownership where affected.
- **reviewed_unchanged:** [packages/contracts/README.md](packages/contracts/README.md) — Review prior closure against audited supervisor cleanup correction; update current-source claims and lifecycle ownership where affected.
- **reviewed_unchanged:** [packages/design-system/README.md](packages/design-system/README.md) — Review prior closure against audited supervisor cleanup correction; update current-source claims and lifecycle ownership where affected.
- **reviewed_unchanged:** [packages/presentation/README.md](packages/presentation/README.md) — Review prior closure against audited supervisor cleanup correction; update current-source claims and lifecycle ownership where affected.
- **reviewed_unchanged:** [packages/service-runtime/README.md](packages/service-runtime/README.md) — Review prior closure against audited supervisor cleanup correction; update current-source claims and lifecycle ownership where affected.

Full changed-file inventory: [record](docs/changes/CHG-20261006-005.json).

### Limits and next actions

- Windows foundation observation is pending.
- Documentation gates support semantic review; local unsigned records cannot prevent deliberate Git history replacement.
- Actual Director Windows foundation observation remains pending; run pnpm dev before observation.
- Continue Director-scoped BOOT-02/03/05 and RULE/UX work with standardized documentation/proof workflow.

## CHG-20261006-004 — Clock-qualified evidence and final documentation review

- Status: finalized
- Actor: Codex developer / QA recorder
- Recorded (UTC): 2026-10-06T19:57:28.279Z
- Event: unknown; recorded retrospectively (recorded_only)
- Source: 8c94b274ebd6ad91223cdb6df085ca0597c107c9
- Tasks: DOC-01, DOC-02
- Features: F-DOCS, F-EVIDENCE
- Requirements: none

### Changes

- **review:** Final separate reviewer passed22 governance tests and clock consistency probes; original scope preserved and no important remaining findings in this assigned correction.
- **revision:** Record final review prose as a separate change after CHG-003 finalized snapshot; preserve strict replay rejection and failed static check rather than reopening completed history.
- **documentation:** Update active handoff/audit/backlog/feature references and final review report to clock-qualified receipts; Windows remains pending.
- **fix:** Real clock reversal detected by final evidence guard: preserve original RUN017 bytes, import reported quarantine RUN018, add monotonic elapsed/discontinuity capture and reject passing time proof on clock changes.
- **test:** Synthetic backwards/forward clock-step regression supplements actual quarantined failure; final source validation must rerun.
- **fix:** Independent clock consistency probe closed: writer and validator share monotonic/wall classification and reject elapsed/flag/sample contradictions; real anomalous raw evidence remains preserved.
- **fix:** Current matching-source acceptance requires consistent paired monotonic metadata; omission is rejected. Linux /proc ESRCH after process reaping is handled as gone, preserving strict bounded cleanup.
- **test:** Correct synthetic discontinuity fixture without weakening validation; use monotonic deadline for bounded descendant cleanup observation.
- **revision:** Final preservation scan exposed inherited CRLF-only checkout differences in two planning CSV registers. Normalize to existing Git LF policy, preserve identical values/Git content and archive bytes; validate canonical Git checkout separately.
- **documentation:** Retain emitted whitespace in raw evidence logs; standardize staged source/document formatting check excluding only captured logs, whose digest validation remains mandatory.
- **test:** Canonical staged Git checkout independently passed frozen install/build/type/lint and all41 tests; exact executable fingerprint matches final live source. Final staged source/document formatting passed while retaining raw log bytes.

### Verification

- **failed:** Actual final static check rejected unsynchronized post-finalization document edit; correction is this new follow-up entry. ([evidence](docs/validation/runs/RUN-20261006-016.json))
- **historical:** Independent21-test/manual/branch/source probes and concurrent3-pass descendant check; no remaining important findings. ([evidence](docs/validation/documentation-review.md))
- **historical:** Real reversed wall-clock sample quarantined; original record and actual exit0/log preserved without timestamp repair. ([evidence](docs/validation/runs/RUN-20261006-018.json))
- **failed:** Actual pre-correction clean static gate rejected incomplete documentation file coverage; corrected before final validation. ([evidence](docs/validation/runs/RUN-20261006-019.json))
- **failed:** Actual full suite reached governance and reported /proc ESRCH while killed process was reaped; corrected gone-state handling without masking surviving processes. ([evidence](docs/validation/runs/RUN-20261006-020.json))
- **failed:** Actual clean suite:21 of22 documentation tests passed. Synthetic clock fixture inconsistently paired its flag and samples; corrected fixture to exercise the intended passing-evidence rejection. ([evidence](docs/validation/runs/RUN-20261006-021.json))
- **passed:** Fresh source-only frozen install, ordered builds/types/lint and41 tests:19 foundation plus22 documentation governance. ([evidence](docs/validation/runs/RUN-20261006-024.json))
- **passed:** Seven exact pinned toolchain/Linux/private environment checks. ([evidence](docs/validation/runs/RUN-20261006-025.json))
- **passed:** Authenticated read-only existing PostgreSQL18 bootstrap connectivity; no recreation/persistence acceptance. ([evidence](docs/validation/runs/RUN-20261006-026.json))
- **passed:** Four live Linux Chromium/SwiftShader browser checks; Windows observation remains pending. ([evidence](docs/validation/runs/RUN-20261006-027.json))
- **historical:** Final separate read-only22-test/docs/clock-probe review; execution times unknown, report time explicit; no important remaining findings. ([evidence](docs/validation/documentation-review.md))
- **historical:** Ad hoc raw-byte preservation comparison initially failed on inherited CRLF-only checkout differences; normalized comparison confirms identical register values/Git content. Exact command times were not captured. ([evidence](docs/audits/2026-10-06-project-audit.md))
- **passed:** Final current-document coverage/snapshots/links/history/evidence plus preserved configuration/syntax passed before LF-only documentation normalization. ([evidence](docs/validation/runs/RUN-20261006-028.json))
- **passed:** Original scope/archive preserved, private file600/ignored and known-secret scan passed; whitespace portion checked then-unstaged source diff only. ([evidence](docs/validation/runs/RUN-20261006-030.json))
- **failed:** Full staged formatting check flagged original emitted tool-log whitespace; retain bytes and check source/document formatting with log-only exclusion. ([evidence](docs/validation/runs/RUN-20261006-031.json))
- **passed:** Canonical Git checkout frozen installation and full41-test foundation; source fingerprint equals final live source, no credentials/database copied. ([evidence](docs/validation/runs/RUN-20261006-029.json))
- **passed:** Final staged source/document formatting passed, raw log directory excluded only from style checks; byte digests still validated. ([evidence](docs/validation/runs/RUN-20261006-032.json))

### Documentation and files

- **updated:** [docs/HANDOFF.md](docs/HANDOFF.md) — Final review/report closure and exact active change/result references; compared against existing code and preserved pending acceptance.
- **updated:** [docs/audits/2026-10-06-project-audit.md](docs/audits/2026-10-06-project-audit.md) — Final review/report closure and exact active change/result references; compared against existing code and preserved pending acceptance.
- **updated:** [docs/vision/initial_backlog.csv](docs/vision/initial_backlog.csv) — Final review/report closure and exact active change/result references; compared against existing code and preserved pending acceptance.
- **updated:** [docs/validation/documentation-review.md](docs/validation/documentation-review.md) — Final review/report closure and exact active change/result references; compared against existing code and preserved pending acceptance.
- **updated:** [CHANGELOG.md](CHANGELOG.md) — Final review/report closure and exact active change/result references; compared against existing code and preserved pending acceptance.
- **reviewed_unchanged:** [AGENTS.md](AGENTS.md) — Reviewed against clock qualification/source changes; behavior remains accurate or explicit monotonic/quarantine policy added.
- **reviewed_unchanged:** [README.md](README.md) — Reviewed against clock qualification/source changes; behavior remains accurate or explicit monotonic/quarantine policy added.
- **reviewed_unchanged:** [apps/api/README.md](apps/api/README.md) — Reviewed against clock qualification/source changes; behavior remains accurate or explicit monotonic/quarantine policy added.
- **reviewed_unchanged:** [apps/match-service/README.md](apps/match-service/README.md) — Reviewed against clock qualification/source changes; behavior remains accurate or explicit monotonic/quarantine policy added.
- **reviewed_unchanged:** [apps/web/README.md](apps/web/README.md) — Reviewed against clock qualification/source changes; behavior remains accurate or explicit monotonic/quarantine policy added.
- **reviewed_unchanged:** [apps/worker/README.md](apps/worker/README.md) — Reviewed against clock qualification/source changes; behavior remains accurate or explicit monotonic/quarantine policy added.
- **updated:** [docs/CHANGELOG_FORMAT.md](docs/CHANGELOG_FORMAT.md) — Reviewed against clock qualification/source changes; behavior remains accurate or explicit monotonic/quarantine policy added.
- **updated:** [docs/DEVELOPMENT_WORKFLOW.md](docs/DEVELOPMENT_WORKFLOW.md) — Require LF snapshot consistency and validation of canonical Git checkout bytes after inherited CRLF differences were observed.
- **updated:** [docs/FEATURES.md](docs/FEATURES.md) — Reviewed against clock qualification/source changes; behavior remains accurate or explicit monotonic/quarantine policy added.
- **reviewed_unchanged:** [docs/README.md](docs/README.md) — Reviewed against clock qualification/source changes; behavior remains accurate or explicit monotonic/quarantine policy added.
- **updated:** [docs/WORKSPACE_QUALIFICATION.md](docs/WORKSPACE_QUALIFICATION.md) — Reviewed against clock qualification/source changes; behavior remains accurate or explicit monotonic/quarantine policy added.
- **reviewed_unchanged:** [docs/adr/0001-local-development-environment.md](docs/adr/0001-local-development-environment.md) — Reviewed against clock qualification/source changes; behavior remains accurate or explicit monotonic/quarantine policy added.
- **reviewed_unchanged:** [docs/adr/0002-application-foundation.md](docs/adr/0002-application-foundation.md) — Reviewed against clock qualification/source changes; behavior remains accurate or explicit monotonic/quarantine policy added.
- **updated:** [docs/adr/0003-documentation-evidence.md](docs/adr/0003-documentation-evidence.md) — Reviewed against clock qualification/source changes; behavior remains accurate or explicit monotonic/quarantine policy added.
- **updated:** [docs/documentation-map.json](docs/documentation-map.json) — Reviewed against clock qualification/source changes; behavior remains accurate or explicit monotonic/quarantine policy added.
- **updated:** [docs/features.json](docs/features.json) — Reviewed against clock qualification/source changes; behavior remains accurate or explicit monotonic/quarantine policy added.
- **updated:** [docs/plans/2026-10-06-documentation-governance.md](docs/plans/2026-10-06-documentation-governance.md) — Reviewed against clock qualification/source changes; behavior remains accurate or explicit monotonic/quarantine policy added.
- **reviewed_unchanged:** [docs/runbooks/workspace-setup.md](docs/runbooks/workspace-setup.md) — Reviewed against clock qualification/source changes; behavior remains accurate or explicit monotonic/quarantine policy added.
- **reviewed_unchanged:** [docs/schemas/change.schema.json](docs/schemas/change.schema.json) — Reviewed against clock qualification/source changes; behavior remains accurate or explicit monotonic/quarantine policy added.
- **reviewed_unchanged:** [docs/schemas/documentation-map.schema.json](docs/schemas/documentation-map.schema.json) — Reviewed against clock qualification/source changes; behavior remains accurate or explicit monotonic/quarantine policy added.
- **reviewed_unchanged:** [docs/schemas/state.schema.json](docs/schemas/state.schema.json) — Reviewed against clock qualification/source changes; behavior remains accurate or explicit monotonic/quarantine policy added.
- **reviewed_unchanged:** [docs/schemas/features.schema.json](docs/schemas/features.schema.json) — Reviewed against clock qualification/source changes; behavior remains accurate or explicit monotonic/quarantine policy added.
- **updated:** [docs/schemas/run.schema.json](docs/schemas/run.schema.json) — Reviewed against clock qualification/source changes; behavior remains accurate or explicit monotonic/quarantine policy added.
- **reviewed_unchanged:** [docs/templates/change.json](docs/templates/change.json) — Reviewed against clock qualification/source changes; behavior remains accurate or explicit monotonic/quarantine policy added.
- **reviewed_unchanged:** [docs/templates/handoff.md](docs/templates/handoff.md) — Reviewed against clock qualification/source changes; behavior remains accurate or explicit monotonic/quarantine policy added.
- **reviewed_unchanged:** [docs/validation/boot-01.md](docs/validation/boot-01.md) — Reviewed against clock qualification/source changes; behavior remains accurate or explicit monotonic/quarantine policy added.
- **reviewed_unchanged:** [docs/vision/README.md](docs/vision/README.md) — Reviewed against clock qualification/source changes; behavior remains accurate or explicit monotonic/quarantine policy added.
- **reviewed_unchanged:** [docs/vision/additional_scope.csv](docs/vision/additional_scope.csv) — Reviewed against clock qualification/source changes; behavior remains accurate or explicit monotonic/quarantine policy added.
- **reviewed_unchanged:** [docs/vision/decision_register.csv](docs/vision/decision_register.csv) — Reviewed against clock qualification/source changes; behavior remains accurate or explicit monotonic/quarantine policy added.
- **reviewed_unchanged:** [docs/vision/requirements.csv](docs/vision/requirements.csv) — Reviewed against clock qualification/source changes; behavior remains accurate or explicit monotonic/quarantine policy added.
- **reviewed_unchanged:** [packages/contracts/README.md](packages/contracts/README.md) — Reviewed against clock qualification/source changes; behavior remains accurate or explicit monotonic/quarantine policy added.
- **reviewed_unchanged:** [packages/design-system/README.md](packages/design-system/README.md) — Reviewed against clock qualification/source changes; behavior remains accurate or explicit monotonic/quarantine policy added.
- **reviewed_unchanged:** [packages/presentation/README.md](packages/presentation/README.md) — Reviewed against clock qualification/source changes; behavior remains accurate or explicit monotonic/quarantine policy added.
- **reviewed_unchanged:** [packages/service-runtime/README.md](packages/service-runtime/README.md) — Reviewed against clock qualification/source changes; behavior remains accurate or explicit monotonic/quarantine policy added.
- **historical_preserved:** [docs/vision/rules_certification_template.csv](docs/vision/rules_certification_template.csv) — All template values and Git bytes preserved; inherited checkout CRLF normalized to existing LF policy.

Full changed-file inventory: [record](docs/changes/CHG-20261006-004.json).

### Limits and next actions

- Windows foundation observation is pending.
- Documentation gates support semantic review; local unsigned records cannot prevent deliberate Git history replacement.
- Director actual Windows foundation observation remains pending; no current preview listener is left running.
- Continue assigned foundation/product tasks with the standardized documentation/evidence workflow.

## CHG-20261006-003 — Documentation audit, universal workflow and durable development proof

- Status: finalized
- Actor: Codex developer / architect / QA; Director historical evidence labeled separately
- Recorded (UTC): 2026-10-06T19:26:40.879Z
- Event: 2026-10-06T19:22:51.960Z (execution)
- Source: 8c94b274ebd6ad91223cdb6df085ca0597c107c9
- Tasks: DOC-01, DOC-02
- Features: F-DOCS, F-EVIDENCE, F-WORKSPACE
- Requirements: none

### Changes

- **expansion:** Add X06/DOC-01 current-document accuracy and X07/DOC-02 uniform timestamped change/evidence history; original548 requirements and20 optional flags preserved.
- **implementation:** Schema validation, complete documentation/source-impact map, generated hashes/callable inventory/changelog and evidence CLI; exact Ajv root tooling pin.
- **function:** Inventory, sync/check, fingerprint, rendering and bounded subprocess capture APIs recorded in feature/callable registers.
- **revision:** Correct stale dependency, test-method, persistence and live-preview claims; tie historical clean proof to reachable source and preserve sanitized prior-session outputs.
- **documentation:** Agent-neutral workflow, format, templates, feature/ownership register, ADR, full assignment/directory audit and current handoff.
- **test:** Meaningful negative drift/history/log/secret/failure/source-change/termination regressions and actual final validation outcomes are linked below.
- **implementation:** Reusable clean source-only frozen-install/full-foundation validator excludes credentials/Git/dependencies/build output and cleans its temporary copy.
- **fix:** Independent review reproductions closed: incomplete/future/unreachable proof rejection, missing-snapshot recovery, earliest Git history sealing, old/new impact-edge review, short-secret redaction and grandchild group termination.
- **feature:** Explicit human-device reported verdict/source/log convention with no process exits; manual reports cannot silently become executed feature verification.
- **fix:** Preserve independent concurrent-test failure; descendant cleanup assertion observes actual stopped/dead state within a bounded2s kernel-scheduling window instead of an immediate /proc sample.
- **fix:** Manual pending reports reject fabricated verdict/log/time, and creation timestamps are checked independently of unknown observation precision.
- **review:** Final clean validation:40 bootstrap/package/process/governance tests; four separate Linux Chromium checks; pinned doctor and read-only database passed at one executable fingerprint. Event timestamp is completion of final clean verification, not individual function creation time.

### Verification

- **historical:** Audit baseline/development checkpoint output, including failed attempts; exact earlier timing and draft code identity not reconstructed. ([evidence](docs/validation/runs/RUN-20261006-909.json))
- **historical:** Audit baseline/development checkpoint output, including failed attempts; exact earlier timing and draft code identity not reconstructed. ([evidence](docs/validation/runs/RUN-20261006-910.json))
- **historical:** Audit baseline/development checkpoint output, including failed attempts; exact earlier timing and draft code identity not reconstructed. ([evidence](docs/validation/runs/RUN-20261006-911.json))
- **historical:** Audit baseline/development checkpoint output, including failed attempts; exact earlier timing and draft code identity not reconstructed. ([evidence](docs/validation/runs/RUN-20261006-912.json))
- **historical:** Audit baseline/development checkpoint output, including failed attempts; exact earlier timing and draft code identity not reconstructed. ([evidence](docs/validation/runs/RUN-20261006-913.json))
- **historical:** Audit baseline/development checkpoint output, including failed attempts; exact earlier timing and draft code identity not reconstructed. ([evidence](docs/validation/runs/RUN-20261006-914.json))
- **historical:** Audit baseline/development checkpoint output, including failed attempts; exact earlier timing and draft code identity not reconstructed. ([evidence](docs/validation/runs/RUN-20261006-915.json))
- **historical:** Audit baseline/development checkpoint output, including failed attempts; exact earlier timing and draft code identity not reconstructed. ([evidence](docs/validation/runs/RUN-20261006-916.json))
- **historical:** Audit baseline/development checkpoint output, including failed attempts; exact earlier timing and draft code identity not reconstructed. ([evidence](docs/validation/runs/RUN-20261006-917.json))
- **historical:** Audit baseline/development checkpoint output, including failed attempts; exact earlier timing and draft code identity not reconstructed. ([evidence](docs/validation/runs/RUN-20261006-918.json))
- **historical:** Independent port-free review reproduction/report;20 regression tests rechecked and original scope preservation compared. ([evidence](docs/validation/documentation-review.md))
- **passed:** Superseded successful development checkpoint; final-source proof is RUN-012–015: Frozen install of all nine workspaces with unchanged strict peers/build policy ([evidence](docs/validation/runs/RUN-20261006-001.json))
- **passed:** Superseded successful development checkpoint; final-source proof is RUN-012–015: Fresh source-only frozen installation and full foundation verification ([evidence](docs/validation/runs/RUN-20261006-002.json))
- **passed:** Superseded successful development checkpoint; final-source proof is RUN-012–015: Final reviewed source-only frozen install, build, typecheck, lint, foundation and20 governance regression tests ([evidence](docs/validation/runs/RUN-20261006-003.json))
- **passed:** Superseded successful development checkpoint; final-source proof is RUN-012–015: Final pinned toolchain/Linux/private environment owner-only checks ([evidence](docs/validation/runs/RUN-20261006-004.json))
- **passed:** Superseded successful development checkpoint; final-source proof is RUN-012–015: Final authenticated read-only PostgreSQL18 bootstrap connection; no data reset or persistence claim ([evidence](docs/validation/runs/RUN-20261006-005.json))
- **passed:** Superseded successful development checkpoint; final-source proof is RUN-012–015: Install pinned Playwright Chromium browser cache using committed Linux runtime libraries ([evidence](docs/validation/runs/RUN-20261006-006.json))
- **passed:** Superseded successful development checkpoint; final-source proof is RUN-012–015: Four actual Linux Chromium/SwiftShader live web/services smoke checks; no Windows/GPU/device acceptance ([evidence](docs/validation/runs/RUN-20261006-007.json))
- **passed:** Superseded successful development checkpoint; final-source proof is RUN-012–015: Final source-only frozen install and full foundation validation with21 governance/manual-report regressions ([evidence](docs/validation/runs/RUN-20261006-008.json))
- **passed:** Superseded successful development checkpoint; final-source proof is RUN-012–015: Final clean source frozen install/build/types/lint and40 bootstrap/package/process/governance tests after review corrections ([evidence](docs/validation/runs/RUN-20261006-009.json))
- **passed:** Superseded successful development checkpoint; final-source proof is RUN-012–015: Final source doctor: pinned Node/pnpm Linux owner-only credential environment ([evidence](docs/validation/runs/RUN-20261006-010.json))
- **passed:** Superseded successful development checkpoint; final-source proof is RUN-012–015: Final preserved PostgreSQL18 authenticated read-only bootstrap check ([evidence](docs/validation/runs/RUN-20261006-011.json))
- **passed:** Final matching-source evidence: Final frozen clean source installation, builds, strict types, lint and40 bootstrap/package/process/governance tests ([evidence](docs/validation/runs/RUN-20261006-012.json))
- **passed:** Final matching-source evidence: Completed source doctor: pinned toolchain/Linux/private owner-only environment ([evidence](docs/validation/runs/RUN-20261006-013.json))
- **passed:** Final matching-source evidence: Completed source authenticated read-only PostgreSQL18 connection; existing data preserved ([evidence](docs/validation/runs/RUN-20261006-014.json))
- **passed:** Final matching-source evidence: Completed source four actual Linux Chromium SwiftShader web/service smoke tests; Windows still pending ([evidence](docs/validation/runs/RUN-20261006-015.json))
- **historical:** Independent reported21-test failed attempt (20pass/1fail, exit1); bounded stopped-state correction and subsequent passes retained. ([evidence](docs/validation/runs/RUN-20261006-919.json))

### Documentation and files

- **updated:** [AGENTS.md](AGENTS.md) — Compared against actual source and Director scope; corrected current behavior, status or universal workflow.
- **updated:** [README.md](README.md) — Compared against actual source and Director scope; corrected current behavior, status or universal workflow.
- **historical_preserved:** [SHA256SUMS.txt](SHA256SUMS.txt) — Read and preserved as labeled planning/provenance; current acceptance and runtime claims are maintained in the audit/handoff.
- **historical_preserved:** [VALIDATION_RESULTS.json](VALIDATION_RESULTS.json) — Read and preserved as labeled planning/provenance; current acceptance and runtime claims are maintained in the audit/handoff.
- **updated:** [apps/api/README.md](apps/api/README.md) — Compared against actual source and Director scope; corrected current behavior, status or universal workflow.
- **updated:** [apps/match-service/README.md](apps/match-service/README.md) — Compared against actual source and Director scope; corrected current behavior, status or universal workflow.
- **updated:** [apps/web/README.md](apps/web/README.md) — Compared against actual source and Director scope; corrected current behavior, status or universal workflow.
- **updated:** [apps/worker/README.md](apps/worker/README.md) — Compared against actual source and Director scope; corrected current behavior, status or universal workflow.
- **historical_preserved:** [docs/ARCHIVE_PROVENANCE.md](docs/ARCHIVE_PROVENANCE.md) — Read and preserved as labeled planning/provenance; current acceptance and runtime claims are maintained in the audit/handoff.
- **updated:** [docs/CHANGELOG_FORMAT.md](docs/CHANGELOG_FORMAT.md) — Compared against actual source and Director scope; corrected current behavior, status or universal workflow.
- **updated:** [docs/DEVELOPMENT_WORKFLOW.md](docs/DEVELOPMENT_WORKFLOW.md) — Compared against actual source and Director scope; corrected current behavior, status or universal workflow.
- **updated:** [docs/FEATURES.md](docs/FEATURES.md) — Compared against actual source and Director scope; corrected current behavior, status or universal workflow.
- **updated:** [docs/README.md](docs/README.md) — Compared against actual source and Director scope; corrected current behavior, status or universal workflow.
- **updated:** [docs/WORKSPACE_QUALIFICATION.md](docs/WORKSPACE_QUALIFICATION.md) — Compared against actual source and Director scope; corrected current behavior, status or universal workflow.
- **updated:** [docs/adr/0001-local-development-environment.md](docs/adr/0001-local-development-environment.md) — Compared against actual source and Director scope; corrected current behavior, status or universal workflow.
- **updated:** [docs/adr/0002-application-foundation.md](docs/adr/0002-application-foundation.md) — Compared against actual source and Director scope; corrected current behavior, status or universal workflow.
- **updated:** [docs/adr/0003-documentation-evidence.md](docs/adr/0003-documentation-evidence.md) — Compared against actual source and Director scope; corrected current behavior, status or universal workflow.
- **updated:** [docs/features.json](docs/features.json) — Compared against actual source and Director scope; corrected current behavior, status or universal workflow.
- **updated:** [docs/plans/2026-10-06-documentation-governance.md](docs/plans/2026-10-06-documentation-governance.md) — Compared against actual source and Director scope; corrected current behavior, status or universal workflow.
- **historical_preserved:** [docs/plans/boot-01-foundation.md](docs/plans/boot-01-foundation.md) — Read and preserved as labeled planning/provenance; current acceptance and runtime claims are maintained in the audit/handoff.
- **updated:** [docs/runbooks/workspace-setup.md](docs/runbooks/workspace-setup.md) — Compared against actual source and Director scope; corrected current behavior, status or universal workflow.
- **updated:** [docs/templates/handoff.md](docs/templates/handoff.md) — Compared against actual source and Director scope; corrected current behavior, status or universal workflow.
- **historical_preserved:** [docs/validation/boot-01-source-manifest.json](docs/validation/boot-01-source-manifest.json) — Read and preserved as labeled planning/provenance; current acceptance and runtime claims are maintained in the audit/handoff.
- **updated:** [docs/validation/boot-01.md](docs/validation/boot-01.md) — Compared against actual source and Director scope; corrected current behavior, status or universal workflow.
- **historical_preserved:** [docs/vision/Development_Blueprint_2026-10-05.md](docs/vision/Development_Blueprint_2026-10-05.md) — Read and preserved as labeled planning/provenance; current acceptance and runtime claims are maintained in the audit/handoff.
- **updated:** [docs/vision/README.md](docs/vision/README.md) — Compared against actual source and Director scope; corrected current behavior, status or universal workflow.
- **updated:** [docs/vision/additional_scope.csv](docs/vision/additional_scope.csv) — Compared against actual source and Director scope; corrected current behavior, status or universal workflow.
- **historical_preserved:** [docs/vision/container-manifests.json](docs/vision/container-manifests.json) — Read and preserved as labeled planning/provenance; current acceptance and runtime claims are maintained in the audit/handoff.
- **reviewed_unchanged:** [docs/vision/decision_register.csv](docs/vision/decision_register.csv) — Read and compared with current ownership/implementation; no behavior change requires different text.
- **historical_preserved:** [docs/vision/dependencies.json](docs/vision/dependencies.json) — Read and preserved as labeled planning/provenance; current acceptance and runtime claims are maintained in the audit/handoff.
- **updated:** [docs/vision/initial_backlog.csv](docs/vision/initial_backlog.csv) — Compared against actual source and Director scope; corrected current behavior, status or universal workflow.
- **historical_preserved:** [docs/vision/original_action_items.md](docs/vision/original_action_items.md) — Read and preserved as labeled planning/provenance; current acceptance and runtime claims are maintained in the audit/handoff.
- **historical_preserved:** [docs/vision/requirement_groups.json](docs/vision/requirement_groups.json) — Read and preserved as labeled planning/provenance; current acceptance and runtime claims are maintained in the audit/handoff.
- **reviewed_unchanged:** [docs/vision/requirements.csv](docs/vision/requirements.csv) — Read and compared with current ownership/implementation; no behavior change requires different text.
- **historical_preserved:** [docs/vision/rules_certification_template.csv](docs/vision/rules_certification_template.csv) — Read and preserved as labeled planning/provenance; current acceptance and runtime claims are maintained in the audit/handoff.
- **historical_preserved:** [docs/vision/source_register.json](docs/vision/source_register.json) — Read and preserved as labeled planning/provenance; current acceptance and runtime claims are maintained in the audit/handoff.
- **reviewed_unchanged:** [infra/README.md](infra/README.md) — Read and compared with current ownership/implementation; no behavior change requires different text.
- **updated:** [packages/contracts/README.md](packages/contracts/README.md) — Compared against actual source and Director scope; corrected current behavior, status or universal workflow.
- **reviewed_unchanged:** [packages/db/README.md](packages/db/README.md) — Read and compared with current ownership/implementation; no behavior change requires different text.
- **updated:** [packages/design-system/README.md](packages/design-system/README.md) — Compared against actual source and Director scope; corrected current behavior, status or universal workflow.
- **reviewed_unchanged:** [packages/domain/README.md](packages/domain/README.md) — Read and compared with current ownership/implementation; no behavior change requires different text.
- **reviewed_unchanged:** [packages/engine-adapter/README.md](packages/engine-adapter/README.md) — Read and compared with current ownership/implementation; no behavior change requires different text.
- **updated:** [packages/presentation/README.md](packages/presentation/README.md) — Compared against actual source and Director scope; corrected current behavior, status or universal workflow.
- **reviewed_unchanged:** [packages/rules-data/README.md](packages/rules-data/README.md) — Read and compared with current ownership/implementation; no behavior change requires different text.
- **updated:** [packages/service-runtime/README.md](packages/service-runtime/README.md) — Compared against actual source and Director scope; corrected current behavior, status or universal workflow.
- **reviewed_unchanged:** [packages/testkit/README.md](packages/testkit/README.md) — Read and compared with current ownership/implementation; no behavior change requires different text.
- **reviewed_unchanged:** [vendor/tcg-engines/README.md](vendor/tcg-engines/README.md) — Read and compared with current ownership/implementation; no behavior change requires different text.
- **updated:** [docs/documentation-map.json](docs/documentation-map.json) — Compared against actual source and Director scope; corrected current behavior, status or universal workflow.
- **updated:** [docs/HANDOFF.md](docs/HANDOFF.md) — Compared against actual source and Director scope; corrected current behavior, status or universal workflow.
- **updated:** [docs/audits/2026-10-06-project-audit.md](docs/audits/2026-10-06-project-audit.md) — Compared against actual source and Director scope; corrected current behavior, status or universal workflow.
- **updated:** [docs/templates/change.json](docs/templates/change.json) — Compared against actual source and Director scope; corrected current behavior, status or universal workflow.
- **updated:** [docs/schemas/state.schema.json](docs/schemas/state.schema.json) — Version1 generated snapshot contract includes observation time, change statuses, hashes and callable rows.
- **reviewed_unchanged:** [docs/schemas/change.schema.json](docs/schemas/change.schema.json) — Reviewed against sync/check and root command changes; schema keys and version remain accurate.
- **reviewed_unchanged:** [docs/schemas/documentation-map.schema.json](docs/schemas/documentation-map.schema.json) — Reviewed against sync/check and root command changes; schema keys and version remain accurate.
- **reviewed_unchanged:** [docs/schemas/features.schema.json](docs/schemas/features.schema.json) — Reviewed against sync/check and root command changes; schema keys and version remain accurate.
- **reviewed_unchanged:** [docs/schemas/run.schema.json](docs/schemas/run.schema.json) — Reviewed against sync/check and root command changes; schema keys and version remain accurate.
- **updated:** [docs/validation/documentation-review.md](docs/validation/documentation-review.md) — Preserve independently reproduced safeguards/fixes and exact review limits; no invented command times.

Full changed-file inventory: [record](docs/changes/CHG-20261006-003.json).

### Limits and next actions

- Actual Windows foundation observation remains pending; no phone/tablet/GPU/persistence/production acceptance.
- Semantic document truth still needs explicit review; fingerprints and schemas support but cannot replace it.
- Earlier exact test execution times remain unknown; historical imports are labeled.
- Director actual Windows foundation observation remains pending; start pnpm dev with owned ports free for it.
- Continue only assigned BOOT-02/03/05 or RULE/UX scopes using the universal workflow and explicit acceptance gates.

## CHG-20261006-002 — Retrospective BOOT-01 application foundation

- Status: finalized
- Actor: Codex developer / architect / QA; Director historical evidence labeled separately
- Recorded (UTC): 2026-10-06T18:57:12.487Z
- Event: 2026-10-06T06:46:03Z (git_commit)
- Source: 8c94b274ebd6ad91223cdb6df085ca0597c107c9
- Tasks: BOOT-01
- Features: F-WORKSPACE, F-CONTRACTS, F-HTTP, F-LIFECYCLE, F-WORKER, F-WEB, F-RENDERER, F-BOUNDARIES, F-SUPERVISOR
- Requirements: none

### Changes

- **implementation:** Four executable apps and contracts/presentation/design-system/server-only runtime; exact owning dependencies, strict types, builds and lint.
- **function:** Foundation schema parsing, diagnostics, cancellable lifecycle, idle worker, synthetic scene and supervised development; public behavior cataloged in FEATURES.md.
- **feature:** Semantic React diagnostics, opt-in Babylon geometry, private import/asset boundaries, local proxies and fixed port ownership.
- **fix:** Resolver/HTML/CSS/image-set leakage, pending startup cancellation and sibling process failure regressions fixed with actual negative Vite/process proofs.
- **test:** Historical clean frozen install/build/type/lint,19 bootstrap/package/process checks and4 Linux browser checks; earlier failed/fix outputs preserved.
- **documentation:** Foundation ADR/runbook/qualification, package ownership and partial requirement prerequisites recorded.

### Verification

- **historical:** Prior-session clean validation output; exact invocation/timing/exit metadata unknown ([evidence](docs/validation/runs/RUN-20261006-901.json))
- **historical:** Prior-session final workspace output; exact invocation/timing/exit metadata unknown ([evidence](docs/validation/runs/RUN-20261006-902.json))
- **historical:** Prior-session preserved checks output; exact invocation/timing/exit metadata unknown ([evidence](docs/validation/runs/RUN-20261006-903.json))
- **historical:** Prior-session image build output; exact invocation/timing/exit metadata unknown ([evidence](docs/validation/runs/RUN-20261006-904.json))
- **historical:** Prior-session earlier validation output; exact invocation/timing/exit metadata unknown ([evidence](docs/validation/runs/RUN-20261006-905.json))
- **historical:** Prior-session fixes output; exact invocation/timing/exit metadata unknown ([evidence](docs/validation/runs/RUN-20261006-906.json))
- **historical:** Prior-session browser output; exact invocation/timing/exit metadata unknown ([evidence](docs/validation/runs/RUN-20261006-907.json))
- **historical:** Prior-session final fixes output; exact invocation/timing/exit metadata unknown ([evidence](docs/validation/runs/RUN-20261006-908.json))

### Documentation and files



Full changed-file inventory: [record](docs/changes/CHG-20261006-002.json).

### Limits and next actions

- Retrospective event timestamp identifies the reachable commit; exact historical test times unknown.
- Windows foundation smoke not performed; pending Director observation.
- Synthetic software rendering and import boundaries do not accept device/GPU/gameplay/security/production requirements.
- Complete pending Windows observation; preserve BOOT-02/03/05 and RULE/UX gates.

## CHG-20261006-001 — Retrospective bootstrap publication

- Status: finalized
- Actor: Codex developer / architect / QA; Director historical evidence labeled separately
- Recorded (UTC): 2026-10-06T18:57:12.487Z
- Event: 2026-10-06T04:23:34Z (git_commit)
- Source: 335da7edffea40294b8dcf60ae256524432c350b
- Tasks: BOOT-01, BOOT-02
- Features: F-WORKSPACE, F-CONNECTIVITY, F-RESERVED
- Requirements: none

### Changes

- **implementation:** Pinned Dev Container/PostgreSQL, non-root user, private credential generator, root/bootstrap checks, editor tooling and reserved workspace ownership.
- **documentation:** Full vision/checklist/registers, setup/qualification and archive provenance introduced.
- **test:** Archive preparation and Director-supplied PC bootstrap/connectivity results retained as historical reports; exact test times unknown.
- **function:** Bootstrap/configuration/credential/HTTP callable implementations retained in Git; current callable inventory is observed later, not creation-time evidence.

### Verification

- **historical:** Original archive preparation; not current checkout validation ([evidence](VALIDATION_RESULTS.json))
- **historical:** Director PC setup and old plain Windows connectivity ([evidence](docs/WORKSPACE_QUALIFICATION.md))

### Documentation and files



Full changed-file inventory: [record](docs/changes/CHG-20261006-001.json).

### Limits and next actions

- Retrospective import; event time is Git commit time, not test time.
- BOOT-01 application and BOOT-02 role/persistence acceptance were incomplete.
- Use current source and handoff over the bootstrap snapshot.
