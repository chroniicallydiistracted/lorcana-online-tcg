import { useMessages, useOfficialAssets } from '../../foundation/DesignSystemProvider.tsx';
import { inkSymbols } from '../../generated/symbols.ts';
import { SymbolSvg } from '../GameSymbol/SymbolSvg.tsx';
import styles from './InkIdentity.module.css';

export const inkNames = ['amber', 'amethyst', 'emerald', 'ruby', 'sapphire', 'steel'] as const;
export type InkName = (typeof inkNames)[number];
/**
 * Ink identity: the Lorcana ink symbol plus its name, so colour is never the only cue (§9, decision D21).
 * Multicolour lists every ink. With Lorcana assets switched off, a neutral swatch replaces the symbol. The plain
 * appearance drops the chip boundary for use inside a control that already has one, such as a filter toggle.
 */
export function InkIdentity({ inks, compact = false, appearance = 'chip' }: { inks: readonly InkName[]; compact?: boolean; appearance?: 'chip' | 'plain' }) {
  const t = useMessages(), official = useOfficialAssets();
  const names = inks.map(ink => t(`ink.${ink}`));
  return <span className={styles.group} data-appearance={appearance} aria-label={inks.length > 1 ? t('ink.multicolor', { list: new Intl.ListFormat(undefined, { type: 'conjunction' }).format(names) }) : undefined} role={inks.length > 1 ? 'group' : undefined}>
    {inks.map((ink, i) => <span key={ink} className={styles.ink} data-ink={ink}>{official ? <SymbolSvg data={inkSymbols[ink]} className={styles.symbol} /> : <span className={styles.swatch} aria-hidden="true" />}<span className={compact ? styles.short : styles.name}>{compact ? names[i]!.slice(0, 2) : names[i]}</span>{compact && <span className={styles.hidden}>{names[i]}</span>}</span>)}
  </span>;
}
