"""Validate the workspace's bootstrap contract; no Docker daemon required."""

import json
from pathlib import Path
import yaml

root = Path(__file__).resolve().parents[1]
toolchain = json.loads((root / "toolchain.json").read_text())
package = json.loads((root / "package.json").read_text())
dev = json.loads((root / ".devcontainer/devcontainer.json").read_text())
compose = yaml.safe_load((root / ".devcontainer/compose.yaml").read_text())
workspace = yaml.safe_load((root / "pnpm-workspace.yaml").read_text())

assert package["engines"]["node"] == toolchain["node"]
assert package["packageManager"] == "pnpm@" + toolchain["pnpm"]
assert package["private"] is True
assert (root / ".node-version").read_text().strip() == toolchain["node"]
assert dev["remoteUser"] == "node" and dev["updateRemoteUserUID"] is True
assert dev["workspaceFolder"] == "/workspaces/lorcana-online-tcg"
assert dev["service"] == "workspace"
assert (root / ".devcontainer" / dev["dockerComposeFile"]).is_file()
assert dev["postCreateCommand"] == ["node", "scripts/post-create.mjs"]
assert dev["forwardPorts"] == [5173]
assert dev["shutdownAction"] == "stopCompose"

services = compose["services"]
assert set(services) == {"workspace", "postgres"}
assert services["postgres"]["image"] == toolchain["postgresImage"]
assert services["workspace"]["env_file"] == "../.env.local"
assert services["workspace"]["environment"] == {"PGHOST": "postgres", "PGPORT": "5432"}
assert services["postgres"]["env_file"] == "../.env.local"
assert services["workspace"]["depends_on"]["postgres"]["condition"] == "service_healthy"
assert services["postgres"]["volumes"] == ["pg18_data:/var/lib/postgresql"]
assert all("ports" not in service and "privileged" not in service for service in services.values())
mount = services["workspace"]["volumes"][0]
assert mount["source"] == ".." and mount["target"] == dev["workspaceFolder"]
assert mount["bind"]["create_host_path"] is False
assert "docker.sock" not in str(compose)
assert "POSTGRES_PASSWORD:" not in (root / ".devcontainer/compose.yaml").read_text()
assert (root / ".devcontainer/Dockerfile").read_text().splitlines()[0] == "FROM " + toolchain["nodeImage"]
assert workspace["packages"] == ["apps/*", "packages/*"]
for setting in ("saveExact", "engineStrict", "strictPeerDependencies", "packageManagerStrictVersion", "strictDepBuilds"):
    assert workspace[setting] is True, setting
assert workspace["allowBuilds"] == {}
print("PASS workspace configuration contract (static validation)")
