# Local database operation

BOOT-02 operates only inside the committed local Dev Container, at private `postgres:5432`. It leaves `.env.local`, the original bootstrap database and existing Compose volume intact. It creates `lorcana_app_local` and `lorcana_app_test`; roles use `lorcana_local_*` / `lorcana_test_*` suffixes `migrator`, `api`, `match`, `worker`. There is no host database port. Application diagnostic readiness still does not depend on a database.

From any workspace package, the server-only database module resolves the repository's `.local/database.json` from its own location. The file is ignored, owned and mode600; its parent must be an owned private directory. Provisioning generates eight distinct passwords only when the file is absent, preserves existing bytes and reapplies those credentials only to marked managed roles. Preserve it together with the existing initialized volume. Missing credentials for an initialized managed database require deliberate recovery, not casual regeneration.

Run inside the Dev Container from the repository root:

```bash
pnpm db:check
pnpm db:provision
pnpm db:migrate -- --target local
pnpm db:migrate -- --target test
pnpm db:health -- --target local
pnpm db:health -- --target test
pnpm db:test
```

`db:check` still authenticates as the existing bootstrap administrator. `db:provision` requires that administrator; it rejects unmarked roles/databases, role flags/membership, wrong owners and unexpected effective/default runtime grants. PUBLIC database CONNECT/TEMP and public-schema access are revoked in managed databases. Migration identities own their respective databases/schemas; runtime identities have no ownership, DDL, TEMP, TRUNCATE, MAINTAIN, grant option, other-service schema, migration-journal or cross-environment access. Future table CRUD defaults are scoped to the correct migration owner/schema. Provisioning is explicit and may leave successfully marked objects after a later step fails; rerun after diagnosis. A crash between database creation and its ownership comment needs deliberate provenance inspection; it is never automatically adopted.

`db:migrate` requires the named environment's migration login. It locks the database transaction, verifies applied IDs/checksums form an unchanged prefix, applies remaining reviewed SQL and journals it in the same transaction. Failed DDL rolls back. Edit a draft unapplied migration only before it is accepted; append a new numbered migration after application. Never edit applied SQL or reset the journal to suppress a checksum refusal. CLI errors omit private details. Invalid target/environment exits with failure; production URLs are not supported. No automatic app-startup migration exists.

`db:health` connects as all four environment identities and checks the exact database/user and PostgreSQL18 major. `db:test` runs five actual test-database integration checks: typed CRUD and forbidden operations, eight cross-environment denials, idempotent/concurrent migration/history rejection/rollback, future object grants and injected privilege drift rejection. Fixtures use synthetic tables/UUID rows; cleanup removes only fixture objects/rows and injected grants. Run it without another concurrent DB integration suite. It exercises test DB and repeat provisioning of both managed environments; it never drops either database or existing player data.

## Disposable recreation proof

After installing/building the current packages in the existing Dev Container, run from the WSL host repository root:

```bash
python3 scripts/db-persistence-proof.py --id RUN-YYYYMMDD-NNN
```

Use a fresh actual run ID. The host script discovers the existing source-mounted workspace image, starts `infra/compose.persistence.yaml` under a fresh UUID project, with a separate volume and no published ports, then runs database code in a non-root read-only source runner. It seeds both app databases, stops/removes/recreates only the proof PostgreSQL container against its retained volume, checks typed data/journal continuity and the five actual authorization/transaction checks, then removes only the proof resources. Its canonical run record identifies WSL orchestration separately from container execution and checks for remaining owned containers/volumes. SIGINT/SIGTERM and timeout/final-identity failure produce failed receipts while preserving ownership-aware cleanup.

The disposable server enables duration, sampled and transaction statement logging. Provisioning disables those standard logging paths in its admin session before password statements; the drill scans server logs for known private values without printing them. See [PostgreSQL18 logging](https://www.postgresql.org/docs/18/runtime-config-logging.html). This proof qualifies the pinned image/mount/network model, not recreation of the Director's current volume, a backup, third-party audit logging or production security.

If cleanup fails, use the exact recorded project identity to inspect/recover only its containers/volume. Never apply `down --volumes` to the VS Code Compose project. Unexpected permissions/history/ownership are reasons to diagnose and document a correction, not erase private files or data. Domain/auth/economy schema, RLS, application wiring, migration deployment and backup/restore remain later scope.
