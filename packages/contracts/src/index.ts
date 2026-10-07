import { Type } from 'typebox';
import type { Static } from 'typebox';
import { Value } from 'typebox/value';
export * from './protocol.ts';
export * from './release.ts';

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
