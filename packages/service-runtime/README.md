# service-runtime

Server-only shared Fastify diagnostics and local lifecycle. Cancellation is registered before initialization; startup must honor AbortSignal and release resources allocated after cancellation. Shutdown drains/closes with a ten-second bound. No browser exports or database access.
