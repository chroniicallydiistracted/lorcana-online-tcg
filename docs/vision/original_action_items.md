# Disney Lorcana TCG Online - Action Items

### Comprehensive Implementation Checklist

1. **Core Card & Rules Platform**
   * Complete machine-readable card database.
   * Every printing mapped to its underlying gameplay identity.
   * Card name, cost, inkability, ink color, classifications, strength, willpower, lore, abilities, keywords, flavor text, artist, set, collector number and rarity.
   * Separate card **printing** from card **game object**, so alternate art/reprints don’t create duplicate rules implementations.
   * Full Comprehensive Rules represented programmatically.
   * Rule-version history.
   * Errata system.
   * Card-ruling database.
   * Keyword definitions.
   * Ability parser / scripting framework.
   * Trigger system.
   * replacement effects.
   * continuous/static effects.
   * delayed effects.
   * conditional effects.
   * player choice system.
   * target/selection rules.
   * randomization.
   * zone movement.
   * card visibility rules.
   * timing and resolution engine.
   * legality engine.
   * Core Constructed rotation.
   * Infinity Constructed legality.
   * banned/restricted-card support.
   * future-format support without rewriting the engine.

2. **Actual Match Engine**
   * Two-player game sessions.
   * Opening hand.
   * Mulligan/redraw.
   * Draw phase.
   * Ready/Set/Draw structure.
   * Inkwell.
   * playable-card validation.
   * character play.
   * item play.
   * action play.
   * song mechanics.
   * locations.
   * questing.
   * challenges.
   * damage.
   * banishment.
   * lore accumulation.
   * exert/ready state.
   * Shift and similar alternate-cost systems.
   * triggered ability queue.
   * simultaneous effects.
   * effect ordering.
   * mandatory vs optional effects.
   * player selections.
   * reveal/search/look-at mechanics.
   * shuffling.
   * deck depletion.
   * victory/loss/draw detection.
   * conceding.
   * match timer.
   * reconnect handling.
   * game-state synchronization.
   * deterministic event logging.
   * server-authoritative state so clients cannot cheat.

3. **Deckbuilder**
   * Create, rename, clone and delete decks.
   * Drag-and-drop or tap deck editing.
   * Search.
   * filtering by ink, cost, type, set, rarity, franchise, keyword, classification, artist, legality, ownership, etc.
   * Sort by mana/ink curve.
   * deck statistics.
   * inkable/non-inkable count.
   * character/action/item/location/song counts.
   * color distribution.
   * cost curve.
   * card draw/search statistics.
   * deck validation.
   * format validation.
   * warning vs hard-error distinction.
   * deck notes.
   * deck folders.
   * favorite decks.
   * deck tags.
   * import/export.
   * clipboard decklists.
   * shareable deck URLs/codes.
   * JSON import/export.
   * tournament decklist output.
   * visual card-grid mode.
   * text-list mode.
   * alternate printing/art selection without altering deck legality.
   * automatically substitute owned printings where appropriate.

4. **Sandbox / Lab Mode**
   * Every card unlocked.
   * Build any legal deck regardless of ownership.
   * Optional illegal-deck override for experimentation.
   * Core, Infinity and custom formats.
   * play against another user.
   * play against AI.
   * play both sides manually.
   * hot-seat testing.
   * manually construct board states.
   * start from a specific turn.
   * choose opening hands.
   * choose deck order.
   * disable random shuffle.
   * set lore totals.
   * set damage.
   * pre-populate ink.
   * manually place cards into zones.
   * undo/redo actions.
   * rewind game state.
   * restart from checkpoint.
   * duplicate a game state.
   * probability simulations.
   * opening-hand simulations.
   * mulligan simulations.
   * draw-probability analysis.
   * matchup testing.
   * side-by-side deck comparison.
   * automated thousands-of-games simulations if AI becomes sophisticated enough.
   * rules-debug mode showing the event stack and triggered effects.

This becomes your **study / tournament preparation / deck science environment**.

