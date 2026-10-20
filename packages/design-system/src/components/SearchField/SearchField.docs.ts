import { defineDoc } from '../docs.ts';
export const searchFieldDoc = defineDoc({
  name: 'SearchField', status: 'experimental', foundation: 'react-aria-components SearchField',
  purpose: 'Query entry with a clear action and an honest result count.',
  anatomy: ['Label', 'Search icon', 'Input', 'Clear button', 'Result count status'],
  variants: ['with result count', 'without count while unknown'],
  states: ['empty', 'with query', 'no results', 'focused', 'disabled'],
  inputs: ['label', 'value', 'resultCount', 'description', 'placeholder'],
  outputs: ['onChange', 'onSubmit', 'onClear'],
  accessibility: ['Escape clears the query', 'Clear button has an accessible name', 'Result count is a polite status, not announced per keystroke frame'],
  contentLimits: ['Long queries scroll inside the input'],
  usage: ['A no-results state offers a way to adjust or reset filters', 'Never discard unsaved edits when searching'],
});
