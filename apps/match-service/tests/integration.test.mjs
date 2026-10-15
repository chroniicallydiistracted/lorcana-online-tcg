import test from 'node:test';
import assert from 'node:assert/strict';
import {fork} from 'node:child_process';
import {createMatchRepository,client} from '../../../packages/db/dist/index.js';
import {createEngineExecutor} from '../dist/engine-executor.js';
import {service,fixtureId,command,open,counts,cleanup,using} from './fixtures.mjs';

test('real committed receipt is stable after retry, reconnect and release-registry recreation',async()=>{
 const id=fixtureId(),s=service();let other;
 try {
  let invoked=0;const players=['p1','p2'];Object.defineProperty(players,'0',{enumerable:true,get(){invoked++;return 'p1';}});
  await assert.rejects(s.create({matchId:id,players}),e=>e.code==='INVALID_REQUEST');
  assert.equal(invoked,0,'untrusted creation accessor must never run');
  const v=await open(s,id),c=command(id,'stable',v);
  const first=await s.submit('p1',c);assert.equal(first.receipt.outcome,'accepted');assert.equal(first.duplicate,false);
  assert.deepEqual((await s.submit('p1',c)).receipt,first.receipt);
  await assert.rejects(s.submit('p1',{...c,input:{altered:true}}),e=>e.code==='ID_CONFLICT');
  await s.close();other=service();const retried=await other.submit('p1',c);
  assert.equal(retried.duplicate,true);assert.deepEqual(retried.receipt,first.receipt);
  assert.deepEqual(await counts(id),{command_receipts:4,journal:4,outbox:4,stateVersion:4,digest:(await counts(id)).digest,ended:true,winner:'p2'});
 }finally{await s.close();await other?.close();await cleanup(id);}
});

test('two independent actual candidates race; only one CAS and terminal event commit',async()=>{
 const id=fixtureId(),init=service();let a,b;
 const executorA=createEngineExecutor(),executorB=createEngineExecutor();let arrived=0,release;
 const barrier=new Promise(r=>{release=r});
 const wrap=e=>({execute:async job=>{const result=await e.execute(job);if(job.kind==='transition'){if(++arrived===2)release();await barrier;}return result;},close:()=>e.close()});
 try {
  const v=await open(init,id);a=service(createMatchRepository('test'),{executor:wrap(executorA)});b=service(createMatchRepository('test'),{executor:wrap(executorB)});
  const results=await Promise.all([a.submit('p1',command(id,'race-a',v)),b.submit('p2',command(id,'race-b',v))]);
  assert.deepEqual(results.map(r=>r.receipt.outcome).sort(),['accepted','stale']);
  const state=await counts(id);assert.equal(state.stateVersion,v+1);assert.equal(state.journal,v+1);assert.equal(state.outbox,v+1);assert.equal(state.command_receipts,v+2);
  const terminals=await using('match',async c=>(await c.query("SELECT count(*)::int AS n FROM match.outbox WHERE match_id=$1 AND kind='match_completed'",[id])).rows[0].n);assert.equal(terminals,1);
 }finally{release();await init.close();await a?.close();await b?.close();await executorA.close();await executorB.close();await cleanup(id);}
});

test('identical concurrent intents commit once; actor scope and altered content cannot steal a receipt',async()=>{
 const id=fixtureId(),s=service(),other=service();
 try {
  const v=await open(s,id),c=command(id,'same-id',v);
  const results=await Promise.all([s.submit('p1',c),other.submit('p1',c)]);
  assert.deepEqual(results[0].receipt,results[1].receipt);assert.equal(results.filter(r=>r.duplicate).length,1);
  const peer=await other.submit('p2',c);assert.equal(peer.receipt.actorId,'p2');assert.equal(peer.receipt.outcome,'stale');
  await assert.rejects(s.submit('outsider',c),e=>e.code==='FORBIDDEN');
  await assert.rejects(s.submit('p1',{...c,expectedVersion:v+1}),e=>e.code==='ID_CONFLICT');
  const state=await counts(id);assert.equal(state.journal,4);assert.equal(state.outbox,4);assert.equal(state.command_receipts,5);
 }finally{await s.close();await other.close();await cleanup(id);}
});

