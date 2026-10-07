import assert from 'node:assert/strict';
import { test } from 'node:test';
import * as runtime from '../src/index.ts';
import { releaseFixture } from '../../contracts/tests/fixtures.mjs';

test('release registry defensively freezes source and never silently replaces an unavailable pinned release', () => {
  assert.equal(typeof runtime.createReleaseRegistry, 'function');
  const old = releaseFixture('game', 'old-release'), next = releaseFixture('game', 'next-release');
  const registry = runtime.createReleaseRegistry([old, next], next.releaseId);
  old.components.engine.version = 'changed-after-creation';
  assert.equal(registry.active.releaseId, 'next-release');
  assert.equal(registry.resolvePinned('old-release').components.engine.version, 'synthetic-v1');
  assert.throws(() => { registry.resolvePinned('old-release').components.engine.version = 'mutated'; }, TypeError);
  assert.throws(() => registry.resolvePinned('missing-release'), /Unavailable/);
  assert.throws(() => runtime.createReleaseRegistry([next, next], next.releaseId), /Duplicate/);
  assert.throws(() => runtime.createReleaseRegistry([next], 'missing-release'), /Unavailable/);
});
test('release transition proof rejects dropped or changed pins but accepts canonical field reordering', () => {
  assert.equal(typeof runtime.assertRetainedPins, 'function');
  const old = releaseFixture('game', 'old-release'), next = releaseFixture('game', 'next-release');
  const before = runtime.createReleaseRegistry([old], old.releaseId);
  const after = runtime.createReleaseRegistry([next, { ...old, source: { lockSha256: old.source.lockSha256, fingerprint: old.source.fingerprint, commit: old.source.commit } }], next.releaseId);
  assert.doesNotThrow(() => runtime.assertRetainedPins(before, after, ['old-release']));
  assert.throws(() => runtime.assertRetainedPins(before, runtime.createReleaseRegistry([next], next.releaseId), ['old-release']), /Unavailable/);
  const corrupted = releaseFixture('game', 'old-release'); corrupted.components.rules.sha256 = 'd'.repeat(64);
  assert.throws(() => runtime.assertRetainedPins(before, runtime.createReleaseRegistry([corrupted], corrupted.releaseId), ['old-release']), /Changed/);
});

test('release registry cannot expose empty cloned data from inherited manifest fields', () => {
  const fixture=releaseFixture();
  assert.throws(()=>runtime.createReleaseRegistry([Object.create(fixture)],fixture.releaseId),/Invalid/);
});
