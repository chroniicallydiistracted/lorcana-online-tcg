import { useId } from 'react';
import type { ReactNode } from 'react';
import { useMessages } from '../../foundation/DesignSystemProvider.tsx';
import styles from './MatchLayout.module.css';

export interface MatchChromeProps {
  /** The opponent's PlayerSummary. */
  opponent: ReactNode;
  /** Connection status and the quiet notification count. */
  status: ReactNode;
  /** The match menu: settings, rules, legal information and concede. */
  menu: ReactNode;
  /** The demonstration notice for reference screens. */
  notice?: ReactNode;
}
/** The match's top strip, replacing the navigation bar: the opponent's public identity, status and the match menu. */
export function MatchChrome({ opponent, status, menu, notice }: MatchChromeProps) {
  return <header className={styles.chrome}>
    <div className={styles.opponent}>{opponent}</div>
    {notice && <div className={styles.notice}>{notice}</div>}
    <div className={styles.status}>{status}{menu}</div>
  </header>;
}

export interface MatchLayoutProps {
  chrome: ReactNode;
  /** The battlefield: the Flat-tier board, or the scene with its semantic overlay. */
  battlefield: ReactNode;
  /** Turn context, the decision panel and the log and inspector tabs. */
  side: ReactNode;
  /** The player's summary, hand and primary actions. */
  bottom: ReactNode;
}
/**
 * The match composition (§19): chrome on top, the battlefield in the centre, the decision column on the inline end and
 * the player's strip at the bottom. Below 64 rem the regions stack and the battlefield keeps its two-dimensional
 * arrangement while the panels reflow. The match uses the whole viewport, without perimeter gutters.
 */
export function MatchLayout({ chrome, battlefield, side, bottom }: MatchLayoutProps) {
  const t = useMessages(), id = useId();
  return <div className={styles.layout}>
    <a className={styles.skip} href={`#${id}`}>{t('match.skip')}</a>
    {chrome}
    <main className={styles.main}>
      <section className={styles.battlefield} aria-label={t('match.battlefield')}>{battlefield}</section>
      <aside id={id} tabIndex={-1} className={styles.side} aria-label={t('match.decisionColumn')}>{side}</aside>
      <section className={styles.bottom} aria-label={t('match.yourArea')}>{bottom}</section>
    </main>
  </div>;
}
