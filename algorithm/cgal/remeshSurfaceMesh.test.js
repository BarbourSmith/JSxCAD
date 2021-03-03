import { fromGraphToSurfaceMesh } from './fromGraphToSurfaceMesh.js';
import { fromSurfaceMeshToGraph } from './fromSurfaceMeshToGraph.js';
import { initCgal } from './getCgal.js';
import { remeshSurfaceMesh } from './remeshSurfaceMesh.js';
import test from 'ava';

test.beforeEach(async (t) => {
  await initCgal();
});

test('RemeshSurfaceMesh', (t) => {
  const graph = {
    edges: [
      { point: 1, next: 2, twin: 1, loop: 0 },
      { point: 0, next: 18, twin: 0, loop: 4 },
      { point: 2, next: 4, twin: 3, loop: 0 },
      { point: 1, next: 12, twin: 2, loop: 2 },
      { point: 0, next: 0, twin: 5, loop: 0 },
      { point: 2, next: 6, twin: 4, loop: 1 },
      { point: 3, next: 8, twin: 7, loop: 1 },
      { point: 2, next: 11, twin: 6, loop: 8 },
      { point: 0, next: 5, twin: 9, loop: 1 },
      { point: 3, next: 24, twin: 8, loop: 6 },
      { point: 2, next: 3, twin: 11, loop: 2 },
      { point: 4, next: 30, twin: 10, loop: 8 },
      { point: 4, next: 10, twin: 13, loop: 2 },
      { point: 1, next: 14, twin: 12, loop: 3 },
      { point: 5, next: 16, twin: 15, loop: 3 },
      { point: 1, next: 21, twin: 14, loop: 5 },
      { point: 4, next: 13, twin: 17, loop: 3 },
      { point: 5, next: 35, twin: 16, loop: 11 },
      { point: 6, next: 20, twin: 19, loop: 4 },
      { point: 0, next: 27, twin: 18, loop: 7 },
      { point: 1, next: 1, twin: 21, loop: 4 },
      { point: 6, next: 22, twin: 20, loop: 5 },
      { point: 5, next: 15, twin: 23, loop: 5 },
      { point: 6, next: 29, twin: 22, loop: 10 },
      { point: 7, next: 26, twin: 25, loop: 6 },
      { point: 3, next: 31, twin: 24, loop: 9 },
      { point: 0, next: 9, twin: 27, loop: 6 },
      { point: 7, next: 28, twin: 26, loop: 7 },
      { point: 6, next: 19, twin: 29, loop: 7 },
      { point: 7, next: 34, twin: 28, loop: 10 },
      { point: 3, next: 7, twin: 31, loop: 8 },
      { point: 4, next: 32, twin: 30, loop: 9 },
      { point: 7, next: 25, twin: 33, loop: 9 },
      { point: 4, next: 17, twin: 32, loop: 11 },
      { point: 5, next: 23, twin: 35, loop: 10 },
      { point: 7, next: 33, twin: 34, loop: 11 },
    ],
    faces: [
      { loop: 0, plane: [0, 1, 0, 0.5] },
      { loop: 1, plane: [0, 1, 0, 0.5] },
      { loop: 2, plane: [0, 0, 1, 0.5] },
      { loop: 3, plane: [0, 0, 1, 0.5] },
      { loop: 4, plane: [-1, 0, 0, 0.5] },
      { loop: 5, plane: [-1, 0, 0, 0.5] },
      { loop: 6, plane: [0, 0, -1, 0.5] },
      { loop: 7, plane: [0, 0, -1, 0.5] },
      { loop: 8, plane: [1, 0, 0, 0.5] },
      { loop: 9, plane: [1, 0, 0, 0.5] },
      { loop: 10, plane: [0, -1, 0, 0.5] },
      { loop: 11, plane: [0, -1, 0, 0.5] },
    ],
    facets: [
      { edge: 4 },
      { edge: 5 },
      { edge: 12 },
      { edge: 13 },
      { edge: 20 },
      { edge: 21 },
      { edge: 26 },
      { edge: 27 },
      { edge: 30 },
      { edge: 31 },
      { edge: 34 },
      { edge: 35 },
    ],
    points: [
      [-0.5, 0.5, -0.5],
      [-0.5, 0.5, 0.5],
      [0.5, 0.5, 0.5],
      [0.5, 0.5, -0.5],
      [0.5, -0.5, 0.5],
      [-0.5, -0.5, 0.5],
      [-0.5, -0.5, -0.5],
      [0.5, -0.5, -0.5],
    ],
    exactPoints: [
      ['-1/2', '1/2', '-1/2'],
      ['-1/2', '1/2', '1/2'],
      ['1/2', '1/2', '1/2'],
      ['1/2', '1/2', '-1/2'],
      ['1/2', '-1/2', '1/2'],
      ['-1/2', '-1/2', '1/2'],
      ['-1/2', '-1/2', '-1/2'],
      ['1/2', '-1/2', '-1/2'],
    ],
    isClosed: true,
  };
  const mesh = fromGraphToSurfaceMesh(graph);
  t.true(mesh.is_valid(false));
  t.false(mesh.is_empty());
  const remeshedMesh = remeshSurfaceMesh(mesh, { length: 0.4, angle: 10 });
  const remeshedGraph = fromSurfaceMeshToGraph(remeshedMesh);
  t.deepEqual(remeshedGraph, {
    edges: [
      { point: 24, next: 68, twin: 1, facet: 45, face: 5 },
      { point: 39, next: 206, twin: 0, facet: 58, face: 5 },
      { point: 24, next: 135, twin: 3, facet: 74, face: 0 },
      { point: 42, next: 28, twin: 2, facet: 77, face: 0 },
      { point: 23, next: 156, twin: 5, facet: 43, face: 1 },
      { point: 40, next: 202, twin: 4, facet: 1, face: 1 },
      { point: 23, next: 180, twin: 7, facet: 42, face: 0 },
      { point: 43, next: 182, twin: 6, facet: 2, face: 0 },
      { point: 21, next: 168, twin: 9, facet: 39, face: 0 },
      { point: 42, next: 190, twin: 8, facet: 3, face: 0 },
      { point: 18, next: 229, twin: 11, facet: 88, face: 6 },
      { point: 2, next: 24, twin: 10, facet: 33, face: 1 },
      { point: 21, next: 220, twin: 13, facet: 38, face: 4 },
      { point: 45, next: 170, twin: 12, facet: 4, face: 4 },
      { point: 20, next: 144, twin: 15, facet: 37, face: 5 },
      { point: 38, next: 214, twin: 14, facet: 5, face: 5 },
      { point: 20, next: 224, twin: 17, facet: 36, face: 6 },
      { point: 46, next: 166, twin: 16, facet: 6, face: 6 },
      { point: 19, next: 216, twin: 19, facet: 35, face: 4 },
      { point: 44, next: 178, twin: 18, facet: 7, face: 4 },
      { point: 19, next: 105, twin: 21, facet: 34, face: 6 },
      { point: 46, next: 283, twin: 20, facet: 92, face: 6 },
      { point: 22, next: 217, twin: 23, facet: 85, face: 4 },
      { point: 5, next: 212, twin: 22, facet: 49, face: 5 },
      { point: 18, next: 62, twin: 25, facet: 33, face: 1 },
      { point: 41, next: 194, twin: 24, facet: 61, face: 1 },
      { point: 18, next: 99, twin: 27, facet: 90, face: 6 },
      { point: 47, next: 10, twin: 26, facet: 88, face: 6 },
      { point: 24, next: 169, twin: 29, facet: 77, face: 0 },
      { point: 6, next: 0, twin: 28, facet: 45, face: 5 },
      { point: 17, next: 95, twin: 31, facet: 31, face: 0 },
      { point: 43, next: 90, twin: 30, facet: 87, face: 0 },
      { point: 25, next: 157, twin: 33, facet: 65, face: 1 },
      { point: 7, next: 208, twin: 32, facet: 46, face: 5 },
      { point: 37, next: 23, twin: 35, facet: 49, face: 5 },
      { point: 5, next: 215, twin: 34, facet: 71, face: 5 },
      { point: 26, next: 230, twin: 37, facet: 84, face: 11 },
      { point: 8, next: 86, twin: 36, facet: 12, face: 11 },
      { point: 17, next: 232, twin: 39, facet: 30, face: 11 },
      { point: 48, next: 154, twin: 38, facet: 11, face: 11 },
      { point: 15, next: 228, twin: 41, facet: 27, face: 6 },
      { point: 47, next: 158, twin: 40, facet: 32, face: 6 },
      { point: 28, next: 238, twin: 43, facet: 94, face: 6 },
      { point: 9, next: 104, twin: 42, facet: 14, face: 6 },
      { point: 15, next: 236, twin: 45, facet: 26, face: 11 },
      { point: 49, next: 146, twin: 44, facet: 40, face: 11 },
      { point: 25, next: 141, twin: 47, facet: 62, face: 1 },
      { point: 40, next: 32, twin: 46, facet: 65, face: 1 },
      { point: 30, next: 272, twin: 49, facet: 95, face: 4 },
      { point: 10, next: 122, twin: 48, facet: 16, face: 4 },
      { point: 25, next: 143, twin: 51, facet: 66, face: 5 },
      { point: 38, next: 240, twin: 50, facet: 69, face: 5 },
      { point: 22, next: 123, twin: 53, facet: 82, face: 4 },
      { point: 44, next: 22, twin: 52, facet: 85, face: 4 },
      { point: 32, next: 260, twin: 55, facet: 86, face: 0 },
      { point: 11, next: 134, twin: 54, facet: 18, face: 0 },
      { point: 22, next: 125, twin: 57, facet: 41, face: 5 },
      { point: 39, next: 120, twin: 56, facet: 70, face: 5 },
      { point: 16, next: 87, twin: 59, facet: 28, face: 11 },
      { point: 48, next: 247, twin: 58, facet: 80, face: 11 },
      { point: 34, next: 274, twin: 61, facet: 78, face: 1 },
      { point: 12, next: 140, twin: 60, facet: 20, face: 1 },
      { point: 41, next: 11, twin: 63, facet: 33, face: 1 },
      { point: 2, next: 65, twin: 62, facet: 83, face: 1 },
      { point: 16, next: 89, twin: 65, facet: 29, face: 1 },
      { point: 41, next: 84, twin: 64, facet: 83, face: 1 },
      { point: 36, next: 244, twin: 67, facet: 93, face: 5 },
      { point: 13, next: 142, twin: 66, facet: 22, face: 5 },
      { point: 39, next: 29, twin: 69, facet: 45, face: 5 },
      { point: 6, next: 57, twin: 68, facet: 70, face: 5 },
      { point: 14, next: 75, twin: 71, facet: 24, face: 11 },
      { point: 49, next: 223, twin: 70, facet: 72, face: 11 },
      { point: 14, next: 221, twin: 73, facet: 75, face: 4 },
      { point: 0, next: 152, twin: 72, facet: 54, face: 11 },
      { point: 27, next: 231, twin: 75, facet: 76, face: 11 },
      { point: 49, next: 153, twin: 74, facet: 24, face: 11 },
      { point: 31, next: 273, twin: 77, facet: 89, face: 4 },
      { point: 45, next: 177, twin: 76, facet: 25, face: 4 },
      { point: 15, next: 278, twin: 79, facet: 15, face: 6 },
      { point: 1, next: 44, twin: 78, facet: 26, face: 11 },
      { point: 49, next: 36, twin: 81, facet: 84, face: 11 },
      { point: 26, next: 45, twin: 80, facet: 40, face: 11 },
      { point: 47, next: 42, twin: 83, facet: 94, face: 6 },
      { point: 28, next: 41, twin: 82, facet: 32, face: 6 },
      { point: 16, next: 63, twin: 85, facet: 83, face: 1 },
      { point: 2, next: 148, twin: 84, facet: 50, face: 11 },
      { point: 26, next: 255, twin: 87, facet: 12, face: 11 },
      { point: 48, next: 149, twin: 86, facet: 28, face: 11 },
      { point: 35, next: 275, twin: 89, facet: 91, face: 1 },
      { point: 41, next: 201, twin: 88, facet: 29, face: 1 },
      { point: 17, next: 181, twin: 91, facet: 87, face: 0 },
      { point: 3, next: 38, twin: 90, facet: 30, face: 11 },
      { point: 48, next: 151, twin: 93, facet: 48, face: 11 },
      { point: 27, next: 39, twin: 92, facet: 11, face: 11 },
      { point: 33, next: 261, twin: 95, facet: 81, face: 0 },
      { point: 43, next: 189, twin: 94, facet: 31, face: 0 },
      { point: 18, next: 193, twin: 97, facet: 21, face: 1 },
      { point: 4, next: 164, twin: 96, facet: 9, face: 6 },
      { point: 29, next: 239, twin: 99, facet: 79, face: 6 },
      { point: 47, next: 165, twin: 98, facet: 90, face: 6 },
      { point: 41, next: 60, twin: 101, facet: 78, face: 1 },
      { point: 34, next: 25, twin: 100, facet: 61, face: 1 },
      { point: 19, next: 226, twin: 103, facet: 59, face: 4 },
      { point: 1, next: 160, twin: 102, facet: 8, face: 6 },
      { point: 28, next: 285, twin: 105, facet: 14, face: 6 },
      { point: 46, next: 161, twin: 104, facet: 34, face: 6 },
      { point: 44, next: 175, twin: 107, facet: 56, face: 4 },
      { point: 31, next: 19, twin: 106, facet: 7, face: 4 },
      { point: 20, next: 35, twin: 109, facet: 71, face: 5 },
      { point: 5, next: 16, twin: 108, facet: 36, face: 6 },
      { point: 46, next: 163, twin: 111, facet: 52, face: 6 },
      { point: 29, next: 17, twin: 110, facet: 6, face: 6 },
      { point: 38, next: 211, twin: 113, facet: 68, face: 5 },
      { point: 37, next: 15, twin: 112, facet: 5, face: 5 },
      { point: 21, next: 262, twin: 115, facet: 63, face: 0 },
      { point: 0, next: 12, twin: 114, facet: 38, face: 4 },
      { point: 45, next: 48, twin: 117, facet: 95, face: 4 },
      { point: 30, next: 13, twin: 116, facet: 4, face: 4 },
      { point: 42, next: 187, twin: 119, facet: 60, face: 0 },
      { point: 33, next: 9, twin: 118, facet: 3, face: 0 },
      { point: 22, next: 69, twin: 121, facet: 70, face: 5 },
      { point: 6, next: 172, twin: 120, facet: 47, face: 4 },
      { point: 30, next: 287, twin: 123, facet: 16, face: 4 },
      { point: 44, next: 173, twin: 122, facet: 82, face: 4 },
      { point: 37, next: 245, twin: 125, facet: 73, face: 5 },
      { point: 39, next: 213, twin: 124, facet: 41, face: 5 },
      { point: 23, next: 250, twin: 127, facet: 67, face: 1 },
      { point: 3, next: 6, twin: 126, facet: 42, face: 0 },
      { point: 43, next: 54, twin: 129, facet: 86, face: 0 },
      { point: 32, next: 7, twin: 128, facet: 2, face: 0 },
      { point: 40, next: 199, twin: 131, facet: 64, face: 1 },
      { point: 35, next: 5, twin: 130, facet: 1, face: 1 },
      { point: 24, next: 205, twin: 133, facet: 23, face: 5 },
      { point: 7, next: 184, twin: 132, facet: 0, face: 0 },
      { point: 32, next: 269, twin: 135, facet: 18, face: 0 },
      { point: 42, next: 185, twin: 134, facet: 74, face: 0 },
      { point: 39, next: 66, twin: 137, facet: 93, face: 5 },
      { point: 36, next: 1, twin: 136, facet: 58, face: 5 },
      { point: 14, next: 77, twin: 139, facet: 25, face: 4 },
      { point: 45, next: 72, twin: 138, facet: 75, face: 4 },
      { point: 34, next: 253, twin: 141, facet: 20, face: 1 },
      { point: 40, next: 197, twin: 140, facet: 62, face: 1 },
      { point: 36, next: 277, twin: 143, facet: 22, face: 5 },
      { point: 38, next: 209, twin: 142, facet: 66, face: 5 },
      { point: 38, next: 280, twin: 145, facet: 37, face: 5 },
      { point: 4, next: 51, twin: 144, facet: 69, face: 5 },
      { point: 15, next: 81, twin: 147, facet: 40, face: 11 },
      { point: 26, next: 235, twin: 146, facet: 13, face: 11 },
      { point: 16, next: 243, twin: 149, facet: 50, face: 11 },
      { point: 26, next: 58, twin: 148, facet: 28, face: 11 },
      { point: 8, next: 74, twin: 151, facet: 76, face: 11 },
      { point: 27, next: 254, twin: 150, facet: 48, face: 11 },
      { point: 14, next: 219, twin: 153, facet: 54, face: 11 },
      { point: 27, next: 70, twin: 152, facet: 24, face: 11 },
      { point: 17, next: 93, twin: 155, facet: 11, face: 11 },
      { point: 27, next: 259, twin: 154, facet: 51, face: 11 },
      { point: 40, next: 256, twin: 157, facet: 43, face: 1 },
      { point: 7, next: 47, twin: 156, facet: 65, face: 1 },
      { point: 15, next: 83, twin: 159, facet: 32, face: 6 },
      { point: 28, next: 78, twin: 158, facet: 15, face: 6 },
      { point: 19, next: 279, twin: 161, facet: 8, face: 6 },
      { point: 28, next: 20, twin: 160, facet: 34, face: 6 },
      { point: 9, next: 98, twin: 163, facet: 79, face: 6 },
      { point: 29, next: 284, twin: 162, facet: 52, face: 6 },
      { point: 18, next: 267, twin: 165, facet: 9, face: 6 },
      { point: 29, next: 26, twin: 164, facet: 90, face: 6 },
      { point: 20, next: 111, twin: 167, facet: 6, face: 6 },
      { point: 29, next: 281, twin: 166, facet: 55, face: 6 },
      { point: 42, next: 270, twin: 169, facet: 39, face: 0 },
      { point: 6, next: 3, twin: 168, facet: 77, face: 0 },
      { point: 21, next: 117, twin: 171, facet: 4, face: 4 },
      { point: 30, next: 271, twin: 170, facet: 17, face: 4 },
      { point: 22, next: 265, twin: 173, facet: 47, face: 4 },
      { point: 30, next: 52, twin: 172, facet: 82, face: 4 },
      { point: 10, next: 76, twin: 175, facet: 89, face: 4 },
      { point: 31, next: 286, twin: 174, facet: 56, face: 4 },
      { point: 14, next: 227, twin: 177, facet: 57, face: 4 },
      { point: 31, next: 138, twin: 176, facet: 25, face: 4 },
      { point: 19, next: 107, twin: 179, facet: 7, face: 4 },
      { point: 31, next: 102, twin: 178, facet: 59, face: 4 },
      { point: 43, next: 127, twin: 181, facet: 42, face: 0 },
      { point: 3, next: 31, twin: 180, facet: 87, face: 0 },
      { point: 23, next: 129, twin: 183, facet: 2, face: 0 },
      { point: 32, next: 257, twin: 182, facet: 19, face: 0 },
      { point: 24, next: 249, twin: 185, facet: 0, face: 0 },
      { point: 32, next: 2, twin: 184, facet: 74, face: 0 },
      { point: 11, next: 94, twin: 187, facet: 81, face: 0 },
      { point: 33, next: 268, twin: 186, facet: 60, face: 0 },
      { point: 17, next: 263, twin: 189, facet: 10, face: 0 },
      { point: 33, next: 30, twin: 188, facet: 31, face: 0 },
      { point: 21, next: 119, twin: 191, facet: 3, face: 0 },
      { point: 33, next: 114, twin: 190, facet: 63, face: 0 },
      { point: 34, next: 241, twin: 193, facet: 44, face: 1 },
      { point: 4, next: 195, twin: 192, facet: 21, face: 1 },
      { point: 18, next: 101, twin: 195, facet: 61, face: 1 },
      { point: 34, next: 96, twin: 194, facet: 21, face: 1 },
      { point: 25, next: 192, twin: 197, facet: 44, face: 1 },
      { point: 34, next: 46, twin: 196, facet: 62, face: 1 },
      { point: 12, next: 88, twin: 199, facet: 91, face: 1 },
      { point: 35, next: 252, twin: 198, facet: 64, face: 1 },
      { point: 16, next: 251, twin: 201, facet: 53, face: 1 },
      { point: 35, next: 64, twin: 200, facet: 29, face: 1 },
      { point: 23, next: 131, twin: 203, facet: 1, face: 1 },
      { point: 35, next: 126, twin: 202, facet: 67, face: 1 },
      { point: 36, next: 33, twin: 205, facet: 46, face: 5 },
      { point: 7, next: 207, twin: 204, facet: 23, face: 5 },
      { point: 24, next: 137, twin: 207, facet: 58, face: 5 },
      { point: 36, next: 132, twin: 206, facet: 23, face: 5 },
      { point: 25, next: 204, twin: 209, facet: 46, face: 5 },
      { point: 36, next: 50, twin: 208, facet: 66, face: 5 },
      { point: 13, next: 124, twin: 211, facet: 73, face: 5 },
      { point: 37, next: 276, twin: 210, facet: 68, face: 5 },
      { point: 22, next: 34, twin: 213, facet: 49, face: 5 },
      { point: 37, next: 56, twin: 212, facet: 41, face: 5 },
      { point: 20, next: 113, twin: 215, facet: 5, face: 5 },
      { point: 37, next: 108, twin: 214, facet: 71, face: 5 },
      { point: 44, next: 282, twin: 217, facet: 35, face: 4 },
      { point: 5, next: 53, twin: 216, facet: 85, face: 4 },
      { point: 0, next: 155, twin: 219, facet: 51, face: 11 },
      { point: 27, next: 73, twin: 218, facet: 54, face: 11 },
      { point: 45, next: 115, twin: 221, facet: 38, face: 4 },
      { point: 0, next: 139, twin: 220, facet: 75, face: 4 },
      { point: 1, next: 176, twin: 223, facet: 57, face: 4 },
      { point: 14, next: 237, twin: 222, facet: 72, face: 11 },
      { point: 46, next: 109, twin: 225, facet: 36, face: 6 },
      { point: 5, next: 21, twin: 224, facet: 92, face: 6 },
      { point: 1, next: 179, twin: 227, facet: 59, face: 4 },
      { point: 31, next: 222, twin: 226, facet: 57, face: 4 },
      { point: 47, next: 234, twin: 229, facet: 27, face: 6 },
      { point: 2, next: 27, twin: 228, facet: 88, face: 6 },
      { point: 8, next: 80, twin: 231, facet: 84, face: 11 },
      { point: 49, next: 150, twin: 230, facet: 76, face: 11 },
      { point: 48, next: 91, twin: 233, facet: 30, face: 11 },
      { point: 3, next: 59, twin: 232, facet: 80, face: 11 },
      { point: 2, next: 40, twin: 235, facet: 27, face: 6 },
      { point: 15, next: 242, twin: 234, facet: 13, face: 11 },
      { point: 49, next: 79, twin: 237, facet: 26, face: 11 },
      { point: 1, next: 71, twin: 236, facet: 72, face: 11 },
      { point: 9, next: 82, twin: 239, facet: 94, face: 6 },
      { point: 47, next: 162, twin: 238, facet: 79, face: 6 },
      { point: 25, next: 145, twin: 241, facet: 69, face: 5 },
      { point: 4, next: 196, twin: 240, facet: 44, face: 1 },
      { point: 2, next: 147, twin: 243, facet: 13, face: 11 },
      { point: 26, next: 85, twin: 242, facet: 50, face: 11 },
      { point: 13, next: 136, twin: 245, facet: 93, face: 5 },
      { point: 39, next: 210, twin: 244, facet: 73, face: 5 },
      { point: 3, next: 200, twin: 247, facet: 53, face: 1 },
      { point: 16, next: 233, twin: 246, facet: 80, face: 11 },
      { point: 7, next: 183, twin: 249, facet: 19, face: 0 },
      { point: 32, next: 133, twin: 248, facet: 0, face: 0 },
      { point: 3, next: 203, twin: 251, facet: 67, face: 1 },
      { point: 35, next: 246, twin: 250, facet: 53, face: 1 },
      { point: 12, next: 130, twin: 253, facet: 64, face: 1 },
      { point: 40, next: 61, twin: 252, facet: 20, face: 1 },
      { point: 8, next: 92, twin: 255, facet: 48, face: 11 },
      { point: 48, next: 37, twin: 254, facet: 12, face: 11 },
      { point: 7, next: 4, twin: 257, facet: 43, face: 1 },
      { point: 23, next: 248, twin: 256, facet: 19, face: 0 },
      { point: 0, next: 188, twin: 259, facet: 10, face: 0 },
      { point: 17, next: 218, twin: 258, facet: 51, face: 11 },
      { point: 11, next: 128, twin: 261, facet: 86, face: 0 },
      { point: 43, next: 186, twin: 260, facet: 81, face: 0 },
      { point: 0, next: 191, twin: 263, facet: 63, face: 0 },
      { point: 33, next: 258, twin: 262, facet: 10, face: 0 },
      { point: 6, next: 171, twin: 265, facet: 17, face: 4 },
      { point: 30, next: 121, twin: 264, facet: 47, face: 4 },
      { point: 4, next: 167, twin: 267, facet: 55, face: 6 },
      { point: 29, next: 97, twin: 266, facet: 9, face: 6 },
      { point: 11, next: 118, twin: 269, facet: 60, face: 0 },
      { point: 42, next: 55, twin: 268, facet: 18, face: 0 },
      { point: 6, next: 8, twin: 271, facet: 39, face: 0 },
      { point: 21, next: 264, twin: 270, facet: 17, face: 4 },
      { point: 10, next: 116, twin: 273, facet: 95, face: 4 },
      { point: 45, next: 174, twin: 272, facet: 89, face: 4 },
      { point: 12, next: 100, twin: 275, facet: 78, face: 1 },
      { point: 41, next: 198, twin: 274, facet: 91, face: 1 },
      { point: 13, next: 112, twin: 277, facet: 68, face: 5 },
      { point: 38, next: 67, twin: 276, facet: 22, face: 5 },
      { point: 1, next: 159, twin: 279, facet: 15, face: 6 },
      { point: 28, next: 103, twin: 278, facet: 8, face: 6 },
      { point: 4, next: 14, twin: 281, facet: 37, face: 5 },
      { point: 20, next: 266, twin: 280, facet: 55, face: 6 },
      { point: 5, next: 18, twin: 283, facet: 35, face: 4 },
      { point: 19, next: 225, twin: 282, facet: 92, face: 6 },
      { point: 9, next: 110, twin: 285, facet: 52, face: 6 },
      { point: 46, next: 43, twin: 284, facet: 14, face: 6 },
      { point: 10, next: 106, twin: 287, facet: 56, face: 4 },
      { point: 44, next: 49, twin: 286, facet: 16, face: 4 },
    ],
    points: [
      [-0.5, 0.5, -0.5],
      [-0.5, 0.5, 0.5],
      [0.5, 0.5, 0.5],
      [0.5, 0.5, -0.5],
      [0.5, -0.5, 0.5],
      [-0.5, -0.5, 0.5],
      [-0.5, -0.5, -0.5],
      [0.5, -0.5, -0.5],
      [0, 0.5, 0],
      [0, 0, 0.5],
      [-0.5, 0, 0],
      [0, 0, -0.5],
      [0.5, 0, 0],
      [0, -0.5, 0],
      [-0.5, 0.5, 0],
      [0, 0.5, 0.5],
      [0.5, 0.5, 0],
      [0, 0.5, -0.5],
      [0.5, 0, 0.5],
      [-0.5, 0, 0.5],
      [0, -0.5, 0.5],
      [-0.5, 0, -0.5],
      [-0.5, -0.5, 0],
      [0.5, 0, -0.5],
      [0, -0.5, -0.5],
      [0.5, -0.5, 0],
      [0.16666666666666666, 0.5, 0.16666666666666666],
      [-0.16666666666666666, 0.5, -0.16666666666666666],
      [-0.16666666666666666, 0.16666666666666666, 0.5],
      [0.16666666666666666, -0.16666666666666666, 0.5],
      [-0.5, -0.16666666666666666, -0.16666666666666666],
      [-0.5, 0.16666666666666666, 0.16666666666666666],
      [0.16666666666666666, -0.16666666666666666, -0.5],
      [-0.16666666666666666, 0.16666666666666666, -0.5],
      [0.5, -0.16666666666666666, 0.16666666666666666],
      [0.5, 0.16666666666666666, -0.16666666666666666],
      [0.16666666666666666, -0.5, -0.16666666666666666],
      [-0.16666666666666666, -0.5, 0.16666666666666666],
      [0.16666666666666666, -0.5, 0.16666666666666666],
      [-0.16666666666666666, -0.5, -0.16666666666666666],
      [0.5, -0.16666666666666666, -0.16666666666666666],
      [0.5, 0.16666666666666666, 0.16666666666666666],
      [-0.16666666666666666, -0.16666666666666666, -0.5],
      [0.16666666666666666, 0.16666666666666666, -0.5],
      [-0.5, -0.16666666666666666, 0.16666666666666666],
      [-0.5, 0.16666666666666666, -0.16666666666666666],
      [-0.16666666666666666, -0.16666666666666666, 0.5],
      [0.16666666666666666, 0.16666666666666666, 0.5],
      [0.16666666666666666, 0.5, -0.16666666666666666],
      [-0.16666666666666666, 0.5, 0.16666666666666666],
    ],
    exactPoints: [
      ['-1/2', '1/2', '-1/2'],
      ['-1/2', '1/2', '1/2'],
      ['1/2', '1/2', '1/2'],
      ['1/2', '1/2', '-1/2'],
      ['1/2', '-1/2', '1/2'],
      ['-1/2', '-1/2', '1/2'],
      ['-1/2', '-1/2', '-1/2'],
      ['1/2', '-1/2', '-1/2'],
      ['0', '1/2', '0'],
      ['0', '0', '1/2'],
      ['-1/2', '0', '0'],
      ['0', '0', '-1/2'],
      ['1/2', '0', '0'],
      ['0', '-1/2', '0'],
      ['-1/2', '1/2', '0'],
      ['0', '1/2', '1/2'],
      ['1/2', '1/2', '0'],
      ['0', '1/2', '-1/2'],
      ['1/2', '0', '1/2'],
      ['-1/2', '0', '1/2'],
      ['0', '-1/2', '1/2'],
      ['-1/2', '0', '-1/2'],
      ['-1/2', '-1/2', '0'],
      ['1/2', '0', '-1/2'],
      ['0', '-1/2', '-1/2'],
      ['1/2', '-1/2', '0'],
      [
        '12009599006321323/72057594037927936',
        '1/2',
        '12009599006321323/72057594037927936',
      ],
      [
        '-12009599006321323/72057594037927936',
        '1/2',
        '-12009599006321323/72057594037927936',
      ],
      [
        '-12009599006321323/72057594037927936',
        '12009599006321323/72057594037927936',
        '1/2',
      ],
      [
        '12009599006321323/72057594037927936',
        '-12009599006321323/72057594037927936',
        '1/2',
      ],
      [
        '-1/2',
        '-12009599006321323/72057594037927936',
        '-12009599006321323/72057594037927936',
      ],
      [
        '-1/2',
        '12009599006321323/72057594037927936',
        '12009599006321323/72057594037927936',
      ],
      [
        '12009599006321323/72057594037927936',
        '-12009599006321323/72057594037927936',
        '-1/2',
      ],
      [
        '-12009599006321323/72057594037927936',
        '12009599006321323/72057594037927936',
        '-1/2',
      ],
      [
        '1/2',
        '-12009599006321323/72057594037927936',
        '12009599006321323/72057594037927936',
      ],
      [
        '1/2',
        '12009599006321323/72057594037927936',
        '-12009599006321323/72057594037927936',
      ],
      [
        '12009599006321323/72057594037927936',
        '-1/2',
        '-12009599006321323/72057594037927936',
      ],
      [
        '-12009599006321323/72057594037927936',
        '-1/2',
        '12009599006321323/72057594037927936',
      ],
      [
        '12009599006321323/72057594037927936',
        '-1/2',
        '12009599006321323/72057594037927936',
      ],
      [
        '-12009599006321323/72057594037927936',
        '-1/2',
        '-12009599006321323/72057594037927936',
      ],
      [
        '1/2',
        '-12009599006321323/72057594037927936',
        '-12009599006321323/72057594037927936',
      ],
      [
        '1/2',
        '12009599006321323/72057594037927936',
        '12009599006321323/72057594037927936',
      ],
      [
        '-12009599006321323/72057594037927936',
        '-12009599006321323/72057594037927936',
        '-1/2',
      ],
      [
        '12009599006321323/72057594037927936',
        '12009599006321323/72057594037927936',
        '-1/2',
      ],
      [
        '-1/2',
        '-12009599006321323/72057594037927936',
        '12009599006321323/72057594037927936',
      ],
      [
        '-1/2',
        '12009599006321323/72057594037927936',
        '-12009599006321323/72057594037927936',
      ],
      [
        '-12009599006321323/72057594037927936',
        '-12009599006321323/72057594037927936',
        '1/2',
      ],
      [
        '12009599006321323/72057594037927936',
        '12009599006321323/72057594037927936',
        '1/2',
      ],
      [
        '12009599006321323/72057594037927936',
        '1/2',
        '-12009599006321323/72057594037927936',
      ],
      [
        '-12009599006321323/72057594037927936',
        '1/2',
        '12009599006321323/72057594037927936',
      ],
    ],
    faces: [
      {
        plane: [0, 0, -0.9999999999999998, -0.4999999999999999],
        exactPlane: [
          '0',
          '0',
          '-24019198012642645/24019198012642648',
          '-24019198012642645/48038396025285296',
        ],
      },
      {
        plane: [0.9999999999999999, 0, 0, -0.49999999999999994],
        exactPlane: [
          '288460936585268205588227242619335/288460936585268221601025917714432',
          '0',
          '0',
          '-288460936585268205588227242619335/576921873170536443202051835428864',
        ],
      },
      undefined,
      undefined,
      {
        plane: [-0.9999999999999999, 0, 0, -0.49999999999999994],
        exactPlane: [
          '-288460936585268205588227242619335/288460936585268221601025917714432',
          '0',
          '0',
          '-288460936585268205588227242619335/576921873170536443202051835428864',
        ],
      },
      {
        plane: [0, -1, 0, -0.5],
        exactPlane: [
          '0',
          '-288460936585268205588227242619335/288460936585268185572228898750464',
          '0',
          '-288460936585268205588227242619335/576921873170536371144457797500928',
        ],
      },
      {
        plane: [0, 0, 1, -0.5],
        exactPlane: [
          '0',
          '0',
          '288460936585268205588227242619335/288460936585268185572228898750464',
          '-288460936585268205588227242619335/576921873170536371144457797500928',
        ],
      },
      undefined,
      undefined,
      undefined,
      undefined,
      {
        plane: [0, 1, 0, -0.5],
        exactPlane: [
          '0',
          '288460936585268205588227242619335/288460936585268185572228898750464',
          '0',
          '-288460936585268205588227242619335/576921873170536371144457797500928',
        ],
      },
    ],
    facets: [
      { edge: 249 },
      { edge: 202 },
      { edge: 182 },
      { edge: 190 },
      { edge: 170 },
      { edge: 214 },
      { edge: 166 },
      { edge: 178 },
      { edge: 279 },
      { edge: 267 },
      { edge: 263 },
      { edge: 154 },
      { edge: 255 },
      { edge: 242 },
      { edge: 285 },
      { edge: 278 },
      { edge: 287 },
      { edge: 271 },
      { edge: 269 },
      { edge: 257 },
      { edge: 253 },
      { edge: 195 },
      { edge: 277 },
      { edge: 207 },
      { edge: 153 },
      { edge: 177 },
      { edge: 236 },
      { edge: 234 },
      { edge: 149 },
      { edge: 201 },
      { edge: 232 },
      { edge: 189 },
      { edge: 158 },
      { edge: 62 },
      { edge: 161 },
      { edge: 282 },
      { edge: 224 },
      { edge: 280 },
      { edge: 220 },
      { edge: 270 },
      { edge: 146 },
      { edge: 213 },
      { edge: 180 },
      { edge: 256 },
      { edge: 241 },
      { edge: 68 },
      { edge: 208 },
      { edge: 265 },
      { edge: 254 },
      { edge: 212 },
      { edge: 243 },
      { edge: 259 },
      { edge: 284 },
      { edge: 251 },
      { edge: 219 },
      { edge: 281 },
      { edge: 286 },
      { edge: 227 },
      { edge: 206 },
      { edge: 226 },
      { edge: 268 },
      { edge: 194 },
      { edge: 197 },
      { edge: 262 },
      { edge: 252 },
      { edge: 157 },
      { edge: 209 },
      { edge: 250 },
      { edge: 276 },
      { edge: 240 },
      { edge: 120 },
      { edge: 215 },
      { edge: 237 },
      { edge: 245 },
      { edge: 185 },
      { edge: 221 },
      { edge: 231 },
      { edge: 169 },
      { edge: 274 },
      { edge: 239 },
      { edge: 247 },
      { edge: 261 },
      { edge: 173 },
      { edge: 84 },
      { edge: 230 },
      { edge: 217 },
      { edge: 260 },
      { edge: 181 },
      { edge: 229 },
      { edge: 273 },
      { edge: 165 },
      { edge: 275 },
      { edge: 283 },
      { edge: 244 },
      { edge: 238 },
      { edge: 272 },
    ],
    isClosed: true,
  });
});
