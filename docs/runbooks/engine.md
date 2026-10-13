# Engine vendoring and qualification operation

Start with [ADR0010](../adr/0010-secure-randomness-replay.md), [RULE-03 evidence](../validation/rule-03.md), [pinned engine evidence](../validation/rule-02.md), [RULE-01 sources](../rules/README.md) and the universal workflow. This is synthetic qualification infrastructure. No real-game ingress, rewards, official cards or hidden-state transport is enabled.

## Container commands

Use the committed Dev Container and frozen installation. New images include pinned development-only Bun1.4.2. On the existing container, `pnpm engine:setup` verifies or installs that exact hash-checked runner in its private temporary cache. It never installs a production runtime or replaces an unexpected binary. Rebuilding VS Code's container is an explicit operator action preserving the database volume; ordinary checks do not rebuild it.

```bash
pnpm install --frozen-lockfile
pnpm engine:setup
pnpm engine:check
pnpm engine:check-randomness
pnpm typecheck
pnpm engine:test-upstream
pnpm engine:test-injection
pnpm test:engine-browser
pnpm verify:foundation
```

`engine:check` runs offline against committed bytes. `engine:check-randomness` checks selected source plus project kernel/facades for ambient entropy and enforces provider ownership; it supplements review/build guards rather than proving arbitrary program secrecy. `engine:test-upstream` requires the exact Bun runner and runs all27 unchanged test paths with the unchanged matcher and explicit Bun-only compatibility provider preloaded. It disables automatic installation and fails on nonzero exit/signal. `engine:test-injection` separately runs project-owned captured-clock/invalid-provider fixtures; those checks are not added to the upstream denominator. Root `pnpm test` runs both through the vendor workspace. Browser proof owns an ephemeral localhost listener, terminates both workers, closes Chromium/listener and needs the pinned Chromium cache. No fixed game-service ports are needed for the worker proof.

For source reproduction, retain the ignored pinned research checkout from RULE-01 and include the supporting agnostic-simulator card-model/bot-core trees in its sparse selection. Do not install or execute that checkout. Run inside the container:

```bash
node scripts/engine/vendor.mjs --source .local/rule-01/upstream --check
```

The importer requires HEAD53a79413c58678b1c50dde57e71de5c123132716 and original100644 Git blobs. An upstream URL moving cannot update this pin automatically. Normal clean installation needs no research cache/network Git clone. New selection/patch changes require explicit review, original bytes and an updated ledger; the normal importer refuses to overwrite an existing vendor tree. Do not delete the lock to bypass this guard.

## Callable ownership

`collectClosure(root,seeds,aliases,allowedExternals,overrides)` returns sorted file/external membership, following literal imports, exports, type imports and dynamic imports with explicit alias mapping. Unknown externals, missing/nonliteral paths and physical root escapes throw. `createVendorPlan(source)` verifies the exact Git pin and returns payloads/lock without writing; `verifyVendor(root,lock)` validates exact bytes, Git identities, patches and membership; `checkVendor()` compares actual imports and selection with the committed lock. The CLI writes only first-time payloads or checks reproducibility. `findBun` verifies version and binary hash; `installBun` verifies official archive and extracted binary before exclusive private-cache creation.

`createQualificationMatch({players,startTimestamp})` is server-only: two distinct bounded player IDs and a nonnegative safe-integer captured timestamp, no extra keys/caller seed. It obtains32 private bytes from Node crypto and owns an indexed HMAC-SHA256 source. Random floats use53 bits; integer bounds1–2^32 use32-bit rejection with128 attempts maximum; draw indices0–1048576 and4096 private outcomes per drain are bounded. Purpose/context/index/retry are domain-separated; source key buffers are copied and disposed, with no claim of full heap erasure. Provider/entropy failure throws without fallback. The frozen handle exposes status/submit/exportReplay/dispose; status adds choosingFirstPlayer and seedCommitment to qualification/revision/ended/winner/rewardEligible:false, never seed/cursor/state/logs.

Submit requires closed actor/expectedRevision/timestamp/commandId/move/input fields. Text is bounded128 (move64), timestamps/revisions safe unsigned integers, captured times nondecreasing. Input copying bounds depth12,2048 nodes/array elements,128-character keys,4096-character strings and16384 JSON bytes; accessors/symbols/sparse arrays/cycles/repeated references and unsafe prototype keys reject. It forces player authority and copies reducer input again before execution. Wrong actor, stale revision and terminal commands return fixed rejection codes; malformed/disposed access throws. Validated rejected attempts are journaled before completion; speculative outcomes are discarded and cursor/state stay committed. Journals cap2048 attempts/2MiB, reserving header space. Overflow restores speculative state and throws rather than accepting an unrecorded transition. Completed journals remain unchanged by late submissions. There is no command deduplication, receipt durability, server session authentication or complete clock policy.

