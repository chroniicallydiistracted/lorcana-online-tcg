# Current developer handoff

Observed at: 2026-10-10T20:56:16Z; display timezone America/Phoenix (2026-10-10 13:56). Actor: Claude Code agent (architect/developer role), local WSL session continuing the teleported BOOT-04 cloud session. Changes: [CHG-20261010-003](changes/CHG-20261010-003.json) (reconciliation, finalized) and [CHG-20261010-004](changes/CHG-20261010-004.json) (Director-authorized publication, main integration and stash drop).

- **Objective and authorized scope:**
  - The Director chose to reconcile the uncommitted Codex BOOT-04 research (2026-10-07/08) with the finalized BOOT-04 decisions. The [decision worksheet](plans/2026-10-10-boot-04-decision-worksheet.md), [ADR0007](adr/0007-hosting-provider-baseline.md) and [ADR0008](adr/0008-engine-placement-dependency-baseline.md) take priority.
  - Codex data stays as evidence; its useful findings are adopted into current documents.
  - Director decision still required: worksheet §12 sign-off. On 2026-10-10 the Director authorized publishing this branch, fast-forwarding main to it, and dropping the teleport stash (CHG-20261010-004).
  - No spending, accounts, provisioning, DNS, deployment, credentials, visibility or settings changes.
- **Repository:**
  - `/home/andre/lorcana-online-tcg` on WSL. Branch `claude/boot-04-codex-reconciliation`, from main `3687bedd461ae14ae2b70dac37b140259d407078`. Origin `https://github.com/chroniicallydiistracted/lorcana-online-tcg.git` (public).
  - Main (local and origin) fast-forwards to the commit containing CHG-20261010-004; identify its SHA through Git. No history was rewritten; the branch is retained on origin.
  - The teleport stash ("Stashing to teleport the Claude Session", commit `0af9ba102cbdc039051987f54bca2fac56ad2eb5`, base `5819142`) was dropped after CHG-20261010-003 restored or replaced its content. It is recoverable by SHA only until git garbage collection.
  - The empty local branch `codex/boot-04-provider-plan` (at `5819142`) is retained.
- **Execution:**
  - Git runs on the WSL host.
  - pnpm/evidence commands run inside Dev Container `lorcana-online-tcg_devcontainer-workspace-1` (Compose project `lorcana-online-tcg_devcontainer`, with PostgreSQL 18 healthy) via `docker exec -u node -w /workspaces/lorcana-online-tcg`. Node 24.21.0, pnpm 10.33.0, uid 1000.
  - Preserve `.env.local`, `.local/database.json` and the `pg18_data` volume; all three are present and owner-only.
- **Implemented behavior:** none. This change is documentation and evidence restoration only, and the executable fingerprint is unchanged. `F-STAGING` (planned/pending, restored from the Codex work) now describes the final BOOT-04 decisions. Services still require `APP_ENV=local`.
- **Documentation:**
  - **Restored unchanged as evidence:** Codex change records CHG-20261007-005 and CHG-20261008-001/002; RUN-20261007-063…067 and RUN-20261008-001…009 with logs (failures preserved); cost/source fixtures; duels.ink observations.
  - **Restored with a dated supersession note only:** the October 7/8 plans and the proposed ADR file `0007-single-host-beta-proposal.md`. That file keeps its duplicate number because finalized records reference it.
  - **[BOOT-04 validation](validation/boot-04.md)** is now the current BOOT-04 evidence document; the Codex checkpoints are preserved below its current status.
  - **Adopted into current documents:**
    - Director inputs: primarily North America; up to 50 concurrent invited-beta players; cost tiers before a ceiling.
    - The remote-runtime prerequisite (worksheet §13).
    - The growth fixture and build/restore separation (worksheet §6).
    - The duels.ink facts (worksheet §2).
    - The corrected hosted-CI sentence in DEVELOPMENT_WORKFLOW.
  - **Not adopted:** Hetzner CCX candidates and Dokploy.
- **Verification:**
  - RUN-20261010-004 `pnpm run doctor` and RUN-20261010-005 `pnpm db:check`: local Dev Container intake, both passed.
  - RUN-20261010-006 `pnpm verify`: passed.
  - RUN-20261010-007 `pnpm test:documentation`: **failed** on a wall-clock step (wall 3.4 s vs monotonic 5.8 s; `clock_changed`). Preserved unchanged.
  - RUN-20261010-008: rerun of the same suite after the clock was stable (0 ms drift); passed.
  - RUN-20261010-009 `pnpm docs:check`: final documentation state, recorded in the change record.
  - RUN-20261010-010 `pnpm docs:check`: integration record, recorded in CHG-20261010-004.
  - Pushing main triggers the foundation workflow; observe its actual result before treating the new main commit as hosted-qualified.
  - Earlier: RUN-20261010-001…003 were static checks in a Claude Code cloud container.
  - The hosted Foundation qualification run 38078701491 succeeded for main `3687bed`. It was observed through the GitHub API and is reported only.
- **Listeners/resources:** this session started no processes or ports. The Dev Container services pre-existed (VS Code); leave them running.
- **Pending gates:**
  - Director sign-off (worksheet §12).
  - BOOT-04 reviewed deployment configuration, including remote runtime support (worksheet §13).
  - RULE-01, then RULE-02 (ADR0008 patch list, Node 24 closure, reproduction of worksheet Appendix A).
  - Actual Windows/GPU/touch/device/performance observation.
  - Required checks, branch protection and cancellation policy.
  - OS/legal/content (D07); backup/restore drill (OPS-01); production.
- **Next actions:**
  1. Observe the hosted foundation workflow for the new main commit.
  2. Director completes the worksheet §12 sign-off. Optionally delete the empty local branch `codex/boot-04-provider-plan`.
  3. RULE-01 source inventory.
  4. Early parity work: typed config module and configured web addresses.
  5. BOOT-04 configuration before the first outside tester.

Preserve failures and interrupted work. Link exact records and use the same schema as the changelog. Update before leaving or transferring work; never claim a live process without observing it.
