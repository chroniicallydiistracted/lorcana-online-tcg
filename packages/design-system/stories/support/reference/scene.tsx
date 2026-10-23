import { useEffect, useRef, useState } from 'react';
import type { TableCard, TableScene, TableSceneInput } from '@lorcana/presentation';
import { Battlefield, InlineMessage, SceneOverlay, cardBackImageUrl, useAtLeast, useDesignSystem, useOfficialAssets } from '../../../src/index.ts';
import type { BattlefieldProps, OverlayObject, OverlayRect } from '../../../src/index.ts';
import { rendererColors } from '../../../src/generated/renderer.ts';
import { printing } from './cards.ts';
import { objectCard } from './match.ts';
import type { MatchPosition } from './match.ts';

/** The theme the room shows: an explicit preference, or the system setting. */
function useResolvedTheme(): 'paper' | 'ink' {
  const { preferences } = useDesignSystem();
  const system = typeof matchMedia === 'function' && matchMedia('(prefers-color-scheme: dark)').matches ? 'ink' : 'paper';
  return preferences.theme === 'system' ? system : preferences.theme;
}

/** The scene input from the same position object the Flat-tier board and the panels read (§19). */
export function sceneInput(position: MatchPosition, theme: 'paper' | 'ink', official: boolean, highlight: (id: string) => TableCard['highlight']): TableSceneInput {
  const colour = (key: string) => rendererColors[theme][key]!.srgb;
  const board: TableCard[] = position.objects.map((o, i) => ({
    id: o.id, side: o.side, zone: o.zone, slot: i, faceUp: true, imageUrl: official ? printing(objectCard(o)).image?.src ?? null : null,
    exerted: o.exerted, stackDepth: o.under.length, atLocation: o.at ?? null, highlight: highlight(o.id),
  }));
  const hidden: TableCard[] = [];
  for (const side of ['player', 'opponent'] as const) {
    const state = position[side];
    for (let i = 0; i < state.ink; i++) hidden.push({ id: `${side}-ink-${String(i)}`, side, zone: 'inkwell', slot: i, faceUp: false, imageUrl: null, exerted: i >= state.readyInk, stackDepth: 0, atLocation: null, highlight: 'none' });
    hidden.push({ id: `${side}-deck`, side, zone: 'deck', slot: 0, faceUp: false, imageUrl: null, exerted: false, stackDepth: Math.min(8, Math.ceil(state.deck / 6)), atLocation: null, highlight: 'none' });
  }
  for (let i = 0; i < position.opponent.hand; i++) hidden.push({ id: `opponent-hand-${String(i)}`, side: 'opponent', zone: 'hand', slot: i, faceUp: false, imageUrl: null, exerted: false, stackDepth: 0, atLocation: null, highlight: 'none' });
  return { colours: { table: colour('color.canvas'), zone: colour('color.surface-raised'), edge: colour('color.border.decorative'), focus: colour('color.focus.outer'), face: colour('color.surface-raised') }, cardBackUrl: official ? cardBackImageUrl : null, cards: [...board, ...hidden] };
}

export interface SceneBattlefieldProps {
  position: MatchPosition;
  objects: readonly OverlayObject[];
  highlight: (id: string) => TableCard['highlight'];
  /** The Flat-tier board shown when the scene cannot start. */
  flat: BattlefieldProps;
  /** Forces an engine failure, to show the renderer-failure fallback. */
  failEngine?: boolean;
}
/**
 * The match battlefield as the Babylon table scene (decision D27) with the semantic overlay. The scene module loads
 * lazily, through the design system's development-only dependency on @lorcana/presentation. If the engine, a texture or
 * the context fails, the Flat-tier board takes over with an explanation (§21, §30). Below 80 rem the scene's cards would
 * be too small for legible markers, so the reference adapts to the Flat tier; WEB-01 owns real tier selection.
 */
export function SceneBattlefield({ position, objects, highlight, flat, failEngine = false }: SceneBattlefieldProps) {
  const theme = useResolvedTheme(), official = useOfficialAssets(), roomy = useAtLeast('expanded'), canvas = useRef<HTMLCanvasElement>(null), scene = useRef<TableScene | null>(null);
  const [rects, setRects] = useState<readonly OverlayRect[]>([]), [failure, setFailure] = useState<string | null>(null);
  const input = sceneInput(position, theme, official, highlight), key = JSON.stringify(input);
  useEffect(() => {
    let cancelled = false, observer: ResizeObserver | undefined;
    const element = canvas.current;
    if (!element) return;
    void import('@lorcana/presentation').then(({ mountTableScene }) => mountTableScene(element, input, failEngine ? { createEngine: () => { throw new Error('WebGL is not available in this browser.'); } } : {}))
      .then(mounted => {
        if (cancelled) { mounted.dispose(); return; }
        scene.current = mounted; setRects(mounted.cardRects());
        observer = new ResizeObserver(() => requestAnimationFrame(() => { if (scene.current) setRects(scene.current.cardRects()); }));
        observer.observe(element);
        element.addEventListener('webglcontextlost', () => { scene.current?.dispose(); scene.current = null; setFailure('The graphics context was lost.'); });
      })
      .catch((error: unknown) => { if (!cancelled) setFailure(error instanceof Error ? error.message : String(error)); });
    return () => { cancelled = true; observer?.disconnect(); scene.current?.dispose(); scene.current = null; };
    // Mount once per tier; later positions go through update().
  }, [failEngine, roomy]);
  useEffect(() => { const s = scene.current; if (s) void s.update(input).then(() => setRects(s.cardRects())).catch((error: unknown) => setFailure(error instanceof Error ? error.message : String(error))); }, [key]);
  if (!roomy) return <Battlefield {...flat} />;
  if (failure) return <div>
    <div style={{ padding: 'var(--is-space-3) var(--is-space-3) 0' }}><InlineMessage tone="warning" title="The table scene could not start.">{`${failure} The flat table below shows the same cards, states and actions.`}</InlineMessage></div>
    <Battlefield {...flat} />
  </div>;
  return <SceneOverlay label="Battlefield cards" rects={rects} objects={objects} canvas={<canvas ref={canvas} />} />;
}
