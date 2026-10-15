import test from 'node:test';
import assert from 'node:assert/strict';
import * as c from '../src/index.ts';
const view={schemaVersion:1,scope:'synthetic',matchId:'m',stateVersion:3,viewer:{kind:'participant',playerId:'p1'},ended:false,winner:null,turn:1,turnOwnerId:'p1',priorityId:'p1',players:['p1','p2'].map(playerId=>({playerId,lore:0,inkDrops:0,zones:['hand','deck','play','discard','inkwell'].map(kind=>({kind,count:0,cards:[]}))})),resources:[],commands:[],logs:[],animations:[]};
const clock={schemaVersion:1,policyId:'qualification',stateVersion:3,clockRevision:7,status:'running',serverNowMs:1000,deadlineMs:6000,activePlayerId:'p1',players:[{playerId:'p1',remainingMs:5000},{playerId:'p2',remainingMs:9000}],pauseReason:null};
const frame={protocolVersion:3,matchId:'m',sequence:1,stateVersion:3,correlationId:'r',releaseId:'release',type:'snapshot',projectionType:'viewer',payload:view,clock};
test('live3 is a separate closed clocked codec while diagnostic1 and live2 remain exact',()=>{
 assert.equal(typeof c.encodeLive3ServerFrame,'function');assert.deepEqual(c.decodeLive3ServerFrame(c.encodeLive3ServerFrame(frame)),frame);
 assert.throws(()=>c.encodeLiveServerFrame(frame));assert.throws(()=>c.encodeLive3ServerFrame({...frame,protocolVersion:2}));
 for(const bad of [{...frame,clock:undefined},{...frame,clock:{...clock,stateVersion:2}},{...frame,clock:{...clock,players:[...clock.players.slice(0,1),{playerId:'outsider',remainingMs:0}]}},{...frame,clock:{...clock,seed:'private'}}])assert.throws(()=>c.encodeLive3ServerFrame(bad));
 assert.throws(()=>c.encodeLive3ServerFrame({...frame,payload:{...view,ended:true,winner:'p1'}}),'a running clock contradicts a completed viewer');
 const receipt={protocolVersion:3,matchId:'m',sequence:2,stateVersion:3,correlationId:'r',releaseId:'release',type:'receipt',commandId:'c',duplicate:false,outcome:'rejected',reason:'clock_expired'};
 assert.equal(c.decodeLive3ServerFrame(c.encodeLive3ServerFrame(receipt)).reason,'clock_expired');assert.throws(()=>c.encodeLiveServerFrame({...receipt,protocolVersion:2}));
});
test('three-version release ranges stay bounded and tickets pin the saved match version',()=>{
 assert.deepEqual(c.parseProtocolRange({min:1,max:3}),{min:1,max:3});assert.throws(()=>c.parseProtocolRange({min:1,max:4}));
 const request={requestId:'r',matchId:'m',clientReleaseId:'client',supportedProtocol:{min:2,max:3}},ticket={type:'ticket',protocolVersion:3,requestId:'r',matchId:'m',playerId:'p1',releaseId:'release',ticket:'t'.repeat(43),expiresAt:100,sessionExpiresAt:200};
 assert.equal(c.parseTransportTicketResponse(ticket,request).protocolVersion,3);assert.throws(()=>c.parseTicketResponse(ticket,request));
 assert.throws(()=>c.parseTransportTicketResponse(ticket,{...request,supportedProtocol:{min:2,max:2}}));
 const command={type:'command',protocolVersion:3,matchId:'m',commandId:'c',correlationId:'r',expectedStateVersion:3,intent:{kind:'passTurn',input:{}}};
 assert.deepEqual(c.decodeLive3ClientFrame(JSON.stringify(command)),command);assert.throws(()=>c.decodeLiveClientFrame(JSON.stringify(command)));
 assert.throws(()=>c.decodeLive3ClientFrame(JSON.stringify({...command,intent:{kind:'manualSetLore',input:{amount:20}}})));
});
