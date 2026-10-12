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

## Current RULE-02 continuation — 2026-10-11 UTC

Earlier reserved-engine/no-upstream-execution and artifact-v2 statements above describe their dated checkpoints. [Engine qualification](../validation/rule-02.md) and [ADR0009](../adr/0009-pinned-engine-qualification.md) now define the minimal pinned synthetic Node/Lab-worker implementation, development-only Bun, current artifact v3 and source-matched results. Rules-data/domain/testkit remain reserved. Secure randomness/replay, official rules/cards and wire privacy remain RULE-03/RULE-04/PLAY-02 gates; rewarded/private/ordinary Lab/Collection play stays blocked. Hosted RULE-01 main1925127 passed run38098551762 (downloaded artifact RUN-20261011-019); current RULE-02 hosted/device/production evidence is not inferred. Full548 scope/20 optional flags and provider/D07 decisions remain unchanged.

## Current RULE-03 continuation — 2026-10-12 UTC

RULE-03 supersedes the linked RULE-02 engine/RNG baseline; prior executed tables and decisions remain dated source checkpoints. [ADR0010](../adr/0010-secure-randomness-replay.md) now governs server crypto randomness/captured clocks and completed private reconstruction:347 selected files,28 reproduced patches, unchanged27 test files; the compiled kernel accepts explicit providers, the server owns Node crypto and browser Lab owns seedrandom. Actual compiled kernel/adapter bytes bind replay identity; release identity binds separate server/Lab roots. [RULE-03 validation](../validation/rule-03.md) records current checks and limits. Director D10 permits completed seeds/full private replay only for participants/authorized auditors; no delivery endpoint is supplied. RULE-04 official behavior, PLAY-01 durability, PLAY-02 privacy and AUTH/REPLAY recipient enforcement remain pending. All ordinary Lab/Collection/reward/private/official play stays blocked. CR2.3 October16/set14 October16/23 never auto-admit. The Director reports RULE-02 audited/merged/passing on GitHub; no fresh RULE-03 hosted, Windows/device, capacity/restore or production result is inferred. Prior executed evidence,548 requirements/20 optional flags, BOOT-04 providers/$25 and D07 remain unchanged.

## Current RULE-04 continuation — 2026-10-12 UTC

[RULE-04](../validation/rule-04.md) now implements the representative sourced scenario/template foundation, including Director-approved Adventurous and ink-drop counters. Current pin53a79413 is unchanged;346 selected files/303 runtime source-type-data files/53 reproduced patches/27 unchanged upstream tests. The new Node fixture bridge is test-only and cannot enter production apps or release exports. The per-card template cannot promote generic fixtures to tested cards. RULE-04 representative acceptance is locally verified:91 sourced scenarios,241 project checks,338 unchanged upstream passes/one inherited skip,2 injection checks, exact reproduction, Chromium and clean/canonical proofs at fingerprint5f405778. Isolated CI089/091 completed all child checks but both receipts failed clock_changed; no new passing CI artifact/timing qualification is claimed. The Director's leave-environment instruction remains; no maintenance or threshold change. Final preservation proof RUN092 passes; native documentation closure is recorded in CHG003. See [operation](../runbooks/rules-certification.md) for commands, chooser/slot/counter contracts and exact limits. All ordinary Lab/Collection/reward/private/official admission stays closed; PLAY-01 durability, PLAY-02 privacy, AUTH/REPLAY delivery and full card/rules certification remain. CR2.3 October16/set14 October16/23 never auto-admit. Earlier source-specific result tables above are preserved. Hosted RULE-03 main82849f4 succeeded in run38276253829 (16:16:36–16:22:18 UTC), with public metadata freshly acquired in RUN-20261012-047; no hosted RULE-04, Windows/device, load/restore or production acceptance is inferred. BOOT-04 providers/$25/D07, D10 recipients and548 requirements/20 optional flags remain.
