import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { KeyboardEvent, ReactNode } from 'react';
import { Button as AriaButton } from 'react-aria-components';
import { Button, IconButton } from '../Button/Button.tsx';
import { CardImage } from '../CardTile/CardImage.tsx';
import type { Printing } from '../CardTile/types.ts';
import { InkIdentity } from '../Ink/InkIdentity.tsx';
import type { InkName } from '../Ink/InkIdentity.tsx';
import { ProgressBar } from '../Progress/Progress.tsx';
import { TextField } from '../TextField/TextField.tsx';
import { useMessages } from '../../foundation/DesignSystemProvider.tsx';
import styles from './Binder.module.css';

const fullName = (p: Printing) => p.version ? `${p.name} – ${p.version}` : p.name;

/** One pocket: a printing in a known ownership state, a loading placeholder, padding, or a printing hidden by a filter. */
export type PocketState =
  | { readonly kind: 'owned'; readonly printing: Printing; readonly normal: number; readonly foil: number }
  | { readonly kind: 'missing' | 'unknown' | 'unavailable'; readonly printing: Printing }
  | { readonly kind: 'loading' }
  | { readonly kind: 'padding' }
  | { readonly kind: 'filtered' };
export interface BinderPocketProps { pocket: PocketState; onInspect?: (printing: Printing) => void }
/**
 * A binder pocket (§17). Owned shows the card with normal and foil quantities; missing shows the card's silhouette,
 * name and number; unknown and unavailable are labelled and never read as zero; padding and filtered pockets are blank
 * and take no focus.
 */
export function BinderPocket({ pocket, onInspect }: BinderPocketProps) {
  const t = useMessages(), n = new Intl.NumberFormat();
  if (pocket.kind === 'padding') return <div className={styles.pocket} data-kind="padding" aria-hidden="true" />;
  if (pocket.kind === 'filtered') return <div className={styles.pocket} data-kind="filtered" aria-hidden="true"><span className={styles.silhouette} /></div>;
  if (pocket.kind === 'loading') return <div className={styles.pocket} data-kind="loading" aria-hidden="true"><span className={styles.silhouette} /><span className={styles.statusSkeleton} /></div>;
  const p = pocket.printing, where = `${p.setName ?? p.setCode} ${p.collectorNumber}`;
  const status = pocket.kind === 'owned' ? t('binder.ownedCounts', { normal: n.format(pocket.normal), foil: n.format(pocket.foil) }) : t(pocket.kind === 'missing' ? 'ownership.unowned' : `ownership.${pocket.kind}`);
  return <div className={styles.pocket} data-kind={pocket.kind}>
    <AriaButton className={styles.pocketButton} onPress={() => onInspect?.(p)} aria-label={`${t('action.inspect', { name: `${fullName(p)}, ${where}` })}. ${status}`}>
      {pocket.kind === 'missing'
        ? <span className={styles.missing}><span className={styles.missingName}>{p.name}</span>{p.version && <span className={styles.missingVersion}>{p.version}</span>}<span className={styles.missingNumber}>{t('binder.number', { number: p.collectorNumber })}</span></span>
        : <CardImage printing={p} decorative />}
    </AriaButton>
    <span className={styles.status} aria-hidden="true">
      {pocket.kind === 'owned' ? <><span className={styles.count}>{n.format(pocket.normal)}</span> {t('quantity.normal')} <span className={styles.dot}>·</span> <span className={styles.count}>{n.format(pocket.foil)}</span> {t('quantity.foil')}</> : status}
    </span>
  </div>;
}

