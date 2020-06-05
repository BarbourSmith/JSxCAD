import { unitCubePolygons, unitGeodesicSphere20Polygons } from '@jsxcad/data-shape';

import { boot } from '@jsxcad/sys';
import { buildConvexMinkowskiSum } from './buildConvexMinkowskiSum';
import { canonicalize } from '@jsxcad/geometry-tagged';
import test from 'ava';
import { toPoints } from '@jsxcad/geometry-surface';

test.beforeEach(async t => { await boot(); });

test('Minkowski sum of a cube and a sphere.', t => {
  const solid = buildConvexMinkowskiSum(toPoints(unitCubePolygons),
                                        toPoints(unitGeodesicSphere20Polygons));
  t.deepEqual(canonicalize(solid),
              { 'solid': [[[[-1.02573, 1.35065, 0.5], [-1.35065, 0.5, 1.02573], [-0.5, 1.02573, 1.35065]]], [[[-0.5, -1.02573, 1.35065], [0.5, -1.02573, 1.35065], [0.5, 1.02573, 1.35065]], [[0.5, 1.02573, 1.35065], [-0.5, 1.02573, 1.35065], [-0.5, -1.02573, 1.35065]]], [[[-0.5, 1.02573, 1.35065], [0.5, 1.02573, 1.35065], [1.02573, 1.35065, 0.5]], [[1.02573, 1.35065, 0.5], [-1.02573, 1.35065, 0.5], [-0.5, 1.02573, 1.35065]]], [[[1.35065, 0.5, 1.02573], [1.02573, 1.35065, 0.5], [0.5, 1.02573, 1.35065]]], [[[1.35065, 0.5, 1.02573], [0.5, 1.02573, 1.35065], [0.5, -1.02573, 1.35065]], [[0.5, -1.02573, 1.35065], [1.35065, -0.5, 1.02573], [1.35065, 0.5, 1.02573]]], [[[1.02573, -1.35065, 0.5], [1.35065, -0.5, 1.02573], [0.5, -1.02573, 1.35065]]], [[[1.02573, -1.35065, 0.5], [0.5, -1.02573, 1.35065], [-0.5, -1.02573, 1.35065]], [[-0.5, -1.02573, 1.35065], [-1.02573, -1.35065, 0.5], [1.02573, -1.35065, 0.5]]], [[[-1.35065, -0.5, 1.02573], [-1.02573, -1.35065, 0.5], [-0.5, -1.02573, 1.35065]]], [[[-0.5, -1.02573, 1.35065], [-0.5, 1.02573, 1.35065], [-1.35065, 0.5, 1.02573]], [[-1.35065, 0.5, 1.02573], [-1.35065, -0.5, 1.02573], [-0.5, -1.02573, 1.35065]]], [[[-1.35065, -0.5, 1.02573], [-1.35065, 0.5, 1.02573], [-1.35065, 0.5, -1.02573]], [[-1.35065, 0.5, -1.02573], [-1.35065, -0.5, -1.02573], [-1.35065, -0.5, 1.02573]]], [[[-1.35065, 0.5, 1.02573], [-1.02573, 1.35065, 0.5], [-1.02573, 1.35065, -0.5]], [[-1.02573, 1.35065, -0.5], [-1.35065, 0.5, -1.02573], [-1.35065, 0.5, 1.02573]]], [[[-1.02573, 1.35065, 0.5], [1.02573, 1.35065, 0.5], [1.02573, 1.35065, -0.5]], [[1.02573, 1.35065, -0.5], [-1.02573, 1.35065, -0.5], [-1.02573, 1.35065, 0.5]]], [[[1.02573, 1.35065, -0.5], [1.02573, 1.35065, 0.5], [1.35065, 0.5, 1.02573]], [[1.35065, 0.5, 1.02573], [1.35065, 0.5, -1.02573], [1.02573, 1.35065, -0.5]]], [[[1.35065, 0.5, -1.02573], [1.35065, 0.5, 1.02573], [1.35065, -0.5, 1.02573]], [[1.35065, -0.5, 1.02573], [1.35065, -0.5, -1.02573], [1.35065, 0.5, -1.02573]]], [[[1.35065, -0.5, -1.02573], [1.35065, -0.5, 1.02573], [1.02573, -1.35065, 0.5]], [[1.02573, -1.35065, 0.5], [1.02573, -1.35065, -0.5], [1.35065, -0.5, -1.02573]]], [[[1.02573, -1.35065, -0.5], [1.02573, -1.35065, 0.5], [-1.02573, -1.35065, 0.5]], [[-1.02573, -1.35065, 0.5], [-1.02573, -1.35065, -0.5], [1.02573, -1.35065, -0.5]]], [[[-1.35065, -0.5, 1.02573], [-1.35065, -0.5, -1.02573], [-1.02573, -1.35065, -0.5]], [[-1.02573, -1.35065, -0.5], [-1.02573, -1.35065, 0.5], [-1.35065, -0.5, 1.02573]]], [[[-1.02573, -1.35065, -0.5], [-1.35065, -0.5, -1.02573], [-0.5, -1.02573, -1.35065]]], [[[-1.35065, -0.5, -1.02573], [-1.35065, 0.5, -1.02573], [-0.5, 1.02573, -1.35065]], [[-0.5, 1.02573, -1.35065], [-0.5, -1.02573, -1.35065], [-1.35065, -0.5, -1.02573]]], [[[-1.35065, 0.5, -1.02573], [-1.02573, 1.35065, -0.5], [-0.5, 1.02573, -1.35065]]], [[[-1.02573, 1.35065, -0.5], [1.02573, 1.35065, -0.5], [0.5, 1.02573, -1.35065]], [[0.5, 1.02573, -1.35065], [-0.5, 1.02573, -1.35065], [-1.02573, 1.35065, -0.5]]], [[[1.02573, 1.35065, -0.5], [1.35065, 0.5, -1.02573], [0.5, 1.02573, -1.35065]]], [[[1.35065, 0.5, -1.02573], [1.35065, -0.5, -1.02573], [0.5, -1.02573, -1.35065]], [[0.5, -1.02573, -1.35065], [0.5, 1.02573, -1.35065], [1.35065, 0.5, -1.02573]]], [[[1.35065, -0.5, -1.02573], [1.02573, -1.35065, -0.5], [0.5, -1.02573, -1.35065]]], [[[1.02573, -1.35065, -0.5], [-1.02573, -1.35065, -0.5], [-0.5, -1.02573, -1.35065]], [[-0.5, -1.02573, -1.35065], [0.5, -1.02573, -1.35065], [1.02573, -1.35065, -0.5]]], [[[0.5, 1.02573, -1.35065], [0.5, -1.02573, -1.35065], [-0.5, -1.02573, -1.35065]], [[-0.5, -1.02573, -1.35065], [-0.5, 1.02573, -1.35065], [0.5, 1.02573, -1.35065]]]] });
});
