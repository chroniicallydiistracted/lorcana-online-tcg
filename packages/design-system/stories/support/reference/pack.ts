import type { RevealSlot } from '../../../src/index.ts';
import { cardByNumber, holdings } from './binder.ts';
import { fullName, printing, rarityLabels } from './cards.ts';

// The reference fixture's demonstration pack (packages/rules-data/fixtures/reference-selection.json): twelve real
// Hyperia City printings in reveal order, building to the rarest. A demonstration composition, not the official
// distribution. "New" follows the same demonstration holdings as the Collection binder.
const order: readonly (readonly [number, string?])[] = [[2], [7], [13], [138], [143], [149], [8], [16], [147], [153], [141, 'Foiled'], [17]];
export const packSlots: readonly RevealSlot[] = order.map(([n, variant = 'Regular']) => {
  const c = cardByNumber(n);
  return { printing: printing(c, { variant }), rarity: c.rarity ? rarityLabels[c.rarity] : '', isNew: !holdings.has(c.printingId), ink: c.inks[0] ?? 'amber' };
});
export const rarestIndex = packSlots.length - 1;
export const compositionNote = 'Demonstration composition: 6 common, 3 uncommon, 2 rare or higher and 1 foil. Not the official distribution.';
export const slotName = (slot: RevealSlot): string => `${fullName(cardByNumber(Number.parseInt(slot.printing.collectorNumber, 10)))}, ${slot.rarity}${slot.printing.finish === 'foil' ? ', Foil' : ''}${slot.isNew ? ', New' : ''}`;
