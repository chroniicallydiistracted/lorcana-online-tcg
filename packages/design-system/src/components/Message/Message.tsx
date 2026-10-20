import type { ReactNode } from 'react';
import { Icon } from '../Icon/Icon.tsx';
import type { IconName } from '../Icon/Icon.tsx';
import { useMessages } from '../../foundation/DesignSystemProvider.tsx';
import styles from './Message.module.css';

export type MessageTone = 'information' | 'success' | 'warning' | 'danger';
const toneIcon: Record<MessageTone, IconName> = { information: 'info', success: 'success', warning: 'warning', danger: 'danger' };
export interface MessageProps {
  tone: MessageTone;
  /** What happened. */
  title: ReactNode;
  /** What it affects and what the player can do (§28). */
  children?: ReactNode;
  /** Relevant recovery actions. */
  actions?: ReactNode;
}
/** Inline message within a region. */
export function InlineMessage({ tone, title, children, actions }: MessageProps) {
  const t = useMessages();
  return <div className={styles.message} data-tone={tone} role={tone === 'danger' || tone === 'warning' ? 'alert' : 'status'}>
    <Icon name={toneIcon[tone]} label={t(`feedback.${tone}`)} />
    <div className={styles.body}><p className={styles.title}>{title}</p>{children && <div className={styles.text}>{children}</div>}{actions && <div className={styles.actions}>{actions}</div>}</div>
  </div>;
}
/** Page- or room-level banner with the same anatomy, spanning the content width. */
export function Banner(props: MessageProps) {
  return <div className={styles.banner}><InlineMessage {...props} /></div>;
}
