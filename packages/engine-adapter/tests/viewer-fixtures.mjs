// Mixed synthetic private data; never a package export or production catalog.
export function source() {
 const players=['p1','p2'],zones={},cardIndex={},cardMeta={},instances={};
 for(const p of players)for(const z of ['deck','hand','play','discard','inkwell'])zones[z+':'+p]=[];
 const add=(id,def,p,z,meta={})=>{zones[z+':'+p].push(id);instances[id]=def;cardIndex[id]={zoneKey:z+':'+p,ownerID:p,controllerID:p};cardMeta[id]=meta;};
 add('private-a','secret-amber','p1','hand');add('private-b','secret-ruby','p2','hand');
 add('deck-a','deck-amber','p1','deck');add('deck-b','deck-ruby','p2','deck');
 add('public-a','public-character','p1','play',{state:'ready',damage:1,isDrying:true});
 add('public-b','public-character','p2','discard');
 add('ink-a','ink-secret-a','p1','inkwell',{state:'exerted',damage:99});add('ink-b','ink-secret-b','p2','inkwell',{state:'ready'});
 return {state:{ctx:{_stateID:4,playerIds:players,status:{turn:1,gameEnded:false,turnOwnerId:'p1'},priority:{holder:'p1'},zones:{private:{zoneCards:zones,cardIndex,cardMeta},reveals:{active:[]}}},G:{lore:{p1:2,p2:3},inkDrops:{p1:0,p2:1},pendingEffects:[{private:'do-not-forward'}],secret:'private-G'}},instances,events:[{seq:9,stateId:4,event:{kind:'MOVE_EXECUTED',move:'playCard',input:{secret:'raw-input'}}},{seq:10,stateId:4,event:{kind:'CARDS_DRAWN',playerId:'p1',cardIds:['private-a'],fromZone:'deck:p1',toZone:'hand:p1'}}],moves:['concede','manualSetLore']};
}
export const context={matchId:'match-a',viewer:{kind:'participant',playerId:'p1'},key:Buffer.alloc(32,7)};
