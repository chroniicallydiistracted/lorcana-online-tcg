# Card catalog validation

Change: CHG-20261021-005, by the Claude Code agent on Director request (decision D25). Architecture: [ADR 0018](../adr/0018-official-card-catalog.md). Operation: [runbook](../runbooks/card-catalog.md).

## Result

`packages/rules-data` now does the following:
- acquires Ravensburger's official v3 catalog with provenance;
- validates and normalizes it into a browser-safe catalog;
- provides 12 real printings with their images for Storybook and presentation tests.

The design system's stories and browser tests use these real cards instead of made-up ones. This is local container and Chromium evidence. It admits, certifies or rewards no card.

## Acquisition (RUN-20261021-012)

Dated record: [2026-10-21-ravensburger-catalog.json](../rules/2026-10-21-ravensburger-catalog.json). Each catalog was fetched on 2026-10-21 between 22:09:47Z and 22:09:48Z and passed full validation and normalization.

| Language | Outcome | Bytes | SHA-256 (prefix) | Catalog hash (prefix) | App version | Cards | Variants |
|---|---|---|---|---|---|---|---|
| en | acquired | 4,624,913 | `80e16c0b` | `ae38af81` | 2026.5 | 3,558 | 6,438 |
| de | acquired | 4,890,915 | `bd6c9547` | `ea50b4fb` | 2026.5 | 3,557 | 6,437 |
| fr | acquired | 4,827,930 | `645b2069` | `2b7aad1d` | 2026.5 | 3,557 | 6,437 |
| it | acquired | 4,788,575 | `1c3cde84` | `6a4d35b1` | 2026.5 | 3,557 | 6,437 |
| es | unavailable (HTTP 403) | | | | | | |

Every acquired catalog lists 18 sets through Hyperia City, 29 cards for the beta multiplayer format, and 2 Ink Drop supplies. The English catalog was last modified 2026-10-16 08:22:39 GMT. Raw bytes stay in the ignored `.local/catalog/ravensburger/`.

## Findings in the data

- **Identity:** each of the four languages resolves to the same 2,784 gameplay identities (`deck_building_id`). Printings (`culture_invariant_id`) are shared across languages.
- **Symbol codes:** `I`, `E`, `S`, `W`, `L` and `C` are ink, exert, strength, willpower, lore and inkwell. Madam Mim – Hummingbird prints `{C}` as the inkwell mark.
- **Line breaks:** older records write breaks as `%`: 84 in English and over 1,100 in each other language, in both rules and flavour text. They normalize to the line and paragraph breaks that current records use.
- **Broken markup:** nine records lost a named ability's `\` delimiter.
  - **Affected records:** English printings 699, 222, 226, 238 and 240 (the last four also served in the Italian catalog); German 222; French 105, 207 and 383.
  - **Ledger:** each is corrected by a reviewed entry in `src/corrections.ts`, with evidence from the same printing in the other languages. Every entry is markup-only and in use.
- **English text in other catalogs:** Italian serves 535 printings with English identifiers, French 92 and German 95. English has one character more than the others.
- **Finish:** Regular variants are foil on Enchanted cards and many promos. Variants are Regular, Foiled and StarterFoil.
- **Locations:** the image files are portrait, with the art printed sideways.

## Fixture

- **Selection:** 12 printings chosen for the states they exercise (`fixtures/selection.json`):
  - a character with a keyword, an ability, flavour text and an FAQ ruling, reprinted;
  - dual ink;
  - a location;
  - a song with three printings, one Enchanted;
  - an item;
  - the longest name and the longest rules text in the catalog;
  - a hot-foil Enchanted;
  - a Shift character with a ruling.
- **Images:** 24 images (12 thumbnails at 367 × 512 and 12 full cards at 1,468 × 2,048; 4,388,500 bytes), stored byte for byte with source URL, retrieval time, SHA-256, dimensions, rendition and the D07 rights basis.

## Design system

- **Stories and browser tests:** every card, set and ability now comes from the fixture.
- **Card tile (D26):** shows the card itself, named by card and printing ("Inspect Elsa – Spirit of Winter, The First Chapter 42/204"), so reprints stay distinguishable. Foil printings keep a "Foil" mark.
- **Takedown switch:** `CardImage` follows it.
- **Browser suite:** 163 tests, adding tile identity, the foil mark, real image loading, hover stability, the takedown placeholder and image failure.

## Receipts

| Run | Category | Result |
|---|---|---|
|RUN-20261021-012|container|Passed: acquisition of en, de, fr and it with full validation and normalization; es recorded unavailable (403).|
|RUN-20261021-013|container|Failed at `pnpm audit`: GHSA-f2ph-cmg5-wxc8 (critical, Storybook 10.0.0–10.6.1) was published that afternoon. Fixed by Storybook 10.6.2.|
|RUN-20261021-014|container|Passed at fingerprint `256dd89d`: configuration and workflow checks, `pnpm audit` clean, typecheck, lint and full suite (412 Node including 9 rules-data tests, 26 Python, upstream 406/1 skip, 2 injection).|
|RUN-20261021-015|container|Failed: `pnpm ci:design-system` was invoked in the Dev Container instead of through the isolated host launcher, so it refused to run. No check executed.|
|RUN-20261021-016|container|Passed: isolated design-system pipeline through the host launcher, 34 gates and 163/163 browser tests in 118 s.|
|RUN-20261021-017|container|Failed at the documentation gate: the verified features had not yet been re-bound to RUN-20261021-014. No code failure.|
|RUN-20261021-018|container|Passed: isolated foundation pipeline, all 14 stages in 562 s with exact timing (497 Node, 26 Python, upstream 406/1 skip, 2 injection, disposable PostgreSQL, live matches, web Chromium and Lab workers).|
|RUN-20261021-019|container|Passed: full-catalog audit against the raw cache. Every language validates, normalizes and round-trips its rules text (3,558 / 3,557 / 3,557 / 3,557), every correction applies, and the fixture equals the recorded snapshot's selection.|

## Limits

- **Snapshot and fixture only:** no delivery to the running app, server cache, asset manifest or image route exists (CONTENT-01, WEB tasks).
- **Not imported:** legality periods, errata and rulings beyond the catalog's FAQ entries.
- **No Spanish:** Ravensburger serves no Spanish catalog.
- **Interim inspector text:** the current inspector stories render printed symbols as words. The card inspector redesign (D24) renders the symbols.
- **Chromium only:** no other browser or device evidence.
