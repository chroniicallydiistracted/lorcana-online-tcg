import { defineDoc } from '../docs.ts';
export const comboBoxDoc = defineDoc({
  name: 'ComboBox', status: 'experimental', foundation: 'react-aria-components ComboBox',
  purpose: 'Choosing a value from a long list by typing to filter.',
  anatomy: ['Label', 'Text input', 'Toggle button', 'Filtered option list', 'Description and validation'],
  variants: ['free text not allowed', 'allows custom value'],
  states: ['closed', 'open filtered', 'no matches', 'selected', 'invalid', 'disabled'],
  inputs: ['label', 'items', 'selectedKey', 'inputValue', 'allowsCustomValue', 'description', 'errorMessage'],
  outputs: ['onSelectionChange', 'onInputChange'],
  accessibility: ['Typing filters; arrows move; Enter selects; Escape closes', 'Operable by touch without hover'],
  contentLimits: ['Long options wrap'],
  usage: ['Use Select for short known lists'],
});
