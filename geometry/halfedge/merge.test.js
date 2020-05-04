import { createNormalize3 } from '@jsxcad/algorithm-quantize';
import fromPolygons from './fromPolygons';
import merge from './merge';
import test from 'ava';
import toPolygons from './toPolygons';

test('Simple merge', t => {
  const normalize = createNormalize3();
  const loops = fromPolygons(
    [[
      [1, 1, 0], // A (common)
      [1, -1, 0], // B
      [-1, -1, 0] // C (common)
    ],
     [
       [-1, -1, 0], // C (common)
       [-1, 1, 0], // D
       [1, 1, 0] // A (common)
     ]],
    normalize);
  const merged = merge(loops);
  const polygons = toPolygons(merged);
  t.deepEqual(polygons,
              [[
                [-1, -1, 0], // C
                [-1, 1, 0], // D
                [1, 1, 0], // A
                [1, -1, 0] // B
              ]]);
});

test('Double-edge merge', t => {
  const normalize = createNormalize3();
  const loops = fromPolygons(
    [[
      [1, 1, 0], // A (common)
      [1, -1, 0], // B
      [-1, -1, 0], // C (common)
      [0, 0, 0] // E (common interstitial)
    ],
     [
       [-1, -1, 0], // C (common)
       [-1, 1, 0], // D
       [1, 1, 0], // A (common)
       [0, 0, 0] // E (common interstitial)
     ]],
    normalize);
  const merged = merge(loops);
  const polygons = toPolygons(merged);
  t.deepEqual(polygons,
              [[
                [1, 1, 0], // A
                [1, -1, 0], // B
                [-1, -1, 0], // C
                [-1, 1, 0] // D
              ]]);
});

test('Triple-edge merge', t => {
  const normalize = createNormalize3();
  const loops = fromPolygons(
    [[
      [1, 1, 0], // A (common)
      [1, -1, 0], // B
      [-1, -1, 0], // C (common)
      [0, 0, 0], // E (common interstitial)
      [0.5, 0.5, 0] // F (common interstitial)
    ],
     [
       [-1, -1, 0], // C (common)
       [-1, 1, 0], // D
       [1, 1, 0], // A (common)
       [0.5, 0.5, 0], // F (common interstitial)
       [0, 0, 0] // E (common interstitial)
     ]],
    normalize);
  const merged = merge(loops);
  const polygons = toPolygons(merged);
  t.deepEqual(polygons,
              [[
                [1, 1, 0], // A
                [1, -1, 0], // B
                [-1, -1, 0], // C
                [-1, 1, 0] // D
              ]]);
});

test('Bad', t => {
  const normalize = createNormalize3();
  const loops = fromPolygons(
    [[[-5.000000000000002, -4.999999999999999, -5], [2.4899999999999993, 2.4899999999999993, -5], [2.4899999999999993, 2.2399999999999993, -5], [2.4899999999999993, -5.000000000000001, -5]],
     [[2.4899999999999993, 2.4899999999999993, -5], [-5.000000000000002, -4.999999999999999, -5], [-5, 5.000000000000001, -5], [2.4899999999999993, 5, -5]],
     [[2.4899999999999993, -5.000000000000001, -5], [2.4899999999999993, 2.2399999999999993, -5], [2.4999999999999987, 2.2399999999999993, -5], [5, 2.2399999999999993, -5],
      [4.999999999999999, -5.000000000000002, -5]],
     [[2.4999999999999987, 2.2399999999999993, -5], [2.4899999999999993, 2.2399999999999993, -5], [2.4899999999999993, 2.4899999999999993, -5], [2.499999999999999, 2.499999999999999, -5],
      [2.499999999999999, 2.2500000000000004, -5]],
     [[2.4899999999999993, 5, -5], [2.4999999999999996, 5, -5], [2.499999999999999, 2.499999999999999, -5], [2.4899999999999993, 2.4899999999999993, -5]],
     [[5, 2.25, -5], [5, 2.2399999999999993, -5], [2.4999999999999987, 2.2399999999999993, -5], [2.499999999999999, 2.2500000000000004, -5]]
    ],
    normalize);
  const merged = merge(loops);
  const polygons = toPolygons(merged);
  t.deepEqual(polygons,
              [[
                [2.4899999999999993, -5.000000000000001, -5],
                [-5.000000000000002, -4.999999999999999, -5],
                [-5, 5.000000000000001, -5],
                [2.4899999999999993, 5, -5],
                [2.4999999999999996, 5, -5],
                [2.499999999999999, 2.499999999999999, -5],
                [2.499999999999999, 2.2500000000000004, -5],
                [5, 2.25, -5],
                [5, 2.2399999999999993, -5],
                [4.999999999999999, -5.000000000000002, -5]
              ]]
  );
});

test('Hole', t => {
  const normalize = createNormalize3();
  const loops = fromPolygons(
    [
      [[-5, 5.000000000000001, 0], [-5.000000000000001, -4.999999999999998, 0], [-2.500000000000001, -2.499999999999999, 0]],
      [[2.5000000000072755, -2.5, 0], [-2.500000000000001, -2.499999999999999, 0], [-5.000000000000001, -4.999999999999998, 0]],
      [[-5, 5.000000000000001, 0], [-2.500000000000001, -2.499999999999999, 0], [-2.5, 2.500000000000001, 0]],
      [[2.5000000000072755, -2.5, 0], [-5.000000000000001, -4.999999999999998, 0], [4.999999999999998, -5, 0]],
      [[5, 5, 0], [-5, 5.000000000000001, 0], [-2.5, 2.500000000000001, 0]],
      [[2.500000000007276, 2.5, 0], [2.5000000000072755, -2.5, 0], [4.999999999999998, -5, 0]],
      [[5, 5, 0], [-2.5, 2.500000000000001, 0], [2.500000000007276, 2.5, 0]],
      [[2.500000000007276, 2.5, 0], [4.999999999999998, -5, 0], [5, 5, 0]]
    ],
    normalize);
  const merged = merge(loops);
  const polygons = toPolygons(merged);
  t.deepEqual(polygons,
              [[[-5, 5.000000000000001, 0], [-5.000000000000001, -4.999999999999998, 0], [4.999999999999998, -5, 0], [5, 5, 0]], [[2.5000000000072755, -2.5, 0], [-2.500000000000001, -2.499999999999999, 0], [-2.5, 2.500000000000001, 0], [2.500000000007276, 2.5, 0]]]);
});
