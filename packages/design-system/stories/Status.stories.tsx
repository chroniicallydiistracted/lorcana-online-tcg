import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect, useMemo, useState } from 'react';
import { UNSTABLE_ToastQueue as ToastQueue } from 'react-aria-components';
import { Badge, Banner, Button, Cell, Column, ConnectionStatus, InlineMessage, Inline, JobStatus, List, ListItem, NotificationCount, ProgressBar, Row, Stack, StatusIndicator, Table, TableBody, TableHeader, Text, ToastRegion } from '../src/index.ts';
import { fixturePrinting, presentationCatalog } from '@lorcana/rules-data/fixtures';
import { fullName } from './support/fixtures.ts';
import type { ToastContent } from '../src/index.ts';
import { listDoc } from '../src/components/List/List.docs.ts';
import { tableDoc } from '../src/components/Table/Table.docs.ts';
import { badgeDoc, statusIndicatorDoc } from '../src/components/Badge/Badge.docs.ts';
import { jobStatusDoc, progressBarDoc } from '../src/components/Progress/Progress.docs.ts';
import { bannerDoc, inlineMessageDoc } from '../src/components/Message/Message.docs.ts';
import { toastDoc } from '../src/components/Toast/Toast.docs.ts';
import { notificationCountDoc } from '../src/components/Toast/NotificationCount.docs.ts';
import { connectionStatusDoc } from '../src/components/ConnectionStatus/ConnectionStatus.docs.ts';
import { DocPage } from './support/DocPage.tsx';
import { longText } from './support/fixtures.ts';

