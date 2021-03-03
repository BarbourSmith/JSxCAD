import { fromPointsToAlphaShapeAsSurfaceMesh } from './fromPointsToAlphaShapeAsSurfaceMesh.js';
import { fromSurfaceMeshToGraph } from './fromSurfaceMeshToGraph.js';
import { initCgal } from './getCgal.js';
import test from 'ava';

test.beforeEach(async (t) => {
  await initCgal();
});

test('FromPointsToAlphaShapeAsSurfaceMesh', (t) => {
  const points = [
    [-0.5, -0.5, -0.5],
    [-0.5, 0.5, -0.5],
    [0.5, 0.5, -0.5],
    [0.5, -0.5, -0.5],
    [-0.5, 0.5, 0.5],
    [0.5, 0.5, 0.5],
    [-0.5, -0.5, 0.5],
    [0.5, -0.5, 0.5],
  ];

  const surfaceMesh = fromPointsToAlphaShapeAsSurfaceMesh(points, 1);
  t.true(surfaceMesh.is_valid(false));
  const graph = fromSurfaceMeshToGraph(surfaceMesh);
  t.deepEqual(JSON.parse(JSON.stringify(graph)), {
    edges: [
      { point: 0, next: 2, twin: 1, facet: 0, face: 0 },
      { point: 1, next: 5, twin: 0, facet: -1, face: -1 },
      { point: 1, next: 4, twin: 3, facet: 0, face: 0 },
      { point: 2, next: 1, twin: 2, facet: -1, face: -1 },
      { point: 2, next: 0, twin: 5, facet: 0, face: 0 },
      { point: 0, next: 3, twin: 4, facet: -1, face: -1 },
      { point: 3, next: 8, twin: 7, facet: 1, face: 1 },
      { point: 4, next: 11, twin: 6, facet: -1, face: -1 },
      { point: 4, next: 10, twin: 9, facet: 1, face: 1 },
      { point: 5, next: 7, twin: 8, facet: -1, face: -1 },
      { point: 5, next: 6, twin: 11, facet: 1, face: 1 },
      { point: 3, next: 9, twin: 10, facet: -1, face: -1 },
      { point: 6, next: 14, twin: 13, facet: 2, face: 2 },
      { point: 7, next: 17, twin: 12, facet: -1, face: -1 },
      { point: 7, next: 16, twin: 15, facet: 2, face: 2 },
      { point: 8, next: 13, twin: 14, facet: -1, face: -1 },
      { point: 8, next: 12, twin: 17, facet: 2, face: 2 },
      { point: 6, next: 15, twin: 16, facet: -1, face: -1 },
      { point: 9, next: 20, twin: 19, facet: 3, face: 3 },
      { point: 10, next: 23, twin: 18, facet: -1, face: -1 },
      { point: 10, next: 22, twin: 21, facet: 3, face: 3 },
      { point: 11, next: 19, twin: 20, facet: -1, face: -1 },
      { point: 11, next: 18, twin: 23, facet: 3, face: 3 },
      { point: 9, next: 21, twin: 22, facet: -1, face: -1 },
      { point: 12, next: 26, twin: 25, facet: 4, face: 4 },
      { point: 13, next: 29, twin: 24, facet: -1, face: -1 },
      { point: 13, next: 28, twin: 27, facet: 4, face: 4 },
      { point: 14, next: 25, twin: 26, facet: -1, face: -1 },
      { point: 14, next: 24, twin: 29, facet: 4, face: 4 },
      { point: 12, next: 27, twin: 28, facet: -1, face: -1 },
      { point: 15, next: 32, twin: 31, facet: 5, face: 5 },
      { point: 16, next: 35, twin: 30, facet: -1, face: -1 },
      { point: 16, next: 34, twin: 33, facet: 5, face: 5 },
      { point: 17, next: 31, twin: 32, facet: -1, face: -1 },
      { point: 17, next: 30, twin: 35, facet: 5, face: 5 },
      { point: 15, next: 33, twin: 34, facet: -1, face: -1 },
      { point: 18, next: 38, twin: 37, facet: 6, face: 6 },
      { point: 19, next: 41, twin: 36, facet: -1, face: -1 },
      { point: 19, next: 40, twin: 39, facet: 6, face: 6 },
      { point: 20, next: 37, twin: 38, facet: -1, face: -1 },
      { point: 20, next: 36, twin: 41, facet: 6, face: 6 },
      { point: 18, next: 39, twin: 40, facet: -1, face: -1 },
      { point: 21, next: 44, twin: 43, facet: 7, face: 7 },
      { point: 22, next: 47, twin: 42, facet: -1, face: -1 },
      { point: 22, next: 46, twin: 45, facet: 7, face: 7 },
      { point: 23, next: 43, twin: 44, facet: -1, face: -1 },
      { point: 23, next: 42, twin: 47, facet: 7, face: 7 },
      { point: 21, next: 45, twin: 46, facet: -1, face: -1 },
      { point: 24, next: 50, twin: 49, facet: 8, face: 8 },
      { point: 25, next: 53, twin: 48, facet: -1, face: -1 },
      { point: 25, next: 52, twin: 51, facet: 8, face: 8 },
      { point: 26, next: 49, twin: 50, facet: -1, face: -1 },
      { point: 26, next: 48, twin: 53, facet: 8, face: 8 },
      { point: 24, next: 51, twin: 52, facet: -1, face: -1 },
      { point: 27, next: 56, twin: 55, facet: 9, face: 9 },
      { point: 28, next: 59, twin: 54, facet: -1, face: -1 },
      { point: 28, next: 58, twin: 57, facet: 9, face: 9 },
      { point: 29, next: 55, twin: 56, facet: -1, face: -1 },
      { point: 29, next: 54, twin: 59, facet: 9, face: 9 },
      { point: 27, next: 57, twin: 58, facet: -1, face: -1 },
      { point: 30, next: 62, twin: 61, facet: 10, face: 10 },
      { point: 31, next: 65, twin: 60, facet: -1, face: -1 },
      { point: 31, next: 64, twin: 63, facet: 10, face: 10 },
      { point: 32, next: 61, twin: 62, facet: -1, face: -1 },
      { point: 32, next: 60, twin: 65, facet: 10, face: 10 },
      { point: 30, next: 63, twin: 64, facet: -1, face: -1 },
      { point: 33, next: 68, twin: 67, facet: 11, face: 11 },
      { point: 34, next: 71, twin: 66, facet: -1, face: -1 },
      { point: 34, next: 70, twin: 69, facet: 11, face: 11 },
      { point: 35, next: 67, twin: 68, facet: -1, face: -1 },
      { point: 35, next: 66, twin: 71, facet: 11, face: 11 },
      { point: 33, next: 69, twin: 70, facet: -1, face: -1 },
    ],
    points: [
      [-0.5, 0.5, -0.5],
      [-0.5, 0.5, 0.5],
      [0.5, 0.5, -0.5],
      [0.5, -0.5, -0.5],
      [-0.5, 0.5, -0.5],
      [0.5, 0.5, -0.5],
      [0.5, -0.5, 0.5],
      [0.5, -0.5, -0.5],
      [0.5, 0.5, -0.5],
      [-0.5, -0.5, 0.5],
      [0.5, -0.5, -0.5],
      [0.5, -0.5, 0.5],
      [-0.5, -0.5, 0.5],
      [-0.5, 0.5, -0.5],
      [-0.5, -0.5, -0.5],
      [0.5, 0.5, 0.5],
      [0.5, -0.5, 0.5],
      [0.5, 0.5, -0.5],
      [-0.5, 0.5, -0.5],
      [-0.5, -0.5, 0.5],
      [-0.5, 0.5, 0.5],
      [0.5, -0.5, -0.5],
      [-0.5, -0.5, -0.5],
      [-0.5, 0.5, -0.5],
      [-0.5, -0.5, -0.5],
      [0.5, -0.5, -0.5],
      [-0.5, -0.5, 0.5],
      [0.5, 0.5, 0.5],
      [-0.5, 0.5, 0.5],
      [0.5, -0.5, 0.5],
      [0.5, 0.5, -0.5],
      [-0.5, 0.5, 0.5],
      [0.5, 0.5, 0.5],
      [0.5, -0.5, 0.5],
      [-0.5, 0.5, 0.5],
      [-0.5, -0.5, 0.5],
    ],
    exactPoints: [
      ['-1/2', '1/2', '-1/2'],
      ['-1/2', '1/2', '1/2'],
      ['1/2', '1/2', '-1/2'],
      ['1/2', '-1/2', '-1/2'],
      ['-1/2', '1/2', '-1/2'],
      ['1/2', '1/2', '-1/2'],
      ['1/2', '-1/2', '1/2'],
      ['1/2', '-1/2', '-1/2'],
      ['1/2', '1/2', '-1/2'],
      ['-1/2', '-1/2', '1/2'],
      ['1/2', '-1/2', '-1/2'],
      ['1/2', '-1/2', '1/2'],
      ['-1/2', '-1/2', '1/2'],
      ['-1/2', '1/2', '-1/2'],
      ['-1/2', '-1/2', '-1/2'],
      ['1/2', '1/2', '1/2'],
      ['1/2', '-1/2', '1/2'],
      ['1/2', '1/2', '-1/2'],
      ['-1/2', '1/2', '-1/2'],
      ['-1/2', '-1/2', '1/2'],
      ['-1/2', '1/2', '1/2'],
      ['1/2', '-1/2', '-1/2'],
      ['-1/2', '-1/2', '-1/2'],
      ['-1/2', '1/2', '-1/2'],
      ['-1/2', '-1/2', '-1/2'],
      ['1/2', '-1/2', '-1/2'],
      ['-1/2', '-1/2', '1/2'],
      ['1/2', '1/2', '1/2'],
      ['-1/2', '1/2', '1/2'],
      ['1/2', '-1/2', '1/2'],
      ['1/2', '1/2', '-1/2'],
      ['-1/2', '1/2', '1/2'],
      ['1/2', '1/2', '1/2'],
      ['1/2', '-1/2', '1/2'],
      ['-1/2', '1/2', '1/2'],
      ['-1/2', '-1/2', '1/2'],
    ],
    faces: [
      { plane: [0, 1, 0, -0.5], exactPlane: ['0', '1', '0', '-1/2'] },
      { plane: [0, 0, -1, -0.5], exactPlane: ['0', '0', '-1', '-1/2'] },
      {
        plane: [0.9999999999999996, 0, 0, -0.4999999999999998],
        exactPlane: [
          '2251799813685248/2251799813685249',
          '0',
          '0',
          '-1125899906842624/2251799813685249',
        ],
      },
      { plane: [0, -1, 0, -0.5], exactPlane: ['0', '-1', '0', '-1/2'] },
      {
        plane: [-0.9999999999999996, 0, 0, -0.4999999999999998],
        exactPlane: [
          '-2251799813685248/2251799813685249',
          '0',
          '0',
          '-1125899906842624/2251799813685249',
        ],
      },
      {
        plane: [0.9999999999999996, 0, 0, -0.4999999999999998],
        exactPlane: [
          '2251799813685248/2251799813685249',
          '0',
          '0',
          '-1125899906842624/2251799813685249',
        ],
      },
      {
        plane: [-0.9999999999999996, 0, 0, -0.4999999999999998],
        exactPlane: [
          '-2251799813685248/2251799813685249',
          '0',
          '0',
          '-1125899906842624/2251799813685249',
        ],
      },
      { plane: [0, 0, -1, -0.5], exactPlane: ['0', '0', '-1', '-1/2'] },
      { plane: [0, -1, 0, -0.5], exactPlane: ['0', '-1', '0', '-1/2'] },
      { plane: [0, 0, 1, -0.5], exactPlane: ['0', '0', '1', '-1/2'] },
      { plane: [0, 1, 0, -0.5], exactPlane: ['0', '1', '0', '-1/2'] },
      { plane: [0, 0, 1, -0.5], exactPlane: ['0', '0', '1', '-1/2'] },
    ],
    facets: [
      { edge: 4 },
      { edge: 10 },
      { edge: 16 },
      { edge: 22 },
      { edge: 28 },
      { edge: 34 },
      { edge: 40 },
      { edge: 46 },
      { edge: 52 },
      { edge: 58 },
      { edge: 64 },
      { edge: 70 },
    ],
    isClosed: false,
  });
});
