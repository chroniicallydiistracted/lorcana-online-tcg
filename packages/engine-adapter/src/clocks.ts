import type {EngineClockState,ClockPolicy} from '@lorcana/contracts/clocks';
import type {SyntheticKernel,KernelClockControl} from '@lorcana/vendor-engine';
import {closedRecord,unsigned,boundedText} from './validation.js';

export type ClockControl=KernelClockControl;
export function validateClockControl(value:unknown):ClockControl {
  const c=closedRecord(value,['kind','timestamp','reason','playerId','remainingMs']);
  const timestamp=unsigned(c.timestamp);
  if(timestamp>8_640_000_000_000_000)throw new Error('Invalid clock control');
  if(c.kind==='pause'){
    closedRecord(value,['kind','timestamp','reason']);
    if(c.reason!=='SERVER_RECOVERY'&&c.reason!=='JUDGE_PAUSE')throw new Error('Invalid clock control');
    return {kind:'pause',timestamp,reason:c.reason};
  }
  if(c.kind==='resume'||c.kind==='settle'){closedRecord(value,['kind','timestamp']);return {kind:c.kind,timestamp};}
  if(c.kind==='reset'){
    closedRecord(value,['kind','timestamp','playerId','remainingMs']);
    const remainingMs=unsigned(c.remainingMs);if(remainingMs>3_600_000)throw new Error('Invalid clock control');
    return {kind:'reset',timestamp,playerId:boundedText(c.playerId,80),remainingMs};
  }
  throw new Error('Invalid clock control');
}
export function readEngineClock(kernel:SyntheticKernel,policy:ClockPolicy|undefined):EngineClockState|null {
  if(!policy)return null;
  const clock=kernel.clock();if(!clock)throw new Error('Clock unavailable');
  return {policy:JSON.parse(JSON.stringify(policy)) as ClockPolicy,...clock};
}
