import { defineDoc } from '../docs.ts';
export const buttonDoc = defineDoc({
  name: 'Button', status: 'experimental', foundation: 'react-aria-components Button',
  purpose: 'A clear action with a concrete label.',
  anatomy: ['Optional leading icon', 'Label', 'Pending indicator replacing the icon while pending'],
  variants: ['primary', 'secondary', 'quiet', 'danger'],
  states: ['default', 'hovered', 'pressed', 'focused', 'disabled', 'pending', 'long label'],
  inputs: ['variant', 'icon', 'children', 'isDisabled', 'isPending', 'type'],
  outputs: ['onPress'],
  accessibility: ['44 x 44 px minimum hit area', 'Visible 2 px focus boundary with 3 px offset', 'Pending state is announced and blocks duplicate presses', 'Pointer-down alone never commits'],
  contentLimits: ['Labels stay complete and wrap rather than truncate'],
  usage: ['Name the action ("End turn", "Add to deck"); avoid "Continue" or "Confirm" where the consequence is unclear', 'One primary action per decision area', 'Hover never moves or resizes the hit area'],
});
export const iconButtonDoc = defineDoc({
  name: 'IconButton', status: 'experimental', foundation: 'react-aria-components Button with TooltipTrigger',
  purpose: 'A compact action identified by an icon and an accessible name.',
  anatomy: ['Icon', 'Accessible name', 'Tooltip with the name'],
  variants: ['quiet', 'secondary', 'danger'],
  states: ['default', 'hovered', 'focused', 'disabled', 'pending'],
  inputs: ['icon', 'label', 'variant', 'tooltip', 'isDisabled', 'isPending'],
  outputs: ['onPress'],
  accessibility: ['Always has an accessible name', 'The name is also visible as a tooltip on hover and focus', '44 x 44 px hit area even though the glyph is smaller'],
  contentLimits: ['Label is a short action name'],
  usage: ['Important or unfamiliar actions use Button with a visible label instead'],
});
