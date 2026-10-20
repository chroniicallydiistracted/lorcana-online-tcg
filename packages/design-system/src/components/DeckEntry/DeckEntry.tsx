import type { ReactNode } from 'react';
import { Button } from '../Button/Button.tsx';
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
/** A deck line with explicit quantity controls and separate legality, ownership and advisory messages. */
export function DeckEntry({ name, version, inks, cost, quantity, minQuantity, maxQuantity, onQuantityChange, legality, ownership, onInspect }: DeckEntryProps) {
  const t = useMessages(), full = name + (version ? ' – ' + version : '');
  return <div className={styles.entry}>
    <QuantityField label={t('deck.quantity', { name: full })} value={quantity} minValue={minQuantity} maxValue={maxQuantity} onChange={value => { if (Number.isInteger(value)) onQuantityChange(value); }} />
    <div className={styles.identity}>
      {cost !== undefined && <span className={styles.cost}>{cost}</span>}
      <div className={styles.names}><span className={styles.name}>{name}</span>{version && <span className={styles.version}>{version}</span>}</div>
      <InkIdentity inks={inks} compact />
    </div>
    <div className={styles.messages}>
      {legality && <StatusIndicator tone={legality.tone}>{legality.text}</StatusIndicator>}
      {ownership && <StatusIndicator tone={ownership.tone}>{ownership.text}</StatusIndicator>}
    </div>
    <Button variant="quiet" icon="inspect" onPress={onInspect} aria-label={t('action.inspect', { name: full })}>{t('inspector.printing')}</Button>
  </div>;
}
