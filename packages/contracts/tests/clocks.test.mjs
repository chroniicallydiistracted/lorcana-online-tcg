import test from 'node:test';
import assert from 'node:assert/strict';
import * as contracts from '../dist/index.js';

const policy={schemaVersion:2,id:'qualification-dynamic-v1',profile:'qualification',mode:'dynamic',initialReserveMs:150000,reserveCapMs:150000,perActionBonusMs:5000,perTurnPassBonusMs:60000,resetTimeOnSkipMs:60000,graceMs:0,timeoutLimit:3};
test('clock policy refuses impossible budgets, unqualified profiles and executable input',()=>{
  assert.equal(typeof contracts.parseClockPolicy,'function','bounded thinking-time policy is missing');
  assert.deepEqual(contracts.parseClockPolicy(policy),policy);
  for(const patch of [{initialReserveMs:0},{initialReserveMs:150001},{reserveCapMs:3600001},{resetTimeOnSkipMs:0},{resetTimeOnSkipMs:150001},{perActionBonusMs:-1},{perActionBonusMs:NaN},{perTurnPassBonusMs:1.5},{graceMs:1},{profile:'ranked'},{mode:'priority'},{seed:'forbidden'},{ink:20}])assert.throws(()=>contracts.parseClockPolicy({...policy,...patch}),/Invalid/);
  let read=false;const accessor={...policy};Object.defineProperty(accessor,'initialReserveMs',{enumerable:true,get(){read=true;return 1000;}});
  assert.throws(()=>contracts.parseClockPolicy(accessor),/Invalid/);assert.equal(read,false);
});
test('public clock projection binds two distinct players, active responsibility and safe paused deadlines',()=>{
  assert.equal(typeof contracts.parseClockProjection,'function','closed clock projection is missing');
  const view={schemaVersion:2,timeoutLimit:3,policyId:policy.id,stateVersion:3,clockRevision:4,status:'running',serverNowMs:1000,deadlineMs:6000,activePlayerId:'p1',players:[{playerId:'p1',remainingMs:5000,timeoutCount:0},{playerId:'p2',remainingMs:9000,timeoutCount:0}],pauseReason:null};
  assert.deepEqual(contracts.parseClockProjection(view),view);
  for(const patch of [{seed:'forbidden'},{ctx:{}},{reservationId:'capability'},{activePlayerId:'outsider'},{players:[view.players[0],view.players[0]]},{players:[view.players[0]]},{deadlineMs:-1},{clockRevision:NaN},{players:[{playerId:'p1',remainingMs:-1},view.players[1]]},{status:'paused'},{pauseReason:'recovery'}])assert.throws(()=>contracts.parseClockProjection({...view,...patch}),/Invalid/);
  assert.deepEqual(contracts.parseClockProjection({...view,status:'paused',deadlineMs:null,pauseReason:'recovery'}).status,'paused');
});
