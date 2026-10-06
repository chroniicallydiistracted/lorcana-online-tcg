import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// Build-time tooling only: never part of the browser module graph.
// @ts-expect-error Root boundary tool is intentionally JavaScript.
import { browserBoundaryPlugin } from '../../scripts/browser-boundary-plugin.mjs';
export default defineConfig({
  publicDir: false,
  plugins: [browserBoundaryPlugin(), react()],
  resolve: { conditions: ['lorcana-source', 'module', 'browser', 'development|production'] },
  server: {
    host: '0.0.0.0', port: 5173, strictPort: true,
    fs: { strict: true, allow: ['.', '../../packages/contracts', '../../packages/design-system', '../../packages/presentation', '../../node_modules'].map(path => fileURLToPath(new URL(path, import.meta.url))) },
    proxy: {
      '/api': { target: 'http://127.0.0.1:3001', rewrite: path => path.replace(/^\/api/, '') },
      '/match': { target: 'http://127.0.0.1:3002', rewrite: path => path.replace(/^\/match/, '') },
    },
  },
});
