# Developer handoff

Observed at: 2026-10-22T20:01:58.920Z (record time of CHG-20261022-013); display timezone America/Phoenix. Actor: Claude Code agent (architect/QA reviewer role) on Director request. Active change: CHG-20261022-013, finalized with this handoff. Changes on branch `claude/ux-01-reference-screens`, each finalized and committed:
- CHG-20261022-002: UX-01 intake, the Director's answers (decision D27) and the hosted merge runs of pull request #6 (cdfbe34).
- CHG-20261022-003: the UX-01 written design (4b90ab4).
- CHG-20261022-004: the Director's approval of the design (decision D28) and the implementation plan (98357b0).
- The Director then approved the full design for end-to-end completion. One change record per implementation-plan task:
  - CHG-20261022-005: task 1, the reference fixture (a4ee878).
  - CHG-20261022-006: task 2, the official card back and `CardBack` (3a3996c).
  - CHG-20261022-007: task 3, the room frame (c7d5020).
  - CHG-20261022-008: task 4, the deckbuilder (4e529f4).
  - CHG-20261022-009: task 5, the Collection binder (7339c74).
  - CHG-20261022-010: task 6, pack opening (84bf1e9).
  - CHG-20261022-011: task 7, the crowded match, Flat tier (c33732d).
  - CHG-20261022-012: task 8, the Babylon table scene and its semantic overlay (2bac13d).
  - CHG-20261022-013: task 9, validation, the visual-review fixes and documents (this commit).

Earlier changes through CHG-20261022-001 are finalized and on main.

- **Objective and authorized scope:** UX-01's matched reference screens (UX standard §36; backlog UX-01; decisions D27 and D28), built end to end at the Director's instruction and following the [implementation plan](plans/2026-10-22-ux-01-implementation.md). Task 10 remains: hosted CI, then the Director's visual approval, which is recorded as a new decision and closes UX-01's reference-direction acceptance. Main moves only at the Director's explicit request.
- **Repository:** /home/andre/lorcana-online-tcg, branch `claude/ux-01-reference-screens`, twelve commits ahead of main 4d9dfc7 with this checkpoint (the local `main` ref is stale; compare with 4d9dfc7). Remote `origin`; the branch is pushed in task 10. Git supplies the resulting commit and dirty state.
- **Execution:** original Compose project lorcana-online-tcg_devcontainer (workspace 01ccec184b44, PostgreSQL c7cd58258c19, both observed running); Node 24.21.0, pnpm 10.33.0. Rediscover IDs before reuse.
- **Implemented behavior:**
  - **F-DESIGN-SYSTEM:** 92 Experimental components with §13 contracts (45 new for the reference screens), the official card back (D28), and interactive reference screens on real cards in `packages/design-system/stories/reference/`:
    - room frame;
    - deckbuilder;
    - Collection binder;
    - pack opening;
    - crowded match, with the Flat tier and the table scene.
  - **F-RENDERER:** `mountTableScene` in `packages/presentation`, a static, on-demand Babylon table with projected card rectangles for the design system's `SceneOverlay`. WEB-01 owns lifecycle, tiers, measurement and context restoration.
  - **Reference fixture:** `@lorcana/rules-data` holds 242 Hyperia City records with 69 thumbnails and 6 full-card images.
  - **Boundary:** no application route, API or schema changes; `apps/web` receives no demonstration data. The design system takes `@lorcana/presentation` as a development dependency for the match story only. ADR 0017's amendment of 2026-10-22 records every addition and interpretation.
- **Documentation:**
  - **Records:** ADR 0017 amendment; [design-system runbook](runbooks/design-system.md) (reference screens); [validation](validation/ux-design-system.md) (tasks 1–9, the §33 review and receipts).
  - **Package READMEs:** design-system and presentation.
  - **Registers:** F-DESIGN-SYSTEM and F-RENDERER in FEATURES.md and features.json; documentation-map edges from `packages/presentation/**`; the UX-01 backlog row.
  - **Status lines:** the plan and design statuses, and AGENTS.md, README.md and docs/README.md.
  - **Card catalog:** the [card catalog](validation/card-catalog.md) validation and runbook record the reference fixture.
- **Verification (exact timing):**
  - **Isolated pipelines on the final source:**
    - **RUN-20261022-046:** design-system pipeline, passed (331 s).
    - **RUN-20261022-047:** foundation pipeline, passed (587 s; live PostgreSQL, Linux browser, scans and artifacts).
  - **Before the visual-review fixes:** RUN-20261022-042 (design-system) and RUN-20261022-043 (foundation) passed.
  - **After the fixes:**
    - RUN-20261022-044: design-system gates and the Playwright/axe Chromium suite in both themes, 409/409 (headless browser).
    - RUN-20261022-045: full suite (container).
  - **Docs check:** listed in CHG-20261022-013.
  - **Preserved failures:**
    - RUN-20261022-018, 032 and 035 are explained in their records.
    - RUN-20261022-038 stopped on a low-severity fastify advisory; the CI policy stops only on high or critical.
  - **Not covered:** Chromium only, with software WebGL; no devices and no performance figures.
- **Review material:** 378 final captures with contact sheets in the ignored `.local/ux-01-review/final/`, and the fix captures beside them. Built Storybook in `.local/design-system-storybook/` (`pnpm --filter @lorcana/design-system storybook` serves it live). None is committed.
- **Listeners/resources:** no owned processes or listeners remain. The isolated pipelines removed their Compose projects. `.env.local`, `.local/database.json`, the database volume, `docs/vision/UX_UI_DESIGN_SYSTEM.md` and the root `inkspire-interface-typography.png` are untouched. No host setting changed.
- **Pending gates:**
  - **UX-01:** hosted CI on the pull request, and the Director's visual approval of the reference screens.
  - **UX-02:** device and browser qualification and manual accessibility journeys.
  - **UX-03:** the card inspector (D24), the Interactive Card Viewer and CardFX.
  - **WEB and catalog delivery:** WEB-01 scene lifecycle, tiers, measurement and context restoration; catalog delivery to the running app (CONTENT-01, WEB tasks); WEB-02/03; translated catalogs.
  - **Other:**
    - PLAY-04 open items and AUTH-01;
    - the low-severity fastify advisory GHSA-389g-gv7q-r4x8 (fastify 5.12.5 → 5.12.6, outside UX-01) awaits the Director's decision.
- **Next actions:**
  1. **Agent, task 10:** push the branch, open the pull request, watch both hosted jobs and record them at the next checkpoint. Main moves only at the Director's request.
  2. **Director:** review the reference screens in Storybook or in the captures. Record the approval, with any changes, as the next decision.
  3. **Then:** UX-02, UX-03 and WEB-01, in the documented order.
