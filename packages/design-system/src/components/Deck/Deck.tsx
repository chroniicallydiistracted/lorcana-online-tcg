import { useId } from 'react';
import type { ReactNode } from 'react';
import { DeckEntry } from '../DeckEntry/DeckEntry.tsx';
import type { DeckEntryMessage } from '../DeckEntry/DeckEntry.tsx';
import { Icon } from '../Icon/Icon.tsx';
import type { IconName } from '../Icon/Icon.tsx';
import { InkIdentity } from '../Ink/InkIdentity.tsx';
import type { InkName } from '../Ink/InkIdentity.tsx';
import { useMessages } from '../../foundation/DesignSystemProvider.tsx';
import styles from './Deck.module.css';

export interface DeckListEntry {
  readonly id: string;
  readonly name: string;
  readonly version?: string | undefined;
  readonly inks: readonly InkName[];
  readonly cost: number;
  readonly quantity: number;
  readonly max: number;
  readonly legality?: DeckEntryMessage | undefined;
  readonly ownership?: DeckEntryMessage | undefined;
}
export interface DeckListProps {
  entries: readonly DeckListEntry[];
  onQuantityChange: (id: string, quantity: number) => void;
  onInspect: (id: string) => void;
  /** Shown when the deck has no cards yet. */
  emptyState: ReactNode;
}
/** The deck's contents grouped by cost, each line with an exact quantity and its own legality and ownership messages (§18). */
export function DeckList({ entries, onQuantityChange, onInspect, emptyState }: DeckListProps) {
  const t = useMessages(), n = new Intl.NumberFormat();
  if (!entries.length) return <div className={styles.empty}>{emptyState}</div>;
  const costs = [...new Set(entries.map(e => e.cost))].sort((a, b) => a - b);
  return <div className={styles.list}>{costs.map(cost => {
    const group = entries.filter(e => e.cost === cost), copies = group.reduce((sum, e) => sum + e.quantity, 0);
    return <section key={cost} className={styles.group} aria-label={t('deck.costGroup', { cost, count: copies })}>
      <h3 className={styles.groupTitle}><span>{t('deck.costHeading', { cost })}</span><span className={styles.groupCount}>{t('deck.copies', { count: copies })}</span></h3>
      {group.map(e => <DeckEntry key={e.id} name={e.name} version={e.version} inks={e.inks} cost={e.cost} quantity={e.quantity} minQuantity={0} maxQuantity={Math.max(e.max, e.quantity)}
        onQuantityChange={q => onQuantityChange(e.id, q)} onInspect={() => onInspect(e.id)} {...(e.legality ? { legality: e.legality } : {})} {...(e.ownership ? { ownership: e.ownership } : {})} />)}
      <span className={styles.hidden}>{n.format(copies)}</span>
    </section>;
  })}</div>;
}

export interface DeckHeaderProps {
  /** The format's name and policy version, for example "Core (demonstration policy)". */
  format: string;
  count: number;
  /** Required deck size from the format, never a constant (§19). */
  size: number;
  inks: readonly InkName[];
}
/** The deck's format, its count against the required size and its ink identities. */
export function DeckHeader({ format, count, size, inks }: DeckHeaderProps) {
  const t = useMessages(), n = new Intl.NumberFormat();
  return <div className={styles.header}>
    <p className={styles.format}>{format}</p>
    <p className={styles.count} data-complete={count === size || undefined}><span className={styles.countValue}>{n.format(count)}</span><span className={styles.countSize}>/ {n.format(size)}</span><span className={styles.hidden}>{t('deck.countLabel', { count, size })}</span></p>
    {inks.length > 0 && <InkIdentity inks={inks} />}
  </div>;
}

export interface CostCurveProps {
  caption: string;
  /** One column per cost, in order; the last label may read "8+". */
  data: readonly { readonly label: string; readonly count: number }[];
}
/**
 * The deck's cost curve: one neutral series as columns, square at the baseline with a rounded cap, the count on every cap
 * and no gridlines, since every value is labelled. The visual columns are hidden from assistive technology, which reads
 * the same values from a table (§18: charts expose useful values without decoration).
 */
