import { useState } from 'react';
import type { ReactNode } from 'react';
import { ToggleButton, ToggleButtonGroup } from 'react-aria-components';
import { Button } from '../Button/Button.tsx';
import { Dialog } from '../Dialog/Dialog.tsx';
import { SearchField } from '../SearchField/SearchField.tsx';
import { Option, Select } from '../Select/Select.tsx';
import { InkIdentity, inkNames } from '../Ink/InkIdentity.tsx';
import type { InkName } from '../Ink/InkIdentity.tsx';
import { Icon } from '../Icon/Icon.tsx';
import { useAtLeast } from '../../foundation/media.ts';
import { useMessages } from '../../foundation/DesignSystemProvider.tsx';
import styles from './FilterBar.module.css';

/** Catalog filters the caller applies; `any` leaves a dimension unfiltered. Filtering never discards deck edits (§18). */
export interface CatalogFilters {
  readonly query: string;
  readonly inks: readonly InkName[];
  readonly costs: readonly number[];
  readonly type: string;
  readonly rarity: string;
  readonly set: string;
  readonly inkable: 'any' | 'inkable' | 'uninkable';
  readonly classification: string;
}
export const emptyFilters: CatalogFilters = { query: '', inks: [], costs: [], type: 'any', rarity: 'any', set: 'any', inkable: 'any', classification: 'any' };
export const activeFilterCount = (f: CatalogFilters): number => f.inks.length + f.costs.length + ['type', 'rarity', 'set', 'classification'].filter(key => f[key as 'type'] !== 'any').length + (f.inkable === 'any' ? 0 : 1);

type Choice = { readonly id: string; readonly label: string };
export interface FilterBarProps {
  filters: CatalogFilters;
  onChange: (filters: CatalogFilters) => void;
  /** Results for the current filters, shown and announced by the search field. Omit while loading. */
  resultCount?: number;
  searchLabel: string;
  /** Costs offered as toggles; the last one means "this cost or more". */
  costs: readonly number[];
  types: readonly Choice[];
  rarities: readonly Choice[];
  sets: readonly Choice[];
  classifications: readonly Choice[];
}
/**
 * Search and meaningful catalog filters (§18): ink, cost, type, rarity, set, inkability and classification. Wide layouts
 * show them inline; narrower ones keep the search in place and open the filters in a sheet (blueprint §11.4).
 */
export function FilterBar({ filters, onChange, resultCount, searchLabel, costs, types, rarities, sets, classifications }: FilterBarProps) {
  const t = useMessages(), wide = useAtLeast('wide'), [sheet, setSheet] = useState(false), active = activeFilterCount(filters);
  const set = <K extends keyof CatalogFilters>(key: K, value: CatalogFilters[K]) => onChange({ ...filters, [key]: value });
  const select = (key: 'type' | 'rarity' | 'set' | 'classification', label: string, choices: readonly Choice[]) =>
    <Select label={label} selectedKey={filters[key]} onSelectionChange={value => set(key, String(value))}>
      <Option id="any">{t('filter.any')}</Option>
      {choices.map(c => <Option key={c.id} id={c.id}>{c.label}</Option>)}
    </Select>;
  const controls: ReactNode = <div className={styles.controls}>
    <ToggleButtonGroup aria-label={t('filter.ink')} className={styles.toggles} selectionMode="multiple" selectedKeys={filters.inks} onSelectionChange={keys => set('inks', inkNames.filter(ink => keys.has(ink)))}>
      <span className={styles.groupLabel} aria-hidden="true">{t('filter.ink')}</span>
      {inkNames.map(ink => <ToggleButton key={ink} id={ink} className={styles.toggle}>{({ isSelected }) => <>{isSelected && <Icon name="check" />}<InkIdentity inks={[ink]} appearance="plain" /></>}</ToggleButton>)}
    </ToggleButtonGroup>
    <ToggleButtonGroup aria-label={t('filter.cost')} className={styles.toggles} selectionMode="multiple" selectedKeys={filters.costs.map(String)} onSelectionChange={keys => set('costs', costs.filter(cost => keys.has(String(cost))))}>
      <span className={styles.groupLabel} aria-hidden="true">{t('filter.cost')}</span>
      {costs.map((cost, i) => <ToggleButton key={cost} id={String(cost)} className={styles.toggle} aria-label={i === costs.length - 1 ? t('filter.costOrMore', { cost }) : t('filter.costExactly', { cost })}>{({ isSelected }) => <>{isSelected && <Icon name="check" />}<span className={styles.cost}>{i === costs.length - 1 ? `${cost}+` : cost}</span></>}</ToggleButton>)}
    </ToggleButtonGroup>
    <div className={styles.selects}>
      {select('type', t('filter.type'), types)}
      {select('rarity', t('filter.rarity'), rarities)}
      {select('set', t('filter.set'), sets)}
      <Select label={t('filter.inkable')} selectedKey={filters.inkable} onSelectionChange={value => set('inkable', value as CatalogFilters['inkable'])}>
        <Option id="any">{t('filter.any')}</Option><Option id="inkable">{t('symbol.inkable')}</Option><Option id="uninkable">{t('symbol.uninkable')}</Option>
      </Select>
      {select('classification', t('filter.classification'), classifications)}
    </div>
  </div>;
  return <div className={styles.bar}>
    <div className={styles.searchRow}>
      <div className={styles.search}><SearchField label={searchLabel} value={filters.query} onChange={value => set('query', value)} {...(resultCount === undefined ? {} : { resultCount })} /></div>
      {!wide && <Button icon="filter" onPress={() => setSheet(true)}>{active ? t('filter.openActive', { count: active }) : t('filter.open')}</Button>}
      {active > 0 && <Button variant="quiet" onPress={() => onChange({ ...emptyFilters, query: filters.query })}>{t('filter.reset')}</Button>}
    </div>
    {wide ? controls : <Dialog presentation="sheet" title={t('filter.title')} isOpen={sheet} onOpenChange={setSheet}
      actions={<Button variant="primary" onPress={() => setSheet(false)}>{resultCount === undefined ? t('filter.done') : t('filter.show', { count: resultCount })}</Button>}>{controls}</Dialog>}
  </div>;
}
