import { Type } from 'typebox';
import type { Static } from 'typebox';
import { IdSchema, readContract } from './protocol.ts';

// Independent DTO revision; not BOOT-05's transport protocol revision.
export const MAX_VIEWER_BYTES = 262_144;
export const EndReasonSchema=Type.Union([Type.Literal('normal_win'),Type.Literal('concession'),Type.Literal('timeout'),Type.Null()]);
export type EndReason=Static<typeof EndReasonSchema>;
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
export const ViewerProjectionSchema = Type.Object({
  schemaVersion: Type.Literal(2), scope: Type.Literal('synthetic'), matchId: IdSchema, stateVersion: counter,
  viewer: Type.Union([Type.Object({kind:Type.Literal('participant'),playerId:IdSchema},{additionalProperties:false}),Type.Object({kind:Type.Literal('public')},{additionalProperties:false})]),
  ended: Type.Boolean(), endReason:EndReasonSchema, winner: Type.Union([IdSchema,Type.Null()]), turn: counter, turnOwnerId: Type.Union([IdSchema,Type.Null()]), priorityId: Type.Union([IdSchema,Type.Null()]),
  players: Type.Array(Type.Object({ playerId: IdSchema, lore: counter, inkDrops: counter, zones: Type.Array(zone, {minItems:5,maxItems:5}) }, {additionalProperties:false}),{minItems:2,maxItems:2}),
  resources: Type.Array(Type.Object({definitionId:IdSchema},{additionalProperties:false}),{maxItems:1000}),
  commands: Type.Array(IdSchema,{maxItems:13}), logs: Type.Array(notice,{maxItems:4096}), animations: Type.Array(notice,{maxItems:4096}),
},{additionalProperties:false});
export type ViewerProjection = Static<typeof ViewerProjectionSchema>;
export type Viewer = ViewerProjection['viewer'];
export function parseViewerProjection(value: unknown): ViewerProjection { const view=readContract(ViewerProjectionSchema,value,'viewer projection');if(view.ended!==(view.endReason!==null)||view.ended&&(!view.winner||!view.players.some(p=>p.playerId===view.winner))||!view.ended&&view.winner!==null)throw new Error('Invalid viewer projection');return view; }
/** One codec for transport, resource-containing snapshots and current-view exports. */
export function encodeViewerProjection(value: unknown): string {
  const raw=JSON.stringify(parseViewerProjection(value));
  if(new TextEncoder().encode(raw).byteLength>MAX_VIEWER_BYTES)throw new Error('Invalid viewer projection');
  return raw;
}
export function decodeViewerProjection(raw: unknown): ViewerProjection {
  try {
    if(typeof raw!=='string'||new TextEncoder().encode(raw).byteLength>MAX_VIEWER_BYTES)throw new Error();
    return parseViewerProjection(JSON.parse(raw));
  }catch{throw new Error('Invalid viewer projection');}
}

const surfaceBase={schemaVersion:Type.Literal(2),matchId:IdSchema,stateVersion:counter};
const surfaceSchema=Type.Union([
  Type.Object({...surfaceBase,surface:Type.Literal('snapshot'),payload:ViewerProjectionSchema},{additionalProperties:false}),
  Type.Object({...surfaceBase,surface:Type.Literal('export'),payload:ViewerProjectionSchema},{additionalProperties:false}),
  Type.Object({...surfaceBase,surface:Type.Literal('resources'),payload:ViewerProjectionSchema.properties.resources},{additionalProperties:false}),
  Type.Object({...surfaceBase,surface:Type.Literal('logs'),payload:ViewerProjectionSchema.properties.logs},{additionalProperties:false}),
  Type.Object({...surfaceBase,surface:Type.Literal('animations'),payload:ViewerProjectionSchema.properties.animations},{additionalProperties:false}),
]);
export type ViewerSurface = 'snapshot'|'resources'|'logs'|'animations'|'export';
export function encodeViewerSurface(value:unknown,surface:ViewerSurface):string {
  const view=decodeViewerProjection(encodeViewerProjection(value));
  const payload=surface==='snapshot'||surface==='export'?view:surface==='resources'?view.resources:surface==='logs'?view.logs:surface==='animations'?view.animations:undefined;
  const raw=JSON.stringify(readContract(surfaceSchema,{schemaVersion:2,matchId:view.matchId,stateVersion:view.stateVersion,surface,payload},'viewer surface'));
  if(new TextEncoder().encode(raw).byteLength>MAX_VIEWER_BYTES)throw new Error('Invalid viewer surface');
  return raw;
}
export function decodeViewerSurface(raw:unknown):Static<typeof surfaceSchema> {
  try {if(typeof raw!=='string'||new TextEncoder().encode(raw).byteLength>MAX_VIEWER_BYTES)throw new Error();return readContract(surfaceSchema,JSON.parse(raw),'viewer surface');}
  catch{throw new Error('Invalid viewer surface');}
}
const diagnosticSchema=Type.Object({event:Type.Literal('projection'),outcome:Type.Union([Type.Literal('ok'),Type.Literal('unavailable'),Type.Literal('forbidden'),Type.Literal('pin_unavailable')]),stateVersion:counter},{additionalProperties:false});
/** Operational diagnostics have no raw message/error/identity/input channel. */
export function encodeMatchDiagnostic(value:unknown):string {return JSON.stringify(readContract(diagnosticSchema,value,'match diagnostic'));}
