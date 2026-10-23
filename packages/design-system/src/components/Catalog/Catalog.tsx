import type { ReactNode } from 'react';
import { IconButton } from '../Button/Button.tsx';
import { CardTile } from '../CardTile/CardTile.tsx';
import type { Printing } from '../CardTile/types.ts';
import { InkIdentity } from '../Ink/InkIdentity.tsx';
import { useMessages } from '../../foundation/DesignSystemProvider.tsx';
import styles from './Catalog.module.css';

const fullName = (p: Printing) => p.version ? `${p.name} – ${p.version}` : p.name;

export interface CatalogTileControlsProps {
  /** The card's full name, used in the control names ("Add one Judy Hopps – Helpful Officer"). */
  name: string;
  /** Copies of this card in the deck, counted by gameplay identity across printings. */
  quantity: number;
  /** The copy limit from the active format; Add is unavailable at it. */
  max: number;
  onAdd: () => void;
  onRemove: () => void;
}
/**
 * The deckbuilder's one action row under a catalog card (decision D28): Remove, the quantity in the deck and Add. It
 * carries no card information; pressing the card itself opens it for reading.
 */
export function CatalogTileControls({ name, quantity, max, onAdd, onRemove }: CatalogTileControlsProps) {
  const t = useMessages(), atMax = quantity >= max;
  return <div className={styles.controls}>
    <IconButton icon="minus" label={t('catalog.remove', { name })} onPress={onRemove} isDisabled={quantity === 0} variant="secondary" />
    <span className={styles.quantity} data-in-deck={quantity > 0 || undefined}>
      <span className={styles.count}>{new Intl.NumberFormat().format(quantity)}</span>
      {atMax && <span className={styles.limit}>{t('catalog.max')}</span>}
      <span className={styles.hidden}>{t('catalog.inDeck', { count: quantity })}{atMax ? `, ${t('catalog.atLimit', { max })}` : ''}</span>
    </span>
    <IconButton icon="plus" label={t('catalog.add', { name })} onPress={onAdd} isDisabled={atMax} variant="secondary" />
  </div>;
}

export interface CatalogEntry {
  readonly printing: Printing;
  readonly quantity: number;
  readonly max: number;
  /** Supporting facts for the list view, such as cost and type ("4 · Character"). */
  readonly summary: string;
}
export interface CatalogResultsProps {
  /** Names the results region, for example "Catalog results". */
  label: string;
  entries: readonly CatalogEntry[];
  view: 'grid' | 'list';
  /** Loading keeps the grid's known structure with placeholders and invents no figures (§21). */
  loading?: boolean;
  /** Shown when nothing matches: the cause and a way back, such as Reset filters. */
  emptyState: ReactNode;
  onAdd: (printing: Printing) => void;
  onRemove: (printing: Printing) => void;
  onInspect: (printing: Printing) => void;
}
/** Catalog results as a card grid (each card with its action row) or a dense list, with honest loading and empty states. */
export function CatalogResults({ label, entries, view, loading = false, emptyState, onAdd, onRemove, onInspect }: CatalogResultsProps) {
  const t = useMessages();
  if (loading) return <div className={styles.grid} role="status" aria-label={t('catalog.loading')} aria-busy="true">
    {Array.from({ length: 12 }, (_, i) => <div key={i} className={styles.skeleton} aria-hidden="true"><span className={styles.skeletonCard} /><span className={styles.skeletonRow} /></div>)}
  </div>;
  if (!entries.length) return <div className={styles.empty}>{emptyState}</div>;
  if (view === 'list') return <ul className={styles.list} aria-label={label}>
    {entries.map(entry => <li key={entry.printing.id} className={styles.row}>
      <div className={styles.rowMain}>
      <button type="button" className={styles.rowName} onClick={() => onInspect(entry.printing)} aria-label={t('action.inspect', { name: `${fullName(entry.printing)}, ${entry.printing.setName ?? entry.printing.setCode} ${entry.printing.collectorNumber}` })}>
        <span className={styles.name}>{entry.printing.name}</span>{entry.printing.version && <span className={styles.version}>{entry.printing.version}</span>}
      </button>
      <span className={styles.summary}><span>{entry.summary}</span><InkIdentity inks={entry.printing.inks} compact /></span>
      </div>
      <CatalogTileControls name={fullName(entry.printing)} quantity={entry.quantity} max={entry.max} onAdd={() => onAdd(entry.printing)} onRemove={() => onRemove(entry.printing)} />
    </li>)}
  </ul>;
  return <ul className={styles.grid} aria-label={label}>
    {entries.map(entry => <li key={entry.printing.id} className={styles.tile}>
      <CardTile printing={entry.printing} onInspect={onInspect} />
      <CatalogTileControls name={fullName(entry.printing)} quantity={entry.quantity} max={entry.max} onAdd={() => onAdd(entry.printing)} onRemove={() => onRemove(entry.printing)} />
    </li>)}
  </ul>;
}
