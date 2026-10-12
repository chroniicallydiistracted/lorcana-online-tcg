// Development-only harness for unchanged raw upstream suites. Never imported by a product entry.
import seedrandom from 'seedrandom';
import { installQualificationDefaults } from '../upstream/submodules/lorcana/packages/lorcana/lorcana-engine/src/core/runtime/match-runtime.random-apis.ts';

installQualificationDefaults({
  source(seed: string) {
    const random = (index: number) => seedrandom(`${seed}:${index}`)();
    return {
      random,
      integer: (index: number, bound: number) => Math.floor(random(index) * bound),
      identifier(domain: string, index: number) {
        const draw = seedrandom(`${seed}:identifier:${domain}:${index}`);
        return Array.from({ length: 32 }, () => Math.floor(draw() * 256).toString(16).padStart(2, '0')).join('');
      },
    };
  },
  now: () => Date.now(),
});
