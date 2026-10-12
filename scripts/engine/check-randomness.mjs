import {readFileSync,readdirSync} from 'node:fs';
import {join,resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import ts from 'typescript';
import {checkVendor} from './vendor.mjs';

export function assertNoAmbientEntropy(code,scope='kernel',filename='entropy.ts') {
  const source=ts.createSourceFile(filename,code,ts.ScriptTarget.Latest,true);
  if(source.parseDiagnostics.length)throw new Error('Invalid entropy source syntax');
  const globals=new Set(['globalThis','self','window','global']);
  const literalKeys=new Map();
  function unwrap(node){while(ts.isParenthesizedExpression(node)||ts.isAsExpression(node)||ts.isTypeAssertionExpression(node)||ts.isNonNullExpression(node))node=node.expression;return node;}
  function isPropertyName(node){const p=node.parent;return p.name===node&&(ts.isPropertyAccessExpression(p)||ts.isPropertySignature(p)||ts.isPropertyAssignment(p)||ts.isMethodSignature(p)||ts.isMethodDeclaration(p));}
  function collectGlobals(node){
    if(ts.isVariableDeclaration(node)&&ts.isIdentifier(node.name)&&node.initializer){const value=unwrap(node.initializer);if(ts.isIdentifier(value)&&globals.has(value.text))globals.add(node.name.text);}
    if(ts.isBinaryExpression(node)&&node.operatorToken.kind===ts.SyntaxKind.EqualsToken&&ts.isIdentifier(node.left)){const value=unwrap(node.right);if(ts.isIdentifier(value)&&globals.has(value.text))globals.add(node.left.text);}
    ts.forEachChild(node,collectGlobals);
  }
  function collectKeys(node){
    if(ts.isVariableDeclaration(node)&&ts.isIdentifier(node.name)&&node.initializer&&ts.isStringLiteralLike(node.initializer)&&ts.isVariableDeclarationList(node.parent)&&node.parent.flags&ts.NodeFlags.Const){literalKeys.set(node.name.text,literalKeys.has(node.name.text)?null:node.initializer.text);}
    ts.forEachChild(node,collectKeys);
  }
  collectKeys(source);
  let size;do{size=globals.size;collectGlobals(source);}while(globals.size!==size);
  function visit(node){
    if(ts.isPropertyAccessExpression(node)||ts.isElementAccessExpression(node)){
      const receiver=unwrap(node.expression);
      if(ts.isIdentifier(receiver)&&globals.has(receiver.text)){
        const key=ts.isElementAccessExpression(node)?ts.isStringLiteralLike(node.argumentExpression)?node.argumentExpression.text:ts.isIdentifier(node.argumentExpression)?literalKeys.get(node.argumentExpression.text):undefined:node.name.text;
        if(key===undefined||key===null||['Math','crypto'].includes(key))throw new Error('Global entropy alias forbidden');
      }
    }
    if(ts.isIdentifier(node)&&(node.text==='randomUUID'||scope==='kernel'&&node.text==='crypto'))throw new Error('Ambient crypto entropy forbidden');
    if(ts.isIdentifier(node)&&node.text==='Math'){
      const parent=node.parent;
      if(ts.isPropertyAccessExpression(parent)&&parent.expression===node){if(parent.name.text==='random')throw new Error('Ambient entropy forbidden');}
      else if(ts.isElementAccessExpression(parent)&&parent.expression===node){if(!ts.isStringLiteralLike(parent.argumentExpression)||parent.argumentExpression.text==='random')throw new Error('Computed entropy forbidden');}
      else if(!(ts.isPropertyAccessExpression(parent)&&parent.name===node))throw new Error('Aliased entropy forbidden');
    }
    if(ts.isPropertyAccessExpression(node)&&node.name.text==='randomUUID'||ts.isElementAccessExpression(node)&&ts.isStringLiteralLike(node.argumentExpression)&&node.argumentExpression.text==='randomUUID')throw new Error('Ambient UUID entropy forbidden');
    const module=ts.isImportDeclaration(node)||ts.isExportDeclaration(node)?node.moduleSpecifier:ts.isCallExpression(node)&&(node.expression.kind===ts.SyntaxKind.ImportKeyword||ts.isIdentifier(node.expression)&&node.expression.text==='require')?node.arguments[0]:undefined;
    if(module&&ts.isStringLiteralLike(module)){
      if((module.text==='seedrandom'||module.text.startsWith('seedrandom/'))&&scope!=='lab')throw new Error('seedrandom outside browser Lab forbidden');
      if(scope==='kernel'&&['crypto','node:crypto','node:module','module'].includes(module.text))throw new Error('Ambient crypto entropy module forbidden');
    }
    if(scope==='kernel'&&ts.isIdentifier(node)&&node.text==='require'&&!isPropertyName(node)&&!(ts.isCallExpression(node.parent)&&node.parent.expression===node))throw new Error('Aliased entropy module loader forbidden');
    ts.forEachChild(node,visit);
  }
  visit(source);
}
export function checkRandomness() {
  const root=fileURLToPath(new URL('../../',import.meta.url));checkVendor();
  const lock=JSON.parse(readFileSync(join(root,'vendor/tcg-engines/upstream.lock.json')));
  for(const row of lock.files.filter(row=>!row.path.endsWith('.test.ts')))assertNoAmbientEntropy(readFileSync(join(root,'vendor/tcg-engines',row.path),'utf8'),'kernel',row.path);
  assertNoAmbientEntropy(readFileSync(join(root,'vendor/tcg-engines/src/kernel.ts'),'utf8'),'kernel');
  for(const file of readdirSync(join(root,'packages/engine-adapter/src')).filter(name=>name.endsWith('.ts')))assertNoAmbientEntropy(readFileSync(join(root,'packages/engine-adapter/src',file),'utf8'),'server');
  for(const file of readdirSync(join(root,'packages/engine-lab/src')).filter(name=>name.endsWith('.ts')))assertNoAmbientEntropy(readFileSync(join(root,'packages/engine-lab/src',file),'utf8'),'lab');
  if(lock.runtime_externals.includes('seedrandom'))throw new Error('seedrandom remains in shared runtime closure');
  const manifest=path=>JSON.parse(readFileSync(join(root,path,'package.json')));
  if(manifest('vendor/tcg-engines').dependencies.seedrandom||manifest('packages/engine-adapter').dependencies['@lorcana/engine-lab'])throw new Error('Server/shared dependency must not enter Lab generator');
  console.log('PASS AST ambient entropy/alias checks and server/browser RNG ownership across '+lock.files.length+' selected source files');
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url))try{checkRandomness();}catch(error){console.error(error.message);process.exitCode=1;}
