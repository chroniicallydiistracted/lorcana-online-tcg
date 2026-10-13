import test from 'node:test';
import assert from 'node:assert/strict';
import * as db from '../../packages/db/dist/index.js';
import {randomUUID} from 'node:crypto';
import {createPrivateMatch,PERSISTENT_ENGINE_IDENTITY} from '../../packages/engine-adapter/dist/index.js';
test('real restricted test database has match, receipt, accepted journal and private outbox tables',async()=>{
 const c=db.client('test','match');await c.connect();
 try {for(const table of ['matches','command_receipts','journal','outbox','releases']) {
  const r=await c.query('SELECT to_regclass($1)::text AS name',['match.'+table]);assert.equal(r.rows[0].name,'match.'+table);
 }}finally{await c.end();}
});
test('server-only database exports the bounded match repository',()=>assert.equal(typeof db.createMatchRepository,'function'));

test('real receipt constraint refuses a rejected result with a null reason',async()=>{
 const id='constraint-'+randomUUID(),releaseId='release-'+randomUUID(),repo=db.createMatchRepository('test'),c=db.client('test','match');
 const engine=createPrivateMatch({matchId:id,players:['p1','p2'],startTimestamp:0});
 try {
  await repo.create({matchId:id,players:['p1','p2'],releaseId,releaseManifest:{purpose:'sql-constraint-fixture'},engineIdentity:PERSISTENT_ENGINE_IDENTITY,rulesVersion:'synthetic-fixture',catalogRevision:'synthetic-rule-03',formatRevision:'synthetic-two-player-v1',protocolVersion:1,stateVersion:0,lastTimestamp:0,checkpoint:engine.checkpoint(),ended:false,winner:null});
  await c.connect();
  await assert.rejects(c.query("INSERT INTO match.command_receipts(match_id,actor_id,command_id,intent_hash,intent,outcome,reason,state_version) VALUES($1,'p1','bad-null',$2,'{}','rejected',NULL,0)",[id,'0'.repeat(64)]),e=>e.code==='23514');
 }finally{
  engine.dispose();await c.query('DELETE FROM match.matches WHERE match_id=$1',[id]).catch(()=>{});await c.query('DELETE FROM match.releases WHERE release_id=$1',[releaseId]).catch(()=>{});await c.end();await repo.close();
 }
});
