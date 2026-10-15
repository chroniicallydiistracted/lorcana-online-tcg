# ADR0016 — Durable integration of native engine thinking-time clocks

Status: Director-approved design and plan; implemented and locally verified for synthetic scope; Director audit/publication separate. Tasks PLAY-04/DOC-01/02; requirements R02.030/.031, R29.006/.007, R30.010. Policy D12 and the [approved design](../plans/2026-10-15-play-04-design.md) record authority and alternatives. Acceptance is governed by [current validation](../validation/play-04.md).

Reuse the pinned runtime's existing dynamic clock rather than duplicate its arithmetic or change ink/turn rules. Add only the project-owned bridge and server adapter integration, then durable database anchors/reservations, validated server-only legal timeout passes, audited recovery and distinct live3/public estimates. A timeout does not authorize a loss/forfeit, and an impossible legal default or unreliable infrastructure pauses. Ordinary player disconnect grants no time.

The source already contains dynamic/chess/priority clocks and helpers, but the prior bridge used mode none. Existing raw clock tests are evidence for the selected runtime, not evidence for durable multiplayer scheduling. The optional upstream loss/drop paths differ from the selected policy and must remain unavailable. Private clock controls must preserve game history and deterministic replay without adding a player/debug path.

The bridge/adapter, migration0005/fenced clock repository, native worker/service/runner/audited recovery and distinct live3/client estimate source are implemented. Current full-source/database/browser/clean/canonical proofs and review dispositions are recorded in validation. The time sampler serializes queries to prevent reordered responses manufacturing clock reversal. New-row continuity uses an atomic creation outcome; joining existing rows requires independently observed progress rather than self-heartbeating an outage. Clocked startTimestamp0 is refused because native0 means unset; this restriction changes no upstream code and leaves untimed0 supported.

No upstream runtime/rules repair, production duration, host repair, provider/deployment, auth/admission, official/card/reward/device/production acceptance is authorized by this ADR. Preserve every failed receipt. Follow the approved design for deadline fairness, namespace fencing, continuity and complete verification obligations.

## Locking/lifecycle correction evidence

RED062 reproduces a sidecar snapshot taken before waiting for a match lock: clock-only admission need not update the match tuple, so SELECT FOR UPDATE alone cannot refresh its earlier clock subquery. The store retains consistent match→clock lock order and executes a second full read after both locks are held. It does not change global isolation or migrations. GREEN063 verifies the genuinely blocked transaction preserves the admitted revision. The service now signals clock and runner stop together and waits for both, preventing a close from admitting the next sweep row. Targeted passing evidence is not complete source/browser acceptance.

## Independent review correction

Four important findings are reproduced by RED078/079 and pass080/082; the [review disposition](../reviews/2026-10-15-play-04-clocks.md) records each. Process-local time failure is insufficient evidence of a global outage, so it quarantines that actor while another healthy owner can continue. Fenced shared gaps or failed owned work still pause. Admission precedes cold proof replay. Late invalid results cannot resurrect leases. Terminal known/probe cleanup is a bounded generation-safe batch; creation claims capacity before persistence. This adds no SQL migration, provider, auth route or upstream rule. Author's early live3-only/untimed guard is RED081→GREEN082.

## Independent audit note — 2026-10-15 UTC

CHG-20261015-005 (RUN-20261015-094..099 at fingerprint a41c1374) confirms the decision's core claim. The game is byte-identical to the unchanged engine over 24 complete games, and timed and untimed games follow identical rules; timing arithmetic, deadlines, timeout, recovery and outage exclusion are exact. One Important finding needs a fix before acceptance. A waiting opponent's command takes the timed reservation before the active-player check, so the active player's concurrent move becomes `UNAVAILABLE` and their live socket closes while their clock runs. Also recorded: a minor concession refusal and a latent bag-chooser mismatch for real cards. Policy points for the Director: timeout deck-out loss, a timeout restoring more time than a pass, opening timeouts always pausing, and single-process health quarantine. Details are in [validation](../validation/play-04.md#independent-audit--2026-10-15-utc). The decision itself is unchanged.

## PLAY-04 audit repair — 2026-10-15 UTC

CHG007 fixes audit findings1/2 within the approved design: transactionally refuse waiting non-concession commands without a timed lease; retain concessions across the other player's deadline; treat only reservation BUSY as same-socket retry using the existing wire envelope. Native arithmetic, exact active deadline, immutable SQL, host settings and all four unassigned policy points are unchanged. This is a repair, not a new architecture/policy decision; Director re-audit/hosted CI remain required.

## Independent fix re-audit note — 2026-10-15 UTC

CHG-20261015-008 (RUN-20261015-116..123 at fingerprint 0249c5a5) confirms that CHG007 repairs findings 1 and 2 and leaves the engine, bridge, migrations and public schemas unchanged. One Important residual remains. In the opening the engine refuses every concession, yet a waiting player's concession still takes the timed reservation. Repeating it with the stock client makes the active player's opening decision busy, and the stock client stops after 8 busy replies while the opening clock runs. The suggested direction is that a waiting player's command never holds the timed reservation. Details are in [validation](../validation/play-04.md#independent-fix-re-audit--2026-10-15-utc). The decision itself is unchanged.
