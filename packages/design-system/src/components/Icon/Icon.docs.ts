import { defineDoc } from '../docs.ts';
export const iconDoc = defineDoc({
  name: 'Icon', status: 'experimental', foundation: 'Phosphor Icons 2.1.10 (MIT), Regular weight',
  purpose: 'The interface icon family (decision D21): Phosphor Regular from a curated registry, one consistent meaning per symbol.',
  anatomy: ['Phosphor Regular glyph in currentColor', 'Fill weight for selected states'],
  variants: ['standard (20 px, controls)', 'prominent (24 px, prominent navigation)'],
  states: ['decorative', 'labelled', 'selected'],
  inputs: ['name (a registry meaning)', 'label (accessible name when the icon carries meaning alone)', 'size', 'selected'],
  outputs: [],
  accessibility: ['Decorative icons are hidden from assistive technology', 'A meaningful standalone icon needs a label; controls carry the name instead'],
  contentLimits: ['Interface symbols only; printed gameplay symbols use GameSymbol and InkIdentity', 'Only registry icons; Thin, Light and Duotone weights are not used'],
  usage: ['Never substitute emoji for an icon', 'Pair with visible text for important or unfamiliar actions', 'Selection is also shown by labels and accessible state, never by the Fill weight alone', 'Controls keep 44 × 44 px targets whatever the icon size'],
});
