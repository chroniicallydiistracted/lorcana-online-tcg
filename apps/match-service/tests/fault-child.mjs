import pg from 'pg';
import {service} from './fixtures.mjs';
const [mode,id,encoded]=process.argv.slice(2),command=JSON.parse(encoded);
const original=pg.Client.prototype.query;let armed=false;
const pause=()=>{process.send?.({phase:mode});return new Promise(()=>{});};
pg.Client.prototype.query=function(...args) {
 const text=typeof args[0]==='string'?args[0]:args[0]?.text,values=args[1];
 if(text?.startsWith('INSERT INTO match.command_receipts')&&values?.[0]===id&&values?.[2]===command.commandId){armed=true;if(mode==='before')return pause();}
 const result=original.apply(this,args);
 if(mode==='after'&&armed&&text==='COMMIT')return result.then(()=>pause());
 return result;
};
const s=service();
try {const result=await s.submit('p1',command);process.send?.(result);}
catch{process.send?.({error:'child_failed'});process.exitCode=1;}
finally{await s.close();process.disconnect?.();}
