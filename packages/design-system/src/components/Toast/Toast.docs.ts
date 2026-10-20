import { defineDoc } from '../docs.ts';
export const toastDoc = defineDoc({
  name: 'Toast', status: 'experimental', foundation: 'react-aria-components UNSTABLE_ToastRegion / UNSTABLE_Toast / UNSTABLE_ToastQueue (unstable API, isolated in one file)',
  purpose: 'Priority-aware transient notifications outside play, with nonessential dismissal.',
  anatomy: ['Landmark region', 'Toast with tone icon, title, description', 'Dismiss button'],
  variants: ['information', 'success', 'warning', 'danger'],
  states: ['single', 'stacked', 'focused', 'long content'],
  inputs: ['toastQueue.add({ title, description, tone }, { timeout })'],
  outputs: ['onClose'],
  accessibility: ['Region is a landmark reachable with F6', 'Each toast has a dismiss button with an accessible name', 'Persistent until dismissed unless a timeout suits nonessential content'],
  contentLimits: ['Short title; description wraps'],
  usage: ['During play, non-match notifications are deferred into NotificationCount instead', 'A success toast corresponds to a confirmed result'],
});
