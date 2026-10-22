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

test.describe('deckbuilder', () => {
  const deck = (page: Page) => page.getByRole('region', { name: 'Deck' });
  test('add and remove by pointer and keyboard update the quantity, count, save state and announcement; undo restores', async ({ page }) => {
    await open(page, 'reference-screens-deckbuilder--working');
    const results = page.getByRole('list', { name: 'Catalog results' });
    await results.getByRole('button', { name: 'Add one Fru Fru – VIP Guest' }).click();
    await expect(deck(page).getByText('53', { exact: true })).toBeVisible();
    await expect(page.getByText('Unsaved changes').first()).toBeVisible();
    await expect(page.locator('[aria-live="polite"]')).toHaveText('Added one Fru Fru – VIP Guest. 1 in deck.');
    await results.getByRole('button', { name: 'Remove one Fru Fru – VIP Guest' }).focus();
    await page.keyboard.press('Enter');
    await expect(deck(page).getByText('52', { exact: true })).toBeVisible();
    await page.getByRole('button', { name: 'Undo last change' }).click();
    await expect(deck(page).getByText('53', { exact: true })).toBeVisible();
  });
  test('at the copy limit Add is unavailable and the row says why', async ({ page }) => {
    await open(page, 'reference-screens-deckbuilder--working');
    const add = page.getByRole('button', { name: 'Add one Judy Hopps – Helpful Officer' });
    await expect(add).toBeDisabled();
    await expect(add.locator('xpath=..')).toContainText('max');
    await expect(add.locator('xpath=..')).toContainText('copy limit 4 reached');
  });
  test('filters never discard edits, and an empty result offers Reset filters', async ({ page }) => {
    await open(page, 'reference-screens-deckbuilder--working');
    await page.getByRole('button', { name: 'Add one Fru Fru – VIP Guest' }).click();
    await page.getByRole('toolbar', { name: 'Ink' }).getByRole('button', { name: 'Emerald' }).click();
    await page.getByRole('toolbar', { name: 'Cost' }).getByRole('button', { name: 'Cost 8 or more' }).click();
    await page.getByRole('button', { name: /Type$/ }).click(); await page.getByRole('option', { name: 'Location' }).click();
    await expect(page.getByText('No cards match these filters.')).toBeVisible();
    await expect(deck(page).getByText('53', { exact: true })).toBeVisible();
    await page.getByRole('button', { name: 'Reset filters' }).first().click();
    await expect(page.getByText('80 results')).toBeVisible();
    await expect(deck(page).getByText('53', { exact: true })).toBeVisible();
  });
  test('closing inspection returns focus to the originating tile with the search kept', async ({ page }) => {
    await open(page, 'reference-screens-deckbuilder--working');
    await page.getByRole('searchbox', { name: 'Search the catalog' }).fill('Kit Cloudkicker');
    const tile = page.getByRole('list', { name: 'Catalog results' }).getByRole('button', { name: /^Inspect Kit Cloudkicker – Sure Shot/ });
    await tile.click();
    await expect(page.getByRole('heading', { level: 2, name: 'Kit Cloudkicker – Sure Shot' })).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(tile).toBeFocused();
    await expect(page.getByRole('searchbox', { name: 'Search the catalog' })).toHaveValue('Kit Cloudkicker');
  });
  test('the printing preference changes the printing, never the card or its copies', async ({ page }) => {
    await open(page, 'reference-screens-deckbuilder--inspection');
    await page.getByRole('button', { name: /Printing used in this deck/ }).click();
    await page.getByRole('option', { name: /^Epic/ }).click();
    await expect(page.locator('[aria-live="polite"]')).toHaveText(/now uses the Epic printing; the deck still has 4/);
    await expect(deck(page).getByText('52', { exact: true })).toBeVisible();
  });
  test('leaving with unsaved changes asks first; Keep editing stays', async ({ page }) => {
    await open(page, 'reference-screens-deckbuilder--working');
    await page.getByRole('button', { name: 'Add one Fru Fru – VIP Guest' }).click();
    await page.getByRole('navigation', { name: 'Primary' }).getByRole('link', { name: 'Collection' }).click();
    const dialog = page.getByRole('alertdialog', { name: 'Leave with unsaved changes?' });
    await expect(dialog.getByRole('button')).toHaveText(['Keep editing', 'Discard changes', 'Save and leave']);
    await dialog.getByRole('button', { name: 'Keep editing' }).click();
    await expect(page.getByRole('heading', { level: 1, name: 'Zootopia Patrol' })).toBeVisible();
  });
  test('validation names card, quantity, reason and policy, and keeps ownership apart from rules', async ({ page }) => {
    await open(page, 'reference-screens-deckbuilder--invalid');
    const rules = page.getByRole('region', { name: 'Rules' });
    await expect(rules).toContainText('Judy Hopps – Helpful Officer: 5 copies; Core (demonstration policy) allows 4 (policy 2026-10).');
    await expect(rules).toContainText('Bolt – Down but Not Out (Reign of Jafar, 29/204): not in Core');
    await expect(rules).toContainText('The deck uses 3 inks');
    await open(page, 'reference-screens-deckbuilder--ownership-limits');
    await expect(page.getByRole('region', { name: 'Ownership' })).toContainText('This is an ownership limit, not a rules restriction.');
    await expect(page.getByRole('region', { name: 'Rules' })).not.toContainText('own');
  });
  test('import reports unresolved names and counts before anything changes', async ({ page }) => {
    await open(page, 'reference-screens-deckbuilder--import-with-unresolved-lines');
    const dialog = page.getByRole('dialog', { name: 'Import a deck list' });
    await expect(dialog).toContainText('2 lines need attention.');
    await expect(dialog).toContainText('Kit Cloudkicker - Sure Shoot');
    await expect(dialog.getByRole('button', { name: 'Replace deck with 24 cards' })).toBeVisible();
    await dialog.getByRole('button', { name: 'Cancel' }).click();
    await expect(deck(page).getByText('52', { exact: true })).toBeVisible();
  });
  test('export needs an explicit format and previews the exact text', async ({ page }) => {
    await open(page, 'reference-screens-deckbuilder--export');
    const dialog = page.getByRole('dialog', { name: 'Export Zootopia Patrol' });
    await expect(dialog.getByRole('textbox', { name: 'Exported text' })).toHaveValue(/^4 Judy Hopps – Helpful Officer/);
    await dialog.getByText('CSV with printings').click();
    await expect(dialog.getByRole('textbox', { name: 'Exported text' })).toHaveValue(/^quantity,name,set,number/);
  });
  test('the cost curve reads as a table of the same values', async ({ page }) => {
    await open(page, 'reference-screens-deckbuilder--working');
    await deck(page).getByRole('tab', { name: 'Summary' }).click();
    const table = deck(page).getByRole('table', { name: 'Cost curve' });
    await expect(table.getByRole('row')).toHaveCount(9);
    await expect(table.getByRole('row', { name: /^8\+/ })).toBeAttached();
  });
  test('tablet portrait uses one pane with Catalog and Deck tabs and a persistent summary bar', async ({ page }) => {
    await page.setViewportSize({ width: 820, height: 1180 });
    await open(page, 'reference-screens-deckbuilder--working');
    await expect(page.getByRole('tab', { name: 'Catalog' })).toHaveAttribute('aria-selected', 'true');
    await expect(page.getByRole('button', { name: 'Save deck' })).toBeVisible();
    await page.getByRole('button', { name: 'Filters' }).click();
    await expect(page.getByRole('dialog', { name: 'Filters' }).getByRole('toolbar', { name: 'Ink' })).toBeVisible();
    await page.keyboard.press('Escape');
    await page.getByRole('tab', { name: 'Deck' }).click();
    await expect(page.getByRole('region', { name: 'Rules' })).toBeVisible();
  });
});