const meta = { title: 'Status/Collections, feedback and connection' } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Documentation: Story = { render: () => <DocPage docs={[listDoc, tableDoc, badgeDoc, statusIndicatorDoc, progressBarDoc, jobStatusDoc, inlineMessageDoc, bannerDoc, toastDoc, notificationCountDoc, connectionStatusDoc]} /> };
const decks = [{ id: 'd1', name: 'Sapphire Steel Tempo' }, { id: 'd2', name: 'Amber Amethyst Songs' }, { id: 'd3', name: 'Archived deck (read-only)' }];
export const Lists: Story = {
  parameters: { designSystem: { coverage: { List: ['populated', 'empty', 'selected', 'focused', 'disabled item'] } } },
  render: () => <Stack gap={6}>
    <List aria-label="Decks" selectionMode="single" defaultSelectedKeys={['d1']} disabledKeys={['d3']} items={decks} emptyState="No decks yet.">{item => <ListItem id={item.id} textValue={item.name}>{item.name}</ListItem>}</List>
    <List aria-label="Favorites" items={[] as typeof decks} emptyState={<Stack gap={2}><Text role="body-strong">No favorites yet</Text><Text>Mark printings as favorites from the inspector to find them here.</Text></Stack>}>{item => <ListItem id={item.id}>{item.name}</ListItem>}</List>
    <List aria-label="Printings grid" layout="grid" items={decks.slice(0, 2)} emptyState="None">{item => <ListItem id={item.id} textValue={item.name}>{item.name}</ListItem>}</List>
  </Stack>,
};
// Real printings from the recorded Ravensburger catalog (decision D25); owned counts are example collection data.
const setName = (id: string) => presentationCatalog.sets.find(set => set.id === id)?.name ?? id;
const rows = [[42, 3], [3134, 1], [1939, 0]].map(([id, count]) => { const card = fixturePrinting(id ?? 0); return { id: `r${String(id)}`, name: fullName(card), set: setName(card.setIds[0] ?? ''), count: count ?? 0 }; });
export const Tables: Story = {
  parameters: { designSystem: { coverage: { Table: ['populated', 'sorted', 'selected row', 'focused cell', 'long content', 'empty'] } } },
  render: () => <Stack gap={6}>
    <Table aria-label="Owned printings" selectionMode="multiple" defaultSelectedKeys={['r42']} sortDescriptor={{ column: 'name', direction: 'ascending' }}>
      <TableHeader><Column id="name" isRowHeader allowsSorting>Name</Column><Column id="set">Set</Column><Column id="count" numeric>Owned</Column></TableHeader>
      <TableBody items={rows} emptyState="No printings">{item => <Row id={item.id}><Cell>{item.name}</Cell><Cell>{item.set}</Cell><Cell numeric>{item.count}</Cell></Row>}</TableBody>
    </Table>
    <Table aria-label="Empty results"><TableHeader><Column isRowHeader>Name</Column><Column>Set</Column></TableHeader><TableBody emptyState="No printings match these filters. Reset filters to see your whole collection.">{[]}</TableBody></Table>
  </Stack>,
};
export const BadgesAndStatus: Story = {
  parameters: { designSystem: { coverage: { Badge: ['default', 'long label'], StatusIndicator: ['default'] } } },
  render: () => <Stack gap={4}>
    <Inline gap={2}><Badge>Rare</Badge><Badge tone="information">Format 2026-10</Badge><Badge tone="success">Legal</Badge><Badge tone="warning">Rotating soon</Badge><Badge tone="danger">Not legal in this format</Badge></Inline>
    <div style={{ maxInlineSize: '14rem' }}><Badge>A badge label long enough to wrap</Badge></div>
    <Stack gap={1}><StatusIndicator tone="success">Legal in Core format (policy 2026-10)</StatusIndicator><StatusIndicator tone="warning">You own 2 of 3 copies</StatusIndicator><StatusIndicator tone="danger">5 copies exceed the format maximum of 4</StatusIndicator><StatusIndicator tone="information">Certification pending</StatusIndicator></Stack>
  </Stack>,
};
export const Progress: Story = {
  parameters: { designSystem: { coverage: { ProgressBar: ['determinate', 'indeterminate', 'complete'], JobStatus: ['queued', 'running determinate', 'running indeterminate', 'failed', 'canceled', 'complete'] } } },
  render: () => <Stack gap={4}>
    <ProgressBar label="Importing deck" value={40} />
    <ProgressBar label="Waiting for the server" />
    <ProgressBar label="Download complete" value={100} />
    <JobStatus label="Lab experiment: 1,000 simulated openings" state="queued" />
    <JobStatus label="Lab experiment: mulligan sweep" state="running" progress={62} action={<Button>Cancel experiment</Button>} />
    <JobStatus label="Replay export" state="running" />
    <JobStatus label="Deck import" state="failed" detail="The list has 3 unknown card names. Fix them in the preview and import again." action={<Button>Open preview</Button>} />
    <JobStatus label="Replay export" state="canceled" />
    <JobStatus label="Collection sync" state="complete" />
  </Stack>,
};
export const Messages: Story = {
  parameters: { designSystem: { coverage: { InlineMessage: ['information', 'success', 'warning', 'danger', 'with actions', 'long content'], Banner: ['information', 'success', 'warning', 'danger', 'with actions', 'long content'] } } },
  render: () => <Stack gap={4}>
    <InlineMessage tone="information" title="Ownership is loading">Quantities appear when your collection finishes loading.</InlineMessage>
    <InlineMessage tone="success" title="Deck saved">Revision 12 is saved to your account.</InlineMessage>
    <InlineMessage tone="warning" title="Unsaved changes">Your edits are kept on this device until you save.</InlineMessage>
    <InlineMessage tone="danger" title="Couldn't save the deck" actions={<Button>Retry</Button>}>The server rejected revision 12 because a newer revision exists. Your draft is kept.</InlineMessage>
    <Banner tone="warning" title="You are offline">Browsing your cached collection still works. Matches and saves resume when you reconnect.</Banner>
    <Banner tone="information" title="Update available" actions={<Button variant="primary">Update now</Button>}>{longText}</Banner>
    <Banner tone="success" title="Reconnected" />
    <Banner tone="danger" title="Version mismatch">Update to continue; recoverable work is kept.</Banner>
  </Stack>,
};
export const Toasts: Story = {
  parameters: { designSystem: { coverage: { Toast: ['single', 'stacked', 'focused', 'long content'] } } },
  render: () => {
    const queue = useMemo(() => new ToastQueue<ToastContent>({ maxVisibleToasts: 3 }), []);
    useEffect(() => {
      const keys = [queue.add({ title: 'Friend request accepted', tone: 'success' }), queue.add({ title: 'Event registration closes soon', description: `Registration for the Saturday league closes at 18:00 UTC. ${longText}`, tone: 'information' })];
      return () => keys.forEach(key => queue.close(key));
    }, [queue]);
    return <><Text>Toasts appear at the inline end of the screen. Press F6 to move focus to them.</Text><ToastRegion queue={queue} /></>;
  },
};
export const Notifications: Story = {
  parameters: { designSystem: { coverage: { NotificationCount: ['zero', 'some', 'many', 'focused'] } } },
  render: () => <Inline gap={4}><NotificationCount count={0} onPress={() => {}} /><NotificationCount count={3} onPress={() => {}} /><NotificationCount count={1280} onPress={() => {}} /></Inline>,
};
export const Connection: Story = {
  parameters: { designSystem: { coverage: { ConnectionStatus: ['connected', 'reconnecting', 'resyncing', 'offline', 'version-mismatch'] } } },
  render: () => {
    const [state] = useState('offline' as const);
    return <Stack gap={3} align="start">
      <ConnectionStatus state="connected" compact />
      <ConnectionStatus state="reconnecting" />
      <ConnectionStatus state="resyncing" />
      <ConnectionStatus state={state} action={<Button icon="refresh">Retry connection</Button>} />
      <ConnectionStatus state="version-mismatch" action={<Button variant="primary">Update now</Button>} />
    </Stack>;
  },
};
