import type { ReactNode } from 'react';
import styles from './Layout.module.css';

export type Space = 0 | 1 | 2 | 3 | 4 | 6 | 8 | 12 | 16;
interface FlowProps { gap?: Space; children: ReactNode; as?: 'div' | 'section' | 'ul' | 'ol'; align?: 'start' | 'center' | 'end' | 'stretch' }
/** Vertical flow with a spacing-scale gap (§11). */
export function Stack({ gap = 4, children, as: Element = 'div', align = 'stretch' }: FlowProps) {
  return <Element className={styles.stack} data-gap={gap} data-align={align}>{children}</Element>;
}
/** Horizontal flow that wraps, with a spacing-scale gap (§11). */
export function Inline({ gap = 2, children, as: Element = 'div', align = 'center' }: FlowProps) {
  return <Element className={styles.inline} data-gap={gap} data-align={align}>{children}</Element>;
}
export interface SurfaceProps {
  level?: 'canvas' | 'surface' | 'raised';
  /** Essential border when the surface boundary carries meaning. */
  bordered?: boolean;
  padded?: boolean;
  children: ReactNode;
  as?: 'div' | 'section' | 'article' | 'aside';
  'aria-labelledby'?: string;
}
/** Tonal surface. Borders and tone carry layering; shadows are reserved for overlays (§12). */
export function Surface({ level = 'surface', bordered = false, padded = true, children, as: Element = 'div', ...rest }: SurfaceProps) {
  return <Element className={styles.surface} data-level={level} data-bordered={bordered || undefined} data-padded={padded || undefined} {...rest}>{children}</Element>;
}
