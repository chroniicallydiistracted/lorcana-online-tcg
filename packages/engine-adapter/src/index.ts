import { randomBytes } from 'node:crypto';
import { createRecordedMatch, type QualificationMatch } from './replay.js';
import { validateSetup } from './validation.js';
export { verifyCompletedReplay } from './replay.js';
export type { QualificationMatch, ServerStatus, PrivateCompletedReplay } from './replay.js';
export { ENGINE_QUALIFICATION, assessEngineAdmission } from './admission.js';
export { createPrivateMatch, restorePrivateMatch, PERSISTENT_ENGINE_IDENTITY } from './persistence.js';
export type { PrivateMatch, PrivateMatchCheckpoint } from './persistence.js';
export { copyInput as copyPlayerInput } from './validation.js';
export type {ClockControl} from './clocks.js';

/** Synthetic server qualification only; caller-selected entropy is refused. */
export function createQualificationMatch(options: unknown): QualificationMatch {
  const setup = validateSetup(options), seed = randomBytes(32);
  try { return createRecordedMatch(setup, seed); }
  finally { seed.fill(0); }
}
