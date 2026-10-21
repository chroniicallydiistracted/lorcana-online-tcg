import { defineDoc } from '../docs.ts';
export const gameSymbolDoc = defineDoc({
  name: 'GameSymbol', status: 'experimental', foundation: 'Inline SVG',
  purpose: 'Shows a printed gameplay symbol (lore, strength, willpower, inkable, uninkable, exert) from the verified Lorcana assets, never a generic stand-in.',
  anatomy: ['Official symbol outline in the current text colour'],
  variants: ['standard (20 px)', 'prominent (24 px)', 'neutral placeholder (official assets off)'],
  states: ['decorative', 'labelled', 'neutral'],
  inputs: ['name', 'label (accessible name when the symbol carries meaning alone)', 'size'],
  outputs: [],
  accessibility: ['Decorative symbols are hidden from assistive technology', 'A symbol shown without text needs a label', 'Renders in the current text colour, so it keeps contrast in both themes and follows forced colours'],
  contentLimits: ['Printed gameplay symbols only; interface actions use Icon', 'Pair with the value or a visible word where the meaning is not obvious'],
  usage: ['Never replace an established printed symbol with a package icon', 'The neutral placeholder appears only when official assets are switched off (fan-content policy rule 4)'],
});
