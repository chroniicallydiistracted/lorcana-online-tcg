export class MatchServiceError extends Error {
  constructor(readonly code:'FORBIDDEN'|'INVALID_REQUEST'|'ID_CONFLICT'|'PIN_UNAVAILABLE'|'UNAVAILABLE'|'BUSY'){super('Match service '+code);}
}
