# BOOT-04 decision worksheet: providers, stack, inventory and spend

Recorded: 2026-10-10 UTC / 2026-10-09 America/Phoenix. Task: BOOT-04 ("Staging provider definitions and complete spend worksheet"). Acceptance evidence required: "Reviewable projects/services/DNS/secret inventory with current line-item quotes". Decisions: [ADR0007 hosting/providers](../adr/0007-hosting-provider-baseline.md) and [ADR0008 engine placement/dependencies](../adr/0008-engine-placement-dependency-baseline.md). Change record: [CHG-20261010-001](../changes/CHG-20261010-001.json).

**Status:**
- The decisions are final as the project baseline.
- Director sign-off (§12) and purchase remain open.
- No account was opened, nothing was bought, and no DNS, deployment, credential or setting was changed.
- Reviewed deployment configuration is the remaining BOOT-04 work (§13).

## 1. What "final" means

No vendor or engineer can guarantee prices, stock or terms for a multi-year live service. The 2026 Hetzner and OVHcloud increases recorded below show that. "Final" therefore means:

- Every selection was compared against the full vision (548 requirements in 33 groups plus X01–X07) and against current sources, with retrieval dates.
- Each decision is the baseline that all tasks implement.
- A decision changes only through a superseding ADR with comparative evidence, triggered by a condition in §11.

## 2. Director inputs applied

| Input | Date (UTC) | Effect |
|---|---|---|
| Total hosting budget about $25/month | 2026-10-08 | Replaces the blueprint §14.4 $150–$400 planning allowance |
| Keep the complete vision; no scope reduction | 2026-10-09 | All 548 requirements and X01–X07 stay in scope; compute-heavy trust-free features move to the browser (ADR0008) |
| Request for the finalized stack, vendors, services and dependencies | 2026-10-10 | This worksheet; the guarantee limits are stated in §1 |
| duels.ink operator hardware report (12 vCPU / 24 GB shared host for most of its life; recent move to a ~€100 dedicated server; intermittent Hetzner connection drops; bot model trained offline) | 2026-10-09 | Supports a shared-vCPU host at launch scale; reconnect design and an off-host uptime probe are mandatory; the offline-trained bot option is recorded for R12 |

## 3. Decision register (BOOT-04)

| ID | Decision | Replaces | Vision served |
|---|---|---|---|
| B4-01 | OVHcloud US **VPS-3 (2027)**: 6 vCores, 12 GB, 100 GB NVMe, unlimited traffic, anti-DDoS; `US-EAST-VA`; Debian 13 | Render services (blueprint §5.2) | R30.008–R30.011 |
| B4-02 | Cloudflare **Free** plan: DNS, proxy, TLS, WebSockets; **Cloudflare Tunnel** as the only public ingress | Direct origin exposure | R29, R30.010 |
| B4-03 | Cloudflare **Workers static assets** for the web app | Cloudflare Pages | R25 loading, R30.015 |
| B4-04 | Cloudflare **R2**: public assets bucket via a custom domain; private backup/export buckets | Unchanged | R20.003, R15.017, R30.012 |
| B4-05 | Self-hosted **PostgreSQL 18** (existing pinned image) per environment. **pgBackRest 2.59.3**: repo1 R2 (WAL archive, PITR, `archive_timeout` 60 s); repo2 **Backblaze B2** (weekly full); plus OVHcloud **Automated Backup Standard** | Render Postgres + PITR | R30.012, blueprint §14.3 |
| B4-06 | Email: **Resend Free**; **Amazon SES** as overflow above 100/day (not provisioned now) | Unchanged | AUTH-01, R26 |
| B4-07 | **Sentry Developer** (free) for errors; **UptimeRobot Free** external probes and status page; Pino logs locally rotated; no hosted log platform; OpenTelemetry API only | Partly open in blueprint | R30.013, R30.014, R30.017 |
| B4-08 | **GitHub Actions** (repository is public, so standard runners are free); **pull-based deploy** of verified BOOT-03 artifacts; no container registry | Render deploy blueprints | R30.015, blueprint §15.2 |
| B4-09 | **Cloudflare Registrar** for the domain (name pending D01) | Unchanged | R30.017 |
| B4-10 | **tcg-engines fork**, isomorphic placement (server-authoritative for anything rewarded or hidden; browser for trust-free modes) | Server-only simulation workers | R02, R04, R12–R13, R15 |
| B4-11 | Production **Node 24.21.0** with a precompiled engine; **Bun 1.4.2** for CI/development only | Unchanged / clarified | RULE-02 acceptance |
| B4-12 | Server randomness: injected generator built on `node:crypto` from a secret 256-bit seed; `seedrandom` only in the browser Lab | Upstream `seedrandom` / `Math.random` | R29.003–R29.004, R28.008 |
| B4-13 | Region `US-EAST-VA`; `US-WEST-OR` is the alternative if D03 shows a western/Asian majority | Render Oregon | Latency (§4) |
| B4-14 | Billing: month-to-month at purchase; 12-month prepay only once a launch date is fixed | — | Budget |
| B4-15 | **Rejected/deferred:** Render, Railway, Fly.io, Hetzner, netcup, Oracle Always Free, Kimsufi, Dokploy/Coolify, Redis/Valkey, Supabase/Neon, Cloudflare Images, paid LLM (R14 stays deterministic first), OTel exporter | — | ADR0007/0008 evidence |

