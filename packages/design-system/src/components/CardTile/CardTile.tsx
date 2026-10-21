import { Button } from 'react-aria-components';
import { useMessages } from '../../foundation/DesignSystemProvider.tsx';
import { CardImage } from './CardImage.tsx';
import type { Ownership, Printing } from './types.ts';
import styles from './CardTile.module.css';

export interface CardTileProps {
  printing: Printing;
  /** Opens the Card Inspector; focus returns here when it closes. */
  onInspect: (printing: Printing) => void;
}
export function OwnershipSummary({ ownership }: { ownership: Ownership }) {
  const t = useMessages(), n = new Intl.NumberFormat();
  if (ownership.state !== 'owned') return <span className={styles.ownership} data-state={ownership.state}>{t(`ownership.${ownership.state}`)}</span>;
  return <span className={styles.ownership} data-state="owned">
    <span>{t('ownership.owned')}</span>
    <span className={styles.counts}>{t('quantity.normal')} {n.format(ownership.normal)} · {t('quantity.foil')} {n.format(ownership.foil)} · {t('quantity.total')} {n.format(ownership.normal + ownership.foil)}</span>
  </span>;
}
/**
 * A printing shown as the card itself (decision D26): every detail lives in the Card Inspector it opens (§15). A foil
 * printing keeps a static finish mark, since thumbnails get no continuous finish effect (§16).
 */
export function CardTile({ printing, onInspect }: CardTileProps) {
  const t = useMessages(), foil = printing.finish === 'foil';
  // The set and number tell reprints apart; the name comes first, as printed on the card (WCAG 2.5.3).
  const name = `${printing.name}${printing.version ? ` – ${printing.version}` : ''}, ${printing.setName ?? printing.setCode} ${printing.collectorNumber}${foil ? `, ${t('finish.foil')}` : ''}`;
  return <Button className={styles.tile} onPress={() => onInspect(printing)} aria-label={t('action.inspect', { name })}>
    <CardImage printing={printing} decorative />
    {foil && <span className={styles.finish} aria-hidden>{t('finish.foilMark')}</span>}
  </Button>;
}
