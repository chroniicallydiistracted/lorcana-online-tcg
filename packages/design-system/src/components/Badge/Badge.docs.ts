import { defineDoc } from '../docs.ts';
export const badgeDoc = defineDoc({
  name: 'Badge', status: 'experimental', foundation: 'Inline text element',
  purpose: 'A short, readable label such as a category or rarity.',
  anatomy: ['Bordered label'],
  variants: ['neutral', 'information', 'success', 'warning', 'danger'],
  states: ['default', 'long label'],
  inputs: ['children', 'tone'],
  outputs: [],
  accessibility: ['Meaning is carried by the text', 'Feedback tones keep 7:1 text contrast'],
  contentLimits: ['Short labels; wraps if necessary'],
  usage: ['Uses feedback colours sparingly; an Emerald card is never "success" because it is green'],
});
export const statusIndicatorDoc = defineDoc({
  name: 'StatusIndicator', status: 'experimental', foundation: 'Icon with text',
  purpose: 'A state shown by an icon and text together.',
  anatomy: ['Status icon', 'Text'],
  variants: ['information', 'success', 'warning', 'danger'],
  states: ['default'],
  inputs: ['children', 'tone'],
  outputs: [],
  accessibility: ['The icon shape and the text both carry the state'],
  contentLimits: ['Short status text'],
  usage: ['Legality, ownership and connection states use explicit text'],
});
