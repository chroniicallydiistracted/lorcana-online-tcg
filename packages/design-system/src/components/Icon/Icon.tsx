import { iconRegistry } from './registry.ts';
import styles from './Icon.module.css';

export type IconName = keyof typeof iconRegistry;
export const iconNames = Object.keys(iconRegistry) as IconName[];

export interface IconProps {
  name: IconName;
  /** Accessible name. Omit for decorative icons next to visible text; they are then hidden from assistive technology. */
  label?: string;
  /** standard: 20 px, for controls. prominent: 24 px, for prominent navigation (decision D21). */
  size?: 'standard' | 'prominent';
  /** Selected state uses the Fill weight; the label and accessible state must still convey selection. */
  selected?: boolean;
}
/** The interface icon family: Phosphor Regular from the curated registry, in currentColor (standard §12, decision D21). */
export function Icon({ name, label, size = 'standard', selected = false }: IconProps) {
  const Glyph = iconRegistry[name].icon;
  return <Glyph className={styles.icon} data-size={size} weight={selected ? 'fill' : 'regular'}
    role={label ? 'img' : undefined} aria-label={label} aria-hidden={label ? undefined : true} focusable="false" />;
}
