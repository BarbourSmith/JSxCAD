import { isExpected, run } from './run';

import test from 'ava';

test('Expected stl', async (t) => {
  await run('text');
  isExpected(t, 'text/output/stl/text.stl');
  isExpected(t, 'text/output/pdf/text.pdf');
});
