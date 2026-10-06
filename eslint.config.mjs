import js from '@eslint/js';
import ts from 'typescript-eslint';
export default [
  { ignores: ['**/node_modules/**', '**/dist/**', '**/test-results/**', '**/playwright-report/**', '.local/**'] },
  js.configs.recommended,
  ...ts.configs.recommended,
  { files: ['**/*.{mjs,ts,tsx}'], languageOptions: { globals: { console: 'readonly', process: 'readonly', Buffer: 'readonly', URL: 'readonly', fetch: 'readonly', setTimeout: 'readonly', clearTimeout: 'readonly', setInterval: 'readonly', clearInterval: 'readonly', AbortController: 'readonly', performance: 'readonly' } } },
  { files: ['**/*.{ts,tsx}'], rules: { '@typescript-eslint/consistent-type-imports': 'error' } },
];
