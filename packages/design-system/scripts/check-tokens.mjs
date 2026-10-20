// Token gate (standard §10): validation, contrast pairs and changed generated output.
// Rebuilds into a temporary directory and compares byte-for-byte with the committed src/generated files.
import { mkdtempSync, readFileSync, readdirSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { validateTokens } from './token-lib.mjs';
import { buildTokens } from './build-tokens.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
export async function checkTokens() {
  const { errors, contrastResults } = validateTokens(root);
  if (errors.length) throw new Error('Token validation failed:\n' + errors.join('\n'));
  const temp = mkdtempSync(join(tmpdir(), 'inkspire-tokens-'));
  try {
    const names = await buildTokens(temp), committed = join(root, 'src/generated');
    const extra = readdirSync(committed).filter(name => !names.includes(name));
    if (extra.length) throw new Error('Unexpected generated files: ' + extra.join(', '));
    for (const name of names) if (readFileSync(join(temp, name), 'utf8') !== readFileSync(join(committed, name), 'utf8')) throw new Error(`Generated output changed: src/generated/${name}. Run pnpm --filter @lorcana/design-system tokens:build and review the diff.`);
  } finally { rmSync(temp, { recursive: true, force: true }); }
  return { pairs: contrastResults.length, minimumMargin: Math.min(...contrastResults.map(r => r.ratio - r.minimum)) };
}
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  checkTokens().then(r => console.log(`PASS tokens: valid DTCG subset, ${r.pairs} contrast pairs (smallest margin ${r.minimumMargin.toFixed(2)}), generated output unchanged`)).catch(error => { console.error(error.message); process.exitCode = 1; });
}
