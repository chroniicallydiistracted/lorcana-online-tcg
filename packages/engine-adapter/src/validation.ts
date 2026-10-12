export interface ServerCommand { actor: string; expectedRevision: number; timestamp: number; commandId: string; move: string; input: Record<string, unknown> }
export function closedRecord(value: unknown, keys: string[]): Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value) || Object.getPrototypeOf(value) !== Object.prototype) throw new Error('Invalid closed object');
  for (const key of Reflect.ownKeys(value)) {
    const descriptor = Object.getOwnPropertyDescriptor(value, key);
    if (typeof key !== 'string' || !keys.includes(key) || !descriptor?.enumerable || !Object.hasOwn(descriptor, 'value')) throw new Error('Invalid closed object');
  }
  return value as Record<string, unknown>;
}
export function boundedText(value: unknown, max = 128): string {
  if (typeof value !== 'string' || !value.length || value.length > max || [...value].some(c => c.charCodeAt(0) < 32)) throw new Error('Invalid text');
  return value;
}
export function unsigned(value: unknown): number {
  if (typeof value !== 'number' || !Number.isSafeInteger(value) || value < 0) throw new Error('Invalid integer');
  return value;
}
export function copyInput(value: unknown): Record<string, unknown> {
  let nodes = 0, bytes = 0;
  const seen = new Set<object>(), encoder = new TextEncoder();
  function charge(n: number): void { if ((bytes += n) > 16384) throw new Error('Invalid input limits'); }
  function copy(item: unknown, depth: number): unknown {
    if (++nodes > 2048 || depth > 12) throw new Error('Invalid input limits');
    if (item === null || typeof item === 'boolean' || typeof item === 'string' && item.length <= 4096 || typeof item === 'number' && Number.isFinite(item)) { charge(encoder.encode(JSON.stringify(item)).length); return item; }
    if (!item || typeof item !== 'object' || !Array.isArray(item) && Object.getPrototypeOf(item) !== Object.prototype || seen.has(item)) throw new Error('Invalid JSON input');
    seen.add(item); charge(2);
    if (Array.isArray(item) && item.length > 2048) throw new Error('Invalid input limits');
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
    if (Array.isArray(item) && Object.keys(item).length !== item.length) throw new Error('Invalid sparse array');
    return output;
  }
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('Invalid command input');
  return copy(value, 0) as Record<string, unknown>;
}
export function validateCommand(value: unknown): ServerCommand {
  const row = closedRecord(value, ['actor', 'expectedRevision', 'timestamp', 'commandId', 'move', 'input']);
  return { actor: boundedText(row.actor), expectedRevision: unsigned(row.expectedRevision), timestamp: unsigned(row.timestamp), commandId: boundedText(row.commandId), move: boundedText(row.move, 64), input: copyInput(row.input) };
}
export function validateSetup(value: unknown): { players: [string, string]; startTimestamp: number } {
  const row = closedRecord(value, ['players', 'startTimestamp']);
  const p = copyInput({ players: row.players }).players;
  if (!Array.isArray(p) || p.length !== 2) throw new Error('Invalid players');
  const players: [string, string] = [boundedText(p[0]), boundedText(p[1])];
  if (players[0] === players[1]) throw new Error('Invalid players');
  return { players, startTimestamp: unsigned(row.startTimestamp) };
}
