# BOOT-01 validation evidence

Director assignment: 2026-10-05 America/Phoenix. Agent execution: 2026-10-06 UTC / 2026-10-05 local. Baseline main `335da7edffea40294b8dcf60ae256524432c350b`, clean at takeover; implementation branch `codex/boot-01-foundation`.

## Executed in the existing Dev Container

The actual Compose project and workspace/postgres containers were discovered before execution. All baseline commands were executed inside the existing workspace as node, preserving source, `.env.local` and the database volume. Node 24.21.0 / pnpm 10.33.0 match the recorded pins. Actual node UID/GID is 1000/1000; read-only PostgreSQL inspection reports 18.6 (Debian 18.6-1.pgdg13+2).

Before changes, existing configuration/syntax verification, one live HTTP connectivity test, four credential-generation/preservation tests and authenticated `db:check` passed. Bare `pnpm doctor` invoked the package manager built-in; the explicitly invoked `pnpm run doctor` then passed all seven project checks. The original scripts retain their behavior.

Application builds, strict type checks, lint and tests passed during implementation. Exact installed dependencies were resolved with strict peers, then frozen install passed. Manifest inventory found no dependency preinstall/install/postinstall scripts; `allowBuilds: {}` remains unchanged. Final clean-snapshot results appear below. The existing environment separately passed project doctor, Compose config --quiet, configuration/syntax and authenticated db:check; the final non-conflicting application suite also passed (exit 0) without stopping the Windows preview. It ran frozen install, verify, typecheck, lint, build, the five bootstrap tests, five package tests, seven boundary/bundle tests and db:check. The two fixed-port process tests and all four browser tests passed separately in the clean image.

## Clean snapshot proof

**Passed, exit 0.** A temporary Git-index tree was archived into a fresh Linux temporary directory with no node_modules, built artifacts, local credentials or Git state. The historical tree is not reachable from normal Git history. [The retained source manifest](boot-01-source-manifest.json) proves that all tracked files except six documentation/register files were identical to reachable foundation commit `8c94b274ebd6ad91223cdb6df085ca0597c107c9`. Later governance changes have their own audit evidence; this proof certifies the foundation source at that commit.

| Clean image command | Outcome |
|---|---|
| `pnpm install --frozen-lockfile` | Fresh nine-project install, strict peers, no authorized dependency scripts |
| `pnpm verify:foundation` | Configuration/syntax, shared declarations, all eight app/package type checks, ESLint, ownership enforcement, actual builds and tests passed |
| `pnpm test` (included above) | Five original bootstrap tests, five contract/scene/service tests and nine boundary/bundle/process tests passed |
| `pnpm --filter @lorcana/web exec playwright install chromium` | Pinned Chromium/headless-shell revision 1243 and ffmpeg installed in the clean container |
| `pnpm test:e2e:smoke` | Four tests passed in 13.2 seconds, including forbidden private-file HTTP 403 and simulated missing WebGL |

The proof ran inside a disposable container from the actually built committed Dev Container Dockerfile, with no published ports or database connection. It supplies supplementary clean-checkout evidence while the actual VS Code workspace was preserved for the Windows preview in that session.

## Boundary and lifecycle regressions

Negative fixtures reject private workspace dependencies/imports, aliases, reexports, nonliteral dynamic imports, builtins, require, relative server imports and JavaScript asset URLs. CSS checks cover url(), quoted imports and both image-set variants; HTML checks cover parsed asset attributes, srcset and inline scripts/styles. Public contract packages cannot depend on server packages. Built browser output is checked for server configuration markers; the existing workspace additionally checks its actual bootstrap password substring without logging it.

Independent review reproduced asset leakage through actual Vite builds before correction. Isolated physical-copy Vite builds now reject module/HTML/JS URL/CSS asset probes. Import enforcement is a package/module/assets boundary, not a whole-program information-flow proof or qualified engine projection.

