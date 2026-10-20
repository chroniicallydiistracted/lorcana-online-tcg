import {fileURLToPath} from 'node:url';
import {test,expect} from '@playwright/test';
import type {Page} from '@playwright/test';
import type {LiveIntent,PublicViewerProjection,PublicClockProjection} from '@lorcana/contracts';
// This imports only into the Node test runner, never the browser application.
// @ts-expect-error Test-only JavaScript fixture has no product declaration.
import {qualification} from '../../match-service/tests/client-fixtures.mjs';
declare global {interface Window {qualificationClockNotes:string[]}}

const origin='http://127.0.0.1:5173';
const clock={schemaVersion:2,id:'chromium-clock-proof',profile:'qualification',mode:'dynamic',initialReserveMs:30000,reserveCapMs:30000,perActionBonusMs:0,perTurnPassBonusMs:0,resetTimeOnSkipMs:30000,graceMs:0,timeoutLimit:3};
async function ready(pages:Page[],version:number){for(const page of pages)await expect.poll(()=>page.evaluate(()=>window.qualificationClient.status==='ready'&&window.qualificationClient.view?.stateVersion),{timeout:15000}).toBe(version);}
test('Chromium preserves its live connection and pending ID through a busy clock reservation',async({browser})=>{
 test.setTimeout(90000);const f=await qualification(origin,{clock}),context=await browser.newContext(),page=await context.newPage();let releaseClock:(()=>Promise<void>)|undefined;
 const moduleUrl='/@fs'+fileURLToPath(new URL('../../../packages/match-client/src/index.ts',import.meta.url));
 try{
  const host=await f.host(),active=f.client(0,host.url);await active.connect();
  await context.addCookies([{name:'qualification_session',value:f.sessions[1].cookie.split('=')[1],url:origin,httpOnly:true,sameSite:'Strict'}]);await page.goto('/');
  await page.evaluate(async({moduleUrl,matchId,endpoint})=>{
   const {createMatchClient}=await import(moduleUrl);window.qualificationClockNotes=[];
   window.qualificationClient=createMatchClient({matchId,endpoint,clientReleaseId:'chromium-busy-proof',retryBaseMs:20,
    onReceipt:(r:{outcome:string;commandId:string})=>window.qualificationClockNotes.push('receipt:'+r.outcome+':'+r.commandId),
    socketFactory:(url:string)=>{window.qualificationClockNotes.push('socket');return new WebSocket(url);}});await window.qualificationClient.connect();
  },{moduleUrl,matchId:f.id,endpoint:host.url});await ready([page],0);
  if(active.view!.priorityId===f.players[0])await active.submit({kind:'chooseWhoGoesFirst',input:{playerId:f.players[0]}});
  else await page.evaluate(playerId=>window.qualificationClient.submit({kind:'chooseWhoGoesFirst',input:{playerId}}),f.players[0]);
  await ready([page],1);await active.submit({kind:'alterHand',input:{cardsToMulligan:[]}});await ready([page],2);
  await page.evaluate(()=>window.qualificationClient.submit({kind:'alterHand',input:{cardsToMulligan:[]}}));await ready([page],3);
  releaseClock=await f.holdActiveClock('held-browser-action');
  await page.evaluate(()=>{void window.qualificationClient.submit({kind:'concede',input:{}}).then(r=>window.qualificationClockNotes.push('result:'+r.outcome+':'+r.commandId),()=>window.qualificationClockNotes.push('result:error'));});
  await expect.poll(()=>page.evaluate(()=>window.qualificationClockNotes.some(n=>n.startsWith('receipt:rate_limited:')))).toBe(true);
  expect(await page.evaluate(()=>window.qualificationClockNotes.filter(n=>n==='socket').length)).toBe(1);expect(await page.evaluate(()=>window.qualificationClient.view?.stateVersion)).toBe(3);
  if(!releaseClock)throw Error('Missing owned clock release');await releaseClock();releaseClock=undefined;
  await expect.poll(()=>page.evaluate(()=>window.qualificationClockNotes.some(n=>n.startsWith('result:accepted:')))).toBe(true);await ready([page],4);
  const notes=await page.evaluate(()=>window.qualificationClockNotes),busy=notes.find(n=>n.startsWith('receipt:rate_limited:'))!,accepted=notes.find(n=>n.startsWith('result:accepted:'))!;
  expect(accepted.split(':')[2]).toBe(busy.split(':')[2]);expect(notes.filter(n=>n==='socket')).toHaveLength(1);expect(await page.evaluate(()=>window.qualificationClient.view?.winner)).toBe(f.players[0]);
 }finally{await releaseClock?.();await page.evaluate(()=>window.qualificationClient?.close()).catch(()=>{});await context.close();await f.close();}
});
for(const choosingSeat of [0,1])test('Chromium clock estimates pause, clear on suspension and recover a server timeout; chooser seat '+choosingSeat,async({browser})=>{
 test.setTimeout(120000);let f=await qualification(origin,{clock});
 // Both legal randomized opening responsibilities must be exercised. Only owned
 // synthetic fixtures are retried; no seed or engine choice is supplied by a client.
 for(let n=0;n<16&&f.players.indexOf((await f.creator.view(f.players[0],{matchId:f.id})).priorityId)!==choosingSeat;n++){await f.close();f=await qualification(origin,{clock});}
 const contexts=[],pages:Page[]=[],errors:string[]=[];
 const moduleUrl='/@fs'+fileURLToPath(new URL('../../../packages/match-client/src/index.ts',import.meta.url));
 try{
  const hosts=[await f.host(),await f.host(false)];
  for(let i=0;i<2;i++){
   const context=await browser.newContext();contexts.push(context);await context.addCookies([{name:'qualification_session',value:f.sessions[i].cookie.split('=')[1],url:origin,httpOnly:true,sameSite:'Strict'}]);
   const page=await context.newPage();pages.push(page);page.on('pageerror',e=>errors.push(e.message));await page.goto('/');
   await page.evaluate(async({moduleUrl,matchId,endpoint})=>{
    const {createMatchClient}=await import(moduleUrl);
    const notes:string[]=window.qualificationClockNotes=[];
    window.qualificationClient=createMatchClient({matchId,endpoint,clientReleaseId:'chromium-clock-proof',requestTimeoutMs:10000,onStatus:(s:string)=>notes.push('status:'+s),onReceipt:(r:{outcome:string;stateVersion:number})=>notes.push('receipt:'+r.outcome+':'+r.stateVersion),socketFactory:(url:string)=>{const ws=new WebSocket(url);ws.addEventListener('message',event=>{try{const f=JSON.parse(event.data);notes.push([f.type,f.protocolVersion,f.stateVersion,f.sequence,f.type==='snapshot'?f.clock?.status:'',f.clock?.clockRevision,f.outcome,f.reason].join(':'));}catch{notes.push('public-frame-shape-refused');}});return ws;}});
    try{await window.qualificationClient.connect();}catch{throw Error('Clock proof connect failed: '+notes.slice(-12).join(','));}
   },{moduleUrl,matchId:f.id,endpoint:hosts[i].url});
  }
  await ready(pages,0);
  const priority=await pages[0]!.evaluate(()=>window.qualificationClient.view!.priorityId),chooser=f.players.indexOf(priority);
  expect(chooser).toBe(choosingSeat);
  for(const [i,intent]of [[chooser,{kind:'chooseWhoGoesFirst',input:{playerId:f.players[0]}}],[0,{kind:'alterHand',input:{cardsToMulligan:[]}}],[1,{kind:'alterHand',input:{cardsToMulligan:[]}}]] as [number,LiveIntent][]){
   const result=await pages[i]!.evaluate(async intent=>{try{return {receipt:await window.qualificationClient.submit(intent)};}catch{return {diagnostic:window.qualificationClockNotes.slice(-30)}}},intent);
   if(!result.receipt)throw Error('Clock opening '+intent.kind+': '+result.diagnostic?.join(','));
   expect(result.receipt.outcome).toBe('accepted');await ready(pages,result.receipt.stateVersion);
  }
  const before=await pages[1]!.evaluate(()=>window.qualificationClient.view),c=await f.creator.readClock(f.players[0],{matchId:f.id});
  await f.creator.pauseClock({matchId:f.id,expectedStateVersion:3,expectedClockRevision:c.clockRevision,operationId:'browser-pause',auditId:'qualification-auditor'});
  await expect.poll(()=>pages[1]!.evaluate(()=>window.qualificationClient.clock?.status)).toBe('paused');expect(await pages[1]!.evaluate(()=>window.qualificationClient.view)).toEqual(before);
  const estimate=await pages[1]!.evaluate(player=>window.qualificationClient.estimate(player),f.players[0]);
  await pages[1]!.evaluate(()=>new Promise(resolve=>setTimeout(resolve,200)));expect(await pages[1]!.evaluate(player=>window.qualificationClient.estimate(player),f.players[0])).toBe(estimate);
  const paused=await f.creator.readClock(f.players[0],{matchId:f.id});
  await f.creator.resumeClock({matchId:f.id,expectedStateVersion:3,expectedClockRevision:paused.clockRevision,operationId:'browser-resume',auditId:'qualification-auditor',reset:{playerId:f.players[0],remainingMs:1500}});
  await expect.poll(()=>pages[1]!.evaluate(()=>window.qualificationClient.clock?.status)).toBe('running');
  await pages[0]!.evaluate(()=>window.qualificationClient.suspend());expect(await pages[0]!.evaluate(()=>window.qualificationClient.clock)).toBeNull();expect(await pages[0]!.evaluate(player=>window.qualificationClient.estimate(player),f.players[0])).toBeNull();
  await ready([pages[1]!],4);expect(await pages[1]!.evaluate(()=>window.qualificationClient.view!.ended)).toBe(false);
  await pages[0]!.evaluate(async({moduleUrl,matchId,endpoint})=>{window.qualificationClient.close();const {createMatchClient}=await import(moduleUrl);window.qualificationClient=createMatchClient({matchId,endpoint,clientReleaseId:'chromium-clock-proof'});await window.qualificationClient.connect();},{moduleUrl,matchId:f.id,endpoint:hosts[1].url});
  await ready(pages,4);for(const page of pages)expect(await page.evaluate(()=>window.qualificationClient.clock?.activePlayerId)).toBe(f.players[1]);
  expect(errors).toEqual([]);
 }finally{for(const page of pages)await page.evaluate(()=>window.qualificationClient?.close()).catch(()=>{});for(const context of contexts)await context.close();await f.close();}
});

