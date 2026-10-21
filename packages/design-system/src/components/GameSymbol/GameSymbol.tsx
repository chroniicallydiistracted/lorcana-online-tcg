import { gameplaySymbols } from '../../generated/symbols.ts';
import { useMessages, useOfficialAssets } from '../../foundation/DesignSystemProvider.tsx';
import { SymbolSvg } from './SymbolSvg.tsx';
import styles from './GameSymbol.module.css';

export type GameSymbolName = keyof typeof gameplaySymbols;
export const gameSymbolNames = Object.keys(gameplaySymbols) as GameSymbolName[];

export interface GameSymbolProps {
  name: GameSymbolName;
  /** Accessible name. Omit when visible text beside the symbol already says what it means. */
  label?: string;
  /** standard: 20 px; prominent: 24 px, matching the interface icon sizes. */
  size?: 'standard' | 'prominent';
}
/**
 * A printed gameplay symbol from the verified Lorcana assets (decision D21), in the current text colour.
 * With official assets switched off it shows a neutral text placeholder instead (takedown readiness).
 */
export function GameSymbol({ name, label, size = 'standard' }: GameSymbolProps) {
  const t = useMessages();
  if (!useOfficialAssets()) return <span className={styles.neutral} data-size={size} role={label ? 'img' : undefined} aria-label={label} aria-hidden={label ? undefined : true}>{t(`symbol.short.${name}`)}</span>;
  return <SymbolSvg data={gameplaySymbols[name]} className={styles.symbol} size={size} label={label} />;
}
