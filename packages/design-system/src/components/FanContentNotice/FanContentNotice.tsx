import { Link } from '../Link/Link.tsx';
import { COMMUNITY_CODE_URL, FAN_CONTENT_NOTICE, LORCANA_URL } from './notice.ts';
import styles from './FanContentNotice.module.css';

/** Required fan-content notice. Reachable from every screen and shown in the start/loading context (§29). */
export function FanContentNotice() {
  const [beforeCode, rest] = FAN_CONTENT_NOTICE.split(COMMUNITY_CODE_URL) as [string, string];
  const [middle, end] = rest.split(LORCANA_URL) as [string, string];
  return <p className={styles.notice}>
    {beforeCode}<Link href={COMMUNITY_CODE_URL} external>{COMMUNITY_CODE_URL}</Link>{middle}<Link href={LORCANA_URL} external>{LORCANA_URL}</Link>{end}
  </p>;
}
