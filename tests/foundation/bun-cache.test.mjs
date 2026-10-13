import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
test('pinned Bun download cache recovers corrupt/range failures and preserves network interruptions',()=>{
 const r=spawnSync('python3',[new URL('./bun-cache.test.py',import.meta.url).pathname],{encoding:'utf8'});
 assert.equal(r.status,0,r.stdout+r.stderr);
});
