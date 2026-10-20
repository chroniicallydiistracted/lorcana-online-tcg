import { defineDoc } from '../docs.ts';
export const fanContentNoticeDoc = defineDoc({
  name: 'FanContentNotice', status: 'experimental', foundation: 'Paragraph with Link',
  purpose: 'The required Disney Lorcana fan-content notice under D07.',
  anatomy: ['Notice text', 'Community Code link', 'Disney Lorcana link'],
  variants: [],
  states: ['default'],
  inputs: ['None: the policy text and links are fixed'],
  outputs: [],
  accessibility: ['Both URLs are visible link text', 'Supporting text contrast 4.5:1 or more'],
  contentLimits: ['Exact policy wording; only the subject is replaced with The Inkspire'],
  usage: ['Reachable from every screen and shown in the start/loading context', 'Never paraphrased, shortened or translated without a sourced policy text'],
});
