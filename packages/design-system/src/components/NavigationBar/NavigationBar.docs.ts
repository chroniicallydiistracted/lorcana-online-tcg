import { defineDoc } from '../docs.ts';
export const navigationBarDoc = defineDoc({
  name: 'NavigationBar', status: 'experimental', foundation: 'React Aria Link, Menu and MenuTrigger',
  purpose: 'The shared top bar for rooms outside a match (decision D28): wordmark, the primary destinations of blueprint §10.1, status and account.',
  anatomy: ['Wordmark', 'Primary destinations as links, the current one marked', 'Menu button holding the destinations on narrower layouts', 'Status slot (quiet notification count)', 'Account slot'],
  variants: ['wide: destinations inline', 'narrow: destinations in a menu'],
  states: ['current destination', 'secondary surface under its parent', 'collapsed menu', 'long labels'],
  inputs: ['destinations', 'current', 'status', 'account'],
  outputs: ['navigation through each destination link'],
  accessibility: ['A nav landmark named "Primary"; the current destination has aria-current="page" and a heavier weight with an underline bar, never colour alone', 'Below the wide layout the same links are menu items, keyboard and touch operable', 'Targets are at least 44 px'],
  contentLimits: ['Labels never truncate: at narrower widths, or with long translations, they move into the menu'],
  usage: ['The match replaces this bar with match chrome', 'Pack opening and other secondary surfaces mark their parent destination', 'The application owns routes; the bar renders the links it is given'],
});
export const accountMenuDoc = defineDoc({
  name: 'AccountMenu', status: 'experimental', foundation: 'React Aria MenuTrigger and Menu',
  purpose: 'Opens Profile, settings and legal information from a neutral initials avatar and the player name.',
  anatomy: ['Initials avatar', 'Player name (wide layouts)', 'Menu of account destinations'],
  variants: ['with name', 'initials only'],
  states: ['closed', 'open', 'long name'],
  inputs: ['name', 'items'],
  outputs: ['each item navigates or runs its action'],
  accessibility: ['The button is named "Account menu for <name>" at every width', 'The avatar is decorative'],
  contentLimits: ['Long names show in full in the menu name and wrap in the menu'],
  usage: ['No imposed persona: the neutral initials treatment is the default avatar (§24)'],
});
