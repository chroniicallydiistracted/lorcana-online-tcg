import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { checkComponents } from '../scripts/check-components.mjs';
import { writeTypes } from '../scripts/css-module-types.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
test('every component meets the documentation contract and every documented state has a story', async () => {
  const result = await checkComponents();
  assert.deepEqual(result.problems, []);
  assert.ok(result.components >= 40);
  assert.equal(result.covered, result.states);
});
test('CSS module class types are generated and current', () => assert.deepEqual(writeTypes({ check: true }), []));
test('no component is marked stable without approved visual treatment and evidence', async () => {
  const docs = readdirSync(join(root, 'src/components'), { recursive: true }).filter(name => String(name).endsWith('.docs.ts'));
  for (const file of docs) assert.doesNotMatch(readFileSync(join(root, 'src/components', String(file)), 'utf8'), /status: 'stable'/);
});
test('the design system never imports Babylon or server-only code', () => {
  const files = [];
  const walk = folder => { for (const name of readdirSync(folder)) { const path = join(folder, name); if (statSync(path).isDirectory()) walk(path); else if (/\.(?:ts|tsx)$/.test(name)) files.push(path); } };
  walk(join(root, 'src'));
  for (const file of files) assert.doesNotMatch(readFileSync(file, 'utf8'), /from ['"](?:@babylonjs\/|@lorcana\/(?:db|engine-adapter|vendor-engine|service-runtime)|node:)/, file);
});
