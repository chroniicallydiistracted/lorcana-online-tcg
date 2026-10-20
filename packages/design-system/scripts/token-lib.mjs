// Token loading, validation and formatting for the documented DTCG 2025.10 subset (standard §10).
// The validator is independent of Style Dictionary: it is the contract the build must satisfy.
import { readFileSync, readdirSync } from 'node:fs';
import { join, relative } from 'node:path';

export const THEMES = ['paper', 'ink'];
export const TYPES = new Set(['color', 'dimension', 'duration', 'cubicBezier', 'fontFamily', 'fontWeight', 'number', 'shadow', 'typography']);
const TOKEN_KEYS = new Set(['$value', '$type', '$description', '$extensions', '$deprecated']);
const GROUP_KEYS = new Set(['$type', '$description', '$extensions']);
const NAME = /^[a-z0-9][a-z0-9-]*$/;
const ALIAS = /^\{([a-z0-9][a-z0-9-]*(?:\.[a-z0-9][a-z0-9-]*)*)\}$/;
export const EXTENSION = 'org.theinkspire';
const CSS_UNITS = new Set(['cqw', 'ch']);

/** Files by layer. Base files are shared; each theme file maps the same semantic paths. */
export function sourceFiles(root) {
  const list = dir => readdirSync(join(root, dir)).filter(name => name.endsWith('.tokens.json')).sort().map(name => join(dir, name));
  return {
    primitive: list('tokens/primitive'), semantic: ['tokens/semantic/base.tokens.json'], component: list('tokens/component'), card: list('tokens/card'),
    themes: Object.fromEntries(THEMES.map(theme => [theme, `tokens/semantic/theme-${theme}.tokens.json`])),
  };
}
export function layerOf(file) {
  if (file.startsWith('tokens/primitive/')) return 'primitive';
  if (file.startsWith('tokens/component/')) return 'component';
  if (file.startsWith('tokens/card/')) return 'card';
  return 'semantic';
}

/** Flatten one source file into tokens with inherited types, reporting structural problems. */
export function flatten(document, file, errors) {
  const tokens = [];
  function walk(node, path, inheritedType) {
    if (!node || typeof node !== 'object' || Array.isArray(node)) { errors.push(`${file}: ${path.join('.') || '(root)'} is not a group or token`); return; }
    const isToken = Object.hasOwn(node, '$value');
    for (const key of Object.keys(node)) {
      if (key.startsWith('$')) {
        if (!(isToken ? TOKEN_KEYS : GROUP_KEYS).has(key)) errors.push(`${file}: unsupported construct ${key} at ${path.join('.') || '(root)'}`);
      } else if (isToken) errors.push(`${file}: token ${path.join('.')} has a child ${key}`);
      else if (!NAME.test(key)) errors.push(`${file}: invalid name ${[...path, key].join('.')}`);
    }
    if (node.$extensions !== undefined && (typeof node.$extensions !== 'object' || Array.isArray(node.$extensions) || Object.keys(node.$extensions).some(k => k !== EXTENSION))) errors.push(`${file}: unsupported extension at ${path.join('.')}`);
    const type = node.$type ?? inheritedType;
    if (node.$type !== undefined && !TYPES.has(node.$type)) errors.push(`${file}: unsupported type ${node.$type} at ${path.join('.') || '(root)'}`);
    if (isToken) {
      if (!type) errors.push(`${file}: ${path.join('.')} has no $type`);
      tokens.push({ path: path.join('.'), type, value: node.$value, description: node.$description, extensions: node.$extensions?.[EXTENSION], file, layer: layerOf(file) });
      return;
    }
    for (const [key, child] of Object.entries(node)) if (!key.startsWith('$')) walk(child, [...path, key], type);
  }
  walk(document, [], undefined);
  return tokens;
}

