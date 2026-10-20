import test from 'node:test';
import assert from 'node:assert/strict';
import * as c from '../src/index.ts';
const viewer=(version=2)=>({schemaVersion:version,scope:'synthetic',matchId:'m',stateVersion:3,viewer:{kind:'participant',playerId:'p1'},ended:false,winner:null,...(version===2?{endReason:null}:{}),turn:1,turnOwnerId:'p1',priorityId:'p1',players:['p1','p2'].map(playerId=>({playerId,lore:0,inkDrops:0,zones:['hand','deck','play','discard','inkwell'].map(kind=>({kind,count:0,cards:[]}))})),resources:[],commands:[],logs:[],animations:[]});
const clock=(version=2)=>({schemaVersion:version,policyId:'q',stateVersion:3,clockRevision:1,status:'running',serverNowMs:100,deadlineMs:1100,activePlayerId:'p1',players:['p1','p2'].map(playerId=>({playerId,remainingMs:1000,...(version===2?{timeoutCount:playerId==='p1'?2:0}:{})})),pauseReason:null,...(version===2?{timeoutLimit:3}:{})});
const frame=(version=4)=>({type:'snapshot',protocolVersion:version,matchId:'m',sequence:1,stateVersion:3,correlationId:'r',releaseId:'release',projectionType:'viewer',payload:viewer(version===4?2:1),...(version===2?{}:{clock:clock(version===4?2:1)})});
test('D13 live4 binds viewer2 result and clock2 counts while retaining exact earlier closed revisions',()=>{
 assert.equal(typeof c.decodeLive4ClientFrame,'function','distinct live4 codec missing');
 const v=frame();assert.deepEqual(c.decodeTransportServerFrame(c.encodeTransportServerFrame(v)),v);
 assert.deepEqual(c.decodeLiveServerFrame(c.encodeLiveServerFrame(frame(2))),frame(2));assert.deepEqual(c.decodeLive3ServerFrame(c.encodeLive3ServerFrame(frame(3))),frame(3));
 for(const invalid of [{...v,payload:viewer(1)},{...v,clock:clock(1)},{...v,payload:{...v.payload,endReason:'secret'}},{...v,clock:{...v.clock,timeoutLimit:0}},{...v,clock:{...v.clock,players:[{...v.clock.players[0],timeoutCount:-1},v.clock.players[1]]}}])assert.throws(()=>c.encodeTransportServerFrame(invalid));
 assert.throws(()=>c.encodeLive3ServerFrame({...frame(3),clock:clock(2)}));assert.throws(()=>c.encodeLiveServerFrame({...frame(2),payload:viewer(2)}));
});
test('D13 closed end reasons reject contradictory completion and player forfeit/winner authority',()=>{
 for(const endReason of ['normal_win','concession','timeout'])assert.equal(c.parseViewerProjection({...viewer(),ended:true,winner:'p2',endReason}).endReason,endReason);
 for(const patch of [{endReason:'timeout'},{ended:true},{ended:true,winner:'p2',endReason:null},{ended:true,winner:'outsider',endReason:'timeout'}])assert.throws(()=>c.parseViewerProjection({...viewer(),...patch}));
 const command={type:'command',protocolVersion:4,matchId:'m',commandId:'c',correlationId:'r',expectedStateVersion:3,intent:{kind:'forfeitGame',input:{winnerId:'p1',reason:'timeout'}}};assert.throws(()=>c.decodeTransportClientFrame(JSON.stringify(command)));
});
test('D13 old-only offers cannot accept a4 ticket and pending intent3 preserves its exact4 identity',()=>{
 assert.equal(typeof c.decodeLive4ClientFrame,'function');const command={type:'command',protocolVersion:4,matchId:'m',commandId:'c',correlationId:'r',expectedStateVersion:3,intent:{kind:'concede',input:{}}};
 const pending={schemaVersion:3,actorId:'p1',command};assert.deepEqual(c.parseTransportPending(pending),pending);assert.throws(()=>c.parseTransportPending({...pending,schemaVersion:2}));
 const request={requestId:'r',matchId:'m',clientReleaseId:'client',supportedProtocol:{min:2,max:3}},ticket={type:'ticket',protocolVersion:4,requestId:'r',matchId:'m',playerId:'p1',releaseId:'release',ticket:'a'.repeat(43),expiresAt:100,sessionExpiresAt:200};assert.throws(()=>c.parseTransportTicketResponse(ticket,request));assert.equal(c.parseTransportTicketResponse(ticket,{...request,supportedProtocol:{min:3,max:4}}).protocolVersion,4);
});

test('transport viewer selection bounds and sanitizes malformed input before delegating either revision',async()=>{
 const {decodeTransportViewerProjection}=await import('../dist/index.js');
 for(const raw of ['private-fragment-invalid-json',' '.repeat(262145),'{"schemaVersion":2,"private":"fragment"}',null])assert.throws(()=>decodeTransportViewerProjection(raw),e=>e.message==='Invalid transport viewer projection');
});
