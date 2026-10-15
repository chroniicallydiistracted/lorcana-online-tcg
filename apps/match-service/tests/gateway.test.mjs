import test from 'node:test';
import assert from 'node:assert/strict';
import {randomUUID} from 'node:crypto';
import {setup,origin,factory} from './live-fixtures.mjs';

test('PLAY-03 gateway requires bounded injected session/origin authority and never registers ordinary login',async()=>{
 const create=await factory();await assert.rejects(create({}),/Invalid gateway/);
 const f=await setup();try {
  const h=await f.host();
  for(const headers of [{Origin:'http://wrong.invalid',Cookie:'cookie-0'},{Origin:origin,Cookie:'not-signed-in'}]){
   const response=await fetch(h.url+'/play/ticket',{method:'POST',headers:{...headers,'Content-Type':'application/json'},body:'{}'});assert.ok([401,403].includes(response.status));
  }
  const wrong=await f.ticket(h,0,{actorId:f.players[1]});assert.equal(wrong.response.status,400);
  assert.equal((await fetch(h.url+'/login')).status,404);
  const {grant}=await f.ticket(h);assert.ok(grant);const a=await f.socket(h,grant);
  try{const frame=await a.wait(r=>r.type==='snapshot');assert.equal(frame.payload.viewer.playerId,f.players[0]);assert.equal(frame.payload.stateVersion,0);}
  finally{await a.close();}
  const replay=await f.socket(h,grant);try{await new Promise(resolve=>{if(replay.ws.readyState===3)return resolve();replay.ws.once('close',resolve);});assert.equal(replay.frames.some(r=>r.type==='snapshot'),false);}finally{await replay.close();}
 }finally{await f.close();}
});

test('PLAY-03 two sockets recover on another gateway and retry a committed reference command once',async()=>{
 const f=await setup();let a,b,c;
 try {
  const h1=await f.host(),h2=await f.host({hints:undefined});
  a=await f.socket(h1,(await f.ticket(h1,0)).grant);b=await f.socket(h2,(await f.ticket(h2,1)).grant);
  let av=(await a.wait(r=>r.type==='snapshot')).payload;await b.wait(r=>r.type==='snapshot');
  const chooser=av.priorityId===f.players[0]?a:b;
  const send=async(client,revision,kind,input)=>{
   const command={type:'command',protocolVersion:2,matchId:f.id,commandId:'command-'+randomUUID(),correlationId:'request-'+randomUUID(),expectedStateVersion:revision,intent:{kind,input}};
   client.send(command);const receipt=await client.wait(r=>r.type==='receipt'&&r.commandId===command.commandId);assert.equal(receipt.outcome,'accepted');return {command,receipt};
  };
  await send(chooser,0,'chooseWhoGoesFirst',{playerId:f.players[0]});await send(a,1,'alterHand',{cardsToMulligan:[]});await send(b,2,'alterHand',{cardsToMulligan:[]});
  av=(await a.wait(r=>r.type==='snapshot'&&r.stateVersion===3)).payload;
  const ref=av.players.find(p=>p.playerId===f.players[0]).zones.find(z=>z.kind==='hand').cards[0].ref;
  const applied=await send(a,3,'putCardIntoInkwell',{cardId:ref});await a.close();a=null;
  c=await f.socket(h2,(await f.ticket(h2,0)).grant);await c.wait(r=>r.type==='snapshot'&&r.stateVersion===4);
  c.send(applied.command);const duplicate=await c.wait(r=>r.type==='receipt'&&r.commandId===applied.command.commandId);assert.equal(duplicate.duplicate,true);assert.equal(duplicate.stateVersion,4);
  await send(b,4,'concede',{});const terminal=await c.wait(r=>r.type==='snapshot'&&r.payload.ended);assert.equal(terminal.payload.winner,f.players[0]);
 }finally{await a?.close();await b?.close();await c?.close();await f.close();}
});

