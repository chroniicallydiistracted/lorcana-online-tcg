import { defineDoc } from '../docs.ts';
export const filterBarDoc = defineDoc({
  name: 'FilterBar', status: 'experimental', foundation: 'SearchField, React Aria ToggleButtonGroup, Select, Dialog',
  purpose: 'Catalog search and meaningful filters for deck building (§18): ink, cost, type, rarity, set, inkability and classification.',
  anatomy: ['Search field with result count', 'Ink toggles with symbol and name', 'Cost toggles, the last meaning "or more"', 'Selects for type, rarity, set, inkability and classification', 'Reset filters', 'Filters button and sheet on narrower layouts'],
  variants: ['inline (wide layouts)', 'sheet (narrower layouts)'],
  states: ['no filters', 'filters active', 'filtered to nothing', 'sheet open', 'long labels'],
  inputs: ['filters', 'resultCount', 'searchLabel', 'costs', 'types', 'rarities', 'sets', 'classifications'],
  outputs: ['onChange'],
  accessibility: ['Toggle groups are named ("Ink", "Cost"); a selected toggle shows a check icon and a stronger border, not colour alone', 'Cost toggles are named in words ("Cost 3", "Cost 8 or more")', 'The result count is announced politely by the search field'],
  contentLimits: ['Toggles and selects wrap; nothing truncates'],
  usage: ['Filtering never discards unsaved deck edits (§18)', 'Reset filters keeps the search text', 'Completion and deck figures never recalculate from filtered results'],
});
