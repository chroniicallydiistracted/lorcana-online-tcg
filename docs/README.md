# Documentation entry point

Every developer and agent starts with [AGENTS.md](../AGENTS.md), the [current handoff](HANDOFF.md), and the [development workflow](DEVELOPMENT_WORKFLOW.md). The Director's current instructions take precedence. This standard is independent of editor, agent provider and personal memory.

| Record | Purpose and authority |
|---|---|
| [Workflow](DEVELOPMENT_WORKFLOW.md) / [record format](CHANGELOG_FORMAT.md) | Mandatory intake, documentation review, timestamp, verification and completion rules |
| [Changelog](../CHANGELOG.md) / [change records](changes/) | Uniform implementation and revision history; records are authoritative, Markdown is generated |
| [Feature register](FEATURES.md) / [structured features](features.json) | Current behavior, ownership, verification limits, planned/reserved scope |
| [Current state](current-state.json) | Generated audited source file hashes and JS/TS/Python callable inventory (vendored paths identify third-party provenance) observed at one UTC timestamp |
| [Documentation map](documentation-map.json) | Classification and source-impact dependencies for every project-owned document |
| [Audit](audits/2026-10-06-project-audit.md) | Comparison with the original assignment, directory review and resolved/pending findings |
| [Qualification](WORKSPACE_QUALIFICATION.md) / [foundation evidence](validation/boot-01.md) | Historical Director evidence, container execution, simulation, browser and pending device evidence |
| [Run records](validation/runs/) / [logs](validation/logs/) | Exact invocation, source fingerprint, timestamps, exit/signal and sanitized log digest |
| [Setup runbook](runbooks/workspace-setup.md) | Existing PC/container operation and new-checkout setup |
| [Database operation](runbooks/database.md) / [BOOT-02 evidence](validation/boot-02.md) | Managed roles/migrations/test DB and disposable persistence proof |
| [CI operation](runbooks/ci.md) / [BOOT-03 evidence](validation/boot-03.md) | Repeatable disposable local pipeline, checked Actions definition, dependency/secret gates and build artifacts |
| [Protocol](contracts/protocol.md) / [release policy](contracts/release.md) / [BOOT-05 evidence](validation/boot-05.md) | Closed public frames, bounded negotiation, built release identity and retained-version policy |
| [BOOT-04 decision worksheet](plans/2026-10-10-boot-04-decision-worksheet.md) / [hosting ADR](adr/0007-hosting-provider-baseline.md) / [engine/dependency ADR](adr/0008-engine-placement-dependency-baseline.md) / [BOOT-04 evidence](validation/boot-04.md) | Finalized provider, service, dependency, DNS/secret inventory and line-item quote baseline; earlier Codex research preserved as superseded evidence; Director sign-off recorded; purchase and deployment configuration pending |
| [Signed-off BOOT-04 review](reviews/2026-10-10-boot-04-final-decisions.md) | Dated consistency review, evidence limits and RULE-01 entry requirements |
| [Rules/source operation](rules/README.md) / [RULE-01 validation](validation/rule-01.md) | Dated official byte/hash/effective-date evidence, rules diff, English printing/identity/release states, pinned static test counts and missing-source gates; no engine/card certification |
| [Engine operation](runbooks/engine.md) / [RULE-02 evidence](validation/rule-02.md) / [ADR0009](adr/0009-pinned-engine-qualification.md) | Pinned minimal closure, license/patch/resolver identity, precompiled Node and trust-free worker qualification; later RNG/rules/privacy play gates remain closed |
| [RULE-02 independent review](reviews/2026-10-11-rule-02-closure.md) | Read-only final assessment, corrected findings, source-bound evidence and explicitly unreviewed later acceptance |
| [Fan content policy](policies/fan-content.md) | Director D07 asset decision, the required Ravensburger fan-content notice, no-charge rule, provenance and takedown readiness |
| [ADRs](adr/) | Context, affected tasks/requirements, alternatives and material architectural decisions |
| [Vision index](vision/README.md) | Full 548-item original vision, additional scope, task and decision registers |
| [Templates](templates/) / [schemas](schemas/) | Copyable handoff/change format and versioned validation contracts |
| [Archive provenance](ARCHIVE_PROVENANCE.md) | Original archive hashes and preparation evidence; immutable historical scope |

Current documents describe current code and action status. Planning documents retain intended future scope and explicitly identify implementation limits. Historical/archive records retain what was known at their recorded event; add corrections without rewriting executed results. Reserved-package READMEs describe reservations. Generated records are refreshed through tooling. Classification is never permission to leave a current behavioral claim inaccurate.

The map accounts for documentation across the whole repository, including workspace READMEs and root files. Generated dependencies, build output, browser caches, Git internals and private credentials are excluded from the source inventory; they are not independent documentation sources. The audit records these exclusions and their reasons.

## Current RULE-03 entry point

[ADR0010](adr/0010-secure-randomness-replay.md), [task plan](plans/2026-10-12-rule-03-randomness-replay.md), [engine operation](runbooks/engine.md) and [validation](validation/rule-03.md) govern secure server randomness, captured clocks, bounded private completed verification and Director D10 disclosure. The task has no delivery/auth/persistence endpoint. RULE-04 official scenarios/certification follows; PLAY-02 wire privacy and economic/ordinary-play gates stay closed.

## Current RULE-04 entry point

[ADR0011](adr/0011-sourced-rule-scenarios.md), [operation](runbooks/rules-certification.md), [task plan](plans/2026-10-12-rule-04-certification.md), [validation](validation/rule-04.md), [fresh sources](rules/2026-10-12-rule-04-sources.json), [per-card schema](schemas/card-certification.schema.json) and [template](templates/card-certification.json) own the representative current-rules suite and Director-approved new mechanics. Generic fixtures cannot certify or admit a card. RULE-03 hosted main82849f4 is now observed successful; RULE-04 representative acceptance is locally verified; isolated CI timing qualification remains pending after089/091 clock rejections. PLAY durability/privacy and official/card/device/production gates remain. The [independent audit](validation/rule-04.md#independent-audit-and-integration--2026-10-13-utc) confirms the representative acceptance, records two follow-ups (Adventurous static-loss end-of-turn defect; manual/debug moves with player authority) and a third clock-rejected isolated CI run.
