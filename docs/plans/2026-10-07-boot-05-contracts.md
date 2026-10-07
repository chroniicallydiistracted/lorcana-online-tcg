# BOOT-05 Protocol and Release Contracts Implementation Plan

> For agentic workers: implement natively in the existing source-bound Dev Container on the scoped branch. Obtain an independent whole-scope review before completion. The Director explicitly authorized full BOOT-05 implementation; use the repository's committed workflow/records rather than a separate plugin ledger or approval round.

**Goal:** Prove strict public protocol/release contracts, bounded version negotiation, immutable server-side release retention and browser/server separation.

**Architecture:** Public TypeBox schemas and parsers live in `packages/contracts`; server-only release selection lives in `packages/service-runtime`. Existing local HTTP services expose a read-only negotiation diagnostic and the browser consumes it. CI binds the built artifacts to a public foundation release manifest while marking the unimplemented game components reserved. Gameplay, authorization, sockets and deployment remain their documented tasks.

**Tech Stack:** Node24.21.0, pnpm10.33.0, TypeScript6.0.3, TypeBox1.3.35, existing Fastify/React/Vite/Playwright. No new dependencies or credential changes.

**Spec:** BOOT-05 in [initial backlog](../vision/initial_backlog.csv); blueprint §§3.4/6.4/7.2/7.5/15.2; R30.015 is an affected prerequisite, not accepted product scope. Follow [workflow](../DEVELOPMENT_WORKFLOW.md) and [record format](../CHANGELOG_FORMAT.md).

## Global constraints

- Public schemas are closed at every level; no private state, RNG, credentials, arbitrary engine payload or filesystem bundle location.
- Protocol revisions are positive bounded integers; offers span at most two adjacent revisions. Select the highest common revision; incompatible clients receive `unsupported_version`/`upgrade_required`.
- Frames are bounded to16KiB UTF8. IDs have explicit length/character limits; sequence/state versions are safe nonnegative integers. Parsing errors never echo input values.
- Release identity binds web/API/match/worker and protocol/engine/content/rules/database-schema/product/reward revisions. Reserved components are explicit; a game-purpose manifest cannot contain them. Schema validation is not rules/content certification.
- Retained release IDs cannot change content or silently resolve to the active version. No database migration, deployment, reward or match execution is triggered by these helpers.
- Preserve source/data/private files and current pinned installation/build policies. UTC and monotonic receipts retain failures. Windows/hosted/device/production observations remain separate.

## Review focus

1. Unknown nested fields, unsafe numbers/IDs and oversized multibyte frames must fail without input disclosure.
2. Range inversion/oversized offers, mismatched request correlation and a server selecting outside the client's offer must fail closed.
3. Every artifact revision must match its built bytes/source; changing a declared hash or reserved status cannot pass a release check.
4. Mutating a caller's manifest after registry creation, dropping an active-game pin or reusing its ID must not silently change an existing release.
5. Fastify must reject unknown fields/coercion rather than strip them; browser source/builds must reject the server-only registry and private modules.

### Task1: Public schemas and negative fixtures

Files: `packages/contracts/src/{protocol,release}.ts`, `src/index.ts`, `tests/{protocol,release}.test.mjs`.

Interfaces: `parseProtocolRange(unknown)`, `negotiateProtocol(client,server): number|null`, `parseHelloRequest(unknown)`, `parseHelloResponse(unknown,request)`, `decodeClientFrame(string)`, `parseServerFrame(unknown)`, `parseReleaseManifest(unknown)` and TypeBox schemas/types. Foundation messages cover hello, bounded recovery/concede intents, outcome receipts and a counts-only synthetic viewer snapshot; real engine actions/projections are PLAY/RULE prerequisites.

- [x] Write fixtures that assert missing exports fail before implementation; capture the red run. Valid fixtures exercise each discriminant and every outcome; invalid fixtures change nested fields, numeric bounds, IDs, correlation and frame size.
- [x] Implement parsers with `Value.Check` plus range/date/semantic checks, generic errors and safe data-only output. Example oracle:

```js
assert.equal(negotiateProtocol({min:1,max:2},{min:2,max:3}),2);
assert.equal(negotiateProtocol({min:1,max:1},{min:2,max:2}),null);
assert.throws(()=>parseHelloRequest({...hello, privateState:{seed:'synthetic'}}));
```

- [x] Run the full owning contract tests and strict TypeScript build; inspect every result.

### Task2: Server retention and live negotiation

Files: `packages/service-runtime/src/{release,index}.ts`, owning tests, `apps/web/src/App.tsx` and browser tests, foundation boundary/bundle tests.

