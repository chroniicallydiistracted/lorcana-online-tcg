// Acquires Ravensburger's public v3 catalog per language into the ignored raw cache and writes a new dated
// acquisition record under docs/rules (outside the source fingerprint, beside RULE-01's dated source records).
// Usage, from the repository root: node packages/rules-data/scripts/acquire.mjs docs/rules/YYYY-MM-DD-ravensburger-catalog.json
import { existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { acquireCatalogs, canonical, writeNew } from './catalog-lib.mjs';

const packageRoot = fileURLToPath(new URL('../', import.meta.url)), repoRoot = resolve(packageRoot, '../..');
const output = process.argv[2];
if (!output || !/^docs\/rules\/\d{4}-\d{2}-\d{2}-ravensburger-catalog(?:-\d+)?\.json$/.test(output)) throw new Error('Usage: node packages/rules-data/scripts/acquire.mjs docs/rules/YYYY-MM-DD-ravensburger-catalog.json');
if (existsSync(join(repoRoot, output))) throw new Error(`${output} exists; acquisition records are never overwritten`);

// English, German, French and Italian were served on 2026-10-21; Spanish is probed because the project plans it.
const record = await acquireCatalogs({ required: ['en', 'de', 'fr', 'it'], probed: ['es'], cacheRoot: join(repoRoot, '.local/catalog/ravensburger'), repoRoot });
writeNew(join(repoRoot, output), canonical(record));
for (const a of record.acquisitions) console.log(`${a.language} ${a.outcome}${a.http_status ? ` ${a.http_status}` : ''}${a.counts ? ` cards=${Object.values(a.counts.cards).reduce((x, y) => x + y, 0)} variants=${a.counts.variants} hash=${a.catalog_hash}` : ''}${a.reason ? ` ${a.reason}` : ''}`);
if (record.acquisitions.some(a => a.required && a.outcome !== 'acquired')) process.exit(1);
