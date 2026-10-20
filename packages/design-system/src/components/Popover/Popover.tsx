import { Dialog, DialogTrigger, Heading, Popover as AriaPopover } from 'react-aria-components';
import type { DialogTriggerProps } from 'react-aria-components';
import type { ReactNode } from 'react';
import styles from './Popover.module.css';
import { defined } from '../../foundation/props.ts';

export function PopoverTrigger(props: DialogTriggerProps) { return <DialogTrigger {...props} />; }
export interface PopoverProps { title?: ReactNode; children: ReactNode; placement?: 'top' | 'bottom' | 'start' | 'end'; 'aria-label'?: string }
/** Non-modal contextual content with focus management, dismissal and safe placement (§13). */
export function Popover({ title, children, placement = 'bottom', ...rest }: PopoverProps) {
  return <AriaPopover className={styles.popover} placement={placement} offset={8}>
    <Dialog className={styles.dialog} {...defined({ 'aria-label': rest['aria-label'] })}>
      {title && <Heading slot="title" className={styles.title}>{title}</Heading>}
      {children}
    </Dialog>
  </AriaPopover>;
}
