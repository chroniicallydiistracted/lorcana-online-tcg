import { readFileSync, readdirSync, lstatSync, realpathSync } from 'node:fs';
import { join, resolve, relative } from 'node:path';
import { spawnSync } from 'node:child_process';
import { sha256, inventory } from '../documentation-lib.mjs';

const policy=JSON.parse(readFileSync(new URL('./policy.json',import.meta.url)));
const patterns=[
  ['private_key',/-----BEGIN (?:[A-Z]+ )*PRIVATE KEY-----[\s\S]*?-----END (?:[A-Z]+ )*PRIVATE KEY-----/g],
  ['github_token',/\b(?:gh[pousr]_[A-Za-z0-9]{36,255}|github_pat_[A-Za-z0-9_]{50,255})\b/g],
  ['aws_access_key',/\b(?:AKIA|ASIA)[A-Z0-9]{16}\b/g],
  ['database_uri',/postgres(?:ql)?:\/\/[^:\s/]+:([^@\s]+)@[^\s'"\\]+/g],
];
export function scanSecrets(files,{knownSecrets=[],exceptions=policy.secret_fixture_exceptions}={}) {
  const found=[];
  for(const {path,bytes} of files) {
    if(/(?:^|\/)(?:\.env(?:\..*)?|.*\.(?:pem|key))$/.test(path)&&path!=='.env.example'||path.startsWith('.local/')) {found.push({path,rule:'private_path'});continue;}
    const text=bytes.toString('utf8');
    if(knownSecrets.some(value=>value.length>=16&&text.includes(value)))found.push({path,rule:'known_credential'});
    for(const [rule,regex] of patterns)for(const match of text.matchAll(regex)) {
      if(rule==='database_uri'&&match[1]==='[REDACTED]')continue;
      if(!exceptions.some(row=>row.path===path&&row.rule===rule&&row.sha256===sha256(match[0])))found.push({path,rule});
    }
  }
  return found;
}
export const allowedLicense=license=>policy.allowed_licenses.includes(license);
export function validateAudit(report,status) {
  const counts=report?.metadata?.vulnerabilities;
  if(!counts||!report.advisories||typeof report.advisories!=='object'||Array.isArray(report.advisories)||report.error)throw new Error('Advisory response unavailable or malformed');
  for(const severity of ['info','low','moderate','high','critical'])if(!Number.isSafeInteger(counts[severity])||counts[severity]<0)throw new Error('Malformed advisory counts');
  const advisories=Object.values(report.advisories);
  if(Object.keys(counts).length!==5||status!==(advisories.length?1:0)||['info','low','moderate','high','critical'].some(severity=>Boolean(counts[severity])!==advisories.some(row=>row.severity===severity)))throw new Error('Contradictory advisory counts or exit');
  if(![0,1].includes(status)||counts.high||counts.critical||Object.values(report.advisories).some(row=>!['info','low','moderate','high','critical'].includes(row.severity)||['high','critical'].includes(row.severity)))throw new Error('Advisory policy rejected dependencies');
  if(status!==0&&Object.values(counts).every(count=>count===0))throw new Error('Advisory command failed without a valid finding');
  return counts;
}
function jsonCommand(root,command,args,accepted=[0]) {
  const result=spawnSync(command,args,{cwd:root,encoding:'utf8',maxBuffer:20_000_000,timeout:120_000});
  if(result.error||!accepted.includes(result.status))throw new Error('Dependency metadata command failed: '+command+' '+args[0]);
  try{return {value:JSON.parse(result.stdout),status:result.status};}catch{throw new Error('Malformed dependency metadata');}
}
function installedPackages(root) {
  const base=join(root,'node_modules/.pnpm'),rows=new Map();
  for(const store of readdirSync(base,{withFileTypes:true}).filter(row=>row.isDirectory()&&row.name!=='node_modules')) {
    const folder=join(base,store.name,'node_modules');
    for(const entry of readdirSync(folder,{withFileTypes:true})) {
      if(!entry.isDirectory()||entry.isSymbolicLink()||entry.name.startsWith('.'))continue;
      const paths=entry.name.startsWith('@')?readdirSync(join(folder,entry.name),{withFileTypes:true}).filter(row=>row.isDirectory()&&!row.isSymbolicLink()).map(row=>join(folder,entry.name,row.name)):[join(folder,entry.name)];
      for(const path of paths) {
        safeDependencyPath(root,path);
        const pkg=JSON.parse(readFileSync(join(path,'package.json'))),key=pkg.name+'@'+pkg.version;
        rows.set(key,{pkg,path});
      }
    }
  }
  if(!rows.size)throw new Error('Installed dependency graph empty');
  return rows;
}
export function dependencyReports(root) {
  const listed=jsonCommand(root,'pnpm',['licenses','list','--json']).value,installed=installedPackages(root);
  const lock=jsonCommand(root,'python3',['-c','import yaml,json;print(json.dumps(yaml.safe_load(open("pnpm-lock.yaml"))["packages"]))']).value;
  const components=[],notices=[],gaps=[],observed=new Set();
  for(const packages of Object.values(listed)) {
    if(!Array.isArray(packages))throw new Error('Malformed license response');
    for(const pkg of packages)for(const version of pkg.versions??[]) {
      const key=pkg.name+'@'+version,row=installed.get(key);
      if(!row||observed.has(key)||!allowedLicense(pkg.license))throw new Error('Dependency license or installed coverage rejected: '+key);
      const integrity=lock[key]?.resolution?.integrity;
      if(typeof integrity!=='string'||!/^sha512-[A-Za-z0-9+/]+={0,2}$/.test(integrity))throw new Error('Missing frozen dependency integrity: '+key);
      const noticeFiles=readdirSync(row.path).filter(name=>/^(?:licen[sc]e|copying|notice)(?:[._-]|$)/i.test(name));
      notices.push('\n=== '+key+' | '+pkg.license+' ===\n');
      if(!noticeFiles.length) {gaps.push(key);notices.push('Published package supplies license metadata only; no root license/notice file. Distribution legal qualification remains pending.\n');}
      for(const name of noticeFiles) {
        const file=join(row.path,name),stat=lstatSync(file);
        if(!stat.isFile()||stat.isSymbolicLink()||stat.size>2_000_000)throw new Error('Unsafe dependency notice: '+key);
        notices.push(name+'\n'+readFileSync(file,'utf8')+'\n');
      }
      components.push({type:'library','bom-ref':key,name:pkg.name,version,purl:'pkg:npm/'+(pkg.name.startsWith('@')?'%40'+pkg.name.slice(1):pkg.name)+'@'+version,licenses:[{license:{id:pkg.license}}],hashes:[{alg:'SHA-512',content:Buffer.from(integrity.slice(7),'base64').toString('hex')}],properties:[{name:'lorcana:coverage',value:'installed-linux-build-test-runtime'}]});
      observed.add(key);
    }
  }
  if(observed.size!==installed.size)throw new Error('License graph omits installed packages');
  components.sort((a,b)=>a['bom-ref'].localeCompare(b['bom-ref']));
  const audit=jsonCommand(root,'pnpm',['audit','--json'],[0,1]);validateAudit(audit.value,audit.status);
  const recordedAt=new Date().toISOString();
  return {
    'sbom.cdx.json':{bomFormat:'CycloneDX',specVersion:'1.6',version:1,metadata:{timestamp:recordedAt,properties:[{name:'lorcana:lock-sha256',value:sha256(readFileSync(join(root,'pnpm-lock.yaml')))},{name:'lorcana:scope',value:'Installed Linux npm graph; excludes uninstalled platform options, OS packages and downloaded Chromium.'}]},components},
    'dependency-audit.json':{recorded_at:recordedAt,command:['pnpm','audit','--json'],result:'passed',blocking_severities:['high','critical'],response:audit.value,license_file_gaps:gaps.sort()},
    'THIRD_PARTY_NOTICES.txt':'Installed dependency notices. Metadata policy approval is not complete redistribution/legal qualification. Missing published notice files are listed in dependency-audit.json.\n'+notices.join(''),
  };
}
export function sourceSecretScan(root,knownSecrets=[]) {
  const shallow=spawnSync('git',['rev-parse','--is-shallow-repository'],{cwd:root,encoding:'utf8'});
  if(shallow.status!==0||shallow.stdout.trim()!=='false')throw new Error('Secret qualification requires full Git history; shallow repositories refused');
  const files=inventory(root).map(path=>({path,bytes:readFileSync(join(root,path))}));
  const found=scanSecrets(files,{knownSecrets});
  const revisions=spawnSync('git',['rev-list','--all'],{cwd:root,encoding:'utf8'});
  if(revisions.status!==0||!revisions.stdout.trim())throw new Error('Secret history scan needs full Git history');
  for(const revision of revisions.stdout.trim().split('\n')) {
    const tree=spawnSync('git',['ls-tree','-r','-z',revision],{cwd:root,encoding:'utf8',maxBuffer:5_000_000});
    if(tree.status!==0)throw new Error('Unable to inspect Git paths');
    for(const entry of tree.stdout.split('\0').filter(Boolean)) {
      const [metadata,path]=entry.split('\t'),[mode,type,hash]=metadata.split(' ');
      if(mode==='120000'||type!=='blob')throw new Error('Unsupported Git source entry');
      const blob=spawnSync('git',['cat-file','blob',hash],{cwd:root,maxBuffer:10_000_000});
      if(blob.status!==0)throw new Error('Unable to inspect Git bytes');
      found.push(...scanSecrets([{path,bytes:blob.stdout}],{knownSecrets}));
    }
  }
  if(found.length)throw new Error('Secret scan rejected safe findings: '+JSON.stringify([...new Map(found.map(row=>[JSON.stringify(row),row])).values()]));
  console.log('PASS current public source and complete Git history secret patterns; findings never contain credential values');
}
export function safeDependencyPath(root,path) {
  const base=realpathSync(join(root,'node_modules/.pnpm')),actual=realpathSync(path);
  if(!actual.startsWith(base+'/'))throw new Error('Dependency path escapes installed store: '+relative(resolve(root),actual));
  return actual;
}
