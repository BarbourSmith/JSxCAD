import { canonicalize, fromPolygons, transform } from '@jsxcad/geometry-solid';

import { boot } from '@jsxcad/sys';
import { fromTranslation } from '@jsxcad/math-mat4';
import test from 'ava';
import { union } from './union.js';

// Producing duplicate paths within surfaces.

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

test('Self union', (t) => {
  const solid = union(fromPolygons(cubePolygons), fromPolygons(cubePolygons));
  t.deepEqual(canonicalize(solid), [
    [
      [
        [-1, -1, 1],
        [1, -1, 1],
        [1, 1, 1],
      ],
      [
        [1, 1, 1],
        [-1, 1, 1],
        [-1, -1, 1],
      ],
    ],
    [
      [
        [-1, 1, 1],
        [1, 1, 1],
        [1, 1, -1],
      ],
      [
        [1, 1, -1],
        [-1, 1, -1],
        [-1, 1, 1],
      ],
    ],
    [
      [
        [1, 1, -1],
        [1, 1, 1],
        [1, -1, 1],
      ],
      [
        [1, -1, 1],
        [1, -1, -1],
        [1, 1, -1],
      ],
    ],
    [
      [
        [1, -1, -1],
        [1, -1, 1],
        [-1, -1, 1],
      ],
      [
        [-1, -1, 1],
        [-1, -1, -1],
        [1, -1, -1],
      ],
    ],
    [
      [
        [-1, 1, 1],
        [-1, 1, -1],
        [-1, -1, -1],
      ],
      [
        [-1, -1, -1],
        [-1, -1, 1],
        [-1, 1, 1],
      ],
    ],
    [
      [
        [1, -1, -1],
        [-1, -1, -1],
        [-1, 1, -1],
      ],
      [
        [-1, 1, -1],
        [1, 1, -1],
        [1, -1, -1],
      ],
    ],
  ]);
});

test('Overlapping 1 union', (t) => {
  const solid = union(
    transform(fromTranslation([0.5, 0.0, 0.0]), fromPolygons(cubePolygons)),
    fromPolygons(cubePolygons)
  );
  t.deepEqual(canonicalize(solid), [
    [
      [
        [1.5, -1, -1],
        [-1, -1, -1],
        [-1, 1, -1],
      ],
      [
        [-1, 1, -1],
        [1.5, 1, -1],
        [1.5, -1, -1],
      ],
    ],
    [
      [
        [-1, 1, -1],
        [-1, -1, -1],
        [-1, -1, 1],
      ],
      [
        [-1, -1, 1],
        [-1, 1, 1],
        [-1, 1, -1],
      ],
    ],
    [
      [
        [-1, -1, 1],
        [-1, -1, -1],
        [1.5, -1, -1],
      ],
      [
        [1.5, -1, -1],
        [1.5, -1, 1],
        [-1, -1, 1],
      ],
    ],
    [
      [
        [1.5, -1, 1],
        [1.5, -1, -1],
        [1.5, 1, -1],
      ],
      [
        [1.5, 1, -1],
        [1.5, 1, 1],
        [1.5, -1, 1],
      ],
    ],
    [
      [
        [-1, 1, 1],
        [1.5, 1, 1],
        [1.5, 1, -1],
      ],
      [
        [1.5, 1, -1],
        [-1, 1, -1],
        [-1, 1, 1],
      ],
    ],
    [
      [
        [-1, -1, 1],
        [1.5, -1, 1],
        [1.5, 1, 1],
      ],
      [
        [1.5, 1, 1],
        [-1, 1, 1],
        [-1, -1, 1],
      ],
    ],
  ]);
});

