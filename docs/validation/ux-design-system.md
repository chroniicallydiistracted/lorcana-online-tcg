# UX technical design system validation

Change: CHG-20261020-004, by the Claude Code agent on Director request (decision D17). Standard: [UX/UI design system](../vision/UX_UI_DESIGN_SYSTEM.md), sha256 `000fd854…`. Architecture: [ADR 0017](../adr/0017-technical-design-system.md). Operation: [runbook](../runbooks/design-system.md).

## Result

The technical design system is implemented in `packages/design-system` and adopted by `apps/web`. All design-system gates and the Chromium browser suite pass at the final source fingerprint `686eb1c854b0eafb2ce9e091185d0d4ee0bd287959ee5943354cf28a7eb75bc4`, as do the workspace configuration contract, typecheck, lint and full test suite. This is local synthetic evidence. It is not Director visual approval, real-device qualification, a manual accessibility evaluation or a WCAG conformance claim (§25, §34).

## Coverage of the standard

| Section | Status |
|---|---|
| §4–5 Character, composition | Shared foundations and components; no room screens built (UX-01 reference screens pending) |
| §6 Interface typography | Source Sans 3 400/600/700 self-hosted with provenance; eight rem type roles; synthetic styles disabled; tabular numerals; measured fallback faces |
| §7 Card typography | Card roles, families and cqw sizes as tokens; `CardFaceText` layer; Inspector reading mode at 20/28 px. Card font files not imported (no recorded usage basis) |
| §8–9 Paper/Ink, inks, feedback | Exact values from the tables; achromatic neutrals enforced; 38 contrast pairs per theme pass (smallest margin 0.05 above the required ratio); System/Paper/Ink with saved preference precedence; inks always named |
| §10 Token architecture | DTCG subset in three layers plus card; Style Dictionary 5.6.0 qualified by cross-check; CSS, typed TS, renderer, `@value` breakpoints, fonts and manifest; every required check with a negative fixture |
| §11–12 Spacing, density, geometry | Scale, density rows (56/44 px), 44 px targets, gutters, content cap, breakpoints, 4/8 px radii, overlay shadows; one authored icon family |
| §13–14 Components, interaction | 46 Experimental components on React Aria with full §13 contracts; Escape, focus restoration, inert backgrounds; hover never moves targets |
| §15–16 Inspector, Viewer, CardFX | Inspector and InspectorHost implemented; the Viewer slot is a lazy boundary. Viewer and CardFX integration pending (presentation/WEB) |
| §17–18 Collection, deckbuilder | CardTile (ownership states, finish, quantities) and DeckEntry (separate legality and ownership messages). Binder and deckbuilder screens pending |
| §19–20 Match, confirmations | Confirmation contract with concrete labels; confirm-quest-all and confirm-end-turn preferences default on and independent. Match UI pending (WEB-02) |
| §21–22 States, notifications | ConnectionStatus, JobStatus, ProgressBar (no fabricated percentages), messages, Toast, quiet NotificationCount |
| §23–24 Packs, other surfaces | Not built; inherit these foundations |
| §25 Accessibility | axe WCAG 2.2 A/AA automation, targets, focus, forced colours, reduced motion, reflow and 200% text in Chromium. Manual journeys pending |
| §26–27 Motion, audio | Motion tokens and reduced-motion modes; audio preferences only (no audio built) |
| §28 Content, localization | Externalized strings with ICU-style plurals, locale numbers and the `en-XA` pseudolocale; English catalog only |
| §29 Assets | Font provenance manifest; image placeholders keep printing text; fan-content notice word for word |
| §30 Rendering | Renderer colour tokens (sRGB and linear); scenes pending (WEB-01) |
| §31 Preferences | Versioned model with the exact defaults; safe device storage |
| §32 Ownership | Design system has no Babylon or server imports (tested); only browser and server boundaries unchanged |
| §33 Generic-design prevention | Style-ownership and component-contract gates; synthetic fixtures labelled; human review still required |
| §34–35 Validation, governance | This record, ADR 0017, decisions D16/D17, lifecycle states, archived original ZIP |

## Receipts

