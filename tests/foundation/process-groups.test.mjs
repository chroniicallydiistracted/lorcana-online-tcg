import assert from 'node:assert/strict';
import { test } from 'node:test';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { readFileSync } from 'node:fs';
import { terminateGroups } from '../../scripts/process-groups.mjs';

test('supervisor cleanup stops a descendant even when its leader exits first', { timeout: 5000 }, async () => {
  const descendant = "process.on('SIGTERM',()=>{});console.log(process.pid);setInterval(()=>{},1000)";
  const leader = "const {spawn}=require('node:child_process');const child=spawn(process.execPath,['-e'," + JSON.stringify(descendant) + "],{stdio:['ignore','pipe','ignore']});child.stdout.pipe(process.stdout);process.on('SIGTERM',()=>process.exit(0));setInterval(()=>{},1000)";
  const child = spawn(process.execPath, ['-e', leader], { detached: true, stdio: ['ignore', 'pipe', 'ignore'] });
  try {
    const [output] = await once(child.stdout, 'data');
    const pid = Number(output.toString().trim());
    assert.ok(Number.isInteger(pid) && pid > 0);
    await terminateGroups([child], { graceMs: 100 });
    let state;
    try { state = readFileSync('/proc/' + pid + '/stat', 'utf8').split(') ')[1][0]; }
    catch (error) { if (!['ENOENT', 'ESRCH'].includes(error.code)) throw error; }
    assert.ok(state === undefined || ['Z', 'X'].includes(state), 'Descendant must no longer execute');
    assert.equal(child.exitCode, 0);
  } finally {
    try { process.kill(-child.pid, 'SIGKILL'); } catch { /* Group already stopped. */ }
  }
});

test('cleanup retains the group of an already-exited leader', { timeout: 5000 }, async () => {
  const descendant = "process.on('SIGTERM',()=>{});console.log(process.pid);setInterval(()=>{},1000)";
  const leader = "const {spawn}=require('node:child_process');const child=spawn(process.execPath,['-e'," + JSON.stringify(descendant) + "],{stdio:['ignore','pipe','ignore']});child.stdout.pipe(process.stdout);process.on('SIGTERM',()=>process.exit(0));setInterval(()=>{},1000)";
  const child = spawn(process.execPath, ['-e', leader], { detached: true, stdio: ['ignore', 'pipe', 'ignore'] });
  try {
    const [output] = await once(child.stdout, 'data');
    const pid = Number(output.toString().trim());
    const exit = once(child, 'exit');
    child.kill('SIGTERM');
    await exit;
    await terminateGroups([child], { graceMs: 100 });
    assert.equal(child.exitCode, 0);
    let state;
    try { state = readFileSync('/proc/' + pid + '/stat', 'utf8').split(') ')[1][0]; }
    catch (error) { if (!['ENOENT', 'ESRCH'].includes(error.code)) throw error; }
    assert.ok(state === undefined || ['Z', 'X'].includes(state), 'Exited leader cannot leave an executable descendant');
  } finally {
    try { process.kill(-child.pid, 'SIGKILL'); } catch { /* Group already stopped. */ }
  }
});
