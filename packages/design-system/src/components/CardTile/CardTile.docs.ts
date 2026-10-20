import { defineDoc } from '../docs.ts';
export const cardTileDoc = defineDoc({
  name: 'CardTile', status: 'experimental', foundation: 'Article with CardImage, Badge, InkIdentity and Button',
  purpose: 'A printing with its identity, finish, ownership, inspection and available actions.',
  anatomy: ['Card image with reserved size or stable placeholder', 'Name and version', 'Set, collector number and rarity', 'Ink identities', 'Finish badge', 'Ownership summary', 'Inspect and contextual actions'],
  variants: ['normal printing', 'foil printing'],
  states: ['owned', 'unowned', 'unknown ownership', 'loading ownership', 'unavailable ownership', 'missing image', 'long name'],
  inputs: ['printing', 'ownership', 'actions'],
  outputs: ['onInspect'],
  accessibility: ['The tile is labelled by the card name', 'Inspect has a specific name ("Inspect Mickey Mouse – Brave Little Tailor")', 'A failed image keeps the name, identity and actions'],
  contentLimits: ['Long names wrap; nothing is silently truncated'],
  usage: ['Separate normal, foil and total quantities', 'Unavailable ownership never shows as zero; catalog visibility is not ownership', 'No independent continuous GPU loop per tile'],
});
