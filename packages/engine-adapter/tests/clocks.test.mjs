import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import * as adapter from '../dist/index.js';

const policy={schemaVersion:2,id:'qualification-dynamic-v1',profile:'qualification',mode:'dynamic',initialReserveMs:150000,reserveCapMs:150000,perActionBonusMs:5000,perTurnPassBonusMs:60000,resetTimeOnSkipMs:60000,graceMs:0,timeoutLimit:3};
const setup={matchId:'clock-adapter',players:['p1','p2'],startTimestamp:100};
function submit(m,actor,move,input={},timestamp=100){return m.submit({actor,move,input,timestamp,expectedRevision:m.status().revision,commandId:move+'-'+m.status().revision+'-'+timestamp});}
function timed(){const m=adapter.createPrivateMatch({...setup,clock:policy});assert.equal(typeof m.clock,'function');return m;}
function open(m){for(const [actor,move,input]of[[m.status().choosingFirstPlayer,'chooseWhoGoesFirst',{playerId:'p1'}],['p1','alterHand',{cardsToMulligan:[]}],['p2','alterHand',{cardsToMulligan:[]}]])assert.equal(submit(m,actor,move,input).accepted,true);}
const player=(m,id)=>m.clock().players.find(p=>p.playerId===id);
function rehashed(value){const archive=JSON.stringify(value);return {archive,digest:createHash('sha256').update('private-match-checkpoint-v1\0').update(archive).digest('hex')};}

