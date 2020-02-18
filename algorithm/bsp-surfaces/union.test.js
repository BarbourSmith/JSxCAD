import { canonicalize, fromPolygons, transform } from '@jsxcad/geometry-solid';

import { boot } from '@jsxcad/sys';
import { fromTranslation } from '@jsxcad/math-mat4';
import test from 'ava';
import { union } from './union';

// Producing duplicate paths within surfaces.

const cubePolygons = [[[-1, -1, -1], [-1, -1, 1], [-1, 1, 1], [-1, 1, -1]],
                      [[1, -1, -1], [1, 1, -1], [1, 1, 1], [1, -1, 1]],
                      [[-1, -1, -1], [1, -1, -1], [1, -1, 1], [-1, -1, 1]],
                      [[-1, 1, -1], [-1, 1, 1], [1, 1, 1], [1, 1, -1]],
                      [[-1, -1, -1], [-1, 1, -1], [1, 1, -1], [1, -1, -1]],
                      [[-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]]];

test.beforeEach(async t => { await boot(); });

test('Self union', t => {
  const solid = union(fromPolygons({}, cubePolygons),
                      fromPolygons({}, cubePolygons));
  t.deepEqual(canonicalize(solid),
              [[[[-1, 1, -1], [-1, 1, 1], [1, 1, 1]], [[1, 1, 1], [1, 1, -1], [-1, 1, -1]]], [[[1, -1, 1], [-1, -1, 1], [-1, -1, -1]], [[-1, -1, -1], [1, -1, -1], [1, -1, 1]]], [[[-1, -1, -1], [-1, 1, -1], [1, 1, -1]], [[1, 1, -1], [1, -1, -1], [-1, -1, -1]]], [[[1, 1, 1], [1, -1, 1], [1, -1, -1]], [[1, -1, -1], [1, 1, -1], [1, 1, 1]]], [[[1, 1, 1], [-1, 1, 1], [-1, -1, 1]], [[-1, -1, 1], [1, -1, 1], [1, 1, 1]]], [[[-1, -1, -1], [-1, -1, 1], [-1, 1, 1]], [[-1, 1, 1], [-1, 1, -1], [-1, -1, -1]]]]);
});

test('Overlapping 1 union', t => {
  const solid = union(transform(fromTranslation([0.5, 0.0, 0.0]), fromPolygons({}, cubePolygons)),
                      fromPolygons({}, cubePolygons));
  t.deepEqual(canonicalize(solid),
              [[[[1.5, 1, 1], [1.5, -1, 1], [1.5, -1, -1]], [[1.5, -1, -1], [1.5, 1, -1], [1.5, 1, 1]]], [[[-1, -1, -1], [1.5, -1, -1], [1.5, -1, 1]], [[1.5, -1, 1], [-1, -1, 1], [-1, -1, -1]]], [[[1.5, 1, -1], [-1, 1, -1], [-1, 1, 1]], [[-1, 1, 1], [1.5, 1, 1], [1.5, 1, -1]]], [[[1.5, -1, -1], [-1, -1, -1], [-1, 1, -1]], [[-1, 1, -1], [1.5, 1, -1], [1.5, -1, -1]]], [[[-1, -1, 1], [1.5, -1, 1], [1.5, 1, 1]], [[1.5, 1, 1], [-1, 1, 1], [-1, -1, 1]]], [[[-1, -1, -1], [-1, -1, 1], [-1, 1, 1]], [[-1, 1, 1], [-1, 1, -1], [-1, -1, -1]]]]);
});

