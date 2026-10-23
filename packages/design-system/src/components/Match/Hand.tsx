import { useRef } from 'react';
import type { KeyboardEvent } from 'react';
import { Button } from '../Button/Button.tsx';
import { CardImage } from '../CardTile/CardImage.tsx';
import type { Printing } from '../CardTile/types.ts';
import { InkIdentity } from '../Ink/InkIdentity.tsx';
import { useMessages } from '../../foundation/DesignSystemProvider.tsx';
import styles from './Hand.module.css';

export interface HandCard {
  readonly id: string;
  readonly printing: Printing;
  /** Cost and type for the list view, such as "Cost 5 · Song". */
  readonly summary: string;
  /** Why the card can't be played now, if it can't. Shown in the list; the fan keeps it in the name. */
  readonly unplayable?: string;
}
export interface HandProps {
  /** Names the hand, for example "Your hand, 6 cards". */
  label: string;
  cards: readonly HandCard[];
  selected?: string | undefined;
  onSelect: (id: string) => void;
}
const fullName = (p: Printing) => p.version ? `${p.name} – ${p.version}` : p.name;

/**
 * The hand as a fan (§19). Each card's hit area is the visible slice, at least 44 px wide, so hit areas never overlap;
 * hover and focus raise the card's image above the fan without moving its hit area. Arrow keys move between cards and
 * Enter or Space selects.
 */
export function HandFan({ label, cards, selected, onSelect }: HandProps) {
  const t = useMessages(), list = useRef<HTMLOListElement>(null), mid = (cards.length - 1) / 2;
  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const to = event.key === 'ArrowRight' ? index + 1 : event.key === 'ArrowLeft' ? index - 1 : event.key === 'Home' ? 0 : event.key === 'End' ? cards.length - 1 : null;
    if (to === null) return;
    event.preventDefault();
    list.current?.querySelectorAll<HTMLButtonElement>('button')[Math.max(0, Math.min(cards.length - 1, to))]?.focus();
  };
  return <ol ref={list} className={styles.fan} aria-label={label} data-count={cards.length} style={{ ['--hand-count' as string]: cards.length }}>
    {cards.map((c, i) => <li key={c.id} className={styles.slot} data-selected={c.id === selected || undefined} style={{ ['--hand-offset' as string]: i - mid }}>
      <button type="button" className={styles.hit} aria-pressed={c.id === selected} onClick={() => onSelect(c.id)} onKeyDown={event => onKeyDown(event, i)}
        aria-label={`${fullName(c.printing)}. ${c.summary}${c.unplayable ? `. ${t('hand.unplayable', { reason: c.unplayable })}` : ''}`}>
        <span className={styles.lift}><CardImage printing={c.printing} decorative placeholder="name" /></span>
      </button>
    </li>)}
  </ol>;
}

/** The hand as a readable list (§19): the same cards and actions, with names, costs and any reason a card can't be played. */
export function HandList({ label, cards, selected, onSelect }: HandProps) {
  const t = useMessages();
  return <ul className={styles.list} aria-label={label}>{cards.map(c => <li key={c.id} className={styles.row} data-selected={c.id === selected || undefined}>
    <div className={styles.rowText}>
      <span className={styles.name}>{c.printing.name}</span>
      {c.printing.version && <span className={styles.version}>{c.printing.version}</span>}
      <span className={styles.summary}><span>{c.summary}</span><InkIdentity inks={c.printing.inks} compact /></span>
      {c.unplayable && <span className={styles.reason}>{c.unplayable}</span>}
    </div>
    <Button onPress={() => onSelect(c.id)} aria-pressed={c.id === selected} aria-label={`${t('hand.choose')}: ${fullName(c.printing)}`}>{t('hand.choose')}</Button>
  </li>)}</ul>;
}
