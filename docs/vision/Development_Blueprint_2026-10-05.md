# Lorcana Online — Development Blueprint

**Research baseline: 5 October 2026 · Revision 1 · Desktop web primary; tablet and phone developed alongside**

**Purpose:** the product, technical, operational and delivery contract for beginning a new premium, free online Lorcana game. This is a greenfield recommendation derived from the Director’s vision, the supplied checklist, repository inspection and current primary documentation. It is not a proposal to reskin Inkspire.

**Readiness:** sufficient to begin the foundation and qualification work described in M0–M1. Public release is not yet authorized or technically qualified. No new game has been implemented, no production services provisioned, no card suite executed, and no performance or recovery claims measured during this research. Package dependency resolution was tested separately; its precise result is recorded in the package’s qualification report.

**Authority:** this document supersedes technical recommendations in the previous master plan and greenfield brief where they conflict. It retains the original 548 requirements across 33 areas, reproduced in Appendix A and mapped in `requirements.csv`. Optional wording in the checklist remains optional. Recommendations below are working implementation decisions, not new statements of Director approval. Dates, prices and versions are a research snapshot, not perpetual guarantees.

## Navigation

1. Product contract and success criteria
2. Research findings and reuse policy
3. Architecture decisions and technology selection
4. Dependency and installation strategy
5. Environments, providers and provisioning
6. Rules, card data and certification
7. Authoritative matches, networking and recovery
8. Data model, storage and caching
9. Collection, products, rewards and economy
10. Player journeys and feature contracts
11. Visual design, interaction, accessibility and devices
12. AI, simulation and rules assistance
13. Security, privacy, moderation and administration
14. Performance, reliability and operating costs
15. Testing, CI/CD and release management
16. Delivery milestones and team process
17. First development backlog and setup runbook
18. Decisions, risks and release gates
19. Evidence and source register
20. Appendices: all original requirements, coverage and evidence boundaries

## 1. Product contract and success criteria

### 1.1 Confirmed vision

Build a game that feels like an Illumineer’s living tabletop: tactile cards, clear choices, expressive ink, authored lighting, deliberate sound and satisfying collecting. Collection, deckbuilding, play and learning must feel like one coherent game. A practical text/list view is a first-class part of that experience. Atmospheric presentation must not slow repeated tasks or obscure rules.

Desktop browser play is the primary product. Touch layouts, mobile performance and interruption recovery are developed in the same milestones. Native App Store distribution is outside the initial delivery plan. Players never pay to play, obtain cards or use features. Operating costs belong to the project, so expensive optional services must have budgets and quotas.

The Project Director owns creative direction, product scope, spending and release decisions. Engineering owns evidence, implementation proposals, technical correctness and reporting. “Premium” means demonstrated interaction quality, accessibility, reliability and content accuracy; it does not mean choosing the most expensive hosting tier or the largest number of services.

### 1.2 Three environments

| Environment | Card access and admission | State manipulation | Rewards and competitive effects |
|---|---|---|---|
| Collection Play | Format-legal decks using owned eligible printings | None during ordinary play | Eligible matches can grant XP, currency and progression; separate ranked policy |
| Lorcana Lab | All cards available; ownership never gates practice | Ordinary games use the same rules and authority as Collection Play | **Ordinary eligible Lab play may earn virtual currency for Collection Play**, as requested; separate ratings if enabled |
| Advanced Sandbox | Custom decks, constructed states, seeds, branching, hotseat and analysis | Explicitly enabled; every session marked as manipulated | No ranked, tournament or economy rewards; results excluded from public competitive statistics |

The same deck passes independent **format validation → ownership policy → queue policy**. Ownership is not a rule-engine concept. Ordinary Lab play and a manipulated Lab experiment are distinguishable policy modes, not separate implementations of Lorcana. Reward eligibility is captured at match admission and cannot be restored after manipulation.

### 1.3 Scope and completion

The 33 checklist areas remain the complete requested feature families. A first playable slice or public beta is an intermediate milestone, not completion of the vision. Track each original requirement by its Rxx.xxx ID with implementation, evidence, device readiness and acceptance status.

Additional explicit work: X01 multiplayer/teams; X02 cooperative/scenario products; X03 card market/trading policy; X04 operations, costs, privacy and asset provenance; X05 emerging official formats. The official resources page now includes **[Format Coconut] Beta**, a multiplayer format; it requires its own versioned format definition and qualification rather than assumptions based on two-player constructed play [S01, S05]. Its beta status must be visible. Illumineer’s Quest products and multiplayer cannot silently disappear under “every piece of Lorcana.” They are planned later, with product-specific research before implementation.

Separate three catalogs: announced/revealed content, released encyclopedic content, and certified playable content. Every released target card should be searchable and correctly identified; a card is admitted to a competitive queue only when its implementation and relevant interactions are certified. Never advertise complete playable support while substituting text-only cards or silently skipping abilities.

### 1.4 Proposed acceptance outcomes

- A new player can learn, construct a legal deck, enter a match, understand rejected actions, finish, receive rewards and reconnect after interruption without external instructions.
- An experienced player can build any legal Lab deck, prepare matchups, inspect rulings and reproduce a replay position without collection restrictions.
- Collectors can identify precisely which printing and finish they own, understand acquisition history and resume interrupted pack opening without duplicate or lost awards.
- The most crowded supported board remains readable with mouse, keyboard and touch. A complete semantic board offers an accessible route through play.
- Every admitted card and format has source-linked, versioned correctness evidence. Unauthorized clients receive no hidden match identities.
- Deployments and process failures do not corrupt acknowledged moves or settle rewards twice. Broader database-disaster durability is separately qualified.

These outcomes are tested with representative beginners, experienced Illumineers, touch users and assistive-technology users. AI-generated code or screenshots alone cannot establish that the experience is enjoyable.

## 2. Research findings and reuse policy

### 2.1 Repository baseline

| Repository | Revision inspected/refreshed | Intended use |
|---|---|---|
| `chroniicallydiistracted/the-inkspirev2` | `b7b876bac0cdc80c7292608f069c0a64d6373e31` | Product knowledge, flow references, data mappings and individually qualified reusable modules |
| `TheCardGoat/tcg-engines` | `53a79413c58678b1c50dde57e71de5c123132716` | Candidate Lorcana engine, card definitions, tests, terminology and adapter reference |

The default heads were refreshed during this investigation and matched the earlier review. The investigation covered the supplied checklist, prior planning documents, repository structure and selected implementation/build/security-sensitive files. It was **not** a line-by-line audit of every file, nor execution of either complete application. The public monorepo is large; repository existence and test filenames are not proof of complete rules coverage.

Inkspire already integrates the engine family. That integration is background evidence, not the justification for adopting its stack. Inkspire uses Nuxt/Vue/Nitro, PostgreSQL/Drizzle, Better Auth, Redis/BullMQ, WebSockets and Three.js. Its existing collection/product effort is valuable, but the new client architecture, presentation and reliability contracts are chosen independently.

### 2.2 Findings that change implementation

| Finding | Evidence and limitation | Required response |
|---|---|---|
| Upstream viewer resources return the complete match card map regardless of role | `lorcana-server-adapter/src/lorcana-server-engine.ts`, `getViewerResources`; surrounding tests also treat resources as shared. This is a concrete integration risk, not proof that every deployed client leaks a hand. | Build our own viewer projection. Never expose private instance-to-card mappings merely because the board projection hides zones. Test actual wire payloads, logs and replay exports. |
| Random selection has multiple paths | Engine uses seeded randomness, while a lifecycle path uses `Math.random` for first-player selection. | Inject a single audited secure randomness service. Record private random outcomes/state for replay; prohibit unreviewed fallback RNG in production. |
| Candidate persistence patterns need hardening | Earlier Inkspire inspection found mutation before durable commit and lease handling without database fencing; time mode was disabled in the inspected configuration. | Use the durable compare-and-swap commit protocol in §7, explicit clock policies, and process-kill tests. Reproduce findings against any reused module before acceptance. |
| Pack odds are not established by code | Existing hard-coded distributions are implementation choices, not official collation evidence. | Version product configurations, document the evidence or label a custom virtual distribution. Never imply official exact odds without a source. |
| Upstream packages are private source packages | Engine/types/cards rely on workspace and relative links into Lorcana and agnostic submodules. Build scripts do not establish a standalone published Node package. | Vendor/fork a pinned dependency closure; prove Node execution through our adapter. Do not plan an imaginary `npm install @tcg/lorcana-engine` public release. |
| Upstream rules index is older than current official rules | Skill index/memory references CR 2.0.1; current official document is 2.2.0, effective 9 July 2026. | Use current official material as authority. Diff rules and card coverage before claiming current compatibility. |
| Hosting reconnects are not sticky | Render documents reconnection to an arbitrary instance and finite shutdown windows. | Match correctness must survive another host receiving the next command. Durable state and receipts precede acknowledgments. |

### 2.3 Reuse decision

Create a **new private monorepo**. Preserve Inkspire as a reference and possible migration source. Import a module only with identified ownership/licensing, dependency boundaries, tests, security review and evidence that adaptation costs less than a clean implementation of the same contract. Do not migrate incumbent UI composition, global state or queue/economy coupling by default.

The public TCG Engines README excludes its production application/API/auth/matchmaking/gateway/workers/infrastructure. Those systems must be built here; engine availability does not supply an operational online service.

Adopt TCG Engines conditionally behind `engine-adapter`. Keep the engine isolated from authentication, wallets, UI, storage, timers policy and networking. Preserve MIT notices and record the exact upstream SHA. Code licensing does not establish permission for Disney artwork, card text, branding or audio. The official media guide did not expose readable policy contents in this retrieval; asset-use permissions remain unresolved, not implicitly granted by a free project [S06]. Development can use neutral fixtures while the distribution plan is resolved.

If legacy player/deck/collection data is worth preserving, create a separately reviewed migration contract: export source snapshot, map canonical identities/printings, validate counts and ledger totals, dry-run into staging, verify account ownership and reconcile before cutover. Do not import old secrets, silently merge accounts or treat test balances as production entitlements. A greenfield codebase can support a deliberate data migration without inheriting the old UI or service structure.

Maintain `upstream.lock.json` containing source SHA, selected paths, license hashes, local patches and compatibility report. Review upstream changes in a separate branch, run our suites, and promote only a new immutable adapter/engine release. Never pull upstream automatically into production. Avoid maintaining two full engines: implement missing behavior in the qualified fork or contribute upstream when appropriate, while retaining our certification contract.

## 3. Architecture decisions and technology selection

### 3.1 Selected baseline

| Layer | Selection | Reason and qualification |
|---|---|---|
| Language/toolchain | TypeScript 6.0.3, Node 24 LTS, pnpm 10.33.0 | One contract language across services/client; use a verified compatible toolchain rather than blindly taking every latest major |
| Application UI | React 19.3, Vite 8.3, React Router | Strong component/testing ecosystem and clean separation from a continuous renderer; no SSR dependency for authenticated gameplay |
| Table/packs | Babylon.js 9.29, controlled 2.5D/3D presentation | Renderer capabilities fit lighting/materials/animation; must pass a representative desktop and mobile proof |
| Semantic UI | React Aria Components, CSS Modules, authored design tokens | Accessible unstyled primitives with our own visual identity; no purchased dashboard theme |
| Client state | TanStack Query, small Zustand stores; XState for complex local interaction sequences | Server data, transient UI state and interaction state machines have distinct owners |
| Server transport | Fastify 5, HTTP JSON, WebSocket via Fastify plugin | Explicit request schemas, persistent connections and portable Node services |
| Validation | TypeBox 1.x with compatible Fastify provider | Shared JSON-schema contracts; engine’s internal Zod remains behind its adapter |
| Database | PostgreSQL 18, `pg`, Drizzle | Durable relational integrity, migrations, transactions and query ownership |
| Auth | Better Auth, self-hosted with PostgreSQL | Sessions/recovery under our control; authenticate once and authorize every domain operation |
| Background work | pg-boss plus transactional outbox | Durable jobs without adding Redis at the first milestone |
| Assets | Cloudflare R2 with custom asset domain/CDN | Immutable versioned files and private exports; no player records in public buckets |
| Hosting baseline | Cloudflare Pages frontend; Render paid Node services/Postgres for staging and closed beta | Low operational burden and portable services; public durability/capacity decision remains a measured gate |
| Monitoring | Sentry and OpenTelemetry/Pino; metrics derived from structured events | Errors, traces and correlation without raw hidden-state telemetry |
| Tests | Vitest, fast-check, Playwright, Testing Library, axe | Rules/invariants, browser journeys and accessibility, plus real-device/manual evidence |
| Delivery | GitHub Actions, containers, reviewed migrations and release manifests | Reproducible builds and controlled promotion |

This settles the default stack so foundation work can start. It does not mean React is inherently prettier than Vue or Babylon is automatically faster than alternatives. The result depends on authored design and measured rendering. Change a decision through an ADR identifying the failed requirement and comparative evidence.

### 3.2 Alternatives considered

- **Remodel Inkspire:** lowest migration effort, but no demonstrated advantage for the new rendering, boundary or reliability requirements. Retain knowledge and isolated code, not structural obligation.
- **Vue/Nuxt greenfield:** viable and familiar from Inkspire. React/Vite is selected for this plan’s component and test ecosystem, not because Vue cannot deliver the vision. Authenticated gameplay does not require an SSR framework. Public encyclopedia/deck-share pages may use separate prerendering where discoverability merits it, without moving the continuous game renderer into server rendering.
- **Three.js:** viable renderer; Babylon reduces the amount of scene/asset/animation infrastructure we must assemble. Revisit only if the visual proof exposes a concrete blocker.
- **Unity/Godot/native-first:** potentially valuable for future native distribution; currently add a separate UI/runtime and delivery burden while browser-first is confirmed. Do not build parallel complete clients now.
- **Serverless-only backend:** useful for small HTTP tasks, not the baseline for long-lived sockets, bounded engine execution and recoverable match state. Keep services portable instead of relying on provider-specific room state.
- **Redis/BullMQ, Kafka, Kubernetes, microservices per feature:** not required at initial scale. Add a specific component when measurements or isolation requirements justify its operating cost. PostgreSQL is durable authority; cache outages must not decide games or ownership.

### 3.3 Deployment units and boundaries

Use four applications: `web`, `api`, `match-service`, `worker`. They can share domain packages and a database but have separate credentials, resource limits and release controls. `api` owns auth, decks, collection, queues and administration. `match-service` owns command ingress, session projections and engine scheduling. `worker` owns reward settlement, outbox delivery, content processing, email and bounded analytics. Expensive bots/simulations use an isolated process pool and later a separately scaled worker class.

Do not run unbounded synchronous engine work on the WebSocket event loop. Start with a bounded Node worker-thread pool with hard execution deadlines and admission limits; kill/recreate a stuck worker without committing its speculative state. Worker threads provide resource/fault separation, not a security sandbox for hostile code. Production card code is reviewed deployed code, not arbitrary user JavaScript. Sandbox scenario editing is data-only.

```mermaid
flowchart TD
  W["Web client: React and Babylon"] --> A["API: auth and player domains"]
  W --> M["Match gateway and engine workers"]
  A --> P["PostgreSQL: records, receipts, outbox"]
  M --> P
  P --> J["Background workers"]
  J --> O["Private exports and public assets"]
  W --> C["Asset CDN"]
  O --> C
```

The diagram describes responsibility, not permission for clients to access the database or private storage. API/match services use private database connectivity. A notification hints that a version changed; it is never the authoritative change itself.

### 3.4 Workspace layout

| Path | Responsibility |
|---|---|
| `apps/web` | Navigation, layouts, semantic UI and rendering integration |
| `apps/api` | Fastify routes, sessions, domain authorization and admin endpoints |
| `apps/match-service` | WebSocket protocol, admission, engine pool, projections, clocks |
| `apps/worker` | Durable jobs, outbox, email, rewards, scheduled tasks |
| `packages/contracts` | Versioned transport schemas, IDs, reason codes; no private state exports |
| `packages/engine-adapter` | Upstream isolation, deterministic transition API, certification hooks |
| `packages/rules-data` | Source manifests, normalized catalog, legality and ruling references |
| `packages/domain` | Decks, ownership policies, products, rewards, competition and social domains |
| `packages/db` | Schema, migrations, transactions and constrained repositories |
| `packages/design-system` | Tokens, React primitives, interaction states and stories |
| `packages/presentation` | Babylon scenes, card materials, animation choreography and audio |
| `packages/testkit` | Scenarios, fake clock/RNG, protocol clients and fault injection |
| `vendor/tcg-engines` | Pinned minimal compatible upstream closure and patch ledger |
| `infra`, `docs/adr`, `docs/runbooks` | Deployment definitions, decisions and operating procedures |

Use import boundaries: browser packages cannot import `db`, private RNG, session secrets or authoritative state internals. Public contracts expose viewer data, not serialized engine types. Type-check these boundaries in CI.

## 4. Dependency and installation strategy

### 4.1 Pinned research baseline

The companion `dependencies.json` and qualification fixture contain exact direct package versions. They are a planning baseline, not a claim that a production application has been built. The fixture intentionally combines packages to test metadata compatibility; production workspaces must split runtime, development and build-only dependencies. Do not ship Storybook, Playwright, asset converters or server libraries in the browser.

Important choices: Node **24.21.0** is the inspected Node 24 release; TypeScript **6.0.3** is selected because inspected TypeScript ESLint peers exclude TypeScript 7. Use **`typebox` 1.3.35**, not the older `@sinclair/typebox` package, with provider 6.1.0. These checks prevent avoidable bootstrap churn. Lockfile resolution is not a security audit, native-addon qualification or browser support test [S09–S12].

| Group | Main exact versions |
|---|---|
| Runtime/build | Node 24.21.0; pnpm 10.33.0; TypeScript 6.0.3; Vite 8.3.2; React plugin 6.1.2 |
| Web | React/React DOM 19.3.0; React Router 8.4.0; React Aria Components 1.21.1 |
| Rendering | Babylon core/loaders 9.29.0; Motion 14.0.0 for DOM only |
| Client data | React Query 5.104.1; React Virtual 3.14.13; Zustand 5.0.15; XState 5.33.2 |
| Localization | i18next 26.4.2; react-i18next 17.0.15 |
| HTTP/contracts | Fastify 5.12.5; WebSocket plugin 11.3.3; TypeBox 1.3.35; provider 6.1.0 |
| Persistence/auth/jobs | pg 8.23.1; Drizzle ORM 0.45.3; Drizzle Kit 0.31.11; Better Auth 1.7.7; pg-boss 12.37.0 |
| Storage/email/assets | AWS S3 SDK 3.1146.0; Resend 6.32.0; sharp 0.35.5; glTF Transform CLI 4.5.1 |
| Verification | Vitest 5.0.3; Playwright 1.63.0; fast-check 4.10.2; axe Playwright 4.13.0 |
| Quality/docs | ESLint 10.12.0; TypeScript ESLint 8.71.1; Prettier 3.9.9; Storybook 10.6.1 |
| Observability/PWA | Sentry React/Node 11.4.0; OTel SDK Node 0.222.0; Workbox build/window 7.4.1 |

