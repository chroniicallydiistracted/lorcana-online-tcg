import { existsSync, lstatSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { sha256 } from './documentation-lib.mjs';
import { parseReleaseManifest, FOUNDATION_PROTOCOL } from '../packages/contracts/src/index.ts';

function digestTree(root) {
  if (!existsSync(root) || lstatSync(root).isSymbolicLink() || !lstatSync(root).isDirectory()) throw new Error('Missing or unsafe release build');
  const rows = [];
  function walk(folder, prefix = '') {
    for (const name of readdirSync(folder).sort()) {
      const path = prefix + name, absolute = join(folder, name), stat = lstatSync(absolute);
      if (stat.isSymbolicLink() || !stat.isDirectory() && !stat.isFile()) throw new Error('Unsafe release build entry');
      if (stat.isDirectory()) walk(absolute, path + '/');
      else { const bytes = readFileSync(absolute); rows.push({ path, bytes: bytes.length, sha256: sha256(bytes) }); }
    }
  }
  walk(root);
  if (!rows.length) throw new Error('Empty release build');
  return sha256(JSON.stringify(rows));
}

const releaseWorkspaces = ['apps/web', 'apps/api', 'apps/match-service', 'apps/worker', 'packages/contracts', 'packages/design-system', 'packages/presentation', 'packages/service-runtime', 'packages/db'];
function digestClosure(root, owner, includeMigrations = false) {
  const packages = new Map(releaseWorkspaces.map(path => {
    const file = join(root, path, 'package.json');
    if (lstatSync(file).isSymbolicLink() || !lstatSync(file).isFile()) throw new Error('Unsafe release package');
    const manifest = JSON.parse(readFileSync(file));
    if (manifest.name !== '@lorcana/' + path.split('/')[1]) throw new Error('Invalid release package identity');
    return [manifest.name, { path, file, manifest }];
  }));
  const rows = [], seen = new Set();
  function visit(name) {
    if (seen.has(name)) return;
    seen.add(name);
    const pkg = packages.get(name);
    if (!pkg) throw new Error('Missing runtime workspace');
    const bytes = readFileSync(pkg.file);
    rows.push({ path: pkg.path + '/package.json', bytes: bytes.length, sha256: sha256(bytes) });
    rows.push({ path: pkg.path + '/dist', sha256: digestTree(join(root, pkg.path, 'dist')) });
    for (const [dependency, version] of Object.entries({ ...pkg.manifest.dependencies, ...pkg.manifest.optionalDependencies, ...pkg.manifest.peerDependencies })) {
      if (dependency.startsWith('@lorcana/') || String(version).startsWith('workspace:')) visit(dependency);
    }
  }
  visit('@lorcana/' + owner.split('/')[1]);
  if (includeMigrations) rows.push({ path: 'packages/db/migrations', sha256: digestTree(join(root, 'packages/db/migrations')) });
  rows.sort((a, b) => a.path < b.path ? -1 : a.path > b.path ? 1 : 0);
  return sha256(JSON.stringify(rows));
}
export function buildFoundationRelease(root, identity, createdAt = new Date().toISOString()) {
  const components = {};
  for (const [name, workspace] of [['web', 'apps/web'], ['api', 'apps/api'], ['matchService', 'apps/match-service'], ['worker', 'apps/worker']]) {
    const digest = digestClosure(root, workspace);
    components[name] = { status: 'built', version: 'build-' + digest, sha256: digest };
  }
  const schemaDigest = digestClosure(root, 'packages/db', true);
  components.databaseSchema = { status: 'built', version: 'schema-' + schemaDigest, sha256: schemaDigest };
  for (const name of ['engine', 'content', 'rules', 'products', 'rewards']) components[name] = { status: 'reserved' };
  const fields = { schemaVersion: 1, purpose: 'foundation', createdAt, source: { commit: identity.source_commit, fingerprint: identity.source_fingerprint, lockSha256: identity.lock_sha256 }, protocol: FOUNDATION_PROTOCOL, components };
  return parseReleaseManifest({ ...fields, releaseId: 'foundation-' + sha256(JSON.stringify(fields)) });
}
export function verifyFoundationRelease(root, value, identity) {
  const release = parseReleaseManifest(value);
  const expected = buildFoundationRelease(root, identity, release.createdAt);
  if (JSON.stringify(release) !== JSON.stringify(expected)) {
    // Order of JSON object keys is not identity; compare the exact typed scalar tree.
    function same(a, b) {
      if (a && b && typeof a === 'object' && typeof b === 'object') {
        const keys = Object.keys(a).sort();
        return keys.join() === Object.keys(b).sort().join() && keys.every(key => same(a[key], b[key]));
      }
      return a === b;
    }
    if (!same(release, expected)) throw new Error('Release identity differs from built source, app or SQL bytes');
  }
  return release;
}
