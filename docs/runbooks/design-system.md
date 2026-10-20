# Design system runbook

Owner: `packages/design-system`. Governing standard: [UX/UI design system](../vision/UX_UI_DESIGN_SYSTEM.md). Architecture: [ADR 0017](../adr/0017-technical-design-system.md). Evidence: [validation](../validation/ux-design-system.md).

## Use

- Wrap the application once in `DesignSystemProvider` and pass the player's preferences and locale. The provider:
  - imports the global stylesheet (fonts, tokens, base);
  - applies `data-theme`, `data-density` and `data-motion` to the document root;
  - provides component strings and the single announcer.

  A room or component never switches the theme.
- Import components from `@lorcana/design-system`. Renderer colours (sRGB and linear) are at `@lorcana/design-system/renderer`: use exactly one form, and never convert twice.
- Style application code with CSS Modules and `var(--is-…)` tokens. Breakpoints come from `@value compact, intermediate, atLeastIntermediate, wide, expanded from "<path>/generated/layout.module.css"`.
- Use `defaultPreferences`, `parsePreferences` and the device-storage helpers for non-sensitive settings only. Never store hands, seeds, match state or replay contents.

## Change tokens

1. Edit the DTCG sources in `packages/design-system/tokens/` and keep the layers:
   - primitive values;
   - semantic meaning, including both theme files;
   - component contracts;
   - the card namespace.

   Every token needs an explicit `$type` and a description. A semantic theme token must exist in both `theme-paper` and `theme-ink`.
2. Add any new contrast requirement to `tokens/contrast-pairs.json`.
3. Run `pnpm --filter @lorcana/design-system tokens:build`, review the diff in `src/generated/`, then run `tokens:check`.

The check rejects any of these:
- missing or circular references;
- type mismatches, unsupported constructs or types, and invalid units;
- missing descriptions or theme mappings;
- non-achromatic neutrals;
- contrast regressions;
- changed generated output.

The documented subset: color (sRGB objects with optional hex), dimension (px, rem), duration (ms, s), cubicBezier, fontFamily, fontWeight, number, shadow and typography. Aliases are whole-value `{path}` references. The only extension is `$extensions["org.theinkspire"].cssUnit` (cqw or ch) on number tokens. Resolver and modifier documents and `$ref` are not supported.

## Change components

- Each component lives in `src/components/<Name>/` with `Name.tsx`, `Name.module.css` and `Name.docs.ts`, and needs a story in `stories/` that declares coverage, for example `parameters: { designSystem: { coverage: { Name: ['state'] } } }`. Every documented state needs coverage.
- After editing a CSS module, run `node scripts/css-module-types.mjs` to regenerate its exact class types (`*.module.d.css.ts`).
- Use React Aria Components for interaction. Never add a room-specific restyle that bypasses the contract, a parallel styling system, or a dashboard theme.
- Hover and press may change tone, never position or size. Show focus as a 2 px `--is-color-focus-outer` outline with a 3 px offset.
- Disabled styling never lowers the opacity of a whole component, and an unavailable action that matters gets a readable reason.

## Raw values

Only token variables are allowed. If a value genuinely cannot be a token (overlay stacking, physical card proportions, viewport-relative caps), put `/* token-exception: <reason> */` on the same line. `pnpm --filter @lorcana/design-system test` lists every exception; review the list in each change.

## Checks

- `pnpm --filter @lorcana/design-system test` runs:
  - the token gate with negative fixtures;
  - style ownership;
  - component contracts and story coverage;
  - CSS module types;
  - preferences, messages and font provenance;
  - the fan-content notice wording;
  - renderer colour spaces;
  - the no-Babylon/no-server import rule.
- `pnpm --filter @lorcana/design-system test:browser` builds Storybook and serves it on 127.0.0.1:6007. It then runs the Playwright and axe Chromium suite. In CI, the parallel `design-system` job runs the gates and this suite in the isolated container (`python3 scripts/ci-local.py --suite design-system`, decision D18).
- `pnpm --filter @lorcana/design-system storybook` starts the development server on port 6006 with telemetry disabled.

## Fonts

- Interface: Source Sans 3 3.052R (OFL-1.1), weights 400, 600 and 700, in `src/assets/fonts/` with checksums and provenance in `manifest.json`.
- Fallback metrics come from `scripts/measure-font-metrics.mjs <corpus> <web.ttf> <fallback.ttf> …`. Re-measure whenever the font release or the corpus changes, and record the new values and checksums in the manifest.
- Card-face families (The Bystander Collection Sans, Brandon Text Cond, Century Gothic) are tokens with fallbacks. Their files are not imported until a usage basis is recorded: the legacy files are trial or unlicensed builds, and the repository is public.

## Lifecycle

Components move Proposed → Experimental → Stable → Deprecated. All current components are Experimental. Stable requires all of:
- complete documentation;
- applicable state coverage;
- accessibility and interaction evidence, including manual journeys;
- approved visual treatment.

Changes to public behaviour, token meaning or visual contracts need a change record and migration guidance.

## Limits

- Browser evidence is Chromium automation only. Firefox, WebKit, real Safari, iPad, Android tablets, GPUs and manual screen-reader journeys are not qualified (UX-02).
- Full reference screens remain pending (UX-01): crowded match, deckbuilder, Collection binder, pack presentation.
- Interactive Card Viewer and CardFX integration belong to `packages/presentation` and WEB tasks.
- Only English and the `en-XA` pseudolocale exist. French, German, Italian and Spanish need sourced translations.
