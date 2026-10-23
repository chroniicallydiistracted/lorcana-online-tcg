# Design review records

Director decision D30 gates every reference screen on two checks. A screen that fails either one is declined.

- **Impeccable detector** (`pnpm --filter @lorcana/design-system design-review`):
  - **Engine:** the pinned Impeccable engine scans every story under "Reference screens" at 1440 × 900 (Ink and Paper), 820 × 1180 (Ink) and 390 × 844 (Paper).
  - **Pass condition:** zero findings.
  - **Exceptions:** `exceptions.json` may waive a rule for a story pattern only with a Director decision number and a reason. The agent cannot approve its own exceptions.
- **Independent reviews** (`pnpm --filter @lorcana/design-system check:design-reviews`):
  - **Records:** `reviews/<screen>.json` holds the verdicts of two isolated reviewers, a design assessment and an evidence assessment. Each record includes the reviewer's full report.
  - **Validity:** a record counts only at the design-source fingerprint it reviewed. Any change to the design system's source, stories, tokens, Storybook configuration or the presentation package's source makes every record stale, and the screens are declined until they are reviewed again.

The procedure for running the reviewers and writing records is in the [design-system runbook](../../../docs/runbooks/design-system.md#design-review-gate).
