# UX-01 implementation plan — matched reference screens

Status: plan written after the Director approved the [written design](2026-10-22-ux-01-design.md) (decision D28). Recorded 2026-10-22T06:31:38.935Z (CHG-20261022-004). Base: main 4d9dfc7; branch `claude/ux-01-reference-screens`. Publishing this plan executes none of its steps. Building starts at task 1, and each task ends at a checkpoint with its own evidence.

**Goal.** Build the four approved reference screens (crowded match, practical deckbuilder, Collection binder, pack presentation) as interactive Storybook compositions on real cards, with the first static Babylon table scene under the match, ready for the Director's visual approval.

**Architecture.**
- New components start Experimental in `packages/design-system`, and the screens are story-only compositions.
- The reference fixture extends `packages/rules-data`.
- The table scene lives in `packages/presentation`. The match story loads it through a development-only dependency, and a DOM layer of real buttons carries all interaction and semantics.
- `apps/web` is untouched.

**Stack.** Everything is already pinned, and no dependency is added. Node 24.21.0, pnpm 10.33.0, TypeScript 6.0.3, React 19.3.0, react-aria-components 1.21.1, Storybook 10.6.2, Vite 8.3.3, Playwright 1.63.0 with @axe-core/playwright 4.13.0, @babylonjs/core 9.29.0. The only manifest change is the design-system package's `devDependencies` entry `"@lorcana/presentation": "workspace:*"`.

