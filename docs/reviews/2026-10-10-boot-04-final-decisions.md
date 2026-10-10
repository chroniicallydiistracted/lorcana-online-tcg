# Review of the signed-off BOOT-04 decisions

Recorded: 2026-10-10 UTC. Reviewer: Codex architect/developer/QA. Intake source: `efe166d9557ce501b6fd795133f12201ac7fd756`; clean branch `claude/boot-04-signoff-d07`, matching the local main/origin-main refs. Review branch: `codex/boot-04-decision-review`. [Change record](../changes/CHG-20261010-007.json).

## Finding and authority

The signed-off decision package is sufficient to begin RULE-01. No unresolved inconsistency blocks its source and catalog inventory. This review preserves the Director's final choices; it does not select a new provider, reopen the budget, accept runtime performance or start RULE-01 implementation.

The [October10 worksheet](../plans/2026-10-10-boot-04-decision-worksheet.md), [accepted hosting ADR0007](../adr/0007-hosting-provider-baseline.md), [accepted engine ADR0008](../adr/0008-engine-placement-dependency-baseline.md) and [D07 policy](../policies/fan-content.md) take precedence over the dated blueprint and superseded October7/8 proposals. The preserved `0007-single-host-beta-proposal.md` is historical evidence despite sharing a number with the accepted hosting ADR.

## Review coverage

Read the complete worksheet, including all fifteen sections, measurement-harness appendix and source list; both accepted ADRs; fan-content policy; original blueprint/checklist and requirements; source/dependency/certification registers; backlog and decision register; current instructions, documentation standards, handoff, indexes, feature register, qualification and infrastructure/BOOT-04 evidence. Read the same-day decision/sign-off/publication records and inspect their evidence categories. Earlier research remains preserved with explicit supersession rather than rewritten as current decisions.

Compared the installed-package claims against all current app/shared-package manifests, toolchain/lock policy, and the actual local-only lifecycle implementation. Engine-adapter, rules-data, domain and testkit remain reserved; no upstream engine or official catalog is integrated. Reviewed the original 548 IDs, 33 groups, 20 optional flags and X01–X07 without accepting any product leaf from this documentation review.

| Area | Accepted baseline and review result |
|---|---|
| Hosting and region | OVHcloud US VPS-3, US-EAST-VA, Debian13; Director cap about $25/month. The quoted worksheet total is about $16.17/month before checkout tax and usage changes. Prices remain dated quotes, refreshed at purchase. |
| Delivery and resources | Cloudflare Free/Tunnel/Workers static assets/R2; independent staging/production Compose, credentials, DBs and buckets; pull verified CI artifacts. Dokploy, Redis/Valkey and the earlier Hetzner recommendations are deferred/rejected. |
| Recovery | pgBackRest to R2, weekly B2 repository and OVHcloud host backup; accepted staging/closed-beta targets RPO ≤60s and RTO ≤4h. Public zero-loss decision remains a later gate. |
| Engine and public contracts | Pinned tcg-engines closure behind the adapter; precompiled Node24.21.0 production and pinned Bun1.4.2 for upstream tests only. Public TypeBox contracts remain separate from engine internals. |
| Authority | Rewarded/competitive or hidden-information games remain server-authoritative, including eligible ordinary Lab. Browser simulations/manipulation/hot-seat/unrewarded puzzles cannot earn rewards. Format legality, ownership and queue admission remain separate. |
| Randomness and information | One injected secure server random stream and project-owned projections; upstream viewer maps/random fallbacks require qualification. Browser practice code receives no live opponent state or server secrets. |
| Dependencies | Exact selected versions are a task-owned installation baseline. Current manifests install only foundation dependencies; selected future pins do not establish installation, compatibility or execution. |
| Official assets | D07 is recorded with no charges, notice placement, per-asset provenance and neutral fallback. Synthetic test fixtures remain. The policy itself records the unreadable Fan Content Policy source and later public-release verification gate. |

## Carry-forward qualification gates

These are implementation checks within the accepted decisions, not requests to change those decisions:

