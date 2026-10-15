import { Type } from 'typebox';
import type { Static, TSchema } from 'typebox';
import { IdSchema, ProtocolRangeSchema, MAX_FRAME_BYTES, readContract, parseProtocolRange, negotiateProtocol } from './protocol.ts';
import { ViewerProjectionSchema, MAX_VIEWER_BYTES, encodeViewerProjection } from './viewer.ts';

export const LIVE_PROTOCOL=2 as const;
export const LIVE_PROTOCOL_RANGE=Object.freeze({min:2,max:2});
/** Both have distinct decoders/handlers; protocol1 remains diagnostic-only. */
export const IMPLEMENTED_PROTOCOL_RANGE=Object.freeze({min:1,max:2});
export const MAX_LIVE_SERVER_BYTES=MAX_VIEWER_BYTES+4096;
const counter=Type.Integer({minimum:0,maximum:Number.MAX_SAFE_INTEGER});
const amount=Type.Integer({minimum:0,maximum:1000});
const reference=Type.String({pattern:'^vr_[a-f0-9]{64}$',minLength:67,maxLength:67});
const token=Type.String({pattern:'^[A-Za-z0-9_-]{43}$',minLength:43,maxLength:43});
const retry=Type.Integer({minimum:1,maximum:300_000});
const object=<P extends Record<string,TSchema>>(properties:P)=>Type.Object(properties,{additionalProperties:false});
const intent=<K extends string,P extends TSchema>(kind:K,input:P)=>object({kind:Type.Literal(kind),input});
const payments={inkDrops:Type.Optional(amount),effectInkDropCounters:Type.Optional(Type.Array(amount,{maxItems:32}))};
export const LiveIntentSchema=Type.Union([
  intent('chooseWhoGoesFirst',object({playerId:IdSchema})),
  intent('alterHand',object({cardsToMulligan:Type.Array(reference,{maxItems:60})})),
  intent('putCardIntoInkwell',object({cardId:reference})),
  intent('playCard',object({cardId:reference,cost:Type.Optional(Type.Literal('standard')),...payments})),
  intent('quest',object({cardId:reference})),intent('questWithAll',object({})),
  intent('challenge',object({attackerId:reference,defenderId:reference})),
  intent('moveCharacterToLocation',object({characterId:reference,locationId:reference,...payments})),
  intent('activateAbility',object({cardId:reference,abilityIndex:amount,inkDrops:Type.Optional(amount)})),
  intent('passTurn',object({})),intent('concede',object({})),
]);
export type LiveIntent=Static<typeof LiveIntentSchema>;
export const LiveCommandSchema=object({type:Type.Literal('command'),protocolVersion:Type.Literal(2),matchId:IdSchema,commandId:IdSchema,correlationId:IdSchema,expectedStateVersion:counter,intent:LiveIntentSchema});
const clientSchema=Type.Union([
  LiveCommandSchema,
  object({type:Type.Literal('authenticate'),protocolVersion:Type.Literal(2),requestId:IdSchema,ticket:token}),
  object({type:Type.Literal('sync'),protocolVersion:Type.Literal(2),matchId:IdSchema,correlationId:IdSchema}),
]);
export type LiveClientFrame=Static<typeof clientSchema>;
export type LiveCommand=Static<typeof LiveCommandSchema>;
function parsed(raw:unknown,limit:number):unknown {
  if(typeof raw!=='string'||raw.length>limit||new TextEncoder().encode(raw).byteLength>limit)throw new Error();
  return JSON.parse(raw);
}
export function parseLiveCommand(value:unknown):LiveCommand{return readContract(LiveCommandSchema,value,'live command');}
export function decodeLiveClientFrame(raw:unknown):LiveClientFrame {
  try{return readContract(clientSchema,parsed(raw,MAX_FRAME_BYTES),'live client frame');}
  catch{throw new Error('Invalid live client frame');}
}
const base={protocolVersion:Type.Literal(2),matchId:IdSchema,sequence:counter,stateVersion:counter,correlationId:IdSchema,releaseId:IdSchema};
const receipt={...base,type:Type.Literal('receipt'),commandId:IdSchema,duplicate:Type.Boolean()};
const serverSchema=Type.Union([
  object({...base,type:Type.Literal('ready'),playerId:IdSchema}),
  object({...base,type:Type.Literal('snapshot'),projectionType:Type.Literal('viewer'),payload:ViewerProjectionSchema}),
  object({...receipt,outcome:Type.Literal('accepted')}),
  object({...receipt,outcome:Type.Literal('rejected'),reason:Type.Union([Type.Literal('invalid_intent'),Type.Literal('forbidden')])}),
  object({...receipt,outcome:Type.Literal('stale'),reason:Type.Literal('stale_state')}),
  object({...receipt,outcome:Type.Literal('rate_limited'),reason:Type.Literal('rate_limit'),retryAfterMs:retry}),
  object({...receipt,outcome:Type.Literal('auth_expired'),reason:Type.Literal('auth_expired')}),
  object({...receipt,outcome:Type.Literal('maintenance'),reason:Type.Literal('maintenance'),retryAfterMs:retry}),
  object({...receipt,outcome:Type.Literal('unsupported_version'),reason:Type.Literal('unsupported_version'),supportedProtocol:ProtocolRangeSchema,action:Type.Literal('upgrade_required')}),
  object({...base,type:Type.Literal('control'),outcome:Type.Literal('auth_expired')}),
  object({...base,type:Type.Literal('control'),outcome:Type.Literal('maintenance'),retryAfterMs:retry}),
  object({...base,type:Type.Literal('control'),outcome:Type.Literal('rate_limited'),retryAfterMs:retry}),
]);
export type LiveServerFrame=Static<typeof serverSchema>;
export type LiveReceipt=Extract<LiveServerFrame,{type:'receipt'}>;
export function parseLiveServerFrame(value:unknown):LiveServerFrame {
  const frame=readContract(serverSchema,value,'live server frame');
  if(frame.type==='snapshot') {
    if(frame.payload.matchId!==frame.matchId||frame.payload.stateVersion!==frame.stateVersion||frame.payload.viewer.kind!=='participant')throw new Error('Invalid live server frame');
    encodeViewerProjection(frame.payload);
  }
  if(frame.type==='receipt'&&frame.outcome==='unsupported_version')parseProtocolRange(frame.supportedProtocol);
  return frame;
}
export function encodeLiveServerFrame(value:unknown):string {
  try{const raw=JSON.stringify(parseLiveServerFrame(value));if(new TextEncoder().encode(raw).byteLength>MAX_LIVE_SERVER_BYTES)throw new Error();return raw;}
  catch{throw new Error('Invalid live server frame');}
}
export function decodeLiveServerFrame(raw:unknown):LiveServerFrame {
  try{return parseLiveServerFrame(parsed(raw,MAX_LIVE_SERVER_BYTES));}catch{throw new Error('Invalid live server frame');}
}
const ticketRequest=object({requestId:IdSchema,matchId:IdSchema,clientReleaseId:IdSchema,supportedProtocol:ProtocolRangeSchema});
export type TicketRequest=Static<typeof ticketRequest>;
export const TicketRequestSchema=ticketRequest;
export const TicketResponseSchema=object({type:Type.Literal('ticket'),protocolVersion:Type.Literal(2),requestId:IdSchema,matchId:IdSchema,playerId:IdSchema,releaseId:IdSchema,ticket:token,expiresAt:counter,sessionExpiresAt:counter});
export type TicketResponse=Static<typeof TicketResponseSchema>;
export function parseTicketRequest(value:unknown):TicketRequest {
  const row=readContract(ticketRequest,value,'ticket request');parseProtocolRange(row.supportedProtocol);return row;
}
export function parseTicketResponse(value:unknown,original:TicketRequest):TicketResponse {
  const request=parseTicketRequest(original),reply=readContract(TicketResponseSchema,value,'ticket response');
  if(reply.requestId!==request.requestId||reply.matchId!==request.matchId||reply.expiresAt>reply.sessionExpiresAt||negotiateProtocol(request.supportedProtocol,LIVE_PROTOCOL_RANGE)!==2)throw new Error('Invalid ticket response');
  return reply;
}

const pendingSchema=object({schemaVersion:Type.Literal(1),actorId:IdSchema,command:LiveCommandSchema});
export type ClientPending=Static<typeof pendingSchema>;
/** Explicit future persistence hook: public intent only, never a ticket/session/seed/view. */
export function parseClientPending(value:unknown):ClientPending{return readContract(pendingSchema,value,'pending client intent');}
