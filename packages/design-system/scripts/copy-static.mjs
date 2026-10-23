// Copies stylesheets, font files, the card-back image, their licenses and manifests next to the compiled modules so dist/ keeps the same relative asset paths as src/.
import { cpSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url)), src = join(root, 'src'), dist = join(root, 'dist');
function walk(folder) {
  for (const name of readdirSync(folder)) {
    const path = join(folder, name);
    if (statSync(path).isDirectory()) walk(path);
    else if (/\.(?:css|woff2|jpg)$/.test(name) || name === 'manifest.json' || name === 'LICENSE.md') cpSync(path, join(dist, relative(src, path)));
  }
}
walk(src);
