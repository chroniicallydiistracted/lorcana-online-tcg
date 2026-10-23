import { defineDoc } from '../docs.ts';
export const quantityFieldDoc = defineDoc({
  name: 'QuantityField', status: 'experimental', foundation: 'react-aria-components NumberField',
  purpose: 'Exact integer quantities with explicit bounds, steppers and direct input.',
  anatomy: ['Label', 'Decrement button', 'Integer input', 'Increment button', 'Description and validation'],
  variants: ['visible label', 'label for assistive technology only', 'compact input'],
  states: ['default', 'at minimum', 'at maximum', 'invalid', 'disabled'],
  inputs: ['label', 'value', 'minValue', 'maxValue', 'description', 'errorMessage', 'isDisabled', 'labelVisibility', 'size'],
  outputs: ['onChange'],
  accessibility: ['Arrow keys and steppers change the value by one', 'Steppers have names and disable at the bounds', 'Tabular numerals'],
  contentLimits: ['Integers only; no fractions or grouping'],
  usage: ['Bounds come from the active format or ownership contract, never a hardcoded deck limit', 'Hide the label only where the same row shows what the quantity is of, such as a deck line\'s card name'],
});
