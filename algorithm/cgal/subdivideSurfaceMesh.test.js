import { fromGraphToSurfaceMesh } from './fromGraphToSurfaceMesh.js';
import { fromSurfaceMeshToGraph } from './fromSurfaceMeshToGraph.js';
import { initCgal } from './getCgal.js';
import { subdivideSurfaceMesh } from './subdivideSurfaceMesh.js';
import test from 'ava';

test.beforeEach(async (t) => {
  await initCgal();
});

test('SubdivideSurfaceMesh', (t) => {
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
  const smoothMesh = subdivideSurfaceMesh(mesh, { method: 'Loop' });
  const smoothGraph = fromSurfaceMeshToGraph(smoothMesh);
  t.deepEqual(smoothGraph, {
    edges: [
      { point: 0, next: 77, twin: 1, facet: 14, face: 14 },
      { point: 8, next: 18, twin: 0, facet: 24, face: 24 },
      { point: 1, next: 73, twin: 3, facet: 12, face: 12 },
      { point: 9, next: 12, twin: 2, facet: 19, face: 19 },
      { point: 2, next: 75, twin: 5, facet: 13, face: 13 },
      { point: 10, next: 6, twin: 4, facet: 15, face: 15 },
      { point: 2, next: 79, twin: 7, facet: 15, face: 15 },
      { point: 11, next: 47, twin: 6, facet: 36, face: 36 },
      { point: 3, next: 81, twin: 9, facet: 16, face: 16 },
      { point: 12, next: 24, twin: 8, facet: 30, face: 30 },
      { point: 4, next: 89, twin: 11, facet: 20, face: 20 },
      { point: 13, next: 30, twin: 10, facet: 37, face: 37 },
      { point: 1, next: 87, twin: 13, facet: 19, face: 19 },
      { point: 14, next: 14, twin: 12, facet: 21, face: 21 },
      { point: 1, next: 91, twin: 15, facet: 21, face: 21 },
      { point: 15, next: 57, twin: 14, facet: 27, face: 27 },
      { point: 5, next: 93, twin: 17, facet: 22, face: 22 },
      { point: 16, next: 71, twin: 16, facet: 46, face: 46 },
      { point: 0, next: 97, twin: 19, facet: 24, face: 24 },
      { point: 17, next: 63, twin: 18, facet: 33, face: 33 },
      { point: 6, next: 99, twin: 21, facet: 25, face: 25 },
      { point: 18, next: 22, twin: 20, facet: 28, face: 28 },
      { point: 6, next: 105, twin: 23, facet: 28, face: 28 },
      { point: 19, next: 65, twin: 22, facet: 42, face: 42 },
      { point: 3, next: 109, twin: 25, facet: 30, face: 30 },
      { point: 20, next: 67, twin: 24, facet: 39, face: 39 },
      { point: 7, next: 111, twin: 27, facet: 31, face: 31 },
      { point: 21, next: 28, twin: 26, facet: 34, face: 34 },
      { point: 7, next: 117, twin: 29, facet: 34, face: 34 },
      { point: 22, next: 34, twin: 28, facet: 43, face: 43 },
      { point: 4, next: 123, twin: 31, facet: 37, face: 37 },
      { point: 23, next: 32, twin: 30, facet: 40, face: 40 },
      { point: 4, next: 129, twin: 33, facet: 40, face: 40 },
      { point: 24, next: 53, twin: 32, facet: 45, face: 45 },
      { point: 7, next: 135, twin: 35, facet: 43, face: 43 },
      { point: 25, next: 69, twin: 34, facet: 47, face: 47 },
      { point: 8, next: 2, twin: 37, facet: 12, face: 12 },
      { point: 1, next: 101, twin: 36, facet: 26, face: 26 },
      { point: 9, next: 4, twin: 39, facet: 13, face: 13 },
      { point: 2, next: 85, twin: 38, facet: 18, face: 18 },
      { point: 10, next: 0, twin: 41, facet: 14, face: 14 },
      { point: 0, next: 83, twin: 40, facet: 17, face: 17 },
      { point: 11, next: 8, twin: 43, facet: 16, face: 16 },
      { point: 3, next: 125, twin: 42, facet: 38, face: 38 },
      { point: 12, next: 41, twin: 45, facet: 17, face: 17 },
      { point: 0, next: 113, twin: 44, facet: 32, face: 32 },
      { point: 13, next: 39, twin: 47, facet: 18, face: 18 },
      { point: 2, next: 121, twin: 46, facet: 36, face: 36 },
      { point: 14, next: 10, twin: 49, facet: 20, face: 20 },
      { point: 4, next: 95, twin: 48, facet: 23, face: 23 },
      { point: 15, next: 16, twin: 51, facet: 22, face: 22 },
      { point: 5, next: 107, twin: 50, facet: 29, face: 29 },
      { point: 16, next: 49, twin: 53, facet: 23, face: 23 },
      { point: 4, next: 139, twin: 52, facet: 45, face: 45 },
      { point: 17, next: 20, twin: 55, facet: 25, face: 25 },
      { point: 6, next: 119, twin: 54, facet: 35, face: 35 },
      { point: 18, next: 37, twin: 57, facet: 26, face: 26 },
      { point: 1, next: 103, twin: 56, facet: 27, face: 27 },
      { point: 19, next: 51, twin: 59, facet: 29, face: 29 },
      { point: 5, next: 137, twin: 58, facet: 44, face: 44 },
      { point: 20, next: 26, twin: 61, facet: 31, face: 31 },
      { point: 7, next: 131, twin: 60, facet: 41, face: 41 },
      { point: 21, next: 45, twin: 63, facet: 32, face: 32 },
      { point: 0, next: 115, twin: 62, facet: 33, face: 33 },
      { point: 22, next: 55, twin: 65, facet: 35, face: 35 },
      { point: 6, next: 133, twin: 64, facet: 42, face: 42 },
      { point: 23, next: 43, twin: 67, facet: 38, face: 38 },
      { point: 3, next: 127, twin: 66, facet: 39, face: 39 },
      { point: 24, next: 61, twin: 69, facet: 41, face: 41 },
      { point: 7, next: 143, twin: 68, facet: 47, face: 47 },
      { point: 25, next: 59, twin: 71, facet: 44, face: 44 },
      { point: 5, next: 141, twin: 70, facet: 46, face: 46 },
      { point: 8, next: 74, twin: 73, facet: 0, face: 0 },
      { point: 9, next: 36, twin: 72, facet: 12, face: 12 },
      { point: 9, next: 76, twin: 75, facet: 0, face: 0 },
      { point: 10, next: 38, twin: 74, facet: 13, face: 13 },
      { point: 10, next: 72, twin: 77, facet: 0, face: 0 },
      { point: 8, next: 40, twin: 76, facet: 14, face: 14 },
      { point: 10, next: 80, twin: 79, facet: 1, face: 1 },
      { point: 11, next: 5, twin: 78, facet: 15, face: 15 },
      { point: 11, next: 82, twin: 81, facet: 1, face: 1 },
      { point: 12, next: 42, twin: 80, facet: 16, face: 16 },
      { point: 12, next: 78, twin: 83, facet: 1, face: 1 },
      { point: 10, next: 44, twin: 82, facet: 17, face: 17 },
      { point: 13, next: 86, twin: 85, facet: 2, face: 2 },
      { point: 9, next: 46, twin: 84, facet: 18, face: 18 },
      { point: 9, next: 88, twin: 87, facet: 2, face: 2 },
      { point: 14, next: 3, twin: 86, facet: 19, face: 19 },
      { point: 14, next: 84, twin: 89, facet: 2, face: 2 },
      { point: 13, next: 48, twin: 88, facet: 20, face: 20 },
      { point: 14, next: 92, twin: 91, facet: 3, face: 3 },
      { point: 15, next: 13, twin: 90, facet: 21, face: 21 },
      { point: 15, next: 94, twin: 93, facet: 3, face: 3 },
      { point: 16, next: 50, twin: 92, facet: 22, face: 22 },
      { point: 16, next: 90, twin: 95, facet: 3, face: 3 },
      { point: 14, next: 52, twin: 94, facet: 23, face: 23 },
      { point: 8, next: 98, twin: 97, facet: 4, face: 4 },
      { point: 17, next: 1, twin: 96, facet: 24, face: 24 },
      { point: 17, next: 100, twin: 99, facet: 4, face: 4 },
      { point: 18, next: 54, twin: 98, facet: 25, face: 25 },
      { point: 18, next: 96, twin: 101, facet: 4, face: 4 },
      { point: 8, next: 56, twin: 100, facet: 26, face: 26 },
      { point: 15, next: 104, twin: 103, facet: 5, face: 5 },
      { point: 18, next: 15, twin: 102, facet: 27, face: 27 },
      { point: 18, next: 106, twin: 105, facet: 5, face: 5 },
      { point: 19, next: 21, twin: 104, facet: 28, face: 28 },
      { point: 19, next: 102, twin: 107, facet: 5, face: 5 },
      { point: 15, next: 58, twin: 106, facet: 29, face: 29 },
      { point: 12, next: 110, twin: 109, facet: 6, face: 6 },
      { point: 20, next: 9, twin: 108, facet: 30, face: 30 },
      { point: 20, next: 112, twin: 111, facet: 6, face: 6 },
      { point: 21, next: 60, twin: 110, facet: 31, face: 31 },
      { point: 21, next: 108, twin: 113, facet: 6, face: 6 },
      { point: 12, next: 62, twin: 112, facet: 32, face: 32 },
      { point: 17, next: 116, twin: 115, facet: 7, face: 7 },
      { point: 21, next: 19, twin: 114, facet: 33, face: 33 },
      { point: 21, next: 118, twin: 117, facet: 7, face: 7 },
      { point: 22, next: 27, twin: 116, facet: 34, face: 34 },
      { point: 22, next: 114, twin: 119, facet: 7, face: 7 },
      { point: 17, next: 64, twin: 118, facet: 35, face: 35 },
      { point: 11, next: 122, twin: 121, facet: 8, face: 8 },
      { point: 13, next: 7, twin: 120, facet: 36, face: 36 },
      { point: 13, next: 124, twin: 123, facet: 8, face: 8 },
      { point: 23, next: 11, twin: 122, facet: 37, face: 37 },
      { point: 23, next: 120, twin: 125, facet: 8, face: 8 },
      { point: 11, next: 66, twin: 124, facet: 38, face: 38 },
      { point: 20, next: 128, twin: 127, facet: 9, face: 9 },
      { point: 23, next: 25, twin: 126, facet: 39, face: 39 },
      { point: 23, next: 130, twin: 129, facet: 9, face: 9 },
      { point: 24, next: 31, twin: 128, facet: 40, face: 40 },
      { point: 24, next: 126, twin: 131, facet: 9, face: 9 },
      { point: 20, next: 68, twin: 130, facet: 41, face: 41 },
      { point: 19, next: 134, twin: 133, facet: 10, face: 10 },
      { point: 22, next: 23, twin: 132, facet: 42, face: 42 },
      { point: 22, next: 136, twin: 135, facet: 10, face: 10 },
      { point: 25, next: 29, twin: 134, facet: 43, face: 43 },
      { point: 25, next: 132, twin: 137, facet: 10, face: 10 },
      { point: 19, next: 70, twin: 136, facet: 44, face: 44 },
      { point: 24, next: 140, twin: 139, facet: 11, face: 11 },
      { point: 16, next: 33, twin: 138, facet: 45, face: 45 },
      { point: 16, next: 142, twin: 141, facet: 11, face: 11 },
      { point: 25, next: 17, twin: 140, facet: 46, face: 46 },
      { point: 25, next: 138, twin: 143, facet: 11, face: 11 },
      { point: 24, next: 35, twin: 142, facet: 47, face: 47 },
    ],
    points: [
      [-0.2477203432226513, 0.33181356214843416, -0.33181356214843416],
      [-0.33181356214843416, 0.2477203432226513, 0.33181356214843416],
      [0.2578125, 0.37890625, 0.2578125],
      [0.37890625, 0.2578125, -0.2578125],
      [0.33181356214843416, -0.2477203432226513, 0.33181356214843416],
      [-0.2578125, -0.37890625, 0.2578125],
      [-0.37890625, -0.2578125, -0.2578125],
      [0.2477203432226513, -0.33181356214843416, -0.33181356214843416],
      [-0.375, 0.375, 0],
      [0, 0.375, 0.375],
      [0, 0.5, 0],
      [0.375, 0.375, 0],
      [0.125, 0.375, -0.375],
      [0.375, 0.125, 0.375],
      [0, 0, 0.5],
      [-0.375, -0.125, 0.375],
      [0, -0.375, 0.375],
      [-0.375, 0, -0.375],
      [-0.5, 0, 0],
      [-0.375, -0.375, 0],
      [0.375, 0, -0.375],
      [0, 0, -0.5],
      [-0.125, -0.375, -0.375],
      [0.5, 0, 0],
      [0.375, -0.375, 0],
      [0, -0.5, 0],
    ],
    exactPoints: [
      [
        '-5578166227148119/22517998136852480',
        '3735888587120413/11258999068426240',
        '-3735888587120413/11258999068426240',
      ],
      [
        '-3735888587120413/11258999068426240',
        '5578166227148119/22517998136852480',
        '3735888587120413/11258999068426240',
      ],
      ['33/128', '97/256', '33/128'],
      ['97/256', '33/128', '-33/128'],
      [
        '3735888587120413/11258999068426240',
        '-5578166227148119/22517998136852480',
        '3735888587120413/11258999068426240',
      ],
      ['-33/128', '-97/256', '33/128'],
      ['-97/256', '-33/128', '-33/128'],
      [
        '5578166227148119/22517998136852480',
        '-3735888587120413/11258999068426240',
        '-3735888587120413/11258999068426240',
      ],
      ['-3/8', '3/8', '0'],
      ['0', '3/8', '3/8'],
      ['0', '1/2', '0'],
      ['3/8', '3/8', '0'],
      ['1/8', '3/8', '-3/8'],
      ['3/8', '1/8', '3/8'],
      ['0', '0', '1/2'],
      ['-3/8', '-1/8', '3/8'],
      ['0', '-3/8', '3/8'],
      ['-3/8', '0', '-3/8'],
      ['-1/2', '0', '0'],
      ['-3/8', '-3/8', '0'],
      ['3/8', '0', '-3/8'],
      ['0', '0', '-1/2'],
      ['-1/8', '-3/8', '-3/8'],
      ['1/2', '0', '0'],
      ['3/8', '-3/8', '0'],
      ['0', '-1/2', '0'],
    ],
    faces: [
      {
        plane: [
          -0.30151134457776363, 0.9045340337332909, 0.30151134457776363,
          -0.0703125,
        ],
        exactPlane: ['-3/64', '9/64', '3/64', '-9/128'],
      },
      {
        plane: [
          0.309426373877638, 0.928279121632914, -0.20628424925175867,
          -0.0703125,
        ],
        exactPlane: ['3/64', '9/64', '-1/32', '-9/128'],
      },
      {
        plane: [
          0.20628424925175867, 0.309426373877638, 0.928279121632914, -0.0703125,
        ],
        exactPlane: ['1/32', '3/64', '9/64', '-9/128'],
      },
      {
        plane: [
          -0.20628424925175867, -0.309426373877638, 0.928279121632914,
          -0.0703125,
        ],
        exactPlane: ['-1/32', '-3/64', '9/64', '-9/128'],
      },
      {
        plane: [
          -0.9045340337332909, 0.30151134457776363, -0.30151134457776363,
          -0.0703125,
        ],
        exactPlane: ['-9/64', '3/64', '-3/64', '-9/128'],
      },
      {
        plane: [
          -0.928279121632914, -0.309426373877638, 0.20628424925175867,
          -0.0703125,
        ],
        exactPlane: ['-9/64', '-3/64', '1/32', '-9/128'],
      },
      {
        plane: [
          0.309426373877638, 0.20628424925175867, -0.928279121632914,
          -0.0703125,
        ],
        exactPlane: ['3/64', '1/32', '-9/64', '-9/128'],
      },
      {
        plane: [
          -0.309426373877638, -0.20628424925175867, -0.928279121632914,
          -0.0703125,
        ],
        exactPlane: ['-3/64', '-1/32', '-9/64', '-9/128'],
      },
      {
        plane: [
          0.928279121632914, 0.309426373877638, 0.20628424925175867, -0.0703125,
        ],
        exactPlane: ['9/64', '3/64', '1/32', '-9/128'],
      },
      {
        plane: [
          0.9045340337332909, -0.30151134457776363, -0.30151134457776363,
          -0.0703125,
        ],
        exactPlane: ['9/64', '-3/64', '-3/64', '-9/128'],
      },
      {
        plane: [
          -0.309426373877638, -0.928279121632914, -0.20628424925175867,
          -0.0703125,
        ],
        exactPlane: ['-3/64', '-9/64', '-1/32', '-9/128'],
      },
      {
        plane: [
          0.30151134457776363, -0.9045340337332909, 0.30151134457776363,
          -0.0703125,
        ],
        exactPlane: ['3/64', '-9/64', '3/64', '-9/128'],
      },
      {
        plane: [
          -0.3741806781286947, 0.8485149617009122, 0.3741806781286947,
          -0.058486891088561775,
        ],
        exactPlane: [
          '-8598249222514683/180143985094819840',
          '4874478785371479/45035996273704960',
          '8598249222514683/180143985094819840',
          '-84288493092001797/1441151880758558720',
        ],
      },
      {
        plane: [
          0.1282968007849301, 0.9408432057561541, 0.31361440191871803,
          -0.04833984375,
        ],
        exactPlane: ['27/2048', '99/1024', '33/1024', '-99/2048'],
      },
      {
        plane: [
          -0.3071599137982812, 0.9214797413948438, -0.2377559117126728,
          -0.06221504290283141,
        ],
        exactPlane: [
          '-3735888587120413/90071992547409920',
          '11207665761361239/90071992547409920',
          '-5783499455408123/180143985094819840',
          '-11207665761361239/180143985094819840',
        ],
      },
      {
        plane: [
          0.31361440191871803, 0.9408432057561541, 0.1282968007849301,
          -0.04833984375,
        ],
        exactPlane: ['33/1024', '99/1024', '27/2048', '-99/2048'],
      },
      {
        plane: [
          0.5202659817144719, 0.780398972571708, -0.346843987809648,
          -0.04119873046875,
        ],
        exactPlane: ['45/1024', '135/2048', '-15/512', '-675/16384'],
      },
      {
        plane: [
          -0.14821602102291057, 0.9223292347436325, -0.3568484185888477,
          -0.06718591198852425,
        ],
        exactPlane: [
          '-486236063539427/22517998136852480',
          '24206275855685183/180143985094819840',
          '-9365388121333533/180143985094819840',
          '-24206275855685183/360287970189639680',
        ],
      },
      {
        plane: [
          0.346843987809648, 0.5202659817144719, 0.780398972571708,
          -0.04119873046875,
        ],
        exactPlane: ['15/512', '45/1024', '135/2048', '-675/16384'],
      },
      {
        plane: [
          -0.2377559117126728, 0.3071599137982812, 0.9214797413948438,
          -0.06221504290283141,
        ],
        exactPlane: [
          '-5783499455408123/180143985094819840',
          '3735888587120413/90071992547409920',
          '11207665761361239/90071992547409920',
          '-11207665761361239/180143985094819840',
        ],
      },
      {
        plane: [
          0.3568484185888477, -0.14821602102291057, 0.9223292347436325,
          -0.06718591198852425,
        ],
        exactPlane: [
          '9365388121333533/180143985094819840',
          '-486236063539427/22517998136852480',
          '24206275855685183/180143985094819840',
          '-24206275855685183/360287970189639680',
        ],
      },
      {
        plane: [
          -0.3568484185888477, 0.14821602102291057, 0.9223292347436325,
          -0.06718591198852425,
        ],
        exactPlane: [
          '-9365388121333533/180143985094819840',
          '486236063539427/22517998136852480',
          '24206275855685183/180143985094819840',
          '-24206275855685183/360287970189639680',
        ],
      },
      {
        plane: [
          -0.346843987809648, -0.5202659817144719, 0.780398972571708,
          -0.04119873046875,
        ],
        exactPlane: ['-15/512', '-45/1024', '135/2048', '-675/16384'],
      },
      {
        plane: [
          0.2377559117126728, -0.3071599137982812, 0.9214797413948438,
          -0.06221504290283141,
        ],
        exactPlane: [
          '5783499455408123/180143985094819840',
          '-3735888587120413/90071992547409920',
          '11207665761361239/90071992547409920',
          '-11207665761361239/180143985094819840',
        ],
      },
      {
        plane: [
          -0.8485149617009122, 0.3741806781286947, -0.3741806781286947,
          -0.058486891088561775,
        ],
        exactPlane: [
          '-4874478785371479/45035996273704960',
          '8598249222514683/180143985094819840',
          '-8598249222514683/180143985094819840',
          '-84288493092001797/1441151880758558720',
        ],
      },
      {
        plane: [
          -0.9408432057561541, -0.1282968007849301, -0.31361440191871803,
          -0.04833984375,
        ],
        exactPlane: ['-99/1024', '-27/2048', '-33/1024', '-99/2048'],
      },
      {
        plane: [
          -0.9214797413948438, 0.3071599137982812, 0.2377559117126728,
          -0.06221504290283141,
        ],
        exactPlane: [
          '-11207665761361239/90071992547409920',
          '3735888587120413/90071992547409920',
          '5783499455408123/180143985094819840',
          '-11207665761361239/180143985094819840',
        ],
      },
      {
        plane: [
          -0.9223292347436325, 0.14821602102291057, 0.3568484185888477,
          -0.06718591198852425,
        ],
        exactPlane: [
          '-24206275855685183/180143985094819840',
          '486236063539427/22517998136852480',
          '9365388121333533/180143985094819840',
          '-24206275855685183/360287970189639680',
        ],
      },
      {
        plane: [
          -0.9408432057561541, -0.31361440191871803, -0.1282968007849301,
          -0.04833984375,
        ],
        exactPlane: ['-99/1024', '-33/1024', '-27/2048', '-99/2048'],
      },
      {
        plane: [
          -0.780398972571708, -0.5202659817144719, 0.346843987809648,
          -0.04119873046875,
        ],
        exactPlane: ['-135/2048', '-45/1024', '15/512', '-675/16384'],
      },
      {
        plane: [
          0.5202659817144719, 0.346843987809648, -0.780398972571708,
          -0.04119873046875,
        ],
        exactPlane: ['45/1024', '15/512', '-135/2048', '-675/16384'],
      },
      {
        plane: [
          0.3071599137982812, -0.2377559117126728, -0.9214797413948438,
          -0.06221504290283141,
        ],
        exactPlane: [
          '3735888587120413/90071992547409920',
          '-5783499455408123/180143985094819840',
          '-11207665761361239/90071992547409920',
          '-11207665761361239/180143985094819840',
        ],
      },
      {
        plane: [
          -0.14821602102291057, 0.3568484185888477, -0.9223292347436325,
          -0.06718591198852425,
        ],
        exactPlane: [
          '-486236063539427/22517998136852480',
          '9365388121333533/180143985094819840',
          '-24206275855685183/180143985094819840',
          '-24206275855685183/360287970189639680',
        ],
      },
      {
        plane: [
          -0.3071599137982812, 0.2377559117126728, -0.9214797413948438,
          -0.06221504290283141,
        ],
        exactPlane: [
          '-3735888587120413/90071992547409920',
          '5783499455408123/180143985094819840',
          '-11207665761361239/90071992547409920',
          '-11207665761361239/180143985094819840',
        ],
      },
      {
        plane: [
          0.14821602102291057, -0.3568484185888477, -0.9223292347436325,
          -0.06718591198852425,
        ],
        exactPlane: [
          '486236063539427/22517998136852480',
          '-9365388121333533/180143985094819840',
          '-24206275855685183/180143985094819840',
          '-24206275855685183/360287970189639680',
        ],
      },
      {
        plane: [
          -0.5202659817144719, -0.346843987809648, -0.780398972571708,
          -0.04119873046875,
        ],
        exactPlane: ['-45/1024', '-15/512', '-135/2048', '-675/16384'],
      },
      {
        plane: [
          0.780398972571708, 0.5202659817144719, 0.346843987809648,
          -0.04119873046875,
        ],
        exactPlane: ['135/2048', '45/1024', '15/512', '-675/16384'],
      },
      {
        plane: [
          0.9223292347436325, -0.14821602102291057, 0.3568484185888477,
          -0.06718591198852425,
        ],
        exactPlane: [
          '24206275855685183/180143985094819840',
          '-486236063539427/22517998136852480',
          '9365388121333533/180143985094819840',
          '-24206275855685183/360287970189639680',
        ],
      },
      {
        plane: [
          0.9408432057561541, 0.31361440191871803, -0.1282968007849301,
          -0.04833984375,
        ],
        exactPlane: ['99/1024', '33/1024', '-27/2048', '-99/2048'],
      },
      {
        plane: [
          0.9408432057561541, 0.1282968007849301, -0.31361440191871803,
          -0.04833984375,
        ],
        exactPlane: ['99/1024', '27/2048', '-33/1024', '-99/2048'],
      },
      {
        plane: [
          0.9214797413948438, -0.3071599137982812, 0.2377559117126728,
          -0.06221504290283141,
        ],
        exactPlane: [
          '11207665761361239/90071992547409920',
          '-3735888587120413/90071992547409920',
          '5783499455408123/180143985094819840',
          '-11207665761361239/180143985094819840',
        ],
      },
      {
        plane: [
          0.8485149617009122, -0.3741806781286947, -0.3741806781286947,
          -0.058486891088561775,
        ],
        exactPlane: [
          '4874478785371479/45035996273704960',
          '-8598249222514683/180143985094819840',
          '-8598249222514683/180143985094819840',
          '-84288493092001797/1441151880758558720',
        ],
      },
      {
        plane: [
          -0.5202659817144719, -0.780398972571708, -0.346843987809648,
          -0.04119873046875,
        ],
        exactPlane: ['-45/1024', '-135/2048', '-15/512', '-675/16384'],
      },
      {
        plane: [
          0.14821602102291057, -0.9223292347436325, -0.3568484185888477,
          -0.06718591198852425,
        ],
        exactPlane: [
          '486236063539427/22517998136852480',
          '-24206275855685183/180143985094819840',
          '-9365388121333533/180143985094819840',
          '-24206275855685183/360287970189639680',
        ],
      },
      {
        plane: [
          -0.31361440191871803, -0.9408432057561541, 0.1282968007849301,
          -0.04833984375,
        ],
        exactPlane: ['-33/1024', '-99/1024', '27/2048', '-99/2048'],
      },
      {
        plane: [
          0.3741806781286947, -0.8485149617009122, 0.3741806781286947,
          -0.058486891088561775,
        ],
        exactPlane: [
          '8598249222514683/180143985094819840',
          '-4874478785371479/45035996273704960',
          '8598249222514683/180143985094819840',
          '-84288493092001797/1441151880758558720',
        ],
      },
      {
        plane: [
          -0.1282968007849301, -0.9408432057561541, 0.31361440191871803,
          -0.04833984375,
        ],
        exactPlane: ['-27/2048', '-99/1024', '33/1024', '-99/2048'],
      },
      {
        plane: [
          0.3071599137982812, -0.9214797413948438, -0.2377559117126728,
          -0.06221504290283141,
        ],
        exactPlane: [
          '3735888587120413/90071992547409920',
          '-11207665761361239/90071992547409920',
          '-5783499455408123/180143985094819840',
          '-11207665761361239/180143985094819840',
        ],
      },
    ],
    facets: [
      { edge: 76 },
      { edge: 82 },
      { edge: 88 },
      { edge: 94 },
      { edge: 100 },
      { edge: 106 },
      { edge: 112 },
      { edge: 118 },
      { edge: 124 },
      { edge: 130 },
      { edge: 136 },
      { edge: 142 },
      { edge: 73 },
      { edge: 75 },
      { edge: 77 },
      { edge: 79 },
      { edge: 81 },
      { edge: 83 },
      { edge: 85 },
      { edge: 87 },
      { edge: 89 },
      { edge: 91 },
      { edge: 93 },
      { edge: 95 },
      { edge: 97 },
      { edge: 99 },
      { edge: 101 },
      { edge: 103 },
      { edge: 105 },
      { edge: 107 },
      { edge: 109 },
      { edge: 111 },
      { edge: 113 },
      { edge: 115 },
      { edge: 117 },
      { edge: 119 },
      { edge: 121 },
      { edge: 123 },
      { edge: 125 },
      { edge: 127 },
      { edge: 129 },
      { edge: 131 },
      { edge: 133 },
      { edge: 135 },
      { edge: 137 },
      { edge: 139 },
      { edge: 141 },
      { edge: 143 },
    ],
    isClosed: true,
  });
});
