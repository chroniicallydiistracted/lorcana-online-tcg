import { defineDoc } from '../docs.ts';
export const popoverDoc = defineDoc({
  name: 'Popover', status: 'experimental', foundation: 'react-aria-components DialogTrigger / Popover / Dialog',
  purpose: 'Non-modal contextual content anchored to a trigger.',
  anatomy: ['Trigger', 'Bordered surface with elevation', 'Optional title', 'Content'],
  variants: ['with title', 'without title (needs aria-label)'],
  states: ['closed', 'open', 'long content'],
  inputs: ['title', 'children', 'placement', 'aria-label'],
  outputs: ['onOpenChange'],
  accessibility: ['Focus moves in and returns to the trigger', 'Escape or an outside press dismisses', 'Placement flips to stay visible'],
  contentLimits: ['Width capped; long content wraps'],
  usage: ['Use Dialog for content that needs the whole task focus'],
});
