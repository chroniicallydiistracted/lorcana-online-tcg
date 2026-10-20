import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {createPrivateMatch,restorePrivateMatch} from '../dist/index.js';
import {createLabMatch} from '../../engine-lab/dist/index.js';
import {parseClockPolicy} from '../../contracts/dist/clocks.js';
import {canonical} from '../dist/replay.js';

const players=['p1','p2'];
const policy={schemaVersion:2,id:'qualification-d13-v2',profile:'qualification',mode:'dynamic',initialReserveMs:150000,reserveCapMs:150000,perActionBonusMs:5000,perTurnPassBonusMs:60000,resetTimeOnSkipMs:60000,graceMs:0,timeoutLimit:3};
function command(m,actor,move,input={},timestamp=100){return {actor,move,input,timestamp,expectedRevision:m.status().revision,commandId:move+'-'+m.status().revision+'-'+actor};}
function submit(m,actor,move,input={},timestamp=100){const r=m.submit(command(m,actor,move,input,timestamp));assert.equal(r.accepted,true,move+': '+r.code);return r;}
function toPhase(m,phase){if(phase>0)submit(m,m.status().choosingFirstPlayer??'p1','chooseWhoGoesFirst',{playerId:'p1'});if(phase>1)submit(m,'p1','alterHand',{cardsToMulligan:[]});}
function open(m){toPhase(m,2);submit(m,'p2','alterHand',{cardsToMulligan:[]});}
function timed(limit=3){return createPrivateMatch({matchId:'d13',players,startTimestamp:100,clock:{...policy,timeoutLimit:limit}});}
function atDeadline(m){const c=m.clock();return c.startedAtMs+c.players.find(p=>p.playerId===c.activePlayerId).remainingMs;}
function timeout(m){assert.equal(typeof m.timeout,'function','server-only timeout friend missing');const timestamp=atDeadline(m);const before=m.status().revision;const r=m.timeout({timestamp,expectedRevision:before,commandId:'timeout-'+before});assert.equal(r.accepted,true,r.code);assert.equal(m.status().revision,before+1,'one project transition');return timestamp;}
function count(m,id='p1'){return m.clock().players.find(p=>p.playerId===id).timeoutCount;}
for(const clocked of [false,true])for(const phase of [0,1,2])for(const actor of players)test('P060 '+(clocked?'timed':'untimed')+' concession phase '+phase+' actor '+actor,()=>{
 const m=createPrivateMatch({matchId:'d13-opening',players,startTimestamp:100,...(clocked?{clock:policy}:{})});let restored;
 try{toPhase(m,phase);submit(m,actor,'concede');assert.equal(m.status().winner,players.find(p=>p!==actor));assert.equal(m.status().endReason,'concession');
  for(const playerId of players){const v=m.project({kind:'participant',playerId});assert.equal(v.schemaVersion,2);assert.equal(v.endReason,'concession');assert.equal(v.ended,true);}
  restored=restorePrivateMatch(m.checkpoint(),'d13-opening');assert.deepEqual(restored.status(),m.status());assert.deepEqual(restored.clock(),m.clock());
 }finally{restored?.dispose();m.dispose();}
});
for(const mode of ['qualification','advanced-sandbox'])for(const phase of [0,1,2])for(const actor of players)test('P060 Lab '+mode+' concession phase '+phase+' actor '+actor,()=>{
 const m=createLabMatch({mode,fixture:'synthetic',players,seed:'d13'});try{toPhase(m,phase);submit(m,actor,'concede');assert.equal(m.status().winner,players.find(p=>p!==actor));assert.equal(m.status().rewardEligible,false);}finally{m.dispose();}
});
test('D13 bounded policy2 requires the whole-game timeout limit and refuses policy1',()=>{
 for(const timeoutLimit of [1,3,10])assert.doesNotThrow(()=>parseClockPolicy({...policy,timeoutLimit}));for(const timeoutLimit of [0,11,-1,1.5,'3',null])assert.throws(()=>parseClockPolicy({...policy,timeoutLimit}));const old={...policy,schemaVersion:1};delete old.timeoutLimit;assert.throws(()=>parseClockPolicy(old));
});
for(const phase of [0,1,2])test('D13 first opening timeout loses for the actual deciding player phase '+phase,()=>{
 const m=timed();let restored;try{toPhase(m,phase);const actor=m.clock().activePlayerId;timeout(m);assert.equal(m.status().winner,players.find(p=>p!==actor));assert.equal(m.status().endReason,'timeout');assert.equal(count(m,actor),1);restored=restorePrivateMatch(m.checkpoint(),'d13');assert.deepEqual(restored.status(),m.status());assert.deepEqual(restored.clock(),m.clock());}finally{restored?.dispose();m.dispose();}
});
for(const limit of [1,3])test('D13 main-game whole-game limit '+limit+' counts exact zero and preserves native restore',()=>{
 const m=timed(limit);try{open(m);for(let n=1;n<=limit;n++){
  const at=timeout(m);assert.equal(count(m),n);assert.equal(m.clock().players.find(p=>p.playerId==='p1').remainingMs,125000);
  if(n===limit){assert.equal(m.status().winner,'p2');assert.equal(m.status().endReason,'timeout');break;}
  assert.equal(m.status().ended,false);submit(m,'p2','passTurn',{},at);
  // Successful normal turns between incidents do not reset the whole-game count.
  if(n===1){submit(m,'p1','passTurn',{},at);submit(m,'p2','passTurn',{},at);assert.equal(count(m),1);}
 }
 }finally{m.dispose();}
});
test('D13 an ordinary negative-time pass reaches the same timeout limit atomically',()=>{
 const m=timed(1);try{open(m);submit(m,'p1','passTurn',{},atDeadline(m)+1);assert.equal(count(m),1);assert.equal(m.status().revision,4);assert.equal(m.status().winner,'p2');assert.equal(m.status().endReason,'timeout');const restored=restorePrivateMatch(m.checkpoint(),'d13');try{assert.deepEqual(restored.status(),m.status());}finally{restored.dispose();}}finally{m.dispose();}
});
test('D13 pause reset resume and healthy settlement never increment timeoutCount or accept a chosen winner',()=>{
 const m=timed();try{open(m);for(const reason of ['SERVER_RECOVERY','JUDGE_PAUSE']){
  m.controlClock({kind:'pause',timestamp:100,reason});m.controlClock({kind:'reset',timestamp:100,playerId:'p1',remainingMs:1000});m.controlClock({kind:'resume',timestamp:100});assert.equal(count(m),0);
 }assert.throws(()=>m.timeout({timestamp:100,expectedRevision:m.status().revision,commandId:'early',winner:'p1'}));assert.equal(m.status().ended,false);assert.equal(count(m),0);
 assert.deepEqual(m.submit(command(m,'p1','forfeitGame',{winnerId:'p1',reason:'timeout'})),{accepted:false,code:'MOVE_FORBIDDEN'});
 }finally{m.dispose();}
});
test('D13 private replay refuses altered timeout operations limit reason and count with a refreshed checksum',()=>{
 const m=timed(1);try{open(m);timeout(m);const before=m.checkpoint();for(const edit of [r=>r.transcript.commands.at(-1).timeout.timestamp--,r=>r.transcript.setup.clock.timeoutLimit=2,r=>r.transcript.final.status.endReason='concession',r=>r.transcript.commands.at(-1).stateHash='0'.repeat(64),r=>r.transcript.commands.at(-1).timeout.winner='p1']){
  const row=JSON.parse(before.archive);edit(row);const archive=canonical(row),digest=createHash('sha256').update('private-match-checkpoint-v1\0').update(archive).digest('hex');assert.throws(()=>restorePrivateMatch({archive,digest},'d13'),/Checkpoint/);
 }}finally{m.dispose();}
});

