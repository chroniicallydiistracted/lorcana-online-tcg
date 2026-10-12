# BOOT-04 evidence and acceptance boundary

## Current status (2026-10-10 UTC)

BOOT-04 decisions are **final** in the [decision worksheet](../plans/2026-10-10-boot-04-decision-worksheet.md) with [ADR0007](../adr/0007-hosting-provider-baseline.md) and [ADR0008](../adr/0008-engine-placement-dependency-baseline.md) ([CHG-20261010-001](../changes/CHG-20261010-001.json), merged to main by [CHG-20261010-002](../changes/CHG-20261010-002.json)). Backlog status: `decision_worksheet_finalized_director_signoff_recorded_deployment_configuration_pending`.

Acceptance evidence required by the backlog is "reviewable projects/services/DNS/secret inventory with current line-item quotes". Worksheet §5–§9 supply it: environments/projects/accounts, host layout, DNS and secret inventory, and retrieval-dated quotes (about $16.17/month month-to-month).

Director sign-off (worksheet §12) and the D07 asset decision were recorded on 2026-10-10 in [CHG-20261010-005](../changes/CHG-20261010-005.json); see the [fan content policy](../policies/fan-content.md).

Still open:
- **Reviewed deployment configuration** (worksheet §13). This includes remote runtime support, because current services refuse to start unless `APP_ENV=local` (`packages/service-runtime/src/lifecycle.ts`).

Nothing was purchased, provisioned or deployed.

| Record | Category / outcome | Scope and limit |
|---|---|---|
| RUN-20261010-001, -002, -003 | Static, passed | `docs:check` / `test:documentation` for the worksheet and merge records, run in a Claude Code cloud container (not the Dev Container) |
| RUN-20261010-004, -005 | Local Dev Container, passed | Intake `pnpm run doctor` and read-only `pnpm db:check` for this reconciliation, at 3687bed |
| RUN-20261010-006 | Local Dev Container, passed | Final `pnpm verify` for [CHG-20261010-003](../changes/CHG-20261010-003.json) |
| RUN-20261010-007 | Local Dev Container, **failed** | `pnpm test:documentation` hit a WSL wall-clock step (wall 3.4 s vs monotonic 5.8 s, `clock_changed`); preserved unchanged |
| RUN-20261010-008 | Local Dev Container, passed | Same suite rerun after the clock was stable (0 ms drift); unchanged source |
| RUN-20261010-009 | Local Dev Container | Final `pnpm docs:check` after these updates; outcome in the change record |

- **Hosted CI:** the Foundation qualification workflow run 38078701491 completed successfully for main 3687bed. This was observed through the GitHub API on 2026-10-10 and is a reported remote result, not a locally verified artifact.
- **Exploratory measurements:** the engine/bundle benchmarks in worksheet §4 were exploratory, outside the evidence recorder. RULE-02 must reproduce them in the Dev Container.
- **Not run:** provisioning, remote startup, real engine load, restore drill and device acceptance.

**Adopted from the preserved Codex research below:**
- the Director inputs (primarily North America; up to 50 concurrent invited-beta players; cost tiers before a ceiling);
- the remote-runtime prerequisite;
- the durable-authority and off-host-restore controls;
- the duels.ink observations.

**Not adopted:** the Hetzner CCX candidates and Dokploy. Its finalized records and runs remain unchanged evidence.

## Signed-off decision review (2026-10-10 UTC)

[Review](../reviews/2026-10-10-boot-04-final-decisions.md) compares the complete final package with intake efe166d and current source/registers. Final choices and deployment-pending status are preserved; no blocker to the separately assigned RULE-01 inventory. [RUN014](runs/RUN-20261010-014.json) preserves clock_changed despite exit0; corrected [RUN015](runs/RUN-20261010-015.json) passes fresh doctor/static-docs/bootstrap5/read-only DB with consistent timing. [CHG007](../changes/CHG-20261010-007.json) owns this review and later static checks. No provisioning, engine/capacity/recovery/device acceptance or new policy-source permission verification.

RUN018 completed corrected assertions/docs/full-history scan with child exit0 but remains failed for clock_changed. RUN019 passes scoped register/installed-claim/configuration/private-file/listener preservation with consistent timing. Original548 scope and current-intake CSV bytes are intact. Final documentation gates are in CHG007; all earlier failures/logs remain unchanged.

## Preserved Codex research checkpoints (2026-10-07/08)

The text below was written by the earlier Codex agent and is retained unchanged; "current" in it refers to its own dates.

October8 continuation: [current single-host proposal](../plans/2026-10-08-single-host-reassessment.md) supersedes the preferred October7 footprint, with [proposed ADR0007](../adr/0007-single-host-beta-proposal.md). This evidence retains previous executed outcomes; BOOT-04 remains in progress.