- **RULE-01:** obtain current official source bytes through permitted routes; record issuer/language/version/effective and retrieval dates, hashes and supersession. Reconcile rules/tournament/format/errata/set notes, actual identities/printings/release states and upstream skipped/todo tests. The older planning counts and CR2.2.0 snapshot are inputs to verify, not current certification.
- **RULE-02/03 and PLAY-02:** reproduce exploratory measurements under the pinned Dev Container runtime; qualify the closure, RNG/deterministic replay and viewer-safe payloads. Sharing a completed replay or seed must still follow participant/privacy permissions; completion alone does not authorize disclosure of concealed cards. Browser replay/sandbox operates only on data the viewer may receive.
- **BOOT-04 configuration and OPS-01:** measure real engine/DB/network/bot/spectator workloads and actual available host memory before setting limits. The approximately11.1GiB allocation is a sizing fixture, not measured headroom. Demonstrate end-to-end WAL archival and restoration against the accepted RPO/RTO; `archive_timeout=60s` alone does not prove successful off-host archival within60s. Account-wide free storage quotas include all environments, WAL, retained backups and exports.
- **Public assets/users:** perform the already documented notice, policy-copy, provenance, audience/privacy, device and release gates. Purchase-time domain/payment choices and provisioning remain deferred as signed off. No new Director answer is needed to begin the local RULE-01 inventory.

## Actual evidence and limits

- [RUN014](../validation/runs/RUN-20261010-014.json): existing Dev Container, child exit0 but recorder **failed** for `clock_changed`. Doctor/static/docs/bootstrap5/read-only DB completed; the run does not supply passing acceptance. Raw samples and log retained unchanged.
- [RUN015](../validation/runs/RUN-20261010-015.json): repeated intake **passed** with a consistent wall/monotonic pair. Sanitized log reviewed. Node24.21.0/pnpm10.33.0 and the unchanged executable fingerprint are retained.
- [RUN016](../validation/runs/RUN-20261010-016.json): documentation gate passed; the assertion that all CSV bytes must match initial335 failed because BOOT-01 legitimately added ticket/evidence links. Original548 source texts match the checklist. Child exit1 and an additional clock discontinuity are retained; the corrected check compares original scope fields and unchanged intake bytes.
- [RUN017](../validation/runs/RUN-20261010-017.json): checker-caller SyntaxError before any assertions; replacement-string expansion corrupted embedded regex text. Correct the caller with a replacement callback; no project code or validator change.
- [RUN018](../validation/runs/RUN-20261010-018.json): all corrected assertions, documentation and full-history secret scan emitted PASS with child exit0, but the recorder failed for clock_changed (wall18.597s vs monotonic20.915s). This failed receipt remains unchanged.
- [RUN019](../validation/runs/RUN-20261010-019.json): short preservation checks passed with consistent timing: all548 original scope fields and unchanged intake CSV bytes,33 groups/20 optional flags,61 selected dependencies,20 installed claims/30 owning-package references,32 task statuses, dated quote arithmetic, unchanged executable/config/dependency bytes, private-file modes/ignore, actual TCP rows with no app listeners and formatting. Long scan results retain RUN018's qualification.
- [RUN020](../validation/runs/RUN-20261010-020.json): synchronized documentation gate passed with consistent timing. Final closure outcomes are recorded in CHG-20261010-007 and subsequent run receipts. No fresh engine, gameplay, browser/device, restore or provider execution is claimed.
- Read-only GitHub metadata observed on2026-10-10 reports [Foundation run38088257250](https://github.com/chroniicallydiistracted/lorcana-online-tcg/actions/runs/38088257250) completed successfully at `efe166d9557ce501b6fd795133f12201ac7fd756`. This is reported hosted status; its downloaded artifact was not independently qualified in this review. Earlier RUN061 retains its own artifact-verification scope.

No application, configuration, dependency or private-data changes were made; existing container/database resources were preserved. This branch contains only review, documentation and evidence updates. RULE-01 remains pending until separately implemented against its backlog acceptance; paid hosting is not a prerequisite for that work.
