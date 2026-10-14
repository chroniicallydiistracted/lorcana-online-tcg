import test from 'node:test';
import assert from 'node:assert/strict';
import {createPrivateMatch,restorePrivateMatch} from '../dist/index.js';
import {encodeViewerProjection} from '../../contracts/dist/index.js';
const setup={matchId:'viewer-recovery',players:['p1','p2'],startTimestamp:100};
const command=(m,actor,move,input={})=>({actor,move,input,commandId:'v-'+actor+move+m.status().revision,expectedRevision:m.status().revision,timestamp:100});
function open(m){for(const [actor,move,input]of[[m.status().choosingFirstPlayer,'chooseWhoGoesFirst',{playerId:'p1'}],['p1','alterHand',{cardsToMulligan:[]}],['p2','alterHand',{cardsToMulligan:[]}]])assert.equal(m.submit(command(m,actor,move,input)).accepted,true);}
const hand=v=>v.players.find(p=>p.playerId==='p1').zones.find(z=>z.kind==='hand');

test('actual private engine projects and resolves only current references without changing its journal or random stream',()=>{
 const m=createPrivateMatch(setup);let restored;
 try {
  assert.equal(typeof m.project,'function','private match projection is missing');open(m);
  const saved=m.checkpoint(),v=m.project({kind:'participant',playerId:'p1'});
  const refs=hand(v).cards.map(c=>c.ref);assert.equal(refs.length,7);assert.equal(hand(v).count,7);
  for(const p of ['p1','p2'])for(let i=0;i<3;i++)m.project({kind:'participant',playerId:p});m.project({kind:'public'});
  assert.deepEqual(m.checkpoint(),saved,'view consumed randomness or changed state');
  restored=restorePrivateMatch(saved,setup.matchId);assert.deepEqual(restored.project({kind:'participant',playerId:'p1'}),v);
  const privateIds=Object.keys(JSON.parse(saved.archive).transcript.initial);assert.equal(encodeViewerProjection(v).includes('randomOutcomes'),false);assert(privateIds.length);
  const input=m.resolveIntent('p1','putCardIntoInkwell',{cardId:refs[0]});assert.equal(typeof input.cardId,'string');assert.notEqual(input.cardId,refs[0]);
  assert.throws(()=>m.resolveIntent('p2','putCardIntoInkwell',{cardId:refs[0]}),/Reference/);
  assert.throws(()=>m.resolveIntent('p1','putCardIntoInkwell',{cardId:input.cardId}),/Reference/);
  assert.equal(m.submit(command(m,'p1','putCardIntoInkwell',input)).accepted,true);
  assert.throws(()=>m.resolveIntent('p1','putCardIntoInkwell',{cardId:refs[0]}),/Reference/);
  const ink=m.project({kind:'participant',playerId:'p1'}).players[0].zones.find(z=>z.kind==='inkwell');assert.equal(ink.count,1);assert.equal('definitionId'in ink.cards[0],false);
  const revealed=m.project({kind:'public'}).logs.filter(x=>x.kind==='reveal');assert.deepEqual(revealed.at(-1).definitionIds,['synthetic-0'],'actual engine normal-inking verification is missing');
 }finally{m.dispose();restored?.dispose();}
});

test('actual engine exports no opponent instances/seed and no privilege in viewer input',()=>{
 const m=createPrivateMatch(setup);
 try{
  assert.equal(typeof m.project,'function');open(m);const saved=m.checkpoint(),archive=JSON.parse(saved.archive),raw=encodeViewerProjection(m.project({kind:'participant',playerId:'p1'}));
  assert.equal(raw.includes(archive.transcript.seed),false);for(const outcome of archive.transcript.initial.randomOutcomes)if(outcome.domain==='instance')assert.equal(raw.includes(String(outcome.value)),false);
  for(const role of [{kind:'judge'},{kind:'participant',playerId:'p3'},{kind:'participant',playerId:'p1',allowPrivate:true}])assert.throws(()=>m.project(role),/Viewer/);
  assert.throws(()=>m.resolveIntent('p1','manualSetLore',{amount:20}),/Reference/);
  assert.throws(()=>m.resolveIntent('p1','concede',{seed:'guess'}),/Reference/);
 }finally{m.dispose();}
});

test('untrusted viewer accessors cannot execute before closed input validation',()=>{
 const m=createPrivateMatch(setup);let calls=0;
 try{assert.throws(()=>m.project({get kind(){calls++;return 'participant';},playerId:'p1'}),/Viewer/);assert.equal(calls,0);}
 finally{m.dispose();}
});

test('projection qualification does not admit ordinary hidden-state, rewards or official cards',async()=>{
 const {ENGINE_QUALIFICATION,assessEngineAdmission}=await import('../dist/index.js');
 assert.equal(ENGINE_QUALIFICATION.viewerProjection,'synthetic_server_v1');
 const result=assessEngineAdmission({asOf:'2026-10-23',mode:'qualification',rulesVersion:'synthetic-fixture',sets:['TST'],rewards:false,hiddenState:true});
 assert.equal(result.allowed,false);assert(result.reasons.includes('HIDDEN_PLAY_RECIPIENT_UNQUALIFIED'));
});
