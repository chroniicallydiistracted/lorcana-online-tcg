import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { fixturePrinting, presentationCatalog } from '@lorcana/rules-data/fixtures';
import { Button, CardBack, CardFaceText, CardInspector, CardTile, DeckEntry, GameSymbol, InkIdentity, InspectorHost, Inline, Stack, Text, gameSymbolNames } from '../src/index.ts';
import { gameSymbolDoc } from '../src/components/GameSymbol/GameSymbol.docs.ts';
import { OfficialAssetsOff } from './support/OfficialAssetsOff.tsx';
import { inkIdentityDoc } from '../src/components/Ink/InkIdentity.docs.ts';
import { cardTileDoc } from '../src/components/CardTile/CardTile.docs.ts';
import { cardBackDoc } from '../src/components/CardBack/CardBack.docs.ts';
import { deckEntryDoc } from '../src/components/DeckEntry/DeckEntry.docs.ts';
import { cardInspectorDoc, inspectorHostDoc } from '../src/components/Inspector/Inspector.docs.ts';
import { cardFaceTextDoc } from '../src/components/CardFace/CardFaceText.docs.ts';
import { DocPage } from './support/DocPage.tsx';
import { allPrintings, brokenImage, elsa, foilPrinting, fullName, missingImage, printedBlocks, printing, toPrinting } from './support/fixtures.ts';

const meta = { title: 'Cards/Tiles, deck entries and inspection' } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
const grid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(11rem, 1fr))', gap: 'var(--is-space-4)' } as const;
const godmother = fixturePrinting(2381), family = fixturePrinting(719), bolt = fixturePrinting(1693), henry = fixturePrinting(3134);

