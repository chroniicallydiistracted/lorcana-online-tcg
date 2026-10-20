import { Type } from 'typebox';
import type { Static } from 'typebox';
import { Value } from 'typebox/value';
export * from './protocol.ts';
export * from './release.ts';
export * from './viewer.ts';

const ServiceSchema = Type.Union([Type.Literal('api'), Type.Literal('match-service')]);
export const HealthSchema = Type.Object({
  service: ServiceSchema,
  status: Type.Literal('up'),
  scope: Type.Literal('foundation'),
}, { additionalProperties: false });
export const ReadinessSchema = Type.Object({
  service: ServiceSchema,
  status: Type.Union([Type.Literal('ready'), Type.Literal('not_ready')]),
  scope: Type.Literal('foundation'),
}, { additionalProperties: false });
export type ServiceName = Static<typeof ServiceSchema>;
export type Health = Static<typeof HealthSchema>;
export type Readiness = Static<typeof ReadinessSchema>;
export function parseReadiness(value: unknown): Readiness {
  if (!Value.Check(ReadinessSchema, value)) throw new Error('Invalid readiness response');
  return value;
}

export * from './live.ts';
export * from './clocks.ts';

export {LegacyViewerProjectionSchema,encodeLegacyViewerProjection,decodeLegacyViewerProjection} from './viewer-v1.ts';
export type {LegacyViewerProjection} from './viewer-v1.ts';
export {LegacyClockProjectionSchema,parseLegacyClockProjection} from './clocks-v1.ts';
export type {LegacyClockProjection} from './clocks-v1.ts';

import {readContract as readPublicContract} from './protocol.ts';
import {ViewerProjectionSchema,encodeViewerProjection,decodeViewerProjection,MAX_VIEWER_BYTES} from './viewer.ts';
import {LegacyViewerProjectionSchema,encodeLegacyViewerProjection,decodeLegacyViewerProjection} from './viewer-v1.ts';
import {ClockProjectionSchema,parseClockProjection} from './clocks.ts';
import {LegacyClockProjectionSchema,parseLegacyClockProjection} from './clocks-v1.ts';
import type {ViewerProjection} from './viewer.ts';
import type {LegacyViewerProjection} from './viewer-v1.ts';
import type {ClockProjection} from './clocks.ts';
import type {LegacyClockProjection} from './clocks-v1.ts';
export type PublicViewerProjection=ViewerProjection|LegacyViewerProjection;
export type PublicClockProjection=ClockProjection|LegacyClockProjection;
export function encodeTransportViewerProjection(value:unknown):string{const v=readPublicContract(Type.Union([ViewerProjectionSchema,LegacyViewerProjectionSchema]),value,'transport viewer');return v.schemaVersion===2?encodeViewerProjection(v):encodeLegacyViewerProjection(v);}
export function decodeTransportViewerProjection(raw:unknown):PublicViewerProjection{
 try{if(typeof raw!=='string'||raw.length>MAX_VIEWER_BYTES||new TextEncoder().encode(raw).byteLength>MAX_VIEWER_BYTES)throw new Error();const v=JSON.parse(raw) as {schemaVersion?:number};return v?.schemaVersion===2?decodeViewerProjection(raw):decodeLegacyViewerProjection(raw);}
 catch{throw new Error('Invalid transport viewer projection');}
}
export function parseTransportClockProjection(value:unknown):PublicClockProjection{const v=readPublicContract(Type.Union([ClockProjectionSchema,LegacyClockProjectionSchema]),value,'transport clock');return v.schemaVersion===2?parseClockProjection(v):parseLegacyClockProjection(v);}
