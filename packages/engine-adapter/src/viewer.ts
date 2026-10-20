import { createHmac } from 'node:crypto';
import { encodeViewerProjection, decodeViewerProjection, type ViewerProjection, type Viewer } from '@lorcana/contracts';
import { isPlayerMove } from '@lorcana/contracts/player-moves';
import { closedRecord } from './validation.js';

type Row = Record<string, unknown>;
function row(value:unknown):Row { if(!value||typeof value!=='object'||Array.isArray(value))throw new Error('Viewer unavailable');return value as Row; }
function list(value:unknown):unknown[] {if(!Array.isArray(value)||value.length>4096)throw new Error('Viewer unavailable');return value;}
function count(value:unknown):number {if(!Number.isSafeInteger(value)||Number(value)<0)throw new Error('Viewer unavailable');return Number(value);}
function id(value:unknown):string {if(typeof value!=='string'||! /^[a-zA-Z0-9][a-zA-Z0-9._-]{0,79}$/.test(value))throw new Error('Viewer unavailable');return value;}
export interface PrivateViewSource { state:unknown; instances:Record<string,string>; events:unknown[]; moves:string[];endReason?:ViewerProjection['endReason'] }
export interface ViewerContext { matchId:string; viewer:Viewer; key:Uint8Array;stateVersion?:number }
/** Server friend only. Never export authoritative source, reference map or key to a viewer. */
export function createViewerProjection(source:PrivateViewSource,context:ViewerContext):{snapshot:ViewerProjection;resolve:(ref:unknown)=>string} {
  try {
    const state=row(source.state),ctx=row(state.ctx),G=row(state.G),status=row(ctx.status),zones=row(ctx.zones),privateZones=row(zones.private),zoneCards=row(privateZones.zoneCards),meta=row(privateZones.cardMeta),index=row(privateZones.cardIndex);
    const playerIds=list(ctx.playerIds).map(id),nativeVersion=count(ctx._stateID),version=context.stateVersion===undefined?nativeVersion:count(context.stateVersion),matchId=id(context.matchId);
    if(playerIds.length!==2||playerIds[0]===playerIds[1]||context.key.byteLength!==32)throw new Error();
    const candidate=row(context.viewer);let viewer:Viewer;
    if(candidate.kind==='participant') {closedRecord(candidate,['kind','playerId']);const p=id(candidate.playerId);if(!playerIds.includes(p))throw new Error();viewer={kind:'participant',playerId:p};}
    else if(candidate.kind==='public') {closedRecord(candidate,['kind']);viewer={kind:'public'};}
    else throw new Error();
    const viewerId=viewer.kind==='participant'?viewer.playerId:'public',refs=new Map<string,string>(),resources=new Set<string>();
    function token(kind:string,identity:string):string {return 'vr_'+createHmac('sha256',context.key).update(JSON.stringify(['viewer-ref-v1',matchId,viewer.kind,viewerId,version,kind,identity])).digest('hex');}
    const visibleReveals=new Set<string>();
    const normalInkTargets=new Map<unknown,string>(),normalInkReveals=new Set<unknown>(),matchedStates=new Set<unknown>();
    for(const value of source.events){const envelope=row(value),event=row(envelope.event);if(event.kind==='MOVE_EXECUTED'&&event.move==='putCardIntoInkwell'){
      const input=row(event.input),args=row(input.args);if(typeof args.cardId!=='string')throw new Error();normalInkTargets.set(envelope.stateId,args.cardId);
    }}
    // Upstream records generic SYSTEM reveal causes. Match the first single-card reveal
    // of the actual inked card, rather than suppressing other windows in that resolution.
    for(const value of source.events){const envelope=row(value),event=row(envelope.event),target=normalInkTargets.get(envelope.stateId);
      if(target&&!matchedStates.has(envelope.stateId)&&event.kind==='REVEAL_CREATED'&&event.visibleTo==='all'&&Array.isArray(event.cardIds)&&event.cardIds.length===1&&event.cardIds[0]===target){normalInkReveals.add(event.revealId);matchedStates.add(envelope.stateId);}
    }
    for(const value of list(row(zones.reveals).active)) {
      const reveal=row(value),expires=reveal.expiresAtStateID;
      if(expires!==undefined&&count(expires)<=nativeVersion)continue;
      if(normalInkReveals.has(reveal.revealID))continue;
      if(reveal.visibleTo!=='all'&&(viewer.kind!=='participant'||!list(reveal.visibleTo).includes(viewer.playerId)))continue;
      for(const card of list(reveal.cardIDs))if(typeof card==='string')visibleReveals.add(card);
    }
    const players=playerIds.map(playerId=>({playerId,lore:count(row(G.lore)[playerId]),inkDrops:count(row(G.inkDrops??{})[playerId]??0),zones:(['hand','deck','play','discard','inkwell'] as const).map(kind=>{
      const key=kind+':'+playerId,cards=list(zoneCards[key]),exposed:ViewerProjection['players'][number]['zones'][number]['cards']=[];
      // Hidden, unordered hands/decks expose no physical slots. Reveals expose only authorized cards.
      const selected=cards.filter(card=>{if(typeof card!=='string')throw new Error();return kind==='play'||kind==='discard'||kind==='inkwell'||(kind==='hand'&&viewer.kind==='participant'&&playerId===viewer.playerId)||visibleReveals.has(card);});
      // Anonymous backs have public ready/exerted slots, independent of private IDs/order.
      if(kind==='inkwell')selected.sort((a,b)=>String(row(meta[String(a)]??{}).state??'ready').localeCompare(String(row(meta[String(b)]??{}).state??'ready')));
      for(const [slot,value] of selected.entries()) {
        const cardId=String(value),m=row(meta[cardId]??{}),cardIndex=row(index[cardId]??{}),revealed=visibleReveals.has(cardId);
        const front=revealed||((kind==='play'||kind==='discard'||kind==='hand')&&m.publicFaceState!=='faceDown'&&(!m.stackParentId||m.publicFaceState==='faceUp'));
        const reference=token(front?'object':'back',front?cardId:key+':'+slot);
        if(viewer.kind==='participant')refs.set(reference,cardId);
        const publicState=(kind==='play'&&!m.stackParentId)||kind==='inkwell';
        const cardState=publicState&&m.state==='exerted'?'exerted':'ready';
        if(front) {
          const definitionId=id(source.instances[cardId]);resources.add(definitionId);
          const ownerId=id(cardIndex.ownerID??playerId),controllerId=kind==='play'&&!m.stackParentId?id(cardIndex.controllerID??ownerId):ownerId;
          if(!playerIds.includes(ownerId)||!playerIds.includes(controllerId))throw new Error();
          exposed.push({ref:reference,definitionId,ownerId,controllerId,state:cardState,damage:kind==='play'&&!m.stackParentId?count(m.damage??0):0,drying:kind==='play'&&!m.stackParentId&&m.isDrying===true});
        }else exposed.push({ref:reference,state:cardState});
      }
      // Private ordered zones must not reveal positions of looked-at cards.
      if(kind==='deck'||kind==='hand')exposed.sort((a,b)=>a.ref.localeCompare(b.ref));
      return {kind,count:cards.length,cards:exposed};
    })}));
    const logs:ViewerProjection['logs']=[];
    for(const value of list(source.events)) {
      const event=row(row(value).event),actor=typeof event.playerId==='string'&&playerIds.includes(event.playerId)?event.playerId:null;
      if(event.kind==='REVEAL_CREATED') {
        if(event.visibleTo!=='all'&&(viewer.kind!=='participant'||!list(event.visibleTo).includes(viewer.playerId)))continue;
        const definitionIds=list(event.cardIds).map(cardId=>id(source.instances[String(cardId)])).sort();
        for(const definitionId of definitionIds)resources.add(definitionId);
        // Historical authorized knowledge never carries an object/slot/reference link.
        logs.push({sequence:logs.length,kind:'reveal',actorId:actor,definitionIds});continue;
      }
      let kind:Exclude<ViewerProjection['logs'][number]['kind'],'reveal'>|undefined,n=0,move:string|null=null;
      if(event.kind==='MOVE_EXECUTED'&&isPlayerMove(event.move)){kind='action';move=event.move;}
      else if(event.kind==='CARDS_DRAWN'||event.kind==='CARDS_MILLED'){kind=event.kind==='CARDS_DRAWN'?'draw':'mill';n=list(event.cardIds).length;}
      else if(event.kind==='MULLIGAN_PERFORMED'){kind='mulligan';n=list(event.returnedCardIds??[]).length;}
      else if(event.kind==='TURN_STARTED')kind='turn';
      else if(event.kind==='GAME_ENDED')kind='end';
      if(kind)logs.push({sequence:logs.length,kind,actorId:actor,count:n,move});
    }
    const player=(value:unknown)=>typeof value==='string'&&playerIds.includes(value)?value:null;
    const snapshot=decodeViewerProjection(encodeViewerProjection({schemaVersion:2,scope:'synthetic',matchId,stateVersion:version,viewer,ended:status.gameEnded===true,endReason:status.gameEnded===true?(source.endReason??(status.reason==='timeout'?'timeout':playerIds.some(id=>status.reason===`${id} conceded`)?'concession':'normal_win')):null,winner:player(status.winner),turn:count(status.turn),turnOwnerId:player(status.turnOwnerId),priorityId:player(row(ctx.priority).holder),players,resources:[...resources].sort().map(definitionId=>({definitionId})),commands:viewer.kind==='participant'?source.moves.filter(isPlayerMove):[],logs,animations:logs.map(x=>'definitionIds'in x?{...x,definitionIds:[...x.definitionIds]}:{...x})}));
    return {snapshot,resolve(reference:unknown):string {if(typeof reference!=='string'||!refs.has(reference))throw new Error('Reference rejected');return refs.get(reference)!;}};
  }catch{throw new Error('Viewer unavailable');}
}
