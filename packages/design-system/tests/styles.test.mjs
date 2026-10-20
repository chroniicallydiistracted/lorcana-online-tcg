import test from 'node:test';
import assert from 'node:assert/strict';
import { checkCss, checkSource, checkStyles, knownVariables } from '../scripts/check-styles.mjs';

test('design-system and web styling use tokens; every raw value is a documented exception', () => {
  const { problems, scanned, exceptions } = checkStyles();
  assert.deepEqual(problems, []);
  assert.ok(scanned > 100);
  assert.ok(exceptions.every(entry => /: \S/.test(entry)));
});
const known = knownVariables();
const problems = css => checkCss(css, 'fixture.css', known).problems;
test('raw colours, fonts, sizes, shadows, radii, durations and !important are rejected', () => {
  assert.match(problems('.a { color: #333; }').join(), /raw colour/);
  assert.match(problems('.a { background: rgb(0 0 0); }').join(), /raw colour/);
  assert.match(problems('.a { border-color: white; }').join(), /named colour/);
  assert.match(problems('.a { font-family: Arial; }').join(), /raw font-family/);
  assert.match(problems('.a { font-size: 13px; }').join(), /raw font-size/);
  assert.match(problems('.a { box-shadow: 0 1px 2px black; }').join(), /raw box-shadow/);
  assert.match(problems('.a { border-radius: 6px; }').join(), /raw radius/);
  assert.match(problems('.a { transition: color 150ms ease; }').join(), /raw duration/);
  assert.match(problems('.a { padding: 10px; }').join(), /raw length/);
  assert.match(problems('.a { color: var(--is-color-text-primary) !important; }').join(), /!important/);
});
test('unknown and primitive-only tokens are rejected; components see only emitted tokens', () => {
  assert.match(problems('.a { color: var(--is-color-neutral-77); }').join(), /unknown token/);
  assert.match(problems('.a { gap: var(--is-space-5); }').join(), /unknown token/);
  assert.deepEqual(problems('.a { color: var(--is-color-text-primary); gap: var(--is-space-4); }'), []);
});
test('system colours are allowed only inside forced-colors blocks', () => {
  assert.match(problems('.a { border-color: ButtonText; }').join(), /system colour outside forced-colors/);
  assert.deepEqual(problems('@media (forced-colors: active) {\n  .a { border-color: ButtonText; }\n}'), []);
});
test('a same-line token-exception documents a deliberate raw value', () => {
  const result = checkCss('.a { z-index: 100; /* token-exception: overlay stacking */ }', 'fixture.css', known);
  assert.deepEqual(result.problems, []);
  assert.deepEqual(result.exceptions, ['fixture.css:1: overlay stacking']);
});
test('source files cannot embed raw colours or inline font families', () => {
  assert.equal(checkSource("const c = '#ff0000';", 'x.tsx').length, 1);
  assert.equal(checkSource('style={{ fontFamily: "x" }}', 'x.tsx').length, 1);
});
