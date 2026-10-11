# Workspace qualification record

Director handoff: 2026-10-05, America/Phoenix. Agent validation: 2026-10-06 UTC (2026-10-05 local). See [BOOT-01 evidence](validation/boot-01.md) for command results and clean-source identity.

## Historical evidence supplied by the Director

| Observation | Director evidence |
|---|---|
| Host | Windows 11; WSL 2.7.14.0 / Ubuntu WSL2; Git 2.43.0; Docker Desktop 4.93.0 / Engine 29.8.1; Compose 5.5.1 |
| Source and Git | Linux source path; main `335da7e` successfully published; 61 tracked files, clean tree and no tracked `.env.local` |
| Initial Dev Container | Digest-pinned image built and services started; non-root setup pipeline ended “Dev Container setup passed.” |
| Bootstrap checks | Pinned toolchain/env, frozen install, configuration/syntax, one HTTP plus four credential tests, authenticated PostgreSQL 18 connection passed |
| Windows connectivity | Forwarded 5173 displayed the original plain connectivity message; infrastructure access only |

These are historical Director observations, not agent-executed tests. Original archive preparation evidence remains in `VALIDATION_RESULTS.json` under its [provenance scope](ARCHIVE_PROVENANCE.md).

## Foundation-session agent observations and checks (2026-10-06 UTC / 2026-10-05 Phoenix)

| Check | Result and scope |
|---|---|
| Repository before editing | Clean main at `335da7edffea40294b8dcf60ae256524432c350b`; correct origin; scoped branch `codex/boot-01-foundation` |
| Existing services | Discovered actual workspace/postgres and Compose project `lorcana-online-tcg_devcontainer`; bind source and database volume preserved |
| Execution | Application checks through Docker exec inside existing committed Dev Container, not host Node |
| Toolchain/environment | Explicit `pnpm run doctor` passed seven project checks; Node 24.21.0, pnpm 10.33.0, Linux; credential values never printed |
| UID/GID | Actual container `node` user UID 1000 / GID 1000 |
| Database | Actual authenticated read-only version query: PostgreSQL 18.6 (Debian 18.6-1.pgdg13+2); `pnpm db:check` passed |
| Original baseline | Preserved verify, bootstrap HTTP/credential tests and DB check passed before implementation |
| Application checks | Ordered actual builds, strict type checks, lint, schema/service/renderer checks, negative ownership checks and compiled-process lifecycle checks; clean snapshot passed the complete suite (19 bootstrap/package/process tests plus four Linux browser tests); detailed final runs in BOOT-01 evidence |
| Image changes | Updated Dockerfile actually built successfully as a disposable local proof image; existing services were not recreated |
| Running test environment | Same committed Chromium-library/ripgrep additions applied to existing workspace; pinned Playwright Chromium downloaded as node. New image build independently verifies persisted installation instructions |
| Browser automation | Linux Chromium with SwiftShader; live web/services and lifecycle controls. NullEngine unit tests are separately simulated |
| Actual Windows client | Director observation requested for the real foundation; pending response. Connected browser reports Linux and refused forwarded localhost; Windows computer-use initialization fails on the tool's Linux workspace URI |

Bare `pnpm doctor` is the package manager's built-in command; its zero exit does not establish the project's checks. Fresh project evidence uses `pnpm run doctor`; post-create invokes the doctor file directly.

## Remaining qualification

BOOT-02 restricted roles, migrations, isolated test database and disposable recreation are verified locally in [BOOT-02 evidence](validation/boot-02.md). Backup/restore remains future qualification beyond its scoped acceptance. BOOT-03 local CI/artifact/security/license acceptance is verified in [its evidence](validation/boot-03.md). BOOT-05 public protocol/release contracts now have final-source local evidence in [their validation](validation/boot-05.md); authenticated gameplay/versioned deployment remain pending. No gameplay, upstream engine/current-rules, hidden-state engine projection, auth, real touch device, sustained GPU/load/accessibility or production tests were performed. BOOT-02 separately tests synthetic migrations/role restrictions. The foundation's local import boundary and semantic keyboard proofs do not complete those product requirements.

