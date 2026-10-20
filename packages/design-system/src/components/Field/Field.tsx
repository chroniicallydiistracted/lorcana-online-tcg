import { FieldError, Text } from 'react-aria-components';
import type { ReactNode } from 'react';
import { Icon } from '../Icon/Icon.tsx';
import styles from './Field.module.css';

/** Description and validation slots shared by every field component. */
export function FieldHelp({ description, errorMessage }: { description?: ReactNode; errorMessage?: ReactNode }) {
  return <>
    {description && <Text slot="description" className={styles.description}>{description}</Text>}
    <FieldError className={styles.error}>{errorMessage ? <><Icon name="danger" size="small" /><span>{errorMessage}</span></> : null}</FieldError>
  </>;
}
export { styles as fieldStyles };
