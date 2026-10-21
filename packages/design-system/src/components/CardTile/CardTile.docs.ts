import { defineDoc } from '../docs.ts';
export const cardTileDoc = defineDoc({
  name: 'CardTile', status: 'experimental', foundation: 'React Aria Button around CardImage',
  purpose: 'A printing shown as the card itself; pressing it opens the Card Inspector, which holds every detail (decision D26).',
  anatomy: ['Card image at the card silhouette, or a stable placeholder with the name', 'Foil mark on the card corner for foil printings'],
  variants: ['normal printing', 'foil printing'],
  states: ['normal printing', 'foil printing', 'location', 'missing image', 'failed image', 'official assets off', 'long name', 'hovered', 'focused'],
  inputs: ['printing'],
  outputs: ['onInspect'],
  accessibility: ['The whole card is one button named for the action, the card and the printing ("Inspect Elsa – Spirit of Winter, The First Chapter 42/204"), so reprints stay distinguishable; foil printings add the finish', 'The image is decorative inside the button; a missing or failed image keeps the name visible', 'Hover and press change the outline only; focus shows the standard ring'],
  contentLimits: ['No text under the card: names, set, rarity, inks and ownership belong to the inspector', 'Long names wrap inside the placeholder; nothing is silently truncated'],
  usage: ['Card art is never recoloured or dimmed by the interface', 'No independent continuous GPU loop per tile (§16)', 'Locations show as printed, sideways in the portrait card'],
});
