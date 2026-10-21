/**
 * Ravensburger's public Disney Lorcana catalog, version 3 (`https://api.lorcana.ravensburger.com/v3/catalog/{language}`).
 * These types name the fields this project reads; every record keeps its other fields untouched. The shape is
 * observed, not a published contract, so validation is strict about what normalization relies on and nothing else.
 */
export interface RavensburgerSet {
  readonly id: string;
  readonly name: string;
  readonly sort_number: number;
  readonly type: string;
  readonly thumbnail_image_url?: string;
}
export interface RavensburgerVariant {
  readonly variant_id: string;
  readonly detail_image_url: string;
  readonly foil_type?: string;
  readonly foil_mask_url?: string;
  readonly foil_top_layer?: string;
  readonly foil_top_layer_mask_url?: string;
  readonly second_foil_top_layer_mask_url?: string;
  readonly hot_foil_color?: string;
  readonly second_hot_foil_color?: string;
}
export interface RavensburgerRuling { readonly title: string; readonly body: string }
export interface RavensburgerCard {
  readonly culture_invariant_id: number;
  readonly deck_building_id?: string;
  readonly card_identifier: string;
  readonly name: string;
  readonly subtitle?: string;
  readonly card_sets: readonly string[];
  readonly magic_ink_colors: readonly string[];
  readonly ink_cost?: number;
  readonly ink_convertible?: boolean;
  readonly strength?: number;
  readonly willpower?: number;
  readonly quest_value?: number;
  readonly move_cost?: number;
  readonly subtypes: readonly string[];
  readonly rules_text: string;
  readonly flavor_text: string;
  readonly abilities: readonly string[];
  readonly rarity?: string;
  readonly special_rarity_id?: string;
  readonly set_rotation_state: string;
  readonly deck_building_limit?: number;
  readonly author: string;
  readonly searchable_keywords?: readonly string[];
  readonly additional_info: readonly RavensburgerRuling[];
  readonly thumbnail_url: string;
  readonly sort_number: number;
  readonly variants: readonly RavensburgerVariant[];
}
export const ravensburgerCategories = ['characters', 'actions', 'items', 'locations', 'supplies'] as const;
export type RavensburgerCategory = typeof ravensburgerCategories[number];
export interface RavensburgerCatalog {
  readonly catalog_hash: string;
  readonly application_shared_properties: { readonly current_app_version: string; readonly minimum_app_version: string };
  readonly card_sets: readonly RavensburgerSet[];
  readonly cards: { readonly [category: string]: readonly RavensburgerCard[] };
  readonly special_rarities: readonly { readonly id: string; readonly name: string }[];
}

type Shape = 'string' | 'number' | 'boolean' | 'strings' | 'url';
const cardFields: Readonly<Record<string, readonly [Shape, boolean]>> = {
  culture_invariant_id: ['number', true], card_identifier: ['string', true], name: ['string', true], card_sets: ['strings', true],
  magic_ink_colors: ['strings', true], subtypes: ['strings', true], rules_text: ['string', true], flavor_text: ['string', true],
  abilities: ['strings', true], set_rotation_state: ['string', true], author: ['string', true], thumbnail_url: ['url', true],
  sort_number: ['number', true], deck_building_id: ['string', false], subtitle: ['string', false], ink_cost: ['number', false],
  ink_convertible: ['boolean', false], strength: ['number', false], willpower: ['number', false], quest_value: ['number', false],
  move_cost: ['number', false], rarity: ['string', false], special_rarity_id: ['string', false], deck_building_limit: ['number', false],
  searchable_keywords: ['strings', false],
};
const variantFields: Readonly<Record<string, readonly [Shape, boolean]>> = {
  variant_id: ['string', true], detail_image_url: ['url', true], foil_type: ['string', false], foil_mask_url: ['url', false],
  foil_top_layer: ['string', false], foil_top_layer_mask_url: ['url', false], second_foil_top_layer_mask_url: ['url', false],
  hot_foil_color: ['string', false], second_hot_foil_color: ['string', false],
};
const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === 'object' && value !== null && !Array.isArray(value);
function fits(value: unknown, shape: Shape): boolean {
  if (shape === 'strings') return Array.isArray(value) && value.every(item => typeof item === 'string');
  if (shape === 'url') return typeof value === 'string' && /^https:\/\//.test(value);
  if (shape === 'number') return typeof value === 'number' && Number.isFinite(value);
  return typeof value === shape;
}
function checkFields(value: Record<string, unknown>, fields: Readonly<Record<string, readonly [Shape, boolean]>>, where: string): void {
  for (const [key, [shape, required]] of Object.entries(fields)) {
    if (!(key in value)) { if (required) throw new Error(`Invalid Ravensburger catalog: ${where} lacks ${key}`); continue; }
    if (!fits(value[key], shape)) throw new Error(`Invalid Ravensburger catalog: ${where}.${key} is not ${shape}`);
  }
}

