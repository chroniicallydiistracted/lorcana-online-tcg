# Foundation protocol contract

BOOT-05 implements the public TypeBox contracts in `packages/contracts/src/protocol.ts`. [Acceptance evidence](../validation/boot-05.md) distinguishes executed checks from pending product gates. These are foundation revision1 shapes; PLAY/RULE own real engine actions, authorized viewer projections, durable receipts and authenticated WebSocket transport.

## Fields and bounds

Every object is closed, including nested objects and each discriminated variant. Unknown fields are rejected, never stripped. IDs are1–80 ASCII characters matching `[a-zA-Z0-9][a-zA-Z0-9._-]*`; they are references, not proof of identity/authorization. Protocol revisions are integers1–65535. A range `{min,max}` must be ordered and span at most two adjacent revisions. `FOUNDATION_PROTOCOL` advertises only `{min:1,max:1}`. The HTTP service factory rejects configured ranges other than implemented foundation revision1. Generic revision arithmetic can compare hypothetical future ranges; advertising a new revision requires its actual schemas/handlers and qualification.

Client wire frames are at most16384 UTF8 bytes. `decodeClientFrame(raw)` checks character count before encoding, then byte count, parses JSON and validates the allowlist. Malformed/oversized/invalid frames throw `Invalid client frame` without input text. `readContract` and the typed parsers first require own enumerable data fields with plain/null object prototypes, no accessors/symbols/cycles/repeated object references, depth64 and a traversal guard on prior visited-object count above10000, then use `Value.Check`; no coercion/defaulting or arbitrary engine payload is accepted.

| Shape | Required fields and meaning |
|---|---|
| Hello | `type:hello`, `requestId`, `clientReleaseId`, `supportedProtocol` |
| Accepted hello | `type:hello_result`, matching `requestId`, `serverReleaseId`, `outcome:accepted`, selected `protocolVersion` |
| Incompatible hello | Same identity fields, `outcome:unsupported_version`, server `supportedProtocol`, `action:upgrade_required` |
| Maintenance hello | Same identity fields, `outcome:maintenance`, `retryAfterMs` |
| Command | `type:command`, `protocolVersion:1`, `matchId`, `commandId`, `correlationId`, `expectedStateVersion`, `intent` |
| Intent | Exactly `{kind:request_snapshot}` or `{kind:concede}`; schema existence does not implement or authorize either command |
| Server envelope | `protocolVersion:1`, `matchId`, `sequence`, `stateVersion`, `correlationId`, `releaseId` |
| Synthetic snapshot | Envelope plus `type:snapshot`, `projectionType:viewer`, `payload:{scope:synthetic,viewerId,zones}`;1–64 zones, each `{zoneId,count}` with count0–1000 |
| Receipt | Envelope plus `type:receipt`, `commandId` and one closed outcome variant below |

State/sequence counters are integers0–9007199254740991. Retry delay is an integer1–300000 milliseconds. Receipt outcomes: `accepted` has no reason; `rejected` has `invalid_intent` or `forbidden`; `stale` has `stale_state`; `rate_limited` has `rate_limit` and retry delay; `auth_expired` has the same reason; `maintenance` has the same reason and retry delay; `unsupported_version` has the same reason, server range and `upgrade_required`. Fields from another variant fail. A receipt contract does not prove commit/idempotency; future PLAY-01 must persist before acknowledging acceptance.

Snapshots have counts and opaque/public references only. No private card-instance mapping, candidate list, private RNG or authoritative state is admitted by this shape. These synthetic tests do not establish real-game noninterference: IDs/order/counts still require viewer-policy certification in PLAY-02. No deltas, card actions or effect prompts are defined yet; add sourced schemas under their owning tasks and bump the protocol when incompatible.

## Negotiation and actual diagnostic

`negotiateProtocol(client,server)` validates both ranges and selects the greatest common revision, or returns null. Invalid ranges throw. `parseHelloResponse(value,request)` validates the original request, reply shape/correlation and selection inside the offer; an incompatible reply that nevertheless declares an overlapping range is rejected. It never silently guesses another revision.

Both existing local services expose POST `/protocol/negotiate`, body limit16KiB. Valid overlap returns200 accepted; no overlap returns409 `unsupported_version`/`upgrade_required`; draining returns503 maintenance with retryAfterMs1000. Invalid structure/range/JSON/type returns400; excessive body returns413. Those errors contain only `{code:invalid_request}`. Service startup validates its release ID/range, defensively copies the policy and uses strict Fastify validation (`removeAdditional/coerceTypes/useDefaults:false`). Health/readiness and shutdown remain unchanged. This route has no account, match, database or economic side effects, no authentication and no CORS grant.

Runtime defaults are the explicit development label `local-foundation` and revision1. They are not a promoted CI artifact ID. Local web proxies `/match/protocol/negotiate`; the semantic status reads `Protocol compatible`, `Protocol update required` or `Protocol unavailable`. It binds the response to a fresh request ID, checks status/outcome consistency, times out at5 seconds and aborts/cancels on unmount. It does not reload automatically or replay a command during upgrade. Existing rendering/keyboard controls remain available.

## Compatibility and future admission

Changes to required fields, units, intent/outcome semantics or secrecy rules require a new integer revision and reviewed fixtures. Active admission offers cover at most the current and immediately previous qualified adjacent revision; retained running-match decoders cannot be removed while their pins remain live. Each supported revision must have its own decoder/handlers. Do not advertise unsupported future code or widen a range to make an old client pass. A matching revision never overrides release/format/ownership/queue policy.

PLAY-03 must authenticate before viewer state, bind commands to authenticated participants and pinned releases, enforce UTF8 size/rate/connection bounds and resync on any version gap. Duplicate command IDs bind actor/match/payload hashes and return durable receipts; stale choices require reconsideration. Disconnect is not concession. Heartbeats, bounded backpressure/reconnect, cross-host recovery, delayed spectators and private logs remain pending. Acceptance of this foundation does not accept those features or R30.015 in full.
