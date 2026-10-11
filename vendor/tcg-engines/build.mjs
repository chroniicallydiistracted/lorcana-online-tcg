import { build } from 'vite';
import { readFileSync, copyFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import { checkVendor } from '../../scripts/engine/vendor.mjs';

const folder = fileURLToPath(new URL('.', import.meta.url));
const selection = JSON.parse(readFileSync(new URL('../../scripts/engine/selection.json', import.meta.url)));
checkVendor();
await build({ configFile: false, root: folder, define: { 'process.env.NODE_ENV': '"development"', 'globalThis.process': 'undefined' }, resolve: { alias: Object.entries(selection.aliases).sort(([a], [b]) => b.length - a.length).map(([find, path]) => ({ find, replacement: join(folder, 'upstream', path) })) }, build: { outDir: 'dist', emptyOutDir: true, minify: true, lib: { entry: join(folder, 'src/kernel.ts'), formats: ['es'], fileName: () => 'kernel.js' } } });
copyFileSync(join(folder, 'src/kernel.d.ts'), join(folder, 'dist/kernel.d.ts'));
const bytes = readFileSync(join(folder, 'dist/kernel.js'), 'utf8');
if (/\b(?:import|require)\s*\(?\s*["'](?:bun:|node:|@tcg\/)|\bBun\b|\.env\.local|POSTGRES_PASSWORD/.test(bytes)) throw new Error('Private/server/Bun dependency in compiled kernel');
console.log('PASS precompiled synthetic kernel, no Bun runtime or private source dependency');
