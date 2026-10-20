import test from 'node:test';
import assert from 'node:assert/strict';
import * as contracts from '../src/index.ts';
const minimal={schemaVersion:2,scope:'synthetic',matchId:'m',stateVersion:0,viewer:{kind:'public'},ended:false,endReason:null,winner:null,turn:0,turnOwnerId:null,priorityId:null,players:['a','b'].map(playerId=>({playerId,lore:0,inkDrops:0,zones:['hand','deck','play','discard','inkwell'].map(kind=>({kind,count:0,cards:[]}))})),resources:[],commands:[],logs:[],animations:[]};

test('viewer snapshot codec refuses private fields, malformed refs, accessors and oversize bytes',()=>{
 assert.deepEqual(contracts.decodeViewerProjection(contracts.encodeViewerProjection(minimal)),minimal);
 let calls=0;
 for(const bad of [{...minimal,seed:'private'},{...minimal,ctx:{}},{...minimal,viewer:{kind:'judge'}},{...minimal,viewer:{kind:'participant',playerId:'a',private:true}},{...minimal,resources:[{definitionId:'public',instances:{private:'public'}}]},{...minimal,get hidden(){calls++;return 'secret';}},{...minimal,stateVersion:-1}])assert.throws(()=>contracts.encodeViewerProjection(bad),/Invalid viewer/);
 assert.equal(calls,0);
 assert.throws(()=>contracts.decodeViewerProjection('x'.repeat(contracts.MAX_VIEWER_BYTES+1)),/Invalid/);
 assert.throws(()=>contracts.decodeViewerProjection('null'),/Invalid/);
});

test('every viewer delivery surface has a closed browser codec and refuses secret-bearing diagnostics',()=>{
 assert.equal(typeof contracts.encodeViewerSurface,'function','separate output-path codec is missing');
 for(const surface of ['snapshot','resources','logs','animations','export']) {
  const raw=contracts.encodeViewerSurface(minimal,surface),decoded=contracts.decodeViewerSurface(raw);assert.equal(decoded.surface,surface);assert.equal(raw.includes('seed'),false);
  assert.throws(()=>contracts.decodeViewerSurface(JSON.stringify({...decoded,secret:'bad'})),/Invalid/);
 }
 assert.throws(()=>contracts.encodeViewerSurface(minimal,'private-replay'),/Invalid/);
 assert.equal(typeof contracts.encodeMatchDiagnostic,'function','fixed operational log codec is missing');
 const diag=contracts.encodeMatchDiagnostic({event:'projection',outcome:'ok',stateVersion:0});assert.equal(diag.includes('projection'),true);
 for(const bad of [{event:'projection',outcome:'ok',stateVersion:0,error:'private'},{event:'projection',outcome:'my-secret',stateVersion:0},{event:'projection',outcome:'ok',stateVersion:0,input:{}}])assert.throws(()=>contracts.encodeMatchDiagnostic(bad),/Invalid/);
});
