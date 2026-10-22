import type { ReactNode } from 'react';
import { Button as AriaButton } from 'react-aria-components';
import { GameSymbol } from '../GameSymbol/GameSymbol.tsx';
import type { GameSymbolName } from '../GameSymbol/GameSymbol.tsx';
import { useMessages } from '../../foundation/DesignSystemProvider.tsx';
import styles from './Panels.module.css';

export interface CounterProps {
  label: string;
  value: number;
  /** A threshold from the format, such as lore to win; never a constant (§19). */
  max?: number;
  symbol?: GameSymbolName;
  /** Supporting detail, such as "5 ready". */
  detail?: string;
}
/** A labelled count with tabular numerals, an optional threshold and an optional printed symbol. */
export function Counter({ label, value, max, symbol, detail }: CounterProps) {
  const n = new Intl.NumberFormat();
  return <div className={styles.counter}>
    <dt className={styles.counterLabel}>{label}</dt>
    <dd className={styles.counterValue}>{symbol && <GameSymbol name={symbol} />}<span className={styles.number}>{n.format(value)}</span>{max !== undefined && <span className={styles.max}>/ {n.format(max)}</span>}{detail && <span className={styles.detail}>{detail}</span>}</dd>
  </div>;
}

export interface ZoneCountProps { label: string; count: number; onOpen?: () => void }
/** A zone's card count; public zones such as the discard open a list when pressed. */
export function ZoneCount({ label, count, onOpen }: ZoneCountProps) {
  const t = useMessages(), n = new Intl.NumberFormat();
  if (!onOpen) return <div className={styles.counter}><dt className={styles.counterLabel}>{label}</dt><dd className={styles.counterValue}><span className={styles.number}>{n.format(count)}</span></dd></div>;
  return <div className={styles.counter}><dt className={styles.counterLabel}>{label}</dt><dd className={styles.counterValue}>
    <AriaButton className={styles.zoneButton} onPress={onOpen} aria-label={t('match.openZone', { zone: label, count })}><span className={styles.number}>{n.format(count)}</span></AriaButton>
  </dd></div>;
}

export interface PlayerSummaryProps {
  name: string;
  /** The turn marker's text while this player is taking a turn, such as "Your turn"; omitted while waiting. */
  active?: string | undefined;
  /** Counters and zone counts in the order they read. */
  children: ReactNode;
}
/** A player's public identity and counts: neutral initials, name, turn marker, lore, ink and zones (§19, §24). */
export function PlayerSummary({ name, active, children }: PlayerSummaryProps) {
  const initials = name.split(/\s+/).filter(Boolean).slice(0, 2).map(part => part[0]!.toLocaleUpperCase()).join('');
  return <section className={styles.player} aria-label={name} data-active={active ? '' : undefined}>
    <div className={styles.identity}><span className={styles.initials} aria-hidden="true">{initials}</span><span className={styles.name}>{name}</span>{active && <span className={styles.turn}>{active}</span>}</div>
    <dl className={styles.counters}>{children}</dl>
  </section>;
}

/** Turn and phase context, such as "Your turn · Turn 7 · Main phase". */
export function TurnContext({ children }: { children: ReactNode }) {
  return <p className={styles.turnContext}>{children}</p>;
}

export interface ActionChoiceProps {
  label: string;
  detail?: string;
  /** Why this choice isn't available; the choice stays visible and explained (§20). */
  unavailable?: string;
  selected?: boolean;
  onPress: () => void;
}
/** One option in a decision: an action, a target, a payment or a mode, with its reason when unavailable. */
export function ActionChoice({ label, detail, unavailable, selected = false, onPress }: ActionChoiceProps) {
  return <li>
    <AriaButton className={styles.choiceButton} onPress={onPress} isDisabled={Boolean(unavailable)} aria-pressed={selected} data-selected={selected || undefined}>
      <span className={styles.choiceLabel}>{label}</span>
      {detail && <span className={styles.choiceDetail}>{detail}</span>}
      {unavailable && <span className={styles.choiceReason}>{unavailable}</span>}
    </AriaButton>
  </li>;
}

export interface ActionPanelProps {
  /** The required decision in plain words, at the critical text size (§6). */
  prompt: string;
  context?: ReactNode;
  /** ActionChoice items, or other content such as pending or rejected details. */
  children?: ReactNode;
  /** Local controls such as Back or Cancel; never used to cancel a submitted command (§14). */
  footer?: ReactNode;
  state?: 'idle' | 'choosing' | 'pending' | 'rejected' | 'waiting';
}
/** The current decision, always visible while one is open (§20): prompt, context, choices and local controls. */
export function ActionPanel({ prompt, context, children, footer, state = 'idle' }: ActionPanelProps) {
  const t = useMessages();
  return <section className={styles.panel} data-state={state} aria-label={t('match.decision')}>
    <h2 className={styles.prompt}>{prompt}</h2>
    {context && <div className={styles.context}>{context}</div>}
    {children && <ul className={styles.choices}>{children}</ul>}
    {footer && <div className={styles.footer}>{footer}</div>}
  </section>;
}

export interface EventLogEntry { readonly id: string; readonly turn: number; readonly actor: string; readonly text: string }
/** Accepted actions, newest first, grouped by turn (§19). It is not a live region; announcements are separate (§25). */
export function EventLog({ label, entries }: { label: string; entries: readonly EventLogEntry[] }) {
  const t = useMessages(), turns = [...new Set(entries.map(e => `${String(e.turn)}|${e.actor}`))].reverse();
  return <div className={styles.log} aria-label={label} role="region" tabIndex={0}>
    {turns.map(key => { const [turn, actor] = key.split('|') as [string, string]; return <section key={key} className={styles.logTurn} aria-label={t('match.turnHeading', { turn, actor })}>
      <h3 className={styles.logHeading}>{t('match.turnHeading', { turn, actor })}</h3>
      <ol className={styles.logEntries}>{entries.filter(e => String(e.turn) === turn && e.actor === actor).reverse().map(e => <li key={e.id}>{e.text}</li>)}</ol>
    </section>; })}
  </div>;
}
