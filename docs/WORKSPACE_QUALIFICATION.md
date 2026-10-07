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

BOOT-02 restricted roles, migrations, isolated test database and disposable recreation are verified locally in [BOOT-02 evidence](validation/boot-02.md). Backup/restore remains future qualification beyond its scoped acceptance. BOOT-03 local CI/artifact/security/license acceptance is verified in [its evidence](validation/boot-03.md). BOOT-05 protocol/release versioning remains pending. No gameplay, upstream engine/current-rules, hidden-state engine projection, auth, real touch device, sustained GPU/load/accessibility or production tests were performed. BOOT-02 separately tests synthetic migrations/role restrictions. The foundation's local import boundary and semantic keyboard proofs do not complete those product requirements.

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
