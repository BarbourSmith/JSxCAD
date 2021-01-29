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
      tags: ['toolpath/pause_afterward', 'tool/cnc'],
      paths: [unitRegularTrianglePolygon.map(([x, y]) => [x, y, -1])],
    },
    {
      definitions: {
        'tool/cnc': {
          grbl: {
            type: 'spindle',
            feedRate: 500,
            cutSpeed: 7000,
            jumpZ: 1,
          },
        },
      },
    }
  );
  const expected = await readFile('spindle_triangle.gcode', {
    encoding: 'utf8',
  });
  const observed = new TextDecoder('utf8').decode(code);
  t.deepEqual(observed, expected);
});

test('Dynamic Laser', async (t) => {
  const code = await toGcode(
    {
      type: 'paths',
      tags: ['tool/laser'],
      paths: [unitRegularTrianglePolygon],
    },
    {
      definitions: {
        'tool/laser': {
          grbl: {
            type: 'dynamicLaser',
            feedRate: 10000,
            cutSpeed: -1000,
            jumpSpeed: -1000,
          },
        },
      },
    }
  );
  const expected = await readFile('dynamic_laser.gcode', {
    encoding: 'utf8',
  });
  const observed = new TextDecoder('utf8').decode(code);
  t.deepEqual(observed, expected);
});

test('Constant Laser', async (t) => {
  const code = await toGcode(
    {
      type: 'paths',
      tags: ['tool/laser'],
      paths: [unitRegularTrianglePolygon],
    },
    {
      definitions: {
        'tool/laser': {
          grbl: {
            type: 'constantLaser',
            feedRate: 1000,
            cutSpeed: 500,
            lead: 10,
          },
        },
      },
    }
  );
  const expected = await readFile('constant_laser.gcode', {
    encoding: 'utf8',
  });
  const observed = new TextDecoder('utf8').decode(code);
  t.deepEqual(observed, expected);
});
