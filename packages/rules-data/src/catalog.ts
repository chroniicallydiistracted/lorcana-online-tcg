import { correctRulesText } from './corrections.ts';
import { normalizeFlavorText, parseRulesText, type RulesParagraph } from './rules-text.ts';
import { parseRavensburgerCard, parseRavensburgerSet, ravensburgerCategories, type RavensburgerCard, type RavensburgerCatalog, type RavensburgerCategory, type RavensburgerSet, type RavensburgerVariant } from './ravensburger.ts';

export const inkNames = ['amber', 'amethyst', 'emerald', 'ruby', 'sapphire', 'steel'] as const;
export type Ink = typeof inkNames[number];
export const rarities = ['common', 'uncommon', 'rare', 'super-rare', 'legendary', 'epic', 'enchanted', 'iconic', 'special'] as const;
export type Rarity = typeof rarities[number];
export type CardCategory = 'character' | 'action' | 'item' | 'location' | 'supply';

/** Where a catalog came from (fan-content rule 3). Retrieval facts belong to the dated acquisition record. */
export interface CatalogSource {
  readonly provider: 'ravensburger';
  readonly url: string;
  readonly language: string;
  readonly catalogHash: string;
  readonly appVersion: string;
  readonly retrievedAt: string;
  readonly sha256: string;
}
export interface CatalogSet { readonly id: string; readonly name: string; readonly type: string; readonly order: number; readonly thumbnailUrl: string | null }
/** Foil layers as the catalog names them; CardFX consumes these unchanged (§16). */
export interface FinishLayers {
  readonly foilType: string | null;
  readonly foilMaskUrl: string | null;
  readonly topLayer: string | null;
  readonly topLayerMaskUrl: string | null;
  readonly secondTopLayerMaskUrl: string | null;
  readonly hotFoilColor: string | null;
  readonly secondHotFoilColor: string | null;
}
/** One way a printing is produced: Regular, Foiled or StarterFoil. A Regular variant can itself be foil (Enchanted, many promos). */
export interface CatalogVariant { readonly id: string; readonly finish: 'normal' | 'foil'; readonly detailImageUrl: string; readonly layers: FinishLayers }
export interface CatalogRuling { readonly title: string; readonly body: string }
/**
 * One printing: a card as printed in one set, number and language. Printings that are the same card in play share
 * `identityId` (the catalog's deck-building id). Showing a printing never admits or certifies it for play.
 */
export interface CatalogPrinting {
  readonly printingId: number;
  readonly identityId: string | null;
  readonly category: CardCategory;
  readonly name: string;
  readonly subtitle: string | null;
  /** The printed identifier line, such as "86/207 EN 13". */
  readonly identifier: string;
  readonly collectorNumber: string | null;
  readonly setIds: readonly string[];
  readonly inks: readonly Ink[];
  readonly cost: number | null;
  readonly inkable: boolean | null;
  readonly strength: number | null;
  readonly willpower: number | null;
  readonly lore: number | null;
  readonly moveCost: number | null;
  readonly classifications: readonly string[];
  /** The catalog's raw markup, unchanged. `rules` holds the display tokens of its corrected, normalized form. */
  readonly rulesText: string;
  readonly rules: readonly RulesParagraph[];
  /** Ids of reviewed markup corrections applied to `rules` (see `corrections.ts`); the printed words are unchanged. */
  readonly rulesCorrections: readonly string[];
  readonly flavorText: string | null;
  readonly artist: string | null;
  readonly rarity: Rarity | null;
  readonly specialRarity: { readonly id: string; readonly name: string } | null;
  readonly rotation: string;
  readonly deckBuildingLimit: number | null;
  /** The catalog's search terms: mostly the story a card comes from. */
  readonly franchises: readonly string[];
  readonly rulings: readonly CatalogRuling[];
  readonly thumbnailUrl: string;
  readonly variants: readonly CatalogVariant[];
  readonly sortOrder: number;
}
export interface NormalizedCatalog { readonly source: CatalogSource; readonly sets: readonly CatalogSet[]; readonly printings: readonly CatalogPrinting[] }

const categoryNames: Readonly<Record<RavensburgerCategory, CardCategory>> = { characters: 'character', actions: 'action', items: 'item', locations: 'location', supplies: 'supply' };
const rarityNames: Readonly<Record<string, Rarity>> = { COMMON: 'common', UNCOMMON: 'uncommon', RARE: 'rare', SUPER: 'super-rare', LEGENDARY: 'legendary', EPIC: 'epic', ENCHANTED: 'enchanted', ICONIC: 'iconic', SPECIAL: 'special' };
const present = (value: string | undefined): string | null => value === undefined || value === '' || value === 'None' ? null : value;

