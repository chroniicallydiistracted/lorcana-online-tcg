/** Project patch: per-match source; raw-suite defaults are development-only. */
import type { Draft } from "mutative";
import type { MatchState } from "./types";
import type { RandomAPI } from "./match-runtime.types";

export interface InjectedRandomSource {
  random(index: number): number;
  integer(index: number, bound: number): number;
  identifier(domain: string, index: number): string;
}
const qualificationEnabled = typeof globalThis.Bun !== "undefined";
let qualificationDefaults: { source: (seed: string) => InjectedRandomSource; now: () => number } | undefined;
let qualificationCounter = 0;
export function installQualificationDefaults(value: NonNullable<typeof qualificationDefaults>): void {
  if (!qualificationEnabled || qualificationDefaults) throw new Error("Raw-suite compatibility is test-only");
  qualificationDefaults = value;
}
export function resolveRandomSource(seed: string, source?: InjectedRandomSource): InjectedRandomSource {
  const result = source ?? (qualificationEnabled ? qualificationDefaults?.source(seed) : undefined);
  if (!result || typeof result.random !== "function" || typeof result.integer !== "function" || typeof result.identifier !== "function") throw new Error("Injected random source required");
  return result;
}
export function qualificationRandom(): number {
  if (!qualificationEnabled || !qualificationDefaults) throw new Error("Legacy random helper requires explicit integration");
  return qualificationDefaults.source("raw-suite-legacy").random(++qualificationCounter);
}
export function qualificationIdentifier(): string {
  if (!qualificationEnabled || !qualificationDefaults) throw new Error("Legacy identifier requires explicit integration");
  return qualificationDefaults.source("raw-suite-legacy").identifier("legacy", ++qualificationCounter);
}
export function qualificationClock(): number {
  if (!qualificationEnabled || !qualificationDefaults) throw new Error("Captured clock required");
  return qualificationDefaults.now();
}
export function createRandomAPIForDraft(draft: Draft<MatchState>, explicit?: InjectedRandomSource): RandomAPI {
  const source = resolveRandomSource(draft.ctx.random.seed, explicit);
  function draw<T>(action: (index: number) => T): T {
    const index = draft.ctx.random.draws + 1;
    if (!Number.isSafeInteger(index) || index > 1048576) throw new Error("Random draw limit");
    const value = action(index);
    draft.ctx.random.draws = index;
    return value;
  }
  const random = () => draw(index => {
    const value = source.random(index);
    if (!Number.isFinite(value) || value < 0 || value >= 1) throw new Error("Invalid random float");
    return value;
  });
  const integer = (bound: number) => draw(index => {
    if (!Number.isSafeInteger(bound) || bound < 1 || bound > 2 ** 32) throw new Error("Invalid random bound");
    const value = source.integer(index, bound);
    if (!Number.isInteger(value) || value < 0 || value >= bound) throw new Error("Invalid random integer");
    return value;
  });
  return { random, integer, shuffle: <T>(array: T[]): T[] => {
    const result = [...array];
    for (let i = result.length - 1; i > 0; i--) { const j = integer(i + 1); [result[i], result[j]] = [result[j], result[i]]; }
    return result;
  } };
}
