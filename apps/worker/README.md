# worker

Idle local worker foundation. Registers signals and bounded cleanup, stays alive until interrupted and exposes no HTTP ingress. No job queue or economic processing yet. Built execution: `pnpm --filter @lorcana/worker start` after `pnpm build`.
