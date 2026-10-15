// Qualification fixture only. Never import into application startup or a browser bundle.
import {createMatchGateway} from '../dist/gateway.js';
import {createTransportStore,createMatchHints,createClockRepository} from '../../../packages/db/dist/index.js';
import {service} from './fixtures.mjs';
let gateway;
process.on('message',async message=>{
 try {
  if(message.kind==='start') {
   const sessions=new Map(message.sessions.map(row=>[row.cookie,row.session]));
   const authority={authenticate:async headers=>sessions.get(headers.cookie)||null,verify:async id=>[...sessions.values()].find(s=>s.sessionId===id)||null};
   const repository=message.clock?createClockRepository('test'):undefined;
   const matchService=repository?service(repository,{clocks:{repository,runner:{intervalMs:50}}}):service();
   gateway=await createMatchGateway({service:matchService,store:createTransportStore('test'),sessions:authority,origins:[message.origin],hints:message.hints===false?undefined:cb=>createMatchHints('test',cb),limits:{pollMs:50}});
   const url=await gateway.app.listen({host:'127.0.0.1',port:0});process.send?.({kind:'listening',url});
  }else if(message.kind==='stop'){await gateway?.close();if(process.connected)process.disconnect();}
  else if(message.kind==='revoke'){/* Revocation fixtures use injected session authority in gateway.test. */}
 }catch{process.send?.({kind:'failed'});await gateway?.close().catch(()=>{});process.exitCode=1;if(process.connected)process.disconnect();}
});
process.once('SIGTERM',()=>{void gateway?.close().finally(()=>{if(process.connected)process.disconnect();});});

process.once('disconnect',()=>{void gateway?.close().catch(()=>{process.exitCode=1;});});
