import { createHash } from 'node:crypto';
import { decodeViewerProjection, encodeViewerProjection } from '@lorcana/contracts';
import type { ViewerProjection } from '@lorcana/contracts';
import { isPlayerMove } from '@lorcana/contracts/player-moves';
import { PERSISTENT_ENGINE_IDENTITY, copyPlayerInput } from '@lorcana/engine-adapter';
import { MatchStoreError } from '@lorcana/db';
import type { MatchRepository, StoredMatch, ReceiptResult } from '@lorcana/db';
import type { ReleaseRegistry } from '@lorcana/service-runtime';
import { createEngineExecutor } from './engine-executor.ts';
import { createProjectionCache } from './projection-cache.ts';
import type { EngineExecutor } from './engine-executor.ts';
import { closed, identifier, unsigned, validateSubmission, canonical } from './validation.ts';

export class MatchServiceError extends Error {
  constructor(readonly code:'FORBIDDEN'|'INVALID_REQUEST'|'ID_CONFLICT'|'PIN_UNAVAILABLE'|'UNAVAILABLE'){super('Match service '+code);}
}
/** Internal trusted fixture service. No auth-free HTTP/game endpoint is registered. */
export function createMatchService(options:{repository:MatchRepository;releases:ReleaseRegistry;executor?:EngineExecutor;now?:()=>number}) {
  const repository=options.repository,releases=options.releases,executor=options.executor??createEngineExecutor(),now=options.now??Date.now;
  const active=releases.active;
  if(active.purpose!=='foundation'||active.components.engine.status!=='built'||active.protocol.min<1||active.protocol.max>2)throw new Error('Unqualified match release');
  let stopped=false,closing:Promise<void>|undefined,reads=0;
  const projections=createProjectionCache();
  function available(){if(stopped)throw new MatchServiceError('UNAVAILABLE');}
  function pins(match:StoredMatch) {
    try {
      const release=releases.resolvePinned(match.releaseId);
      if(match.engineIdentity!==PERSISTENT_ENGINE_IDENTITY||match.rulesVersion!=='synthetic-fixture'||match.catalogRevision!=='synthetic-rule-03'||match.formatRevision!=='synthetic-two-player-v1'||![1,2].includes(match.protocolVersion)||match.protocolVersion<release.protocol.min||match.protocolVersion>release.protocol.max||canonical(release)!==canonical(match.releaseManifest))throw new Error();
    }catch{throw new MatchServiceError('PIN_UNAVAILABLE');}
  }
  function failure(error:unknown):never {
    if(error instanceof MatchServiceError)throw error;
    if(error instanceof MatchStoreError)throw new MatchServiceError(error.code);
    throw new MatchServiceError('UNAVAILABLE');
  }
  async function committed(actor:unknown,value:unknown):Promise<StoredMatch> {
    available();let matchId:string,actorId:string;
    try {const request=closed(value,['matchId']);matchId=identifier(request.matchId);actorId=identifier(actor);}
    catch{throw new MatchServiceError('INVALID_REQUEST');}
    const match=await repository.load(matchId,actorId);if(!match)throw new MatchServiceError('FORBIDDEN');pins(match);return match;
  }
  async function read(actor:unknown,value:unknown) {
    available();if(reads>=64)throw new MatchServiceError('UNAVAILABLE');reads++;
    try {
      const match=await committed(actor,value),actorId=identifier(actor);
      // Include archive bytes, outcome and all authority pins, not merely a claimed revision/digest.
      const key=createHash('sha256').update(canonical({...match,releaseManifest:undefined,viewer:actorId,policy:'synthetic-viewer-v1'})).digest('hex');
      const raw=await projections.get(key,async()=>encodeViewerProjection(await executor.project({kind:'project',matchId:match.matchId,checkpoint:match.checkpoint,viewer:{kind:'participant',playerId:actorId}})));
      const projection=decodeViewerProjection(raw);
      if(projection.matchId!==match.matchId||projection.stateVersion!==match.stateVersion||projection.viewer.kind!=='participant'||projection.viewer.playerId!==actorId||projection.ended!==match.ended||projection.winner!==match.winner)throw new Error();
      return {projection,releaseId:match.releaseId,protocolVersion:match.protocolVersion};
    }catch(error){return failure(error);}finally{reads--;}
  }
  async function submit(trustedActor:unknown,value:unknown,references:boolean):Promise<ReceiptResult> {
    available();let command;
    try {
      command=validateSubmission(trustedActor,value);
      if(references){command.intent=canonical({profile:'viewer-references-v2',intent:JSON.parse(command.intent)});if(Buffer.byteLength(command.intent)>16384)throw new Error();command.intentHash=createHash('sha256').update('match-reference-intent-v2\0').update(command.intent).digest('hex');}
    }catch{throw new MatchServiceError('INVALID_REQUEST');}
    try {
      const prior=await repository.findReceipt(command);if(prior)return {receipt:prior,duplicate:true};
      const before=await repository.load(command.matchId,command.actorId);if(!before)throw new MatchServiceError('FORBIDDEN');pins(before);
      if(command.expectedVersion!==before.stateVersion)return await repository.commit(command,before,null,{outcome:'stale',reason:'stale_state'});
      if(!isPlayerMove(command.move))return await repository.commit(command,before,null,{outcome:'rejected',reason:'forbidden'});
      const timestamp=Math.max(before.lastTimestamp,unsigned(now()));
      const result=await executor.execute({kind:'transition',references,matchId:before.matchId,checkpoint:before.checkpoint,command:{actor:command.actorId,expectedRevision:command.expectedVersion,timestamp,commandId:command.commandId,move:command.move,input:command.input}});
      if(!result.result?.accepted)return await repository.commit(command,before,null,{outcome:'rejected',reason:'invalid_intent'});
      if(result.status.revision!==before.stateVersion+1||result.status.rewardEligible!==false)throw new Error();
      return await repository.commit(command,before,{stateVersion:result.status.revision,lastTimestamp:timestamp,checkpoint:result.checkpoint,ended:result.status.ended,winner:result.status.winner});
    }catch(error){return failure(error);}
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
        const match:StoredMatch={matchId:id,players,releaseId:active.releaseId,releaseManifest:active,engineIdentity:PERSISTENT_ENGINE_IDENTITY,rulesVersion:'synthetic-fixture',catalogRevision:'synthetic-rule-03',formatRevision:'synthetic-two-player-v1',protocolVersion:active.protocol.max,
          stateVersion:0,lastTimestamp:startTimestamp,checkpoint:result.checkpoint,ended:false,winner:null};
        const stored=await repository.create(match);pins(stored);
        return {matchId:stored.matchId,stateVersion:stored.stateVersion,releaseId:stored.releaseId};
      }catch(error){return failure(error);}
    },
    read,
    async observe(actor:unknown,value:unknown){
      available();try{const request=closed(value,['matchId']);return await repository.observe(identifier(request.matchId),identifier(actor));}catch(error){return failure(error);}
    },
    async describe(actor:unknown,value:unknown){try{const match=await committed(actor,value);return {matchId:match.matchId,stateVersion:match.stateVersion,releaseId:match.releaseId,protocolVersion:match.protocolVersion};}catch(error){return failure(error);}},
    async view(actor:unknown,value:unknown):Promise<ViewerProjection>{return (await read(actor,value)).projection;},
    /** Trusted server/raw-identity path. Never route this method to an untrusted client. */
    submit(actor:unknown,value:unknown){return submit(actor,value,false);},
    /** Transport boundary: the durable semantic hash binds refs before resolution. */
    submitRefs(actor:unknown,value:unknown){return submit(actor,value,true);},
    close(){if(closing)return closing;stopped=true;projections.close();closing=executor.close().finally(()=>repository.close());return closing;},
  };
}
