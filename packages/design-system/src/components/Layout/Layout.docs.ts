import { defineDoc } from '../docs.ts';
export const stackDoc = defineDoc({
  name: 'Stack', status: 'experimental', foundation: 'CSS flexbox',
  purpose: 'Vertical grouping whose spacing expresses relationships from the shared scale.',
  anatomy: ['Flex column', 'Gap from the spacing scale'],
  variants: ['gap 0-16 scale steps', 'alignment'],
  states: ['default', 'nested groups'],
  inputs: ['gap', 'align', 'as', 'children'],
  outputs: [],
  accessibility: ['Use as="ul"/"ol" for real lists so semantics remain'],
  contentLimits: [],
  usage: ['8 px label to field, 12-16 px within a control group, 24 px between related groups, 32-48 px between sections'],
});
export const inlineDoc = defineDoc({
  name: 'Inline', status: 'experimental', foundation: 'CSS flexbox',
  purpose: 'Horizontal grouping that wraps instead of overflowing.',
  anatomy: ['Wrapping flex row', 'Gap from the spacing scale'],
  variants: ['gap 0-16 scale steps', 'alignment'],
  states: ['default', 'wrapping'],
  inputs: ['gap', 'align', 'as', 'children'],
  outputs: [],
  accessibility: ['Visual order follows source order'],
  contentLimits: ['Items wrap at narrow widths'],
  usage: ['Group related controls; 4-8 px between an icon and its label'],
});
export const surfaceDoc = defineDoc({
  name: 'Surface', status: 'experimental', foundation: 'Native sectioning elements',
  purpose: 'Tonal layering for contained content using borders and tone rather than shadows.',
  anatomy: ['Background tone', 'Optional essential border', 'Optional padding'],
  variants: ['canvas', 'surface', 'raised', 'bordered'],
  states: ['default', 'bordered', 'raised'],
  inputs: ['level', 'bordered', 'padded', 'as', 'children'],
  outputs: [],
  accessibility: ['Text on every level keeps the required contrast', 'Forced colours draw a system boundary'],
  contentLimits: [],
  usage: ['No glass panels over busy artwork', 'Shadows belong to overlays only'],
});