function normalizeInk(value: string, where: string): Ink {
  const ink = value.toLowerCase();
  if (!(inkNames as readonly string[]).includes(ink)) throw new Error(`Unreviewed ink ${value} in ${where}`);
  return ink as Ink;
}
function normalizeVariant(variant: RavensburgerVariant): CatalogVariant {
  const foilType = present(variant.foil_type);
  return {
    id: variant.variant_id,
    finish: variant.variant_id !== 'Regular' || foilType !== null ? 'foil' : 'normal',
    detailImageUrl: variant.detail_image_url,
    layers: {
      foilType, foilMaskUrl: present(variant.foil_mask_url), topLayer: present(variant.foil_top_layer), topLayerMaskUrl: present(variant.foil_top_layer_mask_url),
      secondTopLayerMaskUrl: present(variant.second_foil_top_layer_mask_url), hotFoilColor: present(variant.hot_foil_color), secondHotFoilColor: present(variant.second_hot_foil_color),
    },
  };
}

/** Validates and normalizes one card record. Unreviewed inks and rarities throw rather than being dropped or guessed. */
export function normalizeRavensburgerCard(record: unknown, category: RavensburgerCategory, specialRarities: readonly { readonly id: string; readonly name: string }[] = []): CatalogPrinting {
  const id = typeof record === 'object' && record !== null && 'culture_invariant_id' in record ? String(record.culture_invariant_id) : '?';
  const card: RavensburgerCard = parseRavensburgerCard(record, `${category} ${id}`), where = `${card.name} (${String(card.culture_invariant_id)})`;
  if (card.rarity !== undefined && rarityNames[card.rarity] === undefined) throw new Error(`Unreviewed rarity ${card.rarity} in ${where}`);
  const parts = card.card_identifier.split(' '), special = card.special_rarity_id, corrected = correctRulesText(card.culture_invariant_id, card.rules_text);
  return {
    printingId: card.culture_invariant_id,
    identityId: card.deck_building_id ?? null,
    category: categoryNames[category],
    name: card.name,
    subtitle: present(card.subtitle),
    identifier: card.card_identifier,
    collectorNumber: parts.length === 3 ? parts[0] ?? null : null,
    setIds: card.card_sets,
    inks: card.magic_ink_colors.map(ink => normalizeInk(ink, where)),
    cost: card.ink_cost ?? null,
    inkable: card.ink_convertible ?? null,
    strength: card.strength ?? null,
    willpower: card.willpower ?? null,
    lore: card.quest_value ?? null,
    moveCost: card.move_cost ?? null,
    classifications: card.subtypes,
    rulesText: card.rules_text,
    rules: parseRulesText(corrected.text),
    rulesCorrections: corrected.applied,
    flavorText: present(normalizeFlavorText(card.flavor_text)),
    artist: present(card.author),
    rarity: card.rarity === undefined ? null : rarityNames[card.rarity] ?? null,
    specialRarity: special === undefined ? null : { id: special, name: specialRarities.find(r => r.id === special)?.name ?? special },
    rotation: card.set_rotation_state,
    deckBuildingLimit: card.deck_building_limit ?? null,
    franchises: card.searchable_keywords ?? [],
    rulings: card.additional_info.map(r => ({ title: r.title, body: r.body.replace(/\r\n?/g, '\n') })),
    thumbnailUrl: card.thumbnail_url,
    variants: card.variants.map(normalizeVariant),
    sortOrder: card.sort_number,
  };
}
export function normalizeRavensburgerSet(record: unknown): CatalogSet {
  const set: RavensburgerSet = parseRavensburgerSet(record);
  return { id: set.id, name: set.name, type: set.type.toLowerCase(), order: set.sort_number, thumbnailUrl: set.thumbnail_image_url ?? null };
}

/** Normalizes a full validated catalog. Sets are ordered by their sort number; printings keep the catalog's order by category. */
export function normalizeRavensburgerCatalog(catalog: RavensburgerCatalog, source: CatalogSource): NormalizedCatalog {
  const sets = catalog.card_sets.map(normalizeRavensburgerSet).sort((a, b) => a.order - b.order);
  const printings = ravensburgerCategories.flatMap(category => (catalog.cards[category] ?? []).map(card => normalizeRavensburgerCard(card, category, catalog.special_rarities)));
  const ids = new Set<number>();
  for (const printing of printings) { if (ids.has(printing.printingId)) throw new Error(`Duplicate printing ${String(printing.printingId)}`); ids.add(printing.printingId); }
  return { source, sets, printings };
}

/** Every printing of the same card in play, in the catalog's order. */
export function printingsOfIdentity(catalog: NormalizedCatalog, identityId: string): readonly CatalogPrinting[] {
  return catalog.printings.filter(printing => printing.identityId === identityId);
}
