import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync} from 'node:fs';
import {createReleaseRegistry} from '../../../packages/service-runtime/dist/index.js';
import {createMatchService} from '../dist/service.js';
import {clockFixture,clockPolicy} from './clock-fixtures.mjs';
import {command,cleanup} from './fixtures.mjs';

async function fixture(open=true){
 assert.ok(existsSync(new URL('../dist/clock-service.js',import.meta.url)),'clock orchestration is missing');
 const f=await clockFixture();let s;
 try{
  const row=await f.a.load(f.id,'p1'),manifest=row.releaseManifest;await cleanup(f.id);
  const {createClockHealth}=await import('../dist/clock-health.js');
  const health=createClockHealth({monotonicNow:f.now});
  s=createMatchService({repository:f.a,releases:createReleaseRegistry([manifest],manifest.releaseId),clocks:{repository:f.a,health,runner:{enabled:false},recoveryAuthority:async request=>request.auditId==='qualification-auditor'?'qualification-auditor':null}});
  await s.create({matchId:f.id,players:f.players,clock:clockPolicy});
  if(open){const first=await s.view('p1',{matchId:f.id});for(const [actor,move,input]of [[first.priorityId,'chooseWhoGoesFirst',{playerId:'p1'}],['p1','alterHand',{cardsToMulligan:[]}],['p2','alterHand',{cardsToMulligan:[]}]]){const v=await s.view(actor,{matchId:f.id});const result=await s.submit(actor,{...command(f.id,'open-'+actor+move,v.stateVersion,move),input});assert.equal(result.receipt.outcome,'accepted');}}
  return {...f,s,async close(){await s.close();await f.close();}};
 }catch(error){await s?.close();await f.close();throw error;}
}
test('waiting opening concessions finish once without ever reserving the timed clock in any opening phase',async()=>{
 for(let phase=0;phase<3;phase++){
  const f=await fixture(false);try{
   for(let n=0;n<phase;n++){const v=await f.s.view('p1',{matchId:f.id});await f.s.submitRefs(v.priorityId,command(f.id,'advance-'+n,n,n===0?'chooseWhoGoesFirst':'alterHand',n===0?{playerId:'p1'}:{cardsToMulligan:[]}));}
   const v=await f.s.view('p1',{matchId:f.id}),waiting=f.players.find(p=>p!==v.priorityId),events=await f.using('match',async c=>(await c.query('SELECT count(*)::int AS n FROM match.clock_events WHERE match_id=$1',[f.id])).rows[0].n);
   const c=command(f.id,'opening-concession',phase,'concede'),r=await f.s.submitRefs(waiting,c);assert.equal(r.receipt.outcome,'accepted');
   const after=await f.a.load(f.id,waiting);assert.equal(after.clock.status,'ended');assert.equal(after.clock.status,'ended');
   for(let n=0;n<8;n++){const duplicate=await f.s.submitRefs(waiting,c);assert.equal(duplicate.duplicate,true);assert.deepEqual(duplicate.receipt,r.receipt);assert.deepEqual((await f.a.load(f.id,waiting)).clock,after.clock);}
   const view=await f.s.view(waiting,{matchId:f.id});assert.equal(view.endReason,'concession');assert.equal(view.winner,v.priorityId);
   assert.equal(await f.using('match',async db=>(await db.query("SELECT count(*)::int AS n FROM match.clock_events WHERE match_id=$1 AND clock_revision>$2 AND kind='processing'",[f.id,events])).rows[0].n),0);
  }finally{await f.close();}
 }
});
test('a delayed waiting opening concession leaves the active decision unfenced and becomes stale after it',async()=>{
 const f=await clockFixture(),{createClockService}=await import('../dist/clock-service.js'),{createClockHealth}=await import('../dist/clock-health.js'),{createEngineExecutor}=await import('../dist/engine-executor.js'),executor=createEngineExecutor();let release,entered,pending;
 const gate=new Promise(r=>{release=r}),started=new Promise(r=>{entered=r});
 const clocks=createClockService({repository:f.a,pins:()=>{},health:createClockHealth({monotonicNow:f.now}),executor:{...executor,execute:async job=>{if(job.kind==='transition'&&job.command.move==='concede'){entered();await gate;}return executor.execute(job);}}});
 try{
  clocks.recordCreated(f.id);const actor=f.m.status().choosingFirstPlayer,waiting=f.players.find(p=>p!==actor),before=await f.a.load(f.id,actor);
  pending=clocks.submit(f.command(waiting,'concede'),false).then(result=>({result}),error=>({error}));await Promise.race([started,pending.then(r=>{throw r.error??Error('Waiting concession did not enter the transition executor');})]);
  assert.deepEqual((await f.a.load(f.id,actor)).clock,before.clock,'waiting work must never own the clock');
  assert.equal((await clocks.submit(f.command(actor,'chooseWhoGoesFirst',{playerId:'p1'}),false)).receipt.outcome,'accepted');
  const after=await f.a.load(f.id,actor);release();const r=await pending;assert.equal(r.error,undefined);assert.equal(r.result.receipt.outcome,'stale');assert.deepEqual((await f.a.load(f.id,actor)).clock,after.clock);
 }finally{release();await pending;await clocks.close();await executor.close();await f.close();}
});
test('a waiting move is refused before cold proof work and cannot delay the active player',async()=>{
 const f=await clockFixture(),{createClockService}=await import('../dist/clock-service.js'),{createClockHealth}=await import('../dist/clock-health.js'),{createEngineExecutor}=await import('../dist/engine-executor.js'),executor=createEngineExecutor();let inspections=0;
 const clocks=createClockService({repository:f.a,pins:()=>{},health:createClockHealth({monotonicNow:f.now}),executor:{...executor,execute:async job=>{if(job.kind==='clock-inspect')inspections++;return executor.execute(job);}}});
 try{
  await f.open();clocks.recordCreated(f.id);const before=await f.a.load(f.id,'p1'),waiting=f.command('p2');
  const refused=await clocks.submit(waiting,false);assert.equal(refused.receipt.reason,'invalid_intent');assert.equal(inspections,0);
  assert.deepEqual((await f.a.load(f.id,'p1')).clock,before.clock);
  assert.equal((await clocks.submit(f.command('p1'),false)).receipt.outcome,'accepted');
 }finally{await clocks.close();await executor.close();await f.close();}
});
test('busy reservations are transient and the identical waiting concession succeeds after release',async()=>{
 const f=await fixture();try{
  const {validateSubmission}=await import('../dist/validation.js'),active=validateSubmission('p1',command(f.id,'held-active',3,'passTurn')),owner=await f.a.reservePlayer(active);assert.equal(owner.kind,'reserved');
  const waiting=command(f.id,'busy-concession',3,'concede');
  await assert.rejects(f.s.submitRefs('p2',waiting),e=>e.code==='BUSY');
  assert.equal(await f.using('match',async c=>(await c.query('SELECT count(*)::int AS n FROM match.command_receipts WHERE match_id=$1 AND command_id=$2',[f.id,waiting.commandId])).rows[0].n),0);
  await f.a.abort(owner.reservation);const result=await f.s.submitRefs('p2',waiting);assert.equal(result.receipt.outcome,'accepted');assert.equal((await f.s.view('p1',{matchId:f.id})).winner,'p1');
 }finally{await f.close();}
});
test('waiting-player reference concession at the exact deadline ends once without a timeout pass',async()=>{
 const f=await fixture();try{
  f.advance(1000);const c=command(f.id,'deadline-concession',3,'concede'),result=await f.s.submitRefs('p2',c);assert.equal(result.receipt.outcome,'accepted');
  await f.s.tickClocks();const again=await f.s.submitRefs('p2',c);assert.equal(again.duplicate,true);assert.deepEqual(again.receipt,result.receipt);
  assert.equal((await f.s.view('p1',{matchId:f.id})).winner,'p1');assert.equal((await f.s.readClock('p1',{matchId:f.id})).status,'ended');
 }finally{await f.close();}
});
test('timed service expires once through native pass, keeps old rejected receipts and binds participant clock reads',async()=>{
 const f=await fixture();try{
  const start=await f.s.readClock('p1',{matchId:f.id});assert.equal(start.players.find(p=>p.playerId==='p1').remainingMs,1000);
  f.advance(1000);const late=command(f.id,'too-late',3,'passTurn');
  const rejected=await f.s.submitRefs('p1',late);assert.equal(rejected.receipt.reason,'clock_expired');
  await Promise.all([f.s.tickClocks(),f.s.tickClocks()]);
  const view=await f.s.view('p1',{matchId:f.id});assert.equal(view.stateVersion,4);assert.equal(view.turnOwnerId,'p2');assert.equal(view.ended,false);
  const next=await f.s.readClock('p1',{matchId:f.id});assert.equal(next.players.find(p=>p.playerId==='p1').remainingMs,1000);assert.equal(next.players.find(p=>p.playerId==='p2').remainingMs,1000);
  const duplicate=await f.s.submitRefs('p1',late);assert.equal(duplicate.duplicate,true);assert.deepEqual(duplicate.receipt,rejected.receipt);
  for(const [actor,id]of[['outsider',f.id],['p1','missing-clock']])await assert.rejects(f.s.readClock(actor,{matchId:id}),e=>e.code==='FORBIDDEN');
  for(const secret of ['seed','checkpoint','reservation','randomOutcomes','session'])assert.equal(JSON.stringify(next).includes(secret),false);
 }finally{await f.close();}
});
test('audited pause/resume excludes an outage, preserves card refs and rejects stale or changed recovery decisions',async()=>{
 const f=await fixture();try{
  const before=await f.s.view('p1',{matchId:f.id}),clock=await f.s.readClock('p1',{matchId:f.id});f.advance(400);
  const pause={matchId:f.id,expectedStateVersion:before.stateVersion,expectedClockRevision:clock.clockRevision,operationId:'audited-pause',auditId:'qualification-auditor',reason:'recovery'};
  await assert.rejects(f.s.pauseClock({...pause,auditId:'forged'}),e=>e.code==='FORBIDDEN');
  await f.s.pauseClock(pause);assert.deepEqual(await f.s.view('p1',{matchId:f.id}),before);
  const frozen=await f.s.readClock('p1',{matchId:f.id});assert.equal(frozen.status,'paused');assert.ok(frozen.players.every(p=>p.timeoutCount===0));assert.equal(frozen.players.find(p=>p.playerId==='p1').remainingMs,600);
  f.advance(60000);const still=await f.s.readClock('p1',{matchId:f.id});assert.equal(still.players.find(p=>p.playerId==='p1').remainingMs,600);
  const resume={matchId:f.id,expectedStateVersion:3,expectedClockRevision:frozen.clockRevision,operationId:'audited-resume',auditId:'qualification-auditor'};
  await assert.rejects(f.s.resumeClock({...resume,expectedClockRevision:0}));
  await f.s.resumeClock(resume);const running=await f.s.readClock('p1',{matchId:f.id});assert.equal(running.status,'running');assert.ok(running.players.every(p=>p.timeoutCount===0));assert.equal(running.players.find(p=>p.playerId==='p1').remainingMs,600);
  const duplicate=await f.s.resumeClock(resume);assert.equal(duplicate.duplicate,true);
  await assert.rejects(f.s.resumeClock({...resume,reset:{playerId:'p1',remainingMs:1000}}),e=>e.code==='ID_CONFLICT');
 }finally{await f.close();}
});
test('each opening decision times out once as a loss and audited reset cannot choose a winner',async()=>{
 for(let phase=0;phase<3;phase++){
  const f=await fixture(false);try{
   for(let n=0;n<phase;n++){const v=await f.s.view('p1',{matchId:f.id});await f.s.submitRefs(v.priorityId,command(f.id,'advance-'+n,n,n===0?'chooseWhoGoesFirst':'alterHand',n===0?{playerId:'p1'}:{cardsToMulligan:[]}));}
   const before=await f.s.readClock('p1',{matchId:f.id}),loser=before.activePlayerId;f.advance(1000);await Promise.all([f.s.tickClocks(),f.s.tickClocks()]);
   const view=await f.s.view('p1',{matchId:f.id}),c=await f.s.readClock('p1',{matchId:f.id});assert.equal(view.stateVersion,phase+1);assert.equal(view.ended,true);assert.equal(view.endReason,'timeout');assert.equal(view.winner,f.players.find(p=>p!==loser));assert.equal(c.status,'ended');assert.equal(c.players.find(p=>p.playerId===loser).timeoutCount,1);
   await assert.rejects(f.s.resumeClock({matchId:f.id,expectedStateVersion:view.stateVersion,expectedClockRevision:c.clockRevision,operationId:'opening-recovery',auditId:'qualification-auditor',reset:{playerId:loser,remainingMs:1000}}));
  }finally{await f.close();}
 }
});
test('native whole-game timeout count survives normal turns and the third timeout ends in one replayable commit',async()=>{
 const f=await fixture();try{
  let version=3;
  for(let n=1;n<=3;n++){
   f.advance(1000);await Promise.all([f.s.tickClocks(),f.s.tickClocks()]);version++;
   const c=await f.s.readClock('p1',{matchId:f.id}),v=await f.s.view('p1',{matchId:f.id});assert.equal(c.timeoutLimit,3);assert.equal(c.players.find(p=>p.playerId==='p1').timeoutCount,n);assert.equal(c.players.find(p=>p.playerId==='p2').timeoutCount,0);assert.equal(v.ended,n===3);assert.equal(v.stateVersion,version);
   if(n<3){assert.equal((await f.s.submitRefs('p2',command(f.id,'normal-'+n,version,'passTurn'))).receipt.outcome,'accepted');version++;}
   else {assert.equal(v.endReason,'timeout');assert.equal(v.winner,'p2');assert.equal(c.status,'ended');}
  }
  const {restorePrivateMatch}=await import('../../../packages/engine-adapter/dist/index.js'),row=await f.a.load(f.id,'p1'),replayed=restorePrivateMatch(row.checkpoint,f.id);try{assert.equal(replayed.status().endReason,'timeout');assert.equal(replayed.status().winner,'p2');assert.equal(replayed.clock().players.find(p=>p.playerId==='p1').timeoutCount,3);}finally{replayed.dispose();}
  const totals=await f.using('match',async c=>{const r=[];for(const table of ['journal','outbox','command_receipts'])r.push((await c.query('SELECT count(*)::int AS n FROM match.'+table+' WHERE match_id=$1 AND state_version=$2',[f.id,version])).rows[0].n);return r;});assert.deepEqual(totals,[1,1,1]);
 }finally{await f.close();}
});
test('deadline sweeps, a player move and both concessions race to exactly one final result',async()=>{
 const f=await fixture();try{
  let version=3;
  for(let n=0;n<2;n++){f.advance(1000);await f.s.tickClocks();version++;await f.s.submitRefs('p2',command(f.id,'normal-'+n,version,'passTurn'));version++;}
  f.advance(1000);const requests=[['p1','passTurn'],['p1','concede'],['p2','concede']].map(([p,m],i)=>({p,c:command(f.id,'race-'+i,version,m)}));
  await Promise.allSettled([f.s.tickClocks(),f.s.tickClocks(),...requests.map(({p,c})=>f.s.submitRefs(p,c))]);await f.s.tickClocks();
  const v=await f.s.view('p1',{matchId:f.id});assert.equal(v.ended,true);assert.equal(v.stateVersion,version+1);assert.ok(['concession','timeout'].includes(v.endReason));
  const counts=await f.using('match',async c=>{const r=[];for(const t of ['journal','outbox'])r.push((await c.query('SELECT count(*)::int AS n FROM match.'+t+' WHERE match_id=$1 AND state_version=$2',[f.id,version+1])).rows[0].n);return r;});assert.deepEqual(counts,[1,1]);
  for(const {p,c}of requests){const first=await f.s.submitRefs(p,c),again=await f.s.submitRefs(p,c);assert.equal(again.duplicate,true);assert.deepEqual(first.receipt,again.receipt);}
 }finally{await f.close();}
});
test('an active player can concede at the exact deadline and players cannot invoke server forfeits',async()=>{
 const f=await fixture();try{
  assert.equal((await f.s.submit('p1',command(f.id,'forged-forfeit',3,'forfeitGame',{winnerId:'p1',reason:'timeout'}))).receipt.reason,'forbidden');
  f.advance(1000);assert.equal((await f.s.submitRefs('p1',command(f.id,'active-deadline-concede',3,'concede'))).receipt.outcome,'accepted');await f.s.tickClocks();assert.equal((await f.s.view('p1',{matchId:f.id})).endReason,'concession');
 }finally{await f.close();}
});
test('clock storage tampering cannot extend a deadline or alter a native remaining allowance',async()=>{
 const f=await fixture();try{
  const original=await f.using('match',async c=>(await c.query('SELECT state FROM match.clocks WHERE match_id=$1',[f.id])).rows[0].state);
  for(const edit of [s=>s.deadlineUtcMs+=1000,s=>s.remainingMs.p1=999,s=>s.engineTimestamp+=1,s=>s.policy.perActionBonusMs=100]){
   const changed=JSON.parse(JSON.stringify(original));edit(changed);await f.using('match',c=>c.query('UPDATE match.clocks SET state=$2::jsonb WHERE match_id=$1',[f.id,JSON.stringify(changed)]));
   await assert.rejects(f.s.readClock('p1',{matchId:f.id}),e=>e.code==='UNAVAILABLE');
   await f.using('match',c=>c.query('UPDATE match.clocks SET state=$2::jsonb WHERE match_id=$1',[f.id,JSON.stringify(original)]));
  }
 }finally{await f.close();}
});

