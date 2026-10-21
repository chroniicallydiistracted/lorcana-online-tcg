import type { CatalogPrinting, Rarity, RulesToken } from '@lorcana/rules-data';
import { fixtureImage, fixturePrinting, presentationCatalog } from '@lorcana/rules-data/fixtures';
import type { Printing } from '../../src/index.ts';

// Real cards from Ravensburger's catalog (decision D25): records and images from one dated acquisition, kept in
// packages/rules-data. Storybook serves the images from that package at /catalog-images.
const rarityLabels: Readonly<Record<Rarity, string>> = { common: 'Common', uncommon: 'Uncommon', rare: 'Rare', 'super-rare': 'Super Rare', legendary: 'Legendary', epic: 'Epic', enchanted: 'Enchanted', iconic: 'Iconic', special: 'Special' };
export const fullName = (card: CatalogPrinting): string => card.subtitle ? `${card.name} – ${card.subtitle}` : card.name;

/** The design system's presentational printing for one catalog printing and variant. */
export function toPrinting(card: CatalogPrinting, variantId = 'Regular'): Printing {
  const variant = card.variants.find(v => v.id === variantId) ?? card.variants[0], thumbnail = fixtureImage(card.printingId, 'thumbnail');
  const setId = card.setIds[0] ?? '', set = presentationCatalog.sets.find(s => s.id === setId);
  return {
    id: `${String(card.printingId)}-${variant?.id ?? 'Regular'}`,
    name: card.name,
    ...(card.subtitle ? { version: card.subtitle } : {}),
    inks: card.inks,
    setCode: setId,
    ...(set ? { setName: set.name } : {}),
    collectorNumber: card.collectorNumber ?? card.identifier,
    rarity: card.rarity ? rarityLabels[card.rarity] : '',
    finish: variant?.finish ?? 'normal',
    language: 'English',
    ...(card.artist ? { artist: card.artist } : {}),
    ...(thumbnail ? { image: { src: `/catalog-images/${thumbnail.file}`, width: thumbnail.width, height: thumbnail.height, alt: fullName(card) } } : {}),
  };
}
function withoutImage(source: Printing): Printing { const copy: { -readonly [K in keyof Printing]: Printing[K] } = { ...source }; delete copy.image; return copy; }

export const elsa = fixturePrinting(42);
export const printing = toPrinting(elsa);
export const foilPrinting = toPrinting(elsa, 'Foiled');
export const longPrinting = toPrinting(fixturePrinting(3134));
export const location = toPrinting(fixturePrinting(3299));
export const enchanted = toPrinting(fixturePrinting(2940));
/** Real printings whose image is absent from the data (the longest name, to exercise wrapping) or fails to load. */
export const missingImage = withoutImage(longPrinting);
export const brokenImage: Printing = { ...toPrinting(fixturePrinting(1693)), image: { src: '/catalog-images/not-recorded.jpg', width: 367, height: 512, alt: 'Bolt – Down but Not Out' } };
export const allPrintings: readonly Printing[] = presentationCatalog.printings.map(card => toPrinting(card));
export const longText = 'This deliberately long sentence checks wrapping, reading measure and that nothing is silently truncated when the content is much longer than a typical label in the interface.';

// Interim text for the current inspector and card-face stories: printed symbols read as their names. The card
// inspector redesign (decision D24) renders the symbols themselves.
const symbolWords: Readonly<Record<string, string>> = { ink: 'ink', exert: 'exert', strength: 'strength', willpower: 'willpower', lore: 'lore', inkwell: 'inkwell' };
const tokenText = (tokens: readonly RulesToken[]): string => tokens.map(token => {
  switch (token.kind) {
    case 'text': return token.text;
    case 'keyword': return token.keyword;
    case 'ability': return token.name;
    case 'symbol': return token.symbol ? symbolWords[token.symbol] ?? token.code : token.code;
    case 'break': return '\n';
  }
}).join('').trim();
export interface PrintedBlockData { readonly kind: 'ability' | 'keyword' | 'rules'; readonly heading?: string; readonly text: string }
/** Paragraphs of a real card's rules text as inspector blocks: a leading named ability or keyword becomes the heading. */
export function printedBlocks(card: CatalogPrinting): readonly PrintedBlockData[] {
  return card.rules.map(({ tokens }) => {
    const [first, ...rest] = tokens;
    if (first?.kind === 'ability') return { kind: 'ability', heading: first.name, text: tokenText(rest) };
    if (first?.kind === 'keyword') return { kind: 'keyword', heading: first.keyword, text: tokenText(rest) };
    return { kind: 'rules', text: tokenText(tokens) };
  });
}
