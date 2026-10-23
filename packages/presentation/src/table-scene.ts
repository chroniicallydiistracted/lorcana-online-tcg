import { Engine } from '@babylonjs/core/Engines/engine.js';
import type { AbstractEngine } from '@babylonjs/core/Engines/abstractEngine.js';
import { Scene } from '@babylonjs/core/scene.js';
import { TargetCamera } from '@babylonjs/core/Cameras/targetCamera.js';
import { HemisphericLight } from '@babylonjs/core/Lights/hemisphericLight.js';
import { DirectionalLight } from '@babylonjs/core/Lights/directionalLight.js';
import { Matrix, Vector3 } from '@babylonjs/core/Maths/math.vector.js';
import { Color3, Color4 } from '@babylonjs/core/Maths/math.color.js';
import { MeshBuilder } from '@babylonjs/core/Meshes/meshBuilder.js';
import type { Mesh } from '@babylonjs/core/Meshes/mesh.js';
import { TransformNode } from '@babylonjs/core/Meshes/transformNode.js';
import { StandardMaterial } from '@babylonjs/core/Materials/standardMaterial.js';
import { Texture } from '@babylonjs/core/Materials/Textures/texture.js';
import type { RenderOptions } from './index.ts';

/** sRGB components 0–1, as the design system's renderer tokens give them for Babylon Color3 used without conversion. */
export type Rgb = readonly [number, number, number];
export interface TableCard {
  readonly id: string;
  readonly side: 'player' | 'opponent';
  readonly zone: 'character' | 'location' | 'item' | 'inkwell' | 'deck' | 'hand';
  /** Order within the zone, from 0. */
  readonly slot: number;
  readonly faceUp: boolean;
  /** The card's thumbnail; null draws the neutral face. */
  readonly imageUrl: string | null;
  readonly exerted: boolean;
  /** Cards under this one, such as a Shift stack's base. */
  readonly stackDepth: number;
  /** The location card this character is at, on the same side. */
  readonly atLocation: string | null;
  readonly highlight: 'none' | 'selected' | 'target';
}
export interface TableSceneInput {
  readonly colours: { readonly table: Rgb; readonly zone: Rgb; readonly edge: Rgb; readonly focus: Rgb; readonly face: Rgb };
  /** The card back for face-down cards; null draws the neutral back (takedown fallback). */
  readonly cardBackUrl: string | null;
  readonly cards: readonly TableCard[];
}
export interface CardRect { readonly id: string; readonly x: number; readonly y: number; readonly width: number; readonly height: number; readonly quarterTurns: 0 | 1 }
export interface TableScene {
  /** Applies a new position and renders once its textures are ready. */
  update(input: TableSceneInput): Promise<void>;
  /** Each card's screen rectangle in CSS pixels relative to the canvas, from the camera that rendered the last frame. */
  cardRects(): readonly CardRect[];
  /** Releases the engine, scene, textures and resize observer. Idempotent. */
  dispose(): void;
  /** Frames rendered so far: on demand only, never a loop. */
  readonly frames: number;
}