Status: **research checkpoint; overall task in progress**. Director requested full-vision research and collaboration before provider recommendations. Primarily North America and up to 50 concurrent invited-beta players are supplied inputs; ceiling/recovery/provider/domain/age/operations decisions remain open. The [October8 proposal](../plans/2026-10-08-single-host-reassessment.md), [cost fixtures](../plans/boot-04-single-host-costs.json), [source metadata](../plans/boot-04-single-host-sources.json) and [CHG-20261008-001](../changes/CHG-20261008-001.json) own the current reviewable work. October7 fixtures and CHG005 retain the earlier research checkpoint.

BOOT-04 acceptance is reviewable projects/services/DNS/secret inventory with current line-item quotes. The proposal covers those logical inventories and every 33-group/548-ID scope entry; incomplete domain/regional/account/tax quantities are explicit nulls or qualified allowances. No provider-native deployable definitions, paid projects, actual domains or secret values are supplied. Task acceptance remains pending until final choices/quotes are resolved or explicitly deferred by the Director.

| Record | Category / actual outcome | Scope and limit |
|---|---|---|
| [RUN063](runs/RUN-20261007-063.json) | Existing container, exit0/pass, exact paired clock | Fresh doctor, static/docs/config, five bootstrap tests and authenticated read-only bootstrap PG connectivity at source5819142 |
| [RUN064](runs/RUN-20261007-064.json) | Existing container, static research, exit0/pass, exact paired clock | All548 unchanged requirement IDs/33 groups/20 optional flags; six independently summed fixtures/minimums/unknowns; 34 actual public-source byte hashes; AWS us-east-1 SKU rate and Sentry monthly29 assertions |

Executable fingerprint for these runs is unchanged `8e52e134ba2e4af4195e28c71a93abfe27910fa9b5012ee0550476887e819584`. Logs are sanitized and reviewed. No product code/dependency/configuration changed, so this checkpoint does not requalify or broaden earlier foundation results. Final documentation/history/preservation checks have their own subsequent receipts; consult CHG005 and run records for actual outcomes.

Source retrievals preserve their actual UTC samples, byte lengths/digests and failure metadata. The obsolete Render storage URL returned404 and supplied no quote; the public pricing page supports the conservative storage line. A subsequent extraction attempt stopped on that missing cached file; no runtime qualification was attempted. The in-container `ss` utility is absent, so that shell probe's apparent no-listener lines were invalid and discarded; `/proc/net/tcp{,6}` supplies the corrected preservation check. No undocumented tool was installed.

Public raw provider bodies remain ignored local research cache, not redistributed in Git. A clean checkout retains source metadata, interpreted facts, scope/cost fixtures and official links, but must fetch fresh source bodies for byte checks. Published price/feature statements can change; refresh before purchase and do not infer runtime guarantees from a price page.

Not run: provider provisioning/configuration, payment/domain/DNS, actual stage/beta startup, authenticated sockets, real engine/gameplay/worker queues, 50-player capacity, NA region latency, failure/restore/drain/recovery drills, beta privacy/content authorization or device acceptance. Current executable startup accepts only local mode. Do not bypass it remotely. All548 product requirements and optional flags retain their existing statuses.

Draft metadata correction: [RUN065](runs/RUN-20261007-065.json) failed the documentation gate because added scope labels X04/X06/X07 were placed in fields reserved for original leaf requirement IDs. The draft now uses affected R30 leaves; X01-X07 remain in their owning scope/task narratives and the full-scope cost mapping. No validator, executable or original register was changed to bypass the failure.

[RUN066](runs/RUN-20261007-066.json) subsequently passed the corrected docs/static gates, safe current/full-history known-secret scan, unchanged executable/configuration/dependencies, owner-only ignored private-file checks and actual no-listener check via proc TCP tables. Its source fingerprint remains unchanged; final checkpoint metadata is validated separately. The research checkpoint may be finalized without closing overall BOOT-04 design acceptance.

## October8 single-host research revision

[RUN-20261008-001](runs/RUN-20261008-001.json) passed a fresh existing-container doctor, static/docs/config, five bootstrap tests and read-only PostgreSQL connectivity. Executable fingerprint remains8e52e134ba2e4af4195e28c71a93abfe27910fa9b5012ee0550476887e819584; no product/dependency/runtime change.

