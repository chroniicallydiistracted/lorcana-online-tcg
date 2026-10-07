import { provision } from './provision.ts';
import { migrate } from './migrate.ts';
import { client } from './config.ts';
import { identities, targetNames } from './policy.ts';
import type { Target } from './policy.ts';
async function main() {
  const [command, targetFlag, target, ...rest] = process.argv.slice(2).filter(arg => arg !== '--');
  if (command === 'provision' && !targetFlag) { await provision(); console.log('PASS managed local/test roles, databases and schema grants provisioned'); return; }
  if (targetFlag !== '--target' || rest.length) throw new Error('Use an explicit --target local|test');
  targetNames(target);
  const selected = target as Target;
  if (command === 'migrate') { console.log(JSON.stringify(await migrate(selected))); return; }
  if (command === 'health') {
    for (const identity of identities) {
      const db = client(selected, identity);
      await db.connect();
      try {
        const rows = await db.query('SELECT current_database() AS db, current_user AS role, current_setting(\'server_version_num\')::int AS version');
        if (rows.rows[0].db !== targetNames(selected).database || rows.rows[0].role !== targetNames(selected).roles[identity] || Math.floor(rows.rows[0].version / 10_000) !== 18) throw new Error('Wrong database identity/version');
      } finally { await db.end(); }
    }
    console.log(`PASS PostgreSQL 18 ${selected}: four authenticated managed identities`); return;
  }
  throw new Error('Unknown database command');
}
main().catch(() => { console.error('Database command failed; verify local access, managed ownership and migration history. Private errors are not logged.'); process.exitCode = 1; });