The OS apt layer remains repository-resolved, not an immutable qualified production image. New forwarding entries 3001/3002 are configuration evidence until the editor applies them; the web proxies require only the existing 5173 forward.

## Documentation-audit session, 2026-10-06 Phoenix

Intake was clean on `codex/boot-01-foundation` at reachable `8c94b274ebd6ad91223cdb6df085ca0597c107c9`; audit work uses `codex/documentation-governance`. The actual existing Compose project was discovered again; workspace and healthy postgres were reachable. The source bind mount, private environment and database volume were preserved. No foundation listener was active on5173/3001/3002 at intake.

Before editing, project doctor, preserved verify, all five bootstrap tests and authenticated database check passed inside the existing Dev Container. [The dated audit](audits/2026-10-06-project-audit.md) and durable run records distinguish final fresh validation from imported prior-session logs. The previous clean proof is tied to reachable source through [a retained equivalence manifest](validation/boot-01-source-manifest.json).

The Director reported Windows foundation verification was not performed; it remains pending. No actual Windows, phone/tablet, hardware-GPU, persistence recreation or production verification is added by this documentation work. New scope X06/X07 is governed by [the universal workflow](DEVELOPMENT_WORKFLOW.md).

Clock-qualified pre-supervisor checkpoint: RUN-024 passed source-only frozen installation, builds/types/lint and 41 tests; RUN-025 passed doctor, RUN-026 read-only DB and RUN-027 four Linux browser checks. These are preserved pre-correction receipts, superseded by the final results below. All share the final executable-source fingerprint and consistent monotonic capture. RUN-029 additionally passed frozen installation and all 41 tests from canonical Git checkout bytes, confirming the documentation snapshot survives Git LF normalization. Local documentation gates and independent review support DOC-01/DOC-02; Windows and previously pending product/device/persistence/production gates remain pending.

Clock qualification: original RUN-017 showed a reversed UTC interval and remains byte-for-byte in [the evidence archive](validation/archive/RUN-20261006-017-original.json), with historical quarantine RUN-018 and its log. Cause unconfirmed. Monotonic duration/discontinuity guards now reject passing timing proof on inconsistent clock samples. RUN-012…015 are successful pre-correction checkpoints; current receipts are RUN-024…027 in CHG-004. No Windows observation was performed.

Final supervisor-corrected acceptance: RUN-040 passed frozen source-only installation, builds/types/lint and 43 tests (21 foundation, 22 governance); RUN-041 passed doctor; RUN-042 passed read-only DB; RUN-043 passed four Linux browser checks. RUN-044 confirms actual foundation listener cleanup. All match the corrected executable fingerprint. DOC-01/DOC-02 are implemented_verified; Windows and all previously pending product/device/persistence/production gates remain pending. Earlier RUN-024…029 are successful pre-correction checkpoints, not current-source acceptance.

RUN-033 exposed an owned Vite orphan after the canonical checkout suite exited0. Failed baseline RUN-036 reproduced the original algorithm leaving an executable descendant. The supervisor now retains group ownership through leader exit, shares cleanup promises, verifies live descendants with monotonic bounds and escalates if needed. Both actual descendant cases and an independently reviewed port-free synthetic integration passed. The identity-checked orphan alone was stopped; no unrelated process/data was changed.

Final canonical Git-checkout proof: RUN-045 passed frozen install, builds/types/lint and all 43 tests with the same corrected executable fingerprint as RUN-040…044. Staged source/document formatting passed (RUN-046), and original scope/archive/private-file/known-secret preservation passed (RUN-047). Actual post-canonical listener cleanup and finalized documentation are checked at closure in CHG-005. Windows remains pending.

