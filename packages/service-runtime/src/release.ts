import { parseReleaseManifest } from '@lorcana/contracts';
import type { ReleaseManifest } from '@lorcana/contracts';

type Immutable<T> = T extends object ? { readonly [K in keyof T]: Immutable<T[K]> } : T;
export type RetainedRelease = Immutable<ReleaseManifest>;
function freeze<T>(value: T): Immutable<T> {
  if (value && typeof value === 'object') { for (const child of Object.values(value)) freeze(child); Object.freeze(value); }
  return value as Immutable<T>;
}
function canonical(value: unknown): string {
  if (Array.isArray(value)) return '[' + value.map(canonical).join(',') + ']';
  if (value && typeof value === 'object') return '{' + Object.entries(value).sort(([a], [b]) => a.localeCompare(b)).map(([key, child]) => JSON.stringify(key) + ':' + canonical(child)).join(',') + '}';
  const bytes = JSON.stringify(value);
  if (bytes === undefined) throw new Error('Invalid release identity');
  return bytes;
}
export function createReleaseRegistry(manifests: readonly unknown[], activeReleaseId: string) {
  if (manifests.length === 0 || manifests.length > 64) throw new Error('Invalid release registry');
  const retained = new Map<string, RetainedRelease>();
  for (const input of manifests) {
    const manifest = parseReleaseManifest(input);
    if (retained.has(manifest.releaseId)) throw new Error('Duplicate release ID');
    retained.set(manifest.releaseId, freeze(parseReleaseManifest(globalThis.structuredClone(manifest))));
  }
  function resolvePinned(releaseId: string): RetainedRelease {
    const release = retained.get(releaseId);
    if (!release) throw new Error('Unavailable pinned release');
    return release;
  }
  return Object.freeze({ active: resolvePinned(activeReleaseId), resolvePinned });
}
export type ReleaseRegistry = ReturnType<typeof createReleaseRegistry>;
export function assertRetainedPins(previous: ReleaseRegistry, next: ReleaseRegistry, pinnedReleaseIds: readonly string[]): void {
  for (const releaseId of new Set(pinnedReleaseIds)) {
    if (canonical(previous.resolvePinned(releaseId)) !== canonical(next.resolvePinned(releaseId))) throw new Error('Changed pinned release');
  }
}
