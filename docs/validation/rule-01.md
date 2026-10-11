# RULE-01 validation

Scope: acquire current official bytes, rules comparison, set/printing and skipped-test inventory. Acceptance requires denominators, available source hashes, explicit missing documents and release-status mapping. Branch: `codex/rule-01-source-inventory`, based on9aa11dfd37b87beb2b8a6fc092ea7f8900450220. [CHG-20261010-008](../changes/CHG-20261010-008.json) owns timestamps/file coverage, failures and final closure. This is source-inventory acceptance; no gameplay requirement is accepted.

## Source and rules evidence

RUN022 passed existing-container intake doctor/verify/bootstrap5/read-only PostgreSQL. RUN025/030 acquired26 explicit public sources:25 acquisitions andone guessed-Hunny404. [Primary metadata](../rules/2026-10-10-sources.json) and [supplement](../rules/2026-10-10-sources-supplement.json) retain URL/issuer/role/language, dates when known, exact request interval, bytes and SHA-256. Raw bytes/text stay ignored. Source retrieval is actual container/network evidence, not a static URL assumption.

| Official mechanics source | Actual bytes / pages | SHA-256 | Effective state as of October10 |
|---|---|---|---|
| CR2.2.0 | 4,448,424 /55 | `5ffa31172fcaae2cbdbf127aebdd54987f01a4e72008812c96556c29d0942d8f` | July9,2026; currently effective |
| CR2.3.0 | 11,515,661 /56 | `8b7a458169978a13b688493d4b24d713bdc8baee32ce5e774b0515079a0b91fe` | October16,2026; published October8 but scheduled |

