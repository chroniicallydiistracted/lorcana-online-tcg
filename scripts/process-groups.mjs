import { once } from 'node:events';
import { readdirSync, readFileSync } from 'node:fs';
import { setTimeout as delay } from 'node:timers/promises';

// Linux Dev Container only. A group leader can exit while descendants still execute.
function liveGroups(groups) {
  const live = new Set();
  for (const pid of readdirSync('/proc')) {
    if (!/^\d+$/.test(pid)) continue;
    try {
      const stat = readFileSync('/proc/' + pid + '/stat', 'utf8');
      const fields = stat.slice(stat.lastIndexOf(')') + 2).split(' ');
      const group = Number(fields[2]);
      if (groups.has(group) && !['Z', 'X'].includes(fields[0])) live.add(group);
    } catch (error) { if (!['ENOENT', 'ESRCH'].includes(error.code)) throw error; }
  }
  return live;
}
function signalGroups(groups, signal) {
  for (const group of groups) {
    try { process.kill(-group, signal); }
    catch (error) { if (error.code !== 'ESRCH') throw error; }
  }
}
export async function terminateGroups(running, { graceMs = 12000 } = {}) {
  const groups = new Set(running.filter(child => child.pid).map(child => child.pid));
  const exits = running.filter(child => child.pid && child.exitCode === null && child.signalCode === null).map(child => once(child, 'exit'));
  signalGroups(groups, 'SIGTERM');
  const deadline = performance.now() + graceMs;
  let live;
  while ((live = liveGroups(groups)).size && performance.now() < deadline) await delay(25);
  signalGroups(live, 'SIGKILL');
  const killedDeadline = performance.now() + 1000;
  while (liveGroups(groups).size && performance.now() < killedDeadline) await delay(10);
  if (liveGroups(groups).size) throw new Error('Owned process group did not stop after SIGKILL');
  await Promise.all(exits);
}
