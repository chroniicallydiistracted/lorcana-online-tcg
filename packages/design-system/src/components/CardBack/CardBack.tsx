import { useState } from 'react';
import { useOfficialAssets } from '../../foundation/DesignSystemProvider.tsx';
import styles from './CardBack.module.css';

/** The official card back's URL (decision D28), for presentation code that textures face-down cards, such as the table scene. */
export const cardBackImageUrl: string = new URL('../../assets/card-back/lorcana_card_back.jpg', import.meta.url).href;

export interface CardBackProps {
  /** Accessible name when nothing around the card names it, for example "Face-down card". Omit when the context already counts the cards. */
  label?: string;
}
/**
 * A face-down card: the official back (D28, provenance in src/assets/card-back/manifest.json) at the card silhouette. With
 * `officialAssets={false}` on the provider, or if the image fails, a neutral back drawn from the tokens takes its place (§29).
 */
export function CardBack({ label }: CardBackProps) {
  const official = useOfficialAssets(), [failed, setFailed] = useState(false);
  if (!official || failed) return <div className={styles.neutral} role={label ? 'img' : undefined} aria-label={label} aria-hidden={label ? undefined : true}><span className={styles.rule} /></div>;
  return <img className={styles.image} src={cardBackImageUrl} width={1468} height={2048} alt={label ?? ''} decoding="async" onError={() => setFailed(true)} />;
}
