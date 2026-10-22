import { Button as AriaButton, Link as AriaLink } from 'react-aria-components';
import type { ReactNode } from 'react';
import { Wordmark } from '../Wordmark/Wordmark.tsx';
import { Icon } from '../Icon/Icon.tsx';
import { Menu, MenuItem, MenuTrigger } from '../Menu/Menu.tsx';
import { useMessages } from '../../foundation/DesignSystemProvider.tsx';
import styles from './NavigationBar.module.css';

/** One primary destination (blueprint §10.1). The application owns routes; the bar only links to them. */
export interface Destination { readonly id: string; readonly label: string; readonly href: string }
export interface NavigationBarProps {
  destinations: readonly Destination[];
  /** The destination the current room belongs to, marked aria-current="page". A secondary surface names its parent: pack opening belongs to Collection. */
  current?: string;
  /** Status controls before the account menu, such as the quiet notification count. */
  status?: ReactNode;
  /** The account menu. */
  account?: ReactNode;
}
/**
 * The shared top bar for the rooms outside a match (decision D28): wordmark, primary destinations, status and account.
 * Below the wide layout the destinations move into a menu, so long translations never squeeze or truncate them. Its
 * content edge follows the room's gutters and perimeter reservation, so the wordmark aligns with the room content.
 */
export function NavigationBar({ destinations, current, status, account }: NavigationBarProps) {
  const t = useMessages();
  return <header className={styles.bar}><div className={styles.inner}>
    <Wordmark />
    <nav className={styles.nav} aria-label={t('navigation.primary')}>
      <ul className={styles.list}>
        {destinations.map(d => <li key={d.id}><AriaLink href={d.href} className={styles.link} {...(d.id === current ? { 'aria-current': 'page' as const } : {})}>{d.label}</AriaLink></li>)}
      </ul>
      <MenuTrigger>
        <AriaButton className={styles.menuButton}><Icon name="menu" /><span>{t('navigation.menu')}</span></AriaButton>
        <Menu aria-label={t('navigation.primary')}>{destinations.map(d => <MenuItem key={d.id} id={d.id} href={d.href} {...(d.id === current ? { description: t('navigation.current') } : {})}>{d.label}</MenuItem>)}</Menu>
      </MenuTrigger>
    </nav>
    <div className={styles.end}>{status}{account}</div>
  </div></header>;
}

export interface AccountMenuProps {
  /** The player's public name; its initials are the neutral avatar fallback (§24). */
  name: string;
  /** Menu entries: Profile first, then settings and legal information. */
  items: readonly { readonly id: string; readonly label: string; readonly href?: string; readonly onAction?: () => void }[];
}
/** Neutral initials avatar and name that open the account menu. No imposed persona or avatar art. */
export function AccountMenu({ name, items }: AccountMenuProps) {
  const t = useMessages(), initials = name.split(/\s+/).filter(Boolean).slice(0, 2).map(part => part[0]!.toLocaleUpperCase()).join('');
  return <MenuTrigger>
    <AriaButton className={styles.account} aria-label={t('navigation.account', { name })}>
      <span className={styles.initials} aria-hidden="true">{initials}</span>
      <span className={styles.accountName} aria-hidden="true">{name}</span>
    </AriaButton>
    <Menu aria-label={t('navigation.account', { name })} onAction={key => items.find(item => item.id === key)?.onAction?.()}>
      {items.map(item => <MenuItem key={item.id} id={item.id} {...(item.href ? { href: item.href } : {})}>{item.label}</MenuItem>)}
    </Menu>
  </MenuTrigger>;
}
