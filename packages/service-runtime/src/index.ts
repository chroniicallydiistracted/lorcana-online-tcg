import Fastify from 'fastify';
import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { HealthSchema, ReadinessSchema } from '@lorcana/contracts';
import type { ServiceName, Health, Readiness } from '@lorcana/contracts';
import { serveUntilShutdown, requireLocalEnvironment } from './lifecycle.ts';

export function createHttpService(service: ServiceName) {
  const app = Fastify({ logger: false }).withTypeProvider<TypeBoxTypeProvider>();
  let ready = false;
  const drain = () => { ready = false; };
  app.addHook('onReady', async () => { ready = true; });
  app.addHook('preClose', async () => { drain(); });
  app.get('/healthz', { schema: { response: { 200: HealthSchema } } }, (): Health => ({ service, status: 'up', scope: 'foundation' }));
  app.get('/readyz', { schema: { response: { 200: ReadinessSchema, 503: ReadinessSchema } } }, (_request, reply) => {
    reply.code(ready ? 200 : 503);
    return { service, status: ready ? 'ready' : 'not_ready', scope: 'foundation' } satisfies Readiness;
  });
  return { app, drain };
}
export async function runHttpService(name: ServiceName, port: number): Promise<void> {
  requireLocalEnvironment();
  const service = createHttpService(name);
  await serveUntilShutdown({
    start: async signal => {
      await service.app.listen({ host: '0.0.0.0', port });
      if (signal.aborted) { await service.app.close(); return; }
      console.log(`${name} foundation listening on ${port}`);
    },
    stop: async () => { service.drain(); await service.app.close(); },
  });
}
