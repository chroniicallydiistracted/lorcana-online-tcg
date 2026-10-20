import { PRODUCT_NAME } from '../../foundation/identity.ts';
import styles from './Wordmark.module.css';
/** Restrained Source Sans 3 wordmark until a finished identity asset is approved (§4). */
export function Wordmark({ as: Element = 'span' }: { as?: 'span' | 'p' | 'h1' }) {
  return <Element className={styles.wordmark}>{PRODUCT_NAME}</Element>;
}
