import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Banner, Binder, Button, CardImage, CardInspector, Cell, Checkbox, Column, CompletionSummary, InkIdentity, InlineMessage, InspectorHost, InspectorLayout, Option, PocketGrid, RoomHeader, Row,
  SearchField, Select, Stack, Table, TableBody, TableHeader, Text, ViewSwitch } from '../../src/index.ts';
import type { PocketState, Printing } from '../../src/index.ts';
import { binderDoc, binderPocketDoc, completionSummaryDoc, pocketGridDoc } from '../../src/components/Binder/Binder.docs.ts';
import { inspectorLayoutDoc } from '../../src/components/Inspector/Inspector.docs.ts';
import { DocPage } from '../support/DocPage.tsx';
import { OfficialAssetsOff as OfficialAssetsOffRoom } from '../support/OfficialAssetsOff.tsx';
import { printedBlocks } from '../support/fixtures.ts';
import { ReferenceRoom } from '../support/reference/frame.tsx';
import { referenceStories, storyHref } from '../support/reference/links.ts';
import { card, fullName, printing, rarityLabels } from '../support/reference/cards.ts';
import { binderPages, cardByNumber, completion, filtersActive, holdings, noFilters, pageOfCard, pocket, rarities, setCards, setTitle } from '../support/reference/binder.ts';
import type { CollectionFilters, Holdings } from '../support/reference/binder.ts';

