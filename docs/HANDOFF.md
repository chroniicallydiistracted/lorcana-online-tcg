# Developer handoff

Observed at: 2026-10-21T07:01:59.323Z (record time of CHG-20261021-002); display timezone America/Phoenix. Actor: Claude Code agent (architect/QA reviewer role) on Director request. Active changes:

- CHG-20261020-004 (UX-01 technical design system, 17b7b8f);
- CHG-20261020-005 (font license line endings, 3997557);
- CHG-20261020-006 (parallel design-system CI job, decision D18, b6a5b50);
- CHG-20261020-007 (isolated pipeline command limit 1500 s, decision D19, 3793081, merged to main by the Director);
- CHG-20261020-008 (hosted merge runs and vite 8.3.3 security patch, branch `claude/vite-advisory`, PR #4, dc6757e);
- CHG-20261021-001 (card-face fonts, Phosphor icon registry and verified Lorcana symbols, decisions D20–D22, 2c84769, PR #5);
- CHG-20261021-002 (ADR 0017 approved in full, decision D23; implementation audit; fallback-width test tightened), finalized with this checkpoint.

- **Objective and authorized scope:** the Director assigned UX-01 to this agent: build a full technical design system following `docs/vision/UX_UI_DESIGN_SYSTEM.md` and all repository requirements (decision D17). The Director also approved CC-BY-4.0 for Storybook's build-time data (D16).
- **Repository:** /home/andre/lorcana-online-tcg. Current branch `claude/ux-card-fonts-icons` from `claude/vite-advisory` (dc6757e, PR #4, not yet on main); main is 3793081 (the merged UX-01 work). The UX-01 branch `claude/ux-design-system` started from main 9081192. It holds d188387 (PLAY-04 closure, plus the draft committed byte-for-byte) and this checkpoint. Git supplies the resulting commit and dirty state.
- **Execution:** original Compose project lorcana-online-tcg_devcontainer (workspace 01ccec184b44, PostgreSQL c7cd58258c19, both observed running); Node 24.21.0, pnpm 10.33.0. Rediscover IDs before reuse.
- **Implemented behavior:** F-DESIGN-SYSTEM. Details are in [ADR 0017](adr/0017-technical-design-system.md), the [runbook](runbooks/design-system.md) and the [validation record](validation/ux-design-system.md).
  - **Tokens:**
    - DTCG-subset sources with the standard's exact values;
    - a validator with negative fixtures and 38 contrast pairs per theme;
    - Style Dictionary 5.6.0 cross-checked;
    - deterministic outputs with a drift check.
  - **Fonts:** Source Sans 3 3.052R self-hosted with measured fallback faces. Card-face fonts integrated (D20), with a measured Source Sans 3 fallback for the characters the trial Brandon builds lack.
  - **Icons and symbols:** Phosphor Regular from a curated registry; verified Lorcana ink and gameplay symbols with a takedown switch (D21).
  - **Foundation:** `DesignSystemProvider`, versioned preferences and externalized strings with a pseudolocale.
  - **Components:** 47 experimental components with §13 contracts and full state stories.
  - **Gates:** style ownership and component contracts.
  - **Storybook and CI:** Storybook 10.6.1. Playwright and axe run in the parallel CI job `design-system` (D18). The isolated pipeline command limit is 1500 s (D19).
  - **Web app:** `apps/web` uses the provider, components and tokens, and shows the fan-content notice.
  - **Policy and tooling:**
    - `allowBuilds: { esbuild: false }`, enforced by `scripts/verify-config.py`;
    - CC-BY-4.0 in `scripts/ci/policy.json`;
    - Storybook builds into `.local/design-system-storybook`.
- **Documentation:**
  - ADR 0017, the runbook and the validation record;
  - the archived original ZIP;
  - decisions D16 and D17;
  - the UX-01/UX-03 statuses and the R25 links (statuses unchanged);
  - the F-DESIGN-SYSTEM and F-WEB entries and the documentation map;
  - dated notes in the CI runbook, the fan-content policy and the web README;
  - status lines and this handoff.
- **Verification (exact timing):**
  - **ADR 0017 approval and width bound, fingerprint `52f4cc01`:** RUN-20261021-005 passed (checks and full suite), RUN-20261021-006 passed (isolated design-system suite, 161/161), RUN-20261021-007 docs check.
  - **Card fonts, icons and symbols, fingerprint `52f0e140`:** RUN-20261021-001 passed (checks, `pnpm audit` clean, full suite: 403 Node, 26 Python, upstream 406/1 skip, 2 injection), RUN-20261021-002 passed (isolated design-system suite: 34 gates, 161/161), RUN-20261021-003 passed (14-stage foundation pipeline, 571 s), RUN-20261021-004 docs check.
  - **vite 8.3.3, fingerprint `b75b051338aee1e236d39659659ea09ebff19c543ad75114302b6c6edfcbac93`:** RUN-20261020-042 passed (checks, `pnpm audit` clean, full suite), RUN-20261020-043 passed (isolated design-system suite, 107 s), RUN-20261020-044 passed (14-stage foundation pipeline with the advisory check, 544 s), RUN-20261020-045 docs check.
  - **Hosted:** PR #3 run 39496608891 passed both jobs at 3793081. Main run 39509517284 passed `design-system` and all 14 foundation stages, then failed the advisory check (three vite advisories published that day).
  - **Final fingerprint `94cbd3d21520ad9c909b7de9245a216b6e666d3a8fa2be11b5daf3c16e309857`:**
    - RUN-20261020-038, passed: checks and full suite.
    - RUN-20261020-039, passed: isolated design-system suite, 107 s.
    - RUN-20261020-040, passed: 14-stage foundation pipeline, 545 s.
    - RUN-20261020-041: docs check.
  - **Fingerprint `44591181`:**
    - RUN-20261020-033, passed: checks and full suite.
    - RUN-20261020-034, passed: isolated design-system suite.
    - RUN-20261020-036, passed: 14-stage foundation pipeline.
    - RUN-20261020-037: docs check.
  - **Earlier receipts:** RUN-032 (before the message fix) and RUN-035 (failed, ordering).
  - **Fingerprint `89f989ca`:**
    - RUN-20261020-028, passed: configuration contract, typecheck, lint and full suite.
    - RUN-20261020-029, passed: Chromium 150/150.
    - RUN-20261020-030: failed (abbreviated commit SHA in the record).
    - RUN-20261020-031, passed: static docs check.
  - **Previous fingerprint `686eb1c8`:**
    - **RUN-20261020-024, passed:** Chromium 150/150.
    - **RUN-20261020-025, passed:** configuration contract, typecheck, lint and full suite (399 Node, 24 Python, upstream 406/1 skip, 2 injection).
    - **RUN-20261020-026, passed:** isolated pipeline, all 15 stages in 612 s.
    - **RUN-20261020-027:** static docs check.
  - **Earlier receipts:** RUN-018 (superseded), RUN-019 (failed `source_changed`), RUN-020 to RUN-022 (passed at the earlier fingerprint) and RUN-023 (failed at the configuration contract). All are retained and explained in the validation record.
- **Listeners/resources:** no owned processes or listeners remain. `.env.local`, `.local/database.json`, the database volume and the Director's root file `inkspire-interface-typography.png` are untouched. No host setting changed.
- **Pending gates:**
  - a passing hosted run of the vite fix, then the main fast-forward, which needs the Director's explicit push request;
  - UX-01 reference screens and visual approval;
  - UX-02 device and browser qualification and manual accessibility journeys;
  - the Interactive Card Viewer and CardFX;
  - WEB-01/02/03;
  - translated catalogs;
  - PLAY-04 open items (point 4, finding 3, the D15 revisit, the lint and fingerprint scope follow-up);
  - AUTH-01.
- **Next actions:**
  1. **Agent:** push `claude/ux-card-fonts-icons`, open its pull request and check both hosted jobs. It builds on PR #4.
  2. **Director:** push this branch's tip to main once its hosted run passes (it includes PR #4's dc6757e).
  3. **Director:** supply the asset pack's original download location (fan-content policy rule 3).
  4. **Then:** the interactive card summary pop-out (the D20 usage basis) and the UX-01 reference screens.