export interface BinderPage {
  readonly number: number;
  /** The section this page belongs to: an ink, or special printings. Kept when artwork is unavailable (§17). */
  readonly section: string;
  readonly inks?: readonly InkName[];
  /** Nine pockets in reading order; trailing padding fills a section's last page. */
  readonly pockets: readonly PocketState[];
}
export interface BinderProps {
  /** Names the binder region, for example "Hyperia City binder". */
  label: string;
  pages: readonly BinderPage[];
  /** The page holding the anchor printing; the visible spread is the one containing it (§17: anchor, not page number). */
  page: number;
  onPageChange: (page: number) => void;
  onInspect: (printing: Printing) => void;
  /** Resolves a collector number to its page, or null when the set has no such card. */
  findCard: (number: string) => number | null;
  /** Forces a single face, for example while inspection is open beside the binder. */
  singleFace?: boolean;
}
/** Shows two faces only when both fit with usable pockets: a hidden probe holds the two-face minimum from the tokens. */
function useTwoFaces(singleFace: boolean) {
  const ref = useRef<HTMLDivElement>(null), probe = useRef<HTMLSpanElement>(null), [two, setTwo] = useState(false);
  useLayoutEffect(() => {
    const element = ref.current;
    if (!element || singleFace) { setTwo(false); return; }
    const measure = () => setTwo(element.clientWidth >= (probe.current?.offsetWidth ?? Number.POSITIVE_INFINITY));
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, [singleFace]);
  return { ref, probe, two };
}
/**
 * Set-oriented binder pages (§17): one or two faces of 3 × 3 pockets by content fit, previous and next buttons, a page
 * indicator, "Go to card number" and page keys scoped to the binder. Only the visible faces are rendered, so offscreen
 * pages are out of the focus order. Page changes fade and travel briefly; reduced motion removes the travel.
 */
export function Binder({ label, pages, page, onPageChange, onInspect, findCard, singleFace = false }: BinderProps) {
  const t = useMessages(), { ref, probe, two } = useTwoFaces(singleFace), [turn, setTurn] = useState<'forward' | 'back' | null>(null), previous = useRef(page);
  const [query, setQuery] = useState(''), [goError, setGoError] = useState<string | undefined>();
  // A key-driven turn unmounts the focused pocket; focus moves to the new spread's first pocket so keys keep working.
  const faces = useRef<HTMLDivElement>(null), refocus = useRef(false);
  const last = pages.length, first = two ? page - ((page - 1) % 2) : page, visible = pages.filter(p => p.number >= first && p.number < first + (two ? 2 : 1));
  const lastVisible = visible.at(-1)?.number ?? first, step = two ? 2 : 1;
  useEffect(() => { if (refocus.current) { refocus.current = false; faces.current?.querySelector<HTMLElement>('button')?.focus(); } }, [page, first]);
  useEffect(() => { if (page !== previous.current) { setTurn(page > previous.current ? 'forward' : 'back'); previous.current = page; const id = setTimeout(() => setTurn(null), 400); return () => clearTimeout(id); } return undefined; }, [page]);
  const go = (target: number) => onPageChange(Math.min(last, Math.max(1, target)));
  const onKeyDown = (event: KeyboardEvent) => {
    if ((event.target as HTMLElement).closest('input')) return;
    if (event.key === 'PageDown' && lastVisible < last) { event.preventDefault(); refocus.current = true; go(first + step); }
    if (event.key === 'PageUp' && first > 1) { event.preventDefault(); refocus.current = true; go(first - step); }
  };
  const submit = () => { const found = findCard(query.trim()); if (found === null) setGoError(t('binder.notFound', { number: query.trim() })); else { setGoError(undefined); onPageChange(found); } };
  return <section className={styles.binder} aria-label={label} onKeyDown={onKeyDown}>
    <div className={styles.navigation}>
      <p className={styles.indicator} aria-live="polite">{visible.length > 1 ? t('binder.pages', { first, last: lastVisible, total: last }) : t('binder.page', { page: first, total: last })}</p>
      <form className={styles.goTo} onSubmit={event => { event.preventDefault(); submit(); }}>
        <TextField label={t('binder.goTo')} value={query} onChange={value => { setQuery(value); setGoError(undefined); }} inputMode="numeric" {...(goError ? { errorMessage: goError, isInvalid: true } : {})} />
        <Button type="submit">{t('binder.go')}</Button>
      </form>
    </div>
    <div ref={ref} className={styles.fit}>
      <span ref={probe} className={styles.probe} aria-hidden="true" />
      <div className={styles.spread}>
        <IconButton icon="chevron-left" label={t('binder.previous')} variant="secondary" isDisabled={first <= 1} onPress={() => go(first - step)} />
        <div ref={faces} className={styles.faces} data-faces={visible.length} data-turn={turn ?? undefined}>
          {visible.map(face => <div key={face.number} className={styles.face} role="group" aria-label={t('binder.faceLabel', { section: face.section, page: face.number })}>
            <div className={styles.faceHeader}>{face.inks ? <InkIdentity inks={face.inks} appearance="plain" /> : <span className={styles.section}>{face.section}</span>}<span className={styles.pageNumber}>{t('binder.pageShort', { page: face.number })}</span></div>
            <div className={styles.pockets}>{face.pockets.map((pocket, i) => <BinderPocket key={i} pocket={pocket} onInspect={onInspect} />)}</div>
          </div>)}
        </div>
        <IconButton icon="chevron-right" label={t('binder.next')} variant="secondary" isDisabled={lastVisible >= last} onPress={() => go(first + step)} />
      </div>
    </div>
    <p className={styles.keys}>{t('binder.keys')}</p>
  </section>;
}

export interface PocketGridProps {
  label: string;
  pockets: readonly PocketState[];
  onInspect: (printing: Printing) => void;
  /** Shown when filters leave nothing: the cause and a way back. */
  emptyState: ReactNode;
}
/** The Collection's Grid view: the same pockets as the binder in a responsive grid, keeping search, filters and selection (§17). */
export function PocketGrid({ label, pockets, onInspect, emptyState }: PocketGridProps) {
  if (!pockets.length) return <div>{emptyState}</div>;
  return <ul className={styles.grid} aria-label={label}>{pockets.map((pocket, i) => <li key={'printing' in pocket ? pocket.printing.id : i}><BinderPocket pocket={pocket} onInspect={onInspect} /></li>)}</ul>;
}

export interface CompletionSummaryProps {
  set: string;
  /** Standard printings: the completion denominator, never recalculated from filters (§17). */
  standard: { readonly owned: number; readonly total: number } | 'unavailable';
  special: { readonly owned: number; readonly total: number } | 'unavailable';
  /** Foil availability and foil ownership are separate figures (§17). */
  foils: { readonly owned: number; readonly available: number } | 'unavailable';
}
/** Set completion with the policy denominator, special printings counted separately and foils as separate figures. */
export function CompletionSummary({ set, standard, special, foils }: CompletionSummaryProps) {
  const t = useMessages(), n = new Intl.NumberFormat();
  return <div className={styles.completion}>
    {standard === 'unavailable'
      ? <p className={styles.unavailable}>{t('binder.completionUnavailable', { set })}</p>
      : <ProgressBar label={t('binder.completion', { set })} value={standard.owned} maxValue={standard.total} valueLabel={t('binder.ownedOf', { owned: n.format(standard.owned), total: n.format(standard.total) })} />}
    <dl className={styles.figures}>
      <div><dt>{t('binder.special')}</dt><dd>{special === 'unavailable' ? t('ownership.unavailable') : t('binder.ownedOf', { owned: n.format(special.owned), total: n.format(special.total) })}</dd></div>
      <div><dt>{t('binder.foilsOwned')}</dt><dd>{foils === 'unavailable' ? t('ownership.unavailable') : n.format(foils.owned)}</dd></div>
      <div><dt>{t('binder.foilsAvailable')}</dt><dd>{foils === 'unavailable' ? t('ownership.unavailable') : n.format(foils.available)}</dd></div>
    </dl>
  </div>;
}