**Spec.** The [written design](2026-10-22-ux-01-design.md) and its [Director's review](2026-10-22-ux-01-design.md#directors-review-decision-d28). The [intake](2026-10-22-ux-01-intake.md), D27 and D28 keep the choices and their limits.

## Global constraints

- **Location.** Run every command inside the existing Dev Container (rediscover the workspace container ID first). Run one heavyweight check at a time: Storybook build with the browser suite, the foundation pipeline, or a clean copy.
- **Real cards only (D25).** Every card shown is a real printing from the recorded 2026-10-21 acquisition. Player names, the match position, ownership figures and pack contents are invented. They live only in `packages/design-system/stories/support/reference/`, and every screen shows the demonstration label.
- **Official assets (D07).** Each new image has recorded provenance. Every screen keeps a complete takedown fallback with `officialAssets` off, and the fan-content notice stays reachable.
- **Design-system rules (ADR 0017).** Token-only styling, generated CSS-module class types, a §13 documentation contract and a story for every documented state. No component is marked Stable.
- **Boundaries.**
  - Design-system components never import `@lorcana/presentation`; only story files do, through a dynamic import.
  - Presentation does not import the design system. Theme colours and the card-back URL reach the scene as input.
  - Nothing browser-side imports engine, server or credential code.
- **Scope.** No live play, engine use, economy, ownership service, app route or catalog delivery. No performance figure from the scene (WEB-01).
- **Process.**
  - No push, pull request or main merge without the Director's request.
  - No spending, deployment or host-setting change.
  - Preserve failed runs.
  - Each checkpoint has a schema-1 change record, `pnpm evidence:run` receipts, `docs:sync` and `docs:check`, full file coverage and current documents.

## Review focus

1. **The scene and the DOM disagree.** The scene, the Flat-tier battlefield and the overlay buttons must all read one position object. Tasks 7 and 8 test that every board object appears once in each, with the same name and state.
2. **Overlay buttons drift from the cards.** `cardRects()` must project from the same camera and canvas size that rendered the frame, and the overlay must recompute after resize. Task 8 tests alignment at all three viewports.
3. **The scene leaks or loops.** No render loop runs, and unmount releases the engine, textures and observers. Task 8 tests this with Babylon's `NullEngine` and a forced failure.
4. **Inaccessible density.** The crowded match and the binder must pass axe, 44 px targets, keyboard journeys, 320 px reflow and 200% text without hiding information. Tasks 3–9 add these checks to the browser suite.
5. **Fixture drift.** The reference fixture must be exactly what its selection derives from the recorded snapshot. Task 1 extends `catalog:verify` to prove it.

## File ownership

New files have one responsibility. Each new document is classified in `docs/documentation-map.json` when created, and existing source-impact edges are reviewed before editing.

| Owner | Files | Responsibility |
|---|---|---|
| Reference fixture | `packages/rules-data/fixtures/reference-selection.json`; `scripts/select-fixtures.mjs`, `catalog-lib.mjs`, `verify-fixtures.mjs`; `src/fixtures/reference.json`, `reference-images.json`; `src/fixtures.ts`; `tests/catalog.test.mjs`; images in `fixtures/images/` | Real printings for the four screens with a reason each, thumbnails for all and detail images for the inspected few, exact snapshot verification |
| Card back | `packages/design-system/src/assets/card-back/` (`lorcana_card_back.jpg`, `manifest.json`); `src/components/CardBack/`; `scripts/copy-static.mjs`; `scripts/browser-tests.mjs` (JPEG content type) | The official back byte for byte with provenance; the neutral back under takedown |
| Room frame | `src/components/NavigationBar/`, `RoomHeader/`, `DemonstrationLabel/`, `InkFormSlot/`, `NotificationCount/`; `.storybook/preview.tsx` (the "Show artwork slots" toolbar switch) | Shared room chrome, demonstration label and ink-form reservations |
| Deckbuilder | `src/components/FilterBar/`, `CatalogResults/`, `CatalogTileControls/`, `DeckList/`, `DeckSummary/`, `CostCurve/`, `ValidationSummary/`, `SaveState/`, `ImportPreview/`, `ExportDialog/` | The deckbuilder's parts |
| Collection | `src/components/SetPicker/`, `ViewSwitch/`, `CompletionSummary/`, `BinderSpread/`, `BinderPocket/`, `BinderNavigation/` | The binder's parts |
| Packs | `src/components/ProductChoice/`, `PackReveal/`, `RevealCard/`, `RevealControls/`, `OpeningSummary/` | The opening flow's parts |
| Match (DOM) | `src/components/PlayerSummary/`, `Counter/`, `ZoneCount/`, `TurnContext/`, `BoardCard/`, `Battlefield/`, `HandFan/`, `HandList/`, `ActionPanel/`, `EventLog/`, `MatchChrome/`, `SceneOverlay/` | Match chrome, the Flat-tier battlefield and semantic board, and buttons over the scene |
| Table scene | `packages/presentation/src/table-scene.ts`, `src/index.ts`; `tests/table-scene.test.mjs` | `mountTableScene`, on-demand rendering, projection and disposal |
| Shared design-system files | `src/index.ts` (exports), `src/foundation/messages.ts` (strings, `en-XA` derived) | Edited by every component task |
| Reference screens | `packages/design-system/stories/reference/*.stories.tsx`; `stories/support/reference/*.ts` | Story-only compositions and demonstration data |
| Browser checks | `packages/design-system/tests/browser/reference.spec.ts`; the existing specs only where the story count changes | Journeys, scene checks, reflow and takedown on the reference screens |
| Documents | ADR 0017 amendment; design-system runbook and validation; card-catalog runbook and validation; features, map, backlog, handoff, status lines; change and run records | Current state and evidence |

Each component folder follows the existing pattern: `Name.tsx`, `Name.module.css`, the generated `Name.module.d.css.ts` and `Name.docs.ts`. Generic data reaches components as props and never as fixture imports.

## Shared interfaces

The match position is authored once in `stories/support/reference/match.ts` and mapped to two inputs: the props of the DOM components and the scene input below. Names are indicative; the exact fields are fixed in task 7 and recorded in the component docs.

```ts
// packages/presentation/src/table-scene.ts. Closed, bounded data: no fixture or design-system import.
export type Rgb = readonly [number, number, number];          // linear 0..1, from rendererColors.<theme>.*.linear
export interface TableCard {
  id: string;                                                  // stable, unique; matches the DOM object id
  side: 'player' | 'opponent';
  zone: 'play' | 'location' | 'item' | 'inkwell' | 'deck' | 'discard' | 'hand';
  slot: number;                                                // order within the zone, 0-based
  faceUp: boolean;
  imageUrl: string | null;                                     // the card thumbnail; null shows the neutral face
  exerted: boolean;
  stackDepth: number;                                          // Shift stack and cards under, 0 for none
  atLocation: string | null;                                   // id of a location card on the same side
  highlight: 'none' | 'selected' | 'valid-target';
}
export interface TableSceneInput {
  colours: { table: Rgb; zone: Rgb; focus: Rgb; shadow: Rgb };
  cardBackUrl: string | null;                                  // null under takedown: neutral back
  cards: readonly TableCard[];                                 // at most 120
}
export interface CardRect { id: string; x: number; y: number; width: number; height: number; quarterTurns: 0 | 1 }
export interface TableScene {
  update(input: TableSceneInput): Promise<void>;               // re-renders once when textures are ready
  cardRects(): readonly CardRect[];                            // CSS pixels relative to the canvas
  dispose(): void;                                             // idempotent
}
export function mountTableScene(canvas: HTMLCanvasElement, input: TableSceneInput, options?: RenderOptions): Promise<TableScene>;
```

Validation rejects unknown fields, duplicate ids, unknown zones, a missing location, out-of-range colours, non-integer or negative slots and more than 120 cards. Rejection happens before anything is created. A failure after creation disposes everything and rejects, so the story can switch to the Flat tier.

## Task 1: Reference fixture

**Files:** the reference-fixture row above. The existing presentation fixture and its 12 printings stay unchanged.

- [ ] **Choose the printings.** Use a scratch query over the ignored raw catalog; it is not committed. Write each printing to `reference-selection.json` with its reason and a `detail` flag:
  - two Core-legal 60-card decks of two inks each, mainly Hyperia City, covering Shift, Singer and a song, a location with a move cost, items, and Evasive, Bodyguard, Ward, Rush, Challenger and Resist;
  - two binder spreads of Hyperia City in different ink sections, plus special printings for the foil and special states;
  - the 12 pack cards (6 common, 3 uncommon, 2 rare or higher, 1 foil), overlapping the binder where possible;
  - `detail: true` only for the printings the stories inspect (about six).
- [ ] **Write the failing test first.** In `tests/catalog.test.mjs`, assert:
  - the reference fixture exists and has a unique reason per printing;
  - every image file's SHA-256 matches its record;
  - thumbnails total at most 4 MB and detail images at most 3 MB;
  - every deck printing's catalog rotation state (`set_rotation_state`, normalized as `rotation`) is `CoreConstructed`.

  Run `pnpm --filter @lorcana/rules-data test` and keep the failure.
- [ ] **Extend the scripts.**
  - `select-fixtures.mjs` writes both fixtures.
  - `fixtureImageSources` takes the selection's detail flags, so reference printings get thumbnails and only flagged ones get details.
  - Images shared with the presentation fixture are stored once.
  - `verify-fixtures.mjs` checks both fixtures against the recorded snapshot.
  - Run `node scripts/select-fixtures.mjs docs/rules/2026-10-21-ravensburger-catalog.json` from the package. This makes public GET requests to Ravensburger's image host, as in the original acquisition.
- [ ] **Export it.** `src/fixtures.ts` gains `referenceCatalog`, `referenceSelection`, `referenceImages` and `referencePrinting(id)`, using the same image record type.
- [ ] **Run the checks.**
  - `pnpm --filter @lorcana/rules-data build`
  - `pnpm --filter @lorcana/rules-data test`
  - `pnpm --filter @lorcana/rules-data catalog:verify`
  - `pnpm boundaries`
  - `pnpm lint`
- [ ] **Checkpoint.** Update the card-catalog runbook and validation, record the change and capture the receipts.

## Task 2: Card back

**Files:** the card-back row above.

- [ ] **Copy the file.** Copy `/home/andre/the-inkspire/public/assets/cards/lorcana_card_back.jpg` unchanged into `src/assets/card-back/`.
- [ ] **Write the manifest.** It records:
  - the source path and the byte-identical LorcanaOnline original;
  - the legacy catalog key `material.card.back` with its note and approval date;
  - size, dimensions and SHA-256;
  - the D07 rights basis and the takedown note.
- [ ] **Test first.** `tests/components.test.mjs` asserts that the manifest's hash and size match the file, and that the file decodes as JPEG at 1468 × 2048.
- [ ] **Build the component.**
  - `CardBack` draws the official back at the card silhouette.
  - With `officialAssets` off it draws the neutral back from tokens: paper surface, ink rule border, no product marks.
  - The package exports `cardBackImageUrl` (`new URL('./assets/card-back/lorcana_card_back.jpg', import.meta.url).href`) for the scene input.
  - `copy-static.mjs` copies `.jpg` files and `browser-tests.mjs` serves `image/jpeg`.
- [ ] **Stories and docs.** Add stories for the official back, the neutral back, and the face-down quiet and small sizes, with the coverage declared. Write the docs contract.
- [ ] **Run the checks.**
  - `pnpm --filter @lorcana/design-system typecheck`
  - `pnpm --filter @lorcana/design-system test`
  - `pnpm boundaries`
  - `pnpm lint`
- [ ] **Checkpoint.**

## Task 3: Room frame

**Files:** the room-frame row and the shared design-system files.

- [ ] **Build the components.**
  - `NavigationBar`: the wordmark, Play, Collection, Decks, Lab, Learn, Events and Profile, the notification count and the profile menu. Links are React Aria links with `aria-current`. Below 64rem it collapses to a menu button.
  - `RoomHeader`: the title, metadata and action slot.
  - `DemonstrationLabel`: the fixed sentence in the metadata role.
  - `InkFormSlot`: empty by default, outlined with its name and size when the toolbar global is on, hidden below 80rem.
  - `NotificationCount`: quiet; the count is in the accessible name and is never red by default.
- [ ] **Strings.** Add the strings to `messages.ts`; `en-XA` is derived.
- [ ] **Stories and tests.** Write the stories and docs contracts. In a new `tests/browser/reference.spec.ts`, check the navigation keyboard path, the collapsed menu, the slot toggle and that slots never cover a control.
- [ ] **Run the checks.**
  - `pnpm --filter @lorcana/design-system typecheck`
  - `pnpm --filter @lorcana/design-system test`
  - `pnpm --filter @lorcana/design-system test:browser` (heavyweight)
- [ ] **Checkpoint.**

## Task 4: Deckbuilder

**Files:** the deckbuilder row; `stories/reference/Deckbuilder.stories.tsx`; `stories/support/reference/decks.ts` and `format.ts` (the "Core (demonstration policy)" record).

- [ ] **Components.** Build them against the design's composition.
  - `CatalogTileControls` is the D28 row: Remove, quantity, Add. Each is at least 44 px, and Remove is disabled at zero with a reason.
  - Pressing the `CardTile` opens the existing `CardInspector`.
  - Validation sections keep rules, ownership and advice apart, each naming the card, quantity, reason and policy version.
- [ ] **Reference story.** `DeckbuilderReference` composes the room frame, the catalog and deck regions and a local edit model: unsaved state, undo, a leave guard and a save conflict. It has one story per design state (11).
- [ ] **Browser checks.**
  - add and remove by pointer, touch emulation and keyboard;
  - focus returns to the originating tile after inspection;
  - filters never discard edits;
  - the leave dialog;
  - portrait Catalog/Deck tabs with the summary bar;
  - 320 px reflow and 200% text.
- [ ] **Run the checks** as in task 3, then **checkpoint**.

## Task 5: Collection binder

**Files:** the Collection row; `stories/reference/Collection.stories.tsx`; `stories/support/reference/ownership.ts`.

- [ ] **Components.**
  - `BinderSpread` fits 3 × 3 faces: 144 px preferred, 12 px gaps, 16 px padding, a minimum usable size, and one face when space is short.
  - `BinderPocket` covers owned, missing, unknown, unavailable, loading and padding. Padding is not focusable, and unavailable never shows zero.
  - `BinderNavigation` has previous and next, the page indicator, "Go to card number", and page keys scoped to the focused binder.
  - `CompletionSummary` uses the standard-printing denominator, counts special printings separately and keeps foil availability and ownership separate.
- [ ] **Reference story.** `CollectionReference` has one story per design state (10). The completion figure reads "112 of 204 printings owned".
- [ ] **Browser checks.**
  - paging by buttons and keys;
  - offscreen pages out of the focus order;
  - reading order across the spread;
  - "Go to 142" anchoring through a resize;
  - the single face at portrait;
  - reduced motion.
- [ ] **Run the checks** as in task 3, then **checkpoint**.

## Task 6: Pack presentation

**Files:** the Packs row; `stories/reference/Packs.stories.tsx`; `stories/support/reference/pack.ts`.

- [ ] **Components.**
  - `PackReveal` runs pending → ready → revealing(n) → summary, with resume at n.
  - Its face-down cards use `CardBack`.
  - `RevealControls` offers Reveal next (Enter or Space), Reveal all and Skip to summary, and none of them waits on decoration.
  - `RevealCard` shows rarity as text, Foil and New.
  - The rarest beat is restrained light around the card within 900 ms, and in reduced motion the card is replaced directly.
- [ ] **Reference story.** `PackReference` has the design's ten states, with the demonstration composition sentence.
- [ ] **Browser checks.**
  - Skip and Reveal all always reach the summary;
  - resume shows the same contents in the same order;
  - reduced motion shows the same contents;
  - the failure state lists the contents as text;
  - portrait shows three rows of four.
- [ ] **Run the checks** as in task 3, then **checkpoint**.

## Task 7: Crowded match, Flat tier

**Files:** the Match (DOM) row, except `SceneOverlay`; `stories/reference/Match.stories.tsx`; `stories/support/reference/match.ts`.

- [ ] **Author the position.** Turn 7 from the design: the player has 12 lore and 7 ink with 5 ready, the opponent 14 lore. Each printing records its reason, and the format record supplies the thresholds.
- [ ] **Components.**
  - `BoardCard` shows state as text and icon: exerted, damage, drying, Shift stack, cards under, "At <location>", modifier chips.
  - `Battlefield` is the Flat-tier layout and the semantic board: a labelled region per side and zone, with real buttons.
  - `ActionPanel` implements the command machine of the interaction specification with fixture receipt outcomes.
  - `HandFan` and `HandList` share actions.
  - `EventLog` and the inspector share a tab region.
  - `MatchChrome` replaces the navigation bar and holds the menu with the fan-content notice and concede.
- [ ] **Reference story.** `MatchReference` has the 14 design states, with the scene off. The Flat-tier and takedown states are complete here.
- [ ] **Browser checks.**
  - a keyboard journey: select a character, quest, review, submit, pending, accepted;
  - challenge targets with reasons;
  - Escape semantics before and after submission;
  - live-region content limited to the design's list;
  - the log sheet at 1180 px and portrait stacking;
  - every board object reachable and named.
- [ ] **Run the checks** as in task 3, then **checkpoint**.

## Task 8: Table scene

**Files:** the table-scene row; `SceneOverlay`; the design-system `devDependencies` entry; the scene states in `Match.stories.tsx`.

- [ ] **Failing tests first.** Add `packages/presentation/tests/table-scene.test.mjs` with `NullEngine`. It covers:
  - input validation refusals (each rule in the shared-interfaces section);
  - one mesh per card and none extra;
  - no render loop: frames advance only on mount, `update` and resize;
  - `cardRects()` deterministic for a fixed canvas size, inside the canvas, quarter-turned for exerted cards;
  - repeated mount and dispose releasing scene, engine, textures and observer;
  - a failing `createEngine` and a failing texture both rejecting with everything disposed.

  Run `pnpm --filter @lorcana/presentation test` and keep the failure.
- [ ] **Implement `mountTableScene`.**
  - A fixed camera tilted about 20–25°.
  - Linear theme colours from the input.
  - Zone planes, one key light and a soft fill, contact shadows.
  - Rounded card meshes textured from thumbnails, with face-down cards using `cardBackUrl`.
  - Exerted rotation, Shift offsets and outline rings for highlight.
  - Render on demand only.
  - `RenderOptions` stays injectable, as in `mountSanityScene`.
- [ ] **Overlay.** `SceneOverlay` places one real button per board object at its projected rectangle, recomputed on resize. Buttons are at least 44 px with the same names and state text as `Battlefield`, and the canvas is `aria-hidden`.
- [ ] **Wire the story.** The match story imports `@lorcana/presentation` dynamically, maps the position to `TableSceneInput` with `rendererColors` and `cardBackImageUrl`, and switches to the Flat tier with the renderer-failure message on any rejection.
- [ ] **Browser checks** (software WebGL):
  - the canvas exists and is `aria-hidden`;
  - overlay button count and names equal the Flat-tier board's;
  - each button lies inside the canvas and over its card's rectangle at all three viewports;
  - a forced engine failure shows the Flat tier;
  - axe passes.

  Visual comparison of the scene stays a human review.
- [ ] **Run the checks.**
  - `pnpm --filter @lorcana/presentation build`
  - `pnpm --filter @lorcana/presentation test`
  - `pnpm boundaries`
  - the design-system checks as in task 3
- [ ] **Checkpoint.**

## Task 9: Validation, documents and visual review

- [ ] **Full static and package checks.** `pnpm verify`, `pnpm test`, and `pnpm --filter @lorcana/design-system test:browser` with both themes in the suite.
- [ ] **Isolated pipelines.** Run `python3 scripts/ci-local.py --suite design-system`, then the foundation pipeline, one at a time.
- [ ] **Captures.** Capture every reference state at 1440 × 900, 1180 × 820 and 820 × 1180 in Paper and Ink, into the ignored `.local/ux-01-review/`.
- [ ] **Agent review.** Review the captures against the §33 rejection criteria and record the findings in the design-system validation.
- [ ] **Documents.**
  - the ADR 0017 amendment: reference stories, the dev-only presentation dependency, the new components and the card back;
  - the reference-screens section in the design-system runbook and a dated UX-01 section in its validation;
  - the features register, map edges from `packages/presentation/**`, the backlog row, the handoff and the status lines.
- [ ] **Checkpoint.**

## Task 10: Hosted CI and the Director's approval

- [ ] **Hosted CI.** When the Director asks, push the branch and open the pull request, then record both hosted jobs.
- [ ] **Visual review.** The Director reviews the screens. The approval, with any changes, is recorded as a decision and closes UX-01's reference-direction acceptance. UX-02, UX-03 and WEB-01 follow in the documented order.

## Not claimed by this plan

Other browsers, devices and manual accessibility journeys (UX-02). The enhanced inspector (UX-03, D24). Scene lifecycle, tiers, frame measurement and context restoration (WEB-01). Live play (WEB-02). Pack economics (ECON-02, WEB-03). Stable component status.
