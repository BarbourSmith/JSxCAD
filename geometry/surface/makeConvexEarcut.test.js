import makeConvex from './makeConvexEarcut';
import test from 'ava';

test('Bridge', t => {
  const surface = [[[-5, 5.000000000000001, 0], [-2.500000000000001, -2.499999999999999, 0], [-2.5, 2.500000000000001, 0], [2.500000000007276, 2.5, 0], [2.5000000000072755, -2.5, 0], [-2.500000000000001, -2.499999999999999, 0], [-5, 5.000000000000001, 0], [-5.000000000000001, -4.999999999999998, 0], [4.999999999999998, -5, 0], [5, 5, 0]]];
  const convexSurface = makeConvex(surface, n => n);
  console.log(`QQ: ${JSON.stringify(convexSurface)}`);
  t.deepEqual(convexSurface,
              [[[-2.500000000000001, -2.499999999999999, 0], [-5, 5.000000000000001, 0], [-5.000000000000001, -4.999999999999998, 0]], [[-5, 5.000000000000001, 0], [-2.500000000000001, -2.499999999999999, 0], [-2.5, 2.500000000000001, 0]], [[2.5000000000072755, -2.5, 0], [-2.500000000000001, -2.499999999999999, 0], [-5.000000000000001, -4.999999999999998, 0]], [[5, 5, 0], [-5, 5.000000000000001, 0], [-2.5, 2.500000000000001, 0]], [[2.5000000000072755, -2.5, 0], [-5.000000000000001, -4.999999999999998, 0], [4.999999999999998, -5, 0]], [[5, 5, 0], [-2.5, 2.500000000000001, 0], [2.500000000007276, 2.5, 0]], [[2.500000000007276, 2.5, 0], [2.5000000000072755, -2.5, 0], [4.999999999999998, -5, 0]], [[4.999999999999998, -5, 0], [5, 5, 0], [2.500000000007276, 2.5, 0]]]);
});
