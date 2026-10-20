import { defineDoc } from '../docs.ts';
export const notificationCountDoc = defineDoc({
  name: 'NotificationCount', status: 'experimental', foundation: 'react-aria-components Button',
  purpose: 'The quiet count of notifications deferred during play.',
  anatomy: ['Bell icon', 'Number when greater than zero', 'Accessible name stating the count'],
  variants: [],
  states: ['zero', 'some', 'many', 'focused'],
  inputs: ['count'],
  outputs: ['onPress (opens the notification list)'],
  accessibility: ['No live announcement per increment; the count is read when the control is focused', 'No animation, sound or focus change when the count rises'],
  contentLimits: ['Locale-formatted number'],
  usage: ['Required match decisions, connection problems, match deadlines and terminal results are never deferred', 'A tournament notice is not promoted to an interruption because it is time-sensitive'],
});
