import pg from 'pg';
import {createClockRepository} from '../../../packages/db/dist/index.js';
import {createReleaseRegistry} from '../../../packages/service-runtime/dist/index.js';
import {createClockHealth} from '../dist/clock-health.js';
import {createMatchService} from '../dist/service.js';
const {manifest,id,phase,leaseMs,maxGapMs}=JSON.parse(process.argv[2]);
const original=pg.Client.prototype.query;let armed=false;
if(phase)pg.Client.prototype.query=function(...args){
 const text=typeof args[0]==='string'?args[0]:args[0]?.text,values=args[1];
 if(text?.startsWith('INSERT INTO match.clock_events')&&values?.[0]===id&&values?.[4]==='accepted'){armed=true;if(phase==='before'){process.send({boundary:phase});return new Promise(()=>{});}}
 const value=original.apply(this,args);if(phase==='after'&&armed&&text==='COMMIT')return value.then(()=>{process.send({boundary:phase});return new Promise(()=>{});});return value;
};
const repository=createClockRepository('test',undefined,{leaseMs,maxHealthyGapMs:maxGapMs});
const service=createMatchService({repository,releases:createReleaseRegistry([manifest],manifest.releaseId),clocks:{repository,health:createClockHealth({maxGapMs}),runner:{enabled:false},recoveryAuthority:async r=>r.auditId==='qualification-auditor'?r.auditId:null}});
let chain=Promise.resolve();
process.on('message',m=>{chain=chain.then(async()=>{
 try{let value;if(m.method==='close'){await service.close();process.send({request:m.request,value:true});process.disconnect();return;}if(m.method==='tick')value=await service.tickClocks();else if(m.method==='clock')value=await service.readClock('p1',{matchId:id});else if(m.method==='submit')value=await service.submit('p1',m.value);else if(m.method==='submitAs')value=await service.submit(m.value.actor,m.value.command);else throw Error();process.send({request:m.request,value:value??null});}
 catch(e){process.send({request:m.request,error:e.code??'child_failed'});}
});});
process.send({ready:true});
