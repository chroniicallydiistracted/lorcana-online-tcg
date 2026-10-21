import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { I18nProvider } from 'react-aria-components';
import '../styles/global.css';
import { defaultPreferences } from './preferences.ts';
import type { Preferences } from './preferences.ts';
import { catalogFor, formatMessage } from './messages.ts';
import type { MessageKey } from './messages.ts';
import styles from './DesignSystemProvider.module.css';

export type Announcement = 'polite' | 'assertive';
interface DesignSystemContextValue {
  preferences: Preferences;
  locale: string;
  t: (key: MessageKey, values?: Readonly<Record<string, string | number>>) => string;
  announce: (message: string, priority?: Announcement) => void;
  officialAssets: boolean;
}
const DesignSystemContext = createContext<DesignSystemContextValue | null>(null);

export interface DesignSystemProviderProps {
  /** Player preferences (§31). The application owns loading and saving them. */
  preferences?: Preferences;
  /** BCP 47 locale for formatting and component strings. */
  locale?: string;
  /**
   * Official Lorcana symbols (D07). false replaces every one with a neutral placeholder: the takedown
   * switch of the fan-content policy (rule 4). The application owns this configuration.
   */
  officialAssets?: boolean;
  children: ReactNode;
}

/**
 * Applies the player's theme, density and motion preferences to the document root and provides
 * component strings and the single announcer. Mount it once at the application root: a room or
 * component never switches the player's theme (§8).
 */
export function DesignSystemProvider({ preferences = defaultPreferences, locale = 'en', officialAssets = true, children }: DesignSystemProviderProps) {
  useLayoutEffect(() => {
    const root = document.documentElement, previous = ['data-theme', 'data-density', 'data-motion'].map(name => [name, root.getAttribute(name)] as const);
    // System theme stays unset so the stylesheet follows prefers-color-scheme live; an explicit choice wins.
    if (preferences.theme === 'system') root.removeAttribute('data-theme'); else root.setAttribute('data-theme', preferences.theme);
    root.setAttribute('data-density', preferences.density);
    // Reduced motion can be requested in addition to the system setting, never used to override it.
    if (preferences.motion === 'reduced') root.setAttribute('data-motion', 'reduced'); else root.removeAttribute('data-motion');
    root.lang = locale === 'en-XA' ? 'en' : locale;
    return () => { for (const [name, value] of previous) if (value === null) root.removeAttribute(name); else root.setAttribute(name, value); };
  }, [preferences.theme, preferences.density, preferences.motion, locale]);

  const catalog = catalogFor(locale);
  const t = useCallback((key: MessageKey, values: Readonly<Record<string, string | number>> = {}) => formatMessage(catalog[key], values, locale), [catalog, locale]);
  const [messages, setMessages] = useState<Record<Announcement, string>>({ polite: '', assertive: '' });
  const timers = useRef<Partial<Record<Announcement, ReturnType<typeof setTimeout>>>>({});
  const announce = useCallback((message: string, priority: Announcement = 'polite') => {
    // One region per priority. Clearing first makes a repeated identical message announce again.
    setMessages(current => ({ ...current, [priority]: '' }));
    clearTimeout(timers.current[priority]);
    timers.current[priority] = setTimeout(() => setMessages(current => ({ ...current, [priority]: message })), 50);
  }, []);
  useEffect(() => () => { for (const timer of Object.values(timers.current)) clearTimeout(timer); }, []);
  const value = useMemo(() => ({ preferences, locale, t, announce, officialAssets }), [preferences, locale, t, announce, officialAssets]);
  return <I18nProvider locale={locale === 'en-XA' ? 'en' : locale}>
    <DesignSystemContext.Provider value={value}>
      {children}
      <div className={styles.announcer} aria-live="polite" aria-atomic="true">{messages.polite}</div>
      <div className={styles.announcer} aria-live="assertive" aria-atomic="true">{messages.assertive}</div>
    </DesignSystemContext.Provider>
  </I18nProvider>;
}

export function useDesignSystem(): DesignSystemContextValue {
  const value = useContext(DesignSystemContext);
  if (!value) throw new Error('Design-system components must be rendered inside DesignSystemProvider');
  return value;
}
/** Component strings for the current locale. */
export function useMessages(): DesignSystemContextValue['t'] { return useDesignSystem().t; }
/** Whether official Lorcana symbols may render; false means neutral placeholders (takedown readiness). */
export function useOfficialAssets(): boolean { return useDesignSystem().officialAssets; }
/** Concise, prioritized live announcements (§25). Never announce frames, ticks or hover. */
export function useAnnouncer(): DesignSystemContextValue['announce'] { return useDesignSystem().announce; }
