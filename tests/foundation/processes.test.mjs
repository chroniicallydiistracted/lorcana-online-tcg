import assert from 'node:assert/strict';
import { test } from 'node:test';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { setTimeout as delay } from 'node:timers/promises';

async function waitForOutput(child, target) {
  let output = '';
  const timeout = setTimeout(() => child.kill('SIGKILL'), 5000);
  try {
    for await (const chunk of child.stdout) {
      output += chunk;
      if (output.includes(target)) return output;
    }
    assert.fail(`Process exited before ${target}: ${output}`);
  } finally { clearTimeout(timeout); }
}

test('built application processes start, remain alive and stop on both signals without public worker ingress', { timeout: 30000 }, async () => {
  for (const app of ['api', 'match-service', 'worker']) {
    for (const signal of ['SIGTERM', 'SIGINT']) {
      const child = spawn(process.execPath, [`apps/${app}/dist/main.js`], { env: { PATH: process.env.PATH, APP_ENV: 'local' }, stdio: ['ignore', 'pipe', 'pipe'] });
      let stderr = '';
      child.stderr.on('data', chunk => { stderr += chunk; });
      const exit = once(child, 'exit');
      try {
        await waitForOutput(child, app === 'worker' ? 'worker foundation started' : `${app} foundation listening`);
        await delay(80);
        assert.equal(child.exitCode, null, `${app} unexpectedly exited: ${stderr}`);
        const port = app === 'api' ? 3001 : 3002;
        if (app !== 'worker') {
          const response = await fetch(`http://127.0.0.1:${port}/readyz`);
          assert.equal(response.status, 200);
          assert.equal((await response.json()).service, app);
        } else {
          await assert.rejects(fetch('http://127.0.0.1:3001/healthz'));
          await assert.rejects(fetch('http://127.0.0.1:3002/healthz'));
        }
        child.kill(signal);
        assert.deepEqual(await exit, [0, null], `${app}: ${stderr}`);
        assert.equal(stderr, '');
      } finally { if (child.exitCode === null) child.kill('SIGKILL'); }
    }
    const invalid = spawn(process.execPath, [`apps/${app}/dist/main.js`], { env: { PATH: process.env.PATH, APP_ENV: 'production' }, stdio: 'ignore' });
    assert.deepEqual(await once(invalid, 'exit'), [1, null]);
  }
});

// scripts/dev.mjs runs the full workspace build before it starts any service, so most of this
// budget is that build (17-19 s locally, 21-30 s on hosted runners and growing with the
// workspace). The busy-port handling itself is bounded separately below.
test('development supervisor rejects a busy service port and leaves the existing listener intact', { timeout: 120000 }, async () => {
  const { createServer } = await import('node:http');
  const server = createServer((_request, response) => response.end('existing-listener'));
  await new Promise(resolve => server.listen(3001, '0.0.0.0', resolve));
  const child = spawn(process.execPath, ['scripts/dev.mjs'], { env: { PATH: process.env.PATH, HOME: process.env.HOME, APP_ENV: 'local' }, stdio: ['ignore', 'pipe', 'pipe'] });
  let output = '', apiFailedAt;
  const collect = chunk => {
    output = (output + chunk).slice(-65536);
    if (apiFailedAt === undefined && output.includes('api foundation startup failed')) apiFailedAt = performance.now();
  };
  child.stdout.on('data', collect);
  child.stderr.on('data', collect);
  try {
    assert.deepEqual(await once(child, 'close'), [1, null]);
    // Exit 1 must come from the API losing its port after a completed build, not from a failed build.
    assert.notEqual(apiFailedAt, undefined, `API did not report its busy port: ${output.slice(-2000)}`);
    // Cleanup allows SIGTERM, 12 s grace and 1 s after SIGKILL (scripts/process-groups.mjs).
    assert.ok(performance.now() - apiFailedAt < 15000, 'supervisor did not stop within 15 s of the API failure');
    assert.equal(await (await fetch('http://127.0.0.1:3001')).text(), 'existing-listener');
    await assert.rejects(fetch('http://127.0.0.1:3002/healthz'));
    await assert.rejects(fetch('http://127.0.0.1:5173/'));
  } finally {
    if (child.exitCode === null) child.kill('SIGKILL');
    await new Promise(resolve => server.close(resolve));
  }
});