| Run | Category | Result |
|---|---|---|
|RUN-20261020-018|container|Passed 30/30, superseded: its fingerprint included a Storybook build left in the source tree.|
|RUN-20261020-019|headless_browser|150/150 passed but the receipt failed `source_changed`: the Storybook build in the source tree changed during the run. Storybook now builds into `.local/design-system-storybook`.|
|RUN-20261020-020|container|At fingerprint `2255e8fb…`, before the configuration-contract fix: design-system gates passed 30/30: token validation with 10 negative fixtures, contrast, drift, style ownership, component contracts and 190/190 state coverage, CSS module types, preferences, messages, font provenance, notice wording, renderer colour spaces, import boundaries.|
|RUN-20261020-021|headless_browser|At fingerprint `2255e8fb…`: Chromium suite passed 150/150: a story-index check, axe WCAG 2.2 A/AA on all 44 stories in Paper and Ink (88), 44 px targets on 38 component stories, and 23 interaction checks (focus, hover stability, pending, dialogs, confirmations, menus, select, tabs, quantity bounds, reduced motion, forced colours, themes, fonts, reflow, 200% text, inspection placement, image failure, ownership, notification count, pseudolocale).|
|RUN-20261020-022|container|At fingerprint `2255e8fb…`: typecheck, ESLint plus boundaries and the full workspace suite passed: 399 Node (369 existing + 30 design-system), 24 Python, upstream 406 with 1 inherited skip, 2 injection.|
|RUN-20261020-023|container|Isolated pipeline: failed at the foundation stage because `scripts/verify-config.py` pinned `allowBuilds` to an empty map (RUN022 had not run `pnpm verify`). The contract now requires exactly `{esbuild: false}`.|
|RUN-20261020-024|headless_browser|Chromium suite 150/150 at the final fingerprint `686eb1c8…`.|
|RUN-20261020-025|container|Configuration contract, typecheck, lint and full suite at the final fingerprint: 399 Node, 24 Python, upstream 406/1 skip, 2 injection.|
|RUN-20261020-026|container|Isolated pipeline at the final fingerprint: all 15 stages passed in 612 s with exact timing. 484 Node (399 foundation + 85 database/live), 24 Python, upstream 406/1 skip, 2 injection, 13 web Chromium, 150 design-system Chromium, Lab workers, secret scans and artifacts.|
|RUN-20261020-027|static|`docs:check` over this change passed.|

## Findings and limits

- **Card fonts.** The Bystander Collection Sans, Brandon Text Cond and Century Gothic files in the legacy app are HvD trial or unlicensed builds with no provenance. The repository is public, so they are not imported, and card text falls back to Source Sans 3. A recorded usage basis or a replacement decision is needed before printed-card fidelity can be qualified.
- **Fallback width under Linux hinting.** In headless Linux Chromium, the measured fallback matches the web face's line box within 1 px. Its width differs by about 4.5% on a sample sentence, because FreeType hinting snaps the size-adjusted Liberation Sans advances. In an unrecorded diagnostic, Source Sans 3 measured 651 px, Liberation Sans 679 px and the adjusted fallback 622 px. The table-based measurement predicts the sentence correctly; real Windows and macOS behaviour needs UX-02.
- **Browsers.** Chromium automation only: no Firefox, WebKit, real Safari, iPad, Android tablet, GPU or device evidence. No manual screen-reader journeys.
- **Unstable toast API.** React Aria's toast API is `UNSTABLE_` in 1.21.1 and is isolated in one file.
- **Open interpretations.** The standard is silent on some values, such as the Ink overlay shadow, the motion range defaults and the component token values. ADR 0017 lists them for Director review.
- **Pending tasks.** UX-01 reference screens (crowded match, practical deckbuilder, Collection binder, pack presentation) and Director visual approval; UX-02 device and browser matrix; WEB-01/02/03.

## License line-ending correction — 2026-10-20 UTC

Recorded 2026-10-20T16:51:24.232Z (CHG-20261020-005).
- **Problem:** the repository's `* text=auto eol=lf` rule committed an LF copy of the Source Sans 3 `LICENSE.md`. The font manifest records the upstream file exactly as published, with CRLF endings and sha256 `89ad2c…`. A fresh checkout, such as hosted CI's, would have failed the provenance test.
- **Fix:** `.gitattributes` now marks that one file `-text`, so Git stores Adobe's bytes unchanged.
- **Evidence at the final fingerprint `89f989ca1b7e4008084f0ecbf87e5628b3994725ed8b01e836d9893425c3c38c`:**
  - **RUN-20261020-028, passed:** configuration contract, typecheck, lint and full suite (399 Node, 24 Python, upstream 406/1 skip, 2 injection).
  - **RUN-20261020-029, passed:** Chromium suite, 150/150.
- **Not re-run:** the local isolated pipeline (RUN-026 passed all 15 stages one fingerprint earlier, and the only source change is this attribute). The hosted run on a real checkout is the check that matters for this fix.

## Parallel design-system CI job — 2026-10-20 UTC

