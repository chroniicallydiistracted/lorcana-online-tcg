import { createHmac } from 'node:crypto';

export const RANDOM_VERSION = 'hmac-sha256-indexed-v1';
export interface RandomOutcome { kind: string; index: number; value: number | string; bound?: number; attempts?: number }
export interface RecordedRandomSource {
  random(index: number): number;
  integer(index: number, bound: number): number;
  identifier(domain: string, index: number): string;
  takeOutcomes(): RandomOutcome[];
  dispose(): void;
}
function indexValue(value: number): void {
  if (!Number.isSafeInteger(value) || value < 0 || value > 1_048_576) throw new Error('Random index invalid');
}
export function boundedIntegerFromWord(word: (attempt: number) => number, bound: number): { value: number; attempts: number } {
  if (!Number.isSafeInteger(bound) || bound < 1 || bound > 2 ** 32) throw new Error('Random bound invalid');
  const limit = Math.floor(2 ** 32 / bound) * bound;
  for (let attempt = 0; attempt < 128; attempt++) {
    const value = word(attempt);
    if (!Number.isInteger(value) || value < 0 || value >= 2 ** 32) throw new Error('Random word invalid');
    if (value < limit) return { value: value % bound, attempts: attempt + 1 };
  }
  throw new Error('Random rejection limit');
}
/** Server-private indexed PRF. The caller's seed is copied and never exported. */
export function createRandomSource(seed: Uint8Array, context: string): RecordedRandomSource {
  if (!(seed instanceof Uint8Array) || seed.length !== 32 || typeof context !== 'string' || !context.length || context.length > 256) throw new Error('Random seed/context invalid');
  const key = Buffer.from(seed);
  let disposed = false, outcomes: RandomOutcome[] = [];
  function active(): void { if (disposed) throw new Error('Random source disposed'); }
  function block(kind: string, index: number, retry = 0): Buffer {
    active(); indexValue(index);
    return createHmac('sha256', key).update(JSON.stringify(['lorcana-rng', RANDOM_VERSION, context, kind, index, retry])).digest();
  }
  function record(outcome: RandomOutcome): void {
    if (outcomes.length >= 4096) throw new Error('Random outcome limit');
    outcomes.push(outcome);
  }
  return Object.freeze({
    random(index: number): number {
      const bytes = block('float', index);
      const value = (bytes.readUInt32BE(0) * 2 ** 21 + (bytes.readUInt32BE(4) >>> 11)) / 2 ** 53;
      record({ kind: 'float', index, value }); return value;
    },
    integer(index: number, bound: number): number {
      active(); indexValue(index);
      const result = boundedIntegerFromWord(attempt => block('integer:' + bound, index, attempt).readUInt32BE(0), bound);
      record({ kind: 'integer', index, bound, ...result }); return result.value;
    },
    identifier(domain: string, index: number): string {
      if (typeof domain !== 'string' || !/^[a-z][a-z0-9-]{0,31}$/.test(domain)) throw new Error('Random identifier domain invalid');
      const value = block('identifier:' + domain, index).toString('hex');
      record({ kind: 'identifier:' + domain, index, value }); return value;
    },
    takeOutcomes(): RandomOutcome[] { active(); const result = outcomes.map(row => ({ ...row })); outcomes = []; return result; },
    dispose(): void { disposed = true; key.fill(0); outcomes = []; },
  });
}
