import assert from 'node:assert/strict';
import { test } from 'node:test';
import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';

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
