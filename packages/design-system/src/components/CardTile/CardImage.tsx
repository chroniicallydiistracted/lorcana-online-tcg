import { useState } from 'react';
import { useMessages, useOfficialAssets } from '../../foundation/DesignSystemProvider.tsx';
import type { Printing } from './types.ts';
import styles from './CardImage.module.css';

/**
 * Card rendition with lazy loading, reserved intrinsic size and a stable placeholder that keeps the printing's text
 * (§29). With `officialAssets={false}` on the provider every card shows the placeholder (fan-content rule 4).
 * `decorative` leaves naming to an enclosing control, such as the card tile's button.
 */
export function CardImage({ printing, eager = false, decorative = false }: { printing: Printing; eager?: boolean; decorative?: boolean }) {
  const t = useMessages(), official = useOfficialAssets(), [failed, setFailed] = useState(false), image = official ? printing.image : undefined;
  if (!image || failed) return <div className={styles.placeholder} role={decorative ? undefined : 'img'} aria-hidden={decorative || undefined} aria-label={decorative ? undefined : `${printing.name}${printing.version ? ' – ' + printing.version : ''}. ${t('image.unavailable')}`}>
    <span className={styles.placeholderName}>{printing.name}</span>
    {printing.version && <span className={styles.placeholderVersion}>{printing.version}</span>}
    <span className={styles.placeholderNote}>{t('image.unavailable')}</span>
  </div>;
  return <img className={styles.image} src={image.src} width={image.width} height={image.height} alt={decorative ? '' : image.alt} loading={eager ? 'eager' : 'lazy'} decoding="async" onError={() => setFailed(true)} />;
}
