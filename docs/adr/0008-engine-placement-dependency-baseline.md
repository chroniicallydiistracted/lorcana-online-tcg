# ADR0008: Engine placement, runtime, randomness and dependency baseline

Recorded date: 2026-10-10 UTC / 2026-10-09 America/Phoenix. Status: accepted as the BOOT-04 stack baseline. Implementation and qualification belong to RULE-02, PLAY-01…, WEB-01 and AI/Lab tasks. Change record: [CHG-20261010-001](../changes/CHG-20261010-001.json). Affected tasks: RULE-02, PLAY-01, WEB-01, BOOT-04, DOC-01/02. Affected requirements (none accepted): R04.016–R04.029, R12.015–R12.016, R13.015, R15.009, R15.019, R28.008–R28.009, R29.001–R29.005, R30.009. Companion decision: [ADR0007](0007-hosting-provider-baseline.md). Full exact-version tables: [BOOT-04 decision worksheet](../plans/2026-10-10-boot-04-decision-worksheet.md).

## Context

Blueprint §2.3 conditionally adopts `TheCardGoat/tcg-engines` at `53a79413c58678b1c50dde57e71de5c123132716` behind `engine-adapter`. Upstream HEAD was re-checked on 2026-10-09 and is unchanged. It is MIT-licensed, describes Lorcana as feature complete, and contains about 3,200 card definition files for sets 001–013 and about 2,670 card test files. Exploratory measurements were taken in a cloud container, outside the Dev Container and outside the repository evidence recorder. Under the Director's $25/month cap they decide where engine work runs:

- **Node 22.22.0 + tsx:** 24/24 bot games finished with no errors; mean move execution 34 ms (p95 113 ms). Importing source on the fly took 13.5 s.
- **Bun 1.4.2:** mean 25 ms (p95 74 ms).
- **Simulation cost:** a full bot-vs-bot game takes about 4 CPU-seconds.
- **Browser bundle:** minified, the engine alone is 213 KiB gzip; the engine plus every card from sets 001–013 is 1,657 KiB gzip.
- **Determinism:** identical seeds produced 2,154 and 2,271 total actions across runs, because `Math.random` is used outside the seeded source.

## Decision

1. **Keep the fork.** Vendor the pinned minimal closure under `vendor/tcg-engines` with a license and patch ledger (RULE-02). Do not build a second engine.
2. **Isomorphic placement.**
   - The server is authoritative for every match that can award currency, rating, achievements or tournament results, or that hides information: Collection Play, ordinary eligible Lab play, ranked, limited, tournaments, rewarded AI matches and spectating.
   - The browser runs the same engine bundle in a Web Worker for trust-free modes: manipulated Lab states, hot-seat, probability/opening/mulligan/draw simulations, thousands-of-games and AI-vs-AI simulation, puzzles that grant no reward, replay scrubbing, replay-to-Lab, and rules-debug.
   - These modes stay ineligible for rewards (blueprint §9.3). Live player-vs-player private state never reaches a client.
   - The browser bundle loads lazily, outside the 2 MiB initial shell, and Workbox caches it.
3. **Randomness.** Patch every upstream random path to one injected generator. These include:
   - the card-effect shuffle in `move-cards-from-under-effect.ts`;
   - the zone-operations default;
   - first-player selection;
   - instance ID assignment.

   Server matches use a seeded generator built on `node:crypto` from a secret 256-bit seed, disclosed only for replay verification after the match (R29.003–R29.004, R15.009, R28.008). `seedrandom`, an RC4-based generator, remains only for browser Lab use.
4. **Hidden information.** Replace upstream viewer resources, which send the full instance-to-card map to every viewer, with project-owned projections (R29.005). Viewer object IDs must not persist through information-destroying moves.
5. **Runtime.** Production runs on Node 24.21.0 with the engine precompiled into the deployed artifact. Bun 1.4.2 is a pinned CI/development-only runner, so upstream suites run unchanged; it is never a production dependency, consistent with RULE-02 acceptance.
6. **Dependency baseline.**
   - **Keep:** every package in the planned register at its recorded exact version.
   - **Defer:** the `@opentelemetry/sdk-node` exporter.
   - **Add now:** `wrangler` 4.149.0 for Workers deploys, and the runtime engine closure — `mutative` 1.3.0, `@logtape/logtape` 2.0.7, `zod` 4.4.3, `unique-names-generator` 4.7.1, `seedrandom` 3.0.5.
   - **Exclude (declared upstream but not imported by runtime code):** `nanoid` and `object-hash`.
   - **Prune or keep dev-only:** `@logtape/pretty` and `@discord/embedded-app-sdk`.
   - **Choose now, pin at install:** `web-push` (R26), `minisearch` (R03/R20), `recharts` (R16/R21), `openskill` (R10/X01) and `obscenity` (R19/R31). `onnxruntime-web`/`-node` is added only if a trained bot model is selected for R12.003–R12.004.

## Alternatives

- **Server-only simulation** (blueprint §3.3 isolated worker class): one 1,000-game matchup run costs about 67 CPU-minutes, which a $25 host cannot absorb alongside live play.
- **A new engine from scratch:** would re-create roughly 330k lines of card/engine code and 250k lines of tests before parity, then about 240 cards per set.
- **Bun in production:** contradicts RULE-02 acceptance and the Node service stack, which already runs the engine (24/24 games on Node).
- **A full Zod migration of public contracts:** discards BOOT-05's verified TypeBox schemas; Zod stays behind the adapter.

## Consequences

- RULE-02 must prove a Node 24.21.0 precompiled closure, upstream suites under pinned Bun, deterministic replay with injected randomness, and wire-level non-disclosure.
- WEB-01 must keep the lazy engine chunk within the loading budget on the reference networks.
- Renderer (Babylon), React/Vite, Fastify/TypeBox, PostgreSQL/Drizzle, Better Auth and pg-boss stay as selected. Babylon remains subject to the M1 device proof (blueprint §3.2).
- Any change to these choices needs a superseding ADR with comparative evidence.
