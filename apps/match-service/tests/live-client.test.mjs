import test from 'node:test';
import assert from 'node:assert/strict';
import {qualification,until,synchronize,act,opening,counts} from './client-fixtures.mjs';

test('PLAY-03 two real clients on different processes complete a natural reference-only synthetic game', {timeout:120000},async()=>{
 const f=await qualification();try {
  const [a,b]=[await f.host(),await f.host(false)],clients=[f.client(0,a.url),f.client(1,b.url)];
  assert.notEqual(a.child.pid,b.child.pid);await Promise.all(clients.map(c=>c.connect()));await opening(f,clients);
  let attempts=0;
  while(!clients[0].view.ended&&++attempts<=30) {
   const index=f.players.indexOf(clients[0].view.turnOwnerId);assert.ok(index>=0);
   const own=()=>clients[index].view.players.find(p=>p.playerId===f.players[index]);
   const zone=kind=>own().zones.find(z=>z.kind===kind);
   if(zone('play').cards.some(c=>'drying'in c&&!c.drying&&c.state==='ready'))await act(clients,index,{kind:'questWithAll',input:{}});
   if(clients[0].view.ended)break;
   if(zone('hand').cards.length&&zone('inkwell').count<3)await act(clients,index,{kind:'putCardIntoInkwell',input:{cardId:zone('hand').cards[0].ref}});
   while(zone('hand').cards.length&&zone('inkwell').cards.some(c=>c.state==='ready'))await act(clients,index,{kind:'playCard',input:{cardId:zone('hand').cards[0].ref,cost:'standard'}});
   if(!clients[0].view.ended)await act(clients,index,{kind:'passTurn',input:{}});
  }
  assert.equal(clients[0].view.ended,true);assert.equal(clients[1].view.ended,true);
  assert.equal(clients[0].view.winner,clients[1].view.winner);assert.ok(f.players.includes(clients[0].view.winner));
  const state=await counts(f.id);assert.equal(state.ended,true);assert.equal(state.journal,state.stateVersion);assert.equal(state.outbox,state.stateVersion);
  assert.ok(state.stateVersion>20,'natural game exercises sustained client/server turn flow');
  for(const list of f.receipts)assert.ok(list.every(r=>r.outcome==='accepted'&&!('intentHash'in r)));
 }finally{await f.close();}
});

test('PLAY-03 killed gateway loses acknowledgement; same pending old refs recover once on another process', {timeout:60000},async()=>{
 const f=await qualification();try {
  const [a,b]=[await f.host(),await f.host(false)];let endpoint=a.url;
  const clients=[f.client(0,()=>endpoint),f.client(1,b.url)];await Promise.all(clients.map(c=>c.connect()));await opening(f,clients);
  const raw=f.sockets[0].at(-1);raw._socket.pause();
  const card=clients[0].view.players.find(p=>p.playerId===f.players[0]).zones.find(z=>z.kind==='hand').cards[0];
  const receivedBefore=f.receipts[0].length,pending=clients[0].submit({kind:'putCardIntoInkwell',input:{cardId:card.ref}});pending.catch(()=>{});
  const original=clients[0].exportPending();assert.ok(original);
  await until(async()=>(await f.creator.describe(f.players[0],{matchId:f.id})).stateVersion===4);
  assert.equal(f.receipts[0].length,receivedBefore,'paused client never decoded acknowledgement');
  clients[0].suspend();const stopped=await a.stop(true);assert.equal(stopped.signal,'SIGKILL');raw._socket.resume();
  endpoint=b.url;await clients[0].resume();const receipt=await pending;
  assert.equal(receipt.commandId,original.command.commandId);assert.equal(receipt.outcome,'accepted');assert.equal(receipt.duplicate,true);assert.equal(receipt.stateVersion,4);
  await synchronize(clients,4);assert.equal((await counts(f.id)).journal,4);
  await act(clients,1,{kind:'concede',input:{}});assert.equal(clients[0].view.ended,true);
 }finally{await f.close();}
});

test('PLAY-03 qualification host reaps itself when its controlling parent IPC disappears', {timeout:15000},async()=>{
 const f=await qualification();try {
  const host=await f.host();host.child.disconnect();
  await until(()=>host.child.exitCode!==null||host.child.signalCode!==null,1500);
  assert.equal(host.child.exitCode,0);
 }finally{await f.close();}
});
