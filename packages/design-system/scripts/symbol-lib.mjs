// Lorcana symbols (decision D21; created by the Director or from Ravensburger's public digital assets) → typed inline-SVG data in src/generated/symbols.ts.
// The vendored SVG files stay byte-identical to their source (src/assets/symbols/manifest.json records checksums).
// The parser accepts only the simple vector subset these files use and refuses anything else, so no script,
// link, image, transform or unknown construct can reach the rendered markup.
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join } from 'node:path';

const SHAPES = { path: ['d', 'fill-rule', 'clip-rule'], polygon: ['points'], circle: ['cx', 'cy', 'r'] };
const COMMON = ['id', 'data-name', 'class', 'fill'];
const REACT_NAMES = { 'fill-rule': 'fillRule', 'clip-rule': 'clipRule' };
const HEX = /^#[0-9a-f]{3}([0-9a-f]{3})?$/i;

function attributes(source, file) {
  const out = {};
  for (const [, name, value] of source.matchAll(/([a-zA-Z:-]+)="([^"]*)"/g)) {
    if (name in out) throw new Error(`${file}: duplicate attribute ${name}`);
    out[name] = value;
  }
  if (source.replace(/([a-zA-Z:-]+)="([^"]*)"/g, '').trim()) throw new Error(`${file}: unparsed attribute text`);
  return out;
}
function classFills(css, file) {
  const fills = {};
  for (const [, selectors, body] of css.matchAll(/([^{}]+)\{([^}]*)\}/g)) {
    const declarations = body.split(';').map(d => d.trim()).filter(Boolean).map(d => d.split(':').map(p => p.trim()));
    for (const [property, value] of declarations) {
      if (property === 'stroke-width' && value === '0px') continue;
      if (property !== 'fill' || !HEX.test(value)) throw new Error(`${file}: unsupported style ${property}: ${value}`);
      for (const selector of selectors.split(',').map(s => s.trim())) {
        if (!/^\.[\w-]+$/.test(selector)) throw new Error(`${file}: unsupported selector ${selector}`);
        fills[selector.slice(1)] = value.toLowerCase();
      }
    }
  }
  return fills;
}
/** Parses one SVG into { viewBox, shapes: [{ tag, attrs, fill }] } with each shape's effective fill resolved. */
export function parseSymbol(text, file) {
  const body = text.replace(/^\uFEFF?<\?xml[^>]*\?>/, '').replace(/<!--[\s\S]*?-->/g, '').trim();
  const svg = body.match(/^<svg\b([^>]*)>([\s\S]*)<\/svg>$/);
  if (!svg) throw new Error(`${file}: not a single <svg> document`);
  const root = attributes(svg[1], file);
  if (!/^[\d.\s-]+$/.test(root.viewBox ?? '')) throw new Error(`${file}: missing viewBox`);
  let inner = svg[2], fills = {};
  inner = inner.replace(/<defs>\s*<style>([\s\S]*?)<\/style>\s*<\/defs>/g, (_, css) => { Object.assign(fills, classFills(css, file)); return ''; });
  const shapes = [], groups = [];
  for (const [, closing, tag, attrText, selfClosing] of inner.matchAll(/<(\/?)([a-zA-Z]+)\b([^>]*?)(\/?)>/g)) {
    if (tag === 'g') {
      if (closing) { groups.pop(); continue; }
      const attrs = attributes(attrText, file);
      for (const name of Object.keys(attrs)) if (!COMMON.includes(name)) throw new Error(`${file}: unsupported <g> attribute ${name}`);
      groups.push(attrs.fill ?? (attrs.class && fills[attrs.class]));
      if (selfClosing) groups.pop();
      continue;
    }
    if (!(tag in SHAPES) || closing) throw new Error(`${file}: unsupported element <${closing}${tag}>`);
    const attrs = attributes(attrText, file), kept = {};
    for (const [name, value] of Object.entries(attrs)) {
      if (SHAPES[tag].includes(name)) kept[REACT_NAMES[name] ?? name] = value;
      else if (!COMMON.includes(name)) throw new Error(`${file}: unsupported <${tag}> attribute ${name}`);
    }
    const fill = (attrs.fill ?? (attrs.class && fills[attrs.class]) ?? [...groups].reverse().find(Boolean) ?? '#000000').toLowerCase();
    if (!HEX.test(fill)) throw new Error(`${file}: unsupported fill ${fill}`);
    shapes.push({ tag, attrs: kept, fill });
  }
  if (inner.replace(/<[^>]+>/g, '').trim()) throw new Error(`${file}: unexpected text content`);
  if (!shapes.length) throw new Error(`${file}: no shapes`);
  return { viewBox: root.viewBox.trim().split(/\s+/).map(Number).join(' '), shapes };
}

/**
 * Conservative bounds of a path: every end and control point (a Bézier curve lies inside its control points),
 * and each arc's end points widened by its radii. It can over-pad slightly; it never clips.
 */
