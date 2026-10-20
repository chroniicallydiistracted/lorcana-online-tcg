The Inkspire — UX, UI, and Technical Design System

Version: 1.0 review draft
Date: October 13, 2026
Status: Complete specification proposed for Director review; implementation and product acceptance remain pending.

1. Purpose and authority. This standard governs the visual identity, interface behavior, component library, card presentation, scene presentation, accessibility, responsive adaptation, content, and quality assurance of The Inkspire.

It applies to every player-facing surface and to any developer or agent producing UX/UI work.

The standard must preserve three things together:

* The identity envisioned by the original design-system draft.
* Clear, reliable interaction with a complex trading card game.
* Consistent technical boundaries and measurable quality.

The Director’s current instructions take precedence over this document. Approved gameplay rules, format policies, privacy contracts, and server authority govern what the interface may offer or reveal.

Design-system approval does not certify cards, authorize ordinary play, qualify browsers, or complete the pending PLAY, AUTH, ECON, REPLAY, UX, or WEB tasks.

2. Decisions already established. These choices are the foundation of this specification.

Area	Established decision
Product identity	The Inkspire
Interface approach	Shared interface with room-specific emphasis
Brand expression	Precise controls with restrained ink details; larger ink forms and light belong to surroundings, the table, and major moments
Interface typography	Source Sans 3
Neutral foundation	Achromatic Paper and Ink
Card typography	Preserve legacy card fonts and formatting
Collection entry view	Set-oriented binder pages
Alternative Collection views	Searchable grid and compact list immediately available; remember later preferences
Density	Comfortable defaults with persistent compact options
Player identity	Optional profile avatars; no imposed persona
Companions	Table companions deferred
CardFX	Foil and holographic finishes; native inspection plus scene-reactive scene finishes
Separate reusable features	Card Inspector and Interactive Card Viewer
Routine play	Direct, explicit actions, with proportionate review where appropriate
Bulk quest confirmation	“Confirm before questing with all characters” defaults on
End-turn confirmation	“Confirm before ending turn” defaults on
Notifications during play	Essential match/system information immediately; other notifications deferred with a quiet count
Delivery priority	Desktop and tablet first; complete phone journeys remain a staged target
Browser target	Chrome, Edge, Firefox, and Safari desktop; iPad Safari and Android Chrome tablets
Support claims	Require actual qualification

3. Disposition of the original draft audit. The original ZIP provides a strong art-direction foundation. Its abstract ink, paper, light, card fidelity, and restrained presentation remain central.

The audit identified missing implementation contracts and several statements needing qualification.

Draft issue	Resolution in this standard
Visual language without complete technical definitions	Named tokens, component contracts, interaction states, and acceptance gates
Continuous motion as part of identity	Motion receives purpose, lifecycle controls, reduced-motion alternatives, and performance limits
Broad rules about gradients and effects	Separate interface decoration, environmental lighting, and authentic card finishes
“Phone equals desktop”	Desktop/tablet qualification first; complete phone journeys staged and tracked
Fixed gameplay numbers presented as universal	Read values from versioned format and server contracts
All notifications deferred	Essential current-match/system information remains immediate
CardFX and inspection behavior insufficiently separated	Three distinct contracts: finishes, Inspector, Interactive Viewer
Font sizing without scalable reading requirements	Preserve printed proportions and provide independently scalable reading modes
Contrast requirements without explicit roles	Define critical text, supporting text, essential boundaries, and decorative boundaries
Raw styling values without ownership	Central token sources and a bounded exceptions policy
Attractive isolated styling without full screen evidence	Require crowded boards, practical deckbuilders, complete states, and responsive reference captures
Incomplete library and archive references	Replace with versioned component documentation and resolvable references after repository adoption

The ZIP remains historical design evidence. Its rough technical statements must not override the finalized standard.

4. Brand character and visual grammar. The Inkspire should feel like an authored realm of ink, cards, paper, and controlled light.

Its character is calm, precise, atmospheric, and expressive at meaningful moments. The card collection and game provide the richness; the surrounding interface provides order.

Use these recurring visual ideas:

* Large, composed ink forms at the perimeter of a room or scene.
* Paper-like planes and controlled layering.
* Clear card silhouettes and deliberate card handling.
* Restrained light that reveals form.
* Precise typography, alignment, and interaction boundaries.
* A quieter baseline that allows important moments to stand out.

Ink forms must be authored and stable. Their placement cannot regenerate randomly on every visit or compete with controls.

Routine controls remain geometrically stable. Hovering, selecting, or pressing a control must not make its hit area wobble, deform, or move away from the pointer.

Wood, leather, gold ornament, parchment coloring, and other legacy materials require an explicit future art-direction decision. They are not inherited through reuse of binder or viewer logic.

The product name is The Inkspire. Until a finished identity asset is approved, use a restrained Source Sans 3 wordmark. Official Disney Lorcana branding must remain distinct from the application’s own identity.

5. Composition and room-specific emphasis. Every room shares typography, navigation behavior, controls, focus treatment, spacing relationships, feedback, and accessibility.

A room changes composition and emphasis rather than introducing an independent interface theme.

Surface	Primary emphasis	Composition requirement
Home / Play	Enter or resume a meaningful activity	One clear next action, supported by relevant context
Collection	Browse sets and inspect printings	Binder-first presentation with immediately available search and view controls
Decks	Build, revise, validate, and choose a deck	Working area with catalog, deck contents, and useful validation
Match	Understand the position and make decisions	Stable battlefield, hand, prompts, counters, and action controls
Packs	Present a committed opening	Focused reveal sequence with skip, summary, and recovery
Lab	Understand and conduct experiments	Clear experiment context, controls, results, and manipulation labels
Learn / Encyclopedia	Read and investigate	Strong reading hierarchy and clear source/version information
Replay	Follow authorized recorded play	Timeline, playback, perspective, and inspection
Events	Act on participation information	Relevant registration, pairing, deadlines, and results
Profile / Settings	Manage identity and preferences	Straightforward forms and sections
Social surfaces	Communicate and manage relationships	Readable conversation and explicit relationship actions
Administration	Review permissioned operational information	Dense, clear operational layouts with complete audit context

An authenticated game screen must not acquire a generic marketing hero, testimonial strip, pricing layout, or decorative feature grid without a task-specific reason.

Useful lists, tables, panels, and charts are allowed. Their prominence must follow the player’s task and the importance of the information.

6. Interface typography. Source Sans 3 is the interface family.

Use actual font weights:

* 400: body text, ordinary labels, descriptions.
* 600: headings, selected navigation, important controls.
* 700: limited emphasis where 600 does not provide enough distinction.

Avoid synthetic bold and synthetic italics. Additional styles require actual font files or an explicitly documented fallback.

Role	Default size / line height	Weight	Use
Small annotation	12 / 16 px	400	Nonessential supplementary information
Metadata	14 / 20 px	400	Set, printing, date, secondary details
Body / standard control	16 / 24 px	400 or 600	Main interface text
Critical match information	18 / 24 px	600	Important prompts and decision information
Subsection heading	20 / 28 px	600	Grouped content
Section heading	24 / 32 px	600	Major section
Room title	32 / 36 px	600	Page or room heading
Display moment	40 / 44 px	600	Selected introductory or celebratory moments

These values are authored as scalable rem tokens. They describe the default presentation at a 16 px root size, not a fixed text-size ceiling.

Additional rules:

* Essential instructions cannot use the 12 px annotation role.
* Compact density does not reduce body text below its normal readable size.
* Use sentence case for ordinary labels and controls.
* Uppercase is reserved for short category markers and preserved card formatting.
* Use tabular numerals for counters, quantities, timers, and aligned numerical comparisons.
* Avoid excessive tracking in body text.
* Keep reading columns approximately 60–75 characters wide.
* Critical action labels must remain complete.
* Long card names may wrap. Condensed layouts must provide an accessible route to the complete name.

Self-host the approved fonts through the versioned asset pipeline. Load critical interface weights early and defer fonts belonging only to later scenes or inspection.

Fallback metrics must be measured. Do not guess size-adjust values or accept avoidable layout movement during font loading. These requirements follow the loading and layout concerns described in web.dev’s font guidance.

7. Preserved card typography. Card-face typography is a separate system from interface typography.

Preserve the legacy roles verified in CardFacePlate:

Card role	Family	Formatting
Title	The Bystander Collection Sans	400; preserve title proportions and tracking
Version / subtitle	Brandon Text Cond	700
Classification	Brandon Text Cond	900 italic; preserve expanded tracking
Rules body	Brandon Text Cond	400
Ability heading	Brandon Text Cond	500; uppercase
Keyword heading	Brandon Text Cond	500; preserve formatting distinctions
Flavor text	Brandon Text Cond	400 italic
Numbers / stat glyphs	Century Gothic	Preserve font and existing SVG digit assets where used

The legacy relative printed-layout values remain the initial reference:

* Title: 5cqw.
* Version: 2.9cqw.
* Classification: 2.35cqw.
* Rules body: 3.4, 3.05, 2.7, or 2.4cqw for the corresponding content-density treatments.
* Rules line height: approximately 1.28, reducing to 1.22 or 1.2 in the denser printed treatments.
* Ability heading: approximately 0.94em of rules text.
* Flavor line height: approximately 1.34.

These values apply to the corresponding card-face container and geometry. They are not general-purpose UI sizes.

Preserving the printed treatment does not establish readability at thumbnail scale. The Inspector must also provide a reading presentation with:

* Brandon Text Cond rules text at 20 / 28 px by default.
* Scalable text.
* Complete rules and flavor text.
* Appropriate emphasis and semantic structure.
* Current public modifiers and state distinguished from printed wording.

Do not shrink, crop, or silently omit text to make an overflowing card appear finished. Resolve the layout or provide the complete alternate presentation.

Retain the provenance and usage basis of the actual font files. Glyph coverage, localized fallbacks, and complete card-layout qualification remain implementation checks.

8. Achromatic Paper and Ink foundations. Both themes are first-class.

The selected neutral foundation is genuinely achromatic: neutral values have equal red, green, and blue channels.

Semantic role	Paper	Ink
Canvas	#F7F7F7	#141414
Surface	#FFFFFF	#1E1E1E
Raised surface	#EEEEEE	#2B2B2B
Primary text	#1B1B1B	#F5F5F5
Supporting text	#555555	#BBBBBB
Essential border	#777777	#8A8A8A
Strong border	#555555	#BBBBBB
Decorative separator	#C7C7C7	#4F4F4F
Hovered neutral surface	#E9E9E9	#333333
Pressed neutral surface	#DCDCDC	#383838
Selected neutral surface	#E6E6E6	#383838
Primary button background	#1B1B1B	#F5F5F5
Primary button text	#FFFFFF	#141414
Primary button hover	#333333	#E0E0E0
Primary button pressed	#000000	#CFCFCF
Focus outer boundary	#1B1B1B	#F5F5F5
Disabled surface	#EEEEEE	#2B2B2B
Disabled control foreground	#777777	#8A8A8A

Decorative separators cannot be the sole boundary identifying an input or important control.

Disabled styling must accompany an understandable reason where the unavailable action matters. The explanatory text uses an ordinary readable text role.

Do not reduce an entire component’s opacity to communicate disabled state.

The supplied neutral pairs were checked mathematically across normal, hovered, pressed, and selected surfaces. Primary text exceeds 7:1, supporting text exceeds 4.5:1, and essential boundaries exceed 3:1 in those combinations. These checks do not extend automatically to imagery, translucency, or scene lighting.

Theme preference offers System, Paper, and Ink, with System as the initial default. An explicit saved preference takes precedence over system color preference.

A room cannot silently switch the player’s interface theme.

9. Ink identities and feedback colors. Preserve the six legacy ink hues as the starting identity references.

Identity	Reference hue
Amber	#F5B222
Amethyst	#7C4182
Emerald	#558C4F
Ruby	#D60039
Sapphire	#0092C7
Steel	#97A4B0

These values come from the legacy token source.

Each ink identity must have a name and a recognizable symbol or equivalent non-color cue. Multicolor presentations must communicate their constituent inks.

Raw ink hues are suitable for identity swatches, appropriate graphic treatments, and approved environmental details. They are not automatically suitable for text or control boundaries.

Feedback has its own semantic namespace:

Feedback role	Theme	Foreground	Background	Border
Success	Paper	#205D37	#EDF5EF	#38794B
Success	Ink	#A4DDB4	#1D3023	#6FA981
Warning	Paper	#694B00	#FFF4D6	#8A6500
Warning	Ink	#F3D68A	#342B17	#B79443
Error / danger	Paper	#8A2433	#FBEFF1	#A44857
Error / danger	Ink	#F0AAB5	#371E23	#C47B88
Information	Both	Primary text	Raised surface	Essential border

The proposed success, warning, and danger foreground/background pairs exceed 7:1 in the calculations performed for this draft.

