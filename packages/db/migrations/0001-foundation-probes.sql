-- Synthetic verification only; these tables carry no player/economic/game state.
CREATE TABLE api.foundation_probes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  label varchar(160) NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE match.foundation_probes (LIKE api.foundation_probes INCLUDING ALL);
CREATE TABLE worker.foundation_probes (LIKE api.foundation_probes INCLUDING ALL);
