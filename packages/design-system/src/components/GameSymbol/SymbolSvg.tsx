import { createElement } from 'react';
import type { SymbolData } from '../../generated/symbols.ts';

/** Renders generated symbol data as inline SVG; single-colour symbols inherit currentColor. */
export function SymbolSvg({ data, className, label, size }: { data: SymbolData; className: string; label?: string | undefined; size?: string | undefined }) {
  return <svg className={className} data-size={size} viewBox={data.viewBox} fill="currentColor"
    role={label ? 'img' : undefined} aria-label={label} aria-hidden={label ? undefined : true} focusable="false">
    {data.shapes.map((shape, i) => createElement(shape.tag, { key: i, ...shape.attrs }))}
  </svg>;
}