Every feedback presentation includes understandable text and an appropriate icon or structural cue. An Emerald card must not appear successful merely because it is green, and a Ruby card must not appear invalid merely because it is red.

Use semantic colors sparingly. The application does not receive a universal bright accent color.

10. Token architecture and theme resolution. The canonical token system has three layers.

Layer	Responsibility	Example
Primitive	Approved raw values	Neutral colors, spacing values, font families
Semantic	Meaning and context	Surface, supporting text, focus, danger
Component	Component-specific contract	Button padding, dialog width, inspector spacing

Components consume semantic or component tokens. Ordinary component styling must not reach directly into arbitrary primitive palettes.

The build produces:

* CSS custom properties.
* Typed JavaScript/TypeScript token exports.
* Typed renderer values.
* Documentation and token manifests.
* Deterministic theme outputs.

Use a documented subset of the DTCG 2025.10 format, including explicit types, descriptions, and validated aliases. The format is a Community Group specification rather than a W3C Standard. DTCG format status.

The planned Style Dictionary version must be qualified against that subset. Its documentation currently states that full 2025.10 support is incomplete; the project must not assume complete resolver or format support. Style Dictionary compatibility.

Required token checks:

* Missing references.
* Circular references.
* Type mismatches.
* Unsupported constructs.
* Missing theme mappings.
* Invalid dimensions or units.
* Missing descriptions for public semantic tokens.
* Changed generated output.
* Contrast-pair regressions.

Theme, contrast, density, motion, and rendering quality are separate dimensions. Choosing compact density cannot implicitly enable reduced contrast or higher graphics quality.

Breakpoints and container thresholds are emitted as usable stylesheet values. Do not attempt to place ordinary runtime CSS variables directly into unsupported media-query positions.

Renderer mappings must declare color space and units. Convert sRGB tokens into the renderer’s expected representation deliberately and avoid double gamma conversion.

CardFX reference finishes have their own calibrated material parameters. Global UI tokens must not alter those finishes accidentally.

11. Spacing, layout, density, and geometry. Use a shared spacing scale:

Token step	Value
0	0 px
1	4 px
2	8 px
3	12 px
4	16 px
6	24 px
8	32 px
12	48 px
16	64 px

Use 1 px and 2 px for explicitly defined borders and focus treatments, rather than treating them as layout spacing.

Spacing expresses relationships:

* 4–8 px between an icon and its label.
* 8 px between a label and its field.
* 12–16 px within a coherent control group.
* 24 px between related content groups.
* 32–48 px between major page sections.

Layouts respond to available space and content.

Initial layout thresholds are:

* Compact layout: below 40rem.
* Intermediate layout: 40–64rem.
* Wide working layout: 64rem and above.
* Expanded composition opportunities: 80rem and above.

These are starting layout tokens. A component switches composition when its own content and controls require it.

Standard content width is capped at approximately 90rem. Reading content uses a narrower measure. Match presentation may use the available viewport.

Default page gutters are 16 px in compact layouts, 24 px in intermediate layouts, and 32 px in wide layouts.

Comfortable density uses approximately 56 px single-line interactive rows. Compact density uses approximately 44 px rows. Both preserve readable text and usable targets.

Primary controls and icon-button hit areas remain at least 44 × 44 CSS px. An icon or checkbox glyph may be smaller inside that area. Adjacent hit areas must not overlap.

Provide persistent density preferences, with useful per-surface overrides for Collection, Decks, and analytical views.

The match table has its own tested density behavior. A global compact setting cannot shrink critical match information below its readability target.

12. Shape, elevation, icons, and materials. Use a restrained geometry system:

* Controls: 4 px corner radius.
* Ordinary contained surfaces: 8 px.
* Larger dialogs: 8 px.
* Pill shapes: limited to suitable short tags or identity treatments.
* Card silhouettes: derived from approved card renditions and frames.

Do not create a new corner radius for every screen.

Borders and tonal separation establish most interface layering. Shadows are reserved for overlays and objects that genuinely sit above another surface.

Initial overlay shadows:

* Paper popover: 0 8px 24px rgba(0,0,0,0.16).
* Paper dialog: 0 16px 48px rgba(0,0,0,0.24).
* Ink overlays: restrained dark shadow plus a visible appropriate boundary.

Shadows are decorative. They cannot be the only way to distinguish an essential boundary.

Use one coherent interface icon family, with authored replacements for domain-specific symbols where necessary. Standard interface icons use consistent optical size and stroke treatment.

An icon-only control needs an accessible name. Important or unfamiliar actions also need a visible label or an immediately available explanation.

Emoji are not a substitute for the interface icon system.

Paper and ink material details belong to approved scene or illustration assets. Text-bearing surfaces remain sufficiently stable and opaque to preserve contrast.

13. Shared component contract. Every reusable component documents its purpose, anatomy, variants, states, inputs, outputs, accessibility, content limits, and usage constraints.

Component family	Required behavior
Button / IconButton	Clear action; hovered, pressed, focused, disabled, and pending states
Link	Navigation semantics; identifiable destination
TextField / TextArea	Persistent label, description, validation, read-only and disabled treatment
SearchField	Clear query, clear action, result count, no-results recovery
Select / Combobox	Complete keyboard and touch operation; understandable selected value
Checkbox / Radio / Switch	Accurate state and label; sufficiently large label hit area
QuantityField	Exact integer value, explicit bounds, increment/decrement, direct input where useful
Tabs	Distinct selection; correct panel relationship; keyboard behavior matching the chosen pattern
Menu / Popover	Focus management, dismissal, safe placement, complete labels
Tooltip	Supplementary explanation; hover and focus access
Dialog / Sheet	Named purpose, focus containment, appropriate dismissal, focus restoration
List / Table / Grid	Honest empty states, stable identity, appropriate navigation semantics
Badge / Status	Readable meaning; no reliance on color alone
Progress / JobStatus	Distinguish determinate, indeterminate, queued, failed, canceled, and complete
InlineMessage / Banner	Clear reason, consequence, and relevant recovery
Toast / Notification	Priority-aware delivery and nonessential dismissal
ConnectionStatus	Current connection, reconnect, resync, and action availability
CardTile / DeckEntry	Printing identity, state, quantity, inspection, and available actions
InspectorHost	Accessible placement and lifecycle for inspection
Confirmation	Concrete action, context, consequence, and cancellation

React Aria Components provides the unstyled interaction foundation. The Inkspire supplies its visual treatment and usage rules. Use its interaction states consistently across pointer, touch, and keyboard input. React Aria styling and states.

