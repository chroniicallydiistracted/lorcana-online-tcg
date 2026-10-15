import { createHash, createHmac, timingSafeEqual } from 'node:crypto';
import { isPlayerMove } from '@lorcana/contracts/player-moves';
import { createSyntheticKernel, type SyntheticKernel } from '@lorcana/vendor-engine';
import { ENGINE_REPLAY_IDENTITY } from './code-identity.js';
import { createRandomSource, RANDOM_VERSION, type RandomOutcome } from './random.js';
import { closedRecord, copyInput, validateSetup, validateCommand, type ServerCommand,type EngineSetup } from './validation.js';
import {readEngineClock,validateClockControl} from './clocks.js';
import type {ClockControl} from './clocks.js';
import type {EngineClockState} from '@lorcana/contracts/clocks';

import { createViewerProjection } from './viewer.js';
import { resolveViewerIntent } from './viewer-intent.js';
import type { ViewerProjection, Viewer } from '@lorcana/contracts';

const MAX_BYTES = 2 * 1024 * 1024, MAX_COMMANDS = 2048;
type Result = { accepted: boolean; code: string | null };
export interface ServerStatus { mode: 'qualification'; revision: number; ended: boolean; winner: string | null; choosingFirstPlayer: string | null; rewardEligible: false; seedCommitment: string }
interface Checkpoint { stateHash: string; randomOutcomes: RandomOutcome[] }
interface CommandCheckpoint extends Checkpoint { command: ServerCommand; result: Result }
interface ClockCheckpoint extends Checkpoint {control:ClockControl}
interface PrivateReplay {
  version: 1|2; purpose: 'synthetic-rule03'; engineIdentity: string; rngVersion: string;
  setup: EngineSetup; seed: string; seedCommitment: string;
  initial: Checkpoint; commands: (CommandCheckpoint|ClockCheckpoint)[]; final: { stateHash: string; status: ServerStatus };
}
export interface PrivateCompletedReplay { archive: string; digest: string }
export interface QualificationMatch { status(): ServerStatus; submit(command: unknown): Result; exportReplay(): PrivateCompletedReplay; dispose(): void }
export interface RecordedCore { facade: QualificationMatch; privateArchive(): string; project(viewer:unknown,matchId:string):ViewerProjection; resolveIntent(actor:string,move:unknown,input:unknown,matchId:string):Record<string,unknown>;clock():EngineClockState|null;controlClock(value:unknown):void }

export function canonical(value: unknown): string {
  const normalized: unknown = JSON.parse(JSON.stringify(value));
  function order(item: unknown): unknown {
    if (Array.isArray(item)) return item.map(order);
    if (item && typeof item === 'object') return Object.fromEntries(Object.entries(item).sort(([a], [b]) => a < b ? -1 : a > b ? 1 : 0).map(([key, val]) => [key, order(val)]));
    return item;
  }
  return JSON.stringify(order(normalized));
}
function hash(value: unknown): string { return createHash('sha256').update(canonical(value)).digest('hex'); }
function archiveDigest(archive: string): string { return createHash('sha256').update('completed-private-replay-v1\0').update(archive).digest('hex'); }
function same(a: unknown, b: unknown): boolean { return canonical(a) === canonical(b); }

