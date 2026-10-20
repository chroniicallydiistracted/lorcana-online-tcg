import { Type } from 'typebox';
import type { Static } from 'typebox';
import { IdSchema, readContract } from './protocol.ts';

// Independent DTO revision; not BOOT-05's transport protocol revision.
export const MAX_LEGACY_VIEWER_BYTES = 262_144;
const counter = Type.Integer({ minimum: 0, maximum: Number.MAX_SAFE_INTEGER });
const ref = Type.String({ pattern: '^vr_[a-f0-9]{64}$' });
const state = Type.Union([Type.Literal('ready'), Type.Literal('exerted')]);
const card = Type.Union([
  Type.Object({ ref, state }, { additionalProperties: false }),
  Type.Object({ ref, definitionId: IdSchema, ownerId: IdSchema, controllerId: IdSchema, state, damage: counter, drying: Type.Boolean() }, { additionalProperties: false }),
]);
const zone = Type.Object({ kind: Type.Union([Type.Literal('hand'),Type.Literal('deck'),Type.Literal('play'),Type.Literal('discard'),Type.Literal('inkwell')]), count: Type.Integer({ minimum: 0, maximum: 1000 }), cards: Type.Array(card, { maxItems: 1000 }) }, { additionalProperties: false });
const ordinaryNotice = Type.Object({ sequence: counter, kind: Type.Union([Type.Literal('action'),Type.Literal('draw'),Type.Literal('mill'),Type.Literal('mulligan'),Type.Literal('turn'),Type.Literal('end')]), actorId: Type.Union([IdSchema,Type.Null()]), count: counter, move: Type.Union([IdSchema,Type.Null()]) }, { additionalProperties: false });
const notice=Type.Union([ordinaryNotice,Type.Object({sequence:counter,kind:Type.Literal('reveal'),actorId:Type.Union([IdSchema,Type.Null()]),definitionIds:Type.Array(IdSchema,{maxItems:1000})},{additionalProperties:false})]);
export const LegacyViewerProjectionSchema = Type.Object({
  schemaVersion: Type.Literal(1), scope: Type.Literal('synthetic'), matchId: IdSchema, stateVersion: counter,
  viewer: Type.Union([Type.Object({kind:Type.Literal('participant'),playerId:IdSchema},{additionalProperties:false}),Type.Object({kind:Type.Literal('public')},{additionalProperties:false})]),
  ended: Type.Boolean(), winner: Type.Union([IdSchema,Type.Null()]), turn: counter, turnOwnerId: Type.Union([IdSchema,Type.Null()]), priorityId: Type.Union([IdSchema,Type.Null()]),
  players: Type.Array(Type.Object({ playerId: IdSchema, lore: counter, inkDrops: counter, zones: Type.Array(zone, {minItems:5,maxItems:5}) }, {additionalProperties:false}),{minItems:2,maxItems:2}),
  resources: Type.Array(Type.Object({definitionId:IdSchema},{additionalProperties:false}),{maxItems:1000}),
  commands: Type.Array(IdSchema,{maxItems:13}), logs: Type.Array(notice,{maxItems:4096}), animations: Type.Array(notice,{maxItems:4096}),
},{additionalProperties:false});
export type LegacyViewerProjection = Static<typeof LegacyViewerProjectionSchema>;
export type LegacyViewer = LegacyViewerProjection['viewer'];
export function parseLegacyViewerProjection(value: unknown): LegacyViewerProjection { return readContract(LegacyViewerProjectionSchema,value,'viewer projection'); }
/** One codec for transport, resource-containing snapshots and current-view exports. */
export function encodeLegacyViewerProjection(value: unknown): string {
  const raw=JSON.stringify(parseLegacyViewerProjection(value));
  if(new TextEncoder().encode(raw).byteLength>MAX_LEGACY_VIEWER_BYTES)throw new Error('Invalid viewer projection');
  return raw;
}
export function decodeLegacyViewerProjection(raw: unknown): LegacyViewerProjection {
  try {
    if(typeof raw!=='string'||new TextEncoder().encode(raw).byteLength>MAX_LEGACY_VIEWER_BYTES)throw new Error();
    return parseLegacyViewerProjection(JSON.parse(raw));
  }catch{throw new Error('Invalid viewer projection');}
}

const surfaceBase={schemaVersion:Type.Literal(1),matchId:IdSchema,stateVersion:counter};
const surfaceSchema=Type.Union([
  Type.Object({...surfaceBase,surface:Type.Literal('snapshot'),payload:LegacyViewerProjectionSchema},{additionalProperties:false}),
  Type.Object({...surfaceBase,surface:Type.Literal('export'),payload:LegacyViewerProjectionSchema},{additionalProperties:false}),
  Type.Object({...surfaceBase,surface:Type.Literal('resources'),payload:LegacyViewerProjectionSchema.properties.resources},{additionalProperties:false}),
  Type.Object({...surfaceBase,surface:Type.Literal('logs'),payload:LegacyViewerProjectionSchema.properties.logs},{additionalProperties:false}),
  Type.Object({...surfaceBase,surface:Type.Literal('animations'),payload:LegacyViewerProjectionSchema.properties.animations},{additionalProperties:false}),
]);
export type LegacyViewerSurface = 'snapshot'|'resources'|'logs'|'animations'|'export';
export function encodeLegacyViewerSurface(value:unknown,surface:LegacyViewerSurface):string {
  const view=decodeLegacyViewerProjection(encodeLegacyViewerProjection(value));
  const payload=surface==='snapshot'||surface==='export'?view:surface==='resources'?view.resources:surface==='logs'?view.logs:surface==='animations'?view.animations:undefined;
  const raw=JSON.stringify(readContract(surfaceSchema,{schemaVersion:1,matchId:view.matchId,stateVersion:view.stateVersion,surface,payload},'viewer surface'));
  if(new TextEncoder().encode(raw).byteLength>MAX_LEGACY_VIEWER_BYTES)throw new Error('Invalid viewer surface');
  return raw;
}
export function decodeLegacyViewerSurface(raw:unknown):Static<typeof surfaceSchema> {
  try {if(typeof raw!=='string'||new TextEncoder().encode(raw).byteLength>MAX_LEGACY_VIEWER_BYTES)throw new Error();return readContract(surfaceSchema,JSON.parse(raw),'viewer surface');}
  catch{throw new Error('Invalid viewer surface');}
}
const diagnosticSchema=Type.Object({event:Type.Literal('projection'),outcome:Type.Union([Type.Literal('ok'),Type.Literal('unavailable'),Type.Literal('forbidden'),Type.Literal('pin_unavailable')]),stateVersion:counter},{additionalProperties:false});
/** Operational diagnostics have no raw message/error/identity/input channel. */
export function encodeLegacyMatchDiagnostic(value:unknown):string {return JSON.stringify(readContract(diagnosticSchema,value,'match diagnostic'));}
