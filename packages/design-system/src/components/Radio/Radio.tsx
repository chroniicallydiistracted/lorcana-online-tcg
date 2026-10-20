import { Label, Radio as AriaRadio, RadioGroup as AriaRadioGroup } from 'react-aria-components';
import type { RadioGroupProps as AriaRadioGroupProps, RadioProps as AriaRadioProps } from 'react-aria-components';
import type { ReactNode } from 'react';
import { FieldHelp, fieldStyles } from '../Field/Field.tsx';
import styles from './Radio.module.css';

export interface RadioGroupProps extends Omit<AriaRadioGroupProps, 'className' | 'style' | 'children'> {
  label: ReactNode;
  description?: ReactNode;
  errorMessage?: ReactNode;
  children: ReactNode;
}
export function RadioGroup({ label, description, errorMessage, children, ...props }: RadioGroupProps) {
  return <AriaRadioGroup {...props} className={fieldStyles.field}>
    <Label className={fieldStyles.label}>{label}</Label>
    <div className={styles.options}>{children}</div>
    <FieldHelp description={description} errorMessage={errorMessage} />
  </AriaRadioGroup>;
}
export function Radio({ children, ...props }: Omit<AriaRadioProps, 'className' | 'style' | 'children'> & { children: ReactNode }) {
  return <AriaRadio {...props} className={styles.radio}><span className={styles.dot} aria-hidden="true" /><span className={styles.label}>{children}</span></AriaRadio>;
}