const isNumber = value => typeof value === 'number' && Number.isFinite(value);
function checkDimension(value, where, errors, { allowNegative = false } = {}) {
  if (!value || typeof value !== 'object' || Array.isArray(value) || Object.keys(value).some(k => !['value', 'unit'].includes(k))) return errors.push(`${where}: invalid dimension`);
  if (!isNumber(value.value) || !['px', 'rem'].includes(value.unit)) return errors.push(`${where}: invalid dimension or unit`);
  if (!allowNegative && value.value < 0) errors.push(`${where}: negative dimension`);
}
function checkColor(value, where, errors) {
  if (!value || typeof value !== 'object' || Array.isArray(value) || Object.keys(value).some(k => !['colorSpace', 'components', 'alpha', 'hex'].includes(k))) return errors.push(`${where}: invalid color`);
  if (value.colorSpace !== 'srgb') return errors.push(`${where}: unsupported color space ${value.colorSpace}`);
  if (!Array.isArray(value.components) || value.components.length !== 3 || value.components.some(c => !isNumber(c) || c < 0 || c > 1)) return errors.push(`${where}: invalid color components`);
  if (value.alpha !== undefined && (!isNumber(value.alpha) || value.alpha < 0 || value.alpha > 1)) errors.push(`${where}: invalid alpha`);
  if (value.hex !== undefined) {
    if (typeof value.hex !== 'string' || !/^#[0-9a-f]{6}$/.test(value.hex)) return errors.push(`${where}: invalid hex`);
    const fromHex = [1, 3, 5].map(i => parseInt(value.hex.slice(i, i + 2), 16));
    if (value.components.some((c, i) => Math.round(c * 255) !== fromHex[i])) errors.push(`${where}: hex does not match components`);
  }
}
/** Validate a literal (non-alias) value of a type. Composite members may be aliases (checked later). */
function checkValue(type, value, where, errors, token) {
  switch (type) {
    case 'color': return checkColor(value, where, errors);
    case 'dimension': return checkDimension(value, where, errors);
    case 'duration':
      if (!value || typeof value !== 'object' || Object.keys(value).some(k => !['value', 'unit'].includes(k)) || !isNumber(value.value) || value.value < 0 || !['ms', 's'].includes(value.unit)) errors.push(`${where}: invalid duration`);
      return;
    case 'cubicBezier':
      if (!Array.isArray(value) || value.length !== 4 || value.some(n => !isNumber(n)) || value[0] < 0 || value[0] > 1 || value[2] < 0 || value[2] > 1) errors.push(`${where}: invalid cubicBezier`);
      return;
    case 'fontFamily':
      if (!(typeof value === 'string' && value) && !(Array.isArray(value) && value.length && value.every(v => typeof v === 'string' && v))) errors.push(`${where}: invalid fontFamily`);
      return;
    case 'fontWeight':
      if (!isNumber(value) || value < 1 || value > 1000) errors.push(`${where}: invalid fontWeight`);
      return;
    case 'number':
      if (!isNumber(value)) errors.push(`${where}: invalid number`);
      if (token?.extensions !== undefined && (Object.keys(token.extensions).some(k => k !== 'cssUnit') || !CSS_UNITS.has(token.extensions.cssUnit))) errors.push(`${where}: unsupported unit extension`);
      return;
    case 'shadow': {
      const layers = Array.isArray(value) ? value : [value];
      if (!layers.length) errors.push(`${where}: empty shadow`);
      for (const layer of layers) {
        if (!layer || typeof layer !== 'object' || Object.keys(layer).some(k => !['color', 'offsetX', 'offsetY', 'blur', 'spread', 'inset'].includes(k)) || ['color', 'offsetX', 'offsetY', 'blur', 'spread'].some(k => layer[k] === undefined)) { errors.push(`${where}: invalid shadow`); continue; }
        if (!isAlias(layer.color)) checkColor(layer.color, where + '.color', errors);
        for (const k of ['offsetX', 'offsetY']) if (!isAlias(layer[k])) checkDimension(layer[k], `${where}.${k}`, errors, { allowNegative: true });
        for (const k of ['blur', 'spread']) if (!isAlias(layer[k])) checkDimension(layer[k], `${where}.${k}`, errors);
        if (layer.inset !== undefined && typeof layer.inset !== 'boolean') errors.push(`${where}: invalid inset`);
      }
      return;
    }
    case 'typography': {
      const keys = ['fontFamily', 'fontSize', 'lineHeight', 'fontWeight', 'letterSpacing'];
      if (!value || typeof value !== 'object' || Array.isArray(value) || Object.keys(value).some(k => !keys.includes(k)) || keys.some(k => value[k] === undefined)) return errors.push(`${where}: invalid typography`);
      if (!isAlias(value.fontFamily)) checkValue('fontFamily', value.fontFamily, where + '.fontFamily', errors);
      if (!isAlias(value.fontSize)) checkDimension(value.fontSize, where + '.fontSize', errors);
      if (!isAlias(value.lineHeight) && !isNumber(value.lineHeight)) checkDimension(value.lineHeight, where + '.lineHeight', errors);
      if (!isAlias(value.fontWeight)) checkValue('fontWeight', value.fontWeight, where + '.fontWeight', errors);
      if (!isAlias(value.letterSpacing)) checkDimension(value.letterSpacing, where + '.letterSpacing', errors, { allowNegative: true });
      return;
    }
    default: errors.push(`${where}: unsupported type ${type}`);
  }
}
export const isAlias = value => typeof value === 'string' && ALIAS.test(value);
const COMPOSITE_MEMBER_TYPES = { fontFamily: ['fontFamily'], fontSize: ['dimension'], lineHeight: ['dimension', 'number'], fontWeight: ['fontWeight'], letterSpacing: ['dimension'], color: ['color'], offsetX: ['dimension'], offsetY: ['dimension'], blur: ['dimension'], spread: ['dimension'] };

/** Validate one resolved set (base files + one theme file). Returns tokens keyed by path. */
export function validateSet(root, files, errors) {
  const all = [];
  for (const file of files) {
    let document;
    try { document = JSON.parse(readFileSync(join(root, file), 'utf8')); } catch (error) { errors.push(`${file}: unreadable JSON (${error.message})`); continue; }
    all.push(...flatten(document, file, errors));
  }
  const byPath = new Map();
  for (const token of all) {
    if (byPath.has(token.path)) errors.push(`${token.file}: duplicate token ${token.path} (also in ${byPath.get(token.path).file})`);
    byPath.set(token.path, token);
  }
  for (const token of byPath.values()) {
    const where = `${token.file}: ${token.path}`;
    if (typeof token.description !== 'string' || !token.description.trim()) errors.push(`${where}: missing description`);
    if (isAlias(token.value)) {
      const target = byPath.get(token.value.slice(1, -1));
      if (!target) errors.push(`${where}: missing reference ${token.value}`);
      else if (target.type !== token.type) errors.push(`${where}: type mismatch, ${token.type} references ${target.type}`);
    } else {
      checkValue(token.type, token.value, where, errors, token);
      if (token.type === 'typography' || token.type === 'shadow') {
        const members = token.type === 'shadow' ? (Array.isArray(token.value) ? token.value : [token.value]) : [token.value];
        for (const member of members) for (const [key, v] of Object.entries(member ?? {})) if (isAlias(v)) {
          const target = byPath.get(v.slice(1, -1));
          if (!target) errors.push(`${where}.${key}: missing reference ${v}`);
          else if (!COMPOSITE_MEMBER_TYPES[key]?.includes(target.type)) errors.push(`${where}.${key}: type mismatch, references ${target.type}`);
        }
      }
    }
    if (token.path.startsWith('color.neutral.') && token.type === 'color' && !isAlias(token.value)) {
      const [r, g, b] = token.value.components;
      if (r !== g || g !== b) errors.push(`${where}: neutral is not achromatic`);
    }
  }
  // Circular references, including through composite members.
  const refsOf = token => {
    const refs = [];
    const visit = v => { if (isAlias(v)) refs.push(v.slice(1, -1)); else if (Array.isArray(v)) v.forEach(visit); else if (v && typeof v === 'object') Object.values(v).forEach(visit); };
    visit(token.value); return refs;
  };
  const state = new Map();
  const visit = (path, stack) => {
    if (state.get(path) === 'done') return;
    if (state.get(path) === 'active') { errors.push(`circular reference: ${[...stack, path].join(' -> ')}`); return; }
    state.set(path, 'active');
    const token = byPath.get(path);
    if (token) for (const ref of refsOf(token)) if (byPath.has(ref)) visit(ref, [...stack, path]);
    state.set(path, 'done');
  };
  for (const path of byPath.keys()) visit(path, []);
  return byPath;
}

/** Resolve a token's value fully (aliases replaced, recursively). */
export function resolve(byPath, value, seen = new Set()) {
  if (isAlias(value)) {
    const path = value.slice(1, -1);
    if (seen.has(path)) throw new Error('circular reference at ' + path);
    const target = byPath.get(path);
    if (!target) throw new Error('missing reference ' + value);
    return resolve(byPath, target.value, new Set([...seen, path]));
  }
  if (Array.isArray(value)) return value.map(v => resolve(byPath, v, seen));
  if (value && typeof value === 'object' && !('colorSpace' in value) && !('unit' in value)) return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, resolve(byPath, v, seen)]));
  return value;
}