/** Internal construction for new secret-seeded matches and completed verification only. */
export function createRecordedMatch(setup: EngineSetup, privateSeed: Uint8Array): QualificationMatch {
  return createRecordedCore(setup, privateSeed).facade;
}
/** Server-internal friend interface; only the persistence wrapper obtains a live private archive. */
export function createRecordedCore(setup: EngineSetup, privateSeed: Uint8Array, context = ENGINE_REPLAY_IDENTITY): RecordedCore {
  const seed = Buffer.from(privateSeed), source = createRandomSource(seed, context);
  const seedCommitment = createHash('sha256').update('server-match-seed-v1\0').update(context).update(seed).digest('hex');
  const viewerKey = createHmac('sha256',seed).update('private-viewer-key-v1\0').update(context).digest();
  let kernel: SyntheticKernel | undefined;
  try { kernel = createSyntheticKernel({ players: setup.players, startTimestamp: setup.startTimestamp, randomSource: source,...(setup.clock?{clock:setup.clock}:{}) }); }
  catch { source.dispose(); seed.fill(0); throw new Error('Qualification initialization failed'); }
  function active(): SyntheticKernel { if (!kernel) throw new Error('Match disposed'); return kernel; }
  const initial: Checkpoint = { stateHash: hash(active().snapshot()), randomOutcomes: source.takeOutcomes() };
  const commands: (CommandCheckpoint|ClockCheckpoint)[] = [];
  let lastTimestamp = setup.startTimestamp, journalBytes = Buffer.byteLength(canonical(initial));
  function status(): ServerStatus { return { mode: 'qualification', ...active().status(), rewardEligible: false, seedCommitment }; }
  function privateArchive(): string {
    const replay: PrivateReplay = { version: setup.clock?2:1, purpose: 'synthetic-rule03', engineIdentity: ENGINE_REPLAY_IDENTITY, rngVersion: RANDOM_VERSION, setup: { players: [...setup.players], startTimestamp: setup.startTimestamp,...(setup.clock?{clock:setup.clock}:{}) }, seed: seed.toString('hex'), seedCommitment, initial, commands, final: { stateHash: hash(active().snapshot()), status: status() } };
    const archive = canonical(replay);
    if (Buffer.byteLength(archive) > MAX_BYTES) throw new Error('Qualification journal limit');
    return archive;
  }
  const facade: QualificationMatch = Object.freeze({
    status,
    submit(value: unknown): Result {
      const engine = active(), command = validateCommand(value), current = engine.status();
      // Completion freezes the private history; late receipts do not revise it.
      if (current.ended) return { accepted: false, code: !setup.players.includes(command.actor) ? 'INVALID_ACTOR' : command.expectedRevision !== current.revision ? 'STALE_REVISION' : 'MATCH_ENDED' };
      if (!isPlayerMove(command.move)) return { accepted: false, code: 'MOVE_FORBIDDEN' };
      const before = engine.snapshot();
      if (command.timestamp < lastTimestamp) throw new Error('Invalid timestamp ordering');
      if (commands.length >= MAX_COMMANDS) throw new Error('Qualification journal limit');
      let result: Result;
      if (!setup.players.includes(command.actor)) result = { accepted: false, code: 'INVALID_ACTOR' };
      else if (command.expectedRevision !== current.revision) result = { accepted: false, code: 'STALE_REVISION' };
      else result = engine.submit(command.actor, command.expectedRevision, command.timestamp, command.commandId, command.move, copyInput(command.input));
      const attempted = source.takeOutcomes(), stateHash = hash(engine.snapshot());
      if (!result.accepted && stateHash !== hash(before)) { engine.restore(before); throw new Error('Rejected transition changed state'); }
      const row: CommandCheckpoint = { command, result, stateHash, randomOutcomes: result.accepted ? attempted : [] };
      const bytes = Buffer.byteLength(canonical(row));
      if (journalBytes + bytes > MAX_BYTES - 16384) { engine.restore(before); throw new Error('Qualification journal limit'); }
      commands.push(row); journalBytes += bytes; lastTimestamp = command.timestamp;
      return { ...result };
    },
    exportReplay(): PrivateCompletedReplay {
      const engine = active();
      if (!engine.status().ended) throw new Error('Replay requires completed match');
      const archive = privateArchive();
      return Object.freeze({ archive, digest: archiveDigest(archive) });
    },
    dispose(): void { kernel = undefined; source.dispose(); seed.fill(0); viewerKey.fill(0); commands.length = 0; },
  });
  function projection(viewer:unknown,matchId:string) {
    let scoped:Viewer;
    try {
      const v=closedRecord(viewer,['kind','playerId']);
      if(v.kind==='participant'&&typeof v.playerId==='string'&&setup.players.includes(v.playerId))scoped={kind:'participant',playerId:v.playerId};
      else if(v.kind==='public'&&!Object.hasOwn(v,'playerId'))scoped={kind:'public'};
      else throw new Error();
    }catch{throw new Error('Viewer unavailable');}
    return createViewerProjection(active().inspect(scoped.kind==='participant'?scoped.playerId:undefined),{matchId,viewer:scoped,key:viewerKey});
  }
  function controlClock(value:unknown):void {
    const engine=active(),control=validateClockControl(value);
    if(!setup.clock||engine.status().ended||control.timestamp<lastTimestamp||commands.length>=MAX_COMMANDS)throw new Error('Clock control rejected');
    const before=engine.snapshot();
    engine.controlClock(control);
    const row:ClockCheckpoint={control,stateHash:hash(engine.snapshot()),randomOutcomes:source.takeOutcomes()},bytes=Buffer.byteLength(canonical(row));
    if(journalBytes+bytes>MAX_BYTES-16384){engine.restore(before);throw new Error('Qualification journal limit');}
    commands.push(row);journalBytes+=bytes;lastTimestamp=control.timestamp;
  }
  return Object.freeze({ facade, privateArchive,clock(){return readEngineClock(active(),setup.clock);},controlClock, project(viewer:unknown,matchId:string){return projection(viewer,matchId).snapshot;}, resolveIntent(actor:string,move:unknown,input:unknown,matchId:string){const view=projection({kind:'participant',playerId:actor},matchId);return resolveViewerIntent(actor,setup.players,move,input,view.resolve);} });
}

