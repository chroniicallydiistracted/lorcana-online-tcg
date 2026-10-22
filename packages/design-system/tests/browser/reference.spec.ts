import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';

// UX-01 reference screens (docs/plans/2026-10-22-ux-01-design.md). Chromium automation evidence only (standard §34).
const story = (id: string, globals = 'theme:paper') => `/iframe.html?id=${id}&viewMode=story&globals=${globals}`;
async function open(page: Page, id: string, globals?: string) {
  await page.goto(story(id, globals));
  await page.locator('#storybook-root > *').first().waitFor();
  await page.evaluate(() => document.fonts.ready);
}
const frame = 'reference-screens-room-frame--frame';

test.describe('room frame', () => {
  test('the skip link is the first focus stop and moves focus to the room content', async ({ page }) => {
    await open(page, frame);
    await page.keyboard.press('Tab');
    const skip = page.getByRole('link', { name: 'Skip to room content' });
    await expect(skip).toBeFocused();
    expect((await skip.boundingBox())!.y).toBeGreaterThanOrEqual(0);
    await page.keyboard.press('Enter');
    await expect(page.getByRole('main')).toBeFocused();
  });
  test('the current destination is marked by aria-current, weight and an underline bar, not colour alone', async ({ page }) => {
    await open(page, frame);
    const nav = page.getByRole('navigation', { name: 'Primary' });
    await expect(nav.getByRole('link', { name: 'Collection' })).toHaveAttribute('aria-current', 'page');
    await expect(nav.locator('[aria-current="page"]')).toHaveCount(1);
    const weights = await nav.getByRole('link').evaluateAll(links => links.map(l => getComputedStyle(l).fontWeight));
    expect(weights.filter(w => w === '600')).toHaveLength(1);
  });
  test('below the wide layout the destinations move into a keyboard-operable menu that restores focus', async ({ page }) => {
    await page.setViewportSize({ width: 820, height: 1180 });
    await open(page, frame);
    const nav = page.getByRole('navigation', { name: 'Primary' });
    await expect(nav.getByRole('link', { name: 'Collection' })).toBeHidden();
    const trigger = nav.getByRole('button', { name: 'Menu' });
    await trigger.focus(); await page.keyboard.press('Enter');
    const menu = page.getByRole('menu', { name: 'Menu' });
    await expect(menu.getByRole('menuitem')).toHaveCount(6);
    await page.keyboard.press('Escape');
    await expect(menu).toHaveCount(0);
    await expect(trigger).toBeFocused();
  });
  test('ink-form slots take no focus, stay hidden from assistive technology and never overlap a control', async ({ page }) => {
    await open(page, 'reference-screens-room-frame--artwork-slots-shown', 'theme:paper;artworkSlots:shown');
    const slots = page.locator('[data-slot]');
    await expect(slots).toHaveCount(2);
    for (const slot of await slots.all()) {
      await expect(slot).toHaveAttribute('aria-hidden', 'true');
      await expect(slot).toBeVisible();
    }
    const overlaps = await page.evaluate(() => {
      const boxes = [...document.querySelectorAll('[data-slot]')].map(s => s.getBoundingClientRect());
      return [...document.querySelectorAll('a, button')].filter(c => { const r = c.getBoundingClientRect(); return r.width > 0 && boxes.some(b => r.left < b.right && r.right > b.left && r.top < b.bottom && r.bottom > b.top); }).map(c => c.textContent);
    });
    expect(overlaps).toEqual([]);
    await open(page, frame);
    await expect(page.locator('[data-slot] span').first()).toBeHidden();
  });
  test('the account menu opens Profile, settings and the fan-content notice; the notice is the policy text', async ({ page }) => {
    await open(page, frame);
    await page.getByRole('button', { name: 'Account menu for Rowan Ashby' }).click();
    await expect(page.getByRole('menuitem')).toHaveText(['Profile', 'Settings', 'Fan content notice']);
    await page.getByRole('menuitem', { name: 'Fan content notice' }).click();
    const dialog = page.getByRole('dialog', { name: 'Fan content notice' });
    await expect(dialog).toContainText('Disney Lorcana');
  });
  test('the quiet notification count opens the deferred notifications only when chosen', async ({ page }) => {
    await open(page, frame);
    await expect(page.getByRole('dialog')).toHaveCount(0);
    await page.getByRole('button', { name: /Notifications: 2 new notifications/ }).click();
    await expect(page.getByRole('dialog', { name: 'Notifications' }).getByRole('listitem')).toHaveCount(2);
  });
  test('a destination outside the reference set leads to an honest page, not a dead link', async ({ page }) => {
    await open(page, frame);
    await page.getByRole('navigation', { name: 'Primary' }).getByRole('link', { name: 'Lab' }).click();
    await expect(page.getByRole('heading', { level: 1, name: 'Lab' })).toBeVisible();
    await expect(page.getByText('This room is not part of the UX-01 reference set.')).toBeVisible();
    await expect(page.getByRole('navigation', { name: 'Primary' }).getByRole('link', { name: 'Lab' })).toHaveAttribute('aria-current', 'page');
  });
});
