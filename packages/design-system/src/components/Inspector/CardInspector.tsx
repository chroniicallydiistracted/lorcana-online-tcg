import type { ReactNode } from 'react';
import { Switch } from '../Switch/Switch.tsx';
import { Badge } from '../Badge/Badge.tsx';
import { InkIdentity } from '../Ink/InkIdentity.tsx';
import { OwnershipSummary } from '../CardTile/CardTile.tsx';
import type { Ownership, Printing } from '../CardTile/types.ts';
import { useMessages } from '../../foundation/DesignSystemProvider.tsx';
import styles from './CardInspector.module.css';

export interface PrintedBlock { readonly kind: 'ability' | 'keyword' | 'rules'; readonly heading?: string; readonly text: string }
export interface CardInspectorProps {
  printing: Printing;
  classifications?: readonly string[];
  /** Printed wording exactly as sourced; never reworded by the interface. */
  printed: readonly PrintedBlock[];
  flavor?: string;
  /** Current public modifiers and state, kept distinct from printed wording. */
  modifiers?: readonly { readonly label: string; readonly detail?: string }[];
  ownership?: Ownership;
  /** Legality and certification appropriate to the surface. */
  legality?: ReactNode;
  /** Explanatory rulings with source and version, kept distinct from printed wording. */
  rulings?: readonly { readonly text: string; readonly source: string; readonly version: string }[];
  /** Optional Interactive Card Viewer, loaded lazily by the host (§15, §32). */
  viewer?: ReactNode;
  readingMode: boolean;
  onReadingModeChange: (enabled: boolean) => void;
  /** Contextual actions such as "Add to deck". */
  actions?: ReactNode;
  headingLevel?: 2 | 3;
}
/** Structured card information with a scalable reading presentation (§7, §15). */
export function CardInspector({ printing, classifications = [], printed, flavor, modifiers = [], ownership, legality, rulings = [], viewer, readingMode, onReadingModeChange, actions, headingLevel = 2 }: CardInspectorProps) {
  const t = useMessages(), H = `h${headingLevel}` as const, S = `h${headingLevel + 1}` as 'h3' | 'h4';
  return <div className={styles.inspector} data-reading={readingMode || undefined}>
    <header className={styles.header}>
      <H className={styles.name}>{printing.name}{printing.version && <span className={styles.version}>{printing.version}</span>}</H>
      {classifications.length > 0 && <p className={styles.classification}>{classifications.join(' · ')}</p>}
      <div className={styles.identity}><InkIdentity inks={printing.inks} />{printing.finish === 'foil' && <Badge>{t('finish.foil')}</Badge>}</div>
      <Switch isSelected={readingMode} onChange={onReadingModeChange}>{t('inspector.readingMode')}</Switch>
    </header>
    {viewer && <div className={styles.viewer}>{viewer}</div>}
    <section className={styles.section} aria-labelledby={`printed-${printing.id}`}>
      <S id={`printed-${printing.id}`} className={styles.sectionTitle}>{t('inspector.printed')}</S>
      <div className={styles.printed}>{printed.map((block, i) => <p key={i} className={styles.block} data-kind={block.kind}>{block.heading && <span className={styles.blockHeading}>{block.heading} </span>}{block.text}</p>)}</div>
      {flavor && <p className={styles.flavor}><span className={styles.hidden}>{t('inspector.flavor')}: </span>{flavor}</p>}
    </section>
    {modifiers.length > 0 && <section className={styles.section} aria-labelledby={`mods-${printing.id}`}>
      <S id={`mods-${printing.id}`} className={styles.sectionTitle}>{t('inspector.modifiers')}</S>
      <ul className={styles.list}>{modifiers.map((m, i) => <li key={i}><strong>{m.label}</strong>{m.detail && <> — {m.detail}</>}</li>)}</ul>
    </section>}
    <section className={styles.section} aria-labelledby={`printing-${printing.id}`}>
      <S id={`printing-${printing.id}`} className={styles.sectionTitle}>{t('inspector.printing')}</S>
      <dl className={styles.facts}>
        <dt>{t('inspector.set')}</dt><dd>{printing.setName ?? printing.setCode}</dd>
        <dt>{t('inspector.number')}</dt><dd>{printing.collectorNumber}</dd>
        <dt>{t('inspector.rarity')}</dt><dd>{printing.rarity}</dd>
        {printing.artist && <><dt>{t('inspector.artist')}</dt><dd>{printing.artist}</dd></>}
        <dt>{t('inspector.language')}</dt><dd>{printing.language}</dd>
      </dl>
    </section>
    {ownership && <section className={styles.section} aria-labelledby={`own-${printing.id}`}><S id={`own-${printing.id}`} className={styles.sectionTitle}>{t('inspector.ownership')}</S><OwnershipSummary ownership={ownership} /></section>}
    {legality && <section className={styles.section} aria-labelledby={`legal-${printing.id}`}><S id={`legal-${printing.id}`} className={styles.sectionTitle}>{t('inspector.legality')}</S>{legality}</section>}
    {rulings.length > 0 && <section className={styles.section} aria-labelledby={`rulings-${printing.id}`}>
      <S id={`rulings-${printing.id}`} className={styles.sectionTitle}>{t('inspector.rulings')}</S>
      <ul className={styles.list}>{rulings.map((r, i) => <li key={i}>{r.text} <span className={styles.source}>({r.source}, {r.version})</span></li>)}</ul>
    </section>}
    {actions && <div className={styles.actions}>{actions}</div>}
  </div>;
}
