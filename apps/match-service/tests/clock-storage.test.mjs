import test from 'node:test';
import assert from 'node:assert/strict';
import {clockFixture} from './clock-fixtures.mjs';
import pg from 'pg';
import {createClockRepository} from '../../../packages/db/dist/index.js';

test('waiting-player refusals never reserve or revise the active clock, even with an admitted active move',async()=>{
 const f=await clockFixture();try{
  await f.open();const before=await f.a.load(f.id,'p1'),waiting=f.command('p2'),events=()=>f.using('match',async c=>(await c.query('SELECT count(*)::int AS n FROM match.clock_events WHERE match_id=$1',[f.id])).rows[0].n),count=await events();
  const refused=await f.b.reservePlayer(waiting);assert.equal(refused.kind,'rejected');assert.equal(refused.result.receipt.reason,'invalid_intent');
  assert.deepEqual((await f.a.load(f.id,'p1')).clock,before.clock);assert.equal(await events(),count);
  const duplicate=await f.a.reservePlayer(waiting);assert.equal(duplicate.kind,'duplicate');assert.deepEqual(duplicate.result.receipt,refused.result.receipt);
  const active=f.command('p1'),owner=await f.a.reservePlayer(active);assert.equal(owner.kind,'reserved');
  const processing=await f.a.load(f.id,'p1'),again=await f.b.reservePlayer(f.command('p2'));
  assert.equal(again.kind,'rejected');assert.deepEqual((await f.a.load(f.id,'p1')).clock,processing.clock);
  const next=f.apply(owner.reservation,'p1','passTurn');assert.equal((await f.a.commitPlayer(owner.reservation,active,next,f.m.clock())).receipt.outcome,'accepted');
 }finally{await f.close();}
});
for(const elapsed of [0,1000,1001])test('waiting concession remains admissible '+elapsed+'ms after the turn anchor',async()=>{
 const f=await clockFixture();try{
  await f.open();const before=await f.a.load(f.id,'p1');f.advance(elapsed);
  const command=f.command('p2','concede'),owner=await f.b.reservePlayer(command);assert.equal(owner.kind,'waiting');
  assert.deepEqual((await f.a.load(f.id,'p1')).clock,before.clock);
  const next=f.apply(owner.evaluation,'p2','concede'),result=await f.b.commitWaitingConcession(owner.evaluation,command,next,f.m.clock());assert.equal(result.receipt.outcome,'accepted');
  const after=await f.a.load(f.id,'p1');assert.equal(after.ended,true);assert.equal(after.winner,'p1');assert.equal(after.clock.status,'ended');
  const duplicate=await f.a.reservePlayer(command);assert.equal(duplicate.kind,'duplicate');assert.deepEqual(duplicate.result.receipt,result.receipt);
  assert.equal((await f.a.reserveTimeout(f.id,after.stateVersion,after.clock.revision)).kind,'stale');
 }finally{await f.close();}
});
test('a waiting concession cannot fence a concurrent timeout or overwrite its clock-only revision',async()=>{
 const f=await clockFixture();try{
  await f.open();f.advance(1000);const before=await f.a.load(f.id,'p1'),command=f.command('p2','concede'),evaluation=await f.a.reservePlayer(command);assert.equal(evaluation.kind,'waiting');
  const next=f.apply(evaluation.evaluation,'p2','concede'),owner=await f.b.reserveTimeout(f.id,before.stateVersion,before.clock.revision);assert.equal(owner.kind,'reserved');
  const processing=await f.a.load(f.id,'p1'),r=await f.a.commitWaitingConcession(evaluation.evaluation,command,next,f.m.clock());assert.equal(r.receipt.outcome,'stale');
  assert.deepEqual((await f.a.load(f.id,'p1')).clock,processing.clock);assert.equal((await f.a.load(f.id,'p1')).ended,false);await f.b.abort(owner.reservation);
 }finally{await f.close();}
});
test('concurrent evaluated waiting concessions save one terminal result and duplicate retries recover it',async()=>{
 const f=await clockFixture();try{
  await f.open();const first=f.command('p2','concede'),second=f.command('p2','concede'),a=await f.a.reservePlayer(first),b=await f.b.reservePlayer(second);assert.equal(a.kind,'waiting');assert.equal(b.kind,'waiting');
  const next=f.apply(a.evaluation,'p2','concede'),clock=f.m.clock();
  await assert.rejects(f.a.commit(first,a.evaluation.before,next),'ordinary commit cannot bypass a clock');
  const r=await Promise.all([f.a.commitWaitingConcession(a.evaluation,first,next,clock),f.b.commitWaitingConcession(b.evaluation,second,next,clock)]);assert.deepEqual(r.map(x=>x.receipt.outcome).sort(),['accepted','stale']);
  const winner=r.find(x=>x.receipt.outcome==='accepted'),command=winner.receipt.commandId===first.commandId?first:second,evaluation=command===first?a.evaluation:b.evaluation;
  const again=await f.a.commitWaitingConcession(evaluation,command,next,clock);assert.equal(again.duplicate,true);assert.deepEqual(again.receipt,winner.receipt);
  const count=await f.using('match',async c=>{const result=[];for(const table of ['journal','outbox'])result.push((await c.query('SELECT count(*)::int AS n FROM match.'+table+' WHERE match_id=$1 AND state_version=4',[f.id])).rows[0].n);return result;});assert.deepEqual(count,[1,1]);
 }finally{await f.close();}
});
for(const [name,change]of [['expired',f=>f.advance(15001)],['backward',f=>f.setTime(9999)]])test('an '+name+' waiting evaluation cannot change or pause the clock',async()=>{
 const f=await clockFixture();try{
  await f.open();const command=f.command('p2','concede'),r=await f.a.reservePlayer(command);assert.equal(r.kind,'waiting');const next=f.apply(r.evaluation,'p2','concede'),before=await f.a.load(f.id,'p1');change(f);
  await assert.rejects(f.a.commitWaitingConcession(r.evaluation,command,next,f.m.clock()),e=>e.code==='UNAVAILABLE');assert.deepEqual((await f.a.load(f.id,'p1')).clock,before.clock);assert.equal(await f.a.findReceipt(command),undefined);
 }finally{await f.close();}
});

