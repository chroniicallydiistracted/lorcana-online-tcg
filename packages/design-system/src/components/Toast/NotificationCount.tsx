import { Button } from 'react-aria-components';
import type { PressEvent } from 'react-aria-components';
import { Icon } from '../Icon/Icon.tsx';
import { useMessages } from '../../foundation/DesignSystemProvider.tsx';
import styles from './NotificationCount.module.css';

export interface NotificationCountProps {
  /** Deferred notifications waiting since play started. */
  count: number;
  /** Opens the notification list only when the player chooses to. */
  onPress: (event: PressEvent) => void;
}
/**
 * The quiet count for deferred notifications during play (§22): no repeated animation, no sound,
 * no focus change and no live announcement per increment. Its name states the count when focused.
 */
export function NotificationCount({ count, onPress }: NotificationCountProps) {
  const t = useMessages();
  return <Button className={styles.count} onPress={onPress} aria-label={`${t('notifications.label')}: ${t('notifications.count', { count })}`}>
    <Icon name="bell" />
    {count > 0 && <span className={styles.number} aria-hidden="true">{new Intl.NumberFormat().format(count)}</span>}
  </Button>;
}
