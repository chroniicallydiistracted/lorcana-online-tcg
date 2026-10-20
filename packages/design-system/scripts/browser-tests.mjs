// Builds Storybook, serves the static output on 127.0.0.1:6007 and runs the Playwright design-system suite.
// Set SKIP_STORYBOOK_BUILD=1 to reuse an existing build in .local/design-system-storybook.
import { createServer } from 'node:http';
import { createReadStream, existsSync, statSync } from 'node:fs';
import { extname, join, normalize } from 'node:path';
import { spawnSync, spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

// Build output lives in the repository's ignored .local folder, outside the documented source inventory.
const root = fileURLToPath(new URL('../', import.meta.url)), out = join(root, '../../.local/design-system-storybook');
if (process.env.SKIP_STORYBOOK_BUILD !== '1') {
  const build = spawnSync('pnpm', ['exec', 'storybook', 'build', '--output-dir', out, '--quiet'], { cwd: root, stdio: 'inherit' });
  if (build.status !== 0) process.exit(build.status ?? 1);
}
const types = { '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.png': 'image/png', '.ico': 'image/x-icon' };
const server = createServer((request, response) => {
  const path = decodeURIComponent(new URL(request.url ?? '/', 'http://127.0.0.1').pathname), file = normalize(join(out, path === '/' ? 'index.html' : path));
  if (!file.startsWith(out) || !existsSync(file) || !statSync(file).isFile()) { response.writeHead(404); response.end(); return; }
  response.writeHead(200, { 'content-type': types[extname(file)] ?? 'application/octet-stream', 'cache-control': 'no-store' });
  createReadStream(file).pipe(response);
});
server.listen(6007, '127.0.0.1', () => {
  const run = spawn('pnpm', ['exec', 'playwright', 'test', ...process.argv.slice(2)], { cwd: root, stdio: 'inherit' });
  run.on('exit', code => server.close(() => process.exit(code ?? 1)));
});
