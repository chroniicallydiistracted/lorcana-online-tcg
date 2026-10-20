import { defineDoc } from '../docs.ts';
export const deckEntryDoc = defineDoc({
  name: 'DeckEntry', status: 'experimental', foundation: 'QuantityField, InkIdentity, StatusIndicator, Button',
  purpose: 'One deck line with an exact quantity, identity and separate legality and ownership messages.',
  anatomy: ['QuantityField labelled with the card name', 'Cost', 'Name and version', 'Ink identities', 'Legality message', 'Ownership message', 'Inspect action'],
  variants: ['valid', 'with legality problem', 'with ownership advisory'],
  states: ['valid', 'illegal quantity', 'ownership limit', 'at maximum', 'long name'],
  inputs: ['name', 'version', 'inks', 'cost', 'quantity', 'minQuantity', 'maxQuantity', 'legality', 'ownership'],
  outputs: ['onQuantityChange', 'onInspect'],
  accessibility: ['Quantity controls are add/remove alternatives to dragging', 'Messages use icon and text'],
  contentLimits: ['Long names wrap'],
  usage: ['Validation names the card, quantity, reason and policy version', 'An ownership limit is never shown as an official rules restriction', 'No automatic substitution of illegal, unsupported or missing cards'],
});
