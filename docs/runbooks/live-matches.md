# Live synthetic match operation

Read [contract](../contracts/live.md), [ADR0015](../adr/0015-live-synthetic-transport.md) and [qualification](../validation/play-03.md). Use the existing committed Dev Container, frozen toolchain and one heavy check at a time. Preserve private configuration and original database data. No clock/settings/service repair or deployment is part of PLAY-03.

## Ownership and activation

`createMatchGateway({service,store,sessions,origins,hints?,limits?})` in apps/match-service is an optional factory. It owns its Fastify server, passed service/store, hint listener, sockets, timers and in-flight work until close. `drain` refuses new tickets/connections, signals maintenance and stops polling; `close` and direct `app.close()` drain then reap owned work and pools. A socket close is never a match result. Construct fresh dedicated service/store per gateway; do not share close-owned instances with another factory. Factory setup errors remain the caller's construction responsibility.

Ordinary `main.ts` stays diagnostics-only on3002. Web5173/API3001 and worker without ingress are unchanged. Qualification hosts bind ephemeral loopback ports with injected test sessions only; they are not dev login endpoints. AUTH-01 must supply actual sessions, audience/cookies, production TLS/origins/reverse-proxy trust and admission before registering live routes in real startup. Current proxy trust is disabled; multiple clients behind an unconfigured proxy share an IP budget. Do not enable arbitrary forwarded-address trust.

Append-only migration0004 widens retained match protocol1/2 and adds match-role-only socket ticket/shared quota tables. It was tested before applying to local. Keep0001..0004 immutable after application. Follow [database operation](database.md) for provision/migrate/health, never delete/recreate the Director's original volume. Private checkpoints/backups contain match secrets and need secret storage/access controls. No backup provisioning is claimed.

## Bounds and reconciliation

| Control | Default |
|---|---|
| Sockets / per-IP / per-actor |128 /8 /4 per gateway |
| HTTP connections | twice socket cap |
| IP ingress buckets / requests |1024 buckets /32 ticket-or-upgrade attempts per10s |
| Concurrent ticket work / ticket TTL |16 / at most30s |
| Shared DB ticket quota |12 per actor/minute |
| Shared command quotas |12 per actor/sec,8 per actor-match/sec,12 per match/sec |
| Explicit sync quota |4 per actor-match/sec |
| Auth verification / first auth frame |1s /5s |
| Pending frames / outbound bytes |2 /512KiB |
| Heartbeat / missing pong |15s /45s |
| Durable reconciliation |500ms, metadata hints accelerate it |
| Projection cache |64 entries,8MiB,32 pending fills,30s monotonic TTL |
| Browser retries / base backoff / ACK deadline |8 /250ms /5s |

Connection caps are process-local; authenticated quotas are shared in PostgreSQL. No Redis/sticky affinity is required. Fixed-window quota rows store only hashed scope keys/count/expiry; expired ticket cleanup is bounded per issue. Quota-row lifetime pruning/operational retention and global connection admission need production sizing; current code reuses expired quota buckets but does not prune abandoned keys. These infrastructure bounds do not certify50-player production capacity. Real-card full-length restore cost and the4096-engine-event projection limit remain measurement gates; current cache reduces repeated identical-view work, not per-move replay cost.

Each process uses a transport pool max2 plus the match repository/engine bounds and one optional LISTEN connection. Notifications carry only bounded match IDs after COMMIT, never hidden state. Missed notifications cannot be authority: polling compares participant-visible durable version/release then builds a fresh authorized view. Cached payloads are serialized defensive copies, keyed to exact committed private bytes and participant. Seed/checkpoint/digest never enters receipts, logs, snapshots or hints. Corrupt pins/archives fail closed.

## Verification and cleanup

`pnpm test:match-integration` includes storage contracts, prior durable match/projection tests, real ticket/quota/listener/gateway cases and separate-process actual client games. `pnpm test:e2e:smoke` includes native-cookie Chromium live clients plus all prior foundation browser cases. Root `pnpm test` covers cache/reference/client simulations, contracts, boundaries, engine and wire privacy without requiring a database; root build orders the new browser package and artifact closure. Existing14-stage CI runs live database and browser stages without an extra concurrent job. Use native evidence recording; retain failed and source-changed receipts.

Tests delete only generated fixture matches and exact owned quota keys. Fixtures close clients, sockets, pools and children in finally; child hosts also close when the controlling IPC channel disappears. Forced termination tests target only their known child PID. No permanent product listener is left behind. On interruption inspect current native run and owned processes before starting another heavy check. Do not kill VS Code, the shared database, unrelated Node processes or listeners based only on a familiar port.

Audit cautions (2026-10-15 UTC, CHG-20261015-002):
- Each reconciliation tick (500 ms default) calls `SessionAuthority.verify` for every connection, plus once per match group for observation: about three calls per second per socket. AUTH-01 must keep verification cheap or cache it within the accepted revocation delay; size this before raising socket caps.
- PostgreSQL lets any role LISTEN on any channel; the api role can subscribe to `lorcana_match_changed`. Keep NOTIFY payloads to bounded match IDs sent after COMMIT.
- Expired quota rows are reused but never pruned. The test database already holds expired rows from development runs. Plan retention with OPS-01 before production.
- A client that stops reading is closed by the heartbeat (1013). A burst beyond two pending frames is closed (1013) rather than queued. Clients should send one command at a time and await its receipt, as `createMatchClient` does.
