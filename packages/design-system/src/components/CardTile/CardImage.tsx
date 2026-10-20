import { useState } from 'react';
import { useMessages } from '../../foundation/DesignSystemProvider.tsx';
import type { Printing } from './types.ts';
import styles from './CardImage.module.css';

/** Card rendition with lazy loading, reserved intrinsic size and a stable placeholder that keeps the printing's text (§29). */
export function CardImage({ printing, eager = false }: { printing: Printing; eager?: boolean }) {
  const t = useMessages(), [failed, setFailed] = useState(false), image = printing.image;
  if (!image || failed) return <div className={styles.placeholder} role="img" aria-label={`${printing.name}${printing.version ? ' – ' + printing.version : ''}. ${t('image.unavailable')}`}>
    <span className={styles.placeholderName}>{printing.name}</span>
    {printing.version && <span className={styles.placeholderVersion}>{printing.version}</span>}
    <span className={styles.placeholderNote}>{t('image.unavailable')}</span>
  </div>;
  return <img className={styles.image} src={image.src} width={image.width} height={image.height} alt={image.alt} loading={eager ? 'eager' : 'lazy'} decoding="async" onError={() => setFailed(true)} />;
}
