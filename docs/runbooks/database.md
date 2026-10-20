# Local database operation

<!-- PLAY04-CURRENT-START -->
Current PLAY-04 D13: implemented and locally qualified on `codex/play-04-d13` from cda3b54; main is untouched and independent Director audit/hosted CI remain pending. P060 alone repairs opening concede. Native whole-game timeoutCount drives bounded policy2 limit1..10/default3; first opening expiry loses; D14 native restore stays. Waiting concessions remain unreserved/fenced, and infrastructure pauses never count or choose a winner. Current viewer2/clock2/live4 and transcript3/checkpoint2 retain exact legacy wire codecs while refusing unavailable old executable pins without rewriting data. RUN037 passes all14 isolated stages with exact timing,393project/406upstream/2injection,85DB/storage/live,13Chromium and14Lab-worker probes. RUN036 proves frozen source-only typecheck; RUN038 proves preservation/owned cleanup. [Receipt register and limits](../validation/play-04.md#d13-receipt-register--2026-10-19-utc) govern qualification. Earlier dated statements remain historical; ordinary/auth/card/reward/device/load/production gates stay closed.
<!-- PLAY04-CURRENT-END -->

Historical PLAY-03 checkpoint: optional injected-session protocol2 gateway, current-ref durable commands, exact-version participant cache and browser reconnect client are implemented; [qualification and current limits](../validation/play-03.md) govern acceptance. Director keeps AUTH-01 separate; normal startup stays diagnostics-only. Migration0004 is additive, release/artifact closure includes13 workspaces and distinct protocol1/2 handlers. Historical milestone statements/results below describe their dated sources. No ordinary/official/reward/observer/device/production or clock-repair acceptance is implied.

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

## PLAY-01 continuation — 2026-10-13 UTC

PLAY-01 implements the internal two-player synthetic durable command service with participant-scoped idempotent receipts, row-fenced CAS, private deterministic recovery, atomic accepted journal and metadata-only outbox. Both server and Lab refuse every manual/debug move. Fastify remains diagnostics-only; authenticated transport, viewer/structured-log privacy (PLAY-02), publication (PLAY-03), game clocks (PLAY-04), X01 multiplayer and ordinary/official/private/reward/card admission remain gated. See [PLAY-01 operation](match-commands.md) and [validation](../validation/play-01.md); local core/full/browser/database/clean acceptance is verified; isolated CI timing remains pending after RUN113 clock rejection. Reviewed migration history is now0001/0002/0003;0003 is an append-only constraint correction after real test application. Local/test upgrades and role health are recorded separately; never edit prior applied SQL or reset data. DB recreation probes compare every migration identity/hash rather than assume a single row.

PLAY-04 adds the contracts workspace dependency to DB. Root `db:provision`, `db:migrate`, `db:health` and `db:test` build `@lorcana/db...` (its dependency closure) before executing; a clean standalone probe is RED066→GREEN067. Direct owning `db build` assumes contracts are already built. Clock writers acquire match then clock locks and refresh sidecar state after lock acquisition; do not reuse a pre-wait READ COMMITTED snapshot.

## D13 current compatibility — 2026-10-19 UTC

D13 supersedes earlier version assertions: new timed/untimed synthetic matches pin live4, viewer2/endReason and required nullable clock2 with native timeoutCount/limit. Exact legacy live2/viewer1 and live3/clock1 codecs remain; unavailable old executable/policy/checkpoint pins refuse without rewriting. Private replay is transcript3/checkpoint2, preserving native events and one logical saved transition. Append-only0006 admits4;0001..0005 remain unchanged. P060 is the only upstream repair (opening concede validMoves), now60 patches/361 files/37 unchanged tests. Either player's opening concession loses, main expiry loses at the whole-game limit, first opening expiry loses immediately, and D14 native restore remains. Waiting work never owns the timed lease; infrastructure pauses never count or award results. Admission/auth/rewards/cards/device/load/operations stay gated. See [clock ownership](game-clocks.md). Earlier dated evidence remains source-specific.
