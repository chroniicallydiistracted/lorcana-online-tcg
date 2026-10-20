import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Button, CardFaceText, CardInspector, CardTile, DeckEntry, InkIdentity, InspectorHost, Inline, Stack, Text } from '../src/index.ts';
import { inkIdentityDoc } from '../src/components/Ink/InkIdentity.docs.ts';
import { cardTileDoc } from '../src/components/CardTile/CardTile.docs.ts';
import { deckEntryDoc } from '../src/components/DeckEntry/DeckEntry.docs.ts';
import { cardInspectorDoc, inspectorHostDoc } from '../src/components/Inspector/Inspector.docs.ts';
import { cardFaceTextDoc } from '../src/components/CardFace/CardFaceText.docs.ts';
import { DocPage } from './support/DocPage.tsx';
import { brokenImage, foilPrinting, longPrinting, longText, missingImage, printing } from './support/fixtures.ts';

const meta = { title: 'Cards/Tiles, deck entries and inspection' } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
const grid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(11rem, 1fr))', gap: 'var(--is-space-4)' } as const;
const printed = [
  { kind: 'keyword' as const, heading: 'Evasive', text: '(Only characters with Evasive can challenge this character.)' },
  { kind: 'ability' as const, heading: 'Quiet Charting', text: 'When you play this character, look at the top 2 cards of your deck. Put one on the top and the other on the bottom.' },
];

