import { fromPaths } from './fromPaths.js';
import { initCgal } from '@jsxcad/algorithm-cgal';
import { realizeGraph } from './realizeGraph.js';
import test from 'ava';

test.beforeEach(async (t) => {
  await initCgal();
});

test('fromPaths', (t) => {
  const paths = [
    {
      points: [
        [-100, 100, 0],
        [-100, -100, 0],
        [100, -100, 0],
        [100, 100, 0],
      ],
    },
    {
      points: [
        [-5, 5, 0],
        [-5, -5, 0],
        [5, -5, 0],
        [5, 5, 0],
      ],
    },
    {
      points: [
        [-2, 2, 0],
        [-2, -2, 0],
        [2, -2, 0],
        [2, 2, 0],
      ],
    },
  ];
  const geometry = fromPaths({}, paths);
  t.deepEqual(JSON.parse(JSON.stringify(realizeGraph(geometry))), {
    type: 'graph',
    graph: {
      isClosed: false,
      isLazy: false,
      edges: [
        { point: 0, next: 2, twin: 1, facet: 0, face: 0 },
        { point: 1, next: 22, twin: 0, facet: 4, face: 0 },
        { point: 1, next: 4, twin: 3, facet: 0, face: 0 },
        { point: 2, next: 21, twin: 2, facet: -1, face: -1 },
        { point: 2, next: 0, twin: 5, facet: 0, face: 0 },
        { point: 0, next: 15, twin: 4, facet: 7, face: 0 },
        { point: 3, next: 8, twin: 7, facet: 1, face: 0 },
        { point: 4, next: 23, twin: 6, facet: -1, face: -1 },
        { point: 4, next: 10, twin: 9, facet: 1, face: 0 },
        { point: 1, next: 18, twin: 8, facet: 3, face: 0 },
        { point: 1, next: 6, twin: 11, facet: 1, face: 0 },
        { point: 3, next: 1, twin: 10, facet: 4, face: 0 },
        { point: 5, next: 14, twin: 13, facet: 2, face: 0 },
        { point: 6, next: 24, twin: 12, facet: 5, face: 0 },
        { point: 6, next: 16, twin: 15, facet: 2, face: 0 },
        { point: 2, next: 30, twin: 14, facet: 7, face: 0 },
        { point: 2, next: 12, twin: 17, facet: 2, face: 0 },
        { point: 5, next: 3, twin: 16, facet: -1, face: -1 },
        { point: 4, next: 20, twin: 19, facet: 3, face: 0 },
        { point: 7, next: 25, twin: 18, facet: 6, face: 0 },
        { point: 7, next: 9, twin: 21, facet: 3, face: 0 },
        { point: 1, next: 29, twin: 20, facet: -1, face: -1 },
        { point: 0, next: 11, twin: 23, facet: 4, face: 0 },
        { point: 3, next: 31, twin: 22, facet: -1, face: -1 },
        { point: 5, next: 26, twin: 25, facet: 5, face: 0 },
        { point: 4, next: 28, twin: 24, facet: 6, face: 0 },
        { point: 4, next: 13, twin: 27, facet: 5, face: 0 },
        { point: 6, next: 7, twin: 26, facet: -1, face: -1 },
        { point: 5, next: 19, twin: 29, facet: 6, face: 0 },
        { point: 7, next: 17, twin: 28, facet: -1, face: -1 },
        { point: 6, next: 5, twin: 31, facet: 7, face: 0 },
        { point: 0, next: 27, twin: 30, facet: -1, face: -1 },
        { point: 8, next: 34, twin: 33, facet: 8, face: 8 },
        { point: 9, next: 38, twin: 32, facet: 9, face: 8 },
        { point: 9, next: 36, twin: 35, facet: 8, face: 8 },
        { point: 10, next: 41, twin: 34, facet: -1, face: -1 },
        { point: 10, next: 32, twin: 37, facet: 8, face: 8 },
        { point: 8, next: 35, twin: 36, facet: -1, face: -1 },
        { point: 8, next: 40, twin: 39, facet: 9, face: 8 },
        { point: 11, next: 37, twin: 38, facet: -1, face: -1 },
        { point: 11, next: 33, twin: 41, facet: 9, face: 8 },
        { point: 9, next: 39, twin: 40, facet: -1, face: -1 },
      ],
      points: [
        [-5, -5, 0],
        [-100, 100, 0],
        [-100, -100, 0],
        [-5, 5, 0],
        [5, 5, 0],
        [100, -100, 0],
        [5, -5, 0],
        [100, 100, 0],
        [2, -2, 0],
        [-2, 2, 0],
        [-2, -2, 0],
        [2, 2, 0],
      ],
      exactPoints: [
        ['-5', '-5', '0'],
        ['-100', '100', '0'],
        ['-100', '-100', '0'],
        ['-5', '5', '0'],
        ['5', '5', '0'],
        ['100', '-100', '0'],
        ['5', '-5', '0'],
        ['100', '100', '0'],
        ['2', '-2', '0'],
        ['-2', '2', '0'],
        ['-2', '-2', '0'],
        ['2', '2', '0'],
      ],
      faces: [
        { plane: [0, 0, 1, 0], exactPlane: ['0', '0', '19000', '0'] },
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        { plane: [0, 0, 1, 0], exactPlane: ['0', '0', '16', '0'] },
      ],
      facets: [
        { edge: 4 },
        { edge: 10 },
        { edge: 16 },
        { edge: 20 },
        { edge: 22 },
        { edge: 26 },
        { edge: 28 },
        { edge: 30 },
        { edge: 36 },
        { edge: 40 },
      ],
    },
  });
});
