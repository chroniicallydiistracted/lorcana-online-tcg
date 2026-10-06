import assert from 'node:assert/strict';
import { test } from 'node:test';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, rmSync, cpSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
const repo = fileURLToPath(new URL('../../', import.meta.url));
let governance;
try { governance = await import('../../scripts/documentation-lib.mjs'); } catch { governance = {}; }
function fixture() {
  const root = mkdtempSync(join(tmpdir(), 'lorcana-docs-test-'));
  mkdirSync(join(root, 'docs/changes'), { recursive: true });
  mkdirSync(join(root, 'scripts'));
  cpSync(join(repo,'docs/schemas'),join(root,'docs/schemas'),{recursive:true});
  const write = (path,value) => writeFileSync(join(root,path), typeof value === 'string' ? value : JSON.stringify(value,null,2)+'\n');
  write('package.json',{scripts:{check:'node scripts/app.mjs'},engines:{node:'24.21.0',pnpm:'10.33.0'}});
  write('scripts/app.mjs','export function ping() { return "foundation"; }\n');
  write('README.md','# Fixture\n\nCurrent fixture behavior.\n');
  write('docs/features.json',{schema_version:1,features:[{id:'F-TEST',name:'Fixture',implementation:'implemented',verification:'pending',description:'Fixture behavior',sources:['scripts/app.mjs'],documents:['README.md'],task_ids:['DOC-01'],requirement_ids:[],evidence:[]}]});
  write('docs/documentation-map.json',{schema_version:1,documents:[{path:'README.md',classification:'current',sources:['scripts/app.mjs','package.json']},{path:'docs/features.json',classification:'current',sources:['scripts/app.mjs']},{path:'docs/documentation-map.json',classification:'current',sources:[]},{path:'docs/schemas/**',classification:'current',sources:[]},{path:'docs/changes/**',classification:'history',sources:[]},{path:'docs/current-state.json',classification:'generated',sources:[]},{path:'CHANGELOG.md',classification:'generated',sources:[]}]});
  const change={schema_version:1,id:'CHG-20261006-001',title:'Fixture foundation',actor:'test fixture',status:'finalized',recorded_at:'2026-10-06T18:00:00.000Z',occurred_at:null,event_time_basis:'recorded_only',source_commit:null,task_ids:['DOC-01'],requirement_ids:[],feature_ids:['F-TEST'],changes:[{kind:'implementation',description:'Fixture behavior'}],files:['scripts/app.mjs','package.json','README.md','docs/features.json','docs/documentation-map.json',...['change','features','documentation-map','run','state'].map(name=>'docs/schemas/'+name+'.schema.json')],documentation_reviews:[{path:'README.md',disposition:'updated',reason:'Fixture documented'}],verification:[],limitations:['Test fixture only'],next_actions:[]};
  write('docs/changes/'+change.id+'.json',change);
  return {root,write,change,cleanup:()=>rmSync(root,{recursive:true,force:true})};
}
test('new documentation governance exposes real validation and sync operations',()=>{
  assert.equal(typeof governance.checkDocumentation,'function');
  assert.equal(typeof governance.syncDocumentation,'function');
});
test('source drift requires a covering change and review of impacted documentation',()=>{
  const f=fixture();try {
    governance.syncDocumentation(f.root,f.change.id,{initialize:true});
    governance.checkDocumentation(f.root);
    f.write('scripts/app.mjs','export function ping() { return "changed"; }\n');
    assert.throws(()=>governance.checkDocumentation(f.root),/stale/i);
    const next={...f.change,id:'CHG-20261006-002',files:['scripts/app.mjs'],documentation_reviews:[]};
    f.write('docs/changes/'+next.id+'.json',next);
    assert.throws(()=>governance.syncDocumentation(f.root,next.id),/documentation review/i);
    next.documentation_reviews=[...f.change.documentation_reviews.map(row=>({...row,disposition:'reviewed_unchanged',reason:'Return contract remains the same'})),{path:'docs/features.json',disposition:'reviewed_unchanged',reason:'Fixture feature remains implemented'}];
    f.write('docs/changes/'+next.id+'.json',next);
    governance.syncDocumentation(f.root,next.id);
    governance.checkDocumentation(f.root);
    const state=JSON.parse(readFileSync(join(f.root,'docs/current-state.json'),'utf8'));
    assert.ok(state.functions.some(fn=>fn.name==='ping' && fn.file==='scripts/app.mjs'));
  }finally{f.cleanup();}
});
test('unclassified and missing documents fail rather than disappear from the audit',()=>{
  const f=fixture();try {
    governance.syncDocumentation(f.root,f.change.id,{initialize:true});
    f.write('docs/forgotten.md','# Forgotten\n');
    assert.throws(()=>governance.checkDocumentation(f.root),/unclassified/i);
    rmSync(join(f.root,'docs/forgotten.md'));
    rmSync(join(f.root,'README.md'));
    assert.throws(()=>governance.checkDocumentation(f.root),/missing|stale/i);
  }finally{f.cleanup();}
});
test('change records reject unqualified timestamps and historical execution inventions',()=>{
  const f=fixture();try {
    assert.throws(()=>governance.validateData(f.root,'change',{...f.change,recorded_at:'yesterday'}),/schema|timestamp/i);
    assert.throws(()=>governance.validateData(f.root,'change',{...f.change,extra:'universal means exact keys'}),/schema/i);
  }finally{f.cleanup();}
});
test('a newly changed source cannot be refreshed by replaying an old finalized record',()=>{
  const f=fixture();try {
    governance.syncDocumentation(f.root,f.change.id,{initialize:true});
    f.write('scripts/app.mjs','export function ping() { return "undocumented change"; }\n');
    assert.throws(()=>governance.syncDocumentation(f.root,f.change.id),/new change record/i);
  }finally{f.cleanup();}
});
test('documentation edits and newly added source files require recorded coverage',()=>{
  const f=fixture();try {
    governance.syncDocumentation(f.root,f.change.id,{initialize:true});
    f.write('README.md','# Changed without history\n');
    assert.throws(()=>governance.checkDocumentation(f.root),/stale/i);
    f.write('scripts/new.mjs','export const newFunction=()=>true;\n');
    const next={...f.change,id:'CHG-20261006-002',files:['README.md'],documentation_reviews:[]};
    f.write('docs/changes/'+next.id+'.json',next);
    assert.throws(()=>governance.syncDocumentation(f.root,next.id),/Unrecorded changed file: scripts\/new/i);
  }finally{f.cleanup();}
});
test('claimed passing evidence requires a real run and unchanged log digest',()=>{
  const f=fixture();try {
    f.change.verification=[{evidence:'README.md',outcome:'passed',scope:'An assertion is not executed evidence'}];
    f.write('docs/changes/'+f.change.id+'.json',f.change);
    assert.throws(()=>governance.syncDocumentation(f.root,f.change.id),/falsely reports/i);
  }finally{f.cleanup();}
});

