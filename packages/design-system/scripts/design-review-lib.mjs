// Design review gate (Director decision D30): the shared rules behind the Impeccable detector gate and the
// independent-review record gate. A screen is declined unless both pass at the current design source.
import { createHash } from 'node:crypto';
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const packageRoot = fileURLToPath(new URL('../', import.meta.url));
export const repository = resolve(packageRoot, '../..');
export const reviewDir = join(packageRoot, 'design-review');

// Impeccable (github.com/pbakaus/impeccable, Apache-2.0) engine, pinned by version and published SHA-256.
export const ENGINE = {
  version: '0.1.16', asset: 'impeccable-linux-x64',
  sha256: 'a890a5b4b7d9d79ec54aa74612b5e924e5f5b422600a25fde8bcbda11b031787',
  url: 'https://github.com/pbakaus/impeccable/releases/download/engine-v0.1.16/impeccable-linux-x64',
};
// The engine sends nothing during a scan; these keep its other verbs quiet too.
export const ENGINE_ENV = { IMPECCABLE_NO_TELEMETRY: '1', IMPECCABLE_NO_UPDATE_CHECK: '1', DO_NOT_TRACK: '1' };
// Desktop, tablet and phone widths in both themes (standard §34 captures; phone is a staged target, §2).
export const VIEWPORTS = [
  { width: 1440, height: 900, theme: 'ink' }, { width: 1440, height: 900, theme: 'paper' },
  { width: 820, height: 1180, theme: 'ink' }, { width: 390, height: 844, theme: 'paper' },
];
export const REFERENCE_TITLE = 'Reference screens/';

// Every source that decides how a reference screen looks or behaves. Review records live outside it.
export const DESIGN_SOURCES = ['packages/design-system/src', 'packages/design-system/stories', 'packages/design-system/tokens',
  'packages/design-system/.storybook', 'packages/presentation/src'];
function walk(folder) {
  if (!existsSync(folder)) return [];
  return readdirSync(folder).flatMap(name => {
    const path = join(folder, name);
    if (statSync(path).isDirectory()) return name === 'generated' || name === 'node_modules' ? [] : walk(path);
    return [path];
  }).sort();
}
/** SHA-256 over every design source file's path and bytes, in a stable order. */
export function designFingerprint(root = repository) {
  const hash = createHash('sha256');
  for (const source of DESIGN_SOURCES) for (const file of walk(join(root, source))) {
    hash.update(relative(root, file).replaceAll('\\', '/')); hash.update('\0'); hash.update(readFileSync(file)); hash.update('\0');
  }
  return hash.digest('hex');
}

/** Reference stories from a Storybook index, with the globals each needs (theme added per viewport). */
export function referenceStories(index) {
  // Each screen's text-only documentation page is a component contract, not a screen, so it is left out.
  return Object.values(index.entries).filter(e => e.type === 'story' && e.title.startsWith(REFERENCE_TITLE) && !e.id.endsWith('--documentation'))
    .map(e => ({ id: e.id, screen: e.title.slice(REFERENCE_TITLE.length), globals: [
      ...(/long-/.test(e.id) ? ['locale:en-XA'] : []), ...(/reduced-motion/.test(e.id) ? ['motion:reduced'] : []), ...(/artwork-slots/.test(e.id) ? ['artworkSlots:shown'] : [])] }));
}
export const storyUrl = (base, story, theme) => `${base}/iframe.html?viewMode=story&id=${story.id}&globals=${['theme:' + theme, ...story.globals].join(';')}`;

/** Exceptions waive a detector rule only by a recorded Director decision; the agent cannot approve its own. */
export function validateExceptions(list) {
  const problems = [];
  if (!Array.isArray(list)) return ['exceptions must be an array'];
  list.forEach((e, i) => {
    if (typeof e.rule !== 'string' || !e.rule) problems.push(`exception ${i}: rule is required`);
    if (typeof e.story !== 'string' || !e.story) problems.push(`exception ${i}: story pattern is required`);
    if (typeof e.reason !== 'string' || e.reason.length < 20) problems.push(`exception ${i}: a reason of at least 20 characters is required`);
    if (typeof e.decision !== 'string' || !/^D\d+$/.test(e.decision)) problems.push(`exception ${i}: a Director decision (D-number) is required`);
  });
  return problems;
}
const storyOf = finding => new URL(finding.file).searchParams.get('id') ?? '';
export function unwaived(findings, exceptions) {
  return findings.filter(f => !exceptions.some(e => e.rule === f.antipattern && new RegExp(e.story).test(storyOf(f)) && (!e.selector || e.selector === f.selector)));
}
/** One line per rule and story, counted across viewports. */
export function summarize(results) {
  const rows = new Map();
  for (const { viewport, findings } of results) for (const f of findings) {
    const key = `${f.antipattern}  ${storyOf(f)}`, row = rows.get(key) ?? { count: 0, viewports: new Set(), example: f.snippet };
    row.count++; row.viewports.add(`${viewport.width}x${viewport.height}-${viewport.theme}`); rows.set(key, row);
  }
  return [...rows].sort(([a], [b]) => a.localeCompare(b)).map(([key, r]) => `${key}  x${r.count} [${[...r.viewports].join(', ')}]  ${r.example}`);
}

// Independent review records: one per reference screen, written from two isolated reviewers' verdicts.
export const ASSESSMENTS = ['design', 'evidence'];
/** Problems that decline a screen: a missing, stale, incomplete or failing review record. */
export function checkReviewRecord(record, screen, fingerprint) {
  if (!record) return [`${screen}: no independent review record`];
  const problems = [];
  if (record.screen !== screen) problems.push(`${screen}: the record names ${String(record.screen)}`);
  if (record.fingerprint !== fingerprint) problems.push(`${screen}: reviewed design source ${String(record.fingerprint).slice(0, 12)} is not the current ${fingerprint.slice(0, 12)}`);
  for (const kind of ASSESSMENTS) {
    const review = record.reviews?.find(r => r.assessment === kind);
    if (!review) { problems.push(`${screen}: no ${kind} assessment`); continue; }
    if (typeof review.reviewer !== 'string' || !review.reviewer) problems.push(`${screen}: the ${kind} assessment names no reviewer`);
    if (typeof review.report !== 'string' || review.report.length < 200) problems.push(`${screen}: the ${kind} assessment has no full report`);
    if (review.verdict !== 'pass') problems.push(`${screen}: the ${kind} assessment declined it`);
  }
  const reviewers = new Set((record.reviews ?? []).map(r => r.reviewer));
  if (reviewers.size < ASSESSMENTS.length) problems.push(`${screen}: the assessments must come from separate reviewers`);
  if (record.verdict !== 'pass') problems.push(`${screen}: the record's verdict is ${String(record.verdict)}`);
  return problems;
}
export function referenceScreens(root = repository) {
  return readdirSync(join(root, 'packages/design-system/stories/reference')).filter(f => f.endsWith('.stories.tsx'))
    .map(f => readFileSync(join(root, 'packages/design-system/stories/reference', f), 'utf8').match(/title:\s*'Reference screens\/([^']+)'/)?.[1]).filter(Boolean).sort();
}
export const recordPath = screen => join(reviewDir, 'reviews', screen.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '.json');
