import test from 'node:test';
import assert from 'node:assert/strict';
import {source,context} from './viewer-fixtures.mjs';
const module=await import('../dist/viewer.js').catch(()=>({}));
const project=(s=source(),c=context)=>{assert.equal(typeof module.createViewerProjection,'function','explicit server projector is missing');return module.createViewerProjection(s,c);};
const bytes=x=>JSON.stringify(x);
const zones=(v,p,z)=>v.snapshot.players.find(x=>x.playerId===p).zones.find(x=>x.kind===z);

test('authorized hand/public fronts and anonymous ink status use fresh closed DTOs',()=>{
 const v=project();assert.equal(v.snapshot.schemaVersion,2);
 assert.equal(zones(v,'p1','hand').cards[0].definitionId,'secret-amber');assert.equal(zones(v,'p2','hand').count,1);assert.deepEqual(zones(v,'p2','hand').cards,[]);
 assert.deepEqual(zones(v,'p1','deck').cards,[]);assert.equal(zones(v,'p1','play').cards[0].definitionId,'public-character');
 const ink=zones(v,'p1','inkwell').cards[0];assert.equal(ink.state,'exerted');assert.equal('definitionId'in ink,false);assert.equal('damage'in ink,false);
 for(const forbidden of ['private-a','private-b','deck-a','deck-b','secret-ruby','deck-ruby','ink-secret','raw-input','private-G','do-not-forward'])assert.equal(bytes(v.snapshot).includes(forbidden),false,forbidden);
});

test('public observer and second player have separate outputs and no role escalation',()=>{
 const pub=project(source(),{...context,viewer:{kind:'public'}});for(const p of ['p1','p2'])assert.deepEqual(zones(pub,p,'hand').cards,[]);assert.deepEqual(pub.snapshot.commands,[]);
 const p2=project(source(),{...context,viewer:{kind:'participant',playerId:'p2'}});assert.equal(zones(p2,'p2','hand').cards[0].definitionId,'secret-ruby');assert.deepEqual(zones(p2,'p1','hand').cards,[]);
 for(const viewer of [{kind:'judge'},{kind:'caster'},{kind:'participant',playerId:'other'},{kind:'public',playerId:'p1'}])assert.throws(()=>project(source(),{...context,viewer}),/Viewer/);
});

test('hidden identities, orders, private payloads and metadata cannot affect any output surface',()=>{
 const a=source(),b=source();
 b.instances['private-b']='different-secret';b.instances['deck-a']='different-deck';b.instances['ink-a']='different-ink';
 b.state.ctx.zones.private.cardMeta['private-b']={damage:88,secret:'hidden-meta'};b.state.G.secret='changed';b.state.G.pendingEffects=[{secret:'other-targets'}];b.events[0].event.input={secret:'changed-log'};
 assert.deepEqual(project(a).snapshot,project(b).snapshot);
 for(let i=0;i<64;i++) {
  const s=source(),ids=s.state.ctx.zones.private.zoneCards['deck:p2'];ids.push('extra-'+i);s.instances['extra-'+i]='secret-'+i;
  const other=globalThis.structuredClone(s);other.state.ctx.zones.private.zoneCards['deck:p2'].reverse();other.instances['deck-b']='changed-'+i;
  assert.deepEqual(project(s).snapshot,project(other).snapshot);
 }
});

test('reveal/look recipients and expiry are explicit, including normally hidden ink fronts',()=>{
 const s=source();s.state.ctx.zones.reveals.active=[{revealID:'private-look',cardIDs:['private-b','ink-a'],visibleTo:['p1'],expiresAtStateID:5}];
 assert.equal(zones(project(s),'p2','hand').cards[0].definitionId,'secret-ruby');assert.equal(zones(project(s),'p1','inkwell').cards[0].definitionId,'ink-secret-a');
 assert.deepEqual(zones(project(s,{...context,viewer:{kind:'public'}}),'p2','hand').cards,[]);
 s.state.ctx._stateID=5;assert.deepEqual(zones(project(s),'p2','hand').cards,[]);
 s.state.ctx.zones.reveals.active[0].visibleTo='all';s.state.ctx.zones.reveals.active[0].expiresAtStateID=6;assert.equal(zones(project(s,{...context,viewer:{kind:'public'}}),'p2','hand').cards[0].definitionId,'secret-ruby');
});

test('face-down play and cards under other cards hide their fronts even from their owner',()=>{
 const s=source();s.state.ctx.zones.private.cardMeta['public-a'].publicFaceState='faceDown';
 const v=project(s);assert.equal('definitionId'in zones(v,'p1','play').cards[0],false);assert.equal(v.snapshot.resources.some(r=>r.definitionId==='public-character'),true,'discard still visible');
 s.state.ctx.zones.private.cardMeta['public-a'].stackParentId='ink-a';assert.equal('definitionId'in zones(project(s),'p1','play').cards[0],false);
});

