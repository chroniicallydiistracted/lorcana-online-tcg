import { fileURLToPath } from 'node:url';
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

test('protocol compatibility reaches the actual local negotiation diagnostic', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('Protocol compatible', { exact: true })).toBeVisible();
});

test('protocol compatibility shows update and rejects malformed or uncorrelated server responses', async ({ page }) => {
  await page.route('**/match/protocol/negotiate', async route => {
    const request = route.request().postDataJSON() as { requestId: string };
    await route.fulfill({ status: 409, contentType: 'application/json', body: JSON.stringify({ type: 'hello_result', outcome: 'unsupported_version', requestId: request.requestId, serverReleaseId: 'next-release', supportedProtocol: { min: 2, max: 2 }, action: 'upgrade_required' }) });
  });
  await page.goto('/');
  await expect(page.getByText('Protocol update required', { exact: true })).toBeVisible();
  await page.unroute('**/match/protocol/negotiate');
  await page.route('**/match/protocol/negotiate', route => route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ type: 'hello_result', outcome: 'accepted', requestId: 'unrelated', serverReleaseId: 'local-foundation', protocolVersion: 1 }) }));
  await page.reload();
  await expect(page.getByText('Protocol unavailable', { exact: true })).toBeVisible();
});

test('browser executes the closed viewer codec and refuses private fields without evaluating accessors',async({page})=>{
 await page.goto('/');
 const url='/@fs'+fileURLToPath(new URL('../../../packages/contracts/src/viewer.ts',import.meta.url));
 const result=await page.evaluate(async moduleUrl=>{
  const contracts=await import(moduleUrl);
  const view={schemaVersion:2,endReason:null,scope:'synthetic',matchId:'browser-view',stateVersion:4,viewer:{kind:'public'},ended:false,winner:null,turn:1,turnOwnerId:null,priorityId:null,players:['p1','p2'].map(playerId=>({playerId,lore:0,inkDrops:0,zones:['hand','deck','play','discard','inkwell'].map(kind=>({kind,count:0,cards:[]}))})),resources:[],commands:[],logs:[],animations:[]};
  let called=0,rejected=0;
  for(const bad of [{...view,seed:'synthetic-private'},{...view,get hidden(){called++;return 'private';}}])try{contracts.encodeViewerProjection(bad);}catch{rejected++;}
  const surfaces=['snapshot','resources','logs','animations','export'].map(surface=>contracts.decodeViewerSurface(contracts.encodeViewerSurface(view,surface)).surface);
  return {rejected,called,surfaces,matchId:contracts.decodeViewerProjection(contracts.encodeViewerProjection(view)).matchId};
 },url);
 expect(result).toEqual({rejected:2,called:0,surfaces:['snapshot','resources','logs','animations','export'],matchId:'browser-view'});
});