For source metadata and all ancillary packages, use the machine-readable register. Re-resolve and review at bootstrap if implementation starts after this research date; avoid indiscriminate upgrades during a milestone. Pin container images by digest in CI after platform qualification. PostgreSQL 18 is the selected major; official container index digests were retrieved and are recorded in `container-manifests.json` and the setup runbook. BOOT-02 still verifies actual runtime patch, image security and platform behavior.

### 4.2 Required local installs

Required: Git, Node 24.21.0 through an OS-appropriate version manager or official distribution, pnpm 10.33.0, a Docker-compatible container engine with Compose v2, and supported desktop browsers. Install Playwright browser binaries using its pinned CLI. A code editor is optional; none is a production dependency. For iOS/tablet acceptance, arrange access to real iPhone/iPad Safari devices; a Mac/native iOS app toolchain is not necessary for the web app itself. Remote-device services can supplement physical testing after pricing and privacy review.

Upstream qualification additionally needs **Bun 1.4.2** and the pinned source workspaces. The current upstream uses pnpm 10.33.0, Node 24, TypeScript aliases and Vite+ catalog overrides. Do not copy its entire toolchain into the new application. First reproduce its relevant tests with its own lockfiles, then compile and run the selected closure under our Node runtime. Any Bun-only import becomes an adapter/fork issue with a tracked remedy.

No Redis, Kubernetes cluster, native Xcode project, paid LLM subscription or commercial design framework is needed to begin M0. Use local SMTP capture, local private storage adapters and synthetic content where external credentials or asset permissions are unavailable.

### 4.3 Dependency governance

Commit one pnpm lockfile for the product workspace and a separately documented upstream lock boundary. Use frozen installs in CI. Restrict lifecycle scripts to an explicit reviewed allowlist; native build dependencies such as image tooling must be qualified in the build image. Produce an SBOM, license notices and vulnerability results for each release. Pin third-party Actions by commit SHA. Renovation PRs must show scope, changed advisories, affected suites and rollback. Do not disable peer checks or force-install to hide conflicts.

Install framework features when their milestone needs them; the register is the anticipated complete baseline, not a command to eagerly bundle everything. Defer hosted search, warehouse, native packaging and sophisticated AI providers until their documented trigger occurs.

## 5. Environments, providers and provisioning

### 5.1 Environment separation

| Environment | Data and access | Purpose |
|---|---|---|
| Local | Synthetic fixtures; local DB/mail/storage; test identities | Development, deterministic tests and offline iteration |
| PR preview | Synthetic data only; authenticated preview if needed; short TTL | UI review and isolated integration evidence |
| Staging | Separate accounts/secrets/buckets/database; representative synthetic workloads | Migration rehearsals, load, device, content and restore qualification |
| Closed beta | Invited real users; explicit supported catalog/devices; controlled releases | Operational and experience validation with capped capacity |
| Production | Independently scoped secrets and approvals; published support contract | Public operation after release gates pass |

Never clone production personal data to developer machines as routine test fixtures. Use sanitized diagnostic scenarios. Staging must exercise the same topology and migration process even if compute sizes differ. Preview deployments must not connect to production auth, jobs or buckets.

### 5.2 Service inventory and provisioning contract

| Service/provider | Provisioning outputs | Secrets, cost and exit path |
|---|---|---|
| GitHub private repository/Actions | Protected main, CODEOWNERS, environments, runner budget, artifact retention, secret scanning | Scoped deploy credentials; exportable git/history; CI minutes/storage budget |
| Domain and DNS, Cloudflare | Director-owned domain, `app`, `api`, `play`, `assets`, `status` records; TLS; exact origin allowlist | Registrar/DNS access under MFA; annual domain cost to quote |
| Cloudflare Pages | Preview/staging/prod frontend projects, immutable builds, cache/security headers | Static hosting limits checked; no gameplay authority in build output |
| Render | Paid API, match service, worker; private PostgreSQL 18; one region initially; deployment blueprints | Database credentials and deployment token; paid service prices must be captured before purchase |
| Cloudflare R2 | Public immutable assets bucket; separate private replay/export/backup buckets; lifecycle/CORS policies | Scoped S3 credentials, presigned downloads; portable object keys and manifests |
| Resend | Verified sending domain, SPF/DKIM and DMARC policy, templates, bounce handling | Server-only API key; no marketing without a separate policy |
| Sentry | Separate projects/environments, release IDs, source-map upload, redaction and sampling | Current plan quote unresolved; data residency/retention selected before real users |
| Metrics/status | OpenTelemetry export target; uptime probes; public status surface; alert routing | Choose within approved budget; do not deploy a full observability platform before measurement needs it |
| Identity | Better Auth migrations, email verification/recovery, sessions, guest upgrade | High-entropy auth secret; optional OAuth separately configured; self-hosting still incurs infrastructure cost |

No accounts were opened, services purchased or credentials requested by this investigation. The provisioning checklist is concrete enough for BOOT-04 to create reviewed configuration and for the Director to authorize the resulting spend. Browser distribution itself does not require Apple developer membership; reconsider App Store costs only if native distribution is later requested.

### 5.3 Initial deployment choices

Working region: Render Oregon, subject to audience/latency confirmation. Keep API, match workers and primary database colocated. Cloudflare distributes public static assets globally; it does not make a single-region match database globally local. Record round-trip latency from the intended player population before selecting launch regions. Do not promise worldwide competitive latency from one region.

Use same-site subdomains under the project’s domain. Prefer host-only secure HttpOnly session cookies at the API, explicit credentialed CORS from the app, and verified origins. Avoid a frontend/provider domain split that depends on third-party cookies; Better Auth documents Safari constraints here [S16]. Issue a short-lived, single-use WebSocket ticket through authenticated HTTP; send it in the first authenticated frame, not a URL logged by proxies. Before authentication, allocate minimal connection resources and apply an authentication deadline.

Render’s socket connections can outlive normal HTTP requests, but deployment shutdown is finite and reconnections can reach any instance [S20]. Support healthy drain, bounded termination, durable recovery and reconnect storms. Never depend on finishing every match before a deployment completes.

Render paid PostgreSQL has PITR: the inspected retention is three days on Hobby and seven days on Pro or higher, and restoration creates a new database; HA uses a standby and its documentation permits loss of recent writes during failover [S21–S22]. Therefore **Render is selected for staging/closed beta, while public database durability is a release gate**. If the Director requires zero acknowledged-loss under a single-AZ failure, qualify an appropriate synchronous configuration/provider, such as colocated AWS compute and RDS Multi-AZ, against that exact failure model [S23]. Do not claim zero loss for region destruction or every possible disaster.

### 5.4 Configuration and secret classes

Public build configuration: app origin, API origin, play origin, asset origin, release ID, supported protocol range, public error-reporting identifier. Private runtime configuration: DB credentials, auth secret, object-store credentials, mail key, signing/encryption keys and provider tokens. Separate email, replay and admin scopes. Rotation must support overlapping verification keys while invalidating compromised signing keys.

Document each variable’s consumer, validation, environment, rotation procedure and whether it may be public. Parse all configuration at startup and refuse production startup with localhost endpoints, test credentials, debug state export or insecure cookie settings. Never place a private value behind a browser build prefix such as `VITE_`.

## 6. Rules, card data and certification

### 6.1 Authority and source control

The official **Comprehensive Rules 2.2.0, effective 9 July 2026**, are the current baseline inspected here. The resources page links tournament rules in `Tournament-Rules-7.14.2026_Update_EN.pdf` while labeling the page update 23 July; preserve both document identity and listing date rather than conflating them. The current tournament document specifies constructed minimum 60 cards, at most two inks and four copies by full English card name; Draft minimum **35**, Sealed minimum **40**. Dual-ink cards affect the deck’s ink union. Rotation/reprint eligibility requires identity-aware validation [S01–S03]. This short summary is not the rules implementation or a substitute for the documents.

Sources have roles, not a simplistic universal precedence order: comprehensive rules define game mechanics; tournament/format policy defines event legality and procedures; errata and official card/set clarifications specialize the applicable behavior. Conflicts require a recorded interpretation with the exact sources and a rules reviewer. Community indexes and the engine are implementation evidence, not final authority. Do not use another TCG’s priority or last-in-first-out stack model by analogy; Lorcana’s triggered-effect **bag** needs its own semantics.

Maintain a source registry with URL, issuer, language, document version, effective date, retrieval date, permitted storage/use, content hash when bytes are available and supersession relationship. The PDFs were readable through web extraction, but direct local downloads returned 403 in this environment; no local PDF archive or PDF hash was produced. The large Attack of the Vine set-notes retrieval failed. Fetch and inspect those bytes through an authorized working route in RULE-01; do not bypass access controls or mark the missing notes reviewed.

The official beta Coconut document introduces a character-centered multiplayer construction variant and a different victory threshold. Treat it as a separate experimental policy with its own tests and effective revision; the beta card supplement also needs review before admission [S05]. Pack Rush has an official quick-rules document [S04]. Cooperative products need scenario-specific documents and enemy-card logic; their catalog visibility does not imply the standard engine already supports them.

### 6.2 Content entities and ingestion

Use distinct identifiers:

- `cardIdentityId`: stable gameplay identity, including full name/version semantics and a documented mapping of errata/reprints.
- `printingId`: set, collector number, language, art, rarity and release provenance.
- `finishId`: nonfoil/foil and other presentation/acquisition distinctions.
- `cardDefinitionVersion`: executable ability/data revision, immutable once admitted to a match.
- `matchObjectId`: private physical instance in a single game, including attachments/underlying cards where applicable.
- `viewerObjectId`: recipient-safe reference used in transport; must not expose hidden identities or persist trackable identifiers through an information-destroying shuffle.

LorcanaJSON is a candidate normalization source, not the authority for legality or a production availability dependency [S07]. The current TCG Engines card packages export sets through 013; this alone does not establish completeness, correct release status, or support for every newest/revealed card. Produce actual counts by set, identity, printing, language and certification status before choosing a launch catalog. Avoid live hotlinking as the only asset strategy.

Ingestion sequence: acquire approved source snapshot → normalize raw records → reconcile identity/printing mapping → schema and referential checks → diff report → review errata/legality/abilities/assets → staging tests → sign immutable content manifest → activate at an effective time. Quarantine uncertain records; never silently delete unknown fields or overwrite historical definitions. Preserve aliases for renamed identifiers and foreign import codes.

Data requirements include all checklist fields, localized text, source references, legality periods, related-card links, ability tags and image variants. Ability tags used for filtering are not themselves executable rules. Printed wording is not safely compiled by an unreviewed natural-language parser; use reviewed structured definitions/scripts with tests. Every asset has creator/source, rights status, checksum, dimensions, format, language, rendition family and accessibility description where appropriate.

### 6.3 Format policy

A versioned `FormatPolicy` contains deck-size constraints, copy limits by identity/full-name key, permitted ink combination, set/reprint eligibility, banned/restricted lists with dates, pool restrictions, match structure and any format-specific setup/win conditions. Keep competitive timers and event procedures adjacent to, but distinct from, gameplay rules.

Create separate policies for Core, Infinity, Draft, Sealed, Pack Rush, custom sandbox, multiplayer and scenario modes. A legality response returns machine reason codes, affected quantities, sources and effective version. Warnings (e.g. poor inkability) cannot masquerade as errors; illegal cards must not be silently substituted. Older art can remain valid through a legal reprint where current official policy permits; validate the identity mapping rather than relying only on a printing’s set number.

Rotation and bans are scheduled content changes. Before activation: identify affected saved decks and registered events, notify players, define event pinning policy, preview queue impact, then activate a new policy. Running games retain their original manifest. Product ownership never grants an exception to legality. Do not hard-code the presently inspected ban list into application logic.

### 6.4 Engine adapter contract

The application owns an interface resembling `initialize`, `listLegalActions`, `validateIntent`, `transition`, `projectForViewer`, `serialize`, `restore`, `explain` and `version`. The exact implementation may wrap multiple upstream functions. `transition` takes complete private prior state, a validated actor intent, deterministic clock inputs and an injected random source; it returns a candidate next state, events, pending choices and a termination/result descriptor. It performs no DB writes, emails or wallet changes.

Transport intents express player decisions, not arbitrary state mutation: play a referenced card using a permitted payment; select among supplied legal targets; choose effect ordering; concede. Server-side validation recomputes legality. A client-provided list of legal moves, cost, reward or resulting state is never authoritative. Choice prompts have IDs, owners, constraints, state version and timeout policy; stale choice responses fail safely.

### 6.5 Certification matrix

| Suite | Required cases and evidence |
|---|---|
| Setup/turns | Opening order, redraw, Ready/Set/Draw, active player, first-turn exceptions, empty-deck behavior and state-based endings |
| Costs/actions | Inking restrictions, payments, alternate costs, songs/combined singers, selected objects, exhausted resources and rejected partial payments |
| Combat/objects | Challenge eligibility, damage timing, banishment, locations/movement, stacked/underlying cards, exert/ready and zone changes |
| Effects | Trigger generation and bag ordering, optional/mandatory choices, replacement/continuous/delayed effects, simultaneous events, duration and dependency interactions |
| Keywords | Every keyword in the pinned official revision; positive, negative, timing and cross-keyword interaction cases |
| Information | Reveal/look/search scope, face-down zones, discarded identities, shuffles, spectators, replay access and private prompt errors |
| Formats | Core/Infinity/reprints/rotation, limited pools and deck minima, Pack Rush setup, custom overrides and later multiplayer/scenarios |
| Invariants | Object conservation, allowed locations/ownership, no illegal action accepted, finite effect progression, deterministic replay and valid terminal state |
| Per-card | Each supported identity’s ability branches, costs, targets, timing, negative cases and interactions with generic scenario fixtures |
| Regression | Every discovered defect becomes a minimized scenario with rules source and expected events/state |

Implement a progress budget and loop detection that yields a controlled diagnostic failure, not a silent arbitrary winner. Rules loops and tournament handling need explicit policy review; runtime limits protect infrastructure but do not invent a game ruling. Keep failing match data private and reproducible.

Card status progresses `catalogued → implemented → source reviewed → tested → interaction certified → admitted`. A card’s status includes engine version, rules version, applicable formats and known limitations. “Unit tests exist” is insufficient if all they test is that the card name parses. At release, 100% of admitted identities must have required evidence and no unresolved critical correctness defects. A set gate fails if an admitted card is unsupported; do not hide it behind an optimistic set completion percentage.

## 7. Authoritative matches, networking and recovery

### 7.1 Commit protocol

Use PostgreSQL as the authoritative committed state. For the initial system, optimistic compare-and-swap avoids dependence on an in-memory room owner or sticky load balancing:

1. Authenticate actor, authorize match participation, validate schema/size and rate limit. Bind `commandId` to actor, match and a hash of the intent.
2. Check the durable receipt. A duplicate of the identical request returns its prior outcome; reusing an ID with different content is rejected.
3. Read the current committed state/version, pinned manifest and clock fields. If the expected version is stale, return a fresh authorized projection and require reconsideration.
4. Execute speculatively in the bounded engine pool. All time/random inputs are controlled; no external side effect occurs.
5. In one short DB transaction, update the match only if the version still matches; write the state/checkpoint, accepted event journal, command receipt and outbox records. A unique key also prevents duplicate command effects. If comparison fails, roll back the entire candidate. Never publish or reuse its mutated state.
6. Commit before acknowledging acceptance. Publish recipient-specific changes afterward. If publication fails, the committed receipt and version support recovery.

Multiple servers may compute a candidate, but only one can commit from a given version. A losing command must be revalidated or rejected; it cannot overwrite the winner. Avoid long database transactions while the engine calculates. A cache is valid only for the exact committed version and manifest. If later actor ownership is introduced for throughput, add database-enforced fencing; a distributed lease by itself is not authority.

```mermaid
sequenceDiagram
  participant C as Client
  participant S as Match service
  participant E as Engine worker
  participant D as PostgreSQL
  C->>S: Intent, command ID, expected version
  S->>D: Check receipt and committed state
  S->>E: Validate and compute candidate
  E-->>S: Candidate state and events
  S->>D: CAS state + receipt + journal + outbox
  D-->>S: Commit or conflict
  S-->>C: Receipt and authorized projection
```

### 7.2 Protocol and synchronization

Each session handshake negotiates protocol version and obtains a viewer snapshot at `stateVersion`. Server messages contain match ID, sequence/version, correlation ID, projection type and payload. Client messages are allowlisted discriminated schemas with strict bounds; unknown fields and impossible quantities do not become engine inputs. Distinguish `accepted`, `rejected`, `stale`, `rate_limited`, `auth_expired`, `maintenance` and `unsupported_version` outcomes.

Start with full projected snapshots at meaningful transitions; benchmark before introducing complicated deltas. If deltas are used, include their base version and require snapshot resync on any gap. Never apply a patch to the wrong base. Backpressure queues have limits: drop obsolete presentation updates, disconnect/resync a slow client, but retain authoritative history. Include heartbeats, jittered reconnect and retry ceilings. A transport disconnect is not automatically a concession.

Cross-instance publication uses durable outbox records plus a notification mechanism. PostgreSQL LISTEN/NOTIFY can signal changed match IDs; treat it as a non-durable hint. Every gateway can reconcile versions, and reconnect always checks the database. Outbox workers process at-least-once; consumers dedupe by event ID. Do not rely on every gateway receiving every transient notification. Add an ephemeral bus only when measured fanout/presence load warrants it.

### 7.3 Randomness

Use a cryptographically strong server source for competitive shuffles, initial-player selection and product outcomes. Initial recommendation: native Node crypto sampling, unbiased Fisher–Yates shuffling, and a private journal of random draws/outcomes consumed by the replay adapter. A secure deterministic stream with private seed/state is an alternative only after its implementation is reviewed and qualified. Never seed ordinary `seedrandom` and assume the generator itself is cryptographically strong. Qualification must establish how upstream RNG is replaced without breaking replay.

Retain private RNG state/outcome history encrypted at rest where appropriate; the replay service, not the client, gets necessary access. Do not disclose future randomness, even through a replay/debug response during a live match. Replays can use recorded decisions/outcomes rather than exposing the whole random seed. A commitment/audit scheme is optional future transparency work, not a substitute for access control. Statistical distribution tests supplement source review; they do not prove cryptographic security.

### 7.4 Clocks, reconnects and tab suspension

Define separate policies for casual, ranked, tournament and sandbox play. Server UTC deadlines and remaining time are persisted with the state version; clients display estimates. Use monotonic time within a process and a consistent database/server time authority for durable deadlines. Timeout workers submit version-checked system commands; repeated execution cannot settle a result twice. Test simultaneous player action versus timeout explicitly.

Competitive time continues during ordinary disconnection unless a declared policy says otherwise. Any reconnect grace has a bounded budget and an abuse policy. An infrastructure outage can pause/void/compensate through an audited system policy; it must not be mistaken for player abandonment. Exact initial clock durations are configurable product settings, selected through playtesting before ranked admission.