export function CostCurve({ caption, data }: CostCurveProps) {
  const t = useMessages(), n = new Intl.NumberFormat(), max = Math.max(1, ...data.map(d => d.count)), id = useId();
  return <figure className={styles.curve} aria-labelledby={id}>
    <figcaption id={id} className={styles.caption}>{caption}</figcaption>
    <div className={styles.columns} aria-hidden="true">{data.map(d => <div key={d.label} className={styles.column}>
      <div className={styles.plot}><span className={styles.value}>{n.format(d.count)}</span><span className={styles.bar} style={{ blockSize: `${(d.count / max) * 100}%` }} /></div>
      <span className={styles.columnLabel}>{d.label}</span>
    </div>)}</div>
    <table className={styles.hidden}>
      <caption>{caption}</caption>
      <thead><tr><th scope="col">{t('deck.curveCost')}</th><th scope="col">{t('deck.curveCount')}</th></tr></thead>
      <tbody>{data.map(d => <tr key={d.label}><th scope="row">{d.label}</th><td>{n.format(d.count)}</td></tr>)}</tbody>
    </table>
  </figure>;
}

export interface DeckSummaryProps {
  curve: CostCurveProps;
  /** Facts that support deck decisions, such as "Inkable 44 of 60" (§18). */
  facts: readonly { readonly label: string; readonly value: string }[];
}
export function DeckSummary({ curve, facts }: DeckSummaryProps) {
  return <div className={styles.summary}>
    <CostCurve {...curve} />
    <dl className={styles.facts}>{facts.map(f => <div key={f.label} className={styles.fact}><dt>{f.label}</dt><dd>{f.value}</dd></div>)}</dl>
  </div>;
}

export interface ValidationIssue { readonly tone: 'danger' | 'warning' | 'information'; readonly text: ReactNode }
export interface ValidationSummaryProps {
  /** Format rules for the named policy version. */
  rules: readonly ValidationIssue[];
  /** Ownership limits: never presented as official rules restrictions (§18). */
  ownership: readonly ValidationIssue[];
  /** Advice: optional suggestions, never required. */
  advice: readonly ValidationIssue[];
  /** The policy the rules section checks against, for example "Core (demonstration policy), 2026-10". */
  policy: string;
}
const toneIcon: Record<ValidationIssue['tone'], IconName> = { danger: 'danger', warning: 'warning', information: 'info' };
/** Validation near Save, in three labelled sections so an ownership limit never reads as a rules error (§18). */
export function ValidationSummary({ rules, ownership, advice, policy }: ValidationSummaryProps) {
  const t = useMessages();
  const section = (key: 'rules' | 'ownership' | 'advice', issues: readonly ValidationIssue[]) => {
    const problems = issues.filter(i => i.tone !== 'information').length;
    return <section className={styles.section} aria-label={t(`validation.${key}`)}>
      <h3 className={styles.sectionTitle}>
        <Icon name={problems ? (key === 'rules' && issues.some(i => i.tone === 'danger') ? 'danger' : 'warning') : issues.length ? 'info' : 'success'} />
        <span>{t(`validation.${key}`)}</span>
        <span className={styles.sectionCount}>{problems ? t('validation.problems', { count: problems }) : t('validation.clear')}</span>
      </h3>
      {key === 'rules' && <p className={styles.policy}>{policy}</p>}
      {issues.length > 0 && <ul className={styles.issues}>{issues.map((issue, i) => <li key={i} className={styles.issue} data-tone={issue.tone}><Icon name={toneIcon[issue.tone]} label={t(`feedback.${issue.tone === 'danger' ? 'danger' : issue.tone}`)} /><span>{issue.text}</span></li>)}</ul>}
    </section>;
  };
  return <div className={styles.validation}>{section('rules', rules)}{section('ownership', ownership)}{section('advice', advice)}</div>;
}

export type SaveStateValue = 'unsaved' | 'saving' | 'saved' | 'conflict';
const saveIcon: Record<SaveStateValue, IconName> = { unsaved: 'pending', saving: 'refresh', saved: 'success', conflict: 'warning' };
/** Revision-aware save state (§18): unsaved, saving, saved at a revision, or a conflict needing an explicit choice. */
export function SaveState({ state, revision }: { state: SaveStateValue; revision?: number }) {
  const t = useMessages();
  return <span className={styles.save} data-state={state} role="status"><Icon name={saveIcon[state]} /><span>{state === 'saved' ? t('save.saved', { revision: revision ?? 0 }) : t(`save.${state}`)}</span></span>;
}
