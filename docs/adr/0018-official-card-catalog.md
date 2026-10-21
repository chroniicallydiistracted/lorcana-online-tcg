# ADR 0018: Official card catalog and real-card fixtures

Status: accepted for implementation under Director decision D25 (2026-10-21; CHG-20261021-005).
Tasks: UX-01, UX-03, DOC-01, DOC-02; precursor work for CONTENT-01. Requirements: R20.001–R20.004 and R20.007–R20.011 (catalog data foundations only; none is accepted by this ADR).
Authority: decisions D07 (fan-content terms), D24 (inspector built from scratch), D25 (official card data, never made-up cards) and D26 (card tile); [fan-content policy](../policies/fan-content.md); blueprint §6.2 (content entities and ingestion).

## Context

- **D25:** the Director decided that all card data comes from Ravensburger's official API, never from made-up cards. The scope covers interface, Storybook and card-inspector work, including its browser tests. Engine and rules tests keep their synthetic fixtures, and neutral placeholders remain only as the takedown fallback.
- **Before this change:** the design system's stories used invented printings ("Synthetic Explorer") with neutral placeholder art. `packages/rules-data`, reserved for source manifests and the normalized catalog, had no implementation.
- **RULE-01:** its dated inventories record the official gallery and community printing records. Its raw bytes stay in the ignored `.local/` folder, with the committed dated metadata under `docs/rules/`.
- **The original Inkspire app** used two routes:
  - first a v2 catalog behind a client credential found in other software;
  - later the public v3 catalog.
- **Live check (2026-10-21):**
  - v3 is current and served without login. v4 and v5 return 403.
  - v2 returns an empty catalog.
  - English, German, French and Italian are served; Spanish returns 403.
  - Card images, thumbnails and foil masks are public, at opaque URLs given by the catalog.

## Decision

1. **Source.**
   - Card data comes from `https://api.lorcana.ravensburger.com/v3/catalog/{language}`, fetched with plain public GETs.
   - No credential, SSO route or v2 endpoint is used.
   - Each request is HTTPS, made sequentially, follows no redirects, and has a 60 s timeout and a 40 MB cap.
2. **Acquisition.**
   - `packages/rules-data/scripts/acquire.mjs` fetches English, German, French and Italian (required) and probes Spanish.
   - Raw bytes are stored content-addressed in the ignored `.local/catalog/ravensburger/`.
   - A new dated record in `docs/rules/` is created exclusively and never overwritten. It records per language: URL, request interval, HTTP status, cache headers, bytes, SHA-256, catalog hash, app versions and counts.
   - `docs/rules/` sits outside the source fingerprint, so an acquisition is captured as run evidence, as RULE-01's were.
3. **Validation.**
   - The validator is strict about every field normalization relies on: 15 fields required on every record and typed optional ones.
   - It keeps all other fields untouched.
   - It rejects unreviewed card categories, inks and rarities, so new card kinds get reviewed rather than dropped or guessed.
4. **Normalized catalog.** `@lorcana/rules-data` is a browser-safe ("public") package.
   - **Identity:** a printing (`culture_invariant_id`, shared across languages) is kept apart from the card in play (`deck_building_id`, shared by reprints).
   - **Finish:** variants carry finish, and a Regular variant can itself be foil, as Enchanted cards and many promos are. Foil layers keep the catalog's names for CardFX (§16).
   - **Ruling text:** FAQ rulings and line endings are normalized.
5. **Rules text for display.**
   - **Markup:** the catalog writes named abilities as `\Name\`, keywords as `<Keyword>` and printed symbols as `{X}`; reminder text is in parentheses. Tokens keep every printed character.
   - **Symbols:** `I`, `E`, `S`, `W`, `L` and `C` map to ink, exert, strength, willpower, lore and inkwell. The inkwell meaning of `C` was confirmed on a printed card.
   - **Breaks:** older records write breaks as `%`. Before a `•` list item it is a line break, in flavour text a line break before the attribution, and otherwise a paragraph break, matching current records.
   - **Interpretation:** tokenizing is for display and search only and never interprets an ability (blueprint §6.2).
6. **Reviewed corrections.**
   - **The defect:** nine records across the four languages lost a named ability's `\` delimiter.
   - **The ledger:** `src/corrections.ts` lists each one with:
     - the exact faulty markup and its fix;
     - its evidence: the same printing in the other languages.
   - **Rules:** a correction changes markup only, never the printed words, and applies only on an exact single match. Each printing records the ids applied.
   - **Staleness:** the full audit fails if a correction no longer matches anything, so it is removed once Ravensburger fixes the record.
   - Heuristic repair was rejected.
7. **Real-card fixture.**
   - `fixtures/selection.json` lists 12 printings, each with the presentation state it exercises.
   - `src/fixtures/presentation.json` holds their exact source records with the sets and rarities they use. `@lorcana/rules-data/fixtures` normalizes them at import with the same code as the full catalog.
   - The 24 images (thumbnail and each distinct full-card image) are stored byte for byte. Their manifest records source URL, retrieval time, SHA-256, bytes, dimensions, format, rendition and the rights basis `D07: Ravensburger fan-content terms` (fan-content rule 3).
8. **Checks.**
   - **Package tests, no network or cache:** validation (including real records with one field broken), normalization of known printed values, token sequences, exact round trips, the correction ledger, image checksums and dimensions, and acquisition against a local server.
   - **`catalog:verify`, needs the raw cache:** every acquired language validates, normalizes and round-trips in full with no unknown symbol or stray markup. The fixture is reproduced exactly from the recorded snapshot.
9. **Design system.**
   - **Independence:** components keep their own presentational `Printing` type and never import the catalog. Stories map catalog printings into it, and Storybook serves the fixture images from `packages/rules-data`.
   - **Takedown:** `CardImage` follows the provider's `officialAssets={false}` switch, as symbols already did.
   - **Dependency:** `@lorcana/rules-data` is a development dependency of the design system only, so the release closure is unchanged.

## Alternatives considered

- **The old v2 route with a client credential.** Rejected: it now returns an empty catalog, and the credential was never issued to this project.
- **Community catalogs (LorcanaJSON, Lorcast) as the source.** Rejected by D25. RULE-01's inventories stay as dated research.
- **Committing full snapshots.** Rejected: about 19 MB per acquisition across four languages, changing weekly. Hashes and a local cache keep them verifiable; the fixture subset is committed.
- **Loading images from Ravensburger in Storybook and CI.** Rejected: CI would depend on an external service and its availability. The fixture images are committed with their provenance.
- **Heuristic markup repair.** Rejected for the reviewed, self-expiring correction ledger.

## Consequences

- **Repository size:** grows by 4.4 MB of card images. Takedown readiness now includes removing these committed images on request, beyond the runtime switch.
- **Regenerating the fixture:** needs network access and the raw cache. Ordinary verification and CI need neither.
- **Card status:** showing a card admits, certifies or rewards nothing. All card identities remain uncertified, and engine and rules tests keep synthetic fixtures.
- **Localization facts for later work:**
  - Ravensburger serves no Spanish catalog.
  - The other catalogs carry English text for some printings: Italian 535, French 92, German 95.
  - The English catalog has one more character than the others.
- **Still to come:** catalog delivery to the running app belongs to CONTENT-01 and the WEB tasks: a server-side cache keyed by `catalog_hash`, card images through the versioned asset manifest, and the takedown switch for image routes.
