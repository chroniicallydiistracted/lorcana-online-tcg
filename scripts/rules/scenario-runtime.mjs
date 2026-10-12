// Test-only manipulated fixtures. Never imported by an app or public package.
import assert from 'node:assert/strict';
import { MatchRuntime } from '../../vendor/tcg-engines/upstream/submodules/lorcana/packages/lorcana/lorcana-engine/src/core/runtime/match-runtime.ts';
import { lorcanaRuntimeConfig } from '../../vendor/tcg-engines/upstream/submodules/lorcana/packages/lorcana/lorcana-engine/src/runtime-game/definition.ts';
import { createRecordCardCatalog } from '../../vendor/tcg-engines/upstream/submodules/lorcana/packages/lorcana/lorcana-engine/src/core/runtime/static-resources.ts';

export { chosenOperationGroups } from '../../vendor/tcg-engines/upstream/submodules/lorcana/packages/lorcana/lorcana-engine/src/runtime-moves/resolution/action-effects/vanish.ts';

const players = ['p1', 'p2'];
const zones = ['deck', 'hand', 'play', 'inkwell', 'discard', 'limbo'];
const copy = value => JSON.parse(JSON.stringify(value));
const randomSource = { random: index => index % 32 / 32, integer: (index, bound) => index % bound, identifier: (_domain, index) => index.toString(16).padStart(64, '0') };

// Test oracle, not a production restoration validator. Under-cards remain in
// limbo and must also have a unique, reciprocal stack association.
export function assertScenarioState(state, expectedIds) {
  const privateZones = state.ctx.zones.private, seen = new Set(), under = new Set();
  for (const [zone, ids] of Object.entries(privateZones.zoneCards)) {
    assert.equal(state.ctx.zones.public.zoneSummaries[zone].count, ids.length, 'Zone summary mismatch');
    for (const id of ids) {
      assert(!seen.has(id), 'Duplicate physical card');
      seen.add(id);
      assert.equal(privateZones.cardIndex[id]?.zoneKey, zone, 'Card index mismatch');
    }
  }
  assert.deepEqual([...seen].sort(), [...expectedIds].sort(), 'Card conservation failure');
  assert.deepEqual(Object.keys(privateZones.cardIndex).sort(), [...expectedIds].sort(), 'Unknown index card');
  for (const [parent, meta] of Object.entries(privateZones.cardMeta)) {
    for (const id of meta.cardsUnder ?? []) {
      assert(id !== parent && seen.has(id) && !under.has(id), 'Invalid under-card association');
      under.add(id);
      assert(privateZones.cardIndex[id].zoneKey.startsWith('limbo:'), 'Under-card must be in limbo');
      assert.equal(privateZones.cardMeta[id]?.stackParentId, parent, 'Stack parent mismatch');
    }
    if (meta.stackParentId) assert(privateZones.cardMeta[meta.stackParentId]?.cardsUnder?.includes(parent), 'Orphan under-card');
  }
  for (const amount of Object.values(state.G.inkDropCounters ?? {})) assert(Number.isSafeInteger(amount) && amount >= 0, 'Invalid counter pool');
}

export function createScenarioRuntime(fixture) {
  const definitions = {}, owners = { p1: [], p2: [] }, cardInstances = {};
  for (const card of fixture.cards) {
    assert(!cardInstances[card.id], 'Duplicate fixture instance');
    assert(players.includes(card.owner) && zones.includes(card.zone), 'Invalid fixture owner/zone');
    owners[card.owner].push(card.id);
    cardInstances[card.id] = card.id;
    definitions[card.id] = { id: card.id, canonicalId: 'synthetic-' + card.id, slug: card.id, printings: [],
      name: 'Synthetic ' + card.id, cardType: 'character', cost: 1, inkType: ['amber'], inkable: true,
      strength: 2, willpower: 4, lore: 1, classifications: ['Storyborn'], set: 'TST', rarity: 'common',
      abilities: [], cardNumber: 1, i18n: { en: { name: 'Synthetic ' + card.id } }, ...card };
  }
  let now = 0, command = 0;
  const runtime = new MatchRuntime({ ...lorcanaRuntimeConfig, randomSource, now: () => now, rulesetIdentity: 'RULE-04-test-only' }, {
    players: players.map(id => ({ id })), seed: 'injected-fixture', matchID: 'rule04-fixture', gameID: 'rule04-game',
    choosingFirstPlayer: 'p1', cardCatalog: createRecordCardCatalog('RULE-04-synthetic', definitions), cardsMaps: { owners, cardInstances }, capturePatches: false,
  });
  const state = copy(runtime.getState());
  if (!fixture.setup) {
  for (const player of players) for (const zone of zones) {
    const key = zone + ':' + player;
    state.ctx.zones.private.zoneCards[key] = [];
    state.ctx.zones.public.zoneSummaries[key] = { count: 0, revision: 0 };
  }
  state.ctx.zones.private.cardIndex = {};
  state.ctx.zones.private.cardMeta = {};
  for (const card of fixture.cards) {
    const key = card.zone + ':' + card.owner, ids = state.ctx.zones.private.zoneCards[key];
    state.ctx.zones.private.cardIndex[card.id] = { zoneKey: key, index: ids.length, ownerID: card.owner, controllerID: card.owner };
    ids.push(card.id);
    state.ctx.zones.public.zoneSummaries[key].count = ids.length;
    state.ctx.zones.private.cardMeta[card.id] = { state: 'ready', damage: 0, ...(card.zone === 'play' ? { isDrying: false } : {}), ...card.meta };
  }
  state.G.lore = { p1: 0, p2: 0, ...fixture.lore };
  if (fixture.inkDropCounters) state.G.inkDropCounters = copy(fixture.inkDropCounters);
  state.ctx.status = { ...state.ctx.status, turn: 1, phase: 'main', step: '', gameSegment: 'mainGame', otp: 'p1', choosingFirstPlayer: undefined, pendingMulligan: undefined };
  state.ctx.priority.holder = 'p1';
  state.ctx.priority.windowOpen = true;
  runtime.loadState(state);
  }
  return {
    snapshot: () => copy(runtime.getState()),
    submit(actor, move, args, revision = runtime.getCurrentStateID(), role = 'player') {
      now += 1;
      const inputArgs = move === 'chooseWhoGoesFirst' ? args : { ...args, playerId: actor };
      const result = runtime.processCommand({ commandID: 'scenario-' + (++command), move, input: { args: inputArgs } }, actor, revision, now, role);
      return { accepted: result.success, code: result.success ? null : result.errorCode, events: copy(runtime.getPublishedGameEvents()) };
    },
    legal: actor => copy(runtime.enumerateMovesForPlayer(actor, 'player')),
  };
}
