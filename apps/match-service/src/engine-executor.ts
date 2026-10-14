import { decodeViewerProjection, encodeViewerProjection } from '@lorcana/contracts';
import type { ViewerProjection, Viewer } from '@lorcana/contracts';
import { Worker } from 'node:worker_threads';
import type { PrivateMatchCheckpoint, ServerStatus } from '@lorcana/engine-adapter';
export type EngineJob = {kind:'create';setup:{matchId:string;players:[string,string];startTimestamp:number}} |
  {kind:'transition';matchId:string;checkpoint:PrivateMatchCheckpoint;command:{actor:string;expectedRevision:number;timestamp:number;commandId:string;move:string;input:Record<string,unknown>}};
export type ProjectionJob = {kind:'project';matchId:string;checkpoint:PrivateMatchCheckpoint;viewer:Viewer};
export type EngineWork = EngineJob | ProjectionJob;
export interface EngineResult {status:ServerStatus;checkpoint:PrivateMatchCheckpoint;result:{accepted:boolean;code:string|null}|null}
export interface EngineExecutor {execute(job:EngineJob):Promise<EngineResult>;project(job:ProjectionJob):Promise<ViewerProjection>;close():Promise<void>}
interface Pending {job:EngineWork;resolve:(value:unknown)=>void;reject:(error:Error)=>void;timer?:ReturnType<typeof setTimeout>}
export function createEngineExecutor(options:{concurrency?:number;maxQueue?:number;executionTimeoutMs?:number;queueTimeoutMs?:number}={}):EngineExecutor {
  const concurrency=options.concurrency??2,maxQueue=options.maxQueue??32,executionTimeoutMs=options.executionTimeoutMs??5000,queueTimeoutMs=options.queueTimeoutMs??5000;
  for(const [value,min,max]of [[concurrency,1,8],[maxQueue,0,128],[executionTimeoutMs,1,30000],[queueTimeoutMs,1,30000]] as const)if(!Number.isSafeInteger(value)||value<min||value>max)throw new Error('Invalid engine limits');
  let closed=false,closing:Promise<void>|undefined;
  const queue:Pending[]=[],active=new Map<Worker,()=>Promise<void>>();
  const env=Object.fromEntries(Object.entries(process.env).filter(([key])=>!/(?:password|secret|token|credential|private_key)|^(?:PG|POSTGRES|DATABASE)/i.test(key)));
  const execArgv:string[]=[];
  for(let i=0;i<process.execArgv.length;i++) {
    const arg=process.execArgv[i]!;
    if(arg.startsWith('--conditions='))execArgv.push(arg);
    else if((arg==='--conditions'||arg==='-C')&&process.execArgv[i+1])execArgv.push('--conditions='+process.execArgv[++i]);
  }
  function drain(){if(!closed)while(active.size<concurrency&&queue.length){const next=queue.shift()!;if(next.timer)clearTimeout(next.timer);start(next);}}
  function start(p:Pending) {
    let worker:Worker;
    try {worker=new Worker(new URL(import.meta.url.endsWith('.ts')?'./transition-worker.ts':'./transition-worker.js',import.meta.url),{workerData:p.job,env,execArgv,stdout:true,stderr:true,resourceLimits:{maxOldGenerationSizeMb:64,maxYoungGenerationSizeMb:16,stackSizeMb:4}});}
    catch{p.reject(new Error('engine unavailable'));drain();return;}
    // Upstream console output is private and unqualified: drain, never forward or record it.
    worker.stdout.resume();worker.stderr.resume();
    let done=false,finishing:Promise<void>|undefined;
    const timer=setTimeout(()=>{void finish(undefined,new Error('engine timed out'));},executionTimeoutMs);
    function finish(value?:unknown,error?:Error):Promise<void> {
      if(finishing)return finishing;done=true;clearTimeout(timer);
      finishing=(async()=>{
        try {await worker.terminate();}
        finally {active.delete(worker);if(error)p.reject(error);else if(value)p.resolve(value);else p.reject(new Error('engine unavailable'));drain();}
      })();
      return finishing;
    }
    active.set(worker,()=>finish(undefined,new Error('engine unavailable')));
    worker.once('message',(reply:unknown)=>{
      if(!reply||typeof reply!=='object'||!('ok'in reply)||reply.ok!==true||!('value'in reply)){void finish(undefined,new Error('engine unavailable'));return;}
      void finish(reply.value);
    });
    worker.once('error',()=>{void finish(undefined,new Error('engine unavailable'));});
    worker.once('exit',()=>{if(!done)void finish(undefined,new Error('engine unavailable'));});
  }
  function executeWork(job:EngineWork):Promise<unknown> {
    if(closed)return Promise.reject(new Error('engine unavailable'));
    if(active.size>=concurrency&&queue.length>=maxQueue)return Promise.reject(new Error('engine busy'));
    return new Promise<unknown>((resolve,reject)=>{
      const p:Pending={job,resolve,reject};
      if(active.size<concurrency)start(p);
      else {p.timer=setTimeout(()=>{const i=queue.indexOf(p);if(i>=0){queue.splice(i,1);reject(new Error('engine queue timed out'));}},queueTimeoutMs);queue.push(p);}
    });
  }
  return {
    async execute(job){return await executeWork(job) as EngineResult;},
    async project(job){
      try {return decodeViewerProjection(encodeViewerProjection(await executeWork(job)));}
      catch{throw new Error('engine unavailable');}
    },
    close(){
      if(closing)return closing;closed=true;
      for(const p of queue.splice(0)){if(p.timer)clearTimeout(p.timer);p.reject(new Error('engine unavailable'));}
      closing=Promise.all([...active.values()].map(cancel=>cancel())).then(()=>{});return closing;
    },
  };
}
