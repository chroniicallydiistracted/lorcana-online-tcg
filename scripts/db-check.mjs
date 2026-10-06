import { spawnSync } from "node:child_process";

if (process.env.APP_ENV !== "local" || process.env.PGHOST !== "postgres") {
  console.error("Database check is restricted to this local Dev Container.");
  process.exitCode = 1;
} else if (!process.env.POSTGRES_PASSWORD || !process.env.POSTGRES_USER || !process.env.POSTGRES_DB) {
  console.error("Missing generated local database configuration.");
  process.exitCode = 1;
} else {
  const result = spawnSync("psql", [
    "--no-psqlrc", "--no-password", "--tuples-only", "--no-align",
    "--set", "ON_ERROR_STOP=1",
    "--command", "SELECT current_database(), current_user, current_setting('server_version_num');"
  ], {
    env: {
      ...process.env,
      PGUSER: process.env.POSTGRES_USER,
      PGDATABASE: process.env.POSTGRES_DB,
      PGPASSWORD: process.env.POSTGRES_PASSWORD,
      PGCONNECT_TIMEOUT: "5"
    },
    encoding: "utf8",
    timeout: 15000
  });
  const fields = (result.stdout ?? "").trim().split("|");
  const correct = result.status === 0 && fields.length === 3 &&
    fields[0] === process.env.POSTGRES_DB && fields[1] === process.env.POSTGRES_USER &&
    Number(fields[2]) >= 180000 && Number(fields[2]) < 190000;
  if (!correct) {
    // Do not forward arbitrary stderr/environment values to logs.
    console.error("Database check failed. Confirm PostgreSQL is healthy, credentials match the existing volume, and the server is version 18.");
    process.exitCode = 1;
  } else {
    console.log("PASS authenticated PostgreSQL 18 connection to the local bootstrap database.");
  }
}
