# Server engine adapter

`@lorcana/engine-adapter` is server-only. RULE-02 exports `createQualificationMatch({seed,players})`, ENGINE_QUALIFICATION and assessEngineAdmission through built JavaScript/declarations. The factory rejects extra keys and delegates bounded validation with qualification mode/synthetic fixture fixed. Its frozen handle exposes status/submit/dispose. No raw upstream state, resources, private RNG or viewer map is returned.

Application services must import this boundary; direct vendor/@tcg/raw-engine/Lab imports are rejected. Current HTTP diagnostics do not import it or expose match ingress. Node24 qualification exercises compiled opening, mulligan, concession and disposal without Bun/source loading. The harness is not eligible authoritative play: RULE-03 randomness/replay, RULE-04 official behavior and PLAY-02 projections must qualify before rewarded/private games. Ordinary Lab and Collection Play remain blocked.

Public shapes, errors and lifecycle are in [the runbook](../../docs/runbooks/engine.md); exact evidence in [validation](../../docs/validation/rule-02.md). Synthetic twelve-card decks are not legal constructed decks. Timestamp/command IDs do not implement clocks, durable receipts or idempotency. Build/test follow ordered root commands; no database, auth or network listener is created here.
