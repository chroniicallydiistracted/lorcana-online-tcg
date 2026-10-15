import test from 'node:test';
import assert from 'node:assert/strict';
import * as client from '../dist/index.js';
const clock={schemaVersion:1,policyId:'qualification',stateVersion:3,clockRevision:7,status:'running',serverNowMs:1000,deadlineMs:6000,activePlayerId:'p1',players:[{playerId:'p1',remainingMs:5000},{playerId:'p2',remainingMs:9000}],pauseReason:null};
test('browser countdown is a clamped monotonic estimate and cannot submit a move or change a result',()=>{
 assert.equal(typeof client.estimateClock,'function');assert.equal(client.estimateClock(clock,'p1',1500),3500);assert.equal(client.estimateClock(clock,'p2',1500),9000);assert.equal(client.estimateClock(clock,'p1',999999),0);
 for(const status of ['paused','processing','ended'])assert.equal(client.estimateClock({...clock,status,deadlineMs:null,activePlayerId:status==='ended'?null:'p1',pauseReason:status==='paused'?'recovery':null},'p1',1500),5000);
 for(const elapsed of [-1,NaN,Infinity])assert.throws(()=>client.estimateClock(clock,'p1',elapsed));assert.throws(()=>client.estimateClock(clock,'outsider',0));assert.equal(clock.players[0].remainingMs,5000);
});

class Socket extends globalThis.EventTarget {
 readyState=0;bufferedAmount=0;sent=[];
 send(raw){this.sent.push(JSON.parse(raw));}
 close(){this.readyState=3;this.fire('close',{code:1000});}
 fire(kind,values={}){const event=new globalThis.Event(kind);Object.assign(event,values);this.dispatchEvent(event);}
 server(frame){this.fire('message',{data:JSON.stringify(frame)});}
}
const view={schemaVersion:1,scope:'synthetic',matchId:'m',stateVersion:3,viewer:{kind:'participant',playerId:'p1'},ended:false,winner:null,turn:1,turnOwnerId:'p1',priorityId:'p1',players:['p1','p2'].map(playerId=>({playerId,lore:0,inkDrops:0,zones:['hand','deck','play','discard','inkwell'].map(kind=>({kind,count:0,cards:[]}))})),resources:[],commands:[],logs:[],animations:[]};
async function fixture(other={}){
 const sockets=[],requests=[],clockCallbacks=[];let mono=100;
 const c=client.createMatchClient({matchId:'m',endpoint:'http://localhost:3002',clientReleaseId:'clock-client',retryBaseMs:1,maxAttempts:2,monotonicNow:()=>mono,
  fetcher:async(_url,init)=>{const r=JSON.parse(init.body);requests.push(r);return new globalThis.Response(JSON.stringify({type:'ticket',protocolVersion:3,requestId:r.requestId,matchId:'m',playerId:'p1',releaseId:'release',ticket:'t'.repeat(43),expiresAt:Date.now()+30000,sessionExpiresAt:Date.now()+60000}),{status:200});},
  socketFactory:()=>{const s=new Socket();sockets.push(s);setTimeout(()=>{s.readyState=1;s.fire('open');},0);return s;},onClock:clock=>clockCallbacks.push(clock),...other});
 async function socket(index){for(let n=0;n<100;n++){if(sockets[index]?.sent.some(f=>f.type==='authenticate'))return sockets[index];await new Promise(r=>setTimeout(r,1));}throw Error('Synthetic socket deadline');}
 const envelope=(sequence)=>({protocolVersion:3,matchId:'m',sequence,stateVersion:3,correlationId:'sync',releaseId:'release'});
 function ready(s){const auth=s.sent.find(f=>f.type==='authenticate');s.server({...envelope(1),type:'ready',playerId:'p1',correlationId:auth.requestId});s.server({...envelope(2),type:'snapshot',projectionType:'viewer',payload:view,clock});}
 return {c,socket,ready,envelope,requests,clockCallbacks,advance:ms=>{mono+=ms;}};
}
test('live3 clock-only revisions preserve views, defensive callbacks and monotonic estimates, then clear on suspension',async()=>{
 const f=await fixture();try{
  const connected=f.c.connect();connected.catch(()=>{});const s=await f.socket(0);f.ready(s);await connected;assert.equal(s.sent[0].protocolVersion,3);
  assert.equal(f.c.estimate('p1'),5000);f.advance(500);assert.equal(f.c.estimate('p1'),4500);
  f.clockCallbacks.at(-1).players[0].remainingMs=999999;assert.equal(f.c.clock.players[0].remainingMs,5000);
  const before=f.c.view;s.server({...f.envelope(3),type:'snapshot',projectionType:'viewer',payload:view,clock:{...clock,clockRevision:8,status:'paused',deadlineMs:null,pauseReason:'recovery',players:[{playerId:'p1',remainingMs:4000},clock.players[1]]}});
  assert.deepEqual(f.c.view,before);f.advance(1000);assert.equal(f.c.estimate('p1'),4000);
  f.c.suspend();assert.equal(f.c.clock,null);assert.equal(f.c.estimate('p1'),null);assert.equal(f.clockCallbacks.at(-1),null);
 }finally{f.c.close();}
});
test('live3 pending commands retain schema2 and exact bytes across reconnect; old schema1 offers only its original live2 pin',async()=>{
 const f=await fixture();let saved;try{
  const connected=f.c.connect();connected.catch(()=>{});const a=await f.socket(0);f.ready(a);await connected;
  const pending=f.c.submit({kind:'passTurn',input:{}});pending.catch(()=>{});saved=f.c.exportPending();assert.equal(saved.schemaVersion,2);assert.equal(saved.command.protocolVersion,3);
  f.c.suspend();const resumed=f.c.resume();resumed.catch(()=>{});const b=await f.socket(1);f.ready(b);await resumed;assert.deepEqual(b.sent.find(x=>x.type==='command'),saved.command);assert.deepEqual(f.requests.at(-1).supportedProtocol,{min:3,max:3});
 }finally{f.c.close();}
 const restored=await fixture({restorePending:{schemaVersion:1,actorId:'p1',command:{...saved.command,protocolVersion:2}},fetcher:async(_url,init)=>{assert.deepEqual(JSON.parse(init.body).supportedProtocol,{min:2,max:2});return new globalThis.Response(JSON.stringify({code:'unsupported_version'}),{status:409});}});
 try{await assert.rejects(restored.c.connect());assert.equal(restored.c.status,'upgrade_required');assert.equal(restored.c.exportPending().command.protocolVersion,2);}finally{restored.c.close();}
});
