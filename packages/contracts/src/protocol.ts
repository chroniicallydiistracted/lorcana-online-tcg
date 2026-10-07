import { Type } from 'typebox';
import type { Static, TSchema } from 'typebox';
import { Value } from 'typebox/value';

export const MAX_FRAME_BYTES = 16_384;
export const FOUNDATION_PROTOCOL = Object.freeze({ min: 1, max: 1 });
export const IdSchema = Type.String({ minLength: 1, maxLength: 80, pattern: '^[a-zA-Z0-9][a-zA-Z0-9._-]*$' });
const RevisionSchema = Type.Integer({ minimum: 1, maximum: 65_535 });
const CounterSchema = Type.Integer({ minimum: 0, maximum: Number.MAX_SAFE_INTEGER });
const RetrySchema = Type.Integer({ minimum: 1, maximum: 300_000 });
export const ProtocolRangeSchema = Type.Object({ min: RevisionSchema, max: RevisionSchema }, { additionalProperties: false });
export type ProtocolRange = Static<typeof ProtocolRangeSchema>;

function dataOnly(value: unknown, depth = 0, seen = new Set<object>()): boolean {
  if (depth > 64 || seen.size > 10_000) return false;
  if (value === null || typeof value !== 'object') return ['string', 'number', 'boolean'].includes(typeof value) || value === null;
  if (seen.has(value)) return false;
  seen.add(value);
  const prototype = Object.getPrototypeOf(value);
  if (prototype !== (Array.isArray(value) ? Array.prototype : Object.prototype) && prototype !== null) return false;
  for (const key of Reflect.ownKeys(value)) {
    if (Array.isArray(value) && key === 'length') continue;
    const descriptor = Object.getOwnPropertyDescriptor(value, key);
    if (typeof key !== 'string' || !descriptor?.enumerable || !('value' in descriptor) || !dataOnly(descriptor.value, depth + 1, seen)) return false;
  }
  return true;
}
export function readContract<T extends TSchema>(schema: T, value: unknown, label: string): Static<T> {
  try { if (dataOnly(value) && Value.Check(schema, value)) return value; } catch { /* Input must not escape through validator errors. */ }
  throw new Error('Invalid ' + label);
}
export function parseProtocolRange(value: unknown): ProtocolRange {
  const range = readContract(ProtocolRangeSchema, value, 'protocol range');
  if (range.min > range.max || range.max - range.min > 1) throw new Error('Invalid protocol range');
  return range;
}
export function negotiateProtocol(client: unknown, server: unknown): number | null {
  const offer = parseProtocolRange(client), supported = parseProtocolRange(server);
  const selected = Math.min(offer.max, supported.max);
  return selected >= Math.max(offer.min, supported.min) ? selected : null;
}
export const HelloRequestSchema = Type.Object({ type: Type.Literal('hello'), requestId: IdSchema, clientReleaseId: IdSchema, supportedProtocol: ProtocolRangeSchema }, { additionalProperties: false });
export type HelloRequest = Static<typeof HelloRequestSchema>;
const helloFields = { type: Type.Literal('hello_result'), requestId: IdSchema, serverReleaseId: IdSchema };
export const HelloResponseSchema = Type.Union([
  Type.Object({ ...helloFields, outcome: Type.Literal('accepted'), protocolVersion: RevisionSchema }, { additionalProperties: false }),
  Type.Object({ ...helloFields, outcome: Type.Literal('unsupported_version'), supportedProtocol: ProtocolRangeSchema, action: Type.Literal('upgrade_required') }, { additionalProperties: false }),
  Type.Object({ ...helloFields, outcome: Type.Literal('maintenance'), retryAfterMs: RetrySchema }, { additionalProperties: false }),
]);
export type HelloResponse = Static<typeof HelloResponseSchema>;
export function parseHelloRequest(value: unknown): HelloRequest {
  const request = readContract(HelloRequestSchema, value, 'hello request');
  parseProtocolRange(request.supportedProtocol);
  return request;
}
export function parseHelloResponse(value: unknown, original: HelloRequest): HelloResponse {
  const request = parseHelloRequest(original), response = readContract(HelloResponseSchema, value, 'hello response');
  if (response.requestId !== request.requestId) throw new Error('Invalid hello response');
  if (response.outcome === 'accepted' && (response.protocolVersion < request.supportedProtocol.min || response.protocolVersion > request.supportedProtocol.max)) throw new Error('Invalid hello response');
  if (response.outcome === 'unsupported_version' && negotiateProtocol(request.supportedProtocol, response.supportedProtocol) !== null) throw new Error('Invalid hello response');
  return response;
}

