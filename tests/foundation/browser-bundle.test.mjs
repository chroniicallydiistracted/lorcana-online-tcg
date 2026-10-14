import { test } from 'node:test';
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

test('built browser assets contain no server configuration or bootstrap credential', () => {
  const directory = 'apps/web/dist/assets';
  const secrets = [process.env.POSTGRES_PASSWORD].filter(Boolean);
  if(existsSync('.local/database.json')) secrets.push(...Object.values(JSON.parse(readFileSync('.local/database.json','utf8')).passwords).flatMap(Object.values));
  const files = readdirSync(directory).filter(name => name.endsWith('.js'));
  if (files.length === 0) throw new Error('No built client assets');
  for (const file of files) {
    const bytes = readFileSync(join(directory, file), 'utf8');
    if (/POSTGRES_PASSWORD|DATABASE_URL|AUTH_SECRET|server_version_num|@lorcana\/service-runtime|createReleaseRegistry|assertRetainedPins/.test(bytes)) throw new Error('Forbidden server configuration in browser output');
    if (secrets.some(secret=>bytes.includes(secret))) throw new Error('Private database credential present in browser output');
  }
});

test('shipped browser assets contain no server viewer keys, resolver or match checkpoint',()=>{
 const files=readdirSync('apps/web/dist/assets').filter(x=>x.endsWith('.js'));
 if(!files.length)throw new Error('No built client assets');
 for(const file of files){const raw=readFileSync(join('apps/web/dist/assets',file),'utf8');if(/private-viewer-key-v1|viewer-ref-v1|createViewerProjection|resolveViewerIntent|private-match-checkpoint-v1|Checkpoint restore rejected/.test(raw))throw new Error('Server projection/private checkpoint in client bundle');}
});
