/** Player operation metadata only; admission, input legality and actor authority remain server checks. */
export const PLAYER_MOVES = Object.freeze([
  'chooseWhoGoesFirst', 'alterHand', 'putCardIntoInkwell', 'playCard',
  'quest', 'questWithAll', 'challenge', 'moveCharacterToLocation',
  'activateAbility', 'resolveBag', 'resolveEffect', 'passTurn', 'concede',
] as const);
export type PlayerMove = typeof PLAYER_MOVES[number];
export function isPlayerMove(value: unknown): value is PlayerMove {
  return typeof value === 'string' && PLAYER_MOVES.some(move => move === value);
}
