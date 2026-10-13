import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,mkdirSync,writeFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {pathToFileURL} from 'node:url';
import * as identity from '../dist/code-identity.js';

test('private replay identity changes with actual compiled kernel bytes even when source provenance is unchanged',()=>{
  assert.equal(typeof identity.fingerprintExecutableIdentity,'function');
  const root=mkdtempSync(join(tmpdir(),'lorcana-identity-'));
  try{
    const adapter=join(root,'adapter');mkdirSync(adapter);
    writeFileSync(join(adapter,'index.js'),'export const fixture=1;');
    const kernel=join(root,'kernel.js');writeFileSync(kernel,'export const KERNEL_IDENTITY="same";');
    const hash=()=>identity.fingerprintExecutableIdentity(pathToFileURL(adapter+'/'),pathToFileURL(kernel),'same');
    const first=hash();assert.match(first,/^[a-f0-9]{64}$/);assert.equal(hash(),first);
    writeFileSync(kernel,'export const KERNEL_IDENTITY="same";\n// Different compiled artifact.');
    assert.notEqual(hash(),first);
    const second=hash();writeFileSync(join(adapter,'index.js'),'export const fixture=2;');
    assert.notEqual(hash(),second);
  }finally{rmSync(root,{recursive:true,force:true});}
});
test('identity frames file bytes so moving header-like text between files cannot preserve a digest',()=>{
  const root=mkdtempSync(join(tmpdir(),'lorcana-identity-partition-'));
  try{
    const kernel=join(root,'kernel.js');writeFileSync(kernel,'// fixed kernel');
    for(const [name,a,b] of [['first','// x ','// y b.js\0// z\n'],['second','// x b.js\0// y ','// z\n']]){
      mkdirSync(join(root,name));writeFileSync(join(root,name,'a.js'),a);writeFileSync(join(root,name,'b.js'),b);
    }
    const hash=name=>identity.fingerprintExecutableIdentity(pathToFileURL(join(root,name)+'/'),pathToFileURL(kernel),'same');
    assert.notEqual(hash('first'),hash('second'));
  }finally{rmSync(root,{recursive:true,force:true});}
});

test('identity binds the compiled shared player-operation policy',()=>{
 const root=mkdtempSync(join(tmpdir(),'lorcana-policy-identity-'));
 try {
  const adapter=join(root,'adapter');mkdirSync(adapter);writeFileSync(join(adapter,'index.js'),'// fixed');
  const kernel=join(root,'kernel.js'),policy=join(root,'policy.js');writeFileSync(kernel,'// fixed kernel');writeFileSync(policy,'// policy one');
  const hash=()=>identity.fingerprintExecutableIdentity(pathToFileURL(adapter+'/'),pathToFileURL(kernel),'same',pathToFileURL(policy));
  const before=hash();writeFileSync(policy,'// policy two');assert.notEqual(hash(),before);
 }finally{rmSync(root,{recursive:true,force:true});}
});
