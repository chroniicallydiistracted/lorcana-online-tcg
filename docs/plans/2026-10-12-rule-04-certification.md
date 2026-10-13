# RULE-04 implementation plan

Recorded 2026-10-12 UTC. Authority: the Director assigned RULE-04 after independently auditing and integrating RULE-03. Intake is clean main82849f4fd0804cd474e8d7afcd5e935b6ac18700; branch codex/rule-04-certification. Native [workflow](../DEVELOPMENT_WORKFLOW.md), [record format](../CHANGELOG_FORMAT.md), blueprint §6/§15 and backlog RULE-04 govern this work.

## Acceptance and limits

Build a representative **executable** current-rules suite and reusable per-card certification contract. Expected outcomes come from official source revisions, not the engine's present output. Cover setup/turns, costs/actions, combat/objects, triggered bag ordering and pending choices, keyword interactions, negative intents and invalid-state detection. Pin current CR2.2 (effective July9) and scheduled CR2.3 (effective October16) separately. Set14 prerelease October16/general release October23 never grants admission.

This task does not select D04's launch catalog, certify every card or every rules paragraph, expose fixture mutation to apps, enable ordinary/rewarded/private/official play, implement PLAY durability/projections, or accept real devices/production. All original requirements and optional flags remain. Completed private replay disclosure remains D10-restricted. No maintenance/restarts/spending/deployment or main merge.

## Work and proof

- [x] Inspect actual Git/tree/services; read required intake and source/task documents. Preserve credentials/data and discover current containers.
- [x] Capture baseline doctor/verify/bootstrap/original PG as RUN046; refresh official resources/CR2.2/CR2.3/notes13/Hyperia and hosted RULE-03 metadata as RUN047. Retain earlier source manifests and failed timing receipts.
- [x] Build a test-only Node fixture bridge using the same vendored runtime/configuration and exact resolver/patch lock. Compile it into a disposable directory; never export it from product packages or copy it into public artifacts.
- [x] Add source-bound scenario IDs, explicit fixture/actions/expected state or events and negative cases; assert actual runtime command acceptance, conservation and immutability on rejected commands. No skipped expected behavior disguised as certification.
- [x] Add schema-versioned per-card case/template validation and coverage gates: identity/definition/rules/format/engine/source, ability branches, costs/targets/timing/negative/interactions, fresh executed evidence and reviewer. A template or representative suite is not admission.
- [x] Resolve newly discovered upstream gaps with sourced failing regressions and reviewed reproducible patches, preserving original bytes/licenses and unchanged upstream assertions. The Director explicitly selected implementation of both Adventurous and ink-drop counters during this task. This authorizes the representative mechanics foundation; official card admission remains blocked.
- [x] Keep all source-impact documents, feature/task/requirement edges, generated inventory and CHG003 current; add an ADR if engine interfaces/data representation change materially.
- [x] Run focused scenarios/tooling, complete frozen foundation/upstream suites, byte/reproduction checks, compiled browser/bundle boundaries and source-only/canonical checkout checks appropriate to the changes. Preserve red/failed results and inspect logs.
- [x] Obtain independent rules/code review, address findings, capture final documentation checks and resource/private/scope closure, prepare a local reviewable commit and handoff. Hosted RULE-04 and real-device evidence remain distinct.

## Review focus

Source citations must actually support each oracle. Bag semantics must follow Lorcana's owner/turn order, not a stack analogy. Choice ownership and stale/wrong targets must reject without committed mutation. New counter payments must not treat counters as cards/ink or ready reusable resources. Rules dates must be explicit and never auto-enable cards. Certification cannot promote a template, an unexecuted scenario, an omitted ability or a stale engine/source receipt. Test-only state access must stay outside browser/API/replay exports. Patch reproduction and unchanged upstream tests are mandatory after any fork change.

## Outcome

Representative acceptance is locally verified at final fingerprint5f405778 through085/086/087/088/090. Independent source/supplied-code review findings were resolved; final execution remains primary. Isolated child pipelines089/091 completed but both timing receipts failed and no artifact was published; preserve that gate and the Director's leave-environment instruction. Final metadata/resource proof and local commit closure are recorded in CHG003; hosted/device/full-card/play gates remain.

## Audit and integration note — 2026-10-13 UTC

The Director asked for an independent audit and, once completion was confirmed, publication and main integration. The Claude Code audit ([CHG-20261013-001](../changes/CHG-20261013-001.json)) confirmed the representative acceptance with RUN-20261013-001..010 and recorded two follow-ups (Adventurous static-loss end-of-turn defect; manual/debug moves with player authority) in [validation](../validation/rule-04.md). Its isolated CI RUN011 was clock-rejected and RUN012 shows the host clock stepping forward, so CI timing qualification stays pending; hosted CI for the integrated main commit is observed after publication.
