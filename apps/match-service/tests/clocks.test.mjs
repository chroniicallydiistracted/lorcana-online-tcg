import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync} from 'node:fs';
import {createEngineExecutor} from '../dist/engine-executor.js';
const policy={schemaVersion:1,id:'qualification-dynamic-v1',profile:'qualification',mode:'dynamic',initialReserveMs:1000,reserveCapMs:1000,perActionBonusMs:0,perTurnPassBonusMs:0,resetTimeOnSkipMs:1000,graceMs:0};
async function healthFactory(){assert.ok(existsSync(new URL('../dist/clock-health.js',import.meta.url)),'bounded clock-health sampler is missing');return (await import('../dist/clock-health.js')).createClockHealth;}

test('clock-health uses monotonic brackets, detects cumulative calendar divergence and requires an explicit reset',async()=>{
 const create=await healthFactory();let mono=0,utc=10000;
 const h=create({monotonicNow:()=>mono,toleranceMs:50,maxGapMs:1000}),read=()=>Promise.resolve(utc);
 assert.equal((await h.sample(read)).healthy,true);
 mono=300;utc=10300;assert.equal((await h.sample(read)).healthy,true);
 mono=600;utc=10700;assert.deepEqual((await h.sample(read)).reason,'time_unreliable');
 mono=700;utc=10800;assert.equal((await h.sample(read)).healthy,false,'uncertainty cannot auto-heal');
 h.reset();assert.equal((await h.sample(read)).healthy,true);
 mono=1800;utc=11900;assert.equal((await h.sample(read)).reason,'recovery');
});
test('clock-health accepts network timing uncertainty but rejects backward/invalid samples without exposing reader errors',async()=>{
 const create=await healthFactory();let samples=[0,10,200,220],utc=10000;
 const h=create({monotonicNow:()=>samples.shift(),toleranceMs:10,maxGapMs:1000});
 assert.equal((await h.sample(async()=>utc)).healthy,true);utc=10205;assert.equal((await h.sample(async()=>utc)).healthy,true);
 for(const value of [9999,NaN,Infinity,-1]){
  let mono=0;const c=create({monotonicNow:()=>mono,toleranceMs:10,maxGapMs:1000});await c.sample(async()=>10000);mono=100;
  assert.equal((await c.sample(async()=>value)).healthy,false);
 }
 const c=create();const failed=await c.sample(async()=>{throw Error('private-reader-failure');});assert.equal(failed.healthy,false);assert.equal(JSON.stringify(failed).includes('private-reader-failure'),false);
});
test('actual timed worker automatically uses a legal pass and exposes only internal constructed clock data',async()=>{
 const e=createEngineExecutor();try{
  let current=await e.execute({kind:'create',setup:{matchId:'timed-worker',players:['p1','p2'],startTimestamp:100,clock:policy}});
  assert.ok(current.clock,'worker clock result is missing');
  for(const [actor,move,input]of [[current.status.choosingFirstPlayer,'chooseWhoGoesFirst',{playerId:'p1'}],['p1','alterHand',{cardsToMulligan:[]}],['p2','alterHand',{cardsToMulligan:[]}]])current=await e.execute({kind:'transition',matchId:'timed-worker',checkpoint:current.checkpoint,command:{actor,move,input,timestamp:100,expectedRevision:current.status.revision,commandId:'open-'+actor+move}});
  const result=await e.execute({kind:'timeout',matchId:'timed-worker',checkpoint:current.checkpoint,timestamp:1100,commandId:'clock-timeout'});
  assert.equal(result.result.accepted,true);assert.equal(result.status.revision,4);assert.equal(result.status.ended,false);assert.equal(result.clock.activePlayerId,'p2');assert.equal(result.clock.players.find(p=>p.playerId==='p1').remainingMs,1000);
  const inspected=await e.execute({kind:'clock-inspect',matchId:'timed-worker',checkpoint:result.checkpoint});assert.deepEqual(inspected.clock,result.clock);
 }finally{await e.close();}
});
test('actual timeout worker pauses instead of inventing an opening choice or forcing a winner',async()=>{
 const e=createEngineExecutor();try{
  const first=await e.execute({kind:'create',setup:{matchId:'choice-worker',players:['p1','p2'],startTimestamp:100,clock:policy}});
  const result=await e.execute({kind:'timeout',matchId:'choice-worker',checkpoint:first.checkpoint,timestamp:1100,commandId:'opening-timeout'});
  assert.equal(result.result.accepted,false);assert.equal(result.result.code,'NO_LEGAL_DEFAULT');assert.equal(result.status.revision,0);assert.equal(result.status.winner,null);assert.equal(result.clock.running,false);
  const resumed=await e.execute({kind:'clock-control',matchId:'choice-worker',checkpoint:result.checkpoint,controls:[{kind:'reset',timestamp:1100,playerId:result.clock.activePlayerId,remainingMs:1000},{kind:'resume',timestamp:1100}]});
  assert.equal(resumed.clock.running,true);assert.equal(resumed.status.revision,0);
 }finally{await e.close();}
});
test('clock runner never overlaps owned sweeps and close waits for a pending sweep',async()=>{
 assert.ok(existsSync(new URL('../dist/clock-runner.js',import.meta.url)),'owned clock runner is missing');
 const {createClockRunner}=await import('../dist/clock-runner.js');let release,entered;
 const gate=new Promise(r=>{release=r}),started=new Promise(r=>{entered=r});let active=0,overlap=false,calls=0;
 const runner=createClockRunner({clocks:{tick:async()=>{calls++;if(++active>1)overlap=true;entered();await gate;active--; }},intervalMs:10,batchSize:1});
 try{
  runner.start();runner.start();await started;await new Promise(r=>setTimeout(r,35));assert.equal(calls,1);assert.equal(overlap,false);
  let done=false;const closing=runner.close().then(()=>{done=true;});await new Promise(r=>setTimeout(r,15));assert.equal(done,false);release();await closing;
  await new Promise(r=>setTimeout(r,20));assert.equal(calls,1);assert.throws(()=>runner.start());
 }finally{release();await runner.close();}
});
test('overlapping time samples cannot manufacture backward-clock evidence from reordered query responses',async()=>{
 const create=await healthFactory();let release;
 const gate=new Promise(r=>{release=r});let first=true;
 const health=create();const read=async()=>{if(first){first=false;await gate;return 10000;}return 10001;};
 const a=health.sample(read),b=health.sample(read);await new Promise(r=>setTimeout(r,15));release();
 const results=await Promise.all([a,b]);assert.equal(results.every(r=>r.healthy),true);
});
test('simulated service shutdown stops a running sweep before it starts another stored match',async()=>{
 const {createMatchService}=await import('../dist/service.js');let release,entered,loads=0;
 const gate=new Promise(r=>{release=r}),started=new Promise(r=>{entered=r});
 const repository={sample:async()=>Date.now(),scan:async()=>['first','second'],loadSystem:async()=>{loads++;entered();await gate;return undefined;},close:async()=>{}};
 const service=createMatchService({repository,releases:{active:{purpose:'foundation',components:{engine:{status:'built'}},protocol:{min:1,max:3}}},executor:{close:async()=>{}},clocks:{repository,runner:{intervalMs:10}}});
 try{await started;const closing=service.close();await new Promise(r=>setTimeout(r,10));release();await closing;assert.equal(loads,1);}
 finally{release();await service.close();}
});

