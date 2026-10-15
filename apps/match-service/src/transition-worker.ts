import { parentPort, workerData } from 'node:worker_threads';
import { createPrivateMatch, restorePrivateMatch } from '@lorcana/engine-adapter';
import type { PrivateMatch } from '@lorcana/engine-adapter';
import type { EngineWork } from './engine-executor.ts';
let match:PrivateMatch|undefined;
try {
  const job=workerData as EngineWork;
  if(job.kind==='create')match=createPrivateMatch(job.setup);
  else if(job.kind==='transition'||job.kind==='project')match=restorePrivateMatch(job.checkpoint,job.matchId);
  else throw new Error('Invalid job');
  if(job.kind==='project')parentPort?.postMessage({ok:true,value:match.project(job.viewer)});
  else {
    let result:{accepted:boolean;code:string|null}|null=null;
    if(job.kind==='transition') {
      if(job.references) {
        let input:Record<string,unknown>|undefined;
        try {input=match.resolveIntent(job.command.actor,job.command.move,job.command.input);}catch{result={accepted:false,code:'INVALID_INTENT'};}
        if(input)result=match.submit({...job.command,input});
      }else result=match.submit(job.command);
    }
    parentPort?.postMessage({ok:true,value:{status:match.status(),checkpoint:match.checkpoint(),result}});
  }
}catch{parentPort?.postMessage({ok:false});}
finally{match?.dispose();}
