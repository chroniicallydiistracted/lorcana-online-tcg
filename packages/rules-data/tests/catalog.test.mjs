import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { correctRulesText, normalizeRavensburgerCard, normalizeRulesText, normalizeFlavorText, rulesTextCorrections, parseRavensburgerCard, parseRavensburgerCatalog, parseRulesText, printingsOfIdentity, rulesTextSource } from '../src/index.ts';
import { fixtureImage, fixturePrinting, presentationCatalog, presentationImages, presentationSelection, referenceCatalog, referenceImage, referenceImages, referencePrinting, referenceSelection } from '../src/fixtures.ts';
import { jpegSize, sha256 } from '../scripts/catalog-lib.mjs';

// Every case here uses real Ravensburger records (decision D25); invalid inputs are real records with one field broken.
const root = fileURLToPath(new URL('../', import.meta.url)), repoRoot = join(root, '../..');
const presentation = JSON.parse(readFileSync(join(root, 'src/fixtures/presentation.json'), 'utf8'));
const record = id => structuredClone(presentation.cards.find(c => c.record.culture_invariant_id === id).record);
const describe = paragraphs => paragraphs.map(p => p.tokens.map(t => t.kind === 'text' ? `${t.reminder ? '~' : ''}${t.text}` : t.kind === 'break' ? '|' : `[${t.kind}:${t.name ?? t.keyword ?? t.symbol}${t.reminder ? '~' : ''}]`).join(''));

test('the fixture is the reviewed selection, in order, from one recorded acquisition', () => {
  const selection = JSON.parse(readFileSync(join(root, 'fixtures/selection.json'), 'utf8'));
  assert.deepEqual(presentationSelection, selection);
  assert.deepEqual(presentationCatalog.printings.map(p => p.printingId), selection.map(s => s.printingId));
  assert.ok(selection.every(s => s.reason.length > 10), 'every printing records why it is in the fixture');
  const acquisition = JSON.parse(readFileSync(join(repoRoot, presentation.acquisition_record), 'utf8'));
  const english = acquisition.acquisitions.find(a => a.language === 'en' && a.outcome === 'acquired');
  assert.equal(acquisition.rights_basis, 'D07: Ravensburger fan-content terms');
  assert.deepEqual(presentationCatalog.source, { provider: 'ravensburger', url: english.url, language: 'en', catalogHash: english.catalog_hash, appVersion: english.app_version, retrievedAt: english.completed_at, sha256: english.sha256 });
  assert.match(english.url, /^https:\/\/api\.lorcana\.ravensburger\.com\/v3\/catalog\/en$/);
});

test('printings and the card they are in play stay distinct', () => {
  const elsa = fixturePrinting(42), reprint = fixturePrinting(1979);
  assert.equal(elsa.identityId, reprint.identityId);
  assert.notEqual(elsa.printingId, reprint.printingId);
  assert.deepEqual([elsa.collectorNumber, reprint.collectorNumber], ['42/204', '43/204']);
  assert.deepEqual(printingsOfIdentity(presentationCatalog, elsa.identityId).map(p => p.printingId), [42, 1979]);
  assert.deepEqual(printingsOfIdentity(presentationCatalog, fixturePrinting(719).identityId).map(p => p.printingId), [719, 898, 1961]);
});

test('real cards normalize to their printed values', () => {
  const elsa = fixturePrinting(42);
  assert.deepEqual([elsa.category, elsa.name, elsa.subtitle, elsa.identifier, elsa.cost, elsa.inkable, elsa.strength, elsa.willpower, elsa.lore, elsa.rarity], ['character', 'Elsa', 'Spirit of Winter', '42/204 EN 1', 8, false, 4, 6, 3, 'legendary']);
  assert.deepEqual(elsa.inks, ['amethyst']);
  assert.deepEqual(elsa.classifications, ['Floodborn', 'Hero', 'Queen', 'Sorcerer']);
  assert.equal(elsa.flavorText, 'Ice is stronger than you may think.');
  assert.equal(elsa.rulings.length, 1);
  assert.match(elsa.rulings[0].body, /^Q: If I use Elsa – Spirit of Winter’s ability Deep Freeze/);
  assert.ok(!elsa.rulings[0].body.includes('\r'));
  assert.deepEqual(elsa.variants.map(v => [v.id, v.finish, v.layers.foilType]), [['Regular', 'normal', null], ['Foiled', 'foil', 'Silver']]);

  const port = fixturePrinting(3299);
  assert.deepEqual([port.category, port.moveCost, port.willpower, port.lore, port.strength, port.inkable], ['location', 1, 8, 2, null, false]);
  assert.deepEqual(port.classifications, ['Hyperia City']);
  assert.equal(port.flavorText, null);

  const friend = fixturePrinting(2940);
  assert.deepEqual([friend.rarity, friend.subtitle, friend.variants.length], ['enchanted', null, 1]);
  assert.deepEqual(friend.variants[0], { id: 'Regular', finish: 'foil', detailImageUrl: friend.variants[0].detailImageUrl, layers: { foilType: 'Magma', foilMaskUrl: friend.variants[0].layers.foilMaskUrl, topLayer: 'MetallicHotFoil', topLayerMaskUrl: friend.variants[0].layers.topLayerMaskUrl, secondTopLayerMaskUrl: null, hotFoilColor: '#D9A36D', secondHotFoilColor: null } });
  assert.equal(fixturePrinting(898).variants[0].finish, 'foil', 'an Enchanted Regular variant is foil');
  assert.equal(fixturePrinting(1693).inks.length, 2);
  assert.equal(`${fixturePrinting(3134).name} – ${fixturePrinting(3134).subtitle}`, 'Henry J. Waternoose III – Chief Executive Officer');
  assert.deepEqual(presentationCatalog.sets.map(s => s.id), ['set1', 'set4', 'set8', 'quest2', 'set9', 'set10', 'set12', 'set13', 'set14']);
});