Recorded 2026-10-20T18:28:42.254Z (CHG-20261020-006).
- **Hosted failure:** run 39461681606 on pull request #3 failed when `ci:verify` reached its 900 s limit. The in-pipeline design-system stage was running after about 826 s of existing stages: foundation 240 s, live-matches 343 s, browser 186 s.
- **Decision D18:** the Director chose a separate parallel CI job.
- **Implementation:** `python3 scripts/ci-local.py --suite design-system` runs `pnpm ci:design-system` in the same isolated container. Its three stages are the gates, the pinned Chromium install and the browser suite. The foundation pipeline is back to 14 stages.
- **Evidence at the final fingerprint `44591181ce2f28af5d51eda07bbfac437b8346522ce0359dd9df1d4fab7eb54b`:**
  - **RUN-20261020-033, passed:** configuration and workflow checks, typecheck, lint and full suite (399 Node, 26 Python, upstream 406/1 skip, 2 injection).
  - **RUN-20261020-034, passed:** isolated design-system suite in 108 s (30 gates, Chromium install, 150/150).
  - **RUN-20261020-036, passed:** isolated foundation pipeline, all 14 stages in 539 s (484 Node, 26 Python, 406/1 skip, 2 injection, 13 web Chromium, Lab workers).
- **Earlier receipts:**
  - **RUN-20261020-032, passed:** the same suite before a fix to the launcher's final message.
  - **RUN-20261020-035, failed:** its `docs:check` ran before the verified features were re-bound to the new fingerprint.
  - **RUN-20261020-037:** static `docs:check`.

## Pipeline time limit — 2026-10-20 UTC

Recorded 2026-10-20T20:42:22.503Z (CHG-20261020-007).
- **Hosted failure:** in run 39477270644 on pull request #3, the new `design-system` job passed in about 3 minutes. The `foundation` job still hit the 900 s `ci:verify` limit after its 14 stages had taken 866 s (foundation 243 s, live-matches 347 s, browser 187 s, engine-browser 32 s). The same D13 source took 698 s and 888 s in earlier hosted runs, so this is runner variance, not the design system.
- **Decision D19:** the Director chose to raise the isolated pipeline command limit to 1500 s. The Actions job limit stays at 30 minutes.
- **Evidence at the final fingerprint `94cbd3d21520ad9c909b7de9245a216b6e666d3a8fa2be11b5daf3c16e309857`, all passed:**
  - **RUN-20261020-038:** configuration and workflow checks, typecheck, lint and full suite (399 Node, 26 Python, upstream 406/1 skip, 2 injection).
  - **RUN-20261020-039:** isolated design-system suite in 107 s (30 gates, Chromium install, 150/150).
  - **RUN-20261020-040:** isolated foundation pipeline, all 14 stages in 545 s (484 Node, 26 Python, 406/1 skip, 2 injection, 13 web Chromium, Lab workers).
  - **RUN-20261020-041:** static `docs:check`, passed.
- **Limit:** a local run cannot reproduce the hosted runner's speed, so the hosted run is the real check of this fix.

## Hosted runs, merge and vite advisory — 2026-10-20 UTC

Recorded 2026-10-20T22:59:51.995Z (CHG-20261020-008). These are public GitHub job and step metadata plus the failed step's log; no artifacts were downloaded.
- **Pull request #3, run 39496608891 at 3793081, success:**
  - `design-system`: about 3 minutes, 30 checks and 150/150;
  - `foundation`: the pipeline step took 959 s, with 886 s of stages.
- **Merge:** the Director fast-forwarded main from 9081192 to 3793081.
- **Main, run 39509517284:** `design-system` succeeded. `foundation` passed all 14 stages, then failed the dependency advisory check. The cause is three vite 8.3.0–8.3.2 advisories in its bundled `launch-editor`: GHSA-587h-7wmj-h5pm (high) and GHSA-698v-4r3x-3vcv and GHSA-r825-w8mm-5pxw (moderate). They were published 18:30–19:51Z, before the pull request's run, but that run's audit did not report them.
- **Fix:** branch `claude/vite-advisory` moves the four workspaces that pin vite to 8.3.3, the first fixed release. `pnpm audit` reports no advisories.
- **Evidence at fingerprint `b75b051338aee1e236d39659659ea09ebff19c543ad75114302b6c6edfcbac93`, all passed:**
  - **RUN-20261020-042:** configuration and workflow checks, `pnpm audit` with no advisories, typecheck, lint and full suite (399 Node, 26 Python, upstream 406/1 skip, 2 injection).
  - **RUN-20261020-043:** isolated design-system suite in 107 s (30 gates, Chromium install, 150/150).
  - **RUN-20261020-044:** isolated foundation pipeline, all 14 stages and the dependency advisory check, in 544 s (484 Node, 26 Python, 406/1 skip, 2 injection, 13 web Chromium, Lab workers).
  - **RUN-20261020-045:** static `docs:check`, passed.

## Card-face fonts, icons and gameplay symbols — 2026-10-21 UTC

