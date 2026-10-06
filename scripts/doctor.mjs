import { readFileSync, lstatSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

const root = fileURLToPath(new URL("../", import.meta.url));
const toolchain = JSON.parse(readFileSync(join(root, "toolchain.json"), "utf8"));
const failures = [];
const report = (pass, name) => {
  console.log(`${pass ? "PASS" : "FAIL"} ${name}`);
  if (!pass) failures.push(name);
};

report(process.versions.node === toolchain.node, `Node ${toolchain.node}`);
const pnpm = spawnSync("pnpm", ["--version"], { encoding: "utf8", cwd: root });
report(pnpm.status === 0 && pnpm.stdout.trim() === toolchain.pnpm, `pnpm ${toolchain.pnpm}`);
report(process.platform === "linux", "Linux development environment");

let privateEnv = false;
try {
  const info = lstatSync(join(root, ".env.local"));
  privateEnv = info.isFile() && !info.isSymbolicLink() && (info.mode & 0o077) === 0;
} catch {
  // Missing local credentials are reported without reading/printing their contents.
}
report(privateEnv, ".env.local exists with owner-only access");
report(process.env.APP_ENV === "local", "Local environment loaded into container");
report(process.env.PGHOST === "postgres" && process.env.PGPORT === "5432", "Container database address");
report(Boolean(process.env.POSTGRES_USER && process.env.POSTGRES_DB) && /^[a-f0-9]{64}$/.test(process.env.POSTGRES_PASSWORD ?? ""), "Generated database bootstrap configuration");

if (failures.length) {
  console.error("Workspace doctor failed. Run inside the configured Dev Container and consult docs/runbooks/workspace-setup.md.");
  process.exitCode = 1;
} else {
  console.log("Workspace toolchain ready. Run pnpm db:check to verify authenticated database access.");
}