5. **Player Collection**
   * Quantity owned for every card.
   * foil/nonfoil ownership.
   * individual printing ownership.
   * promos.
   * alternate art.
   * premium rarities.
   * favorites.
   * wishlist.
   * newly acquired indicator.
   * collection completion percentage.
   * set completion.
   * rarity completion.
   * franchise completion.
   * duplicates.
   * missing-card filters.
   * collection value if you eventually support an economy.
   * collection history.
   * acquisition source history.

6. **Virtual Product System**

   * virtual booster packs.
   * booster displays.
   * starter decks.
   * Illumineer’s Troves.
   * gift sets.
   * collector products.
   * promotional packs.
   * event rewards.
   * prerelease products.
   * future products through data configuration.
   * proper rarity distribution.
   * foil/premium slots.
   * duplicate protection if desired.
   * pack-opening animation.
   * reveal-one-at-a-time option.
   * skip animation.
   * open-multiple-packs.
   * pack-opening history.

7. **Progression & Economy**
   * Player XP.
   * account level.
   * daily challenges.
   * weekly challenges.
   * match rewards.
   * first-win rewards.
   * achievement rewards.
   * event rewards.
   * virtual currency.
   * booster rewards.
   * card rewards.
   * cosmetic rewards.
   * duplicate handling.
   * crafting/dusting system if desired.
   * wildcards as an alternative.
   * protection against impossible collection grind.
   * reward-balancing tools.
   * economy telemetry.
   * admin ability to grant/revoke items.


8. **Player Profile**
   * Username/display name.
   * avatar.
   * player title.
   * profile banner.
   * favorite character/franchise.
   * account level.
   * ranked rating.
   * seasonal rank.
   * match record.
   * play history.
   * favorite decks.
   * achievements.
   * collection stats.
   * tournament history.
   * privacy options.
   * blocked users.
   * friends list.

9. **Matchmaking**
   * Casual queue.
   * Ranked queue.
   * Sandbox queue.
   * Collection-mode queue.
   * Core Constructed.
   * Infinity Constructed.
   * custom games.
   * direct challenge.
   * invite friend.
   * private lobby/password.
   * best-of-one.
   * best-of-three.
   * rating-based matching.
   * connection-quality consideration.
   * queue-duration expansion.
   * rematch.
   * format-specific matchmaking ratings if desired.

10. **Ranked System**
    * ranking ladder.
    * divisions/tiers.
    * MMR/Elo-like hidden rating.
    * seasonal resets.
    * placement games if desired.
    * ranked leaderboards.
    * regional/global rankings.
    * seasonal rewards.
    * rank history.
    * top-player profiles.
    * anti-win-trading detection.

11. **Limited Formats**:
    * Sealed.
    * Draft.
    * Pack Rush.
    * custom draft environments.
    * booster selection.
    * pod creation.
    * timed picks.
    * draft bots.
    * draft deckbuilder.
    * limited deck validation.
    * saved draft logs.
    * sealed-pool export.
    * tournaments built from limited pools.

12. **AI Opponents**
    * beginner AI.
    * normal AI.
    * advanced AI.
    * competitive AI eventually.
    * archetype-aware behavior.
    * mulligan logic.
    * ink decision logic.
    * quest/challenge decision logic.
    * threat evaluation.
    * resource planning.
    * combo awareness.
    * difficulty-specific intentional mistakes.
    * AI deck selection.
    * custom AI deck import.
    * AI-vs-AI.
    * automated matchup simulation.

13. **Tutorial & Learning System**
    * rules tutorial.
    * guided first match.
    * ink tutorial.
    * quest tutorial.
    * challenge tutorial.
    * songs.
    * Shift.
    * locations.
    * advanced timing.
    * triggered abilities.
    * replacement effects.
    * deckbuilding.
    * mulligans.
    * strategy lessons.
    * puzzle scenarios.
    * glossary.
    * searchable rules.
    * hover/tap explanations.
    * contextual rules tips.

14. **Rules Assistant**
    * Ask questions during games.
    * explain why an action is/isn’t legal.
    * explain ability resolution.
    * show relevant rule citation.
    * explain card interactions.
    * inspect the current board state.
    * answer “why can’t I do this?”
    * distinguish official rulings from inferred interpretations.
    * contextual glossary.
    * beginner explanation mode.
    * advanced/judge explanation mode.