BOOT-02 closure: final source RUN070 passed frozen clean install/build/type/lint and59 tests, RUN071 passed actual isolated recreation/concurrent pending migration/role/log/cleanup proof, and independent review closed. Post-Director-reported WSL/VS Code recovery, RUN20261007-001 passed live private DB/build checks and002 passed four Linux browser checks. Cause of the crash is unconfirmed; interrupted receipts are explicitly inconclusive and archived. Actual managed journals/roles survived the observed container restart. Existing-volume recreation and backups remain unqualified.

Closure also passed canonical staged Git checkout (RUN20261007-003, same final executable fingerprint,59 tests) and actual fixed-port cleanup/private-file/original scope preservation (004). Final source fingerprint and exact record categories are in BOOT-02 validation; no missing result from the crash is inferred.

BOOT-03 final-source RUN20261007-028 passed the isolated Dockerfile-built pipeline: frozen installation, builds/types/lint/import/docs/history and79 foundation/mixed regressions, eight managed identities, five actual DB checks, four Linux Chromium checks and real dependency/secret/license/artifact gates. RUN029 verified the complete source/image/lock manifest and200 installed components/ten published notice gaps/zero advisories. The deliberately faulty-copy RUN027 failed closed, cleaned its owned resources/image and published nothing. RUN026 clock-discontinuous child-exit0 remains failed; RUN028 supplies consistent timing. Hosted Actions, required checks, actual Windows and OS/distribution/production qualifications remain pending. Canonical Git bytes and final cleanup/preservation/documentation closure are linked by the active change.

BOOT-03 closure: RUN20261007-030 passed disposable PostgreSQL recreation/concurrent migrations and five actual role/transaction checks; RUN031 passed canonical staged Git frozen installation and all79 foundation checks with identical final executable bytes. RUN032 records an erroneous probe volume-name expectation, with no data changes; corrected RUN033 confirms actual absence of all owned disposable containers/volumes/networks/image tags and listeners5173/3001/3002. Original source bind, private healthy PostgreSQL/`pg18_data`, owner-only ignored credentials, all548 requirements/20 optional flags, decisions/research/certification/archive, frozen lockfile and Dev Container bytes remain preserved. Current/staged source/logs contain no known private values. Finalized documentation checks and closure are linked from CHG-20261007-001; BOOT-05 remains next, and no hosted/Windows/production gate is accepted.

## BOOT-05 checkpoint — 2026-10-07 UTC

Actual existing-container intake RUN035…038 passed doctor, verify, bootstrap5 and authenticated read-only bootstrap connectivity. Intentional red RUN039…041 preserve missing contract/artifact/browser failures; RUN042 passed19 targeted contracts/runtime/CI tests and strict owning builds, and RUN043 passed6 actual Linux Chromium/SwiftShader browser checks. Full-source/canonical/isolated proof and independent review remain pending at this checkpoint; [BOOT-05 validation](validation/boot-05.md) owns current closure. Windows foundation, hardware devices/GPU and hosted/production remain unverified.

BOOT-05 final-source local checks: RUN051 passed frozen foundation94, eight identities/five live DB and6 Linux Chromium/SwiftShader checks; RUN052 verified98 artifact payload entries, app/transitive runtime/package/DB migrator/SQL identity; RUN053 requalified actual disposable recreation. Executable fingerprint `8e52e134ba2e4af4195e28c71a93abfe27910fa9b5012ee0550476887e819584` matches all three. Canonical/closure proof is finalized in the owning BOOT-05 validation/change record. Windows/hardware/hosted/production acceptance remains pending.

BOOT-05 closure: RUN054 canonical staged Git frozen foundation94 and RUN055 actual owned resource/listener/private/original-scope checks passed against the same final executable fingerprint. BOOT-05 backlog acceptance is implemented_verified; final documentation/format/history/secret proof is RUN056. Earlier pending/checkpoint observations above retain their original dated scope; current contract acceptance is in [BOOT-05 validation](validation/boot-05.md). Windows, hardware, hosted and production remain pending.

