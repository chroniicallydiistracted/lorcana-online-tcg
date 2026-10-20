import { defineDoc } from '../docs.ts';
export const checkboxDoc = defineDoc({
  name: 'Checkbox', status: 'experimental', foundation: 'react-aria-components Checkbox',
  purpose: 'An independent yes/no choice with an accurate state and label.',
  anatomy: ['Box with check or dash glyph', 'Label'],
  variants: ['standalone', 'in a group'],
  states: ['unchecked', 'checked', 'indeterminate', 'focused', 'invalid', 'disabled'],
  inputs: ['children', 'isSelected', 'defaultSelected', 'isIndeterminate', 'isDisabled', 'isInvalid'],
  outputs: ['onChange'],
  accessibility: ['The label is part of the 44 px hit area', 'Checked state shows a glyph, not colour alone'],
  contentLimits: ['Labels wrap'],
  usage: ['Use Switch for settings that apply immediately'],
});
