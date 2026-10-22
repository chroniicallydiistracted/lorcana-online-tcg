# Developer handoff

Observed at: 2026-10-22T05:10:11.915Z (record time of CHG-20261022-003); display timezone America/Phoenix. Actor: Claude Code agent (architect/QA reviewer role) on Director request. Changes on branch `claude/ux-01-reference-screens`:
- CHG-20261022-002: UX-01 intake, the Director's answers (decision D27) and the hosted merge runs of pull request #6; finalized and committed as cdfbe34.
- CHG-20261022-003: the UX-01 written design, proposed for the Director's approval; finalized with this checkpoint.

Earlier changes through CHG-20261022-001 are finalized and on main.

- **Objective and authorized scope:**
  - The Director instructed: begin UX-01 from the built design system, following the design system standards and workspace requirements, and follow the documented tasks and stages.
  - UX-01 delivers a matched set of populated reference screens and their interaction specification: crowded match, practical deckbuilder, Collection binder and pack presentation (UX standard §36; backlog UX-01; blueprint §11.1).
  - The intake stage is closed: [UX-01 intake](plans/2026-10-22-ux-01-intake.md).
  - This checkpoint is the written design: [UX-01 design](plans/2026-10-22-ux-01-design.md). It has one §33 brief per screen, the interaction specification, the Babylon scene boundary (scene in `packages/presentation`, a DOM semantic layer over it, on-demand rendering, Flat-tier fallback), the fixture plan, new components with ownership, the evidence plan and three review points.
  - Decision D27: one matched set (it replaces the three studies of blueprint §11.1); interactive Storybook screens built from the existing components and real cards; a first static Babylon table scene in the match reference, with WEB-01 keeping lifecycle, tiers, measurement and context restoration; quiet slots for ink-form artwork.
  - The card inspector (D24) belongs to UX-03 and follows UX-01 and UX-02.
- **Repository:** /home/andre/lorcana-online-tcg. Main is 4d9dfc7. The branch `claude/ux-01-reference-screens` comes from main. Git supplies the resulting commit and dirty state.
- **Execution:** original Compose project lorcana-online-tcg_devcontainer (workspace 01ccec184b44, PostgreSQL c7cd58258c19, both observed running); Node 24.21.0, pnpm 10.33.0. Rediscover IDs before reuse.
- **Implemented behavior:** none in this change. The design system ([ADR 0017](adr/0017-technical-design-system.md)) and the card catalog ([ADR 0018](adr/0018-official-card-catalog.md)) are unchanged on main.
- **Documentation:**
  - the UX-01 intake with the Director's answers, and decision D27 in the decision register;
  - the UX-01 written design;
  - status lines in AGENTS.md, README.md and docs/README.md, which name the reference screens as next, link the design and record main at 4d9dfc7;
  - the documentation index row and the documentation map;
  - the UX-01 backlog row;
  - the hosted merge runs in the [card catalog validation](validation/card-catalog.md);
  - this handoff.
- **Verification (exact timing):**
  - **Hosted:** run 39703969780 on pull request #6 and main run 39705738273 both passed both jobs at 4d9dfc7 (public metadata, re-observed at about 04:44Z).
  - Documentation only, so the source fingerprint `256dd89d` and its receipts stand (RUN-20261021-014, 016, 018 and 019). The static `docs:check` receipts are listed in CHG-20261022-002 and CHG-20261022-003.
- **Review material:** the 2026-10-21 UX review captures remain in the ignored `.local/ux-review-2026-10-21/`. Raw catalogs are in `.local/catalog/ravensburger/`. None is committed.
- **Listeners/resources:** no owned processes or listeners remain. `.env.local`, `.local/database.json`, the database volume and the Director's root file `inkspire-interface-typography.png` are untouched. No host setting changed.
- **Pending gates:**
  - the Director's approval of the UX-01 design, including its three review points (card back, deckbuilder tile controls, navigation bar);
  - then the implementation plan, the build, validation and the Director's visual approval of the screens;
  - UX-02 device and browser qualification and manual accessibility journeys;
  - UX-03's card inspector (D24), the Interactive Card Viewer and CardFX;
  - catalog delivery to the running app (CONTENT-01, WEB tasks);
  - WEB-01/02/03;
  - translated catalogs;
  - PLAY-04 open items;
  - AUTH-01.
- **Next actions:**
  1. **Director:** review the UX-01 design and answer its three review points.
  2. **Agent:** on approval, record it, then write the implementation plan (file ownership, task order and test commands) before any build.
