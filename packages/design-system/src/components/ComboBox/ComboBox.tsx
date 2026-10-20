import { Button, ComboBox as AriaComboBox, Input, Label, ListBox, Popover } from 'react-aria-components';
import type { ComboBoxProps as AriaComboBoxProps } from 'react-aria-components';
import type { ReactNode } from 'react';
import { Icon } from '../Icon/Icon.tsx';
import { FieldHelp, fieldStyles } from '../Field/Field.tsx';
import { listStyles } from '../Select/Select.tsx';
import styles from './ComboBox.module.css';
import { defined } from '../../foundation/props.ts';

export interface ComboBoxProps<T extends object> extends Omit<AriaComboBoxProps<T>, 'className' | 'style' | 'children'> {
  label: ReactNode;
  description?: ReactNode;
  errorMessage?: ReactNode;
  children: ReactNode | ((item: T) => ReactNode);
  placeholder?: string;
}
export function ComboBox<T extends object>({ label, description, errorMessage, children, placeholder, ...props }: ComboBoxProps<T>) {
  return <AriaComboBox {...props} className={fieldStyles.field}>
    <Label className={fieldStyles.label}>{label}</Label>
    <div className={styles.row}>
      <Input className={`${fieldStyles.control} ${styles.input}`} {...defined({ placeholder })} />
      <Button className={styles.toggle}><Icon name="chevron-down" /></Button>
    </div>
    <FieldHelp description={description} errorMessage={errorMessage} />
    <Popover className={listStyles.popover} offset={4}>
      <ListBox className={listStyles.list}>{children}</ListBox>
    </Popover>
  </AriaComboBox>;
}