Browsers may suspend or discard pages [S19]. On resume, stop local animation assumptions, refresh authentication, fetch the current viewer version, reconcile pending receipts, then restore interaction. Never promise continuous background execution on a phone. Service workers cache approved shell/assets and limited public catalog data; they do not simulate an authoritative online match while disconnected. Offline collection browsing is an enhancement; offline reward settlement is excluded.

### 7.5 Hidden information and replay

Project private state on the server per viewer and per event. Concealed zones contain only permissible counts/status and opaque references when necessary. Do not send an opponent’s deck list, seed, unseen identities, choice candidates or full card map “for future animation.” A globally downloadable card catalog is public reference data; a map identifying which of those cards occupies a hidden match object is private.

Information policy is tested as noninterference: two private states that differ only in information hidden from a viewer must produce equivalent permitted output for that viewer, apart from documented public consequences. Cover snapshots, diffs, resources, animations, error messages, tracing, analytics and downloads. Stable identifiers and object ordering can leak information even when card names are removed.

Replays preserve immutable engine/content/rules versions, journal and checkpoints. Exports are role-filtered and versioned. Public sharing defaults to public information; private hand visibility requires the appropriate participant consent/policy. Judges receive scoped, audited access. Spectator delay must apply to snapshots, events, reconnects, APIs and overlays, not merely the animation clock. A delayed spectator must never resync to a live snapshot.

## 8. Data model, storage and caching

### 8.1 Relational domain map

| Domain | Principal records | Non-negotiable constraints |
|---|---|---|
| Identity | users, sessions, accounts, verification, guest links, preferences | Auth adapter schema pinned; account linking verifies ownership; unique normalized identity policy |
| Content | card identities, printings, finishes, rules sources, definitions, manifests, format revisions | Immutable admitted revisions; foreign keys; explicit effective dates and language |
| Decks | decks, revisions, entries, folders, tags, shares | Revision snapshots; quantity bounds; gameplay identity separate from preferred printing |
| Ownership | holding balances, inventory ledger, entitlements, acquisition events | Atomic nonnegative balances; unique grant/source keys; immutable adjustment history |
| Economy | wallet accounts, ledger transactions/postings, reward definitions and receipts | Balanced postings or equivalent auditable conservation; idempotency; no direct balance editing |
| Products | product revisions, slot definitions, entitlements, openings, outcomes | One committed outcome per consumed entitlement; immutable configuration references |
| Play | matches, participants, state versions, command receipts, event journal, checkpoints | CAS version, unique actor/command key, pinned manifest; private payload access |
| Competition | queue tickets, admissions, ratings, seasons, rounds, registrations, pairings, results | One active admission per policy; immutable deck lock; one settlement per result revision |
| Limited | pods, seats, packs, picks, pool revisions, autopick policies | Atomic pick/advance; server deadlines; private picks; legal pool membership |
| Social/safety | friends, blocks, reports, moderation actions, consent, notifications | Recipient authorization, block enforcement, retained evidence scope and audit |
| Operations | outbox, jobs, audit events, feature flags, deployments, content approvals | At-least-once consumers dedupe; permissioned changes; traceability to release |

IDs should not encode private information. Use UTC timestamps with timezone-aware columns; display localized dates at the edge. Currency quantities use integers, never floating-point money-like balances. Quantities and ledger updates are checked in transactions; contention-sensitive operations may use explicit row locks or serializable isolation with bounded retry. Document isolation per operation rather than assuming an ORM makes races impossible [S17–S18].

Schema ownership sits with `packages/db`. Domain services own transactions, not route handlers scattered across apps. Migrations are checked into source, reviewed and rehearsed against representative data. Use expand/contract changes while older clients/workers may still run. Avoid destructive automatic migration at application startup.

### 8.2 Storage classes

PostgreSQL stores authoritative player state, active matches, receipts and transactional metadata. R2 stores immutable public asset renditions and private larger replay/export objects. Archive a completed replay only after validating its object checksum and recording the archive reference; do not delete the only durable copy first. DB/object-store writes are not a cross-service atomic transaction: use pending/finalized states and reconciliation jobs.

Use content hashes in asset filenames and manifests; long cache lifetime for immutable content. The small active manifest receives short caching and explicit version checks. Cards use responsive AVIF/WebP or tested fallbacks, mipmapped/compressed GPU textures where appropriate, and text rendered separately at readable resolution. Do not download all high-resolution card art or instantiate thousands of GPU textures at launch.

Private exports use short-lived authorized signed URLs and restrictive caching. Server checks permissions when generating the URL; revocation policy must account for already issued URLs. Public R2 assets use a custom domain, not the development `r2.dev` endpoint [S25].

### 8.3 Cache policy

| Data | Cache strategy | Invalidated by |
|---|---|---|
| Immutable assets/catalog versions | CDN, browser cache, service worker within size limits | New content hash/version; old versions retained per replay policy |
| Search/reference metadata | Local indexed snapshot and server query cache | Catalog/locale/format revision |
| Decks/collection/profile | Query cache keyed by viewer and revision; sensitive data private | Mutation response/event, account switch, logout |
| Active matches | In-memory snapshot keyed by committed version and viewer policy | New version; reconnect verifies authoritative version |
| Presence/queue estimates | Short-lived ephemeral values | Heartbeat expiry or queue transition |
| Rankings/metagame | Materialized aggregates with timestamp and sample metadata | Scheduled rebuild or corrected source result |
| Auth/permissions | Short, policy-aware cache only if needed | Revocation/version change; privileged actions recheck |

Never put private API responses in a shared CDN cache. Clear account-specific browser state on logout/account switch and test cross-account leakage. Initial catalog search uses a normalized local metadata index plus server-side PostgreSQL search/filter queries; build full-text indexes where justified and preserve Unicode/name aliases. Hosted search is deferred until measured query/scale requirements exceed this approach. Private deck/match information is not added to a public search index.

Treat browser storage as evictable [S19]; it cannot be the only copy of a collection, deck or pending purchase/opening receipt. A service-worker update must not replace runtime assets mid-match; stage activation and recover old/new client protocol versions [S19].

### 8.4 Retention proposal

Before beta, choose explicit retention values for raw match journals, private replays, debug traces, moderation evidence, email delivery logs, exports and backups. Working defaults for cost modeling: completed private replay data 90 days unless saved; short-lived exports 24 hours; operational detailed logs 14 days; aggregate non-identifying metrics longer. These are proposals, not legal conclusions. Saved/tournament replay retention and user deletion behavior need a published policy. Backups expire on their retention schedule rather than being individually rewritten; access remains restricted.

Account export includes owned data in documented formats. Deletion removes or pseudonymizes personal records while preserving the minimum integrity/audit records justified by policy. Test deletion propagation to search, replay sharing, analytics and notifications. A legal/privacy review of actual audience, geography and age policy is a public-release dependency, not an excuse to block local engineering.

## 9. Collection, products, rewards and economy

### 9.1 Collection contract

Balances are keyed by player, printing and finish, while deck eligibility aggregates acceptable holdings by gameplay identity and the chosen policy. A deck may prefer an art/finish without becoming illegal when another owned printing is substituted. Show substitutions explicitly. Support set, rarity, franchise and complete-collection progress with published denominators; unreleased/unsupported/promotional variants must not distort a completion percentage silently.

Every acquisition and removal has a durable cause: product opening, starter grant, match reward, achievement, craft, event, trade if enabled, or admin adjustment. “New” indicators are per-player presentation state; dismissing them cannot alter ownership. Favorites/wishlists are separate from balances. Provide grid, binder and compact list modes with identical search/filter semantics. Collection value, if enabled, means a clearly labeled virtual valuation unless licensed external pricing is deliberately added.

### 9.2 Products and opening

A product revision describes nested contents, fixed cards, slot rules, allowed variants, distribution weights, duplicate policy and availability. A display/trove/gift set can produce several pack entitlements and fixed grants. Configuration supports future product types without hard-coded UI branches, while new rules mechanics still require reviewed code.

Opening sequence: player selects entitlement → server verifies ownership and idempotency key → lock entitlement and applicable balances → generate outcome under the pinned product policy → atomically consume entitlement, record every outcome and grant holdings → commit → return a receipt → animate that committed result. Animation is presentation; it never determines the cards. Refresh, skip, bulk open and reconnect retrieve the same opening receipt. Bulk requests have explicit limits and resumable receipts rather than one enormous transaction.

Do not use undocumented physical collation as a promise. Publish the virtual distribution and duplicate behavior in understandable form. Test impossible slots, normalization, variant eligibility, boundary random values, deterministic fixtures, concurrency and statistical sample checks. Changing odds creates a new product revision, with an effective policy for already owned entitlements. Decide that policy before release; the working recommendation is to bind an entitlement to its acquired revision for auditability.

### 9.3 Reward eligibility and settlement

A completed eligible match writes a result event. A worker settles the result with a unique source key and one transaction spanning XP, wallet postings, inventory entitlements and reward receipt. Retry returns the same receipt. Rank settlement and reward settlement each reference the immutable result revision; corrections use compensating records rather than silent deletion.

Ordinary Lab matches can grant Collection currency. Reward tuning should avoid forcing players to collect before practicing. Advanced sandbox, manipulated RNG/boards, hotseat and simulation jobs are ineligible. AI match rewards, minimum participation, repeated-opponent limits and daily caps are explicit configurable policies; use a modest starter policy and measure before expanding. Do not punish legitimate long games or accessibility needs with crude duration heuristics.

Track source/sink totals, earn rates, active-player distribution, collection completion time, duplicates and accessibility of desired decks. Design targets before balancing: expected time to a competitive owned deck, weekly participation assumptions and catch-up paths. Never optimize for frustration or mandatory daily attendance. Daily/weekly quests need attainable alternatives and visible reset timezone. The free-game promise excludes real-money boosters, paid progression and cash-out.

### 9.4 Crafting, market and trading decisions

Crafting/dusting and wildcards are alternatives explicitly marked optional in the checklist. Default recommendation for the first economy slice: starter grants plus earnable packs/currency, with a direct missing-card acquisition path designed before public Collection Ranked. Do not implement both destruction-based crafting and wildcard systems before choosing a coherent balance model.

The original project’s card market matters to the vision, but the new market model is not specified. Preserve X03 as an explicit decision. Recommended first form: an NPC/catalog acquisition interface using virtual currency and transparent prices. Player-to-player market/trading adds escrow, price discovery, duplicate accounts, fraud, reversals and moderation; it is a later opt-in scope item, not assumed necessary for launch.

If trading is selected: atomically escrow both sides, bind offers to exact printings/quantities, version offers, handle expiry/cancel/accept races, audit transfers and prohibit cash settlement. No cross-player transfer may be implemented as two independent balance updates. Admin grants/revocations always generate signed-in actor, reason, case ID and compensating ledger entries; sensitive bulk operations require a reviewed dry-run and bounded scope.

## 10. Player journeys and feature contracts

### 10.1 Navigation and screen inventory

Primary destinations: Home/Play, Collection, Decks, Lab, Learn/Encyclopedia, Events and Profile. Secondary surfaces: pack reveal, match table, replay theatre, deck discovery, friends/notifications and settings. Administration is a separately permissioned area. Avoid a grid of generic KPI cards as the game’s home identity. Show a useful next action, recent progress and the game world with restraint.

Every screen spec includes entry points, permissions, empty/loading/error/offline states, keyboard/focus behavior, touch layout, reduced motion, localization expansion and telemetry events. A screen is not complete because its happy-path screenshot looks finished.

### 10.2 Flow contracts

| Journey | Normal path | Failure/recovery and acceptance |
|---|---|---|
| First visit/guest | Choose accessible settings → quick tutorial or explore → guest session → starter experience | Guest data has a server identity; upgrade proves account ownership and merges once; explain which progress persists |
| Registration/recovery | Verify email → establish session → privacy choices; recovery through expiring single-use token | Rate limits, enumeration-resistant responses, bounce recovery, session revocation and tested expired-link behavior |
| Deckbuilding | Search/filter → inspect → add by tap/click/keyboard → validate → save revision → choose queue | Import preview reports unresolved names/counts; no silent data loss; concurrent edits create conflict UI or new revision |
| Queue admission | Select environment/format/deck → validate pinned revision and ownership → enqueue → match offer/admission | Cancel/pair race resolves atomically; one active admission; blocked/private relationships respected; stale deck cannot slip in |
| Live play | Inspect hand/board → choose action → choose payment/targets → confirm if needed → commit → explain result | Local cancel before submission; duplicate/stale rejection; visible reconnect and pending-command receipt resolution |
| Finish/reward | Persist terminal result → show summary → settle once → grant receipt → rematch/deck edit | Settlement can be pending without replaying victory; retries cannot duplicate grants; void/correction policy is explicit |
| Collection/opening | See holdings/missing cards → select owned product → committed outcome → authored reveal → new-card summary | Skip/bulk/resume, partial asset failure and receipt history all preserve the same outcome |
| Lab experiment | Select unrestricted deck or replay position → mark experiment → edit state/seed → run/branch → compare | Provenance marks manipulation; rewind creates a branch; impossible states produce validation errors; no ranked/economy contamination |
| Replay/analysis | Choose match → authorized view → scrub/checkpoints → annotate/export → branch to sandbox | Pin engine version; missing assets degrade safely; private information never becomes public via export or branch sharing |
| Limited event | Join pod/pool → commit products → draft picks or sealed pool → build → validate pool → play | Atomic timed picks/autopick, reconnect after pick, hidden picks, canceled pod policy, pool export and auditable draft log |
| Tournament | Register → lock legal deck/pool → check in → pairing/round → result → standings/cut → archive | Judge cases, drops, byes, tie policy, corrected result revision, round rescheduling and tournament-scoped permissions |
| Social/report | Invite/friend/challenge → consent → play/watch; block/mute/report as needed | Blocking enforced server-side across invitations/chat/presence; report captures permitted evidence and case lifecycle |
| Content update | Import → diff → review → tests → stage → schedule → activate → monitor | Running matches pinned; bad content disabled for new admissions; reversible manifest switch and player notifications |

### 10.3 Competition and community details

Matchmaking partitions first by environment, format, match length and region policy; avoid excessive queues before population supports them. Rating expansion widens gradually with queue age, bounded by acceptable latency and competitive fairness. Direct challenges/lobbies provide a low-population fallback. Password/private lobbies need rate limiting and non-enumerable join tokens. Bo3 tracks games within a match, choices between games and format-specific constraints; do not treat three independent Bo1 records as a tournament match.

Rank uses a versioned rating algorithm, placement/uncertainty policy, seasonal presentation and idempotent result updates. Proposed initial algorithm: a well-specified Elo-style baseline, with simulation of expected behavior before selecting parameters; move to a more complex system only for a demonstrated need. Rank tier is not the same field as hidden matchmaking rating. Separate Core/Infinity/environment ratings only when population and product policy justify them. Anti-win-trading produces reviewable signals, not unexplained automatic accusations.

Tournament pairing/tiebreaker/Top Cut rules are data-backed policies derived from the applicable event documents. Prove them with published examples and adversarial fixtures. Do not claim official sanctioned-event equivalence merely because the platform supports Swiss. Judges cannot quietly mutate live ranked state; correction/restoration creates an audited event and identifies affected results, replays and rewards.

Deck discovery includes copy-to-builder, legality/ownership status, missing cards and direct unrestricted Lab use. “Budget” is defined against the selected virtual acquisition system, not an undocumented real-money value. Public decks need moderation, privacy settings and revision-aware links. Metagame aggregates must show sample size, time/rules period, queue, rank and selection bias; avoid representing the project’s population as the entire Lorcana metagame.

Notifications use durable recipient events with dedupe, preferences, quiet hours and useful deep links. In-app inbox is primary. Email and browser push are optional channels; mobile web push eligibility and install requirements vary, so do not make a tournament playable only through push delivery [S19]. Users can disable social notifications without losing security/recovery messages.

### 10.4 API and integration inventory

Internal versioned endpoints cover sessions/guest upgrade; content manifests/catalog/rules; decks/revisions/import/validation; holdings/wallet/products/openings; queues/lobbies/admissions; match tickets/snapshots/receipts; history/replays; profiles/social/reports; events/tournaments; notifications; and scoped administration. Use OpenAPI generated from actual route schemas with auth/rate/error contracts. Maintain WS schemas and sample traces separately.

R33 public API is an optional ecosystem milestone. Do not expose private internal routes by removing authentication. Public card/rules/metadata endpoints, authenticated deck/history endpoints and tournament webhooks each need audience-specific schemas, pagination, rate limits, version policy and privacy review. Signed webhooks carry event ID/timestamp, support replay protection, at-least-once delivery, retry/backoff and dead-letter review. Outbound webhook URLs require SSRF controls and destination validation.

## 11. Visual design, interaction, accessibility and devices

### 11.1 Art direction and authored quality

Creative anchor: **a living Illumineer’s tabletop**. Use controlled camera composition, tactile card materials, ink-like transitions and restrained environmental storytelling. Prioritize clear silhouettes, readable card inspection, board density and distinct decision states. A beautiful empty table is not sufficient evidence; the approved reference must include a crowded real game and practical deckbuilder.

Before broad UI construction, produce three coherent direction studies using the same table, deckbuilder and pack sequence. Each includes typography, palette, material treatment, motion, audio notes and phone adaptation. The Director selects a direction; engineering then produces an interactive quality reference. This investigation does not invent final visual approval or commissioned assets. Use original/authorized assets and licensed fonts/audio, with provenance recorded.

Avoid dashboard defaults through screen composition and interaction design, not by forbidding useful panels or readable lists. A distinct game identity comes from coherent art, typography, pacing, sound, transitions and card handling. Keep ornamental frames away from card text and interactive hit targets. Favor a bounded authored 3D scene over uncontrolled camera complexity.

### 11.2 Design system specification

| System | Required deliverables |
|---|---|
| Foundations | Semantic color roles, all six ink identities with symbols/text, spacing scale, responsive grid, typography roles, elevations, materials, corner/frame language |
| Tokens | Primitive → semantic → component layers; CSS variables plus typed renderer mapping; light/high-contrast/reduced-motion variants; no scattered raw values |
| Components | Buttons, inputs, dialogs, menus, tabs, lists, search/filter, toasts, focus rings, card tile/preview, quantity picker, deck entry, status pill, progress/reward and connection indicators |
| Table | Hand fan/list, zones, ink/lore counters, action controls, target overlays, choice panel, bag/effect explanation, turn indicator, log and inspection |
| Motion | Inspect/select/cancel, pending/confirmed action, draw/play/ink/quest/challenge, damage/banish, trigger resolution, pack reveal and reward receipt |
| Audio | Gameplay cues, ambient layer, reward/pack sequence, alert equivalents, mix groups, mute/default behavior and interruption recovery |
| Content | Plain-language reasons/errors, consistent rules vocabulary, beginner/advanced explanations, localization keys and glossary |
| Documentation | Storybook states, usage guidance, approved captures, interaction specs and device acceptance evidence |

