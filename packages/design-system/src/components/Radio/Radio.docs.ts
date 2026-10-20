import { defineDoc } from '../docs.ts';
export const radioGroupDoc = defineDoc({
  name: 'RadioGroup', status: 'experimental', foundation: 'react-aria-components RadioGroup / Radio',
  purpose: 'Choosing exactly one of a few visible options.',
  anatomy: ['Group label', 'Radio options', 'Description and validation'],
  variants: ['vertical', 'horizontal'],
  states: ['none selected', 'selected', 'focused', 'invalid', 'disabled'],
  inputs: ['label', 'value', 'orientation', 'description', 'errorMessage', 'isDisabled', 'isRequired'],
  outputs: ['onChange'],
  accessibility: ['Arrow keys move selection within the group', 'Each label is part of its 44 px hit area', 'Selected state shows an inner dot, not colour alone'],
  contentLimits: ['Labels wrap'],
  usage: ['Use Select when there are more than about five options'],
});
export const radioDoc = defineDoc({
  name: 'Radio', status: 'experimental', foundation: 'react-aria-components Radio',
  purpose: 'One option inside a RadioGroup.',
  anatomy: ['Circle with inner dot when selected', 'Label'],
  variants: [],
  states: ['default', 'selected', 'disabled'],
  inputs: ['value', 'children', 'isDisabled'],
  outputs: [],
  accessibility: ['Label is part of the hit area'],
  contentLimits: ['Labels wrap'],
  usage: ['Only inside RadioGroup'],
});