const zones = ['character', 'location', 'item', 'inkwell', 'deck', 'hand'] as const;
const keys = ['id', 'side', 'zone', 'slot', 'faceUp', 'imageUrl', 'exerted', 'stackDepth', 'atLocation', 'highlight'];
const rgb = (value: unknown, name: string): Rgb => {
  if (!Array.isArray(value) || value.length !== 3 || value.some(c => typeof c !== 'number' || !(c >= 0 && c <= 1))) throw new TypeError(`${name} must be three sRGB components between 0 and 1`);
  return [value[0], value[1], value[2]];
};
/** Validates scene input before anything is created: closed fields, known zones, unique ids, real locations, at most 160 cards. */
export function validateTableInput(input: unknown): TableSceneInput {
  if (typeof input !== 'object' || input === null) throw new TypeError('Scene input must be an object');
  const { colours, cardBackUrl, cards } = input as Record<string, unknown>;
  if (Object.keys(input).some(k => !['colours', 'cardBackUrl', 'cards'].includes(k))) throw new TypeError('Scene input has unknown fields');
  if (typeof colours !== 'object' || colours === null) throw new TypeError('colours is required');
  const c = colours as Record<string, unknown>;
  const checked = { table: rgb(c.table, 'colours.table'), zone: rgb(c.zone, 'colours.zone'), edge: rgb(c.edge, 'colours.edge'), focus: rgb(c.focus, 'colours.focus'), face: rgb(c.face, 'colours.face') };
  if (cardBackUrl !== null && typeof cardBackUrl !== 'string') throw new TypeError('cardBackUrl must be a string or null');
  if (!Array.isArray(cards) || cards.length > 160) throw new TypeError('cards must be an array of at most 160 cards');
  const ids = new Set<string>();
  for (const card of cards as unknown[]) {
    if (typeof card !== 'object' || card === null) throw new TypeError('Each card must be an object');
    const k = card as Record<string, unknown>;
    if (Object.keys(k).some(key => !keys.includes(key)) || keys.some(key => !(key in k))) throw new TypeError(`Card ${String(k.id)} has missing or unknown fields`);
    if (typeof k.id !== 'string' || !k.id || ids.has(k.id)) throw new TypeError(`Card id ${String(k.id)} is missing or repeated`);
    ids.add(k.id);
    if (k.side !== 'player' && k.side !== 'opponent') throw new TypeError(`Card ${k.id} has an unknown side`);
    if (!(zones as readonly unknown[]).includes(k.zone)) throw new TypeError(`Card ${k.id} has an unknown zone`);
    if (!Number.isInteger(k.slot) || (k.slot as number) < 0 || !Number.isInteger(k.stackDepth) || (k.stackDepth as number) < 0 || (k.stackDepth as number) > 8) throw new TypeError(`Card ${k.id} has an invalid slot or stack depth`);
    if (typeof k.faceUp !== 'boolean' || typeof k.exerted !== 'boolean' || (k.imageUrl !== null && typeof k.imageUrl !== 'string')) throw new TypeError(`Card ${k.id} has invalid state`);
    if (!['none', 'selected', 'target'].includes(k.highlight as string)) throw new TypeError(`Card ${k.id} has an unknown highlight`);
  }
  for (const card of cards as TableCard[]) if (card.atLocation !== null && !(cards as TableCard[]).some(l => l.id === card.atLocation && l.zone === 'location' && l.side === card.side)) throw new TypeError(`Card ${card.id} is at a location that is not on its side`);
  return { colours: checked, cardBackUrl, cards: cards as TableCard[] };
}

// Table geometry in scene units: a card is 0.82 × 1.15 (63 × 88 mm), the player's side nearer the camera.
const W = 0.82, H = W * 88 / 63, GAP = 0.18;
interface Placed { readonly card: TableCard; readonly x: number; readonly z: number; readonly turned: boolean }
/** Deterministic layout: locations with their characters from the inline start, other characters after them, items, inkwell, deck and hand behind. */
export function layoutTable(cards: readonly TableCard[]): Placed[] {
  const out: Placed[] = [];
  for (const side of ['player', 'opponent'] as const) {
    const sign = side === 'player' ? -1 : 1, front = sign * 0.95, back = sign * 3.05, edge = sign * 4.15;
    const mine = cards.filter(c => c.side === side), width = (c: TableCard) => c.exerted || c.zone === 'location' ? H : W;
    const row: TableCard[] = [];
    for (const l of mine.filter(c => c.zone === 'location').sort((a, b) => a.slot - b.slot)) row.push(l, ...mine.filter(c => c.atLocation === l.id).sort((a, b) => a.slot - b.slot));
    row.push(...mine.filter(c => c.zone === 'character' && !c.atLocation).sort((a, b) => a.slot - b.slot));
    const total = row.reduce((n, c) => n + width(c), 0) + GAP * Math.max(0, row.length - 1);
    let x = -total / 2;
    for (const c of row) { out.push({ card: c, x: x + width(c) / 2, z: front, turned: c.exerted || c.zone === 'location' }); x += width(c) + GAP; }
    mine.filter(c => c.zone === 'item').sort((a, b) => a.slot - b.slot).forEach((c, i) => out.push({ card: c, x: 1.2 + i * (W + GAP), z: back, turned: c.exerted }));
    mine.filter(c => c.zone === 'inkwell').sort((a, b) => a.slot - b.slot).forEach((c, i) => out.push({ card: c, x: -4.9 + i * 0.42, z: back, turned: c.exerted }));
    mine.filter(c => c.zone === 'deck').forEach(c => out.push({ card: c, x: 4.6, z: back, turned: false }));
    mine.filter(c => c.zone === 'hand').sort((a, b) => a.slot - b.slot).forEach((c, i, all) => out.push({ card: c, x: (i - (all.length - 1) / 2) * 0.5, z: edge, turned: false }));
  }
  return out;
}

