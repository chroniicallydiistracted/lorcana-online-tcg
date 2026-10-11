import { createLabMatch, type LabMatch } from '@lorcana/engine-lab';
export { ENGINE_QUALIFICATION, assessEngineAdmission } from '@lorcana/engine-lab';

/** Qualification only. This entry is server-owned; no live match ingress is enabled. */
export function createQualificationMatch(options: { seed: string; players: [string, string] }): LabMatch {
  if (Object.keys(options).some(key => !['seed', 'players'].includes(key))) throw new Error('Invalid qualification options');
  return createLabMatch({ mode: 'qualification', fixture: 'synthetic', ...options });
}
