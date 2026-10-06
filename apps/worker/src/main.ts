import { requireLocalEnvironment, serveUntilShutdown } from '@lorcana/service-runtime/lifecycle';
try {
  requireLocalEnvironment();
  await serveUntilShutdown({
    start: async () => { console.log('worker foundation started; job processing is not configured'); },
    stop: async () => { console.log('worker foundation stopped'); },
  });
} catch { console.error('worker foundation startup failed'); process.exitCode = 1; }
