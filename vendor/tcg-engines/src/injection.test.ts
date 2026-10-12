import {test,expect} from 'bun:test';
import {initializeMatchState} from '../upstream/submodules/lorcana/packages/lorcana/lorcana-engine/src/core/runtime/match-runtime.init.ts';
import {createTimeOperationsForDraft} from '../upstream/submodules/lorcana/packages/lorcana/lorcana-engine/src/core/runtime/match-runtime.time-apis.ts';
import {createRandomAPIForDraft} from '../upstream/submodules/lorcana/packages/lorcana/lorcana-engine/src/core/runtime/match-runtime.random-apis.ts';
import {createInitialTCGCtx} from '../upstream/submodules/lorcana/packages/lorcana/lorcana-engine/src/core/runtime/types.ts';
import {createRuntimeState} from '../upstream/submodules/lorcana/packages/lorcana/lorcana-engine/src/core/runtime/mutative.ts';
import {createMatchStaticResourcesFromCardsMaps,createRecordCardCatalog} from '../upstream/submodules/lorcana/packages/lorcana/lorcana-engine/src/core/runtime/static-resources.ts';
import {lorcanaRuntimeConfig} from '../upstream/submodules/lorcana/packages/lorcana/lorcana-engine/src/runtime-game/definition.ts';

const source={random:(index:number)=>index%10/10,integer:(index:number,bound:number)=>index%bound,identifier:()=> 'a'.repeat(64)};
test('injected initialization/first chooser and active clock resume ignore ambient wall time',()=>{
  const previous=Date.now;Date.now=()=>{throw new Error('ambient clock forbidden');};
  try{
    const players=[{id:'p1'},{id:'p2'}] as never;
    const resources=createMatchStaticResourcesFromCardsMaps({owners:{p1:[],p2:[]},cardInstances:{}},createRecordCardCatalog('clock-fixture',{}),lorcanaRuntimeConfig.zones);
    const config={...lorcanaRuntimeConfig,now:()=>1234,randomSource:source,rulesetIdentity:'captured-clock-fixture',timeControl:{mode:'chess',config:{initialReserveMs:60000}}} as never;
    const init=()=>initializeMatchState({config,players,seed:'test',matchID:'clock-match',gameID:'clock-game',staticResources:resources});
    const first=init().state, second=init().state;
    expect(JSON.stringify(first)).toBe(JSON.stringify(second));
    expect(first.ctx.status.choosingFirstPlayer).toBe('p2');
    expect(first.ctx.time.startedAtMs).toBe(1234);
    expect(first.ctx.time.players.p1.lastUpdatedAtMs).toBe(1234);
    const resumed=createRuntimeState(first,draft=>createTimeOperationsForDraft(draft,()=>4567).resume());
    expect(resumed.ctx.time.startedAtMs).toBe(4567);
  }finally{Date.now=previous;}
});
test('invalid injected results cannot advance a committed random cursor',()=>{
  const state={G:{} as never,ctx:createInitialTCGCtx({matchID:'invalid-source',gameID:'game',rulesetHash:'rules'})};
  const bad={...source,random:()=>1,integer:()=>-1};
  const api=createRandomAPIForDraft(state as never,bad);
  expect(()=>api.random()).toThrow('Invalid random float');expect(state.ctx.random.draws).toBe(0);
  expect(()=>api.shuffle(['a','b'])).toThrow('Invalid random integer');expect(state.ctx.random.draws).toBe(0);
});
