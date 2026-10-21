# Card catalog runbook

Owner: `packages/rules-data`. Architecture: [ADR 0018](../adr/0018-official-card-catalog.md). Evidence: [validation](../validation/card-catalog.md). Decisions: D07, D25.

## Use

- **Real cards in stories and presentation tests:** import from `@lorcana/rules-data/fixtures`.
  - `presentationCatalog` holds the normalized catalog.
  - `fixturePrinting(id)` returns one printing.
  - `fixtureImage(id, 'thumbnail' | 'detail', variantId)` returns an image with its provenance.

  Storybook serves the images at `/catalog-images/<file>`. Never invent a card, set or ability for interface work (D25). Engine and rules tests keep their synthetic fixtures.
- **Catalog code:** import types, validators and the normalizer from `@lorcana/rules-data`.
  - Validate with `parseRavensburgerCatalog` or `parseRavensburgerCard`.
  - Normalize with `normalizeRavensburgerCatalog` or `normalizeRavensburgerCard`.
  - Display rules text from `printing.rules`; `printing.rulesText` keeps the raw markup.
- **Corrections disclosure:** `printing.rulesCorrections` lists any reviewed markup corrections applied to a printing. A surface that shows printed wording can disclose them.

## Acquire a new snapshot

Run inside the Dev Container from the repository root, with a new dated path and run ID:

```bash
pnpm evidence:run --id RUN-YYYYMMDD-NNN --category container --summary "Acquire Ravensburger v3 catalogs" -- node packages/rules-data/scripts/acquire.mjs docs/rules/YYYY-MM-DD-ravensburger-catalog.json
```

- **What it does:** fetches English, German, French and Italian (required) and probes Spanish. It stores the raw bytes under `.local/catalog/ravensburger/<sha256>.json`, which stays ignored and is never committed.
- **The record:** written with exclusive creation, so an existing record is never overwritten.
- **Failure:** the command exits unsuccessfully when a required language is unavailable, malformed, or contains an unreviewed category, ink or rarity. Inspect every row. Review the new value before admitting it in `src/ravensburger.ts` or `src/catalog.ts`.

## Rebuild the presentation fixture

1. Edit `packages/rules-data/fixtures/selection.json`: each entry needs a printing ID and the presentation state it exercises.
2. Run `node packages/rules-data/scripts/select-fixtures.mjs docs/rules/<record>.json`. It:
   - verifies the cached snapshot against the record;
   - copies the selected records exactly;
   - downloads any new images, checking that each is a JPEG and recording its dimensions;
   - rewrites `src/fixtures/presentation.json` and `src/fixtures/images.json`.

   Unchanged images are reused only when their checksum still matches.
3. **When the record changes:** point the package's `catalog:verify` script at the new record.
4. **Review:** check the image diff and run the checks below.

## Checks

- **`pnpm --filter @lorcana/rules-data test`:** needs no network or cache. Runs validation and normalization on real records, rules-text tokens and round trips, the correction ledger, image checksums and dimensions, and acquisition against a local server.
- **`pnpm --filter @lorcana/rules-data catalog:verify`:** needs the raw cache.
  - Every acquired language validates, normalizes and round-trips its rules text, with no unknown symbol code or stray markup.
  - Every correction still matches a record.
  - The committed fixture equals what the selection derives from the snapshot.

## Corrections

- **When to add one:** when `catalog:verify` reports stray markup, compare the same printing in the other languages.
- **What it changes:** markup only, never the printed words.
- **How:** add an entry to `src/corrections.ts` with the exact faulty substring, its replacement and the evidence.
- **When to remove one:** when the audit reports it no longer matches anything.

## Limits

- **Snapshot and fixture only:** no running-app delivery, server cache, asset manifest or image route exists yet (CONTENT-01, WEB tasks).
- **Not imported yet:** legality periods, errata and rulings beyond the catalog's FAQ entries.
- **No Spanish catalog:** Ravensburger serves none. Other catalogs carry some English-text printings.
- **Not play data:** showing a card neither admits nor certifies it for play.
