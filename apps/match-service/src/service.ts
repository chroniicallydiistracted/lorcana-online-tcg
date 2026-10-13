import { isPlayerMove } from '@lorcana/contracts/player-moves';
import { PERSISTENT_ENGINE_IDENTITY, copyPlayerInput } from '@lorcana/engine-adapter';
import { MatchStoreError } from '@lorcana/db';
import type { MatchRepository, StoredMatch, ReceiptResult } from '@lorcana/db';
import type { ReleaseRegistry } from '@lorcana/service-runtime';
import { createEngineExecutor } from './engine-executor.ts';
import type { EngineExecutor } from './engine-executor.ts';
import { closed, identifier, unsigned, validateSubmission, canonical } from './validation.ts';

export class MatchServiceError extends Error {
  constructor(readonly code:'FORBIDDEN'|'INVALID_REQUEST'|'ID_CONFLICT'|'PIN_UNAVAILABLE'|'UNAVAILABLE'){super('Match service '+code);}
}
/** Internal trusted fixture service. No auth-free HTTP/game endpoint is registered. */
export function createMatchService(options:{repository:MatchRepository;releases:ReleaseRegistry;executor?:EngineExecutor;now?:()=>number}) {
  const repository=options.repository,releases=options.releases,executor=options.executor??createEngineExecutor(),now=options.now??Date.now;
  const active=releases.active;
  if(active.purpose!=='foundation'||active.components.engine.status!=='built'||active.protocol.min!==1||active.protocol.max!==1)throw new Error('Unqualified match release');
  let stopped=false,closing:Promise<void>|undefined;
  function available(){if(stopped)throw new MatchServiceError('UNAVAILABLE');}
  function pins(match:StoredMatch) {
    try {
      const release=releases.resolvePinned(match.releaseId);
      if(match.engineIdentity!==PERSISTENT_ENGINE_IDENTITY||match.rulesVersion!=='synthetic-fixture'||match.catalogRevision!=='synthetic-rule-03'||match.formatRevision!=='synthetic-two-player-v1'||match.protocolVersion!==1||canonical(release)!==canonical(match.releaseManifest))throw new Error();
    }catch{throw new MatchServiceError('PIN_UNAVAILABLE');}
  }
  function failure(error:unknown):never {
    if(error instanceof MatchServiceError)throw error;
    if(error instanceof MatchStoreError)throw new MatchServiceError(error.code);
    throw new MatchServiceError('UNAVAILABLE');
  }
  return {
    async create(value:unknown) {
      available();let id:string,players:[string,string];
      try {
        const row=closed(value,['matchId','players']);id=identifier(row.matchId);
        const copied=copyPlayerInput({players:row.players}).players;
        if(!Array.isArray(copied)||copied.length!==2)throw new Error();players=[identifier(copied[0]),identifier(copied[1])];if(players[0]===players[1])throw new Error();
      }catch{throw new MatchServiceError('INVALID_REQUEST');}
      try {
        const startTimestamp=unsigned(now());
        const result=await executor.execute({kind:'create',setup:{matchId:id,players,startTimestamp}});
        if(result.status.revision!==0||result.status.ended||result.status.rewardEligible!==false)throw new Error();
        const match:StoredMatch={matchId:id,players,releaseId:active.releaseId,releaseManifest:active,engineIdentity:PERSISTENT_ENGINE_IDENTITY,rulesVersion:'synthetic-fixture',catalogRevision:'synthetic-rule-03',formatRevision:'synthetic-two-player-v1',protocolVersion:1,
          stateVersion:0,lastTimestamp:startTimestamp,checkpoint:result.checkpoint,ended:false,winner:null};
        const stored=await repository.create(match);pins(stored);
        return {matchId:stored.matchId,stateVersion:stored.stateVersion,releaseId:stored.releaseId};
      }catch(error){return failure(error);}
    },
    async submit(trustedActor:unknown,value:unknown):Promise<ReceiptResult> {
      available();let command;
      try{command=validateSubmission(trustedActor,value);}catch{throw new MatchServiceError('INVALID_REQUEST');}
      try {
        const prior=await repository.findReceipt(command);if(prior)return {receipt:prior,duplicate:true};
        const before=await repository.load(command.matchId,command.actorId);if(!before)throw new MatchServiceError('FORBIDDEN');pins(before);
        if(command.expectedVersion!==before.stateVersion)return await repository.commit(command,before,null,{outcome:'stale',reason:'stale_state'});
        if(!isPlayerMove(command.move))return await repository.commit(command,before,null,{outcome:'rejected',reason:'forbidden'});
        const timestamp=Math.max(before.lastTimestamp,unsigned(now()));
        const result=await executor.execute({kind:'transition',matchId:before.matchId,checkpoint:before.checkpoint,command:{actor:command.actorId,expectedRevision:command.expectedVersion,timestamp,commandId:command.commandId,move:command.move,input:command.input}});
        if(!result.result?.accepted)return await repository.commit(command,before,null,{outcome:'rejected',reason:'invalid_intent'});
        if(result.status.revision!==before.stateVersion+1||result.status.rewardEligible!==false)throw new Error();
        return await repository.commit(command,before,{stateVersion:result.status.revision,lastTimestamp:timestamp,checkpoint:result.checkpoint,ended:result.status.ended,winner:result.status.winner});
      }catch(error){return failure(error);}
    },
    close(){if(closing)return closing;stopped=true;closing=executor.close().finally(()=>repository.close());return closing;},
  };
}