test('an already-running owner that stalls cannot pause a second healthy owner through tick, submit or timeout',async()=>{
 const f=await clockFixture(),{createClockService}=await import('../dist/clock-service.js'),{createClockHealth}=await import('../dist/clock-health.js'),{createEngineExecutor}=await import('../dist/engine-executor.js'),{validateSubmission}=await import('../dist/validation.js');
 const executor=createEngineExecutor(),old=createClockService({repository:f.a,executor,pins:()=>{},health:createClockHealth({monotonicNow:f.now,maxGapMs:1000})}),healthy=createClockService({repository:f.b,executor,pins:()=>{},health:createClockHealth({monotonicNow:f.now,maxGapMs:1000})});
 try{
  await f.open();old.recordCreated(f.id);await old.tick();await healthy.tick();f.advance(500);await old.tick();await healthy.tick();
  for(const ms of [500,500,501]){f.advance(ms);await healthy.tick();}
  const before=await f.a.load(f.id,'p1');assert.equal(before.clock.status,'running');assert.equal(before.clock.lastHealthyUtcMs,f.now());
  await old.tick();assert.deepEqual((await f.a.load(f.id,'p1')).clock,before.clock);
  const command=validateSubmission(before.clock.activePlayerId,{matchId:f.id,commandId:'stalled-owner',expectedVersion:before.stateVersion,move:'passTurn',input:{}});
  await assert.rejects(old.submit(command,false),e=>e.code==='UNAVAILABLE');await old.timeout(f.id,before.stateVersion,before.clock.revision);
  assert.deepEqual((await f.a.load(f.id,'p1')).clock,before.clock);assert.equal((await f.a.load(f.id,'p1')).winner,null);
 }finally{await old.close();await healthy.close();await executor.close();await f.close();}
});
test('a cold proof reconstruction crossing the deadline happens after authoritative admission',async()=>{
 const f=await clockFixture(),{createClockService}=await import('../dist/clock-service.js'),{createClockHealth}=await import('../dist/clock-health.js'),{createEngineExecutor}=await import('../dist/engine-executor.js'),executor=createEngineExecutor();let inspections=0;
 const clocks=createClockService({repository:f.a,pins:()=>{},health:createClockHealth({monotonicNow:f.now}),executor:{...executor,execute:async job=>{if(job.kind==='clock-inspect'){inspections++;f.advance(2);}return executor.execute(job);}}});
 try{
  await f.open();clocks.recordCreated(f.id);f.advance(999);const result=await clocks.submit(f.command('p1'),false);
  assert.equal(result.receipt.outcome,'accepted');assert.equal(inspections,1);const after=await f.a.load(f.id,'p1');assert.equal(after.stateVersion,4);assert.equal(after.clock.remainingMs.p1,1);assert.equal(after.clock.anchorUtcMs,f.now());
 }finally{await clocks.close();await executor.close();await f.close();}
});
test('an illegal service result returning after a short lease pauses before any competing sweep',async()=>{
 const f=await clockFixture(),{createClockRepository}=await import('../../../packages/db/dist/index.js'),{createClockService}=await import('../dist/clock-service.js'),{createClockHealth}=await import('../dist/clock-health.js'),{createEngineExecutor}=await import('../dist/engine-executor.js'),executor=createEngineExecutor(),repository=createClockRepository('test',undefined,{leaseMs:1000,sampleForTest:async()=>f.now()});
 const clocks=createClockService({repository,pins:()=>{},health:createClockHealth({monotonicNow:f.now}),executor:{...executor,execute:async job=>{if(job.kind==='transition')f.advance(1500);return executor.execute(job);}}});
 try{
  await f.open();clocks.recordCreated(f.id);const before=await f.a.load(f.id,'p1'),command=f.command('p1','quest');
  await assert.rejects(clocks.submit(command,false),e=>e.code==='UNAVAILABLE');const after=await f.a.load(f.id,'p1');assert.equal(after.clock.status,'paused');assert.equal(after.clock.pauseReason,'recovery');assert.equal(after.stateVersion,before.stateVersion);assert.equal(await f.a.findReceipt(command),undefined);
 }finally{await clocks.close();await executor.close();await repository.close();await f.close();}
});