test('current object references bind match, viewer and revision; anonymous backs do not bind private IDs',()=>{
 const a=project(),ref=zones(a,'p1','hand').cards[0].ref;assert.equal(a.resolve(ref),'private-a');
 for(const c of [{...context,matchId:'match-b'},{...context,viewer:{kind:'participant',playerId:'p2'}}])assert.throws(()=>project(source(),c).resolve(ref),/Reference/);
 const s=source();s.state.ctx._stateID++;assert.throws(()=>project(s).resolve(ref),/Reference/);
 for(const r of ['private-a','private-b','vr_'+ '0'.repeat(64)])assert.throws(()=>a.resolve(r),/Reference/);
 assert.throws(()=>project(source(),{...context,viewer:{kind:'public'}}).resolve(zones(a,'p1','play').cards[0].ref),/Reference/);
 const b=source();b.state.ctx.zones.private.zoneCards['inkwell:p1']=['renamed'];b.state.ctx.zones.private.cardMeta.renamed={state:'exerted'};b.state.ctx.zones.private.cardIndex.renamed={ownerID:'p1',controllerID:'p1'};b.instances.renamed='new-secret';
 assert.deepEqual(zones(a,'p1','inkwell'),zones(project(b),'p1','inkwell'));
});

test('raw event inputs, hidden choices and internal sequence gaps never reach logs or animations',()=>{
 const a=source(),b=source();b.events.unshift({seq:1,stateId:0,event:{kind:'REVEAL_CREATED',cardIds:['private-b'],visibleTo:['p2']}});
 const v=project(a).snapshot;assert.deepEqual(v.logs,project(b).snapshot.logs);assert.deepEqual(v.animations,project(b).snapshot.animations);
 assert.equal(bytes(v.logs).includes('private-a'),false);assert.equal(bytes(v.logs).includes('raw-input'),false);assert.deepEqual(v.logs.map(x=>x.sequence),[0,1]);
 assert.equal(v.commands.includes('manualSetLore'),false);
});

test('face-down under-card default requires an explicit face-up grant',()=>{
 const s=source();s.state.ctx.zones.private.cardMeta['public-a'].stackParentId='public-b';
 assert.equal('definitionId'in zones(project(s),'p1','play').cards[0],false);
 s.state.ctx.zones.private.cardMeta['public-a'].publicFaceState='faceUp';assert.equal(zones(project(s),'p1','play').cards[0].definitionId,'public-character');
});

test('normal ink reveal becomes unlinked public history; independent effect reveal at the same revision survives',()=>{
 const s=source();s.events=[
  {stateId:4,event:{kind:'MOVE_EXECUTED',move:'putCardIntoInkwell',playerId:'p1',input:{args:{cardId:'ink-a'}}}},
  {stateId:4,event:{kind:'REVEAL_CREATED',revealId:'ordinary',cardIds:['ink-a'],visibleTo:'all'}},
  {stateId:4,event:{kind:'REVEAL_CREATED',revealId:'effect',cardIds:['private-b'],visibleTo:['p1']}},
 ];
 s.state.ctx.zones.reveals.active=[{revealID:'ordinary',cardIDs:['ink-a'],visibleTo:'all',expiresAtStateID:7},{revealID:'effect',cardIDs:['private-b'],visibleTo:['p1'],expiresAtStateID:7}];
 const v=project(s).snapshot;
 assert.equal('definitionId'in v.players[0].zones.find(z=>z.kind==='inkwell').cards[0],false);
 assert.equal(v.players[1].zones.find(z=>z.kind==='hand').cards[0].definitionId,'secret-ruby','independent effect reveal was suppressed');
 const reveal=v.logs.find(x=>x.kind==='reveal');assert.deepEqual(reveal.definitionIds,['ink-secret-a']);assert.equal('ref'in reveal,false);assert.equal(bytes(v.logs).includes('ink-a'),false);
 const pub=project(s,{...context,viewer:{kind:'public'}}).snapshot;assert.deepEqual(pub.players[1].zones.find(z=>z.kind==='hand').cards,[]);assert.deepEqual(pub.logs.filter(x=>x.kind==='reveal').map(x=>x.definitionIds),[['ink-secret-a']]);
});

test('revealing a hand/deck front does not disclose its otherwise private state metadata',()=>{
 const a=source(),b=source();
 for(const s of [a,b])s.state.ctx.zones.reveals.active=[{revealID:'front-only',cardIDs:['private-b','deck-b'],visibleTo:'all',expiresAtStateID:6}];
 b.state.ctx.zones.private.cardIndex['private-b'].controllerID='p1';b.state.ctx.zones.private.cardIndex['deck-b'].controllerID='p1';
 b.state.ctx.zones.private.cardMeta['private-b']={state:'exerted',damage:77,isDrying:true};b.state.ctx.zones.private.cardMeta['deck-b']={state:'exerted',damage:99,isDrying:true};
 assert.deepEqual(project(a).snapshot,project(b).snapshot,'card-front permission must not widen to hidden state metadata');
 const pub=project(b,{...context,viewer:{kind:'public'}}).snapshot;
 for(const z of ['hand','deck']){const card=pub.players[1].zones.find(x=>x.kind===z).cards[0];assert.equal(card.state,'ready');assert.equal(card.damage,0);assert.equal(card.drying,false);}
});
