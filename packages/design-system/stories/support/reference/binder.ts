import type { CatalogPrinting, Ink } from '@lorcana/rules-data';
import { referenceCatalog } from '@lorcana/rules-data/fixtures';
import type { BinderPage, PocketState } from '../../../src/index.ts';
import { collectorOrder, hasThumbnail, printing, rarityLabels } from './cards.ts';

// Hyperia City as binder pages (§17): six ink sections and the special printings, each starting on a new page, nine
// pockets a page in collector order. Ownership here is invented demonstration data on printings the fixture has images
// for; every other printing is unowned, so its pocket shows the name and number without needing an image.
export const setTitle = 'Hyperia City · Set 14';
const inks: readonly Ink[] = ['amber', 'amethyst', 'emerald', 'ruby', 'sapphire', 'steel'];
const inkTitles: Readonly<Record<Ink, string>> = { amber: 'Amber', amethyst: 'Amethyst', emerald: 'Emerald', ruby: 'Ruby', sapphire: 'Sapphire', steel: 'Steel' };
export const setCards: readonly CatalogPrinting[] = referenceCatalog.printings.filter(c => c.setIds.includes('set14') && c.category !== 'supply' && /\/204 EN 14$/.test(c.identifier)).sort((a, b) => collectorOrder(a) - collectorOrder(b));
export const isStandard = (c: CatalogPrinting): boolean => collectorOrder(c) <= 204;

export interface Copies { readonly normal: number; readonly foil: number }
const owned = (list: readonly [number, number, number][]): Map<number, Copies> => new Map(list.map(([n, normal, foil]) => [setCards.find(c => collectorOrder(c) === n)!.printingId, { normal, foil }]));
/** Demonstration holdings: collector number, normal copies, foil copies. */
export const holdings: ReadonlyMap<number, Copies> = owned([
  [1, 2, 0], [2, 1, 0], [3, 3, 1], [4, 2, 0], [5, 1, 0], [6, 2, 0], [7, 1, 0], [9, 4, 0], [11, 1, 1], [12, 2, 0], [14, 1, 0], [15, 3, 0], [17, 0, 1],
  [137, 1, 0], [138, 2, 0], [139, 1, 1], [140, 3, 0], [141, 2, 0], [142, 1, 0], [144, 1, 0], [145, 2, 1], [147, 1, 0], [150, 2, 0], [151, 4, 0],
  [205, 0, 1], [223, 0, 1],
]);
for (const id of holdings.keys()) if (!hasThumbnail(setCards.find(c => c.printingId === id)!)) throw new Error(`Owned printing ${String(id)} has no image in the fixture`);

export type Holdings = 'partial' | 'new' | 'unavailable' | 'loading';
export interface CollectionFilters { readonly query: string; readonly ownership: 'any' | 'owned' | 'missing'; readonly foilsOnly: boolean; readonly ink: 'any' | Ink; readonly rarity: string }
export const noFilters: CollectionFilters = { query: '', ownership: 'any', foilsOnly: false, ink: 'any', rarity: 'any' };
const rarityOf = (c: CatalogPrinting) => c.rarity ? rarityLabels[c.rarity] : '';
export const rarities = [...new Set(setCards.map(rarityOf))].filter(Boolean);
export const filtersActive = (f: CollectionFilters): boolean => Boolean(f.query) || f.ownership !== 'any' || f.foilsOnly || f.ink !== 'any' || f.rarity !== 'any';

export function matches(c: CatalogPrinting, f: CollectionFilters, mode: Holdings): boolean {
  const held = mode === 'partial' ? holdings.get(c.printingId) : undefined, fold = (s: string) => s.toLocaleLowerCase();
  return (!f.query || fold(`${c.name} ${c.subtitle ?? ''} ${String(collectorOrder(c))}`).includes(fold(f.query))) &&
    (f.ownership === 'any' || (f.ownership === 'owned') === Boolean(held)) &&
    (!f.foilsOnly || (held?.foil ?? 0) > 0) && (f.ink === 'any' || c.inks.includes(f.ink)) && (f.rarity === 'any' || rarityOf(c) === f.rarity);
}
export function pocket(c: CatalogPrinting, mode: Holdings, f: CollectionFilters = noFilters): PocketState {
  if (mode === 'loading') return { kind: 'loading' };
  if (!matches(c, f, mode)) return { kind: 'filtered' };
  if (mode === 'unavailable') return { kind: 'unavailable', printing: printing(c) };
  const held = mode === 'partial' ? holdings.get(c.printingId) : undefined;
  return held ? { kind: 'owned', printing: printing(c, { variant: held.normal === 0 && held.foil > 0 && c.variants.some(v => v.id === 'Foiled') ? 'Foiled' : 'Regular' }), ...held } : { kind: 'missing', printing: printing(c) };
}

interface Section { readonly title: string; readonly inks?: readonly Ink[]; readonly cards: readonly CatalogPrinting[] }
export const sections: readonly Section[] = [
  ...inks.map(ink => ({ title: inkTitles[ink], inks: [ink], cards: setCards.filter(c => isStandard(c) && c.inks[0] === ink) })),
  { title: 'Special printings', cards: setCards.filter(c => !isStandard(c)) },
];
/** Every binder page, numbered from 1; a section's last page is padded to nine pockets. */
export function binderPages(mode: Holdings, f: CollectionFilters = noFilters): BinderPage[] {
  const pages: BinderPage[] = [];
  for (const section of sections) for (let i = 0; i < section.cards.length; i += 9) {
    const slice = section.cards.slice(i, i + 9);
    pages.push({ number: pages.length + 1, section: section.title, ...(section.inks ? { inks: section.inks } : {}), pockets: [...slice.map(c => pocket(c, mode, f)), ...Array.from({ length: 9 - slice.length }, (): PocketState => ({ kind: 'padding' }))] });
  }
  return pages;
}
/** The page holding a collector number such as "142" (the catalog's number is "142/204"). */
export const pageOfCard = (number: string): number | null => {
  if (!/^\d+$/.test(number)) return null;
  let page = 0;
  for (const section of sections) for (let i = 0; i < section.cards.length; i += 9) { page++; if (section.cards.slice(i, i + 9).some(c => collectorOrder(c) === Number(number))) return page; }
  return null;
};
export function completion(mode: Holdings) {
  if (mode === 'unavailable' || mode === 'loading') return { standard: 'unavailable', special: 'unavailable', foils: 'unavailable' } as const;
  const count = (list: readonly CatalogPrinting[]) => mode === 'new' ? 0 : list.filter(c => holdings.has(c.printingId)).length;
  const standard = setCards.filter(isStandard), special = setCards.filter(c => !isStandard(c));
  return {
    standard: { owned: count(standard), total: standard.length },
    special: { owned: count(special), total: special.length },
    foils: { owned: mode === 'new' ? 0 : [...holdings.values()].reduce((n, h) => n + h.foil, 0), available: setCards.filter(c => c.variants.some(v => v.finish === 'foil')).length },
  } as const;
}
export const cardByNumber = (n: number): CatalogPrinting => { const c = setCards.find(x => collectorOrder(x) === n); if (!c) throw new Error(`No Hyperia City card ${String(n)}`); return c; };
