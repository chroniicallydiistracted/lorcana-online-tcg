# UX-01 rework — direction study design

Status: proposed 2026-10-23 (CHG-20261023-002) after the Director declined the first reference screens (D29) and ordered a complete rework (D30). It awaits the Director's approval together with the direction-study prototypes it describes. Nothing here is approved until then. Branch `claude/ux-01-reference-screens`; it supersedes the visual and composition parts of the [first written design](2026-10-22-ux-01-design.md). That design's states, data and honesty rules still apply.

## Why the first set failed

The [design audit](../audits/2026-10-23-ux-01-design-audit.md) found three causes:
- **No visual world.** The first design specified components and states, so the build produced only a neutral control layer.
- **Legacy compositions.** The layouts came from the legacy app instead of from each player's task.
- **No interactivity.** Nothing moved, and the pack opening was a grid.

This design therefore starts from the world, then composes each room from its task, then specifies the interactions. Every claim names the proof that the design review gate (D30) will check. A claim without proof is declined.

## Sources of truth

- **The Director's creative brief (2026-10-12):**
  - **Rooms and identity:** rooms of one world, each with its own atmosphere and materials. Deeply Lorcana-native, in an original style. The lead motif is the Illumineer's craft, set in an abstract realm of ink, paper and light with no literal furniture.
  - **Shape and colour:** a flowing-ink shape language, with organic, brushed edges and pooling forms. True ink-and-paper neutrals in both themes, and ink colours as accents only.
  - **Pace and spectacle:**
    - magical spectacle at big moments only, on a calm, readable table;
    - instant response to every input, with an unhurried flow of play;
    - weighty, physical card motion;
    - Marvel Snap's snappiness and big-moment effects as the quality reference, but not its shape language.
  - **Rooms specifically:**
    - a 2.5D tactile board with real depth and light;
    - a ceremonial pack reveal that builds to the rarest card;
    - a Collection of binder pages;
    - a Lab that works like a precision instrument.
- **Decisions:**
  - D07: official assets, recorded provenance and a takedown fallback.
  - D20 and D21: fonts, icons and symbols.
  - D25: real cards only.
  - D26: tiles show the card.
  - D27: one matched set.
  - D28: official card back, the deckbuilder's quantity row and the top bar.
  - D30 adds:
    - a complete, original rework;
    - legacy styling as inspiration only, never its layouts;
    - a 3D, animated, interactive pack opening;
    - binder pages that flip, at a fixed aspect ratio;
    - an interactive board with its own identity;
    - procedural ink.
- **The UX standard:** §4 visual grammar, §5 room emphasis, §12 geometry, §17 binder, §18 deckbuilder, §19–§21 match and states, §23 packs, §25 accessibility, §26 motion and §33 rejection criteria.
- **The blueprint:** §11.1, a living Illumineer's tabletop: tactile card materials, ink-like transitions, controlled camera composition, card handling.

## The world: ink, paper and light

1. **Living ink (procedural, D30).** Each room stands on a field of slowly moving ink.
   - **Rendering:** a WebGL2 fragment shader (domain-warped fractal noise), in a design-system component, `InkField`, with no Babylon.
   - **Per room:** a fixed seed and a fixed palette, so the ink is authored and stable, as standard §4 requires.
   - **In Ink:** near-black ink whose edges catch a faint sheen of the room's ink colour.
   - **In Paper:** clean paper with grey-black ink pooling only at the room's edges.
   - **Budget:** at most 30 frames per second at half resolution. It pauses when hidden, and shows one static frame under reduced motion.
   - **Text:** it is never under text without an opaque sheet between them.
2. **Paper sheets.** Text sits on opaque sheets.
   - **Edges:** each sheet has a deckled edge, a seeded mask made once per size, and a contact shadow.
   - **Stacking:** sheets overlap slightly, like loose leaves.
   - **Ink sheets:** in Ink, sheets are dark ink paper with fibre texture at very low contrast.
   - **Unchanged:** controls keep the 4 px geometry of standard §12, so the hit areas stay stable.
3. **Light.**
   - Each room has one key light: warm lamplight in the Collection, cool precise light in the Lab, ivory light on the pack's pedestal, and deep blue moonlight over the match.
   - Focus and hover gather a soft pool of that light; nothing glows on its own.
4. **Ink colours** appear only on identity elements: ink droplets for filters, ink pools for zones, curve fills and big-moment effects.
5. **Shape language.**
   - Dividers are brush strokes of varying width.
   - Selection and valid targets are hand-inked rings with text, never colour alone.
   - Ink filters are droplets.
   - Room edges carry large pooled ink forms.
6. **Motion.**
   - **Response:** input acknowledged within 100 ms.
   - **Cards:** spring motion with mass, landing with a settle.
   - **Room changes:** an ink wash.
   - **Big moments:** each has a budget and a reduced-motion alternative that keeps the information.

## Rooms

### Pack opening — the Illuminary

- **Task:** open a committed pack and savour it.
- **Composition:** a full-bleed 3D stage, with the pack resting on a pool of light in the ink field. The only chrome is the room bar and, at the bottom, a sheet with Skip and Reveal all.
- **Interaction:**
  1. **Tear.** Drag across the pack's crimped top to tear it open, and the tear follows the pointer. The keyboard alternative is Enter.
  2. **Extract.** The cards rise out of the pack as a stack.
  3. **Draw.** Swipe up, tap or press Space to draw the top card. It lifts, turns over with weight and settles.
  4. **Rarity.** The reveal scales with rarity: commons are quick; a rare blooms ink; a super rare adds shafts of light; a legendary or enchanted card surges the room's ink. All of this stays within the effects preferences, and the rarity label is always printed.
  5. **Inspect.** The pulls fan into an arc. Hovering lifts a card, and choosing it opens the inspector.
  6. **Summary.** A sheet lists the pulls and marks new cards. Leaving and returning resumes at the same point.