A component must not contain an undocumented room-specific restyle that bypasses its contract.

14. Shared interaction behavior. Prefer native semantics and established interaction patterns.

Required behavior includes:

* Activation occurs through appropriate click, tap, or keyboard action.
* Pointer-down alone does not commit a costly action.
* Hover provides a preview or supplementary information.
* Touch does not require hover.
* Dragging has explicit alternatives.
* Escape cancels local, unsubmitted interaction or dismisses an appropriate overlay.
* Escape cannot imply that a submitted server command has been canceled.
* Browser navigation preserves expected history behavior.
* Focus remains visible and moves predictably.
* Opening a dialog does not leave background controls interactive.
* Closing an overlay restores focus to its originating control or a sensible surviving location.

Keyboard shortcuts are documented and discoverable. They must not activate while the player is typing in a field or editing text.

Single-character shortcuts are off by default or provide the necessary disabling/remapping behavior.

Scrolling cannot be hijacked for decorative effects. Selection and animation must not move the player’s current control unexpectedly.

15. Card presentation contracts. Card presentation has three separate responsibilities.

Responsibility	Meaning
Card Inspector	Structured information and available contextual actions
Interactive Card Viewer	Manipulable card presentation, zoom, orientation, and viewing controls
CardFX	Foil and holographic finish rendering

A Card Inspector may host an Interactive Card Viewer. The Viewer may render a CardFX finish. This composition does not merge their terminology or ownership.

The Inspector exposes, where authorized and relevant:

* Name, version, classification, ink identities, and printing.
* Printed rules and flavor text.
* Public current modifiers and state.
* Set, collector number, rarity, artist, and language.
* Normal and foil ownership quantities.
* Legality and certification information appropriate to the surface.
* Rulings and source/version references.
* Contextual actions such as adding to a deck.

Printed wording, current effects, and explanatory interpretation must remain distinguishable.

The Viewer provides explicit controls for reset, zoom, and any supported orientation or reverse-side viewing. Pointer movement or device tilt must not be the only way to inspect a card.

Closing inspection must preserve the originating card or printing when it still exists.

Card art cannot be recolored by the interface theme. Crop only through documented rendition rules; preserve full-card access.

16. CardFX preservation and scene integration. The legacy native finish renderer becomes the initial fidelity reference.

Preservation includes:

* Finish presets.
* Masks, etching, and layer relationships.
* Texture orientation and wrapping.
* Alpha behavior.
* Color-space behavior.
* Finish response to viewing parameters.
* Rendering at the intended card proportions.

The native Inspector finish and scene-reactive finish share a printing/finish identity but have separate presentation inputs.

Native inspection may use the existing finish mathematics through a qualified host adapter. Scene presentation uses the approved Babylon pipeline and responds to scene lighting and card orientation.

A shader port is not accepted merely because it appears holographic. It must be compared against the pinned native reference.

Required qualification includes:

* Normal, foil, and holographic examples.
* Representative preset families.
* Edge cases for masks and transparency.
* Fixed camera/light reference captures.
* Motion on and reduced/off presentations.
* Missing-texture handling.
* Context loss and restoration.
* Route exit and resource disposal.
* Foreground/background lifecycle.
* Resume after effects are re-enabled.

Time-dependent native effects run only while their qualified Viewer is visible, the application is foregrounded, and the chosen effects/motion settings permit them.

Collection thumbnails do not receive independent continuous GPU loops.

Limit the normal active presentation to the main scene plus one inspected native finish context. Lower-capability devices may serialize or replace that additional presentation with a static finish preview.

Fallbacks preserve finish identification and complete inspection. They must not disguise a foil printing as a normal printing.

Legacy Vue and Three.js hosting structures are not inherited as the new application architecture.

17. Collection and binder standard. Collection opens in set-oriented binder pages for a new player.

Binder, Grid, and List are immediately available view choices. Preserve search, filters, and the selected printing when switching views where possible.

The legacy binder implementation supplies reusable behavior, not the Collection screen structure.

Preserve these concepts:

* Nine pockets in a 3 × 3 page face.
* Two visible page faces where space permits.
* Single-face presentation where necessary.
* Set selection and section navigation.
* Printing-based entries.
* Separate normal, foil, and total quantities.
* Favorites.
* Sorting and filtering.
* Navigation to a particular printing.
* Bounded rendering around the current location.

Enhance the logic as follows:

1. Anchor location to a stable printing or section, rather than only a page number.
2. Preserve that anchor across resizing, density changes, and view changes.
3. Distinguish owned, unowned, unknown, loading, and unavailable ownership.
4. Distinguish a missing printing from unused padding pockets.
5. Keep section/divider identity stable when artwork is unavailable.
6. Support appropriate multicolor or neutral categories when present in the catalog.
7. Use stable, locale-aware ordering and deterministic tie-breaking.
8. Scope page shortcuts to the active binder rather than a global keyboard listener.
9. Remove offscreen and hidden pages from interactive focus.
10. Provide buttons and keyboard alternatives to page swipes.
11. Preserve meaningful reading and focus order across a spread.
12. Offer a reduced-motion page transition.

A two-face spread requires adequate width and height. At comfortable density, an initial preferred pocket width is approximately 144 px, with 12 px internal gaps and 16 px face padding. Use content-based fit rather than the legacy fixed 768 px breakpoint.

Smaller presentations may reduce the preview footprint while retaining usable pocket targets and immediate readable inspection.

Completion statistics use the selected set/printing policy as their denominator. They must not count divider entries or recalculate “completion” from the currently filtered results.

“Foils” must distinguish available foil printings from owned foil quantities. Catalog visibility is not ownership.

Unavailable ownership never becomes zero silently.

18. Deckbuilder standard. The deckbuilder is a working environment.

Wide layouts provide coordinated catalog and deck-content regions, with validation and summary near the actions they affect. Narrow layouts preserve the same journey through a focused single-pane composition.

Required capabilities, when their underlying features are available:

* Search and meaningful filters.
* Explicit quantity controls.
* Add/remove alternatives to dragging.
* Printing preference separated from gameplay identity.
* Accurate deck quantities.
* Format-aware validation.
* Separate legality, ownership, and advisory messages.
* Revision-aware save state.
* Import preview and useful errors.
* Export with an explicit format.
* Undo for appropriate local editing.
* Clear unsaved-change behavior.

Validation must explain the relevant card, quantity, reason, and policy version. An ownership restriction must not be presented as an official rules restriction.

A recommended deck is not automatically an owned deck.

