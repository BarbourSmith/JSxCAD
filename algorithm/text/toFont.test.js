import { boot, readFile } from '@jsxcad/sys';

import test from 'ava';
import { toFont } from './toFont.js';

test('Render a letter', async (t) => {
  await boot();
  const bytes = await readFile(
    { doSerialize: false, sources: ['GreatVibes-Regular.ttf'] },
    'GreatVibes-Regular.ttf'
  );
  const font = toFont({}, bytes);
  const letterA = font({}, 'ab');
  t.deepEqual(JSON.parse(JSON.stringify(letterA)), {
    type: 'layers',
    content: [
      {
        type: 'transform',
        matrix: [0.01, 0, 0, 0, 0, 0.01, 0, 0, 0, 0, 0.01, 0, 0, 0, 0, 1],
        content: [
          {
            type: 'graph',
            graph: {
              points: [
                [30.31, 13.25, 0],
                [30.49998, 13.74125, 0],
                [30.47822, 14.40594, 0],
                [30.09506, 14.59062, 0],
                [29.55955, 14.22781, 0],
                [29.3, 13.82, 0],
                [27.63766, 10.60625, 0],
                [23.88525, 4.67469, 0],
                [21.86845, 2.52523, 0],
                [20.60531, 1.80711, 0],
                [20.02, 1.73, 0],
                [19.69539, 1.79463, 0],
                [19.22617, 2.31904, 0],
                [19.03563, 4.13047, 0],
                [19.3, 6.05, 0],
                [19.79254, 7.82684, 0],
                [21.4273, 11.83988, 0],
                [24.43844, 17.38719, 0],
                [25.99, 19.51, 0],
                [25.22281, 19.45687, 0],
                [22.97, 19.8, 0],
                [22.16145, 19.76639, 0],
                [20.82371, 19.20182, 0],
                [19.18156, 17.20828, 0],
                [16.63391, 12.55187, 0],
                [13.46172, 7.46687, 0],
                [11.66, 5.11, 0],
                [10.37559, 3.76471, 0],
                [7.8902, 2.14615, 0],
                [6.34187, 1.97039, 0],
                [5.57557, 2.39526, 0],
                [5.09392, 3.28343, 0],
                [4.95856, 4.66033, 0],
                [5.04, 5.54, 0],
                [5.60219, 7.69141, 0],
                [7.34906, 11.64172, 0],
                [7.99, 12.82, 0],
                [10.12391, 15.96344, 0],
                [13.79791, 20.18113, 0],
                [16.33436, 22.32496, 0],
                [17.57, 23.11, 0],
                [18.56428, 23.55561, 0],
                [20.46705, 23.87729, 0],
                [22.10779, 23.43256, 0],
                [23.30932, 22.21299, 0],
                [23.69, 21.31, 0],
                [24.11564, 21.29521, 0],
                [24.7424, 21.59424, 0],
                [24.99557, 22.20873, 0],
                [24.78607, 22.9915, 0],
                [24.48, 23.4, 0],
                [23.66425, 24.15395, 0],
                [21.78655, 25.1886, 0],
                [19.66005, 25.63783, 0],
                [17.38016, 25.55638, 0],
                [15.04226, 24.99897, 0],
                [12.74174, 24.02033, 0],
                [10.574, 22.67519, 0],
                [8.63442, 21.01827, 0],
                [7.78, 20.09, 0],
                [5.92841, 17.65682, 0],
                [3.29608, 12.93841, 0],
                [1.95915, 8.61345, 0],
                [1.7587, 4.91738, 0],
                [2.53583, 2.08563, 0],
                [4.13163, 0.35362, 0],
                [6.3872, -0.04321, 0],
                [9.14362, 1.13056, 0],
                [10.66, 2.38, 0],
                [12.18516, 4.02125, 0],
                [14.83797, 7.5775, 0],
                [15.84, 9.14, 0],
                [15.27691, 6.56455, 0],
                [15.23846, 3.60749, 0],
                [15.63851, 2.17748, 0],
                [16.68551, 0.73697, 0],
                [18.5134, -0.09439, 0],
                [19.44, -0.14, 0],
                [20.25026, 0.02147, 0],
                [21.86222, 0.85319, 0],
                [24.20824, 3.09736, 0],
                [28.30781, 9.35641, 0],
              ],
              edges: [
                { point: 0, loop: 0, twin: -1, next: 1 },
                { point: 1, loop: 0, twin: -1, next: 2 },
                { point: 1, loop: 0, twin: -1, next: 3 },
                { point: 2, loop: 0, twin: -1, next: 4 },
                { point: 2, loop: 0, twin: -1, next: 5 },
                { point: 3, loop: 0, twin: -1, next: 6 },
                { point: 3, loop: 0, twin: -1, next: 7 },
                { point: 4, loop: 0, twin: -1, next: 8 },
                { point: 4, loop: 0, twin: -1, next: 9 },
                { point: 5, loop: 0, twin: -1, next: 10 },
                { point: 5, loop: 0, twin: -1, next: 11 },
                { point: 6, loop: 0, twin: -1, next: 12 },
                { point: 6, loop: 0, twin: -1, next: 13 },
                { point: 7, loop: 0, twin: -1, next: 14 },
                { point: 7, loop: 0, twin: -1, next: 15 },
                { point: 8, loop: 0, twin: -1, next: 16 },
                { point: 8, loop: 0, twin: -1, next: 17 },
                { point: 9, loop: 0, twin: -1, next: 18 },
                { point: 9, loop: 0, twin: -1, next: 19 },
                { point: 10, loop: 0, twin: -1, next: 20 },
                { point: 10, loop: 0, twin: -1, next: 21 },
                { point: 11, loop: 0, twin: -1, next: 22 },
                { point: 11, loop: 0, twin: -1, next: 23 },
                { point: 12, loop: 0, twin: -1, next: 24 },
                { point: 12, loop: 0, twin: -1, next: 25 },
                { point: 13, loop: 0, twin: -1, next: 26 },
                { point: 13, loop: 0, twin: -1, next: 27 },
                { point: 14, loop: 0, twin: -1, next: 28 },
                { point: 14, loop: 0, twin: -1, next: 29 },
                { point: 15, loop: 0, twin: -1, next: 30 },
                { point: 15, loop: 0, twin: -1, next: 31 },
                { point: 16, loop: 0, twin: -1, next: 32 },
                { point: 16, loop: 0, twin: -1, next: 33 },
                { point: 17, loop: 0, twin: -1, next: 34 },
                { point: 17, loop: 0, twin: -1, next: 35 },
                { point: 18, loop: 0, twin: -1, next: 36 },
                { point: 18, loop: 0, twin: -1, next: 37 },
                { point: 19, loop: 0, twin: -1, next: 38 },
                { point: 19, loop: 0, twin: -1, next: 39 },
                { point: 20, loop: 0, twin: -1, next: 40 },
                { point: 20, loop: 0, twin: -1, next: 41 },
                { point: 21, loop: 0, twin: -1, next: 42 },
                { point: 21, loop: 0, twin: -1, next: 43 },
                { point: 22, loop: 0, twin: -1, next: 44 },
                { point: 22, loop: 0, twin: -1, next: 45 },
                { point: 23, loop: 0, twin: -1, next: 46 },
                { point: 23, loop: 0, twin: -1, next: 47 },
                { point: 24, loop: 0, twin: -1, next: 48 },
                { point: 24, loop: 0, twin: -1, next: 49 },
                { point: 25, loop: 0, twin: -1, next: 50 },
                { point: 25, loop: 0, twin: -1, next: 51 },
                { point: 26, loop: 0, twin: -1, next: 52 },
                { point: 26, loop: 0, twin: -1, next: 53 },
                { point: 27, loop: 0, twin: -1, next: 54 },
                { point: 27, loop: 0, twin: -1, next: 55 },
                { point: 28, loop: 0, twin: -1, next: 56 },
                { point: 28, loop: 0, twin: -1, next: 57 },
                { point: 29, loop: 0, twin: -1, next: 58 },
                { point: 29, loop: 0, twin: -1, next: 59 },
                { point: 30, loop: 0, twin: -1, next: 60 },
                { point: 30, loop: 0, twin: -1, next: 61 },
                { point: 31, loop: 0, twin: -1, next: 62 },
                { point: 31, loop: 0, twin: -1, next: 63 },
                { point: 32, loop: 0, twin: -1, next: 64 },
                { point: 32, loop: 0, twin: -1, next: 65 },
                { point: 33, loop: 0, twin: -1, next: 66 },
                { point: 33, loop: 0, twin: -1, next: 67 },
                { point: 34, loop: 0, twin: -1, next: 68 },
                { point: 34, loop: 0, twin: -1, next: 69 },
                { point: 35, loop: 0, twin: -1, next: 70 },
                { point: 35, loop: 0, twin: -1, next: 71 },
                { point: 36, loop: 0, twin: -1, next: 72 },
                { point: 36, loop: 0, twin: -1, next: 73 },
                { point: 37, loop: 0, twin: -1, next: 74 },
                { point: 37, loop: 0, twin: -1, next: 75 },
                { point: 38, loop: 0, twin: -1, next: 76 },
                { point: 38, loop: 0, twin: -1, next: 77 },
                { point: 39, loop: 0, twin: -1, next: 78 },
                { point: 39, loop: 0, twin: -1, next: 79 },
                { point: 40, loop: 0, twin: -1, next: 80 },
                { point: 40, loop: 0, twin: -1, next: 81 },
                { point: 41, loop: 0, twin: -1, next: 82 },
                { point: 41, loop: 0, twin: -1, next: 83 },
                { point: 42, loop: 0, twin: -1, next: 84 },
                { point: 42, loop: 0, twin: -1, next: 85 },
                { point: 43, loop: 0, twin: -1, next: 86 },
                { point: 43, loop: 0, twin: -1, next: 87 },
                { point: 44, loop: 0, twin: -1, next: 88 },
                { point: 44, loop: 0, twin: -1, next: 89 },
                { point: 45, loop: 0, twin: -1, next: 90 },
                { point: 45, loop: 0, twin: -1, next: 91 },
                { point: 46, loop: 0, twin: -1, next: 92 },
                { point: 46, loop: 0, twin: -1, next: 93 },
                { point: 47, loop: 0, twin: -1, next: 94 },
                { point: 47, loop: 0, twin: -1, next: 95 },
                { point: 48, loop: 0, twin: -1, next: 96 },
                { point: 48, loop: 0, twin: -1, next: 97 },
                { point: 49, loop: 0, twin: -1, next: 98 },
                { point: 49, loop: 0, twin: -1, next: 99 },
                { point: 50, loop: 0, twin: -1, next: 100 },
                { point: 50, loop: 0, twin: -1, next: 101 },
                { point: 51, loop: 0, twin: -1, next: 102 },
                { point: 51, loop: 0, twin: -1, next: 103 },
                { point: 52, loop: 0, twin: -1, next: 104 },
                { point: 52, loop: 0, twin: -1, next: 105 },
                { point: 53, loop: 0, twin: -1, next: 106 },
                { point: 53, loop: 0, twin: -1, next: 107 },
                { point: 54, loop: 0, twin: -1, next: 108 },
                { point: 54, loop: 0, twin: -1, next: 109 },
                { point: 55, loop: 0, twin: -1, next: 110 },
                { point: 55, loop: 0, twin: -1, next: 111 },
                { point: 56, loop: 0, twin: -1, next: 112 },
                { point: 56, loop: 0, twin: -1, next: 113 },
                { point: 57, loop: 0, twin: -1, next: 114 },
                { point: 57, loop: 0, twin: -1, next: 115 },
                { point: 58, loop: 0, twin: -1, next: 116 },
                { point: 58, loop: 0, twin: -1, next: 117 },
                { point: 59, loop: 0, twin: -1, next: 118 },
                { point: 59, loop: 0, twin: -1, next: 119 },
                { point: 60, loop: 0, twin: -1, next: 120 },
                { point: 60, loop: 0, twin: -1, next: 121 },
                { point: 61, loop: 0, twin: -1, next: 122 },
                { point: 61, loop: 0, twin: -1, next: 123 },
                { point: 62, loop: 0, twin: -1, next: 124 },
                { point: 62, loop: 0, twin: -1, next: 125 },
                { point: 63, loop: 0, twin: -1, next: 126 },
                { point: 63, loop: 0, twin: -1, next: 127 },
                { point: 64, loop: 0, twin: -1, next: 128 },
                { point: 64, loop: 0, twin: -1, next: 129 },
                { point: 65, loop: 0, twin: -1, next: 130 },
                { point: 65, loop: 0, twin: -1, next: 131 },
                { point: 66, loop: 0, twin: -1, next: 132 },
                { point: 66, loop: 0, twin: -1, next: 133 },
                { point: 67, loop: 0, twin: -1, next: 134 },
                { point: 67, loop: 0, twin: -1, next: 135 },
                { point: 68, loop: 0, twin: -1, next: 136 },
                { point: 68, loop: 0, twin: -1, next: 137 },
                { point: 69, loop: 0, twin: -1, next: 138 },
                { point: 69, loop: 0, twin: -1, next: 139 },
                { point: 70, loop: 0, twin: -1, next: 140 },
                { point: 70, loop: 0, twin: -1, next: 141 },
                { point: 71, loop: 0, twin: -1, next: 142 },
                { point: 71, loop: 0, twin: -1, next: 143 },
                { point: 72, loop: 0, twin: -1, next: 144 },
                { point: 72, loop: 0, twin: -1, next: 145 },
                { point: 73, loop: 0, twin: -1, next: 146 },
                { point: 73, loop: 0, twin: -1, next: 147 },
                { point: 74, loop: 0, twin: -1, next: 148 },
                { point: 74, loop: 0, twin: -1, next: 149 },
                { point: 75, loop: 0, twin: -1, next: 150 },
                { point: 75, loop: 0, twin: -1, next: 151 },
                { point: 76, loop: 0, twin: -1, next: 152 },
                { point: 76, loop: 0, twin: -1, next: 153 },
                { point: 77, loop: 0, twin: -1, next: 154 },
                { point: 77, loop: 0, twin: -1, next: 155 },
                { point: 78, loop: 0, twin: -1, next: 156 },
                { point: 78, loop: 0, twin: -1, next: 157 },
                { point: 79, loop: 0, twin: -1, next: 158 },
                { point: 79, loop: 0, twin: -1, next: 159 },
                { point: 80, loop: 0, twin: -1, next: 160 },
                { point: 80, loop: 0, twin: -1, next: 161 },
                { point: 81, loop: 0, twin: -1, next: 162 },
                { point: 81, loop: 0, twin: -1, next: 163 },
                { point: 0, loop: 0, twin: -1, next: 0 },
              ],
              loops: [{ edge: 0, face: 0 }],
              faces: [{ plane: [0, 0, -1, 0], loop: 0 }],
              isClosed: false,
              isOutline: true,
              isWireframe: true,
            },
          },
        ],
      },
      {
        type: 'transform',
        matrix: [0.01, 0, 0, 0, 0, 0.01, 0, 0, 0, 0, 0.01, 0, 0, 0, 0, 1],
        content: [
          {
            type: 'graph',
            graph: {
              points: [
                [44.06, 40.97, 0],
                [41.59904, 36.98891, 0],
                [36.11697, 26.84703, 0],
                [30.506, 15.93641, 0],
                [25.50768, 6.82203, 0],
                [23.47, 3.74, 0],
                [23.29766, 3.25297, 0],
                [23.65422, 2.65016, 0],
                [24.05, 2.81, 0],
                [25.38422, 4.50922, 0],
                [29.29391, 11.17016, 0],
                [31.68, 15.62, 0],
                [30.65875, 13.45297, 0],
                [29.0475, 9.46766, 0],
                [28.51, 7.7, 0],
                [28.31885, 6.741, 0],
                [28.24475, 4.92092, 0],
                [28.59018, 3.28558, 0],
                [29.36545, 1.90003, 0],
                [30.58088, 0.8293, 0],
                [32.24678, 0.13844, 0],
                [34.37346, -0.10752, 0],
                [36.97123, 0.15646, 0],
                [38.45, 0.5, 0],
                [39.56457, 0.85817, 0],
                [41.66855, 1.90827, 0],
                [44.48, 4.18508, 0],
                [47.49688, 8.15898, 0],
                [49.55375, 12.68602, 0],
                [50.18, 14.98, 0],
                [50.41813, 16.70443, 0],
                [50.1575, 20.00471, 0],
                [49.25082, 22.15932, 0],
                [48.27605, 23.35233, 0],
                [46.98535, 24.29414, 0],
                [45.36184, 24.93636, 0],
                [44.42, 25.13, 0],
                [43.3582, 25.20266, 0],
                [42.11023, 24.83609, 0],
                [41.93289, 24.18078, 0],
                [42.70992, 23.70922, 0],
                [43.42, 23.69, 0],
                [44.21772, 23.71276, 0],
                [45.51435, 23.43261, 0],
                [46.43714, 22.7661, 0],
                [47.01563, 21.77064, 0],
                [47.30242, 19.78629, 0],
                [46.75539, 16.52512, 0],
                [46.15, 14.76, 0],
                [45.07563, 12.48437, 0],
                [42.27438, 7.82438, 0],
                [40.75, 5.83, 0],
                [38.95313, 3.86469, 0],
                [36.58359, 2.07277, 0],
                [35.19922, 1.67895, 0],
                [34.56, 1.73, 0],
                [33.73319, 2.02355, 0],
                [32.59852, 3.18288, 0],
                [32.08325, 4.98779, 0],
                [32.10031, 7.29743, 0],
                [32.93354, 11.40012, 0],
                [35.09498, 17.32223, 0],
                [36.43, 20.16, 0],
                [38.39113, 23.83152, 0],
                [42.88152, 31.25707, 0],
                [49.38156, 40.64344, 0],
                [52.27, 44.21, 0],
                [51.50281, 44.15125, 0],
                [49.25, 44.5, 0],
                [48.89, 44.5, 0],
                [48.29691, 44.47178, 0],
                [47.11918, 44.0783, 0],
                [45.32094, 42.59453, 0],
              ],
              edges: [
                { point: 0, loop: 0, twin: -1, next: 1 },
                { point: 1, loop: 0, twin: -1, next: 2 },
                { point: 1, loop: 0, twin: -1, next: 3 },
                { point: 2, loop: 0, twin: -1, next: 4 },
                { point: 2, loop: 0, twin: -1, next: 5 },
                { point: 3, loop: 0, twin: -1, next: 6 },
                { point: 3, loop: 0, twin: -1, next: 7 },
                { point: 4, loop: 0, twin: -1, next: 8 },
                { point: 4, loop: 0, twin: -1, next: 9 },
                { point: 5, loop: 0, twin: -1, next: 10 },
                { point: 5, loop: 0, twin: -1, next: 11 },
                { point: 6, loop: 0, twin: -1, next: 12 },
                { point: 6, loop: 0, twin: -1, next: 13 },
                { point: 7, loop: 0, twin: -1, next: 14 },
                { point: 7, loop: 0, twin: -1, next: 15 },
                { point: 8, loop: 0, twin: -1, next: 16 },
                { point: 8, loop: 0, twin: -1, next: 17 },
                { point: 9, loop: 0, twin: -1, next: 18 },
                { point: 9, loop: 0, twin: -1, next: 19 },
                { point: 10, loop: 0, twin: -1, next: 20 },
                { point: 10, loop: 0, twin: -1, next: 21 },
                { point: 11, loop: 0, twin: -1, next: 22 },
                { point: 11, loop: 0, twin: -1, next: 23 },
                { point: 12, loop: 0, twin: -1, next: 24 },
                { point: 12, loop: 0, twin: -1, next: 25 },
                { point: 13, loop: 0, twin: -1, next: 26 },
                { point: 13, loop: 0, twin: -1, next: 27 },
                { point: 14, loop: 0, twin: -1, next: 28 },
                { point: 14, loop: 0, twin: -1, next: 29 },
                { point: 15, loop: 0, twin: -1, next: 30 },
                { point: 15, loop: 0, twin: -1, next: 31 },
                { point: 16, loop: 0, twin: -1, next: 32 },
                { point: 16, loop: 0, twin: -1, next: 33 },
                { point: 17, loop: 0, twin: -1, next: 34 },
                { point: 17, loop: 0, twin: -1, next: 35 },
                { point: 18, loop: 0, twin: -1, next: 36 },
                { point: 18, loop: 0, twin: -1, next: 37 },
                { point: 19, loop: 0, twin: -1, next: 38 },
                { point: 19, loop: 0, twin: -1, next: 39 },
                { point: 20, loop: 0, twin: -1, next: 40 },
                { point: 20, loop: 0, twin: -1, next: 41 },
                { point: 21, loop: 0, twin: -1, next: 42 },
                { point: 21, loop: 0, twin: -1, next: 43 },
                { point: 22, loop: 0, twin: -1, next: 44 },
                { point: 22, loop: 0, twin: -1, next: 45 },
                { point: 23, loop: 0, twin: -1, next: 46 },
                { point: 23, loop: 0, twin: -1, next: 47 },
                { point: 24, loop: 0, twin: -1, next: 48 },
                { point: 24, loop: 0, twin: -1, next: 49 },
                { point: 25, loop: 0, twin: -1, next: 50 },
                { point: 25, loop: 0, twin: -1, next: 51 },
                { point: 26, loop: 0, twin: -1, next: 52 },
                { point: 26, loop: 0, twin: -1, next: 53 },
                { point: 27, loop: 0, twin: -1, next: 54 },
                { point: 27, loop: 0, twin: -1, next: 55 },
                { point: 28, loop: 0, twin: -1, next: 56 },
                { point: 28, loop: 0, twin: -1, next: 57 },
                { point: 29, loop: 0, twin: -1, next: 58 },
                { point: 29, loop: 0, twin: -1, next: 59 },
                { point: 30, loop: 0, twin: -1, next: 60 },
                { point: 30, loop: 0, twin: -1, next: 61 },
                { point: 31, loop: 0, twin: -1, next: 62 },
                { point: 31, loop: 0, twin: -1, next: 63 },
                { point: 32, loop: 0, twin: -1, next: 64 },
                { point: 32, loop: 0, twin: -1, next: 65 },
                { point: 33, loop: 0, twin: -1, next: 66 },
                { point: 33, loop: 0, twin: -1, next: 67 },
                { point: 34, loop: 0, twin: -1, next: 68 },
                { point: 34, loop: 0, twin: -1, next: 69 },
                { point: 35, loop: 0, twin: -1, next: 70 },
                { point: 35, loop: 0, twin: -1, next: 71 },
                { point: 36, loop: 0, twin: -1, next: 72 },
                { point: 36, loop: 0, twin: -1, next: 73 },
                { point: 37, loop: 0, twin: -1, next: 74 },
                { point: 37, loop: 0, twin: -1, next: 75 },
                { point: 38, loop: 0, twin: -1, next: 76 },
                { point: 38, loop: 0, twin: -1, next: 77 },
                { point: 39, loop: 0, twin: -1, next: 78 },
                { point: 39, loop: 0, twin: -1, next: 79 },
                { point: 40, loop: 0, twin: -1, next: 80 },
                { point: 40, loop: 0, twin: -1, next: 81 },
                { point: 41, loop: 0, twin: -1, next: 82 },
                { point: 41, loop: 0, twin: -1, next: 83 },
                { point: 42, loop: 0, twin: -1, next: 84 },
                { point: 42, loop: 0, twin: -1, next: 85 },
                { point: 43, loop: 0, twin: -1, next: 86 },
                { point: 43, loop: 0, twin: -1, next: 87 },
                { point: 44, loop: 0, twin: -1, next: 88 },
                { point: 44, loop: 0, twin: -1, next: 89 },
                { point: 45, loop: 0, twin: -1, next: 90 },
                { point: 45, loop: 0, twin: -1, next: 91 },
                { point: 46, loop: 0, twin: -1, next: 92 },
                { point: 46, loop: 0, twin: -1, next: 93 },
                { point: 47, loop: 0, twin: -1, next: 94 },
                { point: 47, loop: 0, twin: -1, next: 95 },
                { point: 48, loop: 0, twin: -1, next: 96 },
                { point: 48, loop: 0, twin: -1, next: 97 },
                { point: 49, loop: 0, twin: -1, next: 98 },
                { point: 49, loop: 0, twin: -1, next: 99 },
                { point: 50, loop: 0, twin: -1, next: 100 },
                { point: 50, loop: 0, twin: -1, next: 101 },
                { point: 51, loop: 0, twin: -1, next: 102 },
                { point: 51, loop: 0, twin: -1, next: 103 },
                { point: 52, loop: 0, twin: -1, next: 104 },
                { point: 52, loop: 0, twin: -1, next: 105 },
                { point: 53, loop: 0, twin: -1, next: 106 },
                { point: 53, loop: 0, twin: -1, next: 107 },
                { point: 54, loop: 0, twin: -1, next: 108 },
                { point: 54, loop: 0, twin: -1, next: 109 },
                { point: 55, loop: 0, twin: -1, next: 110 },
                { point: 55, loop: 0, twin: -1, next: 111 },
                { point: 56, loop: 0, twin: -1, next: 112 },
                { point: 56, loop: 0, twin: -1, next: 113 },
                { point: 57, loop: 0, twin: -1, next: 114 },
                { point: 57, loop: 0, twin: -1, next: 115 },
                { point: 58, loop: 0, twin: -1, next: 116 },
                { point: 58, loop: 0, twin: -1, next: 117 },
                { point: 59, loop: 0, twin: -1, next: 118 },
                { point: 59, loop: 0, twin: -1, next: 119 },
                { point: 60, loop: 0, twin: -1, next: 120 },
                { point: 60, loop: 0, twin: -1, next: 121 },
                { point: 61, loop: 0, twin: -1, next: 122 },
                { point: 61, loop: 0, twin: -1, next: 123 },
                { point: 62, loop: 0, twin: -1, next: 124 },
                { point: 62, loop: 0, twin: -1, next: 125 },
                { point: 63, loop: 0, twin: -1, next: 126 },
                { point: 63, loop: 0, twin: -1, next: 127 },
                { point: 64, loop: 0, twin: -1, next: 128 },
                { point: 64, loop: 0, twin: -1, next: 129 },
                { point: 65, loop: 0, twin: -1, next: 130 },
                { point: 65, loop: 0, twin: -1, next: 131 },
                { point: 66, loop: 0, twin: -1, next: 132 },
                { point: 66, loop: 0, twin: -1, next: 133 },
                { point: 67, loop: 0, twin: -1, next: 134 },
                { point: 67, loop: 0, twin: -1, next: 135 },
                { point: 68, loop: 0, twin: -1, next: 136 },
                { point: 68, loop: 0, twin: -1, next: 137 },
                { point: 69, loop: 0, twin: -1, next: 138 },
                { point: 69, loop: 0, twin: -1, next: 139 },
                { point: 70, loop: 0, twin: -1, next: 140 },
                { point: 70, loop: 0, twin: -1, next: 141 },
                { point: 71, loop: 0, twin: -1, next: 142 },
                { point: 71, loop: 0, twin: -1, next: 143 },
                { point: 72, loop: 0, twin: -1, next: 144 },
                { point: 72, loop: 0, twin: -1, next: 145 },
                { point: 0, loop: 0, twin: -1, next: 0 },
              ],
              loops: [{ edge: 0, face: 0 }],
              faces: [{ plane: [0, 0, -1, 0], loop: 0 }],
              isClosed: false,
              isOutline: true,
              isWireframe: true,
            },
          },
        ],
      },
    ],
  });
});
