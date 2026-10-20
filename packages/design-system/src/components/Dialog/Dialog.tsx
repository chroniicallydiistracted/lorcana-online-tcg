import { Dialog as AriaDialog, DialogTrigger as AriaDialogTrigger, Heading, Modal, ModalOverlay } from 'react-aria-components';
import type { DialogTriggerProps } from 'react-aria-components';
import type { ReactNode } from 'react';
import { IconButton } from '../Button/Button.tsx';
import { useMessages } from '../../foundation/DesignSystemProvider.tsx';
import styles from './Dialog.module.css';

export function DialogTrigger(props: DialogTriggerProps) { return <AriaDialogTrigger {...props} />; }
export interface DialogProps {
  /** Named purpose; becomes the dialog's accessible name. */
  title: ReactNode;
  children: ReactNode;
  /** Footer actions, primary last. */
  actions?: ReactNode;
  /** Outside press and Escape dismiss when true. Reviews of submitted work are never dismissable by accident. */
  isDismissable?: boolean;
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  role?: 'dialog' | 'alertdialog';
  /** 'sheet' docks to the inline end on wide layouts and the bottom on compact layouts. */
  presentation?: 'dialog' | 'sheet';
  showClose?: boolean;
}
/** Modal dialog or sheet: focus containment, inert background and focus restoration (§13, §14). */
export function Dialog({ title, children, actions, isDismissable = true, isOpen, onOpenChange, role = 'dialog', presentation = 'dialog', showClose = true }: DialogProps) {
  const t = useMessages();
  return <ModalOverlay className={styles.overlay} isDismissable={isDismissable} isKeyboardDismissDisabled={!isDismissable} {...(isOpen === undefined ? {} : { isOpen })} {...(onOpenChange ? { onOpenChange } : {})}>
    <Modal className={styles.modal} data-presentation={presentation}>
      <AriaDialog className={styles.dialog} role={role}>
        {({ close }) => <>
          <div className={styles.header}>
            <Heading slot="title" className={styles.title}>{title}</Heading>
            {showClose && isDismissable && <IconButton icon="close" label={t('action.close')} onPress={close} tooltip={false} />}
          </div>
          <div className={styles.body}>{children}</div>
          {actions && <div className={styles.actions}>{actions}</div>}
        </>}
      </AriaDialog>
    </Modal>
  </ModalOverlay>;
}