[Duels observations](../research/2026-10-08-duels-observations.json) are actual separate Linux Chrome149 public/guest browser research, including one bot turn and visible turn 3 state after reload, then explicit game cleanup. They are not the Director's Windows verification, authenticated whole-site review, server fault durability, hidden-state certification or throughput benchmark. The supplied developer stack/concurrency and the published privacy policy remain attributed reports; backend source/logs/worker counts/hardware were inaccessible. The Network tool exposed no WebSocket frames; a successful connection/resync was observed through sanitized console and delivered code instead. Computer-use failed on the WSL sandbox URI; no Windows interaction occurred. Puzzle execution required sign-in.

[Fresh sources](../plans/boot-04-single-host-sources.json) preserve16 successful primary/public-policy body retrievals and one404 obsolete license URL. The corrected LICENSE.MD describes Apache2.0 outside proprietary directories; qualify the chosen released distribution rather than assuming every feature is free. [Costs](../plans/boot-04-single-host-costs.json) contain four explicit host/IP/storage subtotals and unknown charges; no quote is a capacity or operator guarantee. Static documentary/arithmetic/source checks have separate subsequent receipts in CHG-20261008-001. No provisioning, remote startup, real engine/load/bot benchmark, disaster restore or device acceptance occurred.

RUN-20261008-002 preserves a failed static-check KeyError from using optional instead of the actual source_optional field; the requirements were not altered. Corrected [RUN-20261008-003](runs/RUN-20261008-003.json) passes16 body hashes/expected404, current rate selectors/four cost sums/unknowns,548/33/20 source scope, all 32 preserved task rows and normalized14-surface/eight-asset observation metadata. Four source-retrieval intervals have discontinuous wall samples relative to monotonic duration; raw samples are retained/labeled and exact retrieval intervals remain unqualified. This does not invalidate independently captured body digests or establish provider runtime success.

[RUN004](runs/RUN-20261008-004.json) preserves a caller TypeError after successful documentation gates: the secret helper returns an object, while the scanner needs its values. [RUN005](runs/RUN-20261008-005.json) corrected that invocation and exited0, but the recorder failed it for clock discontinuity; it is not passing acceptance. Review also found over-escaped newline/whitespace expressions in its port probe, so that probe supplied no meaningful listener proof. The subsequent check uses real line/field splitting and retains both failed records unchanged. No validator or clock was changed to obtain a pass.

[RUN006](runs/RUN-20261008-006.json) passes corrected static/documentation gates, current/full-history known-secret scanning, unchanged executable/config/dependency fingerprint, ignored 0600 UID1000 private files and parsing of 15 actual kernel TCP rows with no app listeners 5173/3001/3002. Wall/monotonic samples are consistent; sanitized log reviewed. Only the October8 research revision is finalized. BOOT-04/provider selection, real capacity, restore, authenticated reference and device acceptance remain pending.

[RUN007](runs/RUN-20261008-007.json) passes finalized research documentation inventory, links, history and evidence consistency with a consistent paired clock. Subsequent receipt-reference and stale workflow status wording refresh is documentation-only and receives a final synchronization/check; no new product or hosted CI execution is claimed.

[RUN008](runs/RUN-20261008-008.json) preserves the stale-snapshot gate failure after post-finalization evidence-reference/workflow edits. [CHG002](../changes/CHG-20261008-002.json) owns this documentation-only follow-up, rather than refreshing the finalized001 checkpoint. No passing or source-changing product result is inferred from that failure.

[RUN009](runs/RUN-20261008-009.json) passes the separate002 correction documentation gate with consistent paired timing; sanitized log reviewed. Final status/reference synchronization closes this documentation checkpoint while preserving001 and overall BOOT-04 pending status.

## Current RULE-03 continuation — 2026-10-12 UTC

RULE-03 supersedes the linked RULE-02 engine/RNG baseline; prior executed tables and decisions remain dated source checkpoints. [ADR0010](../adr/0010-secure-randomness-replay.md) now governs server crypto randomness/captured clocks and completed private reconstruction:347 selected files,28 reproduced patches, unchanged27 test files; the compiled kernel accepts explicit providers, the server owns Node crypto and browser Lab owns seedrandom. Actual compiled kernel/adapter bytes bind replay identity; release identity binds separate server/Lab roots. [RULE-03 validation](../validation/rule-03.md) records current checks and limits. Director D10 permits completed seeds/full private replay only for participants/authorized auditors; no delivery endpoint is supplied. RULE-04 official behavior, PLAY-01 durability, PLAY-02 privacy and AUTH/REPLAY recipient enforcement remain pending. All ordinary Lab/Collection/reward/private/official play stays blocked. CR2.3 October16/set14 October16/23 never auto-admit. The Director reports RULE-02 audited/merged/passing on GitHub; no fresh RULE-03 hosted, Windows/device, capacity/restore or production result is inferred. Prior executed evidence,548 requirements/20 optional flags, BOOT-04 providers/$25 and D07 remain unchanged.
