-- PLAY-03 synthetic transport only; preserve all existing protocol1 rows and receipts.
ALTER TABLE match.matches DROP CONSTRAINT matches_protocol_version_check;
ALTER TABLE match.matches ADD CONSTRAINT matches_protocol_version_check CHECK (protocol_version IN (1,2));
CREATE TABLE match.socket_tickets (
  ticket_hash varchar(64) PRIMARY KEY CHECK (ticket_hash ~ '^[a-f0-9]{64}$'),
  match_id varchar(80) NOT NULL REFERENCES match.matches(match_id) ON DELETE CASCADE,
  actor_id varchar(80) NOT NULL CHECK (actor_id ~ '^[a-zA-Z0-9][a-zA-Z0-9._-]*$'),
  session_id varchar(80) NOT NULL CHECK (session_id ~ '^[a-zA-Z0-9][a-zA-Z0-9._-]*$'),
  session_expires_at timestamptz NOT NULL,
  release_id varchar(80) NOT NULL REFERENCES match.releases(release_id),
  protocol_version smallint NOT NULL CHECK (protocol_version=2),
  origin varchar(256) NOT NULL,
  expires_at timestamptz NOT NULL,
  CHECK (expires_at <= session_expires_at)
);
CREATE INDEX socket_ticket_expiry ON match.socket_tickets(expires_at);
CREATE TABLE match.transport_limits (
  key_hash varchar(64) PRIMARY KEY CHECK (key_hash ~ '^[a-f0-9]{64}$'),
  used integer NOT NULL CHECK (used BETWEEN 1 AND 1001),
  expires_at timestamptz NOT NULL
);
CREATE INDEX transport_limit_expiry ON match.transport_limits(expires_at);
