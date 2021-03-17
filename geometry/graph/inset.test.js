import { initCgal } from '@jsxcad/algorithm-cgal';
import { inset } from './inset.js';
import { realizeGraph } from './realizeGraph.js';
import test from 'ava';

Error.stackTraceLimit = Infinity;

test.beforeEach(async (t) => {
  await initCgal();
});

test('inset', (t) => {
  const graph = {
    isClosed: false,
    isLazy: false,
    provenance: 'fromPolygonsWithHoles',
    edges: [
      { point: 0, next: 2, twin: 1, facet: 0, face: 0 }, // 0
      { point: 1, next: 22, twin: 0, facet: 4, face: 0 },
      { point: 1, next: 4, twin: 3, facet: 0, face: 0 },
      { point: 2, next: 9, twin: 2, facet: -1, face: -1 },
      { point: 2, next: 0, twin: 5, facet: 0, face: 0 },
      { point: 0, next: 15, twin: 4, facet: 8, face: 0 }, // 5
      { point: 3, next: 8, twin: 7, facet: 1, face: 0 },
      { point: 4, next: 20, twin: 6, facet: 3, face: 0 },
      { point: 4, next: 10, twin: 9, facet: 1, face: 0 },
      { point: 1, next: 33, twin: 8, facet: -1, face: -1 },
      { point: 1, next: 6, twin: 11, facet: 1, face: 0 }, // 10
      { point: 3, next: 25, twin: 10, facet: 6, face: 0 },
      { point: 5, next: 14, twin: 13, facet: 2, face: 0 },
      { point: 6, next: 26, twin: 12, facet: 5, face: 0 },
      { point: 6, next: 16, twin: 15, facet: 2, face: 0 },
      { point: 2, next: 34, twin: 14, facet: 8, face: 0 }, // 15
      { point: 2, next: 12, twin: 17, facet: 2, face: 0 },
      { point: 5, next: 3, twin: 16, facet: -1, face: -1 },
      { point: 7, next: 7, twin: 19, facet: 3, face: 0 },
      { point: 4, next: 27, twin: 18, facet: 7, face: 0 },
      { point: 3, next: 18, twin: 21, facet: 3, face: 0 }, // 20
      { point: 7, next: 31, twin: 20, facet: -1, face: -1 },
      { point: 0, next: 24, twin: 23, facet: 4, face: 0 },
      { point: 8, next: 35, twin: 22, facet: -1, face: -1 },
      { point: 8, next: 1, twin: 25, facet: 4, face: 0 },
      { point: 1, next: 30, twin: 24, facet: 6, face: 0 }, // 25
      { point: 5, next: 28, twin: 27, facet: 5, face: 0 },
      { point: 7, next: 32, twin: 26, facet: 7, face: 0 },
      { point: 7, next: 13, twin: 29, facet: 5, face: 0 },
      { point: 6, next: 21, twin: 28, facet: -1, face: -1 },
      { point: 8, next: 11, twin: 31, facet: 6, face: 0 }, // 30
      { point: 3, next: 23, twin: 30, facet: -1, face: -1 },
      { point: 5, next: 19, twin: 33, facet: 7, face: 0 },
      { point: 4, next: 17, twin: 32, facet: -1, face: -1 },
      { point: 6, next: 5, twin: 35, facet: 8, face: 0 },
      { point: 0, next: 29, twin: 34, facet: -1, face: -1 }, // 35
    ],
    points: [
      [5.629165124598852, 3.2499999999999996, 0],
      [10, -10, 0],
      [10, 10, 0],
      [3.9801020972288977e-16, -6.5, 0],
      [-10, -10, 0],
      [-10, 10, 0],
      [-3.2499999999999996, 3.2499999999999996, 0],
      [-5.629165124598852, 3.2499999999999996, 0],
      [2.379165124598851, -2.379165124598851, 0],
    ],
    exactPoints: [
      [
        '6337876489387595/1125899906842624',
        '7318349394477055/2251799813685248',
        '0',
      ],
      ['10', '-10', '0'],
      ['10', '10', '0'],
      ['8072606100034955/20282409603651670423947251286016', '-13/2', '0'],
      ['-10', '-10', '0'],
      ['-10', '10', '0'],
      [
        '-7318349394477055/2251799813685248',
        '7318349394477055/2251799813685248',
        '0',
      ],
      [
        '-6337876489387595/1125899906842624',
        '7318349394477055/2251799813685248',
        '0',
      ],
      [
        '5357403584298133/2251799813685248',
        '-5357403584298133/2251799813685248',
        '0',
      ],
    ],
    faces: [
      {
        plane: [0, 0, 0.9999999999999998, 0],
        exactPlane: ['0', '0', '24605612895193225/24605612895193228', '0'],
      },
    ],
    facets: [
      { edge: 4 },
      { edge: 10 },
      { edge: 16 },
      { edge: 20 },
      { edge: 24 },
      { edge: 28 },
      { edge: 30 },
      { edge: 32 },
      { edge: 34 },
    ],
  };
  const insetGraphs = inset(graph, 1);
  t.deepEqual(
    JSON.parse(JSON.stringify(insetGraphs.map((graph) => realizeGraph(graph)))),
    [
      {
        isClosed: false,
        isLazy: false,
        provenance: 'fromPolygonsWithHoles',
        edges: [
          { point: 0, next: 2, twin: 1, facet: 0, face: 0 },
          { point: 1, next: 69, twin: 0, facet: -1, face: -1 },
          { point: 1, next: 4, twin: 3, facet: 0, face: 0 },
          { point: 2, next: 52, twin: 2, facet: 11, face: 0 },
          { point: 2, next: 0, twin: 5, facet: 0, face: 0 },
          { point: 0, next: 67, twin: 4, facet: 15, face: 0 },
          { point: 3, next: 8, twin: 7, facet: 1, face: 0 },
          { point: 4, next: 95, twin: 6, facet: -1, face: -1 },
          { point: 4, next: 10, twin: 9, facet: 1, face: 0 },
          { point: 5, next: 28, twin: 8, facet: 5, face: 0 },
          { point: 5, next: 6, twin: 11, facet: 1, face: 0 },
          { point: 3, next: 93, twin: 10, facet: 22, face: 0 },
          { point: 6, next: 14, twin: 13, facet: 2, face: 0 },
          { point: 7, next: 159, twin: 12, facet: 40, face: 0 },
          { point: 7, next: 16, twin: 15, facet: 2, face: 0 },
          { point: 8, next: 163, twin: 14, facet: -1, face: -1 },
          { point: 8, next: 12, twin: 17, facet: 2, face: 0 },
          { point: 6, next: 24, twin: 16, facet: 4, face: 0 },
          { point: 9, next: 20, twin: 19, facet: 3, face: 0 },
          { point: 10, next: 114, twin: 18, facet: 27, face: 0 },
          { point: 10, next: 22, twin: 21, facet: 3, face: 0 },
          { point: 11, next: 101, twin: 20, facet: 25, face: 0 },
          { point: 11, next: 18, twin: 23, facet: 3, face: 0 },
          { point: 9, next: 105, twin: 22, facet: -1, face: -1 },
          { point: 8, next: 26, twin: 25, facet: 4, face: 0 },
          { point: 12, next: 15, twin: 24, facet: -1, face: -1 },
          { point: 12, next: 17, twin: 27, facet: 4, face: 0 },
          { point: 6, next: 32, twin: 26, facet: 6, face: 0 },
          { point: 4, next: 30, twin: 29, facet: 5, face: 0 },
          { point: 10, next: 98, twin: 28, facet: 23, face: 0 },
          { point: 10, next: 9, twin: 31, facet: 5, face: 0 },
          { point: 5, next: 133, twin: 30, facet: -1, face: -1 },
          { point: 12, next: 34, twin: 33, facet: 6, face: 0 },
          { point: 2, next: 36, twin: 32, facet: 7, face: 0 },
          { point: 2, next: 27, twin: 35, facet: 6, face: 0 },
          { point: 6, next: 55, twin: 34, facet: -1, face: -1 },
          { point: 12, next: 38, twin: 37, facet: 7, face: 0 },
          { point: 13, next: 25, twin: 36, facet: -1, face: -1 },
          { point: 13, next: 33, twin: 39, facet: 7, face: 0 },
          { point: 2, next: 40, twin: 38, facet: 8, face: 0 },
          { point: 13, next: 42, twin: 41, facet: 8, face: 0 },
          { point: 14, next: 37, twin: 40, facet: -1, face: -1 },
          { point: 14, next: 39, twin: 43, facet: 8, face: 0 },
          { point: 2, next: 44, twin: 42, facet: 9, face: 0 },
          { point: 14, next: 46, twin: 45, facet: 9, face: 0 },
          { point: 15, next: 41, twin: 44, facet: -1, face: -1 },
          { point: 15, next: 43, twin: 47, facet: 9, face: 0 },
          { point: 2, next: 48, twin: 46, facet: 10, face: 0 },
          { point: 15, next: 50, twin: 49, facet: 10, face: 0 },
          { point: 16, next: 45, twin: 48, facet: -1, face: -1 },
          { point: 16, next: 47, twin: 51, facet: 10, face: 0 },
          { point: 2, next: 56, twin: 50, facet: 12, face: 0 },
          { point: 1, next: 54, twin: 53, facet: 11, face: 0 },
          { point: 5, next: 70, twin: 52, facet: 16, face: 0 },
          { point: 5, next: 3, twin: 55, facet: 11, face: 0 },
          { point: 2, next: 31, twin: 54, facet: -1, face: -1 },
          { point: 16, next: 58, twin: 57, facet: 12, face: 0 },
          { point: 17, next: 49, twin: 56, facet: -1, face: -1 },
          { point: 17, next: 51, twin: 59, facet: 12, face: 0 },
          { point: 2, next: 60, twin: 58, facet: 13, face: 0 },
          { point: 17, next: 62, twin: 61, facet: 13, face: 0 },
          { point: 18, next: 57, twin: 60, facet: -1, face: -1 },
          { point: 18, next: 59, twin: 63, facet: 13, face: 0 },
          { point: 2, next: 64, twin: 62, facet: 14, face: 0 },
          { point: 18, next: 66, twin: 65, facet: 14, face: 0 },
          { point: 19, next: 61, twin: 64, facet: -1, face: -1 },
          { point: 19, next: 63, twin: 67, facet: 14, face: 0 },
          { point: 2, next: 68, twin: 66, facet: 15, face: 0 },
          { point: 19, next: 5, twin: 69, facet: 15, face: 0 },
          { point: 0, next: 65, twin: 68, facet: -1, face: -1 },
          { point: 1, next: 72, twin: 71, facet: 16, face: 0 },
          { point: 20, next: 1, twin: 70, facet: -1, face: -1 },
          { point: 20, next: 53, twin: 73, facet: 16, face: 0 },
          { point: 5, next: 74, twin: 72, facet: 17, face: 0 },
          { point: 20, next: 76, twin: 75, facet: 17, face: 0 },
          { point: 21, next: 71, twin: 74, facet: -1, face: -1 },
          { point: 21, next: 73, twin: 77, facet: 17, face: 0 },
          { point: 5, next: 78, twin: 76, facet: 18, face: 0 },
          { point: 21, next: 80, twin: 79, facet: 18, face: 0 },
          { point: 22, next: 75, twin: 78, facet: -1, face: -1 },
          { point: 22, next: 77, twin: 81, facet: 18, face: 0 },
          { point: 5, next: 82, twin: 80, facet: 19, face: 0 },
          { point: 22, next: 84, twin: 83, facet: 19, face: 0 },
          { point: 23, next: 79, twin: 82, facet: -1, face: -1 },
          { point: 23, next: 81, twin: 85, facet: 19, face: 0 },
          { point: 5, next: 86, twin: 84, facet: 20, face: 0 },
          { point: 23, next: 88, twin: 87, facet: 20, face: 0 },
          { point: 24, next: 83, twin: 86, facet: -1, face: -1 },
          { point: 24, next: 85, twin: 89, facet: 20, face: 0 },
          { point: 5, next: 90, twin: 88, facet: 21, face: 0 },
          { point: 24, next: 92, twin: 91, facet: 21, face: 0 },
          { point: 25, next: 87, twin: 90, facet: -1, face: -1 },
          { point: 25, next: 89, twin: 93, facet: 21, face: 0 },
          { point: 5, next: 94, twin: 92, facet: 22, face: 0 },
          { point: 25, next: 11, twin: 95, facet: 22, face: 0 },
          { point: 3, next: 91, twin: 94, facet: -1, face: -1 },
          { point: 26, next: 29, twin: 97, facet: 23, face: 0 },
          { point: 10, next: 102, twin: 96, facet: 24, face: 0 },
          { point: 4, next: 96, twin: 99, facet: 23, face: 0 },
          { point: 26, next: 7, twin: 98, facet: -1, face: -1 },
          { point: 27, next: 97, twin: 101, facet: 24, face: 0 },
          { point: 10, next: 104, twin: 100, facet: 25, face: 0 },
          { point: 26, next: 100, twin: 103, facet: 24, face: 0 },
          { point: 27, next: 99, twin: 102, facet: -1, face: -1 },
          { point: 27, next: 21, twin: 105, facet: 25, face: 0 },
          { point: 11, next: 103, twin: 104, facet: -1, face: -1 },
          { point: 28, next: 108, twin: 107, facet: 26, face: 0 },
          { point: 29, next: 125, twin: 106, facet: -1, face: -1 },
          { point: 29, next: 110, twin: 109, facet: 26, face: 0 },
          { point: 10, next: 126, twin: 108, facet: 31, face: 0 },
          { point: 10, next: 106, twin: 111, facet: 26, face: 0 },
          { point: 28, next: 121, twin: 110, facet: 30, face: 0 },
          { point: 30, next: 19, twin: 113, facet: 27, face: 0 },
          { point: 10, next: 118, twin: 112, facet: 28, face: 0 },
          { point: 9, next: 112, twin: 115, facet: 27, face: 0 },
          { point: 30, next: 23, twin: 114, facet: -1, face: -1 },
          { point: 31, next: 113, twin: 117, facet: 28, face: 0 },
          { point: 10, next: 122, twin: 116, facet: 29, face: 0 },
          { point: 30, next: 116, twin: 119, facet: 28, face: 0 },
          { point: 31, next: 115, twin: 118, facet: -1, face: -1 },
          { point: 32, next: 117, twin: 121, facet: 29, face: 0 },
          { point: 10, next: 124, twin: 120, facet: 30, face: 0 },
          { point: 31, next: 120, twin: 123, facet: 29, face: 0 },
          { point: 32, next: 119, twin: 122, facet: -1, face: -1 },
          { point: 32, next: 111, twin: 125, facet: 30, face: 0 },
          { point: 28, next: 123, twin: 124, facet: -1, face: -1 },
          { point: 29, next: 128, twin: 127, facet: 31, face: 0 },
          { point: 33, next: 107, twin: 126, facet: -1, face: -1 },
          { point: 33, next: 109, twin: 129, facet: 31, face: 0 },
          { point: 10, next: 130, twin: 128, facet: 32, face: 0 },
          { point: 33, next: 132, twin: 131, facet: 32, face: 0 },
          { point: 6, next: 136, twin: 130, facet: 33, face: 0 },
          { point: 6, next: 129, twin: 133, facet: 32, face: 0 },
          { point: 10, next: 35, twin: 132, facet: -1, face: -1 },
          { point: 34, next: 131, twin: 135, facet: 33, face: 0 },
          { point: 6, next: 140, twin: 134, facet: 34, face: 0 },
          { point: 33, next: 134, twin: 137, facet: 33, face: 0 },
          { point: 34, next: 127, twin: 136, facet: -1, face: -1 },
          { point: 35, next: 135, twin: 139, facet: 34, face: 0 },
          { point: 6, next: 144, twin: 138, facet: 35, face: 0 },
          { point: 34, next: 138, twin: 141, facet: 34, face: 0 },
          { point: 35, next: 137, twin: 140, facet: -1, face: -1 },
          { point: 36, next: 139, twin: 143, facet: 35, face: 0 },
          { point: 6, next: 148, twin: 142, facet: 36, face: 0 },
          { point: 35, next: 142, twin: 145, facet: 35, face: 0 },
          { point: 36, next: 141, twin: 144, facet: -1, face: -1 },
          { point: 37, next: 143, twin: 147, facet: 36, face: 0 },
          { point: 6, next: 152, twin: 146, facet: 37, face: 0 },
          { point: 36, next: 146, twin: 149, facet: 36, face: 0 },
          { point: 37, next: 145, twin: 148, facet: -1, face: -1 },
          { point: 38, next: 147, twin: 151, facet: 37, face: 0 },
          { point: 6, next: 156, twin: 150, facet: 38, face: 0 },
          { point: 37, next: 150, twin: 153, facet: 37, face: 0 },
          { point: 38, next: 149, twin: 152, facet: -1, face: -1 },
          { point: 39, next: 151, twin: 155, facet: 38, face: 0 },
          { point: 6, next: 160, twin: 154, facet: 39, face: 0 },
          { point: 38, next: 154, twin: 157, facet: 38, face: 0 },
          { point: 39, next: 153, twin: 156, facet: -1, face: -1 },
          { point: 40, next: 155, twin: 159, facet: 39, face: 0 },
          { point: 6, next: 162, twin: 158, facet: 40, face: 0 },
          { point: 39, next: 158, twin: 161, facet: 39, face: 0 },
          { point: 40, next: 157, twin: 160, facet: -1, face: -1 },
          { point: 40, next: 13, twin: 163, facet: 40, face: 0 },
          { point: 7, next: 161, twin: 162, facet: -1, face: -1 },
        ],
        points: [
          [0.19509032201612922, -7.4807852804032295, 0],
          [7.657137397853899e-16, -7.499999999999999, 0],
          [9, -8.999999999999998, 0],
          [-6.553079532511286, 2.86731656763491, 0],
          [-6.60998528040323, 3.0549096779838716, 0],
          [-9, -8.999999999999998, 0],
          [9, 8.999999999999998, 0],
          [6.6099852804032295, 3.4450903220161306, 0],
          [6.6292, 3.250000000000002, 0],
          [-6.460669612302545, 3.8055702330196017, 0],
          [-9, 8.999999999999998, 0],
          [-6.553079532511286, 3.6326834323650896, 0],
          [6.60998528040323, 3.0549096779838734, 0],
          [6.553079532511287, 2.8673165676349117, 0],
          [6.460669612302546, 2.6944297669803987, 0],
          [3.210669612302546, -2.9347702330196, 0],
          [0.8314696123025462, -7.0555702330196, 0],
          [0.7071067811865487, -7.207106781186545, 0],
          [0.5555702330196034, -7.331469612302544, 0],
          [0.3826834323650909, -7.423879532511285, 0],
          [-0.19509032201612772, -7.4807852804032295, 0],
          [-0.38268343236508945, -7.423879532511286, 0],
          [-0.5555702330196022, -7.331469612302545, 0],
          [-0.7071067811865476, -7.207106781186547, 0],
          [-0.8314696123025453, -7.055570233019601, 0],
          [-6.460669612302545, 2.694429766980398, 0],
          [-6.6292, 3.2499999999999996, 0],
          [-6.60998528040323, 3.445090322016128, 0],
          [-5.824290322016128, 4.230785280403229, 0],
          [-5.6292, 4.249999999999998, 0],
          [-6.336306781186547, 3.957106781186547, 0],
          [-6.184770233019602, 4.081469612302544, 0],
          [-6.01188343236509, 4.173879532511285, 0],
          [-3.25, 4.249999999999998, 0],
          [5.6292, 4.249999999999998, 0],
          [5.8242903220161235, 4.2307852804032295, 0],
          [6.011883432365086, 4.173879532511287, 0],
          [6.184770233019599, 4.081469612302546, 0],
          [6.336306781186544, 3.9571067811865497, 0],
          [6.460669612302543, 3.8055702330196044, 0],
          [6.553079532511285, 3.6326834323650923, 0],
        ],
        exactPoints: [
          [
            '7028869612283437/36028797018963968',
            '-8422615450315669/1125899906842624',
            '0',
          ],
          [
            '3882629927367807/5070602400912917605986812821504',
            '-8444249301319679/1125899906842624',
            '0',
          ],
          ['9', '-5066549580791807/562949953421312', '0'],
          [
            '-7378111635186763/1125899906842624',
            '6456622912776915/2251799813685248',
            '0',
          ],
          [
            '-7442181811437113/1125899906842624',
            '6879045043709343/2251799813685248',
            '0',
          ],
          ['-9', '-5066549580791807/562949953421312', '0'],
          ['9', '5066549580791807/562949953421312', '0'],
          [
            '930272726429639/140737488355328',
            '3878826872622387/1125899906842624',
            '0',
          ],
          [
            '7463815662441123/1125899906842624',
            '7318349394477061/2251799813685248',
            '0',
          ],
          [
            '-7274067314632407/1125899906842624',
            '8569382341679665/2251799813685248',
            '0',
          ],
          ['-9', '5066549580791807/562949953421312', '0'],
          [
            '-7378111635186763/1125899906842624',
            '2045018969044299/562949953421312',
            '0',
          ],
          [
            '7442181811437113/1125899906842624',
            '6879045043709347/2251799813685248',
            '0',
          ],
          [
            '1844527908796691/281474976710656',
            '6456622912776919/2251799813685248',
            '0',
          ],
          [
            '909258414329051/140737488355328',
            '379207277954653/140737488355328',
            '0',
          ],
          [
            '7229785234787761/2251799813685248',
            '-6608515063922547/2251799813685248',
            '0',
          ],
          [
            '1872303118067819/2251799813685248',
            '-7943865868078359/1125899906842624',
            '0',
          ],
          [
            '6369051672525783/9007199254740992',
            '-8114480853542775/1125899906842624',
            '0',
          ],
          [
            '5004131788810451/9007199254740992',
            '-8254500953510963/1125899906842624',
            '0',
          ],
          [
            '6893811853601143/18014398509481984',
            '-8358545274065319/1125899906842624',
            '0',
          ],
          [
            '-7028869612283383/36028797018963968',
            '-8422615450315669/1125899906842624',
            '0',
          ],
          [
            '-6893811853601117/18014398509481984',
            '-1044818159258165/140737488355328',
            '0',
          ],
          [
            '-625516473601305/1125899906842624',
            '-2063625238377741/281474976710656',
            '0',
          ],
          [
            '-6369051672525773/9007199254740992',
            '-8114480853542777/1125899906842624',
            '0',
          ],
          [
            '-1872303118067817/2251799813685248',
            '-992983233509795/140737488355328',
            '0',
          ],
          [
            '-7274067314632407/1125899906842624',
            '3033658223637223/1125899906842624',
            '0',
          ],
          [
            '-7463815662441123/1125899906842624',
            '7318349394477055/2251799813685248',
            '0',
          ],
          [
            '-7442181811437113/1125899906842624',
            '242426679538899/70368744177664',
            '0',
          ],
          [
            '-6557567930982355/1125899906842624',
            '1190860188269285/281474976710656',
            '0',
          ],
          [
            '-6337915755598499/1125899906842624',
            '2392537302040575/562949953421312',
            '0',
          ],
          [
            '-1783511803666055/281474976710656',
            '4455306156304249/1125899906842624',
            '0',
          ],
          [
            '-1740858057299951/281474976710656',
            '4595326256272435/1125899906842624',
            '0',
          ],
          [
            '-6768778996448569/1125899906842624',
            '4699370576826791/1125899906842624',
            '0',
          ],
          ['-13/4', '2392537302040575/562949953421312', '0'],
          [
            '6337915755598499/1125899906842624',
            '2392537302040575/562949953421312',
            '0',
          ],
          [
            '3278783965491175/562949953421312',
            '4763440753077141/1125899906842624',
            '0',
          ],
          [
            '6768778996448565/1125899906842624',
            '4699370576826793/1125899906842624',
            '0',
          ],
          [
            '870429028649975/140737488355328',
            '4595326256272437/1125899906842624',
            '0',
          ],
          [
            '7134047214664217/1125899906842624',
            '1113826539076063/281474976710656',
            '0',
          ],
          [
            '7274067314632405/1125899906842624',
            '8569382341679671/2251799813685248',
            '0',
          ],
          [
            '3689055817593381/562949953421312',
            '4090037938088601/1125899906842624',
            '0',
          ],
        ],
        faces: [
          {
            plane: [0, 0, 1, 0],
            exactPlane: [
              '0',
              '0',
              '2657923183378020256652380554243470820665084905/2657923183378020043464994496011353219863150592',
              '0',
            ],
          },
        ],
        facets: [
          { edge: 4 },
          { edge: 10 },
          { edge: 16 },
          { edge: 22 },
          { edge: 26 },
          { edge: 30 },
          { edge: 34 },
          { edge: 38 },
          { edge: 42 },
          { edge: 46 },
          { edge: 50 },
          { edge: 54 },
          { edge: 58 },
          { edge: 62 },
          { edge: 66 },
          { edge: 68 },
          { edge: 72 },
          { edge: 76 },
          { edge: 80 },
          { edge: 84 },
          { edge: 88 },
          { edge: 92 },
          { edge: 94 },
          { edge: 98 },
          { edge: 102 },
          { edge: 104 },
          { edge: 110 },
          { edge: 114 },
          { edge: 118 },
          { edge: 122 },
          { edge: 124 },
          { edge: 128 },
          { edge: 132 },
          { edge: 136 },
          { edge: 140 },
          { edge: 144 },
          { edge: 148 },
          { edge: 152 },
          { edge: 156 },
          { edge: 160 },
          { edge: 162 },
        ],
      },
    ]
  );
});