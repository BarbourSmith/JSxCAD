import { readFileSync } from 'fs';
import { test } from 'ava';
import { main } from './atg-sft003';

main();

test('Expected stl', t => {
  t.is(readFileSync('tmp/atg-sft003.pdf', { encoding: 'utf8' }),
       readFileSync('atg-sft003.pdf', { encoding: 'utf8' }));
});
