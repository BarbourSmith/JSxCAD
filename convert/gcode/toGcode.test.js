import { boot } from '@jsxcad/sys';
import fs from 'fs';
import test from 'ava';
import { toGcode } from './toGcode.js';
import { unitRegularTrianglePolygon } from '@jsxcad/data-shape';

const { readFile } = fs.promises;

test.beforeEach(async (t) => {
  await boot();
});

test('Spindle Triangle', async (t) => {
  const code = await toGcode(
    {
      type: 'paths',
      tags: ['toolpath/pause_afterward'],
      paths: [unitRegularTrianglePolygon],
    },
    { toolType: 'spindle', spindleRpm: 7000, feedRate: 500 }
  );
  const expected = await readFile('spindle_triangle.gcode', {
    encoding: 'utf8',
  });
  t.deepEqual(new TextDecoder('utf8').decode(code), expected);
});

test('Laser Triangle', async (t) => {
  const code = await toGcode(
    {
      type: 'paths',
      paths: [unitRegularTrianglePolygon],
    },
    { toolType: 'laser', laserPower: 1000, feedRate: 10000 }
  );
  const expected = await readFile('laser_triangle.gcode', {
    encoding: 'utf8',
  });
  t.deepEqual(new TextDecoder('utf8').decode(code), expected);
});

test('Constant Laser Triangle', async (t) => {
  const code = await toGcode(
    {
      type: 'paths',
      tags: ['toolpath/constant_laser'],
      paths: [unitRegularTrianglePolygon],
    },
    { toolType: 'laser', laserPower: 1000, feedRate: 10000 }
  );
  const expected = await readFile('constant_laser_triangle.gcode', {
    encoding: 'utf8',
  });
  t.deepEqual(new TextDecoder('utf8').decode(code), expected);
});

test('Tag changes reset', async (t) => {
  const code = await toGcode(
    {
      type: 'disjointAssembly',
      content: [
        {
          type: 'paths',
          tags: ['toolpath/feed_rate/800'],
          paths: [unitRegularTrianglePolygon],
        },
        {
          type: 'paths',
          tags: ['toolpath/spindle_rpm/1200'],
          paths: [unitRegularTrianglePolygon],
        },
        {
          type: 'paths',
          paths: [unitRegularTrianglePolygon],
        },
      ],
    },
    { toolType: 'spindle', spindleRpm: 7000, feedRate: 500 }
  );
  const expected = await readFile('tags.gcode', {
    encoding: 'utf8',
  });
  t.deepEqual(new TextDecoder('utf8').decode(code), expected);
});
