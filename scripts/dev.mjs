import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { watch } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { terminateGroups } from './process-groups.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
if (process.env.APP_ENV !== 'local') throw new Error('Run pnpm dev inside the local Dev Container');
// These foundations do not use a DB. Do not give children the inherited bootstrap administrator.
const env = { PATH: process.env.PATH, HOME: process.env.HOME, APP_ENV: 'local', NODE_ENV: 'development' };
const children = new Set();
const servers = new Set();
const terminating = new Map();
const watchers = [];
let stopping = false;
let restarting = false;
let restartTimer;
let finish;
const done = new Promise(resolve => { finish = resolve; });
function launch(command, args) {
  const child = spawn(command, args, { cwd: root, env, stdio: 'inherit', detached: true });
  children.add(child);
  // Retain group ownership until descendants are confirmed stopped, including failed leaders.
  child.on('exit', () => { servers.delete(child); });
  return child;
}
async function terminate(running) {
  const pending = [];
  for (const child of running) {
    if (!children.has(child)) continue;
    if (!terminating.has(child)) terminating.set(child, terminateGroups([child]).then(() => {
      children.delete(child);
      servers.delete(child);
      terminating.delete(child);
    }));
    pending.push(terminating.get(child));
  }
  await Promise.all(pending);
}
async function stop(code = 0) {
  if (stopping) return;
  stopping = true;
  process.exitCode = code;
  clearTimeout(restartTimer);
  for (const watcher of watchers) watcher.close();
  await terminate([...children]);
  finish();
}
function supervise(child) {
  child.on('error', () => { void stop(1); });
  child.on('exit', () => { if (!stopping && !child.expectedExit) void stop(1); });
}
function startServers() {
  for (const app of ['api', 'match-service', 'worker']) {
    const child = launch('node', ['--conditions=lorcana-source', `apps/${app}/src/main.ts`]);
    servers.add(child);
    supervise(child);
  }
}
async function restartServers() {
  if (stopping || restarting) return;
  restarting = true;
  const running = [...servers];
  for (const child of running) child.expectedExit = true;
  await terminate(running);
  if (!stopping) startServers();
  restarting = false;
}
process.once('SIGINT', () => { void stop(); });
process.once('SIGTERM', () => { void stop(); });
const build = launch('pnpm', ['build']);
const [code] = await once(build, 'exit');
await terminate([build]);
if (code !== 0 || stopping) await stop(code ?? 1);
else {
  startServers();
  supervise(launch('pnpm', ['--filter', '@lorcana/web', 'dev']));
  for (const path of ['apps/api/src', 'apps/match-service/src', 'apps/worker/src', 'packages/service-runtime/src', 'packages/contracts/src']) {
    const watcher = watch(new URL(path, 'file://' + root), { recursive: true }, () => {
      clearTimeout(restartTimer);
      restartTimer = setTimeout(() => { void restartServers(); }, 150);
    });
    watcher.on('error', () => { void stop(1); });
    watchers.push(watcher);
  }
}
await done;
