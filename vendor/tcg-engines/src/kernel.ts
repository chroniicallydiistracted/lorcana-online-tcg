// Project-owned bridge. Upstream types/state stay inside this experimental kernel.
import { MatchRuntime } from '../upstream/submodules/lorcana/packages/lorcana/lorcana-engine/src/core/runtime/match-runtime.ts';
import { lorcanaRuntimeConfig } from '../upstream/submodules/lorcana/packages/lorcana/lorcana-engine/src/runtime-game/definition.ts';
import { createRecordCardCatalog } from '../upstream/submodules/lorcana/packages/lorcana/lorcana-engine/src/core/runtime/static-resources.ts';
import { createPlayerId } from '../upstream/submodules/lorcana/packages/lorcana/lorcana-engine/src/core/types/branded-utils.ts';

export function createSyntheticKernel(seed: string, playerIds: [string, string]) {
  const definitions = Object.fromEntries(playerIds.map((_, index) => {
    const id = 'synthetic-' + index;
    return [id, { id, canonicalId: 'ci_' + id, slug: id, printings: [], cardType: 'character', name: 'Synthetic character ' + index, cost: 1, inkType: ['amber'], inkable: true, strength: 1, willpower: 2, lore: 1, classifications: ['Storyborn'], set: 'TST', rarity: 'common', abilities: [], i18n: { en: { name: 'Synthetic character ' + index } }, cardNumber: index + 1 }];
  }));
  const owners = Object.fromEntries(playerIds.map(id => [id, Array.from({ length: 12 }, (_, index) => id + '-instance-' + index)]));
  const cardInstances = Object.fromEntries(playerIds.flatMap((id, index) => owners[id].map(instance => [instance, 'synthetic-' + index])));
  const runtime = new MatchRuntime(lorcanaRuntimeConfig, { players: playerIds.map(id => ({ id: createPlayerId(id) })), seed, choosingFirstPlayer: playerIds[0], cardCatalog: createRecordCardCatalog('synthetic-rule-02', definitions), cardsMaps: { owners, cardInstances }, capturePatches: false });
  return {
    status() {
      const end = runtime.getGameEndResult();
      return { revision: runtime.getCurrentStateID(), ended: runtime.hasGameEnded(), winner: end?.winner ?? null };
    },
    submit(actor: string, revision: number, timestamp: number, commandId: string, move: string, input: Record<string, unknown>) {
      // Upstream defaults to judge. Explicit player authority is mandatory.
      const args = move === 'chooseWhoGoesFirst' ? input : { ...input, playerId: actor };
      const result = runtime.processCommand({ commandID: commandId, move, input: { args } }, actor, revision, timestamp, 'player');
      return result.success ? { accepted: true, code: null } : { accepted: false, code: result.errorCode ?? 'REJECTED' };
    },
  };
}
