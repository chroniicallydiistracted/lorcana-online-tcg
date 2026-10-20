import {parseTransportClockProjection as parseClockProjection} from '@lorcana/contracts';
import type {PublicClockProjection as ClockProjection} from '@lorcana/contracts';
/** Display estimate only. No timer, command, result or server clock is changed. */
export function estimateClock(value:ClockProjection,playerId:string,elapsedMonotonicMs:number):number {
  const clock=parseClockProjection(value),player=clock.players.find(p=>p.playerId===playerId);
  if(!player||!Number.isFinite(elapsedMonotonicMs)||elapsedMonotonicMs<0)throw new Error('Invalid countdown estimate');
  return Math.max(0,player.remainingMs-(clock.status==='running'&&clock.activePlayerId===playerId?elapsedMonotonicMs:0));
}
