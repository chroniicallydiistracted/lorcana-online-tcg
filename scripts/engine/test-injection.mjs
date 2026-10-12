import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {findBun} from './bun.mjs';
import {checkVendor} from './vendor.mjs';
checkVendor();
const result=spawnSync(findBun(),['test','--no-install','--timeout','30000','--preload','./src/upstream-compatibility-preload.ts','./src/injection.test.ts'],{cwd:fileURLToPath(new URL('../../vendor/tcg-engines/',import.meta.url)),stdio:'inherit',timeout:60000});
if(result.error||result.signal||result.status!==0)process.exitCode=1;
