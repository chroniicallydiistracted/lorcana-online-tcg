import type { ReactNode } from 'react';
import { QuantityField } from '../QuantityField/QuantityField.tsx';
import { InkIdentity } from '../Ink/InkIdentity.tsx';
import type { InkName } from '../Ink/InkIdentity.tsx';
import { StatusIndicator } from '../Badge/Badge.tsx';
import { useMessages } from '../../foundation/DesignSystemProvider.tsx';
import styles from './DeckEntry.module.css';

export interface DeckEntryMessage { tone: 'information' | 'warning' | 'danger'; text: ReactNode }
export interface DeckEntryProps {
  name: string;
  version?: string | undefined;
  inks: readonly InkName[];
  cost?: number;
  quantity: number;
  /** Bounds from the active format and ownership contracts. */
  minQuantity: number;
  maxQuantity: number;
  onQuantityChange: (quantity: number) => void;
  /** Format legality (rules restriction), with card, quantity, reason and policy version. */
  legality?: DeckEntryMessage;
  /** Ownership limit: advisory, never presented as an official rules restriction (§18). */
  ownership?: DeckEntryMessage;
  onInspect: () => void;
}
/**
 * A deck line: cost, the card's name (which opens it for inspection), inks and an exact quantity, with separate legality
 * and ownership messages. The layout fits a narrow deck region; the quantity's label stays for assistive technology.
 */
export function DeckEntry({ name, version, inks, cost, quantity, minQuantity, maxQuantity, onQuantityChange, legality, ownership, onInspect }: DeckEntryProps) {
  const t = useMessages(), full = name + (version ? ' – ' + version : '');
  return <div className={styles.entry}>
    {cost !== undefined && <span className={styles.cost}><span className={styles.hidden}>{t('deck.costLabel')} </span>{cost}</span>}
    <div className={styles.identity}>
      <button type="button" className={styles.names} onClick={onInspect} aria-label={t('action.inspect', { name: full })}>
        <span className={styles.name}>{name}</span>{version && <span className={styles.version}>{version}</span>}
      </button>
      <InkIdentity inks={inks} compact />
    </div>
    <div className={styles.quantity}>
      <QuantityField label={t('deck.quantity', { name: full })} labelVisibility="hidden" size="compact" value={quantity} minValue={minQuantity} maxValue={maxQuantity} onChange={value => { if (Number.isInteger(value)) onQuantityChange(value); }} />
    </div>
    {(legality || ownership) && <div className={styles.messages}>
      {legality && <StatusIndicator tone={legality.tone}>{legality.text}</StatusIndicator>}
      {ownership && <StatusIndicator tone={ownership.tone}>{ownership.text}</StatusIndicator>}
    </div>}
  </div>;
}
