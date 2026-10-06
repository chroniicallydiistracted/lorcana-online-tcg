# ADR 0003: Versioned documentation, change history and execution evidence

Date: 2026-10-06, America/Phoenix. Status: accepted within the Director's documentation scope assignment. Affected scope/tasks: X06/DOC-01 and X07/DOC-02. This is a development prerequisite, not acceptance of a game requirement.

## Context

The Director requires every relevant document to reflect current code/action status and every implementation, feature, function, test/result and revision to follow a timestamped universal format. BOOT-01 audit found stale root-dependency and test-method descriptions, old live-process assertions and a clean-proof Git tree not reachable from normal history. Earlier test times cannot be reconstructed exactly. Agent-specific memory cannot serve as project authority.

## Decision

Keep agent-neutral workflow/format/templates under docs and reference them from AGENTS/README. Use schema-version1 JSON change/run/feature/documentation-map records, deterministic Markdown changelog, generated project-owned source/document hashes and AST callable inventory. Review affected current docs explicitly before snapshot refresh. Preserve planning intent and archive provenance with labels; use append-only corrections for sealed history. Include current handoff and exact evidence categories.

Use exact Ajv8.20.0 as a root development dependency for schema validation, already present transitively through Fastify. TypeScript's existing compiler API inventories JS/TS; Python's standard AST inventories Python. No product runtime dependency, new dependency build script or manual tooling install is introduced. Existing configuration/syntax checks remain and now include documentation validation. The evidence recorder writes exact execution timestamps, reachable intake commit plus source fingerprint, exit/signal and sanitized log digest, and detects source changes during execution. Human device observations use an explicit reported-verdict convention with null process exits; they do not fabricate command success.

## Alternatives and comparative evidence

- A manually maintained Markdown changelog is readable but lacks enforceable keys, timestamp validation, file coverage and log/source identity. Structured authoritative records retain readability through a generated view.
- Agent memory or editor-specific rules require different handoffs and cannot be audited from a clean checkout. Repository-owned instructions/templates use the same contracts for every developer.
- Hash-only snapshots detect edits but do not ensure documentation review or prove semantics. Source-impact edges and explicit review reasons support semantic review; checks cannot guarantee truth of prose.
- Transient logs and dangling Git trees disappear from clean clones. Durable sanitized logs and a reachable-source equivalence manifest retain earlier evidence without inventing test execution times.

Negative tests exercise unrecorded source/doc edits, missing classifications, stale snapshots, unsupported passing claims, replayed sealed entries, failed command capture, inherited-secret redaction, source drift during execution and children ignoring termination. Full audit/run records provide actual results rather than anticipated success.

## Consequences

Updates require documentation review and a draft change record at checkpoints; finalized evidence/history is append-only. Generated/history/evidence files are checked without self-referential hashes. Whole executable-source verification becomes stale after executable/config/test/schema edits. Prose-only edits require their own consistency and semantic review. Private credentials, dependencies, build/cache output and Git internals stay excluded. CI enforcement, signed attestations and broader security/device/product qualification remain future tasks. Windows foundation observation is pending.

## Clock evidence qualification update

A real final static run produced reversed UTC samples despite exit0. The raw record/log was retained in archive and imported with an explicit reported/quarantined status. The recorder now compares monotonic duration with wall samples and refuses passing timing proof on discontinuity. This supplements UTC attribution without inventing order or editing historical timestamps. New clock policy/regressions and fresh matching-source validation are part of the same authorized evidence foundation.

Finalization includes actual listener cleanup, not test exit alone. A canonical checkout suite exited0 yet left an owned Vite descendant; RUN-033 exposed it, and separate CHG-005 records the supervisor correction, failed regression and fresh acceptance. Earlier results remain source-qualified checkpoints rather than silently relabeled passes.
