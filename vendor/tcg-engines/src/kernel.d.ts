export interface SyntheticKernel {
  status(): { revision: number; ended: boolean; winner: string | null; endReason:'normal_win'|'concession'|'timeout'|null; choosingFirstPlayer: string | null };
  snapshot(): unknown;
  inspect(viewerId?: string): {state:unknown;instances:Record<string,string>;events:unknown[];endReason:'normal_win'|'concession'|'timeout'|null;moves:string[]};
  restore(snapshot: unknown): void;
  clock():{running:boolean;activePlayerId:string|null;startedAtMs:number|null;players:{playerId:string;remainingMs:number;timeoutCount:number}[]}|null;
  controlClock(control:KernelClockControl):void;
  timeout(timestamp:number,commandId:string):{accepted:boolean;code:string|null};
  submit(actor: string, revision: number, timestamp: number, commandId: string, move: string, input: Record<string, unknown>): { accepted: boolean; code: string | null };
}
export interface KernelRandomSource { random(index: number): number; integer(index: number, bound: number): number; identifier(domain: string, index: number): string }
export declare const KERNEL_IDENTITY: string;
export interface KernelClockPolicy {initialReserveMs:number;reserveCapMs:number;perActionBonusMs:number;perTurnPassBonusMs:number;resetTimeOnSkipMs:number;graceMs:0;timeoutLimit:number}
export interface KernelClockControl {kind:'settle'|'pause'|'resume'|'reset';timestamp:number;reason?:'SERVER_RECOVERY'|'JUDGE_PAUSE';playerId?:string;remainingMs?:number}
export declare function createSyntheticKernel(options: { randomSource: KernelRandomSource; players: [string, string]; startTimestamp: number; choosingFirstPlayer?: string; clock?:KernelClockPolicy }): SyntheticKernel;