15. **Match History & Replay System**
    * Match history.
    * opponent.
    * decks.
    * outcome.
    * duration.
    * turn count.
    * lore progression.
    * actions per turn.
    * full deterministic event log.
    * watch replay.
    * pause.
    * rewind.
    * fast-forward.
    * jump to turn.
    * hide/reveal hands appropriately.
    * share replay.
    * download replay.
    * replay annotations.
    * convert replay positions into Sandbox states.

16. **Post-Game Analytics**
    * cards drawn.
    * cards never drawn.
    * cards inked.
    * lore gained by card.
    * damage dealt.
    * challenges won/lost.
    * cards played.
    * resource efficiency.
    * mulligan results.
    * turns ahead/behind.
    * win-condition timeline.
    * draw probability.
    * dead cards.
    * matchup statistics.
    * first-player vs second-player win rate.
    * individual-deck statistics.

17. **Spectator System**
    * Spectate friend.
    * tournament spectator.
    * spectator delay.
    * hidden-information controls.
    * observer slots.
    * caster mode.
    * full-information judge mode.
    * decklists.
    * hand visibility.
    * card zoom.
    * board overview.
    * replay controls.
    * Twitch/stream-friendly overlay support.

18. **Tournament Platform**
    * Create tournament.
    * player registration.
    * deck registration.
    * legality verification.
    * Swiss pairing.
    * round timers.
    * standings.
    * tiebreakers.
    * Top Cut.
    * single elimination.
    * round-robin.
    * best-of-three support.
    * result reporting.
    * judge controls.
    * match restoration.
    * spectator matches.
    * tournament replay archive.
    * tournament decklists.
    * tournament statistics.
    * tournament admin dashboard.

19. **Social Features**
    * Friends.
    * friend requests.
    * direct challenges.
    * presence/status.
    * clubs/guilds optionally.
    * deck sharing.
    * profile viewing.
    * reactions/emotes.
    * controlled chat.
    * block/mute/report.
    * spectator invites.
    * tournament groups.

20. **Card Encyclopedia**
    * Every card.
    * every printing.
    * high-resolution art.
    * rulings.
    * errata.
    * related cards.
    * alternate versions.
    * artist.
    * franchise.
    * set.
    * rarity.
    * legality.
    * release history.
    * search.
    * advanced filters.
    * “cards that reference this card.”
    * keyword cross-links.
    * deck usage statistics.
    * collection ownership.
    * add to deck.
    * test in Sandbox.

21. **Metagame & Competitive Data**
    * Popular decks.
    * archetypes.
    * win rates.
    * matchup matrices.
    * card usage.
    * ink-color usage.
    * tournament results.
    * ladder results.
    * rank-specific statistics.
    * patch/rules-period filtering.
    * set-period filtering.
    * rotation-period filtering.
    * trending cards.
    * deck evolution.
    * user-submitted archetype labels with canonical mappings.

22. **Deck Discovery**
    * Public decklists.
    * trending decks.
    * tournament decks.
    * player decks.
    * archetype browser.
    * budget decks.
    * beginner decks.
    * favorites/bookmarks.
    * copy directly into deckbuilder.
    * show missing cards.
    * craft missing cards.
    * “Play in Sandbox” regardless of ownership.

23. **Achievements**
    * Win first match.
    * reach 20 lore exactly.
    * win with each ink pairing.
    * complete set.
    * play certain franchises.
    * collect legendary cards.
    * rank achievements.
    * tournament achievements.
    * unusual gameplay accomplishments.
    * hidden achievements.
    * profile badges/titles.

24. **Cosmetics**
    * avatars.
    * card backs.
    * playmats.
    * boards.
    * lore counters.
    * avatars/companions.
    * emotes.
    * titles.
    * profile frames.
    * card-play effects.
    * premium card animations.
    * franchise themes.

25. **Accessibility & User Experience**
    * scalable UI.
    * mobile/tablet/desktop layouts.
    * color-blind support.
    * high contrast.
    * screen-reader considerations.
    * keyboard navigation.
    * reduced animation.
    * reduced motion.
    * large-card preview.
    * readable text mode.
    * animation speed.
    * auto-pass preferences.
    * confirmation settings.
    * audio controls.
    * localization.
    * alternate card-text presentation.