Search and filters must not discard unsaved edits. Navigation to an Inspector must preserve the current working context.

Charts are used only where they improve a deck decision. They must expose useful values without requiring the player to interpret decoration.

No automatic substitution of illegal, unsupported, or missing cards is permitted.

19. Match presentation standard. A match must remain understandable in a crowded position.

The stable match composition includes:

* Opponent and player public identity.
* Active turn and phase or decision context where relevant.
* Lore and resource counters.
* Battlefield objects and relationships.
* Hand presentation.
* Other zones with authorized counts and contents.
* Current action or choice panel.
* Connection and pending-command status.
* Inspection.
* A readable event log.
* Access to preferences and required legal information.

A card’s public state must be understandable through more than physical rotation or color. Provide appropriate markers and an upright readable alternative for exertion, damage, readiness, attachments, movement, and current modifiers.

Counters and thresholds come from the active format/server contract. Do not assume that 20 lore, 60 cards, four copies, two inks, or two participants are universal UI constants.

Hands provide a fan and a readable list alternative. Large hands cannot make individual objects inaccessible.

The battlefield may retain a necessary two-dimensional arrangement. Menus, prompts, inspection, and other surrounding interfaces still reflow. W3C reflow guidance.

A semantic board must expose authorized zones, objects, public states, available actions, and choices to keyboard and screen-reader users.

The semantic board and visual scene share the same viewer projection. They cannot become two independently authoritative representations.

20. Commands, choices, and confirmations. The match interaction model is:

Idle → select/inspect → choose action → choose payment/targets → review when required → submit → pending → accepted/rejected/reconcile → next valid state

The UI must distinguish local preparation from committed gameplay.

Before submission:

* The player can change local selections.
* Canceling restores the appropriate previous interaction.
* Payments, targets, ordering, and choice slots remain explicit.
* The interface presents only information the viewer is authorized to know.

After submission:

* Show pending immediately.
* Prevent accidental duplicate submission.
* Keep the originating intent identifiable.
* Resolve the command through its server receipt and authoritative projection.
* Do not grant resources, move cards authoritatively, or announce success solely because an animation ran.

The two required confirmation settings are independent:

Setting	Default	Behavior
Confirm before questing with all characters	On	Review the proposed bulk action before submission
Confirm before ending turn	On	Review an explicit end-turn action before submission

The bulk quest review identifies the proposed characters and relevant public context. It does not promise an exact final outcome when unresolved effects may change it.

The end-turn review uses explicit actions such as End turn and Keep playing. It may summarize remaining public opportunities without implying that taking them is mandatory.

Turning off bulk quest confirmation does not turn off end-turn confirmation. Neither setting changes individual quest behavior or auto-pass policy.

Routine individual actions remain direct where their meaning is clear.

Costly, ambiguous, destructive, or irreversible actions receive proportionate review. Additional optional confirmations are available where safe.

Mandatory targets, payments, choices, authentication consent, or destructive account reviews cannot be bypassed by an ordinary play-confirmation preference.

Bulk quest execution must follow the eventual server command contract, including partial execution or stopping behavior if applicable. The frontend must not invent atomicity.

Auto-pass is a separate setting and policy. It defaults off for optional player decisions unless a qualified mode explicitly defines otherwise.

21. Honest state and recovery. Every journey must specify its meaningful non-success states.

State	Required presentation
Initial loading	Explain what is loading; reserve expected layout
Partial loading	Keep usable completed sections available
Genuine empty state	Explain absence and a relevant next action
Filtered empty state	Preserve filters and offer adjustment/reset
Signed out	Explain the available catalog or guest experience
Permission denied	Explain the limitation without revealing private data
Unavailable data	Preserve the distinction from empty or zero
Offline	Explain what remains usable
Reconnecting	Show connection progress and affected actions
Resynchronizing	Reconcile state before restoring commands
Pending command	Keep the operation visible and prevent duplication
Rejected command	Explain the authoritative reason and recovery
Unknown commit result	Reconcile the original receipt; do not blindly repeat the operation
Version mismatch	Explain update requirements and preserve recoverable work
Renderer failure	Offer an appropriate flat/semantic presentation
Asset failure	Use a stable placeholder and preserve available text
Save conflict	Preserve the local draft and offer explicit resolution

Loading skeletons represent known structure. They cannot invent statistics or imply progress that has not occurred.

Indeterminate operations do not show fabricated percentages.

A success toast must correspond to a confirmed result.

Pending economic or match operations must survive appropriate reload/reconnect recovery through their owning service contracts.

Account switching clears private presentation, caches, pending UI context, and authorized replay data belonging to the previous account.

22. Notification standard. Notification delivery depends on the current activity.

During play, deliver immediately:

* Required current-match decisions.
* Connection, resync, and version problems affecting play.
* Current match deadlines and terminal results.
* System information that directly affects safe continuation.

Defer other notifications, including unrelated time-sensitive event notices, into a quiet count.

The quiet count:

* Does not animate repeatedly.
* Does not play a sound.
* Does not interrupt focus.
* Is available for deliberate inspection.
* Does not announce every increment through a live region.
* Leads to a notification list after the player chooses to open it.

Expired deferred notices remain accurately labeled.

A tournament notice is not promoted to an immediate match interruption merely because it is time-sensitive.

Outside play, apply the player’s notification preferences and priority rules. Maintain a useful notification history where the product supports it.

23. Pack, reward, and match-result presentation. Pack opening presents an already committed or properly reconciled server outcome.

The sequence is:

Choose operation → proportionate review → submit → resolve receipt → present committed contents → summary → return

The animation cannot determine rarity, ownership, grants, or distribution.

Required controls and states include:

* Reveal.
* Skip presentation.
* Reveal all or bulk summary where supported.
* Reduced-motion presentation.
* Resume after interruption.
* Reopen a committed result where authorized.
* Pending settlement.
* Failed presentation with intact committed contents.
* View a revealed printing in Collection.

No obligatory long animation may delay access to an available result.

Rarity spectacle must be restrained, distinguishable, and safe under the player’s effects preferences. It must not obscure the card or substitute for a readable rarity label.

Match results distinguish:

* Terminal match result.
* Rating processing, where applicable.
* Reward eligibility.
* Pending reward settlement.
* Confirmed grants.
* Corrections or void results.

Reconnecting cannot replay a victory as if the player had earned a second reward.

The app remains free. No paid pack, paid progression, paid cosmetics, paid entry, or access-unlocking purchase pattern is introduced through this design system.

