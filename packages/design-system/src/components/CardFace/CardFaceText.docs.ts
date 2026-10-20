import { defineDoc } from '../docs.ts';
export const cardFaceTextDoc = defineDoc({
  name: 'CardFaceText', status: 'experimental', foundation: 'Container-query text layer',
  purpose: 'Preserves the legacy printed card-face typography roles and proportions.',
  anatomy: ['Card-face container (63:88)', 'Title', 'Version', 'Classification', 'Rules blocks with ability and keyword headings', 'Flavour'],
  variants: ['standard', 'dense', 'denser', 'densest rules treatments'],
  states: ['standard', 'densest', 'without version'],
  inputs: ['title', 'version', 'classification', 'rules', 'flavor', 'density'],
  outputs: [],
  accessibility: ['Printed treatment only; readable inspection is CardInspector\'s reading mode'],
  contentLimits: ['Overflowing text is resolved by layout or the alternate presentation, never silently cropped'],
  usage: ['Card-face sizes apply only inside a card-face container, never to interface text', 'Card fonts fall back to Source Sans 3 until their usage basis is recorded'],
});
