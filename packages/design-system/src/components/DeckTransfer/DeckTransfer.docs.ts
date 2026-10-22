import { defineDoc } from '../docs.ts';
export const importPreviewDoc = defineDoc({
  name: 'ImportPreview', status: 'experimental', foundation: 'List with icon-and-text outcomes',
  purpose: 'Shows what a pasted deck list resolves to, reporting every unresolved name and count before anything changes (§18).',
  anatomy: ['Summary sentence', 'One line per pasted line with its outcome'],
  variants: ['standard'],
  states: ['all resolved', 'with unresolved lines'],
  inputs: ['lines'],
  outputs: [],
  accessibility: ['Each outcome has an icon with a text name and a sentence'],
  contentLimits: ['Long lines wrap; the dialog body scrolls'],
  usage: ['No automatic substitution of unresolved or illegal cards', 'The caller offers import and cancel'],
});
export const exportDialogDoc = defineDoc({
  name: 'ExportDialog', status: 'experimental', foundation: 'Dialog, RadioGroup, TextArea',
  purpose: 'Exports a deck with an explicit format choice and a read-only preview of the exact text (§18).',
  anatomy: ['Format choice', 'Read-only preview', 'Copy action with its result', 'Close'],
  variants: ['standard'],
  states: ['format chosen', 'copied', 'copy failed'],
  inputs: ['isOpen', 'title', 'formats'],
  outputs: ['onOpenChange'],
  accessibility: ['The copy result is a status message', 'The preview is selectable text'],
  contentLimits: ['The preview scrolls for long decks'],
  usage: ['Never exports in an implicit format'],
});