24. Lab, Replay, Learn, social, and account surfaces. These surfaces use the shared system with task-specific behavior.

Surface	Required standard
Lab	Persistent experiment context; clear manipulation/reward eligibility; bounded job status and cancellation
Replay	Authorized perspective, timeline, playback state, speed, inspection, and privacy-aware export
Learn	Readable lessons, progress where real, consistent terminology, accessible examples
Encyclopedia	Printing identity, sourced wording, rulings, legality/version context, useful cross-links
Profile	Optional avatar, neutral fallback identity, explicit public/private information
Friends / challenges	Relationship state, clear invitations, block/report access, current availability
Chat	Readable messages, accessible composer, moderation state, safe rendering of user content
Events	Server-backed registration, pairings, deadlines, timezone clarity, withdrawal/recovery
Authentication	Clear labels, password-manager support, paste support, recovery and expired-link handling
Administration	Permissioned controls, preview/review for changes, audit context, no hidden authority in the UI

No player is required to adopt a fictional role, mascot, character, or companion.

A neutral name/initials treatment is the default avatar fallback.

Table companions remain deferred. Future companion work must preserve battlefield visibility, performance, motion preferences, and optional participation.

Lab manipulation is clearly labeled and cannot visually resemble eligible ordinary play without that context.

Replay perspectives must not expose private hands, completed seeds, or full private records to unauthorized viewers. Current Director D10 restrictions remain authoritative.

Charts and statistics show sample size, period, relevant format or queue, and unavailable-data states. Demonstration data is visibly labeled.

Market, trading, crafting, and other unresolved optional product models are not selected by this standard. Future approved surfaces inherit these foundations and require complete journey contracts before implementation.

25. Accessibility requirements. The acceptance target is WCAG 2.2 AA across supported complete journeys, with additional project requirements for game readability and input comfort. Conformance is claimed only after evaluation. WCAG 2.2.

Project requirements include:

* Critical match text, essential instructions, and primary decision text target 7:1 contrast.
* Supporting text meets at least 4.5:1.
* Essential control boundaries, meaningful state graphics, and focus treatment meet at least 3:1 where applicable.
* Primary interactive targets are at least 44 × 44 CSS px.
* Color, sound, motion, and position each have appropriate alternative cues.
* Browser zoom and user text sizing remain available.
* Printed card imagery has a complete readable alternative.
* Supported gameplay is operable by keyboard and screen reader.

The project’s 44 px target is stricter than WCAG 2.2’s minimum target-size criterion and its exceptions. W3C target-size guidance.

Provide single-pointer alternatives to dragging as well as keyboard alternatives. Keyboard support alone does not satisfy the dragging requirement. W3C dragging guidance.

Use a visible focus boundary approximately 2 px thick with a 3 px offset or an equivalent tested treatment. Focus must remain visible around sticky controls, sheets, and overlays. W3C focus-obscuration guidance.

Tooltips and hover/focus content must be dismissible, hoverable where relevant, and persistent long enough to use. Essential instructions must also be available without a tooltip. W3C hover/focus guidance.

Live announcements must be concise and prioritized:

* Required current choice.
* Meaningful accepted action summary.
* Connection or recovery problem.
* Terminal result.

Do not announce every shader frame, timer tick, hover, or numerical interpolation.

Use polite announcements for ordinary updates. Reserve assertive announcements for genuinely urgent information. Avoid simultaneous competing announcers.

Forced-colors mode uses system colors and visible boundaries. Disabling effects must not remove state information.

Authentication supports password managers, copy/paste, and appropriate alternatives to cognitive tests. W3C authentication guidance.

26. Motion standard. Motion has a defined purpose: show causality, preserve orientation, acknowledge input, or mark a meaningful event.

Motion role	Initial duration	Reduced-motion treatment
Focus / essential selection feedback	Immediate	Immediate
Hover / pressed styling	80–120 ms	Immediate or brief fade
Menu / popover	120–180 ms	Immediate or brief fade
Dialog / sheet	180–240 ms	Brief fade; no spatial travel
Binder page change	Approximately 240 ms	Direct page replacement or brief fade
Ordinary card movement	180–360 ms	Direct state transition with clear markers
Major match event	360–600 ms	Compact state change and explanation
Selected pack/reward moment	Up to approximately 900 ms per authored beat	Direct reveal/summary

Initial productive easing is cubic-bezier(0.2, 0, 0, 1). Exit treatments may use cubic-bezier(0.4, 0, 1, 1). Specific scene choreography may use reviewed curves.

Motion rules:

* Input feedback appears immediately.
* Controls become usable according to state, rather than waiting for decoration.
* Animation speed affects presentation only.
* Server clocks and deadlines never change with animation speed.
* Required choices cannot be skipped.
* Cosmetic sequences can be skipped.
* Reduced motion preserves the same authoritative result.
* No compulsory parallax, screen shake, camera orbit, or full-screen zoom.
* No unsafe flashing.
* Ambient motion pauses when hidden or disabled.
* Routine controls do not use perpetual shimmer or pulsing.

Match choreography covers draw, play, ink, exert, quest, challenge, damage, banish, movement, attachments, counters, and effect resolution.

Semantic state markers remain readable throughout. Decorative transitions cannot reveal information before the viewer is authorized to receive it.

Event presentation has bounded backlog handling. A resync can reconcile directly to the latest authorized state while retaining useful event history.

27. Audio standard. Audio supports recognition and atmosphere.

Use separate mix groups for:

* Gameplay cues.
* Interface cues.
* Ambient sound.
* Music.
* Pack/reward presentation.
* Essential alerts.

Audio starts only after the appropriate player interaction and preference handling. No unexpected ambient playback occurs on first arrival.

Recommended defaults:

* Master audio off until the player enables sound.
* Music and ambience off initially.
* Gameplay cues available as an explicit opt-in.
* Independent remembered volume controls.
* Immediate master mute.

Every essential audio cue has a visible and accessible equivalent.

Suspend or appropriately mute audio when the application is backgrounded. Resuming must not replay a backlog of sounds.

Sound assets need provenance, usage rights, and reviewed loudness/mix behavior. Distinct cue roles must remain understandable in a dense match.

28. Content and localization. Use direct, consistent language.

Controls name the action:

* End turn.
* Quest with all characters.
* Add to deck.
* Remove printing.
* Retry connection.
* Reset filters.

Avoid generic “Continue” or “Confirm” where the consequence would be unclear.

Errors explain:

1. What happened.
2. What it affects.
3. What the player can do.

