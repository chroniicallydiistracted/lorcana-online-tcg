# packages/design-system

The Inkspire's technical design system, built from the adopted [UX/UI design system standard](../../docs/vision/UX_UI_DESIGN_SYSTEM.md) under [ADR 0017](../../docs/adr/0017-technical-design-system.md). It is browser-only and imports neither Babylon nor server code.

- **Tokens:**
  - DTCG 2025.10 subset sources in `tokens/` (primitive, semantic with the Paper and Ink themes, component, card);
  - Style Dictionary 5.6.0 resolution;
  - deterministic outputs in `src/generated/`: CSS custom properties, typed TypeScript, renderer colours, `@value` breakpoints, font faces and a manifest.
- **Foundation:**
  - `DesignSystemProvider` (theme, density, motion, locale, announcer);
  - the versioned preference model;
  - externalized strings, with the `en-XA` pseudolocale;
  - self-hosted Source Sans 3 with measured fallback metrics;
  - the card-face fonts (decision D20): Bystander, Brandon Text Cond with a measured Source Sans 3 fallback for the characters its trial builds lack, and Century Gothic.
- **Icons and symbols (decision D21):**
  - interface icons are Phosphor Regular from a curated registry (`src/components/Icon/registry.ts`);
  - printed gameplay and ink symbols come from verified Lorcana assets (`src/assets/symbols/`), with a takedown switch to neutral placeholders.
- **Components:** 47 documented Experimental components on React Aria Components 1.21.1 with CSS Modules: actions, fields, overlays, collections, status, notifications, connection and card presentation. Every component has a §13 documentation contract and stories for every documented state.
- **Checks:**
  - `pnpm --filter @lorcana/design-system test`: tokens, style ownership, component contracts, fonts, icon registry, symbol provenance, preferences and notice wording;
  - `test:browser`: Storybook plus Playwright and axe in Chromium;
  - `tokens:build` and `tokens:check`;
  - `storybook` and `build-storybook`.

Operation and change rules: [design-system runbook](../../docs/runbooks/design-system.md). Evidence and limits: [validation](../../docs/validation/ux-design-system.md). Feature register: [F-DESIGN-SYSTEM](../../docs/FEATURES.md).

Follow [the universal workflow](../../docs/DEVELOPMENT_WORKFLOW.md) for changes, documentation impact review and timestamped test evidence. Runtime, build and test dependencies belong to this workspace.
