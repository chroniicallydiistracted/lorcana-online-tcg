# Synthetic live match contract — protocols 2 and 3

PLAY-03 implements `packages/contracts/src/live.ts`, optional server gateway and browser-owned match-client under [ADR0015](../adr/0015-live-synthetic-transport.md). [Qualification](../validation/play-03.md) distinguishes actual PostgreSQL/process/browser checks from simulated client checks. AUTH-01 remains separate by Director decision; test-only sessions are not an account system. Normal application startup registers no live routes.

## Identity and admission

An injected `SessionAuthority.authenticate(headers,signal)` maps trusted HTTP session material to `{actorId,sessionId,expiresAt}`; `verify(sessionId,signal)` revalidates it. The server accepts no client-selected actor or role. IDs use the existing 1–80-character ASCII contract; expiry is bounded integer UTC milliseconds. Each verification has a one-second deadline. AUTH-01 must implement cancellation and actual session/cookie/recovery policies.

POST `/play/ticket` accepts exactly `{requestId,matchId,clientReleaseId,supportedProtocol}`. Exact configured Origin, verified participant and retained match release and its exact protocol2/3 are required. Credentialed CORS permits only that Origin and Content-Type; responses are private/no-store. The ticket response binds request/match/player/release, the saved protocol2/3, ticket expiry and session expiry. HTTP statuses distinguish malformed400/oversize413, session401, forbidden403 (outsider and missing match identical), unsupported409, rate429 and unavailable503. These are bounded generic errors; no engine errors, seed or checkpoint enter them.

A random 32-byte base64url ticket lives at most30 seconds or the session expiry, whichever comes first. PostgreSQL stores its SHA256 digest plus bounded session/actor/match/origin/release/protocol metadata. Atomic consume succeeds once, on any instance. The first text frame on `/play` must be `{type:authenticate,protocolVersion:<saved2or3>,requestId,ticket}`; tickets never appear in URLs. Query parameters, unapproved Origins, binary frames, replayed/expired tickets and identity mismatches fail closed before private state. A browser's ordinary cookie is used only by the HTTP session verifier. The ticket is not a reusable login token.

## Closed frames and versions

Diagnostic protocol1 and its handlers remain unchanged. Live handlers support2..3; the built release covers the three distinct implemented decoders1..3. The shared range remains bounded to3adjacent revisions. New untimed synthetic matches pin2 and explicit clock-enabled matches pin3. Ticket negotiation selects the saved version only, refusing a2-only client for a timed3 match. Each authentication/command must equal the consumed ticket version. Retained protocol1 rows remain internally readable with their exact available engine/release; they never become live2 by coercion. Unknown executable pins fail closed. Real retained-engine loading and production activation remain separate.

A command is `{type:command,protocolVersion:2,matchId,commandId,correlationId,expectedStateVersion,intent}`. A sync request is `{type:sync,protocolVersion:2,matchId,correlationId}`. Intents are closed variants:

| kind | input |
|---|---|
| chooseWhoGoesFirst | playerId |
| alterHand | cardsToMulligan: refs, at most60 |
| putCardIntoInkwell / quest | cardId: ref |
| playCard | cardId: ref; optional standard cost, inkDrops and at most32 effectInkDropCounters |
| questWithAll / passTurn / concede | empty object |
| challenge | attackerId and defenderId: refs |
| moveCharacterToLocation | characterId and locationId: refs; optional inkDrops/effectInkDropCounters |
| activateAbility | cardId: ref, abilityIndex; optional inkDrops |

Each ref matches `vr_` plus64 lowercase hex characters. Numeric payment/index bounds are0–1000. Ref syntax grants no authority: the worker restores the exact committed checkpoint and resolves only current participant refs before applying an allowed player move. Raw engine IDs and all manual/debug moves fail. General bag/effect/private choices and official cards are not admitted by this synthetic allowlist.

Server envelopes bind protocol2, matchId, per-socket sequence, durable stateVersion, correlationId and pinned releaseId. A ready frame adds playerId. A snapshot adds `projectionType:viewer` and the closed PLAY-02 participant payload; outer match/version must equal the payload. Every publication checks the current session before and after projection. A revocation during an already admitted command can withhold publication; it does not roll back that validly admitted durable transaction. AUTH-01 must preserve this admission distinction and define any stronger revocation-at-commit policy explicitly.

Receipt frames add commandId and duplicate. Accepted, rejected (`invalid_intent|forbidden`) and stale (`stale_state`) are durable terminal outcomes. Rate-limited (`rate_limit`,retryAfterMs), maintenance (retryAfterMs), auth-expired and unsupported-version (supportedProtocol/action) are distinct transient or access outcomes. No private intent hash, raw engine diagnostics or RNG data is present. All objects reject additional fields. Client frames are at most16KiB UTF8; server frames are at most266240 bytes and retain the viewer's262144-byte inner bound. Counters/range/depth/node limits remain those of the shared contracts. Oversize fails closed.

