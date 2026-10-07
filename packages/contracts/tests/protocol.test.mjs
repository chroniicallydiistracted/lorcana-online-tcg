import assert from 'node:assert/strict';
import { test } from 'node:test';
import * as contracts from '../src/index.ts';
import { hello, command, envelope, snapshot } from './fixtures.mjs';

test('bounded protocol negotiation selects the highest mutual revision or an explicit incompatibility', () => {
  assert.equal(typeof contracts.negotiateProtocol, 'function');
  assert.equal(contracts.negotiateProtocol({ min: 1, max: 2 }, { min: 2, max: 3 }), 2);
  assert.equal(contracts.negotiateProtocol({ min: 1, max: 1 }, { min: 2, max: 2 }), null);
  for (const range of [{ min: 0, max: 1 }, { min: 2, max: 1 }, { min: 1, max: 3 }, { min: 1.5, max: 2 }, { min: 1, max: Infinity }, { min: '1', max: 1 }, { min: 1, max: 1, hidden: true }]) assert.throws(() => contracts.parseProtocolRange(range), /Invalid/);
});
test('hello contracts reject unknown and private fields, malformed IDs and uncorrelated/out-of-offer replies', () => {
  assert.equal(typeof contracts.parseHelloRequest, 'function');
  assert.deepEqual(contracts.parseHelloRequest(hello), hello);
  for (const bad of [null, {}, { ...hello, requestId: 'x'.repeat(81) }, { ...hello, clientReleaseId: '../secret' }, { ...hello, privateState: { seed: 'synthetic' } }, { ...hello, supportedProtocol: { min: 1, max: 1, token: 'synthetic' } }]) assert.throws(() => contracts.parseHelloRequest(bad), /Invalid/);
  const accepted = { type: 'hello_result', outcome: 'accepted', requestId: hello.requestId, serverReleaseId: 'server-v1', protocolVersion: 1 };
  assert.deepEqual(contracts.parseHelloResponse(accepted, hello), accepted);
  for (const bad of [{ ...accepted, requestId: 'other-request' }, { ...accepted, protocolVersion: 2 }, { ...accepted, seed: 'synthetic' }]) assert.throws(() => contracts.parseHelloResponse(bad, hello), /Invalid/);
  const upgrade = { type: 'hello_result', outcome: 'unsupported_version', requestId: hello.requestId, serverReleaseId: 'server-v2', supportedProtocol: { min: 2, max: 2 }, action: 'upgrade_required' };
  assert.deepEqual(contracts.parseHelloResponse(upgrade, hello), upgrade);
  assert.throws(() => contracts.parseHelloResponse({ ...upgrade, supportedProtocol: { min: 1, max: 1 } }, hello), /Invalid/);
});
test('client frames allow only bounded intents and safe state counters without leaking parser input', () => {
  assert.equal(typeof contracts.decodeClientFrame, 'function');
  assert.deepEqual(contracts.decodeClientFrame(JSON.stringify(hello)), hello);
  assert.deepEqual(contracts.decodeClientFrame(JSON.stringify(command)), command);
  assert.deepEqual(contracts.decodeClientFrame(JSON.stringify({ ...command, intent: { kind: 'concede' } })).intent, { kind: 'concede' });
  for (const bad of [{ ...command, expectedStateVersion: -1 }, { ...command, expectedStateVersion: Number.MAX_SAFE_INTEGER + 1 }, { ...command, intent: { kind: 'set_state', lore: 20 } }, { ...command, intent: { kind: 'concede', reward: 9 } }, { ...command, protocolVersion: 0 }]) assert.throws(() => contracts.decodeClientFrame(JSON.stringify(bad)), /Invalid/);
  for (const raw of ['{', 'null', ' '.repeat(16385), '☃'.repeat(6000)]) {
    assert.throws(() => contracts.decodeClientFrame(raw), error => /Invalid/.test(error.message) && !error.message.includes(raw.slice(0, 4)));
  }
});
test('server snapshots and all outcome variants are closed, counts-only and bounded', () => {
  assert.equal(typeof contracts.parseServerFrame, 'function');
  assert.deepEqual(contracts.parseServerFrame(snapshot), snapshot);
  const reasons = { rejected: { reason: 'forbidden' }, stale: { reason: 'stale_state' }, rate_limited: { reason: 'rate_limit', retryAfterMs: 1000 }, auth_expired: { reason: 'auth_expired' }, maintenance: { reason: 'maintenance', retryAfterMs: 1000 }, unsupported_version: { reason: 'unsupported_version', supportedProtocol: { min: 2, max: 2 }, action: 'upgrade_required' } };
  for (const outcome of ['accepted', ...Object.keys(reasons)]) {
    const receipt = { ...envelope, type: 'receipt', commandId: command.commandId, outcome, ...reasons[outcome] };
    assert.deepEqual(contracts.parseServerFrame(receipt), receipt);
  }
  for (const bad of [{ ...snapshot, stateVersion: NaN }, { ...snapshot, sequence: -1 }, { ...snapshot, privateRng: 'synthetic' }, { ...snapshot, payload: { ...snapshot.payload, cards: { hidden: 'synthetic' } } }, { ...snapshot, payload: { ...snapshot.payload, zones: [{ zoneId: 'hand', count: 1001 }] } }, { ...envelope, type: 'receipt', commandId: command.commandId, outcome: 'accepted', reason: 'forbidden' }]) assert.throws(() => contracts.parseServerFrame(bad), /Invalid/);
});
