# Browser match client

Browser-owned TypeScript workspace for closed synthetic protocol2. Depends only on contracts; no engine, database, session-secret or server imports. See [wire contract](../../docs/contracts/live.md), [operation](../../docs/runbooks/live-matches.md) and [evidence](../../docs/validation/play-03.md). This is transport infrastructure, not a game UI or login implementation.

`createMatchClient(options)` requires matchId, clientReleaseId and an endpoint origin or origin callback. HTTPS is supported; HTTP is limited to loopback development. Optional callbacks are onStatus/onView/onReceipt. Test seams fetcher/socketFactory do not bypass wire validation. Optional retryBaseMs/maxAttempts/stableMs/requestTimeoutMs are bounded; defaults250ms/8/30s/5s. Native fetch includes credentials and no-store/no-referrer; native WebSocket sends the ticket in its first frame. No cookie value is read by this package.

- `connect()` / `resume()` resolve on the first validated committed participant snapshot. Replacing a readiness waiter rejects the old waiter; errors use bounded MatchClientError codes.
- `submit(LiveIntent)` allows one pending command from a ready committed view, generates fresh command/correlation IDs and resolves to the durable accepted/rejected/stale receipt. Callers must wait for ready before another action. Transient rate/maintenance or host changes reuse the same pending bytes.
- `view` returns a defensive copy; `status` exposes idle/connecting/ready/resyncing/reconnecting/rate_limited/suspended/auth_expired/forbidden/upgrade_required/closed. onView(null) clears stale rendering during interruption. Application callbacks are isolated from internal receipt authority.
- `suspend()` closes transport and clears the view while retaining actor/pending intent; resume obtains fresh authorization on the current endpoint. `close()` disposes finally and rejects unfinished work.
- `exportPending()` / `restorePending` are explicit actor-bound public-intent hooks. They include no view, cookie, ticket or seed. There is no automatic localStorage persistence. Future UI/AUTH owns private intent storage, logout clearing and deliberate resume; switching actors refuses an old pending command.

Per-socket sequence, pinned release, match, participant, state-version and command correlation are checked. Any gap resynchronizes; old refs are never rewritten to guess a new move. The original pending intent may have been committed before disconnect and must retrieve that receipt before current-ref resolution. Stale/rejected choices need a new user decision and command ID. Network jitter uses ordinary randomness only for delay; no game entropy enters this package.

Unit tests simulate protocol races; integration tests use actual separate gateway processes/PostgreSQL, and Chromium tests use native browser cookie/HTTP/WebSocket behavior. Ordinary startup and public access remain closed until AUTH-01 and remaining card/rule/admission tasks.
