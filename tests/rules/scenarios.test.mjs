import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

// A missing harness is an explicit acceptance failure, rather than an uncaught
// loader error. Once present, every case below exercises real runtime commands.
const tooling = await import('../../scripts/rules/scenario-build.mjs').catch(() => ({}));
test('RULE-04: sourced synthetic quest runs under the compiled Node runtime', async () => {
  assert.equal(typeof tooling.withScenarioRuntime, 'function', 'RULE-04 Node scenario harness is missing');
  await tooling.withScenarioRuntime(async ({ createScenarioRuntime }) => {
    const match = createScenarioRuntime({ cards: [{ id: 'hero', owner: 'p1', zone: 'play', lore: 2 }], lore: { p1: 3, p2: 0 } });
    const result = match.submit('p1', 'quest', { cardId: 'hero' });
    assert.equal(result.accepted, true, result.code);
    assert.equal(match.snapshot().G.lore.p1, 5);
    assert.equal(match.snapshot().ctx.zones.private.cardMeta.hero.state, 'exerted');
  });
});

const suite = JSON.parse(readFileSync(new URL('./fixtures/scenarios.json', import.meta.url)));
const at = (state, path) => path.split('.').reduce((value, key) => value?.[key], state);
function checks(state, assertions) {
  for (const assertion of assertions) {
    const actual = at(state, assertion.path);
    if ('falsey' in assertion) assert.equal(Boolean(actual), false, assertion.path);
    else if ('equals' in assertion) assert.deepEqual(actual, assertion.equals, assertion.path);
    else assert.equal(actual?.length, assertion.count, assertion.path);
  }
}
function resolveArguments(value, state) {
  if (Array.isArray(value)) return value.map(child => resolveArguments(child, state));
  if (value && typeof value === 'object') {
    if ('bag_source' in value) {
      const items = state.G.triggeredAbilities?.bag.items.filter(item => item.sourceId === value.bag_source) ?? [];
      if ('bag_index' in value) {
        assert(items.length > value.bag_index, 'Requested fixture bag entry is absent');
        return items[value.bag_index].id;
      }
      assert.equal(items.length, 1, 'Fixture must select exactly one pending bag entry');
      return items[0].id;
    }
    if ('pending_index' in value) {
      const pending = state.G.pendingEffects[value.pending_index];
      assert(pending, 'Requested fixture pending effect is absent');
      return pending.id;
    }
    return Object.fromEntries(Object.entries(value).map(([key, child]) => [key, resolveArguments(child, state)]));
  }
  return value;
}
test('RULE-04 representative sourced runtime scenarios', async t => {
  assert.equal(typeof tooling.withScenarioRuntime, 'function', 'RULE-04 Node scenario harness is missing');
  await tooling.withScenarioRuntime(async ({ createScenarioRuntime, assertScenarioState, chosenOperationGroups }) => {
    for (const scenario of suite.scenarios) await t.test(scenario.id + ': ' + scenario.title, () => {
      const fixture = JSON.parse(JSON.stringify(scenario.fixture));
      for (const owner of ['p1', 'p2']) if (!fixture.cards.some(card => card.owner === owner && card.zone === 'deck')) {
        fixture.cards.push(...Array.from({ length: 3 }, (_, index) => ({ id: owner + '-deck-' + index, owner, zone: 'deck' })));
      }
      const match = createScenarioRuntime(fixture);
      const ids = fixture.cards.map(card => card.id);
      assertScenarioState(match.snapshot(), ids);
      if (scenario.projection_checks) checks(match.project("p1"), scenario.projection_checks);
      for (const step of scenario.steps) {
        const prior = match.snapshot();
        const result = match.submit(step.actor, step.move, resolveArguments(step.args, prior), step.revision, step.role);
        assert.equal(result.accepted, step.accepted, step.move + ': ' + result.code);
        if (step.code) assert.equal(result.code, step.code);
        if (!step.accepted) assert.deepEqual(match.snapshot(), prior, 'Rejected intent must preserve committed state');
        checks(match.snapshot(), step.checks);
        assertScenarioState(match.snapshot(), ids);
      }
      checks(match.snapshot(), scenario.checks);
    });
    await t.test('Invalid snapshots are detected independently of move acceptance', () => {
      const match = createScenarioRuntime({ cards: [{ id: 'hero', owner: 'p1', zone: 'play' }] });
      const original = match.snapshot();
      const corrupt = mutate => {
        const state = JSON.parse(JSON.stringify(original));
        mutate(state);
        assert.throws(() => assertScenarioState(state, ['hero']));
      };
      corrupt(state => state.ctx.zones.private.zoneCards['hand:p1'].push('hero'));
      corrupt(state => state.ctx.zones.private.cardIndex.hero.zoneKey = 'hand:p1');
      corrupt(state => state.ctx.zones.private.cardMeta.hero.cardsUnder = ['hero']);
      corrupt(state => state.G.inkDrops = { p1: -1 });
      corrupt(state => state.ctx.zones.private.zoneCards['play:p1'].pop());
    });
    await t.test('Choice grouping scopes prior slots and never fabricates a missing choice', () => {
      assert.deepEqual(chosenOperationGroups({ type: 'deal-damage', target: 'CHOSEN_CHARACTER' }, {
        targets: ['later'], slottedTargets: { kind: 'move-damage', from: ['prior'], to: ['prior'] },
      }), [['later']]);
      const groups = chosenOperationGroups({ type: 'move-damage', from: 'CHOSEN_OPPOSING_CHARACTER', to: 'CHOSEN_CHARACTER' }, { targets: ['first'] });
      assert.deepEqual(groups[0], ['first']);
      assert.equal(groups[1].filter(value => typeof value === 'string').length, 0);
      assert.deepEqual(chosenOperationGroups({ type: 'return-to-hand', target: { ref: 'previous-target' } }, { targets: ['prior'] }), []);
    });
  });
});