/** Checks one card record and returns it typed. Throws with the record and field that failed. */
export function parseRavensburgerCard(value: unknown, where = 'card'): RavensburgerCard {
  if (!isRecord(value)) throw new Error(`Invalid Ravensburger catalog: ${where} is not an object`);
  checkFields(value, cardFields, where);
  const variants = value['variants'], rulings = value['additional_info'];
  if (!Array.isArray(variants) || variants.length === 0) throw new Error(`Invalid Ravensburger catalog: ${where}.variants is empty`);
  variants.forEach((variant, i) => { if (!isRecord(variant)) throw new Error(`Invalid Ravensburger catalog: ${where}.variants[${i}] is not an object`); checkFields(variant, variantFields, `${where}.variants[${i}]`); });
  if (!Array.isArray(rulings) || !rulings.every(r => isRecord(r) && typeof r['title'] === 'string' && typeof r['body'] === 'string')) throw new Error(`Invalid Ravensburger catalog: ${where}.additional_info is malformed`);
  return value as unknown as RavensburgerCard;
}
export function parseRavensburgerSet(value: unknown, where = 'set'): RavensburgerSet {
  if (!isRecord(value)) throw new Error(`Invalid Ravensburger catalog: ${where} is not an object`);
  checkFields(value, { id: ['string', true], name: ['string', true], sort_number: ['number', true], type: ['string', true], thumbnail_image_url: ['url', false] }, where);
  return value as unknown as RavensburgerSet;
}

/** Checks a whole catalog response: identity fields, every set and every card record. Unknown categories are rejected so new card kinds are reviewed, not dropped. */
export function parseRavensburgerCatalog(value: unknown): RavensburgerCatalog {
  if (!isRecord(value)) throw new Error('Invalid Ravensburger catalog: not an object');
  if (typeof value['catalog_hash'] !== 'string' || !/^[a-f0-9]{40}$/.test(value['catalog_hash'])) throw new Error('Invalid Ravensburger catalog: catalog_hash');
  const app = value['application_shared_properties'];
  if (!isRecord(app) || typeof app['current_app_version'] !== 'string' || typeof app['minimum_app_version'] !== 'string') throw new Error('Invalid Ravensburger catalog: application_shared_properties');
  const sets = value['card_sets'], cards = value['cards'], rarities = value['special_rarities'];
  if (!Array.isArray(sets) || sets.length === 0) throw new Error('Invalid Ravensburger catalog: card_sets is empty');
  sets.forEach((set, i) => parseRavensburgerSet(set, `card_sets[${i}]`));
  if (!isRecord(cards)) throw new Error('Invalid Ravensburger catalog: cards');
  const unknown = Object.keys(cards).filter(key => !(ravensburgerCategories as readonly string[]).includes(key));
  if (unknown.length) throw new Error(`Invalid Ravensburger catalog: unreviewed card categories ${unknown.join(', ')}`);
  for (const [category, list] of Object.entries(cards)) {
    if (!Array.isArray(list)) throw new Error(`Invalid Ravensburger catalog: cards.${category} is not a list`);
    list.forEach((card, i) => parseRavensburgerCard(card, `cards.${category}[${i}]`));
  }
  if (!Array.isArray(rarities) || !rarities.every(r => isRecord(r) && typeof r['id'] === 'string' && typeof r['name'] === 'string')) throw new Error('Invalid Ravensburger catalog: special_rarities');
  return value as unknown as RavensburgerCatalog;
}