Proposed working spacing scale: 4/8/12/16/24/32/48/64 CSS pixels; typography uses scalable rem values. Final palette/font choices require contrast and licensing checks. Use a **44 CSS pixel preferred touch target** as a project usability target, distinct from the specific WCAG 2.2 minimum criterion and its exceptions. Target WCAG 2.2 AA with documented tests; do not claim conformance before evaluation [S28].

### 11.3 Renderer and interaction contract

React owns navigation, accessible controls and lower-frequency UI. Babylon owns the scene/render loop, card meshes/materials and frame-by-frame presentation. Never rerender the entire React table every animation frame. The engine emits semantic events; presentation translates them into animations without becoming the game-state authority. A reduced-motion presentation consumes the same events and arrives at the same visible state.

WebGPU is an enhancement after capability detection; instantiate and qualify a WebGL fallback explicitly [S13]. GPU context loss requires scene rebuild from a current viewer snapshot. Track draw calls, texture allocation, active effects and long tasks. Release resources on route change and reuse bounded card meshes; avoid one heavy material/texture pipeline per catalog card. Shader/material quality tiers cannot change gameplay visibility.

Input state machine: idle → inspect/select → choose action → choose payment/targets → review if appropriate → submit/pending → confirmed/rejected → idle. Escape/cancel works before submission. Hover is optional; touch uses tap inspection and deliberate action controls. Dragging has tap/keyboard alternatives. Destructive moves and ambiguous targets use proportionate confirmations, configurable where safe. Cosmetic animations can be skipped or accelerated without skipping a required choice.

### 11.4 Responsive product contract

| Surface | Desktop primary | Tablet alongside | Phone alongside |
|---|---|---|---|
| Live match | Wide table, persistent controls/log/inspection where space permits | Landscape table with collapsible inspection/log and large targets | Landscape play target initially; focused zones and full-screen inspection; portrait companion views tested |
| Deckbuilder/collection | Split panes, keyboard shortcuts, dense optional list | Adaptive split/single pane, tap quantity controls | Single task per view, persistent deck summary, filter sheet and readable list |
| Pack opening | Authored scene, mouse/keyboard controls, bulk option | Touch reveal and skip, moderate effects | Tight asset/memory budget, explicit reveal controls and resume |
| Lab/analysis | Full advanced tools and comparison | Essential setup/run/inspect; advanced panels adapt | Core practice and inspection first; complex editing readiness explicitly tracked |
| Events/social | Full administration/player views | Player journeys and basic event interactions | Registration, pairing, challenge, notifications and player views |

Phone advanced-tool parity can follow desktop within later milestones, but basic inspection, target selection, deck interaction and reconnect must be demonstrated in the first slice. Do not publish a blanket “mobile supported” claim when only the home screen resizes. Device readiness is a column on every requirement/feature, with `supported`, `experimental`, `pending` or `not applicable`.

Select actual reference hardware in UX-02: desktop integrated-GPU laptop, typical gaming/modern desktop, iPhone/iPad Safari, midrange Android phone/tablet. Record OS/browser versions and thermal/network conditions. Proposed support policy: current and previous major desktop browser versions where security-supported, plus a tested mobile OS/device floor. Final floors follow measurements and are published before beta. Playwright WebKit is useful automation, not a substitute for real Safari/device behavior [S29].

### 11.5 Accessibility and localization acceptance

Provide a semantic board describing zones, objects, states, legal actions and prompts. Keyboard and screen-reader users must be able to complete a supported match, not only navigate the account page. Focus moves predictably after card changes and modal choices; announcements summarize effects without flooding a live region. Color, sound and animation each have alternative cues. Text-mode card inspection includes all relevant current effects and source wording without forcing tiny printed-image text.

Test zoom/reflow, contrast, focus visibility, target size, motion reduction, audio controls, captions/visual alerts and intentional animation speed. Auto-pass preferences are explicit engine-compatible policies; never skip a legal decision because a UI animation is inconvenient. Externalize strings early, support long text/pseudolocalization and plan Unicode/diacritics in names/imports. Do not promise translated card text without sourced localized content and review. Locale changes cannot change gameplay identity.

## 12. AI, simulation and rules assistance

### 12.1 Bots

Begin with deterministic legal-action bots for smoke tests, then a heuristic beginner bot with explicit evaluation of inking, questing, challenges, resources and mulligans. Normal/advanced labels require measured strength and time budgets against fixed suites and baseline opponents. Do not equate an LLM’s fluent explanation with competent legal play.

Bots receive only their authorized observation and known public history. Hidden-state access is prohibited for fair difficulty levels. Any perfect-information analysis is an explicitly labeled sandbox mode excluded from normal statistics/rewards. Intentional beginner mistakes must remain legal and controlled, not arbitrary cheating. Bot deck import uses the same validation contracts as player decks.

Search/simulation runs in bounded workers with CPU/memory/time quotas. Jobs have seed, engine/manifest versions, deck revisions, strategy version, sample count and confidence reporting. Cancel/resume and progress reporting are mandatory for large runs. “Thousands of games” is a throughput goal to measure after the bot can finish correct games; it is not an initial capacity promise. Do not let free public simulation requests starve live matches.

### 12.2 Rules assistant

First release uses deterministic legality reason codes, effect traces, glossary and a versioned searchable rules/rulings index. It can answer “why can’t I do this?” from the same validation result used by the server. A contextual answer cites the exact applicable rule/card revision and distinguishes official text, implemented interpretation and unresolved question.

A generative explanation layer is optional. No paid LLM provider is required to begin development. If later selected, research current provider pricing/privacy, add per-user/project quotas, pass only viewer-authorized context, treat retrieved text as untrusted data, and validate any action suggestion against the authoritative legal-action set. Generated text never resolves a disputed game or changes its state. Use a curated evaluation set with adversarial ambiguity, old-rules questions and hidden-information traps before public exposure.

Tutorials and puzzles are executable scenarios with source-backed objectives. Lessons cover every topic in R13 and offer beginner/advanced language. An update invalidating a lesson must be detected by scenario replay under the new manifest. Analytics define “dead card,” “resource efficiency” and probability assumptions explicitly; without that, precise-looking charts are misleading.

## 13. Security, privacy, moderation and administration

### 13.1 Threat model

Primary threats: forged/replayed commands, hidden-information extraction, account takeover, cross-user object access, reward duplication, hostile imports/chat, resource exhaustion, malicious admin changes, dependency compromise and unauthorized private replay sharing. The server validates both authentication and domain authorization; possession of a match ID or signed-in session is not sufficient.

Enforce TLS/WSS, secure cookie attributes, CSRF protections appropriate to the auth framework, strict CORS/origin checks, content security policy and input/output encoding. WebSocket origin checks, authentication deadlines, message-size/rate limits, schema validation and session expiry are required [S30]. Do not log tickets, cookies, passwords, raw decks/hands or full chat by default. Protect email/reset routes against abuse and account enumeration.

Rate limits exist per IP, authenticated principal, match and expensive operation; in-memory limits alone do not provide a global multi-instance policy. Begin with edge protections plus DB-backed constraints/quotas on valuable operations, then introduce a shared fast limiter if load requires it. Consider household/shared-network false positives. Import files and public deck text are data, never executable templates or engine scripts.

### 13.2 Permissions and administrative flows

Roles are capabilities scoped to domains: player, event organizer, tournament judge, moderator, content editor, economy operator and platform administrator. A judge’s full-information access applies to assigned events/cases, not every private match. Economy operators cannot publish card scripts merely because both use an admin site. Privileged accounts require stronger authentication and short sessions.

Admin changes require preview/diff, affected scope, reason and immutable audit. Content/scripts follow review → staging tests → activation. Bulk compensation uses a deterministic eligible-player query, dry-run count, bounded grant and unique campaign key. Emergency disable flags can stop a queue, card admission, product opening or expensive worker class without corrupting existing records. Emergency access is time-limited and reviewed afterward.

### 13.3 Social safety and privacy

Start social interaction with controlled emotes and consent-based friends/challenges; free-text chat needs moderation capacity, filters/reporting and retention policy before broad enablement. Block/mute/report applies across invitations, presence, spectator access and messages. Moderation has report intake, triage, evidence, action, user notification and appeal states. Automated abuse scores are evidence for review, not proof of wrongdoing.

Set an age/audience policy and launch geography before real-user beta, with appropriate account, consent and communication design reviewed for that audience. This plan is not a legal determination of children’s privacy obligations. Asset/data permissions and applicable privacy requirements need review tied to actual distribution, not assumed away because use is free.

Track user data inventories and subprocessors, publish understandable privacy/retention terms, provide export/deletion and test access revocation. Analytics default to first-party product telemetry with pseudonymous identifiers; avoid advertising trackers. Source maps and traces must not contain secrets. Incident handling covers credential revocation, data exposure assessment, communication, remediation and post-incident review.

## 14. Performance, reliability and operating costs

### 14.1 Proposed measurable budgets

These are initial qualification targets, not measured claims. Record test device, browser, network, catalog size, board fixture and build SHA for every result. Adjust a target only through an explicit product/engineering decision, not by quietly weakening a test after failure.

| Area | Initial target | Measurement |
|---|---|---|
| Desktop table | Sustained 60 fps target at standard quality; p95 frame time ≤20 ms in representative play | Real-device capture including dense board, effects and inspection |
| Supported mobile table | Sustained 30 fps minimum at adaptive quality; stable 20-minute session | Thermal, memory-pressure, rotate, background/resume and GPU-loss trials |
| UI response | Local selection/focus feedback ≤100 ms; heavy search/filter results ≤200 ms p95 | Full catalog, midrange reference device, no network dependency for cached search |
| Command handling | Server validation/commit p95 ≤150 ms, p99 ≤500 ms under target load | Exclude client network; separately report engine compute and DB contention |
| In-region action feedback | Accepted-result feedback p95 ≤300 ms on declared reference network | RTT/loss specified; pending state immediate; no simulated instant acceptance |
| Loading | Initial shell ≤2 MiB compressed; first playable scene target ≤8 MiB incremental | Lazy renderer, representative assets; usable shell ≤3 s on 20 Mbps/100 ms RTT reference |
| Reconnect | p95 usable resync ≤5 s after connectivity returns and auth is valid | Host change, duplicate pending intent and burst reconnection tests |
| Reliability | Proposed early public availability 99.9% monthly; revisit 99.95% with operations maturity | External valid-journey probes and server telemetry; explicit exclusions and error budget |
| Integrity | No duplicate settlement or accepted hidden-information disclosure in release suites | Fault injection/property tests; any real incident is release-blocking until assessed |

A 60 fps goal is not a reason to make every animation 16 ms long. Animation pacing is a design choice; responsiveness and frame consistency are engineering budgets. Memory targets require device-specific measurement: no single portable browser API gives a trustworthy total GPU-memory promise. Capture heap/texture counts and sustained-device behavior, and set tested caps in the performance manifest.

### 14.2 Capacity model

Plan against **concurrent players actively in matches**, spectators, queue traffic and expensive background work separately. Working sizing fixture: two players/match, 0.1 accepted commands/second/match averaged over play, with 5× short bursts. These are assumptions to replace with telemetry.

| Active players | Concurrent matches | Mean accepted commands/s | Short burst commands/s |
|---:|---:|---:|---:|
| 100 | 50 | 5 | 25 |
| 1,000 | 500 | 50 | 250 |
| 10,000 | 5,000 | 500 | 2,500 |

CPU demand is approximately commands/s × measured compute milliseconds ÷ 1,000, plus projection/network/job overhead and headroom. This is not a benchmark. At 1,000 active players, a hypothetical 40 KB state rewrite on every command yields roughly 2 MB/s or 173 GB/day of raw state writes before WAL/index effects; a 1 KB journal entry yields about 4.32 GB/day. These illustrate why checkpoint strategy and retention need measurement even in a turn-based game.

Socket count includes spectators and duplicate tabs. Egress approximates recipients × projection bytes × update rate, reduced by effective deltas/batching and compression after security review. Avoid compressing secrets together with attacker-controlled content without considering side channels. Connection pools across every instance/worker must fit the DB’s actual limit; autoscaling cannot create unlimited database connections.

Test a load staircase, burst arrivals, queue spikes, reconnect storms, slow consumers, hot matches, long effect chains, mass pack opening and concurrent simulations. Publish maximum qualified capacity with headroom. When approaching it, reduce optional simulations, cap new admissions and communicate queue waits; never sacrifice committed active matches first. Add regions only with explicit account/data/queue routing and residency design. Active matches stay in one authoritative region; arbitrary cross-region failover is not automatic correctness.

### 14.3 Failure and recovery matrix

| Failure | Required behavior | Qualification evidence |
|---|---|---|
| Browser reload/background | Fresh auth/viewer state; resolve pending command/opening receipt | Physical-device tests and browser crash/reload fixtures |
| Match process dies before commit | No accepted effect; client can retry safely | Kill at transition/transaction boundaries |
| Process dies after commit before acknowledgment | Duplicate request returns committed receipt | Fault injected after DB commit |
| Worker retries reward/email/outbox | Idempotent internal effect; external delivery dedupe where supported | Duplicate and reordered job tests; email may require provider idempotency plus sent record |
| Concurrent commands/timeout | One valid committed order; loser revalidates/rejects | Race/property tests with varied interleavings |
| Database unavailable | Stop accepting state mutations; show degraded/reconnecting; no fabricated success | Network partition and recovery drill |
| Database failover/restore | Reconcile committed history and known durability window; pause affected queues | Provider-specific failover and isolated restore rehearsal |
| Asset/CDN outage | Readable fallback cards/text; avoid endless match-blocking spinners | Missing/corrupt asset tests and cache behavior |
| Bad content release | Stop new admissions for affected manifest; existing matches handled by explicit policy | Rollback rehearsal and replay of old/new versions |
| Provider/region outage | Status communication, controlled outage policy and documented restore path | Tabletop exercise plus measured restoration from backups |

For ordinary process failure with healthy committed PostgreSQL, the target is zero lost acknowledged commands. Database/AZ/region failure has its own RPO. Proposed initial disaster target for beta planning: RTO ≤4 hours and measured RPO ≤15 minutes, subject to provider capability and Director acceptance; these are not promised until a restore drill proves them. Public competitive/economy durability requires a stricter documented failure model and explicit provider choice. Retain backup manifests/checksums, test encrypted restore with separate credentials, and verify ledger totals and match versions after restoration. Use provider PITR plus periodic encrypted off-provider exports; document their different retention/RPO and test both. A daily export alone cannot meet a 15-minute regional-disaster RPO. Any restored history gap pauses affected queues and invokes an audited reconciliation/void/compensation policy before accepting new results.

Runbooks: failed deploy, incompatible client, DB outage, restore, hidden-information incident, reward duplication, rules defect/card disable, email outage, asset failure, abusive traffic, cost spike and lost administrator access. Each includes detection, owner, immediate action, player communication, recovery verification and post-incident follow-up. A dashboard without an accountable responder is not an operating plan.

### 14.4 Cost model and procurement

**No player payment is planned. Hosting, assets, development tools and human expertise still cost money.** This investigation does not establish a reliable massive-scale monthly price before benchmarks and vendor quotes.

Verified price anchors, USD before taxes: R2 Standard storage $0.015/GB-month, Class A $4.50/million and Class B $0.36/million, with a monthly Standard allowance of 10 GB, 1 million A and 10 million B operations. R2 egress is free, but other services can charge; usage rounds to billing units [S24]. Resend’s inspected Free tier includes 3,000 emails/month with a 100/day limit; Pro is $20/month for 50,000 transactional emails, with the inspected overage rate $0.90/1,000 [S27]. Recheck at purchase.

Render’s current compute names include `1c-2g`, while older names may remain accepted. The retrieved pricing page did not expose a complete current per-service rate table. Sentry pricing also was not reliably retrieved. **Those quote fields remain unresolved rather than filled with remembered prices.** Cloudflare Pages limits include build/file constraints; asset-heavy content belongs in R2 rather than the static application output [S26].

| Budget line | Quantity/assumption to capture | Calculation/status |
|---|---|---|
| API compute | Instance size × count × environment × active month fraction | Current provider quote required |
| Match compute | Measured commands/s and memory/socket headroom | Current provider quote plus load evidence required |
| Worker compute | Email/reward/content baseline; separate AI simulation hours | Current provider quote; expensive jobs capped |
| PostgreSQL | CPU/RAM, storage growth, backups/PITR, standby if enabled | Quote primary and standby separately; HA is not free |
| Frontend/DNS | Build count, seats, domain renewal, optional paid edge features | Plan selection and registrar quote |
| R2 assets/replays | Average GB-month, Class A/B requests, retention | Formula from verified rate card; separate public/private buckets |
| Email | Verification/recovery/event notifications per day and month | Daily bursts can exceed Free even below monthly quota |
| Observability | Errors, traces, logs, retention, uptime checks | Quote and enforce sampling/volume caps |
| CI/artifacts | Runner minutes, caches, retained builds, test video | GitHub plan/usage quote required |
| Human/tooling | Art/audio/fonts, device testing, rules review, moderation, agent/model usage | Separate from hosting; Director budget required |

Example limited **R2-only** estimate: 100 GB-month, 2 million Class A and 20 million Class B operations at inspected Standard allowances gives $1.35 + $4.50 + $3.60 = **$9.45/month** before taxes/other services. This is arithmetic on declared usage, not an estimate of the entire game.

Planning allowance, not a vendor quote: **$150–$400/month for a modest paid staging/closed-beta footprint**, excluding labor/art, devices, model subscriptions, significant simulation, high availability upgrades and unexpected bandwidth/log volume. Validate the full worksheet before spending; the actual configuration may exceed it. Local development can begin without incremental hosting charges using existing hardware. A public-scale budget is produced after the M1/M2 capacity test and durability decision; do not anchor it to the closed-beta allowance.

Create alerts at 50/75/90% of the approved monthly budget and daily anomaly thresholds. A hard cost-control policy first disables optional simulations/exports/verbose telemetry and caps new admissions. Preserve ongoing matches and durable state. Billing alerts are not hard spending caps unless the provider actually supports enforcement.

## 15. Testing, CI/CD and release management

### 15.1 Test layers

| Layer | Purpose | Required examples |
|---|---|---|
| Pure unit/contract | Domain/rules decisions and schemas | Format validation, ledger posting, reward eligibility, public/private DTOs |
| Card/scenario | Sourced behavior and interactions | Every admitted identity, keyword, effect branch and known regression |
| Property/fuzz | Invariants across generated action sequences | Conservation, finite progress, deterministic replay, unauthorized information equivalence |
| Database integration | Actual PostgreSQL transactions and migrations | Duplicate commands/openings, race/lock/isolation behavior, outbox and idempotent jobs |
| Protocol integration | Multi-client/multi-instance operation | Reordering, duplicate frames, auth expiry, schema rejection, slow reader and reconnect |
| Browser end-to-end | Complete user outcomes | Guest/upgrade, build/play/reward/open, replay, limited, block/report, admin controls |
| Visual/interaction | Approved creative reference | Dense boards, long text, small screens, input states and reduced motion |
| Accessibility | Practical access and standards target | Automated axe plus keyboard, screen-reader and real-device sessions |
| Load/fault | Capacity and failure contracts | Process kill, DB failure, burst load, timeout races, restore and deploy drain |
| Security/abuse | Domain boundaries and resource protection | IDOR, CSRF/origin, hidden payloads, reward abuse, import/XSS and admin scope |

