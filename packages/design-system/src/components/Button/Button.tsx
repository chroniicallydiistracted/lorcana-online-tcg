import { Button as AriaButton } from 'react-aria-components';
import type { ButtonProps as AriaButtonProps } from 'react-aria-components';
import type { ReactNode } from 'react';
import { Icon } from '../Icon/Icon.tsx';
import type { IconName } from '../Icon/Icon.tsx';
import { Tooltip, TooltipTrigger } from '../Tooltip/Tooltip.tsx';
import { useMessages } from '../../foundation/DesignSystemProvider.tsx';
import styles from './Button.module.css';
import { defined } from '../../foundation/props.ts';

export type ButtonVariant = 'primary' | 'secondary' | 'quiet' | 'danger';
export interface ButtonProps extends Omit<AriaButtonProps, 'className' | 'style' | 'children'> {
  variant?: ButtonVariant;
  /** Icon shown before the label. */
  icon?: IconName;
  children: ReactNode;
}
/**
 * A clear action. Name the action ("End turn", "Add to deck"), never a generic "Confirm".
 * isPending keeps the label, prevents duplicate presses and announces the pending state.
 */
export function Button({ variant = 'secondary', icon, children, isPending, ...props }: ButtonProps) {
  const t = useMessages();
  return <AriaButton {...props} {...defined({ isPending })} className={styles.button} data-variant={variant}>
    {isPending ? <Icon name="pending" /> : icon ? <Icon name={icon} /> : null}
    <span className={styles.label}>{children}</span>
    {isPending && <span className={styles.hidden}>{t('state.pending')}</span>}
  </AriaButton>;
}

export interface IconButtonProps extends Omit<AriaButtonProps, 'className' | 'style' | 'children' | 'aria-label'> {
  icon: IconName;
  /** Accessible name, also shown as a tooltip on hover and focus unless tooltip is false. */
  label: string;
  variant?: Exclude<ButtonVariant, 'primary'>;
  tooltip?: boolean;
}
/** Icon-only action with a 44 x 44 px hit area and an accessible name (§12, §13). */
export function IconButton({ icon, label, variant = 'quiet', tooltip = true, isPending, ...props }: IconButtonProps) {
  const button = <AriaButton {...props} {...defined({ isPending })} aria-label={label} className={styles.button} data-variant={variant} data-icon-only>
    <Icon name={isPending ? 'pending' : icon} />
  </AriaButton>;
  return tooltip ? <TooltipTrigger>{button}<Tooltip>{label}</Tooltip></TooltipTrigger> : button;
}
