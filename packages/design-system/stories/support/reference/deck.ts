import type { CatalogPrinting, Ink } from '@lorcana/rules-data';
import { card, categoryLabels, fullName, setName } from './cards.ts';

// Demonstration deck model for the deckbuilder and match references. The format values come from this record, never
// from components (§19); real legality, ownership and validation belong to the rules and ownership services.
export interface FormatPolicy {
  readonly name: string;
  readonly version: string;
  readonly deckSize: number;
  readonly copyLimit: number;
  readonly inkLimit: number;
  readonly rotation: string;
  readonly loreToWin: number;
}
export const corePolicy: FormatPolicy = { name: 'Core (demonstration policy)', version: '2026-10', deckSize: 60, copyLimit: 4, inkLimit: 2, rotation: 'CoreConstructed', loreToWin: 20 };
export const policyLabel = (p: FormatPolicy): string => `${p.name}, ${p.version}`;

/** printing ID → copies. Two printings of one card share its copy limit through the catalog's identity. */
export type Deck = ReadonlyMap<number, number>;
export const identity = (c: CatalogPrinting): string => c.identityId ?? `printing-${String(c.printingId)}`;
export const deckCount = (deck: Deck): number => [...deck.values()].reduce((n, q) => n + q, 0);
export const copiesOf = (deck: Deck, c: CatalogPrinting): number => [...deck].filter(([id]) => identity(card(id)) === identity(c)).reduce((n, [, q]) => n + q, 0);
export function deckInks(deck: Deck): Ink[] {
  const inks = new Set<Ink>();
  for (const [id, q] of deck) if (q > 0) for (const ink of card(id).inks) inks.add(ink);
  return [...inks];
}
const inkNames: Readonly<Record<Ink, string>> = { amber: 'Amber', amethyst: 'Amethyst', emerald: 'Emerald', ruby: 'Ruby', sapphire: 'Sapphire', steel: 'Steel' };
const singerValue = (c: CatalogPrinting): number => Number(/<Singer> (\d+)/.exec(c.rulesText)?.[1] ?? 0);
const songCost = (c: CatalogPrinting): number | null => c.classifications.includes('Song') ? c.cost : null;

export interface Issue { readonly tone: 'danger' | 'warning' | 'information'; readonly text: string }
/** Rules, ownership and advice kept apart (§18); every message names the card, quantity, reason and policy where relevant. */
export function validateDeck(deck: Deck, policy: FormatPolicy, owned?: ReadonlyMap<string, number>): { rules: Issue[]; ownership: Issue[]; advice: Issue[] } {
  const rules: Issue[] = [], ownership: Issue[] = [], advice: Issue[] = [], count = deckCount(deck), cards = [...deck].filter(([, q]) => q > 0).map(([id]) => card(id));
  const seen = new Set<string>();
  for (const c of cards) {
    const key = identity(c);
    if (seen.has(key)) continue;
    seen.add(key);
    const copies = copiesOf(deck, c);
    if (copies > policy.copyLimit) rules.push({ tone: 'danger', text: `${fullName(c)}: ${String(copies)} copies; ${policy.name} allows ${String(policy.copyLimit)} (policy ${policy.version}).` });
    if (owned && (owned.get(key) ?? 0) < copies) ownership.push({ tone: 'warning', text: `You own ${String(owned.get(key) ?? 0)} ${fullName(c)} and the deck uses ${String(copies)}. This is an ownership limit, not a rules restriction.` });
  }
  for (const c of cards) if (c.rotation !== policy.rotation) rules.push({ tone: 'danger', text: `${fullName(c)} (${setName(c)}, ${c.collectorNumber ?? c.identifier}): not in ${policy.name}; the catalog lists it for ${c.rotation === 'InfinityConstructed' ? 'Infinity Constructed' : c.rotation} only (policy ${policy.version}).` });
  const inks = deckInks(deck);
  if (inks.length > policy.inkLimit) {
    const extra = inks.slice(policy.inkLimit), from = cards.filter(c => c.inks.some(i => extra.includes(i))).map(fullName);
    rules.push({ tone: 'danger', text: `The deck uses ${String(inks.length)} inks (${inks.map(i => inkNames[i]).join(', ')}); ${policy.name} allows ${String(policy.inkLimit)}. ${extra.map(i => inkNames[i]).join(', ')} comes from ${from.join(', ')}.` });
  }
  // An incomplete deck can be saved but not played, so the missing cards are a rule still to resolve.
  if (count < policy.deckSize) rules.push({ tone: 'warning', text: `${String(policy.deckSize - count)} more cards needed: ${policy.name} decks have exactly ${String(policy.deckSize)}.` });
  if (count > policy.deckSize) rules.push({ tone: 'danger', text: `${String(count)} cards: ${policy.name} decks have exactly ${String(policy.deckSize)}. Remove ${String(count - policy.deckSize)}.` });
  for (const song of cards.filter(c => songCost(c) !== null)) {
    const cost = songCost(song) ?? 0, singers = cards.filter(c => c.category === 'character' && ((c.cost ?? 0) >= cost || singerValue(c) >= cost));
    advice.push({ tone: 'information', text: `${fullName(song)} (cost ${String(cost)}): ${String(singers.reduce((n, c) => n + (deck.get(c.printingId) ?? 0), 0))} characters in the deck can sing it.` });
  }
  return { rules, ownership, advice };
}

export function deckSummary(deck: Deck): { curve: { label: string; count: number }[]; facts: { label: string; value: string }[] } {
  const cards = [...deck].filter(([, q]) => q > 0).map(([id, q]) => ({ c: card(id), q })), count = deckCount(deck), n = new Intl.NumberFormat();
  const curve = [1, 2, 3, 4, 5, 6, 7, 8].map(cost => ({ label: cost === 8 ? '8+' : String(cost), count: cards.filter(({ c }) => cost === 8 ? (c.cost ?? 0) >= 8 : c.cost === cost).reduce((s, { q }) => s + q, 0) }));
  const inkable = cards.filter(({ c }) => c.inkable).reduce((s, { q }) => s + q, 0);
  const types = (['character', 'action', 'item', 'location'] as const).map(k => ({ label: `${categoryLabels[k]}s`, value: n.format(cards.filter(({ c }) => c.category === k).reduce((s, { q }) => s + q, 0)) }));
  return { curve, facts: [{ label: 'Inkable', value: `${n.format(inkable)} of ${n.format(count)}` }, { label: 'Uninkable', value: n.format(count - inkable) }, ...types] };
}

export const exportText = (deck: Deck): string => [...deck].filter(([, q]) => q > 0).map(([id, q]) => `${String(q)} ${fullName(card(id))}`).join('\n');
export const exportCsv = (deck: Deck): string => ['quantity,name,set,number', ...[...deck].filter(([, q]) => q > 0).map(([id, q]) => { const c = card(id); return `${String(q)},"${fullName(c).replace(/"/g, '""')}","${setName(c)}",${c.collectorNumber ?? ''}`; })].join('\n');
