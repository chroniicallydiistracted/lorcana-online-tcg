import websocket from '@fastify/websocket';
import type { FastifyRequest, FastifyReply } from 'fastify';
import { createHttpService } from '@lorcana/service-runtime';
import { TRANSPORT_PROTOCOL_RANGE, MAX_FRAME_BYTES, parseTicketRequest, parseTransportTicketResponse, negotiateProtocol } from '@lorcana/contracts';
import type { TransportStore } from '@lorcana/db';
import { parseSession, sessionWork } from './session.ts';
import type { SessionAuthority } from './session.ts';
import { createLiveConnection } from './live-connection.ts';
import type { MatchService, GatewayLimits, LiveConnection } from './live-connection.ts';
export type {SessionAuthority,VerifiedSession} from './session.ts';

export async function createMatchGateway(options:{service:MatchService;store:TransportStore;sessions:SessionAuthority;origins:readonly string[];hints?:(changed:(matchId:string)=>void)=>{close():Promise<void>};limits?:Partial<GatewayLimits>}) {
  if(!options?.service||!options.store||typeof options.sessions?.authenticate!=='function'||typeof options.sessions.verify!=='function'||!Array.isArray(options.origins)||!options.origins.length||options.origins.length>8)throw new Error('Invalid gateway configuration');
  const origins=new Set<string>();
  for(const origin of options.origins){let url:URL;try{url=new URL(origin);}catch{throw new Error('Invalid gateway origin');}if(url.origin!==origin||!['http:','https:'].includes(url.protocol)||origin.length>256)throw new Error('Invalid gateway origin');origins.add(origin);}
  const limits={pollMs:500,heartbeatMs:15000,heartbeatTimeoutMs:45000,authDeadlineMs:5000,maxConnections:128,maxPerIp:8,maxBufferedBytes:524288,maxPendingFrames:2,...options.limits};
  for(const [key,min,max]of [['pollMs',10,5000],['heartbeatMs',20,30000],['heartbeatTimeoutMs',40,120000],['authDeadlineMs',20,10000],['maxConnections',1,256],['maxPerIp',1,64],['maxBufferedBytes',64,4194304],['maxPendingFrames',1,8]] as const)if(!Number.isSafeInteger(limits[key])||limits[key]<min||limits[key]>max)throw new Error('Invalid gateway limits');
  if(limits.heartbeatTimeoutMs<=limits.heartbeatMs)throw new Error('Invalid gateway limits');
  const {service,store,sessions}=options,{app,drain:drainHttp}=createHttpService('match-service');
  app.server.maxConnections=limits.maxConnections*2;
  const connections=new Set<LiveConnection>(),all=new Set<LiveConnection>(),ipRate=new Map<string,{count:number;until:number}>();
  let draining=false,closing:Promise<void>|undefined,polling:Promise<void>|undefined,tickets=0;
  // Register ownership before the plugin's close hook so stubborn sockets cannot delay cleanup.
  app.addHook('preClose',async()=>{drain();await polling;await hint?.close();await Promise.all([...all].map(c=>c.finish()));});
  app.addHook('onClose',async()=>{await service.close();await store.close();});
  await app.register(websocket,{options:{maxPayload:MAX_FRAME_BYTES,perMessageDeflate:false}});
  function originOf(request:FastifyRequest){const origin=request.headers.origin;return typeof origin==='string'&&origins.has(origin)?origin:null;}
  function ingress(ip:string) {
    const now=performance.now();for(const [key,value]of ipRate)if(value.until<=now)ipRate.delete(key);
    let row=ipRate.get(ip);if(!row){if(ipRate.size>=1024)return false;row={count:0,until:now+10000};ipRate.set(ip,row);}return ++row.count<=32;
  }
  function cors(request:FastifyRequest,reply:FastifyReply) {
    const origin=originOf(request);if(!origin)return false;
    reply.header('Access-Control-Allow-Origin',origin).header('Access-Control-Allow-Credentials','true').header('Vary','Origin').header('Cache-Control','no-store');return true;
  }
  app.options('/play/ticket',(request,reply)=>{
    if(!cors(request,reply)||request.raw.url!=='/play/ticket')return reply.code(403).send({code:'forbidden'});
    return reply.header('Access-Control-Allow-Methods','POST').header('Access-Control-Allow-Headers','Content-Type').code(204).send();
  });
  app.post('/play/ticket',{bodyLimit:MAX_FRAME_BYTES,errorHandler(error,_request,reply){reply.code(error.statusCode===413?413:400).send({code:'invalid_request'});}},async(request,reply)=>{
    if(!cors(request,reply)||request.raw.url!=='/play/ticket')return reply.code(403).send({code:'forbidden'});
    if(draining)return reply.code(503).send({code:'maintenance',retryAfterMs:1000});
    if(tickets>=16||!ingress(request.ip))return reply.code(429).send({code:'rate_limited',retryAfterMs:1000});tickets++;
    try {
      const session=parseSession(await sessionWork(signal=>sessions.authenticate(request.headers,signal)));
      if(!session)return reply.code(401).send({code:'auth_expired'});
      let body;try{body=parseTicketRequest(request.body);}catch{return reply.code(400).send({code:'invalid_request'});}
      const quota=await store.quota('ticket',session.actorId,12,60000);
      if(!quota.allowed)return reply.code(429).send({code:'rate_limited',retryAfterMs:quota.retryAfterMs});
      const info=await service.describe(session.actorId,{matchId:body.matchId});
      if(![2,3].includes(info.protocolVersion)||negotiateProtocol(body.supportedProtocol,{min:info.protocolVersion,max:info.protocolVersion})!==info.protocolVersion)return reply.code(409).send({code:'unsupported_version',supportedProtocol:TRANSPORT_PROTOCOL_RANGE});
      const issued=await store.issue({actorId:session.actorId,sessionId:session.sessionId,sessionExpiresAt:session.expiresAt,matchId:body.matchId,releaseId:info.releaseId,protocolVersion:info.protocolVersion as 2|3,origin:originOf(request)!});
      return parseTransportTicketResponse({type:'ticket',protocolVersion:info.protocolVersion,requestId:body.requestId,matchId:body.matchId,playerId:session.actorId,releaseId:info.releaseId,ticket:issued.ticket,expiresAt:issued.expiresAt,sessionExpiresAt:session.expiresAt},body);
    }catch(error){
      const code=error&&typeof error==='object'&&'code'in error?error.code:null;
      return reply.code(code==='FORBIDDEN'?403:503).send({code:code==='FORBIDDEN'?'forbidden':'unavailable'});
    }finally{tickets--;}
  });
  app.get('/play',{websocket:true,preValidation:async(request,reply)=>{
    if(draining)return reply.code(503).send({code:'maintenance'});
    if(!originOf(request)||request.raw.url!=='/play')return reply.code(403).send({code:'forbidden'});
    if(connections.size>=limits.maxConnections||[...connections].filter(c=>c.ip===request.ip).length>=limits.maxPerIp||!ingress(request.ip))return reply.code(429).send({code:'rate_limited'});
  }},(socket,request)=>{
    if(draining||connections.size>=limits.maxConnections||[...connections].filter(c=>c.ip===request.ip).length>=limits.maxPerIp){socket.close(1013);return;}
    const connection:LiveConnection=createLiveConnection(socket,{service,store,sessions,origin:originOf(request)!,ip:request.ip,limits,admit:actorId=>[...connections].filter(c=>c.actorId===actorId).length<=4,removed:()=>{connections.delete(connection);}});
    connections.add(connection);all.add(connection);
    socket.once('close',()=>{all.delete(connection);});
  });
  function poll() {
    if(draining||polling)return polling;
    const owned=(async()=>{
      const groups=new Map<string,LiveConnection[]>();
      for(const c of connections){c.tick(performance.now());if(c.matchId&&!c.closed){const group=groups.get(c.matchId)??[];group.push(c);groups.set(c.matchId,group);}}
      for(const group of groups.values()) {
        if(draining)break;
        try {
          await Promise.all(group.map(c=>c.authorized()));const first=group.find(c=>!c.closed);if(!first)continue;
          const current=await first.observe();
          if(!current){for(const c of group)c.drain();continue;}
          await Promise.all(group.filter(c=>!c.closed&&(c.stateVersion!==current.stateVersion||c.releaseId!==current.releaseId||c.clockRevision!==current.clockRevision)).map(c=>c.refresh()));
        }catch{for(const c of group)c.drain();}
      }
    })();polling=owned;
    void owned.finally(()=>{if(polling===owned)polling=undefined;});return owned;
  }
  const timer=setInterval(()=>{void poll();},Math.min(limits.pollMs,limits.heartbeatMs));
  const hint=options.hints?.(matchId=>{if([...connections].some(c=>c.matchId===matchId))void poll();});
  function drain(){if(draining)return;draining=true;drainHttp();if(timer)clearInterval(timer);for(const c of connections)c.drain();}
  return {app,drain,
    close(){if(closing)return closing;drain();closing=app.close().then(()=>{});return closing;},
  };
}
