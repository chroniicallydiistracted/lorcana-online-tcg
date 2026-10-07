import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createHttpService } from '../src/index.ts';
import { hello } from '../../contracts/tests/fixtures.mjs';

test('actual HTTP negotiation is typed, rejects unknown/coerced/oversized input and drains', async () => {
  for (const name of ['api', 'match-service']) {
    const service = createHttpService(name);
    try {
      await service.app.listen({ host: '127.0.0.1', port: 0 });
      const send = value => fetch(service.app.listeningOrigin + '/protocol/negotiate', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(value) });
      const response = await send(hello);
      assert.equal(response.status, 200);
      assert.deepEqual(await response.json(), { type: 'hello_result', requestId: hello.requestId, outcome: 'accepted', protocolVersion: 1, serverReleaseId: 'local-foundation' });
      const incompatible = await send({ ...hello, supportedProtocol: { min: 2, max: 2 } });
      assert.equal(incompatible.status, 409);
      assert.equal((await incompatible.json()).action, 'upgrade_required');
      for (const bad of [{ ...hello, privateState: 'synthetic-sensitive-value' }, { ...hello, supportedProtocol: { min: '1', max: 1 } }, { ...hello, supportedProtocol: { min: 1, max: 3 } }]) {
        const rejected = await send(bad); assert.equal(rejected.status, 400); assert.deepEqual(await rejected.json(), { code: 'invalid_request' });
      }
      const oversized = await fetch(service.app.listeningOrigin + '/protocol/negotiate', { method: 'POST', headers: { 'content-type': 'application/json' }, body: ' '.repeat(16385) });
      assert.equal(oversized.status, 413); assert.deepEqual(await oversized.json(), { code: 'invalid_request' });
      service.drain(); const drained = await send(hello); assert.equal(drained.status, 503); assert.equal((await drained.json()).outcome, 'maintenance');
    } finally { await service.app.close(); }
  }
});

test('HTTP service cannot advertise a revision without an implemented foundation codec', () => {
  for(const supportedProtocol of [{min:2,max:2},{min:1,max:2}]) assert.throws(()=>createHttpService('api',{supportedProtocol}),/Unsupported service protocol/);
});
