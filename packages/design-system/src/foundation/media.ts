import { useEffect, useState } from 'react';
import { breakpoints } from '../generated/tokens.ts';

/**
 * Whether the viewport is at least a layout threshold (§11), following changes live. Components that change structure,
 * not only styling, at a threshold use this; pure styling uses the generated @value media queries.
 */
export function useAtLeast(threshold: keyof typeof breakpoints): boolean {
  const query = `(width >= ${breakpoints[threshold]})`;
  const [matches, setMatches] = useState(() => typeof matchMedia === 'function' && matchMedia(query).matches);
  useEffect(() => {
    if (typeof matchMedia !== 'function') return;
    const list = matchMedia(query), update = () => setMatches(list.matches);
    update(); list.addEventListener('change', update);
    return () => list.removeEventListener('change', update);
  }, [query]);
  return matches;
}
