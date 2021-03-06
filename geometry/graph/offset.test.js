import { fromPaths } from './fromPaths.js';
import { initCgal } from '@jsxcad/algorithm-cgal';
import { offset } from './offset.js';
import { realizeGraph } from './realizeGraph.js';
import test from 'ava';
import { test as testGraph } from './test.js';

Error.stackTraceLimit = Infinity;

test.beforeEach(async (t) => {
  await initCgal();
});

test('offset', (t) => {
  const square = [
    {
      points: [
        [-0.5, 0.5, -0.5],
        [0.5, 0.5, -0.5],
        [0.5, -0.5, -0.5],
        [-0.5, -0.5, -0.5],
      ],
    },
  ];
  const geometry = fromPaths({}, square);
  const offsetGeometries = offset(geometry, -0.2);
  for (const geometry of offsetGeometries) {
    testGraph(geometry);
  }
  t.deepEqual(
    JSON.parse(
      JSON.stringify(offsetGeometries.map((geometry) => realizeGraph(geometry)))
    ),
    [
      {
        type: 'graph',
        graph: {
          isClosed: false,
          isLazy: false,
          edges: [
            { point: 0, next: 2, twin: 1, facet: 0, face: 0 },
            { point: 1, next: 5, twin: 0, facet: -1, face: -1 },
            { point: 1, next: 4, twin: 3, facet: 0, face: 0 },
            { point: 2, next: 12, twin: 2, facet: 2, face: 0 },
            { point: 2, next: 0, twin: 5, facet: 0, face: 0 },
            { point: 0, next: 29, twin: 4, facet: -1, face: -1 },
            { point: 3, next: 8, twin: 7, facet: 1, face: 0 },
            { point: 4, next: 11, twin: 6, facet: -1, face: -1 },
            { point: 4, next: 10, twin: 9, facet: 1, face: 0 },
            { point: 5, next: 16, twin: 8, facet: 3, face: 0 },
            { point: 5, next: 6, twin: 11, facet: 1, face: 0 },
            { point: 3, next: 19, twin: 10, facet: -1, face: -1 },
            { point: 1, next: 14, twin: 13, facet: 2, face: 0 },
            { point: 6, next: 1, twin: 12, facet: -1, face: -1 },
            { point: 6, next: 3, twin: 15, facet: 2, face: 0 },
            { point: 2, next: 21, twin: 14, facet: 5, face: 0 },
            { point: 4, next: 18, twin: 17, facet: 3, face: 0 },
            { point: 7, next: 20, twin: 16, facet: 4, face: 0 },
            { point: 7, next: 9, twin: 19, facet: 3, face: 0 },
            { point: 5, next: 23, twin: 18, facet: -1, face: -1 },
            { point: 4, next: 22, twin: 21, facet: 4, face: 0 },
            { point: 6, next: 24, twin: 20, facet: 5, face: 0 },
            { point: 6, next: 17, twin: 23, facet: 4, face: 0 },
            { point: 7, next: 13, twin: 22, facet: -1, face: -1 },
            { point: 4, next: 15, twin: 25, facet: 5, face: 0 },
            { point: 2, next: 26, twin: 24, facet: 6, face: 0 },
            { point: 4, next: 28, twin: 27, facet: 6, face: 0 },
            { point: 8, next: 30, twin: 26, facet: 7, face: 0 },
            { point: 8, next: 25, twin: 29, facet: 6, face: 0 },
            { point: 2, next: 33, twin: 28, facet: -1, face: -1 },
            { point: 4, next: 32, twin: 31, facet: 7, face: 0 },
            { point: 9, next: 36, twin: 30, facet: 8, face: 0 },
            { point: 9, next: 27, twin: 33, facet: 7, face: 0 },
            { point: 8, next: 137, twin: 32, facet: -1, face: -1 },
            { point: 10, next: 31, twin: 35, facet: 8, face: 0 },
            { point: 9, next: 67, twin: 34, facet: 16, face: 0 },
            { point: 4, next: 34, twin: 37, facet: 8, face: 0 },
            { point: 10, next: 7, twin: 36, facet: -1, face: -1 },
            { point: 11, next: 40, twin: 39, facet: 9, face: 0 },
            { point: 12, next: 43, twin: 38, facet: -1, face: -1 },
            { point: 12, next: 42, twin: 41, facet: 9, face: 0 },
            { point: 10, next: 53, twin: 40, facet: 13, face: 0 },
            { point: 10, next: 38, twin: 43, facet: 9, face: 0 },
            { point: 11, next: 37, twin: 42, facet: -1, face: -1 },
            { point: 12, next: 46, twin: 45, facet: 10, face: 0 },
            { point: 13, next: 39, twin: 44, facet: -1, face: -1 },
            { point: 13, next: 48, twin: 47, facet: 10, face: 0 },
            { point: 14, next: 45, twin: 46, facet: -1, face: -1 },
            { point: 14, next: 44, twin: 49, facet: 10, face: 0 },
            { point: 12, next: 50, twin: 48, facet: 11, face: 0 },
            { point: 14, next: 52, twin: 51, facet: 11, face: 0 },
            { point: 15, next: 54, twin: 50, facet: 12, face: 0 },
            { point: 15, next: 49, twin: 53, facet: 11, face: 0 },
            { point: 12, next: 58, twin: 52, facet: 13, face: 0 },
            { point: 14, next: 56, twin: 55, facet: 12, face: 0 },
            { point: 16, next: 47, twin: 54, facet: -1, face: -1 },
            { point: 16, next: 51, twin: 57, facet: 12, face: 0 },
            { point: 15, next: 55, twin: 56, facet: -1, face: -1 },
            { point: 15, next: 41, twin: 59, facet: 13, face: 0 },
            { point: 10, next: 65, twin: 58, facet: 15, face: 0 },
            { point: 15, next: 62, twin: 61, facet: 14, face: 0 },
            { point: 17, next: 57, twin: 60, facet: -1, face: -1 },
            { point: 17, next: 64, twin: 63, facet: 14, face: 0 },
            { point: 18, next: 61, twin: 62, facet: -1, face: -1 },
            { point: 18, next: 60, twin: 65, facet: 14, face: 0 },
            { point: 15, next: 66, twin: 64, facet: 15, face: 0 },
            { point: 18, next: 59, twin: 67, facet: 15, face: 0 },
            { point: 10, next: 68, twin: 66, facet: 16, face: 0 },
            { point: 18, next: 35, twin: 69, facet: 16, face: 0 },
            { point: 9, next: 73, twin: 68, facet: 25, face: 0 },
            { point: 19, next: 72, twin: 71, facet: 17, face: 0 },
            { point: 20, next: 101, twin: 70, facet: 24, face: 0 },
            { point: 20, next: 74, twin: 73, facet: 17, face: 0 },
            { point: 18, next: 104, twin: 72, facet: 25, face: 0 },
            { point: 18, next: 70, twin: 75, facet: 17, face: 0 },
            { point: 19, next: 63, twin: 74, facet: -1, face: -1 },
            { point: 21, next: 78, twin: 77, facet: 18, face: 0 },
            { point: 22, next: 81, twin: 76, facet: -1, face: -1 },
            { point: 22, next: 80, twin: 79, facet: 18, face: 0 },
            { point: 19, next: 82, twin: 78, facet: 19, face: 0 },
            { point: 19, next: 76, twin: 81, facet: 18, face: 0 },
            { point: 21, next: 75, twin: 80, facet: -1, face: -1 },
            { point: 22, next: 84, twin: 83, facet: 19, face: 0 },
            { point: 23, next: 77, twin: 82, facet: -1, face: -1 },
            { point: 23, next: 79, twin: 85, facet: 19, face: 0 },
            { point: 19, next: 99, twin: 84, facet: 23, face: 0 },
            { point: 24, next: 88, twin: 87, facet: 20, face: 0 },
            { point: 25, next: 91, twin: 86, facet: -1, face: -1 },
            { point: 25, next: 90, twin: 89, facet: 20, face: 0 },
            { point: 26, next: 92, twin: 88, facet: 21, face: 0 },
            { point: 26, next: 86, twin: 91, facet: 20, face: 0 },
            { point: 24, next: 95, twin: 90, facet: -1, face: -1 },
            { point: 25, next: 94, twin: 93, facet: 21, face: 0 },
            { point: 27, next: 98, twin: 92, facet: 22, face: 0 },
            { point: 27, next: 89, twin: 95, facet: 21, face: 0 },
            { point: 26, next: 97, twin: 94, facet: -1, face: -1 },
            { point: 23, next: 93, twin: 97, facet: 22, face: 0 },
            { point: 27, next: 83, twin: 96, facet: -1, face: -1 },
            { point: 25, next: 96, twin: 99, facet: 22, face: 0 },
            { point: 23, next: 100, twin: 98, facet: 23, face: 0 },
            { point: 25, next: 85, twin: 101, facet: 23, face: 0 },
            { point: 19, next: 102, twin: 100, facet: 24, face: 0 },
            { point: 25, next: 71, twin: 103, facet: 24, face: 0 },
            { point: 20, next: 87, twin: 102, facet: -1, face: -1 },
            { point: 20, next: 69, twin: 105, facet: 25, face: 0 },
            { point: 9, next: 108, twin: 104, facet: 26, face: 0 },
            { point: 28, next: 105, twin: 107, facet: 26, face: 0 },
            { point: 9, next: 121, twin: 106, facet: 30, face: 0 },
            { point: 20, next: 106, twin: 109, facet: 26, face: 0 },
            { point: 28, next: 103, twin: 108, facet: -1, face: -1 },
            { point: 29, next: 112, twin: 111, facet: 27, face: 0 },
            { point: 30, next: 118, twin: 110, facet: 28, face: 0 },
            { point: 30, next: 114, twin: 113, facet: 27, face: 0 },
            { point: 31, next: 117, twin: 112, facet: -1, face: -1 },
            { point: 31, next: 110, twin: 115, facet: 27, face: 0 },
            { point: 29, next: 120, twin: 114, facet: 29, face: 0 },
            { point: 32, next: 111, twin: 117, facet: 28, face: 0 },
            { point: 30, next: 119, twin: 116, facet: -1, face: -1 },
            { point: 29, next: 116, twin: 119, facet: 28, face: 0 },
            { point: 32, next: 123, twin: 118, facet: -1, face: -1 },
            { point: 31, next: 122, twin: 121, facet: 29, face: 0 },
            { point: 28, next: 124, twin: 120, facet: 30, face: 0 },
            { point: 28, next: 115, twin: 123, facet: 29, face: 0 },
            { point: 29, next: 109, twin: 122, facet: -1, face: -1 },
            { point: 31, next: 107, twin: 125, facet: 30, face: 0 },
            { point: 9, next: 129, twin: 124, facet: 33, face: 0 },
            { point: 33, next: 128, twin: 127, facet: 31, face: 0 },
            { point: 34, next: 134, twin: 126, facet: 32, face: 0 },
            { point: 34, next: 130, twin: 129, facet: 31, face: 0 },
            { point: 31, next: 136, twin: 128, facet: 33, face: 0 },
            { point: 31, next: 126, twin: 131, facet: 31, face: 0 },
            { point: 33, next: 113, twin: 130, facet: -1, face: -1 },
            { point: 35, next: 127, twin: 133, facet: 32, face: 0 },
            { point: 34, next: 135, twin: 132, facet: -1, face: -1 },
            { point: 33, next: 132, twin: 135, facet: 32, face: 0 },
            { point: 35, next: 131, twin: 134, facet: -1, face: -1 },
            { point: 34, next: 125, twin: 137, facet: 33, face: 0 },
            { point: 9, next: 133, twin: 136, facet: -1, face: -1 },
          ],
          points: [
            [-0.6847759065022571, -0.5765366864730185, 0],
            [-0.6662939224605087, -0.6111140466039209, 0],
            [-0.6961570560806459, -0.5390180644032261, 0],
            [-0.5390180644032249, -0.6961570560806463, 0],
            [-0.5, -0.7, 0],
            [-0.5765366864730173, -0.6847759065022576, 0],
            [-0.641421356237309, -0.6414213562373099, 0],
            [-0.6111140466039198, -0.6662939224605094, 0],
            [-0.7, -0.5000000000000004, 0],
            [-0.7, 0.4999999999999995, 0],
            [0.5, -0.7, 0],
            [0.5390180644032256, -0.696157056080646, 0],
            [0.5765366864730179, -0.6847759065022573, 0],
            [0.6111140466039204, -0.666293922460509, 0],
            [0.6414213562373094, -0.6414213562373094, 0],
            [0.6847759065022573, -0.5765366864730179, 0],
            [0.666293922460509, -0.6111140466039204, 0],
            [0.696157056080646, -0.5390180644032256, 0],
            [0.7, -0.5, 0],
            [0.7, 0.49999999999999994, 0],
            [0.49999999999999983, 0.7, 0],
            [0.696157056080646, 0.5390180644032256, 0],
            [0.6847759065022573, 0.5765366864730179, 0],
            [0.666293922460509, 0.6111140466039203, 0],
            [0.5765366864730178, 0.6847759065022574, 0],
            [0.5390180644032255, 0.696157056080646, 0],
            [0.6111140466039204, 0.666293922460509, 0],
            [0.6414213562373094, 0.6414213562373094, 0],
            [-0.5000000000000001, 0.7, 0],
            [-0.5390180644032257, 0.696157056080646, 0],
            [-0.6111140466039207, 0.6662939224605089, 0],
            [-0.6414213562373097, 0.6414213562373092, 0],
            [-0.5765366864730181, 0.6847759065022573, 0],
            [-0.6662939224605092, 0.6111140466039201, 0],
            [-0.6961570560806462, 0.5390180644032252, 0],
            [-0.6847759065022575, 0.5765366864730176, 0],
          ],
          exactPoints: [
            [
              '-6167913034711717/9007199254740992',
              '-5192980812730613/9007199254740992',
              '0',
            ],
            [
              '-3000721060912373/4503599627370496',
              '-1376106496283147/2251799813685248',
              '0',
            ],
            [
              '-6270425316712277/9007199254740992',
              '-2427521553992335/4503599627370496',
              '0',
            ],
            [
              '-4855043107984659/9007199254740992',
              '-783803164589035/1125899906842624',
              '0',
            ],
            ['-1/2', '-3152519739159347/4503599627370496', '0'],
            [
              '-2596490406365301/4503599627370496',
              '-3083956517355861/4503599627370496',
              '0',
            ],
            [
              '-2888704980937823/4503599627370496',
              '-2888704980937827/4503599627370496',
              '0',
            ],
            [
              '-2752212992566289/4503599627370496',
              '-6001442121824753/9007199254740992',
              '0',
            ],
            [
              '-3152519739159347/4503599627370496',
              '-1125899906842625/2251799813685248',
              '0',
            ],
            [
              '-3152519739159347/4503599627370496',
              '9007199254740983/18014398509481984',
              '0',
            ],
            ['1/2', '-3152519739159347/4503599627370496', '0'],
            [
              '2427521553992333/4503599627370496',
              '-3135212658356139/4503599627370496',
              '0',
            ],
            [
              '324561300795663/562949953421312',
              '-6167913034711719/9007199254740992',
              '0',
            ],
            [
              '688053248141573/1125899906842624',
              '-6001442121824749/9007199254740992',
              '0',
            ],
            [
              '2888704980937825/4503599627370496',
              '-2888704980937825/4503599627370496',
              '0',
            ],
            [
              '6167913034711719/9007199254740992',
              '-324561300795663/562949953421312',
              '0',
            ],
            [
              '6001442121824749/9007199254740992',
              '-688053248141573/1125899906842624',
              '0',
            ],
            [
              '3135212658356139/4503599627370496',
              '-2427521553992333/4503599627370496',
              '0',
            ],
            ['3152519739159347/4503599627370496', '-1/2', '0'],
            [
              '3152519739159347/4503599627370496',
              '9007199254740991/18014398509481984',
              '0',
            ],
            [
              '9007199254740989/18014398509481984',
              '3152519739159347/4503599627370496',
              '0',
            ],
            [
              '3135212658356139/4503599627370496',
              '2427521553992333/4503599627370496',
              '0',
            ],
            [
              '6167913034711719/9007199254740992',
              '324561300795663/562949953421312',
              '0',
            ],
            [
              '6001442121824749/9007199254740992',
              '5504425985132583/9007199254740992',
              '0',
            ],
            [
              '5192980812730607/9007199254740992',
              '770989129338965/1125899906842624',
              '0',
            ],
            [
              '4855043107984665/9007199254740992',
              '3135212658356139/4503599627370496',
              '0',
            ],
            [
              '688053248141573/1125899906842624',
              '6001442121824749/9007199254740992',
              '0',
            ],
            [
              '2888704980937825/4503599627370496',
              '2888704980937825/4503599627370496',
              '0',
            ],
            [
              '-4503599627370497/9007199254740992',
              '3152519739159347/4503599627370496',
              '0',
            ],
            [
              '-4855043107984667/9007199254740992',
              '3135212658356139/4503599627370496',
              '0',
            ],
            [
              '-2752212992566293/4503599627370496',
              '1500360530456187/2251799813685248',
              '0',
            ],
            [
              '-1444352490468913/2251799813685248',
              '90272030654307/140737488355328',
              '0',
            ],
            [
              '-2596490406365305/4503599627370496',
              '6167913034711719/9007199254740992',
              '0',
            ],
            [
              '-6001442121824751/9007199254740992',
              '5504425985132581/9007199254740992',
              '0',
            ],
            [
              '-6270425316712279/9007199254740992',
              '2427521553992331/4503599627370496',
              '0',
            ],
            [
              '-6167913034711721/9007199254740992',
              '5192980812730605/9007199254740992',
              '0',
            ],
          ],
          faces: [
            {
              plane: [0, 0, 1, 0],
              exactPlane: [
                '0',
                '0',
                '24329842867000515572734702653/81129638414606681695789005144064',
                '0',
              ],
            },
          ],
          facets: [
            { edge: 4 },
            { edge: 10 },
            { edge: 14 },
            { edge: 18 },
            { edge: 22 },
            { edge: 24 },
            { edge: 28 },
            { edge: 32 },
            { edge: 36 },
            { edge: 42 },
            { edge: 48 },
            { edge: 52 },
            { edge: 56 },
            { edge: 58 },
            { edge: 64 },
            { edge: 66 },
            { edge: 68 },
            { edge: 74 },
            { edge: 80 },
            { edge: 84 },
            { edge: 90 },
            { edge: 94 },
            { edge: 98 },
            { edge: 100 },
            { edge: 102 },
            { edge: 104 },
            { edge: 108 },
            { edge: 114 },
            { edge: 118 },
            { edge: 122 },
            { edge: 124 },
            { edge: 130 },
            { edge: 134 },
            { edge: 136 },
          ],
        },
      },
    ]
  );
});
