import { isExpected, run } from './runner.js';

import test from 'ava';

test('Expected stl', async (t) => {
  await run('mold');
  isExpected(t, 'mold/output/mold_perimeter_0.stl');
});