// Simulated bookkeeping/capacity only: no engine or database acceptance inferred.
async function capacityFixture(protocol={min:1,max:3}){
 const {createMatchService}=await import('../dist/service.js');const rows=new Map();let committed=0;
 const manifest={purpose:'foundation',releaseId:'capacity-fixture',components:{engine:{status:'built'}},protocol};
 const repository={sample:async()=>10000,scan:async()=>[],activeClockIds:async ids=>ids.filter(id=>{const m=rows.get(id);return m&&!m.ended&&['running','processing'].includes(m.clock.status);}),loadSystem:async id=>rows.get(id),create:async value=>{rows.set(value.matchId,value);committed++;return value;},createTimed:async value=>{const old=rows.get(value.matchId);if(old)return {match:old,created:false};rows.set(value.matchId,value);committed++;return {match:value,created:true};},close:async()=>{}};
 const executor={execute:async job=>{assert.equal(job.kind,'create');await Promise.resolve();return {status:{revision:0,ended:false,winner:null,rewardEligible:false},checkpoint:{archive:'synthetic-bookkeeping-only',digest:'a'.repeat(64)},clock:{policy:job.setup.clock,startedAtMs:job.setup.startTimestamp,activePlayerId:'p1',running:true,players:['p1','p2'].map(playerId=>({playerId,remainingMs:1000}))}};},close:async()=>{}};
 const service=createMatchService({repository,executor,releases:{active:manifest,resolvePinned:()=>manifest},clocks:{repository,runner:{enabled:false}}});
 return {rows,service,repository,committed:()=>committed,create:id=>service.create({matchId:id,players:['p1','p2'],clock:policy})};
}
test('continuity capacity is reclaimed over more than128 sequential remotely completed matches',async()=>{
 const f=await capacityFixture();try{for(let i=0;i<130;i++){const id='remote-completion-'+i;await f.create(id);const m=f.rows.get(id);m.ended=true;m.clock.status='ended';}assert.equal(f.committed(),130);}finally{await f.service.close();}
});
test('parallel creation reserves continuity capacity before saving a row and reports no false creation failure',async()=>{
 const f=await capacityFixture();try{
  for(let i=0;i<127;i++)await f.create('active-'+i);
  const results=await Promise.allSettled([f.create('last-slot-a'),f.create('last-slot-b')]);assert.equal(results.filter(r=>r.status==='fulfilled').length,1);assert.equal(results.filter(r=>r.status==='rejected'&&r.reason.code==='UNAVAILABLE').length,1);assert.equal(f.committed(),128);
 }finally{await f.service.close();}
});
test('terminal continuity probes are reclaimed without granting a new row continuity before independent progress',async()=>{
 const f=await capacityFixture(),{createClockService}=await import('../dist/clock-service.js'),{createClockHealth}=await import('../dist/clock-health.js');let utc=10000,current,inspections=0;
 await f.create('probe-template');const template=f.rows.get('probe-template');template.ended=true;
 const repository={...f.repository,sample:async()=>utc,scan:async()=>[current],heartbeat:async()=>{}};
 const clocks=createClockService({repository,pins:()=>{},health:createClockHealth({monotonicNow:()=>utc}),executor:{execute:async job=>{assert.equal(job.kind,'clock-inspect');inspections++;return {checkpoint:template.checkpoint,status:{revision:0,ended:false,winner:null,rewardEligible:false},clock:{policy,startedAtMs:10000,activePlayerId:'p1',running:true,players:['p1','p2'].map(playerId=>({playerId,remainingMs:1000,timeoutCount:0}))}};}}});
 try{
  for(let i=0;i<129;i++){current='probe-'+i;f.rows.set(current,{...template,matchId:current,ended:false,clock:{...template.clock,status:'running'}});await clocks.tick();assert.equal(inspections,0);if(i<128)f.rows.get(current).ended=true;}
  utc++;f.rows.get(current).clock.lastHealthyUtcMs=utc;await clocks.tick();assert.equal(inspections,1,'the129th row must acquire continuity only after independent progress');
 }finally{await clocks.close();await f.service.close();}
});
test('untimed creation on a live3-only release is refused before any durable row is saved',async()=>{
 const f=await capacityFixture({min:3,max:3});try{await assert.rejects(f.service.create({matchId:'untimed-under-live3-only',players:['p1','p2']}),e=>e.code==='INVALID_REQUEST');assert.equal(f.committed(),0);}finally{await f.service.close();}
});