test('debug/unknown/stale rejections are durable, expose no private state and never mutate the checkpoint',async()=>{
 const id=fixtureId(),s=service();
 try {
  const v=await open(s,id),before=await counts(id);
  for(const [i,move]of ['manualSetLore','manualSetInkDrops','forfeitGame','unregistered'].entries()) {
   const c=command(id,'forbidden-'+i,v,move,{amount:20});const r=await s.submit('p1',c);
   assert.equal(r.receipt.outcome,'rejected');assert.equal(r.receipt.reason,'forbidden');assert.deepEqual((await s.submit('p1',c)).receipt,r.receipt);
   assert.equal('checkpoint' in r.receipt,false);assert.equal('seed' in r.receipt,false);
  }
  const stale=await s.submit('p1',command(id,'stale',v-1,'passTurn'));assert.equal(stale.receipt.outcome,'stale');
  await assert.rejects(s.submit('p1',{...command(id,'forgery',v),actor:'p2'}),e=>e.code==='INVALID_REQUEST');
  const after=await counts(id);assert.equal(after.digest,before.digest);assert.equal(after.stateVersion,v);assert.equal(after.journal,v);assert.equal(after.outbox,v);
 }finally{await s.close();await cleanup(id);}
});

for(const table of ['journal','outbox'])test('actual '+table+' SQL failure rolls back state, receipt and every durable record',async()=>{
 const id=fixtureId(),s=service(),name='play01_failure_'+table;
 try {
  const v=await open(s,id),before=await counts(id);
  await using('migrator',async c=>{
   await c.query("CREATE FUNCTION match."+name+"() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN IF NEW.match_id='"+id+"' THEN RAISE EXCEPTION 'Owned fault fixture'; END IF; RETURN NEW; END $$");
   await c.query('CREATE TRIGGER '+name+' BEFORE INSERT ON match.'+table+' FOR EACH ROW EXECUTE FUNCTION match.'+name+'()');
  });
  await assert.rejects(s.submit('p1',command(id,'rollback-'+table,v)),e=>e.code==='UNAVAILABLE');
  assert.deepEqual(await counts(id),before);
  await using('migrator',c=>c.query('DROP TRIGGER '+name+' ON match.'+table+'; DROP FUNCTION match.'+name+'()'));
  assert.equal((await s.submit('p1',command(id,'rollback-'+table,v))).receipt.outcome,'accepted');
 }finally{
  await using('migrator',c=>c.query('DROP TRIGGER IF EXISTS '+name+' ON match.'+table+'; DROP FUNCTION IF EXISTS match.'+name+'()'));
  await s.close();await cleanup(id);
 }
});

test('API and worker roles cannot read private match seed/journal/outbox or cross the test/local boundary',async()=>{
 for(const role of ['api','worker'])for(const table of ['matches','command_receipts','journal','outbox','releases']) {
  const c=client('test',role);await c.connect();try{await assert.rejects(c.query('SELECT * FROM match.'+table),e=>e.code==='42501');}finally{await c.end();}
 }
});

test('unavailable pins, corrupt private checkpoint and worker failure cannot create a receipt or transition',async()=>{
 const id=fixtureId(),s=service();let failed;
 try {
  const v=await open(s,id),before=await counts(id);
  await using('match',c=>c.query("UPDATE match.matches SET engine_identity=$2 WHERE match_id=$1",[id,'0'.repeat(64)]));
  await assert.rejects(s.submit('p1',command(id,'bad-pin',v)),e=>e.code==='PIN_UNAVAILABLE');
  const {PERSISTENT_ENGINE_IDENTITY}=await import('../../../packages/engine-adapter/dist/index.js');
  await using('match',c=>c.query('UPDATE match.matches SET engine_identity=$2 WHERE match_id=$1',[id,PERSISTENT_ENGINE_IDENTITY]));
  const checkpoint=await using('match',async c=>(await c.query('SELECT checkpoint FROM match.matches WHERE match_id=$1',[id])).rows[0].checkpoint);
  await using('match',c=>c.query("UPDATE match.matches SET checkpoint='not-json' WHERE match_id=$1",[id]));
  await assert.rejects(s.submit('p1',command(id,'bad-checkpoint',v)),e=>e.code==='UNAVAILABLE');
  await using('match',c=>c.query('UPDATE match.matches SET checkpoint=$2 WHERE match_id=$1',[id,checkpoint]));
  failed=service(createMatchRepository('test'),{executor:{execute:async()=>{throw new Error('private worker failure fixture');},close:async()=>{}}});
  await assert.rejects(failed.submit('p1',command(id,'worker-failure',v)),e=>e.code==='UNAVAILABLE'&&!e.message.includes('private worker failure'));
  assert.deepEqual(await counts(id),before);
  assert.equal((await s.submit('p1',command(id,'recovered',v))).receipt.outcome,'accepted');
 }finally{await s.close();await failed?.close();await cleanup(id);}
});

