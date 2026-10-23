import type { ReactNode } from 'react';
import { Button as AriaButton } from 'react-aria-components';
import styles from './SceneOverlay.module.css';

export interface OverlayRect { readonly id: string; readonly x: number; readonly y: number; readonly width: number; readonly height: number }
export interface OverlayObject {
  readonly id: string;
  /** The same accessible name the Flat-tier board card has. */
  readonly label: string;
  /** The same state markers as text. */
  readonly markers: readonly string[];
  readonly highlight?: 'none' | 'selected' | 'target';
  /** Where the markers go: below the card, or above it for the far side of the table so they never cover the near row. */
  readonly markerPlacement?: 'below' | 'above';
  readonly onPress: () => void;
}
export interface SceneOverlayProps {
  /** Names the overlay, for example "Battlefield". */
  label: string;
  /** Screen rectangles the scene projects for each card, in CSS pixels relative to the canvas. */
  rects: readonly OverlayRect[];
  /** Board objects in semantic order: one button each over its card. */
  objects: readonly OverlayObject[];
  /** The scene's canvas, hidden from assistive technology. */
  canvas: ReactNode;
}
/**
 * The semantic layer over the table scene (§19, §30): one real button per board object at the rectangle the scene
 * projects for its card, at least 44 px, with the same names and text markers as the Flat-tier board. The canvas is
 * decorative; keyboard, pointer, touch and screen readers all use these buttons, so the scene needs no picking.
 */
export function SceneOverlay({ label, rects, objects, canvas }: SceneOverlayProps) {
  return <div className={styles.stage}>
    <div className={styles.canvas} aria-hidden="true">{canvas}</div>
    <div className={styles.overlay} role="group" aria-label={label}>
      {objects.map(o => { const r = rects.find(x => x.id === o.id); if (!r) return null; return <div key={o.id} className={styles.item} data-highlight={o.highlight === 'none' ? undefined : o.highlight} data-markers={o.markerPlacement ?? 'below'} style={{ insetInlineStart: r.x, insetBlockStart: r.y, inlineSize: r.width, blockSize: r.height }}>
        <AriaButton className={styles.hit} onPress={o.onPress} aria-label={o.label} />
        {o.markers.length > 0 && <ul className={styles.markers} aria-hidden="true">{o.markers.map(m => <li key={m} className={styles.marker}>{m}</li>)}</ul>}
      </div>; })}
    </div>
  </div>;
}
