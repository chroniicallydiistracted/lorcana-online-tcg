import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {createQualificationMatch,verifyCompletedReplay} from '../dist/index.js';
import {createSyntheticKernel} from '../../../vendor/tcg-engines/dist/kernel.js';

function command(match, actor, move, input={},timestamp=100){return {actor,move,input,timestamp,expectedRevision:match.status().revision,commandId:actor+move+match.status().revision};}
function open(match){
  const chooser=match.status().choosingFirstPlayer;
  assert.ok(['p1','p2'].includes(chooser));
  assert.equal(match.submit(command(match,chooser,'chooseWhoGoesFirst',{playerId:'p1'})).accepted,true);
  for(const actor of ['p1','p2'])assert.equal(match.submit(command(match,actor,'alterHand',{cardsToMulligan:[]})).accepted,true);
}
test('real secure server match ignores ambient RNG/clocks, keeps live seed private and verifies completed reconstruction',()=>{
  const oldRandom=Math.random,oldNow=Date.now;
  Math.random=()=>{throw new Error('ambient random');};Date.now=()=>{throw new Error('ambient clock');};
  let match;
  try{
    match=createQualificationMatch({players:['p1','p2'],startTimestamp:100});
    assert.equal(match.status().rewardEligible,false);
    assert.equal('seed' in match.status(),false);assert.equal('random' in match,false);
    assert.throws(()=>match.exportReplay(),/completed/);
    open(match);
    assert.equal(match.submit(command(match,'p1','concede')).accepted,true);
    const record=match.exportReplay();
    const proof=verifyCompletedReplay(record.archive,record.digest);
    assert.equal(proof.verified,true);assert.equal(proof.commands,4);
    assert.throws(()=>verifyCompletedReplay(record.archive,'0'.repeat(64)),/Replay/);
    const tamper=JSON.parse(record.archive);tamper.commands[0].command.timestamp++;
    assert.throws(()=>verifyCompletedReplay(JSON.stringify(tamper),record.digest),/Replay/);
    assert.throws(()=>createQualificationMatch({players:['p1','p2'],startTimestamp:100,seed:'caller-controlled'}),/Invalid/);
    match.dispose();assert.throws(()=>match.exportReplay(),/disposed/);
  }finally{match?.dispose();Math.random=oldRandom;Date.now=oldNow;}
});

test('completed private archive is immutable across late rejected submissions',()=>{
  const match=createQualificationMatch({players:['p1','p2'],startTimestamp:0});
  try{
    open(match);assert.equal(match.submit(command(match,'p1','concede')).accepted,true);
    const before=match.exportReplay().digest;
    assert.equal(match.submit(command(match,'p1','concede')).code,'MATCH_ENDED');
    assert.equal(match.exportReplay().digest,before);
  }finally{match.dispose();}
});

test('reconstruction rejects semantic tampering even when the caller recomputes an outer archive hash',()=>{
  const match=createQualificationMatch({players:['p1','p2'],startTimestamp:100});
  try{
    open(match);match.submit(command(match,'p1','concede'));
    const original=match.exportReplay();
    const edits=[r=>{r.seed='0'.repeat(64);},r=>{r.engineIdentity='0'.repeat(64);},r=>{r.initial.stateHash='0'.repeat(64);},r=>{r.initial.randomOutcomes[0].value='wrong';},r=>{r.commands[0].result.accepted=false;},r=>{r.commands[0].stateHash='0'.repeat(64);},r=>{r.commands.reverse();},r=>{r.commands.pop();},r=>{r.final.status.winner='p1';},r=>{r.extra=true;}];
    for(const edit of edits){
      const r=JSON.parse(original.archive);edit(r);const archive=JSON.stringify(r);
      const digest=createHash('sha256').update('completed-private-replay-v1\0').update(archive).digest('hex');
      assert.throws(()=>verifyCompletedReplay(archive,digest),/Replay/);
    }
    for(const value of [null,{},'not json','x'.repeat(2*1024*1024+1)])assert.throws(()=>verifyCompletedReplay(value,'0'.repeat(64)),/Replay/);
  }finally{match.dispose();}
});

test('private journal capacity rolls back a speculative accepted transition rather than losing its replay',()=>{
  const match=createQualificationMatch({players:['p1','p2'],startTimestamp:0});
  function fill(input){
    for(let i=0;i<2048;i++){
      try{match.submit(command(match,'p1','unknown',input));}
      catch(error){assert.match(error.message,/journal limit/);return;}
    }
    assert.fail('Expected bounded journal capacity');
  }
  try{
    fill({texts:Array(3).fill('x'.repeat(4000))});
    fill({text:'x'.repeat(1800)});
    const before=match.status();
    assert.throws(()=>match.submit(command(match,before.choosingFirstPlayer,'chooseWhoGoesFirst',{playerId:'p1'})),/journal limit/);
    assert.deepEqual(match.status(),before);
    assert.throws(()=>match.exportReplay(),/completed/);
  }finally{match.dispose();}
});

test('concurrent independent matches and rejected attempts preserve their own committed random streams',()=>{
  const matches=Array.from({length:3},()=>createQualificationMatch({players:['p1','p2'],startTimestamp:0}));
  try{
    assert.equal(new Set(matches.map(m=>m.status().seedCommitment)).size,3);
    for(const m of matches){
      const revision=m.status().revision;
      assert.equal(m.submit(command(m,'p1','unknown')).accepted,false);
      assert.equal(m.status().revision,revision);open(m);
      assert.equal(m.submit(command(m,'p1','concede')).accepted,true);
    }
    for(const m of matches){const r=m.exportReplay();assert.equal(verifyCompletedReplay(r.archive,r.digest).verified,true);}
  }finally{for(const m of matches)m.dispose();}
});
test('an injected failure after shuffle draws rolls back state and reuses the same stream on retry',()=>{
  let fail=false;let outcomes=[];
  const source={random:index=>index%10/10,identifier:(_domain,index)=> index.toString(16).padStart(64,'0'),integer:(index,bound)=>{
    const value=index%bound;outcomes.push({index,bound,value});
    if(fail&&outcomes.length===3)throw new Error('injected shuffle failure');return value;
  }};
  const kernel=createSyntheticKernel({randomSource:source,players:['p1','p2'],startTimestamp:0});
  fail=true;
  try{
    const before=JSON.stringify(kernel.snapshot());const actor=kernel.status().choosingFirstPlayer;
    const submit=()=>kernel.submit(actor,0,0,'retry-fixture','chooseWhoGoesFirst',{playerId:'p1'});
    outcomes=[];assert.equal(submit().accepted,false);const first=outcomes;
    assert.equal(first.length,3);assert.equal(JSON.stringify(kernel.snapshot()),before);
    outcomes=[];assert.equal(submit().accepted,false);assert.deepEqual(outcomes,first);
    assert.equal(JSON.stringify(kernel.snapshot()),before);
    fail=false;outcomes=[];assert.equal(submit().accepted,true);assert.deepEqual(outcomes.slice(0,3),first);
  }finally{outcomes=[];}
});
