import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { run } from "./process.mjs";

const root = fileURLToPath(new URL("../", import.meta.url));
function inspect(folder) {
  for (const entry of readdirSync(folder, { withFileTypes: true })) {
    if ([".git", "node_modules", "__pycache__", ".local"].includes(entry.name)) continue;
    const path = join(folder, entry.name);
    if (entry.isDirectory()) inspect(path);
    else if (entry.name.endsWith(".json")) JSON.parse(readFileSync(path, "utf8"));
    else if (entry.name.endsWith(".mjs")) run(process.execPath, ["--check", path]);
  }
}
try {
  inspect(root);
  run("python3", ["scripts/verify-config.py"], { cwd: root });
  console.log("PASS JSON parsing and JavaScript syntax checks");
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
