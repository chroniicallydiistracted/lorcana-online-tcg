import { fileURLToPath } from "node:url";
import { run } from "./process.mjs";

const root = fileURLToPath(new URL("../", import.meta.url));
try {
  run(process.execPath, ["scripts/doctor.mjs"], { cwd: root });
  run("pnpm", ["install", "--frozen-lockfile"], { cwd: root });
  run("pnpm", ["verify"], { cwd: root });
  run("pnpm", ["test:bootstrap"], { cwd: root });
  run("pnpm", ["db:check"], { cwd: root });
  console.log("Dev Container setup passed. Run pnpm dev and open the forwarded port 5173; verify:foundation checks the application packages.");
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
