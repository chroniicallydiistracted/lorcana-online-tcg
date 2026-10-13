import test from 'node:test';
import assert from 'node:assert/strict';
import {createQualificationMatch} from '../../packages/engine-adapter/dist/index.js';
import {createLabMatch} from '../../packages/engine-lab/dist/index.js';

const forbidden=['manualSetLore','manualSetInkDrops','manualMoveCard','manualExertCard','manualReadyCard','manualDryCard','manualSetDamage','manualShuffleDeck','manualPassTurn','forfeitGame','sing','singTogether','unregisteredPlayerMove','constructor','toString'];
const factories=[
 ['server',()=>createQualificationMatch({players:['p1','p2'],startTimestamp:0})],
 ['Lab qualification',()=>createLabMatch({mode:'qualification',fixture:'synthetic',seed:'move-policy',players:['p1','p2']})],
 ['Lab advanced Sandbox',()=>createLabMatch({mode:'advanced-sandbox',fixture:'synthetic',seed:'move-policy',players:['p1','p2']})],
];
for(const [name,create] of factories) {
 test(name+' refuses every debug/server-only/unknown move without winning or changing state',()=>{
  const match=create();
  try {
   for(const [actor,move,input] of [[match.status().choosingFirstPlayer??'p1','chooseWhoGoesFirst',{playerId:'p1'}],['p1','alterHand',{cardsToMulligan:[]}],['p2','alterHand',{cardsToMulligan:[]}]]) {
    assert.equal(match.submit({actor,expectedRevision:match.status().revision,timestamp:0,commandId:'setup-'+actor+move,move,input}).accepted,true);
   }
   const before=match.status();
   for(const move of forbidden) {
    const result=match.submit({actor:'p1',expectedRevision:before.revision,timestamp:0,commandId:'bad-'+move,move,input:{amount:20,winnerId:'p1',playerId:'p2'}});
    assert.deepEqual(result,{accepted:false,code:'MOVE_FORBIDDEN'},move);
    assert.deepEqual(match.status(),before,move+' changed authoritative summary');
   }
   assert.equal(match.submit({actor:'p1',expectedRevision:before.revision,timestamp:0,commandId:'legal-concession',move:'concede',input:{}}).accepted,true);
   assert.equal(match.status().winner,'p2');
  } finally {match.dispose();}
 });
}
