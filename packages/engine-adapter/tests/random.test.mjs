import test from 'node:test';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import { createRandomSource, boundedIntegerFromWord } from '../dist/random.js';

test('indexed server stream is deterministic, isolated, bounded and privately disposable', () => {
  const seed = Buffer.from(Array.from({length:32},(_,i)=>i));
  const a=createRandomSource(seed,'fixture-a'), b=createRandomSource(Buffer.from(seed),'fixture-a'), c=createRandomSource(seed,'fixture-b');
  const first=a.random(1);seed.fill(0);
  assert.equal(first,1364967668377031/2**53); // Independent Python HMAC fixture.
  assert.equal(first,b.random(1));assert.notEqual(first,c.random(1));
  for(let index=1;index<200;index++){
    const value=a.integer(index,17);assert.ok(Number.isInteger(value)&&value>=0&&value<17);
    assert.equal(value,b.integer(index,17));
  }
  assert.notEqual(a.identifier('instance',1),a.identifier('game',1));
  const outcomes=a.takeOutcomes();assert.ok(outcomes.length>0);assert.equal(a.takeOutcomes().length,0);
  assert.ok(!JSON.stringify(outcomes).includes('seed'));
  for(const value of [-1,NaN,Infinity,1.5,2**53])assert.throws(()=>a.random(value),/Random/);
  for(const bound of [0,-1,NaN,1.5,2**32+1])assert.throws(()=>a.integer(1,bound),/Random/);
  assert.throws(()=>createRandomSource(Buffer.alloc(31),'x'),/Random/);
  a.dispose();assert.throws(()=>a.random(1),/disposed/);a.dispose();b.dispose();c.dispose();
});
test('new server match fails closed when operating-system entropy is unavailable',()=>{
  const script="import assert from 'node:assert/strict';import crypto from 'node:crypto';import {syncBuiltinESMExports} from 'node:module';crypto.randomBytes=()=>{throw new Error('entropy unavailable')};syncBuiltinESMExports();const {createQualificationMatch}=await import('./dist/index.js');assert.throws(()=>createQualificationMatch({players:['p1','p2'],startTimestamp:0}),/entropy unavailable/);console.log('PASS unavailable entropy rejected');";
  const result=spawnSync(process.execPath,['--input-type=module','-e',script],{cwd:new URL('..',import.meta.url),encoding:'utf8'});
  assert.equal(result.status,0,result.stderr);assert.match(result.stdout,/unavailable entropy rejected/);
});
test('bounded integers reject biased words and fail closed after finite retries',()=>{
  const words=[0xffffffff,7];
  assert.deepEqual(boundedIntegerFromWord(i=>words[i],10),{value:7,attempts:2});
  assert.throws(()=>boundedIntegerFromWord(()=>0xffffffff,10),/limit/);
  assert.throws(()=>boundedIntegerFromWord(()=>NaN,10),/word/);
});
