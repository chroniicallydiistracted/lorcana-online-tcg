import pg from 'pg';
import {createHash,randomUUID} from 'node:crypto';
import {connection,workspaceRoot} from './config.ts';
import type {Target} from './policy.ts';
import {createMatchRepository,MatchStoreError,selectMatchSql,decodeMatchRow,commitMatchOnClient} from './match-store.ts';
import type {MatchRepository,StoredMatch,DurableCommand,CommitCandidate,ReceiptResult,DurableReceipt} from './match-store.ts';
import {clockInteger,sampleDatabaseUtc,decodeStoredClock} from './clock-types.ts';
import type {StoredClock,ClockReservation} from './clock-types.ts';
import type {EngineClockState,ClockProjection} from '@lorcana/contracts/clocks';

export interface ClockAuditRequest {kind:'pause'|'resume';matchId:string;expectedStateVersion:number;expectedClockRevision:number;operationId:string;auditId:string;reason?:ClockProjection['pauseReason'];reset?:{playerId:string;remainingMs:number}}
export type ClockControlResult=ReceiptResult&{clockRevision:number};
export interface WaitingConcessionEvaluation {before:StoredMatch;sampledAtMs:number;engineTimestamp:number}
export type ReserveResult={kind:'reserved';reservation:ClockReservation;before:StoredMatch}|{kind:'waiting';evaluation:WaitingConcessionEvaluation}|{kind:'duplicate';result:ReceiptResult&{clockRevision?:number}}|{kind:'rejected';result:ReceiptResult}|{kind:'busy'|'stale'|'paused'|'expired'};
export interface ClockRepository extends MatchRepository {
  sample():Promise<number>;
  createTimed(value:StoredMatch):Promise<{match:StoredMatch;created:boolean}>;
  reservePlayer(command:DurableCommand&{move:string}):Promise<ReserveResult>;
  reserveTimeout(matchId:string,expectedStateVersion:number,expectedClockRevision:number):Promise<ReserveResult>;
  commitPlayer(reservation:ClockReservation,command:DurableCommand,candidate:CommitCandidate,clock:EngineClockState):Promise<ReceiptResult>;
  commitWaitingConcession(evaluation:WaitingConcessionEvaluation,command:DurableCommand&{move:string},candidate:CommitCandidate|null,clock?:EngineClockState):Promise<ReceiptResult>;
  commitTimeout(reservation:ClockReservation,candidate:CommitCandidate,clock:EngineClockState):Promise<ReceiptResult>;
  abort(reservation:ClockReservation):Promise<void>;
  reject(reservation:ClockReservation,command:DurableCommand):Promise<ReceiptResult>;
  loadSystem(matchId:string):Promise<StoredMatch|undefined>;
  scan(limit:number):Promise<string[]>;
  activeClockIds(matchIds:readonly string[]):Promise<string[]>;
  heartbeat(matchId:string,expectedClockRevision:number):Promise<void>;
  unsafePause(matchId:string,expectedClockRevision:number,reason:'recovery'|'time_unreliable'):Promise<void>;
  reserveControl(request:ClockAuditRequest):Promise<ReserveResult>;
  commitControl(reservation:ClockReservation,candidate:CommitCandidate,clock:EngineClockState,request?:ClockAuditRequest):Promise<ClockControlResult>;
}
export function systemClockActor(players:readonly string[]):string {let actor='system-clock';while(players.includes(actor))actor+='-';return actor;}
export function createClockRepository(target:Target,root=workspaceRoot,options:{leaseMs?:number;maxHealthyGapMs?:number;sampleForTest?:(c:pg.PoolClient)=>Promise<number>}={}):ClockRepository {
  if(options.sampleForTest&&target!=='test')throw new Error('Clock test sampling requires test target');
  const leaseMs=clockInteger(options.leaseMs??15000,1,30000),maxGap=clockInteger(options.maxHealthyGapMs??15000,1,60000);
  const base=createMatchRepository(target,root,options.sampleForTest),pool=new pg.Pool({...connection(target,'match',root),max:4,idleTimeoutMillis:1000});
  let stopped=false,scanAfter='';
  const sample=async(c:pg.PoolClient)=>clockInteger(await (options.sampleForTest??sampleDatabaseUtc)(c));
  async function transaction<T>(work:(c:pg.PoolClient)=>Promise<T>):Promise<T>{
    if(stopped)throw new MatchStoreError('UNAVAILABLE');const c=await pool.connect();
    try{await c.query('BEGIN');const value=await work(c);await c.query('COMMIT');return value;}
    catch(error){await c.query('ROLLBACK').catch(()=>{});throw error instanceof MatchStoreError?error:new MatchStoreError('UNAVAILABLE');}finally{c.release();}
  }
  async function locked(c:pg.PoolClient,matchId:string,actor?:string):Promise<{match:StoredMatch;reservation:ClockReservation|null}>{
    const row=await c.query(selectMatchSql+' WHERE m.match_id=$1'+(actor===undefined?'':' AND ($2=m.player_one OR $2=m.player_two)')+' FOR UPDATE OF m',actor===undefined?[matchId]:[matchId,actor]);
    if(!row.rows[0])throw new MatchStoreError('FORBIDDEN');
    const k=await c.query('SELECT reservation FROM match.clocks WHERE match_id=$1 FOR UPDATE',[matchId]);
    // READ COMMITTED takes the first statement's snapshot before a possible
    // lock wait. A competing clock-only writer need not update the match row,
    // so its subquery values can be stale even after we acquire that row lock.
    // Read a fresh snapshot with both locks held before making any decision.
    const current=await c.query(selectMatchSql+' WHERE m.match_id=$1',[matchId]);
    const match=decodeMatchRow(current.rows[0]);
    if(!match.clock||match.protocolVersion!==4||!k.rows[0])throw new MatchStoreError('UNAVAILABLE');
    return {match,reservation:k.rows[0].reservation as ClockReservation|null};
  }
  async function event(c:pg.PoolClient,match:StoredMatch,clock:StoredClock,kind:string,id:string,now:number,auditId:string|null=null,reason:string|null=null){
    await c.query('INSERT INTO match.clock_events(match_id,clock_revision,state_version,operation_id,kind,checkpoint_digest,authority_at_ms,audit_id,reason) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9)',[match.matchId,clock.revision,clock.stateVersion,id,kind,clock.checkpointDigest,now,auditId,reason]);
    await c.query("SELECT pg_notify('lorcana_match_changed',$1)",[match.matchId]);
  }
  async function write(c:pg.PoolClient,match:StoredMatch,clock:StoredClock,reservation:ClockReservation|null){
    decodeStoredClock(clock,match.players,clock.stateVersion,clock.checkpointDigest);
    await c.query('UPDATE match.clocks SET state=$2::jsonb,reservation=$3::jsonb WHERE match_id=$1',[match.matchId,JSON.stringify(clock),reservation?JSON.stringify(reservation):null]);
  }
  async function pauseUnsafe(c:pg.PoolClient,match:StoredMatch,at:number,reason:'recovery'|'time_unreliable'){
    const clock={...match.clock!,revision:match.clock!.revision+1,status:'paused' as const,deadlineUtcMs:null,pauseReason:reason,lastHealthyUtcMs:Math.max(match.clock!.anchorUtcMs,Math.min(match.clock!.lastHealthyUtcMs,match.clockChargeUntilMs??match.clock!.lastHealthyUtcMs))};
    // Preserve the last engine checkpoint/healthy boundary. Recovery settles its
    // trustworthy pending interval before resuming; the outage itself is never charged.
    await write(c,match,clock,null);await event(c,match,clock,'paused','system-pause-'+clock.revision,at,systemClockActor(match.players),reason);
  }
  async function reserve(c:pg.PoolClient,kind:'player'|'timeout',matchId:string,version:number,clockRevision?:number,command?:DurableCommand&{move:string}):Promise<ReserveResult>{
    const {match,reservation}=await locked(c,matchId,command?.actorId),clock=match.clock!,now=await sample(c);
    if(command){
      const prior=await c.query('SELECT c.*,m.release_id FROM match.command_receipts c JOIN match.matches m USING(match_id) WHERE c.match_id=$1 AND c.actor_id=$2 AND c.command_id=$3',[matchId,command.actorId,command.commandId]);
      if(prior.rows[0]){
        if(prior.rows[0].intent_hash!==command.intentHash)throw new MatchStoreError('ID_CONFLICT');
        const r=prior.rows[0];return {kind:'duplicate',result:{duplicate:true,receipt:{matchId,actorId:r.actor_id,commandId:r.command_id,intentHash:r.intent_hash,releaseId:match.releaseId,outcome:r.outcome,reason:r.reason,stateVersion:clockInteger(r.state_version)}}};
      }
    }
    // The service supplies a validated move. Refuse waiting-player actions
    // against the current locked row, without a lease, proof replay or clock
    // mutation. Waiting concessions are evaluated without a timed lease too.
    if(command&&command.actorId!==clock.activePlayerId&&command.move!=='concede'){
      if(match.stateVersion!==version||match.ended)return {kind:'stale'};
      return {kind:'rejected',result:await commitMatchOnClient(c,command,match,null,{outcome:'rejected',reason:'invalid_intent'})};
    }
    if(clock.status==='paused')return {kind:'paused'};
    if(reservation){
      if(now>=clockInteger(reservation.expiresAtMs)){await pauseUnsafe(c,match,now,'recovery');return {kind:'paused'};}
      return {kind:'busy'};
    }
    if(match.stateVersion!==version||clockRevision!==undefined&&clock.revision!==clockRevision||match.ended)return {kind:'stale'};
    if(now<clock.anchorUtcMs||now<clock.lastHealthyUtcMs){await pauseUnsafe(c,match,now,'time_unreliable');return {kind:'paused'};}
    if(now-clock.lastHealthyUtcMs>maxGap){await pauseUnsafe(c,match,now,'recovery');return {kind:'paused'};}
    const waitingConcession=command?.move==='concede'&&command.actorId!==clock.activePlayerId;
    if(waitingConcession)return {kind:'waiting',evaluation:{before:match,sampledAtMs:now,engineTimestamp:clockInteger(clock.engineTimestamp+now-clock.anchorUtcMs)}};
    if(kind==='player'&&command?.move!=='concede'&&now>=clock.deadlineUtcMs!){
      if(command)await commitMatchOnClient(c,command,match,null,{outcome:'rejected',reason:'clock_expired'});
      return {kind:'expired'};
    }
    if(kind==='timeout'&&now<clock.deadlineUtcMs!)return {kind:'stale'};
    const owned:ClockReservation={id:randomUUID(),matchId,kind,admittedAtMs:now,expiresAtMs:clockInteger(now+leaseMs),expectedStateVersion:version,expectedClockRevision:clock.revision,engineTimestamp:clockInteger(clock.engineTimestamp+now-clock.anchorUtcMs),...(command?{actorId:command.actorId,commandId:command.commandId,intentHash:command.intentHash}:{})};
    const next={...clock,revision:clock.revision+1,status:'processing' as const};
    await write(c,match,next,owned);await event(c,match,next,'processing',owned.id,now);
    return {kind:'reserved',reservation:owned,before:match};
  }
  function timeoutCommand(reservation:ClockReservation,match:StoredMatch):DurableCommand {
    const actorId=systemClockActor(match.players),commandId='clock-timeout-'+reservation.expectedStateVersion+'-'+reservation.expectedClockRevision;
    const intent=JSON.stringify({profile:'system-clock-timeout-v2',matchId:match.matchId,expectedVersion:reservation.expectedStateVersion,clockRevision:reservation.expectedClockRevision,policyId:match.clock!.policy.id});
    return {matchId:match.matchId,actorId,commandId,expectedVersion:reservation.expectedStateVersion,intent,intentHash:createHash('sha256').update('system-clock-timeout-v2\0').update(intent).digest('hex')};
  }
  function auditCommand(request:ClockAuditRequest,match:StoredMatch):DurableCommand {
    const intent=JSON.stringify({profile:'system-clock-control-v1',kind:request.kind,matchId:request.matchId,expectedStateVersion:request.expectedStateVersion,expectedClockRevision:request.expectedClockRevision,operationId:request.operationId,auditId:request.auditId,reason:request.kind==='pause'?request.reason??'recovery':null,reset:request.kind==='resume'&&request.reset?{playerId:request.reset.playerId,remainingMs:request.reset.remainingMs}:null});
    return {matchId:match.matchId,actorId:systemClockActor(match.players),commandId:request.operationId,expectedVersion:request.expectedStateVersion,intent,intentHash:createHash('sha256').update('system-clock-control-v1\0').update(intent).digest('hex')};
  }
  async function previousControl(c:pg.PoolClient,match:StoredMatch,command:DurableCommand):Promise<ClockControlResult|null>{
    const found=await c.query('SELECT * FROM match.command_receipts WHERE match_id=$1 AND actor_id=$2 AND command_id=$3',[match.matchId,command.actorId,command.commandId]);
    const r=found.rows[0];if(!r)return null;if(r.intent_hash!==command.intentHash)throw new MatchStoreError('ID_CONFLICT');
    const audit=await c.query("SELECT clock_revision FROM match.clock_events WHERE match_id=$1 AND operation_id=$2 AND kind IN ('paused','resumed') ORDER BY clock_revision DESC LIMIT 1",[match.matchId,command.commandId]);
    if(!audit.rows[0])throw new MatchStoreError('UNAVAILABLE');
    return {duplicate:true,clockRevision:clockInteger(audit.rows[0].clock_revision),receipt:{matchId:match.matchId,actorId:r.actor_id,commandId:r.command_id,intentHash:r.intent_hash,releaseId:match.releaseId,outcome:r.outcome,reason:r.reason,stateVersion:clockInteger(r.state_version)}};
  }
  async function finish(reservation:ClockReservation,candidate:CommitCandidate,engine:EngineClockState,player?:DurableCommand):Promise<ReceiptResult>{
    return transaction(async c=>{
      const current=await locked(c,reservation.matchId,player?.actorId),match=current.match,clock=match.clock!,command=player??timeoutCommand(reservation,match);
      const old=await c.query('SELECT * FROM match.command_receipts WHERE match_id=$1 AND actor_id=$2 AND command_id=$3',[match.matchId,command.actorId,command.commandId]);
      if(old.rows[0]){
        const r=old.rows[0];if(r.intent_hash!==command.intentHash)throw new MatchStoreError('ID_CONFLICT');
        return {duplicate:true,receipt:{matchId:match.matchId,actorId:r.actor_id,commandId:r.command_id,intentHash:r.intent_hash,releaseId:match.releaseId,outcome:r.outcome,reason:r.reason,stateVersion:clockInteger(r.state_version)} as DurableReceipt};
      }
      const now=await sample(c),owned=current.reservation;
      if(!owned||owned.id!==reservation.id||owned.kind!==reservation.kind||clock.revision!==reservation.expectedClockRevision+1||match.stateVersion!==reservation.expectedStateVersion||owned.engineTimestamp!==reservation.engineTimestamp||now>=owned.expiresAtMs||now<owned.admittedAtMs)throw new MatchStoreError('UNAVAILABLE');
      if(player&&(owned.kind!=='player'||owned.actorId!==player.actorId||owned.commandId!==player.commandId||owned.intentHash!==player.intentHash)||!player&&owned.kind!=='timeout')throw new MatchStoreError('UNAVAILABLE');
      if(candidate.lastTimestamp!==owned.engineTimestamp||JSON.stringify(Object.entries(engine.policy).sort())!==JSON.stringify(Object.entries(clock.policy).sort())||engine.players.length!==2||engine.players.some(p=>!match.players.includes(p.playerId))||!engine.activePlayerId||!match.players.includes(engine.activePlayerId))throw new MatchStoreError('UNAVAILABLE');
      const result=await commitMatchOnClient(c,command,match,candidate,undefined,owned);
      if(result.receipt.outcome!=='accepted')throw new MatchStoreError('UNAVAILABLE');
      const remainingMs=Object.fromEntries(engine.players.map(p=>[p.playerId,clockInteger(p.remainingMs,-3_600_000,clock.policy.reserveCapMs)]));
      const next:StoredClock={...clock,revision:clock.revision+1,stateVersion:candidate.stateVersion,engineTimestamp:candidate.lastTimestamp,anchorUtcMs:now,lastHealthyUtcMs:now,activePlayerId:engine.activePlayerId,remainingMs,checkpointDigest:candidate.checkpoint.digest,status:candidate.ended?'ended':'running',deadlineUtcMs:candidate.ended?null:clockInteger(now+Math.max(0,remainingMs[engine.activePlayerId]!)),pauseReason:null};
      await write(c,match,next,null);await event(c,match,next,player?'accepted':'timeout',owned.id,now);return result;
    });
  }
  return {
    ...base,
    createTimed(value){if(!value.clock)throw new MatchStoreError('UNAVAILABLE');return base.createWithOutcome(value);},
    sample(){return transaction(sample);},
    reservePlayer(command){return transaction(c=>reserve(c,'player',command.matchId,command.expectedVersion,undefined,command));},
    reserveTimeout(matchId,version,revision){return transaction(c=>reserve(c,'timeout',matchId,version,revision));},
    commitPlayer(reservation,command,candidate,clock){return finish(reservation,candidate,clock,command);},
    commitWaitingConcession(evaluation,command,candidate,engine){return transaction(async c=>{
      const {match,reservation}=await locked(c,command.matchId,command.actorId),clock=match.clock!,before=evaluation.before;
      const old=await c.query('SELECT * FROM match.command_receipts WHERE match_id=$1 AND actor_id=$2 AND command_id=$3',[match.matchId,command.actorId,command.commandId]);
      if(old.rows[0]){
        const r=old.rows[0];if(r.intent_hash!==command.intentHash)throw new MatchStoreError('ID_CONFLICT');
        return {duplicate:true,receipt:{matchId:match.matchId,actorId:r.actor_id,commandId:r.command_id,intentHash:r.intent_hash,releaseId:match.releaseId,outcome:r.outcome,reason:r.reason,stateVersion:clockInteger(r.state_version)} as DurableReceipt};
      }
      if(command.move!=='concede'||before.matchId!==command.matchId||!before.clock||before.clock.activePlayerId===command.actorId||command.expectedVersion!==before.stateVersion)throw new MatchStoreError('UNAVAILABLE');
      // A heartbeat may advance only lastHealthyUtcMs. All adjudication state,
      // including clock-only revisions, must still be the evaluated snapshot.
      if(match.stateVersion!==before.stateVersion||match.ended||match.checkpoint.archive!==before.checkpoint.archive||match.checkpoint.digest!==before.checkpoint.digest||JSON.stringify({...clock,lastHealthyUtcMs:0})!==JSON.stringify({...before.clock,lastHealthyUtcMs:0}))return commitMatchOnClient(c,command,before,null,{outcome:'stale',reason:'stale_state'});
      if(reservation||clock.status!=='running'||clock.activePlayerId===command.actorId)throw new MatchStoreError('UNAVAILABLE');
      const now=await sample(c),at=clockInteger(evaluation.sampledAtMs),timestamp=clockInteger(evaluation.engineTimestamp);
      if(now<at||now<clock.lastHealthyUtcMs||now<clock.anchorUtcMs||now-at>=leaseMs||now-clock.lastHealthyUtcMs>maxGap||timestamp!==clock.engineTimestamp+at-clock.anchorUtcMs)throw new MatchStoreError('UNAVAILABLE');
      if(!candidate)return commitMatchOnClient(c,command,before,null,{outcome:'rejected',reason:'invalid_intent'});
      if(!engine||!candidate.ended||candidate.winner!==match.players.find(id=>id!==command.actorId)||candidate.lastTimestamp!==timestamp||engine.activePlayerId!==clock.activePlayerId||JSON.stringify(Object.entries(engine.policy).sort())!==JSON.stringify(Object.entries(clock.policy).sort())||engine.players.length!==2||new Set(engine.players.map(p=>p.playerId)).size!==2||engine.players.some(p=>!match.players.includes(p.playerId)))throw new MatchStoreError('UNAVAILABLE');
      const result=await commitMatchOnClient(c,command,before,candidate,undefined,{kind:'waiting-concession',expectedStateVersion:match.stateVersion,expectedClockRevision:clock.revision,checkpointDigest:match.checkpoint.digest});
      if(result.receipt.outcome!=='accepted')throw new MatchStoreError('UNAVAILABLE');
      const remainingMs=Object.fromEntries(engine.players.map(p=>[p.playerId,clockInteger(p.remainingMs,-3_600_000,clock.policy.reserveCapMs)]));
      const next:StoredClock={...clock,revision:clock.revision+1,stateVersion:candidate.stateVersion,engineTimestamp:timestamp,anchorUtcMs:now,lastHealthyUtcMs:now,remainingMs,checkpointDigest:candidate.checkpoint.digest,status:'ended',deadlineUtcMs:null,pauseReason:null};
      await write(c,match,next,null);await event(c,match,next,'accepted',command.commandId,now);return result;
    });},
    commitTimeout(reservation,candidate,clock){return finish(reservation,candidate,clock);},
    loadSystem(matchId){return transaction(async c=>{const r=await c.query(selectMatchSql+' WHERE m.match_id=$1',[matchId]);return r.rows[0]?decodeMatchRow(r.rows[0]):undefined;});},
    activeClockIds(matchIds){
      if(!Array.isArray(matchIds)||matchIds.length>256||matchIds.some(id=>typeof id!=='string'||!/^[a-zA-Z0-9][a-zA-Z0-9._-]{0,79}$/.test(id)))throw new MatchStoreError('UNAVAILABLE');
      return transaction(async c=>{const r=await c.query("SELECT k.match_id FROM match.clocks k JOIN match.matches m USING(match_id) WHERE k.match_id=ANY($1::text[]) AND NOT m.ended AND k.state->>'status' IN ('running','processing')",[matchIds]);return r.rows.map(row=>row.match_id as string);});
    },
    scan(limit){
      clockInteger(limit,1,128);return transaction(async c=>{
        const r=await c.query("SELECT match_id FROM match.clocks WHERE state->>'status' NOT IN ('ended','paused') ORDER BY (match_id <= $2),match_id LIMIT $1",[limit,scanAfter]);
        const ids=r.rows.map(row=>row.match_id as string);if(ids.length)scanAfter=ids[ids.length-1]!;return ids;
      });
    },
    heartbeat(matchId,expectedClockRevision){return transaction(async c=>{
      const {match}=await locked(c,matchId),clock=match.clock!,now=await sample(c);
      if(clock.revision!==expectedClockRevision||['paused','ended'].includes(clock.status)||clock.status==='processing'&&clock.deadlineUtcMs===null)return;
      if(now<clock.lastHealthyUtcMs||now<clock.anchorUtcMs){await pauseUnsafe(c,match,now,'time_unreliable');return;}
      if(now-clock.lastHealthyUtcMs>maxGap){await pauseUnsafe(c,match,now,'recovery');return;}
      const until=Math.max(clock.anchorUtcMs,Math.min(now,clock.deadlineUtcMs??now,match.clockChargeUntilMs??now));
      await write(c,match,{...clock,lastHealthyUtcMs:Math.max(clock.lastHealthyUtcMs,until)},(await c.query('SELECT reservation FROM match.clocks WHERE match_id=$1',[matchId])).rows[0].reservation);
    });},
    unsafePause(matchId,expectedClockRevision,reason){return transaction(async c=>{const {match}=await locked(c,matchId);if(match.clock!.revision===expectedClockRevision&&!['paused','ended'].includes(match.clock!.status))await pauseUnsafe(c,match,await sample(c),reason);});},
    reserveControl(request){return transaction(async c=>{
      const {match,reservation}=await locked(c,request.matchId),clock=match.clock!,command=auditCommand(request,match),old=await previousControl(c,match,command);
      if(old)return {kind:'duplicate',result:old};
      const now=await sample(c);
      if(reservation){if(now>=reservation.expiresAtMs)await pauseUnsafe(c,match,now,'recovery');return {kind:'busy'};}
      if(match.ended||match.stateVersion!==request.expectedStateVersion||clock.revision!==request.expectedClockRevision||request.kind==='resume'&&clock.status!=='paused')return {kind:'stale'};
      if(now<clock.anchorUtcMs||now<clock.lastHealthyUtcMs)return {kind:'paused'};
      const until=clock.status==='paused'?Math.max(clock.anchorUtcMs,clock.lastHealthyUtcMs):now;
      const owned:ClockReservation={id:randomUUID(),matchId:match.matchId,kind:request.kind,admittedAtMs:now,expiresAtMs:clockInteger(now+leaseMs),expectedStateVersion:match.stateVersion,expectedClockRevision:clock.revision,engineTimestamp:clockInteger(clock.engineTimestamp+until-clock.anchorUtcMs),actorId:command.actorId,commandId:command.commandId,intentHash:command.intentHash,chargeUntilUtcMs:until,previousStatus:clock.status==='paused'?'paused':'running',previousReason:clock.pauseReason};
      const next={...clock,revision:clock.revision+1,status:'processing' as const,pauseReason:null};await write(c,match,next,owned);await event(c,match,next,'processing',owned.id,now);return {kind:'reserved',reservation:owned,before:match};
    });},
    commitControl(reservation,candidate,engine,request){return transaction(async c=>{
      const {match,reservation:owned}=await locked(c,reservation.matchId),clock=match.clock!,command=request?auditCommand(request,match):timeoutCommand(reservation,match),old=await previousControl(c,match,command);
      if(old)return old;
      const now=await sample(c);
      if(!owned||owned.id!==reservation.id||clock.revision!==reservation.expectedClockRevision+1||match.stateVersion!==reservation.expectedStateVersion||now>=owned.expiresAtMs||now<owned.admittedAtMs||candidate.stateVersion!==match.stateVersion||candidate.lastTimestamp!==owned.engineTimestamp||candidate.ended!==match.ended||candidate.winner!==match.winner)throw new MatchStoreError('UNAVAILABLE');
      if(request&&(owned.intentHash!==command.intentHash||owned.commandId!==command.commandId||owned.kind!==request.kind)||!request&&owned.kind!=='timeout')throw new MatchStoreError('UNAVAILABLE');
      const resumed=request?.kind==='resume';
      if(engine.running!==resumed||!engine.activePlayerId||!match.players.includes(engine.activePlayerId)||JSON.stringify(Object.entries(engine.policy).sort())!==JSON.stringify(Object.entries(clock.policy).sort()))throw new MatchStoreError('UNAVAILABLE');
      const update=await c.query('UPDATE match.matches SET checkpoint=$1,checkpoint_digest=$2,last_timestamp=$3 WHERE match_id=$4 AND state_version=$5 AND checkpoint_digest=$6',[candidate.checkpoint.archive,candidate.checkpoint.digest,candidate.lastTimestamp,match.matchId,match.stateVersion,match.checkpoint.digest]);if(update.rowCount!==1)throw new MatchStoreError('UNAVAILABLE');
      const remainingMs=Object.fromEntries(engine.players.map(p=>[p.playerId,p.remainingMs]));
      const reason=resumed?null:request?request.reason??'recovery':'no_legal_default';
      const next:StoredClock={...clock,revision:clock.revision+1,engineTimestamp:candidate.lastTimestamp,anchorUtcMs:now,lastHealthyUtcMs:now,remainingMs,activePlayerId:engine.activePlayerId,checkpointDigest:candidate.checkpoint.digest,status:resumed?'running':'paused',deadlineUtcMs:resumed?clockInteger(now+Math.max(0,remainingMs[engine.activePlayerId]!)):null,pauseReason:reason};
      await write(c,match,next,null);
      const saved=await c.query("INSERT INTO match.command_receipts(match_id,actor_id,command_id,intent_hash,intent,outcome,reason,state_version) VALUES($1,$2,$3,$4,$5,'accepted',NULL,$6) RETURNING *",[match.matchId,command.actorId,command.commandId,command.intentHash,command.intent,match.stateVersion]);
      await event(c,match,next,resumed?'resumed':'paused',command.commandId,now,request?.auditId??systemClockActor(match.players),reason);
      const r=saved.rows[0];return {duplicate:false,clockRevision:next.revision,receipt:{matchId:match.matchId,actorId:r.actor_id,commandId:r.command_id,intentHash:r.intent_hash,releaseId:match.releaseId,outcome:r.outcome,reason:r.reason,stateVersion:clockInteger(r.state_version)}};
    });},
    async reject(reservation,command){
      const result=await transaction(async c=>{
        const {match,reservation:owned}=await locked(c,reservation.matchId,command.actorId),clock=match.clock!;
        if(!owned||owned.kind!=='player'||owned.id!==reservation.id||owned.actorId!==command.actorId||owned.intentHash!==command.intentHash||owned.commandId!==command.commandId||clock.status!=='processing'||clock.revision!==owned.expectedClockRevision+1||match.stateVersion!==owned.expectedStateVersion)throw new MatchStoreError('UNAVAILABLE');
        const now=await sample(c);
        if(now<owned.admittedAtMs||now<clock.lastHealthyUtcMs){await pauseUnsafe(c,match,now,'time_unreliable');return null;}
        if(now>=owned.expiresAtMs||now-clock.lastHealthyUtcMs>maxGap){await pauseUnsafe(c,match,now,'recovery');return null;}
        const receipt=await commitMatchOnClient(c,command,match,null,{outcome:'rejected',reason:'invalid_intent'});
        const next={...clock,revision:clock.revision+1,status:'running' as const};await write(c,match,next,null);await event(c,match,next,'aborted',owned.id,now);return receipt;
      });
      // Commit the safety pause before refusing a late worker result.
      if(!result)throw new MatchStoreError('UNAVAILABLE');return result;
    },
    async abort(reservation){
      await transaction(async c=>{
        const {match,reservation:owned}=await locked(c,reservation.matchId),clock=match.clock!;
        if(!owned||owned.id!==reservation.id)return;const now=await sample(c);
        if(now>=owned.expiresAtMs){await pauseUnsafe(c,match,now,'recovery');return;}
        const next={...clock,revision:clock.revision+1,status:owned.previousStatus??'running',pauseReason:owned.previousReason??null};await write(c,match,next,null);await event(c,match,next,'aborted',owned.id,now);
      });
    },
    async close(){if(stopped)return;stopped=true;await Promise.all([base.close(),pool.end()]);},
  };
}