Recorded 2026-10-21T06:11:47.022Z (CHG-20261021-001; decisions D20, D21, D22).

### Card-face fonts (D20)

- **Imported:** the weights the legacy card face uses.
  - **The Bystander Collection Sans Regular:** titles. 340 characters; no rights text embedded ("copyright missing", Uniontype).
  - **HvD trial Brandon Text Cond** at 400, 400 italic, 500, 700 and 900 italic: version, classification, rules, ability, keyword and flavour text. The embedded rights text reads "trial purposes only, no commercial use"; fsType 4.
  - **Century Gothic Regular:** numbers. 668 characters, with a Monotype licence notice.
  - **Source:** the files are byte-identical to the LorcanaOnline originals.
- **Brandon coverage:** each trial build has exactly 70 characters: space, `! , - . ?`, digits, A–Z, a–z, no-break space and soft hyphen.
  - **Fallback:** `Card Text Fallback` draws every other character. It is Source Sans 3 at the matching weight and style, from the same 3.052R release; the Medium, Italic and Black Italic files are added for it.
  - **Measurement:** size-adjust is 106.06%, matching Brandon's cap height (0.700 em against 0.660 em), so apostrophes, quotes and parentheses align with Brandon's capitals. Ascent, descent and line-gap overrides are Brandon's typo metrics divided by size-adjust (66%, 28.29%, 36.77%), so fallback characters never change the line box.
  - **Verification:** the tests recompute these values from the files. In Chromium's per-node font report, Brandon draws the keyword line's letters and Source Sans 3 draws its parentheses.
  - **Accepted limitation:** the Director accepted the visible difference in fallback punctuation and accented letters as permanent.
- **Card-face sizing defect, now fixed:** `CardFaceText` (CHG-20261020-004) was its own size container, so its 6cqw padding resolved against the viewport (about 77 px). That shrank the content box and every printed size with it: the title rendered at about 5 px. An inner content box now holds the padding, and every cqw is a percentage of the card width.

### Interface icons and gameplay symbols (D21)

- **Icons:** `Icon` renders Phosphor Regular from a 21-entry registry, each entry with one meaning.
  - **Sizes:** 20 px standard and 24 px prominent.
  - **Selected:** Fill.
  - **Banned:** Thin, Light, Bold and Duotone.
  - **Selection controls:** checkbox, radio and switch keep 24 px through `selection.size`. The checkbox mark is now the registry's Check or Minus.
- **Gameplay symbols:**
  - **Pack variants:** lore, exert, inkable and uninkable, plus the rules-text ("buff") forms of strength and willpower.
  - **Rejected variants:** the line-art and black-and-white strength and willpower blurred or muddied at 20 px. The old project's bolder `*_card_text` files are Inkscape working files with transforms and construction strokes and only an "official-style" description, so they were not used.
  - **Colour:** the symbols take the text colour. The printed gold `#d2b984` would fail 3:1 graphics contrast on Paper.
  - **Ink symbols:** the official unframed badges at 20 px beside the ink name, keeping their colours in forced colours.
  - **Crop:** each display crop is computed from the shapes' bounds and squared with 1/12 padding, matching the icons' optical size. A browser check confirms nothing is clipped and the crop stays tight.
- **Takedown switch:** `officialAssets={false}` shows neutral text placeholders.
- **Open provenance:** the asset pack's original download location is not recorded (fan-content policy rule 3).
- **Custom identity set:** no custom Inkspire identity icons were made; D21 allows them only where they add meaningful identity.

### Visual check and browser fidelity

- **Screenshots:** representative icons and symbols at 20 and 24 px, the card face, the inks and the symbols were captured in Paper and Ink and reviewed.
- **Hinting artifact:**
  - **Symptom:** at high resolution, ordinary Source Sans 3 text showed gaps after narrow letters ("Synt het ic", "Add t o deck").
  - **Cause:** headless Linux FreeType snaps every glyph advance to a whole pixel (`t`: 8 px against 6.8 px). The gaps were identical with the new fallback faces removed.
  - **Fix:** the browser suite now runs with `--font-render-hinting=none`, which gives fractional advances and correct spacing, as desktop browsers produce.

### Receipts

All at fingerprint `52f0e1403f9c6d6d9e2043bd6aa3827102d6ad34247f67f4f91b6c732f9ad0a6`, with exact timing:
- **RUN-20261021-001, passed:** configuration and workflow checks, `pnpm audit` with no advisories, typecheck, lint and full suite (403 Node, 26 Python, upstream 406/1 skip, 2 injection).
- **RUN-20261021-002, passed:** isolated design-system suite in 117 s (34 gates, Chromium install, 161/161).
- **RUN-20261021-003, passed:** isolated foundation pipeline, all 14 stages in 571 s (488 Node, 26 Python, 406/1 skip, 2 injection, 13 web Chromium, Lab workers).
- **RUN-20261021-004, passed:** static `docs:check`.

