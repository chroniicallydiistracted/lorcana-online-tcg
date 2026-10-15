// Read-only public GitHub metadata. No authenticated log/artifact download or code execution.
import {writeFileSync} from 'node:fs';
const root='https://api.github.com/repos/chroniicallydiistracted/lorcana-online-tcg/actions/runs/';
async function get(path) {
 const response=await fetch(root+path,{headers:{Accept:'application/vnd.github+json','X-GitHub-Api-Version':'2022-11-28'},signal:globalThis.AbortSignal.timeout(15000)});
 if(!response.ok)throw new Error('Public GitHub metadata unavailable: '+response.status);
 return response.json();
}
const observations=[];
for(const [id,attempt]of [['38681078184',1],['38682066872',1],['38682066872',2]]) {
 const began=new Date().toISOString(),value=await get(id+'/attempts/'+attempt),jobs=await get(id+'/attempts/'+attempt+'/jobs?per_page=100');
 if(value.id!==Number(id)||value.run_attempt!==attempt||!Array.isArray(jobs.jobs)||jobs.total_count!==jobs.jobs.length)throw new Error('Unexpected hosted metadata');
 observations.push({id,attempt,url:value.html_url,observed_started_at:began,observed_finished_at:new Date().toISOString(),head_sha:value.head_sha,head_branch:value.head_branch,status:value.status,conclusion:value.conclusion,run_started_at:value.run_started_at,updated_at:value.updated_at,jobs:jobs.jobs.map(j=>({id:j.id,name:j.name,status:j.status,conclusion:j.conclusion,started_at:j.started_at,completed_at:j.completed_at,steps:j.steps.map(s=>({number:s.number,name:s.name,status:s.status,conclusion:s.conclusion,started_at:s.started_at,completed_at:s.completed_at}))}))});
}
if(observations[0].head_sha!==observations[1].head_sha||observations[1].head_sha!==observations[2].head_sha||!observations[0].head_sha.startsWith('775994a')||observations[0].conclusion!=='success'||observations[1].conclusion!=='failure'||observations[2].conclusion!=='success')throw new Error('Hosted results differ from Director handoff');
writeFileSync('docs/validation/play-03-hosted-baseline.json',JSON.stringify({schema_version:1,recorded_at:new Date().toISOString(),actor:'Codex public GitHub metadata inspection',scope:'PLAY-03 merged source only; job/step metadata, no downloaded logs/artifacts or fresh PLAY-04 qualification',observations},null,2)+'\n',{flag:'wx'});
for(const o of observations)console.log('OBSERVED '+o.id+' attempt'+o.attempt+' '+o.head_sha+' '+o.conclusion+'; '+o.jobs.length+' job(s).');
