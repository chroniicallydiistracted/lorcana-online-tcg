# Developer handoff

Observed at: 2026-10-23T03:11:17.967Z (record time of CHG-20261023-002); display timezone America/Phoenix. Actor: Claude Code agent (architect/QA reviewer role) on Director request. Active change: CHG-20261023-002, finalized with this handoff. Changes on branch `claude/ux-01-reference-screens`, each finalized and committed:
- CHG-20261022-002: UX-01 intake, the Director's answers (decision D27) and the hosted merge runs of pull request #6 (cdfbe34).
- CHG-20261022-003: the UX-01 written design (4b90ab4).
- CHG-20261022-004: the Director's approval of the design (decision D28) and the implementation plan (98357b0).
- CHG-20261022-005 to CHG-20261022-013: implementation-plan tasks 1–9, one record each (a4ee878, 3a3996c, c7d5020, 4e529f4, 7339c74, 84bf1e9, c33732d, 2bac13d, 26b8f4e).
- CHG-20261023-001: hosted run 39848720360, the Director's review declining visual approval (decision D29) and the design audit (f62237d; documentation only).
- CHG-20261023-002: the Director's answers (decision D30), the design review gate and the proposed rework design (this commit).

Earlier changes through CHG-20261022-001 are finalized and on main.

- **Objective and authorized scope:**
  - **D30:** a complete, original UX-01 rework, built under a gate that declines every design without proof:
    - the Impeccable detector;
    - independent sub-agent reviews, which the Director authorized for this purpose.
  - **Done:** the gate and the [rework design](plans/2026-10-23-ux-01-rework-design.md), which is proposed.
  - **Next:** the direction-study prototypes the design describes, which must pass the gate before the Director sees them.
  - **Main:** moves only at the Director's explicit request, and pull request #7 is not to be merged as it stands.
- **Repository:** /home/andre/lorcana-online-tcg, branch `claude/ux-01-reference-screens`, fourteen commits ahead of main 4d9dfc7 with this checkpoint (the local `main` ref is stale; compare with 4d9dfc7). Remote `origin`; pull request #7 is open. Git supplies the resulting commit and dirty state.
- **Execution:** original Compose project lorcana-online-tcg_devcontainer (workspace 01ccec184b44, PostgreSQL c7cd58258c19, both observed running); Node 24.21.0, pnpm 10.33.0. Rediscover IDs before reuse.
- **Audit result (D29):** [design audit](audits/2026-10-23-ux-01-design-audit.md):
  - design specificity fails;
  - the compositions follow the legacy app;
  - twelve functional defects, four of them P1;
  - heuristics 23/40.
- **Design review gate (D30):**
  - **Commands:** `pnpm --filter @lorcana/design-system design-review` and `check:design-reviews`.
  - **In CI:** both run as stages 4 and 5 of `pnpm ci:design-system`.
  - **Where to read more:** the [runbook](runbooks/design-system.md#design-review-gate) has the procedure for the independent reviewers; ADR 0017's amendment records the decision.
  - **Engine:** Impeccable v0.1.16 is fetched into `.local/tools/impeccable/` and checked against its pinned SHA-256, with telemetry and update checks off.
  - **Current state:** the reference screens are declined: 385 detector findings and no review records. The hosted design-system job therefore fails at the gate until the rework passes.
- **Verification (exact timing):**
  - **Both gates, expected failures:**
    - RUN-20261023-003 (headless browser, declined: 385 findings across 63 stories, 129 s);
    - RUN-20261023-004 (static, declined: no review records).
  - **Isolated design-system pipeline:** RUN-20261023-005, an expected failure. The gates (40/40) and the browser suite (409/409) pass, then the detector stage declines the screens and stops the job (518 s).
  - **Full suite and docs check:** listed in CHG-20261023-002.
  - **Audit runs:** the D29 audit's host and container runs are listed in the audit.
- **Listeners/resources:**
  - **Owned processes:** none remain. The audit's static servers and the hung trial scan were stopped.
  - **Untouched:** `.env.local`, `.local/database.json`, the database volume, `docs/vision/UX_UI_DESIGN_SYSTEM.md` and the root `inkspire-interface-typography.png`.
  - **Host setting changed:** `~/.impeccable/config.json` has telemetry off.
- **Pending gates:**
  - **UX-01:** an accepted reference direction, after remediation the Director chooses.
  - **UX-02:** device and browser qualification and manual accessibility journeys.
  - **UX-03:** the card inspector (D24), the Interactive Card Viewer and CardFX.
  - **WEB and catalog delivery:** WEB-01 scene lifecycle, tiers, measurement and context restoration; catalog delivery to the running app (CONTENT-01, WEB tasks); WEB-02/03; translated catalogs.
  - **Other:**
    - PLAY-04 open items and AUTH-01;
    - the low-severity fastify advisory GHSA-389g-gv7q-r4x8 (fastify 5.12.5 → 5.12.6, outside UX-01) awaits the Director's decision.
- **Next actions:**
  1. **Agent:** build the direction-study prototypes in the order the rework design gives:
     - the ink, paper and light world;
     - the 3D pack opening;
     - the Lorebook;
     - the Inkfield match;
     - the Scriptorium deckbuilder.

     Each passes the detector, then two independent reviews, before the Director sees it.
  2. **Director:** approve or change the direction study and the four boundary choices in the rework design. The implementation plan and the full build follow.
