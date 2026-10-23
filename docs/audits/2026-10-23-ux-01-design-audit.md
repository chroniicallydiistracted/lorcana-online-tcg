# UX-01 reference screens design audit — 2026-10-23 UTC

Recorded 2026-10-23 (CHG-20261023-001) by the Claude Code agent that built the screens, at the Director's instruction in decision D29. Audited source: commit 26b8f4e on `claude/ux-01-reference-screens` (pull request #7), Storybook rebuilt from that commit into the ignored `.local/design-system-storybook/`. Screenshots, walk logs and detector output stay in the ignored `.local/ux-01-audit/`; none is committed.

## Verdict

The Director's review is correct. The reference screens are functional component wireframes, not an authored game interface:

- **No identity.** Without the card images, every screen could belong to any web product.
- **Legacy compositions.** The deckbuilder, top bar, Collection and match follow the legacy app's layouts, without the reuse review the standard requires.
- **Functional defects.** The walks below found several, including two P1 layout failures and match commands that do nothing.

My task 9 review recorded these screens as passing §33. Two of its statements were wrong, and they are corrected below.

## Method

- **Accountability tool: Impeccable** (github.com/pbakaus/impeccable, Apache-2.0, repository commit 5cb95ee, engine `engine-v0.1.16`).
  - **Binary:** `impeccable-linux-x64`, SHA-256 `a890a5b4b7d9d79ec54aa74612b5e924e5f5b422600a25fde8bcbda11b031787`, matching the release's published checksum.
  - **Where it ran:** on the WSL host in the session scratchpad, with telemetry off and Playwright's Chromium 1228. It is not part of the container baseline, so its runs are host review evidence, not `pnpm evidence:run` receipts.
  - **Its two parts:**
    - a deterministic detector with 62 rules for generated-interface tells, layout, typography and accessibility;
    - a critique procedure: an unanchored design review, Nielsen heuristic scores, cognitive load, persona walks and priority issues.
- **Critique run: degraded, single context.** Impeccable requires its design review (A) and detector review (B) to run as two isolated sub-agents. This session is not authorized to start sub-agents, so I ran them one after the other. I wrote A down before reading any detector output, apart from one trial scan of the deckbuilder that showed three findings.
- **Second tool: Hallmark** (github.com/Nutlope/hallmark, MIT, commit 7ec8682). I ran its static `sloplint` over the design-system source and reference stories. It targets marketing pages, and most of its gates do not apply here. Its two applicable notes are below.
- **Functional walks:** Playwright scripts drove every reference screen the way a player would, in the dev container, and recorded results, screenshots and console errors. Every script failure was re-run with corrected locators, so the defects listed are real.
- **Viewports:** 1440 × 900 Ink and Paper, 820 × 1180 Ink and 390 × 844 Paper. Phone is a staged target under standard §2, so phone results are notes, not acceptance.
- **Comparison:** the legacy app's own review captures (`/home/andre/the-inkspire/.review-screens/`, `.cache/play-e2e/`) against the new screens.

## Design specificity: fails

- **Generic surfaces and controls.** The screens use achromatic grey planes (Ink `#1e1e1e`/`#2b2b2b`, Paper `#f6f6f6`/`#ffffff`), 1 px outlined boxes, outlined buttons, form selects, tab strips, a text wordmark and a right-hand sidebar card.
- **The neutrals are not the problem.** The Director chose achromatic Paper and Ink. What is missing is everything the standard and the brief build on top of them.
- **Requirements not met:**
  - **Standard §4 visual grammar:**
    - large composed ink forms at the edge of a room or scene: absent;
    - paper-like planes and controlled layering: absent;
    - restrained light that reveals form: absent;
    - deliberate card handling: absent;
    - a quieter baseline that lets important moments stand out: only the baseline exists, and there are no moments.
  - **Standard §5:** a room changes composition and emphasis. Here every room is the same page: title, notice, filters, content.
  - **Blueprint §11.1:**
    - tactile card materials, ink-like transitions, controlled camera composition and restrained environmental storytelling: absent;
    - "avoid dashboard defaults through screen composition and interaction design": the compositions are dashboard defaults.
  - **The Director's creative brief (2026-10-12):**
    - rooms of one world with their own atmosphere and materials;
    - flowing-ink shape language;
    - a 2.5D tactile board with depth, lighting and physical card motion;
    - a ceremonial pack reveal building to the rarest;
    - fast responses with big-moment effects.

    None of these is present:
    - the table scene is unlit grey slabs;
    - the pack reveal is a 6 × 2 grid of card backs under a toolbar, and the rarest card gets only a faint glow.
