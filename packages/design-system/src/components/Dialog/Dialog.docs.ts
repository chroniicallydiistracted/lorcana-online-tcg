import { defineDoc } from '../docs.ts';
export const dialogDoc = defineDoc({
  name: 'Dialog', status: 'experimental', foundation: 'react-aria-components DialogTrigger / ModalOverlay / Modal / Dialog',
  purpose: 'Focused task content with a named purpose; also presented as a sheet.',
  anatomy: ['Scrim', 'Bordered surface with elevation', 'Title', 'Optional close button', 'Scrollable body', 'Action footer'],
  variants: ['dialog', 'sheet (inline end on wide layouts, bottom on compact)', 'alertdialog'],
  states: ['open', 'non-dismissable', 'long content', 'sheet'],
  inputs: ['title', 'children', 'actions', 'isDismissable', 'isOpen', 'role', 'presentation', 'showClose'],
  outputs: ['onOpenChange'],
  accessibility: ['Focus is contained and the background is inert', 'Focus returns to the trigger or a sensible surviving control', 'Escape dismisses only when dismissal is safe', 'Reduced motion removes spatial travel and keeps a brief fade'],
  contentLimits: ['Body scrolls; title wraps'],
  usage: ['Primary action last in the footer', 'Escape never implies that a submitted server command was canceled'],
});
export const sheetDoc = defineDoc({
  name: 'Sheet', status: 'experimental', foundation: 'Dialog with presentation="sheet"',
  purpose: 'A side or bottom panel for secondary tasks such as inspection on narrow layouts.',
  anatomy: ['Scrim', 'Docked panel', 'Title', 'Close button', 'Body'],
  variants: ['inline end (wide)', 'bottom (compact)'],
  states: ['open', 'compact bottom sheet'],
  inputs: ['title', 'children', 'isOpen'],
  outputs: ['onOpenChange'],
  accessibility: ['Same focus containment and restoration as Dialog'],
  contentLimits: ['Body scrolls'],
  usage: ['Use for secondary panels; never hide required match decisions in a sheet'],
});
