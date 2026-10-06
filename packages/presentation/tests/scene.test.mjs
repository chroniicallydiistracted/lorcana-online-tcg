import assert from 'node:assert/strict';
import { test } from 'node:test';
import { NullEngine } from '@babylonjs/core/Engines/nullEngine.js';
import * as presentation from '../src/index.ts';

test('synthetic scene renders and releases meshes and engine through repeatable mount/dispose', async () => {
  assert.equal(typeof presentation.mountSanityScene, 'function');
  for (let i = 0; i < 3; i++) {
    const engine = new NullEngine();
    let resize;
    let unsubscribed = false;
    const session = presentation.mountSanityScene({}, { createEngine: () => engine, observeResize: callback => { resize = callback; return () => { unsubscribed = true; }; } });
    assert.equal(session.scene.meshes.length, 4);
    assert.ok(session.scene.activeCamera);
    session.scene.render();
    resize();
    await new Promise(resolve => setTimeout(resolve, 60));
    assert.ok(session.frames > 0);
    session.dispose();
    const frames = session.frames;
    assert.equal(session.scene.isDisposed, true);
    assert.equal(unsubscribed, true);
    await new Promise(resolve => setTimeout(resolve, 60));
    assert.equal(session.frames, frames);
    session.dispose();
  }
});
