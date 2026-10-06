import assert from 'node:assert/strict';
import { test } from 'node:test';
import * as contracts from '../src/index.ts';

test('public diagnostics reject private data and malformed service responses', () => {
  assert.equal(typeof contracts.parseReadiness, 'function');
  const publicReady = { service: 'api', status: 'ready', scope: 'foundation' };
  assert.deepEqual(contracts.parseReadiness(publicReady), publicReady);
  for (const value of [null, {}, { ...publicReady, service: 'worker' }, { ...publicReady, status: 'up' }, { ...publicReady, secret: 'synthetic-forbidden' }]) {
    assert.throws(() => contracts.parseReadiness(value), /Invalid readiness/);
  }
});
