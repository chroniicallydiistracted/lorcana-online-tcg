import { defineDoc } from '../docs.ts';
export const connectionStatusDoc = defineDoc({
  name: 'ConnectionStatus', status: 'experimental', foundation: 'Status region with icon and text',
  purpose: 'Current connection state and whether actions are available.',
  anatomy: ['State icon', 'State label', 'Action availability text', 'Optional recovery action'],
  variants: ['full', 'compact'],
  states: ['connected', 'reconnecting', 'resyncing', 'offline', 'version-mismatch'],
  inputs: ['state', 'action', 'compact'],
  outputs: [],
  accessibility: ['Status semantics; text names the state and action availability', 'Never relies on colour'],
  contentLimits: ['Wraps at narrow widths'],
  usage: ['Commands resume only after resynchronization confirms the latest state', 'An unknown commit result reconciles the original receipt rather than repeating the command'],
});
