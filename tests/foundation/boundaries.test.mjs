import assert from 'node:assert/strict';
import { test } from 'node:test';
import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';

test('production apps cannot import the manipulated RULE-04 fixture bridge', async () => {
  const { checkSource } = await import('../../scripts/check-boundaries.mjs');
  for (const app of ['api', 'match-service', 'worker']) {
    for (const loader of ["import '../../../scripts/rules/scenario-runtime.mjs';", "void import('../../../scripts/rules/scenario-build.mjs');"]) {
      assert.throws(() => checkSource(join(process.cwd(), `apps/${app}/src/probe.ts`), undefined, loader), /Forbidden engine import/);
    }
  }
});

test('only the trust-free Lab wrapper may import the compiled kernel; public contracts and web cannot bypass it', async () => {
  const { checkSource } = await import('../../scripts/check-boundaries.mjs');
  assert.doesNotThrow(() => checkSource(join(process.cwd(), 'packages/engine-lab/src/probe.ts'), undefined, "import { createSyntheticKernel } from '@lorcana/vendor-engine';"));
  for (const path of ['apps/web/src/probe.ts', 'packages/contracts/src/probe.ts']) {
    assert.throws(() => checkSource(join(process.cwd(), path), undefined, "import '@lorcana/vendor-engine';"), /Forbidden browser import/);
    assert.throws(() => checkSource(join(process.cwd(), path), undefined, "import '@lorcana/engine-adapter';"), /Forbidden browser import/);
  }
  assert.throws(() => checkSource(join(process.cwd(), 'packages/engine-lab/src/probe.ts'), undefined, "import '../../../vendor/tcg-engines/upstream/submodules/lorcana/packages/lorcana/lorcana-engine/src/core/index.ts';"), /Forbidden browser import/);
});

test('server applications cannot bypass the project adapter using vendor or raw upstream imports', async () => {
  const { checkSource } = await import('../../scripts/check-boundaries.mjs');
  for (const code of ["import '@lorcana/vendor-engine';", "import '@lorcana/engine-lab';", "const p='@lorcana/vendor-engine'; import(p);", "import '@tcg/lorcana-engine';", "import '../../../vendor/tcg-engines/upstream/submodules/lorcana/packages/lorcana/lorcana-engine/src/core/index.ts';"]) {
    assert.throws(() => checkSource(join(process.cwd(), 'apps/match-service/src/probe.ts'), undefined, code), /Forbidden engine import/);
  }
  assert.doesNotThrow(() => checkSource(join(process.cwd(), 'apps/match-service/src/probe.ts'), undefined, "import '@lorcana/engine-adapter';"));
  assert.throws(() => checkSource(join(process.cwd(), 'apps/match-service/src/probe.ts'), undefined, "import '../../../packages/engine-lab/src/index.ts';"), /Forbidden engine import/);
});
test('server module loader aliases cannot bypass the engine adapter',async()=>{
  const {checkSource}=await import('../../scripts/check-boundaries.mjs');
  for(const code of [
    "const load=require;load('@lorcana/vendor-engine');",
    "import {createRequire} from 'node:module';const load=createRequire(import.meta.url);load('@lorcana/vendor-engine');",
    "import {createRequire as makeLoader} from 'module';const load=makeLoader(import.meta.url);load('@lorcana/vendor-engine');",
    "module.require('../../../vendor/tcg-engines/dist/kernel.js');",
    "module['require']('../../../vendor/tcg-engines/dist/kernel.js');",
  ])assert.throws(()=>checkSource(join(process.cwd(),'apps/match-service/src/probe.ts'),undefined,code),/Forbidden engine import/);
});

test('browser imports reject database/server sources, aliases, reexports, dynamic imports and dependency declarations', async () => {
  for (const code of [
    "import '@lorcana/db';",
    "export * from '@lorcana/engine-adapter';",
    "void import('../../../packages/db/src/index.js');",
    "import type { Secret } from '@private';",
    "import 'node:crypto';",
    "const privateAsset = new URL('../../../packages/db/README.md', import.meta.url);",
    "const moduleName = '@lorcana/db'; void import(moduleName);",
    "const load = require; load('@lorcana/db');",
  ]) {
    const root = await mkdtemp(join(tmpdir(), 'lorcana-boundary-'));
    try {
      await mkdir(join(root, 'apps/web/src'), { recursive: true });
      await mkdir(join(root, 'packages/db/src'), { recursive: true });
      await writeFile(join(root, 'apps/web/package.json'), JSON.stringify({ name: '@lorcana/web', lorcana: { scope: 'browser' } }));
      await writeFile(join(root, 'packages/db/package.json'), JSON.stringify({ name: '@lorcana/db', lorcana: { scope: 'server' } }));
      await writeFile(join(root, 'packages/db/src/index.ts'), 'export type Secret = string;');
      await writeFile(join(root, 'apps/web/tsconfig.json'), JSON.stringify({ compilerOptions: { paths: { '@private': ['../../packages/db/src/index.ts'] } } }));
      await writeFile(join(root, 'apps/web/src/probe.ts'), code);
      const result = spawnSync(process.execPath, ['scripts/check-boundaries.mjs', '--root', root], { encoding: 'utf8' });
      assert.equal(result.status, 1, `${code}\n${result.stdout}\n${result.stderr}`);
      assert.match(result.stderr, /Forbidden browser import/);
    } finally { await rm(root, { recursive: true, force: true }); }
  }
});

