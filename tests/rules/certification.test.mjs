import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const certification = await import('../../scripts/rules/certification.mjs').catch(() => ({}));
const template = JSON.parse(readFileSync(new URL('../../docs/templates/card-certification.json', import.meta.url)));
test('a per-card template cannot be promoted to tested without bound execution and coverage', () => {
  assert.equal(typeof certification.validateCardCertification, 'function', 'Per-card certification gate is missing');
  assert.doesNotThrow(() => certification.validateCardCertification(template));
  assert.throws(() => certification.validateCardCertification({ ...template, status: 'tested' }), /certification/i);
});
test('a forged admission status cannot bypass later queue policies', () => {
  assert.equal(typeof certification.validateCardCertification, 'function', 'Per-card certification gate is missing');
  assert.throws(() => certification.validateCardCertification({ ...template, status: 'admitted' }), /certification/i);
});

test('scenario oracles reject missing or duplicate IDs, wrong rules and missing positive assertions', () => {
  const suite = JSON.parse(readFileSync(new URL('./fixtures/scenarios.json', import.meta.url)));
  assert.doesNotThrow(() => certification.checkScenarioSources(suite));
  for (const mutate of [
    value => value.scenarios.push(value.scenarios[0]),
    value => value.scenarios[0].rule_references = ['99.99.99'],
    value => value.scenarios[0].rules_versions = ['9.9.9'],
    value => { value.scenarios[0].checks = []; value.scenarios[0].steps.forEach(step => step.checks = []); },
  ]) {
    const changed = JSON.parse(JSON.stringify(suite));
    mutate(changed);
    assert.throws(() => certification.checkScenarioSources(changed));
  }
});

test('draft card references cannot borrow a source or hide an ability branch', () => {
  const draft = { ...template, status: 'draft', rules_version: '2.3.0', ability_branches: ['quest'],
    cases: [{ case_id: 'quest-positive', scenario_id: 'SCN-001', branch: 'quest', dimensions: ['positive'],
      intent: 'Synthetic authoring example only', expected_public_events: [], expected_private_state: ['lore increases'], negative_case: false, evidence_run: null }] };
  assert.equal(certification.validateCardCertification(draft).admission, false);
  assert.throws(() => certification.validateCardCertification({ ...draft, ability_branches: [] }), /branch/);
  assert.throws(() => certification.validateCardCertification({ ...draft, source_references: [{ source_id: 'cr-2.3.0', sha256: '0'.repeat(64), rule_reference: '4.5.1.2' }] }), /source/);
  for (const status of ['tested', 'interaction_certified']) assert.throws(() => certification.validateCardCertification({ ...draft, status }), /promotion/);
});
