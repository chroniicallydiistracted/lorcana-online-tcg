import { Input, Label, TextArea as AriaTextArea, TextField as AriaTextField } from 'react-aria-components';
import type { TextFieldProps as AriaTextFieldProps } from 'react-aria-components';
import type { ReactNode } from 'react';
import { FieldHelp, fieldStyles as styles } from '../Field/Field.tsx';
import { defined } from '../../foundation/props.ts';

export interface TextFieldProps extends Omit<AriaTextFieldProps, 'className' | 'style' | 'children'> {
  /** Persistent visible label; placeholders never replace it. */
  label: ReactNode;
  description?: ReactNode;
  errorMessage?: ReactNode;
  placeholder?: string;
}
export function TextField({ label, description, errorMessage, placeholder, ...props }: TextFieldProps) {
  return <AriaTextField {...props} className={styles.field}>
    <Label className={styles.label}>{label}</Label>
    <Input className={styles.control} {...defined({ placeholder })} />
    <FieldHelp description={description} errorMessage={errorMessage} />
  </AriaTextField>;
}
export function TextArea({ label, description, errorMessage, placeholder, ...props }: TextFieldProps) {
  return <AriaTextField {...props} className={styles.field}>
    <Label className={styles.label}>{label}</Label>
    <AriaTextArea className={styles.control} {...defined({ placeholder })} />
    <FieldHelp description={description} errorMessage={errorMessage} />
  </AriaTextField>;
}
