import fromDxf from './fromDxf';
import fs from 'fs';
import test from 'ava';

const { readFile } = fs.promises;

test('Basic', async (t) => {
  const geometry = await fromDxf({}, await readFile('toDxf.test.triangle.dxf', { encoding: 'utf8' }));
  t.deepEqual(geometry,
              { assembly: [
                  { paths: [[null, [1,0, 0],[-0.4999999999999998,0.8660254037844387, 0]],
                            [null, [-0.4999999999999998,0.8660254037844387, 0],[-0.5000000000000004,-0.8660254037844385, 0]],
                            [null, [-0.5000000000000004,-0.8660254037844385, 0],[1,0, 0]]] }
                ]
              });
});
