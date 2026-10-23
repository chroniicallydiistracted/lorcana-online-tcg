import { formatMessage, pseudolocalize, useDesignSystem } from '../../../src/index.ts';

// Room content for the UX-01 reference screens. Component strings live in the design system's catalog; these are the
// rooms' own words, kept here so the en-XA toolbar locale lengthens them too (§28).
const en = {
  'nav.play': 'Play',
  'nav.collection': 'Collection',
  'nav.decks': 'Decks',
  'nav.lab': 'Lab',
  'nav.learn': 'Learn',
  'nav.events': 'Events',
  'account.profile': 'Profile',
  'account.settings': 'Settings',
  'account.notice': 'Fan content notice',
  'notifications.title': 'Notifications',
  'notifications.friend': '{name} sent you a friend request.',
  'notifications.event': 'Registration for the Hyperia City league closes on 24 October 2026 at 18:00 UTC.',
  'room.notInReference.title': '{room}',
  'room.notInReference.message': 'This room is not part of the UX-01 reference set.',
  'room.notInReference.detail': 'The reference set covers the crowded match, the deckbuilder, the Collection binder and pack opening. {room} is designed in its own task.',
  'room.notInReference.back': 'Go to Collection',
  'room.packs': 'Open packs',
} as const;
export type ReferenceKey = keyof typeof en;
/** The reference screens' room text for the toolbar locale; en-XA lengthens and accents it like component strings. */
export function useReferenceText(): (key: ReferenceKey, values?: Readonly<Record<string, string | number>>) => string {
  const { locale } = useDesignSystem();
  return (key, values = {}) => formatMessage(locale === 'en-XA' ? pseudolocalize(en[key]) : en[key], values, locale);
}
