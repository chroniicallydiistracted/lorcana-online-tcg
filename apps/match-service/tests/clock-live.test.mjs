import test from 'node:test';
import assert from 'node:assert/strict';
import Ws from 'ws';
import {once} from 'node:events';
import {createTransportStore,createClockRepository} from '../../../packages/db/dist/index.js';
import {validateSubmission} from '../dist/validation.js';
import {qualification,opening,synchronize,until} from './client-fixtures.mjs';
import {using} from './fixtures.mjs';
import {clockPolicy} from './clock-fixtures.mjs';
export const liveClockPolicy={...clockPolicy,initialReserveMs:15000,reserveCapMs:15000,resetTimeOnSkipMs:15000};
test('stock live clients concede at each opening decision in timed and untimed games without reconnecting',async()=>{
 for(const timed of [false,true])for(let phase=0;phase<3;phase++)for(const deciding of [false,true]){
  const f=await qualification('http://localhost:5173',timed?{clock:{...liveClockPolicy,initialReserveMs:60000,reserveCapMs:60000,resetTimeOnSkipMs:60000}}:{});
  try{
   const host=await f.host(),clients=f.players.map((_,i)=>f.client(i,host.url));await Promise.all(clients.map(c=>c.connect()));
   for(let n=0;n<phase;n++){const active=f.players.indexOf(clients[0].view.priorityId);const r=await clients[active].submit(n===0?{kind:'chooseWhoGoesFirst',input:{playerId:f.players[0]}}:{kind:'alterHand',input:{cardsToMulligan:[]}});assert.equal(r.outcome,'accepted');await synchronize(clients,n+1);}
   const active=f.players.indexOf(clients[0].view.priorityId),loser=deciding?active:1-active;
   const r=await clients[loser].submit({kind:'concede',input:{}});assert.equal(r.outcome,'accepted');await synchronize(clients,phase+1);
   for(let i=0;i<2;i++){assert.equal(clients[i].view.endReason,'concession');assert.equal(clients[i].view.winner,f.players[1-loser]);assert.equal(f.sockets[i].length,1);assert.equal(f.receipts[i].some(x=>x.outcome==='rate_limited'||x.outcome==='maintenance'),false);}
  }finally{await f.close();}
 }
});
test('live4 busy contention retries the same concession on the same socket without maintenance or duplicate effects',async()=>{
 const f=await qualification('http://localhost:5173',{clock:liveClockPolicy}),repository=createClockRepository('test');let owner,pending;
 try{
  const host=await f.host(),clients=f.players.map((_,i)=>f.client(i,host.url));await Promise.all(clients.map(c=>c.connect()));await opening(f,clients);
  const move=validateSubmission(f.players[0],{matchId:f.id,commandId:'held-live-action',expectedVersion:3,move:'passTurn',input:{}});
  const reserved=await repository.reservePlayer(move);assert.equal(reserved.kind,'reserved');owner=reserved.reservation;
  const start=f.receipts[1].length,sockets=f.sockets[1].length,ws=f.sockets[1][0],frames=[];ws.on('message',raw=>frames.push(JSON.parse(String(raw))));
  pending=clients[1].submit({kind:'concede',input:{}}).then(receipt=>({receipt}),error=>({error}));
  await until(()=>f.receipts[1].length>start);const busy=f.receipts[1][start];
  assert.equal(busy.outcome,'rate_limited');assert.ok(busy.retryAfterMs>0);assert.equal(ws.readyState,Ws.OPEN);assert.equal(f.sockets[1].length,sockets);assert.ok(clients[1].view);
  assert.equal(await using('match',async c=>(await c.query('SELECT count(*)::int AS n FROM match.command_receipts WHERE match_id=$1 AND command_id=$2',[f.id,busy.commandId])).rows[0].n),0);
  await repository.abort(owner);owner=undefined;const {receipt,error}=await pending;assert.equal(error,undefined);assert.equal(receipt.outcome,'accepted');assert.equal(receipt.commandId,busy.commandId);
  await synchronize(clients,4);assert.equal(clients[0].view.winner,f.players[0]);assert.equal(f.sockets[1].length,sockets);assert.equal(ws.readyState,Ws.OPEN);assert.equal(frames.some(r=>r.outcome==='maintenance'),false);
  const total=await using('match',async c=>{const counts=[];for(const table of ['command_receipts','journal','outbox'])counts.push((await c.query('SELECT count(*)::int AS n FROM match.'+table+' WHERE match_id=$1 AND state_version=4',[f.id])).rows[0].n);return counts;});assert.deepEqual(total,[1,1,1]);
 }finally{if(owner)await repository.abort(owner);await f.close();await pending;await repository.close();}
});
test('live4 publishes clock-only pause, disconnect continues time and another host reconnects to the committed pass',async()=>{
 const origin='http://localhost:5173',f=await qualification(origin,{clock:liveClockPolicy}),frames=[];
 try{
  const hosts=[await f.host(),await f.host(false)],clients=hosts.map((host,i)=>f.client(i,host.url));await Promise.all(clients.map(c=>c.connect()));
  for(const group of f.sockets)for(const ws of group)ws.on('message',raw=>frames.push(String(raw)));
  await opening(f,clients);assert.equal(clients[0].clock.status,'running');
  const view=clients[1].view,c=await f.creator.readClock(f.players[0],{matchId:f.id});
  await f.creator.pauseClock({matchId:f.id,expectedStateVersion:3,expectedClockRevision:c.clockRevision,operationId:'pause-live',auditId:'qualification-auditor'});
  await until(()=>clients.every(x=>x.clock?.status==='paused'));assert.deepEqual(clients[1].view,view);
  const frozen=clients[1].estimate(f.players[0]);await new Promise(r=>setTimeout(r,150));assert.equal(clients[1].estimate(f.players[0]),frozen);
  const paused=await f.creator.readClock(f.players[0],{matchId:f.id});
  await f.creator.resumeClock({matchId:f.id,expectedStateVersion:3,expectedClockRevision:paused.clockRevision,operationId:'resume-live',auditId:'qualification-auditor',reset:{playerId:f.players[0],remainingMs:1200}});
  await until(()=>clients.every(x=>x.clock?.status==='running'));clients[0].suspend();assert.equal(clients[0].clock,null);assert.equal(clients[0].estimate(f.players[0]),null);
  await until(()=>clients[1].view?.stateVersion===4);assert.equal(clients[1].view.ended,false);assert.equal(clients[1].clock.activePlayerId,f.players[1]);
  const resumed=f.client(0,hosts[1].url);await resumed.connect();await synchronize([resumed,clients[1]],4);assert.equal(resumed.clock.activePlayerId,f.players[1]);
  const native=await using('match',async db=>JSON.parse((await db.query('SELECT checkpoint FROM match.matches WHERE match_id=$1',[f.id])).rows[0].checkpoint));
  const raw=frames.join('\n');for(const secret of [native.transcript.seed,...f.sessions.map(x=>x.session.sessionId),'randomOutcomes','checkpoint','reservation'])assert.equal(raw.includes(secret),false);
  const copy=resumed.clock;copy.players[0].remainingMs=999999;assert.notEqual(resumed.clock.players[0].remainingMs,999999);
 }finally{await f.close();}
});
test('timed tickets cannot downgrade to live2 or exchange an authentication frame across versions',async()=>{
 const origin='http://localhost:5173',f=await qualification(origin,{clock:liveClockPolicy}),store=createTransportStore('test');let ws;
 try{
  const host=await f.host(),body={requestId:'clock-ticket',matchId:f.id,clientReleaseId:'old-client',supportedProtocol:{min:2,max:2}};
  const send=value=>fetch(host.url+'/play/ticket',{method:'POST',headers:{Origin:origin,Cookie:f.sessions[0].cookie,'Content-Type':'application/json'},body:JSON.stringify(value)});
  assert.equal((await send(body)).status,409);const response=await send({...body,supportedProtocol:{min:3,max:4}});assert.equal(response.status,200);const grant=await response.json();assert.equal(grant.protocolVersion,4);
  ws=new Ws(host.url.replace('http:','ws:')+'/play',{origin});await once(ws,'open');const closed=once(ws,'close');ws.send(JSON.stringify({type:'authenticate',protocolVersion:2,requestId:'mismatch',ticket:grant.ticket}));assert.equal((await closed)[0],1008);
  await assert.rejects(store.issue({actorId:f.players[0],sessionId:f.sessions[0].session.sessionId,sessionExpiresAt:f.sessions[0].session.expiresAt,matchId:f.id,releaseId:grant.releaseId,protocolVersion:2,origin}));
  assert.equal(await store.consume(grant.ticket,origin),null);
 }finally{ws?.terminate();await store.close();await f.close();}
});
