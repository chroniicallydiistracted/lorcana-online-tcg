// Builds the real-card presentation fixture from a dated acquisition and fixtures/selection.json, and stores each
// card image byte for byte with its provenance (fan-content rule 3).
// Usage: node scripts/select-fixtures.mjs <acquisition record, e.g. docs/rules/2026-10-21-ravensburger-catalog.json>
import { existsSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { boundedGet, buildPresentation, canonical, fixtureImageSources, jpegSize, readAcquired, rightsBasis, sha256, writeReplacing } from './catalog-lib.mjs';

const packageRoot = fileURLToPath(new URL('../', import.meta.url)), repoRoot = resolve(packageRoot, '../..');
const recordPath = process.argv[2];
if (!recordPath) throw new Error('Usage: node scripts/select-fixtures.mjs docs/rules/YYYY-MM-DD-ravensburger-catalog.json');
const selection = JSON.parse(readFileSync(join(packageRoot, 'fixtures/selection.json'), 'utf8'));
const { catalog, entry } = readAcquired(repoRoot, recordPath, 'en');
const presentation = buildPresentation({ catalog, entry, recordPath, selection });

const previous = existsSync(join(packageRoot, 'src/fixtures/images.json')) ? JSON.parse(readFileSync(join(packageRoot, 'src/fixtures/images.json'), 'utf8')).images : [];
const images = [];
for (const source of fixtureImageSources(presentation)) {
  const path = join(packageRoot, 'fixtures/images', source.file), known = previous.find(p => p.file === source.file && p.sourceUrl === source.sourceUrl);
  if (known && existsSync(path) && sha256(readFileSync(path)) === known.sha256) { images.push(known); continue; }
  const response = await boundedGet(source.sourceUrl, { maxBytes: 8 * 1024 * 1024 });
  if (response.status !== 200 || !String(response.contentType).startsWith('image/jpeg')) throw new Error(`${source.sourceUrl} returned ${response.status} ${response.contentType}`);
  const retrievedAt = new Date().toISOString(), { width, height } = jpegSize(response.bytes);
  writeReplacing(path, response.bytes);
  images.push({ ...source, retrievedAt, sha256: sha256(response.bytes), bytes: response.bytes.length, width, height, format: 'image/jpeg', rightsBasis });
}
writeReplacing(join(packageRoot, 'src/fixtures/presentation.json'), canonical(presentation));
writeReplacing(join(packageRoot, 'src/fixtures/images.json'), canonical({ schema_version: 1, rights_basis: rightsBasis, images }));
console.log(`fixture: ${presentation.cards.length} printings, ${presentation.card_sets.length} sets, ${images.length} images (${images.reduce((n, i) => n + i.bytes, 0)} bytes)`);
