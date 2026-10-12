import test from 'node:test';
import assert from 'node:assert/strict';
import { createQualificationMatch, ENGINE_QUALIFICATION } from '../dist/index.js';

test('Node executes precompiled server adapter without Bun or source loaders and returns no private upstream resources', () => {
  assert.equal(process.versions.node, '24.21.0'); assert.equal('Bun' in globalThis, false);
  assert.equal(ENGINE_QUALIFICATION.catalog, 'synthetic-only');
  const match = createQualificationMatch({ players: ['p1', 'p2'], startTimestamp: 0 });
  assert.equal(match.status().mode, 'qualification');
  for (const [actor, move, input] of [[match.status().choosingFirstPlayer, 'chooseWhoGoesFirst', { playerId: 'p1' }], ['p1', 'alterHand', { playerId: 'p1', cardsToMulligan: [] }], ['p2', 'alterHand', { playerId: 'p2', cardsToMulligan: [] }]]) {
    assert.equal(match.submit({ actor, expectedRevision: match.status().revision, timestamp: 0, commandId: actor + move, move, input }).accepted, true);
  }
  const result = match.submit({ actor: 'p1', expectedRevision: match.status().revision, timestamp: 0, commandId: 'concession', move: 'concede', input: {} });
  assert.equal(result.accepted, true); assert.equal(match.status().winner, 'p2');
  assert.ok(JSON.stringify(match.status()).length < 300);
  match.dispose(); assert.throws(() => match.submit({}), /disposed/);
});
