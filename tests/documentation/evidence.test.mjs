import assert from 'node:assert/strict';
import { test } from 'node:test';
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
let recorder;
try { recorder=await import('../../scripts/evidence-lib.mjs'); } catch { recorder={}; }
test('evidence capture preserves failure, timestamps and redacts inherited secrets',async()=>{
  assert.equal(typeof recorder.recordCommand,'function');
  const root=mkdtempSync(join(tmpdir(),'lorcana-evidence-test-'));
  try {
    mkdirSync(join(root,'scripts'));
    writeFileSync(join(root,'scripts/probe.mjs'),'console.log(process.env.DOCS_TEST_SECRET); console.error("synthetic failure"); process.exitCode=7;');
    const result=await recorder.recordCommand({root,id:'RUN-20261006-001',category:'simulated',command:[process.execPath,'scripts/probe.mjs'],env:{...process.env,DOCS_TEST_SECRET:'synthetic-secret-must-not-leak'},summary:'Test-only negative recorder check'});
    assert.equal(result.exit_code,7);assert.equal(result.result,'failed');
    assert.ok(Date.parse(result.finished_at)>=Date.parse(result.started_at));
    const log=readFileSync(join(root,result.log_path),'utf8');
    assert.ok(!log.includes('synthetic-secret-must-not-leak'));assert.match(log,/REDACTED/);
    assert.ok(result.redactions>0);
    await assert.rejects(recorder.recordCommand({root,id:result.id,category:'simulated',command:[process.execPath,'scripts/probe.mjs']}),/already exists/i);
  }finally{rmSync(root,{recursive:true,force:true});}
});
test('source changes during a command prevent a successful evidence claim',async()=>{
  const root=mkdtempSync(join(tmpdir(),'lorcana-evidence-drift-'));
  try {
    writeFileSync(join(root,'source.mjs'),'export const value=1;\n');
    const result=await recorder.recordCommand({root,id:'RUN-20261006-002',category:'container',command:[process.execPath,'-e',"require('node:fs').writeFileSync('source.mjs','export const value=2;\\n')"]});
    assert.equal(result.exit_code,0);assert.equal(result.result,'failed');assert.equal(result.failure_reason,'source_changed');
  }finally{rmSync(root,{recursive:true,force:true});}
});
test('a timed-out child that ignores SIGTERM is terminated and recorded as failed',async()=>{
  const root=mkdtempSync(join(tmpdir(),'lorcana-evidence-timeout-'));
  try {
    const result=await recorder.recordCommand({root,id:'RUN-20261006-003',category:'container',timeoutMs:500,command:[process.execPath,'-e',"process.on('SIGTERM',()=>{});setInterval(()=>{},1000)"]});
    assert.equal(result.result,'failed');assert.equal(result.failure_reason,'timeout');assert.equal(result.signal,'SIGKILL');
  }finally{rmSync(root,{recursive:true,force:true});}
});
test('known inherited secrets are redacted even when shorter than eight characters',()=>{
  const result=recorder.redact('pin123 appeared twice: pin123',{DOCS_TEST_SECRET:'pin123'});
  assert.equal(result.redactions,2);assert.ok(!result.text.includes('pin123'));
});
test('a fast-exiting leader cannot leave an ignoring-SIGTERM grandchild alive',async()=>{
  const root=mkdtempSync(join(tmpdir(),'lorcana-evidence-orphan-'));let pid;
  try {
    const script="const {spawn}=require('node:child_process');const child=spawn(process.execPath,['-e',\"process.on('SIGTERM',()=>{});setInterval(()=>{},1000)\"],{stdio:'ignore'});require('node:fs').writeFileSync('child.pid',String(child.pid));process.on('SIGTERM',()=>process.exit(0));setInterval(()=>{},1000)";
    const result=await recorder.recordCommand({root,id:'RUN-20261006-004',category:'container',timeoutMs:700,command:[process.execPath,'-e',script]});
    pid=Number(readFileSync(join(root,'child.pid'),'utf8'));assert.equal(result.failure_reason,'timeout');assert.equal(result.result,'failed');
    // Container PID1 may leave a killed orphan as a zombie; that process cannot execute.
    const deadline=performance.now()+2_000;let stopped=false;
    while(performance.now()<deadline) {
      let state;try{state=readFileSync('/proc/'+pid+'/stat','utf8').split(') ')[1][0];}catch(error){if(!['ENOENT','ESRCH'].includes(error.code))throw error;}
      if(state===undefined||state==='Z'||state==='X'){stopped=true;break;}
      await new Promise(resolve=>setTimeout(resolve,10));
    }
    assert.ok(stopped,'Grandchild must stop within the bounded observation window');
  }finally{if(pid)try{process.kill(pid,'SIGKILL');}catch{/* Already stopped. */}rmSync(root,{recursive:true,force:true});}
});

test('a backwards or stepped wall clock cannot become trustworthy elapsed-time evidence',()=>{
  assert.equal(recorder.clockDiscontinuous('2026-10-06T19:29:26.801Z','2026-10-06T19:29:26.160Z',3000),true);
  assert.equal(recorder.clockDiscontinuous('2026-10-06T19:29:26.000Z','2026-10-06T19:29:36.000Z',100),true);
  assert.equal(recorder.clockDiscontinuous('2026-10-06T19:29:26.000Z','2026-10-06T19:29:27.000Z',1002),false);
});
