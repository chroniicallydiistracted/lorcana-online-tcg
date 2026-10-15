// Project-owned bridge. Upstream types/state stay inside this experimental kernel.
import { MatchRuntime } from '../upstream/submodules/lorcana/packages/lorcana/lorcana-engine/src/core/runtime/match-runtime.ts';
import { lorcanaRuntimeConfig } from '../upstream/submodules/lorcana/packages/lorcana/lorcana-engine/src/runtime-game/definition.ts';
import { createRecordCardCatalog } from '../upstream/submodules/lorcana/packages/lorcana/lorcana-engine/src/core/runtime/static-resources.ts';
import { createPlayerId } from '../upstream/submodules/lorcana/packages/lorcana/lorcana-engine/src/core/types/branded-utils.ts';
import { settleClocks, pauseClock, resumeClock, resetPlayerTimeAfterSkip } from '../upstream/submodules/lorcana/packages/lorcana/lorcana-engine/src/core/runtime/time-control.ts';

declare const __KERNEL_IDENTITY__: string;
export const KERNEL_IDENTITY = __KERNEL_IDENTITY__;
export interface KernelRandomSource {
  random(index: number): number;
  integer(index: number, bound: number): number;
  identifier(domain: string, index: number): string;
}
export interface KernelClockPolicy {initialReserveMs:number;reserveCapMs:number;perActionBonusMs:number;perTurnPassBonusMs:number;resetTimeOnSkipMs:number;graceMs:0}
export interface KernelClockControl {kind:'settle'|'pause'|'resume'|'reset';timestamp:number;reason?:'SERVER_RECOVERY'|'JUDGE_PAUSE';playerId?:string;remainingMs?:number}
export function createSyntheticKernel(options: { randomSource: KernelRandomSource; players: [string, string]; startTimestamp: number; choosingFirstPlayer?: string; clock?:KernelClockPolicy }) {
  const playerIds = options.players, source = options.randomSource;
  let now = options.startTimestamp;
  function identity(domain: string, index: number): string {
    const value = source.identifier(domain, index);
    if (typeof value !== 'string' || !/^[a-f0-9]{64}$/.test(value)) throw new Error('Invalid injected identifier');
    return domain + '-' + value;
  }
  const definitions = Object.fromEntries(playerIds.map((_, index) => {
    const id = 'synthetic-' + index;
    return [id, { id, canonicalId: 'ci_' + id, slug: id, printings: [], cardType: 'character', name: 'Synthetic character ' + index, cost: 1, inkType: ['amber'], inkable: true, strength: 1, willpower: 2, lore: 1, classifications: ['Storyborn'], set: 'TST', rarity: 'common', abilities: [], i18n: { en: { name: 'Synthetic character ' + index } }, cardNumber: index + 1 }];
  }));
  const owners = Object.fromEntries(playerIds.map((id, playerIndex) => [id, Array.from({ length: 12 }, (_, index) => identity('instance', playerIndex * 12 + index))]));
  const cardInstances = Object.fromEntries(playerIds.flatMap((id, index) => owners[id].map(instance => [instance, 'synthetic-' + index])));
  const config=options.clock;
  const runtime = new MatchRuntime({ ...lorcanaRuntimeConfig, ...(config?{timeControl:{mode:'dynamic',config:{initialReserveMs:config.initialReserveMs,reserveCapMs:config.reserveCapMs,perActionBonusMs:config.perActionBonusMs,perTurnPassBonusMs:config.perTurnPassBonusMs,resetTimeOnSkipMs:config.resetTimeOnSkipMs,graceMs:config.graceMs}}}:{}), randomSource: source, now: () => now, rulesetIdentity: KERNEL_IDENTITY }, { players: playerIds.map(id => ({ id: createPlayerId(id) })), seed: 'project-injected', matchID: identity('match', 0), gameID: identity('game', 0), choosingFirstPlayer: options.choosingFirstPlayer, cardCatalog: createRecordCardCatalog('synthetic-rule-03', definitions), cardsMaps: { owners, cardInstances }, capturePatches: false });
  let undo=runtime.createRuntimeSnapshot();
  return {
    status() {
      const end = runtime.getGameEndResult();
      return { revision: runtime.getCurrentStateID(), ended: runtime.hasGameEnded(), winner: end?.winner ?? null, choosingFirstPlayer: runtime.getState().ctx.status.choosingFirstPlayer ?? null };
    },
    // Only the server facade uses this internal snapshot to hash reconstruction.
    // Browser Lab does not export it; this is never a live viewer projection.
    snapshot(): unknown { return JSON.parse(JSON.stringify(runtime.getState())); },
    // Server friend only; Lab's facade/RPC does not expose authoritative inspection.
    inspect(viewerId?: string) { return { state: this.snapshot(), instances: { ...cardInstances }, events: JSON.parse(JSON.stringify(runtime.getPublishedGameEvents())), moves: viewerId ? [...runtime.enumerateMovesForPlayer(viewerId, 'player')] : [] }; },
    restore(snapshot: unknown): void { runtime.restoreState(snapshot as ReturnType<typeof runtime.getState>,undo); },
    clock() {
      const time=runtime.getState().ctx.time;
      if(time.mode==='none')return null;
      return {running:time.running&&!runtime.hasGameEnded(),activePlayerId:time.activePlayerID??null,startedAtMs:time.startedAtMs??null,players:playerIds.map(playerId=>({playerId,remainingMs:time.players[playerId].reserveMsRemaining,timeoutCount:'timeoutCount'in time.players[playerId]?Number(time.players[playerId].timeoutCount):0}))};
    },
    controlClock(control:KernelClockControl) {
      const state=runtime.getState(),time=state.ctx.time;
      if(time.mode!=='dynamic'||runtime.hasGameEnded()||control.timestamp<now)throw new Error('Clock control rejected');
      let next:typeof state;
      if(control.kind==='settle')next=settleClocks(state,control.timestamp);
      else if(control.kind==='pause')next=pauseClock(state,control.reason??'SERVER_RECOVERY',control.timestamp);
      else if(control.kind==='resume'){
        if(time.running||!time.activePlayerID)throw new Error('Clock control rejected');
        next=resumeClock(state,time.activePlayerID,control.timestamp);
      }else {
        if(time.running||!control.playerId||!playerIds.includes(control.playerId)||typeof control.remainingMs!=='number'||!Number.isSafeInteger(control.remainingMs)||control.remainingMs<0||control.remainingMs>time.config.reserveCapMs)throw new Error('Clock control rejected');
        next=resetPlayerTimeAfterSkip(state,control.playerId,control.remainingMs,{incrementTimeoutCount:false});
      }
      undo=runtime.createRuntimeSnapshot();runtime.restoreState(next,undo,{preserveHistory:true});now=control.timestamp;
    },
    submit(actor: string, revision: number, timestamp: number, commandId: string, move: string, input: Record<string, unknown>) {
      // Upstream defaults to judge. Explicit player authority is mandatory.
      const args = move === 'chooseWhoGoesFirst' ? input : { ...input, playerId: actor };
      const command={ commandID: commandId, move, input: { args } };
      undo=runtime.createRuntimeSnapshot();
      const validation=runtime.validateCommand(command,actor,revision,'player',{logInvalid:false});
      if(!validation.valid)return {accepted:false,code:validation.code??'REJECTED'};
      const time=runtime.getState().ctx.time;
      if(options.clock&&time.mode!=='none'&&!time.running)return {accepted:false,code:'CLOCK_PAUSED'};
      now = timestamp;
      const before=runtime.getState();
      const result = runtime.processCommand(command, actor, revision, timestamp, 'player');
      if(!result.success)runtime.restoreState(before,undo);
      return result.success ? { accepted: true, code: null } : { accepted: false, code: result.errorCode ?? 'REJECTED' };
    },
  };
}
