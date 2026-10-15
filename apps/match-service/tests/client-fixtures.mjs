import {fork} from 'node:child_process';
import {randomUUID,createHash} from 'node:crypto';
import Ws from 'ws';
import {createClockRepository} from '../../../packages/db/dist/index.js';
import {createMatchClient} from '../../../packages/match-client/dist/index.js';
import {service,fixtureId,cleanup,using,counts} from './fixtures.mjs';
export {counts};
export async function until(check,timeout=10000) {
 const end=performance.now()+timeout;
 while(performance.now()<end){if(await check())return;await new Promise(r=>setTimeout(r,10));}
 throw Error('qualification condition deadline');
}
export async function startChild(sessions,origin,hints=true,clock=false) {
 const env={PATH:process.env.PATH,APP_ENV:'local',PGHOST:'postgres',PGPORT:'5432'};
 const child=fork(new URL('./gateway-child.mjs',import.meta.url),[],{env,execArgv:[],stdio:['ignore','ignore','ignore','ipc']});
 const exit=new Promise(resolve=>child.once('exit',(code,signal)=>resolve({code,signal})));
 let timer;
 const url=await new Promise((resolve,reject)=>{
  timer=setTimeout(()=>{child.kill('SIGKILL');reject(Error('qualification host startup deadline'));},10000);
  child.on('error',()=>reject(Error('qualification host failed')));
  child.once('exit',()=>reject(Error('qualification host exited before startup')));
  child.on('message',message=>{if(message.kind==='listening'){clearTimeout(timer);resolve(message.url);}else if(message.kind==='failed'){clearTimeout(timer);reject(Error('qualification host failed'));}});
  child.send({kind:'start',sessions,origin,hints,clock});
 }).finally(()=>clearTimeout(timer));
 return {url,child,async stop(kill=false){
  if(child.exitCode!==null||child.signalCode!==null)return exit;
  if(kill)child.kill('SIGKILL');else if(child.connected)child.send({kind:'stop'});else child.kill('SIGTERM');
  const force=setTimeout(()=>{child.kill('SIGKILL')},5000);try{return await exit;}finally{clearTimeout(force);}
 }};
}
export async function qualification(origin='http://localhost:5173',options={}) {
 const id=fixtureId(),players=['client-'+randomUUID(),'client-'+randomUUID()],repository=options.clock?createClockRepository('test'):undefined,creator=repository?service(repository,{clocks:{repository,runner:{intervalMs:50},recoveryAuthority:async r=>r.auditId==='qualification-auditor'?r.auditId:null}}):service();
 try{await creator.create({matchId:id,players,...(options.clock?{clock:options.clock}:{})});}catch(error){await creator.close();await cleanup(id);throw error;}
 const sessions=players.map(actorId=>({cookie:'qualification_session='+randomUUID(),session:{actorId,sessionId:'s-'+randomUUID(),expiresAt:Date.now()+300000}}));
 const hosts=[],clients=[],receipts=[[],[]],sockets=[[],[]];
 async function host(hints=true){const h=await startChild(sessions,origin,hints,!!options.clock);hosts.push(h);return h;}
 function client(index,endpoint,other={}) {
  const c=createMatchClient({matchId:id,clientReleaseId:'qualification-client',endpoint,requestTimeoutMs:8000,retryBaseMs:20,
   fetcher:(url,init)=>fetch(url,{...init,headers:{...init.headers,Origin:origin,Cookie:sessions[index].cookie}}),
   socketFactory:url=>{const ws=new Ws(url,{origin});sockets[index].push(ws);return ws;},onReceipt:r=>receipts[index].push(r),...other});clients.push(c);return c;
 }
 return {id,players,sessions,creator,hosts,clients,receipts,sockets,host,client,async close(){
  for(const c of clients)c.close();for(const group of sockets)for(const ws of group){ws._socket?.resume();ws.terminate();}
  for(const h of hosts)await h.stop();await creator.close();await cleanup(id);
  const keys=[...players.flatMap(actor=>[['ticket',actor],['principal',actor],['command',actor+':'+id],['view',actor+':'+id]]),['match',id]].map(([scope,subject])=>createHash('sha256').update(scope+'\0'+subject).digest('hex'));
  await using('match',c=>c.query('DELETE FROM match.transport_limits WHERE key_hash=ANY($1::text[])',[keys]));
 }};
}
export async function synchronize(clients,revision) {await until(()=>clients.every(c=>c.status==='ready'&&c.view?.stateVersion>=revision));}
export async function act(clients,index,intent) {
 await until(()=>clients[index].status==='ready');const result=await clients[index].submit(intent);
 if(result.outcome!=='accepted')throw Error('qualification action was not accepted');
 await synchronize(clients,result.stateVersion);return result;
}
export async function opening(f,clients) {
 const chooser=f.players.indexOf(clients[0].view.priorityId);
 await act(clients,chooser,{kind:'chooseWhoGoesFirst',input:{playerId:f.players[0]}});
 await act(clients,0,{kind:'alterHand',input:{cardsToMulligan:[]}});
 await act(clients,1,{kind:'alterHand',input:{cardsToMulligan:[]}});
}
