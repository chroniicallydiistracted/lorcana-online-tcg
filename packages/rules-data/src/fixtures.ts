import presentation from './fixtures/presentation.json' with { type: 'json' };
import imageManifest from './fixtures/images.json' with { type: 'json' };
import reference from './fixtures/reference.json' with { type: 'json' };
import referenceImageManifest from './fixtures/reference-images.json' with { type: 'json' };
import { normalizeRavensburgerCard, normalizeRavensburgerSet, type CatalogPrinting, type NormalizedCatalog } from './catalog.ts';
import { ravensburgerCategories, type RavensburgerCategory } from './ravensburger.ts';

/**
 * Real cards for Storybook and presentation tests (decision D25): exact records from one dated Ravensburger snapshot,
 * normalized here by the same code as the full catalog. Not game data: nothing here is admitted or certified for play.
 */
export interface FixtureImage {
  /** File name under `packages/rules-data/fixtures/images/`. */
  readonly file: string;
  readonly printingId: number;
  readonly rendition: 'thumbnail' | 'detail';
  readonly variantIds: readonly string[];
  readonly sourceUrl: string;
  readonly retrievedAt: string;
  readonly sha256: string;
  readonly bytes: number;
  readonly width: number;
  readonly height: number;
  readonly format: 'image/jpeg';
  readonly rightsBasis: string;
}
const isCategory = (value: string): value is RavensburgerCategory => (ravensburgerCategories as readonly string[]).includes(value);

type FixtureFile = typeof presentation | typeof reference;
function normalizeFixture(fixture: FixtureFile): NormalizedCatalog {
  return {
    source: { ...fixture.source, provider: 'ravensburger' },
    sets: fixture.card_sets.map(normalizeRavensburgerSet).sort((a, b) => a.order - b.order),
    printings: fixture.cards.map(({ category, record }) => {
      if (!isCategory(category)) throw new Error(`Unreviewed fixture category ${category}`);
      return normalizeRavensburgerCard(record, category, fixture.special_rarities);
    }),
  };
}
function reviewImages(manifest: typeof imageManifest | typeof referenceImageManifest): readonly FixtureImage[] {
  return manifest.images.map(image => {
    if (image.rendition !== 'thumbnail' && image.rendition !== 'detail' || image.format !== 'image/jpeg') throw new Error(`Unreviewed fixture image ${image.file}`);
    return { ...image, rendition: image.rendition, format: image.format };
  });
}
function findImage(images: readonly FixtureImage[], printingId: number, rendition: FixtureImage['rendition'], variantId: string): FixtureImage | undefined {
  return images.find(image => image.printingId === printingId && image.rendition === rendition && (rendition === 'thumbnail' || image.variantIds.includes(variantId)));
}

export const presentationCatalog: NormalizedCatalog = normalizeFixture(presentation);
/** Why each printing is in the fixture: the presentation states it exercises. */
export const presentationSelection: readonly { readonly printingId: number; readonly reason: string }[] = presentation.selection;
export const presentationImages: readonly FixtureImage[] = reviewImages(imageManifest);

export function fixturePrinting(printingId: number): CatalogPrinting {
  const printing = presentationCatalog.printings.find(p => p.printingId === printingId);
  if (!printing) throw new Error(`Printing ${String(printingId)} is not in the presentation fixture`);
  return printing;
}
export function fixtureImage(printingId: number, rendition: FixtureImage['rendition'], variantId = 'Regular'): FixtureImage | undefined {
  return findImage(presentationImages, printingId, rendition, variantId);
}

/**
 * The UX-01 reference screens' printings, all Hyperia City, from the same acquisition: the match decks, binder spreads,
 * pack and special printings with thumbnails (full-card images only where marked `detail`), and records without images
 * (`image: false`) for the rest of the set, so the binder can page through every printing.
 */
export const referenceCatalog: NormalizedCatalog = normalizeFixture(reference);
export const referenceSelection: readonly { readonly printingId: number; readonly reason: string; readonly detail?: true; readonly image?: false }[] = reference.selection.map(s => ({
  printingId: s.printingId, reason: s.reason, ...('detail' in s && s.detail === true ? { detail: true as const } : {}), ...('image' in s && s.image === false ? { image: false as const } : {}),
}));
export const referenceImages: readonly FixtureImage[] = reviewImages(referenceImageManifest);

export function referencePrinting(printingId: number): CatalogPrinting {
  const printing = referenceCatalog.printings.find(p => p.printingId === printingId);
  if (!printing) throw new Error(`Printing ${String(printingId)} is not in the reference fixture`);
  return printing;
}
export function referenceImage(printingId: number, rendition: FixtureImage['rendition'], variantId = 'Regular'): FixtureImage | undefined {
  return findImage(referenceImages, printingId, rendition, variantId);
}
