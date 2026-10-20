import { Type } from 'typebox';
import type { Static, TSchema } from 'typebox';
import { IdSchema, ProtocolRangeSchema, MAX_FRAME_BYTES, readContract, parseProtocolRange, negotiateProtocol } from './protocol.ts';
import { LegacyViewerProjectionSchema as ViewerProjectionSchema, MAX_LEGACY_VIEWER_BYTES as MAX_VIEWER_BYTES, encodeLegacyViewerProjection as encodeViewerProjection } from './viewer-v1.ts';
import {LegacyClockProjectionSchema as ClockProjectionSchema,parseLegacyClockProjection as parseClockProjection} from './clocks-v1.ts';
import type {LegacyClockProjection as ClockProjection} from './clocks-v1.ts';
import {ViewerProjectionSchema as Viewer2Schema,encodeViewerProjection as encodeViewer2} from './viewer.ts';
import type {ViewerProjection as Viewer2} from './viewer.ts';
import {ClockProjectionSchema as Clock2Schema,parseClockProjection as parseClock2} from './clocks.ts';
import type {ClockProjection as Clock2} from './clocks.ts';

export const LIVE_PROTOCOL=2 as const;
export const LIVE_PROTOCOL_RANGE=Object.freeze({min:2,max:2});
/** Both have distinct decoders/handlers; protocol1 remains diagnostic-only. */
export const IMPLEMENTED_PROTOCOL_RANGE=Object.freeze({min:2,max:4});
export const CLOCKED_PROTOCOL_RANGE=Object.freeze({min:3,max:3});
export const TRANSPORT_PROTOCOL_RANGE=Object.freeze({min:2,max:4});
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

type Version3<T>=T extends {protocolVersion:2}?Omit<T,'protocolVersion'>&{protocolVersion:3}:never;
export type Live3ClientFrame=Version3<LiveClientFrame>;
export type Live3Command=Version3<LiveCommand>;
export type Live3ServerFrame=Exclude<Version3<LiveServerFrame>,{type:'snapshot'}>
  |(Version3<Extract<LiveServerFrame,{type:'snapshot'}>>&{clock:ClockProjection})
  |(Omit<Version3<Extract<LiveReceipt,{outcome:'rejected'}>>,'reason'>&{reason:'clock_expired'});
type Version4<T>=T extends {protocolVersion:2}?Omit<T,'protocolVersion'>&{protocolVersion:4}:never;
export type Live4ClientFrame=Version4<LiveClientFrame>;
export type Live4Command=Version4<LiveCommand>;
export type Live4ServerFrame=Exclude<Version4<LiveServerFrame>,{type:'snapshot'}>
 |(Omit<Version4<Extract<LiveServerFrame,{type:'snapshot'}>>,'payload'>&{payload:Viewer2;clock:Clock2|null})
 |(Omit<Version4<Extract<LiveReceipt,{outcome:'rejected'}>>,'reason'>&{reason:'clock_expired'});