The [official resources](https://www.disneylorcana.com/en-US/resources) now links the [October PDF](https://files.disneylorcana.com/CRUpdate_EN_Oct-2026.pdf). Earlier planning download403 and web-reader size failures are superseded for local acquisition by actual successful bytes, not erased. Tournament document effectiveJuly14/listingJuly23 are separate. Unknown document versions/dates remain null. Pack Rush, Coconut/supplement, notes9–13, correction guidelines and CORE judge reference are acquired as distinct authority roles. Product pages and community catalog are not mechanics certification.

[Active v2 comparison](../rules/2026-10-10-rules-diff-v2.json) inventories **489→504 numbered leaf IDs**, **16 added**, **1 removed**, **234 changed-text hash candidates**. Those candidates include extraction/layout contamination and are not234 proven semantic changes. The official CR2.3 update summary identifies counters/ink drops (§1.13), continued play across zone moves (§4.3.2), enters effects (§4.3.3/6.7.9), location move selection/no-op (§4.7.1/.2), multiple may (§6.1.4.2), simultaneous multipart effects (§6.7.6.1), characteristics (§6.7.7), nonstacking keywords (§8.1.2) and Adventurous (§8.16), plus listed clarification rows. Treat these as RULE-04 scenario inputs; no engine coverage is asserted.

The initial [all-zero diff](../rules/2026-10-10-rules-diff.json) from RUN034 is preserved as **superseded/unqualified**. It stopped at the table-of-contents Glossary. RUN035 reproduces the failure; RUN036 fixes it and requires nonempty rule denominators. PDF.js font warnings on some other notes/guides are retained in RUN025; text extraction cannot replace page/manual semantic review.

## Catalog denominators and release mapping

[Catalog artifact](../rules/2026-10-10-catalog.json) joins actual official public gallery literals with community LorcanaJSON format2.4.0/generatedOn `2026-10-10T17:54:17` (publisher supplies no timezone; none invented).

| Quantity | Count and denominator/limit |
|---|---|
| Official gallery entries | 3,558 including2 Ink Drop supply/counter entries; **not3,558 playable cards** |
| Official deck-building keys | 2,784 distinct non-null keys across gallery entries; not product IDs/admitted cards |
| Community printing records | 3,556; all3,556 source IDs found in official gallery, zero community-only; the2 official-only entries are supplies |
| Provisional full-English-name identities | 2,789 across3,556 records; all printings mapped exactly once; five-count difference from official keys requires canonical reconciliation |
| Released-set records | 3,099/3,556 from community set dates; individual promo availability kept separate |
| Revealed/unreleased records | 257/3,556, Hyperia14; official prereleaseOctober16/everywhereOctober23, both future at inventory date |
| Promo release unverified | 200/3,556; source set date cannot prove each promo's availability |
| Project certification | **0/2,789 provisional identities**, no game/catalog admission |

Every set/printing row is inspectable in JSON. Sets1–14 have records; sets15/16 have zero and incomplete/unknown future metadata. Q1/Q2/Q3 are separate scenario products; Q3 has38 printing records and community `hasAllCards=false`. The official [Great Hunny Rescue page](https://www.disneylorcana.com/en-US/product/great-hunny-rescue) reports October2 release; its50-card deck describes physical copies, not50 unique identities. No cooperative or constructed eligibility follows from these counts. Prerelease/general-sale/promotional dates need policy qualification for launch admission.

## Pinned upstream source and static tests

Pin **53a79413c58678b1c50dde57e71de5c123132716** retained. The root GitHub recursive tree was truncated and refused as a denominator. The complete scoped package tree **1e7e94e1a7fb5593060f30384f21b073da9ab906** reports `truncated=false`. RUN026 acquires an inert sparse checkout; inventory checks verify every11,231 scoped Lorcana blob against Git SHA-1 before AST inspection. SHA-256 fingerprints of test files and per-file flagged declarations accompany the [inventory](../rules/2026-10-10-upstream-tests.json).

| Quantity | Count / denominator |
|---|---|
| Test/spec files | 3,289/11,231 scoped blobs |
| Static test declarations | 10,764 across3,289 files; suites tracked separately |
| Skipped declarations | 50/10,764, including inherited skipped suites |
| Todo declarations | 529/10,764 |
| Parameterized declarations | 8/10,764, not expanded runtime cases |
| Conditional / focused detected | 0/10,764 for each AST modifier class; aliases/generated wrappers may require review |
| Literal definition objects | 3,131 across sets001–013, per-set rows in JSON; not3,131 certified identities |
| Candidate files without literal definition | 67 paths including barrels/helpers and commented legacy references; not67 missing cards |
| Upstream executed / project certified | **0 executed tests /0 certified cards** |

Modifier totals overlap. Source/test existence is not a pass result or proof of current rules. Imported aliases, generated registrations and tagged-template factories can need manual expansion. RUN032 caught symlink dereferencing: Git hashes the link target string. RUN033 reproduces the error; corrected `readPinnedBlob` verifies inert link bytes without dereferencing. No upstream package installed, code imported or test executed.

## Missing documents and certification gates

Notes1–8 and Hyperia14, full three scenario handouts, localized source coverage, individual promo release evidence, identity-key/name reconciliation and complete future-set material remain unqualified. The resource/FAQ/product searches did not find all materials; this means **not acquired**, not proven nonexistent. Community completeness flags are assertions. These gaps block affected certification/admission and remain RULE-02/04 inputs. The source acceptance criteria explicitly require gaps to be flagged; they do not authorize inventing complete current-rules coverage.

Original548 requirements/33 groups/20 optional flags, D04 launch choice and original source/dependency/certification registers are preserved. No product requirements/card rows promoted to accepted. Accepted hosting/engine placement and D07 remain unchanged. PDF.js6.4.299 is root research tooling, not a new product engine/dependency baseline.

## Execution and final-source qualification

Intentional red synthetic runs: RUN023/027/029/033/035/037. Subsequent passes: RUN024/028/031/036/039. RUN038 retains a test fixture's wrong-source binding: it rejected at the hash guard before the intended effective-date guard; the fixture now binds the future source hash correctly. RUN039 passes19 focused regressions, all acquired raw/text hashes and exact catalog/rules/test regeneration. Failed logs/records stay append-only; individual green checkpoints do not prove the later whole executable fingerprint.

Final frozen clean install/build/type/lint/test, relevant baseline, documentation/private-file/listener closure and source reproduction receipts are recorded below and in CHG008 when executed. Ordinary clean/CI checks require no ignored research cache; byte verification deliberately does. No new Windows/device/headless/provider/load/engine execution evidence is claimed by this source-only task. RULE-02 owns minimal vendoring/license/patch ledger, upstream execution and Node24 compatibility; RULE-03/04 retain RNG/replay and rules/card certification.

### Final-source results — October10/11 UTC

Status: **RULE-01 inventory acceptance verified, source gaps flagged.** Every backlog acceptance element has inspectable evidence: source bytes/hashes, nonempty rules diff, per-set/printing and skipped/todo denominators, dated release mapping and explicit missing-document/identity/localization gates. Original game requirements remain unaccepted.

| Run | Category and actual result |
|---|---|
| RUN-20261010-039 | Static:19 focused synthetic regressions, all acquired raw/text hashes and exact generation pass |
| RUN-20261010-040 | Existing container: frozen install, doctor7, config/docs/ownership/build/type/lint, **113 mixed foundation checks** (94 existing+19 inventory), bootstrap5, authenticated bootstrap DB, four managed test identities and five live DB integration checks pass |
| RUN-20261011-001 | Container/network: real installed Linux license/advisory graph **203 components**,11 published root notice-file gaps, zero reported advisories at retrieval; supported secret patterns and known private values absent from current source/full Git history |
| RUN-20261011-002 | Container clean source-only copy: fresh frozen203-package install and full113 foundation checks pass **without research cache, credentials, Git or live DB** |
| RUN-20261011-003 | Static container observation: same final fingerprint across039/040/001/002; actual original scope/config/archive byte preservation, ignored0600 UID1000 private files, public known-secret scan, no listeners5173/3001/3002; all acquired bytes and exact inert upstream regeneration pass |

Final executable fingerprint: `117c9248f08fc7ba28710152bd96f6edc440bdc5d44551e368c931da450500c8`. Foundation113 includes simulated NullEngine, mocked database recorder/CI launcher and deliberate safety mutations; those do not become real rendering/persistence/hosting evidence. DB integration5 is a separate actual test-database result, not a new recreation/backup drill. The known Vite large-renderer-chunk warning remains. No new headless browser, Windows, GPU/touch, provider, upstream engine or production run occurred. F-WEB/F-CI preserve historical browser/full pipeline qualification explicitly while fresh local foundation/security evidence remains linked. Final documentation/canonical-byte/format closure is retained in CHG008 and subsequent static receipts.

Canonical closure: RUN-20261011-004 passes current/full-history documentation, all677 canonical staged/live file byte comparisons, identical executable fingerprint, canonical configuration/syntax/offline inventory and focused19 checks, plus staged formatting excluding immutable raw logs. The temporary source archive was removed. No unrelated application rerun is inferred from this static result. Finalized documentation receipt/commit closure remains in CHG008.

## Independent audit and integration — 2026-10-11 UTC

Claude Code reviewed commits 9aa11df (BOOT-04 decision review) and 6f02557 (this inventory) on the Director's instruction before integration ([CHG-20261011-001](../changes/CHG-20261011-001.json)). Verdict: every backlog acceptance element is present and independently reproduced. The Director's BOOT-04, engine-placement and D07 decisions are unchanged.

| Run | Local Dev Container result |
|---|---|
| RUN-20261011-006 | `pnpm rules:check` passed (offline metadata integrity) |
| RUN-20261011-007 | `pnpm test:rules-inventory` passed (19 focused regressions) |
| RUN-20261011-008 | `pnpm rules:verify-bytes` passed (every acquired raw/text hash) |
| RUN-20261011-009 | `pnpm rules:reproduce` passed (byte-for-byte regeneration from the cache and pinned inert checkout) |
| RUN-20261011-010 | `pnpm verify:foundation` passed: 113 checks counted in the log (89 Node tests and 24 Python tests) at fingerprint `117c9248…` |
| RUN-20261011-011 | Fresh download of the official CR 2.2.0 and CR 2.3.0 PDFs matched the recorded byte counts and SHA-256; the resources page links the October update |

Cross-checks against earlier independent cloud measurements of the same pin: 3,131 literal definitions plus 67 non-definition files equal the 3,198 card files counted in sets 001–013, and the 3,289 test files equal the per-package counts. The 529 todo declarations are mostly the upstream UI simulator's (459). Engine and card packages contribute 70 todo and 27 skipped declarations, which are the ones relevant to RULE-02/04.

**Time-sensitive inputs for RULE-02/04:**
- CR 2.3.0 takes effect 2026-10-16.
- Set 14 (Hyperia City) has prerelease 2026-10-16 and release 2026-10-23.
- The pinned upstream defines sets 001–013 only and references CR 2.0.1.

Gameplay certification still requires the RULE-02/04 work.
