import { useEffect, useLayoutEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { Dialog } from '../Dialog/Dialog.tsx';
import { IconButton } from '../Button/Button.tsx';
import { useAtLeast } from '../../foundation/media.ts';
import { useMessages } from '../../foundation/DesignSystemProvider.tsx';
import styles from './InspectorHost.module.css';

export interface InspectorHostProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  title: ReactNode;
  children: ReactNode;
  /** Where focus goes if the originating card no longer exists when inspection closes. */
  fallbackFocus?: () => HTMLElement | null;
}
/**
 * Placement and lifecycle for inspection (§13, §15): a side panel beside the working context on wide
 * layouts and a modal sheet on narrower ones. Closing returns focus to the originating card when it still exists.
 */
export function InspectorHost({ isOpen, onOpenChange, title, children, fallbackFocus }: InspectorHostProps) {
  const t = useMessages(), wide = useAtLeast('wide'), origin = useRef<Element | null>(null), panel = useRef<HTMLElement>(null);
  useLayoutEffect(() => {
    if (isOpen) { origin.current = document.activeElement; if (wide) panel.current?.focus(); return; }
    const target = origin.current;
    origin.current = null;
    if (target instanceof HTMLElement && target.isConnected) target.focus();
    else fallbackFocus?.()?.focus();
  }, [isOpen, wide, fallbackFocus]);
  useEffect(() => {
    if (!isOpen || !wide) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape' && panel.current?.contains(document.activeElement)) onOpenChange(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, wide, onOpenChange]);
  if (!isOpen) return null;
  if (!wide) return <Dialog presentation="sheet" title={title} isOpen onOpenChange={onOpenChange}>{children}</Dialog>;
  return <aside ref={panel} className={styles.panel} tabIndex={-1} aria-label={typeof title === 'string' ? title : undefined}>
    <div className={styles.header}><h2 className={styles.title}>{title}</h2><IconButton icon="close" label={t('action.close')} onPress={() => onOpenChange(false)} tooltip={false} /></div>
    <div className={styles.body}>{children}</div>
  </aside>;
}

export interface InspectorLayoutProps {
  children: ReactNode;
  /** The InspectorHost, kept mounted so closing restores focus to the originating card. */
  inspector: ReactNode;
  inspecting: boolean;
}
/** Working content with a side column for inspection on wide layouts; narrower layouts get the host's modal sheet. */
export function InspectorLayout({ children, inspector, inspecting }: InspectorLayoutProps) {
  return <div className={styles.layout} data-inspecting={inspecting || undefined}>
    <div className={styles.main}>{children}</div>
    <div className={styles.side}>{inspector}</div>
  </div>;
}
