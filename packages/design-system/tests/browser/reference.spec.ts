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

test.describe('collection binder', () => {
  const binder = (page: Page) => page.getByRole('region', { name: 'Hyperia City binder' });
  const indicator = (page: Page) => binder(page).locator('p[aria-live]');
  test('paging works by buttons and by Page Up and Page Down scoped to the binder', async ({ page }) => {
    await open(page, 'reference-screens-collection-binder--partially-owned');
    await expect(indicator(page)).toHaveText('Pages 1–2 of 29');
    await binder(page).getByRole('button', { name: 'Next page' }).click();
    await expect(indicator(page)).toHaveText('Pages 3–4 of 29');
    await page.getByRole('searchbox', { name: 'Search this set' }).focus();
    await page.keyboard.press('PageDown');
    await expect(indicator(page)).toHaveText('Pages 3–4 of 29');
    await binder(page).getByRole('button', { name: /^Inspect / }).first().focus();
    await page.keyboard.press('PageDown');
    await expect(indicator(page)).toHaveText('Pages 5–6 of 29');
    await page.keyboard.press('PageUp');
    await expect(indicator(page)).toHaveText('Pages 3–4 of 29');
  });
  test('only the visible faces are in the focus order, read across the spread, and padding takes no focus', async ({ page }) => {
    await open(page, 'reference-screens-collection-binder--partially-owned');
    const names = await binder(page).getByRole('button', { name: /^Inspect / }).evaluateAll(els => els.map(e => e.getAttribute('aria-label') ?? ''));
    expect(names).toHaveLength(18);
    expect(names.slice(0, 9).every(n => /Hyperia City ([1-9])\/204/.test(n))).toBe(true);
    expect(names[9]).toMatch(/Hyperia City 10\/204/);
    expect(names.find(n => n.includes('10/204'))).toMatch(/Not owned$/);
    await page.goto('/iframe.html?id=reference-screens-collection-binder--partially-owned&viewMode=story&globals=theme:paper');
    await binder(page).getByRole('button', { name: 'Next page' }).click(); await binder(page).getByRole('button', { name: 'Next page' }).click();
    await expect(indicator(page)).toHaveText('Pages 5–6 of 29');
    await expect(binder(page).locator('[data-kind="padding"]')).toHaveCount(0);
    await binder(page).getByRole('button', { name: 'Next page' }).click();
    await expect(binder(page).locator('[data-kind="padding"]')).toHaveCount(2);
    await expect(binder(page).locator('[data-kind="padding"] button, [data-kind="padding"][tabindex]')).toHaveCount(0);
  });
  test('Go to card number anchors the printing and keeps it through a resize; an unknown number is explained', async ({ page }) => {
    await open(page, 'reference-screens-collection-binder--partially-owned');
    await binder(page).getByRole('textbox', { name: 'Go to card number' }).fill('999');
    await binder(page).getByRole('button', { name: 'Go', exact: true }).click();
    await expect(binder(page)).toContainText('No card number 999 in this set.');
    await binder(page).getByRole('textbox', { name: 'Go to card number' }).fill('142');
    await binder(page).getByRole('button', { name: 'Go', exact: true }).click();
    await expect(indicator(page)).toHaveText('Pages 17–18 of 29');
    await expect(binder(page).getByRole('button', { name: /Lafayette – All Ears/ })).toBeVisible();
    await page.setViewportSize({ width: 820, height: 1180 });
    await expect(indicator(page)).toHaveText('Page 17 of 29');
    await expect(binder(page).getByRole('button', { name: /Lafayette – All Ears/ })).toBeVisible();
  });
  test('filters keep the completion figures and carry over between Binder, Grid and List', async ({ page }) => {
    await open(page, 'reference-screens-collection-binder--partially-owned');
    await page.getByRole('button', { name: /Ownership$/ }).click(); await page.getByRole('option', { name: 'Owned' }).click();
    await expect(page.getByText('24 of 204 owned')).toBeVisible();
    await expect(page.getByText('26 results')).toBeVisible();
    await page.getByRole('radiogroup', { name: 'Collection view' }).getByRole('radio', { name: 'Grid' }).click();
    await expect(page.getByRole('list', { name: 'Hyperia City printings' }).getByRole('listitem')).toHaveCount(26);
    await page.getByRole('radiogroup', { name: 'Collection view' }).getByRole('radio', { name: 'List' }).click();
    await expect(page.getByRole('grid', { name: 'Hyperia City printings' }).getByRole('row')).toHaveCount(27);
    await expect(page.getByRole('button', { name: /Ownership$/ })).toContainText('Owned');
  });
  test('unavailable ownership is labelled everywhere and never shown as zero', async ({ page }) => {
    await open(page, 'reference-screens-collection-binder--ownership-unavailable');
    await expect(page.getByText('Hyperia City completion is unavailable while ownership cannot be loaded.')).toBeVisible();
    await expect(binder(page).getByRole('button', { name: /Ownership unavailable$/ })).toHaveCount(18);
    await expect(binder(page)).not.toContainText(/\b0 (normal|Normal)/);
  });
  test('reduced motion turns pages without travel', async ({ page }) => {
    await open(page, 'reference-screens-collection-binder--reduced-motion', 'theme:paper;motion:reduced');
    expect(await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--is-motion-distance-scale').trim())).toBe('0');
  });
  test('selecting a pocket opens inspection beside a single face; closing returns focus to the pocket', async ({ page }) => {
    await open(page, 'reference-screens-collection-binder--partially-owned');
    const pocket = binder(page).getByRole('button', { name: /Max Goof – Music Lover/ });
    await pocket.click();
    await expect(page.getByRole('complementary', { name: 'Max Goof – Music Lover' })).toBeVisible();
    await expect(indicator(page)).toHaveText('Page 1 of 29');
    await page.keyboard.press('Escape');
    await expect(binder(page).getByRole('button', { name: /Max Goof – Music Lover/ })).toBeFocused();
  });
});

test.describe('pack opening', () => {
  const live = (page: Page) => page.locator('[aria-live="polite"]').first();
  test('choose, review, pending without a percentage, then twelve face-down cards', async ({ page }) => {
    await open(page, 'reference-screens-pack-opening--product-choice-and-review');
    await page.getByRole('button', { name: 'Open booster' }).click();
    const review = page.getByRole('alertdialog', { name: 'Open 1 Hyperia City booster?' });
    await expect(review).toContainText('The contents are decided when you open it and saved to your collection.');
    await review.getByRole('button', { name: 'Open booster' }).click();
    const progress = page.getByRole('progressbar', { name: 'Opening your booster' });
    await expect(progress).toBeVisible();
    await expect(progress).not.toHaveAttribute('aria-valuenow');
    await expect(page.getByRole('img', { name: /face down$/ })).toHaveCount(12);
  });
  test('Reveal next works from the keyboard, keeps focus and announces the card; Reveal all never waits', async ({ page }) => {
    await open(page, 'reference-screens-pack-opening--mid-reveal');
    const next = page.getByRole('button', { name: 'Reveal next' });
    await next.focus(); await page.keyboard.press('Enter');
    await expect(next).toBeFocused();
    await expect(live(page)).toHaveText('Card 6 of 12: Daisy Duck – Savvy Investor, Common, New.');
    await page.keyboard.press('Space');
    await expect(page.getByText('7 of 12 revealed')).toBeVisible();
    await page.getByRole('button', { name: 'Reveal all' }).click();
    await expect(page.getByText('12 of 12 revealed')).toBeVisible();
  });
  test('Skip to summary always reaches the summary with every card, its labels and Collection links', async ({ page }) => {
    await open(page, 'reference-screens-pack-opening--mid-reveal');
    await page.getByRole('button', { name: 'Skip to summary' }).click();
    const summary = page.getByRole('region', { name: 'Opening summary' });
    await expect(summary.getByRole('listitem')).toHaveCount(12);
    await expect(summary).toContainText('6 new cards in this opening of 12');
    await expect(summary.getByRole('link', { name: 'View in Collection: Powerline – Megastar' })).toHaveAttribute('href', /args=page:2/);
  });
  test('resume shows the same contents in the same order', async ({ page }) => {
    await open(page, 'reference-screens-pack-opening--interrupted-and-resumed');
    const revealed = await page.getByRole('list', { name: 'Cards in this opening' }).getByRole('group').evaluateAll(els => els.map(e => e.getAttribute('aria-label')));
    expect(revealed).toEqual(['Card 1 of 12: Abuelita – Loving Grandmother, Common', 'Card 2 of 12: Priya Mangal – Immovable Fan, Common', 'Card 3 of 12: Mr. Manchas – Service with a Smile, Common, New', 'Card 4 of 12: Cinderella – Homespun Dressmaker, Common', 'Card 5 of 12: Abigail & Amelia – Gossiping Geese, Common, New']);
    await page.getByRole('button', { name: 'Continue from card 6' }).click();
    await page.getByRole('button', { name: 'Reveal next' }).click();
    await expect(page.getByRole('group', { name: /^Card 6 of 12: Daisy Duck/ })).toBeVisible();
  });
  test('the rarest beat is light behind the last card only; reduced motion reveals directly', async ({ page }) => {
    await open(page, 'reference-screens-pack-opening--rarest-beat');
    const beat = page.locator('[data-beat]');
    await expect(beat).toHaveCount(1);
    await expect(beat).toHaveAttribute('aria-label', 'Card 12 of 12: Powerline – Megastar, Legendary');
    expect(await beat.evaluate(el => getComputedStyle(el, '::before').zIndex)).toBe('-1');
    await open(page, 'reference-screens-pack-opening--reduced-motion', 'theme:paper;motion:reduced');
    expect(await page.locator('[data-revealed] > div').first().evaluate(el => getComputedStyle(el).animationDuration)).toBe('0s');
  });
  test('a presentation failure keeps the contents as text; pending settlement withholds Collection links and says why', async ({ page }) => {
    await open(page, 'reference-screens-pack-opening--presentation-failure');
    await expect(page.getByText('The reveal could not be shown.')).toBeVisible();
    await expect(page.getByRole('main').locator('ol li')).toHaveCount(12);
    await open(page, 'reference-screens-pack-opening--settlement-pending');
    await expect(page.getByText('Updating your collection')).toBeVisible();
    await expect(page.getByRole('link', { name: /View in Collection/ })).toHaveCount(0);
  });
  test('tablet portrait shows three rows of four with the controls in reach', async ({ page }) => {
    await page.setViewportSize({ width: 820, height: 1180 });
    await open(page, 'reference-screens-pack-opening--mid-reveal');
    const columns = await page.getByRole('list', { name: 'Cards in this opening' }).evaluate(el => getComputedStyle(el).gridTemplateColumns.split(' ').length);
    expect(columns).toBe(4);
    await expect(page.getByRole('button', { name: 'Reveal next' })).toBeInViewport();
  });
});

test.describe('crowded match', () => {
  const board = (page: Page) => page.getByRole('region', { name: 'Battlefield' });
  const panel = (page: Page) => page.getByRole('region', { name: 'Current decision' });
  test('the semantic board names every object with its public state', async ({ page }) => {
    await open(page, 'reference-screens-crowded-match--idle');
    const names = await board(page).getByRole('button').evaluateAll(els => els.map(e => e.getAttribute('aria-label') ?? ''));
    expect(names).toHaveLength(16);
    expect(names.find(n => n.startsWith('Kit Cloudkicker – Sure Shot'))).toContain('Shift stack of 2, on Kit Cloudkicker – Unpredictable Courier');
    expect(names.find(n => n.startsWith('Chief Bogo'))).toMatch(/Exerted\. At Port Authority/);
    expect(names.find(n => n.startsWith('Clawhauser'))).toContain('2 damage');
    expect(names.find(n => n.startsWith('Mr. Big'))).toContain('Drying: played this turn');
    expect(names.find(n => n.startsWith('Baymax'))).toContain('Evasive (gained)');
    expect(names.find(n => n.startsWith('Port Authority'))).toContain('+2 willpower');
    for (const region of ['Your side', 'Imani Okafor\'s side']) await expect(board(page).getByRole('region', { name: region })).toBeVisible();
  });
  test('quest, pending, accepted, then the required choose-one; announcements stay to choices and results', async ({ page }) => {
    await open(page, 'reference-screens-crowded-match--idle');
    await board(page).getByRole('button', { name: /^Kit Cloudkicker – Sure Shot/ }).click();
    await expect(page.locator('[aria-live="polite"]')).toHaveText('');
    await panel(page).getByRole('button', { name: /^Quest/ }).press('Enter');
    await expect(panel(page)).toContainText('Waiting for the server');
    await expect(page.getByRole('button', { name: 'End turn' })).toBeDisabled();
    await expect(panel(page)).toContainText('Aerial Acrobatics: choose one');
    await expect(page.locator('[aria-live="polite"]')).toHaveText('Aerial Acrobatics: choose one.');
    await panel(page).getByRole('button', { name: /Get 1 ink drop/ }).click();
    await expect(panel(page)).toContainText('Your main phase');
    await expect(page.getByRole('region', { name: 'Rowan Ashby', exact: true })).toContainText('14/ 20');
  });
  test('challenge targets carry reasons; valid ones are ringed and labelled on the board', async ({ page }) => {
    await open(page, 'reference-screens-crowded-match--choosing-targets');
    await expect(panel(page).getByRole('button', { name: /Baymax – Qualified Physician/ })).toBeDisabled();
    await expect(panel(page)).toContainText('Evasive: only characters with Evasive can challenge Baymax.');
    await expect(panel(page)).toContainText('Ready characters can\'t be challenged.');
    await expect(panel(page).getByRole('button', { name: /Wasabi – Future Thinker/ })).toBeEnabled();
    await expect(board(page).locator('[data-highlight="target"]')).toHaveCount(3);
    await page.keyboard.press('Escape');
    await expect(panel(page)).toContainText('Choose what it does.');
    await page.keyboard.press('Escape');
    await expect(panel(page)).toContainText('Your main phase');
  });
  test('song payment lists ink, an ink drop and each singer, with reasons for those who can\'t sing', async ({ page }) => {
    await open(page, 'reference-screens-crowded-match--song-payment');
    await expect(panel(page).getByRole('button', { name: /^Pay 5 ink/ })).toBeEnabled();
    await expect(panel(page).getByRole('button', { name: /^Sing with Kit Cloudkicker/ })).toBeEnabled();
    await expect(panel(page)).toContainText('Exerted: it can\'t exert to sing.');
    await expect(panel(page)).toContainText('Cost 3: this song needs cost 5 or Singer 5.');
  });
  test('bulk quest and end turn are separate reviews with concrete actions', async ({ page }) => {
    await open(page, 'reference-screens-crowded-match--bulk-quest-review');
    const quest = page.getByRole('alertdialog', { name: 'Quest with all characters?' });
    await expect(quest.getByRole('listitem')).toHaveCount(3);
    await expect(quest.getByRole('button')).toHaveText(['Keep choosing', 'Quest with all characters']);
    await open(page, 'reference-screens-crowded-match--end-turn-review');
    await expect(page.getByRole('alertdialog', { name: 'End your turn?' }).getByRole('button')).toHaveText(['Keep playing', 'End turn']);
  });
  test('hand fan hit areas are at least 44 px, never overlap, follow arrow keys and stay still on hover', async ({ page }) => {
    await open(page, 'reference-screens-crowded-match--large-hand');
    const cards = page.getByRole('list', { name: /Your hand/ }).getByRole('button');
    await expect(cards).toHaveCount(12);
    const boxes = await cards.evaluateAll(els => els.map(e => { const r = e.getBoundingClientRect(); return { left: r.left, right: r.right, width: r.width }; }));
    for (const [i, b] of boxes.entries()) { expect(b.width).toBeGreaterThanOrEqual(44); if (i > 0) expect(b.left).toBeGreaterThanOrEqual(boxes[i - 1]!.right - 0.5); }
    await cards.first().focus(); await page.keyboard.press('ArrowRight');
    await expect(cards.nth(1)).toBeFocused();
    const before = await cards.nth(3).boundingBox(); await cards.nth(3).hover(); await page.waitForTimeout(200);
    expect(await cards.nth(3).boundingBox()).toEqual(before);
  });
  test('pending blocks duplicates and says why; reconnecting reconciles without sending twice; rejected explains', async ({ page }) => {
    await open(page, 'reference-screens-crowded-match--pending');
    await expect(page.getByRole('button', { name: 'Quest with all characters' })).toBeDisabled();
    await expect(page.getByText('Waiting for the server to confirm your last command.').first()).toBeVisible();
    await open(page, 'reference-screens-crowded-match--reconnecting');
    await expect(page.getByRole('status').filter({ hasText: 'Resynchronizing' })).toBeVisible();
    await expect(panel(page)).toContainText('it will not be sent twice');
    await open(page, 'reference-screens-crowded-match--rejected');
    await expect(panel(page)).toContainText('Nothing was spent.');
  });
  test('tablet landscape moves the log to a sheet; portrait stacks and inspects in a sheet', async ({ page }) => {
    await page.setViewportSize({ width: 1180, height: 820 });
    await open(page, 'reference-screens-crowded-match--idle');
    await expect(page.getByRole('tab', { name: 'Log' })).toHaveCount(0);
    await page.getByRole('button', { name: 'Log', exact: true }).click();
    await expect(page.getByRole('dialog', { name: 'Match log' })).toBeVisible();
    await page.keyboard.press('Escape');
    await page.setViewportSize({ width: 820, height: 1180 });
    await open(page, 'reference-screens-crowded-match--opponents-turn');
    await board(page).getByRole('button', { name: /^Baymax/ }).click();
    await expect(page.getByRole('dialog', { name: 'Baymax – Qualified Physician' })).toBeVisible();
  });
});
