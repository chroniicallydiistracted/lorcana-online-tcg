import type { ReactNode } from 'react';
import { Button } from '../Button/Button.tsx';
import { Dialog } from '../Dialog/Dialog.tsx';
import styles from './Confirmation.module.css';

export interface ConfirmationProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  /** Names the concrete action, for example "End your turn?". */
  title: ReactNode;
  /** What will happen, in plain words. */
  consequence: ReactNode;
  /** Optional public context, such as remaining opportunities or the characters that will quest. */
  context?: ReactNode;
  /** Concrete action label, for example "End turn". */
  confirmLabel: string;
  /** Concrete cancel label, for example "Keep playing". */
  cancelLabel: string;
  onConfirm: () => void;
  tone?: 'default' | 'danger';
}
/**
 * Proportionate review before a costly, ambiguous, destructive or bulk action (§20).
 * It reviews local intent only; the caller submits, shows pending and resolves the server receipt.
 */
export function Confirmation({ isOpen, onOpenChange, title, consequence, context, confirmLabel, cancelLabel, onConfirm, tone = 'default' }: ConfirmationProps) {
  return <Dialog role="alertdialog" title={title} isOpen={isOpen} onOpenChange={onOpenChange} showClose={false}
    actions={<>
      <Button onPress={() => onOpenChange(false)}>{cancelLabel}</Button>
      <Button variant={tone === 'danger' ? 'danger' : 'primary'} onPress={() => { onConfirm(); onOpenChange(false); }}>{confirmLabel}</Button>
    </>}>
    <div className={styles.content}>
      <p className={styles.consequence}>{consequence}</p>
      {context && <div className={styles.context}>{context}</div>}
    </div>
  </Dialog>;
}
