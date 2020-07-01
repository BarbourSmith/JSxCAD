import clean from './clean.js';
import { createNormalize3 } from '@jsxcad/algorithm-quantize';
import fromSurface from './fromSurface.js';
import { junctionSelector } from './junction.js';
import merge from './merge.js';
import split from './split.js';
import test from 'ava';
import toPolygons from './toPolygons.js';

const solid = [
  [
    [
      [-0.010000000000000231, 0.5000000000000001, -0.010000000000000342],
      [-0.49999999999999994, 0.5000000000000001, -0.5],
      [-0.49999999999999994, 0.5000000000000001, 0.5],
      [-0.010000000000000231, 0.5000000000000001, 0.5],
    ],
    [
      [-0.49999999999999994, 0.5000000000000001, -0.5],
      [-0.010000000000000231, 0.5000000000000001, -0.010000000000000342],
      [-0.010000000000000231, 0.5000000000000001, -0.5],
    ],
    [
      [0.51, 0.5, 0.5],
      [0.5100000000000001, 0.5, 0.01000000000000012],
      [0.5000000000000001, 0.5, 1.0928757898653885e-16],
      [0.5000000000000001, 0.5, 0.5],
    ],
    [
      [0.5100000000000001, 0.5, -0.5],
      [0.5000000000000001, 0.5, -0.5],
      [0.5000000000000001, 0.5, 1.0928757898653885e-16],
      [0.5100000000000001, 0.5, 0.01000000000000012],
    ],
    [
      [1, 0.5, 0.5],
      [0.5100000000000001, 0.5, 0.01000000000000012],
      [0.51, 0.5, 0.5],
    ],
    [
      [0.5100000000000001, 0.5, 0.01000000000000012],
      [1, 0.5, 0.5],
      [1, 0.5, -0.5],
      [0.5100000000000001, 0.5, -0.5],
    ],
    [
      [-0.010000000000000231, 0.5000000000000001, 0.5],
      [5.551115123125783e-17, 0.5000000000000001, 0.5],
      [0, 0.5000000000000001, -1.1102230246251565e-16],
      [-0.010000000000000231, 0.5000000000000001, -0.010000000000000342],
    ],
    [
      [-0.010000000000000231, 0.5000000000000001, -0.5],
      [-0.010000000000000231, 0.5000000000000001, -0.010000000000000342],
      [0, 0.5000000000000001, -1.1102230246251565e-16],
      [5.551115123125783e-17, 0.5000000000000001, -0.5],
    ],
    [
      [5.551115123125783e-17, 0.5000000000000001, 0.5],
      [0.5000000000000001, 0.5, 0.5],
      [0, 0.5000000000000001, -1.1102230246251565e-16],
    ],
    [
      [0, 0.5000000000000001, -1.1102230246251565e-16],
      [0.5000000000000001, 0.5, 0.5],
      [0.5000000000000001, 0.5, 1.0928757898653885e-16],
      [0.5000000000000001, 0.5, -0.5],
      [5.551115123125783e-17, 0.5000000000000001, -0.5],
    ],
  ],
  [
    [
      [-0.49999999999999994, 0.5000000000000001, 0.5],
      [-0.010000000000000231, 0.010000000000000064, 0.5],
      [-0.010000000000000231, 0.5000000000000001, 0.5],
    ],
    [
      [-0.010000000000000231, 0.010000000000000064, 0.5],
      [-0.49999999999999994, 0.5000000000000001, 0.5],
      [-0.5000000000000002, -0.49999999999999994, 0.5],
      [-0.010000000000000231, -0.5000000000000001, 0.5],
    ],
    [
      [0.51, 0.5, 0.5],
      [0.5000000000000001, 0.5, 0.5],
      [0.49999999999999994, -1.1102230246251565e-16, 0.5],
      [0.51, -0.010000000000000231, 0.5],
    ],
    [
      [0.5100000000000001, -0.5000000000000001, 0.5],
      [0.51, -0.010000000000000231, 0.5],
      [0.49999999999999994, -1.1102230246251565e-16, 0.5],
      [0.4999999999999999, -0.5000000000000002, 0.5],
    ],
    [
      [0.51, -0.010000000000000231, 0.5],
      [0.9999999999999999, -0.5000000000000002, 0.5],
      [1, 0.5, 0.5],
      [0.51, 0.5, 0.5],
    ],
    [
      [0.9999999999999999, -0.5000000000000002, 0.5],
      [0.51, -0.010000000000000231, 0.5],
      [0.5100000000000001, -0.5000000000000001, 0.5],
    ],
    [
      [-0.010000000000000231, 0.5000000000000001, 0.5],
      [-0.010000000000000231, 0.010000000000000064, 0.5],
      [-8.153200337090993e-17, -8.673617379884035e-17, 0.5],
      [5.551115123125783e-17, 0.5000000000000001, 0.5],
    ],
    [
      [-0.010000000000000231, -0.5000000000000001, 0.5],
      [-2.220446049250313e-16, -0.49999999999999994, 0.5],
      [-8.153200337090993e-17, -8.673617379884035e-17, 0.5],
      [-0.010000000000000231, 0.010000000000000064, 0.5],
    ],
    [
      [-8.153200337090993e-17, -8.673617379884035e-17, 0.5],
      [0.4999999999999999, -0.5000000000000002, 0.5],
      [0.49999999999999994, -1.1102230246251565e-16, 0.5],
      [0.5000000000000001, 0.5, 0.5],
      [5.551115123125783e-17, 0.5000000000000001, 0.5],
    ],
    [
      [-2.220446049250313e-16, -0.49999999999999994, 0.5],
      [0.4999999999999999, -0.5000000000000002, 0.5],
      [-8.153200337090993e-17, -8.673617379884035e-17, 0.5],
    ],
  ],
  [
    [
      [-0.49999999999999994, 0.5000000000000001, 0.5],
      [-0.49999999999999994, 0.5000000000000001, -0.5],
      [-0.5000000000000002, -0.49999999999999994, -0.5],
    ],
    [
      [-0.5000000000000002, -0.49999999999999994, -0.5],
      [-0.5000000000000002, -0.49999999999999994, 0.5],
      [-0.49999999999999994, 0.5000000000000001, 0.5],
    ],
  ],
  [
    [
      [-0.010000000000000231, 0.010000000000000231, -0.5],
      [-0.49999999999999994, 0.5000000000000001, -0.5],
      [-0.010000000000000231, 0.5000000000000001, -0.5],
    ],
    [
      [-0.49999999999999994, 0.5000000000000001, -0.5],
      [-0.010000000000000231, 0.010000000000000231, -0.5],
      [-0.010000000000000231, -0.5000000000000001, -0.5],
      [-0.5000000000000002, -0.49999999999999994, -0.5],
    ],
    [
      [0.5100000000000001, 0.5, -0.5],
      [0.5100000000000001, -0.01000000000000012, -0.5],
      [0.5, 3.469446951953614e-18, -0.5],
      [0.5000000000000001, 0.5, -0.5],
    ],
    [
      [0.5, 3.469446951953614e-18, -0.5],
      [0.5100000000000001, -0.01000000000000012, -0.5],
      [0.5100000000000001, -0.5000000000000001, -0.5],
      [0.4999999999999999, -0.5000000000000002, -0.5],
    ],
    [
      [0.9999999999999999, -0.5000000000000002, -0.5],
      [0.5100000000000001, -0.01000000000000012, -0.5],
      [0.5100000000000001, 0.5, -0.5],
      [1, 0.5, -0.5],
    ],
    [
      [0.5100000000000001, -0.01000000000000012, -0.5],
      [0.9999999999999999, -0.5000000000000002, -0.5],
      [0.5100000000000001, -0.5000000000000001, -0.5],
    ],
    [
      [-1.1102230246251565e-16, 1.1102230246251565e-16, -0.5],
      [-0.010000000000000231, 0.010000000000000231, -0.5],
      [-0.010000000000000231, 0.5000000000000001, -0.5],
      [5.551115123125783e-17, 0.5000000000000001, -0.5],
    ],
    [
      [-0.010000000000000231, -0.5000000000000001, -0.5],
      [-0.010000000000000231, 0.010000000000000231, -0.5],
      [-1.1102230246251565e-16, 1.1102230246251565e-16, -0.5],
      [-2.220446049250313e-16, -0.49999999999999994, -0.5],
    ],
    [
      [0.5000000000000001, 0.5, -0.5],
      [0.5, 3.469446951953614e-18, -0.5],
      [0.4999999999999999, -0.5000000000000002, -0.5],
      [-1.1102230246251565e-16, 1.1102230246251565e-16, -0.5],
      [5.551115123125783e-17, 0.5000000000000001, -0.5],
    ],
    [
      [-1.1102230246251565e-16, 1.1102230246251565e-16, -0.5],
      [0.4999999999999999, -0.5000000000000002, -0.5],
      [-2.220446049250313e-16, -0.49999999999999994, -0.5],
    ],
  ],
  [
    [
      [-0.010000000000000231, -0.5000000000000001, 0.01000000000000012],
      [-0.5000000000000002, -0.49999999999999994, 0.5],
      [-0.5000000000000002, -0.49999999999999994, -0.5],
      [-0.010000000000000231, -0.5000000000000001, -0.5],
    ],
    [
      [-0.5000000000000002, -0.49999999999999994, 0.5],
      [-0.010000000000000231, -0.5000000000000001, 0.01000000000000012],
      [-0.010000000000000231, -0.5000000000000001, 0.5],
    ],
    [
      [0.5100000000000001, -0.5000000000000001, -0.5],
      [0.5100000000000001, -0.5000000000000001, -0.010000000000000231],
      [0.4999999999999999, -0.5000000000000001, -1.734723475976807e-18],
      [0.4999999999999999, -0.5000000000000002, -0.5],
    ],
    [
      [0.5100000000000001, -0.5000000000000001, 0.5],
      [0.4999999999999999, -0.5000000000000002, 0.5],
      [0.4999999999999999, -0.5000000000000001, -1.734723475976807e-18],
      [0.5100000000000001, -0.5000000000000001, -0.010000000000000231],
    ],
    [
      [0.9999999999999999, -0.5000000000000002, -0.5],
      [0.5100000000000001, -0.5000000000000001, -0.010000000000000231],
      [0.5100000000000001, -0.5000000000000001, -0.5],
    ],
    [
      [0.5100000000000001, -0.5000000000000001, -0.010000000000000231],
      [0.9999999999999999, -0.5000000000000002, -0.5],
      [0.9999999999999999, -0.5000000000000002, 0.5],
      [0.5100000000000001, -0.5000000000000001, 0.5],
    ],
    [
      [-0.010000000000000231, -0.5000000000000001, -0.5],
      [-2.220446049250313e-16, -0.49999999999999994, -0.5],
      [-2.220446049250313e-16, -0.5000000000000001, 1.1102230246251565e-16],
      [-0.010000000000000231, -0.5000000000000001, 0.01000000000000012],
    ],
    [
      [-0.010000000000000231, -0.5000000000000001, 0.5],
      [-0.010000000000000231, -0.5000000000000001, 0.01000000000000012],
      [-2.220446049250313e-16, -0.5000000000000001, 1.1102230246251565e-16],
      [-2.220446049250313e-16, -0.49999999999999994, 0.5],
    ],
    [
      [-2.220446049250313e-16, -0.49999999999999994, -0.5],
      [0.4999999999999999, -0.5000000000000002, -0.5],
      [-2.220446049250313e-16, -0.5000000000000001, 1.1102230246251565e-16],
    ],
    [
      [-2.220446049250313e-16, -0.5000000000000001, 1.1102230246251565e-16],
      [0.4999999999999999, -0.5000000000000002, -0.5],
      [0.4999999999999999, -0.5000000000000001, -1.734723475976807e-18],
      [0.4999999999999999, -0.5000000000000002, 0.5],
      [-2.220446049250313e-16, -0.49999999999999994, 0.5],
    ],
  ],
  [
    [
      [1, 0.5, -0.5],
      [1, 0.5, 0.5],
      [0.9999999999999999, -0.5000000000000002, 0.5],
    ],
    [
      [0.9999999999999999, -0.5000000000000002, 0.5],
      [0.9999999999999999, -0.5000000000000002, -0.5],
      [1, 0.5, -0.5],
    ],
  ],
];

