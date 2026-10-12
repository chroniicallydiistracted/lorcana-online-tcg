# Rules and catalog source inventory

RULE-01 inventories sources and gaps before engine qualification. See [acceptance evidence](../validation/rule-01.md). As of **2026-10-10**, CR **2.2.0** (effective July9) governs the dated inventory. Officially published CR **2.3.0** takes effect **October16**. Publication, retrieval, product release and rules effective dates are separate facts. Re-evaluate them before any game release; these dated files never select runtime rules automatically.

| Artifact | Meaning |
|---|---|
| [Primary sources](2026-10-10-sources.json) / [supplement](2026-10-10-sources-supplement.json) | Exact public URL, authority role, language, version/date when known, retrieval interval, byte count/SHA-256 and extraction identity; 26 attempts,25 acquired,one initial404 retained |
| [Rules comparison v2](2026-10-10-rules-diff-v2.json) | Active nonempty mechanical numbered-leaf comparison of the two official PDFs; hashes and changed IDs, without full rules text |
| [Initial comparison](2026-10-10-rules-diff.json) | Superseded unsuccessful interpretation from RUN034: the table-of-contents Glossary stopped extraction early. Its all-zero counts are not accepted evidence; RUN035/036 retain the regression/correction |
| [Catalog](2026-10-10-catalog.json) | Official gallery entries, community printing records, provisional English-name identities, per-set counts and source-derived release status |
| [Pinned upstream inventory](2026-10-10-upstream-tests.json) | Complete scoped tree, test-file/blob hashes, static declarations/modifiers, literal card definitions and unresolved paths; no upstream test execution |
| [Primary retrieval specification](source-specs.json) / [supplemental specification](source-specs-supplement.json) | Explicit inputs discovered during this task; mutable operational instructions, separate from dated acquisition evidence |

Raw third-party PDF/HTML/JSON/text bytes and the inert sparse Git checkout live only in ignored `.local/rule-01/`. They are research inputs, never browser/public exports or product bundles. No full card/rules text or card images are imported by the apps. `rules-data` remains reserved. RULE-02 now implements a pinned minimal engine-adapter/Lab synthetic harness; [its evidence](../validation/rule-02.md) is separate from this dated source inventory. D07 requires provenance/notice/free access and takedown readiness when product assets are later used.

The original [source register](../vision/source_register.json), source-count observations in the blueprint and local indexed Lorcana skill's CR2.0.1 references remain historical inputs. This dated inventory supplements them with actual bytes; it neither rewrites their history nor certifies the upstream engine.

## Operation and callable contracts

Run inside the existing Dev Container from the repository root:

```bash
pnpm rules:check
pnpm test:rules-inventory
pnpm rules:verify-bytes
pnpm rules:reproduce
```

`rules:check` validates committed metadata without network/cache access and runs within `pnpm verify`. The19 focused synthetic regressions run within `pnpm test`; simulated cards/strings and deliberate snapshot mutations prove rejection behavior. Neither command invokes upstream code. `rules:verify-bytes` additionally needs the ignored acquired raw/text cache and rejects missing/changed bytes. `rules:reproduce` needs that cache plus the pinned sparse checkout and compares newly computed JSON byte-for-byte with the accepted dated outputs, verifying every scoped Git blob first. A fresh clean checkout can run ordinary verification without these ignored inputs; missing caches cannot qualify byte/reproduction evidence.

- `acquireSources(specs,cacheRoot)` makes bounded sequential public HTTPS GETs (30s request timeout,40MB body limit), validates JSON/PDF responses, creates content-addressed files exclusively and records acquired/missing outcomes. A completed acquisition command can include missing documents; inspect every row. `extractPdf(bytes)` uses pinned PDF.js6.4.299, disables PDF script evaluation, extracts page text and destroys its loading task in `finally`. Font/layout limitations remain explicit.
- `catalogInventory(cards,sets,asOf)` rejects duplicate IDs/missing names, groups exact NFC/space-normalized full English names and emits printing metadata. It retains unknown individual promo availability and labels future set releases as revealed/unreleased. Community set dates are source assertions, not format admission. `galleryInventory(html)` parses public script literals with HTML/TypeScript ASTs and never evaluates site code; supplies have no deck identity. Names/official deck keys require later canonical reconciliation.
- `testDeclarations(file,text)` counts registrations visible to the AST, inheriting suite skip/focus/conditional/parameterization flags. Commented strings are inert. Modifier counts overlap and parameterized declarations are not expanded cases. Aliases, generated helpers and tagged-template registration can need manual review.
- `assertCompleteTree`, `assertHash` and `readPinnedBlob` reject incomplete trees/changed bytes and read symbolic-link target strings rather than following links. `ruleSections`/`diffRuleSections` hash numbered leaves while excluding glossary/update appendices. Changed hashes are semantic-review candidates; PDF line/header changes can affect them.
- `readSnapshots(root)` reads the explicit accepted dated files. `checkSnapshots(data)` binds source hashes, guards cache paths, verifies uniqueness/denominators/membership/date semantics, and rejects certification/runtime-execution claims. It throws on invalid data; the CLI exits unsuccessfully. It is an integrity check, not proof of prose truth, complete external coverage or authentic unsigned metadata.