**Limits:** Chromium automation only. Real Windows and macOS rendering of the card faces and the manual accessibility journeys remain UX-02.

## ADR 0017 approved in full — 2026-10-21 UTC

Recorded 2026-10-21T07:01:59.323Z (CHG-20261021-002; decision D23).
- **Decision:** the Director approved ADR 0017 in its entirety, together with the icon and font guidelines (D20, D21), and required it implemented in full. This corrects D22, which had applied "other changes" only to the pasted icon standard.
- **Audit:** every decision item, interpretation and consequence was checked against the code; the table is in the ADR. All are implemented. The authored icon family is superseded by D21. Animation speed is bounded in the preference model as the ADR states; applying it to choreography belongs to `packages/presentation` once scenes exist.
- **Correction to the font-metrics finding:**
  - With hinting off, the measured fallback is within +1.2% of Source Sans 3's width on the test sentence (639.5 px against 631.9 px).
  - With hinting on it was −4.45% (622 px against 651 px), so the earlier 4.5% was a hinting artifact, not a measurement error.
  - The browser test bound is now 2%.
- **Evidence at fingerprint `52f4cc01ef8da570b8c3df089e9d473e637ece62069c7d416d071b7a13e53796`, all passed:**
  - **RUN-20261021-005:** configuration and workflow checks, `pnpm audit` clean, typecheck, lint and full suite (403 Node, 26 Python, upstream 406/1 skip, 2 injection).
  - **RUN-20261021-006:** isolated design-system suite in 117 s (34 gates, 161/161, including the 2% width bound).
  - **RUN-20261021-007:** static `docs:check`.
- **Not re-run locally:** the foundation pipeline, since the only source change is a design-system browser test it does not execute. Hosted CI runs both jobs.

## Provenance correction — 2026-10-21 UTC

Recorded 2026-10-21T14:32:09.557Z (CHG-20261021-003). The Director states that most, if not all, files in the source folder (`all-lorcana-assets` in the original Inkspire app) were created by the Director. The rest come directly from Ravensburger's publicly available digital assets. The folder is not an official asset pack, as earlier records called it, and the symbols are not necessarily official files.
- **Manifest:** `src/assets/symbols/manifest.json` now records this origin. Which symbols are which is not distinguished.
- **Rights basis:** D07, because the symbols depict Disney Lorcana marks.
- **Takedown switch:** it covers them either way.
- **Symbol choice:** stands on its technical grounds: clean vector shapes, and legibility at 20 and 24 px. The contrast with the bolder `*_card_text` glyphs no longer turns on provenance, since both sets are the Director's. Those files were still unsuitable as working files with transforms and construction strokes.
- **Evidence at fingerprint `35834e4ba851b08dd699a0fdb783e365e01faaab65ffe57f91db0132358b244b`, all passed:**
  - **RUN-20261021-008:** configuration and workflow checks, `pnpm audit` clean, typecheck, lint and full suite (403 Node, 26 Python, upstream 406/1 skip, 2 injection).
  - **RUN-20261021-009:** isolated design-system suite in 115 s (34 gates, 161/161).
  - **RUN-20261021-010:** static `docs:check`.

## Hosted runs, Director review and card decisions — 2026-10-21 UTC

Recorded 2026-10-21 (CHG-20261021-004; decisions D24, D25, D26).

### Hosted runs

Source: public GitHub job metadata; no artifacts downloaded. Every run passed both jobs.
- **Pull request #4, run 39514065746 at dc6757e (vite 8.3.3):** `design-system` 23:17:54–23:21:07Z, `foundation` 23:17:54–23:29:12Z on 2026-10-20.
- **Pull request #5, run 39555849817 at 2c84769 (fonts, icons, symbols):** `design-system` 06:30:41–06:33:13Z, `foundation` 06:30:42–06:44:26Z.
- **Pull request #5, run 39560354328 at a136841 (ADR 0017 approval):** `design-system` 07:12:21–07:15:30Z, `foundation` 07:12:21–07:24:53Z.
- **Pull request #5, run 39619295311 at 7a9e757 (provenance correction):** `design-system` 14:43:11–14:45:47Z, `foundation` 14:43:10–14:59:19Z.
- **Merge:** main moved from 3793081 to 7a9e757, the exact commit run 39619295311 tested, which also carries pull request #4. The agent pushed it at the Director's instruction to push once CI finished.
- **Main, run 39621867049 at 7a9e757:** `design-system` 15:00:26–15:03:56Z, `foundation` 15:00:26–15:16:56Z. This closes the advisory failure of main run 39509517284.

### Director review (D26)

