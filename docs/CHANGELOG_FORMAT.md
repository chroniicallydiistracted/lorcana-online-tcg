# Change and evidence record format — version 1

The canonical changelog is the JSON records under `docs/changes`; root [CHANGELOG.md](../CHANGELOG.md) is a deterministic rendered view. Use the same schema and workflow for every developer/agent. Each coherent change records implementations, scope expansions, callable/feature changes, tests with outcomes, edits, revisions, fixes and removals using the `changes[].kind` enum. One entry may contain several kinds. Full changed-file coverage and documentation dispositions are required, not just a prose summary.

## Identity and time

- Change ID: `CHG-YYYYMMDD-NNN`; run ID: `RUN-YYYYMMDD-NNN`. Use the actual UTC date when assigning an ID and choose the next unused sequence. Never overwrite a run. Historical imports may use the import date while preserving a separate event time.
- UTC ISO 8601 ending in `Z` is canonical; precision is seconds or milliseconds. Project display timezone is `America/Phoenix` (UTC−07:00). Use a real clock (`date -u` or `new Date().toISOString()`), not an assumed date.
- `recorded_at` says when the record was created/updated before sealing. `occurred_at` says when a supported event occurred; `event_time_basis` distinguishes `git_commit`, `execution` and `recorded_only`. Unknown event times stay null. Git commit time is not test execution time.
- `source_commit` is the reachable commit at intake/execution. Uncommitted edits are identified by the run's `source_fingerprint` and generated file hashes. The audit imports the two earlier commits retrospectively; it does not invent fine-grained historical function/test times.

## Required change fields

Copy [change.json](templates/change.json) and follow [change.schema.json](schemas/change.schema.json). Replace every placeholder. `actor` identifies the recording developer/agent role without credentials. Retrospective entries do not attribute original implementation authorship; Git retains original commit authors. `status` is `draft`, `finalized`, `interrupted` or `blocked`. Include title, task/requirement/feature IDs, typed change descriptions, full changed-file paths, documentation review dispositions/reasons, verification references/outcomes/scopes, limitations and next actions. Empty arrays mean explicitly none, not omitted work. Use new evidence references for failed reruns. Impact source paths must resolve; typos cannot silently disable reviews. Do not list a document as reviewed without reading and comparing it.

`verification[].outcome` is `passed`, `failed`, `historical`, `reported`, `not_run` or `pending`. `passed` must reference an executed passing run JSON. Historical prose or preparation artifacts use `historical`. Finalized means the entry's scope is satisfied; it does not accept unrelated requirements. Pending tests/device gates remain visible. Committed non-draft entries are sealed and corrected with a new entry.

## Capture actual execution

Run inside the existing Dev Container with free required ports:

```bash
pnpm evidence:run --id RUN-YYYYMMDD-NNN --category container --summary "Ordered application validation" -- pnpm verify:foundation
pnpm evidence:run --id RUN-YYYYMMDD-NNN --category headless_browser --summary "Linux software WebGL foundation smoke" -- pnpm test:e2e:smoke
pnpm docs:sync --change CHG-YYYYMMDD-NNN
pnpm docs:check
```

The command recorder accepts `static`, `container`, `simulated`, `headless_browser` or `production` only for the actual execution. A container suite may include separately described simulated tests. `historical` records are manual imports, not recorder executions. Real desktop observations follow the explicit manual convention below. Pending manual checks use `not_run`, null execution fields and no log rather than fabricated command success.

[run.schema.json](schemas/run.schema.json) requires an argument array (no shell interpolation), execution cwd, environment versions, source identity, times/precision, expected/actual exit and signal, result, failure reason, summary, log path/digest and redaction count. The wrapper preserves command failure and fails on interrupted/timed-out/oversized output or source changes during execution; timeout is 15 minutes followed by bounded termination. Evidence files use exclusive creation. Never put secrets in arguments, metadata or summaries. Known inherited secrets/URI passwords/private keys are redacted before writing; manually inspect output for other secrets.

Logs and run records are durable committed artifacts. Preserve captured output whitespace; exclude `docs/validation/logs/**` from formatting-only diff checks and validate its bytes through recorded digests. File/log fingerprints and source identity bind results to code; they are not signatures or a substitute for independent review. After a source edit, current verified features need new passing evidence matching the final fingerprint. Documentation changes are validated separately; the executable fingerprint includes configuration, scripts, tests and documentation schemas, excluding prose/history to avoid circular evidence dependencies.

