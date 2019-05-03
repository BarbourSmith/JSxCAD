import { buildRegularPolygon } from '@jsxcad/algorithm-shape';
import { test } from 'ava';
import { toSvg } from './toSvg';

test('Triangle', async t => {
  const svg = await toSvg({ padding: 2 }, { z0Surface: [buildRegularPolygon({ edges: 3 })] });
  t.is(svg,
       ['<?xml version="1.0" encoding="UTF-8"?>',
        '<!-- Generated by jsxcad -->',
        '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1 Tiny//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11-tiny.dtd">',
        '<svg baseProfile="tiny" height="1.73206 mm" width="1.5 mm" viewBox="-2 -2 5.5 5.73206" version="1.1" stroke="black" stroke-width=".1" fill="none" xmlns="http://www.w3.org/2000/svg">',
        '<path d="M1.5 0.86603 L0 1.73206 L0 0 z"/>',
        '</svg>']
           .join('\n'));
});

test('Octagon', async t => {
  const svg = await toSvg({}, { z0Surface: [buildRegularPolygon({ edges: 8 })] });
  t.is(svg,
       ['<?xml version="1.0" encoding="UTF-8"?>',
        '<!-- Generated by jsxcad -->',
        '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1 Tiny//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11-tiny.dtd">',
        '<svg baseProfile="tiny" height="2 mm" width="2 mm" viewBox="0 0 2 2" version="1.1" stroke="black" stroke-width=".1" fill="none" xmlns="http://www.w3.org/2000/svg">',
        '<path d="M2 1 L1.70711 1.70711 L1 2 L0.29289 1.70711 L0 1 L0.29289 0.29289 L1 0 L1.70711 0.29289 z"/>',
        '</svg>']
           .join('\n'));
});
