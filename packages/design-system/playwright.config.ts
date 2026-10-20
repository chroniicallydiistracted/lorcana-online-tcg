import { defineConfig } from '@playwright/test';

// Runs against the static Storybook build served by scripts/browser-tests.mjs. Chromium automation evidence only:
// no Firefox, WebKit, real Safari, iPad or device qualification is implied (standard §34).
export default defineConfig({
  testDir: './tests/browser', testMatch: '*.spec.ts', workers: 1, timeout: 60_000,
  reporter: [['list']],
  use: { baseURL: 'http://127.0.0.1:6007', headless: true, viewport: { width: 1280, height: 800 }, launchOptions: { args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'] } },
});
