import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync} from 'node:fs';
import {Worker} from 'node:worker_threads';
import {setImmediate} from 'node:timers';
import {PERSISTENT_ENGINE_IDENTITY} from '../../../packages/engine-adapter/dist/index.js';

test('match command validation separates trusted actor and binds exact semantic intent',async()=>{
 assert.ok(existsSync(new URL('../dist/validation.js',import.meta.url)),'PLAY-01 validation module required');
 const {validateSubmission}=await import('../dist/validation.js');
 const request={matchId:'m',commandId:'c',expectedVersion:0,move:'concede',input:{}};
 const a=validateSubmission('p1',request),b=validateSubmission('p1',{...request,input:{}});
 assert.equal(a.intentHash,b.intentHash);assert.notEqual(validateSubmission('p2',request).intentHash,a.intentHash);
 assert.notEqual(validateSubmission('p1',{...request,expectedVersion:1}).intentHash,a.intentHash);
 for(const value of [{...request,actor:'p2'},{...request,seed:'hidden'},{...request,state:{}},{...request,expectedVersion:-1},{...request,expectedVersion:0.5},{...request,input:{get hidden(){throw new Error('must not invoke')}}},{...request,input:{constructor:'unsafe'}},{...request,input:{x:'x'.repeat(17000)}},null])assert.throws(()=>validateSubmission('p1',value),/Invalid/);
 request.input.actor='spoof';assert.equal(a.intent.includes('spoof'),false);
});

test('actual worker executor creates/continues private engine and bounds deadline/queue/disposal',async()=>{
 assert.ok(existsSync(new URL('../dist/engine-executor.js',import.meta.url)),'PLAY-01 engine executor required');
 const {createEngineExecutor}=await import('../dist/engine-executor.js');
 const e=createEngineExecutor();
 try {
  const first=await e.execute({kind:'create',setup:{matchId:'worker-fixture',players:['p1','p2'],startTimestamp:100}});
  assert.equal(first.status.revision,0);assert.equal(first.status.rewardEligible,false);
  let current=first;
  for(const [actor,move,input]of[[first.status.choosingFirstPlayer,'chooseWhoGoesFirst',{playerId:'p1'}],['p1','alterHand',{cardsToMulligan:[]}],['p2','alterHand',{cardsToMulligan:[]}]]) {
   current=await e.execute({kind:'transition',matchId:'worker-fixture',checkpoint:current.checkpoint,command:{actor,expectedRevision:current.status.revision,timestamp:100,commandId:'open-'+actor+move,move,input}});assert.equal(current.result.accepted,true);
  }
  const next=await e.execute({kind:'transition',matchId:'worker-fixture',checkpoint:current.checkpoint,command:{actor:'p1',expectedRevision:current.status.revision,timestamp:100,commandId:'worker-concede',move:'concede',input:{}}});
  assert.equal(next.result.accepted,true);assert.equal(next.status.winner,'p2');assert.equal(next.status.revision,4);
 }finally{await e.close();await e.close();}
 await assert.rejects(e.execute({kind:'create',setup:{matchId:'x',players:['p1','p2'],startTimestamp:0}}),/unavailable/);
 const slow=createEngineExecutor({concurrency:1,maxQueue:0,executionTimeoutMs:1,queueTimeoutMs:1});
 try {
  const first=slow.execute({kind:'create',setup:{matchId:'timeout',players:['p1','p2'],startTimestamp:0}});first.catch(()=>{});
  await assert.rejects(slow.execute({kind:'create',setup:{matchId:'overflow',players:['p1','p2'],startTimestamp:0}}),/busy/);
  await assert.rejects(first,/timed out/);
 }finally{await slow.close();}
});

test('close waits for an already completing actual worker (deferred termination simulation)',async()=>{
 const {createEngineExecutor}=await import('../dist/engine-executor.js');
 const original=Worker.prototype.terminate;let release,entered;
 const gate=new Promise(r=>{release=r}),started=new Promise(r=>{entered=r});
 Worker.prototype.terminate=function(){const result=original.call(this);entered();return Promise.all([result,gate]).then(([code])=>code);};
 const e=createEngineExecutor();let pending,closing;
 try {
  pending=e.execute({kind:'create',setup:{matchId:'close-owner',players:['p1','p2'],startTimestamp:0}});pending.catch(()=>{});
  await started;let completed=false;closing=e.close().then(()=>{completed=true});
  await new Promise(r=>setImmediate(r));assert.equal(completed,false,'close returned before owned termination completed');
 }finally{release();await pending?.catch(()=>{});await closing;await e.close();Worker.prototype.terminate=original;}
});

test('worker uses the same executable-policy identity as its current server conditions',async()=>{
 const {createEngineExecutor}=await import('../dist/engine-executor.js');const e=createEngineExecutor();
 try {
  const result=await e.execute({kind:'create',setup:{matchId:'conditions-fixture',players:['p1','p2'],startTimestamp:0}});
  assert.equal(JSON.parse(result.checkpoint.archive).transcript.engineIdentity,PERSISTENT_ENGINE_IDENTITY);
 }finally{await e.close();}
});

test('actual executor times out queued work and rejects queued work on close',async()=>{
 const {createEngineExecutor}=await import('../dist/engine-executor.js');
 const job=id=>({kind:'create',setup:{matchId:id,players:['p1','p2'],startTimestamp:0}});
 const e=createEngineExecutor({concurrency:1,maxQueue:1,executionTimeoutMs:5000,queueTimeoutMs:1});
 const running=e.execute(job('queue-running'));running.catch(()=>{});
 try {
  await assert.rejects(e.execute(job('queue-expiry')),/queue timed out/);
  await running;
 }finally{await e.close();}
 const c=createEngineExecutor({concurrency:1,maxQueue:1});
 const active=c.execute(job('close-running'));active.catch(()=>{});
 const queued=c.execute(job('close-queued'));queued.catch(()=>{});
 const closing=c.close();
 await assert.rejects(queued,/unavailable/);await active.catch(()=>{});await closing;
 await assert.rejects(c.execute(job('closed')),/unavailable/);
});

test('actual projection worker returns only a closed DTO, no checkpoint or server status',async()=>{
 const {createEngineExecutor}=await import('../dist/engine-executor.js'),e=createEngineExecutor();
 try {
  assert.equal(typeof e.project,'function','bounded projection executor is missing');
  const first=await e.execute({kind:'create',setup:{matchId:'project-worker',players:['p1','p2'],startTimestamp:100}});
  const job={kind:'project',matchId:'project-worker',checkpoint:first.checkpoint,viewer:{kind:'participant',playerId:'p1'}};
  const view=await e.project(job);assert.equal(view.matchId,job.matchId);assert.equal(view.stateVersion,0);
  for(const key of ['checkpoint','status','seed','seedCommitment','randomOutcomes','G','ctx'])assert.equal(key in view,false,key);
  await assert.rejects(e.project({...job,viewer:{kind:'judge'}}),/unavailable/);
 }finally{await e.close();}
});
