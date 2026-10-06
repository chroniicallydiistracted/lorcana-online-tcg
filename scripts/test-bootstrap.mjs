import { fileURLToPath } from "node:url";
import { run } from "./process.mjs";

const root = fileURLToPath(new URL("../", import.meta.url));
try {
  run(process.execPath, ["--test", "tests/smoke.test.mjs"], { cwd: root });
  run("python3", ["-m", "unittest", "discover", "-s", "tests", "-p", "*_test.py"], { cwd: root });
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
