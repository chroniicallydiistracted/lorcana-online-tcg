// Component contract gate (standard §13, §33, §35): complete documentation and story coverage of every documented state.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import ts from 'typescript';

const root = fileURLToPath(new URL('../', import.meta.url));
const FIELDS = ['name', 'status', 'foundation', 'purpose', 'anatomy', 'variants', 'states', 'inputs', 'outputs', 'accessibility', 'contentLimits', 'usage'];
const REQUIRED_LISTS = ['anatomy', 'states', 'inputs', 'accessibility', 'usage'];
const STATUSES = ['proposed', 'experimental', 'stable', 'deprecated'];
function walk(folder, test) {
  const out = [];
  for (const name of readdirSync(folder)) {
    const path = join(folder, name);
    if (statSync(path).isDirectory()) out.push(...walk(path, test)); else if (test(name)) out.push(path);
  }
  return out.sort();
}
/** Collect `coverage: { Component: ['state', ...] }` declarations from story files. */
export function storyCoverage(files) {
  const coverage = new Map(), problems = [];
  for (const file of files) {
    const source = ts.createSourceFile(file, readFileSync(file, 'utf8'), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
    const visit = node => {
      if (ts.isPropertyAssignment(node) && node.name.getText(source) === 'coverage') {
        if (!ts.isObjectLiteralExpression(node.initializer)) problems.push(`${relative(root, file)}: coverage must be an object literal`);
        else for (const entry of node.initializer.properties) {
          if (!ts.isPropertyAssignment(entry) || !ts.isArrayLiteralExpression(entry.initializer)) { problems.push(`${relative(root, file)}: invalid coverage entry`); continue; }
          const name = entry.name.getText(source).replace(/['"]/g, ''), states = coverage.get(name) ?? new Set();
          for (const element of entry.initializer.elements) if (ts.isStringLiteral(element)) states.add(element.text); else problems.push(`${relative(root, file)}: non-literal state for ${name}`);
          coverage.set(name, states);
        }
      }
      ts.forEachChild(node, visit);
    };
    visit(source);
  }
  return { coverage, problems };
}
export async function checkComponents() {
  const problems = [], docs = [];
  const componentDirs = readdirSync(join(root, 'src/components')).filter(name => statSync(join(root, 'src/components', name)).isDirectory()).filter(name => name !== 'Field');
  const docFiles = walk(join(root, 'src/components'), name => name.endsWith('.docs.ts'));
  for (const dir of componentDirs) if (!docFiles.some(file => file.includes(`/components/${dir}/`))) problems.push(`src/components/${dir} has no documentation file`);
  for (const file of docFiles) {
    const module = await import(pathToFileURL(file).href), exported = Object.entries(module).filter(([, v]) => v && typeof v === 'object' && 'purpose' in v);
    if (!exported.length) problems.push(`${relative(root, file)} exports no component documentation`);
    for (const [variable, doc] of exported) docs.push({ variable, doc, file: relative(root, file) });
  }
  const names = new Set();
  for (const { doc, file } of docs) {
    const where = `${file} (${doc.name})`;
    for (const field of FIELDS) if (!(field in doc)) problems.push(`${where}: missing ${field}`);
    if (names.has(doc.name)) problems.push(`${where}: duplicate component name`);
    names.add(doc.name);
    if (!STATUSES.includes(doc.status)) problems.push(`${where}: invalid status ${doc.status}`);
    if (doc.status === 'stable') problems.push(`${where}: stable requires approved visual treatment and recorded evidence (standard §35); keep experimental`);
    for (const field of ['name', 'foundation', 'purpose']) if (typeof doc[field] !== 'string' || !doc[field].trim()) problems.push(`${where}: empty ${field}`);
    for (const field of FIELDS.slice(4)) if (!Array.isArray(doc[field]) || doc[field].some(v => typeof v !== 'string' || !v.trim())) problems.push(`${where}: ${field} must be a list of non-empty strings`);
    for (const field of REQUIRED_LISTS) if (Array.isArray(doc[field]) && !doc[field].length) problems.push(`${where}: ${field} cannot be empty`);
  }
  const storyFiles = walk(join(root, 'stories'), name => name.endsWith('.stories.tsx'));
  const { coverage, problems: storyProblems } = storyCoverage(storyFiles);
  problems.push(...storyProblems);
  const storyText = storyFiles.map(file => readFileSync(file, 'utf8')).join('\n');
  let covered = 0, total = 0;
  for (const { variable, doc } of docs) {
    if (!new RegExp(`\\b${variable}\\b`).test(storyText)) problems.push(`${doc.name}: documentation is not rendered in any story (${variable})`);
    const states = coverage.get(doc.name) ?? new Set();
    for (const state of doc.states) { total++; if (states.has(state)) covered++; else problems.push(`${doc.name}: state "${state}" has no story`); }
  }
  for (const [name, states] of coverage) {
    const doc = docs.find(d => d.doc.name === name)?.doc;
    if (!doc) { problems.push(`Story coverage names unknown component ${name}`); continue; }
    for (const state of states) if (!doc.states.includes(state)) problems.push(`Story coverage lists undocumented state "${state}" for ${name}`);
  }
  return { problems, components: docs.length, states: total, covered };
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  checkComponents().then(({ problems, components, states, covered }) => {
    if (problems.length) { console.error(problems.join('\n')); process.exitCode = 1; }
    else console.log(`PASS components: ${components} documented components; ${covered}/${states} documented states have stories`);
  }).catch(error => { console.error(error); process.exitCode = 1; });
}
