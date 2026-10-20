import { defineDoc } from '../docs.ts';
export const selectDoc = defineDoc({
  name: 'Select', status: 'experimental', foundation: 'react-aria-components Select / ListBox / Popover',
  purpose: 'Choosing one value from a known list with full keyboard and touch operation.',
  anatomy: ['Label', 'Trigger showing the selected value', 'Popover list of options', 'Description and validation'],
  variants: ['with description', 'required'],
  states: ['closed', 'open', 'selected', 'invalid', 'disabled', 'long option'],
  inputs: ['label', 'items', 'selectedKey', 'description', 'errorMessage', 'isDisabled', 'isRequired'],
  outputs: ['onSelectionChange', 'onOpenChange'],
  accessibility: ['Arrow keys, typeahead, Enter and Escape', 'Selected value is understandable without opening the list', 'Selection uses weight and a check mark, not colour alone'],
  contentLimits: ['Long options wrap inside the list'],
  usage: ['Use ComboBox when the list is long enough to need filtering'],
});
export const optionDoc = defineDoc({
  name: 'Option', status: 'experimental', foundation: 'react-aria-components ListBoxItem',
  purpose: 'One selectable option inside Select or ComboBox.',
  anatomy: ['Row at the current density height', 'Text', 'Selection check'],
  variants: [],
  states: ['default', 'focused', 'selected', 'disabled'],
  inputs: ['id', 'textValue', 'children', 'isDisabled'],
  outputs: [],
  accessibility: ['Row height follows the density preference and never drops below 44 px'],
  contentLimits: ['Wraps long text'],
  usage: ['Rendered only inside Select or ComboBox'],
});
