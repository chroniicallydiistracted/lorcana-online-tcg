import { defineDoc } from '../docs.ts';
export const deckWorkspaceDoc = defineDoc({
  name: 'DeckWorkspace', status: 'experimental', foundation: 'CSS grid and Tabs',
  purpose: 'The deckbuilder working layout (§18): catalog and deck side by side on wide layouts, one focused pane with Catalog and Deck tabs on narrower ones.',
  anatomy: ['Catalog region', 'Inspector column while a card is open', 'Deck region, kept in view', 'Catalog and Deck tabs (narrower layouts)', 'Persistent summary bar (narrower layouts)'],
  variants: ['two regions', 'single pane'],
  states: ['two regions', 'inspecting', 'single pane, catalog', 'single pane, deck'],
  inputs: ['catalog', 'deck', 'catalogLabel', 'deckLabel', 'summaryBar', 'inspector', 'inspecting'],
  outputs: [],
  accessibility: ['Regions are named sections; tabs follow the Tabs pattern'],
  contentLimits: ['The deck region is 25 rem from 80 rem and 22.5 rem from 64 to 80 rem'],
  usage: ['The narrow layout keeps the same journey, not a squeezed desktop (§33)', 'The catalog stays mounted while inspecting, so closing returns focus to the originating tile with the search kept'],
});
export const deckPanelDoc = defineDoc({
  name: 'DeckPanel', status: 'experimental', foundation: 'Flex column',
  purpose: 'The deck region: header, scrolling contents and a pinned footer for validation and Save.',
  anatomy: ['Header', 'Scrolling body', 'Pinned footer'],
  variants: ['standard'],
  states: ['standard', 'long contents'],
  inputs: ['header', 'children', 'footer', 'footerLabel'],
  outputs: [],
  accessibility: ['Reading order follows header, contents, footer', 'The footer is a named group that takes keyboard focus, because it scrolls when validation is long'],
  contentLimits: ['The body and footer scroll independently when long'],
  usage: ['Validation sits next to Save, the action it affects'],
});
