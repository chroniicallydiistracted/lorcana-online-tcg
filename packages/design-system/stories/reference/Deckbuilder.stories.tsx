import type { Meta, StoryObj } from '@storybook/react-vite';
import { useMemo, useState } from 'react';
import { RouterProvider } from 'react-aria-components';
import { Button, CardImage, CardInspector, CatalogResults, DeckHeader, DeckList, DeckPanel, DeckSummary, DeckWorkspace, Dialog, ExportDialog, FilterBar, IconButton, ImportPreview,
  InlineMessage, InspectorHost, Option, RoomHeader, SaveState, Select, Stack, Tab, TabList, TabPanel, Tabs, Text, TextArea, ValidationSummary, ViewSwitch, emptyFilters, useAnnouncer } from '../../src/index.ts';
import type { CatalogFilters, DeckListEntry, Printing, SaveStateValue } from '../../src/index.ts';
import { viewSwitchDoc } from '../../src/components/ViewSwitch/ViewSwitch.docs.ts';
import { filterBarDoc } from '../../src/components/FilterBar/FilterBar.docs.ts';
import { catalogResultsDoc, catalogTileControlsDoc } from '../../src/components/Catalog/Catalog.docs.ts';
import { costCurveDoc, deckHeaderDoc, deckListDoc, deckSummaryDoc, saveStateDoc, validationSummaryDoc } from '../../src/components/Deck/Deck.docs.ts';
import { deckPanelDoc, deckWorkspaceDoc } from '../../src/components/DeckWorkspace/DeckWorkspace.docs.ts';
import { exportDialogDoc, importPreviewDoc } from '../../src/components/DeckTransfer/DeckTransfer.docs.ts';
import { DocPage } from '../support/DocPage.tsx';
import { printedBlocks } from '../support/fixtures.ts';
import { ReferenceRoom } from '../support/reference/frame.tsx';
import { allCards, card, categoryLabels, fullName, printing, setName } from '../support/reference/cards.ts';
import { filterCatalog, filterChoices, parseImport } from '../support/reference/catalog.ts';
import { copiesOf, corePolicy, deckCount, deckInks, deckSummary, exportCsv, exportText, identity, policyLabel, validateDeck } from '../support/reference/deck.ts';
import type { Deck } from '../support/reference/deck.ts';
import { invalidDeck, ownership, playerDeck, playerDeckName, workingDeck } from '../support/reference/decks.ts';