Do not count snapshot screenshots, line coverage or tests named after cards as proof of correctness. Require assertions on meaningful outputs and a source-backed oracle. Differential comparisons with upstream help find divergence but cannot establish correctness when both versions share the same bug. No AI system is the sole rules oracle.

### 15.2 Pipeline

PR: frozen install → formatting/lint/type-check → import-boundary/schema checks → affected unit/rules tests → PostgreSQL integration → build → selected browser journeys → dependency/license/secret checks. Expand affected suites based on change category; engine, projection, persistence or economy changes run their full critical suites. Keep optional expensive simulations on scheduled or explicit runs while preserving required card/release gates.

Main/staging: produce immutable container/frontend/content artifacts with SHA and SBOM → run migrations on a fresh/restored staging DB → deploy → smoke and protocol checks → representative replay corpus → physical-device/design review when relevant → load/fault evidence for infrastructure changes. Archive results, screenshots and traces with private data redacted.

Release manifest binds web/API/protocol/engine/content/rules/schema/product/reward versions. Promote already-built artifacts; do not rebuild an unverified “same” commit with floating dependencies. Support a bounded protocol compatibility window and an explicit upgrade-required response. Running matches remain pinned to compatible engine bundles; keep older bundles available until those matches finish or migrate through a separately tested process.

Production rollout: preflight backup/health/budget → additive migration → limited service rollout → synthetic account/match probe → staged traffic/admission increase → observe error and integrity signals → complete or stop. Draining instance stops new work, persists/finishes bounded in-flight commits, closes sockets with reconnect guidance and exits inside provider limits. Rollback code only when schema/content remain compatible; otherwise use a planned roll-forward. “Rollback” is not restoring an old database over new valid player activity.

### 15.3 Definition of done

A feature is accepted only when its requirement IDs, implementation, tests, failure states, telemetry, permissions, accessibility, relevant devices and documentation are linked. Any content/asset dependencies are resolved or explicitly labeled placeholders. Relevant performance budgets pass. A second reviewer examines critical rules/security/economy work. The Director signs off on creative/product acceptance where required. A passing agent-generated test suite alone does not equal release approval.

Release defects: P0 integrity/privacy/account compromise; P1 incorrect admitted rules, lost acknowledged state, broken core journey or inaccessible mandatory action; P2 significant degraded experience with workaround; P3 minor polish. P0/P1 block affected release/admission. Track defect rates and escaped defects by subsystem instead of presenting only total completed tickets.

## 16. Delivery milestones and team process

### 16.1 Milestones and exit evidence

| Milestone | Deliverable | Dependencies | Exit evidence |
|---|---|---|---|
| M0 — Foundation | New workspace, ADRs, source/license ledger, toolchain, CI, local services, content inventory and initial art studies | This plan; no paid production service required | Reproducible clean setup, scoped backlog, dependency build proof, source/certification inventory and Director direction selection |
| M1 — Quality/authority proof | One complete representative match, authored table/pack, semantic controls, desktop and touch slice, durable commit/reconnect | M0, engine adapter/RNG/projections | Rules scenarios pass; hidden payload tests; kill/reconnect proof; first device/performance report; acceptable visual reference |
| M2 — Closed-alpha game loop | Accounts/guest upgrade, collection/decks/products, ordinary Lab, rewards, queue, basic history/replay and content admin | M1 transaction/security contracts | End-to-end build → play → earn → open; races/retries pass; real users can complete journeys; capped deployment budget |
| M3 — Broad playable beta | Declared complete launch catalog, learning, basic fair bots, encyclopedia, social/reporting, analytics, replay/spectator controls | M2; card certification throughput | Catalog coverage report, real-device matrix, restore drill, onboarding/playtests and moderation readiness |
| M4 — Competitive/limited | Ranked/seasons, Draft/Sealed/Pack Rush, tournament pairing/judges, discovery/metagame | Stable M3; format/event policy tests | Competition simulations, timed pick recovery, standings fixtures, abuse and privacy qualification |
| M5 — Full vision expansion | Advanced Lab science, stronger AI, multiplayer/scenarios/Coconut as qualified, advanced cosmetics and selected market model | Stable core; separate engine/layout qualification | All committed R/X requirements accepted or explicitly optional/deferred by Director; complete feature-specific evidence |
| M6 — Public operations/ecosystem | Public-release hardening, capacity/availability plan, support/incident routines; optional public API | Applicable product milestones plus release gates | Provider durability decision, load/SLO evidence, asset/privacy readiness, runbooks, sustainable budget and release sign-off |

Public beta can occur before M5 if clearly labeled with supported features; that does not complete the full vision. M6 operational work starts in M0 and is hardened throughout, not saved for the last week. Dates should follow measured M1 velocity and card backlog size. A premium full-catalog live service is a sustained program; no credible fixed completion date can be inferred from repository size or number of agents.

Suggested initial cadence: a two-week M0/M1 discovery/build cycle with an end-of-cycle evidence review, then re-estimate. This is a planning cadence, not a promise that M1 finishes in two weeks. Use pessimistic/likely/optimistic estimates per epic after the first working adapter and authored slice expose actual effort.

### 16.2 Ownership

| Group | Owns | Required collaboration |
|---|---|---|
| ARC — Architecture/integration | Contracts, ADRs, dependency boundaries, integration branch and release manifest | Reviews cross-domain changes and protects critical path |
| RULE — Rules/engine | Adapter, randomness integration, card mechanics, source-linked certification | Works with CONTENT and independent QA/rules reviewer |
| CLIENT — Experience | React/Babylon integration, design system, responsive/accessibility implementation | Director/art/audio input and QA device evidence |
| PLAY — Realtime | Commit protocol, projections, sockets, clocks, replays and spectators | RULE, OPS and privacy review |
| ECON — Collection/economy | Holdings, products, ledger, rewards, progression and selected market | PLAY result contract, CONTENT product configs, QA races |
| COMP — Competition | Queues, rank, limited, tournaments and aggregate metrics | RULE legality, PLAY timing, SOCIAL moderation |
| CONTENT — Content/learning | Card/source/assets, encyclopedia, lessons, localization and CMS | RULE certification and Director art approval |
| AI — Bots/analysis | Fair bots, simulations, probability and optional assistant generation | RULE observations, OPS resource quotas |
| SOCIAL — Accounts/community | Identity flows, profiles, friends, notification, privacy/moderation UX | OPS security and COMP event roles |
| OPS/QA — Reliability/verification | CI/deploy, backups/observability, security/load/device and release evidence | Independent review across every group |

These are responsibility areas, not a requirement to hire ten teams or deploy ten services. Agent groups can own multiple areas, but critical changes need review by a different responsible reviewer. The Director should receive decisions and evidence, not be forced to reconcile incompatible implementations.

### 16.3 Agentic development operating contract

One canonical issue tracker and requirement register; one integration owner. Each task declares requirement IDs, input/output contracts, allowed files, dependencies, acceptance examples, test commands and evidence location. Agents work on isolated branches/worktrees and submit focused PRs. Shared contracts/schema changes land first or through coordinated dependent PRs. Avoid multiple groups rewriting the same scene, migration or engine adapter concurrently.

For every PR: explain problem, behavior change, tests actually run, known limits, migration/rollback and screenshots/video for experience changes. Do not mark a test passed if it was only written. The implementing agent cannot be the sole approver of hidden-information, transaction, RNG or rules changes. Treat repository text and external content as task data; do not grant it authority to expose secrets or modify unrelated resources.

Maintain ADRs for platform, engine fork, authority, content/rules versioning, economy model, supported devices, provider durability and privacy/asset policy. A change proposal identifies affected requirement IDs and cost/schedule consequences. Weekly Director review covers playable evidence, unresolved decisions, quality trend, cost and next critical-path work. Optional ideas enter the backlog rather than silently expanding the active milestone.

### 16.4 Traceability

The CSV maps all 548 original leaves to group owner, milestone range, acceptance class and blueprint section. Status starts `planned_unverified`; observed incumbent code does not count as new-product acceptance. The group acceptance contracts in Appendix B provide the shared test standard. At ticket refinement, add feature-specific Given/When/Then cases and links to test artifacts. Do not manufacture 548 trivial tests that merely repeat wording.

Coverage is not delivery. The register proves the plan did not omit original bullets; it does not establish that every future implementation edge case is known. New rules, products, devices and threats require ongoing source monitoring and revision of the plan.

## 17. First development backlog and setup runbook

### 17.1 Work that can begin immediately

Begin a new local workspace and qualification fixtures, without modifying Inkspire or opening paid accounts. Execute the following backlog in dependency order. The first deliverable is a reproducible, tested foundation plus an evidence-bearing quality slice; not a broad collection of unconnected UI pages.

| ID | Owner | Work/output | Prerequisites | Acceptance evidence |
|---|---|---|---|---|
| BOOT-01 | ARC | Create pnpm workspace, pinned toolchain, package boundaries, scripts and ADR baseline | Blueprint | Clean checkout installs, builds minimal web/API/worker, type-checks and rejects forbidden imports |
| BOOT-02 | OPS/QA | Local PostgreSQL 18 container, scoped app roles, migrations and test DB | BOOT-01 | Reproducible start/health/migrate; persistence through recreate; role restrictions tested |
| BOOT-03 | OPS/QA | GitHub CI definition, frozen installs, artifact identity and secret/license scans | BOOT-01 | Local pipeline and reviewed Actions definition; no deployment credentials needed |
| BOOT-04 | OPS/ARC | Staging provider definitions and complete spend worksheet | BOOT-01; Director budget before purchase | Reviewable projects/services/DNS/secret inventory with current line-item quotes |
| BOOT-05 | ARC | Protocol/release manifest schemas and compatibility policy | BOOT-01 | Valid/invalid fixture tests, version negotiation contract and browser/server import split |
| RULE-01 | RULE/CONTENT | Acquire current official source bytes; rules diff, set/printing and skipped-test inventory | Source register | Counts with denominators, source hashes when available, missing documents flagged, release-status mapping |
| RULE-02 | RULE | Vendor pinned minimal upstream closure with license and patch ledger | BOOT-01, RULE-01 | Reproduce upstream relevant tests; compile/run selected adapter under Node 24; no Bun-only production dependency |
| RULE-03 | RULE/QA | Secure RNG injection and deterministic outcome recording | RULE-02 | No competitive `Math.random` fallback; replay equality and random-stream access tests |
| RULE-04 | RULE/QA | Representative current-rules scenario suite and per-card certification template | RULE-01/02 | Sourced expected results, negative cases, effect-bag/choices, new-keyword and invalid-state coverage |
| PLAY-01 | PLAY | Match schema, receipts/journal/outbox and CAS transition service | BOOT-02/05, RULE-02 | Concurrent commands cannot double commit; durable receipt survives process death |
| PLAY-02 | PLAY/QA | Viewer projections and noninterference tests | PLAY-01 | Opponent hand/deck identity absent from every transport/resource/log/export path |
| PLAY-03 | PLAY | WebSocket handshake, versioned snapshots, reconnect and backpressure | PLAY-01/02 | Two real clients complete a game, reconnect on different host and resolve duplicate pending command |
| PLAY-04 | PLAY/QA | Clock policy, durable deadlines and timeout race handling | PLAY-01/03 | Fake-clock and real process tests; no disconnect/time abuse or duplicate terminal result |
| UX-01 | CLIENT/Director | Three art-direction studies and interaction specification | Product contract | Same dense board/deckbuilder/pack shown in each; Director selects reference direction |
| UX-02 | CLIENT/QA | Reference-device/browser matrix and responsive semantic wireflows | UX-01 | Desktop/tablet/phone core journeys; keyboard and touch alternatives; device floor proposal |
| UX-03 | CLIENT | Tokens, unstyled primitives, Storybook and accessible card inspection | BOOT-01, UX-01/02 | Focus/contrast/text/reduced-motion states; long strings; no dashboard theme dependency |
| WEB-01 | CLIENT | Babylon table lifecycle and quality tiers outside React render cycle | UX-03 | Dense board fixture, explicit WebGL path, measured frames and GPU-context restoration |
| WEB-02 | CLIENT/PLAY | Intent/choice UI connected to authorized live match projection | WEB-01, PLAY-03/04 | Complete legal mouse/keyboard/touch match; stale/rejected action and readable effect explanation |
| WEB-03 | CLIENT/ECON | Authored pack presentation on synthetic committed opening receipts | UX-03 | Reveal/skip/bulk/reduced motion/resume; presentation cannot change grants |
| AUTH-01 | SOCIAL/OPS | Better Auth schema, verified sessions/recovery and local mail adapter | BOOT-02 | Secure cookie/origin behavior; expired/reused tokens; tests without sending real emails |
| AUTH-02 | SOCIAL/ECON | Guest identity and idempotent verified upgrade/merge | AUTH-01 | No cross-user linking or duplicate starter grant; recoverable interrupted merge |
| DECK-01 | CLIENT/RULE | Deck revisions, filters/import/export and separate legality/ownership policy | RULE-01, AUTH-01 | Full catalog query fixture; exact round-trip import; useful hard errors/warnings |
| ECON-01 | ECON/QA | Holdings and integer wallet ledger with idempotent grants | BOOT-02, AUTH-01 | Balance conservation, nonnegative holdings and concurrent grant/spend fixtures |
| ECON-02 | ECON/CONTENT | Versioned products and transactional opening/receipts | ECON-01 | Same outcome after retry/reload, no double consume; distribution-source disclosure |
| ECON-03 | ECON/PLAY | Eligible Lab/Collection reward settlement and sandbox exclusions | ECON-01, PLAY-01 | Finish/retry/correction races; ordinary Lab earns; manipulated sessions cannot |
| COMP-01 | COMP/PLAY | Queue admission and atomic cancel/pair/deck lock | DECK-01, PLAY-03 | One admission, correct environment/format, blocked/stale relationships and reconnect behavior |
| REPLAY-01 | PLAY/CLIENT | Pinned deterministic history/replay with checkpoints and private sharing | PLAY-01/02, WEB-02 | Reconstructed state equality, scrub controls, privacy tests and sandbox branch provenance |
| CONTENT-01 | CONTENT | Staged catalog/product/ruling editor and manifest activation | RULE-01, AUTH-01 | Permissioned diff/review, immutable revision, safe activation/rollback |
| QA-01 | QA | Core full-loop browser suite and manual playtest script | Relevant M1/M2 work | Build → play → earn → open; account switch; assets/network failures; reported real-device results |
| OPS-01 | OPS/QA | Instrumentation, staging fault/load fixture and restore runbook | BOOT-04, PLAY-01 | Redacted traces, measured bottlenecks, commit-boundary kills and verified DB restore |

Immediate critical path: BOOT-01/02/05 → RULE-01/02/03 → PLAY-01/02/03 → WEB-02. Art direction, device work and pack presentation run alongside that path through coordinated tasks. Economy and account flows start after their database/identity contracts exist. Broad card certification begins early and continues through every milestone.

### 17.2 Setup procedure

The ZIP is a **planning handoff**, not the new game repository. Its dependency fixture can be resolved today; the product commands below are the required BOOT-01/02 interface and will work only after those tickets implement the scaffold. This distinction prevents a documentation command from being mistaken for an existing application.

1. Install Git, official Node 24.21.0 and a Docker-compatible engine/Compose on the chosen machine. Confirm Node and Compose versions. Use official installation instructions appropriate to the OS; do not run arbitrary copied installer scripts with elevated privileges.
2. Install/select pnpm 10.33.0. For a Node installation with a writable user-managed global prefix, the package-manager command is `npm install --global pnpm@10.33.0`. Record `node --version` and `pnpm --version` in the setup report. BOOT-01 pins `packageManager` and the Node version file.
3. Create the new workspace layout in §3.4. Split the qualified pins between packages, establish reviewed build-script permissions and generate the production pnpm lockfile. Commit it; subsequent installs use `pnpm install --frozen-lockfile`.
4. Copy the supplied example configuration to ignored local files, generate unique local secrets and configure the DB container. BOOT-02 provides `infra/compose.local.yml`; expose PostgreSQL only on `127.0.0.1`. PostgreSQL 18’s official container volume layout uses `/var/lib/postgresql`, so do not copy an older-version mount convention blindly [S37].
5. Start local DB: `docker compose -f infra/compose.local.yml up -d postgres`. Run `pnpm db:migrate`, then `pnpm db:seed:dev` for synthetic fixtures. Seeds refuse non-development environments.
6. Install test browsers: `pnpm exec playwright install chromium firefox webkit`. On Linux, required OS libraries are installed using the documented Playwright environment procedure or a pinned CI image; do not assume the browser download supplies them.
7. Start apps with `pnpm dev`. Proposed local ports: web 5173, API 3001, match service 3002. Local worker has no public port. Health endpoints distinguish process liveness from database/readiness.
8. Run `pnpm verify:foundation`, then `pnpm test:integration` and `pnpm test:e2e:smoke`. Verify clean login/guest flow, a synthetic match, reconnect and a receipt-bound opening. Capture actual output and known limitations.
9. Separately qualify upstream Bun 1.4.2 workspaces, then the Node adapter. Do not run the entire unrelated monorepo as an unexplained product build dependency.
10. Provision staging only after BOOT-04 has concrete configuration and a reviewed spend estimate. Mirror the local contracts, use separate secrets and run staging acceptance before invited users.

The companion `SETUP_RUNBOOK.md` repeats this interface with variable inventory, smoke outcomes, upstream notes and failure diagnosis. Container metadata is included where retrieval succeeded; runtime execution and image security qualification remain BOOT evidence. Exact managed-service versions are captured from the provisioned service rather than assumed to match a local tag.

### 17.3 Required workspace script contract

| Script | Required behavior |
|---|---|
| `dev` | Start web/API/match/worker with stable logs and shutdown; no production credentials |
| `build`, `typecheck`, `lint` | Reproducible package-ordered builds and boundary checks |
| `db:migrate` | Reviewed migrations for explicit target; prod never auto-migrated implicitly |
| `db:seed:dev` | Synthetic catalog/users/scenarios only; refuse production |
| `verify:foundation` | Config/schema/import tests and minimal build proof |
| `test:rules`, `test:cards` | Pinned source/scenario and admitted-card certification suites |
| `test:integration` | Real PostgreSQL races, receipts, outbox, auth and permissions |
| `test:e2e:smoke`, `test:e2e` | Core journey subset and broader browser/device fixtures |
| `test:privacy`, `test:replay` | Viewer noninterference and deterministic reconstruction |
| `test:load`, `test:fault` | Explicit synthetic target only; no accidental production load |
| `content:validate`, `content:diff` | Source/schema/identity/asset/legality diff with admission status |
| `verify:release` | Manifest/SBOM/evidence completeness and release gate report |

