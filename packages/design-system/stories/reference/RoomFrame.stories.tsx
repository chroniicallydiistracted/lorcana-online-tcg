import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button, InlineMessage, Link, RoomHeader, Stack, Text } from '../../src/index.ts';
import { accountMenuDoc, navigationBarDoc } from '../../src/components/NavigationBar/NavigationBar.docs.ts';
import { demonstrationLabelDoc, inkFormSlotDoc, roomFrameDoc, roomHeaderDoc } from '../../src/components/RoomFrame/RoomFrame.docs.ts';
import { DocPage } from '../support/DocPage.tsx';
import { ReferenceRoom, players } from '../support/reference/frame.tsx';
import { referenceStories, storyHref } from '../support/reference/links.ts';
import { useReferenceText } from '../support/reference/text.ts';

const meta = { title: 'Reference screens/Room frame', parameters: { designSystem: { bleed: true } } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

function SampleRoom({ title, current = 'collection' as const, long = false }: { title: string; current?: 'collection' | 'decks'; long?: boolean }) {
  return <ReferenceRoom room="Collection" current={current} {...(long ? { playerName: players.long } : {})}>
    <RoomHeader title={title} meta="Hyperia City · Set 14" demonstration actions={<Button variant="primary">Open packs</Button>} />
    <Text>The room's working content sits here, inside the standard content width.</Text>
  </ReferenceRoom>;
}

export const Documentation: Story = { parameters: { designSystem: { bleed: false } }, render: () => <DocPage docs={[roomFrameDoc, navigationBarDoc, accountMenuDoc, roomHeaderDoc, demonstrationLabelDoc, inkFormSlotDoc]} /> };
export const Frame: Story = {
  parameters: { designSystem: { coverage: { RoomFrame: ['standard', 'skip link focused'], NavigationBar: ['current destination', 'collapsed menu'], AccountMenu: ['closed', 'open'], RoomHeader: ['standard', 'with demonstration notice'], DemonstrationLabel: ['standard'], InkFormSlot: ['hidden'] } } },
  render: () => <SampleRoom title="Collection" />,
};
export const ArtworkSlotsShown: Story = {
  globals: { artworkSlots: 'shown' },
  parameters: { designSystem: { coverage: { RoomFrame: ['artwork slots shown'], InkFormSlot: ['outlined'] } } },
  render: () => <SampleRoom title="Collection" />,
};
export const SecondarySurface: Story = {
  parameters: { designSystem: { coverage: { NavigationBar: ['secondary surface under its parent'] } } },
  render: () => <SampleRoom title="Open packs" />,
};
export const LongLabels: Story = {
  globals: { locale: 'en-XA' },
  parameters: { designSystem: { coverage: { NavigationBar: ['long labels'], AccountMenu: ['long name'], RoomHeader: ['long title'] } } },
  render: () => <SampleRoom title="Hyperia City completion and the printings still missing from this binder" long />,
};
export const TitleOnly: Story = {
  render: () => <ReferenceRoom room="Decks" current="decks"><RoomHeader title="Decks" /><Text>A room header can stand alone without context or actions.</Text></ReferenceRoom>,
};

const rooms: Readonly<Record<string, string>> = { lab: 'Lab', learn: 'Learn', events: 'Events', profile: 'Profile', settings: 'Settings' };
/** The honest destination for rooms the reference set does not include, so no navigation link is a dead control. */
export const OtherRoom: StoryObj<{ room: string }> = {
  args: { room: 'lab' },
  argTypes: { room: { control: 'select', options: Object.keys(rooms) } },
  render: ({ room }) => {
    const s = useReferenceText(), name = rooms[room] ?? rooms.lab!;
    const current = room === 'lab' || room === 'learn' || room === 'events' ? room : undefined;
    return <ReferenceRoom room={name} {...(current ? { current } : {})}>
      <Stack gap={6}>
        <RoomHeader title={s('room.notInReference.title', { room: name })} />
        <InlineMessage tone="information" title={s('room.notInReference.message')} actions={<Link href={storyHref(referenceStories.collection)}>{s('room.notInReference.back')}</Link>}>
          {s('room.notInReference.detail', { room: name })}
        </InlineMessage>
      </Stack>
    </ReferenceRoom>;
  },
};
