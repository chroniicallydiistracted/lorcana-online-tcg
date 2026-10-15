import { decodeLiveClientFrame, encodeLiveServerFrame } from '@lorcana/contracts';
import type { LiveClientFrame, LiveCommand } from '@lorcana/contracts';
import type { TransportStore, TicketGrant } from '@lorcana/db';
import type { WebSocket, RawData } from 'ws';
import type { createMatchService } from './service.ts';
import { currentSession } from './session.ts';
import type { SessionAuthority } from './session.ts';

export interface GatewayLimits {pollMs:number;heartbeatMs:number;heartbeatTimeoutMs:number;authDeadlineMs:number;maxConnections:number;maxPerIp:number;maxBufferedBytes:number;maxPendingFrames:number}
export type MatchService=ReturnType<typeof createMatchService>;
export function createLiveConnection(ws:WebSocket,options:{service:MatchService;store:TransportStore;sessions:SessionAuthority;origin:string;ip:string;limits:GatewayLimits;admit:(actorId:string)=>boolean;removed:()=>void}) {
  const {service,store,sessions,limits}=options;let grant:TicketGrant|undefined,reservedActor:string|undefined,closed=false,sequence=0,version=0,pending=0;
  let chain=Promise.resolve(),refreshing:Promise<void>|undefined,lastPong=performance.now(),lastPing=lastPong;
  const authTimer=setTimeout(()=>stop(1008),limits.authDeadlineMs);
  function stop(code=1008){if(closed)return;closed=true;clearTimeout(authTimer);try{ws.close(code);}catch{ws.terminate();}options.removed();}
  function envelope(correlationId:string,stateVersion=version){return {protocolVersion:2 as const,matchId:grant!.matchId,sequence:++sequence,stateVersion,correlationId,releaseId:grant!.releaseId};}
  function send(value:unknown) {
    if(closed||ws.readyState!==1)return false;
    try{const raw=encodeLiveServerFrame(value);if(ws.bufferedAmount+Buffer.byteLength(raw)>limits.maxBufferedBytes){stop(1013);return false;}ws.send(raw,error=>{if(error)stop(1012);});return true;}
    catch{stop(1011);return false;}
  }
  function control(outcome:'auth_expired'|'maintenance'|'rate_limited',retryAfterMs=1000) {
    if(!grant)return;
    send({...envelope('control'),type:'control',outcome,...(outcome==='auth_expired'?{}:{retryAfterMs})});
  }
  async function authorized():Promise<boolean> {
    if(closed||!grant)return false;
    if(!await currentSession(sessions,grant)){control('auth_expired');stop(4401);return false;}return !closed;
  }
  async function refresh(correlationId='publication',force=false):Promise<void> {
    if(refreshing){if(!force)return refreshing;await refreshing;}
    if(closed||!grant)return;
    const owned=(async()=>{
      if(!await authorized()||!grant)return;
      try {
        const read=await service.read(grant.actorId,{matchId:grant.matchId});
        if(!await authorized()||!grant)return;
        if(read.protocolVersion!==2||read.releaseId!==grant.releaseId||read.projection.stateVersion<version)throw new Error();
        if(force||read.projection.stateVersion>version){version=read.projection.stateVersion;send({...envelope(correlationId),type:'snapshot',projectionType:'viewer',payload:read.projection});}
      }catch{control('maintenance');stop(1012);}
    })();refreshing=owned;
    try{await owned;}finally{if(refreshing===owned)refreshing=undefined;}
  }
  async function receipt(command:LiveCommand) {
    if(!grant||!await authorized())return;
    for(const [scope,subject,limit]of [['principal',grant.actorId,12],['command',grant.actorId+':'+grant.matchId,8],['match',grant.matchId,12]] as const) {
      const quota=await store.quota(scope,subject,limit,1000);
      if(!quota.allowed){send({...envelope(command.correlationId),type:'receipt',commandId:command.commandId,duplicate:false,outcome:'rate_limited',reason:'rate_limit',retryAfterMs:quota.retryAfterMs});return;}
    }
    if(!await authorized()||closed||!grant)return;
    try {
      const result=await service.submitRefs(grant.actorId,{matchId:grant.matchId,commandId:command.commandId,expectedVersion:command.expectedStateVersion,move:command.intent.kind,input:command.intent.input});
      if(!await authorized()||closed)return;
      const r=result.receipt;
      send({...envelope(command.correlationId,r.stateVersion),type:'receipt',commandId:r.commandId,duplicate:result.duplicate,outcome:r.outcome,...(r.reason===null?{}:{reason:r.reason})});
      await refresh(command.correlationId,true);
    }catch(error){
      const code=error&&typeof error==='object'&&'code'in error?error.code:null;
      if(code==='ID_CONFLICT'||code==='INVALID_REQUEST'||code==='FORBIDDEN'){stop(1008);return;}
      send({...envelope(command.correlationId),type:'receipt',commandId:command.commandId,duplicate:false,outcome:'maintenance',reason:'maintenance',retryAfterMs:1000});
      control('maintenance');stop(1012);
    }
  }
  async function handle(raw:string) {
    if(closed)return;let frame:LiveClientFrame;
    try{frame=decodeLiveClientFrame(raw);}catch{stop(1008);return;}
    if(!grant) {
      if(frame.type!=='authenticate'){stop(1008);return;}
      const candidate=await store.consume(frame.ticket,options.origin);
      if(closed)return;
      if(!candidate||!await currentSession(sessions,candidate)){stop(1008);return;}
      // Reserve synchronously before describe awaits; pending authentication consumes a slot.
      reservedActor=candidate.actorId;if(!options.admit(candidate.actorId)){stop(1008);return;}
      const info=await service.describe(candidate.actorId,{matchId:candidate.matchId});
      if(info.releaseId!==candidate.releaseId||info.protocolVersion!==2){stop(1008);return;}
      if(closed||!await currentSession(sessions,candidate))return stop(4401);
      grant=candidate;clearTimeout(authTimer);version=info.stateVersion;
      send({...envelope(frame.requestId),type:'ready',playerId:grant.actorId});
      await refresh(frame.requestId,true);return;
    }
    if(frame.type==='authenticate'||frame.matchId!==grant.matchId){stop(1008);return;}
    if(!await authorized())return;
    if(frame.type==='command')await receipt(frame);
    else {
      const quota=await store.quota('view',grant.actorId+':'+grant.matchId,4,1000);
      if(!quota.allowed){control('rate_limited',quota.retryAfterMs);return;}
      await refresh(frame.correlationId,true);
    }
  }
  // Attach before any asynchronous authentication work, per Fastify WebSocket's contract.
  ws.on('message',(data:RawData,binary:boolean)=>{
    if(closed)return;if(binary||pending>=limits.maxPendingFrames){stop(binary?1008:1013);return;}
    const raw=Buffer.isBuffer(data)?data.toString('utf8'):Array.isArray(data)?Buffer.concat(data).toString('utf8'):Buffer.from(data).toString('utf8');
    pending++;chain=chain.then(()=>handle(raw)).catch(()=>{control('maintenance');stop(1012);}).finally(()=>{pending--;});
  });
  ws.on('pong',()=>{lastPong=performance.now();});ws.on('error',()=>stop(1012));
  ws.on('close',()=>{if(!closed){closed=true;clearTimeout(authTimer);options.removed();}});
  return {
    get actorId(){return grant?.actorId??reservedActor;},get matchId(){return grant?.matchId;},get stateVersion(){return version;},get releaseId(){return grant?.releaseId;},get closed(){return closed;},ip:options.ip,
    refresh,authorized,
    async observe(){if(!grant||!await authorized())return null;return service.observe(grant.actorId,{matchId:grant.matchId});},
    tick(now:number){if(closed)return;if(now-lastPong>limits.heartbeatTimeoutMs){stop(1013);return;}if(now-lastPing>=limits.heartbeatMs){lastPing=now;try{ws.ping();}catch{stop(1012);}}},
    drain(){control('maintenance');stop(1012);},
    async finish(){stop(1001);await chain;await refreshing;ws.terminate();},
  };
}
export type LiveConnection=ReturnType<typeof createLiveConnection>;