## 18. Decisions, risks and release gates

### 18.1 Director decision register

Local foundation work can proceed under the working recommendations. The following choices are needed by the named milestone, with proposals recorded so work does not stall on routine implementation details.

| ID | Decision | Working recommendation | Deadline/impact |
|---|---|---|---|
| D01 | Project identity/domain and approved visual direction | New product identity; three tabletop studies; selective Inkspire reuse | During M0, before final branding/assets |
| D02 | Monthly operating/tool/art budget and hosting durability tolerance | Capped staging/closed beta; public provider chosen from measured RPO/load | Before any paid provisioning; public choice before M6 |
| D03 | Initial audience/geography/age policy | Start with invited audience and one region; research actual intended users | Before real-user beta/account publication |
| D04 | Launch catalog/formats and release labeling | All target released content catalogued; only certified identities playable; Core/Infinity ordinary play first | After RULE-01 inventory, before beta claims |
| D05 | Collection/ranked/reward/acquisition balance | Lab currency eligibility preserved; ownership-free Lab; accessible acquisition path before Collection Ranked | Before M2 economy tuning/M4 ranked |
| D06 | Crafting/wildcards and market/trading model | Choose one missing-card mechanism; NPC virtual acquisition first; P2P deferred unless selected | Before broad economy design; X03 policy explicit |
| D07 | Asset/data rights, permitted hosting/use and privacy terms | Neutral fixtures until authorized distribution is established | Before public assets or real-user release |
| D08 | Supported device floors and mobile release readiness | Desktop primary; core touch alongside; advertise only tested journeys | After M1 device proof, before beta support claims |
| D09 | Public feature scope and optional items | Preserve all checklist options; decide consciously at milestone review | Before claiming full vision completed |

### 18.2 Risk register

| Risk | Impact | Mitigation/owner | Evidence required |
|---|---|---|---|
| Current engine/card gaps | Incorrect matches or overclaimed catalog | RULE inventory and certification; source pin/fork | Per-card matrix and rules diff |
| Hidden-instance mapping exposure | Competitive trust/privacy failure | PLAY projections and wire-level noninterference | All viewer-role payload tests |
| Upstream workspace/runtime incompatibility | Bootstrap delay or fragile builds | ARC/RULE minimal closure and Node qualification | Clean build/execution proof |
| Rendering quality falls short | Repeat of plain simulator experience | CLIENT authored reference plus dense-board playtests | Director-approved interactive captures |
| Mobile thermal/suspension constraints | Broken touch match/resume | CLIENT/QA adaptive scene and durable reconnect | Physical-device sustained tests |
| Database durability assumption | Lost accepted moves/rewards | OPS explicit failure model/provider gate | Failover/restore results and approved RPO |
| Economy duplication/farming | Corrupted collection or progression | ECON ledger, admission eligibility and idempotency | Race/fault and abuse fixtures |
| Free project operating costs | Unsustainable public operation | OPS quotas, cost worksheet, capacity admission | Measured unit costs and approved budget |
| Asset/distribution uncertainty | Blocked public release | CONTENT/Director source/rights ledger | Documented permitted use and distribution |
| Unbounded simulation/card effects | Live match resource starvation | PLAY/AI worker isolation and time budgets | Worst-case/load/fault tests |
| Parallel agent integration drift | Conflicting contracts and fragile milestones | ARC task boundaries/ADRs/integration review | Focused reviewed PRs and integrated slice |
| Moderation/support capacity | Unsafe or unsupported community | SOCIAL conservative channels and case workflow | Responsible owner, working reports/appeals |

### 18.3 Gates

**Development entry:** this written plan, original requirement register, selected stack/pins, local setup contract, first backlog and explicit unresolved decisions. Paid accounts, final art and public legal terms are not prerequisites for synthetic foundation work.

**M1 qualification:** reproducible Node adapter; current-rules representative fixtures; secure RNG plan implemented; no hidden information in tested payloads; durable CAS/receipt and process-kill recovery; authored desktop scene plus touch/semantic controls; initial performance/device report. A failing renderer proof reopens only the renderer decision, not the whole project without evidence.

**Closed real-user test:** safe accounts/recovery/guest upgrade; privacy/age/data policy; permitted test assets; reward/opening races; basic reports/admin; backup restore; declared supported catalog/devices; verified spend; operator and incident contact. No unsupported competitive claims.

**Public release:** no unresolved P0/P1 defects; complete certification for admitted catalog/formats; privacy/asset distribution readiness; actual client/server compatibility tests; load and reconnect storm headroom; provider-specific durability decision; tested migration/drain/restore; scoped administration/moderation; telemetry and accountable alert response; sustainable budget; Director product/release sign-off.

**Full-vision completion:** every mandatory original leaf and accepted X requirement has linked evidence, appropriate device status and product acceptance. Optional items have an explicit Director disposition. Multiplayer/scenarios, advanced Lab, competition, collecting, learning and social systems are assessed separately; a polished Bo1 simulator is not the whole requested game.

## 19. Evidence and source register

Primary documents were retrieved or source metadata inspected during this research. URLs below permit rechecking; some pages are mutable. Each implementation ticket must pin the actual applicable revision. Sources support factual capabilities and baseline constraints; architectural choices and targets are our recommendations.