test('committed finalized history cannot be changed or deleted',()=>{
  const f=fixture();try {
    governance.syncDocumentation(f.root,f.change.id,{initialize:true});
    const run=(args)=>{const result=spawnSync('git',args,{cwd:f.root,encoding:'utf8'});assert.equal(result.status,0,result.stderr);};
    run(['init','--quiet']);run(['add','.']);run(['-c','user.name=Documentation test','-c','user.email=test@example.invalid','commit','--quiet','-m','Fixture baseline']);
    f.change.title='Rewritten sealed history';f.write('docs/changes/'+f.change.id+'.json',f.change);
    assert.throws(()=>governance.checkDocumentation(f.root),/sealed/i);
    rmSync(join(f.root,'docs/changes/'+f.change.id+'.json'));
    assert.throws(()=>governance.checkDocumentation(f.root),/sealed/i);
  }finally{f.cleanup();}
});
test('log tampering and exit status contradictions invalidate execution evidence',()=>{
  const f=fixture();try {
    mkdirSync(join(f.root,'docs/validation/runs'),{recursive:true});mkdirSync(join(f.root,'docs/validation/logs'),{recursive:true});
    const map=JSON.parse(readFileSync(join(f.root,'docs/documentation-map.json'),'utf8'));
    map.documents.push({path:'docs/validation/runs/**',classification:'evidence',sources:[]},{path:'docs/validation/logs/**',classification:'evidence',sources:[]});f.write('docs/documentation-map.json',map);
    const run={schema_version:1,id:'RUN-20261006-001',category:'container',command:['fixture'],cwd:f.root,environment:{},source_commit:null,source_fingerprint:governance.sourceFingerprint(f.root),started_at:'2026-10-06T18:00:00Z',finished_at:'2026-10-06T18:00:01Z',recorded_at:'2026-10-06T18:00:01Z',time_precision:'exact',elapsed_ms:1000,clock_discontinuity:false,expected_exit_code:0,exit_code:0,signal:null,result:'passed',failure_reason:null,summary:'Fixture metadata',log_path:'docs/validation/logs/RUN-20261006-001.txt',log_sha256:governance.sha256('actual output'),redactions:0};
    f.write(run.log_path,'actual output');const path='docs/validation/runs/'+run.id+'.json';delete run.elapsed_ms;delete run.clock_discontinuity;f.write(path,run);assert.throws(()=>governance.syncDocumentation(f.root,f.change.id),/monotonic capture/i);run.elapsed_ms=1000;run.clock_discontinuity=false;
    f.write(run.log_path,'tampered output');f.write(path,run);
    assert.throws(()=>governance.syncDocumentation(f.root,f.change.id),/digest mismatch/i);
    f.write(run.log_path,'actual output');run.exit_code=1;f.write('docs/validation/runs/'+run.id+'.json',run);
    assert.throws(()=>governance.syncDocumentation(f.root,f.change.id),/contradicts/i);
    run.exit_code=0;run.time_precision='clock_discontinuous';run.elapsed_ms=20_000;run.clock_discontinuity=true;run.failure_reason='clock_changed';f.write('docs/validation/runs/'+run.id+'.json',run);
    assert.throws(()=>governance.syncDocumentation(f.root,f.change.id),/discontinuous clock cannot/i);
    run.time_precision='exact';run.failure_reason=null;run.clock_discontinuity=false;run.elapsed_ms=100;run.started_at='2026-10-06T18:00:00Z';run.finished_at='2026-10-06T18:00:01Z';run.recorded_at='2026-10-06T18:00:01Z';run.elapsed_ms=1;run.finished_at='2026-10-06T18:00:10Z';run.recorded_at='2026-10-06T18:00:10Z';f.write('docs/validation/runs/'+run.id+'.json',run);assert.throws(()=>governance.syncDocumentation(f.root,f.change.id),/samples contradict/i);
    run.result='failed';run.started_at='2026-10-06T18:00:11Z';run.time_precision='clock_discontinuous';run.clock_discontinuity=true;run.failure_reason='clock_changed';run.elapsed_ms=1000;f.write('docs/validation/runs/'+run.id+'.json',run);
    governance.syncDocumentation(f.root,f.change.id,{initialize:true});
  }finally{f.cleanup();}
});
test('deleting a snapshot cannot reset the review ledger or replay finalized history',()=>{
  const f=fixture();try {
    governance.syncDocumentation(f.root,f.change.id,{initialize:true});
    rmSync(join(f.root,'docs/current-state.json'));f.write('scripts/app.mjs','export const undocumented=()=>true;\n');
    assert.throws(()=>governance.syncDocumentation(f.root,f.change.id),/missing snapshot|restore/i);
  }finally{f.cleanup();}
});
test('removing old source-impact edges cannot erase required documentation reviews',()=>{
  const f=fixture();try {
    governance.syncDocumentation(f.root,f.change.id,{initialize:true});
    const map=JSON.parse(readFileSync(join(f.root,'docs/documentation-map.json'),'utf8'));
    for(const row of map.documents)row.sources=[];f.write('docs/documentation-map.json',map);
    f.write('scripts/app.mjs','export const changed=()=>true;\n');
    const next={...f.change,id:'CHG-20261006-002',files:['scripts/app.mjs','docs/documentation-map.json'],documentation_reviews:[]};f.write('docs/changes/'+next.id+'.json',next);
    assert.throws(()=>governance.syncDocumentation(f.root,next.id),/missing documentation review/i);
  }finally{f.cleanup();}
});
test('committing a rewrite does not make sealed history valid',()=>{
  const f=fixture();try {
    governance.syncDocumentation(f.root,f.change.id,{initialize:true});
    const run=(args)=>{const result=spawnSync('git',args,{cwd:f.root,encoding:'utf8'});assert.equal(result.status,0,result.stderr);};
    run(['init','--quiet']);run(['add','.']);run(['-c','user.name=Test','-c','user.email=test@example.invalid','commit','--quiet','-m','Original']);
    f.change.title='Rewrite committed first';f.write('docs/changes/'+f.change.id+'.json',f.change);
    run(['add','.']);run(['-c','user.name=Test','-c','user.email=test@example.invalid','commit','--quiet','-m','Rewrite']);
    assert.throws(()=>governance.checkDocumentation(f.root),/sealed/i);
    f.change.title='Fixture foundation';f.write('docs/changes/'+f.change.id+'.json',f.change);
    rmSync(join(f.root,'docs/current-state.json'));
    assert.throws(()=>governance.syncDocumentation(f.root,f.change.id,{initialize:true}),/restore|snapshot/i);
  }finally{f.cleanup();}
});
test('executed passing evidence needs a log and consistent execution/recording times',()=>{
  const f=fixture();try {
    mkdirSync(join(f.root,'docs/validation/runs'),{recursive:true});mkdirSync(join(f.root,'docs/validation/logs'),{recursive:true});
    const map=JSON.parse(readFileSync(join(f.root,'docs/documentation-map.json'),'utf8'));map.documents.push({path:'docs/validation/runs/**',classification:'evidence',sources:[]},{path:'docs/validation/logs/**',classification:'evidence',sources:[]});f.write('docs/documentation-map.json',map);
    const run={schema_version:1,id:'RUN-20261006-001',category:'container',command:['fixture'],cwd:f.root,environment:{},source_commit:null,source_fingerprint:governance.sourceFingerprint(f.root),started_at:'2026-10-06T18:00:00Z',finished_at:'2026-10-06T18:00:01Z',recorded_at:'2026-10-06T18:00:01Z',time_precision:'exact',elapsed_ms:1000,clock_discontinuity:false,expected_exit_code:0,exit_code:0,signal:null,result:'passed',failure_reason:null,summary:'Fixture',log_path:null,log_sha256:null,redactions:0};
    const path='docs/validation/runs/'+run.id+'.json';f.write(path,run);
    assert.throws(()=>governance.syncDocumentation(f.root,f.change.id,{initialize:true}),/incomplete/i);
    run.log_path='docs/validation/logs/'+run.id+'.txt';run.log_sha256=governance.sha256('output');f.write(run.log_path,'output');run.started_at='2099-01-01T00:00:00Z';run.finished_at='2099-01-01T00:00:01Z';f.write(path,run);
    assert.throws(()=>governance.syncDocumentation(f.root,f.change.id,{initialize:true}),/time contradiction/i);
  }finally{f.cleanup();}
});

