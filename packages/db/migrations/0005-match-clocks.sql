-- PLAY-04 qualification only. Preserve existing matches, receipts and SQL history.
ALTER TABLE match.matches DROP CONSTRAINT matches_protocol_version_check;
ALTER TABLE match.matches ADD CONSTRAINT matches_protocol_version_check CHECK (protocol_version IN (1,2,3));
ALTER TABLE match.socket_tickets DROP CONSTRAINT socket_tickets_protocol_version_check;
ALTER TABLE match.socket_tickets ADD CONSTRAINT socket_tickets_protocol_version_check CHECK (protocol_version IN (2,3));
ALTER TABLE match.command_receipts DROP CONSTRAINT command_receipts_outcome_reason;
ALTER TABLE match.command_receipts ADD CONSTRAINT command_receipts_outcome_reason CHECK (
  (outcome='accepted' AND reason IS NULL) OR
  (outcome='rejected' AND reason IS NOT NULL AND reason IN ('forbidden','invalid_intent','clock_expired')) OR
  (outcome='stale' AND reason IS NOT NULL AND reason='stale_state')
);
CREATE TABLE match.clocks (
  match_id varchar(80) PRIMARY KEY REFERENCES match.matches(match_id) ON DELETE CASCADE,
  state jsonb NOT NULL CHECK (jsonb_typeof(state)='object' AND octet_length(state::text)<=16384),
  reservation jsonb CHECK (reservation IS NULL OR (jsonb_typeof(reservation)='object' AND octet_length(reservation::text)<=2048)),
  CHECK ((state->>'status') IN ('running','processing','paused','ended')),
  CHECK ((state->>'revision') ~ '^[0-9]+$'),
  CHECK ((state->>'stateVersion') ~ '^[0-9]+$')
);
CREATE TABLE match.clock_events (
  match_id varchar(80) NOT NULL REFERENCES match.matches(match_id) ON DELETE CASCADE,
  clock_revision bigint NOT NULL CHECK (clock_revision BETWEEN 0 AND 9007199254740991),
  state_version bigint NOT NULL CHECK (state_version BETWEEN 0 AND 9007199254740991),
  operation_id varchar(80) NOT NULL,
  kind varchar(32) NOT NULL CHECK (kind IN ('created','processing','accepted','aborted','timeout','paused','resumed')),
  checkpoint_digest varchar(64) NOT NULL CHECK (checkpoint_digest ~ '^[a-f0-9]{64}$'),
  audit_id varchar(80),
  reason varchar(32),
  authority_at_ms bigint NOT NULL CHECK (authority_at_ms BETWEEN 0 AND 8640000000000000),
  PRIMARY KEY(match_id,clock_revision),
  UNIQUE(match_id,operation_id,kind)
);
CREATE INDEX match_clock_work ON match.clocks ((state->>'status'));
