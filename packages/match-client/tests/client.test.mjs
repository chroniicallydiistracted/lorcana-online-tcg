import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync} from 'node:fs';
const envelope=(sequence,stateVersion=0)=>({protocolVersion:2,matchId:'m',sequence,stateVersion,correlationId:'authenticate',releaseId:'release'});
const view=(revision=0)=>({schemaVersion:1,scope:'synthetic',matchId:'m',stateVersion:revision,viewer:{kind:'participant',playerId:'p1'},ended:false,winner:null,turn:0,turnOwnerId:'p1',priorityId:'p1',players:['p1','p2'].map(playerId=>({playerId,lore:0,inkDrops:0,zones:['hand','deck','play','discard','inkwell'].map(kind=>({kind,count:0,cards:[]}))})),resources:[],commands:[],logs:[],animations:[]});
class Socket extends globalThis.EventTarget {
 readyState=0;bufferedAmount=0;sent=[];
 send(raw){this.sent.push(JSON.parse(raw));}
 close(){this.readyState=3;this.fire('close',{code:1000});}
 fire(type,properties={}){const event=new globalThis.Event(type);Object.assign(event,properties);this.dispatchEvent(event);}
 server(value){this.fire('message',{data:JSON.stringify(value)});}
}
async function setup(other={}) {
 assert.ok(existsSync(new URL('../dist/index.js',import.meta.url)),'browser-safe reconnect client is missing');
 const {createMatchClient}=await import('../dist/index.js');const sockets=[],statuses=[],receipts=[];let player='p1';
 const options={matchId:'m',clientReleaseId:'client',endpoint:'http://localhost:3002',retryBaseMs:5,maxAttempts:2,stableMs:50,
  fetcher:async(_url,init)=>{const r=JSON.parse(init.body);return new globalThis.Response(JSON.stringify({type:'ticket',protocolVersion:2,requestId:r.requestId,matchId:'m',playerId:player,releaseId:'release',ticket:'t'.repeat(43),expiresAt:Date.now()+30000,sessionExpiresAt:Date.now()+60000}),{status:200});},
  socketFactory:()=>{const socket=new Socket();sockets.push(socket);setTimeout(()=>{socket.readyState=1;socket.fire('open')},0);return socket;},
  onStatus:s=>statuses.push(s),onReceipt:r=>receipts.push(r),...other};
 const c=createMatchClient(options);
 async function waitSocket(index){for(let n=0;n<100;n++){const s=sockets[index];if(s?.sent.some(f=>f.type==='authenticate'))return s;await new Promise(r=>setTimeout(r,1));}throw Error('socket did not authenticate');}
 function ready(socket,revision=0){const auth=socket.sent.find(f=>f.type==='authenticate');socket.server({...envelope(1,revision),correlationId:auth.requestId,type:'ready',playerId:player});socket.server({...envelope(2,revision),correlationId:auth.requestId,type:'snapshot',projectionType:'viewer',payload:view(revision)});}
 return {c,sockets,statuses,receipts,waitSocket,ready,setPlayer:p=>{player=p}};
}

test('client waits for correlated authorized snapshot, copies views and rejects raw-ID or overlapping moves',async()=>{
 const f=await setup();try{
  const ready=f.c.connect();ready.catch(()=>{});const s=await f.waitSocket(0);assert.notEqual(f.c.status,'ready');f.ready(s);await ready;
  const copy=f.c.view;copy.players[0].lore=999;assert.equal(f.c.view.players[0].lore,0);
  await assert.rejects(f.c.submit({kind:'putCardIntoInkwell',input:{cardId:'raw-id'}}));
  const pending=f.c.submit({kind:'concede',input:{}});pending.catch(()=>{});await assert.rejects(f.c.submit({kind:'passTurn',input:{}}));
  const cmd=s.sent.find(x=>x.type==='command');assert.ok(cmd);const exported=f.c.exportPending();assert.equal(exported.actorId,'p1');
  s.server({...envelope(3,1),correlationId:cmd.correlationId,type:'receipt',commandId:cmd.commandId,duplicate:false,outcome:'accepted'});
  assert.equal((await pending).outcome,'accepted');assert.equal(f.c.exportPending(),null);assert.notEqual(f.c.status,'ready');
  s.server({...envelope(4,1),correlationId:cmd.correlationId,type:'snapshot',projectionType:'viewer',payload:view(1)});assert.equal(f.c.status,'ready');
 }finally{f.c.close();}
});

