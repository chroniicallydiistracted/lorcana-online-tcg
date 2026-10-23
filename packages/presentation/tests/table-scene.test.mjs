import assert from 'node:assert/strict';
import { test } from 'node:test';
import { NullEngine } from '@babylonjs/core/Engines/nullEngine.js';
import { layoutTable, mountTableScene, validateTableInput } from '../src/index.ts';

// Babylon's NullEngine simulates the renderer in Node; no image is loaded, so cards here use the neutral face.
const colours = { table: [0.97, 0.97, 0.97], zone: [0.93, 0.93, 0.93], edge: [0.78, 0.78, 0.78], focus: [0.11, 0.11, 0.11], face: [0.93, 0.93, 0.93] };
const card = (id, patch = {}) => ({ id, side: 'player', zone: 'character', slot: 0, faceUp: true, imageUrl: null, exerted: false, stackDepth: 0, atLocation: null, highlight: 'none', ...patch });
const input = {
  colours, cardBackUrl: null,
  cards: [
    card('port', { zone: 'location' }), card('bogo', { exerted: true, atLocation: 'port' }), card('kit', { slot: 1, stackDepth: 1, highlight: 'selected' }), card('claw', { slot: 2 }),
    card('express', { zone: 'item' }), card('ink-1', { zone: 'inkwell', faceUp: false }), card('deck', { zone: 'deck', faceUp: false }),
    card('wasabi', { side: 'opponent', exerted: true, highlight: 'target' }), card('hand-1', { side: 'opponent', zone: 'hand', faceUp: false }),
  ],
};
const engine = () => new NullEngine({ renderWidth: 1000, renderHeight: 600, textureSize: 256, deterministicLockstep: false, lockstepMaxSteps: 1 });
const canvas = { clientWidth: 1000 };
const mount = async (value = input) => {
  let resize, unobserved = false;
  const scene = await mountTableScene(canvas, value, { createEngine: engine, observeResize: callback => { resize = callback; return () => { unobserved = true; }; } });
  return { scene, resize: () => resize(), unobserved: () => unobserved };
};

test('scene input is validated before anything is created', async () => {
  const refuse = (value, pattern) => assert.throws(() => validateTableInput(value), pattern);
  refuse({ ...input, extra: true }, /unknown fields/);
  refuse({ ...input, colours: { ...colours, table: [1.2, 0, 0] } }, /colours.table/);
  refuse({ ...input, cards: [card('a'), card('a')] }, /repeated/);
  refuse({ ...input, cards: [card('a', { zone: 'graveyard' })] }, /unknown zone/);
  refuse({ ...input, cards: [card('a', { slot: 1.5 })] }, /invalid slot/);
  refuse({ ...input, cards: [card('a', { atLocation: 'nowhere' })] }, /not on its side/);
  refuse({ ...input, cards: [card('a', { side: 'opponent', zone: 'location' }), card('b', { atLocation: 'a' })] }, /not on its side/);
  refuse({ ...input, cards: [{ ...card('a'), secret: 'hand contents' }] }, /missing or unknown fields/);
  refuse({ ...input, cards: Array.from({ length: 161 }, (_, i) => card(String(i), { slot: i })) }, /at most 160/);
  let created = false;
  await assert.rejects(mountTableScene(canvas, { ...input, extra: true }, { createEngine: () => { created = true; return engine(); } }), /unknown fields/);
  assert.equal(created, false, 'no engine is created for invalid input');
});

test('layout keeps characters at their location, turns exerted cards and locations, and mirrors the sides', () => {
  const placed = layoutTable(input.cards), at = id => placed.find(p => p.card.id === id);
  assert.ok(at('port').x < at('bogo').x && at('bogo').x < at('kit').x, 'location, its residents, then other characters');
  assert.equal(at('port').turned, true); assert.equal(at('bogo').turned, true); assert.equal(at('kit').turned, false);
  assert.ok(at('kit').z < 0 && at('wasabi').z > 0, 'the player is nearer the camera');
  assert.deepEqual(layoutTable(input.cards), placed, 'deterministic');
});

test('renders on demand only: once after mount, once per update, once per resize, never in a loop', async () => {
  const { scene, resize } = await mount();
  assert.equal(scene.frames, 1);
  assert.equal(scene.frames, 1);
  await new Promise(resolve => setTimeout(resolve, 80));
  assert.equal(scene.frames, 1, 'no render loop');
  await scene.update({ ...input, cards: input.cards.map(c => c.id === 'claw' ? { ...c, exerted: true } : c) });
  assert.equal(scene.frames, 2);
  resize();
  assert.equal(scene.frames, 3);
  scene.dispose();
});

test('card rectangles come from the rendering camera: inside the canvas, larger for the near side, turned where turned', async () => {
  const { scene } = await mount(), rects = scene.cardRects(), rect = id => rects.find(r => r.id === id);
  assert.equal(rects.length, input.cards.length);
  for (const r of rects) { assert.ok(r.x >= 0 && r.y >= 0 && r.x + r.width <= 1000 && r.y + r.height <= 600, r.id); assert.ok(r.width >= 44 && r.height >= 44, `${r.id} hit area`); }
  assert.ok(rect('kit').y > rect('wasabi').y, 'the player\'s cards are lower on screen');
  assert.equal(rect('bogo').quarterTurns, 1); assert.ok(rect('bogo').width > rect('bogo').height);
  assert.equal(rect('kit').quarterTurns, 0); assert.ok(rect('kit').height > rect('kit').width);
  assert.deepEqual(scene.cardRects(), rects, 'stable for an unchanged frame');
  scene.dispose();
});

test('dispose releases the scene, engine and observer and is idempotent', async () => {
  for (let i = 0; i < 3; i++) {
    const { scene, unobserved } = await mount();
    scene.dispose(); scene.dispose();
    assert.equal(unobserved(), true);
    const frames = scene.frames;
    await new Promise(resolve => setTimeout(resolve, 40));
    assert.equal(scene.frames, frames);
  }
});

test('a failing engine rejects so the caller can switch to the Flat tier', async () => {
  await assert.rejects(mountTableScene(canvas, input, { createEngine: () => { throw new Error('WebGL is not available'); } }), /WebGL is not available/);
});
