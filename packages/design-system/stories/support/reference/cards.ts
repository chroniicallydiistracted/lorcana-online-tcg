import type { CatalogPrinting, Rarity } from '@lorcana/rules-data';
import { fixtureImage, presentationCatalog, referenceCatalog, referenceImage } from '@lorcana/rules-data/fixtures';
import type { Printing } from '../../../src/index.ts';

// Real cards only (decision D25): the UX-01 reference fixture plus the presentation fixture, one dated acquisition.
export const rarityLabels: Readonly<Record<Rarity, string>> = { common: 'Common', uncommon: 'Uncommon', rare: 'Rare', 'super-rare': 'Super Rare', legendary: 'Legendary', epic: 'Epic', enchanted: 'Enchanted', iconic: 'Iconic', special: 'Special' };
export const categoryLabels: Readonly<Record<CatalogPrinting['category'], string>> = { character: 'Character', action: 'Action', item: 'Item', location: 'Location', supply: 'Supply' };
const sets = [...referenceCatalog.sets, ...presentationCatalog.sets.filter(s => !referenceCatalog.sets.some(r => r.id === s.id))];
export const allCards: readonly CatalogPrinting[] = [...referenceCatalog.printings, ...presentationCatalog.printings.filter(p => !referenceCatalog.printings.some(r => r.printingId === p.printingId))];

export function card(printingId: number): CatalogPrinting {
  const found = allCards.find(c => c.printingId === printingId);
  if (!found) throw new Error(`Printing ${String(printingId)} is in neither fixture`);
  return found;
}
export const fullName = (c: CatalogPrinting): string => c.subtitle ? `${c.name} – ${c.subtitle}` : c.name;
/** The set the printed identifier names ("29/204 EN 8" → set8), else the first listed set. */
const primarySet = (c: CatalogPrinting): string => { const n = c.identifier.split(' ')[2]; return c.setIds.find(id => id === `set${n ?? ''}`) ?? c.setIds[0] ?? ''; };
export const setName = (c: CatalogPrinting): string => sets.find(s => s.id === primarySet(c))?.name ?? primarySet(c);
export const setOrder = (c: CatalogPrinting): number => sets.find(s => s.id === primarySet(c))?.order ?? 0;
export const collectorOrder = (c: CatalogPrinting): number => Number.parseInt(c.collectorNumber ?? '', 10) || Number.MAX_SAFE_INTEGER;
const image = (c: CatalogPrinting, rendition: 'thumbnail' | 'detail', variant = 'Regular') => referenceImage(c.printingId, rendition, variant) ?? fixtureImage(c.printingId, rendition, variant);
export const hasDetail = (c: CatalogPrinting): boolean => image(c, 'detail') !== undefined;

/** The design system's presentational printing; `detail` uses the full-card image where the fixture has one. */
export function printing(c: CatalogPrinting, { variant = 'Regular', detail = false }: { variant?: string; detail?: boolean } = {}): Printing {
  const v = c.variants.find(x => x.id === variant) ?? c.variants[0], picture = (detail ? image(c, 'detail', variant) : undefined) ?? image(c, 'thumbnail');
  return {
    id: `${String(c.printingId)}-${v?.id ?? 'Regular'}`,
    name: c.name,
    ...(c.subtitle ? { version: c.subtitle } : {}),
    inks: c.inks,
    setCode: primarySet(c),
    setName: setName(c),
    collectorNumber: c.collectorNumber ?? c.identifier,
    rarity: c.specialRarity?.name ?? (c.rarity ? rarityLabels[c.rarity] : ''),
    finish: v?.finish ?? 'normal',
    language: 'English',
    ...(c.artist ? { artist: c.artist } : {}),
    ...(picture ? { image: { src: `/catalog-images/${picture.file}`, width: picture.width, height: picture.height, alt: fullName(c) } } : {}),
  };
}
