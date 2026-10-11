import { createLabMatch, type LabMatch } from './index.js';

let match: LabMatch | undefined;
export function handleLabMessage(message: unknown): unknown {
  if (!message || typeof message !== 'object' || Array.isArray(message)) throw new Error('Invalid Lab message');
  const value = message as Record<string, unknown>;
  switch (value.type) {
    case 'init':
      if (Object.keys(value).some(key => !['type', 'options'].includes(key))) throw new Error('Invalid init message');
      if (match) throw new Error('Match already initialized');
      match = createLabMatch(value.options);
      return match.status();
    case 'status':
      if (Object.keys(value).length !== 1 || !match) throw new Error('No active Lab match');
      return match.status();
    case 'submit':
      if (Object.keys(value).some(key => !['type', 'command'].includes(key)) || !match) throw new Error('No active Lab match');
      return match.submit(value.command);
    case 'dispose':
      if (Object.keys(value).length !== 1) throw new Error('Invalid dispose message');
      match?.dispose(); match = undefined;
      return { disposed: true };
    default: throw new Error('Unknown Lab message');
  }
}
addEventListener('message', event => {
  try { postMessage({ ok: true, result: handleLabMessage(event.data) }); }
  catch { postMessage({ ok: false, code: 'LAB_REQUEST_REJECTED' }); }
});
