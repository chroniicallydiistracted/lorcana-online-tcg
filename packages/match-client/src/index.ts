import { decodeLiveServerFrame, decodeLiveClientFrame, parseLiveCommand, parseTicketRequest, parseTicketResponse, parseClientPending, encodeViewerProjection, decodeViewerProjection, MAX_FRAME_BYTES } from '@lorcana/contracts';
import type { LiveIntent, LiveCommand, LiveReceipt, TicketResponse, ClientPending, ViewerProjection } from '@lorcana/contracts';
export type ClientStatus='idle'|'connecting'|'ready'|'resyncing'|'reconnecting'|'rate_limited'|'suspended'|'auth_expired'|'forbidden'|'upgrade_required'|'closed';
type MatchSocket=Pick<WebSocket,'readyState'|'bufferedAmount'|'send'|'close'|'addEventListener'>;
export interface MatchClientOptions {
  matchId:string;clientReleaseId:string;endpoint:string|(()=>string);restorePending?:unknown;
  onStatus?:(status:ClientStatus)=>void;onView?:(view:ViewerProjection|null)=>void;onReceipt?:(receipt:LiveReceipt)=>void;
  fetcher?:typeof fetch;socketFactory?:(url:string)=>MatchSocket;
  retryBaseMs?:number;maxAttempts?:number;stableMs?:number;requestTimeoutMs?:number;
}
export class MatchClientError extends Error {constructor(readonly code:string){super('Match client '+code);}}
interface Pending {sentOn?:number;actorId:string;command:LiveCommand;raw:string;attempts:number;resolve:(receipt:LiveReceipt)=>void;reject:(error:Error)=>void}
/** Browser-safe transport only. Account login, local persistence and game UI are separate owners. */
export function createMatchClient(options:MatchClientOptions) {
  parseTicketRequest({requestId:'validation',matchId:options.matchId,clientReleaseId:options.clientReleaseId,supportedProtocol:{min:2,max:2}});
  const fetcher=options.fetcher??globalThis.fetch,socketFactory=options.socketFactory??(url=>new globalThis.WebSocket(url));
  const retryBaseMs=options.retryBaseMs??250,maxAttempts=options.maxAttempts??8,stableMs=options.stableMs??30000,timeoutMs=options.requestTimeoutMs??5000;
  for(const [v,min,max]of [[retryBaseMs,1,5000],[maxAttempts,1,8],[stableMs,1,300000],[timeoutMs,20,15000]] as const)if(!Number.isSafeInteger(v)||v<min||v>max)throw new MatchClientError('invalid_request');
  let status:ClientStatus='idle',disposed=false,running=false,generation=0,attempts=0,sequence=0,requiredVersion=0,gotReady=false,boundActor:string|undefined;
  let socket:MatchSocket|undefined,ticket:TicketResponse|undefined,viewRaw:string|undefined,pending:Pending|undefined,controller:AbortController|undefined;
  let retryTimer:ReturnType<typeof setTimeout>|undefined,deadline:ReturnType<typeof setTimeout>|undefined,stableTimer:ReturnType<typeof setTimeout>|undefined;
  let readyResolve:(()=>void)|undefined,readyReject:((error:Error)=>void)|undefined;
  function callback<T>(fn:((value:T)=>void)|undefined,value:T){try{fn?.(value);}catch{/* Application callbacks cannot change transport authority. */}}
  function setStatus(next:ClientStatus){status=next;callback(options.onStatus,next);}
  function clearView(){viewRaw=undefined;callback(options.onView,null);}
  function clearDeadline(){if(deadline)clearTimeout(deadline);deadline=undefined;}
  function clearNetwork() {
    generation++;controller?.abort();controller=undefined;clearDeadline();
    if(retryTimer)clearTimeout(retryTimer);if(stableTimer)clearTimeout(stableTimer);retryTimer=undefined;stableTimer=undefined;
    const old=socket;socket=undefined;ticket=undefined;gotReady=false;sequence=0;try{old?.close();}catch{/* Already closed. */}
  }
  function terminal(next:'closed'|'auth_expired'|'forbidden'|'upgrade_required') {
    running=false;clearNetwork();clearView();setStatus(next);const error=new MatchClientError(next);readyReject?.(error);readyResolve=undefined;readyReject=undefined;pending?.reject(error);
  }
  function retry(delay=0) {
    if(disposed||!running)return;
    clearNetwork();const owned=generation;clearView();if(disposed||!running||owned!==generation)return;
    if(++attempts>maxAttempts){terminal('closed');return;}setStatus('reconnecting');if(disposed||!running||owned!==generation)return;
    // Presentation/network jitter only; never used for authoritative game randomness.
    const backoff=Math.min(5000,retryBaseMs*2**(attempts-1));
    retryTimer=setTimeout(()=>{retryTimer=undefined;void dial();},Math.max(delay,backoff/2+Math.random()*backoff/2));
  }
  function send(raw:string):boolean {
    if(!socket||socket.readyState!==1||socket.bufferedAmount+new TextEncoder().encode(raw).byteLength>MAX_FRAME_BYTES*2){retry();return false;}
    try{socket.send(raw);return true;}catch{retry();return false;}
  }
  function commandDeadline(){clearDeadline();deadline=setTimeout(()=>retry(),timeoutMs);}
  function transmit() {
    if(!pending||!gotReady||!running)return;
    if(++pending.attempts>maxAttempts){terminal('closed');return;}
    pending.sentOn=generation;setStatus('resyncing');if(send(pending.raw))commandDeadline();
  }
  function transient(delay:number) {
    clearDeadline();if(retryTimer)clearTimeout(retryTimer);const owned=generation;setStatus('rate_limited');
    if(disposed||!running||owned!==generation)return;
    retryTimer=setTimeout(()=>{retryTimer=undefined;transmit();},delay+Math.random()*Math.min(250,retryBaseMs));
  }
  async function body(response:Response):Promise<unknown> {
    if(!response.body)throw new MatchClientError('unavailable');const reader=response.body.getReader(),decoder=new TextDecoder('utf-8',{fatal:true});let raw='',bytes=0;
    try{while(true){const chunk=await reader.read();if(chunk.done)break;bytes+=chunk.value.byteLength;if(bytes>MAX_FRAME_BYTES){await reader.cancel();throw new MatchClientError('unavailable');}raw+=decoder.decode(chunk.value,{stream:true});}return JSON.parse(raw+decoder.decode());}
    finally{reader.releaseLock();}
  }
  function origin() {
    const value=typeof options.endpoint==='function'?options.endpoint():options.endpoint,url=new URL(value);
    if(url.origin!==value||!['https:','http:'].includes(url.protocol)||url.protocol==='http:'&&!['localhost','127.0.0.1','[::1]'].includes(url.hostname))throw new MatchClientError('invalid_request');return url;
  }
  function receive(data:unknown,owned:number) {
    if(owned!==generation||!running||!ticket)return;
    try {
      const frame=decodeLiveServerFrame(data);
      if(frame.matchId!==options.matchId||frame.releaseId!==ticket.releaseId||frame.sequence!==sequence+1)throw new Error();sequence=frame.sequence;
      if(frame.type==='ready') {
        if(gotReady||frame.playerId!==boundActor||frame.correlationId!==authenticationId)throw new Error();gotReady=true;return;
      }
      if(!gotReady)throw new Error();
      if(frame.type==='snapshot') {
        if(frame.payload.viewer.kind!=='participant'||frame.payload.viewer.playerId!==boundActor||frame.stateVersion<requiredVersion||pending&&frame.stateVersion<pending.command.expectedStateVersion)throw new Error();
        const alreadySent=pending?.sentOn===generation;
        requiredVersion=frame.stateVersion;viewRaw=encodeViewerProjection(frame.payload);if(!alreadySent)clearDeadline();
        setStatus(pending?'resyncing':'ready');if(owned!==generation||!running)return;callback(options.onView,decodeViewerProjection(viewRaw));
        if(owned!==generation||!running)return;
        readyResolve?.();readyResolve=undefined;readyReject=undefined;
        if(!stableTimer)stableTimer=setTimeout(()=>{attempts=0;stableTimer=undefined;},stableMs);
        if(pending&&!alreadySent)transmit();return;
      }
      if(frame.type==='control') {
        if(frame.outcome==='auth_expired'){terminal('auth_expired');return;}
        if(frame.outcome==='maintenance'){retry(frame.retryAfterMs);return;}
        if(pending)transient(frame.retryAfterMs);return;
      }
      if(!pending||frame.commandId!==pending.command.commandId||frame.correlationId!==pending.command.correlationId)throw new Error();
      clearDeadline();const notify=()=>callback(options.onReceipt,JSON.parse(JSON.stringify(frame)) as LiveReceipt);
      if(frame.outcome==='accepted'||frame.outcome==='rejected'||frame.outcome==='stale') {
        const result=pending;pending=undefined;requiredVersion=Math.max(requiredVersion,frame.stateVersion);setStatus('resyncing');result.resolve(frame);notify();return;
      }
      if(frame.outcome==='auth_expired'){terminal('auth_expired');notify();return;}
      if(frame.outcome==='unsupported_version'){terminal('upgrade_required');notify();return;}
      if(frame.outcome==='rate_limited')transient(frame.retryAfterMs);else retry(frame.retryAfterMs);notify();
    }catch{retry();}
  }
  let authenticationId='';
  async function dial() {
    if(!running||disposed)return;const owned=generation,ownedController=new AbortController();controller=ownedController;const signal=ownedController.signal;
    let httpTimer:ReturnType<typeof setTimeout>|undefined;
    try {
      const endpoint=origin(),request=parseTicketRequest({requestId:globalThis.crypto.randomUUID(),matchId:options.matchId,clientReleaseId:options.clientReleaseId,supportedProtocol:{min:2,max:2}});
      const operation=(async()=>{const response=await fetcher(new URL('/play/ticket',endpoint).href,{method:'POST',credentials:'include',cache:'no-store',referrerPolicy:'no-referrer',headers:{'Content-Type':'application/json'},body:JSON.stringify(request),signal});return {response,value:await body(response)};})();
      const {response,value}=await Promise.race([operation,new Promise<never>((_resolve,reject)=>{httpTimer=setTimeout(()=>{ownedController.abort();reject(new MatchClientError('unavailable'));},timeoutMs);})]);
      if(httpTimer)clearTimeout(httpTimer);if(owned!==generation||!running)return;
      if(response.status===401||response.status===403){terminal(response.status===401?'auth_expired':'forbidden');return;}
      if(response.status===409){terminal('upgrade_required');return;}
      if(!response.ok){let delay=1000;if(value&&typeof value==='object'&&'retryAfterMs'in value&&typeof value.retryAfterMs==='number'&&Number.isSafeInteger(value.retryAfterMs))delay=Math.max(1,Math.min(60000,value.retryAfterMs));retry(delay);return;}
      const grant=parseTicketResponse(value,request);if(grant.expiresAt<=Date.now()||grant.sessionExpiresAt<=Date.now())throw new Error();
      if(boundActor&&boundActor!==grant.playerId){terminal('auth_expired');return;}boundActor=grant.playerId;ticket=grant;
      const url=new URL('/play',endpoint);url.protocol=endpoint.protocol==='https:'?'wss:':'ws:';const ws=socketFactory(url.href);socket=ws;
      authenticationId=globalThis.crypto.randomUUID();
      ws.addEventListener('open',()=>{if(owned!==generation)return;send(JSON.stringify({type:'authenticate',protocolVersion:2,requestId:authenticationId,ticket:grant.ticket}));});
      ws.addEventListener('message',event=>receive((event as MessageEvent).data,owned));
      ws.addEventListener('close',event=>{if(owned!==generation||!running)return;const code=(event as CloseEvent).code;if(code===4401)terminal('auth_expired');else if(code===4409)terminal('upgrade_required');else if(code===1008)terminal('closed');else retry();});
      ws.addEventListener('error',()=>{if(owned===generation&&running)retry();});
      commandDeadline();
    }catch{if(owned===generation&&running)retry();}finally{if(httpTimer)clearTimeout(httpTimer);}
  }
  if(options.restorePending!==undefined) {
    const restored=parseClientPending(options.restorePending);if(restored.command.matchId!==options.matchId)throw new MatchClientError('invalid_request');
    const command=parseLiveCommand(JSON.parse(JSON.stringify(restored.command)));boundActor=restored.actorId;
    pending={actorId:restored.actorId,command,raw:JSON.stringify(command),attempts:0,resolve:()=>{},reject:()=>{}};
  }
  function resume():Promise<void> {
    if(disposed)return Promise.reject(new MatchClientError('closed'));readyReject?.(new MatchClientError('suspended'));readyResolve=undefined;readyReject=undefined;clearNetwork();const owned=generation;clearView();if(disposed||owned!==generation)return Promise.reject(new MatchClientError(disposed?'closed':'suspended'));running=true;attempts=0;if(pending)pending.attempts=0;
    const ready=new Promise<void>((resolve,reject)=>{readyResolve=resolve;readyReject=reject;});setStatus('connecting');if(running&&!disposed)void dial();return ready;
  }
  return {
    get status(){return status;},get view():ViewerProjection|null{return viewRaw?decodeViewerProjection(viewRaw):null;},
    connect:resume,resume,
    async submit(intent:LiveIntent):Promise<LiveReceipt> {
      if(!running||status!=='ready'||!viewRaw||pending||!boundActor)throw new MatchClientError('busy');
      let command:LiveCommand;
      try{const candidate=parseLiveCommand({type:'command',protocolVersion:2,matchId:options.matchId,commandId:globalThis.crypto.randomUUID(),correlationId:globalThis.crypto.randomUUID(),expectedStateVersion:requiredVersion,intent});const frame=decodeLiveClientFrame(JSON.stringify(candidate));if(frame.type!=='command')throw new Error();command=frame;}
      catch{throw new MatchClientError('invalid_request');}
      return new Promise<LiveReceipt>((resolve,reject)=>{pending={actorId:boundActor!,command,raw:JSON.stringify(command),attempts:0,resolve,reject};transmit();});
    },
    exportPending():ClientPending|null{return pending?parseClientPending({schemaVersion:1,actorId:pending.actorId,command:JSON.parse(pending.raw)}):null;},
    suspend(){running=false;clearNetwork();clearView();if(disposed)return;setStatus('suspended');readyReject?.(new MatchClientError('suspended'));readyResolve=undefined;readyReject=undefined;},
    close(){if(disposed)return;disposed=true;terminal('closed');},
  };
}
