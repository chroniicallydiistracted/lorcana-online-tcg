import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import * as db from '../../../packages/db/dist/index.js';
import {service,fixtureId,open,cleanup,using,releases} from './fixtures.mjs';
function factory(){assert.equal(typeof db.createTransportStore,'function','shared ticket/quota storage is missing');return db.createTransportStore;}
const origin='http://localhost:5173';

test('PLAY-03 built release pins both qualified decoders and new domain matches pin live2',async()=>{
 const registry=releases();assert.deepEqual(registry.active.protocol,{min:1,max:2});
 const id=fixtureId(),s=service();try{await s.create({matchId:id,players:['p1','p2']});assert.equal((await s.describe('p1',{matchId:id})).protocolVersion,2);}finally{await s.close();await cleanup(id);}
});

test('PLAY-03 tickets are participant bound, hashed, single use across connections and expire before session authority',async()=>{
 const create=factory(),id=fixtureId(),s=service(),a=create('test'),b=create('test');
 try {
  await open(s,id);const info=await s.describe('p1',{matchId:id}),grant={actorId:'p1',sessionId:'test-session',sessionExpiresAt:Date.now()+60000,matchId:id,releaseId:info.releaseId,protocolVersion:2,origin};
  await assert.rejects(a.issue({...grant,actorId:'outsider'}));
  const issued=await a.issue(grant);assert.equal(typeof issued.ticket,'string');assert.ok(issued.expiresAt<=grant.sessionExpiresAt);
  const rows=await using('match',async c=>(await c.query('SELECT * FROM match.socket_tickets WHERE match_id=$1',[id])).rows);
  assert.equal(rows.length,1);assert.equal(JSON.stringify(rows).includes(issued.ticket),false,'raw capability must never be stored');
  assert.equal(await b.consume(issued.ticket,'http://wrong-origin.invalid'),null);
  const all=await Promise.all(Array.from({length:6},(_,i)=>(i%2?a:b).consume(issued.ticket,origin)));
  assert.equal(all.filter(Boolean).length,1);const claimed=all.find(Boolean);assert.equal(claimed.actorId,'p1');assert.equal(claimed.matchId,id);
  assert.equal(await b.consume(issued.ticket,origin),null);
  await assert.rejects(a.issue({...grant,sessionExpiresAt:Date.now()-1}));
  const expired=await a.issue(grant);
  await using('match',c=>c.query("UPDATE match.socket_tickets SET expires_at=clock_timestamp()-interval '1 second' WHERE match_id=$1",[id]));
  assert.equal(await b.consume(expired.ticket,origin),null);
 }finally{await a.close();await b.close();await s.close();await cleanup(id);}
});

test('PLAY-03 quotas are shared, atomic and bounded across gateway stores',async()=>{
 const create=factory(),a=create('test'),b=create('test'),subject=fixtureId();
 try {
  const results=await Promise.all(Array.from({length:12},(_,i)=>(i%2?a:b).quota('command',subject,5,60000)));
  assert.equal(results.filter(r=>r.allowed).length,5);
  assert.ok(results.every(r=>r.retryAfterMs>=1&&r.retryAfterMs<=60000));
  for(const role of ['api','worker'])await using(role,async c=>{for(const table of ['socket_tickets','transport_limits'])await assert.rejects(c.query('SELECT * FROM match.'+table),e=>e.code==='42501');});
 }finally{await a.close();await b.close();const hash=createHash('sha256').update('command\0'+subject).digest('hex');await using('match',c=>c.query('DELETE FROM match.transport_limits WHERE key_hash=$1',[hash]));}
});

test('PLAY-03 committed metadata and hints reveal no speculative state or private fields',async()=>{
 assert.equal(typeof db.createMatchHints,'function','metadata-only hints are missing');
 const id=fixtureId(),s=service(),repo=db.createMatchRepository('test');let hint;
 try {
  await open(s,id);const seen=[];let deliver;hint=db.createMatchHints('test',matchId=>{seen.push(matchId);if(matchId===id)deliver?.();});await hint.ready;
  const before=await repo.observe(id,'p1');assert.equal(before.stateVersion,3);assert.equal(await repo.observe(id,'outsider'),null);
  await using('match',async c=>{await c.query('BEGIN');await c.query("SELECT pg_notify('lorcana_match_changed',$1)",[id]);await c.query('ROLLBACK');});
  await new Promise(r=>setTimeout(r,20));assert.equal(seen.length,0);
  let timer;const received=new Promise((resolve,reject)=>{timer=setTimeout(()=>reject(Error('committed hint missing')),2000);deliver=()=>{clearTimeout(timer);resolve();};});received.catch(()=>{});
  await s.submit('p1',{matchId:id,commandId:'notify-concede',expectedVersion:3,move:'concede',input:{}});await received;
  const after=await repo.observe(id,'p1');assert.equal(after.stateVersion,4);assert.notEqual(after.eventId,before.eventId);
  for(const key of ['checkpoint','seed','intent','players','winner'])assert.equal(key in after,false);
 }finally{await hint?.close();await repo.close();await s.close();await cleanup(id);}
});

test('PLAY-03 hints close before initial connect completes without leaving a pending owned lifecycle',async()=>{
 assert.equal(typeof db.createMatchHints,'function');const hint=db.createMatchHints('test',()=>{});let timer;
 try{await Promise.race([hint.close(),new Promise((_resolve,reject)=>{timer=setTimeout(()=>reject(Error('hint close hung during initial connection')),1500);})]);}
 finally{clearTimeout(timer);}
});
