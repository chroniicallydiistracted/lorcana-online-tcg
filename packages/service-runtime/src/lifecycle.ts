export function requireLocalEnvironment(): void {
  if (process.env['APP_ENV'] !== 'local') throw new Error('Foundation services require APP_ENV=local');
}

/** Initialization must honor cancellation and release any resources allocated after abort. */
export async function serveUntilShutdown(options: { start: (signal: AbortSignal) => Promise<void>; stop: () => Promise<void> }): Promise<void> {
  const controller = new AbortController();
  let signalShutdown!: () => void;
  let deadline: ReturnType<typeof setTimeout> | undefined;
  const boundShutdown = () => {
    deadline ??= setTimeout(() => { console.error('Foundation shutdown exceeded 10 seconds'); process.exit(1); }, 10_000);
  };
  const shutdown = new Promise<void>(resolve => { signalShutdown = () => { boundShutdown(); resolve(); controller.abort(); }; });
  process.once('SIGINT', signalShutdown);
  process.once('SIGTERM', signalShutdown);
  const keepAlive = setInterval(() => {}, 60_000);
  try {
    await Promise.race([options.start(controller.signal), shutdown]);
    await shutdown;
  } finally {
    controller.abort();
    boundShutdown();
    process.removeListener('SIGINT', signalShutdown);
    process.removeListener('SIGTERM', signalShutdown);
    try { await options.stop(); } finally { clearInterval(keepAlive); clearTimeout(deadline); }
  }
}
