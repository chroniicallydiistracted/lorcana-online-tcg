import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync, symlinkSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { tmpdir } from 'node:os';
import { collectClosure, verifyVendor } from '../../scripts/engine/closure.mjs';
import { createHash } from 'node:crypto';
import { verifyResolverConfig } from '../../scripts/engine/vendor.mjs';

test('upstream test resolver cannot redirect selected aliases outside the verified closure', () => {
  const aliases = { '#core': 'core/index.ts', '@tcg/types': 'types/index.ts' };
  const paths = { '#core': ['./upstream/core/index.ts'], '@tcg/types': ['./upstream/types/index.ts'] };
  assert.doesNotThrow(() => verifyResolverConfig(aliases, paths, { '#core': './upstream/core/index.ts' }));
  assert.throws(() => verifyResolverConfig(aliases, { ...paths, '#core': ['./replacement.ts'] }, { '#core': './upstream/core/index.ts' }), /resolver/);
  assert.throws(() => verifyResolverConfig(aliases, paths, { '#core': './replacement.ts' }), /resolver/);
});

test('closure follows cyclic relative imports, type imports and explicit aliases, omitting unrelated files', () => {
  const root = mkdtempSync(join(tmpdir(), 'engine-closure-'));
  function put(path, value) { mkdirSync(dirname(join(root, path)), { recursive: true }); writeFileSync(join(root, path), value); }
  try {
    put('src/start.ts', 'import { value } from "./value.js"; import type { Shape } from "@p/types"; export { shared } from "#core";');
    put('src/value.ts', 'import "./start"; import { create } from "mutative"; export const value = 1;');
    put('types/index.ts', 'export interface Shape { id: string }');
    put('core/index.ts', 'export const shared = 1;');
    put('src/unrelated.ts', 'import "unapproved";');
    const result = collectClosure(root, ['src/start.ts'], { '@p/types': 'types/index.ts', '#core': 'core/index.ts' }, ['mutative']);
    assert.deepEqual(result.files, ['core/index.ts', 'src/start.ts', 'src/value.ts', 'types/index.ts']);
    assert.deepEqual(result.externals, ['mutative']);
    put('src/value.ts', 'import "missing-library";');
    assert.throws(() => collectClosure(root, ['src/start.ts'], { '@p/types': 'types/index.ts', '#core': 'core/index.ts' }, ['mutative']), /Unapproved external/);
    put('src/value.ts', 'import "./absent";');
    assert.throws(() => collectClosure(root, ['src/start.ts'], { '@p/types': 'types/index.ts', '#core': 'core/index.ts' }, ['mutative']), /Missing module/);
    put('src/value.ts', 'const name = "./start"; import(name);');
    assert.throws(() => collectClosure(root, ['src/start.ts'], { '@p/types': 'types/index.ts', '#core': 'core/index.ts' }, ['mutative']), /Nonliteral/);
    assert.throws(() => collectClosure(root, ['../outside.ts'], {}, []), /Unsafe/);
  } finally { rmSync(root, { recursive: true, force: true }); }
});

test('closure rejects source reached through a directory symlink outside the pinned root', () => {
  const root = mkdtempSync(join(tmpdir(), 'engine-link-')), outside = mkdtempSync(join(tmpdir(), 'engine-outside-'));
  try {
    writeFileSync(join(outside, 'value.ts'), 'export const value = 1;'); symlinkSync(outside, join(root, 'linked'));
    assert.throws(() => collectClosure(root, ['linked/value.ts'], {}, []), /Unsafe/);
  } finally { rmSync(root, { recursive: true, force: true }); rmSync(outside, { recursive: true, force: true }); }
});

test('vendor integrity rejects modified, extra and missing source plus an unlisted patch', () => {
  const root = mkdtempSync(join(tmpdir(), 'engine-integrity-'));
  const bytes = Buffer.from('export const value = 1;\n');
  const hash = value => createHash('sha256').update(value).digest('hex');
  const lock = { schema_version: 1, revision: '53a79413c58678b1c50dde57e71de5c123132716', patches: [], files: [{ path: 'upstream/value.ts', upstream_path: 'src/value.ts', upstream_sha256: hash(bytes), sha256: hash(bytes), bytes: bytes.length, git_blob: createHash('sha1').update(Buffer.concat([Buffer.from('blob ' + bytes.length + '\0'), bytes])).digest('hex') }] };
  try {
    mkdirSync(join(root, 'upstream')); writeFileSync(join(root, 'upstream/value.ts'), bytes);
    assert.equal(verifyVendor(root, lock).files, 1);
    writeFileSync(join(root, 'upstream/value.ts'), 'changed');
    assert.throws(() => verifyVendor(root, lock), /bytes|hash/);
    writeFileSync(join(root, 'upstream/value.ts'), bytes); writeFileSync(join(root, 'upstream/extra.ts'), bytes);
    assert.throws(() => verifyVendor(root, lock), /Extra/);
    rmSync(join(root, 'upstream/extra.ts')); rmSync(join(root, 'upstream/value.ts'));
    assert.throws(() => verifyVendor(root, lock), /Missing/);
    writeFileSync(join(root, 'upstream/value.ts'), bytes);
    assert.throws(() => verifyVendor(root, { ...lock, files: [{ ...lock.files[0], upstream_sha256: '0'.repeat(64) }] }), /Unlisted patch/);
  } finally { rmSync(root, { recursive: true, force: true }); }
});
