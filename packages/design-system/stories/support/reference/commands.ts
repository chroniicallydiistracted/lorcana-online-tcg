import type { BoardObject, MatchPosition } from './match.ts';
import { objectCard, objectName } from './match.ts';
import { card, fullName } from './cards.ts';

// The match reference's local command machine (§20): idle → select → action → payment and targets → review → submit
// → pending → accepted, rejected or reconcile. Choices and reasons derive from the position and the real cards' rules
// text; receipts are fixture outcomes, never engine results.
export interface Choice { readonly id: string; readonly label: string; readonly detail?: string; readonly unavailable?: string }
const readyToAct = (o: BoardObject): string | undefined => o.exerted ? 'Exerted: it already acted this turn.' : o.drying ? 'Played this turn: it can\'t quest or challenge until your next turn.' : undefined;
const hasKeyword = (o: BoardObject, keyword: string) => new RegExp(`<${keyword}>`).test(objectCard(o).rulesText) || o.modifiers.some(m => m.label.startsWith(keyword));

export function actionsFor(position: MatchPosition, o: BoardObject): Choice[] {
  if (o.side !== 'player') return [{ id: 'inspect', label: 'Inspect', detail: 'Read the card and its current effects.' }];
  if (o.zone === 'location') return [{ id: 'inspect', label: 'Inspect', detail: 'Read the location and who is here.' }];
  if (o.zone === 'item') {
    const easy = /Easy Commute/.test(objectCard(o).rulesText);
    return [
      ...(easy ? [{ id: 'use', label: 'Use Easy Commute', detail: 'Exert to move a character of yours to a location for free.', ...(o.exerted ? { unavailable: 'Exerted.' } : {}) }] : []),
      { id: 'inspect', label: 'Inspect', detail: 'Read the item.' },
    ];
  }
  const blocked = readyToAct(o), lore = objectCard(o).lore ?? 0, location = position.objects.find(x => x.id === o.at);
  return [
    { id: 'quest', label: 'Quest', detail: `Gain ${String(lore)} lore.`, ...(blocked ? { unavailable: blocked } : {}) },
    { id: 'challenge', label: 'Challenge', detail: 'Choose an exerted opposing character or a location.', ...(blocked ? { unavailable: blocked } : {}) },
    { id: 'move', label: 'Move to a location', detail: o.at ? `At ${location ? objectCard(location).name : 'a location'}.` : 'Port Authority, move cost 1 ink.', ...(o.at ? { unavailable: 'Already at Port Authority.' } : {}) },
    { id: 'inspect', label: 'Inspect', detail: 'Read the card and its current effects.' },
  ];
}

export function challengeTargets(position: MatchPosition, attacker: BoardObject): Choice[] {
  const evasiveAttacker = hasKeyword(attacker, 'Evasive') || hasKeyword(attacker, 'Alert');
  return position.objects.filter(o => o.side === 'opponent' && o.zone !== 'item').map(o => {
    const name = objectName(o);
    if (o.zone === 'location') return { id: o.id, label: name, detail: `Location, willpower ${String(objectCard(o).willpower ?? 0)}.` };
    if (!o.exerted) return { id: o.id, label: name, unavailable: 'Ready characters can\'t be challenged.' };
    if (hasKeyword(o, 'Evasive') && !evasiveAttacker) return { id: o.id, label: name, unavailable: `Evasive: only characters with Evasive can challenge ${objectCard(o).name}.` };
    return { id: o.id, label: name, detail: `Exerted, willpower ${String(objectCard(o).willpower ?? 0)}.` };
  });
}

const singerValue = (rules: string) => Number(/<Singer> (\d+)/.exec(rules)?.[1] ?? 0);
export function songPayments(position: MatchPosition, songId: number): Choice[] {
  const song = card(songId), cost = song.cost ?? 0, p = position.player;
  const singers = position.objects.filter(o => o.side === 'player' && o.zone === 'character').map(o => {
    const c = objectCard(o), value = Math.max(c.cost ?? 0, singerValue(c.rulesText)), name = objectName(o);
    const unavailable = o.exerted ? 'Exerted: it can\'t exert to sing.' : o.drying ? 'Played this turn: it can\'t exert to sing yet.' : value < cost ? `Cost ${String(value)}: this song needs cost ${String(cost)} or Singer ${String(cost)}.` : undefined;
    return { id: `sing-${o.id}`, label: `Sing with ${name}`, detail: 'Exerts the singer; the song costs no ink.', ...(unavailable ? { unavailable } : {}) };
  });
  return [
    { id: 'ink', label: `Pay ${String(cost)} ink`, detail: `${String(p.readyInk)} ink ready.`, ...(p.readyInk < cost ? { unavailable: `Only ${String(p.readyInk)} ink ready.` } : {}) },
    { id: 'ink-drop', label: `Pay ${String(cost - 1)} ink and 1 ink drop`, detail: `${String(p.inkDrops)} ink drop available.`, ...(p.inkDrops < 1 || p.readyInk < cost - 1 ? { unavailable: 'No ink drop available.' } : {}) },
    ...singers,
  ];
}
export const songName = (id: number): string => fullName(card(id));

/** Characters that can quest now, for the bulk-quest review. */
export function questers(position: MatchPosition): BoardObject[] {
  return position.objects.filter(o => o.side === 'player' && o.zone === 'character' && !readyToAct(o));
}
