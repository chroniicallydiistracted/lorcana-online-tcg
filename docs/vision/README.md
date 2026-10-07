# Vision and research baseline

The blueprint and action checklist define the full game, beyond this workspace starter. The copied baseline is dated 5 October 2026. Later Project Director instructions and reviewed ADRs can amend it. Preserve the original requirement IDs and document changes.

Start with `Development_Blueprint_2026-10-05.md`, `original_action_items.md`, `requirements.csv`, and `initial_backlog.csv`. The requirement register contains 548 original action items across 33 groups. `additional_scope.csv` captures researched additions. `decision_register.csv` retains the open Director decisions; workspace setup does not resolve them.

`dependencies.json` records the anticipated 61-package metadata baseline. Add dependencies to their owning workspaces when needed, rechecking the exact version/peer/license/build requirements. The initial archive used a dependency-free root. Current BOOT-01 workspaces install scoped framework dependencies and the root owns exact development/check tooling, including schema validation; inspect the current manifests and frozen lockfile rather than treating this researched list as installed scope.

`source_register.json`, `container-manifests.json` and `rules_certification_template.csv` preserve source/qualification references. Recorded research is not evidence of successful container execution or certified game rules.

The blueprint and researched dependency/source/container registers are historical planning snapshots, not current runtime certifications. Some companion filenames mentioned inside the original blueprint (such as SETUP_RUNBOOK.md, catalog and planning qualification reports) were not delivered into this repository; the current setup/evidence documents are indexed in [docs/README.md](../README.md). Do not invent missing source evidence.

The Director added X06 (documentation accuracy) and X07 (universal timestamped change/evidence history) on 2026-10-06. Their DOC-01/DOC-02 backlog entries and [universal workflow](../DEVELOPMENT_WORKFLOW.md) apply to all future work. The original 548 requirement IDs and 20 optional flags are unchanged. Current task status belongs to initial_backlog.csv; open product decisions remain Director-owned.

BOOT-02 current implementation/verification is recorded in [the database runbook](../runbooks/database.md) and [validation](../validation/boot-02.md). The original bootstrap administrator is separate from managed app credentials; normal clean foundation checks need no private DB. Actual integration/recreation checks are explicit and must retain their own source/timestamp/results.

BOOT-03 implements a reviewed Actions definition and shared isolated local CI/artifact checks with local acceptance verified and hosted execution pending; see [CI operation](../runbooks/ci.md) and [validation](../validation/boot-03.md). This does not provision hosting or resolve Director release/budget/market choices.
