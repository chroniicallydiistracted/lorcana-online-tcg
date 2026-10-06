import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from 'node:fs';
import { join, resolve, relative, dirname } from 'node:path';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import Ajv from 'ajv';
import ts from 'typescript';

export const repository = fileURLToPath(new URL('../', import.meta.url));
const excluded = new Set(['.DS_Store','Thumbs.db','.git','node_modules','.pnpm-store','dist','coverage','test-results','playwright-report','__pycache__','.local']);
const generated = new Set(['docs/current-state.json','CHANGELOG.md']);
const evidenceOrHistory = path => /^(?:docs\/validation\/(?:runs|logs)\/|docs\/changes\/)/.test(path);
export const sha256 = value => createHash('sha256').update(value).digest('hex');
export function clockDiscontinuous(start,end,elapsedMs) {
  const wallMs=Date.parse(end)-Date.parse(start);
  return wallMs<0||Math.abs(wallMs-elapsedMs)>1_000;
}
export const json = (root,path) => JSON.parse(readFileSync(join(root,path),'utf8'));
export const isDoc = path => path.endsWith('.md') || path.startsWith('docs/') || ['VALIDATION_RESULTS.json','SHA256SUMS.txt'].includes(path);
export const matches = (path,pattern) => pattern.endsWith('/**') ? path.startsWith(pattern.slice(0,-2)) : path===pattern;
export function safePath(root,path) {
  if (path.includes('\\') || path.startsWith('/') || path.split('/').some(part=>['..','.env.local','.git'].includes(part))) throw new Error('Unsafe project path');
  const absolute=resolve(root,path);
  if (!absolute.startsWith(resolve(root)+'/')) throw new Error('Unsafe project path');
  return absolute;
}
export function inventory(root=repository) {
  const paths=[];
  function walk(folder) {
    for (const entry of readdirSync(folder,{withFileTypes:true}).sort((a,b)=>a.name.localeCompare(b.name))) {
      if (excluded.has(entry.name) || /^(?:\.env(?:\..*)?|.*\.(?:pem|key|pyc|log))$/.test(entry.name) && entry.name!=='.env.example') continue;
      const absolute=join(folder,entry.name),path=relative(root,absolute).replaceAll('\\','/');
      if (entry.isSymbolicLink()) throw new Error('Project inventory refuses symlink: '+path);
      if (entry.isDirectory()) walk(absolute); else paths.push(path);
    }
  }
  walk(root);return paths.sort();
}
export function validateData(root,kind,value) {
  const ajv=new Ajv({allErrors:true,strict:true,allowUnionTypes:true});
  ajv.addFormat('utc-timestamp', value => {
    if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z$/.test(value)) return false;
    try {return new Date(value).toISOString().replace('.000Z','Z')===value.replace('.000Z','Z');}catch{return false;}
  });
  const validate=ajv.compile(json(root,'docs/schemas/'+kind+'.schema.json'));
  if(!validate(value))throw new Error(`${kind} schema: ${ajv.errorsText(validate.errors)}`);
  return value;
}
export function sourceFingerprint(root=repository) {
  const paths=inventory(root).filter(path=>!isDoc(path) || path.startsWith('docs/schemas/'));
  return sha256(paths.map(path=>path+' '+sha256(readFileSync(join(root,path)))).join('\n'));
}
export function functionInventory(root,paths) {
  const functions=[];
  for (const file of paths) {
    if (/\.(?:[cm]?[jt]sx?)$/.test(file)) {
      const source=ts.createSourceFile(file,readFileSync(join(root,file),'utf8'),ts.ScriptTarget.Latest,true);
      function visit(node) {
        if(ts.isFunctionDeclaration(node)||ts.isFunctionExpression(node)||ts.isArrowFunction(node)||ts.isMethodDeclaration(node)||ts.isGetAccessor(node)||ts.isSetAccessor(node)||ts.isConstructorDeclaration(node)) {
          const position=source.getLineAndCharacterOfPosition(node.getStart(source));
          const name=node.name?.getText(source) ?? (ts.isVariableDeclaration(node.parent) ? node.parent.name.getText(source) : '<callback>');
          const signature=node.parameters.map(parameter=>parameter.getText(source)).join(', ');
          functions.push({file,name,line:position.line+1,column:position.character+1,kind:ts.SyntaxKind[node.kind],signature,sha256:sha256(node.getText(source))});
        }
        ts.forEachChild(node,visit);
      }
      visit(source);
    } else if(file.endsWith('.py')) {
      const helper=join(repository,'scripts/function-inventory.py');
      const result=spawnSync('python3',[helper],{input:readFileSync(join(root,file),'utf8'),encoding:'utf8'});
      if(result.status!==0)throw new Error('Python callable inventory failed: '+file);
      for(const row of JSON.parse(result.stdout))functions.push({file,...row});
    }
  }
  return functions;
}
function records(root,folder,kind) {
  if(!existsSync(join(root,folder)))return [];
  return readdirSync(join(root,folder)).filter(file=>file.endsWith('.json')).sort().map(file=>{
    const value=validateData(root,kind,json(root,folder+'/'+file));
    if(file!==value.id+'.json')throw new Error('Record filename does not match ID');
    return value;
  });
}
export function renderChangelog(changes) {
  let text='# Changelog\n\nGenerated from versioned records in docs/changes. Use docs/CHANGELOG_FORMAT.md; edit records, then run pnpm docs:sync. UTC is canonical; project display timezone is America/Phoenix. Historical imports do not invent test times.\n';
  for(const change of [...changes].sort((a,b)=>b.id.localeCompare(a.id))) {
    text+=`\n## ${change.id} — ${change.title}\n\n- Status: ${change.status}\n- Actor: ${change.actor}\n- Recorded (UTC): ${change.recorded_at}\n- Event: ${change.occurred_at ?? 'unknown; recorded retrospectively'} (${change.event_time_basis})\n- Source: ${change.source_commit ?? 'uncommitted fixture'}\n- Tasks: ${change.task_ids.join(', ') || 'none'}\n- Features: ${change.feature_ids.join(', ') || 'none'}\n- Requirements: ${change.requirement_ids.join(', ') || 'none'}\n\n### Changes\n\n`;
    text+=change.changes.map(row=>`- **${row.kind}:** ${row.description}`).join('\n')+'\n\n### Verification\n\n';
    text+=change.verification.length ? change.verification.map(row=>`- **${row.outcome}:** ${row.scope} ([evidence](${row.evidence}))`).join('\n')+'\n' : '- No execution evidence recorded for this entry.\n';
    text+='\n### Documentation and files\n\n'+change.documentation_reviews.map(row=>`- **${row.disposition}:** [${row.path}](${row.path}) — ${row.reason}`).join('\n')+'\n';
    text+=`\nFull changed-file inventory: [record](docs/changes/${change.id}.json).\n\n### Limits and next actions\n\n`;
    text+=[...change.limitations,...change.next_actions].map(row=>'- '+row).join('\n')+'\n';
  }
  return text;
}
function load(root) {
  const paths=inventory(root);
  const map=validateData(root,'documentation-map',json(root,'docs/documentation-map.json'));
  const features=validateData(root,'features',json(root,'docs/features.json')).features;
  if(new Set(features.map(feature=>feature.id)).size!==features.length)throw new Error('Duplicate feature ID');
  const changes=records(root,'docs/changes','change'),runs=records(root,'docs/validation/runs','run');
  for(const path of paths.filter(isDoc))if(!map.documents.some(row=>matches(path,row.path)))throw new Error('Unclassified documentation: '+path);
  for(const row of map.documents)for(const source of row.sources)if(!paths.some(path=>matches(path,source)))throw new Error('Missing documentation impact source: '+source);
  for(const row of map.documents)if(!row.path.endsWith('/**') && !paths.includes(row.path) && !generated.has(row.path))throw new Error('Missing documentation: '+row.path);
  const knownTasks=existsSync(join(root,'docs/vision/initial_backlog.csv'))?new Set(readFileSync(join(root,'docs/vision/initial_backlog.csv'),'utf8').split('\n').slice(1).map(line=>line.split(',')[0])):null;
  const knownRequirements=existsSync(join(root,'docs/vision/requirements.csv'))?new Set(readFileSync(join(root,'docs/vision/requirements.csv'),'utf8').split('\n').slice(1).map(line=>line.split(',')[0])):null;
  for(const row of [...features,...changes]) {
    if(knownTasks)for(const id of row.task_ids)if(!knownTasks.has(id))throw new Error('Unknown task ID: '+id);
    if(knownRequirements)for(const id of row.requirement_ids)if(!knownRequirements.has(id))throw new Error('Unknown requirement ID: '+id);
  }
  for(const feature of features) {
    for(const path of [...feature.sources,...feature.documents,...feature.evidence])if(!paths.some(candidate=>matches(candidate,path)))throw new Error('Missing feature reference: '+path);
    if(feature.implementation!=='implemented' && feature.verification==='verified')throw new Error('Unimplemented feature cannot be verified');
    if(feature.verification==='verified' && !feature.evidence.some(path=>runs.some(run=>'docs/validation/runs/'+run.id+'.json'===path && run.result==='passed' && run.clock_discontinuity===false && run.elapsed_ms!==undefined && run.source_fingerprint===sourceFingerprint(root))))throw new Error('Verified feature lacks matching executed evidence: '+feature.id);
  }
  for(const change of changes) {
    for(const feature of change.feature_ids)if(!features.some(row=>row.id===feature))throw new Error('Unknown feature: '+feature);
    for(const row of change.verification) {
      if(!paths.includes(row.evidence))throw new Error('Missing change evidence: '+row.evidence);
      const run=runs.find(value=>'docs/validation/runs/'+value.id+'.json'===row.evidence);
      if(row.outcome==='passed' && (!run || run.result!=='passed'))throw new Error('Change falsely reports a passing run');
      if(row.outcome==='reported' && (!run||run.result!=='reported'||run.category!=='manual_device'))throw new Error('Reported observation needs a manual-device report');
    }
    if(change.event_time_basis!=='recorded_only' && !change.occurred_at)throw new Error('Supported event time missing');
    if(change.event_time_basis==='git_commit' && !change.source_commit)throw new Error('Git event needs source commit');
    if(change.event_time_basis==='recorded_only' && change.occurred_at!==null)throw new Error('Recorded-only history must not invent event time');
  }
  const top=spawnSync('git',['rev-parse','--show-toplevel'],{cwd:root,encoding:'utf8'});
  const hasGit=top.status===0&&resolve(top.stdout.trim())===resolve(root);
  const reachable=hasGit?new Set(spawnSync('git',['rev-list','--all'],{cwd:root,encoding:'utf8'}).stdout.trim().split('\n')):null;
  for(const record of [...changes,...runs]) {
    if(Date.parse(record.recorded_at)>Date.now()+300_000)throw new Error('Record creation timestamp is in the future: '+record.id);
    if(record.occurred_at&&Date.parse(record.occurred_at)>Date.parse(record.recorded_at))throw new Error('Event occurs after record creation: '+record.id);
    if(record.source_commit&&reachable&&!reachable.has(record.source_commit))throw new Error('Source commit is not reachable: '+record.id);
  }
  for(const change of changes)if(change.event_time_basis==='git_commit'&&hasGit) {
    const event=spawnSync('git',['show','-s','--format=%cI',change.source_commit],{cwd:root,encoding:'utf8'});
    if(event.status!==0||Date.parse(event.stdout.trim())!==Date.parse(change.occurred_at))throw new Error('Git event timestamp does not match commit: '+change.id);
  }
  for(const run of runs) {
    if(run.result==='passed'&&run.source_fingerprint===sourceFingerprint(root)&&(run.elapsed_ms===undefined||run.clock_discontinuity===undefined))throw new Error('Current source passing evidence needs monotonic capture');
    if((run.elapsed_ms===undefined)!==(run.clock_discontinuity===undefined))throw new Error('Monotonic timing fields must be paired');
    if(run.elapsed_ms!==undefined&&run.started_at&&run.finished_at&&clockDiscontinuous(run.started_at,run.finished_at,run.elapsed_ms)!==run.clock_discontinuity)throw new Error('Clock samples contradict monotonic timing flag');
    if(run.time_precision==='clock_discontinuous'&&(!run.clock_discontinuity||run.elapsed_ms===undefined||run.failure_reason!=='clock_changed'||run.result!=='failed'))throw new Error('Discontinuous clock cannot supply passing evidence');
    if(run.clock_discontinuity&&run.time_precision!=='clock_discontinuous')throw new Error('Clock flag contradicts time precision');
    if(run.category==='manual_device') {
      if(run.command.length||run.expected_exit_code!==null||run.exit_code!==null||run.signal!==null||run.failure_reason!==null||!['reported','not_run'].includes(run.result))throw new Error('Manual observation cannot invent process execution or exits');
      if(run.result==='not_run'&&(run.observation||run.log_path||run.log_sha256||run.started_at||run.finished_at||run.time_precision!=='unknown'))throw new Error('Manual not_run cannot claim observation, log or execution time');
      if(run.result==='reported'&&(!run.observation||!run.source_fingerprint||!run.log_path||!run.environment['os']||!run.environment['browser']))throw new Error('Manual observation report is incomplete');
    }else if(run.observation)throw new Error('Observation fields require manual-device category');
    if(run.time_precision==='exact'&&(!run.started_at||!run.finished_at||Date.parse(run.finished_at)<Date.parse(run.started_at)||Date.parse(run.recorded_at)<Date.parse(run.finished_at)||Date.parse(run.recorded_at)>Date.now()+300_000))throw new Error('Execution/recording time contradiction');
    if(run.time_precision==='unknown' && (run.started_at!==null||run.finished_at!==null))throw new Error('Unknown execution time must stay null');
    if(run.result==='passed' || run.result==='failed') {
      if(run.category==='historical'||run.category==='manual_device'||!run.command.length||run.expected_exit_code===null||!['exact','clock_discontinuous'].includes(run.time_precision)||!run.started_at||!run.finished_at||(run.exit_code===null&&run.signal===null)||!run.source_fingerprint||!run.log_path||!run.log_sha256)throw new Error('Executed evidence is incomplete');
      if(run.time_precision==='exact'&&(Date.parse(run.finished_at)<Date.parse(run.started_at)||Date.parse(run.recorded_at)<Date.parse(run.finished_at)||Date.parse(run.recorded_at)>Date.now()+300_000))throw new Error('Execution/recording time contradiction');
      if((run.result==='passed') !== (run.exit_code===run.expected_exit_code && run.signal===null && run.failure_reason===null))throw new Error('Evidence outcome contradicts exit status');
    }
    if((run.log_path===null)!==(run.log_sha256===null))throw new Error('Evidence log path/digest must be paired');
    if(run.log_path) {
      if(run.log_path!=='docs/validation/logs/'+run.id+'.txt')throw new Error('Evidence log path does not match run ID');
      const path=safePath(root,run.log_path);
      if(!existsSync(path)||sha256(readFileSync(path))!==run.log_sha256)throw new Error('Evidence log digest mismatch: '+run.id);
    }
  }
  checkSealedRecords(root,paths);
  return {paths,map,features,changes,runs};
}
function hashes(root,paths) {
  return Object.fromEntries(paths.filter(path=>!generated.has(path)&&!evidenceOrHistory(path)).map(path=>[path,sha256(readFileSync(join(root,path)))]));
}
function checkLinks(root,paths,map) {
  for(const file of paths.filter(path=>path.endsWith('.md'))) {
    const classification=map.documents.find(row=>matches(file,row.path))?.classification;
    if(['archive','historical','planning'].includes(classification))continue;
    const text=readFileSync(join(root,file),'utf8').replace(/```[\s\S]*?```/g,'');
    for(const match of text.matchAll(/\[[^\]]*\]\(([^\s)]+)\)/g)) {
      const target=match[1].split('#')[0];
      if(!target||/^[a-z][a-z0-9+.-]*:|^\/\//i.test(target))continue;
      if(!existsSync(resolve(dirname(join(root,file)),decodeURIComponent(target))))throw new Error('Broken current-document link: '+file+' -> '+target);
    }
  }
}
function checkSealedRecords(root,paths) {
  const top=spawnSync('git',['rev-parse','--show-toplevel'],{cwd:root,encoding:'utf8'});
  if(top.status!==0||resolve(top.stdout.trim())!==resolve(root))return;
  const list=spawnSync('git',['log','HEAD','--format=','--name-only','--','docs/changes','docs/validation/runs','docs/validation/logs','docs/validation/archive'],{cwd:root,encoding:'utf8'});
  if(list.status!==0)throw new Error('Unable to inspect historical record paths');
  for(const path of [...new Set(list.stdout.trim().split('\n').filter(Boolean))]) {
    const commits=spawnSync('git',['log','HEAD','--reverse','--format=%H','--',path],{cwd:root,encoding:'utf8'});
    if(commits.status!==0)throw new Error('Unable to inspect record history');
    for(const commit of commits.stdout.trim().split('\n').filter(Boolean)) {
      const prior=spawnSync('git',['show',commit+':'+path],{cwd:root,maxBuffer:3_000_000});
      if(prior.status!==0)continue; // The commit may remove a path introduced earlier.
      if(path.startsWith('docs/changes/') && JSON.parse(prior.stdout.toString()).status==='draft')continue;
      if(!paths.includes(path)||sha256(prior.stdout)!==sha256(readFileSync(join(root,path))))throw new Error('Sealed evidence/history modified; append a correction: '+path);
      break;
    }
  }
}
export function checkDocumentation(root=repository) {
  const data=load(root),state=validateData(root,'state',json(root,'docs/current-state.json'));
  if(JSON.stringify(state.change_ids)!==JSON.stringify(data.changes.map(row=>row.id))||JSON.stringify(state.change_statuses)!==JSON.stringify(Object.fromEntries(data.changes.map(row=>[row.id,row.status]))))throw new Error('Stale change status snapshot');
  if(JSON.stringify(state.documentation_map)!==JSON.stringify(data.map.documents))throw new Error('Stale documentation impact map');
  if(state.source_fingerprint!==sourceFingerprint(root))throw new Error('Stale source fingerprint');
  if(JSON.stringify(state.files)!==JSON.stringify(hashes(root,data.paths)))throw new Error('Stale source/document snapshot; record change, review impacted docs, run docs:sync');
  if(JSON.stringify(state.functions)!==JSON.stringify(functionInventory(root,data.paths)))throw new Error('Stale function inventory');
  if(readFileSync(join(root,'CHANGELOG.md'),'utf8')!==renderChangelog(data.changes))throw new Error('Stale generated changelog');
  checkLinks(root,data.paths,data.map);
  return {files:data.paths.length,documents:data.paths.filter(isDoc).length,functions:state.functions.length,changes:data.changes.length,runs:data.runs.length};
}
export function syncDocumentation(root=repository,changeId,{initialize=false}={}) {
  const data=load(root),change=data.changes.find(row=>row.id===changeId);
  if(!change)throw new Error('Unknown change record');
  const previous=existsSync(join(root,'docs/current-state.json'))?json(root,'docs/current-state.json'):null;
  if(!previous) {
    const sealed=spawnSync('git',['log','HEAD','--format=%H','--','docs/current-state.json'],{cwd:root,encoding:'utf8'});
    if(!initialize||sealed.status===0&&sealed.stdout.trim())throw new Error('Missing snapshot; restore it from Git, never replay history. Initialization requires an explicit first-baseline operation.');
  }
  const next=hashes(root,data.paths);
  const changed=Object.keys({...previous?.files,...next}).filter(path=>previous?.files[path]!==next[path]);
  if(previous && changed.length && previous.change_ids.includes(changeId) && previous.change_statuses?.[changeId]!=='draft')throw new Error('Source changed: create a new change record before refresh');
  for(const path of [...change.files,...change.documentation_reviews.map(row=>row.path)])safePath(root,path);
  const covered=previous?change.files:data.changes.flatMap(record=>record.files);
  for(const path of changed)if(!covered.includes(path) && !generated.has(path))throw new Error('Unrecorded changed file: '+path);
  if(previous) {
    const sourceChanges=changed.filter(path=>!isDoc(path)||path.startsWith('docs/schemas/'));
    for(const doc of [...new Set([...data.paths,...Object.keys(previous.files)].filter(isDoc))]) {
      const rows=[...data.map.documents,...previous.documentation_map??[]].filter(entry=>matches(doc,entry.path));
      if(rows.some(row=>row.classification==='current' && row.sources.some(pattern=>sourceChanges.some(path=>matches(path,pattern)))) && !change.documentation_reviews.some(review=>review.path===doc))throw new Error('Missing documentation review: '+doc);
    }
  }
  writeFileSync(join(root,'CHANGELOG.md'),renderChangelog(data.changes));
  mkdirSync(join(root,'docs'),{recursive:true});
  writeFileSync(join(root,'docs/current-state.json'),JSON.stringify({schema_version:1,observed_at:new Date().toISOString(),documentation_map:data.map.documents,change_ids:data.changes.map(row=>row.id),change_statuses:Object.fromEntries(data.changes.map(row=>[row.id,row.status])),source_fingerprint:sourceFingerprint(root),files:next,functions:functionInventory(root,data.paths)},null,2)+'\n');
  return checkDocumentation(root);
}