for(const phase of [0,1,2])test('D13 direct expired opening decision loses at its first native incident phase '+phase,()=>{
 const m=timed(3);try{
  toPhase(m,phase);const actor=m.clock().activePlayerId,other=players.find(p=>p!==actor),at=atDeadline(m)+1;
  submit(m,actor,phase===0?'chooseWhoGoesFirst':'alterHand',phase===0?{playerId:other}:{cardsToMulligan:[]},at);
  assert.equal(count(m,actor),1);assert.equal(m.status().ended,true);assert.equal(m.status().endReason,'timeout');assert.equal(m.status().winner,other);
  const restored=restorePrivateMatch(m.checkpoint(),'d13');try{assert.deepEqual(restored.status(),m.status());}finally{restored.dispose();}
 }finally{m.dispose();}
});
test('D13 a native natural terminal on the timeout pass freezes before the timeout-limit loss',()=>{
 const m=timed(1);try{
  open(m);for(let n=0;n<20;n++){const actor=m.clock().activePlayerId,v=m.project({kind:'participant',playerId:actor});if(v.players.find(p=>p.playerId===actor).zones.find(z=>z.kind==='deck').count===0)break;submit(m,actor,'passTurn',{},100);}assert.equal(m.status().ended,false);
  const actor=m.clock().activePlayerId;timeout(m);assert.equal(count(m,actor),1);assert.equal(m.status().ended,true);assert.equal(m.status().endReason,'normal_win');assert.equal(m.status().winner,players.find(p=>p!==actor));
  const restored=restorePrivateMatch(m.checkpoint(),'d13');try{assert.deepEqual(restored.status(),m.status());}finally{restored.dispose();}
 }finally{m.dispose();}
});
