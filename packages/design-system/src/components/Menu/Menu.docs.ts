import { defineDoc } from '../docs.ts';
export const menuDoc = defineDoc({
  name: 'Menu', status: 'experimental', foundation: 'react-aria-components MenuTrigger / Menu / MenuItem / Popover',
  purpose: 'A list of actions opened from a trigger.',
  anatomy: ['Trigger', 'Popover', 'Menu items with optional icon and description'],
  variants: ['default items', 'danger item', 'sections'],
  states: ['closed', 'open', 'focused item', 'disabled item', 'long item'],
  inputs: ['items', 'children', 'disabledKeys', 'selectionMode'],
  outputs: ['onAction', 'onOpenChange'],
  accessibility: ['Focus moves into the menu and returns to the trigger on close', 'Arrow keys, typeahead, Enter, Escape', 'Placement flips to stay on screen'],
  contentLimits: ['Complete labels; long items wrap'],
  usage: ['Actions only; use Select for choosing a value', 'Costly or destructive items still open a Confirmation'],
});
