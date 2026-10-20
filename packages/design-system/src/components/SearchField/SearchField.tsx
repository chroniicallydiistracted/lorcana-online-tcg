import { Button, Input, Label, SearchField as AriaSearchField } from 'react-aria-components';
import type { SearchFieldProps as AriaSearchFieldProps } from 'react-aria-components';
import type { ReactNode } from 'react';
import { Icon } from '../Icon/Icon.tsx';
import { FieldHelp, fieldStyles } from '../Field/Field.tsx';
import { useMessages } from '../../foundation/DesignSystemProvider.tsx';
import styles from './SearchField.module.css';
import { defined } from '../../foundation/props.ts';

export interface SearchFieldProps extends Omit<AriaSearchFieldProps, 'className' | 'style' | 'children'> {
  label: ReactNode;
  description?: ReactNode;
  /** Number of results for the current query; announced politely and shown as text. Omit while unknown. */
  resultCount?: number;
  placeholder?: string;
}
export function SearchField({ label, description, resultCount, placeholder, ...props }: SearchFieldProps) {
  const t = useMessages();
  return <AriaSearchField {...props} className={fieldStyles.field}>
    <Label className={fieldStyles.label}>{label}</Label>
    <div className={styles.row}>
      <span className={styles.leading}><Icon name="search" /></span>
      <Input className={`${fieldStyles.control} ${styles.input}`} {...defined({ placeholder })} />
      <Button className={styles.clear} aria-label={t('action.clearSearch')}><Icon name="close" /></Button>
    </div>
    <FieldHelp description={description} />
    {resultCount !== undefined && <p className={styles.count} role="status">{t('search.results', { count: resultCount })}</p>}
  </AriaSearchField>;
}
