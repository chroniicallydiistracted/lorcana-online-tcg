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
test('font provenance: imported files match recorded checksums; unlicensed card faces are not imported', () => {
  const manifest = JSON.parse(readFileSync(join(root, 'src/assets/fonts/manifest.json'), 'utf8'));
  const sha = path => createHash('sha256').update(readFileSync(join(root, path))).digest('hex');
  const iface = manifest.families.find(f => f.role === 'interface');
  assert.equal(iface.license, 'OFL-1.1');
  for (const file of iface.files) assert.equal(sha(file.path), file.sha256, file.path);
  assert.deepEqual(iface.files.map(f => f.weight), [400, 600, 700]);
  assert.equal(sha(iface.license_file.path), iface.license_file.sha256);
  for (const role of ['card-title', 'card-text', 'card-number']) { const family = manifest.families.find(f => f.role === role); assert.equal(family.status, 'not_imported'); assert.ok(family.reason.length > 40); }
  assert.deepEqual(manifest.fallback.faces.map(f => f.weight), [400, 600, 700]);
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
