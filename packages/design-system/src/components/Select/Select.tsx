import { Button, Label, ListBox, ListBoxItem, Popover, Select as AriaSelect, SelectValue } from 'react-aria-components';
import type { ListBoxItemProps, SelectProps as AriaSelectProps } from 'react-aria-components';
import type { ReactNode } from 'react';
import { Icon } from '../Icon/Icon.tsx';
import { FieldHelp, fieldStyles } from '../Field/Field.tsx';
import styles from './Select.module.css';
import { defined } from '../../foundation/props.ts';

export interface SelectProps<T extends object> extends Omit<AriaSelectProps<T>, 'className' | 'style' | 'children'> {
  label: ReactNode;
  description?: ReactNode;
  errorMessage?: ReactNode;
  items?: Iterable<T>;
  children: ReactNode | ((item: T) => ReactNode);
}
export function Select<T extends object>({ label, description, errorMessage, items, children, ...props }: SelectProps<T>) {
  return <AriaSelect {...props} className={fieldStyles.field}>
    <Label className={fieldStyles.label}>{label}</Label>
    <Button className={`${fieldStyles.control} ${styles.trigger}`}>
      <SelectValue className={styles.value} />
      <Icon name="chevron-down" />
    </Button>
    <FieldHelp description={description} errorMessage={errorMessage} />
    <Popover className={styles.popover} offset={4}>
      <ListBox className={styles.list} {...defined({ items })}>{children}</ListBox>
    </Popover>
  </AriaSelect>;
}
/** An option in a Select or ComboBox list. Selection shows the check icon as well as weight. */
export function Option({ children, ...props }: Omit<ListBoxItemProps, 'className' | 'children'> & { children: ReactNode }) {
  return <ListBoxItem {...props} className={styles.option}>
    {({ isSelected }) => <><span className={styles.optionText}>{children}</span>{isSelected && <Icon name="check" size="small" />}</>}
  </ListBoxItem>;
}
export { styles as listStyles };
