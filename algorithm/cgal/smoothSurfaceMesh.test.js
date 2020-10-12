import { fromGraphToSurfaceMesh } from './fromGraphToSurfaceMesh.js';
import { fromSurfaceMeshToGraph } from './fromSurfaceMeshToGraph.js';
import { initCgal } from './getCgal.js';
import { smoothSurfaceMesh } from './smoothSurfaceMesh.js';
import test from 'ava';

test.beforeEach(async (t) => {
  await initCgal();
});

test('FromPointsToSurfaceMesh', (t) => {
  const graph = {
    edges: [
      { point: 0, next: 42, twin: 1, loop: 0 },
      { point: 1, next: 14, twin: 0, loop: 11 },
      { point: 3, next: 4, twin: 3, loop: 9 },
      { point: 0, next: 44, twin: 2, loop: 1 },
      { point: 2, next: 43, twin: 5, loop: 9 },
      { point: 3, next: 58, twin: 4, loop: 16 },
      { point: 1, next: 0, twin: 7, loop: 0 },
      { point: 2, next: 49, twin: 6, loop: 14 },
      { point: 5, next: 10, twin: 9, loop: 10 },
      { point: 0, next: 46, twin: 8, loop: 2 },
      { point: 4, next: 45, twin: 11, loop: 10 },
      { point: 5, next: 64, twin: 10, loop: 19 },
      { point: 3, next: 3, twin: 13, loop: 1 },
      { point: 4, next: 55, twin: 12, loop: 17 },
      { point: 6, next: 47, twin: 15, loop: 11 },
      { point: 1, next: 52, twin: 14, loop: 13 },
      { point: 5, next: 9, twin: 17, loop: 2 },
      { point: 6, next: 61, twin: 16, loop: 20 },
      { point: 9, next: 20, twin: 19, loop: 3 },
      { point: 2, next: 56, twin: 18, loop: 15 },
      { point: 8, next: 48, twin: 21, loop: 3 },
      { point: 9, next: 68, twin: 20, loop: 7 },
      { point: 7, next: 24, twin: 23, loop: 12 },
      { point: 8, next: 36, twin: 22, loop: 21 },
      { point: 6, next: 50, twin: 25, loop: 12 },
      { point: 7, next: 32, twin: 24, loop: 5 },
      { point: 11, next: 28, twin: 27, loop: 4 },
      { point: 4, next: 62, twin: 26, loop: 18 },
      { point: 10, next: 54, twin: 29, loop: 4 },
      { point: 11, next: 35, twin: 28, loop: 23 },
      { point: 9, next: 19, twin: 31, loop: 15 },
      { point: 10, next: 40, twin: 30, loop: 22 },
      { point: 12, next: 60, twin: 33, loop: 5 },
      { point: 7, next: 66, twin: 32, loop: 6 },
      { point: 11, next: 27, twin: 35, loop: 18 },
      { point: 12, next: 71, twin: 34, loop: 23 },
      { point: 13, next: 67, twin: 37, loop: 21 },
      { point: 8, next: 21, twin: 36, loop: 7 },
      { point: 12, next: 33, twin: 39, loop: 6 },
      { point: 13, next: 41, twin: 38, loop: 8 },
      { point: 13, next: 69, twin: 41, loop: 22 },
      { point: 10, next: 70, twin: 40, loop: 8 },
      { point: 2, next: 6, twin: 43, loop: 0 },
      { point: 0, next: 2, twin: 42, loop: 9 },
      { point: 4, next: 12, twin: 45, loop: 1 },
      { point: 0, next: 8, twin: 44, loop: 10 },
      { point: 6, next: 16, twin: 47, loop: 2 },
      { point: 0, next: 1, twin: 46, loop: 11 },
      { point: 2, next: 18, twin: 49, loop: 3 },
      { point: 8, next: 53, twin: 48, loop: 14 },
      { point: 8, next: 22, twin: 51, loop: 12 },
      { point: 6, next: 15, twin: 50, loop: 13 },
      { point: 8, next: 51, twin: 53, loop: 13 },
      { point: 1, next: 7, twin: 52, loop: 14 },
      { point: 4, next: 26, twin: 55, loop: 4 },
      { point: 10, next: 59, twin: 54, loop: 17 },
      { point: 10, next: 30, twin: 57, loop: 15 },
      { point: 2, next: 5, twin: 56, loop: 16 },
      { point: 10, next: 57, twin: 59, loop: 16 },
      { point: 3, next: 13, twin: 58, loop: 17 },
      { point: 6, next: 25, twin: 61, loop: 5 },
      { point: 12, next: 65, twin: 60, loop: 20 },
      { point: 12, next: 34, twin: 63, loop: 18 },
      { point: 4, next: 11, twin: 62, loop: 19 },
      { point: 12, next: 63, twin: 65, loop: 19 },
      { point: 5, next: 17, twin: 64, loop: 20 },
      { point: 13, next: 38, twin: 67, loop: 6 },
      { point: 7, next: 23, twin: 66, loop: 21 },
      { point: 13, next: 37, twin: 69, loop: 7 },
      { point: 9, next: 31, twin: 68, loop: 22 },
      { point: 12, next: 39, twin: 71, loop: 8 },
      { point: 10, next: 29, twin: 70, loop: 23 },
    ],
    faces: [
      { loop: 0, plane: [0, -1, 0, 5] },
      { loop: 1, plane: [0, 0, -1, 5] },
      { loop: 2, plane: [-1, 0, 0, 5] },
      { loop: 3, plane: [3.5527136788004936e-17, 0, 1, 5] },
      { loop: 4, plane: [1, 0, 0, 5] },
      { loop: 5, plane: [0, 1, 0, 5.000000000000001] },
      {
        loop: 6,
        plane: [1, -1.7763568394002508e-16, 0, -1.776356839400251e-15],
      },
      {
        loop: 7,
        plane: [
          2.6645352591003746e-16,
          0.9999999999999999,
          0,
          8.881784197001245e-16,
        ],
      },
      { loop: 8, plane: [0, 0, 1, 0] },
      { loop: 9, plane: [0, -1, 0, 5] },
      { loop: 10, plane: [0, 0, -1, 5] },
      { loop: 11, plane: [-1, 0, 0, 5] },
      { loop: 12, plane: [0, 0, 1, 5.000000000000001] },
      { loop: 13, plane: [0, 0, 1, 5.000000000000001] },
      { loop: 14, plane: [0, 0, 1, 5] },
      { loop: 15, plane: [1, 0, 0, 5] },
      { loop: 16, plane: [1, 0, 0, 5] },
      { loop: 17, plane: [1, 0, 0, 5] },
      { loop: 18, plane: [0, 1, 0, 5] },
      { loop: 19, plane: [0, 1, 0, 5] },
      { loop: 20, plane: [0, 1, 0, 5] },
      {
        loop: 21,
        plane: [1, -1.7763568394002508e-16, 0, -1.776356839400251e-15],
      },
      { loop: 22, plane: [2.664535259100375e-16, 1, 0, 8.881784197001248e-16] },
      { loop: 23, plane: [0, 0, 1, 0] },
    ],
    loops: [
      { edge: 42, face: 0 },
      { edge: 44, face: 1 },
      { edge: 46, face: 2 },
      { edge: 48, face: 3 },
      { edge: 54, face: 4 },
      { edge: 60, face: 5 },
      { edge: 66, face: 6 },
      { edge: 68, face: 7 },
      { edge: 70, face: 8 },
      { edge: 43, face: 9 },
      { edge: 45, face: 10 },
      { edge: 47, face: 11 },
      { edge: 50, face: 12 },
      { edge: 15, face: 13 },
      { edge: 53, face: 14 },
      { edge: 56, face: 15 },
      { edge: 5, face: 16 },
      { edge: 59, face: 17 },
      { edge: 62, face: 18 },
      { edge: 11, face: 19 },
      { edge: 65, face: 20 },
      { edge: 67, face: 21 },
      { edge: 69, face: 22 },
      { edge: 71, face: 23 },
    ],
    points: [
      [-5, -5, -5],
      [-5, -5, 5],
      [5, -5, 5],
      [5, -5, -5],
      [5, 5, -5],
      [-5, 5, -5],
      [-5, 5, 5],
      [-8.881784197001252e-16, 5, 5],
      [-1.7763568394002505e-15, 8.881784197001252e-16, 5],
      [5, -4.440892098500628e-16, 5],
      [5, -4.440892098500628e-16, 0],
      [5, 5, 0],
      [-8.881784197001252e-16, 5, 0],
      [-1.7763568394002505e-15, 8.881784197001252e-16, 0],
    ],
  };
  const mesh = fromGraphToSurfaceMesh(graph);
  t.true(mesh.is_valid(false));
  t.false(mesh.is_empty());
  const smoothMesh = smoothSurfaceMesh(mesh);
  const smoothGraph = fromSurfaceMeshToGraph(smoothMesh);
  console.log(JSON.stringify(smoothGraph));
  t.true(smoothMesh.is_valid(false));
  t.false(smoothMesh.is_empty());
});
