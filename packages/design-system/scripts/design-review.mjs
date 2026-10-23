// Impeccable detector gate (Director decision D30): fetches the pinned engine, serves the static Storybook build and
// scans every reference story at desktop, tablet and phone widths in both themes. Any finding fails the gate unless a
// Director decision waives it in design-review/exceptions.json. Set SKIP_STORYBOOK_BUILD=1 to reuse an existing build.
import { createServer } from 'node:http';
import { createHash } from 'node:crypto';
import { chmodSync, createReadStream, existsSync, mkdirSync, readFileSync, renameSync, statSync, writeFileSync } from 'node:fs';
import { extname, join, normalize } from 'node:path';
import { spawn, spawnSync } from 'node:child_process';
import { chromium } from '@playwright/test';
import { ENGINE, ENGINE_ENV, VIEWPORTS, repository, reviewDir, referenceStories, storyUrl, summarize, unwaived, validateExceptions } from './design-review-lib.mjs';

const packageRoot = join(repository, 'packages/design-system'), out = join(repository, '.local/design-system-storybook');
const engineDir = join(repository, '.local/tools/impeccable', `engine-v${ENGINE.version}`), engine = join(engineDir, ENGINE.asset);

async function fetchEngine() {
  const sha = file => createHash('sha256').update(readFileSync(file)).digest('hex');
  if (existsSync(engine) && sha(engine) === ENGINE.sha256) return;
  const response = await fetch(ENGINE.url, { redirect: 'follow' });
  if (!response.ok) throw new Error(`Impeccable engine download failed: ${response.status} ${response.statusText}`);
  const bytes = Buffer.from(await response.arrayBuffer()), digest = createHash('sha256').update(bytes).digest('hex');
  if (digest !== ENGINE.sha256) throw new Error(`Impeccable engine checksum ${digest} is not the pinned ${ENGINE.sha256}`);
  mkdirSync(engineDir, { recursive: true });
  writeFileSync(engine + '.part', bytes); chmodSync(engine + '.part', 0o755); renameSync(engine + '.part', engine);
}

const exceptions = JSON.parse(readFileSync(join(reviewDir, 'exceptions.json'), 'utf8'));
const invalid = validateExceptions(exceptions);
if (invalid.length) { console.error(invalid.join('\n')); process.exit(1); }
await fetchEngine();
if (process.env.SKIP_STORYBOOK_BUILD !== '1') {
  const build = spawnSync('pnpm', ['exec', 'storybook', 'build', '--output-dir', out, '--quiet'], { cwd: packageRoot, stdio: 'inherit' });
  if (build.status !== 0) process.exit(build.status ?? 1);
}
const types = { '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.ico': 'image/x-icon' };
const server = createServer((request, response) => {
  const path = decodeURIComponent(new URL(request.url ?? '/', 'http://127.0.0.1').pathname), file = normalize(join(out, path === '/' ? 'index.html' : path));
  if (!file.startsWith(out) || !existsSync(file) || !statSync(file).isFile()) { response.writeHead(404); response.end(); return; }
  response.writeHead(200, { 'content-type': types[extname(file)] ?? 'application/octet-stream', 'cache-control': 'no-store' });
  createReadStream(file).pipe(response);
});
await new Promise(r => server.listen(6008, '127.0.0.1', r));
const stories = referenceStories(JSON.parse(readFileSync(join(out, 'index.json'), 'utf8')));
// CI=1 makes the engine launch Chromium without its sandbox, as Playwright does in this container; it loads only the local build.
const env = { ...process.env, ...ENGINE_ENV, CI: '1', CHROME_PATH: chromium.executablePath() };
// Asynchronous: this process also serves the pages the engine's browser loads.
const detect = args => new Promise(done => {
  const child = spawn(engine, args, { env }), stdout = [], stderr = [];
  child.stdout.on('data', c => stdout.push(c)); child.stderr.on('data', c => stderr.push(c));
  child.on('close', status => done({ status, stdout: Buffer.concat(stdout).toString('utf8'), stderr: Buffer.concat(stderr).toString('utf8') }));
});
const results = [];
let failed = false;
try {
  // One engine per viewport, in parallel; each scans every story in a single browser session.
  results.push(...await Promise.all(VIEWPORTS.map(async viewport => {
    const urls = stories.map(s => storyUrl('http://127.0.0.1:6008', s, viewport.theme));
    // The engine exits 0 when clean and 2 with findings; anything else means a story could not be scanned.
    const scan = await detect(['detect', '--json', '--no-config', '--viewport', `${viewport.width}x${viewport.height}`, ...urls]);
    if (scan.status !== 0 && scan.status !== 2) { console.error(scan.stderr); throw new Error(`Impeccable could not scan every story at ${viewport.width}x${viewport.height} ${viewport.theme} (exit ${String(scan.status)})`); }
    return { viewport, findings: unwaived(JSON.parse(scan.stdout || '[]'), exceptions) };
  })));
} catch (error) { console.error(error.message); failed = true; }
server.close();
mkdirSync(join(repository, '.local/design-review'), { recursive: true });
writeFileSync(join(repository, '.local/design-review/detector.json'), JSON.stringify({ engine: ENGINE.version, stories: stories.length, results }, null, 2) + '\n');
const total = results.reduce((n, r) => n + r.findings.length, 0);
if (failed) process.exitCode = 1;
else if (total) { console.error(`DECLINED design review: ${total} Impeccable findings across ${stories.length} reference stories x ${VIEWPORTS.length} viewports\n${summarize(results).join('\n')}`); process.exitCode = 1; }
else console.log(`PASS design review detector: ${stories.length} reference stories x ${VIEWPORTS.length} viewports, Impeccable engine ${ENGINE.version}, ${exceptions.length} Director-approved exceptions`);