test('real database admits an early action before a timeout and excludes accepted engine-processing time',async()=>{
 const f=await clockFixture();try{
  await f.open();const before=await f.a.load(f.id,'p1'),clock=before.clock;f.advance(999);
  const c=f.command('p1'),r=await f.a.reservePlayer(c);assert.equal(r.kind,'reserved');
  assert.equal((await f.b.reserveTimeout(f.id,before.stateVersion,clock.revision)).kind,'busy');
  const candidate=f.apply(r.reservation,'p1','passTurn');f.advance(101);
  const accepted=await f.a.commitPlayer(r.reservation,c,candidate,f.m.clock());assert.equal(accepted.receipt.outcome,'accepted');
  const after=await f.b.load(f.id,'p2');assert.equal(after.clock.remainingMs.p1,1);assert.equal(after.clock.remainingMs.p2,1000);assert.equal(after.clock.deadlineUtcMs,f.now()+1000);
  assert.equal((await f.b.reserveTimeout(f.id,before.stateVersion,clock.revision)).kind,'stale');
  const retry=await f.b.commitPlayer(r.reservation,c,candidate,f.m.clock());assert.equal(retry.duplicate,true);assert.deepEqual(retry.receipt,accepted.receipt);
 }finally{await f.close();}
});
test('the exact deadline refuses player admission and duplicate timeout servers can commit only once',async()=>{
 const f=await clockFixture();try{
  await f.open();const before=await f.a.load(f.id,'p1');f.advance(1000);
  assert.equal((await f.a.reservePlayer(f.command('p1'))).kind,'expired');
  const raced=await Promise.all([f.a.reserveTimeout(f.id,before.stateVersion,before.clock.revision),f.b.reserveTimeout(f.id,before.stateVersion,before.clock.revision)]);
  assert.equal(raced.filter(r=>r.kind==='reserved').length,1);const r=raced.find(r=>r.kind==='reserved');
  const candidate=f.apply(r.reservation,'p1','passTurn');const saved=await f.a.commitTimeout(r.reservation,candidate,f.m.clock());
  assert.equal(saved.receipt.outcome,'accepted');assert.equal(f.players.includes(saved.receipt.actorId),false,'system receipt must be disjoint from both participants');
  const duplicate=await f.b.commitTimeout(r.reservation,candidate,f.m.clock());assert.equal(duplicate.duplicate,true);assert.deepEqual(duplicate.receipt,saved.receipt);
  const after=await f.a.load(f.id,'p1');assert.equal(after.stateVersion,before.stateVersion+1);assert.equal(after.ended,false);assert.equal(after.clock.remainingMs.p1,1000);
  const counts=await f.using('match',async c=>(await c.query('SELECT count(*)::int AS n FROM match.journal WHERE match_id=$1 AND state_version=$2',[f.id,after.stateVersion])).rows[0].n);assert.equal(counts,1);
 }finally{await f.close();}
});
test('a dead reservation pauses for recovery and neither a wrong owner nor legacy raw commit can bypass the fence',async()=>{
 const f=await clockFixture();try{
  await f.open();const before=await f.a.load(f.id,'p1'),c=f.command('p1'),r=await f.a.reservePlayer(c);assert.equal(r.kind,'reserved');
  const candidate=f.apply(r.reservation,'p1','passTurn');
  await assert.rejects(f.b.commitPlayer({...r.reservation,id:'not-the-owner'},c,candidate,f.m.clock()));
  await assert.rejects(f.b.commit(c,before,candidate));
  f.advance(15001);assert.equal((await f.b.reserveTimeout(f.id,before.stateVersion,before.clock.revision)).kind,'paused');
  await f.a.abort(r.reservation);const after=await f.b.load(f.id,'p1');assert.equal(after.clock.status,'paused');assert.equal(after.clock.pauseReason,'recovery');assert.equal(after.stateVersion,before.stateVersion);assert.equal(after.winner,null);
 }finally{await f.close();}
});
test('aborted illegal calculations retain elapsed time and a forged system actor cannot obtain a player reservation',async()=>{
 const f=await clockFixture();try{
  await f.open();const before=await f.a.load(f.id,'p1');f.advance(400);const c=f.command('p1'),r=await f.a.reservePlayer(c);assert.equal(r.kind,'reserved');f.advance(600);
  await f.a.abort(r.reservation);assert.equal((await f.b.reservePlayer(f.command('p1'))).kind,'expired');
  const after=await f.a.load(f.id,'p1');assert.equal(after.clock.anchorUtcMs,before.clock.anchorUtcMs);assert.equal(after.checkpoint.digest,before.checkpoint.digest);
  await assert.rejects(f.a.reservePlayer(f.command('system-clock')),e=>e.code==='FORBIDDEN');
 }finally{await f.close();}
});
test('new clock state and audit tables remain inaccessible to API and worker roles',async()=>{
 const f=await clockFixture();try{for(const role of ['api','worker'])for(const table of ['clocks','clock_events'])await f.using(role,c=>assert.rejects(c.query('SELECT * FROM match.'+table),e=>e.code==='42501'));}finally{await f.close();}
});
test('a heartbeat blocked behind reservation admission rereads the clock after acquiring its row lock',async()=>{
 const f=await clockFixture(),original=pg.Client.prototype.query;let release,admission,heartbeat,marked,blocked;
 const gate=new Promise(r=>{release=r}),atWrite=new Promise(r=>{marked=r}),atRead=new Promise(r=>{blocked=r});let armed=false;
 try{
  await f.open();const before=await f.a.load(f.id,'p1');
  pg.Client.prototype.query=function(...args){const sql=typeof args[0]==='string'?args[0]:args[0]?.text,values=args[1];
   if(sql?.startsWith('INSERT INTO match.clock_events')&&values?.[0]===f.id&&values?.[4]==='processing'){armed=true;marked();return gate.then(()=>original.apply(this,args));}
   const result=original.apply(this,args);if(armed&&sql?.startsWith('SELECT m.*')&&sql.includes('FOR UPDATE OF m')){armed=false;blocked(this.processID);}return result;
  };
  admission=f.a.reservePlayer(f.command('p1'));await atWrite;
  heartbeat=f.b.heartbeat(f.id,before.clock.revision);const pid=await atRead;
  let waiting=false;for(let i=0;i<100&&!waiting;i++){waiting=await f.using('match',async c=>(await c.query('SELECT wait_event_type FROM pg_stat_activity WHERE pid=$1',[pid])).rows[0]?.wait_event_type==='Lock');if(!waiting)await new Promise(r=>setTimeout(r,10));}
  assert.equal(waiting,true,'the competing database transaction must actually wait');release();const owned=await admission;await heartbeat;
  const after=await f.a.load(f.id,'p1');assert.equal(after.clock.revision,before.clock.revision+1);assert.equal(after.clock.status,'processing');await f.a.abort(owned.reservation);
 }finally{release();await Promise.allSettled([admission,heartbeat].filter(Boolean));pg.Client.prototype.query=original;await f.close();}
});
test('six independent timeout repositories admit one owner and system-like participant names cannot preclaim its receipt',async()=>{
 const f=await clockFixture({players:['system-clock','system-clock-']}),extra=[];
 try{
  await f.open();const before=await f.a.load(f.id,f.players[0]);f.advance(1000);
  const systemId='clock-timeout-'+before.stateVersion+'-'+before.clock.revision;
  assert.equal((await f.a.reservePlayer(f.command(f.players[0],'passTurn',{},systemId))).kind,'expired');
  for(let i=0;i<4;i++)extra.push(createClockRepository('test',undefined,{sampleForTest:async()=>f.now()}));
  const repositories=[f.a,f.b,...extra],raced=await Promise.all(repositories.map(r=>r.reserveTimeout(f.id,before.stateVersion,before.clock.revision)));
  assert.equal(raced.filter(r=>r.kind==='reserved').length,1);const owner=raced.find(r=>r.kind==='reserved'),candidate=f.apply(owner.reservation,f.players[0],'passTurn');
  const saved=await f.a.commitTimeout(owner.reservation,candidate,f.m.clock());assert.equal(saved.receipt.actorId,'system-clock--');assert.equal(saved.receipt.outcome,'accepted');
  const duplicates=await Promise.all(repositories.map(r=>r.commitTimeout(owner.reservation,candidate,f.m.clock())));assert.equal(duplicates.every(r=>r.duplicate),true);
  for(const row of duplicates)assert.deepEqual(row.receipt,saved.receipt);
  assert.equal((await f.a.load(f.id,f.players[0])).stateVersion,4);
 }finally{for(const repo of extra)await repo.close();await f.close();}
});
for(const [label,change,reason] of [['expired',f=>f.advance(15001),'recovery'],['backward',f=>f.setTime(9999),'time_unreliable']])test('a '+label+' rejected calculation cannot resurrect its fenced clock reservation',async()=>{
 const f=await clockFixture();try{
  await f.open();const before=await f.a.load(f.id,'p1'),command=f.command('p1','quest'),r=await f.a.reservePlayer(command);assert.equal(r.kind,'reserved');change(f);
  await assert.rejects(f.a.reject(r.reservation,command),e=>e.code==='UNAVAILABLE');
  const after=await f.a.load(f.id,'p1');assert.equal(after.clock.status,'paused');assert.equal(after.clock.pauseReason,reason);assert.equal(after.stateVersion,before.stateVersion);assert.deepEqual(after.checkpoint,before.checkpoint);assert.equal(await f.a.findReceipt(command),undefined);
 }finally{await f.close();}
});
