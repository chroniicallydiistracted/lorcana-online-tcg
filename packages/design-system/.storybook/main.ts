import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  framework: { name: '@storybook/react-vite', options: {} },
  stories: ['../stories/**/*.stories.tsx'],
  // Real card images from the recorded Ravensburger acquisition (decision D25), with provenance in packages/rules-data.
  staticDirs: [{ from: '../../rules-data/fixtures/images', to: '/catalog-images' }],
  // No outbound telemetry or update checks from local or CI builds.
  core: { disableTelemetry: true, disableWhatsNewNotifications: true },
  viteFinal: async config => ({ ...config, resolve: { ...config.resolve, conditions: ['lorcana-source', 'module', 'browser', 'development|production'] } }),
};
export default config;
