# Workspace qualification record

Baseline date: 2026-10-05 (America/Phoenix).

## Host observations supplied by the Director

WSL 2.7.14.0, Ubuntu in WSL2 mode, Git 2.43.0, Docker Desktop 4.93.0 / Engine 29.8.1 and Compose 5.5.1. Docker server responds from Ubuntu. No direct access to the Director's PC was used to prepare this starter.

## Validation performed while preparing the starter

The final command outcomes are recorded in `VALIDATION_RESULTS.json` after validation. These include pinned Node/pnpm execution, a frozen install, configuration/syntax checks and bootstrap tests. Configuration checks do not substitute for an actual Docker build/start.

## Director's PC checks — pending

| Check | Result/evidence |
|---|---|
| ZIP extracted to the intended WSL folder | Pending |
| Owner-only `.env.local` generated | Pending |
| Actual Compose `config --quiet` | Pending |
| Digest-pinned image pulls and Dev Container build | Pending |
| Non-root user matches WSL ownership | Pending |
| Post-create checks / `pnpm doctor` | Pending |
| Authenticated PostgreSQL 18 connection | Pending |
| Windows browser reaches forwarded port 5173 | Pending |
| PostgreSQL data survives recreate | Pending |

Record outputs that contain no credentials. The full BOOT-01/02 acceptance remains pending: application builds, TypeScript/lint/import boundaries, restricted app/migration roles, migrations and a test database are subsequent work. No game/device/production acceptance is implied by these bootstrap checks.