test('untimed private matches remain untimed and cannot receive clock controls',()=>{
 const m=adapter.createPrivateMatch(setup);
 try{assert.equal(typeof m.clock,'function','private clock integration is missing');assert.equal(m.clock(),null);assert.throws(()=>m.controlClock({kind:'pause',timestamp:100,reason:'SERVER_RECOVERY'}));}finally{m.dispose();}
});
test('timed setup refuses the native zero-timestamp sentinel while untimed epoch-zero fixtures remain supported',()=>{
 assert.throws(()=>adapter.createPrivateMatch({...setup,startTimestamp:0,clock:policy}));
 const m=adapter.createPrivateMatch({...setup,startTimestamp:0});m.dispose();
});
test('independent private random worlds have identical native clocks under the same thinking-time schedule',()=>{
 const a=timed(),b=timed();try{open(a);open(b);assert.notEqual(a.checkpoint().digest,b.checkpoint().digest);
 for(const m of [a,b]){m.controlClock({kind:'pause',timestamp:1000,reason:'SERVER_RECOVERY'});m.controlClock({kind:'resume',timestamp:2000});}
 assert.deepEqual(a.clock(),b.clock());
 }finally{a.dispose();b.dispose();}
});
test('native dynamic timeout pass restores 125 seconds through actual engine bonuses without changing ink rules',()=>{
 const m=timed();let restored;
 try{
  open(m);assert.equal(player(m,'p1').remainingMs,150000);
  const before=m.project({kind:'participant',playerId:'p1'});
  assert.equal(submit(m,'p1','passTurn',{},150100).accepted,true);
  assert.equal(player(m,'p1').remainingMs,125000,'native reset60s + action5s + pass60s');
  assert.equal(m.clock().activePlayerId,'p2');assert.equal(m.status().ended,false);assert.equal(m.status().rewardEligible,false);
  const after=m.project({kind:'participant',playerId:'p1'});assert.equal(after.turn,before.turn+1);
  assert.deepEqual(after.players.map(p=>p.inkDrops),[0,0]);
  restored=adapter.restorePrivateMatch(m.checkpoint(),setup.matchId);assert.deepEqual(restored.clock(),m.clock());assert.deepEqual(restored.project({kind:'participant',playerId:'p1'}),after);
 }finally{m.dispose();restored?.dispose();}
});
test('clock-only pause/resume preserves game logs, card refs, RNG and exact private reconstruction',()=>{
 const m=timed();let restored;
 try{
  open(m);const before=m.project({kind:'participant',playerId:'p1'}),revision=m.status().revision;
  m.controlClock({kind:'pause',timestamp:10100,reason:'SERVER_RECOVERY'});
  assert.equal(player(m,'p1').remainingMs,140000);assert.equal(m.clock().running,false);
  assert.deepEqual(m.project({kind:'participant',playerId:'p1'}),before);
  m.controlClock({kind:'resume',timestamp:610100});
  assert.equal(player(m,'p1').remainingMs,140000);assert.equal(m.clock().running,true);assert.equal(m.status().revision,revision);
  assert.equal(submit(m,'p1','passTurn',{},611100).accepted,true);
  assert.equal(player(m,'p1').remainingMs,150000,'accepted additions remain capped');
  const view=m.project({kind:'participant',playerId:'p1'});assert.ok(view.logs.length>before.logs.length);assert.deepEqual(view.logs.slice(0,before.logs.length),before.logs);
  restored=adapter.restorePrivateMatch(m.checkpoint(),setup.matchId);assert.deepEqual(restored.clock(),m.clock());assert.deepEqual(restored.project({kind:'participant',playerId:'p1'}),view);
 }finally{m.dispose();restored?.dispose();}
});
test('invalid timed moves neither mutate clocks nor grant time and later settlement charges the complete interval',()=>{
 const m=timed();try{
  open(m);const before=m.clock(),view=m.project({kind:'participant',playerId:'p1'});
  assert.equal(submit(m,'p2','passTurn',{},5100).accepted,false);assert.deepEqual(m.clock(),before);assert.deepEqual(m.project({kind:'participant',playerId:'p1'}),view);
  assert.deepEqual(submit(m,'p1','forfeitGame',{winner:'p1'},5100),{accepted:false,code:'MOVE_FORBIDDEN'});
  m.controlClock({kind:'settle',timestamp:10100});assert.equal(player(m,'p1').remainingMs,140000);
 }finally{m.dispose();}
});
test('audited clock reset requires a paused enrolled player and cannot unfreeze completed games',()=>{
 const m=timed();try{
  open(m);assert.throws(()=>m.controlClock({kind:'reset',timestamp:100,playerId:'p1',remainingMs:1000}));
  m.controlClock({kind:'pause',timestamp:100,reason:'JUDGE_PAUSE'});
  for(const patch of [{playerId:'outsider'},{remainingMs:150001},{remainingMs:-1},{remainingMs:1.5},{winner:'p1'}])assert.throws(()=>m.controlClock({kind:'reset',timestamp:100,playerId:'p1',remainingMs:1000,...patch}));
  m.controlClock({kind:'reset',timestamp:100,playerId:'p1',remainingMs:1000});assert.equal(player(m,'p1').remainingMs,1000);
  m.controlClock({kind:'resume',timestamp:100});assert.equal(submit(m,'p1','concede').accepted,true);
  const frozen=m.checkpoint();assert.throws(()=>m.controlClock({kind:'resume',timestamp:1000}));assert.ok(m.checkpoint().archive===frozen.archive&&m.checkpoint().digest===frozen.digest,'completed private checkpoint changed');
 }finally{m.dispose();}
});
test('timed replay rejects policy/control/time edits even with a recomputed checkpoint checksum',()=>{
 const m=timed();try{
  open(m);m.controlClock({kind:'pause',timestamp:1000,reason:'SERVER_RECOVERY'});
  const original=m.checkpoint();
  for(const edit of [r=>r.transcript.setup.clock.initialReserveMs=100000,r=>r.transcript.commands.pop(),r=>r.transcript.commands.at(-1).control.timestamp=999,r=>r.transcript.commands.at(-1).control.kind='resume']){
   const row=JSON.parse(original.archive);edit(row);assert.throws(()=>adapter.restorePrivateMatch(rehashed(row),setup.matchId),/Checkpoint/);
  }
 }finally{m.dispose();}
});