test('PLAY-03 revocation and drain withhold further private views and do not concede',async()=>{
 const f=await setup({limits:{pollMs:30,heartbeatMs:50,heartbeatTimeoutMs:300}});let a;
 try {
  const h=await f.host(),grant=(await f.ticket(h,0)).grant;a=await f.socket(h,grant);await a.wait(r=>r.type==='snapshot');
  f.sessions.delete('cookie-0');const expired=await a.wait(r=>r.type==='control'&&r.outcome==='auth_expired');assert.equal(expired.outcome,'auth_expired');
  assert.equal((await f.s.view(f.players[1],{matchId:f.id})).ended,false);
  await h.drain();assert.equal((await f.ticket(h,1)).response.status,503);
 }finally{await a?.close();await f.close();}
});

test('PLAY-03 parallel ticket authentication reserves the per-actor connection cap before asynchronous work',async()=>{
 const f=await setup();let sockets=[];
 try {
  let arrived=0,release;const gate=new Promise(r=>{release=r});const original=[...f.sessions.values()][0];
  const authority={authenticate:async()=>original,verify:async()=>{if(arrived<5){if(++arrived===5)release();await gate;}return original;}};
  const h=await f.host({sessions:authority});
  const grants=await Promise.all(Array.from({length:5},async()=>{const t=await f.ticket(h,0);assert.ok(t.grant);return t.grant;}));
  sockets=await Promise.all(grants.map(g=>f.socket(h,g)));
  const outcomes=await Promise.all(sockets.map(c=>new Promise(resolve=>{
   if(c.frames.some(x=>x.type==='snapshot'))return resolve(true);if(c.ws.readyState===3)return resolve(false);
   const timer=setTimeout(()=>resolve(false),2000);c.ws.once('close',()=>{clearTimeout(timer);resolve(false)});c.ws.on('message',()=>{if(c.frames.some(x=>x.type==='snapshot')){clearTimeout(timer);resolve(true)}});
  })));
  assert.equal(outcomes.filter(Boolean).length,4,'no more than four authenticated sockets per actor');
 }finally{await Promise.all(sockets.map(c=>c.close()));await f.close();}
});

test('PLAY-03 unauthenticated deadlines, binary/oversized frames and outbound budgets fail closed',async()=>{
 const f=await setup({limits:{authDeadlineMs:50}});const sockets=[];
 try {
  const h=await f.host(),Ws=(await import('ws')).default;
  const unauth=new Ws(h.url.replace('http:','ws:')+'/play',{origin});unauth.on('error',()=>{});
  const code=await new Promise(resolve=>unauth.once('close',resolve));assert.equal(code,1008);
  for(const payload of [Buffer.from('binary'),'x'.repeat(16385)]){
   const g=(await f.ticket(h)).grant,c=await f.socket(h,g);sockets.push(c);await c.wait(r=>r.type==='snapshot');
   const closed=new Promise(resolve=>c.ws.once('close',resolve));c.ws.send(payload);assert.ok([1008,1009].includes(await closed));
  }
  const tiny=await f.host({limits:{maxBufferedBytes:64}}),g=(await f.ticket(tiny)).grant,c=await f.socket(tiny,g);sockets.push(c);
  const closed=new Promise(resolve=>{if(c.ws.readyState===3)return resolve(1013);c.ws.once('close',resolve);});assert.equal(await closed,1013);assert.equal(c.frames.some(r=>r.type==='snapshot'),false);
  assert.equal((await f.s.view(f.players[0],{matchId:f.id})).ended,false);
 }finally{await Promise.all(sockets.map(c=>c.close()));await f.close();}
});

test('PLAY-03 direct Fastify close owns gateway timers, hint subscription, service and store cleanup',async()=>{
 const f=await setup();try {
  const h=await f.host();await h.app.close();
  await assert.rejects(h.backend.describe(f.players[0],{matchId:f.id}),e=>e.code==='UNAVAILABLE');
  await assert.rejects(h.store.quota('view',f.id,1,1000),/unavailable/);
  await h.close();
 }finally{await f.close();}
});
