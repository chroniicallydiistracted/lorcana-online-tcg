import type { ReactNode } from 'react';
import { Icon } from '../Icon/Icon.tsx';
import type { IconName } from '../Icon/Icon.tsx';
import { useMessages } from '../../foundation/DesignSystemProvider.tsx';
import type { MessageKey } from '../../foundation/messages.ts';
import styles from './ConnectionStatus.module.css';

export type ConnectionState = 'connected' | 'reconnecting' | 'resyncing' | 'offline' | 'version-mismatch';
const meta: Record<ConnectionState, { icon: IconName; label: MessageKey; actions: MessageKey }> = {
  connected: { icon: 'connection', label: 'connection.connected', actions: 'connection.actionsAvailable' },
  reconnecting: { icon: 'refresh', label: 'connection.reconnecting', actions: 'connection.actionsPaused' },
  resyncing: { icon: 'refresh', label: 'connection.resyncing', actions: 'connection.actionsResync' },
  offline: { icon: 'offline', label: 'connection.offline', actions: 'connection.actionsPaused' },
  'version-mismatch': { icon: 'warning', label: 'connection.versionMismatch', actions: 'connection.actionsUpdate' },
};
export interface ConnectionStatusProps {
  state: ConnectionState;
  /** Recovery control, such as "Retry connection", when the player can act. */
  action?: ReactNode;
  /** Compact form shows the label only; the action availability is still available to assistive technology. */
  compact?: boolean;
}
/** Current connection, reconnect, resync and action availability (§13, §21). */
export function ConnectionStatus({ state, action, compact = false }: ConnectionStatusProps) {
  const t = useMessages(), m = meta[state];
  return <div className={styles.status} data-state={state} data-compact={compact || undefined} role="status">
    <Icon name={m.icon} />
    <span className={styles.label}>{t(m.label)}</span>
    <span className={compact ? styles.hidden : styles.detail}>{t(m.actions)}</span>
    {action}
  </div>;
}
