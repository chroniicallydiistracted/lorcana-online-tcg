import test from 'node:test';
import assert from 'node:assert/strict';
import * as contracts from '../src/index.ts';
const ref='vr_'+'a'.repeat(64);
const command={type:'command',protocolVersion:2,matchId:'m',commandId:'c',correlationId:'r',expectedStateVersion:3,intent:{kind:'putCardIntoInkwell',input:{cardId:ref}}};
function api(){assert.equal(typeof contracts.decodeLiveClientFrame,'function','live protocol2 closed codecs are missing');return contracts;}
const view=()=>({schemaVersion:1,scope:'synthetic',matchId:'m',stateVersion:3,viewer:{kind:'participant',playerId:'p1'},ended:false,winner:null,turn:1,turnOwnerId:'p1',priorityId:'p1',players:['p1','p2'].map(playerId=>({playerId,lore:0,inkDrops:0,zones:['hand','deck','play','discard','inkwell'].map(kind=>({kind,count:0,cards:[]}))})),resources:[],commands:[],logs:[],animations:[]});
const envelope={protocolVersion:2,matchId:'m',sequence:1,stateVersion:3,correlationId:'r',releaseId:'release'};

test('live protocol2 accepts only current-ref synthetic move shapes and bounded control frames',()=>{
 const c=api();assert.deepEqual(c.decodeLiveClientFrame(JSON.stringify(command)),command);
 assert.deepEqual(c.decodeLiveClientFrame(JSON.stringify({type:'sync',protocolVersion:2,matchId:'m',correlationId:'r'})).type,'sync');
 for(const value of [{...command,actorId:'p2'},{...command,protocolVersion:1},{...command,intent:{kind:'manualSetLore',input:{amount:20}}},{...command,intent:{kind:'resolveEffect',input:{}}},{...command,intent:{kind:'putCardIntoInkwell',input:{cardId:'raw-private-id'}}},{...command,intent:{kind:'playCard',input:{cardId:ref,secret:'anything'}}}])assert.throws(()=>c.decodeLiveClientFrame(JSON.stringify(value)),/Invalid live/);
 assert.throws(()=>c.decodeLiveClientFrame('x'.repeat(16_385)),/Invalid live/);
 assert.throws(()=>c.decodeLiveClientFrame('"'+'🦆'.repeat(5000)+'"'),/Invalid live/);
});

test('live snapshots correlate the exact viewer/match/state and carry no private escape fields',()=>{
 const c=api(),frame={...envelope,type:'snapshot',projectionType:'viewer',payload:view()};
 assert.deepEqual(c.decodeLiveServerFrame(c.encodeLiveServerFrame(frame)),frame);
 for(const invalid of [{...frame,payload:{...view(),stateVersion:2}},{...frame,payload:{...view(),matchId:'other'}},{...frame,payload:{...view(),seed:'private'}},{...frame,checkpoint:'private'}])assert.throws(()=>c.encodeLiveServerFrame(invalid),/Invalid live/);
 let invoked=0;assert.throws(()=>c.encodeLiveServerFrame({...frame,get secret(){invoked++;return 'private'}}));assert.equal(invoked,0);
 for(const outcome of [{outcome:'accepted'},{outcome:'rejected',reason:'invalid_intent'},{outcome:'stale',reason:'stale_state'}])assert.equal(c.decodeLiveServerFrame(c.encodeLiveServerFrame({...envelope,type:'receipt',commandId:'c',duplicate:false,...outcome})).outcome,outcome.outcome);
});

test('ticket contracts carry credentials only in bounded HTTP reply and first-frame authentication',()=>{
 const c=api(),body={requestId:'r',matchId:'m',clientReleaseId:'client',supportedProtocol:{min:1,max:2}};
 assert.deepEqual(c.parseTicketRequest(body),body);
 assert.equal(c.decodeLiveClientFrame(JSON.stringify({type:'authenticate',protocolVersion:2,requestId:'r',ticket:'t'.repeat(43)})).type,'authenticate');
 assert.throws(()=>c.parseTicketRequest({...body,actorId:'p2'}));
 assert.throws(()=>c.parseTicketRequest({...body,supportedProtocol:{min:2,max:1}}));
 const grant={type:'ticket',protocolVersion:2,requestId:'r',matchId:'m',playerId:'p1',releaseId:'release',ticket:'t'.repeat(43),expiresAt:100,sessionExpiresAt:200};
 assert.deepEqual(c.parseTicketResponse(grant,body),grant);
 assert.throws(()=>c.parseTicketResponse({...grant,requestId:'other'},body));
});
