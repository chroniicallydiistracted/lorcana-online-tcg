import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import * as adapter from '../dist/index.js';
import {canonical} from '../dist/replay.js';
const setup={matchId:'durable-fixture',players:['p1','p2'],startTimestamp:100};
const digest=archive=>createHash('sha256').update('private-match-checkpoint-v1\0').update(archive).digest('hex');
function command(m,actor,move,input={}) {return {actor,move,input,commandId:actor+'-'+move+'-'+m.status().revision,expectedRevision:m.status().revision,timestamp:100};}

test('private live checkpoint restores exact current source, controlled outcomes and continuation',()=>{
 assert.equal(typeof adapter.createPrivateMatch,'function');assert.equal(typeof adapter.restorePrivateMatch,'function');
 const first=adapter.createPrivateMatch(setup);let second;
 try {
  assert.equal(first.submit(command(first,first.status().choosingFirstPlayer,'chooseWhoGoesFirst',{playerId:'p1'})).accepted,true);
  const checkpoint=first.checkpoint();assert(Object.isFrozen(checkpoint));
  second=adapter.restorePrivateMatch(checkpoint,setup.matchId);
  assert.deepEqual(second.status(),first.status());assert.ok(second.checkpoint().archive===checkpoint.archive,'private reconstruction differs');
  for(const actor of ['p1','p2']) {
   const c=command(first,actor,'alterHand',{cardsToMulligan:[]});
   assert.equal(first.submit(c).accepted,true);assert.deepEqual(second.submit(c),{accepted:true,code:null});
   assert.ok(second.checkpoint().archive===first.checkpoint().archive,'private continuation differs');
  }
  const c=command(first,'p1','concede');first.submit(c);second.submit(c);
  assert.ok(second.checkpoint().archive===first.checkpoint().archive,'private completion differs');assert.equal(second.status().winner,'p2');
  assert.equal('seed' in first.status(),false);assert.equal('snapshot' in first,false);assert.equal('exportReplay' in first,false);
 }finally{first.dispose();second?.dispose();}
});

test('live restore refuses different match binding, pins and ten private transcript edits',()=>{
 assert.equal(typeof adapter.createPrivateMatch,'function');
 const m=adapter.createPrivateMatch(setup);
 try {
  m.submit(command(m,m.status().choosingFirstPlayer,'chooseWhoGoesFirst',{playerId:'p1'}));
  const original=m.checkpoint();
  assert.throws(()=>adapter.restorePrivateMatch(original,'different-match'),/Checkpoint/);
  assert.throws(()=>adapter.restorePrivateMatch({...original,digest:'0'.repeat(64)},setup.matchId),/Checkpoint/);
  const edits=[r=>r.matchId='other',r=>r.transcript.seed='0'.repeat(64),r=>r.transcript.engineIdentity='0'.repeat(64),r=>r.transcript.initial.stateHash='0'.repeat(64),r=>r.transcript.initial.randomOutcomes[0].value='wrong',r=>r.transcript.commands[0].result.accepted=false,r=>r.transcript.commands[0].stateHash='0'.repeat(64),r=>r.transcript.commands.pop(),r=>r.transcript.final.status.ended=true,r=>r.extra='untrusted'];
  for(const edit of edits) {
   const r=JSON.parse(original.archive);edit(r);const archive=canonical(r);
   assert.throws(()=>adapter.restorePrivateMatch({archive,digest:digest(archive)},setup.matchId),/Checkpoint/);
  }
  for(const value of [null,{}, {archive:'not JSON',digest:'0'.repeat(64)},{archive:'x'.repeat(2*1024*1024+1),digest:'0'.repeat(64)}])assert.throws(()=>adapter.restorePrivateMatch(value,setup.matchId),/Checkpoint/);
  assert.throws(()=>adapter.createPrivateMatch({...setup,seed:'caller-controlled'}),/Invalid/);
  assert.throws(()=>adapter.createPrivateMatch({...setup,players:['p1','p2','p3']}),/Invalid/);
  m.dispose();m.dispose();assert.throws(()=>m.checkpoint(),/disposed/);
 }finally{m.dispose();}
});

test('ordinary qualification facade still has no live persistence or seed disclosure',()=>{
 const m=adapter.createQualificationMatch({players:['p1','p2'],startTimestamp:0});
 try {assert.equal('checkpoint' in m,false);assert.equal('seed' in m.status(),false);assert.throws(()=>m.exportReplay(),/completed/);}
 finally {m.dispose();}
});

test('private checkpoints cannot emit archives beyond the restore tree limit',()=>{
 const m=adapter.createPrivateMatch(setup);
 try {
  for(let i=0;i<200;i++) m.submit({...command(m,m.status().choosingFirstPlayer,'chooseWhoGoesFirst',{pad:Array(1000).fill(null)}),commandId:'bound-'+i});
  assert.throws(()=>m.checkpoint(),/limit/i);
 }finally{m.dispose();}
});