function child(mode,id,c) {
 const env=Object.fromEntries(Object.entries(process.env).filter(([key])=>key!=='NODE_TEST_CONTEXT'));
 const owned=fork(new URL('./fault-child.mjs',import.meta.url),[mode,id,JSON.stringify(c)],{execArgv:[],env,stdio:['ignore','pipe','pipe','ipc']});
 owned.stdout.resume();owned.stderr.resume();
 const exited=new Promise(r=>owned.once('exit',(code,signal)=>r({code,signal})));
 const message=new Promise((resolve,reject)=>{
  const timer=setTimeout(()=>{owned.kill('SIGKILL');reject(new Error('Owned child did not report'));},15000);
  owned.once('message',m=>{clearTimeout(timer);if(m.error)reject(new Error('Owned child failed'));else resolve(m);});owned.once('error',e=>{clearTimeout(timer);reject(e);});
  owned.once('exit',()=>{clearTimeout(timer);reject(new Error('Owned child exited before reporting its boundary'));});
 });
 return {owned,exited,message};
}
for(const phase of ['before','after'])test('real process kill '+phase+' COMMIT and fresh-process retry prove receipt durability',async()=>{
 const id=fixtureId(),s=service();let first,second;
 try {
  const v=await open(s,id),before=await counts(id),c=command(id,'death-'+phase,v);
  first=child(phase,id,c);const marker=await first.message;assert.equal(marker.phase,phase);
  first.owned.kill('SIGKILL');assert.equal((await first.exited).signal,'SIGKILL');
  const killed=await counts(id);assert.equal(killed.stateVersion,phase==='before'?v:v+1);
  if(phase==='before')assert.deepEqual(killed,before);else{assert.equal(killed.journal,v+1);assert.equal(killed.outbox,v+1);}
  second=child('retry',id,c);const reply=await second.message;assert.equal(reply.receipt.outcome,'accepted');assert.equal(reply.duplicate,phase==='after');
  assert.equal((await second.exited).code,0);
  const retried=await s.submit('p1',c);assert.equal(retried.duplicate,true);assert.deepEqual(retried.receipt,reply.receipt);
  const final=await counts(id);assert.equal(final.stateVersion,v+1);assert.equal(final.journal,v+1);assert.equal(final.outbox,v+1);assert.equal(final.command_receipts,v+1);
 }finally{
  for(const c of [first,second])if(c&&!c.owned.killed&&c.owned.exitCode===null){c.owned.kill('SIGKILL');await c.exited;}
  await s.close();await cleanup(id);
 }
});

