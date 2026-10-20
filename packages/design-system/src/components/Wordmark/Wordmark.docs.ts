import { defineDoc } from '../docs.ts';
export const wordmarkDoc = defineDoc({
  name: 'Wordmark', status: 'experimental', foundation: 'Text in Source Sans 3',
  purpose: 'The product name, The Inkspire, in a restrained Source Sans 3 treatment.',
  anatomy: ['Product name text'],
  variants: ['span', 'paragraph', 'page heading'],
  states: ['default'],
  inputs: ['as'],
  outputs: [],
  accessibility: ['Real text, so it scales and is read by assistive technology'],
  contentLimits: ['Product name only'],
  usage: ['Visibly distinct from official Disney Lorcana branding', 'Replaced only by an approved identity asset'],
});
