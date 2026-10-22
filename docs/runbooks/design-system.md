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

## Icons and gameplay symbols

- **Interface icons:** use `Icon` (decision D21), never Phosphor directly.
  - **Adding an icon:** add one entry to `src/components/Icon/registry.ts` with its meaning, importing the single icon from `@phosphor-icons/react/dist/ssr/<Name>`.
  - **Sizes:** `size="standard"` (20 px) for controls; `size="prominent"` (24 px) for prominent navigation.
  - **Selected states:** `selected` switches to the Fill weight. Keep a label or accessible state as well.
  - **Banned weights:** Thin, Light, Bold and Duotone. A test enforces this.
- **Printed gameplay symbols:** use `GameSymbol` (lore, exert, inkable, uninkable, strength, willpower) and `InkIdentity`, never a package icon.
- **Adding a symbol:**
  1. Copy the source SVG byte for byte into `src/assets/symbols/`.
  2. Record its origin (Ravensburger's public digital assets or the Director's own drawing), checksum and rendition in `src/assets/symbols/manifest.json` (rights basis D07).
  3. Run `tokens:build`.

  The parser refuses anything outside a small vector subset (paths, polygons, circles, plain groups, class fills). Single-colour symbols must have exactly one fill.
- **Takedown switch:** `officialAssets={false}` on the provider swaps every symbol and card image for a neutral placeholder. It covers anything depicting Disney Lorcana marks, whoever drew it.

## Cards in components and stories

- **Real cards only (decision D25):** stories and browser tests use real catalog cards from `@lorcana/rules-data/fixtures` ([card catalog runbook](card-catalog.md)), never made-up cards.
  - **Mapping:** `stories/support/fixtures.ts` maps a catalog printing to the presentational `Printing` (`toPrinting`).
  - **Images:** Storybook serves the fixture images at `/catalog-images/`.
- **Card tile (decision D26):** `CardTile` shows the card itself, as one button named "Inspect <name> – <version>".
  - **Under the card:** nothing. Names, set, rarity, inks and ownership belong to the inspector.
  - **Foil printings:** they keep a static "Foil" mark on the card's corner.
  - **Hover and press:** they change the outline only, never the art.
- **Takedown switch:** `CardImage` follows `officialAssets={false}` and shows the neutral placeholder, as symbols do.
- **Face-down cards (decision D28):** `CardBack` shows the official card back from `src/assets/card-back/` (provenance in its `manifest.json`), unchanged and scaled by the browser. It is decorative unless given a `label`, and it follows the takedown switch with a neutral back drawn from the tokens. Presentation code textures face-down cards from `cardBackImageUrl` rather than importing the component.
- **Reference screens (UX-01):** use the reference fixture (`referenceCatalog`, `referencePrinting`, `referenceImage`) for the decks, binder spreads and pack; its images share `/catalog-images/`.

## Reference screens (UX-01)

- **Where:** `stories/reference/` holds the reference compositions; `stories/support/reference/` holds their demonstration data, room text (`useReferenceText`, which the en-XA toolbar locale lengthens) and links between screens (`storyHref`).
- **Room frame:** every room outside the match uses `RoomFrame` with a `NavigationBar` (the primary destinations of blueprint §10.1; a secondary surface such as pack opening marks its parent), an `AccountMenu`, a `RoomHeader` and named `InkFormSlot`s on both perimeters (decision D27).
- **Alignment:** the navigation bar's content edge follows the room's gutters and the perimeter reservation, so the wordmark lines up with the room content at every width.
- **Artwork slots:** the Storybook toolbar's "Artwork slots" switch outlines each slot with its name and extent; a room never sets it itself.
- **Bleed:** reference stories set `parameters.designSystem.bleed` so the room reaches the viewport edge.
- **No dead controls:** navigation between reference screens uses real story links. Rooms outside the reference set lead to an honest page saying so.
- **Demonstration label:** every reference room shows `DemonstrationLabel` in its header or chrome, never over a card.
- **Deckbuilder:** `DeckWorkspace` lays out the catalog (`FilterBar`, `ViewSwitch`, `CatalogResults` with `CatalogTileControls`) and the deck (`DeckPanel` with `DeckHeader`, `DeckList`, `DeckSummary` and `CostCurve`, and a footer for `ValidationSummary` and Save).
  - **Narrow layouts:** below 64 rem it becomes one pane with Catalog and Deck tabs and a summary bar.
  - **Inspection:** keep `InspectorHost` mounted in the workspace's inspector slot, so closing returns focus to the originating tile.
  - **Format values:** the deck size, copy limit, ink limit and rotation come from the story's format record (`stories/support/reference/deck.ts`), never from components.
  - **Import and export:** `ImportPreview` reports unresolved lines before anything changes, and `ExportDialog` requires an explicit format.
- **Collection binder:** `Binder` shows one or two faces by content fit (a hidden probe holds the two-face minimum from the binder tokens).
  - **Anchoring:** it follows an anchor page, so Go to card number and resizes keep the printing in view.
  - **Pockets:** each is a `BinderPocket` (owned, missing, unknown, unavailable, loading, padding, filtered). `PocketGrid` is the Grid view.
  - **Completion:** `CompletionSummary` uses the standard printings as its denominator and keeps special printings and foils apart.
  - **Inspection:** place the inspector with `InspectorLayout`, keeping the host mounted.
  - **Data:** the binder pages come from `stories/support/reference/binder.ts`. Ownership there is demonstration data on printings with images only.

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
- `pnpm --filter @lorcana/design-system test:browser` builds Storybook and serves it on 127.0.0.1:6007. It then runs the Playwright and axe Chromium suite with font hinting off, so glyph spacing matches desktop browsers. In CI, the parallel `design-system` job runs the gates and this suite in the isolated container (`python3 scripts/ci-local.py --suite design-system`, decision D18).
- `pnpm --filter @lorcana/design-system storybook` starts the development server on port 6006 with telemetry disabled.

## Fonts

- **Interface:** Source Sans 3 3.052R (OFL-1.1), weights 400, 600 and 700, in `src/assets/fonts/` with checksums and provenance in `manifest.json`.
- **Card faces (decision D20):**
  - The Bystander Collection Sans Regular for titles;
  - Brandon Text Cond (HvD trial builds) at 400, 400 italic, 500, 700 and 900 italic;
  - Century Gothic Regular for numbers.

  The manifest records each file's source, checksum and embedded rights text. Import only weights a card role uses.
- **Card Text Fallback:** the Brandon trial builds cover 70 characters (see the manifest). `Card Text Fallback`, Source Sans 3 matched to Brandon's cap height, draws everything else, including quotes, apostrophes, parentheses, dashes and accented letters. This is an accepted, permanent limitation.
- **Measuring:**
  - Interface fallback: `node scripts/measure-font-metrics.mjs <corpus> <web> <fallback> …` (TTF or WOFF2).
  - Card Text Fallback: `--cap-height <web> <fallback> …`.

  Re-measure whenever a font file changes and record the values in the manifest. The tests recompute the card values from the files.

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
