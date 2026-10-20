import test from 'node:test';
import assert from 'node:assert/strict';
import {fork} from 'node:child_process';
import {once} from 'node:events';
import {randomUUID} from 'node:crypto';
import {createClockRepository} from '../../../packages/db/dist/index.js';
import {createReleaseRegistry} from '../../../packages/service-runtime/dist/index.js';
import {createMatchService} from '../dist/service.js';
import {createClockHealth} from '../dist/clock-health.js';
import {createEngineExecutor} from '../dist/engine-executor.js';
import {releases,using,cleanup,command,counts} from './fixtures.mjs';
import {clockPolicy} from './clock-fixtures.mjs';
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function until(read,predicate,timeout=10000){const end=performance.now()+timeout;while(performance.now()<end){const v=await read();if(predicate(v))return v;await sleep(40);}throw Error('Owned clock condition timed out');}
async function fixture({budget=6000,runner=true,executor,leaseMs=15000,maxGapMs=15000,timeoutLimit=3}={}){
 const id='clock-process-'+randomUUID(),manifest=JSON.parse(JSON.stringify(releases().active));manifest.protocol={min:2,max:4};manifest.releaseId='clock-process-'+randomUUID();
 const registry=createReleaseRegistry([manifest],manifest.releaseId),repository=createClockRepository('test',undefined,{leaseMs,maxHealthyGapMs:maxGapMs});
 const policy={...clockPolicy,timeoutLimit,initialReserveMs:budget,reserveCapMs:budget,resetTimeOnSkipMs:budget};
 const service=createMatchService({repository,releases:registry,...(executor?{executor}:{}),clocks:{repository,health:createClockHealth({maxGapMs}),runner:{enabled:runner,intervalMs:40},recoveryAuthority:async r=>r.auditId==='qualification-auditor'?r.auditId:null}});
 try{
 await service.create({matchId:id,players:['p1','p2'],clock:policy});
 const first=await service.view('p1',{matchId:id});for(const [actor,move,input]of [[first.priorityId,'chooseWhoGoesFirst',{playerId:'p1'}],['p1','alterHand',{cardsToMulligan:[]}],['p2','alterHand',{cardsToMulligan:[]}]]){const v=await service.view(actor,{matchId:id});assert.equal((await service.submit(actor,command(id,randomUUID(),v.stateVersion,move,input))).receipt.outcome,'accepted');}
 return {id,manifest,repository,service,leaseMs,maxGapMs,async close(){await service.close();await cleanup(id);}};
 }catch(error){await service.close();await cleanup(id);throw error;}
}
async function child(f,phase){
 const env=Object.fromEntries(Object.entries(process.env).filter(([k])=>k!=='NODE_TEST_CONTEXT'));
 const c=fork(new URL('./clock-child.mjs',import.meta.url),[JSON.stringify({id:f.id,manifest:f.manifest,phase,leaseMs:f.leaseMs,maxGapMs:f.maxGapMs})],{execArgv:[],env,stdio:['ignore','pipe','pipe','ipc']});c.stdout.resume();c.stderr.resume();
 const exit=once(c,'exit');let seq=0;const waiting=new Map();
 c.on('message',m=>{if(m.request){const r=waiting.get(m.request);if(r){clearTimeout(r.timer);waiting.delete(m.request);if(m.error)r.reject(Object.assign(Error('Owned child refusal'),{code:m.error}));else r.resolve(m.value);}}});
 await new Promise((resolve,reject)=>{const timer=setTimeout(()=>{c.kill('SIGKILL');reject(Error('Owned child startup timed out'));},10000);c.on('message',m=>{if(m.ready){clearTimeout(timer);resolve();}});c.once('error',reject);});
 const rpc=(method,value)=>new Promise((resolve,reject)=>{const request=++seq,timer=setTimeout(()=>{waiting.delete(request);reject(Error('Owned child request timed out'));},12000);waiting.set(request,{resolve,reject,timer});c.send({request,method,value});});
 return {c,rpc,exit,async join(){await rpc('tick');await sleep(120);await rpc('tick');},async close(){for(const r of waiting.values()){clearTimeout(r.timer);r.resolve(null);}waiting.clear();if(c.exitCode===null&&c.signalCode===null){c.kill('SIGKILL');await exit;}}};
}
test('actual runner continues with zero clients and a fresh process joins a healthy owner without pausing',async()=>{
 const f=await fixture({budget:1800});let other;try{
  other=await child(f);await other.join();const current=await other.rpc('clock');assert.equal(current.status,'running');
  const row=await until(()=>counts(f.id),r=>r.stateVersion===4);assert.equal(row.ended,false);
  await other.rpc('tick');const next=await other.rpc('clock');assert.equal(next.activePlayerId,'p2');assert.equal(next.status,'running');
 }finally{await other?.close();await f.close();}
});
test('loss of all runners creates an audited recovery pause without charging the outage',async()=>{
 const f=await fixture({maxGapMs:2000});let other;try{
  await f.service.close();await sleep(2150);other=await child(f);await other.rpc('tick');
  const c=await other.rpc('clock');assert.equal(c.status,'paused');assert.equal(c.pauseReason,'recovery');assert.ok(c.players.every(p=>p.timeoutCount===0));const remaining=c.players.find(p=>p.playerId==='p1').remainingMs;
  await sleep(100);assert.equal((await other.rpc('clock')).players.find(p=>p.playerId==='p1').remainingMs,remaining);assert.equal((await counts(f.id)).ended,false);
 }finally{await other?.close();await f.close();}
});
test('an engine calculation outliving its lease is fenced and durably paused',async()=>{
 const engine=createEngineExecutor();let armed=false,entered,release;const ready=new Promise(r=>{entered=r}),gate=new Promise(r=>{release=r});
 const executor={...engine,async execute(job){if(armed&&job.kind==='transition'){entered();await gate;}return engine.execute(job);}};
 const f=await fixture({budget:1800,executor,leaseMs:1000});try{
  armed=true;const pending=f.service.submit('p1',command(f.id,'crossing',3,'passTurn'));await ready;
  await until(()=>f.repository.loadSystem(f.id),r=>Date.now()>=r.clock.deadlineUtcMs,3000);await f.service.tickClocks();
  release();await assert.rejects(pending,e=>e.code==='UNAVAILABLE');assert.equal((await counts(f.id)).stateVersion,3);assert.equal((await f.repository.loadSystem(f.id)).clock.status,'paused');
 }finally{release();await f.close();}
});
test('a timely action completes across the deadline within its lease and beats the later timeout',async()=>{
 const engine=createEngineExecutor();let armed=false,entered,release;const ready=new Promise(r=>{entered=r}),gate=new Promise(r=>{release=r});
 const executor={...engine,async execute(job){if(armed&&job.kind==='transition'){entered();await gate;}return engine.execute(job);}};
 const f=await fixture({budget:3000,executor});try{
  const deadline=(await f.repository.loadSystem(f.id)).clock.deadlineUtcMs;
  await until(()=>f.repository.sample(),utc=>utc>=deadline-400,4000);armed=true;
  const pending=f.service.submit('p1',command(f.id,'timely-crossing',3,'passTurn'));await ready;
  await until(()=>f.repository.sample(),utc=>utc>=deadline,1000);await f.service.tickClocks();release();
  assert.equal((await pending).receipt.outcome,'accepted');assert.equal((await counts(f.id)).stateVersion,4);assert.equal((await f.repository.loadSystem(f.id)).clock.activePlayerId,'p2');
 }finally{release();await f.close();}
});
test('six independent server processes race the same timed command and recover one identical durable receipt',async()=>{
 const f=await fixture({budget:20000}),children=[];try{
  for(let i=0;i<6;i++){const c=await child(f);children.push(c);await c.join();}
  const move=command(f.id,'six-way-timed',3,'concede');const results=await Promise.allSettled(children.map(c=>c.rpc('submit',move)));
  assert.equal(results.filter(r=>r.status==='fulfilled'&&!r.value.duplicate&&r.value.receipt.outcome==='accepted').length,1);
  const retried=await Promise.all(children.map(c=>c.rpc('submit',move)));assert.equal(retried.every(r=>r.duplicate&&r.receipt.outcome==='accepted'),true);
  for(const result of retried)assert.deepEqual(result.receipt,retried[0].receipt);
  const final=await counts(f.id);assert.equal(final.stateVersion,4);assert.equal(final.ended,true);assert.equal(final.journal,4);assert.equal(final.outbox,4);
 }finally{for(const c of children)await c.close();await f.close();}
});
for(const phase of ['before','after'])test('timed process death '+phase+' COMMIT preserves clock, receipt and journal atomicity',async()=>{
 const f=await fixture({leaseMs:5000});let c;try{
  c=await child(f,phase);await c.join();let timer;const boundary=new Promise((resolve,reject)=>{timer=setTimeout(()=>reject(Error('Owned commit boundary timed out')),8000);c.c.on('message',m=>{if(m.boundary)resolve(m);});});
  const pending=c.rpc('submit',command(f.id,'kill-'+phase,3,'passTurn'));pending.catch(()=>{});try{await Promise.race([boundary,pending.then(()=>{throw Error('Owned commit boundary not reached');})]);}finally{clearTimeout(timer);}await c.close();await pending;
  const final=await counts(f.id);assert.equal(final.stateVersion,phase==='before'?3:4);assert.equal(final.journal,phase==='before'?3:4);assert.equal(final.outbox,phase==='before'?3:4);
  if(phase==='before'){await sleep(f.leaseMs+100);await f.service.tickClocks();assert.equal((await f.repository.loadSystem(f.id)).clock.status,'paused');}
  else assert.equal((await f.repository.loadSystem(f.id)).clock.stateVersion,4);
 }finally{await c?.close();await f.close();}
});
for(const table of ['matches','command_receipts','journal','outbox','clocks','clock_events'])test('clock commit rollback at '+table+' leaves no partial accepted state',async()=>{
 const f=await fixture({runner:false}),name='play04_fault_'+table;try{
  const before=await counts(f.id);
  await using('migrator',async c=>{
   const predicate=table==='matches'?'NEW.state_version>3':table==='clocks'?"NEW.state->>'status'='running'":table==='clock_events'?"NEW.kind='accepted'":'true';
   await c.query("CREATE FUNCTION match."+name+"() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN IF NEW.match_id='"+f.id+"' AND ("+predicate+") THEN RAISE EXCEPTION 'Owned clock fault'; END IF; RETURN NEW; END $$");
   await c.query('CREATE TRIGGER '+name+' BEFORE '+(['matches','clocks'].includes(table)?'UPDATE':'INSERT')+' ON match.'+table+' FOR EACH ROW EXECUTE FUNCTION match.'+name+'()');
  });
  await assert.rejects(f.service.submit('p1',command(f.id,'rollback',3,'passTurn')),e=>e.code==='UNAVAILABLE');
  assert.deepEqual(await counts(f.id),before);
  const row=await f.repository.loadSystem(f.id);assert.equal(row.clock.stateVersion,3);assert.equal(row.clock.checkpointDigest,row.checkpoint.digest);
 }finally{await using('migrator',c=>c.query('DROP TRIGGER IF EXISTS '+name+' ON match.'+table+'; DROP FUNCTION IF EXISTS match.'+name+'()'));await f.close();}
});

test('two independent timeout owners and both concessions race one terminal result at the configured limit',async()=>{
 const f=await fixture({budget:6000,timeoutLimit:1,runner:false}),children=[];try{
  for(let i=0;i<2;i++){const c=await child(f);children.push(c);await c.join();}
  const deadline=(await f.repository.loadSystem(f.id)).clock.deadlineUtcMs;
  await until(()=>f.repository.sample(),utc=>utc>=deadline,7000);
  await Promise.allSettled([...children.map(c=>c.rpc('tick')),children[0].rpc('submit',command(f.id,'race-active-pass',3,'passTurn')),children[0].rpc('submit',command(f.id,'race-active-concede',3,'concede')),children[1].rpc('submitAs',{actor:'p2',command:command(f.id,'race-waiting-concede',3,'concede')})]);
  await f.service.tickClocks();const r=await counts(f.id);assert.equal(r.ended,true);assert.equal(r.stateVersion,4);assert.equal(r.journal,4);assert.equal(r.outbox,4);
  const v=await f.service.view('p1',{matchId:f.id});assert.ok(['timeout','concession'].includes(v.endReason));
 }finally{for(const c of children)await c.close();await f.close();}
});
