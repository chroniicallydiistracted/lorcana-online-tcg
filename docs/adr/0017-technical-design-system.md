# ADR 0017: Technical design system

Status: accepted for implementation by the Director's instruction to build the technical design system from the adopted standard (decision D17, CHG-20261020-004). Visual approval of full reference screens, real-device and manual accessibility qualification remain separate.
Tasks: UX-01, UX-03, DOC-01, DOC-02. Requirements: R25.001–R25.016 (foundation contracts only).
Authority: [UX/UI design system standard](../vision/UX_UI_DESIGN_SYSTEM.md) (sha256 `000fd854…`), the Director's current instructions, AGENTS.md boundaries.

## Context

`packages/design-system` held a single unstyled `ActionButton`, and the diagnostic web page used ad-hoc colours. The standard (§10–§13, §32–§35) requires central token sources with typed outputs and validation; React Aria Components as the interaction foundation; documented component contracts with state coverage; Source Sans 3 with measured fallbacks; preserved card typography; and evidence-based acceptance. The repository requires pinned dependencies in the owning workspace, reviewed build scripts, a license-gated dependency graph and timestamped evidence.

## Decision

1. **Tokens.**
   - Token sources live in `packages/design-system/tokens/` as a documented subset of DTCG 2025.10, in three layers (primitive, semantic, component) plus a card namespace.
   - Themes are separate files (`theme-paper`, `theme-ink`) mapping the same semantic paths. Resolver and modifier documents are not used.
   - Allowed types: color (sRGB objects), dimension (px, rem), duration, cubicBezier, fontFamily, fontWeight, number, shadow and typography.
   - The project extension `org.theinkspire.cssUnit` (cqw or ch) is the only extension and applies to number tokens.
   - Every token has an explicit `$type` and a description.
2. **Validation.** `scripts/token-lib.mjs` implements every check in §10, independently of Style Dictionary:
   - missing and circular references, including inside composites;
   - type mismatches, unsupported constructs and types, and invalid dimensions and units;
   - missing descriptions and missing theme mappings;
   - achromatic neutrals;
   - 38 contrast pairs per theme, using the WCAG relative-luminance formula.
3. **Build.** Style Dictionary 5.6.0 resolves each theme. The build fails if its resolution differs from the subset resolver for any token, which is how Style Dictionary is qualified against the subset. Project formatters emit the deterministic outputs to `src/generated/`:
   - `tokens.css`: custom properties for Paper by default and Ink by system preference or explicit choice, plus density and reduced-motion modes;
   - `layout.module.css`: breakpoints as CSS Modules `@value` stylesheet values, never runtime variables in media queries;
   - `fonts.css`;
   - `tokens.ts`: typed names and values;
   - `renderer.ts`: sRGB and linear-light colour components, declared separately so Babylon never converts twice;
   - `manifest.json`, with source file hashes.

   Outputs are committed. `scripts/check-tokens.mjs` rebuilds into a temporary directory and fails on any changed output.
4. **Component tokens only.** Only semantic, component, card and spacing, radius and border-width scale tokens become CSS variables. Primitive colours, type and motion values are not emitted, so components cannot reach them.
5. **Components.**
   - React Aria Components 1.21.1 (already pinned) supplies interaction semantics; CSS Modules supply the visual treatment.
   - Exact class-name types are generated per module (`*.module.d.css.ts`, TypeScript `allowArbitraryExtensions`), so a misspelled class is a type error.
   - Each component exports a §13 documentation contract (`*.docs.ts`). All 46 start as Experimental (§35).
   - React Aria's toast API is still `UNSTABLE_` in 1.21.1 and is isolated in one file.
   - `DesignSystemProvider` applies theme, density and motion to the document root once. System theme follows `prefers-color-scheme` live. A reduced-motion choice adds to the system setting and never overrides it.
6. **Enforcement.**
   - `scripts/check-styles.mjs` rejects the following in the design system and `apps/web`:
     - raw colours, named and system colours (system colours are allowed only inside `forced-colors` blocks);
     - raw font families, type sizes, shadows, radii, durations and lengths;
     - z-index values and `!important`;
     - unknown token variables.
   - A deliberate raw value needs a same-line `token-exception: <reason>`, and every exception is listed: currently ten.
   - `scripts/check-components.mjs` requires the complete documentation contract, rejects a Stable status without evidence, and requires a story for every documented state.
7. **Storybook.**
   - Storybook 10.6.1 (`storybook`, `@storybook/react-vite`) documents and exercises every component, with toolbar globals for theme, density, motion and locale. `en-XA` is a pseudolocale.
   - Telemetry and update notifications are disabled.
   - The docs add-on is not in the dependency baseline, so a Documentation story renders each §13 contract.
