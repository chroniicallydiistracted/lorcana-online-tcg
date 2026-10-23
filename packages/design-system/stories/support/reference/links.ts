/**
 * A link to another reference story inside the Storybook iframe, keeping the toolbar globals (theme, density, motion,
 * locale), so navigation between the reference screens is real rather than a dead control.
 */
export function storyHref(id: string, args?: string): string {
  const globals = typeof location === 'undefined' ? null : new URLSearchParams(location.search).get('globals');
  return `iframe.html?id=${id}&viewMode=story${globals ? `&globals=${globals}` : ''}${args ? `&args=${args}` : ''}`;
}
export const referenceStories = {
  match: 'reference-screens-crowded-match--idle',
  decks: 'reference-screens-deckbuilder--working',
  collection: 'reference-screens-collection-binder--partially-owned',
  packs: 'reference-screens-pack-opening--product-choice',
  otherRoom: 'reference-screens-room-frame--other-room',
} as const;
