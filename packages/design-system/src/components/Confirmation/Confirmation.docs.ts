import { defineDoc } from '../docs.ts';
export const confirmationDoc = defineDoc({
  name: 'Confirmation', status: 'experimental', foundation: 'Dialog (alertdialog) with Buttons',
  purpose: 'Proportionate review of a concrete action, its context and consequence, with cancellation.',
  anatomy: ['Title naming the action', 'Consequence in critical text', 'Optional public context', 'Cancel action', 'Concrete confirm action'],
  variants: ['default', 'danger'],
  states: ['open', 'with context', 'danger', 'long content'],
  inputs: ['isOpen', 'title', 'consequence', 'context', 'confirmLabel', 'cancelLabel', 'tone'],
  outputs: ['onConfirm', 'onOpenChange'],
  accessibility: ['alertdialog semantics; focus starts inside and returns to the trigger', 'Escape cancels the local review only'],
  contentLimits: ['Consequence stays within the reading measure'],
  usage: ['"Confirm before questing with all characters" and "Confirm before ending turn" default on and are independent', 'End-turn review uses "End turn" and "Keep playing"', 'Never promise an exact final outcome when unresolved effects may change it', 'Mandatory targets, payments and choices are never bypassed by a confirmation preference'],
});
