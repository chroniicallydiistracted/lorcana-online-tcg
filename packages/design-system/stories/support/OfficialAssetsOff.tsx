import type { ReactNode } from 'react';
import { DesignSystemProvider, useDesignSystem } from '../../src/index.ts';

/** Renders children with official Lorcana symbols switched off, keeping the story's preferences and locale. */
export function OfficialAssetsOff({ children }: { children: ReactNode }) {
  const { preferences, locale } = useDesignSystem();
  return <DesignSystemProvider preferences={preferences} locale={locale} officialAssets={false}>{children}</DesignSystemProvider>;
}