test('Overlapping union', t => {
  const solid = union(transform(fromTranslation([0.5, 0.5, 0.5]), fromPolygons({}, cubePolygons)),
                      fromPolygons({}, cubePolygons));
  t.deepEqual(canonicalize(solid),
              [[[[-0.5, 1.5, 1.5], [-0.5, 1.5, -0.5], [-0.5, 1, -0.5]], [[-0.5, 1, 1], [-0.5, -0.5, 1], [-0.5, -0.5, 1.5]], [[-0.5, 1.5, 1.5], [-0.5, 1, -0.5], [-0.5, 1, 1]], [[-0.5, 1, 1], [-0.5, -0.5, 1.5], [-0.5, 1.5, 1.5]]], [[[1.5, 1.5, -0.5], [1.5, 1.5, 1.5], [1.5, -0.5, 1.5]], [[1.5, -0.5, 1.5], [1.5, -0.5, -0.5], [1.5, 1.5, -0.5]]], [[[1, -0.5, 1], [1, -0.5, -0.5], [1.5, -0.5, -0.5]], [[1.5, -0.5, 1.5], [-0.5, -0.5, 1.5], [-0.5, -0.5, 1]], [[1, -0.5, 1], [1.5, -0.5, -0.5], [1.5, -0.5, 1.5]], [[1.5, -0.5, 1.5], [-0.5, -0.5, 1], [1, -0.5, 1]]], [[[1.5, 1.5, -0.5], [-0.5, 1.5, -0.5], [-0.5, 1.5, 1.5]], [[-0.5, 1.5, 1.5], [1.5, 1.5, 1.5], [1.5, 1.5, -0.5]]], [[[1.5, 1.5, 1.5], [-0.5, 1.5, 1.5], [-0.5, -0.5, 1.5]], [[-0.5, -0.5, 1.5], [1.5, -0.5, 1.5], [1.5, 1.5, 1.5]]], [[[1.5, -0.5, -0.5], [1, -0.5, -0.5], [1, 1, -0.5]], [[1, 1, -0.5], [-0.5, 1, -0.5], [-0.5, 1.5, -0.5]], [[1.5, 1.5, -0.5], [1.5, -0.5, -0.5], [1, 1, -0.5]], [[1, 1, -0.5], [-0.5, 1.5, -0.5], [1.5, 1.5, -0.5]]], [[[-1, -1, -1], [-1, -1, 1], [-1, 1, 1]], [[-1, 1, 1], [-1, 1, -1], [-1, -1, -1]]], [[[1, 1, -1], [1, 1, -0.5], [1, -0.5, -0.5]], [[1, -0.5, -0.5], [1, -0.5, 1], [1, -1, 1]], [[1, -1, -1], [1, 1, -1], [1, -0.5, -0.5]], [[1, -0.5, -0.5], [1, -1, 1], [1, -1, -1]]], [[[1, -1, -1], [1, -1, 1], [-1, -1, 1]], [[-1, -1, 1], [-1, -1, -1], [1, -1, -1]]], [[[-0.5, 1, -0.5], [1, 1, -0.5], [1, 1, -1]], [[-1, 1, -1], [-1, 1, 1], [-0.5, 1, 1]], [[-0.5, 1, -0.5], [1, 1, -1], [-1, 1, -1]], [[-1, 1, -1], [-0.5, 1, 1], [-0.5, 1, -0.5]]], [[[-1, -1, -1], [-1, 1, -1], [1, 1, -1]], [[1, 1, -1], [1, -1, -1], [-1, -1, -1]]], [[[-0.5, -0.5, 1], [-0.5, 1, 1], [-1, 1, 1]], [[-1, -1, 1], [1, -1, 1], [1, -0.5, 1]], [[-0.5, -0.5, 1], [-1, 1, 1], [-1, -1, 1]], [[-1, -1, 1], [1, -0.5, 1], [-0.5, -0.5, 1]]]]);
});

