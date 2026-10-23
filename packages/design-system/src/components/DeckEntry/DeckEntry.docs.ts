import { defineDoc } from '../docs.ts';
export const deckEntryDoc = defineDoc({
  name: 'DeckEntry', status: 'experimental', foundation: 'QuantityField, InkIdentity, StatusIndicator',
  purpose: 'One deck line with an exact quantity, identity and separate legality and ownership messages.',
  anatomy: ['Cost', 'Name and version, which open the card for inspection', 'Ink identities', 'QuantityField named for the card', 'Legality message', 'Ownership message'],
  variants: ['valid', 'with legality problem', 'with ownership advisory'],
  states: ['valid', 'illegal quantity', 'ownership limit', 'at maximum', 'long name'],
  inputs: ['name', 'version', 'inks', 'cost', 'quantity', 'minQuantity', 'maxQuantity', 'legality', 'ownership'],
  outputs: ['onQuantityChange', 'onInspect'],
  accessibility: ['Quantity controls are add/remove alternatives to dragging', 'The name button\'s accessible name contains its visible text ("Inspect Judy Hopps – Helpful Officer", WCAG 2.5.3)', 'The quantity field keeps its "Quantity of …" label for assistive technology', 'Messages use icon and text'],
  contentLimits: ['Long names wrap; the line fits a 20 rem deck region'],
  usage: ['Validation names the card, quantity, reason and policy version', 'An ownership limit is never shown as an official rules restriction', 'No automatic substitution of illegal, unsupported or missing cards'],
});