test('isolated branches are not required to contain unrelated scope history',()=>{
  const f=fixture();try {
    governance.syncDocumentation(f.root,f.change.id,{initialize:true});
    const run=(args)=>{const result=spawnSync('git',args,{cwd:f.root,encoding:'utf8'});assert.equal(result.status,0,result.stderr);return result.stdout.trim();};
    run(['init','--quiet']);run(['add','.']);run(['-c','user.name=Test','-c','user.email=test@example.invalid','commit','--quiet','-m','Baseline']);
    const base=run(['rev-parse','HEAD']);run(['checkout','--quiet','-b','other-scope']);
    const other={...f.change,id:'CHG-20261006-002',title:'Other branch scope'};f.write('docs/changes/'+other.id+'.json',other);
    run(['add','.']);run(['-c','user.name=Test','-c','user.email=test@example.invalid','commit','--quiet','-m','Other scope']);run(['checkout','--quiet','--detach',base]);
    governance.checkDocumentation(f.root);
    f.change.source_commit='a'.repeat(40);f.write('docs/changes/'+f.change.id+'.json',f.change);
    assert.throws(()=>governance.checkDocumentation(f.root),/not reachable/i);
  }finally{f.cleanup();}
});

test('a misspelled documentation impact path cannot silently disable reviews',()=>{
  const f=fixture();try {
    const map=JSON.parse(readFileSync(join(f.root,'docs/documentation-map.json'),'utf8'));map.documents[0].sources=['scripts/app.mj'];f.write('docs/documentation-map.json',map);
    assert.throws(()=>governance.syncDocumentation(f.root,f.change.id,{initialize:true}),/missing documentation impact source/i);
  }finally{f.cleanup();}
});