Do not expose stack traces or private diagnostics in player-facing errors.

Use official rules vocabulary consistently. Keep glossary explanations available for unfamiliar terms.

Externalize interface strings from the beginning. Use plural-aware messages, locale-aware number/date formatting, and logical layout properties.

Test long strings, diacritics, non-Latin text, right-to-left layout where supported, and pseudolocalization. Localized card wording requires sourced content; a locale change cannot change gameplay identity. W3C internationalization guidance.

Prefer complete translated sentences over concatenated fragments.

Dates and deadlines show relevant timezone context. “Tomorrow” must not be the only representation of an important deadline.

User content is data. It cannot inject executable templates, arbitrary HTML, or scripts.

29. Assets, attribution, and fallback. Assets are served through a versioned manifest.

Each imported asset records:

* Source or creator.
* Retrieval date.
* Usage/rights basis.
* Checksum.
* Dimensions and aspect ratio.
* Format and color-space information.
* Language and rendition family.
* Appropriate accessibility description.
* Fallback rendition.

Use responsive card-image renditions and lazy loading. Reserve intrinsic dimensions to prevent layout movement.

Do not fetch the entire high-resolution catalog at application startup.

A failed image preserves the printing’s available name, identity, metadata, and actions.

Official assets follow the Director’s D07 policy, including the required notice, no-charge rule, provenance, and takedown fallback. The notice must use the governing policy’s exact wording, replacing only its permitted subject with The Inkspire.

It remains reachable from every screen and appears in the required start/loading context. Public-launch policy verification remains as recorded in the project fan-content policy.

The neutral-asset fallback preserves layout, inspection, and interface behavior. Missing artwork must not change binder ordering or remove section identities.

30. Rendering, lifecycle, and performance. React owns semantic interface structure and lower-frequency application state. Babylon owns the main scene, materials, and frame-by-frame presentation.

Do not rerender the complete React battlefield every frame.

Presentation consumes authorized data and semantic events. It does not determine gameplay outcomes.

Use an explicitly qualified WebGL path. WebGPU is an optional enhancement after capability and device testing.

Required lifecycle handling:

* Lazy initialization.
* Resize.
* Visibility changes.
* Background/resume.
* Route exit.
* Effects/motion preference changes.
* Context loss.
* Context restoration.
* Account switch.
* Disposal of textures, buffers, listeners, and animation loops.

Resource allocation is bounded. Reuse appropriate meshes and materials, release resources deliberately, and avoid one heavyweight finish renderer per card tile. MDN WebGL guidance.

Use four presentation tiers:

Tier	Presentation
Flat	DOM/image/semantic presentation with complete interaction
Low	Reduced material complexity, limited lighting and static finish alternatives
Standard	Qualified scene-reactive finishes and ordinary authored motion
Enhanced	Additional visual fidelity on qualified hardware

All tiers preserve gameplay information, legal actions, inspection, and recovery.

Initial performance targets inherit the project baseline:

Area	Qualification target
Desktop active table	Sustained 60 fps target; p95 frame time ≤20 ms
Tablet active table	Sustained 30 fps minimum at adaptive quality
Sustained session	Stable 20-minute representative session
Local selection/focus feedback	≤100 ms
Cached heavy search/filter	≤200 ms p95
Initial shell	≤2 MiB compressed
First playable scene	≤8 MiB incremental target
Usable shell	≤3 seconds on the declared 20 Mbps / 100 ms RTT reference
Accepted action feedback	p95 ≤300 ms on the declared reference network
Usable reconnect	p95 ≤5 seconds after connectivity returns and authentication is valid

Measure active animation intervals separately from deliberate on-demand idle rendering.

Field responsiveness additionally targets INP ≤200 ms at the 75th percentile, segmented appropriately. INP does not replace local interaction, network, or frame measurements. INP definition and threshold.

The performance manifest must bound owned texture allocation, decoded images, active finish viewers, scene effects, and caches. Report estimated allocations separately from actual device behavior; no portable browser metric establishes total GPU memory reliably.

A failing device triggers quality adaptation or a qualified fallback. It cannot silently lose required information.

31. Preferences and persistence. Provide a coherent settings model.

Preference	Initial default
Theme	System
Density	Comfortable
Collection view	Binder
Collection sorting	Stable set/collector ordering
Card inspection reading mode	Available immediately; remember later preference
Bulk quest confirmation	On
End-turn confirmation	On
Additional routine confirmations	Off unless enabled
Optional auto-pass	Off
Motion	Follow system preference; allow stronger reduction
Animation speed	1×
Rendering quality	Automatic within qualified tiers
Non-match notifications during play	Deferred
Master audio	Off until enabled
Profile avatar	Optional neutral fallback
Table companion	Unavailable/deferred

Preferences are versioned and scoped appropriately to the account and device.

An account preference must not overwrite an active system accessibility requirement unintentionally.

If preference synchronization is unavailable, explain unsaved changes and use a safe local fallback for non-sensitive settings.

Do not store private hands, seeds, full match state, or private replay contents in an ordinary preferences store.

32. Technical ownership and dependencies. Retain the accepted application architecture.

Owner	Responsibility
packages/design-system	Tokens, interface primitives, typography, shared component behavior, stories
packages/presentation	Babylon scenes, finishes, choreography, audio, renderer lifecycle
apps/web	Routes, room composition, feature coordination, viewer-specific interaction
packages/contracts	Approved public data and transport contracts
Server-owned services	Commands, permissions, durable receipts, authoritative state and ownership
Qualified engine-lab boundary	Authorized trust-free engine use within its established scope

The design-system package must not pull Babylon into ordinary controls. A Viewer host can expose a lazy integration boundary.

The main browser application cannot import database credentials, private RNG, secret-bearing server code, or authoritative state internals.

Only the qualified browser engine-lab and server engine-adapter may import the compiled pure kernel under the current project boundary.

Retain the recorded dependency baseline:

* React / React DOM 19.3.0.
* Vite 8.3.2.
* React Aria Components 1.21.1.
* Babylon 9.29.0.
* CSS Modules and authored tokens.
* Planned Storybook 10.6.1.
* Planned Style Dictionary 5.6.0.
* Planned Motion 14.0.0 for appropriate DOM animation.

Recorded versions remain subject to the actual frozen repository baseline and task ownership. Planning entries are not an instruction to install everything immediately.

Do not introduce a dashboard theme or a parallel styling system to accelerate a screen.

Material architectural changes, including any exceptional native-renderer integration, require a documented ADR after design approval, with affected requirements and comparative evidence.

