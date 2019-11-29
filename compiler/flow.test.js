import { readFileSync, writeFileSync } from 'fs';
import test from 'ava';
import { toEcmascript } from './flow';
import { toFlows } from './molecules';

test('Simple', t => {
  const molecules = JSON.parse(readFileSync('molecule-full.json', { encoding: 'utf8' }));
  const flows = toFlows(molecules);
  const js = flows.map(toEcmascript).join('\n');
  writeFileSync('molecule-full-observed.js', js);
  const observed = readFileSync('molecule-full-observed.js', { encoding: 'utf8' });
  const expected = readFileSync('molecule-full-expected.js', { encoding: 'utf8' });
  t.is(observed, expected);
});