// Revision1 defines foundation recovery/control shapes, not implemented game handlers.
export const CommandSchema = Type.Object({ type: Type.Literal('command'), protocolVersion: Type.Literal(1), matchId: IdSchema, commandId: IdSchema, correlationId: IdSchema, expectedStateVersion: CounterSchema, intent: Type.Union([
  Type.Object({ kind: Type.Literal('request_snapshot') }, { additionalProperties: false }),
  Type.Object({ kind: Type.Literal('concede') }, { additionalProperties: false }),
]) }, { additionalProperties: false });
export const ClientFrameSchema = Type.Union([HelloRequestSchema, CommandSchema]);
export type ClientFrame = Static<typeof ClientFrameSchema>;
export function decodeClientFrame(raw: string): ClientFrame {
  try {
    if (typeof raw !== 'string' || raw.length > MAX_FRAME_BYTES || new globalThis.TextEncoder().encode(raw).byteLength > MAX_FRAME_BYTES) throw new Error();
    const frame = readContract(ClientFrameSchema, JSON.parse(raw), 'client frame');
    if (frame.type === 'hello') parseHelloRequest(frame);
    return frame;
  } catch { throw new Error('Invalid client frame'); }
}

const envelope = { protocolVersion: Type.Literal(1), matchId: IdSchema, sequence: CounterSchema, stateVersion: CounterSchema, correlationId: IdSchema, releaseId: IdSchema };
export const SnapshotSchema = Type.Object({ ...envelope, type: Type.Literal('snapshot'), projectionType: Type.Literal('viewer'), payload: Type.Object({ scope: Type.Literal('synthetic'), viewerId: IdSchema, zones: Type.Array(Type.Object({ zoneId: IdSchema, count: Type.Integer({ minimum: 0, maximum: 1000 }) }, { additionalProperties: false }), { minItems: 1, maxItems: 64 }) }, { additionalProperties: false }) }, { additionalProperties: false });
const receipt = { ...envelope, type: Type.Literal('receipt'), commandId: IdSchema };
export const ReceiptSchema = Type.Union([
  Type.Object({ ...receipt, outcome: Type.Literal('accepted') }, { additionalProperties: false }),
  Type.Object({ ...receipt, outcome: Type.Literal('rejected'), reason: Type.Union([Type.Literal('invalid_intent'), Type.Literal('forbidden')]) }, { additionalProperties: false }),
  Type.Object({ ...receipt, outcome: Type.Literal('stale'), reason: Type.Literal('stale_state') }, { additionalProperties: false }),
  Type.Object({ ...receipt, outcome: Type.Literal('rate_limited'), reason: Type.Literal('rate_limit'), retryAfterMs: RetrySchema }, { additionalProperties: false }),
  Type.Object({ ...receipt, outcome: Type.Literal('auth_expired'), reason: Type.Literal('auth_expired') }, { additionalProperties: false }),
  Type.Object({ ...receipt, outcome: Type.Literal('maintenance'), reason: Type.Literal('maintenance'), retryAfterMs: RetrySchema }, { additionalProperties: false }),
  Type.Object({ ...receipt, outcome: Type.Literal('unsupported_version'), reason: Type.Literal('unsupported_version'), supportedProtocol: ProtocolRangeSchema, action: Type.Literal('upgrade_required') }, { additionalProperties: false }),
]);
export const ServerFrameSchema = Type.Union([SnapshotSchema, ReceiptSchema]);
export type ServerFrame = Static<typeof ServerFrameSchema>;
export function parseServerFrame(value: unknown): ServerFrame {
  const frame = readContract(ServerFrameSchema, value, 'server frame');
  if (frame.type === 'receipt' && frame.outcome === 'unsupported_version') parseProtocolRange(frame.supportedProtocol);
  return frame;
}
