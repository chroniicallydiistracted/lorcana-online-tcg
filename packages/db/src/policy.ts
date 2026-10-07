import { createHash } from 'node:crypto';
import { readdirSync, readFileSync } from 'node:fs';
export type Target = 'local' | 'test';
export type Identity = 'migrator' | 'api' | 'match' | 'worker';
export const identities: readonly Identity[] = ['migrator', 'api', 'match', 'worker'];
export const services = ['api', 'match', 'worker'] as const;
export const marker = 'lorcana-online-tcg:boot-02:v1';
export function targetNames(target: unknown) {
  if (target !== 'local' && target !== 'test') throw new Error('Only explicit local/test database targets are allowed');
  const prefix = `lorcana_${target}`;
  return { database: `lorcana_app_${target}`, roles: { migrator: `${prefix}_migrator`, api: `${prefix}_api`, match: `${prefix}_match`, worker: `${prefix}_worker` } };
}
export interface Migration { id: string; sha256: string; sql: string }
export function migrationFiles(): Migration[] {
  const folder = new URL('../migrations/', import.meta.url);
  const names = readdirSync(folder).sort();
  if (!names.length || names.some((name, i) => !new RegExp(`^${String(i + 1).padStart(4, '0')}-[a-z0-9-]+\\.sql$`).test(name))) throw new Error('Migration filenames must be contiguous numbered SQL');
  return names.map(name => {
    const sql = readFileSync(new URL(name, folder), 'utf8');
    return { id: name.slice(0, 4), sha256: createHash('sha256').update(sql).digest('hex'), sql };
  });
}
export function validateHistory(files: readonly Pick<Migration, 'id' | 'sha256'>[], applied: readonly Pick<Migration, 'id' | 'sha256'>[]) {
  if (applied.length > files.length || applied.some((row, i) => row.id !== files[i]?.id || row.sha256 !== files[i]?.sha256)) throw new Error('Migration history differs from the checked-in prefix');
  return applied.length;
}