- **What was reviewed:** the UX backlog status and 100 screenshots of the current interface, captured from main 7a9e757 in headless Chromium 153 at 2× pixel density:
  - every Storybook story except the six text-only reference pages, in Paper and Ink;
  - open states of dialogs, the sheet, the end-turn confirmation, the tooltip and the inspector, wide and at 390 px;
  - the web app's foundation page.

  The screenshots and the capture script are review material and are not committed.
- **Decision:** the design is approved as shown at this time, with one change. Card tiles carry too much information under the card image; it belongs to the card inspector, so a tile shows the card itself.
- **Defect found while capturing:** the tile's inspect button shows "Printing" while its accessible name is "Inspect …", which fails WCAG 2.5.3 (Label in Name). The tile change removes that button text.
- **Still pending:** matched reference screens (UX-01), device and browser qualification (UX-02) and manual accessibility journeys. Components stay Experimental until those exist.

### Card decisions (D24, D25)

- **D24, inspector:** the enhanced card inspector is designed and built from scratch. The original Inkspire app's inspector is a reference for what it offered, never a source of code or design.
- **D25, card data:** all card data comes from Ravensburger's official catalog, never made-up cards.
  - **Applies to:** interface, Storybook and inspector work, including the design-system browser tests.
  - **Exceptions:** neutral placeholders remain only as the takedown fallback, and engine and rules tests keep their synthetic fixtures.
  - **Consequence:** the made-up cards in the current stories (for example "Synthetic Explorer") are replaced with real catalog cards by the catalog change that follows.
- **Ravensburger API check, about 21:26Z:**
  - `https://api.lorcana.ravensburger.com/v3/catalog/{lang}` is current and needs no login. English, German, French and Italian are served; Spanish, Japanese, Chinese and Portuguese return 403.
  - v4 and v5 return 403. The older v2 route answers with an empty catalog.
  - The English catalog (last modified 2026-10-16, app version 2026.5, catalog hash `ae38af81…`) lists 18 sets through Hyperia City, 3,558 cards and 6,438 printing variants.
  - Card images, thumbnails and foil masks are public, at opaque URLs given by the catalog.

## Real-card stories, card tile and Storybook patch — 2026-10-21 UTC

Recorded with CHG-20261021-005 (decisions D25, D26).
- **Real cards (D25):** every card, set and ability in the stories and browser tests now comes from Ravensburger's catalog through `@lorcana/rules-data/fixtures`: 12 printings with their images, served by Storybook at `/catalog-images/` ([card catalog validation](card-catalog.md)).
  - **What was replaced:** the made-up printings ("Synthetic Explorer", "Synthetic Set One"), the invented ability and the neutral placeholder art.
  - **Interim inspector text:** the current inspector stories render printed symbols as words until the inspector redesign (D24).
- **Card tile (D26):** `CardTile` shows the card itself.
  - **Naming:** one button named "Inspect <name> – <version>, <set> <number>". The set and number keep reprints distinguishable, which the browser suite checks with Elsa – Spirit of Winter's two printings.
  - **Removed:** the text under the image, and with it the `ownership` and `actions` props.
  - **Foil printings:** they keep a "Foil" mark on the corner (§16).
  - **Shape and states:** the card silhouette is the physical corner, and hover changes only the outline.
  - **Ownership:** shown in the inspector.
