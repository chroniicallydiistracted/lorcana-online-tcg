import { test, expect } from '@playwright/test';

test('real client reaches both services, mounts WebGL, resizes and releases repeated scenes', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Application foundation' })).toBeVisible();
  await expect(page.getByText('API ready', { exact: true })).toBeVisible();
  await expect(page.getByText('Match service ready', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Start rendering check' }).click();
  await expect(page.getByText('Rendering active', { exact: true })).toBeVisible();
  const canvas = page.getByLabel('Three synthetic cards on a neutral tabletop');
  await expect(canvas).toBeVisible();
  expect(await canvas.evaluate(element => {
    const canvas = element as HTMLCanvasElement;
    const gl = canvas.getContext('webgl2') ?? canvas.getContext('webgl');
    return gl?.getParameter(gl.VERSION) as string | undefined;
  })).toMatch(/WebGL/);
  const oldWidth = await canvas.evaluate(element => (element as HTMLCanvasElement).width);
  await page.setViewportSize({ width: 720, height: 800 });
  await expect.poll(() => canvas.evaluate(element => (element as HTMLCanvasElement).width)).not.toBe(oldWidth);
  for (let i = 0; i < 3; i++) {
    await page.getByRole('button', { name: 'Stop rendering check' }).click();
    await expect(canvas).toHaveCount(0);
    await page.getByRole('button', { name: 'Start rendering check' }).click();
    await expect(page.getByText('Rendering active', { exact: true })).toBeVisible();
    await expect(canvas).toHaveCount(1);
  }
  await expect(page.locator('body')).not.toHaveJSProperty('scrollWidth', 0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  expect(errors).toEqual([]);
});

test('unavailable service and renderer disposal remain usable from keyboard', async ({ page }) => {
  await page.route('**/api/readyz', route => route.fulfill({ status: 503, contentType: 'application/json', body: '{"service":"api","status":"not_ready","scope":"foundation"}' }));
  await page.goto('/');
  await expect(page.getByText('API unavailable', { exact: true })).toBeVisible();
  const start = page.getByRole('button', { name: 'Start rendering check' });
  await start.focus();
  await page.keyboard.press('Enter');
  await expect(page.getByText('Rendering active', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Stop rendering check' }).focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('canvas')).toHaveCount(0);
});

test('development file serving rejects server-owned files outside the browser roots', async ({ request }) => {
  const { resolve } = await import('node:path');
  const privateFile = resolve(process.cwd(), '../../packages/db/README.md');
  const response = await request.get('/@fs' + privateFile);
  expect(response.status()).toBe(403);
});

test('unavailable WebGL leaves a semantic stop control usable', async ({ page }) => {
  await page.addInitScript(() => {
    const getContext = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (this: HTMLCanvasElement, ...args: Parameters<typeof getContext>) {
      if (String(args[0]).includes('webgl') || args[0] === 'experimental-webgl') return null;
      return getContext.apply(this, args);
    } as typeof getContext;
  });
  await page.goto('/');
  await page.getByRole('button', { name: 'Start rendering check' }).click();
  await expect(page.getByRole('status')).toContainText('Rendering unavailable');
  await page.getByRole('button', { name: 'Stop rendering check' }).click();
  await expect(page.locator('canvas')).toHaveCount(0);
});
