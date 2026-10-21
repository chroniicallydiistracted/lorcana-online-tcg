// Measures fallback @font-face metrics from actual font files (standard §6: never guess size-adjust).
// Reads TrueType/OpenType and WOFF2 files.
// Usage:
//   node scripts/measure-font-metrics.mjs <corpus.txt> <web> <fallback> [<web> <fallback> ...]
//     Metric fallback: size-adjust makes the fallback's average advance, weighted by the corpus's
//     character frequencies, match the web font's.
//   node scripts/measure-font-metrics.mjs --cap-height <web> <fallback> [<web> <fallback> ...]
//     Coverage fallback: size-adjust makes the fallback's cap height match the web font's, so the
//     characters the web font lacks align with its capitals (decision D20).
// Both print JSON with the web font's vertical metrics divided by size-adjust.
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { brotliDecompressSync } from 'node:zlib';

const WOFF2_TAGS = ['cmap', 'head', 'hhea', 'hmtx', 'maxp', 'name', 'OS/2', 'post', 'cvt ', 'fpgm', 'glyf', 'loca', 'prep', 'CFF ', 'VORG', 'EBDT', 'EBLC', 'gasp', 'hdmx', 'kern', 'LTSH', 'PCLT', 'VDMX', 'vhea', 'vmtx', 'BASE', 'GDEF', 'GPOS', 'GSUB', 'EBSC', 'JSTF', 'MATH', 'CBDT', 'CBLC', 'COLR', 'CPAL', 'SVG ', 'sbix', 'acnt', 'avar', 'bdat', 'bloc', 'bsln', 'cvar', 'fdsc', 'feat', 'fmtx', 'fvar', 'gvar', 'hsty', 'just', 'lcar', 'mort', 'morx', 'opbd', 'prop', 'trak', 'Zapf', 'Silf', 'Glat', 'Gloc', 'Feat', 'Sill'];
// WOFF2 (W3C WOFF2 §5): a table directory with UIntBase128 lengths, then one Brotli stream.
// head, hhea, OS/2 and cmap are never transformed; a transformed hmtx is reported so widths are refused.
function woff2Tables(bytes) {
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength), count = view.getUint16(12), dir = [];
  let at = 48;
  const base128 = () => { let value = 0; for (let i = 0; i < 5; i++) { const b = bytes[at++]; value = value * 128 + (b & 0x7f); if (!(b & 0x80)) return value; } throw new Error('Invalid WOFF2 length'); };
  for (let i = 0; i < count; i++) {
    const flags = bytes[at++];
    const tag = (flags & 0x3f) === 0x3f ? String.fromCharCode(...bytes.subarray(at, (at += 4))) : WOFF2_TAGS[flags & 0x3f];
    const version = flags >> 6, original = base128();
    const transformed = tag === 'glyf' || tag === 'loca' ? version === 0 : version !== 0;
    dir.push({ tag, transformed, length: transformed ? base128() : original });
  }
  const data = brotliDecompressSync(bytes.subarray(at, at + view.getUint32(20))), out = {};
  let offset = 0;
  for (const { tag, transformed, length } of dir) { out[tag] = { offset, length, transformed }; offset += length; }
  return { view: new DataView(data.buffer, data.byteOffset, data.byteLength), out };
}
function tables(bytes) {
  if (String.fromCharCode(...bytes.subarray(0, 4)) === 'wOF2') return woff2Tables(bytes);
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength), count = view.getUint16(4), out = {};
  for (let i = 0; i < count; i++) {
    const at = 12 + i * 16, tag = String.fromCharCode(...bytes.subarray(at, at + 4));
    out[tag] = { offset: view.getUint32(at + 8), length: view.getUint32(at + 12) };
  }
  return { view, out };
}
function cmap(view, base) {
  const map = new Map(), count = view.getUint16(base + 2);
  let format4, format12;
  for (let i = 0; i < count; i++) {
    const platform = view.getUint16(base + 4 + i * 8), encoding = view.getUint16(base + 6 + i * 8), offset = base + view.getUint32(base + 8 + i * 8);
    const format = view.getUint16(offset);
    if (platform === 3 && encoding === 10 && format === 12) format12 = offset;
    if (platform === 3 && encoding === 1 && format === 4) format4 = offset;
  }
  if (format12 !== undefined) {
    const groups = view.getUint32(format12 + 12);
    for (let g = 0; g < groups; g++) {
      const at = format12 + 16 + g * 12, start = view.getUint32(at), end = view.getUint32(at + 4), glyph = view.getUint32(at + 8);
      for (let c = start; c <= end && c <= 0x2fff; c++) map.set(c, glyph + c - start);
    }
    return map;
  }
  if (format4 === undefined) throw new Error('No Unicode cmap');
  const segX2 = view.getUint16(format4 + 6), ends = format4 + 14, starts = ends + segX2 + 2, deltas = starts + segX2, ranges = deltas + segX2;
  for (let s = 0; s < segX2 / 2; s++) {
    const end = view.getUint16(ends + s * 2), start = view.getUint16(starts + s * 2), delta = view.getInt16(deltas + s * 2), rangeAt = ranges + s * 2, range = view.getUint16(rangeAt);
    for (let c = start; c <= end && c !== 0xffff; c++) {
      let glyph;
      if (range === 0) glyph = (c + delta) & 0xffff;
      else { glyph = view.getUint16(rangeAt + range + (c - start) * 2); if (glyph !== 0) glyph = (glyph + delta) & 0xffff; }
      if (glyph) map.set(c, glyph);
    }
  }
  return map;
}
export function readFont(path) {
  const bytes = readFileSync(path), { view, out } = tables(bytes);
  for (const tag of ['head', 'hhea', 'hmtx', 'cmap', 'OS/2']) if (!out[tag]) throw new Error('Missing table ' + tag);
  const head = out.head.offset, hhea = out.hhea.offset, os2 = out['OS/2'].offset, hmtx = out.hmtx.offset, os2Version = view.getUint16(os2);
  const unitsPerEm = view.getUint16(head + 18), metrics = view.getUint16(hhea + 34), chars = cmap(view, out.cmap.offset);
  const advance = glyph => view.getUint16(hmtx + Math.min(glyph, metrics - 1) * 4);
  return {
    sha256: createHash('sha256').update(bytes).digest('hex'), unitsPerEm,
    hhea: { ascender: view.getInt16(hhea + 4), descender: view.getInt16(hhea + 6), lineGap: view.getInt16(hhea + 8) },
    typo: { ascender: view.getInt16(os2 + 68), descender: view.getInt16(os2 + 70), lineGap: view.getInt16(os2 + 72), useTypoMetrics: (view.getUint16(os2 + 62) & 0x80) !== 0 },
    win: { ascent: view.getUint16(os2 + 74), descent: view.getUint16(os2 + 76) },
    xHeight: os2Version >= 2 ? view.getInt16(os2 + 86) : undefined,
    capHeight: os2Version >= 2 ? view.getInt16(os2 + 88) : undefined,
    codePoints: [...chars.keys()].sort((a, b) => a - b),
    width(codePoint) {
      if (out.hmtx.transformed) throw new Error('Transformed WOFF2 hmtx: widths unavailable');
      const glyph = chars.get(codePoint); return glyph === undefined ? undefined : advance(glyph) / unitsPerEm;
    },
  };
}
export function frequencies(text) {
  const counts = new Map();
  for (const char of text.normalize('NFC')) { const code = char.codePointAt(0); if (code >= 0x20 && code !== 0x7f) counts.set(code, (counts.get(code) ?? 0) + 1); }
  return counts;
}
export function averageWidth(font, counts, other) {
  let total = 0, weight = 0;
  for (const [code, n] of counts) {
    const a = font.width(code), b = other.width(code);
    if (a === undefined || b === undefined) continue; // measure only characters both faces render
    total += a * n; weight += n;
  }
  if (!weight) throw new Error('No shared characters');
  return total / weight;
}
const round = (value, digits = 4) => Number(value.toFixed(digits));
function overrides(web, sizeAdjust) {
  // Browsers lay out the web face with typo metrics when USE_TYPO_METRICS is set, otherwise hhea.
  const v = web.typo.useTypoMetrics ? { ascent: web.typo.ascender, descent: -web.typo.descender, lineGap: web.typo.lineGap } : { ascent: web.hhea.ascender, descent: -web.hhea.descender, lineGap: web.hhea.lineGap };
  return {
    sizeAdjust: round(sizeAdjust * 100, 2),
    ascentOverride: round(v.ascent / web.unitsPerEm / sizeAdjust * 100, 2),
    descentOverride: round(v.descent / web.unitsPerEm / sizeAdjust * 100, 2),
    lineGapOverride: round(v.lineGap / web.unitsPerEm / sizeAdjust * 100, 2),
    verticalMetricsSource: web.typo.useTypoMetrics ? 'OS/2 typo (USE_TYPO_METRICS)' : 'hhea',
  };
}
export function measurePair(web, fallback, counts) {
  return overrides(web, averageWidth(web, counts, fallback) / averageWidth(fallback, counts, web));
}
export function measureCapHeight(web, fallback) {
  if (!web.capHeight || !fallback.capHeight) throw new Error('Cap height requires OS/2 version 2 or later');
  return overrides(web, (web.capHeight / web.unitsPerEm) / (fallback.capHeight / fallback.unitsPerEm));
}
if (process.argv[1] && import.meta.url.endsWith(process.argv[1].split('/').pop())) {
  const [first, ...fonts] = process.argv.slice(2), capHeight = first === '--cap-height';
  if (!first || fonts.length < 2 || fonts.length % 2) throw new Error('Usage: (corpus | --cap-height) web fallback [...]');
  const text = capHeight ? '' : readFileSync(first, 'utf8'), counts = frequencies(text), results = [];
  for (let i = 0; i < fonts.length; i += 2) {
    const web = readFont(fonts[i]), fallback = readFont(fonts[i + 1]);
    results.push({ web: { file: fonts[i].split('/').pop(), sha256: web.sha256, codePoints: web.codePoints.length }, fallback: { file: fonts[i + 1].split('/').pop(), sha256: fallback.sha256 }, ...(capHeight ? measureCapHeight(web, fallback) : measurePair(web, fallback, counts)) });
  }
  const basis = capHeight ? { method: 'cap-height' } : { corpus: { file: first.split('/').pop(), sha256: createHash('sha256').update(text).digest('hex'), characters: [...counts.values()].reduce((a, b) => a + b, 0) } };
  console.log(JSON.stringify({ ...basis, results }, null, 2));
}