test('Defective case', t => {
  const a = [[[[0.5, -0.86603, 1], [0.5, -0.86603, 2], [-0.5, -0.86603, 2]], [[0.5, -0.86603, 1], [-0.5, -0.86603, 2], [-0.5, -0.86603, 1]]], [[[-0.5, -0.86603, 1], [-0.5, -0.86603, 2], [-1, 0, 2]], [[-0.5, -0.86603, 1], [-1, 0, 2], [-1, 0, 1]]], [[[-1, 0, 1], [-1, 0, 2], [-0.5, 0.86603, 2]], [[-1, 0, 1], [-0.5, 0.86603, 2], [-0.5, 0.86603, 1]]], [[[-0.5, 0.86603, 1], [-0.5, 0.86603, 2], [0.5, 0.86603, 2]], [[-0.5, 0.86603, 1], [0.5, 0.86603, 2], [0.5, 0.86603, 1]]], [[[0.5, 0.86603, 1], [0.5, 0.86603, 2], [1, 0, 2]], [[0.5, 0.86603, 1], [1, 0, 2], [1, 0, 1]]], [[[1, 0, 1], [1, 0, 2], [0.5, -0.86603, 2]], [[1, 0, 1], [0.5, -0.86603, 2], [0.5, -0.86603, 1]]], [[[-0.5, 0.86603, 2], [-1, 0, 2], [-0.5, -0.86603, 2]], [[-0.5, -0.86603, 2], [0.5, -0.86603, 2], [1, 0, 2]], [[1, 0, 2], [0.5, 0.86603, 2], [-0.5, 0.86603, 2]], [[-0.5, 0.86603, 2], [-0.5, -0.86603, 2], [1, 0, 2]]], [[[-0.5, -0.86603, 1], [-1, 0, 1], [-0.5, 0.86603, 1]], [[-0.5, 0.86603, 1], [0.5, 0.86603, 1], [1, 0, 1]], [[1, 0, 1], [0.5, -0.86603, 1], [-0.5, -0.86603, 1]], [[-0.5, -0.86603, 1], [-0.5, 0.86603, 1], [1, 0, 1]]]];
  const b = [[[[1, -1.73205, 2], [1, -1.73205, 3], [-1, -1.73205, 3]], [[1, -1.73205, 2], [-1, -1.73205, 3], [-1, -1.73205, 2]]], [[[-1, -1.73205, 2], [-1, -1.73205, 3], [-2, 0, 3]], [[-1, -1.73205, 2], [-2, 0, 3], [-2, 0, 2]]], [[[-2, 0, 2], [-2, 0, 3], [-1, 1.73205, 3]], [[-2, 0, 2], [-1, 1.73205, 3], [-1, 1.73205, 2]]], [[[-1, 1.73205, 2], [-1, 1.73205, 3], [1, 1.73205, 3]], [[-1, 1.73205, 2], [1, 1.73205, 3], [1, 1.73205, 2]]], [[[1, 1.73205, 2], [1, 1.73205, 3], [2, 0, 3]], [[1, 1.73205, 2], [2, 0, 3], [2, 0, 2]]], [[[2, 0, 2], [2, 0, 3], [1, -1.73205, 3]], [[2, 0, 2], [1, -1.73205, 3], [1, -1.73205, 2]]], [[[-1, 1.73205, 3], [-2, 0, 3], [-1, -1.73205, 3]], [[-1, -1.73205, 3], [1, -1.73205, 3], [2, 0, 3]], [[2, 0, 3], [1, 1.73205, 3], [-1, 1.73205, 3]], [[-1, 1.73205, 3], [-1, -1.73205, 3], [2, 0, 3]]], [[[-1, -1.73205, 2], [-2, 0, 2], [-1, 1.73205, 2]], [[-1, 1.73205, 2], [1, 1.73205, 2], [2, 0, 2]], [[2, 0, 2], [1, -1.73205, 2], [-1, -1.73205, 2]], [[-1, -1.73205, 2], [-1, 1.73205, 2], [2, 0, 2]]]];
  const solid = union(a, b);
  console.log(`QQ: ${JSON.stringify(canonicalize(solid))}`);
  t.deepEqual(canonicalize(solid),
              [[[[0.5, -0.86603, 1], [0.5, -0.86603, 2], [-0.5, -0.86603, 2]], [[-0.5, -0.86603, 2], [-0.5, -0.86603, 1], [0.5, -0.86603, 1]]], [[[-1, 0, 2], [-1, 0, 1], [-0.5, -0.86603, 1]], [[-0.5, -0.86603, 1], [-0.5, -0.86603, 2], [-1, 0, 2]]], [[[-0.5, 0.86603, 2], [-0.5, 0.86603, 1], [-1, 0, 1]], [[-1, 0, 1], [-1, 0, 2], [-0.5, 0.86603, 2]]], [[[-0.5, 0.86603, 1], [-0.5, 0.86603, 2], [0.5, 0.86603, 2]], [[0.5, 0.86603, 2], [0.5, 0.86603, 1], [-0.5, 0.86603, 1]]], [[[1, 0, 2], [1, 0, 1], [0.5, 0.86603, 1]], [[0.5, 0.86603, 1], [0.5, 0.86603, 2], [1, 0, 2]]], [[[0.5, -0.86603, 2], [0.5, -0.86603, 1], [1, 0, 1]], [[1, 0, 1], [1, 0, 2], [0.5, -0.86603, 2]]], [[[1, 0, 1], [0.5, -0.86603, 1], [-0.5, -0.86603, 1]], [[-0.5, -0.86603, 1], [-1, 0, 1], [-0.5, 0.86603, 1]], [[-0.5, 0.86603, 1], [0.5, 0.86603, 1], [1, 0, 1]], [[1, 0, 1], [-0.5, -0.86603, 1], [-0.5, 0.86603, 1]]], [[[1, -1.73205, 2], [1, -1.73205, 3], [-1, -1.73205, 3]], [[-1, -1.73205, 3], [-1, -1.73205, 2], [1, -1.73205, 2]]], [[[-2, 0, 3], [-2, 0, 2], [-1, -1.73205, 2]], [[-1, -1.73205, 2], [-1, -1.73205, 3], [-2, 0, 3]]], [[[-1, 1.73205, 3], [-1, 1.73205, 2], [-2, 0, 2]], [[-2, 0, 2], [-2, 0, 3], [-1, 1.73205, 3]]], [[[-1, 1.73205, 2], [-1, 1.73205, 3], [1, 1.73205, 3]], [[1, 1.73205, 3], [1, 1.73205, 2], [-1, 1.73205, 2]]], [[[2, 0, 3], [2, 0, 2], [1, 1.73205, 2]], [[1, 1.73205, 2], [1, 1.73205, 3], [2, 0, 3]]], [[[1, -1.73205, 3], [1, -1.73205, 2], [2, 0, 2]], [[2, 0, 2], [2, 0, 3], [1, -1.73205, 3]]], [[[2, 0, 3], [1, 1.73205, 3], [-1, 1.73205, 3]], [[-1, 1.73205, 3], [-2, 0, 3], [-1, -1.73205, 3]], [[-1, -1.73205, 3], [1, -1.73205, 3], [2, 0, 3]], [[2, 0, 3], [-1, 1.73205, 3], [-1, -1.73205, 3]]], [[[2, 0, 2], [1, -1.73205, 2], [-1, -1.73205, 2]], [[-1, -1.73205, 2], [-2, 0, 2], [-1, 0, 2]], [[-0.5, 0.86603, 2], [-1, 0, 2], [-2, 0, 2]], [[-1, 1.73205, 2], [1, 1.73205, 2], [2, 0, 2]], [[-1, -1.73205, 2], [-1, 0, 2], [-0.5, -0.86603, 2]], [[-0.5, 0.86603, 2], [-2, 0, 2], [-1, 1.73205, 2]], [[-1, -1.73205, 2], [-0.5, -0.86603, 2], [0.49999, -0.86603, 2]], [[0.5, 0.86602, 2], [-0.5, 0.86603, 2], [-1, 1.73205, 2]], [[2, 0, 2], [-1, -1.73205, 2], [0.49999, -0.86603, 2]], [[0.5, 0.86602, 2], [-1, 1.73205, 2], [2, 0, 2]], [[2, 0, 2], [0.49999, -0.86603, 2], [0.5, -0.86603, 2]], [[1, 0, 2], [0.5, 0.86602, 2], [2, 0, 2]], [[2, 0, 2], [0.5, -0.86603, 2], [1, 0, 2]]]]);
});

