import { defineDoc } from '../docs.ts';
export const viewSwitchDoc = defineDoc({
  name: 'ViewSwitch', status: 'experimental', foundation: 'React Aria ToggleButtonGroup (single selection)',
  purpose: 'Chooses between presentations of the same content (Binder, Grid, List; Fan, List) without losing search, filters or selection.',
  anatomy: ['Bordered group', 'One toggle per view, the selected one filled'],
  variants: ['two options', 'three options'],
  states: ['selected', 'hovered', 'focused', 'long labels'],
  inputs: ['label', 'options', 'value'],
  outputs: ['onChange'],
  accessibility: ['A named group of toggle buttons; the selected one reports pressed state and uses fill and weight, not colour alone', 'Arrow keys move between options'],
  contentLimits: ['Labels wrap onto a second row rather than truncate'],
  usage: ['The caller keeps search, filters and the selected item when the view changes (§17)', 'One selection is always present'],
});
