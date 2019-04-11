import { difference } from './difference';
import { fromTranslation } from '@jsxcad/math-mat4';
import { test } from 'ava';
import { fromPolygons, transform } from '@jsxcad/algorithm-solid';

const cubePolygons = [[[-1, -1, -1], [-1, -1, 1], [-1, 1, 1], [-1, 1, -1]],
                      [[1, -1, -1], [1, 1, -1], [1, 1, 1], [1, -1, 1]],
                      [[-1, -1, -1], [1, -1, -1], [1, -1, 1], [-1, -1, 1]],
                      [[-1, 1, -1], [-1, 1, 1], [1, 1, 1], [1, 1, -1]],
                      [[-1, -1, -1], [-1, 1, -1], [1, 1, -1], [1, -1, -1]],
                      [[-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]]];

test('Self difference', t => {
  t.deepEqual(difference(fromPolygons({}, cubePolygons),
                         fromPolygons({}, cubePolygons)),
              []);
});

test('Overlapping difference', t => {
  const solid = difference(transform(fromTranslation([0.5, 0.5, 0.5]), fromPolygons({}, cubePolygons)),
                           fromPolygons({}, cubePolygons));
  t.deepEqual(solid,
              [[[[-0.5, 1, 1.5], [-0.5, 1.5, 1.5], [-0.5, 1.5, -0.5], [-0.5, 1, -0.5]]], [[[-0.5, 1, 1.5], [-0.5, 1, 1], [-0.5, -0.5, 1], [-0.5, -0.5, 1.5]]], [[[1.5, -0.5, -0.5], [1.5, 1.5, -0.5], [1.5, 1.5, 1.5], [1.5, -0.5, 1.5]]], [[[1, -0.5, -0.5], [1.5, -0.5, -0.5], [1.5, -0.5, 1.5], [1, -0.5, 1.5]]], [[[1, -0.5, 1], [1, -0.5, 1.5], [-0.5, -0.5, 1.5], [-0.5, -0.5, 1]]], [[[1, 1.5, 1.5], [1.5, 1.5, 1.5], [1.5, 1.5, -0.5], [1, 1.5, -0.5]]], [[[-0.5, 1.5, 1.5], [1, 1.5, 1.5], [1, 1.5, -0.5], [-0.5, 1.5, -0.5]]], [[[1, 1.5, -0.5], [1.5, 1.5, -0.5], [1.5, -0.5, -0.5], [1, -0.5, -0.5]]], [[[1, 1.5, -0.5], [1, 1, -0.5], [-0.5, 1, -0.5], [-0.5, 1.5, -0.5]]], [[[1, -0.5, 1.5], [1.5, -0.5, 1.5], [1.5, 1.5, 1.5], [1, 1.5, 1.5]]], [[[1, 1, 1.5], [1, 1.5, 1.5], [-0.5, 1.5, 1.5], [-0.5, 1, 1.5]]], [[[1, 1, 1.5], [-0.5, 1, 1.5], [-0.5, -0.5, 1.5], [1, -0.5, 1.5]]], [[[1, 1, 1], [1, 1, -0.5], [1, -0.5, -0.5], [1, -0.5, 1]]], [[[-0.5, 1, 1], [-0.5, 1, -0.5], [1, 1, -0.5], [1, 1, 1]]], [[[1, 1, 1], [1, -0.5, 1], [-0.5, -0.5, 1], [-0.5, 1, 1]]]]);
});
