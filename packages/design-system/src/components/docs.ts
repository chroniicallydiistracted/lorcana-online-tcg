/** Lifecycle (standard §35): Proposed → Experimental → Stable → Deprecated. */
export type ComponentStatus = 'proposed' | 'experimental' | 'stable' | 'deprecated';
/** The documentation contract every reusable component meets (standard §13). */
export interface ComponentDoc {
  readonly name: string;
  readonly status: ComponentStatus;
  readonly foundation: string;
  readonly purpose: string;
  readonly anatomy: readonly string[];
  readonly variants: readonly string[];
  /** Every state listed here has at least one story that renders it. */
  readonly states: readonly string[];
  readonly inputs: readonly string[];
  readonly outputs: readonly string[];
  readonly accessibility: readonly string[];
  readonly contentLimits: readonly string[];
  readonly usage: readonly string[];
}
export const defineDoc = (doc: ComponentDoc): ComponentDoc => Object.freeze(doc);
