import { defineDoc } from '../docs.ts';
export const cardBackDoc = defineDoc({
  name: 'CardBack', status: 'experimental', foundation: 'Image with a token-drawn fallback',
  purpose: 'A face-down card: the official Disney Lorcana card back (decision D28), or a neutral back when official assets are switched off.',
  anatomy: ['Official back at the card silhouette', 'Neutral back: paper surface, essential border and an inset rule'],
  variants: ['official', 'neutral'],
  states: ['official back', 'neutral back', 'small', 'labelled'],
  inputs: ['label'],
  outputs: [],
  accessibility: ['Decorative by default, because the surrounding context counts face-down cards ("Opponent\'s hand, 7 cards")', 'A label makes it a named image where nothing else names it'],
  contentLimits: ['Carries no text, so it has no long-content case'],
  usage: ['Never reveals a hidden card: the back is the same for every card', 'The image is shown unchanged; the browser scales it', 'cardBackImageUrl lets presentation code texture face-down cards in the scene without importing the component'],
});
