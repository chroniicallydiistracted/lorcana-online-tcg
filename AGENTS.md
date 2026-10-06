# Development instructions

## Project authority

Read `docs/vision/Development_Blueprint_2026-10-05.md`, `original_action_items.md`, `requirements.csv` and `initial_backlog.csv` before product work. The Project Director's current instructions take precedence over this baseline. Record substantive architectural changes in an ADR with the affected requirements and comparative evidence.

The goal is a premium Lorcana game for Illumineers: desktop web first, touch/tablet alongside it, free to players, authored tabletop/card/packs presentation and accurate recoverable server-authoritative play. Use the original Inkspire project for selected knowledge and reuse, without inheriting its architecture or dashboard aesthetic by default.

## Current implementation boundary

This is a bootstrap repository. Only the Dev Container, local database configuration, workspace checks and connectivity server exist. Do not mark BOOT-01/02 complete, describe the connectivity response as the game UI, or report any game-engine, auth, migration, device or production tests as passed.

Actual app/package manifests, TypeScript, framework tooling and application code are the next foundation task. The planned package register is a baseline, not a root install list.

## Working environment

- Work inside the committed Dev Container. Match `toolchain.json` and the frozen lockfile.
- Run `pnpm doctor`, `pnpm verify`, `pnpm test:bootstrap` and `pnpm db:check` for relevant workspace changes. Browser forwarding must also be checked on the Director's PC.
- Use `pnpm dev:smoke` only to verify browser access.
- Pin dependencies in the correct owning workspace. Review required dependency build scripts and update `allowBuilds` deliberately. Preserve strict peer checks.
- Persist tooling changes in the Dockerfile/configuration; undocumented manual installs are not the baseline.
- Keep source in the Linux filesystem. Do not move it into `/mnt/c` for development.

## Boundaries and data

- Browser code cannot import database credentials, private engine state/RNG, secret-bearing server code or authoritative state internals.
- Commands resolve on the server; clients render authorized viewer projections.
- Economic ownership changes, receipts and outbox events require transactional idempotency.
- Version rules, catalog, engine and protocol together. Place upstream code behind `engine-adapter` and retain license/provenance and a patch ledger.
- `.env.local` stays private and ignored. Never print credentials or commit generated secret files.
- The initial PostgreSQL credential is a local bootstrap administrator only. Application services must receive restricted roles before their integration.
- Use synthetic fixtures and neutral assets until content provenance and engine qualification are recorded.

## Collaboration and verification

Use separate branches/worktrees for concurrent scopes. Document dependencies and coordinate shared contracts. Give worktrees separate Compose projects/test databases when needed.

Run meaningful checks appropriate to a change. Distinguish static validation, simulated checks and actual container/device/production evidence. Record command outcomes and limitations; never infer runtime success from a configuration file or lockfile alone.

Add CI during BOOT-03; do not treat its future commands or providers as already available. External spending, deployment and messages require authorization from the Director's task context.
