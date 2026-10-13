-- 0002 was already applied in the test target. Preserve it and append this correction.
ALTER TABLE match.command_receipts DROP CONSTRAINT command_receipts_check;
ALTER TABLE match.command_receipts ADD CONSTRAINT command_receipts_outcome_reason CHECK (
  (outcome='accepted' AND reason IS NULL) OR
  (outcome='rejected' AND reason IS NOT NULL AND reason IN ('forbidden','invalid_intent')) OR
  (outcome='stale' AND reason IS NOT NULL AND reason='stale_state')
);
ALTER TABLE match.command_receipts ADD CONSTRAINT command_receipts_actor_identity CHECK (actor_id ~ '^[a-zA-Z0-9][a-zA-Z0-9._-]*$');
ALTER TABLE match.command_receipts ADD CONSTRAINT command_receipts_command_identity CHECK (command_id ~ '^[a-zA-Z0-9][a-zA-Z0-9._-]*$');
