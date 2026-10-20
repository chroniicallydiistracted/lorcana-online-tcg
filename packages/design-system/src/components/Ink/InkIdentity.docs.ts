import { defineDoc } from '../docs.ts';
export const inkIdentityDoc = defineDoc({
  name: 'InkIdentity', status: 'experimental', foundation: 'Inline elements',
  purpose: 'Shows one or more ink identities with their names.',
  anatomy: ['Swatch in the legacy reference hue', 'Ink name (or two-letter marker in compact form with the full name for assistive technology)'],
  variants: ['single', 'multicolour', 'compact'],
  states: ['single', 'multicolour', 'compact'],
  inputs: ['inks', 'compact'],
  outputs: [],
  accessibility: ['The name is the non-colour cue; multicolour is announced as a list of inks', 'Swatches keep their identity colour in forced colours'],
  contentLimits: ['Names come from the localized catalog'],
  usage: ['Raw ink hues are never used for text or control boundaries', 'Ink colour never implies success or failure'],
});
