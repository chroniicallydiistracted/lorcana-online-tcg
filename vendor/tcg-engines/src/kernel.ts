// Project-owned bridge. Upstream types/state stay inside this experimental kernel.
import { MatchRuntime } from '../upstream/submodules/lorcana/packages/lorcana/lorcana-engine/src/core/runtime/match-runtime.ts';
import { lorcanaRuntimeConfig } from '../upstream/submodules/lorcana/packages/lorcana/lorcana-engine/src/runtime-game/definition.ts';
import { createRecordCardCatalog } from '../upstream/submodules/lorcana/packages/lorcana/lorcana-engine/src/core/runtime/static-resources.ts';
import { createPlayerId } from '../upstream/submodules/lorcana/packages/lorcana/lorcana-engine/src/core/types/branded-utils.ts';

declare const __KERNEL_IDENTITY__: string;
export const KERNEL_IDENTITY = __KERNEL_IDENTITY__;
export interface KernelRandomSource {
  random(index: number): number;
  integer(index: number, bound: number): number;
  identifier(domain: string, index: number): string;
}
export function createSyntheticKernel(options: { randomSource: KernelRandomSource; players: [string, string]; startTimestamp: number; choosingFirstPlayer?: string }) {
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
  const runtime = new MatchRuntime({ ...lorcanaRuntimeConfig, randomSource: source, now: () => now, rulesetIdentity: KERNEL_IDENTITY }, { players: playerIds.map(id => ({ id: createPlayerId(id) })), seed: 'project-injected', matchID: identity('match', 0), gameID: identity('game', 0), choosingFirstPlayer: options.choosingFirstPlayer, cardCatalog: createRecordCardCatalog('synthetic-rule-03', definitions), cardsMaps: { owners, cardInstances }, capturePatches: false });
  return {
    status() {
      const end = runtime.getGameEndResult();
      return { revision: runtime.getCurrentStateID(), ended: runtime.hasGameEnded(), winner: end?.winner ?? null, choosingFirstPlayer: runtime.getState().ctx.status.choosingFirstPlayer ?? null };
    },
    // Only the server facade uses this internal snapshot to hash reconstruction.
    // Browser Lab does not export it; this is never a live viewer projection.
    snapshot(): unknown { return JSON.parse(JSON.stringify(runtime.getState())); },
    restore(snapshot: unknown): void { runtime.loadState(snapshot as ReturnType<typeof runtime.getState>); },
    submit(actor: string, revision: number, timestamp: number, commandId: string, move: string, input: Record<string, unknown>) {
      // Upstream defaults to judge. Explicit player authority is mandatory.
      const args = move === 'chooseWhoGoesFirst' ? input : { ...input, playerId: actor };
      now = timestamp;
      const result = runtime.processCommand({ commandID: commandId, move, input: { args } }, actor, revision, timestamp, 'player');
      return result.success ? { accepted: true, code: null } : { accepted: false, code: result.errorCode ?? 'REJECTED' };
    },
  };
}
