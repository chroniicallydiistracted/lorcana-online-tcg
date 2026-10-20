import { GridList, GridListItem } from 'react-aria-components';
import type { GridListItemProps, GridListProps } from 'react-aria-components';
import type { ReactNode } from 'react';
import styles from './List.module.css';

export interface ListProps<T extends object> extends Omit<GridListProps<T>, 'className' | 'style' | 'renderEmptyState' | 'layout'> {
  /** Honest empty state: explain the absence and a relevant next action. */
  emptyState: ReactNode;
  /** 'grid' arranges items in responsive columns with two-dimensional arrow-key navigation. */
  layout?: 'stack' | 'grid';
}
/** Interactive list or grid with stable item identity (§13). */
export function List<T extends object>({ emptyState, layout = 'stack', ...props }: ListProps<T>) {
  return <GridList {...props} layout={layout} className={styles.list} data-layout={layout} renderEmptyState={() => <div className={styles.empty}>{emptyState}</div>} />;
}
export function ListItem(props: Omit<GridListItemProps, 'className' | 'style'>) {
  return <GridListItem {...props} className={styles.item} />;
}
