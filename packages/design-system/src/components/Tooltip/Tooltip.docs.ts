import { defineDoc } from '../docs.ts';
export const tooltipDoc = defineDoc({
  name: 'Tooltip', status: 'experimental', foundation: 'react-aria-components TooltipTrigger / Tooltip',
  purpose: 'Supplementary explanation available on hover and keyboard focus.',
  anatomy: ['Trigger', 'Bordered raised bubble'],
  variants: ['placement top, bottom, start, end'],
  states: ['hidden', 'open on hover', 'open on focus'],
  inputs: ['children (trigger and Tooltip)', 'placement', 'delay'],
  outputs: ['onOpenChange'],
  accessibility: ['Opens on focus as well as hover; Escape dismisses', 'Stays open while hovered', 'Content is linked to the trigger description'],
  contentLimits: ['Short supplementary text, about 20rem wide at most'],
  usage: ['Never the only home of essential instructions', 'Not for touch-only information'],
});
