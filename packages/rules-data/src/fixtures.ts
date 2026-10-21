import presentation from './fixtures/presentation.json' with { type: 'json' };
import imageManifest from './fixtures/images.json' with { type: 'json' };
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

export const presentationCatalog: NormalizedCatalog = {
  source: { ...presentation.source, provider: 'ravensburger' },
  sets: presentation.card_sets.map(normalizeRavensburgerSet).sort((a, b) => a.order - b.order),
  printings: presentation.cards.map(({ category, record }) => {
    if (!isCategory(category)) throw new Error(`Unreviewed fixture category ${category}`);
    return normalizeRavensburgerCard(record, category, presentation.special_rarities);
  }),
};
/** Why each printing is in the fixture: the presentation states it exercises. */
export const presentationSelection: readonly { readonly printingId: number; readonly reason: string }[] = presentation.selection;
export const presentationImages: readonly FixtureImage[] = imageManifest.images.map(image => {
  if (image.rendition !== 'thumbnail' && image.rendition !== 'detail' || image.format !== 'image/jpeg') throw new Error(`Unreviewed fixture image ${image.file}`);
  return { ...image, rendition: image.rendition, format: image.format };
});

export function fixturePrinting(printingId: number): CatalogPrinting {
  const printing = presentationCatalog.printings.find(p => p.printingId === printingId);
  if (!printing) throw new Error(`Printing ${String(printingId)} is not in the presentation fixture`);
  return printing;
}
export function fixtureImage(printingId: number, rendition: FixtureImage['rendition'], variantId = 'Regular'): FixtureImage | undefined {
  return presentationImages.find(image => image.printingId === printingId && image.rendition === rendition && (rendition === 'thumbnail' || image.variantIds.includes(variantId)));
}