test('rules text tokens keep every printed character and mark keywords, abilities, symbols and reminders', () => {
  assert.deepEqual(describe(fixturePrinting(1939).rules), [
    '[keyword:Shift] 4 [symbol:ink] ~(You may pay 4 [symbol:ink~]~ to play this on top of one of your characters named Stitch.)',
    '[ability:Adoring Fans] Whenever you play a character with cost 2 or less, you may exert them to draw a card.',
  ]);
  assert.deepEqual(describe(fixturePrinting(3299).rules), ['[ability:Welcome to Town] Once during your turn, whenever a character moves here, each player gets 1 ink drop and gains 1 lore. ~(Each ink drop may be removed to pay 1 [symbol:ink~]~.)']);
  // An older record writes its paragraph break as `%`.
  assert.match(fixturePrinting(898).rulesText, /for free\.\) %Look/);
  assert.deepEqual(describe(fixturePrinting(898).rules).length, 2);
  for (const printing of presentationCatalog.printings) assert.equal(rulesTextSource(printing.rules), normalizeRulesText(printing.rulesText), `${printing.name} round-trips`);
  assert.equal(normalizeRulesText('Choose one:%• Banish it.%• Draw.'), 'Choose one:\n• Banish it.\n• Draw.');
  assert.equal(normalizeFlavorText('“Your plan’s beginning to crumble.”%—Jafar'), '“Your plan’s beginning to crumble.”\n—Jafar');
  // Donald Duck – Musketeer Soldier (699) as served in English on 2026-10-21: a tab stands in for the ability's opening backslash.
  const donald = '<Bodyguard> (This character may enter play exerted. An opposing character who challenges one of your characters must choose one with Bodyguard if able.)\n\tWait For Me!\\ When you play this character, chosen character gets +1 {L} this turn.';
  assert.match(describe(parseRulesText(donald))[0], /\tWait For Me!\\/, 'uncorrected, the broken mark stays visible as text');
  const corrected = correctRulesText(699, donald);
  assert.deepEqual(corrected.applied, ['rb-699-en-tab']);
  assert.deepEqual(describe(parseRulesText(corrected.text)), ['[keyword:Bodyguard] ~(This character may enter play exerted. An opposing character who challenges one of your characters must choose one with Bodyguard if able.)', '[ability:Wait For Me!] When you play this character, chosen character gets +1 [symbol:lore] this turn.']);
  assert.deepEqual(correctRulesText(42, donald).applied, [], 'corrections are bound to their printing');
  assert.deepEqual(correctRulesText(699, donald + donald).applied, [], 'and apply only to an exact single occurrence');
  for (const c of rulesTextCorrections) assert.equal(c.find.replace(/[\\\s]/g, ''), c.replace.replace(/[\\\s]/g, ''), `${c.id} changes markup only`);
  assert.ok(presentationCatalog.printings.every(p => p.rulesCorrections.length === 0), 'no fixture printing needs a correction');
  assert.deepEqual(parseRulesText(''), []);
  assert.deepEqual(describe(parseRulesText('Unclosed <keyword and {symbol')), ['Unclosed <keyword and {symbol'], 'unclosed markup stays literal text');
});