Publication continuation: RUN057 fresh baseline/foundation94/full-history known-secret and RUN058 merged-main foundation94 passed with the unchanged final executable fingerprint. RUN059 verifies all five remote branch tips are ancestors of published main, actual Git event timestamps, owner-only private files/original healthy database/volume and no owned listeners. The first actual hosted attempt was observed in progress (source612a8c9); completed hosted qualification/required checks/cancellation remain pending, with exact snapshot in current HANDOFF/CHG-20261007-003. No visibility/data/config/credential changes. BOOT-04 remains pending.

## Completed hosted publication checkpoint

Hosted run37581249875 passed for commit612a8c9; RUN061 verifies the downloaded98-payload artifact/source/image/lock/release against executable fingerprint8e52e134ba2e4af4195e28c71a93abfe27910fa9b5012ee0550476887e819584. All12 stages, foundation94, eight identities/five live DB checks,6 Linux software-WebGL browser checks and owned cleanup passed.200 npm components, ten published notice gaps and zero reported registry advisories remain explicit. API/job/stage times are reported remote execution; RUN061 timestamps capture local artifact verification. Required checks/branch protection/cancellation, OS/legal/device/production acceptance are separate. [Successful hosted run](https://github.com/chroniicallydiistracted/lorcana-online-tcg/actions/runs/37581249875). Earlier progress/pending statements are recorded checkpoints superseded by this actual source-specific result. New main documentation commits retain the same executable fingerprint but receive their own future workflow observations; do not infer their status from this prior pass. Current handoff/CHG-20261007-003 record publication and containing final commit. BOOT-04 and real Windows observation remain pending.

## BOOT-04 research checkpoint — 2026-10-07 UTC

Existing-container RUN063 passed fresh doctor/static/docs/bootstrap5/read-only bootstrap database checks at source5819142. RUN064 passed static coverage of all33 groups/548 unchanged IDs/20 optional flags, six cost fixtures, 34 retrieved official-source digests and selected AWS/Sentry price assertions. These are research/consistency results, not provider capacity, recovery or deployment evidence. One obsolete source URL404 is preserved in the source register. [BOOT-04 research](plans/2026-10-07-boot-04-provider-research.md) records Director NA/up to50 concurrent-player inputs and open ceiling/recovery/domain/provider decisions; task acceptance remains pending. No source/dependency/credential/database change or external provision. Final documentation/history/preservation checks belong to CHG-20261007-005. Earlier dated checkpoints retain their original scope.

## BOOT-04 single-host reassessment — 2026-10-08 UTC

RUN-20261008-001 passed fresh existing-container doctor/static/docs/bootstrap5/read-only DB checks without changing executable bytes. [The current proposal](plans/2026-10-08-single-host-reassessment.md) prefers one host, local PostgreSQL, bounded processes and off-host backups; proposed ADR0007 and fresh rates replace the prior default footprint. Separate Linux Chrome149 public/guest Duels inspection reached one bot turn and restored visible turn3 state after reload, then ended the game. Signed-in Codex/Windows access failed; browser research is neither our product/device acceptance nor backend/load certification. BOOT-04 remains in progress; provider/budget/recovery/operator/domain decisions and actual implementation/qualification pending. CHG-20261008-001 owns subsequent documentation/source/cost checks. Earlier dated evidence remains unchanged.

## BOOT-04 decision and reconciliation — 2026-10-10 UTC

The two sections above are preserved Codex research checkpoints (CHG-20261007-005, CHG-20261008-001/002). Their single-host proposal and proposed ADR file `0007-single-host-beta-proposal.md` are superseded by the finalized [BOOT-04 decision worksheet](plans/2026-10-10-boot-04-decision-worksheet.md), [ADR0007](adr/0007-hosting-provider-baseline.md) and [ADR0008](adr/0008-engine-placement-dependency-baseline.md) (CHG-20261010-001/002). [CHG-20261010-003](changes/CHG-20261010-003.json) restores that uncommitted research as evidence and adopts its Director inputs (primarily North America; up to 50 concurrent invited-beta players) and its remote-runtime prerequisite. Local Dev Container intake RUN-20261010-004 (doctor) and RUN-20261010-005 (read-only database) passed; no executable, dependency, private data or provisioning change. See [BOOT-04 validation](validation/boot-04.md).

## Signed-off BOOT-04 review — 2026-10-10 UTC

The [review](reviews/2026-10-10-boot-04-final-decisions.md) at intake efe166d preserves the Director's accepted OVHcloud/$25/Cloudflare baseline, ADR0008 and D07. RUN014 child checks exited0 but the recorder failed for clock_changed; RUN015 repeats doctor/static-docs/bootstrap5/read-only DB and passes with consistent timing. No source/dependency/private-data/hosting change or device/engine/restore certification. Subsequent register/preservation/documentation outcomes belong to CHG-20261010-007. RULE-01 remains pending and can begin without buying hosting. Earlier dated qualification statements retain their historical scope.

Review preservation: RUN018 completed the corrected assertions/docs/history scan with child exit0 but remains failed for clock_changed. RUN019 independently passed original548 scope/current-intake bytes, installed-package claims, task statuses, ignored owner-only private files, unchanged executable/configuration/dependencies and actual no-app-listener checks with consistent timing. Logs/failures retained; final documentation gates are in CHG-20261010-007.

## RULE-01 inventory checkpoint — October10,2026 UTC

RULE-01 adds root-only research tooling, exact PDF.js6.4.299 and [dated source/catalog/test inventories](rules/README.md); product packages/authority remain reserved. Actual RUN022 passes existing-container doctor/static/bootstrap5/read-only PostgreSQL before changes. RUN025/026/030 acquire current public documents and an inert pinned sparse checkout. RUN039 passes19 focused regressions, cached byte/text hash checks and exact nonempty comparison/catalog/test regeneration. Initial empty diff and all failures remain preserved in [RULE-01 validation](validation/rule-01.md). Current executable feature verification awaits fresh whole-source foundation/clean/baseline checks. This does not rerun upstream suites, accept cards, deploy hosting or add Windows/hardware evidence; prior dated qualification remains source-specific.

RULE-01 final-source continuation: RUN040 passes frozen existing-container foundation113, doctor/bootstrap/read-only DB, four managed test identities and five actual DB checks; RUN20261011-002 independently passes fresh source-only frozen203-component installation/full113 checks without credentials or research cache. RUN001 passes real license/advisory/current+Git-history secret gates (203 installed Linux components,11 notice gaps,zero advisories at retrieval). RUN003 verifies identical final executable fingerprint117c9248f08fc7ba28710152bd96f6edc440bdc5d44551e368c931da450500c8, raw source hashes/exact inert regeneration, original scope/config/archive preservation, private-file status and actual listener cleanup. Previous pending statements above are checkpoint observations, now superseded for this scoped inventory. No engine test, new browser/device/hosted artifact, provider, recreation or backup acceptance follows.

RULE-01 canonical closure RUN20261011-004 passes677 staged/live byte comparisons, identical executable fingerprint, current/canonical docs/config/inventory, focused19 and staged source/document formatting; temporary copy removed. Remaining source/engine/device/provider gates above stay explicit.

## Current RULE-02 continuation — 2026-10-11 UTC

Earlier reserved-engine/no-upstream-execution and artifact-v2 statements above describe their dated checkpoints. [Engine qualification](validation/rule-02.md) and [ADR0009](adr/0009-pinned-engine-qualification.md) now define the minimal pinned synthetic Node/Lab-worker implementation, development-only Bun, current artifact v3 and source-matched results. Rules-data/domain/testkit remain reserved. Secure randomness/replay, official rules/cards and wire privacy remain RULE-03/RULE-04/PLAY-02 gates; rewarded/private/ordinary Lab/Collection play stays blocked. Hosted RULE-01 main1925127 passed run38098551762 (downloaded artifact RUN-20261011-019); current RULE-02 hosted/device/production evidence is not inferred. Full548 scope/20 optional flags and provider/D07 decisions remain unchanged.
