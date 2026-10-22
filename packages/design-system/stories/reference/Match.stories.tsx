import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { ActionChoice, ActionPanel, Battlefield, BoardCard, Button, CardImage, CardInspector, Confirmation, ConnectionStatus, Counter, DemonstrationLabel, Dialog, EventLog, FanContentNotice, HandFan, HandList,
  Menu, MenuItem, MenuTrigger, IconButton, MatchChrome, MatchLayout, NotificationCount, PlayerSummary, ProgressBar, Stack, Switch, Tab, TabList, TabPanel, Tabs, Text, TurnContext, ViewSwitch, ZoneCount, useAnnouncer, useAtLeast } from '../../src/index.ts';
import type { ConnectionState } from '../../src/index.ts';
import { actionChoiceDoc, actionPanelDoc, battlefieldDoc, boardCardDoc, counterDoc, eventLogDoc, handFanDoc, handListDoc, matchChromeDoc, matchLayoutDoc, playerSummaryDoc, turnContextDoc, zoneCountDoc } from '../../src/components/Match/Match.docs.ts';
import { DocPage } from '../support/DocPage.tsx';
import { OfficialAssetsOff } from '../support/OfficialAssetsOff.tsx';
import { printedBlocks } from '../support/fixtures.ts';
import { card, categoryLabels, fullName, printing } from '../support/reference/cards.ts';
import { players } from '../support/reference/frame.tsx';
import { crowdedMatch, objectCard, objectName } from '../support/reference/match.ts';
import type { BoardObject, MatchPosition } from '../support/reference/match.ts';
import { actionsFor, challengeTargets, questers, songName, songPayments } from '../support/reference/commands.ts';
import type { Choice } from '../support/reference/commands.ts';

