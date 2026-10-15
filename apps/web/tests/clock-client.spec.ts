import {fileURLToPath} from 'node:url';
import {test,expect} from '@playwright/test';
import type {Page} from '@playwright/test';
import type {LiveIntent} from '@lorcana/contracts';
// This imports only into the Node test runner, never the browser application.
// @ts-expect-error Test-only JavaScript fixture has no product declaration.
import {qualification} from '../../match-service/tests/client-fixtures.mjs';
declare global {interface Window {qualificationClockNotes:string[]}}

const origin='http://127.0.0.1:5173';
const clock={schemaVersion:1,id:'chromium-clock-proof',profile:'qualification',mode:'dynamic',initialReserveMs:30000,reserveCapMs:30000,perActionBonusMs:0,perTurnPassBonusMs:0,resetTimeOnSkipMs:30000,graceMs:0};
async function ready(pages:Page[],version:number){for(const page of pages)await expect.poll(()=>page.evaluate(()=>window.qualificationClient.status==='ready'&&window.qualificationClient.view?.stateVersion),{timeout:15000}).toBe(version);}
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
