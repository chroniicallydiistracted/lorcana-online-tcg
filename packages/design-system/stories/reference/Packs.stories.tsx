import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Banner, Button, Confirmation, InlineMessage, JobStatus, OpeningSummary, PackReveal, ProductChoice, ProgressBar, RevealControls, RoomHeader, Stack, Text, useAnnouncer } from '../../src/index.ts';
import { openingSummaryDoc, packRevealDoc, productChoiceDoc, revealCardDoc, revealControlsDoc } from '../../src/components/Pack/Pack.docs.ts';
import { DocPage } from '../support/DocPage.tsx';
import { ReferenceRoom } from '../support/reference/frame.tsx';
import { referenceStories, storyHref } from '../support/reference/links.ts';
import { pageOfCard } from '../support/reference/binder.ts';
import { compositionNote, packSlots, rarestIndex, slotName } from '../support/reference/pack.ts';

const meta = { title: 'Reference screens/Pack opening', parameters: { designSystem: { bleed: true } } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

type Stage = 'choice' | 'review' | 'pending' | 'reveal' | 'interrupted' | 'failed' | 'summary' | 'settlement';
function PackReference({ stage: startStage = 'choice', revealed: startRevealed = 0 }: { stage?: Stage; revealed?: number }) {
  const announce = useAnnouncer(), [stage, setStage] = useState<Stage>(startStage), [revealed, setRevealed] = useState(startRevealed), [held, setHeld] = useState(3), total = packSlots.length;
  const reveal = (count: number) => { setRevealed(count); const slot = packSlots[count - 1]; if (slot) announce(`Card ${String(count)} of ${String(total)}: ${slotName(slot)}.`); };
  const open = () => { setHeld(h => h - 1); setStage('pending'); setTimeout(() => { setStage('reveal'); announce('Your booster is open. 12 cards, face down.'); }, 900); };
  const collectionHref = (p: { collectorNumber: string }) => storyHref(referenceStories.collection, `page:${String(pageOfCard(String(Number.parseInt(p.collectorNumber, 10))) ?? 1)}`);
  const header = <RoomHeader title="Open packs" meta={compositionNote} demonstration actions={<Button onPress={() => location.assign(storyHref(referenceStories.collection))}>Back to Collection</Button>} />;
  const body = (() => {
    switch (stage) {
      case 'choice': case 'review': return <>
        <ProductChoice name="Hyperia City booster" contents="12 cards" available={held} onOpen={() => setStage('review')} artwork={<span style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', font: 'var(--is-typography-subsection)', color: 'var(--is-color-text-supporting)' }}>Hyperia City</span>} />
        <Confirmation isOpen={stage === 'review'} onOpenChange={o => { if (!o) setStage(s => s === 'review' ? 'choice' : s); }} title="Open 1 Hyperia City booster?" consequence="The contents are decided when you open it and saved to your collection." confirmLabel="Open booster" cancelLabel="Keep it for later" onConfirm={open} />
      </>;
      case 'pending': return <div style={{ maxInlineSize: '32rem' }}><Stack gap={3}><ProgressBar label="Opening your booster" /><Text tone="supporting">The server is deciding the contents. Nothing is shown until they are saved.</Text></Stack></div>;
      case 'interrupted': return <Stack gap={6}>
        <Banner tone="information" title="You left during this opening." actions={<><Button variant="primary" onPress={() => setStage('reveal')}>{`Continue from card ${String(revealed + 1)}`}</Button><Button onPress={() => setStage('summary')}>Skip to summary</Button></>}>Your 12 cards are saved to your collection. The remaining cards stay face down until you continue.</Banner>
        <PackReveal slots={packSlots} revealed={revealed} rarest={rarestIndex} />
      </Stack>;
      case 'reveal': return <Stack gap={6}>
        <RevealControls revealed={revealed} total={total} onRevealNext={() => reveal(Math.min(total, revealed + 1))} onRevealAll={() => { setRevealed(total); announce(`All 12 cards revealed. ${String(packSlots.filter(s => s.isNew).length)} are new.`); }} onSkip={() => setStage('summary')} />
        <PackReveal slots={packSlots} revealed={revealed} rarest={rarestIndex} />
      </Stack>;
      case 'failed': return <Stack gap={4}>
        <InlineMessage tone="danger" title="The reveal could not be shown." actions={<Button onPress={() => setStage('summary')}>View summary</Button>}>Your 12 cards are saved to your collection. Here is what the booster contained.</InlineMessage>
        <ol style={{ margin: 0, paddingInlineStart: 'var(--is-space-6)' }}>{packSlots.map(s => <li key={s.printing.id}><Text as="span">{slotName(s)}</Text></li>)}</ol>
      </Stack>;
      case 'summary': return <Stack gap={6}>
        <OpeningSummary slots={packSlots} collectionHref={collectionHref} />
        <div style={{ display: 'flex', gap: 'var(--is-space-3)', flexWrap: 'wrap' }}><Button onPress={() => location.assign(storyHref(referenceStories.collection))}>View the whole opening in Collection</Button><Button variant="primary" onPress={() => { setStage('choice'); setRevealed(0); }}>Done</Button></div>
      </Stack>;
      case 'settlement': return <Stack gap={6}>
        <OpeningSummary slots={packSlots} pendingNote={<JobStatus label="Updating your collection" state="running" detail="Your cards are committed to this opening. Collection links appear when the update finishes; nothing is lost if you leave." />} />
        <div><Button variant="primary" onPress={() => { setStage('choice'); setRevealed(0); }}>Done</Button></div>
      </Stack>;
    }
  })();
  return <ReferenceRoom room="Pack opening" current="collection"><Stack gap={6}>{header}{body}</Stack></ReferenceRoom>;
}

export const Documentation: Story = { parameters: { designSystem: { bleed: false } }, render: () => <DocPage docs={[productChoiceDoc, packRevealDoc, revealCardDoc, revealControlsDoc, openingSummaryDoc]} /> };
export const ProductChoiceAndReview: Story = { parameters: { designSystem: { coverage: { ProductChoice: ['available'] } } }, render: () => <PackReference /> };
export const Review: Story = { render: () => <PackReference stage="review" /> };
export const Pending: Story = { render: () => <PackReference stage="pending" /> };
export const MidReveal: Story = { parameters: { designSystem: { coverage: { PackReveal: ['face down', 'partly revealed'], RevealCard: ['face down', 'revealed', 'foil', 'new'], RevealControls: ['revealing'] } } }, render: () => <PackReference stage="reveal" revealed={5} /> };
export const RarestBeat: Story = { parameters: { designSystem: { coverage: { PackReveal: ['all revealed'], RevealCard: ['rarest beat'], RevealControls: ['all revealed'] } } }, render: () => <PackReference stage="reveal" revealed={12} /> };
export const Summary: Story = { parameters: { designSystem: { coverage: { OpeningSummary: ['with Collection links'] } } }, render: () => <PackReference stage="summary" /> };
export const InterruptedAndResumed: Story = { render: () => <PackReference stage="interrupted" revealed={5} /> };
export const PresentationFailure: Story = { render: () => <PackReference stage="failed" /> };
export const SettlementPending: Story = { parameters: { designSystem: { coverage: { OpeningSummary: ['settlement pending'] } } }, render: () => <PackReference stage="settlement" /> };
export const ReducedMotion: Story = { globals: { motion: 'reduced' }, parameters: { designSystem: { coverage: { RevealCard: ['reduced motion'] } } }, render: () => <PackReference stage="reveal" revealed={12} /> };
export const NoneHeld: Story = { parameters: { designSystem: { coverage: { ProductChoice: ['none held'] } } }, render: () => <NoneHeldRoom /> };
function NoneHeldRoom() {
  return <ReferenceRoom room="Pack opening" current="collection"><Stack gap={6}><RoomHeader title="Open packs" demonstration />
    <ProductChoice name="Hyperia City booster" contents="12 cards" available={0} onOpen={() => {}} artwork={null} />
    <Text tone="supporting">You have no Hyperia City boosters to open.</Text>
  </Stack></ReferenceRoom>;
}
