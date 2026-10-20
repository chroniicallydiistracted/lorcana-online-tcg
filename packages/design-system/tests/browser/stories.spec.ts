import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';
import { AxeBuilder } from '@axe-core/playwright';
interface Entry { id: string; title: string; name: string; type: string }
// The story index comes from the served build (scripts/browser-tests.mjs), not from the source tree.
const response = await fetch('http://127.0.0.1:6007/index.json');
if (!response.ok) throw new Error('Storybook build is not being served');
const stories = Object.values(((await response.json()) as { entries: Record<string, Entry> }).entries).filter(entry => entry.type === 'story');
const url = (id: string, globals = 'theme:paper') => `/iframe.html?id=${id}&viewMode=story&globals=${globals}`;

async function open(page: Page, id: string, globals?: string) {
  await page.goto(url(id, globals));
  await page.locator('#storybook-root > *').first().waitFor();
  await page.evaluate(() => document.fonts.ready);
}

test('the static Storybook build contains every story', () => { expect(stories.length).toBeGreaterThanOrEqual(40); });

for (const theme of ['paper', 'ink'] as const) {
  for (const story of stories) {
    test(`axe WCAG 2.2 A/AA: ${story.title} / ${story.name} (${theme})`, async ({ page }) => {
      await open(page, story.id, `theme:${theme}`);
      const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).exclude('#storybook-docs').analyze();
      expect(result.violations.map(v => `${v.id}: ${v.nodes.map(n => n.target.join(' ')).join(', ')}`)).toEqual([]);
    });
  }
}

for (const story of stories.filter(s => !/Documentation/.test(s.name))) {
  test(`primary targets are at least 44 x 44 px: ${story.title} / ${story.name}`, async ({ page }) => {
    await open(page, story.id);
    const small = await page.evaluate(() => {
      const targets = document.querySelectorAll<HTMLElement>('button, [role="tab"], [role="menuitem"], [role="option"], [role="row"][data-rac], label:has(input[type="checkbox"]), label:has(input[type="radio"])');
      return [...targets].filter(el => { const r = el.getBoundingClientRect(); for (let node: HTMLElement | null = el; node; node = node.parentElement) { const style = getComputedStyle(node); if (style.clipPath !== 'none' || style.clip !== 'auto') return false; } return r.width > 0 && r.height > 0 && (r.width < 43.5 || r.height < 43.5) && !el.closest('[role="table"] [role="row"]') && !el.closest('#storybook-docs'); })
        .map(el => `${el.tagName.toLowerCase()}${el.getAttribute('aria-label') ? '[' + el.getAttribute('aria-label') + ']' : ''} ${Math.round(el.getBoundingClientRect().width)}x${Math.round(el.getBoundingClientRect().height)}`);
    });
    expect(small).toEqual([]);
  });
}
