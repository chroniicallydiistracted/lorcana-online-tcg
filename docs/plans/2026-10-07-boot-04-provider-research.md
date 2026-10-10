# BOOT-04: full-vision hosting research and cost comparison

> **Superseded research — historical evidence (correction note added 2026-10-10 UTC, [CHG-20261010-003](../changes/CHG-20261010-003.json)).** Superseded first by the October 8 reassessment and finally by the [BOOT-04 decision worksheet](2026-10-10-boot-04-decision-worksheet.md). Its full 33-group infrastructure mapping and 50-player capacity arithmetic remain useful reference; its managed/HA footprints (Render, Railway, AWS) are rejected under the $25/month cap. The text below is unchanged.

October8 supersession: [the single-host reassessment](2026-10-08-single-host-reassessment.md) is the current preferred proposal after the Director supplied the Duels reference. This October7 comparison retains its dated scope/rate/recovery assumptions and conditional managed/HA alternatives; its default footprint, separate-DB-instance assumption and paid-service quantities are not current initial-beta prerequisites. No executed evidence is rewritten.

Research proposal, not an approved deployment specification. Recorded UTC times, retrieved-source digests, price selectors and arithmetic are in [sources](boot-04-sources.json) and [cost fixtures](boot-04-costs.json). Source checkout: `5819142f76a1ea853b804af8b768048a3dccc4dd`; branch `codex/boot-04-provider-plan`. Director answers are human-supplied planning inputs with unknown exact event times: compare cost tiers before choosing a ceiling; primarily North America; up to **50 concurrent players**. Recovery policy, domain, age policy, provider selection and purchase remain open.

BOOT-04 requires reviewable projects/services/DNS/secret inventory with current line-item quotes. This checkpoint supplies a logical inventory and conditional alternatives. It does not close the task: domain/renewal quotes and final provider/recovery/region/account-usage choices remain unresolved. No external account, paid service, domain, deployment, DNS record or secret was created. The prior authorization to publish completed BOOT branches does not authorize these purchases.

## Scope reviewed before recommendations

Reviewed the full [blueprint](../vision/Development_Blueprint_2026-10-05.md), [original checklist](../vision/original_action_items.md), all **548 requirements across 33 groups**, all **20 original optional flags**, additional scope X01–X07, the source/dependency/decision/backlog registers, current app/runtime/CI/database boundaries and operating evidence. The cost fixture records every requirement ID in its owning group and each group's hosting implications; its denominator and source digest are checked against the register. Provider research supports planning, not product acceptance. The requirement register remains unchanged.

