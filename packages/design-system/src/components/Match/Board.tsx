import type { ReactNode } from 'react';
import { Button as AriaButton } from 'react-aria-components';
import { CardImage } from '../CardTile/CardImage.tsx';
import type { Printing } from '../CardTile/types.ts';
import { GameSymbol } from '../GameSymbol/GameSymbol.tsx';
import { useMessages, useOfficialAssets } from '../../foundation/DesignSystemProvider.tsx';
import styles from './Board.module.css';

export interface BoardCardProps {
  printing: Printing;
  kind: 'character' | 'item' | 'location';
  exerted?: boolean;
  damage?: number;
  /** Played this turn: it can't quest, challenge or exert to sing yet. */
  drying?: boolean;
  /** A Shift stack: how many cards, and the card it is on. */
  stack?: { readonly count: number; readonly on: string };
  /** The location a character is at. */
  at?: string;
  /** Current effects as short chips ("+2 willpower", "Evasive (gained)"), kept apart from printed text. */
  modifiers?: readonly string[];
  highlight?: 'selected' | 'target' | 'none';
  /** Extra facts for the accessible name, such as current strength, willpower and lore. */
  facts?: string;
  onPress: () => void;
}
type Messages = ReturnType<typeof useMessages>;
/**
 * The accessible name and text markers of a board card, shared by BoardCard and the scene overlay so both read the
 * same (§19: one structure for every presentation).
 */
export function describeBoardCard({ printing, kind, exerted = false, damage = 0, drying = false, stack, at, modifiers = [], highlight = 'none', facts }: Omit<BoardCardProps, 'onPress'>, t: Messages): { label: string; markers: { key: string; text: string; short: string; tone?: 'danger' }[] } {
  const name = printing.version ? `${printing.name} – ${printing.version}` : printing.name;
  // Each marker has a long form for the accessible name and a short form for the visible chip.
  const markers: { key: string; text: string; short: string; tone?: 'danger' }[] = [];
  const add = (key: string, text: string, short = text, tone?: 'danger') => markers.push({ key, text, short, ...(tone ? { tone } : {}) });
  if (highlight === 'selected') add('selected', t('board.selected'));
  if (highlight === 'target') add('target', t('board.target'));
  if (exerted) add('exerted', t('board.exerted'));
  if (damage > 0) add('damage', t('board.damage', { count: damage }), t('board.damage', { count: damage }), 'danger');
  if (drying) add('drying', t('board.dryingLong'), t('board.drying'));
  if (stack) add('stack', t('board.stackLong', { count: stack.count, on: stack.on }), t('board.stack', { count: stack.count }));
  if (at) add('at', t('board.at', { place: at }));
  for (const m of modifiers) add(m, m);
  const state = exerted || kind === 'location' ? '' : kind === 'character' ? `${t('board.ready')}. ` : '';
  return { label: `${name}. ${state}${markers.map(m => m.text).join('. ')}${markers.length ? '. ' : ''}${facts ?? ''}`.trim(), markers };
}
/**
 * A card on the battlefield (§19): the card art, upright or turned for exerted cards and locations, with every public
 * state also written as a marker, so state never depends on rotation or colour alone. Selection and valid targets are
 * outline rings with text, never a glow.
 */
export function BoardCard(props: BoardCardProps) {
  const { printing, kind, exerted = false, highlight = 'none', onPress } = props;
  const t = useMessages(), official = useOfficialAssets(), { label, markers } = describeBoardCard(props, t);
  // The exert symbol only decorates the visible word, so with Lorcana assets switched off the word stands alone.
  const visible = markers.map(m => ({ ...m, node: m.key === 'exerted' && official ? <><GameSymbol name="exert" />{m.short}</> : m.short }));
  return <div className={styles.card} data-kind={kind} data-exerted={exerted || undefined} data-highlight={highlight === 'none' ? undefined : highlight}>
    <AriaButton className={styles.hit} onPress={onPress} aria-label={label}>
      <span className={styles.frame}><span className={styles.art}><CardImage printing={printing} decorative placeholder="name" /></span></span>
    </AriaButton>
    {visible.length > 0 && <ul className={styles.markers} aria-hidden="true">{visible.map(m => <li key={m.key} className={styles.marker} data-marker={m.key} data-tone={m.tone}>{m.node}</li>)}</ul>}
  </div>;
}

export interface BattlefieldSide {
  /** Names the side, for example "Imani Okafor's side". */
  readonly label: string;
  readonly locations: readonly { readonly card: ReactNode; readonly residents: readonly ReactNode[]; readonly label: string }[];
  readonly characters: readonly ReactNode[];
  readonly items: readonly ReactNode[];
}
export interface BattlefieldProps { opponent: BattlefieldSide; player: BattlefieldSide; labels: { characters: string; items: string } }
/**
 * The Flat-tier battlefield and semantic board (§19, §30): each side a named region holding one wrapping row of labelled
 * zones: locations with the characters at them, characters, then items. The same structure lies over the scene when the
 * scene draws the table.
 */
export function Battlefield({ opponent, player, labels }: BattlefieldProps) {
  const side = (s: BattlefieldSide, which: 'opponent' | 'player') => <section className={styles.side} data-side={which} aria-label={s.label}>
    {s.locations.map((l, i) => <div key={i} className={styles.location} role="group" aria-label={l.label}>{l.card}{l.residents}</div>)}
    <div className={styles.zone} role="group" aria-label={labels.characters}>{s.characters}</div>
    {s.items.length > 0 && <div className={styles.items} role="group" aria-label={labels.items}>{s.items}</div>}
  </section>;
  return <div className={styles.battlefield}>{side(opponent, 'opponent')}<div className={styles.divider} aria-hidden="true" />{side(player, 'player')}</div>;
}
