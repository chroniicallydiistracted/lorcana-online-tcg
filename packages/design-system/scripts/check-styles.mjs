// Token ownership gate (standard §10, §33): forbidden raw styles and unknown tokens in component and app styling.
// A deliberate raw value must carry a "token-exception: <reason>" comment on the same line; every exception is listed.
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const packageRoot = fileURLToPath(new URL('../', import.meta.url)), repository = resolve(packageRoot, '../..');
export const SCOPES = ['packages/design-system/src', 'apps/web/src'];
// Runtime variables set by React Aria, and --hand-offset and --hand-count, set inline by HandFan for the fan geometry.
const RUNTIME_VARS = new Set(['--trigger-width', '--visual-viewport-height', '--trigger-anchor-point', '--hand-offset', '--hand-count']);
const SYSTEM_COLORS = ['canvas', 'canvastext', 'linktext', 'visitedtext', 'activetext', 'buttonface', 'buttontext', 'buttonborder', 'field', 'fieldtext', 'highlight', 'highlighttext', 'selecteditem', 'selecteditemtext', 'mark', 'marktext', 'graytext', 'accentcolor', 'accentcolortext'];
const NAMED_COLORS = ['black', 'white', 'red', 'green', 'blue', 'gray', 'grey', 'silver', 'yellow', 'orange', 'purple', 'pink', 'brown', 'navy', 'teal', 'maroon', 'olive', 'aqua', 'fuchsia', 'lime', 'gold', 'indigo', 'violet', 'cyan', 'magenta', 'beige', 'ivory', 'tan', 'coral', 'salmon', 'crimson'];
const COLOR_PROPS = /^(?:color|background(?:-color)?|border(?:-(?:block|inline)(?:-(?:start|end))?|-(?:top|right|bottom|left))?(?:-color)?|outline(?:-color)?|fill|stroke|box-shadow|text-decoration(?:-color)?|caret-color|accent-color|column-rule(?:-color)?)$/;

