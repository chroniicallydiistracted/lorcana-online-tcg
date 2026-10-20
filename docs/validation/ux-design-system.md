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