| Group | Infrastructure consequence for the full vision |
|---|---|
| R01 rules/catalog | Versioned official sources, certification records and immutable catalog/release artifacts |
| R02 engine | Server CPU, transaction/journal/receipt authority, private RNG, viewer projections and recovery |
| R03 deckbuilding | Relational deck revisions, indexes, private exports and CDN catalog assets |
| R04 Lab/sandbox | Ownership-free ordinary Lab; manipulated sessions isolated from economic/competitive eligibility; simulation quotas |
| R05 collection | Printing/finish-aware durable holdings, ownership history and authorized inventory |
| R06 virtual products | Transactional pack/product receipts; tactile reveal assets rendered on the player's device |
| R07 economy | Integer ledger, idempotent grants, transactional outbox, bounded durable jobs and abuse audit |
| R08 profiles | Preferences/progress, constrained public fields, account deletion and cross-device synchronization |
| R09 matchmaking | Queue/admission transactions; legality, ownership and mode policy remain distinct |
| R10 ranked | Season/rating records, eligible version pins, leaderboards and manipulation review |
| R11 limited play | Durable draft/sealed/rush choices, clocks and arrival-spike capacity |
| R12 bots | Bounded CPU search and simulation workers separated from live-match resources |
| R13 learning | Versioned tutorials/scenarios, progress and accessible interaction |
| R14 rules assistant | Source-linked deterministic rules search first; paid model services optional and separately qualified |
| R15 history/replays | Authorized private replay storage, retention/deletion/export, retained engine versions |
| R16 analysis | Asynchronous aggregates/replay analysis with time and concurrency budgets |
| R17 spectating/judging | Additional connections/egress, delayed projections, caster/judge scopes and hidden-state checks |
| R18 tournaments | Burst admission, brackets/results, dispute audit and retained tournament replays |
| R19 social | Friends/blocks/chat/invites, moderation queues and responsible human operators |
| R20 encyclopedia | Public catalog/search and permitted asset delivery |
| R21 metagame | Bounded aggregate jobs, privacy floors and format/version filters |
| R22 deck discovery | Publication consent, search indexes, rate limits and moderation |
| R23 achievements | Idempotent completion events through ledger/outbox patterns |
| R24 cosmetics | Durable entitlements, CDN tabletop/card/audio assets and device rendering budgets |
| R25 accessibility/devices | Semantic browser UI, localization/reduced motion, CDN latency and actual hardware qualification |
| R26 notifications | In-app delivery plus prioritized, deduplicated transactional email and recovery-mail burst limits |
| R27 content management | Privileged imports, provenance/review, staged publication and rollback |
| R28 card testing | Certification fixtures/CI and capped batch simulations, separated from live games |
| R29 integrity | Private state/RNG, validated actions, abuse evidence, safe logging and rate limits |
| R30 infrastructure | Auth/accounts, private DB, backups/drills, load/reconnect, telemetry, maintenance and version compatibility |
| R31 administration | Admin MFA/roles, investigations, sanctions/audit and incident responsibility |
| R32 debug tools | Authorized synthetic staging, capped simulation and protected exports |
| R33 public ecosystem | All eleven requirements remain optional; API/webhook scopes and cost added if selected |

X01 multiplayer/teams and X02 cooperative/scenario products change participant counts, layouts, rules and CPU/fan-out; they are not silently reduced to two-player hosting assumptions. X03 trading remains a Director policy decision; escrow is required if selected. X04 covers spending, rights/privacy, operations and recovery. X05 emerging formats remain explicitly certified/versioned. X06/X07 require current documentation and source-linked timestamped proof throughout provisioning and operation.

The infrastructure should start with the existing **web, API, match-service and worker** ownership boundaries. The checklist does not require 33 independently deployed services. Babylon uses client hardware; no hosted GPU is initially needed. PostgreSQL is relational authority; ORM adoption does not settle transaction races. Rules search can use PostgreSQL/local source indexes; paid AI, hosted search, Redis, Kubernetes and native SDKs are not initial prerequisites. Unselected services are outside the initial footprint, not erased from the vision.

## Capacity assumptions and qualification

Fifty active players permit at most **25 ordinary two-player matches** if every player is in a match. Accounts, lobby users, spectators, duplicate tabs and simulations are separate quantities. An illustrative 80-connection fixture includes 50 players, 25 spectators and five extra clients. Neither that spectator limit nor match occupancy is Director-approved.

At an assumed 0.1 accepted commands/second per match, aggregate activity is 2.5 commands/second, with a fivefold test burst of 12.5. Four occupied hours/day for 30 days yields 1.08 million commands/month. A 12KiB projection sent to three recipients per command is approximately **39.81GB/month** before HTTP, reconnects, heartbeats, email/provider calls and backup upload. Cost fixtures reserve 100GB beta plus 50GB staging service egress. Public assets use a CDN/object store instead of being sent through every match process.

At 1kB journal data per command, journal growth is 1.08GB/month; rewriting a 40kB state produces 43.2GB/month raw writes before WAL, indexes, vacuum or replication. Continuous 24-hour occupancy raises that to 259.2GB/month. A 20GB database disk is a starting fixture, not a retention guarantee. WAL/PITR archive and replay growth must be measured before committing to it. R2 storage fixtures cover 100GB combined assets/replays/exports across environments, with 500k Class A and 5m Class B requests shared per account, below the current included operation quantities. Railway additionally models a separate 100GB WAL/backup archive.