export const Documentation: Story = { render: () => <DocPage docs={[inkIdentityDoc, gameSymbolDoc, cardTileDoc, cardBackDoc, deckEntryDoc, cardInspectorDoc, inspectorHostDoc, cardFaceTextDoc]} /> };
export const Inks: Story = {
  parameters: { designSystem: { coverage: { InkIdentity: ['single', 'multicolour', 'compact', 'neutral'] } } },
  render: () => <Stack gap={3}>
    <InkIdentity inks={['amber']} />
    <InkIdentity inks={['amethyst', 'emerald', 'ruby', 'sapphire', 'steel']} />
    <InkIdentity inks={['amber', 'steel']} compact />
    <div data-assets="neutral"><OfficialAssetsOff><InkIdentity inks={['amber', 'sapphire']} /></OfficialAssetsOff></div>
  </Stack>,
};
export const GameSymbols: Story = {
  parameters: { designSystem: { coverage: { GameSymbol: ['decorative', 'labelled', 'neutral'] } } },
  render: () => <Stack gap={4}>
    <Inline gap={4}>{gameSymbolNames.map(name => <Inline key={name} gap={1}><GameSymbol name={name} /><Text as="span" role="metadata">{name}</Text></Inline>)}</Inline>
    <Inline gap={4}><Inline gap={1}><GameSymbol name="strength" label="Strength" /><Text as="span" numeric>{elsa.strength}</Text></Inline><Inline gap={1}><GameSymbol name="willpower" label="Willpower" /><Text as="span" numeric>{elsa.willpower}</Text></Inline><Inline gap={1}><GameSymbol name="lore" label="Lore" /><Text as="span" numeric>{elsa.lore}</Text></Inline></Inline>
    <div data-assets="neutral"><OfficialAssetsOff><Inline gap={4}>{gameSymbolNames.map(name => <GameSymbol key={name} name={name} label={`${name} placeholder`} />)}</Inline></OfficialAssetsOff></div>
  </Stack>,
};
export const Tiles: Story = {
  parameters: { designSystem: { coverage: { CardTile: ['normal printing', 'foil printing', 'location', 'missing image', 'failed image', 'official assets off', 'long name', 'hovered', 'focused'] } } },
  render: () => <Stack gap={6}>
    <div style={grid}>
      {allPrintings.map(p => <CardTile key={p.id} printing={p} onInspect={() => {}} />)}
      <CardTile printing={foilPrinting} onInspect={() => {}} />
      <CardTile printing={missingImage} onInspect={() => {}} />
      <CardTile printing={brokenImage} onInspect={() => {}} />
    </div>
    <div data-assets="neutral" style={grid}><OfficialAssetsOff><CardTile printing={printing} onInspect={() => {}} /></OfficialAssetsOff></div>
  </Stack>,
};
export const CardBacks: Story = {
  parameters: { designSystem: { coverage: { CardBack: ['official back', 'neutral back', 'small', 'labelled'] } } },
  render: () => <Inline gap={6} align="end">
    <div style={{ inlineSize: '12rem' }}><CardBack label="Face-down card" /></div>
    <div style={{ inlineSize: '3rem' }}><CardBack /></div>
    <div data-assets="neutral" style={{ inlineSize: '12rem' }}><OfficialAssetsOff><CardBack label="Face-down card" /></OfficialAssetsOff></div>
    <div data-assets="neutral" style={{ inlineSize: '3rem' }}><OfficialAssetsOff><CardBack /></OfficialAssetsOff></div>
  </Inline>,
};
export const DeckEntries: Story = {
  parameters: { designSystem: { coverage: { DeckEntry: ['valid', 'illegal quantity', 'ownership limit', 'at maximum', 'long name'] } } },
  render: () => {
    const [q, setQ] = useState(2);
    return <Stack gap={0}>
      <DeckEntry name={elsa.name} {...(elsa.subtitle ? { version: elsa.subtitle } : {})} inks={elsa.inks} cost={elsa.cost ?? 0} quantity={q} minQuantity={0} maxQuantity={4} onQuantityChange={setQ} onInspect={() => {}} />
      <DeckEntry name={family.name} inks={family.inks} cost={family.cost ?? 0} quantity={4} minQuantity={0} maxQuantity={4} onQuantityChange={() => {}} legality={{ tone: 'danger', text: '5 copies exceed the Core format maximum of 4 (policy 2026-10).' }} onInspect={() => {}} />
      <DeckEntry name={bolt.name} {...(bolt.subtitle ? { version: bolt.subtitle } : {})} inks={bolt.inks} cost={bolt.cost ?? 0} quantity={3} minQuantity={0} maxQuantity={4} onQuantityChange={() => {}} ownership={{ tone: 'warning', text: 'You own 2 copies. This is an ownership limit, not a rules restriction.' }} onInspect={() => {}} />
      <DeckEntry name={henry.name} {...(henry.subtitle ? { version: henry.subtitle } : {})} inks={henry.inks} cost={henry.cost ?? 0} quantity={1} minQuantity={0} maxQuantity={4} onQuantityChange={() => {}} onInspect={() => {}} />
    </Stack>;
  },
};
const ruling = elsa.rulings[0];
function InspectorExample({ reading = false, effects = false, rulings = false, ownership = 'owned' as 'owned' | 'unavailable', long = false }) {
  const [readingMode, setReading] = useState(reading), card = long ? godmother : elsa;
  return <div style={{ maxInlineSize: '40rem' }}><CardInspector printing={toPrinting(card)} classifications={card.classifications} printed={printedBlocks(card)} {...(card.flavorText ? { flavor: card.flavorText } : {})}
    modifiers={effects ? [{ label: '+1 lore', detail: 'this turn (Donald Duck – Musketeer Soldier, Wait For Me!)' }, { label: 'Exerted' }, { label: "Can't ready at the start of the next turn", detail: 'Elsa – Spirit of Winter, Deep Freeze' }] : []}
    ownership={ownership === 'owned' ? { state: 'owned', normal: 3, foil: 1 } : { state: 'unavailable' }}
    legality={<Text>The catalog lists this printing for Core Constructed. Not yet certified for play here.</Text>}
    rulings={rulings && ruling ? [{ text: ruling.body, source: `Ravensburger ${ruling.title}`, version: `catalog ${presentationCatalog.source.appVersion}` }] : []}
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
    return <div style={{ display: 'flex', gap: 'var(--is-space-4)', alignItems: 'start', minBlockSize: '30rem' }}>
      <div style={{ inlineSize: '12rem', flex: 'none' }}><CardTile printing={printing} onInspect={() => setOpen(true)} /></div>
      <InspectorHost isOpen={open} onOpenChange={setOpen} title={fullName(elsa)}><InspectorExample /></InspectorHost>
    </div>;
  },
};
export const CardFace: Story = {
  parameters: { designSystem: { coverage: { CardFaceText: ['standard', 'densest', 'without version'] } } },
  render: () => <Inline gap={4} align="start">
    <div style={{ inlineSize: '16rem' }}><CardFaceText title={elsa.name} {...(elsa.subtitle ? { version: elsa.subtitle } : {})} classification={elsa.classifications.join(' · ')} rules={printedBlocks(elsa)} {...(elsa.flavorText ? { flavor: elsa.flavorText } : {})} /></div>
    <div style={{ inlineSize: '16rem' }}><CardFaceText title={godmother.name} {...(godmother.subtitle ? { version: godmother.subtitle } : {})} classification={godmother.classifications.join(' · ')} rules={printedBlocks(godmother)} density="densest" /></div>
    <div style={{ inlineSize: '16rem' }}><CardFaceText title={family.name} classification={family.classifications.join(' · ')} rules={printedBlocks(family)} /></div>
  </Inline>,
};
