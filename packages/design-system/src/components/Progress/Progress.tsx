import { ProgressBar as AriaProgressBar, Label } from 'react-aria-components';
import type { ReactNode } from 'react';
import { Icon } from '../Icon/Icon.tsx';
import type { IconName } from '../Icon/Icon.tsx';
import { useMessages } from '../../foundation/DesignSystemProvider.tsx';
import styles from './Progress.module.css';

export interface ProgressBarProps {
  label: ReactNode;
  /** Omit for indeterminate work: no fabricated percentage is ever shown (§21). */
  value?: number;
  minValue?: number;
  maxValue?: number;
  valueLabel?: string;
}
export function ProgressBar({ label, value, minValue = 0, maxValue = 100, valueLabel }: ProgressBarProps) {
  return <AriaProgressBar className={styles.progress} isIndeterminate={value === undefined} minValue={minValue} maxValue={maxValue} {...(value === undefined ? {} : { value })} {...(valueLabel ? { valueLabel } : {})}>
    {({ percentage, valueText, isIndeterminate }) => <>
      <div className={styles.header}><Label className={styles.label}>{label}</Label>{!isIndeterminate && <span className={styles.value}>{valueText}</span>}</div>
      <div className={styles.track} data-indeterminate={isIndeterminate || undefined}>{!isIndeterminate && <div className={styles.fill} style={{ inlineSize: `${percentage}%` }} />}</div>
    </>}
  </AriaProgressBar>;
}

export type JobState = 'queued' | 'running' | 'failed' | 'canceled' | 'complete';
const jobIcon: Record<JobState, IconName> = { queued: 'pending', running: 'refresh', failed: 'danger', canceled: 'close', complete: 'success' };
export interface JobStatusProps {
  label: ReactNode;
  state: JobState;
  /** Determinate progress while running, only when the owning service reports it. */
  progress?: number;
  detail?: ReactNode;
  /** Recovery or cancellation control appropriate to the state. */
  action?: ReactNode;
}
/** Distinguishes queued, running (determinate or indeterminate), failed, canceled and complete (§13). */
export function JobStatus({ label, state, progress, detail, action }: JobStatusProps) {
  const t = useMessages();
  return <div className={styles.job} data-state={state}>
    <div className={styles.jobHeader}>
      <Icon name={jobIcon[state]} />
      <span className={styles.jobLabel}>{label}</span>
      <span className={styles.jobState}>{t(`job.${state}`)}</span>
    </div>
    {state === 'running' && <ProgressBar label={t('job.running')} {...(progress === undefined ? {} : { value: progress })} />}
    {detail && <p className={styles.detail}>{detail}</p>}
    {action && <div>{action}</div>}
  </div>;
}
