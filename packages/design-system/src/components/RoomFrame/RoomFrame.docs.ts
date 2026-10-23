import { defineDoc } from '../docs.ts';
export const roomFrameDoc = defineDoc({
  name: 'RoomFrame', status: 'experimental', foundation: 'Landmarks and CSS grid',
  purpose: 'The frame of a room outside the match: skip link, navigation, a main landmark at the standard content width, and perimeter gutters reserved for ink-form artwork at expanded widths.',
  anatomy: ['Skip link to the room content', 'Navigation slot', 'Main landmark', 'Inline-start and inline-end ink-form slots (expanded widths)'],
  variants: ['standard'],
  states: ['standard', 'artwork slots shown', 'skip link focused'],
  inputs: ['navigation', 'children', 'inkForms'],
  outputs: [],
  accessibility: ['The skip link is the first focus stop and moves focus to the main landmark', 'Ink-form slots are hidden from assistive technology and take no focus'],
  contentLimits: ['Content is capped at the standard width; the room never scrolls horizontally'],
  usage: ['Rooms change composition inside the frame, not the frame itself (§5)'],
});
export const roomHeaderDoc = defineDoc({
  name: 'RoomHeader', status: 'experimental', foundation: 'Heading and flex layout',
  purpose: 'The room title as the level-1 heading, one line of context, the demonstration notice when needed, and room actions.',
  anatomy: ['Room title', 'Context line', 'Demonstration notice', 'Actions, primary last'],
  variants: ['with actions', 'title only'],
  states: ['standard', 'with demonstration notice', 'long title'],
  inputs: ['title', 'meta', 'demonstration', 'actions'],
  outputs: [],
  accessibility: ['One level-1 heading per room', 'Actions follow the title in reading order'],
  contentLimits: ['Long titles wrap; actions move below the title rather than overlap it'],
  usage: ['No marketing hero: the header names the room and its work (§5)'],
});
export const demonstrationLabelDoc = defineDoc({
  name: 'DemonstrationLabel', status: 'experimental', foundation: 'Icon and metadata text',
  purpose: 'States on every reference screen that the cards are real while the position, ownership and contents are invented (§24, §33).',
  anatomy: ['Information icon', 'Fixed sentence'],
  variants: ['standard'],
  states: ['standard'],
  inputs: ['none: the sentence is fixed and comes from the message catalog'],
  outputs: [],
  accessibility: ['Plain text in reading order, not a live region'],
  contentLimits: ['The sentence wraps at narrow widths'],
  usage: ['Sits in the room header or match chrome, never over a card', 'Required wherever demonstration data is shown'],
});
export const inkFormSlotDoc = defineDoc({
  name: 'InkFormSlot', status: 'experimental', foundation: 'Empty, decorative region',
  purpose: 'Reserves a room perimeter for authored ink-form artwork (§4, decision D27) and shows its name and extent only for review.',
  anatomy: ['Reserved region', 'Review outline with name and extent'],
  variants: ['hidden', 'outlined for review'],
  states: ['hidden', 'outlined'],
  inputs: ['name', 'extent'],
  outputs: [],
  accessibility: ['Hidden from assistive technology; never focusable'],
  contentLimits: ['Never overlaps controls or card information; collapses below 80 rem'],
  usage: ['Artwork is supplied separately; the slot stays empty until then', 'Placement is authored and stable, never random'],
});
