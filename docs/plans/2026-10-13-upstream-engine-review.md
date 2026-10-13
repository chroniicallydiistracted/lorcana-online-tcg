# Upstream engine refresh before PLAY-01

Authority: the Director requests a complete upstream repository review and incorporation of relevant changes before PLAY work. Intake is clean merged main `a45ac4b3794192d560ab7edca23c4b23a27cc9c2`; implementation branch `codex/upstream-engine-review`. This maintenance does not accept PLAY-01 or open any play/card/economic gate.

## Scope and constraints

Compare the full Git tree/history at our retained pin `53a79413c58678b1c50dde57e71de5c123132716` with observed public main `6de59de1c203827edc1bc6faa1bc6184cd126a5f`. Inspect root tooling, all workspace changes and Lorcana engine/types/cards/tests, as well as shared dependencies. Treat upstream code as inert input until reviewed. The folder named `submodules/lorcana` must be checked for its actual Git representation; never assume that a folder name is a gitlink.

Preserve secure RNG/replay, the 53 reviewed patches, licenses, public/private boundaries, synthetic qualification and current rules profiles. The debug-command authority gap remains an explicit entry requirement for later play. Correct permanent Adventurous loss with a sourced regression within this authorized refresh; source maintenance cannot silently open admission. Retain the no-environment-maintenance instruction and the unchanged clock guard. No purchase, deployment, publication or main merge is included.

## Execution checklist

- [x] Inspect authority, clean branch/HEAD/remote and existing container; capture doctor/verify/bootstrap/original database baseline (RUN-20261013-014).
- [x] Capture upstream revision/history/tree identities and merged RULE-04 hosted CI metadata. Retain source acquisition evidence and per-file dispositions.
- [x] Review the entire change range, including excluded games/tooling, and identify relevant engine/card/shared changes and patch overlaps. Distinguish source review from runtime certification.
- [x] Incorporate compatible changes through the bounded importer, explicit patch ledger and owning source inventories. Preserve rejected/deferred changes with reasons; ask the Director only for a material choice that existing decisions cannot resolve.
- [x] Run focused regressions, original upstream tests, source reproduction, privacy/import controls and appropriate full foundation/clean/browser checks against the final executable fingerprint. Preserve failed attempts. Avoid known futile long isolated CI retries while the clock remains stepped.
- [x] Update every affected current document, native change/map/feature/backlog evidence and handoff; verify canonical checkout bytes and documentation. Prepare a reviewable local commit, reporting accepted/deferred changes and all pending gates.

## Review focus

1. Upstream changes to randomness, actor authority, projections or debug moves must not bypass the adapter or disclose concealed state.
2. Changes overlapping a local patch must preserve the current source-backed rules oracle; upstream fixes can replace local patches only with reproduction and regression evidence.
3. New card definitions and skipped/passing tests remain inventory inputs rather than launch catalog selection or certification.
4. A dependency or build-tool change belongs only in its owning workspace after compatibility review; no broad upstream workspace install is implied.
5. Retained replay/release identities must stay explicit after source changes; old evidence and artifacts remain bound to their original revision.

The repository-owned workflow, record format and engine/rules runbooks govern execution. This is a native implementation task already authorized by the Director; routine reversible choices proceed within these constraints.

Checkpoint: RUN024 captures full source/API/AST review; final RUN035 passes120 scenarios/128 rules checks at fingerprint4ba45cc4. ADR0012 records the59-patch current compatibility decision. Remaining final execution/closure is recorded as it runs.

Closure: source review/integration and all appropriate functional checks executed; full270-project/406-upstream/build/browser/canonical assertions pass, but037/038/039/042/044 retain failed clock receipts.035/036/040/041/043/045/046 are valid passing final-source scoped receipts. Native documentation/patch/source identity is verified; local review commit prepared. Long local timing/current hosted qualification remains explicitly pending under the unchanged environment, rather than silently bypassed. PLAY-01 and every ordinary/card/reward/private gate remain closed.

## Audit and integration note — 2026-10-13 UTC

The Director asked for an independent audit and, once confirmed, publication and main integration before tasking PLAY-01. The Claude Code audit ([CHG-20261013-003](../changes/CHG-20261013-003.json)) confirmed the refresh with RUN-20261013-047..057; isolated CI RUN058 failed on a browser-download network timeout. Hosted CI runs on the published audit branch before main is fast-forwarded. See [validation](../validation/upstream-engine-review.md).
