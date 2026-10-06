import { createServer } from "node:http";
import { pathToFileURL } from "node:url";

export function createSmokeServer() {
  return createServer((request, response) => {
    response.setHeader("Cache-Control", "no-store");
    response.setHeader("X-Content-Type-Options", "nosniff");
    response.setHeader("Content-Security-Policy", "default-src 'none'; frame-ancestors 'none'");
    if (!["GET", "HEAD"].includes(request.method)) {
      response.writeHead(405, { Allow: "GET, HEAD", "Content-Type": "text/plain; charset=utf-8" });
      response.end("Method not allowed\n");
    } else if (request.url === "/healthz") {
      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(JSON.stringify({ status: "ok", service: "workspace-smoke", phase: "bootstrap" }));
    } else if (request.url === "/") {
      response.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
      response.end("Lorcana workspace connection ready.\n\nThis checks browser access to the Dev Container.\nGame development begins after workspace qualification.\n");
    } else {
      response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      response.end("Not found\n");
    }
  });
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const server = createSmokeServer();
  server.on("error", () => {
    console.error("Connectivity server could not start. Check whether port 5173 is already in use.");
    process.exitCode = 1;
  });
  server.listen(5173, "0.0.0.0", () => {
    console.log("Workspace connectivity server is listening on container port 5173.");
    console.log("Open the forwarded port in VS Code's Ports panel. Stop with Ctrl+C.");
  });
  for (const signal of ["SIGINT", "SIGTERM"]) {
    process.on(signal, () => server.close());
  }
}
