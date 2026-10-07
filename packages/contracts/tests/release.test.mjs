import assert from 'node:assert/strict';
import { test } from 'node:test';
import * as contracts from '../src/index.ts';
import { releaseFixture } from './fixtures.mjs';

test('release manifests bind complete bounded identities while explicitly distinguishing reserved game work', () => {
  assert.equal(typeof contracts.parseReleaseManifest, 'function');
  for (const purpose of ['foundation', 'game']) {
    const fixture = releaseFixture(purpose);
    assert.deepEqual(contracts.parseReleaseManifest(fixture), fixture);
  }
  const fixture = releaseFixture();
  const bad = [null, {}, { ...fixture, schemaVersion: 2 }, { ...fixture, purpose: 'game' }, { ...fixture, createdAt: '2026-02-30T12:00:00.000Z' }, { ...fixture, source: { ...fixture.source, commit: 'main' } }, { ...fixture, privateBundlePath: '/private/engine' }, { ...fixture, components: { ...fixture.components, web: { status: 'reserved' } } }, { ...fixture, components: { ...fixture.components, engine: { status: 'reserved', seed: 'synthetic' } } }, { ...fixture, components: { ...fixture.components, api: { status: 'built', version: 'v1', sha256: 'bad' } } }, { ...fixture, protocol: { min: 1, max: 3 } }];
  for (const value of bad) assert.throws(() => contracts.parseReleaseManifest(value), /Invalid/);
});

test('public manifest parsers reject prototype-only and accessor DTOs', () => {
  const fixture=releaseFixture();
  assert.throws(()=>contracts.parseReleaseManifest(Object.create(fixture)),/Invalid/);
  let calls=0;const accessor={...fixture};Object.defineProperty(accessor,'releaseId',{enumerable:true,get(){calls++;return fixture.releaseId;}});
  assert.throws(()=>contracts.parseReleaseManifest(accessor),/Invalid/);assert.equal(calls,0);
});