/**
 * Mounts the match table (UX-01, decision D27): an abstract ink-and-paper table in the theme's colours, zone surfaces,
 * one key light and a soft fill, contact shadows, card meshes textured from thumbnails (unlit, so the theme never tints
 * card art), exerted cards turned, Shift stacks offset, face-down cards with the card back, and outline frames for
 * selection and valid targets. The camera is fixed about 22° from top-down; nothing orbits, shakes or animates. It renders
 * once after mount and after each update (each time once its materials are ready) and after each resize. Any failure
 * disposes everything and rejects.
 */
export async function mountTableScene(canvas: HTMLCanvasElement, input: TableSceneInput, options: RenderOptions = {}): Promise<TableScene> {
  let current = validateTableInput(input);
  const engine: AbstractEngine = (options.createEngine ?? (element => new Engine(element, true, { preserveDrawingBuffer: false, stencil: true })))(canvas);
  let disposed = false, frames = 0, unobserve = () => {};
  // The canvas is decorative: the semantic overlay owns every interaction, so the scene takes no input and no focus.
  engine.canvasTabIndex = -1;
  const scene = new Scene(engine), textures = new Map<string, Texture>(), nodes: TransformNode[] = [], materials: StandardMaterial[] = [];
  scene.detachControl();
  if (typeof canvas.removeAttribute === 'function') canvas.removeAttribute('tabindex');
  const dispose = () => { if (disposed) return; disposed = true; unobserve(); for (const t of textures.values()) t.dispose(); scene.dispose(); engine.dispose(); };
  const render = () => { if (!disposed) { scene.render(); frames++; } };
  // Shaders compile asynchronously; an on-demand frame drawn before materials are ready shows only the clear colour.
  const renderWhenReady = async () => { await scene.whenReadyAsync(); render(); };
  try {
    const camera = new TargetCamera('fixed-table-camera', new Vector3(0, 10.2, -4.1), scene);
    camera.setTarget(new Vector3(0, 0, -0.15));
    camera.fov = 0.78;
    camera.minZ = 0.1;
    const fill = new HemisphericLight('soft-fill', new Vector3(0, 1, 0), scene);
    fill.intensity = 0.65;
    const key = new DirectionalLight('key-light', new Vector3(-0.35, -1, 0.45), scene);
    key.intensity = 0.55;
    const material = (name: string) => { const m = new StandardMaterial(name, scene); materials.push(m); return m; };
    const surface = (name: string, colour: Rgb) => { const m = material(name); m.diffuseColor = new Color3(...colour); m.specularColor = Color3.Black(); return m; };
    const unlit = (name: string, colour: Rgb) => { const m = material(name); m.disableLighting = true; m.emissiveColor = new Color3(...colour); return m; };
    const texture = (url: string) => new Promise<Texture>((resolve, reject) => {
      const known = textures.get(url);
      if (known) { resolve(known); return; }
      const t = new Texture(url, scene, false, true, Texture.TRILINEAR_SAMPLINGMODE, () => resolve(t), message => reject(new Error(`Card image failed to load: ${message ?? url}`)));
      textures.set(url, t);
    });
    const build = async (value: TableSceneInput) => {
      // Rebuilds dispose the previous meshes and materials but keep loaded card textures for reuse.
      for (const n of nodes.splice(0)) n.dispose(false, false);
      for (const m of materials.splice(0)) m.dispose(false, false);
      const c = value.colours, root = new TransformNode('table-root', scene);
      nodes.push(root);
      scene.clearColor = new Color4(...c.table, 1);
      const table = MeshBuilder.CreateGround('table', { width: 22, height: 14 }, scene);
      table.material = surface('table-material', c.table); table.parent = root;
      for (const sign of [-1, 1]) {
        const zone = MeshBuilder.CreateGround(`zone-${String(sign)}`, { width: 11.2, height: 1.9 }, scene);
        zone.position.set(0, 0.004, sign * 0.95); zone.material = surface(`zone-material-${String(sign)}`, c.zone); zone.parent = root;
        const back = MeshBuilder.CreateGround(`back-${String(sign)}`, { width: 11.2, height: 1.6 }, scene);
        back.position.set(0, 0.003, sign * 3.05); back.material = surface(`back-material-${String(sign)}`, c.zone); back.parent = root;
      }
      const divider = MeshBuilder.CreateGround('divider', { width: 10.4, height: 0.02 }, scene);
      divider.position.y = 0.006; divider.material = unlit('divider-material', c.edge); divider.parent = root;
      const shadow = material('contact-shadow');
      shadow.diffuseColor = Color3.Black(); shadow.specularColor = Color3.Black(); shadow.alpha = 0.22; shadow.disableLighting = true;
      const face = unlit('neutral-face', c.face), focus = unlit('focus-frame', c.focus), stock = unlit('card-stock', c.edge);
      const pending: Promise<unknown>[] = [];
      for (const { card, x, z, turned } of layoutTable(value.cards)) {
        const node = new TransformNode(`card-${card.id}`, scene);
        node.parent = root; node.position.set(x, 0.02 + card.stackDepth * 0.012, z);
        node.rotation.y = turned ? Math.PI / 2 : 0;
        const under = MeshBuilder.CreateGround(`shadow-${card.id}`, { width: W * 1.08, height: H * 1.06 }, scene);
        under.material = shadow; under.parent = node; under.position.set(0.05, -0.012 - card.stackDepth * 0.012, -0.04);
        for (let d = card.stackDepth; d > 0; d--) {
          const below = MeshBuilder.CreateBox(`under-${card.id}-${String(d)}`, { width: W, height: 0.01, depth: H }, scene);
          below.material = stock; below.parent = node; below.position.set(0.09 * d, -0.012 * d, 0.09 * d);
        }
        const body = MeshBuilder.CreateBox(`stock-${card.id}`, { width: W, height: 0.01, depth: H }, scene);
        body.material = stock; body.parent = node; body.position.y = -0.006;
        const top: Mesh = MeshBuilder.CreatePlane(`face-${card.id}`, { width: W, height: H }, scene);
        top.rotation.x = Math.PI / 2; top.parent = node;
        const url = card.faceUp ? card.imageUrl : value.cardBackUrl;
        if (url) {
          const m = material(`face-material-${card.id}`);
          m.disableLighting = true; top.material = m;
          pending.push(texture(url).then(t => { m.emissiveTexture = t; m.diffuseTexture = t; }));
        } else top.material = face;
        if (card.highlight !== 'none') {
          const t = card.highlight === 'selected' ? 0.05 : 0.025, pad = 0.07;
          for (const [w, d, px, pz] of [[W + pad * 2, t, 0, H / 2 + pad], [W + pad * 2, t, 0, -H / 2 - pad], [t, H + pad * 2, W / 2 + pad, 0], [t, H + pad * 2, -W / 2 - pad, 0]] as const) {
            const bar = MeshBuilder.CreateGround(`frame-${card.id}-${String(px)}-${String(pz)}`, { width: w, height: d }, scene);
            bar.material = focus; bar.parent = node; bar.position.set(px, 0.004, pz);
          }
        }
        nodes.push(node);
      }
      await Promise.all(pending);
    };
    await build(current);
    if (disposed) throw new Error('The table scene was disposed while it loaded');
    unobserve = (options.observeResize ?? (callback => { const observer = new ResizeObserver(callback); observer.observe(canvas); return () => observer.disconnect(); }))(() => { if (!disposed) { engine.resize(); render(); } });
    engine.resize();
    await renderWhenReady();
    if (disposed) throw new Error('The table scene was disposed while it loaded');
    return {
      async update(next) { current = validateTableInput(next); await build(current); await renderWhenReady(); },
      cardRects() {
        const width = engine.getRenderWidth(), height = engine.getRenderHeight(), scale = (canvas.clientWidth || width) / width;
        const viewport = camera.viewport.toGlobal(width, height), transform = scene.getTransformMatrix();
        return layoutTable(current.cards).map(({ card, x, z, turned }) => {
          const y = 0.02 + card.stackDepth * 0.012, hw = (turned ? H : W) / 2, hd = (turned ? W : H) / 2;
          const corners = [[-hw, -hd], [hw, -hd], [hw, hd], [-hw, hd]].map(([dx, dz]) => Vector3.Project(new Vector3(x + dx!, y, z + dz!), Matrix.Identity(), transform, viewport));
          const xs = corners.map(p => p.x * scale), ys = corners.map(p => p.y * scale);
          return { id: card.id, x: Math.min(...xs), y: Math.min(...ys), width: Math.max(...xs) - Math.min(...xs), height: Math.max(...ys) - Math.min(...ys), quarterTurns: turned ? 1 : 0 };
        });
      },
      dispose,
      get frames() { return frames; },
    };
  } catch (error) { dispose(); throw error; }
}
