import assert from 'node:assert/strict';
import {readFileSync,readdirSync,statSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import net from 'node:net';
import {client} from '../../../packages/db/dist/index.js';
import {sourceFingerprint} from '../../../scripts/documentation-lib.mjs';
const json=p=>JSON.parse(readFileSync(p,'utf8'));
const root=process.cwd(),run=json('docs/validation/runs/RUN-20261019-037.json');
assert.equal(run.result,'passed');assert.equal(run.clock_discontinuity,false);assert.equal(run.source_fingerprint,sourceFingerprint(root));
const pipeline=json('.local/ci-results/lorcana-ci-5616033546d04f539ae19b9b6fb92be6/artifacts/pipeline.json');
assert.equal(pipeline.result,'passed');assert.equal(pipeline.stages.length,14);assert.ok(pipeline.stages.every(s=>s.result==='passed'));
for(const [path,expected]of Object.entries(json('.local/play04-d13-preservation.json'))){
 const bytes=readFileSync(path),mode=statSync(path).mode&0o777;
 if(createHash('sha256').update(bytes).digest('hex')!==expected.sha256||mode!==expected.mode)throw Error('Private configuration preservation failed; values withheld');
 execFileSync('git',['check-ignore','--quiet',path]);
}
assert.equal(execFileSync('git',['branch','--show-current'],{encoding:'utf8'}).trim(),'codex/play-04-d13');
assert.equal(execFileSync('git',['rev-parse','main'],{encoding:'utf8'}).trim(),'4dea392d382c950a7efa66a467a15018d3ec08a0');
const upstream='vendor/tcg-engines/upstream/';
assert.deepEqual(execFileSync('git',['diff','cda3b54','--name-only','--',upstream],{encoding:'utf8'}).trim().split('\n'),[upstream+'submodules/lorcana/packages/lorcana/lorcana-engine/src/flow/runtime-flow-config.ts']);
assert.equal(createHash('sha256').update(execFileSync('git',['show','cda3b54:'+upstream+'submodules/lorcana/packages/lorcana/lorcana-engine/src/flow/runtime-flow-config.ts'])).digest('hex'),createHash('sha256').update(readFileSync('vendor/tcg-engines/provenance/P060.original.ts')).digest('hex'));
for(let n=1;n<=5;n++){
 const path=readdirSync('packages/db/migrations').find(p=>p.startsWith(String(n).padStart(4,'0')+'-'));
 assert.deepEqual(readFileSync('packages/db/migrations/'+path),execFileSync('git',['show','cda3b54:packages/db/migrations/'+path]));
}
// Only the interrupted RUN015's exact synthetic unadvanced row is reclaimable.
// No current match/private checkpoint is printed or accepted from caller input.
const interrupted=json('docs/validation/runs/RUN-20261019-015.json');assert.equal(interrupted.failure_reason,'interrupted');
const db=client('test','match');await db.connect();let orphansRemoved=0,releasesRemoved=0,remainingMatches=0,retainedQuotaRows=0;
try{
 await db.query('BEGIN');
 const candidates=await db.query(`SELECT m.match_id FROM match.matches m JOIN match.releases r USING(release_id)
 WHERE m.match_id LIKE 'clock-storage-%' AND m.player_one='p1' AND m.player_two='p2' AND m.state_version=0
 AND m.created_at BETWEEN $1::timestamptz AND $2::timestamptz AND r.manifest->'source'->>'fingerprint'=$3
 AND NOT EXISTS(SELECT 1 FROM match.journal j WHERE j.match_id=m.match_id) FOR UPDATE OF m`,[interrupted.started_at,interrupted.finished_at,interrupted.source_fingerprint]);
 assert.ok(candidates.rowCount<=1,'Unexpected fixture ownership; refuse broad cleanup');
 for(const row of candidates.rows)orphansRemoved+=(await db.query('DELETE FROM match.matches WHERE match_id=$1 AND state_version=0',[row.match_id])).rowCount;
 const fingerprints=[...new Set(readdirSync('docs/validation/runs').filter(p=>/^RUN-20261019-\d{3}\.json$/.test(p)&&Number(p.slice(-8,-5))>=7).map(p=>json('docs/validation/runs/'+p).source_fingerprint).filter(Boolean))];
 releasesRemoved=(await db.query(`DELETE FROM match.releases r WHERE r.manifest->'source'->>'fingerprint'=ANY($1::text[])
 AND r.manifest->>'createdAt'='2000-01-01T00:00:00.000Z'
 AND NOT EXISTS(SELECT 1 FROM match.matches m WHERE m.release_id=r.release_id)`,[fingerprints])).rowCount;
 remainingMatches=Number((await db.query('SELECT count(*) AS n FROM match.matches')).rows[0].n);
 retainedQuotaRows=Number((await db.query('SELECT count(*) AS n FROM match.transport_limits')).rows[0].n);
 await db.query('COMMIT');
}catch(error){await db.query('ROLLBACK');throw error;}finally{await db.end();}
for(const port of [5173,3001,3002])await new Promise((resolve,reject)=>{const s=net.createServer();s.once('error',reject);s.listen(port,'127.0.0.1',()=>s.close(resolve));});
console.log(JSON.stringify({schema_version:1,checks:['same final executable fingerprint as isolated14-stage pass','original private bytes/mode/ignore preserved','main unchanged','only P060 upstream file changed and exact original provenance','applied0001..0005 unchanged','owned RUN015 fixture cleanup only','owned unused task release cleanup only','development ports free'],orphansRemoved,releasesRemoved,remainingMatches,retainedQuotaRows}));