test('browser source cannot import the server-only release registry through its package subpath', async () => {
  const { checkSource } = await import('../../scripts/check-boundaries.mjs');
  assert.throws(() => checkSource(join(process.cwd(),'apps/web/src/registry-probe.ts'), undefined, "import { createReleaseRegistry } from '@lorcana/service-runtime/release';"), /Forbidden browser import/);
});

test('private server RNG/replay cannot cross browser boundaries and server adapter cannot enter the Lab generator',async()=>{
  const {checkSource}=await import('../../scripts/check-boundaries.mjs');
  for(const code of ["import '@lorcana/engine-adapter';","import '../../../packages/engine-adapter/src/random.ts';","export * from '../../../packages/engine-adapter/src/replay.ts';","import type {PrivateCompletedReplay} from '@lorcana/engine-adapter';"]){
    assert.throws(()=>checkSource(join(process.cwd(),'apps/web/src/probe.ts'),undefined,code),/Forbidden browser import/);
  }
  const file=join(process.cwd(),'packages/engine-adapter/src/probe.ts');
  assert.doesNotThrow(()=>checkSource(file,undefined,"import '@lorcana/vendor-engine';"));
  assert.throws(()=>checkSource(file,undefined,"import '@lorcana/engine-lab';"),/Forbidden engine import/);
  assert.throws(()=>checkSource(file,undefined,"import '../../../vendor/tcg-engines/upstream/submodules/lorcana/packages/lorcana/lorcana-engine/src/core/index.ts';"),/Forbidden engine import/);
});

test('browser resolver cannot treat a server adapter as a permitted browser kernel importer',async()=>{
  const {assertBrowserImport}=await import('../../scripts/check-boundaries.mjs');
  assert.throws(()=>assertBrowserImport(join(process.cwd(),'vendor/tcg-engines/dist/kernel.js'),join(process.cwd(),'packages/engine-adapter/src/index.ts')),/Forbidden browser import/);
});

test('declaring a database dependency in a public contract package is rejected', async () => {
  const root = await mkdtemp(join(tmpdir(), 'lorcana-boundary-'));
  try {
    await mkdir(join(root, 'packages/contracts'), { recursive: true });
    await mkdir(join(root, 'packages/db'), { recursive: true });
    await writeFile(join(root, 'packages/contracts/package.json'), JSON.stringify({ name: '@lorcana/contracts', lorcana: { scope: 'public' }, dependencies: { '@lorcana/db': 'workspace:*' } }));
    await writeFile(join(root, 'packages/db/package.json'), JSON.stringify({ name: '@lorcana/db', lorcana: { scope: 'server' } }));
    const result = spawnSync(process.execPath, ['scripts/check-boundaries.mjs', '--root', root], { encoding: 'utf8' });
    assert.equal(result.status, 1);
    assert.match(result.stderr, /Forbidden browser import/);
  } finally { await rm(root, { recursive: true, force: true }); }
});

for (const css of [
  'body { background: url("../../../packages/db/README.md"); }',
  'body { background: image-set("../../../packages/db/README.md" 1x); }',
  'body { background: -webkit-image-set("../../../packages/db/README.md" 1x); }',
]) test('CSS asset references cannot embed server-owned files: ' + css, async () => {
  const root = await mkdtemp(join(tmpdir(), 'lorcana-boundary-'));
  try {
    await mkdir(join(root, 'apps/web/src'), { recursive: true });
    await mkdir(join(root, 'packages/db'), { recursive: true });
    await writeFile(join(root, 'apps/web/package.json'), JSON.stringify({ name: '@lorcana/web', lorcana: { scope: 'browser' } }));
    await writeFile(join(root, 'packages/db/package.json'), JSON.stringify({ name: '@lorcana/db', lorcana: { scope: 'server' } }));
    await writeFile(join(root, 'apps/web/src/leak.css'), css);
    const result = spawnSync(process.execPath, ['scripts/check-boundaries.mjs', '--root', root], { encoding: 'utf8' });
    assert.equal(result.status, 1, result.stdout + result.stderr);
    assert.match(result.stderr, /Forbidden browser import/);
  } finally { await rm(root, { recursive: true, force: true }); }
});

test('HTML entry assets and inline modules cannot embed server-owned files', async () => {
  for (const html of [
    '<img src="../../packages/db/README.md">',
    '<style>body { background: url("../../packages/db/README.md"); }</style>',
    '<script type="module">import "@lorcana/db";</script>',
    '<img srcset="../../packages/db/README.md 1x">',
  ]) {
    const root = await mkdtemp(join(tmpdir(), 'lorcana-boundary-'));
    try {
      await mkdir(join(root, 'apps/web'), { recursive: true });
      await mkdir(join(root, 'packages/db'), { recursive: true });
      await writeFile(join(root, 'apps/web/package.json'), JSON.stringify({ name: '@lorcana/web', lorcana: { scope: 'browser' } }));
      await writeFile(join(root, 'packages/db/package.json'), JSON.stringify({ name: '@lorcana/db', lorcana: { scope: 'server' } }));
      await writeFile(join(root, 'apps/web/index.html'), html);
      const result = spawnSync(process.execPath, ['scripts/check-boundaries.mjs', '--root', root], { encoding: 'utf8' });
      assert.equal(result.status, 1, html + result.stdout + result.stderr);
      assert.match(result.stderr, /Forbidden browser import/);
    } finally { await rm(root, { recursive: true, force: true }); }
  }
});
