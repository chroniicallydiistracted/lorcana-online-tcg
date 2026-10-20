import {Type} from 'typebox';
import type {Static} from 'typebox';
import {IdSchema,readContract} from './protocol.ts';

const allowance=Type.Integer({minimum:1,maximum:3_600_000});
const remaining=Type.Integer({minimum:0,maximum:3_600_000});
const bonus=Type.Integer({minimum:0,maximum:600_000});
const counter=Type.Integer({minimum:0,maximum:Number.MAX_SAFE_INTEGER});
const timestamp=Type.Integer({minimum:0,maximum:8_640_000_000_000_000});
export const LegacyClockPolicySchema=Type.Object({schemaVersion:Type.Literal(1),id:IdSchema,profile:Type.Literal('qualification'),mode:Type.Literal('dynamic'),initialReserveMs:allowance,reserveCapMs:allowance,perActionBonusMs:bonus,perTurnPassBonusMs:bonus,resetTimeOnSkipMs:allowance,graceMs:Type.Literal(0)},{additionalProperties:false});
export type LegacyClockPolicy=Static<typeof LegacyClockPolicySchema>;
export interface LegacyEngineClockState {policy:LegacyClockPolicy;running:boolean;activePlayerId:string|null;startedAtMs:number|null;players:{playerId:string;remainingMs:number;timeoutCount:number}[]}
export const LegacyClockProjectionSchema=Type.Object({schemaVersion:Type.Literal(1),policyId:IdSchema,stateVersion:counter,clockRevision:counter,status:Type.Union([Type.Literal('running'),Type.Literal('processing'),Type.Literal('paused'),Type.Literal('ended')]),serverNowMs:timestamp,deadlineMs:Type.Union([timestamp,Type.Null()]),activePlayerId:Type.Union([IdSchema,Type.Null()]),players:Type.Array(Type.Object({playerId:IdSchema,remainingMs:remaining},{additionalProperties:false}),{minItems:2,maxItems:2}),pauseReason:Type.Union([Type.Literal('recovery'),Type.Literal('time_unreliable'),Type.Literal('no_legal_default'),Type.Null()])},{additionalProperties:false});
export type LegacyClockProjection=Static<typeof LegacyClockProjectionSchema>;
export function parseLegacyClockPolicy(value:unknown):LegacyClockPolicy {
  const p=readContract(LegacyClockPolicySchema,value,'clock policy');
  if(p.initialReserveMs>p.reserveCapMs||p.resetTimeOnSkipMs>p.reserveCapMs)throw new Error('Invalid clock policy');
  return JSON.parse(JSON.stringify(p)) as LegacyClockPolicy;
}
export function parseLegacyClockProjection(value:unknown):LegacyClockProjection {
  const p=readContract(LegacyClockProjectionSchema,value,'clock projection');
  if(p.players[0]!.playerId===p.players[1]!.playerId||p.activePlayerId!==null&&!p.players.some(player=>player.playerId===p.activePlayerId))throw new Error('Invalid clock projection');
  if(p.status==='running'&&(p.deadlineMs===null||p.activePlayerId===null||p.pauseReason!==null)||p.status==='paused'&&(p.deadlineMs!==null||p.pauseReason===null)||['processing','ended'].includes(p.status)&&(p.deadlineMs!==null||p.pauseReason!==null))throw new Error('Invalid clock projection');
  return JSON.parse(JSON.stringify(p)) as LegacyClockProjection;
}
