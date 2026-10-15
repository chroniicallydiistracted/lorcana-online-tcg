export class MatchServiceError extends Error {
  constructor(readonly code:'FORBIDDEN'|'INVALID_REQUEST'|'ID_CONFLICT'|'PIN_UNAVAILABLE'|'UNAVAILABLE'){super('Match service '+code);}
}