- **Root cause.** D27 replaced the three direction studies with one matched set and left the ink-form artwork as empty slots. I treated that as permission to build the control layer only. I should have raised that the screens would read as generic without the material, motion and room layer, and designed that layer within the set.

## Legacy composition reuse (standard §33 and §17)

- **What §33 requires.** It rejects "legacy page composition copied wholesale" unless there is scoped reuse evidence and a review of the new composition. §17 says the legacy binder supplies behaviour, not the Collection screen structure. I did neither review.
- **Deckbuilder.** It has the legacy workbench's anatomy:
  - a deck-name and status header;
  - a row of six ink chips and a row of square cost buttons;
  - type and set filters;
  - a catalog grid with − / + on each tile;
  - a right-hand column with validation, the cost curve and the deck list grouped by cost.
- **Top bar.** The legacy layout: wordmark left, room links in the centre, notifications and account on the right.
- **Collection.** The legacy two-page spread of 3 × 3 pockets with a set selector above it, without even the binder object.
- **Match.** The legacy play skeleton:
  - an event-log rail (now on the right);
  - an opponent strip, two board rows and the hand fan on the bottom edge;
  - counters in the corners.

## Functional defects

| # | Severity | Screen | Defect |
|---|---|---|---|
| 1 | P1 | Match | Hand as list makes the bottom row take over half the viewport. The board's player row is cut off, the log is truncated, and the rows have no card images. |
| 2 | P1 | Match | Commands are inconsistent: Quest updates the board and log, but Play only announces (the card stays in hand and no ink is spent), every Challenge is hard-coded to be rejected, and "Put into your inkwell" is always unavailable. |
| 3 | P1 | Collection | Search and filters keep the current spread, so matches hide among blank filler pockets (searching "Nick" leaves pages 17–18 showing). Filtered spreads collapse to thumbnail-size empty squares. |
| 4 | P1 | Deckbuilder | Undo disables itself while it has focus, and focus falls to the page body (WCAG 2.4.3). |
| 5 | P2 | Deckbuilder | The inspector opens as a third column and squeezes the catalog into one narrow column; the ink chips wrap to three rows. |
| 6 | P2 | Deckbuilder | Each deck row starts with the cost, where players read the copy count ("1 Judy Hopps … 4"). |
| 7 | P2 | Deckbuilder | Heading levels skip from h1 to h3 (found by the detector; axe's best-practice rule is not enforced). |
| 8 | P2 | Match | The bottom row changes layout between states: idle versus choosing moves Discard and the Fan/List switch. |
| 9 | P2 | Match | The log shows each turn newest first but numbers it as a sequence, so the turn's first event is numbered last. |
| 10 | P2 | Match | Table-scene status chips overlap ("At Institute of Technology" over "Shift stack · 2"), and the scene sits small in a mostly empty canvas. |
| 11 | P2 | Match | The discard pile is a list of names; a card game shows cards. |
| 12 | P3 | All | The demonstration notice repeats on every screen at body weight. Selection, caret and scrollbars keep browser defaults. |

## Heuristic scores (Impeccable critique, Nielsen 0–4)

| # | Heuristic | Score | Key issue |
|---|---|---|---|
| 1 | Visibility of system status | 3 | Save, connection, pending and reconnecting are explicit; the log order is misleading. |
| 2 | Match between system and real world | 2 | Cost reads as copy count. The binder is not a binder. Unexplained terms ("Ink drops", "Printings with a foil version"). |
| 3 | User control and freedom | 3 | Undo, keep choosing, the leave guard and pack skip exist; Undo loses focus. |
| 4 | Consistency and standards | 2 | The bottom row reflows between states. The inspector is a side column in one room and a tab in another. Card images disappear in list modes. |
| 5 | Error prevention | 3 | Bulk-quest and end-turn reviews, conflict handling, and ownership kept separate from rules. |
| 6 | Recognition rather than recall | 2 | The hand list, discard pile, deck list and pack summary drop the card image. |
| 7 | Flexibility and efficiency | 2 | No match shortcuts; only the binder's Page Up/Down. |
| 8 | Aesthetic and minimalist design | 1 | Wireframe grade: undifferentiated boxes, a repeated notice, chip clutter, an empty match canvas, and a legendary card that looks like a common. |
| 9 | Error recovery | 3 | Rejection and conflict messages say what happened and what to do. |
| 10 | Help and documentation | 2 | Little help in context. |
| | **Total** | **23/40** | **Acceptable band: significant improvements needed** |

- **Cognitive load:** 3 of 8 checks fail (visual hierarchy, minimal choices, single focus), which is moderate. The deckbuilder shows 6 ink buttons, 8 cost buttons, 5 selects, a view switch and search before the first card.
- **Emotional journey:** flat from start to finish:
  - no peak in pack opening;
  - no payoff for a quest, banish or song;
  - no sense of a binder being filled.
- **Persona red flags:**
  - **Competitive player:** five filter decisions before the first card, no keyboard play, and the cost-as-count misread.
  - **Collector:** no binder object, filtering hides matches, an uncelebrated legendary, and a summary that is a list of links.
  - **Newcomer:** about twenty equal-weight elements on the match screen, and terms without reminder text where they are used.

## Detector results (Impeccable, deterministic)

The detector ran over 63 stories × 4 viewport and theme combinations. At 1440 × 900 Ink it found 154 findings:

| Rule | Count | Where |
|---|---|---|
| cramped-padding | 44 | Ink chips in deck rows and headers; match status chips with no vertical inset. |
| straggler | 42 | One-word last lines in the match log and action panel. |
| nested-cards | 22 | Binder pages inside a bordered binder; pack summary items; panels inside the sidebar card. |
| flat-type-hierarchy | 19 | Body 14 px, h3 16 px, h2 18 px: the largest step is 1.14:1 against a 1.25:1 target. |
| unbalanced-heading | 13 | Headings wrapping to a short last line. |
| skipped-heading | 11 | Deckbuilder h1 → h3. |
| repeating-stripes-gradient | 3 | The pending progress bar. |

All 252 scans completed, with no scan failures:

| Rule | 1440 Ink | 1440 Paper | 820 Ink | 390 Paper |
|---|---|---|---|---|
| straggler | 42 | 42 | 0 | 16 |
| cramped-padding | 44 | 44 | 2 | 2 |
| nested-cards | 22 | 22 | 20 | 20 |
| flat-type-hierarchy | 19 | 19 | 0 | 0 |
| unbalanced-heading | 13 | 13 | 0 | 11 |
| skipped-heading | 11 | 11 | 0 | 0 |
| repeating-stripes-gradient | 3 | 3 | 3 | 3 |
| **Total (stories with findings, of 63)** | **154 (40)** | **154 (40)** | **25 (12)** | **52 (30)** |

The narrow widths show fewer findings because the deckbuilder's deck panel and the match side panel collapse into tabs and stacked regions there.

- **What the detector does not catch.** It found none of the classic generated-interface tells: no Inter, gradient text, glass or glow. It still cannot see the missing identity. The screens pass a tell checklist and still read as generic. My §33 review measured only the absence of tells, which is why it passed. The detector is a floor, not a judge of identity.
- **Hallmark static gates:**
  - **Applicable:**
    - no `text-wrap: balance` on headings (it matches the detector's unbalanced-heading findings);
    - one straight quote in story prose.
  - **Not applicable:**
    - its "stamp" gate is Hallmark's own build marker;
    - its missing `:active`/`:disabled` reflexes miss React Aria's `data-pressed` and `data-disabled` states;
    - its dash rule conflicts with the official card-name format.

## Corrections to the task 9 record (CHG-20261022-013)

The validation record's "Review against the §33 rejection criteria" contains two incorrect statements. The record is append-only, so they are corrected here:

1. **"Legacy composition copied: none."** Wrong: see the legacy comparison above. The card back was the only reused asset, but the deckbuilder, top bar, Collection and match compositions follow the legacy app.
2. **"Every control acts within its story."** Wrong for the match: Play only announces, every Challenge is rejected, and inkwell placement is never available.

## Process failures

- I reviewed against state coverage, overflow and the absence of tells. I did not review against §4's identity, the creative brief or §33's legacy criterion.
- I graded my own work with no independent reviewer and no tool, and recorded the result as a pass.
- I did not raise that the D27 set, built without its identity layer, would read as generic.
