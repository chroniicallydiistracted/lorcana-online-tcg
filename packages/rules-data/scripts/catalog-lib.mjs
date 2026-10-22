// Node-only catalog tooling: bounded public GETs, content-addressed raw cache, dated acquisition records and the
// real-card presentation fixture (decision D25). Raw catalog bytes stay in the ignored .local folder.
import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, writeFileSync, existsSync, renameSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { parseRavensburgerCatalog, ravensburgerCategories } from '../src/ravensburger.ts';
import { normalizeRavensburgerCatalog, normalizeRavensburgerCard, normalizeRavensburgerSet } from '../src/catalog.ts';
import { normalizeRulesText, rulesTextSource } from '../src/rules-text.ts';
import { correctRulesText } from '../src/corrections.ts';

export const endpoint = 'https://api.lorcana.ravensburger.com/v3/catalog/{language}';
export const rightsBasis = 'D07: Ravensburger fan-content terms';
export const userAgent = 'TheInkspireCatalog/1.0';
export const sha256 = bytes => createHash('sha256').update(bytes).digest('hex');
export const canonical = value => `${JSON.stringify(value, null, 2)}\n`;

/** One bounded GET: HTTPS (plain HTTP only to loopback, for tests), no redirects, a timeout and a byte limit. */
export async function boundedGet(url, { timeoutMs = 60_000, maxBytes = 40 * 1024 * 1024, fetchImpl = fetch } = {}) {
  if (!/^https:\/\//.test(url) && !/^http:\/\/127\.0\.0\.1:\d+\//.test(url)) throw new Error(`Refusing URL ${url}`);
  const response = await fetchImpl(url, { headers: { 'user-agent': userAgent, accept: 'application/json, image/jpeg;q=0.9' }, signal: AbortSignal.timeout(timeoutMs), redirect: 'error' });
  const chunks = [];
  let total = 0;
  if (response.body) for await (const chunk of response.body) {
    total += chunk.byteLength;
    if (total > maxBytes) throw new Error(`Response from ${url} exceeds ${maxBytes} bytes`);
    chunks.push(chunk);
  }
  const header = name => response.headers.get(name);
  return { status: response.status, contentType: header('content-type'), lastModified: header('last-modified'), etag: header('etag'), cacheControl: header('cache-control'), bytes: Buffer.concat(chunks) };
}

/** Exclusive write: refuses to replace an existing file (evidence and dated records are append-only). */
export function writeNew(path, data) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, data, { flag: 'wx' });
}
/** Atomic replace for generated fixture files. */
export function writeReplacing(path, data) {
  mkdirSync(dirname(path), { recursive: true });
  const temporary = `${path}.tmp-${process.pid}`;
  writeFileSync(temporary, data);
  renameSync(temporary, path);
}
/** Stores raw bytes under their SHA-256; an existing file must hold identical bytes. */
export function cacheBytes(cacheRoot, bytes, extension) {
  const digest = sha256(bytes), path = join(cacheRoot, `${digest}.${extension}`);
  if (existsSync(path)) { if (sha256(readFileSync(path)) !== digest) throw new Error(`Cached file ${path} does not match its name`); }
  else writeNew(path, bytes);
  return { digest, path };
}

/** Counts that identify a catalog response in its acquisition record. */
export function catalogCounts(catalog) {
  const cards = Object.fromEntries(ravensburgerCategories.map(category => [category, (catalog.cards[category] ?? []).length]));
  const variants = ravensburgerCategories.reduce((sum, category) => sum + (catalog.cards[category] ?? []).reduce((n, card) => n + card.variants.length, 0), 0);
  return { sets: catalog.card_sets.length, cards, variants, coconut_cards: Array.isArray(catalog.coconut_cards) ? catalog.coconut_cards.length : 0 };
}

/**
 * Acquires each language sequentially. Required languages must be served and must validate and normalize in full;
 * probed languages (such as Spanish, not served on 2026-10-21) are recorded either way. Returns the dated record.
 */
export async function acquireCatalogs({ required, probed = [], cacheRoot, repoRoot, now = () => new Date().toISOString(), fetchImpl = fetch, urlFor = language => endpoint.replace('{language}', language) }) {
  const acquisitions = [];
  for (const [language, isRequired] of [...required.map(l => [l, true]), ...probed.map(l => [l, false])]) {
    const url = urlFor(language), requestedAt = now();
    try {
      const response = await boundedGet(url, { fetchImpl });
      const completedAt = now();
      const base = { language, required: isRequired, url, requested_at: requestedAt, completed_at: completedAt, http_status: response.status };
      if (response.status !== 200) { acquisitions.push({ ...base, outcome: 'unavailable' }); continue; }
      const catalog = parseRavensburgerCatalog(JSON.parse(response.bytes.toString('utf8')));
      const { digest, path } = cacheBytes(cacheRoot, response.bytes, 'json');
      const source = { provider: 'ravensburger', url, language, catalogHash: catalog.catalog_hash, appVersion: catalog.application_shared_properties.current_app_version, retrievedAt: completedAt, sha256: digest };
      normalizeRavensburgerCatalog(catalog, source);
      acquisitions.push({
        ...base, outcome: 'acquired', content_type: response.contentType, last_modified: response.lastModified, etag: response.etag, cache_control: response.cacheControl,
        bytes: response.bytes.length, sha256: digest, cache_path: relative(repoRoot, path), catalog_hash: catalog.catalog_hash,
        app_version: catalog.application_shared_properties.current_app_version, minimum_app_version: catalog.application_shared_properties.minimum_app_version, counts: catalogCounts(catalog),
      });
    } catch (error) {
      acquisitions.push({ language, required: isRequired, url, requested_at: requestedAt, completed_at: now(), outcome: 'rejected', reason: String(error instanceof Error ? error.message : error) });
    }
  }
  return { schema_version: 1, provider: 'ravensburger', endpoint, decision: 'D25', rights_basis: rightsBasis, acquisitions };
}

