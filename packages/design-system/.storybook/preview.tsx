import type { Preview } from '@storybook/react-vite';
import { useLayoutEffect } from 'react';
import type { ReactNode } from 'react';
import { DesignSystemProvider, defaultPreferences, parsePreferences } from '../src/index.ts';

/** Outlines the reserved ink-form artwork slots for review (InkFormSlot); a room never sets this itself. */
function ArtworkSlots({ shown, children }: { shown: boolean; children: ReactNode }) {
  useLayoutEffect(() => {
    const root = document.documentElement;
    if (shown) root.setAttribute('data-artwork-slots', 'shown'); else root.removeAttribute('data-artwork-slots');
  }, [shown]);
  return children;
}

const preview: Preview = {
  globalTypes: {
    theme: { description: 'Interface theme preference', toolbar: { title: 'Theme', items: ['system', 'paper', 'ink'], dynamicTitle: true } },
    density: { description: 'Density preference', toolbar: { title: 'Density', items: ['comfortable', 'compact'], dynamicTitle: true } },
    motion: { description: 'Motion preference', toolbar: { title: 'Motion', items: ['system', 'reduced'], dynamicTitle: true } },
    locale: { description: 'Locale (en-XA is the long-string pseudolocale)', toolbar: { title: 'Locale', items: ['en', 'en-XA'], dynamicTitle: true } },
    artworkSlots: { description: 'Show artwork slots: outline the reserved ink-form slots', toolbar: { title: 'Artwork slots', items: ['hidden', 'shown'], dynamicTitle: true } },
  },
  initialGlobals: { theme: 'paper', density: 'comfortable', motion: 'system', locale: 'en', artworkSlots: 'hidden' },
  decorators: [(Story, context) => {
    const preferences = parsePreferences({ ...defaultPreferences, theme: context.globals.theme, density: context.globals.density, motion: context.globals.motion });
    // Reference screens bleed to the viewport edge like a room; component stories keep the padded canvas.
    const story = (context.parameters as { designSystem?: { bleed?: boolean } }).designSystem?.bleed ? <Story /> : <div style={{ padding: 'var(--is-space-6)' }}><Story /></div>;
    return <DesignSystemProvider preferences={preferences} locale={context.globals.locale ?? 'en'}><ArtworkSlots shown={context.globals.artworkSlots === 'shown'}>{story}</ArtworkSlots></DesignSystemProvider>;
  }],
  parameters: { layout: 'fullscreen', controls: { expanded: true } },
};
export default preview;
