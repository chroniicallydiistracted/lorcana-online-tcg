import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { DesignSystemProvider, readDevicePreferences } from '@lorcana/design-system';
import { App } from './App.tsx';

function deviceStore(): Storage | undefined {
  try { return globalThis.localStorage; } catch { return undefined; }
}
const root = document.getElementById('root');
if (!root) throw new Error('Missing application root');
createRoot(root).render(<StrictMode><DesignSystemProvider preferences={readDevicePreferences(deviceStore())}><App /></DesignSystemProvider></StrictMode>);
