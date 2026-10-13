import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { targetNames, validateHistory, migrationFiles } from '../src/policy.ts';
test('targets are explicit and distinct; unsupported names cannot reach SQL',()=>{
 assert.equal(targetNames('local').database,'lorcana_app_local');
 assert.equal(targetNames('test').roles.api,'lorcana_test_api');
 for(const value of ['production','local; DROP DATABASE x','',undefined]) assert.throws(()=>targetNames(value));
});
test('migration history must be an unchanged contiguous prefix',()=>{
 const files=[{id:'0001',sha256:'a'},{id:'0002',sha256:'b'}];
 assert.equal(validateHistory(files,[]),0); assert.equal(validateHistory(files,[files[0]]),1);
 for(const rows of [[{id:'0001',sha256:'changed'}],[files[1]],[...files,{id:'0003',sha256:'c'}]]) assert.throws(()=>validateHistory(files,rows));
});
test('checked-in migrations are ordered and hashed from actual bytes',()=>{
 const names=['0001-foundation-probes.sql','0002-match-commands.sql','0003-match-receipt-invariants.sql'];
 const files=migrationFiles(); assert.deepEqual(files.map(f=>f.id),['0001','0002','0003']);
 for(const [i,name] of names.entries()) {
  const bytes=readFileSync(new URL('../migrations/'+name,import.meta.url));
  assert.equal(files[i].sql,bytes.toString('utf8'));
  assert.equal(files[i].sha256,createHash('sha256').update(bytes).digest('hex'));
 }
 assert.match(files[0].sql,/foundation_probes/); assert.match(files[1].sql,/match\.command_receipts/); assert.match(files[2].sql,/reason IS NOT NULL/);
});
