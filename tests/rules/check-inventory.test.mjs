import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { checkSnapshots } from '../../scripts/rules/check-inventory.mjs';

const read = name => JSON.parse(readFileSync(new URL('../../docs/rules/'+name, import.meta.url)));
const snapshot = () => ({ sources:[...read('2026-10-10-sources.json').sources,...read('2026-10-10-sources-supplement.json').sources], catalog:read('2026-10-10-catalog.json'), rules:read('2026-10-10-rules-diff-v2.json'), upstream:read('2026-10-10-upstream-tests.json') });
test('committed source metadata supports an offline inventory check',()=>assert.doesNotThrow(()=>checkSnapshots(snapshot())));
test('an inflated declaration denominator is rejected',()=>{
  const x=snapshot(); x.upstream.denominators.static_test_declarations++;
  assert.throws(()=>checkSnapshots(x),/denominator/);
});
test('source hash substitution and empty rules comparison are rejected',()=>{
  const x=snapshot(); x.rules.source_hashes.before='0'.repeat(64);
  assert.throws(()=>checkSnapshots(x),/source hash/);
  const y=snapshot(); y.rules.before_count=0;
  assert.throws(()=>checkSnapshots(y),/empty/);
});
test('retrieval metadata cannot promote scheduled rules or certify a printing',()=>{
  const x=snapshot(); x.rules.effective=x.rules.scheduled; x.rules.source_hashes.before=x.rules.source_hashes.after;
  assert.throws(()=>checkSnapshots(x),/effective/);
  const y=snapshot(); y.catalog.printings[0].project_certification='certified';
  assert.throws(()=>checkSnapshots(y),/certification/);
});
test('incomplete trees and escaped private/cache paths are rejected',()=>{
  const x=snapshot(); x.upstream.tree_truncated=true;
  assert.throws(()=>checkSnapshots(x),/truncated/);
  const y=snapshot(); y.sources[0].cache_path='.env.local';
  assert.throws(()=>checkSnapshots(y),/cache path/);
});
