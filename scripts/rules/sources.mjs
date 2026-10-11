import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import assert from 'node:assert/strict';
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs';
import { assertDocument, assertHash, digest } from './inventory.mjs';

export async function extractPdf(bytes) {
  const task = getDocument({ data: new Uint8Array(bytes), isEvalSupported: false, useSystemFonts: false });
  try {
    const pdf = await task.promise, pages = [];
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i), content = await page.getTextContent();
      pages.push(content.items.map(item => item.str + (item.hasEOL ? '\n' : ' ')).join(''));
    }
    return { pages: pdf.numPages, text: pages.join('\n\f\n') };
  } finally { await task.destroy(); }
}
export async function acquireSources(specs, cacheRoot = '.local/rule-01/source-cache') {
  mkdirSync(cacheRoot, { recursive: true });
  const sources = [];
  for (const spec of specs) {
    const url = new URL(spec.url);
    assert(url.protocol === 'https:' && !url.username && !url.password, 'Only public credential-free HTTPS sources');
    const controller = new AbortController(), timer = setTimeout(() => controller.abort(), 30000);
    const row = { ...spec, acquired_at: new Date().toISOString(), finished_at: null, status: 'missing',
      http_status: null, bytes: null, sha256: null, cache_path: null, extraction: null, error: null };
    try {
      const response = await fetch(url, { signal: controller.signal });
      row.http_status = response.status;
      assert(response.ok, 'HTTP ' + response.status);
      assert(Number(response.headers.get('content-length') ?? 0) <= 40000000, 'Source exceeds40MB limit');
      const bytes = Buffer.from(await response.arrayBuffer());
      assert(bytes.length <= 40000000, 'Source exceeds40MB limit');
      if (spec.kind === 'pdf') assertDocument(bytes, response.headers.get('content-type'));
      if (spec.kind === 'json') JSON.parse(bytes.toString('utf8'));
      row.bytes = bytes.length; row.sha256 = digest(bytes);
      row.cache_path = join(cacheRoot, row.sha256 + '.' + spec.kind);
      if (existsSync(row.cache_path)) assertHash(readFileSync(row.cache_path), row.sha256);
      else writeFileSync(row.cache_path, bytes, { flag: 'wx' });
      row.status = 'acquired';
      if (spec.kind === 'pdf') {
        try {
          const extracted = await extractPdf(bytes), textPath = join(cacheRoot, row.sha256 + '.txt');
          if (!existsSync(textPath)) writeFileSync(textPath, extracted.text, { flag: 'wx' });
          row.extraction = { tool: 'pdfjs-dist6.4.299', pages: extracted.pages, text_sha256: digest(extracted.text), cache_path: textPath };
        } catch (error) { row.error = 'Text extraction: ' + error.message; }
      }
    } catch (error) { row.error = error.message; }
    finally { clearTimeout(timer); row.finished_at = new Date().toISOString(); }
    sources.push(row);
    console.log(row.id, row.status, row.bytes ?? 0, row.error ?? '');
  }
  return { schema_version: 1, recorded_at: new Date().toISOString(), sources };
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const specs = JSON.parse(readFileSync(process.argv[2], 'utf8'));
  const snapshot = await acquireSources(specs);
  const output = process.argv[3];
  assert(output && output.startsWith('docs/rules/'), 'Write metadata only under docs/rules/');
  writeFileSync(output, JSON.stringify(snapshot, null, 2) + '\n', { flag: 'wx' });
}