## Clocked protocol3 extension

Separate live3 codecs retain the exact closed live2 shapes with literal3. Only a3 snapshot requires an additional closed clock projection: schemaVersion1, policyId, engine stateVersion, separate clockRevision, phase, server UTC/deadline, active participant, bounded remaining allowances and generic pause reason. Match/version/player membership must agree with the unchanged viewer DTO1. Live2 refuses clock fields and clock_expired; live3 adds only that durable rejection reason. Neither carries checkpoint, seed, reservation capability, audit authority, private engine clock state or timeout command.

The gateway observes engine and clock revisions independently, revalidates sessions around publication and publishes a committed clock-only pause without changing card refs. Heartbeats update durable health without replaying/broadcasting every display tick; snapshots use exact-checkpoint caches. Participant readClock is internal, with no new unauthenticated/recovery route. The server runner continues across player disconnects; uncertain infrastructure pauses for an audited decision. See [game clock operation](../runbooks/game-clocks.md).

## Commit, retry and recovery

The service's `submitRefs` binds the **original reference intent**, match, actor and expected version to a separate durable semantic namespace. Identical retry checks its stored receipt before trying now-expired refs. CAS/receipt/journal/outbox commit atomically before accepted acknowledgement. A different payload under the same ID is refused. Rejected/stale choices require reconsideration and a new ID; transient rate/maintenance and lost acknowledgement retain the original command, expected version and refs. Disconnect never concedes.

Full committed snapshots avoid delta-base ambiguity. Metadata-only PostgreSQL NOTIFY is a hint; periodic participant-restricted durable observation covers missing hints and reconnect. Intermediate snapshots may be coalesced. Sequence restarts per socket; clients discard stale views and reconnect for any sequence/pin/identity mismatch. StateVersion never rewinds on reconnect. Server snapshot caching is keyed to exact private bytes/digest, outcome/version/pins/viewer/policy, and still authorizes every read; it never shares one player's payload with another.

## Browser lifecycle

`createMatchClient` provides connect/resume, suspend, close, submit, status/view and exportPending. It renders no optimistic state. It keeps one pending command, copies views/intents, clears its view on interruption, and resends the same pending bytes once per new authenticated connection. Bounded jitter/retry and acknowledgement deadlines prevent endless retry or unrelated snapshots hiding a missing receipt. Session expiry, forbidden and upgrade are explicit terminal statuses. Callbacks cannot change receipt authority. Account switching refuses an old actor's pending intent.

`exportPending()` contains schema1 for live2 or schema2 for live3, actorId and the corresponding closed public command only. A restored pending command offers its original single protocol version; it is never relabeled on reconnect. `restorePending` revalidates it and binds it to the newly verified actor. No automatic persistent browser storage is enabled. AUTH/UI owners must clear account-bound retained data on logout, protect it as private player intent and require deliberate resume. Tickets, cookies, viewer payloads, seeds and private checkpoints never belong in that record. `suspend` preserves pending intent for interruption recovery; `close` finally disposes the instance and rejects its pending work. See [package API](../../packages/match-client/README.md).

Clock/estimate callbacks are defensive copies. The client anchors the latest authorized allowance to performance.now, clamps its display at zero and clears clock/view on suspend/retry/sign-out/close. Displaying zero sends no move and declares no outcome. Clock-only revisions cannot rewind; server snapshots remain authority. Production clock durations are unselected.

Observers/casters/judges, delayed streams, full private replay delivery, official cards, production proxy/TLS/admission, user-facing game UI and real devices remain gated.

## PLAY-04 audit repair — 2026-10-15 UTC

Reservation contention does not introduce a new wire variant: internal BUSY maps to the existing rate_limited/rate_limit receipt with100ms retryAfterMs and no maintenance control or socket close. The existing client preserves its view and original pending bytes/ID and retries on that socket. There is no durable busy receipt. Real UNAVAILABLE remains maintenance; bounded retry and shared quotas remain in force. Live2/3 schemas and clients are unchanged.

## PLAY-04 opening repair — 2026-10-16 UTC

No wire variant, client retry rule or opening-leave permission changes. Waiting concessions use an internal unreserved evaluation; engine-refused opening attempts leave the clock untouched. A concurrent active decision or timeout can win and make the waiting result stale. Accepted terminal concessions retain original ID/duplicate semantics. See the current clock validation for executed proof.
