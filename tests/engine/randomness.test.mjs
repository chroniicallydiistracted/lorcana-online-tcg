import test from 'node:test';
import assert from 'node:assert/strict';
import {readdirSync,readFileSync} from 'node:fs';
import {join} from 'node:path';
import {assertNoAmbientEntropy} from '../../scripts/engine/check-randomness.mjs';

test('vendored source has no ambient Math.random/UUID or runtime seedrandom fallback',()=>{
  const root=new URL('../../vendor/tcg-engines/upstream/',import.meta.url);
  function walk(folder){for(const entry of readdirSync(folder,{withFileTypes:true})){const path=join(folder,entry.name);if(entry.isDirectory())walk(path);else if(path.endsWith('.ts')&&!path.endsWith('.test.ts')){const code=readFileSync(path,'utf8');assert.ok(!/Math\.random|crypto\.randomUUID|from\s+["']seedrandom["']/.test(code),'ambient randomness: '+path);}}}
  walk(root.pathname);
});
test('entropy guard rejects computed access and aliases, including hidden seedrandom imports',()=>{
  for(const source of ['Math.random()','Math["random"]()','const m=Math; m.random()','const {random}=Math; random()','const m=globalThis["Math"];m.random()','globalThis.crypto.randomUUID()','import rng from "seedrandom"','import("seedrandom")'])assert.throws(()=>assertNoAmbientEntropy(source,'kernel'),/entropy|seedrandom/);
  assert.doesNotThrow(()=>assertNoAmbientEntropy('const value=Math.floor(0.5);','kernel'));
  assert.doesNotThrow(()=>assertNoAmbientEntropy('const FLAG="__TCG_DEBUG_PERFORMANCE__";(globalThis as Record<string,unknown>)[FLAG]','kernel'));
  assert.doesNotThrow(()=>assertNoAmbientEntropy('{"recordedAt":"2026-01-01"}','kernel','promotion.json'));
});
test('entropy guard closes crypto aliases, alternate module forms and cast global receivers',()=>{
  for(const source of [
    'const {randomUUID}=crypto; randomUUID();','const {randomUUID:id}=crypto; id();',
    'import rng from "seedrandom/index.js"','require("seedrandom")','export {default} from "seedrandom/index.js"',
    'crypto.getRandomValues(new Uint8Array(32))','import {randomBytes} from "node:crypto"',
    'const c=crypto;c.randomBytes(32)','require("crypto").randomBytes(32)',
    '(globalThis as any).Math.random()','self.Math.random()','window.Math.random()','global.Math.random()',
    'const m=self["Math"];m["random"]()','const {Math:m}=globalThis;m.random()',
    'let g;g=globalThis;g.Math.random();','function next(){const h=g;return h.Math.random();}const g=globalThis;next();',
  ])assert.throws(()=>assertNoAmbientEntropy(source,'kernel'),/entropy|seedrandom/);
  assert.doesNotThrow(()=>assertNoAmbientEntropy('import {randomBytes,createHash} from "node:crypto";randomBytes(32)','server'));
  assert.doesNotThrow(()=>assertNoAmbientEntropy('import rng from "seedrandom";rng("lab")','lab'));
});
