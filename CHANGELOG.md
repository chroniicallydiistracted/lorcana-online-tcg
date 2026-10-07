# Changelog

Generated from versioned records in docs/changes. Use docs/CHANGELOG_FORMAT.md; edit records, then run pnpm docs:sync. UTC is canonical; project display timezone is America/Phoenix. Historical imports do not invent test times.

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