const meta = { title: 'Reference screens/Deckbuilder', parameters: { designSystem: { bleed: true } } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

type Scenario = 'empty' | 'working' | 'invalid' | 'ownership' | 'leaving' | 'conflict' | 'import' | 'export' | 'filtered-empty' | 'inspection' | 'loading' | 'long-names';
const idOf = (p: Printing) => Number.parseInt(p.id, 10);
const sampleImport = `4 Judy Hopps – Helpful Officer
4 Clawhauser - Safety Officer
3 Max Goof – Music Lover
4 Kit Cloudkicker – Unpredictable Courier
3 Kit Cloudkicker - Sure Shoot
4 Mr. Big – Distribution Magnate
2 Judy Hops – Always Vigilant
2 Shed Your Weary Load
3 Hyperia City Express`;

function DeckbuilderReference({ scenario }: { scenario: Scenario }) {
  const announce = useAnnouncer(), revision8: Deck = playerDeck;
  const start: Deck = scenario === 'empty' ? new Map() : scenario === 'invalid' ? invalidDeck : scenario === 'long-names' ? new Map([...workingDeck, [3134, 1]]) : workingDeck;
  const dirtyStart = scenario === 'leaving' || scenario === 'conflict' || scenario === 'invalid';
  const [deck, setDeck] = useState<Deck>(dirtyStart ? new Map([...start, [3283, 2]]) : start);
  // A new deck has no saved revision until its first save.
  const [saved, setSaved] = useState<{ revision: number; deck: Deck }>({ revision: scenario === 'empty' ? 0 : 7, deck: start });
  const deckName = scenario === 'empty' ? 'New deck' : playerDeckName;
  const [history, setHistory] = useState<Deck[]>([]);
  const [saving, setSaving] = useState(false), [conflict, setConflict] = useState(scenario === 'conflict'), [loadRevision, setLoadRevision] = useState(false);
  const [filters, setFilters] = useState<CatalogFilters>(scenario === 'filtered-empty' ? { ...emptyFilters, inks: ['emerald'], costs: [8], type: 'location' } : emptyFilters);
  const [view, setView] = useState<'grid' | 'list'>(scenario === 'long-names' ? 'list' : 'grid');
  const [inspected, setInspected] = useState<number | null>(scenario === 'inspection' ? 3290 : null), [reading, setReading] = useState(false);
  const [importing, setImporting] = useState(scenario === 'import'), [importText, setImportText] = useState(sampleImport), [exporting, setExporting] = useState(scenario === 'export');
  const [leaving, setLeaving] = useState<string | null>(scenario === 'leaving' ? 'iframe.html?id=reference-screens-collection-binder--partially-owned&viewMode=story' : null);
  const dirty = [...new Set([...deck.keys(), ...saved.deck.keys()])].some(id => (deck.get(id) ?? 0) !== (saved.deck.get(id) ?? 0));
  const saveState: SaveStateValue = conflict ? 'conflict' : saving ? 'saving' : dirty || saved.revision === 0 ? 'unsaved' : 'saved';
  const results = useMemo(() => filterCatalog(filters), [filters]);
  const validation = validateDeck(deck, corePolicy, scenario === 'ownership' ? ownership : undefined);
  const summary = deckSummary(deck), count = deckCount(deck);

  const edit = (next: Deck, message: string) => { setHistory(h => [...h.slice(-49), deck]); setDeck(next); announce(message); };
  const change = (id: number, delta: number) => {
    const c = card(id), next = new Map(deck), quantity = Math.max(0, (next.get(id) ?? 0) + delta);
    if (quantity) next.set(id, quantity); else next.delete(id);
    edit(next, `${delta > 0 ? 'Added' : 'Removed'} one ${fullName(c)}. ${String(copiesOf(next, c))} in deck.`);
  };
  const setQuantity = (id: number, quantity: number) => { const next = new Map(deck); if (quantity) next.set(id, quantity); else next.delete(id); edit(next, `${fullName(card(id))}: ${String(quantity)} in deck.`); };
  const undo = () => { const previous = history.at(-1); if (!previous) return; setHistory(h => h.slice(0, -1)); setDeck(previous); announce('Last change undone.'); };
  const save = (then?: () => void) => {
    if (scenario === 'conflict' && !conflict && saved.revision === 7 && dirty) { setConflict(true); return; }
    setSaving(true);
    setTimeout(() => { setSaving(false); setSaved(s => ({ revision: s.revision + 1, deck })); announce(`Saved as revision ${String(saved.revision + 1)}.`); then?.(); }, 400);
  };
  const navigate = (href: string) => { if (dirty) setLeaving(href); else location.assign(href); };

  const entries = results.map(c => ({ printing: printing(c), quantity: copiesOf(deck, c), max: corePolicy.copyLimit, summary: `Cost ${String(c.cost ?? 0)} · ${categoryLabels[c.category]}` }));
  const deckEntries: DeckListEntry[] = [...deck].filter(([, q]) => q > 0).map(([id, q]) => {
    const c = card(id), copies = copiesOf(deck, c), own = scenario === 'ownership' ? ownership.get(identity(c)) ?? 0 : undefined;
    const legality = copies > corePolicy.copyLimit ? `${String(copies)} copies; ${corePolicy.name} allows ${String(corePolicy.copyLimit)} (policy ${corePolicy.version}).`
      : c.rotation !== corePolicy.rotation ? `Not in ${corePolicy.name}; the catalog lists it for Infinity Constructed only (policy ${corePolicy.version}).`
      : deckInks(deck).length > corePolicy.inkLimit && c.inks.some(i => !deckInks(workingDeck).includes(i)) ? `Adds a third ink; ${corePolicy.name} allows ${String(corePolicy.inkLimit)} (policy ${corePolicy.version}).` : undefined;
    return { id: String(id), name: c.name, version: c.subtitle ?? undefined, inks: c.inks, cost: c.cost ?? 0, quantity: q, max: corePolicy.copyLimit,
      legality: legality ? { tone: 'danger', text: legality } : undefined,
      ownership: own !== undefined && own < copies ? { tone: 'warning', text: `You own ${String(own)}. Ownership limit, not a rules restriction.` } : undefined };
  });

  const inspectedCard = inspected === null ? null : card(inspected);
  const siblings = inspectedCard ? allCards.filter(c => identity(c) === identity(inspectedCard)) : [];
  const deckPrinting = siblings.find(c => (deck.get(c.printingId) ?? 0) > 0) ?? inspectedCard;
  const choosePrinting = (key: number) => {
    if (!inspectedCard) return;
    const copies = copiesOf(deck, inspectedCard), next = new Map(deck);
    for (const c of siblings) next.delete(c.printingId);
    if (copies) next.set(key, copies);
    edit(next, `${fullName(inspectedCard)} now uses the ${card(key).rarity === 'epic' ? 'Epic' : 'Regular'} printing; the deck still has ${String(copies)}.`);
  };

  const saveControls = <div style={{ display: 'flex', justifyContent: 'flex-end' }}><Button variant="primary" onPress={() => save()} isPending={saving} isDisabled={!dirty && !conflict}>Save deck</Button></div>;
  const catalog = <Stack gap={4}>
    <FilterBar filters={filters} onChange={setFilters} {...(scenario === 'loading' ? {} : { resultCount: results.length })} searchLabel="Search the catalog" costs={filterChoices.costs} types={filterChoices.types} rarities={filterChoices.rarities} sets={filterChoices.sets} classifications={filterChoices.classifications} />
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}><ViewSwitch label="Catalog view" value={view} onChange={setView} options={[{ id: 'grid', label: 'Grid' }, { id: 'list', label: 'List' }]} /></div>
    <CatalogResults label="Catalog results" entries={entries} view={view} loading={scenario === 'loading'}
      emptyState={<InlineMessage tone="information" title="No cards match these filters." actions={<Button onPress={() => setFilters({ ...emptyFilters, query: filters.query })}>Reset filters</Button>}>Your deck and its unsaved changes are unaffected.</InlineMessage>}
      onAdd={p => change(idOf(p), 1)} onRemove={p => { const id = idOf(p), c = card(id), held = allCards.find(x => identity(x) === identity(c) && (deck.get(x.printingId) ?? 0) > 0); change(held?.printingId ?? id, -1); }} onInspect={p => setInspected(idOf(p))} />
  </Stack>;
  const deckRegion = <DeckPanel header={<DeckHeader format={policyLabel(corePolicy)} count={count} size={corePolicy.deckSize} inks={deckInks(deck)} />} footerLabel="Validation and save"
    footer={<><ValidationSummary rules={validation.rules} ownership={validation.ownership} advice={validation.advice} policy={policyLabel(corePolicy)} />{saveControls}</>}>
    <Stack gap={4}>
      {conflict && <InlineMessage tone="warning" title="This deck was changed on another device."
        actions={<><Button variant="primary" onPress={() => { setConflict(false); setSaving(true); setTimeout(() => { setSaving(false); setSaved({ revision: 9, deck }); announce('Saved as revision 9.'); }, 400); }}>Save mine as revision 9</Button><Button onPress={() => setLoadRevision(true)}>Load revision 8</Button></>}>
        Revision 8 was saved elsewhere while you edited revision 7. Your changes are kept here until you choose.</InlineMessage>}
      <Tabs defaultSelectedKey="contents">
        <TabList aria-label="Deck"><Tab id="contents">Contents</Tab><Tab id="summary">Summary</Tab></TabList>
        <TabPanel id="contents"><DeckList entries={deckEntries} onQuantityChange={(id, q) => setQuantity(Number(id), q)} onInspect={id => setInspected(Number(id))} emptyState={<Text>Add cards from the catalog. The deck needs {corePolicy.deckSize}.</Text>} /></TabPanel>
        <TabPanel id="summary"><DeckSummary curve={{ caption: 'Cost curve', data: summary.curve }} facts={summary.facts} /></TabPanel>
      </Tabs>
    </Stack>
  </DeckPanel>;
  const summaryBar = <><span style={{ font: 'var(--is-typography-body-strong)' }}>{count} / {corePolicy.deckSize}</span><Text as="span" role="metadata" tone="supporting">{(n => n ? `Rules: ${String(n)} to resolve` : 'Rules: nothing to resolve')(validation.rules.filter(i => i.tone !== 'information').length)}</Text>{saveControls}</>;

  const inspector = <InspectorHost isOpen={inspectedCard !== null} onOpenChange={open => { if (!open) setInspected(null); }} title={inspectedCard ? fullName(inspectedCard) : ''}>{inspectedCard && <>
      <CardInspector printing={printing(inspectedCard)} classifications={inspectedCard.classifications} printed={printedBlocks(inspectedCard)} {...(inspectedCard.flavorText ? { flavor: inspectedCard.flavorText } : {})}
        viewer={<div style={{ maxInlineSize: '16rem' }}><CardImage printing={printing(inspectedCard, { detail: true })} eager /></div>}
        legality={<Text>{inspectedCard.rotation === corePolicy.rotation ? `The catalog lists this printing for Core Constructed (${policyLabel(corePolicy)}). Not certified for play here.` : 'The catalog lists this printing for Infinity Constructed only. It is not legal in Core.'}</Text>}
        readingMode={reading} onReadingModeChange={setReading}
        actions={<Stack gap={3}>
          <Text role="body-strong">{copiesOf(deck, inspectedCard)} in deck · copy limit {corePolicy.copyLimit}</Text>
          <div style={{ display: 'flex', gap: 'var(--is-space-2)', flexWrap: 'wrap' }}>
            <Button icon="minus" onPress={() => change(deckPrinting?.printingId ?? inspectedCard.printingId, -1)} isDisabled={!copiesOf(deck, inspectedCard)}>Remove one</Button>
            <Button icon="plus" variant="primary" onPress={() => change(deckPrinting?.printingId ?? inspectedCard.printingId, 1)} isDisabled={copiesOf(deck, inspectedCard) >= corePolicy.copyLimit}>Add one</Button>
          </div>
          {siblings.length > 1 && <Select label="Printing used in this deck" description="Changing the printing keeps the card and its copies." selectedKey={deckPrinting?.printingId ?? null} onSelectionChange={key => choosePrinting(Number(key))}>
            {siblings.map(c => <Option key={c.printingId} id={c.printingId}>{`${c.rarity === 'epic' ? 'Epic' : 'Regular'} · ${setName(c)} ${c.collectorNumber ?? ''}`}</Option>)}
          </Select>}
        </Stack>} />
    </>}</InspectorHost>;

  return <RouterProvider navigate={navigate}>
    <ReferenceRoom room="Deckbuilder" current="decks">
      <RoomHeader title={deckName} meta={<SaveState state={saveState} revision={saved.revision} />} demonstration
        actions={<><IconButton icon="undo" label="Undo last change" variant="secondary" onPress={undo} isDisabled={!history.length} /><Button onPress={() => setImporting(true)}>Import</Button><Button onPress={() => setExporting(true)}>Export</Button></>} />
      <DeckWorkspace catalog={catalog} deck={deckRegion} catalogLabel="Catalog" deckLabel="Deck" summaryBar={summaryBar} inspector={inspector} inspecting={inspectedCard !== null} />
    </ReferenceRoom>
    <Dialog title="Import a deck list" isOpen={importing} onOpenChange={setImporting} actions={(() => { const parsed = parseImport(importText), n = deckCount(parsed.deck); return <><Button onPress={() => setImporting(false)}>Cancel</Button><Button variant="primary" isDisabled={!n} onPress={() => { edit(parsed.deck, `Deck replaced with ${String(n)} imported cards.`); setImporting(false); }}>{`Replace deck with ${String(n)} cards`}</Button></>; })()}>
      <Stack gap={6}>
        <TextArea label="Deck list" description="One card per line: quantity, then the full name." value={importText} onChange={setImportText} />
        <ImportPreview lines={parseImport(importText).lines} />
      </Stack>
    </Dialog>
    <ExportDialog title={`Export ${deckName}`} isOpen={exporting} onOpenChange={setExporting} formats={[
      { id: 'text', label: 'Text list', description: 'Quantity and full name, one card per line.', content: exportText(deck) },
      { id: 'csv', label: 'CSV with printings', description: 'Quantity, name, set and collector number.', content: exportCsv(deck) },
    ]} />
    <Dialog role="alertdialog" title="Leave with unsaved changes?" isOpen={leaving !== null} onOpenChange={open => { if (!open) setLeaving(null); }} isDismissable={false}
      actions={<><Button onPress={() => setLeaving(null)}>Keep editing</Button><Button variant="danger" onPress={() => { const href = leaving; setLeaving(null); if (href) location.assign(href); }}>Discard changes</Button><Button variant="primary" onPress={() => { const href = leaving; save(() => { if (href) location.assign(href); }); }}>Save and leave</Button></>}>
      <Text>Your edits to {deckName} since revision {saved.revision} are not saved.</Text>
    </Dialog>
    <Dialog role="alertdialog" title="Load revision 8?" isOpen={loadRevision} onOpenChange={setLoadRevision} isDismissable={false}
      actions={<><Button onPress={() => setLoadRevision(false)}>Keep my changes</Button><Button variant="danger" onPress={() => { setDeck(revision8); setSaved({ revision: 8, deck: revision8 }); setConflict(false); setLoadRevision(false); announce('Revision 8 loaded.'); }}>Discard mine and load revision 8</Button></>}>
      <Text>Your unsaved changes will be discarded and the deck replaced by revision 8.</Text>
    </Dialog>
  </RouterProvider>;
}

