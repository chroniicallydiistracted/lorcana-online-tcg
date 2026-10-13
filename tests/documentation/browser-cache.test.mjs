import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,mkdirSync,writeFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {inventory,sourceFingerprint} from '../../scripts/documentation-lib.mjs';
test('provider-owned browser screenshots never enter source fingerprints or clean copies',()=>{
 const root=mkdtempSync(join(tmpdir(),'lorcana-browser-cache-'));
 try {
  writeFileSync(join(root,'source.ts'),'export const fixture=1;');const before=sourceFingerprint(root);
  mkdirSync(join(root,'.playwright-mcp'));writeFileSync(join(root,'.playwright-mcp','page.png'),Buffer.from('generated browser session fixture'));
  writeFileSync(join(root,'inkspire-interface-typography.png'),Buffer.from('external reference fixture'));
  assert.equal(sourceFingerprint(root),before);assert.deepEqual(inventory(root),['source.ts']);
  writeFileSync(join(root,'source.ts'),'export const fixture=2;');assert.notEqual(sourceFingerprint(root),before);
 }finally{rmSync(root,{recursive:true,force:true});}
});
