import { createHash } from 'node:crypto';
import { readdirSync, readFileSync } from 'node:fs';
import { KERNEL_IDENTITY } from '@lorcana/vendor-engine';

// Bind actual compiled adapter/kernel bytes and the kernel's provenance identity.
// No environment, credential or match data is read.
export function fingerprintExecutableIdentity(folder: URL, kernel: URL, provenance: string): string {
  const entry = (path: string, bytes: Uint8Array) => ({ path, bytes: bytes.byteLength, sha256: createHash('sha256').update(bytes).digest('hex') });
  const files = [entry('compiled-kernel', readFileSync(kernel)), ...readdirSync(folder).filter(name => name.endsWith('.js')).sort().map(file => entry(file, readFileSync(new URL(file, folder))))];
  return createHash('sha256').update('rule-03-synthetic-replay-v1\0').update(JSON.stringify({ provenance, files })).digest('hex');
}
export const ENGINE_REPLAY_IDENTITY = fingerprintExecutableIdentity(
  new URL('.', import.meta.url), new URL(import.meta.resolve('@lorcana/vendor-engine')), KERNEL_IDENTITY,
);
