import { administrator, credentials, workspaceRoot } from './config.ts';
import { identities, services, targetNames, marker } from './policy.ts';
import type { Target } from './policy.ts';
// Identifiers come only from the validated fixed target/service set. Passwords are validated base64url.
const ident = (value: string) => '"' + value.replaceAll('"', '""') + '"';
export async function provision(root = workspaceRoot) {
  const data = credentials(root, true);
  const admin = administrator();
  await admin.connect();
  try {
    // Never emit password-bearing role statements into the local server statement/error log.
    await admin.query("SET log_statement = 'none'; SET log_min_duration_statement = -1; SET log_min_duration_sample = -1; SET log_transaction_sample_rate = 0; SET log_duration = off; SET log_min_error_statement = 'panic'; SET log_parameter_max_length = 0; SET log_parameter_max_length_on_error = 0");
    for (const target of ['local', 'test'] as const) {
      const names = targetNames(target);
      for (const role of identities) {
        const name = names.roles[role];
        const found = await admin.query('SELECT oid, rolsuper, rolcreatedb, rolcreaterole, rolreplication, rolbypassrls, rolinherit, rolcanlogin, shobj_description(oid,\'pg_authid\') AS marker FROM pg_roles WHERE rolname=$1', [name]);
        const row = found.rows[0];
        if (row) {
          const membership = await admin.query('SELECT 1 FROM pg_auth_members WHERE member=$1 OR roleid=$1', [row.oid]);
          if (row.marker !== marker || row.rolsuper || row.rolcreatedb || row.rolcreaterole || row.rolreplication || row.rolbypassrls || row.rolinherit || !row.rolcanlogin || membership.rowCount) throw new Error('Managed role ownership/privilege drift; provisioning refused');
        }
        await admin.query('BEGIN');
        try {
          await admin.query(`${row ? 'ALTER' : 'CREATE'} ROLE ${ident(name)} ${row ? '' : 'LOGIN NOSUPERUSER NOCREATEDB NOCREATEROLE NOREPLICATION NOBYPASSRLS NOINHERIT'} PASSWORD '${data.passwords[target][role]}'`);
          await admin.query(`COMMENT ON ROLE ${ident(name)} IS '${marker}'`);
          await admin.query('COMMIT');
        } catch { await admin.query('ROLLBACK'); throw new Error('Managed role provisioning failed'); }
      }
    }
    for (const target of ['local', 'test'] as const) await provisionDatabase(target);
  } finally { await admin.end(); }
  async function provisionDatabase(target: Target) {
    const names = targetNames(target);
    const found = await admin.query('SELECT datdba::regrole::text AS owner, shobj_description(oid,\'pg_database\') AS marker FROM pg_database WHERE datname=$1', [names.database]);
    if (found.rowCount) {
      if (found.rows[0].marker !== marker || found.rows[0].owner !== names.roles.migrator) throw new Error('Existing database is unmanaged or has ownership drift');
    } else {
      await admin.query(`CREATE DATABASE ${ident(names.database)} OWNER ${ident(names.roles.migrator)}`);
      await admin.query(`COMMENT ON DATABASE ${ident(names.database)} IS '${marker}'`);
    }
    await admin.query(`REVOKE ALL ON DATABASE ${ident(names.database)} FROM PUBLIC`);
    for (const role of identities) await admin.query(`GRANT CONNECT ON DATABASE ${ident(names.database)} TO ${ident(names.roles[role])}`);
    const db = administrator(names.database);
    await db.connect();
    try {
      await db.query('REVOKE ALL ON SCHEMA public FROM PUBLIC');
      await validateRuntimePrivileges();
      await db.query('BEGIN');
      for (const schema of ['foundation', ...services]) {
        const existing = await db.query('SELECT nspowner::regrole::text AS owner FROM pg_namespace WHERE nspname=$1', [schema]);
        if (existing.rowCount && existing.rows[0].owner !== names.roles.migrator) throw new Error('Managed schema ownership drift');
        await db.query(`CREATE SCHEMA IF NOT EXISTS ${ident(schema)} AUTHORIZATION ${ident(names.roles.migrator)}`);
        await db.query(`REVOKE ALL ON SCHEMA ${ident(schema)} FROM PUBLIC`);
      }
      await db.query(`ALTER DEFAULT PRIVILEGES FOR ROLE ${ident(names.roles.migrator)} REVOKE EXECUTE ON FUNCTIONS FROM PUBLIC`);
      for (const service of services) {
        const role = ident(names.roles[service]), schema = ident(service);
        await db.query(`GRANT USAGE ON SCHEMA ${schema} TO ${role}`);
        await db.query(`ALTER DEFAULT PRIVILEGES FOR ROLE ${ident(names.roles.migrator)} IN SCHEMA ${schema} GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO ${role}`);
        await db.query(`GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA ${schema} TO ${role}`);
      }
      await db.query('COMMIT');
    } catch { await db.query('ROLLBACK'); throw new Error('Managed schema provisioning failed'); }
    finally { await db.end(); }
    async function validateRuntimePrivileges() {
      const other = targetNames(target === 'local' ? 'test' : 'local');
      const cross = await db.query(`SELECT EXISTS (SELECT 1 FROM unnest($1::text[]) AS role WHERE has_database_privilege(role,current_database(),'CONNECT')) AS drift`, [Object.values(other.roles)]);
      if (cross.rows[0].drift) throw new Error('Cross-environment database grant drift');
      const defaults = await db.query(`SELECT EXISTS (
        SELECT 1 FROM pg_default_acl d LEFT JOIN pg_namespace n ON n.oid=d.defaclnamespace
        CROSS JOIN LATERAL aclexplode(d.defaclacl) a
        WHERE d.defaclrole=(SELECT oid FROM pg_roles WHERE rolname=$1) AND a.grantee<>d.defaclrole AND NOT COALESCE((
          d.defaclobjtype='r' AND a.privilege_type IN ('SELECT','INSERT','UPDATE','DELETE') AND NOT a.is_grantable AND
          a.grantee=(SELECT oid FROM pg_roles WHERE rolname=CASE n.nspname WHEN 'api' THEN $2 WHEN 'match' THEN $3 WHEN 'worker' THEN $4 ELSE '' END)), false)) AS drift`, [names.roles.migrator,names.roles.api,names.roles.match,names.roles.worker]);
      if (defaults.rows[0].drift) throw new Error('Unexpected default privileges');
      for (const service of services) {
        const role = names.roles[service];
        const permissions = await db.query(`SELECT
          has_database_privilege($1, current_database(), 'CREATE,TEMP,CONNECT WITH GRANT OPTION') AS database_ddl,
          EXISTS (SELECT 1 FROM pg_namespace n WHERE n.nspname NOT IN ('pg_catalog','information_schema') AND n.nspname NOT LIKE 'pg_toast%' AND n.nspname NOT LIKE 'pg_temp%' AND
            (n.nspowner = (SELECT oid FROM pg_roles WHERE rolname=$1) OR has_schema_privilege($1,n.oid,'CREATE,USAGE WITH GRANT OPTION') OR (n.nspname<>$2 AND n.nspname<>'public' AND has_schema_privilege($1,n.oid,'USAGE')))) AS schema_drift,
          EXISTS (SELECT 1 FROM pg_class c JOIN pg_namespace n ON n.oid=c.relnamespace WHERE c.relkind IN ('r','p','v','m','f') AND n.nspname NOT IN ('pg_catalog','information_schema') AND n.nspname NOT LIKE 'pg_toast%' AND
            (c.relowner=(SELECT oid FROM pg_roles WHERE rolname=$1) OR has_table_privilege($1,c.oid,'TRUNCATE,REFERENCES,TRIGGER,MAINTAIN,SELECT WITH GRANT OPTION,INSERT WITH GRANT OPTION,UPDATE WITH GRANT OPTION,DELETE WITH GRANT OPTION') OR has_any_column_privilege($1,c.oid,'SELECT WITH GRANT OPTION,INSERT WITH GRANT OPTION,UPDATE WITH GRANT OPTION,REFERENCES') OR (n.nspname<>$2 AND (has_table_privilege($1,c.oid,'SELECT,INSERT,UPDATE,DELETE') OR has_any_column_privilege($1,c.oid,'SELECT,INSERT,UPDATE,REFERENCES'))))) AS table_drift,
          EXISTS (SELECT 1 FROM pg_proc p JOIN pg_namespace n ON n.oid=p.pronamespace WHERE n.nspname NOT IN ('pg_catalog','information_schema') AND
            (p.proowner=(SELECT oid FROM pg_roles WHERE rolname=$1) OR has_function_privilege($1,p.oid,'EXECUTE'))) AS routine_drift`, [role, service]);
        if (Object.values(permissions.rows[0]).some(Boolean)) throw new Error('Unexpected runtime database/schema/table permissions');
      }
    }
  }
}
