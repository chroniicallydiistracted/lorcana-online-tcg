export interface SyntheticKernel {
  status(): { revision: number; ended: boolean; winner: string | null };
  submit(actor: string, revision: number, timestamp: number, commandId: string, move: string, input: Record<string, unknown>): { accepted: boolean; code: string | null };
}
export declare function createSyntheticKernel(seed: string, playerIds: [string, string]): SyntheticKernel;