const meta = { title: 'Reference screens/Crowded match', parameters: { designSystem: { bleed: true } } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

type Stage =
  | { kind: 'idle' } | { kind: 'selected'; id: string } | { kind: 'targets'; id: string } | { kind: 'hand'; id: number }
  | { kind: 'song'; id: number } | { kind: 'song-target'; id: number; payment: string } | { kind: 'choose-one' } | { kind: 'damage-target' }
  | { kind: 'pending'; intent: string; then: () => void } | { kind: 'rejected' } | { kind: 'opponent' } | { kind: 'reconnecting' };
interface Options { stage?: Stage; position?: MatchPosition; review?: 'quest' | 'end'; hand?: 'fan' | 'list'; connection?: ConnectionState; select?: string }

function MatchReference({ stage: start = { kind: 'idle' }, position: startPosition = crowdedMatch, review: startReview, hand: startHand = 'fan', connection: startConnection = 'connected', select }: Options) {
  const announce = useAnnouncer(), expanded = useAtLeast('expanded'), wide = useAtLeast('wide');
  const [position, setPosition] = useState(startPosition), [stage, setStage] = useState<Stage>(start), [review, setReview] = useState<'quest' | 'end' | undefined>(startReview);
  const [handView, setHandView] = useState(startHand), [inspected, setInspected] = useState<number | null>(null), [tab, setTab] = useState<string>('log'), [reading, setReading] = useState(false);
  const [connection, setConnection] = useState<ConnectionState>(startConnection), [confirmQuest, setConfirmQuest] = useState(true), [confirmEnd, setConfirmEnd] = useState(true);
  const [dialog, setDialog] = useState<'settings' | 'notice' | 'concede' | 'log' | 'discard' | null>(null);
  const selectedId = stage.kind === 'selected' || stage.kind === 'targets' ? stage.id : select;
  const pending = stage.kind === 'pending' || stage.kind === 'reconnecting', yourTurn = stage.kind !== 'opponent', p = position.player, o = position.opponent;
  const update = (fn: (m: MatchPosition) => MatchPosition) => setPosition(fn);
  const patch = (id: string, change: Partial<BoardObject>) => update(m => ({ ...m, objects: m.objects.map(x => x.id === id ? { ...x, ...change } : x) }));
  const submit = (intent: string, then: () => void) => { setStage({ kind: 'pending', intent, then }); setTimeout(() => then(), 900); };
  const inspect = (printingId: number) => { setInspected(printingId); setTab('inspector'); };
  const object = (id: string) => position.objects.find(x => x.id === id)!;
  // Escape steps back one stage before submission and never implies cancelling a submitted command (§14, §20).
  useEffect(() => {
    const back: Partial<Record<Stage['kind'], () => Stage>> = {
      selected: () => ({ kind: 'idle' }), hand: () => ({ kind: 'idle' }),
      targets: () => stage.kind === 'targets' ? { kind: 'selected', id: stage.id } : { kind: 'idle' },
      song: () => stage.kind === 'song' ? { kind: 'hand', id: stage.id } : { kind: 'idle' },
      'song-target': () => stage.kind === 'song-target' ? { kind: 'song', id: stage.id } : { kind: 'idle' },
      'damage-target': () => ({ kind: 'choose-one' }),
    };
    const onKey = (event: KeyboardEvent) => { if (event.key !== 'Escape' || dialog || review || document.querySelector('[role="dialog"], [role="alertdialog"], [role="menu"]')) return; const to = back[stage.kind]; if (to) { event.preventDefault(); setStage(to()); } };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [stage, dialog, review]);

  const questWith = (id: string) => {
    const x = object(id), lore = objectCard(x).lore ?? 0;
    submit(`Quest with ${objectName(x)}`, () => {
      patch(id, { exerted: true });
      update(m => ({ ...m, player: { ...m.player, lore: m.player.lore + lore }, log: [...m.log, { turn: m.turn, actor: 'player', text: `Rowan quested with ${objectName(x)}: +${String(lore)} lore (${String(m.player.lore + lore)}).` }] }));
      announce(`${objectName(x)} quested: +${String(lore)} lore. You have ${String(p.lore + lore)}.`);
      if (x.printingId === 3457) { setStage({ kind: 'choose-one' }); announce('Aerial Acrobatics: choose one.'); } else setStage({ kind: 'idle' });
    });
  };
  const onBoard = (x: BoardObject) => {
    if (pending || !yourTurn) { inspect(x.printingId); return; }
    if (stage.kind === 'targets') {
      const target = challengeTargets(position, object(stage.id)).find(t => t.id === x.id);
      if (target && !target.unavailable) challenge(stage.id, x.id); else inspect(x.printingId);
      return;
    }
    if (stage.kind === 'damage-target') { damage(x.id); return; }
    setStage({ kind: 'selected', id: x.id });
  };
  const challenge = (attackerId: string, targetId: string) => submit(`Challenge ${objectName(object(targetId))} with ${objectName(object(attackerId))}`, () => { setStage({ kind: 'rejected' }); announce('Your challenge was not accepted. The position changed; nothing was spent.', 'polite'); });
  const damage = (targetId: string) => submit(`Deal 1 damage to ${objectName(object(targetId))}`, () => { patch(targetId, { damage: object(targetId).damage + 1 }); setStage({ kind: 'idle' }); announce(`${objectName(object(targetId))} took 1 damage.`); });

  const card_ = (x: BoardObject, size: 'character' | 'item' | 'location') => {
    const c = objectCard(x), location = x.at ? position.objects.find(l => l.id === x.at) : undefined;
    const target = stage.kind === 'targets' && challengeTargets(position, object(stage.id)).some(t => t.id === x.id && !t.unavailable);
    return <BoardCard key={x.id} printing={printing(c)} kind={size} exerted={x.exerted} damage={x.damage} drying={x.drying}
      {...(x.under.length ? { stack: { count: x.under.length + 1, on: fullName(card(x.under[0]!)) } } : {})} {...(location ? { at: objectCard(location).name } : {})}
      modifiers={x.modifiers.map(m => m.label)} highlight={selectedId === x.id ? 'selected' : target ? 'target' : 'none'}
      facts={c.category === 'character' ? `Strength ${String(c.strength ?? 0)}, willpower ${String(c.willpower ?? 0)}, lore ${String(c.lore ?? 0)}.` : c.category === 'location' ? `Willpower ${String(c.willpower ?? 0)}, lore ${String(c.lore ?? 0)}, move cost ${String(c.moveCost ?? 0)}.` : ''}
      onPress={() => onBoard(x)} />;
  };
  const side = (s: 'player' | 'opponent', label: string) => {
    const mine = position.objects.filter(x => x.side === s);
    return {
      label,
      locations: mine.filter(x => x.zone === 'location').map(l => ({ label: `${objectCard(l).name} and the characters here`, card: card_(l, 'location'), residents: mine.filter(x => x.at === l.id).map(x => card_(x, 'character')) })),
      characters: mine.filter(x => x.zone === 'character' && !x.at).map(x => card_(x, 'character')),
      items: mine.filter(x => x.zone === 'item').map(x => card_(x, 'item')),
    };
  };

  const decision: ReactNode = (() => {
    const choices = (list: readonly Choice[], onChoose: (c: Choice) => void) => list.map(c => <ActionChoice key={c.id} label={c.label} {...(c.detail ? { detail: c.detail } : {})} {...(c.unavailable ? { unavailable: c.unavailable } : {})} onPress={() => onChoose(c)} />);
    const back = <Button onPress={() => setStage({ kind: 'idle' })}>Back</Button>;
    switch (stage.kind) {
      case 'idle': return <ActionPanel prompt="Your main phase. Choose a card to act with." context={`${String(questers(position).length)} characters can quest · ${String(p.readyInk)} ink ready · ${String(p.inkDrops)} ink drop`} />;
      case 'selected': { const x = object(stage.id); return <ActionPanel state="choosing" prompt={objectName(x)} context={x.side === 'player' ? 'Choose what it does.' : `${o.name}'s card.`} footer={back}>
        {choices(actionsFor(position, x), c => c.id === 'quest' ? questWith(x.id) : c.id === 'challenge' ? setStage({ kind: 'targets', id: x.id }) : c.id === 'inspect' ? inspect(x.printingId) : c.id === 'use' ? submit('Use Easy Commute', () => { patch(x.id, { exerted: true }); setStage({ kind: 'idle' }); announce('Hyperia City Express exerted.'); }) : undefined)}
      </ActionPanel>; }
      case 'targets': return <ActionPanel state="choosing" prompt="Choose what to challenge" context={`${objectName(object(stage.id))} challenges. Valid targets are marked on the board.`} footer={<Button onPress={() => setStage({ kind: 'selected', id: stage.id })}>Back</Button>}>
        {choices(challengeTargets(position, object(stage.id)), c => challenge(stage.id, c.id))}
      </ActionPanel>;
      case 'hand': { const c = card(stage.id), song = c.classifications.includes('Song'); return <ActionPanel state="choosing" prompt={fullName(c)} context={`Cost ${String(c.cost ?? 0)} · ${categoryLabels[c.category]}${song ? ' · Song' : ''}`} footer={back}>
        {choices([
          { id: 'play', label: song ? 'Play this song' : 'Play', detail: song ? 'Choose to pay ink or have a character sing it.' : `Pay ${String(c.cost ?? 0)} ink.`, ...(!song && (c.cost ?? 0) > p.readyInk ? { unavailable: `Costs ${String(c.cost ?? 0)}; ${String(p.readyInk)} ink ready.` } : {}) },
          { id: 'ink', label: 'Put into your inkwell', ...(c.inkable ? { unavailable: 'You already put a card into your inkwell this turn.' } : { unavailable: 'This card has no inkwell symbol.' }) },
          { id: 'inspect', label: 'Inspect', detail: 'Read the card.' },
        ], choice => choice.id === 'play' && song ? setStage({ kind: 'song', id: stage.id }) : choice.id === 'inspect' ? inspect(stage.id) : choice.id === 'play' ? submit(`Play ${fullName(c)}`, () => { setStage({ kind: 'idle' }); announce(`${fullName(c)} played.`); }) : undefined)}
      </ActionPanel>; }
      case 'song': return <ActionPanel state="choosing" prompt={`${songName(stage.id)}: choose how to pay`} context="A character with cost 5 or more, or Singer 5, can exert to sing it for free." footer={<Button onPress={() => setStage({ kind: 'hand', id: stage.id })}>Back</Button>}>
        {choices(songPayments(position, stage.id), c => setStage({ kind: 'song-target', id: stage.id, payment: c.label }))}
      </ActionPanel>;
      case 'song-target': return <ActionPanel state="choosing" prompt="Choose an opponent" context={`${stage.payment}. Chosen opponent reveals their hand and discards each non-character card revealed this way.`} footer={<Button onPress={() => setStage({ kind: 'song', id: stage.id })}>Back</Button>}>
        {choices([{ id: 'opponent', label: o.name, detail: `${String(o.hand)} cards in hand.` }], () => submit(`Play ${songName(stage.id)} (${stage.payment.toLowerCase()})`, () => { setStage({ kind: 'idle' }); announce(`${songName(stage.id)} resolved. ${o.name} revealed their hand.`); }))}
      </ActionPanel>;
      case 'choose-one': return <ActionPanel state="choosing" prompt="Aerial Acrobatics: choose one" context="Kit Cloudkicker – Sure Shot quested. This choice is required.">
        {choices([{ id: 'drop', label: 'Get 1 ink drop', detail: 'You may remove an ink drop to pay 1 ink.' }, { id: 'damage', label: 'Deal 1 damage to chosen character' }], c => c.id === 'drop' ? submit('Get 1 ink drop', () => { update(m => ({ ...m, player: { ...m.player, inkDrops: m.player.inkDrops + 1 } })); setStage({ kind: 'idle' }); announce('You got 1 ink drop.'); }) : setStage({ kind: 'damage-target' }))}
      </ActionPanel>;
      case 'damage-target': return <ActionPanel state="choosing" prompt="Choose a character to deal 1 damage to" context="Ward: opponents can't choose that character except to challenge." footer={<Button onPress={() => setStage({ kind: 'choose-one' })}>Back</Button>}>
        {choices(position.objects.filter(x => x.zone === 'character').map(x => ({ id: x.id, label: objectName(x), detail: x.side === 'player' ? 'Your character.' : `${o.name}'s character.`, ...(x.side === 'opponent' && /<Ward>/.test(objectCard(x).rulesText) ? { unavailable: `Ward: you can't choose ${objectCard(x).name} except to challenge.` } : {}) })), c => damage(c.id))}
      </ActionPanel>;
      case 'pending': return <ActionPanel state="pending" prompt="Waiting for the server" context={stage.intent}><li><ProgressBar label="Confirming your command" /></li><li><Text role="metadata" tone="supporting">Other actions wait until this result arrives. Escape does not cancel a submitted command.</Text></li></ActionPanel>;
      case 'rejected': return <ActionPanel state="rejected" prompt="Your challenge was not accepted" context="The position changed before your command arrived: Wasabi – Future Thinker is no longer exerted. Nothing was spent." footer={<Button variant="primary" onPress={() => setStage({ kind: 'idle' })}>Review the board</Button>} />;
      case 'opponent': return <ActionPanel state="waiting" prompt={`${o.name} is taking their turn`} context="Their accepted actions appear in the log. Notifications wait in the quiet count." />;
      case 'reconnecting': return <ActionPanel state="pending" prompt="Checking your last command" context="Quest with Kit Cloudkicker – Sure Shot. The connection dropped after you submitted it; the server's record decides the result, and it will not be sent twice." footer={<Button onPress={() => { setConnection('connected'); questWith('p-kit'); }}>Retry connection</Button>} />;
    }
  })();

  const inspectedCard = inspected === null ? null : card(inspected), inspectedObject = position.objects.find(x => x.printingId === inspected);
  const inspector = inspectedCard ? <CardInspector headingLevel={3} printing={printing(inspectedCard)} classifications={inspectedCard.classifications} printed={printedBlocks(inspectedCard)} {...(inspectedCard.flavorText ? { flavor: inspectedCard.flavorText } : {})}
    viewer={<div style={{ maxInlineSize: '12rem' }}><CardImage printing={printing(inspectedCard, { detail: true })} eager /></div>}
    modifiers={inspectedObject?.modifiers.map(m => ({ label: m.label, detail: m.source })) ?? []} readingMode={reading} onReadingModeChange={setReading} /> : <Text tone="supporting">Choose Inspect, or a card while waiting, to read it here.</Text>;
  const log = <EventLog label="Match log" entries={position.log.map((e, i) => ({ id: String(i), turn: e.turn, actor: e.actor === 'player' ? p.name : o.name, text: e.text }))} />;
  const handCards = position.hand.map(id => { const c = card(id); return { id: String(id), printing: printing(c), summary: `Cost ${String(c.cost ?? 0)} · ${categoryLabels[c.category]}${c.classifications.includes('Song') ? ' · Song' : ''}`, ...(pending ? { unplayable: 'Waiting for the server to confirm your last command.' } : {}) }; });
  const onHand = (id: string) => { if (pending || !yourTurn) { inspect(Number(id)); return; } setStage({ kind: 'hand', id: Number(id) }); };

  return <>
    <MatchLayout
      chrome={<MatchChrome notice={<DemonstrationLabel />}
        opponent={<PlayerSummary name={o.name} active={yourTurn ? undefined : 'Their turn'}><Counter label="Lore" value={o.lore} max={position.loreToWin} symbol="lore" /><Counter label="Ink" value={o.readyInk} max={o.ink} detail="ready" /><Counter label="Ink drops" value={o.inkDrops} /><ZoneCount label="Hand" count={o.hand} /><ZoneCount label="Deck" count={o.deck} /><ZoneCount label="Discard" count={o.discard.length} onOpen={() => setDialog('discard')} /></PlayerSummary>}
        status={<><ConnectionStatus state={connection} compact />{!expanded && wide && <Button onPress={() => setDialog('log')}>Log</Button>}<NotificationCount count={2} onPress={() => {}} /></>}
        menu={<MenuTrigger><IconButton icon="more" label="Match menu" /><Menu onAction={key => setDialog(key as 'settings' | 'notice' | 'concede')}><MenuItem id="settings">Settings</MenuItem><MenuItem id="notice">Fan content notice</MenuItem><MenuItem id="concede" tone="danger">Concede</MenuItem></Menu></MenuTrigger>} />}
      battlefield={<Battlefield labels={{ characters: 'Characters', items: 'Items' }} opponent={side('opponent', `${o.name}'s side`)} player={side('player', 'Your side')} />}
      side={<>
        <TurnContext>{yourTurn ? `Your turn · Turn ${String(position.turn)} · ${position.phase}` : `${o.name}'s turn · Turn ${String(position.turn + 1)}`}</TurnContext>
        {decision}
        {wide && <Tabs selectedKey={expanded ? tab : 'inspector'} onSelectionChange={key => setTab(String(key))}>
          <TabList aria-label="Match information">{expanded && <Tab id="log">Log</Tab>}<Tab id="inspector">Inspector</Tab></TabList>
          {expanded && <TabPanel id="log">{log}</TabPanel>}
          <TabPanel id="inspector">{inspector}</TabPanel>
        </Tabs>}
      </>}
      bottom={<>
        <PlayerSummary name={p.name} active={yourTurn ? 'Your turn' : undefined}><Counter label="Lore" value={p.lore} max={position.loreToWin} symbol="lore" /><Counter label="Ink" value={p.readyInk} max={p.ink} detail="ready" /><Counter label="Ink drops" value={p.inkDrops} /><ZoneCount label="Deck" count={p.deck} /><ZoneCount label="Discard" count={p.discard.length} onOpen={() => setDialog('discard')} /></PlayerSummary>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 'var(--is-space-4)', flexWrap: 'wrap', justifyContent: 'center' }}>
          <ViewSwitch label="Hand view" value={handView} onChange={setHandView} options={[{ id: 'fan', label: 'Fan' }, { id: 'list', label: 'List' }]} />
          {handView === 'fan' ? <HandFan label={`Your hand, ${String(handCards.length)} cards`} cards={handCards} selected={stage.kind === 'hand' || stage.kind === 'song' ? String(stage.id) : undefined} onSelect={onHand} />
            : <HandList label={`Your hand, ${String(handCards.length)} cards`} cards={handCards} selected={stage.kind === 'hand' || stage.kind === 'song' ? String(stage.id) : undefined} onSelect={onHand} />}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--is-space-2)', justifyContent: 'flex-end' }}>
          <Button onPress={() => confirmQuest ? setReview('quest') : questers(position).forEach(x => questWith(x.id))} isDisabled={pending || !yourTurn || !questers(position).length}>Quest with all characters</Button>
          <Button variant="primary" onPress={() => confirmEnd ? setReview('end') : setStage({ kind: 'opponent' })} isDisabled={pending || !yourTurn}>End turn</Button>
        </div>
      </>} />
    <Confirmation isOpen={review === 'quest'} onOpenChange={open => { if (!open) setReview(undefined); }} title="Quest with all characters?" confirmLabel="Quest with all characters" cancelLabel="Keep choosing"
      consequence="Each character below quests in order. Effects may change the final lore; Aerial Acrobatics will ask you to choose."
      context={<ul style={{ margin: 0, paddingInlineStart: 'var(--is-space-6)' }}>{questers(position).map(x => <li key={x.id}><Text as="span">{`${objectName(x)}: ${String(objectCard(x).lore ?? 0)} lore`}</Text></li>)}</ul>}
      onConfirm={() => submit('Quest with all characters', () => { for (const x of questers(position)) patch(x.id, { exerted: true }); update(m => ({ ...m, player: { ...m.player, lore: m.player.lore + questers(position).reduce((n, x) => n + (objectCard(x).lore ?? 0), 0) } })); setStage({ kind: 'choose-one' }); announce('Your characters quested. Aerial Acrobatics: choose one.'); })} />
    <Confirmation isOpen={review === 'end'} onOpenChange={open => { if (!open) setReview(undefined); }} title="End your turn?" confirmLabel="End turn" cancelLabel="Keep playing"
      consequence={`You still have ${String(p.readyInk)} ready ink, ${String(p.inkDrops)} ink drop and ${String(questers(position).length)} characters that can quest. Taking them is optional.`}
      onConfirm={() => submit('End turn', () => { setStage({ kind: 'opponent' }); announce(`${o.name}'s turn.`); })} />
    <Dialog title="Settings" isOpen={dialog === 'settings'} onOpenChange={open => { if (!open) setDialog(null); }}>
      <Stack gap={4}><Switch isSelected={confirmQuest} onChange={setConfirmQuest}>Confirm before questing with all characters</Switch><Switch isSelected={confirmEnd} onChange={setConfirmEnd}>Confirm before ending turn</Switch></Stack>
    </Dialog>
    <Dialog title="Fan content notice" isOpen={dialog === 'notice'} onOpenChange={open => { if (!open) setDialog(null); }}><FanContentNotice /></Dialog>
    <Confirmation isOpen={dialog === 'concede'} onOpenChange={open => { if (!open) setDialog(null); }} title="Concede this match?" consequence={`${o.name} wins and the match ends. This can't be undone.`} confirmLabel="Concede" cancelLabel="Keep playing" tone="danger" onConfirm={() => announce('You conceded. The match is over.', 'assertive')} />
    <Dialog title="Match log" presentation="sheet" isOpen={dialog === 'log'} onOpenChange={open => { if (!open) setDialog(null); }}>{log}</Dialog>
    <Dialog title="Discard piles" isOpen={dialog === 'discard'} onOpenChange={open => { if (!open) setDialog(null); }}>
      <Stack gap={4}>{([['Your discard', p.discard], [`${o.name}'s discard`, o.discard]] as const).map(([title, ids]) => <Stack key={title} gap={2} as="section"><Text role="body-strong">{title}</Text><ul style={{ margin: 0, paddingInlineStart: 'var(--is-space-6)' }}>{ids.map(id => <li key={id}><Text as="span">{fullName(card(id))}</Text></li>)}</ul></Stack>)}</Stack>
    </Dialog>
    {!wide && <Dialog title={inspectedCard ? fullName(inspectedCard) : 'Inspector'} presentation="sheet" isOpen={inspected !== null} onOpenChange={open => { if (!open) setInspected(null); }}>{inspector}</Dialog>}
  </>;
}

