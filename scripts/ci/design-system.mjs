// Isolated design-system qualification, run as its own parallel CI job (Director decision D18).
// It shares the foundation job's disposable container and isolation contract but not its 900 s budget.
import { readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { assertIsolation, runStages } from './pipeline.mjs';

export const designSystemStages = [
  ['design-system-gates', ['pnpm', '--filter', '@lorcana/design-system', 'test']],
  ['pinned-chromium', ['pnpm', '--filter', '@lorcana/design-system', 'exec', 'playwright', 'install', 'chromium']],
  ['design-system-browser', ['pnpm', '--filter', '@lorcana/design-system', 'test:browser']],
  // Design review gate (decision D30): the Impeccable detector on the build above, then the independent-review records.
  ['design-review-detector', ['env', 'SKIP_STORYBOOK_BUILD=1', 'pnpm', '--filter', '@lorcana/design-system', 'design-review']],
  ['design-review-records', ['pnpm', '--filter', '@lorcana/design-system', 'check:design-reviews']],
];
export function designSystemPipeline(root, env = process.env) {
  assertIsolation(env, JSON.parse(readFileSync(join(root, '.local/ci-isolation.json'))));
  const reports = runStages(designSystemStages, (command, name) => {
    console.log('CI stage: ' + name);
    const result = spawnSync(command[0], command.slice(1), { cwd: root, stdio: 'inherit' });
    if (result.error || result.status !== 0 || result.signal) throw new Error('CI stage failed: ' + name);
  });
  console.log('PASS design-system pipeline: ' + reports.map(r => `${r.name} ${r.elapsed_ms}ms`).join(', '));
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try { designSystemPipeline(fileURLToPath(new URL('../../', import.meta.url))); } catch (error) { console.error(error.message); process.exitCode = 1; }
}
