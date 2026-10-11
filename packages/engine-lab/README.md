# Trust-free synthetic engine harness

`@lorcana/engine-lab` is browser-scope and owns the only permitted compiled vendor-kernel import. It exports strict project interfaces and a standalone `./worker` bundle. The web app does not load this worker; lazy integration, Workbox and device/loading qualification remain later work.

`createLabMatch(unknown)` accepts only closed synthetic qualification/advanced-sandbox options, bounded seed and two distinct players. It privately owns the kernel and exposes status/submit/dispose; rewardEligible is always false. Actor/revision/terminal rejection, bounded JSON copying and idempotent disposal are enforced. Malformed data/disposed access throws. The worker owns one match; closed init/status/submit/dispose messages return bounded summaries/results. Active reinitialization rejects; disposal permits a fresh init. Errors become fixed LAB_REQUEST_REJECTED without input/state/error reflection.

`assessEngineAdmission(unknown)` separates calendar phases from qualification. Official rules/sets, ordinary Lab, Collection Play, rewards and hidden-state requests are rejected. Only synthetic-fixture/TST qualification or manipulated Sandbox can pass. CR2.3 effective October16 and Hyperia14 prerelease October16/general release October23 cannot change admission automatically.

See [the runbook](../../docs/runbooks/engine.md) for fields/limits, [ADR0009](../../docs/adr/0009-pinned-engine-qualification.md) for ownership and [validation](../../docs/validation/rule-02.md) for actual Node/upstream/Chromium checks. No official catalog, secure RNG, deterministic replay, real private state or economic game is enabled.
