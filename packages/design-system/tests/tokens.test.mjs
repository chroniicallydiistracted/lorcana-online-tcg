import test from 'node:test';
import assert from 'node:assert/strict';
import { cpSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { validateTokens, contrast } from '../scripts/token-lib.mjs';
import { checkTokens } from '../scripts/check-tokens.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
test('token sources are a valid documented DTCG subset, meet every contrast pair and match generated output', async () => {
  const result = await checkTokens();
  assert.equal(result.pairs, 76);
  assert.ok(result.minimumMargin >= 0);
});
test('neutral foundation is genuinely achromatic and both themes map the same semantic tokens', () => {
  const { errors, sets } = validateTokens(root);
  assert.deepEqual(errors, []);
  for (const theme of ['paper', 'ink']) for (const token of sets[theme].values()) if (token.path.startsWith('color.neutral.')) { const [r, g, b] = token.value.components; assert.ok(r === g && g === b, token.path); }
  assert.equal(sets.paper.size, sets.ink.size);
});
test('contrast uses the WCAG relative-luminance formula', () => {
  const white = { components: [1, 1, 1] }, black = { components: [0, 0, 0] };
  assert.equal(Number(contrast(white, black).toFixed(2)), 21);
  assert.equal(Number(contrast(white, white).toFixed(2)), 1);
});

/** Each required check (standard §10) must reject a deliberately broken copy of the sources. */
function broken(mutate) {
  const temp = mkdtempSync(join(tmpdir(), 'inkspire-token-fixture-'));
  cpSync(join(root, 'tokens'), join(temp, 'tokens'), { recursive: true });
  const edit = (file, fn) => { const path = join(temp, 'tokens', file), data = JSON.parse(readFileSync(path, 'utf8')); fn(data); writeFileSync(path, JSON.stringify(data)); };
  mutate(edit);
  try { return validateTokens(temp).errors.join('\n'); } finally { rmSync(temp, { recursive: true, force: true }); }
}
const cases = [
  ['missing reference', edit => edit('semantic/theme-paper.tokens.json', d => { d.color.canvas.$value = '{color.neutral.zz}'; }), /missing reference/],
  ['circular reference', edit => edit('semantic/base.tokens.json', d => { d.motion.hover.$value = '{motion.menu}'; d.motion.menu.$value = '{motion.hover}'; }), /circular reference/],
  ['type mismatch', edit => edit('semantic/base.tokens.json', d => { d.motion.hover.$value = '{space.4}'; }), /type mismatch/],
  ['unsupported construct', edit => edit('primitive/dimension.tokens.json', d => { d.space['4'].$ref = '#/space/2'; }), /unsupported construct/],
  ['unsupported type', edit => edit('primitive/dimension.tokens.json', d => { d.space['4'].$type = 'string'; }), /unsupported type/],
  ['missing theme mapping', edit => edit('semantic/theme-ink.tokens.json', d => { delete d.color.canvas; }), /missing theme mapping/],
  ['invalid unit', edit => edit('primitive/dimension.tokens.json', d => { d.space['4'].$value = { value: 16, unit: 'pt' }; }), /invalid dimension or unit/],
  ['missing description', edit => edit('semantic/theme-paper.tokens.json', d => { delete d.color.surface.$description; }), /missing description/],
  ['contrast regression', edit => edit('semantic/theme-paper.tokens.json', d => { d.color.text.supporting.$value = '{color.neutral.c7}'; }), /contrast regression \(paper\)/],
  ['non-achromatic neutral', edit => edit('primitive/color.tokens.json', d => { d.color.neutral['77'].$value = { colorSpace: 'srgb', components: [0.47, 0.46, 0.47], alpha: 1 }; }), /not achromatic/],
];
for (const [name, mutate, expected] of cases) test(`token validation rejects ${name}`, () => assert.match(broken(mutate), expected));
