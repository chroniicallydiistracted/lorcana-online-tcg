export interface SyntheticKernel {
  status(): { revision: number; ended: boolean; winner: string | null; choosingFirstPlayer: string | null };
  snapshot(): unknown;
  inspect(viewerId?: string): {state:unknown;instances:Record<string,string>;events:unknown[];moves:string[]};
  restore(snapshot: unknown): void;
  submit(actor: string, revision: number, timestamp: number, commandId: string, move: string, input: Record<string, unknown>): { accepted: boolean; code: string | null };
}
export interface KernelRandomSource { random(index: number): number; integer(index: number, bound: number): number; identifier(domain: string, index: number): string }
export declare const KERNEL_IDENTITY: string;
export declare function createSyntheticKernel(options: { randomSource: KernelRandomSource; players: [string, string]; startTimestamp: number; choosingFirstPlayer?: string }): SyntheticKernel;
