export const hello = { type: 'hello', requestId: 'request-1', clientReleaseId: 'client-v1', supportedProtocol: { min: 1, max: 1 } };
export const command = { type: 'command', protocolVersion: 1, matchId: 'match-1', commandId: 'command-1', correlationId: 'request-1', expectedStateVersion: 0, intent: { kind: 'request_snapshot' } };
export const envelope = { protocolVersion: 1, matchId: 'match-1', sequence: 1, stateVersion: 1, correlationId: 'request-1', releaseId: 'release-v1' };
export const snapshot = { ...envelope, type: 'snapshot', projectionType: 'viewer', payload: { scope: 'synthetic', viewerId: 'viewer-1', zones: [{ zoneId: 'hand', count: 7 }] } };
export function releaseFixture(purpose = 'foundation', releaseId = 'release-v1') {
  const built = { status: 'built', version: 'synthetic-v1', sha256: 'a'.repeat(64) };
  return { schemaVersion: 1, releaseId, purpose, createdAt: '2026-10-05T12:00:00.000Z', source: { commit: 'a'.repeat(40), fingerprint: 'b'.repeat(64), lockSha256: 'c'.repeat(64) }, protocol: { min: 1, max: 1 }, components: Object.fromEntries(['web', 'api', 'matchService', 'worker', 'databaseSchema', 'engine', 'content', 'rules', 'products', 'rewards'].map(name => [name, ['web', 'api', 'matchService', 'worker', 'databaseSchema'].includes(name) || purpose === 'game' ? { ...built } : { status: 'reserved' }])) };
}
