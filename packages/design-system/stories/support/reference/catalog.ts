import type { CatalogPrinting } from '@lorcana/rules-data';
import type { CatalogFilters, ImportLine } from '../../../src/index.ts';
import { allCards, categoryLabels, collectorOrder, fullName, rarityLabels, setName, setOrder } from './cards.ts';
import type { Deck } from './deck.ts';

/** Catalog cards for the deckbuilder: newest set first, then collector number, then printing (§17: deterministic ordering). */
export const catalogCards: readonly CatalogPrinting[] = [...allCards].filter(c => c.category !== 'supply').sort((a, b) => setOrder(b) - setOrder(a) || collectorOrder(a) - collectorOrder(b) || a.printingId - b.printingId);
const unique = (values: readonly string[]) => [...new Set(values)].sort((a, b) => a.localeCompare(b));
export const filterChoices = {
  costs: [1, 2, 3, 4, 5, 6, 7, 8],
  types: (['character', 'action', 'item', 'location'] as const).map(id => ({ id, label: categoryLabels[id] })),
  rarities: unique(catalogCards.map(c => c.specialRarity?.name ?? (c.rarity ? rarityLabels[c.rarity] : ''))).filter(Boolean).map(r => ({ id: r, label: r })),
  sets: unique(catalogCards.map(setName)).map(s => ({ id: s, label: s })),
  classifications: unique(catalogCards.flatMap(c => c.classifications)).map(c => ({ id: c, label: c })),
};
const fold = (text: string) => text.normalize('NFKD').replace(/[̀-ͯ]/g, '').replace(/[–—-]/g, ' ').replace(/\s+/g, ' ').trim().toLocaleLowerCase();

export function filterCatalog(filters: CatalogFilters): CatalogPrinting[] {
  const query = fold(filters.query);
  return catalogCards.filter(c =>
    (!query || fold(`${fullName(c)} ${c.classifications.join(' ')}`).includes(query)) &&
    (!filters.inks.length || c.inks.some(i => filters.inks.includes(i))) &&
    (!filters.costs.length || filters.costs.some(cost => cost === 8 ? (c.cost ?? 0) >= 8 : c.cost === cost)) &&
    (filters.type === 'any' || c.category === filters.type) &&
    (filters.rarity === 'any' || (c.specialRarity?.name ?? (c.rarity ? rarityLabels[c.rarity] : '')) === filters.rarity) &&
    (filters.set === 'any' || setName(c) === filters.set) &&
    (filters.inkable === 'any' || (filters.inkable === 'inkable') === Boolean(c.inkable)) &&
    (filters.classification === 'any' || c.classifications.includes(filters.classification)));
}

/** Parses "4 Judy Hopps – Helpful Officer" lines. Unmatched names are reported, never substituted (§18). */
export function parseImport(text: string): { lines: ImportLine[]; deck: Deck } {
  const lines: ImportLine[] = [], deck = new Map<number, number>();
  for (const raw of text.split('\n').map(l => l.trim()).filter(Boolean)) {
    const m = /^(\d+)\s*x?\s+(.+)$/i.exec(raw);
    if (!m) { lines.push({ text: raw, quantity: 0, status: 'unresolved', reason: 'No quantity at the start of the line.' }); continue; }
    const quantity = Number(m[1]), name = fold(m[2] ?? ''), match = catalogCards.find(c => fold(fullName(c)) === name);
    if (!match) { lines.push({ text: raw, quantity, status: 'unresolved', reason: 'No card with this name in the catalog. Nothing was added for this line.' }); continue; }
    deck.set(match.printingId, (deck.get(match.printingId) ?? 0) + quantity);
    lines.push({ text: raw, quantity, status: 'resolved', match: `${fullName(match)} (${setName(match)} ${match.collectorNumber ?? ''})` });
  }
  return { lines, deck };
}
