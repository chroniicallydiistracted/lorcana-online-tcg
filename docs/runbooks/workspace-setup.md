# Workspace setup on Andre's PC

## Evidence already supplied

- Source directory: `/home/andre/lorcana-online-tcg`.
- WSL software 2.7.14.0; Ubuntu and docker-desktop both run in WSL2 mode.
- Git 2.43.0; Docker Desktop 4.93.0; Engine 29.8.1; Compose 5.5.1.
- Docker client and server respond from Ubuntu.

These observations establish the host prerequisites. Container/image/network/database startup must still be tested.

## 1. Extract the starter

Download `Lorcana_Workspace_Starter_2026-10-05.zip`. Its archive root contains `README.md`, `package.json`, `.devcontainer/` and the other repository files; it has no extra enclosing folder.

Extract its contents directly into the empty target folder. Windows File Explorer can reach it at `\\wsl.localhost\Ubuntu\home\andre\lorcana-online-tcg`. Ensure `.devcontainer/devcontainer.json` is under that exact folder, not under a nested archive-name folder.

Alternatively, if the download is in `C:\Users\andre\Downloads`, use Ubuntu:

```bash
python3 -m zipfile -e /mnt/c/Users/andre/Downloads/Lorcana_Workspace_Starter_2026-10-05.zip /home/andre/lorcana-online-tcg
```

Use this extraction only for the current empty directory. Once development files exist, review updates through Git rather than extracting a starter over them.

## 2. Create local credentials and validate Compose

In Ubuntu:

```bash
cd /home/andre/lorcana-online-tcg
python3 scripts/init-local-env.py
docker compose -f .devcontainer/compose.yaml config --quiet
code .
```

The generator creates `.env.local` with mode 0600 and a random password. A second run preserves it. It needs Python 3 on the Ubuntu host. If Python is unavailable, install the Ubuntu `python3` package and retry. Never copy `.env.example` unchanged as real credentials.

`config --quiet` checks Compose's schema/interpolation without displaying the secret-bearing resolved configuration. Do not paste `.env.local` or a full unredacted Compose configuration into chat.

## 3. Open the Dev Container

Install Microsoft's WSL and Dev Containers extensions in Windows VS Code if needed. The opened folder should initially show `WSL: Ubuntu`. Use **Ctrl+Shift+P → Dev Containers: Reopen in Container**.

The image installs Node 24.21.0, pnpm 10.33.0, Git, Python/PyYAML and `psql`. Source is mounted into `/workspaces/lorcana-online-tcg`. VS Code changes the `node` user's UID/GID to match the WSL user; both the container and editor work as that user. No host Node/pnpm install is required.

Post-create checks run sequentially: doctor, frozen install, configuration/syntax verification, bootstrap tests, then authenticated PostgreSQL connection. Their failure must be resolved before moving to application development. There are no production/cloud credentials in this setup.

The PostgreSQL 18 volume mounts at `/var/lib/postgresql`. Compose waits for database health before starting the workspace. The `psql` client installed from Debian can query the newer server; it is not a version-18 backup client. Use version-matched backup tooling when backup/restore is implemented.

## 4. Confirm the workspace

In the Dev Container terminal:

```bash
pnpm doctor
pnpm verify
pnpm test:bootstrap
pnpm db:check
pnpm dev:smoke
```

The first four commands must exit successfully. Open forwarded port 5173 from the **Ports** panel in the Windows browser. Expect `Lorcana workspace connection ready.` A readiness JSON response is available at `/healthz`.

The page checks container-to-browser connectivity only. It does not test React/Babylon, GPU performance, game rules, authentication or any game flow. Stop it with Ctrl+C.

## 5. Initialize version control

After the workspace passes, in the container terminal:

```bash
git init -b main
git status --short
git check-ignore .env.local
```

Confirm `.env.local` is ignored. Configure Git's commit identity if it is not already available. Stage and commit the intended source/configuration files once reviewed. No GitHub remote was created or selected by this starter. Add the Director's new private repository as the remote when it exists; keep the old Inkspire repository separate.

## 6. Preserve and qualify local database state

Closing the Dev Container window stops these Compose services. Reopening restarts them. The named PostgreSQL volume remains. For manual management, select this workspace's actual Compose project in Docker Desktop. VS Code can supply a project name; a host Compose command with an inferred different name could target a different project. Obtain the actual project name from the Dev Containers log before using host management commands.

Before marking BOOT-02 complete, create a synthetic persistence probe, stop/recreate the containers without deleting volumes, and confirm its stored value is unchanged. Also implement and verify restricted migration/app roles and an isolated test database. This starter only checks bootstrap administrator connectivity, not application least-privilege access or migrations.

Do not regenerate the password while reusing an initialized database volume: the PostgreSQL image does not change an existing database password from a newly supplied environment value. Restore the matching local configuration or perform an intentional credential rotation.

## Diagnosis

| Symptom | Next check |
|---|---|
| “Reopen in Container” missing | Install Microsoft's Dev Containers extension; verify Windows VS Code opened the WSL folder |
| `.env.local` missing | Run the generator in Ubuntu before reopening |
| Permission denied on source/secrets | Confirm the WSL path, non-root `node` user and UID mapping; do not recursively chmod/chown the project as a shortcut |
| Image/pnpm download fails | Inspect the specific registry/network error in the Dev Containers log; retain the recorded pins |
| Compose schema fails | Capture the `config --quiet` error; do not dump secret-bearing resolved configuration |
| Doctor sees a different Node/pnpm version | Confirm the terminal is in the Dev Container; rebuild after configuration changes |
| Doctor rejects credential format/access | Check generated local config and mode 0600; do not paste the password |
| Database connection fails | Check this workspace's PostgreSQL container in Docker Desktop; verify health and matching existing credentials |
| Browser URL unavailable | Start `pnpm dev:smoke`; open the actual forwarded URL in the Ports panel |
| Port 5173 already used | Stop the old connectivity process or choose an alternate local forwarding port in VS Code |

The workspace container has no Docker CLI/socket. Use Docker Desktop or the Ubuntu host for container management, selecting the actual workspace project. Use `pnpm db:check` inside the container for the database check.

## Reference documentation

- [VS Code WSL](https://code.visualstudio.com/docs/remote/wsl)
- [Dev Container creation and Compose integration](https://code.visualstudio.com/docs/devcontainers/create-dev-container)
- [Non-root users and UID mapping](https://code.visualstudio.com/remote/advancedcontainers/add-nonroot-user)
- [Docker Desktop WSL integration](https://docs.docker.com/desktop/features/wsl/)
- [Compose service configuration](https://docs.docker.com/reference/compose-file/services/)
- [pnpm 10 settings](https://pnpm.io/10.x/settings)
