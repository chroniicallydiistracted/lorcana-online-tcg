import { build } from 'vite';
import { fileURLToPath } from 'node:url';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
const folder = fileURLToPath(new URL('.', import.meta.url));
await build({ configFile: false, root: folder, build: { outDir: 'dist', emptyOutDir: false, minify: true, lib: { entry: join(folder, 'src/worker.ts'), formats: ['es'], fileName: () => 'lab-worker.js' } } });
const bytes = readFileSync(join(folder, 'dist/lab-worker.js'), 'utf8');
if (/\b(?:Bun|process|POSTGRES_PASSWORD)\b|node:|bun:|\.env\.local/.test(bytes)) throw new Error('Private/server/test dependency in Lab worker');
console.log('PASS synthetic trust-free worker without server/private/Bun runtime');
