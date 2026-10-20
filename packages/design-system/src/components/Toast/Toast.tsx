import { UNSTABLE_Toast as AriaToast, UNSTABLE_ToastContent as AriaToastContent, UNSTABLE_ToastQueue as AriaToastQueue, UNSTABLE_ToastRegion as AriaToastRegion, Button, Text } from 'react-aria-components';
import { Icon } from '../Icon/Icon.tsx';
import type { MessageTone } from '../Message/Message.tsx';
import { useMessages } from '../../foundation/DesignSystemProvider.tsx';
import styles from './Toast.module.css';

export interface ToastContent { title: string; description?: string; tone: MessageTone }
/**
 * Toasts wrap React Aria's toast APIs, which are still UNSTABLE_ in react-aria-components 1.21.1.
 * They are isolated here so a later API change touches one file.
 */
export const toastQueue = new AriaToastQueue<ToastContent>({ maxVisibleToasts: 3 });
const icon = { information: 'info', success: 'success', warning: 'warning', danger: 'danger' } as const;
/** Mount once at the application root. Nonessential toasts are dismissible; success only follows a confirmed result. */
export function ToastRegion({ queue = toastQueue }: { queue?: AriaToastQueue<ToastContent> }) {
  const t = useMessages();
  return <AriaToastRegion queue={queue} className={styles.region}>
    {({ toast }) => <AriaToast toast={toast} className={styles.toast} data-tone={toast.content.tone}>
      <Icon name={icon[toast.content.tone]} label={t(`feedback.${toast.content.tone}`)} />
      <AriaToastContent className={styles.content}>
        <Text slot="title" className={styles.title}>{toast.content.title}</Text>
        {toast.content.description && <Text slot="description" className={styles.description}>{toast.content.description}</Text>}
      </AriaToastContent>
      <Button slot="close" className={styles.close} aria-label={t('action.dismiss')}><Icon name="close" /></Button>
    </AriaToast>}
  </AriaToastRegion>;
}
