import styles from './Icon.module.css';

/** One authored interface icon family: 24-unit grid, 2-unit round stroke, currentColor (standard §12). */
const shapes = {
  close: ['M6 6l12 12', 'M18 6 6 18'],
  search: ['M10.5 4a6.5 6.5 0 1 0 0 13a6.5 6.5 0 1 0 0-13', 'M15.5 15.5 20 20'],
  'chevron-down': ['m6 9 6 6 6-6'],
  'chevron-up': ['m6 15 6-6 6 6'],
  'chevron-left': ['m15 6-6 6 6 6'],
  'chevron-right': ['m9 6 6 6-6 6'],
  check: ['m5 12.5 4.5 4.5L19 7.5'],
  plus: ['M12 5v14', 'M5 12h14'],
  minus: ['M5 12h14'],
  info: ['M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18', 'M12 11v6', 'M12 7.5v.01'],
  success: ['M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18', 'm8 12.5 3 3 5-6'],
  warning: ['M12 3.5 2.8 19.5h18.4z', 'M12 10v4.5', 'M12 17v.01'],
  danger: ['M8.3 3h7.4L21 8.3v7.4L15.7 21H8.3L3 15.7V8.3z', 'M12 7.5v5.5', 'M12 16.5v.01'],
  pending: ['M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18', 'M12 7v5l3 2'],
  connection: ['M4.5 10a11 11 0 0 1 15 0', 'M7.5 13a6.5 6.5 0 0 1 9 0', 'M12 16.5v.01'],
  offline: ['M4.5 10a11 11 0 0 1 15 0', 'M7.5 13a6.5 6.5 0 0 1 9 0', 'M12 16.5v.01', 'M4 4l16 16'],
  refresh: ['M19.5 12a7.5 7.5 0 1 1-2.2-5.3', 'M19.5 4.5v4h-4'],
  more: ['M6 12v.01', 'M12 12v.01', 'M18 12v.01'],
  external: ['M14 5h5v5', 'M19 5l-8 8', 'M17 14v5H5V7h5'],
  bell: ['M6.5 16.5V11a5.5 5.5 0 0 1 11 0v5.5l1.5 2H5z', 'M10 20.5h4'],
  inspect: ['M10.5 4a6.5 6.5 0 1 0 0 13a6.5 6.5 0 1 0 0-13', 'M15.5 15.5 20 20', 'M10.5 8v5', 'M8 10.5h5'],
} as const;
export type IconName = keyof typeof shapes;
export const iconNames = Object.keys(shapes) as IconName[];

export interface IconProps {
  name: IconName;
  /** Accessible name. Omit for decorative icons next to visible text; they are then hidden from assistive technology. */
  label?: string;
  size?: 'medium' | 'small';
}
export function Icon({ name, label, size = 'medium' }: IconProps) {
  return <svg className={styles.icon} data-size={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
    role={label ? 'img' : undefined} aria-label={label} aria-hidden={label ? undefined : true} focusable="false">
    {shapes[name].map(d => <path key={d} d={d} />)}
  </svg>;
}
