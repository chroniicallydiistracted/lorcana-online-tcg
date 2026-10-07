import { provision } from './provision.ts';
import { migrate } from './migrate.ts';
import { client } from './config.ts';
import { probeRepository } from './schema.ts';
import { migrationFiles } from './policy.ts';
async function main() {
  const [command, id] = process.argv.slice(2);
  if (!['seed', 'check'].includes(command ?? '') || !id || !/^[0-9a-f-]{36}$/.test(id) || !process.env.LORCANA_PERSISTENCE_PROOF) throw new Error('Explicit disposable persistence probe required');
  if (command === 'seed') await provision();
  for (const target of ['local', 'test'] as const) {
    if (command === 'seed') {
      const concurrent = await Promise.all([migrate(target), migrate(target)]);
      if (concurrent.map(result => result.applied).sort((a,b)=>a-b).join(',') !== `0,${migrationFiles().length}`) throw new Error('Concurrent pending migration was not applied exactly once');
      console.log(`PASS ${target} two concurrent pending migrations: one application, one no-op`);
    }
    const result = await migrate(target);
    if (result.applied !== 0) throw new Error('Migration journal did not persist');
    const db = client(target, 'api'); await db.connect();
    try {
      const repo = probeRepository(db, 'api'), label = `persistence-${id}`;
      if (command === 'seed') await db.query('INSERT INTO api.foundation_probes(id,label) VALUES ($1,$2)', [id, label]);
      const rows = await repo.find(id);
      if (rows.length !== 1 || rows[0]?.label !== label || !(rows[0].createdAt instanceof Date)) throw new Error('Synthetic typed row did not persist');
    } finally { await db.end(); }
    const journal = client(target, 'migrator'); await journal.connect();
    try {
      const rows = (await journal.query('SELECT id,sha256,applied_at FROM foundation.migrations ORDER BY id')).rows;
      if (rows.length !== 1 || rows[0].sha256 !== migrationFiles()[0]?.sha256 || !(rows[0].applied_at instanceof Date)) throw new Error('Migration checksum/time did not persist');
    } finally { await journal.end(); }
    console.log(`PASS ${command} ${target} typed UUID row, UTC timestamp and migration checksum`);
  }
}
main().catch(() => { console.error('Disposable persistence probe failed; no private details logged'); process.exitCode = 1; });
