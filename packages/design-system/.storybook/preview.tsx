import type { Preview } from '@storybook/react-vite';
import { DesignSystemProvider, defaultPreferences, parsePreferences } from '../src/index.ts';

const preview: Preview = {
  globalTypes: {
    theme: { description: 'Interface theme preference', toolbar: { title: 'Theme', items: ['system', 'paper', 'ink'], dynamicTitle: true } },
    density: { description: 'Density preference', toolbar: { title: 'Density', items: ['comfortable', 'compact'], dynamicTitle: true } },
    motion: { description: 'Motion preference', toolbar: { title: 'Motion', items: ['system', 'reduced'], dynamicTitle: true } },
    locale: { description: 'Locale (en-XA is the long-string pseudolocale)', toolbar: { title: 'Locale', items: ['en', 'en-XA'], dynamicTitle: true } },
  },
  initialGlobals: { theme: 'paper', density: 'comfortable', motion: 'system', locale: 'en' },
  decorators: [(Story, context) => {
    const preferences = parsePreferences({ ...defaultPreferences, theme: context.globals.theme, density: context.globals.density, motion: context.globals.motion });
    return <DesignSystemProvider preferences={preferences} locale={context.globals.locale ?? 'en'}><div style={{ padding: 'var(--is-space-6)' }}><Story /></div></DesignSystemProvider>;
  }],
  parameters: { layout: 'fullscreen', controls: { expanded: true } },
};
export default preview;
