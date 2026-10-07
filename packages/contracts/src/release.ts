import { Type } from 'typebox';
import type { Static } from 'typebox';
import { IdSchema, ProtocolRangeSchema, parseProtocolRange, readContract } from './protocol.ts';

export const DigestSchema = Type.String({ pattern: '^[a-f0-9]{64}$', minLength: 64, maxLength: 64 });
export const BuiltComponentSchema = Type.Object({ status: Type.Literal('built'), version: IdSchema, sha256: DigestSchema }, { additionalProperties: false });
const ComponentSchema = Type.Union([BuiltComponentSchema, Type.Object({ status: Type.Literal('reserved') }, { additionalProperties: false })]);
export const ReleaseManifestSchema = Type.Object({
  schemaVersion: Type.Literal(1), releaseId: IdSchema, purpose: Type.Union([Type.Literal('foundation'), Type.Literal('game')]),
  createdAt: Type.String({ pattern: '^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{3}Z$', minLength: 24, maxLength: 24 }),
  source: Type.Object({ commit: Type.String({ pattern: '^(?:[a-f0-9]{40}|[a-f0-9]{64})$', minLength: 40, maxLength: 64 }), fingerprint: DigestSchema, lockSha256: DigestSchema }, { additionalProperties: false }),
  protocol: ProtocolRangeSchema,
  components: Type.Object({ web: BuiltComponentSchema, api: BuiltComponentSchema, matchService: BuiltComponentSchema, worker: BuiltComponentSchema, databaseSchema: BuiltComponentSchema, engine: ComponentSchema, content: ComponentSchema, rules: ComponentSchema, products: ComponentSchema, rewards: ComponentSchema }, { additionalProperties: false }),
}, { additionalProperties: false });
export type ReleaseManifest = Static<typeof ReleaseManifestSchema>;
export function parseReleaseManifest(value: unknown): ReleaseManifest {
  const manifest = readContract(ReleaseManifestSchema, value, 'release manifest');
  try {
    if (new Date(manifest.createdAt).toISOString() !== manifest.createdAt) throw new Error();
    parseProtocolRange(manifest.protocol);
    if (manifest.purpose === 'game' && Object.values(manifest.components).some(component => component.status !== 'built')) throw new Error();
  } catch { throw new Error('Invalid release manifest'); }
  return manifest;
}
