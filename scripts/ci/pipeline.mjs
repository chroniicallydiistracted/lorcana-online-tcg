import { readFileSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { sourceFingerprint, sha256 } from '../documentation-lib.mjs';
import { dependencyReports, sourceSecretScan } from './security.mjs';
import { createArtifacts } from './artifacts.mjs';

export function assertIsolation(env,marker) {
  if(env.LORCANA_CI_ISOLATED!=='1'||env.APP_ENV!=='local'||env.PGHOST!=='postgres'||env.PGPORT!=='5432'||env.POSTGRES_DB!=='lorcana_ci_bootstrap'||!/^lorcana-ci-[a-f0-9]{32}$/.test(marker?.project))throw new Error('CI requires a disposable project and separate generated bootstrap target; use the host launcher');
}
export function runStages(stages,execute) {
  const reports=[];
  for(const [name,command] of stages) {
    const start=new Date().toISOString(),clock=performance.now();execute(command,name);
    reports.push({name,command,started_at:start,finished_at:new Date().toISOString(),elapsed_ms:Math.round(performance.now()-clock),result:'passed'});
  }
  return reports;
}
export function pipeline(root,env=process.env) {
  const marker=JSON.parse(readFileSync(join(root,'.local/ci-isolation.json')));assertIsolation(env,marker);
  const fingerprint=sourceFingerprint(root),knownSecrets=[env.POSTGRES_PASSWORD];
  sourceSecretScan(root,knownSecrets);
  const stages=[
    ['frozen-install',['pnpm','install','--frozen-lockfile']],
    ['doctor',['pnpm','run','doctor']],
    ['foundation',['pnpm','verify:foundation']],
    ['bootstrap-database',['pnpm','db:check']],
    ['restricted-database',['pnpm','db:provision']],
    ['local-migration',['pnpm','db:migrate','--','--target','local']],
    ['test-migration',['pnpm','db:migrate','--','--target','test']],
    ['local-identities',['pnpm','db:health','--','--target','local']],
    ['test-identities',['pnpm','db:health','--','--target','test']],
    ['live-database',['pnpm','db:test']],
    ['pinned-chromium',['pnpm','--filter','@lorcana/web','exec','playwright','install','chromium']],
    ['browser',['pnpm','test:e2e:smoke']],
  ];
  const reports=runStages(stages,(command,name)=>{
    console.log('CI stage: '+name);
    const result=spawnSync(command[0],command.slice(1),{cwd:root,env,stdio:'inherit',timeout:600_000});
    if(result.error||result.status!==0||result.signal)throw new Error('CI stage failed: '+name);
  });
  if(existsSync(join(root,'.local/database.json')))knownSecrets.push(...Object.values(JSON.parse(readFileSync(join(root,'.local/database.json'))).passwords).flatMap(roles=>Object.values(roles)));
  sourceSecretScan(root,knownSecrets);
  const dependencies=dependencyReports(root);
  const git=spawnSync('git',['rev-parse','HEAD'],{cwd:root,encoding:'utf8'}),status=spawnSync('git',['status','--porcelain'],{cwd:root,encoding:'utf8'});
  if(git.status!==0||status.status!==0||sourceFingerprint(root)!==fingerprint)throw new Error('CI source identity changed');
  const identity={source_commit:git.stdout.trim(),source_fingerprint:fingerprint,lock_sha256:sha256(readFileSync(join(root,'pnpm-lock.yaml'))),dirty:Boolean(status.stdout.trim()),node:process.versions.node,pnpm:'10.33.0',platform:process.platform,architecture:process.arch,project:marker.project,workspace_image_id:marker.workspace_image_id,postgres_image:JSON.parse(readFileSync(join(root,'toolchain.json'))).postgresImage};
  createArtifacts(root,join(root,'.local/ci-artifacts'),{...dependencies,'pipeline.json':{schema_version:1,result:'passed',stages:reports,source_scan:'passed',dependency_scans:'passed',limitations:['Local/headless foundation evidence only; no deployment or Windows/GPU qualification.']}},identity,{knownSecrets});
  console.log('Artifact manifest SHA256 '+sha256(readFileSync(join(root,'.local/ci-artifacts/manifest.json'))));
  console.log('PASS CI pipeline, actual disposable PostgreSQL/browser checks and sanitized identified artifacts');
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url)) {
  try{pipeline(fileURLToPath(new URL('../../',import.meta.url)));}catch(error){console.error(error.message);process.exitCode=1;}
}
