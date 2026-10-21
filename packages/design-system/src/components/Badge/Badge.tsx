import type { ReactNode } from 'react';
import { Icon } from '../Icon/Icon.tsx';
import type { IconName } from '../Icon/Icon.tsx';
import styles from './Badge.module.css';

export type StatusTone = 'neutral' | 'information' | 'success' | 'warning' | 'danger';
const toneIcon: Record<Exclude<StatusTone, 'neutral'>, IconName> = { information: 'info', success: 'success', warning: 'warning', danger: 'danger' };
/** Short readable label. Meaning is in the text; tone never relies on colour alone (§13). */
export function Badge({ children, tone = 'neutral' }: { children: ReactNode; tone?: StatusTone }) {
  return <span className={styles.badge} data-tone={tone}>{children}</span>;
}
/** Status with an icon and text, for example a legality or connection state. */
export function StatusIndicator({ children, tone }: { children: ReactNode; tone: Exclude<StatusTone, 'neutral'> }) {
  return <span className={styles.status} data-tone={tone}><Icon name={toneIcon[tone]} /><span>{children}</span></span>;
}
