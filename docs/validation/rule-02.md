# RULE-02 engine qualification

Branch codex/rule-02-engine-vendor; intake/source commit19251271a635bd94556ce70a6ef0a77e4ccd7b65. [CHG-20261011-002](../changes/CHG-20261011-002.json) records exact times, files, test results and documentation review. [ADR0009](../adr/0009-pinned-engine-qualification.md) and [runbook](../runbooks/engine.md) define behavior and pending play gates. This document is current and retains source-specific checkpoints.

## Implementation checkpoint

Pin53a79413c58678b1c50dde57e71de5c123132716;347 selected files,304 runtime source/type files,27 unchanged upstream test files. Both MIT licenses and original patched bytes are retained. P001 explicit matcher preload and P002 disabled environment trace are the only inherited-source patches. Closure/hashes/Git blobs/selection/extras are checked offline; reproduction against the ignored exact pinned checkout is separate. The full catalog/simulator/generators are excluded.

The standalone compiled kernel runs on Node24.21.0 and in the trust-free Chromium worker. Project-owned declarations and wrappers pass strict TypeScript; upstream source is Vite-transpiled rather than claimed to have a complete strict-type audit. Actual synthetic choose-first, two-player mulligan and concession execute, with actor/revision/terminal/disposal guards. This is no complete game, eligible Lab, server transport, bot performance or current-rules/card certification.

## Captured checkpoints and failures

