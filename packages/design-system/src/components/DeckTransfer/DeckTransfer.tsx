import { useState } from 'react';
import { Button } from '../Button/Button.tsx';
import { Dialog } from '../Dialog/Dialog.tsx';
import { Icon } from '../Icon/Icon.tsx';
import { Radio, RadioGroup } from '../Radio/Radio.tsx';
import { TextArea } from '../TextField/TextField.tsx';
import { useMessages } from '../../foundation/DesignSystemProvider.tsx';
import styles from './DeckTransfer.module.css';

export interface ImportLine {
  /** The line as pasted. */
  readonly text: string;
  readonly quantity: number;
  readonly status: 'resolved' | 'unresolved';
  /** The catalog card a resolved line matched. */
  readonly match?: string;
  /** Why an unresolved line did not match. */
  readonly reason?: string;
}
/**
 * Import preview (§18): every pasted line with what it resolved to, and every unresolved name and count reported before
 * anything changes. The caller offers the import and cancel actions; nothing is substituted automatically.
 */
export function ImportPreview({ lines }: { lines: readonly ImportLine[] }) {
  const t = useMessages(), resolved = lines.filter(l => l.status === 'resolved'), unresolved = lines.filter(l => l.status === 'unresolved');
  const cards = (list: readonly ImportLine[]) => list.reduce((n, l) => n + l.quantity, 0);
  return <div className={styles.preview}>
    <p className={styles.summary}>{t('import.summary', { cards: cards(resolved) })} {t('import.attention', { lines: unresolved.length })}</p>
    <ul className={styles.lines}>{lines.map((line, i) => <li key={i} className={styles.line} data-status={line.status}>
      <Icon name={line.status === 'resolved' ? 'success' : 'warning'} label={t(line.status === 'resolved' ? 'import.resolved' : 'import.unresolved')} />
      <span className={styles.lineText}>
        <span className={styles.source}>{line.text}</span>
        <span className={styles.outcome}>{line.status === 'resolved' ? t('import.matched', { name: line.match ?? '' }) : line.reason}</span>
      </span>
    </li>)}</ul>
  </div>;
}

export interface ExportFormat { readonly id: string; readonly label: string; readonly description: string; readonly content: string }
export interface ExportDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  title: string;
  /** Explicit formats to choose from (§18); each carries its exported text. */
  formats: readonly ExportFormat[];
}
/** Export with an explicit format choice, a read-only preview of the exact text and a copy action that reports its result. */
export function ExportDialog({ isOpen, onOpenChange, title, formats }: ExportDialogProps) {
  const t = useMessages(), [format, setFormat] = useState(formats[0]?.id ?? ''), [copy, setCopy] = useState<'idle' | 'copied' | 'failed'>('idle');
  const chosen = formats.find(f => f.id === format) ?? formats[0];
  const onCopy = () => {
    if (typeof navigator === 'undefined' || !navigator.clipboard) { setCopy('failed'); return; }
    void navigator.clipboard.writeText(chosen?.content ?? '').then(() => setCopy('copied'), () => setCopy('failed'));
  };
  return <Dialog title={title} isOpen={isOpen} onOpenChange={open => { setCopy('idle'); onOpenChange(open); }}
    actions={<><span className={styles.copyState} role="status">{copy === 'idle' ? '' : t(copy === 'copied' ? 'export.copied' : 'export.copyFailed')}</span><Button onPress={() => onOpenChange(false)}>{t('action.close')}</Button><Button variant="primary" onPress={onCopy}>{t('export.copy')}</Button></>}>
    <div className={styles.export}>
      <RadioGroup label={t('export.format')} value={format} onChange={value => { setFormat(value); setCopy('idle'); }}>
        {formats.map(f => <Radio key={f.id} value={f.id}>{f.label} <span className={styles.formatNote}>{f.description}</span></Radio>)}
      </RadioGroup>
      <TextArea label={t('export.preview')} value={chosen?.content ?? ''} isReadOnly />
    </div>
  </Dialog>;
}
