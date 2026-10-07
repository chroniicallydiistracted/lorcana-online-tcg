# BOOT-02 validation

Status: BOOT-02 local acceptance verified on `codex/boot-02-database`, based on82e2273. Current change [CHG-20261006-006](../changes/CHG-20261006-006.json) records exact UTC timestamps, sources, outcomes and limits. Final-source actual clean/persistence and independent review passed; the active record contains canonical checkout/documentation closure.

Intake RUN049–052 passed actual Dev Container doctor7, configuration/documentation, bootstrap5 and authenticated bootstrap connectivity. RUN053 retains the expected preimplementation missing-module failure. RUN054 installed pinned pg/Drizzle successfully but changed the lockfile, so the recorder correctly marks it failed source-identity proof; final frozen install is required. RUN055 was a successful package build only. RUN056 passed the initial five unit checks.

RUN057/058/059 retain provisioning/migration refusal and diagnosis: the proposed name `lorcana_local` was already the bootstrap database, with different ownership/no managed marker. The guard refused adoption; new app DB names `lorcana_app_local/test` avoid it. RUN060 provisioned both app databases/eight restricted roles. RUN061 migrated both, authenticated all eight identities and passed three initial live checks. RUN062/063 passed expanded effective/default permission regressions. RUN064 retains the type-only import lint failure; RUN065 passed build/lint, six units and five live checks after correction. RUN066 passed the PostgreSQL18 MAINTAIN/column grant-option regressions and build/lint.

Independent review found and corrected package-cwd credential lookup, parent validation before credential writing, unexpected effective/default grant persistence, SQL NULL default-ACL bypass, PostgreSQL18 MAINTAIN/column grant option gaps, password duration/sampling/transaction logging and host-proof interruption/final identity/log handling. Final independent review reports no important remaining findings (retained RUN921/922 historical transcripts); fresh exact-source execution substantiates closure. Actual test denials use PostgreSQL42501; schema/type/default introspection and typed Drizzle CRUD validate reviewed SQL compatibility. Failed migration DDL/journal roll back; unchanged repeated/concurrent migrations apply nothing.

Recreation proof uses a disposable project/volume; it does not recreate or delete the existing VS Code database. Standard server duration/sampled/transaction logs are deliberately enabled to test secret-safe provisioning. Both local/test typed markers and migration checksums/timestamps must persist, actual role/transaction checks must pass after recreate and all proof resources must be removed. The exact host execution and container identity are in its run record.

BOOT-02 creates restricted credentials and synthetic schema foundations. API/match diagnostics and idle worker still do not access a database; no domain/auth/economic tables, RLS, durable match state, backup/restore, production credentials/pools or deployment are accepted. Windows foundation observation, real touch/GPU/performance and BOOT-03/05 remain pending. Original548 requirements and optional flags retain their statuses; R30.009/.012 have only infrastructure prerequisites, not server/backups acceptance.

Recovery checkpoint: the Director reported a WSL/VS Code crash. Existing workspace/postgres containers restarted at observed UTC2026-10-07T01:06:39.915782249Z /01:06:34.224629363Z respectively; cause unconfirmed. Executable fingerprint and private configuration validity survived. RUN072/073 are explicitly inconclusive historical interruption records, with original zero-byte artifacts preserved in validation/archive. Fresh live checks run sequentially after recovery; no missing result is inferred.


Final source fingerprint: `bc51ea7626d7fbc6bdea4d499644ef16f5c5a703ef505ff8bae211dc6dd4e81e`.

| Evidence | Actual result and category |
|---|---|
| RUN20261006-070 | Container clean source copy: frozen install, all10 workspace projects, ordered builds/types/lint and59 tests (foundation21, DB units6, governance22, simulated recorder10); no private DB/config copied |
| RUN20261006-071 | WSL-host orchestrated actual containers: concurrent pending migration exactly once in both fresh DBs, typed row/UTC/journal continuity after PostgreSQL container recreation, DB integration5, private-value log scans and complete isolated cleanup |
| RUN20261007-001 | Post-recovery existing container: frozen install, doctor7, bootstrap connectivity, all8 managed identities, persisted journals (both migrate applied0), live DB integration5, actual build and known-private-credential browser bundle scan |
| RUN20261007-003 | Container canonical staged Git checkout: frozen install/build/type/lint and59 tests; executable fingerprint matches final live source |
| RUN20261007-004 | Actual5173/3001/3002 listener cleanup; private files600/ignored, staged known-secret scan and original scope/archive preservation |
| RUN20261007-002 | Headless browser: Linux Chromium/SwiftShader4 checks; real web/services/WebGL lifecycle, unavailable service/keyboard, server-owned file denial and simulated WebGL absence |

Source-only mocks are simulated recorder evidence; Linux browser automation is not Windows/device acceptance. The interrupted RUN072/073 were not reconstructed as passes. Original zero-byte artifacts remain archive provenance. The later container restart demonstrated managed identities/journals survived the actual restart; the controlled separate proof demonstrates recreation using the pinned image and mount model. No existing volume recreation or backup/restore is claimed.

BOOT-02 acceptance: reproducible start/health/provision/migrate passed; effective role restrictions and drift refusals passed; actual recreation persistence passed in an isolated project; build/type/import ownership remained valid. Full domain/application/production and original product requirements retain their independent gates. The synthetic renderer still emits the known large-chunk warning; no new performance claim is made.
