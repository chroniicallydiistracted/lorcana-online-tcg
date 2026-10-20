import { Cell as AriaCell, Column as AriaColumn, Row as AriaRow, Table as AriaTable, TableBody as AriaTableBody, TableHeader as AriaTableHeader } from 'react-aria-components';
import type { CellProps, ColumnProps, RowProps, TableBodyProps, TableHeaderProps, TableProps } from 'react-aria-components';
import type { ReactNode } from 'react';
import styles from './Table.module.css';

/** Data table with sorting, selection and keyboard navigation (§13). Numbers use tabular numerals. */
export function Table(props: Omit<TableProps, 'className' | 'style'>) { return <div className={styles.scroll}><AriaTable {...props} className={styles.table} /></div>; }
export function TableHeader<T extends object>(props: Omit<TableHeaderProps<T>, 'className' | 'style'>) { return <AriaTableHeader {...props} className={styles.header} />; }
export function Column({ numeric = false, ...props }: Omit<ColumnProps, 'className' | 'style'> & { numeric?: boolean }) { return <AriaColumn {...props} className={styles.column} data-numeric={numeric || undefined} />; }
export function TableBody<T extends object>({ emptyState, ...props }: Omit<TableBodyProps<T>, 'className' | 'style' | 'renderEmptyState'> & { emptyState: ReactNode }) {
  return <AriaTableBody {...props} className={styles.body} renderEmptyState={() => <div className={styles.empty}>{emptyState}</div>} />;
}
export function Row<T extends object>(props: Omit<RowProps<T>, 'className' | 'style'>) { return <AriaRow {...props} className={styles.row} />; }
export function Cell({ numeric = false, ...props }: Omit<CellProps, 'className' | 'style'> & { numeric?: boolean }) { return <AriaCell {...props} className={styles.cell} data-numeric={numeric || undefined} />; }
