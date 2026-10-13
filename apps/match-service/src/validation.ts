import { createHash } from 'node:crypto';
import { copyPlayerInput } from '@lorcana/engine-adapter';
import type { DurableCommand } from '@lorcana/db';
export interface Submission extends DurableCommand { move:string; input:Record<string,unknown> }
export function identifier(value:unknown):string {
  if(typeof value!=='string'||!/^[a-zA-Z0-9][a-zA-Z0-9._-]{0,79}$/.test(value))throw new Error('Invalid identifier');return value;
}
export function unsigned(value:unknown):number {
  if(typeof value!=='number'||!Number.isSafeInteger(value)||value<0)throw new Error('Invalid counter');return value;
}
export function closed(value:unknown,fields:readonly string[]):Record<string,unknown> {
  if(!value||typeof value!=='object'||Array.isArray(value)||Object.getPrototypeOf(value)!==Object.prototype)throw new Error('Invalid object');
  for(const key of Reflect.ownKeys(value)) {
    const d=Object.getOwnPropertyDescriptor(value,key);
    if(typeof key!=='string'||!fields.includes(key)||!d?.enumerable||!Object.hasOwn(d,'value'))throw new Error('Invalid object');
  }
  return value as Record<string,unknown>;
}
export function canonical(value:unknown):string {
  const order=(x:unknown):unknown=>Array.isArray(x)?x.map(order):x&&typeof x==='object'?Object.fromEntries(Object.entries(x).sort(([a],[b])=>a<b?-1:a>b?1:0).map(([k,v])=>[k,order(v)])):x;
  return JSON.stringify(order(value));
}
/** Actor is supplied by trusted server context, never read from the command body. */
export function validateSubmission(actor:unknown,value:unknown):Submission {
  try {
    const row=closed(value,['matchId','commandId','expectedVersion','move','input']);
    const actorId=identifier(actor),matchId=identifier(row.matchId),commandId=identifier(row.commandId),expectedVersion=unsigned(row.expectedVersion);
    if(typeof row.move!=='string'||!row.move.length||row.move.length>64||Array.from(row.move).some(character=>character.charCodeAt(0)<32))throw new Error();
    const input=copyPlayerInput(row.input),move=row.move;
    const intent=canonical({actorId,matchId,expectedVersion,move,input});
    if(Buffer.byteLength(intent)>16384)throw new Error();
    const intentHash=createHash('sha256').update('match-command-intent-v1\0').update(intent).digest('hex');
    return {actorId,matchId,commandId,expectedVersion,move,input,intent,intentHash};
  }catch{throw new Error('Invalid match command');}
}
