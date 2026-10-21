import { Link as AriaLink } from 'react-aria-components';
import type { LinkProps as AriaLinkProps } from 'react-aria-components';
import type { ReactNode } from 'react';
import { Icon } from '../Icon/Icon.tsx';
import styles from './Link.module.css';
import { defined } from '../../foundation/props.ts';

export interface LinkProps extends Omit<AriaLinkProps, 'className' | 'style' | 'children'> {
  children: ReactNode;
  /** Marks a link that leaves the application; it opens normally and shows an external marker. */
  external?: boolean;
}
/** Navigation with an identifiable destination. Underlined so it never relies on colour alone. */
export function Link({ children, external = false, ...props }: LinkProps) {
  return <AriaLink {...props} className={styles.link} {...defined({ rel: external ? 'noreferrer' : props.rel })}>
    {children}{external && <Icon name="external" />}
  </AriaLink>;
}
