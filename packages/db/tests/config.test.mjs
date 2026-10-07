import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, rmSync, chmodSync, readFileSync, writeFileSync, symlinkSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { credentials, credentialPath, localEnvironment } from '../src/config.ts';
test('credentials are private, distinct and byte-preserved across provisioning retries',()=>{
 const root=mkdtempSync(join(tmpdir(),'lorcana-db-config-'));
 try {
  const value=credentials(root,true),path=credentialPath(root),before=readFileSync(path);
  assert.equal(new Set(Object.values(value.passwords).flatMap(Object.values)).size,8);
  credentials(root,true);assert.ok(before.equals(readFileSync(path)),'Existing credential bytes must be preserved');
  chmodSync(path,0o644);assert.throws(()=>credentials(root));chmodSync(path,0o600);
  writeFileSync(path,'{}');assert.throws(()=>credentials(root));
  rmSync(path);symlinkSync('/dev/null',path);assert.throws(()=>credentials(root));
 } finally {rmSync(root,{recursive:true,force:true});}
});
test('tooling fails closed outside the private local container network',()=>{
 const before={APP_ENV:process.env.APP_ENV,PGHOST:process.env.PGHOST,PGPORT:process.env.PGPORT};
 try {process.env.APP_ENV='production';assert.throws(localEnvironment);process.env.APP_ENV='local';process.env.PGHOST='localhost';assert.throws(localEnvironment);}
 finally {for(const [key,value] of Object.entries(before)){if(value===undefined)delete process.env[key];else process.env[key]=value;}}
});

test('unsafe parent directory is rejected before generating any credential file',()=>{
 const root=mkdtempSync(join(tmpdir(),'lorcana-db-parent-')),target=mkdtempSync(join(tmpdir(),'lorcana-db-target-'));
 try{symlinkSync(target,join(root,'.local'));assert.throws(()=>credentials(root,true));assert.throws(()=>readFileSync(join(target,'database.json')));}finally{rmSync(root,{recursive:true,force:true});rmSync(target,{recursive:true,force:true});}
});