export type TransportClientFrame=LiveClientFrame|Live3ClientFrame|Live4ClientFrame;
export type TransportCommand=LiveCommand|Live3Command|Live4Command;
export type TransportServerFrame=LiveServerFrame|Live3ServerFrame|Live4ServerFrame;
export type TransportReceipt=Extract<TransportServerFrame,{type:'receipt'}>;
const command3=object({...LiveCommandSchema.properties,protocolVersion:Type.Literal(3)});
/** Clone the exact closed v2 branches; only version and the v3 snapshot clock differ. */
function clockedSchema(source:TSchema,server:boolean):TSchema {
  const copy=JSON.parse(JSON.stringify(source)) as {anyOf:Array<{properties:Record<string,unknown>;required:string[];additionalProperties:boolean}>};
  for(const branch of copy.anyOf){
    branch.properties.protocolVersion=Type.Literal(3);
    const kind=branch.properties.type as {const:string};
    if(server&&kind.const==='snapshot'){branch.properties.clock=ClockProjectionSchema;branch.required.push('clock');}
  }
  if(server)copy.anyOf.push(object({...base,protocolVersion:Type.Literal(3),type:Type.Literal('receipt'),commandId:IdSchema,duplicate:Type.Boolean(),outcome:Type.Literal('rejected'),reason:Type.Literal('clock_expired')}) as unknown as typeof copy.anyOf[number]);
  return copy as unknown as TSchema;
}
const client3=clockedSchema(clientSchema,false),server3=clockedSchema(serverSchema,true);
export function parseLive3Command(value:unknown):Live3Command{return readContract(command3,value,'live3 command');}
export function decodeLive3ClientFrame(raw:unknown):Live3ClientFrame {
  try{return readContract(client3,parsed(raw,MAX_FRAME_BYTES),'live3 client frame') as Live3ClientFrame;}catch{throw new Error('Invalid live3 client frame');}
}
export function parseLive3ServerFrame(value:unknown):Live3ServerFrame {
  const frame=readContract(server3,value,'live3 server frame') as Live3ServerFrame;
  if(frame.type==='snapshot'){
    if(frame.payload.matchId!==frame.matchId||frame.payload.stateVersion!==frame.stateVersion||frame.payload.viewer.kind!=='participant')throw new Error('Invalid live3 server frame');
    encodeViewerProjection(frame.payload);const clock=parseClockProjection(frame.clock),viewerId=frame.payload.viewer.playerId;
    if(clock.stateVersion!==frame.stateVersion||(clock.status==='ended')!==frame.payload.ended||clock.players.some(p=>!frame.payload.players.some(v=>v.playerId===p.playerId))||!clock.players.some(p=>p.playerId===viewerId))throw new Error('Invalid live3 server frame');
  }
  if(frame.type==='receipt'&&frame.outcome==='unsupported_version')parseProtocolRange(frame.supportedProtocol);
  return frame;
}
export function encodeLive3ServerFrame(value:unknown):string {try{const raw=JSON.stringify(parseLive3ServerFrame(value));if(new TextEncoder().encode(raw).byteLength>MAX_LIVE_SERVER_BYTES)throw new Error();return raw;}catch{throw new Error('Invalid live3 server frame');}}
export function decodeLive3ServerFrame(raw:unknown):Live3ServerFrame {try{return parseLive3ServerFrame(parsed(raw,MAX_LIVE_SERVER_BYTES));}catch{throw new Error('Invalid live3 server frame');}}
// Distinct live4 shapes: viewer2 and clock2 are never accepted by a v2/v3 codec.
const command4=object({...LiveCommandSchema.properties,protocolVersion:Type.Literal(4)});
function d13Schema(source:TSchema,server:boolean):TSchema {
 const copy=JSON.parse(JSON.stringify(source)) as {anyOf:Array<{properties:Record<string,unknown>;required:string[]}>};
 for(const branch of copy.anyOf){branch.properties.protocolVersion=Type.Literal(4);if(server&&(branch.properties.type as {const:string}).const==='snapshot'){branch.properties.payload=Viewer2Schema;branch.properties.clock=Type.Union([Clock2Schema,Type.Null()]);}}
 return copy as unknown as TSchema;
}
const client4=d13Schema(client3,false),server4=d13Schema(server3,true);
export function parseLive4Command(value:unknown):Live4Command{return readContract(command4,value,'live4 command');}
export function decodeLive4ClientFrame(raw:unknown):Live4ClientFrame{try{return readContract(client4,parsed(raw,MAX_FRAME_BYTES),'live4 client frame') as Live4ClientFrame;}catch{throw new Error('Invalid live4 client frame');}}
export function parseLive4ServerFrame(value:unknown):Live4ServerFrame{
 const frame=readContract(server4,value,'live4 server frame') as Live4ServerFrame;
 if(frame.type==='snapshot'){
  if(frame.payload.matchId!==frame.matchId||frame.payload.stateVersion!==frame.stateVersion||frame.payload.viewer.kind!=='participant')throw new Error('Invalid live4 server frame');encodeViewer2(frame.payload);const viewerId=frame.payload.viewer.playerId;
  if(frame.clock===null&&frame.payload.endReason==='timeout')throw new Error('Invalid live4 server frame');
  if(frame.clock!==null){const clock=parseClock2(frame.clock);if(clock.stateVersion!==frame.stateVersion||(clock.status==='ended')!==frame.payload.ended||clock.players.some(p=>!frame.payload.players.some(v=>v.playerId===p.playerId))||!clock.players.some(p=>p.playerId===viewerId))throw new Error('Invalid live4 server frame');}
 }
 if(frame.type==='receipt'&&frame.outcome==='unsupported_version')parseProtocolRange(frame.supportedProtocol);return frame;
}
export function encodeLive4ServerFrame(value:unknown):string{try{const raw=JSON.stringify(parseLive4ServerFrame(value));if(new TextEncoder().encode(raw).byteLength>MAX_LIVE_SERVER_BYTES)throw new Error();return raw;}catch{throw new Error('Invalid live4 server frame');}}
export function decodeLive4ServerFrame(raw:unknown):Live4ServerFrame{try{return parseLive4ServerFrame(parsed(raw,MAX_LIVE_SERVER_BYTES));}catch{throw new Error('Invalid live4 server frame');}}
export function decodeTransportClientFrame(raw:unknown):TransportClientFrame {
 const value=parsed(raw,MAX_FRAME_BYTES) as {protocolVersion?:number};return value?.protocolVersion===4?decodeLive4ClientFrame(raw):value?.protocolVersion===3?decodeLive3ClientFrame(raw):decodeLiveClientFrame(raw);
}
export function parseTransportCommand(value:unknown):TransportCommand{const row=readContract(Type.Union([LiveCommandSchema,command3,command4]),value,'transport command');return row.protocolVersion===4?parseLive4Command(row):row.protocolVersion===3?parseLive3Command(row):parseLiveCommand(row);}
export function encodeTransportServerFrame(value:unknown):string{const row=readContract(Type.Union([serverSchema,server3,server4]),value,'transport server frame') as TransportServerFrame;return row.protocolVersion===4?encodeLive4ServerFrame(row):row.protocolVersion===3?encodeLive3ServerFrame(row):encodeLiveServerFrame(row);}
export function decodeTransportServerFrame(raw:unknown):TransportServerFrame{const row=parsed(raw,MAX_LIVE_SERVER_BYTES) as {protocolVersion?:number};return row?.protocolVersion===4?decodeLive4ServerFrame(raw):row?.protocolVersion===3?decodeLive3ServerFrame(raw):decodeLiveServerFrame(raw);}
const ticket3=object({...TicketResponseSchema.properties,protocolVersion:Type.Literal(3)}),ticket4=object({...TicketResponseSchema.properties,protocolVersion:Type.Literal(4)});
export type TransportTicket=TicketResponse|Static<typeof ticket3>|Static<typeof ticket4>;
export function parseTransportTicketResponse(value:unknown,original:TicketRequest):TransportTicket{
 const request=parseTicketRequest(original),reply=readContract(Type.Union([TicketResponseSchema,ticket3,ticket4]),value,'transport ticket');if(reply.protocolVersion===2)return parseTicketResponse(reply,original);
 if(reply.requestId!==request.requestId||reply.matchId!==request.matchId||reply.expiresAt>reply.sessionExpiresAt||negotiateProtocol(request.supportedProtocol,{min:reply.protocolVersion,max:reply.protocolVersion})!==reply.protocolVersion)throw new Error('Invalid transport ticket');return reply;
}
const pending3=object({schemaVersion:Type.Literal(2),actorId:IdSchema,command:command3}),pending4=object({schemaVersion:Type.Literal(3),actorId:IdSchema,command:command4});
export type TransportPending=ClientPending|Static<typeof pending3>|Static<typeof pending4>;
export function parseTransportPending(value:unknown):TransportPending{return readContract(Type.Union([pendingSchema,pending3,pending4]),value,'pending transport intent');}
