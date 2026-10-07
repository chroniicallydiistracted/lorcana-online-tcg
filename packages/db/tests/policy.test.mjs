import test from 'node:test';
import assert from 'node:assert/strict';
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
 const files=migrationFiles(); assert.equal(files.length,1); assert.equal(files[0].id,'0001');
 assert.match(files[0].sha256,/^[a-f0-9]{64}$/); assert.match(files[0].sql,/foundation_probes/);
});
