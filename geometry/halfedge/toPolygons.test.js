import { createNormalize3 } from '@jsxcad/algorithm-quantize';
import fromSolid from './fromSolid';
import test from 'ava';
import toPolygons from './toPolygons';

const unitCube = [[[[0.5, -0.5, -0.5], [-0.5, -0.5, -0.5], [-0.5, 0.5, -0.5], [0.5, 0.5, -0.5]]], [[[0.5, -0.5, -0.5], [0.5, -0.5, 0.5], [-0.5, -0.5, 0.5], [-0.5, -0.5, -0.5]]], [[[-0.5, -0.5, -0.5], [-0.5, -0.5, 0.5], [-0.5, 0.5, 0.5], [-0.5, 0.5, -0.5]]], [[[-0.5, 0.5, -0.5], [-0.5, 0.5, 0.5], [0.5, 0.5, 0.5], [0.5, 0.5, -0.5]]], [[[0.5, 0.5, -0.5], [0.5, 0.5, 0.5], [0.5, -0.5, 0.5], [0.5, -0.5, -0.5]]], [[[0.5, 0.5, 0.5], [-0.5, 0.5, 0.5], [-0.5, -0.5, 0.5], [0.5, -0.5, 0.5]]]];

test('Cube mesh', t => {
  const normalize = createNormalize3();
  const loops = fromSolid(unitCube, normalize);
  const polygons = toPolygons(loops);
  t.deepEqual(polygons,
              [[[0.5, -0.5, -0.5], [-0.5, -0.5, -0.5], [-0.5, 0.5, -0.5], [0.5, 0.5, -0.5]], [[0.5, -0.5, -0.5], [0.5, -0.5, 0.5], [-0.5, -0.5, 0.5], [-0.5, -0.5, -0.5]], [[-0.5, -0.5, -0.5], [-0.5, -0.5, 0.5], [-0.5, 0.5, 0.5], [-0.5, 0.5, -0.5]], [[-0.5, 0.5, -0.5], [-0.5, 0.5, 0.5], [0.5, 0.5, 0.5], [0.5, 0.5, -0.5]], [[0.5, 0.5, -0.5], [0.5, 0.5, 0.5], [0.5, -0.5, 0.5], [0.5, -0.5, -0.5]], [[0.5, 0.5, 0.5], [-0.5, 0.5, 0.5], [-0.5, -0.5, 0.5], [0.5, -0.5, 0.5]]]);
});