export function luminance({ components }) {
  return components.map(c => c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4).reduce((sum, c, i) => sum + c * [0.2126, 0.7152, 0.0722][i], 0);
}
export function contrast(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

/** Validate everything: structure, references, cycles, types, units, descriptions, theme mappings, contrast. */
export function validateTokens(root) {
  const errors = [], files = sourceFiles(root), base = [...files.primitive, ...files.semantic, ...files.component, ...files.card];
  const sets = {};
  for (const theme of THEMES) sets[theme] = validateSet(root, [...base, files.themes[theme]], errors);
  // Theme mapping completeness: every theme defines the same paths with the same types.
  const themed = theme => new Map([...sets[theme].values()].filter(t => t.file === files.themes[theme]).map(t => [t.path, t.type]));
  const [first, ...rest] = THEMES.map(themed);
  for (const [i, other] of rest.entries()) {
    for (const [path, type] of first) if (other.get(path) !== type) errors.push(`missing theme mapping: ${THEMES[i + 1]} lacks ${path}`);
    for (const path of other.keys()) if (!first.has(path)) errors.push(`missing theme mapping: ${THEMES[0]} lacks ${path}`);
  }
  // Contrast pairs.
  const contrastResults = [];
  let pairs = [];
  try { pairs = JSON.parse(readFileSync(join(root, 'tokens/contrast-pairs.json'), 'utf8')).pairs; } catch { errors.push('tokens/contrast-pairs.json unreadable'); }
  for (const theme of THEMES) for (const pair of pairs) {
    try {
      const fg = resolve(sets[theme], `{${pair.foreground}}`), bg = resolve(sets[theme], `{${pair.background}}`);
      const ratio = contrast(fg, bg);
      contrastResults.push({ theme, ...pair, ratio: Number(ratio.toFixed(2)) });
      if (ratio < pair.minimum) errors.push(`contrast regression (${theme}): ${pair.foreground} on ${pair.background} is ${ratio.toFixed(2)}:1, needs ${pair.minimum}:1`);
    } catch (error) { errors.push(`contrast pair (${theme}) ${pair.foreground}/${pair.background}: ${error.message}`); }
  }
  return { errors, sets, files, contrastResults };
}

// ---------- CSS value formatting ----------
const trim = n => Number(n.toFixed(4)).toString();
export function cssColor(value) {
  const [r, g, b] = value.components.map(c => Math.round(c * 255));
  const alpha = value.alpha ?? 1;
  if (alpha === 1) return value.hex ?? '#' + [r, g, b].map(c => c.toString(16).padStart(2, '0')).join('');
  return `rgba(${r}, ${g}, ${b}, ${trim(alpha)})`;
}
export const cssDimension = value => value.value === 0 ? '0' : `${trim(value.value)}${value.unit}`;
export function cssValue(type, value, token) {
  switch (type) {
    case 'color': return cssColor(value);
    case 'dimension': return cssDimension(value);
    case 'duration': return `${trim(value.unit === 's' ? value.value * 1000 : value.value)}ms`;
    case 'cubicBezier': return `cubic-bezier(${value.map(trim).join(', ')})`;
    case 'fontFamily': return (Array.isArray(value) ? value : [value]).map(f => /^(?:serif|sans-serif|monospace|system-ui|cursive|fantasy)$/.test(f) ? f : `"${f}"`).join(', ');
    case 'fontWeight': return String(value);
    case 'number': return token?.extensions?.cssUnit ? `${trim(value)}${token.extensions.cssUnit}` : trim(value);
    case 'shadow': return (Array.isArray(value) ? value : [value]).map(l => `${l.inset ? 'inset ' : ''}${cssDimension(l.offsetX)} ${cssDimension(l.offsetY)} ${cssDimension(l.blur)} ${cssDimension(l.spread)} ${cssColor(l.color)}`).join(', ');
    default: throw new Error('No CSS value for ' + type);
  }
}
export const cssName = path => '--is-' + path.split('.').join('-');
export const rel = (root, path) => relative(root, path);
