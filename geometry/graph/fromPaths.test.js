import { fromPaths } from './fromPaths.js';
import { initCgal } from '@jsxcad/algorithm-cgal';
import test from 'ava';

test.beforeEach(async (t) => {
  await initCgal();
});

test('fromPaths', (t) => {
  const paths = [
    [
      [-100, 100, 0],
      [-100, -100, 0],
      [100, -100, 0],
      [100, 100, 0],
    ],
    [
      [-5, 5, 0],
      [-5, -5, 0],
      [5, -5, 0],
      [5, 5, 0],
    ],
    [
      [-2, 2, 0],
      [-2, -2, 0],
      [2, -2, 0],
      [2, 2, 0],
    ],
  ];
  const graph = fromPaths(paths);
  t.deepEqual(graph, {
    points: [
      [100, 100, 0],
      [-100, 100, 0],
      [-100, -100, 0],
      [100, -100, 0],
      [-5, -5, 0],
      [-5, 5, 0],
      [5, 5, 0],
      [5, -5, 0],
      [2, 2, 0],
      [-2, 2, 0],
      [-2, -2, 0],
      [2, -2, 0],
    ],
    edges: [
      { point: 0, loop: 0, twin: -1, next: 1 },
      { point: 1, loop: 0, twin: -1, next: 2 },
      { point: 2, loop: 0, twin: -1, next: 3 },
      { point: 3, loop: 0, twin: -1, next: 0 },
      { point: 4, loop: 1, twin: -1, next: 5 },
      { point: 5, loop: 1, twin: -1, next: 6 },
      { point: 6, loop: 1, twin: -1, next: 7 },
      { point: 7, loop: 1, twin: -1, next: 4 },
      { point: 8, loop: 2, twin: -1, next: 9 },
      { point: 9, loop: 2, twin: -1, next: 10 },
      { point: 10, loop: 2, twin: -1, next: 11 },
      { point: 11, loop: 2, twin: -1, next: 8 },
    ],
    loops: [
      { edge: 0, face: 0 },
      { edge: 4, face: 0 },
      { edge: 8, face: 1 },
    ],
    faces: [
      { plane: [0, 0, 1, 0], loop: 0, holes: [1] },
      { plane: [0, 0, 1, 0], loop: 2 },
    ],
    isClosed: false,
    isOutline: true,
    isWireframe: true,
  });
});