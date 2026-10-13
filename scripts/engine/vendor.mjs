import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { collectClosure, sha256, gitBlob, verifyVendor } from './closure.mjs';

const root = fileURLToPath(new URL('../../', import.meta.url));
const selection = JSON.parse(readFileSync(join(root, 'scripts/engine/selection.json')));
export function verifyResolverConfig(aliases, paths, imports) {
  const expectedPaths = Object.fromEntries(Object.entries(aliases).map(([key, value]) => [key, ['./upstream/' + value]]));
  const expectedImports = Object.fromEntries(Object.entries(aliases).filter(([key]) => key.startsWith('#')).map(([key, value]) => [key, './upstream/' + value]));
  const canonical = value => JSON.stringify(Object.entries(value ?? {}).sort(([a], [b]) => a.localeCompare(b)));
  if (canonical(paths) !== canonical(expectedPaths) || canonical(imports) !== canonical(expectedImports)) throw new Error('Upstream test resolver differs from verified selection');
}
export function createVendorPlan(source) {
  const head = spawnSync('git', ['rev-parse', 'HEAD'], { cwd: source, encoding: 'utf8' });
  if (head.status !== 0 || head.stdout.trim() !== selection.revision) throw new Error('Wrong upstream revision');
  const testIndex = 'submodules/lorcana/packages/lorcana/lorcana-engine/src/testing/index.ts';
  const original = readFileSync(join(source, testIndex), 'utf8');
  const start = original.indexOf('if ("Bun" in globalThis)'), end = original.indexOf('\nimport { createPlayerId', start);
  if (start < 0 || end < start) throw new Error('Testing patch anchor changed');
  const before = original.slice(start, end);
  const patches = [{ id: 'P001', path: 'upstream/' + testIndex, original_path: 'provenance/testing-index.original.ts', before, after: '', reason: 'Remove the nonliteral automatic Bun matcher import; the unchanged register-matchers.ts is explicitly preloaded by the pinned test runner. No assertion or rule behavior changes.' }];
  const overrides = { [testIndex]: original.replace(before, '') };
  const tracePath = 'submodules/lorcana/packages/lorcana/lorcana-engine/src/runtime-trace.ts';
  const traceOriginal = readFileSync(join(source, tracePath), 'utf8');
  const traceBefore = '  const processGlobal = globalThis as { process?: { env?: Record<string, string | undefined> } };\n  return processGlobal.process?.env;';
  if (!traceOriginal.includes(traceBefore)) throw new Error('Trace patch anchor changed');
  patches.push({ id: 'P002', path: 'upstream/' + tracePath, original_path: 'provenance/runtime-trace.original.ts', before: traceBefore, after: '  return undefined;', reason: 'Disable environment-driven upstream private runtime tracing in the pure shared kernel; preserves rule execution and avoids server environment reads in the trust-free worker. Project-owned diagnostics remain separate.' });
  overrides[tracePath] = traceOriginal.replace(traceBefore, '  return undefined;');
  const extraPatches = JSON.parse(readFileSync(join(root, 'scripts/engine/patches.json')));
  for (const patch of extraPatches) {
    const path = patch.path.slice('upstream/'.length);
    if (!patch.path.startsWith('upstream/') || path.includes('..') || patches.some(row => row.path === patch.path)) throw new Error('Invalid/duplicate reviewed patch');
    const bytes = readFileSync(join(source, path), 'utf8');
    if (!patch.before || bytes.split(patch.before).length !== 2) throw new Error('Reviewed patch anchor changed: ' + path);
    overrides[path] = bytes.replace(patch.before, patch.after);
    patches.push(patch);
  }
  const runtime = collectClosure(source, selection.runtime_seeds, selection.aliases, selection.externals, overrides);
  const all = collectClosure(source, [...selection.runtime_seeds, ...selection.tests, ...selection.test_preloads], selection.aliases, selection.externals, overrides);
  if (runtime.externals.some(name => name.startsWith('node:') || name.startsWith('bun:') || name === '@logtape/pretty')) throw new Error('Server/Bun/test dependency in runtime closure');
  const payloads = new Map();
  const files = all.files.map(path => {
    const bytes = readFileSync(join(source, path));
    const object = spawnSync('git', ['ls-tree', 'HEAD', '--', path], { cwd: source, encoding: 'utf8' });
    const blob = object.stdout.match(/^100644 blob ([a-f0-9]{40})\t/);
    if (object.status !== 0 || !blob || gitBlob(bytes) !== blob[1]) throw new Error('Original file differs from pinned Git blob: ' + path);
    const revised = overrides[path] === undefined ? bytes : Buffer.from(overrides[path]);
    payloads.set('upstream/' + path, revised);
    return { path: 'upstream/' + path, upstream_path: path, git_blob: blob[1], upstream_sha256: sha256(bytes), sha256: sha256(revised), bytes: revised.length, scope: runtime.files.includes(path) ? 'runtime_source_or_type' : 'test_only' };
  });
  for (const patch of patches) payloads.set(patch.original_path, readFileSync(join(source, patch.path.slice('upstream/'.length))));
  const licenses = ['LICENSE', 'submodules/lorcana/LICENSE'].map((path, index) => {
    const bytes = readFileSync(join(source, path)), destination = index === 0 ? 'LICENSE' : 'provenance/LORCANA_LICENSE.txt';
    const object = spawnSync('git', ['ls-tree', 'HEAD', '--', path], { cwd: source, encoding: 'utf8' });
    if (!object.stdout.includes(gitBlob(bytes))) throw new Error('License differs from pinned Git');
    payloads.set(destination, bytes);
    return { path: destination, upstream_path: path, git_blob: gitBlob(bytes), sha256: sha256(bytes), bytes: bytes.length, license: 'MIT' };
  });
  return { payloads, lock: { schema_version: 1, repository: selection.repository, revision: selection.revision, selection_sha256: sha256(readFileSync(join(root, 'scripts/engine/selection.json'))), runtime_files: runtime.files, runtime_externals: runtime.externals, test_externals: all.externals, tests: selection.tests, licenses, patches, files, compatibility: { as_of: '2026-10-13', current_rules: '2.2.0', scheduled_rules: '2.3.0', effective_on: '2026-10-16', set14: { prerelease_on: '2026-10-16', general_release_on: '2026-10-23', included: false }, certified_rules_versions: [], admitted_sets: [], secure_rng: 'RULE-03_injected', viewer_projection: 'pending_PLAY-02', purpose: 'Synthetic randomness/replay and representative RULE-04 scenario qualification only; no full rules/card certification or game admission' } } };
}
export function checkVendor() {
  const folder = join(root, 'vendor/tcg-engines'), lock = JSON.parse(readFileSync(join(folder, 'upstream.lock.json')));
  verifyResolverConfig(selection.aliases, JSON.parse(readFileSync(join(folder, 'tsconfig.json'))).compilerOptions.paths, JSON.parse(readFileSync(join(folder, 'package.json'))).imports);
  if (lock.revision !== selection.revision || lock.selection_sha256 !== sha256(readFileSync(join(root, 'scripts/engine/selection.json')))) throw new Error('Selection/pin drift');
  const result = verifyVendor(folder, lock);
  for (const row of lock.licenses) {
    const bytes = readFileSync(join(folder, row.path));
    if (bytes.length !== row.bytes || sha256(bytes) !== row.sha256 || gitBlob(bytes) !== row.git_blob) throw new Error('License drift');
  }
  const runtime = collectClosure(join(folder, 'upstream'), selection.runtime_seeds, selection.aliases, selection.externals);
  const all = collectClosure(join(folder, 'upstream'), [...selection.runtime_seeds, ...selection.tests, ...selection.test_preloads], selection.aliases, selection.externals);
  if (JSON.stringify(all.files) !== JSON.stringify(lock.files.map(row => row.upstream_path)) || JSON.stringify(runtime.files) !== JSON.stringify(lock.runtime_files) || JSON.stringify(runtime.externals) !== JSON.stringify(lock.runtime_externals) || JSON.stringify(selection.tests) !== JSON.stringify(lock.tests)) throw new Error('Recorded closure differs from actual imports');
  return result;
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const sourceIndex = process.argv.indexOf('--source');
    if (sourceIndex !== -1) {
      const plan = createVendorPlan(resolve(process.argv[sourceIndex + 1])), folder = join(root, 'vendor/tcg-engines');
      const manifest = JSON.stringify(plan.lock, null, 2) + '\n';
      if (process.argv.includes('--check')) {
        if (readFileSync(join(folder, 'upstream.lock.json'), 'utf8') !== manifest) throw new Error('Vendoring lock not reproducible');
        for (const [path, bytes] of plan.payloads) if (!readFileSync(join(folder, path)).equals(bytes)) throw new Error('Vendoring payload not reproducible: ' + path);
      } else {
        if (existsSync(join(folder, 'upstream.lock.json'))) throw new Error('Refuse automatic overwrite of existing vendor; review changes and patch ledger separately');
        for (const [path, bytes] of plan.payloads) { mkdirSync(dirname(join(folder, path)), { recursive: true }); writeFileSync(join(folder, path), bytes, { flag: 'wx' }); }
        writeFileSync(join(folder, 'upstream.lock.json'), manifest, { flag: 'wx' });
      }
    }
    console.log('PASS pinned vendor integrity ' + JSON.stringify(checkVendor()));
  } catch (error) { console.error(error.message); process.exitCode = 1; }
}
