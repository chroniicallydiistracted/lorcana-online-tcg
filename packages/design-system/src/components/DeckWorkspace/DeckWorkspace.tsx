import { useState } from 'react';
import type { ReactNode } from 'react';
import type { Key } from 'react-aria-components';
import { Tab, TabList, TabPanel, Tabs } from '../Tabs/Tabs.tsx';
import { useAtLeast } from '../../foundation/media.ts';
import styles from './DeckWorkspace.module.css';

export interface DeckWorkspaceProps {
  catalog: ReactNode;
  deck: ReactNode;
  catalogLabel: string;
  deckLabel: string;
  /** The deck's count, validity and Save, kept on screen with the single-pane tabs of narrower layouts. */
  summaryBar: ReactNode;
  /**
   * The InspectorHost, kept mounted so closing restores focus to the originating card. Wide layouts give it a column
   * while `inspecting`; from 64 to 80 rem it takes the catalog's place while open.
   */
  inspector?: ReactNode;
  inspecting?: boolean;
}
/**
 * The deckbuilder's working layout (§18): coordinated catalog and deck regions on wide layouts, the deck region kept in
 * view; on narrower layouts one focused pane with Catalog and Deck tabs and a persistent summary bar.
 */
export function DeckWorkspace({ catalog, deck, catalogLabel, deckLabel, summaryBar, inspector, inspecting = false }: DeckWorkspaceProps) {
  const wide = useAtLeast('wide'), [tab, setTab] = useState<Key>('catalog');
  if (wide) return <div className={styles.workspace} data-inspecting={inspecting ? '' : undefined}>
    <section className={styles.catalog} aria-label={catalogLabel}>{catalog}</section>
    <div className={styles.inspector}>{inspector}</div>
    <section className={styles.deck} aria-label={deckLabel}>{deck}</section>
  </div>;
  return <div className={styles.single}>
    <Tabs selectedKey={tab} onSelectionChange={setTab}>
      <TabList aria-label={`${catalogLabel}, ${deckLabel}`}><Tab id="catalog">{catalogLabel}</Tab><Tab id="deck">{deckLabel}</Tab></TabList>
      <TabPanel id="catalog">{catalog}</TabPanel>
      <TabPanel id="deck">{deck}</TabPanel>
    </Tabs>
    {inspector}
    <div className={styles.summaryBar}>{summaryBar}</div>
  </div>;
}

export interface DeckPanelProps {
  header: ReactNode;
  children: ReactNode;
  /** Validation and Save, pinned at the bottom of the region (§18: validation near the actions it affects). */
  footer: ReactNode;
  /** Names the footer, which scrolls when long and so takes keyboard focus, for example "Validation and save". */
  footerLabel: string;
}
/** The deck region: header, scrolling contents and a pinned footer for validation and Save. */
export function DeckPanel({ header, children, footer, footerLabel }: DeckPanelProps) {
  return <div className={styles.panel}>
    <div className={styles.panelHeader}>{header}</div>
    <div className={styles.panelBody}>{children}</div>
    <div className={styles.panelFooter} role="group" aria-label={footerLabel} tabIndex={0}>{footer}</div>
  </div>;
}