/*
QQ/aBsp: [BRANCH plane: [0,0,-1,-1.9999] back: [BRANCH plane: [0,0,1,2.0001] back: [BRANCH plane: [-1,0,0,1.0001] back: [BRANCH plane: [1,0,0,1.0001] back: [BRANCH plane: [0,-1,0,0.86613] back: [BRANCH plane: [0,1,0,0.86613] back: [BRANCH plane: [0.8660265528314683,0.49999800978688297,0,0.8660265528314683] back: [BRANCH plane: [0,1,0,0.86603] back: [BRANCH plane: [0.8660265528314683,-0.49999800978688297,0,0.8660265528314685] back: [BRANCH plane: [-0.8660265528314685,0.49999800978688286,0,0.8660265528314683] back: [BRANCH plane: [0,0,1,2] back: [BRANCH plane: [-0.8660265528314683,-0.49999800978688297,0,0.8660265528314683] back: [BRANCH plane: [0,-1,0,0.86603] back: [IN] front: [OUT]] front: [OUT]] front: [OUT]] front: [OUT]] front: [OUT]] front: [OUT]] front: [OUT]] front: [OUT]] front: [OUT]] front: [OUT]] front: [OUT]] front: [OUT]] front: [OUT]]
QQ/bBsp: [BRANCH plane: [0,0,-1,-1.9999] back: [BRANCH plane: [0,0,1,2.0001] back: [BRANCH plane: [-1,0,0,1.0001] back: [BRANCH plane: [1,0,0,1.0001] back: [BRANCH plane: [0,-1,0,0.86613] back: [BRANCH plane: [0,1,0,0.86613] back: [BRANCH plane: [0,0,-1,-2] back: [IN] front: [OUT]] front: [OUT]] front: [OUT]] front: [OUT]] front: [OUT]] front: [OUT]] front: [OUT]]
QQ: [[[[0.5,-0.86603,1],[0.5,-0.86603,2],[-0.5,-0.86603,2]],[[-0.5,-0.86603,2],[-0.5,-0.86603,1],[0.5,-0.86603,1]]],[[[-1,0,2],[-1,0,1],[-0.5,-0.86603,1]],[[-0.5,-0.86603,1],[-0.5,-0.86603,2],[-1,0,2]]],[[[-0.5,0.86603,2],[-0.5,0.86603,1],[-1,0,1]],[[-1,0,1],[-1,0,2],[-0.5,0.86603,2]]],[[[-0.5,0.86603,1],[-0.5,0.86603,2],[0.5,0.86603,2]],[[0.5,0.86603,2],[0.5,0.86603,1],[-0.5,0.86603,1]]],[[[1,0,2],[1,0,1],[0.5,0.86603,1]],[[0.5,0.86603,1],[0.5,0.86603,2],[1,0,2]]],[[[0.5,-0.86603,2],[0.5,-0.86603,1],[1,0,1]],[[1,0,1],[1,0,2],[0.5,-0.86603,2]]],[[[1,0,1],[0.5,-0.86603,1],[-0.5,-0.86603,1]],[[-0.5,-0.86603,1],[-1,0,1],[-0.5,0.86603,1]],[[-0.5,0.86603,1],[0.5,0.86603,1],[1,0,1]],[[1,0,1],[-0.5,-0.86603,1],[-0.5,0.86603,1]]],[[[1,-1.73205,2],[1,-1.73205,3],[-1,-1.73205,3]],[[-1,-1.73205,3],[-1,-1.73205,2],[1,-1.73205,2]]],[[[-2,0,3],[-2,0,2],[-1,-1.73205,2]],[[-1,-1.73205,2],[-1,-1.73205,3],[-2,0,3]]],[[[-1,1.73205,3],[-1,1.73205,2],[-2,0,2]],[[-2,0,2],[-2,0,3],[-1,1.73205,3]]],[[[-1,1.73205,2],[-1,1.73205,3],[1,1.73205,3]],[[1,1.73205,3],[1,1.73205,2],[-1,1.73205,2]]],[[[2,0,3],[2,0,2],[1,1.73205,2]],[[1,1.73205,2],[1,1.73205,3],[2,0,3]]],[[[1,-1.73205,3],[1,-1.73205,2],[2,0,2]],[[2,0,2],[2,0,3],[1,-1.73205,3]]],[[[2,0,3],[1,1.73205,3],[-1,1.73205,3]],[[-1,1.73205,3],[-2,0,3],[-1,-1.73205,3]],[[-1,-1.73205,3],[1,-1.73205,3],[2,0,3]],[[2,0,3],[-1,1.73205,3],[-1,-1.73205,3]]],[[[2,0,2],[1,-1.73205,2],[-1,-1.73205,2]],[[-1,-1.73205,2],[-2,0,2],[-1,0,2]],[[-0.5,0.86603,2],[-1,0,2],[-2,0,2]],[[-1,1.73205,2],[1,1.73205,2],[2,0,2]],[[-1,-1.73205,2],[-1,0,2],[-0.5,-0.86603,2]],[[-0.5,0.86603,2],[-2,0,2],[-1,1.73205,2]],[[-1,-1.73205,2],[-0.5,-0.86603,2],[0.49999,-0.86603,2]],[[0.5,0.86602,2],[-0.5,0.86603,2],[-1,1.73205,2]],[[2,0,2],[-1,-1.73205,2],[0.49999,-0.86603,2]],[[0.5,0.86602,2],[-1,1.73205,2],[2,0,2]],[[2,0,2],[0.49999,-0.86603,2],[0.5,-0.86603,2]],[[1,0,2],[0.5,0.86602,2],[2,0,2]],[[2,0,2],[0.5,-0.86603,2],[1,0,2]]]]
*/
