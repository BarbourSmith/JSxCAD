import { canonicalize, fromPolygons } from '@jsxcad/geometry-solid';

import { boot } from '@jsxcad/sys';
import { cut } from './cut';
import test from 'ava';

// Producing duplicate paths within surfaces.

const cubePolygons = [[[-1, -1, -1], [-1, -1, 1], [-1, 1, 1], [-1, 1, -1]],
                      [[1, -1, -1], [1, 1, -1], [1, 1, 1], [1, -1, 1]],
                      [[-1, -1, -1], [1, -1, -1], [1, -1, 1], [-1, -1, 1]],
                      [[-1, 1, -1], [-1, 1, 1], [1, 1, 1], [1, 1, -1]],
                      [[-1, -1, -1], [-1, 1, -1], [1, 1, -1], [1, -1, -1]],
                      [[-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]]];

test.beforeEach(async t => { await boot(); });

test('Cut', t => {
  const solid = cut(fromPolygons({}, cubePolygons), [[[-10, -10, 0], [10, -10, 0], [10, 10, 0], [-10, 10, 0]]]);
  t.deepEqual(canonicalize(solid),
              [[[[-1, 1, -1], [-1, -1, -1], [-1, -1, 0], [-1, 1, 0]]], [[[1, -1, 0], [1, -1, -1], [1, 1, -1], [1, 1, 0]]], [[[-1, -1, 0], [-1, -1, -1], [1, -1, -1], [1, -1, 0]]], [[[1, 1, -1], [-1, 1, -1], [-1, 1, 0], [1, 1, 0]]], [[[-1, -1, -1], [-1, 1, -1], [1, 1, -1], [1, -1, -1]]], [[[1, -1, 0], [1, 1, 0], [-1, 1, 0], [-1, -1, 0]]]]);
});
