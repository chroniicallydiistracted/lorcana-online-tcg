import { spawn, spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, writeFileSync, readFileSync, lstatSync } from 'node:fs';
import { join } from 'node:path';
import { sha256, sourceFingerprint, clockDiscontinuous } from './documentation-lib.mjs';
export function redact(text,env=process.env) {
  let redactions=0;
  const values=[...new Set(Object.entries(env).filter(([key,value])=>/password|secret|token|credential|private_key/i.test(key) && value && value.length>0).map(([,value])=>value))];
  for(const value of values) { const parts=text.split(value);redactions+=parts.length-1;text=parts.join('[REDACTED]'); }
  text=text.replace(/-----BEGIN [^-]*PRIVATE KEY-----[\s\S]*?-----END [^-]*PRIVATE KEY-----/g,()=>{redactions++;return '[REDACTED PRIVATE KEY]';});
  text=text.replace(/(postgres(?:ql)?:\/\/[^:\s/]+:)[^@\s]+@/g,(_match,prefix)=>{redactions++;return prefix+'[REDACTED]@';});
  return {text,redactions};
}
export { clockDiscontinuous };
export function privateRedactionValues(root) {
  const values={};
  function owned(path,directory=false) {
    const stat=lstatSync(path);
    if(stat.isSymbolicLink()||stat.uid!==process.getuid?.()||(stat.mode&0o077)||directory&&!stat.isDirectory()||!directory&&(!stat.isFile()||stat.nlink!==1))throw new Error('Private redaction source unsafe');
  }
  const local=join(root,'.local'),db=join(local,'database.json'),env=join(root,'.env.local');
  if(existsSync(env)) {
    owned(env);
    const password=readFileSync(env,'utf8').split('\n').find(line=>line.startsWith('POSTGRES_PASSWORD='))?.slice(18);
    if(!password||!/^[a-f0-9]{64}$/.test(password))throw new Error('Private bootstrap redaction source invalid');
    values.EVIDENCE_BOOTSTRAP_CREDENTIAL=password;
  }
  if(existsSync(db)) {
    owned(local,true);owned(db);
    const data=JSON.parse(readFileSync(db,'utf8')),roles=['migrator','api','match','worker'];
    const passwords=['local','test'].flatMap(target=>roles.map(role=>data.passwords?.[target]?.[role]));
    if(data.version!==1||passwords.some(value=>typeof value!=='string'||!/^[A-Za-z0-9_-]{43}$/.test(value))||new Set(passwords).size!==8)throw new Error('Private managed redaction source invalid');
    passwords.forEach((value,i)=>{values['EVIDENCE_MANAGED_CREDENTIAL_'+i]=value;});
  }
  return values;
}
export async function recordCommand({root,id,category,command,env=process.env,summary='Recorded command outcome',expectedExitCode=0,timeoutMs=900_000}) {
  if(!/^RUN-\d{8}-\d{3}$/.test(id))throw new Error('Invalid run ID');
  if(!['static','container','simulated','headless_browser','production'].includes(category))throw new Error('Executed run needs an execution category');
  if(!Array.isArray(command)||command.length===0)throw new Error('Command argument array required');
  const initialPrivate=privateRedactionValues(root);
  if(redact(command.join('\n'),{...env,...initialPrivate}).redactions)throw new Error('Refusing secret-bearing command arguments');
  const recordPath=join(root,'docs/validation/runs/'+id+'.json'),logPath='docs/validation/logs/'+id+'.txt';
  if(existsSync(recordPath)||existsSync(join(root,logPath)))throw new Error('Evidence ID already exists');
  const git=spawnSync('git',['rev-parse','HEAD'],{cwd:root,encoding:'utf8'});
  const pnpm=spawnSync('pnpm',['--version'],{cwd:root,encoding:'utf8'});
  const clockStart=performance.now(),startedAt=new Date().toISOString(),fingerprint=sourceFingerprint(root);
  let output='',failureReason=null,killTimer,killComplete;
  const child=spawn(command[0],command.slice(1),{cwd:root,env,stdio:['ignore','pipe','pipe'],detached:true});
  const terminate=reason=>{
    failureReason??=reason;
    if(!child.pid)return;
    try{process.kill(-child.pid,'SIGTERM');}catch{/* Already stopped. */}
    killComplete??=new Promise(resolve=>{killTimer=setTimeout(()=>{try{process.kill(-child.pid,'SIGKILL');}catch{/* Already stopped. */}resolve();},1_000);});
  };
  const capture=bytes=>{if(output.length+bytes.length>2_000_000)terminate('output_limit');else output+=bytes;};
  child.stdout.on('data',capture);child.stderr.on('data',capture);
  const onSignal=()=>terminate('interrupted');
  process.on('SIGINT',onSignal);process.on('SIGTERM',onSignal);
  const timeout=setTimeout(()=>terminate('timeout'),timeoutMs);
  const observed=await new Promise(resolve=>{
    child.once('error',()=>{failureReason='spawn_error';resolve({code:127,signal:null});});
    child.once('close',(code,signal)=>resolve({code,signal}));
  });
  clearTimeout(timeout);if(killComplete)await killComplete;clearTimeout(killTimer);process.off('SIGINT',onSignal);process.off('SIGTERM',onSignal);
  if(sourceFingerprint(root)!==fingerprint)failureReason??='source_changed';
  let sanitized;
  try{sanitized=redact(output,{...env,...initialPrivate,...privateRedactionValues(root)});}catch{failureReason??='private_redaction_unavailable';sanitized={text:'[Output withheld: generated private configuration could not be safely qualified for redaction.]\n',redactions:0};}
  const finishedAt=new Date().toISOString(),elapsedMs=Math.round(performance.now()-clockStart),discontinuity=clockDiscontinuous(startedAt,finishedAt,elapsedMs);
  if(discontinuity)failureReason='clock_changed';
  if(failureReason)sanitized.text+='\n[Recorder failure: '+failureReason+']\n';
  const record={schema_version:1,id,category,command,cwd:root,environment:{node:process.versions.node,pnpm:pnpm.status===0?pnpm.stdout.trim():'unavailable',platform:process.platform,architecture:process.arch,user_id:process.getuid?.()??null,hostname:env.HOSTNAME??null},source_commit:git.status===0?git.stdout.trim():null,source_fingerprint:fingerprint,started_at:startedAt,finished_at:finishedAt,recorded_at:finishedAt,time_precision:discontinuity?'clock_discontinuous':'exact',elapsed_ms:elapsedMs,clock_discontinuity:discontinuity,expected_exit_code:expectedExitCode,exit_code:observed.code,signal:observed.signal,result:observed.code===expectedExitCode&&observed.signal===null&&failureReason===null?'passed':'failed',failure_reason:failureReason,summary,log_path:logPath,log_sha256:sha256(sanitized.text),redactions:sanitized.redactions};
  mkdirSync(join(root,'docs/validation/runs'),{recursive:true});mkdirSync(join(root,'docs/validation/logs'),{recursive:true});
  writeFileSync(join(root,logPath),sanitized.text,{flag:'wx'});writeFileSync(recordPath,JSON.stringify(record,null,2)+'\n',{flag:'wx'});
  return record;
}
