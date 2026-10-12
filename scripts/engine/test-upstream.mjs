import { readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import { findBun } from './bun.mjs';
import { checkVendor } from './vendor.mjs';

const root = fileURLToPath(new URL('../../', import.meta.url));
const selection = JSON.parse(readFileSync(join(root, 'scripts/engine/selection.json')));
checkVendor();
console.log('Selected ' + selection.tests.length + ' unchanged upstream test files; remaining RULE-01 inventory is not executed or certified by this command.');
const result = spawnSync(findBun(), ['test', '--no-install', '--timeout', '30000', '--only-failures', '--preload', './src/upstream-compatibility-preload.ts', '--preload', './upstream/' + selection.test_preloads[0], ...selection.tests.map(path => './upstream/' + path)], { cwd: join(root, 'vendor/tcg-engines'), stdio: 'inherit', timeout: 600_000, env: { ...process.env, AGENT: '1' } });
if (result.error || result.signal || result.status !== 0) process.exitCode = 1;
