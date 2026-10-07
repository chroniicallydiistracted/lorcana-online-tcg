import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync, symlinkSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { sha256 } from '../../scripts/documentation-lib.mjs';
import { scanSecrets, validateAudit, allowedLicense, sourceSecretScan } from '../../scripts/ci/security.mjs';
import { createArtifacts, verifyArtifacts } from '../../scripts/ci/artifacts.mjs';
import { assertIsolation, runStages } from '../../scripts/ci/pipeline.mjs';

test('secret findings contain paths/rules, never credential values; narrow exceptions cannot hide changed credentials', () => {
  const secret='ghp_'+'z'.repeat(36), uri='postgresql'+'://user:fixture-password@host/db';
  const files=[{path:'src/value.ts',bytes:Buffer.from(secret+' '+uri)}];
  const found=scanSecrets(files,{knownSecrets:[secret]});
  assert.ok(found.length>=2);assert.ok(!JSON.stringify(found).includes(secret));
  assert.equal(scanSecrets([{path:'src/ok.ts',bytes:Buffer.from('public')}]).length,0);
  assert.equal(scanSecrets([{path:'.env.local',bytes:Buffer.from('public')}]).length,1);
  assert.ok(scanSecrets([{path:'tests/fixture.py',bytes:Buffer.from(uri)}],{exceptions:[{path:'tests/fixture.py',rule:'database_uri',sha256:'0'.repeat(64)}]}).length);
});
test('license and advisory gates reject unknown policy and unavailable/malformed responses', () => {
  assert.equal(allowedLicense('MIT'),true);assert.equal(allowedLicense('UNLICENSED'),false);assert.equal(allowedLicense('MIT OR Proprietary'),false);
  const clean={advisories:{},metadata:{vulnerabilities:{info:0,low:0,moderate:0,high:0,critical:0}}};
  assert.doesNotThrow(()=>validateAudit(clean,0));
  assert.throws(()=>validateAudit({},0));assert.throws(()=>validateAudit(clean,1));
  assert.throws(()=>validateAudit({...clean,metadata:{vulnerabilities:{...clean.metadata.vulnerabilities,high:1}}},1));
  assert.throws(()=>validateAudit({...clean,advisories:{x:{severity:'critical'}}},0));
  assert.throws(()=>validateAudit({...clean,advisories:{x:{severity:'low'}}},0));
  assert.throws(()=>validateAudit({...clean,metadata:{vulnerabilities:{...clean.metadata.vulnerabilities,low:1}}},1));
});
function fixture(t) {
  const root=mkdtempSync(join(tmpdir(),'ci-artifact-')),out=join(root,'.local/artifacts');t.after(()=>rmSync(root,{recursive:true,force:true}));
  for(const file of ['apps/web','apps/api','apps/match-service','apps/worker','packages/contracts','packages/design-system','packages/presentation','packages/service-runtime','packages/db'].flatMap(workspace=>[workspace+'/package.json',workspace+'/dist/index.js'])) {mkdirSync(join(root,file,'..'),{recursive:true});writeFileSync(join(root,file),'synthetic');}
  for(const file of ['package.json','pnpm-lock.yaml','pnpm-workspace.yaml'])writeFileSync(join(root,file),'{}');
  const toolchain=JSON.parse(readFileSync(new URL('../../toolchain.json',import.meta.url)));writeFileSync(join(root,'toolchain.json'),JSON.stringify(toolchain));
  const identity={source_commit:'a'.repeat(40),source_fingerprint:'b'.repeat(64),lock_sha256:sha256('{}'),dirty:true,node:toolchain.node,pnpm:toolchain.pnpm,platform:'linux',architecture:'x64',project:'lorcana-ci-'+'a'.repeat(32),workspace_image_id:'sha256:'+'a'.repeat(64),postgres_image:toolchain.postgresImage};
  return {root,out,identity,reports:{'sbom.cdx.json':{bomFormat:'CycloneDX'},'dependency-audit.json':{result:'passed'},'THIRD_PARTY_NOTICES.txt':'Synthetic notices','pipeline.json':{result:'passed'}}};
}
test('artifact verification rejects tampered bytes, missing/extra/private paths and symlinks', t => {
  const {root,out,reports,identity}=fixture(t);createArtifacts(root,out,reports,identity);
  assert.doesNotThrow(()=>verifyArtifacts(out));
  writeFileSync(join(out,'build/apps/web/dist/index.js'),'tampered');assert.throws(()=>verifyArtifacts(out));
  rmSync(out,{recursive:true});createArtifacts(root,out,reports,identity);writeFileSync(join(out,'.env.local'),'public');assert.throws(()=>verifyArtifacts(out));
  rmSync(join(out,'.env.local'));symlinkSync('/etc/hostname',join(out,'extra'));assert.throws(()=>verifyArtifacts(out));
});
test('manifest traversal, duplicate and missing entries are rejected', t => {
  const {root,out,reports,identity}=fixture(t);createArtifacts(root,out,reports,identity);
  const path=join(out,'manifest.json'),original=JSON.parse(readFileSync(path));
  for(const files of [[{path:'../escape',sha256:'0'.repeat(64),bytes:0}],[...original.files,original.files[0]],original.files.slice(1)]){
    writeFileSync(path,JSON.stringify({...original,files}));assert.throws(()=>verifyArtifacts(out));
  }
});
test('artifact manifest needs source identity and matching lock hash; metadata secrets are scanned', t => {
  const {root,out,reports,identity}=fixture(t);createArtifacts(root,out,reports,identity);
  const path=join(out,'manifest.json'),original=JSON.parse(readFileSync(path));
  const missing={...original};delete missing.identity;writeFileSync(path,JSON.stringify(missing));assert.throws(()=>verifyArtifacts(out));
  writeFileSync(path,JSON.stringify({...original,identity:{...original.identity,lock_sha256:'0'.repeat(64)}}));assert.throws(()=>verifyArtifacts(out));
  writeFileSync(path,JSON.stringify({...original,identity:{...original.identity,synthetic_secret:'ghp_'+'z'.repeat(36)}}));assert.throws(()=>verifyArtifacts(out));
});
test('documented artifact command accepts the pnpm argument separator', t => {
  const {root,out,reports,identity}=fixture(t);createArtifacts(root,out,reports,identity);
  const result=spawnSync('pnpm',['ci:artifacts','--',out],{encoding:'utf8'});
  assert.equal(result.status,0,result.stderr);
});
test('pipeline rejects ordinary local database and propagates failing stages without running later stages', () => {
  assert.throws(()=>assertIsolation({APP_ENV:'local',PGHOST:'postgres',PGPORT:'5432',POSTGRES_DB:'lorcana_local'},{}));
  assert.doesNotThrow(()=>assertIsolation({LORCANA_CI_ISOLATED:'1',APP_ENV:'local',PGHOST:'postgres',PGPORT:'5432',POSTGRES_DB:'lorcana_ci_bootstrap'},{project:'lorcana-ci-'+'a'.repeat(32)}));
  let after=false;const stages=[['failure',['false']],['after',['true']]];
  assert.throws(()=>runStages(stages,(_command,name)=>{if(name==='failure')throw new Error('fixture');after=true;}));assert.equal(after,false);
});
test('a shallow repository cannot bypass full-history qualification', t => {
  const temp=mkdtempSync(join(tmpdir(),'ci-history-'));t.after(()=>rmSync(temp,{recursive:true,force:true}));
  const root=join(temp,'origin'),copy=join(temp,'copy');mkdirSync(root);
  const git=(args,cwd=root)=>{const result=spawnSync('git',args,{cwd,encoding:'utf8'});assert.equal(result.status,0,result.stderr);};
  git(['init']);git(['config','user.email','fixture@example.invalid']);git(['config','user.name','CI fixture']);
  writeFileSync(join(root,'public.txt'),'public');git(['add','.']);git(['commit','-m','fixture']);
  git(['clone','--depth','1','file://'+root,copy]);
  assert.throws(()=>sourceSecretScan(copy),/full Git history|shallow/);
});
