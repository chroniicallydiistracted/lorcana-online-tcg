import assert from 'node:assert/strict';
import {randomUUID,createHash} from 'node:crypto';
import * as database from '../../../packages/db/dist/index.js';
import {createPrivateMatch,PERSISTENT_ENGINE_IDENTITY} from '../../../packages/engine-adapter/dist/index.js';
import {validateSubmission} from '../dist/validation.js';
import {releases,using,cleanup} from './fixtures.mjs';

export const clockPolicy={schemaVersion:2,id:'qualification-dynamic-v1',profile:'qualification',mode:'dynamic',initialReserveMs:1000,reserveCapMs:1000,perActionBonusMs:0,perTurnPassBonusMs:0,resetTimeOnSkipMs:1000,graceMs:0,timeoutLimit:3};
/** Actual PostgreSQL storage, injected simulated time. No handler/artifact admission implied. */
export async function clockFixture(options={}){
 assert.equal(typeof database.createClockRepository,'function','durable thinking-time repository is missing');
 let utc=10000;const id='clock-storage-'+randomUUID(),players=options.players??['p1','p2'],m=createPrivateMatch({matchId:id,players,startTimestamp:100,clock:clockPolicy});
 const root=undefined,sampling={sampleForTest:async()=>utc},a=database.createClockRepository('test',root,sampling),b=database.createClockRepository('test',root,sampling);
 // Distinct contract-test manifest identity; not a promoted built release.
 const manifest=JSON.parse(JSON.stringify(releases().active));manifest.protocol={min:2,max:4};manifest.releaseId='clock-storage-'+createHash('sha256').update(JSON.stringify(manifest)).digest('hex');
 const current=m.clock(),remainingMs=Object.fromEntries(current.players.map(p=>[p.playerId,p.remainingMs]));
 const checkpoint=m.checkpoint();
 await a.create({matchId:id,players,releaseId:manifest.releaseId,releaseManifest:manifest,engineIdentity:PERSISTENT_ENGINE_IDENTITY,rulesVersion:'synthetic-fixture',catalogRevision:'synthetic-rule-03',formatRevision:'synthetic-two-player-v1',protocolVersion:4,stateVersion:0,lastTimestamp:100,checkpoint,ended:false,winner:null,
  clock:{policy:clockPolicy,revision:0,stateVersion:0,engineTimestamp:100,anchorUtcMs:utc,deadlineUtcMs:utc+1000,status:'running',activePlayerId:current.activePlayerId,remainingMs,lastHealthyUtcMs:utc,pauseReason:null,checkpointDigest:checkpoint.digest}});
 function command(actor,move='passTurn',input={},commandId=randomUUID()){return {...validateSubmission(actor,{matchId:id,commandId,expectedVersion:m.status().revision,move,input}),move,input};}
 function candidate(){return {stateVersion:m.status().revision,lastTimestamp:lastEngineTimestamp,checkpoint:m.checkpoint(),ended:m.status().ended,winner:m.status().winner};}
 let lastEngineTimestamp=100;
 function apply(reservation,actor,move,input={}){lastEngineTimestamp=reservation.engineTimestamp;assert.equal(m.submit({actor,move,input,timestamp:lastEngineTimestamp,expectedRevision:m.status().revision,commandId:'native-'+randomUUID()}).accepted,true);return candidate();}
 async function open(){
  for(const [actor,move,input]of [[m.status().choosingFirstPlayer,'chooseWhoGoesFirst',{playerId:players[0]}],[players[0],'alterHand',{cardsToMulligan:[]}],[players[1],'alterHand',{cardsToMulligan:[]}]]){
   const c=command(actor,move,input),r=await a.reservePlayer(c);assert.equal(r.kind,'reserved');const next=apply(r.reservation,actor,move,input);assert.equal((await a.commitPlayer(r.reservation,c,next,m.clock())).receipt.outcome,'accepted');
  }
 }
 return {id,players,m,a,b,command,apply,candidate,open,now:()=>utc,advance:ms=>{utc+=ms;},setTime:value=>{utc=value;},using,
  async close(){m.dispose();await a.close();await b.close();await cleanup(id);}};
}
