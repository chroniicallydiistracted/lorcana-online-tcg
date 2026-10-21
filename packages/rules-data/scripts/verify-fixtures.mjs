// Checks that need the ignored raw cache: every acquired language validates, normalizes and round-trips its rules
// text, and the committed fixture is exactly what the selection derives from the recorded snapshot.
// Usage: node scripts/verify-fixtures.mjs <acquisition record, e.g. docs/rules/2026-10-21-ravensburger-catalog.json>
import { isDeepStrictEqual } from 'node:util';
import { readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { auditCatalog, buildPresentation, readAcquired } from './catalog-lib.mjs';
import { rulesTextCorrections } from '../src/corrections.ts';

const packageRoot = fileURLToPath(new URL('../', import.meta.url)), repoRoot = resolve(packageRoot, '../..');
const recordPath = process.argv[2];
if (!recordPath) throw new Error('Usage: node scripts/verify-fixtures.mjs docs/rules/YYYY-MM-DD-ravensburger-catalog.json');
const record = JSON.parse(readFileSync(join(repoRoot, recordPath), 'utf8'));
const applied = new Set();
for (const acquisition of record.acquisitions.filter(a => a.outcome === 'acquired')) {
  const { catalog, entry } = readAcquired(repoRoot, recordPath, acquisition.language);
  const audit = auditCatalog(catalog, { provider: 'ravensburger', url: entry.url, language: entry.language, catalogHash: entry.catalog_hash, appVersion: entry.app_version, retrievedAt: entry.completed_at, sha256: entry.sha256 });
  audit.corrections.forEach(id => applied.add(id));
  console.log(`${acquisition.language}: ${audit.printings} printings, ${audit.identities} identities, ${audit.sets} sets, ${audit.roundTrips} exact rules-text round trips, corrections ${audit.corrections.join(' ') || 'none'}`);
}
const unused = rulesTextCorrections.filter(c => !applied.has(c.id)).map(c => c.id);
if (unused.length) throw new Error(`Corrections no longer match any record: ${unused.join(', ')}`);
const { catalog, entry } = readAcquired(repoRoot, recordPath, 'en');
const selection = JSON.parse(readFileSync(join(packageRoot, 'fixtures/selection.json'), 'utf8'));
const committed = JSON.parse(readFileSync(join(packageRoot, 'src/fixtures/presentation.json'), 'utf8'));
if (!isDeepStrictEqual(buildPresentation({ catalog, entry, recordPath: recordPath, selection }), committed)) throw new Error('The committed presentation fixture differs from the recorded snapshot');
console.log(`fixture: ${committed.cards.length} printings match the recorded snapshot exactly`);
