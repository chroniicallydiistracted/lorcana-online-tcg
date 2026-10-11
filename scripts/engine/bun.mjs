import { readFileSync, existsSync, lstatSync, mkdirSync, writeFileSync, chmodSync } from 'node:fs';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { sha256 } from './closure.mjs';

const root = fileURLToPath(new URL('../../', import.meta.url));
export function runnerSpec() {
  const spec = JSON.parse(readFileSync(join(root, 'toolchain.json'))).bunTestRunner;
  const asset = spec?.assets?.[process.arch];
  if (process.platform !== 'linux' || !asset) throw new Error('Upstream runner requires a supported Linux Dev Container');
  return { ...asset, version: spec.version, path: '/tmp/lorcana-bun-' + spec.version + '-' + asset.binarySha256 + '/bun' };
}
export function findBun() {
  const spec = runnerSpec();
  for (const path of ['/usr/local/bin/bun', spec.path]) {
    if (!existsSync(path)) continue;
    const stat = lstatSync(path);
    if (stat.isSymbolicLink() || !stat.isFile() || sha256(readFileSync(path)) !== spec.binarySha256) throw new Error('Unqualified Bun executable: ' + path);
    const version = spawnSync(path, ['--version'], { encoding: 'utf8' });
    if (version.status !== 0 || version.stdout.trim() !== spec.version) throw new Error('Wrong Bun test-runner version');
    return path;
  }
  throw new Error('Pinned Bun test runner missing; run pnpm engine:setup or rebuild the committed Dev Container');
}
export async function installBun() {
  try { return findBun(); } catch (error) { if (!error.message.startsWith('Pinned Bun test runner missing')) throw error; }
  const spec = runnerSpec();
  const response = await fetch('https://github.com/oven-sh/bun/releases/download/bun-v' + spec.version + '/' + spec.archive, { signal: AbortSignal.timeout(120_000) });
  if (!response.ok) throw new Error('Bun archive retrieval failed: ' + response.status);
  const bytes = Buffer.from(await response.arrayBuffer());
  if (bytes.length > 60_000_000 || sha256(bytes) !== spec.archiveSha256) throw new Error('Bun archive hash/size mismatch');
  const result = spawnSync('python3', ['-c', 'import sys,zipfile,io;z=zipfile.ZipFile(io.BytesIO(sys.stdin.buffer.read()));sys.stdout.buffer.write(z.read(sys.argv[1]))', spec.archive.replace('.zip', '') + '/bun'], { input: bytes, maxBuffer: 200_000_000 });
  if (result.status !== 0 || sha256(result.stdout) !== spec.binarySha256) throw new Error('Bun executable extraction/hash failed');
  const folder = spec.path.slice(0, -4);
  mkdirSync(folder, { mode: 0o700 });
  writeFileSync(spec.path, result.stdout, { flag: 'wx', mode: 0o700 });
  chmodSync(spec.path, 0o700);
  return findBun();
}
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  try { console.log('PASS pinned development-only Bun ' + await installBun()); } catch (error) { console.error(error.message); process.exitCode = 1; }
}
