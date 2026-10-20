import type { ReactNode } from 'react';
import styles from './Text.module.css';

export type TextRole = 'annotation' | 'metadata' | 'body' | 'body-strong' | 'critical';
export interface TextProps {
  /** Type role (§6). Essential instructions never use the annotation role. */
  role?: TextRole;
  as?: 'p' | 'span' | 'div';
  /** Supporting text colour for secondary information. */
  tone?: 'primary' | 'supporting';
  /** Tabular numerals for counters, quantities, timers and aligned numbers. */
  numeric?: boolean;
  children: ReactNode;
  id?: string;
}
export function Text({ role = 'body', as: Element = 'p', tone = 'primary', numeric = false, children, id }: TextProps) {
  return <Element id={id} className={styles.text} data-role={role} data-tone={tone} data-numeric={numeric || undefined}>{children}</Element>;
}

export type HeadingRole = 'subsection' | 'section' | 'room' | 'display';
export interface HeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  /** Visual role, chosen independently of the semantic level. */
  role?: HeadingRole;
  children: ReactNode;
  id?: string;
}
export function Heading({ level, role = 'section', children, id }: HeadingProps) {
  const Element = `h${level}` as const;
  return <Element id={id} className={styles.heading} data-role={role}>{children}</Element>;
}

/** Content for assistive technology that is not shown visually. */
export function VisuallyHidden({ children }: { children: ReactNode }) {
  return <span className={styles.hidden}>{children}</span>;
}