33. Prevention of low-effort and generic design. “AI slop” is a quality concern, not a reliably measurable authorship category.

Research identifies recurring problems in generated interfaces: weak hierarchy, poor grouping, overused color, inconsistent spacing, generic presentation, and patterns poorly matched to the task. It also shows that detailed context and visual references improve results. NN/g evaluation, prompt specificity findings.

The following are project-specific rejection criteria:

Failure pattern	Enforcement
Generic hero dominating a working screen	Require task-based composition and approved reference
Uniform grid of unrelated summary cards	Require meaningful grouping and priority
Oversized containers with little information	Review information density against purpose
Gradient text or bright generic brand washes	Reject unless an explicit approved role exists
Glass panels over busy artwork	Reject unstable contrast and unnecessary visual layering
Glow around ordinary controls and panels	Reject unapproved decorative emphasis
Rounded pills used for every control	Enforce component geometry
Arbitrary fonts or weights	Enforce typography tokens and actual font files
Raw colors scattered through components	Enforce token ownership
Inconsistent padding, radii, shadows, or icons	Enforce shared component contracts
Every control lifting or scaling on hover	Reject unnecessary movement and unstable targets
Perpetual decorative animation	Require purpose, lifecycle, preferences, and budget
Invented statistics or progress	Require real data or explicit demonstration labeling
Vague promotional copy in the app	Require task-specific content
Fake controls or incomplete journeys	Block acceptance
Success-only design	Require complete applicable states
Desktop layout merely squeezed onto touch	Require responsive journey qualification
Tiny printed text treated as accessible inspection	Require readable card mode
Ornamental assets covering card information	Reject obstruction
A visually polished empty board	Require dense representative fixtures
Legacy page composition copied wholesale	Require scoped reuse evidence and new composition review

These criteria do not ban useful panels, sans-serif fonts, gradients used in authentic finishes, or familiar interaction patterns.

Automation supports enforcement through:

* Token and import-boundary checks.
* Unapproved font/color detection.
* Accessible-name and interaction checks.
* Required story/state coverage.
* Visual regression comparisons.
* Resource and lifecycle checks.
* Fixture and data-label validation.

Human review remains mandatory for composition, hierarchy, card respect, consistency, and identity. No automated “AI detector” substitutes for that review.

Every implementation brief must include the player task, priority order, approved reference, representative content, required states, responsive behavior, and acceptance evidence.

34. Validation and acceptance. A component or screen is accepted through evidence, not appearance alone.

Evidence category	Required checks
Static	Types, tokens, imports, asset identity, forbidden raw styles
Component	Applicable states, focus, keyboard/touch behavior, long content
Visual	Paper/Ink, density, relevant viewport sizes, populated and failure states
Accessibility	Automated checks plus manual complete-journey evaluation
Browser	Actual targeted browser behavior
Device	Real tablet/touch/GPU/lifecycle observations
Performance	Source-bound measurements against declared fixtures
Reliability	Pending, duplicate, stale, rejected, disconnect, and resume behavior
Privacy	Authorized projections across DOM, rendering, logs, caches, and exports
Human design review	Hierarchy, composition, readability, identity, and card fidelity

Accessibility tools cannot establish complete accessibility automatically. Manual evaluation remains necessary. W3C evaluation-tool guidance.

Required reference fixtures include:

* A crowded match with multiple zones, effects, counters, and choices.
* Large and small hands.
* Long card and player names.
* Mixed normal/foil printings.
* Empty, partially owned, and unavailable Collection data.
* Binder resizing and printing navigation.
* A practical deckbuilder with invalidity, ownership limits, and unsaved work.
* Committed pack opening with skip and interruption.
* Pending reward settlement.
* Reconnect with an unresolved command receipt.
* Missing images and GPU context loss.
* Reduced motion, forced colors, zoom, and text enlargement.

The browser target is Chrome, Edge, Firefox, and Safari desktop, plus iPad Safari and Android Chrome tablets.

Qualify security-supported current and previous desktop majors where appropriate, and publish the actual tested versions and device floor. Support must not be inferred from a framework compatibility statement.

Playwright Chromium, Firefox, and WebKit provide automation evidence. WebKit automation is not real Safari or iPad qualification.

Phone journeys retain their own staged status. A responsive home page does not establish phone gameplay support.

35. Governance, documentation, and adoption. Design-system lifecycle states are:

Proposed → Experimental → Stable → Deprecated

A stable component requires complete documentation, applicable state coverage, relevant accessibility/interaction evidence, and approved visual treatment.

Changes to public component behavior, token meaning, or visual contracts require a versioned record and migration guidance where applicable.

This follows the useful principle that reusable design-system contributions need evidence of usability, consistency, and suitability. GOV.UK contribution criteria.

After Director sign-off, repository adoption must:

* Preserve the original ZIP as labeled historical evidence.
* Record this approved standard and its decision basis.
* Map affected requirements and UX/WEB tasks.
* Add source-impact documentation edges.
* Create the required timestamped change record.
* Record substantive architecture decisions through ADRs.
* Keep task status and implementation evidence accurate.
* Follow the repository’s documentation synchronization and validation workflow.
* Preserve other agents’ work and current engine gates.

UX-01 remains pending for the required full screen studies and interaction evidence. The typography specimens are not substitutes for matched table, deckbuilder, and pack references.

UX-02 requires device/browser and responsive journey qualification.

UX-03 requires implemented tokens, primitives, component documentation, and accessible inspection.

WEB-01/02/03 require their own renderer, match interaction, and pack presentation evidence.

The current diagnostic page is not an approved game-interface reference.

36. Review status and remaining evidence. No further product-choice answer is required to create this specification.

Established evidence includes:

* The completed original ZIP review.
* The approved interface and neutral-foundation specimens.
* Verified tracked legacy typography and binder references.
* Actual font rendering in the specimens.
* Mathematical contrast checks for the proposed color combinations.
* Research supporting the accessibility, token, interaction, and quality approach.

Still pending:

* Full screen visual reference approval.
* Implementation.
* Complete card-layout and CardFX integration qualification.
* Manual accessibility journeys.
* Actual supported-browser/device tests.
* Sustained rendering and performance tests.
* Gameplay, ownership, authentication, replay, and recovery integration.
* Public-launch asset-policy qualification already recorded by the project.

Approval of this document establishes the design standard. It does not convert these pending evidence categories into passing results.

The next design deliverable is a matched set of populated reference screens and interaction states using this standard: crowded match, practical deckbuilder, Collection binder, and pack presentation.
