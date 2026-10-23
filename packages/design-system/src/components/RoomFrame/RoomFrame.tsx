import { useId } from 'react';
import type { ReactNode } from 'react';
import { Heading } from '../Text/Text.tsx';
import { Icon } from '../Icon/Icon.tsx';
import { useMessages } from '../../foundation/DesignSystemProvider.tsx';
import styles from './RoomFrame.module.css';

export interface InkFormSlotProps {
  /** Where the artwork belongs, for reviewers, for example "Collection, inline-start perimeter". */
  name: string;
  /** The reserved extent, for example "4 rem wide, full height". */
  extent: string;
}
/**
 * A documented reservation for perimeter ink-form artwork (§4, decision D27). It renders nothing visible and takes no
 * focus; the root attribute data-artwork-slots="shown" outlines it with its name and extent for review.
 */
export function InkFormSlot({ name, extent }: InkFormSlotProps) {
  const t = useMessages();
  return <div className={styles.slot} aria-hidden="true" data-slot={name}>
    <span className={styles.slotOutline}><span className={styles.slotLabel}>{t('artworkSlot.label', { name })}</span><span className={styles.slotLabel}>{extent}</span></span>
  </div>;
}

/** The fixed demonstration notice for reference screens (§24, §33): real cards, invented position, ownership and contents. */
export function DemonstrationLabel() {
  const t = useMessages();
  return <p className={styles.demonstration}><Icon name="info" /><span>{t('demonstration.label')}</span></p>;
}

export interface RoomHeaderProps {
  title: ReactNode;
  /** One line of supporting context, such as a set or a save state. */
  meta?: ReactNode;
  /** Shows the demonstration notice under the title, never over a card. */
  demonstration?: boolean;
  /** Room actions, primary last. */
  actions?: ReactNode;
}
/** Room title, context and actions. The title is the page's level-1 heading. */
export function RoomHeader({ title, meta, demonstration = false, actions }: RoomHeaderProps) {
  return <div className={styles.header}>
    <div className={styles.titles}>
      <Heading level={1} role="room">{title}</Heading>
      {meta && <div className={styles.meta}>{meta}</div>}
      {demonstration && <DemonstrationLabel />}
    </div>
    {actions && <div className={styles.actions}>{actions}</div>}
  </div>;
}

export interface RoomFrameProps {
  /** The navigation bar, or match chrome in the match. */
  navigation: ReactNode;
  children: ReactNode;
  /** Names the room's two perimeter ink-form slots (decision D27); every room reserves them. */
  inkForms: { readonly start: InkFormSlotProps; readonly end: InkFormSlotProps };
}
/**
 * A room outside the match: skip link, navigation, main landmark and, at expanded widths, perimeter gutters reserved for
 * ink-form artwork. Content is capped at the standard width (§11); the gutters collapse below 80 rem.
 */
export function RoomFrame({ navigation, children, inkForms }: RoomFrameProps) {
  const t = useMessages(), id = useId();
  return <div className={styles.frame}>
    <a className={styles.skip} href={`#${id}`}>{t('frame.skip')}</a>
    {navigation}
    <div className={styles.body}>
      <InkFormSlot {...inkForms.start} />
      <main id={id} tabIndex={-1} className={styles.main}>{children}</main>
      <InkFormSlot {...inkForms.end} />
    </div>
  </div>;
}