test('human device reports preserve verdict without inventing process exit or machine verification',()=>{
  const f=fixture();try {
    mkdirSync(join(f.root,'docs/validation/runs'),{recursive:true});mkdirSync(join(f.root,'docs/validation/logs'),{recursive:true});
    const map=JSON.parse(readFileSync(join(f.root,'docs/documentation-map.json'),'utf8'));map.documents.push({path:'docs/validation/runs/**',classification:'evidence',sources:[]},{path:'docs/validation/logs/**',classification:'evidence',sources:[]});f.write('docs/documentation-map.json',map);
    const run={schema_version:1,id:'RUN-20261006-001',category:'manual_device',command:[],cwd:f.root,environment:{os:'synthetic fixture',browser:'synthetic fixture'},source_commit:null,source_fingerprint:governance.sourceFingerprint(f.root),started_at:null,finished_at:null,recorded_at:'2026-10-06T18:00:01Z',time_precision:'unknown',expected_exit_code:null,exit_code:null,signal:null,result:'reported',failure_reason:null,summary:'Synthetic convention only; no real device test',log_path:'docs/validation/logs/RUN-20261006-001.txt',log_sha256:governance.sha256('Synthetic observation fixture'),redactions:0,observation:{reporter:'synthetic test observer',verdict:'passed',steps:['Synthetic report fixture']}};
    f.write(run.log_path,'Synthetic observation fixture');const path='docs/validation/runs/'+run.id+'.json';f.write(path,run);
    f.change.verification=[{evidence:path,outcome:'reported',scope:'Synthetic convention, not Windows acceptance'}];f.write('docs/changes/'+f.change.id+'.json',f.change);
    governance.syncDocumentation(f.root,f.change.id,{initialize:true});governance.checkDocumentation(f.root);
    run.recorded_at='2099-01-01T00:00:00Z';f.write(path,run);assert.throws(()=>governance.checkDocumentation(f.root),/timestamp.*future/i);
    run.recorded_at='2026-10-06T18:00:01Z';run.result='not_run';f.write(path,run);f.change.verification=[];f.write('docs/changes/'+f.change.id+'.json',f.change);assert.throws(()=>governance.checkDocumentation(f.root),/not_run cannot claim/i);
    run.result='reported';f.write(path,run);f.change.verification=[{evidence:path,outcome:'reported',scope:'Synthetic honest report'}];f.write('docs/changes/'+f.change.id+'.json',f.change);
    run.exit_code=0;f.write(path,run);assert.throws(()=>governance.checkDocumentation(f.root),/cannot invent/i);
    run.exit_code=null;f.write(path,run);const features=JSON.parse(readFileSync(join(f.root,'docs/features.json'),'utf8'));features.features[0].verification='verified';features.features[0].evidence=[path];f.write('docs/features.json',features);assert.throws(()=>governance.checkDocumentation(f.root),/matching executed evidence/i);
  }finally{f.cleanup();}
});
