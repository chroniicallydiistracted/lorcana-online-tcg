import { Button, Group, Input, Label, NumberField } from 'react-aria-components';
import type { NumberFieldProps } from 'react-aria-components';
import type { ReactNode } from 'react';
import { Icon } from '../Icon/Icon.tsx';
import { FieldHelp, fieldStyles } from '../Field/Field.tsx';
import { useMessages } from '../../foundation/DesignSystemProvider.tsx';
import styles from './QuantityField.module.css';

export interface QuantityFieldProps extends Omit<NumberFieldProps, 'className' | 'style' | 'children' | 'formatOptions' | 'step' | 'minValue' | 'maxValue'> {
  label: ReactNode;
  /** Explicit bounds (§13). The deck limit comes from the active format contract, never a constant. */
  minValue: number;
  maxValue: number;
  description?: ReactNode;
  errorMessage?: ReactNode;
}
/** Exact integer quantity with increment/decrement and direct input. */
export function QuantityField({ label, description, errorMessage, minValue, maxValue, ...props }: QuantityFieldProps) {
  const t = useMessages();
  return <NumberField {...props} minValue={minValue} maxValue={maxValue} step={1} formatOptions={{ maximumFractionDigits: 0, useGrouping: false }} className={fieldStyles.field}>
    <Label className={fieldStyles.label}>{label}</Label>
    <Group className={styles.group}>
      <Button slot="decrement" className={styles.step} aria-label={t('action.decrease')}><Icon name="minus" /></Button>
      <Input className={`${fieldStyles.control} ${styles.input}`} />
      <Button slot="increment" className={styles.step} aria-label={t('action.increase')}><Icon name="plus" /></Button>
    </Group>
    <FieldHelp description={description} errorMessage={errorMessage} />
  </NumberField>;
}
