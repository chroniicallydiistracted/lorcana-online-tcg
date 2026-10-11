# Engine vendoring and qualification operation

Start with [ADR0009](../adr/0009-pinned-engine-qualification.md), [RULE-02 evidence](../validation/rule-02.md), [RULE-01 sources](../rules/README.md) and the universal workflow. This is synthetic qualification infrastructure. No real-game ingress, rewards, official cards or hidden-state transport is enabled.

## Container commands

Use the committed Dev Container and frozen installation. New images include pinned development-only Bun1.4.2. On the existing container, `pnpm engine:setup` verifies or installs that exact hash-checked runner in its private temporary cache. It never installs a production runtime or replaces an unexpected binary. Rebuilding VS Code's container is an explicit operator action preserving the database volume; ordinary checks do not rebuild it.

```bash
pnpm install --frozen-lockfile
pnpm engine:setup
pnpm engine:check
pnpm typecheck
pnpm engine:test-upstream
pnpm test:engine-browser
pnpm verify:foundation
```

`engine:check` runs offline against committed bytes. `engine:test-upstream` requires the exact Bun runner; it runs all27 paths and explicitly preloads the unchanged matcher, disables automatic package installation and fails on nonzero exit/signal. Root `pnpm test` also runs these selected upstream suites through the vendor workspace. Browser proof owns an ephemeral localhost HTTP listener, terminates both workers, closes Chromium and then closes the listener. It needs the pinned Chromium cache installed through the web workspace's Playwright command. No fixed game-service ports are needed for the worker proof.

For source reproduction, retain the ignored pinned research checkout from RULE-01 and include the supporting agnostic-simulator card-model/bot-core trees in its sparse selection. Do not install or execute that checkout. Run inside the container:

```bash
node scripts/engine/vendor.mjs --source .local/rule-01/upstream --check
```

The importer requires HEAD53a79413c58678b1c50dde57e71de5c123132716 and original100644 Git blobs. An upstream URL moving cannot update this pin automatically. Normal clean installation needs no research cache/network Git clone. New selection/patch changes require explicit review, original bytes and an updated ledger; the normal importer refuses to overwrite an existing vendor tree. Do not delete the lock to bypass this guard.

## Callable ownership

`collectClosure(root,seeds,aliases,allowedExternals,overrides)` returns sorted file/external membership, following literal imports, exports, type imports and dynamic imports with explicit alias mapping. Unknown externals, missing/nonliteral paths and physical root escapes throw. `createVendorPlan(source)` verifies the exact Git pin and returns payloads/lock without writing; `verifyVendor(root,lock)` validates exact bytes, Git identities, patches and membership; `checkVendor()` compares actual imports and selection with the committed lock. The CLI writes only first-time payloads or checks reproducibility. `findBun` verifies version and binary hash; `installBun` verifies official archive and extracted binary before exclusive private-cache creation.

`createQualificationMatch({seed,players})` is server-only and always supplies synthetic qualification mode. `createLabMatch(unknown)` accepts a closed object with mode qualification or advanced-sandbox, fixture synthetic, a bounded nonempty seed and two distinct bounded player IDs. It owns a private kernel and returns frozen `status`, `submit`, `dispose` methods. Status contains only mode, revision, ended, winner and rewardEligible:false; no upstream state, instance map, logs or RNG. Submit validates a closed actor/revision/timestamp/commandId/move/input object, bounds JSON traversal (depth12,2048 nodes/array elements,128-character keys,4096-character strings and16384 encoded JSON bytes), rejects accessors/symbols/sparse arrays/cycles and repeated references and forces player authority. Wrong actor, stale revision and terminal commands return fixed rejection codes; malformed data/disposed access throws. Successful input uses upstream move validation. Dispose drops the owned kernel reference idempotently. No command receipt durability, deduplication, state export/reconnect or server authentication is supplied.

`handleLabMessage` owns one worker match. Closed init/status/submit/dispose messages return a bounded summary/result; repeated active initialization rejects. Disposal permits a new initialization. The worker catches errors and returns only LAB_REQUEST_REJECTED; it never reflects input, private state or upstream error text. `assessEngineAdmission` validates date/mode/rulesVersion/sets/rewards/hiddenState and returns allowed/reasons plus scheduled/effective and scheduled/prerelease/general-release phases. Only TST/synthetic-fixture, qualification or manipulated Sandbox without rewards/private state can pass.

The synthetic twelve-card deck per player is deliberately smaller than legal constructed decks. It tests engine mechanics and runtime loading only. All official identities/rules remain uncertified, including versions2.2/2.3 and sets001–014. The upstream pin references CR2.0.1 and has no set14 definitions. Carry RULE-01's CR2.3 change list into RULE-04; retain missing notes1–8/14, scenario handouts and localized source gaps. RULE-03 secure RNG/replay and PLAY-02 wire privacy must pass before their play gates open.
