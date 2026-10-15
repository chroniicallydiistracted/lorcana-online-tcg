import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync} from 'node:fs';

async function cache(options) {
 assert.ok(existsSync(new URL('../dist/projection-cache.js',import.meta.url)),'bounded committed projection cache is missing');
 return (await import('../dist/projection-cache.js')).createProjectionCache(options);
}

test('projection cache coalesces a burst into one producer and stores immutable serialized bytes',async()=>{
 const c=await cache({maxEntries:2,maxBytes:64,ttlMs:10});let finish,calls=0;
 const wait=new Promise(r=>{finish=r});
 const load=async()=>{calls++;await wait;return '{"viewer":"p1"}';};
 const burst=Array.from({length:48},()=>c.get('committed-p1-version',load));
 assert.equal(calls,1);finish();assert.equal(new Set(await Promise.all(burst)).size,1);
 assert.equal(await c.get('committed-p1-version',async()=>{throw Error('cache hit reloaded')}),'{"viewer":"p1"}');
 c.close();await assert.rejects(c.get('x',load),/unavailable/);
});

test('cache isolates identity keys, expires monotonically and evicts by entry and byte bounds',async()=>{
 let time=0,calls=0;const c=await cache({maxEntries:2,maxBytes:8,ttlMs:10,now:()=>time});
 const load=s=>async()=>{calls++;return s};
 assert.equal(await c.get('actor1',load('1111')),'1111');
 assert.equal(await c.get('actor2',load('2222')),'2222');
 assert.equal(await c.get('actor3',load('3333')),'3333');
 assert.equal(await c.get('actor1',load('new1')),'new1');assert.equal(calls,4);
 time=11;assert.equal(await c.get('actor1',load('new2')),'new2');assert.equal(calls,5);
 await assert.rejects(c.get('oversized',load('x'.repeat(9))),/unavailable/);
 c.close();
});

test('failed and pending producers cannot poison entries or create an unbounded queue',async()=>{
 const c=await cache({maxEntries:2,maxBytes:32,maxPending:1});let finish;
 const running=c.get('first',()=>new Promise(r=>{finish=r}));running.catch(()=>{});
 await assert.rejects(c.get('second',async()=>''),/unavailable/);
 finish('ok');assert.equal(await running,'ok');
 await assert.rejects(c.get('failed',async()=>{throw Error('producer failed')}));
 assert.equal(await c.get('failed',async()=>'recovered'),'recovered');
 let complete;const pending=c.get('closing',()=>new Promise(r=>{complete=r}));pending.catch(()=>{});
 c.close();complete('must not cache');await assert.rejects(pending,/unavailable/);
});