export const Documentation: Story = { parameters: { designSystem: { bleed: false } }, render: () => <DocPage docs={[deckWorkspaceDoc, deckPanelDoc, filterBarDoc, viewSwitchDoc, catalogResultsDoc, catalogTileControlsDoc, deckHeaderDoc, deckListDoc, deckSummaryDoc, costCurveDoc, validationSummaryDoc, saveStateDoc, importPreviewDoc, exportDialogDoc]} /> };
export const Working: Story = {
  parameters: { designSystem: { coverage: { DeckWorkspace: ['two regions', 'single pane, catalog', 'single pane, deck'], DeckPanel: ['standard', 'long contents'], FilterBar: ['no filters', 'sheet open'], ViewSwitch: ['selected', 'hovered', 'focused'], CatalogResults: ['grid'], CatalogTileControls: ['not in deck', 'in deck', 'at copy limit'], DeckHeader: ['incomplete', 'complete'], DeckList: ['working'], DeckSummary: ['standard'], CostCurve: ['standard', 'with empty costs'], ValidationSummary: ['clear', 'advice only'], SaveState: ['saved', 'unsaved', 'saving'] } } },
  render: () => <DeckbuilderReference scenario="working" />,
};
export const Invalid: Story = { parameters: { designSystem: { coverage: { DeckList: ['with legality problems'], ValidationSummary: ['rules problems'] } } }, render: () => <DeckbuilderReference scenario="invalid" /> };
export const OwnershipLimits: Story = { parameters: { designSystem: { coverage: { DeckList: ['with ownership limits'], ValidationSummary: ['ownership limits'] } } }, render: () => <DeckbuilderReference scenario="ownership" /> };
export const UnsavedAndLeaving: Story = { render: () => <DeckbuilderReference scenario="leaving" /> };
export const SaveConflict: Story = { parameters: { designSystem: { coverage: { SaveState: ['conflict'] } } }, render: () => <DeckbuilderReference scenario="conflict" /> };
export const ImportWithUnresolvedLines: Story = { parameters: { designSystem: { coverage: { ImportPreview: ['all resolved', 'with unresolved lines'] } } }, render: () => <DeckbuilderReference scenario="import" /> };
export const Export: Story = { parameters: { designSystem: { coverage: { ExportDialog: ['format chosen', 'copied', 'copy failed'] } } }, render: () => <DeckbuilderReference scenario="export" /> };
export const FilteredEmpty: Story = { parameters: { designSystem: { coverage: { FilterBar: ['filters active', 'filtered to nothing'], CatalogResults: ['filtered empty'] } } }, render: () => <DeckbuilderReference scenario="filtered-empty" /> };
export const Inspection: Story = { parameters: { designSystem: { coverage: { DeckWorkspace: ['inspecting'] } } }, render: () => <DeckbuilderReference scenario="inspection" /> };
export const Loading: Story = { parameters: { designSystem: { coverage: { CatalogResults: ['loading'] } } }, render: () => <DeckbuilderReference scenario="loading" /> };
export const LongNames: Story = {
  globals: { locale: 'en-XA' },
  parameters: { designSystem: { coverage: { CatalogResults: ['list', 'long names'], FilterBar: ['long labels'], ViewSwitch: ['long labels'] } } },
  render: () => <DeckbuilderReference scenario="long-names" />,
};
export const EmptyDeck: Story = { parameters: { designSystem: { coverage: { DeckList: ['empty'], DeckHeader: ['no inks yet'] } } }, render: () => <DeckbuilderReference scenario="empty" /> };
