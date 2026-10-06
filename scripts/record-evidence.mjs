import { recordCommand } from './evidence-lib.mjs';
import { repository } from './documentation-lib.mjs';
const args=process.argv.slice(2),separator=args.indexOf('--');
const option=name=>args[args.indexOf(name)+1];
try {
  if(separator<0)throw new Error('Use --id RUN-YYYYMMDD-NNN --category container -- command arguments');
  const result=await recordCommand({root:repository,id:option('--id'),category:option('--category'),command:args.slice(separator+1),summary:args.includes('--summary')?option('--summary'):'Recorded command outcome'});
  console.log(`${result.result.toUpperCase()} ${result.id} exit=${result.exit_code} evidence=docs/validation/runs/${result.id}.json`);
  process.exitCode=result.result==='passed'?0:(result.exit_code||1);
}catch(error){console.error(error.message);process.exitCode=1;}
