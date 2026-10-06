# Documentation entry point

Every developer and agent starts with [AGENTS.md](../AGENTS.md), the [current handoff](HANDOFF.md), and the [development workflow](DEVELOPMENT_WORKFLOW.md). The Director's current instructions take precedence. This standard is independent of editor, agent provider and personal memory.

| Record | Purpose and authority |
|---|---|
| [Workflow](DEVELOPMENT_WORKFLOW.md) / [record format](CHANGELOG_FORMAT.md) | Mandatory intake, documentation review, timestamp, verification and completion rules |
| [Changelog](../CHANGELOG.md) / [change records](changes/) | Uniform implementation and revision history; records are authoritative, Markdown is generated |
| [Feature register](FEATURES.md) / [structured features](features.json) | Current behavior, ownership, verification limits, planned/reserved scope |
| [Current state](current-state.json) | Generated project-owned file hashes and JS/TS/Python callable inventory observed at one UTC timestamp |
| [Documentation map](documentation-map.json) | Classification and source-impact dependencies for every project-owned document |
| [Audit](audits/2026-10-06-project-audit.md) | Comparison with the original assignment, directory review and resolved/pending findings |
| [Qualification](WORKSPACE_QUALIFICATION.md) / [foundation evidence](validation/boot-01.md) | Historical Director evidence, container execution, simulation, browser and pending device evidence |
| [Run records](validation/runs/) / [logs](validation/logs/) | Exact invocation, source fingerprint, timestamps, exit/signal and sanitized log digest |
| [Setup runbook](runbooks/workspace-setup.md) | Existing PC/container operation and new-checkout setup |
| [ADRs](adr/) | Context, affected tasks/requirements, alternatives and material architectural decisions |
| [Vision index](vision/README.md) | Full 548-item original vision, additional scope, task and decision registers |
| [Templates](templates/) / [schemas](schemas/) | Copyable handoff/change format and versioned validation contracts |
| [Archive provenance](ARCHIVE_PROVENANCE.md) | Original archive hashes and preparation evidence; immutable historical scope |

Current documents describe current code and action status. Planning documents retain intended future scope and explicitly identify implementation limits. Historical/archive records retain what was known at their recorded event; add corrections without rewriting executed results. Reserved-package READMEs describe reservations. Generated records are refreshed through tooling. Classification is never permission to leave a current behavioral claim inaccurate.

The map accounts for documentation across the whole repository, including workspace READMEs and root files. Generated dependencies, build output, browser caches, Git internals and private credentials are excluded from the source inventory; they are not independent documentation sources. The audit records these exclusions and their reasons.