const meta = { title: 'Reference screens/Collection binder', parameters: { designSystem: { bleed: true } } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const otherSets = [{ id: 'set13', label: 'Attack of the Vine! · Set 13' }, { id: 'set12', label: 'Wilds Unknown · Set 12' }, { id: 'set11', label: 'Winterspell · Set 11' }];
const inkChoices = [['amber', 'Amber'], ['amethyst', 'Amethyst'], ['emerald', 'Emerald'], ['ruby', 'Ruby'], ['sapphire', 'Sapphire'], ['steel', 'Steel']] as const;

interface Options { holdings?: Holdings; page?: number; filters?: CollectionFilters; view?: 'binder' | 'grid' | 'list'; inspected?: number; singleFace?: boolean; goTo?: string }
function CollectionReference({ holdings: mode = 'partial', page: startPage = 1, filters: startFilters = noFilters, view: startView = 'binder', inspected: startInspected, singleFace = false }: Options) {
  const [page, setPage] = useState(startPage), [filters, setFilters] = useState(startFilters), [view, setView] = useState(startView);
  const [inspected, setInspected] = useState<number | null>(startInspected ?? null), [reading, setReading] = useState(false), [set, setSet] = useState('set14');
  const pages = binderPages(mode, filters), figures = completion(mode), inspectedCard = inspected === null ? null : card(inspected);
  const set_ = (patch: Partial<CollectionFilters>) => setFilters(f => ({ ...f, ...patch }));
  const onInspect = (p: Printing) => setInspected(Number.parseInt(p.id, 10));
  const visible = setCards.filter(c => pocket(c, mode, filters).kind !== 'filtered');
  const held = inspectedCard && mode === 'partial' ? holdings.get(inspectedCard.printingId) : undefined;

  const inspector = <InspectorHost isOpen={inspectedCard !== null} onOpenChange={open => { if (!open) setInspected(null); }} title={inspectedCard ? fullName(inspectedCard) : ''}>
    {inspectedCard && <CardInspector printing={printing(inspectedCard)} classifications={inspectedCard.classifications} printed={printedBlocks(inspectedCard)} {...(inspectedCard.flavorText ? { flavor: inspectedCard.flavorText } : {})}
      viewer={<div style={{ maxInlineSize: '16rem' }}><CardImage printing={printing(inspectedCard, { detail: true })} eager /></div>}
      ownership={mode === 'unavailable' ? { state: 'unavailable' } : held ? { state: 'owned', normal: held.normal, foil: held.foil } : { state: 'unowned' }}
      readingMode={reading} onReadingModeChange={setReading} />}
  </InspectorHost>;

  const content = set !== 'set14'
    ? <InlineMessage tone="information" title="This demonstration has the full card list for Hyperia City only." actions={<Button onPress={() => setSet('set14')}>Show Hyperia City</Button>}>Other sets need their catalog records in the reference fixture before their binders can be shown.</InlineMessage>
    : view === 'binder'
      ? <Binder label="Hyperia City binder" pages={pages} page={page} onPageChange={setPage} onInspect={onInspect} findCard={pageOfCard} singleFace={singleFace || inspectedCard !== null} />
      : view === 'grid'
        ? <PocketGrid label="Hyperia City printings" pockets={visible.map(c => pocket(c, mode, filters))} onInspect={onInspect} emptyState={<InlineMessage tone="information" title="No printings match these filters." actions={<Button onPress={() => setFilters(noFilters)}>Reset filters</Button>}>Completion figures are unchanged.</InlineMessage>} />
        : <Table aria-label="Hyperia City printings">
          <TableHeader><Column isRowHeader>Number</Column><Column>Name</Column><Column>Rarity</Column><Column>Ink</Column><Column numeric>Normal</Column><Column numeric>Foil</Column></TableHeader>
          <TableBody emptyState={<Text>No printings match these filters.</Text>}>{visible.map(c => {
            const p: PocketState = pocket(c, mode, filters), quantity = (k: 'normal' | 'foil') => p.kind === 'owned' ? String(p[k]) : p.kind === 'missing' ? '0' : p.kind === 'loading' ? '' : 'Unavailable';
            return <Row key={c.printingId} id={c.printingId} onAction={() => setInspected(c.printingId)}>
              <Cell numeric>{c.collectorNumber?.split('/')[0]}</Cell><Cell>{fullName(c)}</Cell><Cell>{c.rarity ? rarityLabels[c.rarity] : ''}</Cell><Cell><InkIdentity inks={c.inks} compact /></Cell><Cell numeric>{quantity('normal')}</Cell><Cell numeric>{quantity('foil')}</Cell>
            </Row>;
          })}</TableBody>
        </Table>;

  return <ReferenceRoom room="Collection" current="collection">
    <Stack gap={6}>
      <RoomHeader title="Collection" meta={setTitle} demonstration actions={<>
        <div style={{ minInlineSize: '16rem' }}><Select label="Set" selectedKey={set} onSelectionChange={key => setSet(String(key))}><Option id="set14">{setTitle}</Option>{otherSets.map(s => <Option key={s.id} id={s.id}>{s.label}</Option>)}</Select></div>
        <Button variant="primary" onPress={() => location.assign(storyHref(referenceStories.packs))}>Open packs</Button>
      </>} />
      {mode === 'new' && <Banner tone="information" title="You don't own any Hyperia City printings yet." actions={<Button onPress={() => location.assign(storyHref(referenceStories.packs))}>Open your first pack</Button>}>Every pocket shows the printing it is waiting for. Opening a pack fills them.</Banner>}
      {mode === 'unavailable' && <Banner tone="warning" title="Ownership is unavailable right now." actions={<Button icon="refresh">Retry</Button>}>Cards are shown from the catalog; your quantities are not loaded, so none is shown as zero.</Banner>}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--is-space-3)', alignItems: 'flex-end' }}>
        <div style={{ flex: '1 1 14rem' }}><SearchField label="Search this set" value={filters.query} onChange={query => set_({ query })} resultCount={visible.length} /></div>
        <div style={{ flex: '0 1 10rem' }}><Select label="Ownership" selectedKey={filters.ownership} onSelectionChange={key => set_({ ownership: key as CollectionFilters['ownership'] })}><Option id="any">Any</Option><Option id="owned">Owned</Option><Option id="missing">Missing</Option></Select></div>
        <div style={{ flex: '0 1 10rem' }}><Select label="Ink" selectedKey={filters.ink} onSelectionChange={key => set_({ ink: key as CollectionFilters['ink'] })}><Option id="any">Any</Option>{inkChoices.map(([id, label]) => <Option key={id} id={id}>{label}</Option>)}</Select></div>
        <div style={{ flex: '0 1 10rem' }}><Select label="Rarity" selectedKey={filters.rarity} onSelectionChange={key => set_({ rarity: String(key) })}><Option id="any">Any</Option>{rarities.map(r => <Option key={r} id={r}>{r}</Option>)}</Select></div>
        <Checkbox isSelected={filters.foilsOnly} onChange={foilsOnly => set_({ foilsOnly })}>Owned foils only</Checkbox>
        {filtersActive(filters) && <Button variant="quiet" onPress={() => setFilters(noFilters)}>Reset filters</Button>}
        <div style={{ marginInlineStart: 'auto' }}><ViewSwitch label="Collection view" value={view} onChange={setView} options={[{ id: 'binder', label: 'Binder' }, { id: 'grid', label: 'Grid' }, { id: 'list', label: 'List' }]} /></div>
      </div>
      <CompletionSummary set="Hyperia City" standard={figures.standard} special={figures.special} foils={figures.foils} />
      <InspectorLayout inspector={inspector} inspecting={inspectedCard !== null}>{content}</InspectorLayout>
    </Stack>
  </ReferenceRoom>;
}

