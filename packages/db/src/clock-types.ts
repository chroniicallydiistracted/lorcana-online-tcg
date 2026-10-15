import type pg from 'pg';
import {parseClockPolicy} from '@lorcana/contracts/clocks';
import type {ClockPolicy,ClockProjection} from '@lorcana/contracts/clocks';

export interface StoredClock {
  policy:ClockPolicy;revision:number;stateVersion:number;engineTimestamp:number;
  anchorUtcMs:number;deadlineUtcMs:number|null;status:'running'|'processing'|'paused'|'ended';
  activePlayerId:string|null;remainingMs:Record<string,number>;lastHealthyUtcMs:number;
  pauseReason:ClockProjection['pauseReason'];checkpointDigest:string;
}
export interface ClockReservation {
  id:string;matchId:string;kind:'player'|'timeout'|'pause'|'resume';admittedAtMs:number;expiresAtMs:number;
  expectedStateVersion:number;expectedClockRevision:number;engineTimestamp:number;
  actorId?:string;commandId?:string;intentHash?:string;
  chargeUntilUtcMs?:number;previousStatus?:'running'|'paused';previousReason?:ClockProjection['pauseReason'];
}
export function clockInteger(value:unknown,min=0,max=8_640_000_000_000_000):number {
  const n=typeof value==='string'&&/^-?\d+$/.test(value)?Number(value):value;
  if(typeof n!=='number'||!Number.isSafeInteger(n)||n<min||n>max)throw new Error('Clock storage unavailable');return n;
}
export async function sampleDatabaseUtc(c:Pick<pg.PoolClient,'query'>):Promise<number>{
  const r=await c.query("SELECT FLOOR(EXTRACT(epoch FROM clock_timestamp())*1000)::bigint AS ms");return clockInteger(r.rows[0].ms);
}
export function decodeStoredClock(value:unknown,players:readonly string[],stateVersion:number,digest:string):StoredClock {
  if(!value||typeof value!=='object'||Array.isArray(value))throw new Error('Clock storage unavailable');
  const s=value as Record<string,unknown>,fields=['policy','revision','stateVersion','engineTimestamp','anchorUtcMs','deadlineUtcMs','status','activePlayerId','remainingMs','lastHealthyUtcMs','pauseReason','checkpointDigest'];
  if(Object.keys(s).length!==fields.length||Object.keys(s).some(k=>!fields.includes(k)))throw new Error('Clock storage unavailable');
  const policy=parseClockPolicy(s.policy),status=s.status as StoredClock['status'];
  if(!['running','processing','paused','ended'].includes(status)||s.stateVersion!==stateVersion||s.checkpointDigest!==digest||s.activePlayerId!==null&&!players.includes(String(s.activePlayerId)))throw new Error('Clock storage unavailable');
  if(!s.remainingMs||typeof s.remainingMs!=='object'||Array.isArray(s.remainingMs))throw new Error('Clock storage unavailable');
  const remaining=s.remainingMs as Record<string,unknown>;
  if(Object.keys(remaining).length!==2||Object.keys(remaining).some(id=>!players.includes(id)))throw new Error('Clock storage unavailable');
  const remainingMs=Object.fromEntries(players.map(id=>[id,clockInteger(remaining[id],-3_600_000,policy.reserveCapMs)]));
  if(![null,'recovery','time_unreliable','no_legal_default'].includes(s.pauseReason as StoredClock['pauseReason'])||status==='paused'&&(s.deadlineUtcMs!==null||s.pauseReason===null)||status!=='paused'&&s.pauseReason!==null||status==='ended'&&s.deadlineUtcMs!==null)throw new Error('Clock storage unavailable');
  if(status==='running'&&(s.deadlineUtcMs===null||s.activePlayerId===null)||status==='processing'&&s.activePlayerId===null)throw new Error('Clock storage unavailable');
  return {policy,revision:clockInteger(s.revision),stateVersion:clockInteger(s.stateVersion),engineTimestamp:clockInteger(s.engineTimestamp),anchorUtcMs:clockInteger(s.anchorUtcMs),deadlineUtcMs:s.deadlineUtcMs===null?null:clockInteger(s.deadlineUtcMs),status,activePlayerId:s.activePlayerId as string|null,remainingMs,lastHealthyUtcMs:clockInteger(s.lastHealthyUtcMs),pauseReason:s.pauseReason as StoredClock['pauseReason'],checkpointDigest:digest};
}
