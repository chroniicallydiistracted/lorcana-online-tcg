import type { ReactNode } from 'react';
import { Button as AriaButton } from 'react-aria-components';
import { CardImage } from '../CardTile/CardImage.tsx';
import type { Printing } from '../CardTile/types.ts';
import { GameSymbol } from '../GameSymbol/GameSymbol.tsx';
import { useMessages } from '../../foundation/DesignSystemProvider.tsx';
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
/**
 * A card on the battlefield (§19): the card art, upright or turned for exerted cards and locations, with every public
 * state also written as a marker, so state never depends on rotation or colour alone. Selection and valid targets are
 * outline rings with text, never a glow.
 */
export function BoardCard({ printing, kind, exerted = false, damage = 0, drying = false, stack, at, modifiers = [], highlight = 'none', facts, onPress }: BoardCardProps) {
  const t = useMessages(), name = printing.version ? `${printing.name} – ${printing.version}` : printing.name;
  const markers: { key: string; node: ReactNode; text: string; tone?: 'danger' }[] = [];
  if (highlight === 'selected') markers.push({ key: 'selected', node: t('board.selected'), text: t('board.selected') });
  if (highlight === 'target') markers.push({ key: 'target', node: t('board.target'), text: t('board.target') });
  if (exerted) markers.push({ key: 'exerted', node: <><GameSymbol name="exert" />{t('board.exerted')}</>, text: t('board.exerted') });
  if (damage > 0) markers.push({ key: 'damage', node: t('board.damage', { count: damage }), text: t('board.damage', { count: damage }), tone: 'danger' });
  if (drying) markers.push({ key: 'drying', node: t('board.drying'), text: t('board.dryingLong') });
  if (stack) markers.push({ key: 'stack', node: t('board.stack', { count: stack.count }), text: t('board.stackLong', { count: stack.count, on: stack.on }) });
  if (at) markers.push({ key: 'at', node: t('board.at', { place: at }), text: t('board.at', { place: at }) });
  for (const m of modifiers) markers.push({ key: m, node: m, text: m });
  const state = exerted || kind === 'location' ? '' : kind === 'character' ? `${t('board.ready')}. ` : '';
  return <div className={styles.card} data-kind={kind} data-exerted={exerted || undefined} data-highlight={highlight === 'none' ? undefined : highlight}>
    <AriaButton className={styles.hit} onPress={onPress} aria-label={`${name}. ${state}${markers.map(m => m.text).join('. ')}${markers.length ? '. ' : ''}${facts ?? ''}`.trim()}>
      <span className={styles.frame}><span className={styles.art}><CardImage printing={printing} decorative /></span></span>
    </AriaButton>
    {markers.length > 0 && <ul className={styles.markers} aria-hidden="true">{markers.map(m => <li key={m.key} className={styles.marker} data-marker={m.key} data-tone={m.tone}>{m.node}</li>)}</ul>}
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
