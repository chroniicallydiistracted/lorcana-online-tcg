import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defaultPreferences, parsePreferences, densityFor, readDevicePreferences, writeDevicePreferences, DEVICE_PREFERENCES_KEY } from '../src/foundation/preferences.ts';
import { catalogs, formatMessage, pseudolocalize } from '../src/foundation/messages.ts';
import { FAN_CONTENT_NOTICE } from '../src/components/FanContentNotice/notice.ts';
import { rendererColors } from '../src/generated/renderer.ts';
import { themeValues, motionDurationsMs, breakpoints } from '../src/generated/tokens.ts';
import { readFont, measureCapHeight } from '../scripts/measure-font-metrics.mjs';

const root = fileURLToPath(new URL('../', import.meta.url)), repository = join(root, '../..');
test('preference defaults match the standard (§31)', () => {
  assert.equal(defaultPreferences.theme, 'system');
  assert.equal(defaultPreferences.density, 'comfortable');
  assert.equal(defaultPreferences.collectionView, 'binder');
  assert.equal(defaultPreferences.confirmQuestAll, true);
  assert.equal(defaultPreferences.confirmEndTurn, true);
  assert.equal(defaultPreferences.additionalConfirmations, false);
  assert.equal(defaultPreferences.autoPass, false);
  assert.equal(defaultPreferences.motion, 'system');
  assert.equal(defaultPreferences.animationSpeed, 1);
  assert.equal(defaultPreferences.renderingQuality, 'automatic');
  assert.equal(defaultPreferences.deferNotificationsDuringPlay, true);
  assert.equal(defaultPreferences.masterAudio, false);
  assert.equal(defaultPreferences.music, false);
  assert.equal(defaultPreferences.ambience, false);
  assert.equal(defaultPreferences.gameplayCues, false);
});
test('preferences parse safely: wrong version, unknown fields and invalid values fall back to defaults', () => {
  assert.deepEqual(parsePreferences(null), defaultPreferences);
  assert.deepEqual(parsePreferences({ version: 0, theme: 'ink' }), defaultPreferences);
  const parsed = parsePreferences({ ...defaultPreferences, theme: 'ink', density: 'tiny', animationSpeed: 9, hand: ['secret'], densityOverrides: { collection: 'compact', board: 'compact' } });
  assert.equal(parsed.theme, 'ink');
  assert.equal(parsed.density, 'comfortable');
  assert.equal(parsed.animationSpeed, 1);
  assert.equal('hand' in parsed, false);
  assert.deepEqual(parsed.densityOverrides, { collection: 'compact' });
  assert.equal(densityFor(parsed, 'collection'), 'compact');
  assert.equal(densityFor(parsed, 'decks'), 'comfortable');
  assert.equal(parsePreferences({ ...defaultPreferences, confirmEndTurn: false, confirmQuestAll: true }).confirmQuestAll, true, 'the two confirmations are independent');
});
test('device preference storage is safe when storage fails and round-trips when it works', () => {
  const map = new Map(), store = { getItem: k => map.get(k) ?? null, setItem: (k, v) => map.set(k, v) };
  assert.equal(writeDevicePreferences(store, { ...defaultPreferences, theme: 'paper' }), true);
  assert.equal(readDevicePreferences(store).theme, 'paper');
  assert.ok(map.has(DEVICE_PREFERENCES_KEY));
  const failing = { getItem() { throw new Error('blocked'); }, setItem() { throw new Error('blocked'); } };
  assert.deepEqual(readDevicePreferences(failing), defaultPreferences);
  assert.equal(writeDevicePreferences(failing, defaultPreferences), false);
});
test('messages: plurals, placeholders, locale numbers and a pseudolocale with the same keys', () => {
  assert.equal(formatMessage(catalogs.en['search.results'], { count: 0 }, 'en'), 'No results');
  assert.equal(formatMessage(catalogs.en['search.results'], { count: 1 }, 'en'), '1 result');
  assert.equal(formatMessage(catalogs.en['search.results'], { count: 1280 }, 'en'), '1,280 results');
  assert.equal(formatMessage(catalogs.en['action.inspect'], { name: 'Synthetic Explorer' }, 'en'), 'Inspect Synthetic Explorer');
  assert.deepEqual(Object.keys(catalogs['en-XA']), Object.keys(catalogs.en));
  const pseudo = pseudolocalize('Inspect {name}');
  assert.match(pseudo, /\{name\}/); assert.notEqual(pseudo, 'Inspect {name}');
  assert.ok(pseudo.length > 'Inspect {name}'.length);
});
test('the fan-content notice is the policy text word for word with only the subject replaced', () => {
  const policy = readFileSync(join(repository, 'docs/policies/fan-content.md'), 'utf8');
  const quoted = policy.match(/^> (\[This website, artwork, etc\.\].*)$/m)[1];
  assert.equal(FAN_CONTENT_NOTICE, quoted.replaceAll('[This website, artwork, etc.]', 'The Inkspire'));
});
test('font provenance: every imported file matches its recorded checksum, source and rights basis', () => {
  const manifest = JSON.parse(readFileSync(join(root, 'src/assets/fonts/manifest.json'), 'utf8'));
  const sha = path => createHash('sha256').update(readFileSync(join(root, path))).digest('hex');
  const iface = manifest.families.find(f => f.role === 'interface');
  assert.equal(iface.license, 'OFL-1.1');
  assert.equal(sha(iface.license_file.path), iface.license_file.sha256);
  assert.deepEqual(iface.files.filter(f => !f.use).map(f => f.weight), [400, 600, 700]);
  for (const role of ['card-title', 'card-text', 'card-number']) {
    const family = manifest.families.find(f => f.role === role);
    assert.equal(family.status, 'imported', role);
    assert.match(family.rights_basis, /^Director decision D20/);
    assert.ok(family.embedded_rights && family.source.commit && family.files.length, role);
  }
  for (const family of manifest.families) for (const file of family.files) assert.equal(sha(file.path), file.sha256, file.path);
  assert.deepEqual(manifest.families.find(f => f.role === 'card-text').files.map(f => `${f.weight} ${f.style}`), ['400 normal', '400 italic', '500 normal', '700 normal', '900 italic']);
  assert.deepEqual(manifest.fallback.faces.map(f => f.weight), [400, 600, 700]);
});
test('card text: the recorded Brandon coverage and its measured cap-height fallback match the files', () => {
  const manifest = JSON.parse(readFileSync(join(root, 'src/assets/fonts/manifest.json'), 'utf8'));
  const brandon = manifest.families.find(f => f.role === 'card-text'), fallback = manifest.card_text_fallback;
  assert.equal(fallback.for, brandon.family);
  for (const file of brandon.files) {
    const font = readFont(join(root, file.path));
    assert.equal(String.fromCodePoint(...font.codePoints), brandon.coverage.characters, file.path);
    assert.equal(font.codePoints.length, brandon.coverage.code_points);
    for (const ch of '\u2019()—:') assert.ok(!font.codePoints.includes(ch.codePointAt(0)), `the trial build lacks ${ch}, so the fallback supplies it`);
    const face = fallback.faces.find(f => f.weight === file.weight && f.style === file.style);
    const measured = measureCapHeight(font, readFont(join(root, face.src)));
    for (const key of ['sizeAdjust', 'ascentOverride', 'descentOverride', 'lineGapOverride']) assert.equal(face[key], measured[key], `${file.path} ${key}`);
    assert.equal(face.web_sha256, file.sha256);
  }
  const css = readFileSync(join(root, 'src/generated/fonts.css'), 'utf8');
  assert.ok(!/font-family: "Source Sans 3";\n {2}src: url\("[^"]*SourceSans3-(It|Medium|BlackIt)\.woff2/.test(css), 'fallback-only files never join the interface family');
  assert.equal((css.match(/font-family: "Card Text Fallback"/g) ?? []).length, 5);
});
test('generated values: Paper and Ink canvases, motion roles, breakpoints and renderer colour spaces', () => {
  assert.equal(themeValues.paper['color.canvas'], '#f7f7f7');
  assert.equal(themeValues.ink['color.canvas'], '#141414');
  assert.equal(motionDurationsMs.hover, 80);
  assert.equal(breakpoints.wide, '64rem');
  const canvas = rendererColors.ink['color.canvas'];
  assert.deepEqual(canvas.srgb, [0.078431, 0.078431, 0.078431]);
  assert.ok(Math.abs(canvas.linear[0] - Math.pow((0.078431 + 0.055) / 1.055, 2.4)) < 1e-5, 'linear is converted once from sRGB');
});
