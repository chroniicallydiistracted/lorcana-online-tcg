import test from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import pg from 'pg';
import { client, connection, workspaceRoot } from '../src/config.ts';
import { provision } from '../src/provision.ts';
import { migrate } from '../src/migrate.ts';
import { migrationFiles, services, targetNames } from '../src/policy.ts';
import { probeRepository } from '../src/schema.ts';
async function using(identity,fn){const db=client('test',identity);await db.connect();try{return await fn(db);}finally{await db.end();}}
async function denied(db,sql){let code;try{await db.query(sql);}catch(error){code=error.code;}assert.equal(code,'42501','Operation must be denied for insufficient privilege: '+sql);}
test('real runtime identities own no objects, can CRUD only their own probes, and cannot escalate',async()=>{
 await migrate('test');
 for(const service of services) await using(service,async db=>{
  const attrs=(await db.query('SELECT rolsuper,rolcreatedb,rolcreaterole,rolreplication,rolbypassrls,rolinherit,rolcanlogin FROM pg_roles WHERE rolname=current_user')).rows[0];
  assert.ok(Object.entries(attrs).every(([key,value])=>value===(key==='rolcanlogin')),'Login must have no elevated flags');
  assert.equal((await db.query('SELECT count(*)::int AS count FROM pg_auth_members WHERE member=(SELECT oid FROM pg_roles WHERE rolname=current_user)')).rows[0].count,0);
  assert.equal((await db.query('SELECT count(*)::int AS count FROM pg_class WHERE relowner=(SELECT oid FROM pg_roles WHERE rolname=current_user)')).rows[0].count,0);
  assert.equal((await db.query('SELECT count(*)::int AS count FROM pg_namespace WHERE nspowner=(SELECT oid FROM pg_roles WHERE rolname=current_user)')).rows[0].count,0);
  const repository=probeRepository(db,service),label='integration-'+randomUUID();let id;
  try {const rows=await repository.insert(label);id=rows[0].id;assert.equal(rows[0].label,label);assert.ok(rows[0].createdAt instanceof Date);assert.equal((await repository.find(id))[0].label,label);assert.equal((await repository.update(id,label+'-updated'))[0].label,label+'-updated');}
  finally {if(id)await repository.remove(id);}
  if(id)assert.equal((await repository.find(id)).length,0);
  for(const other of services.filter(s=>s!==service)) await denied(db,`SELECT * FROM ${other}.foundation_probes`);
  await denied(db,'SELECT * FROM foundation.migrations');await denied(db,`TRUNCATE ${service}.foundation_probes`);
  await denied(db,`CREATE TABLE ${service}.forbidden(id int)`);await denied(db,'CREATE TABLE public.forbidden(id int)');await denied(db,'CREATE TEMP TABLE forbidden(id int)');
  await denied(db,'CREATE DATABASE forbidden_boot02');await denied(db,'CREATE ROLE forbidden_boot02');
  for(const role of Object.values(targetNames('test').roles).filter(role=>role!==targetNames('test').roles[service]))await denied(db,`SET ROLE ${role}`);
 });
});
test('cross-environment logins cannot connect to either other managed database',async()=>{
 for(const from of ['local','test'])for(const identity of ['migrator',...services]){
  const wrong=new pg.Client({...connection(from,identity),database:targetNames(from==='local'?'test':'local').database});let code;
  try{await wrong.connect();}catch(error){code=error.code;}finally{await wrong.end();}
  assert.equal(code,'42501','Cross-environment CONNECT must fail');
 }
});
test('migrations are idempotent/concurrent, reject changed history, and roll back all failed DDL/journal work',async()=>{
 assert.equal((await migrate('test')).applied,0);
 const concurrent=await Promise.all([migrate('test'),migrate('test')]);assert.ok(concurrent.every(r=>r.applied===0&&r.total===1));
 const files=migrationFiles();await assert.rejects(migrate('test',workspaceRoot,[{...files[0],sha256:'0'.repeat(64)}]),/history differs/);
 await assert.rejects(migrate('local',workspaceRoot,files),/isolated test/);
 await assert.rejects(migrate('test',workspaceRoot,[...files,{id:'0002',sha256:'f'.repeat(64),sql:'CREATE TABLE api.rollback_probe (id int); SELECT * FROM foundation.deliberately_missing;'}]));
 await using('migrator',async db=>{
  assert.equal((await db.query("SELECT to_regclass('api.rollback_probe') AS found")).rows[0].found,null);
  assert.equal((await db.query('SELECT count(*)::int AS count FROM foundation.migrations')).rows[0].count,1);
  for(const service of services){
   const rows=(await db.query('SELECT column_name,data_type,is_nullable,column_default FROM information_schema.columns WHERE table_schema=$1 AND table_name=$2 ORDER BY ordinal_position',[service,'foundation_probes'])).rows;
   assert.deepEqual(rows.map(r=>[r.column_name,r.data_type,r.is_nullable]),[['id','uuid','NO'],['label','character varying','NO'],['created_at','timestamp with time zone','NO']]);assert.match(rows[0].column_default,/gen_random_uuid/);assert.match(rows[2].column_default,/now/);
  }
 });
});