Real compiled API/match/worker processes are tested for local startup, staying alive and exit 0 on SIGINT/SIGTERM. Local-only execution rejects APP_ENV=production. Worker exposes neither API nor match port. A busy API port makes the development supervisor fail and release siblings while preserving the unrelated listener. Pending initialization and initialization that rejects on abort both call cleanup and exit normally on SIGTERM. The shutdown deadline starts on the signal. Startup callbacks must cooperate with cancellation for resources allocated late.

## Renderer and browser evidence

Babylon NullEngine tests use real scene objects but simulated rendering: four meshes, camera, resize callback, rendered frames, observer disconnection, scene disposal, stopped frames and repeated cleanup across three mounts. They do not establish GPU behavior.

Linux Playwright Chromium 153.0.8010.12 (pinned Playwright 1.63.0 / browser revision 1243) uses SwiftShader. The initial two real web/service checks passed after review fixes: both services ready, actual WebGL context, canvas resize, repeated start/stop, keyboard Enter and unavailable API status. All four final clean-snapshot browser checks passed and cover private filesystem serving and simulated WebGL failure. A separate capture of the live original workspace was visually inspected: both services ready and three neutral shapes rendered. No actual phone/tablet or hardware-GPU performance acceptance follows from viewport resizing or software rendering.

Actual Windows foundation browser: pending Director observation. The connected Chrome tool identifies Linux Chrome 149 and cannot reach forwarded localhost. Windows Computer Use initialization fails with `sandboxCwd is not a local file URI: file:///home/andre/lorcana-online-tcg`. A preview was left available on5173 in that session; the 2026-10-06 audit found no current foundation listeners. The Director confirmed that Windows verification was not performed. Start the foundation again for that pending observation. Historical Director evidence separately proves the original connectivity page reached Windows; it does not establish the new React/renderer check.

## Image and scope

The updated Dockerfile built successfully as `lorcana-boot01-dev-proof:local` (image config SHA256 `a74803b58749c736e812e16e1deb24230be04d2a537acb45d509c8c76ce42bb3`). Linux browser libraries and ripgrep are persisted there. The same additions were applied to the existing workspace for tests; its services and PostgreSQL volume were not recreated. Browser downloads live in the container user's cache and can be installed using the runbook.

BOOT-01 technical acceptance requires clean frozen install, actual minimal apps, strict types and rejected imports. BOOT-01 technical criteria are verified; the requested actual Windows smoke remains pending Director observation, so full Director acceptance is not marked complete. BOOT-02 restricted roles/migrations/test DB/persistence, BOOT-03 CI, BOOT-05 release protocols, and rules/engine/auth/economy/art/device/production gates remain pending. The synthetic lazy renderer still emits Vite's >500 kB warning (about 1.08 MB minified / 262 kB gzip renderer; shell about 510 kB / 156 kB gzip). No performance gate is accepted.

The original 548 requirements retain all optional flags and product/device statuses. BOOT-01 links identify partial prerequisites for relevant original IDs, not completed requirements. No upstream engine/card/art reuse, deployment, visibility change or merge to main occurred.

## Review and retained evidence

An independent reviewer inspected the foundation and reproduced the boundary/lifecycle failures before fixes. Final review reports no remaining critical or important findings; actual positive Vite build and negative module/HTML/JS/CSS/image-set builds, startup cancellation and sibling supervision passed. No review process touched the main checkout or opened its ports.

Durable sanitized prior-session logs now live under [validation/logs](logs/) with [historical run records](runs/). RUN-20261006-901 through908 preserve clean validation, final workspace, preserved checks, image build, earlier validation/fix/browser attempts and final fixes. Exact execution times and invocation/exit metadata are not reconstructed; import timestamps and `reported` outcomes are labeled. The six-file equivalence comparison is recorded in [the source manifest](boot-01-source-manifest.json). Transient /tmp paths are provenance only. The original command/result tables describe the earlier session, not fresh audit runs.

The disposable proof container was removed after successful historical validation. Current container/listener observations and fresh governance checks belong to [the dated project audit](../audits/2026-10-06-project-audit.md) and [handoff](../HANDOFF.md).