const largeHand: MatchPosition = { ...crowdedMatch, hand: [3292, 3268, 3289, 3436, 3449, 3283, 3269, 3290, 3271, 3454, 3466, 3297], player: { ...crowdedMatch.player, hand: 12 } };
const smallHand: MatchPosition = { ...crowdedMatch, hand: [3292], player: { ...crowdedMatch.player, hand: 1 } };
const longNames: MatchPosition = { ...crowdedMatch, player: { ...crowdedMatch.player, name: players.long }, objects: crowdedMatch.objects.map(x => x.id === 'o-gogo' ? { ...x, printingId: 3134 } : x) };

export const Documentation: Story = { parameters: { designSystem: { bleed: false } }, render: () => <DocPage docs={[matchLayoutDoc, matchChromeDoc, playerSummaryDoc, counterDoc, zoneCountDoc, turnContextDoc, battlefieldDoc, boardCardDoc, actionPanelDoc, actionChoiceDoc, handFanDoc, handListDoc, eventLogDoc]} /> };
export const Idle: Story = {
  parameters: { designSystem: { coverage: { MatchLayout: ['wide', 'tablet landscape', 'tablet portrait'], MatchChrome: ['standard'], PlayerSummary: ['active', 'waiting'], Counter: ['standard'], ZoneCount: ['count only', 'openable'], TurnContext: ['your turn'], Battlefield: ['crowded'], BoardCard: ['ready', 'exerted', 'damaged', 'drying', 'shift stack', 'at a location', 'with current effects'], ActionPanel: ['idle'], HandFan: ['standard'], EventLog: ['standard'] } } },
  render: () => <MatchReference />,
};
export const Selected: Story = { parameters: { designSystem: { coverage: { BoardCard: ['selected'], ActionPanel: ['choosing'], ActionChoice: ['available', 'unavailable'] } } }, render: () => <MatchReference stage={{ kind: 'selected', id: 'p-kit' }} /> };
export const ChoosingTargets: Story = { parameters: { designSystem: { coverage: { BoardCard: ['valid target'] } } }, render: () => <MatchReference stage={{ kind: 'targets', id: 'p-kit' }} /> };
export const SongPayment: Story = { parameters: { designSystem: { coverage: { HandFan: ['selected'], ActionChoice: ['selected'] } } }, render: () => <MatchReference stage={{ kind: 'song', id: 3292 }} /> };
export const ChooseOne: Story = { render: () => <MatchReference stage={{ kind: 'choose-one' }} /> };
export const BulkQuestReview: Story = { render: () => <MatchReference review="quest" /> };
export const EndTurnReview: Story = { render: () => <MatchReference review="end" /> };
export const Pending: Story = { parameters: { designSystem: { coverage: { ActionPanel: ['pending'], HandList: ['unplayable card'] } } }, render: () => <MatchReference stage={{ kind: 'pending', intent: 'Quest with Kit Cloudkicker – Sure Shot', then: () => {} }} hand="list" /> };
export const Rejected: Story = { parameters: { designSystem: { coverage: { ActionPanel: ['rejected'] } } }, render: () => <MatchReference stage={{ kind: 'rejected' }} /> };
export const OpponentsTurn: Story = { parameters: { designSystem: { coverage: { ActionPanel: ['waiting'], TurnContext: ['opponent\'s turn'] } } }, render: () => <MatchReference stage={{ kind: 'opponent' }} /> };
export const Reconnecting: Story = { render: () => <MatchReference stage={{ kind: 'reconnecting' }} connection="resyncing" /> };
export const LargeHand: Story = { parameters: { designSystem: { coverage: { HandFan: ['large hand'] } } }, render: () => <MatchReference position={largeHand} /> };
export const SmallHand: Story = { parameters: { designSystem: { coverage: { HandFan: ['single card'], HandList: ['standard', 'selected'] } } }, render: () => <MatchReference position={smallHand} /> };
export const HandAsList: Story = { render: () => <MatchReference hand="list" stage={{ kind: 'hand', id: 3268 }} /> };
export const LongNames: Story = { globals: { locale: 'en-XA' }, parameters: { designSystem: { coverage: { PlayerSummary: ['long name'] } } }, render: () => <MatchReference position={longNames} /> };
export const TakedownFallback: Story = { parameters: { designSystem: { coverage: { BoardCard: ['official assets off'], Counter: ['official assets off'] } } }, render: () => <OfficialAssetsOff><MatchReference /></OfficialAssetsOff> };
export const EmptySide: Story = { parameters: { designSystem: { coverage: { Battlefield: ['empty side'] } } }, render: () => <MatchReference position={{ ...crowdedMatch, objects: crowdedMatch.objects.filter(x => x.side === 'player') }} /> };