`exportReplay()` rejects live/disposed matches. After completion it returns `{archive,digest}`: private schema1 synthetic-rule03 JSON with setup, secret seed, source/version identity, initialization outcomes/state hash, validated command/result/outcome/checkpoint records and final state/status. Replay identity binds actual compiled adapter/kernel bytes with framed file identities and kernel provenance. `verifyCompletedReplay(archive,trustedDigest)` bounds2MiB/2048 attempts, validates closed/plain bounded JSON and current exact identity/version, reconstructs every outcome/checkpoint/record, and returns only verified/command-count/final-state-hash or a generic error. The separately trusted SHA-256 anchor must originate from trusted storage; supplying both modified bytes and an untrusted digest does not authenticate them. Reconstruction is in-process integrity proof, not a durable restore workflow.

Director D10 permits completed seed/full private replay only for participants and authorized auditors. These are internal server helpers with no endpoint. AUTH/REPLAY must enforce recipient authorization before delivery; PLAY-01 must add transaction/receipt/outbox durability; PLAY-02 must prove viewer projections and wire privacy. Never place archives/seeds in public contracts, logs, browser bundles or artifacts.

`createLabMatch(unknown)` accepts closed qualification/advanced-sandbox synthetic options with a bounded nonempty caller seed and two distinct bounded players. Browser Lab owns seedrandom3.0.5, an explicitly noncompetitive indexed provider, captured clock0 and fixed chooser p1. Its frozen handle exposes status/submit/dispose only; status retains the five bounded public fields with rewardEligible:false. Lab never exports private server replay, state, RNG or snapshot/restore. Disposal drops its kernel reference idempotently. Browser use does not qualify competitive randomness.

`handleLabMessage` owns one worker match. Closed init/status/submit/dispose messages return a bounded summary/result; repeated active initialization rejects. Disposal permits a new initialization. The worker catches errors and returns only LAB_REQUEST_REJECTED; it never reflects input, private state or upstream error text. `assessEngineAdmission` validates date/mode/rulesVersion/sets/rewards/hiddenState and returns allowed/reasons plus scheduled/effective and scheduled/prerelease/general-release phases. Only TST/synthetic-fixture, qualification or manipulated Sandbox without rewards/private state can pass.

The synthetic twelve-card deck per player is deliberately smaller than legal constructed decks. All official identities/rules remain uncertified, including versions2.2/2.3 and sets001–014. The upstream pin references CR2.0.1 and has no set14 definitions. Carry RULE-01's CR2.3 change list into RULE-04; retain missing notes1–8/14, scenario handouts and localized source gaps. RULE-03 supplies the internal randomness/reconstruction prerequisite; RULE-04, PLAY-02 and other AUTH/PLAY/economic gates still block ordinary Lab, Collection, rewards, private and official play.

## Current RULE-04 continuation — 2026-10-12 UTC

[RULE-04](../validation/rule-04.md) now implements the representative sourced scenario/template foundation, including Director-approved Adventurous and ink-drop counters. Current pin53a79413 is unchanged;346 selected files/303 runtime source-type-data files/53 reproduced patches/27 unchanged upstream tests. The new Node fixture bridge is test-only and cannot enter production apps or release exports. The per-card template cannot promote generic fixtures to tested cards. RULE-04 representative acceptance is locally verified:91 sourced scenarios,241 project checks,338 unchanged upstream passes/one inherited skip,2 injection checks, exact reproduction, Chromium and clean/canonical proofs at fingerprint5f405778. Isolated CI089/091 completed all child checks but both receipts failed clock_changed; no new passing CI artifact/timing qualification is claimed. The Director's leave-environment instruction remains; no maintenance or threshold change. Final preservation proof RUN092 passes; native documentation closure is recorded in CHG003. See [operation](rules-certification.md) for commands, chooser/slot/counter contracts and exact limits. All ordinary Lab/Collection/reward/private/official admission stays closed; PLAY-01 durability, PLAY-02 privacy, AUTH/REPLAY delivery and full card/rules certification remain. CR2.3 October16/set14 October16/23 never auto-admit. Earlier source-specific result tables above are preserved. Hosted RULE-03 main82849f4 succeeded in run38276253829 (16:16:36–16:22:18 UTC), with public metadata freshly acquired in RUN-20261012-047; no hosted RULE-04, Windows/device, load/restore or production acceptance is inferred. BOOT-04 providers/$25/D07, D10 recipients and548 requirements/20 optional flags remain.

## Known command-authority gap — audit 2026-10-13 UTC

The pinned runtime registers upstream `manual*` debug moves (for example `manualSetLore`) with `ignorePriority`, and the kernel bridge submits every command with player authority without filtering move names. Through `createQualificationMatch`, a player can therefore set lore and win (audit RUN-20261013-007). Admission is closed, so no real match is exposed. Before any real match, PLAY-01 must add a server-side allowlist of player moves, and Lab should refuse these moves too. See [RULE-04 validation](../validation/rule-04.md).
