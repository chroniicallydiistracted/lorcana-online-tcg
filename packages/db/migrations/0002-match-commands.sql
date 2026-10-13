-- PLAY-01 synthetic qualification only. Existing per-schema runtime grants remain unchanged.
CREATE TABLE match.releases (
  release_id varchar(80) PRIMARY KEY,
  manifest jsonb NOT NULL,
  manifest_digest varchar(64) NOT NULL CHECK (manifest_digest ~ '^[a-f0-9]{64}$'),
  CHECK (octet_length(manifest::text) <= 65536)
);
CREATE TABLE match.matches (
  match_id varchar(80) PRIMARY KEY CHECK (match_id ~ '^[a-zA-Z0-9][a-zA-Z0-9._-]*$'),
  player_one varchar(80) NOT NULL CHECK (player_one ~ '^[a-zA-Z0-9][a-zA-Z0-9._-]*$'),
  player_two varchar(80) NOT NULL CHECK (player_two ~ '^[a-zA-Z0-9][a-zA-Z0-9._-]*$'),
  release_id varchar(80) NOT NULL REFERENCES match.releases(release_id),
  engine_identity varchar(64) NOT NULL CHECK (engine_identity ~ '^[a-f0-9]{64}$'),
  rules_version varchar(32) NOT NULL CHECK (rules_version = 'synthetic-fixture'),
  catalog_revision varchar(32) NOT NULL CHECK (catalog_revision = 'synthetic-rule-03'),
  format_revision varchar(32) NOT NULL CHECK (format_revision = 'synthetic-two-player-v1'),
  protocol_version smallint NOT NULL CHECK (protocol_version = 1),
  mode varchar(24) NOT NULL CHECK (mode = 'qualification'),
  reward_eligible boolean NOT NULL CHECK (NOT reward_eligible),
  state_version bigint NOT NULL CHECK (state_version BETWEEN 0 AND 9007199254740991),
  last_timestamp bigint NOT NULL CHECK (last_timestamp BETWEEN 0 AND 9007199254740991),
  checkpoint text NOT NULL CHECK (octet_length(checkpoint) BETWEEN 1 AND 2097152),
  checkpoint_digest varchar(64) NOT NULL CHECK (checkpoint_digest ~ '^[a-f0-9]{64}$'),
  ended boolean NOT NULL DEFAULT false,
  winner varchar(80),
  created_at timestamptz NOT NULL DEFAULT now(),
  CHECK (player_one <> player_two),
  CHECK (winner IS NULL OR winner IN (player_one, player_two)),
  CHECK (ended OR winner IS NULL)
);
CREATE TABLE match.command_receipts (
  match_id varchar(80) NOT NULL REFERENCES match.matches(match_id) ON DELETE CASCADE,
  actor_id varchar(80) NOT NULL,
  command_id varchar(80) NOT NULL,
  intent_hash varchar(64) NOT NULL CHECK (intent_hash ~ '^[a-f0-9]{64}$'),
  intent text NOT NULL CHECK (octet_length(intent) <= 16384),
  outcome varchar(16) NOT NULL CHECK (outcome IN ('accepted','rejected','stale')),
  reason varchar(24),
  state_version bigint NOT NULL CHECK (state_version BETWEEN 0 AND 9007199254740991),
  recorded_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (match_id, actor_id, command_id),
  CHECK ((outcome='accepted' AND reason IS NULL) OR (outcome='rejected' AND reason IN ('forbidden','invalid_intent')) OR (outcome='stale' AND reason='stale_state'))
);
CREATE TABLE match.journal (
  match_id varchar(80) NOT NULL,
  state_version bigint NOT NULL CHECK (state_version BETWEEN 1 AND 9007199254740991),
  actor_id varchar(80) NOT NULL,
  command_id varchar(80) NOT NULL,
  intent_hash varchar(64) NOT NULL CHECK (intent_hash ~ '^[a-f0-9]{64}$'),
  checkpoint_digest varchar(64) NOT NULL CHECK (checkpoint_digest ~ '^[a-f0-9]{64}$'),
  recorded_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (match_id,state_version),
  UNIQUE (match_id,actor_id,command_id),
  FOREIGN KEY (match_id,actor_id,command_id) REFERENCES match.command_receipts(match_id,actor_id,command_id) ON DELETE CASCADE
);
-- References only. No card identities, private log, replay, seed or resulting state.
CREATE TABLE match.outbox (
  event_id uuid PRIMARY KEY,
  match_id varchar(80) NOT NULL,
  state_version bigint NOT NULL,
  kind varchar(32) NOT NULL CHECK (kind IN ('match_changed','match_completed')),
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (match_id,state_version),
  FOREIGN KEY (match_id,state_version) REFERENCES match.journal(match_id,state_version) ON DELETE CASCADE
);
CREATE UNIQUE INDEX match_one_terminal_event ON match.outbox(match_id) WHERE kind='match_completed';
