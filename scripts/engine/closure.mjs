import { existsSync, readFileSync, lstatSync, readdirSync, realpathSync } from 'node:fs';
import { resolve, dirname, relative, join } from 'node:path';
import { createHash } from 'node:crypto';
import ts from 'typescript';

function safeFile(root, path) {
  const file = resolve(root, path);
  if (!file.startsWith(resolve(root) + '/') || path.split('/').includes('..') && !existsSync(file)) throw new Error('Unsafe source path: ' + path);
  let parent = file;
  while (!existsSync(parent) && parent !== dirname(parent)) parent = dirname(parent);
  const physicalRoot = realpathSync(root), physicalParent = realpathSync(parent);
  if (physicalParent !== physicalRoot && !physicalParent.startsWith(physicalRoot + '/') || existsSync(file) && lstatSync(file).isSymbolicLink()) throw new Error('Unsafe source symlink: ' + path);
  return file;
}
export function collectClosure(root, seeds, aliases, allowedExternals, overrides = {}) {
  const files = new Set(), externals = new Set();
  function find(path) {
    const base = safeFile(root, path);
    const candidates = [base, base.replace(/\.js$/, '.ts'), base + '.ts', join(base, 'index.ts'), base + '.json'];
    const file = candidates.find(candidate => existsSync(candidate) && lstatSync(candidate).isFile());
    if (!file || lstatSync(file).isSymbolicLink()) throw new Error('Missing module: ' + path);
    return file;
  }
  function visit(path) {
    const file = find(path), name = relative(root, file).replaceAll('\\', '/');
    if (files.has(name)) return;
    files.add(name);
    if (name.endsWith('.json')) return;
    const source = ts.createSourceFile(file, overrides[name] ?? readFileSync(file, 'utf8'), ts.ScriptTarget.Latest, true);
    function module(specifier) {
      if (!specifier || !ts.isStringLiteralLike(specifier)) throw new Error('Nonliteral module: ' + name);
      const target = specifier.text;
      if (target.startsWith('.')) visit(relative(root, resolve(dirname(file), target)));
      else if (aliases[target]) visit(aliases[target]);
      else if (allowedExternals.some(entry => target === entry || target.startsWith(entry + '/'))) externals.add(target);
      else throw new Error('Unapproved external: ' + name + ' -> ' + target);
    }
    function walk(node) {
      if ((ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) && node.moduleSpecifier) module(node.moduleSpecifier);
      if (ts.isImportTypeNode(node) && ts.isLiteralTypeNode(node.argument)) module(node.argument.literal);
      if (ts.isCallExpression(node) && (node.expression.kind === ts.SyntaxKind.ImportKeyword || ts.isIdentifier(node.expression) && node.expression.text === 'require')) module(node.arguments[0]);
      ts.forEachChild(node, walk);
    }
    walk(source);
  }
  for (const seed of seeds) visit(seed);
  return { files: [...files].sort(), externals: [...externals].sort() };
}
export const sha256 = value => createHash('sha256').update(value).digest('hex');
export const gitBlob = value => createHash('sha1').update(Buffer.concat([Buffer.from('blob ' + value.length + '\0'), value])).digest('hex');
export function verifyVendor(root, lock) {
  if (lock.schema_version !== 1 || !/^[a-f0-9]{40}$/.test(lock.revision)) throw new Error('Invalid upstream identity');
  const listed = new Set();
  for (const row of lock.files) {
    if (listed.has(row.path) || !row.path.startsWith('upstream/')) throw new Error('Invalid source membership');
    const file = safeFile(root, row.path);
    if (!existsSync(file) || !lstatSync(file).isFile() || lstatSync(file).isSymbolicLink()) throw new Error('Missing source: ' + row.path);
    const bytes = readFileSync(file);
    if (bytes.length !== row.bytes || sha256(bytes) !== row.sha256) throw new Error('Source bytes/hash differ: ' + row.path);
    const patches = lock.patches.filter(patch => patch.path === row.path);
    if (row.sha256 !== row.upstream_sha256) {
      if (patches.length !== 1) throw new Error('Unlisted patch: ' + row.path);
      const patch = patches[0], original = readFileSync(safeFile(root, patch.original_path));
      if (sha256(original) !== row.upstream_sha256 || gitBlob(original) !== row.git_blob || !patch.before || original.toString().split(patch.before).length !== 2 || original.toString().replace(patch.before, patch.after) !== bytes.toString()) throw new Error('Patch does not reproduce original/revised bytes: ' + row.path);
    } else if (patches.length || gitBlob(bytes) !== row.git_blob) throw new Error('Unexpected patch/blob: ' + row.path);
    listed.add(row.path);
  }
  for (const patch of lock.patches) if (!listed.has(patch.path)) throw new Error('Patch target missing');
  function walk(folder) {
    for (const entry of readdirSync(folder, { withFileTypes: true })) {
      const file = join(folder, entry.name);
      if (entry.isSymbolicLink()) throw new Error('Unsafe source symlink');
      if (entry.isDirectory()) walk(file);
      else if (!listed.has(relative(root, file).replaceAll('\\', '/'))) throw new Error('Extra source: ' + file);
    }
  }
  walk(safeFile(root, 'upstream'));
  return { revision: lock.revision, files: listed.size, patches: lock.patches.length };
}
