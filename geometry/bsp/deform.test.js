import { canonicalize, fromPolygons } from '@jsxcad/geometry-solid';

import { boot } from '@jsxcad/sys';
import { deform } from './deform';
import test from 'ava';

const cubePolygons = [
  [
    [-1, -1, -1],
    [-1, -1, 1],
    [-1, 1, 1],
    [-1, 1, -1],
  ],
  [
    [1, -1, -1],
    [1, 1, -1],
    [1, 1, 1],
    [1, -1, 1],
  ],
  [
    [-1, -1, -1],
    [1, -1, -1],
    [1, -1, 1],
    [-1, -1, 1],
  ],
  [
    [-1, 1, -1],
    [-1, 1, 1],
    [1, 1, 1],
    [1, 1, -1],
  ],
  [
    [-1, -1, -1],
    [-1, 1, -1],
    [1, 1, -1],
    [1, -1, -1],
  ],
  [
    [-1, -1, 1],
    [1, -1, 1],
    [1, 1, 1],
    [-1, 1, 1],
  ],
];

test.beforeEach(async (t) => {
  await boot();
});

test('Geometric Skew', (t) => {
  const solid = deform(
    fromPolygons({}, cubePolygons),
    ([x, y, z]) => [x * z, y * z, z],
    [-1, -1, -1],
    [1, 1, 1],
    1
  );
  t.deepEqual(canonicalize(solid), [
    [
      [
        [0, 0, 0],
        [1, 1, 1],
        [1, 0, 1],
      ],
      [
        [1, -1, 1],
        [0, 0, 0],
        [1, 0, 1],
      ],
    ],
    [
      [
        [1, 0, 1],
        [1, 1, 1],
        [0, 0, 1],
      ],
      [
        [0, 0, 1],
        [1, 1, 1],
        [0, 1, 1],
      ],
      [
        [1, -1, 1],
        [1, 0, 1],
        [0, 0, 1],
      ],
      [
        [1, -1, 1],
        [0, 0, 1],
        [0, -1, 1],
      ],
      [
        [-1, 1, 1],
        [-1, 0, 1],
        [0, 0, 1],
      ],
      [
        [-1, 1, 1],
        [0, 0, 1],
        [0, 1, 1],
      ],
      [
        [0, 0, 1],
        [-1, -1, 1],
        [0, -1, 1],
      ],
      [
        [-1, 0, 1],
        [-1, -1, 1],
        [0, 0, 1],
      ],
    ],
    [
      [
        [1, 1, 1],
        [0, 0, 0],
        [0, 1, 1],
      ],
      [
        [0, 1, 1],
        [0, 0, 0],
        [-1, 1, 1],
      ],
    ],
    [
      [
        [-1, -1, -1],
        [0, 0, 0],
        [-1, 0, -1],
      ],
      [
        [0, 0, 0],
        [-1, 1, -1],
        [-1, 0, -1],
      ],
    ],
    [
      [
        [0, -1, -1],
        [0, 0, 0],
        [-1, -1, -1],
      ],
      [
        [1, -1, -1],
        [0, 0, 0],
        [0, -1, -1],
      ],
    ],
    [
      [
        [0, 0, -1],
        [-1, -1, -1],
        [-1, 0, -1],
      ],
      [
        [-1, -1, -1],
        [0, 0, -1],
        [0, -1, -1],
      ],
      [
        [0, 1, -1],
        [0, 0, -1],
        [-1, 0, -1],
      ],
      [
        [0, 1, -1],
        [-1, 0, -1],
        [-1, 1, -1],
      ],
      [
        [0, -1, -1],
        [0, 0, -1],
        [1, 0, -1],
      ],
      [
        [0, -1, -1],
        [1, 0, -1],
        [1, -1, -1],
      ],
      [
        [1, 1, -1],
        [0, 0, -1],
        [0, 1, -1],
      ],
      [
        [0, 0, -1],
        [1, 1, -1],
        [1, 0, -1],
      ],
    ],
    [
      [
        [0, -1, 1],
        [0, 0, 0],
        [1, -1, 1],
      ],
      [
        [-1, -1, 1],
        [0, 0, 0],
        [0, -1, 1],
      ],
    ],
    [
      [
        [-1, 1, -1],
        [0, 0, 0],
        [0, 1, -1],
      ],
      [
        [0, 1, -1],
        [0, 0, 0],
        [1, 1, -1],
      ],
    ],
    [
      [
        [-1, 1, 1],
        [0, 0, 0],
        [-1, 0, 1],
      ],
      [
        [0, 0, 0],
        [-1, -1, 1],
        [-1, 0, 1],
      ],
    ],
    [
      [
        [0, 0, 0],
        [1, -1, -1],
        [1, 0, -1],
      ],
      [
        [1, 1, -1],
        [0, 0, 0],
        [1, 0, -1],
      ],
    ],
  ]);
});
