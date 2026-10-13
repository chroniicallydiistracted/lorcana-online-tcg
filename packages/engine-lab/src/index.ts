import { createSyntheticKernel, type SyntheticKernel } from '@lorcana/vendor-engine';
import seedrandom from 'seedrandom';

export const ENGINE_QUALIFICATION = Object.freeze({
  revision: '6de59de1c203827edc1bc6faa1bc6184cd126a5f',
  rules230EffectiveOn: '2026-10-16', set14PrereleaseOn: '2026-10-16', set14GeneralReleaseOn: '2026-10-23',
  rulesCertification: 'pending_RULE-04', randomQualification: 'browser_lab_noncompetitive', viewerProjection: 'pending_PLAY-02',
  catalog: 'synthetic-only', rewards: false,
});
export interface LabStatus { mode: 'advanced-sandbox' | 'qualification'; revision: number; ended: boolean; winner: string | null; rewardEligible: false }
export interface LabCommand { actor: string; expectedRevision: number; timestamp: number; commandId: string; move: string; input: Record<string, unknown> }
export interface LabMatch { status(): LabStatus; submit(command: unknown): { accepted: boolean; code: string | null }; dispose(): void }

function record(value: unknown, keys: string[]): Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value) || Object.getPrototypeOf(value) !== Object.prototype || Object.keys(value).some(key => !keys.includes(key))) throw new Error('Invalid closed object');
  if (Reflect.ownKeys(value).some(key => typeof key !== 'string' || !keys.includes(key) || !Object.getOwnPropertyDescriptor(value, key)?.enumerable || !Object.hasOwn(Object.getOwnPropertyDescriptor(value, key) ?? {}, 'value'))) throw new Error('Invalid closed object');
  return value as Record<string, unknown>;
}
function text(value: unknown, field: string, max = 128): string {
  if (typeof value !== 'string' || !value.length || value.length > max || [...value].some(char => char.charCodeAt(0) < 32)) throw new Error('Invalid ' + field);
  return value;
}
function integer(value: unknown, field: string): number {
  if (typeof value !== 'number' || !Number.isSafeInteger(value) || value < 0) throw new Error('Invalid ' + field);
  return value;
}
function copyInput(value: unknown): Record<string, unknown> {
  let nodes = 0, bytes = 0;
  const visited = new Set<object>(), encoder = new TextEncoder();
  function charge(size: number): void { bytes += size; if (bytes > 16384) throw new Error('Input exceeds qualification limits'); }
  function copy(item: unknown, depth: number): unknown {
    if (++nodes > 2048 || depth > 12) throw new Error('Input exceeds qualification limits');
    if (item === null || typeof item === 'boolean' || typeof item === 'string' && item.length <= 4096 || typeof item === 'number' && Number.isFinite(item)) { charge(encoder.encode(JSON.stringify(item)).length); return item; }
    if (!item || typeof item !== 'object' || !Array.isArray(item) && Object.getPrototypeOf(item) !== Object.prototype) throw new Error('Invalid JSON input');
    if (visited.has(item)) throw new Error('Invalid JSON input');
    visited.add(item); charge(2);
    if (Array.isArray(item) && item.length > 2048) throw new Error('Input exceeds qualification limits');
    const output: unknown[] | Record<string, unknown> = Array.isArray(item) ? [] : {};
    for (const key of Reflect.ownKeys(item)) {
      if (Array.isArray(item) && key === 'length') continue;
      if (typeof key !== 'string' || key.length > 128 || ['__proto__', 'constructor', 'prototype'].includes(key)) throw new Error('Invalid input key');
      if (Array.isArray(item) && (!/^(0|[1-9][0-9]*)$/.test(key) || Number(key) >= item.length)) throw new Error('Invalid JSON array');
      const descriptor = Object.getOwnPropertyDescriptor(item, key);
      if (!descriptor?.enumerable || !Object.hasOwn(descriptor, 'value')) throw new Error('Invalid JSON input');
      charge(encoder.encode(JSON.stringify(key)).length + 2);
      (output as Record<string, unknown>)[key] = copy(descriptor.value, depth + 1);
    }
    if (Array.isArray(item) && Object.keys(item).length !== item.length) throw new Error('Invalid JSON sparse array');
    return output;
  }
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('Invalid command input');
  return copy(value, 0) as Record<string, unknown>;
}
export function createLabMatch(options: unknown): LabMatch {
  const value = record(options, ['mode', 'fixture', 'seed', 'players']);
  if (value.mode !== 'advanced-sandbox' && value.mode !== 'qualification') throw new Error('Unqualified mode');
  if (value.fixture !== 'synthetic') throw new Error('Unqualified catalog');
  if (!Array.isArray(value.players) || value.players.length !== 2 || value.players[0] === value.players[1]) throw new Error('Invalid players');
  const players: [string, string] = [text(value.players[0], 'players'), text(value.players[1], 'players')];
  const mode = value.mode;
  const seed = text(value.seed, 'seed', 256);
  const random = (index: number) => seedrandom(`${seed}:${index}`)();
  let kernel: SyntheticKernel | undefined = createSyntheticKernel({ players, startTimestamp: 0, choosingFirstPlayer: players[0], randomSource: {
    random,
    integer: (index, bound) => Math.floor(random(index) * bound),
    identifier(domain, index) { const draw = seedrandom(`${seed}:identifier:${domain}:${index}`); return Array.from({ length: 32 }, () => Math.floor(draw() * 256).toString(16).padStart(2, '0')).join(''); },
  } });
  function active(): SyntheticKernel { if (!kernel) throw new Error('Match disposed'); return kernel; }
  return Object.freeze({
    status: (): LabStatus => { const { revision, ended, winner } = active().status(); return { mode, revision, ended, winner, rewardEligible: false }; },
    submit(command: unknown) {
      const engine = active(), status = engine.status(), input = record(command, ['actor', 'expectedRevision', 'timestamp', 'commandId', 'move', 'input']);
      const actor = text(input.actor, 'actor'), revision = integer(input.expectedRevision, 'revision');
      const timestamp = integer(input.timestamp, 'timestamp'), commandId = text(input.commandId, 'commandId'), move = text(input.move, 'move', 64), args = copyInput(input.input);
      if (!players.includes(actor)) return { accepted: false, code: 'INVALID_ACTOR' };
      if (revision !== status.revision) return { accepted: false, code: 'STALE_REVISION' };
      if (status.ended) return { accepted: false, code: 'MATCH_ENDED' };
      return engine.submit(actor, revision, timestamp, commandId, move, args);
    },
    dispose() { kernel = undefined; },
  });
}
export function assessEngineAdmission(request: unknown): { allowed: boolean; reasons: string[]; rules230Phase: string; set14Phase: string } {
  const value = record(request, ['asOf', 'mode', 'rulesVersion', 'sets', 'rewards', 'hiddenState']);
  const date = text(value.asOf, 'date', 10);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !Number.isFinite(Date.parse(date)) || new Date(date).toISOString().slice(0, 10) !== date) throw new Error('Invalid date');
  const mode = text(value.mode, 'mode'), version = text(value.rulesVersion, 'rulesVersion');
  if (!Array.isArray(value.sets) || !value.sets.length || value.sets.length > 32 || value.sets.some(set => typeof set !== 'string') || typeof value.rewards !== 'boolean' || typeof value.hiddenState !== 'boolean') throw new Error('Invalid admission request');
  const sets = copyInput({ sets: value.sets }).sets as string[];
  const reasons = [];
  if (!['advanced-sandbox', 'qualification'].includes(mode)) reasons.push('MODE_UNQUALIFIED');
  if (version !== 'synthetic-fixture') reasons.push('RULES_UNCERTIFIED');
  if (sets.some(set => set !== 'TST')) reasons.push('CATALOG_UNQUALIFIED');
  if (value.rewards) reasons.push('REWARDS_UNQUALIFIED');
  if (value.hiddenState) reasons.push('VIEWER_PROJECTION_PENDING');
  return { allowed: !reasons.length, reasons, rules230Phase: date < ENGINE_QUALIFICATION.rules230EffectiveOn ? 'scheduled' : 'effective', set14Phase: date < ENGINE_QUALIFICATION.set14PrereleaseOn ? 'scheduled' : date < ENGINE_QUALIFICATION.set14GeneralReleaseOn ? 'prerelease' : 'general_release' };
}
