import { useState } from 'react';
import type { ReactNode } from 'react';
import { AccountMenu, Dialog, FanContentNotice, NavigationBar, NotificationCount, RoomFrame, Stack, Text } from '../../../src/index.ts';
import type { InkFormSlotProps } from '../../../src/index.ts';
import { referenceStories, storyHref } from './links.ts';
import { useReferenceText } from './text.ts';

// Invented, visibly demonstration identities (§28): never a real player.
export const players = { self: 'Rowan Ashby', opponent: 'Imani Okafor', long: 'Maximiliana Verhoeven-Castellanos' } as const;
export type ReferenceDestination = 'play' | 'collection' | 'decks' | 'lab' | 'learn' | 'events';

/** The navigation bar every reference room shares: real links between the reference screens and honest pages for the rest. */
export function ReferenceNavigation({ current, playerName = players.self }: { current?: ReferenceDestination; playerName?: string }) {
  const s = useReferenceText(), [notices, setNotices] = useState(false), [legal, setLegal] = useState(false);
  const other = (room: string) => storyHref(referenceStories.otherRoom, `room:${room}`);
  const destinations = [
    { id: 'play', label: s('nav.play'), href: storyHref(referenceStories.match) },
    { id: 'collection', label: s('nav.collection'), href: storyHref(referenceStories.collection) },
    { id: 'decks', label: s('nav.decks'), href: storyHref(referenceStories.decks) },
    { id: 'lab', label: s('nav.lab'), href: other('lab') },
    { id: 'learn', label: s('nav.learn'), href: other('learn') },
    { id: 'events', label: s('nav.events'), href: other('events') },
  ];
  return <>
    <NavigationBar destinations={destinations} {...(current ? { current } : {})}
      status={<NotificationCount count={2} onPress={() => setNotices(true)} />}
      account={<AccountMenu name={playerName} items={[
        { id: 'profile', label: s('account.profile'), href: other('profile') },
        { id: 'settings', label: s('account.settings'), href: other('settings') },
        { id: 'notice', label: s('account.notice'), onAction: () => setLegal(true) },
      ]} />} />
    <Dialog title={s('notifications.title')} isOpen={notices} onOpenChange={setNotices}>
      <Stack as="ul" gap={3}>
        <li><Text>{s('notifications.friend', { name: players.opponent })}</Text></li>
        <li><Text>{s('notifications.event')}</Text></li>
      </Stack>
    </Dialog>
    <Dialog title={s('account.notice')} isOpen={legal} onOpenChange={setLegal}><FanContentNotice /></Dialog>
  </>;
}

/** A reference room: the shared frame with named ink-form slots on both perimeters. */
export function ReferenceRoom({ room, current, children, playerName }: { room: string; current?: ReferenceDestination; children: ReactNode; playerName?: string }) {
  const slot = (side: string): InkFormSlotProps => ({ name: `${room}, ${side} perimeter`, extent: '4 rem wide, full room height' });
  return <RoomFrame navigation={<ReferenceNavigation {...(current ? { current } : {})} {...(playerName ? { playerName } : {})} />} inkForms={{ start: slot('inline-start'), end: slot('inline-end') }}>{children}</RoomFrame>;
}
