import test from "node:test";
import assert from "node:assert/strict";
import { once } from "node:events";
import { createSmokeServer } from "../scripts/serve-smoke.mjs";

test("browser connectivity contract serves readiness and rejects other routes/methods", async (context) => {
  const server = createSmokeServer();
  server.listen(0, "127.0.0.1");
  await once(server, "listening");
  context.after(() => new Promise((resolve) => server.close(resolve)));
  const origin = `http://127.0.0.1:${server.address().port}`;

  const ready = await fetch(`${origin}/healthz`);
  assert.equal(ready.status, 200);
  assert.deepEqual(await ready.json(), { status: "ok", service: "workspace-smoke", phase: "bootstrap" });
  assert.equal(ready.headers.get("cache-control"), "no-store");
  assert.equal((await fetch(origin)).status, 200);
  assert.equal((await fetch(`${origin}/missing`)).status, 404);
  assert.equal((await fetch(origin, { method: "POST" })).status, 405);
  const head = await fetch(origin, { method: "HEAD" });
  assert.equal(head.status, 200);
  assert.equal(await head.text(), "");
});
