import { defineDoc } from '../docs.ts';
export const inkIdentityDoc = defineDoc({
  name: 'InkIdentity', status: 'experimental', foundation: 'Inline elements',
  purpose: 'Shows one or more ink identities with their names.',
  anatomy: ['Lorcana ink symbol in its own fixed colours (a neutral swatch when Lorcana assets are switched off)', 'Ink name (or two-letter marker in compact form with the full name for assistive technology)'],
  variants: ['single', 'multicolour', 'compact', 'neutral (Lorcana assets switched off)'],
  states: ['single', 'multicolour', 'compact', 'neutral'],
  inputs: ['inks', 'compact'],
  outputs: [],
  accessibility: ['The name is the non-colour cue; multicolour is announced as a list of inks', 'Symbols and swatches keep their identity colours in forced colours'],
  contentLimits: ['Names come from the localized catalog'],
  usage: ['Raw ink hues are never used for text or control boundaries', 'Ink colour never implies success or failure'],
});
