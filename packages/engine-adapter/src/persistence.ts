import type { ViewerProjection } from '@lorcana/contracts';
import type {EngineClockState} from '@lorcana/contracts/clocks';
import { createHash, randomBytes, timingSafeEqual } from 'node:crypto';
import { ENGINE_REPLAY_IDENTITY } from './code-identity.js';
import { RANDOM_VERSION } from './random.js';
import { canonical, boundedTree, createRecordedCore } from './replay.js';
import type { RecordedCore, ServerStatus } from './replay.js';
import { closedRecord, validateSetup } from './validation.js';

export const PERSISTENT_ENGINE_IDENTITY = ENGINE_REPLAY_IDENTITY;
export interface PrivateMatchCheckpoint { readonly archive: string; readonly digest: string }
export interface PrivateMatch {
  status(): ServerStatus;
  submit(command: unknown): { accepted: boolean; code: string | null };
  project(viewer:unknown):ViewerProjection;
  resolveIntent(actor:string,move:unknown,input:unknown):Record<string,unknown>;
  checkpoint(): PrivateMatchCheckpoint;
  clock():EngineClockState|null;
  controlClock(control:unknown):void;
  timeout(value:unknown):{accepted:boolean;code:string|null};
  dispose(): void;
}
function matchId(value: unknown): string {
  if (typeof value !== 'string' || !/^[a-zA-Z0-9][a-zA-Z0-9._-]{0,79}$/.test(value)) throw new Error('Invalid match identity');
  return value;
}
const context = (id: string) => ENGINE_REPLAY_IDENTITY + '\0match:' + id;
function digest(archive: string): string { return createHash('sha256').update('private-match-checkpoint-v1\0').update(archive).digest('hex'); }
function wrap(core: RecordedCore, id: string): PrivateMatch {
  return Object.freeze({
    status: core.facade.status, submit: core.facade.submit, dispose: core.facade.dispose,
    clock:core.clock,controlClock:core.controlClock,timeout:core.timeout,
    project(viewer:unknown){return core.project(viewer,id);},
    resolveIntent(actor:string,move:unknown,input:unknown){return core.resolveIntent(actor,move,input,id);},
    checkpoint(): PrivateMatchCheckpoint {
      const envelope = { version: 2, purpose: 'synthetic-play01', matchId: id, transcript: JSON.parse(core.privateArchive()) };
      boundedTree(envelope);
      const archive = canonical(envelope);
      if (Buffer.byteLength(archive) > 2 * 1024 * 1024) throw new Error('Private checkpoint limit');
      return Object.freeze({ archive, digest: digest(archive) });
    },
  });
}
/** Trusted server/storage only. No client-provided seed or snapshot is accepted. */
export function createPrivateMatch(options: unknown): PrivateMatch {
  const row = closedRecord(options, ['matchId', 'players', 'startTimestamp','clock']);
  const id = matchId(row.matchId), setup = validateSetup({ players: row.players, startTimestamp: row.startTimestamp,...(Object.hasOwn(row,'clock')?{clock:row.clock}:{}) });
  const seed = randomBytes(32);
  try { return wrap(createRecordedCore(setup, seed, context(id)), id); }
  finally { seed.fill(0); }
}
/** Digest must originate from trusted storage; it is integrity, not an unauthenticated signature. */
export function restorePrivateMatch(value: unknown, expectedMatchId: unknown): PrivateMatch {
  let core: RecordedCore | undefined;
  try {
    const id = matchId(expectedMatchId), checkpoint = closedRecord(value, ['archive', 'digest']);
    if (typeof checkpoint.archive !== 'string' || Buffer.byteLength(checkpoint.archive) > 2 * 1024 * 1024 || typeof checkpoint.digest !== 'string' || !/^[a-f0-9]{64}$/.test(checkpoint.digest)) throw new Error();
    if (!timingSafeEqual(Buffer.from(digest(checkpoint.archive), 'hex'), Buffer.from(checkpoint.digest, 'hex'))) throw new Error();
    const data: unknown = JSON.parse(checkpoint.archive); boundedTree(data);
    if (canonical(data) !== checkpoint.archive) throw new Error();
    const envelope = closedRecord(data, ['version', 'purpose', 'matchId', 'transcript']);
    if (envelope.version !== 2 || envelope.purpose !== 'synthetic-play01' || envelope.matchId !== id) throw new Error();
    const row = closedRecord(envelope.transcript, ['version', 'purpose', 'engineIdentity', 'rngVersion', 'setup', 'seed', 'seedCommitment', 'initial', 'commands', 'final']);
    if (row.version!==3 || row.purpose !== 'synthetic-rule03' || row.engineIdentity !== ENGINE_REPLAY_IDENTITY || row.rngVersion !== RANDOM_VERSION || typeof row.seed !== 'string' || !/^[a-f0-9]{64}$/.test(row.seed) || !Array.isArray(row.commands) || row.commands.length > 2048) throw new Error();
    const seed = Buffer.from(row.seed, 'hex');
    try { core = createRecordedCore(validateSetup(row.setup), seed, context(id)); }
    finally { seed.fill(0); }
    for (const command of row.commands) {
      if(command&&typeof command==='object'&&Object.hasOwn(command,'timeout')){const checkpointRow=closedRecord(command,['timeout','result','stateHash','randomOutcomes']);core.timeout(checkpointRow.timeout);}
      else if(command&&typeof command==='object'&&Object.hasOwn(command,'control')){
        const checkpointRow=closedRecord(command,['control','stateHash','randomOutcomes']);core.controlClock(checkpointRow.control);
      }else {
        const checkpointRow = closedRecord(command, ['command', 'result', 'stateHash', 'randomOutcomes']);
        core.facade.submit(checkpointRow.command);
      }
    }
    if (core.privateArchive() !== canonical(row)) throw new Error();
    return wrap(core, id);
  } catch {
    core?.facade.dispose();
    throw new Error('Checkpoint restore rejected');
  }
}
