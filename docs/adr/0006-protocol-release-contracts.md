# ADR0006: Closed foundation protocol and immutable release contracts

Recorded date: 2026-10-07 UTC / 2026-10-06 America/Phoenix. Status: accepted for local BOOT-05 contracts. Affected tasks BOOT-05, DOC-01/02; prerequisite evidence for R30.015, with no complete product requirement accepted.

## Decision and comparative evidence

Keep public TypeBox protocol/release metadata in contracts and immutable retained selection in server-only service-runtime. Use closed discriminated shapes and16KiB UTF8 frames, safe bounded counters/IDs and at most two adjacent protocol revisions. Choose the highest overlap; explicit incompatibility/correlation failures protect future reconnects. An arbitrary JSON/engine DTO or unlimited version range would admit private state and unsupported inputs; retained negative fixtures reproduce rejection instead.

The existing API and match diagnostics expose read-only HTTP negotiation, consumed by the current semantic foundation page. This proves actual request/schema/version behavior without falsely implementing PLAY-03's authenticated sockets or game authority. Strict Fastify validation rejects unknown fields and coercion; generic errors withhold input data. Revision1 command/snapshot/receipt schemas are recovery/control and synthetic counts-only contracts, not certified card actions/projections.

Public release metadata binds four apps and protocol/engine/content/rules/database-schema/product/reward revisions. Reserved components are explicit; game-purpose manifests reject them. Synthetic complete fixtures qualify schema/retention only. Actual deployment/runtime admission must also qualify content, engine, rights and durable state; a digest cannot supply those policies.

Server registries validate and defensively freeze1–64 manifests. Missing pins fail without fallback; next-registry checks preserve canonical complete content for supplied durable running-match IDs. Retaining the previous code/config only in process memory is not production recovery; future activation must persist/lock pins and retain actual private bundles. Hash/metadata pinning is scoped proof, with concurrency and migration qualification remaining their own work.

Include actual SQL migrations in CI artifacts: BOOT-02's migrator reads separate files, so hashing transpiled JavaScript alone omits schema identity. Build app/SQL digests and a public foundation manifest from already-copied output. Verify against archived bytes independently of outer file hashes. Never accept a caller's fabricated release report or invent ready engine/catalog versions. Source, hashes and creation time define separate immutable build IDs; signatures/release promotion remain pending.

## Format and policy consequences

Artifact manifest moves from schema_version1 to2 because release metadata and SQL scope become required. Old sealed BOOT-03 run/log/artifact history is unchanged; v1 inspection uses that original Git verifier. Public release schemaVersion1, protocol revision1 and documentation/run schema_version1 are independent namespaces; no governance record migration is performed.

Any incompatible wire/semantic/secrecy change requires a new protocol revision plus qualified decoder/handler fixtures. Rollback requires proof against current schema/data/manifests and cannot discard committed player activity. [Protocol](../contracts/protocol.md), [release operation](../contracts/release.md) and [validation](../validation/boot-05.md) record the exact fields, limits and results. Dependency pins/build allowances and original private environment/data stay unchanged. Real Windows/hardware, hosted execution, authenticated sockets, real game projection/replay/migrations and production remain separate gates.

## Independent review corrections

Four reproduced findings were corrected with retained red/green receipts: application conflicts use HTTP409; configured services advertise only implemented revision1; public DTOs reject inherited/accessor data and registry copies are revalidated; release components bind owning package/export metadata and complete runtime workspace closure, including the database migrator and SQL tree. HTTP409 represents application-version conflict while the transport remains HTTP; no transport upgrade is performed. These decisions refine the original scope rather than accepting gameplay or deployment.
