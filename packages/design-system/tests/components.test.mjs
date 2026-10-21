import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { createHash } from 'node:crypto';
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
test('icon registry (D21): only the registry imports Phosphor, one approved icon per import, no Thin, Light, Bold or Duotone', () => {
  const files = [];
  const walk = folder => { for (const name of readdirSync(folder)) { const path = join(folder, name); if (statSync(path).isDirectory()) walk(path); else if (/\.(?:ts|tsx)$/.test(name)) files.push(path); } };
  walk(join(root, 'src')); walk(join(root, 'stories')); walk(join(root, '../../apps/web/src'));
  const registry = join(root, 'src/components/Icon/registry.ts');
  for (const file of files) {
    const text = readFileSync(file, 'utf8');
    if (file !== registry) assert.doesNotMatch(text, /@phosphor-icons/, `${file} must use Icon, not Phosphor directly`);
    assert.doesNotMatch(text, /weight[=:]\s*\{?\s*['"](?:thin|light|bold|duotone)['"]/, file);
  }
  const imports = [...readFileSync(registry, 'utf8').matchAll(/^import \{ (\w+) \} from '([^']+)';$/gm)];
  assert.ok(imports.length >= 20);
  for (const [, name, source] of imports) assert.equal(source, `@phosphor-icons/react/dist/ssr/${name}`);
  assert.doesNotMatch(readFileSync(registry, 'utf8'), /from '@phosphor-icons\/react'/, 'no barrel import');
});
test('symbol parser refuses scripts, links, images, transforms, unknown styles and mixed fills in single-colour symbols', async () => {
  const { parseSymbol } = await import('../scripts/symbol-lib.mjs');
  const svg = inner => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10">${inner}</svg>`;
  assert.equal(parseSymbol(svg('<path d="M0 0h10v10z"/>'), 'ok').shapes.length, 1);
  for (const [inner, reason] of [['<script>alert(1)</script>', 'script'], ['<image href="x.png"/>', 'image'], ['<path d="M0 0" transform="scale(2)"/>', 'transform'],
    ['<a href="https://example.invalid"><path d="M0 0"/></a>', 'link'], ['<path d="M0 0" onload="x()"/>', 'event handler'], ['<path d="M0 0" style="fill:red"/>', 'inline style'],
    ['<defs><style>.a { stroke: #000; }</style></defs><path class="a" d="M0 0"/>', 'stroke style'], ['<use href="#a"/>', 'use']])
    assert.throws(() => parseSymbol(svg(inner), reason), Error, reason);
  const mixed = parseSymbol(svg('<path d="M0 0" fill="#000"/><path d="M1 1" fill="#fff"/>'), 'mixed');
  assert.equal(new Set(mixed.shapes.map(s => s.fill)).size, 2, 'mixed fills are visible to buildSymbolModule, which refuses them for single-colour symbols');
});
test('symbol provenance: vendored SVGs match the manifest and carry the D07 rights basis', () => {
  const manifest = JSON.parse(readFileSync(join(root, 'src/assets/symbols/manifest.json'), 'utf8'));
  assert.equal(manifest.rights_basis, 'D07: Ravensburger fan-content terms');
  assert.deepEqual(manifest.symbols.filter(s => s.kind === 'ink').map(s => s.name), ['amber', 'amethyst', 'emerald', 'ruby', 'sapphire', 'steel']);
  for (const s of manifest.symbols) assert.equal(createHash('sha256').update(readFileSync(join(root, s.path))).digest('hex'), s.sha256, s.path);
});