export function boundedTree(value: unknown, depth = 0, counter = { nodes: 0 }): void {
  if (++counter.nodes > 200000 || depth > 24) throw new Error('Replay input limit');
  if (Array.isArray(value)) { if (value.length > 4096) throw new Error('Replay input limit'); for (const item of value) boundedTree(item, depth + 1, counter); }
  else if (value && typeof value === 'object') for (const [key, item] of Object.entries(value)) { if (key.length > 128 || ['__proto__', 'constructor', 'prototype'].includes(key)) throw new Error('Replay input invalid'); boundedTree(item, depth + 1, counter); }
}
/** expectedDigest must come from a separately trusted server journal/receipt. */
export function verifyCompletedReplay(value: unknown, expectedDigest: unknown): { verified: true; commands: number; finalStateHash: string } {
  let match: QualificationMatch | undefined;
  try {
    if (typeof value !== 'string' || Buffer.byteLength(value) > MAX_BYTES || typeof expectedDigest !== 'string' || !/^[a-f0-9]{64}$/.test(expectedDigest)) throw new Error('Replay input invalid');
    if (!timingSafeEqual(Buffer.from(archiveDigest(value), 'hex'), Buffer.from(expectedDigest, 'hex'))) throw new Error('Replay integrity mismatch');
    const data: unknown = JSON.parse(value); boundedTree(data);
    const row = closedRecord(data, ['version', 'purpose', 'engineIdentity', 'rngVersion', 'setup', 'seed', 'seedCommitment', 'initial', 'commands', 'final']);
    if (![1,2].includes(Number(row.version)) || row.purpose !== 'synthetic-rule03' || row.engineIdentity !== ENGINE_REPLAY_IDENTITY || row.rngVersion !== RANDOM_VERSION || typeof row.seed !== 'string' || !/^[a-f0-9]{64}$/.test(row.seed) || !Array.isArray(row.commands) || row.commands.length > MAX_COMMANDS) throw new Error('Replay version/input invalid');
    const core=createRecordedCore(validateSetup(row.setup),Buffer.from(row.seed,'hex'));match=core.facade;
    if (row.seedCommitment !== match.status().seedCommitment) throw new Error('Replay seed mismatch');
    for (const command of row.commands) {
      if(row.version===2&&command&&typeof command==='object'&&Object.hasOwn(command,'control')){const checkpoint=closedRecord(command,['control','stateHash','randomOutcomes']);core.controlClock(checkpoint.control);}
      else { const checkpoint = closedRecord(command, ['command', 'result', 'stateHash', 'randomOutcomes']); match.submit(checkpoint.command); }
    }
    if (!match.status().ended) throw new Error('Replay incomplete');
    const actual: PrivateReplay = JSON.parse(match.exportReplay().archive);
    if (!same(actual, data)) throw new Error('Replay reconstruction mismatch');
    return { verified: true, commands: actual.commands.length, finalStateHash: actual.final.stateHash };
  } catch { throw new Error('Replay verification rejected'); }
  finally { match?.dispose(); }
}