export const Documentation: Story = { render: () => <DocPage docs={[inkIdentityDoc, cardTileDoc, deckEntryDoc, cardInspectorDoc, inspectorHostDoc, cardFaceTextDoc]} /> };
export const Inks: Story = {
  parameters: { designSystem: { coverage: { InkIdentity: ['single', 'multicolour', 'compact'] } } },
  render: () => <Stack gap={3}><InkIdentity inks={['amber']} /><InkIdentity inks={['amethyst', 'emerald', 'ruby', 'sapphire', 'steel']} /><InkIdentity inks={['amber', 'steel']} compact /></Stack>,
};
export const Tiles: Story = {
  parameters: { designSystem: { coverage: { CardTile: ['owned', 'unowned', 'unknown ownership', 'loading ownership', 'unavailable ownership', 'missing image', 'long name'] } } },
  render: () => <div style={grid}>
    <CardTile printing={printing} ownership={{ state: 'owned', normal: 3, foil: 1 }} onInspect={() => {}} actions={<Button>Add to deck</Button>} />
    <CardTile printing={foilPrinting} ownership={{ state: 'unowned' }} onInspect={() => {}} />
    <CardTile printing={printing} ownership={{ state: 'unknown' }} onInspect={() => {}} />
    <CardTile printing={printing} ownership={{ state: 'loading' }} onInspect={() => {}} />
    <CardTile printing={printing} ownership={{ state: 'unavailable' }} onInspect={() => {}} />
    <CardTile printing={missingImage} ownership={{ state: 'owned', normal: 1, foil: 0 }} onInspect={() => {}} />
    <CardTile printing={brokenImage} ownership={{ state: 'owned', normal: 0, foil: 2 }} onInspect={() => {}} />
    <CardTile printing={longPrinting} ownership={{ state: 'owned', normal: 12, foil: 4 }} onInspect={() => {}} />
  </div>,
};
export const DeckEntries: Story = {
  parameters: { designSystem: { coverage: { DeckEntry: ['valid', 'illegal quantity', 'ownership limit', 'at maximum', 'long name'] } } },
  render: () => {
    const [q, setQ] = useState(2);
    return <Stack gap={0}>
      <DeckEntry name={printing.name} version={printing.version} inks={printing.inks} cost={3} quantity={q} minQuantity={0} maxQuantity={4} onQuantityChange={setQ} onInspect={() => {}} />
      <DeckEntry name="Synthetic Archivist" version="Keeper of Lost Pages" inks={['amethyst']} cost={5} quantity={4} minQuantity={0} maxQuantity={4} onQuantityChange={() => {}} legality={{ tone: 'danger', text: '5 copies exceed the Core format maximum of 4 (policy 2026-10).' }} onInspect={() => {}} />
      <DeckEntry name="Synthetic Navigator" inks={['sapphire', 'steel']} cost={2} quantity={3} minQuantity={0} maxQuantity={4} onQuantityChange={() => {}} ownership={{ tone: 'warning', text: 'You own 2 copies. This is an ownership limit, not a rules restriction.' }} onInspect={() => {}} />
      <DeckEntry name={longPrinting.name} version={longPrinting.version} inks={longPrinting.inks} cost={7} quantity={1} minQuantity={0} maxQuantity={4} onQuantityChange={() => {}} onInspect={() => {}} />
    </Stack>;
  },
};
function InspectorExample({ reading = false, effects = false, rulings = false, ownership = 'owned' as 'owned' | 'unavailable', long = false }) {
  const [readingMode, setReading] = useState(reading);
  return <div style={{ maxInlineSize: '40rem' }}><CardInspector printing={long ? longPrinting : printing} classifications={['Storyborn', 'Hero', 'Explorer']} printed={long ? [...printed, { kind: 'rules', text: longText }, { kind: 'rules', text: longText }] : printed} flavor="The coast was quiet, so she wrote it down."
    modifiers={effects ? [{ label: '+2 strength', detail: 'until the end of this turn (Synthetic Song)' }, { label: 'Exerted' }] : []}
    ownership={ownership === 'owned' ? { state: 'owned', normal: 3, foil: 1 } : { state: 'unavailable' }}
    legality={<Text>Legal in the synthetic qualification format.</Text>}
    rulings={rulings ? [{ text: 'Looking at cards does not draw them.', source: 'Comprehensive Rules 2.3', version: '2026-10-16' }] : []}
    readingMode={readingMode} onReadingModeChange={setReading} actions={<Button>Add to deck</Button>} /></div>;
}
export const Inspector: Story = {
  parameters: { designSystem: { coverage: { CardInspector: ['standard', 'with current effects', 'with rulings'] } } },
  render: () => <InspectorExample effects rulings />,
};
export const InspectorReadingMode: Story = {
  parameters: { designSystem: { coverage: { CardInspector: ['reading mode', 'ownership unavailable', 'long text'] } } },
  render: () => <InspectorExample reading ownership="unavailable" long />,
};
export const Host: Story = {
  parameters: { designSystem: { coverage: { InspectorHost: ['closed', 'open wide', 'open narrow'] } } },
  render: () => {
    const [open, setOpen] = useState(false);
    return <div style={{ display: 'flex', gap: 'var(--is-space-4)', minBlockSize: '30rem' }}>
      <div style={{ flex: 1 }}><CardTile printing={printing} ownership={{ state: 'owned', normal: 3, foil: 1 }} onInspect={() => setOpen(true)} /></div>
      <InspectorHost isOpen={open} onOpenChange={setOpen} title={printing.name}><InspectorExample /></InspectorHost>
    </div>;
  },
};
export const CardFace: Story = {
  parameters: { designSystem: { coverage: { CardFaceText: ['standard', 'densest', 'without version'] } } },
  render: () => <Inline gap={4} align="start">
    <div style={{ inlineSize: '16rem' }}><CardFaceText title="Synthetic Explorer" version="Charted the Quiet Coast" classification="Storyborn · Hero · Explorer" rules={printed} flavor="The coast was quiet, so she wrote it down." /></div>
    <div style={{ inlineSize: '16rem' }}><CardFaceText title="Synthetic Archivist" classification="Storyborn · Ally" rules={[...printed, { kind: 'rules', text: 'Additional synthetic rules text that requires the densest treatment.' }]} density="densest" /></div>
  </Inline>,
};
