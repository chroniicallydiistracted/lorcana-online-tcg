import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createServer } from 'node:http';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { acquireCatalogs, boundedGet, buildPresentation, cacheBytes, fixtureImageSources, jpegSize, sha256, writeNew } from '../scripts/catalog-lib.mjs';

// The served catalog is assembled from the real fixture records (decision D25); only transport failures are staged.
const root = fileURLToPath(new URL('../', import.meta.url));
const presentation = JSON.parse(readFileSync(join(root, 'src/fixtures/presentation.json'), 'utf8'));
const cards = {};
for (const { category, record } of presentation.cards) (cards[category] ??= []).push(record);
const catalog = { catalog_hash: presentation.source.catalogHash, application_shared_properties: { current_app_version: presentation.source.appVersion, minimum_app_version: '2026.2.1' }, card_sets: presentation.card_sets, cards, special_rarities: presentation.special_rarities };
const catalogBytes = Buffer.from(JSON.stringify(catalog));

async function serve(routes) {
  const server = createServer((request, response) => {
    const route = routes[request.url ?? ''];
    if (!route) { response.writeHead(403); response.end('forbidden'); return; }
    response.writeHead(200, { 'content-type': 'application/json;charset=UTF-8', 'last-modified': 'Fri, 16 Oct 2026 08:22:39 GMT', 'cache-control': 'public, max-age=604800' });
    response.end(route);
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const { port } = server.address();
  return { base: `http://127.0.0.1:${String(port)}`, close: () => new Promise(resolve => server.close(resolve)) };
}

test('acquisition records acquired, unavailable and rejected languages with exact bytes and provenance', async t => {
  const dir = mkdtempSync(join(tmpdir(), 'catalog-acquire-')), server = await serve({ '/v3/catalog/en': catalogBytes, '/v3/catalog/de': Buffer.from('{"catalog_hash":') });
  t.after(async () => { await server.close(); rmSync(dir, { recursive: true, force: true }); });
  const record = await acquireCatalogs({ required: ['en', 'de'], probed: ['es'], cacheRoot: join(dir, 'cache'), repoRoot: dir, urlFor: language => `${server.base}/v3/catalog/${language}` });
  assert.deepEqual([record.provider, record.decision, record.rights_basis], ['ravensburger', 'D25', 'D07: Ravensburger fan-content terms']);
  const [en, de, es] = record.acquisitions;
  assert.deepEqual([en.language, en.outcome, en.http_status, en.required], ['en', 'acquired', 200, true]);
  assert.deepEqual([en.sha256, en.bytes, en.catalog_hash, en.app_version, en.cache_path], [sha256(catalogBytes), catalogBytes.length, presentation.source.catalogHash, presentation.source.appVersion, `cache/${sha256(catalogBytes)}.json`]);
  assert.deepEqual([en.last_modified, en.cache_control], ['Fri, 16 Oct 2026 08:22:39 GMT', 'public, max-age=604800']);
  assert.deepEqual(en.counts, { sets: presentation.card_sets.length, cards: { characters: 6, actions: 4, items: 1, locations: 1, supplies: 0 }, variants: 22, coconut_cards: 0 });
  assert.ok(Date.parse(en.requested_at) <= Date.parse(en.completed_at));
  assert.deepEqual(readFileSync(join(dir, en.cache_path)), catalogBytes);
  assert.deepEqual([de.outcome, de.required], ['rejected', true]);
  assert.match(de.reason, /JSON/);
  assert.deepEqual([es.outcome, es.http_status, es.required], ['unavailable', 403, false]);
});

test('the presentation fixture is reproduced exactly from a served snapshot', async () => {
  const entry = { url: presentation.source.url, language: 'en', catalog_hash: presentation.source.catalogHash, app_version: presentation.source.appVersion, completed_at: presentation.source.retrievedAt, sha256: presentation.source.sha256 };
  assert.deepEqual(buildPresentation({ catalog: JSON.parse(catalogBytes.toString('utf8')), entry, recordPath: presentation.acquisition_record, selection: presentation.selection }), presentation);
  assert.throws(() => buildPresentation({ catalog, entry, recordPath: 'x', selection: [{ printingId: 1, reason: 'absent' }] }), /not in the catalog: 1/);
  const sources = fixtureImageSources(presentation);
  assert.equal(sources.length, 24);
  assert.deepEqual(sources.slice(0, 2).map(s => [s.file, s.rendition, s.variantIds]), [['42-thumbnail.jpg', 'thumbnail', []], ['42-detail.jpg', 'detail', ['Regular', 'Foiled']]]);
});

test('transport and storage guards', async t => {
  const dir = mkdtempSync(join(tmpdir(), 'catalog-guards-')), server = await serve({ '/big': Buffer.alloc(2048) });
  t.after(async () => { await server.close(); rmSync(dir, { recursive: true, force: true }); });
  await assert.rejects(boundedGet('http://example.org/v3/catalog/en'), /Refusing URL/);
  await assert.rejects(boundedGet(`${server.base}/big`, { maxBytes: 1024 }), /exceeds 1024 bytes/);
  assert.equal((await boundedGet(`${server.base}/big`)).bytes.length, 2048);
  writeNew(join(dir, 'record.json'), '{}');
  assert.throws(() => writeNew(join(dir, 'record.json'), '{}'), /EEXIST/);
  const first = cacheBytes(dir, catalogBytes, 'json');
  assert.deepEqual(cacheBytes(dir, catalogBytes, 'json'), first, 'identical bytes reuse the cached file');
  writeFileSync(first.path, 'tampered');
  assert.throws(() => cacheBytes(dir, catalogBytes, 'json'), /does not match its name/);
  assert.deepEqual(jpegSize(readFileSync(join(root, 'fixtures/images/42-thumbnail.jpg'))), { width: 367, height: 512 });
  assert.throws(() => jpegSize(catalogBytes), /Not a JPEG/);
});
