import assert from 'node:assert/strict';
import { test } from 'node:test';
import { spawn } from 'node:child_process';
import { once } from 'node:events';

for (const start of [
  "async () => { console.log('starting'); await new Promise(() => {}); }",
  "signal => { console.log('starting'); return new Promise((_resolve, reject) => signal.addEventListener('abort', () => reject(signal.reason), { once: true })); }",
]) test('shutdown interrupts pending initialization and calls cleanup: ' + start.slice(0, 12), { timeout: 5000 }, async () => {
  const source = `import { serveUntilShutdown } from './src/lifecycle.ts'; await serveUntilShutdown({ start: ${start}, stop: async () => { console.log('stopped'); } });`;
  const child = spawn(process.execPath, ['--input-type=module', '-e', source], { stdio: ['ignore', 'pipe', 'pipe'] });
  let output = '';
  let started;
  const ready = new Promise(resolve => { started = resolve; });
  child.stdout.on('data', bytes => { output += bytes; if (output.includes('starting')) started(); });
  const exit = once(child, 'exit');
  const timeout = setTimeout(() => child.kill('SIGKILL'), 1500);
  try {
    await ready;
    child.kill('SIGTERM');
    assert.deepEqual(await exit, [0, null]);
    assert.match(output, /stopped/);
  } finally { clearTimeout(timeout); if (child.exitCode === null) child.kill('SIGKILL'); }
});
