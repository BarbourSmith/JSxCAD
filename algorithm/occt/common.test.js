import {
  unitRegularIcosahedronPolygons,
  unitRegularTetrahedronPolygons,
} from '@jsxcad/data-shape';

import { common } from './common.js';
import { fromPolygons } from './fromPolygons.js';
import { initOcct } from './occt.js';
import test from 'ava';
import { toGraph } from './toGraph.js';

test.beforeEach(async (t) => {
  await initOcct();
});

test('common', (t) => {
  const aShape = fromPolygons(unitRegularIcosahedronPolygons);
  const bShape = fromPolygons(unitRegularTetrahedronPolygons);
  const commonShape = common(aShape, bShape);
  const graph = toGraph(commonShape);
  t.deepEqual(graph, {
    edges: [
      { loop: 0, next: 1, point: 0, twin: 4 },
      { loop: 0, next: 2, point: 1, twin: 23 },
      { loop: 0, next: 3, point: 2, twin: 17 },
      { loop: 0, next: 0, point: 3, twin: 8 },
      { loop: 1, next: 5, point: 1, twin: 4 },
      { loop: 1, next: 6, point: 0, twin: 16 },
      { loop: 1, next: 7, point: 4, twin: 32 },
      { loop: 1, next: 4, point: 5, twin: 24 },
      { loop: 2, next: 9, point: 0, twin: 8 },
      { loop: 2, next: 10, point: 3, twin: 22 },
      { loop: 2, next: 11, point: 6, twin: 57 },
      { loop: 2, next: 12, point: 7, twin: 55 },
      { loop: 2, next: 13, point: 8, twin: 49 },
      { loop: 2, next: 14, point: 9, twin: 45 },
      { loop: 2, next: 15, point: 10, twin: 39 },
      { loop: 2, next: 16, point: 11, twin: 33 },
      { loop: 2, next: 8, point: 4, twin: 16 },
      { loop: 3, next: 18, point: 3, twin: 17 },
      { loop: 3, next: 19, point: 2, twin: 31 },
      { loop: 3, next: 20, point: 12, twin: 69 },
      { loop: 3, next: 21, point: 13, twin: 60 },
      { loop: 3, next: 22, point: 14, twin: 58 },
      { loop: 3, next: 17, point: 6, twin: 22 },
      { loop: 4, next: 24, point: 2, twin: 23 },
      { loop: 4, next: 25, point: 1, twin: 24 },
      { loop: 4, next: 26, point: 5, twin: 37 },
      { loop: 4, next: 27, point: 15, twin: 88 },
      { loop: 4, next: 28, point: 16, twin: 85 },
      { loop: 4, next: 29, point: 17, twin: 80 },
      { loop: 4, next: 30, point: 18, twin: 76 },
      { loop: 4, next: 31, point: 19, twin: 70 },
      { loop: 4, next: 23, point: 12, twin: 31 },
      { loop: 5, next: 33, point: 5, twin: 32 },
      { loop: 5, next: 34, point: 4, twin: 33 },
      { loop: 5, next: 35, point: 11, twin: 38 },
      { loop: 5, next: 36, point: 20, twin: 93 },
      { loop: 5, next: 37, point: 21, twin: 89 },
      { loop: 5, next: 32, point: 15, twin: 37 },
      { loop: 6, next: 39, point: 20, twin: 38 },
      { loop: 6, next: 40, point: 11, twin: 39 },
      { loop: 6, next: 41, point: 10, twin: 44 },
      { loop: 6, next: 38, point: 22, twin: 94 },
      { loop: 7, next: 43, point: 9, twin: 48 },
      { loop: 7, next: 44, point: 23, twin: 95 },
      { loop: 7, next: 45, point: 22, twin: 44 },
      { loop: 7, next: 42, point: 10, twin: 45 },
      { loop: 8, next: 47, point: 24, twin: 102 },
      { loop: 8, next: 48, point: 25, twin: 96 },
      { loop: 8, next: 49, point: 23, twin: 48 },
      { loop: 8, next: 50, point: 9, twin: 49 },
      { loop: 8, next: 51, point: 8, twin: 54 },
      { loop: 8, next: 46, point: 26, twin: 66 },
      { loop: 9, next: 53, point: 7, twin: 56 },
      { loop: 9, next: 54, point: 27, twin: 67 },
      { loop: 9, next: 55, point: 26, twin: 54 },
      { loop: 9, next: 52, point: 8, twin: 55 },
      { loop: 10, next: 57, point: 27, twin: 56 },
      { loop: 10, next: 58, point: 7, twin: 57 },
      { loop: 10, next: 59, point: 6, twin: 58 },
      { loop: 10, next: 56, point: 14, twin: 68 },
      { loop: 11, next: 61, point: 14, twin: 60 },
      { loop: 11, next: 62, point: 13, twin: 72 },
      { loop: 11, next: 63, point: 28, twin: 74 },
      { loop: 11, next: 64, point: 29, twin: 78 },
      { loop: 11, next: 65, point: 30, twin: 105 },
      { loop: 11, next: 66, point: 31, twin: 103 },
      { loop: 11, next: 67, point: 24, twin: 66 },
      { loop: 11, next: 68, point: 26, twin: 67 },
      { loop: 11, next: 60, point: 27, twin: 68 },
      { loop: 12, next: 70, point: 13, twin: 69 },
      { loop: 12, next: 71, point: 12, twin: 70 },
      { loop: 12, next: 72, point: 19, twin: 75 },
      { loop: 12, next: 69, point: 28, twin: 72 },
      { loop: 13, next: 74, point: 18, twin: 79 },
      { loop: 13, next: 75, point: 29, twin: 74 },
      { loop: 13, next: 76, point: 28, twin: 75 },
      { loop: 13, next: 73, point: 19, twin: 76 },
      { loop: 14, next: 78, point: 32, twin: 106 },
      { loop: 14, next: 79, point: 30, twin: 78 },
      { loop: 14, next: 80, point: 29, twin: 79 },
      { loop: 14, next: 81, point: 18, twin: 80 },
      { loop: 14, next: 82, point: 17, twin: 84 },
      { loop: 14, next: 77, point: 33, twin: 99 },
      { loop: 15, next: 84, point: 34, twin: 91 },
      { loop: 15, next: 85, point: 33, twin: 84 },
      { loop: 15, next: 86, point: 17, twin: 85 },
      { loop: 15, next: 83, point: 16, twin: 87 },
      { loop: 16, next: 88, point: 34, twin: 87 },
      { loop: 16, next: 89, point: 16, twin: 88 },
      { loop: 16, next: 90, point: 15, twin: 89 },
      { loop: 16, next: 87, point: 21, twin: 92 },
      { loop: 17, next: 92, point: 33, twin: 91 },
      { loop: 17, next: 93, point: 34, twin: 92 },
      { loop: 17, next: 94, point: 21, twin: 93 },
      { loop: 17, next: 95, point: 20, twin: 94 },
      { loop: 17, next: 96, point: 22, twin: 95 },
      { loop: 17, next: 97, point: 23, twin: 96 },
      { loop: 17, next: 98, point: 25, twin: 101 },
      { loop: 17, next: 99, point: 35, twin: 107 },
      { loop: 17, next: 91, point: 32, twin: 99 },
      { loop: 18, next: 101, point: 31, twin: 104 },
      { loop: 18, next: 102, point: 35, twin: 101 },
      { loop: 18, next: 103, point: 25, twin: 102 },
      { loop: 18, next: 100, point: 24, twin: 103 },
      { loop: 19, next: 105, point: 35, twin: 104 },
      { loop: 19, next: 106, point: 31, twin: 105 },
      { loop: 19, next: 107, point: 30, twin: 106 },
      { loop: 19, next: 104, point: 32, twin: 107 },
    ],
    faces: [
      { holes: [], loop: 0 },
      { holes: [], loop: 1 },
      { holes: [], loop: 2 },
      { holes: [], loop: 3 },
      { holes: [], loop: 4 },
      { holes: [], loop: 5 },
      { holes: [], loop: 6 },
      { holes: [], loop: 7 },
      { holes: [], loop: 8 },
      { holes: [], loop: 9 },
      { holes: [], loop: 10 },
      { holes: [], loop: 11 },
      { holes: [], loop: 12 },
      { holes: [], loop: 13 },
      { holes: [], loop: 14 },
      { holes: [], loop: 15 },
      { holes: [], loop: 16 },
      { holes: [], loop: 17 },
      { holes: [], loop: 18 },
      { holes: [], loop: 19 },
    ],
    loops: [
      { edge: 3, face: 0 },
      { edge: 7, face: 1 },
      { edge: 16, face: 2 },
      { edge: 22, face: 3 },
      { edge: 31, face: 4 },
      { edge: 37, face: 5 },
      { edge: 41, face: 6 },
      { edge: 45, face: 7 },
      { edge: 51, face: 8 },
      { edge: 55, face: 9 },
      { edge: 59, face: 10 },
      { edge: 68, face: 11 },
      { edge: 72, face: 12 },
      { edge: 76, face: 13 },
      { edge: 82, face: 14 },
      { edge: 86, face: 15 },
      { edge: 90, face: 16 },
      { edge: 99, face: 17 },
      { edge: 103, face: 18 },
      { edge: 107, face: 19 },
    ],
    points: [
      [-0.85065, 0, 0.14935000000000015],
      [-0.85065, 0, -0.1493500000000001],
      [-0.6420381711144503, -0.5461518288855498, 0.18818999999999986],
      [-0.7787676808323047, -0.18818999999999997, 0.4094223191676953],
      [-0.6420381711144503, 0.5461518288855498, -0.18818999999999986],
      [-0.7787676808323047, 0.18818999999999997, -0.4094223191676953],
      [-0.5461518288855496, -0.18819000000000002, 0.6420381711144504],
      [0, 0.14934999999999987, 0.85065],
      [0.18818999999999997, 0.40942231916769534, 0.7787676808323047],
      [0.18818999999999997, 0.6420381711144504, 0.5461518288855497],
      [-0.1493500000000001, 0.85065, 0],
      [-0.4094223191676954, 0.7787676808323047, -0.18818999999999986],
      [-0.40942231916769534, -0.7787676808323047, 0.18818999999999994],
      [-0.18819000000000008, -0.6420381711144505, 0.5461518288855496],
      [-0.18819000000000008, -0.4094223191676953, 0.7787676808323047],
      [-0.5461518288855496, 0.18819000000000005, -0.6420381711144505],
      [0, -0.14934999999999987, -0.85065],
      [0.18818999999999997, -0.40942231916769534, -0.7787676808323047],
      [0.18818999999999997, -0.6420381711144504, -0.5461518288855497],
      [-0.14935000000000026, -0.85065, 0],
      [-0.18819000000000008, 0.6420381711144505, -0.5461518288855496],
      [-0.18819000000000008, 0.4094223191676953, -0.7787676808323047],
      [0.14935000000000004, 0.85065, 0],
      [0.40942231916769534, 0.7787676808323047, 0.18818999999999994],
      [0.7787676808323047, 0.18818999999999997, 0.4094223191676953],
      [0.6420381711144504, 0.5461518288855497, 0.18818999999999997],
      [0.5461518288855496, 0.18819000000000002, 0.6420381711144504],
      [0, -0.14934999999999976, 0.85065],
      [0.1493500000000001, -0.85065, 0],
      [0.40942231916769534, -0.7787676808323047, -0.18818999999999994],
      [0.6420381711144504, -0.5461518288855497, -0.18818999999999997],
      [0.85065, 0, 0.1493500000000001],
      [0.7787676808323047, -0.18818999999999997, -0.4094223191676953],
      [0.5461518288855496, -0.18819000000000002, -0.6420381711144504],
      [0, 0.14934999999999976, -0.85065],
      [0.85065, 0, -0.14935000000000004],
    ],
  });
});
