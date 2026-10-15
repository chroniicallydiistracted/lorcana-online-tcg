import type { TicketGrant } from '@lorcana/db';
import { closed, identifier, unsigned } from './validation.ts';
export interface VerifiedSession {actorId:string;sessionId:string;expiresAt:number}
/** AUTH-01 supplies this interface. There is deliberately no default/test authenticator. */
export interface SessionAuthority {
  authenticate(headers:Readonly<Record<string,string|string[]|undefined>>,signal:AbortSignal):Promise<VerifiedSession|null>;
  verify(sessionId:string,signal:AbortSignal):Promise<VerifiedSession|null>;
}
export function parseSession(value:unknown):VerifiedSession|null {
  try {
    const row=closed(value,['actorId','sessionId','expiresAt']);
    const result={actorId:identifier(row.actorId),sessionId:identifier(row.sessionId),expiresAt:unsigned(row.expiresAt)};
    return result.expiresAt>Date.now()?result:null;
  }catch{return null;}
}
export async function sessionWork<T>(work:(signal:AbortSignal)=>Promise<T>):Promise<T> {
  const controller=new AbortController();let timer:ReturnType<typeof setTimeout>|undefined;
  try{return await Promise.race([work(controller.signal),new Promise<never>((_resolve,reject)=>{timer=setTimeout(()=>{controller.abort();reject(new Error('session unavailable'));},1000);})]);}
  finally{if(timer)clearTimeout(timer);}
}
export async function currentSession(authority:SessionAuthority,grant:TicketGrant):Promise<boolean> {
  try {
    if(grant.sessionExpiresAt<=Date.now())return false;
    const current=parseSession(await sessionWork(signal=>authority.verify(grant.sessionId,signal)));
    return !!current&&current.actorId===grant.actorId&&current.sessionId===grant.sessionId;
  }catch{return false;}
}