For a new source revision, use fresh dated metadata/output paths and a new CHG/run ID. Do not overwrite executed source manifests or silently fetch new bytes into an old hash. Acquisition CLI example (replace the date/sequence with actual values and inspect failures):

```bash
pnpm evidence:run --id RUN-YYYYMMDD-NNN --category container -- node scripts/rules/sources.mjs docs/rules/source-specs.json docs/rules/YYYY-MM-DD-sources-next.json
```

Source inputs move over time. An old public URL may no longer serve the recorded hash; preserve the mismatch and seek a sourced archive/new revision. Acquiring sources alone does not recreate the sparse checkout. RULE-02 must deliberately acquire pin53a79413c58678b1c50dde57e71de5c123132716, verify the complete package tree/blob identities, review licenses/closure and reproduce upstream tests. The exact original acquisition commands/environment are retained in RUN025/026/030.

PDF.js is an exact **root development dependency** under Apache-2.0, compatible with Node24.21.0. Its optional native canvas dependency is research tooling only; no lifecycle build allowance was added (`allowBuilds` remains empty, strict peers retained). Root tooling changes do not amend ADR0008's product dependency baseline. No PDF.js import exists in an application workspace.

## Missing sources and admission gates

The fetched current resources page links set notes9–13. Notes1–8 and Hyperia14 were not acquired; full Deep Trouble, Palace Heist and Great Hunny Rescue scenario handouts were not acquired. Product pages prove product discovery/release claims, not scenario mechanics. The corrected Hunny page is acquired separately while its guessed404 URL remains visible. Lack of a discovered link does not prove a document does not exist. Set15/16 data has zero cards; Q3 is released but community completeness is false. English is this inventory's first locale; localized document/catalog qualification remains pending.

Constructed/Core/Infinity/Pack Rush/Coconut and cooperative content retain separate policy/implementation gates. Tournament/correction/CORE judge references are distinct from game mechanics. Community legality flags, source existence and official reveals grant no queue admission, card ownership, rewards or certification. **All project card identities remain uncertified.** D04 launch catalog and device/art direction decisions remain Director-owned; choose launch scope after inventory and qualification. RULE-02/03/04 own engine integration, private RNG/replay and behavior certification respectively.

## RULE-03 qualification boundary

[RULE-03](../validation/rule-03.md) qualifies synthetic server randomness/reconstruction only. The retained dated rules/catalog inventories and their missing-source/certification gates are unchanged. RULE-04 must derive sourced expected scenarios for the October16 CR2.3 transition and October23 set14 release; no official printing or rules version is admitted from RNG tests.

## Current RULE-04 continuation — 2026-10-12 UTC

[RULE-04](../validation/rule-04.md) now implements the representative sourced scenario/template foundation, including Director-approved Adventurous and ink-drop counters. Current pin53a79413 is unchanged;346 selected files/303 runtime source-type-data files/53 reproduced patches/27 unchanged upstream tests. The new Node fixture bridge is test-only and cannot enter production apps or release exports. The per-card template cannot promote generic fixtures to tested cards. RULE-04 representative acceptance is locally verified:91 sourced scenarios,241 project checks,338 unchanged upstream passes/one inherited skip,2 injection checks, exact reproduction, Chromium and clean/canonical proofs at fingerprint5f405778. Isolated CI089/091 completed all child checks but both receipts failed clock_changed; no new passing CI artifact/timing qualification is claimed. The Director's leave-environment instruction remains; no maintenance or threshold change. Final preservation proof RUN092 passes; native documentation closure is recorded in CHG003. See [operation](../runbooks/rules-certification.md) for commands, chooser/slot/counter contracts and exact limits. All ordinary Lab/Collection/reward/private/official admission stays closed; PLAY-01 durability, PLAY-02 privacy, AUTH/REPLAY delivery and full card/rules certification remain. CR2.3 October16/set14 October16/23 never auto-admit. Earlier source-specific result tables above are preserved. Hosted RULE-03 main82849f4 succeeded in run38276253829 (16:16:36–16:22:18 UTC), with public metadata freshly acquired in RUN-20261012-047; no hosted RULE-04, Windows/device, load/restore or production acceptance is inferred. BOOT-04 providers/$25/D07, D10 recipients and548 requirements/20 optional flags remain.
