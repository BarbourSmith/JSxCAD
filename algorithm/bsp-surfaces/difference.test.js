import { fromPolygons, toGeneric, transform } from '@jsxcad/geometry-solid';

import { difference } from './difference';
import { fromTranslation } from '@jsxcad/math-mat4';
import test from 'ava';

const cubePolygons = [[[-1, -1, -1], [-1, -1, 1], [-1, 1, 1], [-1, 1, -1]],
                      [[1, -1, -1], [1, 1, -1], [1, 1, 1], [1, -1, 1]],
                      [[-1, -1, -1], [1, -1, -1], [1, -1, 1], [-1, -1, 1]],
                      [[-1, 1, -1], [-1, 1, 1], [1, 1, 1], [1, 1, -1]],
                      [[-1, -1, -1], [-1, 1, -1], [1, 1, -1], [1, -1, -1]],
                      [[-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]]];

test('Self difference', t => {
  const solid = difference(fromPolygons({}, cubePolygons), fromPolygons({}, cubePolygons));
  t.deepEqual(toGeneric(solid),
              []);
});

test('Overlapping difference', t => {
  const solid = difference(transform(fromTranslation([0.5, 0.5, 0.5]), fromPolygons({}, cubePolygons)),
                           fromPolygons({}, cubePolygons));
  t.deepEqual(toGeneric(solid),
              [[[[1,-0.5,1],[1,1,1],[1,1,-0.5],[1,-0.5,-0.5]]],[[[-0.5,1,-0.5],[1,1,-0.5],[1,1,1],[-0.5,1,1]]],[[[-0.5,1,1],[1,1,1],[1,-0.5,1],[-0.5,-0.5,1]]],[[[1.5,-0.5,-0.5],[1.5,1.5,-0.5],[1.5,1.5,1.5],[1.5,-0.5,1.5]]],[[[-0.5,-0.5,1],[1,-0.5,1],[1,-0.5,-0.5],[1.5,-0.5,-0.5],[1.5,-0.5,1.5],[-0.5,-0.5,1.5]]],[[[-0.5,1.5,1.5],[1.5,1.5,1.5],[1.5,1.5,-0.5],[-0.5,1.5,-0.5]]],[[[-0.5,1.5,-0.5],[1.5,1.5,-0.5],[1.5,-0.5,-0.5],[1,-0.5,-0.5],[1,1,-0.5],[-0.5,1,-0.5]]],[[[-0.5,-0.5,1.5],[1.5,-0.5,1.5],[1.5,1.5,1.5],[-0.5,1.5,1.5]]],[[[-0.5,-0.5,1.5],[-0.5,1.5,1.5],[-0.5,1.5,-0.5],[-0.5,1,-0.5],[-0.5,1,1],[-0.5,-0.5,1]]]]);
});
