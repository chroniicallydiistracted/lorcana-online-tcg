import test from 'node:test';
import assert from 'node:assert/strict';
import {createEngineExecutor} from '../dist/engine-executor.js';
import {restorePrivateMatch} from '../../../packages/engine-adapter/dist/index.js';

test('reference transition resolves only current viewer refs inside the same actual checkpoint',async()=>{
 const e=createEngineExecutor();let current;
 const id='reference-worker';
 async function submit(actor,move,input,references=false){return e.execute({kind:'transition',matchId:id,checkpoint:current.checkpoint,command:{actor,expectedRevision:current.status.revision,timestamp:100,commandId:move+'-'+current.status.revision,move,input},references});}
 try {
  current=await e.execute({kind:'create',setup:{matchId:id,players:['p1','p2'],startTimestamp:100}});
  for(const [actor,move,input]of[[current.status.choosingFirstPlayer,'chooseWhoGoesFirst',{playerId:'p1'}],['p1','alterHand',{cardsToMulligan:[]}],['p2','alterHand',{cardsToMulligan:[]}]])current=await submit(actor,move,input,true);
  const view=await e.project({kind:'project',matchId:id,checkpoint:current.checkpoint,viewer:{kind:'participant',playerId:'p1'}});
  const ref=view.players[0].zones.find(z=>z.kind==='hand').cards[0].ref;
  const privateMatch=restorePrivateMatch(current.checkpoint,id);let raw;
  try{raw=privateMatch.resolveIntent('p1','putCardIntoInkwell',{cardId:ref}).cardId;}finally{privateMatch.dispose();}
  const refused=await submit('p1','putCardIntoInkwell',{cardId:raw},true);
  assert.equal(refused.result.accepted,false,'raw identity must be refused in reference mode');
  const allowed=await submit('p1','putCardIntoInkwell',{cardId:ref},true);
  assert.equal(allowed.result.accepted,true,'current reference should resolve in its checkpoint');current=allowed;
  const stale=await submit('p1','putCardIntoInkwell',{cardId:ref},true);assert.equal(stale.result.accepted,false);
 }finally{await e.close();}
});
