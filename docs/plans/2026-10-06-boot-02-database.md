# BOOT-02 database implementation plan

Goal: reproducible local PostgreSQL health/provision/migrate, restricted service roles, isolated test database and actual persistence through recreation. Prerequisite BOOT-01; original product requirements retain their acceptance gates. Change CHG-20261006-006 records timestamps and evidence.

Architecture: keep the existing administrator/bootstrap database and volume intact. Provision separate `lorcana_app_local` and `lorcana_app_test` databases, each with migration/API/match/worker login roles. Store generated passwords only in ignored owner-only `.local/database.json`. Server-only `packages/db` owns pg connections, typed Drizzle schemas, explicit SQL migrations and CLI verification. Apps continue diagnostic-only until their domain integration. Use a disposable Compose project with its own volume for recreation proof.

Tech stack: PostgreSQL 18, Node 24.21.0, pnpm 10.33.0, TypeScript 6.0.3, pg 8.23.1, Drizzle ORM 0.45.3. No generator/build-script allowance required for reviewed SQL. Architecture rationale: ADR 0004.

1. Record intake and current-source pending verification. Add meaningful red tests for target/config validation and migration history integrity.
2. Implement private credentials, ownership-marked idempotent provisioning, scoped grants, typed schema and transaction/advisory-lock migration runner. Reject unexpected existing roles/databases and changed migration history. No destructive startup migration.
3. Provision and migrate local/test explicitly. Prove own-schema CRUD and denied cross-schema, cross-environment, DDL/TRUNCATE and privilege escalation; prove rollback, checksum rejection, repeated and concurrent migration.
4. Implement a host-managed disposable Compose recreation drill with no host ports and no changes to the existing containers/volume. Capture actual host orchestration and container results in the standard evidence schema; clean only the drill's resources.
5. Independently review authorization/transaction behavior. Run clean frozen install, builds/types/lint/unit/service/browser boundaries and fresh original environment checks. Validate canonical Git checkout bytes. Update every affected document, feature/task status and handoff; commit on `codex/boot-02-database`.

Review focus: provisioning must not adopt arbitrary existing databases/roles; credentials must never reach client bundles/public contracts or logs; migration journal must reject altered history and roll back failed statements; runtime identities must not own objects or escalate. Local development grants are not production RLS/authorization certification. Tests must prove actual denials, not only inspect SQL strings. Windows/device and production acceptance remain pending.

Completion: implementation and independent review are complete. RUN070 passed the full59-test clean foundation; RUN071 passed final-source pending migration concurrency, data/journal recreation, live role/rollback checks, server-log secrecy and disposable cleanup. Post-recovery RUN20261007-001/002 passed live environment/database/build and four Linux browser checks. Canonical Git bytes and final docs/ownership checks are captured at closure. All listed product/device/production limitations remain.