RUN014–017 pass existing-container doctor/unchanged verify/bootstrap5/authenticated bootstrap PostgreSQL at intake. RUN018 fails on a wrong downloaded-artifact subdirectory; corrected RUN019 verifies the actual hosted RULE-01 artifact with its original v2 verifier. GitHub run38098551762 completed successfully for main1925127, created2026-10-11T00:28:39Z, updated00:32:11Z; job114349486088 ran00:28:42Z–00:32:10Z. Artifact11687003267 reports683092 bytes and digest sha256:ddceeec3a52d588ad24d1d4cf92a8e7b7c802f3607a29cc6f82a0ccd8703e672. [Hosted run](https://github.com/chroniicallydiistracted/lorcana-online-tcg/actions/runs/38098551762). The receipt is local verification of the downloaded artifact; GitHub event times are independently reported metadata. It closes the requested RULE-01 hosted observation, not a RULE-02 hosted run.

RUN020/022/024 are deliberate red tests before implementation;021/023 are green closure/integrity checkpoints. RUN025 exposed missing Lab import permission but is additionally failed for source_changed: editing during evidence execution invalidated its qualification. That procedural failure is retained; no pass is inferred. RUN026 failed a wrong branded helper import;027 built the corrected kernel.028/032 failed browser-purity scans on process references,029 failed premature concession and033 failed missing actor argument. P002 and explicit actor input corrected these;034/035 built kernel/worker and036 passed ten adapter/boundary checks. Unwrapped exploratory builds reproduced the same recorded import issues and are not acceptance receipts.

RUN030/037 each executed **338 passing tests,1 existing skip,0 failures,838 expect calls across27 files** under Bun1.4.2. The existing skipped case is quest.test.ts: temporary lore-loss abilities granted for questing. Assertions and all27 test files are unchanged. The denominator is27 of3289 static test/spec files in the complete RULE-01 scoped tree (27 of220 engine .test.ts files), not an all-card test pass. Dependency pins are the approved project pins, not reproduction of the entire upstream lock. RUN038 passes two actual Chromium Web Workers (opening/mulligan/concession, bounded summaries, malformed mode, disposal, no Node/Bun globals). No real Windows/device observation is implied.

RUN039 is red for reserved engine artifact status;040 passes12 artifact/security/release fixture checks including inner engine digest binding despite outer rehash. RUN041 reproduces a directory-symlink escape and a server adapter bypass;042 passes their corrected regressions. RUN043 passes ordered builds and strict project type checks. RUN044 fails ESLint's control-regex rule;045 passes the equivalent corrected bounded-text check and actual browser/server import rules. These are checkpoints; final source-matched full foundation, clean install, browser and isolated image results are recorded below when executed.

## Temporal and product limits

At the dated October10/11 inventory CR2.2.0 is effective. CR2.3.0 takes effect2026-10-16. Set14 Hyperia City prerelease is2026-10-16, general release2026-10-23. Admission tests distinguish these dates and reject unqualified versions/sets on every side of them. Calendar passage never certifies code. The pin supplies no set14 catalog; no official card definition is imported. RULE-04 must address the sourced2.3 scenarios and missing source/canonical identity gaps from RULE-01.

Director clarification retains RULE-03 secure randomness/replay and PLAY-02 wire-level privacy later in sequence. Rewarded/private/ordinary Lab/Collection games stay blocked. Synthetic server qualification may execute upstream seedrandom/random paths without being eligible play. D04 launch catalog remains pending. Browser worker loading/Workbox, full match flows/per-card coverage, replay, command durability/authentication, real Windows/GPU/touch/loading/CPU capacity and production remain unqualified. No deployed game or economic feature is enabled.

## Independent review corrections and final execution

Read-only review reproduced unbounded sparse/aggregate input, direct/computed/relative/alias server Lab imports and sparse admission sets. Resolver binding was an additional hardening finding. RUN046/048/050/051 preserve the failing regressions; corrected047/049/052 pass. Input copying now bounds depth12,2048 nodes/array elements,128-character keys,4096-character strings and16384 encoded JSON bytes and rejects accessors/symbols/sparse arrays/cycles/repeated references without invoking getters. Server imports resolve owner identity and require the adapter; computed module specifiers reject. Actual Bun tsconfig/package aliases must match selection before tests. Documentation impact edges include boundary/release/artifact/toolchain owners as well as engine files.

Final executable fingerprint: `831cb35f241bab4ac7ff320dc3eafa1fc553e8a1fe93e88b49e43d49412ffb6e`. All following receipts match that source and consistent monotonic timestamps:

| Evidence | Actual result |
|---|---|
| RUN053 | Existing Dev Container complete configuration/docs/build/type/lint foundation:100 Node +24 Python checks passed, plus338 unchanged upstream tests passed/1 existing skip |
| RUN054 | Source-only frozen installation/full same suite passed; no private files, Git, research checkout or prior build/node_modules copied |
| RUN055 | Fresh Dockerfile-built x64 image/13-stage private CI pipeline passed: frozen install, hash-verified Bun1.4.2, complete foundation, eight managed DB identities/five live DB checks, six Chromium foundation scenarios and two engine workers, full-history source/secret/dependency/license scans and artifact creation |
| RUN056 | Exact selected payload/license/patch/lock reproduction from the pinned inert Git checkout passed |
| RUN057 | Separately recorded headless-browser evidence: six actual Chromium foundation scenarios plus two standalone synthetic engine workers passed; owned browser/process/listener cleanup |
| RUN058 | Resumed current-source artifact verification passed: v3 payload identity, release gates, engine/provenance and SBOM |
| RUN059 | Resumed original Dev Container baseline passed: pinned toolchain, five bootstrap tests and authenticated original PostgreSQL connection |
| RUN060 | Current semantic documentation/static workspace, import boundaries and offline vendor/rules checks passed |
| RUN061 | Canonical staged Git archive:1173 files matched live bytes; frozen install/full foundation passed124 project checks and338 upstream passes/1 existing skip; temporary source removed |
| RUN062 | Actual container listener/process checks, public source/receipt/log known-secret scan, private0600/ignored ownership, all48 prior run-log digests and original548/33/20 scope/archive preservation passed |
| RUN063 | Completed-scope documentation/static checks and original requirement preservation passed with the complete checker input retained in its command array |

RUN054's shorthand summary “no private/cache/Git input” refers to the copied source, not an empty tooling machine. Its log reuses pnpm packages and the independently hash-verified Bun tooling cache. Those immutable receipt bytes are preserved; this correction supplies the precise scope. The isolated image separately downloaded all207 installed npm packages, verified the official Bun archive and executed its exact binary; OS build layers may reuse Docker cache. Neither proof claims immutable OS packages, ARM64 execution or production qualification.

CI artifact v3 contains113 payload entries plus outer manifest, twelve workspace builds, actual SQL, vendor lock and both notices. It binds release `foundation-1a4cc0a7536af3009d6e7effa0343d7aa21fab591a63ef7bb3abe28939b1c583` and experimental engine digest `07fd21ff8e6ac2cfa40a2799628cc32007c6e57b240756acfa4d4082e7887e2d`. The SBOM contains208 components (207 installed Linux npm packages plus the exact vendored MIT component);12 published root notice-file gaps remain visible, and the registry reported zero advisories at retrieval. Bun/OS/Chromium are outside that SBOM scope. Artifact hashes are unsigned identity, not authenticity or complete redistribution qualification.

The isolated project `lorcana-ci-9d115e51f03b4255acd61949ba9a986a` used image `sha256:bfd5c179a74fae5636c113cd2c79ec5422e6de2b4b87da1c0b301157031c7dfc`. Host evidence records zero owned resources remaining and its image removed before result publication. The original VS Code container/volume were preserved. The current existing container uses the documented verified temporary Bun runner; the newly committed image is proved by this separate build, not a claimed VS Code rebuild.

The usage-limit interruption affected the agent/review tool, not the running checks. Their actual completed receipts are retained; no missing result is inferred. The [independent review](../reviews/2026-10-11-rule-02-closure.md) found no unresolved Critical or Important findings. The [retained canonical program](rule-02-canonical-check.mjs.txt) preserves the exact ignored helper used by RUN061; RUN062 compares its bytes. The separately attributed [WSL host inspection](rule-02-host-closure.json) confirms zero isolated containers/volumes/networks, removed image and original healthy database/source mounts. Its earlier read-only query failed because the workspace has no Health field; that failure and corrected query are retained without invented execution times. Final documentation/seal results are recorded in the active change. No new hosted RULE-02, real Windows/GPU/touch, full game, secure RNG/replay, privacy or current-rules certification is accepted.

## Scoped acceptance

| RULE-02 criterion | Evidence and limit |
|---|---|
| Pin, minimal source, license and patch provenance | RUN056 reproduces selected payload/lock/licenses/patches; closure and tampering regressions in RUN053/055 |
| Relevant upstream tests reproduced | RUN053/054/055:27 unchanged files,338 passes/1 inherited skip; full upstream lock/catalog coverage is not claimed |
| Adapter compiles/runs under pinned Node without Bun in production | RUN053/054/055 ordered builds/strict owned types and actual compiled Node synthetic flows; Bun is test-only |
| Isomorphic placement behind explicit ownership | RUN057 actual standalone Chromium workers; boundary regressions reject browser/server bypasses; no web game integration or private wire state |
| Version/release qualification remains conservative | Temporal/admission and artifact tests in RUN053/055/058; CR2.3/set14 never auto-admitted; RULE-03/04/PLAY-02 remain pending |
| Repeatable installation/image and review | RUN054 source-only frozen install; RUN055 isolated image/DB/13-stage CI; read-only independent assessment; RUN060 static docs and RUN061 canonical full foundation |
| Protected environment and durable evidence | RUN062 actual container listener/private/log/scope checks; attributed host cleanup report; final documentation/seal receipts in the active change |

## Independent audit and integration — 2026-10-11 UTC

Claude Code reviewed commit 481735d on the Director's instruction before integration ([CHG-20261011-003](../changes/CHG-20261011-003.json)). Verdict: every RULE-02 backlog acceptance element is present and independently reproduced at the same executable fingerprint `831cb35f…`. The Director's hosting, engine-placement and D07 decisions are unchanged.

| Run | Result |
|---|---|
| RUN-20261011-065 | `pnpm engine:check` passed: 347 files and 2 patches against the committed lock |
| RUN-20261011-066 | Importer `--check` against the pinned inert checkout reproduced every payload, license, patch original and the lock |
| RUN-20261011-067 | Separate audit script using `git cat-file` (not the project importer): 345 files byte-identical to pin `53a79413…`, 2 patched files whose originals match the pinned blobs, both MIT notices identical, no extra or missing files; 304 runtime and 43 test-only files |
| RUN-20261011-068 | Compiled server adapter probe: a non-chooser cannot pick the first player, an actor cannot act as the opponent through `playerId`, out-of-turn and judge-only moves are refused, malformed commands and extra options throw, concession ends the match with `rewardEligible:false`, and admission stays closed for CR 2.3.0/set 014 on 2026-10-15, 10-16, 10-22, 10-23 and 2027-01-01 |
| RUN-20261011-069 | `pnpm engine:test-upstream`: 338 passed, 1 inherited skip, 0 failed, 838 expect calls across 27 files under Bun 1.4.2 |
| RUN-20261011-070 | `pnpm test:engine-browser`: two real Chromium workers passed |
| RUN-20261011-071 | `pnpm verify:foundation`: 124 checks counted in the log (100 Node and 24 Python), plus the same 338/1 upstream result |
| RUN-20261011-072 | Host `python3 scripts/ci-local.py`: fresh Dockerfile-built x64 image, all 13 isolated stages passed (frozen install, doctor, foundation with the same 338/1 upstream result, managed database identities and live checks, six Chromium foundation scenarios, two engine workers, source/history secret, dependency and license gates, artifact v3); owned containers, volume and network removed |

Cross-checks: the upstream suites resolve only declared workspace dependencies (no phantom packages), and the skipped quest case is in the unchanged upstream file. The split that leaves randomness/replay to RULE-03, official behavior to RULE-04 and viewer privacy to PLAY-02 matches the backlog's own task definitions. ADR0008's consequence bullet was amended in place; its earlier wording remains in Git history at 1925127, and ADR0009 records the change.

**Inputs for RULE-03.** The vendored runtime still contains these randomness and clock sources (paths under `lorcana-engine/src/` unless noted):
- Shuffles that use `Math.random`: `core/runtime/zone-operations.ts:103` (default when no random function is supplied), `runtime-moves/resolution/action-effects/move-cards-from-under-effect.ts:29` and `lorcana-types/src/utils/shuffle.ts:5`.
- `core/runtime/match-runtime.random-apis.ts:14` derives draws from seedrandom over the caller's seed, which is reproducible but not secret.
- Identifier defaults: `crypto.randomUUID` in `core/types/branded-utils.ts:4`, and `Math.random`/`Date.now` command, match and game IDs in `match-runtime.utils.ts`, `lorcana-engine-base.ts`, `server-engine.ts` and `auth.ts`.
- `Date.now()` defaults in `match-runtime.init.ts` and `match-runtime.time-apis.ts`, which affect replay equality.

**Inputs for WEB-01 and performance work.** The compiled kernel keeps upstream development invariant checks (`NODE_ENV` is defined as development), as ADR0009 states. The synthetic-only kernel is 847 KB minified (184 KB gzip); the full catalog will add to this.

## Current RULE-03 continuation — 2026-10-12 UTC

RULE-03 supersedes the linked RULE-02 engine/RNG baseline; prior executed tables and decisions remain dated source checkpoints. [ADR0010](../adr/0010-secure-randomness-replay.md) now governs server crypto randomness/captured clocks and completed private reconstruction:347 selected files,28 reproduced patches, unchanged27 test files; the compiled kernel accepts explicit providers, the server owns Node crypto and browser Lab owns seedrandom. Actual compiled kernel/adapter bytes bind replay identity; release identity binds separate server/Lab roots. [RULE-03 validation](../validation/rule-03.md) records current checks and limits. Director D10 permits completed seeds/full private replay only for participants/authorized auditors; no delivery endpoint is supplied. RULE-04 official behavior, PLAY-01 durability, PLAY-02 privacy and AUTH/REPLAY recipient enforcement remain pending. All ordinary Lab/Collection/reward/private/official play stays blocked. CR2.3 October16/set14 October16/23 never auto-admit. The Director reports RULE-02 audited/merged/passing on GitHub; no fresh RULE-03 hosted, Windows/device, capacity/restore or production result is inferred. Prior executed evidence,548 requirements/20 optional flags, BOOT-04 providers/$25 and D07 remain unchanged.