## 4. Evidence summary

These are exploratory measurements, not repository run evidence. They ran in a Claude Code cloud container (4 vCPU Intel Xeon 2.80 GHz) against upstream `53a7941`, outside the Dev Container and the evidence recorder. The harness was not committed; Appendix A reproduces it. RULE-02 must reproduce them under Node 24.21.0 in the Dev Container.

| Measurement | Result |
|---|---|
| Bun 1.4.2, 24 bot-vs-bot games | 24 finished, 0 errors, 0 stuck; 2,154 actions (89.8/game). Move execution mean 25.31 ms (p50 15.75, p95 74.20, p99 176.67, max 622.13). Bot decide+apply mean 44.88 ms. State JSON 13.9 KB. RSS 328 MB |
| Node 22.22.0 + tsx 4.23.15, same harness | 24 finished, 0 errors; 2,271 actions. Move execution mean 34.19 ms (p50 18.76, p95 112.83, p99 261.94, max 760.44). Bot mean 51.22 ms. On-the-fly import 13.5 s. RSS 459 MB |
| Determinism | Same seeds gave 2,154 and 2,271 actions, so randomness is not fully controlled by the seed |
| Browser bundle (`bun build --target=browser --minify`) | Engine only 882 KiB raw / 213 KiB gzip; engine + sets 001–013 7,519 KiB raw / 1,657 KiB gzip |
| Hidden-information spot check (12 actions) | The player's view showed opponent hand/deck as counts and the inkwell as placeholders; the adapter's viewer resources expose the full instance-to-card map |
| Upstream inventory | 3,198 card definition files (sets 001–013); 2,670 card test files; about 97k engine source lines and 232k card-definition lines; rules reference CR 2.0.1 (current is 2.2.0) |

**Capacity reading:**
- A player-vs-player game is about 90 actions × 25–34 ms, roughly 2–3 CPU-seconds over 20–30 minutes.
- The engine CPU of a 6-vCore host is therefore not the constraint at launch scale; memory is (§6).
- A 1,000-game simulation is about 67 CPU-minutes, which is why simulations run in the browser.
- Networking, projection and database overhead were not measured (OPS-01).

