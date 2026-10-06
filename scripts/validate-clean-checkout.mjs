import { mkdtempSync, mkdirSync, copyFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { spawnSync } from 'node:child_process';
import { inventory, repository } from './documentation-lib.mjs';
// A source-only copy proves installation without local credentials, Git, dependencies or built output.
const copy=mkdtempSync(join(tmpdir(),'lorcana-clean-checkout-'));
const env=Object.fromEntries(Object.entries(process.env).filter(([key])=>!/(?:password|secret|token|credential|private_key)|^(?:PG|POSTGRES|DATABASE)/i.test(key)));
try {
  for(const path of inventory()) { const target=join(copy,path);mkdirSync(dirname(target),{recursive:true});copyFileSync(join(repository,path),target); }
  for(const args of [['install','--frozen-lockfile'],['verify:foundation']]) {
    const result=spawnSync('pnpm',args,{cwd:copy,env,stdio:'inherit'});
    if(result.error||result.status!==0)throw new Error('Clean checkout failed: pnpm '+args.join(' '));
  }
  console.log('PASS clean source-only frozen install and complete foundation validation; no local credentials, Git state or database connection copied.');
}catch(error){console.error(error.message);process.exitCode=1;}
finally{rmSync(copy,{recursive:true,force:true});}
