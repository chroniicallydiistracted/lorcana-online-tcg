# Representative rules and card certification operation

Start with [ADR0011](../adr/0011-sourced-rule-scenarios.md), [RULE-04 validation](../validation/rule-04.md), [source inventory](../rules/README.md), [engine operation](engine.md) and the universal workflow. RULE-04 is a representative synthetic qualification foundation. The suite and template do not admit cards or games.

## Commands and executable ownership

Run in the existing committed Dev Container:

```bash
pnpm rules:check-scenarios
pnpm test:rules
pnpm rules:verify-scenario-bytes
node scripts/engine/vendor.mjs --source .local/upstream-2026-10-13/repository --check
pnpm verify:foundation
pnpm test:engine-browser
```

The first command runs within `verify`; it checks both rules profiles, exact acquisition/hash identity, numbered citations, unique scenarios and explicit outcome assertions, and validates the empty per-card template. It is offline metadata validation. `test:rules` executes the pinned runtime scenarios and certification negatives under Node24. `test:rules-inventory` retains its separate19 inventory regressions; neither its denominator nor the current selected upstream406 is inflated by new scenarios. The byte command additionally needs the ignored official PDF/text cache and reproduces each numbered leaf hash. Missing caches fail that explicit proof; normal clean checks need no research files. Importer reproduction requires the unchanged inert pin. Fresh official revisions need new manifests/IDs, never overwrites of acquired evidence.

`withScenarioRuntime(callback)` verifies the vendor lock, builds a test-only entry using exact owning dependencies/aliases, passes the compiled fixture APIs to the callback and removes the directory after success or failure. No listener is opened. `createScenarioRuntime(fixture)` constructs the actual runtime with explicit deterministic synthetic providers/time, or loads a declared manipulated main-phase fixture. `setup:true` retains the real constructor flow. Definitions are synthetic; ordinary default cases receive three deck cards per owner when no deck is supplied to avoid unrelated empty-deck losses. The explicit setup case supplies20 per player. This is not a legal-deck/catalog proof.

The returned `submit(actor,move,args,revision?,role?)` executes an actual runtime command with captured time and returns acceptance/code/events. Player is the default. Exactly the source-lifetime regression declares a judge-only manual move to isolate leaving/reentering play; this is simulated mutation, not server authority. Production adapter player commands cannot gain that role. `project(actor)` probes the actual authorized player projection for synthetic restriction assertions; `snapshot()` exposes private state only inside this test bridge; `legal(actor)` invokes actual enumeration. Root scripts/tests cannot be imported by production server modules, and browser module ownership already rejects them. The bridge is absent from workspace exports/release artifacts.

`assertScenarioState(state,expectedIds)` independently checks card conservation, unique physical instances, zone-summary/index agreement, reciprocal unique limbo stack associations and safe nonnegative counters. It detects deliberate corruptions. It is a test oracle, not a production restore validator. Every scenario applies it before and after commands; rejected commands must preserve the entire committed snapshot. The stale-revision negative selects a second still-ready character and requires `STALE_STATE`, so another legality failure cannot satisfy it.

Fixtures name an explicit expected result, applicable rules versions and source-number citations. Cases cover quest/lore/turns; costs/inking/singing/Shift/Boost; combat/Rush/Evasive/Alert/Bodyguard/Challenger/Resist/Ward/Support; bag ordering/optional/deferred/delegated choices; Vanish timing/incarnation/slot identity; Adventurous grant/loss/interactions; counter generation/selection/consumption/ownership/overflow/count semantics. See `tests/rules/fixtures/scenarios.json` for the exact denominator and assertions, rather than treating those categories as full feature coverage.

## Per-card authoring and promotion contract

Copy [card-certification.json](../templates/card-certification.json), governed by [schema1](../schemas/card-certification.schema.json). Never replace its null pins or empty evidence with guessed success. A card draft must identify the printing/canonical identity and definition hash, exact compiled engine identity, rules/format profile, authoritative source hashes/numbered rules, every ability branch, and explicit cost/target/timing/positive/negative/interaction cases. Record expected visible events and private state separately, with an actual fresh source-matched run and independent reviewer before future promotion.

`validateCardCertification(record)` rejects schema extras/unknown status; checks that a template claims no implementation/evidence; checks draft source/rules/scenario references, declared branches, case uniqueness and negative-case agreement; and always returns `admission:false`. Drafts may remain incomplete. **Tested and interaction-certified promotion is currently rejected outright.** The template contract is implemented; an official per-card execution/promotion/admission pipeline is later card work after D04. Do not populate a passing run for a generic fixture and call that card tested. The original `docs/vision/rules_certification_template.csv` retains planning intent.

Keep printed source ownership filters distinct from actual chooser identity. Each delegated-choice printed ability, multi-slot family, optional branch, rule changed in CR2.3, unsupported predicate and card-specific interaction needs its own sourced binding. Neither the test-only harness nor source citations authorize an app to expose private state, choose game rules by date, award rewards, share D10-private seeds or import official cards.

## Closure and next work

Capture meaningful red/green checks through the native recorder, then frozen builds/type/lint, unchanged upstream suites, reproduction and bundle/worker/clean proofs. Refresh every mapped current document, feature/task/requirement edge and uniform CHG; preserve failed receipts and historical checkpoints. Current refresh hosted CI, Windows/GPU/touch/performance, full catalog certification, AUTH/durable PLAY/privacy/economy/replay delivery remain separate. PLAY-01 is the next documented service foundation, with PLAY-02 privacy and later card certification gates retained.

The retained `ENGINE_QUALIFICATION.rulesCertification: pending_RULE-04` tag denotes the still-closed whole-version/card certification gate, not the representative backlog milestone's implementation status. Never clear it merely because this suite passes. `chosenOperationGroups(effect,input)` is a test-visible internal helper: it scopes named slots to their current effect, retains independent choices, ignores prior-target references and never invents a missing second target. The nested queue is ordered by successful payments; omitted entries default cards-first. Declined/unentered, optional/deferred and multiple-recipient card-specific branches need bound certification before any promotion.

## Historical defect — audit 2026-10-13 UTC (corrected by refresh)

The end-of-turn Adventurous check reads printed, temporary and static-grant keywords but not static `lose-keyword` effects, while the challenge check uses the derived projection. After a static loss the character can challenge, yet `passTurn` is still refused with `PASS_TURN_ADVENTUROUS_QUEST_REQUIRED` (audit RUN-20261013-005). The suite does not cover this case. Fix it with a sourced regression before admitting any Adventurous card. See [RULE-04 validation](../validation/rule-04.md).

## Current refresh — 2026-10-13 UTC

The current suite has120 sourced scenarios/128 rules checks at6de59de1. SCN092 corrects the audited static Adventurous loss;093–120 exercise native generation/mandatory costs/events/predicates/lifetimes/suppression/replacement/projection/overflow/reservation/cost-increase/complete-state/legacy parity. Root/state counter field is inkDrops; nested queue remains effectInkDropCounters. The explicit judge fixture and projection probe are test-only. Check [refresh validation](../validation/upstream-engine-review.md) for exact final runs. The prior defect paragraph describes the audited old source; it is no longer the current behavior. Card promotion, player move authority and all ordinary game gates remain closed.
