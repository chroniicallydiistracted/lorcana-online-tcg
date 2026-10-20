import { useEffect, useRef, useState } from 'react';
import { parseReadiness, parseHelloResponse, FOUNDATION_PROTOCOL } from '@lorcana/contracts';
import type { HelloRequest } from '@lorcana/contracts';
import { Button, FanContentNotice, Heading, Text } from '@lorcana/design-system';
import styles from './App.module.css';

function ServiceStatus({ path, name, expectedService }: { path: string; name: string; expectedService: 'api' | 'match-service' }) {
  const [state, setState] = useState('checking');
  useEffect(() => {
    const controller = new AbortController();
    let active = true;
    const timeout = setTimeout(() => controller.abort(), 5000);
    void fetch(path, { signal: controller.signal }).then(async response => {
      const body = parseReadiness(await response.json());
      if (active) setState(response.ok && body.status === 'ready' && body.service === expectedService ? 'ready' : 'unavailable');
    }).catch(() => { if (active) setState('unavailable'); }).finally(() => clearTimeout(timeout));
    return () => { active = false; clearTimeout(timeout); controller.abort(); };
  }, [path, expectedService]);
  return <li>{name} {state}</li>;
}
function RenderingCheck() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [status, setStatus] = useState('Starting renderer');
  useEffect(() => {
    let cancelled = false;
    let dispose: (() => void) | undefined;
    void import('@lorcana/presentation').then(({ mountSanityScene }) => {
      if (cancelled || !canvas.current) return;
      const session = mountSanityScene(canvas.current);
      dispose = session.dispose;
      setStatus('Rendering active');
    }).catch(() => { if (!cancelled) setStatus('Rendering unavailable. Your browser may not support WebGL.'); });
    return () => { cancelled = true; dispose?.(); };
  }, []);
  return <>
    <p role="status">{status}</p>
    <canvas ref={canvas} className={styles.canvas} aria-label="Three synthetic cards on a neutral tabletop" />
    <p>Three neutral card shapes. No card content or gameplay is connected.</p>
  </>;
}
function ProtocolStatus() {
  const [state, setState] = useState('checking');
  useEffect(() => {
    const controller = new AbortController();
    let active = true;
    const timeout = setTimeout(() => controller.abort(), 5000);
    const hello: HelloRequest = { type: 'hello', requestId: globalThis.crypto.randomUUID(), clientReleaseId: 'local-foundation', supportedProtocol: FOUNDATION_PROTOCOL };
    void fetch('/match/protocol/negotiate', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(hello), signal: controller.signal }).then(async response => {
      const body = parseHelloResponse(await response.json(), hello);
      if (active) setState(response.status === 200 && body.outcome === 'accepted' ? 'compatible' : response.status === 409 && body.outcome === 'unsupported_version' ? 'update required' : 'unavailable');
    }).catch(() => { if (active) setState('unavailable'); }).finally(() => clearTimeout(timeout));
    return () => { active = false; clearTimeout(timeout); controller.abort(); };
  }, []);
  return <li>Protocol {state}</li>;
}
export function App() {
  const [rendering, setRendering] = useState(false);
  return <main className={styles.page}>
    <Text role="metadata" tone="supporting">The Inkspire · Foundation preview</Text>
    <Heading level={1} role="room">Application foundation</Heading>
    <Text>A local proof of the client, service connections and tabletop renderer.</Text>
    <section className={styles.section} aria-labelledby="services-title">
      <Heading level={2} role="subsection" id="services-title">Local services</Heading>
      <ul className={styles.list} aria-live="polite">
        <ServiceStatus path="/api/readyz" name="API" expectedService="api" />
        <ServiceStatus path="/match/readyz" name="Match service" expectedService="match-service" />
        <ProtocolStatus />
      </ul>
    </section>
    <section className={styles.section} aria-labelledby="renderer-title">
      <Heading level={2} role="subsection" id="renderer-title">Rendering check</Heading>
      <Button onPress={() => setRendering(value => !value)}>{rendering ? 'Stop rendering check' : 'Start rendering check'}</Button>
      {rendering && <RenderingCheck />}
    </section>
    <Text tone="supporting">Infrastructure preview with synthetic shapes. The game and its art direction are still to come.</Text>
    <footer className={styles.footer}><FanContentNotice /></footer>
  </main>;
}
