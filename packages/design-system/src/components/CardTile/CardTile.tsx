import type { ReactNode } from 'react';
import { Button } from '../Button/Button.tsx';
import { Badge } from '../Badge/Badge.tsx';
import { InkIdentity } from '../Ink/InkIdentity.tsx';
import { useMessages } from '../../foundation/DesignSystemProvider.tsx';
import { CardImage } from './CardImage.tsx';
import type { Ownership, Printing } from './types.ts';
import styles from './CardTile.module.css';

export interface CardTileProps {
  printing: Printing;
  ownership: Ownership;
  /** Opens the Card Inspector; focus returns here when it closes. */
  onInspect: (printing: Printing) => void;
  /** Further contextual actions, such as "Add to deck". */
  actions?: ReactNode;
}
export function OwnershipSummary({ ownership }: { ownership: Ownership }) {
  const t = useMessages(), n = new Intl.NumberFormat();
  if (ownership.state !== 'owned') return <span className={styles.ownership} data-state={ownership.state}>{t(`ownership.${ownership.state}`)}</span>;
  return <span className={styles.ownership} data-state="owned">
    <span>{t('ownership.owned')}</span>
    <span className={styles.counts}>{t('quantity.normal')} {n.format(ownership.normal)} · {t('quantity.foil')} {n.format(ownership.foil)} · {t('quantity.total')} {n.format(ownership.normal + ownership.foil)}</span>
  </span>;
}
/** A printing with identity, finish, ownership, inspection and actions (§13, §17). No continuous GPU loop per tile (§16). */
export function CardTile({ printing, ownership, onInspect, actions }: CardTileProps) {
  const t = useMessages();
  return <article className={styles.tile} aria-labelledby={`card-${printing.id}`}>
    <CardImage printing={printing} />
    <div className={styles.details}>
      <h3 id={`card-${printing.id}`} className={styles.name}>{printing.name}{printing.version && <span className={styles.version}>{printing.version}</span>}</h3>
      <p className={styles.meta}>{printing.setName ?? printing.setCode} · {printing.collectorNumber} · {printing.rarity}</p>
      <div className={styles.row}><InkIdentity inks={printing.inks} compact />{printing.finish === 'foil' && <Badge>{t('finish.foil')}</Badge>}</div>
      <OwnershipSummary ownership={ownership} />
    </div>
    <div className={styles.actions}>
      <Button variant="quiet" icon="inspect" onPress={() => onInspect(printing)} aria-label={t('action.inspect', { name: printing.name + (printing.version ? ' – ' + printing.version : '') })}>{t('inspector.printing')}</Button>
      {actions}
    </div>
  </article>;
}
