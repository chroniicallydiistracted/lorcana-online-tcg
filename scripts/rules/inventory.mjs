import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync, readlinkSync } from 'node:fs';
import ts from 'typescript';
import { parse } from 'parse5';

export const digest = bytes => createHash('sha256').update(bytes).digest('hex');
export function readPinnedBlob(path, mode) {
  assert(['100644','100755','120000'].includes(mode), 'Unsupported Git blob mode');
  return mode === '120000' ? Buffer.from(readlinkSync(path)) : readFileSync(path);
}
export function galleryInventory(html) {
  const rows = [];
  function htmlNode(node) {
    if (node.nodeName === 'script') {
      const text = (node.childNodes ?? []).map(child => child.value ?? '').join('');
      const source = ts.createSourceFile('gallery.js', text, ts.ScriptTarget.Latest, true, ts.ScriptKind.JS);
      function visit(node) {
        if (ts.isObjectLiteralExpression(node)) {
          const properties = new Map(node.properties.filter(ts.isPropertyAssignment).map(p => [p.name.getText(source).replace(/^['"]|['"]$/g, ''), p.initializer]));
          if (properties.has('culture_invariant_id')) {
            const value = name => { const v = properties.get(name); return v && (ts.isStringLiteralLike(v) || ts.isNumericLiteral(v)) ? v.text : null; };
            rows.push({ culture_invariant_id: Number(value('culture_invariant_id')), deck_building_id: value('deck_building_id'),
              name: value('name'), version: value('version') ?? value('subtitle'), card_identifier: value('card_identifier'), card_type: value('card_type') });
          }
        }
        ts.forEachChild(node, visit);
      }
      visit(source);
    }
    for (const child of node.childNodes ?? []) htmlNode(child);
  }
  htmlNode(parse(html));
  assert.equal(new Set(rows.map(r => r.culture_invariant_id)).size, rows.length, 'duplicate official gallery printing IDs');
  return rows;
}
export function assertDocument(bytes, contentType) {
  assert(contentType?.includes('application/pdf') && bytes.subarray(0, 5).toString() === '%PDF-', 'Source is not a PDF');
}
export function assertHash(bytes, expected) { assert.equal(digest(bytes), expected, 'Source hash mismatch'); }
export function assertCompleteTree(tree) {
  assert.equal(tree.truncated, false, 'Git tree is truncated or completeness unknown');
  assert(Array.isArray(tree.tree) && tree.tree.length > 0, 'Git tree is empty');
  assert.equal(new Set(tree.tree.map(row => row.path)).size, tree.tree.length, 'Git tree contains duplicate paths');
}
export function isEffective(date, asOf) {
  return typeof date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(date) && date <= asOf;
}
export function catalogInventory(cards, sets, asOf) {
  const seen = new Set(), identities = new Map();
  const printings = cards.map(card => {
    assert(!seen.has(card.id), 'duplicate catalog printing ID'); seen.add(card.id);
    assert(typeof card.fullName === 'string' && card.fullName.trim(), 'Missing full English name');
    const fullName = card.fullName.normalize('NFC').replace(/\s+/g, ' ').trim();
    const identity = 'english-name:' + fullName;
    if (!identities.has(identity)) identities.set(identity, { id: identity, full_name: fullName, printing_ids: [] });
    identities.get(identity).printing_ids.push(card.id);
    const setCode = String(card.setCode), release = sets[setCode]?.releaseDate ?? null;
    return { source_id: card.id, identity, set_code: setCode, number: card.number ?? null,
      release_date: release, release_status: release === null ? 'unknown' : !isEffective(release, asOf) ? 'revealed_unreleased' : card.promoGrouping ? 'printing_release_unverified' : 'released',
      special_product: !/^\d+$/.test(setCode), enchanted: card.rarity === 'Enchanted',
      project_certification: 'not_certified' };
  });
  return { as_of: asOf, identity_method: 'provisional exact normalized full English name; not an admitted gameplay identity',
    printings, identities: [...identities.values()].sort((a, b) => a.id.localeCompare(b.id)) };
}

// Counts declarations, never expanded runtime cases or passing tests.
export function testDeclarations(file, text) {
  const source = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true), rows = [];
  function callee(node, modifiers = []) {
    if (ts.isIdentifier(node)) return { name: node.text, modifiers };
    if (ts.isPropertyAccessExpression(node)) return callee(node.expression, [node.name.text, ...modifiers]);
    if (ts.isCallExpression(node)) return callee(node.expression, modifiers);
    return null;
  }
  function walk(node, context = { skipped: false, focused: false, conditional: false, parameterized: false }) {
    if (ts.isCallExpression(node)) {
      const info = callee(node.expression), names = ['test', 'it', 'describe', 'xtest', 'xit', 'xdescribe', 'fit', 'fdescribe'];
      // Inner each/runIf factories are not registrations.
      const factory = ts.isPropertyAccessExpression(node.expression) && ['each','skipIf','runIf'].includes(node.expression.name.text);
      const hasTitle = !factory && node.arguments[0] && (ts.isStringLiteralLike(node.arguments[0]) || ts.isTemplateExpression(node.arguments[0]) || node.arguments[1] && (ts.isArrowFunction(node.arguments[1]) || ts.isFunctionExpression(node.arguments[1])));
      if (info && names.includes(info.name) && hasTitle) {
        const modifiers = info.modifiers;
        const next = { skipped: context.skipped || modifiers.includes('skip') || info.name.startsWith('x'),
          focused: context.focused || modifiers.includes('only') || info.name.startsWith('f'),
          conditional: context.conditional || modifiers.some(x => ['skipIf', 'runIf'].includes(x)), parameterized: context.parameterized || modifiers.includes('each') };
        const kind = info.name.includes('describe') ? 'suite' : 'test';
        rows.push({ file, line: source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1,
          title: ts.isStringLiteralLike(node.arguments[0]) ? node.arguments[0].text : node.arguments[0].getText(source), kind, ...next,
          todo: modifiers.includes('todo'), dynamic_title: !ts.isStringLiteralLike(node.arguments[0]) });
        if (kind === 'suite') { for (const arg of node.arguments.slice(1)) walk(arg, next); return; }
      }
    }
    ts.forEachChild(node, child => walk(child, context));
  }
  walk(source); return rows;
}
export function ruleSections(text) {
  const rows = new Map(); let current = null;
  for (const line of text.split(/\r?\n/)) {
    if (current !== null && /^\s*(?:Glossary|Update Summary|Previous Update Summaries)\s*$/i.test(line)) break;
    const match = /^\s*(\d+(?:\.\d+){2,})\.?\s+(.*)$/.exec(line);
    if (match) { current = match[1]; if (!rows.has(current)) rows.set(current, []); rows.get(current).push(match[2]); }
    else if (current && line.trim() && !/©|disneylorcana\.com|^\s*\d+\s*$/.test(line)) rows.get(current).push(line.trim());
  }
  return [...rows].map(([id, lines]) => ({ id, sha256: digest(lines.join(' ').replace(/\s+/g, ' ').trim()) }));
}
export function diffRuleSections(before, after) {
  const a = new Map(ruleSections(before).map(row => [row.id, row])), b = new Map(ruleSections(after).map(row => [row.id, row]));
  return { before_count: a.size, after_count: b.size,
    added: [...b.values()].filter(row => !a.has(row.id)), removed: [...a.values()].filter(row => !b.has(row.id)),
    changed: [...b.values()].filter(row => a.has(row.id) && a.get(row.id).sha256 !== row.sha256).map(row => ({ id: row.id, before_sha256: a.get(row.id).sha256, after_sha256: row.sha256 })) };
}