test('validation rejects malformed records derived from real cards', () => {
  const card = record(42);
  assert.equal(parseRavensburgerCard(card).name, 'Elsa');
  const broken = [
    [c => { delete c.name; }, /lacks name/],
    [c => { c.variants = []; }, /variants is empty/],
    [c => { c.thumbnail_url = c.thumbnail_url.replace('https:', 'http:'); }, /thumbnail_url is not url/],
    [c => { c.ink_cost = '8'; }, /ink_cost is not number/],
    [c => { c.variants[0].detail_image_url = 42; }, /detail_image_url is not url/],
    [c => { c.additional_info = [{ title: 'FAQ' }]; }, /additional_info is malformed/],
  ];
  for (const [mutate, message] of broken) { const copy = record(42); mutate(copy); assert.throws(() => parseRavensburgerCard(copy), message); }
  const goldInk = record(42); goldInk.magic_ink_colors = ['GOLD'];
  assert.throws(() => normalizeRavensburgerCard(goldInk, 'characters'), /Unreviewed ink GOLD/);
  const mythic = record(42); mythic.rarity = 'MYTHIC';
  assert.throws(() => normalizeRavensburgerCard(mythic, 'characters'), /Unreviewed rarity MYTHIC/);
  const catalog = { catalog_hash: presentation.source.catalogHash, application_shared_properties: { current_app_version: '2026.5', minimum_app_version: '2026.2.1' }, card_sets: presentation.card_sets, cards: { characters: [record(42)] }, special_rarities: presentation.special_rarities };
  assert.equal(parseRavensburgerCatalog(catalog).cards.characters.length, 1);
  assert.throws(() => parseRavensburgerCatalog({ ...catalog, cards: { characters: [record(42)], tokens: [] } }), /unreviewed card categories tokens/);
  assert.throws(() => parseRavensburgerCatalog({ ...catalog, catalog_hash: 'latest' }), /catalog_hash/);
  assert.throws(() => parseRavensburgerCatalog({ ...catalog, card_sets: [] }), /card_sets is empty/);
});

test('fixture images are the exact recorded bytes with full provenance', () => {
  const directory = join(root, 'fixtures/images');
  assert.deepEqual(readdirSync(directory).sort(), [...new Set([...presentationImages, ...referenceImages].map(i => i.file))].sort(), 'no unrecorded or missing image files');
  for (const image of [...presentationImages, ...referenceImages]) {
    const bytes = readFileSync(join(directory, image.file));
    assert.equal(sha256(bytes), image.sha256, image.file);
    assert.equal(bytes.length, image.bytes, image.file);
    assert.deepEqual(jpegSize(bytes), { width: image.width, height: image.height }, image.file);
    assert.match(image.sourceUrl, /^https:\/\/api\.lorcana\.ravensburger\.com\/images\/en\//);
    assert.match(image.retrievedAt, /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
    assert.equal(image.rightsBasis, 'D07: Ravensburger fan-content terms');
  }
  for (const printing of presentationCatalog.printings) {
    assert.equal(fixtureImage(printing.printingId, 'thumbnail')?.sourceUrl, printing.thumbnailUrl);
    for (const variant of printing.variants) assert.equal(fixtureImage(printing.printingId, 'detail', variant.id)?.sourceUrl, variant.detailImageUrl, `${printing.name} ${variant.id}`);
  }
  assert.throws(() => fixturePrinting(1), /not in the presentation fixture/);
});

test('the reference fixture is the reviewed UX-01 selection, in order, from the same acquisition', () => {
  const selection = JSON.parse(readFileSync(join(root, 'fixtures/reference-selection.json'), 'utf8'));
  assert.deepEqual(referenceSelection, selection);
  assert.deepEqual(referenceCatalog.printings.map(p => p.printingId), selection.map(s => s.printingId));
  assert.equal(new Set(selection.map(s => s.printingId)).size, selection.length, 'no printing selected twice');
  assert.equal(new Set(selection.map(s => s.reason)).size, selection.length, 'every printing records its own reason');
  assert.ok(selection.every(s => s.reason.length > 30 && (s.detail === undefined || s.detail === true) && (s.image === undefined || s.image === false) && !(s.detail && s.image === false)));
  assert.deepEqual(referenceCatalog.source, presentationCatalog.source);
  assert.equal(referencePrinting(3457).name, 'Kit Cloudkicker');
  assert.throws(() => referencePrinting(42), /not in the reference fixture/);
});

test('reference printings are Core Constructed in the catalog, so the demonstration decks draw only on Core cards', () => {
  for (const printing of referenceCatalog.printings) assert.equal(printing.rotation, 'CoreConstructed', `${printing.name} ${printing.identifier}`);
});

test('reference images: a thumbnail for every printing except records, detail images only where flagged, within the size budget', () => {
  const flagged = new Set(referenceSelection.filter(s => s.detail).map(s => s.printingId)), records = new Set(referenceSelection.filter(s => s.image === false).map(s => s.printingId));
  assert.equal(referenceCatalog.printings.filter(p => p.setIds.includes('set14') && /\/204 EN 14$/.test(p.identifier)).length, 242, 'every Hyperia City standard and special printing, for the binder');
  for (const printing of referenceCatalog.printings) {
    assert.equal(referenceImage(printing.printingId, 'thumbnail')?.sourceUrl, records.has(printing.printingId) ? undefined : printing.thumbnailUrl, printing.name);
    for (const variant of printing.variants) assert.equal(referenceImage(printing.printingId, 'detail', variant.id)?.sourceUrl, flagged.has(printing.printingId) ? variant.detailImageUrl : undefined, `${printing.name} ${variant.id}`);
  }
  const total = rendition => referenceImages.filter(i => i.rendition === rendition).reduce((n, i) => n + i.bytes, 0);
  assert.ok(total('thumbnail') <= 4 * 1024 * 1024, `thumbnails ${total('thumbnail')} bytes`);
  assert.ok(total('detail') <= 3 * 1024 * 1024, `detail images ${total('detail')} bytes`);
});
