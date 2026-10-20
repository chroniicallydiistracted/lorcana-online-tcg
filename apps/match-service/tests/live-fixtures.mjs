import assert from 'node:assert/strict';
import {existsSync} from 'node:fs';
import {randomUUID,createHash} from 'node:crypto';
import {createTransportStore,createMatchHints} from '../../../packages/db/dist/index.js';
import {decodeTransportServerFrame,parseTransportTicketResponse} from '../../../packages/contracts/dist/index.js';
import {service,fixtureId,cleanup,using} from './fixtures.mjs';
export const origin='http://localhost:5173';
export async function factory(){assert.ok(existsSync(new URL('../dist/gateway.js',import.meta.url)),'bounded live gateway is missing');return (await import('../dist/gateway.js')).createMatchGateway;}

export async function setup(options={}) {
 const create=await factory(),id=fixtureId(),s=service();
 const players=['player-'+randomUUID(),'player-'+randomUUID()];await s.create({matchId:id,players});
 const sessions=new Map(players.map((actorId,i)=>['cookie-'+i,{actorId,sessionId:'session-'+randomUUID(),expiresAt:Date.now()+120000}]));
 const authority={authenticate:async headers=>sessions.get(headers.cookie)||null,verify:async sessionId=>[...sessions.values()].find(v=>v.sessionId===sessionId)||null};
 const hosts=[];
 async function host(extra={}) {
  const backend=service(),store=createTransportStore('test');
  const gateway=await create({service:backend,store,sessions:authority,origins:[origin],hints:cb=>createMatchHints('test',cb),...options,...extra});
  const url=await gateway.app.listen({host:'127.0.0.1',port:0});const h={...gateway,url,backend,store};hosts.push(h);return h;
 }
 async function ticket(h,actor=0,extra={}) {
  const request={requestId:'ticket-'+randomUUID(),matchId:id,clientReleaseId:'test-client',supportedProtocol:{min:3,max:4},...extra};
  const response=await fetch(h.url+'/play/ticket',{method:'POST',headers:{Origin:origin,Cookie:'cookie-'+actor,'Content-Type':'application/json'},body:JSON.stringify(request)});
  const value=await response.json();return {response,value,grant:response.ok?parseTransportTicketResponse(value,request):null};
 }
 async function socket(h,grant,rawAuth) {
  const Ws=(await import('ws')).default,ws=new Ws(h.url.replace('http:','ws:')+'/play',{origin});const frames=[],waiters=[];
  ws.on('error',()=>{});ws.on('message',data=>{const frame=decodeTransportServerFrame(data.toString());frames.push(frame);for(const check of [...waiters])check();});
  await new Promise((resolve,reject)=>{ws.once('open',resolve);ws.once('error',()=>reject(Error('test socket refused')));});
  const wait=predicate=>new Promise((resolve,reject)=>{
   const check=()=>{const found=frames.find(predicate);if(found){clearTimeout(timer);waiters.splice(waiters.indexOf(check),1);resolve(found);}};
   const timer=setTimeout(()=>{waiters.splice(waiters.indexOf(check),1);reject(Error('test frame deadline'));},5000);waiters.push(check);check();
  });
  ws.send(JSON.stringify(rawAuth??{type:'authenticate',protocolVersion:grant.protocolVersion,requestId:'authenticate',ticket:grant.ticket}));
  return {ws,frames,wait,send:frame=>ws.send(JSON.stringify(frame)),close:()=>new Promise(resolve=>{if(ws.readyState===3)return resolve();ws.once('close',resolve);ws.terminate();})};
 }
 return {id,s,players,sessions,host,ticket,socket,async close(){for(const h of hosts)await h.close();await s.close();await cleanup(id);
   const keys=[...players.flatMap(actor=>[['ticket',actor],['principal',actor],['command',actor+':'+id],['view',actor+':'+id]]),['match',id]].map(([scope,subject])=>createHash('sha256').update(scope+'\0'+subject).digest('hex'));
   await using('match',c=>c.query('DELETE FROM match.transport_limits WHERE key_hash=ANY($1::text[])',[keys]));}};
}

