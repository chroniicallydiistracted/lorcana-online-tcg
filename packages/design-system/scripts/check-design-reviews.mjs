// Independent review gate (Director decision D30): every reference screen needs a passing record from two isolated
// reviewers (design and evidence) at the current design source. A missing, stale or failing record declines the screen.
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { checkReviewRecord, designFingerprint, recordPath, referenceScreens } from './design-review-lib.mjs';

export function checkDesignReviews() {
  const fingerprint = designFingerprint(), screens = referenceScreens();
  const problems = screens.flatMap(screen => checkReviewRecord(existsSync(recordPath(screen)) ? JSON.parse(readFileSync(recordPath(screen), 'utf8')) : null, screen, fingerprint));
  return { fingerprint, screens, problems };
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const { fingerprint, screens, problems } = checkDesignReviews();
  if (problems.length) { console.error(`DECLINED design review records at design source ${fingerprint.slice(0, 12)}:\n${problems.join('\n')}`); process.exitCode = 1; }
  else console.log(`PASS design review records: ${screens.length} screens independently reviewed at design source ${fingerprint.slice(0, 12)}`);
}