function files(folder, pattern) {
  if (!existsSync(folder)) return [];
  const out = [];
  for (const name of readdirSync(folder)) {
    const path = join(folder, name);
    if (statSync(path).isDirectory()) { if (name !== 'generated') out.push(...files(path, pattern)); }
    else if (pattern.test(name)) out.push(path);
  }
  return out.sort();
}
export function knownVariables() {
  const css = readFileSync(join(packageRoot, 'src/generated/tokens.css'), 'utf8');
  return new Set([...css.matchAll(/(--is-[a-z0-9-]+)\s*:/g)].map(m => m[1]));
}
/** Check one stylesheet's text. Returns problems and exceptions with line numbers. */
export function checkCss(text, file, known = knownVariables()) {
  const problems = [], exceptions = [], lines = text.split('\n');
  let forcedDepth = 0, depth = 0;
  lines.forEach((raw, index) => {
    const where = `${file}:${index + 1}`;
    const exception = /token-exception:\s*\S/.test(raw);
    const line = raw.replace(/\/\*[\s\S]*?\*\//g, '');
    if (/@media[^{]*forced-colors\s*:\s*active/.test(line)) forcedDepth = depth + 1;
    const opens = (line.match(/\{/g) ?? []).length, closes = (line.match(/\}/g) ?? []).length;
    const inForced = forcedDepth > 0 && depth + opens >= forcedDepth;
    const flag = message => { if (exception) exceptions.push(`${where}: ${raw.match(/token-exception:\s*([^*]*)/)[1].trim()}`); else problems.push(`${where}: ${message}`); };
    for (const m of line.matchAll(/var\((--[a-z0-9-]+)/gi)) if (!known.has(m[1]) && !RUNTIME_VARS.has(m[1])) problems.push(`${where}: unknown token ${m[1]}`);
    if (!/^\s*@value\b/.test(line)) {
      if (/#[0-9a-f]{3,8}\b/i.test(line) || /\b(?:rgba?|hsla?|hwb|lab|lch|oklab|oklch)\(/i.test(line)) flag('raw colour');
      if (/!important/.test(line)) flag('!important');
      for (const decl of line.matchAll(/([a-z-]+)\s*:\s*([^;{}]+)/gi)) {
        const prop = decl[1].toLowerCase(), value = decl[2].trim(), lower = value.toLowerCase();
        if (prop.startsWith('--')) continue;
        if (COLOR_PROPS.test(prop)) {
          const words = lower.replace(/var\([^)]*\)/g, '').split(/[\s,()]+/);
          if (words.some(w => NAMED_COLORS.includes(w))) flag(`named colour in ${prop}`);
          if (!inForced && words.some(w => SYSTEM_COLORS.includes(w))) flag(`system colour outside forced-colors in ${prop}`);
        }
        if ((prop === 'font-family' || prop === 'font') && !/^(?:var\(|inherit)/.test(lower)) flag(`raw ${prop}`);
        if (['font-size', 'line-height', 'font-weight', 'letter-spacing'].includes(prop) && !/^(?:var\(|inherit|normal|calc\(var\()/.test(lower)) flag(`raw ${prop}`);
        if (prop === 'box-shadow' && lower !== 'none' && !/var\(--is-/.test(lower)) flag('raw box-shadow');
        if (prop.endsWith('radius') && !/^(?:0|var\()/.test(lower) && !/^var\(/.test(lower.split(/\s+/).find(p => p !== '0') ?? 'var(')) flag('raw radius');
        if ((prop.startsWith('transition') || prop.startsWith('animation')) && /\b\d*\.?\d+m?s\b/.test(lower.replace(/var\([^)]*\)/g, ''))) flag('raw duration');
        if (prop === 'z-index') flag('raw z-index');
        if (prop !== 'content') {
          const stripped = value.replace(/var\([^)]*\)/g, '');
          for (const unit of stripped.matchAll(/(-?\d*\.?\d+)(px|rem|ch|vh|vw|vmin|vmax|cqw|cqh)\b/g)) {
            if (unit[2] === 'px' && ['1', '-1', '0'].includes(unit[1])) continue;
            flag(`raw length ${unit[0]} in ${prop}`); break;
          }
        }
      }
    }
    depth += opens - closes;
    if (forcedDepth && depth < forcedDepth) forcedDepth = 0;
  });
  return { problems, exceptions };
}
export function checkSource(text, file) {
  const problems = [];
  text.split('\n').forEach((line, index) => {
    if (/token-exception:\s*\S/.test(line)) return;
    if (/['"`]#[0-9a-f]{3,8}['"`]/i.test(line) || /['"`](?:rgba?|hsla?)\(/i.test(line)) problems.push(`${file}:${index + 1}: raw colour in source`);
    if (/fontFamily\s*:/.test(line)) problems.push(`${file}:${index + 1}: inline font family`);
  });
  return problems;
}
export function checkStyles(root = repository) {
  const known = knownVariables(), problems = [], exceptions = [];
  let scanned = 0;
  for (const scope of SCOPES) {
    for (const file of files(join(root, scope), /\.css$/)) { scanned++; const r = checkCss(readFileSync(file, 'utf8'), relative(root, file), known); problems.push(...r.problems); exceptions.push(...r.exceptions); }
    for (const file of files(join(root, scope), /\.(?:tsx?|mts)$/)) { if (file.endsWith('.d.css.ts')) continue; scanned++; problems.push(...checkSource(readFileSync(file, 'utf8'), relative(root, file))); }
  }
  return { scanned, problems, exceptions };
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const { scanned, problems, exceptions } = checkStyles();
  if (problems.length) { console.error(problems.join('\n')); process.exitCode = 1; }
  else console.log(`PASS styles: ${scanned} files use tokens; ${exceptions.length} documented exceptions\n${exceptions.map(e => '  ' + e).join('\n')}`);
}
