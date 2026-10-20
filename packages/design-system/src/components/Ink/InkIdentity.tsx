import { useMessages } from '../../foundation/DesignSystemProvider.tsx';
import styles from './InkIdentity.module.css';

export const inkNames = ['amber', 'amethyst', 'emerald', 'ruby', 'sapphire', 'steel'] as const;
export type InkName = (typeof inkNames)[number];
/** Ink identity: swatch plus name, so colour is never the only cue (§9). Multicolour lists every ink. */
export function InkIdentity({ inks, compact = false }: { inks: readonly InkName[]; compact?: boolean }) {
  const t = useMessages();
  const names = inks.map(ink => t(`ink.${ink}`));
  return <span className={styles.group} aria-label={inks.length > 1 ? t('ink.multicolor', { list: new Intl.ListFormat(undefined, { type: 'conjunction' }).format(names) }) : undefined} role={inks.length > 1 ? 'group' : undefined}>
    {inks.map((ink, i) => <span key={ink} className={styles.ink} data-ink={ink}><span className={styles.swatch} aria-hidden="true" /><span className={compact ? styles.short : styles.name}>{compact ? names[i]!.slice(0, 2) : names[i]}</span>{compact && <span className={styles.hidden}>{names[i]}</span>}</span>)}
  </span>;
}
