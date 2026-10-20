import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  framework: { name: '@storybook/react-vite', options: {} },
  stories: ['../stories/**/*.stories.tsx'],
  // No outbound telemetry or update checks from local or CI builds.
  core: { disableTelemetry: true, disableWhatsNewNotifications: true },
  viteFinal: async config => ({ ...config, resolve: { ...config.resolve, conditions: ['lorcana-source', 'module', 'browser', 'development|production'] } }),
};
export default config;
