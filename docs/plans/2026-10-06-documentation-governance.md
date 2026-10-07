# Documentation and evidence implementation plan

Current continuation: BOOT-02 local acceptance is verified on `codex/boot-02-database`; [its validation record](../validation/boot-02.md) and ADR0004 supersede the earlier database-pending observations below. This document retains explicitly dated BOOT-01/governance evidence; Windows, full product/device, CI and production acceptance remain pending.

Director scope: 2026-10-06, America/Phoenix. Baseline: 8c94b274ebd6ad91223cdb6df085ca0597c107c9. Execution: native implementation with independent review; authorized audit and reversible changes continue without an additional approval gate.

Goal: every agent uses the same current-state, documentation, changelog, timestamp, verification and handoff contract. Historical evidence stays historical; missing Windows evidence stays pending.

1. Audit every project-owned tracked file and all documentation against the original handoff. Inventory ignored/generated/private areas separately without exposing credentials or treating third-party dependencies as owned source. Re-run original baseline commands in the discovered existing Dev Container.
2. Register X06/DOC-01 (documentation continuity) and X07/DOC-02 (universal changelog). Preserve all 548 original IDs and optional/device acceptance values.
3. Create agent-neutral workflow, changelog/evidence schemas, templates, feature catalog, documentation ownership map and generated source/function inventory. All timestamps use UTC ISO 8601 with America/Phoenix presentation. Retroactive records retain honest event-time precision.
4. Add local consistency tooling: schema validation, full documentation coverage, internal links, source/document fingerprints, feature/source/evidence references and deterministic changelog. Sync requires a change record and explicit review of affected current documents. It never certifies natural-language truth or creates test results.
5. Write negative regressions for stale sources/docs, missing docs, invalid timestamps/results, unrecorded changes, deleted files, forged log summaries and safe evidence capture. Record actual command start/end/exit and sanitized durable output; test-only simulations are labeled.
6. Fix audit findings in current docs; retain original archive/research bytes with classification and provenance. Add a current agent handoff and audit report with exact findings/disposition and requirement gates.
7. Validate new checks, preserved bootstrap/DB, foundation builds/types/lint/tests and browser checks as relevant; preserve failed attempts and separate container/simulated/headless/historical/manual categories. Refresh snapshot after evidence/docs are finalized, independently review, commit a coherent change without merging main or publishing.

Review focus: stale pass claims after source changes; timestamp fabrication; hash-only claims of semantic accuracy; self-referential snapshot cycles; omitted hidden project files; accidental secret capture; passing a wrapper while its command fails; interpreting software WebGL as Windows/device acceptance.

## Outcome

All seven implementation/audit stages completed within DOC-01/DOC-02. The initial clean-source and canonical Git-checkout checks passed before the later supervisor cleanup defect; final corrected-source checks below supersede them; original scope/optional/device flags were preserved. Independent review findings were reproduced, corrected and retained, including the failed timing-sensitive fixture and bounded correction. Universal manual reports distinguish human verdict from process exit. Initial implementation is CHG-003; clock qualification is CHG-004 and final supervisor-corrected run references/status are CHG-005; Windows remains pending.

Clock qualification follow-up: raw RUN017 showed a reversed UTC interval and was preserved byte-for-byte in validation/archive, with reported quarantine RUN018 and original log. The cause is unconfirmed. Monotonic duration/discontinuity guards now reject passing timing proof for such samples. Earlier RUN012–015 remain successful pre-correction checkpoints; final matching-source receipts RUN-024…027 passed and are recorded in CHG-004. No Windows observation was performed.

Final supervisor-corrected acceptance: RUN-040 passed frozen source-only installation, builds/types/lint and 43 tests (21 foundation, 22 governance); RUN-041 passed doctor; RUN-042 passed read-only DB; RUN-043 passed four Linux browser checks. RUN-044 confirms actual foundation listener cleanup. All match the corrected executable fingerprint. DOC-01/DOC-02 are implemented_verified; Windows and all previously pending product/device/persistence/production gates remain pending. Earlier RUN-024…029 are successful pre-correction checkpoints, not current-source acceptance.

RUN-033 exposed an owned Vite orphan after the canonical checkout suite exited0. Failed baseline RUN-036 reproduced the original algorithm leaving an executable descendant. The supervisor now retains group ownership through leader exit, shares cleanup promises, verifies live descendants with monotonic bounds and escalates if needed. Both actual descendant cases and an independently reviewed port-free synthetic integration passed. The identity-checked orphan alone was stopped; no unrelated process/data was changed.

Final canonical Git-checkout proof: RUN-045 passed frozen install, builds/types/lint and all 43 tests with the same corrected executable fingerprint as RUN-040…044. Staged source/document formatting passed (RUN-046), and original scope/archive/private-file/known-secret preservation passed (RUN-047). Actual post-canonical listener cleanup and finalized documentation are checked at closure in CHG-005. Windows remains pending.
