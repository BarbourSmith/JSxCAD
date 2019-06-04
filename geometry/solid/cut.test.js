import { canonicalize } from './canonicalize';
import { cut } from './cut';
import { fromPoints } from '@jsxcad/math-plane';
import { fromPolygons } from './fromPolygons';
import test from 'ava';
import { unitCubePolygons } from '@jsxcad/data-shape';

test('Simple', t => {
  const [front, back] = cut(fromPoints([0, 0, 0], [1, 0, 0], [0, 1, 0]),
                            fromPolygons({}, unitCubePolygons));
  t.deepEqual(canonicalize(front),
              [[[[0.5, -0.5, 0], [0.5, -0.5, 0.5], [-0.5, -0.5, 0.5], [-0.5, -0.5, 0]]], [[[-0.5, -0.5, 0], [-0.5, -0.5, 0.5], [-0.5, 0.5, 0.5], [-0.5, 0.5, 0]]], [[[-0.5, 0.5, 0], [-0.5, 0.5, 0.5], [0.5, 0.5, 0.5], [0.5, 0.5, 0]]], [[[0.5, 0.5, 0], [0.5, 0.5, 0.5], [0.5, -0.5, 0.5], [0.5, -0.5, 0]]], [[[0.5, 0.5, 0.5], [-0.5, 0.5, 0.5], [-0.5, -0.5, 0.5], [0.5, -0.5, 0.5]]], [[[-0.5, 0.5, 0], [0.5, 0.5, 0], [0.5, -0.5, 0], [-0.5, -0.5, 0]]]]);
  t.deepEqual(canonicalize(back),
              [[[[0.5, -0.5, -0.5], [-0.5, -0.5, -0.5], [-0.5, 0.5, -0.5], [0.5, 0.5, -0.5]]], [[[0.5, -0.5, -0.5], [0.5, -0.5, 0], [-0.5, -0.5, 0], [-0.5, -0.5, -0.5]]], [[[-0.5, -0.5, -0.5], [-0.5, -0.5, 0], [-0.5, 0.5, 0], [-0.5, 0.5, -0.5]]], [[[-0.5, 0.5, -0.5], [-0.5, 0.5, 0], [0.5, 0.5, 0], [0.5, 0.5, -0.5]]], [[[0.5, 0.5, -0.5], [0.5, 0.5, 0], [0.5, -0.5, 0], [0.5, -0.5, -0.5]]], [[[0.5, -0.5, 0], [0.5, 0.5, 0], [-0.5, 0.5, 0], [-0.5, -0.5, 0]]]]);
});