/** Reads one acquired language from a dated record and its cache, verifying the bytes. */
export function readAcquired(repoRoot, recordPath, language) {
  const record = JSON.parse(readFileSync(join(repoRoot, recordPath), 'utf8'));
  const entry = record.acquisitions.find(a => a.language === language && a.outcome === 'acquired');
  if (!entry) throw new Error(`${recordPath} has no acquired ${language} catalog`);
  const bytes = readFileSync(join(repoRoot, entry.cache_path));
  if (sha256(bytes) !== entry.sha256 || bytes.length !== entry.bytes) throw new Error(`Cached ${language} catalog does not match ${recordPath}`);
  return { record, entry, catalog: parseRavensburgerCatalog(JSON.parse(bytes.toString('utf8'))) };
}

/** Width and height from a baseline or progressive JPEG's frame header. */
export function jpegSize(bytes) {
  if (bytes[0] !== 0xff || bytes[1] !== 0xd8) throw new Error('Not a JPEG');
  for (let offset = 2; offset + 9 < bytes.length;) {
    if (bytes[offset] !== 0xff) throw new Error('Malformed JPEG marker');
    const marker = bytes[offset + 1];
    if (marker === 0xff) { offset++; continue; }
    const length = bytes.readUInt16BE(offset + 2);
    if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) return { height: bytes.readUInt16BE(offset + 5), width: bytes.readUInt16BE(offset + 7) };
    offset += 2 + length;
  }
  throw new Error('JPEG has no frame header');
}

/** The presentation fixture: exact source records for the selected printings, with the sets and rarities they use. */
export function buildPresentation({ catalog, entry, recordPath, selection }) {
  const cards = [], wanted = new Set(selection.map(s => s.printingId));
  for (const category of ravensburgerCategories) for (const record of catalog.cards[category] ?? []) if (wanted.has(record.culture_invariant_id)) cards.push({ category, record });
  const missing = [...wanted].filter(id => !cards.some(c => c.record.culture_invariant_id === id));
  if (missing.length) throw new Error(`Selected printings not in the catalog: ${missing.join(', ')}`);
  cards.sort((a, b) => selection.findIndex(s => s.printingId === a.record.culture_invariant_id) - selection.findIndex(s => s.printingId === b.record.culture_invariant_id));
  const setIds = new Set(cards.flatMap(c => c.record.card_sets));
  for (const { category, record } of cards) normalizeRavensburgerCard(record, category, catalog.special_rarities);
  return {
    schema_version: 1,
    acquisition_record: recordPath,
    source: { url: entry.url, language: entry.language, catalogHash: entry.catalog_hash, appVersion: entry.app_version, retrievedAt: entry.completed_at, sha256: entry.sha256 },
    selection,
    special_rarities: catalog.special_rarities,
    card_sets: catalog.card_sets.filter(set => setIds.has(set.id)).map(set => { normalizeRavensburgerSet(set); return set; }),
    cards,
  };
}

/**
 * Every image a fixture printing needs: its thumbnail and each distinct full-card image, with the variants that use it.
 * `details: 'flagged'` limits full-card images to selection entries marked `detail: true` (the reference fixture).
 */
export function fixtureImageSources(presentation, { details: which = 'all' } = {}) {
  const sources = [], flagged = new Set(presentation.selection.filter(s => s.detail === true).map(s => s.printingId));
  for (const { record } of presentation.cards) {
    sources.push({ printingId: record.culture_invariant_id, rendition: 'thumbnail', variantIds: [], sourceUrl: record.thumbnail_url });
    if (which === 'flagged' && !flagged.has(record.culture_invariant_id)) continue;
    const details = new Map();
    for (const variant of record.variants) details.set(variant.detail_image_url, [...(details.get(variant.detail_image_url) ?? []), variant.variant_id]);
    let index = 0;
    for (const [sourceUrl, variantIds] of details) sources.push({ printingId: record.culture_invariant_id, rendition: 'detail', variantIds, sourceUrl, suffix: details.size > 1 ? `-${++index}` : '' });
  }
  return sources.map(({ suffix = '', ...source }) => ({ ...source, file: `${source.printingId}-${source.rendition}${suffix}.jpg` }));
}

/**
 * Full-catalog checks that need the raw cache: validation, normalization, exact rules-text round trips, no unknown
 * symbol codes and no markup characters left as literal text (a sign of unclosed or unreviewed markup). Returns the
 * reviewed corrections that applied.
 */
export function auditCatalog(catalog, source) {
  const normalized = normalizeRavensburgerCatalog(catalog, source);
  let roundTrips = 0;
  const corrections = [];
  for (const printing of normalized.printings) {
    if (rulesTextSource(printing.rules) !== normalizeRulesText(correctRulesText(printing.printingId, printing.rulesText).text)) throw new Error(`Rules text of ${printing.printingId} does not round-trip`);
    corrections.push(...printing.rulesCorrections);
    for (const token of printing.rules.flatMap(paragraph => paragraph.tokens)) {
      if (token.kind === 'symbol' && token.symbol === null) throw new Error(`Unreviewed symbol {${token.code}} in ${printing.printingId}`);
      if (token.kind === 'text' && /[<>{}\\%]/.test(token.text)) throw new Error(`Literal markup in ${printing.printingId}: ${token.text}`);
    }
    roundTrips++;
  }
  return { printings: normalized.printings.length, sets: normalized.sets.length, roundTrips, corrections, identities: new Set(normalized.printings.map(p => p.identityId).filter(Boolean)).size };
}
