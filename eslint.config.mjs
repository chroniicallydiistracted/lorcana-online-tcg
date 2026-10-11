import js from '@eslint/js';
import ts from 'typescript-eslint';
export default [
  { ignores: ['**/node_modules/**', '**/dist/**', '**/test-results/**', '**/playwright-report/**', '.local/**', 'vendor/tcg-engines/upstream/**', 'vendor/tcg-engines/provenance/**'] },
  js.configs.recommended,
  ...ts.configs.recommended,
  { files: ['**/*.{mjs,ts,tsx}'], languageOptions: { globals: { console: 'readonly', process: 'readonly', Buffer: 'readonly', URL: 'readonly', fetch: 'readonly', setTimeout: 'readonly', clearTimeout: 'readonly', setInterval: 'readonly', clearInterval: 'readonly', AbortController: 'readonly', performance: 'readonly' } } },
  { files: ['**/*.{ts,tsx}'], rules: { '@typescript-eslint/consistent-type-imports': 'error' } },
  { files: ['packages/engine-lab/src/worker.ts'], languageOptions: { globals: { addEventListener: 'readonly', postMessage: 'readonly' } } },
  { files: ['packages/engine-lab/tests/browser.mjs'], languageOptions: { globals: { Worker: 'readonly', navigator: 'readonly', Bun: 'readonly' } } },
  { files: ['scripts/engine/bun.mjs'], languageOptions: { globals: { AbortSignal: 'readonly' } } },
];