test('Chromium shows either player conceding at all opening steps in timed and untimed games',async({browser})=>{
 test.setTimeout(180000);
 const moduleUrl='/@fs'+fileURLToPath(new URL('../../../packages/match-client/src/index.ts',import.meta.url));
 for(const timed of [false,true])for(const phase of [0,1,2])for(const deciding of [false,true]){
  const f=await qualification(origin,timed?{clock}:{}),contexts=[],pages:Page[]=[];
  try{
   const host=await f.host();
   for(let i=0;i<2;i++){
    const context=await browser.newContext();contexts.push(context);await context.addCookies([{name:'qualification_session',value:f.sessions[i].cookie.split('=')[1],url:origin,httpOnly:true,sameSite:'Strict'}]);const page=await context.newPage();pages.push(page);await page.goto('/');
    await page.evaluate(async({moduleUrl,matchId,endpoint})=>{
     const {createMatchClient,matchResult,timeoutWarning}=await import(moduleUrl);const output=document.createElement('output');output.id='qualification-result';output.setAttribute('aria-live','polite');document.body.append(output);
     const warning=document.createElement('output');warning.id='qualification-warning';document.body.append(warning);
     window.qualificationClient=createMatchClient({matchId,endpoint,clientReleaseId:'chromium-d13',onView:(v:PublicViewerProjection|null)=>{output.textContent=v?.schemaVersion===2?matchResult(v)??'':'';},onClock:(c:PublicClockProjection|null)=>{warning.textContent=c?.schemaVersion===2?c.players.map((p:{playerId:string})=>timeoutWarning(c,p.playerId,window.qualificationClient.view?.turn===0)??'').join(' '):'';}});await window.qualificationClient.connect();
    },{moduleUrl,matchId:f.id,endpoint:host.url});
   }
   await ready(pages,0);
   for(let n=0;n<phase;n++){const actor=await pages[0]!.evaluate(()=>window.qualificationClient.view!.priorityId),i=f.players.indexOf(actor);const intent:LiveIntent=n===0?{kind:'chooseWhoGoesFirst',input:{playerId:f.players[0]}}:{kind:'alterHand',input:{cardsToMulligan:[]}};await pages[i]!.evaluate(intent=>window.qualificationClient.submit(intent),intent);await ready(pages,n+1);}
   const actor=await pages[0]!.evaluate(()=>window.qualificationClient.view!.priorityId),active=f.players.indexOf(actor),loser=deciding?active:1-active;
   expect((await pages[loser]!.evaluate(()=>window.qualificationClient.submit({kind:'concede',input:{}}))).outcome).toBe('accepted');await ready(pages,phase+1);
   for(const page of pages){await expect(page.locator('#qualification-result')).toHaveText('Game ended by concession');expect(await page.evaluate(()=>window.qualificationClient.view!.winner)).toBe(f.players[1-loser]);}
  }finally{for(const page of pages)await page.evaluate(()=>window.qualificationClient?.close()).catch(()=>{});for(const c of contexts)await c.close();await f.close();}
 }
});
test('Chromium displays the last-timeout warning before the server publishes a timeout loss',async({browser})=>{
 test.setTimeout(90000);const f=await qualification(origin,{clock}),context=await browser.newContext(),page=await context.newPage();
 const moduleUrl='/@fs'+fileURLToPath(new URL('../../../packages/match-client/src/index.ts',import.meta.url));
 try{
  const host=await f.host();await context.addCookies([{name:'qualification_session',value:f.sessions[0].cookie.split('=')[1],url:origin,httpOnly:true,sameSite:'Strict'}]);await page.goto('/');
  await page.evaluate(async({moduleUrl,matchId,endpoint})=>{
   const {createMatchClient,timeoutWarning,matchResult}=await import(moduleUrl);const o=document.createElement('output');o.id='qualification-timeout';document.body.append(o);
   const render=()=>{const v=window.qualificationClient.view,c=window.qualificationClient.clock;o.textContent=v?.schemaVersion===2&&v.ended?matchResult(v):c?.schemaVersion===2?c.players.map(p=>timeoutWarning(c,p.playerId,window.qualificationClient.view?.turn===0)??'').join(' '):'';};window.qualificationClient=createMatchClient({matchId,endpoint,clientReleaseId:'chromium-timeout-loss',onClock:render,onView:render});await window.qualificationClient.connect();
  },{moduleUrl,matchId:f.id,endpoint:host.url});await ready([page],0);
  await expect(page.locator('#qualification-timeout')).toContainText('Next timeout loses the game');
  const c=await f.creator.readClock(f.players[0],{matchId:f.id});await f.creator.pauseClock({matchId:f.id,expectedStateVersion:0,expectedClockRevision:c.clockRevision,operationId:'d13-pause',auditId:'qualification-auditor'});const paused=await f.creator.readClock(f.players[0],{matchId:f.id});
  await f.creator.resumeClock({matchId:f.id,expectedStateVersion:0,expectedClockRevision:paused.clockRevision,operationId:'d13-expire',auditId:'qualification-auditor',reset:{playerId:c.activePlayerId,remainingMs:1000}});
  await ready([page],1);await expect.poll(()=>page.evaluate(()=>{const v=window.qualificationClient.view;return v?.schemaVersion===2?v.endReason:null;})).toBe('timeout');expect(await page.evaluate(()=>{const c=window.qualificationClient.clock;return c?.schemaVersion===2?c.timeoutLimit:null;})).toBe(3);
  await expect(page.locator('#qualification-timeout')).toHaveText('Game ended by timeout');expect(await page.evaluate(()=>window.qualificationClient.clock?.players.some(p=>'timeoutCount'in p&&p.timeoutCount===1))).toBe(true);
 }finally{await page.evaluate(()=>window.qualificationClient?.close()).catch(()=>{});await context.close();await f.close();}
});
