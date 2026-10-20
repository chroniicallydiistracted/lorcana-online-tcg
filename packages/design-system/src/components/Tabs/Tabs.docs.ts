import { defineDoc } from '../docs.ts';
export const tabsDoc = defineDoc({
  name: 'Tabs', status: 'experimental', foundation: 'react-aria-components Tabs / TabList / Tab / TabPanel',
  purpose: 'Switching between related panels in the same place.',
  anatomy: ['Tab list', 'Tabs with selection marker', 'Panel'],
  variants: ['horizontal', 'vertical'],
  states: ['selected', 'hovered', 'focused', 'disabled tab', 'many tabs wrapping'],
  inputs: ['selectedKey', 'orientation', 'keyboardActivation', 'children'],
  outputs: ['onSelectionChange'],
  accessibility: ['Arrow keys move between tabs; the panel is labelled by its tab', 'Selection shows weight and a marker, not colour alone'],
  contentLimits: ['Tab labels stay complete and the list wraps'],
  usage: ['Not for sequential steps or navigation between rooms'],
});