Qualification must measure real engine CPU/memory, commit p95/p99, WAL/storage growth, connection pools, WebSocket fan-out, reconnect storms, spectator delays, drift-safe clocks, pack/ledger contention, draft/tournament arrivals and bot CPU. Proposed blueprint targets remain server validation/commit p95 ≤150ms/p99 ≤500ms, visible feedback p95 ≤300ms and reconnect ≤5s. These are goals, not results. Run actual NA-region latency probes from intended players before choosing Ohio/Virginia/Oregon/California; geography alone does not select a region.

## Provider comparison and provisional direction

| Option | Fit | Recovery limitation | Decision consequence |
|---|---|---|---|
| Cloudflare Pages/R2 + Render PG18/Node + Resend/Sentry | Closest to the researched blueprint; managed relational DB, portable server processes, sockets, private regional network and background workers | Single DB requires restore; standby is asynchronous and can lose recent writes; PITR cannot target the last ten minutes | Preferred qualification path **if the Director accepts the disclosed beta disaster window**, subject to cost ceiling and actual drills |
| Cloudflare + Railway Pro PG18/Node + Resend/Sentry | Low usage-sensitive starting estimate, private DB and current WAL/PITR features | No independently verified synchronous/AZ durability contract; archive failure can truncate restore window; default HA adds nine services | Alternative to qualify if metered savings justify added measurement and template/backup ownership; not selected on its low illustrative subtotal alone |
| Cloudflare + AWS ECS/Fargate/RDS PG18 Multi-AZ + Resend/Sentry | Synchronous standby in another AZ, private colocated database/compute, independent app replicas | AZ protection does not prove region-disaster recovery; configuration/ack semantics and failure drills still required | Preferred **candidate** if preserving acknowledged progress across a single-zone failure is required; needs an operations owner and a larger budget |

No option is certified for 50-player gameplay. Render and Railway are candidates to qualify, not interchangeable durability guarantees. An unattended VM/self-managed PostgreSQL option was not advanced: savings shift patching, TLS, restore, failure-domain and on-call responsibilities onto an as-yet-unassigned operator. Small scale does not make match/economy durability optional. Cross-cloud live DB traffic is avoided: AWS beta compute lives beside RDS in its private VPC; an unrelated synthetic stage can remain on Render.

Render's [current pricing](https://render.com/pricing) uses a $25/month flat Pro workspace subscription, with compute and bandwidth additional. It includes 25GB workspace bandwidth; excess is $0.15/GB. The fixture uses $7 small/$25 medium app instances, $19 small/$40 medium PostgreSQL and conservative $0.30/GB provisioned database storage. [Environment isolation](https://render.com/docs/private-network) requires Pro; configure blocks explicitly and deny public DB access. [PG18 is supported](https://render.com/docs/postgresql-creating-connecting). [WebSockets](https://render.com/docs/websocket) need reconnect/drain qualification during service replacement.

