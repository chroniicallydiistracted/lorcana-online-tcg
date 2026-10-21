# Fan content, attribution and asset policy

Recorded: 2026-10-10 UTC. Decision owner: Project Director (D07). Change record: [CHG-20261010-005](../changes/CHG-20261010-005.json). Applies to every surface of the project: web app, repository, published artwork, video, social posts and any listing.

## Director decision (D07)

- **Assets:** use all planned Disney Lorcana assets in full, with no project-imposed limitation. This includes card art and images, card text, names, set symbols and the other assets the vision plans (R20.003 high-resolution art, R24 cosmetics, R06 products). The basis is Ravensburger's fan-content terms as cited by the Director.
- **Free:** the project stays free to players. Nobody is ever charged to use or access any content; this matches the existing "players never pay to play, obtain cards or use features" rule (blueprint §1.1).

This supersedes the earlier working recommendation of "neutral fixtures until authorized distribution is established". Synthetic fixtures remain the default for automated tests until engine qualification is recorded.

## Required notice (verbatim)

> [This website, artwork, etc.] uses trademarks and/or copyrights associated with Disney Lorcana TCG, used under Ravensburger’s Community Code Policy (https://cdn.ravensburger.com/lorcana/community-code-en). We are expressly prohibited from charging you to use or access this content. [This website, artwork, etc.] is not published, endorsed, or specifically approved by Disney or Ravensburger. For more information about Disney Lorcana TCG, visit https://www.disneylorcana.com/en-US/.

Replace only the bracketed subject: use the product name once D01 settles it, or "This website" / "This project" / "This artwork". Keep the rest word-for-word, including both links.

## Where the notice must appear

| Surface | Requirement | When |
|---|---|---|
| Web app | A footer or About/legal page reachable from every screen, and the start/loading screen | Before any official asset is shown to anyone outside local development: an acceptance gate for UX/WEB tasks and before phase 3 private playtests |
| Repository | `README.md` | Now |
| Published media | Artwork, videos, screenshots in posts, store or directory listings | Every publication |

## Rules that follow from the decision

1. **No payment for access or use.** No paid tiers, paid cosmetics, paid tournament entry or donation-unlocked perks. Supporter perks like duels.ink's name colors are not allowed here. Accepting even voluntary donations that unlock nothing needs a separate Director decision. Advertising is not planned.
2. **No implied endorsement.** Official Disney Lorcana logos are never used as the project's own branding; the product identity (D01) stays visibly distinct.
3. **Provenance for every imported asset** (blueprint §6.2): source system/URL, retrieval date, checksum, dimensions/format, rendition family, and rights basis `D07: Ravensburger fan-content terms`.
4. **Takedown readiness.**
   - Official assets are served from R2 through the versioned asset manifest.
   - One configuration switch replaces official art with neutral placeholders and disables card-image routes, without redeploying the engine.
   - Neutral fixtures stay maintained as that fallback.
   - Any Ravensburger or Disney request is answered and executed promptly.
5. **Conduct.** Ravensburger's Community Code behavior standards inform our chat, reporting and moderation features (R19, R31).

## Verification limits

- The URL in the notice resolves to Ravensburger's **Community Code** (PDF, effective May 10, 2023, retrieved 2026-10-10). It is a conduct policy covering behavior, cheating, personal data and counterfeit/unauthorized products. It does not itself state fan-content permissions or this notice.
- The notice is the community disclaimer the Director supplied, used verbatim by community creators such as The Lorcana Muses podcast. Ravensburger's separate **Fan Content Policy** on its brand portal (`brand.ravensburger-group.com`, also cited by the tcg-engines disclaimer) could not be read by automated retrieval.
- **Before public launch,** open that page in a browser and record a dated copy or notes here.
- **Revocation risk:** Ravensburger reserves sole discretion over whether an action violates its policies (Community Code, "Future-Proofing"). Pixelborn ended support in 2024 after Disney representatives asked for removal. The Director accepts this risk; takedown readiness is the mitigation.
- This document records a project decision. It is not legal advice.

## Implementation note — 2026-10-20 UTC

The design system renders this notice word for word through `FanContentNotice`, with the subject replaced by the product name "The Inkspire" (decision D17). A test compares the component text against the quotation above. The diagnostic web page shows it in its footer. The required start/loading and every-screen placements remain acceptance gates for the UX and WEB tasks (CHG-20261020-004).

## Implementation note — 2026-10-21 UTC

Under decision D21 the design system renders verified Lorcana symbols: six ink identities plus lore, exert, inkable, uninkable, strength and willpower.
- **Source:** the SVGs come from the Lorcana asset pack the Director collected, kept git-ignored in the original Inkspire app (files dated 2026-07-05). They are byte-identical copies.
- **Manifest:** `packages/design-system/src/assets/symbols/manifest.json` records each file's source path, checksum, view box, rendition and rights basis (`D07: Ravensburger fan-content terms`).
- **Missing provenance:** the pack's original download location is not recorded and is needed to complete rule 3.
- **Takedown:** `DesignSystemProvider officialAssets={false}` replaces every symbol with a neutral placeholder without other changes, for rule 4.

The card-face fonts (D20) are third-party typefaces, not Ravensburger assets. Their rights basis is the Director's decision D20 and is recorded in the font manifest (CHG-20261021-001).

## Provenance correction — 2026-10-21 UTC

Recorded 2026-10-21T14:32:09.557Z (CHG-20261021-003). This corrects the previous note: the source folder is not a collected asset pack of unknown origin.
- **Origin:** per the Director, most, if not all, of its files are the Director's own drawings of Lorcana symbols. The rest come directly from Ravensburger's publicly available digital assets.
- **Manifest:** the symbol manifest records this as the source for rule 3; which symbols are which is not distinguished.
- **Rights basis and takedown:** both kinds depict Disney Lorcana marks, so the rights basis stays D07 and the takedown switch covers both.
- **Open item:** none for rule 3 beyond per-file attribution, if the Director wants it recorded.

## Card data and fixtures — 2026-10-21 UTC

Recorded 2026-10-21 (CHG-20261021-004; decision D25). This narrows the D07 note that synthetic fixtures remain the default for automated tests.
- **Interface and presentation:** card data comes from Ravensburger's official catalog (`api.lorcana.ravensburger.com/v3/catalog/{lang}`), never made-up cards. This covers interface, Storybook and card-inspector work, including their automated browser tests.
- **Engine and rules tests:** they keep their synthetic fixtures until engine qualification is recorded.
- **Neutral placeholders:** they remain only as the takedown fallback of rule 4.
- **Provenance:** rule 3 applies to every catalog snapshot and card image the project stores: source URL, retrieval date, checksum, dimensions and format, rendition and the rights basis `D07: Ravensburger fan-content terms`.
