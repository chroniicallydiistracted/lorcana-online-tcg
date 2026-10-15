import pg from 'pg';
import { randomUUID, createHash } from 'node:crypto';
import { connection, workspaceRoot } from './config.ts';
import type { Target } from './policy.ts';

export interface StoredCheckpoint { archive: string; digest: string }
export interface StoredMatch {
  matchId: string; players: [string,string]; releaseId: string; releaseManifest: unknown;
  engineIdentity: string; rulesVersion: string; catalogRevision: string; formatRevision: string; protocolVersion: number;
  stateVersion: number; lastTimestamp: number; checkpoint: StoredCheckpoint; ended: boolean; winner: string | null;
}
export interface DurableCommand { matchId: string; actorId: string; commandId: string; expectedVersion: number; intentHash: string; intent: string }
export interface DurableReceipt {
  matchId: string; actorId: string; commandId: string; intentHash: string; releaseId: string;
  outcome: 'accepted'|'rejected'|'stale'; reason: 'forbidden'|'invalid_intent'|'stale_state'|null; stateVersion: number;
}
export interface ReceiptResult { receipt: DurableReceipt; duplicate: boolean }
export interface CommitCandidate { stateVersion: number; lastTimestamp: number; checkpoint: StoredCheckpoint; ended: boolean; winner: string|null }
export type Rejection = {outcome:'rejected';reason:'forbidden'|'invalid_intent'}|{outcome:'stale';reason:'stale_state'};
export interface MatchRepository {
  create(match: StoredMatch): Promise<StoredMatch>;
  load(matchId: string, actorId: string): Promise<StoredMatch|undefined>;
  findReceipt(command: DurableCommand): Promise<DurableReceipt|undefined>;
  commit(command: DurableCommand, before: StoredMatch, candidate: CommitCandidate|null, rejection?: Rejection): Promise<ReceiptResult>;
  observe(matchId:string,actorId:string):Promise<{stateVersion:number;releaseId:string;protocolVersion:number;eventId:string|null}|null>;
  close(): Promise<void>;
}
export class MatchStoreError extends Error {
  constructor(readonly code:'FORBIDDEN'|'ID_CONFLICT'|'PIN_UNAVAILABLE'|'UNAVAILABLE') {super('Match storage '+code);}
}
function integer(value: unknown): number {
  const n=typeof value==='string'&&/^\d+$/.test(value)?Number(value):value;
  if(typeof n!=='number'||!Number.isSafeInteger(n)||n<0)throw new MatchStoreError('UNAVAILABLE');return n;
}
function decode(row: Record<string,unknown>): StoredMatch {
  return {matchId:row.match_id as string,players:[row.player_one as string,row.player_two as string],releaseId:row.release_id as string,releaseManifest:row.manifest,
    engineIdentity:row.engine_identity as string,rulesVersion:row.rules_version as string,catalogRevision:row.catalog_revision as string,formatRevision:row.format_revision as string,protocolVersion:integer(row.protocol_version),
    stateVersion:integer(row.state_version),lastTimestamp:integer(row.last_timestamp),checkpoint:{archive:row.checkpoint as string,digest:row.checkpoint_digest as string},ended:row.ended as boolean,winner:row.winner as string|null};
}
function receipt(row: Record<string,unknown>, releaseId:string): DurableReceipt {
  return {matchId:row.match_id as string,actorId:row.actor_id as string,commandId:row.command_id as string,intentHash:row.intent_hash as string,releaseId,outcome:row.outcome as DurableReceipt['outcome'],reason:row.reason as DurableReceipt['reason'],stateVersion:integer(row.state_version)};
}
const select='SELECT m.*,r.manifest FROM match.matches m JOIN match.releases r USING(release_id)';
const receiptQuery='SELECT c.*,m.release_id FROM match.command_receipts c JOIN match.matches m USING(match_id) WHERE c.match_id=$1 AND c.actor_id=$2 AND c.command_id=$3 AND ($2=m.player_one OR $2=m.player_two)';
function key(c:DurableCommand):string[]{return[c.matchId,c.actorId,c.commandId];}
function checkedReceipt(row:Record<string,unknown>,command:DurableCommand):DurableReceipt {
  if(row.intent_hash!==command.intentHash)throw new MatchStoreError('ID_CONFLICT');return receipt(row,row.release_id as string);
}
function manifestText(value:unknown):string {
  function order(v:unknown):unknown {return Array.isArray(v)?v.map(order):v&&typeof v==='object'?Object.fromEntries(Object.entries(v).sort(([a],[b])=>a<b?-1:a>b?1:0).map(([k,x])=>[k,order(x)])):v;}
  return JSON.stringify(order(value));
}
/** Only the existing match runtime login is used. No bootstrap/migration credential enters service queries. */
export function createMatchRepository(target:Target, root=workspaceRoot):MatchRepository {
  const pool=new pg.Pool({...connection(target,'match',root),max:4,idleTimeoutMillis:1000});
  let closed=false;
  async function transaction<T>(work:(c:pg.PoolClient)=>Promise<T>):Promise<T>{
    if(closed)throw new MatchStoreError('UNAVAILABLE');
    const c=await pool.connect();
    try {await c.query('BEGIN');const result=await work(c);await c.query('COMMIT');return result;}
    catch(error){await c.query('ROLLBACK').catch(()=>{});throw error instanceof MatchStoreError?error:new MatchStoreError('UNAVAILABLE');}
    finally{c.release();}
  }
  return {
    async create(value) {
      return transaction(async c=>{
        const text=manifestText(value.releaseManifest),hash=createHash('sha256').update(text).digest('hex');
        await c.query('INSERT INTO match.releases(release_id,manifest,manifest_digest) VALUES($1,$2::jsonb,$3) ON CONFLICT DO NOTHING',[value.releaseId,text,hash]);
        const release=await c.query('SELECT manifest_digest FROM match.releases WHERE release_id=$1',[value.releaseId]);
        if(release.rows[0]?.manifest_digest!==hash)throw new MatchStoreError('PIN_UNAVAILABLE');
        await c.query(`INSERT INTO match.matches(match_id,player_one,player_two,release_id,engine_identity,rules_version,catalog_revision,format_revision,protocol_version,mode,reward_eligible,state_version,last_timestamp,checkpoint,checkpoint_digest,ended,winner)
          VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,'qualification',false,$10,$11,$12,$13,$14,$15) ON CONFLICT DO NOTHING`,
          [value.matchId,...value.players,value.releaseId,value.engineIdentity,value.rulesVersion,value.catalogRevision,value.formatRevision,value.protocolVersion,value.stateVersion,value.lastTimestamp,value.checkpoint.archive,value.checkpoint.digest,value.ended,value.winner]);
        const found=await c.query(select+' WHERE m.match_id=$1 FOR UPDATE OF m',[value.matchId]);
        const existing=decode(found.rows[0]);
        if(existing.players[0]!==value.players[0]||existing.players[1]!==value.players[1]||existing.releaseId!==value.releaseId||existing.engineIdentity!==value.engineIdentity)throw new MatchStoreError('ID_CONFLICT');
        return existing;
      });
    },
    async load(matchId,actorId) {
      try {const r=await pool.query(select+' WHERE m.match_id=$1 AND ($2=m.player_one OR $2=m.player_two)',[matchId,actorId]);return r.rows[0]?decode(r.rows[0]):undefined;}
      catch{throw new MatchStoreError('UNAVAILABLE');}
    },
    async observe(matchId,actorId) {
      try {
        const result=await pool.query('SELECT m.state_version,m.release_id,m.protocol_version,o.event_id FROM match.matches m LEFT JOIN match.outbox o ON o.match_id=m.match_id AND o.state_version=m.state_version WHERE m.match_id=$1 AND ($2=m.player_one OR $2=m.player_two)',[matchId,actorId]);
        const row=result.rows[0];return row?{stateVersion:integer(row.state_version),releaseId:row.release_id,protocolVersion:integer(row.protocol_version),eventId:row.event_id??null}:null;
      }catch{throw new MatchStoreError('UNAVAILABLE');}
    },
    async findReceipt(command) {
      try {const r=await pool.query(receiptQuery,key(command));return r.rows[0]?checkedReceipt(r.rows[0],command):undefined;}
      catch(error){throw error instanceof MatchStoreError?error:new MatchStoreError('UNAVAILABLE');}
    },
    async commit(command,before,candidate,rejection) {
      return transaction(async c=>{
        const match=await c.query(select+' WHERE m.match_id=$1 AND ($2=m.player_one OR $2=m.player_two) FOR UPDATE OF m',[command.matchId,command.actorId]);
        if(!match.rows[0])throw new MatchStoreError('FORBIDDEN');
        const current=decode(match.rows[0]),old=await c.query(receiptQuery,key(command));
        if(old.rows[0])return {receipt:checkedReceipt(old.rows[0],command),duplicate:true};
        if(current.releaseId!==before.releaseId||current.engineIdentity!==before.engineIdentity||manifestText(current.releaseManifest)!==manifestText(before.releaseManifest))throw new MatchStoreError('PIN_UNAVAILABLE');
        let version=current.stateVersion,outcome:DurableReceipt['outcome'],reason:DurableReceipt['reason'];
        if(command.expectedVersion!==version||before.stateVersion!==version) {outcome='stale';reason='stale_state';candidate=null;}
        else if(candidate) {
          if(current.checkpoint.digest!==before.checkpoint.digest||candidate.stateVersion!==version+1||candidate.lastTimestamp<current.lastTimestamp)throw new MatchStoreError('UNAVAILABLE');
          const update=await c.query('UPDATE match.matches SET state_version=$1,last_timestamp=$2,checkpoint=$3,checkpoint_digest=$4,ended=$5,winner=$6 WHERE match_id=$7 AND state_version=$8 AND checkpoint_digest=$9',
            [candidate.stateVersion,candidate.lastTimestamp,candidate.checkpoint.archive,candidate.checkpoint.digest,candidate.ended,candidate.winner,command.matchId,version,before.checkpoint.digest]);
          if(update.rowCount!==1)throw new MatchStoreError('UNAVAILABLE');
          version=candidate.stateVersion;outcome='accepted';reason=null;
        } else {if(!rejection)throw new MatchStoreError('UNAVAILABLE');outcome=rejection.outcome;reason=rejection.reason;}
        const saved=await c.query('INSERT INTO match.command_receipts(match_id,actor_id,command_id,intent_hash,intent,outcome,reason,state_version) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *',
          [...key(command),command.intentHash,command.intent,outcome,reason,version]);
        if(outcome==='accepted'&&candidate) {
          await c.query('INSERT INTO match.journal(match_id,state_version,actor_id,command_id,intent_hash,checkpoint_digest) VALUES($1,$2,$3,$4,$5,$6)',[command.matchId,version,command.actorId,command.commandId,command.intentHash,candidate.checkpoint.digest]);
          await c.query('INSERT INTO match.outbox(event_id,match_id,state_version,kind) VALUES($1,$2,$3,$4)',[randomUUID(),command.matchId,version,candidate.ended?'match_completed':'match_changed']);
          await c.query("SELECT pg_notify('lorcana_match_changed',$1)",[command.matchId]);
        }
        return {receipt:receipt(saved.rows[0],current.releaseId),duplicate:false};
      });
    },
    async close(){if(!closed){closed=true;await pool.end();}},
  };
}
