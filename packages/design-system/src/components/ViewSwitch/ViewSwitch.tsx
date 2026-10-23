import { ToggleButton, ToggleButtonGroup } from 'react-aria-components';
import styles from './ViewSwitch.module.css';

export interface ViewSwitchProps<K extends string> {
  /** Names the choice, for example "Collection view". */
  label: string;
  options: readonly { readonly id: K; readonly label: string }[];
  value: K;
  onChange: (value: K) => void;
}
/**
 * A single choice between presentations of the same content, such as Binder, Grid and List, or Fan and List (§17, §19).
 * Switching keeps the search, filters and selection; the caller owns that state.
 */
export function ViewSwitch<K extends string>({ label, options, value, onChange }: ViewSwitchProps<K>) {
  return <ToggleButtonGroup className={styles.group} aria-label={label} selectionMode="single" disallowEmptySelection selectedKeys={[value]}
    onSelectionChange={keys => { const next = [...keys][0]; if (next !== undefined) onChange(String(next) as K); }}>
    {options.map(option => <ToggleButton key={option.id} id={option.id} className={styles.option}>{option.label}</ToggleButton>)}
  </ToggleButtonGroup>;
}
