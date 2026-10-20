-- D13 live4 carries viewer2 outcomes and optional clock2 timeout counts.
-- Keep earlier saved rows/pins intact; do not rewrite any match or ticket.
ALTER TABLE match.matches DROP CONSTRAINT matches_protocol_version_check;
ALTER TABLE match.matches ADD CONSTRAINT matches_protocol_version_check CHECK (protocol_version IN (1,2,3,4));
ALTER TABLE match.socket_tickets DROP CONSTRAINT socket_tickets_protocol_version_check;
ALTER TABLE match.socket_tickets ADD CONSTRAINT socket_tickets_protocol_version_check CHECK (protocol_version IN (2,3,4));
