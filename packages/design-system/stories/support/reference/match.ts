import type { CatalogPrinting } from '@lorcana/rules-data';
import { card, fullName } from './cards.ts';
import { corePolicy } from './deck.ts';
import { players } from './frame.tsx';

// The crowded-match position (design screen 1): turn 7 of a plausible game between the two reference decks. Authored,
// not engine-run; every state comes from a real card or rule, and its reachability is not certified. The scene, the
// Flat-tier battlefield and the panels all read this one object (§19).
export type Side = 'player' | 'opponent';
export interface BoardObject {
  readonly id: string;
  readonly printingId: number;
  readonly side: Side;
  readonly zone: 'character' | 'item' | 'location';
  readonly exerted: boolean;
  readonly damage: number;
  readonly drying: boolean;
  /** Cards under this one, base first: a Shift stack's base character. */
  readonly under: readonly number[];
  /** The location this character is at. */
  readonly at?: string;
  /** Current effects, kept apart from printed wording. */
  readonly modifiers: readonly { readonly label: string; readonly source: string }[];
}
export interface PlayerState { readonly name: string; readonly lore: number; readonly ink: number; readonly readyInk: number; readonly inkDrops: number; readonly deck: number; readonly discard: readonly number[]; readonly hand: number }
export interface LogEntry { readonly turn: number; readonly actor: Side; readonly text: string }
export interface MatchPosition {
  readonly turn: number;
  readonly phase: string;
  readonly active: Side;
  readonly loreToWin: number;
  readonly player: PlayerState;
  readonly opponent: PlayerState;
  readonly objects: readonly BoardObject[];
  /** The player's own hand, which only they may see. */
  readonly hand: readonly number[];
  readonly log: readonly LogEntry[];
}
const object = (id: string, printingId: number, side: Side, zone: BoardObject['zone'], state: Partial<Omit<BoardObject, 'id' | 'printingId' | 'side' | 'zone'>> = {}): BoardObject =>
  ({ id, printingId, side, zone, exerted: false, damage: 0, drying: false, under: [], modifiers: [], ...state });

export const crowdedMatch: MatchPosition = {
  turn: 7, phase: 'Main phase', active: 'player', loreToWin: corePolicy.loreToWin,
  player: { name: players.self, lore: 12, ink: 7, readyInk: 5, inkDrops: 1, deck: 34, discard: [3269, 3290, 3271, 3454], hand: 6 },
  opponent: { name: players.opponent, lore: 14, ink: 7, readyInk: 4, inkDrops: 2, deck: 32, discard: [3337, 3364, 3344, 3365, 3356], hand: 7 },
  objects: [
    object('p-port', 3299, 'player', 'location', { modifiers: [{ label: '+2 willpower', source: 'Hyperia City Express, Stylish Convenience' }] }),
    object('p-bogo', 3448, 'player', 'character', { exerted: true, at: 'p-port' }),
    object('p-judy', 3274, 'player', 'character', { at: 'p-port' }),
    object('p-kit', 3457, 'player', 'character', { under: [3439] }),
    object('p-claw', 3280, 'player', 'character', { damage: 2 }),
    object('p-big', 3459, 'player', 'character', { drying: true }),
    object('p-express', 3466, 'player', 'item'),
    object('p-speakers', 3297, 'player', 'item'),
    object('o-institute', 3435, 'opponent', 'location'),
    object('o-lafayette', 3407, 'opponent', 'character', { exerted: true, at: 'o-institute' }),
    object('o-honey', 3409, 'opponent', 'character', { under: [3416] }),
    object('o-wasabi', 3404, 'opponent', 'character', { exerted: true }),
    object('o-baymax', 3405, 'opponent', 'character', { exerted: true, modifiers: [{ label: 'Evasive (gained)', source: 'Hiro Hamada – Versatile Inventor, Turbo Thrusters, until the start of Imani\'s next turn' }] }),
    object('o-hiro', 3336, 'opponent', 'character'),
    object('o-gogo', 3410, 'opponent', 'character'),
    object('o-hat', 3433, 'opponent', 'item'),
  ],
  hand: [3292, 3268, 3289, 3436, 3449, 3283],
  log: [
    { turn: 6, actor: 'opponent', text: 'Imani played Hiro Hamada – Versatile Inventor and paid 1 ink: Baymax – Qualified Physician gains Evasive until the start of Imani\'s next turn.' },
    { turn: 6, actor: 'opponent', text: 'Go Go Tomago – Extreme Tester challenged Clawhauser – Safety Officer (Bodyguard). Clawhauser took 2 damage; Go Go Tomago was banished.' },
    { turn: 6, actor: 'opponent', text: 'Imani quested with Wasabi – Future Thinker, Lafayette – All Ears and Baymax – Qualified Physician: +4 lore (13).' },
    { turn: 7, actor: 'player', text: 'Rowan readied, set 1 card into the inkwell and drew a card.' },
    { turn: 7, actor: 'player', text: 'Rowan quested with Chief Bogo – Police Commissioner: +3 lore (11), then moved him to Port Authority for free (I Know These Streets).' },
    { turn: 7, actor: 'player', text: 'Port Authority, Welcome to Town: each player got 1 ink drop and gained 1 lore. Rowan 12, Imani 14.' },
    { turn: 7, actor: 'player', text: 'Rowan played Mr. Big – Distribution Magnate for 2 ink.' },
  ],
};

export const objectCard = (o: BoardObject): CatalogPrinting => card(o.printingId);
export const objectName = (o: BoardObject): string => fullName(objectCard(o));
