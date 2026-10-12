import { mkdtempSync, rmSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';
import { checkVendor } from '../engine/vendor.mjs';

const root = fileURLToPath(new URL('../../', import.meta.url));
const vendorRequire = createRequire(new URL('../../vendor/tcg-engines/package.json', import.meta.url));

// Development-only; this entry is never a workspace export or release artifact.
export async function withScenarioRuntime(action) {
  checkVendor();
  const { build } = await import(pathToFileURL(vendorRequire.resolve('vite')).href);
  const selection = JSON.parse(readFileSync(join(root, 'scripts/engine/selection.json')));
  const directory = mkdtempSync(join(tmpdir(), 'lorcana-rule04-'));
  try {
    await build({ configFile: false, root: join(root, 'vendor/tcg-engines'), logLevel: 'error',
      define: { 'process.env.NODE_ENV': '"development"', 'globalThis.Bun': 'undefined', 'globalThis.process': 'undefined' },
      resolve: { alias: Object.entries(selection.aliases).sort(([a], [b]) => b.length - a.length).map(([find, path]) => ({ find, replacement: join(root, 'vendor/tcg-engines/upstream', path) })) },
      build: { outDir: directory, target: 'node24', minify: false, lib: { entry: join(root, 'scripts/rules/scenario-runtime.mjs'), formats: ['es'], fileName: () => 'scenarios.mjs' },
        rolldownOptions: { external: ['node:assert/strict'] } } });
    return await action(await import(pathToFileURL(join(directory, 'scenarios.mjs')).href));
  } finally { rmSync(directory, { recursive: true, force: true }); }
}
