import { boundedText, closedRecord, copyInput } from './validation.js';
export const ENGINE_QUALIFICATION = Object.freeze({
  revision: '6de59de1c203827edc1bc6faa1bc6184cd126a5f', catalog: 'synthetic-only', rewards: false,
  rules230EffectiveOn: '2026-10-16', set14PrereleaseOn: '2026-10-16', set14GeneralReleaseOn: '2026-10-23',
  randomQualification: 'server_crypto_v1', rulesCertification: 'pending_RULE-04', viewerProjection: 'pending_PLAY-02',
});
export function assessEngineAdmission(request: unknown): { allowed: boolean; reasons: string[]; rules230Phase: string; set14Phase: string } {
  const row = closedRecord(request, ['asOf', 'mode', 'rulesVersion', 'sets', 'rewards', 'hiddenState']);
  const date = boundedText(row.asOf, 10);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !Number.isFinite(Date.parse(date)) || new Date(date).toISOString().slice(0, 10) !== date) throw new Error('Invalid date');
  const mode = boundedText(row.mode), version = boundedText(row.rulesVersion), sets = copyInput({ sets: row.sets }).sets;
  if (!Array.isArray(sets) || !sets.length || sets.length > 32 || sets.some(set => typeof set !== 'string') || typeof row.rewards !== 'boolean' || typeof row.hiddenState !== 'boolean') throw new Error('Invalid admission');
  const reasons: string[] = [];
  if (mode !== 'qualification') reasons.push('MODE_UNQUALIFIED');
  if (version !== 'synthetic-fixture') reasons.push('RULES_UNCERTIFIED');
  if (sets.some(set => set !== 'TST')) reasons.push('CATALOG_UNQUALIFIED');
  if (row.rewards) reasons.push('REWARDS_UNQUALIFIED');
  if (row.hiddenState) reasons.push('VIEWER_PROJECTION_PENDING');
  return { allowed: reasons.length === 0, reasons, rules230Phase: date < ENGINE_QUALIFICATION.rules230EffectiveOn ? 'scheduled' : 'effective', set14Phase: date < ENGINE_QUALIFICATION.set14PrereleaseOn ? 'scheduled' : date < ENGINE_QUALIFICATION.set14GeneralReleaseOn ? 'prerelease' : 'general_release' };
}