test('future object defaults preserve service isolation; reprovisioning rejects unexpected CREATE grants',async()=>{
 await using('migrator',async owner=>{
  try{
   await owner.query('CREATE TABLE api.future_permission_probe(id int); CREATE FUNCTION api.future_permission_probe() RETURNS int LANGUAGE SQL AS $$ SELECT 1 $$');
   await using('api',async db=>{await db.query('INSERT INTO api.future_permission_probe VALUES (1)');assert.equal((await db.query('SELECT id FROM api.future_permission_probe')).rows[0].id,1);await denied(db,'TRUNCATE api.future_permission_probe');await denied(db,'SELECT api.future_permission_probe()');});
   await using('match',db=>denied(db,'SELECT * FROM api.future_permission_probe'));
   await owner.query('GRANT CREATE ON SCHEMA api TO lorcana_test_api');
   await assert.rejects(provision(),/Managed schema provisioning failed/);
  }finally{await owner.query('REVOKE CREATE ON SCHEMA api FROM lorcana_test_api; DROP TABLE IF EXISTS api.future_permission_probe; DROP FUNCTION IF EXISTS api.future_permission_probe()');}
 });
 await provision();
});

test('provisioning rejects explicit TRUNCATE, cross-environment CONNECT and future default ACL drift',async()=>{
 await using('migrator',async db=>{
  const fixtures=[
   ['ALTER DEFAULT PRIVILEGES GRANT SELECT ON TABLES TO PUBLIC','ALTER DEFAULT PRIVILEGES REVOKE SELECT ON TABLES FROM PUBLIC'],
   ['ALTER DEFAULT PRIVILEGES GRANT SELECT ON TABLES TO lorcana_test_match','ALTER DEFAULT PRIVILEGES REVOKE SELECT ON TABLES FROM lorcana_test_match'],
   ['GRANT MAINTAIN ON api.foundation_probes TO lorcana_test_api','REVOKE MAINTAIN ON api.foundation_probes FROM lorcana_test_api'],
   ['GRANT SELECT (label) ON api.foundation_probes TO lorcana_test_api WITH GRANT OPTION','REVOKE SELECT (label) ON api.foundation_probes FROM lorcana_test_api'],
   ['GRANT TRUNCATE ON api.foundation_probes TO lorcana_test_api','REVOKE TRUNCATE ON api.foundation_probes FROM lorcana_test_api'],
   ['GRANT CONNECT ON DATABASE lorcana_app_test TO lorcana_local_api','REVOKE CONNECT ON DATABASE lorcana_app_test FROM lorcana_local_api'],
   ['ALTER DEFAULT PRIVILEGES IN SCHEMA api GRANT TRUNCATE ON TABLES TO lorcana_test_api','ALTER DEFAULT PRIVILEGES IN SCHEMA api REVOKE TRUNCATE ON TABLES FROM lorcana_test_api'],
  ];
  for(const [grant,revoke] of fixtures){try{await db.query(grant);await assert.rejects(provision(),/Managed schema provisioning failed/);}finally{await db.query(revoke);}}
 });
 await provision();
});
