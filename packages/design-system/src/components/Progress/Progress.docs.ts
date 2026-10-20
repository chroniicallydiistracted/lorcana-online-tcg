import { defineDoc } from '../docs.ts';
export const progressBarDoc = defineDoc({
  name: 'ProgressBar', status: 'experimental', foundation: 'react-aria-components ProgressBar',
  purpose: 'Progress of an operation: determinate only when real progress is known.',
  anatomy: ['Label', 'Value text when determinate', 'Track and fill'],
  variants: ['determinate', 'indeterminate'],
  states: ['determinate', 'indeterminate', 'complete'],
  inputs: ['label', 'value', 'minValue', 'maxValue', 'valueLabel'],
  outputs: [],
  accessibility: ['progressbar role with value text', 'Indeterminate shows a static pattern, never a fabricated percentage or perpetual animation'],
  contentLimits: [],
  usage: ['Indeterminate operations never show percentages'],
});
export const jobStatusDoc = defineDoc({
  name: 'JobStatus', status: 'experimental', foundation: 'Icon, text and ProgressBar',
  purpose: 'Status of bounded background work such as a Lab experiment or an import.',
  anatomy: ['State icon', 'Job label', 'State text', 'Progress while running', 'Detail', 'Recovery or cancellation action'],
  variants: [],
  states: ['queued', 'running determinate', 'running indeterminate', 'failed', 'canceled', 'complete'],
  inputs: ['label', 'state', 'progress', 'detail', 'action'],
  outputs: [],
  accessibility: ['State is text and icon, not colour alone'],
  contentLimits: ['Labels and detail wrap'],
  usage: ['Failed states explain what happened, what it affects and what to do'],
});
