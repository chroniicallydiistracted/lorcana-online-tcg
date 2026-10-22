import { defineDoc } from '../docs.ts';
export const cardInspectorDoc = defineDoc({
  name: 'CardInspector', status: 'experimental', foundation: 'Sections, description list, Switch, InkIdentity',
  purpose: 'Structured card information with a scalable reading presentation and contextual actions.',
  anatomy: ['Name, version, classification', 'Ink identities and finish', 'Reading mode switch', 'Optional Interactive Card Viewer slot', 'Printed text and flavour', 'Current effects', 'Printing facts', 'Ownership', 'Legality', 'Rulings with source and version', 'Actions'],
  variants: ['standard reading', 'reading mode (rules at 20/28 px)'],
  states: ['standard', 'reading mode', 'with current effects', 'with rulings', 'ownership unavailable', 'long text'],
  inputs: ['printing', 'classifications', 'printed', 'flavor', 'modifiers', 'ownership', 'legality', 'rulings', 'viewer', 'readingMode', 'actions'],
  outputs: ['onReadingModeChange'],
  accessibility: ['Complete rules and flavour as real text; scales with user text size', 'Printed wording, current effects and rulings are separate labelled sections'],
  contentLimits: ['Never shrinks, crops or omits text to fit'],
  usage: ['Card art is never recoloured by the theme', 'Only authorized, relevant information is shown on each surface'],
});
export const inspectorHostDoc = defineDoc({
  name: 'InspectorHost', status: 'experimental', foundation: 'Native aside on wide layouts; Dialog sheet on narrower layouts',
  purpose: 'Accessible placement and lifecycle for inspection that preserves the working context.',
  anatomy: ['Wide: side panel with title and close button', 'Narrow: modal sheet'],
  variants: ['side panel (64rem and wider)', 'sheet (narrower)'],
  states: ['closed', 'open wide', 'open narrow'],
  inputs: ['isOpen', 'title', 'children', 'fallbackFocus'],
  outputs: ['onOpenChange'],
  accessibility: ['Focus moves into the panel on open and returns to the originating card on close when it still exists', 'Escape closes the panel when focus is inside it'],
  contentLimits: ['Body scrolls'],
  usage: ['Navigating to an inspector preserves unsaved deck edits and filters', 'Hosts a lazily loaded Interactive Card Viewer; the design system never imports Babylon'],
});
export const inspectorLayoutDoc = defineDoc({
  name: 'InspectorLayout', status: 'experimental', foundation: 'CSS grid',
  purpose: 'Places inspection beside the working content on wide layouts, keeping the host mounted so focus returns to the originating card.',
  anatomy: ['Working content', 'Inspection column (wide layouts, while inspecting)'],
  variants: ['standard'],
  states: ['closed', 'inspecting'],
  inputs: ['children', 'inspector', 'inspecting'],
  outputs: [],
  accessibility: ['Reading order is the working content, then the inspection panel'],
  contentLimits: ['The inspection column is the sheet width; the content takes the rest'],
  usage: ['Narrower layouts use the host\'s modal sheet; the column stays empty'],
});
