# Current developer handoff

Observed at: 2026-10-10T20:56:16Z; display timezone America/Phoenix (2026-10-10 13:56). Actor: Claude Code agent (architect/developer role), local WSL session continuing the teleported BOOT-04 cloud session. Active change: [CHG-20261010-003](changes/CHG-20261010-003.json) (reconciliation), finalized after the checks below.

- **Objective and authorized scope:**
  - The Director chose to reconcile the uncommitted Codex BOOT-04 research (2026-10-07/08) with the finalized BOOT-04 decisions. The [decision worksheet](plans/2026-10-10-boot-04-decision-worksheet.md), [ADR0007](adr/0007-hosting-provider-baseline.md) and [ADR0008](adr/0008-engine-placement-dependency-baseline.md) take priority.
  - Codex data stays as evidence; its useful findings are adopted into current documents.
  - Director decisions still required: worksheet §12 sign-off; approval to merge this branch into main; approval to drop the teleport stash afterwards.
  - No spending, accounts, provisioning, DNS, deployment, credentials, visibility or settings changes.
- **Repository:**
  - `/home/andre/lorcana-online-tcg` on WSL. Branch `claude/boot-04-codex-reconciliation`, from main `3687bedd461ae14ae2b70dac37b140259d407078`. Origin `https://github.com/chroniicallydiistracted/lorcana-online-tcg.git` (public).
  - Local `main` was fast-forwarded to `3687bed` to match origin.
  - Retained, untouched:
    - `stash@{0}` ("Stashing to teleport the Claude Session", made on `codex/boot-04-provider-plan`, base `5819142`). Its non-conflicting edits were restored; its conflicting edits were hand-merged into main's versions.
    - The local branch `codex/boot-04-provider-plan` (at `5819142`, no commits of its own).
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
  - Earlier: RUN-20261010-001…003 were static checks in a Claude Code cloud container.
  - The hosted Foundation qualification run 38078701491 succeeded for main `3687bed`. It was observed through the GitHub API and is reported only.
- **Listeners/resources:** this session started no processes or ports. The Dev Container services pre-existed (VS Code); leave them running.
- **Pending gates:**
  - Director sign-off (worksheet §12); merge approval; stash drop approval.
  - BOOT-04 reviewed deployment configuration, including remote runtime support (worksheet §13).
  - RULE-01, then RULE-02 (ADR0008 patch list, Node 24 closure, reproduction of worksheet Appendix A).
  - Actual Windows/GPU/touch/device/performance observation.
  - Required checks, branch protection and cancellation policy.
  - OS/legal/content (D07); backup/restore drill (OPS-01); production.
- **Next actions:**
  1. Director reviews and approves merging `claude/boot-04-codex-reconciliation` into main; then fast-forward main and observe the hosted workflow.
  2. After the merge is confirmed, drop `stash@{0}` and optionally delete the empty local branch `codex/boot-04-provider-plan`.
  3. RULE-01 source inventory.
  4. Early parity work: typed config module and configured web addresses.
  5. BOOT-04 configuration before the first outside tester.

Preserve failures and interrupted work. Link exact records and use the same schema as the changelog. Update before leaving or transferring work; never claim a live process without observing it.
