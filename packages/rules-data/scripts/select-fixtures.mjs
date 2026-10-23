// Builds the real-card presentation fixture (fixtures/selection.json) and the UX-01 reference fixture
// (fixtures/reference-selection.json) from a dated acquisition, and stores each card image byte for byte with its
// provenance (fan-content rule 3).
// Usage: node scripts/select-fixtures.mjs <acquisition record, e.g. docs/rules/2026-10-21-ravensburger-catalog.json>
import { existsSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { boundedGet, buildPresentation, canonical, fixtureImageSources, jpegSize, readAcquired, rightsBasis, sha256, writeReplacing } from './catalog-lib.mjs';

const packageRoot = fileURLToPath(new URL('../', import.meta.url)), repoRoot = resolve(packageRoot, '../..');
const recordPath = process.argv[2];
if (!recordPath) throw new Error('Usage: node scripts/select-fixtures.mjs docs/rules/YYYY-MM-DD-ravensburger-catalog.json');
const { catalog, entry } = readAcquired(repoRoot, recordPath, 'en');
const manifestPath = name => join(packageRoot, 'src/fixtures', name);
const recorded = name => existsSync(manifestPath(name)) ? JSON.parse(readFileSync(manifestPath(name), 'utf8')).images : [];
// Both fixtures share fixtures/images: a file already recorded by either manifest with matching bytes is reused, not fetched again.
const previous = [...recorded('images.json'), ...recorded('reference-images.json')];

async function writeFixture({ selectionFile, presentationFile, imagesFile, details }) {
  const selection = JSON.parse(readFileSync(join(packageRoot, 'fixtures', selectionFile), 'utf8'));
  const presentation = buildPresentation({ catalog, entry, recordPath, selection });
  const images = [];
  for (const source of fixtureImageSources(presentation, { details })) {
    const path = join(packageRoot, 'fixtures/images', source.file), known = previous.find(p => p.file === source.file && p.sourceUrl === source.sourceUrl);
    if (known && existsSync(path) && sha256(readFileSync(path)) === known.sha256) { images.push(known); continue; }
    const response = await boundedGet(source.sourceUrl, { maxBytes: 8 * 1024 * 1024 });
    if (response.status !== 200 || !String(response.contentType).startsWith('image/jpeg')) throw new Error(`${source.sourceUrl} returned ${response.status} ${response.contentType}`);
    const retrievedAt = new Date().toISOString(), { width, height } = jpegSize(response.bytes);
    writeReplacing(path, response.bytes);
    const image = { ...source, retrievedAt, sha256: sha256(response.bytes), bytes: response.bytes.length, width, height, format: 'image/jpeg', rightsBasis };
    previous.push(image);
    images.push(image);
  }
  writeReplacing(manifestPath(presentationFile), canonical(presentation));
  writeReplacing(manifestPath(imagesFile), canonical({ schema_version: 1, rights_basis: rightsBasis, images }));
  console.log(`${presentationFile}: ${presentation.cards.length} printings, ${presentation.card_sets.length} sets, ${images.length} images (${images.reduce((n, i) => n + i.bytes, 0)} bytes)`);
}
await writeFixture({ selectionFile: 'selection.json', presentationFile: 'presentation.json', imagesFile: 'images.json', details: 'all' });
// The UX-01 reference screens: thumbnails for every printing, full-card images only for the printings the stories inspect.
await writeFixture({ selectionFile: 'reference-selection.json', presentationFile: 'reference.json', imagesFile: 'reference-images.json', details: 'flagged' });
