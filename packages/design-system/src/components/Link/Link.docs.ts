import { defineDoc } from '../docs.ts';
export const linkDoc = defineDoc({
  name: 'Link', status: 'experimental', foundation: 'react-aria-components Link',
  purpose: 'Navigation to an identifiable destination.',
  anatomy: ['Underlined text', 'Optional external marker'],
  variants: ['internal', 'external'],
  states: ['default', 'hovered', 'focused', 'long destination'],
  inputs: ['href', 'children', 'external'],
  outputs: ['onPress'],
  accessibility: ['Underline distinguishes links without colour', 'Native link semantics and history behaviour'],
  contentLimits: ['Long URLs wrap'],
  usage: ['Use Button for actions; Link only navigates'],
});