8. **Browser evidence.**
   - Playwright 1.63.0 with `@axe-core/playwright` 4.13.0 runs against the static Storybook build in a new CI stage, `design-system-browser`.
   - It covers axe WCAG 2.2 A/AA on every story in Paper and Ink; 44 px targets; focus treatment and contrast; dialog containment and restoration; keyboard operation; reduced motion; forced colours; theme resolution; fonts; 320 px reflow; 200% text; and inspection placement.
   - This is Chromium automation evidence only (§34).
9. **Fonts.**
   - Source Sans 3 release 3.052R (OFL-1.1) is self-hosted from `src/assets/fonts/`, in weights 400, 600 and 700, with checksums and provenance in its manifest. Synthetic styles are disabled.
   - The fallback face's `size-adjust` and ascent, descent and line-gap overrides are measured by `scripts/measure-font-metrics.mjs` from the release TTFs against Liberation Sans (metric-compatible with Arial), weighted by the standard's own character frequencies.
   - The card-face families are defined as tokens and fall back to Source Sans 3. Their font files are not imported: the legacy files are trial or unlicensed builds, and this repository is public.
10. **Dependencies and policy.** Every addition is pinned at the planned register version in `packages/design-system`:
    - `style-dictionary` 5.6.0, `storybook` and `@storybook/react-vite` 10.6.1, `vite` 8.3.2, `@vitejs/plugin-react` 6.1.2;
    - `@playwright/test` 1.63.0, `@axe-core/playwright` 4.13.0, `typescript` 6.0.3, `@types/node` 24.19.1.

    The policy decisions:
    - **esbuild's postinstall** is denied through `allowBuilds: { esbuild: false }`. The script only verifies the platform binary, or downloads it when missing; the lockfile-pinned `@esbuild/linux-x64` package with its integrity hash is used instead.
    - **CC-BY-4.0 license (decision D16).** Storybook's documentation tooling pulls in `caniuse-lite` (CC-BY-4.0, build-time data), and the Director approved adding CC-BY-4.0 to the CI license allowlist. Attribution is carried in the generated third-party notices.
    - **Audit.** `pnpm audit` reports no advisories.

## Interpretations made where the standard is silent

Recorded for the Director's review; none changes an established decision.

- **Motion ranges.** Where §26 gives a duration range, the semantic token uses the lower bound and both bounds are recorded as primitives. Under reduced motion, hover, menu, card, major-event and reward durations become 0 ms, and dialog and binder changes keep a 120 ms fade with no spatial travel.
- **Ink overlay shadow.** §12 says only "restrained dark shadow plus a visible boundary". Ink overlays reuse the Paper shadow geometry and opacity, and the strong border carries the boundary.
- **Component tokens.** These are chosen from the approved scales: control padding 16 px, dialog width 32rem, sheet width 28rem, tooltip cap 20rem, icon 24/20 px with a 2-unit stroke, and inspector gap 24 px.
- **Reading measure.** The reading-column token is 75ch, the upper bound of the standard's 60–75 range.
- **Icon family.** No icon library is in the dependency baseline, so a small authored 24-unit line icon family covers interface symbols until an approved family exists.
- **Animation speed.** Animation speed is bounded to 0.5–2× in the preference model; §31 sets only the 1× default.

## Consequences

- Components consume only semantic and component tokens, and theme switching needs no component code.
- Design-system styling and the diagnostic web page now share one token source. The web app wraps itself in `DesignSystemProvider` and shows the fan-content notice.
- The CI pipeline gains one stage, about 1.5 minutes.
- The release artifact's design-system `dist/` includes its fonts and stylesheets.
- `packages/design-system` never imports Babylon or server code, which a test enforces. Renderer colours are plain data exported at `@lorcana/design-system/renderer`.
- **Font metrics in headless Linux Chromium.** Vertical overrides match: the line box is within 1 px. Linux FreeType hinting of the adjusted Liberation Sans leaves a width difference of about 4.5% on a sample sentence. Real Windows and macOS fallback behaviour needs the UX-02 browser matrix.

## Alternatives considered

- **Style Dictionary's built-in transforms.** Rejected: its documentation states incomplete DTCG 2025.10 support. Our formatters handle the subset's value objects explicitly, and resolution is cross-checked.
- **A custom workbench instead of Storybook.** Rejected by the Director in favour of the planned Storybook baseline (D16).
- **A Vitest/jsdom component suite.** jsdom is not in the baseline, and real-browser Playwright evidence is stronger for focus, layout and contrast.

## Amendment — 2026-10-20 UTC (decision D18)

The browser evidence of decision item 8 now runs as a separate parallel CI job, `design-system`, rather than a stage inside the foundation pipeline, which keeps its 900 s budget. Both use the same isolated launcher and container. See [the CI runbook](../runbooks/ci.md) and CHG-20261020-006.

## Amendment — 2026-10-20 UTC (decision D19)

The previous amendment said the foundation pipeline keeps its 900 s budget. Hosted run 39477270644 then timed out without the design-system stage, so decision D19 raises the isolated pipeline command limit to 1500 s for both jobs. See CHG-20261020-007.
