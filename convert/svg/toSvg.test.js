import { boot } from '@jsxcad/sys';
import { buildRegularPolygon } from '@jsxcad/algorithm-shape';
import test from 'ava';
import { toSvg } from './toSvg.js';

test.beforeEach(async (t) => {
  await boot();
});

test('Triangle', async (t) => {
  const svg = await toSvg(
    {
      type: 'disjointAssembly',
      content: [
        {
          type: 'z0Surface',
          z0Surface: [buildRegularPolygon(3)],
          tags: ['color/blue'],
        },
        {
          type: 'paths',
          paths: [buildRegularPolygon(3)],
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
<svg baseProfile="tiny" height="1.7320508075688772mm" width="1.5000000000000004mm" viewBox="-2 -2 5.5 5.732050807568877" version="1.1" stroke="black" stroke-width=".1" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill="blue" stroke="none" d="M0.25 1.73205 L0.25 0 L1.75 0.86603 z"/>
<path stroke="red" fill="none" d="M1.75 0.86603 L0.25 0 L0.25 1.73205 z"/>
</svg>`
  );
});

test('Octagon', async (t) => {
  const svg = await toSvg({
    type: 'surface',
    surface: [buildRegularPolygon(8)],
  });
  t.is(
    new TextDecoder('utf8').decode(svg),
    `<?xml version="1.0" encoding="UTF-8"?>
<!-- Generated by jsxcad -->
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1 Tiny//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11-tiny.dtd">
<svg baseProfile="tiny" height="2mm" width="2mm" viewBox="0 0 2 2" version="1.1" stroke="black" stroke-width=".1" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill="black" stroke="none" d="M1.70711 1.70711 L1 2 L0.29289 1.70711 L0 1 L0.29289 0.29289 L1 0 L1.70711 0.29289 L2 1 z"/>
</svg>`
  );
});
