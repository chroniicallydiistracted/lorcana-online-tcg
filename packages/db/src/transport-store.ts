import pg from 'pg';
import { createHash, randomBytes } from 'node:crypto';
import { connection, workspaceRoot, client } from './config.ts';
import type { Target } from './policy.ts';

export interface TicketGrant {actorId:string;sessionId:string;sessionExpiresAt:number;matchId:string;releaseId:string;protocolVersion:2;origin:string}
export interface TransportStore {
  issue(grant:TicketGrant):Promise<{ticket:string;expiresAt:number}>;
  consume(ticket:string,origin:string):Promise<TicketGrant|null>;
  quota(scope:'ticket'|'command'|'view'|'match'|'principal',subject:string,limit:number,windowMs:number):Promise<{allowed:boolean;retryAfterMs:number}>;
  close():Promise<void>;
}
const validId=(s:unknown):s is string=>typeof s==='string'&&/^[a-zA-Z0-9][a-zA-Z0-9._-]{0,79}$/.test(s);
const hash=(text:string)=>createHash('sha256').update(text).digest('hex');
function validOrigin(origin:string){try{return origin.length<=256&&new URL(origin).origin===origin&&['http:','https:'].includes(new URL(origin).protocol);}catch{return false;}}
/** Only the match role can issue/consume capabilities. Raw tickets are never stored or logged. */
export function createTransportStore(target:Target,root=workspaceRoot):TransportStore {
  const pool=new pg.Pool({...connection(target,'match',root),max:2,idleTimeoutMillis:1000});let closed=false;
  function available(){if(closed)throw new Error('transport unavailable');}
  return {
    async issue(g) {
      available();
      if(!g||!validId(g.actorId)||!validId(g.sessionId)||!validId(g.matchId)||!validId(g.releaseId)||g.protocolVersion!==2||!validOrigin(g.origin)||!Number.isSafeInteger(g.sessionExpiresAt)||g.sessionExpiresAt<0||g.sessionExpiresAt>8_640_000_000_000_000)throw new Error('transport forbidden');
      const ticket=randomBytes(32).toString('base64url');
      await pool.query("DELETE FROM match.socket_tickets WHERE ticket_hash IN (SELECT ticket_hash FROM match.socket_tickets WHERE expires_at<clock_timestamp() LIMIT 128)");
      const row=await pool.query(`INSERT INTO match.socket_tickets(ticket_hash,match_id,actor_id,session_id,session_expires_at,release_id,protocol_version,origin,expires_at)
        SELECT $1,m.match_id,$2::varchar(80),$3,to_timestamp($4::double precision/1000),m.release_id,2,$5,LEAST(to_timestamp($4::double precision/1000),clock_timestamp()+interval '30 seconds')
        FROM match.matches m WHERE m.match_id=$6 AND ($2::varchar(80)=m.player_one OR $2::varchar(80)=m.player_two) AND m.release_id=$7 AND m.protocol_version=2 AND to_timestamp($4::double precision/1000)>clock_timestamp()
        RETURNING expires_at`,[hash(ticket),g.actorId,g.sessionId,g.sessionExpiresAt,g.origin,g.matchId,g.releaseId]);
      if(!row.rows[0])throw new Error('transport forbidden');return {ticket,expiresAt:row.rows[0].expires_at.getTime()};
    },
    async consume(ticket,origin) {
      available();if(typeof ticket!=='string'||!/^[A-Za-z0-9_-]{43}$/.test(ticket)||!validOrigin(origin))return null;
      const result=await pool.query(`DELETE FROM match.socket_tickets WHERE ticket_hash=$1 AND origin=$2 AND expires_at>clock_timestamp() AND session_expires_at>clock_timestamp()
        RETURNING actor_id,session_id,session_expires_at,match_id,release_id,protocol_version,origin`,[hash(ticket),origin]);
      const row=result.rows[0];return row?{actorId:row.actor_id,sessionId:row.session_id,sessionExpiresAt:row.session_expires_at.getTime(),matchId:row.match_id,releaseId:row.release_id,protocolVersion:2,origin:row.origin}:null;
    },
    async quota(scope,subject,limit,windowMs) {
      available();if(!['ticket','command','view','match','principal'].includes(scope)||typeof subject!=='string'||subject.length<1||subject.length>256||!Number.isSafeInteger(limit)||limit<1||limit>1000||!Number.isSafeInteger(windowMs)||windowMs<1||windowMs>60000)throw new Error('transport unavailable');
      const result=await pool.query(`INSERT INTO match.transport_limits(key_hash,used,expires_at) VALUES($1,1,clock_timestamp()+$2::int*interval '1 millisecond')
        ON CONFLICT(key_hash) DO UPDATE SET used=CASE WHEN transport_limits.expires_at<=clock_timestamp() THEN 1 ELSE LEAST(transport_limits.used+1,$3::int+1) END,
        expires_at=CASE WHEN transport_limits.expires_at<=clock_timestamp() THEN clock_timestamp()+$2::int*interval '1 millisecond' ELSE transport_limits.expires_at END
        RETURNING used,CEIL(EXTRACT(epoch FROM expires_at-clock_timestamp())*1000)::int AS retry`,[hash(scope+'\0'+subject),windowMs,limit]);
      const row=result.rows[0];return {allowed:row.used<=limit,retryAfterMs:Math.max(1,Math.min(windowMs,row.retry))};
    },
    async close(){if(!closed){closed=true;await pool.end();}},
  };
}
/** Notifications carry only bounded match IDs. Periodic durable reconciliation remains mandatory. */
export function createMatchHints(target:Target,onChange:(matchId:string)=>void,root=workspaceRoot) {
  let stopped=false,current:pg.Client|undefined,timer:ReturnType<typeof setTimeout>|undefined,connecting:Promise<void>|undefined,resolveReady:()=>void;
  const ready=new Promise<void>(resolve=>{resolveReady=resolve;});
  function schedule(){if(!stopped&&!timer)timer=setTimeout(()=>{timer=undefined;connecting=connect();},1000);}
  async function connect(){
    if(stopped)return;const c=client(target,'match',root);current=c;
    const lost=()=>{if(current===c){current=undefined;schedule();}void c.end().catch(()=>{});};
    c.on('error',lost);c.on('end',()=>{if(current===c){current=undefined;schedule();}});
    c.on('notification',message=>{if(!stopped&&validId(message.payload)){try{onChange(message.payload);}catch{/* Hints never become authority. */}}});
    try{await c.connect();if(stopped){await c.end();if(current===c)current=undefined;return;}await c.query('LISTEN lorcana_match_changed');resolveReady();}
    catch{lost();}
  }
  connecting=connect();
  return {ready,async close(){stopped=true;if(timer)clearTimeout(timer);await connecting;const owned=current;current=undefined;await owned?.end().catch(()=>{});}};
}
