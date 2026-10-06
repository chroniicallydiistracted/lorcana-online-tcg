import { checkDocumentation, syncDocumentation, repository } from './documentation-lib.mjs';
const change=process.argv[process.argv.indexOf('--change')+1];
try {
  const result=process.argv.includes('--sync')?syncDocumentation(repository,change):checkDocumentation();
  console.log('PASS documentation coverage, fingerprints, callables, links, changelog and evidence consistency '+JSON.stringify(result));
}catch(error){console.error(error.message);process.exitCode=1;}
