import test from 'node:test';
import assert from 'node:assert/strict';
import Ws from 'ws';
import {once} from 'node:events';
import {createTransportStore} from '../../../packages/db/dist/index.js';
import {qualification,opening,synchronize,until} from './client-fixtures.mjs';
import {using} from './fixtures.mjs';
import {clockPolicy} from './clock-fixtures.mjs';
export const liveClockPolicy={...clockPolicy,initialReserveMs:15000,reserveCapMs:15000,resetTimeOnSkipMs:15000};
test('live3 publishes clock-only pause, disconnect continues time and another host reconnects to the committed pass',async()=>{
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
  assert.equal((await send(body)).status,409);const response=await send({...body,supportedProtocol:{min:2,max:3}});assert.equal(response.status,200);const grant=await response.json();assert.equal(grant.protocolVersion,3);
  ws=new Ws(host.url.replace('http:','ws:')+'/play',{origin});await once(ws,'open');const closed=once(ws,'close');ws.send(JSON.stringify({type:'authenticate',protocolVersion:2,requestId:'mismatch',ticket:grant.ticket}));assert.equal((await closed)[0],1008);
  await assert.rejects(store.issue({actorId:f.players[0],sessionId:f.sessions[0].session.sessionId,sessionExpiresAt:f.sessions[0].session.expiresAt,matchId:f.id,releaseId:grant.releaseId,protocolVersion:2,origin}));
  assert.equal(await store.consume(grant.ticket,origin),null);
 }finally{ws?.terminate();await store.close();await f.close();}
});
