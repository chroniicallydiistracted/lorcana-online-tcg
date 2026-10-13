import {readFileSync} from 'node:fs';
import {createHash,randomUUID} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {buildFoundationRelease} from '../../../scripts/release-manifest.mjs';
import {sourceFingerprint} from '../../../scripts/documentation-lib.mjs';
import {createReleaseRegistry} from '../../../packages/service-runtime/dist/index.js';
import {createMatchRepository,client} from '../../../packages/db/dist/index.js';
import {createMatchService} from '../dist/service.js';
export const root=fileURLToPath(new URL('../../../',import.meta.url));
/** Actual built-component hashes, but a fixed simulated release timestamp; not a promoted artifact. */
export function releases() {
 const fingerprint=sourceFingerprint(root);
 const manifest=buildFoundationRelease(root,{source_commit:fingerprint,source_fingerprint:fingerprint,lock_sha256:createHash('sha256').update(readFileSync(new URL('../../../pnpm-lock.yaml',import.meta.url))).digest('hex')},'2000-01-01T00:00:00.000Z');
 return createReleaseRegistry([manifest],manifest.releaseId);
}
export function service(repository=createMatchRepository('test'),other={}) {return createMatchService({repository,releases:releases(),now:()=>100,...other});}
export const fixtureId=()=> 'play01-'+randomUUID();
export const command=(matchId,commandId,expectedVersion,move='concede',input={})=>({matchId,commandId,expectedVersion,move,input});
export async function using(identity,fn) {const c=client('test',identity);await c.connect();try{return await fn(c);}finally{await c.end();}}
export async function cleanup(id) {
 await using('match',c=>c.query('DELETE FROM match.matches WHERE match_id=$1',[id]));
}
export async function open(s,id) {
 await s.create({matchId:id,players:['p1','p2']});
 const row=await using('match',async c=>(await c.query('SELECT checkpoint FROM match.matches WHERE match_id=$1',[id])).rows[0]);
 const chooser=JSON.parse(row.checkpoint).transcript.final.status.choosingFirstPlayer;
 let revision=0;
 for(const [actor,move,input]of[[chooser,'chooseWhoGoesFirst',{playerId:'p1'}],['p1','alterHand',{cardsToMulligan:[]}],['p2','alterHand',{cardsToMulligan:[]}]]) {
  const r=await s.submit(actor,command(id,'open-'+actor+move,revision,move,input));
  if(r.receipt.outcome!=='accepted')throw new Error('Actual opening fixture failed');revision=r.receipt.stateVersion;
 }
 return revision;
}
export async function counts(id) {
 return using('match',async c=>{
  const result={};
  for(const table of ['command_receipts','journal','outbox'])result[table]=(await c.query('SELECT count(*)::int AS n FROM match.'+table+' WHERE match_id=$1',[id])).rows[0].n;
  const row=(await c.query('SELECT state_version,checkpoint_digest,ended,winner FROM match.matches WHERE match_id=$1',[id])).rows[0];
  return {...result,stateVersion:Number(row.state_version),digest:row.checkpoint_digest,ended:row.ended,winner:row.winner};
 });
}
