import { client, workspaceRoot } from './config.ts';
import { migrationFiles, validateHistory } from './policy.ts';
import type { Migration, Target } from './policy.ts';
export async function migrate(target: Target, root = workspaceRoot, fixture?: readonly Migration[]) {
  // Injectable migrations exist only for isolated test-database rollback/history probes.
  if (fixture && target !== 'test') throw new Error('Migration fixtures require the isolated test target');
  const files = fixture ?? migrationFiles(), db = client(target, 'migrator', root);
  await db.connect();
  try {
    await db.query('BEGIN');
    await db.query('SELECT pg_advisory_xact_lock(1279345486, 2)');
    await db.query('CREATE TABLE IF NOT EXISTS foundation.migrations (id varchar(4) PRIMARY KEY, sha256 varchar(64) NOT NULL, applied_at timestamptz NOT NULL DEFAULT now())');
    const applied = await db.query('SELECT id, sha256 FROM foundation.migrations ORDER BY id');
    const offset = validateHistory(files, applied.rows);
    for (const file of files.slice(offset)) {
      await db.query(file.sql);
      await db.query('INSERT INTO foundation.migrations (id,sha256) VALUES ($1,$2)', [file.id, file.sha256]);
    }
    await db.query('COMMIT');
    return { target, applied: files.length - offset, total: files.length };
  } catch (error) { await db.query('ROLLBACK'); throw error; }
  finally { await db.end(); }
}