test('merge/clean/split - left wall', (t) => {
  const normalize = createNormalize3();
  const surface = solid[2];
  const loops = fromSurface(surface, normalize);
  const mergedLoops = merge(loops);
  const cleanedLoops = mergedLoops.map(clean);
  const splitLoops = split(cleanedLoops);
  const polygons = toPolygons(splitLoops);
  t.deepEqual(polygons, [
    [
      [-0.5000000000000002, -0.49999999999999994, -0.5],
      [-0.5000000000000002, -0.49999999999999994, 0.5],
      [-0.49999999999999994, 0.5000000000000001, 0.5],
      [-0.49999999999999994, 0.5000000000000001, -0.5],
    ],
  ]);
});

test('merge/clean/split - front wall', (t) => {
  const normalize = createNormalize3();
  const selector = junctionSelector(solid, normalize);
  const surface = solid[4];
  const loops = fromSurface(surface, normalize);
  const mergedLoops = merge(loops);
  const cleanedLoops = mergedLoops.map(clean);
  const splitLoops = split(cleanedLoops);
  const polygons = toPolygons(splitLoops);
  t.deepEqual(polygons, [
    [
      [-2.220446049250313e-16, -0.49999999999999994, 0.5],
      [-0.010000000000000231, -0.5000000000000001, 0.5],
      [-0.5000000000000002, -0.49999999999999994, 0.5],
      [-0.5000000000000002, -0.49999999999999994, -0.5],
      [-0.010000000000000231, -0.5000000000000001, -0.5],
      [-2.220446049250313e-16, -0.49999999999999994, -0.5],
      [0.4999999999999999, -0.5000000000000002, -0.5],
      [0.5100000000000001, -0.5000000000000001, -0.5],
      [0.9999999999999999, -0.5000000000000002, -0.5],
      [0.9999999999999999, -0.5000000000000002, 0.5],
      [0.5100000000000001, -0.5000000000000001, 0.5],
      [0.4999999999999999, -0.5000000000000002, 0.5],
    ],
  ]);
  const junctions = polygons[0].map(selector);
  t.deepEqual(junctions, [
    false,
    false,
    true,
    true,
    false,
    false,
    false,
    false,
    true,
    true,
    false,
    false,
  ]);
});
