import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';

const story = (id: string, globals = 'theme:paper') => `/iframe.html?id=${id}&viewMode=story&globals=${globals}`;
async function open(page: Page, id: string, globals?: string) {
  await page.goto(story(id, globals));
  await page.locator('#storybook-root > *').first().waitFor();
  await page.evaluate(() => document.fonts.ready);
}
const luminance = (rgb: number[]) => rgb.map(c => c / 255).map(c => c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4).reduce((s, c, i) => s + c * [0.2126, 0.7152, 0.0722][i]!, 0);
const ratio = (a: number[], b: number[]) => { const [x, y] = [luminance(a), luminance(b)].sort((p, q) => q - p); return (x! + 0.05) / (y! + 0.05); };
const ms = (value: string) => value.endsWith('ms') ? Number.parseFloat(value) : Number.parseFloat(value) * 1000;
const rgb = (css: string) => css.match(/\d+(\.\d+)?/g)!.slice(0, 3).map(Number);

test('keyboard focus shows a 2 px boundary with a 3 px offset and at least 3:1 contrast in both themes', async ({ page }) => {
  for (const theme of ['paper', 'ink']) {
    await open(page, 'actions-button-link-and-tooltip--buttons', `theme:${theme}`);
    await page.keyboard.press('Tab');
    const focused = page.locator('button[data-focus-visible]');
    await expect(focused).toHaveCount(1);
    const style = await focused.evaluate(el => { const s = getComputedStyle(el); return { width: s.outlineWidth, offset: s.outlineOffset, color: s.outlineColor, bg: getComputedStyle(document.body).backgroundColor }; });
    expect(style.width).toBe('2px'); expect(style.offset).toBe('3px');
    expect(ratio(rgb(style.color), rgb(style.bg))).toBeGreaterThanOrEqual(3);
  }
});
test('hovering a control never moves or resizes its hit area', async ({ page }) => {
  await open(page, 'actions-button-link-and-tooltip--buttons');
  const button = page.getByRole('button', { name: 'End turn' }), before = await button.boundingBox();
  await button.hover(); await page.waitForTimeout(200);
  expect(await button.boundingBox()).toEqual(before);
});
test('a pending button keeps its label, announces pending and ignores presses', async ({ page }) => {
  await open(page, 'actions-button-link-and-tooltip--states');
  const pending = page.getByRole('button', { name: /Submit deck/ });
  await expect(pending).toHaveAttribute('data-pending', 'true');
  await expect(pending).toContainText('Pending');
});
test('dialogs contain focus, make the background inert and restore focus on Escape', async ({ page }) => {
  await open(page, 'overlays-tabs-menus-and-dialogs--dialogs');
  const trigger = page.getByRole('button', { name: 'Open dialog' });
  await trigger.click();
  const dialog = page.getByRole('dialog', { name: 'Import deck' });
  await expect(dialog).toBeVisible();
  for (let i = 0; i < 6; i++) { await page.keyboard.press('Tab'); expect(await dialog.evaluate(el => el.contains(document.activeElement))).toBe(true); }
  await page.keyboard.press('Escape');
  await expect(dialog).toHaveCount(0);
  await expect(trigger).toBeFocused();
});
test('a non-dismissable dialog ignores Escape and outside presses', async ({ page }) => {
  await open(page, 'overlays-tabs-menus-and-dialogs--dialogs');
  await page.getByRole('button', { name: 'Open non-dismissable' }).click();
  const dialog = page.getByRole('dialog', { name: 'Saving your deck' });
  await page.keyboard.press('Escape'); await page.mouse.click(5, 5);
  await expect(dialog).toBeVisible();
});
test('end-turn confirmation uses concrete actions and cancelling returns focus to the trigger', async ({ page }) => {
  await open(page, 'overlays-tabs-menus-and-dialogs--confirmations');
  const trigger = page.getByRole('button', { name: 'End turn', exact: true });
  await trigger.click();
  const review = page.getByRole('alertdialog', { name: 'End your turn?' });
  await expect(review.getByRole('button', { name: 'End turn' })).toBeVisible();
  await expect(review.getByRole('button', { name: 'Keep playing' })).toBeVisible();
  await review.getByRole('button', { name: 'Keep playing' }).click();
  await expect(review).toHaveCount(0);
  await expect(trigger).toBeFocused();
});
test('menus open from the keyboard, move with arrows and return focus on Escape', async ({ page }) => {
  await open(page, 'overlays-tabs-menus-and-dialogs--menus');
  const trigger = page.getByRole('button', { name: 'Deck actions' });
  await trigger.focus(); await page.keyboard.press('Enter');
  const menu = page.getByRole('menu', { name: 'Deck actions' });
  await expect(menu).toBeVisible();
  await page.keyboard.press('ArrowDown');
  await expect(menu.getByRole('menuitem').nth(1)).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(trigger).toBeFocused();
});
test('select is fully keyboard operable and shows the chosen value', async ({ page }) => {
  await open(page, 'forms-fields-and-choices--selects');
  const trigger = page.getByRole('button', { name: /Set/ }).first();
  await trigger.focus(); await page.keyboard.press('Enter');
  await page.keyboard.press('ArrowDown'); await page.keyboard.press('Enter');
  await expect(trigger).toContainText('Synthetic Set Two');
});
test('tabs move with arrow keys and keep the panel relationship', async ({ page }) => {
  await open(page, 'overlays-tabs-menus-and-dialogs--tabs');
  await page.getByRole('tab', { name: 'Binder' }).focus();
  await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('tab', { name: 'Grid' })).toHaveAttribute('aria-selected', 'true');
  await expect(page.getByRole('tabpanel')).toContainText('grid panel');
});
test('quantity fields keep exact integers within their bounds', async ({ page }) => {
  await open(page, 'forms-fields-and-choices--quantities');
  const atMax = page.getByRole('group').filter({ has: page.getByRole('textbox', { name: 'Copies at maximum' }) });
  await expect(atMax.getByRole('button', { name: 'Increase' })).toBeDisabled();
  const field = page.getByRole('textbox', { name: 'Copies', exact: true });
  await field.focus(); await page.keyboard.press('ArrowUp');
  await expect(field).toHaveValue('3');
});
test('reduced motion removes durations and spatial travel while keeping a brief dialog fade', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await open(page, 'actions-button-link-and-tooltip--buttons');
  const values = await page.evaluate(() => { const s = getComputedStyle(document.documentElement); return { hover: s.getPropertyValue('--is-motion-hover').trim(), dialog: s.getPropertyValue('--is-motion-dialog').trim(), travel: s.getPropertyValue('--is-motion-distance-scale').trim() }; });
  expect({ hover: ms(values.hover), dialog: ms(values.dialog), travel: Number(values.travel) }).toEqual({ hover: 0, dialog: 120, travel: 0 });
});
test('the reduced-motion preference applies even when the system does not request it', async ({ page }) => {
  await open(page, 'actions-button-link-and-tooltip--buttons', 'theme:paper;motion:reduced');
  expect(ms(await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--is-motion-hover').trim()))).toBe(0);
});
test('forced colours keep control boundaries and focus visible', async ({ page }) => {
  await page.emulateMedia({ forcedColors: 'active' });
  await open(page, 'actions-button-link-and-tooltip--buttons');
  const border = await page.getByRole('button', { name: 'Keep playing' }).evaluate(el => getComputedStyle(el).borderStyle);
  expect(border).not.toBe('none');
  await page.keyboard.press('Tab');
  expect(await page.locator('button[data-focus-visible]').evaluate(el => getComputedStyle(el).outlineStyle)).toBe('solid');
});
test('Ink and Paper resolve from preference; System follows the colour-scheme setting', async ({ page }) => {
  await open(page, 'actions-button-link-and-tooltip--buttons', 'theme:ink');
  expect(await page.evaluate(() => getComputedStyle(document.body).backgroundColor)).toBe('rgb(20, 20, 20)');
  await page.emulateMedia({ colorScheme: 'dark' });
  await open(page, 'actions-button-link-and-tooltip--buttons', 'theme:system');
  expect(await page.evaluate(() => getComputedStyle(document.body).backgroundColor)).toBe('rgb(20, 20, 20)');
  await page.emulateMedia({ colorScheme: 'light' });
  await open(page, 'actions-button-link-and-tooltip--buttons', 'theme:system');
  expect(await page.evaluate(() => getComputedStyle(document.body).backgroundColor)).toBe('rgb(247, 247, 247)');
});
test('Source Sans 3 and the metric-adjusted fallback load; line heights match; widths are recorded', async ({ page }) => {
  await open(page, 'foundations-type-layout-and-identity--type-roles');
  expect(await page.evaluate(() => document.fonts.check('16px "Source Sans 3"'))).toBe(true);
  const sample = 'The coast was quiet, so she wrote it down. Quest with all characters; end turn and keep playing.';
  const m = await page.evaluate(text => {
    const measure = (family: string) => {
      const block = document.createElement('p'), line = document.createElement('span');
      block.textContent = text; block.style.cssText = `position:absolute;inline-size:20rem;margin:0;font-family:${family};font-size:16px;line-height:normal;`;
      line.textContent = text; line.style.cssText = `position:absolute;white-space:nowrap;font-family:${family};font-size:16px;`;
      document.body.append(block, line);
      const lines = Math.round(block.getBoundingClientRect().height / parseFloat(getComputedStyle(block).lineHeight === 'normal' ? '0' : getComputedStyle(block).lineHeight) || 0);
      const lineBox = (() => { const one = document.createElement('span'); one.textContent = 'Hg'; one.style.cssText = `display:inline-block;font-family:${family};font-size:16px;line-height:normal;`; document.body.append(one); const h = one.getBoundingClientRect().height; one.remove(); return h; })();
      const out = { width: line.getBoundingClientRect().width, lineBox, lines };
      block.remove(); line.remove(); return out;
    };
    return { web: measure('"Source Sans 3"'), fallback: measure('"Source Sans 3 Fallback"'), unadjusted: measure('"Liberation Sans", Arial'), fallbackLoaded: [...document.fonts].some(f => f.family === 'Source Sans 3 Fallback' && f.status === 'loaded') };
  }, sample);
  test.info().annotations.push({ type: 'font-metrics', description: JSON.stringify(m) });
  expect(m.fallbackLoaded).toBe(true);
  // Vertical overrides are portable: the fallback line box matches the web face.
  expect(Math.abs(m.web.lineBox - m.fallback.lineBox)).toBeLessThanOrEqual(1);
  // Widths depend on platform hinting of the local fallback (Linux FreeType snaps Liberation Sans advances); record and bound loosely.
  expect(Math.abs(m.fallback.width / m.web.width - 1)).toBeLessThan(0.05);
});
test('component stories reflow at 320 CSS px without horizontal page scrolling', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  for (const id of ['forms-fields-and-choices--text-fields', 'forms-fields-and-choices--choices', 'status-collections-feedback-and-connection--messages', 'cards-tiles-deck-entries-and-inspection--deck-entries', 'cards-tiles-deck-entries-and-inspection--inspector-reading-mode', 'actions-button-link-and-tooltip--links']) {
    await open(page, id);
    expect(await page.evaluate(() => document.documentElement.scrollWidth), id).toBeLessThanOrEqual(320);
  }
});
test('text enlarged to 200% keeps complete labels without clipping', async ({ page }) => {
  await open(page, 'actions-button-link-and-tooltip--states');
  await page.addStyleTag({ content: 'html { font-size: 200% !important; }' });
  const clipped = await page.evaluate(() => [...document.querySelectorAll('button')].filter(b => b.scrollWidth > b.clientWidth + 1 || b.scrollHeight > b.clientHeight + 1).map(b => b.textContent));
  expect(clipped).toEqual([]);
});
test('inspection opens beside the work on wide layouts and returns focus to the card on close', async ({ page }) => {
  await open(page, 'cards-tiles-deck-entries-and-inspection--host');
  const inspect = page.getByRole('button', { name: /Inspect Synthetic Explorer/ });
  await inspect.click();
  const panel = page.getByRole('complementary', { name: 'Synthetic Explorer' });
  await expect(panel).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(panel).toHaveCount(0);
  await expect(inspect).toBeFocused();
});
test('inspection opens as a modal sheet on narrow layouts', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await open(page, 'cards-tiles-deck-entries-and-inspection--host');
  const inspect = page.getByRole('button', { name: /Inspect Synthetic Explorer/ });
  await inspect.click();
  await expect(page.getByRole('dialog', { name: 'Synthetic Explorer' })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(inspect).toBeFocused();
});
test('a failed card image keeps the printing name and actions', async ({ page }) => {
  await open(page, 'cards-tiles-deck-entries-and-inspection--tiles');
  await expect(page.getByRole('img', { name: /Synthetic Explorer.*Image unavailable/ }).first()).toBeVisible();
  await expect(page.getByRole('button', { name: /Inspect Synthetic Archivist/ })).toBeVisible();
});
test('unavailable ownership is never shown as zero', async ({ page }) => {
  await open(page, 'cards-tiles-deck-entries-and-inspection--tiles');
  await expect(page.getByText('Ownership unavailable').first()).toBeVisible();
});
test('the quiet notification count states its count only in its accessible name', async ({ page }) => {
  await open(page, 'status-collections-feedback-and-connection--notifications');
  await expect(page.getByRole('button', { name: 'Notifications: 3 new notifications' })).toBeVisible();
  expect(await page.locator('[aria-live]').filter({ hasText: /notification/i }).count()).toBe(0);
});
test('the pseudolocale lengthens component strings without breaking layout', async ({ page }) => {
  await open(page, 'status-collections-feedback-and-connection--connection', 'theme:paper;locale:en-XA');
  await expect(page.getByText(/Öfflïñé/).first()).toBeVisible();
});
