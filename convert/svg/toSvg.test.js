import '@jsxcad/algorithm-cgal';

import { boot } from '@jsxcad/sys';
import { fromPolygons } from '@jsxcad/geometry-graph';
import test from 'ava';
import { toSvg } from './toSvg.js';

test.beforeEach(async (t) => {
  await boot();
});

const triangle = [
  [1, 0, 0],
  [-0.4999999999999998, 0.8660254037844387, 0],
  [-0.5000000000000004, -0.8660254037844385, 0],
];

test('Triangle', async (t) => {
  const svg = await toSvg(
    {
      type: 'disjointAssembly',
      content: [
        {
          type: 'graph',
          graph: fromPolygons([{ points: triangle }]),
          tags: ['color/blue'],
        },
        {
          type: 'paths',
          paths: [triangle],
          tags: ['color/red'],
        },
      ],
    },
    { padding: 2 }
  );
  t.is(
    new TextDecoder('utf8').decode(svg),
    `<?xml version="1.0" encoding="UTF-8"?>
<!-- Generated by jsxcad -->
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1 Tiny//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11-tiny.dtd">
<svg baseProfile="tiny" height="1.732050807568878mm" width="1.5000000000000018mm" viewBox="-2 -2 5.500000000000002 5.7320508075688785" version="1.1" stroke="black" stroke-width=".1" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill="#0000ff" stroke="#0000ff" d="M0.25 1.73205 L1.75 0.86603 L0.25 0 z"/>
<path fill="none" stroke="#ff0000" d="M1.75 0.86603 L0.25 0 L0.25 1.73205 z"/>
</svg>`
  );
});
