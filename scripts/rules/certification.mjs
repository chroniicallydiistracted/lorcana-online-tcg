import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import Ajv from 'ajv';
import { digest, ruleSections } from './inventory.mjs';

const root = fileURLToPath(new URL('../../', import.meta.url));
const read = path => JSON.parse(readFileSync(join(root, path), 'utf8'));
const schema = new Ajv({ allErrors: true, strict: true, allowUnionTypes: true }).compile(read('docs/schemas/card-certification.schema.json'));

export function checkScenarioSources(suite = read('tests/rules/fixtures/scenarios.json'), index = read('tests/rules/fixtures/rule-sources.json')) {
  assert.equal(suite.schema_version, 1, 'Scenario schema revision');
  assert.equal(suite.engine_revision, read('scripts/engine/selection.json').revision, 'Scenario engine revision');
  assert(suite.scenarios.length > 0, 'Scenario suite is empty');
  assert.equal(new Set(suite.scenarios.map(row => row.id)).size, suite.scenarios.length, 'Duplicate scenario ID');
  const sources = read('docs/rules/2026-10-12-rule-04-sources.json').sources;
  assert.deepEqual(index.sources.map(row => row.version).sort(), ['2.2.0', '2.3.0'], 'Both distinct rules profiles required');
  for (const source of index.sources) {
    const acquired = sources.find(row => row.id === source.id);
    assert(acquired?.status === 'acquired' && acquired.sha256 === source.sha256 && acquired.version === source.version && acquired.effective_date === source.effective_date && acquired.extraction.text_sha256 === source.text_sha256, 'Scenario source identity drift');
    assert(source.leaves.length > 0 && source.leaves.every(row => /^\d+(?:\.\d+){2,}$/.test(row.id) && /^[a-f0-9]{64}$/.test(row.sha256)), 'Invalid numbered rule identity');
    assert.equal(new Set(source.leaves.map(row => row.id)).size, source.leaves.length, 'Duplicate numbered rule');
  }
  for (const scenario of suite.scenarios) {
    assert(/^SCN-[0-9]{3}$/.test(scenario.id) && scenario.expectation && scenario.title, 'Missing scenario oracle');
    assert(scenario.steps.length > 0 && scenario.rule_references.length > 0 && scenario.rules_versions.length > 0, 'Unexecuted or unsourced scenario');
    for (const version of scenario.rules_versions) {
      const source = index.sources.find(row => row.version === version);
      assert(source && scenario.rule_references.every(ref => source.leaves.some(row => row.id === ref)), scenario.id + ': scenario citation missing from applicable rules');
    }
    for (const step of scenario.steps) assert(typeof step.accepted === 'boolean' && ['p1', 'p2'].includes(step.actor) && typeof step.move === 'string', 'Invalid scenario command oracle');
    assert(scenario.steps.some(step => !step.accepted) || scenario.checks.length > 0 || scenario.steps.some(step => step.checks.length > 0), 'Positive scenario has no state/event assertion');
  }
  return { scenarios: suite.scenarios.length, versions: index.sources.map(source => source.version) };
}

// This validates authoring completeness. Official per-card execution and
// interaction promotion remain fail-closed until card-bound fixtures exist.
export function validateCardCertification(record) {
  assert(schema(record), 'Card certification schema: ' + JSON.stringify(schema.errors));
  if (record.status === 'template_not_executed') {
    assert(record.cases.length === 0 && record.ability_branches.length === 0 && record.source_references.length === 0 && record.reviewers.length === 0 && record.recorded_at === null && record.definition_sha256 === null && record.engine_sha256 === null && record.rules_version === null && record.format_version === null, 'Card certification template falsely claims implementation/evidence');
    return { status: record.status, admission: false };
  }
  assert(record.status === 'draft', 'Card certification promotion requires qualified card-bound execution, independent review and later admission gates; generic synthetic scenarios cannot certify a card');
  const suite = read('tests/rules/fixtures/scenarios.json'), index = read('tests/rules/fixtures/rule-sources.json');
  checkScenarioSources(suite, index);
  assert.equal(new Set(record.cases.map(row => row.case_id)).size, record.cases.length, 'Card certification duplicate case');
  for (const ref of record.source_references) {
    const source = index.sources.find(row => row.id === ref.source_id && row.version === record.rules_version);
    assert(source?.sha256 === ref.sha256 && source.leaves.some(row => row.id === ref.rule_reference), 'Card certification source/citation mismatch');
  }
  for (const row of record.cases) {
    const scenario = suite.scenarios.find(item => item.id === row.scenario_id);
    assert(scenario && scenario.rules_versions.includes(record.rules_version), 'Card certification scenario/rules mismatch');
    assert(record.ability_branches.includes(row.branch), 'Card certification undeclared ability branch');
    assert(row.negative_case === scenario.steps.some(step => !step.accepted), 'Card certification negative-case mismatch');
  }
  return { status: record.status, admission: false };
}

export function verifyScenarioSourceBytes() {
  for (const source of read('tests/rules/fixtures/rule-sources.json').sources) {
    const base = join(root, '.local/rule-01/source-cache', source.sha256);
    const text = readFileSync(base + '.txt');
    assert.equal(digest(readFileSync(base + '.pdf')), source.sha256, 'Official PDF byte drift');
    assert.equal(digest(text), source.text_sha256, 'Extracted rule text byte drift');
    assert.deepEqual(ruleSections(text.toString()), source.leaves, 'Numbered rule oracle identity drift');
  }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const result = checkScenarioSources();
    validateCardCertification(read('docs/templates/card-certification.json'));
    if (process.argv.includes('--bytes')) verifyScenarioSourceBytes();
    console.log('PASS representative rule sources/template; no card admission ' + JSON.stringify(result));
  } catch (error) { console.error(error.message); process.exitCode = 1; }
}
