import { Tab as AriaTab, TabList as AriaTabList, TabPanel as AriaTabPanel, Tabs as AriaTabs } from 'react-aria-components';
import type { TabListProps, TabPanelProps, TabProps, TabsProps } from 'react-aria-components';
import styles from './Tabs.module.css';

/** Tabs with distinct selection and correct panel relationships; arrow keys move between tabs (§13). */
export function Tabs(props: Omit<TabsProps, 'className' | 'style'>) { return <AriaTabs {...props} className={styles.tabs} />; }
export function TabList<T extends object>(props: Omit<TabListProps<T>, 'className' | 'style'>) { return <AriaTabList {...props} className={styles.list} />; }
export function Tab(props: Omit<TabProps, 'className' | 'style'>) { return <AriaTab {...props} className={styles.tab} />; }
export function TabPanel(props: Omit<TabPanelProps, 'className' | 'style'>) { return <AriaTabPanel {...props} className={styles.panel} />; }
