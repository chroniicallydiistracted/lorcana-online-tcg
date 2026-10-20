import type { InkName } from '../Ink/InkIdentity.tsx';

/** One printing of a card (identity), separate from gameplay identity and ownership. */
export interface Printing {
  readonly id: string;
  readonly name: string;
  readonly version?: string;
  readonly inks: readonly InkName[];
  readonly setCode: string;
  readonly setName?: string;
  readonly collectorNumber: string;
  readonly rarity: string;
  readonly finish: 'normal' | 'foil';
  readonly language: string;
  readonly artist?: string;
  /** Card image rendition. Intrinsic dimensions reserve layout before loading (§29). */
  readonly image?: { readonly src: string; readonly width: number; readonly height: number; readonly alt: string };
}
/** Ownership is never inferred from catalog visibility; unavailable never becomes zero (§17). */
export type Ownership =
  | { readonly state: 'owned'; readonly normal: number; readonly foil: number }
  | { readonly state: 'unowned' }
  | { readonly state: 'unknown' }
  | { readonly state: 'loading' }
  | { readonly state: 'unavailable' };
