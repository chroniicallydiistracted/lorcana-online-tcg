import { defineDoc } from '../docs.ts';
const shared = {
  status: 'experimental' as const, foundation: 'Native region with status/alert role',
  anatomy: ['Tone icon with name', 'Title: what happened', 'Body: what it affects and what to do', 'Recovery actions'],
  variants: ['information', 'success', 'warning', 'danger'],
  states: ['information', 'success', 'warning', 'danger', 'with actions', 'long content'],
  inputs: ['tone', 'title', 'children', 'actions'],
  outputs: [],
  accessibility: ['Text and icon carry the tone; feedback text keeps 7:1 contrast', 'Warning and danger use alert semantics; others use status'],
  contentLimits: ['Body within the reading measure'],
};
export const inlineMessageDoc = defineDoc({ ...shared, name: 'InlineMessage', purpose: 'A message about the content it sits beside, with reason, consequence and recovery.', usage: ['Errors explain what happened, what it affects and what to do; no stack traces', 'A success message corresponds to a confirmed result'] });
export const bannerDoc = defineDoc({ ...shared, name: 'Banner', purpose: 'A room- or page-level message spanning the content width.', usage: ['For conditions that affect the whole room, such as offline or version mismatch'] });