test('pending bytes and IDs survive suspension/host hop and duplicate receipt, while stale results are final',async()=>{
 let endpoint='http://localhost:3002';const f=await setup({endpoint:()=>endpoint});try {
  const first=f.c.connect();first.catch(()=>{});const a=await f.waitSocket(0);f.ready(a);await first;
  const pending=f.c.submit({kind:'concede',input:{}});pending.catch(()=>{});const original=f.c.exportPending();
  f.c.suspend();assert.equal(f.c.view,null);endpoint='http://localhost:4002';const next=f.c.resume();next.catch(()=>{});const b=await f.waitSocket(1);f.ready(b,1);await next;
  const retried=b.sent.find(x=>x.type==='command');assert.deepEqual(retried,original.command);
  b.server({...envelope(3,1),correlationId:retried.correlationId,type:'receipt',commandId:retried.commandId,duplicate:true,outcome:'accepted'});assert.equal((await pending).duplicate,true);
  b.server({...envelope(4,1),type:'snapshot',projectionType:'viewer',payload:view(1)});
  const stale=f.c.submit({kind:'passTurn',input:{}});stale.catch(()=>{});const command=b.sent.filter(x=>x.type==='command').at(-1);
  b.server({...envelope(5,1),correlationId:command.correlationId,type:'receipt',commandId:command.commandId,duplicate:false,outcome:'stale',reason:'stale_state'});
  assert.equal((await stale).outcome,'stale');assert.equal(f.c.exportPending(),null);
 }finally{f.c.close();}
});

test('server sequence gaps, incompatible pins and changed account never replay a pending intent',async()=>{
 const f=await setup({retryBaseMs:1});try {
  const first=f.c.connect();first.catch(()=>{});const a=await f.waitSocket(0);f.ready(a);await first;
  a.server({...envelope(4,1),type:'snapshot',projectionType:'viewer',payload:view(1)});assert.notEqual(f.c.status,'ready');
  const b=await f.waitSocket(1);f.ready(b);await new Promise(r=>setTimeout(r,1));
  const pending=f.c.submit({kind:'concede',input:{}});pending.catch(()=>{});f.c.suspend();f.setPlayer('p2');
  await assert.rejects(f.c.resume());assert.equal(f.c.status,'auth_expired');assert.equal(f.c.view,null);
  assert.equal(f.sockets.length,2,'account switch cannot create another match socket');
 }finally{f.c.close();}
});

test('transient receipts preserve pending identity; expiry stops retries and retains explicit recovery data',async()=>{
 const f=await setup();try {
  const first=f.c.connect();first.catch(()=>{});const s=await f.waitSocket(0);f.ready(s);await first;
  const pending=f.c.submit({kind:'concede',input:{}});pending.catch(()=>{});const saved=f.c.exportPending();
  s.server({...envelope(3),correlationId:saved.command.correlationId,type:'receipt',commandId:saved.command.commandId,duplicate:false,outcome:'rate_limited',reason:'rate_limit',retryAfterMs:1000});
  assert.deepEqual(f.c.exportPending(),saved);
  s.server({...envelope(4),type:'control',outcome:'auth_expired'});assert.equal(f.c.status,'auth_expired');assert.equal(f.c.view,null);assert.deepEqual(f.c.exportPending(),saved);
 }finally{f.c.close();}
});

