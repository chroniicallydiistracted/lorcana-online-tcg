import { defineDoc } from '../docs.ts';
const shared = {
  status: 'experimental' as const,
  anatomy: ['Persistent label', 'Input', 'Optional description', 'Validation message with icon'],
  variants: ['required', 'optional'],
  states: ['default', 'focused', 'invalid', 'read-only', 'disabled', 'long content'],
  outputs: ['onChange', 'onBlur'],
  accessibility: ['Label, description and error are programmatically linked', 'Errors use text and an icon, never colour alone', 'Paste and password managers work normally'],
  contentLimits: ['Long values scroll inside the control; labels wrap'],
  usage: ['Placeholders never replace the label', 'Read-only stays readable; disabled explains why where it matters'],
};
export const textFieldDoc = defineDoc({ ...shared, name: 'TextField', foundation: 'react-aria-components TextField / Input', purpose: 'Single-line text entry with a persistent label, description and validation.', inputs: ['label', 'description', 'errorMessage', 'value', 'isRequired', 'isReadOnly', 'isDisabled', 'isInvalid', 'type', 'autoComplete'] });
export const textAreaDoc = defineDoc({ ...shared, name: 'TextArea', foundation: 'react-aria-components TextField / TextArea', purpose: 'Multi-line text entry with a persistent label, description and validation.', inputs: ['label', 'description', 'errorMessage', 'value', 'isRequired', 'isReadOnly', 'isDisabled', 'isInvalid'] });