test('committed participant projections are read-only, recover exactly and deny role/identity escalation',async()=>{
 const id=fixtureId(),s=service();let recovered;
 try {
  assert.equal(typeof s.view,'function','committed viewer read is missing');
  const version=await open(s,id),before=await counts(id),a=await s.view('p1',{matchId:id}),b=await s.view('p2',{matchId:id});
  assert.equal(a.stateVersion,version);assert.equal(a.viewer.playerId,'p1');assert.equal(b.viewer.playerId,'p2');
  const own=a.players.find(p=>p.playerId==='p1').zones.find(z=>z.kind==='hand');assert.equal(own.cards.length,7);
  assert.deepEqual(a.players.find(p=>p.playerId==='p2').zones.find(z=>z.kind==='hand').cards,[]);
  for(const request of [{matchId:id,viewer:{kind:'judge'}},{matchId:id,playerId:'p2'},{matchId:id,allowPrivate:true}])await assert.rejects(s.view('p1',request),e=>e.code==='INVALID_REQUEST');
  await assert.rejects(s.view('outsider',{matchId:id}),e=>e.code==='FORBIDDEN');
  await assert.rejects(s.view('p1',{matchId:'missing-'+id}),e=>e.code==='FORBIDDEN');
  assert.deepEqual(await counts(id),before,'views changed durable storage');
  await s.close();recovered=service();assert.deepEqual(await recovered.view('p1',{matchId:id}),a);
  const raw=JSON.stringify(a),archive=await using('match',async c=>JSON.parse((await c.query('SELECT checkpoint FROM match.matches WHERE match_id=$1',[id])).rows[0].checkpoint));
  assert.equal(raw.includes(archive.transcript.seed),false);assert.equal(raw.includes('randomOutcomes'),false);
  await recovered.submit('p1',command(id,'visible-concede',version));assert.equal((await recovered.view('p1',{matchId:id})).ended,true);
 }finally{await s.close();await recovered?.close();await cleanup(id);}
});

test('PLAY-03 current-reference submissions keep their original durable identity across retries and host recreation',async()=>{
 const id=fixtureId(),s=service();let other;
 try {
  assert.equal(typeof s.submitRefs,'function','reference-only durable submission is missing');
  const v=await open(s,id),view=await s.view('p1',{matchId:id});
  const ref=view.players.find(p=>p.playerId==='p1').zones.find(z=>z.kind==='hand').cards[0].ref;
  const request=command(id,'reference-durable',v,'putCardIntoInkwell',{cardId:ref});
  const first=await s.submitRefs('p1',request);assert.equal(first.receipt.outcome,'accepted');
  assert.deepEqual((await s.submitRefs('p1',request)).receipt,first.receipt);
  await s.close();other=service();const duplicate=await other.submitRefs('p1',request);
  assert.equal(duplicate.duplicate,true);assert.deepEqual(duplicate.receipt,first.receipt);
  const stale=await other.submitRefs('p1',{...request,commandId:'stale-reference',expectedVersion:v+1});assert.equal(stale.receipt.outcome,'rejected');
  await assert.rejects(other.submitRefs('p1',{...request,input:{cardId:'raw-private-id'}}),e=>e.code==='ID_CONFLICT');
  await assert.rejects(other.submit('p1',request),e=>e.code==='ID_CONFLICT','raw/reference namespaces must not alias');
  assert.equal((await counts(id)).stateVersion,v+1);
 }finally{await s.close();await other?.close();await cleanup(id);}
});

test('PLAY-03 48 committed reads coalesce by exact private bytes and actor, without sharing mutable views or hiding corruption',async()=>{
 const id=fixtureId(),executor=createEngineExecutor();let projections=0;
 const s=service(createMatchRepository('test'),{executor:{execute:j=>executor.execute(j),project:async j=>{projections++;return executor.project(j)},close:()=>executor.close()}});
 try {
  await open(s,id);
  const views=await Promise.all(Array.from({length:48},()=>s.view('p1',{matchId:id})));
  assert.equal(projections,1,'same committed identity must coalesce');
  views[0].players[0].lore=999;assert.notEqual(views[1].players[0].lore,999);
  await s.view('p2',{matchId:id});assert.equal(projections,2,'another actor needs an independent projection');
  const checkpoint=await using('match',async c=>(await c.query('SELECT checkpoint FROM match.matches WHERE match_id=$1',[id])).rows[0].checkpoint);
  await using('match',c=>c.query('UPDATE match.matches SET checkpoint=$2 WHERE match_id=$1',[id,checkpoint+' ']));
  await assert.rejects(s.view('p1',{matchId:id}),e=>e.code==='UNAVAILABLE','changed bytes must not hit a valid cached view');
  await using('match',c=>c.query('UPDATE match.matches SET checkpoint=$2 WHERE match_id=$1',[id,checkpoint]));
  const recovered=await s.view('p1',{matchId:id});assert.equal(recovered.stateVersion,3);
  await assert.rejects(s.view('outsider',{matchId:id}),e=>e.code==='FORBIDDEN');
 }finally{await s.close();await cleanup(id);}
});
