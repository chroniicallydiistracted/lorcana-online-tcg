import { mkdirSync, readFileSync, writeFileSync, lstatSync, existsSync } from 'node:fs';
import { randomBytes } from 'node:crypto';
import { resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';
export const workspaceRoot = fileURLToPath(new URL('../../../', import.meta.url));
import pg from 'pg';
import type { ClientConfig } from 'pg';
import { identities, targetNames } from './policy.ts';
import type { Identity, Target } from './policy.ts';
export interface Credentials { version: 1; passwords: Record<Target, Record<Identity, string>> }
export function localEnvironment() {
  if (process.env.APP_ENV !== 'local' || process.env.PGHOST !== 'postgres' || process.env.PGPORT !== '5432') throw new Error('Database tooling requires the private local Dev Container network');
}
export function credentialPath(root = workspaceRoot) { return join(resolve(root), '.local', 'database.json'); }
function privateFile(path: string) {
  const stat = lstatSync(path);
  if (!stat.isFile() || stat.isSymbolicLink() || stat.nlink !== 1 || (stat.mode & 0o777) !== 0o600 || stat.uid !== process.getuid?.()) throw new Error('Database credentials must be an owned regular mode-600 file');
}
export function credentials(root = workspaceRoot, create = false): Credentials {
  const path = credentialPath(root);
  const folder = join(resolve(root), '.local');
  if (!existsSync(folder) && create) mkdirSync(folder, { mode: 0o700 });
  const parent = lstatSync(folder);
  if (!parent.isDirectory() || parent.isSymbolicLink() || parent.uid !== process.getuid?.() || (parent.mode & 0o077)) throw new Error('Credential directory must be owned and private');
  if (!existsSync(path) && create) {
    const passwords = Object.fromEntries(['local', 'test'].map(target => [target, Object.fromEntries(identities.map(role => [role, randomBytes(32).toString('base64url')]))]));
    writeFileSync(path, JSON.stringify({ version: 1, passwords }) + '\n', { mode: 0o600, flag: 'wx' });
  }
  privateFile(path);
  const value: unknown = JSON.parse(readFileSync(path, 'utf8'));
  if (!value || typeof value !== 'object' || !('version' in value) || value.version !== 1 || !('passwords' in value)) throw new Error('Invalid credential schema');
  const data = value as Credentials;
  const all = identities.flatMap(role => (['local', 'test'] as const).map(target => data.passwords?.[target]?.[role]));
  if (all.some(password => typeof password !== 'string' || !/^[A-Za-z0-9_-]{43}$/.test(password)) || new Set(all).size !== 8) throw new Error('Invalid or reused database passwords');
  return data;
}
export function connection(target: Target, identity: Identity, root = workspaceRoot): ClientConfig {
  localEnvironment();
  if (!identities.includes(identity)) throw new Error('Unknown database identity');
  const names = targetNames(target);
  return { host: 'postgres', port: 5432, database: names.database, user: names.roles[identity], password: credentials(root).passwords[target][identity], connectionTimeoutMillis: 5_000, application_name: `lorcana-${target}-${identity}`, statement_timeout: 15_000, options: '-c search_path=pg_catalog' };
}
export function client(target: Target, identity: Identity, root = workspaceRoot) { return new pg.Client(connection(target, identity, root)); }
export function administrator(database = process.env.POSTGRES_DB) {
  localEnvironment();
  if (!database || !process.env.POSTGRES_USER || !process.env.POSTGRES_PASSWORD) throw new Error('Missing private bootstrap administrator configuration');
  return new pg.Client({ host: 'postgres', port: 5432, database, user: process.env.POSTGRES_USER, password: process.env.POSTGRES_PASSWORD, connectionTimeoutMillis: 5_000, statement_timeout: 15_000, options: '-c search_path=pg_catalog' });
}
