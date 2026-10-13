import { chromium } from '@playwright/test';
import { createServer } from 'node:http';
import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';

const bytes = readFileSync(new URL('../dist/lab-worker.js', import.meta.url));
const server = createServer((request, response) => {
  if (request.url === '/') { response.setHeader('Content-Type', 'text/html'); response.end('<!doctype html><title>Synthetic engine worker proof</title>'); }
  else if (request.url === '/lab-worker.js') { response.setHeader('Content-Type', 'text/javascript'); response.end(bytes); }
  else { response.statusCode = 404; response.end(); }
});
let browser;
try {
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const port = server.address().port;
  browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const errors = []; page.on('pageerror', error => errors.push(error.message));
  await page.goto('http://127.0.0.1:' + port);
  const result = await page.evaluate(async () => {
    async function run() {
      const worker = new Worker('/lab-worker.js', { type: 'module' });
      function send(message) {
        return new Promise((resolve, reject) => {
          const timeout = setTimeout(() => reject(new Error('Worker timeout')), 5000);
          worker.onmessage = event => { clearTimeout(timeout); resolve(event.data); };
          worker.onerror = () => { clearTimeout(timeout); reject(new Error('Worker error')); };
          worker.postMessage(message);
        });
      }
      const messages = [];
      try {
        messages.push(await send({ type: 'init', options: { mode: 'ordinary-lab', fixture: 'synthetic', seed: 'x', players: ['p1', 'p2'] } }));
        messages.push(await send({ type: 'init', options: { mode: 'advanced-sandbox', fixture: 'synthetic', seed: 'worker-proof', players: ['p1', 'p2'] } }));
        let revision = messages[1].result.revision;
        for (const [actor, move, input] of [['p1', 'chooseWhoGoesFirst', { playerId: 'p1' }], ['p1', 'alterHand', { playerId: 'p1', cardsToMulligan: [] }], ['p2', 'alterHand', { playerId: 'p2', cardsToMulligan: [] }], ['p1', 'concede', {}]]) {
          if(move==='concede') {
            const before=JSON.stringify(await send({type:'status'}));
            for(const forbidden of ['manualSetLore','manualSetInkDrops','forfeitGame','sing','singTogether','unknown','__proto__']) {
              const response=await send({type:'submit',command:{actor:'p1',expectedRevision:revision,timestamp:0,commandId:'blocked-'+forbidden,move:forbidden,input:{playerId:'p1',amount:20}}});
              if(response.ok!==true||response.result.accepted!==false||response.result.code!=='MOVE_FORBIDDEN')throw new Error('Player policy was bypassed');
              if(JSON.stringify(await send({type:'status'}))!==before)throw new Error('Forbidden worker move changed state');
            }
          }
          messages.push(await send({ type: 'submit', command: { actor, expectedRevision: revision, timestamp: 0, commandId: actor + move, move, input } }));
          const status = await send({ type: 'status' }); revision = status.result.revision;
        }
        messages.push(await send({ type: 'status' }));
        for (const type of ['exportReplay','random','snapshot','restore']) messages.push(await send({ type }));
        messages.push(await send({ type: 'dispose' }));
        messages.push(await send({ type: 'status' }));
      } finally { worker.terminate(); }
      return messages;
    }
    return { first: await run(), second: await run(), environment: { userAgent: navigator.userAgent, node: typeof process, bun: typeof Bun } };
  });
  for (const messages of [result.first, result.second]) {
    assert.deepEqual(messages[0], { ok: false, code: 'LAB_REQUEST_REJECTED' });
    assert.equal(messages[1].ok, true); assert.equal(messages[1].result.rewardEligible, false);
    for (const row of messages.slice(2, 6)) assert.equal(row.result.accepted, true);
    assert.equal(messages[6].result.winner, 'p2'); assert.equal(messages[6].result.ended, true);
    for (const row of messages.slice(7, 11)) assert.deepEqual(row, { ok: false, code: 'LAB_REQUEST_REJECTED' });
    assert.deepEqual(messages[11], { ok: true, result: { disposed: true } });
    assert.deepEqual(messages[12], { ok: false, code: 'LAB_REQUEST_REJECTED' });
    assert.deepEqual(Object.keys(messages[6].result).sort(), ['ended', 'mode', 'revision', 'rewardEligible', 'winner']);
  }
  assert.equal(result.environment.node, 'undefined'); assert.equal(result.environment.bun, 'undefined'); assert.deepEqual(errors, []);
  console.log(JSON.stringify({ environment: result.environment, isolatedWorkers: 2, checks: ['unqualified mode rejection', 'synthetic opening/mulligan/concession', 'debug/server/unknown moves refused before concession', 'terminal winner', 'bounded summaries', 'dispose and fresh worker', 'no Node/Bun/page errors'], workerBytes: bytes.length }));
  console.log('PASS actual Linux Chromium Web Workers; no Windows, GPU, live multiplayer or determinism certification');
} finally { await browser?.close(); await new Promise(resolve => server.close(resolve)); }