Render [HA](https://render.com/docs/postgresql-high-availability) bills another equal database instance/storage and uses asynchronous replication. [Backups](https://render.com/docs/postgresql-backups) provide three days PITR on Hobby, seven on Pro, with a restore target at least ten minutes old. Recovery creates another billed database. Daily encrypted off-provider logical exports add a different failure path; they do not establish a 15-minute region-disaster recovery point.

Railway [pricing](https://railway.com/pricing) bills resident GB-seconds and actual CPU-seconds. Pro costs the greater of $20 or metered service usage, not $20 plus usage. [PG18 HA](https://docs.railway.com/databases/postgresql-ha) requires an official version-pinned image, and defaults to three PostgreSQL, three etcd and three HAProxy instances. [PITR](https://docs.railway.com/volumes/point-in-time-recovery) uses pgBackRest/WAL and bucket storage; full/differential backups and async archive health must be verified. [Hard usage caps](https://docs.railway.com/pricing/cost-control) stop workloads, so they cannot replace graceful match admission limits.

AWS [RDS Multi-AZ](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.MultiAZSingleStandby.html) has synchronous standby replication. The retrieved us-east-1 [RDS catalog](https://pricing.us-east-1.amazonaws.com/offers/v1.0/aws/AmazonRDS/current/us-east-1/index.json) prices a db.t4g.medium PostgreSQL Multi-AZ deployment at $0.129/hour and gp3 at $0.23/GB-month; those deployment rates are already Multi-AZ. [PG18 release notes](https://docs.aws.amazon.com/AmazonRDS/latest/PostgreSQLReleaseNotes/postgresql-versions.html) list 18.6. Actual region/instance eligibility, extensions, burst credits, synchronous commit, backup settings and measured restore/failover remain qualification gates. Fargate/ALB/public-IP regional SKU selectors are in the cost fixture; NAT uses an explicitly labeled Ohio-example allowance pending an exact us-east-1 quote.

## Cost tiers at declared quantities

All amounts are USD/month, before tax, domain/renewal and unresolved usage. **These are known subtotals, not complete invoices or spend caps.** No promotional credits, annual discounts or reserved commitments are assumed. See every line, quantity, source/rate selector, limitation and unpriced item in [the structured worksheet](boot-04-costs.json).

| Scenario | Known monthly subtotal | What it includes |
|---|---:|---|
| Compact synthetic Render staging | $69.35 | Separate API/match/worker, paid small PG/storage, export cron, 50GB service egress and 50GB R2; free mail/one-person monitoring within quotas |
| Render beta alone | $192.23 | Pro, API/match/worker, paid PG/storage/export, 100GB service egress, R2, paid transactional mail, monthly Team monitoring/extra uptime probes and CI artifact allowance; staging excluded |
| Separate Render staging + beta | $263.26 | Both independent DB/service sets; shared Pro/allowances once, distinct secrets/buckets, 150GB service egress, paid mail/monitoring and CI artifact allowance |
| Same plus Render beta standby | $309.26 | Additional beta DB and storage; asynchronous replication, one API/match instance each |
| Railway stage + beta usage fixture | $141.46 | Assumed 6GB resident memory/.75 average actual vCPU, volumes/PITR buckets/egress, R2 public assets and shared paid mail/monitoring/CI; not a fixed-price quote |
| AWS synchronous beta + compact Render stage | $454.57 | Two API and two match tasks, idle worker task, RDS Multi-AZ, ALB, two NATs, minimum public IPs, secrets/logs/image storage/backup allowance, separate synthetic stage and shared supporting services; several AWS meters still unpriced |

The Railway usage assumption is not an equivalent reserved-capacity offer. Doubling its modeled memory and CPU alone adds approximately $75.04/month. Render app/database upgrades or extra replicas add fixed SKU costs and extra egress. AWS keeps private-task outbound access and two-AZ networking in the worksheet; removing those costs by exposing the database is not the proposed architecture.

For a budgeting conversation, the synthetic tier is about $70 plus unknowns; the conventional stage+beta tier is about $263, or $309 with asynchronous standby; the stronger-durability candidate starts at about $455 with remaining AWS meters. A Director reserve of 20% would add roughly $53/$62/$91 respectively **before** tax/domain/unpriced usage. That percentage is a discussion fixture, not an approved ceiling. Rehearsal restore clones and limited-time event replicas are separately billed.

Supporting-service facts affect the worksheet:

- [Cloudflare Pages](https://developers.cloudflare.com/pages/platform/limits/) free static hosting has build/file limits (500 monthly builds, 20k files, 25MiB/file). R2 serves larger permitted assets. No backend/session authority runs in Pages.
- [R2 Standard](https://developers.cloudflare.com/r2/pricing/) charges $0.015/GB-month above 10GB, $4.50/million Class A above 1m and $0.36/million Class B above 10m, shared once per account; excess operation billing units round upward. Direct R2 egress is free; origin uploads can incur another provider's egress. [Public asset buckets](https://developers.cloudflare.com/r2/buckets/public-buckets/) use a custom domain; private replays/backups never use a public endpoint.
- [Resend](https://resend.com/pricing.md) Free allows 3000 messages/month and 100/day. A beta registration/recovery burst can exhaust the daily quota. Pro is $20/month for 50k; optional overage is $0.90/1000. Queue/retry/prioritize recovery and deduplicate before enabling spend. Paid plan quantity is shared across both environments, with stage delivery restricted to a test allowlist.
- [Sentry](https://sentry.io/pricing/) Team month-to-month is $29, confirmed in the public structured pricing data. $26 is the $312 annual-equivalent rate, not a monthly commitment. Developer is one human seat. Team includes 50k errors, 5GB logs, 5m spans, one uptime/cron monitor; the fixture adds two uptime probes and, for two environments, one cron monitor. Sample/redact to quotas; paid AI/profiling and browser session replay are disabled initially.
- [GitHub Actions](https://docs.github.com/en/billing/concepts/product-billing/github-actions) standard public runners are free; artifact storage is separate. The paid fixtures conservatively charge 1.5GB above a shared 0.5GB quota at $0.25/GB-month. Check actual account/Packages consumption. Private visibility remains a Director choice and changes the minute budget. Registry/runtime-image promotion is not implemented by the existing source build artifacts.

Domain registration/renewal and tax remain **null**, not $0. The Director must choose or supply a domain before an exact registrar quote. Human operations/moderation, privacy/content permission, art, devices, development tools and optional model services require the overall project budget, even though they are outside this infrastructure comparison.

## Reviewable project and service inventory

These are logical proposed resources. No provider IDs or deployed URLs exist. Names below are neutral environment labels, not branding decisions. Separate staging and beta data, credentials and deploy permissions are mandatory. Shared billing quotas never imply shared player databases.

| Resource | Proposed ownership/configuration | Stage versus beta |
|---|---|---|
| Provider organization/workspace | Director billing owner, named operations owner, MFA, least-privilege collaborators; Pro for Render environment isolation | One paid workspace can contain protected isolated environments; separate accounts if organizational policy requires it (extra costs re-quote) |
| Web static project | Immutable Vite build; Pages project per environment; content hash/source/release retained; headers/CSP and SPA routes qualified | Stage synthetic/test allowlist; beta permitted content only |
| API | Fastify Node24 executable; platform listener port/origin configuration; liveness versus genuine readiness; constrained application role | Independent processes/config/deploy permissions |
| Match service | Node24 process, bounded authenticated WebSockets, viewer-specific state; graceful drain/reconnect; durable commands before acknowledgement | Public connection endpoint is authenticated; internal authority/database remain private |
| Worker | No public ingress; durable idempotent job lifecycle, retry/dead-letter alerts | Separate queue/domain and restricted DB login; current worker is idle |
| Simulation class | Dedicated process/container when introduced; wall/CPU/time/concurrency limits, lower priority than live games | Stage batch work initially; no unbounded simulations on match event loop; additional compute priced after measurement |
| PostgreSQL18 | Per-environment DB, API/match/worker restricted identities and migration-only role; TLS; no public DB access; extensions/migration compatibility qualified | Distinct DB instances; beta RPO choice determines single/standby/synchronous tier |
| Migrations | One reviewed one-shot deployment job, explicit target, no browser/admin bootstrap credentials; locking and rollback compatibility | Separate migration secret and promotion approval; preserve existing local roles/data |
| Object storage | Separate environment buckets/credentials for public assets, private viewer replays/exports and encrypted backups | Stage contains synthetic data; no beta snapshot copied to stage without authorized anonymization |
| Backup exporter | Daily encrypted off-provider logical export plus provider PITR; least privilege, last-success age/restore alarms | One export job perenvironment; separate keys and immutable manifest/hash; provider PITR and exports distinct |
| Email | Verified sending identity/SPF/DKIM/DMARC, transactional provider API key, suppression/retry/dedupe | Separate keys/from identities; stage recipients allowlisted |
| Observability | Sentry projects/environment tags, redacted sampled error/trace/log data, web/API/match uptime, worker/job/backup heartbeat | Separate projects and data access; hidden hands, tokens and private RNG never recorded |
| CI/artifact promotion | Current BOOT-03 checks; package source/build fingerprints, container-image qualification and retained BOOT-05 identities | Promote the same reviewed artifact bytes; no production credentials in pull-request jobs; short-TTL synthetic previews only |
| Status/incident operations | Independent operator access and named response owner; maintenance stops new admission and preserves active committed progress | Public status page/alert channel provider remains unselected; built-in limits/support are not a24h human SLA |

## DNS and origin inventory

`<domain>` is an unresolved Director-owned domain, not a registered name. Registrar/zone account MFA/recovery must be qualified. Records refer to verified provider targets after provisioning; do not guess CNAMEs/IPs.

| Proposed name | Purpose | Required qualification |
|---|---|---|
| `play.<domain>` / `staging.<domain>` | Beta / synthetic web | HTTPS, SPA routes, CSP, auth trusted origins/cookie policy; no credentials in Vite environment |
| `api.<domain>` / `api-staging.<domain>` | HTTPS account/domain API | Narrow CORS/CSRF origins; platform hostname also protected; rate limits and readiness |
| `match.<domain>` / `match-staging.<domain>` | Authenticated WSS | Upgrade/origin/session auth, reconnect/drain, proxy idle timeouts and exact forwarded-header trust |
| `assets.<domain>` / `assets-staging.<domain>` | Public permitted assets | R2 custom domain/cache/versioning/CORS; no private replay/backup routes |
| `status.<domain>` | Independent service status | Provider/response owner not selected; extra quote if needed |
| Mail DKIM/SPF/DMARC and verification records | Transactional identity and reputation | Actual provider-supplied TXT/CNAME values; start with reviewed DMARC policy/monitoring; registrar renewal cost |

Use direct service TLS initially; a Cloudflare-proxied dynamic API/socket path needs its own timeout/DDoS/cache/forwarded-header qualification before enabling it. Public beta APIs cannot be secured solely by obscuring DNS. Local ports remain web5173/API3001/match3002, worker none; staging platform `$PORT` and TLS fronting require a separate runtime change. Do not run Vite's development server publicly.

## Secret/configuration inventory

Names are proposed server-side keys, not generated values or existing application contracts. Each environment has independent scopes. Store values in provider secret storage and a Director-owned recovery vault; record owners/rotation/restore procedure without values. The existing ignored `.env.local` and `.local/database.json` remain local and unchanged.

| Logical configuration | Readers | Scope/rotation requirement |
|---|---|---|
| `APP_ENV`, listener `PORT`, public HTTPS/WSS endpoints | Owning runtime; explicitly public endpoints only in web build | Validated stage/beta enum/origin policies must be implemented; current runtime only accepts `local` |
| API DB login / match DB login / worker DB login | Respective service only | TLS and restricted roles, secret rotation/reconnect proof; no migration owner in runtime |
| Migration DB login | Approved one-shot migration job only | Short scoped release use; no public/local bootstrap administrator copied |
| Better Auth signing/secret and allowed origins | API auth runtime only | Independent environment secret; session revocation/rotation, guest/recovery/delete flows not yet implemented |
| Internal service identity/signing or future scoped tokens | Authorized server components | Avoid blanket shared root secrets; authenticated transport/purpose binding needs design/tests |
| Email API key/webhook verification secret | API/worker delivery component | Restricted sender/test recipients, inbound signature/idempotency checks and rotation |
| Object store scoped access key/secret | Asset publisher, authorized replay/export service or backup job as appropriate | Bucket/prefix/action restriction; short-lived authorized private downloads; no browser master keys |
| Backup encryption/restore key | Export job + separately authorized recovery operator | Off-provider recoverability and key escrow; stage and beta separated |
| Sentry ingestion DSN and private upload token | Public DSN where appropriate; upload token CI only | DSN is not authorization; redaction/rate caps; private source-map upload token never bundled |
| Deployment/registry/DNS tokens | Approved protected release job/operator only | Least scope, preferably short-lived identity; no pull-request secret access; Director-owned account MFA |

A new value should be logged only as present/absent/qualified and never printed or placed in source, URLs, contracts or evidence. App-specific secret naming/config parsing is subsequent implementation, not proven by this inventory.

## Failure, retention and spending controls

Ordinary process crashes must preserve every acknowledged command while the authoritative database is healthy: commit state, command receipt/journal and transactional effects before acknowledgement, then recover by revision without sticky instance ownership. This remains future gameplay implementation. A database-zone or region disaster is a different failure model; it cannot be hidden behind the ordinary reconnect promise.

The blueprint's provisional beta recovery discussion was RTO4hours/RPO15minutes, but no Director recovery tolerance has been selected. Render's at-least-ten-minute PITR lag leaves little margin for that proposed window and needs drills. Asynchronous standby is not a substitute for synchronous acknowledgement. AWS synchronous Multi-AZ is a candidate for the single-zone requirement, not a guarantee against corruption, compromised credentials or region loss. Test valid exports, restoration, schema/release-pin recovery, receipts/economic reconciliation and re-admission before accepting any target. Backup existence is not a restore test.

Retention fixtures remain provisional: unsaved private completed replays90days, short-lived exports24hours and detailed operational logs14days, with deletion and abuse/tournament exceptions to be resolved. Legal/age/data-residency review requires the intended audience; North America is not a single privacy policy. Asset distribution rights, the free-player funding model and Director-controlled launch scope remain unchanged.

Use alerts at chosen budget percentages, storage/WAL/archive ages and mail/error quotas. Stop new admissions/batch work before reaching measured capacity; preserve running matches. No autosleep for active authority, durable jobs or database. Railway hard-cap shutdown and provider build caps are not graceful economic/competitive recovery controls. The free-to-player policy stays intact; an operations budget is still required.

## Prerequisites and acceptance gates

Current main has executable synthetic foundations, scoped local database roles/recreation, qualified hosted CI source and protocol/release contracts. It has **no authenticated gameplay, queue, economy or live jobs**. `requireLocalEnvironment()` rejects non-local runtime; all three executables call it. Do not set `APP_ENV=local` on a remote service to bypass this gate. Existing built artifacts do not yet constitute qualified production container images.

Before provisioning: Director selects ceiling/recovery policy, domain/registrar, region strategy, account owner and operations owner; obtain final regional/account/domain/tax/current quotes; approve provider selection and intended spending. Finalize an ADR and provider-native definitions only after these decisions, retaining this dated research checkpoint.

Before exposing even staging: implement validated stage/beta configuration/ports/origins; immutable image packaging/promotion and scoped secret ingestion; private PG18 migrations/TLS/permissions; authorization for endpoints and protected synthetic stage; restore/deploy-drain/readiness drills and alerts. Product-account beta additionally needs audience/age/privacy/content authorization, real auth/recovery and durable engine/queue/economy/viewer policies. RULE-01/02 and UX-01/02 prerequisites remain unchanged.

BOOT-04 can close as a design/worksheet task without deploying, once every intended resource and quantity is reviewable, material decisions are recorded, exact unresolved quotes are resolved or the Director explicitly defers them, and documentation/arithmetic/source coverage checks pass. OPS/release acceptance separately requires executed deployment/restore/load/device evidence.

## Evidence and follow-up

Fresh [RUN063](../validation/runs/RUN-20261007-063.json) passed doctor, static/documentation verification, five bootstrap tests and authenticated local bootstrap-DB connectivity in the existing non-root Dev Container. No application behavior was changed. Research fetches in the source register have their own actual retrieval times/digests; they are not capacity, security, backup or provider runtime qualification. One obsolete storage URL returned404 and is preserved as unavailable. RUN064 passed static full-scope/source/arithmetic checks. RUN065 preserves a real draft metadata rejection; corrected RUN066 passed docs/static/history/known-secret and private/source/listener preservation gates. [BOOT-04 evidence](../validation/boot-04.md) and CHG-20261007-005 retain the actual receipts and limits. The finalized research checkpoint does not close the overall design task.

Next collaboration: select the recovery model before preferring a provider; compare the known tier amounts plus contingency and unresolved charges before setting a ceiling. Then supply/choose a domain and identify the beta audience/operations owner. The research can be revised through a new record without overwriting executed or sealed evidence.
