import test from 'node:test';
import assert from 'node:assert/strict';
import { createLabMatch, assessEngineAdmission } from '../src/index.ts';

test('qualification input bounds sparse arrays, aggregate size, keys and accessors before engine execution', () => {
  const match = createLabMatch({ mode: 'qualification', fixture: 'synthetic', seed: 'bounds', players: ['p1', 'p2'] });
  const submit = input => match.submit({ actor: 'p1', expectedRevision: match.status().revision, timestamp: 0, commandId: 'bounds', move: 'unknown', input });
  try {
    for (const input of [{ huge: Array(10000) }, { ['x'.repeat(5000)]: 1 }, { texts: Array(20).fill('x'.repeat(4096)) }]) assert.throws(() => submit(input), /limits|key|JSON/);
    let invoked = false;
    const accessor = { get data() { invoked = true; return 1; } };
    assert.throws(() => submit(accessor), /JSON/); assert.equal(invoked, false);
  } finally { match.dispose(); }
});

test('synthetic match commands run on Node with player authority, stale rejection, terminal winner and idempotent disposal', () => {
  const match = createLabMatch({ mode: 'advanced-sandbox', fixture: 'synthetic', seed: 'rule-02-fixture', players: ['p1', 'p2'] });
  const first = match.status();
  assert.equal(first.ended, false); assert.equal(first.rewardEligible, false);
  assert.deepEqual(Object.keys(first).sort(), ['ended', 'mode', 'revision', 'rewardEligible', 'winner']);
  assert.equal(match.submit({ actor: 'unknown', expectedRevision: first.revision, timestamp: 0, commandId: '1', move: 'concede', input: {} }).code, 'INVALID_ACTOR');
  assert.equal(match.submit({ actor: 'p1', expectedRevision: first.revision + 1, timestamp: 0, commandId: '2', move: 'concede', input: {} }).code, 'STALE_REVISION');
  assert.equal(match.submit({ actor: 'p1', expectedRevision: first.revision, timestamp: 0, commandId: '3', move: 'forfeitGame', input: { winnerId: 'p1' } }).accepted, false);
  assert.equal(match.status().revision, first.revision);
  for (const [actor, move, input] of [['p1', 'chooseWhoGoesFirst', { playerId: 'p1' }], ['p1', 'alterHand', { playerId: 'p1', cardsToMulligan: [] }], ['p2', 'alterHand', { playerId: 'p2', cardsToMulligan: [] }]]) {
    assert.equal(match.submit({ actor, expectedRevision: match.status().revision, timestamp: 0, commandId: actor + move, move, input }).accepted, true);
  }
  assert.equal(match.submit({ actor: 'p1', expectedRevision: match.status().revision, timestamp: 0, commandId: 'judge-probe', move: 'forfeitGame', input: { winnerId: 'p1' } }).accepted, false);
  assert.equal(match.submit({ actor: 'p1', expectedRevision: match.status().revision, timestamp: 0, commandId: '4', move: 'concede', input: {} }).accepted, true);
  assert.equal(match.status().winner, 'p2'); assert.equal(match.status().ended, true);
  assert.equal(match.submit({ actor: 'p2', expectedRevision: match.status().revision, timestamp: 0, commandId: '5', move: 'concede', input: {} }).code, 'MATCH_ENDED');
  match.dispose(); match.dispose(); assert.throws(() => match.status(), /disposed/);
  assert.throws(() => createLabMatch({ mode: 'ordinary-lab', fixture: 'synthetic', seed: 'seed', players: ['p1', 'p2'] }), /mode/);
  assert.throws(() => createLabMatch({ mode: 'advanced-sandbox', fixture: 'synthetic', seed: 'seed', players: ['p1', 'p1'] }), /players/);
});

test('October rules and set dates never grant unqualified rules/catalog or hidden/economic admission', () => {
  const request = { asOf: '2026-10-15', mode: 'collection', rulesVersion: '2.3.0', sets: ['014'], rewards: true, hiddenState: true };
  const before = assessEngineAdmission(request);
  assert.equal(before.allowed, false); assert.equal(before.rules230Phase, 'scheduled'); assert.equal(before.set14Phase, 'scheduled');
  const effective = assessEngineAdmission({ ...request, asOf: '2026-10-16' });
  assert.equal(effective.allowed, false); assert.equal(effective.rules230Phase, 'effective'); assert.equal(effective.set14Phase, 'prerelease');
  const released = assessEngineAdmission({ ...request, asOf: '2026-10-23' });
  assert.equal(released.allowed, false); assert.equal(released.set14Phase, 'general_release');
  assert.ok(released.reasons.includes('RULES_UNCERTIFIED')); assert.ok(released.reasons.includes('CATALOG_UNQUALIFIED'));
  assert.ok(released.reasons.includes('REWARDS_UNQUALIFIED')); assert.ok(released.reasons.includes('VIEWER_PROJECTION_PENDING'));
  assert.equal(assessEngineAdmission({ ...request, rulesVersion: '2.2.0', sets: ['001'] }).allowed, false);
  assert.equal(assessEngineAdmission({ asOf: '2026-10-10', mode: 'advanced-sandbox', rulesVersion: 'synthetic-fixture', sets: ['TST'], rewards: false, hiddenState: false }).allowed, true);
  assert.throws(() => assessEngineAdmission({ ...request, asOf: '2026-02-30' }), /date/);
  assert.throws(() => assessEngineAdmission({ ...request, mode: 'qualification', rulesVersion: 'synthetic-fixture', sets: Array(1), rewards: false, hiddenState: false }), /JSON|admission/);
});
