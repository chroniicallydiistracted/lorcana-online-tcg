import {fileURLToPath} from 'node:url';
import {test,expect} from '@playwright/test';
import type {Page} from '@playwright/test';
import type {LiveIntent,ViewerProjection} from '@lorcana/contracts';
import type {createMatchClient} from '@lorcana/match-client';
// Node-side qualification fixtures never enter browser application source.
// @ts-expect-error The test-only JavaScript fixture has no public declaration surface.
import {qualification} from '../../match-service/tests/client-fixtures.mjs';

declare global {interface Window {qualificationClient:ReturnType<typeof createMatchClient>}}
const origin='http://127.0.0.1:5173';
async function view(page:Page):Promise<ViewerProjection> {
 return page.evaluate(()=>{const view=window.qualificationClient.view;if(!view||view.schemaVersion!==2)throw Error('No current committed qualification view');return view;});
}
async function ready(pages:Page[],revision:number) {
 for(const page of pages)await expect.poll(()=>page.evaluate(()=>window.qualificationClient.status==='ready'&&window.qualificationClient.view?.stateVersion),{timeout:15000}).toBe(revision);
}
async function act(pages:Page[],index:number,intent:LiveIntent) {
 const receipt=await pages[index]!.evaluate(intent=>window.qualificationClient.submit(intent),intent);
 expect(receipt.outcome).toBe('accepted');await ready(pages,receipt.stateVersion);
}

test('native browser cookies, WebSockets and reference-only clients reconnect across processes and finish a game',async({browser})=>{
 test.setTimeout(90000);
 const fixture=await qualification(origin),contexts=[],pages:Page[]=[],errors:string[]=[];
 try {
  const hosts=[await fixture.host(),await fixture.host(false)];
  const moduleUrl='/@fs'+fileURLToPath(new URL('../../../packages/match-client/src/index.ts',import.meta.url));
  for(let index=0;index<2;index++) {
   const context=await browser.newContext();contexts.push(context);
   await context.addCookies([{name:'qualification_session',value:fixture.sessions[index].cookie.split('=')[1],url:origin,httpOnly:true,sameSite:'Strict'}]);
   const page=await context.newPage();pages.push(page);page.on('pageerror',e=>errors.push(e.message));await page.goto('/');
   await page.evaluate(async ({moduleUrl,matchId,endpoint})=>{
    const {createMatchClient}=await import(moduleUrl);
    window.qualificationClient=createMatchClient({matchId,endpoint,clientReleaseId:'chromium-qualification',requestTimeoutMs:10000});
    await window.qualificationClient.connect();
   },{moduleUrl,matchId:fixture.id,endpoint:hosts[index].url});
  }
  await ready(pages,0);
  for(let index=0;index<2;index++) {
   expect((await view(pages[index]!)).viewer).toEqual({kind:'participant',playerId:fixture.players[index]});
   expect(await pages[index]!.evaluate(()=>document.cookie)).not.toContain('qualification_session');
  }
  const chooser=fixture.players.indexOf((await view(pages[0]!)).priorityId);
  await act(pages,chooser,{kind:'chooseWhoGoesFirst',input:{playerId:fixture.players[0]}});
  await act(pages,0,{kind:'alterHand',input:{cardsToMulligan:[]}});
  await act(pages,1,{kind:'alterHand',input:{cardsToMulligan:[]}});
  const before=await view(pages[0]!),own=before.players.find(p=>p.playerId===fixture.players[0])!;
  const ref=own.zones.find(z=>z.kind==='hand')!.cards[0]!.ref;
  await act(pages,0,{kind:'putCardIntoInkwell',input:{cardId:ref}});
  await pages[0]!.evaluate(()=>window.qualificationClient.suspend());
  expect(await pages[0]!.evaluate(()=>window.qualificationClient.view)).toBeNull();
  // Replace the endpoint through a fresh client with the same verified browser cookie.
  await pages[0]!.evaluate(async ({moduleUrl,matchId,endpoint})=>{
   window.qualificationClient.close();const {createMatchClient}=await import(moduleUrl);
   window.qualificationClient=createMatchClient({matchId,endpoint,clientReleaseId:'chromium-qualification'});await window.qualificationClient.connect();
  },{moduleUrl,matchId:fixture.id,endpoint:hosts[1].url});
  await ready(pages,4);
  expect(JSON.stringify(await view(pages[0]!))).not.toContain(ref);
  await act(pages,1,{kind:'concede',input:{}});
  expect((await view(pages[0]!)).ended).toBe(true);expect((await view(pages[1]!)).winner).toBe(fixture.players[0]);
  expect(errors).toEqual([]);
 }finally {
  for(const page of pages)await page.evaluate(()=>window.qualificationClient?.close()).catch(()=>{});
  for(const context of contexts)await context.close();await fixture.close();
 }
});
