import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, symlinkSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { assertDocument, assertCompleteTree, assertHash, catalogInventory, diffRuleSections, galleryInventory, isEffective, readPinnedBlob, testDeclarations } from '../../scripts/rules/inventory.mjs';

test('an HTML error page cannot qualify as an acquired PDF', () => {
  assert.throws(() => assertDocument(Buffer.from('<html>denied</html>'), 'application/pdf'), /PDF/);
  assert.doesNotThrow(() => assertDocument(Buffer.from('%PDF-1.7\nsynthetic'), 'application/pdf'));
});
test('hash mismatch rejects substituted source bytes', () => {
  assert.throws(() => assertHash(Buffer.from('changed'), '0'.repeat(64)), /hash/);
});
test('retrieval does not make a future or unknown effective date current', () => {
  assert.equal(isEffective('2026-10-16', '2026-10-10'), false);
  assert.equal(isEffective(null, '2026-10-10'), false);
  assert.equal(isEffective('2026-07-09', '2026-10-10'), true);
});
test('truncated or duplicate trees cannot supply complete denominators', () => {
  assert.throws(() => assertCompleteTree({ truncated: true, tree: [] }), /truncated/);
  assert.throws(() => assertCompleteTree({ truncated: false, tree: [{ path: 'a' }, { path: 'a' }] }), /duplicate/);
  assert.doesNotThrow(() => assertCompleteTree({ truncated: false, tree: [{ path: 'a' }] }));
});
test('reprints share provisional identity while future and enemy printings remain separate', () => {
  const cards = [
    { id: 1, fullName: 'Synthetic Hero - Learner', setCode: '1' },
    { id: 2, fullName: 'Synthetic Hero - Learner', setCode: '2' },
    { id: 3, fullName: 'Synthetic Hero - Master', setCode: '14' },
    { id: 4, fullName: 'Synthetic Villain', setCode: 'Q1', type: 'Character', isExternalReveal: true },
  ];
  const x = catalogInventory(cards, { '1': { releaseDate: '2023-09-01' }, '2': { releaseDate: '2023-12-01' }, '14': { releaseDate: '2026-10-23' }, Q1: { releaseDate: null } }, '2026-10-10');
  assert.equal(x.printings.length, 4);
  assert.equal(x.identities.length, 3);
  assert.equal(x.printings[2].release_status, 'revealed_unreleased');
  assert.equal(x.printings[3].release_status, 'unknown');
  assert(x.printings.every(p => p.project_certification === 'not_certified'));
  assert.throws(() => catalogInventory([...cards, cards[0]], {}, '2026-10-10'), /duplicate/);
});
test('skipped suites propagate; comments/strings do not become test cases', () => {
  const rows = testDeclarations('synthetic.test.ts', `describe.skip('blocked', () => { test('child',()=>{}); test.todo('unfinished'); }); test('active',()=>{}); // test.skip('comment')\nconst note = "it.skip('text')";`);
  assert.equal(rows.filter(r => r.kind === 'test').length, 3);
  assert.equal(rows.find(r => r.title === 'child').skipped, true);
  assert.equal(rows.find(r => r.title === 'unfinished').todo, true);
  assert.equal(rows.find(r => r.title === 'active').skipped, false);
});
test('each/conditional/focused declarations do not pretend to be executed case counts', () => {
  const rows = testDeclarations('synthetic.test.ts', `test.each([1,2])('rows',()=>{}); describe.only('focus',()=>{it.runIf(flag)('conditional',()=>{});}); xtest('disabled',()=>{});`);
  assert.equal(rows.find(r => r.title === 'rows').parameterized, true);
  assert.equal(rows.find(r => r.title === 'conditional').conditional, true);
  assert.equal(rows.find(r => r.title === 'conditional').focused, true);
  assert.equal(rows.find(r => r.title === 'disabled').skipped, true);
});
test('rule comparison preserves identifiers and distinguishes added/removed/changed text', () => {
  const x = diffRuleSections('1.1.1. First rule.\n1.1.2. Second rule.', '1.1.1. Revised rule.\n1.1.3. Added rule.');
  assert.deepEqual(x.added.map(r => r.id), ['1.1.3']);
  assert.deepEqual(x.removed.map(r => r.id), ['1.1.2']);
  assert.deepEqual(x.changed.map(r => r.id), ['1.1.1']);
});
test('official gallery data is read as syntax without evaluating executable site code', () => {
  const html = `<script>throw new Error('must never execute'); const cards=[{culture_invariant_id:1,deck_building_id:'same',name:'Synthetic',version:'Learner',card_identifier:'1/204 EN 1',card_type:'characters'},{culture_invariant_id:2,deck_building_id:'same',name:'Synthetic',version:'Learner',card_identifier:'2/204 EN 9',card_type:'characters'},{culture_invariant_id:3,name:'Counter',card_identifier:'EN 14',card_type:'supplies'}];</script>`;
  const rows = galleryInventory(html);
  assert.equal(rows.length, 3);
  assert.equal(rows[0].deck_building_id, rows[1].deck_building_id);
  assert.equal(rows[2].deck_building_id, null);
});
test('promotional printings do not inherit an old set release date as proven availability', () => {
  const x = catalogInventory([{id:1,fullName:'Synthetic',setCode:'1',promoGrouping:'P4'}], {'1':{releaseDate:'2023-09-01'}}, '2026-10-10');
  assert.equal(x.printings[0].release_status, 'printing_release_unverified');
});
test('suite parameterization and variable titles remain visible in static declarations', () => {
  const rows=testDeclarations('dynamic.test.ts', `describe.each([1,2])('suite',()=>{test(label,()=>{});});`);
  assert.equal(rows.filter(r=>r.kind==='test').length,1);
  assert.equal(rows.find(r=>r.kind==='test').parameterized,true);
  assert.equal(rows.find(r=>r.kind==='test').dynamic_title,true);
});
test('glossary/update appendices cannot contaminate the final numbered rule hash', () => {
  const x=diffRuleSections('1.1.1. Rule.\nGlossary\nold words','1.1.1. Rule.\nGlossary\nnew words');
  assert.equal(x.changed.length,0);
});
test('a Git symlink blob is its inert target string, never dereferenced file contents', () => {
  const root=mkdtempSync(join(tmpdir(),'lorcana-source-link-'));
  try {
    writeFileSync(join(root,'target'),'synthetic contents');symlinkSync('target',join(root,'link'));
    assert.equal(readPinnedBlob(join(root,'link'),'120000').toString(),'target');
  } finally { rmSync(root,{recursive:true,force:true}); }
});
test('a table-of-contents Glossary entry cannot suppress the actual rules body', () => {
  const text='Contents\nGlossary\n1.1.1. Real rule.\nGlossary\nappendix';
  assert.equal(diffRuleSections(text,text).before_count,1);
});
