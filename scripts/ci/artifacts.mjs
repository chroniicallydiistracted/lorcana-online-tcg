import { readdirSync, lstatSync, readFileSync, writeFileSync, mkdirSync, copyFileSync, existsSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { sha256 } from '../documentation-lib.mjs';
import { scanSecrets } from './security.mjs';

export const workspaces=['apps/web','apps/api','apps/match-service','apps/worker','packages/contracts','packages/design-system','packages/presentation','packages/service-runtime','packages/db'];
const metadata=['package.json','pnpm-lock.yaml','pnpm-workspace.yaml','toolchain.json'];
const reportNames=['sbom.cdx.json','dependency-audit.json','THIRD_PARTY_NOTICES.txt','pipeline.json'];
const purpose='foundation build evidence; not a deployment or BOOT-05 release contract';
export function validateIdentity(identity,toolchain,lockBytes) {
  const keys=['source_commit','source_fingerprint','lock_sha256','dirty','node','pnpm','platform','architecture','project','workspace_image_id','postgres_image'];
  if(!identity||Object.keys(identity).sort().join()!==keys.sort().join()||!/^([a-f0-9]{40}|[a-f0-9]{64})$/.test(identity.source_commit)||!/^([a-f0-9]{64})$/.test(identity.source_fingerprint)||identity.lock_sha256!==sha256(lockBytes)||typeof identity.dirty!=='boolean'||identity.node!==toolchain.node||identity.pnpm!==toolchain.pnpm||identity.postgres_image!==toolchain.postgresImage||identity.platform!=='linux'||!['x64','arm64'].includes(identity.architecture)||!/^lorcana-ci-[a-f0-9]{32}$/.test(identity.project)||!/^sha256:[a-f0-9]{64}$/.test(identity.workspace_image_id))throw new Error('Invalid artifact source/toolchain/lock identity');
}
function walk(root,prefix='') {
  if(lstatSync(join(root,prefix)).isSymbolicLink())throw new Error('Artifact refuses symbolic directories');
  const files=[];
  for(const name of readdirSync(join(root,prefix)).sort()) {
    const path=prefix?prefix+'/'+name:name,stat=lstatSync(join(root,path));
    if(stat.isSymbolicLink()||!stat.isFile()&&!stat.isDirectory())throw new Error('Artifact refuses non-regular entry');
    if(stat.isDirectory())files.push(...walk(root,path));else files.push(path);
  }
  return files;
}
function allowed(path) {
  if(typeof path!=='string'||path.includes('\\')||path.startsWith('/')||path.split('/').some(part=>['','..','.'].includes(part)))return false;
  if(metadata.some(file=>path==='build/'+file)||reportNames.includes(path))return true;
  return workspaces.some(workspace=>path==='build/'+workspace+'/package.json'||path.startsWith('build/'+workspace+'/dist/'))&&!/(?:^|\/)(?:\.env(?:\..*)?|.*\.(?:pem|key))$/.test(path);
}
export function createArtifacts(root,out,reports,identity,{knownSecrets=[]}={}) {
  if(!resolve(out).startsWith(resolve(root)+'/.local/'))throw new Error('Artifacts must use ignored local output');
  if(existsSync(join(root,'.local'))&&lstatSync(join(root,'.local')).isSymbolicLink())throw new Error('Unsafe artifact parent');
  if(existsSync(out))throw new Error('Artifact output already exists');
  mkdirSync(out,{recursive:true,mode:0o700});
  const copy=path=>{if(!lstatSync(join(root,path)).isFile()||lstatSync(join(root,path)).isSymbolicLink())throw new Error('Unsafe artifact source');const target=join(out,'build',path);mkdirSync(dirname(target),{recursive:true});copyFileSync(join(root,path),target);};
  for(const file of metadata)copy(file);
  for(const workspace of workspaces) {
    if(!existsSync(join(root,workspace,'dist'))||!existsSync(join(root,workspace,'package.json')))throw new Error('Missing workspace build: '+workspace);
    copy(workspace+'/package.json');
    const paths=walk(join(root,workspace,'dist'));
    if(!paths.length)throw new Error('Empty workspace build: '+workspace);
    for(const path of paths)copy(workspace+'/dist/'+path);
  }
  for(const name of reportNames) {
    if(reports[name]===undefined)throw new Error('Missing artifact report');
    writeFileSync(join(out,name),typeof reports[name]==='string'?reports[name]:JSON.stringify(reports[name],null,2)+'\n');
  }
  const paths=walk(out);
  if(paths.some(path=>!allowed(path)))throw new Error('Forbidden artifact path');
  if(scanSecrets(paths.map(path=>({path,bytes:readFileSync(join(out,path))})),{knownSecrets,exceptions:[]}).length)throw new Error('Secret scan rejected build/report artifacts');
  validateIdentity(identity,JSON.parse(readFileSync(join(root,'toolchain.json'))),readFileSync(join(root,'pnpm-lock.yaml')));
  const manifest={schema_version:1,created_at:new Date().toISOString(),purpose,identity,files:paths.map(path=>{const bytes=readFileSync(join(out,path));return {path,bytes:bytes.length,sha256:sha256(bytes)};})};
  writeFileSync(join(out,'manifest.json'),JSON.stringify(manifest,null,2)+'\n');
  verifyArtifacts(out,{knownSecrets});return manifest;
}
export function verifyArtifacts(out,{knownSecrets=[]}={}) {
  if(lstatSync(out).isSymbolicLink()||lstatSync(join(out,'manifest.json')).isSymbolicLink())throw new Error('Unsafe artifact root/manifest');
  const manifest=JSON.parse(readFileSync(join(out,'manifest.json')));
  if(Object.keys(manifest).sort().join()!==['schema_version','created_at','purpose','identity','files'].sort().join()||manifest.schema_version!==1||manifest.purpose!==purpose||!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(manifest.created_at)||!Array.isArray(manifest.files)||!manifest.files.length)throw new Error('Invalid artifact manifest');
  const seen=new Set();
  for(const row of manifest.files) {
    if(!allowed(row.path)||seen.has(row.path)||!/^[a-f0-9]{64}$/.test(row.sha256)||!Number.isSafeInteger(row.bytes)||row.bytes<0)throw new Error('Invalid artifact file entry');
    seen.add(row.path);
  }
  const actual=walk(out).filter(path=>path!=='manifest.json');
  if(actual.length!==seen.size||actual.some(path=>!seen.has(path)))throw new Error('Unexpected or missing artifact file');
  for(const row of manifest.files) {
    const bytes=readFileSync(join(out,row.path));
    if(bytes.length!==row.bytes||sha256(bytes)!==row.sha256)throw new Error('Artifact bytes differ from manifest');
  }
  if(reportNames.some(path=>!seen.has(path))||metadata.some(path=>!seen.has('build/'+path))||workspaces.some(workspace=>!seen.has('build/'+workspace+'/package.json')||!actual.some(path=>path.startsWith('build/'+workspace+'/dist/'))))throw new Error('Incomplete artifact scope');
  validateIdentity(manifest.identity,JSON.parse(readFileSync(join(out,'build/toolchain.json'))),readFileSync(join(out,'build/pnpm-lock.yaml')));
  if(scanSecrets([...actual,'manifest.json'].map(path=>({path,bytes:readFileSync(join(out,path))})),{knownSecrets,exceptions:[]}).length)throw new Error('Artifact pattern scan failed');
  return manifest;
}
if(process.argv[1]&&resolve(process.argv[1])===resolve(new URL(import.meta.url).pathname)) {
  try{const args=process.argv.slice(2).filter(arg=>arg!=='--');if(args.length!==1)throw new Error('Provide exactly one artifact directory');verifyArtifacts(args[0]);console.log('PASS artifact identity, scope, regular files, sizes, SHA256 and secret patterns');}catch(error){console.error(error.message);process.exitCode=1;}
}
