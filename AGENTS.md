# Development instructions

## Project authority

Read `docs/vision/Development_Blueprint_2026-10-05.md`, `docs/vision/original_action_items.md`, `docs/vision/requirements.csv` and `docs/vision/initial_backlog.csv` before product work. The Project Director's current instructions take precedence over this baseline. Record substantive architectural changes in an ADR with the affected requirements and comparative evidence.

The goal is a premium Lorcana game for Illumineers: desktop web first, touch/tablet alongside it, free to players, authored tabletop/card/packs presentation and accurate recoverable server-authoritative play. Use the original Inkspire project for selected knowledge and reuse, without inheriting its architecture or dashboard aesthetic by default.

## Current implementation boundary

BOOT-01 implements executable React/Vite web, synthetic Babylon rendering, typed Fastify API/match diagnostics and an idle worker, with shared contracts, presentation, design-system and server-only service-runtime. See `docs/validation/boot-01.md` for acceptance evidence and limits. The diagnostic page is not the approved game UI.

BOOT-02 local acceptance is verified: server-only db package, restricted local/test roles and reviewed migrations, with disposable recreation proof. Follow docs/runbooks/database.md and docs/validation/boot-02.md; preserve both private credential files and all existing data. Domain, engine-adapter, rules-data and testkit remain reserved. BOOT-03/05, gameplay, auth, real device/performance and production acceptance remain pending. The planned dependency register is a baseline, not a root install list.

## Working environment

- Work inside the committed Dev Container. Match `toolchain.json` and the frozen lockfile.
- Run `pnpm run doctor` (bare `pnpm doctor` selects the pnpm built-in), `pnpm verify`, `pnpm test:bootstrap` and `pnpm db:check` for relevant workspace changes. Browser forwarding must also be checked on the Director's PC.
- Use `pnpm dev` for the real foundation and `pnpm verify:foundation` for application checks. `pnpm dev:smoke` is only a separate connectivity diagnostic.
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

## Universal documentation and evidence standard

Every developer/agent must read `docs/README.md`, `docs/DEVELOPMENT_WORKFLOW.md`, `docs/CHANGELOG_FORMAT.md` and `docs/HANDOFF.md` at intake. These repository-owned standards apply regardless of editor/provider or personal memory. Scope X06/DOC-01 and X07/DOC-02 require current documentation and uniform timestamped change history.

- Review branch/HEAD/dirty files and actual execution access before edits. Use the current Director instructions and actual source over old snapshots.
- Maintain a schema-versioned `docs/changes/CHG-YYYYMMDD-NNN.json` draft at meaningful checkpoints. Record every implementation, expansion, function/feature change, test/result, edit and revision; include full file coverage, feature/task/requirement IDs and explicit documentation review reasons.
- Keep every relevant current document consistent with code/action status. Classify new documents and update source-impact edges in `docs/documentation-map.json`. Preserve labeled planning/history/archive intent; append corrections rather than rewriting executed evidence.
- Use exact UTC ISO timestamps and distinguish recording/event/execution times. Unknown historical execution times stay null. Capture tests with `pnpm evidence:run` inside the container; preserve failures and review sanitized logs before committing.
- Run `pnpm docs:sync --change CHG-YYYYMMDD-NNN` and `pnpm docs:check`. The latter is part of `pnpm verify`; do not bypass it to finalize work. Keep generated file/callable inventory, feature register, task status and changelog current. Tool checks support semantic review; they cannot prove prose truth or full correctness.
- Before stopping/transferring work, update `docs/HANDOFF.md` using its template, including exact evidence categories/results, dirty work, owned listeners, limitations and next actions. Finalize only the completed scope with evidence. Do not infer real Windows/device/production acceptance.

Committed non-draft changes and execution records/logs are append-only; use a new correction record. Keep `.env.local` and credentials out of records/logs. CI enforcement remains BOOT-03. Director authorization and scope take precedence over workflow conventions.