test('Overlapping union', (t) => {
  const solid = union(
    transform(fromTranslation([0.5, 0.5, 0.5]), fromPolygons(cubePolygons)),
    fromPolygons(cubePolygons)
  );
  t.deepEqual(canonicalize(solid), [
    [
      [
        [-0.5, 1.5, 1.5],
        [1.5, 1.5, 1.5],
        [1.5, 1.5, -0.5],
      ],
      [
        [1.5, 1.5, -0.5],
        [-0.5, 1.5, -0.5],
        [-0.5, 1.5, 1.5],
      ],
    ],
    [
      [
        [1.5, 1.5, -0.5],
        [1.5, 1.5, 1.5],
        [1.5, -0.5, 1.5],
      ],
      [
        [1.5, -0.5, 1.5],
        [1.5, -0.5, -0.5],
        [1.5, 1.5, -0.5],
      ],
    ],
    [
      [
        [1.5, 1.5, 1.5],
        [-0.5, 1.5, 1.5],
        [-0.5, -0.5, 1.5],
      ],
      [
        [-0.5, -0.5, 1.5],
        [1.5, -0.5, 1.5],
        [1.5, 1.5, 1.5],
      ],
    ],
    [
      [
        [-0.5, 1, 1],
        [-0.5, -0.5, 1],
        [-0.5, -0.5, 1.5],
      ],
      [
        [-0.5, 1.5, -0.5],
        [-0.5, 1, -0.5],
        [-0.5, 1, 1],
      ],
      [
        [-0.5, 1, 1],
        [-0.5, -0.5, 1.5],
        [-0.5, 1.5, 1.5],
      ],
      [
        [-0.5, 1.5, 1.5],
        [-0.5, 1.5, -0.5],
        [-0.5, 1, 1],
      ],
    ],
    [
      [
        [-1, -1, 1],
        [-1, 1, 1],
        [-1, 1, -1],
      ],
      [
        [-1, 1, -1],
        [-1, -1, -1],
        [-1, -1, 1],
      ],
    ],
    [
      [
        [-0.5, 1, 1],
        [-1, 1, 1],
        [-1, -1, 1],
      ],
      [
        [-1, -1, 1],
        [1, -1, 1],
        [1, -0.5, 1],
      ],
      [
        [-0.5, -0.5, 1],
        [-0.5, 1, 1],
        [-1, -1, 1],
      ],
      [
        [-1, -1, 1],
        [1, -0.5, 1],
        [-0.5, -0.5, 1],
      ],
    ],
    [
      [
        [1, -1, 1],
        [-1, -1, 1],
        [-1, -1, -1],
      ],
      [
        [-1, -1, -1],
        [1, -1, -1],
        [1, -1, 1],
      ],
    ],
    [
      [
        [-1, -1, -1],
        [-1, 1, -1],
        [1, 1, -1],
      ],
      [
        [1, 1, -1],
        [1, -1, -1],
        [-1, -1, -1],
      ],
    ],
    [
      [
        [-1, 1, 1],
        [-0.5, 1, 1],
        [-0.5, 1, -0.5],
      ],
      [
        [1, 1, -0.5],
        [1, 1, -1],
        [-1, 1, -1],
      ],
      [
        [-1, 1, -1],
        [-1, 1, 1],
        [-0.5, 1, -0.5],
      ],
      [
        [-0.5, 1, -0.5],
        [1, 1, -0.5],
        [-1, 1, -1],
      ],
    ],
    [
      [
        [1.5, 1.5, -0.5],
        [1.5, -0.5, -0.5],
        [1, -0.5, -0.5],
      ],
      [
        [-0.5, 1, -0.5],
        [-0.5, 1.5, -0.5],
        [1.5, 1.5, -0.5],
      ],
      [
        [1.5, 1.5, -0.5],
        [1, -0.5, -0.5],
        [1, 1, -0.5],
      ],
      [
        [1, 1, -0.5],
        [-0.5, 1, -0.5],
        [1.5, 1.5, -0.5],
      ],
    ],
    [
      [
        [1, -0.5, 1],
        [1, -0.5, -0.5],
        [1.5, -0.5, -0.5],
      ],
      [
        [1.5, -0.5, 1.5],
        [-0.5, -0.5, 1.5],
        [-0.5, -0.5, 1],
      ],
      [
        [1, -0.5, 1],
        [1.5, -0.5, -0.5],
        [1.5, -0.5, 1.5],
      ],
      [
        [1.5, -0.5, 1.5],
        [-0.5, -0.5, 1],
        [1, -0.5, 1],
      ],
    ],
    [
      [
        [1, 1, -1],
        [1, 1, -0.5],
        [1, -0.5, -0.5],
      ],
      [
        [1, -0.5, -0.5],
        [1, -0.5, 1],
        [1, -1, 1],
      ],
      [
        [1, -1, -1],
        [1, 1, -1],
        [1, -0.5, -0.5],
      ],
      [
        [1, -0.5, -0.5],
        [1, -1, 1],
        [1, -1, -1],
      ],
    ],
  ]);
});
