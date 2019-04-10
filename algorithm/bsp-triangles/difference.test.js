import { difference } from './difference';
import { fromTranslation } from '@jsxcad/math-mat4';
import { test } from 'ava';
import { transform } from '@jsxcad/algorithm-polygons';

const cubePolygons = [[[-1, -1, -1], [-1, -1, 1], [-1, 1, 1], [-1, 1, -1]],
                      [[1, -1, -1], [1, 1, -1], [1, 1, 1], [1, -1, 1]],
                      [[-1, -1, -1], [1, -1, -1], [1, -1, 1], [-1, -1, 1]],
                      [[-1, 1, -1], [-1, 1, 1], [1, 1, 1], [1, 1, -1]],
                      [[-1, -1, -1], [-1, 1, -1], [1, 1, -1], [1, -1, -1]],
                      [[-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]]];

test('Self difference', t => {
  t.deepEqual(difference(cubePolygons, cubePolygons), []);
});

test('Overlapping difference', t => {
  const solid = difference(transform(fromTranslation([0.5, 0.5, 0.5]), cubePolygons), cubePolygons);
  t.deepEqual(solid,
              [[[-0.5, 1, 1.5], [-0.5, 1.5, -0.5], [-0.5, 1, -0.5]], [[-0.5, 1.5, -0.5], [-0.5, 1, 1.5], [-0.5, 1.5, 1.5]], [[-0.5, -0.125, 1], [-0.5, -0.5, 1], [-0.5, -0.5, 1.5]], [[-0.5, -0.125, 1], [-0.5, 1, 1.5], [-0.5, 1, 1]], [[-0.5, 1, 1.5], [-0.5, -0.125, 1], [-0.5, -0.5, 1.5]], [[1.5, -0.5, -0.5], [1.5, 1.5, -0.5], [1.5, 1.5, 1.5], [1.5, -0.5, 1.5]], [[1, -0.5, -0.5], [1.5, -0.5, 1.5], [1, -0.5, 1.5]], [[1.5, -0.5, 1.5], [1, -0.5, -0.5], [1.5, -0.5, -0.5]], [[-0.125, -0.5, 1], [-0.5, -0.5, 1.5], [-0.5, -0.5, 1]], [[-0.125, -0.5, 1], [1, -0.5, 1.5], [-0.5, -0.5, 1.5]], [[1, -0.5, 1.5], [-0.125, -0.5, 1], [1, -0.5, 1]], [[1, 1.5, 1.5], [1.5, 1.5, -0.5], [1, 1.5, -0.5]], [[1.5, 1.5, -0.5], [1, 1.5, 1.5], [1.5, 1.5, 1.5]], [[-0.5, 1.5, 1.5], [1, 1.5, -0.5], [-0.5, 1.5, -0.5]], [[1, 1.5, -0.5], [-0.5, 1.5, 1.5], [1, 1.5, 1.5]], [[1, 1.5, -0.5], [1.5, -0.5, -0.5], [1, -0.5, -0.5]], [[1.5, -0.5, -0.5], [1, 1.5, -0.5], [1.5, 1.5, -0.5]], [[-0.125, 1, -0.5], [-0.5, 1, -0.5], [-0.5, 1.5, -0.5]], [[-0.125, 1, -0.5], [1, 1.5, -0.5], [1, 1, -0.5]], [[1, 1.5, -0.5], [-0.125, 1, -0.5], [-0.5, 1.5, -0.5]], [[1, -0.5, 1.5], [1.5, 1.5, 1.5], [1, 1.5, 1.5]], [[1.5, 1.5, 1.5], [1, -0.5, 1.5], [1.5, -0.5, 1.5]], [[-0.125, 1, 1.5], [-0.5, 1.5, 1.5], [-0.5, 1, 1.5]], [[-0.125, 1, 1.5], [1, 1.5, 1.5], [-0.5, 1.5, 1.5]], [[1, 1.5, 1.5], [-0.125, 1, 1.5], [1, 1, 1.5]], [[-0.125, 1, 1.5], [-0.5, -0.5, 1.5], [1, -0.5, 1.5]], [[-0.5, -0.5, 1.5], [-0.125, 1, 1.5], [-0.5, 1, 1.5]], [[-0.125, 1, 1.5], [1, -0.5, 1.5], [1, 1, 1.5]], [[1, 0.625, -0.5], [1, -0.5, -0.5], [1, -0.5, 1]], [[1, 0.625, -0.5], [1, 1, 1], [1, 1, -0.5]], [[1, 1, 1], [1, 0.625, -0.5], [1, -0.5, 1]], [[-0.125, 1, -0.5], [1, 1, -0.5], [1, 1, 1]], [[-0.125, 1, -0.5], [-0.5, 1, 1], [-0.5, 1, -0.5]], [[-0.5, 1, 1], [-0.125, 1, -0.5], [1, 1, 1]], [[0.625, -0.5, 1], [-0.5, -0.5, 1], [-0.5, 1, 1]], [[0.625, -0.5, 1], [1, 1, 1], [1, -0.5, 1]], [[1, 1, 1], [0.625, -0.5, 1], [-0.5, 1, 1]]]);
});