import type { ReactNode } from 'react';
import { Badge } from '../Badge/Badge.tsx';
import { Button } from '../Button/Button.tsx';
import { Link } from '../Link/Link.tsx';
import { CardBack } from '../CardBack/CardBack.tsx';
import { CardImage } from '../CardTile/CardImage.tsx';
import type { Printing } from '../CardTile/types.ts';
import type { InkName } from '../Ink/InkIdentity.tsx';
import { useMessages } from '../../foundation/DesignSystemProvider.tsx';
import styles from './Pack.module.css';

const fullName = (p: Printing) => p.version ? `${p.name} – ${p.version}` : p.name;

export interface ProductChoiceProps {
  /** The product's name, for example "Hyperia City booster". */
  name: string;
  /** What it contains, for example "12 cards". */
  contents: string;
  /** How many the player holds; opening is free and never a purchase (§23). */
  available: number;
  /** The quiet artwork slot where authored pack art belongs. */
  artwork: ReactNode;
  onOpen: () => void;
}
/** One product the player holds, ready to open. The copy never implies a purchase. */
export function ProductChoice({ name, contents, available, artwork, onOpen }: ProductChoiceProps) {
  const t = useMessages();
  return <article className={styles.product} aria-label={name}>
    <div className={styles.productArt}>{artwork}</div>
    <div className={styles.productBody}>
      <h2 className={styles.productName}>{name}</h2>
      <p className={styles.productMeta}>{contents} · {t('pack.held', { count: available })}</p>
      <Button variant="primary" onPress={onOpen} isDisabled={available === 0}>{t('pack.open')}</Button>
    </div>
  </article>;
}

export interface RevealSlot {
  readonly printing: Printing;
  /** The printed rarity as text; the reveal never relies on an effect to show it (§23). */
  readonly rarity: string;
  readonly isNew: boolean;
  /** Ink identity for the restrained light of the rarest beat. */
  readonly ink: InkName;
}
export interface RevealCardProps {
  slot: RevealSlot;
  position: number;
  total: number;
  revealed: boolean;
  /** The rarest card's moment: light in the surroundings, never over the card, within the reward-beat budget. */
  beat?: boolean;
}
/** One card of an opening: face down until revealed, then the card with its rarity, Foil and New as text. */
export function RevealCard({ slot, position, total, revealed, beat = false }: RevealCardProps) {
  const t = useMessages(), p = slot.printing, foil = p.finish === 'foil';
  if (!revealed) return <div className={styles.slot} role="img" aria-label={t('pack.faceDown', { position, total })}><CardBack /></div>;
  return <div className={styles.slot} data-revealed data-beat={beat || undefined} data-ink={slot.ink} role="group" aria-label={`${t('pack.position', { position, total })}: ${fullName(p)}, ${slot.rarity}${foil ? `, ${t('finish.foilMark')}` : ''}${slot.isNew ? `, ${t('pack.new')}` : ''}`}>
    <div className={styles.card}><CardImage printing={p} decorative /></div>
    <div className={styles.labels} aria-hidden="true">
      <span className={styles.rarity}>{slot.rarity}</span>
      {foil && <Badge>{t('finish.foilMark')}</Badge>}
      {slot.isNew && <Badge tone="information">{t('pack.new')}</Badge>}
    </div>
  </div>;
}

export interface PackRevealProps {
  slots: readonly RevealSlot[];
  /** How many cards are face up, counted from the first. */
  revealed: number;
  /** Index of the rarest card, which gets the beat when it turns. */
  rarest: number;
}
/** The opening's cards in order: two rows of six on wide layouts, three rows of four on narrow ones. */
export function PackReveal({ slots, revealed, rarest }: PackRevealProps) {
  const t = useMessages();
  return <ol className={styles.reveal} aria-label={t('pack.cards')}>{slots.map((slot, i) => <li key={slot.printing.id}>
    <RevealCard slot={slot} position={i + 1} total={slots.length} revealed={i < revealed} beat={i === rarest && i === revealed - 1} />
  </li>)}</ol>;
}

export interface RevealControlsProps {
  revealed: number;
  total: number;
  onRevealNext: () => void;
  onRevealAll: () => void;
  onSkip: () => void;
}
/** Reveal next, Reveal all and Skip to summary. None waits on decoration; Skip and Reveal all always work (§23). */
export function RevealControls({ revealed, total, onRevealNext, onRevealAll, onSkip }: RevealControlsProps) {
  const t = useMessages(), done = revealed >= total;
  return <div className={styles.controls} role="toolbar" aria-label={t('pack.controls')}>
    <p className={styles.progress}>{t('pack.progress', { revealed, total })}</p>
    <div className={styles.buttons}>
      <Button onPress={onSkip}>{t('pack.skip')}</Button>
      {!done && <Button onPress={onRevealAll}>{t('pack.revealAll')}</Button>}
      <Button variant="primary" onPress={done ? onSkip : onRevealNext}>{done ? t('pack.toSummary') : t('pack.revealNext')}</Button>
    </div>
  </div>;
}

export interface OpeningSummaryProps {
  slots: readonly RevealSlot[];
  /** Links each card to its pocket in Collection; omitted while the collection update is pending. */
  collectionHref?: (printing: Printing) => string;
  /** Explains why Collection links are unavailable, such as pending settlement. */
  pendingNote?: ReactNode;
}
/** Every card of the opening with its labels, the number of new cards and a way into Collection for each (§23). */
export function OpeningSummary({ slots, collectionHref, pendingNote }: OpeningSummaryProps) {
  const t = useMessages(), fresh = slots.filter(s => s.isNew).length;
  return <section className={styles.summary} aria-label={t('pack.summary')}>
    <p className={styles.summaryLead}>{t('pack.newCount', { count: fresh, total: slots.length })}</p>
    {pendingNote}
    <ul className={styles.summaryGrid}>{slots.map(slot => <li key={slot.printing.id} className={styles.summaryItem}>
      <div className={styles.summaryCard}><CardImage printing={slot.printing} decorative /></div>
      <div className={styles.summaryText}>
        <span className={styles.summaryName}>{slot.printing.name}</span>
        {slot.printing.version && <span className={styles.summaryVersion}>{slot.printing.version}</span>}
        <span className={styles.labels}><span className={styles.rarity}>{slot.rarity}</span>{slot.printing.finish === 'foil' && <Badge>{t('finish.foilMark')}</Badge>}{slot.isNew && <Badge tone="information">{t('pack.new')}</Badge>}</span>
        {collectionHref && <Link href={collectionHref(slot.printing)} aria-label={`${t('pack.viewInCollection')}: ${fullName(slot.printing)}`}>{t('pack.viewInCollection')}</Link>}
      </div>
    </li>)}</ul>
  </section>;
}
