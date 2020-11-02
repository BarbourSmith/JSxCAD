import { boot } from '@jsxcad/sys';
import { fromStl } from './fromStl.js';
import { readFileSync } from 'fs';
import test from 'ava';

test('Read example', async (t) => {
  await boot();
  const stl = readFileSync('fromStl.test.box.stl');
  const geometry = await fromStl(stl);
  t.deepEqual(JSON.parse(JSON.stringify(geometry)), {
    type: 'graph',
    graph: {
      edges: [
        { point: 1, next: 2, twin: 1, loop: 0 },
        { point: 0, next: 23, twin: 0, loop: 5 },
        { point: 2, next: 4, twin: 3, loop: 0 },
        { point: 1, next: 35, twin: 2, loop: 11 },
        { point: 0, next: 0, twin: 5, loop: 0 },
        { point: 2, next: 6, twin: 4, loop: 1 },
        { point: 3, next: 8, twin: 7, loop: 1 },
        { point: 2, next: 26, twin: 6, loop: 6 },
        { point: 0, next: 5, twin: 9, loop: 1 },
        { point: 3, next: 31, twin: 8, loop: 8 },
        { point: 5, next: 12, twin: 11, loop: 2 },
        { point: 4, next: 21, twin: 10, loop: 9 },
        { point: 6, next: 14, twin: 13, loop: 2 },
        { point: 5, next: 30, twin: 12, loop: 7 },
        { point: 4, next: 10, twin: 15, loop: 2 },
        { point: 6, next: 16, twin: 14, loop: 3 },
        { point: 7, next: 18, twin: 17, loop: 3 },
        { point: 6, next: 34, twin: 16, loop: 10 },
        { point: 4, next: 15, twin: 19, loop: 3 },
        { point: 7, next: 22, twin: 18, loop: 4 },
        { point: 4, next: 19, twin: 21, loop: 4 },
        { point: 0, next: 33, twin: 20, loop: 9 },
        { point: 0, next: 20, twin: 23, loop: 4 },
        { point: 7, next: 24, twin: 22, loop: 5 },
        { point: 1, next: 1, twin: 25, loop: 5 },
        { point: 7, next: 17, twin: 24, loop: 10 },
        { point: 6, next: 28, twin: 27, loop: 6 },
        { point: 2, next: 3, twin: 26, loop: 11 },
        { point: 3, next: 7, twin: 29, loop: 6 },
        { point: 6, next: 13, twin: 28, loop: 7 },
        { point: 3, next: 29, twin: 31, loop: 7 },
        { point: 5, next: 32, twin: 30, loop: 8 },
        { point: 0, next: 9, twin: 33, loop: 8 },
        { point: 5, next: 11, twin: 32, loop: 9 },
        { point: 1, next: 25, twin: 35, loop: 10 },
        { point: 6, next: 27, twin: 34, loop: 11 },
      ],
      faces: [
        { loop: 0, plane: [-1, 0, 0, 5] },
        { loop: 1, plane: [-1, 0, 0, 5] },
        { loop: 2, plane: [1, 0, 0, 5] },
        { loop: 3, plane: [1, 0, 0, 5] },
        { loop: 4, plane: [0, -1, 0, 5] },
        { loop: 5, plane: [0, -1, 0, 5] },
        { loop: 6, plane: [0, 1, 0, 5] },
        { loop: 7, plane: [0, 1, 0, 5] },
        { loop: 8, plane: [0, 0, -1, 5] },
        { loop: 9, plane: [0, 0, -1, 5] },
        { loop: 10, plane: [0, 0, 1, 5] },
        { loop: 11, plane: [0, 0, 1, 5] },
      ],
      loops: [
        { edge: 4, face: 0 },
        { edge: 8, face: 1 },
        { edge: 14, face: 2 },
        { edge: 18, face: 3 },
        { edge: 22, face: 4 },
        { edge: 1, face: 5 },
        { edge: 28, face: 6 },
        { edge: 30, face: 7 },
        { edge: 32, face: 8 },
        { edge: 21, face: 9 },
        { edge: 34, face: 10 },
        { edge: 3, face: 11 },
      ],
      points: [
        [-5, -5, -5],
        [-5, -5, 5],
        [-5, 5, 5],
        [-5, 5, -5],
        [5, -5, -5],
        [5, 5, -5],
        [5, 5, 5],
        [5, -5, 5],
      ],
      exact: [
        ['-5/1', '-5/1', '-5/1'],
        ['-5/1', '-5/1', '5/1'],
        ['-5/1', '5/1', '5/1'],
        ['-5/1', '5/1', '-5/1'],
        ['5/1', '-5/1', '-5/1'],
        ['5/1', '5/1', '-5/1'],
        ['5/1', '5/1', '5/1'],
        ['5/1', '-5/1', '5/1'],
      ],
      isClosed: true,
    },
  });
});
