import { defineDoc } from '../docs.ts';
export const listDoc = defineDoc({
  name: 'List', status: 'experimental', foundation: 'react-aria-components GridList / GridListItem',
  purpose: 'Interactive collections with stable identity, as a stack or a responsive grid.',
  anatomy: ['Collection', 'Items at the density row height', 'Honest empty state'],
  variants: ['stack', 'grid', 'single selection', 'multiple selection'],
  states: ['populated', 'empty', 'selected', 'focused', 'disabled item'],
  inputs: ['items', 'layout', 'selectionMode', 'selectedKeys', 'emptyState', 'aria-label'],
  outputs: ['onAction', 'onSelectionChange'],
  accessibility: ['Arrow keys move focus (two-dimensional in grid layout)', 'Selection shows a stronger border and tone, not colour alone', 'Items keep identity across re-renders'],
  contentLimits: ['Long item text wraps'],
  usage: ['Empty states explain the absence and offer a next action; a filtered-empty state keeps the filters and offers reset'],
});
