import type { Deck } from './deck.ts';
import { card } from './cards.ts';
import { identity } from './deck.ts';

// The two demonstration decks of the reference fixture (packages/rules-data/fixtures/reference-selection.json): 60 real
// Core cards each, two inks each. Deck names and ownership figures are invented and labelled as demonstration.
export const playerDeckName = 'Zootopia Patrol';
export const playerDeck: Deck = new Map([
  [3274, 4], [3280, 4], [3268, 3], [3269, 2], [3290, 4], [3276, 2], [3289, 3], [3283, 2], [3292, 2], [3297, 2], [3299, 2], [3271, 2],
  [3439, 4], [3457, 3], [3448, 2], [3459, 4], [3436, 3], [3449, 3], [3454, 2], [3466, 3], [3456, 2], [3469, 2],
]);
export const opponentDeck: Deck = new Map([
  [3416, 4], [3409, 3], [3404, 3], [3405, 4], [3407, 3], [3410, 3], [3415, 3], [3433, 2], [3432, 3], [3435, 2],
  [3336, 4], [3337, 4], [3350, 3], [3356, 3], [3351, 2], [3344, 3], [3343, 2], [3365, 2], [3358, 3], [3364, 2], [3349, 2],
]);
/** Working state: the player's deck eight cards short of 60, valid so far. */
export const workingDeck: Deck = new Map([...playerDeck].map(([id, q]) => [id, [3283, 3454, 3456, 3469].includes(id) ? 0 : q] as const).filter(([, q]) => q > 0));
/** Invalid state: a fifth Judy Hopps – Helpful Officer, a card outside Core (Bolt) and a third ink (Henry J. Waternoose III). */
export const invalidDeck: Deck = new Map([...workingDeck, [3274, 5], [1693, 1], [3134, 1]]);
/** Demonstration ownership by card identity: short of the deck for three cards, so ownership limits appear. */
export const ownership: ReadonlyMap<string, number> = new Map([...playerDeck].map(([id, q]) => [identity(card(id)), id === 3457 ? 2 : id === 3448 ? 1 : id === 3289 ? 2 : q + 1] as const));
