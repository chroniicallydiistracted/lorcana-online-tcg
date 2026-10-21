# packages/rules-data

Browser-safe card catalog from Ravensburger's official v3 API (decision D25; [ADR 0018](../../docs/adr/0018-official-card-catalog.md)).

- **`@lorcana/rules-data`** exports:
  - the observed v3 record types and their validators;
  - the normalized catalog: printings kept apart from the card in play, variants and finishes, foil layers for CardFX;
  - display tokens for rules text;
  - the reviewed markup corrections.
- **`@lorcana/rules-data/fixtures`** exports a real-card presentation fixture: 12 printings and 24 images from one dated acquisition, each with its provenance.
- **Not yet here:** legality periods, rulings beyond the catalog's FAQ entries, errata, and anything admitted or certified for play. All card identities remain uncertified.
- **Scripts** (`scripts/`, Node only) acquire catalogs into the ignored `.local/catalog/ravensburger/`, write dated acquisition records under `docs/rules/`, build the fixture and verify it against the raw cache.

Operation: [card catalog runbook](../../docs/runbooks/card-catalog.md). Evidence and limits: [validation](../../docs/validation/card-catalog.md). Follow [the universal workflow](../../docs/DEVELOPMENT_WORKFLOW.md) for changes, documentation review and timestamped evidence.