test('unrelated snapshots do not resend a pending command or hide its acknowledgement deadline',async()=>{
 const f=await setup({requestTimeoutMs:40});let timer;try {
  const ready=f.c.connect();ready.catch(()=>{});const s=await f.waitSocket(0);f.ready(s);await ready;
  const pending=f.c.submit({kind:'concede',input:{}});pending.catch(()=>{});
  s.server({...envelope(3),type:'snapshot',projectionType:'viewer',payload:view()});
  assert.equal(s.sent.filter(x=>x.type==='command').length,1,'a publication is not a retry request');
  let seq=3;timer=setInterval(()=>s.server({...envelope(++seq),type:'snapshot',projectionType:'viewer',payload:view()}),5);
  await f.waitSocket(1);assert.notEqual(f.c.status,'ready');
 }finally{if(timer)clearInterval(timer);f.c.close();}
});

test('application receipt callbacks cannot overwrite terminal transport state or undo an accepted result',async()=>{
 let f;f=await setup({onReceipt:()=>f.c.close()});try {
  const ready=f.c.connect();ready.catch(()=>{});const s=await f.waitSocket(0);f.ready(s);await ready;
  const pending=f.c.submit({kind:'concede',input:{}});pending.catch(()=>{});const cmd=s.sent.find(x=>x.type==='command');
  s.server({...envelope(3,1),type:'receipt',correlationId:cmd.correlationId,commandId:cmd.commandId,duplicate:false,outcome:'accepted'});
  assert.equal((await pending).outcome,'accepted');assert.equal(f.c.status,'closed');assert.equal(f.c.view,null);
 }finally{f.c.close();}
});

test('replacing an incomplete connection rejects its waiter rather than leaking a pending promise',async()=>{
 const f=await setup();try {
  const old=f.c.connect();old.catch(()=>{});const next=f.c.resume();next.catch(()=>{});
  const settled=await Promise.race([old.then(()=>false,()=>true),new Promise(r=>setTimeout(()=>r(false),50))]);assert.equal(settled,true);
 }finally{f.c.close();}
});

test('status callbacks that dispose transport cannot leave a subsequently scheduled retry timer',async t=>{
 for(const mode of ['reconnecting','rate_limited']) {
  let f,disposed=false;const late=[],original=globalThis.setTimeout;
  f=await setup({onStatus:s=>{if(s===mode){f.c.close();disposed=true;}}});
  try {
   const connected=f.c.connect();connected.catch(()=>{});const socket=await f.waitSocket(0);f.ready(socket);await connected;
   const mock=t.mock.method(globalThis,'setTimeout',(fn,delay,...args)=>{const handle=original(fn,delay,...args);if(disposed)late.push(handle);return handle;});
   if(mode==='reconnecting')socket.fire('close');
   else {
    const pending=f.c.submit({kind:'concede',input:{}});pending.catch(()=>{});const cmd=f.c.exportPending().command;
    socket.server({...envelope(3),type:'receipt',correlationId:cmd.correlationId,commandId:cmd.commandId,duplicate:false,outcome:'rate_limited',reason:'rate_limit',retryAfterMs:300000});
   }
   mock.mock.restore();assert.equal(f.c.status,'closed');assert.equal(late.length,0,mode+' installed a timer after close');
  }finally{for(const handle of late)clearTimeout(handle);f.c.close();t.mock.restoreAll();}
 }
});

test('view clearing callbacks preserve disposal and settle connect and suspend callers',async()=>{
 let f,closeOnClear=true;
 f=await setup({onView:v=>{if(v===null&&closeOnClear)f.c.close();}});
 try {
  const connected=f.c.connect();connected.catch(()=>{});
  const result=await Promise.race([connected.then(()=> 'resolved',()=> 'rejected'),new Promise(r=>setTimeout(()=>r('pending'),30))]);
  assert.equal(result,'rejected');assert.equal(f.c.status,'closed');assert.equal(f.sockets.length,0);
 }finally{f.c.close();}
 closeOnClear=false;
 f=await setup({onView:v=>{if(v===null&&closeOnClear)f.c.close();}});
 try {
  const connected=f.c.connect();connected.catch(()=>{});const socket=await f.waitSocket(0);f.ready(socket);await connected;
  closeOnClear=true;f.c.suspend();assert.equal(f.c.status,'closed');assert.equal(f.c.view,null);
 }finally{f.c.close();}
});
