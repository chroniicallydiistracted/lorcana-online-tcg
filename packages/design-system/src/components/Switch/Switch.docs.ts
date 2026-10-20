import { defineDoc } from '../docs.ts';
export const switchDoc = defineDoc({
  name: 'Switch', status: 'experimental', foundation: 'react-aria-components Switch',
  purpose: 'An on/off setting that applies immediately.',
  anatomy: ['Track', 'Thumb', 'Label'],
  variants: [],
  states: ['off', 'on', 'focused', 'disabled'],
  inputs: ['children', 'isSelected', 'defaultSelected', 'isDisabled'],
  outputs: ['onChange'],
  accessibility: ['Announced as a switch with its on/off state', 'Thumb position and fill both show state', 'Label is part of the hit area'],
  contentLimits: ['Labels wrap'],
  usage: ['"Confirm before questing with all characters" and "Confirm before ending turn" are separate switches'],
});
