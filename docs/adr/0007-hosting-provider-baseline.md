# ADR0007: Single-host hosting and provider baseline under a $25 monthly cap

Recorded date: 2026-10-10 UTC / 2026-10-09 America/Phoenix. Status: accepted as the BOOT-04 decision baseline; Director sign-off items and purchase remain open in the [BOOT-04 decision worksheet](../plans/2026-10-10-boot-04-decision-worksheet.md). Change record: [CHG-20261010-001](../changes/CHG-20261010-001.json). Affected tasks: BOOT-04, OPS-01, AUTH-01, PLAY-03, DOC-01/02. Affected requirements (prerequisite infrastructure, none accepted): R30.008–R30.017, R27.016, R29.001, R20.003, R26, R33.009. Companion decision: [ADR0008](0008-engine-placement-dependency-baseline.md).

## Context

Blueprint §3.1, §5.2–5.3 and §14.4 selected Cloudflare Pages plus paid Render services/PostgreSQL in Oregon for staging and closed beta, with a $150–$400/month planning allowance. On 2026-10-08 the Director set a total hosting budget of about $25/month, and on 2026-10-09 required the complete 548-item vision without scope reduction. The blueprint remains a preserved planning snapshot; this ADR amends its hosting rows.

## Decision

1. **Compute:** one OVHcloud US VPS-3 (2027 range: 6 vCores, 12 GB RAM, 100 GB NVMe, unlimited traffic, anti-DDoS included) in `US-EAST-VA` (Vint Hill, Virginia), running Debian 13. Production and staging run as separate Docker Compose projects with separate PostgreSQL containers, roles, secrets, buckets and tunnels.
2. **Edge:** the Cloudflare Free plan provides DNS, proxy, TLS and WebSockets. Cloudflare Tunnel (`cloudflared`) is the only public ingress, so there are no public HTTP ports and the origin IP is not published in DNS.
3. **Frontend:** Cloudflare Workers static assets replace Cloudflare Pages.
4. **Objects and backups:** Cloudflare R2 holds public immutable assets and private backups/exports. pgBackRest 2.59.3 archives WAL to R2 (repo1, point-in-time recovery) and keeps a weekly full backup in Backblaze B2 (repo2, independent of OVHcloud and Cloudflare). The OVHcloud Automated Backup Standard add-on provides a whole-host daily copy.
5. **Services:** Resend Free sends email, with Amazon SES held as overflow above 100 emails/day. Sentry Developer covers errors and UptimeRobot Free covers external probes. Logs stay local and rotated. GitHub Actions builds artifacts at no cost while the repository stays public. Deploys are pull-based: the host fetches a CI artifact whose release manifest has been verified, so nothing pushes inbound to the server.
6. **Billing term:** month-to-month at purchase; 12-month prepay only once a launch date is fixed.

## Comparative evidence

Quotes were retrieved 2026-10-08…10 UTC; the worksheet lists every source and timestamp.

| Option | Price for comparable capacity | Outcome |
|---|---|---|
| Render (blueprint baseline) | api 1c-2g $25 + match $25 + worker $7 + Postgres 1c-4g $55 + storage ≈ $118/month for about 2.5 CPU | Rejected: about 5× the cap, and cost rises in step with RAM |
| Railway | $20 per vCPU-month, $10 per GB-month of RAM; 12 GB ≈ $120 of RAM alone | Rejected: above cap at the needed RAM |
| Fly.io | No free tier; performance-2x 4 GB is $66/month | Rejected: above cap |
| Hetzner | Cloud CPX/CCX unavailable; CPX52 €36.49 → €100.49 after 2026-06-15; dedicated servers only in DE/FI, AX42-1 €97.30 | Rejected: stock, price and region |
| netcup RS 1000 | 4 dedicated cores, 8 GB, €21.73/month on a 12-month term, Manassas | Rejected: less RAM, EUR billing near the cap |
| Oracle Always Free | 2 Arm OCPU, 12 GB | Rejected: idle instances can be reclaimed; capacity errors |
| **OVHcloud US VPS-3** | **$14.50 month-to-month / $12.32 with 12-month prepay; installation $0** | **Selected** |

Measured engine cost was about 25–34 ms of CPU per accepted action, and 330–460 MB of resident memory per engine process holding the full catalog (exploratory, in a cloud container; see the worksheet). On that basis RAM, not CPU, sizes the host. Player-vs-player play costs about 2–3 CPU-seconds per game. The most popular comparable simulator, duels.ink, ran its whole live service for a long period on a 12-vCPU, 24 GB shared-vCPU host (operator report relayed by the Director, 2026-10-09). That supports a shared-vCPU host at launch scale.

Region: Los Angeles↔New York is about 58 ms and New York↔Frankfurt about 74 ms round trip, so US-East bounds the worst case for a mixed North America/Europe audience. D03 audience data can switch this to `US-WEST-OR` before purchase.

## Consequences

- **Failure model:** a host failure is an outage until restore. The target is RPO ≤ 60 s (WAL `archive_timeout` 60 s) and RTO ≤ 4 h. Restore means a new host, Compose up, then pgBackRest restore. The blueprint's zero-acknowledged-loss option (a synchronous standby on a second host) exceeds the cap and stays a public-release durability gate (D02).
- **Reconnects:** Cloudflare restarts, `cloudflared` restarts and player network drops terminate WebSockets. The blueprint's durable commit-before-acknowledge, reconnect and resync contract (R02.031, R30.010) remains mandatory. Tunnel's four connections across at least two data centers reduce, but do not remove, origin-path drops.
- **Concentration:** Cloudflare hosts DNS, ingress, frontend, assets and the primary backup repository. The B2 repository and the OVHcloud host copy provide vendor-independent recovery.
- **Staging isolation:** staging shares the host, so it gets explicit CPU/memory limits and must be stopped during production peaks. Load tests run against staging off-peak, or on a temporary VPS-1 ($5.35/month).
- **Upgrade path:** VPS-4 (8 vCores/24 GB, $27.50 month-to-month or $23.37 prepaid), then dedicated hardware when funded. Every move reuses the restore procedure.
- **No provisioning in this ADR:** this records decisions only. Accounts, purchases, DNS changes, deployment configuration and restore drills require Director authorization and their own evidence (remaining BOOT-04 configuration, OPS-01).

## Re-open triggers

Supersede this ADR only with comparative evidence if any of these occur:
- Sustained memory above 75%, command validation/commit p95 above 150 ms, disk above 70%, or CPU steal above 10%.
- Provider-attributable availability below the 99.9% monthly target.
- Any price change that pushes the total above the Director cap.
- D03 audience evidence favouring another region.
- Cloudflare free-plan, Tunnel or R2 term changes.
- A Director requirement for zero acknowledged loss.
