import {execFileSync} from 'node:child_process';
for(const selector of ['@fastify/websocket@11.3.3','fastify@5.12.5','ws@8','@types/ws@8']) {
 const v=JSON.parse(execFileSync('pnpm',['view',selector,'--json'],{encoding:'utf8',maxBuffer:8*1024*1024}));
 const all=Array.isArray(v)?v:[v];const last=all.at(-1);
 console.log(JSON.stringify({selector,version:last.version,dependencies:last.dependencies,peerDependencies:last.peerDependencies,engines:last.engines,license:last.license,integrity:last.dist?.integrity}));
}
