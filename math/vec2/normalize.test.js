import { canonicalize } from './canonicalize.js';
import { normalize } from './normalize.js';
import test from 'ava';

test('vec2: normalize() called with one paramerters should return a vec2 with correct values', (t) => {
  t.deepEqual(canonicalize(normalize([0, 0])), [0, 0]);
  t.deepEqual(canonicalize(normalize([1, 2])), [0.44721, 0.89443]);
  t.deepEqual(canonicalize(normalize([-1, -2])), [-0.44721, -0.89443]);
  t.deepEqual(canonicalize(normalize([-1, 2])), [-0.44721, 0.89443]);
});
