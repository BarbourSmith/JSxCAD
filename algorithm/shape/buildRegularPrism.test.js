import { canonicalize, toKeptGeometry } from '@jsxcad/geometry-tagged';

import { buildRegularPrism } from './buildRegularPrism';
import test from 'ava';

test('A simple triangular prism', t => {
  const geometry = toKeptGeometry(buildRegularPrism(3));
  t.deepEqual(canonicalize(geometry),
              { 'solid': [[[[-0.5, -0.86603, -0.5], [-0.5, -0.86603, 0.5], [-0.5, 0.86603, 0.5]], [[-0.5, -0.86603, -0.5], [-0.5, 0.86603, 0.5], [-0.5, 0.86603, -0.5]]], [[[-0.5, 0.86603, -0.5], [-0.5, 0.86603, 0.5], [1, 0, 0.5]], [[-0.5, 0.86603, -0.5], [1, 0, 0.5], [1, 0, -0.5]]], [[[1, 0, -0.5], [1, 0, 0.5], [-0.5, -0.86603, 0.5]], [[1, 0, -0.5], [-0.5, -0.86603, 0.5], [-0.5, -0.86603, -0.5]]], [[[1, 0, 0.5], [-0.5, 0.86603, 0.5], [-0.5, -0.86603, 0.5]]], [[[-0.5, -0.86603, -0.5], [-0.5, 0.86603, -0.5], [1, 0, -0.5]]]] });
});
