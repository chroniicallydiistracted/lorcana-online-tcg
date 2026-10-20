import { Checkbox as AriaCheckbox } from 'react-aria-components';
import type { CheckboxProps as AriaCheckboxProps } from 'react-aria-components';
import type { ReactNode } from 'react';
import styles from './Checkbox.module.css';

export interface CheckboxProps extends Omit<AriaCheckboxProps, 'className' | 'style' | 'children'> { children: ReactNode }
/** The whole label is part of the hit area (§13). */
export function Checkbox({ children, ...props }: CheckboxProps) {
  return <AriaCheckbox {...props} className={styles.checkbox}>
    {({ isIndeterminate }) => <>
      <span className={styles.box} aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">{isIndeterminate ? <path d="M6 12h12" /> : <path d="m6 12.5 4 4 8-9" />}</svg>
      </span>
      <span className={styles.label}>{children}</span>
    </>}
  </AriaCheckbox>;
}
