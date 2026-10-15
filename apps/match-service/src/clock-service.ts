import {createHash} from 'node:crypto';
import {parseClockProjection} from '@lorcana/contracts/clocks';
import type {ClockProjection,EngineClockState} from '@lorcana/contracts/clocks';
import {MatchStoreError} from '@lorcana/db';
import type {ClockRepository,ClockAuditRequest,StoredMatch,CommitCandidate,ClockReservation,ClockControlResult,ReceiptResult} from '@lorcana/db';
import type {ServerStatus,ClockControl} from '@lorcana/engine-adapter';
import type {EngineExecutor,EngineResult} from './engine-executor.ts';
import {createProjectionCache} from './projection-cache.ts';
import {createClockHealth} from './clock-health.ts';
import type {ClockHealth} from './clock-health.ts';
import {canonical,closed,identifier,unsigned} from './validation.ts';
import type {Submission} from './validation.ts';
import {MatchServiceError} from './errors.ts';

export type RecoveryAuthority=(request:ClockAuditRequest)=>Promise<string|null>;
export function createClockService(options:{repository:ClockRepository;executor:EngineExecutor;pins:(match:StoredMatch)=>void;health?:ClockHealth;recoveryAuthority?:RecoveryAuthority}) {
  const repository=options.repository,executor=options.executor,health=options.health??createClockHealth();
  const proofs=createProjectionCache({maxBytes:1024*1024,maxPending:16}),known=new Map<string,symbol>(),probes=new Map<string,{utc:number;revision:number}>();
  let stopped=false,pendingCreations=0;
  function available(){if(stopped)throw new MatchServiceError('UNAVAILABLE');}
  function failure(error:unknown):never{if(error instanceof MatchServiceError)throw error;if(error instanceof MatchStoreError)throw new MatchServiceError(error.code);throw new MatchServiceError('UNAVAILABLE');}
  function remember(matchId:string){if(!known.has(matchId)&&known.size+pendingCreations>=128)throw new MatchServiceError('UNAVAILABLE');probes.delete(matchId);known.set(matchId,Symbol());}
  async function pruneContinuity(){
    const enrolled=[...known],observed=[...probes],ids=[...new Set([...enrolled.map(([id])=>id),...observed.map(([id])=>id)])];
    if(!ids.length)return;
    const active=new Set(await repository.activeClockIds(ids));
    // Delete only the generations sampled before this asynchronous read. A
    // concurrent audited resume/new enrollment must not lose its new witness.
    for(const [id,token]of enrolled)if(!active.has(id)&&known.get(id)===token)known.delete(id);
    for(const [id,probe]of observed)if(!active.has(id)&&probes.get(id)===probe)probes.delete(id);
  }
  async function prepareCreation(matchId:string,audited=false):Promise<(created:boolean)=>void>{
    available();
    if(!audited&&!(await health.sample(()=>repository.sample())).healthy)throw new MatchServiceError('UNAVAILABLE');
    await pruneContinuity();available();
    if(known.has(matchId))return ()=>{};
    if(known.size+pendingCreations>=128)throw new MatchServiceError('UNAVAILABLE');
    pendingCreations++;let released=false;
    return created=>{if(released)return;released=true;pendingCreations--;if(created&&!stopped)remember(matchId);};
  }
  async function verify(match:StoredMatch):Promise<EngineClockState>{
    options.pins(match);const c=match.clock;if(!c||match.protocolVersion!==3)throw new MatchServiceError('UNAVAILABLE');
    const key=createHash('sha256').update(canonical({matchId:match.matchId,checkpoint:match.checkpoint,releaseId:match.releaseId,engineIdentity:match.engineIdentity,rulesVersion:match.rulesVersion,catalogRevision:match.catalogRevision,formatRevision:match.formatRevision,stateVersion:match.stateVersion,ended:match.ended,winner:match.winner})).digest('hex');
    const raw=await proofs.get(key,async()=>{
      const result=await executor.execute({kind:'clock-inspect',matchId:match.matchId,checkpoint:match.checkpoint});
      if(result.checkpoint.archive!==match.checkpoint.archive||result.checkpoint.digest!==match.checkpoint.digest)throw new Error();
      return JSON.stringify({clock:result.clock,status:result.status});
    });
    const result=JSON.parse(raw) as {clock:EngineClockState|null;status:ServerStatus},native=result.clock;
    if(!native||result.status.revision!==match.stateVersion||result.status.ended!==match.ended||result.status.winner!==match.winner||result.status.rewardEligible!==false||canonical(native.policy)!==canonical(c.policy)||native.startedAtMs!==c.engineTimestamp||native.activePlayerId!==c.activePlayerId||native.players.length!==2||native.players.some(p=>!match.players.includes(p.playerId)||p.remainingMs!==c.remainingMs[p.playerId])||new Set(native.players.map(p=>p.playerId)).size!==2)throw new MatchServiceError('UNAVAILABLE');
    if(c.status==='running'&&!native.running||c.status==='ended'&&!match.ended||match.ended&&c.status!=='ended')throw new MatchServiceError('UNAVAILABLE');
    if(c.deadlineUtcMs!==null&&c.deadlineUtcMs!==c.anchorUtcMs+Math.max(0,c.remainingMs[c.activePlayerId!]!))throw new MatchServiceError('UNAVAILABLE');
    if(c.status==='processing'&&(match.clockChargeUntilMs===undefined||match.clockChargeUntilMs<c.anchorUtcMs))throw new MatchServiceError('UNAVAILABLE');
    return native;
  }
  async function continuous(match:StoredMatch,utc:number):Promise<boolean>{
    if(known.has(match.matchId))return true;
    const c=match.clock!;if(['paused','ended'].includes(c.status))return false;
    const prior=probes.get(match.matchId);
    if(prior&&(c.lastHealthyUtcMs>prior.utc||c.revision>prior.revision)){remember(match.matchId);return true;}
    if(utc-c.lastHealthyUtcMs>health.maxGapMs||prior&&utc-prior.utc>=health.maxGapMs){await repository.unsafePause(match.matchId,c.revision,'recovery');probes.delete(match.matchId);return false;}
    if(!prior){if(probes.size>=128)throw new MatchServiceError('UNAVAILABLE');probes.set(match.matchId,{utc,revision:c.revision});}
    return false;
  }
  function candidate(result:EngineResult,reservation:ClockReservation):CommitCandidate {
    if(result.status.rewardEligible!==false||!result.clock)throw new MatchServiceError('UNAVAILABLE');
    return {stateVersion:result.status.revision,lastTimestamp:reservation.engineTimestamp,checkpoint:result.checkpoint,ended:result.status.ended,winner:result.status.winner};
  }
  async function project(match:StoredMatch):Promise<ClockProjection>{
    await verify(match);const c=match.clock!,reading=await health.sample(()=>repository.sample());
    if(!reading.healthy&&!['paused','ended'].includes(c.status))throw new MatchServiceError('UNAVAILABLE');
    const until=c.status==='running'?reading.utcMs:c.status==='processing'?match.clockChargeUntilMs!:c.status==='paused'?c.lastHealthyUtcMs:c.anchorUtcMs;
    const elapsed=Math.max(0,until-c.anchorUtcMs);
    if(c.status==='ended')known.delete(match.matchId);
    return parseClockProjection({schemaVersion:1,policyId:c.policy.id,stateVersion:match.stateVersion,clockRevision:c.revision,status:c.status,serverNowMs:reading.utcMs,deadlineMs:c.status==='running'?c.deadlineUtcMs:null,activePlayerId:c.status==='ended'?null:c.activePlayerId,players:match.players.map(playerId=>({playerId,remainingMs:Math.max(0,Math.min(c.policy.reserveCapMs,c.remainingMs[playerId]!-(playerId===c.activePlayerId?elapsed:0)))})),pauseReason:c.status==='paused'?c.pauseReason:null});
  }
  async function submit(command:Submission,references:boolean):Promise<ReceiptResult>{
    available();let owned:ClockReservation|undefined;
    try{
      const before=await repository.load(command.matchId,command.actorId);if(!before)throw new MatchServiceError('FORBIDDEN');options.pins(before);
      if(command.expectedVersion!==before.stateVersion)return await repository.commit(command,before,null,{outcome:'stale',reason:'stale_state'});
      const reading=await health.sample(()=>repository.sample());
      if(!reading.healthy)throw new MatchServiceError('UNAVAILABLE');
      if(!await continuous(before,reading.utcMs))throw new MatchServiceError('UNAVAILABLE');
      const admission=await repository.reservePlayer(command);
      if(admission.kind==='duplicate')return admission.result;
      if(admission.kind==='rejected')return admission.result;
      if(admission.kind==='busy')throw new MatchServiceError('BUSY');
      if(admission.kind==='expired'){const receipt=await repository.findReceipt(command);if(!receipt)throw new Error();return {receipt,duplicate:false};}
      if(admission.kind==='stale')return await repository.commit(command,before,null,{outcome:'stale',reason:'stale_state'});
      if(admission.kind!=='reserved')throw new MatchServiceError('UNAVAILABLE');
      owned=admission.reservation;
      // Reserve before any proof-cache miss can queue a full engine replay.
      const native=await verify(admission.before);
      if(command.actorId!==native.activePlayerId&&command.move!=='concede'){const rejected=await repository.reject(owned,command);owned=undefined;return rejected;}
      const result=await executor.execute({kind:'transition',references,matchId:command.matchId,checkpoint:admission.before.checkpoint,command:{actor:command.actorId,expectedRevision:command.expectedVersion,timestamp:owned.engineTimestamp,commandId:command.commandId,move:command.move,input:command.input}});
      const after=await health.sample(()=>repository.sample());if(!after.healthy)throw new MatchServiceError('UNAVAILABLE');
      if(!result.result?.accepted){const rejected=await repository.reject(owned,command);owned=undefined;return rejected;}
      if(result.status.revision!==command.expectedVersion+1||!result.clock)throw new MatchServiceError('UNAVAILABLE');
      const committed=await repository.commitPlayer(owned,command,candidate(result,owned),result.clock);owned=undefined;if(result.status.ended)known.delete(command.matchId);return committed;
    }catch(error){if(owned)await repository.unsafePause(owned.matchId,owned.expectedClockRevision+1,'recovery').catch(()=>{});return failure(error);}
  }
  async function timeout(matchId:string,expectedStateVersion:number,expectedClockRevision:number):Promise<void>{
    available();let owned:ClockReservation|undefined;
    try{
      const match=await repository.loadSystem(matchId);if(!match||!match.clock||match.ended||match.clock.status==='paused')return;
      options.pins(match);const reading=await health.sample(()=>repository.sample());
      if(!reading.healthy)return;
      if(!await continuous(match,reading.utcMs))return;
      const admission=await repository.reserveTimeout(matchId,expectedStateVersion,expectedClockRevision);if(admission.kind!=='reserved')return;
      owned=admission.reservation;await verify(admission.before);
      const result=await executor.execute({kind:'timeout',matchId,checkpoint:admission.before.checkpoint,timestamp:owned.engineTimestamp,commandId:'clock-timeout-'+owned.expectedStateVersion+'-'+owned.expectedClockRevision});
      const after=await health.sample(()=>repository.sample());if(!after.healthy)throw new Error();
      if(!result.clock)throw new Error();
      if(result.result?.accepted){await repository.commitTimeout(owned,candidate(result,owned),result.clock);if(result.status.ended)known.delete(matchId);}
      else if(result.result?.code==='NO_LEGAL_DEFAULT')await repository.commitControl(owned,candidate(result,owned),result.clock);
      else throw new Error();
      owned=undefined;
    }catch(error){if(owned)await repository.unsafePause(owned.matchId,owned.expectedClockRevision+1,'recovery').catch(()=>{});return failure(error);}
  }
  function parseRecovery(kind:'pause'|'resume',value:unknown):ClockAuditRequest {
    try{
      const r=closed(value,kind==='pause'?['matchId','expectedStateVersion','expectedClockRevision','operationId','auditId','reason']:['matchId','expectedStateVersion','expectedClockRevision','operationId','auditId','reset']);
      const request:ClockAuditRequest={kind,matchId:identifier(r.matchId),expectedStateVersion:unsigned(r.expectedStateVersion),expectedClockRevision:unsigned(r.expectedClockRevision),operationId:identifier(r.operationId),auditId:identifier(r.auditId)};
      if(kind==='pause'){if(r.reason!==undefined&&!['recovery','time_unreliable','no_legal_default'].includes(String(r.reason)))throw new Error();request.reason=r.reason as ClockAuditRequest['reason']??'recovery';}
      if(kind==='resume'&&r.reset!==undefined){const reset=closed(r.reset,['playerId','remainingMs']);request.reset={playerId:identifier(reset.playerId),remainingMs:unsigned(reset.remainingMs)};if(request.reset.remainingMs>3_600_000)throw new Error();}
      return request;
    }catch{throw new MatchServiceError('INVALID_REQUEST');}
  }
  async function control(kind:'pause'|'resume',value:unknown):Promise<ClockControlResult>{
    available();const request=parseRecovery(kind,value);let owned:ClockReservation|undefined,finishEnrollment:((created:boolean)=>void)|undefined;
    try{
      const auditor=await options.recoveryAuthority?.(request);if(!auditor||auditor!==request.auditId)throw new MatchServiceError('FORBIDDEN');
      const before=await repository.loadSystem(request.matchId);if(!before)throw new MatchServiceError('FORBIDDEN');await verify(before);
      if(request.reset&&(!before.players.includes(request.reset.playerId)||request.reset.remainingMs>before.clock!.policy.reserveCapMs))throw new MatchServiceError('INVALID_REQUEST');
      const admission=await repository.reserveControl(request);
      if(admission.kind==='duplicate'&&admission.result.clockRevision!==undefined)return {...admission.result,clockRevision:admission.result.clockRevision};
      if(admission.kind!=='reserved')throw new MatchServiceError('UNAVAILABLE');owned=admission.reservation;
      if(kind==='resume'){finishEnrollment=await prepareCreation(before.matchId,true);health.reset();}
      const reading=await health.sample(()=>repository.sample());if(!reading.healthy)throw new MatchServiceError('UNAVAILABLE');
      const controls:ClockControl[]=[{kind:'pause',timestamp:owned.engineTimestamp,reason:'SERVER_RECOVERY'}];
      if(request.reset)controls.push({kind:'reset',timestamp:owned.engineTimestamp,...request.reset});
      if(kind==='resume')controls.push({kind:'resume',timestamp:owned.engineTimestamp});
      const result=await executor.execute({kind:'clock-control',matchId:before.matchId,checkpoint:admission.before.checkpoint,controls});if(!result.clock)throw new Error();
      const committed=await repository.commitControl(owned,candidate(result,owned),result.clock,request);owned=undefined;if(kind==='resume')finishEnrollment?.(true);else {known.delete(before.matchId);probes.delete(before.matchId);}return committed;
    }catch(error){if(owned)await repository.abort(owned).catch(()=>{});return failure(error);}finally{finishEnrollment?.(false);}
  }
  let ticking:Promise<void>|undefined;
  async function tick(batchSize=32):Promise<void>{
    available();if(ticking)return ticking;
    const work=(async()=>{
      const reading=await health.sample(()=>repository.sample());
      // A process-local gap/error quarantines this actor. It does not prove
      // shared outage while another actor may still be heartbeating normally.
      // Healthy actors fence actual shared gaps/dead leases in the repository.
      if(!reading.healthy)return;
      await pruneContinuity();
      for(const id of await repository.scan(batchSize)){
        if(stopped)break;
        try{
          const match=await repository.loadSystem(id);if(!match?.clock||match.ended)continue;options.pins(match);
          if(!await continuous(match,reading.utcMs))continue;
          await verify(match);
          if(match.clock.status==='processing'||match.clock.deadlineUtcMs!==null&&reading.utcMs>=match.clock.deadlineUtcMs)await timeout(id,match.stateVersion,match.clock.revision);
          else await repository.heartbeat(id,match.clock.revision);
        }catch{/* Unsupported pins and unavailable storage never adjudicate a winner. */}
      }
    })();ticking=work;try{await work;}finally{if(ticking===work)ticking=undefined;}
  }
  return {
    project,submit,timeout,tick,prepareCreation,
    recordCreated(matchId:string){available();remember(matchId);},
    async read(actor:unknown,value:unknown){try{available();const r=closed(value,['matchId']),match=await repository.load(identifier(r.matchId),identifier(actor));if(!match)throw new MatchServiceError('FORBIDDEN');return await project(match);}catch(error){return failure(error);}},
    pause(value:unknown){return control('pause',value);},resume(value:unknown){return control('resume',value);},
    async close(){stopped=true;try{await ticking;}finally{proofs.close();known.clear();probes.clear();}},
  };
}
export type ClockService=ReturnType<typeof createClockService>;