- **Takedown switch:** `CardImage` follows `officialAssets={false}`.
- **Storybook 10.6.2:** GHSA-f2ph-cmg5-wxc8 (critical) was published on 2026-10-21 at 17:23Z against 10.0.0–10.6.1 and failed this change's first audit (RUN-20261021-013). `storybook` and `@storybook/react-vite` move to 10.6.2, the first fixed release; only the five Storybook packages change in the lockfile.
- **Visual check:** the tile grid, the inspector opened from a tile, the card-face text and the inspector were captured in Paper and Ink and reviewed. These review screenshots are not committed.
- **Receipts, all at fingerprint `256dd89d` with exact timing:**
  - **RUN-20261021-014, passed:** checks and full suite (412 Node, 26 Python, upstream 406/1 skip, 2 injection).
  - **RUN-20261021-016, passed:** isolated design-system suite, 34 gates and 163/163 in 118 s.
  - **RUN-20261021-018, passed:** isolated foundation pipeline, 14 stages in 562 s.
  - **Failed attempts:** RUN-20261021-013 (the Storybook advisory), RUN-20261021-015 (wrong invocation, nothing ran) and RUN-20261021-017 (features not yet re-bound). Each is explained in the [card catalog validation](card-catalog.md#receipts).

## UX-01 reference screens build — 2026-10-22 UTC

The Director approved the full UX-01 design for end-to-end completion. The build follows the [implementation plan](../plans/2026-10-22-ux-01-implementation.md), with a change record per task.
- **Task 1, reference fixture (CHG-20261022-005):** 69 real Hyperia City printings for the decks, binder spreads, pack and special printings. See the [card catalog validation](card-catalog.md#ux-01-reference-fixture--2026-10-22-utc).
- **Task 2, card back (CHG-20261022-006):**
  - **Asset:** the official card back (D28) is stored byte for byte as `src/assets/card-back/lorcana_card_back.jpg` (1,468 × 2,048, 486,672 bytes, SHA-256 `0f022bc3…`). Its manifest records the source, the byte-identical LorcanaOnline original, the legacy catalog entry, colour space, rendition, accessibility use, fallback and the D07 rights basis.
  - **Component:** `CardBack`, Experimental, with stories for the official back, the neutral back, a small size and a labelled card.
  - **Takedown:** with official assets off, or if the image fails, a neutral back drawn from the tokens takes its place.
  - **Tests:** a component test checks the manifest's checksum and size and decodes the JPEG's dimensions.
  - **Build output:** `copy-static.mjs` copies the JPEG to `dist/`, and the browser-suite server serves it as `image/jpeg`.
- **Task 3, room frame (CHG-20261022-007):**
  - **Components (Experimental):** `NavigationBar` and `AccountMenu`, plus `RoomFrame`, `RoomHeader`, `DemonstrationLabel` and `InkFormSlot`; the existing `NotificationCount` is reused.
  - **Tokens and icons:** new component tokens `avatar.size`, `avatar.radius` and `room.ink-gutter`; a `menu` icon (Phosphor List) in the curated registry.
  - **Strings:** seven new component strings in the message catalog.
  - **Storybook:** an "Artwork slots" toolbar global, and a bleed parameter for room stories.
  - **Stories:** room-frame reference stories, including the honest page for rooms outside the reference set.
  - **Visual review:** captures at 1440 × 900 (Paper), 820 × 1180 (Ink) and 1920 × 1080 found the wordmark at 32 px while the room content started at 96 px, and a gutter mismatch at 820 px. The bar's content edge now follows the room gutters and perimeter reservation, and the recapture shows them aligned at all three widths. Captures stay in the ignored `.local/ux-01-review/`.
  - **Browser tests:** seven new tests in `tests/browser/reference.spec.ts`:
    - skip link;
    - the current destination marked by more than colour;
    - the collapsed menu, with focus restored;
    - slots that take no focus and never overlap a control;
    - the account menu and fan-content notice;
    - the quiet count opening its list;
    - a non-reference destination leading to an honest page.
  - **Receipts:** RUN-20261022-015 passes the gates and the full Chromium suite, 193/193.
- **Task 4, deckbuilder (CHG-20261022-008):**
  - **New components (Experimental):**
    - `DeckWorkspace` and `DeckPanel`;
    - `FilterBar`, `ViewSwitch`, `CatalogResults` and `CatalogTileControls` (the D28 row);
    - `DeckHeader`, `DeckList`, `DeckSummary`, `CostCurve`, `ValidationSummary` and `SaveState`;
    - `ImportPreview` and `ExportDialog`.
  - **Changed components:**
    - `DeckEntry`'s card name now opens the inspector. This replaces a "Printing" button whose accessible name did not contain its visible text (WCAG 2.5.3), and the line now fits a narrow deck region.
    - `QuantityField` gains a hidden-label option and a compact input.
    - `InkIdentity` gains a plain appearance for use inside controls.
    - `InspectorHost` and `FilterBar` share a new `useAtLeast` breakpoint hook.
  - **Tokens and icons:**
    - new component tokens for the catalog grid and selects, the deck region, the chart and the compact stepper;
    - `filter` (Funnel) and `undo` (ArrowCounterClockwise) icons;
    - 49 component strings.
  - **Cost curve:** follows the data-visualization method:
    - one neutral series;
    - columns at most 24 px wide, square at the baseline with a rounded cap;
    - the count on every cap and no gridlines;
    - a hidden table of the same values for assistive technology.
  - **Reference stories:** the 11 design states plus an empty deck, on real cards. They include:
    - add, remove and undo, with announcements;
    - filters that never discard edits;
    - a printing preference separate from the card's identity (Nick Wilde's Epic printing);
    - import parsing that reports unresolved names;
    - export in two explicit formats;
    - save, conflict and leave-guard flows.
  - **Visual review:** captures at 1440 × 900, 1180 × 820 and 820 × 1180 found five problems, all fixed before the receipts:
    - deck lines broken in the narrow deck region;
    - chip-in-button ink filters;
    - a duplicated save status;
    - the inspector rendered outside the layout;
    - a quest set shown instead of the printed set.
  - **Design adjustment:** the 64–80 rem deck region is 22.5 rem, not the design's 20 rem. At 20 rem, deck lines broke words beside their steppers; 22.5 rem keeps whole words and four catalog columns.
  - **Browser tests:** eleven new deckbuilder tests in `reference.spec.ts`:
    - add and remove by pointer and keyboard, with undo;
    - the copy limit and its reason;
    - filters keeping edits, and Reset filters;
    - focus returning to the tile after inspection;
    - the printing preference;
    - the leave guard;
    - validation wording, with ownership kept apart from rules;
    - import reporting;
    - export formats;
    - the cost-curve table;
    - tablet portrait.
  - **Receipts:**
    - **RUN-20261022-018, failed (preserved):** 17 of 242. The view-switch options were 40 px tall inside their bordered group, and two scrolling regions (the pinned validation footer and the import list) could not take keyboard focus (axe `scrollable-region-focusable`). The options are now 44 px, the footer is a named focusable group, and the import list no longer scrolls on its own.
    - **RUN-20261022-019, passed:** gates and the full Chromium suite, 242/242.
- **Task 5, Collection binder (CHG-20261022-009):**
  - **Components (Experimental):** `Binder`, `BinderPocket`, `PocketGrid` and `CompletionSummary`, plus a generic `InspectorLayout`. The design's `SetPicker` is the existing `Select`, so no new component was needed.
  - **Tokens and strings:** `binder.pocket-min` (112 px) and `binder.go-to`; 18 component strings.
  - **Behaviour:**
    - two faces only when both fit with usable pockets; one face otherwise, or while inspecting;
    - Page Up and Page Down scoped to the binder, with focus moving to the new spread's first pocket;
    - only visible faces rendered, so offscreen pages are out of the focus order;
    - Go to card number with an explained "not found";
    - a fade with brief travel on page change, travel removed under reduced motion;
    - page buttons that stay in view while a tall spread scrolls.
  - **Reference stories:** partially owned, new player, ownership unavailable, loading, filtered to owned, printing navigation, single face, Grid, List, reduced motion, inspection, takedown fallback and unknown ownership, across all 29 pages of Hyperia City.
  - **Visual review:**
    - The binder started near y = 630 at 1440 px. The set picker moved into the header and the filters onto one row.
    - The page buttons were far from a single face. They now flank the faces and stay in view.
  - **Defects found by the new tests, fixed before the receipt:**
    - a keyboard page turn lost focus, because the focused pocket unmounted;
    - a declaration-order error that stopped the story from rendering.
  - **Browser tests:** seven Collection tests:
    - paging and scoped keys;
    - the focus order across the spread, with padding unfocusable;
    - go-to anchoring through a resize, and not-found;
    - filters keeping completion and carrying over between views;
    - unavailable ownership never shown as zero;
    - reduced motion;
    - inspection and focus return.
  - **Receipts:**
    - RUN-20261022-022: fixture tests and `catalog:verify`;
    - RUN-20261022-023: gates and the full Chromium suite, 290/290.
- **Task 6, pack opening (CHG-20261022-010):**
  - **Components (Experimental):** `ProductChoice`, `RevealCard`, `PackReveal`, `RevealControls` and `OpeningSummary`; the review reuses `Confirmation`.
  - **Tokens and strings:** `pack.product`, `pack.perspective`, `pack.summary-item`, `pack.summary-card` and `pack.reveal-max`; 15 component strings.
  - **Behaviour:**
    - real face-down cards using the official back;
    - a card turn in the major-motion duration, direct under reduced motion;
    - a rarest beat of light from Powerline's Amber identity, behind the card, within 900 ms, and a Highlight outline in forced colours;
    - announcements per revealed card;
    - "New" derived from the same demonstration holdings as the binder (6 of 12).
  - **Reference stories:** product choice and review, review, pending, mid-reveal (5 of 12), rarest beat, summary, interrupted and resumed, presentation failure, settlement pending, reduced motion and none held.
  - **Visual review:**
    - at 1440 × 900 the second row of cards fell below the fold; the reveal stage is now capped at 66 rem;
    - the beat reads as restrained light in Ink and Paper.
  - **Defect found by the new tests, fixed before the receipt:** the review dialog's close reset the flow to the product choice after confirming, so the pending state never showed.
  - **Browser tests:** seven pack tests:
    - the flow, with pending showing no percentage;
    - keyboard reveal with focus kept and an announcement;
    - skip reaching the summary, with page-anchored Collection links;
    - resume in the same order;
    - the beat behind the last card only, and reduced motion;
    - failure and pending settlement;
    - tablet portrait in three rows of four.
  - **Receipt:** RUN-20261022-026 passes the gates and the full Chromium suite, 332/332.