export function pathBounds(d) {
  const tokens = d.match(/[a-zA-Z]|-?(?:\d+\.?\d*|\.\d+)(?:e[-+]?\d+)?/gi) ?? [];
  const box = [Infinity, Infinity, -Infinity, -Infinity], add = (x, y) => { box[0] = Math.min(box[0], x); box[1] = Math.min(box[1], y); box[2] = Math.max(box[2], x); box[3] = Math.max(box[3], y); };
  const arity = { M: 2, L: 2, H: 1, V: 1, C: 6, S: 4, Q: 4, T: 2, A: 7, Z: 0 };
  let i = 0, command = '', x = 0, y = 0, startX = 0, startY = 0;
  while (i < tokens.length) {
    if (/[a-z]/i.test(tokens[i])) command = tokens[i++];
    const upper = command.toUpperCase(), relative = command !== upper;
    if (!(upper in arity)) throw new Error('Unsupported path command ' + command);
    if (upper === 'Z') { x = startX; y = startY; continue; }
    const n = tokens.slice(i, i + arity[upper]).map(Number); i += arity[upper];
    if (n.length !== arity[upper] || n.some(Number.isNaN)) throw new Error('Malformed path data');
    const ox = relative ? x : 0, oy = relative ? y : 0;
    if (upper === 'H') x = n[0] + ox;
    else if (upper === 'V') y = n[0] + oy;
    else if (upper === 'A') { const [rx, ry] = n; add(x - rx, y - ry); add(x + rx, y + ry); x = n[5] + ox; y = n[6] + oy; add(x - rx, y - ry); add(x + rx, y + ry); }
    else { for (let k = 0; k < n.length - 2; k += 2) add(n[k] + ox, n[k + 1] + oy); x = n[n.length - 2] + ox; y = n[n.length - 1] + oy; }
    add(x, y);
    if (upper === 'M') { startX = x; startY = y; command = relative ? 'l' : 'L'; }
  }
  return box;
}
function shapeBounds(shape) {
  if (shape.tag === 'path') return pathBounds(shape.attrs.d);
  if (shape.tag === 'circle') { const [cx, cy, r] = ['cx', 'cy', 'r'].map(k => Number(shape.attrs[k] ?? 0)); return [cx - r, cy - r, cx + r, cy + r]; }
  const points = shape.attrs.points.trim().split(/[\s,]+/).map(Number);
  const xs = points.filter((_, k) => k % 2 === 0), ys = points.filter((_, k) => k % 2 === 1);
  return [Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys)];
}
/** A square viewBox centred on the shapes' bounds with 1/12 padding per side, rounded outward. */
export function displayViewBox(shapes) {
  const boxes = shapes.map(shapeBounds);
  const [x0, y0, x1, y1] = [Math.min(...boxes.map(b => b[0])), Math.min(...boxes.map(b => b[1])), Math.max(...boxes.map(b => b[2])), Math.max(...boxes.map(b => b[3]))];
  const side = Math.max(x1 - x0, y1 - y0) * 7 / 6, cx = (x0 + x1) / 2, cy = (y0 + y1) / 2;
  const r = v => Math.round(v * 100) / 100;
  return [r(cx - side / 2), r(cy - side / 2), r(side), r(side)].join(' ');
}

/** Builds src/generated/symbols.ts text from the symbol manifest. Single-colour symbols render in currentColor. */
export function buildSymbolModule(root, header) {
  const manifest = JSON.parse(readFileSync(join(root, 'src/assets/symbols/manifest.json'), 'utf8'));
  const groups = { gameplay: {}, ink: {} };
  for (const entry of manifest.symbols) {
    const bytes = readFileSync(join(root, entry.path));
    if (createHash('sha256').update(bytes).digest('hex') !== entry.sha256) throw new Error(`${entry.path}: checksum differs from the manifest`);
    const { viewBox, shapes } = parseSymbol(bytes.toString('utf8'), entry.path);
    const colours = new Set(shapes.map(s => s.fill));
    if (entry.colour === 'single' && colours.size !== 1) throw new Error(`${entry.path}: a single-colour symbol has ${colours.size} fills`);
    groups[entry.kind][entry.name] = { viewBox: displayViewBox(shapes), sourceViewBox: viewBox, shapes: shapes.map(s => ({ tag: s.tag, attrs: entry.colour === 'single' ? s.attrs : { ...s.attrs, fill: s.fill } })) };
  }
  return [`/* ${header} Symbol provenance: src/assets/symbols/manifest.json */`,
    "export interface SymbolShape { readonly tag: 'path' | 'polygon' | 'circle'; readonly attrs: Readonly<Record<string, string>> }",
    '/** viewBox: the display crop (shape bounds, squared, 1/12 padding); sourceViewBox: the file\'s own. */',
    'export interface SymbolData { readonly viewBox: string; readonly sourceViewBox: string; readonly shapes: readonly SymbolShape[] }',
    '/** Printed gameplay symbols in one colour; they render in currentColor so they follow the theme. */',
    `export const gameplaySymbols = ${JSON.stringify(groups.gameplay, null, 2)} as const satisfies Record<string, SymbolData>;`,
    '/** Ink identity symbols in their own fixed colours; never recoloured by the theme. */',
    `export const inkSymbols = ${JSON.stringify(groups.ink, null, 2)} as const satisfies Record<string, SymbolData>;`, ''].join('\n');
}
