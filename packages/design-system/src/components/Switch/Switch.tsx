import { Switch as AriaSwitch } from 'react-aria-components';
import type { SwitchProps as AriaSwitchProps } from 'react-aria-components';
import type { ReactNode } from 'react';
import styles from './Switch.module.css';

export interface SwitchProps extends Omit<AriaSwitchProps, 'className' | 'style' | 'children'> { children: ReactNode }
/** A setting that applies immediately, such as "Confirm before ending turn". */
export function Switch({ children, ...props }: SwitchProps) {
  return <AriaSwitch {...props} className={styles.switch}>
    <span className={styles.track} aria-hidden="true"><span className={styles.thumb} /></span>
    <span className={styles.label}>{children}</span>
  </AriaSwitch>;
}