export const Documentation: Story = { parameters: { designSystem: { bleed: false } }, render: () => <DocPage docs={[binderDoc, binderPocketDoc, pocketGridDoc, completionSummaryDoc, inspectorLayoutDoc]} /> };
/** Takes a page argument so "View in Collection" links from pack opening land on the card's page. */
export const PartiallyOwned: StoryObj<{ page: number }> = {
  args: { page: 1 },
  parameters: { designSystem: { coverage: { Binder: ['two faces', 'first page'], BinderPocket: ['owned', 'owned foil', 'missing', 'padding'], CompletionSummary: ['partial'], InspectorLayout: ['closed'] } } },
  render: ({ page }) => <CollectionReference page={page} />,
};
export const NewPlayer: Story = { parameters: { designSystem: { coverage: { CompletionSummary: ['none owned'] } } }, render: () => <CollectionReference holdings="new" /> };
export const OwnershipUnavailable: Story = { parameters: { designSystem: { coverage: { BinderPocket: ['unavailable'], CompletionSummary: ['unavailable'] } } }, render: () => <CollectionReference holdings="unavailable" /> };
export const Loading: Story = { parameters: { designSystem: { coverage: { BinderPocket: ['loading'] } } }, render: () => <CollectionReference holdings="loading" /> };
export const FilteredOwnedOnly: Story = { parameters: { designSystem: { coverage: { BinderPocket: ['filtered'] } } }, render: () => <CollectionReference filters={{ ...noFilters, ownership: 'owned' }} /> };
export const PrintingNavigation: Story = { parameters: { designSystem: { coverage: { Binder: ['anchored to a printing', 'card number not found'] } } }, render: () => <CollectionReference page={pageOfCard('142') ?? 1} /> };
export const SingleFace: Story = { parameters: { designSystem: { coverage: { Binder: ['single face'] } } }, render: () => <CollectionReference page={17} singleFace /> };
export const GridView: Story = { parameters: { designSystem: { coverage: { PocketGrid: ['standard', 'filtered empty'] } } }, render: () => <CollectionReference view="grid" /> };
export const ListView: Story = { render: () => <CollectionReference view="list" /> };
export const ReducedMotion: Story = { globals: { motion: 'reduced' }, parameters: { designSystem: { coverage: { Binder: ['reduced motion'] } } }, render: () => <CollectionReference page={3} /> };
export const Inspection: Story = { parameters: { designSystem: { coverage: { InspectorLayout: ['inspecting'] } } }, render: () => <CollectionReference page={17} inspected={cardByNumber(142).printingId} /> };
export const TakedownFallback: Story = { globals: {}, parameters: { designSystem: { coverage: { BinderPocket: ['official assets off'] } } }, render: () => <TakedownCollection /> };
function TakedownCollection() {
  return <OfficialAssetsOffRoom><CollectionReference /></OfficialAssetsOffRoom>;
}
export const UnknownOwnership: Story = { parameters: { designSystem: { coverage: { BinderPocket: ['unknown'] } } }, render: () => <UnknownPockets /> };
function UnknownPockets() {
  const c = setCards[0]!;
  return <div style={{ padding: 'var(--is-space-6)', maxInlineSize: '30rem' }}><PocketGrid label="Ownership unknown" pockets={[{ kind: 'unknown', printing: printing(c) }, { kind: 'unknown', printing: printing(setCards[1]!) }]} onInspect={() => {}} emptyState={null} /></div>;
}
