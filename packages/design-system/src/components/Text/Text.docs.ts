import { defineDoc } from '../docs.ts';
export const textDoc = defineDoc({
  name: 'Text', status: 'experimental', foundation: 'Native text elements',
  purpose: 'Interface text in the approved Source Sans 3 type roles, independent of document structure.',
  anatomy: ['Text element with a type role', 'Optional supporting tone', 'Optional tabular numerals'],
  variants: ['annotation 12/16', 'metadata 14/20', 'body 16/24', 'body-strong 16/24 600', 'critical 18/24 600'],
  states: ['default', 'supporting', 'numeric', 'long content'],
  inputs: ['role', 'as', 'tone', 'numeric', 'children'],
  outputs: [],
  accessibility: ['Sizes are rem tokens and scale with user text size', 'Supporting text keeps 4.5:1 or more on every neutral surface'],
  contentLimits: ['Reading columns stay at or below about 75 characters', 'Long words wrap instead of overflowing'],
  usage: ['Essential instructions never use annotation', 'Sentence case for labels; uppercase only for short category markers'],
});
export const headingDoc = defineDoc({
  name: 'Heading', status: 'experimental', foundation: 'Native h1-h6',
  purpose: 'Headings whose visual role is independent of their semantic level.',
  anatomy: ['Heading element', 'Visual role'],
  variants: ['subsection 20/28', 'section 24/32', 'room 32/36', 'display 40/44'],
  states: ['default', 'long content'],
  inputs: ['level', 'role', 'children'],
  outputs: [],
  accessibility: ['The level follows document structure; the role only sets appearance'],
  contentLimits: ['Long headings wrap and balance'],
  usage: ['Display is reserved for selected introductory or celebratory moments'],
});