26. **Notifications**
    * friend online.
    * challenge.
    * tournament starting.
    * round pairing.
    * new set.
    * new cards.
    * rewards.
    * daily/weekly progress.
    * season ending.
    * collection milestones.
    * deck invalidated by rotation/ban.

27. **Content Management Backend**

    * Add new sets without client-code releases where possible.
    * add cards.
    * edit card metadata.
    * deploy card scripts.
    * modify rulings.
    * add formats.
    * change legality.
    * set rotation dates.
    * add virtual products.
    * configure drop rates.
    * configure rewards.
    * configure events.
    * configure tournaments.
    * localization pipeline.
    * asset management.
    * staging/production environments.

28. **Card Implementation Testing**

    * Unit tests for every card.
    * interaction tests.
    * regression tests.
    * keyword tests.
    * rules tests.
    * infinite-loop detection.
    * invalid-state detection.
    * deterministic replay validation.
    * simulation fuzzing.
    * new-set compatibility suite.
    * automatically run every card against general rules scenarios.
    * card-script versioning.

29. **Game Integrity & Anti-Cheat**
    * Server-authoritative rules.
    * validated actions.
    * secure shuffle.
    * cryptographically strong randomness.
    * hidden-information security.
    * disconnect abuse detection.
    * timer abuse protection.
    * bot detection if necessary.
    * match manipulation detection.
    * ranked win-trading detection.
    * tournament admin logs.
    * audit trails.

30. **Accounts & Infrastructure**
    * Authentication.
    * account recovery.
    * guest account.
    * persistent player data.
    * cloud deck storage.
    * collection storage.
    * cross-device syncing.
    * matchmaking servers.
    * game servers.
    * reconnect.
    * load balancing.
    * database backups.
    * telemetry.
    * crash reporting.
    * version compatibility.
    * maintenance mode.
    * live-service status.

31. **Moderation & Administration**
    * Reports.
    * bans.
    * suspensions.
    * mute.
    * username moderation.
    * chat moderation.
    * match investigation.
    * account logs.
    * tournament-admin permissions.
    * judge permissions.
    * administrator dashboard.
    * economy adjustments.
    * compensation/grant system after outages.

32. **Developer / Debug Tools**
    * Spawn any card.
    * manipulate zones.
    * set lore.
    * set ink.
    * set damage.
    * choose RNG outcomes.
    * force triggers.
    * inspect game-state JSON.
    * inspect event stack.
    * view hidden zones.
    * replay individual actions.
    * simulate turns.
    * load predefined test scenarios.
    * automated card-interaction testing.
33. **Public API / Data Layer** (If we eventually make the project an ecosystem)

    * card API.
    * deck API.
    * tournament API.
    * leaderboard API.
    * match-history API.
    * metadata/version API.
    * rules API.
    * public vs authenticated endpoints.
    * rate limiting.
    * API versioning.
    * webhooks for tournaments/events.
⠀
### **Two Main Separate Game Models**

The eventual client should actually have **three conceptual environments**, although two of them share a lot of functionality:

**Collection Play**
`Own Cards → Build Deck → Play → Earn → Open Products → Improve Collection`

This is the game-like experience. Opening packs, growing a collection and gradually gaining access to decks gives the digital client longevity.

**Lorcana Lab**
`All Cards → Any Deck → Test → Analyze → Modify → Repeat`

No economy. No grind. No artificial restrictions. This is where serious players practice tournament matchups, experiment and learn. They can earn virtual currency that they then use to obtain packs for collection play.

**Developer / Advanced Sandbox**
`Construct State → Manipulate RNG → Run Scenario → Inspect Rules → Replay`

The key architectural decision is that **ownership should never be baked into the rules or deck system**. A deck should simply contain card IDs. Then the environment decides whether ownership matters:

`Deck → Format Validation → Ownership Policy → Queue Eligibility`

So the *same exact deck* might produce:

**Lorcana Lab:** ✅ Playable
**Collection Ranked:** ❌ Missing 2× Diablo – Devoted Herald
**Infinity:** ✅ Legal
**Core:** ❌ Contains rotated cards

That prevents you from having to maintain essentially two separate games.