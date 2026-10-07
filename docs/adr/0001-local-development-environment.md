# ADR 0001: WSL2 source with a repository-defined Dev Container

Date: 2026-10-05. Status: accepted local-workspace baseline following the Director's platform choice.

## Context

The Director uses Windows 11 and VS Code, has Ubuntu WSL2, and confirmed Git 2.43.0, Docker Desktop 4.93.0, Docker Engine 29.8.1 and Docker Compose 5.5.1 from the Ubuntu shell. Multiple agentic development groups need a reproducible toolchain and source boundaries. The product is desktop web first with concurrent tablet/phone support.

## Decision

Keep source in Ubuntu's filesystem. Use Windows VS Code with WSL and Dev Containers. Build a Linux development image from the blueprint's digest-pinned Node image, install the exact pnpm release, and attach to a non-root `node` user with UID/GID mapping enabled. Local PostgreSQL is a separate Compose service with its own persistent named volume. It has no published host port; workspace tools use `postgres:5432` on the Compose network. VS Code forwards the browser test port.

Use the committed workspace Compose definition for VS Code. ADR0004 adds a separate disposable persistence-proof Compose definition with its own project/volume. Avoid an additional Docker daemon or host Docker-socket mount inside the workspace. Host Docker commands run in Ubuntu. Executable application package definitions were subsequently implemented in BOOT-01 under ADR 0002.

## Consequences

The environment can be reconstructed from source and pins. Initial image downloads/builds take time and use disk/RAM. The container's installed Debian utility packages follow the apt repositories at build time; this development image is not a fully immutable OS-package build and is not a production image. Pin/prebuild/scan production and CI images through their own qualification work.

The editor's non-root user must match the WSL user's file ownership. The bind mount and named volume are configured to preserve source/data through container recreation; the BOOT-02 disposable recreation proof passed, and a named volume is not a backup. An existing volume retains its original database credentials. Native Windows browsers exercise the actual desktop GPU/browser path; automated Linux browser tests and real phone/tablet checks remain additional evidence.

Docker Compose 5.5.1 is the observed local version; the blueprint's earlier “Compose v2” wording describes the modern plugin/specification baseline, not a requirement to downgrade this working installation. The Director later supplied actual Compose build/start evidence; BOOT-01 separately ran configuration validation and observed the existing services. At that BOOT-01 observation database recreation/persistence proof remained pending; current BOOT-02 status is in ADR0004 and its validation record.

## Qualification update, 2026-10-05

The Director subsequently supplied successful PC build/start, post-create and Windows connectivity evidence for the initial main commit. Fresh BOOT-01 inspection confirmed the running non-root workspace and authenticated PostgreSQL 18.6. ADR 0002 establishes the application packages and updated development image; qualification details distinguish historical, agent and pending device evidence. That BOOT-01 observation did not perform database recreation. ADR0004 and the BOOT-02 validation record describe current scoped proof.
