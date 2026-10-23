import { defineDoc } from '../docs.ts';
export const catalogTileControlsDoc = defineDoc({
  name: 'CatalogTileControls', status: 'experimental', foundation: 'IconButton',
  purpose: 'The deckbuilder\'s single action row under a catalog card (decision D28): Remove, the quantity in the deck and Add.',
  anatomy: ['Remove button', 'Quantity in the deck', '"max" marker at the copy limit', 'Add button'],
  variants: ['standard'],
  states: ['not in deck', 'in deck', 'at copy limit'],
  inputs: ['name', 'quantity', 'max'],
  outputs: ['onAdd', 'onRemove'],
  accessibility: ['Buttons are named with the card ("Add one Judy Hopps – Helpful Officer")', 'The quantity reads "2 in deck"; at the limit it adds "copy limit 4 reached", and the visible "max" marker explains why Add is unavailable', 'Targets are 44 px and work by pointer, touch and keyboard, with no dragging'],
  contentLimits: ['Carries no card information; names, set and rarity belong to the inspector (D26)'],
  usage: ['Pressing the card itself opens it for reading; the row only adds and removes', 'The limit comes from the active format, counted by gameplay identity across printings'],
});
export const catalogResultsDoc = defineDoc({
  name: 'CatalogResults', status: 'experimental', foundation: 'CardTile, CatalogTileControls, InkIdentity',
  purpose: 'Catalog results as a large card grid by default, with a dense list one choice away (§18, the Director\'s visual-first answer).',
  anatomy: ['Card tiles with their action row (grid)', 'Rows with name, cost and type, inks and the action row (list)', 'Loading placeholders', 'Empty state'],
  variants: ['grid', 'list'],
  states: ['grid', 'list', 'loading', 'filtered empty', 'long names'],
  inputs: ['label', 'entries', 'view', 'loading', 'emptyState'],
  outputs: ['onAdd', 'onRemove', 'onInspect'],
  accessibility: ['Results are a named list', 'Loading is a busy status region whose placeholders are hidden from assistive technology', 'List rows open the inspector from the card name, named with set and number'],
  contentLimits: ['Long names wrap in the list; the grid shows the card itself'],
  usage: ['Placeholders keep the grid\'s known structure and invent no figures (§21)', 'The empty state keeps the filters and offers Reset filters'],
});
