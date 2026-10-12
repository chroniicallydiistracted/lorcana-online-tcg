import { readFileSync, readdirSync, existsSync, realpathSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { builtinModules } from 'node:module';
import ts from 'typescript';
import { parse } from 'parse5';
import parseCSSValues from 'postcss-value-parser';

const repository = fileURLToPath(new URL('../', import.meta.url));
const forbiddenExternal = /^(?:pg(?:\/|$)|fastify(?:\/|$)|drizzle-|better-auth|pg-boss|@fastify\/|@tcg\/)/;
const builtins = new Set(builtinModules.map(name => name.replace(/^node:/, '')));
export function boundaryContext(root = repository) {
  const owners = [];
  for (const group of ['apps', 'packages', 'vendor']) {
    const folder = join(root, group);
    if (!existsSync(folder)) continue;
    for (const dir of readdirSync(folder, { withFileTypes: true })) {
      const path = join(folder, dir.name);
      if (!dir.isDirectory()) continue;
      const manifest = join(path, 'package.json');
      const data = existsSync(manifest) ? JSON.parse(readFileSync(manifest, 'utf8')) : { name: `@lorcana/${dir.name}`, lorcana: { scope: 'reserved' } };
      owners.push({ ...data, path, scope: data.lorcana?.scope ?? 'reserved' });
    }
  }
  return { root, owners };
}
function ownerOf(path, context) {
  return context.owners.find(owner => path === owner.path || path.startsWith(owner.path + '/'));
}
function fail(file, target) { throw new Error(`Forbidden browser import: ${file} -> ${target}`); }
function kernelEdge(owner, target, name) {
  return (owner?.name === '@lorcana/engine-lab' && owner.scope === 'browser' || owner?.name === '@lorcana/engine-adapter' && owner.scope === 'server') && target?.name === '@lorcana/vendor-engine' && target.scope === 'engine' && name === '@lorcana/vendor-engine';
}
function compiledKernel(path, owner) {
  return owner?.name === '@lorcana/vendor-engine' && owner.scope === 'engine' && ['dist/kernel.js', 'dist/kernel.d.ts'].some(name => path === join(owner.path, name));
}
function inspectEngineEdge(file, owner, name, compiler, context) {
  const result = ts.resolveModuleName(name, file, compiler, ts.sys).resolvedModule;
  const target = result ? ownerOf(existsSync(result.resolvedFileName) ? realpathSync(result.resolvedFileName) : resolve(result.resolvedFileName), context) : undefined;
  const relativeTarget = name.startsWith('.') || name.startsWith('/') ? ownerOf(resolve(dirname(file), name), context) : undefined;
  if (name.startsWith('@lorcana/engine-lab') || target?.name === '@lorcana/engine-lab' || relativeTarget?.name === '@lorcana/engine-lab') throw new Error(`Forbidden engine import: ${file} -> ${name}`);
  if (name.startsWith('@tcg/') || name.startsWith('@lorcana/vendor-engine') || target?.scope === 'engine' || relativeTarget?.scope === 'engine') {
    if (!kernelEdge(owner, target ?? context.owners.find(pkg => pkg.name === name), name)) throw new Error(`Forbidden engine import: ${file} -> ${name}`);
  }
}
export function assertBrowserModule(file, context = boundaryContext()) {
  const path = existsSync(file) ? realpathSync(file) : resolve(file);
  if (path.includes('/node_modules/')) return;
  const owner = ownerOf(path, context);
  if (!owner || !['browser', 'public'].includes(owner.scope) && !compiledKernel(path, owner) || /(?:^|\/)\.env(?:\.|$)/.test(path)) fail(file, path);
}
export function assertBrowserImport(file, importer, context = boundaryContext()) {
  const path = existsSync(file) ? realpathSync(file) : resolve(file), owner = ownerOf(path, context);
  if (owner?.scope === 'engine') {
    const from = existsSync(importer) ? realpathSync(importer) : resolve(importer);
    if (!compiledKernel(path, owner) || ownerOf(from, context)?.scope !== 'browser' || !kernelEdge(ownerOf(from, context), owner, '@lorcana/vendor-engine')) fail(importer, file);
  }
}
function inspectAsset(file, name, context) {
  if (/^(?:https?:|data:|#)/i.test(name)) return;
  const asset = decodeURIComponent(name.split(/[?#]/)[0]);
  if (asset.startsWith('/@') || asset.startsWith('//')) fail(file, name);
  const target = asset.startsWith('/') ? resolve(ownerOf(resolve(file), context).path, '.' + asset) : resolve(dirname(file), asset);
  assertBrowserModule(target, context);
  if (ownerOf(target, context) !== ownerOf(resolve(file), context)) fail(file, 'cross-package asset reference: ' + name);
}
function containsImportMeta(node) {
  let found = false;
  function visit(child) {
    if (ts.isMetaProperty(child) && child.keywordToken === ts.SyntaxKind.ImportKeyword) found = true;
    ts.forEachChild(child, visit);
  }
  visit(node);
  return found;
}
export function checkSource(file, context = boundaryContext(), content) {
  const owner = ownerOf(resolve(file), context);
  if (!owner || !['browser', 'public', 'server'].includes(owner.scope)) return;
  const configFile = join(owner.path, 'tsconfig.json');
  const raw = existsSync(configFile) ? ts.readConfigFile(configFile, ts.sys.readFile).config : {};
  const compiler = ts.parseJsonConfigFileContent(raw ?? {}, ts.sys, owner.path).options;
  const bytes = content ?? readFileSync(file, 'utf8');
  if (owner.scope === 'server') {
    const source = ts.createSourceFile(file, bytes, ts.ScriptTarget.Latest, true);
    function visitServer(node) {
      if (ts.isIdentifier(node) && node.text === 'module' && !(ts.isPropertyAccessExpression(node.parent) && node.parent.name === node)) throw new Error(`Forbidden engine import: ${file} -> unchecked CommonJS module loader`);
      if (ts.isIdentifier(node) && node.text === 'require' && !(ts.isPropertyAccessExpression(node.parent) && node.parent.name === node) && !(ts.isCallExpression(node.parent) && node.parent.expression === node)) throw new Error(`Forbidden engine import: ${file} -> aliased module loader`);
      let specifier;
      if ((ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) && node.moduleSpecifier) specifier = node.moduleSpecifier;
      if (ts.isImportTypeNode(node) && ts.isLiteralTypeNode(node.argument)) specifier = node.argument.literal;
      if (ts.isCallExpression(node) && (node.expression.kind === ts.SyntaxKind.ImportKeyword || ts.isIdentifier(node.expression) && node.expression.text === 'require')) specifier = node.arguments[0];
      if (specifier) {
        if (!ts.isStringLiteralLike(specifier)) throw new Error(`Forbidden engine import: ${file} -> nonliteral module specifier`);
        if (['node:module', 'module'].includes(specifier.text)) throw new Error(`Forbidden engine import: ${file} -> unchecked module loader`);
        inspectEngineEdge(file, owner, specifier.text, compiler, context);
      }
      ts.forEachChild(node, visitServer);
    }
    visitServer(source);
    return;
  }
  if (file.endsWith('.html')) {
    const document = parse(bytes);
    function visitHTML(node) {
      for (const attr of node.attrs ?? []) {
        if (['src', 'href', 'poster', 'data', 'action', 'formaction', 'background'].includes(attr.name)) inspectAsset(file, attr.value, context);
        if (attr.name === 'srcset') for (const item of attr.value.split(',')) inspectAsset(file, item.trim().split(/\s+/)[0], context);
        if (attr.name === 'style') checkSource(file + '.css', context, attr.value);
        if (attr.name.startsWith('on')) checkSource(file + '.ts', context, attr.value);
        if (attr.name === 'srcdoc') checkSource(file, context, attr.value);
      }
      const inline = (node.childNodes ?? []).map(child => child.value ?? '').join('');
      if (node.tagName === 'style') checkSource(file + '.css', context, inline);
      if (node.tagName === 'script' && !(node.attrs ?? []).some(attr => attr.name === 'type' && ['application/json', 'application/ld+json', 'importmap'].includes(attr.value))) checkSource(file + '.ts', context, inline);
      for (const child of node.childNodes ?? []) visitHTML(child);
      if (node.content) visitHTML(node.content);
    }
    visitHTML(document);
    return;
  }
  if (file.endsWith('.css')) {
    const css = bytes.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\\([0-9a-f]{1,6})\s?|\\(.)/gi, (_match, hex, char) => hex ? String.fromCodePoint(parseInt(hex, 16)) : char);
    const references = /url\(\s*(?:"([^"]*)"|'([^']*)'|([^)]*))\s*\)|@import\s+(?:"([^"]*)"|'([^']*)')/gi;
    for (const match of css.matchAll(references)) inspectAsset(file, match.slice(1).find(value => value !== undefined).trim(), context);
    parseCSSValues(css).walk(node => {
      if (node.type === 'function' && ['image-set', '-webkit-image-set'].includes(node.value.toLowerCase())) {
        for (const item of node.nodes) if (item.type === 'string') inspectAsset(file, item.value, context);
      }
    });
    return;
  }
  const source = ts.createSourceFile(file, bytes, ts.ScriptTarget.Latest, true);
  function inspect(specifier) {
    if (!specifier || !ts.isStringLiteralLike(specifier)) fail(file, 'nonliteral module specifier');
    const name = specifier.text;
    if (name.startsWith('node:') || builtins.has(name) || forbiddenExternal.test(name)) fail(file, name);
    const targetOwner = context.owners.find(pkg => name === pkg.name || name.startsWith(pkg.name + '/'));
    if (targetOwner && !kernelEdge(owner, targetOwner, name) && (!['browser', 'public'].includes(targetOwner.scope) || (owner.scope === 'public' && targetOwner.scope !== 'public'))) fail(file, name);
    const result = ts.resolveModuleName(name, file, compiler, ts.sys).resolvedModule;
    if (result && !result.resolvedFileName.includes('/node_modules/')) {
      const resolvedOwner = ownerOf(resolve(result.resolvedFileName), context);
      if (resolvedOwner?.scope === 'engine' && !kernelEdge(owner, resolvedOwner, name)) fail(file, name);
      assertBrowserModule(result.resolvedFileName, context);
    }
    if (name.startsWith('.') || name.startsWith('/')) {
      const target = resolve(dirname(file), name);
      assertBrowserModule(target, context);
      if (ownerOf(target, context) !== owner) fail(file, 'cross-package relative import: ' + name);
    } else if (!targetOwner && !result && name.startsWith('@lorcana/')) fail(file, name);
  }
  function visit(node) {
    if ((ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) && node.moduleSpecifier) inspect(node.moduleSpecifier);
    if (ts.isImportTypeNode(node) && ts.isLiteralTypeNode(node.argument)) inspect(node.argument.literal);
    if (ts.isCallExpression(node) && node.expression.kind === ts.SyntaxKind.ImportKeyword) inspect(node.arguments[0]);
    if (ts.isNewExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === 'URL' && node.arguments?.[1] && containsImportMeta(node.arguments[1])) {
      const asset = node.arguments[0];
      if (!asset || !ts.isStringLiteralLike(asset)) fail(file, 'nonliteral asset URL');
      inspectAsset(file, asset.text, context);
    }
    if (ts.isIdentifier(node) && ['require', 'process', '__dirname', '__filename', 'eval'].includes(node.text)) fail(file, node.text);
    ts.forEachChild(node, visit);
  }
  visit(source);
}
export function checkBoundaries(root = repository) {
  const context = boundaryContext(root);
  for (const owner of context.owners) {
    if (!['browser', 'public', 'server'].includes(owner.scope)) continue;
    for (const name of Object.keys({ ...owner.dependencies, ...owner.optionalDependencies, ...owner.peerDependencies })) {
      const pkg = context.owners.find(target => target.name === name);
      if (owner.scope === 'server') {
        inspectEngineEdge(owner.path + '/package.json', owner, name, {}, context);
        continue;
      }
      if ((pkg && !kernelEdge(owner, pkg, name) && (!['browser', 'public'].includes(pkg.scope) || (owner.scope === 'public' && pkg.scope !== 'public'))) || forbiddenExternal.test(name)) fail(owner.path + '/package.json', name);
    }
    function walk(folder) {
      if (!existsSync(folder)) return;
      for (const entry of readdirSync(folder, { withFileTypes: true })) {
        const path = join(folder, entry.name);
        if (entry.isDirectory()) walk(path);
        else if (/\.(?:[cm]?[jt]sx?|css|html)$/.test(path)) checkSource(path, context);
      }
    }
    walk(join(owner.path, 'src'));
    const html = join(owner.path, 'index.html');
    if (existsSync(html)) checkSource(html, context);
  }
  return context;
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const index = process.argv.indexOf('--root');
    checkBoundaries(index === -1 ? repository : resolve(process.argv[index + 1]));
    console.log('PASS browser/public dependency and source import boundaries');
  } catch (error) { console.error(error.message); process.exitCode = 1; }
}
