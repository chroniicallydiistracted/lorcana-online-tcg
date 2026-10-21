import { Checkbox as AriaCheckbox } from 'react-aria-components';
import type { CheckboxProps as AriaCheckboxProps } from 'react-aria-components';
import type { ReactNode } from 'react';
import { Icon } from '../Icon/Icon.tsx';
import styles from './Checkbox.module.css';

export interface CheckboxProps extends Omit<AriaCheckboxProps, 'className' | 'style' | 'children'> { children: ReactNode }
/** The whole label is part of the hit area (§13). */
export function Checkbox({ children, ...props }: CheckboxProps) {
  return <AriaCheckbox {...props} className={styles.checkbox}>
    {({ isIndeterminate }) => <>
      <span className={styles.box} aria-hidden="true">
        <Icon name={isIndeterminate ? 'minus' : 'check'} />
      </span>
      <span className={styles.label}>{children}</span>
    </>}
  </AriaCheckbox>;
}
