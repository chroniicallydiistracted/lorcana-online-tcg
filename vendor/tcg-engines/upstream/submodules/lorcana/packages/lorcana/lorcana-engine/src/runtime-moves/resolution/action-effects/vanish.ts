import type { CardInstanceId, PlayerId } from "#core";
import type { CardPlayedPayload } from "../../../types";
import type { PlayCardExecutionContext, ActionResolutionInput } from "./types";
import { normalizeSelectedTargets, normalizeTargetDescriptor } from "../../../targeting/runtime";
import { recordChosenOperation } from "../../effects/triggered-abilities";

const CHOSEN_SELECTOR_FIELDS = ["target", "character", "location", "from", "to"] as const;

export function chosenOperationGroups(effect: unknown, resolutionInput: ActionResolutionInput): readonly (readonly unknown[])[] {
  const record = effect && typeof effect === "object" ? effect as Record<string, unknown> : null;
  const chosenFields = CHOSEN_SELECTOR_FIELDS.filter(field => normalizeTargetDescriptor(record?.[field])?.selector === "chosen");
  if (!chosenFields.length) return [];
  const flat = normalizeSelectedTargets(resolutionInput.currentTargets ?? resolutionInput.targets) ?? [];
  const slots = resolutionInput.slottedTargets;
  return record?.type === "move-damage" && slots?.kind === "move-damage"
    ? chosenFields.filter(field => field === "from" || field === "to").map(field => field === "from" ? slots.from : slots.to)
    : record?.type === "move-to-location" && slots?.kind === "move-to-location"
      ? chosenFields.filter(field => field === "character" || field === "location").map(field => field === "character" ? slots.subject : slots.location)
      : chosenFields.length === 2 && chosenFields.includes("from") && chosenFields.includes("to")
        ? [[flat[0]], [flat[1]]]
        : [flat];
}

export function recordVanishChosenTargets(args: {
  ctx: PlayCardExecutionContext; effect: unknown; resolutionInput: ActionResolutionInput;
  chooserId: PlayerId; cardPlayed: CardPlayedPayload;
}): void {
  const { ctx, effect, resolutionInput, chooserId, cardPlayed } = args;
  for (const ids of chosenOperationGroups(effect, resolutionInput)) {
    const seen = new Set<string>();
    for (const id of ids) {
      if (typeof id !== "string" || seen.has(id)) continue;
      seen.add(id);
      recordChosenOperation(ctx, cardPlayed, id as CardInstanceId, chooserId);
    }
  }
}

// Compatibility hook for the existing resolver closure. Vanish now waits in
// the bag; this must never perform a second, immediate banishment.
export function resolveRecordedVanishTargets(
  _ctx: PlayCardExecutionContext, _cardPlayed: CardPlayedPayload,
  _resolutionInput: ActionResolutionInput,
): void {}
