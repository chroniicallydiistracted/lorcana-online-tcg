import { defineDoc } from '../docs.ts';
export const iconDoc = defineDoc({
  name: 'Icon', status: 'experimental', foundation: 'Inline SVG',
  purpose: 'The single interface icon family: consistent optical size and stroke for every standard interface symbol.',
  anatomy: ['24-unit grid', '2-unit round stroke in currentColor'],
  variants: ['medium (24 px)', 'small (20 px)'],
  states: ['decorative', 'labelled'],
  inputs: ['name', 'label (accessible name when the icon carries meaning alone)', 'size'],
  outputs: [],
  accessibility: ['Decorative icons are hidden from assistive technology', 'A meaningful standalone icon needs a label; controls carry the name instead'],
  contentLimits: ['Interface symbols only; domain-specific symbols get authored replacements'],
  usage: ['Never substitute emoji for an icon', 'Pair with visible text for important or unfamiliar actions'],
});