Interfaces: `createReleaseRegistry(manifests,activeReleaseId)` returns immutable `active` and `resolvePinned(id)`; `assertRetainedPins(previous,next,ids)` rejects removal/content drift. `createHttpService(service,{releaseId,supportedProtocol}?)` defaults to the explicit local foundation identity/revision1. POST `/protocol/negotiate` returns accepted/unsupported/maintenance; invalid input400 contains only a stable code. No auth or actual command handler.

- [x] Capture red tests for live acceptance/incompatibility/unknown fields/coercion/size/drain and registry mutation/missing/corrupt pins before adding behavior.
- [x] Implement retention with validated deep-frozen defensive copies and canonical structural identity; malformed/unavailable pins throw without fallback.
- [x] Implement strict Fastify request validation, generic validation errors and typed replies. Preserve health/readiness behavior and lifecycle.
- [x] Add a semantic client compatibility status with timeout/abort/unmount behavior; exercise real success and routed unsupported/malformed responses.
- [x] Add a meaningful browser import rejection for `@lorcana/service-runtime/release`; inspect actual browser bundles for server registry identifiers/private credentials.

### Task3: Built release identity and CI enforcement

Files: `scripts/release-manifest.mjs`, `scripts/ci/{artifacts,pipeline}.mjs`, `tests/ci` fixtures, root manifest only if a command is needed.

Interfaces: `buildFoundationRelease(root,identity)` derives sorted app-dist path/size/SHA256 hashes and matching source/lock identity; `verifyFoundationRelease(out,release,identity)` checks the archived build subtree. CI artifact creation includes `release-manifest.json`; verification must bind it to the actual bytes, not just its own file hash.

- [x] Capture a red build/report test before implementation; tests mutate app payload and/or release metadata and recompute outer hashes to ensure semantic binding still rejects.
- [x] Generate the foundation manifest from already-built files; declare engine/content/rules/products/rewards reserved. Do not invent playable certification or private bundle locations.
- [x] Include and verify this report in the existing artifact allowlist and pipeline; keep signatures/deployment promotion separate.
- [x] Run CI safety tests and actual isolated frozen/image/database/browser/scan/artifact pipeline after whole-scope review corrections.

### Task4: Current documentation and closure

Files: ADR0006, protocol/release operation docs, BOOT-05 validation, mapped package/app/runbook/qualification/audit/handoff/features/registers and CHG-20261007-002.

- [x] Document exact fields, bounds, compatibility/bump/retention/rollback policy, callable failure/lifecycle behavior and future admission gates. Classify docs and update source-impact edges.
- [x] Maintain full file coverage, reviews and timestamps at checkpoints. Preserve sealed history, original548 requirements and20 optional flags; link partial R30.015 evidence without accepting its full feature.
- [x] Obtain an independent read-only reviewer; correct important findings with retained red/green tests and fresh final-source validation.
- [x] Verify canonical staged Git frozen installation/build/types/lint/tests, real Linux browser behavior, continued bootstrap/live DB, scans/artifact identity and actual cleanup/private/scope preservation. Restore verified feature status only with matching final-source receipts.
- [x] Finalize only BOOT-05, synchronize/check docs, review staged formatting/secrets, create a coherent local commit and confirm clean source. Hand off remaining RULE/UX/provider/device/hosted tasks without inferring acceptance.

Progress: intake RUN20261007-035…038 passed original container doctor/static/bootstrap/read-only DB. Branch `codex/boot-05-contracts`, intake HEAD `1c2580cac2dd8bafb66d45b26e79ce97c86cce80`. Tasks consume shared schemas in order; public package exports remain browser-safe, server retention and artifact construction remain server tooling. No interface conflict is known. The plan and canonical change/run records are the repository-owned ledger.

Review checkpoint: four Important findings corrected with red RUN045/046 and green RUN047; the actual isolated final-source pipeline is running as RUN048. Canonical/data/resource closure and final status remain pending.

Final-source checkpoint: RUN051/052/053 passed isolated foundation94/browser6/live DB5,98-payload artifact binding and real disposable recreation with consistent matching source. Only canonical/resource/documentation/commit closure remains.

Closure: RUN054 canonical staged frozen install/foundation94 and RUN055 actual resource/private/original-scope checks passed against the same final fingerprint. RUN056 seals final documentation/history/secret/format checks. The containing local commit completes this plan; identify its hash through Git. No important review finding is waived. The prior pending checkpoint paragraphs retain the status known at those checkpoints.
