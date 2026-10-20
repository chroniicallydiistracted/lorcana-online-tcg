import { Menu as AriaMenu, MenuItem as AriaMenuItem, MenuTrigger as AriaMenuTrigger, Popover, Text } from 'react-aria-components';
import type { MenuItemProps as AriaMenuItemProps, MenuProps as AriaMenuProps, MenuTriggerProps } from 'react-aria-components';
import type { ReactNode } from 'react';
import { Icon } from '../Icon/Icon.tsx';
import type { IconName } from '../Icon/Icon.tsx';
import styles from './Menu.module.css';
import { defined } from '../../foundation/props.ts';

export function MenuTrigger(props: MenuTriggerProps) { return <AriaMenuTrigger {...props} />; }
export function Menu<T extends object>(props: Omit<AriaMenuProps<T>, 'className' | 'style'>) {
  return <Popover className={styles.popover} offset={4}><AriaMenu {...props} className={styles.menu} /></Popover>;
}
export interface MenuItemProps extends Omit<AriaMenuItemProps, 'className' | 'style' | 'children'> {
  children: ReactNode;
  description?: ReactNode;
  icon?: IconName;
  /** Destructive actions use the danger tone and still lead to a Confirmation where costly. */
  tone?: 'default' | 'danger';
}
export function MenuItem({ children, description, icon, tone = 'default', textValue, ...props }: MenuItemProps) {
  return <AriaMenuItem {...props} {...defined({ textValue: textValue ?? (typeof children === 'string' ? children : undefined) })} className={styles.item} data-tone={tone}>
    {icon && <Icon name={icon} />}
    <span className={styles.text}><Text slot="label" className={styles.label}>{children}</Text>{description && <Text slot="description" className={styles.description}>{description}</Text>}</span>
  </AriaMenuItem>;
}
