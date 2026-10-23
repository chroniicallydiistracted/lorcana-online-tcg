import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { ENGINE, checkReviewRecord, designFingerprint, recordPath, referenceStories, storyUrl, unwaived, validateExceptions } from '../scripts/design-review-lib.mjs';

const report = 'x'.repeat(200);
const passing = fingerprint => ({ screen: 'Deckbuilder', fingerprint, verdict: 'pass', reviews: [
  { assessment: 'design', reviewer: 'agent-a', verdict: 'pass', report }, { assessment: 'evidence', reviewer: 'agent-b', verdict: 'pass', report }] });

test('the engine is pinned by version, asset and published checksum', () => {
  assert.match(ENGINE.sha256, /^[0-9a-f]{64}$/);
  assert.ok(ENGINE.url.endsWith(`engine-v${ENGINE.version}/${ENGINE.asset}`));
});
test('exceptions need a rule, a story pattern, a reason and a Director decision', () => {
  assert.deepEqual(validateExceptions(JSON.parse(readFileSync(new URL('../design-review/exceptions.json', import.meta.url), 'utf8'))), []);
  assert.deepEqual(validateExceptions([{ rule: 'nested-cards', story: '^reference-screens-', reason: 'A binder page is a card on purpose here.', decision: 'D31' }]), []);
  assert.match(validateExceptions([{ rule: 'nested-cards', story: 'x', reason: 'Self-approved by the agent.', decision: 'agent' }]).join(), /Director decision/);
  assert.match(validateExceptions([{ rule: 'nested-cards', story: 'x', reason: 'short', decision: 'D31' }]).join(), /reason/);
});
test('only a matching exception waives a finding', () => {
  const finding = { antipattern: 'nested-cards', file: 'http://127.0.0.1:6008/iframe.html?viewMode=story&id=reference-screens-pack-opening--summary&globals=theme:ink', selector: 'article' };
  assert.equal(unwaived([finding], []).length, 1);
  assert.equal(unwaived([finding], [{ rule: 'nested-cards', story: '^reference-screens-pack-' }]).length, 0);
  assert.equal(unwaived([finding], [{ rule: 'nested-cards', story: '^reference-screens-match-' }]).length, 1);
  assert.equal(unwaived([finding], [{ rule: 'straggler', story: '.' }]).length, 1);
});
test('reference stories carry the globals their names promise', () => {
  const index = { entries: {
    a: { type: 'story', id: 'reference-screens-match--long-names', title: 'Reference screens/Match' },
    b: { type: 'story', id: 'reference-screens-match--documentation', title: 'Reference screens/Match' },
    c: { type: 'story', id: 'components-button--primary', title: 'Components/Button' } } };
  const stories = referenceStories(index);
  assert.deepEqual(stories.map(s => s.id), ['reference-screens-match--long-names']);
  assert.equal(storyUrl('http://h', stories[0], 'ink'), 'http://h/iframe.html?viewMode=story&id=reference-screens-match--long-names&globals=theme:ink;locale:en-XA');
});
test('a screen passes only with two separate passing reviewers at the current design source', () => {
  const fingerprint = designFingerprint();
  assert.match(fingerprint, /^[0-9a-f]{64}$/);
  assert.equal(designFingerprint(), fingerprint);
  assert.deepEqual(checkReviewRecord(passing(fingerprint), 'Deckbuilder', fingerprint), []);
  assert.match(checkReviewRecord(null, 'Deckbuilder', fingerprint).join(), /no independent review record/);
  assert.match(checkReviewRecord(passing('0'.repeat(64)), 'Deckbuilder', fingerprint).join(), /is not the current/);
  const declined = passing(fingerprint); declined.reviews[0].verdict = 'decline';
  assert.match(checkReviewRecord(declined, 'Deckbuilder', fingerprint).join(), /design assessment declined it/);
  const same = passing(fingerprint); same.reviews[1].reviewer = 'agent-a';
  assert.match(checkReviewRecord(same, 'Deckbuilder', fingerprint).join(), /separate reviewers/);
  const thin = passing(fingerprint); thin.reviews[1].report = 'Looks fine.';
  assert.match(checkReviewRecord(thin, 'Deckbuilder', fingerprint).join(), /no full report/);
  assert.ok(recordPath('Collection binder').endsWith('design-review/reviews/collection-binder.json'));
});