**Latency:** Los Angeles↔New York [57.9 ms](https://hatsnet.io/docs/network/latency/pairs/lax-nyc-rtt); New York↔Frankfurt [74 ms](https://hatsnet.io/docs/network/latency/pairs/nyc-fra-rtt); Los Angeles↔Frankfurt [137–142 ms](https://hatsnet.io/docs/network/latency/pairs/lax-fra-rtt).

## 5. Environments, projects and accounts

| Environment | Location | Project identity | Data | Ingress |
|---|---|---|---|---|
| Local | Dev Container | `lorcana-online-tcg_devcontainer` (existing) | Synthetic | localhost |
| PR preview | Cloudflare Workers preview versions | `lorcana-web-staging` previews | Synthetic; no API/auth/buckets of other environments | `*.workers.dev` |
| Staging | VPS | Compose `lorcana-staging` | Synthetic/representative only | Tunnel `lorcana-staging` |
| Production | VPS | Compose `lorcana-prod` | Real users only after release gates | Tunnel `lorcana-prod` |

**Cloud resources** (create at provisioning; names are final):

| Provider | Resource | Purpose |
|---|---|---|
| Cloudflare | Workers `lorcana-web-staging`, `lorcana-web-prod` | Static web app per environment |
| Cloudflare | R2 `lorcana-assets-staging`, `lorcana-assets-prod` | Public immutable assets via custom domains; content-hashed keys |
| Cloudflare | R2 `lorcana-backup-staging`, `lorcana-backup-prod` | Private pgBackRest repo1 (WAL + backups), lifecycle-managed |
| Cloudflare | R2 `lorcana-exports-prod` (when R15.017/R33 start) | Private exports via presigned URLs |
| Cloudflare | Tunnels `lorcana-staging`, `lorcana-prod` | Outbound-only ingress |
| Backblaze | B2 `lorcana-pgbackrest-repo2` | Private weekly full backups, pgBackRest-encrypted, data cap enabled |
| OVHcloud US | VPS-3 + Automated Backup Standard | Host and whole-disk daily copy |
| Resend | Sending domain per environment | Verification/recovery/notification email |
| Sentry | Projects `web`, `services` × environments `staging`, `production` | Errors with release IDs and redaction |
| UptimeRobot | Probes for app, api health, play upgrade, assets; public status page | External availability (R30.017) |
| GitHub | Existing repository; environments `staging`, `production` holding deploy secrets | CI and artifacts |

Every account belongs to the Director, with a unique password and 2FA. Agents never hold account passwords.

## 6. Host layout and resource budget (VPS-3)

| Compose project | Service | Memory limit | Notes |
|---|---|---|---|
| `lorcana-prod` | `postgres` (PG18 + pgBackRest) | 2.5 GiB | `shared_buffers` about 768 MiB; tune from OPS-01 |
| `lorcana-prod` | `api` | 512 MiB | Fastify, Better Auth |
| `lorcana-prod` | `match-service` | 2.5 GiB | Main loop + ≤3 engine worker threads (330–460 MB each, measured) |
| `lorcana-prod` | `worker` | 1 GiB | pg-boss, outbox, email, one engine instance for rewarded AI matches |
| `lorcana-prod` | `cloudflared` | 128 MiB | 4 connections, ≥2 Cloudflare data centers |
| `lorcana-staging` | `postgres`, `api`, `match-service` (1 engine worker), `worker`, `cloudflared` | 3 GiB total | Stopped during production peaks; never load-tested at peak |
| Host | Debian 13, Docker, page cache | ~1.5 GiB | — |

- **Memory:** planned limits total about 11.1 GiB of 12 GiB. Disk: 100 GB, with an alert at 70%.
- **CPU:** 6 shared vCores. Containers get CPU limits so staging cannot starve production.
- **Ports:** service ports `3001` (api) and `3002` (match) stay internal to Compose networks. Nothing listens publicly except SSH (§8).

## 7. DNS inventory

The domain is pending D01, shown here as `<domain>`. All names are single-level subdomains so Cloudflare Universal SSL covers them. Staging uses an `stg-` prefix instead of nested names.

| Record | Target | Proxied | Environment |
|---|---|---|---|
| `<domain>`, `www` | Redirect rule → `app.<domain>` | Yes | Production |
| `app` | Workers custom domain `lorcana-web-prod` | Yes | Production |
| `api` | Tunnel `lorcana-prod` → `http://api:3001` | Yes | Production |
| `play` | Tunnel `lorcana-prod` → `http://match-service:3002` (WebSocket) | Yes | Production |
| `assets` | R2 custom domain `lorcana-assets-prod` | Yes | Production |
| `status` | UptimeRobot status page (CNAME if the free plan allows a custom domain; otherwise link the hosted URL) | — | Production |
| `stg-app`, `stg-api`, `stg-play`, `stg-assets` | Same pattern for staging resources | Yes | Staging |
| Resend `send`/DKIM/SPF/`_dmarc` | Exact values issued at domain verification; DMARC starts `p=none`, then tightens | No | Both |

No A/AAAA record points at the VPS. Cookies stay host-only on `api` per blueprint §5.3, so staging and production sessions cannot cross.

## 8. Secret inventory

Each secret exists separately for staging and production unless marked otherwise. Values are never committed, logged, put on command lines or placed behind a `VITE_` prefix. Rotate on compromise, on a change of administrator, and at least yearly; signing keys rotate with overlapping verification (blueprint §5.4).

| Secret | Consumer | Storage | Scope |
|---|---|---|---|
| Provider account logins (OVHcloud, Cloudflare, Backblaze, Resend, Sentry, UptimeRobot, GitHub) | Director | Password manager + 2FA | Account owner |
| VPS admin SSH key (ed25519) | Director | Director device | Key-only login, root login and passwords disabled, rate-limited; OVHcloud console is break-glass |
| PostgreSQL bootstrap administrator | Provisioning only | Host file, mode 600, root-owned | Per environment (BOOT-02 model) |
| Managed roles `lorcana_{staging,prod}_{migrator,api,match,worker}` | Services/migrator | Docker secrets | Least privilege as in BOOT-02 |
| Better Auth secret | api | Docker secret | Per environment |
| Session/receipt signing keys | api, match-service | Docker secrets | Overlapping rotation |
| Cloudflare Tunnel token | cloudflared | Docker secret | One tunnel per environment |
| Cloudflare API token "Workers deploy" | GitHub Actions | GitHub environment secret | Workers Scripts edit only, one account |
| R2 key "backup-writer" | pgBackRest | Host file 600 | Object read/write on that environment's backup bucket only |
| R2 key "asset-publisher" | CI/content pipeline | GitHub environment secret | Write to that environment's assets bucket only |
| R2 key "export-presigner" (later) | api | Docker secret | Private exports bucket only |
| B2 application key | pgBackRest repo2 | Host file 600 | One bucket |
| pgBackRest repo cipher passphrases (repo1, repo2) | pgBackRest | Host file 600 **and** an offline copy in the Director's password manager | Required for any restore |
| Resend API key | worker | Docker secret | Sending access, one domain |
| Sentry DSNs / auth token | apps / GitHub Actions | Public config / GitHub secret | DSN is non-secret config; token uploads source maps only |
| GitHub fine-grained token "artifact-read" | Host deploy timer | Host file 600 | Read Actions artifacts of this repository only |
| VAPID key pair (when R26 starts) | worker | Docker secret | Browser push |
| Match RNG seeds | match-service | Database, private columns | Disclosed only for completed-match replay verification |

## 9. Line-item quotes

Prices are USD before tax. The OVHcloud US catalog reports `taxRate` 0; any sales tax is shown at checkout.

| # | Line | Unit price | Monthly | Source (retrieved UTC) |
|---|---|---|---|---|
| 1 | OVHcloud US VPS-3 (2027), `US-EAST-VA`, month-to-month | $14.50 (6-mo $13.77; 12-mo $12.32; installation $0) | **$14.50** | OVHcloud US public order catalog API, catalog 3701 (2026-10-10T05:16Z) |
| 2 | OVHcloud Automated Backup Standard (VPS-3) | $0.80 | **$0.80** | Same (2026-10-10T05:16Z) |
| 3 | `.com` domain via Cloudflare Registrar (at cost) | ≈$10.46/year | **≈$0.87** | Third-party listings July 2026; Cloudflare states no markup ([registrar](https://www.cloudflare.com/products/registrar/), 2026-10-09). Confirm at checkout |
| 4 | Cloudflare Free plan: DNS, proxy, WebSockets, Tunnel | $0 | $0 | [WebSockets](https://developers.cloudflare.com/network/websockets/), [Tunnel FAQ](https://developers.cloudflare.com/cloudflare-one/faq/cloudflare-tunnels-faq/) (2026-10-08/09) |
| 5 | Workers static assets | Static requests free and unlimited | $0 | [Billing](https://developers.cloudflare.com/workers/static-assets/billing-and-limitations/) (2026-10-08); Pages page says "Start new projects with Workers" (2026-10-09) |
| 6 | R2 (assets 2–4 GB + backups ≤5 GB; Class A ≤60k/month) | Free: 10 GB-month, 1M Class A, 10M Class B; then $0.015/GB, $4.50/M, $0.36/M; egress free | $0 | [R2 pricing](https://developers.cloudflare.com/r2/pricing/) (2026-10-08). Needs a card on file (community-reported $5 verification hold) |
| 7 | Backblaze B2 repo2 | First 10 GB free; then $6.95/TB-month; egress free to 3× storage | $0 | [B2 pricing](https://www.backblaze.com/cloud-storage/pricing) (2026-10-08) |
| 8 | Resend Free | 3,000/month, 100/day, 3 domains; Pro $20 for 50k | $0 | [pricing.md](https://resend.com/pricing.md) (2026-10-10) |
| 9 | Sentry Developer | 5k errors, 5M spans, 1 user; Team $26 | $0 | [Sentry pricing](https://sentry.io/pricing/) (2026-10-08) |
| 10 | UptimeRobot Free | 50 monitors at 5-min interval ("hobby and non-profit"); Solo $12 | $0 | [UptimeRobot pricing](https://uptimerobot.com/pricing/) (2026-10-08) |
| 11 | GitHub Actions | Public repository: standard runners free (private would be 2,000 min + 500 MB/month) | $0 | [GitHub docs](https://docs.github.com/en/billing/concepts/product-billing/github-actions) (2026-10-10); visibility `public` observed 2026-10-10 |
| 12 | Amazon SES overflow (not provisioned) | $0.10 per 1,000 | $0 | [SES pricing](https://aws.amazon.com/ses/pricing/) (2026-10-08) |
| | **Total, month-to-month** | | **≈ $16.17** | Headroom ≈ $8.83 under the $25 cap |
| | **Total, 12-month prepay of line 1** | $147.84 upfront | **≈ $13.99** | Use once the launch date is fixed |

**Pre-quoted upgrades (same retrieval):**
- VPS-4 (8 vCores/24 GB/200 GB): $27.50 month-to-month, $26.12 on 6 months, $23.37 on 12 months; its backup add-on is $1.20. VPS-4 fits the cap only when prepaid and with the OVHcloud add-on dropped (≈ $24.24).
- VPS-1 for a separate staging host: $5.35, or $4.54 prepaid.
- Dedicated OVHcloud US RISE-S: $77 (2026-10-08) — only when donations fund it.

**Price history:** Hetzner's June 2026 table moved CPX52 from €36.49 to €100.49 for new orders ([Hetzner](https://docs.hetzner.com/general/infrastructure-and-availability/price-adjustment/)); OVHcloud raised some products on 2026-04-01.

## 10. Cost controls

- **Alerts** at 50/75/90% of the cap (blueprint §14.4): Cloudflare billing/usage notifications for R2 and Workers, the Backblaze B2 data cap, and Sentry spike protection and quota sampling. OVHcloud is a fixed price.
- **Free-tier hard limits are designed for:** the email queue backs off at Resend's 100/day; probes stay within 50 monitors.
- **Billing alerts are not caps** unless the provider enforces them (B2 caps and Sentry quotas do).
- **Order of shedding load:** optional simulations, then exports, then verbose telemetry, then new admissions. Active matches and durable state are preserved.

## 11. Re-open triggers

| Area | Trigger | Pre-quoted response |
|---|---|---|
| Host | Memory >75% for 7 days; command validation/commit p95 >150 ms; disk >70%; CPU steal >10% | VPS-4, or move staging to VPS-1 |
| Host | Provider-attributable availability <99.9% in a month, or repeated network drops | Move providers using the restore procedure; re-quote |
| Price | Any line pushes the total above the cap | Re-quote alternatives (ADR0007 table) |
| Region | D03 evidence of a western/Asian majority | `US-WEST-OR`, or a second region via X04 design |
| Cloudflare | Free-plan, Tunnel or R2 term change; R2 usage above free tier | Re-evaluate B4-02…B4-05 |
| Engine | RULE-02 fails Node 24 qualification, or the RNG/projection patches prove infeasible | Superseding ADR |
| Renderer | M1 device proof fails the loading/frame budgets | Renderer ADR (blueprint §3.2) |
| Durability | Director requires zero acknowledged loss | Second host with a synchronous standby (above the cap) |
| Email | Sustained >100 emails/day | Enable SES overflow |

## 12. Director sign-off checklist

- [ ] Region `US-EAST-VA` (or `US-WEST-OR`).
- [ ] Month-to-month at purchase; prepay only at launch date.
- [ ] Durability for staging/closed beta: RPO ≤ 60 s, RTO ≤ 4 h, single host; zero-loss deferred to the public-release gate (D02).
- [ ] Purchase timing: when the first staging deploy is ready (after PLAY-01/M1 readiness), not before.
- [ ] Domain name (D01) and registrar purchase.
- [ ] Payment methods: OVHcloud US, Cloudflare (required for R2), Backblaze.
- [ ] Accept UptimeRobot's free terms for this non-commercial fan project.
- [ ] Assets: staging uses neutral fixtures until D07 resolves card art/text rights.

## 13. Remaining BOOT-04 work (reviewed configuration, separate change)

Each item needs its own change record and executable evidence:
- Production/staging Compose profiles with resource limits.
- A derived PostgreSQL 18 image with pinned pgBackRest.
- `cloudflared` service configuration, pinning the multi-arch digest of `cloudflare/cloudflared:2026.10.0`.
- `wrangler` configuration for both Workers.
- The pull-deploy timer with release-manifest verification.
- Host hardening (SSH, unattended security upgrades, firewall).
- A hosting runbook.
- A first restore drill (OPS-01).

None of this provisions accounts or spends money without Director authorization.

## 14. Exact dependency and service baseline

### 14.1 Planned register, unchanged versions

Source: `docs/vision/dependencies.json` (61 packages, researched 2026-10-05). "Installed" was observed in the current manifests on 2026-10-10. Recheck peers/licenses/build scripts at install (AGENTS.md).

| Package | Exact version | License | Owning workspace | Purpose | Vision/task | Status |
|---|---|---|---|---|---|---|
| `@aws-sdk/client-s3` | 3.1146.0 | Apache-2.0 | apps/worker, apps/api | R2 S3 API for asset ingest and private exports | CONTENT/R27, R15.017 | Keep; install at owning task |
| `@aws-sdk/s3-request-presigner` | 3.1146.0 | Apache-2.0 | apps/api | Short-lived signed downloads for private exports/replays | R15.017, R33 | Keep; install at owning task |
| `@axe-core/playwright` | 4.13.0 | MPL-2.0 | apps/web (dev) | Automated accessibility checks | R25 | Keep; install at owning task |
| `@babylonjs/core` | 9.29.0 | Apache-2.0 | packages/presentation | Table, pack-opening and card-effect renderer; lazy-loaded | R06.014, R24, WEB-01 | Installed (packages/presentation) |
| `@babylonjs/loaders` | 9.29.0 | Apache-2.0 | packages/presentation | glTF assets for packs, playmats and boards | R06, R24 | Keep; install at owning task |
| `@eslint/js` | 10.0.1 | MIT | root (dev) | Lint rules | BOOT-01 | Installed (root) |
| `@fastify/cookie` | 11.1.2 | MIT | packages/service-runtime | Host-only session cookies | AUTH-01, R30.001 | Keep; install at owning task |
| `@fastify/helmet` | 13.1.1 | MIT | packages/service-runtime | Security headers | R29 | Keep; install at owning task |
| `@fastify/rate-limit` | 11.2.0 | MIT | packages/service-runtime | Per-IP/principal limits | R29, R33.009 | Keep; install at owning task |
| `@fastify/type-provider-typebox` | 6.1.0 | MIT | packages/service-runtime | Typed TypeBox routes | BOOT-05 | Installed (packages/service-runtime) |
| `@fastify/websocket` | 11.3.3 | MIT | apps/match-service | Match, spectator and presence sockets | PLAY-03, R17, R19.004 | Keep; install at owning task |
| `@gltf-transform/cli` | 4.5.1 | MIT | content tooling (dev) | Optimize 3D assets | R24, WEB-01 | Keep; install at owning task |
| `@opentelemetry/api` | 1.9.1 | Apache-2.0 | packages/service-runtime | Trace/span API only (no exporter) | R30.013 | Keep; install at owning task |
| `@opentelemetry/sdk-node` | 0.222.0 | Apache-2.0 | (not installed) | Exporter/collector | R30.013 | **Deferred** (exporter only when OPS-01 needs it and fits budget) |
| `@playwright/test` | 1.63.0 | Apache-2.0 | apps/web (dev) | Browser journeys | BOOT-03 | Installed (apps/web) |
| `@sentry/node` | 11.4.0 | MIT | services | Server crash reporting (Developer plan) | R30.014 | Keep; install at owning task |
| `@sentry/react` | 11.4.0 | MIT | apps/web | Client crash reporting (Developer plan) | R30.014 | Keep; install at owning task |
| `@storybook/react-vite` | 10.6.1 | MIT | packages/design-system (dev) | Component workbench | UX-03 | Keep; install at owning task |
| `@tanstack/react-query` | 5.104.1 | MIT | apps/web | Server data cache | UI | Keep; install at owning task |
| `@tanstack/react-virtual` | 3.14.13 | MIT | apps/web | Virtualized card grids | R05, R20 | Keep; install at owning task |
| `@testing-library/dom` | 10.4.2 | MIT | apps/web (dev) | UI tests | QA | Keep; install at owning task |
| `@testing-library/jest-dom` | 7.0.1 | MIT | apps/web (dev) | UI tests | QA | Keep; install at owning task |
| `@testing-library/react` | 16.3.3 | MIT | apps/web (dev) | UI tests | QA | Keep; install at owning task |
| `@testing-library/user-event` | 14.6.7 | MIT | apps/web (dev) | UI tests | QA | Keep; install at owning task |
| `@types/node` | 24.19.1 | MIT | all (dev) | Types | BOOT-01 | Installed (apps/api, apps/match-service, apps/web, apps/worker, packages/db, packages/service-runtime) |
| `@types/pg` | 8.23.1 | MIT | packages/db (dev) | Types | BOOT-02 | Installed (packages/db) |
| `@types/react` | 19.3.0 | MIT | apps/web, packages/design-system (dev) | Types | BOOT-01 | Installed (apps/web, packages/design-system) |
| `@types/react-dom` | 19.3.0 | MIT | apps/web, packages/design-system (dev) | Types | BOOT-01 | Installed (apps/web, packages/design-system) |
| `@vitejs/plugin-react` | 6.1.2 | MIT | apps/web (dev) | Vite React plugin | BOOT-01 | Installed (apps/web) |
| `better-auth` | 1.7.7 | MIT | apps/api | Self-hosted accounts, guest upgrade, recovery, OAuth | AUTH-01, R30.001–003 | Keep; install at owning task |
| `drizzle-kit` | 0.31.11 | MIT | packages/db (dev) | Migration authoring | BOOT-02 | Keep; install at owning task |
| `drizzle-orm` | 0.45.3 | Apache-2.0 | packages/db | Typed queries | BOOT-02 | Installed (packages/db) |
| `eslint` | 10.12.0 | MIT | root (dev) | Lint | BOOT-01 | Installed (root) |
| `fast-check` | 4.10.2 | MIT | packages/engine-adapter, packages/domain (dev) | Property/invariant tests | R28 | Keep; install at owning task |
| `fastify` | 5.12.5 | MIT | packages/service-runtime | HTTP server | BOOT-01 | Installed (packages/service-runtime) |
| `i18next` | 26.4.2 | MIT | apps/web | Localization runtime | R25.015, R27.014 | Keep; install at owning task |
| `motion` | 14.0.0 | MIT | apps/web, packages/design-system | DOM animation | R25 reduced motion | Keep; install at owning task |
| `msw` | 2.15.0 | MIT | apps/web (dev) | API mocking in tests | QA | Keep; install at owning task |
| `pg` | 8.23.1 | MIT | packages/db | PostgreSQL driver | BOOT-02 | Installed (packages/db) |
| `pg-boss` | 12.37.0 | MIT | apps/worker | Durable jobs and outbox (no Redis) | PLAY-01, ECON | Keep; install at owning task |
| `pino` | 10.4.0 | MIT | packages/service-runtime | Structured logs | R30.013 | Keep; install at owning task |
| `prettier` | 3.9.9 | MIT | root (dev) | Formatting | BOOT-01 | Keep; install at owning task |
| `react` | 19.3.0 | MIT | apps/web, packages/design-system | UI | BOOT-01 | Installed (apps/web, packages/design-system) |
| `react-aria-components` | 1.21.1 | Apache-2.0 | packages/design-system | Accessible primitives incl. drag-and-drop | R25, R03.002 | Installed (packages/design-system) |
| `react-dom` | 19.3.0 | MIT | apps/web, packages/design-system | UI | BOOT-01 | Installed (apps/web, packages/design-system) |
| `react-i18next` | 17.0.15 | MIT | apps/web | Localization bindings | R25.015 | Keep; install at owning task |
| `react-router` | 8.4.0 | MIT | apps/web | Routing | UI | Keep; install at owning task |
| `resend` | 6.32.0 | MIT | apps/worker | Transactional email (Free plan) | AUTH-01, R26 | Keep; install at owning task |
| `sharp` | 0.35.5 | Apache-2.0 | content tooling | AVIF/WebP card renditions at ingest (native addon: review allowBuilds) | R20.003, R27.015 | Keep; install at owning task |
| `storybook` | 10.6.1 | MIT | packages/design-system (dev) | Component workbench | UX-03 | Keep; install at owning task |
| `style-dictionary` | 5.6.0 | Apache-2.0 | packages/design-system (dev) | Design tokens | UX-03 | Keep; install at owning task |
| `tsx` | 4.23.15 | MIT | root (dev) | TypeScript script runner | tooling | Keep; install at owning task |
| `typebox` | 1.3.35 | MIT | packages/contracts, packages/service-runtime | Public schemas | BOOT-05 | Installed (packages/contracts, packages/service-runtime) |
| `typescript` | 6.0.3 | Apache-2.0 | root (dev) | Compiler | BOOT-01 | Installed (root) |
| `typescript-eslint` | 8.71.1 | MIT | root (dev) | Lint | BOOT-01 | Installed (root) |
| `vite` | 8.3.2 | MIT | apps/web (dev) | Build | BOOT-01 | Installed (apps/web) |
| `vitest` | 5.0.3 | MIT | all (dev) | Unit tests | QA | Keep; install at owning task |
| `workbox-build` | 7.4.1 | MIT | apps/web (dev) | Service worker build | R04 offline Lab cache | Keep; install at owning task |
| `workbox-window` | 7.4.1 | MIT | apps/web | Cache engine/card bundle and assets | R04, loading budget | Keep; install at owning task |
| `xstate` | 5.33.2 | MIT | apps/web | Interaction state machines | UI | Keep; install at owning task |
| `zustand` | 5.0.15 | MIT | apps/web | Local UI state | UI | Keep; install at owning task |

Installed root tooling outside the register: `ajv` 8.20.0 (MIT), `parse5` 8.0.0 (MIT), `postcss-value-parser` 4.2.0 (MIT).

### 14.2 Additions decided now

| Package / tool | Exact version | License | Owner | Purpose | Task |
|---|---|---|---|---|---|
| `wrangler` | 4.149.0 | MIT OR Apache-2.0 | root (dev/CI) | Deploy Workers static assets | BOOT-04 configuration |
| `mutative` | 1.3.0 | MIT | vendor closure via `packages/engine-adapter` | Engine immutable state | RULE-02 |
| `@logtape/logtape` | 2.0.7 | MIT | vendor closure | Engine logging (route to Pino) | RULE-02 |
| `zod` | 4.4.3 | MIT | vendor closure (bot-core, engine) | Engine-internal validation only | RULE-02 |
| `unique-names-generator` | 4.7.1 | MIT | vendor closure (types) | Upstream naming helper (prune if unused at runtime) | RULE-02 |
| `seedrandom` | 3.0.5 | MIT | vendor closure, browser only | Lab/simulation randomness; never server matches | RULE-02 |
| Bun | 1.4.2 | MIT | Dockerfile/CI only | Run upstream `bun:test` suites unchanged; never production | RULE-02 |

Excluded from the closure:
- `nanoid` and `object-hash`: declared but not imported by runtime code.
- `@logtape/pretty` 2.0.7: development formatter; prune or keep dev-only.
- `@discord/embedded-app-sdk`: upstream Discord presence; prune.
- `bun:test`/`@jest/globals`: tests only.

The closure versions are the upstream lockfile versions at `53a7941`, not newer registry versions.

### 14.3 Platform images and host software

| Component | Version / pin | Notes |
|---|---|---|
| VPS host OS | Debian 13 (OVHcloud image) | Unattended security upgrades |
| Container runtime | Docker Engine + Compose v2 from Docker's Debian repository | Pin the package versions in the configuration change |
| Node runtime image | `node:24.21.0-bookworm-slim@sha256:0e0ff40c39bc087845bfb27465a0df4ea419520094bc35842ff83dd8cbe6f9b6` | Existing `toolchain.json` pin |
| PostgreSQL | `postgres:18@sha256:5a5a84b19854a9ffaa54082c166ff4ec27473a361e496e5ea167f298f2da9722` + pgBackRest 2.59.3 (PGDG package) | Derived image; read pgBackRest's 2026-10-04 encryption notice before enabling repo cipher |
| Tunnel connector | `cloudflare/cloudflared:2026.10.0` (released 2026-10-05) | Pin the multi-arch index digest at configuration |

### 14.4 Later additions (vendor chosen now; exact version pinned at install after recheck)

| Package | Observed version (2026-10-10) | License | Owner | Vision |
|---|---|---|---|---|
| `web-push` | 3.6.7 | MPL-2.0 | apps/worker | R26 browser push (VAPID; no paid push service) |
| `minisearch` | 7.2.0 | MIT | apps/web | R03.003, R20.014–R20.015 client-side text search |
| `recharts` | 3.10.1 | MIT | apps/web | R16, R21 charts (SVG; accessibility verified under R25) |
| `openskill` | 5.0.1 | MIT | packages/domain | R10.003 rating; supports X01 teams/multiplayer |
| `obscenity` | 0.4.6 | MIT | apps/api | R19.009 chat, R31.005 username moderation |
| `onnxruntime-web` / `onnxruntime-node` | 1.30.0 | MIT | apps/web / apps/worker | Only if a trained bot model is selected for R12.003–R12.004 (trained offline at $0) |

Swiss pairing (R18), Twitch overlays (R17.013), replay storage (R15) and the rules assistant (R14, deterministic first) need no additional dependency or paid service.

### 14.5 Vision coverage check

Every requirement group maps to the stack above with no additional paid service:
- **Server, authoritative:** R02, R05–R11, R17–R19, R26, R29–R31, R33.
- **Browser, trust-free modes:** R04, R12.015–R12.016, R13, R15 viewing, R16 calculations, R32 local tools.
- **Content pipeline and R2:** R01, R20, R27.
- **Tests/CI:** R28.

The two compute-heavy optional areas, R04.028 and R12.004, run on players' devices or offline training hardware.

## Appendix A: measurement harness

Reproduce under RULE-02 inside the Dev Container with Node 24.21.0 and pinned upstream.

```ts
// Bot-vs-bot self-play timing (evaluation only). L = upstream submodules/lorcana/packages/lorcana
const { LorcanaServer, createPlayerId, BEST_AI_DECK_DOSSIERS } = await import(`${L}/lorcana-engine/src/index.ts`);
const cards = await import(`${L}/lorcana-cards/src/index.ts`);
const catalog = (await import(`${L}/lorcana-cards/src/cards/sync.ts`)).getLorcanaCardCatalogSync();
const aliases = (await import(`${L}/lorcana-cards/src/data/cards.legacy-short-id-aliases.json`)).default;
const deck = (sig) => sig.split("|").map((e) => { const [id, q] = e.split(":"); return { cardId: aliases[id]?.shortId ?? id, qty: +q }; });
for (let g = 0; g < 24; g++) {
  const p1 = createPlayerId("p1"), p2 = createPlayerId("p2");
  const d = BEST_AI_DECK_DOSSIERS;
  const cardsMaps = cards.fromDeckToCardInstances([{ deck: deck(d[g % d.length].signature), owner: p1 }, { deck: deck(d[(g * 3 + 1) % d.length].signature), owner: p2 }]);
  const server = new LorcanaServer({ seed: `bench-${g}`, goingFirst: p1, cardCatalog: catalog, players: [{ id: p1 }, { id: p2 }], cardsMaps, matchID: `m${g}`, gameID: `g${g}` });
  // Time takeAutomatedActionForCurrentActor() per action; wrap executeMoveInputForPlayer (outermost call only)
  // to separate move execution from bot planning; stop when hasGameEnded() or after 3,000 actions.
}
```

Bundle probe: `bun build <entry importing LorcanaServer + getLorcanaCardCatalogSync + fromDeckToCardInstances> --target=browser --minify`, then `gzip -9`.

## Sources

- **Providers:**
  - [OVHcloud US VPS](https://us.ovhcloud.com/vps/); US public catalog API (`/1.0/order/catalog/public/vps?ovhSubsidiary=US`).
  - [OVHcloud bare metal](https://us.ovhcloud.com/bare-metal/prices/).
  - Hetzner [price adjustment](https://docs.hetzner.com/general/infrastructure-and-availability/price-adjustment/) and [CPX availability](https://www.hetzner.com/cloud/regular-performance/).
  - [Render pricing](https://render.com/pricing), [Railway pricing](https://railway.com/pricing), [Fly.io pricing](https://docs.fly.io/about/pricing), [netcup root servers](https://www.netcup.com/en/server/root-server), [Oracle Always Free](https://docs.oracle.com/en-us/iaas/Content/FreeTier/freetier_topic-Always_Free_Resources.htm).
- **Cloudflare:** [Pages](https://developers.cloudflare.com/pages/), [Tunnel availability](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/tunnel-availability/), [CDN terms](https://www.cloudflare.com/service-specific-terms-application-services/).
- **Backup and data tooling:** [pgBackRest](https://pgbackrest.org/), [PgBouncer features](https://www.pgbouncer.org/features.html), [Redis licenses](https://redis.io/legal/licenses/), [Valkey](https://github.com/valkey-io/valkey).
- **Upstream engine:** [tcg-engines at 53a7941](https://github.com/TheCardGoat/tcg-engines/tree/53a79413c58678b1c50dde57e71de5c123132716).
