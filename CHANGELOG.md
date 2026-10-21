# Changelog

Generated from versioned records in docs/changes. Use docs/CHANGELOG_FORMAT.md; edit records, then run pnpm docs:sync. UTC is canonical; project display timezone is America/Phoenix. Historical imports do not invent test times.

## CHG-20261021-004 — Record Director decisions D24–D26 (inspector from scratch, official card data, design review) and the owed hosted runs

- Status: finalized
- Actor: Claude Code agent (architect/QA reviewer role) on Director request, local WSL session
- Recorded (UTC): 2026-10-21T21:56:10.244Z
- Event: unknown; recorded retrospectively (recorded_only)
- Source: 7a9e7576e302d8243fd0481bb84fa5c82b3b0c50
- Tasks: UX-01, UX-03, DOC-01, DOC-02
- Features: F-DESIGN-SYSTEM, F-DOCS
- Requirements: none

### Changes

- **review:** Hosted runs recorded from public GitHub job metadata (no artifacts downloaded); every run passed both jobs: 39514065746 (pull request #4, dc6757e), 39555849817, 39560354328 and 39619295311 (pull request #5 at 2c84769, a136841 and 7a9e757) and 39621867049 (main, 7a9e757). Main moved from 3793081 to 7a9e757, the commit run 39619295311 tested, pushed by the agent at the Director's instruction to push once CI finished. Main run 39621867049 closes the advisory failure of main run 39509517284.
- **review:** The Director reviewed the UX backlog status and 100 screenshots of the current interface (every non-reference Storybook story in Paper and Ink, open states of dialogs, the sheet, the confirmation, the tooltip and the inspector at 1280 and 390 px, and the web app's foundation page), captured from main 7a9e757 in headless Chromium 153. The screenshots and capture script are review material in the ignored .local folder and are not committed. While capturing, the tile's inspect button was found to show 'Printing' while its accessible name is 'Inspect …' (WCAG 2.5.3); the D26 tile change removes it.
- **edit:** Decision register: D24 (the enhanced card inspector is built from scratch in this project's design; the original Inkspire inspector is only a reference), D25 (all card data from Ravensburger's official v3 catalog, never made-up cards; scope confirmed: interface, Storybook and inspector work including its browser tests; neutral placeholders only as the takedown fallback; engine and rules tests keep synthetic fixtures) and D26 (design approved as shown at this time, with one change: a card tile shows the card itself and its details belong to the inspector).
- **edit:** Current documents brought in line: the AGENTS.md fixture rule now limits synthetic fixtures to engine and rules tests; status lines in AGENTS.md and docs/README.md; a dated validation section with the hosted runs, the review and the Ravensburger API check; a dated fan-content policy note on card data and fixtures; the UX-01 backlog evidence; and the handoff.

### Verification

- **passed:** docs:check over this record and the updated documents (static). ([evidence](docs/validation/runs/RUN-20261021-011.json))

### Documentation and files

- **updated:** [docs/vision/decision_register.csv](docs/vision/decision_register.csv) — Decisions D24, D25 and D26 with their message-time bounds.
- **updated:** [docs/validation/ux-design-system.md](docs/validation/ux-design-system.md) — Dated section: five hosted runs, the Director's screenshot review, the WCAG 2.5.3 defect found, and the Ravensburger API check.
- **updated:** [docs/policies/fan-content.md](docs/policies/fan-content.md) — Dated note: D25 narrows the synthetic-fixture default to engine and rules tests; rule 3 provenance applies to catalog snapshots and card images.
- **updated:** [AGENTS.md](AGENTS.md) — The fixture rule follows D25, and the UX-01 status line records D24–D26 and the merged runs.
- **updated:** [docs/README.md](docs/README.md) — Same status line as AGENTS.md.
- **updated:** [docs/vision/initial_backlog.csv](docs/vision/initial_backlog.csv) — UX-01 evidence names D26's approval of the current component design and keeps reference screens pending; status unchanged.
- **updated:** [docs/HANDOFF.md](docs/HANDOFF.md) — Current branch, decisions, hosted evidence and next actions.
- **updated:** [CHANGELOG.md](CHANGELOG.md) — Generated from the change records.
- **updated:** [docs/current-state.json](docs/current-state.json) — Generated snapshot.
- **reviewed_unchanged:** [docs/adr/0017-technical-design-system.md](docs/adr/0017-technical-design-system.md) — No architectural change; the card-data architecture gets its own ADR with the catalog change.
- **reviewed_unchanged:** [docs/runbooks/design-system.md](docs/runbooks/design-system.md) — No operational change yet; the tile and story fixtures change in a later record.
- **reviewed_unchanged:** [docs/features.json](docs/features.json) — No behavior change in this record.
- **reviewed_unchanged:** [docs/FEATURES.md](docs/FEATURES.md) — Generated from features.json, which is unchanged.
- **reviewed_unchanged:** [docs/vision/requirements.csv](docs/vision/requirements.csv) — R25 statuses and evidence are unchanged; nothing is accepted by a screenshot review.
- **reviewed_unchanged:** [docs/rules/README.md](docs/rules/README.md) — RULE-01 inventories stay dated research; the Ravensburger catalog is acquired by the later catalog change.
- **reviewed_unchanged:** [packages/rules-data/README.md](packages/rules-data/README.md) — Still reserved until the catalog change activates it.
- **reviewed_unchanged:** [packages/design-system/README.md](packages/design-system/README.md) — No package change in this record.

Full changed-file inventory: [record](docs/changes/CHG-20261021-004.json).

### Limits and next actions

- Documentation only: no source change, so the last full local receipts (RUN-20261021-008 to 010 at fingerprint 35834e4b) and the hosted runs stand.
- The screenshot review approves the current component design at this time; it is not reference-screen approval, device qualification or an accessibility evaluation.
- The Director's message times are bounded by the agent's own timestamps; exact receipt times were not recorded.
- Acquire the Ravensburger v3 catalog with provenance and normalize it in packages/rules-data under a new ADR.
- Replace every made-up card in stories and browser tests with real catalog cards, then reduce the card tile to the card itself (D26).
- Design and build the enhanced card inspector from scratch (D24).

## CHG-20261021-003 — Correct the Lorcana symbol provenance: the Director's own drawings or Ravensburger public digital assets

- Status: finalized
- Actor: Claude Code agent (architect/QA reviewer role) on Director request, local WSL session
- Recorded (UTC): 2026-10-21T14:32:09.557Z
- Event: unknown; recorded retrospectively (recorded_only)
- Source: a136841322ec5a8cb54734b50a030e458bd6b712
- Tasks: UX-01, DOC-01, DOC-02
- Features: F-DESIGN-SYSTEM, F-DOCS
- Requirements: none

### Changes

- **fix:** CHG-20261021-001 described the source folder (all-lorcana-assets in the original Inkspire app) as an official asset pack of unrecorded origin and the symbols as official. The Director states most, if not all, of its files are the Director's own drawings and the rest come directly from Ravensburger's publicly available digital assets. The symbol manifest now records that origin (per-file split not distinguished) with the exact D07 rights basis and a note that D07 applies to both; the 'official' colour mode becomes 'fixed'.
- **edit:** Current descriptions corrected in place: symbol-lib, GameSymbol and InkIdentity contracts and comments, the provider's takedown-switch documentation (covers anything depicting Lorcana marks, whoever drew it), the story helper, a browser test title and the runbook. Dated corrections appended to ADR 0017, the validation record and the fan-content policy rather than rewriting them. The symbol choice stands on its technical grounds.
- **test:** RUN-20261021-008 (configuration and workflow checks, pnpm audit clean, typecheck, lint, full suite: 403 Node, 26 Python, upstream 406/1 skip, 2 injection) passes at fingerprint 35834e4b.
- **test:** RUN-20261021-009: isolated design-system suite passed in 115 s (34 gates, Chromium install, 161/161) at fingerprint 35834e4b.

### Verification

- **passed:** Configuration contract, workflow check, pnpm audit, typecheck, lint and full suite at fingerprint 35834e4b. ([evidence](docs/validation/runs/RUN-20261021-008.json))
- **passed:** Isolated design-system suite at the final fingerprint: 34 gates, 161/161. ([evidence](docs/validation/runs/RUN-20261021-009.json))
- **passed:** docs:check over this record and the updated documents (static). ([evidence](docs/validation/runs/RUN-20261021-010.json))

### Documentation and files

- **updated:** [docs/adr/0017-technical-design-system.md](docs/adr/0017-technical-design-system.md) — Dated provenance correction: the source folder is mostly the Director's own drawings plus Ravensburger public digital assets, not an official pack.
- **updated:** [docs/validation/ux-design-system.md](docs/validation/ux-design-system.md) — Same dated provenance correction, with receipts.
- **updated:** [docs/policies/fan-content.md](docs/policies/fan-content.md) — Dated correction to the 2026-10-21 implementation note: origin recorded; rule 3 no longer has an open source item.
- **updated:** [docs/runbooks/design-system.md](docs/runbooks/design-system.md) — Adding a symbol records its origin; the takedown switch covers anything depicting Lorcana marks.
- **updated:** [docs/features.json](docs/features.json) — Every verified feature cites the run at the new fingerprint.
- **updated:** [docs/HANDOFF.md](docs/HANDOFF.md) — Updated for CHG-20261021-003; the download-location request becomes optional per-file attribution.
- **updated:** [CHANGELOG.md](CHANGELOG.md) — Regenerated by docs sync.
- **updated:** [docs/current-state.json](docs/current-state.json) — Regenerated by docs sync.
- **updated:** [docs/FEATURES.md](docs/FEATURES.md) — Regenerated by docs sync.
- **reviewed_unchanged:** [AGENTS.md](AGENTS.md) — Its status line says "verified Lorcana ink and gameplay symbols", the Director's own D21 wording, which stays accurate.
- **reviewed_unchanged:** [README.md](README.md) — Same status line as AGENTS.md; still accurate.
- **reviewed_unchanged:** [docs/README.md](docs/README.md) — Same status line as AGENTS.md; still accurate.
- **reviewed_unchanged:** [docs/WORKSPACE_QUALIFICATION.md](docs/WORKSPACE_QUALIFICATION.md) — Makes no statement about the origin of the Lorcana symbols that this correction contradicts.
- **reviewed_unchanged:** [docs/adr/0001-local-development-environment.md](docs/adr/0001-local-development-environment.md) — Makes no statement about the origin of the Lorcana symbols that this correction contradicts.
- **reviewed_unchanged:** [docs/adr/0002-application-foundation.md](docs/adr/0002-application-foundation.md) — Makes no statement about the origin of the Lorcana symbols that this correction contradicts.
- **reviewed_unchanged:** [docs/audits/2026-10-06-project-audit.md](docs/audits/2026-10-06-project-audit.md) — Makes no statement about the origin of the Lorcana symbols that this correction contradicts.
- **reviewed_unchanged:** [docs/documentation-map.json](docs/documentation-map.json) — Makes no statement about the origin of the Lorcana symbols that this correction contradicts.
- **reviewed_unchanged:** [docs/plans/2026-10-06-documentation-governance.md](docs/plans/2026-10-06-documentation-governance.md) — Makes no statement about the origin of the Lorcana symbols that this correction contradicts.
- **reviewed_unchanged:** [docs/plans/2026-10-10-boot-04-decision-worksheet.md](docs/plans/2026-10-10-boot-04-decision-worksheet.md) — Makes no statement about the origin of the Lorcana symbols that this correction contradicts.
- **reviewed_unchanged:** [docs/runbooks/workspace-setup.md](docs/runbooks/workspace-setup.md) — Makes no statement about the origin of the Lorcana symbols that this correction contradicts.
- **reviewed_unchanged:** [docs/templates/change.json](docs/templates/change.json) — Schema/template unaffected: no record, artifact or evidence format changes.
- **reviewed_unchanged:** [docs/validation/boot-01.md](docs/validation/boot-01.md) — Makes no statement about the origin of the Lorcana symbols that this correction contradicts.
- **reviewed_unchanged:** [docs/vision/README.md](docs/vision/README.md) — Makes no statement about the origin of the Lorcana symbols that this correction contradicts.
- **reviewed_unchanged:** [docs/vision/additional_scope.csv](docs/vision/additional_scope.csv) — Makes no statement about the origin of the Lorcana symbols that this correction contradicts.
- **reviewed_unchanged:** [docs/vision/decision_register.csv](docs/vision/decision_register.csv) — No new decision: the Director stated a fact about origin, recorded in the manifest and policy; D21's wording stays accurate.
- **reviewed_unchanged:** [docs/vision/initial_backlog.csv](docs/vision/initial_backlog.csv) — Makes no statement about the origin of the Lorcana symbols that this correction contradicts.
- **reviewed_unchanged:** [docs/vision/requirements.csv](docs/vision/requirements.csv) — Makes no statement about the origin of the Lorcana symbols that this correction contradicts.
- **reviewed_unchanged:** [packages/design-system/README.md](packages/design-system/README.md) — Says the symbols come from verified Lorcana assets in src/assets/symbols/, which stays accurate.

Full changed-file inventory: [record](docs/changes/CHG-20261021-003.json).

### Limits and next actions

- Which symbols are the Director's drawings and which are Ravensburger files is not distinguished.
- Push to pull request #5 and check both hosted jobs; the Director pushes the branch tip to main.

## CHG-20261021-002 — Record ADR 0017's approval in full (D23), audit its implementation and tighten the fallback-width test

- Status: finalized
- Actor: Claude Code agent (architect/QA reviewer role) on Director request, local WSL session
- Recorded (UTC): 2026-10-21T07:01:59.323Z
- Event: unknown; recorded retrospectively (recorded_only)
- Source: 2c847692128d752aebb7b4a2340f3a34cd148965
- Tasks: UX-01, UX-03, DOC-01, DOC-02
- Features: F-DESIGN-SYSTEM, F-DOCS
- Requirements: none

### Changes

- **documentation:** Decision D23: the Director approved ADR 0017 in its entirety, with the icon and font guidelines (D20, D21) governing where they differ, and required it implemented in full; this corrects D22's reading of 'other changes'. ADR 0017's status line and interpretations section record the approval.
- **review:** Implementation audit of every ADR 0017 decision item, interpretation and consequence against the code, recorded as a table in the ADR: all implemented; the authored icon family is superseded by D21; animation speed is bounded in the preference model as the ADR states, and applying it to choreography belongs to packages/presentation (§32).
- **fix:** The ADR's font-metrics consequence (about 4.5% width difference) was a Linux hinting artifact: with hinting off the measured fallback is within +1.2% of Source Sans 3 (639.5 px against 631.9 px; hinted 622 px against 651 px). The browser test bound tightens from 5% to 2%.
- **test:** RUN-20261021-005 (configuration and workflow checks, pnpm audit clean, typecheck, lint, full suite: 403 Node, 26 Python, upstream 406/1 skip, 2 injection) passes at fingerprint 52f4cc01.
- **test:** RUN-20261021-006: isolated design-system suite passed in 117 s (34 gates, Chromium install, 161/161, including the tightened 2% width bound) at fingerprint 52f4cc01.

### Verification

- **passed:** Configuration contract, workflow check, pnpm audit, typecheck, lint and full suite at fingerprint 52f4cc01. ([evidence](docs/validation/runs/RUN-20261021-005.json))
- **passed:** Isolated design-system suite at the final fingerprint: 34 gates, 161/161. ([evidence](docs/validation/runs/RUN-20261021-006.json))
- **passed:** docs:check over this record and the updated documents (static). ([evidence](docs/validation/runs/RUN-20261021-007.json))

### Documentation and files

- **updated:** [AGENTS.md](AGENTS.md) — UX-01 status line: ADR 0017 approved in full (D23); audit found every item implemented.
- **updated:** [README.md](README.md) — Same status-line addition as AGENTS.md.
- **updated:** [docs/README.md](docs/README.md) — Same status-line addition as AGENTS.md.
- **updated:** [docs/adr/0017-technical-design-system.md](docs/adr/0017-technical-design-system.md) — Status line: approved in full (D23). Interpretations marked approved. Dated section: implementation audit table, corrected font-metrics finding, animation-speed boundary.
- **updated:** [docs/vision/decision_register.csv](docs/vision/decision_register.csv) — New D23: ADR 0017 approved in full, correcting D22.
- **updated:** [docs/validation/ux-design-system.md](docs/validation/ux-design-system.md) — Dated section: the approval, the audit result, the corrected width finding and receipts.
- **updated:** [docs/features.json](docs/features.json) — Every verified feature cites the runs at the new fingerprint.
- **updated:** [docs/HANDOFF.md](docs/HANDOFF.md) — Updated for CHG-20261021-002; the interpretation review gate is removed.
- **updated:** [CHANGELOG.md](CHANGELOG.md) — Regenerated by docs sync.
- **updated:** [docs/current-state.json](docs/current-state.json) — Regenerated by docs sync.
- **updated:** [docs/FEATURES.md](docs/FEATURES.md) — Regenerated by docs sync.
- **reviewed_unchanged:** [docs/WORKSPACE_QUALIFICATION.md](docs/WORKSPACE_QUALIFICATION.md) — Makes no statement about the design-system browser test bounds or the ADR 0017 approval that this change contradicts.
- **reviewed_unchanged:** [docs/adr/0001-local-development-environment.md](docs/adr/0001-local-development-environment.md) — Makes no statement about the design-system browser test bounds or the ADR 0017 approval that this change contradicts.
- **reviewed_unchanged:** [docs/adr/0002-application-foundation.md](docs/adr/0002-application-foundation.md) — Makes no statement about the design-system browser test bounds or the ADR 0017 approval that this change contradicts.
- **reviewed_unchanged:** [docs/audits/2026-10-06-project-audit.md](docs/audits/2026-10-06-project-audit.md) — Makes no statement about the design-system browser test bounds or the ADR 0017 approval that this change contradicts.
- **reviewed_unchanged:** [docs/documentation-map.json](docs/documentation-map.json) — Makes no statement about the design-system browser test bounds or the ADR 0017 approval that this change contradicts.
- **reviewed_unchanged:** [docs/plans/2026-10-06-documentation-governance.md](docs/plans/2026-10-06-documentation-governance.md) — Makes no statement about the design-system browser test bounds or the ADR 0017 approval that this change contradicts.
- **reviewed_unchanged:** [docs/plans/2026-10-10-boot-04-decision-worksheet.md](docs/plans/2026-10-10-boot-04-decision-worksheet.md) — Makes no statement about the design-system browser test bounds or the ADR 0017 approval that this change contradicts.
- **reviewed_unchanged:** [docs/runbooks/design-system.md](docs/runbooks/design-system.md) — States the browser suite's scope and hinting setting, which are unchanged; the width bound is a test detail.
- **reviewed_unchanged:** [docs/runbooks/workspace-setup.md](docs/runbooks/workspace-setup.md) — Makes no statement about the design-system browser test bounds or the ADR 0017 approval that this change contradicts.
- **reviewed_unchanged:** [docs/templates/change.json](docs/templates/change.json) — Schema/template unaffected: no record, artifact or evidence format changes.
- **reviewed_unchanged:** [docs/validation/boot-01.md](docs/validation/boot-01.md) — Makes no statement about the design-system browser test bounds or the ADR 0017 approval that this change contradicts.
- **reviewed_unchanged:** [docs/vision/README.md](docs/vision/README.md) — Makes no statement about the design-system browser test bounds or the ADR 0017 approval that this change contradicts.
- **reviewed_unchanged:** [docs/vision/additional_scope.csv](docs/vision/additional_scope.csv) — Makes no statement about the design-system browser test bounds or the ADR 0017 approval that this change contradicts.
- **reviewed_unchanged:** [docs/vision/initial_backlog.csv](docs/vision/initial_backlog.csv) — Makes no statement about the design-system browser test bounds or the ADR 0017 approval that this change contradicts.
- **reviewed_unchanged:** [docs/vision/requirements.csv](docs/vision/requirements.csv) — Makes no statement about the design-system browser test bounds or the ADR 0017 approval that this change contradicts.
- **reviewed_unchanged:** [packages/design-system/README.md](packages/design-system/README.md) — Makes no statement about the design-system browser test bounds or the ADR 0017 approval that this change contradicts.

Full changed-file inventory: [record](docs/changes/CHG-20261021-002.json).

### Limits and next actions

- The foundation pipeline is not re-run locally: the only source change is a design-system browser test, which it does not execute; hosted CI runs both jobs.
- Push to pull request #5 and check both hosted jobs; the Director pushes the branch tip to main.

## CHG-20261021-001 — Integrate the card-face fonts, adopt the Phosphor icon standard and render verified Lorcana symbols (D20–D22)

- Status: finalized
- Actor: Claude Code agent (architect/QA reviewer role) on Director request, local WSL session
- Recorded (UTC): 2026-10-21T06:11:47.022Z
- Event: unknown; recorded retrospectively (recorded_only)
- Source: dc6757e704298b18042abae853df9b40e173ea48
- Tasks: UX-01, UX-03, DOC-01, DOC-02
- Features: F-DESIGN-SYSTEM, F-DOCS
- Requirements: R25.001, R25.002, R25.003, R25.004, R25.005, R25.006, R25.007, R25.008, R25.009, R25.010, R25.011, R25.012, R25.013, R25.014, R25.015, R25.016

### Changes

- **feature:** Card-face fonts (D20): The Bystander Collection Sans Regular, HvD trial Brandon Text Cond 400/400i/500/700/900i and Century Gothic Regular, byte-identical to the legacy originals, with checksums, source and embedded rights text in the font manifest. The trial Brandon builds cover 70 characters; Card Text Fallback (Source Sans 3 400/400i/500/700/900i; Medium, Italic and Black Italic added from the same 3.052R release) supplies every other character, measured by the new --cap-height mode of measure-font-metrics.mjs (size-adjust 106.06%, Brandon's typo metrics as overrides). measure-font-metrics.mjs now also reads WOFF2.
- **fix:** CardFaceText was its own size container, so its 6cqw padding resolved against the viewport and every printed cqw size shrank with the content box (title about 5 px in a 16rem card). An inner content box now carries the padding.
- **feature:** Interface icons (D21): @phosphor-icons/react 2.1.10 (MIT) pinned in packages/design-system; a curated 21-entry registry is the only Phosphor importer (one icon per import); Icon sizes standard 20 px and prominent 24 px; selected uses Fill. Selection controls keep 24 px through a new selection.size token; the icon stroke and size-small tokens are removed; the checkbox mark uses the registry.
- **feature:** Gameplay symbols (D21, D07): 12 official SVGs (6 inks unframed; lore, exert, inkable, uninkable, strength and willpower rules-text forms) vendored unchanged with a provenance manifest; scripts/symbol-lib.mjs parses a strict vector subset into src/generated/symbols.ts (drift-checked by tokens:check) with crops computed from shape bounds; GameSymbol component; InkIdentity shows the official ink symbol; DesignSystemProvider officialAssets={false} is the takedown switch to neutral placeholders.
- **test:** Node: font provenance and rights basis for every file; Brandon coverage and fallback values recomputed from the files; icon-registry rule; symbol parser rejections; symbol provenance (34 design-system tests). Browser: icon and symbol sizes, Fill state, card fonts loaded with Chromium's per-node font report showing Brandon and the Source Sans 3 fallback, reading presentation in Brandon 20/28, official and neutral symbols, crop fit, forced colours, plus screenshots in both themes (161 tests). The browser suite now runs with font hinting off.
- **test:** RUN-20261021-001 (configuration and workflow checks, pnpm audit clean, typecheck, lint, full suite: 403 Node, 26 Python, upstream 406/1 skip, 2 injection) passes at fingerprint 52f0e140.
- **test:** RUN-20261021-002: isolated design-system suite passed in 117 s (34 gates, Chromium install, 161/161). RUN-20261021-003: isolated foundation pipeline passed all 14 stages in 571 s (488 Node, 26 Python, upstream 406/1 skip, 2 injection, 13 web Chromium, Lab workers).

### Verification

- **passed:** Configuration contract, workflow check, pnpm audit, typecheck, lint and full suite at fingerprint 52f0e140. ([evidence](docs/validation/runs/RUN-20261021-001.json))
- **passed:** Isolated design-system suite at the final fingerprint: 34 gates, 161/161 Chromium. ([evidence](docs/validation/runs/RUN-20261021-002.json))
- **passed:** Isolated foundation pipeline at the final fingerprint: all 14 stages in 571 s. ([evidence](docs/validation/runs/RUN-20261021-003.json))
- **passed:** docs:check over this record and the updated documents (static). ([evidence](docs/validation/runs/RUN-20261021-004.json))

### Documentation and files

- **updated:** [AGENTS.md](AGENTS.md) — UX-01 status line: card-face fonts, Phosphor icons and verified Lorcana symbols (D20–D22).
- **updated:** [README.md](README.md) — Same status-line addition as AGENTS.md.
- **updated:** [docs/README.md](docs/README.md) — Same status-line addition as AGENTS.md.
- **updated:** [docs/adr/0017-technical-design-system.md](docs/adr/0017-technical-design-system.md) — Dated amendment: card-face fonts and coverage fallback, card-face sizing fix, Phosphor icon registry superseding the authored family, verified gameplay symbols and takedown switch, interpretations (D22), browser hinting.
- **updated:** [docs/runbooks/design-system.md](docs/runbooks/design-system.md) — Fonts section rewritten for the card faces and both measurement modes; new Icons and gameplay symbols section; browser suite runs with hinting off.
- **updated:** [docs/validation/ux-design-system.md](docs/validation/ux-design-system.md) — Dated section: font coverage and fallback measurement, sizing defect, icon and symbol choices, visual check, hinting artifact and receipts.
- **updated:** [docs/policies/fan-content.md](docs/policies/fan-content.md) — Dated implementation note: symbol provenance manifest, missing original download location, takedown switch; fonts are not Ravensburger assets.
- **updated:** [docs/vision/decision_register.csv](docs/vision/decision_register.csv) — New D20 (card-face fonts), D21 (icon standard and gameplay symbols), D22 (ADR 0017 interpretations and other changes).
- **updated:** [docs/features.json](docs/features.json) — F-DESIGN-SYSTEM description updated (fonts, icons, symbols, 47 components); every verified feature cites the runs at the new fingerprint.
- **updated:** [packages/design-system/README.md](packages/design-system/README.md) — Foundation, icons and symbols, component count and checks updated.
- **updated:** [docs/HANDOFF.md](docs/HANDOFF.md) — Updated for CHG-20261021-001, the branch and next actions.
- **updated:** [CHANGELOG.md](CHANGELOG.md) — Regenerated by docs sync.
- **updated:** [docs/current-state.json](docs/current-state.json) — Regenerated by docs sync.
- **updated:** [docs/FEATURES.md](docs/FEATURES.md) — Regenerated by docs sync.
- **reviewed_unchanged:** [docs/WORKSPACE_QUALIFICATION.md](docs/WORKSPACE_QUALIFICATION.md) — Makes no statement about card-face fonts, interface icons or gameplay symbols that this change contradicts.
- **reviewed_unchanged:** [docs/adr/0001-local-development-environment.md](docs/adr/0001-local-development-environment.md) — Makes no statement about card-face fonts, interface icons or gameplay symbols that this change contradicts.
- **reviewed_unchanged:** [docs/adr/0002-application-foundation.md](docs/adr/0002-application-foundation.md) — Makes no statement about card-face fonts, interface icons or gameplay symbols that this change contradicts.
- **reviewed_unchanged:** [docs/adr/0004-restricted-local-database.md](docs/adr/0004-restricted-local-database.md) — Makes no statement about card-face fonts, interface icons or gameplay symbols that this change contradicts.
- **reviewed_unchanged:** [docs/adr/0005-ci-artifact-qualification.md](docs/adr/0005-ci-artifact-qualification.md) — Artifact contents grow by the font files and generated symbols; the qualification method is unchanged.
- **reviewed_unchanged:** [docs/adr/0008-engine-placement-dependency-baseline.md](docs/adr/0008-engine-placement-dependency-baseline.md) — Engine placement and the dependency baseline are unchanged; the new icon dependency is UX-owned and recorded in ADR 0017.
- **reviewed_unchanged:** [docs/adr/0009-pinned-engine-qualification.md](docs/adr/0009-pinned-engine-qualification.md) — Makes no statement about card-face fonts, interface icons or gameplay symbols that this change contradicts.
- **reviewed_unchanged:** [docs/adr/0010-secure-randomness-replay.md](docs/adr/0010-secure-randomness-replay.md) — Makes no statement about card-face fonts, interface icons or gameplay symbols that this change contradicts.
- **reviewed_unchanged:** [docs/adr/0013-durable-synthetic-match-commands.md](docs/adr/0013-durable-synthetic-match-commands.md) — Makes no statement about card-face fonts, interface icons or gameplay symbols that this change contradicts.
- **reviewed_unchanged:** [docs/audits/2026-10-06-project-audit.md](docs/audits/2026-10-06-project-audit.md) — Makes no statement about card-face fonts, interface icons or gameplay symbols that this change contradicts.
- **reviewed_unchanged:** [docs/documentation-map.json](docs/documentation-map.json) — Makes no statement about card-face fonts, interface icons or gameplay symbols that this change contradicts.
- **reviewed_unchanged:** [docs/plans/2026-10-06-boot-02-database.md](docs/plans/2026-10-06-boot-02-database.md) — Makes no statement about card-face fonts, interface icons or gameplay symbols that this change contradicts.
- **reviewed_unchanged:** [docs/plans/2026-10-06-documentation-governance.md](docs/plans/2026-10-06-documentation-governance.md) — Makes no statement about card-face fonts, interface icons or gameplay symbols that this change contradicts.
- **reviewed_unchanged:** [docs/plans/2026-10-07-boot-03-ci.md](docs/plans/2026-10-07-boot-03-ci.md) — Makes no statement about card-face fonts, interface icons or gameplay symbols that this change contradicts.
- **reviewed_unchanged:** [docs/plans/2026-10-10-boot-04-decision-worksheet.md](docs/plans/2026-10-10-boot-04-decision-worksheet.md) — Dated planning register; @phosphor-icons/react is a design-system dependency recorded in ADR 0017 and D21, not a BOOT-04 baseline row.
- **reviewed_unchanged:** [docs/rules/README.md](docs/rules/README.md) — Makes no statement about card-face fonts, interface icons or gameplay symbols that this change contradicts.
- **reviewed_unchanged:** [docs/rules/source-specs-supplement.json](docs/rules/source-specs-supplement.json) — Makes no statement about card-face fonts, interface icons or gameplay symbols that this change contradicts.
- **reviewed_unchanged:** [docs/rules/source-specs.json](docs/rules/source-specs.json) — Makes no statement about card-face fonts, interface icons or gameplay symbols that this change contradicts.
- **reviewed_unchanged:** [docs/runbooks/ci.md](docs/runbooks/ci.md) — CI jobs and limits are unchanged; the design-system job runs the extended suite as before.
- **reviewed_unchanged:** [docs/runbooks/database.md](docs/runbooks/database.md) — Makes no statement about card-face fonts, interface icons or gameplay symbols that this change contradicts.
- **reviewed_unchanged:** [docs/runbooks/engine.md](docs/runbooks/engine.md) — Makes no statement about card-face fonts, interface icons or gameplay symbols that this change contradicts.
- **reviewed_unchanged:** [docs/runbooks/match-commands.md](docs/runbooks/match-commands.md) — Makes no statement about card-face fonts, interface icons or gameplay symbols that this change contradicts.
- **reviewed_unchanged:** [docs/runbooks/workspace-setup.md](docs/runbooks/workspace-setup.md) — Makes no statement about card-face fonts, interface icons or gameplay symbols that this change contradicts.
- **reviewed_unchanged:** [docs/templates/change.json](docs/templates/change.json) — Schema/template unaffected: no record, artifact or evidence format changes.
- **reviewed_unchanged:** [docs/validation/boot-01.md](docs/validation/boot-01.md) — Historical BOOT-01 evidence; not rewritten.
- **reviewed_unchanged:** [docs/validation/boot-02.md](docs/validation/boot-02.md) — Makes no statement about card-face fonts, interface icons or gameplay symbols that this change contradicts.
- **reviewed_unchanged:** [docs/validation/boot-03.md](docs/validation/boot-03.md) — Makes no statement about card-face fonts, interface icons or gameplay symbols that this change contradicts.
- **reviewed_unchanged:** [docs/validation/play-01.md](docs/validation/play-01.md) — Makes no statement about card-face fonts, interface icons or gameplay symbols that this change contradicts.
- **reviewed_unchanged:** [docs/validation/rule-01.md](docs/validation/rule-01.md) — Makes no statement about card-face fonts, interface icons or gameplay symbols that this change contradicts.
- **reviewed_unchanged:** [docs/validation/rule-02.md](docs/validation/rule-02.md) — Makes no statement about card-face fonts, interface icons or gameplay symbols that this change contradicts.
- **reviewed_unchanged:** [docs/validation/rule-03.md](docs/validation/rule-03.md) — Makes no statement about card-face fonts, interface icons or gameplay symbols that this change contradicts.
- **reviewed_unchanged:** [docs/vision/README.md](docs/vision/README.md) — Makes no statement about card-face fonts, interface icons or gameplay symbols that this change contradicts.
- **reviewed_unchanged:** [docs/vision/additional_scope.csv](docs/vision/additional_scope.csv) — Makes no statement about card-face fonts, interface icons or gameplay symbols that this change contradicts.
- **reviewed_unchanged:** [docs/vision/initial_backlog.csv](docs/vision/initial_backlog.csv) — Makes no statement about card-face fonts, interface icons or gameplay symbols that this change contradicts.
- **reviewed_unchanged:** [docs/vision/requirements.csv](docs/vision/requirements.csv) — Makes no statement about card-face fonts, interface icons or gameplay symbols that this change contradicts.
- **reviewed_unchanged:** [packages/engine-adapter/README.md](packages/engine-adapter/README.md) — Makes no statement about card-face fonts, interface icons or gameplay symbols that this change contradicts.
- **reviewed_unchanged:** [packages/engine-lab/README.md](packages/engine-lab/README.md) — Makes no statement about card-face fonts, interface icons or gameplay symbols that this change contradicts.
- **reviewed_unchanged:** [vendor/tcg-engines/README.md](vendor/tcg-engines/README.md) — Makes no statement about card-face fonts, interface icons or gameplay symbols that this change contradicts.

Full changed-file inventory: [record](docs/changes/CHG-20261021-001.json).

### Limits and next actions

- Brandon's fallback punctuation and accented letters visibly differ from Brandon; accepted by the Director as permanent (D20).
- The asset pack's original download location is not recorded (fan-content policy rule 3).
- Chromium automation only; real Windows and macOS rendering of the card faces is not qualified (UX-02).
- Push and open the pull request on top of PR #4; check both hosted jobs. The Director pushes PR #4 and then this branch to main.

## CHG-20261020-008 — Record the UX-01 merge runs and patch vite to 8.3.3 for new advisories

- Status: finalized
- Actor: Claude Code agent (architect/QA reviewer role) on Director request, local WSL session
- Recorded (UTC): 2026-10-20T22:59:51.995Z
- Event: unknown; recorded retrospectively (recorded_only)
- Source: 3793081debadd4ed8ad4ff50b3cd72fd3e55d4fe
- Tasks: UX-01, UX-03, BOOT-03, DOC-01, DOC-02
- Features: F-CI, F-WEB, F-DESIGN-SYSTEM, F-DOCS
- Requirements: none

### Changes

- **review:** Hosted run 39496608891 on pull request #3 passed both jobs at 3793081: design-system in about 3 minutes (30 checks, 150/150) and foundation with a 959 s pipeline step (886 s of stages). The Director fast-forwarded main from 9081192 to 3793081. Main run 39509517284 passed design-system and all 14 foundation stages, then failed the dependency advisory check. Source: public GitHub job and step metadata and the failed step's log; no artifacts downloaded.
- **fix:** Three vite 8.3.0–8.3.2 advisories in its bundled launch-editor were published 2026-10-20 18:30–19:51Z: GHSA-587h-7wmj-h5pm (high), GHSA-698v-4r3x-3vcv and GHSA-r825-w8mm-5pxw (moderate). The advisory policy rejects high findings. vite moves to 8.3.3, the first fixed release, in apps/web, packages/engine-lab, packages/design-system and vendor/tcg-engines; the lockfile changes only vite and the entries that reference it. pnpm audit reports no advisories.
- **test:** RUN-20261020-043: isolated design-system suite passed in 107 s (30 gates, Chromium install, 150/150). RUN-20261020-044: isolated foundation pipeline passed all 14 stages and the dependency advisory check in 544 s (484 Node, 26 Python, upstream 406/1 skip, 2 injection, 13 web Chromium, Lab workers). Both at fingerprint b75b0513 with vite 8.3.3.

### Verification

- **passed:** Configuration contract, workflow check, pnpm audit (no advisories), typecheck, lint and full suite (399 Node, 26 Python, upstream 406/1 skip, 2 injection) at fingerprint b75b0513. ([evidence](docs/validation/runs/RUN-20261020-042.json))
- **passed:** Isolated design-system suite with vite 8.3.3. ([evidence](docs/validation/runs/RUN-20261020-043.json))
- **passed:** Isolated foundation pipeline with vite 8.3.3, including the dependency advisory check that failed on main. ([evidence](docs/validation/runs/RUN-20261020-044.json))
- **passed:** docs:check over this record and the updated documents (static). ([evidence](docs/validation/runs/RUN-20261020-045.json))

### Documentation and files

- **updated:** [AGENTS.md](AGENTS.md) — UX-01 status line: hosted PR #3 and main runs, the merge and the vite advisory fix.
- **updated:** [README.md](README.md) — Same status-line addition as AGENTS.md.
- **updated:** [docs/README.md](docs/README.md) — Same status-line addition as AGENTS.md.
- **updated:** [docs/adr/0008-engine-placement-dependency-baseline.md](docs/adr/0008-engine-placement-dependency-baseline.md) — Dated section: vite 8.3.2 to 8.3.3 security patch in four workspaces, with the advisories and scope.
- **updated:** [docs/adr/0002-application-foundation.md](docs/adr/0002-application-foundation.md) — Dated amendment: vite is pinned at 8.3.3, not the 8.3.2 named in the decision.
- **updated:** [docs/adr/0017-technical-design-system.md](docs/adr/0017-technical-design-system.md) — Dated amendment: vite is pinned at 8.3.3, not the 8.3.2 named in decision item 10.
- **updated:** [docs/runbooks/ci.md](docs/runbooks/ci.md) — Dated section: a main failure caused only by newly published advisories, and how to diagnose and fix it.
- **updated:** [docs/validation/ux-design-system.md](docs/validation/ux-design-system.md) — Dated section: hosted PR #3 and main runs, the merge and the vite fix with its receipts.
- **updated:** [docs/features.json](docs/features.json) — Every verified feature also cites the runs at the new fingerprint.
- **updated:** [docs/HANDOFF.md](docs/HANDOFF.md) — Updated for CHG-20261020-008, the merge and the new branch.
- **updated:** [CHANGELOG.md](CHANGELOG.md) — Regenerated by docs sync.
- **updated:** [docs/current-state.json](docs/current-state.json) — Regenerated by docs sync.
- **reviewed_unchanged:** [apps/web/README.md](apps/web/README.md) — Does not name the vite version.
- **reviewed_unchanged:** [docs/FEATURES.md](docs/FEATURES.md) — Makes no statement about the vite version or the advisory policy that this patch contradicts.
- **reviewed_unchanged:** [docs/WORKSPACE_QUALIFICATION.md](docs/WORKSPACE_QUALIFICATION.md) — Makes no statement about the vite version or the advisory policy that this patch contradicts.
- **reviewed_unchanged:** [docs/adr/0001-local-development-environment.md](docs/adr/0001-local-development-environment.md) — Makes no statement about the vite version or the advisory policy that this patch contradicts.
- **reviewed_unchanged:** [docs/adr/0004-restricted-local-database.md](docs/adr/0004-restricted-local-database.md) — Makes no statement about the vite version or the advisory policy that this patch contradicts.
- **reviewed_unchanged:** [docs/adr/0005-ci-artifact-qualification.md](docs/adr/0005-ci-artifact-qualification.md) — Artifact and advisory policy are unchanged; the policy correctly rejected the new high advisory.
- **reviewed_unchanged:** [docs/adr/0006-protocol-release-contracts.md](docs/adr/0006-protocol-release-contracts.md) — Makes no statement about the vite version or the advisory policy that this patch contradicts.
- **reviewed_unchanged:** [docs/adr/0009-pinned-engine-qualification.md](docs/adr/0009-pinned-engine-qualification.md) — Makes no statement about the vite version or the advisory policy that this patch contradicts.
- **reviewed_unchanged:** [docs/adr/0010-secure-randomness-replay.md](docs/adr/0010-secure-randomness-replay.md) — Makes no statement about the vite version or the advisory policy that this patch contradicts.
- **reviewed_unchanged:** [docs/adr/0011-sourced-rule-scenarios.md](docs/adr/0011-sourced-rule-scenarios.md) — Makes no statement about the vite version or the advisory policy that this patch contradicts.
- **reviewed_unchanged:** [docs/adr/0012-upstream-kernel-refresh.md](docs/adr/0012-upstream-kernel-refresh.md) — Makes no statement about the vite version or the advisory policy that this patch contradicts.
- **reviewed_unchanged:** [docs/adr/0013-durable-synthetic-match-commands.md](docs/adr/0013-durable-synthetic-match-commands.md) — Makes no statement about the vite version or the advisory policy that this patch contradicts.
- **reviewed_unchanged:** [docs/adr/0014-viewer-projection-privacy.md](docs/adr/0014-viewer-projection-privacy.md) — Makes no statement about the vite version or the advisory policy that this patch contradicts.
- **reviewed_unchanged:** [docs/audits/2026-10-06-project-audit.md](docs/audits/2026-10-06-project-audit.md) — Makes no statement about the vite version or the advisory policy that this patch contradicts.
- **reviewed_unchanged:** [docs/contracts/protocol.md](docs/contracts/protocol.md) — Makes no statement about the vite version or the advisory policy that this patch contradicts.
- **reviewed_unchanged:** [docs/contracts/release.md](docs/contracts/release.md) — Makes no statement about the vite version or the advisory policy that this patch contradicts.
- **reviewed_unchanged:** [docs/contracts/viewer.md](docs/contracts/viewer.md) — Makes no statement about the vite version or the advisory policy that this patch contradicts.
- **reviewed_unchanged:** [docs/documentation-map.json](docs/documentation-map.json) — Makes no statement about the vite version or the advisory policy that this patch contradicts.
- **reviewed_unchanged:** [docs/plans/2026-10-06-boot-02-database.md](docs/plans/2026-10-06-boot-02-database.md) — Makes no statement about the vite version or the advisory policy that this patch contradicts.
- **reviewed_unchanged:** [docs/plans/2026-10-06-documentation-governance.md](docs/plans/2026-10-06-documentation-governance.md) — Makes no statement about the vite version or the advisory policy that this patch contradicts.
- **reviewed_unchanged:** [docs/plans/2026-10-07-boot-03-ci.md](docs/plans/2026-10-07-boot-03-ci.md) — Makes no statement about the vite version or the advisory policy that this patch contradicts.
- **reviewed_unchanged:** [docs/plans/2026-10-07-boot-05-contracts.md](docs/plans/2026-10-07-boot-05-contracts.md) — Makes no statement about the vite version or the advisory policy that this patch contradicts.
- **reviewed_unchanged:** [docs/plans/2026-10-10-boot-04-decision-worksheet.md](docs/plans/2026-10-10-boot-04-decision-worksheet.md) — Dated planning record; its register keeps 8.3.2 as the planned baseline, and ADR 0008 records the security deviation.
- **reviewed_unchanged:** [docs/plans/2026-10-13-upstream-engine-review.md](docs/plans/2026-10-13-upstream-engine-review.md) — Makes no statement about the vite version or the advisory policy that this patch contradicts.
- **reviewed_unchanged:** [docs/policies/fan-content.md](docs/policies/fan-content.md) — Makes no statement about the vite version or the advisory policy that this patch contradicts.
- **reviewed_unchanged:** [docs/rules/README.md](docs/rules/README.md) — Makes no statement about the vite version or the advisory policy that this patch contradicts.
- **reviewed_unchanged:** [docs/rules/source-specs-supplement.json](docs/rules/source-specs-supplement.json) — Makes no statement about the vite version or the advisory policy that this patch contradicts.
- **reviewed_unchanged:** [docs/rules/source-specs.json](docs/rules/source-specs.json) — Makes no statement about the vite version or the advisory policy that this patch contradicts.
- **reviewed_unchanged:** [docs/runbooks/database.md](docs/runbooks/database.md) — Makes no statement about the vite version or the advisory policy that this patch contradicts.
- **reviewed_unchanged:** [docs/runbooks/design-system.md](docs/runbooks/design-system.md) — Names commands and versions of Storybook and Playwright, not vite; nothing it states changes.
- **reviewed_unchanged:** [docs/runbooks/engine.md](docs/runbooks/engine.md) — Makes no statement about the vite version or the advisory policy that this patch contradicts.
- **reviewed_unchanged:** [docs/runbooks/match-commands.md](docs/runbooks/match-commands.md) — Makes no statement about the vite version or the advisory policy that this patch contradicts.
- **reviewed_unchanged:** [docs/runbooks/rules-certification.md](docs/runbooks/rules-certification.md) — Makes no statement about the vite version or the advisory policy that this patch contradicts.
- **reviewed_unchanged:** [docs/runbooks/viewer-privacy.md](docs/runbooks/viewer-privacy.md) — Makes no statement about the vite version or the advisory policy that this patch contradicts.
- **reviewed_unchanged:** [docs/runbooks/workspace-setup.md](docs/runbooks/workspace-setup.md) — Makes no statement about the vite version or the advisory policy that this patch contradicts.
- **reviewed_unchanged:** [docs/templates/card-certification.json](docs/templates/card-certification.json) — Schema/template unaffected: a dependency patch alters no record, artifact or evidence format.
- **reviewed_unchanged:** [docs/templates/change.json](docs/templates/change.json) — Schema/template unaffected: a dependency patch alters no record, artifact or evidence format.
- **reviewed_unchanged:** [docs/validation/boot-01.md](docs/validation/boot-01.md) — Historical BOOT-01 evidence recorded with vite 8.3.2 at its source; not rewritten.
- **reviewed_unchanged:** [docs/validation/boot-02.md](docs/validation/boot-02.md) — Makes no statement about the vite version or the advisory policy that this patch contradicts.
- **reviewed_unchanged:** [docs/validation/boot-03.md](docs/validation/boot-03.md) — Makes no statement about the vite version or the advisory policy that this patch contradicts.
- **reviewed_unchanged:** [docs/validation/boot-04.md](docs/validation/boot-04.md) — Makes no statement about the vite version or the advisory policy that this patch contradicts.
- **reviewed_unchanged:** [docs/validation/boot-05.md](docs/validation/boot-05.md) — Makes no statement about the vite version or the advisory policy that this patch contradicts.
- **reviewed_unchanged:** [docs/validation/play-01.md](docs/validation/play-01.md) — Makes no statement about the vite version or the advisory policy that this patch contradicts.
- **reviewed_unchanged:** [docs/validation/play-02.md](docs/validation/play-02.md) — Makes no statement about the vite version or the advisory policy that this patch contradicts.
- **reviewed_unchanged:** [docs/validation/play-03.md](docs/validation/play-03.md) — Makes no statement about the vite version or the advisory policy that this patch contradicts.
- **reviewed_unchanged:** [docs/validation/rule-01.md](docs/validation/rule-01.md) — Makes no statement about the vite version or the advisory policy that this patch contradicts.
- **reviewed_unchanged:** [docs/validation/rule-02.md](docs/validation/rule-02.md) — Makes no statement about the vite version or the advisory policy that this patch contradicts.
- **reviewed_unchanged:** [docs/validation/rule-03.md](docs/validation/rule-03.md) — Makes no statement about the vite version or the advisory policy that this patch contradicts.
- **reviewed_unchanged:** [docs/validation/rule-04.md](docs/validation/rule-04.md) — Makes no statement about the vite version or the advisory policy that this patch contradicts.
- **reviewed_unchanged:** [docs/validation/upstream-engine-review.md](docs/validation/upstream-engine-review.md) — Makes no statement about the vite version or the advisory policy that this patch contradicts.
- **reviewed_unchanged:** [docs/vision/README.md](docs/vision/README.md) — Makes no statement about the vite version or the advisory policy that this patch contradicts.
- **reviewed_unchanged:** [docs/vision/additional_scope.csv](docs/vision/additional_scope.csv) — Makes no statement about the vite version or the advisory policy that this patch contradicts.
- **reviewed_unchanged:** [docs/vision/decision_register.csv](docs/vision/decision_register.csv) — No Director decision is involved: moving to the first fixed release of a pinned tool is a routine security patch, recorded in ADR 0008.
- **reviewed_unchanged:** [docs/vision/initial_backlog.csv](docs/vision/initial_backlog.csv) — Makes no statement about the vite version or the advisory policy that this patch contradicts.
- **reviewed_unchanged:** [docs/vision/requirements.csv](docs/vision/requirements.csv) — Makes no statement about the vite version or the advisory policy that this patch contradicts.
- **reviewed_unchanged:** [packages/design-system/README.md](packages/design-system/README.md) — Does not name the vite version.
- **reviewed_unchanged:** [packages/engine-adapter/README.md](packages/engine-adapter/README.md) — Makes no statement about the vite version or the advisory policy that this patch contradicts.
- **reviewed_unchanged:** [packages/engine-lab/README.md](packages/engine-lab/README.md) — Does not name the vite version.
- **reviewed_unchanged:** [vendor/tcg-engines/README.md](vendor/tcg-engines/README.md) — Does not name the vite version; the vendored upstream source and patch ledger are unchanged.

Full changed-file inventory: [record](docs/changes/CHG-20261020-008.json).

### Limits and next actions

- The PR #3 run's audit did not report advisories that were already published; the cause of that lag is not established.
- Open a pull request for claude/vite-advisory and check both hosted jobs; main moves only at the Director's explicit push request.

## CHG-20261020-007 — Raise the isolated pipeline command limit to 1500 s (decision D19)

- Status: finalized
- Actor: Claude Code agent (architect/QA reviewer role) on Director request, local WSL session
- Recorded (UTC): 2026-10-20T20:42:22.503Z
- Event: unknown; recorded retrospectively (recorded_only)
- Source: b6a5b501aff9f50524a98b5660159fc7558c8586
- Tasks: UX-03, BOOT-03, DOC-01, DOC-02
- Features: F-CI, F-DESIGN-SYSTEM, F-DOCS
- Requirements: none

### Changes

- **fix:** Hosted run 39477270644 on pull request #3 (b6a5b50): the new design-system job passed in about 3 minutes, but the foundation job timed out when ci:verify reached 900 s, after its 14 stages had taken 866 s (foundation 243 s, live-matches 347 s, browser 187 s, engine-browser 32 s). The pipeline step on the same D13 source took 698 s and 888 s in earlier hosted runs, so runner variance alone exceeds the old margin. Director decision D19: raise the limit to 25 minutes.
- **implementation:** scripts/ci-local.py defines PIPELINE_TIMEOUT = 1500 and applies it only to the one isolated pipeline command (ci:verify or ci:design-system). The image build, frozen install, PostgreSQL start and cleanup keep their existing limits, and the Actions job limit stays at 30 minutes.
- **test:** tests/ci/launcher.test.py asserts that the pipeline command receives PIPELINE_TIMEOUT and that it is 1500 s. RUN-20261020-038 (configuration and workflow checks, typecheck, lint, full suite: 399 Node, 26 Python, upstream 406/1 skip, 2 injection) passes at fingerprint 94cbd3d2.
- **test:** RUN-20261020-039: isolated design-system suite passed in 107 s (30 gates, Chromium install, 150/150). RUN-20261020-040: isolated foundation pipeline passed all 14 stages in 545 s (484 Node, 26 Python, upstream 406/1 skip, 2 injection, 13 web Chromium, Lab workers). Both at fingerprint 94cbd3d2 through the changed launcher.

### Verification

- **passed:** Configuration contract, workflow check, typecheck, lint and full suite at the final fingerprint. ([evidence](docs/validation/runs/RUN-20261020-038.json))
- **passed:** Isolated design-system suite through the changed launcher at the final fingerprint. ([evidence](docs/validation/runs/RUN-20261020-039.json))
- **passed:** Isolated foundation pipeline through the changed launcher at the final fingerprint: all 14 stages in 545 s. ([evidence](docs/validation/runs/RUN-20261020-040.json))
- **passed:** docs:check over this record and the updated documents (static). ([evidence](docs/validation/runs/RUN-20261020-041.json))

### Documentation and files

- **updated:** [docs/runbooks/ci.md](docs/runbooks/ci.md) — Dated section: decision D19 raises the isolated pipeline command limit to 1500 s; the job limit stays 30 minutes.
- **updated:** [docs/adr/0017-technical-design-system.md](docs/adr/0017-technical-design-system.md) — Dated amendment correcting the D18 amendment: the foundation pipeline no longer keeps a 900 s budget (D19).
- **updated:** [docs/vision/decision_register.csv](docs/vision/decision_register.csv) — New D19: isolated pipeline command limit 1500 s.
- **updated:** [docs/features.json](docs/features.json) — Every verified feature also cites the runs at the new fingerprint.
- **updated:** [docs/validation/ux-design-system.md](docs/validation/ux-design-system.md) — Dated section: second hosted timeout, decision D19 and its receipts.
- **updated:** [docs/HANDOFF.md](docs/HANDOFF.md) — Updated for CHG-20261020-007.
- **updated:** [CHANGELOG.md](CHANGELOG.md) — Regenerated by docs sync.
- **updated:** [docs/current-state.json](docs/current-state.json) — Regenerated by docs sync.
- **reviewed_unchanged:** [AGENTS.md](AGENTS.md) — The status line describes the parallel job, not the time limit; nothing it states is contradicted.
- **reviewed_unchanged:** [README.md](README.md) — Same as AGENTS.md.
- **reviewed_unchanged:** [docs/CHANGELOG_FORMAT.md](docs/CHANGELOG_FORMAT.md) — Makes no statement about the isolated pipeline time limit that this change contradicts.
- **reviewed_unchanged:** [docs/DEVELOPMENT_WORKFLOW.md](docs/DEVELOPMENT_WORKFLOW.md) — Makes no statement about the isolated pipeline time limit that this change contradicts.
- **reviewed_unchanged:** [docs/FEATURES.md](docs/FEATURES.md) — Makes no statement about the isolated pipeline time limit that this change contradicts.
- **reviewed_unchanged:** [docs/README.md](docs/README.md) — Same as AGENTS.md.
- **reviewed_unchanged:** [docs/WORKSPACE_QUALIFICATION.md](docs/WORKSPACE_QUALIFICATION.md) — Makes no statement about the isolated pipeline time limit that this change contradicts.
- **reviewed_unchanged:** [docs/adr/0001-local-development-environment.md](docs/adr/0001-local-development-environment.md) — Makes no statement about the isolated pipeline time limit that this change contradicts.
- **reviewed_unchanged:** [docs/adr/0002-application-foundation.md](docs/adr/0002-application-foundation.md) — Makes no statement about the isolated pipeline time limit that this change contradicts.
- **reviewed_unchanged:** [docs/adr/0003-documentation-evidence.md](docs/adr/0003-documentation-evidence.md) — Makes no statement about the isolated pipeline time limit that this change contradicts.
- **reviewed_unchanged:** [docs/adr/0004-restricted-local-database.md](docs/adr/0004-restricted-local-database.md) — Makes no statement about the isolated pipeline time limit that this change contradicts.
- **reviewed_unchanged:** [docs/adr/0005-ci-artifact-qualification.md](docs/adr/0005-ci-artifact-qualification.md) — Artifact qualification and the job layout are unchanged; only the wall-time limit of one launcher command changes.
- **reviewed_unchanged:** [docs/adr/0006-protocol-release-contracts.md](docs/adr/0006-protocol-release-contracts.md) — Makes no statement about the isolated pipeline time limit that this change contradicts.
- **reviewed_unchanged:** [docs/audits/2026-10-06-project-audit.md](docs/audits/2026-10-06-project-audit.md) — Makes no statement about the isolated pipeline time limit that this change contradicts.
- **reviewed_unchanged:** [docs/contracts/protocol.md](docs/contracts/protocol.md) — Makes no statement about the isolated pipeline time limit that this change contradicts.
- **reviewed_unchanged:** [docs/contracts/release.md](docs/contracts/release.md) — Makes no statement about the isolated pipeline time limit that this change contradicts.
- **reviewed_unchanged:** [docs/documentation-map.json](docs/documentation-map.json) — Makes no statement about the isolated pipeline time limit that this change contradicts.
- **reviewed_unchanged:** [docs/plans/2026-10-06-boot-02-database.md](docs/plans/2026-10-06-boot-02-database.md) — Makes no statement about the isolated pipeline time limit that this change contradicts.
- **reviewed_unchanged:** [docs/plans/2026-10-06-documentation-governance.md](docs/plans/2026-10-06-documentation-governance.md) — Makes no statement about the isolated pipeline time limit that this change contradicts.
- **reviewed_unchanged:** [docs/plans/2026-10-07-boot-03-ci.md](docs/plans/2026-10-07-boot-03-ci.md) — Dated BOOT-03 plan; the current limit is recorded in the CI runbook and D19.
- **reviewed_unchanged:** [docs/plans/2026-10-07-boot-05-contracts.md](docs/plans/2026-10-07-boot-05-contracts.md) — Makes no statement about the isolated pipeline time limit that this change contradicts.
- **reviewed_unchanged:** [docs/runbooks/database.md](docs/runbooks/database.md) — Makes no statement about the isolated pipeline time limit that this change contradicts.
- **reviewed_unchanged:** [docs/runbooks/workspace-setup.md](docs/runbooks/workspace-setup.md) — Makes no statement about the isolated pipeline time limit that this change contradicts.
- **reviewed_unchanged:** [docs/schemas/card-certification.schema.json](docs/schemas/card-certification.schema.json) — Schema/template unaffected: the time-limit change alters no record, artifact or evidence format.
- **reviewed_unchanged:** [docs/schemas/change.schema.json](docs/schemas/change.schema.json) — Schema/template unaffected: the time-limit change alters no record, artifact or evidence format.
- **reviewed_unchanged:** [docs/schemas/documentation-map.schema.json](docs/schemas/documentation-map.schema.json) — Schema/template unaffected: the time-limit change alters no record, artifact or evidence format.
- **reviewed_unchanged:** [docs/schemas/features.schema.json](docs/schemas/features.schema.json) — Schema/template unaffected: the time-limit change alters no record, artifact or evidence format.
- **reviewed_unchanged:** [docs/schemas/run.schema.json](docs/schemas/run.schema.json) — Schema/template unaffected: the time-limit change alters no record, artifact or evidence format.
- **reviewed_unchanged:** [docs/schemas/state.schema.json](docs/schemas/state.schema.json) — Schema/template unaffected: the time-limit change alters no record, artifact or evidence format.
- **reviewed_unchanged:** [docs/templates/change.json](docs/templates/change.json) — Schema/template unaffected: the time-limit change alters no record, artifact or evidence format.
- **reviewed_unchanged:** [docs/templates/handoff.md](docs/templates/handoff.md) — Schema/template unaffected: the time-limit change alters no record, artifact or evidence format.
- **reviewed_unchanged:** [docs/validation/boot-01.md](docs/validation/boot-01.md) — Makes no statement about the isolated pipeline time limit that this change contradicts.
- **reviewed_unchanged:** [docs/validation/boot-02.md](docs/validation/boot-02.md) — Makes no statement about the isolated pipeline time limit that this change contradicts.
- **reviewed_unchanged:** [docs/validation/boot-03.md](docs/validation/boot-03.md) — Historical BOOT-03 pipeline evidence recorded under the earlier limit; the current limit is documented in docs/runbooks/ci.md.
- **reviewed_unchanged:** [docs/validation/boot-05.md](docs/validation/boot-05.md) — Makes no statement about the isolated pipeline time limit that this change contradicts.
- **reviewed_unchanged:** [docs/validation/clock-investigation.md](docs/validation/clock-investigation.md) — Makes no statement about the isolated pipeline time limit that this change contradicts.
- **reviewed_unchanged:** [docs/validation/play-03.md](docs/validation/play-03.md) — Makes no statement about the isolated pipeline time limit that this change contradicts.
- **reviewed_unchanged:** [docs/vision/README.md](docs/vision/README.md) — Makes no statement about the isolated pipeline time limit that this change contradicts.
- **reviewed_unchanged:** [docs/vision/additional_scope.csv](docs/vision/additional_scope.csv) — Makes no statement about the isolated pipeline time limit that this change contradicts.
- **reviewed_unchanged:** [docs/vision/initial_backlog.csv](docs/vision/initial_backlog.csv) — Makes no statement about the isolated pipeline time limit that this change contradicts.
- **reviewed_unchanged:** [docs/vision/requirements.csv](docs/vision/requirements.csv) — Makes no statement about the isolated pipeline time limit that this change contradicts.
- **reviewed_unchanged:** [infra/README.md](infra/README.md) — Makes no statement about the isolated pipeline time limit that this change contradicts.

Full changed-file inventory: [record](docs/changes/CHG-20261020-007.json).

### Limits and next actions

- A local run cannot exercise the hosted runner's speed; the hosted run is the check that matters for this fix.
- Push and check both hosted jobs on pull request #3; main moves only at the Director's explicit push request.

## CHG-20261020-006 — Run the design-system suite as a separate parallel CI job (decision D18)

- Status: finalized
- Actor: Claude Code agent (architect/QA reviewer role) on Director request, local WSL session
- Recorded (UTC): 2026-10-20T18:28:42.254Z
- Event: unknown; recorded retrospectively (recorded_only)
- Source: 3997557be5cf1083acd477ae73ac694403bf7483
- Tasks: UX-03, BOOT-03, DOC-01, DOC-02
- Features: F-CI, F-DESIGN-SYSTEM, F-DOCS
- Requirements: none

### Changes

- **fix:** Hosted Foundation run 39461681606 on pull request #3 (3997557) failed: ci:verify hit its 900 s limit during the in-pipeline design-system-browser stage after about 826 s of existing stages (foundation 240 s, live-matches 343 s, browser 186 s). Director decision D18: run the design-system suite as a separate parallel CI job.
- **implementation:** scripts/ci/design-system.mjs (pnpm ci:design-system) asserts isolation and runs the design-system gates, the pinned Chromium install and the Storybook/Playwright/axe suite. scripts/ci-local.py gains --suite design-system, reusing the isolated copy, image, Compose project, credential checks and cleanup; that suite publishes host.json only and refuses the foundation upload directory. The workflow adds a parallel design-system job; scripts/ci/check-config.py validates both jobs; the foundation pipeline drops the design-system-browser stage (14 stages, unchanged budget).
- **test:** tests/ci/launcher.test.py adds the design-system suite success path, the upload refusal and five workflow mutations (12 tests). RUN-20261020-032 (isolated design-system suite) passed before a final-message fix; RUN-20261020-033 (configuration and workflow checks, typecheck, lint, full suite: 399 Node, 26 Python, upstream 406/1 skip, 2 injection) and RUN-20261020-034 (isolated design-system suite: 30 gates, Chromium install, 150/150) pass at fingerprint 44591181. RUN-20261020-035 failed at docs:check because the verified features had not yet been re-bound to the new fingerprint.
- **test:** RUN-20261020-036: isolated foundation pipeline passed all 14 stages in 539 s (484 Node, 26 Python, upstream 406/1 skip, 2 injection, 13 web Chromium, Lab workers).

### Verification

- **passed:** Isolated design-system suite at fingerprint 23e1687c, before the launcher's final-message fix. ([evidence](docs/validation/runs/RUN-20261020-032.json))
- **passed:** Configuration contract, workflow check, typecheck, lint and full suite at the final fingerprint. ([evidence](docs/validation/runs/RUN-20261020-033.json))
- **passed:** Isolated design-system suite at the final fingerprint: 30 gates, pinned Chromium, 150/150. ([evidence](docs/validation/runs/RUN-20261020-034.json))
- **failed:** Isolated foundation pipeline: docs:check refused before the verified features were re-bound to the new fingerprint (ordering). ([evidence](docs/validation/runs/RUN-20261020-035.json))
- **passed:** Isolated foundation pipeline at the final fingerprint: all 14 stages in 539 s. ([evidence](docs/validation/runs/RUN-20261020-036.json))
- **passed:** docs:check over this record and the updated documents (static). ([evidence](docs/validation/runs/RUN-20261020-037.json))

### Documentation and files

- **updated:** [AGENTS.md](AGENTS.md) — Status line: the Playwright/axe suite runs as the parallel design-system CI job (D18).
- **updated:** [README.md](README.md) — Same status-line correction as AGENTS.md.
- **updated:** [docs/README.md](docs/README.md) — Same status-line correction as AGENTS.md.
- **updated:** [docs/adr/0017-technical-design-system.md](docs/adr/0017-technical-design-system.md) — Dated amendment: browser evidence runs as a separate parallel CI job (D18).
- **updated:** [docs/runbooks/ci.md](docs/runbooks/ci.md) — Dated section: parallel design-system job, launcher --suite option, suite stages, config checks; supersedes the in-pipeline stage note.
- **updated:** [docs/runbooks/design-system.md](docs/runbooks/design-system.md) — Checks section: CI runs the gates and browser suite in the parallel design-system job.
- **updated:** [docs/vision/decision_register.csv](docs/vision/decision_register.csv) — New D18: run the design-system suite as a separate parallel CI job.
- **updated:** [docs/features.json](docs/features.json) — Every verified feature also cites RUN-20261020-033; F-DESIGN-SYSTEM cites RUN-20261020-033/034.
- **updated:** [docs/validation/ux-design-system.md](docs/validation/ux-design-system.md) — Dated section: hosted timeout, decision D18, the parallel job and its receipts.
- **updated:** [docs/HANDOFF.md](docs/HANDOFF.md) — Updated for CHG-20261020-006 and the parallel job.
- **updated:** [CHANGELOG.md](CHANGELOG.md) — Regenerated by docs sync.
- **updated:** [docs/current-state.json](docs/current-state.json) — Regenerated by docs sync.
- **reviewed_unchanged:** [docs/CHANGELOG_FORMAT.md](docs/CHANGELOG_FORMAT.md) — Makes no statement about CI job layout, the launcher suite option or the design-system pipeline that this change contradicts.
- **reviewed_unchanged:** [docs/DEVELOPMENT_WORKFLOW.md](docs/DEVELOPMENT_WORKFLOW.md) — Makes no statement about CI job layout, the launcher suite option or the design-system pipeline that this change contradicts.
- **reviewed_unchanged:** [docs/FEATURES.md](docs/FEATURES.md) — Makes no statement about CI job layout, the launcher suite option or the design-system pipeline that this change contradicts.
- **reviewed_unchanged:** [docs/WORKSPACE_QUALIFICATION.md](docs/WORKSPACE_QUALIFICATION.md) — Makes no statement about CI job layout, the launcher suite option or the design-system pipeline that this change contradicts.
- **reviewed_unchanged:** [docs/adr/0001-local-development-environment.md](docs/adr/0001-local-development-environment.md) — Makes no statement about CI job layout, the launcher suite option or the design-system pipeline that this change contradicts.
- **reviewed_unchanged:** [docs/adr/0002-application-foundation.md](docs/adr/0002-application-foundation.md) — Makes no statement about CI job layout, the launcher suite option or the design-system pipeline that this change contradicts.
- **reviewed_unchanged:** [docs/adr/0003-documentation-evidence.md](docs/adr/0003-documentation-evidence.md) — Makes no statement about CI job layout, the launcher suite option or the design-system pipeline that this change contradicts.
- **reviewed_unchanged:** [docs/audits/2026-10-06-project-audit.md](docs/audits/2026-10-06-project-audit.md) — Makes no statement about CI job layout, the launcher suite option or the design-system pipeline that this change contradicts.
- **reviewed_unchanged:** [docs/documentation-map.json](docs/documentation-map.json) — Makes no statement about CI job layout, the launcher suite option or the design-system pipeline that this change contradicts.
- **reviewed_unchanged:** [docs/plans/2026-10-06-documentation-governance.md](docs/plans/2026-10-06-documentation-governance.md) — Makes no statement about CI job layout, the launcher suite option or the design-system pipeline that this change contradicts.
- **reviewed_unchanged:** [docs/runbooks/workspace-setup.md](docs/runbooks/workspace-setup.md) — Makes no statement about CI job layout, the launcher suite option or the design-system pipeline that this change contradicts.
- **reviewed_unchanged:** [docs/templates/change.json](docs/templates/change.json) — Makes no statement about CI job layout, the launcher suite option or the design-system pipeline that this change contradicts.
- **reviewed_unchanged:** [docs/templates/handoff.md](docs/templates/handoff.md) — Makes no statement about CI job layout, the launcher suite option or the design-system pipeline that this change contradicts.
- **reviewed_unchanged:** [docs/validation/boot-01.md](docs/validation/boot-01.md) — Makes no statement about CI job layout, the launcher suite option or the design-system pipeline that this change contradicts.
- **reviewed_unchanged:** [docs/vision/README.md](docs/vision/README.md) — Makes no statement about CI job layout, the launcher suite option or the design-system pipeline that this change contradicts.
- **reviewed_unchanged:** [docs/vision/additional_scope.csv](docs/vision/additional_scope.csv) — Makes no statement about CI job layout, the launcher suite option or the design-system pipeline that this change contradicts.
- **reviewed_unchanged:** [docs/vision/initial_backlog.csv](docs/vision/initial_backlog.csv) — Makes no statement about CI job layout, the launcher suite option or the design-system pipeline that this change contradicts.
- **reviewed_unchanged:** [docs/vision/requirements.csv](docs/vision/requirements.csv) — Makes no statement about CI job layout, the launcher suite option or the design-system pipeline that this change contradicts.
- **reviewed_unchanged:** [infra/README.md](infra/README.md) — Makes no statement about CI job layout, the launcher suite option or the design-system pipeline that this change contradicts.
- **reviewed_unchanged:** [packages/engine-adapter/README.md](packages/engine-adapter/README.md) — Makes no statement about CI job layout, the launcher suite option or the design-system pipeline that this change contradicts.
- **reviewed_unchanged:** [vendor/tcg-engines/README.md](vendor/tcg-engines/README.md) — Makes no statement about CI job layout, the launcher suite option or the design-system pipeline that this change contradicts.
- **reviewed_unchanged:** [docs/plans/2026-10-06-boot-02-database.md](docs/plans/2026-10-06-boot-02-database.md) — Makes no statement about CI job layout, the launcher suite option or the design-system pipeline that this change contradicts.
- **reviewed_unchanged:** [docs/adr/0004-restricted-local-database.md](docs/adr/0004-restricted-local-database.md) — Makes no statement about CI job layout, the launcher suite option or the design-system pipeline that this change contradicts.
- **reviewed_unchanged:** [docs/runbooks/database.md](docs/runbooks/database.md) — Makes no statement about CI job layout, the launcher suite option or the design-system pipeline that this change contradicts.
- **reviewed_unchanged:** [docs/validation/boot-02.md](docs/validation/boot-02.md) — Makes no statement about CI job layout, the launcher suite option or the design-system pipeline that this change contradicts.
- **reviewed_unchanged:** [docs/plans/2026-10-07-boot-03-ci.md](docs/plans/2026-10-07-boot-03-ci.md) — Dated BOOT-03 plan; the current job layout is recorded in the CI runbook and D18.
- **reviewed_unchanged:** [docs/adr/0005-ci-artifact-qualification.md](docs/adr/0005-ci-artifact-qualification.md) — Artifact qualification is unchanged: only the foundation job builds and uploads artifacts; the design-system job uploads none.
- **reviewed_unchanged:** [docs/validation/boot-03.md](docs/validation/boot-03.md) — Historical BOOT-03 pipeline evidence; the current two-job layout is documented in docs/runbooks/ci.md.
- **reviewed_unchanged:** [docs/plans/2026-10-07-boot-05-contracts.md](docs/plans/2026-10-07-boot-05-contracts.md) — Makes no statement about CI job layout, the launcher suite option or the design-system pipeline that this change contradicts.
- **reviewed_unchanged:** [docs/contracts/protocol.md](docs/contracts/protocol.md) — Makes no statement about CI job layout, the launcher suite option or the design-system pipeline that this change contradicts.
- **reviewed_unchanged:** [docs/contracts/release.md](docs/contracts/release.md) — Makes no statement about CI job layout, the launcher suite option or the design-system pipeline that this change contradicts.
- **reviewed_unchanged:** [docs/validation/boot-05.md](docs/validation/boot-05.md) — Makes no statement about CI job layout, the launcher suite option or the design-system pipeline that this change contradicts.
- **reviewed_unchanged:** [docs/adr/0006-protocol-release-contracts.md](docs/adr/0006-protocol-release-contracts.md) — Makes no statement about CI job layout, the launcher suite option or the design-system pipeline that this change contradicts.
- **reviewed_unchanged:** [docs/adr/0007-hosting-provider-baseline.md](docs/adr/0007-hosting-provider-baseline.md) — Makes no statement about CI job layout, the launcher suite option or the design-system pipeline that this change contradicts.
- **reviewed_unchanged:** [docs/adr/0008-engine-placement-dependency-baseline.md](docs/adr/0008-engine-placement-dependency-baseline.md) — Makes no statement about CI job layout, the launcher suite option or the design-system pipeline that this change contradicts.
- **reviewed_unchanged:** [docs/plans/2026-10-10-boot-04-decision-worksheet.md](docs/plans/2026-10-10-boot-04-decision-worksheet.md) — Makes no statement about CI job layout, the launcher suite option or the design-system pipeline that this change contradicts.
- **reviewed_unchanged:** [docs/validation/boot-04.md](docs/validation/boot-04.md) — Makes no statement about CI job layout, the launcher suite option or the design-system pipeline that this change contradicts.
- **reviewed_unchanged:** [docs/rules/README.md](docs/rules/README.md) — Makes no statement about CI job layout, the launcher suite option or the design-system pipeline that this change contradicts.
- **reviewed_unchanged:** [docs/rules/source-specs-supplement.json](docs/rules/source-specs-supplement.json) — Makes no statement about CI job layout, the launcher suite option or the design-system pipeline that this change contradicts.
- **reviewed_unchanged:** [docs/rules/source-specs.json](docs/rules/source-specs.json) — Makes no statement about CI job layout, the launcher suite option or the design-system pipeline that this change contradicts.
- **reviewed_unchanged:** [docs/validation/rule-01.md](docs/validation/rule-01.md) — Makes no statement about CI job layout, the launcher suite option or the design-system pipeline that this change contradicts.
- **reviewed_unchanged:** [packages/engine-lab/README.md](packages/engine-lab/README.md) — Makes no statement about CI job layout, the launcher suite option or the design-system pipeline that this change contradicts.
- **reviewed_unchanged:** [docs/runbooks/engine.md](docs/runbooks/engine.md) — Makes no statement about CI job layout, the launcher suite option or the design-system pipeline that this change contradicts.
- **reviewed_unchanged:** [docs/validation/rule-02.md](docs/validation/rule-02.md) — Makes no statement about CI job layout, the launcher suite option or the design-system pipeline that this change contradicts.
- **reviewed_unchanged:** [docs/adr/0009-pinned-engine-qualification.md](docs/adr/0009-pinned-engine-qualification.md) — Makes no statement about CI job layout, the launcher suite option or the design-system pipeline that this change contradicts.
- **reviewed_unchanged:** [docs/adr/0010-secure-randomness-replay.md](docs/adr/0010-secure-randomness-replay.md) — Makes no statement about CI job layout, the launcher suite option or the design-system pipeline that this change contradicts.
- **reviewed_unchanged:** [docs/validation/rule-03.md](docs/validation/rule-03.md) — Makes no statement about CI job layout, the launcher suite option or the design-system pipeline that this change contradicts.
- **reviewed_unchanged:** [docs/templates/card-certification.json](docs/templates/card-certification.json) — Makes no statement about CI job layout, the launcher suite option or the design-system pipeline that this change contradicts.
- **reviewed_unchanged:** [docs/adr/0011-sourced-rule-scenarios.md](docs/adr/0011-sourced-rule-scenarios.md) — Makes no statement about CI job layout, the launcher suite option or the design-system pipeline that this change contradicts.
- **reviewed_unchanged:** [docs/runbooks/rules-certification.md](docs/runbooks/rules-certification.md) — Makes no statement about CI job layout, the launcher suite option or the design-system pipeline that this change contradicts.
- **reviewed_unchanged:** [docs/validation/rule-04.md](docs/validation/rule-04.md) — Makes no statement about CI job layout, the launcher suite option or the design-system pipeline that this change contradicts.
- **reviewed_unchanged:** [docs/adr/0013-durable-synthetic-match-commands.md](docs/adr/0013-durable-synthetic-match-commands.md) — Makes no statement about CI job layout, the launcher suite option or the design-system pipeline that this change contradicts.
- **reviewed_unchanged:** [docs/runbooks/match-commands.md](docs/runbooks/match-commands.md) — Makes no statement about CI job layout, the launcher suite option or the design-system pipeline that this change contradicts.
- **reviewed_unchanged:** [docs/validation/play-01.md](docs/validation/play-01.md) — Makes no statement about CI job layout, the launcher suite option or the design-system pipeline that this change contradicts.
- **reviewed_unchanged:** [docs/validation/clock-investigation.md](docs/validation/clock-investigation.md) — Makes no statement about CI job layout, the launcher suite option or the design-system pipeline that this change contradicts.
- **reviewed_unchanged:** [docs/contracts/viewer.md](docs/contracts/viewer.md) — Makes no statement about CI job layout, the launcher suite option or the design-system pipeline that this change contradicts.
- **reviewed_unchanged:** [docs/runbooks/viewer-privacy.md](docs/runbooks/viewer-privacy.md) — Makes no statement about CI job layout, the launcher suite option or the design-system pipeline that this change contradicts.
- **reviewed_unchanged:** [docs/validation/play-02.md](docs/validation/play-02.md) — Makes no statement about CI job layout, the launcher suite option or the design-system pipeline that this change contradicts.
- **reviewed_unchanged:** [docs/validation/play-03.md](docs/validation/play-03.md) — Makes no statement about CI job layout, the launcher suite option or the design-system pipeline that this change contradicts.
- **reviewed_unchanged:** [docs/schemas/card-certification.schema.json](docs/schemas/card-certification.schema.json) — Schema/template unaffected: the CI job layout change alters no record, artifact or evidence format.
- **reviewed_unchanged:** [docs/schemas/change.schema.json](docs/schemas/change.schema.json) — Schema/template unaffected: the CI job layout change alters no record, artifact or evidence format.
- **reviewed_unchanged:** [docs/schemas/documentation-map.schema.json](docs/schemas/documentation-map.schema.json) — Schema/template unaffected: the CI job layout change alters no record, artifact or evidence format.
- **reviewed_unchanged:** [docs/schemas/features.schema.json](docs/schemas/features.schema.json) — Schema/template unaffected: the CI job layout change alters no record, artifact or evidence format.
- **reviewed_unchanged:** [docs/schemas/run.schema.json](docs/schemas/run.schema.json) — Schema/template unaffected: the CI job layout change alters no record, artifact or evidence format.
- **reviewed_unchanged:** [docs/schemas/state.schema.json](docs/schemas/state.schema.json) — Schema/template unaffected: the CI job layout change alters no record, artifact or evidence format.

Full changed-file inventory: [record](docs/changes/CHG-20261020-006.json).

### Limits and next actions

- Hosted execution of the new job is not yet observed at this checkpoint.
- Run the isolated foundation pipeline at the final fingerprint, record docs:check and finalize; push and check both hosted jobs on pull request #3.

## CHG-20261020-005 — Keep the Source Sans 3 license byte-identical in Git (line-ending correction)

- Status: finalized
- Actor: Claude Code agent (architect/QA reviewer role) on Director request, local WSL session
- Recorded (UTC): 2026-10-20T16:51:24.232Z
- Event: unknown; recorded retrospectively (recorded_only)
- Source: 17b7b8f22a51c1df1911092e9b2decb07854f0d2
- Tasks: UX-03, DOC-01, DOC-02
- Features: F-DESIGN-SYSTEM, F-DOCS
- Requirements: none

### Changes

- **fix:** The repository's '* text=auto eol=lf' rule committed an LF copy of the Source Sans 3 LICENSE.md in 17b7b8f, while the font manifest records the upstream CRLF bytes (sha256 89ad2c...). A fresh checkout would fail the font provenance test. .gitattributes now marks that one file -text and the committed blob is the exact upstream bytes.
- **test:** RUN-20261020-028 (configuration contract, typecheck, lint, full suite: 399 Node, 24 Python, upstream 406/1 skip, 2 injection) and RUN-20261020-029 (Chromium 150/150) pass at the final fingerprint 89f989ca. The local isolated pipeline was not re-run: RUN-20261020-026 passed all 15 stages one fingerprint earlier and only this attribute changed; the hosted run on a real checkout covers the fix.

### Verification

- **passed:** Configuration contract, typecheck, lint and full suite at the final fingerprint. ([evidence](docs/validation/runs/RUN-20261020-028.json))
- **passed:** Design-system Chromium suite 150/150 at the final fingerprint. ([evidence](docs/validation/runs/RUN-20261020-029.json))
- **failed:** docs:check failed: this record's source_commit was abbreviated; corrected to the full SHA. ([evidence](docs/validation/runs/RUN-20261020-030.json))
- **passed:** docs:check over this record and the updated documents (static). ([evidence](docs/validation/runs/RUN-20261020-031.json))

### Documentation and files

- **updated:** [docs/features.json](docs/features.json) — Every verified feature also cites RUN-20261020-028; F-DESIGN-SYSTEM cites RUN-20261020-028/029 at the final fingerprint.
- **updated:** [docs/validation/ux-design-system.md](docs/validation/ux-design-system.md) — Dated section: the license line-ending correction and its receipts.
- **updated:** [docs/HANDOFF.md](docs/HANDOFF.md) — Records CHG-20261020-005 and the final fingerprint evidence.
- **updated:** [CHANGELOG.md](CHANGELOG.md) — Regenerated by docs sync.
- **updated:** [docs/current-state.json](docs/current-state.json) — Regenerated by docs sync.
- **reviewed_unchanged:** [AGENTS.md](AGENTS.md) — Makes no statement about line-ending attributes; unaffected by keeping one third-party license file byte-identical.
- **reviewed_unchanged:** [README.md](README.md) — Makes no statement about line-ending attributes; unaffected by keeping one third-party license file byte-identical.
- **reviewed_unchanged:** [docs/FEATURES.md](docs/FEATURES.md) — Makes no statement about line-ending attributes; unaffected by keeping one third-party license file byte-identical.
- **reviewed_unchanged:** [docs/README.md](docs/README.md) — Makes no statement about line-ending attributes; unaffected by keeping one third-party license file byte-identical.
- **reviewed_unchanged:** [docs/WORKSPACE_QUALIFICATION.md](docs/WORKSPACE_QUALIFICATION.md) — Makes no statement about line-ending attributes; unaffected by keeping one third-party license file byte-identical.
- **reviewed_unchanged:** [docs/adr/0001-local-development-environment.md](docs/adr/0001-local-development-environment.md) — Makes no statement about line-ending attributes; unaffected by keeping one third-party license file byte-identical.
- **reviewed_unchanged:** [docs/adr/0002-application-foundation.md](docs/adr/0002-application-foundation.md) — Makes no statement about line-ending attributes; unaffected by keeping one third-party license file byte-identical.
- **reviewed_unchanged:** [docs/audits/2026-10-06-project-audit.md](docs/audits/2026-10-06-project-audit.md) — Makes no statement about line-ending attributes; unaffected by keeping one third-party license file byte-identical.
- **reviewed_unchanged:** [docs/documentation-map.json](docs/documentation-map.json) — Makes no statement about line-ending attributes; unaffected by keeping one third-party license file byte-identical.
- **reviewed_unchanged:** [docs/plans/2026-10-06-documentation-governance.md](docs/plans/2026-10-06-documentation-governance.md) — Makes no statement about line-ending attributes; unaffected by keeping one third-party license file byte-identical.
- **reviewed_unchanged:** [docs/runbooks/workspace-setup.md](docs/runbooks/workspace-setup.md) — Makes no statement about line-ending attributes; unaffected by keeping one third-party license file byte-identical.
- **reviewed_unchanged:** [docs/templates/change.json](docs/templates/change.json) — Makes no statement about line-ending attributes; unaffected by keeping one third-party license file byte-identical.
- **reviewed_unchanged:** [docs/validation/boot-01.md](docs/validation/boot-01.md) — Makes no statement about line-ending attributes; unaffected by keeping one third-party license file byte-identical.
- **reviewed_unchanged:** [docs/vision/README.md](docs/vision/README.md) — Makes no statement about line-ending attributes; unaffected by keeping one third-party license file byte-identical.
- **reviewed_unchanged:** [docs/vision/additional_scope.csv](docs/vision/additional_scope.csv) — Makes no statement about line-ending attributes; unaffected by keeping one third-party license file byte-identical.
- **reviewed_unchanged:** [docs/vision/decision_register.csv](docs/vision/decision_register.csv) — Makes no statement about line-ending attributes; unaffected by keeping one third-party license file byte-identical.
- **reviewed_unchanged:** [docs/vision/initial_backlog.csv](docs/vision/initial_backlog.csv) — Makes no statement about line-ending attributes; unaffected by keeping one third-party license file byte-identical.
- **reviewed_unchanged:** [docs/vision/requirements.csv](docs/vision/requirements.csv) — Makes no statement about line-ending attributes; unaffected by keeping one third-party license file byte-identical.

Full changed-file inventory: [record](docs/changes/CHG-20261020-005.json).

### Limits and next actions

- The local isolated pipeline was not re-run after this attribute-only change; the hosted pull-request run provides the full-pipeline evidence on a real checkout.
- Push, open the pull request and check the hosted Foundation run; main moves only at the Director's explicit request.

## CHG-20261020-004 — UX-01: adopt the UX/UI standard and build the technical design system (tokens, components, Storybook, Chromium evidence)

- Status: finalized
- Actor: Claude Code agent (architect/QA reviewer role) on Director request, local WSL session
- Recorded (UTC): 2026-10-20T16:23:09.182Z
- Event: unknown; recorded retrospectively (recorded_only)
- Source: d188387c5e6b19b4bc0ed73a492bb792cadcad76
- Tasks: UX-01, UX-03, DOC-01, DOC-02
- Features: F-DESIGN-SYSTEM, F-WEB, F-CI, F-DOCS
- Requirements: R25.001, R25.002, R25.003, R25.004, R25.005, R25.006, R25.007, R25.008, R25.009, R25.010, R25.011, R25.012, R25.013, R25.014, R25.015, R25.016

### Changes

- **feature:** Built packages/design-system from docs/vision/UX_UI_DESIGN_SYSTEM.md (decision D17): DTCG 2025.10 subset tokens in primitive, semantic (Paper and Ink), component and card layers with exact standard values; validator for references, cycles, types, units, constructs, descriptions, theme mappings, achromatic neutrals and 38 contrast pairs per theme; Style Dictionary 5.6.0 resolution cross-checked against the validator; deterministic CSS, typed TS, renderer (sRGB and linear), @value breakpoints, font faces and manifest with a drift check.
- **feature:** Foundation and components: DesignSystemProvider (theme, density, motion, locale, single announcer), versioned preference model with the standard's defaults and safe device storage, externalized strings with plurals and the en-XA pseudolocale; self-hosted Source Sans 3 3.052R (OFL-1.1) with fallback metrics measured from the release TTFs against Liberation Sans; 46 experimental React Aria components with CSS Modules, exact generated CSS-module types and section 13 documentation contracts, including Confirmation, CardTile, DeckEntry, CardInspector, InspectorHost, CardFaceText and FanContentNotice.
- **feature:** Enforcement and evidence: style-ownership gate over the design system and apps/web (raw colours, fonts, sizes, shadows, radii, durations, lengths, z-index, !important and unknown tokens rejected; 10 documented exceptions); component-contract gate with 190/190 state coverage; Storybook 10.6.1 with toolbar globals; Playwright and axe Chromium suite in a new CI stage design-system-browser.
- **feature:** apps/web now renders inside DesignSystemProvider with design-system components, token-only styling and the fan-content notice; global.css removed; allowArbitraryExtensions enabled.
- **implementation:** Dependencies pinned in packages/design-system at planned register versions (style-dictionary 5.6.0, storybook and @storybook/react-vite 10.6.1, vite 8.3.2, @vitejs/plugin-react 6.1.2, @playwright/test 1.63.0, @axe-core/playwright 4.13.0, typescript 6.0.3, @types/node 24.19.1). esbuild's postinstall denied (allowBuilds esbuild: false) in favour of the lockfile-pinned platform binary. Decision D16 adds CC-BY-4.0 to scripts/ci/policy.json for Storybook's caniuse-lite. pnpm audit reports no advisories. ESLint ignores storybook-static; Storybook builds into .local.
- **documentation:** ADR 0017, design-system runbook, validation record, archived original ZIP, decisions D16/D17, backlog UX-01/UX-03 statuses, R25 requirement links (statuses unchanged), F-DESIGN-SYSTEM and F-WEB, documentation map, dated notes in the CI runbook, fan-content policy and web README, status lines and handoff.
- **test:** RUN-20261020-020 design-system gates 30/30; RUN-20261020-021 Chromium suite 150/150 (88 axe runs over 44 stories in Paper and Ink, 38 target-size checks, 23 interaction checks, 1 index check); RUN-20261020-022 typecheck, lint and full suite (399 Node, 24 Python, upstream 406/1 skip, 2 injection). RUN-018 is superseded and RUN-019 failed source_changed because a Storybook build sat in the source tree; Storybook now builds into .local.
- **fix:** RUN-20261020-023 (isolated pipeline) failed at the foundation stage: scripts/verify-config.py pinned allowBuilds to an empty map, and RUN-20261020-022 had not run pnpm verify. The configuration contract now requires exactly the reviewed denial {esbuild: false}. RUN-20261020-024 (Chromium 150/150) and RUN-20261020-025 (configuration contract, typecheck, lint, full suite: 399 Node, 24 Python, upstream 406/1 skip, 2 injection) pass at the final fingerprint 686eb1c8.
- **test:** RUN-20261020-026: isolated pipeline passed all 15 stages (including the new design-system-browser stage) in 612 s with exact timing at fingerprint 686eb1c8.

### Verification

- **passed:** Design-system gates, superseded: the fingerprint included a Storybook build in the source tree. ([evidence](docs/validation/runs/RUN-20261020-018.json))
- **failed:** Chromium suite 150/150 but source_changed: the Storybook build in the source tree changed during the run. ([evidence](docs/validation/runs/RUN-20261020-019.json))
- **passed:** Design-system gates 30/30 at fingerprint 2255e8fb, before the configuration-contract fix. ([evidence](docs/validation/runs/RUN-20261020-020.json))
- **passed:** Design-system Chromium suite 150/150 at fingerprint 2255e8fb, before the configuration-contract fix. ([evidence](docs/validation/runs/RUN-20261020-021.json))
- **passed:** Workspace typecheck, lint and full test suite at fingerprint 2255e8fb, before the configuration-contract fix. ([evidence](docs/validation/runs/RUN-20261020-022.json))
- **failed:** Isolated pipeline: foundation stage failed at the workspace configuration contract (allowBuilds pinned empty). ([evidence](docs/validation/runs/RUN-20261020-023.json))
- **passed:** Design-system Chromium suite 150/150 at the final fingerprint. ([evidence](docs/validation/runs/RUN-20261020-024.json))
- **passed:** Configuration contract, typecheck, lint and full test suite at the final fingerprint. ([evidence](docs/validation/runs/RUN-20261020-025.json))
- **passed:** Isolated 15-stage pipeline at the final fingerprint in 612 s with exact timing: 484 Node (399 foundation + 85 database/live), 24 Python, upstream 406/1 skip, 2 injection, 13 web Chromium, 150 design-system Chromium, Lab workers, scans and artifacts. ([evidence](docs/validation/runs/RUN-20261020-026.json))
- **passed:** docs:check over this record and the updated documents (static). ([evidence](docs/validation/runs/RUN-20261020-027.json))

### Documentation and files

- **updated:** [AGENTS.md](AGENTS.md) — Dated UX-01 design-system status line after the PLAY-04 lines.
- **updated:** [README.md](README.md) — Same status line as AGENTS.md.
- **updated:** [docs/README.md](docs/README.md) — Same status line as AGENTS.md, with a relative link.
- **updated:** [apps/web/README.md](apps/web/README.md) — Dated section: DesignSystemProvider, token-only styling, fan-content notice and allowArbitraryExtensions.
- **updated:** [docs/FEATURES.md](docs/FEATURES.md) — New F-DESIGN-SYSTEM row; F-WEB row records the provider, components and notice instead of ActionButton.
- **updated:** [docs/HANDOFF.md](docs/HANDOFF.md) — Rewritten for the design-system checkpoint, evidence and next actions.
- **updated:** [docs/adr/0017-technical-design-system.md](docs/adr/0017-technical-design-system.md) — New ADR: token pipeline, components, enforcement, Storybook and browser evidence, fonts, dependencies and policy, interpretations, consequences.
- **updated:** [docs/archive/design-system-2026-10-12/README.md](docs/archive/design-system-2026-10-12/README.md) — New label for the preserved original design-system ZIP (historical evidence, superseded by the adopted standard).
- **updated:** [docs/archive/design-system-2026-10-12/the-inkspire-design-system.zip](docs/archive/design-system-2026-10-12/the-inkspire-design-system.zip) — Original 2026-10-12 design-system draft preserved byte-for-byte (sha256 add42af2...), as standard §35 requires.
- **updated:** [docs/documentation-map.json](docs/documentation-map.json) — Classifies the new ADR, runbook and validation record as current with their source edges, and docs/archive/** as archive. The shipped Source Sans 3 license text is classified as evidence (font provenance).
- **updated:** [docs/features.json](docs/features.json) — New verified F-DESIGN-SYSTEM with RUN-20261020-020/021/022; F-WEB description updated; every verified feature also cites RUN-20261020-022 (and the isolated pipeline at the final fingerprint).
- **updated:** [docs/policies/fan-content.md](docs/policies/fan-content.md) — Dated implementation note: FanContentNotice renders the exact notice with the subject The Inkspire, enforced by a test.
- **updated:** [docs/runbooks/ci.md](docs/runbooks/ci.md) — Dated section: the design-system-browser stage, decision D16 (CC-BY-4.0) and the esbuild build-script denial.
- **updated:** [docs/runbooks/design-system.md](docs/runbooks/design-system.md) — New runbook: use, token and component changes, raw-value exceptions, checks, fonts, lifecycle and limits.
- **updated:** [docs/validation/ux-design-system.md](docs/validation/ux-design-system.md) — New validation record: coverage of the standard by section, receipts, findings and limits.
- **updated:** [docs/vision/decision_register.csv](docs/vision/decision_register.csv) — New D16 (CC-BY-4.0 for Storybook build-time data) and D17 (standard adopted; amends D01 product name and D08 delivery priority; card fonts await a usage basis).
- **updated:** [docs/vision/initial_backlog.csv](docs/vision/initial_backlog.csv) — UX-01 standard adopted with reference screens pending; UX-03 implemented with Chromium verification and device/manual accessibility pending.
- **updated:** [docs/vision/requirements.csv](docs/vision/requirements.csv) — R25.001-R25.016 link UX-03 and the validation record as foundation contracts only; statuses stay planned_unverified/pending.
- **updated:** [packages/design-system/README.md](packages/design-system/README.md) — Rewritten for the tokens, foundation, components and checks.
- **updated:** [packages/design-system/src/assets/fonts/source-sans-3/LICENSE.md](packages/design-system/src/assets/fonts/source-sans-3/LICENSE.md) — Source Sans 3 3.052R SIL Open Font License 1.1, shipped with the font files (sha256 recorded in the font manifest).
- **updated:** [CHANGELOG.md](CHANGELOG.md) — Regenerated by docs sync.
- **updated:** [docs/current-state.json](docs/current-state.json) — Regenerated by docs sync.
- **reviewed_unchanged:** [docs/CHANGELOG_FORMAT.md](docs/CHANGELOG_FORMAT.md) — Reviewed against the design-system change: it makes no statement about design-system tokens, components, fonts, Storybook, the web diagnostic styling, the CI license allowlist or the new browser stage that this change contradicts.
- **reviewed_unchanged:** [docs/DEVELOPMENT_WORKFLOW.md](docs/DEVELOPMENT_WORKFLOW.md) — Reviewed against the design-system change: it makes no statement about design-system tokens, components, fonts, Storybook, the web diagnostic styling, the CI license allowlist or the new browser stage that this change contradicts.
- **reviewed_unchanged:** [docs/WORKSPACE_QUALIFICATION.md](docs/WORKSPACE_QUALIFICATION.md) — Toolchain and container baseline unchanged; new packages are pinned in the design-system workspace.
- **reviewed_unchanged:** [docs/adr/0001-local-development-environment.md](docs/adr/0001-local-development-environment.md) — Reviewed against the design-system change: it makes no statement about design-system tokens, components, fonts, Storybook, the web diagnostic styling, the CI license allowlist or the new browser stage that this change contradicts.
- **reviewed_unchanged:** [docs/adr/0002-application-foundation.md](docs/adr/0002-application-foundation.md) — Keeps design-system ownership in packages/design-system; consistent with ADR 0017, which builds on it.
- **reviewed_unchanged:** [docs/adr/0003-documentation-evidence.md](docs/adr/0003-documentation-evidence.md) — Reviewed against the design-system change: it makes no statement about design-system tokens, components, fonts, Storybook, the web diagnostic styling, the CI license allowlist or the new browser stage that this change contradicts.
- **reviewed_unchanged:** [docs/adr/0004-restricted-local-database.md](docs/adr/0004-restricted-local-database.md) — Reviewed against the design-system change: it makes no statement about design-system tokens, components, fonts, Storybook, the web diagnostic styling, the CI license allowlist or the new browser stage that this change contradicts.
- **reviewed_unchanged:** [docs/adr/0005-ci-artifact-qualification.md](docs/adr/0005-ci-artifact-qualification.md) — Artifact scope is unchanged (workspace dist only); the design-system dist now carries its own fonts and stylesheets.
- **reviewed_unchanged:** [docs/adr/0006-protocol-release-contracts.md](docs/adr/0006-protocol-release-contracts.md) — Reviewed against the design-system change: it makes no statement about design-system tokens, components, fonts, Storybook, the web diagnostic styling, the CI license allowlist or the new browser stage that this change contradicts.
- **reviewed_unchanged:** [docs/adr/0008-engine-placement-dependency-baseline.md](docs/adr/0008-engine-placement-dependency-baseline.md) — Dependency baseline unchanged in kind: every addition is a planned register version pinned in its owning workspace (ADR 0017).
- **reviewed_unchanged:** [docs/adr/0009-pinned-engine-qualification.md](docs/adr/0009-pinned-engine-qualification.md) — Reviewed against the design-system change: it makes no statement about design-system tokens, components, fonts, Storybook, the web diagnostic styling, the CI license allowlist or the new browser stage that this change contradicts.
- **reviewed_unchanged:** [docs/adr/0010-secure-randomness-replay.md](docs/adr/0010-secure-randomness-replay.md) — Reviewed against the design-system change: it makes no statement about design-system tokens, components, fonts, Storybook, the web diagnostic styling, the CI license allowlist or the new browser stage that this change contradicts.
- **reviewed_unchanged:** [docs/adr/0013-durable-synthetic-match-commands.md](docs/adr/0013-durable-synthetic-match-commands.md) — Reviewed against the design-system change: it makes no statement about design-system tokens, components, fonts, Storybook, the web diagnostic styling, the CI license allowlist or the new browser stage that this change contradicts.
- **reviewed_unchanged:** [docs/audits/2026-10-06-project-audit.md](docs/audits/2026-10-06-project-audit.md) — Reviewed against the design-system change: it makes no statement about design-system tokens, components, fonts, Storybook, the web diagnostic styling, the CI license allowlist or the new browser stage that this change contradicts.
- **reviewed_unchanged:** [docs/contracts/protocol.md](docs/contracts/protocol.md) — Reviewed against the design-system change: it makes no statement about design-system tokens, components, fonts, Storybook, the web diagnostic styling, the CI license allowlist or the new browser stage that this change contradicts.
- **reviewed_unchanged:** [docs/contracts/release.md](docs/contracts/release.md) — Release workspaces are unchanged; design-system component hashes change with its new build output.
- **reviewed_unchanged:** [docs/plans/2026-10-06-boot-02-database.md](docs/plans/2026-10-06-boot-02-database.md) — Reviewed against the design-system change: it makes no statement about design-system tokens, components, fonts, Storybook, the web diagnostic styling, the CI license allowlist or the new browser stage that this change contradicts.
- **reviewed_unchanged:** [docs/plans/2026-10-06-documentation-governance.md](docs/plans/2026-10-06-documentation-governance.md) — Reviewed against the design-system change: it makes no statement about design-system tokens, components, fonts, Storybook, the web diagnostic styling, the CI license allowlist or the new browser stage that this change contradicts.
- **reviewed_unchanged:** [docs/plans/2026-10-07-boot-03-ci.md](docs/plans/2026-10-07-boot-03-ci.md) — Reviewed against the design-system change: it makes no statement about design-system tokens, components, fonts, Storybook, the web diagnostic styling, the CI license allowlist or the new browser stage that this change contradicts.
- **reviewed_unchanged:** [docs/plans/2026-10-07-boot-05-contracts.md](docs/plans/2026-10-07-boot-05-contracts.md) — Reviewed against the design-system change: it makes no statement about design-system tokens, components, fonts, Storybook, the web diagnostic styling, the CI license allowlist or the new browser stage that this change contradicts.
- **reviewed_unchanged:** [docs/plans/2026-10-10-boot-04-decision-worksheet.md](docs/plans/2026-10-10-boot-04-decision-worksheet.md) — Reviewed against the design-system change: it makes no statement about design-system tokens, components, fonts, Storybook, the web diagnostic styling, the CI license allowlist or the new browser stage that this change contradicts.
- **reviewed_unchanged:** [docs/rules/README.md](docs/rules/README.md) — Reviewed against the design-system change: it makes no statement about design-system tokens, components, fonts, Storybook, the web diagnostic styling, the CI license allowlist or the new browser stage that this change contradicts.
- **reviewed_unchanged:** [docs/rules/source-specs-supplement.json](docs/rules/source-specs-supplement.json) — Reviewed against the design-system change: it makes no statement about design-system tokens, components, fonts, Storybook, the web diagnostic styling, the CI license allowlist or the new browser stage that this change contradicts.
- **reviewed_unchanged:** [docs/rules/source-specs.json](docs/rules/source-specs.json) — Reviewed against the design-system change: it makes no statement about design-system tokens, components, fonts, Storybook, the web diagnostic styling, the CI license allowlist or the new browser stage that this change contradicts.
- **reviewed_unchanged:** [docs/runbooks/database.md](docs/runbooks/database.md) — Reviewed against the design-system change: it makes no statement about design-system tokens, components, fonts, Storybook, the web diagnostic styling, the CI license allowlist or the new browser stage that this change contradicts.
- **reviewed_unchanged:** [docs/runbooks/engine.md](docs/runbooks/engine.md) — Reviewed against the design-system change: it makes no statement about design-system tokens, components, fonts, Storybook, the web diagnostic styling, the CI license allowlist or the new browser stage that this change contradicts.
- **reviewed_unchanged:** [docs/runbooks/match-commands.md](docs/runbooks/match-commands.md) — Reviewed against the design-system change: it makes no statement about design-system tokens, components, fonts, Storybook, the web diagnostic styling, the CI license allowlist or the new browser stage that this change contradicts.
- **reviewed_unchanged:** [docs/runbooks/workspace-setup.md](docs/runbooks/workspace-setup.md) — Setup steps unchanged; Storybook and the browser suite run through package scripts documented in the design-system runbook.
- **reviewed_unchanged:** [docs/schemas/card-certification.schema.json](docs/schemas/card-certification.schema.json) — Reviewed against the design-system change: it makes no statement about design-system tokens, components, fonts, Storybook, the web diagnostic styling, the CI license allowlist or the new browser stage that this change contradicts.
- **reviewed_unchanged:** [docs/schemas/change.schema.json](docs/schemas/change.schema.json) — Reviewed against the design-system change: it makes no statement about design-system tokens, components, fonts, Storybook, the web diagnostic styling, the CI license allowlist or the new browser stage that this change contradicts.
- **reviewed_unchanged:** [docs/schemas/documentation-map.schema.json](docs/schemas/documentation-map.schema.json) — Reviewed against the design-system change: it makes no statement about design-system tokens, components, fonts, Storybook, the web diagnostic styling, the CI license allowlist or the new browser stage that this change contradicts.
- **reviewed_unchanged:** [docs/schemas/features.schema.json](docs/schemas/features.schema.json) — Reviewed against the design-system change: it makes no statement about design-system tokens, components, fonts, Storybook, the web diagnostic styling, the CI license allowlist or the new browser stage that this change contradicts.
- **reviewed_unchanged:** [docs/schemas/run.schema.json](docs/schemas/run.schema.json) — Reviewed against the design-system change: it makes no statement about design-system tokens, components, fonts, Storybook, the web diagnostic styling, the CI license allowlist or the new browser stage that this change contradicts.
- **reviewed_unchanged:** [docs/schemas/state.schema.json](docs/schemas/state.schema.json) — Reviewed against the design-system change: it makes no statement about design-system tokens, components, fonts, Storybook, the web diagnostic styling, the CI license allowlist or the new browser stage that this change contradicts.
- **reviewed_unchanged:** [docs/templates/change.json](docs/templates/change.json) — Reviewed against the design-system change: it makes no statement about design-system tokens, components, fonts, Storybook, the web diagnostic styling, the CI license allowlist or the new browser stage that this change contradicts.
- **reviewed_unchanged:** [docs/templates/handoff.md](docs/templates/handoff.md) — Reviewed against the design-system change: it makes no statement about design-system tokens, components, fonts, Storybook, the web diagnostic styling, the CI license allowlist or the new browser stage that this change contradicts.
- **reviewed_unchanged:** [docs/validation/boot-01.md](docs/validation/boot-01.md) — Historical BOOT-01 evidence of the earlier diagnostic page; left unchanged as dated evidence, superseded for styling by ux-design-system.md.
- **reviewed_unchanged:** [docs/validation/boot-02.md](docs/validation/boot-02.md) — Reviewed against the design-system change: it makes no statement about design-system tokens, components, fonts, Storybook, the web diagnostic styling, the CI license allowlist or the new browser stage that this change contradicts.
- **reviewed_unchanged:** [docs/validation/boot-03.md](docs/validation/boot-03.md) — BOOT-03 pipeline evidence is historical; the new stage and license policy are recorded in docs/runbooks/ci.md and ADR 0017.
- **reviewed_unchanged:** [docs/validation/boot-04.md](docs/validation/boot-04.md) — Reviewed against the design-system change: it makes no statement about design-system tokens, components, fonts, Storybook, the web diagnostic styling, the CI license allowlist or the new browser stage that this change contradicts.
- **reviewed_unchanged:** [docs/validation/boot-05.md](docs/validation/boot-05.md) — Reviewed against the design-system change: it makes no statement about design-system tokens, components, fonts, Storybook, the web diagnostic styling, the CI license allowlist or the new browser stage that this change contradicts.
- **reviewed_unchanged:** [docs/validation/clock-investigation.md](docs/validation/clock-investigation.md) — Reviewed against the design-system change: it makes no statement about design-system tokens, components, fonts, Storybook, the web diagnostic styling, the CI license allowlist or the new browser stage that this change contradicts.
- **reviewed_unchanged:** [docs/validation/play-01.md](docs/validation/play-01.md) — Reviewed against the design-system change: it makes no statement about design-system tokens, components, fonts, Storybook, the web diagnostic styling, the CI license allowlist or the new browser stage that this change contradicts.
- **reviewed_unchanged:** [docs/validation/play-03.md](docs/validation/play-03.md) — Reviewed against the design-system change: it makes no statement about design-system tokens, components, fonts, Storybook, the web diagnostic styling, the CI license allowlist or the new browser stage that this change contradicts.
- **reviewed_unchanged:** [docs/validation/rule-01.md](docs/validation/rule-01.md) — Reviewed against the design-system change: it makes no statement about design-system tokens, components, fonts, Storybook, the web diagnostic styling, the CI license allowlist or the new browser stage that this change contradicts.
- **reviewed_unchanged:** [docs/validation/rule-02.md](docs/validation/rule-02.md) — Reviewed against the design-system change: it makes no statement about design-system tokens, components, fonts, Storybook, the web diagnostic styling, the CI license allowlist or the new browser stage that this change contradicts.
- **reviewed_unchanged:** [docs/validation/rule-03.md](docs/validation/rule-03.md) — Reviewed against the design-system change: it makes no statement about design-system tokens, components, fonts, Storybook, the web diagnostic styling, the CI license allowlist or the new browser stage that this change contradicts.
- **reviewed_unchanged:** [docs/vision/README.md](docs/vision/README.md) — Reviewed against the design-system change: it makes no statement about design-system tokens, components, fonts, Storybook, the web diagnostic styling, the CI license allowlist or the new browser stage that this change contradicts.
- **reviewed_unchanged:** [docs/vision/additional_scope.csv](docs/vision/additional_scope.csv) — Reviewed against the design-system change: it makes no statement about design-system tokens, components, fonts, Storybook, the web diagnostic styling, the CI license allowlist or the new browser stage that this change contradicts.
- **reviewed_unchanged:** [infra/README.md](infra/README.md) — Reviewed against the design-system change: it makes no statement about design-system tokens, components, fonts, Storybook, the web diagnostic styling, the CI license allowlist or the new browser stage that this change contradicts.
- **reviewed_unchanged:** [packages/engine-adapter/README.md](packages/engine-adapter/README.md) — Reviewed against the design-system change: it makes no statement about design-system tokens, components, fonts, Storybook, the web diagnostic styling, the CI license allowlist or the new browser stage that this change contradicts.
- **reviewed_unchanged:** [packages/engine-lab/README.md](packages/engine-lab/README.md) — Reviewed against the design-system change: it makes no statement about design-system tokens, components, fonts, Storybook, the web diagnostic styling, the CI license allowlist or the new browser stage that this change contradicts.
- **reviewed_unchanged:** [vendor/tcg-engines/README.md](vendor/tcg-engines/README.md) — Reviewed against the design-system change: it makes no statement about design-system tokens, components, fonts, Storybook, the web diagnostic styling, the CI license allowlist or the new browser stage that this change contradicts.

Full changed-file inventory: [record](docs/changes/CHG-20261020-004.json).

### Limits and next actions

- Chromium automation only; no Firefox, WebKit, real Safari, iPad, Android tablet, GPU or device evidence and no manual screen-reader journeys.
- Card-face font files are not imported (trial or unlicensed legacy files; public repository); card text falls back to Source Sans 3.
- In headless Linux Chromium the measured fallback matches line height within 1 px but differs about 4.5% in width because of FreeType hinting; real Windows/macOS behaviour needs UX-02.
- UX-01 reference screens and Director visual approval, UX-02 qualification, Interactive Card Viewer/CardFX, room screens and translated catalogs remain pending.
- React Aria's toast API is UNSTABLE_ in 1.21.1 and is isolated in one file.
- Push the branch, open a pull request and check the hosted Foundation run; main moves only at the Director's explicit request.
- Director: review the ADR 0017 interpretations and decide the card-font usage basis; then UX-01 reference screens (crowded match, deckbuilder, Collection binder, pack presentation).

## CHG-20261020-003 — PLAY-04 merged with D13: hosted runs recorded and decision D15 (paused concession stays a known limit)

- Status: finalized
- Actor: Claude Code agent (architect/QA reviewer role) on Director request, local WSL session
- Recorded (UTC): 2026-10-20T04:08:24.517Z
- Event: unknown; recorded retrospectively (recorded_only)
- Source: 9081192dc77d5e8b3d4b10dfbfd975d910081811
- Tasks: PLAY-04, DOC-01, DOC-02
- Features: F-DOCS, F-MATCH-CLOCKS
- Requirements: R29.006, R29.007

### Changes

- **documentation:** Recorded the hosted PR #2 run 39363468169 and main run 39365372435 (both attempt-1 successes at 9081192) and the Director's fast-forward of main from cda3b54 to 9081192, accepting PLAY-04's synthetic scope including D13. Recorded Director decision D15: a concession during a clock pause stays refused until an audited resume, as a known limit to revisit later. Updated the PLAY-04 validation record, game-clocks runbook, F-MATCH-CLOCKS entries, backlog status, status lines and handoff. Committed the Director's untracked UX/UI design system draft byte-for-byte and classified it as planning authority; adoption follows in the next change.

### Verification

- **passed:** Public GitHub metadata for the PR #2 and main runs at 9081192 (metadata only). ([evidence](docs/validation/runs/RUN-20261020-016.json))
- **passed:** docs:check over this record and the updated documents (static). ([evidence](docs/validation/runs/RUN-20261020-017.json))

### Documentation and files

- **updated:** [docs/vision/decision_register.csv](docs/vision/decision_register.csv) — New D15 row: the Director keeps the paused-concession gap as a known limit for now.
- **updated:** [docs/vision/initial_backlog.csv](docs/vision/initial_backlog.csv) — PLAY-04 status is synthetic acceptance with D13 audited, merged and hosted-passing; links this record.
- **updated:** [docs/validation/play-04.md](docs/validation/play-04.md) — Dated section: hosted merge runs, the main fast-forward and decision D15.
- **updated:** [docs/runbooks/game-clocks.md](docs/runbooks/game-clocks.md) — The paused-concession caution now cites decision D15.
- **updated:** [docs/features.json](docs/features.json) — F-MATCH-CLOCKS records the merge, hosted runs and D15; cites RUN-20261020-016.
- **updated:** [docs/FEATURES.md](docs/FEATURES.md) — F-MATCH-CLOCKS row records the merge and D15.
- **updated:** [AGENTS.md](AGENTS.md) — Dated sentence on the D13 audit line: hosted runs passed, PLAY-04 merged, D15.
- **updated:** [README.md](README.md) — Same update as AGENTS.md.
- **updated:** [docs/README.md](docs/README.md) — Same update as AGENTS.md.
- **updated:** [docs/HANDOFF.md](docs/HANDOFF.md) — Rewritten for the PLAY-04 closure and the UX-01 assignment.
- **updated:** [docs/vision/UX_UI_DESIGN_SYSTEM.md](docs/vision/UX_UI_DESIGN_SYSTEM.md) — The Director's UX/UI design system draft (1.0 review draft, dated 2026-10-13), committed byte-for-byte as supplied (sha256 000fd854d1f3b0dd8ba49ff0d3d5e9e4ff11c890ef7efee87aab05229f8eb6a8); its adoption is recorded in the next change.
- **updated:** [docs/documentation-map.json](docs/documentation-map.json) — Classifies docs/vision/UX_UI_DESIGN_SYSTEM.md as planning authority, like the blueprint.
- **updated:** [CHANGELOG.md](CHANGELOG.md) — Regenerated by docs sync.
- **updated:** [docs/current-state.json](docs/current-state.json) — Regenerated by docs sync.

Full changed-file inventory: [record](docs/changes/CHG-20261020-003.json).

### Limits and next actions

- Hosted runs are observed through public metadata; logs and artifacts were not downloaded.
- Adopt the UX/UI design standard and build the technical design system on this branch.

## CHG-20261020-002 — Hosted PR #2 run failed on a real-process clock test's join timing; test budget widened

- Status: finalized
- Actor: Claude Code agent (architect/QA reviewer role) on Director request, local WSL session
- Recorded (UTC): 2026-10-20T03:02:31.472Z
- Event: unknown; recorded retrospectively (recorded_only)
- Source: 3f134ade9fc0a4a29621e7385a044fc969d56e8e
- Tasks: PLAY-04, DOC-01, DOC-02
- Features: F-DOCS, F-MATCH-CLOCKS
- Requirements: R29.006, R29.007

### Changes

- **fix:** Hosted Foundation run 39359423680 on PR #2 (3f134ad) failed on both attempts in the live-matches stage: clock-process.test.mjs 'actual runner continues with zero clients and a fresh process joins a healthy owner without pausing' read 'processing' where it expects 'running'. A timeline replica shows a fresh process joins 0.8 s after p1's turn starts normally and 1.2-1.9 s on one CPU, against p1's 1.8 s budget; a read landing while the owner commits the timeout sees 'processing'. In every case the timeout committed, p2 became active and nothing stuck, so this is test timing, not a D13 defect. The test budget is widened to 4 s with the same assertions; on one CPU the join lands about 1.2 s in.
- **test:** RUN-20261020-011 repaired clock-process file on one CPU: 14 of 14 passed. RUN-20261020-012 typecheck, lint and full tests at fingerprint 72167125 passed (369 Node, 24 Python, upstream 406/1 skip, 2 injection). RUN-20261020-014 isolated pipeline passed all 14 stages in 534 s with exact timing and the same counts as RUN-20261020-009. RUN-20261020-013 records the two failed hosted attempts from public metadata.
- **documentation:** Dated PLAY-04 validation section for the hosted failure, diagnosis and repair; feature evidence re-bound to RUN-20261020-012/014; dated sentence on the audit status lines; backlog link; handoff.

### Verification

- **passed:** Repaired clock-process test file on a single CPU: 14 of 14 passed. ([evidence](docs/validation/runs/RUN-20261020-011.json))
- **passed:** Typecheck, ESLint plus boundaries and the full workspace tests at the new fingerprint. ([evidence](docs/validation/runs/RUN-20261020-012.json))
- **passed:** Public GitHub metadata for both failed attempts of run 39359423680 (metadata only). ([evidence](docs/validation/runs/RUN-20261020-013.json))
- **passed:** Isolated 14-stage pipeline at the new fingerprint with exact timing. ([evidence](docs/validation/runs/RUN-20261020-014.json))
- **passed:** docs:check over this record and the updated documents (static). ([evidence](docs/validation/runs/RUN-20261020-015.json))

### Documentation and files

- **updated:** [docs/validation/play-04.md](docs/validation/play-04.md) — New dated section: hosted run 39359423680 failed twice on the clock-process join timing, diagnosis, the 4 s budget repair and evidence.
- **updated:** [docs/features.json](docs/features.json) — Every verified feature also cites RUN-20261020-012 and the new-fingerprint isolated pipeline.
- **updated:** [docs/HANDOFF.md](docs/HANDOFF.md) — Updated for the hosted failure, test timing repair, evidence and next actions.
- **updated:** [AGENTS.md](AGENTS.md) — Dated sentence appended to the D13 audit line: hosted failure and the test timing repair.
- **updated:** [README.md](README.md) — Same update as AGENTS.md.
- **updated:** [docs/README.md](docs/README.md) — Same update as AGENTS.md.
- **updated:** [docs/vision/initial_backlog.csv](docs/vision/initial_backlog.csv) — PLAY-04 row links this record; status unchanged (hosted CI still pending).
- **updated:** [CHANGELOG.md](CHANGELOG.md) — Regenerated by docs sync.
- **updated:** [docs/current-state.json](docs/current-state.json) — Regenerated by docs sync.
- **reviewed_unchanged:** [apps/match-service/README.md](apps/match-service/README.md) — Makes no statement about the real-process clock test's time budget; unaffected by widening it from 1.8 s to 4 s with the same assertions.
- **reviewed_unchanged:** [docs/FEATURES.md](docs/FEATURES.md) — Makes no statement about the real-process clock test's time budget; unaffected by widening it from 1.8 s to 4 s with the same assertions.
- **reviewed_unchanged:** [docs/WORKSPACE_QUALIFICATION.md](docs/WORKSPACE_QUALIFICATION.md) — Makes no statement about the real-process clock test's time budget; unaffected by widening it from 1.8 s to 4 s with the same assertions.
- **reviewed_unchanged:** [docs/adr/0001-local-development-environment.md](docs/adr/0001-local-development-environment.md) — Makes no statement about the real-process clock test's time budget; unaffected by widening it from 1.8 s to 4 s with the same assertions.
- **reviewed_unchanged:** [docs/adr/0002-application-foundation.md](docs/adr/0002-application-foundation.md) — Makes no statement about the real-process clock test's time budget; unaffected by widening it from 1.8 s to 4 s with the same assertions.
- **reviewed_unchanged:** [docs/adr/0008-engine-placement-dependency-baseline.md](docs/adr/0008-engine-placement-dependency-baseline.md) — Makes no statement about the real-process clock test's time budget; unaffected by widening it from 1.8 s to 4 s with the same assertions.
- **reviewed_unchanged:** [docs/adr/0013-durable-synthetic-match-commands.md](docs/adr/0013-durable-synthetic-match-commands.md) — Makes no statement about the real-process clock test's time budget; unaffected by widening it from 1.8 s to 4 s with the same assertions.
- **reviewed_unchanged:** [docs/adr/0014-viewer-projection-privacy.md](docs/adr/0014-viewer-projection-privacy.md) — Makes no statement about the real-process clock test's time budget; unaffected by widening it from 1.8 s to 4 s with the same assertions.
- **reviewed_unchanged:** [docs/adr/0015-live-synthetic-transport.md](docs/adr/0015-live-synthetic-transport.md) — Makes no statement about the real-process clock test's time budget; unaffected by widening it from 1.8 s to 4 s with the same assertions.
- **reviewed_unchanged:** [docs/adr/0016-durable-engine-clocks.md](docs/adr/0016-durable-engine-clocks.md) — Makes no statement about the real-process clock test's time budget; unaffected by widening it from 1.8 s to 4 s with the same assertions.
- **reviewed_unchanged:** [docs/audits/2026-10-06-project-audit.md](docs/audits/2026-10-06-project-audit.md) — Makes no statement about the real-process clock test's time budget; unaffected by widening it from 1.8 s to 4 s with the same assertions.
- **reviewed_unchanged:** [docs/contracts/live.md](docs/contracts/live.md) — Makes no statement about the real-process clock test's time budget; unaffected by widening it from 1.8 s to 4 s with the same assertions.
- **reviewed_unchanged:** [docs/contracts/viewer.md](docs/contracts/viewer.md) — Makes no statement about the real-process clock test's time budget; unaffected by widening it from 1.8 s to 4 s with the same assertions.
- **reviewed_unchanged:** [docs/documentation-map.json](docs/documentation-map.json) — Makes no statement about the real-process clock test's time budget; unaffected by widening it from 1.8 s to 4 s with the same assertions.
- **reviewed_unchanged:** [docs/plans/2026-10-06-documentation-governance.md](docs/plans/2026-10-06-documentation-governance.md) — Makes no statement about the real-process clock test's time budget; unaffected by widening it from 1.8 s to 4 s with the same assertions.
- **reviewed_unchanged:** [docs/plans/2026-10-10-boot-04-decision-worksheet.md](docs/plans/2026-10-10-boot-04-decision-worksheet.md) — Makes no statement about the real-process clock test's time budget; unaffected by widening it from 1.8 s to 4 s with the same assertions.
- **reviewed_unchanged:** [docs/runbooks/game-clocks.md](docs/runbooks/game-clocks.md) — Makes no statement about the real-process clock test's time budget; unaffected by widening it from 1.8 s to 4 s with the same assertions.
- **reviewed_unchanged:** [docs/runbooks/live-matches.md](docs/runbooks/live-matches.md) — Makes no statement about the real-process clock test's time budget; unaffected by widening it from 1.8 s to 4 s with the same assertions.
- **reviewed_unchanged:** [docs/runbooks/match-commands.md](docs/runbooks/match-commands.md) — Makes no statement about the real-process clock test's time budget; unaffected by widening it from 1.8 s to 4 s with the same assertions.
- **reviewed_unchanged:** [docs/runbooks/viewer-privacy.md](docs/runbooks/viewer-privacy.md) — Makes no statement about the real-process clock test's time budget; unaffected by widening it from 1.8 s to 4 s with the same assertions.
- **reviewed_unchanged:** [docs/runbooks/workspace-setup.md](docs/runbooks/workspace-setup.md) — Makes no statement about the real-process clock test's time budget; unaffected by widening it from 1.8 s to 4 s with the same assertions.
- **reviewed_unchanged:** [docs/templates/change.json](docs/templates/change.json) — Makes no statement about the real-process clock test's time budget; unaffected by widening it from 1.8 s to 4 s with the same assertions.
- **reviewed_unchanged:** [docs/validation/boot-01.md](docs/validation/boot-01.md) — Makes no statement about the real-process clock test's time budget; unaffected by widening it from 1.8 s to 4 s with the same assertions.
- **reviewed_unchanged:** [docs/validation/boot-04.md](docs/validation/boot-04.md) — Makes no statement about the real-process clock test's time budget; unaffected by widening it from 1.8 s to 4 s with the same assertions.
- **reviewed_unchanged:** [docs/validation/play-01.md](docs/validation/play-01.md) — Makes no statement about the real-process clock test's time budget; unaffected by widening it from 1.8 s to 4 s with the same assertions.
- **reviewed_unchanged:** [docs/validation/play-02.md](docs/validation/play-02.md) — Makes no statement about the real-process clock test's time budget; unaffected by widening it from 1.8 s to 4 s with the same assertions.
- **reviewed_unchanged:** [docs/validation/play-03.md](docs/validation/play-03.md) — Makes no statement about the real-process clock test's time budget; unaffected by widening it from 1.8 s to 4 s with the same assertions.
- **reviewed_unchanged:** [docs/vision/README.md](docs/vision/README.md) — Makes no statement about the real-process clock test's time budget; unaffected by widening it from 1.8 s to 4 s with the same assertions.
- **reviewed_unchanged:** [docs/vision/additional_scope.csv](docs/vision/additional_scope.csv) — Makes no statement about the real-process clock test's time budget; unaffected by widening it from 1.8 s to 4 s with the same assertions.
- **reviewed_unchanged:** [docs/vision/decision_register.csv](docs/vision/decision_register.csv) — Makes no statement about the real-process clock test's time budget; unaffected by widening it from 1.8 s to 4 s with the same assertions.
- **reviewed_unchanged:** [docs/vision/requirements.csv](docs/vision/requirements.csv) — Makes no statement about the real-process clock test's time budget; unaffected by widening it from 1.8 s to 4 s with the same assertions.

Full changed-file inventory: [record](docs/changes/CHG-20261020-002.json).

### Limits and next actions

- The timeline replica that located the race was a diagnostic run and is not recorded; RUN-20261020-011 records the repaired test on one CPU.
- Hosted CI on the new head has not run at this checkpoint; no hosted pass is claimed.
- Push the audit branch and check the new hosted Foundation run on PR #2.
- Director decides on concessions during a clock pause and requests the main fast-forward once hosted CI passes.

## CHG-20261020-001 — Independent audit of PLAY-04 D13 (lint repair on the audit branch; paused concession for Director decision)

- Status: finalized
- Actor: Claude Code agent (architect/QA reviewer role) on Director request, local WSL session
- Recorded (UTC): 2026-10-20T02:26:14.784Z
- Event: unknown; recorded retrospectively (recorded_only)
- Source: 3704b322804524aab0f8bb14e51112313ddd05d2
- Tasks: PLAY-04, DOC-01, DOC-02
- Features: F-DOCS, F-MATCH-CLOCKS, F-BOUNDARIES
- Requirements: R29.006, R29.007

### Changes

- **review:** Independent audit of Codex commit 3704b32 (CHG-20261019-003) against the Director's D13 brief, the D13 clarification recorded 2026-10-19T17:45:54.053Z and D14. Reviewed the product diff from cda3b54: P060 (two opening validMoves additions, ledger and provenance); the bridge's timeout, forfeit and raised-count paths and its rollback; adapter logical revisions, transcript3/checkpoint2 replay and viewer endReason; clock-store concession admission at the deadline; the transition worker; contracts viewer2/clock2/live4 with retained legacy codecs; migration 0006; the match-client helpers; the Lab facade; and the decision register, ADR0016 and runbook updates. Verified rule 2.3.3.4 in both cached rulebooks against their recorded SHA-256 hashes.
- **test:** RUN-20261020-004 engine probe: 60 random games (9,243 commands; 1,645 of 1,648 accepted states equal to the raw runtime, the other 3 late opening decisions turned into timeout losses with equal state apart from the ending); 60 main-game timeouts equal the engine's own late pass in full state and events; limits 1-5 end on the limit-th timeout, consecutive or not; opening timeouts at all 3 steps under limits 1/3/10; 13 opening concession cases; forfeitGame refused SERVER_ONLY/MOVE_FORBIDDEN; controls never count; concession refused CLOCK_PAUSED while paused; replay of both endings verifies and 8 tampered archives are rejected. RUN-20261020-005/006 service probe on the test database with simulated UTC: opening and main-game timeout endings with one system receipt; a ten-minute outage pauses without charge or count and an audited resume keeps count 0; forged audits refused; player forfeitGame rejected/forbidden; waiting opening concessions unreserved and fenced; RUN006's 24 genuine deadline races (two processes' sweeps, both concessions, the active move) each end with exactly one result (15 timeout, 9 concession). RUN005's race section was degenerate because a warm-up tick fired the timeout first; it is kept as recorded. RUN-20261020-007 contract probe: viewer2/clock2/live4 invariants, legacy codec separation, pending3, forfeit intent refusal and client warning text.
- **fix:** Finding 1 (Important): 3704b32 fails pnpm lint with three no-useless-assignment errors in docs/validation/inputs/play04-d13-closure.mjs, the executed RUN-20261019-038 input added after RUN-20261019-037 (RUN-20261020-002). The source fingerprint excludes docs/ while ESLint lints that file, so RUN037's matching fingerprint did not cover it. Repaired with a one-file rule override in eslint.config.mjs, keeping the executed input byte-identical; every verified feature is re-bound to RUN-20261020-008 and RUN-20261020-009 at the new fingerprint.
- **test:** RUN-20261020-008 typecheck, lint and full workspace tests passed (369 Node, 24 Python, upstream 406 with 1 inherited skip, 2 injection). RUN-20261020-009 isolated pipeline passed all 14 stages in 528 s with exact timing, reproducing every Codex count: 85 database/storage/live, 13 Chromium, 2 general + 12 P060 Lab workers. RUN-20261020-003 (pipeline with the override before evidence re-binding) failed docs:check as expected.
- **documentation:** Recorded the audit in docs/validation/play-04.md with finding 2 (Minor, Director decision: a concession is refused while the clock is paused, for either player and every pause reason), confirmations, observations and runs; dated notes in ADR0016 and the game-clocks runbook; F-MATCH-CLOCKS entries; PLAY-04 backlog status; dated audit lines in AGENTS.md, README.md and docs/README.md; handoff.

### Verification

- **failed:** Isolated pipeline on 3704b32: foundation stage failed at ESLint (finding 1). ([evidence](docs/validation/runs/RUN-20261020-002.json))
- **failed:** Isolated pipeline with the ESLint override before evidence re-binding: docs:check refused the new fingerprint as expected. ([evidence](docs/validation/runs/RUN-20261020-003.json))
- **passed:** Engine probe sections A-I (Bun, no database). ([evidence](docs/validation/runs/RUN-20261020-004.json))
- **passed:** Service probe S1-S6 on the test database; race section degenerate (timeout fired before the race). ([evidence](docs/validation/runs/RUN-20261020-005.json))
- **passed:** Service probe rerun with 24 genuine deadline races. ([evidence](docs/validation/runs/RUN-20261020-006.json))
- **passed:** Public-contract probe. ([evidence](docs/validation/runs/RUN-20261020-007.json))
- **passed:** Audit-branch source: workspace typecheck, ESLint plus boundaries and the full workspace test suite. ([evidence](docs/validation/runs/RUN-20261020-008.json))
- **passed:** Isolated 14-stage pipeline at the audit fingerprint with exact timing. ([evidence](docs/validation/runs/RUN-20261020-009.json))
- **passed:** docs:check over this record and the updated documents (static). ([evidence](docs/validation/runs/RUN-20261020-010.json))

### Documentation and files

- **updated:** [docs/validation/play-04.md](docs/validation/play-04.md) — New dated section: independent D13 audit verdict, findings 1 (lint, repaired here) and 2 (paused concession, Director decision), confirmations, observations and runs.
- **updated:** [docs/features.json](docs/features.json) — Every verified feature also cites RUN-20261020-008 and the audit-fingerprint isolated pipeline; F-MATCH-CLOCKS description records the audit result.
- **updated:** [docs/FEATURES.md](docs/FEATURES.md) — F-MATCH-CLOCKS row records the independent D13 audit and the open paused-concession decision.
- **updated:** [docs/vision/initial_backlog.csv](docs/vision/initial_backlog.csv) — PLAY-04 status records the audited D13 source with hosted CI pending; links this record.
- **updated:** [docs/HANDOFF.md](docs/HANDOFF.md) — Rewritten for the audit state, evidence and next actions.
- **updated:** [AGENTS.md](AGENTS.md) — Dated audit line after the shared PLAY-04 D13 block; the block itself is Codex's and unchanged.
- **updated:** [README.md](README.md) — Same audit line as AGENTS.md.
- **updated:** [docs/README.md](docs/README.md) — Same audit line as AGENTS.md, with a relative link.
- **updated:** [docs/adr/0016-durable-engine-clocks.md](docs/adr/0016-durable-engine-clocks.md) — Dated audit note; the decision is unchanged and the paused-concession question is recorded as open.
- **updated:** [docs/runbooks/game-clocks.md](docs/runbooks/game-clocks.md) — Dated caution: a concession is refused while the clock is paused, pending the Director's decision.
- **updated:** [CHANGELOG.md](CHANGELOG.md) — Regenerated by docs sync.
- **updated:** [docs/current-state.json](docs/current-state.json) — Regenerated by docs sync.
- **reviewed_unchanged:** [docs/WORKSPACE_QUALIFICATION.md](docs/WORKSPACE_QUALIFICATION.md) — Makes no statement about ESLint rule scope for evidence input scripts; unaffected by the one-file no-useless-assignment override.
- **reviewed_unchanged:** [docs/adr/0001-local-development-environment.md](docs/adr/0001-local-development-environment.md) — Makes no statement about ESLint rule scope for evidence input scripts; unaffected by the one-file no-useless-assignment override.
- **reviewed_unchanged:** [docs/adr/0002-application-foundation.md](docs/adr/0002-application-foundation.md) — Makes no statement about ESLint rule scope for evidence input scripts; unaffected by the one-file no-useless-assignment override.
- **reviewed_unchanged:** [docs/audits/2026-10-06-project-audit.md](docs/audits/2026-10-06-project-audit.md) — Makes no statement about ESLint rule scope for evidence input scripts; unaffected by the one-file no-useless-assignment override.
- **reviewed_unchanged:** [docs/documentation-map.json](docs/documentation-map.json) — Makes no statement about ESLint rule scope for evidence input scripts; unaffected by the one-file no-useless-assignment override.
- **reviewed_unchanged:** [docs/plans/2026-10-06-documentation-governance.md](docs/plans/2026-10-06-documentation-governance.md) — Makes no statement about ESLint rule scope for evidence input scripts; unaffected by the one-file no-useless-assignment override.
- **reviewed_unchanged:** [docs/runbooks/workspace-setup.md](docs/runbooks/workspace-setup.md) — Makes no statement about ESLint rule scope for evidence input scripts; unaffected by the one-file no-useless-assignment override.
- **reviewed_unchanged:** [docs/templates/change.json](docs/templates/change.json) — Makes no statement about ESLint rule scope for evidence input scripts; unaffected by the one-file no-useless-assignment override.
- **reviewed_unchanged:** [docs/validation/boot-01.md](docs/validation/boot-01.md) — Makes no statement about ESLint rule scope for evidence input scripts; unaffected by the one-file no-useless-assignment override.
- **reviewed_unchanged:** [docs/vision/README.md](docs/vision/README.md) — Makes no statement about ESLint rule scope for evidence input scripts; unaffected by the one-file no-useless-assignment override.
- **reviewed_unchanged:** [docs/vision/additional_scope.csv](docs/vision/additional_scope.csv) — Makes no statement about ESLint rule scope for evidence input scripts; unaffected by the one-file no-useless-assignment override.
- **reviewed_unchanged:** [docs/vision/requirements.csv](docs/vision/requirements.csv) — Makes no statement about ESLint rule scope for evidence input scripts; unaffected by the one-file no-useless-assignment override.
- **reviewed_unchanged:** [docs/vision/decision_register.csv](docs/vision/decision_register.csv) — No new decision is recorded; the paused-concession question is open for the Director. D13/D14 rows were checked against the brief.

Full changed-file inventory: [record](docs/changes/CHG-20261020-001.json).

### Limits and next actions

- Probes use synthetic 12-card decks: a main-game limit above about 5 cannot be reached before the decks run out, so the forfeit path at limit 10 is untested beyond parsing and bounds.
- Service probes use injected simulated UTC on the real test database; live-wire behaviour is covered by Codex's suites as rerun in RUN-20261020-009, not by a separate reviewer live probe.
- Finding 2 (concession refused during a clock pause) is reported, not changed; it awaits the Director's decision.
- Hosted CI on the audit branch has not run at this checkpoint; no hosted result is claimed.
- Push the audit branch, open the pull request and check its hosted Foundation run.
- Director decides whether a concession is allowed during a clock pause (Codex follow-up) or recorded as a known limit, and requests the main fast-forward once hosted CI passes.
- Follow-up: make lint scope and source-fingerprint scope agree for evidence input scripts.

## CHG-20261019-003 — PLAY-04 D13 opening concessions and whole-game timeout losses

- Status: finalized
- Actor: Codex architect/developer/QA collaborator
- Recorded (UTC): 2026-10-20T01:14:07.039Z
- Event: unknown; recorded retrospectively (recorded_only)
- Source: cda3b549f0f9523475202011f52cc9091985ba9b
- Tasks: PLAY-04, DOC-01, DOC-02
- Features: F-MATCH-CLOCKS, F-ENGINE, F-MATCH-COMMANDS, F-VIEWER-PRIVACY, F-PROTOCOL, F-RELEASE, F-LIVE-TRANSPORT, F-MATCH-CLIENT, F-DB, F-DOCS, F-EVIDENCE, F-CI, F-BOUNDARIES
- Requirements: R02.030, R02.031, R29.006, R29.007, R30.010

### Changes

- **review:** Intake clean cda3b54 on admin branch, matching origin/main; local main remains4dea392. Create codex/play-04-d13 from exact requested cda3b54 without moving main. Existing workspace/healthy postgres/toolchain discovered from Windows through WSL; source stays Linux. Preserve private bytes/modes ignored0600. Director whole-game timeoutCount clarification supersedes old consecutive wording; D14 native restore retained.
- **implementation:** P060 opening concession repair, native whole-game timeout loss with judge-only derived forfeit, private transcript3/checkpoint2 logical atomic replay, viewer2/clock2/live4 exact legacy compatibility, migration0006 and browser result/warnings.
- **test:** Add RED matrices plus DB waiting/expiry/nonconsecutive-limit/replay/race, separate-process and Chromium/Lab proofs; retain intermediate failures.
- **documentation:** Record exact D13/D14 clarification and audit points; update current contracts/ADR/runbooks with dated historical evidence preserved. Final isolated pipeline, preservation and native documentation closure pass; canonical file/callable inventory, full receipt register and handoff are current.
- **fix:** Read-only review identified direct expired opening native-count handoffs below the main limit. RED025 reproduced all3; enforce first incident in startingAGame, preserve natural-terminal priority; GREEN028 validates. Update old migration/release/viewer fixture assertions; preserve every failure.
- **fix:** Bound transport viewer version selection before JSON parsing and sanitize errors for either closed legacy/current codec; RED031 retains the prior malformed-input failure. No wire shape or authority change.
- **feature:** Qualification timeoutWarning accepts validated boolean opening context from the authorized viewer turn0, warning before first opening expiry despite main limit3. RED034 and GREEN035 prove current client/Chromium/Lab behavior; product game UI remains WEB-02.
- **review:** Final source review has no remaining important finding after P2 repair and decoder/warning deltas. Final-source isolated14-stage pipeline passes exact timing,393project/406upstream/2injection/85DB/13Chromium/14Lab-worker probes, scans/artifacts/cleanup; fresh-copy proof and original private preservation pass. Independently audit before merge.

### Verification

- **passed:** D13 unchanged cda3b54 intake doctor verify bootstrap database; Node 1 pass/0 fail; Python blocks ['4']; Bun pass blocks []; Chromium pass blocks []; timing exact; failure_reason None. Source-specific; full native log is authoritative. ([evidence](docs/validation/runs/RUN-20261019-006.json))
- **failed:** RED D13 opening concession whole-game timeout counter loss policy replay regressions; Node 0 pass/34 fail; Python blocks []; Bun pass blocks []; Chromium pass blocks []; timing exact; failure_reason None. Source-specific; full native log is authoritative. ([evidence](docs/validation/runs/RUN-20261019-007.json))
- **failed:** RED D13 explicit live4 closed viewer clock revisions legacy compatibility pending and player forfeit refusal; Node 1 pass/2 fail; Python blocks []; Bun pass blocks []; Chromium pass blocks []; timing exact; failure_reason None. Source-specific; full native log is authoritative. ([evidence](docs/validation/runs/RUN-20261019-008.json))
- **failed:** First D13 bridge adapter contract build and focused new regressions; Node 0 pass/0 fail; Python blocks []; Bun pass blocks []; Chromium pass blocks []; timing exact; failure_reason None. Source-specific; full native log is authoritative. ([evidence](docs/validation/runs/RUN-20261019-009.json))
- **failed:** D13 focused contract bridge adapter build after viewer narrowing correction; Node 0 pass/0 fail; Python blocks []; Bun pass blocks []; Chromium pass blocks []; timing exact; failure_reason None. Source-specific; full native log is authoritative. ([evidence](docs/validation/runs/RUN-20261019-010.json))
- **passed:** D13 focused native kernel declaration adapter contract and opening timeout replay regression qualification; Node 36 pass/0 fail; Python blocks []; Bun pass blocks []; Chromium pass blocks []; timing exact; failure_reason None. Source-specific; full native log is authoritative. ([evidence](docs/validation/runs/RUN-20261019-011.json))
- **failed:** D13 complete owning package builds and strict application types after protocol4 integration; Node 0 pass/0 fail; Python blocks []; Bun pass blocks []; Chromium pass blocks []; timing exact; failure_reason None. Source-specific; full native log is authoritative. ([evidence](docs/validation/runs/RUN-20261019-012.json))
- **failed:** D13 owning builds strict web types reviewed migration0006 local and test application; Node 0 pass/0 fail; Python blocks []; Bun pass blocks []; Chromium pass blocks []; timing exact; failure_reason None. Source-specific; full native log is authoritative. ([evidence](docs/validation/runs/RUN-20261019-013.json))
- **passed:** D13 owning package builds, browser type check and append-only protocol migration; Node 0 pass/0 fail; Python blocks []; Bun pass blocks []; Chromium pass blocks []; timing exact; failure_reason None. Source-specific; full native log is authoritative. ([evidence](docs/validation/runs/RUN-20261019-014.json))
- **failed:** D13 current client and database clock orchestration regressions; Node 0 pass/1 fail; Python blocks []; Bun pass blocks []; Chromium pass blocks []; timing exact; failure_reason interrupted. Source-specific; full native log is authoritative. ([evidence](docs/validation/runs/RUN-20261019-015.json))
- **failed:** D13 corrected release admission and focused clock, client and live regressions; Node 13 pass/18 fail; Python blocks []; Bun pass blocks []; Chromium pass blocks []; timing exact; failure_reason None. Source-specific; full native log is authoritative. ([evidence](docs/validation/runs/RUN-20261019-016.json))
- **passed:** D13 database version-fence repair and clock service regressions; Node 15 pass/0 fail; Python blocks []; Bun pass blocks []; Chromium pass blocks []; timing exact; failure_reason None. Source-specific; full native log is authoritative. ([evidence](docs/validation/runs/RUN-20261019-017.json))
- **failed:** D13 full match database/live suite and current browser type check; Node 0 pass/0 fail; Python blocks []; Bun pass blocks []; Chromium pass blocks []; timing exact; failure_reason None. Source-specific; full native log is authoritative. ([evidence](docs/validation/runs/RUN-20261019-018.json))
- **failed:** D13 full match database/live suite after current protocol migration; Node 0 pass/0 fail; Python blocks []; Bun pass blocks []; Chromium pass blocks []; timing exact; failure_reason None. Source-specific; full native log is authoritative. ([evidence](docs/validation/runs/RUN-20261019-019.json))
- **failed:** D13 full match database/live regressions, closed typed browser fixture; Node 79 pass/1 fail; Python blocks []; Bun pass blocks []; Chromium pass blocks []; timing exact; failure_reason None. Source-specific; full native log is authoritative. ([evidence](docs/validation/runs/RUN-20261019-020.json))
- **failed:** D13 Chromium opening concession matrix, warning/result and native Lab workers; Node 0 pass/0 fail; Python blocks []; Bun pass blocks []; Chromium pass blocks ['12']; timing exact; failure_reason None. Source-specific; full native log is authoritative. ([evidence](docs/validation/runs/RUN-20261019-021.json))
- **passed:** P060 exact vendor integrity, unchanged original upstream suites and injection checks; Node 36 pass/0 fail; Python blocks []; Bun pass blocks ['406', '2']; Chromium pass blocks []; timing exact; failure_reason None. Source-specific; full native log is authoritative. ([evidence](docs/validation/runs/RUN-20261019-022.json))
- **failed:** D13 draft governance synchronization and complete foundation qualification; Node 0 pass/0 fail; Python blocks []; Bun pass blocks []; Chromium pass blocks []; timing exact; failure_reason None. Source-specific; full native log is authoritative. ([evidence](docs/validation/runs/RUN-20261019-023.json))
- **failed:** D13 current complete foundation after draft documentation synchronization; Node 26 pass/1 fail; Python blocks ['4']; Bun pass blocks ['406', '2']; Chromium pass blocks []; timing exact; failure_reason None. Source-specific; full native log is authoritative. ([evidence](docs/validation/runs/RUN-20261019-024.json))
- **failed:** Review RED: direct expired opening decisions must lose at the first native timeout count; Node 0 pass/3 fail; Python blocks []; Bun pass blocks []; Chromium pass blocks []; timing exact; failure_reason None. Source-specific; full native log is authoritative. ([evidence](docs/validation/runs/RUN-20261019-025.json))
- **failed:** Review GREEN: expired opening incident, natural-terminal precedence and all D13 adapter regressions; Node 39 pass/1 fail; Python blocks []; Bun pass blocks []; Chromium pass blocks []; timing exact; failure_reason None. Source-specific; full native log is authoritative. ([evidence](docs/validation/runs/RUN-20261019-026.json))
- **failed:** Review correction GREEN: native opening-count loss and natural terminal precedence; Node 39 pass/1 fail; Python blocks []; Bun pass blocks []; Chromium pass blocks []; timing exact; failure_reason None. Source-specific; full native log is authoritative. ([evidence](docs/validation/runs/RUN-20261019-027.json))
- **passed:** Review GREEN: all opening native-count paths and existing own-empty-deck terminal precedence; Node 40 pass/0 fail; Python blocks []; Bun pass blocks []; Chromium pass blocks []; timing exact; failure_reason None. Source-specific; full native log is authoritative. ([evidence](docs/validation/runs/RUN-20261019-028.json))
- **failed:** D13 full foundation on reviewed and corrected native opening policy; Node 147 pass/1 fail; Python blocks ['4']; Bun pass blocks ['406', '2']; Chromium pass blocks []; timing exact; failure_reason None. Source-specific; full native log is authoritative. ([evidence](docs/validation/runs/RUN-20261019-029.json))
- **passed:** D13 final-source foundation with all revised opening worker and protocol fixtures; Node 368 pass/0 fail; Python blocks ['4', '10', '10']; Bun pass blocks ['406', '2']; Chromium pass blocks []; timing exact; failure_reason None. Source-specific; full native log is authoritative. ([evidence](docs/validation/runs/RUN-20261019-030.json))
- **failed:** RED transport-viewer version selection must bound input and emit only generic errors; Node 0 pass/1 fail; Python blocks []; Bun pass blocks []; Chromium pass blocks []; timing exact; failure_reason None. Source-specific; full native log is authoritative. ([evidence](docs/validation/runs/RUN-20261019-031.json))
- **passed:** D13 final foundation with bounded current/legacy viewer dispatch; Node 369 pass/0 fail; Python blocks ['4', '10', '10']; Bun pass blocks ['406', '2']; Chromium pass blocks []; timing exact; failure_reason None. Source-specific; full native log is authoritative. ([evidence](docs/validation/runs/RUN-20261019-032.json))
- **passed:** D13 final doctor/bootstrap/database health and full real database/live/process regressions; Node 86 pass/0 fail; Python blocks ['4']; Bun pass blocks []; Chromium pass blocks []; timing exact; failure_reason None. Source-specific; full native log is authoritative. ([evidence](docs/validation/runs/RUN-20261019-033.json))
- **failed:** RED qualification warning must precede the first opening timeout despite main limit three; Node 0 pass/1 fail; Python blocks []; Bun pass blocks []; Chromium pass blocks []; timing exact; failure_reason None. Source-specific; full native log is authoritative. ([evidence](docs/validation/runs/RUN-20261019-034.json))
- **passed:** D13 final current client, Chromium results/opening warning matrix and Lab worker regressions; Node 13 pass/0 fail; Python blocks []; Bun pass blocks []; Chromium pass blocks ['13']; timing exact; failure_reason None. Source-specific; full native log is authoritative. Lab workers: 2 general + 12 P060 opening probes. ([evidence](docs/validation/runs/RUN-20261019-035.json))
- **passed:** D13 fresh source-only frozen offline install and root typecheck without app output, following RUN-20261016-008; Node 0 pass/0 fail; Python blocks []; Bun pass blocks []; Chromium pass blocks []; timing exact; failure_reason None. Source-specific; full native log is authoritative. Frozen source-only copy has no match-service dist before or after typecheck. ([evidence](docs/validation/runs/RUN-20261019-036.json))
- **passed:** Actual isolated BOOT-03 pipeline: frozen foundation, live PostgreSQL, Linux browser, dependency/secret scans and artifacts; Node 454 pass/0 fail; Python blocks ['4', '10', '10']; Bun pass blocks ['406', '2']; Chromium pass blocks ['13']; timing exact; failure_reason None. Source-specific; full native log is authoritative. All 14 isolated stages passed at final fingerprint 342f3801a578dcf4f469019a5020b83d682356ea3d6f4f0f351bcb4817ce6fd2: 393 project checks (369 Node+24 Python), 406 unchanged upstream/1 inherited skip, 2 injection, 85 DB/storage/live, 13 Chromium and 14 Lab-worker probes; exact 526342 ms. Sanitized artifacts generated and owned isolated resources cleaned. ([evidence](docs/validation/runs/RUN-20261019-037.json))
- **passed:** D13 final private preservation, exact P060/SQL provenance and owned fixture/listener cleanup; Node 0 pass/0 fail; Python blocks []; Bun pass blocks []; Chromium pass blocks []; timing exact; failure_reason None. Source-specific; full native log is authoritative. Original private bytes/0600 modes/ignores and main unchanged; P060-only upstream and original provenance, SQL0001..0005 unchanged; 1 exact owned interrupted fixture and 38 unused owned releases reclaimed; test matches/quota0; ports free. ([evidence](docs/validation/runs/RUN-20261019-038.json))
- **passed:** Final canonical docs:sync/docs:check and cumulative whitespace validation; coverage/fingerprints/callables/links/changelog/evidence consistency passes at unchanged final executable fingerprint. Exact timing, no clock discontinuity. No test cases are counted for this documentation-only gate. ([evidence](docs/validation/runs/RUN-20261020-001.json))

### Documentation and files

- **updated:** [AGENTS.md](AGENTS.md) — Updated current D13 behavior, versions, qualification and handoff; earlier dated evidence remains explicitly historical/source-specific.
- **updated:** [README.md](README.md) — Updated current D13 behavior, versions, qualification and handoff; earlier dated evidence remains explicitly historical/source-specific.
- **reviewed_unchanged:** [apps/api/README.md](apps/api/README.md) — Reviewed impact: no change to this document's owning bootstrap/provider/privacy/rules/governance contract or immutable source inventory; D13 outcomes/versions are defined by current clock/contract documents.
- **updated:** [apps/match-service/README.md](apps/match-service/README.md) — Updated current D13 behavior, versions, qualification and handoff; earlier dated evidence remains explicitly historical/source-specific.
- **updated:** [apps/web/README.md](apps/web/README.md) — Updated current D13 behavior, versions, qualification and handoff; earlier dated evidence remains explicitly historical/source-specific.
- **reviewed_unchanged:** [apps/worker/README.md](apps/worker/README.md) — Reviewed impact: no change to this document's owning bootstrap/provider/privacy/rules/governance contract or immutable source inventory; D13 outcomes/versions are defined by current clock/contract documents.
- **reviewed_unchanged:** [docs/CHANGELOG_FORMAT.md](docs/CHANGELOG_FORMAT.md) — Reviewed impact: no change to this document's owning bootstrap/provider/privacy/rules/governance contract or immutable source inventory; D13 outcomes/versions are defined by current clock/contract documents.
- **reviewed_unchanged:** [docs/DEVELOPMENT_WORKFLOW.md](docs/DEVELOPMENT_WORKFLOW.md) — Reviewed impact: no change to this document's owning bootstrap/provider/privacy/rules/governance contract or immutable source inventory; D13 outcomes/versions are defined by current clock/contract documents.
- **updated:** [docs/FEATURES.md](docs/FEATURES.md) — Updated current D13 behavior, versions, qualification and handoff; earlier dated evidence remains explicitly historical/source-specific.
- **updated:** [docs/HANDOFF.md](docs/HANDOFF.md) — Updated current D13 behavior, versions, qualification and handoff; earlier dated evidence remains explicitly historical/source-specific.
- **updated:** [docs/README.md](docs/README.md) — Updated current D13 behavior, versions, qualification and handoff; earlier dated evidence remains explicitly historical/source-specific.
- **updated:** [docs/WORKSPACE_QUALIFICATION.md](docs/WORKSPACE_QUALIFICATION.md) — Updated current D13 behavior, versions, qualification and handoff; earlier dated evidence remains explicitly historical/source-specific.
- **reviewed_unchanged:** [docs/adr/0001-local-development-environment.md](docs/adr/0001-local-development-environment.md) — Reviewed impact: no change to this document's owning bootstrap/provider/privacy/rules/governance contract or immutable source inventory; D13 outcomes/versions are defined by current clock/contract documents.
- **reviewed_unchanged:** [docs/adr/0002-application-foundation.md](docs/adr/0002-application-foundation.md) — Reviewed impact: no change to this document's owning bootstrap/provider/privacy/rules/governance contract or immutable source inventory; D13 outcomes/versions are defined by current clock/contract documents.
- **reviewed_unchanged:** [docs/adr/0003-documentation-evidence.md](docs/adr/0003-documentation-evidence.md) — Reviewed impact: no change to this document's owning bootstrap/provider/privacy/rules/governance contract or immutable source inventory; D13 outcomes/versions are defined by current clock/contract documents.
- **reviewed_unchanged:** [docs/audits/2026-10-06-project-audit.md](docs/audits/2026-10-06-project-audit.md) — Reviewed impact: no change to this document's owning bootstrap/provider/privacy/rules/governance contract or immutable source inventory; D13 outcomes/versions are defined by current clock/contract documents.
- **updated:** [docs/documentation-map.json](docs/documentation-map.json) — Updated current D13 behavior, versions, qualification and handoff; earlier dated evidence remains explicitly historical/source-specific.
- **updated:** [docs/features.json](docs/features.json) — Updated current D13 behavior, versions, qualification and handoff; earlier dated evidence remains explicitly historical/source-specific.
- **reviewed_unchanged:** [docs/plans/2026-10-06-documentation-governance.md](docs/plans/2026-10-06-documentation-governance.md) — Reviewed impact: no change to this document's owning bootstrap/provider/privacy/rules/governance contract or immutable source inventory; D13 outcomes/versions are defined by current clock/contract documents.
- **reviewed_unchanged:** [docs/runbooks/workspace-setup.md](docs/runbooks/workspace-setup.md) — Reviewed impact: no change to this document's owning bootstrap/provider/privacy/rules/governance contract or immutable source inventory; D13 outcomes/versions are defined by current clock/contract documents.
- **reviewed_unchanged:** [docs/templates/change.json](docs/templates/change.json) — Reviewed impact: no change to this document's owning bootstrap/provider/privacy/rules/governance contract or immutable source inventory; D13 outcomes/versions are defined by current clock/contract documents.
- **reviewed_unchanged:** [docs/templates/handoff.md](docs/templates/handoff.md) — Reviewed impact: no change to this document's owning bootstrap/provider/privacy/rules/governance contract or immutable source inventory; D13 outcomes/versions are defined by current clock/contract documents.
- **reviewed_unchanged:** [docs/validation/boot-01.md](docs/validation/boot-01.md) — Reviewed impact: no change to this document's owning bootstrap/provider/privacy/rules/governance contract or immutable source inventory; D13 outcomes/versions are defined by current clock/contract documents.
- **reviewed_unchanged:** [docs/vision/README.md](docs/vision/README.md) — Reviewed impact: no change to this document's owning bootstrap/provider/privacy/rules/governance contract or immutable source inventory; D13 outcomes/versions are defined by current clock/contract documents.
- **reviewed_unchanged:** [docs/vision/additional_scope.csv](docs/vision/additional_scope.csv) — Reviewed impact: no change to this document's owning bootstrap/provider/privacy/rules/governance contract or immutable source inventory; D13 outcomes/versions are defined by current clock/contract documents.
- **updated:** [docs/vision/decision_register.csv](docs/vision/decision_register.csv) — Updated current D13 behavior, versions, qualification and handoff; earlier dated evidence remains explicitly historical/source-specific.
- **updated:** [docs/vision/initial_backlog.csv](docs/vision/initial_backlog.csv) — Updated current D13 behavior, versions, qualification and handoff; earlier dated evidence remains explicitly historical/source-specific.
- **reviewed_unchanged:** [docs/vision/requirements.csv](docs/vision/requirements.csv) — Reviewed impact: no change to this document's owning bootstrap/provider/privacy/rules/governance contract or immutable source inventory; D13 outcomes/versions are defined by current clock/contract documents.
- **reviewed_unchanged:** [infra/README.md](infra/README.md) — Reviewed impact: no change to this document's owning bootstrap/provider/privacy/rules/governance contract or immutable source inventory; D13 outcomes/versions are defined by current clock/contract documents.
- **updated:** [packages/contracts/README.md](packages/contracts/README.md) — Updated current D13 behavior, versions, qualification and handoff; earlier dated evidence remains explicitly historical/source-specific.
- **updated:** [packages/db/README.md](packages/db/README.md) — Updated current D13 behavior, versions, qualification and handoff; earlier dated evidence remains explicitly historical/source-specific.
- **reviewed_unchanged:** [packages/design-system/README.md](packages/design-system/README.md) — Reviewed impact: no change to this document's owning bootstrap/provider/privacy/rules/governance contract or immutable source inventory; D13 outcomes/versions are defined by current clock/contract documents.
- **updated:** [packages/engine-adapter/README.md](packages/engine-adapter/README.md) — Updated current D13 behavior, versions, qualification and handoff; earlier dated evidence remains explicitly historical/source-specific.
- **reviewed_unchanged:** [packages/presentation/README.md](packages/presentation/README.md) — Reviewed impact: no change to this document's owning bootstrap/provider/privacy/rules/governance contract or immutable source inventory; D13 outcomes/versions are defined by current clock/contract documents.
- **reviewed_unchanged:** [packages/service-runtime/README.md](packages/service-runtime/README.md) — Reviewed impact: no change to this document's owning bootstrap/provider/privacy/rules/governance contract or immutable source inventory; D13 outcomes/versions are defined by current clock/contract documents.
- **updated:** [vendor/tcg-engines/README.md](vendor/tcg-engines/README.md) — Updated current D13 behavior, versions, qualification and handoff; earlier dated evidence remains explicitly historical/source-specific.
- **reviewed_unchanged:** [docs/plans/2026-10-06-boot-02-database.md](docs/plans/2026-10-06-boot-02-database.md) — Reviewed impact: no change to this document's owning bootstrap/provider/privacy/rules/governance contract or immutable source inventory; D13 outcomes/versions are defined by current clock/contract documents.
- **reviewed_unchanged:** [docs/adr/0004-restricted-local-database.md](docs/adr/0004-restricted-local-database.md) — Reviewed impact: no change to this document's owning bootstrap/provider/privacy/rules/governance contract or immutable source inventory; D13 outcomes/versions are defined by current clock/contract documents.
- **updated:** [docs/runbooks/database.md](docs/runbooks/database.md) — Updated current D13 behavior, versions, qualification and handoff; earlier dated evidence remains explicitly historical/source-specific.
- **updated:** [docs/validation/boot-02.md](docs/validation/boot-02.md) — Updated current D13 behavior, versions, qualification and handoff; earlier dated evidence remains explicitly historical/source-specific.
- **reviewed_unchanged:** [docs/plans/2026-10-07-boot-03-ci.md](docs/plans/2026-10-07-boot-03-ci.md) — Reviewed impact: no change to this document's owning bootstrap/provider/privacy/rules/governance contract or immutable source inventory; D13 outcomes/versions are defined by current clock/contract documents.
- **reviewed_unchanged:** [docs/adr/0005-ci-artifact-qualification.md](docs/adr/0005-ci-artifact-qualification.md) — Reviewed impact: no change to this document's owning bootstrap/provider/privacy/rules/governance contract or immutable source inventory; D13 outcomes/versions are defined by current clock/contract documents.
- **reviewed_unchanged:** [docs/runbooks/ci.md](docs/runbooks/ci.md) — Reviewed impact: no change to this document's owning bootstrap/provider/privacy/rules/governance contract or immutable source inventory; D13 outcomes/versions are defined by current clock/contract documents.
- **reviewed_unchanged:** [docs/validation/boot-03.md](docs/validation/boot-03.md) — Reviewed impact: no change to this document's owning bootstrap/provider/privacy/rules/governance contract or immutable source inventory; D13 outcomes/versions are defined by current clock/contract documents.
- **reviewed_unchanged:** [docs/plans/2026-10-07-boot-05-contracts.md](docs/plans/2026-10-07-boot-05-contracts.md) — Reviewed impact: no change to this document's owning bootstrap/provider/privacy/rules/governance contract or immutable source inventory; D13 outcomes/versions are defined by current clock/contract documents.
- **updated:** [docs/contracts/protocol.md](docs/contracts/protocol.md) — Updated current D13 behavior, versions, qualification and handoff; earlier dated evidence remains explicitly historical/source-specific.
- **updated:** [docs/contracts/release.md](docs/contracts/release.md) — Updated current D13 behavior, versions, qualification and handoff; earlier dated evidence remains explicitly historical/source-specific.
- **reviewed_unchanged:** [docs/validation/boot-05.md](docs/validation/boot-05.md) — Reviewed impact: no change to this document's owning bootstrap/provider/privacy/rules/governance contract or immutable source inventory; D13 outcomes/versions are defined by current clock/contract documents.
- **reviewed_unchanged:** [docs/adr/0006-protocol-release-contracts.md](docs/adr/0006-protocol-release-contracts.md) — Reviewed impact: no change to this document's owning bootstrap/provider/privacy/rules/governance contract or immutable source inventory; D13 outcomes/versions are defined by current clock/contract documents.
- **reviewed_unchanged:** [docs/adr/0007-hosting-provider-baseline.md](docs/adr/0007-hosting-provider-baseline.md) — Reviewed impact: no change to this document's owning bootstrap/provider/privacy/rules/governance contract or immutable source inventory; D13 outcomes/versions are defined by current clock/contract documents.
- **reviewed_unchanged:** [docs/adr/0008-engine-placement-dependency-baseline.md](docs/adr/0008-engine-placement-dependency-baseline.md) — Reviewed impact: no change to this document's owning bootstrap/provider/privacy/rules/governance contract or immutable source inventory; D13 outcomes/versions are defined by current clock/contract documents.
- **reviewed_unchanged:** [docs/plans/2026-10-10-boot-04-decision-worksheet.md](docs/plans/2026-10-10-boot-04-decision-worksheet.md) — Reviewed impact: no change to this document's owning bootstrap/provider/privacy/rules/governance contract or immutable source inventory; D13 outcomes/versions are defined by current clock/contract documents.
- **reviewed_unchanged:** [docs/policies/fan-content.md](docs/policies/fan-content.md) — Reviewed impact: no change to this document's owning bootstrap/provider/privacy/rules/governance contract or immutable source inventory; D13 outcomes/versions are defined by current clock/contract documents.
- **reviewed_unchanged:** [docs/validation/boot-04.md](docs/validation/boot-04.md) — Reviewed impact: no change to this document's owning bootstrap/provider/privacy/rules/governance contract or immutable source inventory; D13 outcomes/versions are defined by current clock/contract documents.
- **reviewed_unchanged:** [docs/rules/README.md](docs/rules/README.md) — Reviewed impact: no change to this document's owning bootstrap/provider/privacy/rules/governance contract or immutable source inventory; D13 outcomes/versions are defined by current clock/contract documents.
- **reviewed_unchanged:** [docs/rules/source-specs-supplement.json](docs/rules/source-specs-supplement.json) — Reviewed impact: no change to this document's owning bootstrap/provider/privacy/rules/governance contract or immutable source inventory; D13 outcomes/versions are defined by current clock/contract documents.
- **reviewed_unchanged:** [docs/rules/source-specs.json](docs/rules/source-specs.json) — Reviewed impact: no change to this document's owning bootstrap/provider/privacy/rules/governance contract or immutable source inventory; D13 outcomes/versions are defined by current clock/contract documents.
- **reviewed_unchanged:** [docs/validation/rule-01.md](docs/validation/rule-01.md) — Reviewed impact: no change to this document's owning bootstrap/provider/privacy/rules/governance contract or immutable source inventory; D13 outcomes/versions are defined by current clock/contract documents.
- **updated:** [packages/engine-lab/README.md](packages/engine-lab/README.md) — Updated current D13 behavior, versions, qualification and handoff; earlier dated evidence remains explicitly historical/source-specific.
- **updated:** [docs/runbooks/engine.md](docs/runbooks/engine.md) — Updated current D13 behavior, versions, qualification and handoff; earlier dated evidence remains explicitly historical/source-specific.
- **reviewed_unchanged:** [docs/validation/rule-02.md](docs/validation/rule-02.md) — Reviewed impact: no change to this document's owning bootstrap/provider/privacy/rules/governance contract or immutable source inventory; D13 outcomes/versions are defined by current clock/contract documents.
- **reviewed_unchanged:** [docs/adr/0009-pinned-engine-qualification.md](docs/adr/0009-pinned-engine-qualification.md) — Reviewed impact: no change to this document's owning bootstrap/provider/privacy/rules/governance contract or immutable source inventory; D13 outcomes/versions are defined by current clock/contract documents.
- **updated:** [docs/adr/0010-secure-randomness-replay.md](docs/adr/0010-secure-randomness-replay.md) — Updated current D13 behavior, versions, qualification and handoff; earlier dated evidence remains explicitly historical/source-specific.
- **updated:** [docs/validation/rule-03.md](docs/validation/rule-03.md) — Updated current D13 behavior, versions, qualification and handoff; earlier dated evidence remains explicitly historical/source-specific.
- **reviewed_unchanged:** [docs/templates/card-certification.json](docs/templates/card-certification.json) — Reviewed impact: no change to this document's owning bootstrap/provider/privacy/rules/governance contract or immutable source inventory; D13 outcomes/versions are defined by current clock/contract documents.
- **reviewed_unchanged:** [docs/adr/0011-sourced-rule-scenarios.md](docs/adr/0011-sourced-rule-scenarios.md) — Reviewed impact: no change to this document's owning bootstrap/provider/privacy/rules/governance contract or immutable source inventory; D13 outcomes/versions are defined by current clock/contract documents.
- **reviewed_unchanged:** [docs/runbooks/rules-certification.md](docs/runbooks/rules-certification.md) — Reviewed impact: no change to this document's owning bootstrap/provider/privacy/rules/governance contract or immutable source inventory; D13 outcomes/versions are defined by current clock/contract documents.
- **reviewed_unchanged:** [docs/validation/rule-04.md](docs/validation/rule-04.md) — Reviewed impact: no change to this document's owning bootstrap/provider/privacy/rules/governance contract or immutable source inventory; D13 outcomes/versions are defined by current clock/contract documents.
- **updated:** [docs/adr/0012-upstream-kernel-refresh.md](docs/adr/0012-upstream-kernel-refresh.md) — Updated current D13 behavior, versions, qualification and handoff; earlier dated evidence remains explicitly historical/source-specific.
- **reviewed_unchanged:** [docs/validation/upstream-engine-review.md](docs/validation/upstream-engine-review.md) — Reviewed impact: no change to this document's owning bootstrap/provider/privacy/rules/governance contract or immutable source inventory; D13 outcomes/versions are defined by current clock/contract documents.
- **reviewed_unchanged:** [docs/plans/2026-10-13-upstream-engine-review.md](docs/plans/2026-10-13-upstream-engine-review.md) — Reviewed impact: no change to this document's owning bootstrap/provider/privacy/rules/governance contract or immutable source inventory; D13 outcomes/versions are defined by current clock/contract documents.
- **updated:** [docs/adr/0013-durable-synthetic-match-commands.md](docs/adr/0013-durable-synthetic-match-commands.md) — Updated current D13 behavior, versions, qualification and handoff; earlier dated evidence remains explicitly historical/source-specific.
- **updated:** [docs/runbooks/match-commands.md](docs/runbooks/match-commands.md) — Updated current D13 behavior, versions, qualification and handoff; earlier dated evidence remains explicitly historical/source-specific.
- **updated:** [docs/validation/play-01.md](docs/validation/play-01.md) — Updated current D13 behavior, versions, qualification and handoff; earlier dated evidence remains explicitly historical/source-specific.
- **reviewed_unchanged:** [docs/validation/clock-investigation.md](docs/validation/clock-investigation.md) — Reviewed impact: no change to this document's owning bootstrap/provider/privacy/rules/governance contract or immutable source inventory; D13 outcomes/versions are defined by current clock/contract documents.
- **updated:** [docs/adr/0014-viewer-projection-privacy.md](docs/adr/0014-viewer-projection-privacy.md) — Updated current D13 behavior, versions, qualification and handoff; earlier dated evidence remains explicitly historical/source-specific.
- **updated:** [docs/contracts/viewer.md](docs/contracts/viewer.md) — Updated current D13 behavior, versions, qualification and handoff; earlier dated evidence remains explicitly historical/source-specific.
- **updated:** [docs/runbooks/viewer-privacy.md](docs/runbooks/viewer-privacy.md) — Updated current D13 behavior, versions, qualification and handoff; earlier dated evidence remains explicitly historical/source-specific.
- **updated:** [docs/validation/play-02.md](docs/validation/play-02.md) — Updated current D13 behavior, versions, qualification and handoff; earlier dated evidence remains explicitly historical/source-specific.
- **updated:** [docs/adr/0015-live-synthetic-transport.md](docs/adr/0015-live-synthetic-transport.md) — Updated current D13 behavior, versions, qualification and handoff; earlier dated evidence remains explicitly historical/source-specific.
- **updated:** [packages/match-client/README.md](packages/match-client/README.md) — Updated current D13 behavior, versions, qualification and handoff; earlier dated evidence remains explicitly historical/source-specific.
- **updated:** [docs/contracts/live.md](docs/contracts/live.md) — Updated current D13 behavior, versions, qualification and handoff; earlier dated evidence remains explicitly historical/source-specific.
- **updated:** [docs/runbooks/live-matches.md](docs/runbooks/live-matches.md) — Updated current D13 behavior, versions, qualification and handoff; earlier dated evidence remains explicitly historical/source-specific.
- **updated:** [docs/validation/play-03.md](docs/validation/play-03.md) — Updated current D13 behavior, versions, qualification and handoff; earlier dated evidence remains explicitly historical/source-specific.
- **updated:** [docs/adr/0016-durable-engine-clocks.md](docs/adr/0016-durable-engine-clocks.md) — Updated current D13 behavior, versions, qualification and handoff; earlier dated evidence remains explicitly historical/source-specific.
- **updated:** [docs/runbooks/game-clocks.md](docs/runbooks/game-clocks.md) — Updated current D13 behavior, versions, qualification and handoff; earlier dated evidence remains explicitly historical/source-specific.
- **updated:** [docs/validation/play-04.md](docs/validation/play-04.md) — Updated current D13 behavior, versions, qualification and handoff; earlier dated evidence remains explicitly historical/source-specific.
- **updated:** [docs/plans/2026-10-15-play-04-design.md](docs/plans/2026-10-15-play-04-design.md) — Updated current D13 behavior, versions, qualification and handoff; earlier dated evidence remains explicitly historical/source-specific.
- **updated:** [docs/plans/2026-10-19-play-04-d13.md](docs/plans/2026-10-19-play-04-d13.md) — Updated current D13 behavior, versions, qualification and handoff; earlier dated evidence remains explicitly historical/source-specific.
- **updated:** [docs/reviews/2026-10-19-play-04-d13.md](docs/reviews/2026-10-19-play-04-d13.md) — Updated current D13 behavior, versions, qualification and handoff; earlier dated evidence remains explicitly historical/source-specific.

Full changed-file inventory: [record](docs/changes/CHG-20261019-003.json).

### Limits and next actions

- Synthetic two-player qualification only; no ordinary/auth/official/card/reward/WEB-02/device/load/production acceptance or production timer values.
- Audit policy point4(single-process quarantine operations), real-card chooser/default/replay-cost/event limits and quota retention remain separate. D14 restore and natural engine endings stay unchanged.
- Exact legacy wire codecs retained; unavailable prior executable/policy/checkpoint identities refuse without rewriting saved data. Real retained-engine activation remains future work.
- Headless Linux browser/worker evidence is separate from real Windows/device observation. No host clock/memory/pagefile/service change, deployment, purchase, visibility change, push or main merge.
- Prior failed RED/build/type/test-authoring/interrupted receipts remain failed; all task receipts have exact timing. Internal source review does not replace Director audit.
- Independent Director audit of codex/play-04-d13; publish and run hosted CI under Director authorization before any main integration.

## CHG-20261019-002 — Clock fix made persistent, hosted PLAY-04 merge runs recorded, Director decision D14 (keep the engine's timeout restore)

- Status: finalized
- Actor: Claude Code agent (architect/QA reviewer role) on Director request, local WSL session
- Recorded (UTC): 2026-10-19T05:49:12.691Z
- Event: unknown; recorded retrospectively (recorded_only)
- Source: ea3a6b7e282aa2adb78be1dc003a82ac46478954
- Tasks: PLAY-04, BOOT-03, DOC-01, DOC-02
- Features: F-DOCS, F-MATCH-CLOCKS, F-CI
- Requirements: R29.007

### Changes

- **review:** Clock plan step 3: the Director ran sudo systemctl disable systemd-timesyncd. At 2026-10-19T02:40:06Z it was disabled and inactive; read-only 60 s probes at 02:40Z and about 05:50Z showed tick 10001/10000, +35.6/+48.7 ppm, no step, calendar minus monotonic -2.3/-3.3 ms, kernel suspend time 0 s. The sleep/wake re-check remains open.
- **test:** RUN-20261019-004: public GitHub metadata for Foundation runs 39108811073 (claude/play-04-opening-fix-audit, workflow_dispatch, attempt 1 success, job 07:44:46-07:57:00Z) and 39109642662 (main, push, attempt 1 success, job 07:58:20-08:10:19Z), both at 4dea392 with every step successful; no logs or artifacts downloaded.
- **review:** Director decision D14 recorded: keep the engine's existing replenishment after a timeout (an exhausted pass restores the normal reset, 125 s with qualification values, versus 66 s after a pass with 1 s left); revisit if abuse appears. PLAY-04 audit policy points: 1 remains engine behaviour (and D13 makes repeated timeouts a loss), 2 kept by D14, 3 replaced by D13, 4 open for operations.
- **documentation:** Decision register D14; PLAY-04 validation note (hosted runs, D14, policy points); clock investigation persistence note; dated notes in AGENTS.md, README.md and docs/README.md; PLAY-04 backlog status synthetic_acceptance_reaudited_merged_hosted_pass_d13_pending; handoff rewritten.

### Verification

- **passed:** Public GitHub job/step metadata for the two PLAY-04 merge runs at 4dea392; metadata only. ([evidence](docs/validation/runs/RUN-20261019-004.json))
- **passed:** docs:check over this record and the updated documents (static). ([evidence](docs/validation/runs/RUN-20261019-005.json))

### Documentation and files

- **updated:** [CHANGELOG.md](CHANGELOG.md) — Regenerated by docs sync.
- **updated:** [docs/current-state.json](docs/current-state.json) — Regenerated by docs sync.
- **updated:** [docs/vision/decision_register.csv](docs/vision/decision_register.csv) — D14 recorded with timestamp and scope.
- **updated:** [docs/validation/play-04.md](docs/validation/play-04.md) — Dated note: hosted merge runs, D14 and the status of the four audit policy points.
- **updated:** [docs/validation/clock-investigation.md](docs/validation/clock-investigation.md) — Dated persistence note with the post-disable probes; earlier evidence unchanged.
- **updated:** [docs/vision/initial_backlog.csv](docs/vision/initial_backlog.csv) — PLAY-04 is merged with hosted passes recorded; D13 follow-up pending.
- **updated:** [AGENTS.md](AGENTS.md) — Dated note: clock fix persistent, hosted runs recorded, D14.
- **updated:** [README.md](README.md) — Same dated note as AGENTS.md.
- **updated:** [docs/README.md](docs/README.md) — Same dated note as AGENTS.md.
- **updated:** [docs/HANDOFF.md](docs/HANDOFF.md) — Rewritten for this checkpoint.
- **reviewed_unchanged:** [docs/adr/0016-durable-engine-clocks.md](docs/adr/0016-durable-engine-clocks.md) — D14 keeps the implemented timeout restore, so the clock decision is unchanged; D13's revision belongs to Codex's implementation.
- **reviewed_unchanged:** [docs/runbooks/game-clocks.md](docs/runbooks/game-clocks.md) — Behaviour unchanged by D14.

Full changed-file inventory: [record](docs/changes/CHG-20261019-002.json).

### Limits and next actions

- Hosted runs are observed through public metadata; logs and artifacts were not downloaded, so no fresh hosted test count is claimed.
- The post-disable probes are host observations, not recorder receipts; the sleep/wake re-check is not done.
- The hosted run for this branch's own pull request cannot be recorded in this commit; it is recorded at the next checkpoint.
- Open the pull request, check its hosted Foundation run and fast-forward main when it passes.
- Director assigns Codex the D13 brief, updated for the new main; reviewer re-audits.
- Re-check the clock after the next sleep/wake.

## CHG-20261019-001 — Clock controlled test step 1: Ubuntu systemd-timesyncd stopped by the Director, 20-minute settle measurement

- Status: finalized
- Actor: Claude Code agent (architect/QA reviewer role) on Director request, local WSL session
- Recorded (UTC): 2026-10-19T01:54:56.958Z
- Event: unknown; recorded retrospectively (recorded_only)
- Source: 9a036329602ce0ef0759aa72ef54e9427b971e1d
- Tasks: BOOT-03, DOC-01, DOC-02
- Features: F-DOCS, F-CI
- Requirements: R29.007

### Changes

- **review:** Clock controlled test step 1 (admin, Director-run command). The Director stopped Ubuntu systemd-timesyncd at 2026-10-19T00:58:41Z (systemd InactiveEnterTimestamp); it stays enabled. A read-only host settle logger (adjtimex modes=0; REALTIME/MONOTONIC/MONOTONIC_RAW every 0.1 s) ran 1,200 s from 00:59:33Z. Calendar steps became single (29 steps, one per ~29.8 s, no second timesyncd step) and shrank from -660.6 ms to -5.4 ms; none above 5 ms after 846 s. chronyd's applied correction fell from +27,140 ppm (tick 10271) to tick 10001 and about +50 ppm by about 15 minutes; the measured monotonic-versus-raw rate over each of the last 15 intervals was 42-55 ppm. No WSL restart was needed (plan step 2 skipped).
- **review:** Second read-only host window, 1,200 s from 01:34:25Z, after the pipeline run: no calendar step above 5 ms, calendar minus monotonic -52.0 ms in total (plan limit 1 s), tick steady at 10001, measured correction 27-50 ppm (median 42). Acceptance: the 20-minute window and the long exact-timing receipt are met; the sleep/wake re-check is open.
- **test:** RUN-20261019-001 read-only kernel clock probe in the container, 120 s: passed with exact timing (no clock discontinuity); tick 10001, applied +49 to +58 ppm, no calendar step above 50 ms, calendar minus monotonic -6.4 ms, chronyd estimated error 99 microseconds (49,691 at the start of the settle window).
- **test:** RUN-20261019-002 local isolated BOOT-03 pipeline (python3 scripts/ci-local.py, disposable project lorcana-ci-6e031bdeb09240df88ca1c0fa835dd44): passed every stage in 461.7 s with exact timing, covering frozen install, 408 Node tests in 20 suites, upstream engine 406 passed/1 skipped, 2 injection tests, Python tooling, disposable PostgreSQL 18 provisioning, 11 Chromium tests, both secret scans, artifact verification and cleanup. Log reviewed: no credential patterns. Local isolated runs RUN-20261012-089/091, RUN-20261013-011/113 and RUN-20261014-051 had failed clock_changed.
- **documentation:** Clock investigation section 'Controlled test step 1 — 2026-10-19 UTC'; dated clock notes appended to the current-status paragraphs of AGENTS.md, README.md and docs/README.md; handoff rewritten.

### Verification

- **passed:** Read-only kernel clock probe after timesyncd was stopped; first container receipt with exact timing since the step problem began. ([evidence](docs/validation/runs/RUN-20261019-001.json))
- **passed:** Local isolated BOOT-03 pipeline on the current source with exact timing; first local isolated timing-valid pass since RUN-20261012-043. ([evidence](docs/validation/runs/RUN-20261019-002.json))
- **passed:** docs:check over this record and the updated documents (static). ([evidence](docs/validation/runs/RUN-20261019-003.json))

### Documentation and files

- **updated:** [CHANGELOG.md](CHANGELOG.md) — Regenerated by docs sync.
- **updated:** [docs/current-state.json](docs/current-state.json) — Regenerated by docs sync.
- **updated:** [docs/validation/clock-investigation.md](docs/validation/clock-investigation.md) — Dated section: step 1 result, settle table, receipts and open items; earlier evidence unchanged.
- **updated:** [AGENTS.md](AGENTS.md) — Dated note: local receipts have exact timing again after the timesyncd stop; leave it stopped; persistence pending.
- **updated:** [README.md](README.md) — Same dated clock note as AGENTS.md.
- **updated:** [docs/README.md](docs/README.md) — Same dated clock note as AGENTS.md.
- **updated:** [docs/HANDOFF.md](docs/HANDOFF.md) — Rewritten for this checkpoint.
- **reviewed_unchanged:** [docs/DEVELOPMENT_WORKFLOW.md](docs/DEVELOPMENT_WORKFLOW.md) — Its rule (no Windows/WSL clock changes without Director authorization) still holds; the stop was Director-run under the admin assignment.
- **reviewed_unchanged:** [docs/runbooks/ci.md](docs/runbooks/ci.md) — Local isolated launcher used exactly as documented; procedure unchanged.

Full changed-file inventory: [record](docs/changes/CHG-20261019-001.json).

### Limits and next actions

- The settle logs are host observations on WSL Ubuntu (same kernel), summarized in the clock investigation, not recorder receipts.
- systemd-timesyncd remains enabled; a WSL restart or reboot restarts it until the Director disables it.
- No sleep/wake re-check yet; Windows remains about 0.54 s from Internet time (absolute UTC, not elapsed time).
- RUN-20261019-002 qualifies the current source only, not earlier sources whose local isolated timing stayed pending.
- Director runs sudo systemctl disable systemd-timesyncd in an Ubuntu terminal (or PowerShell wsl -d Ubuntu -u root ...).
- Reviewer re-measures after the next sleep/wake.
- Merge claude/admin-clock-and-fixtures to main after hosted CI, with Director permission.
- Codex implements D13; reviewer re-audits.

## CHG-20261018-002 — Director decision D13 (opening and timeout concession), clock tug-of-war research checkpoint and test-database fixture cleanup

- Status: finalized
- Actor: Claude Code agent (architect/QA reviewer role) on Director request, local WSL session
- Recorded (UTC): 2026-10-18T22:02:57.989Z
- Event: unknown; recorded retrospectively (recorded_only)
- Source: 4dea392d382c950a7efa66a467a15018d3ec08a0
- Tasks: PLAY-04, BOOT-03, DOC-01, DOC-02
- Features: F-DOCS, F-MATCH-CLOCKS, F-CI
- Requirements: R29.007

### Changes

- **review:** Engine research for the Director: upstream concede (player move, ignorePriority, other player wins) is valid only in main-game phases; the opening phases allow chooseWhoGoesFirst/alterHand plus the server-only forfeitGame (judge role, named winner, documented for timeout/disconnect forfeits). Official CR 2.2 and CR 2.3 (cached bytes, pdfjs extraction) rule 2.3.3.4: a player who concedes at any point, including Setup or Cleanup, loses. Mulligan: CR 2.2.2 and the engine are sequential (starting player first, then turn order; alterHand enforces priority, NOT_PRIORITY_HOLDER otherwise), so an opening timeout identifies one player.
- **review:** Director decision D13 recorded: concede allowed at any point including the opening and counted as a loss; after a configurable number of consecutive timeouts the server concedes for that player (loss), replacing D12's no-timeout-winner and opening pause for player timeouts; infrastructure pauses unchanged; implementation assigned to Codex.
- **review:** Clock research checkpoint (read-only): kernel correction now +3.4% to +3.8% (tick 10337-10384; monotonic +36,374 ppm vs raw) versus -2.76% on 2026-10-14; calendar steps back about 1.05 s every ~29 s as two steps 0.1-0.2 s apart. Host correlation ties the second step to Ubuntu systemd-timesyncd's NTP exchange (active, 32 s minimum poll, 5,875 packets); Windows w32tm stripchart shows Windows about 0.53-0.54 s from public NTP (W32Time Stopped/Manual). Inferred sequence: biased chronyd rate -> Docker/WSL steps to Windows time -> timesyncd re-steps to Internet time; both steps feed chronyd's estimator. Proposed controlled test documented; nothing changed.
- **test:** RUN-20261018-006 test-database fixture cleanup (test target, restricted match role, project fixture helper): orphaned timed fixture from interrupted RUN-20261015-050 (1 match, 1 clock, 8 clock events, 3 receipts, 3 journal, 3 outbox) and 31 quota rows expired 2026-10-14 removed; all counts 0 after. RUN007 read-only kernel clock probe in the container (child exit 0; receipt clock_changed by design).
- **documentation:** Decision register D13; PLAY-04 validation note (decisions, upstream behaviour, cleanup); clock investigation follow-up with measurements and proposed test; handoff.

### Verification

- **passed:** Test-database fixture cleanup with before/after counts; test target and restricted role only. ([evidence](docs/validation/runs/RUN-20261018-006.json))
- **failed:** Read-only kernel clock probe: child exit 0 with rate, step and adjtimex measurements; receipt failed clock_changed because the measured steps occurred during it. ([evidence](docs/validation/runs/RUN-20261018-007.json))
- **passed:** docs:check over this record and updated documents (static). ([evidence](docs/validation/runs/RUN-20261018-008.json))

### Documentation and files

- **updated:** [docs/vision/decision_register.csv](docs/vision/decision_register.csv) — D13 recorded with timestamp, scope and the D12 parts it replaces.
- **updated:** [docs/validation/play-04.md](docs/validation/play-04.md) — Dated note: D13, current upstream concession/forfeit/mulligan behaviour, test-database cleanup.
- **updated:** [docs/validation/clock-investigation.md](docs/validation/clock-investigation.md) — Dated follow-up: rate wander, controller correlation, Windows offset and proposed controlled test; earlier evidence unchanged.
- **updated:** [docs/HANDOFF.md](docs/HANDOFF.md) — Rewritten for this checkpoint.
- **updated:** [CHANGELOG.md](CHANGELOG.md) — Regenerated by docs sync.
- **updated:** [docs/current-state.json](docs/current-state.json) — Regenerated by docs sync.
- **reviewed_unchanged:** [docs/adr/0016-durable-engine-clocks.md](docs/adr/0016-durable-engine-clocks.md) — Implementation of D13 will revise the clock decision; Codex owns that update with the code.
- **reviewed_unchanged:** [docs/runbooks/game-clocks.md](docs/runbooks/game-clocks.md) — Behaviour unchanged until Codex implements D13.
- **reviewed_unchanged:** [docs/plans/2026-10-15-play-04-design.md](docs/plans/2026-10-15-play-04-design.md) — Approved design preserved; D13 supersedes parts of D12 going forward.

Full changed-file inventory: [record](docs/changes/CHG-20261018-002.json).

### Limits and next actions

- Host-side correlation (timesyncd exchange timing, Windows stripchart) was observed on WSL Ubuntu/Windows, outside the container recorder; it is summarized, not a recorder receipt.
- The controlled test needs the Director (sudo password; WSL restart) and has not been run.
- Director runs sudo systemctl stop systemd-timesyncd; reviewer measures 20 minutes and continues the documented plan.
- Assign Codex the D13 implementation; reviewer re-audits.
- Record hosted runs 39108811073/39109642662; merge this branch with hosted CI after the clock work.

## CHG-20261018-001 — Deduplicate the CI history secret scan after hosted PLAY-04 re-check run overran its time limit

- Status: finalized
- Actor: Claude Code agent (architect/QA reviewer role) on Director request, local WSL session
- Recorded (UTC): 2026-10-18T07:26:36.652Z
- Event: unknown; recorded retrospectively (recorded_only)
- Source: e2fe87de430833dea00135d0ae48ef235c86b6fd
- Tasks: BOOT-03, PLAY-04, DOC-01, DOC-02
- Features: F-CI, F-DOCS
- Requirements: none

### Changes

- **test:** RUN-20261018-003 observes public GitHub metadata for hosted Foundation run 38952419789 on claude/play-04-opening-fix-audit at e2fe87d: failure, 2026-10-16 19:06:24-19:22:25Z. The failed-step output, viewed with gh for diagnosis only (not saved), shows all 14 stages passing (including the repaired supervisor test at 19.9 s, all database/live-match stages, 11 Chromium checks and engine-browser) and then the docker compose run of pnpm ci:verify timing out at 900 s with no further output.
- **review:** Cause: sourceSecretScan runs before and after the stages; its history pass listed every commit's tree and spawned git cat-file for every blob, rescanning unchanged blobs per commit. First scan 4 min 25 s (19:07:18-19:11:43Z) versus 1 min 52 s on run 38681078184 (2026-10-15); stages 6.8 min; the second scan exceeded the 900 s limit. Locally 44 commits mean 60,974 reads per pass for 3,591 distinct path/version pairs.
- **implementation:** scripts/ci/security.mjs: the history pass keeps a set of hash+path keys and reads each distinct path/version once; every entry of every revision is still type-checked (symlink/non-blob refused). scanSecrets, patterns, known values, exceptions, shallow refusal and errors unchanged. tests/ci/gates.test.mjs adds a regression: a credential present only in an older revision, beside a file unchanged across revisions, is still reported for that path without its value.
- **test:** RUN-20261018-001 test:ci: 14 Node + 10 Python tests pass. RUN002 previous (e2fe87d) versus repaired scan on the full local history: 60,974 vs 3,591 reads; clean scans both pass (179.3 s vs 11.8 s); a known value present only in an older AGENTS.md is rejected by both with the identical finding. Child exit 0; receipt clock_changed.
- **documentation:** PLAY-04 validation section; dated notes in docs/runbooks/ci.md, BOOT-03 validation and ADR0005; F-CI description/evidence and FEATURES.md row; re-check lines in AGENTS.md/README.md/docs/README.md; handoff.

### Verification

- **passed:** test:ci: 14 Node CI tests (including the older-revision history regression) and 10 Python launcher tests. ([evidence](docs/validation/runs/RUN-20261018-001.json))
- **failed:** Previous versus repaired history secret scan on the full local history: same work set (60,974 vs 3,591 reads), same clean verdict, identical finding for a history-only known value. Child exit 0; receipt failed clock_changed. ([evidence](docs/validation/runs/RUN-20261018-002.json))
- **failed:** Public GitHub job/step metadata for hosted run 38952419789 at e2fe87d: conclusion failure. No saved logs or downloaded artifacts. ([evidence](docs/validation/runs/RUN-20261018-003.json))
- **failed:** verify:foundation on the repaired source: child exit 0, 351 project checks (327 Node + 24 Python), 406 upstream/1 skip/1,362 expectations, 2 injection. Receipt failed clock_changed (host calendar step). ([evidence](docs/validation/runs/RUN-20261018-004.json))
- **passed:** docs:check over the scan repair record and updated documents (static). ([evidence](docs/validation/runs/RUN-20261018-005.json))

### Documentation and files

- **updated:** [docs/validation/play-04.md](docs/validation/play-04.md) — Dated section: hosted run 38952419789, cause, scan repair and equivalence evidence.
- **updated:** [docs/runbooks/ci.md](docs/runbooks/ci.md) — Dated note on history secret-scan scaling and how to diagnose a silent overrun.
- **updated:** [docs/validation/boot-03.md](docs/validation/boot-03.md) — Dated note on the scan repair; executed BOOT-03 evidence unchanged.
- **updated:** [docs/adr/0005-ci-artifact-qualification.md](docs/adr/0005-ci-artifact-qualification.md) — Dated note: same full-history coverage, deduplicated reads; decision unchanged.
- **updated:** [docs/features.json](docs/features.json) — F-CI description and evidence record the deduplicated history scan.
- **updated:** [docs/FEATURES.md](docs/FEATURES.md) — F-CI row records the deduplicated history scan.
- **updated:** [AGENTS.md](AGENTS.md) — Re-check line records hosted run 38952419789 and the Director-chosen scan repair.
- **updated:** [README.md](README.md) — Same update as AGENTS.md.
- **updated:** [docs/README.md](docs/README.md) — Same update as AGENTS.md.
- **updated:** [docs/HANDOFF.md](docs/HANDOFF.md) — Rewritten for the scan repair state and next actions.
- **updated:** [CHANGELOG.md](CHANGELOG.md) — Regenerated by docs sync.
- **updated:** [docs/current-state.json](docs/current-state.json) — Regenerated by docs sync.
- **reviewed_unchanged:** [docs/CHANGELOG_FORMAT.md](docs/CHANGELOG_FORMAT.md) — Makes no statement about the history secret scan's traversal or timing; unaffected by reading each path/version once.
- **reviewed_unchanged:** [docs/DEVELOPMENT_WORKFLOW.md](docs/DEVELOPMENT_WORKFLOW.md) — Makes no statement about the history secret scan's traversal or timing; unaffected by reading each path/version once.
- **reviewed_unchanged:** [docs/WORKSPACE_QUALIFICATION.md](docs/WORKSPACE_QUALIFICATION.md) — Makes no statement about the history secret scan's traversal or timing; unaffected by reading each path/version once.
- **reviewed_unchanged:** [docs/adr/0001-local-development-environment.md](docs/adr/0001-local-development-environment.md) — Makes no statement about the history secret scan's traversal or timing; unaffected by reading each path/version once.
- **reviewed_unchanged:** [docs/adr/0002-application-foundation.md](docs/adr/0002-application-foundation.md) — Makes no statement about the history secret scan's traversal or timing; unaffected by reading each path/version once.
- **reviewed_unchanged:** [docs/adr/0003-documentation-evidence.md](docs/adr/0003-documentation-evidence.md) — Makes no statement about the history secret scan's traversal or timing; unaffected by reading each path/version once.
- **reviewed_unchanged:** [docs/adr/0004-restricted-local-database.md](docs/adr/0004-restricted-local-database.md) — Makes no statement about the history secret scan's traversal or timing; unaffected by reading each path/version once.
- **reviewed_unchanged:** [docs/adr/0006-protocol-release-contracts.md](docs/adr/0006-protocol-release-contracts.md) — Makes no statement about the history secret scan's traversal or timing; unaffected by reading each path/version once.
- **reviewed_unchanged:** [docs/adr/0009-pinned-engine-qualification.md](docs/adr/0009-pinned-engine-qualification.md) — Makes no statement about the history secret scan's traversal or timing; unaffected by reading each path/version once.
- **reviewed_unchanged:** [docs/audits/2026-10-06-project-audit.md](docs/audits/2026-10-06-project-audit.md) — Makes no statement about the history secret scan's traversal or timing; unaffected by reading each path/version once.
- **reviewed_unchanged:** [docs/contracts/protocol.md](docs/contracts/protocol.md) — Makes no statement about the history secret scan's traversal or timing; unaffected by reading each path/version once.
- **reviewed_unchanged:** [docs/contracts/release.md](docs/contracts/release.md) — Makes no statement about the history secret scan's traversal or timing; unaffected by reading each path/version once.
- **reviewed_unchanged:** [docs/documentation-map.json](docs/documentation-map.json) — Makes no statement about the history secret scan's traversal or timing; unaffected by reading each path/version once.
- **reviewed_unchanged:** [docs/plans/2026-10-06-boot-02-database.md](docs/plans/2026-10-06-boot-02-database.md) — Makes no statement about the history secret scan's traversal or timing; unaffected by reading each path/version once.
- **reviewed_unchanged:** [docs/plans/2026-10-06-documentation-governance.md](docs/plans/2026-10-06-documentation-governance.md) — Makes no statement about the history secret scan's traversal or timing; unaffected by reading each path/version once.
- **reviewed_unchanged:** [docs/plans/2026-10-07-boot-03-ci.md](docs/plans/2026-10-07-boot-03-ci.md) — Makes no statement about the history secret scan's traversal or timing; unaffected by reading each path/version once.
- **reviewed_unchanged:** [docs/plans/2026-10-07-boot-05-contracts.md](docs/plans/2026-10-07-boot-05-contracts.md) — Makes no statement about the history secret scan's traversal or timing; unaffected by reading each path/version once.
- **reviewed_unchanged:** [docs/runbooks/database.md](docs/runbooks/database.md) — Makes no statement about the history secret scan's traversal or timing; unaffected by reading each path/version once.
- **reviewed_unchanged:** [docs/runbooks/engine.md](docs/runbooks/engine.md) — Makes no statement about the history secret scan's traversal or timing; unaffected by reading each path/version once.
- **reviewed_unchanged:** [docs/runbooks/workspace-setup.md](docs/runbooks/workspace-setup.md) — Makes no statement about the history secret scan's traversal or timing; unaffected by reading each path/version once.
- **reviewed_unchanged:** [docs/templates/change.json](docs/templates/change.json) — Makes no statement about the history secret scan's traversal or timing; unaffected by reading each path/version once.
- **reviewed_unchanged:** [docs/templates/handoff.md](docs/templates/handoff.md) — Makes no statement about the history secret scan's traversal or timing; unaffected by reading each path/version once.
- **reviewed_unchanged:** [docs/validation/boot-01.md](docs/validation/boot-01.md) — Makes no statement about the history secret scan's traversal or timing; unaffected by reading each path/version once.
- **reviewed_unchanged:** [docs/validation/boot-02.md](docs/validation/boot-02.md) — Makes no statement about the history secret scan's traversal or timing; unaffected by reading each path/version once.
- **reviewed_unchanged:** [docs/validation/boot-05.md](docs/validation/boot-05.md) — Makes no statement about the history secret scan's traversal or timing; unaffected by reading each path/version once.
- **reviewed_unchanged:** [docs/validation/clock-investigation.md](docs/validation/clock-investigation.md) — Makes no statement about the history secret scan's traversal or timing; unaffected by reading each path/version once.
- **reviewed_unchanged:** [docs/validation/play-03.md](docs/validation/play-03.md) — Makes no statement about the history secret scan's traversal or timing; unaffected by reading each path/version once.
- **reviewed_unchanged:** [docs/validation/rule-02.md](docs/validation/rule-02.md) — Makes no statement about the history secret scan's traversal or timing; unaffected by reading each path/version once.
- **reviewed_unchanged:** [docs/vision/README.md](docs/vision/README.md) — Makes no statement about the history secret scan's traversal or timing; unaffected by reading each path/version once.
- **reviewed_unchanged:** [docs/vision/additional_scope.csv](docs/vision/additional_scope.csv) — Makes no statement about the history secret scan's traversal or timing; unaffected by reading each path/version once.
- **reviewed_unchanged:** [docs/vision/decision_register.csv](docs/vision/decision_register.csv) — Makes no statement about the history secret scan's traversal or timing; unaffected by reading each path/version once.
- **reviewed_unchanged:** [docs/vision/initial_backlog.csv](docs/vision/initial_backlog.csv) — Makes no statement about the history secret scan's traversal or timing; unaffected by reading each path/version once.
- **reviewed_unchanged:** [docs/vision/requirements.csv](docs/vision/requirements.csv) — Makes no statement about the history secret scan's traversal or timing; unaffected by reading each path/version once.
- **reviewed_unchanged:** [infra/README.md](infra/README.md) — Makes no statement about the history secret scan's traversal or timing; unaffected by reading each path/version once.
- **reviewed_unchanged:** [packages/engine-adapter/README.md](packages/engine-adapter/README.md) — Makes no statement about the history secret scan's traversal or timing; unaffected by reading each path/version once.
- **reviewed_unchanged:** [packages/engine-lab/README.md](packages/engine-lab/README.md) — Makes no statement about the history secret scan's traversal or timing; unaffected by reading each path/version once.
- **reviewed_unchanged:** [vendor/tcg-engines/README.md](vendor/tcg-engines/README.md) — Makes no statement about the history secret scan's traversal or timing; unaffected by reading each path/version once.
- **reviewed_unchanged:** [docs/schemas/card-certification.schema.json](docs/schemas/card-certification.schema.json) — Schema unaffected; the scan change alters no record, artifact or evidence format.
- **reviewed_unchanged:** [docs/schemas/change.schema.json](docs/schemas/change.schema.json) — Schema unaffected; the scan change alters no record, artifact or evidence format.
- **reviewed_unchanged:** [docs/schemas/documentation-map.schema.json](docs/schemas/documentation-map.schema.json) — Schema unaffected; the scan change alters no record, artifact or evidence format.
- **reviewed_unchanged:** [docs/schemas/features.schema.json](docs/schemas/features.schema.json) — Schema unaffected; the scan change alters no record, artifact or evidence format.
- **reviewed_unchanged:** [docs/schemas/run.schema.json](docs/schemas/run.schema.json) — Schema unaffected; the scan change alters no record, artifact or evidence format.
- **reviewed_unchanged:** [docs/schemas/state.schema.json](docs/schemas/state.schema.json) — Schema unaffected; the scan change alters no record, artifact or evidence format.

Full changed-file inventory: [record](docs/changes/CHG-20261018-001.json).

### Limits and next actions

- The second scan still repeats the full-history pass; deduplication removes the per-commit repetition but not the second pass.
- Local receipts longer than about 20 s fail the unchanged clock guard on this machine; hosted CI is the qualifying run.
- Run hosted Foundation on claude/play-04-opening-fix-audit; if it passes, fast-forward main and push, then observe the main run; if it fails, preserve and report.
- Next intake records the hosted run metadata.

## CHG-20261016-005 — Repair the development-supervisor busy-port test after hosted PLAY-04 re-check run failures

- Status: finalized
- Actor: Claude Code agent (architect/QA reviewer role) on Director request, local WSL session
- Recorded (UTC): 2026-10-16T18:51:09.439Z
- Event: unknown; recorded retrospectively (recorded_only)
- Source: 5347cc0e4c0ff28775865bec99177e2bc8d7c325
- Tasks: BOOT-01, PLAY-04, DOC-01, DOC-02
- Features: F-SUPERVISOR, F-DOCS
- Requirements: none

### Changes

- **test:** RUN-20261016-025 observes public GitHub metadata for hosted Foundation run 38946897424 on claude/play-04-opening-fix-audit at 5347cc0: attempt 1 (18:23:01-18:31:17Z) and attempt 2 (18:32:08-18:40:21Z) both failure in 'Run the same isolated local pipeline'. The failed-step output, viewed with gh for diagnosis only (not saved), shows the single failing test tests/foundation/processes.test.mjs 'development supervisor rejects a busy service port and leaves the existing listener intact' timing out at 30,000 ms in both attempts.
- **review:** Analysis per the Director's instruction. scripts/dev.mjs (pnpm dev) runs the full workspace pnpm build, then starts API/match/worker/web and stops all owned process groups if any child exits unexpectedly. The test occupies API port 3001 and expects exit 1, an intact foreign listener and nothing on 3002/5173 (ADR0002's occupied-port regression). Its 30 s limit was dominated by the supervisor's own rebuild (pnpm test has just built everything): locally build-and-start 20.9 s vs cleanup 45 ms; hosted 21.1/28.0/29.5 s passes, then timeouts. A failed build also exits 1, so the previous test passed without reaching the busy port (shown with a stub pnpm).
- **implementation:** tests/foundation/processes.test.mjs only: pipe the supervisor's stdout/stderr and require the API's own 'api foundation startup failed' message; await 'close' (streams closed) and expect [1, null]; require close within 15 s of that message (supervisor limits: SIGTERM, 12 s grace, 1 s after SIGKILL); overall timeout 120 s with a comment explaining that it includes the full build. scripts/dev.mjs and all product code unchanged.
- **test:** RUN-20261016-026: build-and-start 20.9 s, cleanup 45 ms; with a failing stub pnpm the previous test version passes and the repaired one fails with 'API did not report its busy port'; the repaired test passes normally (child exit 0; receipt clock_changed). RUN027: verify:foundation stopped at 'Stale source fingerprint' because the edit preceded this record (ordering error, preserved). RUN028 runs verify:foundation on the repaired source.
- **documentation:** PLAY-04 validation section for the hosted run and repair; dated notes in docs/runbooks/ci.md, ADR0002 and BOOT-01 validation; F-SUPERVISOR description and FEATURES.md row; re-check lines in AGENTS.md/README.md/docs/README.md; handoff.

### Verification

- **failed:** Public GitHub job/step metadata for both attempts of hosted run 38946897424 at 5347cc0: conclusion failure. No saved logs or downloaded artifacts. ([evidence](docs/validation/runs/RUN-20261016-025.json))
- **failed:** Supervisor test repair check: dev.mjs build-and-start 20.9 s, cleanup 45 ms; previous test passes and repaired test fails on a failing build; repaired test passes normally. Child exit 0; receipt failed clock_changed. ([evidence](docs/validation/runs/RUN-20261016-026.json))
- **failed:** verify:foundation stopped at the documentation check (stale source fingerprint) because the test edit preceded this record; no tests ran. ([evidence](docs/validation/runs/RUN-20261016-027.json))
- **failed:** verify:foundation on the repaired source: child exit 0, 350 project checks (326 Node + 24 Python), 406 upstream/1 skip/1,362 expectations, 2 injection; supervisor test passed in 28.6 s. Receipt failed clock_changed (host calendar step). ([evidence](docs/validation/runs/RUN-20261016-028.json))
- **failed:** docs:check over this record (static): child exit 0; receipt failed clock_changed (30 s run straddled a host calendar step). ([evidence](docs/validation/runs/RUN-20261016-029.json))

### Documentation and files

- **updated:** [docs/validation/play-04.md](docs/validation/play-04.md) — Dated section: hosted failures, what the test checks, cause, repair and runs.
- **updated:** [docs/runbooks/ci.md](docs/runbooks/ci.md) — Dated note on the busy-port test budget and what to check if it fails again.
- **updated:** [docs/adr/0002-application-foundation.md](docs/adr/0002-application-foundation.md) — Dated note: the occupied-port regression now proves the busy-port path and bounds cleanup; decision unchanged.
- **updated:** [docs/validation/boot-01.md](docs/validation/boot-01.md) — Dated note on the strengthened busy-port regression; executed BOOT-01 evidence unchanged.
- **updated:** [docs/features.json](docs/features.json) — F-SUPERVISOR description records the strengthened regression.
- **updated:** [docs/FEATURES.md](docs/FEATURES.md) — F-SUPERVISOR row records the strengthened regression.
- **updated:** [AGENTS.md](AGENTS.md) — Re-check line records the hosted failure and the Director-instructed test repair.
- **updated:** [README.md](README.md) — Same update as AGENTS.md.
- **updated:** [docs/README.md](docs/README.md) — Same update as AGENTS.md.
- **updated:** [docs/HANDOFF.md](docs/HANDOFF.md) — Rewritten for the repair state and next actions.
- **updated:** [CHANGELOG.md](CHANGELOG.md) — Regenerated by docs sync.
- **updated:** [docs/current-state.json](docs/current-state.json) — Regenerated by docs sync.
- **reviewed_unchanged:** [docs/runbooks/workspace-setup.md](docs/runbooks/workspace-setup.md) — pnpm dev behaviour is unchanged.
- **reviewed_unchanged:** [docs/WORKSPACE_QUALIFICATION.md](docs/WORKSPACE_QUALIFICATION.md) — Historical supervisor qualification evidence is unchanged; no toolchain change.
- **reviewed_unchanged:** [docs/vision/initial_backlog.csv](docs/vision/initial_backlog.csv) — PLAY-04 status (hosted CI then merge) remains accurate; BOOT-01 status unchanged.
- **reviewed_unchanged:** [docs/adr/0001-local-development-environment.md](docs/adr/0001-local-development-environment.md) — Dev Container and toolchain decision unaffected by a test budget/assertion change.
- **reviewed_unchanged:** [docs/audits/2026-10-06-project-audit.md](docs/audits/2026-10-06-project-audit.md) — Dated audit; no statement about the supervisor test's budget.
- **reviewed_unchanged:** [docs/documentation-map.json](docs/documentation-map.json) — Source-impact edges already cover tests/**; no new document or edge needed.
- **reviewed_unchanged:** [docs/plans/2026-10-06-documentation-governance.md](docs/plans/2026-10-06-documentation-governance.md) — Governance plan unaffected.
- **reviewed_unchanged:** [docs/templates/change.json](docs/templates/change.json) — Change template unaffected.
- **reviewed_unchanged:** [docs/vision/README.md](docs/vision/README.md) — Vision index unaffected.
- **reviewed_unchanged:** [docs/vision/additional_scope.csv](docs/vision/additional_scope.csv) — Scope items unaffected.
- **reviewed_unchanged:** [docs/vision/decision_register.csv](docs/vision/decision_register.csv) — No Director decision recorded here; the instruction is recorded in this change and validation.
- **reviewed_unchanged:** [docs/vision/requirements.csv](docs/vision/requirements.csv) — Requirement text unaffected.
- **reviewed_unchanged:** [docs/plans/2026-10-07-boot-05-contracts.md](docs/plans/2026-10-07-boot-05-contracts.md) — Contract plan unaffected.
- **reviewed_unchanged:** [docs/contracts/protocol.md](docs/contracts/protocol.md) — No protocol change.
- **reviewed_unchanged:** [docs/contracts/release.md](docs/contracts/release.md) — No release-identity change.
- **reviewed_unchanged:** [docs/validation/boot-05.md](docs/validation/boot-05.md) — BOOT-05 evidence unaffected.
- **reviewed_unchanged:** [docs/adr/0006-protocol-release-contracts.md](docs/adr/0006-protocol-release-contracts.md) — Contract decision unaffected.
- **reviewed_unchanged:** [docs/contracts/viewer.md](docs/contracts/viewer.md) — No viewer contract change.
- **reviewed_unchanged:** [docs/runbooks/viewer-privacy.md](docs/runbooks/viewer-privacy.md) — Viewer privacy operation unaffected.
- **reviewed_unchanged:** [docs/validation/play-02.md](docs/validation/play-02.md) — PLAY-02 evidence unaffected.

Full changed-file inventory: [record](docs/changes/CHG-20261016-005.json).

### Limits and next actions

- The 120 s budget accommodates build growth; it does not remove the redundant rebuild inside the test, which would need a supervisor change.
- Local receipts longer than about 20 s fail the unchanged clock guard on this machine; hosted CI is the qualifying run.
- Run hosted Foundation on claude/play-04-opening-fix-audit; if it passes, fast-forward main and push, then observe the main run; if it fails, preserve and report.
- Next intake records the hosted run metadata.

## CHG-20261016-004 — Independent re-check of the PLAY-04 opening fixes (R1/R2 repaired; local clock steps)

- Status: finalized
- Actor: Claude Code agent (architect/QA reviewer role) on Director request, local WSL session
- Recorded (UTC): 2026-10-16T18:17:56.633Z
- Event: unknown; recorded retrospectively (recorded_only)
- Source: da050d5fded198dbd8a62dad7663b71442e01107
- Tasks: PLAY-04, DOC-01, DOC-02
- Features: F-DOCS, F-MATCH-CLOCKS
- Requirements: R29.006, R29.007

### Changes

- **review:** Re-checked Codex commit da050d5 (CHG-20261016-002/003) against R1/R2 from CHG-20261015-008 and CHG-20261016-001 and the backlog acceptance. Reviewed the fix-only diff from 33e9a7a: reserve returns an unreserved WaitingConcessionEvaluation for waiting concessions; the service runs proof and transition outside locks; commitWaitingConcession rereads under match->clock locks, checks duplicate identity, requires the evaluated state/checkpoint/clock (only lastHealthyUtcMs may advance; heartbeat changes nothing else), refuses reservation, non-running status, backward or expired evaluation, and commits refusals as receipts only and accepted concessions atomically with an ended clock through a narrow permit; the web test now reaches the reservation through the existing Node fixture. Codex's evidence RUN-20261016-002..013 and review note were read; failures are preserved and explained.
- **test:** RUN-20261016-014..023 at fingerprint 168d05d7. RUN015 service probe (injected UTC): findings 1/2 stay repaired; 20 refused opening concessions add 0 clock revisions/events; during a delayed concession the clock stays running with no reservation and the active choice is accepted, the concession then stale; a heartbeat during evaluation keeps a main-game concession valid; a timeout during evaluation makes it stale with one timeout. RUN016/017 live trials with stock clients: 43 opening steps, 0 busy replies, accepted steps 0.22-0.28 s. RUN018 clean git archive: frozen install and typecheck exit 0 with no app output. RUN019 boundary probe passed. RUN020 77/81 database checks; RUN021 the four failing real-time tests pass unmodified in jump-free windows. RUN022 10/11 Chromium; RUN023 the failing test passes with no jump in it, plus 2 Lab workers.
- **review:** Environment: the container calendar clock steps back about 1.8-2.5 s roughly every 30 s against monotonic (measured -2,459.5 ms in a 30 s sample), so receipts longer than about 20 s fail the unchanged clock_changed guard and real-time clock tests fail closed (UNAVAILABLE/time_unreliable) when a step lands in them. No clock setting was changed; all such receipts are preserved as failed. Hosted CI on the re-check branch is the qualifying full-suite run.
- **review:** Verdict: R1 and R2 repaired; no new defect. Observations: a refused opening concession still costs about 0.2 s of engine-worker time (2 workers per process, queue 32, 5 s queue timeout; 8 commands per second per player), a load-gate matter; finding 3, the four policy points and the opening-leave question remain open. Per the Director's CHG-20261016-001 decision, hosted CI on this branch precedes the main fast-forward.
- **documentation:** Validation re-check section; ADR0016 note; runbook R1 caution; F-MATCH-CLOCKS description and evidence; FEATURES.md row rewritten for the current state; backlog PLAY-04 status synthetic_acceptance_reaudited_hosted_ci_then_merge; dated re-check line in AGENTS.md/README.md/docs/README.md; handoff rewritten.

### Verification

- **failed:** verify:foundation child exit 0: 350 project checks (326 Node + 24 Python), 406 upstream/1 skip/1,362 expectations, 2 injection. Receipt failed clock_changed (host calendar step). ([evidence](docs/validation/runs/RUN-20261016-014.json))
- **failed:** Service probe on the actual test database and engine with injected UTC, sections A-E, all assertions passed (child exit 0). Receipt failed clock_changed. ([evidence](docs/validation/runs/RUN-20261016-015.json))
- **failed:** Live trials, real gateway and stock clients: 22 opening steps, 0 busy replies, 1 uninstrumented client closure. Child exit 0; receipt failed clock_changed. ([evidence](docs/validation/runs/RUN-20261016-016.json))
- **failed:** Live trials with clock diagnostics: 21 steps, 0 busy replies; both failed steps paused time_unreliable, one with a -1,812 ms step measured during it. Child exit 0; receipt failed clock_changed. ([evidence](docs/validation/runs/RUN-20261016-017.json))
- **failed:** Clean git archive of da050d5: no app build output before or after; frozen offline install and root typecheck exit 0. Receipt failed clock_changed. ([evidence](docs/validation/runs/RUN-20261016-018.json))
- **passed:** Boundary, NOTIFY, startup route, negotiation, bridge, kernel hash, public clock field and migration/role probe; unchanged. ([evidence](docs/validation/runs/RUN-20261016-019.json))
- **failed:** Role health and database suites: 77 of 81 checks passed; four real-time clock tests failed during host clock steps (exit 1). Receipt failed clock_changed. ([evidence](docs/validation/runs/RUN-20261016-020.json))
- **failed:** The four failed tests, unmodified, each passed when started just after a step with no step during the test (one test per invocation). Child exit 0; receipt failed clock_changed because steps occurred between tests. ([evidence](docs/validation/runs/RUN-20261016-021.json))
- **failed:** Chromium suite: 10 of 11 passed; chooser-seat-0 clock test failed UNAVAILABLE (exit 1); Lab workers not reached. Receipt failed clock_changed. ([evidence](docs/validation/runs/RUN-20261016-022.json))
- **failed:** Chooser-seat-0 Chromium test passed with no step in its body; 2 Lab Web Workers passed. Child exit 0; receipt failed clock_changed. ([evidence](docs/validation/runs/RUN-20261016-023.json))
- **passed:** docs:check over the re-check record and updated documents (static). ([evidence](docs/validation/runs/RUN-20261016-024.json))

### Documentation and files

- **updated:** [docs/validation/play-04.md](docs/validation/play-04.md) — New dated re-check section: verdict, confirmations, local clock steps with exact receipt outcomes, observations and runs.
- **updated:** [docs/adr/0016-durable-engine-clocks.md](docs/adr/0016-durable-engine-clocks.md) — Dated re-check note; the decision itself is unchanged.
- **updated:** [docs/runbooks/game-clocks.md](docs/runbooks/game-clocks.md) — R1 caution now references the independent re-check and the hosted-CI-before-merge step.
- **updated:** [docs/features.json](docs/features.json) — F-MATCH-CLOCKS description states the re-check result; the passing boundary receipt added as evidence; verification stays pending until hosted qualification is recorded.
- **updated:** [docs/FEATURES.md](docs/FEATURES.md) — F-MATCH-CLOCKS row rewritten to the current repaired state and links the re-check.
- **updated:** [docs/vision/initial_backlog.csv](docs/vision/initial_backlog.csv) — PLAY-04 status records re-audited synthetic acceptance with hosted CI before merge; links this record.
- **updated:** [docs/HANDOFF.md](docs/HANDOFF.md) — Rewritten for the re-check state, evidence and next actions.
- **updated:** [AGENTS.md](AGENTS.md) — Dated re-check line after the shared PLAY-04 block; the block itself is Codex's and unchanged.
- **updated:** [README.md](README.md) — Same re-check line as AGENTS.md.
- **updated:** [docs/README.md](docs/README.md) — Same re-check line as AGENTS.md, with a relative link.
- **updated:** [CHANGELOG.md](CHANGELOG.md) — Regenerated by docs sync.
- **updated:** [docs/current-state.json](docs/current-state.json) — Regenerated by docs sync.
- **reviewed_unchanged:** [docs/contracts/live.md](docs/contracts/live.md) — No wire change; the busy receipt description matches the reviewed code.
- **reviewed_unchanged:** [docs/contracts/protocol.md](docs/contracts/protocol.md) — No protocol change.
- **reviewed_unchanged:** [docs/runbooks/live-matches.md](docs/runbooks/live-matches.md) — Codex's description of waiting concessions matches the reviewed code.
- **reviewed_unchanged:** [docs/runbooks/match-commands.md](docs/runbooks/match-commands.md) — Command admission description matches the reviewed code.
- **reviewed_unchanged:** [docs/runbooks/database.md](docs/runbooks/database.md) — No migration or role change.
- **reviewed_unchanged:** [docs/runbooks/ci.md](docs/runbooks/ci.md) — Pipeline unchanged; local timing limits are recorded in validation.
- **reviewed_unchanged:** [docs/validation/clock-investigation.md](docs/validation/clock-investigation.md) — Linked as the explanation of the calendar steps; its executed evidence is not rewritten.
- **reviewed_unchanged:** [docs/WORKSPACE_QUALIFICATION.md](docs/WORKSPACE_QUALIFICATION.md) — No workspace or toolchain change.
- **reviewed_unchanged:** [docs/vision/requirements.csv](docs/vision/requirements.csv) — Requirement text unchanged.
- **historical_preserved:** [docs/reviews/2026-10-16-play-04-opening-fixes.md](docs/reviews/2026-10-16-play-04-opening-fixes.md) — Codex's scoped review record preserved.
- **historical_preserved:** [docs/plans/2026-10-15-play-04-design.md](docs/plans/2026-10-15-play-04-design.md) — Approved design preserved as written.

Full changed-file inventory: [record](docs/changes/CHG-20261016-004.json).

### Limits and next actions

- Local receipts longer than about 20 s fail the unchanged clock guard on this machine; full-suite timing qualification relies on hosted CI, which is run after this record.
- Evidence is local Linux Dev Container and headless Chromium only; injected UTC in the service probe; no Windows, device, GPU, load, remote network or production observation.
- RUN016's single client closure was not instrumented; its cause is inferred only by analogy with RUN017.
- Run hosted Foundation on claude/play-04-opening-fix-audit; if it passes, fast-forward main to this branch and push, then observe the main run; if it fails, preserve and report.
- Next intake records the hosted run metadata and updates feature verification.
- Director decides the four policy points, the opening-leave question and whether to authorize a local clock repair.

## CHG-20261016-003 — Correct pre-commit PLAY-04 repair evidence table and handoff wording

- Status: finalized
- Actor: Codex architect/developer/QA collaborator
- Recorded (UTC): 2026-10-16T04:17:43.496Z
- Event: unknown; recorded retrospectively (recorded_only)
- Source: 33e9a7a5add3db19ba8327df7f56d8744f0e59f8
- Tasks: PLAY-04, DOC-01, DOC-02
- Features: F-DOCS, F-EVIDENCE
- Requirements: R29.007

### Changes

- **documentation:** Correct a blank line splitting the final repair-results table and stale draft wording in HANDOFF. CHG002 snapshot had already been written when its owned synchronization was stopped for this prose review (SIGTERM/exit143); no validation success inferred. Keep CHG002 and every raw run unchanged. Runtime/tests remain exact168d05d7 source, so no unrelated suite repeated.
- **review:** Carry complete coherent branch file coverage from main775994a, superseding CHG002 coverage only for this later documentation addition. Final native012 checks staged canonical source/private/log/coverage/cleanup;013 captures docs:check. Predeclare both run/log pairs with no advance passing assertion; their immutable receipts govern actual outcomes.

### Verification

- No execution evidence recorded for this entry.

### Documentation and files

- **updated:** [docs/validation/play-04.md](docs/validation/play-04.md) — Join result-table continuation and record interrupted direct sync plus correction; all source/audit/raw execution evidence unchanged.
- **updated:** [docs/HANDOFF.md](docs/HANDOFF.md) — Remove stale draft phrasing and distinguish interrupted synchronization from actual final packaging evidence.
- **updated:** [CHANGELOG.md](CHANGELOG.md) — Regenerate cumulative history including this correction without editing sealed CHG002.
- **updated:** [docs/current-state.json](docs/current-state.json) — Regenerate current document hashes for corrected prose; executable fingerprint unchanged.

Full changed-file inventory: [record](docs/changes/CHG-20261016-003.json).

### Limits and next actions

- Documentation-only correction; no new product/source/test acceptance. Native012/013 receipts supply final packaging outcomes; long009/010/011 timing rejections and all Director/hosted/device/policy gates remain.
- Finish native012/013 and local coherent commit; Director re-audit and hosted CI precede main integration.

## CHG-20261016-002 — PLAY-04 opening concession isolation and clean-checkout browser test repair

- Status: finalized
- Actor: Codex architect/developer/QA collaborator
- Recorded (UTC): 2026-10-16T04:16:23.538Z
- Event: unknown; recorded retrospectively (recorded_only)
- Source: 33e9a7a5add3db19ba8327df7f56d8744f0e59f8
- Tasks: PLAY-04, DOC-01, DOC-02
- Features: F-BOUNDARIES, F-CONNECTIVITY, F-CONTRACTS, F-DB, F-DOCS, F-ENGINE, F-EVIDENCE, F-HTTP, F-LIFECYCLE, F-LIVE-TRANSPORT, F-MATCH-CLIENT, F-MATCH-CLOCKS, F-MATCH-COMMANDS, F-PROTOCOL, F-RELEASE, F-RENDERER, F-RULE-CERTIFICATION, F-RULE-INVENTORY, F-SUPERVISOR, F-VIEWER-PRIVACY, F-WEB, F-WORKER, F-WORKSPACE
- Requirements: R02.030, R02.031, R29.006, R29.007, R30.010

### Changes

- **review:** Director assigns residual R1/R2 fixes on published re-audit33e9a7a. Verify clean branch/main775994a/original workspace and DB. Confirm opening concession is engine-refused yet leased; web test directly imports unbuilt app declaration output. Preserve opening refusal/core rules/client retry policy and all unassigned policy/card/device/production gates.
- **test:** RUN-20261016-002 passes original doctor/static/bootstrap/DB intake. Read-only Windows commit headroom about7.55GiB; sequential heavy checks, peak unknown. Private preservation hashes/modes retained ignored0600. Mark old whole-source feature acceptance pending before executable changes.
- **fix:** R1: remove timed reservation from every waiting concession; execute proof/native transition outside locks, atomically write refusal or terminal candidate only against unchanged state/clock/health/age; heartbeat-only health progress is allowed. Keep active leases/deadline/native opening refusal/client retry unchanged.
- **fix:** R2: move validator/DB lease setup into existing post-build Node JavaScript fixture; web TypeScript test no longer imports app dist. Fixture close releases owned leases. Repair strict optional callback and outcome narrowing without weakening types.
- **test:** RED003 reproduces cold TS2307;004 repeats opening lease/race faults.00533focused cases pass but strict types and clock guard fail;006 catches union narrowing.007strict types/lint and008source-only frozen install/typecheck pass. New storage/service/live/Chromium regressions preserve all prior checks.
- **review:** Fresh scoped read-only reviewer reports no critical/important defects. Optional heartbeat-only isolation coverage is not a defect; review report retained with no invented execution.
- **documentation:** Update current package/callable/ADR/runbook/live/build-order/backlog evidence and universal handoff; classify review/add test impact edges. Keep prior sealed history and Director policy/real-card/device/production gates.
- **edit:** Draft docs sync reported an incorrect relative current-banner link in vendor README. Correct all current repair links relative to owning document before rerunning documentation validation; no source or run bytes changed.
- **test:** Final-source RUN00981DB/storage/match/live,01011Linux Chromium plus2Lab workers,011350project/406upstream/2injection all complete with child exit0; one inherited engine skip retained. All three native receipts fail clock_changed and remain failed; no repeated long run or clock guard/environment change. Fresh source-only008 is a timing-valid pass at the same168d05d7 fingerprint.
- **documentation:** Current feature verification remains conservatively pending because full timed receipts failed; retain all dated evidence, append exact raw/monotonic/result distinctions and update backlog/current banners/handoff. Four Director policy points, real-card chooser and external acceptance stay separate.
- **review:** Local final packaging RUN012 will inspect exact9 source changes, canonical staged bytes, private values/modes/ignores, sanitized current owned files/log digests, cumulative main775994a coverage, untouched main and owned cleanup. RUN013 captures final docs:check. Their run/log pairs are predeclared; immutable receipts supply actual outcomes without a future passing assertion or sealed-record amendment.

### Verification

- **passed:** Unchanged audited-source baseline; not new-fix acceptance. ([evidence](docs/validation/runs/RUN-20261016-002.json))
- **failed:** RED source-only frozen install typecheck reproduces unbuilt app output import ([evidence](docs/validation/runs/RUN-20261016-003.json))
- **failed:** RED no-lease waiting opening and optimistic terminal race regressions ([evidence](docs/validation/runs/RUN-20261016-004.json))
- **failed:** GREEN unreserved waiting concession and opening race checks with owning builds; child exit0 cannot supply timed acceptance ([evidence](docs/validation/runs/RUN-20261016-005.json))
- **failed:** Unreserved opening repair targeted tests and replacement fixture strict types lint ([evidence](docs/validation/runs/RUN-20261016-006.json))
- **passed:** Opening repair strict web types and scoped lint ([evidence](docs/validation/runs/RUN-20261016-007.json))
- **passed:** GREEN source-only frozen offline install and ordered root typecheck with no app output ([evidence](docs/validation/runs/RUN-20261016-008.json))
- **failed:** 81 DB/storage/match/live checks all pass (5+3+73), child exit0; full receipt rejected clock_changed, so no timed acceptance or permanent repair claimed. ([evidence](docs/validation/runs/RUN-20261016-009.json))
- **failed:** Complete Linux Chromium smoke live-clock opening spam both seats and Lab worker regression suites; all child checks succeed/exit0, native timing rejected clock_changed; no qualified full pass. ([evidence](docs/validation/runs/RUN-20261016-010.json))
- **failed:** Final-source frozen offline install doctor full foundation types lint build bootstrap project and unchanged engine suites; all child checks succeed/exit0, native timing rejected clock_changed; no qualified full pass. ([evidence](docs/validation/runs/RUN-20261016-011.json))

### Documentation and files

- **updated:** [AGENTS.md](AGENTS.md) — Refresh current PLAY-04 banner to residual R1/R2 implementation/evidence, preserving dated milestone history and unrelated gates.
- **updated:** [CHANGELOG.md](CHANGELOG.md) — Refresh current PLAY-04 banner to residual R1/R2 implementation/evidence, preserving dated milestone history and unrelated gates.
- **updated:** [README.md](README.md) — Refresh current PLAY-04 banner to residual R1/R2 implementation/evidence, preserving dated milestone history and unrelated gates.
- **updated:** [apps/match-service/README.md](apps/match-service/README.md) — Current repair summary and unreserved engine evaluation with final SQL fence; re-audit remains separate.
- **updated:** [apps/web/README.md](apps/web/README.md) — Document Node fixture boundary and fresh-source typecheck plus both opening-seat browser spam regressions.
- **updated:** [docs/DEVELOPMENT_WORKFLOW.md](docs/DEVELOPMENT_WORKFLOW.md) — Fresh-source app-import/typecheck build-order lesson added; sequential scheduling and evidence guard retained.
- **updated:** [docs/FEATURES.md](docs/FEATURES.md) — Refresh current PLAY-04 banner to residual R1/R2 implementation/evidence, preserving dated milestone history and unrelated gates.
- **updated:** [docs/HANDOFF.md](docs/HANDOFF.md) — Replace audit intake with exact repair branch/source, actual checks/failures, preserved resources and next actions.
- **updated:** [docs/README.md](docs/README.md) — Refresh current PLAY-04 banner to residual R1/R2 implementation/evidence, preserving dated milestone history and unrelated gates.
- **updated:** [docs/WORKSPACE_QUALIFICATION.md](docs/WORKSPACE_QUALIFICATION.md) — Refresh current PLAY-04 banner to residual R1/R2 implementation/evidence, preserving dated milestone history and unrelated gates.
- **reviewed_unchanged:** [docs/adr/0001-local-development-environment.md](docs/adr/0001-local-development-environment.md) — Earlier workspace/database/dependency/protocol architecture remains exact: no toolchain, applied SQL, wire or package ownership change.
- **reviewed_unchanged:** [docs/adr/0002-application-foundation.md](docs/adr/0002-application-foundation.md) — Earlier workspace/database/dependency/protocol architecture remains exact: no toolchain, applied SQL, wire or package ownership change.
- **reviewed_unchanged:** [docs/adr/0004-restricted-local-database.md](docs/adr/0004-restricted-local-database.md) — Earlier workspace/database/dependency/protocol architecture remains exact: no toolchain, applied SQL, wire or package ownership change.
- **reviewed_unchanged:** [docs/adr/0006-protocol-release-contracts.md](docs/adr/0006-protocol-release-contracts.md) — Earlier workspace/database/dependency/protocol architecture remains exact: no toolchain, applied SQL, wire or package ownership change.
- **reviewed_unchanged:** [docs/adr/0008-engine-placement-dependency-baseline.md](docs/adr/0008-engine-placement-dependency-baseline.md) — Earlier workspace/database/dependency/protocol architecture remains exact: no toolchain, applied SQL, wire or package ownership change.
- **reviewed_unchanged:** [docs/adr/0013-durable-synthetic-match-commands.md](docs/adr/0013-durable-synthetic-match-commands.md) — Transactional receipt/CAS/journal/outbox guarantees retained; narrow terminal permit still requires unchanged clock and receipt identity.
- **reviewed_unchanged:** [docs/adr/0014-viewer-projection-privacy.md](docs/adr/0014-viewer-projection-privacy.md) — Viewer/ref/recipient privacy contract unchanged; new waiting path uses existing worker and publishes unchanged closed DTOs only.
- **reviewed_unchanged:** [docs/adr/0015-live-synthetic-transport.md](docs/adr/0015-live-synthetic-transport.md) — Session/ticket/hint/protocol/retry ownership unchanged; clock repair adds no wire or identity path.
- **updated:** [docs/adr/0016-durable-engine-clocks.md](docs/adr/0016-durable-engine-clocks.md) — Compare optimistic waiting evaluation with lease/forfeit/retry alternatives and record same-scope R1 repair authority.
- **reviewed_unchanged:** [docs/audits/2026-10-06-project-audit.md](docs/audits/2026-10-06-project-audit.md) — Dated audit remains labeled history; current runtime repair is recorded in PLAY-04 validation, no baseline findings rewritten.
- **updated:** [docs/changes/CHG-20261016-002.json](docs/changes/CHG-20261016-002.json) — Refresh current PLAY-04 banner to residual R1/R2 implementation/evidence, preserving dated milestone history and unrelated gates.
- **updated:** [docs/contracts/live.md](docs/contracts/live.md) — Explain unchanged wire and retry semantics with waiting-concession race outcomes.
- **updated:** [docs/contracts/protocol.md](docs/contracts/protocol.md) — Refresh current PLAY-04 banner to residual R1/R2 implementation/evidence, preserving dated milestone history and unrelated gates.
- **updated:** [docs/contracts/release.md](docs/contracts/release.md) — Refresh current PLAY-04 banner to residual R1/R2 implementation/evidence, preserving dated milestone history and unrelated gates.
- **reviewed_unchanged:** [docs/contracts/viewer.md](docs/contracts/viewer.md) — Viewer/ref/recipient privacy contract unchanged; new waiting path uses existing worker and publishes unchanged closed DTOs only.
- **updated:** [docs/current-state.json](docs/current-state.json) — Refresh current PLAY-04 banner to residual R1/R2 implementation/evidence, preserving dated milestone history and unrelated gates.
- **updated:** [docs/documentation-map.json](docs/documentation-map.json) — Classify new scoped review and add clock-browser test impact edges for client/live docs.
- **updated:** [docs/features.json](docs/features.json) — Conservatively keep obsolete whole-source verification pending: final complete child suites exit0 but native timing receipts fail. Retain dated references and add exact repair/helper sources/evidence; no blanket passing promotion.
- **reviewed_unchanged:** [docs/plans/2026-10-06-boot-02-database.md](docs/plans/2026-10-06-boot-02-database.md) — Prior plan/current scope remains applicable; this repairs wait admission/build-order without changing approved baseline or delivery scope.
- **reviewed_unchanged:** [docs/plans/2026-10-06-documentation-governance.md](docs/plans/2026-10-06-documentation-governance.md) — Prior plan/current scope remains applicable; this repairs wait admission/build-order without changing approved baseline or delivery scope.
- **reviewed_unchanged:** [docs/plans/2026-10-07-boot-05-contracts.md](docs/plans/2026-10-07-boot-05-contracts.md) — Prior plan/current scope remains applicable; this repairs wait admission/build-order without changing approved baseline or delivery scope.
- **reviewed_unchanged:** [docs/plans/2026-10-10-boot-04-decision-worksheet.md](docs/plans/2026-10-10-boot-04-decision-worksheet.md) — Prior plan/current scope remains applicable; this repairs wait admission/build-order without changing approved baseline or delivery scope.
- **reviewed_unchanged:** [docs/policies/fan-content.md](docs/policies/fan-content.md) — Synthetic fixtures only; no assets imported or fan-content policy changed.
- **updated:** [docs/reviews/2026-10-16-play-04-opening-fixes.md](docs/reviews/2026-10-16-play-04-opening-fixes.md) — Persist fresh scoped read-only reviewer verdict and optional non-blocking coverage suggestion.
- **updated:** [docs/runbooks/database.md](docs/runbooks/database.md) — Refresh current PLAY-04 banner to residual R1/R2 implementation/evidence, preserving dated milestone history and unrelated gates.
- **updated:** [docs/runbooks/engine.md](docs/runbooks/engine.md) — Refresh current PLAY-04 banner to residual R1/R2 implementation/evidence, preserving dated milestone history and unrelated gates.
- **updated:** [docs/runbooks/game-clocks.md](docs/runbooks/game-clocks.md) — Document unreserved waiting concession admission/final fences, refusal/terminal outputs and no opening leave permission.
- **updated:** [docs/runbooks/live-matches.md](docs/runbooks/live-matches.md) — Explain waiting opening regression/same-socket retry and retained limits.
- **updated:** [docs/runbooks/match-commands.md](docs/runbooks/match-commands.md) — Refresh current PLAY-04 banner to residual R1/R2 implementation/evidence, preserving dated milestone history and unrelated gates.
- **reviewed_unchanged:** [docs/runbooks/viewer-privacy.md](docs/runbooks/viewer-privacy.md) — Viewer/ref/recipient privacy contract unchanged; new waiting path uses existing worker and publishes unchanged closed DTOs only.
- **reviewed_unchanged:** [docs/runbooks/workspace-setup.md](docs/runbooks/workspace-setup.md) — Same existing container, private config and volume; no provisioning/restart/toolchain/port change needed.
- **reviewed_unchanged:** [docs/templates/change.json](docs/templates/change.json) — Schema1 template/fields/timestamp/sealing workflow unchanged; new draft follows it.
- **reviewed_unchanged:** [docs/validation/boot-01.md](docs/validation/boot-01.md) — Dated foundation acceptance remains source-specific; no workspace/database/protocol baseline or historical evidence altered.
- **updated:** [docs/validation/boot-02.md](docs/validation/boot-02.md) — Refresh current PLAY-04 banner to residual R1/R2 implementation/evidence, preserving dated milestone history and unrelated gates.
- **reviewed_unchanged:** [docs/validation/boot-04.md](docs/validation/boot-04.md) — Dated foundation acceptance remains source-specific; no workspace/database/protocol baseline or historical evidence altered.
- **reviewed_unchanged:** [docs/validation/boot-05.md](docs/validation/boot-05.md) — Dated foundation acceptance remains source-specific; no workspace/database/protocol baseline or historical evidence altered.
- **updated:** [docs/validation/play-01.md](docs/validation/play-01.md) — Refresh current PLAY-04 banner to residual R1/R2 implementation/evidence, preserving dated milestone history and unrelated gates.
- **updated:** [docs/validation/play-02.md](docs/validation/play-02.md) — Refresh current PLAY-04 banner to residual R1/R2 implementation/evidence, preserving dated milestone history and unrelated gates.
- **updated:** [docs/validation/play-03.md](docs/validation/play-03.md) — Refresh current PLAY-04 banner to residual R1/R2 implementation/evidence, preserving dated milestone history and unrelated gates.
- **updated:** [docs/validation/play-04.md](docs/validation/play-04.md) — Append repair semantics, RED/failed/GREEN evidence, full child success versus native timing failure, reviewer disposition and final packaging plan; prior sealed history unchanged.
- **updated:** [docs/validation/rule-03.md](docs/validation/rule-03.md) — Refresh current PLAY-04 banner to residual R1/R2 implementation/evidence, preserving dated milestone history and unrelated gates.
- **reviewed_unchanged:** [docs/vision/README.md](docs/vision/README.md) — Baseline548 requirements and planning/current authority distinction unchanged; backlog owns current repair status.
- **reviewed_unchanged:** [docs/vision/additional_scope.csv](docs/vision/additional_scope.csv) — X06/X07 documentation/evidence standards and X01 multiplayer/sandbox scope retained; two-player repair adds no scope reduction.
- **reviewed_unchanged:** [docs/vision/decision_register.csv](docs/vision/decision_register.csv) — Four unassigned PLAY-04 policy points and D12 thinking-time policy unchanged; native opening refusal preserved.
- **updated:** [docs/vision/initial_backlog.csv](docs/vision/initial_backlog.csv) — PLAY-04 residual repair checkpoint and latest evidence link; main/re-audit/hosted status explicit.
- **reviewed_unchanged:** [docs/vision/requirements.csv](docs/vision/requirements.csv) — Original548 requirements/20optional flags and acceptance definitions remain unchanged; R29.007 infrastructure defect repaired without accepting full product behavior.
- **updated:** [packages/contracts/README.md](packages/contracts/README.md) — Refresh current PLAY-04 banner to residual R1/R2 implementation/evidence, preserving dated milestone history and unrelated gates.
- **updated:** [packages/db/README.md](packages/db/README.md) — Document WaitingConcessionEvaluation/commitWaitingConcession authority, race/health rejection and atomic outputs.
- **updated:** [packages/engine-adapter/README.md](packages/engine-adapter/README.md) — Refresh current PLAY-04 banner to residual R1/R2 implementation/evidence, preserving dated milestone history and unrelated gates.
- **reviewed_unchanged:** [packages/match-client/README.md](packages/match-client/README.md) — Client runtime/API/retry budget unchanged; only Node/Chromium qualification helper ownership and waiting-server admission repaired.
- **updated:** [vendor/tcg-engines/README.md](vendor/tcg-engines/README.md) — Refresh current PLAY-04 banner to residual R1/R2 implementation/evidence, preserving dated milestone history and unrelated gates.

Full changed-file inventory: [record](docs/changes/CHG-20261016-002.json).

### Limits and next actions

- No engine/core rules, opening leave policy, applied SQL/public schemas/dependencies/host settings or normal admission changes. Director re-audit and hosted CI remain separate.
- Main remains775994a. No publish/merge/deploy is authorized for this fix task.
- Native005/009/010/011 clock_changed failures are preserved; fresh complete child checks exit0 does not constitute a timing-valid full receipt. Current feature verification stays pending; Director re-audit and hosted CI are separate.
- No fresh long isolated CI/hosted artifact, real Windows/device, full-length real-card/load/production or retained-engine acceptance. Peak host memory unknown; sequential tests retained.
- Finish native packaging012/013 and local coherent commit; Director independently re-audits this repair, runs hosted CI, then decides publication/main integration.
- Keep four Director policy points, real-card chooser, AUTH/ordinary/card/private/reward/device/load/production and host-clock/isolated qualification gates explicit.

## CHG-20261016-001 — Hosted fix-source run failure (finding R2) and Director decision to fix R1 and R2 before PLAY-04 main integration

- Status: finalized
- Actor: Claude Code agent (architect/QA reviewer role) on Director request, local WSL session
- Recorded (UTC): 2026-10-16T01:30:42.756Z
- Event: unknown; recorded retrospectively (recorded_only)
- Source: 606282093d4f14d422af571b3f81f9b054b1f5b1
- Tasks: PLAY-04, DOC-01, DOC-02
- Features: F-DOCS, F-MATCH-CLOCKS
- Requirements: R29.007

### Changes

- **test:** RUN-20261015-125 observes public GitHub metadata for Foundation run 38820071834: attempt 1, workflow_dispatch on claude/play-04-fix-audit at 6062820, job foundation failure 2026-10-15T22:53:04Z-22:59:12Z; step 'Run the same isolated local pipeline' failed and the evidence step was skipped. The failed step output was viewed with gh run view --log-failed for diagnosis only (not saved; no artifacts downloaded): web typecheck TS2307 for '../../match-service/dist/validation.js' in apps/web/tests/clock-client.spec.ts.
- **review:** Finding R2 (Important, blocks merge): the CHG-20261015-007 Chromium regression imports app build output (apps/web/tests/clock-client.spec.ts:9). The root typecheck script builds only packages/** and the engine before typechecking every workspace (package.json:20), so on a fresh checkout apps/match-service/dist is absent and the web typecheck fails. Local suites (Codex RUN112, re-audit RUN116) passed because earlier builds left that folder in place. RUN-20261015-124 reproduces the hosted error locally by setting the folder aside (expected failure, exit 2) and restores it.
- **review:** Director decision recorded 2026-10-16T01:30:42.756Z: 'Fix both'. One small Codex round fixes R2 (the CI import) and R1 (a waiting player's opening concession takes the timed reservation) with an opening-phase regression; then this reviewer re-checks, runs hosted CI, publishes and fast-forwards main. Main stays at 775994a.
- **documentation:** Dated validation section for the hosted run, R2 and the decision; re-audit lines in AGENTS.md/README.md/docs/README.md, backlog PLAY-04 status, F-MATCH-CLOCKS description and FEATURES.md row updated; handoff updated.

### Verification

- **failed:** Expected failure: with apps/match-service/dist set aside, pnpm typecheck reproduces the hosted TS2307 web typecheck error (exit 2); the folder is restored on exit. ([evidence](docs/validation/runs/RUN-20261015-124.json))
- **failed:** Public GitHub job/step metadata for hosted run 38820071834 at 6062820: conclusion failure. No saved logs or downloaded artifacts. ([evidence](docs/validation/runs/RUN-20261015-125.json))
- **passed:** docs:check over the decision record and updated documents (static). ([evidence](docs/validation/runs/RUN-20261016-001.json))

### Documentation and files

- **updated:** [docs/validation/play-04.md](docs/validation/play-04.md) — Dated section for hosted run 38820071834, finding R2 with reproduction, and the Director decision.
- **updated:** [AGENTS.md](AGENTS.md) — Re-audit line now states the hosted failure and the fix-both decision.
- **updated:** [README.md](README.md) — Same update as AGENTS.md.
- **updated:** [docs/README.md](docs/README.md) — Same update as AGENTS.md.
- **updated:** [docs/vision/initial_backlog.csv](docs/vision/initial_backlog.csv) — PLAY-04 status records the second fix round required before merge; links this record.
- **updated:** [docs/FEATURES.md](docs/FEATURES.md) — F-MATCH-CLOCKS row states the hosted failure and the decision.
- **updated:** [docs/features.json](docs/features.json) — F-MATCH-CLOCKS description states R2 and the decision; failed runs are kept in this record, not as feature evidence.
- **updated:** [docs/HANDOFF.md](docs/HANDOFF.md) — Updated for the hosted failure, decision and next actions.
- **updated:** [CHANGELOG.md](CHANGELOG.md) — Regenerated by docs sync.
- **updated:** [docs/current-state.json](docs/current-state.json) — Regenerated by docs sync.
- **reviewed_unchanged:** [docs/runbooks/game-clocks.md](docs/runbooks/game-clocks.md) — R1 caution already present; R2 is a test build-order defect with no operational change.
- **reviewed_unchanged:** [docs/runbooks/ci.md](docs/runbooks/ci.md) — The pipeline behaved as documented; the failure is in the tested source.
- **reviewed_unchanged:** [docs/adr/0016-durable-engine-clocks.md](docs/adr/0016-durable-engine-clocks.md) — The re-audit note already records R1; R2 does not affect the decision.

Full changed-file inventory: [record](docs/changes/CHG-20261016-001.json).

### Limits and next actions

- Hosted evidence is public metadata plus a viewed (unsaved) failed-step log excerpt; no hosted artifacts were downloaded.
- No product code changed; R1 and R2 remain open until the assigned fix round.
- Codex fix round for R1 and R2 with an opening-phase regression and a fresh-checkout typecheck; rerun the database, live and browser suites.
- Re-check the fix, run hosted CI, then publish and fast-forward main.
- Director decides the four audit policy points.

## CHG-20261015-008 — Independent re-audit of the PLAY-04 audit fixes (findings 1/2 repaired; opening-phase residual R1)

- Status: finalized
- Actor: Claude Code agent (architect/QA reviewer role) on Director request, local WSL session
- Recorded (UTC): 2026-10-15T22:47:28.281Z
- Event: unknown; recorded retrospectively (recorded_only)
- Source: bcaee093a538bfaef778cd61a48ee5a8f081d20c
- Tasks: PLAY-04, DOC-01, DOC-02
- Features: F-DOCS, F-MATCH-CLOCKS
- Requirements: R29.006, R29.007

### Changes

- **review:** Re-audited Codex commit bcaee09 (CHG-20261015-007) against the Director's four fix steps, audit findings 1 and 2, and the backlog acceptance (no disconnect/time abuse or duplicate terminal result). Reviewed the fix-only diff from 3753069: the early waiting-player refusal and waiting-concession deadline exemption in clock-store reserve, the BUSY service error, the gateway's rate_limited mapping, the stock client's retry handling, the nine regressions and the evidence runs RUN103-115 (failures 104-108 and 113 preserved and explained). Confirmed that the engine, bridge, migrations, public schemas and match client are unchanged.
- **test:** Independent runs RUN-20261015-116..122 all passed at Codex's final fingerprint 0249c5a5 with exact timing, no clock discontinuity and 0 redactions. RUN116 full verify:foundation (350 project = 326 Node + 24 Python; 406 upstream/1 skip/1,362 expectations; 2 injection). RUN117 service probe on the real test database and engine with injected UTC: finding 1 repaired (waiting refusals do no engine work and change no clock revision or event; 8 turns with 24 concurrent waiting commands, every active pass accepted and the clock matching an independent model), busy contention retryable with no durable receipt, finding 2 repaired at and 3 s past the deadline with no timeout pass. RUN118/119 real gateway, database and time with stock clients. RUN120 boundary probe unchanged. RUN121 role health plus 74 database checks and db:check. RUN122 11 Chromium checks plus 2 Lab workers.
- **review:** Finding R1 (Important, residual of finding 1): every waiting concession is exempt from the early refusal (clock-store.ts:82) and the deadline check (clock-store.ts:94-95), but the upstream opening flow accepts only chooseWhoGoesFirst/alterHand and forfeitGame (runtime-flow-config.ts:42,61), so the engine refuses every opening concession after it has taken the timed reservation. RUN117: 20 refused opening concessions, each about 170 ms of reservation, 2 clock revisions and 2 clock events; the active player's choice gets BUSY meanwhile. RUN118: with an opening concession holding the reservation, the stock client closes itself after 8 busy replies in 1.8 s (match-client index.ts:54). RUN119: repeated stock-client concessions in the opening, 18 steps over 8 matches, 15 with busy replies, active client closed in 6 of 8. Effect: the opening decision is blocked while the opening clock runs; expiry pauses the match for audited resume; no win or loss. Suggested fix: a waiting player's command never holds the timed reservation.
- **review:** Observations: each refused opening concession writes one receipt and two clock events (about 11 events per second per waiting player at the measured speed); players cannot concede in the opening because the engine accepts only forfeitGame there (product question); finding 3 (real-card chooser) now also exists in the store's early refusal, still unreachable with synthetic cards; the four Director policy points remain open.
- **documentation:** Validation re-audit section; ADR0016 re-audit note; runbook caution for R1; F-MATCH-CLOCKS description and evidence; FEATURES.md row; backlog PLAY-04 status implemented_audit_fixes_reaudited_residual_fix_required_before_merge; dated re-audit line after the shared PLAY-04 block in AGENTS.md, README.md and docs/README.md; handoff rewritten. Codex's records, executed evidence and the shared current block are unchanged.

### Verification

- **passed:** Timing-valid pnpm verify:foundation: 350 project checks (326 Node + 24 Python), 406 upstream passes/1 inherited skip/1,362 expectations, 2 injection tests. Local Dev Container. ([evidence](docs/validation/runs/RUN-20261015-116.json))
- **passed:** Auditor service probe on the actual test database and engine worker with injected UTC and native values: findings 1 and 2 repaired with exact clock arithmetic; measures R1 (opening concessions take the reservation; BUSY for the active player). ([evidence](docs/validation/runs/RUN-20261015-117.json))
- **passed:** Real gateway child, database, stock match client and real time: with an opening concession holding the reservation, the active client closes after 8 busy replies in 1.8 s, without a new socket or maintenance receipt. ([evidence](docs/validation/runs/RUN-20261015-118.json))
- **passed:** Real gateway: repeated stock-client concessions by the waiting player during the opening, 18 steps over 8 matches; 15 steps with busy replies (91), active client closed in 6 of 8 matches. ([evidence](docs/validation/runs/RUN-20261015-119.json))
- **passed:** Boundary, NOTIFY, startup route, protocol negotiation, upstream bridge, kernel hash, public clock field and migration/role probe; unchanged from the audited source. ([evidence](docs/validation/runs/RUN-20261015-120.json))
- **passed:** Role health on both targets, db:test 5, storage 3, match integration 66 (74 total) and db:check. ([evidence](docs/validation/runs/RUN-20261015-121.json))
- **passed:** 11 Linux headless Chromium checks (including both chooser seats and the busy-retry regression) plus 2 Lab Web Workers. Not a Windows or device observation. ([evidence](docs/validation/runs/RUN-20261015-122.json))
- **passed:** docs:check over the re-audit record and updated documents (static). ([evidence](docs/validation/runs/RUN-20261015-123.json))

### Documentation and files

- **updated:** [docs/validation/play-04.md](docs/validation/play-04.md) — New dated re-audit section with verdict, confirmations, finding R1, observations and runs; earlier sections preserved.
- **updated:** [docs/adr/0016-durable-engine-clocks.md](docs/adr/0016-durable-engine-clocks.md) — Dated re-audit note; the decision itself is unchanged.
- **updated:** [docs/runbooks/game-clocks.md](docs/runbooks/game-clocks.md) — Caution for the open opening-phase residual R1 alongside Codex's updated cautions.
- **updated:** [docs/features.json](docs/features.json) — F-MATCH-CLOCKS description states the re-audit result and the open residual; re-audit runs added as evidence.
- **updated:** [docs/FEATURES.md](docs/FEATURES.md) — F-MATCH-CLOCKS row states the re-audit result and links the re-audit section.
- **updated:** [docs/vision/initial_backlog.csv](docs/vision/initial_backlog.csv) — PLAY-04 status records that the fix is re-audited and a residual fix is required before merge; links this record.
- **updated:** [docs/HANDOFF.md](docs/HANDOFF.md) — Rewritten for the re-audit state, evidence and next actions.
- **updated:** [AGENTS.md](AGENTS.md) — Dated re-audit line after the shared PLAY-04 block; the block itself is Codex's and unchanged.
- **updated:** [README.md](README.md) — Same re-audit line as AGENTS.md.
- **updated:** [docs/README.md](docs/README.md) — Same re-audit line as AGENTS.md, with a relative link.
- **updated:** [CHANGELOG.md](CHANGELOG.md) — Regenerated by docs sync.
- **updated:** [docs/current-state.json](docs/current-state.json) — Regenerated by docs sync.
- **reviewed_unchanged:** [docs/contracts/live.md](docs/contracts/live.md) — The rate_limited busy receipt description matches the reviewed gateway code; R1 needs no contract change.
- **reviewed_unchanged:** [docs/contracts/protocol.md](docs/contracts/protocol.md) — No protocol change in the fix or the re-audit.
- **reviewed_unchanged:** [docs/runbooks/live-matches.md](docs/runbooks/live-matches.md) — Codex's busy-retry description matches the reviewed code; R1 is recorded in the game-clock runbook.
- **reviewed_unchanged:** [docs/runbooks/match-commands.md](docs/runbooks/match-commands.md) — Command admission description matches the reviewed code.
- **reviewed_unchanged:** [docs/runbooks/database.md](docs/runbooks/database.md) — No migration or role change.
- **reviewed_unchanged:** [docs/WORKSPACE_QUALIFICATION.md](docs/WORKSPACE_QUALIFICATION.md) — No workspace or toolchain change.
- **reviewed_unchanged:** [docs/vision/requirements.csv](docs/vision/requirements.csv) — Requirement text unchanged; R29.007 acceptance is tracked in the backlog status.
- **historical_preserved:** [docs/plans/2026-10-15-play-04-design.md](docs/plans/2026-10-15-play-04-design.md) — Approved design preserved as written.
- **historical_preserved:** [docs/plans/2026-10-15-play-04-implementation.md](docs/plans/2026-10-15-play-04-implementation.md) — Implementation plan preserved as written.
- **historical_preserved:** [docs/reviews/2026-10-15-play-04-clocks.md](docs/reviews/2026-10-15-play-04-clocks.md) — Codex's independent review record preserved.

Full changed-file inventory: [record](docs/changes/CHG-20261015-008.json).

### Limits and next actions

- Evidence is local Linux Dev Container and headless Chromium only; injected UTC in the service probe; no Windows, device, GPU, load, remote network or production observation.
- RUN119 uses the stock client in a sequential loop; a custom client could hold the reservation more often. The closure rate depends on timing: RUN118's three-step repeated-concession section recorded no busy replies, while RUN119 closed the active client in 6 of 8 matches.
- Local isolated CI was not rerun (wall clock drifts against monotonic); hosted CI on the fix source follows publication and is recorded in a later change.
- Director decides R1: assign a small fix (a waiting player's command never holds the timed reservation, plus an opening regression) or accept it as a known limit and merge.
- After that decision: re-check any fix, run hosted CI, then publish and fast-forward main.
- Director decides the four audit policy points, including whether players may leave during the opening.

## CHG-20261015-007 — PLAY-04 audit fixes: admission without reservation and retryable live contention

- Status: finalized
- Actor: Codex architect/developer/QA collaborator
- Recorded (UTC): 2026-10-15T19:02:29.111Z
- Event: unknown; recorded retrospectively (recorded_only)
- Source: 37530699a332376320e2b0f03b22d3eddbd2d763
- Tasks: PLAY-04, DOC-01, DOC-02
- Features: F-MATCH-CLOCKS, F-LIVE-TRANSPORT, F-DB, F-DOCS, F-EVIDENCE
- Requirements: R02.030, R02.031, R29.006, R29.007, R30.010

### Changes

- **review:** Director assigns fixes for audit findings1/2 before integration. Verify clean audit3753069, unchanged main775994a and original running workspace/database. Confirm waiting-player reservation before actor check, busy converted to UNAVAILABLE then socket1012, and blanket deadline rejection including the waiting concession. Keep the four unassigned policy points and real-card chooser gate unchanged.
- **test:** RUN103 passes existing doctor/static/bootstrap/original database intake inside original Dev Container. Capture private preservation hashes/modes only in ignored0600 metadata. Mark obsolete whole-source verified feature entries pending before new tests/source.
- **test:** RED104/105/106/107 reproduce reservation/proof, BUSY versus UNAVAILABLE, waiting concession at cutoff and browser disconnect.104 busy fixture initially uses stale revision and is corrected before106. Preserve all outcomes.
- **fix:** Refuse waiting non-concession transactionally without timed lease/clock mutation; permit waiting concession across other deadline under unchanged fences; service BUSY maps to unchanged100ms rate_limited wire receipt without socket closure/durable receipt. No schemas, client, engine, SQL, dependency or host setting changes.
- **test:** RUN108 has21pass/5fail exposing changed system timeout busy/dead-lease ordering. Restore original ordering for normal reservations; RUN109 passes26checks, web types and scoped lint. Sequence three test-only PG queries afterward; final-source suites remain separate.
- **documentation:** Update current owning docs, audit status, backlog and handoff; preserve all historical records. Ruling: use existing live2/3 backpressure shape for internal BUSY, not a new wire outcome; this preserves closed version schemas and existing same-ID/same-socket client retry. Cost if wrong: separately version and qualify a new busy wire outcome. Director re-audit/hosted CI remain required.
- **test:** Final-source RUN110passes74DB/storage/match/live checks;111passes11Linux Chromium plus2Lab workers;112passes350project/406engine/1skip/2injection and frozen install/doctor/verify/types/lint/build/bootstrap DB. Valid timing pairs, identical0249c5a5fingerprint. No fresh fix-source hosted/isolated/clean-checkout/device/load/production acceptance inferred.
- **test:** RUN113 preserves failed overly broad runtime-drift assertion for an intentionally updated README. RUN114 corrects that inspection only and passes final source/private bytes/scope/policy/log-digest/current-secret/owned-process/listener preservation. No application change or suite rerun required.
- **documentation:** Finalize local repair scope and current owning docs/backlog/feature evidence/handoff; retain all historical audit and failure bytes. Main stays775994a. The full cumulative inventory is from main; fix-only review base3753069. Final RUN115 executes docs/staged/cumulative packaging, reporting its own actual outcome; no advance pass or finalized-history amendment.

### Verification

- **passed:** Unchanged audit-source intake: doctor, verify including docs, bootstrap and original authenticated database connection. Not fix acceptance. ([evidence](docs/validation/runs/RUN-20261015-103.json))
- **failed:** Expected RED actor/deadline defects, plus initially stale busy fixture. ([evidence](docs/validation/runs/RUN-20261015-104.json))
- **failed:** Expected RED real WebSocket maintenance/connection behavior. ([evidence](docs/validation/runs/RUN-20261015-105.json))
- **failed:** Corrected fixture RED: BUSY incorrectly UNAVAILABLE. ([evidence](docs/validation/runs/RUN-20261015-106.json))
- **failed:** Expected RED real Chromium same-socket retry. ([evidence](docs/validation/runs/RUN-20261015-107.json))
- **failed:** 21pass/5fail after initial repair; detects system timeout ordering regression. ([evidence](docs/validation/runs/RUN-20261015-108.json))
- **passed:** 26clock/storage/live checks plus web typecheck and scoped lint; later test-only sequential-query cleanup needs final-source suite. ([evidence](docs/validation/runs/RUN-20261015-109.json))
- **passed:** Final executable source: both role-health sets,5DB integration+3storage contract+66match/service/live/process checks=74; original bootstrap DB. Actual PostgreSQL/process/races, simulated UTC where declared. ([evidence](docs/validation/runs/RUN-20261015-110.json))
- **passed:** Final source:11actual Linux Chromium checks plus2Lab Web Workers; no Windows/device observation. ([evidence](docs/validation/runs/RUN-20261015-111.json))
- **passed:** Final source full foundation:350project=326Node+24Python,406upstream/1skip/2injection, frozen install/doctor/docs/types/lint/build/original DB. ([evidence](docs/validation/runs/RUN-20261015-112.json))
- **failed:** Packaging assertion mistakenly treats intentionally updated owning README as runtime drift; no application failure or source edit. ([evidence](docs/validation/runs/RUN-20261015-113.json))
- **passed:** Corrected scope proof: four runtime/four test files only, matching final source, private0600bytes, engine/SQL/lock/schemas/client/decisions/requirements/archive/main preserved,727log digests/current source secret scan/owned cleanup. ([evidence](docs/validation/runs/RUN-20261015-114.json))

### Documentation and files

- **updated:** [AGENTS.md](AGENTS.md) — Current admission/retry/fix status compared with source; update scoped behavior/evidence without changing historical proof or product gates.
- **updated:** [README.md](README.md) — Current admission/retry/fix status compared with source; update scoped behavior/evidence without changing historical proof or product gates.
- **updated:** [apps/match-service/README.md](apps/match-service/README.md) — Current admission/retry/fix status compared with source; update scoped behavior/evidence without changing historical proof or product gates.
- **updated:** [apps/web/README.md](apps/web/README.md) — Current admission/retry/fix status compared with source; update scoped behavior/evidence without changing historical proof or product gates.
- **updated:** [docs/FEATURES.md](docs/FEATURES.md) — Current admission/retry/fix status compared with source; update scoped behavior/evidence without changing historical proof or product gates.
- **updated:** [docs/HANDOFF.md](docs/HANDOFF.md) — Current admission/retry/fix status compared with source; update scoped behavior/evidence without changing historical proof or product gates.
- **updated:** [docs/README.md](docs/README.md) — Current admission/retry/fix status compared with source; update scoped behavior/evidence without changing historical proof or product gates.
- **updated:** [docs/WORKSPACE_QUALIFICATION.md](docs/WORKSPACE_QUALIFICATION.md) — Current admission/retry/fix status compared with source; update scoped behavior/evidence without changing historical proof or product gates.
- **reviewed_unchanged:** [docs/adr/0001-local-development-environment.md](docs/adr/0001-local-development-environment.md) — Compared with the scoped four-file repair: package/toolchain/engine/SQL/public-codec/identity/ownership/retention and admission policy remain unchanged; detailed admission/retry correction is owned by current clock/live documentation. Preserve this document and its dated evidence.
- **reviewed_unchanged:** [docs/adr/0002-application-foundation.md](docs/adr/0002-application-foundation.md) — Compared with the scoped four-file repair: package/toolchain/engine/SQL/public-codec/identity/ownership/retention and admission policy remain unchanged; detailed admission/retry correction is owned by current clock/live documentation. Preserve this document and its dated evidence.
- **reviewed_unchanged:** [docs/adr/0004-restricted-local-database.md](docs/adr/0004-restricted-local-database.md) — Compared with the scoped four-file repair: package/toolchain/engine/SQL/public-codec/identity/ownership/retention and admission policy remain unchanged; detailed admission/retry correction is owned by current clock/live documentation. Preserve this document and its dated evidence.
- **reviewed_unchanged:** [docs/adr/0006-protocol-release-contracts.md](docs/adr/0006-protocol-release-contracts.md) — Compared with the scoped four-file repair: package/toolchain/engine/SQL/public-codec/identity/ownership/retention and admission policy remain unchanged; detailed admission/retry correction is owned by current clock/live documentation. Preserve this document and its dated evidence.
- **reviewed_unchanged:** [docs/adr/0008-engine-placement-dependency-baseline.md](docs/adr/0008-engine-placement-dependency-baseline.md) — Compared with the scoped four-file repair: package/toolchain/engine/SQL/public-codec/identity/ownership/retention and admission policy remain unchanged; detailed admission/retry correction is owned by current clock/live documentation. Preserve this document and its dated evidence.
- **reviewed_unchanged:** [docs/adr/0013-durable-synthetic-match-commands.md](docs/adr/0013-durable-synthetic-match-commands.md) — Compared with the scoped four-file repair: package/toolchain/engine/SQL/public-codec/identity/ownership/retention and admission policy remain unchanged; detailed admission/retry correction is owned by current clock/live documentation. Preserve this document and its dated evidence.
- **reviewed_unchanged:** [docs/adr/0014-viewer-projection-privacy.md](docs/adr/0014-viewer-projection-privacy.md) — Compared with the scoped four-file repair: package/toolchain/engine/SQL/public-codec/identity/ownership/retention and admission policy remain unchanged; detailed admission/retry correction is owned by current clock/live documentation. Preserve this document and its dated evidence.
- **reviewed_unchanged:** [docs/adr/0015-live-synthetic-transport.md](docs/adr/0015-live-synthetic-transport.md) — Compared with the scoped four-file repair: package/toolchain/engine/SQL/public-codec/identity/ownership/retention and admission policy remain unchanged; detailed admission/retry correction is owned by current clock/live documentation. Preserve this document and its dated evidence.
- **updated:** [docs/adr/0016-durable-engine-clocks.md](docs/adr/0016-durable-engine-clocks.md) — Current admission/retry/fix status compared with source; update scoped behavior/evidence without changing historical proof or product gates.
- **reviewed_unchanged:** [docs/audits/2026-10-06-project-audit.md](docs/audits/2026-10-06-project-audit.md) — Compared with the scoped four-file repair: package/toolchain/engine/SQL/public-codec/identity/ownership/retention and admission policy remain unchanged; detailed admission/retry correction is owned by current clock/live documentation. Preserve this document and its dated evidence.
- **updated:** [docs/contracts/live.md](docs/contracts/live.md) — Current admission/retry/fix status compared with source; update scoped behavior/evidence without changing historical proof or product gates.
- **updated:** [docs/contracts/protocol.md](docs/contracts/protocol.md) — Current admission/retry/fix status compared with source; update scoped behavior/evidence without changing historical proof or product gates.
- **updated:** [docs/contracts/release.md](docs/contracts/release.md) — Current admission/retry/fix status compared with source; update scoped behavior/evidence without changing historical proof or product gates.
- **reviewed_unchanged:** [docs/contracts/viewer.md](docs/contracts/viewer.md) — Compared with the scoped four-file repair: package/toolchain/engine/SQL/public-codec/identity/ownership/retention and admission policy remain unchanged; detailed admission/retry correction is owned by current clock/live documentation. Preserve this document and its dated evidence.
- **reviewed_unchanged:** [docs/documentation-map.json](docs/documentation-map.json) — Compared with the scoped four-file repair: package/toolchain/engine/SQL/public-codec/identity/ownership/retention and admission policy remain unchanged; detailed admission/retry correction is owned by current clock/live documentation. Preserve this document and its dated evidence.
- **updated:** [docs/features.json](docs/features.json) — Current admission/retry/fix status compared with source; update scoped behavior/evidence without changing historical proof or product gates.
- **reviewed_unchanged:** [docs/plans/2026-10-06-boot-02-database.md](docs/plans/2026-10-06-boot-02-database.md) — Compared with the scoped four-file repair: package/toolchain/engine/SQL/public-codec/identity/ownership/retention and admission policy remain unchanged; detailed admission/retry correction is owned by current clock/live documentation. Preserve this document and its dated evidence.
- **reviewed_unchanged:** [docs/plans/2026-10-06-documentation-governance.md](docs/plans/2026-10-06-documentation-governance.md) — Compared with the scoped four-file repair: package/toolchain/engine/SQL/public-codec/identity/ownership/retention and admission policy remain unchanged; detailed admission/retry correction is owned by current clock/live documentation. Preserve this document and its dated evidence.
- **reviewed_unchanged:** [docs/plans/2026-10-07-boot-05-contracts.md](docs/plans/2026-10-07-boot-05-contracts.md) — Compared with the scoped four-file repair: package/toolchain/engine/SQL/public-codec/identity/ownership/retention and admission policy remain unchanged; detailed admission/retry correction is owned by current clock/live documentation. Preserve this document and its dated evidence.
- **reviewed_unchanged:** [docs/plans/2026-10-10-boot-04-decision-worksheet.md](docs/plans/2026-10-10-boot-04-decision-worksheet.md) — Compared with the scoped four-file repair: package/toolchain/engine/SQL/public-codec/identity/ownership/retention and admission policy remain unchanged; detailed admission/retry correction is owned by current clock/live documentation. Preserve this document and its dated evidence.
- **reviewed_unchanged:** [docs/policies/fan-content.md](docs/policies/fan-content.md) — Compared with the scoped four-file repair: package/toolchain/engine/SQL/public-codec/identity/ownership/retention and admission policy remain unchanged; detailed admission/retry correction is owned by current clock/live documentation. Preserve this document and its dated evidence.
- **updated:** [docs/runbooks/database.md](docs/runbooks/database.md) — Current admission/retry/fix status compared with source; update scoped behavior/evidence without changing historical proof or product gates.
- **updated:** [docs/runbooks/engine.md](docs/runbooks/engine.md) — Current admission/retry/fix status compared with source; update scoped behavior/evidence without changing historical proof or product gates.
- **updated:** [docs/runbooks/game-clocks.md](docs/runbooks/game-clocks.md) — Current admission/retry/fix status compared with source; update scoped behavior/evidence without changing historical proof or product gates.
- **updated:** [docs/runbooks/live-matches.md](docs/runbooks/live-matches.md) — Current admission/retry/fix status compared with source; update scoped behavior/evidence without changing historical proof or product gates.
- **updated:** [docs/runbooks/match-commands.md](docs/runbooks/match-commands.md) — Current admission/retry/fix status compared with source; update scoped behavior/evidence without changing historical proof or product gates.
- **reviewed_unchanged:** [docs/runbooks/viewer-privacy.md](docs/runbooks/viewer-privacy.md) — Compared with the scoped four-file repair: package/toolchain/engine/SQL/public-codec/identity/ownership/retention and admission policy remain unchanged; detailed admission/retry correction is owned by current clock/live documentation. Preserve this document and its dated evidence.
- **reviewed_unchanged:** [docs/runbooks/workspace-setup.md](docs/runbooks/workspace-setup.md) — Compared with the scoped four-file repair: package/toolchain/engine/SQL/public-codec/identity/ownership/retention and admission policy remain unchanged; detailed admission/retry correction is owned by current clock/live documentation. Preserve this document and its dated evidence.
- **reviewed_unchanged:** [docs/templates/change.json](docs/templates/change.json) — Compared with the scoped four-file repair: package/toolchain/engine/SQL/public-codec/identity/ownership/retention and admission policy remain unchanged; detailed admission/retry correction is owned by current clock/live documentation. Preserve this document and its dated evidence.
- **reviewed_unchanged:** [docs/validation/boot-01.md](docs/validation/boot-01.md) — Compared with the scoped four-file repair: package/toolchain/engine/SQL/public-codec/identity/ownership/retention and admission policy remain unchanged; detailed admission/retry correction is owned by current clock/live documentation. Preserve this document and its dated evidence.
- **updated:** [docs/validation/boot-02.md](docs/validation/boot-02.md) — Current admission/retry/fix status compared with source; update scoped behavior/evidence without changing historical proof or product gates.
- **reviewed_unchanged:** [docs/validation/boot-04.md](docs/validation/boot-04.md) — Compared with the scoped four-file repair: package/toolchain/engine/SQL/public-codec/identity/ownership/retention and admission policy remain unchanged; detailed admission/retry correction is owned by current clock/live documentation. Preserve this document and its dated evidence.
- **reviewed_unchanged:** [docs/validation/boot-05.md](docs/validation/boot-05.md) — Compared with the scoped four-file repair: package/toolchain/engine/SQL/public-codec/identity/ownership/retention and admission policy remain unchanged; detailed admission/retry correction is owned by current clock/live documentation. Preserve this document and its dated evidence.
- **updated:** [docs/validation/play-01.md](docs/validation/play-01.md) — Current admission/retry/fix status compared with source; update scoped behavior/evidence without changing historical proof or product gates.
- **updated:** [docs/validation/play-02.md](docs/validation/play-02.md) — Current admission/retry/fix status compared with source; update scoped behavior/evidence without changing historical proof or product gates.
- **updated:** [docs/validation/play-03.md](docs/validation/play-03.md) — Current admission/retry/fix status compared with source; update scoped behavior/evidence without changing historical proof or product gates.
- **updated:** [docs/validation/play-04.md](docs/validation/play-04.md) — Current admission/retry/fix status compared with source; update scoped behavior/evidence without changing historical proof or product gates.
- **updated:** [docs/validation/rule-03.md](docs/validation/rule-03.md) — Current admission/retry/fix status compared with source; update scoped behavior/evidence without changing historical proof or product gates.
- **reviewed_unchanged:** [docs/vision/README.md](docs/vision/README.md) — Compared with the scoped four-file repair: package/toolchain/engine/SQL/public-codec/identity/ownership/retention and admission policy remain unchanged; detailed admission/retry correction is owned by current clock/live documentation. Preserve this document and its dated evidence.
- **reviewed_unchanged:** [docs/vision/additional_scope.csv](docs/vision/additional_scope.csv) — Compared with the scoped four-file repair: package/toolchain/engine/SQL/public-codec/identity/ownership/retention and admission policy remain unchanged; detailed admission/retry correction is owned by current clock/live documentation. Preserve this document and its dated evidence.
- **reviewed_unchanged:** [docs/vision/decision_register.csv](docs/vision/decision_register.csv) — Compared with the scoped four-file repair: package/toolchain/engine/SQL/public-codec/identity/ownership/retention and admission policy remain unchanged; detailed admission/retry correction is owned by current clock/live documentation. Preserve this document and its dated evidence.
- **updated:** [docs/vision/initial_backlog.csv](docs/vision/initial_backlog.csv) — Current admission/retry/fix status compared with source; update scoped behavior/evidence without changing historical proof or product gates.
- **reviewed_unchanged:** [docs/vision/requirements.csv](docs/vision/requirements.csv) — Compared with the scoped four-file repair: package/toolchain/engine/SQL/public-codec/identity/ownership/retention and admission policy remain unchanged; detailed admission/retry correction is owned by current clock/live documentation. Preserve this document and its dated evidence.
- **updated:** [packages/contracts/README.md](packages/contracts/README.md) — Current admission/retry/fix status compared with source; update scoped behavior/evidence without changing historical proof or product gates.
- **updated:** [packages/db/README.md](packages/db/README.md) — Current admission/retry/fix status compared with source; update scoped behavior/evidence without changing historical proof or product gates.
- **updated:** [packages/engine-adapter/README.md](packages/engine-adapter/README.md) — Current admission/retry/fix status compared with source; update scoped behavior/evidence without changing historical proof or product gates.
- **updated:** [CHANGELOG.md](CHANGELOG.md) — Regenerate uniform finalized repair history and current source/file/function/status snapshot through final docs synchronization.
- **updated:** [docs/current-state.json](docs/current-state.json) — Regenerate uniform finalized repair history and current source/file/function/status snapshot through final docs synchronization.

Full changed-file inventory: [record](docs/changes/CHG-20261015-007.json).

### Limits and next actions

- Fix scope is waiting-player non-concession admission, brief reservation contention and waiting-player concession across the deadline. No core engine, SQL, duration/default/outage policy, host settings or deployment change.
- Main remains775994a. Director performs re-audit and hosted CI before integration; current prior hosted result qualifies the audit source only.
- Final proof fingerprint0249c5a5269b879224b4c6125a95147051aea7bdf556fa5da62b00e59808eaff. No fresh clean-checkout/isolated/hosted/device/load/absoluteUTC or promoted-artifact claim; unchanged-source prior evidence remains historical.
- Read final RUN115 packaging result, then keep the coherent committed local codex/play-04-audit-fixes branch ready for Director re-audit.
- Director re-checks and runs hosted CI before deciding publication/integration; main remains775994a. Four policy points and real-card chooser/production gates stay separate.

## CHG-20261015-006 — Director decision to fix the PLAY-04 audit finding before main integration, and hosted audit-branch run observation

- Status: finalized
- Actor: Claude Code agent (architect/QA reviewer role) on Director request, local WSL session
- Recorded (UTC): 2026-10-15T17:35:31.544Z
- Event: unknown; recorded retrospectively (recorded_only)
- Source: 926846dc2331c68d80386236b2ccd6350732e37e
- Tasks: PLAY-04, DOC-01, DOC-02
- Features: F-DOCS
- Requirements: none

### Changes

- **review:** After the CHG-20261015-005 audit, the Director chose 'fix first': finding 1 (a waiting opponent's command blocking the active player's reservation and closing their socket) and the minor concession refusal are to be fixed with regressions and fresh affected suites before PLAY-04 is accepted and integrated. Main stays at 775994a; both branches are published.
- **test:** RUN-20261015-101 observes public GitHub metadata for Foundation run 38776275959: attempt 1, workflow_dispatch on claude/play-04-audit at 926846d, job foundation success 2026-10-15T17:18:50Z-17:31:10Z, every step successful. No logs or artifacts downloaded; metadata only.
- **documentation:** Validation note for the decision and hosted run; AGENTS.md/README.md/docs/README.md audit lines now record the decision; backlog status set to fix-required-before-merge; handoff next actions updated.

### Verification

- **passed:** Public GitHub job/step metadata for hosted run 38776275959 at 926846d: success. No downloaded logs or artifacts. ([evidence](docs/validation/runs/RUN-20261015-101.json))
- **passed:** docs:check over the decision record and updated documents (static). ([evidence](docs/validation/runs/RUN-20261015-102.json))

### Documentation and files

- **updated:** [docs/validation/play-04.md](docs/validation/play-04.md) — Dated section recording the Director decision and the hosted audit-branch run.
- **updated:** [AGENTS.md](AGENTS.md) — Audit line updated from 'awaits decision' to the recorded fix-first decision and hosted run.
- **updated:** [README.md](README.md) — Same update as AGENTS.md.
- **updated:** [docs/README.md](docs/README.md) — Same update as AGENTS.md.
- **updated:** [docs/vision/initial_backlog.csv](docs/vision/initial_backlog.csv) — PLAY-04 status: fix required before merge.
- **updated:** [docs/HANDOFF.md](docs/HANDOFF.md) — Decision, hosted run, pending gates and next actions.
- **reviewed_unchanged:** [docs/adr/0016-durable-engine-clocks.md](docs/adr/0016-durable-engine-clocks.md) — Audit note already links the finding; the decision is operational sequencing, not an architectural change.
- **reviewed_unchanged:** [docs/runbooks/game-clocks.md](docs/runbooks/game-clocks.md) — Audit cautions remain in force until the fix change.
- **updated:** [CHANGELOG.md](CHANGELOG.md) — Regenerated by docs sync.
- **updated:** [docs/current-state.json](docs/current-state.json) — Regenerated by docs sync.

Full changed-file inventory: [record](docs/changes/CHG-20261015-006.json).

### Limits and next actions

- Hosted evidence is public metadata only; no hosted logs, artifacts or counts were downloaded.
- No product code changed; the finding remains open until a fix change.
- Assign the PLAY-04 fix (findings 1 and 2) with regressions and fresh affected suites; re-audit; run hosted CI; then publish and fast-forward main.
- Director decides the four policy points recorded in the audit.

## CHG-20261015-005 — Independent audit of PLAY-04 durable engine thinking-time clocks, with rules-parity focus

- Status: finalized
- Actor: Claude Code agent (architect/QA reviewer role) on Director request, local WSL session
- Recorded (UTC): 2026-10-15T17:15:50.719Z
- Event: unknown; recorded retrospectively (recorded_only)
- Source: 24d3990356ee95b626a34ce189f56c9cea003438
- Tasks: PLAY-04, DOC-01, DOC-02
- Features: F-DOCS, F-MATCH-CLOCKS
- Requirements: none

### Changes

- **review:** Audited Codex commit 24d3990 (PLAY-04, CHG-20261015-003/004) against D12, the approved design, ADR0016, the runbook and the backlog acceptance (fake-clock and real process tests; no disconnect/time abuse or duplicate terminal result). The review covered: the project bridge (pre-validation, CLOCK_PAUSED, restoreState with preserved history, controls built on upstream settle/pause/resume/reset helpers) against the upstream time-control and command pipeline; adapter policy validation, the positive timed start and private transcript v2 replay; migration 0005; clock-store reservation, commit, reject, abort, heartbeat, unsafe pause and audited control transactions; clock-service charge mapping (engine time = checkpoint engine time + UTC elapsed since anchor), timeout and recovery orchestration; health and runner; the live3 contracts, gateway and client estimate.
- **test:** Independent runs RUN-20261015-094..099 all passed at Codex's final fingerprint a41c1374 with exact timing, no clock discontinuity and 0 redactions. RUN094 full verify:foundation (350 project = 326 Node + 24 Python; 406 upstream/1 skip/1,362 expectations; 2 injection). RUN095 rules-parity probe: compiled timed bridge equals a raw unchanged-upstream MatchRuntime after all 918 accepted commands of 24 complete games (5,012 commands). Refusals differ only by time-neutral settlement, converging 587 of 587 times. Timed and untimed rules state, events (5,012) and legal moves (10,024) are identical. 168 exhausted passes restore exactly 125,000 ms. Boundaries are exact at 1 ms before zero, at zero and far past it; opening passes are flow-disallowed; pause, reset and backward controls behave as specified. RUN096 actual PostgreSQL/engine-worker service probe with simulated UTC and native values: an independent model matches every step, covering exact deadlines, the exact-deadline refusal, a single system timeout restoring 125 s, the opening pause, audited resume (forged, stale, retry, conflict, reset) and outage exclusion. RUN097 boundary/bundle/startup/upstream/public-clock/migration probe. RUN098 Codex database suites (66 plus role health). RUN099 Codex Chromium suites (10) plus 2 Lab workers.
- **review:** Findings. (1) Important: clock-service takes the timed reservation (status processing) before refusing a non-active participant, so the active player's concurrent move gets busy -> UNAVAILABLE and the live gateway closes their socket (1012) while their clock runs. The client backs off to 5 s and stops after 8 attempts. Reproduced at the service level in RUN096; this does not fully meet the backlog criterion 'no disconnect/time abuse' (R29.007). (2) Minor: between a deadline and the timeout commit, the waiting opponent's concession receives a permanent clock_expired receipt. Reproduced in RUN096. (3) Latent real-card gate: the active-player pre-check refuses the engine's resolveBag direct-chooser move. Unreachable with synthetic cards.
- **review:** Director policy points (behaviour matches the approved native design): a timeout pass can make the timed-out player lose by the CR 3.4.2 deck-out rule (16 occurrences in RUN095); an exhausted pass restores 125 s while a pass with 1 s left gives 66 s; opening timeouts always pause and audited resume needs an explicit reset; a process whose own health sample fails, including from a sweep longer than 15 s, stops adjudicating without pausing games, so on a single host every timed game needs a restart plus audited resume. Housekeeping: one running timed fixture from interrupted RUN050 and 31 expired quota rows remain in the test database.
- **review:** Verdict: rules parity correct and timing exact for the synthetic scope; all reported counts reproduced; PLAY-04 not accepted until finding 1 is fixed. Main integration awaits the Director's decision; main unchanged at 775994a.
- **documentation:** Validation audit section, ADR0016 audit note, runbook audit cautions, F-MATCH-CLOCKS register entry and a new FEATURES.md row (the stale mid-implementation paragraph is labeled historical), backlog status and link, dated audit line in AGENTS.md/README.md/docs/README.md, and the handoff.

### Verification

- **passed:** Timing-valid pnpm verify:foundation: 350 project checks (326 Node + 24 Python), 406 upstream passes/1 inherited skip/1,362 expectations, 2 injection tests. Local Dev Container. ([evidence](docs/validation/runs/RUN-20261015-094.json))
- **passed:** Auditor rules-parity probe (Bun): timed bridge vs raw unchanged upstream vs untimed bridge over 24 complete games; exact native boundaries and controls. Synthetic logical time. ([evidence](docs/validation/runs/RUN-20261015-095.json))
- **passed:** Auditor service probe on the actual test database and engine worker with simulated UTC and native values: charging, deadlines, timeout, recovery, outage; reproduces findings 1 and 2 (asserted as observations). ([evidence](docs/validation/runs/RUN-20261015-096.json))
- **passed:** Auditor boundary/bundle/startup/upstream/public-clock/migration and role probe on both databases. ([evidence](docs/validation/runs/RUN-20261015-097.json))
- **passed:** Codex database suites: role health on both targets, db:test 5, storage contract 3, match integration 58, db:check. ([evidence](docs/validation/runs/RUN-20261015-098.json))
- **passed:** Codex Chromium smoke (10 checks, one worker, including both clock chooser seats) and 2 Lab Web Worker checks. Linux headless Chromium only. ([evidence](docs/validation/runs/RUN-20261015-099.json))
- **passed:** docs:check over the completed audit documentation and evidence (static). ([evidence](docs/validation/runs/RUN-20261015-100.json))

### Documentation and files

- **updated:** [docs/validation/play-04.md](docs/validation/play-04.md) — Appended a dated independent-audit section: runs, rules-parity results, findings, Director policy points, housekeeping, verdict and the isolated-CI decision; Codex text unchanged.
- **updated:** [docs/adr/0016-durable-engine-clocks.md](docs/adr/0016-durable-engine-clocks.md) — Dated audit note: decision unchanged; parity confirmed; open finding and policy points linked.
- **updated:** [docs/runbooks/game-clocks.md](docs/runbooks/game-clocks.md) — Audit cautions: the busy window, concession refusal across the deadline window, the opening timeout reset and single-process quarantine recovery.
- **updated:** [docs/features.json](docs/features.json) — F-MATCH-CLOCKS description notes the audit result and open finding; audit runs added as evidence.
- **updated:** [docs/FEATURES.md](docs/FEATURES.md) — Added the missing F-MATCH-CLOCKS row with the audit limit; labeled the stale mid-implementation paragraph as historical rather than deleting it.
- **updated:** [docs/vision/initial_backlog.csv](docs/vision/initial_backlog.csv) — PLAY-04 status now records the open audit finding; CHG link added.
- **updated:** [docs/HANDOFF.md](docs/HANDOFF.md) — Audit state, verification, findings, pending Director decision and next actions.
- **updated:** [AGENTS.md](AGENTS.md) — Dated audit line after the PLAY-04 current block; Codex block text unchanged.
- **updated:** [README.md](README.md) — Same dated audit line as AGENTS.md.
- **updated:** [docs/README.md](docs/README.md) — Same dated audit line as AGENTS.md.
- **reviewed_unchanged:** [docs/WORKSPACE_QUALIFICATION.md](docs/WORKSPACE_QUALIFICATION.md) — Workspace qualification steps unaffected; follows the PLAY-02/PLAY-03 audit precedent.
- **reviewed_unchanged:** [docs/contracts/live.md](docs/contracts/live.md) — live3 contract matches the source and the RUN097 contract checks.
- **reviewed_unchanged:** [docs/contracts/protocol.md](docs/contracts/protocol.md) — Three-version range and diagnostic protocol 1 confirmed by RUN097.
- **reviewed_unchanged:** [docs/runbooks/database.md](docs/runbooks/database.md) — Migration 0005 operation matches RUN097; leftover test fixture recorded in validation instead.
- **reviewed_unchanged:** [docs/runbooks/live-matches.md](docs/runbooks/live-matches.md) — Live operation unchanged; the clock-specific socket closure caution is in the game-clock runbook.
- **historical_preserved:** [docs/plans/2026-10-15-play-04-design.md](docs/plans/2026-10-15-play-04-design.md) — Approved design kept as written; audit results live in validation.
- **historical_preserved:** [docs/plans/2026-10-15-play-04-implementation.md](docs/plans/2026-10-15-play-04-implementation.md) — Executed plan kept as written.
- **historical_preserved:** [docs/reviews/2026-10-15-play-04-clocks.md](docs/reviews/2026-10-15-play-04-clocks.md) — Codex's independent review report preserved; this audit is recorded separately.
- **reviewed_unchanged:** [docs/vision/requirements.csv](docs/vision/requirements.csv) — Requirement statuses remain pending; no acceptance change.
- **updated:** [CHANGELOG.md](CHANGELOG.md) — Regenerated by docs sync.
- **updated:** [docs/current-state.json](docs/current-state.json) — Regenerated by docs sync.

Full changed-file inventory: [record](docs/changes/CHG-20261015-005.json).

### Limits and next actions

- Audit evidence is local Linux Dev Container and headless Chromium only; simulated UTC in the service probe; no Windows, device, GPU, load, remote network or production observation.
- Finding 1 is reproduced at the service level with a 0.4 s cold-proof delay injected through the executor; the gateway socket closure and client backoff are established by code reading, not by an end-to-end wire test.
- Local isolated CI was not rerun (wall clock gains 1.3-1.7 ms/s against monotonic, near the unchanged 1 s guard); hosted CI is observed after publication and recorded in a later change.
- Probes are inline scripts recorded in the run commands; they are not committed test files.
- Director decides whether to integrate into main now with finding 1 as a must-fix follow-up or after a fix, and decides the four policy points.
- Fix finding 1 (refuse a non-active participant's non-concession command without taking the reservation; a retryable busy receipt without closing the socket) and finding 2 (concession across the deadline window), with regressions and fresh affected suites.
- Publish the branches, run hosted Foundation qualification on claude/play-04-audit and record the run IDs in the next change.

## CHG-20261015-004 — PLAY-04 closing receipt index and append-only packaging correction

- Status: finalized
- Actor: Codex architect/developer/QA collaborator
- Recorded (UTC): 2026-10-15T16:26:03.888Z
- Event: unknown; recorded retrospectively (recorded_only)
- Source: 2033396e6058a7eb97aece2605668b9e237a7ab7
- Tasks: PLAY-04, DOC-01, DOC-02
- Features: F-DOCS, F-EVIDENCE, F-MATCH-CLOCKS
- Requirements: R02.030, R02.031, R29.006, R29.007, R30.010

### Changes

- **revision:** Preserve finalized CHG003 bytes after its direct refresh correctly refused document drift with exit1. Restore the attempted uncommitted amendment from the exact staged checkpoint and create this append-only closing entry; do not weaken the guard or rewrite any executed receipt. The refusal was observed console output, not a fabricated recorder run.
- **test:** Index completed RUN092: documentation, current-source/log secret scan, staged whitespace, 667 canonical executable/config/test/schema files and 243-file cumulative inventory all passed. Prior full-source foundation/database/browser/clean/canonical acceptance remains bound to unchanged fingerprint a41c1374759fa3beb265e5944189a638184305b181f21518bdda6ae795620d59.
- **documentation:** Update current validation and handoff with the closing correction. Carry complete 246-file cumulative branch coverage, adding this entry and the RUN093 recorder pair. Final synchronization/check and staged identity execute under RUN093; its own immutable JSON/log report the outcome without a circular advance passing claim. No executable changes, new product scope, push, merge or environment mutation.

### Verification

- **passed:** Actual static packaging checkpoint: canonical equality of 667 executable/config/test/schema files, complete 243-file branch inventory at execution, documentation/changelog/source/log secrets and staged whitespace. Later closing prose/entry use final RUN093; do not infer a prior application-source change. ([evidence](docs/validation/runs/RUN-20261015-092.json))

### Documentation and files

- **updated:** [docs/validation/play-04.md](docs/validation/play-04.md) — Compare final receipts and actual guard refusal; distinguish the passing 243-file checkpoint from the additive 246-file closing inventory and retain exact source/evidence limits.
- **updated:** [docs/HANDOFF.md](docs/HANDOFF.md) — Index final receipt and correction for the next agent without implying a changed executable or predicting the closing recorder outcome.
- **reviewed_unchanged:** [docs/CHANGELOG_FORMAT.md](docs/CHANGELOG_FORMAT.md) — The existing append-only finalized-record rule and new-entry refresh rule cover this correction; no format/schema change is required.
- **historical_preserved:** [docs/changes/CHG-20261015-003.json](docs/changes/CHG-20261015-003.json) — Exact staged finalized checkpoint retained; the closing RUN092 index is appended in this record.
- **updated:** [CHANGELOG.md](CHANGELOG.md) — Deterministically render the new closing entry and completed receipt reference.
- **updated:** [docs/current-state.json](docs/current-state.json) — Regenerate documentation hashes/change statuses/callables under the new entry with the identical executable fingerprint.

Full changed-file inventory: [record](docs/changes/CHG-20261015-004.json).

### Limits and next actions

- No new application acceptance is inferred from receipt bookkeeping. RUN084–091 retain all exact source, execution category and remaining-gate limits.
- RUN093 is the final packaging execution record and is intentionally not self-referenced as passed before it executes. No fresh hosted CI, long isolated pipeline, Windows/device/production or permanent UTC repair claim.
- Read RUN093 actual result and commit only after the final packaging checks pass. Keep the scoped branch local for Director audit; do not push, merge main or start another workstream.

## CHG-20261015-003 — PLAY-04 durable native game clocks, reviewed repairs and full synthetic qualification

- Status: finalized
- Actor: Codex architect/developer/QA collaborator
- Recorded (UTC): 2026-10-15T16:07:29.227Z
- Event: unknown; recorded retrospectively (recorded_only)
- Source: 775994a82f5f003c4c4831a20791d5e904ff3d6b
- Tasks: PLAY-04, DOC-01, DOC-02
- Features: F-DOCS, F-CI, F-MATCH-CLOCKS, F-CONTRACTS, F-DB, F-MATCH-COMMANDS, F-ENGINE, F-PROTOCOL, F-RELEASE, F-HTTP, F-LIVE-TRANSPORT, F-MATCH-CLIENT, F-VIEWER-PRIVACY, F-EVIDENCE
- Requirements: R02.030, R02.031, R29.006, R29.007, R30.010

### Changes

- **review:** Inspect actual clean main775994a, original healthy Dev Container/database, current audit/authority/workflow and PLAY-04 blueprint/backlog/requirement/engine/replay/transport boundaries. Preserve unchanged source/private data, all548 requirements/20optional/device/disposition and admission gates. Open three material clock-policy questions before dependent implementation.
- **test:** RUN019 passes unchanged doctor/static/bootstrap/original database baseline inside the committed container. RUN020 observes prior PLAY-03 audit success and main initial failure/retry success at identical775994a from public GitHub job/step metadata; no downloaded logs/artifacts, fresh hosted test count or PLAY-04 acceptance inferred.
- **documentation:** Record both main attempts, Director-reported30-second startup-test flake and separate maintenance scope, PLAY-04 policy decisions pending, planned fake-time/process/race/privacy acceptance, architecture/clock investigation boundaries and current handoff. No application/dependency/schema/test logic change.
- **test:** RUN021 passes native intake document/source/callable/changelog consistency; RUN022 separately checks the archived public metadata collector syntax and strict lint. These are intake/tooling checks, not game-clock acceptance. Pending Director choices remain explicit and application source stays unchanged.
- **review:** Director explicitly selects configurable per-player banks, automatic turn passing on expiry and pause for audited infrastructure/time recovery. Initial loss recommendation is superseded; do not use forfeitGame for ordinary expiry. Ask targeted follow-ups on exhausted-bank refill/later turns and legal defaults versus pause when passing is not permitted. No dependent application code is implemented.
- **review:** Correct thinking-time versus ink terminology; Director explicitly selects existing engine replenishing timer, defined legal defaults otherwise pause, automatic pass and audited infrastructure/time pause, with upstream core/rules unchanged except demonstrated repair. D12 records final policies. Read actual native timer modes/helpers/history APIs and preserve loss/drop helpers as unselected behavior. Produce concrete written integration design for required review; no product implementation or plan approval yet.
- **test:** RUN023 freshly passes all37 unchanged selected upstream suites,406pass/1skip/0fail, including clock-view and time-control tests. Qualifies the existing pinned source only; not new timed-service acceptance.
- **documentation:** RUN024 passes policy/design documentation consistency. Present the complete written design for Director review, as required by the applied architectural brainstorming skill; record exact review boundary and keep implementation/launch acceptance pending.
- **review:** Director explicitly approves the written PLAY-04 clock design after it is presented. Preserve the earlier proposal/review checkpoint and advance to implementation planning; no product implementation or new clock acceptance yet. RUN025 passes unchanged application/upstream-source assertion, configured source secret-pattern scan and native docs consistency.
- **documentation:** Commit approved written design/intake as2033396, then prepare the five-task implementation plan with native engine reuse, typed clock controls/audited reset, fenced storage, server health/timeout runner, distinct live3 and browser estimates, precise checks and final review. Self-review fixes mismatched reset/disconnect interfaces. Plan review and execution-method selection remain pending; application source unchanged.
- **test:** RUN026 passes native documentation consistency after approved written design and prepared five-task implementation plan. Final source whitespace/application-preservation review passes; all app/upstream/config/dependency/test bytes remain unchanged. Plan review/execution-method choice remains pending.
- **review:** Director approves implementation plan and explicitly selects native execution. Apply executing-plans/TDD with one final independent reviewer, existing scoped branch/container and sequential heavy checks. Scratch ledger /tmp/play04-native-ledger.md is supplementary; repository CHG/HANDOFF remain universal authority. Current verified feature entries marked pending as new executable test/source work begins.
- **test:** Task1 writes closed policy/projection and actual adapter-clock tests before implementation: native125-second timeout pass arithmetic, pause/history/ref/replay preservation, invalid-command charging, audited reset/completion freeze and replay tampering. Capture expected negative run next.
- **implementation:** Implement qualification clock policy/projection codecs, optional native dynamic kernel clock and preserved runtime-history controls, private-v2 deterministic control reconstruction and compiled clock-policy identity. No upstream runtime/rules patch or player/Lab system authority added.
- **implementation:** Append migration0005 and fenced match-role clock/reservation/event repository with atomic creation/commits, deadline ordering, disjoint system receipts and legacy raw-candidate bypass refusal. Add owning workspace contracts edge only; offline frozen install. Service runner/recovery/live3/client integration and full acceptance remain pending.
- **test:** Preserve RED027/030 expected missing-feature failures,031 SQL-literal compile failure before migration and034 unused-initializer lint failure. Targeted028/032, broader029/033 and current lint/types/13targeted035 pass their exact sources. Both managed targets upgraded to0005 without changing old migrations; role and original match integration regressions pass.
- **review:** Record native execution rulings in current handoff: preserve original checkout/container; native recorder replaces generic skill test wrappers/scratch inventory; qualify three-version range explicitly at Task4; workspace-only dependency; crash phase-pause defers deterministic healthy-interval settlement; legal timeout pass may naturally satisfy existing engine win rules without timeout forfeiture.
- **documentation:** Maintain partial current function/package/runbook/ADR/validation ownership, planned/unaccepted clock feature, source verification pending, unchanged548 requirements/optional/disposition gates with scoped prerequisite links, and complete cumulative branch coverage.
- **implementation:** Task3 connects native timed jobs, monotonic-bracketed serialized database time health, short-reservation clock service, bounded non-overlapping runner, participant-only readClock and explicitly audited pause/reset/resume. Exact new-row creation ownership and observed independent heartbeat progress distinguish new/healthy servers from all-owner loss. Clock-only controls preserve engine version/card refs. Fair rotating storage scan avoids first-batch starvation. No host settings, upstream engine file or ordinary startup routes change.
- **fix:** Overlapping DB sample responses could falsely report calendar reversal. Added failing ordering regression RUN042, then serialized only time sampling; RUN043 passes. RUN041 test title overstated timely crossing: that original third case actually proves expired-lease fencing. Corrected its mutable test title and added a separate real timely-action/deadline-crossing test; RUN043 proves both.
- **implementation:** Task4 implements a separately closed live3 family, version-bound tickets/gateway/reference commands, clock-only revision publication and a browser monotonic estimate with defensive lifecycle clearing. Diagnostic1/live2 remain exact. Shared bounded range deliberately expands to3adjacent revisions; manifests now bind1..3 only after handlers exist. Pending schema1 pins2 and schema2 pins3; retry never relabels commands. RUN045 expected negative precedes implementation;046 catches type narrowing;04716contract/10client checks and0482real live3 gateway tests pass.049 retains a fixture lint failure; corrected without changing policies.
- **fix:** Bound process boundary waits and retain deliberate short gap/lease only in explicit failure scenarios. RUN050 passes six-way duplicate race but fails one after-COMMIT child admission then is interrupted because its boundary wait is unbounded; the long receipt also fails unchanged clock guard. RUN051 passes all13 real process/fault checks with normal15-second health limits and a5-second COMMIT fixture lease. No production timing limit or host setting is relaxed.
- **test:** RUN052 initial Chromium connection test fails;053 diagnostic test has a dynamic module typing startup error;054 passes after fixing that test URL. The initial receive failure remains undiagnosed, so a cold-cache proof without the extra diagnostic contract import is required. Preserve all outcomes; do not infer a fixed product bug from a retry.
- **fix:** Self-review adds RED055 then GREEN056 for completed-view versus running-clock consistency and native zero-start sentinel refusal. Clocked starts must be positive; untimed epoch-zero fixtures remain supported. This avoids native unset-start semantics without an upstream repair. Two independent private random worlds produce identical native clocks under the same time schedule.
- **review:** RUN057 cold-cache Chromium reproduces an opening-command failure; original Vite cache restored. RUN058 passes with additional safe public frame/status diagnostics, which alone does not establish a fix. RUN059 explicitly exercises both chooser seats and fails both: processing revision1 is followed by running revision0 (and3→2 on the next opening move), then the client correctly refuses the rewind. The failure occurs during opening submission, not initial connection; this corrects earlier informal localization.
- **test:** Write deterministic actual PostgreSQL blocked-heartbeat/read-snapshot regression and a simulated root-service shutdown sweep regression. Requested RUN060 is rejected before launch by automatic approval review after the Director instructs stop; no command result/log/receipt is fabricated. These new tests have not run. No production fix has been applied.
- **documentation:** Director explicitly stops work until tomorrow. Preserve dirty scoped branch, immutable prior results, original container/database/private files and all admission gates. Save exact suspected stale-lock snapshot mechanism, proposed next proof/fix steps, unexecuted tests and full remaining qualification/review/commit tasks.
- **documentation:** Stop-checkpoint documentation synchronization initially refuses missing apps/web README impact review. Add the explicit owning-browser review and stopped/unqualified harness note before regenerating the inventory; no development/test command is resumed. A second synchronization refuses the newly edited README missing from cumulative file coverage; refresh that coverage before the final documentation-only synchronization.
- **review:** Director explicitly resumes PLAY-04 the next day, superseding the stop instruction. Reinspect actual branch codex/play-04-game-clocks HEAD2033396, cumulative dirty source, original healthy Compose containers01ccec184b44/c7cd58258c19, source mount and Node24.21.0/pnpm10.33.0/nodeUID1000. No new container/host/clock/memory setting or publication change. Continue approved native plan, starting with the previously unexecuted deterministic regressions; no new implementation approval is required.
- **fix:** RUN062 deterministically reproduces both prior blockers: a real lock-wait heartbeat rewinds7→6, and simulated root shutdown starts two rows instead of one. Fix clock-store.locked by rereading a fresh SQL snapshot after both row locks; do not reuse pre-wait sidecar values. Signal runner and clock-service shutdown concurrently and drain both with allSettled before executor/storage close. RUN063 owning DB/service builds and13targeted regressions pass. No upstream or applied migration change.
- **test:** RUN064 passes both chooser seats in cold-cache Chromium after deterministic lock repair;065 passes six independent timeout repositories with participant/system namespace collisions and defensive client clock/pending-version tests. RUN066 demonstrates standalone clean DB dependency build failure,067 passes after root database scripts build their contracts dependency closure. No credentials copied or database contacted in the clean standalone probe.
- **revision:** Full-source073 install/doctor/static/types pass then strict lint rejects four unqualified browser globals in new client tests. Use explicit globalThis references as adjacent existing tests;074 detects stale generated source inventory before full suite. Both failures retained; refresh inventory before broad rerun. No runtime logic change.
- **revision:** Update owning HTTP negotiation regression for approved three-adjacent-version shared offer:1..3 is valid and diagnostic handler still chooses1,1..4 remains malformed400. RUN075 preserves the old expectation failure; no HTTP runtime codec or advertised diagnostic version changes.
- **review:** One fresh gpt-6-astra read-only independent review finds four Important and no Critical/Minor issues. Re-grade all four as important and fix in one pass; explicit excluded identity/card/production/retained-loader/final-evidence scopes retain their gates. No second review claimed.
- **fix:** RED078/079→GREEN080/082: quarantine locally unhealthy actors instead of globally pausing healthy owners; reserve before expensive proof replay; validate expired/backward rejected results under locks and commit safety pause before refusal; reclaim terminal continuity with generation-safe bounded active-ID batch and reserve enrollment capacity before durable creation. Add actual two-owner/cold-proof/short-lease/storage and simulated130completion/129probe/concurrent-final-slot regressions.
- **fix:** RED081→GREEN082 additionally refuses untimed setup under a live3-only release before persisting unsupported live2 rows. RUN077 retains a stale built-manifest range expectation failure; correct the test to1..3 while untimed matches still pin2. No selected test is removed.
- **test:** Final matching a41c1374 source passes084complete350project/406upstream+1skip/2injection;08566DB/storage/match;08610cold Chromium+2Lab;087clean and088canonical complete frozen foundation;089installed222components/0advisories/12notice gaps;090known/pattern/history2988blobs,703log digests, private-byte/mode/scope/upstream/earlierSQL preservation;091owned process/listener cleanup. All valid paired timing, one heavy workload at a time; no fresh isolated/hosted artifact/device or host repair inferred.
- **documentation:** Finalize synthetic task/feature evidence, five requirement prerequisite links without accepting original/device scope, complete chronological failure/correction table,20engineering rulings with costs, review exclusions, current runbook/ADR/package/current docs and universal handoff. Preserve old receipts and original548requirements/33groups/20optional. No new product workstream/publish/merge/deploy.

### Verification

- **passed:** PLAY-04 intake on merged PLAY-03 main775994a: unchanged doctor, static/docs, bootstrap and original database baseline ([evidence](docs/validation/runs/RUN-20261015-019.json))
- **passed:** PLAY-04 intake observes prior PLAY-03 audit success and main failure then retry success at identical775994a; public metadata only ([evidence](docs/validation/runs/RUN-20261015-020.json))
- **passed:** PLAY-04 intake documentation, merged hosted attempts and pending policy scope synchronization ([evidence](docs/validation/runs/RUN-20261015-021.json))
- **passed:** PLAY-04 intake public metadata collector syntax and unchanged strict lint rules ([evidence](docs/validation/runs/RUN-20261015-022.json))
- **passed:** Existing pinned upstream suites including timer/display support;406passed/1skip; no integrated PLAY-04 acceptance ([evidence](docs/validation/runs/RUN-20261015-023.json))
- **passed:** Confirmed Director clock policies and proposed written design: native documentation synchronization/check; no integrated timer acceptance ([evidence](docs/validation/runs/RUN-20261015-024.json))
- **passed:** Proposed design package: unchanged application/upstream source, configured source secret-pattern scan and docs consistency; no integrated timer proof ([evidence](docs/validation/runs/RUN-20261015-025.json))
- **passed:** Approved written design/prepared five-task implementation plan: native docs consistency; no product clock implementation accepted ([evidence](docs/validation/runs/RUN-20261015-026.json))
- **failed:** PLAY-04 task1 expected negative contracts and actual engine-clock tests before implementation ([evidence](docs/validation/runs/RUN-20261015-027.json))
- **passed:** PLAY-04 task1 targeted owning builds and new contracts/actual engine-clock regressions after implementation ([evidence](docs/validation/runs/RUN-20261015-028.json))
- **passed:** PLAY-04 task1 current owning builds and full contracts/adapter/upstream/injection/randomness/boundary regressions; later durable/service/client acceptance remains pending ([evidence](docs/validation/runs/RUN-20261015-029.json))
- **failed:** PLAY-04 task2 expected negative actual database-clock tests before durable repository implementation ([evidence](docs/validation/runs/RUN-20261015-030.json))
- **failed:** PLAY-04 task2 frozen offline workspace-edge install, DB compilation, additive test migration and actual storage-clock scenarios with injected time ([evidence](docs/validation/runs/RUN-20261015-031.json))
- **passed:** PLAY-04 task2 DB build and additive test migration/storage-clock scenarios after correcting SQL literal quoting; actual storage with injected time ([evidence](docs/validation/runs/RUN-20261015-032.json))
- **passed:** PLAY-04 task2 local additive migration, managed role/migration regressions and complete real match integration including clock-storage scenarios; no browser/service timer admission ([evidence](docs/validation/runs/RUN-20261015-033.json))
- **failed:** PLAY-04 adapter/storage checkpoint strict lint and owning TypeScript checks before server orchestration ([evidence](docs/validation/runs/RUN-20261015-034.json))
- **passed:** PLAY-04 adapter/storage checkpoint strict lint, owning type checks and13 targeted clock tests after removing unused initializer; actual DB storage uses simulated time ([evidence](docs/validation/runs/RUN-20261015-035.json))
- **passed:** PLAY-04 in-progress adapter/storage documentation, requirements gates, cumulative change coverage and native success/failure consistency ([evidence](docs/validation/runs/RUN-20261015-036.json))
- **failed:** PLAY-04 task3 expected negative clock-health, actual timeout/control-worker and timed-service tests before orchestration implementation ([evidence](docs/validation/runs/RUN-20261015-037.json))
- **passed:** PLAY-04 task3 owning DB/service build and clock-health/native timeout-worker checks after implementation ([evidence](docs/validation/runs/RUN-20261015-038.json))
- **failed:** PLAY-04 task3 expected negative owned-runner scheduling regression before runner implementation; previous four clock worker/health cases retained ([evidence](docs/validation/runs/RUN-20261015-039.json))
- **passed:** PLAY-04 task3 owning builds and health runner worker plus actual PostgreSQL service clock checks ([evidence](docs/validation/runs/RUN-20261015-040.json))
- **passed:** PLAY-04 real-time process runner continuity, owner death and six SQL rollback points ([evidence](docs/validation/runs/RUN-20261015-041.json))
- **failed:** PLAY-04 expected negative overlapping time-sample ordering regression ([evidence](docs/validation/runs/RUN-20261015-042.json))
- **passed:** PLAY-04 serialized health samples and real timed process deadline, recovery and transaction failure regressions ([evidence](docs/validation/runs/RUN-20261015-043.json))
- **passed:** PLAY-04 Task3 native source documentation synchronization and strict owning lint ([evidence](docs/validation/runs/RUN-20261015-044.json))
- **failed:** PLAY-04 Task4 expected negative separate live3 codecs and pure browser countdown estimate regressions ([evidence](docs/validation/runs/RUN-20261015-045.json))
- **failed:** PLAY-04 distinct live3 codec, transport and countdown client owning builds and contract/client regressions ([evidence](docs/validation/runs/RUN-20261015-046.json))
- **passed:** PLAY-04 separate live3 dispatch and browser estimate contract/client checks after type narrowing fix ([evidence](docs/validation/runs/RUN-20261015-047.json))
- **passed:** PLAY-04 actual live3 gateway clock-only updates, disconnect expiry, host-hop and version-bound ticket checks ([evidence](docs/validation/runs/RUN-20261015-048.json))
- **failed:** PLAY-04 strict types lint and full current contract client unit checks after real live3 gateway proof RUN048 ([evidence](docs/validation/runs/RUN-20261015-049.json))
- **failed:** PLAY-04 current strict owning lint and types plus real process six-server duplicate race and clock failure proofs ([evidence](docs/validation/runs/RUN-20261015-050.json))
- **passed:** PLAY-04 bounded real-process crash harness with production health limits except explicit outage/lease scenarios; six-way duplicate race retained ([evidence](docs/validation/runs/RUN-20261015-051.json))
- **failed:** PLAY-04 actual two-context Chromium timed live3, clock-only pause, disconnect expiry and gateway-hop recovery qualification ([evidence](docs/validation/runs/RUN-20261015-052.json))
- **failed:** PLAY-04 Chromium connection failure diagnosis with public-frame shape-only notes; no ticket or private payload logging ([evidence](docs/validation/runs/RUN-20261015-053.json))
- **passed:** PLAY-04 Chromium connection diagnosis after fixing test-only dynamic module URL typing ([evidence](docs/validation/runs/RUN-20261015-054.json))
- **failed:** PLAY-04 expected negative completed-view clock consistency and epoch-zero native sentinel admission regressions; independent private clock worlds ([evidence](docs/validation/runs/RUN-20261015-055.json))
- **passed:** PLAY-04 completed-view clock consistency and native sentinel refusal after RED055; independent private clock worlds and owning builds ([evidence](docs/validation/runs/RUN-20261015-056.json))
- **failed:** PLAY-04 cold-cache Chromium clock proof without extra diagnostic contract imports; original cache preserved ([evidence](docs/validation/runs/RUN-20261015-057.json))
- **passed:** PLAY-04 diagnose reproducible Chromium opening command receive failure with bounded public phase/version notes only ([evidence](docs/validation/runs/RUN-20261015-058.json))
- **failed:** PLAY-04 Chromium opening responsibility coverage for both randomized chooser seats with safe phase/version diagnosis ([evidence](docs/validation/runs/RUN-20261015-059.json))
- **passed:** PLAY-04 resumed original-container runtime bootstrap and authenticated original PostgreSQL baseline after Director restart ([evidence](docs/validation/runs/RUN-20261015-061.json))
- **failed:** PLAY-04 resumed expected negative actual blocked-heartbeat stale-snapshot and simulated stop-before-next-row regressions before repair ([evidence](docs/validation/runs/RUN-20261015-062.json))
- **passed:** PLAY-04 fresh locked clock snapshot and concurrent shutdown signaling after RED062; actual storage and simulated lifecycle regressions ([evidence](docs/validation/runs/RUN-20261015-063.json))
- **passed:** PLAY-04 both chooser-seat cold-cache Chromium clock and reconnect regressions after actual stale-lock repair ([evidence](docs/validation/runs/RUN-20261015-064.json))
- **passed:** PLAY-04 six independent timeout/namespace collision and live3 clock-copy/lifecycle/pending-version adversarial coverage ([evidence](docs/validation/runs/RUN-20261015-065.json))
- **failed:** PLAY-04 clean standalone database command dependency-order regression before correcting root selectors; invalid target prevents DB access ([evidence](docs/validation/runs/RUN-20261015-066.json))
- **passed:** PLAY-04 standalone clean database dependency closure after root selector fix; no credentials or DB connection ([evidence](docs/validation/runs/RUN-20261015-067.json))
- **failed:** Documentation sync requires explicit review of root package impact on the universal change format; no application failure. ([evidence](docs/validation/runs/RUN-20261015-068.json))
- **failed:** Document sync requests explicit root-package workflow review; no application failure. ([evidence](docs/validation/runs/RUN-20261015-069.json))
- **failed:** Documentation sync requires explicit root-package schema impact review; governance schemas remain unchanged. ([evidence](docs/validation/runs/RUN-20261015-070.json))
- **failed:** Documentation sync requests explicit owning match-client review after live3 implementation. ([evidence](docs/validation/runs/RUN-20261015-071.json))
- **passed:** PLAY-04 complete current documentation synchronization and consistency ([evidence](docs/validation/runs/RUN-20261015-072.json))
- **failed:** PLAY-04 final-source frozen install, toolchain, complete ordered foundation, original bootstrap and database checks; sequential workload ([evidence](docs/validation/runs/RUN-20261015-073.json))
- **failed:** PLAY-04 complete final-source foundation after explicit test-global lint correction; original database baseline ([evidence](docs/validation/runs/RUN-20261015-074.json))
- **failed:** Full source passes install/doctor/static/type/lint/build and preceding workspace suites; older HTTP test still treats approved three-version offer as malformed. Update its bounded-range expectation and retain revision1 diagnostic response. ([evidence](docs/validation/runs/RUN-20261015-075.json))
- **passed:** PLAY-04 HTTP negotiation compatibility after three-version range expectation update and client test lint correction ([evidence](docs/validation/runs/RUN-20261015-076.json))
- **failed:** PLAY-04 complete actual PostgreSQL role, migration and match integration checkpoint; simulated clock scenarios and actual process races ([evidence](docs/validation/runs/RUN-20261015-077.json))
- **failed:** PLAY-04 independent review expected negative: healthy owner isolation, cold admission, expired rejection and bounded lifetime creation ([evidence](docs/validation/runs/RUN-20261015-078.json))
- **failed:** PLAY-04 expected negative terminal probe reclamation and concurrent creation capacity regressions before review repair ([evidence](docs/validation/runs/RUN-20261015-079.json))
- **passed:** PLAY-04 independent review repairs: owning builds and complete clock unit/storage/service regressions after RED078 and079 ([evidence](docs/validation/runs/RUN-20261015-080.json))
- **failed:** PLAY-04 expected negative: untimed creation must not persist an unsupported live2 row under a live3-only retained release ([evidence](docs/validation/runs/RUN-20261015-081.json))
- **passed:** PLAY-04 review fix pass complete: owning builds strict lint and all clock unit/storage/service checks including early retained-pin refusal ([evidence](docs/validation/runs/RUN-20261015-082.json))
- **failed:** Final sync requires explicit service-runtime owning documentation review after its compatibility test changed; no full suite ran. ([evidence](docs/validation/runs/RUN-20261015-083.json))
- **passed:** PLAY-04 final reviewed source complete foundation: docs frozen install doctor static types lint builds all project upstream injection checks and original DB ([evidence](docs/validation/runs/RUN-20261015-084.json))
- **passed:** PLAY-04 final reviewed source complete actual PostgreSQL role/migration/storage/match/clock/gateway/process integration; simulated time labeled ([evidence](docs/validation/runs/RUN-20261015-085.json))
- **passed:** PLAY-04 final reviewed source cold Chromium all foundation live clock chooser-seat reconnect and Lab suites; Linux software WebGL ([evidence](docs/validation/runs/RUN-20261015-086.json))
- **passed:** PLAY-04 final reviewed source-only clean frozen install and entire foundation; no Git credentials dependencies built output or DB copied ([evidence](docs/validation/runs/RUN-20261015-087.json))
- **passed:** PLAY-04 final reviewed canonical Git-staged bytes exported to clean source copy frozen install and complete foundation ([evidence](docs/validation/runs/RUN-20261015-088.json))
- **passed:** PLAY-04 installed dependency lock/license/advisory policy and pinned vendor provenance; no deployed artifact ([evidence](docs/validation/runs/RUN-20261015-089.json))
- **passed:** PLAY-04 final source matching current full runs; unchanged private bytes/modes and scope, migrations, upstream, full-history secret/log integrity and owned resource cleanup ([evidence](docs/validation/runs/RUN-20261015-090.json))
- **passed:** PLAY-04 final owned clock/gateway/main process and port cleanup; ignored owner-only original credentials and private preservation metadata ([evidence](docs/validation/runs/RUN-20261015-091.json))

### Documentation and files

- **updated:** [AGENTS.md](AGENTS.md) — Review scope-relevant authority/ownership and dated evidence against optional adapter clocks and additive fenced storage. Update actual partial source/functions, schema0005, pending full verification and unchanged admission/device/host boundaries; prior executed results remain dated.
- **updated:** [README.md](README.md) — Review scope-relevant authority/ownership and dated evidence against optional adapter clocks and additive fenced storage. Update actual partial source/functions, schema0005, pending full verification and unchanged admission/device/host boundaries; prior executed results remain dated.
- **updated:** [apps/match-service/README.md](apps/match-service/README.md) — Document current PLAY-04 function signatures, authority, protocol dispatch, lifecycle and scoped qualification limits; preserve prior dated evidence.
- **updated:** [docs/FEATURES.md](docs/FEATURES.md) — Update actual PLAY-04 service/live3/estimate implementation and explicit pending full-source/browser acceptance; retain dated checks, failures and untouched host/upstream/admission limits.
- **updated:** [docs/HANDOFF.md](docs/HANDOFF.md) — Review scope-relevant authority/ownership and dated evidence against optional adapter clocks and additive fenced storage. Update actual partial source/functions, schema0005, pending full verification and unchanged admission/device/host boundaries; prior executed results remain dated.
- **updated:** [docs/README.md](docs/README.md) — Review scope-relevant authority/ownership and dated evidence against optional adapter clocks and additive fenced storage. Update actual partial source/functions, schema0005, pending full verification and unchanged admission/device/host boundaries; prior executed results remain dated.
- **updated:** [docs/WORKSPACE_QUALIFICATION.md](docs/WORKSPACE_QUALIFICATION.md) — Review scope-relevant authority/ownership and dated evidence against optional adapter clocks and additive fenced storage. Update actual partial source/functions, schema0005, pending full verification and unchanged admission/device/host boundaries; prior executed results remain dated.
- **reviewed_unchanged:** [docs/adr/0001-local-development-environment.md](docs/adr/0001-local-development-environment.md) — Review scope-relevant authority/ownership and dated evidence against optional adapter clocks and additive fenced storage. The original decision remains valid; ADR0016 adds the clock integration without changing provider/runtime/privacy/rules/role principles or historical acceptance.
- **reviewed_unchanged:** [docs/adr/0002-application-foundation.md](docs/adr/0002-application-foundation.md) — Review scope-relevant authority/ownership and dated evidence against optional adapter clocks and additive fenced storage. The original decision remains valid; ADR0016 adds the clock integration without changing provider/runtime/privacy/rules/role principles or historical acceptance.
- **reviewed_unchanged:** [docs/adr/0004-restricted-local-database.md](docs/adr/0004-restricted-local-database.md) — Review scope-relevant authority/ownership and dated evidence against optional adapter clocks and additive fenced storage. The original decision remains valid; ADR0016 adds the clock integration without changing provider/runtime/privacy/rules/role principles or historical acceptance.
- **reviewed_unchanged:** [docs/adr/0005-ci-artifact-qualification.md](docs/adr/0005-ci-artifact-qualification.md) — Review scope-relevant authority/ownership and dated evidence against optional adapter clocks and additive fenced storage. The original decision remains valid; ADR0016 adds the clock integration without changing provider/runtime/privacy/rules/role principles or historical acceptance.
- **reviewed_unchanged:** [docs/adr/0006-protocol-release-contracts.md](docs/adr/0006-protocol-release-contracts.md) — Review scope-relevant authority/ownership and dated evidence against optional adapter clocks and additive fenced storage. The original decision remains valid; ADR0016 adds the clock integration without changing provider/runtime/privacy/rules/role principles or historical acceptance.
- **reviewed_unchanged:** [docs/adr/0008-engine-placement-dependency-baseline.md](docs/adr/0008-engine-placement-dependency-baseline.md) — Review scope-relevant authority/ownership and dated evidence against optional adapter clocks and additive fenced storage. The original decision remains valid; ADR0016 adds the clock integration without changing provider/runtime/privacy/rules/role principles or historical acceptance.
- **reviewed_unchanged:** [docs/adr/0009-pinned-engine-qualification.md](docs/adr/0009-pinned-engine-qualification.md) — Review scope-relevant authority/ownership and dated evidence against optional adapter clocks and additive fenced storage. The original decision remains valid; ADR0016 adds the clock integration without changing provider/runtime/privacy/rules/role principles or historical acceptance.
- **reviewed_unchanged:** [docs/adr/0010-secure-randomness-replay.md](docs/adr/0010-secure-randomness-replay.md) — Review scope-relevant authority/ownership and dated evidence against optional adapter clocks and additive fenced storage. The original decision remains valid; ADR0016 adds the clock integration without changing provider/runtime/privacy/rules/role principles or historical acceptance.
- **reviewed_unchanged:** [docs/adr/0011-sourced-rule-scenarios.md](docs/adr/0011-sourced-rule-scenarios.md) — Review scope-relevant authority/ownership and dated evidence against optional adapter clocks and additive fenced storage. The original decision remains valid; ADR0016 adds the clock integration without changing provider/runtime/privacy/rules/role principles or historical acceptance.
- **reviewed_unchanged:** [docs/adr/0012-upstream-kernel-refresh.md](docs/adr/0012-upstream-kernel-refresh.md) — Review scope-relevant authority/ownership and dated evidence against optional adapter clocks and additive fenced storage. The original decision remains valid; ADR0016 adds the clock integration without changing provider/runtime/privacy/rules/role principles or historical acceptance.
- **reviewed_unchanged:** [docs/adr/0013-durable-synthetic-match-commands.md](docs/adr/0013-durable-synthetic-match-commands.md) — Review scope-relevant authority/ownership and dated evidence against optional adapter clocks and additive fenced storage. The original decision remains valid; ADR0016 adds the clock integration without changing provider/runtime/privacy/rules/role principles or historical acceptance.
- **reviewed_unchanged:** [docs/adr/0014-viewer-projection-privacy.md](docs/adr/0014-viewer-projection-privacy.md) — Review scope-relevant authority/ownership and dated evidence against optional adapter clocks and additive fenced storage. The original decision remains valid; ADR0016 adds the clock integration without changing provider/runtime/privacy/rules/role principles or historical acceptance.
- **reviewed_unchanged:** [docs/adr/0015-live-synthetic-transport.md](docs/adr/0015-live-synthetic-transport.md) — Review scope-relevant authority/ownership and dated evidence against optional adapter clocks and additive fenced storage. The original decision remains valid; ADR0016 adds the clock integration without changing provider/runtime/privacy/rules/role principles or historical acceptance.
- **updated:** [docs/adr/0016-durable-engine-clocks.md](docs/adr/0016-durable-engine-clocks.md) — Update actual PLAY-04 service/live3/estimate implementation and explicit pending full-source/browser acceptance; retain dated checks, failures and untouched host/upstream/admission limits.
- **reviewed_unchanged:** [docs/audits/2026-10-06-project-audit.md](docs/audits/2026-10-06-project-audit.md) — Review scope-relevant authority/ownership and dated evidence against optional adapter clocks and additive fenced storage. Owning existing behavior/source inventory or prior-source result stays valid as a dated checkpoint; new-clock acceptance is explicitly governed by current PLAY-04 validation, not inferred from it.
- **updated:** [docs/contracts/live.md](docs/contracts/live.md) — Document exact retained live2 versus separately closed live3, pinned tickets, pending schemas and non-authoritative browser estimates.
- **updated:** [docs/contracts/protocol.md](docs/contracts/protocol.md) — Review scope-relevant authority/ownership and dated evidence against optional adapter clocks and additive fenced storage. Update actual partial source/functions, schema0005, pending full verification and unchanged admission/device/host boundaries; prior executed results remain dated.
- **updated:** [docs/contracts/release.md](docs/contracts/release.md) — Review scope-relevant authority/ownership and dated evidence against optional adapter clocks and additive fenced storage. Update actual partial source/functions, schema0005, pending full verification and unchanged admission/device/host boundaries; prior executed results remain dated.
- **reviewed_unchanged:** [docs/contracts/viewer.md](docs/contracts/viewer.md) — Review scope-relevant authority/ownership and dated evidence against optional adapter clocks and additive fenced storage. Owning existing behavior/source inventory or prior-source result stays valid as a dated checkpoint; new-clock acceptance is explicitly governed by current PLAY-04 validation, not inferred from it.
- **updated:** [docs/documentation-map.json](docs/documentation-map.json) — Review scope-relevant authority/ownership and dated evidence against optional adapter clocks and additive fenced storage. Update actual partial source/functions, schema0005, pending full verification and unchanged admission/device/host boundaries; prior executed results remain dated.
- **updated:** [docs/features.json](docs/features.json) — Update actual PLAY-04 service/live3/estimate implementation and explicit pending full-source/browser acceptance; retain dated checks, failures and untouched host/upstream/admission limits.
- **reviewed_unchanged:** [docs/plans/2026-10-06-boot-02-database.md](docs/plans/2026-10-06-boot-02-database.md) — Review scope-relevant authority/ownership and dated evidence against optional adapter clocks and additive fenced storage. Owning existing behavior/source inventory or prior-source result stays valid as a dated checkpoint; new-clock acceptance is explicitly governed by current PLAY-04 validation, not inferred from it.
- **reviewed_unchanged:** [docs/plans/2026-10-06-documentation-governance.md](docs/plans/2026-10-06-documentation-governance.md) — Review scope-relevant authority/ownership and dated evidence against optional adapter clocks and additive fenced storage. Owning existing behavior/source inventory or prior-source result stays valid as a dated checkpoint; new-clock acceptance is explicitly governed by current PLAY-04 validation, not inferred from it.
- **reviewed_unchanged:** [docs/plans/2026-10-07-boot-03-ci.md](docs/plans/2026-10-07-boot-03-ci.md) — Review scope-relevant authority/ownership and dated evidence against optional adapter clocks and additive fenced storage. Owning existing behavior/source inventory or prior-source result stays valid as a dated checkpoint; new-clock acceptance is explicitly governed by current PLAY-04 validation, not inferred from it.
- **reviewed_unchanged:** [docs/plans/2026-10-07-boot-05-contracts.md](docs/plans/2026-10-07-boot-05-contracts.md) — Review scope-relevant authority/ownership and dated evidence against optional adapter clocks and additive fenced storage. Owning existing behavior/source inventory or prior-source result stays valid as a dated checkpoint; new-clock acceptance is explicitly governed by current PLAY-04 validation, not inferred from it.
- **reviewed_unchanged:** [docs/plans/2026-10-10-boot-04-decision-worksheet.md](docs/plans/2026-10-10-boot-04-decision-worksheet.md) — Review scope-relevant authority/ownership and dated evidence against optional adapter clocks and additive fenced storage. Owning existing behavior/source inventory or prior-source result stays valid as a dated checkpoint; new-clock acceptance is explicitly governed by current PLAY-04 validation, not inferred from it.
- **reviewed_unchanged:** [docs/plans/2026-10-13-upstream-engine-review.md](docs/plans/2026-10-13-upstream-engine-review.md) — Review scope-relevant authority/ownership and dated evidence against optional adapter clocks and additive fenced storage. Owning existing behavior/source inventory or prior-source result stays valid as a dated checkpoint; new-clock acceptance is explicitly governed by current PLAY-04 validation, not inferred from it.
- **updated:** [docs/plans/2026-10-15-play-04-design.md](docs/plans/2026-10-15-play-04-design.md) — Record the final clarified thinking-time policy without changing ink/rules, distinguish existing upstream timer proof from pending durable integration, and make the concrete design/review gate available to any developer.
- **updated:** [docs/plans/2026-10-15-play-04-implementation.md](docs/plans/2026-10-15-play-04-implementation.md) — Provide implementation-ready task/interfaces, exact checks and current review/execution-method boundary from the approved design, without claiming executed implementation or acceptance.
- **updated:** [docs/plans/2026-10-15-play-04-intake.md](docs/plans/2026-10-15-play-04-intake.md) — Record the final clarified thinking-time policy without changing ink/rules, distinguish existing upstream timer proof from pending durable integration, and make the concrete design/review gate available to any developer.
- **reviewed_unchanged:** [docs/policies/fan-content.md](docs/policies/fan-content.md) — Review scope-relevant authority/ownership and dated evidence against optional adapter clocks and additive fenced storage. Owning existing behavior/source inventory or prior-source result stays valid as a dated checkpoint; new-clock acceptance is explicitly governed by current PLAY-04 validation, not inferred from it.
- **reviewed_unchanged:** [docs/rules/README.md](docs/rules/README.md) — Review scope-relevant authority/ownership and dated evidence against optional adapter clocks and additive fenced storage. Owning existing behavior/source inventory or prior-source result stays valid as a dated checkpoint; new-clock acceptance is explicitly governed by current PLAY-04 validation, not inferred from it.
- **reviewed_unchanged:** [docs/rules/source-specs-supplement.json](docs/rules/source-specs-supplement.json) — Review scope-relevant authority/ownership and dated evidence against optional adapter clocks and additive fenced storage. Structured baseline/template source semantics and schema1 are unchanged; no card-source inventory, optional/disposition or new automatic acceptance is authorized.
- **reviewed_unchanged:** [docs/rules/source-specs.json](docs/rules/source-specs.json) — Review scope-relevant authority/ownership and dated evidence against optional adapter clocks and additive fenced storage. Structured baseline/template source semantics and schema1 are unchanged; no card-source inventory, optional/disposition or new automatic acceptance is authorized.
- **updated:** [docs/runbooks/ci.md](docs/runbooks/ci.md) — Review scope-relevant authority/ownership and dated evidence against optional adapter clocks and additive fenced storage. Update actual partial source/functions, schema0005, pending full verification and unchanged admission/device/host boundaries; prior executed results remain dated.
- **updated:** [docs/runbooks/database.md](docs/runbooks/database.md) — Document migration0005, match-role clock authority, fresh locked reads and root DB commands building their new shared contracts dependency.
- **updated:** [docs/runbooks/engine.md](docs/runbooks/engine.md) — Review scope-relevant authority/ownership and dated evidence against optional adapter clocks and additive fenced storage. Update actual partial source/functions, schema0005, pending full verification and unchanged admission/device/host boundaries; prior executed results remain dated.
- **updated:** [docs/runbooks/game-clocks.md](docs/runbooks/game-clocks.md) — Review scope-relevant authority/ownership and dated evidence against optional adapter clocks and additive fenced storage. Update actual partial source/functions, schema0005, pending full verification and unchanged admission/device/host boundaries; prior executed results remain dated.
- **updated:** [docs/runbooks/live-matches.md](docs/runbooks/live-matches.md) — Update actual PLAY-04 service/live3/estimate implementation and explicit pending full-source/browser acceptance; retain dated checks, failures and untouched host/upstream/admission limits.
- **updated:** [docs/runbooks/match-commands.md](docs/runbooks/match-commands.md) — Review scope-relevant authority/ownership and dated evidence against optional adapter clocks and additive fenced storage. Update actual partial source/functions, schema0005, pending full verification and unchanged admission/device/host boundaries; prior executed results remain dated.
- **reviewed_unchanged:** [docs/runbooks/rules-certification.md](docs/runbooks/rules-certification.md) — Review scope-relevant authority/ownership and dated evidence against optional adapter clocks and additive fenced storage. Owning existing behavior/source inventory or prior-source result stays valid as a dated checkpoint; new-clock acceptance is explicitly governed by current PLAY-04 validation, not inferred from it.
- **reviewed_unchanged:** [docs/runbooks/viewer-privacy.md](docs/runbooks/viewer-privacy.md) — Review scope-relevant authority/ownership and dated evidence against optional adapter clocks and additive fenced storage. Owning existing behavior/source inventory or prior-source result stays valid as a dated checkpoint; new-clock acceptance is explicitly governed by current PLAY-04 validation, not inferred from it.
- **reviewed_unchanged:** [docs/runbooks/workspace-setup.md](docs/runbooks/workspace-setup.md) — Review scope-relevant authority/ownership and dated evidence against optional adapter clocks and additive fenced storage. Owning existing behavior/source inventory or prior-source result stays valid as a dated checkpoint; new-clock acceptance is explicitly governed by current PLAY-04 validation, not inferred from it.
- **reviewed_unchanged:** [docs/templates/card-certification.json](docs/templates/card-certification.json) — Review scope-relevant authority/ownership and dated evidence against optional adapter clocks and additive fenced storage. Structured baseline/template source semantics and schema1 are unchanged; no card-source inventory, optional/disposition or new automatic acceptance is authorized.
- **reviewed_unchanged:** [docs/templates/change.json](docs/templates/change.json) — Review scope-relevant authority/ownership and dated evidence against optional adapter clocks and additive fenced storage. Structured baseline/template source semantics and schema1 are unchanged; no card-source inventory, optional/disposition or new automatic acceptance is authorized.
- **reviewed_unchanged:** [docs/validation/boot-01.md](docs/validation/boot-01.md) — Review scope-relevant authority/ownership and dated evidence against optional adapter clocks and additive fenced storage. Owning existing behavior/source inventory or prior-source result stays valid as a dated checkpoint; new-clock acceptance is explicitly governed by current PLAY-04 validation, not inferred from it.
- **updated:** [docs/validation/boot-02.md](docs/validation/boot-02.md) — Review scope-relevant authority/ownership and dated evidence against optional adapter clocks and additive fenced storage. Update actual partial source/functions, schema0005, pending full verification and unchanged admission/device/host boundaries; prior executed results remain dated.
- **reviewed_unchanged:** [docs/validation/boot-03.md](docs/validation/boot-03.md) — Review scope-relevant authority/ownership and dated evidence against optional adapter clocks and additive fenced storage. Owning existing behavior/source inventory or prior-source result stays valid as a dated checkpoint; new-clock acceptance is explicitly governed by current PLAY-04 validation, not inferred from it.
- **reviewed_unchanged:** [docs/validation/boot-04.md](docs/validation/boot-04.md) — Review scope-relevant authority/ownership and dated evidence against optional adapter clocks and additive fenced storage. Owning existing behavior/source inventory or prior-source result stays valid as a dated checkpoint; new-clock acceptance is explicitly governed by current PLAY-04 validation, not inferred from it.
- **reviewed_unchanged:** [docs/validation/boot-05.md](docs/validation/boot-05.md) — Review scope-relevant authority/ownership and dated evidence against optional adapter clocks and additive fenced storage. Owning existing behavior/source inventory or prior-source result stays valid as a dated checkpoint; new-clock acceptance is explicitly governed by current PLAY-04 validation, not inferred from it.
- **updated:** [docs/validation/play-01.md](docs/validation/play-01.md) — Review scope-relevant authority/ownership and dated evidence against optional adapter clocks and additive fenced storage. Update actual partial source/functions, schema0005, pending full verification and unchanged admission/device/host boundaries; prior executed results remain dated.
- **updated:** [docs/validation/play-02.md](docs/validation/play-02.md) — Review scope-relevant authority/ownership and dated evidence against optional adapter clocks and additive fenced storage. Update actual partial source/functions, schema0005, pending full verification and unchanged admission/device/host boundaries; prior executed results remain dated.
- **updated:** [docs/validation/play-03.md](docs/validation/play-03.md) — Review scope-relevant authority/ownership and dated evidence against optional adapter clocks and additive fenced storage. Update actual partial source/functions, schema0005, pending full verification and unchanged admission/device/host boundaries; prior executed results remain dated.
- **updated:** [docs/validation/play-04.md](docs/validation/play-04.md) — Review scope-relevant authority/ownership and dated evidence against optional adapter clocks and additive fenced storage. Update actual partial source/functions, schema0005, pending full verification and unchanged admission/device/host boundaries; prior executed results remain dated.
- **reviewed_unchanged:** [docs/validation/rule-01.md](docs/validation/rule-01.md) — Review scope-relevant authority/ownership and dated evidence against optional adapter clocks and additive fenced storage. Owning existing behavior/source inventory or prior-source result stays valid as a dated checkpoint; new-clock acceptance is explicitly governed by current PLAY-04 validation, not inferred from it.
- **reviewed_unchanged:** [docs/validation/rule-02.md](docs/validation/rule-02.md) — Review scope-relevant authority/ownership and dated evidence against optional adapter clocks and additive fenced storage. Owning existing behavior/source inventory or prior-source result stays valid as a dated checkpoint; new-clock acceptance is explicitly governed by current PLAY-04 validation, not inferred from it.
- **updated:** [docs/validation/rule-03.md](docs/validation/rule-03.md) — Review scope-relevant authority/ownership and dated evidence against optional adapter clocks and additive fenced storage. Update actual partial source/functions, schema0005, pending full verification and unchanged admission/device/host boundaries; prior executed results remain dated.
- **reviewed_unchanged:** [docs/validation/rule-04.md](docs/validation/rule-04.md) — Review scope-relevant authority/ownership and dated evidence against optional adapter clocks and additive fenced storage. Owning existing behavior/source inventory or prior-source result stays valid as a dated checkpoint; new-clock acceptance is explicitly governed by current PLAY-04 validation, not inferred from it.
- **reviewed_unchanged:** [docs/validation/upstream-engine-review.md](docs/validation/upstream-engine-review.md) — Review scope-relevant authority/ownership and dated evidence against optional adapter clocks and additive fenced storage. Owning existing behavior/source inventory or prior-source result stays valid as a dated checkpoint; new-clock acceptance is explicitly governed by current PLAY-04 validation, not inferred from it.
- **reviewed_unchanged:** [docs/vision/README.md](docs/vision/README.md) — Review scope-relevant authority/ownership and dated evidence against optional adapter clocks and additive fenced storage. Owning existing behavior/source inventory or prior-source result stays valid as a dated checkpoint; new-clock acceptance is explicitly governed by current PLAY-04 validation, not inferred from it.
- **reviewed_unchanged:** [docs/vision/additional_scope.csv](docs/vision/additional_scope.csv) — Review scope-relevant authority/ownership and dated evidence against optional adapter clocks and additive fenced storage. Structured baseline/template source semantics and schema1 are unchanged; no card-source inventory, optional/disposition or new automatic acceptance is authorized.
- **updated:** [docs/vision/decision_register.csv](docs/vision/decision_register.csv) — Review scope-relevant authority/ownership and dated evidence against optional adapter clocks and additive fenced storage. Update actual partial source/functions, schema0005, pending full verification and unchanged admission/device/host boundaries; prior executed results remain dated.
- **updated:** [docs/vision/initial_backlog.csv](docs/vision/initial_backlog.csv) — Review scope-relevant authority/ownership and dated evidence against optional adapter clocks and additive fenced storage. Update actual partial source/functions, schema0005, pending full verification and unchanged admission/device/host boundaries; prior executed results remain dated.
- **updated:** [docs/vision/requirements.csv](docs/vision/requirements.csv) — Review scope-relevant authority/ownership and dated evidence against optional adapter clocks and additive fenced storage. Update actual partial source/functions, schema0005, pending full verification and unchanged admission/device/host boundaries; prior executed results remain dated.
- **updated:** [packages/contracts/README.md](packages/contracts/README.md) — Review scope-relevant authority/ownership and dated evidence against optional adapter clocks and additive fenced storage. Update actual partial source/functions, schema0005, pending full verification and unchanged admission/device/host boundaries; prior executed results remain dated.
- **updated:** [packages/db/README.md](packages/db/README.md) — Document current PLAY-04 function signatures, authority, protocol dispatch, lifecycle and scoped qualification limits; preserve prior dated evidence.
- **updated:** [packages/engine-adapter/README.md](packages/engine-adapter/README.md) — Review scope-relevant authority/ownership and dated evidence against optional adapter clocks and additive fenced storage. Update actual partial source/functions, schema0005, pending full verification and unchanged admission/device/host boundaries; prior executed results remain dated.
- **reviewed_unchanged:** [packages/engine-lab/README.md](packages/engine-lab/README.md) — Review scope-relevant authority/ownership and dated evidence against optional adapter clocks and additive fenced storage. Owning existing behavior/source inventory or prior-source result stays valid as a dated checkpoint; new-clock acceptance is explicitly governed by current PLAY-04 validation, not inferred from it.
- **updated:** [vendor/tcg-engines/README.md](vendor/tcg-engines/README.md) — Review scope-relevant authority/ownership and dated evidence against optional adapter clocks and additive fenced storage. Update actual partial source/functions, schema0005, pending full verification and unchanged admission/device/host boundaries; prior executed results remain dated.
- **updated:** [apps/web/README.md](apps/web/README.md) — Document synthetic timed Chromium qualification for both chooser seats after demonstrated DB lock repair; no final product/device acceptance.
- **reviewed_unchanged:** [docs/CHANGELOG_FORMAT.md](docs/CHANGELOG_FORMAT.md) — Root DB build selectors now include contracts dependency closure; native evidence schema, cumulative coverage, immutable runs and timing contract remain unchanged.
- **reviewed_unchanged:** [docs/DEVELOPMENT_WORKFLOW.md](docs/DEVELOPMENT_WORKFLOW.md) — Native evidence, sequential workloads and full final-source qualification remain required; DB selector fix introduces no workflow exception.
- **reviewed_unchanged:** [docs/adr/0003-documentation-evidence.md](docs/adr/0003-documentation-evidence.md) — No documentation/evidence schema or architectural governance change; root DB dependency build correction uses the same recorded checks.
- **reviewed_unchanged:** [docs/templates/handoff.md](docs/templates/handoff.md) — Current handoff rewritten with the same universal fields; template unchanged.
- **reviewed_unchanged:** [docs/adr/0007-hosting-provider-baseline.md](docs/adr/0007-hosting-provider-baseline.md) — No provider, service, expenditure or capacity decision changes from root DB build ordering; hosting remains unprovisioned.
- **reviewed_unchanged:** [docs/schemas/change.schema.json](docs/schemas/change.schema.json) — Review root build-order impact against schema required fields and consumers: no schema or certification/evidence format changes. New game-clock codecs live in contracts, not governance schemas.
- **reviewed_unchanged:** [docs/schemas/documentation-map.schema.json](docs/schemas/documentation-map.schema.json) — Review root build-order impact against schema required fields and consumers: no schema or certification/evidence format changes. New game-clock codecs live in contracts, not governance schemas.
- **reviewed_unchanged:** [docs/schemas/state.schema.json](docs/schemas/state.schema.json) — Review root build-order impact against schema required fields and consumers: no schema or certification/evidence format changes. New game-clock codecs live in contracts, not governance schemas.
- **reviewed_unchanged:** [docs/schemas/features.schema.json](docs/schemas/features.schema.json) — Review root build-order impact against schema required fields and consumers: no schema or certification/evidence format changes. New game-clock codecs live in contracts, not governance schemas.
- **reviewed_unchanged:** [docs/schemas/run.schema.json](docs/schemas/run.schema.json) — Review root build-order impact against schema required fields and consumers: no schema or certification/evidence format changes. New game-clock codecs live in contracts, not governance schemas.
- **reviewed_unchanged:** [docs/schemas/card-certification.schema.json](docs/schemas/card-certification.schema.json) — Review root build-order impact against schema required fields and consumers: no schema or certification/evidence format changes. New game-clock codecs live in contracts, not governance schemas.
- **updated:** [packages/match-client/README.md](packages/match-client/README.md) — Describe actual protocols2/3, onClock defensive lifecycle, monotonic estimate ownership and exact restored pending command version; real sign-in and game UI remain separate.
- **historical_preserved:** [docs/reviews/2026-10-15-play-04-clocks.md](docs/reviews/2026-10-15-play-04-clocks.md) — Record the independent read-only report and author RED→GREEN dispositions, explicit declined scopes and no second-review claim.
- **updated:** [packages/service-runtime/README.md](packages/service-runtime/README.md) — Owning HTTP compatibility regression accepts bounded1..3 offers but retains literal1 diagnostic handler and refuses1..4; document exact unchanged runtime behavior.

Full changed-file inventory: [record](docs/changes/CHG-20261015-003.json).

### Limits and next actions

- Synthetic two-player technical qualification only; normal startup remains diagnostics-only. AUTH/admin/official cards/choices/rules/ordinary Lab/Collection/rewards/observers/private replay/multiplayer/device/load/production and launch durations remain gated.
- No fresh isolated/hosted14-stage CI/artifact promotion, required-check settings or absolute UTC qualification. Preserve prior clock-rejected receipts; no host service/clock/memory/pagefile/evidence-guard change.
- Dependency report covers installed Linux graph/vendor only;12packages lack root notice files. OS/Bun/Chromium and redistribution/legal qualification remain separate.
- Full-length real-card replay/event-cap, per-tick AUTH cost, quota retention, backup secrecy, retained loaders and operational health recovery need their documented later evidence. Memory peaks unknown; private-byte preservation starts at the recorded later checkpoint.
- Director independently audits the local PLAY-04 branch, then decides publication and main integration.
- Select the next documented UX/AUTH/WEB workstream after review; preserve all prerequisite/admission/device/production gates.

## CHG-20261015-002 — Independent audit of PLAY-03 live synthetic transport and reconnect and Director-requested integration into main

- Status: finalized
- Actor: Claude Code agent (architect/QA reviewer role) on Director request, local WSL session
- Recorded (UTC): 2026-10-15T04:17:17.683Z
- Event: unknown; recorded retrospectively (recorded_only)
- Source: 743f0b2072bde3b0c02bb99d9064804ffa51e59f
- Tasks: PLAY-03, DOC-01, DOC-02
- Features: F-DOCS, F-LIVE-TRANSPORT, F-MATCH-CLIENT, F-MATCH-COMMANDS
- Requirements: none

### Changes

- **review:** Audited Codex commits 6f3b45e (PLAY-03, CHG-20261014-006) and 743f0b2 (packaging correction CHG-20261015-001) against ADR0015, the live contract, the runbook, the intake/plan and the backlog acceptance (two real clients complete a game, reconnect on a different host and resolve a duplicate pending command). Review covered: closed protocol 2 schemas and frame bounds beside unchanged diagnostic protocol 1; ticket issue/consume SQL (participant/release/protocol join, SHA-256 storage, atomic single-use DELETE bound to origin and expiry); gateway admission order, exact Origins and synchronous per-actor reservation; session rechecks before and after each projection; submitRefs hashing the original reference intent in its own namespace before resolution, with worker-side resolution against the same checkpoint; the projection cache key over the exact committed row plus viewer and policy, authorization before cache; COMMIT-only NOTIFY with polling reconciliation; heartbeat, backpressure and drain; the browser client's generation/disposal guards and pending-intent export/restore; additive migration 0004. PLAY-02 follow-ups 1 (resolver-only client commands) and 3 (per-version caching and limits) are closed for this scope. Verdict: PLAY-03 acceptance is met for the agreed synthetic/test-session scope; no blocking finding.
- **test:** Independent runs RUN-20261015-012..017 all passed at Codex's final fingerprint 64bef2e3 with exact timing, no clock discontinuity and 0 redactions. RUN012: full verify:foundation (324 project checks = 300 Node + 24 Python; 406 upstream passes/1 inherited skip; 2 injection). RUN013: auditor live gateway probe on the real test database: ticket HTTP refusals (missing/wrong Origin, no session, query URL, extra field, oversize, protocol 1, identical outsider/missing-match 403), no-store exact-origin responses, hash-only storage and the 12-per-minute quota; WebSocket refusals (wrong Origin, URL ticket left unconsumed, replay, cross-origin ticket, expired, revoked session, non-authenticate first frame, malformed ticket, 301 ms auth deadline, re-authentication, other match) without durable writes; a complete 48-version two-host game across 8 move types driven only by current references with 92 byte-equal wire/adapter snapshot comparisons; durable invalid_intent for unknown, opponent, cross-viewer, previous-version and opponent-ink-back references and an out-of-turn move, stale for an old version; socket closure without receipt for raw engine identity, manual move, extra field, actor override and changed payload under a reused command ID; one commit for a concurrent identical command on two hosts; lost acknowledgement retried with old references after two later commits returns the saved receipt; revocation (4401), drain (1012) and heartbeat loss (1013) withhold frames without conceding; 6 of 14 rapid commands rate-limited without writes; 223 frames with closed envelopes, consecutive sequences and no seed/commitment/digest/engine identifier/session/cookie/ticket; 48 NOTIFY payloads carrying only the match ID. RUN014: auditor cache probe: warm and cold 48-way bursts use at most one projection (PLAY-02 audit: 34 served/14 refused), viewers never share entries, authorization precedes cache, cross-instance commits visible immediately, 80 concurrent reads serve 64 and refuse 16, four forged rows fail closed instead of hitting the cache, raw/reference namespaces conflict both ways, rejected retries are duplicates, raw identities via references are rejected, restart reproduces. RUN015: auditor boundary/startup/migration probe: six browser owners including match-client refuse 528 server/gateway/db/runtime/pg/Fastify/Node imports, client depends on and imports only contracts with no storage/cookies, 48 browser files free of 23 server markers, ordinary startup unchanged with no ticket/play/login routes and protocol 1 negotiation, engine/adapter/Lab/vendor/protocol/viewer contracts byte-identical to main, 0001-0003 unchanged and 0004 additive with match-only privileges in both databases. RUN016: Codex database suites (5 + 3 + 27, eight identities). RUN017: Chromium 8 scenarios + 2 Lab workers. RUN018: docs:check covers this record.
- **review:** Verified the append-only packaging correction: sealed CHG-20261014-006 lists 4 files and CHG-20261015-001 lists exactly the 195 paths of git diff main..HEAD with none missing or extra. git diff --check reports only the disclosed extra blank line at the end of apps/match-service/tests/live-fixtures.mjs; it is cosmetic and left unchanged because editing it would alter the tested fingerprint. A scan of the branch diff and the new audit logs against private configuration values found no credential; the only match is the database name inside a role-name pattern on an unchanged context line already published on main.
- **review:** Follow-ups recorded, none blocking: (1) AUTH-01 sizing: each 500 ms reconciliation tick calls SessionAuthority.verify for every connection plus once per match group, about three calls per second per socket (roughly 380/s at the 128-socket cap); verification must be cheap or cached within the accepted revocation delay. (2) PostgreSQL does not access-control LISTEN; the api role can subscribe to lorcana_match_changed, so NOTIFY payloads must stay metadata-only. (3) Abandoned quota keys are not pruned; the test database holds 31 expired rows from 2026-10-14 23:23-23:28 UTC development runs; OPS must add retention before production. (4) Carried from PLAY-02: per-move transcript replay (about 0.2-0.26 s per synthetic command), the 4,096-event projection bound, identity-independent outcomes for opponent ink-back references, card-certification visibility review and the Lab/lock-file pending_PLAY-02 labels.
- **documentation:** Appended a dated independent-audit section to docs/validation/play-03.md and dated audit notes to ADR0015, the PLAY-03 plan and the live-matches runbook. Added the audit sentence to the PLAY-03 paragraph of AGENTS.md, README.md and docs/README.md. Rewrote HANDOFF for the audit and integration sequence. features.json and FEATURES.md note the audit for F-LIVE-TRANSPORT, F-MATCH-CLIENT and F-MATCH-COMMANDS with the audit evidence; the PLAY-03 backlog row links this record with status unchanged. CHANGELOG and current-state regenerated by docs:sync.

### Verification

- **passed:** Timing-valid pnpm verify:foundation: 324 project checks (300 Node + 24 Python), 406 upstream passes/1 inherited skip/1,362 expectations, 2 injection tests. Local Dev Container. ([evidence](docs/validation/runs/RUN-20261015-012.json))
- **passed:** Auditor live gateway probe on the real test database: admission, two-host reference-only game with wire/adapter equality, refusals, recovery, rate limits, frame secret scan and NOTIFY payloads. ([evidence](docs/validation/runs/RUN-20261015-013.json))
- **passed:** Auditor committed-projection cache and reference-command probe. ([evidence](docs/validation/runs/RUN-20261015-014.json))
- **passed:** Auditor boundary, browser-bundle, ordinary-startup and migration/privilege probe on local and test databases. ([evidence](docs/validation/runs/RUN-20261015-015.json))
- **passed:** Codex database suites: db:check, local/test health, db:test 5, storage 3, match integration 27. ([evidence](docs/validation/runs/RUN-20261015-016.json))
- **passed:** Linux headless Chromium: 8 foundation/live scenarios and 2 isolated Lab workers. ([evidence](docs/validation/runs/RUN-20261015-017.json))
- **passed:** docs:check over the completed audit documentation and evidence (static). ([evidence](docs/validation/runs/RUN-20261015-018.json))

### Documentation and files

- **updated:** [docs/validation/play-03.md](docs/validation/play-03.md) — Appended a dated independent-audit section: run outcomes, review scope, correction check, verdict, follow-ups and the isolated-CI decision; Codex text unchanged.
- **updated:** [docs/adr/0015-live-synthetic-transport.md](docs/adr/0015-live-synthetic-transport.md) — Dated audit note: decision unchanged and consistent with the source; follow-ups.
- **updated:** [docs/plans/2026-10-14-play-03-live-reconnect.md](docs/plans/2026-10-14-play-03-live-reconnect.md) — Execution note recording the independent audit and hosted-CI-before-merge sequence.
- **updated:** [docs/runbooks/live-matches.md](docs/runbooks/live-matches.md) — Audit cautions: session verification cadence, unrestricted LISTEN, quota-row retention, heartbeat and pending-frame closure.
- **updated:** [docs/HANDOFF.md](docs/HANDOFF.md) — Audit state, verification, follow-ups and the publication/integration sequence; Codex implementation summary retained.
- **updated:** [AGENTS.md](AGENTS.md) — PLAY-03 paragraph notes the independent audit, hosted-CI-before-merge sequence and the AUTH-01 session-verification follow-up.
- **updated:** [README.md](README.md) — Same PLAY-03 audit sentence as AGENTS.md.
- **updated:** [docs/README.md](docs/README.md) — Same PLAY-03 audit sentence as AGENTS.md.
- **updated:** [docs/features.json](docs/features.json) — F-LIVE-TRANSPORT, F-MATCH-CLIENT and F-MATCH-COMMANDS note the audit and add the relevant RUN-20261015-012..017 evidence.
- **updated:** [docs/FEATURES.md](docs/FEATURES.md) — Acceptance-limit cells for the same three features reference the independent audit.
- **updated:** [docs/vision/initial_backlog.csv](docs/vision/initial_backlog.csv) — PLAY-03 evidence link to this audit record only; status and every other row unchanged.
- **reviewed_unchanged:** [docs/contracts/live.md](docs/contracts/live.md) — Matches the audited schemas, ticket/admission rules, retry semantics and client lifecycle.
- **reviewed_unchanged:** [docs/reviews/2026-10-15-play-03-live.md](docs/reviews/2026-10-15-play-03-live.md) — Codex's commissioned static review is consistent with the source; this audit adds independent execution it did not perform.
- **reviewed_unchanged:** [docs/plans/2026-10-14-play-03-intake.md](docs/plans/2026-10-14-play-03-intake.md) — Intake constraints and the Director's AUTH-01 decision are reflected in the implementation.
- **reviewed_unchanged:** [packages/match-client/README.md](packages/match-client/README.md) — Browser API description matches the audited client.
- **reviewed_unchanged:** [apps/match-service/README.md](apps/match-service/README.md) — Gateway/service description consistent with the audited source.
- **reviewed_unchanged:** [docs/runbooks/database.md](docs/runbooks/database.md) — Migration 0004 note consistent with the audited additive migration and privileges.
- **reviewed_unchanged:** [docs/vision/requirements.csv](docs/vision/requirements.csv) — PLAY-03 evidence-link edits reviewed; 548 dispositions and 20 optional flags unchanged.
- **reviewed_unchanged:** [docs/WORKSPACE_QUALIFICATION.md](docs/WORKSPACE_QUALIFICATION.md) — PLAY-03 paragraph accurate; audit detail lives in docs/validation/play-03.md, following the PLAY-02 audit precedent.
- **reviewed_unchanged:** [docs/DEVELOPMENT_WORKFLOW.md](docs/DEVELOPMENT_WORKFLOW.md) — Sequential heavy-workload and cumulative packaging rules followed; no change needed.
- **reviewed_unchanged:** [docs/CHANGELOG_FORMAT.md](docs/CHANGELOG_FORMAT.md) — Cumulative file-coverage clarification followed for this record.
- **historical_preserved:** [docs/changes/CHG-20261014-006.json](docs/changes/CHG-20261014-006.json) — Finalized Codex record; audited, not modified.
- **historical_preserved:** [docs/changes/CHG-20261015-001.json](docs/changes/CHG-20261015-001.json) — Finalized Codex correction; coverage verified, not modified.

Full changed-file inventory: [record](docs/changes/CHG-20261015-002.json).

### Limits and next actions

- Audit evidence is local Linux Dev Container and headless Chromium only; gateway hosts ran in one container (separate Fastify instances in the probe, separate processes in Codex's suites); no remote network, Windows, touch, GPU, load or production observation.
- Local isolated CI was not rerun (wall clock gained 1.8-2.6 ms/s against monotonic during the audit, near the unchanged 1 s guard over the pipeline); hosted CI results are observed after publication and recorded in a later change.
- Probes use the two-player synthetic catalog and injected test sessions; AUTH-01 sessions, real cards, private choices, clocks, observers and multiplayer remain gated.
- Push the Codex and audit branches, run hosted Foundation qualification on claude/play-03-audit, fast-forward main only after it passes, observe the main run and record both run IDs in the next change.
- Carry the session-verification sizing, LISTEN metadata-only rule and quota-retention follow-ups into AUTH-01/OPS-01 planning; PLAY-04 or AUTH-01 next per Director.

## CHG-20261015-001 — Correct PLAY-03 cumulative file inventory and review packaging

- Status: finalized
- Actor: Codex architect/developer/QA collaborator
- Recorded (UTC): 2026-10-15T03:52:50.542Z
- Event: unknown; recorded retrospectively (recorded_only)
- Source: 6f3b45e1c4f094ba83beb385a1f4cc7d26ec198a
- Tasks: PLAY-03, DOC-01, DOC-02
- Features: F-DOCS, F-EVIDENCE
- Requirements: none

### Changes

- **fix:** The external ledger helper replaced cumulative files with only unstaged/untracked paths after staging. CHG006.files therefore committed four paths instead of the190 implementation paths. A non-native check detected this but the shell continued to commit. Preserve sealed CHG006 exactly; this correction supersedes its file inventory with the complete cumulative branch scope. No application code, tests, SQL, lock, configuration or test result is changed.
- **documentation:** Clarify cumulative branch-base/staged/unstaged/untracked file coverage and failure-stopping commit sequencing in universal workflow/format; record exact packaging correction in PLAY-03 validation/handoff. The actual code remains qualified at64bef2e3 by native002/003/004/007/008/010.
- **review:** The non-native whitespace check reported an extra EOF blank in newly added live-fixtures.mjs; retained tested bytes and preserve the cosmetic advisory rather than falsely calling the check passing. The code and strict ESLint/type/build/application checks remain unchanged and passing.
- **test:** RUN011 passes native documentation plus exact193 cumulative branch/staged/dirty paths before its own receipt/log creation, with unchanged64bef2e3 source. Final inventory includes both new evidence files, for195 paths. Independent read-only review confirms no omissions/extras/duplicates and sealed CHG006 unchanged; no tests/listeners were run by the reviewer.

### Verification

- **passed:** Prior native documentation and645 staged executable/config/test/schema files match the tested64bef2e3 source; this correction changes only documentation/history. ([evidence](docs/validation/runs/RUN-20261015-010.json))
- **passed:** PLAY-03 append-only cumulative inventory correction: unchanged executable and full branch/staged/dirty coverage plus native documentation ([evidence](docs/validation/runs/RUN-20261015-011.json))

### Documentation and files

- **updated:** [docs/DEVELOPMENT_WORKFLOW.md](docs/DEVELOPMENT_WORKFLOW.md) — Correct current cumulative packaging guidance or explicitly record the committed metadata error without changing sealed CHG006/evidence or tested source.
- **updated:** [docs/CHANGELOG_FORMAT.md](docs/CHANGELOG_FORMAT.md) — Correct current cumulative packaging guidance or explicitly record the committed metadata error without changing sealed CHG006/evidence or tested source.
- **updated:** [docs/HANDOFF.md](docs/HANDOFF.md) — Correct current cumulative packaging guidance or explicitly record the committed metadata error without changing sealed CHG006/evidence or tested source.
- **updated:** [docs/validation/play-03.md](docs/validation/play-03.md) — Correct current cumulative packaging guidance or explicitly record the committed metadata error without changing sealed CHG006/evidence or tested source.

Full changed-file inventory: [record](docs/changes/CHG-20261015-001.json).

### Limits and next actions

- CHG006.files remains historically incomplete; this explicit195-path cumulative correction supersedes it. Original application/engine/DB/browser/clean results and all AUTH/device/production/clock gates remain unchanged.
- No application code changes or new application-suite claim accompany the correction. The cosmetic fixture EOF warning remains recorded and is not described as a passing whitespace check.
- Director audit/publication and hosted CI for the local branch; no push, merge or deployment is performed. PLAY-04 is the next documented implementation task.

## CHG-20261014-006 — PLAY-03 reference-only live transport and reconnect

- Status: finalized
- Actor: Codex architect/developer/QA collaborator
- Recorded (UTC): 2026-10-15T00:15:32.793Z
- Event: unknown; recorded retrospectively (recorded_only)
- Source: 6f2659eac632fdec92f7af5296505331782b638d
- Tasks: PLAY-03, DOC-01, DOC-02
- Features: F-DOCS, F-CI, F-VIEWER-PRIVACY, F-MATCH-COMMANDS, F-PROTOCOL, F-RELEASE, F-DB, F-BOUNDARIES, F-LIVE-TRANSPORT, F-MATCH-CLIENT
- Requirements: R02.031, R02.032, R02.034, R29.005, R30.010, R30.015

### Changes

- **review:** Inspect clean merged main6f2659e, existing committed Dev Container/database, full checklist/requirement/backlog scope and authority/protocol/release/viewer/service boundaries. Open the explicit AUTH-01 dependency question with the Director before dependent implementation.
- **test:** RUN071 passes unchanged doctor/static/docs/bootstrap5/originalDB inside container; RUN072 observes public successful PLAY-02 audit/main hosted job/step metadata at6f2659e, without hosted log/artifact download or new PLAY-03 acceptance. Earlier recorder ID070 collision refused execution and preserved audit record.
- **documentation:** Record merged hosted evidence, current scoped branch/intake constraints, reference-only commands/caching/limits/event-bound audit follow-ups, source ownership and pending authentication decision in native plan/map/backlog/features/qualification/handoff. No application code or database/environment configuration changes.
- **review:** Director keeps AUTH-01 separate and authorizes isolated authenticated test sessions for PLAY-03. ADR0015/inline implementation plan define protocol2, same-checkpoint reference transitions, bounded committed views, shared single-use tickets/quotas, metadata hints/reconciliation, optional gateway and browser-safe reconnect client. Ordinary startup/admission remains closed.
- **implementation:** Task1 exact-checkpoint worker ref resolution and separate durable reference semantic namespace, cached committed participant projections with48-reader coalescing, byte/count/TTL/in-flight bounds and archive/pin/viewer/outcome keying. Existing trusted raw submit remains internal.
- **implementation:** Task2/3 closed protocol2 intents/envelopes/ticket schemas, retained diagnostic1 and new release range1..2; immutable additive0004 permits new match pin2 and adds hashed single-use tickets/shared DB quotas. Participant metadata observer and COMMIT-only NOTIFY hints support reconciliation.
- **implementation:** Task4 optional Fastify gateway requires injected AUTH-01 interface and exact origins, bounded first-frame ticket authentication, private session rechecks, refs-only commands, durable receipt mapping and full committed snapshot refresh, hint-independent polling, heartbeat and drain. Ordinary main stays diagnostic-only.
- **fix:** RUN074 used wrong zone field in test; RUN075 corrects kind and reproduces actual raw-ID acceptance before worker fix. RUN083 preserves PostgreSQL42P08 query inference error after0004 test application; explicit actor varchar casts fix it in RUN084 without rewriting SQL.
- **revision:** Selected exact Fastify/WebSocket baseline plus compatible ws8.22.0/@types/ws8.18.2 metadata. RUN085 input archived byte-for-byte under validation/inputs. RUN086 deliberately changes manifest/lock, child0 but receipt source_changed remains failed; RUN087 frozen install and both DB role-health checks pass.
- **fix:** RUN090 reproduces five concurrent actor admissions bypassing the four-slot cap; reserve actor synchronously before asynchronous describe and RUN091 passes all actual gateway negatives.
- **implementation:** New browser-owned match-client workspace links contracts with pnpm; wire-only public client has bounded jitter/retry/deadlines, actor-bound pending export/restore, exact request IDs/refs across suspension/hops, strict sequence/pin/viewer checks and separate transient/durable outcomes. No auth cookie, server state or login implementation enters its source.
- **fix:** RUN094 reproduces duplicate pending retransmission on unrelated snapshots, application callback reentrancy invalidating accepted receipts and a replaced-ready promise left pending. RUN095 passes seven client cases after per-connection send tracking, preserved acknowledgement deadlines and internal-state-before-callback ordering.
- **revision:** Link match-client to web with package manager; include its compiled bytes and package metadata in actual release/artifact closure. RUN096 omission red/RUN097 all CI tooling green includes tamper rejection even after refreshing outer hashes. Web dev filesystem explicitly permits only this browser-owned workspace.
- **fix:** RUN098 direct Fastify.close leaves owned resources open; RUN099 exposes test-helper export typo and a pg listener initial-close hang. RUN100 isolates end-before-connect behavior; await each owned connection attempt before ending, including reconnect attempts, and bind cleanup before plugin close. RUN101 passes all11 actual lifecycle/ticket/socket cases.
- **test:** RUN102 uses actual WebSocket clients against separate OS gateway processes and PostgreSQL to finish a natural reference-only synthetic game. Pausing a client read, waiting for COMMIT, SIGKILLing the owning gateway and reconnecting elsewhere recovers the original old-ref pending intent as one duplicate accepted receipt; journal/outbox stay once.
- **fix:** RUN103 reproduces orphan qualification gateway after controlling parent IPC loss; RUN104 adds parent-loss cleanup and guards disconnect ownership. RUN105 passes all types but fails lint const/test-global rules; RUN106 fixes code without weakening lint.
- **test:** RUN107 passes all8 Chromium cases, including native HttpOnly cookies, real HTTP/WebSockets, two isolated participants, rotating refs and reconnect to another process. RUN108 passes original bootstrap/role health, real DB/storage/gateway/process-client suite. AUTH-01 remains separate.
- **documentation:** Add exact live wire and browser lifecycle contract, optional gateway operation/limits, package API and native validation ledger; update additive0004/protocol1..2/client artifact closure and partial requirement links. Preserve all548 requirement definitions/20 optional/device/status fields and historical evidence.
- **fix:** Independent read-only review finds no important privacy/authority/idempotency defects; two minor callback cleanup findings reproduced in RUN110/RUN113, fixed and all9 client cases pass RUN114. RUN109 documents missing individual schema review; RUN112 detects a wildcard review rendered as a broken link. Expand review paths to actual files; no gate bypass.
- **review:** Independent static whole-scope review finds no critical/important issues; both minor callback disposal findings are reproduced/fixed/confirmed closed. Review runs no tests or listeners. Current RUN-20261015-002 passes frozen install and whole foundation324 project/406 upstream/2 injection checks with valid timing; no old-source hosted acceptance inferred.
- **test:** Final executable64bef2e3 passes full frozen foundation324 project/406 upstream/2 injection,35actual DB checks,8foundation+2Lab Chromium, installed license/integrity/advisory222 components, native docs and fresh source-only frozen full suite. Final closure verifies361vendor/59patches,0600private/ignored,2729unique historical blobs,622log digests, original548/33/20 and unchanged prior SQL/engine/container, with no owned listeners/children.
- **documentation:** Finalize synthetic PLAY-03 acceptance, exact live/API/operations/contracts/ADR, independent review, feature/backlog/partial requirement links and handoff. Current docs/Git packaging remains checked separately; no ordinary AUTH/card/reward/device/production/remote-host performance or fresh hosted/isolated artifact qualification inferred. Automatic approval review declined deriving a new checker from prior evidence before execution; a new PLAY-03 input was authored directly and historical RULE-04 bytes remain unchanged.

### Verification

- **passed:** PLAY-03 intake on merged main6f2659e: exact doctor, static documentation/configuration checks, unchanged bootstrap and original authenticated database connection ([evidence](docs/validation/runs/RUN-20261014-071.json))
- **passed:** Fresh public PLAY-02 audit38631667354 and merged main38633232168 CI metadata; no downloaded hosted logs/artifact or new PLAY-03 acceptance ([evidence](docs/validation/runs/RUN-20261014-072.json))
- **passed:** PLAY-03 intake native documentation synchronization: merged PLAY-02 hosted metadata, actual branch/baseline, scoped audit follow-ups and pending Director AUTH-01 boundary ([evidence](docs/validation/runs/RUN-20261014-073.json))
- **failed:** PLAY-03 red: bounded committed projection cache absent and actual worker reference transition must reject raw identities ([evidence](docs/validation/runs/RUN-20261014-074.json))
- **failed:** PLAY-03 red fixture correction: hand zone uses kind; cache absent and raw identities are incorrectly accepted by reference worker mode ([evidence](docs/validation/runs/RUN-20261014-075.json))
- **passed:** PLAY-03 bounded cache and same-checkpoint reference transition: scoped compile and red-to-green worker/cache behavior ([evidence](docs/validation/runs/RUN-20261014-076.json))
- **failed:** PLAY-03 red live DB: reference-only durable service is absent and 48 same-version views are not coalesced ([evidence](docs/validation/runs/RUN-20261014-077.json))
- **passed:** PLAY-03 Task1: same-checkpoint refs, original durable semantic retry identity and 48-read exact-view cache with tamper/actor isolation; prior unit/live DB regressions ([evidence](docs/validation/runs/RUN-20261014-078.json))
- **failed:** PLAY-03 red closed protocol2: reference-only frames, viewer envelope correlation and ticket/authentication contracts are absent ([evidence](docs/validation/runs/RUN-20261014-079.json))
- **passed:** PLAY-03 protocol2 closed schemas and reference-only/ticket/viewer envelope negatives; contracts compile and all contract regressions ([evidence](docs/validation/runs/RUN-20261014-080.json))
- **failed:** PLAY-03 red live DB: protocol2 release/match pins, atomic shared ticket/quotas, committed metadata and transaction hints are absent ([evidence](docs/validation/runs/RUN-20261014-081.json))
- **passed:** PLAY-03 Task2/3 scoped contracts/database/match builds before applying additive live-transport migration ([evidence](docs/validation/runs/RUN-20261014-082.json))
- **failed:** PLAY-03 additive migration0004 test-first: preserve protocol1 data, qualify protocol2 pins/ticket race/shared quotas/COMMIT-only metadata hints plus existing database/match regressions ([evidence](docs/validation/runs/RUN-20261014-083.json))
- **passed:** PLAY-03 SQL parameter inference correction: explicit actor varchar casts at SELECT and authorization predicate; all actual ticket/quota/commit-hint and pin cases ([evidence](docs/validation/runs/RUN-20261014-084.json))
- **passed:** PLAY-03 exact owning-workspace WebSocket dependency qualification against registry metadata; no installs or build-script allowances yet ([evidence](docs/validation/runs/RUN-20261014-085.json))
- **failed:** PLAY-03 install scoped exact Fastify5.12.5/WebSocket11.3.3 and ws8.22.0/types8.18.2 test/types dependencies; strict peers and build allowances retained ([evidence](docs/validation/runs/RUN-20261014-086.json))
- **passed:** PLAY-03 unchanged frozen install and strict peers after deliberate dependency mutation; apply reviewed0004 to original local target after test proof and check both restricted-role sets ([evidence](docs/validation/runs/RUN-20261014-087.json))
- **failed:** PLAY-03 red actual optional WebSocket gateway: injected sessions/origins, single-use auth, cross-host refs/duplicate receipt, revocation/drain absent ([evidence](docs/validation/runs/RUN-20261014-088.json))
- **passed:** PLAY-03 optional live gateway scoped compile and actual socket/session/origin/replay/host-change/duplicate/revocation/drain regressions ([evidence](docs/validation/runs/RUN-20261014-089.json))
- **failed:** PLAY-03 adversarial gateway admission: concurrent same-actor cap race plus actual auth deadline, binary/oversize and output-budget closures ([evidence](docs/validation/runs/RUN-20261014-090.json))
- **passed:** PLAY-03 gateway cap race correction: reserve actor slot before asynchronous describe; all five actual gateway/session/admission/size/buffer tests ([evidence](docs/validation/runs/RUN-20261014-091.json))
- **failed:** PLAY-03 red browser-safe client state machine: correlated snapshot, stable pending refs/IDs, host hop, gap/account switch and transient-vs-durable receipts absent ([evidence](docs/validation/runs/RUN-20261014-092.json))
- **passed:** PLAY-03 browser-safe reconnect/pending client compile and four simulated protocol-state regressions; no real browser claim ([evidence](docs/validation/runs/RUN-20261014-093.json))
- **failed:** PLAY-03 client adversarial red: unrelated snapshots must not retransmit/reset acknowledgement deadline; callback reentrancy and replaced-ready waiter remain safe ([evidence](docs/validation/runs/RUN-20261014-094.json))
- **passed:** PLAY-03 client fixes from red regressions: send once per connection, preserve ack deadline, settle receipts before app callbacks, reject replaced-ready waiter and isolate fetch cancellation ([evidence](docs/validation/runs/RUN-20261014-095.json))
- **failed:** PLAY-03 red actual artifact builder: owning reconnect client must be shipped and release-bound, including refreshed outer hashes ([evidence](docs/validation/runs/RUN-20261014-096.json))
- **passed:** PLAY-03 public reconnect workspace linking/frozen install and release/artifact ownership; all CI tooling regressions including inner-client tampering with refreshed outer hashes ([evidence](docs/validation/runs/RUN-20261014-097.json))
- **failed:** PLAY-03 red lifecycle: calling exposed Fastify.close directly must own private pools, hints and reconciliation cleanup ([evidence](docs/validation/runs/RUN-20261014-098.json))
- **failed:** PLAY-03 lifecycle correction: register private cleanup before plugin close hook; direct Fastify.close and explicit gateway.close own all pools/hints/timers; six real gateway regressions ([evidence](docs/validation/runs/RUN-20261014-099.json))
- **failed:** PLAY-03 red root cause behind direct-close timeout: PostgreSQL hint close must not end its client before initial connect settles ([evidence](docs/validation/runs/RUN-20261014-100.json))
- **passed:** PLAY-03 listener lifecycle fix: await owned initial/reconnect before ending pg client; direct/explicit gateway shutdown, five shared-store cases and all six socket cases ([evidence](docs/validation/runs/RUN-20261014-101.json))
- **passed:** PLAY-03 actual client/protocol/DB qualification: two separate gateway processes finish natural reference-only play; SIGKILL after COMMIT with unread ACK recovers same pending old refs once on other host ([evidence](docs/validation/runs/RUN-20261014-102.json))
- **failed:** PLAY-03 red qualification lifecycle: parent IPC loss must not orphan an owned gateway process after a host/editor interruption ([evidence](docs/validation/runs/RUN-20261014-103.json))
- **passed:** PLAY-03 qualification child parent-IPC cleanup regression ([evidence](docs/validation/runs/RUN-20261014-104.json))
- **failed:** PLAY-03 final-owner TypeScript and lint integration ([evidence](docs/validation/runs/RUN-20261014-105.json))
- **passed:** PLAY-03 scoped typecheck/lint correction without weakening rules ([evidence](docs/validation/runs/RUN-20261014-106.json))
- **passed:** PLAY-03 real Chromium native-cookie WebSocket clients across separate gateway processes plus retained foundation browser suite ([evidence](docs/validation/runs/RUN-20261014-107.json))
- **passed:** PLAY-03 current real PostgreSQL roles/bootstrap/storage/ticket/quota/gateway/process-client suite ([evidence](docs/validation/runs/RUN-20261014-108.json))
- **failed:** PLAY-03 current docs source-impact review and native callable/changelog synchronization ([evidence](docs/validation/runs/RUN-20261014-109.json))
- **failed:** PLAY-03 independent-review timer cleanup red: synchronous status disposal must not schedule later retries ([evidence](docs/validation/runs/RUN-20261014-110.json))
- **passed:** PLAY-03 independent-review correction: generation checks after callbacks prevent orphan retry timers; eight simulated client regressions ([evidence](docs/validation/runs/RUN-20261014-111.json))
- **failed:** PLAY-03 expanded individual schema documentation reviews and native synchronization ([evidence](docs/validation/runs/RUN-20261014-112.json))
- **failed:** PLAY-03 review red: onView disposal must settle resume and preserve closed suspension state ([evidence](docs/validation/runs/RUN-20261014-113.json))
- **passed:** PLAY-03 review callback disposal fixes and all nine simulated lifecycle/pending regressions ([evidence](docs/validation/runs/RUN-20261014-114.json))
- **passed:** PLAY-03 corrected exact-file semantic documentation reviews and native synchronization ([evidence](docs/validation/runs/RUN-20261015-001.json))
- **passed:** PLAY-03 final-source frozen install and complete foundation checks, retaining all existing project/engine/injection tests ([evidence](docs/validation/runs/RUN-20261015-002.json))
- **passed:** PLAY-03 final-source real PostgreSQL match storage, gateway, ticket/quota and separate-process client recovery suite after review corrections ([evidence](docs/validation/runs/RUN-20261015-003.json))
- **passed:** PLAY-03 final-source Chromium foundation8 and Lab2 browser boundary/lifecycle proofs ([evidence](docs/validation/runs/RUN-20261015-004.json))
- **passed:** PLAY-03 installed dependency license/integrity/advisory qualification for exact frozen graph and vendored provenance ([evidence](docs/validation/runs/RUN-20261015-005.json))
- **passed:** PLAY-03 reviewed current documentation and source-matched feature evidence before clean installation proof ([evidence](docs/validation/runs/RUN-20261015-006.json))
- **passed:** PLAY-03 final source-only clean frozen install and full foundation without credentials, Git checkout or prebuilt artifacts ([evidence](docs/validation/runs/RUN-20261015-007.json))
- **passed:** PLAY-03 final matched-source, private-file preservation, full-history secret/log/scope/provenance and owned-process closure checks ([evidence](docs/validation/runs/RUN-20261015-008.json))
- **passed:** PLAY-03 final acceptance documentation, semantic map/feature/backlog/requirement/handoff and native changelog/callable closure ([evidence](docs/validation/runs/RUN-20261015-009.json))
- **passed:** PLAY-03 final documentation gate and canonical staged executable/config/test/schema byte identity against tested source ([evidence](docs/validation/runs/RUN-20261015-010.json))

### Documentation and files

- **updated:** [AGENTS.md](AGENTS.md) — Compared source ownership and current milestone/contract statements with PLAY-03. Update current checkpoint or owning behavior for distinct live2/diagnostic1, additive0004,13-workspace closure and explicit AUTH/admission/qualification limits; preserve dated executed results.
- **updated:** [README.md](README.md) — Compared source ownership and current milestone/contract statements with PLAY-03. Update current checkpoint or owning behavior for distinct live2/diagnostic1, additive0004,13-workspace closure and explicit AUTH/admission/qualification limits; preserve dated executed results.
- **updated:** [docs/README.md](docs/README.md) — Compared source ownership and current milestone/contract statements with PLAY-03. Update current checkpoint or owning behavior for distinct live2/diagnostic1, additive0004,13-workspace closure and explicit AUTH/admission/qualification limits; preserve dated executed results.
- **updated:** [docs/WORKSPACE_QUALIFICATION.md](docs/WORKSPACE_QUALIFICATION.md) — Compared source ownership and current milestone/contract statements with PLAY-03. Update current checkpoint or owning behavior for distinct live2/diagnostic1, additive0004,13-workspace closure and explicit AUTH/admission/qualification limits; preserve dated executed results.
- **updated:** [docs/FEATURES.md](docs/FEATURES.md) — Compared source ownership and current milestone/contract statements with PLAY-03. Update current checkpoint or owning behavior for distinct live2/diagnostic1, additive0004,13-workspace closure and explicit AUTH/admission/qualification limits; preserve dated executed results.
- **updated:** [docs/HANDOFF.md](docs/HANDOFF.md) — Compared source ownership and current milestone/contract statements with PLAY-03. Update current checkpoint or owning behavior for distinct live2/diagnostic1, additive0004,13-workspace closure and explicit AUTH/admission/qualification limits; preserve dated executed results.
- **updated:** [docs/validation/play-02.md](docs/validation/play-02.md) — Compared source ownership and current milestone/contract statements with PLAY-03. Update current checkpoint or owning behavior for distinct live2/diagnostic1, additive0004,13-workspace closure and explicit AUTH/admission/qualification limits; preserve dated executed results.
- **updated:** [docs/vision/initial_backlog.csv](docs/vision/initial_backlog.csv) — Compared source ownership and current milestone/contract statements with PLAY-03. Update current checkpoint or owning behavior for distinct live2/diagnostic1, additive0004,13-workspace closure and explicit AUTH/admission/qualification limits; preserve dated executed results.
- **updated:** [docs/features.json](docs/features.json) — Compared source ownership and current milestone/contract statements with PLAY-03. Native schema1, closed evidence/device/history contracts and authoring templates remain unchanged; only owning map/feature/source snapshots are refreshed where applicable.
- **updated:** [docs/documentation-map.json](docs/documentation-map.json) — Compared source ownership and current milestone/contract statements with PLAY-03. Native schema1, closed evidence/device/history contracts and authoring templates remain unchanged; only owning map/feature/source snapshots are refreshed where applicable.
- **updated:** [docs/plans/2026-10-14-play-03-intake.md](docs/plans/2026-10-14-play-03-intake.md) — Reflect actual clean merged source, freshly observed hosted PLAY-02 metadata and explicit PLAY-03 intake/authentication dependency; distinguish pending product implementation, local checks and downloaded-artifact/device acceptance.
- **updated:** [docs/contracts/protocol.md](docs/contracts/protocol.md) — Compared source ownership and current milestone/contract statements with PLAY-03. Update current checkpoint or owning behavior for distinct live2/diagnostic1, additive0004,13-workspace closure and explicit AUTH/admission/qualification limits; preserve dated executed results.
- **updated:** [docs/contracts/release.md](docs/contracts/release.md) — Compared source ownership and current milestone/contract statements with PLAY-03. Update current checkpoint or owning behavior for distinct live2/diagnostic1, additive0004,13-workspace closure and explicit AUTH/admission/qualification limits; preserve dated executed results.
- **updated:** [docs/contracts/viewer.md](docs/contracts/viewer.md) — Compared source ownership and current milestone/contract statements with PLAY-03. Update current checkpoint or owning behavior for distinct live2/diagnostic1, additive0004,13-workspace closure and explicit AUTH/admission/qualification limits; preserve dated executed results.
- **updated:** [docs/adr/0006-protocol-release-contracts.md](docs/adr/0006-protocol-release-contracts.md) — Compared source ownership and current milestone/contract statements with PLAY-03. Update current checkpoint or owning behavior for distinct live2/diagnostic1, additive0004,13-workspace closure and explicit AUTH/admission/qualification limits; preserve dated executed results.
- **reviewed_unchanged:** [docs/adr/0008-engine-placement-dependency-baseline.md](docs/adr/0008-engine-placement-dependency-baseline.md) — Compared source ownership and current milestone/contract statements with PLAY-03. No owned code/policy is altered: retain the dated milestone evidence and its source-specific limits, universal workflow, synthetic card/fan-content and provider/rules/engine gates. Current transport is documented in ADR0015/live operation rather than claiming broader acceptance.
- **updated:** [docs/adr/0013-durable-synthetic-match-commands.md](docs/adr/0013-durable-synthetic-match-commands.md) — Compared source ownership and current milestone/contract statements with PLAY-03. Update current checkpoint or owning behavior for distinct live2/diagnostic1, additive0004,13-workspace closure and explicit AUTH/admission/qualification limits; preserve dated executed results.
- **updated:** [docs/adr/0014-viewer-projection-privacy.md](docs/adr/0014-viewer-projection-privacy.md) — Compared source ownership and current milestone/contract statements with PLAY-03. Update current checkpoint or owning behavior for distinct live2/diagnostic1, additive0004,13-workspace closure and explicit AUTH/admission/qualification limits; preserve dated executed results.
- **updated:** [docs/runbooks/match-commands.md](docs/runbooks/match-commands.md) — Compared source ownership and current milestone/contract statements with PLAY-03. Update current checkpoint or owning behavior for distinct live2/diagnostic1, additive0004,13-workspace closure and explicit AUTH/admission/qualification limits; preserve dated executed results.
- **updated:** [docs/runbooks/viewer-privacy.md](docs/runbooks/viewer-privacy.md) — Compared source ownership and current milestone/contract statements with PLAY-03. Update current checkpoint or owning behavior for distinct live2/diagnostic1, additive0004,13-workspace closure and explicit AUTH/admission/qualification limits; preserve dated executed results.
- **updated:** [apps/match-service/README.md](apps/match-service/README.md) — Compared source ownership and current milestone/contract statements with PLAY-03. Update current checkpoint or owning behavior for distinct live2/diagnostic1, additive0004,13-workspace closure and explicit AUTH/admission/qualification limits; preserve dated executed results.
- **updated:** [apps/web/README.md](apps/web/README.md) — Compared source ownership and current milestone/contract statements with PLAY-03. Update current checkpoint or owning behavior for distinct live2/diagnostic1, additive0004,13-workspace closure and explicit AUTH/admission/qualification limits; preserve dated executed results.
- **reviewed_unchanged:** [docs/CHANGELOG_FORMAT.md](docs/CHANGELOG_FORMAT.md) — Compared source ownership and current milestone/contract statements with PLAY-03. No owned code/policy is altered: retain the dated milestone evidence and its source-specific limits, universal workflow, synthetic card/fan-content and provider/rules/engine gates. Current transport is documented in ADR0015/live operation rather than claiming broader acceptance.
- **reviewed_unchanged:** [docs/DEVELOPMENT_WORKFLOW.md](docs/DEVELOPMENT_WORKFLOW.md) — Compared source ownership and current milestone/contract statements with PLAY-03. No owned code/policy is altered: retain the dated milestone evidence and its source-specific limits, universal workflow, synthetic card/fan-content and provider/rules/engine gates. Current transport is documented in ADR0015/live operation rather than claiming broader acceptance.
- **reviewed_unchanged:** [docs/adr/0001-local-development-environment.md](docs/adr/0001-local-development-environment.md) — Compared source ownership and current milestone/contract statements with PLAY-03. No owned code/policy is altered: retain the dated milestone evidence and its source-specific limits, universal workflow, synthetic card/fan-content and provider/rules/engine gates. Current transport is documented in ADR0015/live operation rather than claiming broader acceptance.
- **reviewed_unchanged:** [docs/adr/0002-application-foundation.md](docs/adr/0002-application-foundation.md) — Compared source ownership and current milestone/contract statements with PLAY-03. No owned code/policy is altered: retain the dated milestone evidence and its source-specific limits, universal workflow, synthetic card/fan-content and provider/rules/engine gates. Current transport is documented in ADR0015/live operation rather than claiming broader acceptance.
- **reviewed_unchanged:** [docs/adr/0003-documentation-evidence.md](docs/adr/0003-documentation-evidence.md) — Compared source ownership and current milestone/contract statements with PLAY-03. No owned code/policy is altered: retain the dated milestone evidence and its source-specific limits, universal workflow, synthetic card/fan-content and provider/rules/engine gates. Current transport is documented in ADR0015/live operation rather than claiming broader acceptance.
- **updated:** [docs/audits/2026-10-06-project-audit.md](docs/audits/2026-10-06-project-audit.md) — Compared source ownership and current milestone/contract statements with PLAY-03. Update current checkpoint or owning behavior for distinct live2/diagnostic1, additive0004,13-workspace closure and explicit AUTH/admission/qualification limits; preserve dated executed results.
- **updated:** [docs/plans/2026-10-06-documentation-governance.md](docs/plans/2026-10-06-documentation-governance.md) — Compared source ownership and current milestone/contract statements with PLAY-03. Update current checkpoint or owning behavior for distinct live2/diagnostic1, additive0004,13-workspace closure and explicit AUTH/admission/qualification limits; preserve dated executed results.
- **reviewed_unchanged:** [docs/runbooks/workspace-setup.md](docs/runbooks/workspace-setup.md) — Compared source ownership and current milestone/contract statements with PLAY-03. No owned code/policy is altered: retain the dated milestone evidence and its source-specific limits, universal workflow, synthetic card/fan-content and provider/rules/engine gates. Current transport is documented in ADR0015/live operation rather than claiming broader acceptance.
- **reviewed_unchanged:** [docs/templates/change.json](docs/templates/change.json) — Compared source ownership and current milestone/contract statements with PLAY-03. Native schema1, closed evidence/device/history contracts and authoring templates remain unchanged; only owning map/feature/source snapshots are refreshed where applicable.
- **reviewed_unchanged:** [docs/templates/handoff.md](docs/templates/handoff.md) — Compared source ownership and current milestone/contract statements with PLAY-03. Native schema1, closed evidence/device/history contracts and authoring templates remain unchanged; only owning map/feature/source snapshots are refreshed where applicable.
- **updated:** [docs/validation/boot-01.md](docs/validation/boot-01.md) — Compared source ownership and current milestone/contract statements with PLAY-03. Update current checkpoint or owning behavior for distinct live2/diagnostic1, additive0004,13-workspace closure and explicit AUTH/admission/qualification limits; preserve dated executed results.
- **reviewed_unchanged:** [docs/vision/README.md](docs/vision/README.md) — Compared source ownership and current milestone/contract statements with PLAY-03. No owned code/policy is altered: retain the dated milestone evidence and its source-specific limits, universal workflow, synthetic card/fan-content and provider/rules/engine gates. Current transport is documented in ADR0015/live operation rather than claiming broader acceptance.
- **reviewed_unchanged:** [docs/vision/additional_scope.csv](docs/vision/additional_scope.csv) — Compared source ownership and current milestone/contract statements with PLAY-03. Existing vision/provider/budget/D10 and documentation scopes are unchanged; AUTH-01 separation is recorded in owning task/ADR, not an invented Director launch decision.
- **reviewed_unchanged:** [docs/vision/decision_register.csv](docs/vision/decision_register.csv) — Compared source ownership and current milestone/contract statements with PLAY-03. Existing vision/provider/budget/D10 and documentation scopes are unchanged; AUTH-01 separation is recorded in owning task/ADR, not an invented Director launch decision.
- **updated:** [docs/vision/requirements.csv](docs/vision/requirements.csv) — Compared source ownership and current milestone/contract statements with PLAY-03. Added partial PLAY-03 ticket/evidence only; all548 source definitions,20 optional flags and status/device/disposition fields retained.
- **reviewed_unchanged:** [infra/README.md](infra/README.md) — Compared source ownership and current milestone/contract statements with PLAY-03. No owned code/policy is altered: retain the dated milestone evidence and its source-specific limits, universal workflow, synthetic card/fan-content and provider/rules/engine gates. Current transport is documented in ADR0015/live operation rather than claiming broader acceptance.
- **updated:** [packages/contracts/README.md](packages/contracts/README.md) — Compared source ownership and current milestone/contract statements with PLAY-03. Update current checkpoint or owning behavior for distinct live2/diagnostic1, additive0004,13-workspace closure and explicit AUTH/admission/qualification limits; preserve dated executed results.
- **updated:** [packages/db/README.md](packages/db/README.md) — Compared source ownership and current milestone/contract statements with PLAY-03. Update current checkpoint or owning behavior for distinct live2/diagnostic1, additive0004,13-workspace closure and explicit AUTH/admission/qualification limits; preserve dated executed results.
- **reviewed_unchanged:** [packages/engine-adapter/README.md](packages/engine-adapter/README.md) — Compared source ownership and current milestone/contract statements with PLAY-03. No owned code/policy is altered: retain the dated milestone evidence and its source-specific limits, universal workflow, synthetic card/fan-content and provider/rules/engine gates. Current transport is documented in ADR0015/live operation rather than claiming broader acceptance.
- **reviewed_unchanged:** [vendor/tcg-engines/README.md](vendor/tcg-engines/README.md) — Compared source ownership and current milestone/contract statements with PLAY-03. No owned code/policy is altered: retain the dated milestone evidence and its source-specific limits, universal workflow, synthetic card/fan-content and provider/rules/engine gates. Current transport is documented in ADR0015/live operation rather than claiming broader acceptance.
- **reviewed_unchanged:** [docs/plans/2026-10-06-boot-02-database.md](docs/plans/2026-10-06-boot-02-database.md) — Compared source ownership and current milestone/contract statements with PLAY-03. No owned code/policy is altered: retain the dated milestone evidence and its source-specific limits, universal workflow, synthetic card/fan-content and provider/rules/engine gates. Current transport is documented in ADR0015/live operation rather than claiming broader acceptance.
- **reviewed_unchanged:** [docs/adr/0004-restricted-local-database.md](docs/adr/0004-restricted-local-database.md) — Compared source ownership and current milestone/contract statements with PLAY-03. No owned code/policy is altered: retain the dated milestone evidence and its source-specific limits, universal workflow, synthetic card/fan-content and provider/rules/engine gates. Current transport is documented in ADR0015/live operation rather than claiming broader acceptance.
- **updated:** [docs/runbooks/database.md](docs/runbooks/database.md) — Compared source ownership and current milestone/contract statements with PLAY-03. Update current checkpoint or owning behavior for distinct live2/diagnostic1, additive0004,13-workspace closure and explicit AUTH/admission/qualification limits; preserve dated executed results.
- **updated:** [docs/validation/boot-02.md](docs/validation/boot-02.md) — Compared source ownership and current milestone/contract statements with PLAY-03. Update current checkpoint or owning behavior for distinct live2/diagnostic1, additive0004,13-workspace closure and explicit AUTH/admission/qualification limits; preserve dated executed results.
- **reviewed_unchanged:** [docs/plans/2026-10-07-boot-03-ci.md](docs/plans/2026-10-07-boot-03-ci.md) — Compared source ownership and current milestone/contract statements with PLAY-03. No owned code/policy is altered: retain the dated milestone evidence and its source-specific limits, universal workflow, synthetic card/fan-content and provider/rules/engine gates. Current transport is documented in ADR0015/live operation rather than claiming broader acceptance.
- **reviewed_unchanged:** [docs/adr/0005-ci-artifact-qualification.md](docs/adr/0005-ci-artifact-qualification.md) — Compared source ownership and current milestone/contract statements with PLAY-03. No owned code/policy is altered: retain the dated milestone evidence and its source-specific limits, universal workflow, synthetic card/fan-content and provider/rules/engine gates. Current transport is documented in ADR0015/live operation rather than claiming broader acceptance.
- **updated:** [docs/runbooks/ci.md](docs/runbooks/ci.md) — Compared source ownership and current milestone/contract statements with PLAY-03. Update current checkpoint or owning behavior for distinct live2/diagnostic1, additive0004,13-workspace closure and explicit AUTH/admission/qualification limits; preserve dated executed results.
- **updated:** [docs/validation/boot-03.md](docs/validation/boot-03.md) — Compared source ownership and current milestone/contract statements with PLAY-03. Update current checkpoint or owning behavior for distinct live2/diagnostic1, additive0004,13-workspace closure and explicit AUTH/admission/qualification limits; preserve dated executed results.
- **reviewed_unchanged:** [docs/plans/2026-10-07-boot-05-contracts.md](docs/plans/2026-10-07-boot-05-contracts.md) — Compared source ownership and current milestone/contract statements with PLAY-03. No owned code/policy is altered: retain the dated milestone evidence and its source-specific limits, universal workflow, synthetic card/fan-content and provider/rules/engine gates. Current transport is documented in ADR0015/live operation rather than claiming broader acceptance.
- **updated:** [docs/validation/boot-05.md](docs/validation/boot-05.md) — Compared source ownership and current milestone/contract statements with PLAY-03. Update current checkpoint or owning behavior for distinct live2/diagnostic1, additive0004,13-workspace closure and explicit AUTH/admission/qualification limits; preserve dated executed results.
- **reviewed_unchanged:** [docs/plans/2026-10-10-boot-04-decision-worksheet.md](docs/plans/2026-10-10-boot-04-decision-worksheet.md) — Compared source ownership and current milestone/contract statements with PLAY-03. No owned code/policy is altered: retain the dated milestone evidence and its source-specific limits, universal workflow, synthetic card/fan-content and provider/rules/engine gates. Current transport is documented in ADR0015/live operation rather than claiming broader acceptance.
- **reviewed_unchanged:** [docs/policies/fan-content.md](docs/policies/fan-content.md) — Compared source ownership and current milestone/contract statements with PLAY-03. No owned code/policy is altered: retain the dated milestone evidence and its source-specific limits, universal workflow, synthetic card/fan-content and provider/rules/engine gates. Current transport is documented in ADR0015/live operation rather than claiming broader acceptance.
- **reviewed_unchanged:** [docs/validation/boot-04.md](docs/validation/boot-04.md) — Compared source ownership and current milestone/contract statements with PLAY-03. No owned code/policy is altered: retain the dated milestone evidence and its source-specific limits, universal workflow, synthetic card/fan-content and provider/rules/engine gates. Current transport is documented in ADR0015/live operation rather than claiming broader acceptance.
- **reviewed_unchanged:** [docs/rules/README.md](docs/rules/README.md) — Compared source ownership and current milestone/contract statements with PLAY-03. No owned code/policy is altered: retain the dated milestone evidence and its source-specific limits, universal workflow, synthetic card/fan-content and provider/rules/engine gates. Current transport is documented in ADR0015/live operation rather than claiming broader acceptance.
- **reviewed_unchanged:** [docs/rules/source-specs-supplement.json](docs/rules/source-specs-supplement.json) — Compared source ownership and current milestone/contract statements with PLAY-03. Native schema1, closed evidence/device/history contracts and authoring templates remain unchanged; only owning map/feature/source snapshots are refreshed where applicable.
- **reviewed_unchanged:** [docs/rules/source-specs.json](docs/rules/source-specs.json) — Compared source ownership and current milestone/contract statements with PLAY-03. Native schema1, closed evidence/device/history contracts and authoring templates remain unchanged; only owning map/feature/source snapshots are refreshed where applicable.
- **reviewed_unchanged:** [docs/validation/rule-01.md](docs/validation/rule-01.md) — Compared source ownership and current milestone/contract statements with PLAY-03. No owned code/policy is altered: retain the dated milestone evidence and its source-specific limits, universal workflow, synthetic card/fan-content and provider/rules/engine gates. Current transport is documented in ADR0015/live operation rather than claiming broader acceptance.
- **reviewed_unchanged:** [packages/engine-lab/README.md](packages/engine-lab/README.md) — Compared source ownership and current milestone/contract statements with PLAY-03. No owned code/policy is altered: retain the dated milestone evidence and its source-specific limits, universal workflow, synthetic card/fan-content and provider/rules/engine gates. Current transport is documented in ADR0015/live operation rather than claiming broader acceptance.
- **updated:** [docs/runbooks/engine.md](docs/runbooks/engine.md) — Compared source ownership and current milestone/contract statements with PLAY-03. Update current checkpoint or owning behavior for distinct live2/diagnostic1, additive0004,13-workspace closure and explicit AUTH/admission/qualification limits; preserve dated executed results.
- **reviewed_unchanged:** [docs/validation/rule-02.md](docs/validation/rule-02.md) — Compared source ownership and current milestone/contract statements with PLAY-03. No owned code/policy is altered: retain the dated milestone evidence and its source-specific limits, universal workflow, synthetic card/fan-content and provider/rules/engine gates. Current transport is documented in ADR0015/live operation rather than claiming broader acceptance.
- **reviewed_unchanged:** [docs/adr/0009-pinned-engine-qualification.md](docs/adr/0009-pinned-engine-qualification.md) — Compared source ownership and current milestone/contract statements with PLAY-03. No owned code/policy is altered: retain the dated milestone evidence and its source-specific limits, universal workflow, synthetic card/fan-content and provider/rules/engine gates. Current transport is documented in ADR0015/live operation rather than claiming broader acceptance.
- **reviewed_unchanged:** [docs/adr/0010-secure-randomness-replay.md](docs/adr/0010-secure-randomness-replay.md) — Compared source ownership and current milestone/contract statements with PLAY-03. No owned code/policy is altered: retain the dated milestone evidence and its source-specific limits, universal workflow, synthetic card/fan-content and provider/rules/engine gates. Current transport is documented in ADR0015/live operation rather than claiming broader acceptance.
- **reviewed_unchanged:** [docs/validation/rule-03.md](docs/validation/rule-03.md) — Compared source ownership and current milestone/contract statements with PLAY-03. No owned code/policy is altered: retain the dated milestone evidence and its source-specific limits, universal workflow, synthetic card/fan-content and provider/rules/engine gates. Current transport is documented in ADR0015/live operation rather than claiming broader acceptance.
- **updated:** [docs/validation/play-01.md](docs/validation/play-01.md) — Compared source ownership and current milestone/contract statements with PLAY-03. Update current checkpoint or owning behavior for distinct live2/diagnostic1, additive0004,13-workspace closure and explicit AUTH/admission/qualification limits; preserve dated executed results.
- **reviewed_unchanged:** [docs/validation/clock-investigation.md](docs/validation/clock-investigation.md) — Compared source ownership and current milestone/contract statements with PLAY-03. No owned code/policy is altered: retain the dated milestone evidence and its source-specific limits, universal workflow, synthetic card/fan-content and provider/rules/engine gates. Current transport is documented in ADR0015/live operation rather than claiming broader acceptance.
- **updated:** [docs/adr/0015-live-synthetic-transport.md](docs/adr/0015-live-synthetic-transport.md) — Compared source ownership and current milestone/contract statements with PLAY-03. Update current checkpoint or owning behavior for distinct live2/diagnostic1, additive0004,13-workspace closure and explicit AUTH/admission/qualification limits; preserve dated executed results.
- **updated:** [packages/match-client/README.md](packages/match-client/README.md) — Compared source ownership and current milestone/contract statements with PLAY-03. Update current checkpoint or owning behavior for distinct live2/diagnostic1, additive0004,13-workspace closure and explicit AUTH/admission/qualification limits; preserve dated executed results.
- **updated:** [docs/contracts/live.md](docs/contracts/live.md) — Compared source ownership and current milestone/contract statements with PLAY-03. Update current checkpoint or owning behavior for distinct live2/diagnostic1, additive0004,13-workspace closure and explicit AUTH/admission/qualification limits; preserve dated executed results.
- **updated:** [docs/runbooks/live-matches.md](docs/runbooks/live-matches.md) — Compared source ownership and current milestone/contract statements with PLAY-03. Update current checkpoint or owning behavior for distinct live2/diagnostic1, additive0004,13-workspace closure and explicit AUTH/admission/qualification limits; preserve dated executed results.
- **updated:** [docs/validation/play-03.md](docs/validation/play-03.md) — Compared source ownership and current milestone/contract statements with PLAY-03. Update current checkpoint or owning behavior for distinct live2/diagnostic1, additive0004,13-workspace closure and explicit AUTH/admission/qualification limits; preserve dated executed results.
- **reviewed_unchanged:** [docs/schemas/change.schema.json](docs/schemas/change.schema.json) — Reviewed unchanged native schema/authoring contracts or owning current source policy against PLAY-03. Keep schema1 append-only evidence, certification and all unrelated product/device/provider gates. New transport behavior belongs to ADR0015/live contract; no prior execution record is rewritten.
- **reviewed_unchanged:** [docs/schemas/documentation-map.schema.json](docs/schemas/documentation-map.schema.json) — Reviewed unchanged native schema/authoring contracts or owning current source policy against PLAY-03. Keep schema1 append-only evidence, certification and all unrelated product/device/provider gates. New transport behavior belongs to ADR0015/live contract; no prior execution record is rewritten.
- **reviewed_unchanged:** [docs/schemas/state.schema.json](docs/schemas/state.schema.json) — Reviewed unchanged native schema/authoring contracts or owning current source policy against PLAY-03. Keep schema1 append-only evidence, certification and all unrelated product/device/provider gates. New transport behavior belongs to ADR0015/live contract; no prior execution record is rewritten.
- **reviewed_unchanged:** [docs/schemas/features.schema.json](docs/schemas/features.schema.json) — Reviewed unchanged native schema/authoring contracts or owning current source policy against PLAY-03. Keep schema1 append-only evidence, certification and all unrelated product/device/provider gates. New transport behavior belongs to ADR0015/live contract; no prior execution record is rewritten.
- **reviewed_unchanged:** [docs/schemas/run.schema.json](docs/schemas/run.schema.json) — Reviewed unchanged native schema/authoring contracts or owning current source policy against PLAY-03. Keep schema1 append-only evidence, certification and all unrelated product/device/provider gates. New transport behavior belongs to ADR0015/live contract; no prior execution record is rewritten.
- **reviewed_unchanged:** [docs/schemas/card-certification.schema.json](docs/schemas/card-certification.schema.json) — Reviewed unchanged native schema/authoring contracts or owning current source policy against PLAY-03. Keep schema1 append-only evidence, certification and all unrelated product/device/provider gates. New transport behavior belongs to ADR0015/live contract; no prior execution record is rewritten.

Full changed-file inventory: [record](docs/changes/CHG-20261014-006.json).

### Limits and next actions

- AUTH-01 deliberately remains separate; optional injected test-session transport does not enable ordinary/card/reward/observer/private-choice admission or supply actual login/recovery, clocks, game UI, device/load/production acceptance.
- Separate gateway processes run inside one existing container; no remote-machine/network fault or50-player capacity proof. Real-card restore/event bounds, abandoned quota-key retention/global connection sizing and production proxy/TLS need later evidence.
- No clock/environment repair or guard change; no new isolated/hosted PLAY-03 artifact/timing qualification. RUN072 observes prior hosted PLAY-02 metadata only. All scoped failures and earlier clock-rejected receipts remain immutable.
- Director review/audit/publication and hosted CI on this prepared local branch before any merge; next documented implementation PLAY-04 requires its own intake and policy decisions.

## CHG-20261014-005 — Independent audit of PLAY-02 synthetic viewer projection privacy and Director-requested integration into main

- Status: finalized
- Actor: Claude Code agent (architect/QA reviewer role) on Director request, local WSL session
- Recorded (UTC): 2026-10-14T20:21:33.000Z
- Event: unknown; recorded retrospectively (recorded_only)
- Source: 780c26e69c027b6a2afffa5fa43b2df8294cfcf1
- Tasks: PLAY-02, DOC-01, DOC-02
- Features: F-DOCS, F-VIEWER-PRIVACY, F-ENGINE
- Requirements: none

### Changes

- **review:** Audited Codex commit 780c26e (PLAY-02, CHG-20261014-004) against ADR0014, the viewer contract, blueprint §§6.2/6.4/7.5/13 and the backlog acceptance (opponent hand/deck identity absent from every transport/resource/log/export path). The review covered: the closed TypeBox DTO and surface/diagnostic codecs (bounded bytes, no accessor evaluation, fixed outcomes); the projector's allowlist (fronts for play/discard/own hand/authorized reveals, backs elsewhere, normal-inking reveal correlated by state ID to the actual inked card, front-only metadata normalization, slot-derived back references, ref-sorted private zones, recipient-scoped reveal history without object links); the resolver's per-move field profile; the two-line kernel bridge `inspect` and its absence from Lab RPC; HMAC viewer-key domain separation from the RNG stream, with zeroing on dispose; the projection-only worker reply; and the participant-only read-only committed `view` with pin and post-condition checks. Verdict: PLAY-02 acceptance is met for the supported two-player synthetic scope; no blocking finding.
- **test:** Independent runs RUN-20261014-064..069 all passed at Codex's final fingerprint e3a9578b with exact timing and 0 redactions. RUN064: full verify:foundation (307 project checks = 283 Node + 24 Python; 406 upstream passes/1 inherited skip; 2 injection). RUN065: auditor real-engine probe. Each instance was relabelled with a unique definition so hidden identity is meaningful. Paired hidden worlds differed by renamed/reshuffled hidden instances, hidden definitions, metadata/controller and raw G/ctx/event noise; they gave 495 byte-identical encodings across three viewers at every revision of a complete game, with 369 positive controls. A second complete game was driven only through references: 55 read-only/restored revisions; 4,834 stale, 1,746 cross-viewer, 1,480 public and 432 raw references rejected. RUN066: auditor live PostgreSQL view probe. Adapter equality held at 13 committed versions under 16-way concurrency; 24 views racing a commit each saw the old or new state; 16 INVALID_REQUEST without accessors; FORBIDDEN for outsider/missing; PIN_UNAVAILABLE; six checkpoint forgeries failed closed; a 48-view burst served 34 and refused 14; restart reproduced; terminal hands stayed private. RUN067: boundary/bundle/migration probe (340 browser and 60 server imports refused; Lab never calls inspect; no server markers in bundles; vendor diff is the bridge only, kernel 896,076 bytes; migrations and privileges unchanged). RUN068: Codex database suites (5 + 3 + 11, eight identities). RUN069: Chromium 7 scenarios + 2 Lab workers. RUN070: docs:check covers this record.
- **review:** Publication review of the two unpublished clock-documentation commits carried by the branch (e36d223, 3983e1c; CHG-20261014-001..003): documentation and evidence only, with no source change. Decoded Windows/WSL archives contain no hostname, hardware/account identifier, email or credential. The only identifiers are two public time.windows.com NTP addresses and the Windows account path segment already present in the published handoff. No private .env.local/database credential value appears in the branch diff; the three token-pattern matches are the scanner's own regular expression.
- **review:** Follow-ups recorded, none blocking: (1) PLAY-03 must route every client command through the current-reference resolver; the internal service submit still accepts raw engine identities, which is safe only while no client ingress exists. (2) References include the opponent's anonymous ink backs and resolve server-side; today the engine rejects uniformly (DEFENDER_NOT_IN_PLAY) and the service stores only invalid_intent, but real-card outcomes must stay independent of hidden identity, or resolvable references must be restricted per field. (3) Each view restores by full re-execution in a fresh worker, sharing the 2-active/32-queued capacity: about 205-256 ms per concurrent pair for a 16-version game. PLAY-03 needs per-version caching and request limits (extends the PLAY-01 restore-cost follow-up). (4) The projector fails closed above 4,096 raw engine events; synthetic play uses about 7.2 per accepted move, so real-card matches must be measured. (5) The participant move list and the conservative under-card/inkwell visibility defaults must be rechecked during real-card certification. (6) Naming only: the Lab and upstream.lock.json still say pending_PLAY-02; the Lab's hidden-state refusal is correct.
- **documentation:** Appended a dated independent-audit section to docs/validation/play-02.md and dated audit notes to ADR0014, the PLAY-02 plan and the viewer-privacy runbook. Added the audit sentence to the PLAY-02 paragraph of AGENTS.md, README.md and docs/README.md. Rewrote HANDOFF for the audit state. Added the audit to the F-VIEWER-PRIVACY description and RUN064..069 evidence. Corrected the stale F-ENGINE 'PLAY-02 wire/log privacy pending' to point to F-VIEWER-PRIVACY. Updated the F-VIEWER-PRIVACY table cell and added the PLAY-02 backlog evidence link to this record (status unchanged).
- **review:** Local isolated CI was not rerun. During the audit the container clock stepped about 91 ms every 30 s (about 1.1 s over the six-minute pipeline, consistent with Codex's clock-rejected RUN051), and the Director declined environment repair; the PLAY-01 host memory incident also argues for one heavy run at a time. Hosted Foundation qualification is dispatched on the published audit branch before main is fast-forwarded and observed again on main; both run IDs are recorded in a later change.

### Verification

- **passed:** Timing-valid pnpm verify:foundation: 307 project checks (283 Node + 24 Python), 406 upstream passes/1 inherited skip/1,362 expectations, 2 injection tests, viewer wire tests. Local Dev Container. ([evidence](docs/validation/runs/RUN-20261014-064.json))
- **passed:** Auditor real-engine noninterference and reference probe across two complete synthetic games. ([evidence](docs/validation/runs/RUN-20261014-065.json))
- **passed:** Auditor live PostgreSQL probe of committed participant views. ([evidence](docs/validation/runs/RUN-20261014-066.json))
- **passed:** Auditor boundary, bundle, vendor-diff and migration/privilege probe on local and test databases. ([evidence](docs/validation/runs/RUN-20261014-067.json))
- **passed:** Codex database suites: db:check, local/test health, db:test 5, storage 3, match integration 11. ([evidence](docs/validation/runs/RUN-20261014-068.json))
- **passed:** Linux headless Chromium: 7 foundation/viewer-codec scenarios and 2 isolated Lab workers. ([evidence](docs/validation/runs/RUN-20261014-069.json))
- **passed:** docs:check over the completed audit documentation and evidence (static). ([evidence](docs/validation/runs/RUN-20261014-070.json))

### Documentation and files

- **updated:** [docs/validation/play-02.md](docs/validation/play-02.md) — Appended a dated independent-audit section: run outcomes, review scope, verdict, clock-commit publication review, follow-ups and the isolated-CI decision; Codex text unchanged.
- **updated:** [docs/adr/0014-viewer-projection-privacy.md](docs/adr/0014-viewer-projection-privacy.md) — Dated audit note: decision unchanged and consistent with the source; PLAY-03 follow-ups.
- **updated:** [docs/plans/2026-10-14-play-02-viewer-privacy.md](docs/plans/2026-10-14-play-02-viewer-privacy.md) — Execution note recording the independent audit and hosted-CI-before-merge sequence.
- **updated:** [docs/runbooks/viewer-privacy.md](docs/runbooks/viewer-privacy.md) — Audit cautions: resolver-only commands, back-reference outcomes, view cost/caching, event bound.
- **updated:** [docs/HANDOFF.md](docs/HANDOFF.md) — Audit state, verification, follow-ups and the publication/integration sequence; Codex implementation summary retained.
- **updated:** [AGENTS.md](AGENTS.md) — PLAY-02 paragraph notes the independent audit, hosted-CI-before-merge sequence and the PLAY-03 resolver/caching follow-ups.
- **updated:** [README.md](README.md) — Same PLAY-02 audit sentence as AGENTS.md.
- **updated:** [docs/README.md](docs/README.md) — Same PLAY-02 audit sentence as AGENTS.md.
- **updated:** [docs/features.json](docs/features.json) — F-VIEWER-PRIVACY notes the audit and adds RUN-20261014-064..069 evidence; F-ENGINE's stale PLAY-02-pending clause now points to F-VIEWER-PRIVACY.
- **updated:** [docs/FEATURES.md](docs/FEATURES.md) — F-VIEWER-PRIVACY acceptance-limit cell references the independent audit runs.
- **updated:** [docs/vision/initial_backlog.csv](docs/vision/initial_backlog.csv) — PLAY-02 evidence link to this audit record only; status and every other row unchanged.
- **reviewed_unchanged:** [docs/contracts/viewer.md](docs/contracts/viewer.md) — Matches the audited DTO, codecs, reference and visibility policy; follow-ups belong to PLAY-03/card certification.
- **reviewed_unchanged:** [docs/reviews/2026-10-14-play-02-privacy.md](docs/reviews/2026-10-14-play-02-privacy.md) — Codex's commissioned review is consistent with the source; this audit adds independent execution it did not perform.
- **reviewed_unchanged:** [docs/vision/requirements.csv](docs/vision/requirements.csv) — PLAY-02 evidence-link edits reviewed; 548 dispositions and 20 optional flags unchanged.
- **reviewed_unchanged:** [docs/runbooks/match-commands.md](docs/runbooks/match-commands.md) — PLAY-02 note consistent with the added view method and unchanged command path.
- **reviewed_unchanged:** [docs/validation/clock-investigation.md](docs/validation/clock-investigation.md) — Reviewed for publication with its archives; no personal or credential data; the audit's clock-step observation is consistent with it.
- **reviewed_unchanged:** [docs/DEVELOPMENT_WORKFLOW.md](docs/DEVELOPMENT_WORKFLOW.md) — Sequential heavy-workload rule followed; no change needed.
- **historical_preserved:** [docs/changes/CHG-20261014-004.json](docs/changes/CHG-20261014-004.json) — Finalized Codex record; audited, not modified.
- **historical_preserved:** [docs/changes/CHG-20261014-003.json](docs/changes/CHG-20261014-003.json) — Finalized clock record carried by the branch; reviewed for publication, not modified.

Full changed-file inventory: [record](docs/changes/CHG-20261014-005.json).

### Limits and next actions

- Audit evidence is local Linux Dev Container and headless Chromium only; no Windows, touch, GPU, load or production observation.
- Local isolated CI was not rerun (clock stepping and the unchanged guard); hosted CI results are observed after publication and recorded in a later change.
- Probes characterize the two-player synthetic catalog with relabelled definitions; real-card effects, private choices, authenticated transport, publication, delayed/privileged observers, clocks and multiplayer remain gated.
- Push the Codex and audit branches, run hosted Foundation qualification on claude/play-02-audit, fast-forward main only after it passes, observe the main run and record both run IDs in the next change.
- PLAY-03 next; carry the resolver-only command, back-reference outcome, projection caching/limits and event-bound measurement follow-ups into its plan.

## CHG-20261014-004 — PLAY-02 viewer projections and noninterference

- Status: finalized
- Actor: Codex architect/developer/QA collaborator
- Recorded (UTC): 2026-10-14T18:41:50.827Z
- Event: unknown; recorded retrospectively (recorded_only)
- Source: 3983e1c5907e2a1141de1c3d2484944236e257a8
- Tasks: PLAY-02, DOC-01, DOC-02
- Features: F-DOCS, F-CONTRACTS, F-ENGINE, F-MATCH-COMMANDS, F-VIEWER-PRIVACY, F-BOUNDARIES
- Requirements: R01.020, R02.025, R02.026, R02.032, R02.033, R15.015, R15.016, R15.017, R17.004, R17.009, R29.005

### Changes

- **review:** Director assigns PLAY-02 and ends clock work. Intake clean3983e1c; existing clock diagnosis/history retained without further environment maintenance. Review approved blueprint/ADR0008, current command persistence/protocol and every viewer/resource/log/export boundary before implementation.
- **implementation:** Closed independent synthetic viewer/surface/diagnostic contracts; fresh authorized card/resource/semantic/reveal DTOs, revision-bound HMAC refs/resolver and private engine/checkpoint friends. Pure bridge inspection stays behind Lab/server facades; all upstream361 files/59patches unchanged.
- **function:** EngineExecutor.project returns a validated DTO-only worker reply; createMatchService.view uses participant-restricted committed load, exact pins/version/terminal correlation and existing bounded worker lifecycle without durable writes. Synthetic admission metadata acknowledges projection but still blocks hidden play pending recipient/transport qualification.
- **test:** Discriminating red-to-green mixed visibility, public/participant roles, deck/private effect/log noninterference, exclusive reveal expiry, face-down/under/ink policy, refs/raw-ID/crossmatch/crossviewer rejection, no RNG/journal change, real DB recovery/roles, actual independent HTTP/WS output bytes, browser source/bundle negatives. Root test includes wire proof in existing CI foundation.
- **fix:** Tests exposed dynamic-union typing, default under-card front disclosure, upstream inking UI reveal duration/SYSTEM provenance, viewer getter evaluation and shared reveal/animation arrays. Narrow first-single-card window matching preserves independent same-state effects; authorized unlinked historical reveals preserve public normal-inking evidence.
- **revision:** Wire fixture HTTP_HEADERS_SENT was reproduced and its owned hung child alone terminated in RUN034. Validate route before headers; RUN035 passes actualbytes. No product or environment service was stopped.
- **documentation:** Native ADR0014/plan/contract/runbook/validation, feature register/source-impact map, handoff, current primary docs and task/requirement evidence are synchronized; prior dated source results and original requirement/device/optional flags remain unchanged.
- **fix:** Independent review follow-ups reproduced in RUN037: preserve unrelated same-state reveal windows and retain authorized historical normal-inking definitions without current object links. RUN038 rejected aliased notice arrays; RUN039 uses separate arrays and passes. RUN041 caught explicit-type/global/test-import lint style; RUN042 fixes and passes without weakening rules.
- **test:** Add actual single-worker Chromium execution of the public viewer/surface codec, UTF8/role/private/getter refusal; private projector/RNG remains outside browser module boundaries.
- **review:** Independent read-only code review found no synthetic-scope blocker; owner-doc pass corrected adapter/service recipient wording and RUN047-vs049 bundle evidence attribution. Reviewer ran no tests. Parent review follow-ups are discriminating red/green tests with full final-source suite.
- **test:** Final matching source: RUN047 full foundation306project/406upstream+1skip/2injection; RUN048DB/connectivity/roles/5DB+3storage+11matches; RUN0497Chromium+2Labworkers. RUN051 all14 isolated child stages/artifact generation exit0 but immutable receipt failed clock_changed; original services preserved and disposable resources cleaned. No retry/repair or timing waiver.
- **fix:** Final front-only permission review: RUN053 reproduced hidden orientation/damage/drying copying alongside a revealed hand/deck front. Canonicalize outside-play fields and controller while preserving actual top-level play state and public ink orientation. RUN05431adapter checks pass; separate narrow static reviewer confirms correction and controller variation coverage. Earlier full/isolated receipts become prior-source evidence; refresh current broad checks without repeating known clock rejection.
- **test:** After final front-only/controller coverage, matching fingerprint e3a9578be616125963591d956509c85eb2b2581912648baed88a62ad2c8d4d6b: RUN056full307project/406upstream+1skip/2injection, RUN057originalDB+8roles+5DB+3storage+11matches, RUN0587Chromium+2Labworkers and RUN059clean source-only frozen install/full foundation all pass with valid timing. RUN051 remains prior-source failed clock receipt; no isolated retry or clock mutation.
- **documentation:** Final semantic closure updates the current feature table and AGENTS boundary, labels earlier qualification as historical, and records native synchronization/preservation. RUN061 helper failed on its default1MiB Git output buffer; RUN062 corrected only the proof helper with a bounded16MiB read and passed canonical/private-file/original548+20/listener/provenance/full-history-secret/immutable-record checks. No executable source, clock settings or failed receipt was changed.

### Verification

- **passed:** PLAY-02 intake metadata synchronization before initial application baseline; no game code changes ([evidence](docs/validation/runs/RUN-20261014-022.json))
- **passed:** PLAY-02 initial unchanged application baseline: project doctor, static verification, five bootstrap tests and authenticated existing PostgreSQL ([evidence](docs/validation/runs/RUN-20261014-023.json))
- **failed:** PLAY-02 red regression: mixed hidden-state projector is absent ([evidence](docs/validation/runs/RUN-20261014-024.json))
- **failed:** PLAY-02 initial projector implementation compile and mixed hidden-state regressions ([evidence](docs/validation/runs/RUN-20261014-025.json))
- **passed:** PLAY-02 projector typed literal correction and seven visibility regressions ([evidence](docs/validation/runs/RUN-20261014-026.json))
- **failed:** PLAY-02 red integration and face-down under-card regression before private engine wiring ([evidence](docs/validation/runs/RUN-20261014-027.json))
- **failed:** PLAY-02 kernel friend, private projection/ref resolver compile and adapter regressions ([evidence](docs/validation/runs/RUN-20261014-028.json))
- **failed:** PLAY-02 red closed output-path codecs and non-invoked viewer accessor tests ([evidence](docs/validation/runs/RUN-20261014-029.json))
- **failed:** PLAY-02 all adapter/contract tests after reveal-provenance and closed viewer/input/output fixes ([evidence](docs/validation/runs/RUN-20261014-030.json))
- **failed:** PLAY-02 red bounded worker projection; committed read test added to existing integration entry ([evidence](docs/validation/runs/RUN-20261014-031.json))
- **failed:** PLAY-02 red participant-only committed projection; test uses the existing isolated test database ([evidence](docs/validation/runs/RUN-20261014-032.json))
- **passed:** PLAY-02 compile contracts/adapter/service, all adapter/service unit and real database regressions sequentially ([evidence](docs/validation/runs/RUN-20261014-033.json))
- **failed:** PLAY-02 actual independent loopback HTTP/WebSocket bytes across five privacy surfaces and paired hidden worlds ([evidence](docs/validation/runs/RUN-20261014-034.json))
- **passed:** PLAY-02 wire fixture correction: validate route before sending headers; HTTP/WebSocket privacy and forbidden role response ([evidence](docs/validation/runs/RUN-20261014-035.json))
- **failed:** PLAY-02 red qualification metadata while maintaining hidden-state transport/recipient admission gate ([evidence](docs/validation/runs/RUN-20261014-036.json))
- **failed:** PLAY-02 reviewer follow-up red: independent same-state effect reveal and unlinked public normal-inking evidence ([evidence](docs/validation/runs/RUN-20261014-037.json))
- **failed:** PLAY-02 review corrections: narrow normal-inking window correlation, authorized unlinked reveal notices and retained admission gates ([evidence](docs/validation/runs/RUN-20261014-038.json))
- **passed:** PLAY-02 reveal notice correction: independent animation arrays satisfy closed plain-data codec; review regressions and scopes ([evidence](docs/validation/runs/RUN-20261014-039.json))
- **passed:** PLAY-02 implementation checkpoint native source/file/callable/changelog/doc impact synchronization before broad verification ([evidence](docs/validation/runs/RUN-20261014-040.json))
- **failed:** PLAY-02 final-source frozen install, exact toolchain and complete foundation verification sequentially ([evidence](docs/validation/runs/RUN-20261014-041.json))
- **passed:** PLAY-02 lint corrections: explicit type imports and Node globals/test-local boundary import; all source boundaries ([evidence](docs/validation/runs/RUN-20261014-042.json))
- **passed:** PLAY-02 review/lint correction native documentation synchronization for final unchanged source qualification ([evidence](docs/validation/runs/RUN-20261014-043.json))
- **failed:** PLAY-02 current doc/file coverage after explicit Chromium public viewer codec test ([evidence](docs/validation/runs/RUN-20261014-044.json))
- **failed:** PLAY-02 final complete foundation: static/docs, package typechecks, lint/boundaries, all project/upstream/injection/wire tests ([evidence](docs/validation/runs/RUN-20261014-045.json))
- **passed:** PLAY-02 native coverage correction includes new web README/test before qualification ([evidence](docs/validation/runs/RUN-20261014-046.json))
- **passed:** PLAY-02 full foundation after native source/doc correction; complete project/upstream/injection/output privacy suite ([evidence](docs/validation/runs/RUN-20261014-047.json))
- **passed:** PLAY-02 final-source original DB connectivity, local/test role health, live DB restrictions and durable matches/projection reads ([evidence](docs/validation/runs/RUN-20261014-048.json))
- **passed:** PLAY-02 Linux single-worker Chromium: foundation renderer/protocol and actual public viewer codec, followed by two isolated Lab workers ([evidence](docs/validation/runs/RUN-20261014-049.json))
- **passed:** PLAY-02 source-matched foundation/database/Chromium native feature evidence and independent review checkpoint synchronization ([evidence](docs/validation/runs/RUN-20261014-050.json))
- **failed:** Actual isolated BOOT-03 pipeline: frozen foundation, live PostgreSQL, Linux browser, dependency/secret scans and artifacts ([evidence](docs/validation/runs/RUN-20261014-051.json))
- **passed:** PLAY-02 technical acceptance documentation closure; failed isolated timing preserved and all current/task/feature/callable evidence synchronized ([evidence](docs/validation/runs/RUN-20261014-052.json))
- **failed:** PLAY-02 final-review red: a card-front reveal must not widen permission to hidden-zone state metadata ([evidence](docs/validation/runs/RUN-20261014-053.json))
- **passed:** PLAY-02 front-only permission correction; all31 adapter regressions including private metadata paired worlds ([evidence](docs/validation/runs/RUN-20261014-054.json))
- **passed:** PLAY-02 final front-only correction: mark earlier evidence historical and synchronize current source before fresh broad qualification ([evidence](docs/validation/runs/RUN-20261014-055.json))
- **passed:** PLAY-02 final current source after front-only correction: full foundation builds/types/lint/boundaries and all project/upstream/injection/wire regressions ([evidence](docs/validation/runs/RUN-20261014-056.json))
- **passed:** PLAY-02 final front-only source: original DB connectivity/eight managed identities,5DB+3storage+11match projection/transaction/recovery checks ([evidence](docs/validation/runs/RUN-20261014-057.json))
- **passed:** PLAY-02 final front-only source: seven actual Chromium foundation/public codec cases and two Lab worker checks, sequential ([evidence](docs/validation/runs/RUN-20261014-058.json))
- **passed:** PLAY-02 final source-only clean copy: private files/Git/build output absent, frozen install and entire current foundation; owned temporary cleanup ([evidence](docs/validation/runs/RUN-20261014-059.json))
- **passed:** PLAY-02 final e3a9578b source-matched full/DB/Chromium/clean evidence, owner docs and task/feature native closure ([evidence](docs/validation/runs/RUN-20261014-060.json))
- **failed:** PLAY-02 final preservation: exact source/canonical bytes, ignored0600 private files, original548/20 scope, unchanged vendor, no owned listeners, immutable docs/logs and full-history secrets ([evidence](docs/validation/runs/RUN-20261014-061.json))
- **passed:** PLAY-02 final preservation correction: bounded16MiB Git read for generated inventory; canonical/scope/private files/listeners/provenance/immutable history and secrets ([evidence](docs/validation/runs/RUN-20261014-062.json))

### Documentation and files

- **updated:** [docs/HANDOFF.md](docs/HANDOFF.md) — Current PLAY-02 ownership/status/contracts, synthetic gates and source-specific evidence updated; earlier dated execution remains historical and no auth/official/device or clock repair acceptance is inferred. Final closure corrects current summary/table, explicitly labels prior-source evidence and records measured RUN062 preservation rather than expected cleanup.
- **updated:** [AGENTS.md](AGENTS.md) — Current PLAY-02 ownership/status/contracts, synthetic gates and source-specific evidence updated; earlier dated execution remains historical and no auth/official/device or clock repair acceptance is inferred. Final closure corrects current summary/table, explicitly labels prior-source evidence and records measured RUN062 preservation rather than expected cleanup.
- **updated:** [README.md](README.md) — Current PLAY-02 ownership/status/contracts, synthetic gates and source-specific evidence updated; earlier dated execution remains historical and no auth/official/device or clock repair acceptance is inferred.
- **updated:** [apps/match-service/README.md](apps/match-service/README.md) — Current PLAY-02 ownership/status/contracts, synthetic gates and source-specific evidence updated; earlier dated execution remains historical and no auth/official/device or clock repair acceptance is inferred.
- **reviewed_unchanged:** [docs/CHANGELOG_FORMAT.md](docs/CHANGELOG_FORMAT.md) — Native schema1 change/run fields, timestamp/append-only/file coverage, task/register and single-heavycheck contracts remain applicable; new viewer DTO is a public TypeBox contract, not a native evidence/schema format change.
- **reviewed_unchanged:** [docs/DEVELOPMENT_WORKFLOW.md](docs/DEVELOPMENT_WORKFLOW.md) — Native schema1 change/run fields, timestamp/append-only/file coverage, task/register and single-heavycheck contracts remain applicable; new viewer DTO is a public TypeBox contract, not a native evidence/schema format change.
- **updated:** [docs/FEATURES.md](docs/FEATURES.md) — Current PLAY-02 ownership/status/contracts, synthetic gates and source-specific evidence updated; earlier dated execution remains historical and no auth/official/device or clock repair acceptance is inferred. Final closure corrects current summary/table, explicitly labels prior-source evidence and records measured RUN062 preservation rather than expected cleanup.
- **updated:** [docs/README.md](docs/README.md) — Current PLAY-02 ownership/status/contracts, synthetic gates and source-specific evidence updated; earlier dated execution remains historical and no auth/official/device or clock repair acceptance is inferred.
- **updated:** [docs/WORKSPACE_QUALIFICATION.md](docs/WORKSPACE_QUALIFICATION.md) — Current PLAY-02 ownership/status/contracts, synthetic gates and source-specific evidence updated; earlier dated execution remains historical and no auth/official/device or clock repair acceptance is inferred.
- **reviewed_unchanged:** [docs/adr/0001-local-development-environment.md](docs/adr/0001-local-development-environment.md) — Existing workspace/bootstrap/full-vision/governance contract is retained. New scoped viewer evidence is recorded separately; no reserved gameplay/auth/economic/mobile/production requirement is accepted from this synthetic implementation.
- **reviewed_unchanged:** [docs/adr/0002-application-foundation.md](docs/adr/0002-application-foundation.md) — Existing workspace/bootstrap/full-vision/governance contract is retained. New scoped viewer evidence is recorded separately; no reserved gameplay/auth/economic/mobile/production requirement is accepted from this synthetic implementation.
- **reviewed_unchanged:** [docs/adr/0003-documentation-evidence.md](docs/adr/0003-documentation-evidence.md) — Existing workspace/bootstrap/full-vision/governance contract is retained. New scoped viewer evidence is recorded separately; no reserved gameplay/auth/economic/mobile/production requirement is accepted from this synthetic implementation.
- **reviewed_unchanged:** [docs/audits/2026-10-06-project-audit.md](docs/audits/2026-10-06-project-audit.md) — Existing workspace/bootstrap/full-vision/governance contract is retained. New scoped viewer evidence is recorded separately; no reserved gameplay/auth/economic/mobile/production requirement is accepted from this synthetic implementation.
- **updated:** [docs/documentation-map.json](docs/documentation-map.json) — Current PLAY-02 ownership/status/contracts, synthetic gates and source-specific evidence updated; earlier dated execution remains historical and no auth/official/device or clock repair acceptance is inferred.
- **updated:** [docs/features.json](docs/features.json) — Current PLAY-02 ownership/status/contracts, synthetic gates and source-specific evidence updated; earlier dated execution remains historical and no auth/official/device or clock repair acceptance is inferred.
- **reviewed_unchanged:** [docs/plans/2026-10-06-documentation-governance.md](docs/plans/2026-10-06-documentation-governance.md) — Existing workspace/bootstrap/full-vision/governance contract is retained. New scoped viewer evidence is recorded separately; no reserved gameplay/auth/economic/mobile/production requirement is accepted from this synthetic implementation.
- **reviewed_unchanged:** [docs/runbooks/workspace-setup.md](docs/runbooks/workspace-setup.md) — Existing workspace/bootstrap/full-vision/governance contract is retained. New scoped viewer evidence is recorded separately; no reserved gameplay/auth/economic/mobile/production requirement is accepted from this synthetic implementation.
- **reviewed_unchanged:** [docs/schemas/card-certification.schema.json](docs/schemas/card-certification.schema.json) — Native schema1 change/run fields, timestamp/append-only/file coverage, task/register and single-heavycheck contracts remain applicable; new viewer DTO is a public TypeBox contract, not a native evidence/schema format change.
- **reviewed_unchanged:** [docs/schemas/change.schema.json](docs/schemas/change.schema.json) — Native schema1 change/run fields, timestamp/append-only/file coverage, task/register and single-heavycheck contracts remain applicable; new viewer DTO is a public TypeBox contract, not a native evidence/schema format change.
- **reviewed_unchanged:** [docs/schemas/documentation-map.schema.json](docs/schemas/documentation-map.schema.json) — Native schema1 change/run fields, timestamp/append-only/file coverage, task/register and single-heavycheck contracts remain applicable; new viewer DTO is a public TypeBox contract, not a native evidence/schema format change.
- **reviewed_unchanged:** [docs/schemas/features.schema.json](docs/schemas/features.schema.json) — Native schema1 change/run fields, timestamp/append-only/file coverage, task/register and single-heavycheck contracts remain applicable; new viewer DTO is a public TypeBox contract, not a native evidence/schema format change.
- **reviewed_unchanged:** [docs/schemas/run.schema.json](docs/schemas/run.schema.json) — Native schema1 change/run fields, timestamp/append-only/file coverage, task/register and single-heavycheck contracts remain applicable; new viewer DTO is a public TypeBox contract, not a native evidence/schema format change.
- **reviewed_unchanged:** [docs/schemas/state.schema.json](docs/schemas/state.schema.json) — Native schema1 change/run fields, timestamp/append-only/file coverage, task/register and single-heavycheck contracts remain applicable; new viewer DTO is a public TypeBox contract, not a native evidence/schema format change.
- **reviewed_unchanged:** [docs/templates/change.json](docs/templates/change.json) — Native schema1 change/run fields, timestamp/append-only/file coverage, task/register and single-heavycheck contracts remain applicable; new viewer DTO is a public TypeBox contract, not a native evidence/schema format change.
- **reviewed_unchanged:** [docs/templates/handoff.md](docs/templates/handoff.md) — Native schema1 change/run fields, timestamp/append-only/file coverage, task/register and single-heavycheck contracts remain applicable; new viewer DTO is a public TypeBox contract, not a native evidence/schema format change.
- **reviewed_unchanged:** [docs/validation/boot-01.md](docs/validation/boot-01.md) — Existing workspace/bootstrap/full-vision/governance contract is retained. New scoped viewer evidence is recorded separately; no reserved gameplay/auth/economic/mobile/production requirement is accepted from this synthetic implementation.
- **updated:** [docs/vision/README.md](docs/vision/README.md) — Current PLAY-02 ownership/status/contracts, synthetic gates and source-specific evidence updated; earlier dated execution remains historical and no auth/official/device or clock repair acceptance is inferred.
- **reviewed_unchanged:** [docs/vision/additional_scope.csv](docs/vision/additional_scope.csv) — Existing workspace/bootstrap/full-vision/governance contract is retained. New scoped viewer evidence is recorded separately; no reserved gameplay/auth/economic/mobile/production requirement is accepted from this synthetic implementation.
- **reviewed_unchanged:** [docs/vision/decision_register.csv](docs/vision/decision_register.csv) — Root test includes new actual-wire checks and existing live-match entry includes new DB reads. Existing fourteen pipeline stages, isolation/artifact/clock gates and hosted-versus-local evidence definitions remain unchanged; no fresh CI acceptance inferred.
- **updated:** [docs/vision/initial_backlog.csv](docs/vision/initial_backlog.csv) — Current PLAY-02 ownership/status/contracts, synthetic gates and source-specific evidence updated; earlier dated execution remains historical and no auth/official/device or clock repair acceptance is inferred.
- **updated:** [docs/vision/requirements.csv](docs/vision/requirements.csv) — Current PLAY-02 ownership/status/contracts, synthetic gates and source-specific evidence updated; earlier dated execution remains historical and no auth/official/device or clock repair acceptance is inferred.
- **updated:** [packages/contracts/README.md](packages/contracts/README.md) — Current PLAY-02 ownership/status/contracts, synthetic gates and source-specific evidence updated; earlier dated execution remains historical and no auth/official/device or clock repair acceptance is inferred.
- **updated:** [packages/engine-adapter/README.md](packages/engine-adapter/README.md) — Current PLAY-02 ownership/status/contracts, synthetic gates and source-specific evidence updated; earlier dated execution remains historical and no auth/official/device or clock repair acceptance is inferred.
- **updated:** [vendor/tcg-engines/README.md](vendor/tcg-engines/README.md) — Current PLAY-02 ownership/status/contracts, synthetic gates and source-specific evidence updated; earlier dated execution remains historical and no auth/official/device or clock repair acceptance is inferred.
- **reviewed_unchanged:** [docs/plans/2026-10-06-boot-02-database.md](docs/plans/2026-10-06-boot-02-database.md) — Participant projection reuses existing restricted match repository and read-only checkpoint load; roles, migrations, credentials, original local/test data and recreation procedures are unchanged. New read evidence belongs to PLAY-02.
- **reviewed_unchanged:** [docs/adr/0004-restricted-local-database.md](docs/adr/0004-restricted-local-database.md) — Participant projection reuses existing restricted match repository and read-only checkpoint load; roles, migrations, credentials, original local/test data and recreation procedures are unchanged. New read evidence belongs to PLAY-02.
- **reviewed_unchanged:** [docs/runbooks/database.md](docs/runbooks/database.md) — Participant projection reuses existing restricted match repository and read-only checkpoint load; roles, migrations, credentials, original local/test data and recreation procedures are unchanged. New read evidence belongs to PLAY-02.
- **reviewed_unchanged:** [docs/validation/boot-02.md](docs/validation/boot-02.md) — Participant projection reuses existing restricted match repository and read-only checkpoint load; roles, migrations, credentials, original local/test data and recreation procedures are unchanged. New read evidence belongs to PLAY-02.
- **reviewed_unchanged:** [docs/plans/2026-10-07-boot-03-ci.md](docs/plans/2026-10-07-boot-03-ci.md) — Root test includes new actual-wire checks and existing live-match entry includes new DB reads. Existing fourteen pipeline stages, isolation/artifact/clock gates and hosted-versus-local evidence definitions remain unchanged; no fresh CI acceptance inferred.
- **reviewed_unchanged:** [docs/adr/0005-ci-artifact-qualification.md](docs/adr/0005-ci-artifact-qualification.md) — Root test includes new actual-wire checks and existing live-match entry includes new DB reads. Existing fourteen pipeline stages, isolation/artifact/clock gates and hosted-versus-local evidence definitions remain unchanged; no fresh CI acceptance inferred.
- **reviewed_unchanged:** [docs/runbooks/ci.md](docs/runbooks/ci.md) — Root test includes new actual-wire checks and existing live-match entry includes new DB reads. Existing fourteen pipeline stages, isolation/artifact/clock gates and hosted-versus-local evidence definitions remain unchanged; no fresh CI acceptance inferred.
- **reviewed_unchanged:** [docs/validation/boot-03.md](docs/validation/boot-03.md) — Root test includes new actual-wire checks and existing live-match entry includes new DB reads. Existing fourteen pipeline stages, isolation/artifact/clock gates and hosted-versus-local evidence definitions remain unchanged; no fresh CI acceptance inferred.
- **reviewed_unchanged:** [docs/plans/2026-10-07-boot-05-contracts.md](docs/plans/2026-10-07-boot-05-contracts.md) — BOOT-05 transport protocol1 and its counts-only diagnostic shape remain unchanged. Separate viewer DTO revision1 is documented in the owning contract; no negotiation range/retained manifest handler is widened.
- **updated:** [docs/contracts/protocol.md](docs/contracts/protocol.md) — Current PLAY-02 ownership/status/contracts, synthetic gates and source-specific evidence updated; earlier dated execution remains historical and no auth/official/device or clock repair acceptance is inferred.
- **updated:** [docs/contracts/release.md](docs/contracts/release.md) — Current PLAY-02 ownership/status/contracts, synthetic gates and source-specific evidence updated; earlier dated execution remains historical and no auth/official/device or clock repair acceptance is inferred.
- **reviewed_unchanged:** [docs/validation/boot-05.md](docs/validation/boot-05.md) — BOOT-05 transport protocol1 and its counts-only diagnostic shape remain unchanged. Separate viewer DTO revision1 is documented in the owning contract; no negotiation range/retained manifest handler is widened.
- **reviewed_unchanged:** [docs/adr/0006-protocol-release-contracts.md](docs/adr/0006-protocol-release-contracts.md) — BOOT-05 transport protocol1 and its counts-only diagnostic shape remain unchanged. Separate viewer DTO revision1 is documented in the owning contract; no negotiation range/retained manifest handler is widened.
- **reviewed_unchanged:** [docs/adr/0007-hosting-provider-baseline.md](docs/adr/0007-hosting-provider-baseline.md) — Synthetic privacy code adds no dependency/provider/deployment/asset/budget decision and retains D10 completed private recipients. OVHcloud/Cloudflare/$25, existing D07 and unprovisioned hosting obligations remain.
- **updated:** [docs/adr/0008-engine-placement-dependency-baseline.md](docs/adr/0008-engine-placement-dependency-baseline.md) — Current PLAY-02 ownership/status/contracts, synthetic gates and source-specific evidence updated; earlier dated execution remains historical and no auth/official/device or clock repair acceptance is inferred.
- **reviewed_unchanged:** [docs/plans/2026-10-10-boot-04-decision-worksheet.md](docs/plans/2026-10-10-boot-04-decision-worksheet.md) — Root test includes new actual-wire checks and existing live-match entry includes new DB reads. Existing fourteen pipeline stages, isolation/artifact/clock gates and hosted-versus-local evidence definitions remain unchanged; no fresh CI acceptance inferred.
- **reviewed_unchanged:** [docs/policies/fan-content.md](docs/policies/fan-content.md) — Root test includes new actual-wire checks and existing live-match entry includes new DB reads. Existing fourteen pipeline stages, isolation/artifact/clock gates and hosted-versus-local evidence definitions remain unchanged; no fresh CI acceptance inferred.
- **reviewed_unchanged:** [docs/validation/boot-04.md](docs/validation/boot-04.md) — Synthetic privacy code adds no dependency/provider/deployment/asset/budget decision and retains D10 completed private recipients. OVHcloud/Cloudflare/$25, existing D07 and unprovisioned hosting obligations remain.
- **reviewed_unchanged:** [docs/rules/README.md](docs/rules/README.md) — Upstream361 selected files/59patches and120 representative scenarios remain unchanged; current privacy implementation lives only in the project-owned bridge/server facade/contracts. Official source hashes/effective dates, per-card/template gates and prior executed proof stay source-specific.
- **reviewed_unchanged:** [docs/rules/source-specs-supplement.json](docs/rules/source-specs-supplement.json) — Upstream361 selected files/59patches and120 representative scenarios remain unchanged; current privacy implementation lives only in the project-owned bridge/server facade/contracts. Official source hashes/effective dates, per-card/template gates and prior executed proof stay source-specific.
- **reviewed_unchanged:** [docs/rules/source-specs.json](docs/rules/source-specs.json) — Upstream361 selected files/59patches and120 representative scenarios remain unchanged; current privacy implementation lives only in the project-owned bridge/server facade/contracts. Official source hashes/effective dates, per-card/template gates and prior executed proof stay source-specific.
- **reviewed_unchanged:** [docs/validation/rule-01.md](docs/validation/rule-01.md) — Upstream361 selected files/59patches and120 representative scenarios remain unchanged; current privacy implementation lives only in the project-owned bridge/server facade/contracts. Official source hashes/effective dates, per-card/template gates and prior executed proof stay source-specific.
- **reviewed_unchanged:** [packages/engine-lab/README.md](packages/engine-lab/README.md) — Upstream361 selected files/59patches and120 representative scenarios remain unchanged; current privacy implementation lives only in the project-owned bridge/server facade/contracts. Official source hashes/effective dates, per-card/template gates and prior executed proof stay source-specific.
- **updated:** [docs/runbooks/engine.md](docs/runbooks/engine.md) — Current PLAY-02 ownership/status/contracts, synthetic gates and source-specific evidence updated; earlier dated execution remains historical and no auth/official/device or clock repair acceptance is inferred.
- **reviewed_unchanged:** [docs/validation/rule-02.md](docs/validation/rule-02.md) — Upstream361 selected files/59patches and120 representative scenarios remain unchanged; current privacy implementation lives only in the project-owned bridge/server facade/contracts. Official source hashes/effective dates, per-card/template gates and prior executed proof stay source-specific.
- **reviewed_unchanged:** [docs/adr/0009-pinned-engine-qualification.md](docs/adr/0009-pinned-engine-qualification.md) — Upstream361 selected files/59patches and120 representative scenarios remain unchanged; current privacy implementation lives only in the project-owned bridge/server facade/contracts. Official source hashes/effective dates, per-card/template gates and prior executed proof stay source-specific.
- **updated:** [docs/adr/0010-secure-randomness-replay.md](docs/adr/0010-secure-randomness-replay.md) — Current PLAY-02 ownership/status/contracts, synthetic gates and source-specific evidence updated; earlier dated execution remains historical and no auth/official/device or clock repair acceptance is inferred.
- **reviewed_unchanged:** [docs/validation/rule-03.md](docs/validation/rule-03.md) — Upstream361 selected files/59patches and120 representative scenarios remain unchanged; current privacy implementation lives only in the project-owned bridge/server facade/contracts. Official source hashes/effective dates, per-card/template gates and prior executed proof stay source-specific.
- **reviewed_unchanged:** [docs/templates/card-certification.json](docs/templates/card-certification.json) — Native schema1 change/run fields, timestamp/append-only/file coverage, task/register and single-heavycheck contracts remain applicable; new viewer DTO is a public TypeBox contract, not a native evidence/schema format change.
- **reviewed_unchanged:** [docs/adr/0011-sourced-rule-scenarios.md](docs/adr/0011-sourced-rule-scenarios.md) — Upstream361 selected files/59patches and120 representative scenarios remain unchanged; current privacy implementation lives only in the project-owned bridge/server facade/contracts. Official source hashes/effective dates, per-card/template gates and prior executed proof stay source-specific.
- **reviewed_unchanged:** [docs/runbooks/rules-certification.md](docs/runbooks/rules-certification.md) — Upstream361 selected files/59patches and120 representative scenarios remain unchanged; current privacy implementation lives only in the project-owned bridge/server facade/contracts. Official source hashes/effective dates, per-card/template gates and prior executed proof stay source-specific.
- **reviewed_unchanged:** [docs/validation/rule-04.md](docs/validation/rule-04.md) — Upstream361 selected files/59patches and120 representative scenarios remain unchanged; current privacy implementation lives only in the project-owned bridge/server facade/contracts. Official source hashes/effective dates, per-card/template gates and prior executed proof stay source-specific.
- **reviewed_unchanged:** [docs/adr/0012-upstream-kernel-refresh.md](docs/adr/0012-upstream-kernel-refresh.md) — Upstream361 selected files/59patches and120 representative scenarios remain unchanged; current privacy implementation lives only in the project-owned bridge/server facade/contracts. Official source hashes/effective dates, per-card/template gates and prior executed proof stay source-specific.
- **reviewed_unchanged:** [docs/validation/upstream-engine-review.md](docs/validation/upstream-engine-review.md) — Upstream361 selected files/59patches and120 representative scenarios remain unchanged; current privacy implementation lives only in the project-owned bridge/server facade/contracts. Official source hashes/effective dates, per-card/template gates and prior executed proof stay source-specific.
- **reviewed_unchanged:** [docs/plans/2026-10-13-upstream-engine-review.md](docs/plans/2026-10-13-upstream-engine-review.md) — Upstream361 selected files/59patches and120 representative scenarios remain unchanged; current privacy implementation lives only in the project-owned bridge/server facade/contracts. Official source hashes/effective dates, per-card/template gates and prior executed proof stay source-specific.
- **updated:** [docs/adr/0013-durable-synthetic-match-commands.md](docs/adr/0013-durable-synthetic-match-commands.md) — Current PLAY-02 ownership/status/contracts, synthetic gates and source-specific evidence updated; earlier dated execution remains historical and no auth/official/device or clock repair acceptance is inferred.
- **updated:** [docs/runbooks/match-commands.md](docs/runbooks/match-commands.md) — Current PLAY-02 ownership/status/contracts, synthetic gates and source-specific evidence updated; earlier dated execution remains historical and no auth/official/device or clock repair acceptance is inferred.
- **updated:** [docs/validation/play-01.md](docs/validation/play-01.md) — Current PLAY-02 ownership/status/contracts, synthetic gates and source-specific evidence updated; earlier dated execution remains historical and no auth/official/device or clock repair acceptance is inferred.
- **updated:** [docs/adr/0014-viewer-projection-privacy.md](docs/adr/0014-viewer-projection-privacy.md) — Current PLAY-02 ownership/status/contracts, synthetic gates and source-specific evidence updated; earlier dated execution remains historical and no auth/official/device or clock repair acceptance is inferred.
- **updated:** [docs/contracts/viewer.md](docs/contracts/viewer.md) — Current PLAY-02 ownership/status/contracts, synthetic gates and source-specific evidence updated; earlier dated execution remains historical and no auth/official/device or clock repair acceptance is inferred.
- **updated:** [docs/runbooks/viewer-privacy.md](docs/runbooks/viewer-privacy.md) — Current PLAY-02 ownership/status/contracts, synthetic gates and source-specific evidence updated; earlier dated execution remains historical and no auth/official/device or clock repair acceptance is inferred.
- **updated:** [docs/validation/play-02.md](docs/validation/play-02.md) — Current PLAY-02 ownership/status/contracts, synthetic gates and source-specific evidence updated; earlier dated execution remains historical and no auth/official/device or clock repair acceptance is inferred. Final closure corrects current summary/table, explicitly labels prior-source evidence and records measured RUN062 preservation rather than expected cleanup.
- **updated:** [apps/web/README.md](apps/web/README.md) — New single-worker Chromium public-codec execution is explicit; synthetic schema verification does not implement approved game UI, recipient auth or physical devices.

Full changed-file inventory: [record](docs/changes/CHG-20261014-004.json).

### Limits and next actions

- Prior-source isolated RUN051 failed clock_changed despite all14 child stages/artifact generation exit0; final-source isolated/hosted/retained/promoted artifact acceptance remains pending. No clock repair or guard change inferred.
- Current internal two-player synthetic view/refs are distinct from authenticated publication, full-card/private-choice policy, delayed/privileged delivery, physical devices and production.
- Refs rotate each revision; no stable presentation identity is promised.
- Original all-card/game/reward gates remain closed; D10 completed full private recipients need later AUTH/REPLAY enforcement.
- Director audit/review and publish/integrate local scope with fresh hosted CI evidence.
- PLAY-03: bind authenticated participants, qualified protocol/releases, committed views/receipts, current refs and bounded reconnect/publication; preserve all privacy and later card/delay/privilege gates.

## CHG-20261014-003 — Complete clock-controller root-cause investigation

- Status: finalized
- Actor: Codex architect/developer/QA collaborator
- Recorded (UTC): 2026-10-14T04:22:45.900Z
- Event: unknown; recorded retrospectively (recorded_only)
- Source: e36d223848dbee4f456bb65fcc08f07c3891168a
- Tasks: DOC-01, DOC-02, BOOT-03
- Features: F-DOCS, F-CI
- Requirements: none

### Changes

- **review:** Director requests complete investigation: identify effective chronyd owner/configuration, diagnose learned rate bias, evaluate supported repair and qualify timestamp accuracy with lightweight measurements. Retain existing guard and all earlier evidence.
- **review:** Read-only approved elevated VM inspection identifies mini_init-owned chronyd181, actual startup-generated PHC configuration and biased saved/live frequency; pinned WSL and Chrony sources explain controller interference with explicitly limited binary/history inference.
- **test:** Execute explicitly approved four-phase inherited/neutral/restored rate trial with independent watchdog: five-minute neutral clock tracks raw/Windows; saved tick/frequency restored, same daemon resumed, original workspace/database/Ubuntu service retained. Host observations are retrospective, not native CI success.
- **documentation:** Add exact-byte follow-up capsule, historical import, current diagnosis/maintenance candidate and universal handoff/index/qualification/CI/feature descriptions. Keep original guard, game source, all old evidence and play/device/economic gates unchanged.
- **revision:** Review and improve readability of the current report/index paragraphs; preserve actual captured bytes and all native records. Post-trial static verification and five bootstrap tests pass.
- **test:** Native doctor, authenticated existing PostgreSQL, exact/staged capsule consistency, known-private-value scan, reviewed snapshot synchronization, static workspace verify and all five bootstrap tests pass. Final sealing/staged-file scan and documentation closure receive their own receipts; no permanent repair or full CI pass inferred.

### Verification

- **historical:** Reported root inspection, four-phase approved temporary trial and external references; null qualified times/exits; includes rejection/failed capture and restoration. ([evidence](docs/validation/runs/RUN-20261014-010.json))
- **passed:** Post-trial container doctor7 environment checks. ([evidence](docs/validation/runs/RUN-20261014-011.json))
- **passed:** Authenticated existing bootstrap PostgreSQL connectivity; no recreation. ([evidence](docs/validation/runs/RUN-20261014-012.json))
- **passed:** Static capsule19 digests/decoded/staged bytes, phase and paired-clock arithmetic/restoration/protected source checks. ([evidence](docs/validation/runs/RUN-20261014-013.json))
- **passed:** Static changed public-file and6 decoded payload supported private-value/pattern scan; not full-history/arbitrary secrecy. ([evidence](docs/validation/runs/RUN-20261014-014.json))
- **passed:** Draft documentation synchronization passes classified coverage, callable/source snapshots, links and sealed evidence history. ([evidence](docs/validation/runs/RUN-20261014-015.json))
- **passed:** Workspace static verify passes configuration/CI policy, offline rules/vendor/entropy checks, documentation and JSON/JS syntax; no full build/browser suite. ([evidence](docs/validation/runs/RUN-20261014-016.json))
- **passed:** Bootstrap1 live HTTP and4 credential generation/preservation tests pass; no new game/device acceptance. ([evidence](docs/validation/runs/RUN-20261014-017.json))
- **passed:** Reviewed current prose, impact map, full file/callable snapshot, links, changelog and sealed history pass draft synchronization; app fingerprint unchanged. ([evidence](docs/validation/runs/RUN-20261014-018.json))
- **passed:** Finalized current report/handoff/features and generated snapshot pass synchronization, semantic review dispositions, source/callable/link/changelog/evidence gates; valid paired timing. ([evidence](docs/validation/runs/RUN-20261014-019.json))
- **passed:** Final known-private-value and token/URI-pattern scan of changed public files and decoded captures after sealing; no arbitrary-secret/full-history claim. ([evidence](docs/validation/runs/RUN-20261014-020.json))

### Documentation and files

- **updated:** [AGENTS.md](AGENTS.md) — Record newly approved trial scope and proved root-rate mechanism, with restored resources and no lasting repair or additional play gates.
- **updated:** [README.md](README.md) — Provide current diagnosis and maintenance link without changing executable foundation or acceptance.
- **updated:** [docs/README.md](docs/README.md) — Index the completed rate-isolation result and distinguish it from permanent repair/CI qualification.
- **updated:** [docs/WORKSPACE_QUALIFICATION.md](docs/WORKSPACE_QUALIFICATION.md) — Record actual root/host observations, valid native toolchain/database checks and remaining absolute/long-term/device gates.
- **updated:** [docs/runbooks/ci.md](docs/runbooks/ci.md) — Explain real clock discrepancy and keep guard/old failed receipts; link supported maintenance candidate instead of treating neutral trial as a pipeline pass.
- **updated:** [docs/HANDOFF.md](docs/HANDOFF.md) — Update exact authorization, branch/source, diagnostics/native categories, resources, limitations and next steps.
- **updated:** [docs/validation/clock-investigation.md](docs/validation/clock-investigation.md) — Update unresolved owner/rate checkpoint with proved current causality, raw results/restoration, source-based inference limits and a concrete unapplied repair plan.
- **updated:** [docs/documentation-map.json](docs/documentation-map.json) — Extend current investigation impact edge to its new archive capsule; existing archive/evidence wildcard classification retained.
- **updated:** [docs/features.json](docs/features.json) — F-CI records new rate causality without promoting artifact/repair acceptance; F-DOCS links actual current-source native18 review/synchronization proof.
- **reviewed_unchanged:** [docs/CHANGELOG_FORMAT.md](docs/CHANGELOG_FORMAT.md) — Existing null-time historical import and native paired-timing schema apply unchanged; no threshold/result policy change.
- **reviewed_unchanged:** [docs/DEVELOPMENT_WORKFLOW.md](docs/DEVELOPMENT_WORKFLOW.md) — Existing scoped evidence, source-matched checks and single heavy workload rules remain; current diagnostic scope does not start new product work.
- **reviewed_unchanged:** [docs/adr/0001-local-development-environment.md](docs/adr/0001-local-development-environment.md) — WSL source/Dev Container/host orchestration and protected PostgreSQL ownership are unchanged; temporary approved diagnosis is not an architecture decision.
- **reviewed_unchanged:** [docs/validation/play-01.md](docs/validation/play-01.md) — Merged source/hosted result and current clock-report link remain correct; diagnosis does not change durability or privacy acceptance.
- **historical_preserved:** [docs/validation/archive/clock-20261014/manifest.json](docs/validation/archive/clock-20261014/manifest.json) — Earlier24-payload capsule and all sealed RUN/CHG bytes retained; no corrected timestamps or retroactive pass.
- **updated:** [docs/validation/archive/clock-20261014-followup/manifest.json](docs/validation/archive/clock-20261014-followup/manifest.json) — New classified archive records19 original/derived/script payloads with decoded-byte digests, explicit authority/rejection/failed-capture provenance, runtime-history/fault-test and UTC limitations; no binary distribution.

Full changed-file inventory: [record](docs/changes/CHG-20261014-003.json).

### Limits and next actions

- Investigation establishes present inherited-rate cause; no lasting clock repair or absolute UTC certification.
- Chrony source supports a controller feedback hypothesis; exact packaged scheduler/binary source equivalence and initial learning history are not reconstructed.
- Approved trial restores original daemon/saved rate; normal live drift/history updates continue and forced watchdog fallback was not separately tested.
- No heavy CI/build/browser/production suite or product source changes; all old failed receipts remain failed.
- No further pause/persistent settings/restart/publishing authorization; maintenance candidate is documented, not applied.
- Review local diagnosis/evidence commit; publishing/main integration not authorized by this scope.
- Obtain focused Director authorization for separately scoped supported clock maintenance; preserve original guard/history/data.
- PLAY-02 remains unassigned; no game/privacy/economic gate acceptance from this investigation.

## CHG-20261014-002 — Preserve clock evidence bytes through Git line-ending normalization

- Status: finalized
- Actor: Codex architect/developer/QA collaborator
- Recorded (UTC): 2026-10-14T01:29:26.758Z
- Event: unknown; recorded retrospectively (recorded_only)
- Source: 6e9acf1ec2130386e6687f48513a30aaf32b397d
- Tasks: DOC-01, DOC-02
- Features: F-DOCS
- Requirements: none

### Changes

- **revision:** Correct CHG-20261014-001 archive portability before commit: Git would normalize CRLF in two Windows outputs and invalidate captured-byte hashes. Preserve exact originals as base64 with decoded byte/digest checks; keep original manifest/checker checkpoint and all native run bytes. Application code, .gitattributes, clock guard and executable fingerprint unchanged.
- **test:** Fresh static capsule check compares24 payload digests and staged Git bytes, validates decoded original Windows hashes and retains all comparison/restoration assertions; native documentation closure remains separate.

### Verification

- **passed:** Static container final24-payload capsule: all digests, exact decoded original Windows bytes, staged Git equality, comparison arithmetic, mode-selected clock adjustments/cleanup and unchanged executable/configuration/requirement bytes. ([evidence](docs/validation/runs/RUN-20261014-008.json))
- **passed:** Final static docs:check after capsule portability correction, covering generated views, classified current docs, links and unchanged sealed history with timing-valid receipt. ([evidence](docs/validation/runs/RUN-20261014-009.json))

### Documentation and files

- **updated:** [docs/validation/clock-investigation.md](docs/validation/clock-investigation.md) — Explain exact-byte encoding, retained checkpoint and final24-payload capsule instead of implying CRLF raw text survives Git unchanged.
- **updated:** [docs/HANDOFF.md](docs/HANDOFF.md) — Identify the corrective archive record and staged-byte proof, with no change to diagnosed mechanism or repair/privacy gates.
- **updated:** [docs/validation/archive/clock-20261014/manifest.json](docs/validation/archive/clock-20261014/manifest.json) — Record encoded and decoded digests and retain prior manifest/checker; no timestamp rewriting or evidence result promotion.
- **updated:** [docs/validation/archive/clock-20261014/verify.py.txt](docs/validation/archive/clock-20261014/verify.py.txt) — Add decoded-byte checks and explicit staged-index equality for each archived payload.

Full changed-file inventory: [record](docs/changes/CHG-20261014-002.json).

### Limits and next actions

- This is archive portability, not clock repair or additional application/CI/device acceptance.
- RUN003 checked the original22-payload capsule before this correction; the staged-byte check supplies current capsule qualification.
- Retain encoded original Windows bytes and all earlier receipts; obtain Director authorization before further clock-manager changes.

## CHG-20261014-001 — Diagnose local WSL clock rejection and record PLAY-01 hosted integration

- Status: finalized
- Actor: Codex architect/developer/QA collaborator
- Recorded (UTC): 2026-10-14T01:21:32.457Z
- Event: unknown; recorded retrospectively (recorded_only)
- Source: 6e9acf1ec2130386e6687f48513a30aaf32b397d
- Tasks: DOC-01, DOC-02, BOOT-03, PLAY-01
- Features: F-DOCS, F-CI
- Requirements: none

### Changes

- **review:** Investigate wall/monotonic discrepancy across Windows, WSL and the existing Dev Container; attribute periodic resets to Docker initd and trace actual clock-rate controllers.
- **test:** Director-approved five-minute temporary pause/restoration of Ubuntu time sync; read-only cross-reference comparisons and bounded administrator traces. Raw observations are imported historical diagnostics, never reconstructed passing native receipts.
- **documentation:** Preserve evidence, cleanup, exact limits and current operating handoff. Guard, game code, clock configuration and old failed receipts remain unchanged.
- **documentation:** Record freshly observed successful audit/main GitHub workflow metadata at merged6e9acf1, update current handoff/CI descriptions and preserve all local failed clock receipts. No hosted artifact or test-count revalidation is inferred.
- **test:** Native container metadata002, capsule consistency003, draft synchronization004, public-source privacy005 and documentation gate006 passed with matching executable fingerprint and valid timing; final closure is separately captured in007. These short checks do not infer full CI timing or a stable repair. Normal documentation synchronization regenerates the unchanged schema1 views at each documented checkpoint.

### Verification

- **historical:** Imported ad hoc host diagnostics and approved temporary service trial; raw discontinuous samples retained, no reconstructed native pass or qualified historical duration. ([evidence](docs/validation/runs/RUN-20261014-001.json))
- **passed:** Fresh public GitHub workflow/job metadata: audit38482253396/main38483130685 successful at6e9acf1; no hosted artifact, internal-stage recount or product/device acceptance. ([evidence](docs/validation/runs/RUN-20261014-002.json))
- **passed:** Static container capsule validation:22 payload digests, paired clock arithmetic, successful mode-selected trace calls/cleanup and protected source/configuration/requirement bytes. ([evidence](docs/validation/runs/RUN-20261014-003.json))
- **passed:** Native draft synchronization and embedded documentation validation; executable fingerprint unchanged. Map ordering later restored for a smaller review diff. ([evidence](docs/validation/runs/RUN-20261014-004.json))
- **passed:** Static container current-public-source secret-pattern and all known local credential-value scan; unchanged executable fingerprint. No full-history rescan or absolute secrecy proof. ([evidence](docs/validation/runs/RUN-20261014-005.json))
- **passed:** Native static docs:check over classified current docs, file/callable snapshot, links, change history and sealed evidence; no app or clock-repair acceptance. ([evidence](docs/validation/runs/RUN-20261014-006.json))

### Documentation and files

- **updated:** [AGENTS.md](AGENTS.md) — Add current clock authority/diagnosis and freshly observed merged PLAY-01 CI; permanent repair remains unauthorized.
- **updated:** [README.md](README.md) — Direct intake to measured clock diagnosis and successful merged hosted metadata; earlier dated checkpoints preserved.
- **updated:** [docs/README.md](docs/README.md) — Index current investigation and supersede publication-pending checkpoint with observed success.
- **updated:** [docs/HANDOFF.md](docs/HANDOFF.md) — Replace historical active-branch assumptions with main6e9acf1 intake, documentation branch, explicit approved trial/restoration, measured facts, proof categories and remaining maintenance/privacy gates.
- **updated:** [docs/WORKSPACE_QUALIFICATION.md](docs/WORKSPACE_QUALIFICATION.md) — Append separately categorized diagnostics and hosted metadata without accepting Windows product, timing repair, database or load gates.
- **updated:** [docs/CHANGELOG_FORMAT.md](docs/CHANGELOG_FORMAT.md) — Clarify historical diagnostic imports and link current diagnosis while retaining schema1, 1000ms threshold and original failed receipts.
- **updated:** [docs/FEATURES.md](docs/FEATURES.md) — Update F-CI current description from hosted-pending to successful observed workflow metadata, retaining artifact and local timing limits.
- **updated:** [docs/features.json](docs/features.json) — Match F-CI description/evidence/doc link to fresh metadata; verification remains historical_verified because hosted artifact contents were not reverified.
- **updated:** [docs/runbooks/ci.md](docs/runbooks/ci.md) — Add current diagnosis, guard/authorization limits and successful main/audit metadata; existing executed pipeline histories preserved.
- **updated:** [docs/validation/boot-03.md](docs/validation/boot-03.md) — Append current hosted successes and diagnosed recent rejection, preserving all earlier source-specific failures/results.
- **updated:** [docs/validation/play-01.md](docs/validation/play-01.md) — Append current merged workflow observation and diagnostic limits; audited acceptance/debug closure and follow-ups unchanged.
- **updated:** [docs/validation/clock-investigation.md](docs/validation/clock-investigation.md) — Own the detailed clock guard purpose, measurement method, Docker routine attribution, chronyd adjustment proof, approved pause/cleanup, limits and qualified next actions.
- **updated:** [docs/documentation-map.json](docs/documentation-map.json) — Classify the owning current diagnosis with guard/configuration/capsule impact edges; existing archive wildcard covers retained raw observations.
- **updated:** [CHANGELOG.md](CHANGELOG.md) — Generated uniform change view; update only through native synchronization.
- **updated:** [docs/current-state.json](docs/current-state.json) — Generated file/callable/status snapshot; executable fingerprint remains unchanged.
- **updated:** [docs/validation/archive/clock-20261014/manifest.json](docs/validation/archive/clock-20261014/manifest.json) — Classify imported host diagnostics and archived scripts; byte identity, provenance, sanitized-vs-raw distinction, failed trace setup and corrected Go mapping are explicit.

Full changed-file inventory: [record](docs/changes/CHG-20261014-001.json).

### Limits and next actions

- No permanent clock repair or altered acceptance threshold is authorized.
- Ad hoc host diagnostics are not native passing test receipts or absolute UTC certification.
- The chronyd adjustment mechanism is captured, but its learned estimate/effective system process configuration and a durable single-controller repair remain unqualified.
- No full application/browser/database or heavy isolated CI rerun for this documentation-only change; original source-matched evidence is preserved.
- Initial normal-user/Windows debug-shell traces were refused; a narrow rate-trace setup failed and cleaned up before a successful corrected retry.
- Original October6 reversed evidence is not retrospectively attributed to the current traces.
- Use recorded causal evidence before proposing further clock-manager experiments or evidence-policy changes; PLAY-02 remains unassigned.

## CHG-20261013-006 — Independent audit of PLAY-01 durable synthetic match commands and Director-authorized integration into main

- Status: finalized
- Actor: Claude Code agent (architect/QA reviewer role) on Director request, local WSL session
- Recorded (UTC): 2026-10-13T22:51:00.000Z
- Event: unknown; recorded retrospectively (recorded_only)
- Source: 34b609b24bb822f7f2a1b73caf1e7ed5f08e1e4e
- Tasks: PLAY-01, DOC-01, DOC-02
- Features: F-DOCS, F-MATCH-COMMANDS
- Requirements: none

### Changes

- **review:** Audited Codex commit 34b609b (PLAY-01, CHG-20261013-004/005) against ADR0013, blueprint §7.1, the backlog acceptance and the earlier audit findings. Reviewed the shared 13-move policy and its server/Lab guards (forbidden check after ended/revision checks, before mutation, never journaled), the replay refactor and private persistence module (closed records, separate digest domain, canonical bytes, match-bound RNG context, full re-execution comparison, seed zeroing), the bounded worker executor (limits, environment filtering, output draining, termination ownership, queue expiry, close), the service order (receipt, participant, pins, stale, forbidden, outside-transaction candidate, CAS), the repository (FOR UPDATE row lock, receipt re-check under the lock, version/checkpoint-digest fence, atomic receipt/journal/outbox, rollback), additive migrations 0002/0003, the evidence-recorder flush/fsync change (clock guard unchanged), the single-fingerprint documentation load, the pinned Bun cache and test-file scheduling (all tests retained). Requirement/backlog edits add evidence links only; 548 dispositions unchanged. Verdict: PLAY-01 acceptance met; the manual/debug-move finding from the RULE-04 and refresh audits is closed for server and Lab.
- **test:** Independent runs RUN-20261013-118..126 all passed at Codex's final fingerprint 2c343976 with exact timing and 0 redactions: full verify:foundation (286 project checks = 262 Node + 24 Python, 406 upstream passes/1 inherited skip, 2 injection tests); auditor policy probe (25-move registry, 13 allowlisted, 176 refusals across server, Lab qualification, Lab advanced-sandbox and the private wrapper for both players, identity binds policy bytes, 12 re-digested checkpoint forgeries refused, 6 replays verified/6 tampers refused); Codex's real PostgreSQL suite (3 storage + 10 service cases incl. both SIGKILL boundaries); auditor live service probe (six-way terminal race commits once with one terminal event, six-way duplicate storm, 28 forbidden receipts, 8 no-write refusals, storage-writer forgeries fail closed, lost-ack/isolation/clock-floor/create checks, privacy scan of 74 rows); migration history and role privileges on local and test; five DB regressions and eight identities; boundary/bundle probe (280 browser and 80 server-to-kernel imports refused, no server-only markers in bundles, kernel unchanged); pinned Chromium install into the recreated workspace container; Chromium 6 web scenarios and 2 Lab workers. RUN-20261013-127 docs:check covers this record.
- **review:** Follow-ups recorded, none blocking integration: (1) Lab advanced-sandbox now refuses the raw manual moves; Sandbox manipulation requirements R04.009-R04.017 remain in the Director's scope and need dedicated reward-isolated operations (ADR0013 anticipates this). (2) Restore re-executes the full private transcript within a 5 s/64 MiB worker for every command; realistic-length real-card matches are unmeasured and must be timed before PLAY-03/OPS-01. (3) Private checkpoints in match.matches contain live seeds, readable only by the match role; database backups/exports are secret material (OPS-01, D10). (4) Stale/rejected receipts are final per command ID; the PLAY-03 client protocol must issue new IDs. (5) Correction: the refresh audit's RUN055 '895,847 bytes' counted UTF-16 characters; the kernel file is 895,853 bytes and unchanged by PLAY-01.
- **documentation:** Appended a dated independent-audit section to docs/validation/play-01.md and dated audit notes to ADR0013, the PLAY-01 plan, the match-commands runbook and (correction) the upstream refresh review; added the audit sentence to AGENTS.md, README.md and docs/README.md; updated HANDOFF, the F-MATCH-COMMANDS feature entry/evidence, FEATURES.md and the PLAY-01 backlog evidence link. Codex text, records and run logs are unchanged.
- **review:** Local isolated CI was not rerun: the Windows host had a low-memory crash during PLAY-01 and two later CI attempts were cancelled for memory pressure (interruption record), and the unchanged clock guard rejected Codex's otherwise complete RUN113. Under the Director's leave-environment decision no clock, threshold or memory setting was changed. Hosted Foundation qualification, which runs the same ci-local.py pipeline including the new live-match stage, is dispatched on the published audit branch before main is fast-forwarded and observed again on main; both are recorded in a later change.

### Verification

- **passed:** Timing-valid pnpm verify:foundation: 286 project checks (262 Node + 24 Python), 406 upstream passes/1 inherited skip/1,362 expectations, 2 injection tests. Local Dev Container. ([evidence](docs/validation/runs/RUN-20261013-118.json))
- **passed:** Auditor policy probe: allowlist vs upstream registry, 176 refusals across four facades for both players, identity binds policy bytes, 12 forged private checkpoints refused, RULE-03 completed replay intact. ([evidence](docs/validation/runs/RUN-20261013-119.json))
- **passed:** Codex real restricted-PostgreSQL suite: 3 storage + 10 service cases including SIGKILL before COMMIT and after COMMIT/before response. ([evidence](docs/validation/runs/RUN-20261013-120.json))
- **passed:** Auditor live service probe: six-way terminal race commits once, duplicate storm, durable forbidden receipts, no-write refusals, storage-writer forgeries fail closed, lost-ack/isolation/clock/create checks, privacy scan of 74 rows. ([evidence](docs/validation/runs/RUN-20261013-121.json))
- **passed:** Auditor database probe: local/test migration histories, 0001 unchanged since main, match-table ownership and role privileges, 0003 constraints and terminal-event index. ([evidence](docs/validation/runs/RUN-20261013-122.json))
- **passed:** db:test five live regressions and all eight restricted identities on local and test. ([evidence](docs/validation/runs/RUN-20261013-123.json))
- **passed:** Auditor boundary and bundle probe: 280 browser and 80 server-to-kernel imports refused, no server-only markers in web/Lab bundles, Lab carries the guard, kernel unchanged. ([evidence](docs/validation/runs/RUN-20261013-124.json))
- **passed:** Project-pinned Linux Chromium install into the recreated Dev Container. ([evidence](docs/validation/runs/RUN-20261013-125.json))
- **passed:** Actual headless Linux Chromium: 6 web foundation scenarios and 2 compiled Lab Web Workers including forbidden-move negatives. ([evidence](docs/validation/runs/RUN-20261013-126.json))
- **passed:** docs:check over the completed audit documentation and evidence (static). ([evidence](docs/validation/runs/RUN-20261013-127.json))

### Documentation and files

- **updated:** [docs/validation/play-01.md](docs/validation/play-01.md) — Appended a dated independent-audit section: run outcomes, code-review scope, acceptance verdict, follow-ups and the isolated-CI decision; Codex text unchanged.
- **updated:** [docs/adr/0013-durable-synthetic-match-commands.md](docs/adr/0013-durable-synthetic-match-commands.md) — Dated audit note: decision unchanged and consistent with the source; Sandbox, restore-cost and seed-at-rest follow-ups.
- **updated:** [docs/plans/2026-10-13-play-01-durable-commands.md](docs/plans/2026-10-13-play-01-durable-commands.md) — Execution-ledger note recording the independent audit and hosted-CI-before-merge sequence.
- **updated:** [docs/runbooks/match-commands.md](docs/runbooks/match-commands.md) — Operating cautions: per-command-ID finality, seeds in backups, restore cost.
- **updated:** [docs/validation/upstream-engine-review.md](docs/validation/upstream-engine-review.md) — Appended correction: RUN055's kernel figure counted characters (895,847); the file is 895,853 bytes. Original audit text and RUN055 preserved.
- **updated:** [docs/HANDOFF.md](docs/HANDOFF.md) — Header actors, independent-audit verification, follow-ups and the authorized publication/integration sequence; Codex content otherwise unchanged.
- **updated:** [AGENTS.md](AGENTS.md) — PLAY-01 paragraph notes the independent audit, hosted-CI-before-merge sequence and that Sandbox manipulation stays in scope.
- **updated:** [README.md](README.md) — Same PLAY-01 audit sentence as AGENTS.md.
- **updated:** [docs/README.md](docs/README.md) — Same PLAY-01 audit sentence as AGENTS.md.
- **updated:** [docs/features.json](docs/features.json) — F-MATCH-COMMANDS description notes the audit; evidence adds RUN-20261013-118..122/124/126.
- **updated:** [docs/FEATURES.md](docs/FEATURES.md) — F-MATCH-COMMANDS acceptance-limit cell references the independent audit runs.
- **updated:** [docs/vision/initial_backlog.csv](docs/vision/initial_backlog.csv) — PLAY-01 evidence link to this audit record only; status and every other row unchanged.
- **reviewed_unchanged:** [docs/vision/requirements.csv](docs/vision/requirements.csv) — PLAY-01 link-only edits reviewed; 548 dispositions unchanged; R04.009-R04.017 Sandbox manipulation remains in scope and is noted as a follow-up rather than edited.
- **reviewed_unchanged:** [docs/contracts/protocol.md](docs/contracts/protocol.md) — Public seven-outcome schemas unchanged; internal receipts cover three durable outcomes as stated.
- **reviewed_unchanged:** [docs/runbooks/database.md](docs/runbooks/database.md) — Migration operation consistent with RUN122 (local/test histories equal 0001-0003).
- **reviewed_unchanged:** [docs/runbooks/ci.md](docs/runbooks/ci.md) — Live-match stage and pending timing qualification described accurately; hosted runs will be recorded in a later change.
- **reviewed_unchanged:** [docs/DEVELOPMENT_WORKFLOW.md](docs/DEVELOPMENT_WORKFLOW.md) — Sequential heavy-workload rule followed; no change needed.
- **reviewed_unchanged:** [apps/match-service/README.md](apps/match-service/README.md) — Matches the audited service interface and limits.
- **historical_preserved:** [docs/validation/play-01-interruption.json](docs/validation/play-01-interruption.json) — Codex's incident record is the basis for not rerunning local isolated CI; unchanged.
- **historical_preserved:** [docs/changes/CHG-20261013-004.json](docs/changes/CHG-20261013-004.json) — Finalized Codex record; audited, not modified.

Full changed-file inventory: [record](docs/changes/CHG-20261013-006.json).

### Limits and next actions

- Audit evidence is local Linux Dev Container and headless Chromium only; no Windows, touch, GPU, load or production observation.
- Local isolated CI was not rerun (host memory incident and clock guard); hosted CI results are observed after publication and recorded in a later change.
- Probes characterize the internal two-player synthetic service; viewer/log privacy, authenticated transport, publication, clocks, multiplayer and card admission remain gated.
- Push both branches, run hosted Foundation qualification on claude/play-01-audit, fast-forward main only after it passes, observe the main run and record both run IDs in the next change.
- PLAY-02 next; carry the Sandbox, restore-cost, seed-at-rest and command-ID follow-ups into PLAY-03/OPS-01/Sandbox planning.

## CHG-20261013-005 — Clarify final PLAY-01 handoff next actions

- Status: finalized
- Actor: Codex documentation reviewer
- Recorded (UTC): 2026-10-13T22:39:05Z
- Event: unknown; recorded retrospectively (recorded_only)
- Source: 9b9c8ac09bf1024f629e47eb3fb2a1adf729d9b8
- Tasks: DOC-01, DOC-02
- Features: F-DOCS
- Requirements: none

### Changes

- **revision:** Remove an accidental duplicated phrase from the handoff next-action paragraph. Preserve core CHG004 and every execution record; implementation, acceptance, pending CI timing and Director decisions unchanged.

### Verification

- **passed:** Final native documentation/evidence validation, unchanged executable fingerprint and corrected handoff. ([evidence](docs/validation/runs/RUN-20261013-117.json))

### Documentation and files

- **updated:** [docs/HANDOFF.md](docs/HANDOFF.md) — Clarifies Director audit/publication/hosted-CI next steps while retaining all pending privacy/admission/device/clock gates.

Full changed-file inventory: [record](docs/changes/CHG-20261013-005.json).

### Limits and next actions

- Documentation wording only; no new executable or game/device/CI acceptance.
- Director audit/publication with hosted CI; preserve core CHG004 limits and follow PLAY-02 prerequisites.

## CHG-20261013-004 — PLAY-01 durable synthetic match commands and player authority

- Status: finalized
- Actor: Codex architect/developer/QA collaborator
- Recorded (UTC): 2026-10-13T22:34:43Z
- Event: unknown; recorded retrospectively (recorded_only)
- Source: 9b9c8ac09bf1024f629e47eb3fb2a1adf729d9b8
- Tasks: PLAY-01, DOC-01, DOC-02
- Features: F-MATCH-COMMANDS, F-ENGINE, F-DB, F-CONTRACTS, F-CI, F-DOCS, F-EVIDENCE
- Requirements: R02.032, R02.033, R02.034, R15.009, R29.001, R29.005, R30.015

### Changes

- **implementation:** Internal two-player synthetic durable command service is locally verified: actor-scoped stable receipts, private deterministic recovery, row-fenced CAS and atomic checkpoint/accepted journal/metadata outbox after COMMIT. Server and Lab refuse all manual/debug moves. Full/clean/canonical/browser/database/setup evidence passes; isolated113 completes14 child stages but timing receipt failsclock_changed. Authenticated transport, privacy/publication/clocks/multiplayer and all ordinary/official/private/reward/card admission stay gated.
- **function:** Private match checkpoint/restore, restricted repository and bounded worker/service create/submit/close; compiled player policy joins executable identity.
- **test:** Actual debug win red/guard green, private replay edits, independent CAS races, stable scoped receipts, SQL rollback and SIGKILL before/afterCOMMIT; worker timing/cancellation and original DB migration history regressions.
- **fix:** Append0003 after real0002 execution for NULL-safe receipt constraints. Shared worker finishing, source export conditions, full migration probes, symmetric checkpoint bounds and accessor-safe creation.
- **edit:** Preserve/exclude provider browser cache and unowned external reference image; retain all real source/assets and native evidence failures.
- **documentation:** Current owning ADR/plan/runbook/validation/map/features/handoff/backlog and requirement prerequisite evidence synchronized; original product acceptance and Director choices unchanged.
- **review:** Fresh bounded read-only review confirms CAS/commit/rollback/receipt/private-worker logic; findings fixed with discriminating evidence.
- **fix:** After the host memory crash, serialize heavy verification and Node test files while retaining all scenarios and deliberate races. Reuse only hash-verified pinned Bun cache with bounded resumable download. Evidence files and directories are flushed before success. Documentation validation reuses one fingerprint with a final drift check; repeated-read red/green proof retained.
- **revision:** Preserve incomplete RUN086/087 as unknown and zero-byte RUN088 under raw archive names with separate historical correction090. Full Director reconnect log shows successful startup followed by stale documentation guard; removed archive path coverage corrected and actual post-create095 passes. Original private data and environment settings unchanged.
- **fix:** Supplemental review found corrupt resumable Bun cache lockout. Exact shell branch now discards checksum/HTTP22 failures and permits at most two fetches, preserves interrupted transfer bytes and mandates final pin hash. RUN098 red and099 green include five mocked branches. Old DB policy oracle now verifies all0001/0002/0003 SQL bytes and hashes; RUN096 failure preserved.
- **fix:** Supplemental cache review extends non-resumable recovery to curl22/33/36; strict retry mock requires absent partial. RUN100 red and101 seven-branch green preserve timeout resume and repeated-corruption refusal.
- **test:** Final102/103/104/106/107/112/114/115/116 pass source-matched local acceptance, actual race/rollback/SIGKILL cases, original roles/data, browser, source/canonical clean and full-history/private/log/scope preservation.113 child completes14 stages/artifact validation but clock guard rejects its receipt; no CI result published. All failed/interrupted attempts retained.

### Verification

- **passed:** PLAY-01 intake merged9b9c8ac existing-container doctor/static/bootstrap/original PostgreSQL baseline ([evidence](docs/validation/runs/RUN-20261013-060.json))
- **passed:** Fresh prior upstream-audit and main hosted CI metadata, before PLAY-01 source changes ([evidence](docs/validation/runs/RUN-20261013-061.json))
- **failed:** PLAY-01 RED: actual server and both Lab facades must refuse all debug/server-only/unknown move names ([evidence](docs/validation/runs/RUN-20261013-062.json))
- **failed:** PLAY-01 discriminating RED: manualSetLore actually wins in main phase in server and both Lab modes ([evidence](docs/validation/runs/RUN-20261013-063.json))
- **failed:** PLAY-01 RED: executable replay identity must bind shared policy bytes ([evidence](docs/validation/runs/RUN-20261013-064.json))
- **passed:** PLAY-01 GREEN: frozen workspace links, compiled guards/policy identity and existing secure adapter/Lab regressions ([evidence](docs/validation/runs/RUN-20261013-065.json))
- **failed:** PLAY-01 RED: new private live checkpoint/restore must reproduce current source and reject tampering and foreign match binding ([evidence](docs/validation/runs/RUN-20261013-066.json))
- **passed:** PLAY-01 GREEN: built server-only live checkpoint/restore, tamper/foreign-match rejection and preserved RNG/replay/player-policy regressions ([evidence](docs/validation/runs/RUN-20261013-067.json))
- **failed:** PLAY-01 RED: restricted test schema, typed repository, command validation and actual bounded engine executor missing ([evidence](docs/validation/runs/RUN-20261013-068.json))
- **failed:** PLAY-01 first actual store/executor build, additive test migration and green schema/worker validation checks ([evidence](docs/validation/runs/RUN-20261013-069.json))
- **failed:** PLAY-01 discriminating RED: in-flight worker close ownership and real PostgreSQL NULL-reason constraint ([evidence](docs/validation/runs/RUN-20261013-070.json))
- **passed:** PLAY-01 GREEN: shared worker termination ownership and appended receipt invariant correction on the restricted test database ([evidence](docs/validation/runs/RUN-20261013-071.json))
- **failed:** PLAY-01 real PostgreSQL independent CAS/retry/rollback/role/process-death integration characterization ([evidence](docs/validation/runs/RUN-20261013-072.json))
- **failed:** PLAY-01 corrected actual process harness: explicit child runtime flags, full CAS/rollback/role/before-after-COMMIT kill and retry evidence ([evidence](docs/validation/runs/RUN-20261013-073.json))
- **failed:** PLAY-01 RED: prior live DB proof must validate the complete appended migration history, not a fixed one-row denominator ([evidence](docs/validation/runs/RUN-20261013-074.json))
- **failed:** PLAY-01 RED: private worker identity must match the gateway under supported source conditions ([evidence](docs/validation/runs/RUN-20261013-075.json))
- **failed:** PLAY-01 DOC RED: generated provider screenshots must not enter source, evidence or clean-copy identity ([evidence](docs/validation/runs/RUN-20261013-076.json))
- **passed:** PLAY-01 corrected dependency ownership, worker identity conditions, full migration denominator and real CAS/process-boundary integration ([evidence](docs/validation/runs/RUN-20261013-077.json))
- **passed:** PLAY-01 complete restricted storage and ten actual integration cases including pin/corruption/worker failures, independent races and process deaths ([evidence](docs/validation/runs/RUN-20261013-078.json))
- **failed:** Reviewer checkpoint emission versus restore-bound regression: discriminating red ([evidence](docs/validation/runs/RUN-20261013-079.json))
- **passed:** Checkpoint emission and restore share cumulative bounds; existing private replay and input lifecycle regressions ([evidence](docs/validation/runs/RUN-20261013-080.json))
- **passed:** Fresh private checkpoint, actual worker queue expiry/cancellation, generated artifact exclusion and real durable match regressions ([evidence](docs/validation/runs/RUN-20261013-081.json))
- **passed:** Reviewed creation input rejects nested accessors without invoking them; local additive migration and both restricted identity sets ([evidence](docs/validation/runs/RUN-20261013-082.json))
- **failed:** PLAY-01 complete frozen foundation: doctor documentation types lint build project/upstream/injection tests and original PostgreSQL checks ([evidence](docs/validation/runs/RUN-20261013-083.json))
- **failed:** Final PLAY-01 frozen doctor complete foundation and original bootstrap database ([evidence](docs/validation/runs/RUN-20261013-084.json))
- **failed:** Actual isolated BOOT-03 pipeline: frozen foundation, live PostgreSQL, Linux browser, dependency/secret scans and artifacts ([evidence](docs/validation/runs/RUN-20261013-085.json))
- **passed:** Post-crash restored original Compose project: pinned doctor bootstrap tests restricted local/test identities and existing database ([evidence](docs/validation/runs/RUN-20261013-089.json))
- **historical:** Correction/quarantine of crash-truncated RUN088; no qualified pass claimed ([evidence](docs/validation/runs/RUN-20261013-090.json))
- **failed:** Serial post-crash full frozen foundation; explicit single-file test scheduling and durable evidence writes; no overlapping CI ([evidence](docs/validation/runs/RUN-20261013-091.json))
- **failed:** Discriminating documentation scalability regression: sixteen actual ephemeral receipts must not trigger repeated whole-source hashes ([evidence](docs/validation/runs/RUN-20261013-092.json))
- **passed:** Documentation hash scaling corrected with start/end source guard; complete negative governance and evidence-capture regressions ([evidence](docs/validation/runs/RUN-20261013-093.json))
- **failed:** Serial full frozen foundation after crash quarantine and documentation hashing optimization; all tests retained ([evidence](docs/validation/runs/RUN-20261013-094.json))
- **passed:** Fresh restored Dev Container post-create validation after synchronized documentation coverage ([evidence](docs/validation/runs/RUN-20261013-095.json))
- **failed:** Sequential full foundation validation after resource and documentation recovery corrections ([evidence](docs/validation/runs/RUN-20261013-096.json))
- **failed:** Exact Dockerfile download branch with mocked valid/corrupt/range-failed/interrupted network caches ([evidence](docs/validation/runs/RUN-20261013-097.json))
- **failed:** Cache regression red on exact pre-review Dockerfile: corrupt completed prefix prevents recovery ([evidence](docs/validation/runs/RUN-20261013-098.json))
- **passed:** Corrected migration history and five simulated pinned Bun cache branches, plus governance regressions ([evidence](docs/validation/runs/RUN-20261013-099.json))
- **failed:** Cache resume regression red: curl33/36 must discard partial bytes and retry from an absent target ([evidence](docs/validation/runs/RUN-20261013-100.json))
- **passed:** Seven exact Dockerfile cache branches: corruption and curl22/33/36 retry fresh; timeout preserves partial; repeated corruption fails closed ([evidence](docs/validation/runs/RUN-20261013-101.json))
- **passed:** Full final-source foundation: ordered build/typecheck/lint, all project and unchanged selected upstream tests ([evidence](docs/validation/runs/RUN-20261013-102.json))
- **passed:** Final-source actual restricted PostgreSQL match constraints, independent races, rollback and SIGKILL acknowledgement recovery ([evidence](docs/validation/runs/RUN-20261013-103.json))
- **passed:** Final-source five live database regressions, all eight restricted identities and original bootstrap PostgreSQL connection ([evidence](docs/validation/runs/RUN-20261013-104.json))
- **passed:** Install project-pinned Linux Chromium into restored container for actual browser and Web Worker qualification ([evidence](docs/validation/runs/RUN-20261013-105.json))
- **passed:** Final-source actual Linux Chromium: six web/software-WebGL checks and two isolated Lab workers rejecting debug moves ([evidence](docs/validation/runs/RUN-20261013-106.json))
- **passed:** Actual host-orchestrated disposable PostgreSQL recreation: typed rows/journals and role/transaction checks; existing VS Code project/volume untouched ([evidence](docs/validation/runs/RUN-20261013-107.json))
- **historical:** Reported controlled RUN108 cancellation at98.7percent Windows commit; owned cleanup and Director Slack-first retry ([evidence](docs/validation/runs/RUN-20261013-109.json))
- **historical:** Reported Slack-first RUN110 resource cancellation at94.7percent Windows commit; browser-close request pending ([evidence](docs/validation/runs/RUN-20261013-111.json))
- **passed:** Source-only clean checkout frozen install and complete foundation; no local credentials/Git/database input copied ([evidence](docs/validation/runs/RUN-20261013-112.json))
- **failed:** Actual isolated BOOT-03 pipeline: frozen foundation, live PostgreSQL, Linux browser, dependency/secret scans and artifacts ([evidence](docs/validation/runs/RUN-20261013-113.json))
- **passed:** Canonical staged Git byte equality, clean frozen install/full foundation and owned temporary cleanup ([evidence](docs/validation/runs/RUN-20261013-114.json))
- **passed:** Final preservation: private ignored0600 files, current/full-history secrets, immutable logs, original scope/decisions/pins and owned listener cleanup ([evidence](docs/validation/runs/RUN-20261013-115.json))
- **passed:** Final source post-create: exact doctor, frozen install, static/docs verification, bootstrap and preserved original PostgreSQL ([evidence](docs/validation/runs/RUN-20261013-116.json))

### Documentation and files

- **updated:** [AGENTS.md](AGENTS.md) — Updated current behavior/operation/status with internal durable commands, explicit later gates and source-specific evidence; historical result bytes retained.
- **updated:** [README.md](README.md) — Updated current behavior/operation/status with internal durable commands, explicit later gates and source-specific evidence; historical result bytes retained.
- **updated:** [apps/match-service/README.md](apps/match-service/README.md) — Updated current behavior/operation/status with internal durable commands, explicit later gates and source-specific evidence; historical result bytes retained.
- **updated:** [docs/CHANGELOG_FORMAT.md](docs/CHANGELOG_FORMAT.md) — Updated current behavior/operation/status with internal durable commands, explicit later gates and source-specific evidence; historical result bytes retained.
- **updated:** [docs/DEVELOPMENT_WORKFLOW.md](docs/DEVELOPMENT_WORKFLOW.md) — Updated current behavior/operation/status with internal durable commands, explicit later gates and source-specific evidence; historical result bytes retained.
- **updated:** [docs/FEATURES.md](docs/FEATURES.md) — Updated current behavior/operation/status with internal durable commands, explicit later gates and source-specific evidence; historical result bytes retained.
- **updated:** [docs/HANDOFF.md](docs/HANDOFF.md) — Updated current behavior/operation/status with internal durable commands, explicit later gates and source-specific evidence; historical result bytes retained.
- **updated:** [docs/README.md](docs/README.md) — Updated current behavior/operation/status with internal durable commands, explicit later gates and source-specific evidence; historical result bytes retained.
- **updated:** [docs/WORKSPACE_QUALIFICATION.md](docs/WORKSPACE_QUALIFICATION.md) — Updated current behavior/operation/status with internal durable commands, explicit later gates and source-specific evidence; historical result bytes retained.
- **reviewed_unchanged:** [docs/adr/0001-local-development-environment.md](docs/adr/0001-local-development-environment.md) — Existing decision remains authoritative at its dated scope; ADR0013 documents this additive internal synthetic transaction/recovery implementation and preserves later admission/privacy/hosting gates.
- **reviewed_unchanged:** [docs/adr/0002-application-foundation.md](docs/adr/0002-application-foundation.md) — Existing decision remains authoritative at its dated scope; ADR0013 documents this additive internal synthetic transaction/recovery implementation and preserves later admission/privacy/hosting gates.
- **reviewed_unchanged:** [docs/adr/0003-documentation-evidence.md](docs/adr/0003-documentation-evidence.md) — Existing decision remains authoritative at its dated scope; ADR0013 documents this additive internal synthetic transaction/recovery implementation and preserves later admission/privacy/hosting gates.
- **updated:** [docs/audits/2026-10-06-project-audit.md](docs/audits/2026-10-06-project-audit.md) — Updated current behavior/operation/status with internal durable commands, explicit later gates and source-specific evidence; historical result bytes retained.
- **updated:** [docs/documentation-map.json](docs/documentation-map.json) — Updated current behavior/operation/status with internal durable commands, explicit later gates and source-specific evidence; historical result bytes retained.
- **updated:** [docs/features.json](docs/features.json) — Updated current behavior/operation/status with internal durable commands, explicit later gates and source-specific evidence; historical result bytes retained.
- **reviewed_unchanged:** [docs/plans/2026-10-06-documentation-governance.md](docs/plans/2026-10-06-documentation-governance.md) — Reviewed native schema1/history/UTC, private-data and qualification contracts against the scoped changes; format, Director decisions and previously executed evidence remain unchanged.
- **updated:** [docs/runbooks/workspace-setup.md](docs/runbooks/workspace-setup.md) — Updated current behavior/operation/status with internal durable commands, explicit later gates and source-specific evidence; historical result bytes retained.
- **reviewed_unchanged:** [docs/templates/change.json](docs/templates/change.json) — Reviewed native schema1/history/UTC, private-data and qualification contracts against the scoped changes; format, Director decisions and previously executed evidence remain unchanged.
- **reviewed_unchanged:** [docs/templates/handoff.md](docs/templates/handoff.md) — Reviewed native schema1/history/UTC, private-data and qualification contracts against the scoped changes; format, Director decisions and previously executed evidence remain unchanged.
- **updated:** [docs/validation/boot-01.md](docs/validation/boot-01.md) — Updated current behavior/operation/status with internal durable commands, explicit later gates and source-specific evidence; historical result bytes retained.
- **updated:** [docs/vision/README.md](docs/vision/README.md) — Updated current behavior/operation/status with internal durable commands, explicit later gates and source-specific evidence; historical result bytes retained.
- **reviewed_unchanged:** [docs/vision/additional_scope.csv](docs/vision/additional_scope.csv) — PLAY-01 evidence is prerequisite-only;548 original requirements,33 groups,20 optional flags, other task prerequisites and Director-owned decisions stay unchanged.
- **reviewed_unchanged:** [docs/vision/decision_register.csv](docs/vision/decision_register.csv) — PLAY-01 evidence is prerequisite-only;548 original requirements,33 groups,20 optional flags, other task prerequisites and Director-owned decisions stay unchanged.
- **updated:** [docs/vision/initial_backlog.csv](docs/vision/initial_backlog.csv) — Updated current behavior/operation/status with internal durable commands, explicit later gates and source-specific evidence; historical result bytes retained.
- **updated:** [docs/vision/requirements.csv](docs/vision/requirements.csv) — Updated current behavior/operation/status with internal durable commands, explicit later gates and source-specific evidence; historical result bytes retained.
- **reviewed_unchanged:** [infra/README.md](infra/README.md) — Reviewed native schema1/history/UTC, private-data and qualification contracts against the scoped changes; format, Director decisions and previously executed evidence remain unchanged.
- **updated:** [packages/contracts/README.md](packages/contracts/README.md) — Updated current behavior/operation/status with internal durable commands, explicit later gates and source-specific evidence; historical result bytes retained.
- **updated:** [packages/db/README.md](packages/db/README.md) — Updated current behavior/operation/status with internal durable commands, explicit later gates and source-specific evidence; historical result bytes retained.
- **updated:** [packages/engine-adapter/README.md](packages/engine-adapter/README.md) — Updated current behavior/operation/status with internal durable commands, explicit later gates and source-specific evidence; historical result bytes retained.
- **reviewed_unchanged:** [packages/presentation/README.md](packages/presentation/README.md) — Reviewed native schema1/history/UTC, private-data and qualification contracts against the scoped changes; format, Director decisions and previously executed evidence remain unchanged.
- **reviewed_unchanged:** [packages/service-runtime/README.md](packages/service-runtime/README.md) — Reviewed native schema1/history/UTC, private-data and qualification contracts against the scoped changes; format, Director decisions and previously executed evidence remain unchanged.
- **reviewed_unchanged:** [vendor/tcg-engines/README.md](vendor/tcg-engines/README.md) — Reviewed native schema1/history/UTC, private-data and qualification contracts against the scoped changes; format, Director decisions and previously executed evidence remain unchanged.
- **reviewed_unchanged:** [docs/plans/2026-10-06-boot-02-database.md](docs/plans/2026-10-06-boot-02-database.md) — Reviewed native schema1/history/UTC, private-data and qualification contracts against the scoped changes; format, Director decisions and previously executed evidence remain unchanged.
- **reviewed_unchanged:** [docs/adr/0004-restricted-local-database.md](docs/adr/0004-restricted-local-database.md) — Existing decision remains authoritative at its dated scope; ADR0013 documents this additive internal synthetic transaction/recovery implementation and preserves later admission/privacy/hosting gates.
- **updated:** [docs/runbooks/database.md](docs/runbooks/database.md) — Updated current behavior/operation/status with internal durable commands, explicit later gates and source-specific evidence; historical result bytes retained.
- **updated:** [docs/validation/boot-02.md](docs/validation/boot-02.md) — Updated current behavior/operation/status with internal durable commands, explicit later gates and source-specific evidence; historical result bytes retained.
- **reviewed_unchanged:** [docs/plans/2026-10-07-boot-03-ci.md](docs/plans/2026-10-07-boot-03-ci.md) — Reviewed native schema1/history/UTC, private-data and qualification contracts against the scoped changes; format, Director decisions and previously executed evidence remain unchanged.
- **reviewed_unchanged:** [docs/adr/0005-ci-artifact-qualification.md](docs/adr/0005-ci-artifact-qualification.md) — Existing decision remains authoritative at its dated scope; ADR0013 documents this additive internal synthetic transaction/recovery implementation and preserves later admission/privacy/hosting gates.
- **updated:** [docs/runbooks/ci.md](docs/runbooks/ci.md) — Updated current behavior/operation/status with internal durable commands, explicit later gates and source-specific evidence; historical result bytes retained.
- **updated:** [docs/validation/boot-03.md](docs/validation/boot-03.md) — Updated current behavior/operation/status with internal durable commands, explicit later gates and source-specific evidence; historical result bytes retained.
- **reviewed_unchanged:** [docs/plans/2026-10-07-boot-05-contracts.md](docs/plans/2026-10-07-boot-05-contracts.md) — Reviewed native schema1/history/UTC, private-data and qualification contracts against the scoped changes; format, Director decisions and previously executed evidence remain unchanged.
- **updated:** [docs/contracts/protocol.md](docs/contracts/protocol.md) — Updated current behavior/operation/status with internal durable commands, explicit later gates and source-specific evidence; historical result bytes retained.
- **updated:** [docs/contracts/release.md](docs/contracts/release.md) — Updated current behavior/operation/status with internal durable commands, explicit later gates and source-specific evidence; historical result bytes retained.
- **updated:** [docs/validation/boot-05.md](docs/validation/boot-05.md) — Updated current behavior/operation/status with internal durable commands, explicit later gates and source-specific evidence; historical result bytes retained.
- **reviewed_unchanged:** [docs/adr/0006-protocol-release-contracts.md](docs/adr/0006-protocol-release-contracts.md) — Existing decision remains authoritative at its dated scope; ADR0013 documents this additive internal synthetic transaction/recovery implementation and preserves later admission/privacy/hosting gates.
- **reviewed_unchanged:** [docs/adr/0007-hosting-provider-baseline.md](docs/adr/0007-hosting-provider-baseline.md) — Existing decision remains authoritative at its dated scope; ADR0013 documents this additive internal synthetic transaction/recovery implementation and preserves later admission/privacy/hosting gates.
- **updated:** [docs/adr/0008-engine-placement-dependency-baseline.md](docs/adr/0008-engine-placement-dependency-baseline.md) — Updated current behavior/operation/status with internal durable commands, explicit later gates and source-specific evidence; historical result bytes retained.
- **reviewed_unchanged:** [docs/plans/2026-10-10-boot-04-decision-worksheet.md](docs/plans/2026-10-10-boot-04-decision-worksheet.md) — Reviewed native schema1/history/UTC, private-data and qualification contracts against the scoped changes; format, Director decisions and previously executed evidence remain unchanged.
- **reviewed_unchanged:** [docs/validation/boot-04.md](docs/validation/boot-04.md) — Reviewed native schema1/history/UTC, private-data and qualification contracts against the scoped changes; format, Director decisions and previously executed evidence remain unchanged.
- **reviewed_unchanged:** [docs/rules/README.md](docs/rules/README.md) — Sourced120 scenarios, official inventory/certification and59-patch upstream provenance unchanged; player authority/private recovery are separate PLAY-01 prerequisites.
- **reviewed_unchanged:** [docs/rules/source-specs-supplement.json](docs/rules/source-specs-supplement.json) — Sourced120 scenarios, official inventory/certification and59-patch upstream provenance unchanged; player authority/private recovery are separate PLAY-01 prerequisites.
- **reviewed_unchanged:** [docs/rules/source-specs.json](docs/rules/source-specs.json) — Sourced120 scenarios, official inventory/certification and59-patch upstream provenance unchanged; player authority/private recovery are separate PLAY-01 prerequisites.
- **reviewed_unchanged:** [docs/validation/rule-01.md](docs/validation/rule-01.md) — Sourced120 scenarios, official inventory/certification and59-patch upstream provenance unchanged; player authority/private recovery are separate PLAY-01 prerequisites.
- **updated:** [packages/engine-lab/README.md](packages/engine-lab/README.md) — Updated current behavior/operation/status with internal durable commands, explicit later gates and source-specific evidence; historical result bytes retained.
- **updated:** [docs/runbooks/engine.md](docs/runbooks/engine.md) — Updated current behavior/operation/status with internal durable commands, explicit later gates and source-specific evidence; historical result bytes retained.
- **updated:** [docs/validation/rule-02.md](docs/validation/rule-02.md) — Updated current behavior/operation/status with internal durable commands, explicit later gates and source-specific evidence; historical result bytes retained.
- **updated:** [docs/adr/0009-pinned-engine-qualification.md](docs/adr/0009-pinned-engine-qualification.md) — Updated current behavior/operation/status with internal durable commands, explicit later gates and source-specific evidence; historical result bytes retained.
- **updated:** [docs/adr/0010-secure-randomness-replay.md](docs/adr/0010-secure-randomness-replay.md) — Updated current behavior/operation/status with internal durable commands, explicit later gates and source-specific evidence; historical result bytes retained.
- **updated:** [docs/validation/rule-03.md](docs/validation/rule-03.md) — Updated current behavior/operation/status with internal durable commands, explicit later gates and source-specific evidence; historical result bytes retained.
- **reviewed_unchanged:** [docs/templates/card-certification.json](docs/templates/card-certification.json) — Reviewed native schema1/history/UTC, private-data and qualification contracts against the scoped changes; format, Director decisions and previously executed evidence remain unchanged.
- **reviewed_unchanged:** [docs/adr/0011-sourced-rule-scenarios.md](docs/adr/0011-sourced-rule-scenarios.md) — Sourced120 scenarios, official inventory/certification and59-patch upstream provenance unchanged; player authority/private recovery are separate PLAY-01 prerequisites.
- **reviewed_unchanged:** [docs/runbooks/rules-certification.md](docs/runbooks/rules-certification.md) — Sourced120 scenarios, official inventory/certification and59-patch upstream provenance unchanged; player authority/private recovery are separate PLAY-01 prerequisites.
- **updated:** [docs/validation/rule-04.md](docs/validation/rule-04.md) — Updated current behavior/operation/status with internal durable commands, explicit later gates and source-specific evidence; historical result bytes retained.
- **updated:** [docs/adr/0012-upstream-kernel-refresh.md](docs/adr/0012-upstream-kernel-refresh.md) — Updated current behavior/operation/status with internal durable commands, explicit later gates and source-specific evidence; historical result bytes retained.
- **updated:** [docs/validation/upstream-engine-review.md](docs/validation/upstream-engine-review.md) — Updated current behavior/operation/status with internal durable commands, explicit later gates and source-specific evidence; historical result bytes retained.
- **reviewed_unchanged:** [docs/plans/2026-10-13-upstream-engine-review.md](docs/plans/2026-10-13-upstream-engine-review.md) — Reviewed native schema1/history/UTC, private-data and qualification contracts against the scoped changes; format, Director decisions and previously executed evidence remain unchanged.
- **updated:** [docs/adr/0013-durable-synthetic-match-commands.md](docs/adr/0013-durable-synthetic-match-commands.md) — Updated current behavior/operation/status with internal durable commands, explicit later gates and source-specific evidence; historical result bytes retained.
- **updated:** [docs/runbooks/match-commands.md](docs/runbooks/match-commands.md) — Updated current behavior/operation/status with internal durable commands, explicit later gates and source-specific evidence; historical result bytes retained.
- **updated:** [docs/validation/play-01.md](docs/validation/play-01.md) — Updated current behavior/operation/status with internal durable commands, explicit later gates and source-specific evidence; historical result bytes retained.
- **reviewed_unchanged:** [docs/schemas/change.schema.json](docs/schemas/change.schema.json) — Existing schemas compared with PLAY-01: no new public/private DTO or evidence format; internal service/store remain server-only and native schema1/v3 contracts remain.
- **reviewed_unchanged:** [docs/schemas/documentation-map.schema.json](docs/schemas/documentation-map.schema.json) — Existing schemas compared with PLAY-01: no new public/private DTO or evidence format; internal service/store remain server-only and native schema1/v3 contracts remain.
- **reviewed_unchanged:** [docs/schemas/state.schema.json](docs/schemas/state.schema.json) — Existing schemas compared with PLAY-01: no new public/private DTO or evidence format; internal service/store remain server-only and native schema1/v3 contracts remain.
- **reviewed_unchanged:** [docs/schemas/features.schema.json](docs/schemas/features.schema.json) — Existing schemas compared with PLAY-01: no new public/private DTO or evidence format; internal service/store remain server-only and native schema1/v3 contracts remain.
- **reviewed_unchanged:** [docs/schemas/run.schema.json](docs/schemas/run.schema.json) — Existing schemas compared with PLAY-01: no new public/private DTO or evidence format; internal service/store remain server-only and native schema1/v3 contracts remain.
- **reviewed_unchanged:** [docs/schemas/card-certification.schema.json](docs/schemas/card-certification.schema.json) — Existing schemas compared with PLAY-01: no new public/private DTO or evidence format; internal service/store remain server-only and native schema1/v3 contracts remain.

Full changed-file inventory: [record](docs/changes/CHG-20261013-004.json).

### Limits and next actions

- Isolated113 child completes14 stages/artifact validation but receipt fails clock_changed; no qualified/published CI artifact or hosted execution for this source. Leave-environment choice honored; no unsupported retry.
- Windows/touch/GPU/load/production unperformed. Ordinary/official/private/reward/card admission, authenticated transport, PLAY-02 viewer/log privacy, PLAY-03 publication, PLAY-04 clocks, AUTH/REPLAY D10 delivery and X01 multiplayer remain gated.
- 108/110 controlled resource cancellations and086/087 unknown/088 truncated supply no acceptance; original data/private files/settings preserved. No spend/deploy/publication/main merge.
- Director audit and authorized branch publication/integration with clean hosted CI; local isolated timing remains pending under leave-environment decision.
- PLAY-02 viewer/structured-log noninterference follows PLAY-01; preserve AUTH/REPLAY D10, PLAY-03/04, X01 and ordinary/card/reward/device gates.

## CHG-20261013-003 — Independent audit of the upstream engine refresh and Director-authorized integration into main

- Status: finalized
- Actor: Claude Code agent (architect/QA reviewer role) on Director request, local WSL session
- Recorded (UTC): 2026-10-13T15:18:33.015Z
- Event: unknown; recorded retrospectively (recorded_only)
- Source: 1abe9ce202889a372a3336fcf6ea195341be87d7
- Tasks: RULE-02, RULE-03, RULE-04, DOC-01, DOC-02
- Features: F-DOCS, F-CI, F-ENGINE, F-RULE-CERTIFICATION
- Requirements: none

### Changes

- **review:** Audited Codex commit 1abe9ce (upstream engine refresh, CHG-20261013-002) against ADR0012, ADR0009/0010/0011, D10/D11 and the RULE-02/03/04 guarantees. Upstream identity checked through the public GitHub API: 6de59de1 is TheCardGoat/tcg-engines main, signature verified, sole parent 53a79413, tree d3496c4b equal to the inert clone (51,113 blobs). Reviewed selection/importer changes, the 59-patch reconciliation (RULE-03 P003-P028 and RULE-04 P029-P053 rebased; new P054-P059), adapter/Lab revision constants, the test-only projection probe and upstream debug-move, log, turn-flow and ink-drop changes. All 91 earlier scenario oracles are unchanged apart from the inkDropCounters -> inkDrops rename; 29 new scenarios add the static-loss fix and native ink-drop/lifetime/aura/replacement/projection regressions. Requirement/backlog edits add evidence links only; 548 dispositions and task statuses unchanged. Verdict: refresh confirmed.
- **test:** Independent runs RUN-20261013-047..057 all passed at fingerprint 4ba45cc4 with exact timing: timing-valid full verify:foundation (270 project checks = 246 Node + 24 Python, 406 upstream passes/1 inherited skip/1,362 expectations, 2 injection tests), importer reproduction, separate byte audit with GitHub blob-id cross-check of all 363 pinned files/licenses, official source bytes plus AST entropy guard, 20-case auditor rules probe (16 earlier cases plus the confirmed static Adventurous-loss fix), RULE-03 adapter probe, HMAC re-derivation, manual-move characterization, bundle scan, boundary probe and Chromium 6 web scenarios/2 workers. RUN-20261013-059 docs:check covers this record.
- **test:** Host isolated CI RUN-20261013-058 passed its first ten stages (frozen install, doctor, full foundation, bootstrap/restricted databases, local/test migrations, eight identities, live database) and failed at pinned-chromium: the fresh image could not download Chrome for Testing (187 MiB) from storage.googleapis.com within Playwright's 30 s request timeout. An unrecorded manual check measured about 7 KB/s from that host and a GitHub API timeout, so the connection was degraded; no retry. No clock discontinuity over 726,495 ms; owned project/volume/network/image removed.
- **review:** Follow-ups recorded, none blocking integration: (1) manual/debug moves, now including upstream manualSetInkDrops, are still accepted with player authority through the server adapter (RUN054); PLAY-01 must begin with server and Lab move allowlists. (2) P056 changes upstream setup from at-least-two to exactly-two players; consistent with the current two-player kernel and blueprint, but must be revisited when X01 multiplayer/teams is certified. (3) Upstream structured move-log changes are PLAY-02 privacy scope, not claimed here.
- **documentation:** Appended a dated audit section to docs/validation/upstream-engine-review.md and dated notes to ADR0012, the refresh plan and the engine runbook; updated AGENTS.md, README.md and docs/README.md refresh status, F-CI/F-ENGINE/F-RULE-CERTIFICATION descriptions and evidence, the FEATURES summary, the RULE-02 backlog evidence link and the handoff.
- **revision:** Director-authorized integration: publish codex/upstream-engine-review (1abe9ce) and claude/upstream-engine-audit, run hosted CI on the audit branch, and fast-forward main to the audit commit once it passes. Hosted results are recorded in a later change.

### Verification

- **passed:** Timing-valid pnpm verify:foundation: 270 project checks (246 Node + 24 Python incl. 128 rules checks), 406 upstream passes/1 inherited skip, 2 injection tests. Local Dev Container. ([evidence](docs/validation/runs/RUN-20261013-047.json))
- **passed:** Importer --check against the inert 6de59de1 clone: 361 payloads, licenses, 59 patch originals and the lock reproduced. ([evidence](docs/validation/runs/RUN-20261013-048.json))
- **passed:** Independent Python byte audit of the 361-file closure and 59-patch ledger, with every pinned blob id cross-checked against GitHub's tree for the commit. ([evidence](docs/validation/runs/RUN-20261013-049.json))
- **passed:** Official RULE-01 cache and CR2.2/CR2.3 scenario-source bytes; AST ambient-entropy guard across 361 selected files. ([evidence](docs/validation/runs/RUN-20261013-050.json))
- **passed:** Auditor rules probe on the refreshed kernel: 16 earlier CR2.3-sourced cases plus 4 static Adventurous-loss cases. ([evidence](docs/validation/runs/RUN-20261013-051.json))
- **passed:** Unchanged RULE-03 compiled-adapter probe on the refreshed kernel with ambient entropy and clocks disabled. ([evidence](docs/validation/runs/RUN-20261013-052.json))
- **passed:** Independent Python HMAC-SHA256 re-derivation of 3,765 compiled server outcomes. ([evidence](docs/validation/runs/RUN-20261013-053.json))
- **passed:** Characterization: manualSetInkDrops and manualSetLore from the non-active player accepted through the server adapter (pre-existing gap; PLAY-01). ([evidence](docs/validation/runs/RUN-20261013-054.json))
- **passed:** Built-bundle scan: kernel invariants, reviewed mechanics present, no test-only bridge in any bundle. ([evidence](docs/validation/runs/RUN-20261013-055.json))
- **passed:** Boundary probe: 11 owners refuse 264 imports of scenario tooling. ([evidence](docs/validation/runs/RUN-20261013-056.json))
- **passed:** Actual headless Linux Chromium: 6 web foundation scenarios and 2 compiled Lab Web Workers. ([evidence](docs/validation/runs/RUN-20261013-057.json))
- **failed:** Host isolated CI: first ten stages passed; pinned-chromium failed on a browser-download network timeout; no artifact; owned resources removed. ([evidence](docs/validation/runs/RUN-20261013-058.json))
- **passed:** pnpm docs:check over the audit documentation, records and generated views at fingerprint 4ba45cc4. ([evidence](docs/validation/runs/RUN-20261013-059.json))

### Documentation and files

- **updated:** [docs/validation/upstream-engine-review.md](docs/validation/upstream-engine-review.md) — Appended a dated independent-audit section with upstream identity, run outcomes, the network-failed isolated CI, verdict and follow-ups; Codex text unchanged.
- **updated:** [docs/HANDOFF.md](docs/HANDOFF.md) — Header actors, authorized publication/integration sequence, audit verification and follow-ups, and next actions; other Codex content unchanged.
- **updated:** [docs/adr/0012-upstream-kernel-refresh.md](docs/adr/0012-upstream-kernel-refresh.md) — Dated audit note: decision unchanged and matching the audited source; GitHub identity, P056 X01 caveat and isolated CI outcome.
- **updated:** [docs/plans/2026-10-13-upstream-engine-review.md](docs/plans/2026-10-13-upstream-engine-review.md) — Dated audit/integration note appended; checklist and closure preserved.
- **updated:** [docs/runbooks/engine.md](docs/runbooks/engine.md) — Audit note on P056 two-player guard and the manualSetInkDrops extension of the debug-move gap.
- **updated:** [AGENTS.md](AGENTS.md) — Current refresh statement notes the independent audit, the timing-valid foundation receipt and the P056 X01 caveat.
- **updated:** [README.md](README.md) — Short dated audit section; earlier sections preserved.
- **updated:** [docs/README.md](docs/README.md) — Current refresh entry point links the audit and its follow-ups.
- **updated:** [docs/features.json](docs/features.json) — F-CI adds the network-failed RUN058 (verification unchanged); F-ENGINE and F-RULE-CERTIFICATION add audit evidence.
- **updated:** [docs/FEATURES.md](docs/FEATURES.md) — Refresh summary line notes the audit receipts and the isolated CI outcome.
- **updated:** [docs/vision/initial_backlog.csv](docs/vision/initial_backlog.csv) — RULE-02 evidence links add this audit; statuses unchanged.
- **historical_preserved:** [docs/reviews/2026-10-13-upstream-engine-review.md](docs/reviews/2026-10-13-upstream-engine-review.md) — Codex reviewer record; the independent audit is recorded separately in validation.
- **reviewed_unchanged:** [docs/runbooks/rules-certification.md](docs/runbooks/rules-certification.md) — Codex already marked the audited Adventurous defect as corrected; RUN051 confirms it.
- **reviewed_unchanged:** [docs/validation/rule-04.md](docs/validation/rule-04.md) — Historical RULE-04 audit section remains accurate for its source; the fix is recorded in the refresh validation.
- **reviewed_unchanged:** [docs/vision/requirements.csv](docs/vision/requirements.csv) — Codex edits add evidence links only (R01.005/.006, R29.005); no disposition change.

Full changed-file inventory: [record](docs/changes/CHG-20261013-003.json).

### Limits and next actions

- No new timing-qualified isolated CI artifact: RUN058 failed on a network timeout downloading the browser; hosted CI is observed after publication.
- The debug-move authority gap remains open for PLAY-01; P056 is a current two-player boundary to revisit for X01.
- Upstream structured-log privacy, full rules/card certification, durable play, AUTH/replay delivery, device and production acceptance are not claimed.
- Observe hosted CI on the audit branch and on main; record both in the next change.
- Assign PLAY-01, starting with server and Lab move allowlists that refuse every manual/debug move including manualSetLore and manualSetInkDrops.
- Revisit P056 when X01 multiplayer/teams is certified.

## CHG-20261013-002 — Refresh reviewed upstream kernel before PLAY-01

- Status: finalized
- Actor: Codex architect/developer/source reviewer
- Recorded (UTC): 2026-10-13T04:42:13.716Z
- Event: unknown; recorded retrospectively (recorded_only)
- Source: a45ac4b3794192d560ab7edca23c4b23a27cc9c2
- Tasks: RULE-01, RULE-02, RULE-03, RULE-04, DOC-01, DOC-02
- Features: F-ENGINE, F-RULE-CERTIFICATION, F-DOCS, F-CI
- Requirements: R01.005, R01.006, R29.005

### Changes

- **review:** Director-authorized complete upstream comparison and compatible update review before PLAY-01. Intake main a45ac4b is clean and records both reported play follow-ups; baseline passed inside the existing container.
- **revision:** Full inert repository/Git blob/path/AST audit; advance bounded closure to6de59de1, reconcile59 exact patches, select37 unchanged upstream test files. No product catalog or dependency/toolchain import.
- **fix:** Correct static Adventurous loss and native counter/payment/event/predicate/lifetime/effective-state/cost-increase compatibility with29 new sourced scenarios.
- **function:** Retain private provider-only RNG/replay and test-only fixture ownership; add actual projection assertion probe without production exports.
- **test:** Preserve all red/reconciliation/fixture/timing failures; RUN035 final128 rules checks pass at4ba45cc4. Final full/frozen/browser/clean/canonical checks remain checkpoint work.
- **documentation:** Record ADR0012/current operation/source inventories; preserve historical Director CI and source-specific evidence, all548 original requirements/optional dispositions and PLAY gates.
- **review:** Final source reviewer reports no remaining bounded blockers; full270-project/406-upstream/build/browser assertions pass but037/038/039/042 receipts fail unchanged clock guard. Complete actual adapter files pass043;040 absent operand coverage clarified.
- **documentation:** Seal exact current source/native map/feature/handoff/backlog/changelog coverage. RUN044 clean canonical assertions pass but timed receipt fails; final045/046 source/preservation/documentation receipts pass. Local review commit only; current hosted/long timing/play gates explicitly pending.

### Verification

- **passed:** Existing-container doctor, complete static verification, bootstrap tests and authenticated original PostgreSQL baseline, before substantive changes. ([evidence](docs/validation/runs/RUN-20261013-014.json))
- **passed:** Acquire inert full upstream Git history and checkout current public main without installing or running its code ([evidence](docs/validation/runs/RUN-20261013-015.json))
- **failed:** Expected red: permanent static Adventurous loss removes the end-turn obligation ([evidence](docs/validation/runs/RUN-20261013-016.json))
- **failed:** Expected red: new upstream gain-ink-drop effect is not supported by the old pinned runtime ([evidence](docs/validation/runs/RUN-20261013-017.json))
- **failed:** Expected red: mandatory activated ink-drop costs are not charged by the old engine ([evidence](docs/validation/runs/RUN-20261013-018.json))
- **failed:** First reconciled pin: exact vendor reproduction, entropy boundaries, rules scenarios and selected upstream suites ([evidence](docs/validation/runs/RUN-20261013-019.json))
- **failed:** Movement consumption correction: rules scenarios and unchanged new-pin upstream suites ([evidence](docs/validation/runs/RUN-20261013-020.json))
- **failed:** Two-seat setup, explicit Shift UI choices and no duplicate counter availability; original selected upstream assertions ([evidence](docs/validation/runs/RUN-20261013-021.json))
- **passed:** Explicit zero choice at Shift UI discovery matches unchanged upstream assertions without changing core default payment ([evidence](docs/validation/runs/RUN-20261013-022.json))
- **failed:** Complete upstream tree/blob identity, changed-path dispositions, fresh hosted RULE04 metadata and static Lorcana definition/test inventory ([evidence](docs/validation/runs/RUN-20261013-023.json))
- **passed:** Complete source inventory with component-safe paths, fresh public hosted metadata and candidate Lorcana definitions/tests ([evidence](docs/validation/runs/RUN-20261013-024.json))
- **failed:** Expected red: generation alias event parity and default payment conditional validation before correction ([evidence](docs/validation/runs/RUN-20261013-025.json))
- **passed:** Inspect exact conditional scry rejection before altering payment logic ([evidence](docs/validation/runs/RUN-20261013-026.json))
- **failed:** Correct raw bag ID and bottom-to-top deck fixtures; isolate legacy event/default paid-branch regressions ([evidence](docs/validation/runs/RUN-20261013-027.json))
- **failed:** Expected red: reviewed native effect payment/lifetime and suppression/condition branches with active controls ([evidence](docs/validation/runs/RUN-20261013-028.json))
- **passed:** Reviewed default/nested payment facts, generation events, effect source lifetime and effective ability regressions ([evidence](docs/validation/runs/RUN-20261013-029.json))
- **failed:** Expected red: real derived restriction projections and payments agree on the owning counter pool; native overflow and reserved costs ([evidence](docs/validation/runs/RUN-20261013-030.json))
- **failed:** Reconciled counter-aware derived projections, all 114 sourced scenarios, selected original tests and reproduction ([evidence](docs/validation/runs/RUN-20261013-031.json))
- **failed:** Final-pin representative sourced rules and certification tests, independent short stage ([evidence](docs/validation/runs/RUN-20261013-032.json))
- **passed:** Final-pin unchanged selected upstream assertions, independent short stage ([evidence](docs/validation/runs/RUN-20261013-033.json))
- **failed:** Expected red: cost increase execution, complete static G conditions and legacy replacement parity ([evidence](docs/validation/runs/RUN-20261013-034.json))
- **passed:** All 120 source-backed cases after cost-increase, complete static G and generation replacement parity fixes ([evidence](docs/validation/runs/RUN-20261013-035.json))
- **passed:** Final-source exact vendor reproduction, entropy guard, official source-leaf bytes and unchanged selected upstream/injection regressions ([evidence](docs/validation/runs/RUN-20261013-036.json))
- **failed:** Final-source frozen install, doctor, complete foundation build/type/lint/test/replay checks and continued bootstrap PostgreSQL baseline ([evidence](docs/validation/runs/RUN-20261013-037.json))
- **failed:** Final-source actual Linux Chromium web diagnostics and two built engine worker lifecycle/privacy checks ([evidence](docs/validation/runs/RUN-20261013-038.json))
- **failed:** Final-source frozen install, exact doctor and real type/lint/build stages separately from the timing-rejected monolithic run ([evidence](docs/validation/runs/RUN-20261013-039.json))
- **passed:** Final-source secure RNG/private replay/Lab and production bundle regressions; short executed stage with unchanged timing contract ([evidence](docs/validation/runs/RUN-20261013-040.json))
- **passed:** Read-only eight restricted local/test identities, private file/scope/history/log integrity and no owned services/listeners at the final source ([evidence](docs/validation/runs/RUN-20261013-041.json))
- **failed:** Final-source complete actual adapter RNG/identity/replay test files, Lab, foundation boundaries, documentation, CI and inventory/tooling regressions ([evidence](docs/validation/runs/RUN-20261013-042.json))
- **passed:** Final-source complete adapter identity, secure random method, private deterministic replay and Lab regression files ([evidence](docs/validation/runs/RUN-20261013-043.json))
- **failed:** Canonical staged Git-byte clean source copy, frozen install and complete foundation validation; original credentials/data excluded ([evidence](docs/validation/runs/RUN-20261013-044.json))
- **passed:** Fresh public upstream main still matches the reviewed pin and final private/history/log/scope/listener closure ([evidence](docs/validation/runs/RUN-20261013-045.json))
- **passed:** Final native documentation drift/coverage/fingerprint/callable/changelog/evidence gate before sealing; unchanged timing guard ([evidence](docs/validation/runs/RUN-20261013-046.json))

### Documentation and files

- **updated:** [AGENTS.md](AGENTS.md) — The authorized upstream maintenance now pins6de59de1 with361 selected files/308 runtime files/59 reproduced patches/37 unchanged test files and120 sourced scenarios. Permanent static Adventurous loss is corrected. Keep every play/card gate closed; PLAY-01 must refuse all manual/debug moves (including manualSetInkDrops) in server and Lab. Hosted RULE-04 maina45ac4b passed run38329018576, freshly observed in RUN024; this does not qualify the refresh branch. Preserve the unchanged clock/environment instruction.
- **updated:** [README.md](README.md) — The reviewed upstream kernel now pins6de59de1 (361 selected/308 runtime/59 patches/37 unchanged test files), with120 sourced synthetic scenarios. Permanent static Adventurous loss is corrected; the next PLAY-01 scope still begins with legitimate server/Lab move filtering and durable receipts. No official cards or ordinary games are enabled. Merged RULE-04 GitHub run38329018576 passed at maina45ac4b; this branch requires its own hosted qualification.
- **updated:** [docs/FEATURES.md](docs/FEATURES.md) — Current callable ownership retains the private server RNG/replay boundary and adds native counter event/payment parity, effective keyword/lifetime/condition corrections and a test-only projection probe. F-ENGINE now owns361 selected/308 runtime files/59 patches/37 unchanged test files; F-RULE-CERTIFICATION owns120 cases. The authoritative machine register records evidence status; earlier result rows retain their source dates.
- **updated:** [docs/README.md](docs/README.md) — Read ADR0012, upstream-engine-review validation and the dated full upstream inventories for the pre-PLAY refresh. Operational current pins come from the lock/runbooks; dated research and executed evidence remain source-specific.
- **updated:** [docs/WORKSPACE_QUALIFICATION.md](docs/WORKSPACE_QUALIFICATION.md) — The refresh changes engine source only; toolchain/container/lock/database remain the committed baseline. RUN014 executes the pre-change container checks. Final source evidence and any timing rejections are owned by the refresh validation; no Windows/device/production acceptance is inferred.
- **updated:** [docs/adr/0001-local-development-environment.md](docs/adr/0001-local-development-environment.md) — No environment or toolchain decision changes. The existing Dev Container remains the application execution boundary; preserve original data/private files and the Director leave-environment choice during this source refresh.
- **updated:** [docs/adr/0002-application-foundation.md](docs/adr/0002-application-foundation.md) — Foundation diagnostics and ports remain unchanged. The sole engine owners remain server engine-adapter and browser engine-lab; the new pin changes compiled identity, not app admission or UI scope.
- **updated:** [docs/audits/2026-10-06-project-audit.md](docs/audits/2026-10-06-project-audit.md) — The dated bootstrap audit remains historical evidence. Current source now includes the reviewed6de59de1 kernel maintenance and120 synthetic cases; all play/card/device gates remain explicit in the current handoff.
- **updated:** [docs/plans/2026-10-06-documentation-governance.md](docs/plans/2026-10-06-documentation-governance.md) — The universal governance contract is unchanged. This refresh uses a native CHG, full source-impact reviews, immutable intermediate failures, current callable/file inventory and separate dated upstream evidence.
- **updated:** [docs/runbooks/workspace-setup.md](docs/runbooks/workspace-setup.md) — Existing setup/ports/toolchain remain. Engine reproduction now uses the separately retained inert6de59de1 checkout; use the owning engine operation, not the original53a79413 cache, for current vendor verification.
- **updated:** [docs/validation/boot-01.md](docs/validation/boot-01.md) — Prior foundation execution/Windows history remains source-specific. The refresh adds no product UI or service integration; current source build/type/lint/browser/clean results are recorded in the refresh validation.
- **updated:** [docs/vision/README.md](docs/vision/README.md) — The original vision and 548 requirements/20 optional dispositions are unchanged. Dated upstream catalog presence is research; new set014 source definitions do not select D04 or admit cards.
- **updated:** [packages/engine-adapter/README.md](packages/engine-adapter/README.md) — Current upstream revision is6de59de1; server-owned RNG/completed private replay contracts and D10 restrictions remain. New compiled source changes replay identity. No transport/receipt/deduplication is introduced; manual/debug move filtering remains PLAY-01 before any real match.
- **updated:** [packages/engine-lab/README.md](packages/engine-lab/README.md) — Current synthetic kernel revision is6de59de1. Lab keeps noncompetitive seedrandom and rewardEligible:false; native counters and test-only probes grant no private server exports. PLAY-01 must restrict legitimate Lab move names before ordinary use.
- **updated:** [docs/runbooks/ci.md](docs/runbooks/ci.md) — Hosted RULE-04 run38329018576 succeeded at maina45ac4b (public metadata observed RUN024). The new refresh branch is not covered by that run. Local isolated timing remains pending under the Director leave-environment choice; no repeated long isolated retry or guard change.
- **updated:** [docs/validation/boot-03.md](docs/validation/boot-03.md) — Fresh RUN024 corroborates merged RULE-04 GitHub success at maina45ac4b. Current refresh source requires its own hosted result; original accepted artifact/pipeline records remain historical. Clock-rejected receipts stay failed.
- **updated:** [docs/contracts/release.md](docs/contracts/release.md) — The kernel source pin is6de59de1 with59 patches; compiled engine/adaptor and release hashes change naturally. Old private replays bind the old compiled identity and cannot silently pass current verification. No retained durable game loader or activation is implemented.
- **updated:** [docs/adr/0008-engine-placement-dependency-baseline.md](docs/adr/0008-engine-placement-dependency-baseline.md) — The approved isomorphic placement and dependency baseline are unchanged. ADR0012 records the bounded source refresh; it imports no upstream app/toolchain/dependency graph and keeps server authority/private replay gates.
- **updated:** [docs/plans/2026-10-10-boot-04-decision-worksheet.md](docs/plans/2026-10-10-boot-04-decision-worksheet.md) — The OVHcloud US/Cloudflare decision, $25 ceiling and provider scope remain unchanged. This source maintenance adds no purchase/deploy/provisioning authorization or capacity claim.
- **updated:** [docs/rules/README.md](docs/rules/README.md) — Additional dated inventories at6de59de1 cover the entire repository change range and current Lorcana catalog/test source. They do not replace or rewrite the October10 source acquisition/count snapshots. Set014 source presence207 definitions is not certification or release admission.
- **updated:** [docs/validation/rule-01.md](docs/validation/rule-01.md) — Original dated inventories/source gaps remain. RUN024 records the new complete raw-tree/AST inventory at6de59de1;3,374 definition objects/3,565 test files/13,393 static declarations are new static denominators, not runtime or card acceptance.
- **updated:** [docs/validation/rule-02.md](docs/validation/rule-02.md) — Current vendor moves to6de59de1:361 selected/308 runtime/59 reproduced patches/37 unchanged tests. Prior RULE-02 results remain bound to53a79413. All compatible selected source updates are reconciled, while other games/UI/catalog remain outside product ownership.
- **updated:** [docs/adr/0009-pinned-engine-qualification.md](docs/adr/0009-pinned-engine-qualification.md) — ADR0012 advances the explicit bounded pin to6de59de1 and records the comparative full-tree evidence. Existing synthetic-only qualification, exact importer/provenance and all play gates are retained.
- **updated:** [docs/adr/0010-secure-randomness-replay.md](docs/adr/0010-secure-randomness-replay.md) — The secure random/clock injection and D10 private replay decision are unchanged. Rebased provider patches retain their behavior; compiled replay identity changes with6de59de1. Current-source regression results live in refresh validation.
- **updated:** [docs/validation/rule-03.md](docs/validation/rule-03.md) — Current refresh retains server secure RNG and deterministic completed verification while rebasing to6de59de1. Prior source-matched replay/CI records are immutable history; new code needs fresh checks. Private delivery/durability/wire privacy remain later tasks.
- **updated:** [docs/adr/0011-sourced-rule-scenarios.md](docs/adr/0011-sourced-rule-scenarios.md) — The representative oracle extends from91 to120 cases at6de59de1, adding static Adventurous loss and native payment/event/lifetime/effective-state controls. Card promotion remains refused; test-only projection probes do not widen product exports.
- **updated:** [docs/validation/rule-04.md](docs/validation/rule-04.md) — The reported static Adventurous-loss end-turn defect is fixed with SCN092, passing under the current120-case suite. Upstream turn enumeration improvements are included. Manual/debug command authority remains unresolved (now including manualSetInkDrops) and must be refused by PLAY-01 server/Lab before any real match. Prior audit failures/results remain exact historical bytes.
- **reviewed_unchanged:** [docs/vision/additional_scope.csv](docs/vision/additional_scope.csv) — No scope/status change to X06/X07 or researched optional products; refresh is an existing RULE prerequisite maintenance.
- **reviewed_unchanged:** [docs/vision/decision_register.csv](docs/vision/decision_register.csv) — All Director decisions including D07/D10/D11 remain identical; no Director-owned choice changed.
- **reviewed_unchanged:** [docs/templates/change.json](docs/templates/change.json) — Native schema-v1 record format and authoring placeholders remain unchanged.
- **reviewed_unchanged:** [docs/templates/card-certification.json](docs/templates/card-certification.json) — Empty per-card authoring template remains intentionally unexecuted; no fabricated pins/promotions/evidence.
- **reviewed_unchanged:** [docs/rules/source-specs.json](docs/rules/source-specs.json) — Retained dated official/source acquisition identities remain historical research inputs, not the new current vendor pin.
- **reviewed_unchanged:** [docs/rules/source-specs-supplement.json](docs/rules/source-specs-supplement.json) — Retained supplemental source profiles/hashes remain applicable and unchanged; no reacquisition bytes rewritten.
- **updated:** [docs/vision/initial_backlog.csv](docs/vision/initial_backlog.csv) — Records exact current pin/compatibility/authority/task/evidence ownership with historical source-specific results retained and play gates closed.
- **updated:** [docs/vision/requirements.csv](docs/vision/requirements.csv) — Records exact current pin/compatibility/authority/task/evidence ownership with historical source-specific results retained and play gates closed.
- **updated:** [docs/documentation-map.json](docs/documentation-map.json) — Records exact current pin/compatibility/authority/task/evidence ownership with historical source-specific results retained and play gates closed.
- **updated:** [docs/features.json](docs/features.json) — Records exact current pin/compatibility/authority/task/evidence ownership with historical source-specific results retained and play gates closed.
- **updated:** [docs/HANDOFF.md](docs/HANDOFF.md) — Records exact current pin/compatibility/authority/task/evidence ownership with historical source-specific results retained and play gates closed.
- **updated:** [docs/runbooks/engine.md](docs/runbooks/engine.md) — Records exact current pin/compatibility/authority/task/evidence ownership with historical source-specific results retained and play gates closed.
- **updated:** [docs/runbooks/rules-certification.md](docs/runbooks/rules-certification.md) — Records exact current pin/compatibility/authority/task/evidence ownership with historical source-specific results retained and play gates closed.
- **updated:** [vendor/tcg-engines/README.md](vendor/tcg-engines/README.md) — Records exact current pin/compatibility/authority/task/evidence ownership with historical source-specific results retained and play gates closed.
- **updated:** [docs/plans/2026-10-13-upstream-engine-review.md](docs/plans/2026-10-13-upstream-engine-review.md) — Records exact current pin/compatibility/authority/task/evidence ownership with historical source-specific results retained and play gates closed.
- **updated:** [docs/adr/0012-upstream-kernel-refresh.md](docs/adr/0012-upstream-kernel-refresh.md) — Records exact current pin/compatibility/authority/task/evidence ownership with historical source-specific results retained and play gates closed.
- **updated:** [docs/validation/upstream-engine-review.md](docs/validation/upstream-engine-review.md) — Records exact current pin/compatibility/authority/task/evidence ownership with historical source-specific results retained and play gates closed.
- **updated:** [CHANGELOG.md](CHANGELOG.md) — Native synchronization regenerates exact changed-file/callable/status/evidence views; prose truth separately reviewed.
- **updated:** [docs/current-state.json](docs/current-state.json) — Native synchronization regenerates exact changed-file/callable/status/evidence views; prose truth separately reviewed.
- **reviewed_unchanged:** [docs/policies/fan-content.md](docs/policies/fan-content.md) — D07 fan-content/provenance/notice/neutral fallback contract is unchanged. The new raw catalog is inert research; no official card definitions or assets enter the product closure.

Full changed-file inventory: [record](docs/changes/CHG-20261013-002.json).

### Limits and next actions

- All ordinary/official/private/reward/card gates remain closed; PLAY-01 server/Lab debug authority and durable transitions remain pending.
- Local isolated timing and current-branch hosted/image/artifact qualification remain pending; no environment changes or futile isolated retries.
- Full rules/card/Windows/touch/GPU/load/production and D10 recipient delivery remain separate.
- Final-source full build/test/browser assertions pass, but local whole-run timing receipts fail; preserve failures and prior feature acceptance as historical, with bounded engine/rules verified separately.
- Independent review/current-source hosted CI qualification before integration; preserve local clock failures under the leave-environment instruction.
- Director-assigned PLAY-01: legitimate server/Lab move allowlists refusing manual/debug commands, then durable receipts/journal/outbox/CAS; all later card/privacy/auth/reward gates remain.

## CHG-20261013-001 — Independent audit of RULE-04 and Director-authorized integration into main

- Status: finalized
- Actor: Claude Code agent (architect/QA reviewer role) on Director request, local WSL session
- Recorded (UTC): 2026-10-13T00:23:36.961Z
- Event: unknown; recorded retrospectively (recorded_only)
- Source: 808de78251ff3df099c2fb2861afb8f98f4ec28e
- Tasks: RULE-04, DOC-01, DOC-02
- Features: F-DOCS, F-CI, F-ENGINE, F-RULE-CERTIFICATION
- Requirements: R01.009, R01.011, R01.016, R28.002, R28.003, R28.004, R28.005, R28.007, R28.010, R28.011, R28.012

### Changes

- **review:** Audited Codex commit 808de78 (RULE-04, CHG-20261012-003/004/005) against the backlog acceptance (sourced expected results, negative cases, effect-bag/choices, new-keyword and invalid-state coverage), ADR0011, D10 and D11. Code review covered the test-only scenario build/runtime bridge, certification gate, schema/template, the 91 scenario oracles against the official CR2.3/CR2.2 text (1.13, 7.7.3-7.7.6, 8.14 and 8.16 read in full), boundary and governance-test changes, and every behavioral change in the 25 new and expanded patches: ink-drop payment planning, getAvailableInk callers, Adventurous challenge/end-of-turn checks, temporary keyword loss in the derived projection, Vanish recording through the actual chooser with a captured zone incarnation, removal of duplicate be-chosen emissions, slotted-target cardinality and counter generation. Requirement edits only add RULE-04 as prerequisite evidence; all 548 dispositions and scope counts are unchanged. Verdict: representative RULE-04 acceptance met.
- **test:** Independent runs RUN-20261013-001..010 all passed at Codex final fingerprint 5f405778 with exact timing: verify:foundation (241 project checks = 217 Node + 24 Python, 338 upstream passes/1 inherited skip/838 expectations, 2 injection tests); importer reproduction (346 payloads, 53 patches); separate git cat-file byte audit (293 identical, 53 patched to ledger, licenses, 27 unchanged tests, no card/test patches, be-chosen helper outside the closure); official rule-source bytes; auditor rules probe with 16 CR2.3-sourced Adventurous/ink-drop/Vanish/bag cases and zero-mutation checks on rejections; the unchanged RULE-03 compiled-adapter probe on the new kernel; manual-move characterization; built-bundle scan (no test bridge in any kernel/Lab/server/app bundle); boundary probe (264 refused imports across 11 owners); Chromium 6 web scenarios and 2 Lab workers. RUN-20261013-013 docs:check covers this record.
- **test:** Host isolated CI RUN-20261013-011 completed all 13 child stages with child exit 0 but the receipt failed clock_changed (265,558 ms wall vs 264,004 ms monotonic, 1,554 ms over the unchanged 1,000 ms guard); no result published; owned project/volume/network/image removed. Read-only RUN-20261013-012 sampled the clock for 60 s and saw the wall clock step forward 171.5 ms twice (343.7 ms/min), so the audit did not retry. CI timing qualification stays pending under the Director's leave-environment instruction; no clock, tolerance, service or environment change.
- **review:** Findings recorded for later work, neither blocking the representative acceptance: (1) defect - after a static lose-keyword effect removes Adventurous, the challenge check honors the loss but the end-of-turn check still refuses passTurn (RUN005), to be fixed with a sourced regression before any Adventurous card admission; (2) pre-existing since RULE-02 - upstream manual/debug moves such as manualSetLore are accepted with player authority through the kernel bridge and server adapter, letting a player set lore and win (RUN007); admission is closed, and PLAY-01 needs a server move allowlist before any real match; (3) move enumeration is name-level and still lists passTurn under Adventurous/Reckless/must-quest obligations, while submission refuses it.
- **fix:** Removed a leading empty ";" entry from the ticket_ids and evidence_links fields of R01.009, R01.011, R01.016, R28.002, R28.003, R28.004, R28.005, R28.007, R28.010, R28.011 and R28.012 (introduced when RULE-04 was appended to empty fields). No other field or disposition changed.
- **documentation:** Appended a dated audit section to docs/validation/rule-04.md and dated notes to ADR0011, the RULE-04 plan, the engine runbook (command-authority gap) and the rules-certification runbook (Adventurous static-loss defect). Updated AGENTS.md, README.md and docs/README.md current RULE-04 status, F-CI/F-ENGINE/F-RULE-CERTIFICATION descriptions/evidence, the FEATURES summary, the backlog evidence link and the handoff. The D11 selection is recorded by Codex; this auditor did not observe the original instruction.
- **revision:** Director-authorized integration: publish codex/rule-04-certification (808de78) and claude/rule-04-audit, then fast-forward main to the audit commit containing this record. Hosted CI for the integrated main commit is observed after the push and recorded in a later change.

### Verification

- **passed:** pnpm verify:foundation: 241 project checks (217 Node + 24 Python incl. 99 rules checks), 338 upstream passes/1 inherited skip, 2 injection tests. Local Dev Container. ([evidence](docs/validation/runs/RUN-20261013-001.json))
- **passed:** Importer --check against the pinned checkout: 346 payloads, licenses, 53 patch originals and the lock reproduced. ([evidence](docs/validation/runs/RUN-20261013-002.json))
- **passed:** Independent Python git cat-file byte audit of the 346-file closure and 53-patch ledger. ([evidence](docs/validation/runs/RUN-20261013-003.json))
- **passed:** Official CR2.2/CR2.3 PDF, text and numbered-leaf byte identities; template unexecuted, no admission. ([evidence](docs/validation/runs/RUN-20261013-004.json))
- **passed:** Auditor rules probe: 16 CR2.3-sourced Adventurous/ink-drop/Vanish/bag cases on the compiled pinned runtime; also characterizes the Adventurous static-loss defect. ([evidence](docs/validation/runs/RUN-20261013-005.json))
- **passed:** Unchanged RULE-03 compiled-adapter probe on the RULE-04 kernel with ambient entropy and clocks disabled. ([evidence](docs/validation/runs/RUN-20261013-006.json))
- **passed:** Characterization: manualSetLore from the non-active player is accepted through the server adapter and ends the game (pre-existing gap). ([evidence](docs/validation/runs/RUN-20261013-007.json))
- **passed:** Built-bundle scan: kernel invariants, reviewed mechanics present, no test-only bridge in kernel/Lab/server/app bundles. ([evidence](docs/validation/runs/RUN-20261013-008.json))
- **passed:** Boundary probe: 11 browser/public/server owners refuse 264 imports of RULE-04 test tooling. ([evidence](docs/validation/runs/RUN-20261013-009.json))
- **passed:** Actual headless Linux Chromium: 6 web foundation scenarios and 2 compiled Lab Web Workers. ([evidence](docs/validation/runs/RUN-20261013-010.json))
- **failed:** Host isolated 13-stage CI: every child stage completed, receipt failed clock_changed (1,554 ms); no artifact published; owned resources removed. ([evidence](docs/validation/runs/RUN-20261013-011.json))
- **passed:** Read-only 60-second clock sample: wall clock stepped forward 343.7 ms per minute; diagnostic only, not CI acceptance. ([evidence](docs/validation/runs/RUN-20261013-012.json))
- **passed:** pnpm docs:check over the audit documentation, records and generated views at fingerprint 5f405778. ([evidence](docs/validation/runs/RUN-20261013-013.json))

### Documentation and files

- **updated:** [docs/validation/rule-04.md](docs/validation/rule-04.md) — Appended a dated independent-audit section with actual run outcomes, acceptance mapping, the clock-rejected isolated CI and diagnostic, findings and the D11 observation limit; Codex text unchanged.
- **updated:** [docs/HANDOFF.md](docs/HANDOFF.md) — Header actors, authorized publication/integration, audit verification and findings, failed timing addition, pending gates and next actions; other Codex content unchanged.
- **updated:** [docs/adr/0011-sourced-rule-scenarios.md](docs/adr/0011-sourced-rule-scenarios.md) — Dated audit note: decision unchanged and matching the audited source; follow-ups and pending CI timing.
- **updated:** [docs/plans/2026-10-12-rule-04-certification.md](docs/plans/2026-10-12-rule-04-certification.md) — Dated audit/integration note appended; checklist and outcome preserved.
- **updated:** [docs/runbooks/engine.md](docs/runbooks/engine.md) — Known command-authority gap: manual/debug moves reach the engine with player authority; PLAY-01 allowlist requirement.
- **updated:** [docs/runbooks/rules-certification.md](docs/runbooks/rules-certification.md) — Known defect: end-of-turn Adventurous check ignores static keyword losses; fix before Adventurous card admission.
- **updated:** [AGENTS.md](AGENTS.md) — Current boundary statement: audited RULE-04 status, third clock rejection and the move-allowlist requirement for PLAY-01.
- **updated:** [README.md](README.md) — Short dated audit section pointing to findings; earlier continuation sections preserved.
- **updated:** [docs/README.md](docs/README.md) — Current RULE-04 entry point links the audit and its findings.
- **updated:** [docs/features.json](docs/features.json) — F-CI adds the clock-rejected RUN011 and RUN012 diagnostic (verification unchanged); F-ENGINE and F-RULE-CERTIFICATION add audit evidence and findings.
- **updated:** [docs/FEATURES.md](docs/FEATURES.md) — Summary line notes the audit, the third clock rejection and the follow-ups.
- **updated:** [docs/vision/initial_backlog.csv](docs/vision/initial_backlog.csv) — RULE-04 evidence links add this audit; status unchanged because isolated CI timing remains pending.
- **updated:** [docs/vision/requirements.csv](docs/vision/requirements.csv) — Removed leading empty list entries in 11 rows; dispositions and all other fields unchanged.
- **historical_preserved:** [docs/reviews/2026-10-12-rule-04-closure.md](docs/reviews/2026-10-12-rule-04-closure.md) — Codex review record of its own reviewer; the independent audit is recorded separately in validation.
- **reviewed_unchanged:** [docs/validation/rule-03.md](docs/validation/rule-03.md) — RULE-03 claims re-checked on the new kernel by RUN006/008; no change needed.
- **reviewed_unchanged:** [docs/runbooks/ci.md](docs/runbooks/ci.md) — CI operation unchanged; the clock-guard behavior it documents is what rejected RUN011.
- **reviewed_unchanged:** [docs/vision/decision_register.csv](docs/vision/decision_register.csv) — D11 recorded by Codex matches ADR0011 and the backlog; not observed by this auditor, noted in validation.

Full changed-file inventory: [record](docs/changes/CHG-20261013-001.json).

### Limits and next actions

- Isolated CI timing qualification remains pending: RUN011 was clock-rejected like RUN089/091 and the host clock is currently stepping forward; no environment change was made.
- The Adventurous static-loss end-of-turn defect and the manual/debug move authority gap are recorded, not fixed; no admitted card or real match is affected while all admission gates stay closed.
- D11 and the leave-environment instruction are recorded by Codex; this auditor did not observe the original instructions.
- No full rules/card certification, ordinary/reward/private/durable/device/production acceptance; hosted CI for the integrated main commit is observed only after publication.
- Observe hosted CI for the integrated main commit and record it in the next change.
- PLAY-01 should begin with a server-side player-move allowlist that refuses upstream manual/debug moves (Lab too).
- Fix the end-of-turn Adventurous check to honor static keyword losses, with a sourced regression, before any Adventurous card admission.
- Check timedatectl and a short clock sample before long isolated CI runs; never change clocks or thresholds without authorization.

## CHG-20261012-005 — RULE-04 final handoff observation timestamp

- Status: finalized
- Actor: Codex developer/reviewer
- Recorded (UTC): 2026-10-12T23:29:13.518Z
- Event: unknown; recorded retrospectively (recorded_only)
- Source: 82849f4fd0804cd474e8d7afcd5e935b6ac18700
- Tasks: RULE-04, DOC-01, DOC-02
- Features: F-DOCS
- Requirements: none

### Changes

- **fix:** Final chronology review found the handoff observation header retained23:17 while later proof093 was appended. Refresh the actual observation time after093 and identify this correction separately;003/004 and every run/log remain unchanged. No execution time is repaired.
- **test:** RUN094 passes actual native synchronization/chronology/source/changelog/history/log consistency. Observation is refreshed after094; only current prose and this finalization metadata change, executable5f405778 and sealed003/004 remain unchanged.

### Verification

- **passed:** Existing passing final-source native/static checks; this is only a handoff timestamp/record correction. ([evidence](docs/validation/runs/RUN-20261012-093.json))
- **passed:** Actual native final synchronization with exact UTC/monotonic pair and unchanged5f405778; no execution times repaired. ([evidence](docs/validation/runs/RUN-20261012-094.json))

### Documentation and files

- **updated:** [docs/HANDOFF.md](docs/HANDOFF.md) — The observation timestamp must occur after every completed proof it describes; retain distinct intake/precommit HEAD and actual run intervals.
- **updated:** [docs/validation/rule-04.md](docs/validation/rule-04.md) — Link actual final timestamp/static correction and passing094, retaining every code/CI/card/device limitation.

Full changed-file inventory: [record](docs/changes/CHG-20261012-005.json).

### Limits and next actions

- Executable5f405778 unchanged; isolated CI timing89/91 remains pending and original environment instruction stands.
- No full card/rules/ordinary/reward/private/durable/device/production or publishing/main acceptance.
- Director audit/publication may observe hosted CI; preserve timing failures and the unchanged environment.
- PLAY-01 follows; official/card/privacy/auth/replay/economy/device/production gates remain.

## CHG-20261012-004 — RULE-04 final documentation formatting and static closure

- Status: finalized
- Actor: Codex developer/reviewer
- Recorded (UTC): 2026-10-12T23:25:02.961Z
- Event: unknown; recorded retrospectively (recorded_only)
- Source: 82849f4fd0804cd474e8d7afcd5e935b6ac18700
- Tasks: RULE-04, DOC-01, DOC-02
- Features: F-DOCS, F-RULE-CERTIFICATION
- Requirements: none

### Changes

- **fix:** Final semantic/format review after CHG003 native seal found three retained checkpoint table rows separated from their table header. Move them into the same table without altering results, code or sealed receipts; new correction record honors the finalized snapshot guard.
- **documentation:** Point current handoff/validation at this final static closure while preserving CHG003. Executable fingerprint5f405778 and all scoped results/gates remain unchanged; no CI timing, device, publishing or main acceptance inferred.
- **test:** RUN093 passes final native documentation/source/callable/link/changelog/sealed-history/log consistency and staged formatting at unchanged executable5f405778. Final record synchronization and local commit retain the same code; no isolated CI/artifact, publishing or main acceptance inferred.

### Verification

- **passed:** Unchanged final executable5f405778 full foundation; this correction edits prose/history only. ([evidence](docs/validation/runs/RUN-20261012-085.json))
- **passed:** Actual final native documentation/history/log/source and staged formatting gates, static execution with exact timing and unchanged5f405778. ([evidence](docs/validation/runs/RUN-20261012-093.json))

### Documentation and files

- **updated:** [docs/validation/rule-04.md](docs/validation/rule-04.md) — Keep every retained checkpoint in its correctly rendered table; unchanged qualified source/results and failed CI timing gates.
- **updated:** [docs/HANDOFF.md](docs/HANDOFF.md) — Name the final correction/static record separately from sealed implementation history, without inventing a self-referential commit SHA.

Full changed-file inventory: [record](docs/changes/CHG-20261012-004.json).

### Limits and next actions

- Isolated CI089/091 clock-failed; original leave-environment instruction unchanged; no new artifact/hosted/device/production acceptance.
- Representative suite/template only; full card/rules/ordinary/reward/private/durable/economic gates remain.
- Director audit/publication may observe hosted CI; retain089/091 timing failures and leave the environment unchanged.
- Next documented implementation is PLAY-01; full card/rules/D04/privacy/auth/replay/economy/device/production gates remain.

## CHG-20261012-003 — RULE-04 sourced scenarios and card certification foundation

- Status: finalized
- Actor: Codex architect/developer/rules QA
- Recorded (UTC): 2026-10-12T23:17:57.050Z
- Event: unknown; recorded retrospectively (recorded_only)
- Source: 82849f4fd0804cd474e8d7afcd5e935b6ac18700
- Tasks: RULE-04, DOC-01, DOC-02
- Features: F-ENGINE, F-RULE-CERTIFICATION, F-BOUNDARIES, F-CI, F-RELEASE, F-DOCS
- Requirements: R01.005, R01.006, R01.009, R01.011, R01.016, R28.002, R28.003, R28.004, R28.005, R28.007, R28.010, R28.011, R28.012

### Changes

- **review:** Intake on clean main82849f4; discovered the existing workspace/postgres Compose services and began reading the required source, workflow and RULE-04 acceptance documents.
- **test:** RUN-20261012-046 captures passing pre-change doctor, verification, bootstrap and original database checks. An initial recorder invocation requested the already-used RUN045 ID; exclusive creation refused it before any child command or overwrite.
- **revision:** Director expressly selected implementing Adventurous and ink-drop counters now; D11/ADR0011 retain representative-only certification and all play gates.
- **implementation:** Add test-only compiled Node fixture runtime,91 sourced scenarios, independent state invariants, per-card schema/template fail-closed promotion, distinct offline/cache source checks and root verification integration.
- **fix:** Reproduce53 reviewed patches at unchanged pin; Vanish after-action bag/actual chooser/event/zone incarnation, temporary keyword loss, Adventurous challenge/quest obligation, separate consumable counters and chosen-slot/cardinality/nested payment choices. No upstream assertions changed; unreachable old be-chosen helper removed.
- **test:** Retain RUN048–079 missing-tool/fixture/source/oracle/engine/review red failures and corrected passes, including original composed zone patch anchor correction. RUN079 passes91 scenarios with invalid-state/grouping and certification negatives; full foundation/clean/hosted/device qualification not inferred.
- **review:** Independent source-hash/oracle review followed by supplied-code review after reviewer automatic approval usage limit. Actual chooser/lifetime/duplicate-slot/payment findings addressed with regressions. No denied action bypassed or final independent execution claimed.
- **documentation:** Add native plan/ADR/operation/validation/source/template classification, update current ownership continuations and D11/prerequisite edges, demote stale whole-source verification, preserve prior executed evidence and548 original requirements/20 optional flags.
- **fix:** Draft sync refused X06/X07 in the original-requirement-ID field; retain their authority through DOC-01/DOC-02 task scope instead, without changing native validation.
- **fix:** RUN080 full frozen/type/lint/build execution reached eight unchanged upstream feedback failures; planner now preserves INSUFFICIENT_INK needed/available semantics for normal shortfalls and distinguishes explicit invalid counter selections. RUN081 passes338 unchanged upstream/one inherited skip plus99 project rules checks. Source comment updated to separate payment units from ink-card count.
- **fix:** RUN082 full foundation passed upstream/build/type/lint but exposed a synthetic governance fixture copying the new unrelated card schema outside its declared file coverage. Fixture now copies only its five owned governance schemas; all original drift/history/assertions remain unchanged and RUN084 passes.
- **function:** Record callable contracts for withScenarioRuntime/createScenarioRuntime/assertScenarioState/chosenOperationGroups, checkScenarioSources/verifyScenarioSourceBytes and validateCardCertification; explicit test-only authority, errors, rollback, source pins, lifecycle and fail-closed promotion.
- **test:** Final5f405778 passes085 complete frozen241 project+338 unchanged upstream/one inherited skip+2 injection;086 source/cache/AST reproduction;087 six Chromium/two workers;088 source-only clean;090 canonical1466 live-equal files. No new scenarios skipped.
- **revision:** Two complete isolated child pipelines089/091 fail clock_changed despite child exit0; both owned environments cleaned, no result published. Honor persistent Director leave-environment instruction: no maintenance, clock/tolerance/service/restart change. Separate CI timing qualification remains pending; representative RULE-04 backlog criteria are locally verified.
- **documentation:** Correct086 summary scope to source/AST rather than a standalone bundle scan; actual build/bundle checks are085. Keep legacy pending_RULE-04 metadata as the explicit full-card/version certification gate, distinct from representative task acceptance; update final-source records without rewriting any receipt.
- **review:** Final092 passes eight read-only original managed identities, current/full-history secrets1662 unique blobs,376 immutable logs,548/33/20/all dispositions/D01–D10/archive/lock/toolchain/container and actual owned-service/listener cleanup. Attributed host observation confirms both failed CI projects/images absent and original healthy Linux bind/private volume retained; detailed host-query intervals unknown.

### Verification

- **passed:** RULE-04 intake: doctor, existing verification, bootstrap tests and original database connectivity; checkpoint source identity in receipt, not whole-product/card/device acceptance. ([evidence](docs/validation/runs/RUN-20261012-046.json))
- **passed:** RULE-04 official source refresh and merged RULE-03 hosted CI metadata acquisition; checkpoint source identity in receipt, not whole-product/card/device acceptance. ([evidence](docs/validation/runs/RUN-20261012-047.json))
- **failed:** RULE-04 red checkpoint: actual compiled Node scenario harness is absent; checkpoint source identity in receipt, not whole-product/card/device acceptance. ([evidence](docs/validation/runs/RUN-20261012-048.json))
- **failed:** RULE-04 first real synthetic quest through the Node compiled fixture runtime; checkpoint source identity in receipt, not whole-product/card/device acceptance. ([evidence](docs/validation/runs/RUN-20261012-049.json))
- **passed:** RULE-04 compiled quest regression after correcting the fixture command input to cardId; checkpoint source identity in receipt, not whole-product/card/device acceptance. ([evidence](docs/validation/runs/RUN-20261012-050.json))
- **failed:** RULE-04 initial 43 sourced current-rules scenarios through compiled Node runtime, preserving failures; checkpoint source identity in receipt, not whole-product/card/device acceptance. ([evidence](docs/validation/runs/RUN-20261012-051.json))
- **failed:** RULE-04 source-bound scenario fixtures after song subtype correction; Vanish timing regression retained; checkpoint source identity in receipt, not whole-product/card/device acceptance. ([evidence](docs/validation/runs/RUN-20261012-052.json))
- **failed:** RULE-04 red checkpoint: per-card coverage and false-admission gates are absent; checkpoint source identity in receipt, not whole-product/card/device acceptance. ([evidence](docs/validation/runs/RUN-20261012-053.json))
- **passed:** RULE-04 per-card template rejects unqualified promotion and false admission; checkpoint source identity in receipt, not whole-product/card/device acceptance. ([evidence](docs/validation/runs/RUN-20261012-054.json))
- **failed:** RULE-04 expanded Vanish red regressions: bag timing, action-only trigger, source leaves play and complete multi-effect action; checkpoint source identity in receipt, not whole-product/card/device acceptance. ([evidence](docs/validation/runs/RUN-20261012-055.json))
- **failed:** RULE-04 Vanish bag correction with actual chooser and play-zone resolution; sourced runtime regressions; checkpoint source identity in receipt, not whole-product/card/device acceptance. ([evidence](docs/validation/runs/RUN-20261012-056.json))
- **failed:** RULE-04 red checkpoint for Director-approved Adventurous and ink-drop generation/payments/invalid selections; checkpoint source identity in receipt, not whole-product/card/device acceptance. ([evidence](docs/validation/runs/RUN-20261012-057.json))
- **failed:** RULE-04 first Adventurous/counter implementation through 67 sourced Node scenarios and original rules regressions; checkpoint source identity in receipt, not whole-product/card/device acceptance. ([evidence](docs/validation/runs/RUN-20261012-058.json))
- **passed:** RULE-04 corrected Adventurous enumeration, keyword type guard and ability fixture; 67 sourced Node scenarios; checkpoint source identity in receipt, not whole-product/card/device acceptance. ([evidence](docs/validation/runs/RUN-20261012-059.json))
- **failed:** RULE-04 review regressions before Vanish object-lifetime and duplicate-event correction; checkpoint source identity in receipt, not whole-product/card/device acceptance. ([evidence](docs/validation/runs/RUN-20261012-060.json))
- **failed:** RULE-04 single chosen events, zone-incarnation guards, real setup and conservation scenarios; checkpoint source identity in receipt, not whole-product/card/device acceptance. ([evidence](docs/validation/runs/RUN-20261012-061.json))
- **failed:** RULE-04 corrected vendor closure and all representative regression scenarios; checkpoint source identity in receipt, not whole-product/card/device acceptance. ([evidence](docs/validation/runs/RUN-20261012-062.json))
- **passed:** RULE-04 corrected full-file zone patch anchor and representative source scenarios; checkpoint source identity in receipt, not whole-product/card/device acceptance. ([evidence](docs/validation/runs/RUN-20261012-063.json))
- **passed:** RULE-04 deferred and delegated Vanish choices plus invalid-state detection; checkpoint source identity in receipt, not whole-product/card/device acceptance. ([evidence](docs/validation/runs/RUN-20261012-064.json))
- **failed:** RULE-04 source/certification negatives and pre-correction fixture import guard; checkpoint source identity in receipt, not whole-product/card/device acceptance. ([evidence](docs/validation/runs/RUN-20261012-065.json))
- **passed:** RULE-04 integrated source-byte and card-template gates, fixture isolation and sourced runtime scenarios; checkpoint source identity in receipt, not whole-product/card/device acceptance. ([evidence](docs/validation/runs/RUN-20261012-066.json))
- **failed:** RULE-04 temporary grant/loss, counter-vs-ink counts and overflow atomicity; checkpoint source identity in receipt, not whole-product/card/device acceptance. ([evidence](docs/validation/runs/RUN-20261012-067.json))
- **failed:** RULE-04 case-sensitive temporary metadata correction and all 81 source scenarios; checkpoint source identity in receipt, not whole-product/card/device acceptance. ([evidence](docs/validation/runs/RUN-20261012-068.json))
- **passed:** RULE-04 temporary keyword loss correction and 81 sourced scenarios; checkpoint source identity in receipt, not whole-product/card/device acceptance. ([evidence](docs/validation/runs/RUN-20261012-069.json))
- **failed:** RULE-04 dynamic counter generation red test, nested costs and Ready-Set-Draw; checkpoint source identity in receipt, not whole-product/card/device acceptance. ([evidence](docs/validation/runs/RUN-20261012-070.json))
- **passed:** RULE-04 dynamic counter amount correction and 84 sourced scenarios; checkpoint source identity in receipt, not whole-product/card/device acceptance. ([evidence](docs/validation/runs/RUN-20261012-071.json))
- **failed:** RULE-04 multi-slot choice identity versus reused targets before correction; checkpoint source identity in receipt, not whole-product/card/device acceptance. ([evidence](docs/validation/runs/RUN-20261012-072.json))
- **failed:** RULE-04 selected nested counter payment regressions before forwarding correction; checkpoint source identity in receipt, not whole-product/card/device acceptance. ([evidence](docs/validation/runs/RUN-20261012-073.json))
- **failed:** RULE-04 independent choose-slot identity and per-nested-cost counter selection correction; checkpoint source identity in receipt, not whole-product/card/device acceptance. ([evidence](docs/validation/runs/RUN-20261012-074.json))
- **failed:** RULE-04 preserved named slots through initial validation and selected nested payments; checkpoint source identity in receipt, not whole-product/card/device acceptance. ([evidence](docs/validation/runs/RUN-20261012-075.json))
- **passed:** RULE-04 independent-slot cardinality correction and all 88 representative scenarios; checkpoint source identity in receipt, not whole-product/card/device acceptance. ([evidence](docs/validation/runs/RUN-20261012-076.json))
- **passed:** RULE-04 final choice uniqueness, all 89 scenarios, certification negatives and source bytes; checkpoint source identity in receipt, not whole-product/card/device acceptance. ([evidence](docs/validation/runs/RUN-20261012-077.json))
- **failed:** RULE-04 explicit invalid nested selection and skipped payment branch regressions before correction; checkpoint source identity in receipt, not whole-product/card/device acceptance. ([evidence](docs/validation/runs/RUN-20261012-078.json))
- **passed:** RULE-04 final reviewed grouping preconditions, invalid selection rollback and 91 sourced scenarios; checkpoint source identity in receipt, not whole-product/card/device acceptance. ([evidence](docs/validation/runs/RUN-20261012-079.json))
- **failed:** RULE-04 complete frozen foundation: doctor, ordered types/lint/build/tests and preserved original PostgreSQL; exact source/time in receipt; not card/device/production acceptance. ([evidence](docs/validation/runs/RUN-20261012-080.json))
- **passed:** RULE-04 corrected shortfall feedback: unchanged upstream suites and representative scenarios; exact source/time in receipt; not card/device/production acceptance. ([evidence](docs/validation/runs/RUN-20261012-081.json))
- **failed:** RULE-04 final frozen complete foundation, all source/type/lint/build/tests and original database; exact checkpoint source/time in receipt. ([evidence](docs/validation/runs/RUN-20261012-082.json))
- **passed:** RULE-04 exact pinned importer reproduction and official scenario source bytes; exact checkpoint source/time in receipt. ([evidence](docs/validation/runs/RUN-20261012-083.json))
- **passed:** RULE-04 governance fixture owns only its five declared schemas; original drift/sealing/evidence negatives unchanged; exact checkpoint source/time in receipt. ([evidence](docs/validation/runs/RUN-20261012-084.json))
- **passed:** RULE-04 final frozen full foundation after feedback and isolated governance fixture corrections; actual source/time/result in immutable receipt; source-only correction for086 and clock-failed CI89/91 are detailed in validation/rule-04.md. ([evidence](docs/validation/runs/RUN-20261012-085.json))
- **passed:** RULE-04 final source exact pin53-patch reproduction, source bytes and public/private bundle guards; actual source/time/result in immutable receipt; source-only correction for086 and clock-failed CI89/91 are detailed in validation/rule-04.md. ([evidence](docs/validation/runs/RUN-20261012-086.json))
- **passed:** RULE-04 actual Linux Chromium foundation and two compiled Lab workers; no Windows/device acceptance; actual source/time/result in immutable receipt; source-only correction for086 and clock-failed CI89/91 are detailed in validation/rule-04.md. ([evidence](docs/validation/runs/RUN-20261012-087.json))
- **passed:** RULE-04 clean source-only frozen installation and complete foundation; no private files or database copy; actual source/time/result in immutable receipt; source-only correction for086 and clock-failed CI89/91 are detailed in validation/rule-04.md. ([evidence](docs/validation/runs/RUN-20261012-088.json))
- **failed:** Actual isolated BOOT-03 pipeline: frozen foundation, live PostgreSQL, Linux browser, dependency/secret scans and artifacts; actual source/time/result in immutable receipt; source-only correction for086 and clock-failed CI89/91 are detailed in validation/rule-04.md. ([evidence](docs/validation/runs/RUN-20261012-089.json))
- **passed:** RULE-04 canonical staged Git bytes: fresh frozen install/full foundation, all archived files equal live source and temporary cleanup; actual source/time/result in immutable receipt; source-only correction for086 and clock-failed CI89/91 are detailed in validation/rule-04.md. ([evidence](docs/validation/runs/RUN-20261012-090.json))
- **failed:** Actual isolated BOOT-03 pipeline: frozen foundation, live PostgreSQL, Linux browser, dependency/secret scans and artifacts; actual source/time/result in immutable receipt; source-only correction for086 and clock-failed CI89/91 are detailed in validation/rule-04.md. ([evidence](docs/validation/runs/RUN-20261012-091.json))
- **historical:** Attributed early independent source review and later supplied-code review; detailed execution times unknown and no independent final suite execution inferred. ([evidence](docs/reviews/2026-10-12-rule-04-closure.md))
- **passed:** Read-only original managed identities and actual privacy/scope/history/log/listener closure at final5f405778; no data reset or full new CI/persistence acceptance. ([evidence](docs/validation/runs/RUN-20261012-092.json))
- **historical:** Attributed read-only host observation at recorded_at; detailed command intervals unknown, no manual-device verdict. ([evidence](docs/validation/rule-04-host-closure.json))

### Documentation and files

- **updated:** [AGENTS.md](AGENTS.md) — Compared and updated current representative RULE-04 code/ownership/acceptance, exact source/time/result and separate CI/card/play/device gates; historical evidence retained.
- **updated:** [README.md](README.md) — Compared and updated current representative RULE-04 code/ownership/acceptance, exact source/time/result and separate CI/card/play/device gates; historical evidence retained.
- **updated:** [docs/CHANGELOG_FORMAT.md](docs/CHANGELOG_FORMAT.md) — Compared and updated current representative RULE-04 code/ownership/acceptance, exact source/time/result and separate CI/card/play/device gates; historical evidence retained.
- **updated:** [docs/DEVELOPMENT_WORKFLOW.md](docs/DEVELOPMENT_WORKFLOW.md) — Compared and updated current representative RULE-04 code/ownership/acceptance, exact source/time/result and separate CI/card/play/device gates; historical evidence retained.
- **updated:** [docs/FEATURES.md](docs/FEATURES.md) — Compared and updated current representative RULE-04 code/ownership/acceptance, exact source/time/result and separate CI/card/play/device gates; historical evidence retained.
- **updated:** [docs/HANDOFF.md](docs/HANDOFF.md) — Compared and updated current representative RULE-04 code/ownership/acceptance, exact source/time/result and separate CI/card/play/device gates; historical evidence retained.
- **updated:** [docs/README.md](docs/README.md) — Compared and updated current representative RULE-04 code/ownership/acceptance, exact source/time/result and separate CI/card/play/device gates; historical evidence retained.
- **updated:** [docs/WORKSPACE_QUALIFICATION.md](docs/WORKSPACE_QUALIFICATION.md) — Compared and updated current representative RULE-04 code/ownership/acceptance, exact source/time/result and separate CI/card/play/device gates; historical evidence retained.
- **updated:** [docs/adr/0001-local-development-environment.md](docs/adr/0001-local-development-environment.md) — Compared and updated current representative RULE-04 code/ownership/acceptance, exact source/time/result and separate CI/card/play/device gates; historical evidence retained.
- **updated:** [docs/adr/0002-application-foundation.md](docs/adr/0002-application-foundation.md) — Compared and updated current representative RULE-04 code/ownership/acceptance, exact source/time/result and separate CI/card/play/device gates; historical evidence retained.
- **reviewed_unchanged:** [docs/adr/0003-documentation-evidence.md](docs/adr/0003-documentation-evidence.md) — Reviewed relevant contract against scoped RULE-04 changes: existing governance, environment, provider/asset or schema behavior unchanged; representative fixtures do not widen product authority or acceptance.
- **reviewed_unchanged:** [docs/adr/0004-restricted-local-database.md](docs/adr/0004-restricted-local-database.md) — Reviewed relevant contract against scoped RULE-04 changes: existing governance, environment, provider/asset or schema behavior unchanged; representative fixtures do not widen product authority or acceptance.
- **reviewed_unchanged:** [docs/adr/0005-ci-artifact-qualification.md](docs/adr/0005-ci-artifact-qualification.md) — Reviewed relevant contract against scoped RULE-04 changes: existing governance, environment, provider/asset or schema behavior unchanged; representative fixtures do not widen product authority or acceptance.
- **reviewed_unchanged:** [docs/adr/0006-protocol-release-contracts.md](docs/adr/0006-protocol-release-contracts.md) — Reviewed relevant contract against scoped RULE-04 changes: existing governance, environment, provider/asset or schema behavior unchanged; representative fixtures do not widen product authority or acceptance.
- **reviewed_unchanged:** [docs/adr/0007-hosting-provider-baseline.md](docs/adr/0007-hosting-provider-baseline.md) — Reviewed relevant contract against scoped RULE-04 changes: existing governance, environment, provider/asset or schema behavior unchanged; representative fixtures do not widen product authority or acceptance.
- **updated:** [docs/adr/0008-engine-placement-dependency-baseline.md](docs/adr/0008-engine-placement-dependency-baseline.md) — Compared and updated current representative RULE-04 code/ownership/acceptance, exact source/time/result and separate CI/card/play/device gates; historical evidence retained.
- **updated:** [docs/adr/0009-pinned-engine-qualification.md](docs/adr/0009-pinned-engine-qualification.md) — Compared and updated current representative RULE-04 code/ownership/acceptance, exact source/time/result and separate CI/card/play/device gates; historical evidence retained.
- **updated:** [docs/adr/0010-secure-randomness-replay.md](docs/adr/0010-secure-randomness-replay.md) — Compared and updated current representative RULE-04 code/ownership/acceptance, exact source/time/result and separate CI/card/play/device gates; historical evidence retained.
- **updated:** [docs/adr/0011-sourced-rule-scenarios.md](docs/adr/0011-sourced-rule-scenarios.md) — Compared and updated current representative RULE-04 code/ownership/acceptance, exact source/time/result and separate CI/card/play/device gates; historical evidence retained.
- **updated:** [docs/audits/2026-10-06-project-audit.md](docs/audits/2026-10-06-project-audit.md) — Compared and updated current representative RULE-04 code/ownership/acceptance, exact source/time/result and separate CI/card/play/device gates; historical evidence retained.
- **reviewed_unchanged:** [docs/contracts/protocol.md](docs/contracts/protocol.md) — Reviewed relevant contract against scoped RULE-04 changes: existing governance, environment, provider/asset or schema behavior unchanged; representative fixtures do not widen product authority or acceptance.
- **updated:** [docs/contracts/release.md](docs/contracts/release.md) — Compared and updated current representative RULE-04 code/ownership/acceptance, exact source/time/result and separate CI/card/play/device gates; historical evidence retained.
- **updated:** [docs/documentation-map.json](docs/documentation-map.json) — Compared and updated current representative RULE-04 code/ownership/acceptance, exact source/time/result and separate CI/card/play/device gates; historical evidence retained.
- **updated:** [docs/features.json](docs/features.json) — Compared and updated current representative RULE-04 code/ownership/acceptance, exact source/time/result and separate CI/card/play/device gates; historical evidence retained.
- **reviewed_unchanged:** [docs/plans/2026-10-06-boot-02-database.md](docs/plans/2026-10-06-boot-02-database.md) — Reviewed relevant contract against scoped RULE-04 changes: existing governance, environment, provider/asset or schema behavior unchanged; representative fixtures do not widen product authority or acceptance.
- **updated:** [docs/plans/2026-10-06-documentation-governance.md](docs/plans/2026-10-06-documentation-governance.md) — Compared and updated current representative RULE-04 code/ownership/acceptance, exact source/time/result and separate CI/card/play/device gates; historical evidence retained.
- **reviewed_unchanged:** [docs/plans/2026-10-07-boot-03-ci.md](docs/plans/2026-10-07-boot-03-ci.md) — Reviewed relevant contract against scoped RULE-04 changes: existing governance, environment, provider/asset or schema behavior unchanged; representative fixtures do not widen product authority or acceptance.
- **reviewed_unchanged:** [docs/plans/2026-10-07-boot-05-contracts.md](docs/plans/2026-10-07-boot-05-contracts.md) — Reviewed relevant contract against scoped RULE-04 changes: existing governance, environment, provider/asset or schema behavior unchanged; representative fixtures do not widen product authority or acceptance.
- **updated:** [docs/plans/2026-10-10-boot-04-decision-worksheet.md](docs/plans/2026-10-10-boot-04-decision-worksheet.md) — Compared and updated current representative RULE-04 code/ownership/acceptance, exact source/time/result and separate CI/card/play/device gates; historical evidence retained.
- **reviewed_unchanged:** [docs/policies/fan-content.md](docs/policies/fan-content.md) — Reviewed relevant contract against scoped RULE-04 changes: existing governance, environment, provider/asset or schema behavior unchanged; representative fixtures do not widen product authority or acceptance.
- **updated:** [docs/rules/README.md](docs/rules/README.md) — Compared and updated current representative RULE-04 code/ownership/acceptance, exact source/time/result and separate CI/card/play/device gates; historical evidence retained.
- **reviewed_unchanged:** [docs/rules/source-specs-supplement.json](docs/rules/source-specs-supplement.json) — Reviewed relevant contract against scoped RULE-04 changes: existing governance, environment, provider/asset or schema behavior unchanged; representative fixtures do not widen product authority or acceptance.
- **reviewed_unchanged:** [docs/rules/source-specs.json](docs/rules/source-specs.json) — Reviewed relevant contract against scoped RULE-04 changes: existing governance, environment, provider/asset or schema behavior unchanged; representative fixtures do not widen product authority or acceptance.
- **updated:** [docs/runbooks/ci.md](docs/runbooks/ci.md) — Compared and updated current representative RULE-04 code/ownership/acceptance, exact source/time/result and separate CI/card/play/device gates; historical evidence retained.
- **reviewed_unchanged:** [docs/runbooks/database.md](docs/runbooks/database.md) — Reviewed relevant contract against scoped RULE-04 changes: existing governance, environment, provider/asset or schema behavior unchanged; representative fixtures do not widen product authority or acceptance.
- **updated:** [docs/runbooks/engine.md](docs/runbooks/engine.md) — Compared and updated current representative RULE-04 code/ownership/acceptance, exact source/time/result and separate CI/card/play/device gates; historical evidence retained.
- **updated:** [docs/runbooks/rules-certification.md](docs/runbooks/rules-certification.md) — Compared and updated current representative RULE-04 code/ownership/acceptance, exact source/time/result and separate CI/card/play/device gates; historical evidence retained.
- **updated:** [docs/runbooks/workspace-setup.md](docs/runbooks/workspace-setup.md) — Compared and updated current representative RULE-04 code/ownership/acceptance, exact source/time/result and separate CI/card/play/device gates; historical evidence retained.
- **updated:** [docs/schemas/card-certification.schema.json](docs/schemas/card-certification.schema.json) — Compared and updated current representative RULE-04 code/ownership/acceptance, exact source/time/result and separate CI/card/play/device gates; historical evidence retained.
- **reviewed_unchanged:** [docs/schemas/change.schema.json](docs/schemas/change.schema.json) — Reviewed relevant contract against scoped RULE-04 changes: existing governance, environment, provider/asset or schema behavior unchanged; representative fixtures do not widen product authority or acceptance.
- **reviewed_unchanged:** [docs/schemas/documentation-map.schema.json](docs/schemas/documentation-map.schema.json) — Reviewed relevant contract against scoped RULE-04 changes: existing governance, environment, provider/asset or schema behavior unchanged; representative fixtures do not widen product authority or acceptance.
- **reviewed_unchanged:** [docs/schemas/features.schema.json](docs/schemas/features.schema.json) — Reviewed relevant contract against scoped RULE-04 changes: existing governance, environment, provider/asset or schema behavior unchanged; representative fixtures do not widen product authority or acceptance.
- **reviewed_unchanged:** [docs/schemas/run.schema.json](docs/schemas/run.schema.json) — Reviewed relevant contract against scoped RULE-04 changes: existing governance, environment, provider/asset or schema behavior unchanged; representative fixtures do not widen product authority or acceptance.
- **reviewed_unchanged:** [docs/schemas/state.schema.json](docs/schemas/state.schema.json) — Reviewed relevant contract against scoped RULE-04 changes: existing governance, environment, provider/asset or schema behavior unchanged; representative fixtures do not widen product authority or acceptance.
- **updated:** [docs/templates/card-certification.json](docs/templates/card-certification.json) — Compared and updated current representative RULE-04 code/ownership/acceptance, exact source/time/result and separate CI/card/play/device gates; historical evidence retained.
- **reviewed_unchanged:** [docs/templates/change.json](docs/templates/change.json) — Reviewed relevant contract against scoped RULE-04 changes: existing governance, environment, provider/asset or schema behavior unchanged; representative fixtures do not widen product authority or acceptance.
- **reviewed_unchanged:** [docs/templates/handoff.md](docs/templates/handoff.md) — Reviewed relevant contract against scoped RULE-04 changes: existing governance, environment, provider/asset or schema behavior unchanged; representative fixtures do not widen product authority or acceptance.
- **updated:** [docs/validation/boot-01.md](docs/validation/boot-01.md) — Compared and updated current representative RULE-04 code/ownership/acceptance, exact source/time/result and separate CI/card/play/device gates; historical evidence retained.
- **reviewed_unchanged:** [docs/validation/boot-02.md](docs/validation/boot-02.md) — Reviewed relevant contract against scoped RULE-04 changes: existing governance, environment, provider/asset or schema behavior unchanged; representative fixtures do not widen product authority or acceptance.
- **updated:** [docs/validation/boot-03.md](docs/validation/boot-03.md) — Compared and updated current representative RULE-04 code/ownership/acceptance, exact source/time/result and separate CI/card/play/device gates; historical evidence retained.
- **reviewed_unchanged:** [docs/validation/boot-04.md](docs/validation/boot-04.md) — Reviewed relevant contract against scoped RULE-04 changes: existing governance, environment, provider/asset or schema behavior unchanged; representative fixtures do not widen product authority or acceptance.
- **reviewed_unchanged:** [docs/validation/boot-05.md](docs/validation/boot-05.md) — Reviewed relevant contract against scoped RULE-04 changes: existing governance, environment, provider/asset or schema behavior unchanged; representative fixtures do not widen product authority or acceptance.
- **updated:** [docs/validation/rule-01.md](docs/validation/rule-01.md) — Compared and updated current representative RULE-04 code/ownership/acceptance, exact source/time/result and separate CI/card/play/device gates; historical evidence retained.
- **updated:** [docs/validation/rule-02.md](docs/validation/rule-02.md) — Compared and updated current representative RULE-04 code/ownership/acceptance, exact source/time/result and separate CI/card/play/device gates; historical evidence retained.
- **updated:** [docs/validation/rule-03.md](docs/validation/rule-03.md) — Compared and updated current representative RULE-04 code/ownership/acceptance, exact source/time/result and separate CI/card/play/device gates; historical evidence retained.
- **updated:** [docs/validation/rule-04.md](docs/validation/rule-04.md) — Compared and updated current representative RULE-04 code/ownership/acceptance, exact source/time/result and separate CI/card/play/device gates; historical evidence retained.
- **updated:** [docs/vision/README.md](docs/vision/README.md) — Compared and updated current representative RULE-04 code/ownership/acceptance, exact source/time/result and separate CI/card/play/device gates; historical evidence retained.
- **reviewed_unchanged:** [docs/vision/additional_scope.csv](docs/vision/additional_scope.csv) — Reviewed relevant contract against scoped RULE-04 changes: existing governance, environment, provider/asset or schema behavior unchanged; representative fixtures do not widen product authority or acceptance.
- **updated:** [docs/vision/decision_register.csv](docs/vision/decision_register.csv) — Compared and updated current representative RULE-04 code/ownership/acceptance, exact source/time/result and separate CI/card/play/device gates; historical evidence retained.
- **updated:** [docs/vision/initial_backlog.csv](docs/vision/initial_backlog.csv) — Compared and updated current representative RULE-04 code/ownership/acceptance, exact source/time/result and separate CI/card/play/device gates; historical evidence retained.
- **updated:** [docs/vision/requirements.csv](docs/vision/requirements.csv) — Compared and updated current representative RULE-04 code/ownership/acceptance, exact source/time/result and separate CI/card/play/device gates; historical evidence retained.
- **updated:** [packages/engine-adapter/README.md](packages/engine-adapter/README.md) — Compared and updated current representative RULE-04 code/ownership/acceptance, exact source/time/result and separate CI/card/play/device gates; historical evidence retained.
- **updated:** [packages/engine-lab/README.md](packages/engine-lab/README.md) — Compared and updated current representative RULE-04 code/ownership/acceptance, exact source/time/result and separate CI/card/play/device gates; historical evidence retained.
- **updated:** [vendor/tcg-engines/README.md](vendor/tcg-engines/README.md) — Compared and updated current representative RULE-04 code/ownership/acceptance, exact source/time/result and separate CI/card/play/device gates; historical evidence retained.

Full changed-file inventory: [record](docs/changes/CHG-20261012-003.json).

### Limits and next actions

- Representative scenario/template acceptance only; no full rules/card certification or ordinary/official/reward/private/durable/economic play.
- Isolated CI089/091 receipts fail clock_changed; no qualified new artifact/hosted RULE-04 result. Director leave-environment instruction honored; no maintenance/tolerance/restarts.
- Final review uses primary execution and supplied-source review after reviewer automatic approval usage limit; no independent final execution, Windows/GPU/touch/load/restore/production acceptance.
- No purchases, deployment, branch publication or main merge. All548 requirements/20 optional flags and BOOT-04/D07/D10 scope preserved.
- Director audit/publication may observe fresh hosted CI; preserve089/091 timing failures and existing environment.
- PLAY-01 durable receipt/CAS/outbox foundation follows; PLAY-02 privacy, D04 card-bound certification and AUTH/REPLAY/economic/device/production gates remain.

## CHG-20261012-002 — Independent audit of RULE-03 and Director-authorized integration into main

- Status: finalized
- Actor: Claude Code agent (architect/QA reviewer role) on Director request, local WSL session
- Recorded (UTC): 2026-10-12T16:15:30.486Z
- Event: unknown; recorded retrospectively (recorded_only)
- Source: 7d7ca20fa2874e3ae4566b325e96f8824291bcd7
- Tasks: RULE-03, DOC-01, DOC-02
- Features: F-DOCS, F-CI, F-DB, F-ENGINE
- Requirements: none

### Changes

- **review:** Audited Codex commit 7d7ca20 (RULE-03, CHG-20261012-001) against the backlog acceptance (no competitive Math.random fallback; replay equality and random-stream access tests), ADR0010, ADR0008/0009 and D10. Code review covered packages/engine-adapter/src (random, replay, validation, code-identity, admission, index), the kernel bridge, build guard and Bun-only compatibility preload, all 28 vendor patches (P001/P002 retained, P003-P028 new), the AST randomness guard, boundary/loader changes, release two-root identity and the seedrandom move to browser Lab. Every gameplay shuffle/draw in the runtime goes through the injected per-match source; legacy helpers fail closed outside Bun; rejected/rolled-back attempts reuse committed indices. Requirement edits only add prerequisite evidence; all 548 dispositions, D03 and scope counts are unchanged.
- **test:** Independent runs RUN-20261012-036..044 all passed at executable fingerprint 2e6c4734... with exact timing: verify:foundation (141 project checks, 338 upstream passes/1 inherited skip, 2 injection tests); importer reproduction from the pinned checkout; separate git cat-file byte audit (319 identical, 28 patched to ledger, licenses, 27 unchanged tests, no extra/missing files); independent Python HMAC re-derivation of 3765 compiled server outcomes including 220 rejection retries; compiled-adapter probe with ambient Math.random/Date/randomUUID/getRandomValues disabled (40 secret-seeded matches, seed privacy, refused caller entropy, fixed-seed determinism, journaled rejections, 10 recomputed-digest tamper rejections, interleaved matches, closed admission, blocked internal exports); built-bundle scan; two Chromium workers; host isolated 13-stage CI with owned cleanup; artifact re-verification. RUN-20261012-045 docs:check covers this record.
- **revision:** RUN-20261012-043 passed the unchanged isolated CI timestamp guard at the final RULE-03 fingerprint, so the timing qualification left pending after RUN028/029 is satisfied without any clock, tolerance or environment change. F-CI returns from pending and F-DB from historical_verified to verified with RUN043 evidence; the RULE-03 backlog status drops its timing-pending suffix. Hosted RULE-02 main f61aad8 run 38183090003 (success) is recorded as an auditor GitHub API observation.
- **documentation:** Append an independent-audit section to docs/validation/rule-03.md (results, acceptance mapping, non-blocking observations, hosted RULE-02 observation); add dated audit notes to ADR0010 and the RULE-03 plan; update docs/features.json, docs/FEATURES.md, docs/vision/initial_backlog.csv and the handoff. Codex's executed text is preserved.
- **revision:** The Director authorized publishing and merging RULE-03 through the normal process once the audit confirmed it. Publish codex/rule-03-secure-rng and claude/rule-03-audit; fast-forward main to the commit containing this record. No history rewrite.

### Verification

- **passed:** pnpm verify:foundation: verify incl. randomness guard, typecheck, lint, build, 141 project checks, 338 upstream passes/1 inherited skip and 2 injection tests. Local Dev Container. ([evidence](docs/validation/runs/RUN-20261012-036.json))
- **passed:** Importer --check against the pinned inert checkout reproduced all payloads, licenses, 28 patch originals and the lock. Local Dev Container. ([evidence](docs/validation/runs/RUN-20261012-037.json))
- **passed:** Separate Python git cat-file byte audit of the vendor tree and 28-patch ledger. Local Dev Container. ([evidence](docs/validation/runs/RUN-20261012-038.json))
- **passed:** Independent Python HMAC-SHA256 re-derivation of 3765 compiled server stream outcomes. Local Dev Container; not a DRBG/statistical certification. ([evidence](docs/validation/runs/RUN-20261012-039.json))
- **passed:** Compiled-adapter RNG/replay/access probe with ambient entropy and clocks disabled. Local Dev Container; synthetic content only. ([evidence](docs/validation/runs/RUN-20261012-040.json))
- **passed:** Built-bundle scan of kernel, Lab, server adapter and app dist trees. Static evidence over local build output. ([evidence](docs/validation/runs/RUN-20261012-041.json))
- **passed:** Two compiled synthetic Lab workers in actual headless Linux Chromium. No Windows/GPU/device claim. ([evidence](docs/validation/runs/RUN-20261012-042.json))
- **passed:** Host isolated 13-stage CI: fresh image, database, Chromium, scans, v3 artifact, owned cleanup, exact timing. Local Docker on WSL. ([evidence](docs/validation/runs/RUN-20261012-043.json))
- **passed:** Re-verification of the RUN043 v3 artifact. Local Dev Container. ([evidence](docs/validation/runs/RUN-20261012-044.json))
- **passed:** pnpm docs:check for this audit record (static). ([evidence](docs/validation/runs/RUN-20261012-045.json))

### Documentation and files

- **updated:** [docs/validation/rule-03.md](docs/validation/rule-03.md) — Appended a dated independent-audit section with actual run outcomes, acceptance mapping, CI timing resolution, hosted RULE-02 observation and non-blocking observations; Codex text unchanged.
- **updated:** [docs/HANDOFF.md](docs/HANDOFF.md) — Header actors, authorized publication/integration, audit verification, pending gates and next actions; other Codex content unchanged.
- **updated:** [docs/features.json](docs/features.json) — F-CI pending->verified and F-DB historical_verified->verified with RUN-20261012-043 (and RUN044 for F-CI) evidence at the current fingerprint; descriptions record the RUN028/029 history and hosted RULE-02 observation.
- **updated:** [docs/FEATURES.md](docs/FEATURES.md) — F-CI acceptance limit now states RUN043 timing-qualified CI and RUN044 artifact proof instead of pending timing; other rows unchanged.
- **updated:** [docs/vision/initial_backlog.csv](docs/vision/initial_backlog.csv) — RULE-03 status drops the isolated-CI-timing-pending suffix after RUN043 and links this audit record; acceptance text unchanged.
- **updated:** [docs/adr/0010-secure-randomness-replay.md](docs/adr/0010-secure-randomness-replay.md) — Added a dated audit note: decision unchanged and matches source; pending CI timing qualification satisfied by RUN043. Earlier status text retained as recorded.
- **updated:** [docs/plans/2026-10-12-rule-03-randomness-replay.md](docs/plans/2026-10-12-rule-03-randomness-replay.md) — Planning document: appended an audit outcome line for the deferred CI timing task; checklist preserved as written.
- **historical_preserved:** [docs/reviews/2026-10-12-rule-03-closure.md](docs/reviews/2026-10-12-rule-03-closure.md) — Codex's attributed closure review is evidence of its own assessment at that time; its 'CI timing pending' statement is superseded by the appended validation audit, not rewritten.
- **reviewed_unchanged:** [docs/runbooks/engine.md](docs/runbooks/engine.md) — Signatures, bounds (128 retries, 4096 outcomes per drain, 2048/2MiB journal), closed options, D10 limits and Lab ownership match the code and RUN040.
- **reviewed_unchanged:** [docs/runbooks/ci.md](docs/runbooks/ci.md) — Operation and artifact verification commands match RUN043/044; no RULE-03 timing claim requires change.
- **reviewed_unchanged:** [docs/validation/boot-03.md](docs/validation/boot-03.md) — RULE-03 supersession paragraph is accurate; older dated results are historical.
- **reviewed_unchanged:** [docs/contracts/release.md](docs/contracts/release.md) — Two-root engine identity matches scripts/release-manifest.mjs and the RUN044 artifact verification.
- **reviewed_unchanged:** [docs/adr/0009-pinned-engine-qualification.md](docs/adr/0009-pinned-engine-qualification.md) — Kernel ownership refinement is recorded in ADR0010; ADR0009 history retained.
- **reviewed_unchanged:** [docs/adr/0008-engine-placement-dependency-baseline.md](docs/adr/0008-engine-placement-dependency-baseline.md) — Node crypto server RNG and browser-only seedrandom match the placement baseline.
- **reviewed_unchanged:** [docs/validation/rule-02.md](docs/validation/rule-02.md) — RULE-03 inputs listed in the RULE-02 audit are all addressed by the audited patches.
- **reviewed_unchanged:** [packages/engine-adapter/README.md](packages/engine-adapter/README.md) — Server API description matches index.ts exports and RUN040.
- **reviewed_unchanged:** [packages/engine-lab/README.md](packages/engine-lab/README.md) — Lab-owned noncompetitive seedrandom and refused private RPC match source and RUN042.
- **reviewed_unchanged:** [vendor/tcg-engines/README.md](vendor/tcg-engines/README.md) — 347 files/28 patches/27 unchanged tests and provenance match RUN037/038.
- **reviewed_unchanged:** [docs/vision/requirements.csv](docs/vision/requirements.csv) — Only prerequisite references were added by Codex; 548 rows and all dispositions unchanged.
- **reviewed_unchanged:** [docs/vision/decision_register.csv](docs/vision/decision_register.csv) — D10 added; D03 unquoting is value-identical (parsed comparison).
- **reviewed_unchanged:** [AGENTS.md](AGENTS.md) — RULE-03 boundary and gate statements match the audited source.
- **reviewed_unchanged:** [README.md](README.md) — RULE-02/03 summaries and continuation paragraph match the audited source.
- **reviewed_unchanged:** [docs/README.md](docs/README.md) — RULE-03 index entry accurate.
- **reviewed_unchanged:** [docs/WORKSPACE_QUALIFICATION.md](docs/WORKSPACE_QUALIFICATION.md) — RULE-03 supersession paragraph accurate; timing statements refer to older dated runs.

Full changed-file inventory: [record](docs/changes/CHG-20261012-002.json).

### Limits and next actions

- Local Dev Container and local Docker evidence only; the hosted foundation run for the integrated main commit must be observed separately. The hosted RULE-02 result is an auditor GitHub API observation without artifact download.
- The audit does not certify official rules/cards, NIST DRBG/FIPS or statistical randomness, viewer/wire privacy, durable restore, Windows/GPU/touch, ARM64 or production; those gates remain with RULE-04, PLAY-01/02, AUTH/REPLAY and later tasks.
- D10 and the Director's earlier leave-environment instruction are recorded by Codex; they match the backlog and ADR0010 but the original instructions were not observed by this auditor.
- RUN043 shows the WSL clock was stable for that run; the host clock can still step, so long runs remain subject to the unchanged guard.
- Observe the hosted foundation run for the integrated main commit.
- RULE-04: sourced current-rules scenario suite and per-card certification template (CR2.3 effective 2026-10-16; set 14 prerelease 2026-10-16/general 2026-10-23).
- Before future vendoring changes, consider the non-blocking audit observations listed in docs/validation/rule-03.md.

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
