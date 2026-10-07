# Changelog

Generated from versioned records in docs/changes. Use docs/CHANGELOG_FORMAT.md; edit records, then run pnpm docs:sync. UTC is canonical; project display timezone is America/Phoenix. Historical imports do not invent test times.

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
