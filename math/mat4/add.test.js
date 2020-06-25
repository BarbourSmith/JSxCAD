import { add } from './add';
import test from 'ava';

test('mat4: add() should return a new mat4 with correct values', (t) => {
  const obs1 = add(
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
  );
  t.deepEqual(obs1, [
    2,
    4,
    6,
    8,
    10,
    12,
    14,
    16,
    18,
    20,
    22,
    24,
    26,
    28,
    30,
    32,
  ]);

  const obs2 = add(
    [-1, -2, -3, -4, -5, -6, -7, -8, -9, -10, -11, -12, -13, -14, -15, -16],
    [-1, -2, -3, -4, -5, -6, -7, -8, -9, -10, -11, -12, -13, -14, -15, -16]
  );
  t.deepEqual(obs2, [
    -2,
    -4,
    -6,
    -8,
    -10,
    -12,
    -14,
    -16,
    -18,
    -20,
    -22,
    -24,
    -26,
    -28,
    -30,
    -32,
  ]);

  const obs3 = add(
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
    [-1, -2, -3, -4, -5, -6, -7, -8, -9, -10, -11, -12, -13, -14, -15, -16]
  );
  t.deepEqual(obs3, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
});
