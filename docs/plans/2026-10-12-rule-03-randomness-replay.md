# RULE-03 secure randomness and deterministic verification plan

Goal: complete backlog RULE-03: no competitive ambient random fallback, replay equality and random-stream access tests. Spec: [ADR0010](../adr/0010-secure-randomness-replay.md), ADR0008/0009, blueprint§2.2/7/13/15 and RULE-02 audit inputs. Execution: native implementation in the existing Dev Container; fresh independent review before closure. Director confirmed restricted completed seed/private replay access. No new deployment, publication or main merge is authorized.

## Constraints and review focus

Node24.21.0/pnpm10.33.0, exact pins/strict peers, inherited test assertions unchanged, explicit reviewed patches/original bytes, crypto only in server adapter, no private fields in public contracts/bundles. Preserve original548/33/20 scope, private credentials/data and all earlier records. Synthetic content only; CR2.3 effectiveOctober16/set14 October16/23 never auto-admit. Current documents/maps/features/status and timestamped receipts must match final code. Focus: concurrent match isolation, rejected speculative draws, biased integer/invalid provider results, changed clocks/code/tampered records, accidental live seed or browser/server boundary escape.

## Tasks

- [x] Seed/stream tests first: closed32-byte seed/indices/domains, fixed vectors, integer rejection, separate identity/gameplay domains and entropy failure. Implement server-only indexed source; production new-match factory never accepts a seed. Inputs: private seed/context/index/upper bound. Outputs: repeatable float/int/opaque ID and bounded private outcome records.
- [x] Integration tests first: ambient Math.random/Date.now/UUID disabled while actual compiled server match opens/mulligans/concedes; independent matches and repeated failed commands retain their committed stream. Patch runtime random/config/init/zone/effect/ID/clock paths, reproduce patch originals/lock, and add explicit Bun-only raw-suite compatibility preload. Kernel receives source/clock; Lab supplies seedrandom; server supplies crypto. Keep selected27 files unchanged.
- [x] Replay tests first: every initialization/command/outcome/state hash reconstructs exactly; reordered/tampered/missing records, wrong seed/code/clock/digest, malformed/oversized input and live/disposed export reject. Implement completed-only internal archive and verifier with trusted digest, strict bounded input/work and no authentication claims. No transport or persistence is added.
- [x] Boundary/build tests first: only server adapter/Lab import the compiled pure kernel; browser cannot import server RNG/replay, app cannot bypass adapter, production kernel has no seedrandom/Bun/ambient randomness. Include source guard and actual standalone Chromium worker checks. Bind build/release provenance; public protocol stays unchanged.
- [x] Final core verification: frozen/clean/canonical installs, full ordered types/lint/project/upstream tests, actual Chromium, pin reproduction, private/scope/history/cleanup and fresh independent review passed. Preserve both isolated image/DB/CI/artifact child runs as failed clock-qualified receipts. Director explicitly leaves the environment unchanged; seal local RNG/replay implementation with that limit and prepare the containing coherent commit.
- [ ] Deferred isolated CI timing qualification: a later authorized stable-environment run must pass the unchanged timestamp guard before accepted artifact/CI proof. No environment maintenance is authorized now.

Files: packages/engine-adapter/src/{random,validation,replay,code-identity,index}.ts and owning tests; vendor/tcg-engines/src/kernel.{ts,d.ts}/build.mjs; scripts/engine/{vendor,patches,check-randomness,test-upstream,upstream-compatibility-preload}; selected patched upstream source/originals/lock; engine-lab facade/dependencies/tests; boundary/build/release/CI tests; current owning docs/map/features/registers/CHG/HANDOFF. Additive artifacts are source-linked and classified. Execution outcomes replace checkboxes only when actually observed; no planned result is a pass.


## Execution outcome

Recorded: 2026-10-12T04:40:15.573Z. Tasks1–4 implemented and source-matched core acceptance verified (RUN024/025/026/027/031). Final task has one explicitly retained limit: isolated CI runs028/029 completed all child checks but their clock evidence failed. The Director declines environment maintenance; no restart/time/threshold change. Canonical/privacy/scope/cleanup evidence032 passed; final read-only assessment/doc/static/commit closure follows. This plan does not imply timing-qualified CI or new official/private/rewarded play.


Final core closure: RUN031 canonical1309-file/frozen/full141 project checks and RUN032 actual private/log/scope/resource proof passed. Fresh independent review found no unresolved material source/doc issue; RUN033 final static/documentation/import/offline gates passed. The Director's leave-environment decision keeps CI timing pending. The local containing commit closes this scoped implementation record and can be identified through Git; no hosted/publication/deployment acceptance follows.


Audit outcome (2026-10-12 UTC, [CHG-20261012-002](../changes/CHG-20261012-002.json)): the deferred isolated CI timing qualification passed in RUN-20261012-043 at the final fingerprint with no environment change. The unchecked task above is kept as written, and this line records its outcome.
