import { useEffect, useRef, useState } from 'react';
import { parseReadiness, parseHelloResponse, FOUNDATION_PROTOCOL } from '@lorcana/contracts';
import type { HelloRequest } from '@lorcana/contracts';
import { ActionButton } from '@lorcana/design-system';
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
    <p className={styles.eyebrow}>Lorcana Online · Foundation preview</p>
    <h1>Application foundation</h1>
    <p className={styles.intro}>A local proof of the client, service connections and tabletop renderer.</p>
    <section aria-labelledby="services-title">
      <h2 id="services-title">Local services</h2>
      <ul aria-live="polite">
        <ServiceStatus path="/api/readyz" name="API" expectedService="api" />
        <ServiceStatus path="/match/readyz" name="Match service" expectedService="match-service" />
        <ProtocolStatus />
      </ul>
    </section>
    <section aria-labelledby="renderer-title">
      <h2 id="renderer-title">Rendering check</h2>
      <ActionButton onPress={() => setRendering(value => !value)}>{rendering ? 'Stop rendering check' : 'Start rendering check'}</ActionButton>
      {rendering && <RenderingCheck />}
    </section>
    <p className={styles.note}>Infrastructure preview with synthetic shapes. The game and its art direction are still to come.</p>
  </main>;
}
