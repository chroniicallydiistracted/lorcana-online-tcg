import { Tooltip as AriaTooltip, TooltipTrigger as AriaTooltipTrigger } from 'react-aria-components';
import type { ReactNode } from 'react';
import type { TooltipTriggerComponentProps } from 'react-aria-components';
import styles from './Tooltip.module.css';

/** Supplementary explanation on hover and focus (§13, §25). Essential instructions never live only in a tooltip. */
export function TooltipTrigger(props: TooltipTriggerComponentProps) {
  return <AriaTooltipTrigger delay={600} closeDelay={300} {...props} />;
}
export interface TooltipProps { children: ReactNode; placement?: 'top' | 'bottom' | 'start' | 'end' }
export function Tooltip({ children, placement = 'top' }: TooltipProps) {
  return <AriaTooltip className={styles.tooltip} placement={placement} offset={8}>{children}</AriaTooltip>;
}
