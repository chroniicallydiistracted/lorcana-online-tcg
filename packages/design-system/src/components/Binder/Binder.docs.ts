import { defineDoc } from '../docs.ts';
export const binderDoc = defineDoc({
  name: 'Binder', status: 'experimental', foundation: 'IconButton, TextField and a measured layout',
  purpose: 'Set-oriented binder pages (§17): one or two faces of 3 × 3 pockets by content fit, with previous and next buttons, a page indicator, Go to card number and page keys scoped to the binder.',
  anatomy: ['Page indicator', 'Go to card number field', 'Previous and next buttons flanking the spread, kept in view while a tall spread scrolls', 'One or two faces, each with its section header (ink or special printings) and page number', 'Nine pockets per face', 'Key hint'],
  variants: ['two faces', 'single face'],
  states: ['two faces', 'single face', 'first page', 'anchored to a printing', 'card number not found', 'reduced motion'],
  inputs: ['label', 'pages', 'page', 'findCard', 'singleFace'],
  outputs: ['onPageChange', 'onInspect'],
  accessibility: ['A named region; each face is a named group ("Sapphire, page 17")', 'Only visible faces are rendered, so offscreen pages are out of the focus order', 'Page Up and Page Down turn pages only while focus is inside the binder, then focus the new spread\'s first pocket', 'Buttons and the go-to field are alternatives to swiping', 'The page indicator is announced politely when the page changes'],
  contentLimits: ['Pockets shrink to the minimum usable size before the spread drops to a single face; nothing overlaps'],
  usage: ['The page follows an anchor printing, so a resize or view change keeps the same printing in view', 'Section identity stays when artwork is unavailable', 'Page changes fade with a short travel; reduced motion removes the travel'],
});
export const binderPocketDoc = defineDoc({
  name: 'BinderPocket', status: 'experimental', foundation: 'React Aria Button around CardImage or a silhouette',
  purpose: 'One printing\'s pocket: owned with normal and foil quantities, missing with its silhouette, name and number, or labelled unknown or unavailable ownership; loading, padding and filtered pockets take no focus.',
  anatomy: ['Card image, or silhouette with name and number when missing', 'Quantities or ownership label'],
  variants: ['owned', 'missing', 'unknown', 'unavailable', 'loading', 'padding', 'filtered'],
  states: ['owned', 'owned foil', 'missing', 'unknown', 'unavailable', 'loading', 'padding', 'filtered', 'official assets off'],
  inputs: ['pocket'],
  outputs: ['onInspect'],
  accessibility: ['Each printing pocket is one button named with the card, set, number and its ownership ("Inspect Lafayette – All Ears, Hyperia City 142/204. 1 normal, 0 foil")', 'Padding, loading and filtered pockets are hidden from assistive technology and never focusable'],
  contentLimits: ['Missing names wrap inside the silhouette'],
  usage: ['Unavailable ownership never reads as zero', 'A missing printing is distinct from padding (§17)', 'Catalog visibility is not ownership'],
});
export const pocketGridDoc = defineDoc({
  name: 'PocketGrid', status: 'experimental', foundation: 'BinderPocket in a responsive grid',
  purpose: 'The Collection\'s Grid view: the same pockets as the binder, without page geometry.',
  anatomy: ['Responsive grid of pockets', 'Empty state'],
  variants: ['standard'],
  states: ['standard', 'filtered empty'],
  inputs: ['label', 'pockets', 'emptyState'],
  outputs: ['onInspect'],
  accessibility: ['A named list of pockets'],
  contentLimits: ['Columns follow the minimum usable pocket size'],
  usage: ['Search, filters and the selected printing carry over from the binder view'],
});
export const completionSummaryDoc = defineDoc({
  name: 'CompletionSummary', status: 'experimental', foundation: 'ProgressBar and a description list',
  purpose: 'Set completion against the standard printings, with special printings counted separately and foil availability apart from foil ownership (§17).',
  anatomy: ['Completion bar with "owned of total"', 'Special printings figure', 'Foils owned', 'Foil versions available'],
  variants: ['standard'],
  states: ['partial', 'none owned', 'unavailable'],
  inputs: ['set', 'standard', 'special', 'foils'],
  outputs: [],
  accessibility: ['The bar has a text value ("24 of 204 owned")', 'Unavailable ownership is stated, never shown as zero'],
  contentLimits: ['Figures wrap'],
  usage: ['Never recalculated from filtered results', 'Real counts only; demonstration figures are labelled by the room'],
});