- **Proof:**
  - a browser test drags the tear and walks every state;
  - a recorded video;
  - a reduced-motion test;
  - the scene's state machine under unit tests.

### Collection — the Lorebook

- **Task:** browse a set page by page, see what's owned and missing, and find a printing.
- **Composition:**
  - **The book:** a book lying open on the ink field, with two facing 3 × 3 page faces.
  - **Fixed size:** its dimensions come from the pocket size and margins, never from content.
  - **Tabs:** ink-section tabs ride the fore-edge.
  - **Controls:** search and filters sit in a slim instrument strip above the book, and Grid and List remain one choice away.
- **Interaction:**
  - **Turning:** pages turn in 3D around the spine, with shading and a slight bend. Drag a page corner to scrub the turn, or use the arrows, Page Up and Page Down, or a swipe on touch.
  - **Tabs:** a tab riffles through the pages to its section.
  - **Filters:** a filter dims non-matching pockets in place and offers next and previous match.
  - **Search:** a search turns to the first match.
  - **Pockets:** an owned pocket holds the card in a sleeve with sheen. A missing pocket shows an ink-outlined silhouette and the collector number.
- **Proof:**
  - a test asserts the book's bounding box is identical across turns, filters and searches;
  - a test asserts the turn animation runs;
  - a recorded video.

### Match — the Inkfield

- **Task:** read the position, act with confidence, and feel the big moments.
- **Composition:** a 2.5D Babylon table, not rows of boxes.
  - **Sides:** each side is an ink pool facing the other across the Lore Stream.
  - **The Lore Stream:** a luminous channel across the middle of the table, where each player's lore flows toward 20 from their own end. The printed counters stay as well.
  - **Characters and locations:** characters stand on a gentle arc facing the centre. Locations anchor the flanks, with their characters gathered at them.
  - **Inkwell:** an ink pool where inked cards lie face down, with a count.
  - **Other zones:** items sit on a ledge by the inkwell. The deck and discard are physical stacks.
  - **Hand:** the hand fans up from the bottom edge.
  - **Panels:** a decision sheet slides in from the edge only when there is a decision; the log is a collapsible ledger strip.
- **Interaction:**
  - **Play:** drag a hand card onto the table. It arcs and lands with an ink splash.
  - **Quest:** the character exerts, and a mote of light flows into the Lore Stream.
  - **Challenge:** drag from the challenger to the target to draw an ink thread. The two clash, and damage falls as ink drops.
  - **Banish:** the card dissolves into ink.
  - **Shift:** the new card lands on its base with an ink wave.
  - **Songs:** the singer exerts, with notes of light.
  - **Without a pointer:** every card stays a real button in the semantic overlay, with keyboard actions. The Flat tier stays as the fallback.
- **Proof:**
  - browser tests drive play, quest and challenge and assert the position changes;
  - recorded videos;
  - the semantic-overlay tests;
  - a reduced-motion test.

### Deckbuilder — the Scriptorium

- **Task:** build a legal, coherent deck quickly. This is the Lab's precision-instrument room.
- **Composition:**
  - **The deck is its curve.** The left half shows the deck as cards cascading in cost columns, 1 to 8+, so each column's height is the curve.
  - **Ink pair and legality:** they sit on one slim line under the deck.
  - **Catalog:** the right half is a card wall, under a palette of six ink droplets and a cost dial.
- **Interaction:**
  - **Adding:** drag a card from the wall onto the deck, or press +. It flies into its cost column.
  - **Removing:** drag it out, or press −.
  - **Inspecting:** choosing a card opens the inspector as an overlay, never as a column that squeezes the catalog.
  - **Undo:** keeps focus.
- **Proof:**
  - browser tests drag to add and remove and assert the counts;
  - a focus test for Undo;
  - a recorded video.

### Room frame

- **Top bar (D28):** stays, redrawn as a thin ink strip with the wordmark. The current room is marked by an ink tab.
- **Each room:** has its own ink field and key light.
- **Notice:** the demonstration notice appears once per room, quietly, not as body text on every screen.

## Boundaries and choices for the Director

1. **Interactive scenes in the reference.** D27 asked for a first static table scene. D30 asks for interactivity and 3D pack opening. The pack and table scenes therefore become animated and interactive in `@lorcana/presentation`. WEB-01 still owns application lifecycle, quality tiers, measurement and context restoration.
2. **Pack wrapper art.** The legacy library has official booster photography for sets 1–13, but none for Hyperia City. The prototype composes its wrapper from real Hyperia City card art and the set name. Official wrapper art can replace it once a source with provenance is chosen.
3. **A display face for moments.** The brief asks for one characterful display face, but D20 keeps the card-face fonts for card content. The prototypes use Source Sans 3's heaviest weights until a display face is decided.
4. **Legacy materials.** Standard §4 requires an explicit art-direction decision for wood, leather, gold or parchment. D30 allows legacy styling as inspiration. The prototypes use none of these materials, so the Director can judge the ink, paper and light world on its own.

## Proof and gates

Each room ships with:
- browser tests asserting its interactions;
- recorded videos of them;
- captures at four viewport and theme combinations;
- the Impeccable detector with zero findings;
- two independent reviews, design and evidence, at the current design source (D30).

The direction study goes to the Director only after its gate passes. The Director's approval of the study precedes the implementation plan and the full build with every state.