## Registries and generated views

[features.schema.json](schemas/features.schema.json) defines implemented/planned/reserved behavior and verified/historical_verified/pending evidence status. [documentation-map.schema.json](schemas/documentation-map.schema.json) defines current/planning/historical/archive/reserved/generated/evidence/history classification with source impact paths; `/**` is the only wildcard. All documentation must be classified. Schema version changes need an ADR/migration and updated fixtures.

`docs/current-state.json` is generated with observation time, source fingerprint, sorted file hashes, change IDs/statuses and callable inventory. Excluded build/cache/Git/private files are documented in the audit. Review source impact reasons before refreshing. Replaying a finalized entry after source/document drift is rejected. A draft may be refreshed at checkpoints; sealing and clean final checks close it.

`pnpm verify:clean` copies the audited project-owned source to a temporary directory, excluding credentials/Git/dependencies/build output, then performs a frozen install and complete foundation validation. It removes the temporary copy on exit and never connects to or recreates the existing database. Stop fixed-port development first. Capture it as container evidence; this is a source-only clean-checkout proof, not device or image qualification.

Initial snapshot creation is an explicit one-time library initialization during adoption, not an operator refresh option. Once recorded, restore a missing snapshot from Git; deletion must not erase review history. Current affected-document reviews use the union of previous and new source-impact edges, including removed/reclassified documents. Sealing compares the earliest available non-draft record (and first evidence bytes) in the current branch ancestry, not just HEAD. Git history rewriting or fabricated logs cannot be prevented by unsigned local records; independent review/CI/attestation remain separate protections.

## Human-only device observations

Use `category: manual_device`, `result: reported` and `observation: {reporter, verdict, steps}` for an actual human/agent observation. Verdict is `passed`, `failed` or `inconclusive`; it is a reported observation, not a subprocess result. Set `command: []`, `expected_exit_code: null`, `exit_code: null`, `signal: null`, `failure_reason: null`. Include OS/browser/device/GPU details in environment/summary, actual running source commit/fingerprint and a durable text observation log with matching run-ID path/digest. Identify unknown device/GPU values explicitly; do not infer them.

Use actual supported start/end times with `time_precision: exact`, or null execution times with `time_precision: unknown` if the Director supplies an observation without exact timing. The report's recorded_at is always the actual record time. No observation yet uses `result: not_run`, unknown/null observation times, no log/verdict and no invented execution. Creation timestamps cannot be in the future regardless of observation time precision. The automatic command recorder refuses manual-device category; create the schema-conforming report from actual evidence.

Reference an actual observation using change `verification[].outcome: reported`, and explain the reported verdict and limits in scope. The Director's authorized confirmation can close the Windows-observation backlog gate and update its evidence link without fabricating exit0 or accepting phone/GPU/production gates. A report from another observer remains clearly attributed and does not imply Director acceptance. Automatic feature verification continues to require executed passing source-matched runs; manual acceptance is an explicit scoped task/requirement disposition, not automatic promotion.

## Wall-clock correction and monotonic duration

Command runs now retain `elapsed_ms` from the monotonic performance clock alongside raw UTC samples, with `clock_discontinuity`. Reversed samples or a wall/monotonic difference over1s produce `time_precision: clock_discontinuous`, `failure_reason: clock_changed`, `result: failed`, even if the command exits0. Raw samples remain untouched; rerun after clock stabilization. Older pre-adoption run records may lack this paired metadata and are labeled by their source/checkpoint. Current-source passing acceptance requires a consistent pair; omission cannot bypass clock qualification.

If an older record predates clock detection and has contradictory samples, preserve its exact bytes under validation/archive, retain its log, and add a new historical import/correction ID with null qualified execution times and a reported outcome. Never repair raw timestamps or retain automatic passing acceptance. RUN017 is the real observed example; RUN018 records its quarantine. Archive bytes are sealed in Git ancestry like other evidence. The cause of the observed clock step is unconfirmed; this policy does not claim a host diagnosis.

The host-only disposable database recorder writes the same run schema/log digest and monotonic timing contract as container evidence. Its environment explicitly identifies WSL Docker orchestration and container runtime/image/project. Use the database runbook for its fresh-ID command; no host Node/Docker socket is introduced into the workspace. Simulated recorder regressions are labeled simulated and cannot qualify persistence.
