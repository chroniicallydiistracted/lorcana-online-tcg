import assert from 'node:assert/strict';
import { test } from 'node:test';
import * as services from '../src/index.ts';

test('HTTP service serves scoped diagnostics, rejects unknown routes, and drains readiness', async () => {
  assert.equal(typeof services.createHttpService, 'function');
  for (const name of ['api', 'match-service']) {
    const service = services.createHttpService(name);
    try {
      await service.app.listen({ host: '127.0.0.1', port: 0 });
      const base = service.app.listeningOrigin;
      const live = await fetch(`${base}/healthz`);
      assert.equal(live.status, 200);
      assert.deepEqual(await live.json(), { service: name, status: 'up', scope: 'foundation' });
      const ready = await fetch(`${base}/readyz`);
      assert.equal(ready.status, 200);
      assert.deepEqual(await ready.json(), { service: name, status: 'ready', scope: 'foundation' });
      assert.equal((await fetch(`${base}/matches`)).status, 404);
      assert.equal((await fetch(`${base}/healthz`, { method: 'POST' })).status, 404);
      assert.equal((await fetch(`${base}/healthz`, { headers: { Origin: 'https://untrusted.invalid' } })).headers.get('access-control-allow-origin'), null);
      service.drain();
      assert.equal((await fetch(`${base}/healthz`)).status, 200);
      const drained = await fetch(`${base}/readyz`);
      assert.equal(drained.status, 503);
      assert.deepEqual(await drained.json(), { service: name, status: 'not_ready', scope: 'foundation' });
    } finally { await service.app.close(); }
  }
});
