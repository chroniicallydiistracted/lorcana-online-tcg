import { defineDoc } from '../docs.ts';
export const tableDoc = defineDoc({
  name: 'Table', status: 'experimental', foundation: 'react-aria-components Table',
  purpose: 'Dense tabular data with sorting, selection and keyboard navigation.',
  anatomy: ['Scroll container', 'Header row', 'Columns with optional sorting', 'Rows and cells', 'Honest empty state'],
  variants: ['read-only', 'selectable', 'sortable', 'numeric columns'],
  states: ['populated', 'empty', 'sorted', 'selected row', 'focused cell', 'long content'],
  inputs: ['aria-label', 'columns', 'items', 'selectionMode', 'sortDescriptor', 'emptyState'],
  outputs: ['onSortChange', 'onSelectionChange', 'onRowAction'],
  accessibility: ['Grid semantics with row and cell keyboard navigation', 'Selected rows show an edge marker, not colour alone', 'Sort direction is announced'],
  contentLimits: ['Horizontal scroll for wide tables; text wraps within cells'],
  usage: ['Charts and statistics show sample size, period and format; unavailable data is distinct from zero'],
});
