import { parentPort, workerData } from 'node:worker_threads';
import { createPrivateMatch, restorePrivateMatch } from '@lorcana/engine-adapter';
import type { PrivateMatch } from '@lorcana/engine-adapter';
import type { EngineWork } from './engine-executor.ts';
let match:PrivateMatch|undefined;
try {
  const job=workerData as EngineWork;
  if(job.kind==='create')match=createPrivateMatch(job.setup);
  else if(['transition','project','clock-inspect','clock-control','timeout'].includes(job.kind)&&'checkpoint'in job)match=restorePrivateMatch(job.checkpoint,job.matchId);
  else throw new Error('Invalid job');
  if(job.kind==='project')parentPort?.postMessage({ok:true,value:match.project(job.viewer)});
  else {
    let result:{accepted:boolean;code:string|null}|null=null;
    if(job.kind==='clock-control'){
      if(!Array.isArray(job.controls)||job.controls.length<1||job.controls.length>3)throw new Error('Invalid clock controls');
      for(const control of job.controls)match.controlClock(control);
    }else if(job.kind==='timeout'){
      const clock=match.clock();if(!clock?.activePlayerId||!clock.running)throw new Error('Clock unavailable');
      result=match.submit({actor:clock.activePlayerId,expectedRevision:match.status().revision,timestamp:job.timestamp,commandId:job.commandId,move:'passTurn',input:{}});
      if(!result.accepted){match.controlClock({kind:'pause',timestamp:job.timestamp,reason:'SERVER_RECOVERY'});result={accepted:false,code:'NO_LEGAL_DEFAULT'};}
    }else if(job.kind==='transition') {
      if(job.references) {
        let input:Record<string,unknown>|undefined;
        try {input=match.resolveIntent(job.command.actor,job.command.move,job.command.input);}catch{result={accepted:false,code:'INVALID_INTENT'};}
        if(input)result=match.submit({...job.command,input});
      }else result=match.submit(job.command);
    }
    parentPort?.postMessage({ok:true,value:{status:match.status(),checkpoint:match.checkpoint(),result,clock:match.clock()}});
  }
}catch{parentPort?.postMessage({ok:false});}
finally{match?.dispose();}