| ID | Source | What it supports/status |
|---|---|---|
| S01 | [Official Lorcana resources](https://www.disneylorcana.com/en-US/resources) | Current document discovery and dates; future monitoring entry point |
| S02 | [Comprehensive Rules 2.2.0](https://files.disneylorcana.com/Comprehensive-Rules_2.2.0-EN.pdf) | Current gameplay source; web-readable; local byte download failed |
| S03 | [Tournament rules linked by official resources](https://files.disneylorcana.com/Tournament-Rules-7.14.2026_Update_EN.pdf) | Constructed/limited/event policy; document/listing dates stored separately |
| S04 | [Official Pack Rush quick rules](https://files.disneylorcana.com/OPPack_Rush_QuickRules_EN.pdf) | Pack Rush format source |
| S05 | [Coconut Beta rules](https://files.disneylorcana.com/FormatCoconut_Rules.pdf) and [beta cards](https://files.disneylorcana.com/FormatCoconut_BetaCoconutCards.pdf) | New experimental multiplayer scope; not yet engine-certified |
| S06 | [Official media guide/use-policy link](https://brand.ravensburger-group.com/d/e1vhRSQ7WeNy) | Located; policy contents not retrievable here; permissions unresolved |
| S07 | [LorcanaJSON project](https://github.com/LorcanaJSON/LorcanaJSON) | Candidate normalized data and source-code license; not proof of full catalog/asset rights |
| S08 | [Node release schedule](https://github.com/nodejs/Release/blob/main/README.md), [release index](https://nodejs.org/dist/index.json) | Node 24 LTS choice and inspected 24.21.0 release |
| S09 | [TypeScript ESLint project](https://github.com/typescript-eslint/typescript-eslint) and exact npm peer metadata in package | TS 6/7 compatibility choice; actual pin in dependency register |
| S10 | [Vite guide](https://vite.dev/guide/) and [React](https://react.dev/) | Build/runtime requirements and framework baseline |
| S11 | [npm registry](https://registry.npmjs.org/) exact per-version records | Direct versions, engines, peers and package licenses; accompanying JSON stores exact URLs |
| S12 | [Fastify TypeBox provider](https://github.com/fastify/fastify-type-provider-typebox) | Current provider/package compatibility |
| S13 | [Babylon documentation source](https://github.com/BabylonJS/Documentation/blob/master/content/setup/support/webGPU.md) and [specifications](https://www.babylonjs.com/specifications/) | Rendering capabilities and explicit WebGPU qualification/fallback |
| S14 | [React Aria](https://react-aria.adobe.com/) | Unstyled accessible component approach |
| S15 | [Better Auth Fastify integration](https://better-auth.com/docs/integrations/fastify) | Auth route integration |
| S16 | [Better Auth cookies](https://better-auth.com/docs/concepts/cookies) | Same-site deployment and Safari cookie constraints |
| S17 | [Drizzle transactions](https://orm.drizzle.team/docs/transactions) | Transaction interface, not automatic domain correctness |
| S18 | [PostgreSQL transaction isolation](https://www.postgresql.org/docs/current/transaction-iso.html) | Isolation/concurrency and retry considerations |
| S19 | [Chrome page lifecycle](https://developer.chrome.com/docs/web-platform/page-lifecycle-api), [WebKit storage](https://webkit.org/blog/14403/updates-to-storage-policy/), [WebKit web push](https://webkit.org/blog/13878/web-push-for-web-apps-on-ios-and-ipados/), [Workbox lifecycle](https://developer.chrome.com/docs/workbox/service-worker-lifecycle) | Suspension, storage, push and update constraints; browser/device qualification still required |
| S20 | [Render WebSockets](https://render.com/docs/websocket) | Finite shutdown and arbitrary-instance reconnect behavior |
| S21 | [Render PostgreSQL backups](https://render.com/docs/postgresql-backups) | Paid PITR retention and restore workflow |
| S22 | [Render PostgreSQL HA](https://render.com/docs/postgresql-high-availability) | Standby prerequisites/cost and possible recent-write loss |
| S23 | [AWS RDS Multi-AZ single standby](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.MultiAZSingleStandby.html) | Candidate synchronous standby deployment; whole system still needs qualification |
| S24 | [Cloudflare R2 pricing](https://developers.cloudflare.com/r2/pricing/) | Verified storage/request pricing, allowance, rounding and egress scope |
| S25 | [R2 public buckets](https://developers.cloudflare.com/r2/buckets/public-buckets/) | Custom-domain production asset distribution |
| S26 | [Cloudflare Pages limits](https://developers.cloudflare.com/pages/platform/limits/) | Build/file constraints |
| S27 | [Resend pricing](https://resend.com/pricing) and [machine-readable rate card](https://resend.com/pricing.md) | Inspected transactional quotas/rates; official Markdown bytes retrieved directly; recheck at purchase |
| S28 | [WCAG 2.2](https://www.w3.org/TR/WCAG22/) | Accessibility target and evaluation basis |
| S29 | [Playwright browsers](https://playwright.dev/docs/browsers) | Browser installation/coverage; WebKit automation is not real Safari certification |
| S30 | [OWASP WebSocket security](https://cheatsheetseries.owasp.org/cheatsheets/WebSocket_Security_Cheat_Sheet.html) | Socket security controls |
| S31 | [GitHub Actions security](https://docs.github.com/en/actions/reference/security/secure-use) | Credential/build and commit-pinning practices |
| S32 | [pg-boss](https://github.com/timgit/pg-boss) | PostgreSQL-backed job option; internal effects still need idempotency |
| S33 | [TCG Engines pinned tree](https://github.com/TheCardGoat/tcg-engines/tree/53a79413c58678b1c50dde57e71de5c123132716) | Observed engine/source/workspace/license baseline |
| S34 | [Inkspire pinned tree](https://github.com/chroniicallydiistracted/the-inkspirev2/tree/b7b876bac0cdc80c7292608f069c0a64d6373e31) | Private authorized source baseline; readers need repository access |
| S35 | [Render PostgreSQL setup](https://render.com/docs/postgresql-creating-connecting), [regions](https://render.com/docs/regions) and [Blueprint spec](https://render.com/docs/blueprint-spec) | Hosting provisioning constraints |
| S36 | [Render compute plans](https://render.com/docs/compute-plans) and [pricing](https://render.com/pricing) | Current size nomenclature; complete price table unresolved in retrieval |
| S37 | [Official PostgreSQL container](https://hub.docker.com/_/postgres) | Container storage layout; metadata retrieval recorded separately |
| S38 | [PostgreSQL backup/restore](https://www.postgresql.org/docs/current/backup.html) | Backup mechanisms; project restore drill still required |
| S39 | [Attack of the Vine set notes](https://files.disneylorcana.com/Attack-of-the-Vine-Set-Release-Notes_EN.pdf) | Located via official resources; retrieval exceeded tool size limit, not reviewed |
| S40 | [Official artist policy](https://files.disneylorcana.com/artist-policy-en.pdf) | Policy for official Lorcana development artists; not a license for fan-game use |

### 19.1 Repository paths to reproduce findings

Upstream: `submodules/lorcana/packages/lorcana/lorcana-server-adapter/src/lorcana-server-engine.ts`; the associated viewer tests; lifecycle/random source paths; `submodules/lorcana/packages/lorcana/lorcana-engine/package.json`; `lorcana-types/package.json`; `lorcana-cards/package.json`; `submodules/lorcana/pnpm-workspace.yaml`; `.bun-version`; CI workflow; `.agents/skills/lorcana-rules/indexes/master-index.md`. Exact additional file matches can be found with `rg` at the pinned SHA. Reproduction must use pinned source, not mutable default branches.

The earlier master plan preserves selected Inkspire path/CI evidence, including the WebServer startup timeout in the inspected CI run and provenance mismatch between notices and adapter export records. Those historical details are reference findings, not freshly executed tests in the new game. An actual reuse PR must reproduce them and prove its chosen remediation.

### 19.2 Dependency qualification result

The initial 61-direct-package metadata fixture passed npm strict resolution but failed pnpm strict peers because Vitest 5.0.3’s mocker expects MSW 2. The baseline was corrected to **MSW 2.15.0**. The corrected set then completed `pnpm 10.33.0 install --lockfile-only --ignore-scripts --strict-peer-dependencies` successfully, resolving 1,202 packages, with five transitive deprecation warnings recorded in the log.

Resolution ran on the workspace’s Node 24.19.0; the chosen runtime pin 24.21.0 still needs BOOT-01 execution qualification. This proves resolution under the chosen package manager. It did not install runtime binaries, run lifecycle scripts, compile the product, execute app/upstream tests, scan all vulnerabilities or prove framework integration. The ZIP contains the corrected fixture and pnpm lockfile. It excludes the earlier npm lockfile because that represents the superseded MSW baseline. BOOT-01 completes actual build/runtime/security qualification and produces the product workspace lockfile.


## Appendix A — All original checklist requirements

The following 548 leaf requirements retain the original wording and stable IDs. Their implementation status is unverified. The three-environment principles are specified in §1, including ordinary Lab currency eligibility.

IDs retain the original order. Owners and staged delivery are mapped in Appendix B; release gates are in §18. Optional wording remains a Director decision. All checkboxes are deliberately unchecked until feature-specific evidence is accepted.

### R01 — Core Card & Rules Platform

- [ ] **R01.001** — Complete machine-readable card database.
- [ ] **R01.002** — Every printing mapped to its underlying gameplay identity.
- [ ] **R01.003** — Card name, cost, inkability, ink color, classifications, strength, willpower, lore, abilities, keywords, flavor text, artist, set, collector number and rarity.
- [ ] **R01.004** — Separate card **printing** from card **game object**, so alternate art/reprints don’t create duplicate rules implementations.
- [ ] **R01.005** — Full Comprehensive Rules represented programmatically.
- [ ] **R01.006** — Rule-version history.
- [ ] **R01.007** — Errata system.
- [ ] **R01.008** — Card-ruling database.
- [ ] **R01.009** — Keyword definitions.
- [ ] **R01.010** — Ability parser / scripting framework.
- [ ] **R01.011** — Trigger system.
- [ ] **R01.012** — replacement effects.
- [ ] **R01.013** — continuous/static effects.
- [ ] **R01.014** — delayed effects.
- [ ] **R01.015** — conditional effects.
- [ ] **R01.016** — player choice system.
- [ ] **R01.017** — target/selection rules.
- [ ] **R01.018** — randomization.
- [ ] **R01.019** — zone movement.
- [ ] **R01.020** — card visibility rules.
- [ ] **R01.021** — timing and resolution engine.
- [ ] **R01.022** — legality engine.
- [ ] **R01.023** — Core Constructed rotation.
- [ ] **R01.024** — Infinity Constructed legality.
- [ ] **R01.025** — banned/restricted-card support.
- [ ] **R01.026** — future-format support without rewriting the engine.

### R02 — Actual Match Engine

- [ ] **R02.001** — Two-player game sessions.
- [ ] **R02.002** — Opening hand.
- [ ] **R02.003** — Mulligan/redraw.
- [ ] **R02.004** — Draw phase.
- [ ] **R02.005** — Ready/Set/Draw structure.
- [ ] **R02.006** — Inkwell.
- [ ] **R02.007** — playable-card validation.
- [ ] **R02.008** — character play.
- [ ] **R02.009** — item play.
- [ ] **R02.010** — action play.
- [ ] **R02.011** — song mechanics.
- [ ] **R02.012** — locations.
- [ ] **R02.013** — questing.
- [ ] **R02.014** — challenges.
- [ ] **R02.015** — damage.
- [ ] **R02.016** — banishment.
- [ ] **R02.017** — lore accumulation.
- [ ] **R02.018** — exert/ready state.
- [ ] **R02.019** — Shift and similar alternate-cost systems.
- [ ] **R02.020** — triggered ability queue.
- [ ] **R02.021** — simultaneous effects.
- [ ] **R02.022** — effect ordering.
- [ ] **R02.023** — mandatory vs optional effects.
- [ ] **R02.024** — player selections.
- [ ] **R02.025** — reveal/search/look-at mechanics.
- [ ] **R02.026** — shuffling.
- [ ] **R02.027** — deck depletion.
- [ ] **R02.028** — victory/loss/draw detection.
- [ ] **R02.029** — conceding.
- [ ] **R02.030** — match timer.
- [ ] **R02.031** — reconnect handling.
- [ ] **R02.032** — game-state synchronization.
- [ ] **R02.033** — deterministic event logging.
- [ ] **R02.034** — server-authoritative state so clients cannot cheat.

### R03 — Deckbuilder

- [ ] **R03.001** — Create, rename, clone and delete decks.
- [ ] **R03.002** — Drag-and-drop or tap deck editing.
- [ ] **R03.003** — Search.
- [ ] **R03.004** — filtering by ink, cost, type, set, rarity, franchise, keyword, classification, artist, legality, ownership, etc.
- [ ] **R03.005** — Sort by mana/ink curve.
- [ ] **R03.006** — deck statistics.
- [ ] **R03.007** — inkable/non-inkable count.
- [ ] **R03.008** — character/action/item/location/song counts.
- [ ] **R03.009** — color distribution.
- [ ] **R03.010** — cost curve.
- [ ] **R03.011** — card draw/search statistics.
- [ ] **R03.012** — deck validation.
- [ ] **R03.013** — format validation.
- [ ] **R03.014** — warning vs hard-error distinction.
- [ ] **R03.015** — deck notes.
- [ ] **R03.016** — deck folders.
- [ ] **R03.017** — favorite decks.
- [ ] **R03.018** — deck tags.
- [ ] **R03.019** — import/export.
- [ ] **R03.020** — clipboard decklists.
- [ ] **R03.021** — shareable deck URLs/codes.
- [ ] **R03.022** — JSON import/export.
- [ ] **R03.023** — tournament decklist output.
- [ ] **R03.024** — visual card-grid mode.
- [ ] **R03.025** — text-list mode.
- [ ] **R03.026** — alternate printing/art selection without altering deck legality.
- [ ] **R03.027** — automatically substitute owned printings where appropriate.

### R04 — Sandbox / Lab Mode

- [ ] **R04.001** — Every card unlocked.
- [ ] **R04.002** — Build any legal deck regardless of ownership.
- [ ] **R04.003** — Optional illegal-deck override for experimentation.
- [ ] **R04.004** — Core, Infinity and custom formats.
- [ ] **R04.005** — play against another user.
- [ ] **R04.006** — play against AI.
- [ ] **R04.007** — play both sides manually.
- [ ] **R04.008** — hot-seat testing.
- [ ] **R04.009** — manually construct board states.
- [ ] **R04.010** — start from a specific turn.
- [ ] **R04.011** — choose opening hands.
- [ ] **R04.012** — choose deck order.
- [ ] **R04.013** — disable random shuffle.
- [ ] **R04.014** — set lore totals.
- [ ] **R04.015** — set damage.
- [ ] **R04.016** — pre-populate ink.
- [ ] **R04.017** — manually place cards into zones.
- [ ] **R04.018** — undo/redo actions.
- [ ] **R04.019** — rewind game state.
- [ ] **R04.020** — restart from checkpoint.
- [ ] **R04.021** — duplicate a game state.
- [ ] **R04.022** — probability simulations.
- [ ] **R04.023** — opening-hand simulations.
- [ ] **R04.024** — mulligan simulations.
- [ ] **R04.025** — draw-probability analysis.
- [ ] **R04.026** — matchup testing.
- [ ] **R04.027** — side-by-side deck comparison.
- [ ] **R04.028** — automated thousands-of-games simulations if AI becomes sophisticated enough.
- [ ] **R04.029** — rules-debug mode showing the event stack and triggered effects.

### R05 — Player Collection

- [ ] **R05.001** — Quantity owned for every card.
- [ ] **R05.002** — foil/nonfoil ownership.
- [ ] **R05.003** — individual printing ownership.
- [ ] **R05.004** — promos.
- [ ] **R05.005** — alternate art.
- [ ] **R05.006** — premium rarities.
- [ ] **R05.007** — favorites.
- [ ] **R05.008** — wishlist.
- [ ] **R05.009** — newly acquired indicator.
- [ ] **R05.010** — collection completion percentage.
- [ ] **R05.011** — set completion.
- [ ] **R05.012** — rarity completion.
- [ ] **R05.013** — franchise completion.
- [ ] **R05.014** — duplicates.
- [ ] **R05.015** — missing-card filters.
- [ ] **R05.016** — collection value if you eventually support an economy.
- [ ] **R05.017** — collection history.
- [ ] **R05.018** — acquisition source history.

### R06 — Virtual Product System

- [ ] **R06.001** — virtual booster packs.
- [ ] **R06.002** — booster displays.
- [ ] **R06.003** — starter decks.
- [ ] **R06.004** — Illumineer’s Troves.
- [ ] **R06.005** — gift sets.
- [ ] **R06.006** — collector products.
- [ ] **R06.007** — promotional packs.
- [ ] **R06.008** — event rewards.
- [ ] **R06.009** — prerelease products.
- [ ] **R06.010** — future products through data configuration.
- [ ] **R06.011** — proper rarity distribution.
- [ ] **R06.012** — foil/premium slots.
- [ ] **R06.013** — duplicate protection if desired.
- [ ] **R06.014** — pack-opening animation.
- [ ] **R06.015** — reveal-one-at-a-time option.
- [ ] **R06.016** — skip animation.
- [ ] **R06.017** — open-multiple-packs.
- [ ] **R06.018** — pack-opening history.

### R07 — Progression & Economy

- [ ] **R07.001** — Player XP.
- [ ] **R07.002** — account level.
- [ ] **R07.003** — daily challenges.
- [ ] **R07.004** — weekly challenges.
- [ ] **R07.005** — match rewards.
- [ ] **R07.006** — first-win rewards.
- [ ] **R07.007** — achievement rewards.
- [ ] **R07.008** — event rewards.
- [ ] **R07.009** — virtual currency.
- [ ] **R07.010** — booster rewards.
- [ ] **R07.011** — card rewards.
- [ ] **R07.012** — cosmetic rewards.
- [ ] **R07.013** — duplicate handling.
- [ ] **R07.014** — crafting/dusting system if desired.
- [ ] **R07.015** — wildcards as an alternative.
- [ ] **R07.016** — protection against impossible collection grind.
- [ ] **R07.017** — reward-balancing tools.
- [ ] **R07.018** — economy telemetry.
- [ ] **R07.019** — admin ability to grant/revoke items.

### R08 — Player Profile

- [ ] **R08.001** — Username/display name.
- [ ] **R08.002** — avatar.
- [ ] **R08.003** — player title.
- [ ] **R08.004** — profile banner.
- [ ] **R08.005** — favorite character/franchise.
- [ ] **R08.006** — account level.
- [ ] **R08.007** — ranked rating.
- [ ] **R08.008** — seasonal rank.
- [ ] **R08.009** — match record.
- [ ] **R08.010** — play history.
- [ ] **R08.011** — favorite decks.
- [ ] **R08.012** — achievements.
- [ ] **R08.013** — collection stats.
- [ ] **R08.014** — tournament history.
- [ ] **R08.015** — privacy options.
- [ ] **R08.016** — blocked users.
- [ ] **R08.017** — friends list.

### R09 — Matchmaking

- [ ] **R09.001** — Casual queue.
- [ ] **R09.002** — Ranked queue.
- [ ] **R09.003** — Sandbox queue.
- [ ] **R09.004** — Collection-mode queue.
- [ ] **R09.005** — Core Constructed.
- [ ] **R09.006** — Infinity Constructed.
- [ ] **R09.007** — custom games.
- [ ] **R09.008** — direct challenge.
- [ ] **R09.009** — invite friend.
- [ ] **R09.010** — private lobby/password.
- [ ] **R09.011** — best-of-one.
- [ ] **R09.012** — best-of-three.
- [ ] **R09.013** — rating-based matching.
- [ ] **R09.014** — connection-quality consideration.
- [ ] **R09.015** — queue-duration expansion.
- [ ] **R09.016** — rematch.
- [ ] **R09.017** — format-specific matchmaking ratings if desired.

### R10 — Ranked System

- [ ] **R10.001** — ranking ladder.
- [ ] **R10.002** — divisions/tiers.
- [ ] **R10.003** — MMR/Elo-like hidden rating.
- [ ] **R10.004** — seasonal resets.
- [ ] **R10.005** — placement games if desired.
- [ ] **R10.006** — ranked leaderboards.
- [ ] **R10.007** — regional/global rankings.
- [ ] **R10.008** — seasonal rewards.
- [ ] **R10.009** — rank history.
- [ ] **R10.010** — top-player profiles.
- [ ] **R10.011** — anti-win-trading detection.

### R11 — Limited Formats

- [ ] **R11.001** — Sealed.
- [ ] **R11.002** — Draft.
- [ ] **R11.003** — Pack Rush.
- [ ] **R11.004** — custom draft environments.
- [ ] **R11.005** — booster selection.
- [ ] **R11.006** — pod creation.
- [ ] **R11.007** — timed picks.
- [ ] **R11.008** — draft bots.
- [ ] **R11.009** — draft deckbuilder.
- [ ] **R11.010** — limited deck validation.
- [ ] **R11.011** — saved draft logs.
- [ ] **R11.012** — sealed-pool export.
- [ ] **R11.013** — tournaments built from limited pools.

### R12 — AI Opponents

- [ ] **R12.001** — beginner AI.
- [ ] **R12.002** — normal AI.
- [ ] **R12.003** — advanced AI.
- [ ] **R12.004** — competitive AI eventually.
- [ ] **R12.005** — archetype-aware behavior.
- [ ] **R12.006** — mulligan logic.
- [ ] **R12.007** — ink decision logic.
- [ ] **R12.008** — quest/challenge decision logic.
- [ ] **R12.009** — threat evaluation.
- [ ] **R12.010** — resource planning.
- [ ] **R12.011** — combo awareness.
- [ ] **R12.012** — difficulty-specific intentional mistakes.
- [ ] **R12.013** — AI deck selection.
- [ ] **R12.014** — custom AI deck import.
- [ ] **R12.015** — AI-vs-AI.
- [ ] **R12.016** — automated matchup simulation.

### R13 — Tutorial & Learning System

- [ ] **R13.001** — rules tutorial.
- [ ] **R13.002** — guided first match.
- [ ] **R13.003** — ink tutorial.
- [ ] **R13.004** — quest tutorial.
- [ ] **R13.005** — challenge tutorial.
- [ ] **R13.006** — songs.
- [ ] **R13.007** — Shift.
- [ ] **R13.008** — locations.
- [ ] **R13.009** — advanced timing.
- [ ] **R13.010** — triggered abilities.
- [ ] **R13.011** — replacement effects.
- [ ] **R13.012** — deckbuilding.
- [ ] **R13.013** — mulligans.
- [ ] **R13.014** — strategy lessons.
- [ ] **R13.015** — puzzle scenarios.
- [ ] **R13.016** — glossary.
- [ ] **R13.017** — searchable rules.
- [ ] **R13.018** — hover/tap explanations.
- [ ] **R13.019** — contextual rules tips.

### R14 — Rules Assistant

- [ ] **R14.001** — Ask questions during games.
- [ ] **R14.002** — explain why an action is/isn’t legal.
- [ ] **R14.003** — explain ability resolution.
- [ ] **R14.004** — show relevant rule citation.
- [ ] **R14.005** — explain card interactions.
- [ ] **R14.006** — inspect the current board state.
- [ ] **R14.007** — answer “why can’t I do this?”
- [ ] **R14.008** — distinguish official rulings from inferred interpretations.
- [ ] **R14.009** — contextual glossary.
- [ ] **R14.010** — beginner explanation mode.
- [ ] **R14.011** — advanced/judge explanation mode.

### R15 — Match History & Replay System

- [ ] **R15.001** — Match history.
- [ ] **R15.002** — opponent.
- [ ] **R15.003** — decks.
- [ ] **R15.004** — outcome.
- [ ] **R15.005** — duration.
- [ ] **R15.006** — turn count.
- [ ] **R15.007** — lore progression.
- [ ] **R15.008** — actions per turn.
- [ ] **R15.009** — full deterministic event log.
- [ ] **R15.010** — watch replay.
- [ ] **R15.011** — pause.
- [ ] **R15.012** — rewind.
- [ ] **R15.013** — fast-forward.
- [ ] **R15.014** — jump to turn.
- [ ] **R15.015** — hide/reveal hands appropriately.
- [ ] **R15.016** — share replay.
- [ ] **R15.017** — download replay.
- [ ] **R15.018** — replay annotations.
- [ ] **R15.019** — convert replay positions into Sandbox states.

### R16 — Post-Game Analytics

- [ ] **R16.001** — cards drawn.
- [ ] **R16.002** — cards never drawn.
- [ ] **R16.003** — cards inked.
- [ ] **R16.004** — lore gained by card.
- [ ] **R16.005** — damage dealt.
- [ ] **R16.006** — challenges won/lost.
- [ ] **R16.007** — cards played.
- [ ] **R16.008** — resource efficiency.
- [ ] **R16.009** — mulligan results.
- [ ] **R16.010** — turns ahead/behind.
- [ ] **R16.011** — win-condition timeline.
- [ ] **R16.012** — draw probability.
- [ ] **R16.013** — dead cards.
- [ ] **R16.014** — matchup statistics.
- [ ] **R16.015** — first-player vs second-player win rate.
- [ ] **R16.016** — individual-deck statistics.

### R17 — Spectator System

- [ ] **R17.001** — Spectate friend.
- [ ] **R17.002** — tournament spectator.
- [ ] **R17.003** — spectator delay.
- [ ] **R17.004** — hidden-information controls.
- [ ] **R17.005** — observer slots.
- [ ] **R17.006** — caster mode.
- [ ] **R17.007** — full-information judge mode.
- [ ] **R17.008** — decklists.
- [ ] **R17.009** — hand visibility.
- [ ] **R17.010** — card zoom.
- [ ] **R17.011** — board overview.
- [ ] **R17.012** — replay controls.
- [ ] **R17.013** — Twitch/stream-friendly overlay support.

### R18 — Tournament Platform

- [ ] **R18.001** — Create tournament.
- [ ] **R18.002** — player registration.
- [ ] **R18.003** — deck registration.
- [ ] **R18.004** — legality verification.
- [ ] **R18.005** — Swiss pairing.
- [ ] **R18.006** — round timers.
- [ ] **R18.007** — standings.
- [ ] **R18.008** — tiebreakers.
- [ ] **R18.009** — Top Cut.
- [ ] **R18.010** — single elimination.
- [ ] **R18.011** — round-robin.
- [ ] **R18.012** — best-of-three support.
- [ ] **R18.013** — result reporting.
- [ ] **R18.014** — judge controls.
- [ ] **R18.015** — match restoration.
- [ ] **R18.016** — spectator matches.
- [ ] **R18.017** — tournament replay archive.
- [ ] **R18.018** — tournament decklists.
- [ ] **R18.019** — tournament statistics.
- [ ] **R18.020** — tournament admin dashboard.

### R19 — Social Features

- [ ] **R19.001** — Friends.
- [ ] **R19.002** — friend requests.
- [ ] **R19.003** — direct challenges.
- [ ] **R19.004** — presence/status.
- [ ] **R19.005** — clubs/guilds optionally.
- [ ] **R19.006** — deck sharing.
- [ ] **R19.007** — profile viewing.
- [ ] **R19.008** — reactions/emotes.
- [ ] **R19.009** — controlled chat.
- [ ] **R19.010** — block/mute/report.
- [ ] **R19.011** — spectator invites.
- [ ] **R19.012** — tournament groups.

### R20 — Card Encyclopedia

- [ ] **R20.001** — Every card.
- [ ] **R20.002** — every printing.
- [ ] **R20.003** — high-resolution art.
- [ ] **R20.004** — rulings.
- [ ] **R20.005** — errata.
- [ ] **R20.006** — related cards.
- [ ] **R20.007** — alternate versions.
- [ ] **R20.008** — artist.
- [ ] **R20.009** — franchise.
- [ ] **R20.010** — set.
- [ ] **R20.011** — rarity.
- [ ] **R20.012** — legality.
- [ ] **R20.013** — release history.
- [ ] **R20.014** — search.
- [ ] **R20.015** — advanced filters.
- [ ] **R20.016** — “cards that reference this card.”
- [ ] **R20.017** — keyword cross-links.
- [ ] **R20.018** — deck usage statistics.
- [ ] **R20.019** — collection ownership.
- [ ] **R20.020** — add to deck.
- [ ] **R20.021** — test in Sandbox.

### R21 — Metagame & Competitive Data

- [ ] **R21.001** — Popular decks.
- [ ] **R21.002** — archetypes.
- [ ] **R21.003** — win rates.
- [ ] **R21.004** — matchup matrices.
- [ ] **R21.005** — card usage.
- [ ] **R21.006** — ink-color usage.
- [ ] **R21.007** — tournament results.
- [ ] **R21.008** — ladder results.
- [ ] **R21.009** — rank-specific statistics.
- [ ] **R21.010** — patch/rules-period filtering.
- [ ] **R21.011** — set-period filtering.
- [ ] **R21.012** — rotation-period filtering.
- [ ] **R21.013** — trending cards.
- [ ] **R21.014** — deck evolution.
- [ ] **R21.015** — user-submitted archetype labels with canonical mappings.

### R22 — Deck Discovery

- [ ] **R22.001** — Public decklists.
- [ ] **R22.002** — trending decks.
- [ ] **R22.003** — tournament decks.
- [ ] **R22.004** — player decks.
- [ ] **R22.005** — archetype browser.
- [ ] **R22.006** — budget decks.
- [ ] **R22.007** — beginner decks.
- [ ] **R22.008** — favorites/bookmarks.
- [ ] **R22.009** — copy directly into deckbuilder.
- [ ] **R22.010** — show missing cards.
- [ ] **R22.011** — craft missing cards.
- [ ] **R22.012** — “Play in Sandbox” regardless of ownership.

### R23 — Achievements

- [ ] **R23.001** — Win first match.
- [ ] **R23.002** — reach 20 lore exactly.
- [ ] **R23.003** — win with each ink pairing.
- [ ] **R23.004** — complete set.
- [ ] **R23.005** — play certain franchises.
- [ ] **R23.006** — collect legendary cards.
- [ ] **R23.007** — rank achievements.
- [ ] **R23.008** — tournament achievements.
- [ ] **R23.009** — unusual gameplay accomplishments.
- [ ] **R23.010** — hidden achievements.
- [ ] **R23.011** — profile badges/titles.

### R24 — Cosmetics

- [ ] **R24.001** — avatars.
- [ ] **R24.002** — card backs.
- [ ] **R24.003** — playmats.
- [ ] **R24.004** — boards.
- [ ] **R24.005** — lore counters.
- [ ] **R24.006** — avatars/companions.
- [ ] **R24.007** — emotes.
- [ ] **R24.008** — titles.
- [ ] **R24.009** — profile frames.
- [ ] **R24.010** — card-play effects.
- [ ] **R24.011** — premium card animations.
- [ ] **R24.012** — franchise themes.

### R25 — Accessibility & User Experience

- [ ] **R25.001** — scalable UI.
- [ ] **R25.002** — mobile/tablet/desktop layouts.
- [ ] **R25.003** — color-blind support.
- [ ] **R25.004** — high contrast.
- [ ] **R25.005** — screen-reader considerations.
- [ ] **R25.006** — keyboard navigation.
- [ ] **R25.007** — reduced animation.
- [ ] **R25.008** — reduced motion.
- [ ] **R25.009** — large-card preview.
- [ ] **R25.010** — readable text mode.
- [ ] **R25.011** — animation speed.
- [ ] **R25.012** — auto-pass preferences.
- [ ] **R25.013** — confirmation settings.
- [ ] **R25.014** — audio controls.
- [ ] **R25.015** — localization.
- [ ] **R25.016** — alternate card-text presentation.

### R26 — Notifications

- [ ] **R26.001** — friend online.
- [ ] **R26.002** — challenge.
- [ ] **R26.003** — tournament starting.
- [ ] **R26.004** — round pairing.
- [ ] **R26.005** — new set.
- [ ] **R26.006** — new cards.
- [ ] **R26.007** — rewards.
- [ ] **R26.008** — daily/weekly progress.
- [ ] **R26.009** — season ending.
- [ ] **R26.010** — collection milestones.
- [ ] **R26.011** — deck invalidated by rotation/ban.

### R27 — Content Management Backend

- [ ] **R27.001** — Add new sets without client-code releases where possible.
- [ ] **R27.002** — add cards.
- [ ] **R27.003** — edit card metadata.
- [ ] **R27.004** — deploy card scripts.
- [ ] **R27.005** — modify rulings.
- [ ] **R27.006** — add formats.
- [ ] **R27.007** — change legality.
- [ ] **R27.008** — set rotation dates.
- [ ] **R27.009** — add virtual products.
- [ ] **R27.010** — configure drop rates.
- [ ] **R27.011** — configure rewards.
- [ ] **R27.012** — configure events.
- [ ] **R27.013** — configure tournaments.
- [ ] **R27.014** — localization pipeline.
- [ ] **R27.015** — asset management.
- [ ] **R27.016** — staging/production environments.

### R28 — Card Implementation Testing

- [ ] **R28.001** — Unit tests for every card.
- [ ] **R28.002** — interaction tests.
- [ ] **R28.003** — regression tests.
- [ ] **R28.004** — keyword tests.
- [ ] **R28.005** — rules tests.
- [ ] **R28.006** — infinite-loop detection.
- [ ] **R28.007** — invalid-state detection.
- [ ] **R28.008** — deterministic replay validation.
- [ ] **R28.009** — simulation fuzzing.
- [ ] **R28.010** — new-set compatibility suite.
- [ ] **R28.011** — automatically run every card against general rules scenarios.
- [ ] **R28.012** — card-script versioning.

### R29 — Game Integrity & Anti-Cheat

- [ ] **R29.001** — Server-authoritative rules.
- [ ] **R29.002** — validated actions.
- [ ] **R29.003** — secure shuffle.
- [ ] **R29.004** — cryptographically strong randomness.
- [ ] **R29.005** — hidden-information security.
- [ ] **R29.006** — disconnect abuse detection.
- [ ] **R29.007** — timer abuse protection.
- [ ] **R29.008** — bot detection if necessary.
- [ ] **R29.009** — match manipulation detection.
- [ ] **R29.010** — ranked win-trading detection.
- [ ] **R29.011** — tournament admin logs.
- [ ] **R29.012** — audit trails.

### R30 — Accounts & Infrastructure

- [ ] **R30.001** — Authentication.
- [ ] **R30.002** — account recovery.
- [ ] **R30.003** — guest account.
- [ ] **R30.004** — persistent player data.
- [ ] **R30.005** — cloud deck storage.
- [ ] **R30.006** — collection storage.
- [ ] **R30.007** — cross-device syncing.
- [ ] **R30.008** — matchmaking servers.
- [ ] **R30.009** — game servers.
- [ ] **R30.010** — reconnect.
- [ ] **R30.011** — load balancing.
- [ ] **R30.012** — database backups.
- [ ] **R30.013** — telemetry.
- [ ] **R30.014** — crash reporting.
- [ ] **R30.015** — version compatibility.
- [ ] **R30.016** — maintenance mode.
- [ ] **R30.017** — live-service status.

### R31 — Moderation & Administration

- [ ] **R31.001** — Reports.
- [ ] **R31.002** — bans.
- [ ] **R31.003** — suspensions.
- [ ] **R31.004** — mute.
- [ ] **R31.005** — username moderation.
- [ ] **R31.006** — chat moderation.
- [ ] **R31.007** — match investigation.
- [ ] **R31.008** — account logs.
- [ ] **R31.009** — tournament-admin permissions.
- [ ] **R31.010** — judge permissions.
- [ ] **R31.011** — administrator dashboard.
- [ ] **R31.012** — economy adjustments.
- [ ] **R31.013** — compensation/grant system after outages.

### R32 — Developer / Debug Tools

- [ ] **R32.001** — Spawn any card.
- [ ] **R32.002** — manipulate zones.
- [ ] **R32.003** — set lore.
- [ ] **R32.004** — set ink.
- [ ] **R32.005** — set damage.
- [ ] **R32.006** — choose RNG outcomes.
- [ ] **R32.007** — force triggers.
- [ ] **R32.008** — inspect game-state JSON.
- [ ] **R32.009** — inspect event stack.
- [ ] **R32.010** — view hidden zones.
- [ ] **R32.011** — replay individual actions.
- [ ] **R32.012** — simulate turns.
- [ ] **R32.013** — load predefined test scenarios.
- [ ] **R32.014** — automated card-interaction testing.

### R33 — Public API / Data Layer

- [ ] **R33.001** — card API.
- [ ] **R33.002** — deck API.
- [ ] **R33.003** — tournament API.
- [ ] **R33.004** — leaderboard API.
- [ ] **R33.005** — match-history API.
- [ ] **R33.006** — metadata/version API.
- [ ] **R33.007** — rules API.
- [ ] **R33.008** — public vs authenticated endpoints.
- [ ] **R33.009** — rate limiting.
- [ ] **R33.010** — API versioning.
- [ ] **R33.011** — webhooks for tournaments/events.

## Appendix B — Coverage and acceptance contracts

Each original leaf inherits its group contract below and receives feature-specific evidence during refinement. Milestone ranges indicate staged delivery, not a claim that all leaves finish simultaneously. Optional wording remains optional until the Director decides.

| Group | Requirements | Owner | Delivery | Acceptance contract |
|---|---:|---|---|---|
| R01 — Core Card & Rules Platform | 26 | RULE + CONTENT | M0–M5 | Complete declared catalog, identity mappings, versioned rules/errata/legality and certified effects/choices/visibility. |
| R02 — Actual Match Engine | 34 | RULE + PLAY | M1–M3 | All listed actions/endings, clocks, durable commands, synchronization and recovery; no unauthorized state. |
| R03 — Deckbuilder | 27 | CLIENT + RULE | M2–M3 | Editing, search, statistics, imports, sharing and printing selection round-trip; separate format and ownership validation. |
| R04 — Sandbox / Lab Mode | 29 | AI + PLAY + CLIENT | M2–M5 | Ordinary unlocked Lab works and can earn eligible currency; manipulated experiments branch reproducibly and cannot affect economy/rank. |
| R05 — Player Collection | 18 | ECON + CLIENT | M2–M3 | Printing/finish holdings and history reconcile to ledger; completion/missing views have accurate denominators. |
| R06 — Virtual Product System | 18 | ECON + CONTENT + CLIENT | M2–M5 | Versioned products and documented slots; once-only committed grants with reveal/skip/bulk/resume and supported selected categories. |
| R07 — Progression & Economy | 19 | ECON | M2–M5 | XP/currency/inventory/cosmetic effects settle once; eligibility and selected acquisition model are tested and balanced. |
| R08 — Player Profile | 17 | SOCIAL + CLIENT | M3–M4 | Privacy-aware identity, statistics, history, collection/tournament views, friends and blocking. |
| R09 — Matchmaking | 17 | COMP + PLAY | M2–M4 | All selected queues/invites/match structures admit legal pinned decks; pair/cancel/rematch and privacy races resolve safely. |
| R10 — Ranked System | 11 | COMP | M4 | Versioned ratings, seasons, leaderboards and rewards settle idempotently; abuse signals and history are reviewable. |
| R11 — Limited Formats | 13 | COMP + ECON + RULE | M4 | Correct pools, products, picks/autopicks and format validation, with logs/export/reconnect and event integration. |
| R12 — AI Opponents | 16 | AI + RULE | M3–M5 | Complete legal games at each advertised strength; viewer-safe inputs, resource limits, reproducibility and measured quality. |
| R13 — Tutorial & Learning System | 19 | CONTENT + CLIENT | M2–M5 | Every listed lesson/topic has cited, executable and regression-tested content with beginner usability evidence. |
| R14 — Rules Assistant | 11 | AI + RULE | M3–M5 | Version-correct reason codes, citations, interaction explanations and uncertainty labels use viewer-authorized context. |
| R15 — Match History & Replay System | 19 | PLAY + CLIENT | M2–M4 | Deterministic role-safe replay, history/controls/export/annotations and provenance-aware sandbox branching. |
| R16 — Post-Game Analytics | 16 | COMP + AI | M3–M5 | Metrics recompute from immutable events; definitions, probability assumptions and privacy are documented. |
| R17 — Spectator System | 13 | PLAY + COMP | M3–M4 | Authorized/delayed player, spectator, caster and judge views; delay survives reconnect and export. |
| R18 — Tournament Platform | 20 | COMP + SOCIAL | M4 | Registration/deck locks/pairings/tiebreaks/cuts/timers and corrections follow tested versioned policy with scoped judges. |
| R19 — Social Features | 12 | SOCIAL | M3–M5 | Consent-based friends/presence/challenges/sharing and selected chat/groups; blocks/reports enforced server-side. |
| R20 — Card Encyclopedia | 21 | CONTENT + CLIENT | M3 | Every declared identity/printing and sourced metadata/rulings/errata/relations with search, ownership and deck/Lab links. |
| R21 — Metagame & Competitive Data | 15 | COMP + AI | M4–M5 | Reproducible segmented metrics, taxonomy and uncertainty/sample/bias disclosure; no private match data exposure. |
| R22 — Deck Discovery | 12 | CLIENT + COMP | M3–M5 | Discover/copy/bookmark and missing-card acquisition flows; unrestricted Lab available independent of ownership. |
| R23 — Achievements | 11 | ECON + CONTENT | M3–M5 | Event-derived progress and rewards idempotent; hidden criteria and badges/titles controlled. |
| R24 — Cosmetics | 12 | CLIENT + CONTENT | M2–M5 | Selected cosmetics earned/equipped/synced with provenance; clarity, accessibility and performance preserved. |
| R25 — Accessibility & User Experience | 16 | CLIENT + QA | All milestones | Keyboard, semantic board, contrast/text/motion/audio/localization and actual desktop/tablet/phone acceptance evidence. |
| R26 — Notifications | 11 | SOCIAL | M3–M5 | Correct recipient, dedupe, preferences/quiet hours/deep links and rotation warnings with channel fallback. |
| R27 — Content Management Backend | 16 | CONTENT + OPS | M0–M5 | Permissioned staging/versioning/diff/review/activation/rollback of content, scripts, assets, formats and economy configurations. |
| R28 — Card Implementation Testing | 12 | RULE + QA | All milestones | Meaningful per-card/interaction/keyword/regression and invariant/replay/fuzz suites for all admitted content. |
| R29 — Game Integrity & Anti-Cheat | 12 | OPS + PLAY + COMP | All milestones | Secure randomness, validated authority/visibility/clocks, abuse review and immutable investigation evidence. |
| R30 — Accounts & Infrastructure | 17 | OPS + SOCIAL | M0–M6 | Verified recovery/guest/sync, load/versioning/backups/telemetry/maintenance and measured failure recovery. |
| R31 — Moderation & Administration | 13 | SOCIAL + OPS | M2–M6 | Scoped cases/actions/appeals and audited grants/compensation/investigation; no unscoped privileged access. |
| R32 — Developer / Debug Tools | 14 | RULE + PLAY | M1–M5 | Deterministic authoring/RNG/state tools and reproducible regressions isolated from competitive and economy authority. |
| R33 — Public API / Data Layer | 11 | ARC + OPS | M6 optional | If selected: versioned audience-specific schemas, auth/quotas/docs and signed retried safe webhooks. |

Additional scope: X01 multiplayer/teams; X02 cooperative/scenario products; X03 virtual market/trading; X04 operations/cost/privacy/provenance; X05 emerging official formats, including Coconut Beta. Their individual milestones and acceptance must be refined before implementation.

## Appendix C — Research boundaries and evidence status

**Completed:** full supplied checklist read and exact 548-leaf coverage mapping; prior-plan reconciliation; refreshed repository SHAs; targeted source/workspace/rules-index review; official rules/tournament/Pack Rush/Coconut document retrieval; primary hosting/browser/security references; direct dependency version/peer metadata; corrected strict pnpm resolution; official container manifest retrieval.

**Not performed:** exhaustive repository code audit; complete application/upstream test execution; a running new-game build; all-card behavior certification; source PDF byte archiving where retrieval failed; verified asset distribution permission; provider account provisioning; paid purchases; real-device/playtest/load/failover/restore qualification. Those tasks have concrete owners and gates in this plan.

**Unresolved before public release:** final visual approval and asset provenance; complete current official catalog/errata/set-note reconciliation; launch support claims; exact paid provider quotes and durability choice; audience/age/geography/privacy policy; chosen economy/market optional features; capacity/SLO evidence and accountable live operations. These do not prevent beginning synthetic local foundation work.

Research observation: the upstream Lorcana rules index/memory baseline is older than the official 2.2.0 revision retrieved here. Preserve it as an implementation reference and reconcile it during RULE-01; no upstream skill/source files were changed by this planning task.

## Appendix D — Asset, deployment and extension details

### D.1 Asset production pipeline

Use approved source art → lossless working master → rendition processing → checksum/provenance review → immutable asset manifest → staging preview → CDN publication. `sharp` handles image resizing and AVIF/WebP renditions in a qualified build worker; keep the original master separately with restricted access. `@gltf-transform/cli` validates/optimizes glTF scenes. GPU texture compression may be added after profiling; if KTX2/Basis tooling is selected, record and pin its external encoder/decoder artifacts rather than assuming the JavaScript package supplies every binary. It is not required for the initial renderer proof.

Modeling/illustration/audio production tools are creator choices, not player dependencies. Blender or equivalent DCC tools, vector/image editors and an audio workstation may be needed for authored original assets; their versions, licenses and any paid seats belong in the art-production budget. The game must work without players installing plugins. Begin with a small owned scene/material library, not a new bespoke 3D asset for every printing.

Audio initializes through a permitted user interaction, supports separate ambience/effect/music mixes, and restores predictably after suspension. Default sound behavior and loudness need playtest approval. Video or essential instructions have accessible equivalents. Card images failing to load must leave readable metadata/action controls. Asset readiness includes actual download/decode/upload-to-GPU costs, not only disk file size.

### D.2 Deployment details to qualify

Cloudflare Pages must rewrite SPA routes to the application shell while preserving immutable asset responses and appropriate security/cache headers. Validate deep links to decks, replays and event pairings after a direct browser reload. Content-security policy must permit only intended API/play/assets/error endpoints; do not solve integration errors with unrestricted origins. Service-worker scope/activation and stale-client recovery are explicit release fixtures.

API health exposes minimal liveness; readiness reflects migrations/DB and critical dependencies without leaking credentials. Match readiness reflects DB and available engine workers. Worker health reports job/outbox lag privately. Autoscaling decisions use queue lag, execution time, sockets and database pressure, not CPU alone. Deployment resource sizes are chosen from measured load; initial staging suggestions are one `1c-2g` API, one `1c-2g` match service, one small worker and a paid PostgreSQL tier, then adjusted to the approved quote and evidence. These suggestions are neither a guaranteed capacity nor a purchased configuration.

### D.3 Future-game extensions

Application contracts should support participant lists and outcome objects rather than hard-coded `player1/player2` or a single winner field everywhere. Two-player rendering/admission remains the initial implementation. Multiplayer adds turn order, viewer relationships, elimination, simultaneous effects, expanded layout and distinct queue policy; certify those additions before enabling them. Cooperative scenarios add enemy decks/behavior, team outcomes, setup instructions and difficulty-specific rules. Custom formats change data-backed policy only within supported engine mechanics; they cannot turn arbitrary user text into executable server code.

The feature-flag system gates admissions and presentation by environment and manifest. A flag cannot make an uncertified card “supported.” Debug endpoints, hidden-state inspection and RNG selection are confined to isolated development/advanced-sandbox contexts with explicit authorization, and never share a live competitive match ID or settlement path.


## Appendix E — Existing uploaded catalog inventory

The current `Lorcana_All_Cards(1).json` file, uploaded 2 October 2026, was materialized and parsed in full as a candidate input. It is an API-shaped snapshot with Ravensburger image URLs; this inspection does not independently establish retrieval provenance, current completeness, release dates or asset-use permission. The raw file was left unchanged. The companion `candidate_catalog_inventory.json` records its SHA-256, size, schema/count diagnostics and duplicate details.

| Category | Records |
|---|---:|
| Actions | 465 |
| Characters | 2,675 |
| Items | 252 |
| Locations | 123 |
| Supplies | 0 |
| Total ordinary card records | 3,515 |
| Set/product descriptors | 18 |
| Coconut descriptors, separate from ordinary cards | 27 |

All 3,515 ordinary records have unique `culture_invariant_id` values, while `deck_building_id` has 2,784 distinct values. There are 3,514 distinct `card_identifier` strings: one identifier is shared by Moana/Vaiana records with the same external `deck_building_id`. This appears to be a name-alias representation, not automatically a defective record. These are source-schema diagnostics, **not a certified count of gameplay identities or unique printings**. Canonical mapping must reconcile names, mechanics, reprints, product membership and errata before trusting an external ID.

The snapshot contains descriptors for sets 1–14, Quest products and Gateway. It has 217 records with `set14` membership, which does not establish a complete released Hyperia City set. Membership counts can overlap across products and include alternative representations. Release eligibility must come from separately verified policy.

The 27 Coconut descriptors differ from the 18 entries enumerated in the retrieved three-page beta card supplement. Reconcile document/catalog revision and card availability in RULE-01; do not automatically treat either list as a complete executable rules source. This finding strengthens the need for separate announced, catalogued and certified-playable states. A stable engine export through set 013 does not encompass the entire newer snapshot automatically.

## Appendix F — Initial transport contract examples

These examples define intent and privacy boundaries for BOOT-05 refinement. They are proposed protocol shapes, not existing upstream API calls. Exact reason/intent enums are generated from our adapter contracts and tested against current rules.

```json
{
  "protocolVersion": 1,
  "matchId": "opaque-match-id",
  "commandId": "client-generated-unique-id",
  "expectedStateVersion": 23,
  "intent": {
    "kind": "play_card",
    "cardRef": "authorized-viewer-object-ref",
    "paymentChoiceId": "current-legal-payment-choice",
    "targetRefs": ["authorized-current-target-ref"]
  }
}
```

The server binds identity from the authenticated session/ticket, not an `actorId` asserted in this payload. A payment/target reference is revalidated against the committed state and current choice constraints. Card references are viewer-safe and resolve privately to match objects.

```json
{
  "type": "command_receipt",
  "commandId": "client-generated-unique-id",
  "status": "accepted",
  "committedStateVersion": 24,
  "projectionVersion": 1,
  "eventIds": ["authorized-public-or-viewer-event-id"]
}
```

An accepted receipt is sent only after the database commit. Rejected responses contain a stable reason code and a version-appropriate explanation; they do not return another player's private state to explain why an action failed. Event IDs refer only to permitted viewer events, not unrestricted access to the private journal.

A viewer snapshot can contain the viewer's known hand, public board/discard, relevant public counters, concealed-zone counts, current authorized choices and pinned manifest identifiers. It excludes opponent concealed card identities, full instance/resource maps and future RNG state. Public card-reference metadata is separately cacheable; per-match object assignments are permissioned. Add explicit payload limits, pagination/chunking and compatibility tests during protocol implementation.
