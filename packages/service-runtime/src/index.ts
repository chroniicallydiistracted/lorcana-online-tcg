import Fastify from 'fastify';
import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { Type } from 'typebox';
import { HealthSchema, ReadinessSchema, HelloRequestSchema, HelloResponseSchema, FOUNDATION_PROTOCOL, IdSchema, readContract, parseHelloRequest, parseProtocolRange, negotiateProtocol, MAX_FRAME_BYTES } from '@lorcana/contracts';
import type { ServiceName, Health, Readiness, ProtocolRange, HelloResponse } from '@lorcana/contracts';
import { serveUntilShutdown, requireLocalEnvironment } from './lifecycle.ts';
export { createReleaseRegistry, assertRetainedPins } from './release.ts';
export type { ReleaseRegistry, RetainedRelease } from './release.ts';

export function createHttpService(service: ServiceName, options: { releaseId?: string; supportedProtocol?: ProtocolRange } = {}) {
  const releaseId = readContract(IdSchema, options.releaseId ?? 'local-foundation', 'release ID');
  const supportedProtocol = { ...parseProtocolRange(options.supportedProtocol ?? FOUNDATION_PROTOCOL) };
  if (supportedProtocol.min !== FOUNDATION_PROTOCOL.min || supportedProtocol.max !== FOUNDATION_PROTOCOL.max) throw new Error('Unsupported service protocol');
  const app = Fastify({ logger: false, ajv: { customOptions: { removeAdditional: false, coerceTypes: false, useDefaults: false } } }).withTypeProvider<TypeBoxTypeProvider>();
  let ready = false;
  const drain = () => { ready = false; };
  app.addHook('onReady', async () => { ready = true; });
  app.addHook('preClose', async () => { drain(); });
  app.get('/healthz', { schema: { response: { 200: HealthSchema } } }, (): Health => ({ service, status: 'up', scope: 'foundation' }));
  app.get('/readyz', { schema: { response: { 200: ReadinessSchema, 503: ReadinessSchema } } }, (_request, reply) => {
    reply.code(ready ? 200 : 503);
    return { service, status: ready ? 'ready' : 'not_ready', scope: 'foundation' } satisfies Readiness;
  });
  const invalidRequest = Type.Object({ code: Type.Literal('invalid_request') }, { additionalProperties: false });
  app.post('/protocol/negotiate', { bodyLimit: MAX_FRAME_BYTES, schema: { body: HelloRequestSchema, response: { 200: HelloResponseSchema, 409: HelloResponseSchema, 503: HelloResponseSchema, 400: invalidRequest, 413: invalidRequest } }, errorHandler(error, _request, reply) { reply.code(error.statusCode === 413 ? 413 : 400).send({ code: 'invalid_request' }); } }, (request, reply): HelloResponse | { code: 'invalid_request' } => {
    let hello;
    try { hello = parseHelloRequest(request.body); } catch { reply.code(400); return { code: 'invalid_request' }; }
    const fields = { type: 'hello_result' as const, requestId: hello.requestId, serverReleaseId: releaseId };
    if (!ready) { reply.code(503); return { ...fields, outcome: 'maintenance', retryAfterMs: 1000 }; }
    const selected = negotiateProtocol(hello.supportedProtocol, supportedProtocol);
    if (selected === null) { reply.code(409); return { ...fields, outcome: 'unsupported_version', supportedProtocol, action: 'upgrade_required' }; }
    return { ...fields, outcome: 'accepted', protocolVersion: selected };
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
